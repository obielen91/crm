const mongoose = require('mongoose');

const Customer = new mongoose.Schema({
    name: {type: String, require: true},
    address: {
        street: {type: String, require: true},
        zipCode: {type: String, require: true},
        city: {type: String, require: true},
    },
    nip: {type: Number},
    events: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event',
        },
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model('Customer', Customer);