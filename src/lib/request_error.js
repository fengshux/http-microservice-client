"use strict";

/**
 * 
 * @param {} code
 * @param {} body
 */
class RequestError extends Error {
    constructor( code, body) {
        super(body.message || body.msg || body.error || body? JSON.stringify(body) : '' );
        this.code = code;
        this.stack = body.stack;
    }
    
}


module.exports = RequestError;
