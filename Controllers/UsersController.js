const User = require('../models/UserModel');
const package = require('../middlewares/package');
const jwt = require('jsonwebtoken');
const dateTime = require('../service/getCurrentTime');
const sendEmail = require('../service/gmailSender');
const hashPassword = require('../service/hash256');
module.exports = {
    index: async (req, res) => {
        try {
            const pageSize = 10;
            const pageNumber = parseInt(req.query.page, 10) || 1;
            const skipAmount = (pageNumber - 1) * pageSize;

            const totalUsers = await User.countDocuments({});
            const totalPages = Math.ceil(totalUsers / pageSize);

            const users = await User.find({}).skip(skipAmount).limit(pageSize).lean();

            const data = {
                users,
                divider: totalPages,
            };

            res.json(package(0, 'Success', data));
        } catch (err) {
            return res.json(package(11, "The request was failed", err.message));
        }
    },

    register: async (req, res) => {
        // Create account for saler
        try{
            const {name, email} = req.body;
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

            const result = await newUser.save();

            // Create token for login
            newUser.time = dateTime;
            const token = jwt.sign({ newUser }, KEY.SECRET_SESSION_KEY, { expiresIn: '1m' });

            const loginLink = `${process.env.SERVER_ADDRESS}/direct?token=${token}`;
            sendEmail(email, "Login Link", `Click the following link to log in: ${loginLink}`);

            return res.json(package(0, "Registration success", newUser));
        }
        catch (err) {
            return res.json(package(11, "The request was failed", err.message));
        }
    },
    resendEmail: async (req, res) => {
        try{
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

                return res.json(package(0, "Resend email successfully", null));
            }else{
                return res.json(package(20, "Email was not existed", null));
            }
        }
        catch (err) {
            return res.json(package(11, "The request was failed", err.message));
        }
    },

    update: (req, res) => {
        try {
            const token = req.header('Authorization');

            if (!token) {
                return res.send(package(12, 'The request was failed', 'Token is not valid'));
            }

            jwt.verify(token, KEY.SECRET_SESSION_KEY, async (err, user) => {
                if (err) {
                    return res.send(package(12, 'The request was failed', 'Token is not valid'));
                }

                const { userId } = req.params;
                const userData = req.body;
                const updatedUser = await User.findByIdAndUpdate(userId, userData, { new: true });

                res.send(package(0, 'Success', updatedUser));
            });
        } catch (err) {
            return res.json(package(11, "The request was failed", err.message));
        }
    },

    destroy: (req, res) => {
        try{
            const token = req.header('Authorization');
    
            if (!token) {
              return res.send(
                package(12, 'Token is not valid', null)
              )
            }
        
            jwt.verify(token, KEY.SECRET_SESSION_KEY, async (err, user) => {
                if (err) {
                    return res.send(
                        package(12, err.message, null)
                    )
                }

                const { userId } = req.params;
                const deletedUser = await User.findByIdAndRemove(userId);

                if (!deletedUser) {
                    return res.send(
                        package(12, 'User is not found', null)
                    )
                }

                return res.send(
                    package(0, 'Success', deletedUser)
                )
            });
        }catch (err) {
            return res.json(package(11, "The request was failed", err.message));
        }
    },
};


// Subfunctions
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