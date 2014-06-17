/* global describe:true,it:true, expect: true */
/* jshint expr: true */

var Promise = require('promise'),
    expect = require('chai').expect,
    proxy = (typeof window === 'undefined')
      ? require('..')
      : require('proxy-call');

describe('Proxy specs', function() {

  it('should proxy method (fulfilled promise)', function(done) {

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

    proxy(obj, ['foo'], load)
      .foo('bar')
      .then(function() { done() });
  });

  it('should proxy method (rejected promise)', function(done) {

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

    proxy(obj, ['foo'], load)
      .foo('bar')
      .catch(function(err) {
        expect(err).to.eq('booum');
        done();
      });
  });

  it('should proxy all methods when argument length === 2', function(done) {
    var obj = {
      bar: 'bar',
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

    proxy(obj, load)
      .foo('bar')
      .then(function() { done() });
  });

});