# proxy

Proxy methods on host object until a promise has resolved.


```js

var proxy = require('proxy-call');

var api = {
  method1: function() { /* ... */ },
  method2: function() { /* ... */ }
};

// proxy method1 and method2
proxy(api, ['method1', 'method2'], function load(){
  /* load stuff and return a promise */ 
});

// call your api now 
api
  .method1(args)
  .then(function() {});
  
```

## API

### proxy(host, methods, getPromise)

#### host
Type: `Object`

The host object you want to proxy

#### methods
Type: `Array`

List of methods of the host object you want to proxy

#### methods
Type: `Function`

A function that return a promise to resolve before executing proxied method

## License

MIT
