* macrotasks: setTimeout, setInterval, setImmediate, I/O, UI rendering
* microtasks: process.nextTick, Promises, Object.observe(废弃), MutationObserver
  
  setTimeout 的 macrotask ,和 Promise 的 microtask 有什么不同呢？ 我们通过下面的代码来展现他们的不同点：
```
console.log('script start');
setTimeout(function() {
  console.log('setTimeout');
}, 0);
Promise.resolve().then(function() {
  console.log('promise1');
}).then(function() {
  console.log('promise2');
});
console.log('script end');
```
这里的运行结果是Promise的立即返回的异步任务会优先于setTimeout延时为0的任务执行。
原因是任务队列分为 macrotasks 和 microtasks，而Promise中的then方法的函数会被推入 microtasks 队列，而setTimeout的任务会被推入 macrotasks 队列。在每一次事件循环中，macrotask 只会提取一个执行，而 microtask 会一直提取，直到 microtasks 队列清空。


常见考点
* 什么是事件循环？
* JS 的执行原理？
* 哪些是微宏任务？
* 定时器是准时的嘛？

