define(function (require, exports, module) {

/**
 * 事件
 * @module Events
 */

'use strict';

var $ = require('$');

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
   * 绑定事件，暂不支持命名空间
   * @method on
   * @param {String|Object} event 事件名或哈希对
   * @param {Function} [callback] 绑定回调函数
   * @return {Object} 当前实例
   */
  on: function (event, callback) {
    var events = this.__events || (this.__events = {}),
      eventObject = {};
    if ($.isPlainObject(event)) {
      eventObject = event;
    } else {
      eventObject[event] = callback;
    }
    $.each(eventObject, function (event, callback) {
      if (events[event]) {
        events[event].push(callback);
      } else {
        events[event] = [callback];
      }
    });
    return this;
  },

  /**
   * 解除绑定的事件
   * @method off
   * @param {String} event 事件名
   * @param {Function} [callback] 绑定回调函数
   * @return {Object} 当前实例
   */
  off: function (event, callback) {
    var events = this.__events;
    if (events) {
      if (event && events[event]) {
        if (typeof callback === 'function') {
          $.each(events[event], function (i, n) {
            if (n === callback) {
              events[event].splice(i, 1);
            }
          });
        } else {
          delete events[event];
        }
      } else {
        delete this.__events;
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
    var events = this.__events,
      context = this,
      args = arguments;
    if (events && events[event]) {
      $.each(events[event], function (i, callback) {
        callback.apply(context, args);
      });
    }
    return this;
  }

};

// alias
Events.prototype.emit = Events.prototype.trigger = Events.prototype.fire;

return Events;

});
