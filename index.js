const express = require('express');
const PORT = process.env.PORT || 5000;
const app = express();

const dotenv = require('dotenv');
dotenv.config();

// Middleware


// Routes
require('./routes/loginRoute')(app);

app.listen(PORT, ()=>{
    console.log('listening on port' + PORT);
});