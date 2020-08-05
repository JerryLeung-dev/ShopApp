const path = require('path');

const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin.controller');
const products = [];

// /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct);

// /admin/add-product => POST
router.post('/add-product', adminController.postAddProduct);

router.get('/products',adminController.getProducts);

router.post('/edit-product', adminController.postEditProduct);

router.get('/edit-product/:productId', adminController.getEditProduct);

router.post('/delete-product', adminController.deleteProduct);


module.exports = router;
