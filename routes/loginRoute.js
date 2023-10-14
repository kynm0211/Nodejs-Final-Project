const bodyParser = require('body-parser');
const KEY = require('../config/key');
const package = require('../middlewares/package');
const hashPassword = require('../service/hash256');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');


module.exports = (app) =>{
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    app.get('/api/login', (req, res)=>{
        // Show does not suppot GET method
        res.json(package(404, "Does not provide a GET method"));
    });

    app.post('/api/login', async (req, res)=>{
        
        const email = req.body.email;
        const password = req.body.password;
        console.log("Account " + email + " " + password);
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
                const userWithoutPassword = { ...userDB };
                delete userWithoutPassword._doc.password;

                prepairUser = {...userWithoutPassword};
                prepairUser._doc.token = jwt.sign(prepairUser._doc, KEY.SECRET_SESSION_KEY , { expiresIn: '24h' });
                res.json(
                    package(0, "Login success", prepairUser._doc)
                );
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