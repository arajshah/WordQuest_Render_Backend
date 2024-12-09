const express = require('express');
const router = express.Router();
const dictionary = require('../dictionary.json');

const board = [
  ['A', 'B', 'C', 'D'],
  ['E', 'F', 'G', 'H'],
  ['I', 'J', 'K', 'L'],
  ['M', 'N', 'O', 'P']
];

router.get('/board', (req, res) => {
  res.json(board);
});

router.post('/checkword', express.json(), (req, res) => {
  const { word } = req.body; 
  const isValid = dictionary.includes(word.toUpperCase());
  res.json({ valid: isValid });
});

module.exports = router;
