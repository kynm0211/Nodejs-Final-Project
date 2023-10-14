const requiredLogin = require("../middlewares/requiredLogin");
const mongoose = require('mongoose');
const User = mongoose.model('User');
const bodyParser = require('body-parser');

module.exports = (app) => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    app.put('/api/users/update', requiredLogin, async (req, res) => {
        const { email, name, image } = req.body;

        try {
            // Find the user by email
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(404).json({
                    message: {
                        msgBody: "User not found",
                        msgError: true
                    }
                });
            }

            // Update the user's name and image
            user.name = name;
            user.image = image;

            await user.save();

            return res.status(200).json({
                message: {
                    msgBody: "Successfully updated",
                    msgError: false
                }
            });
        } catch (error) {
            return res.status(500).json({
                message: {
                    msgBody: "Error updating user",
                    msgError: true
                }
            });
        }
    });
}
