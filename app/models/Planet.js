const mongoose = require('mongoose');

const planetSchema = mongoose.Schema({

    _id: {
        type: mongoose.Schema.Types.ObjectId
    },
    name: {
        type: String,
        required: true
    },
    climate: {
        type: String,
        required: true
    },
    terrain: {
        type: String,
        required: true
    },
    moviesNumber: {
        type: Number
    }

});

module.exports = mongoose.model('Planet', planetSchema);