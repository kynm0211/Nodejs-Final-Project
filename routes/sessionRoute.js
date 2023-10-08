module.exports = (app) => {
    app.get('/api/session', (req, res) => {
        console.log(req.session.user);
        if (req.session.user) {
            res.json(req.session.user);
        } else {
            res.json(null);
        }
    });
}