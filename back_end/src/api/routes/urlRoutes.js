const express   = require('express');
const router    = express.Router();

/**
 * Retrieves the original URL from a shorted URL
 * @param  {Request} req
 * @param  {Response} res
 * @returns JSON object with the search result
 */
router.get('/:shortUrlCode', (req, res) => {
    res.status(200).json({
        message: 'URL for getting a shorted URL'
    });
});

/**
 * Creates a short URL for a received link
 * @param  {Request} req
 * @param  {Response} res
 * @returns JSON object with the insert result
 */
router.post('/', (req, res) => {
    res.status(200).json({
        message: 'URL for creating a shorted URL'
    });
});

module.exports = router;