const bodyParser = require('body-parser');
const KEY = require('../config/key');
const package = require('../middlewares/package');
const hashPassword = require('../service/hash256');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');

function extractUsernameFromToken(token) {
    try {
        const decoded = jwt.verify(token, KEY.SECRET_SESSION_KEY);
        return decoded.username;
    } catch (error) {
        console.error('Error extracting username from token:', error);
        return null;
    }
}

module.exports = (app) => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

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
}
