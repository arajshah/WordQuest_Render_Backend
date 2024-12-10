// src/models/Level.js

const mongoose = require('mongoose');

// Define the schema for a Level
const LevelSchema = new mongoose.Schema({
  levelNumber: {
    type: Number,
    required: true,
    unique: true,
    min: [1, 'Level number must be at least 1'],
  },
  grid: {
    type: [[String]], // 2D array representing the game board
    required: true,
    validate: {
      validator: function(v) {
        // Ensure the grid is a square (e.g., 4x4)
        if (!Array.isArray(v)) return false;
        const size = v.length;
        return v.every(row => Array.isArray(row) && row.length === size);
      },
      message: props => `Grid must be a square 2D array. Received grid with dimensions ${props.value.length}x${props.value[0].length}.`,
    },
  },
  description: {
    type: String,
    default: 'No description provided.',
  },
  hints: {
    type: [String],
    default: [],
  },
  rewards: {
    type: Number,
    default: 0, // Points or in-game rewards associated with completing the level
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // Add more fields as necessary (e.g., difficulty, time limits, etc.)
});

// Create indexes for efficient querying
LevelSchema.index({ levelNumber: 1 });

// Export the Level model
module.exports = mongoose.model('Level', LevelSchema);
