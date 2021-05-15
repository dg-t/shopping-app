const express = require('express');
const cors = require('cors');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

// ROUTES
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

// Handle unhandled routes
app.all('*', (req, res, next) => {
    next(new AppError(`Page at ${req.originalUrl} not found.`, 404));
});

app.use(globalErrorHandler);

module.exports = app;