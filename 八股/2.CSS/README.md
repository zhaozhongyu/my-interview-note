
## CSS3新增特性
新增CSS选择器、伪类
特效：text-shadow、box-shadow
线性渐变: gradient
旋转过渡：transform、transtion
动画: animation
圆角: border-radius

## 选择器优先级
!important, 内联样式, id选择器, 类选择器/伪类/属性选择器, 标签选择器/伪元素选择器, 关系选择器, 通配符选择器.

## flex和grid
### flex布局理解, 自适应布局
`flex`布局是`CSS3`新增的一种布局方式，能够根据不同屏幕尺寸的变化来自适应大小。

常用的属性：
-   `flex-direction`属性决定主轴的方向（即项目的排列方向）。
-   `flex-wrap`属性定义，如果一条轴线排不下，如何换行。
-   `flex-flow`属性是`flex-direction`属性和`flex-wrap`属性的简写形式，默认值为`row nowrap`。
-   `justify-conten`t属性定义了项目在主轴上的对齐方式。
-   `align-items`属性定义项目在交叉轴上如何对齐。
-   `align-content`属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。

### grid布局, 网格布局
它将网页划分成一个个网格，可以任意组合不同的网格，做出各种各样的布局。

Flex 布局是轴线布局，只能指定"项目"针对轴线的位置，可以看作是一维布局。Grid 布局则是将容器划分成"行"和"列"，产生单元格，然后指定"项目所在"的单元格，可以看作是二维布局。

行和列的交叉区域，称为"单元格". 划分网格的线，称为"网格线"（grid line）。水平网格线划分出行，垂直网格线划分出列。
正常情况下，n行有n + 1根水平网格线，m列有m + 1根垂直网格线，比如三行就有四根水平网格线。
默认情况下，容器元素都是块级元素，但也可以设成行内元素。

常用的属性:
- `grid-template-columns` 属性定义每一列的列宽, 可以使用绝对单位, 也可以使用百分比, 可以使用`repeat()`
- `grid-template-rows` 属性定义每一行的行高
- `grid-row-gap` 属性
- `grid-column-gap` 属性，
- `grid-gap` 属性

`auto-fill`关键字: 每一行（或每一列）容纳尽可能多的单元格
`fr` 关键字: 为了方便表示比例关系，网格布局提供了fr关键字（fraction 的缩写，意为"片段"）。如果两列的宽度分别为1fr和2fr，就表示后者是前者的两倍。
`minmax()`: minmax()函数产生一个长度范围，表示长度就在这个范围之中。它接受两个参数，分别为最小值和最大值。



## 对BFC的理解，如何创建BFC
**BFC是块级格式上下文**（Block Formatting Context，BFC），是CSS布局的一个概念，在BFC布局里面的元素不受外面元素影响。

**创建BFC条件**

-   设置浮动：`float`有值并不为空
-   设置绝对定位：`  position（absolute、fixed） `
-   `overfilow`值为：`hidden`、`auto`、`scroll`
-   `display`值为：`inline-block`、`table-cell`、`table-caption`、`flex`等

**BFC作用**：
-   解决`margin`重叠问题：由于BFC是一个独立的区域，内部元素和外部元素互不影响，将两个元素变为BFC，就解决了`margin`重叠问题
-   创建自适应两栏布局：可以用来创建自适应两栏布局，左边宽高固定，右边宽度自适应。
-   解决高度塌陷问题：在子元素设置浮动后，父元素会发生高度的塌陷，也就是父元素的高度为0解决这个问题，只需要将父元素变成一个BFC。

## 什么是margin重叠，如何解决
两个块级元素分别设置上下`margin`时可能会导致边距合并为一个边距，合并到边距取最大的那个值。需要注意的是，浮动的元素和绝对定位这种脱离文档流的元素的外边距不会折叠。**重叠只会出现在垂直方向。**

**计算规则**

-   都是正数，取最大的。`20px 40px ---> 40px`
-   一正一负，用正数减去负数后。`20px -50px ---> -30px`
-   都是负数，用0减去两个中绝对值大的那个。`-30px -10px ---> -20px`

**解决方案** 简单来说, 出现塌陷的情况下, 将盒子转换为BFC就可以解决. 
对于重叠的情况，主要有两种：**兄弟之间重叠（margin合并）** 和 **父子之间重叠（margin塌陷）**

-   兄弟之间重叠
    -   底部元素变为行内盒子：`display: inline-block`
    -   底部元素设置浮动：`float`
    -   底部元素的`position`的值为`absolute/fixed`

-   父子之间重叠

    -   父元素加入：`overflow: hidden`
    -   父元素添加透明边框：`border:1px solid transparent`
    -   子元素变为行内盒子：`display: inline-block`
    -   子元素加入浮动属性或定位


## 可继承属性和不可继承属性
#### 可继承
字体相关, 颜色

font-weight
font-size
line-height
cursor
...

#### 不可继承

margin、padding、border
display
background
overflow
width、height
position

## link和@import的区别
`<link rel="stylesheet" href="styles.css">` 是写在html中的, `@import`是写在css文件中的.
* link是HTML提供的标签，不仅可以加载CSS文件，还可以定义RSS、rel连接属性等
* @import是CSS提供等语法规则，只有导入样式表的作用。
* link标签引入的CSS被同时加载，而@import引入的CSS将在页面加载完毕后被加载
* @import是CSS2.1才有的语法，存在兼容性，而link作为HTML标签不存在兼容性问题

## 文本溢出
```css
overflow: hidden; // 溢出隐藏
text-overflow: ellipsis; // 溢出用省略号显示
whtie-space: nowrap; //规定段落中的文本不进行换行
```

多行
```css
overflow: hidden;
text-overflow: ellipsis;     // 溢出用省略号显示
display:-webkit-box;         // 作为弹性伸缩盒子模型显示。
-webkit-box-orient:vertical; // 设置伸缩盒子的子元素排列方式：从上到下垂直排列
-webkit-line-clamp:3;        // 显示的行数
```
