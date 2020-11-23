const mongoose = require('mongoose');

/**
 * Schema for storing the URL information
 * @param {mongoose.Schema.Types.ObjectId}  _id         : Document ID
 * @param {mongoose.Schema.Types.String}    originalUrl : Original URL 
 * @param {mongoose.Schema.Types.String}    shortUrlCode: Short URL code
 * @param {mongoose.Schema.Types.Date}      createdAt   : Document creation date
 */
const urlSchema = mongoose.Schema({
    _id         : mongoose.Schema.Types.ObjectId,
    originalUrl : { type: mongoose.Schema.Types.String, required: true },
    shortUrlCode: { type: mongoose.Schema.Types.String, required: true },
    createdAt   : { type: mongoose.Schema.Types.Date, required: true }
});

module.exports = mongoose.model('Url', urlSchema);