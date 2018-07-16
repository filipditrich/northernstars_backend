const _codes = require('../assets/codes');
const passport = require('passport');
const User = require('../app/auth/models/user');


exports.requireLogin = (req, res, next) => {
    return passport.authenticate('login', {
        session: false,
        badRequestMessage: _codes.MISSING_CREDENTIALS.identifier
    }, (error, user, response) => {
        if (!error && !user && response && response.message === _codes.MISSING_CREDENTIALS.identifier){
            return next(_codes.MISSING_CREDENTIALS);
        }
        if (error) return next(error);
        if (!user) return next(_codes[response.result]);
        req.user = user;
        return next();
    })(req, res, next);
};

exports.authenticateToken = (req, res, next) => {
    return passport.authenticate('jwt', {
        session: false
    }, (error, user) => {
        if (error) return next(error);
        if (!user) return next(_codes.UNAUTHORIZED_USER);
        req.user = user;
        next();
    })(req, res, next);
};

exports.requireSecret = (req, res, next) => {
    return passport.authenticate('secret', {
        session: false,
        badRequestMessage: _codes.NO_SECRET.identifier
    }, (error, isMatch, response) => {
        if (!error && !isMatch && response && response.message === _codes.NO_SECRET.identifier){
            return next(_codes.NO_SECRET);
        }
        if (error) return next(error);
        if (!isMatch) return next(_codes[response.result]);
        return next();
    })(req, res, next);
};

exports.roleAuthorization = function (roles) {
    return function (req, res, next) {
        let user = req.user;
        User.findById(user._id, function (error, foundUser) {
            if (error) return next(error);
            if (foundUser.roles.some(role => roles.indexOf(role) >= 0)){
                return next();
            }
            next(_codes.UNAUTHORIZED_ACCESS);
        });
    }
};
