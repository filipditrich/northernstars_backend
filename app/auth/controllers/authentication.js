const jwt = require('jsonwebtoken');
const _codes = require('../../../assets/codes');
const User = require('../models/user');
const Request = require('../models/request');
const CredentialsReset = require('../models/credentialsReset');
const authConfig = require('../../../config/common');
const nodemailer = require('nodemailer');
const nodemailerSettings = require('../../../config/nodemailer');
const app = require('express')();
const validators = require('../../../helpers/validators');

function generateToken(user){
    return jwt.sign(user, authConfig[app.get('env')].token.secret, {
        expiresIn: authConfig[app.get('env')].token.ttl
    });
}

function setUserInfo(request){
    return {
        _id: request._id,
        username: request.username,
        roles: request.roles
    };
}

exports.login = function (req, res, next) {
  let userInfo = setUserInfo(req.user);
  res.json({
      response: _codes.AUTHENTICATION_SUCCESS,
      token: 'JWT ' + generateToken(userInfo),
      user: userInfo
  });
};

exports.requestRegistration = function(req, res, next){

    let email = req.body.email,
        name = req.body.name;

    if (!email) return next(_codes.MISSING_EMAIL);
    if (!name) return next(_codes.MISSING_NAME);

    Request.findOne({ email: email }).exec()
        .then(alreadyRequested => {
          if (alreadyRequested) return next(_codes.EMAIL_REQUEST_ALREADY_MADE);

          User.findOne({ email: email }).exec()
              .then(alreadyRegistered => {
                  if (alreadyRegistered) return next(_codes.EMAIL_REQUEST_ALREADY_MADE);

                  let request = new Request({
                      email: email,
                      name: name
                  });

                  request.save((error, saved) => {
                      if (error) return next(error);
                      res.json({
                          response: _codes.REGISTRATION_REQUEST_SUCCESSFUL,
                          email: saved.email
                      });
                  });
              })
              .catch(error => {
                  return next(error);
              })

        })
        .catch(error => {
           return next(error);
        });
};

exports.createUser = function(req, res, next){
    let hash = req.params['requestUrl'];

    Request.findOne({ continueUrl: hash }).exec()
        .then(found => {
           if (!found) return next(_codes.REGISTRATION_REQUEST_URL_INVALID);
           if (!found.approved) return next(_codes.REGISTRATION_REQUEST_NOT_APPROVED);
           if (found.userRegistered) return next(_codes.REGISTRATION_REQUEST_NO_LONGER_VALID);
            exports.register(req, res, found.email)
                .then(() => {
                    found.userRegistered = true;
                    found.save(error => {
                        if (error) return next(error);
                    });
                })
                .catch(error => {
                    return next(error);
                });
        })
        .catch(error => {
            return next(error);
        });

};

exports.register = function (req, res, email) {

    return new Promise((resolve, reject) => {
        let username = req.body.username,
            password = req.body.password;

        if (!username) return reject(_codes.MISSING_USERNAME);
        if (!password) return reject(_codes.MISSING_PASSWORD);
        if (!validators.passwordStrength(password)) return next(_codes.WEAK_PASSWORD);
        if (!email) return reject(_codes.MISSING_EMAIL); // TODO - this shouldnt happen at all

        User.findOne({ username: username }, function (error, alreadyExist) {
            if (error) return reject(error);
            if (alreadyExist) return reject(_codes.USERNAME_TAKEN);

            let user = new User({
                username: username,
                password: password,
                email: email
            });

            user.save((error, saved) => {
                if (error) return reject(error);
                let userInfo = setUserInfo(user);
                res.json({
                    response: _codes.REGISTRATION_SUCCESSFUL,
                    token: 'JWT ' + generateToken(userInfo),
                    user: userInfo
                });
                resolve();
            });
        });
    });

};

exports.requestPasswordReset = function (req, res, next) {
    const email = req.body.email;
    if (!email) return next(_codes.MISSING_EMAIL);

    User.findOne({ email: email }).exec()
        .then(user => {
            if (!user) return next(_codes.USER_NOT_FOUND);

            CredentialsReset.findOne({ forAccount: user._id }).exec()
                .then(request => {
                   if (request) return next (_codes.RESET_REQUEST_ALREADY_MADE);

                    const newRequest = new CredentialsReset({
                        forAccount: user._id,
                    });

                    newRequest.save((error, saved) => {
                       if (error) return next(error);

                       let mailOptions = {
                         from: '"NS Accounts" <support@northernstars.cz>',
                         to: 'filip.ditrich@gmx.us',
                         subject: 'Password Reset',
                         html: `To reset password use this hash: <b>${saved.resetUrl}</b>`
                       };

                       nodemailerSettings.transporter.sendMail(mailOptions, err => {
                          if (err) return next(err);
                          res.json(_codes.RESET_REQUEST_PROCESSED_SUCCESSFULLY);
                       });

                    });
                })
                .catch(error => {
                    return next(error);
                });
        })
        .catch(error => {
            return next(error);
        });
};

exports.sendUsername = function (req, res, next) {
  const email = req.body.email;
  if (!email) return next(_codes.MISSING_EMAIL);

  User.findOne({ email: email }).exec()
      .then(user => {
          if (!user) return next(_codes.USER_NOT_FOUND);

          let mailOptions = {
            from: '"NS Accounts" <support@northernstars.cz>',
            to: 'filip.ditrich@gmx.us',
            subject: 'Did you forgot your username?',
            html: `Username associated with this email address is: <b>${user.username}</b>`
          };

          nodemailerSettings.transporter.sendMail(mailOptions, err => {
              if (err) return next(err);
              res.json(_codes.USERNAME_RESET_SEND);
          });

      })
      .catch(error => {
          return next(error);
      })
};

exports.resetPassword = function (req, res, next) {
    let hash = req.params['resetUrl'];
    let newPassword = req.body.newpassword

    if (!validators.passwordStrength(newPassword)) return next(_codes.WEAK_PASSWORD);

    CredentialsReset.findOne({ resetUrl: hash }).exec()
        .then(request => {
            if (!request) return next(_codes.RESET_REQUEST_NOT_FOUND);

            User.findById(request.forAccount).exec()
                .then(user => {
                    if (!user) return next(_codes.RESET_REQUEST_USER_NOT_FOUND);

                    user.comparePassword(newPassword, (error, isMatch) => {
                        if (error) return next(error);
                        if (isMatch) return next(_codes.PASSWORD_RESET_CANT_BE_SAME_AS_OLD);

                        user.password = newPassword;
                        user.save((error, saved) => {
                            if (error) return next(error);

                            request.remove(error => {
                                if (error) return next(error);
                            });

                            res.json(_codes.PASSWORD_RESET_SUCCESS);
                        });

                    });

                })
                .catch(error => {
                    return next(error);
                })

        })
        .catch(error => {
           return next(error);
        });


};