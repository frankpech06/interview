const config    = require('./config/init');
const express   = require('express');
const urlRoutes = require('./api/routes/urlRoutes'); // Retrieving the URL's routes

// Starting the app
const app = express();

// Starting the database connection
config.initializeDatabase()

// Setting the routes
app.use('/url', urlRoutes);
 
module.exports = app;