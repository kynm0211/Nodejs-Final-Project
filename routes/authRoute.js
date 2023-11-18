const KEY = require('../config/key');
const package = require('../middlewares/package');
const hashPassword = require('../service/hash256');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Customer = mongoose.model('Customer');



module.exports = (app) => {
    

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

    app.post('/api/change-password', async (req, res) => {
        const token = req.headers.authorization.replace('Bearer ', '');
        const username = extractUsernameFromToken(token);

        if (!username) {
            return res.json(package(9, "Token không hợp lệ hoặc đã hết hạn", null));
            
        }

        const currentPassword = req.body.currentPassword;
        const newPassword = req.body.newPassword;
        const confirmPassword = req.body.confirmPassword;

        if (!currentPassword || !newPassword || !confirmPassword) {
            return res.json(package(7, "Vui lòng cung cấp đầy đủ thông tin.", null));
            
        }

        try {
            const userDB = await User.findOne({ username });

            if (!userDB) {
                return res.json(package(10, "Tài khoản không tồn tại", null));
                
            }

            if (hashPassword(currentPassword, KEY.SECRET_SALT) !== userDB.password) {
                return res.json(package(10, "Mật khẩu hiện tại không đúng", null));
                
            }

            if (newPassword !== confirmPassword) {
                return res.json(package(8, "Mật khẩu xác nhận không khớp", null));
                
            }

            userDB.password = hashPassword(newPassword, KEY.SECRET_SALT);
            await userDB.save();

            return res.json(package(0, "Đổi mật khẩu thành công", "Success"));
        } catch (error) {
            return res.json(package(11, "Lỗi nội bộ", error));
        }
    });

    app.get('/api/profile', async (req, res) => {
        const token = req.headers.authorization.replace('Bearer ', '');
        const username = extractUsernameFromToken(token);

        if (!username) {
            return res.json(package(9, "Token không hợp lệ hoặc đã hết hạn", null));
            
        }

        try {
            const userDB = await User.findOne({ username });

            if (!userDB) {
                return res.json(package(10, "Tài khoản không tồn tại", null));
                
            }

            const userWithoutPassword = { ...userDB.toObject() };
            delete userWithoutPassword.password;

            res.json(package(0, "Lấy thông tin người dùng thành công", userWithoutPassword));
        } catch (error) {
            return res.json(package(11, "Lỗi nội bộ", error));
        }
    });

    app.get('/api/current_user', (req, res) => {
        const token = req.header('Authorization');

        if (!token) {
            return res.sendStatus(401);
        }

        jwt.verify(token, KEY.SECRET_SESSION_KEY, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            // User is authenticated, you can access user data from the 'user' object
            res.json(user);
        });
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

    
}