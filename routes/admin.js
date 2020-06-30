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

router.get('/products/:id', adminController.getEditProduct);

module.exports = router;
