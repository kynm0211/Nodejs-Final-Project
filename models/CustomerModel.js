const mongoose = require('mongoose');


const CustomerSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
    },
    password:{
        type: String, 
        required: true,
    },
    phone: {
        type: String, 
        required: true,
        unique: true,
    },
    address: {
        type: String, 
        required: true,
    },
    email:{
        type: String, 
        required: false,
    },
    image:{
        type: String, 
        required: false,
    },
    creation_date:{
        type: Date, 
        required: true,
        default: Date.now,
    }
});

const Customer = mongoose.model('Customer', CustomerSchema);
module.exports = Customer;

