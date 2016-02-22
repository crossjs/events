var expect = require('expect.js');
var Events = require('../events');

describe('pandora-events', function() {

  it('new', function() {
    expect(new Events()).not.to.equal(new Events())
  });

  it('context', function() {
    var events = new Events(),
      T = '';
    events.on({
      'test': function() {
        expect(this).to.equal(events);
      }
    });
    events.fire('test');
  });

  it('e.type', function() {
    var events = new Events();
    events.on({
      'test': function (e) {
        expect(e.type).to.be('test');
      }
    });
    events.fire('test');
  });

  it('e.target', function() {
    var events = new Events();
    events.on({
      'test': function (e) {
        expect(e.target).to.equal(events);
      }
    });
    events.fire('test');
  });

  it('arguments', function() {
    var events = new Events();
    events.on({
      'test': function (e) {
        expect(Array.prototype.slice.call(arguments, 1)[2]).to.equal(3);
      }
    });
    events.fire('test', 1, 2, 3);
  });

  it('on(event, callback)', function() {
    var events = new Events();
    events
      .on('test', function (e, a) {
        expect(a).to.be(1);
      })
      .on('test2 test3', function (e, a) {
        expect(a).to.be(2);
      });
    events.fire('test', 1);
    events.fire('test2', 2);
    events.fire('test3', 2);
  });

  it('on(\'all\', callback)', function() {
    var events = new Events(), i = 0;
    events
      .on('all', function (e, a) {
        expect(a).to.be(++i);
      });
    events.fire('test', 1);
    events.fire('test2', 2);
    events.fire('test3', 3);
  });

  it('on(object)', function() {
    var events = new Events();
    events
      .on({
        'test': function (e, a) {
          expect(a).to.be(1);
        }
      }).on({
        'test test2': function (e, a) {
          expect(a).to.be(1);
        }
      });
    events.fire('test', 1);
    events.fire('test2', 1);
  });

  it('off(event)', function() {
    var events = new Events();
    events
      .on('test', function (e, a) {
        this.a = a;
      });
    events.fire('test', 1);
    events.off('test');
    events.fire('test', 2);
    expect(events.a).to.be(1);
  });

  it('off(event, callback)', function() {
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
    expect(events.a).to.be(2);
    events.off('test', a2);
    events.fire('test', 1);
    expect(events.a).to.be(1);
    events.fire('test3', 1);
    expect(events.a).to.be(3);
    events.off('test test3');
    events.fire('test3', 0);
    expect(events.a).to.be(3);
    events.fire('test', 0);
    expect(events.a).to.be(3);
  });

  it('off()', function() {
    var events = new Events();
    events
      .on('test', function (e, a) {
        this.a = a;
      });
    events.fire('test', 1);
    events.off();
    events.fire('test', 2);
    expect( events.a).to.be(1);
  });

  it('off()', function() {
    var events = new Events();
    events.off();
    events.on('test', function () { });
    events.off('test2');
    expect(true).to.be.ok();
  });

  it('fire(event)', function() {
    var events = new Events();
    events.fire('test');
    events
      .on('test', function () {
        expect(true).to.be.ok();
      })
      .on('test2', function () {
        expect(true).to.be.ok();
      });
    events.fire('test');
    events.fire('test test2');
    events.fire('test3');
  });

  it('fire(event)', function() {
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
    expect(events.fire('test')).to.be(false);
    expect(events.fire('test2')).to.be(true);
  });
});
