/**
 * Class for storing the response data when a request is received
 * @param {boolean} error       : true if there was any error in the request, otherwise false
 * @param {string}  message     : Message that indicates the request result 
 * @param {number}  statusCode  : Status code to set in the response 
 */
class ResponseModel{
    constructor(error=false, message='', statusCode=200){
        this.error      = error;
        this.message    = message;
        this.statusCode = statusCode;
        this.data       = Object();
    }
}

module.exports = ResponseModel;