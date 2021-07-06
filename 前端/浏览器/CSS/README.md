## 面试题目之CSS
1. 解释一下CSS的盒子模型？
2. 请你说说CSS选择器的类型有哪些，并举几个例子说明其用法？
3. 请你说说CSS有什么特殊性?（优先级、计算特殊值）
4. 要动态改变层中内容可以使用的方法？ innerHTML/innerText改变内容, 然后设置display属性
5. 常见浏览器兼容性问题与解决方案？ xxx
6. 列出display的值并说明他们的作用？  none/block/inline/inline-block/`flex`/table等
7. 如何居中div, 如何居中一个浮动元素?
8. CSS中 link 和@import 的区别是？
9. 请列举几种清除浮动的方法(至少两种)? overflow属性在父元素中设置`overflow: hidden;`, 使用after伪元素清除浮动
10. block，inline和inline-block细节对比？ inline-block: 对象呈现为inline对象，但是对象的内容作为block对象呈现
11. 什么叫优雅降级和渐进增强？
12. 说说浮动元素会引起的问题和你的解决办法
13. 你有哪些性能优化的方法？
14. 为什么要初始化CSS样式？
15. 解释下浮动和它的工作原理？清除浮动的技巧
16. 介绍CSS
17. CSS选择器有哪些
18. 盒子模型，以及标准情况和IE下的区别
19. 介绍position属性；介绍CSS3中position:sticky: 基于用户的滚动位置来定位
20. 介绍定位问题（绝对定位，相对定位等）
21. 两个元素块，一左一右，中间相距10px
22. 如何清除浮动
23. 介绍flex；rem和flex的区别
24. 移动端适配1px的问题
25. em和px的区别
26. 对动画的了解
27. 居中为什么要是用transform（不用marginLeft/Top）；transform动画和直接使用left、top改变位置有什么优缺点
28. 如何实现div垂直水平居中；其他方式设置垂直居中
29. 上下固定，中间滚动布局如何实现
30. 如何实现高度自适应

## [css题目](https://juejin.cn/post/6936913689115099143)


## 盒模型
W3C组织建议把所有网页上的对像都放在一个盒(box)中，设计师可以通过创建定义来控制这个盒的属性，这些对像包括段落、列表、标题、图片以及层。盒模型主要定义四个区域：内容(content)、内边距(padding)、边框(border)和外边距(margin)。
```
margin：层的边框以外留的空白
background-color：背景颜色
background-image：背景图片
padding：层的边框到层的内容之间的空白    padding中会显示背景
border：边框 
content：内容
```
1、margin: 包括margin-top、margin-right、margin-bottom、margin-left，控制块级元素之间的距离，它们是透明不可见的。
2、Padding: 包括padding-top、padding-right、padding-bottom、padding-left，控制块级元素内部，content与border之间的距离
注: 当你想让两个元素的content在垂直方向(vertically)分隔时，既可以选择padding-top/bottom，也可以选择margin-top/bottom，再此Ruthless建议你尽量使用padding-top/bottom来达到你的目的，这是因为css中存在Collapsing margins(折叠的margins)的现象。

Collapsing margins: margins折叠现象只存在于临近或有从属关系的元素，垂直方向的margin中。

!!! 重点: 一个元素的padding 如果使用百分比,不论上下左右,都是依照其父盒子的宽度设定; !!! 利用这个特性, 可以实现宽高的比例问题
* 当margin设置为auto的时候, 如果设置了明确的宽高, 则会自动在各个方位都设置统一的边距, 然后出现居中.
* 


### display: flex的常用属性
0. flex-direction: 指定对齐轴, 默认为row
1. justify-content: 设置盒子元素在横轴上的对齐方式
2. align-items: 定义flex子项在flex容器的当前行的侧轴（纵轴）方向上的对齐方式。
3. align-content: 定义内容对齐, 在弹性容器内的各项没有占用交叉轴上所有可用的空间时对齐容器内的各项（垂直）
4. flex-wrap 是否换行


### 了解一下自适应的方案. https://zhuanlan.zhihu.com/p/109804081
1）非浮动元素的父元素高度自适应

实现方法：

1、不设置高度，或者高度设置成 ： height:auto；

2、通过最小高度实现高度自适应 ： min-height:300px;_height:300px;

3、给需要高度自适应的元素添加这些属性：

min-height:value; height:auto !important;height:value;

### div垂直水平居中
1. 绝对定位方法：不确定当前div的宽度和高度，采用 transform: translate(-50%,-50%); 当前div的父级添加相对定位（position: relative;）
2. 绝对定位方法：确定了当前div的宽度，margin值为当前div宽度一半的负值
3. flex布局方法：当前div的父级添加flex css样式
4. 绝对定位：calc() 函数动态计算实现水平垂直居中