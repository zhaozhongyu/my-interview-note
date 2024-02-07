class Node {
  constructor(val, prev, next) {
    this.val = val;
    this.prev = prev;
    this.next = next;
  }
}

/// 使用双向链表实现lru, size控制暂不加
class LRUCache {
  constructor(size) {
    this.size = size;
    this.map = {};
    // 建立一个空双向链表
    let head = new Node('');
    let tail = new Node('', head);
    head.next = tail;
  }

  get(key) {
    let node = this.map[key];
    // 抽出来
    node.prev.next = node.next;
    node.next.prev = node.prev;

    node.next = head.next;
    node.prev = head;
    head.next = node;
    node.next.prev = node;
    return node.val;
  }

  set(key, val) {
    let node = new Node(val, head);
    node.next = head.next;
    head.next = node;
    node.next.prev = node;
    this.map[key] = node;
  }
}