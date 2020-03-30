const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const usersRepo = require('./repositories/user');
const cookieSession = require('cookie-session');

//(property) Application.use: ApplicationRequestHandler<Express>
app.use(bodyParser.urlencoded({extended: true})); //  midlewares automatically instead of ... app.post('/products', bodyParser.urlencoded({extended: true})  .......
app.use(cookieSession({keys: ['asdadasd']})); //exactly one property, random characters is essentially the encryption key that is going to be used to encrypt all that data
//(property) Application.get: ((name: string) => any) & IRouterMatcher<Express, any>
app.get('/signup', (req, res) => {
  res.send(`
      <div>
        YOUR ID is: ${req.session.userId}
        <form method="POST">
          <input name="email" placeholder="email" />
          <input name="password" placeholder="password" />
          <input name="passwordConfirmation" placeholder="password confirmation" />
          <button>Sign Up</button>
        </form>
      </div>
    `);
});

//function bodyParser.urlencoded(options?: bodyParser.OptionsUrlencoded): createServer.NextHandleFunction
//Returns middleware that only parses urlencoded bodies and only looks at requests where the Content-Type header matches the type option
app.post('/signup', async (req, res) => { 
  // console.log(req.body); //req.bodyy cung dc
  const {email, password, passwordConfirmation} = req.body;
  const existingUser = await usersRepo.getOneBy({email});
  if (existingUser) return res.send('Email in use');
  if (password !== passwordConfirmation) return res.send('Passwords must match');

  // create a user in our user repo to represent this person
  const user = await usersRepo.create({ email, password}); //{email: email, password: password}, we also got the id
  
  // store the id inside the user cookie, now we use third pakage
  req.session.userId = user.id // added by cookie session req.session === {}

  res.send('Account created');
});

app.get('/signout', (req,res)=>{
  //(property) CookieSessionInterfaces.CookieSessionRequest.session?: CookieSessionInterfaces.CookieSessionObject. Represents the session for the given request.
  req.session = null; //user makes request you sign out the response we sent back is going to have a set cookie property inside of it
  res.send('your are logged out')
});

app.get('/signin', (req,res)=>{
  res.send(`
      <div>
        <form method="POST">
          <input name="email" placeholder="email" />
          <input name="password" placeholder="password" />
          <button>Sign In</button>
        </form> 
      </div>
    `);
});
app.post('/signin', async (req,res)=>{
  const {email, password} = req.body; // infomation when we click enter html
  const user = await usersRepo.getOneBy({email});
  if (!user) return res.send('email not found');
  const validPassword = await usersRepo.comeparePasswords(user.password, password);// return true false 
  if (!validPassword) return res.send('invalid password');

  req.session.userId = user.id;
  res.send('your are signed in');
});


//method) Application.listen(port: number, hostname: string, backlog: number, callback?: (...args: any[]) => void): Server (+5 overloads)
app.listen(3000, () => {
  console.log('listening');
})