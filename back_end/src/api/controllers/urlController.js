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
 * Method that retrieves all the shorted URLs stored in the database
 * @param  {Function}   next    : Function to execute after the database searching
 */
const getAllUrls = async (next) => {
    let rm      = new ResponseModel();  // Object to store the response data
    let urlsInDb= null;                 // Variable where the URLs in the database will be stored
    let urls    = [];                   // Array where the URLs to return will be stored

    try{
        // Trying to retrieve the URLs in the database
        urlsInDb = await Url.find();
        
        // If there is any URL:
        if (urlsInDb){
            // Loop over each URL to extract the relevant data
            urlsInDb.forEach( (urlData) => { 
                urls.push({longUrl: urlData.originalUrl, shortUrl: getFullShortedUrl(urlData.shortUrlCode)})
            });
        }
        
        // Storing the shorted URLs
        rm.data['urls'] = urls;
        
    }catch(err){
        // If there is any error, an error is returned
        rm.error        = true;
        rm.message      = "Urls not found.";
        rm.statusCode   = 404;
    }

    return next(rm);
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
    
    return next(rm);
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

/**
 * Method that creates a short URL for the contained URL's in a text file
 * @param  {File}       textFile: File where the urls to short are
 * @param  {Function}   next    : Function to execute after the short URL creation
 */
const bulkCreateShortUrls = async (textFile, next) => {
    let data        = (textFile.buffer + '').split('\n');   // Array that contains the whole lines in the file
    var rm          = null;                                 // ResponseModel data to catch each shorted URL
    let shortUrls   = [];                                   // Array that will contain all shorted URL
    let upperRm     = new ResponseModel()                   // Object to store the final response data

    // Loop over each text file in data
    for(let index in data){
        // Cleaning the url
        cleanedUrl = data[index].replace(/\n|\r/g, "");

        // Trying to short the URL
        rm = await createShortUrl(cleanedUrl, null);
        if(!rm.error){
            // If there is not an error, the shorted URL is stored in the array
            shortUrls.push(rm.data['urlResponse']);
        }
    }

    // If the number of shorted URLs is different to the number of lines, an error is sent
    if (shortUrls.length != data.length){
        upperRm.error = true;
        upperRm.message = "An error occurred when creating the short urls.";
    }

    upperRm.data['shortUrls'] = shortUrls;
    return next(upperRm);
}

module.exports = {
    getAllUrls:getAllUrls,
    getFullUrl:getFullUrl,
    createShortUrl:createShortUrl,
    bulkCreateShortUrls:bulkCreateShortUrls
}