
module.exports = (req, res, next) => {
    if(req.session.authorize === true) {
        next();
    }else{
        return res.redirect('/login');
    }
}