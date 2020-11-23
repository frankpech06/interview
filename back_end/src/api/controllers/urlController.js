const ResponseModel = require('../../models/ResponseModel');

const getFullUrl = async (next) => {
    let rm = new ResponseModel();
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