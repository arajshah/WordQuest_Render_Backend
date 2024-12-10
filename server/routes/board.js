const express = require('express');
const router = express.Router();
const Board = require('../src/models/Board');
const expressJson = express.json();

// Create a custom board (must be authenticated)
router.post('/', expressJson, async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: 'Not authorized' });
  }

  const { name, grid } = req.body;
  if (!name || !grid) {
    return res.status(400).json({ error: 'Name and grid are required' });
  }

  try {
    const board = await Board.create({
      name,
      grid,
      createdBy: req.user._id
    });
    res.json(board);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all custom boards created by the authenticated user
router.get('/my', async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: 'Not authorized' });
  }

  try {
    const boards = await Board.find({ createdBy: req.user._id });
    res.json(boards);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Retrieve a specific board by ID
router.get('/:id', async (req, res) => {
  try {
    const board = await Board.findById(req.params.id);
    if (!board) {
      return res.status(404).json({ error: 'Board not found' });
    }
    res.json(board);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a specific board by ID
router.delete('/:id', async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: 'Not authorized' });
  }

  try {
    const board = await Board.findById(req.params.id);
    if (!board) {
      return res.status(404).json({ error: 'Board not found' });
    }

    // Ensure the authenticated user owns the board
    if (board.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Forbidden: Not your board' });
    }

    await board.deleteOne();
    res.json({ message: 'Board deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;
