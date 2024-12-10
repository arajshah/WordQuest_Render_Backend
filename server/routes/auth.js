const express = require('express');
const router = express.Router();
const passport = require('passport');

// Start Google login
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback URL after Google login
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Successful auth
    res.redirect('http://localhost:3000'); // Redirect to frontend home
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
      res.redirect('http://localhost:3000');
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
