const mongoose = require('mongoose');

const TypeEnum = ['phone', 'email', 'meeting'];

const Event = new mongoose.Schema({
    date: {type: Date},
    description: {type: String},
    type: {type: String, enum: TypeEnum},
    name: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model('Event', Event);

