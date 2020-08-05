const Product = require('../models/product');
const shortid = require('shortid');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
                                pageTitle: 'Add product',
                                path: '/admin/add-product',
                                editing: false
                              });
}

exports.postAddProduct = (req, res, next) => {
    const {title, imageUrl} = req.body;
    const description = req.body.description.trim();
    const price = req.body.price;
    const id = shortid.generate();
    const product = new Product(title, imageUrl, description, price, id);
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
  // const editMode = req.query.edit; //return string
  // if(!editMode) {
  //   res.redirect('/');
  // } 
  const productId = req.params.productId;
  Product.findById(productId, (product) => {
    if(!product){
      res.redirect('/');
    }
    res.render('admin/edit-product',{
      pageTitle: 'Edit Product',
      path: 'admin/edit-product',
      editing: true,
      product: product
    });
  }) 
  
}

exports.postEditProduct = (req, res, next) => {
  const productId = req.body.id;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedTitle = req.body.title;
  const updatedDesc = req.body.description;
  const updatedProduct = new Product (
    updatedTitle,
    updatedImageUrl,
    updatedDesc,
    updatedPrice,
    productId
  )
  updatedProduct.save();
  res.redirect('/admin/products');
}

exports.deleteProduct = (req, res, next) => {
  const id = req.body.id;
  Product.deleteProduct(id);
  res.redirect('/admin/products');
}