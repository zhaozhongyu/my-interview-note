/**
 * instanceof的关键在于检查原型链
 * https://www.zhihu.com/question/34183746
 * __proto__（隐式原型）与prototype（显式原型）
 * 每一个函数在创建之后都会拥有一个名为prototype的属性，这个属性指向函数的原型对象, prototype是函数才有的属性
 * JavaScript中任意对象都有一个内置属性[[prototype]], 大多数浏览器都支持通过__proto__来访问
 * 隐式原型指向创建这个对象的函数(constructor)的prototype
 */
function myInstanceOf(left, right) {
  let prototype = right.prototype;
  left = left.__proto__;
  while(true) {
    if (!left) return false;
    if (left == prototype) return true;
    left = left.__proto__;
  }
}

