define(function (require, exports) {

  'use strict';

  var Events = require('../src/events');

  QUnit.start();

  module('Module Events');
  test('new Events()', function() {
    notEqual( new Events(), new Events(), '' );
  });

  module('Module Event');
  test('.fire(event)', function() {
    var events = new Events(),
      T = '',
      t = '';
    events.on({
      'test': function () {
        T = this;
        t = Array.prototype.join.call(arguments, '');
      }
    });
    events.fire('test', 1, 2, 3);
    equal( T, events, '' );
    equal( t, 'test123', '' );
    events.off('test');
    events.fire('test', 4, 5, 6);
    equal( T, events, '' );
    equal( t, 'test123', '' );
  });
  test('.fire(event)', function() {
    var events = new Events(),
      T = '',
      t = '';
    events.on({
      'test': function () {
        T = this;
        t = Array.prototype.join.call(arguments, '');
      }
    }).on({
      'test': function () {
        T = this;
        t += Array.prototype.join.call(arguments, '');
      }
    });
    events.fire('test', 1, 2, 3);
    equal( T, events, '' );
    equal( t, 'test123test123', '' );
    events.off('test');
    events.fire('test', 4, 5, 6);
    equal( T, events, '' );
    equal( t, 'test123test123', '' );
  });

});