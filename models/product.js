const fs = require('fs');
const path = require('path');

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
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), err => {
        // console.log(err);
      });
    });
  }

  static findById(id, cb) {
    getProductsFromFile(products => {
      const selectedProduct = products.find(product => product.id === id);
       cb(selectedProduct)
    });

  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
};