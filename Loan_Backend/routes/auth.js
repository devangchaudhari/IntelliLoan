const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const multer = require('multer');
const path = require('path');

const router = express.Router();

require('dotenv').config();


// JWT Secret key - for now, hardcode it
const JWT_SECRET = process.env.JWT_SECRET; // You can replace this later with an environment variable

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  // Files will be saved in the "uploads" directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Save file with a unique timestamp name
  },
});
const upload = multer({ storage });

// Register User
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: 'User already exists' });

    // Hash the password using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user instance
    const newUser = new User({ username, email, password: hashedPassword });

    // Save the new user in the database
    await newUser.save();

    // Create the JWT payload
    const payload = { user: { id: newUser._id } };

    // Sign the token
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    // Send back the token
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Login User
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    // Compare the entered password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    // Create the JWT payload
    const payload = { user: { id: user._id } };

    // Sign the token
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    // Send back the token
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Update User Profile (with image upload)
router.put('/profile', upload.single('profileImage'), async (req, res) => {
  try {
    const { name, phone, dob } = req.body;
    const profileImage = req.file ? req.file.filename : undefined;

    const updatedData = {
      username: name,
      phone,
      dob: dob ? new Date(dob) : undefined,
      profileImage: profileImage ? `uploads/${profileImage}` : undefined,
    };

    // Remove undefined values (if no image is uploaded, don't update it)
    Object.keys(updatedData).forEach(key => updatedData[key] === undefined && delete updatedData[key]);

    const updatedUser = await User.findByIdAndUpdate(req.user.id, updatedData, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;


