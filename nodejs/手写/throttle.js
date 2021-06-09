/**
 * 
 * 节流
 */
function throttle(fn, wait) {
  let timer
  return function(...args) {
    let context = this;
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(context, args);
        timer = null;
      }, wait);
    }
  }
}