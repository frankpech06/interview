const { apiUrl }    = require('../../config/index')
const mongoose      = require('mongoose');
const { nanoid }    = require('nanoid');
const ResponseModel = require('../../models/ResponseModel');
const Url           = require('../../models/Url');
const validUrl      = require('valid-url');

/**
 * Creates a complete shorted URL
 * @param {string} urlCode : URL short code
 * @returns Full shorted URL
 */
const getFullShortedUrl = (urlCode) => {
    // Concatenates the retrieved API URL with the short URL code
    let fullUrl = apiUrl + "/" + urlCode;
    return fullUrl;
}

/**
 * Method that retrieves an original URL from the database to redirect the response
 * @param  {string}     urlCode : Short URL code to get the original URL
 * @param  {Function}   next    : Function to execute after the database searching
 */
const getFullUrl = async (urlCode, next) => {
    let rm          = new ResponseModel();  // Object to store the response data
    let urlObject   = null;                 // Url object to store in the database

    try{
        // Checking if there is any URL associated to the url code
        urlObject = await Url.findOne({shortUrlCode: urlCode});
        if (urlObject){
            // Storing the original URL in the response object
            rm.data['urlToRedirect']= urlObject.originalUrl;
        }else{
            // If there is no a URL in the database, an error is returned
            rm.error        = true;
            rm.message      = "Url not found.";
            rm.statusCode   = 404;
        }
    }catch(err){
        // If there is any error, an error is returned
        rm.error        = true;
        rm.message      = "Url not found.";
        rm.statusCode   = 404;
    }
    
    next(rm);
}

/**
 * Method that creates a short URL to be stored in the database
 * @param  {string}     longUrl : URL to short
 * @param  {Function}   next    : Function to execute after the short URL creation
 */
const createShortUrl = async (longUrl, next) => {
    let rm          = new ResponseModel();  // Object to store the response data
    let shortUrl    = null;                 // This variable will contain the full shorted URL to return
    let urlCode     = null;                 // URL code for the shorted URL
    let urlObject   = null;                 // Url object to store in the database      

    // If longUrl is not a valid URL, an error is returned
    if(!validUrl.isUri(longUrl)){
        rm.error        = true;
        rm.message      = "The received URL is invalid. "
        rm.statusCode   = 400;
    }
    
    if(!rm.error){
        // Checking if the URL was previously added
        urlObject = await Url.findOne({originalUrl: longUrl});
        if (urlObject){
            // If the URL was added before, the short URL is returned
            rm.data['urlResponse']  = getFullShortedUrl(urlObject.shortUrlCode);
            rm.message              = "The received URL was previously saved."
            rm.statusCode           = 200
        }else{
            // Creating the short URL
            urlCode = nanoid(10);
            shortUrl= getFullShortedUrl(urlCode);
            
            // Creating the model to store in the database
            urlObject = new Url({
                _id         : new mongoose.Types.ObjectId(),
                originalUrl : longUrl,
                shortUrlCode: urlCode,
                createdAt   : new Date(Date.now()).toISOString()
            });
            
            try{
                // Trying to save the URL data
                await urlObject.save();

                // Sending the shorted URL
                rm.data['urlResponse']  = shortUrl;
                rm.message              = "The short URL was saved"
                rm.statusCode           = 201;
            }catch(err){
                // If there is any error, an error is returned
                rm.error        = true;
                rm.message      = "Server error. Please call to the administrator.";
                rm.statusCode   = 422;
            }
        }
    }
    
    return (next != null) ? next(rm) : rm;
}

module.exports = {
    getFullUrl:getFullUrl,
    createShortUrl:createShortUrl   
}