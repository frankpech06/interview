const dotenv = require('dotenv');
dotenv.config()

// Exporting the environment variables
module.exports = {
    apiUrl  : process.env.API_URL,
    port    : process.env.PORT,
    mongoUrl: process.env.MONGO_URL
};