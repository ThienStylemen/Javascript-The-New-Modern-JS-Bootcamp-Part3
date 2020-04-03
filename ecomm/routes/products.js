// HOME PAGE
const express= require('express');
const productsRepo = require('../repositories/products');
const productsIndexTemplte = require('../views/products/index');


const router = express.Router();

router.get('/', async( req,res)=>{
    const products = await productsRepo.getAll();
    res.send(productsIndexTemplte({products}));
});

module.exports = router;