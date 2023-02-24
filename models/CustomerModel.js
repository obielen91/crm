const mongoose = require('mongoose');

const Customer = new mongoose.Schema({
    name: {type: String, required: true},
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
}, {
    timestamps: true,
})

module.exports = mongoose.model('Customer', Customer);