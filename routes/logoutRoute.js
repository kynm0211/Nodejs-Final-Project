module.exports = (app) =>{
    app.get('/api/logout', (req, res) => {
       req.session.destroy();
       res.redirect('/');
    });
}