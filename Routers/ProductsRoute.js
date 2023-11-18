const express = require('express');
const app = express.Router();
const ProductsController = require('../Controllers/ProductsController');


app.get('/', ProductsController.index);


app.get('/:barcode', ProductsController.get);
app.put('/:barcode', ProductsController.edit);

module.exports = app;