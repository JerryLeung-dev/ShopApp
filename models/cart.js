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

const fetchCart = (cb) => {
    fs.readFile(p, (err, fileContent)=> {
        let cart = {product: [], totalPrice: 0}
            if(!err){
                cart = JSON.parse(fileContent);
                cb(cart);
            }
    });
}

module.exports = class Cart {
    static addProduct (id, productPrice) {
        //Fetch data from cart, if already made then use that cart 
        fs.readFile(p, (err, fileContent)=> {
            //if have cart, then use the cart
            let cart = {products: [], totalPrice: 0}
            console.log(fileContent);
            if(!err){
                cart = JSON.parse(fileContent);
            // console.log(cart);
            }
             //if item already in the products array, update the quantity and the total price
            try{
                const existingProductIndex = cart.products.findIndex(product => product.id === id);
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
            }  catch {
                const updatedProduct = {id: id, qty:1}
                cart.products
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

    static deleteProduct(id, productPrice) {
        fs.readFile(p, (err, fileContent) => {
            if (err) {
            return;
            }
            const updatedCart = { ...JSON.parse(fileContent) };
            const product = updatedCart.products.find(prod => prod.id === id);
            if(!product) {
                return;
            }
            const productQty = product.qty;
            updatedCart.products = updatedCart.products.filter(
            prod => prod.id !== id
            );
            updatedCart.totalPrice =
            updatedCart.totalPrice - productPrice * productQty;

            saveToCart(updatedCart, console.log);
    
            // fs.writeFile(p, JSON.stringify(updatedCart), err => {
            // console.log(err);
            // });
        });
    }

    static getCart (cb) {
        fs.readFile(p,(err, fileContent) => {
            const cart = JSON.parse(fileContent);
            if(err) {
                cb(null);
            } else {
                cb(cart);
            }
        });
    }
}

