const KEY = require('../config/key');
const mongoose = require('mongoose');
const package = require('../middlewares/package');
const bodyParser = require('body-parser');
const User = mongoose.model('User');
const hashPassword = require('../service/hash256');


module.exports = (app) =>{
    app.use(bodyParser.urlencoded({ extended: false }));
    app.post('/api/register', (req, res) => {
        console.log(req.body);

        const {nameR, emailR, passwordR} = req.body;

        // Check null or empty string
        if(!nameR || !emailR || !passwordR){
            
            res.json(package(1, "Missing name or email or password", null));
            return;
        }

        // Check email format
        const regex = /\S+@\S+\.\S+/;
        if(!regex.test(emailR)){
            res.json(package(2, "Invalid email format", null));
            return;
        }

        // Check password format length 6-> 32
        if(passwordR.length < 6 || passwordR.length > 32){
            res.json(package(3, "Password length must be from 6 to 32", null));
            return;
        }


        // Hash the password using SHA-256 and the salt
        const hashedPassword = hashPassword(passwordR, KEY.SECRET_SALT);


        // Information Ok => Register
        const user = {
            name: nameR,
            email: emailR,
            password: hashedPassword,
            image: KEY.imageProfileDefault,
            role: 'Administrator',
            status: 'Active'
        }
        
        persitUser(req, res, user);  
    });

    // Save to DB and session
    function persitUser(req, res, user){
        User.findOne({ email: user.email }).then((userFound) => {
            if (userFound) {

              res.json(package(4, "Email already exists", null));
              
              return;
            }
            
            // User does not exist, create a new user
            const newUser = new User(user);
            
            newUser.save().then(() => {
              // Establish the session after user creation
              const userWithoutPassword = { ...user };
              delete userWithoutPassword.password;
    
              res.json(package(0, "Register successfully", userWithoutPassword));
            }).catch((err) => {

              res.json(package(5, "Register failed", err));

            });
          }).catch((err) => {

            res.json(package(5, "Register failed", err));

          });
    }

}