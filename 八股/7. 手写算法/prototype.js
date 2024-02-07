// 原型与原型链

// 下面程序的输出结果依次是？

function Fn1(name) {
    if(name){
        this.name = name;
    }
}
Fn1.prototype.name="jack"
let a = new Fn1();
console.log('a:', a.name); // 没有设置name属性, 此时从__proto__中查找

function Fn2(name) {
    this.name = name;
}
Fn2.prototype.name="jack"
let b = new Fn2();
console.log('b:', b.name); // 设置了name属性undefined, 此时输出undefined


// 下面程序的输出结果是？

var Foo = (function() {
    var x = 0;
    function Foo() {}
    Foo.prototype.increment = function() {
        ++x;
        console.log(x);
    };
    return Foo;
})();
 
var a = new Foo(); // 在函数作用域中定义X, 此时不触发隐式绑定到this, 如果没有使用new的话, 不会默认绑定prototype, 查看原型可以看到scope中的Closure(闭包)存在{x: 0}
a.increment(); // 输出函数作用域中的x
a.increment();
var b = new Foo();
a.increment();


// 下面程序的输出结果是？

var name = 'Jay'
function Person(name){
    this.name = name;
    console.log(this.name)
}
var a = Person('Tom')
console.log(name) // tom
console.log(a) // undefined
var b = new Person('Michael')
console.log(b) // Person实例


// 请表述以下代码的执行结果和原因

class A{}
class B extends A{}
const a = new A()
const b = new B()
a.__proto__
b.__proto__
B. __proto__
B. prototype.__proto__
b.__proto__.__proto__


// 请表述以下代码的执行结果和原因

function test() {           
    getName = function() { 
        Promise.resolve().then(() => console.log(0)); 
        console.log(1);               
    };

    return this; 
}
test.getName = function() { 
     setTimeout(() => console.log(2), 0); 
     console.log(3);               
};
test.prototype.getName = function() {    

     console.log(4); 
};       
var getName = function() { 
     console.log(5);             
};
function getName() {
     console.log(6); 
}      
      
test.getName();  // 3, 2
getName();  // 5, var 会覆盖后面的function定义
test().getName();  // 执行test()时, this指向的是window, 然后getName隐式绑定到了window上(如果是function getName() 的话, 无法覆盖), 因此此时为1, 0
getName();  // 1, 0, 已经被覆盖
new test.getName(); // 3, 2
new test().getName(); // 4
new new test().getName(); // 4



// 请表述以下代码的执行结果和原因

var tmp = {};
var A = function() {};
A. prototype = tmp;

var a = new A();
A. prototype = {};

var b = Object.create(tmp);
b.constructor = A. constructor;

console.log(a instanceof A); // false, prototype被改了
console.log(b instanceof A); // false, instance比较的是prototype, 不是constructor, b.__proto__ = A.prototype



// 下面程序的执行结果是：

function Foo(){}
Foo.prototype.z = 3;
var obj = new Foo();
console.info(obj.z) // 3
obj.z = 10;
console.info(obj.z); // 10
delete obj.z;
console.info(obj.z); // 3


// 下面程序的执行结果是：

const Book = {
  price: 32
}
const book = Object.create(Book);
book.type = 'Math';
delete book.price;
delete book.type;
console.log(book.price); // 32, 从原型链上查找得到
console.log(book.type);
