/**
 * 深拷贝一个值, 支持循环引用.
 * @param value
 */
 function cloneDeep(value){
  /**
   * 判断是否是基本数据类型
   * @param value
   */
  function isPrimitive(value){
    return (typeof value === 'string' || 
    typeof value === 'number' || 
    typeof value === 'symbol' ||
    typeof value === 'boolean')
  }

  /**
   * 判断是否是一个js对象
   * @param value
   */
  function isObject(value){
    return Object.prototype.toString.call(value) === "[object Object]"
  }
  const m = new WeakMap();
  
  // 记录被拷贝的值，避免循环引用的出现
  // 如果是基本数据类型，则直接返回
  function cloneObject(value, target) {
    for (let i in value) {
      target[i] = baseClone(value[i]);
    }
  }
  
  function baseClone(value) {
    let ret;
    if(isPrimitive(value)){
      return value;
    // 如果是引用数据类型，我们浅拷贝一个新值来代替原来的值
    }else if(Array.isArray(value)){
      res = [...value];
    }else if(isObject(value)){
      res = {...value};
    }
  
    // 检测我们浅拷贝的这个对象的属性值有没有是引用数据类型。如果是，则递归拷贝
    Reflect.ownKeys(res).forEach(key=>{
      if(typeof res[key] === "object" && res[key]!== null){
        //此处我们用m来记录已经被拷贝过的引用地址。以此来解决循环引用的问题
        if(m.has(res[key])){
          res[key] = m.get(res[key]);
        }else {
          const target = Array.isArray(res[key]) ? [] : {}; // 这里记录的是新的引用
          m.set(res[key], target);
          cloneObject(res[key], target);
          res[key] = target;
        }
      }
    })
  
    return res; 
  }

  return baseClone(value);
}