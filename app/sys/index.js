const BaseCtrl = require('../controllers/common');
const AuthCtrl = require('../auth/controllers/authentication');
const AuthStrategies = require('../../config/passport_auth');
const _codes = require('../../assets/codes');

const sysRoute = require('express').Router();

module.exports = function (req, res, next) {

    // Invalid Endpoints
    sysRoute.use((req, res) => BaseCtrl.invalidEndpoint(req, res));

    return sysRoute;

};