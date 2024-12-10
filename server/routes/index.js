// Purpose: Index file for all routes.

const express = require('express');
const router = express.Router();
const dictionary = require('../dictionary.json');
const authRoutes = require('./auth');
const boardRoutes = require('./board');
const storyRoutes = require('./story');
const rewardsRoutes = require('./rewards');

const board = [
  ['A', 'B', 'C', 'D'],
  ['E', 'F', 'G', 'H'],
  ['I', 'J', 'K', 'L'],
  ['M', 'N', 'O', 'P']
];

// Mounting Routes
router.use('/auth', authRoutes);
router.use('/boards', boardRoutes);
router.use('/story', storyRoutes);
router.use('/rewards', rewardsRoutes);
router.use('/tutorial', require('./tutorial'));
router.use('/hint', require('./hint')); 

// Additional Routes
router.get('/board', (req, res) => {
  res.json(board);
});

router.post('/checkword', express.json(), (req, res) => {
  const { word } = req.body; 
  const isValid = dictionary.includes(word.toUpperCase());
  res.json({ valid: isValid });
});

module.exports = router;
