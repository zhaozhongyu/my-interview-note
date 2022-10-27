## 前端其他
1. 柯里化.
2. 暂时性死区 -- 块级作用域在let 声明变量前, 变量不可用, 这个就叫暂时性死区.

## 前端性能
1. 静态资源优化, 减小资源大小, 异步组件/懒加载图片, cdn和缓存
2. 接口访问优化, http持久链接, 后端合并请求
3. 页面渲染速度优化. 减少dom操作, 事件代理把函数注册到父级元素, 减少页面的重绘和回流.


## cookie和session, token, localStorage和cookie有什么区别
https://segmentfault.com/a/1190000017831088 
token是开发者为了防范csrf而特别设计的令牌，浏览器不会自动添加到headers里，攻击者也无法访问用户的token
token组成
* uid: 用户唯一身份标识
* time: 当前时间的时间戳
* sign: 签名, 使用 hash/encrypt 压缩成定长的十六进制字符串，以防止第三方恶意拼接
* 固定参数(可选): 将一些常用的固定参数加入到 token 中是为了避免重复查库

https://developer.aliyun.com/ask/288774
http://www.ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html

## Http
1. http2.0, http1.1
2. 常见Http请求头
3. 如何解决跨域的问题
4. http1.1时如何复用tcp连接  https://zhuanlan.zhihu.com/p/348307320
5. Http报文的请求会有几个部分
6. HTTPS怎么建立安全通道 https://juejin.cn/post/6844903953193238542
7. 介绍xss，xsrf https://www.huaweicloud.com/articles/078435c119bfb526de9054e3016dddac.html
8. 同源策略 https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy
* 介绍SSL和TLS  https://www.ruanyifeng.com/blog/2014/02/ssl_tls.html
* 介绍DNS解析
* HTTPS的加密过程 https://juejin.cn/post/6844903953193238542
* 网络的五层模型

## CSS
1. 定位问题
2. 清除浮动 -- https://juejin.cn/post/6844903504545316877
3. 介绍flex布局

## webpack
1. dev-server是怎么跑起来 https://cloud.tencent.com/developer/article/1742015
2. 提取公共代码 https://juejin.cn/post/6844903817234874382
3. 插件是怎么运行的.
4. 常用的plugins
5. 使⽤import时，webpack对node_modules⾥的依赖会做什么  https://juejin.cn/post/6867449765378916360

## 浏览器
1. 事件代理以及优缺点 
  优点: 1.减少事件注册，节省内存 2. 减少了dom节点更新的操作，处理逻辑只需在委托元素上进行 
  缺点: 1. 事件委托基于冒泡，对于onfoucs和onblur等事件不支持 2. 层级过多，冒泡过程中，可能会被某层阻止掉
2. 浏览器事件流向
3. Event Loop/微任务 & 宏任务
4. 垃圾回收机制. https://segmentfault.com/a/1190000018605776

## 设计模式
1. 观察者模式
2. 发布-订阅
3. 中介者(调停者)模式 --少 https://www.runoob.com/design-pattern/mediator-pattern.html