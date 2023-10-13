const bodyParser = require('body-parser');
const KEY = require('../config/key');
const package = require('../middlewares/package');
const hashPassword = require('../service/hash256');
const mongoose = require('mongoose');
const User = require('../models/User'); // Import the User model

const multer = require('multer');
const upload = multer();

module.exports = (app) => {
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(upload.none());

    app.post('/api/register', async (req, res) => {
        const { name, email, password, image, role, status } = req.body;

        // Kiểm tra dữ liệu gửi từ phía máy khách
        if (!name || !email || !password || !image || !role || !status) {
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
            image: image,
            role: role,
            status: status,
        });

        try {
            await newUser.save();
            return res.json(package(0, "Registration success", null));
        } catch (error) {
            return res.json(package(11, "Internal error", error));
        }
    });
}
