const Users = require('../models/UserModel');
const package = require('../middlewares/package');
const requiredLogin = require('../middlewares/requiredLogin');

module.exports = (app) => {
    app.get('/api/users', requiredLogin, async (req, res) => {
        try {
            const users = await Users.find({});
            res.json(package(0, 'Success', users));
        } catch (err) {
            console.error('Error:', err);
            res.status(500).json({ error: 'An error occurred while fetching users.' });
        }
    });
};
