const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Catch unhandled exception
process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION! Server shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});

// Access env variables
dotenv.config({ path: './config.env' });

// EXPRESS APP
const app = require('./app');

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

// Catch unhandled rejection
process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION! Server shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});