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

/**
 * Method that enables CORS
 * @param  {Request}    req : Represents the HTTP request and has the properties for the request
 * @param  {Response}   res : Represents the HTTP response that an Express app sends when it gets an HTTP request
 * @param  {Function}   next: Function to execute after the process is complete
 */
const enableCors = async (req, res, next) => {
    // Adding the headers to the response
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method == "OPTIONS"){
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }

    next();
}

module.exports = {
    initializeDatabase:initializeDatabase,
    enableCors:enableCors
}