require('../models/OrderModel');
require('../models/OrderDetailModel');
const mongoose = require('mongoose');
const Order = mongoose.model('Order');
const Customer = mongoose.model('Customer');
const User = mongoose.model('User');
const OrderDetail = mongoose.model('OrderDetail');
const package = require('../middlewares/package');

module.exports = {
    getAll: async (req, res) => {
        try {
            const result = await fetchAllOrders(req, res);
            return res.send(result);
        } catch (err) {
            res.send(package(404, err.message, null));
        }
    },
    getByDay: async (req, res) => {
        try {
            const result = await fetchByDay(req, res);
            return res.send(result);
        } catch (err) {
            res.send(package(404, err.message, null));
        }
    }
};

const fetchByDay = async (req, res) => {
    try {
        const startDate = req.query.startDate ? new Date(req.query.startDate) : null;
        const endDate = req.query.endDate ? new Date(req.query.endDate) : null;

        

        const dateFilter = {};
        if (startDate) {
            dateFilter.$gte = startDate;
        }
        if (endDate) {
            dateFilter.$lt = new Date(endDate.getTime() + 24 * 60 * 60 * 1000);
        }


        const orders = await Order.find({
            created_date: dateFilter,
        }).lean();

        if (!orders || orders.length === 0) {
            return package(404, 'Order list is empty', null);
        }

        return package(0, 'Success', orders);
    } catch (err) {
        return package(500, 'Server error', err.message);
    }
};


const fetchAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).lean();
        if (!orders || orders.length === 0) {
            return package(404, 'Order list is empty', null);
        }

        return package(0, 'Success', orders);
    } catch (err) {
        return package(500, 'Server error', err.message);
    }
};