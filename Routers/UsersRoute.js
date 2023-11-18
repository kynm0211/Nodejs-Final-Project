const express = require('express');
const app = express.Router();
const UsersController = require('../Controllers/UsersController');



app.get('/', UsersController.index)

app.put('/:userId', UsersController.update)

app.delete('/:userId', UsersController.destroy)


app.post('/register', UsersController.register);

app.post('/resend', UsersController.resendEmail);

module.exports = app;