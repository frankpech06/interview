const dotenv = require('dotenv');
dotenv.config()

module.exports = {
    apiUrl: process.env.API_URL,
    masterKey: process.env.API_KEY,
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    endpoint: process.env.API_ENDPOINT
};