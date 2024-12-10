// server/src/routes/rewards.js
const express = require('express');
const router = express.Router();
const User = require('../src/models/User');
const expressJson = express.json();

// Mock store items
const storeItems = [
  { id: 'hint1', name: 'Extra Hint', cost: 10 },
  { id: 'theme_dark', name: 'Dark Theme', cost: 20 }
];

// Get store items
router.get('/store', (req, res) => {
  res.json(storeItems);
});

// Award coins to user
router.post('/award', expressJson, async (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).json({ error: 'Not authorized' });
  
  const { amount } = req.body;
  if (typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json({ error: 'Invalid amount' });
  }

  try {
    const user = await User.findById(req.user._id);
    user.coins += amount;
    await user.save();
    res.json({ coins: user.coins });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Buy an item
router.post('/buy', expressJson, async (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).json({ error: 'Not authorized' });

  const { itemId } = req.body;
  const item = storeItems.find(i => i.id === itemId);
  if (!item) return res.status(404).json({ error: 'Item not found' });

  try {
    const user = await User.findById(req.user._id);
    if (user.coins < item.cost) {
      return res.status(400).json({ error: 'Not enough coins' });
    }
    user.coins -= item.cost;
    // If item grants a capability (like hints), you could track that in user’s profile or achievements.
    if (!user.achievements.includes(itemId)) {
      user.achievements.push(itemId);
    }
    await user.save();
    res.json({ coins: user.coins, achievements: user.achievements });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;