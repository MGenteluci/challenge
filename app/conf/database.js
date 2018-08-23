const mongoose = require('mongoose');

const conn = mongoose.connect('mongodb://localhost:27017/b2w-challenge', { useNewUrlParser: true });

module.exports = conn;