const jwt = require('jsonwebtoken');
const KEY = require('../config/key');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const bodyParser = require('body-parser');
const requiredLogin = require('../middlewares/requiredLogin');
const package = require('../middlewares/package');
const hash256 = require('../service/hash256');
module.exports = (app) => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.put('/api/renew-password', requiredLogin, async (req, res) => {
    const token = req.header('Authorization');
    const userToken = await fetchUser(req, token); // Call fetchUser with await
    const {password} = req.body;
    if(!userToken){
        return res.json(package(402, "You must be login!", userToken))
    }

    if(!password){
        return res.json(package(402, "Password can not be null!", password))
    }

    if(password.length > 36){
        return res.json(405, "The length of password must be less than 36 chars!", null);
    }

    const hashedPassword = hash256(password, KEY.SECRET_SALT);

    // Find amd update user
    try {
        // Find the user by email
        const email = userToken.email;
        const user = await User.findOne({ email });

        if (!user) {
            return res.json(package(404, "Can not find the user", null));
        }

        // Update the user's name and image
        user.password = hashedPassword;
        user.status = "Active";

        await user.save();

        return res.json(
            package(0, "Successfully", null)
        );
    } catch (error) {
        return res.status(500).json(
            package(500, "Error changing password", null)
        );
    }

  });

  const fetchUser = async (req, token) => { // Pass token as an argument
    if (!token) {
      return null;
    }

    try {
      const user = await jwt.verify(token, KEY.SECRET_SESSION_KEY);
      return user;
    } catch (err) {
      return null;
    }
  };
};
