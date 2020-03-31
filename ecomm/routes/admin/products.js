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
    [ 
        requireTitle,
        requirePrice 
    ],
    upload.single('image'), //in htlm : name="image"
    (req, res) => { 
        const errors = validationResult(req);
        console.log(req.file);
        res.send('SUBMITTED');
    }
);
module.exports = router;
