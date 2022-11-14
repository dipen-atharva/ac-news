const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserDetails = new Schema({
    username: { type: String, default: '', trim: true, maxlength: 50 },
    password: { type: String, default: '', trim: true, maxlength: 50 },
    published_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('userDetails', UserDetails);