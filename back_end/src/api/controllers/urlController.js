const mongoose      = require('mongoose');
const { nanoid }    = require('nanoid');
const ResponseModel = require('../../models/ResponseModel');
const Url           = require('../../models/Url');
const validUrl      = require('valid-url');

/**
 * Method that retrieves an original URL from the database to redirect the response
 * @param  {string}     urlCode : Short URL code to get the original URL
 * @param  {Function}   next    : Function to execute after the database searching
 */
const getFullUrl = async (urlCode, next) => {
    let rm          = new ResponseModel();
    let urlObject   = null;

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

const createShortUrl = async (next) => {
    let rm = new ResponseModel();
    next(rm);
}

module.exports = {
    getFullUrl:getFullUrl,
    createShortUrl:createShortUrl   
}