const { TOKEN_COOKIE, SECRET } = require('../constants');
const jwt = require('jsonwebtoken');

exports.auth = function( req, res, next ) {
    let token = req.cookies[TOKEN_COOKIE];

    if(!token) {
        return next();
    }

    jwt.verify(token, SECRET, function(err, decodedToken){
        if(err) {
            return res.status(401).redirect('/');
        }
        req.user = decodedToken;
        res.locals.user = decodedToken;
        next();
    });
};

exports.isAuth = function(req, res, next) {
    if(!req.user) {
        return res.status(401).redirect('/');
    }
    next();
};