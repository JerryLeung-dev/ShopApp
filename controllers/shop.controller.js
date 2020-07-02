const Product = require('../models/product');
const Cart = require('../models/cart');

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

exports.postCart = (req, res, next) => {
  const productId = req.body.id
  Product.findById(productId, (product) => {
    Cart.addProduct(productId, product.price);
  })
  res.redirect('/');
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

exports.getProductDetails = (req, res, next) => {
  const id = req.params.id;
  Product.findById(id, selectedProduct =>{
    // console.log(selectedProduct);
    res.render('shop/product-detail',{
      pageTitle: 'Product Detail',
      path: '/products',
      prod: selectedProduct
  })
  });
  
}