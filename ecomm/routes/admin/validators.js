const { check } = require('express-validator');   // alse need usersRepo
const usersRepo = require('../../repositories/user');

module.exports = {  // exports an object
    requireEmail: check('email').trim().normalizeEmail().isEmail().withMessage('Must be a valid email') //validator.js
        .custom(async (email) => {   // value(email) of user input
            const existingUser = await usersRepo.getOneBy({ email });
            if (existingUser) //return res.send('Email in use');
                throw new Error('Email in use');
        }),
    requirePassword: check('password').trim().isLength({ min: 4, max: 20 }).withMessage('Must be between 4 and 20 characters'),
    requirePasswordConfirmation: check('passwordConfirmation').trim().isLength({ min: 4, max: 20 }).withMessage('Must be between 4 and 20 characters')
        .custom((passwordConfirmation, { req }) => { // const req = obj.req
            if (passwordConfirmation !== req.body.password)
                throw new Error('Password must match');
        })
}