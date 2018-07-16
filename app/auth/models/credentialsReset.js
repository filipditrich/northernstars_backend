const mongoose = require('mongoose');
const MD5 = require('crypto-js/md5');
const secrets = require('../../../config/secret');

const credentialsResetSchema = mongoose.Schema({
    forAccount: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
    resetUrl: { type: String }
}, { timestamps: true });

credentialsResetSchema.pre('save', function (next) {
    this.resetUrl = MD5(this.forAccount.email, secrets.md5secret);
    next();
});

module.exports = mongoose.model('CredentialsReset', credentialsResetSchema);