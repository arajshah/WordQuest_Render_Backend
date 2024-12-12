const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

// Secret for JWT (store securely, e.g., in Firebase config)
const JWT_SECRET = 'af438875e728d6a822d1b78d61d14c4819a7df0603b177a598c890949d340db7'; // Replace with a secure key

// Start Google login
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback URL after Google login
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Generate a JWT upon successful authentication
    const token = jwt.sign({ user: req.user }, JWT_SECRET, { expiresIn: '1h' });

    // Redirect to frontend with the token
    res.redirect(`https://wordquest-render-backend.onrender.com?token=${token}`); // Update URL to your Firebase frontend
  }
);

// Logout
router.get('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) {
      console.error('Logout error:', err);
      return next(err); // Pass the error to the default error handler
    }
    req.session.destroy(err => {
      if (err) return res.status(500).json({ error: 'Could not log out' });
      res.clearCookie('connect.sid'); // Clear the session cookie
      res.redirect('https://your-frontend-app.web.app'); // Update URL to your Firebase frontend
    });
  });
});

// Check Auth Status
router.get('/status', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ authenticated: true, user: req.user });
  } else {
    res.json({ authenticated: false });
  }
});

module.exports = router;