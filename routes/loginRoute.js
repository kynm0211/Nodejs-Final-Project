const bodyParser = require('body-parser');
const KEY = require('../config/key');
const package = require('../middlewares/package');
const hashPassword = require('../service/hash256');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Customer = mongoose.model('Customer');

module.exports = (app) =>{
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    app.get('/api/login', (req, res)=>{
        // Show does not suppot GET method
        res.json(package(404, "Does not provide a GET method"));
    });

    app.post('/api/login', async (req, res)=>{
        
        const username = req.body.username;
        const password = req.body.password;
        // Check fields
        
        if(!username || username.length < 1){
            return res.json(package(7, "Please provide your username!", null));
            
        }else if(!password || password.length < 1){
            return res.json(package(8, "Please provide your password!", null));
        }

        // Check email and password in DB
        const hashedPassword = hashPassword(password, KEY.SECRET_SALT);
        const user = {
            username: username,
            password: hashedPassword,
        }
        try {
            const userDB = await User.findOne({ username });
            const customerDB = await Customer.findOne({ phone: username });
            
            if (!userDB && !customerDB) {
                return res.json(package(10, "Invalid username or password", null));
                
            }
        
            
            if(userDB){
                if (user.password === userDB.password) {
                    // Store user information in the session
                    const userWithoutPassword = { ...userDB };
                    delete userWithoutPassword._doc.password;
    
                    prepairUser = {...userWithoutPassword};
                    prepairUser._doc.token = jwt.sign(prepairUser._doc, KEY.SECRET_SESSION_KEY , { expiresIn: '24h' });
                    if(prepairUser._doc.status === 'InActive'){
                        return res.json(package(12, "Your account is not active", null));
                    }else if(prepairUser._doc.status === 'Lock'){
                        return res.json(package(12, "Your account is locked by Administator", null));
                    }
    
    
                    return res.json(
                        package(0, "Login success", prepairUser._doc)
                    );
                    
                } else {
                    return res.json(package(10, "Invalid username or password", null));
                    
                }
            }else if(customerDB){
                if(user.password === customerDB.password){
                    const userWithoutPassword = { ...customerDB };
                    delete userWithoutPassword._doc.password;
    
                    prepairUser = {...userWithoutPassword};
                    prepairUser._doc.token = jwt.sign(prepairUser._doc, KEY.SECRET_SESSION_KEY , { expiresIn: '24h' });
    
                    return res.json(
                        package(0, "Login success", prepairUser._doc)
                    );
                }
            }
        } catch (error) {
            return res.json(package(11, "Internal error", error.message));
        }

    });
}