const bodyParser = require('body-parser');
const KEY = require('../config/key');
const package = require('../middlewares/package');
const hashPassword = require('../service/hash256');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const jwt = require('jsonwebtoken');
const sendEmail = require('../service/gmailSender');
const dateTime = require('../service/getCurrentTime');
const requiredLogin = require('../middlewares/requiredLogin');
module.exports = (app) => {
    app.use(bodyParser.json()); // Sử dụng body-parser

    app.post('/api/admin/create-account-sale', requiredLogin, async (req, res) => {
        const name = req.body.name;
        const email = req.body.email;
        const username = extractUsername(email);
        const password = username;

        // check email format
        const regex = /\S+@\S+\.\S+/;
        if (!regex.test(email)) {
            return res.json(package(2, "Invalid email format", null));
        }
           
        if (!name || !email || !password) {
            return res.json(package(1, "Missing required fields", null));
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json(package(9, "Email already exists", null));
        }

        const hashedPassword = hashPassword(password, KEY.SECRET_SALT);

        const newUser = new User({
            username: username,
            name: name,
            email: email,
            password: hashedPassword,
            image: KEY.imageProfileDefault,
            role: 'Sale person',
            status: "InActive",
        });

        try {
            await newUser.save();

            // Create token for login
            newUser.time = dateTime;
            const token = jwt.sign({ newUser }, KEY.SECRET_SESSION_KEY, { expiresIn: '1m' });

            const loginLink = `${process.env.SERVER_ADDRESS}/direct?token=${token}`;
            sendEmail(email, "Login Link", `Click the following link to log in: ${loginLink}`);

            return res.json(package(0, "Registration success", newUser));
        } catch (error) {
            console.error(error);
            return res.json(package(11, "Internal error", error));
        }
    });

    app.post('/api/admin/resend-email', async (req, res) => {
        const {email} = req.body;

        // check email format
        const regex = /\S+@\S+\.\S+/;
        if (!regex.test(email)) {
            return res.json(package(2, "Invalid email format", null));
        }
           
        if (!email) {
            return res.json(package(1, "Missing required fields", null));
        }

        const findUser = await User.findOne({ email });
        if (findUser) {

            const preUser = {...findUser._doc};
            delete preUser.password;


            const token = jwt.sign({ preUser }, KEY.SECRET_SESSION_KEY, { expiresIn: '1m' });

            const loginLink = `${process.env.SERVER_ADDRESS}/direct?token=${token}`;
            sendEmail(email, "Login Link", `Click the following link to log in: ${loginLink}`);

            return res.json(package(0, "Resend email success", null));
        }else{
            return res.json(package(20, "Email was not existed", null));
        }
    });

    app.post('/api/auth/direct-login', async (req, res) => {
        const token = req.body.token;
        if (!token) {
            return res.json(package(1, "Missing required fields", null));
        }

        try {
            const decoded = jwt.verify(token, KEY.SECRET_SESSION_KEY);
            const user = decoded.preUser;
            const userDB = await User.findOne({ username: user.username });
            if (!userDB) {
                return res.json(package(10, "Invalid username or password", null));
            }
            if(userDB._doc.status === 'InActive'){
                return res.json(package(12, "Your account is not active", null));
            }

            return res.json(
                package(0, "Login success", userDB._doc)
            );
        } catch (error) {
            return res.json(package(11, "Internal error", error));
        }
    });

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
			return null;
		}
        
	}
};
