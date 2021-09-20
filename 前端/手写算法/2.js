// https://www.nowcoder.com/discuss/653298?source_id=discuss_experience_nctrack&channel=-1

// 约定：
// title数据类型为String
// userId为主键，数据类型为Number
var data = [
  {userId: 8,  title: 'title1'},
  {userId: 11, title: 'other'},
  {userId: 15, title: null},
  {userId: 19, title: 'title2'}
];
var find = function(origin) {
  // your code are here...
  origin.__proto__.where = function () {
    for ()
    return this;
  }
  origin.__proto__.orderBy = function () {

    return this;
  }
  return origin;
}
// 查找 data 中，符合条件的数据，并进行排序
var result = find(data).where({
  'title': /\d$/
}).orderBy('userId', 'desc');
 
console.log(result);// [{ userId: 19, title: 'title2'}, { userId: 8, title: 'title1' }];