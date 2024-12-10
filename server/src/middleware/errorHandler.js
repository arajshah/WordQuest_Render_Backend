// server/src/middleware/errorHandler.js
function errorHandler(err, req, res, next) {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
  }
  
  module.exports = errorHandler;
  