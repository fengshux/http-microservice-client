
  [![NPM version][npm-image]][npm-url]
  [![build status][travis-image]][travis-url]

  A enjoyable http client for restfull microservice to make request to http microservice without any coding.
  
  All http requests in json file will be generator a Promise function in this client. 

## Installation

 Requires __node v6.1.0__ or higher for ES6 and generator function support.

```
$ npm install http-microservice-client
```

## Example

```js

    const config = {
        foo:{
            host:'http://localhost:8080',
            api:[
                {
                    name:'bar',
                    path:'/bar/:id',
                    headers:['Authorization']
                },
                {
                    name:'bazz',
                    path:'/bazz',
                    method:'POST'
                }
            ]
        }
    }

    const Microservice = require("http-microservice-client");
    const client = new Microservice( config );
    
    
    try {
        let barResBody = yield client.foo.bar({id:'1',Authorization:'token'})
    } catch ( e ) {
    
        let statusCode = e.code;
        let message = e.message;
        console.log(statusCode, message);
    }
    
    try {
        let bazzResBody = yield client.foo.bazz({x:1,y:2});
    } catch ( e ) {
    
        let statusCode = e.code;
        let message = e.message;
        console.log(statusCode, message);
    }

```
  In api config default method is 'GET'. 

# License
  
  MIT

[npm-image]: https://img.shields.io/npm/v/{your package name}.svg?style=flat
[npm-url]: https://www.npmjs.com/package/http-microservice-client
