const _codes = require('../../assets/codes');

exports.invalidEndpoint = function (req, res, next) {
    next(_codes.INVALID_ENDPOINT)
};