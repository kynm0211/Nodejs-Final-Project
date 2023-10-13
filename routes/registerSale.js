const bodyParser = require('body-parser');
const KEY = require('../config/key');
const package = require('../middlewares/package');
const hashPassword = require('../service/hash256');
const mongoose = require('mongoose');
const User = mongoose.model('User'); 
// const sendEmail = require('./service/gmailSender');

module.exports = (app) => {
    app.use(bodyParser.urlencoded({ extended: false }));

    app.post('/api/admin/create-account-sale', async (req, res) => {
        const password = "1234567";
        const { nameR, emailR,  roleR  } = req.body;
        console.log(nameR, emailR, roleR)
        // Kiểm tra dữ liệu gửi từ phía máy khách
        if (!nameR || !emailR || !roleR ) {
            return res.json(package(1, "Missing required fields", null));
        }

        // Kiểm tra email đã tồn tại trong cơ sở dữ liệu
        const existingUser = await User.findOne({ emailR });
        if (existingUser) {
            return res.json(package(9, "Email already exists", null));
        }

        // Hash mật khẩu trước khi lưu vào cơ sở dữ liệu
        const hashedPassword = hashPassword(password, KEY.SECRET_SALT);

        // Tạo một đối tượng User mới và lưu vào cơ sở dữ liệu
        const newUser = new User({
            name: nameR,
            email: emailR,
            password: hashedPassword,
            image: KEY.imageProfileDefault,
            role: roleR,
            status: "UnActive",
        });

        try {
            await newUser.save();
            return res.json(package(0, "Registration success", newUser));
        } catch (error) {
            return res.json(package(11, "Internal error", error));
        }
    });
}
