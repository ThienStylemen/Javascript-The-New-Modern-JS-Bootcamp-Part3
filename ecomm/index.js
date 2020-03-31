const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const authRouter = require('./routes/admin/auth');
const productsRouter = require('./routes/admin/products');

app.use(express.static('public'));  // this is what we mandatory to run main.css
//(property) Application.use: ApplicationRequestHandler<Express>
app.use(bodyParser.urlencoded({extended: true})); //  midlewares automatically instead of ... app.post('/products', bodyParser.urlencoded({extended: true})  .......
app.use(cookieSession({keys: ['asdadasd']})); //exactly one property, random characters is essentially the encryption key that is going to be used to encrypt all that data
app.use(authRouter);
app.use(productsRouter);
//method) Application.listen(port: number, hostname: string, backlog: number, callback?: (...args: any[]) => void): Server (+5 overloads)
app.listen(3000, () => {
  console.log('listening');
})