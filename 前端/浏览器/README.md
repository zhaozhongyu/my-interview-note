https://github.com/cttin/cttin.github.io/issues/3

### position、BFC、重绘和回流。
之前关于position的总结
* 重绘（repaint）：节点由于样式发生改变，不改变布局，例如改变元素背景色时，屏幕上的部分内容需要更新。
* 回流（reflow）：当render树中的一部分或者全部因为大小边距等问题发生改变而需要重建的过程叫做回流。
什么情况下触发重绘和回流：

* 添加、删除元素(回流+重绘)
* 隐藏元素，display:none(回流+重绘)，visibility:hidden(只重绘，不回流)
* 移动元素，比如改变top，left（jquery的animate方法就是，改变top，left不一定会影响回流），或者移动元素到另外1个父元素中。(重绘+回流), translate2d是相对于元素变化前原身的位置进行移动的，就是因为这个相对，于是使用translate进行移动的元素不会影响到别的dom甚至自己原先位置的变化，只是渲染的变化，于是translate只会触发页面的重绘
* 对style的操作(对不同的属性操作，影响不一样)
* 改变浏览器大小，改变浏览器的字体大小等(回流+重绘)
* 激活伪类，如hover（重绘+回流）
* 设置style，操作class属性（重绘+回流）
* 改变字体大小（重绘+回流）
如何避免重绘和回流：

* 如果想设定元素的样式，通过改变元素的 class 名 (尽可能在 DOM 树的最末端)
* 避免设置多项内联样式
* 应用元素的动画，使用 position 属性的 fixed 值或 absolute 值上面。它们不影响其他元素的布局，所它他们只会导致重新绘制，而不是一个完整回流。
* 避免使用table布局
* 免使用CSS的JavaScript表达式 (仅 IE 浏览器)
* 不要频繁计算样式。如果你有一个样式需要计算，只取一次，将它缓存在一个变量中并且在这个变量上工作

### 如何提高性能

1. 清理HTML文档
HTML，即超文本标记语言，几乎是所有网站的支柱。HTML 为网页带来标题、子标题、列表和其它一些文档结构的格式。在最近更新的 HTML5 中，甚至可以创建图表。HTML 很容易被网络爬虫识别，因此搜索引擎可以根据网站的内容在一定程度上实时更新。在写 HTML 的时候，你应该尝试让它简洁而有效。此外，在 HTML 文档中引用外部资源的时候也需要遵循一些最佳实践方法。
2. 减少外部HTTP请求
很多情况下，网页的大部分加载时间来自于外部的http请求，外部资源的加载速度随着主机提供商的服务器架构、地点等不同而不同。减少外部请求要做的第一步就是简略地检查网站。研究你网站的每个组成部分，消除任何影响访问者体验不好的成分，这些成分可能是：不必要的图片、没用的 JavaScript 代码、过多的 css、多余的插件。在你去掉这些多余的成分之后，再对剩下的内容进行整理，如，压缩工具、CDN 服务和预获取（prefetching）等，这些都是管理 HTTP 请求的最佳选择。除此之外，减少DNS路由查找也可以减少外部 HTTP 请求。
3. 压缩 CSS、 JS 和 HTML
4. 使用 CDN 和缓存提高速度
内容分发网络能显著提高网站的速度和性能。使用 CDN 时，您可以将网站的静态内容链接到全球各地的服务器扩展网络。如果您的网站观众遍布全球，这项功能十分有用。 CDN 允许您的网站访问者从最近的服务器加载数据。如果您使用 CDN，您网站内的文件将自动压缩，以便在全球范围内快速分发。
压缩文件
虽然许多 CDN 服务可以压缩文件，但如果不使用 CDN，也可以考虑在源服务器上使用文件压缩方法来改进前端优化。 文件压缩能使网站的内容轻量化，更易于管理。 最常用的文件压缩方法之一是 Gzip。 这是缩小文档、音频文件、PNG图像和等其他大文件的绝佳方法。
5. 用web storage替换cookies
Cookie最大的问题是每次都会跟在请求后面。在HTML5中，用sessionStorage和localStorage把用户数据直接在客户端，这样可以减少HTTP请求的数据量。而且Web storage还提供了API来操作数据，不像cookie，还得自己写。
6. 使用 CSS动画，而不是JavaScript动画
使用CSS的动画，而不是JS动画。因为某些机器可以对CSS的动画进行GPU加速，而且也减少了JS文件请求。
7. 使用硬件加速
现在领先的浏览已经启用了GPU级别的硬件加速，通过某些指令或hack可以打开这些硬件加速。比如CSS中使用3D转换或动画，就可以打开GPU硬件加速。
8. 使用form的新的特性
HTML的form加入了很多新的属性、元素和验证功能，使用这些新的功能可以减少JS和CSS的介入。

##### data-xxx 属性的作用是什么？
定义：
HTML5规范里增加了一个自定义data属性，可以往HTML里面添加任意以 “data-”开头的属性, 这些属性页面上是不显示的，它不会影响到你的页面布局和风格，但它却是可读可写的。存储的（自定义）数据能够被页面的 JavaScript 中利用，以创建更好的用户体验（不进行 Ajax 调用或服务器端数据库查询）。
组成：
属性名不应该包含任何大写字母，并且在前缀 “data-”之后必须有至少一个字符。
属性值可以是任意字符串。

# 跨域

因为浏览器出于安全考虑，有同源策略。也就是说，如果协议、域名或者端口有一个不同就是跨域，Ajax 请求会失败。

我们可以通过以下几种常用方法解决跨域的问题

## JSONP

JSONP 的原理很简单，就是利用 `<script>` 标签没有跨域限制的漏洞。通过 `<script>` 标签指向一个需要访问的地址并提供一个回调函数来接收数据当需要通讯时。

```js
<script src="http://domain/api?param1=a&param2=b&callback=jsonp"></script>
<script>
    function jsonp(data) {
    	console.log(data)
	}
</script>    
```

JSONP 使用简单且兼容性不错，但是只限于 `get` 请求。

在开发中可能会遇到多个 JSONP 请求的回调函数名是相同的，这时候就需要自己封装一个 JSONP，以下是简单实现

```js
function jsonp(url, jsonpCallback, success) {
  let script = document.createElement("script");
  script.src = url;
  script.async = true;
  script.type = "text/javascript";
  window[jsonpCallback] = function(data) {
    success && success(data);
  };
  document.body.appendChild(script);
}
jsonp(
  "http://xxx",
  "callback",
  function(value) {
    console.log(value);
  }
);
```

## CORS

CORS需要浏览器和后端同时支持。IE 8 和 9 需要通过 `XDomainRequest` 来实现。

浏览器会自动进行 CORS 通信，实现CORS通信的关键是后端。只要后端实现了 CORS，就实现了跨域。

服务端设置 `Access-Control-Allow-Origin` 就可以开启 CORS。 该属性表示哪些域名可以访问资源，如果设置通配符则表示所有网站都可以访问资源。

## document.domain 

该方式只能用于二级域名相同的情况下，比如 `a.test.com` 和 `b.test.com` 适用于该方式。

只需要给页面添加 `document.domain = 'test.com'` 表示二级域名都相同就可以实现跨域

## postMessage

这种方式通常用于获取嵌入页面中的第三方页面数据。一个页面发送消息，另一个页面判断来源并接收消息

```js
// 发送消息端
window.parent.postMessage('message', 'http://test.com');
// 接收消息端
var mc = new MessageChannel();
mc.addEventListener('message', (event) => {
    var origin = event.origin || event.originalEvent.origin; 
    if (origin === 'http://test.com') {
        console.log('验证通过')
    }
});
```


* 浏览器事件流向
* cookie放哪里；cookie能做的事情和存在的价值；cookie的引用是为了解决什么问题
* cookie和session有哪些区别
* cookie和localStorage有哪些区别
* 介绍localStorage的api
* 如何设计一个localStorage，保证数据的实效性

### 为什么typeof可以检测类型，有没有更好的方法
typeof 一般被用于判断一个变量的类型，我们可以利用 typeof 来判断number, string, object, boolean, function, undefined, symbol 这七种类型，这种判断能帮助我们搞定一些问题，js在底层存储变量的时候会在变量的机器码的低位1-3位存储其类型信息(000：对象，010：浮点数，100：字符串，110：布尔，1：整数)，但是null所有机器码均为0，直接被当做了对象来看待。
那么有没有更好的办法区分类型呢，一般使用Object.prototype.toString.call()，具体可以参考这篇文章：zhuanlan.zhihu.com/p/118793721

### mutationObserve是微任务还是宏任务, 为什么?
addEventListener的回调函数会进入宏任务队列；

MutationObserver的回调函数会进入微任务队列

不同点: 
addEventListener的触发方式是同步触发；比如，点击后，回调函数立即进入宏任务队列。

MutationObserver的监听是异步触发，在所有的DOM操作完成后才触发使回调函数进入微任务队列。