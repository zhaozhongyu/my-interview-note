const _timerId = {};
let _id = 0;
function mySetTimeout(fn, timeout, ...args) {
  // 'use strict'
  const start = new Date().getTime();
  const cid = _id++;
  const loop = () => {
    const time = new Date().getTime();
    if (time >= start + timeout) {
      fn.apply(this, args);
      delete _timerId[cid];
    } else {
      _timerId[cid] = requestAnimationFrame(loop)
    }
  }
  _timerId[cid] = requestAnimationFrame(loop);
  return cid;
}

function myClearTimeout(timer) {
  cancelAnimationFrame(_timerId[timer])
  delete _timerId[timer]
}

function showName(){ 
  console.log("Hello")
}
mySetTimeout(showName, 1000);