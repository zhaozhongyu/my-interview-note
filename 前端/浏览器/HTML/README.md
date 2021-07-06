## HTML
1. 浏览器页面有哪三层构成，分别是什么，作用是什么?
2. HTML5的优点与缺点？
3. Doctype作用? 严格模式与混杂模式如何区分？它们有何意义?
4. HTML5有哪些新特性、移除了哪些元素？
5. 你做的网页在哪些浏览器测试过,这些浏览器的内核分别是什么?
6. 每个HTML文件里开头都有个很重要的东西，Doctype，知道这是干什么的吗？
7. 说说你对HTML5认识?（是什么,为什么）
8. 对WEB标准以及W3C的理解与认识?
9. HTML5行内元素有哪些, 块级元素有哪些, 空元素有哪些?
10. 什么是WebGL,它有什么优点?
11. 请你描述一下 cookies，sessionStorage 和 localStorage 的区别
12. 说说你对HTML语义化的理解?
13. link和@import的区别?
14. 说说你对SVG理解?
15. HTML全局属性(global attribute)有哪些?
17. `<b>`和`<strong>`的区别


-----
##### 浏览器页面有哪三层构成
构成：结构层、表示层、行为层

分别是：HTML、CSS、JavajScript

作用：HTML实现页面结构、CSS完成页面的表现与风格、JavaScript实现客户端的一些功能和业务

##### Doctype作用? 严格模式与混杂模式如何区分？它们有何意义?
`<!DOCTYPE >`声明位于文档的最前面，处于标签之前，它不是html标签。主要作用是告诉浏览器的解析器使用哪种HTML规范或者XHTML规范来解析页面。
严格模式和混杂模式都是浏览器的呈现模式，浏览器究竟使用混杂模式还是严格模式呈现页面与网页中的DTD（文件类型定义）有关，DTD里面包含了文档的规则。比如：loose.dtd.
严格模式：又称标准模式，是指浏览器按照W3C标准来解析代码，呈现页面
混杂模式：又称为怪异模式或者兼容模式，是指浏览器按照自己的方式来解析代码，使用一种比较宽松的向后兼容的方式来显示页面。

##### HTML5有哪些新特性、移除了哪些元素
一，新增元素

内容元素：article、header，footer,section,nav,aside
表单元素：calendar，date，time，number,url,search;
多媒体：video,audio;
控件元素： websockt,webwork
绘画：canvas;
存储：localStorage;sessionStorage
二，移除元素

big font basefont,s,tt,u,frame.iframe

##### WebGL
WebGL是一种3D绘图标准，是js和OpenGL的结合，通过增加一个OpenGL的js绑定，WebGL可以为H5canvas提供硬件3D加速渲染，无需任何浏览器插件支持。

##### cookies，sessionStorage 和 localStorage
https://www.cnblogs.com/pengc/p/8714475.html
1. cookie保存在浏览器端，session保存在服务器端.
cookie机制：如果不在浏览器中设置过期时间，cookie被保存在内存中，生命周期随浏览器的关闭而结束，这种cookie简称会话cookie。如果在浏览器中设置了cookie的过期时间，cookie被保存在硬盘中，关闭浏览器后，cookie数据仍然存在，直到过期时间结束才消失
session机制：当服务器收到请求需要创建session对象时，首先会检查客户端请求中是否包含sessionid。如果有sessionid，服务器将根据该id返回对应session对象。如果客户端请求中没有sessionid，服务器会创建新的session对象，并把sessionid在本次响应中返回给客户端。通常使用cookie方式存储sessionid到客户端，在交互中浏览器按照规则将sessionid发送给服务器。如果用户禁用cookie，则要使用URL重写，可以通过response.encodeURL(url) 进行实现；API对encodeURL的结束为，当浏览器支持Cookie时，url不做任何处理；当浏览器不支持Cookie的时候，将会重写URL将SessionID拼接到访问地址后。
存储内容：cookie只能保存字符串类型，以文本的方式；session通过类似与Hashtable的数据结构来保存，能支持任何类型的对象(session中可含有多个对象)



##### HTML全局属性(global attribute)有哪些
class, id, tabindex, style, title, draggable, data-*

##### link 和 @import的区别
差别1：老祖宗的差别，link属于XHTML标签，而@import完全是css提供的一种方式。

　　　　link标签除了可以加载css外，还可以做很多其他的事情，比如定义RSS，定义rel连接属性等，@import只能加载CSS。

差别2：加载顺序的差别：当一个页面被夹在的时候（就是被浏览者浏览的时候），link引用的CSS会同时被加载，而@import引用的CSS会等到页面全部被下载完再加载。所以有时候浏览@import加载CSS的页面时会没有样式（就是闪烁），网速慢的时候还挺明显。

差别3：兼容性的差别。由于@import是CSS2.1提出的所以老的浏览器不支持，@import只有在IE5以上的才能识别，而link标签无此问题，完全兼容。

差别4：使用dom控制样式时的差别。当时用JavaScript控制dom去改变样式的时候，只能使用link标签，因为@import不是dom可以控制的（不支持）。

差别5（不推荐）：@import可以在css中再次引入其他样式表，比如创建一个主样式表，在主样式表中再引入其他的样式表，



##### `<b>`和`<strong>`的区别
`<b>`这个标签对应bold，即文本加粗，其目的仅仅是为了加粗显示文本，是一种样式／风格需求；
`<strong>`这个标签意思是加强，表示该文本比较重要，提醒读者／终端注意。为了达到这个目的，浏览器等终端将其加粗显示；
总结：`<b>`为了加粗而加粗，`<strong>`为了标明重点而加粗。是语义上的区别
-----