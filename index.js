const KEY = require('./config/key');
const express = require('express');
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');
const app = express();
const session = require('express-session');
app.use(express.json());
const dotenv = require('dotenv');
dotenv.config();

// Configure the session middleware
app.use(session({
    secret: KEY.SECRET_SESSION,
}));

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
require('./routes/sessionRoute')(app);

app.listen(PORT, ()=>{
    console.log('listening on port' + PORT);
});