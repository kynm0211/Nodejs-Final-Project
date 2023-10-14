const bodyParser = require('body-parser');
const KEY = require('../config/key');
const package = require('../middlewares/package');
const hashPassword = require('../service/hash256');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
module.exports = (app) => {
    app.use(bodyParser.urlencoded({ extended: false }));

    app.post('/api/admin/create-account-sale', async (req, res) => {
        const password = "1234567";
        const { name, email, role } = req.body;
        console.log(name, email, role);

        // Kiểm tra dữ liệu gửi từ phía máy khách
        if (!name || !email || !role) {
            return res.json(package(1, "Missing required fields", null));
        }

        // Kiểm tra email đã tồn tại trong cơ sở dữ liệu
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json(package(9, "Email already exists", null));
        }

        // Hash mật khẩu trước khi lưu vào cơ sở dữ liệu
        const hashedPassword = hashPassword(password, KEY.SECRET_SALT);

        // Tạo một đối tượng User mới và lưu vào cơ sở dữ liệu
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
            
            // Tạo một mã thông báo đăng nhập (có thể sử dụng mã ngẫu nhiên)
            const loginToken = uuidv4();

            // Tạo liên kết đăng nhập
            const loginLink = `http://localhost:3000/login?token=${loginToken}`;

            // Gửi email thông báo với liên kết đăng nhập
            await axios.post('/api/admin/send-login-link', { toEmail: email, loginLink });
            
            return res.json(package(0, "Registration success", newUser));
        } catch (error) {
            return res.json(package(11, "Internal error", error));
        }
    });
};
