const express = require('express');
const multer = require('multer');

const {handleErrors, requireAuth} = require('./middlewares');    // helper func

const productsRepo = require('../../repositories/products');
const productsNewTemplate = require('../../views/admin/products/new');
const productsIndexTemplate = require('../../views/admin/products/index');// func: module.exports = ({products})=>{}
const productsEditTemplate = require('../../views/admin/products/edit');
const { requireTitle, requirePrice } = require('./validators');

const router = express.Router();
const upload = multer({storage: multer.memoryStorage()});//multer(options?: multer.Options): Multer. Returns a Multer instance that provides several methods for generating middleware that process files uploaded in multipart/form-data format.

//set up
router.get('/admin/products',requireAuth,async (req, res) => { 
    const products = await productsRepo.getAll();
    res.send(productsIndexTemplate({products}));
});

//for new
router.get('/admin/products/new',requireAuth ,(req, res) => {  //.get is to send a form
   
    res.send(productsNewTemplate({}));
});

router.post(
    '/admin/products/new', 
    requireAuth,    // signin before upload.single()
    //also going to parse all the different text field (req.body)
    upload.single('image'), //in htlm, name="image", //now that we're doing this image upload we have a very different encoding type on our form and so the line "app.use(bodyParser.urlencoded({extended: true}));" no longer applied
    [requireTitle, requirePrice],   // if upload.single stay below this line, Nothing is parsed 
    handleErrors(productsNewTemplate),//There are no parentheses because we are passing a reference that function that can be called at some point time in the future repeatedly
    async (req, res) => { 
        
        const image = req.file.buffer.toString('base64');// base64 can safely represent an image in the a string format
        const {title, price} = req.body;//upload.single('image')
        await productsRepo.create({title, price, image});
        
        res.redirect('/admin/products');
    }
);

//for edit
router.get('/admin/products/:id/edit', requireAuth ,async (req,res)=>{   // req.params.id
    //console.log(req.params.id);
    const product = await productsRepo.getOne(req.params.id);
    if(!product) return res.send('product not found');
    res.send(productsEditTemplate({product}));
})

router.post('/admin/products/:id/edit', 
    requireAuth, 
    upload.single('image'),  // file name is image (in html)
    [requireTitle, requirePrice],
    handleErrors(productsEditTemplate, async(req)=>{
        const product = await productsRepo.getOne(req.params.id);
        return {product};   //
    }),
    async(req, res)=>{
        const changes = req.body;   // save what changes
        if(req.file){     // if file was provided, //if received an image
            changes.image = req.file.buffer.toString('base64');
        }
        try{
            await productsRepo.update(req.params.id, changes);  //update func might throw errors
        }catch(err){
            return res.send('Could not find item');
        }

        res.redirect('/admin/products');
    }
);

// for delete, requireAuth(req,res,next)
router.post('/admin/products/:id/delete', requireAuth, async (req,res)=>{
    await productsRepo.delete(req.params.id); 
    res.redirect('/admin/products');
});

module.exports = router;
