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

const bodyParser = (req, res, next) => {
  if (req.method === 'POST') {
    // get access to email, password, passwordConfirmation 
    //(method) internal.Readable.on(event: "close", listener: () => void): Request<ParamsDictionary, any, any> (+5 overloads)
    req.on('data', data => {   // .on ~= .addEventListener
      const parsed = data.toString('utf8').split('&');
      const formData = {};
      for (let pair of parsed) {
        const [key, value] = pair.split('=');  // destructure, first part before = is key, second part is value
        formData[key] = value;
      }
      req.body= formData; //req.bodyy cung dc
      next();
    });
  }else{
    next();
  }
};

// runc bodyParser, when the bodyParser function runed and call the next() callback function, take (req, res) an run arrow func
app.post('/', bodyParser ,(req, res) => { // bodyPapers is midlewares
  console.log(req.body); //req.bodyy cung dc
  //console.log(req); // here we checking the method is 'POST'
  res.send('Account created');
});


//method) Application.listen(port: number, hostname: string, backlog: number, callback?: (...args: any[]) => void): Server (+5 overloads)
app.listen(3000, () => {
  console.log('listening');
})