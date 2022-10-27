// 字节1面
// 实现一个函数, 支持sum(1)(2)(3) == 6; sum(1,2,3) == 6; sum(1)(2,3) == 6; 这种调用

function sum(...args) {
  let count = 0;
  let fn = (...args1) => {
    for(let n of args1) {
      count += n;
    }
    fn.toString = () => count;
    return fn;
  }
  return fn(...args);
}

console.warn(sum(1, 2, 3) == 6);
console.warn(sum(1)( 2, 3) == 6);
console.warn(sum(1)(2)(3) == 6);