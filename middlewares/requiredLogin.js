const package = require('./package');
module.exports = (req, res, next) => {
    if(req.session.authorize === true) {
        next();
    }else{
        return res.status(401).json(package(401, "Unauthorized", null));
    }
}