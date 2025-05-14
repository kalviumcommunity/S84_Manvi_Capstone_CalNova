const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true 
    },
    duration: {
        type: Number,
        required: true 
    },
    price: {
        type: Number,
        required: true
    },
    provider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    description: String
    },
    {timestamps: true});

module.exports = mongoose.model('Service',serviceSchema);
