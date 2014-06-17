var slice = [].slice;

/**
 * proxy methods of host until promise has resolved
 *
 * @param  {Object}   host       host object
 * @param  {Array}    methods    array of methods to proxy
 * @param  {Function} getPromise closure returning promise
 *
 */

module.exports = function (host, methods, getPromise) {
  var promise;

  if (!host || 'object' !== typeof host) {
    throw new Error('Invalid host object');
  }

  if (!getPromise) {
    getPromise = methods;
    methods = Object.keys(host).filter(function (key) {
      return 'function' === typeof host[key];
    });
  }

  methods.forEach(function (name) {

    // backup method
    var method = host[name];

    // proxy method
    host[name] = function () {

      // set promise on first call
      if (!promise) promise = getPromise();

      // save args
      var args = slice.call(arguments);

      // execute after promise
      return promise.then(function () {
        return method.apply(host, args);
      });
    };
  });

  return host;
};
