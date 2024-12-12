// hint.js
const express = require('express');
const router = express.Router();
const User = require('../src/models/User');
const expressJson = express.json();
const jwt = require('jsonwebtoken');

// Secret for JWT (use Firebase config or environment variables)
const JWT_SECRET = 'your_jwt_secret';

// Middleware to verify JWT and extract user info
const verifyJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Not authorized' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// Simple hint logic
router.post('/', expressJson, verifyJWT, async (req, res) => {
  const user = await User.findById(req.user._id);
  
  if (!user.achievements.includes('hint1')) {
    return res.status(400).json({ error: 'No hints available. Purchase from the store first.' });
  }

  const hints = [
    "Try words starting with vowels.",
    "Look for 'QU' blocks to maximize points.",
    "Try a short word like 'CAT' or 'DOG' if the letters are on the board."
  ];
  const hint = hints[Math.floor(Math.random() * hints.length)];
  res.json({ hint });
});

module.exports = router;