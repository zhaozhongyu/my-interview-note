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
* display 为 inline-block、table-cell/table-caption、flex/inline-flex, grid/inline-grid, flow-root
* overflow 除了 visible 以外的值 (hidden、auto、scroll)
* contain 值为 layout、content 或 paint
`display: flow-root`: 可以创建无副作用的 BFC

BFC的布局规则
内部的Box会在垂直方向，一个接一个地放置。

Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠。

每个盒子（块盒与行盒）的margin box的左边，与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。

BFC的区域不会与float box重叠。

BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。

!!计算BFC的高度时，浮动元素也参与计算。

BFC可以解决浮动塌陷, 外边距折叠问题. 


#### 浮动 https://www.w3school.com.cn/css/css_positioning_floating.asp
浮动元素 会脱离正常的文档布局流，并吸附到其父容器的左边。在正常布局中位于该浮动元素之下的内容，此时会围绕着浮动元素，填满其右侧的空间。
注意浮动内容仍然遵循盒子模型诸如外边距和边界。我们设置一下图片右侧的外边距就能阻止右侧的文字紧贴着图片。

浮动的框可以向左或向右移动，直到它的外边缘碰到包含框或另一个浮动框的边框为止。

由于浮动框不在文档的普通流中，所以文档的普通流中的块框表现得就像浮动框不存在一样。

#### 浮动塌陷
当我们给子元素设置了浮动float:left或float:right或两者，但是没有给父元素设置高度时，父元素的高度是由子元素内容撑开, 因为子元素都脱离了文档流, 因此就会出现父元素高度塌陷问题.
导致:
1、背景不能显示
由于浮动产生，如果对父级设置了（CSS background背景）CSS背景颜色或> CSS背景图片，而父级不能被撑开，所以导致CSS背景不能显示。
2、边框不能撑开
如果父级设置了CSS边框属性（css border），由于子级里使用了float属性，> 产生浮动，父级不能被撑开，导致边框不能随内容而被撑开。
3、margin padding设置值不能正确显示
由于浮动导致父级子级之间设置了css padding、css margin属性的值不能正> > 确表达。特别是上下边的padding和margin不能正确显示。

解决办法:
1. 添加一个`clear: both;`元素
2. 设置父元素属性, 触发`bfc`
3. 在父元素后面使用伪元素:after, 设置`clear: both;`

#### 外边距折叠
https://juejin.cn/post/6844904193833041934
两个或者多个普通流中相邻盒子的边距在垂直方向上会发生折叠的这种现象叫做外边距折叠。外边距折叠分为父子外边距折叠及兄弟外边距折叠。
触发条件
1. 都是普通流中的元素且属于同一个 BFC
2. 没有被 padding、border、clear 或非空内容隔开
3. 两个或两个以上垂直方向的「相邻元素」

#### flex布局 https://www.ruanyifeng.com/blog/2015/07/flex-grammar.html
设为 Flex 布局以后，子元素的`float`、`clear`和`vertical-align`属性将失效

采用 Flex 布局的元素，称为 Flex 容器（flex container），简称"容器"。它的所有子元素自动成为容器成员，称为 Flex 项目（flex item），简称"项目"。
容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）。主轴的开始位置（与边框的交叉点）叫做main start，结束位置叫做main end；交叉轴的开始位置叫做cross start，结束位置叫做cross end。

项目默认沿主轴排列。单个项目占据的主轴空间叫做main size，占据的交叉轴空间叫做cross size
以下6个属性设置在容器上。
* `flex-direction` 属性决定主轴的方向（即项目的排列方向）: `row | row-reverse | column | column-reverse`
* `flex-wrap` 如果一条轴线排不下，如何换行 : `nowrap | wrap | wrap-reverse`
* `flex-flow` 是`flex-direction`属性和`flex-wrap`属性的简写形式，默认值为row nowrap
* `justify-content` 定义了项目在主轴上的对齐方式  `flex-start | flex-end | center | space-between | space-around;`
* `align-items` 定义项目在交叉轴上如何对齐 `flex-start | flex-end | center | baseline | stretch;`
* `align-content` 定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用 `flex-start | flex-end | center | space-between | space-around | stretch`

以下6个属性设置在项目上。
* `order` 定义项目的排列顺序。数值越小，排列越靠前，默认为0
* `flex-grow` 定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大, 如果所有项目的flex-grow属性都为1，则它们将等分剩余空间（如果有的话）。如果一个项目的flex-grow属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。
* `flex-shrink` 定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。如果所有项目的flex-shrink属性都为1，当空间不足时，都将等比例缩小。如果一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小。负值对该属性无效
* `flex-basis` 定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。
* `flex` 属性是`flex-grow`, `flex-shrink` 和 `flex-basis`的简写，默认值为0 1 auto。后两个属性可选
* `align-self` align-self属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch

### 选择器优先级
优先级就是分配给指定的 CSS 声明的一个权重，它由 匹配的选择器中的 每一种选择器类型的 数值 决定。
而当优先级与多个 CSS 声明中任意一个声明的优先级相等的时候，CSS 中最后的那个声明将会被应用到元素上。

1. 类型选择器（例如，h1）和伪元素（例如，::before）
2. 类选择器 (例如，.example)，属性选择器（例如，[type="radio"]）和伪类（例如，:hover）
3. ID 选择器（例如，#example）。
4. 内联样式 (例如，style="font-weight:bold") 总会覆盖外部样式表的任何样式
5. !important (可以覆盖内联样式)

内联样式 > ID 选择器 > 类选择器 = 属性选择器 = 伪类选择器 > 标签选择器 = 伪元素选择器
当一个标签同时被多个选择符选中: 计算选择符中 ID 选择器的个数（a），计算选择符中类选择器、属性选择器以及伪类选择器的个数之和（b），计算选择符中标签选择器和伪元素选择器的个数之和（c）。按 a、b、c 的顺序依次比较大小，大的则优先级高，相等则比较下一个。若最后两个的选择符中 a、b、c 都相等，则按照"就近原则"来判断。
-----