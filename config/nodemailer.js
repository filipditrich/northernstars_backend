const nodemailer = require('nodemailer');

module.exports.transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'philldcracks@gmail.com',
        pass: 'Adelka123'
    }
});