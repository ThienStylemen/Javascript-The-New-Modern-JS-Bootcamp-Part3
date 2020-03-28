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

app.post('/', (req,res)=>{
    res.send('Account created');
});
  

//method) Application.listen(port: number, hostname: string, backlog: number, callback?: (...args: any[]) => void): Server (+5 overloads)
app.listen(3000, ()=>{
    console.log('listening');
})