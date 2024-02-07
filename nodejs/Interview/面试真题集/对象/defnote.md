1. class 使用 ES5 来实现。
```
function Animal(name) {
  this.name = name;
}

Animal.prototype.bark = function (msg) {
  console.log(`${this.name}'s bark: ${msg}`);
};

function Cat(name, color) {
  this.color = color;
  Animal.call(this, name);
}

Cat.prototype = Object.create(Animal.prototype);
Cat.prototype.constructor = Cat;
Cat.prototype.getColor = function () {
  console.log(`${this.name}'s color: ${this.color}`);
};

const tom = new Cat("tom", "red");
tom.bark("miao, miao");
tom.getColor();
```

2. 实现Promise.all
```
Promise.all = function(arr) {
  if(Array.isArray(arr)) {
    throw new Error('参数必须是数组')
  }
  return new Promise((resolve, reject) => {
    const list = []
    arr.forEach(item => {
      this.resolve(item).then((value) => {
        list.push(value)
        if(list.length === arr.length) {
          resolve(list)
        }
      }, (err)=> {
        reject(err)
      })
    })
  })
}
```

3. 实现深拷贝https://jsgodroad.com/questions/detail?id=26

4. 