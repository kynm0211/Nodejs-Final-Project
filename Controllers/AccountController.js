const package = require('../middlewares/package');
const hashPassword = require('../service/hash256');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const KEY = require('../config/key');


module.exports = {
    login: async (req, res) => {
        try{
            const {username, password} = req.body;

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

            const userDB = await User.findOne({ username });
            if (!userDB) {
                return res.json(package(10, "Invalid username or password", null));
                
            }

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
        }
        catch(error){
            return res.json(package(11, "Internal error", error.message));
        }
    },
    changePassword: async (req, res) =>{
        try{
            const token = req.header('Authorization');
            const username = extractUsernameFromToken(token);

            if (!username) {
                return res.json(package(9, "Invalid or expired token", null));
                
            }
    
            const currentPassword = req.body.currentPassword;
            const newPassword = req.body.newPassword;
            const confirmPassword = req.body.confirmPassword;
    
            if (!currentPassword || !newPassword || !confirmPassword) {
                return res.json(package(7, "Please provide complete information.", null));
                
            }

            const userDB = await User.findOne({ username });

            if (!userDB) {
                return res.json(package(10, "Account does not exist", null));
                
            }

            if (hashPassword(currentPassword, KEY.SECRET_SALT) !== userDB.password) {
                return res.json(package(10, "Current password is incorrect", null));
                
            }

            if (newPassword !== confirmPassword) {
                return res.json(package(8, "Confirm password does not match", null));
                
            }

            userDB.password = hashPassword(newPassword, KEY.SECRET_SALT);
            const result = await userDB.save();

            return res.json(package(0, "Password changed successfully", result));

        }catch(error){
            return res.json(package(11, "Internal error", error.message));
        }
    },
    getProfile: async (req, res) =>{
        try{
            const token = req.header('Authorization');
            const username = extractUsernameFromToken(token);

            if (!username) {
                return res.json(package(9, "Invalid or expired token", null));   
            }

            const user = await User.findOne({ username }).lean();

            if (!user) {
                return res.json(package(10, "Account does not exist", null));
                
            }

            delete user.password;

            res.json(package(0, "Get user information successfully", user));

        }catch(error){
            return res.json(package(11, "Internal error", error.message));
        }
    },
    directLogin: async (req, res) =>{
        try{
            const token = req.body.token;
            if (!token) {
                return res.json(package(1, "Missing required fields", null));
            }

            const user_jwt = jwt.verify(token, KEY.SECRET_SESSION_KEY);
            if(user_jwt){
                const user = await User.findOne({ username: user_jwt.preUser.username }).lean();
                if (!user) {
                    return res.json(package(10, "Invalid username", null));
                }
                if(user.status === 'InActive'){
                    return res.json(package(12, "Your account is not active", null));
                }

                delete user.password;
                
                return res.json(
                    package(0, "Login success", user)
                );
            }else{
                return res.json(package(403, "This token was not valid or expired", null));
            }
        }
        catch(error){
            return res.json(package(403, "This token was not valid or expired", error.message));
        }
    }
} 


// Sub functions
function extractUsernameFromToken(token) {
    try {
        const decoded = jwt.verify(token, KEY.SECRET_SESSION_KEY);
        return decoded.username;
    } catch (error) {
        console.error('Error extracting username from token:', error);
        return null;
    }
}