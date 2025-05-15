const express = require('express');
const router = express.Router();
const Service = require('../models/Service');


router.post('/', async (req, res) => {
  try {
    const { name, duration, price, provider, description } = req.body;

    const newService = new Service({
      name,
      duration,
      price,
      provider,
      description
    });

    await newService.save();
    res.status(201).json(newService);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
