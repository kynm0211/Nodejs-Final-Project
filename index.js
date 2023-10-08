const KEY = require('./config/key');
const express = require('express');
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');
const app = express();
const session = require('express-session');
app.use(express.json());
require('dotenv').config();

// Configure the Cookie session middleware
app.use(
    session({
        secret: KEY.SECRET_SESSION_KEY,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60,
            sameSite: 'strict',
        },
    })
);

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

// Middleware


// Routes
require('./routes/loginRoute')(app);
require('./routes/registerRoute')(app);
require('./routes/logoutRoute')(app);
require('./routes/uploadRoute')(app);
app.listen(PORT, ()=>{
    console.log('listening on port' + PORT);
});