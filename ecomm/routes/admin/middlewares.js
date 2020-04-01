const { validationResult } = require('express-validator');// const expressValidator = require()... then  expressValidator.check() may be annoyer
module.exports = {

    handleErrors(templateFunc){//thien: templateFunc will be runed at some point in this function, not immediately
        return (req,res, next)=>{
            const errors = validationResult(req);   // array of error of check() func
            if(!errors.isEmpty()){
                return res.send(templateFunc({errors}));  //set back the same form, show error
            }
            next();
        }
    },

    requireAuth(req,res,next){// arguments like this because there is no customisation required like handleErrors func
        if(!req.session.userId){
            return res.redirect('/signin');
        }
        next();
    }
}