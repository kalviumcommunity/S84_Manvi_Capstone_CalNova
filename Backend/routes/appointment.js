const express = require('express');
const router = express.Router();

// Mock appointment data
let mockAppointments = [
  { id: 1, clientName: 'Alice', date: '2025-05-10', service: 'Haircut' },
  { id: 2, clientName: 'Bob', date: '2025-05-12', service: 'Therapy Session' }
];

// GET endpoint
router.get('/', (req, res) => {
  res.json(mockAppointments);
});

// POST endpoint
router.post('/', (req, res) => {
  const { clientName, date, service } = req.body;

  if (!clientName || !date || !service) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const newAppointment = {
    id: mockAppointments.length + 1,
    clientName,
    date,
    service
  };

  mockAppointments.push(newAppointment);
  res.status(201).json(newAppointment);
});

module.exports = router;
