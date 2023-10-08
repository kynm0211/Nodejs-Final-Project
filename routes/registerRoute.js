const KEY = require('../config/key');
const mongoose = require('mongoose');
const package = require('../middlewares/package');
const bodyParser = require('body-parser');
const User = mongoose.model('User');

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

        // Information Ok => Register
        const user = {
            name: nameR,
            email: emailR,
            password: passwordR,
            image: KEY.imageProfileDefault,
        }
        User.findOne({email: user.email}).then((userFound)=>{
            if(userFound){
                res.json(package(4, "Email already exists", null));
                return;
            }
            const newUser = new User(user);
            newUser.save().then(()=>{
                res.json(package(0, "Register successfully", user));

                // Establish the session
                req.session.user = user;
                console.log(req.session.user);
                return;
            }).catch((err)=>{
                res.json(package(5, "Register failed", err));
                return;
            });
        }).catch((err)=>{
            res.json(package(5, "Register failed", err));
            return;
        });
    });
}