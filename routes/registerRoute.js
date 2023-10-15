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

        const {name, email, password} = req.body;
		const username = extractUsername(email);

        // Check null or empty string
        if(!username || !name || !email || !password){
            
            res.json(package(1, "Missing username or name or email or password", null));
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


        // Hash the password using SHA-256 and the salt
        const hashedPassword = hashPassword(password, KEY.SECRET_SALT);


        // Information Ok => Register
        const user = {
            username: username,
            name: name,
            email: email,
            password: hashedPassword,
            image: KEY.imageProfileDefault,
            role: 'Administrator',
            status: 'Active'
        }
        
        persitUser(req, res, user);  
    });

    // Save to DB and session
    function persitUser(req, res, user){
        User.findOne({ username: user.username }).then((userFound) => {
            if (userFound) {

              	res.json(package(4, "username already exists", null));
              
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

	function extractUsername(email) {
		if (typeof email !== 'string') {
			return null; // Handle cases where the input is not a string
		}
	
		const pattern = /^([^@]+)@/;
		const match = email.match(pattern);
	
		if (match) {
			const capturedText = match[1];
			return capturedText.toLowerCase().trim();
		} else {
			return null; // Handle cases where the email doesn't match the expected pattern
		}
	}
}