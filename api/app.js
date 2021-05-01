const express = require('express');
const cors = require('cors');
const toyRoutes = require('./routes/toyRoutes');

// Start express app
const app = express();

// MIDDLEWARES

// Implement CORS
app.use(cors());
app.options('*', cors());

// Add data to request (req) object
app.use(express.json());

// Add current time to request
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

// ROUTES
app.use('/api/v1/toys', toyRoutes);

module.exports = app;