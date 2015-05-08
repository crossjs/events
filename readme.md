# pandora-events [![spm version](http://127.0.0.1:3000/badge/pandora-events)](http://127.0.0.1:3000/package/pandora-events)

---

实现了事件订阅与发布

---


## Install

```
$ spm install pandora-events --save
```

## Usage

```js
var events = require('pandora-events');

// 定义事件
events.on('test', function (e, a) {
   // e.type === 'test'
});
events.on('test test2', function (e, a) {
 // e.type === 'test' or 'test2'
});
var testFunc = function (e, a) {
 // e.type === 'test'
};
events.on({
 test: testFunc
});

// 触发事件
events.fire('test', 'blah');
events.fire('test2', 'blah');
events.fire('test test2', 'blah');

// 解除事件
events.off('test');
events.off('test test2');
events.off('test', testFunc);

```
