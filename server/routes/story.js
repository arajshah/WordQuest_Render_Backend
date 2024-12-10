const express = require('express');
const router = express.Router();
const Level = require('../src/models/Level');

// Get all story mode levels or a specific level
router.get('/', async (req, res) => {
  try {
    const levels = await Level.find().sort({ levelNumber: 1 });
    res.json(levels);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:levelNumber', async (req, res) => {
  try {
    const level = await Level.findOne({ levelNumber: req.params.levelNumber });
    if (!level) {
      return res.status(404).json({ error: 'Level not found' });
    }
    res.json(level);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
