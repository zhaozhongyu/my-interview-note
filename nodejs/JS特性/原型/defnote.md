https://zhuanlan.zhihu.com/p/363902533

四个规则
我们先来了解下面引用类型的四个规则：

1、引用类型，都具有对象特性，即可自由扩展属性。

2、引用类型，都有一个隐式原型 __proto__ 属性，属性值是一个普通的对象。

3、引用类型，隐式原型 __proto__ 的属性值指向它的构造函数的显式原型 prototype 属性值。

4、当你试图得到一个对象的某个属性时，如果这个对象本身没有这个属性，那么它会去它的隐式原型 __proto__（也就是它的构造函数的显式原型 prototype）中寻找。

```
const obj = {};
const arr = [];
const fn = function() {}

obj.__proto__ === Object.prototype // true
arr.__proto__ === Array.prototype // true
fn.__proto__ === Function.prototype // true
```

https://www.liaoxuefeng.com/wiki/1022910821149312/1023021997355072
### 原型继承
1. 在JavaScript中，可以用关键字`new`来调用一个函数，并返回一个对象
```
function Student(name) {
    this.name = name;
    this.hello = function () {
        alert('Hello, ' + this.name + '!');
    }
}
var xiaoming = new Student('小明');
xiaoming.name; // '小明'
xiaoming.hello(); // Hello, 小明!
```
2. 用new Student()创建的对象还从原型上获得了一个constructor属性，它指向函数Student本身, 要让创建的对象共享一个hello函数，根据对象的属性查找原则，我们只要把hello函数移动到xiaoming、xiaohong这些对象共同的原型上就可以了，也就是Student.prototype
```
function Student(name) {
    this.name = name;
}

Student.prototype.hello = function () {
    alert('Hello, ' + this.name + '!');
};
```

#### 继承
基于Student扩展出PrimaryStudent，可以先定义出PrimaryStudent：
```
function PrimaryStudent(props) {
    // 调用Student构造函数，绑定this变量:
    Student.call(this, props);
    this.grade = props.grade || 1;
}
```
但是，调用了Student构造函数不等于继承了Student，PrimaryStudent创建的对象的原型是：

`new PrimaryStudent() ----> PrimaryStudent.prototype ----> Object.prototype ----> null`

如果把继承这个动作用一个inherits()函数封装起来，还可以隐藏F的定义，并简化代码：
```
function inherits(Child, Parent) {
    var F = function () {};
    F.prototype = Parent.prototype;
    Child.prototype = new F();
    Child.prototype.constructor = Child;
}

function Student(props) {
    this.name = props.name || 'Unnamed';
}

Student.prototype.hello = function () {
    alert('Hello, ' + this.name + '!');
}

function PrimaryStudent(props) {
    Student.call(this, props);
    this.grade = props.grade || 1;
}

// 实现原型继承链:
inherits(PrimaryStudent, Student);

// 绑定其他方法到PrimaryStudent原型:
PrimaryStudent.prototype.getGrade = function () {
    return this.grade;
};
```
##### 小结
JavaScript的原型继承实现方式就是：
定义新的构造函数，并在内部用call()调用希望“继承”的构造函数，并绑定this；
借助中间函数F实现原型链继承，最好通过封装的inherits函数完成；
继续在新的构造函数的原型上定义新方法。
