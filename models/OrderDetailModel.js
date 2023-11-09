const mongoose = require('mongoose');
const {Schema} = mongoose;
const ProductCart = require('./ProductCartModel');


const OrderDetailSchema = new mongoose.Schema({
    order_id: {
        type: Schema.Types.ObjectId,
        ref: 'Order',
        unique: true
    },
    products: [ProductCart],
});
const OrderDetail = mongoose.model('OrderDetail', OrderDetailSchema);
module.exports = OrderDetail;