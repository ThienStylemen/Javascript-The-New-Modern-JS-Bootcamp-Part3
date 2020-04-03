const express = require('express');
const cartsRepo = require('../repositories/carts');
const productsRepo = require('../repositories/products');
const cartShowTemplate = require('../views/carts/show');
const router = express.Router();

//Receive a post request to add an item to a cart
router.post('/cart/products', async (req,res)=>{
    // Figure out the cart
    let cart;
    if(!req.session.cartId){ //whether the user already has cartId stored inside of our cars Repository
        // we dont have a cart, so need to create one, store the cart id on the req.session.cartId, 
        cart = await cartsRepo.create({items: []}); // create o day cung se tao ra 1 random id
        req.session.cartId = cart.id;
    }else{
        cart = await cartsRepo.getOne(req.session.cartId);
    }

    // either increment quantity for existing product or add new product to items array
    const existingItem = cart.items.find(eachItem => eachItem.id===req.body.productId );
    if(existingItem) existingItem.quantity ++;         //increment quantity and save cart
    else cart.items.push({id: req.body.productId, quantity: 1})//add new product id to items array
    
    await cartsRepo.update(cart.id, {items: cart.items});   //async update(id, attrs)
    
    res.send('Product Added to cart');
});

// Receive a GEt request to show all items in cart
router.get('/cart', async (req,res)=>{
    if(!req.session.cartId) return res.redirect('/');
    const cart = await cartsRepo.getOne(req.session.cartId);    // {id and items[{id, quantity}]}

    for(let item of cart.items){
        const product = await productsRepo.getOne(item.id); // id of item
        item.product = product;
    }
    res.send(cartShowTemplate({items: cart.items}));
});
//Receive a post request to delete an item from a cart


module.exports = router;

