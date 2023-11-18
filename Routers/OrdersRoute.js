const express = require('express');
const app = express.Router();
const OrdersController = require('../Controllers/OrdersController');
const requiredLogin = require('../middlewares/requiredLogin');

app.get('/', requiredLogin, OrdersController.index);
app.get('/:order_number', requiredLogin, OrdersController.get);


module.exports = app;