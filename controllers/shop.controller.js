const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getIndex = (req, res, next) => {

  Product.fetchAll()
          .then(([rows, fieldData]) => {
            res.render('shop/product-list', {
                  prods: rows,
                  pageTitle: 'All Products',
                  path: '/'
            });
          })
          .catch(err => console.log(err));
  // Product.fetchAll(products => {
  //   res.render('shop/product-list', {
  //     prods: products,
  //     pageTitle: 'All Products',
  //     path: '/',
      
  //   });
  // });
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
  Cart.getCart(cart => {
    Product.fetchAll(products => {
      const cartProducts = [];
      for ( product of products) {
        const cartProductData = cart.products.find(prod => prod.id === product.id)
        if (cartProductData){
          cartProducts.push({productData: product, qty: cartProductData.qty});
        }
      }
      res.render('shop/cart',{
        pageTitle: 'Cart',
        path:'/cart',
        products: cartProducts
      })
    })
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

exports.postDeleteCartProduct = (req, res, next) => {
  const productId = req.body.id;
  Product.fetchAll(product => {
    Cart.deleteProduct(productId, product.price);
    res.redirect('/');
  })
}

