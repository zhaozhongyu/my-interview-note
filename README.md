# Vue-research-notes
芝士就是力量.

# 前端八股
## 项目/项目优化
## HTML/CSS
1. 盒模型
2. 语义化

## JS
* 闭包
* 原型/原型链
* `promise`
* `Event Loop`/微任务&宏任务 https://www.ruanyifeng.com/blog/2014/10/event-loop.html
* 垃圾回收机制 https://segmentfault.com/a/1190000018605776 https://segmentfault.com/a/1190000023379683

## Vue
* 生命周期
* 实现原理(响应式原理等)
* 虚拟DOM

## 浏览器
* 渲染原理/重绘/回流(配合css)
* 浏览器在访问网页时做了什么
* 浏览器缓存 



## 安全/性能
* 性能优化
* csrf 
  > 假如用户正在登陆银行网页，同时登陆了攻击者的网页，并且银行网页未对csrf攻击进行防护。攻击者就可以在网页放一个表单，该表单提交src为http://www.bank.com/api/transfer，body为count=1000&to=Tom。倘若是session+cookie，用户打开网页的时候就已经转给Tom1000元了.因为form 发起的 POST 请求并不受到浏览器同源策略的限制，因此可以任意地使用其他域的 Cookie 向其他域发送 POST 请求，形成 CSRF 攻击。在post请求的瞬间，cookie会被浏览器自动添加到请求头中。但token不同，token是开发者为了防范csrf而特别设计的令牌，浏览器不会自动添加到headers里，攻击者也无法访问用户的token，所以提交的表单无法通过服务器过滤，也就无法形成攻击。

## 网络/HTTP/HTTPs
1. TCP
2. 跨域/JSONP
3. http1.0/1.1/2.0 https://zhuanlan.zhihu.com/p/348307320  https://juejin.cn/post/6844903953193238542
4. cookie, session, token https://segmentfault.com/a/1190000017831088 https://segmentfault.com/a/1190000004556040
5. https https://juejin.cn/post/6844903953193238542  https://www.ruanyifeng.com/blog/2014/02/ssl_tls.html

## webpack
* tree-shaking 原理

## 算法..
1. 观察者模式/发布-订阅模式和他们的区别.

-----
## 
对我来说, 关键难点还是在于跨域, http, css还好