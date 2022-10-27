/**
 * 异步并发控制器/调度器
 * 该函数返回一个执行函数, 该执行函数接收一个异步任务函数.
 * 执行函数被调用时, 会根据capacity来执行task, 如果正在执行的task数不超过capacity, 则立即执行, 否则会等到任意一个正在执行的task结束后执行, 并返回值为task返回值的Promise
 */
function asyncTaskControler(capacity) {
  let waitting = []; // 等待执行的promise resolve
  let runningNum = 0;
  const runNext = data => {
    let next = waitting.unshift();
    if (next) {
      next();
    } else {
      runningNum --;
    }
    return data;
  };
  return async (func) => {
    if (runningNum < capacity) {
      runningNum ++;
      return func().then(runNext);
    } else {
      return new Promise(r => {
        waitting.push(r); // 上一个函数执行完成后, 从WAITTING列表中取出resolve并执行, 然后promise完成, 执行后面内容.
      }).then(() => {
        return func();
      }).then(runNext);
    }
  };
}