const express = require('express');
const app = express();

//(property) Application.get: ((name: string) => any) & IRouterMatcher<Express, any>
app.get('/', (req,res)=>{
    res.send(`
        <div>
            <form>
                <input placeholder="email" />
                <input placeholder="password""/>
                <input placeholder="password confirmation""/>
                <button> Sign Up </button>
            </form>
        </div>
    `);
});

//method) Application.listen(port: number, hostname: string, backlog: number, callback?: (...args: any[]) => void): Server (+5 overloads)
app.listen(3000, ()=>{
    console.log('listening');
})