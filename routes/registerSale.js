const bodyParser = require('body-parser');
const KEY = require('../config/key');
const package = require('../middlewares/package');
const hashPassword = require('../service/hash256');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const jwt = require('jsonwebtoken');
const sendEmail = require('../service/gmailSender');

module.exports = (app) => {
    app.use(bodyParser.json()); // Sử dụng body-parser

    app.post('/api/admin/create-account-sale', async (req, res) => {
        const password = "1234567";
        const name = req.body.name;
        const email = req.body.email;
        const role = req.body.role;

        if (!name || !email || !role) {
            return res.json(package(1, "Missing required fields", null));
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json(package(9, "Email already exists", null));
        }

        const hashedPassword = hashPassword(password, KEY.SECRET_SALT);

        const newUser = new User({
            name: name,
            email: email,
            password: hashedPassword,
            image: KEY.imageProfileDefault,
            role: role,
            status: "InActive",
        });

        try {
            await newUser.save();

            const token = jwt.sign({ userId: newUser._id }, KEY.SECRET_SESSION_KEY, { expiresIn: '24h' });

            const loginLink = `http://localhost:3000/direct?token=${token}`;
            console.log(loginLink);
            console.log(email);

            sendEmail(email, "Login Link", `Click the following link to log in: ${loginLink}`);

            return res.json(package(0, "Registration success", newUser));
        } catch (error) {
            console.error(error);
            return res.json(package(11, "Internal error", error));
        }
    });
};
