const mongoose = require('mongoose');
require('dotenv').config();

// Define the MongoDB connection URL
const mongoURL = process.env.DB_URL;
console.log('MongoDB URL:', mongoURL);
if (!mongoURL) {
    console.error('MongoDB connection URL is not defined in environment variables.');
    process.exit(1); // Exit the process with a failure code
}
// Setup MongoDB connection
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000, // Timeout after 10 seconds
    socketTimeoutMS: 45000 // Increase socket timeout to 45 seconds
});

// Get the default connection
const db = mongoose.connection;

// Define event listeners for database connection 
db.on('connected', () => {
    console.log('Connected to MongoDB server');
});

db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

// Export the database connection
module.exports = db;
