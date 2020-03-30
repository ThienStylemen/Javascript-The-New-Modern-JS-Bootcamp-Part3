const layout = require('../layout');    // require our layout function
const getError = (errors, prop )=>{ // prop === 'email' || 'password' || 'passwordConfirmation'
    try{ //if (errors){    // error is an array has an object [{}]
        return errors.mapped()[prop].msg    // errors.mapped() === { email: ... , password: ...., } a big object
    }catch(err){
        return '';
    }
}

module.exports = ({ req, errors  }) => {
    return layout({
        content: `
            <div>
                YOUR ID is: ${req.session.userId}
                <form method="POST">
                <input name="email" placeholder="email" />
                ${getError(errors, 'email')}
                <input name="password" placeholder="password" />
                ${getError(errors, 'password')}
                <input name="passwordConfirmation" placeholder="password confirmation" />
                ${getError(errors, 'passwordConfirmation')}
                <button>Sign Up</button>
                </form>
            </div>
        `
    });
}

/* note thien, this is OK
    res.send( signupTemplate({req})); // req: req //  we see object have 1 property
    return res.send( signupTemplate({req, errors})); // req: req    // we see here use enough property
*/