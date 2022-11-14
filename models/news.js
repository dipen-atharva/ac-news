const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    title: { type: String, default: '', trim: true, maxlength: 100 },
    url: { type: String, default: '', trim: true, maxlength: 200 },
    description: { type: String, default: '', trim: true, maxlength: 1000 },
    category: { type: String , default: '', trim: true},
    published_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('News', ArticleSchema);