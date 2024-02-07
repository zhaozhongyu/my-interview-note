// 事件循环
///////////////////////////

const promiseA = Promise.resolve('a')
promiseA. then((res) => {
    console.log(res) // a
}).then((res) => {
    console.log(res) // undefined
})
const promiseB = Promise.resolve('b')
promiseB. then((res) => {
    console.log(res) // b
})
promiseB. then((res) => {
    console.log(res) // b
})
// a, b,b, undefined


///////////////////////////

setTimeout(() => {
    console.log(1)
}, 0)

const P = new Promise((resolve, reject) => {
    console.log(2)
    setTimeout(() => {
        resolve()
        console.log(3)
    }, 0)
})

P.then(() => {
    console.log(4)
})
console.log(5)


///////////////////////////

setTimeout(function(){
    console.log(1);
}, 0)
new Promise(function(resolve){
    console.log(2);
    resolve();
    console.log(3);
}).then(function(){
    console.log(4);
})
console.log(5);

///////////////////////////

(async () => {
    console.log(1);
    setTimeout(() => {
        console.log(2);
}, 0);
await new Promise((resolve, reject) => {
    console.log(3);
}).then(() => {
    console.log(4);
});
    console.log(5);
})();

///////////////////////////

new Promise((resolve) => {
    console.log('1')
    resolve()
    console.log('2')
}).then(() => {
    console.log('3')
})
setTimeout(() => {
    console.log('4')
})
console.log('5')

///////////////////////////

var p1 = new Promise(function(resolve, reject){
    resolve("2")
})
setTimeout(function(){
    console.log("1")
},10)
p1.then(function(value){
    console.log(value)
})
setTimeout(function(){
    console.log("3")
},0)

///////////////////////////

setTimeout(function() {
  console.log('setTimeout');
}, 0);
Promise.resolve().then(function() {
  console.log('promise1');
}).then(function() {
  console.log('promise2');
});
///////////////////////////

setTimeout(function() {
    console.log(1)
},0)
new Promise(function executor(resolve){
    console.log(2)
    for (var i = 0; i<10000; i++) {
        i - 9999 && resolve()
    }
    console.log(3)
}).then(function() {
    console.log(4)
})
console.log(5)

///////////////////////////

<div class="outer">
 <div class="inner"></div>
</div>

// 对应的js代码如下：
var outer = document.querySelector('.outer');
var inner = document.querySelector('.inner');

function onClick() {
    console.log('click');

    setTimeout(function() {
        console.log('timeout');
    }, 0);

    Promise.resolve().then(function() {
        console.log('promise');
    });

    outer.setAttribute('data-random', Math.random());
}

inner.addEventListener('click', onClick);
outer.addEventListener('click', onClick);

// 当点击class为inner的div块时，控制台依次输出结果是什么？
///////////////////////////
(async () => {
    console.log(1);
    setTimeout(() => {
        console.log(2);
}, 0);
await new Promise((resolve, reject) => {
    console.log(3);
}).then(() => {
    console.log(4);
});
    console.log(5);
})();


///////////////////////////

setTimeout(() => console.log('a'));
Promise.resolve().then(
   () => console.log('b’);
 ).then(
   () => Promise.resolve('c').then(
     (data) => {
       setTimeout(() => console.log('d'));
       console.log('f');
       return data;
     }
   )
 ).then(data => console.log(data));

///////////////////////////

console.log('one'); 
setTimeout(function() { console.log('two'); }, 0); 
Promise.resolve()
       .then(function() { console.log('three'); })
 console.log('four');

///////////////////////////

setTimeout(function () {
    console.log(C)
},0)
console.log('D')
new Promise(function(resolve){
    console.log('E')
    resolve()
    console.log('F')
}).then(function() {
    console.log('G')
})
console.log('H')

///////////////////////////

function log(msg, time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(msg);
      resolve();
    }, time);
  });
}

// 则下面三段代码输出的结果是：
// 第一段代码：
(async () => {
  for (let i = 0; i < 5; i++) {
    await log(i, 1000);
  }
})();

// 第二段代码：
(async () => {
  [ 1, 2, 3, 4 ].forEach(async (i) => {
    await log(i, 1000);
  });
})();

// 第三段代码：
(async () => {
  for (const i of [ 1, 2, 3, 4 ]) {
    await log(i, 1000);
  }
})();
