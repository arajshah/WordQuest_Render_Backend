require('dotenv').config();

const express = require('express');
const app = express();
const routes = require('./routes'); // Import the centralized router
const cors = require('cors');
const morgan = require('morgan');
const errorHandler = require('./src/middleware/errorHandler');
const session = require('express-session');
const passport = require('passport');
const connectDB = require('./src/config/db');
require('./src/config/passport');

connectDB();

// Middleware Setup
app.use(morgan('dev'));
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

app.use(express.json()); // Ensure JSON parsing middleware is included

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

// Mount the centralized router at the root path
app.use('/', routes);

// Error Handling Middleware should come after all route mounts
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
