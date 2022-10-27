## prototype
首先来介绍下 `prototype` 属性。这是一个显式原型属性，只有函数才拥有该属性。基本上所有函数都有这个属性，但是也有一个例外
```
let fun = Function.prototype.bind()
let fun1 = new Function('').bind()
```
如果你以上述方法创建一个函数，那么可以发现这个函数是不具有 prototype 属性的。

`prototype` 如何产生的
当我们声明一个函数时，这个属性就被自动创建了。

`function Foo() {}`
并且这个属性的值是一个对象（也就是原型），只有一个属性 `constructor`

`constructor` 对应着构造函数，也就是 `Foo`。

##### `constructor`
`constructor` 是一个公有且不可枚举的属性。一旦我们改变了函数的 `prototype` ，那么新对象就没有这个属性了（当然可以通过原型链取到 constructor）。
那么你肯定也有一个疑问，这个属性到底有什么用呢？其实这个属性可以说是一个历史遗留问题，在大部分情况下是没用的，在我的理解里，我认为他有两个作用：

* 让实例对象知道是什么函数构造了它
* 如果想给某些类库中的构造函数增加一些自定义的方法，就可以通过 `xx.constructor.method` 来扩展

## `_proto_`
这是每个对象都有的隐式原型属性，指向了创建该对象的构造函数的原型。其实这个属性指向了 `[[prototype]]`，但是 `[[prototype]]` 是内部属性，我们并不能访问到，所以使用 `_proto_` 来访问。

因为在 JS 中是没有类的概念的，为了实现类似继承的方式，通过 `_proto_` 将对象和原型联系起来组成原型链，得以让对象可以访问到不属于自己的属性。

##### 实例对象的 `_proto_` 如何产生的
从上图可知，当我们使用 new 操作符时，生成的实例对象拥有了 `_proto_`属性。
```
function Foo() {}
// 这个函数是 Function 的实例对象
// function 就是一个语法糖
// 内部调用了 new Function(...)
```
所以可以说，在 new 的过程中，新对象被添加了 `_proto_` 并且链接到构造函数的原型上。

##### new 的过程
1. 新生成了一个对象
2. 链接到原型
3. 绑定 this
4. 返回新对象

对于实例对象来说，都是通过 new 产生的，无论是 function Foo() 还是 `let a = { b : 1 }` 。

对于创建一个对象来说，更推荐使用字面量的方式创建对象。因为你使用 `new Object()` 的方式创建对象需要通过作用域链一层层找到 Object，但是你使用字面量的方式就没这个问题。

#### Function.proto === Function.prototype
对于对象来说，`xx.__proto__.contrcutor` 是该对象的构造函数，但是在图中我们可以发现 `Function.__proto__ === Function.prototype`，难道这代表着 `Function`自己产生了自己?

答案肯定是否认的，要说明这个问题我们先从 `Object` 说起。

从图中我们可以发现，所有对象都可以通过原型链最终找到 `Object.prototype` ，虽然 `Object.prototype` 也是一个对象，但是这个对象却不是 `Object` 创造的，而是引擎自己创建了 `Object.prototype` 。所以可以这样说，所有实例都是对象，但是对象不一定都是实例。

接下来我们来看 `Function.prototype` 这个特殊的对象，如果你在浏览器将这个对象打印出来，会发现这个对象其实是一个函数。

我们知道函数都是通过 `new Function()` 生成的，难道 `Function.prototype` 也是通过 `new Function()` 产生的吗？答案也是否定的，这个函数也是引擎自己创建的。首先引擎创建了 Object.prototype ，然后创建了 `Function.prototype` ，并且通过 `__proto__` 将两者联系了起来。这里也很好的解释了上面的一个问题，为什么
 `let fun = Function.prototype.bind()` 没有 `prototype` 属性。因为 `Function.prototype` 是引擎创建出来的对象，引擎认为不需要给这个对象添加 `prototype` 属性。

所以我们又可以得出一个结论，不是所有函数都是 new Function() 产生的。

有了 Function.prototype 以后才有了 function Function() ，然后其他的构造函数都是 function Function() 生成的。

现在可以来解释 `Function.__proto__ === Function.prototype` 这个问题了。因为先有的 `Function.prototype` 以后才有的 `function Function()` ，所以也就不存在鸡生蛋蛋生鸡的悖论问题了。对于为什么 `Function.__proto__` 会等于 `Function.prototype` ，个人的理解是：其他所有的构造函数都可以通过原型链找到 `Function.prototype` ，并且 `function Function()` 本质也是一个函数，为了不产生混乱就将 `function Function()` 的 `__proto__` 联系到了 `Function.prototype` 上。

## 总结
* Object 是所有对象的爸爸，所有对象都可以通过 `__proto__` 找到它
* Function 是所有函数的爸爸，所有函数都可以通过 `prototype` 找到它, 谷歌浏览器的`func`的`__proto__`是一个函数
* `Function.prototype` 和 `Object.prototype` 是两个特殊的对象，他们由引擎来创建
* 除了以上两个特殊对象，其他对象都是通过构造器 new 出来的
* 函数的 `prototype` 是一个对象，也就是原型
* 对象的 `__proto__` 指向原型， `__proto__` 将对象和原型连接起来组成了原型链


# 原型

![prototype](https://yck-1254263422.cos.ap-shanghai.myqcloud.com/blog/2019-06-01-042625.png)

每个函数都有 `prototype` 属性，除了 `Function.prototype.bind()`，该属性指向原型。

每个对象都有 `__proto__` 属性，指向了创建该对象的构造函数的原型。其实这个属性指向了 `[[prototype]]`，但是 `[[prototype]]` 是内部属性，我们并不能访问到，所以使用 `_proto_` 来访问。

对象可以通过 `__proto__` 来寻找不属于该对象的属性，`__proto__` 将对象连接起来组成了原型链。

如果你想更进一步的了解原型，可以仔细阅读 [深度解析原型中的各个难点](https://github.com/KieSun/Blog/issues/2)。

# 执行上下文
当执行 JS 代码时，会产生三种执行上下文

- 全局执行上下文
- 函数执行上下文
- eval 执行上下文

每个执行上下文中都有三个重要的属性

- 变量对象（VO），包含变量、函数声明和函数的形参，该属性只能在全局上下文中访问
- 作用域链（JS 采用词法作用域，也就是说变量的作用域是在定义时就决定了）
- this

```js
var a = 10
function foo(i) {
  var b = 20
}
foo()
```

对于上述代码，执行栈中有两个上下文：全局上下文和函数 `foo` 上下文。

```js
stack = [
    globalContext,
    fooContext
]
```

对于全局上下文来说，VO 大概是这样的

```js
globalContext.VO === globe
globalContext.VO = {
    a: undefined,
	foo: <Function>,
}
```

对于函数 `foo` 来说，VO 不能访问，只能访问到活动对象（AO）

```js
fooContext.VO === foo.AO
fooContext.AO {
    i: undefined,
	b: undefined,
    arguments: <>
}
// arguments 是函数独有的对象(箭头函数没有)
// 该对象是一个伪数组，有 `length` 属性且可以通过下标访问元素
// 该对象中的 `callee` 属性代表函数本身
// `caller` 属性代表函数的调用者
```

对于作用域链，可以把它理解成包含自身变量对象和上级变量对象的列表，通过 `[[Scope]]` 属性查找上级变量

```js
fooContext.[[Scope]] = [
    globalContext.VO
]
fooContext.Scope = fooContext.[[Scope]] + fooContext.VO
fooContext.Scope = [
    fooContext.VO,
    globalContext.VO
]
```

接下来让我们看一个老生常谈的例子，`var`

```js
b() // call b
console.log(a) // undefined

var a = 'Hello world'

function b() {
	console.log('call b')
}
```

想必以上的输出大家肯定都已经明白了，这是因为函数和变量提升的原因。通常提升的解释是说将声明的代码移动到了顶部，这其实没有什么错误，便于大家理解。但是更准确的解释应该是：在生成执行上下文时，会有两个阶段。第一个阶段是创建的阶段（具体步骤是创建 VO），JS 解释器会找出需要提升的变量和函数，并且给他们提前在内存中开辟好空间，函数的话会将整个函数存入内存中，变量只声明并且赋值为 undefined，所以在第二个阶段，也就是代码执行阶段，我们可以直接提前使用。

在提升的过程中，相同的函数会覆盖上一个函数，并且函数优先于变量提升

```js
b() // call b second

function b() {
	console.log('call b fist')
}
function b() {
	console.log('call b second')
}
var b = 'Hello world'
```

`var` 会产生很多错误，所以在 ES6中引入了 `let`。`let` 不能在声明前使用，但是这并不是常说的 `let` 不会提升，`let` 提升了声明但没有赋值，因为临时死区导致了并不能在声明前使用。

对于非匿名的立即执行函数需要注意以下一点

```js
var foo = 1
(function foo() {
    foo = 10
    console.log(foo)
}()) // -> ƒ foo() { foo = 10 ; console.log(foo) }
```

因为当 JS 解释器在遇到非匿名的立即执行函数时，会创建一个辅助的特定对象，然后将函数名称作为这个对象的属性，因此函数内部才可以访问到 `foo`，但是这个值又是只读的，所以对它的赋值并不生效，所以打印的结果还是这个函数，并且外部的值也没有发生更改。

 ```js
specialObject = {};
  
Scope = specialObject + Scope;
  
foo = new FunctionExpression;
foo.[[Scope]] = Scope;
specialObject.foo = foo; // {DontDelete}, {ReadOnly}
  
delete Scope[0]; // remove specialObject from the front of scope chain
 ```

 # 闭包

闭包的定义很简单：函数 A 返回了一个函数 B，并且函数 B 中使用了函数 A 的变量，函数 B 就被称为闭包。

```js
function A() {
  let a = 1
  function B() {
      console.log(a)
  }
  return B
}
```

你是否会疑惑，为什么函数 A 已经弹出调用栈了，为什么函数 B 还能引用到函数 A 中的变量。因为函数 A 中的变量这时候是存储在堆上的。现在的 JS 引擎可以通过逃逸分析辨别出哪些变量需要存储在堆上，哪些需要存储在栈上。

经典面试题，循环中使用闭包解决 `var` 定义函数的问题

```Js
for ( var i=1; i<=5; i++) {
	setTimeout( function timer() {
		console.log( i );
	}, i*1000 );
}
```

首先因为 `setTimeout` 是个异步函数，所有会先把循环全部执行完毕，这时候 `i` 就是 6 了，所以会输出一堆 6。

解决办法两种，第一种使用闭包

```js
for (var i = 1; i <= 5; i++) {
  (function(j) {
    setTimeout(function timer() {
      console.log(j);
    }, j * 1000);
  })(i);
}
```

第二种就是使用 `setTimeout `  的第三个参数

```js
for ( var i=1; i<=5; i++) {
	setTimeout( function timer(j) {
		console.log( j );
	}, i*1000, i);
}
```

第三种就是使用 `let` 定义  `i` 了

```js
for ( let i=1; i<=5; i++) {
	setTimeout( function timer() {
		console.log( i );
	}, i*1000 );
}
```

因为对于 `let` 来说，他会创建一个块级作用域，相当于

```js
{ // 形成块级作用域
  let i = 0
  {
    let ii = i
    setTimeout( function timer() {
        console.log( ii );
    }, i*1000 );
  }
  i++
  {
    let ii = i
  }
  i++
  {
    let ii = i
  }
  ...
}
```

### type和interface的区别
type和interface的相同点：都是用来定义对象或函数的形状, 它俩也支持继承,并且可以互相继承. 

type和interface的不同点
* type可以定义 基本类型的别名，如 type myString = string
* type可以通过 typeof 操作符来定义，如 type myType = typeof someObj
* type可以申明 联合类型，如 type unionType = myType1 | myType2
* type可以申明 元组类型，如 type yuanzu = [myType1, myType2]
* interface可以 声明合并，这种情况下，如果是type的话，就会报 重复定义 的警告