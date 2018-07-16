const Request = require('../../auth/models/request');
const _codes = require('../../../assets/codes');
const nodemailerSettings = require('../../../config/nodemailer');

exports.approveRegistration = function (req, res, next) {
    let hash = req.params['hash'];

    Request.findOne({ continueUrl: hash }).exec()
        .then(request => {

            if (!request) return next(_codes.RESET_REQUEST_NOT_FOUND);
            if (request.approved) return next(_codes.REGISTRATION_REQUEST_APPROVAL_ALREADY_APPROVED);
            if (request.userRegistered) return next(_codes.REGISTRATION_REQUEST_USER_ALREADY_REGISTERED);

            request.approved = true;
            request.approvedBy = req.user._id;
            request.approvedOn = new Date();

            request.save((error, saved) => {
                if (error) return next(error);

                // TODO - Send Email To User
                let mailOptions = {
                    from: '"NS Accounts" <support@northernstars.cz>',
                    to: 'filip.ditrich@gmx.us',
                    subject: 'Account Creation Approved',
                    html: `Your account with email ${request.email} is now eligible to be created. Use this hash: ${request.continueUrl}`
                };

                nodemailerSettings.transporter.sendMail(mailOptions, error => {
                    if (error) return next(error);
                    res.json(_codes.REGISTRATION_REQUEST_APPROVED_MAIL_SENT);
                });
            });

        })
        .catch(error => {
            return next(error);
        });

};