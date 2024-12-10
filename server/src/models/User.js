// server/src/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: String,
  name: String,
  email: String,
  createdAt: { type: Date, default: Date.now },
  coins: { type: Number, default: 0 },              // In-game currency
  achievements: [{ type: String, default: [] }]     // Simple array of achievement IDs/names
});

module.exports = mongoose.model('User', userSchema);
