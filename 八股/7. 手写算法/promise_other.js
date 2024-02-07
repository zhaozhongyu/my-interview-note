const STATUS = { PENDING: 'PENDING', FUFILLED: 'FUFILLED', REJECTED: 'REJECTED' }

// 我们的promise 按照规范来写 就可以和别人的promise公用
function resolvePromise(x, promise2, resolve, reject) {
    // 规范 2.3.1
    if (promise2 == x) { // 防止自己等待自己完成
        return reject(new TypeError('出错了'))
    }
    // 规范 2.3.3
    if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
        // x可以是一个对象 或者是函数
        let called;
        try {
            // 规范 2.3.3.1
            let then = x.then;
            if (typeof then == 'function') {
                // 2.3.3.3
                then.call(x, function(y) {
                    // 规范 2.3.3.3.3
                    if (called) return
                    called = true;
                    // 规范 2.3.3.3.1
                    resolvePromise(y, promise2, resolve, reject);
                }, function(r) {
                    // 规范 2.3.3.3.3
                    if (called) return
                    called = true;
                    // 规范 2.3.3.3.2
                    reject(r);
                })
            } else {
                resolve(x); // 此时x 就是一个普通对象
            }
        } catch (e) {
            // 规范 2.3.3.3.4.1
            if (called) return
            called = true;
            // 规范 2.3.3.3.4 
            reject(e); // 取then时抛出错误了
        }
    } else {
        resolve(x); // x是一个原始数据类型 不能是promise
    }
    // 不是proimise 直接就调用resolve
}
class Promise {
    constructor(executor) {
        this.status = STATUS.PENDING;
        this.value = undefined;
        this.reason = undefined;
        this.onResolvedCallbacks = []; // 存放成功的回调的 
        this.onRejectedCallbacks = []; // 存放失败的回调的
        const resolve = (val) => {
            if(val instanceof Promise){ // 是promise 就继续递归解析
                return val.then(resolve,reject)
            }

            if (this.status == STATUS.PENDING) {
                this.status = STATUS.FUFILLED;
                this.value = val;
                // 发布
                this.onResolvedCallbacks.forEach(fn => fn());
            }
        }
        const reject = (reason) => {
            if (this.status == STATUS.PENDING) {
                this.status = STATUS.REJECTED;
                this.reason = reason;
                // 腹部
                this.onRejectedCallbacks.forEach(fn => fn());
            }
        }
        try {
            executor(resolve, reject);
        } catch (e) {
            // 出错走失败逻辑
            reject(e)
        }
    }
    then(onFulfilled, onRejected) { // swtich  作用域
        // 可选参数
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : x => x
        onRejected = typeof onRejected === 'function'? onRejected: err=> {throw err}
        let promise2 = new Promise((resolve, reject) => {
            if (this.status === STATUS.FUFILLED) {
                // to....
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value);
                        resolvePromise(x, promise2, resolve, reject)
                    } catch (e) {
                        reject(e);
                    }
                }, 0);
            }
            if (this.status === STATUS.REJECTED) {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason);
                        resolvePromise(x, promise2, resolve, reject)
                    } catch (e) {
                        reject(e);
                    }
                }, 0);
            }
            if (this.status === STATUS.PENDING) {
                // 装饰模式 切片编程
                this.onResolvedCallbacks.push(() => { // todo..
                    setTimeout(() => {
                        try {
                            let x = onFulfilled(this.value);
                            resolvePromise(x, promise2, resolve, reject)
                        } catch (e) {
                            reject(e);
                        }
                    }, 0);
                })
                this.onRejectedCallbacks.push(() => { // todo..
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.reason);
                            resolvePromise(x, promise2, resolve, reject)
                        } catch (e) {
                            reject(e);
                        }
                    }, 0);

                })
            }
        });
        return promise2;
    }
}

Promise.deferred = function () {
  let dfd = {};
  dfd.promise = new Promise((resolve,reject)=>{
      dfd.resolve = resolve;
      dfd.reject = reject
  })
  return dfd;
}
module.exports = Promise
// p = new Promise((resolve, reject)=>{reject(1)}).then((r) => {console.log('then222');})
// .catch((e) => console.log(e))
// .finally((r) => {console.log('finally1');})
// .then(()=>{console.log('finallythen');});
// 这里写法的问题是, 不能形成调用链. 只能有单个的.then