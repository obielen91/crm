const mongoose = require('mongoose');

const Event = new mongoose.Schema({
    date: {type: Date},
    description: {type: String},
    type: {
        phone: {type: Number},
        email: {type: String},
        meeting: {type: String}
    },
    name: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model('Event', Event);

