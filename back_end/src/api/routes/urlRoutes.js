const express       = require('express');
const router        = express.Router();
const urlController = require('../controllers/urlController'); // Retrieving the controller

/**
 * Retrieves the original URL from a shorted URL
 * @param  {Request}    req: Represents the HTTP request and has the properties for the request
 * @param  {Response}   res: Represents the HTTP response that an Express app sends when it gets an HTTP request
 * @returns JSON response with the search result
 */
router.get('/:shortUrlCode', (req, res) => {
    // Getting the short URL code from the request param
    let shortUrlCode = req.params.shortUrlCode;

    // Calling to the controller
    urlController.getFullUrl(shortUrlCode, (rm) => {
        if(rm.error){
            // If there is an error, the message is sent in the response
            res.status(rm.statusCode).json({
                message: rm.message,
                data: rm.data
            });
        }else{
            // If there is not an error, a redirect is sent
            res.redirect(rm.data['urlToRedirect'])
        }
    });
});

/**
 * Creates a short URL for a received link
 * @param  {Request}    req: Represents the HTTP request and has the properties for the request
 * @param  {Response}   res: Represents the HTTP response that an Express app sends when it gets an HTTP request
 * @returns JSON response with the insert result
 */
router.post('/', (req, res) => {
    urlController.createShortUrl((rm) => {
        res.status(rm.statusCode).json({
            message: rm.message,
            data: rm.data
        });
    });
});

module.exports = router;