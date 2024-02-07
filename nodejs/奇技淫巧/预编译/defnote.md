https://juejin.cn/post/6954393788001288199
```
global = 100
    function fn() {
      console.log(global); 
      global = 200
      console.log(global); 
      var global = 300
    }
    fn()
```
此时输出`undefined -> 200`, 因为有一个var重新声明变量, 导致global成为一个作用域内的变量而不是全局变量

```
global = 100
    function fn() {
      console.log(global); 
      global = 200
      console.log(global); 
      let global = 300
    }
    fn()
```
`Uncaught ReferenceError: Cannot access 'global' before initialization` let关键字声明的变量无法在声明前使用

```
global = 100
    function fn() {
      console.log(global); 
      global = 200
      console.log(global); 
      let global = 300
    }
    fn()
```

```
global = 100
    function fn() {
      console.log(global); 
      global = 200
      console.log(global); 
      global = 300
    }
    fn()
```
此时输出`100 -> 200`, global自始至终都是全局变量