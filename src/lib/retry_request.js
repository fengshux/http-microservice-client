"use strict";

const request = require("request");
const async = require("async");


/**
 * Request again when last request fail.
 * @param {} option
 * @returns {} Promise;
 */
module.exports = function( option ){
    
    return new Promise( (resolve, reject) => {
        async.retry(2, fn => {
            request(option,fn);
        },(err, res) => {
            if(err) {
                console.error(err);
                return reject(err);
            }
            return resolve(res);
        });
    });
};
