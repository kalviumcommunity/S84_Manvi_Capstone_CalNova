const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    clientName : {
        type: String,
        required: true 
    },
    service: {
        type: String,
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