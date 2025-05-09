const express = require('express');
const router = express.Router();

const mockAppointments = [
    { id: 1, clientName: 'Alice', date: '2025-05-10', service: 'Haircut' },
    { id: 2, clientName: 'Bob', date: '2025-05-12', service: 'Therapy Session' }
  ];

  router.get('/',(req,res)=>{
    res.json(mockAppointments);
  })

  module.exports = router;