const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const { verifyToken } = require('../utils/jwt');

// GET all appointments for logged-in user
router.get('/', verifyToken, async (req, res) => {
  try {
    const appointments = await Booking.find({ userId: req.user.userId });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE new appointment
router.post('/', verifyToken, async (req, res) => {
  const { clientName, date, service } = req.body;

  if (!clientName || !date || !service) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const newAppointment = new Booking({
      clientName,
      date,
      service,
      userId: req.user.userId,
    });

    await newAppointment.save();
    res.status(201).json(newAppointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE appointment
router.put('/:id', verifyToken, async (req, res) => {
  const { clientName, date, service } = req.body;

  try {
    const updatedAppointment = await Booking.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      { clientName, date, service },
      { new: true }
    );

    if (!updatedAppointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.json(updatedAppointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
