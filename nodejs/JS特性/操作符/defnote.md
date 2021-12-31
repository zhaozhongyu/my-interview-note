`...` 运算符， 是ES6里一个新引入的运算法， 也叫展开/收集运算符

基础用法1：展开
const a = [2, 3, 4]
const b = [1, ...a, 5]
console.log(b);// [1, 2, 3, 4, 5]

基础用法2：收集
function foo(a, b, ...c) {
    console.log(a, b, c)
}
foo(1, 2, 3, 4, 5); // 1, 2, [3, 4, 5]

基础用法3：把类数组转换为数组
const nodeList = document.getElementsByClassName("test");
const array = [...nodeList];

基础用法5：为对象新增属性
const obj = { name: 'jack', age: 30 }
const result = { ...obj, sex: '男', height: '178cm' }
console.log(result); // {name: "jack", age: 30, sex: "男", height: "178CM"}

基础用法6：合并数组或数组对象
const a = [1, 2, 3];
const b = [4, 5, 6];
const result = [...a, ...b]; //  [1, 2, 3, 4, 5, 6] 

基础用法7：合并对象
const people = {
    name: 'Lucy',
    age: 30,
    sex: '女'
};
const base = {
    age: 22,
    job: 'teacher',
    height: '168cm'
}
const all = { ...people, ...base }; 
console.log(all); // {name: "Lucy", age: 22, sex: "女", job: "teacher", height: "168cm"}

高级用法1：复制引用类型的数据
const people = {
    name: 'Lucy',
    age: 30,
    sex: '女',
    hobbies: ['play games', 'basketball', 'swim']
};
const result = { ...people, ...people.hobbies };

