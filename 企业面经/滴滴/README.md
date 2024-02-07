3. `<a>`标签默认事件禁掉之后做什么才能实现跳转 -- click事件

5. 整个前端性能提升⼤致分⼏类 -- 加载速度, 打包大小, 渲染优化.

6. import { Button } from 'antd'，打包的时候只打包button，分模块加载，是怎么做到的

7. 使⽤import时，webpack对node_modules⾥的依赖会做什么
  首先说import，他只是一个引用,在你没有用到它得时候它不会执行。
需要执行的时候，再到模块里面取值，webpack则是根据你的引入方式去判断模块的类型，然后进行相关的转译，import引入，babel会默认把ES6的模块转译为ComminJS规范，然后把node_modules里面的依赖打包成IIFE（自执行函数(function(modules){})([])）,模块会传入到数组里面，函数经过运行之后最终将模块通过module.exports导出

8. JS异步解决⽅案的发展历程以及优缺点

9. Http报⽂的请求会有⼏个部分

10. cookie放哪⾥，cookie能做的事情和存在的价值

11. cookie和token都存放在header⾥⾯，为什么只劫持前者

12. cookie和session有哪些⽅⾯的区别

18. 柯⾥化函数两端的参数具体是什么东⻄

23. webpack整个⽣命周期，loader和plugin有什么区别
loader一般是将某个语法统一处理为统一的语法
plugin一般是在打包前或打包后对结果进行再次操作


24. 介绍AST（Abstract Syntax Tree）抽象语法树


28. 跨域怎么解决，有没有使⽤过Apache等⽅案