const mongoose = require('mongoose');

// Define the User
const UserSchema = new mongoose.Schema({
    username:{
        type: 'string',
        required: true,
        unique: true
    },
    name: {
        type: 'string',
        required: true
    },
    email: { 
        type: 'string',
        required: true,
        unique: true
    },
    password: {
        type: 'string',
        required: true
    },
    image:{
        type: 'string',
        required: true
    },
    role:{
        type: 'string',
        required: true
    },
    status:{
        type: 'string',
        required: true
    },
});

// Export the model
const User = mongoose.model('User', UserSchema);

module.exports = User;