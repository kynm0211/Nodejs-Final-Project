const package = require('../middlewares/package');

module.exports = (app) =>{
    app.get('/api/logout', (req, res) => {
        req.session.destroy();
        res.redirect('/');
    });
    app.get('/api/session', (req, res) => {
        console.log(req.session.user);
        if (req.session.user) {
            res.json(package(0,"You're logged", req.session.user));
        } else {
            res.json(package(15,"You need to loggin", null));
        }
    });
}