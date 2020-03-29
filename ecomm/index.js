const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const usersRepo = require('./repositories/user');

//(property) Application.use: ApplicationRequestHandler<Express>
app.use(bodyParser.urlencoded({extended: true})); //  midlewares automatically instead of ... app.post('/products', bodyParser.urlencoded({extended: true})  .......

//(property) Application.get: ((name: string) => any) & IRouterMatcher<Express, any>
app.get('/', (req, res) => {
  res.send(`
      <div>
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
app.post('/', async (req, res) => { 
  // console.log(req.body); //req.bodyy cung dc
  const {email, password, passwordConfirmation} = req.body;
  const existingUser = await usersRepo.getOneBy({email});
  if (existingUser) return res.send('Email in use');
  if (password !== passwordConfirmation) return res.send('Passwords must match');

  res.send('Account created');
});

//method) Application.listen(port: number, hostname: string, backlog: number, callback?: (...args: any[]) => void): Server (+5 overloads)
app.listen(3000, () => {
  console.log('listening');
})