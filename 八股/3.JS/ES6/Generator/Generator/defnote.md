https://www.liaoxuefeng.com/wiki/1022910821149312/1023024381818112


generator跟函数很像，定义如下：
```
function* foo(x) {
    yield x + 1;
    yield x + 2;
    return x + 3;
}
```
generator和函数不同的是，generator由`function*`定义（注意多出的*号），并且，除了return语句，还可以用`yield`返回多次。


```
function* fib(max) {
    var
        t,
        a = 0,
        b = 1,
        n = 0;
    while (n < max) {
        yield a;
        [a, b] = [b, a + b];
        n ++;
    }
    return;
}
```
调用generator对象有两个方法，一是不断地调用generator对象的next()方法：
```
var f = fib(5);
f.next(); // {value: 0, done: false}
f.next(); // {value: 1, done: false}
f.next(); // {value: 1, done: false}
f.next(); // {value: 2, done: false}
f.next(); // {value: 3, done: false}
f.next(); // {value: undefined, done: true}
```
`next()`方法会执行generator的代码，然后，每次遇到`yield x;`就返回一个对象`{value: x, done: true/false}`，然后“暂停”。返回的value就是yield的返回值，`done`表示这个generator是否已经执行结束了。如果done为true，则value就是return的返回值。

当执行到done为true时，这个generator对象就已经全部执行完毕，不要再继续调用next()了。

第二个方法是直接用for ... of循环迭代generator对象，这种方式不需要我们自己判断done：
```
for (let x of fib(10)) {
    console.log(x); // 依次输出0, 1, 1, 2, 3, ...
}
```

### TS
```
* fib(max: number): Generator<number, undefined, number> {
    let a: number = 0;
    let b: number = 1;
    let n: number = 0;
    while (n < max) {
      yield a;
      [a, b] = [b, a + b];
      n ++;
    }
    return undefined;
  }
```