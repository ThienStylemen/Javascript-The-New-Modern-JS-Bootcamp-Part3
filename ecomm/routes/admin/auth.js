const usersRepo = require('../../repositories/user');
const express =require('express');
const router = express.Router();    // create router
const signupTemplate = require('../../views/admin/auth/signup');
const signinTemplate = require('../../views/admin/auth/signin');
const {check} = require('express-validator');// const expressValidator = require()... then  expressValidator.check() may be annoyer

//(property) Application.get: ((name: string) => any) & IRouterMatcher<Express, any>
router.get('/signup', (req, res) => {
    res.send( signupTemplate({req})); // req: req
});

router.post(
    '/signup',
    [check('email').isEmail(), check('password'), check('passwordConfirmation')],
    async (req, res) => {
    // console.log(req.body); //req.bodyy cung dc
    const { email, password, passwordConfirmation } = req.body;
    const existingUser = await usersRepo.getOneBy({ email });
    if (existingUser) return res.send('Email in use');
    if (password !== passwordConfirmation) return res.send('Passwords must match');

    // create a user in our user repo to represent this person
    const user = await usersRepo.create({ email, password }); //{email: email, password: password}, we also got the id

    // store the id inside the user cookie, now we use third pakage
    req.session.userId = user.id // added by cookie session req.session === {}

    res.send('Account created');
});

router.get('/signout', (req, res) => {
    //(property) CookieSessionInterfaces.CookieSessionRequest.session?: CookieSessionInterfaces.CookieSessionObject. Represents the session for the given request.
    req.session = null; //user makes request you sign out the response we sent back is going to have a set cookie property inside of it
    res.send('your are logged out')
});

router.get('/signin', (req, res) => {
    res.send(signinTemplate());
});
router.post('/signin', async (req, res) => {
    const { email, password } = req.body; // infomation when we click enter html
    const user = await usersRepo.getOneBy({ email });
    if (!user) return res.send('email not found');
    const validPassword = await usersRepo.comeparePasswords(user.password, password);// return true false 
    if (!validPassword) return res.send('invalid password');

    req.session.userId = user.id;
    res.send('your are signed in');
});

module.exports = router;