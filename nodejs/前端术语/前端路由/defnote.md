### 前端路由实现原理

https://zhuanlan.zhihu.com/p/116023681

1. 何为前端路由？
路由（Router）这个概念最先是后端出现的，是用来跟后端服务器进行交互的一种方式，通过不同的路径，来请求不同的资源，请求不同的页面是路由的其中一种功能。

前端随着 ajax 的流行，数据请求可以在不刷新浏览器的情况下进行。异步交互体验中最盛行的就是 SPA —— 单页应用。单页应用不仅仅是在页面交互时无刷新的，连页面跳转都是无刷新的，为了实现单页应用，所以就有了前端路由。

2. 前端Router基本功能
一个基本的前端路由至少应该提供以下功能：

前端Router可以控制浏览器的 history，使的浏览器不会在 URL 发生改变时刷新整个页面。
前端Router需要维护一个 URL 历史栈，通过这个栈可以返回之前页面，进入下一个页面。
前端路由实现原理就是匹配不同的 url 路径，进行解析，然后动态的渲染出区域 html 内容。但是这样存在一个问题，就是 url 每次变化的时候，都会造成页面的刷新。那解决问题的思路便是在改变 url 的情况下，保证页面的不刷新。目前 Router有两种实现方式 History 和 hash。

3. 实现
##### Hash 路由
前提: 当href中的链接为#时, 点击链接时浏览器不会发生对应请求. 
URL Hash 的形式类似如下：
```
// 表示文章列表页面
https://www.limitcode.com/#/list
 
// 表示文章详情页面
https://www.limitcode.com/#/detail
```
后面的内容即我们说的 hash 值。hash 用于表示页面的一个位置，当浏览器加载完页面后，会滚动到 hash 所指向的位置，这是 URL hash 最初的目的。

由于 hash 在浏览器中的特性，开发者们发现 hash 非常适合用来实现前端 Router。hash 具有实现前端Router的以下特点，我们一起来看看。

hash 只作用在浏览器，不会在请求中发送给服务器。
hash 发生变化时，浏览器并不会重新给后端发送请求加载页面。
修改 hash 时会在浏览器留下历史记录，可以通过浏览器返回按钮回到上一个页面。
hash 发生变化时会触发 hashchange 事件，在该事件中可以通过 window.location.hash 获取到当前 hash值。

##### History 路由
History 在H5出现之前，可以使用 History.back() 向后跳转，使用 History.forward() 控制向前跳转。

在 H5 中新增了 history.pushState() 和 history.replaceState()，分别可以添加和修改历史记录。
```
window.history.pushState({}, "title", "https://www.limitcode.com/list");
window.history.replaceState({}, "title", "https://www.limitcode.com/detail");
```
和 hash 一样，使用 pushState 和 replaceState 修改 URL 同样有 hash 具备的特点。浏览器历史记录的变更会触发 window 的 onpopstate 事件，可以根据这个事件来监听 URL的变化。

##### History 和 Hash 对比
hash 使用 # 后面的内容模拟一个完整路径，不太美观。
hash 在请求时不会发送给服务器，用户手动刷新页面，后端接受到了也是同一个地址。
History 直接修改浏览器 URL，用户手动刷新页面，后端接受到是不同的地址，需要后端做处理跳转到统一的html页面。