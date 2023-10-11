const package = require('../middlewares/package');
const jwt = require('jsonwebtoken');
const KEY = require('../config/key');
module.exports = (app) =>{
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
}