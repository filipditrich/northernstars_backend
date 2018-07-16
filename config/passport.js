const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const _secret = require('./secret');
const _codes = require('../assets/codes');
const User = require('../app/auth/models/user');
const authConfig = require('../config/common');

module.exports = function (passport, env) {

    const options = {
        secret: {
            usernameField: 'sec',
            passwordField: 'ret'
        },
        login: { usernameField: 'username' },
        jwt: {
            jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
            secretOrKey: authConfig[env].token.secret
        }
    };

    passport.use('secret', new LocalStrategy(options.secret, (secret1, secret2, done) => {
        if ((!secret1 && secret2) || (!secret2 && secret1)) return done(null, false, { result: 'HALF_SECRET' });
        if (!secret1) return done(null, false, { result: 'NO_SECRET' });
        if (!secret2) return done(null, false, { result: 'NO_SECRET' });

        if ((secret1 === _secret.secret1) && (secret2 === _secret.secret2)){
            return done(null, true, { result: 'SECRET_SUCCESS' });
        } else {
            return done(null, false, { result: 'INVALID_SECRET' });
        }
    }));

    passport.use('login', new LocalStrategy(options.login, (username, password, done) => {
        if (!username) return done(null, false, { result: 'MISSING_USERNAME' });
        if (!password) return done(null, false, { result: 'MISSING_PASSWORD' });
        User.findOne({ username: username }).exec()
            .then(user => {
                if (!user) return done(null, false, { result: 'INVALID_USERNAME' });
                user.comparePassword(password, (error, isMatch) => {
                    if (error) return done(error, false);
                    if (!isMatch) return done(null, false, { result: 'INVALID_PASSWORD' });
                    return done(null, user, { result: 'AUTHENTICATION_SUCCESS' });
                });
            })
            .catch(error => {
               return done(error);
            });
    }));

    passport.use('jwt', new JwtStrategy(options.jwt, (payload, done) => {
        User.findById(payload._id, (error, user) => {
           if (error) return done(error, false);
           if (user) {
               return done(null, user, { result: 'TOKEN_VALID' });
           } else {
               return done(null, false, { result: 'TOKEN_INVALID' });
           }
        });
    }));

};