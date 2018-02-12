"use strict";

const co = require("co");
const RequestError = require("./lib/request_error");
const request = require("./lib/retry_request");
const util = require("./lib/util");


let createFunction = function( host, option ) {

    return co.wrap(function * (param) {
        
        let args = Object.assign({},param);
        let opt = {
            url:util.createUrl(host, option.path, args),
            method:(option["method"]|| 'GET' ).toUpperCase(),
            json:true
        };
        
        if(option.headers ){
            opt.headers = option.headers.reduce( (headers, x) => {
                headers[x] = args[x];
                return headers;
            },{});
        }
        
        if( opt.method ==='GET' || opt.method === 'DELETE' ) {
            opt.qs = args;
        } else {
            opt.body = args;
        }

        if( this.__trace ) {
            this.__trace.span.clientSend();
            this._log.info(this.__trace);
        }

        let res = yield request(opt);

        if( this.__trace ) {
            this.__trace.span.clientReceive();
            this.log.info(this.__trace);
        }
        
        if(/^2\d{2}$/.test(res.statusCode)) {
            return res.body;
        }
        
        throw new RequestError( res.statusCode, res.body );
    });

};


class MicroService {

    constructor (config , log ) {
        if(!config) {
            throw new Error('need config to init.');
        }
        this._log = log || console;

        for( let key in config ) {
            let c = config[key],
                host = c.host;
            this[key] = c.api.reduce((service, api) => {
                service[api.name] = createFunction( host, api );
                return service;
            },{});
        }


        for( let key in config ) {

            this[key]["_trace"] = function( trace ) {
                let traceid;
                if( util.isObject( trace ) ) {
                    traceid = trace.id;
                } else {
                    traceid = trace;
                }

                let trace_data = new HttpTrace(traceid);
                let service = Object.assign({}, this);
                service.__trace = trace_data;
                return service;
            };
            
        }
    }
}


module.exports = MicroService;
