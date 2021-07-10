/**
 * 手写promise的关键一是在于对resolve, reject的处理, 二在于对状态的保存
 * 最重要的是then,catch,finally的传递
 */

const pending = Symbol('pending');
const rejected = Symbol('rejected');
const fulfilled = Symbol('fulfilled');
class promise {
  constructor (executer) {
    if (typeof executer !== 'function') {
      throw TypeError(`Promise resolver ${typeof executer} is not a function`);
    }
    this.state = pending;
    this.value = undefined;
    this.error = undefined;
    const resolve = (val) => {
      if (this.state === pending) {
        this.value = val;
        this.state = fulfilled;
        if (this.nextPromiseCtx && this.nextPromiseCtx.executer && typeof this.nextPromiseCtx.executer === 'function') {
          this.nextPromiseCtx.executer();
          // this.nextcb.call(this.nextPromiseCtx);
        }
      }
    }
  
    const reject = (e) => {
      if (this.state === pending) {
        this.error = e;
        this.state = rejected;
        if (this.nextPromiseCtx && this.nextPromiseCtx.executer && typeof this.nextPromiseCtx.executer === 'function') {
          this.nextPromiseCtx.executer();
          // this.nextcb.call(this.nextPromiseCtx);
        }
      }
    }
    try {
      this.executer = executer(resolve, reject);
    } catch(e) {
      reject(e);
    }
  }

  // .then
  /**
   * 构造一个callback用于new promise, 这个callback在new promise的时候仅仅是新建操作, 不会执行到传入的回调
   * callback要支持使用前一个promise的状态进行执行操作, 前一个promise怎么传进来?
   * 不能马上执行时, 下一次执行状态在前一个promise执行完成时主动调用
   * callback 要支持原有的Promise
   * then的返回值必然是一个Promise实例, 另外有一点注意的是, then的参数是没有resolve/reject的, 所以不必考虑入参
   * 需要注意的是, onfulfilled/onrejected本身也支持返回一个promise
  */
  then (onfulfilled, onrejected) {
    // 处理undefined情况
    onfulfilled = typeof onfulfilled === 'function' ? onfulfilled : val => val;
    onrejected = typeof onrejected === 'function' ? onrejected : err => { throw err };
    // let cb = function (){
    //   // 存在prev时进入执行(这时候保证已经进入了resolve/reject状态)
    //   if (this.prev) {
    //     try {
    //       if (this.prev.state === pending) {
    //         return;
    //       }
    //       if (this.prev.state === fulfilled) {
    //         this.value = onfulfilled(this.prev.value);
    //       } else if (this.prev.state === rejected) {
    //         this.value = onrejected(this.prev.error);
    //       }
    //       this.state = fulfilled;
    //     } catch (err) {
    //       this.error = err;
    //       this.state = rejected;
    //     }
    //     // 继续下一个执行链条
    //     if (this.nextcb && this.nextPromiseCtx) {
    //       this.nextPromiseCtx.prev = { value: this.value, error: this.error, state: this.state };
    //       this.nextcb.call(this.nextPromiseCtx);
    //     }
    //   }
    // }
    let cb = (resolve, reject) => {
      // 这时候保证已经进入了resolve/reject状态
      if (this.state !== pending) {
        try {
          let value;
          if (this.state === fulfilled) {
            value = onfulfilled(this.value);
          } else if (this.state === rejected) {
            value = onrejected(this.error);
          }
          resolve(value); // 这里会继续下一个执行链条
        } catch (err) {
          reject(err);
        }
      } else {
        return () => { cb(resolve, reject); } // 返回一个闭包函数
      }
    }
    let promise2 = new promise(cb); // 如果当前已经完成了, 则直接执行, 否则绑定, 然后在resolve中执行
    if (this.state === pending) {
      // 绑定
      this.nextcb = cb;
      this.nextPromiseCtx = promise2;
    }
    return promise2;
  }

  // catch 本质上就是一个只有onrejected的then
  catch(onreject) {
    return this.then(undefined, onrejected);
  }

  // finally操作, 返回值是一个promise实例
  // 本质上也可以当做是一个另类的then
  finally(onfinal) {
    return this.then(onfinal, onfinal);
  }

  // this.__proto__.toString = function () {
  //   return `Promise {<${status}>: ${value}}`;
  // }
}
let t = function(resolve, reject) { setTimeout(() => { console.log('test resolve111');resolve('new Promise!'); }, 3000); }
let onfulFill = function(val) { console.log('test onFulFill', val); return 'on fulfill' }
let onReject = function(err) { setTimeout(() => { console.log('test onReject', String(err)); return 'on reject'}, 1000); }
let promiseonfulFill = function(val) { return new Promise((resolve) => {
  setTimeout(() => { console.log('test onFulFill', val); resolve('on fulfill'); }, 2000)
}); }

// p = new Promise(t)
//  .then(promiseonfulFill)
//  .then(onfulFill).catch(onReject)
//  .finally(onfulFill);

p = new promise(t)
//  .then(promiseonfulFill)
 .then(onfulFill)
 .then(onfulFill)
//  .catch(onReject)
//  .finally(onfulFill);
