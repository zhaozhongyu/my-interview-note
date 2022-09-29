/**
 * 防抖, 防抖与节流的区别在于防抖是执行后一段时间不再触发同样的时间, 但中间触发的部分不会直接丢弃而是尝试延时出发, 节流是直接丢弃中间部分.
 */
function debounce(fn, wait) {
  let timeout = null;
  return function() {
    let context = this;
    let args = arguments;
    if (timeout) clearTimeout(timeout);
    else fn(args);
    timeout = setTimeout(() => {
      fn.apply(context, args);
    }, wait);
  }
}

// 节流
function throttle(func, delay) {
  var timer = null;
  return function() {
      var context = this;
      var args = arguments;
      if (!timer) {
          timer = setTimeout(function() {
              func.apply(context, args);
              timer = null;
          }, delay);
      }
  }
}