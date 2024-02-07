1. var 的问题
var命令会发生“变量提升”现象，即变量可以在声明之前使用，值为undefined。这种现象多多少少是有些奇怪的，按照一般的逻辑，变量应该在声明语句之后才可以使用。


2. 变量赋值
ES6 允许写成下面这样。

`let [a, b, c] = [1, 2, 3];`

解构不仅可以用于数组，还可以用于对象。

`let { foo, bar } = { foo: 'aaa', bar: 'bbb' };`


3. rest 参数
ES6 引入 rest 参数（形式为...变量名），用于获取函数的多余参数，这样就不需要使用arguments对象了。rest 参数搭配的变量是一个数组，该变量将多余的参数放入数组中。
```
function add(...values) {
  let sum = 0;

  for (var val of values) {
    sum += val;
  }

  return sum;
}

add(2, 5, 3) // 10
```