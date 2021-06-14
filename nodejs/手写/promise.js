/**
 * 手写promise的关键一是在于对resolve, reject的处理, 二在于对状态的保存
 * 最重要的是then,catch,finally的传递
 */

 const pending = Symbol('pending');
 const rejected = Symbol('rejected');
 const fulfilled = Symbol('fulfilled');
 let id = 0;
 class Promise {
   constructor (executer) {
     if (typeof executer !== 'function') {
       throw TypeError(`Promise resolver ${typeof executer} is not a function`);
     }
     // 2.2.6.1: If/when `promise` is fulfilled, all respective `onFulfilled` callbacks must execute in the order of their originating calls to `then`.
     // 允许注册多个executer
     this.executerFns = [];
     this.ctx = new Proxy({ state: pending, value: undefined, error: undefined, uid: id++ }, {
       set: (target, key, value) => {
         if (key === 'state') {
           if (Reflect.get(target, key) === pending && value !== pending) {
             // console.log('set state:', value, ', pre state:', Reflect.get(target, key), ', id:', this.ctx.uid,);
             Reflect.set(target, key, value);
             
             // 这里调用
             // 2.2.2.2 立即执行时会导致当前方法中resolve后的内容无法执行
             setTimeout(() => {
               // console.log('run executer', this.ctx.state, ', id:', this.ctx.uid, ', executers length: ', this.executerFns.length);
               while (this.executerFns.length > 0) {
                 let executer = this.executerFns.shift();
                 executer();
               }
             }, 0);
           }
         } else {
           Reflect.set(target, key, value);
         }
         return true;
       }
     })
     const resolve = (val) => {
       if (val === this) {
         // 2.3.1: If `promise` and `x` refer to the same object, reject `promise` with a `TypeError' as the reason.
         throw new TypeError('can not return current promise instance! rules: promises-aplus 2.3.1');
       }
       // console.log('resolve val: ', val, this.ctx.state)
       if(val instanceof Promise){ // 是promise 就继续递归解析
           return val.then(resolve, reject)
       } else if ((typeof val === 'object' && val !== null) || typeof val === 'function') {
         let called;
         try {
           // 规范 2.3.3.1
           let then = val.then;
           if (typeof then == 'function') {
             // console.log('then.call: ', val);
             return then.call(val, function (val) {
                 if (called) return;
                 called = true;
                 resolve(val);
               }, function (reason) {
                 if (called) return;
                 called = true;
                 reject(reason);
               });
           } else {
             // resolve(val); // 此时x 就是一个普通对象
             // console.log('resolve ', val);
             if (this.ctx.state === pending) {
               this.ctx.value = val;
               this.ctx.state = fulfilled;
               return;
             }
           }
         } catch (e) {
           if (called) return;
           called = true;
           // 规范 2.3.3.3.4 
           reject(e); // 取then时抛出错误了
           return ;
         }
       }
       // console.log('resolve ', val);
       if (this.ctx.state === pending) {
         this.ctx.value = val;
         this.ctx.state = fulfilled;
       }
     }
   
     const reject = (e) => {
       if (this.ctx.state === pending) {
         this.ctx.error = e;
         this.ctx.state = rejected;
       }
     }
     try {
       executer(resolve, reject);
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
     // console.log('onfulfilled is Function', typeof onfulfilled === 'function');
     onfulfilled = typeof onfulfilled === 'function' ? onfulfilled : val => val;
     onrejected = typeof onrejected === 'function' ? onrejected : err => { throw err };
     let cb = (resolve, reject) => {
       // 这时候保证已经进入了resolve/reject状态
       if (this.ctx.state !== pending) {
         // settimeout: 2.2.4 `onFulfilled` or `onRejected` must not be called until the execution context stack contains only platform code.
         setTimeout(() => {
           try {
             let value;
             if (this.ctx.state === fulfilled) {
               value = onfulfilled(this.ctx.value);
             } else if (this.ctx.state === rejected) {
               value = onrejected(this.ctx.error);
             }
             // console.log('## resolve immediate');
             resolve(value); // 这里会继续下一个执行链条
           } catch (err) {
             // console.log('## reject immediate');
             reject(err);
           }
         }, 0);
       } else {
         // 返回一个闭包函数
         const executer = () => {
           if (this.ctx.state !== pending) {
             try {
               let value;
               if (this.ctx.state === fulfilled) {
                 value = onfulfilled(this.ctx.value);
               } else if (this.ctx.state === rejected) {
                 value = onrejected(this.ctx.error);
               }
               // console.log('## resolve from executer');
               resolve(value); // 这里会继续下一个执行链条
             } catch (err) {
               // console.log('## reject from executer');
               reject(err);
             }
           }
         }
         // console.log('## add executer to uid: ', this.ctx.uid, ', state: ', this.ctx.state);
         this.executerFns.push(executer);
       }
     }
     let promise2 = new Promise(cb); // 如果当前已经完成了, 则直接执行, 否则绑定, 然后在resolve中执行
     return promise2;
   }
 
   // catch 本质上就是一个只有onrejected的then
   catch(onrejected) {
     return this.then(undefined, onrejected);
   }
 
   // finally操作, 返回值是一个promise实例
   // 本质上也可以当做是一个另类的then
   finally(onfinal) {
     onfinal = typeof onfinal === 'function' ? () => { onfinal(); } : () => {};
     return this.then(onfinal, onfinal);
   }
 
   // this.__proto__.toString = function () {
   //   return `Promise {<${status}>: ${value}}`;
   // }
 }
 // let t = function(resolve, reject) { setTimeout(() => { console.log('test resolve11111\r\n');resolve('new Promise!'); }, 2000); }
 // let onfulFill = function(val) { console.log('test onFulFill', val); return 'on fulfill' }
 // let onReject = function(err) { console.log('test onReject', err.message); }
 // let promiseonfulFill = function(val) { return new promise((resolve) => {
 //   setTimeout(() => { console.log('test promiseonfulFill', val); resolve('on promiseonfulFill'); }, 5000)
 // }); }
 
 // p = new Promise(t)
 //  .then(promiseonfulFill)
 //  .then(onfulFill).catch(onReject)
 //  .finally(onfulFill);
 
 // p = new promise(t)
 //  .then(promiseonfulFill)
 //  .then(onfulFill)
 // //  .then(() => {
 // //    throw new TypeError('test error')
 // //  })
 // //  .then(onfulFill)
 //  .catch(onReject)
 //  .finally(onfulFill);
 
 Promise.deferred = function () {
   let dfd = {};
   dfd.promise = new Promise((resolve,reject)=>{
       dfd.resolve = resolve;
       dfd.reject = reject
   })
   return dfd;
 }
 
 module.exports = Promise