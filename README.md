# proxy

Proxy methods on host object until a promise has resolved.
Make sure to load a polyfill for window.Promise if you want to support older broser

```js
	var proxy = require('proxy-promise');

  var api = {
    method1: function() { /* ... */ },
    method2: function() { /* ... */ }
  };

  // load your api and return a promise
  function load() { /* ... */ }

  // proxy method1 and method2
  proxy(api, ['method1', 'method2'], load);

  // call your
  obj
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
