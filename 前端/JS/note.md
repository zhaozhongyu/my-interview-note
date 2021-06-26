* Object去掉其中一项属性，delete删除对象有什么影响。
* var、let和const的区别
* 箭头函数和普通函数的区别
* call、apply和bind的区别
* then有几个参数，then第二个参数和catch的区别是什么？
* Promise.all和 Promise.race的区别

---
##### Object去掉其中一项属性，delete删除对象有什么影响。
delete Object['name']
delete只能删除自有属性，不会影响原型链上的属性

##### 箭头函数和普通函数的区别
* 箭头函数不需要 function 关键字来创建函数
* 箭头函数可以省略 return 关键字
* 箭头函数继承当前上下文的 this 关键字,定义的时候就确定并固定了
* 箭头函数call、apply、bind 并不会影响其 this 的指向
* 箭头函数没有原型prototype
* 箭头函数没有自己的arguments

##### call、apply和bind的区别
* 三者都可以改变函数的this指向，通过第一个参数来绑定
* 三者的第一个参数如果为null、undefined的时候，默认指向window(在浏览器中)
* call第二个参数是参数列表，applay是数组, bind传入的也是一个参数列表(但是这个参数列表可以分多次传入，apply和call是一次性传入所有参数)
* bind 改变this指向后不会立即执行，而是返回一个永久改变this指向的函数来让我们手动调用； apply, call则是立即调用




---