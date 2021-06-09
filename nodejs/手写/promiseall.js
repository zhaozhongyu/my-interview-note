/**
 * promise.all
 * 所有任务完成时退出, 
 */

 function isPromise(obj) {
  return !!obj && (typeof obj === 'function' || typeof obj === 'object') && typeof obj.then == 'function';
}

function myPromiseAll(arr) {
  let res = []
  let containPromise = false;
  return new Promise((resolve, reject) => {
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
      if (isPromise(arr[i])) {
        containPromise = true;
        arr[i].then(data => {
          res[i] = data;
          count++;
          if (count === arr.length) {
            resolve(res)
          }
        }).catch(error => {
          reject(error)
        })
      } else {
        count++;
        res[i] = arr[i];
      }
    }
    if(!containPromise) resolve(res);
  })
}