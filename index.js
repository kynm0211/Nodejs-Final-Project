const KEY = require('./config/key');
const express = require('express');
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
require('dotenv').config();


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


// Routes
require('./routes/loginRoute')(app);
require('./routes/registerRoute')(app);
require('./routes/logoutRoute')(app);
require('./routes/uploadRoute')(app);
require('./routes/registerSale')(app);
require('./routes/updateProfileRoute')(app);
require('./routes/usersRoute')(app);
require('./routes/productsRoute')(app);
require('./routes/renewPassword')(app);
require('./routes/changePasswordRoute')(app);
require('./routes/addProductRoute')(app);
require('./routes/productDetailRoute')(app);
require('./routes/productEditRoute')(app);
require('./routes/productDeleteRoute')(app);
require('./routes/updateUser')(app);
require('./routes/POSRoute')(app);
require('./routes/customersRoute')(app);
require('./routes/ordersRoute')(app);

app.listen(PORT, ()=>{
    console.log('listening on port' + PORT);
});