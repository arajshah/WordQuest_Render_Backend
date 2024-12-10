const express = require('express');
const router = express.Router();
const User = require('../src/models/User');
const expressJson = express.json();

// Simple hint logic: return a random letter from the board or a clue like "Try words starting with 'A'"
router.post('/', expressJson, async (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).json({ error: 'Not authorized' });

  const user = await User.findById(req.user._id);
  // Check if user has a hint achievement/item
  if (!user.achievements.includes('hint1')) {
    return res.status(400).json({ error: 'No hints available. Purchase from the store first.' });
  }

  // Provide a dummy hint. In a real scenario, you might analyze the current board or game state.
  const hints = [
    "Try words starting with vowels.",
    "Look for 'QU' blocks to maximize points.",
    "Try a short word like 'CAT' or 'DOG' if the letters are on the board."
  ];
  const hint = hints[Math.floor(Math.random() * hints.length)];
  res.json({ hint });
});

module.exports = router;
