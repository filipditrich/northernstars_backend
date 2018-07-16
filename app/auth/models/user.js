const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const enums = require('../../../assets/enums');
const validator = require('../../../helpers/validators');

const userSchema = mongoose.Schema({
   username: { type: String, required: true, unique: true },
   password: { type: String, required: true },
   email: {
       type: String,
       trim: true,
       lowercase: true,
       unique: true,
       required: 'Email address is required',
       validate: [validator.validateEmail, 'Invalid email']
   },
   roles: {
       type: [{ type: String, enum: enums.user.roles.list }],
       default: enums.user.roles.default.value
   }
}, { timestamps: true });

userSchema.pre('save', function(next) {
    let user = this;
    let SALT_FACTOR = 10;

    if (!user.isModified('password')) return next();
    bcrypt.genSalt(SALT_FACTOR, (error, salt) => {
        if (error) return next(error);
        bcrypt.hash(user.password, salt, (error, hash) => {
            if (error) return next(error);
            user.password = hash;
            next();
        });
    });

});

userSchema.methods.comparePassword = function(candidate, callback){
  bcrypt.compare(candidate, this.password, function (error, isMatch) {
      if (error) return callback(error);
      callback(null, isMatch);
  });
};

module.exports = mongoose.model('User', userSchema);