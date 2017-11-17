"use strict";



/**
 * 
 * @param {} host
 * @param {} path
 * @param {} args
 * @returns {} 
 */
exports.crateUrl = function( host, path, args ){

    let test = /\/:[a-z,A-Z,0-9]+/g;
    let key = path.match(test);
    if( key ){
        path = key.reduce((p, k) => {
            k = k.split(':')[1];
            return p.replace(`:${k}`, args[k]);
        }, path);
        return host + path;
    } else {
        return host + path;
    }
};
