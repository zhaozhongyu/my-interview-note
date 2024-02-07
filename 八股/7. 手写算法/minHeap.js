/**
 * @description 最小堆
 */
class MinHeap {
  heap = []; // 通常是将一个最小堆存放到数组中

  constructor(list /** number[] */) {
    if (list) {
      this.build_max_heap(list);
    }
  }

  // 获取父节点的下标
  getParent(cur) {
    return Math.floor((cur - 1) / 2);
  }

  // 左子节点
  getLeft(cur) {
    return cur * 2 + 1;
  }

  // 右子节点
  getRight(cur) {
    return cur * 2 + 2;
  }

  // 将已有的列表转换为最小堆
  // 堆的转换: 从最后一个非叶子节点开始，逐个将每个子树转换成一个最小堆，直到根节点也转换完成，则整棵树变成了一个最小堆。
  /**
   * @param {number[]} list 
   */
  build_max_heap(list /** number[] */) {
    this.heap = [...list];
    let n = this.heap.length;
    let startIndex = Math.floor((n - 2) / 2);
    for (let i = startIndex; i >= 0; i--) {
      let root = i;
      let temp = this.heap[root];
      let j = this.getLeft(root);
      while(j <= n - 1) {
        if (j < n-1 && this.heap[j] > this.heap[j+1]) j++; // 如果右节点比左节点小, j设为右节点
        if (temp <= this.heap[j]) {
          break; 
        } else {
          this.heap[root] = this.heap[j]; // 小的值上移
          root = j; // 继续维护下一个节点
          j = this.getLeft(root); // 重新计算左子节点
        }
      }
      this.heap[root] = temp;
    }
  }

  // 插入一个新的值, 插入时, 把n插入到heap的最后一个值中, 然后, 自底向上浮起
  /**
   * @param {number} n 
   */
  push(n /** number */) {
    this.heap.push(n);
    let cur = this.heap.length - 1;
    let parent = this.getParent(cur);
    while (parent >= 0) {
      if (this.heap[parent] < n) {
        break;
      }
      this.heap[cur] = this.heap[parent];
      this.heap[parent] = n;
      cur = parent;
      parent = this.getParent(cur);
    }
  }

  // 弹出第一个头结点后, 把heap中的最后一个值放到头中, 然后从上到下维护一次堆
  /**
   * 
   * @returns {number}
   */
  pop() {
    let ret = this.heap.shift();
    if (this.heap.length > 1) {
      this.heap.unshift(this.heap.pop());
      let n = this.heap.length;
      let root = 0;
      let temp = this.heap[root];
      let j = this.getLeft(root);
      while(j <= n - 1) {
        if (j < n-1 && this.heap[j] > this.heap[j+1]) j++; // 如果右节点比左节点小, j设为右节点
        if (temp <= this.heap[j]) {
          break; 
        } else {
          this.heap[root] = this.heap[j]; // 小的值上移
          root = j; // 继续维护下一个节点
          j = this.getLeft(root); // 重新计算左子节点
        }
      }
      this.heap[root] = temp;
    }
    return ret;
  }

  // 返回堆头
  /**
   * @return {number}
   */
  get head() {
    return this.heaplist[0];
  }

  /**
   * @return {number}
   */
  get size() {
    return this.heaplist.length;
  }

  toString() {
    return JSON.stringify(this.heap);
  }
}

// let h = new MinHeap([24, 22, 17, 23, 5, 4,67,68]);
// h.push(3);
// h.push(2);
// h.pop()
// console.log(h.toString());