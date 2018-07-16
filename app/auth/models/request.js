const mongoose = require('mongoose');
const MD5 = require('crypto-js/md5');
const secrets = require('../../../config/secret');
const validator = require('../../../helpers/validators');

const requestSchema = mongoose.Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validator.validateEmail, 'This email address is invalid']
    },
    name: { type: String, required: true },
    continueUrl: { type: String },
    userRegistered: { type: Boolean, default: false },
    approved: { type: Boolean, default: false },
    approvedBy: { type: mongoose.Schema.ObjectId, ref: 'User' },
    approvedOn: { type: Date },
}, { timestamps: true });

requestSchema.pre('save', function (next) {
    this.continueUrl = MD5(this.email, secrets.md5secret);
    next();
});

module.exports = mongoose.model('Request', requestSchema);