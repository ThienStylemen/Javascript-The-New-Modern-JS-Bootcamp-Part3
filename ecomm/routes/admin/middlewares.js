const { validationResult } = require('express-validator');// const expressValidator = require()... then  expressValidator.check() may be annoyer
module.exports = {
    handleErrors(templateFunc, dataCb){//thien: templateFunc will be runed at some point in this function, not immediately, dataCb: dataCallback
        return async (req,res, next)=>{
            const errors = validationResult(req);   // array of error of check() func

            if(!errors.isEmpty()){
                let data = {};
                if(dataCb){ //neu co loi va ham dc truyen dataCb ( dataCb exist)
                    data = await dataCb(req); //chay callback do, trong file products.js, data = return {product} 
                }
                return res.send(templateFunc({errors, ...data}));  //set back the same form, show error, merge data to object
                // if we have errors, already merged with products
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