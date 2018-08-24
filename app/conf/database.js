const mongoose = require('mongoose');

let conn;

if(process.env.NODE_ENV === 'test'){
    conn = mongoose.connect('mongodb://localhost:27017/b2w-challenge-test', { useNewUrlParser: true });
}else{
    conn = mongoose.connect('mongodb://localhost:27017/b2w-challenge', { useNewUrlParser: true });
}

module.exports = conn;