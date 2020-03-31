const express = require('express');
const { validationResult } = require('express-validator');
const multer = require('multer');


const ProductsRepo = require('../../repositories/products');
const productsNewTemplate = require('../../views/admin/products/new');
const { requireTitle, requirePrice } = require('./validators');

const router = express.Router();
const upload = multer({storage: multer.memoryStorage()});//multer(options?: multer.Options): Multer. Returns a Multer instance that provides several methods for generating middleware that process files uploaded in multipart/form-data format.

router.get('/admin/products', (req, res) => { });

router.get('/admin/products/new', (req, res) => {  //.get is to send a form
    res.send(productsNewTemplate({}));
});

router.post(
    '/admin/products/new', 
    //also going to parse all the different text field (req.body)
    upload.single('image'), //in htlm, name="image", //now that we're doing this image upload we have a very different encoding type on our form and so the line "app.use(bodyParser.urlencoded({extended: true}));" no longer applied
    [requireTitle, requirePrice],   // if upload.single stay below this line, Nothing is parsed 
    async (req, res) => { 
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.send(productsNewTemplate({errors}));
        }
        
        const image = req.file.buffer.toString('base64');// base64 can safely represent an image in the a string format
        const {title, price} = req.body;//upload.single('image')
        await ProductsRepo.create({title, price, image});
        
        res.send('SUBMITTED');
    }
);
module.exports = router;
