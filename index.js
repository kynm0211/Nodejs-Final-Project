const KEY = require('./config/key');
const express = require('express');
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');


require('dotenv').config();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Connect to the mongoose server
mongoose.connect(KEY.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{

    console.log('Connected to MongoDB');

}).catch((err)=>{

    console.log(err);
    
});

// Models
require('./models/UserModel');
//Test
require('./models/CustomerModel');
require('./models/ProductCartModel');
require('./models/OrderModel');
require('./models/OrderDetailModel');
// Middleware


// Assign the Routers
app.use('/api/account', require('./Routers/AccountRoute'));
app.use('/api/users', require('./Routers/UsersRoute'));
// Routes
require('./routes/registerRoute')(app);
require('./routes/productsRoute')(app);
require('./routes/addProductRoute')(app);
require('./routes/POSRoute')(app);
require('./routes/customersRoute')(app);
require('./routes/ordersRoute')(app);

app.listen(PORT, ()=>{
    console.log('listening on port' + PORT);
});