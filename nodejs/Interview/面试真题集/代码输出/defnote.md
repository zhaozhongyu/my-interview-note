1. 
```
try {
    (async function() { a().b().c() })()
} catch (e) {
    console.log(`执行出错：${e.message}`)
}
```
输出 ` VM404:2 Uncaught (in promise) ReferenceError: a is not defined`

2. 
```
try {
    let a = 0
    ;(async function() {
        a += 1
        console.log('inner', a)
        throw new Error('123')
        // a()
    })()
    console.log('outer', a)
} catch(e) {
    console.warn('Error', e)
}
```
输出
```
inner 1
outer 1
(node:1128) UnhandledPromiseRejectionWarning: Error: 123
```

3.
```
;(function b() {
  b = 123
  console.log(b)
})()
```
输出
```
立即执行函数的函数名相当于常量定义 即const定义。若进行赋值 所以非严格模式下 会无效果 严格模式下会报错
```