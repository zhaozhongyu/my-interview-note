## 
### 共同点
1. 都是基于组件的架构
2. 都使用虚拟dom
3. 都是单向数据流


### 区别
0. vue本质上是mvvm框架. react是前端组件化框架.
1. vue使用模板语法定义html, React使用jsx语法生成html. 因为这两点选型上的区别, 在vue模板中增加了类似v-for, v-if这样的特定语法, 而在react中可以直接使用原生js来实现html的生成.
2. vue有双向绑定语法糖, 可以直接通过赋值的方式进行值变更. React强调数据的不可变性, 使用setState的方式进行变更.
3. React可以直接使用高阶组件, vue由于实现了mixin的方法, 对原组件存在侵入性, 所以在使用高阶组件的时候, 会出现额外的问题.
4. 社区上相对而言react的社区生态比较好. react没有一个官方的状态库, 多数人使用了社区的redux, 而vue有一个官方提供的vuex库, 没有社区的状态库. 
5. 组件通信上, vue在父子通信时将props和event传给子组件, 子组件通过提交event的方式触发父组件回调. 而react将props和callback传给子组件, 子组件通过执行callback的方式回调. 另外react还可以直接在`props`内传递jsx, 而vue需要通过`slots`的方式实现对应的功能.