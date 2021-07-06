* 介绍Promise；介绍内部实现/如何实现；介绍用途和性质；介绍优缺点；
* Promise有几个状态
* 如何设计Promise.all；Promise.all实现原理
* Promise如何处理异常捕获？
* Promise和callback有什么区别
* Promise和async有什么区别；两者处理失败的时候有什么区别
* Promise和setTimeout执行先后的区别；Promise和setTimeout的区别
* Promise的构造函数是同步还是异步执行？then呢
* Promise里面和then里面执行有什么区别？
* Promise有没有解决异步的问题？
* 
* 
* 介绍Async/Await；介绍内部原理；介绍如何实现；
* 使用Async需要注意些什么东西
* Async里面有多个Await请求，怎么优化？请求是否有依赖？

------
##### Promise和setTimeout执行先后的区别；Promise和setTimeout的区别
宏任务, 微任务和event loop

##### Promise和async有什么区别
async/await 可读性更强更优雅
promise出现reject的时候, 必须要由它本身进行链式操作catch, 否则即便在try/catch中仍然会出现UnhandledPromiseRejectionWarning
而async/await可以在一个try/catch中同时处理同步/异步的方法.



------