const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { scrypt } = require('node:crypto');

const UserDetails = new Schema({
  username: { type: String, default: '', trim: true, maxlength: 50 },
  password: { type: String, default: '', trim: true, maxlength: 50 },
  password_salt: { type: String, default: '', trim: true, maxlength: 100 },
  published_at: { type: Date, default: Date.now }
});

UserDetails.pre("save", function (next) {
  const user = this;
  this.password_salt = "w4e5rt452#f2$ve%vcd&dcj*wj-ed2";
  if (this.isModified("password") || this.isNew) {
    scrypt(user.password, this.password_salt, 64, (err, derivedKey) => {
      if (err) throw err;
      user.password = derivedKey.toString('hex');
      // user.password = derivedKey;
      next()
    });
  } else {
    return next()
  }
})


module.exports = mongoose.model('userDetails', UserDetails);