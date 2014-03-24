define(function (require, exports, module) {

/**
 * 事件
 * @module Events
 */

'use strict';

var $ = require('$');

var EVENT_SPLITTER = /\s+/;

/**
 * 事件类
 * 实现了事件订阅与发布
 * @class Events
 * @constructor
 */
var Events = function () {
};

Events.prototype = {

  /**
   * 绑定事件订阅
   * @method on
   * @param {String|Object} event 事件名或哈希表
   * @param {Function} [callback] 回调函数
   * @return {Object} 当前实例
   */
  on: function (event, callback) {
    var cache = this.__events || (this.__events = {}),
      maps = {},
      list;

    if ($.isPlainObject(event)) {
      maps = event;
    } else {
      maps[event] = callback;
    }

    $.each(maps, function (events, callback) {
      events = events.split(EVENT_SPLITTER);
      while ((event = events.shift())) {
        list = cache[event] || (cache[event] = []);
        list.push(callback);
      }
    });

    return this;
  },

  /**
   * 解除事件订阅
   * @method off
   * @param {String} event 事件名
   * @param {Function} [callback] 回调函数
   * @return {Object} 当前实例
   */
  off: function (event, callback) {
    var cache = this.__events,
      events,
      list, i;

    if (!cache) {
      return this;
    }

    if (!event) {
      this.__events = {};
      return this;
    }

    events = event.split(EVENT_SPLITTER);

    while ((event = events.shift())) {
      list = cache[event];

      if (!list) {
        continue;
      }

      if (!callback) {
        delete cache[event];
      }

      for (i = list.length; i >= 0; i--) {
        if (list[i] === callback) {
          list.splice(i, 1);
        }
      }
    }

    return this;
  },

  /**
   * 触发绑定的事件
   * @method fire
   * @param {String} event 事件名
   * @return {Object} 当前实例
   */
  fire: function (event) {
    var cache = this.__events,
      events,
      list, i, n,
      returned = true;

    if (!(cache && event)) {
      return;
    }

    events = event.split(EVENT_SPLITTER);

    while ((event = events.shift())) {

      list = cache[event];

      if (!list) {
        continue;
      }

      for (i = 0, n = list.length; i < n; i++) {
        returned = list[i].apply(this, arguments) && returned;
      }
    }

    return returned;
  }

};

// alias
Events.prototype.emit = Events.prototype.trigger = Events.prototype.fire;

module.exports = Events;

});
