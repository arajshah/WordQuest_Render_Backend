const express = require('express');
const router = express.Router();

// Simple static tutorial content
const tutorialSteps = [
  { step: 1, text: "Welcome to WordQuest! In this tutorial, you'll learn how to find words on the grid." },
  { step: 2, text: "Words can be formed from adjacent letters. Try forming a short word like 'CAT'." },
  { step: 3, text: "Once you find a word, type it in and check if it's valid. Earn points and coins for valid words." },
  { step: 4, text: "As you progress, you'll unlock hints, achievements, and other features. Have fun!" }
];

router.get('/', (req, res) => {
  res.json(tutorialSteps);
});

module.exports = router;
