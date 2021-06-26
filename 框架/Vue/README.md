面试题

1. [Vue的生命周期。](#vue的生命周期)
2. [Created和beforeMount他们两之间有什么区别](#Create和beforeMount他们两之间有什么区别)
3. [Vue组件通信](#vue组件通信)
4. v-if和v-show的区别以及使用场景。
5. nextTick的使用场景和作用。
6. Vue中的key有什么作用。
7. 计算属性和watch的区别。




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
利用父子关系 $parent 、 $children ，
父组件提供数据，子组件注入。 provide 、 inject ，插件用得多。
ref 获取组件实例，调用组件的属性、方法
vuex 状态管理实现通信

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


---