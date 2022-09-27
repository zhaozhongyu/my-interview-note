function deepCopy1(obj) {
  // 先判断是对象还是数组
  let copy = obj instanceof Array ? [] : {};
  for (let key in obj) {
    // 判断是否是对象上的属性，而不是原型上的属性
    if (obj.hasOwnProperty(key)) {
      // obj[key] 是否是对象，如果是对象，递归遍历
      copy[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
    }
  }
  return copy;
}


function deepCopy(obj) {
  let map = new WeakMap();
  let deepCopy1 = (obj) => {
    if (typeof obj !== 'object') {
      return obj;
    }
    if (obj instanceof Date) {
      return new Date(obj);
    } else if (obj === null) {
      return null;
    }
    if (map.has(obj)) {
      return map.get(obj);
    }
    let copy = obj instanceof Array ? [] : {};
    map.set(obj, copy);
    for (let key in obj) {
      // 判断是否是对象上的属性，而不是原型上的属性
      if (obj.hasOwnProperty(key)) {
        // obj[key] 是否是对象，如果是对象，递归遍历
        copy[key] = typeof obj[key] === 'object' ? deepCopy1(obj[key]) : obj[key];
      }
    }
    return copy;
  };
  return deepCopy1(obj);
}

const obj1 = {
  x: 1
}
obj1.z = obj1;

const obj2 = {
  x: 2
}

obj1.next = obj2;
obj2.next = obj1;


const obj3 = deepCopy(obj1);

console.log(obj3)