const express   = require('express');
const router    = express.Router();

/**
 * Retrieves the original URL from a shorted URL
 * @param  {Request}    req: Represents the HTTP request and has the properties for the request
 * @param  {Response}   res: Represents the HTTP response that an Express app sends when it gets an HTTP request
 * @returns JSON response with the search result
 */
router.get('/:shortUrlCode', (req, res) => {
    res.status(200).json({
        message: 'URL for getting a shorted URL'
    });
});

/**
 * Creates a short URL for a received link
 * @param  {Request}    req: Represents the HTTP request and has the properties for the request
 * @param  {Response}   res: Represents the HTTP response that an Express app sends when it gets an HTTP request
 * @returns JSON response with the insert result
 */
router.post('/', (req, res) => {
    res.status(200).json({
        message: 'URL for creating a shorted URL'
    });
});

module.exports = router;