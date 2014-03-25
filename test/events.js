define(function (require, exports) {

  'use strict';

  var Events = require('../src/events');

  QUnit.start();

  test('new', function() {
    notEqual( new Events(), new Events(), '' );
  });

  test('context', function() {
    var events = new Events(),
      T = '';
    events.on({
      'test': function () {
        equal( this, events, '' );
      }
    });
    events.fire('test');
  });

  test('arguments', function() {
    var events = new Events();
    events.on({
      'test': function (e) {
        deepEqual( Array.prototype.slice.call(arguments),
          ['test', 1, 2, 3], '' );
      }
    });
    events.fire('test', 1, 2, 3);
  });

  test('on(event, callback)', function() {
    var events = new Events();
    events
      .on('test', function (e, a) {
        equal( a, 1, '' );
      })
      .on('test2 test3', function (e, a) {
        equal( a, 2, '' );
      });
    events.fire('test', 1);
    events.fire('test2', 2);
    events.fire('test3', 2);
  });

  test('on(object)', function() {
    var events = new Events();
    events
      .on({
        'test': function (e, a) {
          equal( a, 1, '' );
        }
      }).on({
        'test test2': function (e, a) {
          equal( a, 1, '' );
        }
      });
    events.fire('test', 1);
    events.fire('test2', 1);
  });

  test('off(event)', function() {
    var events = new Events();
    events
      .on('test', function (e, a) {
        this.a = a;
      });
    events.fire('test', 1);
    events.off('test');
    events.fire('test', 2);
    equal( events.a, 1, '' );
  });

  test('off(event, callback)', function() {
    var events = new Events(),
      a = function (e, a) {
        this.a = a;
      },
      a2 = function (e, a) {
        this.a = a + a;
      },
      a3 = function (e, a) {
        this.a = a + a + a;
      };
    events
      .on('test', a)
      .on('test', a2)
      .on('test3', a3);
    events.fire('test', 1);
    equal( events.a, 2, '' );
    events.off('test', a2);
    events.fire('test', 1);
    equal( events.a, 1, '' );
    events.fire('test3', 1);
    equal( events.a, 3, '' );
    events.off('test test3');
    events.fire('test3', 0);
    equal( events.a, 3, '' );
    events.fire('test', 0);
    equal( events.a, 3, '' );
  });

  test('off()', function() {
    var events = new Events();
    events
      .on('test', function (e, a) {
        this.a = a;
      });
    events.fire('test', 1);
    events.off();
    events.fire('test', 2);
    equal( events.a, 1, '' );
  });

  test('off()', function() {
    var events = new Events();
    events.off();
    events.on('test', function () { });
    events.off('test2');
    ok( true, '' );
  });

  test('fire(event)', function() {
    var events = new Events();
    events.fire('test');
    events
      .on('test', function () {
        ok( true, '' );
      })
      .on('test2', function () {
        ok( true, '' );
      });
    events.fire('test');
    events.fire('test test2');
    events.fire('test3');
  });

  test('fire(event)', function() {
    var events = new Events();
    events
      .on('test', function () {
        return true;
      })
      .on('test', function () {
        return false;
      })
      .on('test2', function () {
        return 1;
      })
      .on('test2', function () {
        return 0;
      });
    equal( events.fire('test'), false, '' );
    equal( events.fire('test2'), true, '' );
  });

});