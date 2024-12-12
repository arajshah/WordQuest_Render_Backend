const express = require('express');
const router = express.Router();
const Board = require('../src/models/Board');
const jwt = require('jsonwebtoken');
const expressJson = express.json();

// Secret for JWT (use Firebase config or environment variables in production)
const JWT_SECRET = 'your_jwt_secret';

// Middleware to verify JWT and extract user info
const verifyJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Not authorized' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.user; // Attach user info to the request
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// Create a custom board (must be authenticated)
router.post('/', expressJson, verifyJWT, async (req, res) => {
  const { name, grid } = req.body;
  if (!name || !grid) {
    return res.status(400).json({ error: 'Name and grid are required' });
  }

  try {
    const board = await Board.create({
      name,
      grid,
      createdBy: req.user._id,
    });
    res.json(board);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all custom boards created by the authenticated user
router.get('/my', verifyJWT, async (req, res) => {
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
router.delete('/:id', verifyJWT, async (req, res) => {
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
