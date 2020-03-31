const express = require('express');
const { validationResult } = require('express-validator');
const ProductsRepo = require('../../repositories/products');
const productsNewTemplate = require('../../views/admin/products/new');
const { requireTitle, requirePrice } = require('./validators');

const router = express.Router();
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
    (req, res) => { 
        const errors = validationResult(req);
        console.log(errors);
        console.log(req.body);
        res.send('SUBMITTED');
    }
);
module.exports = router;
