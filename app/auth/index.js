const AuthCtrl = require('./controllers/authentication');
const BaseCtrl = require('../controllers/common');
const AuthStrategies = require('../../config/passport_auth');
const _codes = require('../../assets/codes');

const authRoute = require('express').Router();


module.exports = function (req, res, next) {

    // authRoute.post('/register', AuthCtrl.register);
    authRoute.post('/login', AuthStrategies.requireLogin, AuthCtrl.login);
    authRoute.post('/request-registration', AuthCtrl.requestRegistration); // TODO - Mailing
    authRoute.post('/request-registration/:requestUrl', AuthCtrl.createUser);
    authRoute.post('/reset/u', AuthCtrl.sendUsername);
    authRoute.post('/reset/p', AuthCtrl.requestPasswordReset);
    authRoute.post('/reset/p/:resetUrl', AuthCtrl.resetPassword);

    // Tests
    authRoute.post('/secret', AuthStrategies.requireSecret, (req, res) => { res.json(_codes) });
    authRoute.get('/protected', AuthStrategies.authenticateToken, (req, res) => { res.send("SUCCESS") });
    authRoute.get('/admin', AuthStrategies.authenticateToken, AuthStrategies.roleAuthorization(['admin']), (req, res) => { res.send("ADMIN") });

    // Invalid Endpoints
    authRoute.use((req, res, next) => BaseCtrl.invalidEndpoint(req, res, next));

    return authRoute;

};