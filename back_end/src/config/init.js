const mongoose      = require('mongoose');
const { mongoUrl }  = require('./index');

/**
 * Method to initialize the database connection
 */
const initializeDatabase = async () => {
    try{
        // Trying to connect to MongoDB
        await mongoose.connect(mongoUrl, {
            useNewUrlParser: true
        });
        mongoose.Promise = global.Promise;
        console.log("Connected to the database");
    }catch(err){
        console.error(err);
    }
}

module.exports = {
    initializeDatabase:initializeDatabase
}