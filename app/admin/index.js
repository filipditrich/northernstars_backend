const AdminCtrl = require('./controllers/admin');
const BaseCtrl = require('../controllers/common');
const AuthStrategies = require('../../config/passport_auth');
const _codes = require('../../assets/codes');

const adminRoute = require('express').Router();


module.exports = function (req, res, next) {


    adminRoute.post('/approve-registration/:hash', AuthStrategies.authenticateToken, AuthStrategies.roleAuthorization(['admin']), AdminCtrl.approveRegistration);

    // Invalid Endpoints
    adminRoute.use((req, res, next) => BaseCtrl.invalidEndpoint(req, res, next));

    return adminRoute;

};