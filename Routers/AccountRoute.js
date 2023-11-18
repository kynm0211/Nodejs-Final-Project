const express = require('express');
const app = express.Router();
const AccountController = require('../Controllers/AccountController');
const multer = require('multer');
const uploadFile = require("../service/uploadFirebase");
const upload = multer();


// Get information of profile
app.get('/', AccountController.getProfile);

// Update profile (image and name)
app.patch('/', upload.single("file"), AccountController.updateProfile);

// Login with username and password
app.post('/login', AccountController.login);

app.post('/change-password', AccountController.changePassword);

// Login via url
app.post('/direct', AccountController.directLogin);

// Renew password

app.put('/renew-password', AccountController.renewPassword);

module.exports = app;