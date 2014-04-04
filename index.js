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
  methods.forEach(function (name) {

    // backup method
    var method = host[name],
        promise;

    // proxy method
    host[name] = function () {

      if (!promise) promise = getPromise();

      // save args
      var args = slice.call(arguments);

      // execute after promise
      return promise.then(function () {
        return method.apply(host, args);
      });
    };
  });
};
