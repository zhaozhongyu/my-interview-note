## 
## vue和react的区别，有什么相同

**不同：**
-   模版语法不同，`react`采用JSX语法，`vue`使用基于HTML的模版语法
-   数据绑定不同，`vue` 使用双向数据绑定，`react` 则需要手动控制组件的状态和属性。
-   组件通信不同，`vue`使用`props`和事件的方式进行父子组件通信，`react`则通过`props`和回调函数的方式进行通信。
-   生命周期不同，`vue`有8个生命周期钩子
-   实现原理不同，`vue`使用双向绑定来实现数据更新，`react`则通过单向数据流来实现

最大的不同是: react更像是一个纯js库, vue可以作为渐进增强的方式接入.

**相同**：

-   **组件化开发**：`Vue` 和 `React` 都采用了组件化开发的方式，将用户界面划分为独立、可复用的组件，从而使代码更加模块化、可维护和可扩展。
-   **虚拟 DOM**：`Vue` 和 `React` 都使用虚拟 DOM 技术，通过在 `JavaScript` 和真实 DOM 之间建立一个轻量级的虚拟 DOM 层，实现高效的 DOM 更新和渲染。
-   **响应更新**：`Vue` 和 `React` 都支持响应式更新，即当数据发生变化时，会自动更新相关的组件和视图，以保持用户界面的同步性。
-   **集成能力**：`Vue` 和 `React` 都具有良好的集成能力，可以与其他库和框架进行整合，例如 `Vue` 可以与 `Vuex`、`Vue Router` 等配套使用，`React` 可以与 `Redux`、`React Router` 等配套使用。
### 共同点
1. 都是基于组件的架构
2. 都使用虚拟dom
3. 都是单向数据流


### 区别
0. vue本质上是`mvvm`框架. react是`MVC`框架.
1. vue使用模板语法定义html, React使用jsx语法生成html. 因为这两点选型上的区别, 在vue模板中增加了类似v-for, v-if这样的特定语法, 而在react中可以直接使用原生js来实现html的生成.
2. vue有双向绑定语法糖, 可以直接通过赋值的方式进行值变更. React强调数据的不可变性, 使用setState的方式进行变更.
3. React可以直接使用高阶组件, vue由于实现了mixin的方法, 对原组件存在侵入性, 所以在使用高阶组件的时候, 会出现额外的问题.
4. 社区上相对而言react的社区生态比较好. react没有一个官方的状态库, 多数人使用了社区的redux, 而vue有一个官方提供的vuex库, 没有社区的状态库. 
5. 组件通信上, vue在父子通信时将props和event传给子组件, 子组件通过提交event的方式触发父组件回调. 而react将props和callback传给子组件, 子组件通过执行callback的方式回调. 另外react还可以直接在`props`内传递jsx, 而vue需要通过`slots`的方式实现对应的功能.



`react`和`vue`的区别

#### 相同点

* 数据驱动页面提供响应式的试图组件
* 都有`virtual DOM`,组件化的开发通过`props`参数进行父子之间组件传递数据都实现了`webComponents`规范
* 数据流动单向都支持服务器的渲染SSR
* 都有支持`native`的方法`react`有`React native`, `vue`有`wexx`

#### 不同点

* 数据绑定`Vue`实现了双向的数据绑定, `react`数据流动是单向的
* 数据渲染大规模的数据渲染`react`更快
* 使用场景`React`配合`Redux`架构适合大规模多人协作复杂项目, Vue适合小快的项目
* 开发风格`react`推荐做法`jsx` + `inline style`把`html`和`css`都写在`js`了
* `vue`是采用`webpack` +`vue-loader`单文件组件格式`html`, `js`, `css`同一个文件