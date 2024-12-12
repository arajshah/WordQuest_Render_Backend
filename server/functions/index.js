const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB Atlas
const mongoURI = process.env.MONGO_URI || 'your_mongodb_atlas_connection_string';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Import routes
const boards = require('./routes/boards');
const story = require('./routes/story');
const checkWord = require('./routes/checkWord');

// Use routes
app.use('/api/boards', boards);
app.use('/api/story', story);
app.use('/api/check-word', checkWord);

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
