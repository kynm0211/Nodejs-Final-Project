const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrderSchema = new Schema({
    customer_id: {
        type: Schema.Types.ObjectId,
        ref: 'Customer'
    },
    staff_id:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    taxrate:{
        type: Number, 
        required: true,
    },
    sub_total:{
        type: Number, 
        required: true,
    },
    total:{
        type: Number, 
        required: true,
    },
    quantity: {
        type: Number, 
        required: true,
    },
    created_date: {
        type: Date, 
        required: true,
    },
});

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;