const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const shirtsRoutes = require('./routes/shirtsRoutes');

// Access env variables
dotenv.config({ path: './config.env' });

// EXPRESS APP
const app = express();

// MIDDLEWARES

// Implement CORS
app.use(cors());

// Add data to request (req) object
app.use(express.json());

// Add current time to request
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

// ROUTES
app.use('/api/v1/shirts', shirtsRoutes);


// CONNECT TO MONGOOSE DATABASE
const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    .then(() => console.log('Database connection successful!'));


// LISTEN PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server started on port: ${port}...`);
});