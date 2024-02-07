// 输入{ a: { b: { c: 1, d: 2 }, e: 3 }, f: { g: 2 } }

// 输出 { 'a.b.c': 1, 'a.b.d': 2, 'a.e': 3, 'f.g': 2 }

function getProperty(obj) {
  let res = {};
  for (let key in obj) {
    let val = obj[key];
    if (typeof val === 'object') {
      let obj1 = getProperty(val);
      for (let k in obj1) {
        res[`${key}.${k}`] = obj1[k];
      }
    } else {
      res[key] = val;
    }
  }
  return res;
}

console.log(getProperty({ a: { b: { c: 1, d: 2 }, e: 3 }, f: { g: 2 } }))