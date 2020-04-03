const express = require('express');
const router = express.Router();

//Receive a post request to add an item to a cart
router.post('/cart/products', (req,res)=>{
    console.log(req.body.productId); 
    res.send('Product Added to cart');
});

// Receive a GEt request to show all items in cart

//Receive a post request to delete an item from a cart


module.exports = router;

