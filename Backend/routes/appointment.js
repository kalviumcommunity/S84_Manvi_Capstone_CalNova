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

// PUT endpoint

router.put('/:id', (req, res) => {
  const appointmentId = parseInt(req.params.id); // convert from string to number
  const { clientName, date, service } = req.body;

  const index = mockAppointments.findIndex(app => app.id === appointmentId);

  if (index === -1) {
    return res.status(404).json({ message: 'Appointment not found' });
  }

  // Update the appointment
  if (clientName !== undefined) mockAppointments[index].clientName = clientName;
  if (date !== undefined) mockAppointments[index].date = date;
  if (service !== undefined) mockAppointments[index].service = service;

  res.json(mockAppointments[index]);
});


module.exports = router;
