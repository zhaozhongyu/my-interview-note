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
# Event loop

众所周知 JS 是门非阻塞单线程语言，因为在最初 JS 就是为了和浏览器交互而诞生的。如果 JS 是门多线程的语言话，我们在多个线程中处理 DOM 就可能会发生问题（一个线程中新加节点，另一个线程中删除节点），当然可以引入读写锁解决这个问题。

JS 在执行的过程中会产生执行环境，这些执行环境会被顺序的加入到执行栈中。如果遇到异步的代码，会被挂起并加入到 Task（有多种 task） 队列中。一旦执行栈为空，Event Loop 就会从 Task 队列中拿出需要执行的代码并放入执行栈中执行，所以本质上来说 JS 中的异步还是同步行为。

```js
console.log('script start');

setTimeout(function() {
  console.log('setTimeout');
}, 0);

console.log('script end');
```

以上代码虽然 `setTimeout` 延时为 0，其实还是异步。这是因为 HTML5 标准规定这个函数第二个参数不得小于 4 毫秒，不足会自动增加。所以 `setTimeout` 还是会在 `script end` 之后打印。

不同的任务源会被分配到不同的 Task 队列中，任务源可以分为 微任务（microtask） 和 宏任务（macrotask）。在 ES6 规范中，microtask 称为 `jobs`，macrotask 称为 `task`。

```js
console.log('script start');

setTimeout(function() {
  console.log('setTimeout');
}, 0);

new Promise((resolve) => {
    console.log('Promise')
    resolve()
}).then(function() {
  console.log('promise1');
}).then(function() {
  console.log('promise2');
});

console.log('script end');
// script start => Promise => script end => promise1 => promise2 => setTimeout
```

以上代码虽然 `setTimeout` 写在 `Promise` 之前，但是因为 `Promise` 属于微任务而 `setTimeout` 属于宏任务，所以会有以上的打印。

微任务包括 `process.nextTick` ，`promise` ，`Object.observe` ，`MutationObserver`

宏任务包括 `script` ， `setTimeout` ，`setInterval` ，`setImmediate` ，`I/O` ，`UI rendering`

很多人有个误区，认为微任务快于宏任务，其实是错误的。因为宏任务中包括了 `script` ，浏览器会先执行一个宏任务，接下来有异步代码的话就先执行微任务。

所以正确的一次 Event loop 顺序是这样的

1. 执行同步代码，这属于宏任务
2. 执行栈为空，查询是否有微任务需要执行
3. 执行所有微任务
4. 必要的话渲染 UI
5. 然后开始下一轮 Event loop，执行宏任务中的异步代码

通过上述的  Event loop 顺序可知，如果宏任务中的异步代码有大量的计算并且需要操作 DOM 的话，为了更快的 界面响应，我们可以把操作 DOM 放入微任务中。

## Node 中的 Event loop

Node 中的 Event loop 和浏览器中的不相同。

Node 的 Event loop 分为6个阶段，它们会按照顺序反复运行

```
┌───────────────────────┐
┌─>│        timers         │
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
│  │     I/O callbacks     │
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
│  │     idle, prepare     │
│  └──────────┬────────────┘      ┌───────────────┐
│  ┌──────────┴────────────┐      │   incoming:   │
│  │         poll          │<──connections───     │
│  └──────────┬────────────┘      │   data, etc.  │
│  ┌──────────┴────────────┐      └───────────────┘
│  │        check          │
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
└──┤    close callbacks    │
   └───────────────────────┘
```

### timer

timers 阶段会执行 `setTimeout` 和 `setInterval`

一个 `timer` 指定的时间并不是准确时间，而是在达到这个时间后尽快执行回调，可能会因为系统正在执行别的事务而延迟。

下限的时间有一个范围：`[1, 2147483647]` ，如果设定的时间不在这个范围，将被设置为1。

### I/O 

I/O 阶段会执行除了 close 事件，定时器和 `setImmediate` 的回调

### idle, prepare 

idle, prepare 阶段内部实现

### poll 

poll 阶段很重要，这一阶段中，系统会做两件事情

1. 执行到点的定时器
2. 执行 poll 队列中的事件

并且当 poll 中没有定时器的情况下，会发现以下两件事情

- 如果 poll 队列不为空，会遍历回调队列并同步执行，直到队列为空或者系统限制
- 如果 poll 队列为空，会有两件事发生
  - 如果有 `setImmediate` 需要执行，poll 阶段会停止并且进入到 check 阶段执行 `setImmediate`
  - 如果没有 `setImmediate` 需要执行，会等待回调被加入到队列中并立即执行回调

如果有别的定时器需要被执行，会回到 timer 阶段执行回调。

### check

check 阶段执行 `setImmediate` 

### close callbacks

close callbacks 阶段执行 close 事件

并且在 Node 中，有些情况下的定时器执行顺序是随机的

```js
setTimeout(() => {
    console.log('setTimeout');
}, 0);
setImmediate(() => {
    console.log('setImmediate');
})
// 这里可能会输出 setTimeout，setImmediate
// 可能也会相反的输出，这取决于性能
// 因为可能进入 event loop 用了不到 1 毫秒，这时候会执行 setImmediate
// 否则会执行 setTimeout
```

当然在这种情况下，执行顺序是相同的

```js
var fs = require('fs')

fs.readFile(__filename, () => {
    setTimeout(() => {
        console.log('timeout');
    }, 0);
    setImmediate(() => {
        console.log('immediate');
    });
});
// 因为 readFile 的回调在 poll 中执行
// 发现有 setImmediate ，所以会立即跳到 check 阶段执行回调
// 再去 timer 阶段执行 setTimeout
// 所以以上输出一定是 setImmediate，setTimeout
```

上面介绍的都是 macrotask 的执行情况，microtask 会在以上每个阶段完成后立即执行。

```js
setTimeout(()=>{
    console.log('timer1')

    Promise.resolve().then(function() {
        console.log('promise1')
    })
}, 0)

setTimeout(()=>{
    console.log('timer2')

    Promise.resolve().then(function() {
        console.log('promise2')
    })
}, 0)

// 以上代码在浏览器和 node 中打印情况是不同的
// 浏览器中一定打印 timer1, promise1, timer2, promise2
// node 中可能打印 timer1, timer2, promise1, promise2
// 也可能打印 timer1, promise1, timer2, promise2
```

Node 中的 `process.nextTick` 会先于其他 microtask 执行。

 ```js
setTimeout(() => {
  console.log("timer1");

  Promise.resolve().then(function() {
    console.log("promise1");
  });
}, 0);

process.nextTick(() => {
  console.log("nextTick");
});
// nextTick, timer1, promise1
 ```

 # 渲染机制

浏览器的渲染机制一般分为以下几个步骤

1. 处理 HTML 并构建 DOM 树。
2. 处理 CSS 构建 CSSOM 树。
3. 将 DOM 与 CSSOM 合并成一个渲染树。
4. 根据渲染树来布局，计算每个节点的位置。
5. 调用 GPU 绘制，合成图层，显示在屏幕上。

![](https://yck-1254263422.cos.ap-shanghai.myqcloud.com/blog/2019-06-01-042733.png)

在构建 CSSOM 树时，会阻塞渲染，直至 CSSOM 树构建完成。并且构建 CSSOM 树是一个十分消耗性能的过程，所以应该尽量保证层级扁平，减少过度层叠，越是具体的 CSS 选择器，执行速度越慢。

当 HTML 解析到 script 标签时，会暂停构建 DOM，完成后才会从暂停的地方重新开始。也就是说，如果你想首屏渲染的越快，就越不应该在首屏就加载 JS 文件。并且 CSS 也会影响 JS 的执行，只有当解析完样式表才会执行 JS，所以也可以认为这种情况下，CSS 也会暂停构建 DOM。

![](https://yck-1254263422.cos.ap-shanghai.myqcloud.com/blog/2019-06-01-042734.png)

![](https://yck-1254263422.cos.ap-shanghai.myqcloud.com/blog/2019-06-01-042735.png)

## Load 和 DOMContentLoaded 区别

Load 事件触发代表页面中的 DOM，CSS，JS，图片已经全部加载完毕。

DOMContentLoaded 事件触发代表初始的 HTML 被完全加载和解析，不需要等待 CSS，JS，图片加载。

## 图层

一般来说，可以把普通文档流看成一个图层。特定的属性可以生成一个新的图层。**不同的图层渲染互不影响**，所以对于某些频繁需要渲染的建议单独生成一个新图层，提高性能。**但也不能生成过多的图层，会引起反作用。**

通过以下几个常用属性可以生成新图层

- 3D 变换：`translate3d`、`translateZ`
- `will-change`
- `video`、`iframe` 标签
- 通过动画实现的 `opacity` 动画转换
- `position: fixed`

## 重绘（Repaint）和回流（Reflow）

重绘和回流是渲染步骤中的一小节，但是这两个步骤对于性能影响很大。

- 重绘是当节点需要更改外观而不会影响布局的，比如改变 `color` 就叫称为重绘
- 回流是布局或者几何属性需要改变就称为回流。

回流必定会发生重绘，重绘不一定会引发回流。回流所需的成本比重绘高的多，改变深层次的节点很可能导致父节点的一系列回流。

所以以下几个动作可能会导致性能问题：

- 改变 window 大小
- 改变字体
- 添加或删除样式
- 文字改变
- 定位或者浮动
- 盒模型

很多人不知道的是，重绘和回流其实和 Event loop 有关。

1. 当 Event loop 执行完 Microtasks 后，会判断 document 是否需要更新。因为浏览器是 60Hz 的刷新率，每 16ms 才会更新一次。
2. 然后判断是否有 `resize` 或者 `scroll` ，有的话会去触发事件，所以 `resize` 和 `scroll` 事件也是至少 16ms 才会触发一次，并且自带节流功能。
3. 判断是否触发了 media query
4. 更新动画并且发送事件
5. 判断是否有全屏操作事件
6. 执行 `requestAnimationFrame` 回调
7. 执行 `IntersectionObserver` 回调，该方法用于判断元素是否可见，可以用于懒加载上，但是兼容性不好
8. 更新界面
9. 以上就是一帧中可能会做的事情。如果在一帧中有空闲时间，就会去执行 `requestIdleCallback` 回调。

以上内容来自于 [HTML 文档](https://html.spec.whatwg.org/multipage/webappapis.html#event-loop-processing-model)

## 减少重绘和回流

- 使用 `translate` 替代 `top`

  ```html
  <div class="test"></div>
  <style>
  	.test {
  		position: absolute;
  		top: 10px;
  		width: 100px;
  		height: 100px;
  		background: red;
  	}
  </style>
  <script>
  	setTimeout(() => {
          // 引起回流
  		document.querySelector('.test').style.top = '100px'
  	}, 1000)
  </script>
  ```

- 使用 `visibility` 替换 `display: none` ，因为前者只会引起重绘，后者会引发回流（改变了布局）

- 把 DOM 离线后修改，比如：先把 DOM 给 `display:none` (有一次 Reflow)，然后你修改100次，然后再把它显示出来

- 不要把 DOM 结点的属性值放在一个循环里当成循环里的变量

  ```js
  for(let i = 0; i < 1000; i++) {
      // 获取 offsetTop 会导致回流，因为需要去获取正确的值
      console.log(document.querySelector('.test').style.offsetTop)
  }
  ```

- 不要使用 table 布局，可能很小的一个小改动会造成整个 table 的重新布局

- 动画实现的速度的选择，动画速度越快，回流次数越多，也可以选择使用 `requestAnimationFrame`

- CSS 选择符从右往左匹配查找，避免 DOM 深度过深

- 将频繁运行的动画变为图层，图层能够阻止该节点回流影响别的元素。比如对于 `video` 标签，浏览器会自动将该节点变为图层。

  ![](https://yck-1254263422.cos.ap-shanghai.myqcloud.com/blog/2019-06-01-042737.png)

* 浏览器事件流向
* cookie放哪里；cookie能做的事情和存在的价值；cookie的引用是为了解决什么问题
* cookie和session有哪些区别
* cookie和localStorage有哪些区别
* 介绍localStorage的api
* 如何设计一个localStorage，保证数据的实效性