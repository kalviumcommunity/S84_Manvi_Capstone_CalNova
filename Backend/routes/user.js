const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Booking = require('../models/Booking');


// GET all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET a single user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new user
router.post('/', async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required.' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(409).json({ message: 'User with this email already exists.' });

    const newUser = new User({ name, email, password, role });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update an existing user by ID
router.put('/:id', async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, password, role },
      { new: true }
    );

    if (!updatedUser) return res.status(404).json({ message: 'User not found' });

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//test route
router.get('/test/populated-bookings', async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('client', 'name email')
      .populate({
        path: 'service',
        populate: {
          path: 'provider',
          select: 'name email'
        }
      });

    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});
router.get('/test/populated-bookings', async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('client', 'name email')
      .populate({
        path: 'service',
        populate: {
          path: 'provider',
          select: 'name email'
        }
      });

    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;

