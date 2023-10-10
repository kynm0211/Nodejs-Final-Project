const package = require('../middlewares/package');
const requiredLogin = require('../middlewares/requiredLogin');

module.exports = (app) =>{
    app.get('/api/logout', (req, res) => {
        req.session.destroy();
        res.redirect('/');
    });
    app.get('/api/session', requiredLogin, (req, res) => {
        console.log(req.session.user);
        if (req.session.user) {
            user = {...req.session.user};
            res.json(package(0,"You're logged, ", user._doc));
        } else {
            res.json(package(15,"You need to loggin", null));
        }
    });
}