/**
 * https://blog.csdn.net/LiangXiay/article/details/121421920 3种方法实现
 * 在n个记录中取某一个记录的键值为标准，通常取第一个记录键值为基准，通过一趟排序将待排的记录分为小于或等于这个键值的两个独立的部分，这是一部分的记录键值均比另一部分记录的键值小，然后，对这两部分记录继续分别进行快速排序，以达到整个序列有序
   取当前排序数组的第一个值作为基准值keys，通过一次遍历把数组分为right大于基准值和left小于等于基准值的两部分，然后对两个部分重复以上步骤排序，最后return的时候按照[left,keys,right]的顺序返回
   @param nums {number[]}
   @param left {number}
   @param right {number}
 */

function quickSort(nums, left, right) {
  if (left >= right) {
    return;
  }
  let cur = nums[0];
  let i = left;
  let j = right;
  while(i < j) {
    while(i < j && nums[j] >= cur) j--;
    while(i < j && nums[i] <= cur) i++;
    if(i < j) {
      swap(nums, i, j);
    }
    
  }
  swap(nums, start, i);
  quickSort(nums, start, j - 1);
  quickSort(nums, j + 1, end);
}

function swap(nums, left, right) {
  let temp = nums[left];
  nums[right] = nums[left];
  nums[left] = temp;
}


/**
 * 挖坑法, 这个方法单趟排序的思路是：取最左或最右边的元素为key，假设把这个位置“挖空”，让最右边的q向左走，直到遇到比key小的数，将其放到key的位置，自己的位置变“空”。直到pq相遇，那么这个位置就是最终的坑位，再将key填入这个坑位，就完成了一趟排序。
 */
function partSort(nums, left, right) {
  let key = left;
  let x = nums[left];
  while(left < right) {
    while(left < right && nums[right] >= x) right--;
    nums[key] = nums[right];
    key = right; // 更新位置

    while (left < right && nums[left] <= x) left++;
    nums[key] = nums[left];
    key = left;
  }
  nums[key] = x;
  return key;
}