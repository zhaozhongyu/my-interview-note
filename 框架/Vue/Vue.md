面试题 -- √

1. [Vue的生命周期。](#vue的生命周期)
2. [Created和beforeMount他们两之间有什么区别](#Create和beforeMount他们两之间有什么区别)
3. [Vue组件通信](#vue组件通信)
4. v-if和v-show的区别以及使用场景。
5. nextTick的使用场景和作用。
6. Vue中的key有什么作用。
7. 计算属性和watch的区别。

* vue 生命周期，每个生命周期项目中什么时候会用
* vue keep-alive 常用属性
* 组件通信方式
* hash 和 history 区别
* v-for 唯一 key
* vue 运行机制，依赖收集
* v-show 和 v-if
* watch 和 computed
* vuex 中模块拆分怎么做的
* 一个页面有父子组件，进入之后的渲染顺序触发的生命周期是什么样的
* keep-alive，如果只想要router-view里面的某个组件被缓存，怎么做
* 组件通信中的eventbus原理是什么
* vue diff简单讲讲
* 3.0proxy 讲讲，和 2.0 区别（广度）
* data为什么是函数
* 常用vue api原理(包括不限于nextTick,watch，computed)

---

##### <p id="vue的生命周期">Vue的生命周期</p>
* new Vue()，初始化事件和生命周期
* beforeCreate（$el和data都是undefined）
* 初始化数据和方法（data和props的响应式处理，mehods方法声明）
* created（$el是undefined，修改data不触发update）
* 判断有没有el项（vm.$mount(el)），判断有没有模板(没有将el外层的HTML当模板)，将模板编译成渲染函数，返回虚拟DOM
* beforeMounted（$el是虚拟DOM，修改data不触发update）
* 创建正式DOM替换虚拟DOM，挂载到页面指定容器显示
* mounted（可操作真实DOM）
* 数据变更
* beforeUpdate
* 重新渲染虚拟DOM并通过DIFF算法比较差异更新真实DOM
* updated
* 调用vm.$destory()
* beforeDestory（清理计时器、事件）
* 移除数据监听、事件监听和子组件
* destoryed（实例不可用）

keep-alive生命周期

被keep-alive包裹的组件有 `activated` 和 `deactivated` 两个生命周期。如`<keep-alive>`包裹两个组件：组件A和组件B。当第一次切换到组件A时，组件A的created和activated生命周期函数都会被执行，切换到组件B，这时组件A的deactivated的生命周期函数会被触发；在切换回组件A，组件A的activated生命周期函数会被触发，但是它的created生命周期函数不会被触发了。

##### <p id="Create和beforeMount他们两之间有什么区别">Create和beforeMount他们两之间有什么区别</p>
  对于在new Vue时设置了`el`参数的情况来说, 基本没有区别, Vue会在`created`完成后, 立刻进入`$mount`阶段, 而在$mount阶段时, 对于未预编译过的代码, 此时会进入编译阶段(但这时候对用户并无区别), 对于已经预编译过的代码, 此时会直接进入真正的$mount阶段, 此时就会触发beforeMount, 所以答案是, 如果使用的是手动的vue.$mount时, 可以在new Vue后, $mount之前执行一些自定义的初始化操作.

#### <p id="vue组件通信">vue组件通信</p>
父子间通信:父亲提供数据通过属性 props传给儿子；儿子通过 $on 绑父亲的事件，再通过 $emit 触发自己的事件（发布订阅）
利用父子关系 $parent 、$children
父组件提供数据，子组件注入。 provide 、 inject ，插件用得多。
ref 获取组件实例，调用组件的属性、方法
vuex 状态管理实现通信
祖孙节点可以使用: $attrs/$listeners

##### v-if和v-show的区别以及使用场景。
区别
v-if是删除生成dom,v-show是切换dispaly的状态。
使用场景

v-if
某一块代码在运行时条件很少改变，使用 v-if 较好 (v-if 有更高的切换开销)
在组件上使用v-if可触发组件的生命周期函数
与transition结合使用 当条件变化时该指令可以触发过渡效果(用于动画切换)
v-show
需要非常频繁地切换某块代码，使用 v-show渲染
当条件变化时该指令触发过渡效果(用于动画切换)

##### nextTick的使用场景和作用
使用场景
例：一个子组件通过v-if控制隐藏显示`<t v-if='show'><t/>`，当修改完显示状态后，立马通过ref去操作子组件的方法，这个时候会报错，原因在于子组件此时可能还未渲染完成，这个时候使用nextTick可以解决，他会在dom更新完成之后再去调用。
作用
在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。

##### vue中的key有什么作用。
* key会用在虚拟DOM算法（diff算法）中，用来辨别新旧节点。
* 不带key的时候会最大限度减少元素的变动，尽可能用相同元素。（就地复用）
* 带key的时候，会基于相同的key来进行排列。（相同的复用）
* 带key还能触发过渡效果，以及触发组件的生命周期

##### 计算属性和watch的区别。
* 处理数据的场景不同，监听器(watch)适合一个数据影响多个数据，计算属性适合一个数据受多个数据影响, watch方法不支持同时watch多个变量的组合
* 计算属性有缓存性，当一个值发生变化触发getter的时候, 不会立即进行计算而是设置dirty为true, 在下一次被使用时进行计算, 而watch会执行计算
* 监听器选项提供了更通用的方法，适合执行异步操作或较大开销操作的情况
* 如果一个getter方法没有其他的地方引用的话, 则这个getter方法不会被实际执行, watch方法则是监听到变动后执行. getter会在下一次引用使用时进行计算.

##### 父子组件生命周期
加载渲染过程
`父beforeCreate->父created->父beforeMount->子beforeCreate->子created->子beforeMount->子mounted->父mounted`
子组件更新过程
`父beforeUpdate->子beforeUpdate->子updated->父updated`
父组件更新过程
`父beforeUpdate->父updated`
销毁过程
`父beforeDestroy->子beforeDestroy->子destroyed->父destroyed`
---

##### hash和history区别
1. hash就是指url尾巴后的#号以及后面的字符, 此时不会导致浏览器请求. 并且可以触发hashchange事件. 浏览器的进后退也能对其进行控制，所以人们在html5的history出现前，基本都是使用hash来实现前端路由的。他的特点在于：hash虽然出现url中，但不会被包含在HTTP请求中，对后端完全没有影响，因此改变hash不会重新加载页面。hash 本来是拿来做页面定位的，如果拿来做路由的话，原来的锚点功能就不能用了。其次，hash的而传参是基于url的，如果要传递复杂的数据，会有体积的限制
2. history模式不仅可以在url里放参数，还可以将数据存放在一个特定的对象中。
history———利用了HTML5 History Interface 中新增的pushState（）和replaceState（）方法。（需要特定浏览器的支持）history不能运用与IE8以下
```
window.history.pushState(state,title,url)
//state：需要保存的数据，这个数据在触发popstate事件时，可以在event.state里获取
//title：标题，基本没用，一般传null
//url：设定新的历史纪录的url。新的url与当前url的origin必须是一样的，否则会抛出错误。url可以时绝对路径，也可以是相对路径。
//如 当前url是 https://www.baidu.com/a/,执行history.pushState(null, null, './qq/')，则变成 https://www.baidu.com/a/qq/，
//执行history.pushState(null, null, '/qq/')，则变成 https://www.baidu.com/qq/

window.history.replaceState(state,title,url)
//与pushState 基本相同，但她是修改当前历史纪录，而 pushState 是创建新的历史纪录

window.addEventListener("pospstate",function(){
 //监听浏览器前进后退事件，pushState与replaceState方法不会触发
})
window.history.back()//后退
window.history.forward()//前进
window.history.go(1)//前进一部，-2回退两不，window.history.lengthk可以查看当前历史堆栈中页面的数量
```
3. 1、hash模式s下，仅hash符号之前的内容会被包含在请求中，如 http://www.abc.com 因此对于后端来说，即使没有做到对路由的全覆盖，也不会返回404错误；
2、history模式下，前端的url必须和实际后端发起请求的url一致，如http://www.abc.com/book/id 。如果后端缺少对/book/id 的路由处理，将返回404错误。


#### `Vue`中`hash`模式和`history`模式的区别?

最明显的是在显示上，`hash`模式的`URL`中会夹杂着`#`号，而history没有。

`Vue`底层对它们的实现方式不同。hash模式是依靠`onhashchange`事件(监听`location.hash`的改变)，而`history`模式是主要是依靠的`HTML5 history`中新增的两个方法，`pushState()`可以改变url地址且不会发送请求，`replaceState()`可以读取历史记录栈,还可以对浏览器记录进行修改。

当真正需要通过`URL`向后端发送HTTP请求的时候，比如常见的用户手动输入`URL`后回车，或者是刷新(重启)浏览器，这时候`history`模式需要后端的支持。

因为`history`模式下，前端的`URL`必须和实际向后端发送请求的URL一致，例如有一个`URL`是带有路径`path`的(例如`www.lindaidai.wang/blogs/id`)，如果后端没有对这个路径做处理的话，就会返回`404`错误。所以需要后端增加一个覆盖所有情况的候选资源，一般会配合前端给出的一个`404`页面。

hash:
```js
window.onhashchange = function(event){
  // location.hash获取到的是包括#号的，如"#heading-3"
  // 所以可以截取一下
  let hash = location.hash.slice(1);
}
```

#### `new Vue()` 发生了什么？
1）`new Vue()`是创建`Vue`实例，它内部执行了根实例的初始化过程。

2）具体包括以下操作：
* 选项合并
* `$children`，`$refs`，`$slots`，`$createElement`等实例属性的方法初始化
* 自定义事件处理
* 数据响应式处理
* 生命周期钩子调用 （`beforecreate created`）
* 可能的挂载

### 总结：

`new Vue()`创建了根实例并准备好数据和方法，未来执行挂载时，此过程还会递归的应用于它的子组件上，最终形成一个有紧密关系的组件实例树。

#### 38.`keep-alive`平时在哪里使用？原理是？
### 核心答案：
keep-alive 主要是组件缓存，采用的是LRU算法。最近最久未使用法。

常用的两个属性include/exclude，允许组件有条件的进行缓存。

两个生命周期activated/deactivated，用来得知当前组件是否处于活跃状态。

#### 53.对`MVC （react）` `MVVM（vue）`的了解?
### 标签  腾讯  阿里  西门子

### 什么是MVC
* `M（modal）`：是应用程序中处理数据逻辑的部分。
* `V （view）`  ：是应用程序中数据显示的部分。
* `C（controller）`：是应用程序中处理用户交互的地方

### 什么是MVVM
* M（modal）：模型，定义数据结构。
* C（controller）：实现业务逻辑，数据的增删改查。在MVVM模式中一般把C层算在M层中，（只有在理想的双向绑定模式下，Controller 才会完全的消失。这种理想状态一般不存在）。
* VM（viewModal）：视图View的模型、映射和显示逻辑（如if for等，非业务逻辑），另外绑定器也在此层。ViewModel是基于视图开发的一套模型，如果你的应用是给盲人用的，那么也可以开发一套基于Audio的模型AudioModel。
* V（view） ：将ViewModel通过特定的GUI展示出来，并在GUI控件上绑定视图交互事件，V(iew)一般由MVVM框架自动生成在浏览器中。

### Vue-router钩子函数
##### 完整的导航解析流程
1. 导航被触发。
2. 在失活的组件里调用 `beforeRouteLeave` 守卫。
3. 调用全局的 `beforeEach` 守卫。
4. 在重用的组件里调用 `beforeRouteUpdate` 守卫 (2.2+)。
5. 在路由配置里调用 `beforeEnter`。
6. 解析异步路由组件。
7. 在被激活的组件里调用 `beforeRouteEnter`。
8. 调用全局的 `beforeResolve` 守卫 (2.5+)。
9. 导航被确认。
10. 调用全局的 `afterEach` 钩子。
11. 触发 DOM 更新。
12. 调用 `beforeRouteEnter` 守卫中传给 next 的回调函数，创建好的组件实例会作为回调函数的参数传入。

### 渐进式框架
1、vue.js只提供了vue-cli生态中最核心的组件系统和双向数据绑定, 可以只用它的一部分而非全部.
2、就好像 vuex、vue-router都属于围绕vue.js开发的库

### delete 和 Vue.delete的区别
1. delete在删除数组属性时, 会把数组对应位置的值变为empty: undefined, 此时数组长度不变. 
2. Vue.delete 使用的是splice方法, 此时会改变数组长度.
3. delete 对象时, 不会触发响应式.