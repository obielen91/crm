const mongoose = require('mongoose');

const TypeEnum = ['phone', 'email', 'meeting'];

const Event = new mongoose.Schema({
    contactDate: {type: Date, require: true},
    type: {type: String, enum: TypeEnum, require: true},
    description: {type: String, require: true},
    name: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model('Event', Event);


























