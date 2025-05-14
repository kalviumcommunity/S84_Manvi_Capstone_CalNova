const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    clientName : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true 
    },
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: true 
    },
    date: {
        type: Date,
        required: true 
    },
    status: {
        type: String,
        default: 'pending'
    }
})

module.exports = mongoose.model('Booking',bookingSchema);