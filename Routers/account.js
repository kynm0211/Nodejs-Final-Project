const express = require('express');
const app = express.Router();
const AccountController = require('../Controllers/AccountController');

app.get('/', AccountController.getProfile);

app.post('/login', AccountController.login);

app.post('/change-password', AccountController.changePassword);

app.post('/direct', AccountController.directLogin);

module.exports = app;