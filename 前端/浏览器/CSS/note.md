### css题目
9. 生成一条0.5px的线。✔
8. 子元素上下左右居中。
10. 自适应方案。
11. rem和rm的区别。✔
12. vw和百分比有什么区别。✔
* 什么是BFC?

-----
#####  生成一条0.5px的线。
1. 通过transform, box-shadow,svg生成

##### rem和rm的区别。
rem是相对于根元素字体大小
em是相对于自身字体大小

##### vw和百分比有什么区别
百分比是相对高度，相对于他的父元素而言。
vw永远都是相对于视窗大小的。

##### 什么是BFC?
BFC(Block formatting context)直译为"块级格式化上下文"。
具有 BFC 特性的元素可以看作是隔离了的独立容器，容器里面的元素不会在布局上影响到外面的元素，并且 BFC 具有普通容器所没有的一些特性。
通俗一点来讲，可以把 BFC 理解为一个封闭的大箱子，箱子内部的元素无论如何翻江倒海，都不会影响到外部。
只要元素满足下面任一条件即可触发 BFC 特性：

* body 根元素
* 浮动元素：float 除 none 以外的值
* 绝对定位元素：position (absolute、fixed)
* display 为 inline-block、table-cells、flex
* overflow 除了 visible 以外的值 (hidden、auto、scroll)

BFC的布局规则
内部的Box会在垂直方向，一个接一个地放置。

Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠。

每个盒子（块盒与行盒）的margin box的左边，与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。

BFC的区域不会与float box重叠。

BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。

计算BFC的高度时，浮动元素也参与计算。


-----