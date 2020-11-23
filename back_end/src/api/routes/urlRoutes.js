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
    urlController.getFullUrl((rm) => {
        res.status(rm.statusCode).json({
            message: rm.message,
            data: rm.data
        });
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