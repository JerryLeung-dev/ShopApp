const path = require('path');

const express = require('express');
const router = express.Router();

const shopController = require('../controllers/shop.controller');

router.get('/', shopController.getIndex);
router.get('/products', shopController.getProducts);
// router.get('/products/:id',shopController.getProductDetail);
router.get('/cart', shopController.getCart);
router.get('/checkout', shopController.getCheckout);
router.get('/orders', shopController.getOrders);

router.get('/products/:id', shopController.getProductDetails);

router.post('/cart', shopController.postCart);
router.post('/delete-cart-product', shopController.postDeleteCartProduct);
module.exports = router;
