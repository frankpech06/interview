const express       = require('express');
const multer        = require('multer');
const router        = express.Router();
const urlController = require('../controllers/urlController'); // Retrieving the controller
const upload        = multer({storage: multer.memoryStorage()});

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
    // Getting the URL from the request body
    let longUrl = req.body.url;

    // Calling to the controller
    urlController.createShortUrl(longUrl, (rm) => {
        // Returning the result
        res.status(rm.statusCode).json({
            message: rm.message,
            data: rm.data
        });
    });
});

/**
 * Creates a short URL for each link in a text file
 * @param  {Request}    req: Represents the HTTP request and has the properties for the request
 * @param  {Response}   res: Represents the HTTP response that an Express app sends when it gets an HTTP request
 * @returns JSON response with the insert result
 */
router.post('/bulk', upload.single('links'), (req, res) => {
    // Getting the text file from the request
    let textFile = req.file;
    let download = req.body.download;

    // Calling to the controller
    urlController.bulkCreateShortUrls(textFile, (rm) => {
        if (download == 1){
            // If the download variable is equal to 1, the result is exported in a txt file
            let textContent = rm.data['shortUrls'].join('\r\n');
            res.setHeader('Content-type', 'application/octet-stream');
            res.setHeader('Content-disposition', 'attachment; filename=file.txt');
            res.send(new Buffer.from(textContent, encoding="utf8"));
        }else{
            // Sending the result
            res.status(rm.statusCode).json({
                message: rm.message,
                data: rm.data
            });
        }
    });
});

module.exports = router;