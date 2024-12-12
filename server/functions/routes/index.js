// index.js
const express = require('express');
const router = express.Router();
const dictionary = require('../dictionary.json');
const authRoutes = require('./auth');
const boardRoutes = require('./board');
const storyRoutes = require('./story');
const rewardsRoutes = require('./rewards');
const jwt = require('jsonwebtoken');
const expressJson = express.json();

// Secret for JWT (use Firebase config or environment variables)
const JWT_SECRET = 'your_jwt_secret';

// Middleware to verify JWT
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

// Mounting Routes
router.use('/auth', authRoutes);
router.use('/boards', boardRoutes);
router.use('/story', storyRoutes);
router.use('/rewards', rewardsRoutes);
router.use('/tutorial', require('./tutorial'));
router.use('/hint', require('./hint'));

// Additional Routes
router.get('/board', (req, res) => {
  const board = [
    ['A', 'B', 'C', 'D'],
    ['E', 'F', 'G', 'H'],
    ['I', 'J', 'K', 'L'],
    ['M', 'N', 'O', 'P']
  ];
  res.json(board);
});

// Check word route
router.post('/checkword', expressJson, (req, res) => {
  const { word } = req.body; 
  const isValid = dictionary.includes(word.toUpperCase());
  res.json({ valid: isValid });
});

module.exports = router;