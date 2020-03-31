const usersRepo = require('../../repositories/user');
const express = require('express');
const router = express.Router();    // create router
const signupTemplate = require('../../views/admin/auth/signup');
const signinTemplate = require('../../views/admin/auth/signin');
const { check, validationResult } = require('express-validator');// const expressValidator = require()... then  expressValidator.check() may be annoyer
const { requireEmail, requirePassword, requirePasswordConfirmation,
        requireEmailExists,requireValidPasswordForUser} = require('./validators');
//(property) Application.get: ((name: string) => any) & IRouterMatcher<Express, any>
router.get('/signup', (req, res) => {
    res.send(signupTemplate({ req })); // req: req
});

router.post(
    '/signup',
    [
        requireEmail,    // first element of the array, a property of an object in validators.js
        requirePassword,
        requirePasswordConfirmation
    ],
    async (req, res) => { //validationResult catch error of chech() func
        const errors = validationResult(req);   //validationResult(req: Request): Result<ValidationError>, 
        if (!errors.isEmpty()) {
            return res.send(signupTemplate({ req, errors })); // req: req
        }
        // console.log(req.body); //req.bodyy cung dc
        const { email, password, passwordConfirmation } = req.body;

        // create a user in our user repo to represent this person
        const user = await usersRepo.create({ email, password }); //{email: email, password: password}, we also got the id

        // store the id inside the user cookie, now we use third pakage
        req.session.userId = user.id // added by cookie session req.session === {}

        res.send('Account created');
    }
);

router.get('/signout', (req, res) => {
    //(property) CookieSessionInterfaces.CookieSessionRequest.session?: CookieSessionInterfaces.CookieSessionObject. Represents the session for the given request.
    req.session = null; //user makes request you sign out the response we sent back is going to have a set cookie property inside of it
    res.send('your are logged out');
});

router.get('/signin', (req, res) => {
    res.send(signinTemplate());
});
router.post(
    '/signin',
    [
        requireEmailExists,
        requireValidPasswordForUser
    ],
    async (req, res) => {
        const errors = validationResult(req);   // array of error of check() func
        console.log(errors);
        const { email } = req.body; // infomation when we click enter html
        const user = await usersRepo.getOneBy({ email });
        
        req.session.userId = user.id;
        res.send('your are signed in');
    });

module.exports = router;

