const express = require('express');
const app = express();

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

app.post('/', (req, res) => {
  // get access to email, password, passwordConfirmation 
  //(method) internal.Readable.on(event: "close", listener: () => void): Request<ParamsDictionary, any, any> (+5 overloads)
  req.on('data', data =>{   // .on ~= .addEventListener
    const parsed = data.toString('utf8').split('&');
    const formData = {};
    for(let pair of parsed){
      const [key, value] = pair.split('=');  // destructure, first part before = is key, second part is value
      formData[key] = value;  
    }
    console.log(formData);
  });
  res.send('Account created');
});


//method) Application.listen(port: number, hostname: string, backlog: number, callback?: (...args: any[]) => void): Server (+5 overloads)
app.listen(3000, () => {
  console.log('listening');
})