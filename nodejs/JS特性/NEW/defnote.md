### new
new 操作符可以帮助我们构建出一个实例，并且绑定上 this，内部执行步骤可大概分为以下几步：

1. 新生成了一个对象
2. 对象连接到构造函数原型上，并绑定 this
3. 执行构造函数代码
4. 返回新对象

在第四步返回新对象这边有一个情况会例外：

```
function Test(name) {
  this.name = name
  console.log(this) // Test { name: 'yck' }
  return { age: 26 }
}
const t = new Test('yck')
console.log(t) // { age: 26 }
console.log(t.name) // 'undefined'
```
当在构造函数中返回一个对象时，内部创建出来的新对象就被我们返回的对象所覆盖，所以一般来说构建函数就别返回对象了（返回原始类型不影响）。
常见考点

* new 做了那些事？
* new 返回不同的类型时会有什么表现？
* 手写 new 的实现过程