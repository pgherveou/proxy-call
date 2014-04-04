/* global describe:true,it:true, expect: true */
/* jshint expr: true */

var proxy = require('proxy-call'),
    expect = require('chai').expect;

describe('Proxy specs', function() {

  it('should proxy method (success)', function(done) {

    var obj = {
      foo: function(arg) {
        expect(this).to.be.eq(obj);
        expect(this.loaded).to.be.ok;
        expect(arg).to.be.eq('bar');
      }
    };

    function load() {
      return new Promise(function(resolve) {
        setTimeout(function() {

          obj.loaded = true;
          resolve();
        }, 10);
      });
    }

    proxy(obj, ['foo'], load);
    obj
      .foo('bar')
      .then(function() { done() });
  });

  it('should proxy method (failure)', function(done) {

    var obj = {
      foo: function() {
        throw new Error('should not be called');
      }
    };

    function load() {
      return new Promise(function(resolve, reject) {
        setTimeout(function() { reject('booum'); }, 10);
      });
    }

    proxy(obj, ['foo'], load);

    obj
      .foo('bar')
      .catch(function(err) {
        expect(err).to.eq('booum');
        done();
      });
  });

});