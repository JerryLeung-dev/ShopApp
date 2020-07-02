const Product = require('../models/product');
const shortid = require('shortid');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
                                pageTitle: 'Add product',
                                path: '/admin/add-product',
                              });
}

exports.postAddProduct = (req, res, next) => {
    const {title, imageUrl, description, price} = req.body;
    const id = shortid.generate();
    const product = new Product(title, imageUrl, description,price, id);
    product.save();
    res.redirect('/');
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: 'admin/products',
 
      });
    });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit; //return string
  if(!editMode) {
    res.redirect('/');
  }  
  res.render('admin/edit-product',{
      pageTitle: 'Edit Product',
      path: 'add/edit-product',
      editing: editMode
    });
}
