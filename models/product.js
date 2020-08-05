const fs = require('fs');
const path = require('path');

const db = require('../util/database');

const Cart = require('./cart');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'products.json'
);

const getProductsFromFile =(cb) => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
          return cb([]);
        }
        cb(JSON.parse(fileContent));
      });
}

const writeProductsToFile = (products) => {
  fs.writeFile(p, JSON.stringify(products), err => {
    console.log(err);
  });
}

module.exports = class Product {
  constructor(title, imageUrl, description, price, id) {
    this.title = title;
    this.id = id;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile(products => {
        //check if the product exists in database
        const existingProductIndex = products.findIndex(product => product.id === this.id);
        if(existingProductIndex >= 0) {
          const updatedProducts = [...products];
          updatedProducts[existingProductIndex] = this;
          console.log(updatedProducts);
          // fs.writeFile(p, JSON.stringify(updatedProducts), err => {
          //   console.log(err);
          // });
          writeProductsToFile(updatedProducts);
        } else{
          products.push(this);
          // fs.writeFile(p, JSON.stringify(products), err => {
          // console.log(err);
          // });
          writeProductsToFile(products);
        }

    });
  }

  static findById(id, cb) {
    // getProductsFromFile(products => {
    //   const selectedProduct = products.find(product => product.id === id);
    //    cb(selectedProduct)
    // });

  }

  static fetchAll() {
    // getProductsFromFile(cb);
    return db.execute('SELECT * FROM products');
  }

  static deleteProduct(id) {
    // getProductsFromFile(products => {
    //   const product = products.find(prod => prod.id === id);
    //   const updatedProducts = products.filter(prod => prod.id !== id);
    //   fs.writeFile(p, JSON.stringify(updatedProducts), err => {
    //     if(err) console.log(err)
    //     if (!err) {
    //       Cart.deleteProduct(id, product.price);
    //     }
    //   });
    // });
    
  }
}