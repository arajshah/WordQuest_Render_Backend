const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

// Secret for JWT (store securely, e.g., in Firebase config)
const JWT_SECRET = 'your_jwt_secret'; // Replace with a secure key

// Start Google login
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback URL after Google login
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Generate a JWT upon successful authentication
    const token = jwt.sign({ user: req.user }, JWT_SECRET, { expiresIn: '1h' });

    // Redirect to frontend with the token
    res.redirect(`http://localhost:3000?token=${token}`); // Update URL after deployment
  }
);

// Logout (Stateless Implementation)
router.get('/logout', (req, res) => {
  res.status(200).json({ message: 'Logged out' });
});

// Check Auth Status (Stateless Implementation)
router.get('/status', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ authenticated: false });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ authenticated: true, user: decoded.user });
  } catch (error) {
    res.status(401).json({ authenticated: false });
  }
});

module.exports = router;
