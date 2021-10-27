* Object去掉其中一项属性，delete删除对象有什么影响。
* var、let和const的区别
* 箭头函数和普通函数的区别
* call、apply和bind的区别
* then有几个参数，then第二个参数和catch的区别是什么？
* Promise.all和 Promise.race的区别
## ES6新增方法面试题

1.let const var比较
2.反引号（`）标识, 生成string
3.函数默认参数
4.箭头函数
5.属性简写
6.方法简写
7.Object.keys()方法，获取对象的所有属性名或方法名
8.Object.assign ()原对象的属性和方法都合并到了目标对象
9.for...of 循环
10.import和export
11.Promise对象
12.解构赋值
13.set数据结构（可用于快速去重）
14.Spread Operator 展开运算符(...)
15.字符串新增方法


## ES6数组面试题

1.forEach()
2.map()
3.filter()
4.reduce()
5.some()
6.every()
7.all()方法
## ES6编程题

1.使用解构，实现两个变量的值的交换
2.利用数组推导，计算出数组 [1,2,3,4] 每一个元素的平方并组成新的数组。
3.使用ES6改下面的模板
4.把以下代码使用两种方法，来依次输出0到9？

## js面试题

1.简述同步和异步的区别
2.怎么添加、移除、复制、创建、和查找节点
3.实现一个函数clone 可以对Javascript中的五种主要数据类型（Number、string、Object、Array、Boolean）进行复制
4.如何消除一个数组里面重复的元素
5.写一个返回闭包的函数
6.使用递归完成1到100的累加
7.Javascript有哪几种数据类型
8.如何判断数据类型
9.console.log(1+'2')和console.log(1-'2')的打印结果
10.Js的事件委托是什么，原理是什么
11.如何改变函数内部的this指针的指向
12.列举几种解决跨域问题的方式，且说明原理
13.谈谈垃圾回收机制的方式及内存管理
14.写一个function ，清除字符串前后的空格
15.js实现继承的方法有哪些
16.判断一个变量是否是数组，有哪些办法
17.let ，const ，var 有什么区别
18.箭头函数与普通函数有什么区别
19.随机取1-10之间的整数
20.new操作符具体干了什么
21.Ajax原理
22.模块化开发怎么做
23.异步加载Js的方式有哪些
24.xml和 json的区别
25.webpack如何实现打包的
26.常见web安全及防护原理
27.用过哪些设计模式
28.为什么要同源限制
29.offsetWidth/offsetHeight,clientWidth/clientHeight与scrollWidth/scrollHeight的区别
30.javascript有哪些方法定义对象
31.说说你对promise的了解
32.谈谈你对AMD、CMD的理解
33.web开发中会话跟踪的方法有哪些
34.介绍js有哪些内置对象？
35.说几条写JavaScript的基本规范？
36.javascript创建对象的几种方式？
37.eval是做什么的？
38.null，undefined 的区别？
39.[“1”, “2”, “3”].map(parseInt) 答案是多少？
40.javascript 代码中的”use strict”;是什么意思 ? 使用它区别是什么？
41.js延迟加载的方式有哪些？
42.defer和async
43.说说严格模式的限制
44.attribute和property的区别是什么？
45.ECMAScript6 怎么写class么，为什么会出现class这种东西?
46.常见兼容性问题
47.函数防抖节流的原理
48.原始类型有哪几种？null是对象吗？
49.为什么console.log(0.2+0.1==0.3) //false
50.说一下JS中类型转换的规则？
51.深拷贝和浅拷贝的区别？如何实现
52.如何判断this？箭头函数的this是什么
53.== 和 ===的区别
54.什么是闭包
55.JavaScript原型，原型链 ? 有什么特点？
56.typeof()和instanceof()的用法区别
57.什么是变量提升
58.all、apply以及bind函数内部实现是怎么样的
59.为什么会出现setTimeout倒计时误差？如何减少
60.谈谈你对JS执行上下文栈和作用域链的理解
61.new的原理是什么？通过new的方式创建对象和通过字面量创建有什么区别？
62.prototype 和 proto 区别是什么？
63.使用ES5实现一个继承？
64.取数组的最大值（ES5、ES6）
65.ES6新的特性有哪些？
66.promise 有几种状态, Promise 有什么优缺点 ?
67.Promise构造函数是同步还是异步执行，then呢 ?promise如何实现then处理 ?
68.Promise和setTimeout的区别 ?
69.如何实现 Promise.all ?
70.如何实现 Promise.finally ?
71.如何判断img加载完成
72.如何阻止冒泡？
73.如何阻止默认事件？
74.ajax请求时，如何解释json数据
75.json和jsonp的区别?
76.如何用原生js给一个按钮绑定两个onclick事件？
77.拖拽会用到哪些事件
78.document.write和innerHTML的区别
79.jQuery的事件委托方法bind 、live、delegate、on之间有什么区别？
80.浏览器是如何渲染页面的？
81.$(document).ready()方法和window.onload有什么区别？
82.jquery中.get()提交和post()提交有区别吗？
83.对前端路由的理解？前后端路由的区别？
84.手写一个类的继承
85.XMLHttpRequest：XMLHttpRequest.readyState;状态码的意思

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