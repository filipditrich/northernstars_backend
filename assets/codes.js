const messages = require('./messages');

module.exports = {

    NO_SECRET: {identifier: 'NO_SECRET', message: messages.SYSTEM.passport.secret.NO_SECRET, success: false, status: 401 },
    INVALID_SECRET: { identifier: 'INVALID_SECRET', message: messages.SYSTEM.passport.secret.INVALID_SECRET, success: false, status: 422 },
    SECRET_SUCCESS: { identifier: 'SECRET_SUCCESS', message: messages.SYSTEM.passport.secret.SECRET_SUCCESS, success: true, status: 200 },
    HALF_SECRET: { identifier: 'HALF_SECRET', message: messages.SYSTEM.passport.secret.HALF_SECRET, success: false, status: 422 },
    MISSING_USERNAME: { identifier: 'MISSING_USERNAME', message: messages.SYSTEM.passport.login.MISSING_USERNAME,success: false, status: 422 },
    MISSING_PASSWORD: { identifier: 'MISSING_PASSWORD', message: messages.SYSTEM.passport.login.MISSING_PASSWORD, success: false, status: 422 },


    MISSING_EMAIL: { identifier: 'MISSING_EMAIL', message: null, success: false, status: 422},
    MISSING_NAME: { identifier: 'MISSING_NAME', message: null, success: false, status: 422},
    EMAIL_REQUEST_ALREADY_MADE: { identifier: 'EMAIL_REQUEST_ALREADY_MADE', message: null, success: false, status: 400 },
    REGISTRATION_REQUEST_SUCCESSFUL: { identifier: 'REGISTRATION_REQUEST_SUCCESSFUL', message: null, success: true, status: 200 },

    REGISTRATION_REQUEST_URL_INVALID: { identifier: 'REGISTRATION_REQUEST_URL_INVALID', message: null, success: false, status: 401 },
    REGISTRATION_REQUEST_NOT_APPROVED: { identifier: 'REGISTRATION_REQUEST_NOT_APPROVED', message: null, success: false, status: 401 },
    REGISTRATION_REQUEST_NO_LONGER_VALID: { identifier: 'REGISTRATION_REQUEST_NO_LONGER_VALID', message: null, success: false, status: 400 },
    REGISTRATION_REQUEST_SUCCESS: { identifier: 'REGISTRATION_REQUEST_SUCCESS', message: null, success: false, status: 200 },

    UNSUPPORTED_RESET_TYPE: { identifier: 'UNSUPPORTED_RESET_TYPE', message: null, success: false, status: 200 },

    INVALID_EMAIL: { identifier: 'INVALID_EMAIL', message: null, success: false, status: 400 },

    RESET_REQUEST_ALREADY_MADE: { identifier: 'RESET_REQUEST_ALREADY_MADE', message: null, success: false, status: 400 },
    RESET_REQUEST_PROCESSED_SUCCESSFULLY: { identifier: 'RESET_REQUEST_PROCESSED_SUCCESSFULLY', message: null, success: true, status: 200 },

    USER_NOT_FOUND: { identifier: 'USER_NOT_FOUND', message: null, success: false, status: 400 },
    RESET_REQUEST_NOT_FOUND: { identifier: 'RESET_REQUEST_NOT_FOUND', message: null, success: false, status: 400 },
    RESET_REQUEST_USER_NOT_FOUND: { identifier: 'RESET_REQUEST_USER_NOT_FOUND', message: null, success: false, status: 500 },
    PASSWORD_RESET_CANT_BE_SAME_AS_OLD: { identifier: 'PASSWORD_RESET_CANT_BE_SAME_AS_OLD', message: null, success: false, status: 400 },
    PASSWORD_RESET_SUCCESS: { identifier: 'PASSWORD_RESET_SUCCESS', message: null, success: true, status: 200 },

    USERNAME_RESET_SEND: { identifier: 'USERNAME_RESET_SEND', message: null, success: true, status: 200 },

    REGISTRATION_REQUEST_APPROVAL_ALREADY_APPROVED: { identifier: 'REGISTRATION_REQUEST_APPROVAL_ALREADY_APPROVED', message: null, success: false, status: 400 },
    REGISTRATION_REQUEST_USER_ALREADY_REGISTERED: { identifier: 'REGISTRATION_REQUEST_USER_ALREADY_REGISTERED', message: null, success: false, status: 400 },
    REGISTRATION_REQUEST_APPROVED_MAIL_SENT: { identifier: 'REGISTRATION_REQUEST_APPROVED_MAIL_SENT', message: null, success: true, status: 200 },

    INVALID_USERNAME: { identifier: 'INVALID_USERNAME', message: messages.SYSTEM.passport.login.INVALID_USERNAME, success: false, status: 401 },
    INVALID_PASSWORD: { identifier: 'INVALID_PASSWORD', message: messages.SYSTEM.passport.login.INVALID_PASSWORD, success: false, status: 401 },
    WEAK_PASSWORD: { identifier: 'WEAK_PASSWORD', message: null, success: false, status: 422 },
    MISSING_CREDENTIALS: { identifier: 'MISSING_CREDENTIALS', message: messages.SYSTEM.passport.login.MISSING_CREDENTIALS, success: false, status: 422 },
    UNAUTHORIZED_USER : { identifier: 'UNAUTHORIZED_USER', message: messages.SYSTEM.passport.jwt.UNAUTHORIZED_USER, success: false, status: 401 },
    UNAUTHORIZED_ACCESS: { identifier: 'UNAUTHORIZED_ACCESS', message: messages.SYSTEM.passport.roles.UNAUTHORIZED_ACCESS, success: false, status: 401 },
    USERNAME_TAKEN: { identifier: 'USERNAME_TAKEN', message: messages.SYSTEM.passport.register.USERNAME_TAKEN, success: false, status: 400 },
    REGISTRATION_SUCCESSFUL: { identifier: 'REGISTRATION_SUCCESSFUL', message: messages.SYSTEM.passport.register.REGISTRATION_SUCCESSFUL, success: true, status: 201 },
    AUTHENTICATION_SUCCESS: { identifier: 'AUTHENTICATION_SUCCESS', message: messages.SYSTEM.passport.login.AUTHENTICATION_SUCCESS, success: true, status: 200 },
    INVALID_ENDPOINT: { identifier: 'INVALID_ENDPOINT', message: messages.SYSTEM.endpoints.INVALID_ENDPOINT, success: false, status: 404 },


};