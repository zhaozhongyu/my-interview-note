// https://www.nowcoder.com/discuss/676338?source_id=discuss_experience_nctrack&channel=-1

// 实现一个复杂度o(n)的数组去重，返回去重后的元素个数，不能使用任何数组相关的方法
let list = []
let set = new Set();
let count = 0;
for (const item of list) {
  if (!set.has(item)) {
    set.add(item);
    count++;
  }
}

// 实现一个斐波那契数列，时间复杂度、空间复杂度
let obj = {}
obj[0] = 1;
obj[1] = 1;
// 递归, 空间复杂度O(n), 时间复杂度o(n)
function fab(num) {
  if (obj[num]) {
    return obj[num];
  }
  obj[num] = fab(num - 1) + fab(num - 2);
  return obj[num];
}
// 迭代 空间复杂度o(1), 时间复杂度o(n)
function fab2(num) {
  let last1 = 1, last2 = 1;
  let res = 1;
  for (let i = 2; i <= num; i++) {
    res = last1 + last2;
    last2 = last1;
    last1 = res;
  }
  return res;
}
