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
  this.__eventList = {};
};

Events.prototype = {

  /**
   * 绑定事件，暂不支持命名空间
   * @method on
   * @param {String} event 事件名
   * @param {Function} callback 绑定回调函数
   * @return {Object} 当前实例
   */
  on: function (event, callback) {
    var eventList = this.__eventList,
      eventObject = {};
    if ($.isPlainObject(event)) {
      eventObject = event;
    } else {
      eventObject[event] = callback;
    }
    $.each(eventObject, function (event, callback) {
      if (eventList[event]) {
        eventList[event].push(callback);
      } else {
        eventList[event] = [callback];
      }
    });
    return this;
  },

  /**
   * 解除绑定的事件
   * @method off
   * @param {String} event 事件名
   * @param {Function} callback 绑定回调函数
   * @return {Object} 当前实例
   */
  off: function (event, callback) {
    var eventList = this.__eventList;
    if (eventList[event]) {
      if (typeof callback === 'function') {
        $.each(eventList[event], function (i, n) {
          if (n === callback) {
            eventList[event].splice(i, 1);
          }
        });
      } else {
        delete eventList[event];
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
    var eventList = this.__eventList,
      ctx = this,
      args = arguments;
    if (eventList[event]) {
      $.each(eventList[event], function (i, callback) {
        callback.apply(ctx, args);
      });
    }
    return this;
  }

};

// alias
Events.prototype.emit = Events.prototype.trigger = Events.prototype.fire;

return Events;

});
