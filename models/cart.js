const fs = require('fs');
const path =require('path');


const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
);

const saveToCart = (updatedCart, cb) => {
    fs.writeFile(p,JSON.stringify(updatedCart), (err) =>{
        cb(err);
    })
}

module.exports = class Cart {
    static addProduct (id, productPrice) {
        //Fetch data from cart, if already made then use that cart 
        fs.readFile(p, (err, fileContent)=> {
            //if have cart, then use the cart
            let cart = {product: [], totalPrice: 0}
            if(!err){
                cart = JSON.parse(fileContent);
                // console.log(cart);
            }
                //if item already in the products array, update the quantity and the total price
            const existingProductIndex = cart.products.findIndex(product => product.id === id);
            // console.log(existingProductIndex);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            if(existingProduct){
                updatedProduct = {...existingProduct};
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products[existingProductIndex] = updatedProduct;
            } else {
                //if item not in the products array, add the item into the array and update the total price
                updatedProduct  = {id: id, qty: 1};
                cart.products = [...cart.products, updatedProduct];
            }
            //increase the total price
            cart.totalPrice = cart.totalPrice + +productPrice;
            //save to the cart
            // saveToCart(cart, console.log);
            fs.writeFile(p, JSON.stringify(cart), (err) =>{
            console.log(err);
            })  
        })
        
    }
}