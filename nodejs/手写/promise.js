/**
 * 手写promise的关键一是在于对resolve, reject的处理, 二在于对状态的保存
 * 最重要的在于, .then任务的链式调用
 */

const PENDING = Symbol();
const REJECTED = Symbol();
const FULLFILLED = Symbol();
function myPromise(func) {
  let state = PENDING;
  let value = undefined;

  const myresolve = function (val) {
    value = val;
    status = FULLFILLED;
  }

  const myreject = function (e) {
    value = e;
    status = REJECTED;
  }

  // .then
  this.__proto__.mythen = function (func) {
    func.call(this, this.value);
  }

  this.__proto__.mycatch = function (func) {
    func.call(this, this.value);
  }

  this.__proto__.toString = function () {
    return `Promise {<${status}>: ${value}}`;
  }

  try {
    func(myresolve, myreject);
  } catch(e) {
    myreject(e);
  }
}