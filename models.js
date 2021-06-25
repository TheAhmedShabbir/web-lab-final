const mongoose = require('mongoose');

const schema = mongoose.Schema({
    city: {
        type: String,
         required: true
        },
    date: {
        type: Date, 
        required: true
    },
    teamA: {
        type: String, 
        required: true
    },
    teamB: {
        type: String, 
        required: true
    }
})

const matches = mongoose.model('matches', schema);
module.exports = matches;