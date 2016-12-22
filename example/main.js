'use strict';

var Events = require('../src/index');

var events = new Events();
events.on({
  'test': function(e) {
    console.log('e.type:', e.type)
    console.log('fire test')
  }
});
events.fire('test');
