const bodyParser = require('body-parser');
const KEY = require('../config/key');
const package = require('../middlewares/package');
const hashPassword = require('../service/hash256');
const mongoose = require('mongoose');
const User = mongoose.model('User');


module.exports = (app) =>{
    app.use(bodyParser.urlencoded({ extended: false }));
    app.get('/api/login', (req, res)=>{
        // Show does not suppot GET method
        res.json(package(404, "Does not provide a GET method"));
    });

    app.post('/api/login', async (req, res)=>{
        

        const {email, password} = req.body;
        console.log("Account" + email + " " + password);
        // Check fields
        
        if(!email || email.length < 1){
            res.json(package(7, "Please provide your email!", null));
            return;
        }else if(!password || password.length < 1){
            res.json(package(8, "Please provide your password!", null));
            return;
        }

        // Check email format
        const regex = /\S+@\S+\.\S+/;
        if(!regex.test(email)){
            res.json(package(2, "Invalid email format", null));
            return;
        }

        // Check password format length 6-> 32
        if(password.length < 6 || password.length > 32){
            res.json(package(3, "Password length must be from 6 to 32", null));
            return;
        }

        // Check email and password in DB
        const hashedPassword = hashPassword(password, KEY.SECRET_SALT);
        const user = {
            email: email,
            password: hashedPassword,
        }

        try {
            const userDB = await User.findOne({ email });
        
            if (!userDB) {
              res.json(package(10, "Invalid email or password", null));
              return;
            }
        
            
            if (user.password === userDB.password) {
                // Store user information in the session
                req.session.user = userDB;
                res.json(package(0, "Login successfully", userDB));
                return;
            } else {
                res.json(package(10, "Invalid email or password", null));
                return;
            }
        } catch (error) {
            res.json(package(11, "Internal error", error));
            return;
        }

    });
}