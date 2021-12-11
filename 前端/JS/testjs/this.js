/**
 * @description this指向题, https://juejin.cn/post/7019470820057546766
 * 总结

默认绑定: 非严格模式下this指向全局对象，严格模式下this会绑定到undefined
隐式绑定: 满足XXX.fn()格式，fn的this指向XXX。如果存在链式调用，this永远指向最后调用它的那个对象
隐式绑定丢失：起函数别名，通过别名运行；函数作为参数会造成隐式绑定丢失。
显示绑定: 通过call/apply/bind修改this指向
new绑定: 通过new来调用构造函数，会生成一个新对象，并且把这个新对象绑定为调用函数的this。
箭头函数绑定: 箭头函数没有this，它的this是通过作用域链查到外层作用域的this，且指向函数定义时的this而非执行时

绑定优先级: new绑定 > 显式绑定 > 隐式绑定 > 默认绑定
 */

function test() {
  function getName() { // 执行时无法覆盖var定义的getName
    console.log(1)
  }
  return this
}

test.getName = function() {
  console.log(2);
}

test.prototype.getName = function () {
  console.log(3);
}

var getName = function () {
  console.log(4);
}

function getName () {
  console.log(5);
}
getName()
test.getName();
test().getName();
getName()
new test.getName()
new test().getName()
new new test().getName();

/////////////////////////////
var x = 1;

var obj = {
    x: 3,
    fun:function () {
        var x = 5;
        return this.x;
    }
};

var fun = obj.fun;
console.log( obj.fun(), fun() ); // 3, 1, 第二个fun执行时this指向全局window

///////////////////////////
var a = 5;
 function test() { 
    a = 0; 
    console.log(a); 
    console.log(this.a); 
    var a;
    console.log(a); 
}
new test(); // 0, undefined, 0, 因为new的时候重新指定了test中的this指向, 所以this中不会有this.a

////////////////////////////
function fun () {
  return () => {
      return () => {
          return () => {
              console.log(this.name)
          }
      }
  }
}
var f = fun.call({name: 'foo'})
var t1 = f.call({name: 'bar'})()()
var t2 = f().call({name: 'baz'})()
var t3 = f()().call({ name: 'qux' }) // foo, foo, foo 因为在f中绑定了{name: foo}, 然后在内部的3个函数都是箭头函数, 不支持通过call绑定this, 因此都是foo

/////////////////////////////////
let obj1 = {
  a: 1,
  foo: () => { // 此时的this指向的还是window
      console.log(this.a)
  }
}
obj1.foo()
const foo = obj1.foo
foo() // undefined, undefined 因为foo是一个箭头函数, this默认指向了window

/////////////////////////////////
const Person = (name="wang",age=10) => {
  this.name = name;
  this.age = age;
  return this.name +' is '+ this.age + 'years old'
}
let result = new Person('zhang',11) // 报错 Uncaught TypeError: Person is not a constructor, 箭头函数不能作为new对象方法(不支持重指向this)
console.log(result)
  
///////////////////////////////
var person = {
  age: 18,
  getAge: function() {
    return this.age;
  }
};
var getAge = person.getAge
getAge() // undefined, 此时在全局window

/////////////////////////////
var name = 'global';
var obj = {
    name: 'local',
    foo: function(){
        this.name = 'foo';
    }.bind(window)
};
var bar = new obj.foo();
setTimeout(function() {
    console.log(window.name);
}, 0);
console.log(bar.name);
 
var bar3 = bar2 = bar;
bar2.name = 'foo2';
console.log(bar3.name); // foo, foo2, 再到setTimeout的global

/////////////////////////
var obj = {
  name:"zhangsan",
  sayName:function(){
      console.info(this.name);
  }
}

var wfunc = obj.sayName;
obj.sayName();
wfunc();
var name = "lisi";
obj.sayName();
wfunc(); // zhangsan, ''(window.name 是空字符串), zhangsan, lisi
///////////////////////
var name = 'test'
var a = {    
  name: 'ass',    
  getName: function() {    
      return this.name;   
  } 
} 
var b = a.getName; 
b(); // test

//////////////////////////
var name='zcxiaobao';
function introduce(){
    console.log('Hello,My name is ', this.name);
}
const Tom = {
    name: 'TOM',
    introduce: function(){
        setTimeout(function(){
            console.log(this)
            console.log('Hello, My name is ',this.name);
        })
    }
}
const Mary = {
    name: 'Mary',
    introduce
}
const Lisa = {
    name: 'Lisa',
    introduce
}

Tom.introduce();
setTimeout(Mary.introduce, 100);
setTimeout(function(){
    Lisa.introduce();
},200);

/**
 * Tom.introduce()执行: console位于setTimeout的回调函数中，回调函数的this指向window, setTimeout中的回调函数默认指向window!!, 匿名函数，默认绑定window
Mary.introduce直接作为setTimeout的函数参数(类似题目题目3.3)，会发生隐式绑定丢失，this为默认绑定
Lisa.introduce执行虽然位于setTimeout的回调函数中，但保持xxx.fn模式，this为隐式绑定。
 */

/**
 * 箭头函数没有自己的this，它的this指向外层作用域的this，且指向函数定义时的this而非执行时。
 * this指向外层作用域的this: 箭头函数没有this绑定，但它可以通过作用域链查到外层作用域的this
 * 指向函数定义时的this而非执行时: JavaScript是静态作用域，就是函数定义之后，作用域就定死了，跟它执行时的地方无关
 */
