
module.exports = {
    getError(errors, prop) { // prop === 'email' || 'password' || 'passwordConfirmation'
        try { //if (errors){    // error is an array has an object [{}]
            return errors.mapped()[prop].msg;    // errors.mapped() === { email: ... , password: ...., } a big object  
        } catch (err) {
            return '';
        }
    }
};
