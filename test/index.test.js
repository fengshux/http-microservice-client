"use strict";

const should = require("should");
const MicroService = require("../src/index");
const config = {
    test:{
        host:"http://127.0.0.1:8080",
        api:[
            {
                name:'getId',
                path:'/test/:id',
                method:'GET'
            },
            {
                name:'info',
                path:'/test/info',
                headers:['id']
            }
        ]
    }
};

const microService = new MicroService(config);

describe("microservice test", function() {

    
    it('test get', async function() {
        
        let body = await microService.test.getId({id:'59a15ba4989d9f504190294b'});
        should(body).not.null();
        should(body.id).not.null();
        should(body.id).equal('59a15ba4989d9f504190294b');
        
    });

    it('test header', async function() {
        
        let body = await microService.test.info({id:'59a15ba4989d9f504190294b'});
        should(body).not.null();
        should(body.id).not.null();
        should(body.id).equal('59a15ba4989d9f504190294b');
    });
});


