// 作用域与预编译

// 下面的程序会报错吗？如果不会，输出结果分别是多少？

function sayHello() {
    console.log(name); // undefined
    console.log(age); // 报错error
    var name = "Tom";
    let age = 18;
} 
sayHello();


// 下面的程序i的打印结果分别是多少？

for (var i = 0; i < 3; i++) {
    setTimeout(_ => {
        console.log(i)
    })
}

for (let i = 0; i < 3; i++) {
    setTimeout(_ => {
        console.log(i)
    })
}


// 下面程序的输出结果是：

console.log(a);
var a = 'a';
console.log(b);
let b = 'b';


// 下面程序的输出结果是：

var foo = "Hello";
(function(){
    var bar = " World";
    console.log(foo + bar); // hello world
})();
console.log(foo + bar);  // 报错not defined


// 下面程序的输出结果是：

var a = 10;
(function () {
    console.log(a)  // undefined
    a = 5
    console.log(window.a) // 10
    var a = 20;
    console.log(a) // 20
})()


// 下面代码的输出结果是:

const a = 10
function runFunction() {
    const a = 20
    console.log('inside', a)
}
runFunction()
console.log('outside', a)


// 请描述打印结果并说明原因

"use strict"
var name = 'Jay'
var person = {
    name: 'Wang',
    pro: {
        name: 'Michael',
        getName: function () {
            return this.name
        }
    }
}
console.log(person.pro.getName)
var people = person.pro.getName
console.log(people()) // 严格模式下报错, 非严格模式下输出jay


// 下面程序的结果是：

{/* <ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
</ul> */}
var elements = document.getElementsByTagName("li");
for (var i=0;i<elements.length;i++){
    elements[i].onclick =function( ){
    alert(i); 
    };
}


// 下面程序的输出结果是

compute(10,100); // 220, 当存在function的时候, js会将function 定义顺序提前到最前面
var compute = function(A,B) {
    console.info(A * B) ;
};
function compute(A,B){
    console.info(A + B);
}
function compute(A,B){
    console.info((A + B)*2);
}
compute(2,10); // var 覆盖



// 下面程序的执行结果是：

meili()
function meili() {
    console.log("meili")
}
mogu()
var mogu = function() {
    console.log("mogu")
}


// 下面两个代码片段输出结果有什么区别？为什么？

// 片段1
check('first');
function check(ars){
    console.log(ars);
}
// 片段2
check('second'); // 报错
var check= function(ars){
    console.log(ars);
}
