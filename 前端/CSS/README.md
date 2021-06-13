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
