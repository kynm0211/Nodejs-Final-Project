const requiredLogin = require("../middlewares/requiredLogin");
const mongoose = require('mongoose');
const User = mongoose.model('User');
const multer = require('multer');
const uploadFile = require("../service/uploadFirebase");
const upload = multer();
const Package = require('../middlewares/package');

module.exports = (app) => {

    app.patch('/api/users/profile/', upload.single("file"), async (req, res) => {
        
        try {
            const { username, name } = req.body;
            const image = req.file;

            if(!username || !name){
                return res.send(
                    Package(400, "Missing required parameters", null)
                );
            }
    
            // Find the user by username
            const user = await User.findOne({ username }).lean();
            let _id = await user._id;

            if (!user) {
                return res.send(
                    Package(404, "User not found", null)
                );
            }

            let result;
            if(image){
                const uploadImage = await uploadFile(image);
                const url = uploadImage.data;
                result = await User.findByIdAndUpdate({ _id }, { name, image: url }, { new: true });
            }else{
                result = await User.findByIdAndUpdate({ _id }, { name }, { new: true });
            }
            

            return res.send(Package(0, "Update profile successfully.", result));
        } catch (error) {
            return res.send(Package(500, "Error updating profile.", error.message));
        }
    });
}
