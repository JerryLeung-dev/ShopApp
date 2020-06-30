const Product = require('../models/product');

exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/',
      
    });
  });
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/',
        
      });
    });
  };

exports.getCart = (req, res, next) => {
  res.render('shop/cart',{
    pageTitle: 'Cart',
    path:'/cart'
  })
}

exports.getCheckout = (req,res,next) => {
  res.render('shop/checkout',{
    pageTitle: 'Checkout',
    path:'/checkout'
  })
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    pageTitle: 'Checkout',
    path:'/checkout'
  })
}