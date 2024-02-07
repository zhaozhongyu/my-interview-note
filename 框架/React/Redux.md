## 了解redux吗？
redux 是一个应用数据流框架，主要解决了组件之间状态共享问题，原理是集中式管理，主要有三个核心方法：action store reduce

工作流程
view 调用store的dispatch 接受action传入的store，reduce进行state操作
view通过store提供的getState获取最新的数据

redux的优点：
新增的state 对状态的管理更加明确
流程更加规范，减少手动编写代码，提高编码效率

redux的缺点：
当数据更新是有时候组件不需要，也要重新绘制，影响效率

