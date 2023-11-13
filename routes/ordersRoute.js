const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');
const User = mongoose.model('User');
const Order = mongoose.model('Order');
const OrderDetail = mongoose.model('OrderDetail');
const Product = mongoose.model('Product');
const bodyParser = require('body-parser');
const hashPassword = require('../service/hash256');
const KEY = require('../config/key');
const jwt = require('jsonwebtoken');
const package = require('../middlewares/package');


module.exports = (app) =>{
    // Fetch ordered list
    app.get('/api/orders',async (req, res) => {
        const result = await fetchOrderList();
        return res.send(result);
    });


    // Find order detail by order_number
    app.get('/api/orders/:order_number',async (req, res) => {
        const order_number = req.params.order_number;
        const result = await findOrderDetail(order_number);
        return res.send(result);
    });



    // Sub function
    const findOrderDetail = async (order_number) => {
        try{
            const order = await Order.findOne({order_number});

            if(!order){
                return package(404, 'Order does not exist in the system', null);
            }

            const {customer_id, staff_id} = order;

            const customerDB = await Customer.findOne({_id: customer_id});
            const customer = {...customerDB._doc};
            delete customer.password;


            if(!customerDB){
                return package(404, 'Customer does not exist in the system', null);
            }

            const staffDB = await User.findOne({_id: staff_id});
            if(!staffDB){
                return package(404, 'Staff does not exist in the system', null);
            }

            const staff = {...staffDB._doc};
            delete staff.password;
            delete staff.image;
            delete staff.status;

            // console.log(staff);


            const orderDetail = await OrderDetail.findOne({order_number});
            if(!orderDetail){
                return package(404, 'Order detail does not exist in the system', null);
            }

            const endOrder = {
                order: order,
                customer: customer,
                staff: staff,
                orderDetail: orderDetail,
            }
            return package(0, 'Success', endOrder);
        }catch(err){
            return package(500, 'Server error', err.message);
        }
    }

    const fetchOrderList = async () =>{
        try{
            const orders = await Order.find({});
            if(!orders){
                return package(404, 'Order list is empty', null);
            }
            return package(0, 'Success', orders);
        }catch(err){
            return package(500, 'Server error', err.message);
        }
    }
}