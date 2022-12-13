const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { scrypt } = require('node:crypto');
let crypto = require('crypto');

const UserDetails = new Schema({
  username: { type: String, default: '', trim: true, maxlength: 50 },
  password: { type: String, default: '', trim: true, maxlength: 50 },
  password_salt: { type: String, default: '', trim: true, maxlength: 100 },
  published_at: { type: Date, default: Date.now }
});

UserDetails.pre("save", function (next) {
  const user = this;
  this.password_salt = crypto.randomBytes(Math.ceil(50/ 2)).toString('hex').slice(0,50)
  if (this.isModified("password") || this.isNew) {
    scrypt(user.password, this.password_salt, 64, (err, derivedKey) => {
      if (err) throw err;
      user.password = derivedKey.toString('hex');
      console.timeEnd("creating scrypt genrating hash with salt");
      next()
    });
  } else {
    return next()
  }
})

module.exports = mongoose.model('userDetails', UserDetails);

