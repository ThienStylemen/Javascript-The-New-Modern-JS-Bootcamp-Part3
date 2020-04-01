const usersRepo = require('../../repositories/user');
const express = require('express');
const router = express.Router();    // create router
const signupTemplate = require('../../views/admin/auth/signup');
const signinTemplate = require('../../views/admin/auth/signin');
const { requireEmail, requirePassword, requirePasswordConfirmation,
        requireEmailExists,requireValidPasswordForUser} = require('./validators');
const {handleErrors} = require('./middlewares');


//(property) Application.get: ((name: string) => any) & IRouterMatcher<Express, any>
router.get('/signup', (req, res) => {
    res.send(signupTemplate({ req })); // req: req to display req.userId
});

router.post(
    '/signup',
    [
        requireEmail,    
        requirePassword,
        requirePasswordConfirmation
    ],
    handleErrors(signupTemplate),
    async (req, res) => { //validationResult catch error of chech() func
        console.log('asdfasdf')
        const { email, password } = req.body;
        // create a user in our user repo to represent this person
        const user = await usersRepo.create({ email, password }); //{email: email, password: password}, we also got the id
        // store the id inside the user cookie, now we use third pakage
        req.session.userId = user.id // added by cookie session req.session === {}

        res.redirect('/admin/products');
    }
);


router.get('/signout', (req, res) => {
    //(property) CookieSessionInterfaces.CookieSessionRequest.session?: CookieSessionInterfaces.CookieSessionObject. Represents the session for the given request.
    req.session = null; //user makes request you sign out the response we sent back is going to have a set cookie property inside of it
    res.send('your are logged out');
});

router.get('/signin', (req, res) => {
    res.session =null;
    res.send(signinTemplate({}));   // empty object
});
router.post(
    '/signin',
    [
        requireEmailExists,
        requireValidPasswordForUser
    ],
    handleErrors(signinTemplate),
    async (req, res) => {
        const { email } = req.body; // infomation when we click enter html
        const user = await usersRepo.getOneBy({ email });
        
        req.session.userId = user.id;
        res.redirect('/admin/products');
    });

module.exports = router;
