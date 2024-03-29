## https://zhuanlan.zhihu.com/p/140489744

### 传统diff算法
计算两颗树形结构差异的最优解一直是一个复杂且值得研究的问题，传统的diff算法，需要遍历整棵树的节点然后进行比较，是一个深度递归的过程，运算复杂度常常是O(n^3)

### 优化策略
* DOM节点跨层级的操作不做优化，因为很少这么做，这是针对的tree层级的策略；
* 对于同一个类的组件，会生成相似的树形结构，对于不同类的组件，生成不同的树形结构，这是针对conponent层级的策略；
* 对于同一级的子节点，拥有同层唯一的key值，来做删除、插入、移动的操作，这是针对element层级的策略；

### diff 策略

Web UI 中 DOM 节点跨层级的移动操作特别少，可以忽略不计。（tree diff）
拥有相同类的两个组件将会生成相似的树形结构，拥有不同类的两个组件将会生成不同的树形结构。（component diff）
对于同一层级的一组子节点，它们可以通过唯一 id 进行区分。（element diff）

1、tree diff
两棵树只会对同一层次的节点进行比较。
既然 DOM 节点跨层级的移动操作少到可以忽略不计，React只会对同级节点进行比较。当发现节点已经不存在，则该节点及其子节点会被完全删除掉，不会用于进一步的比较。这样只需要对树进行一次遍历，便能完成整个 DOM 树的比较。

2、component diff
如果是同一类型的组件，按照原策略继续比较 virtual DOM tree。
如果不是，替换整个组件下的所有子节点。

3、element diff
三种方法：插入，移动，删除
INSERT_MARKUP插入，新的 component 类型不在老集合里， 即是全新的节点，需要对新节点执行插入操作。

MOVE_EXISTING移动，在老集合有新 component 类型，且 element 是可更新的类型，这种情况下 prevChild=nextChild，就需要做移动操作，可以复用以前的 DOM 节点。

REMOVE_NODE删除，老 component 类型，在新集合里也有，但对应的 element 不同则不能直接复用和更新，需要执行删除操作，或者老 component 不在新集合里的，也需要执行删除操作。

对于列表的 Diff，节点的 key 有助于节点的重用：

```
_updateChildren: function(nextNestedChildrenElements, transaction, context) {
  var prevChildren = this._renderedChildren;
  var nextChildren = this._reconcilerUpdateChildren(
    prevChildren, nextNestedChildrenElements, transaction, context
  );
  if (!nextChildren && !prevChildren) {
    return;
  }
  var name;
  var lastIndex = 0;
  var nextIndex = 0;
  for (name in nextChildren) {
    if (!nextChildren.hasOwnProperty(name)) {
      continue;
    }
    var prevChild = prevChildren && prevChildren[name];
    var nextChild = nextChildren[name];
    if (prevChild === nextChild) {
      // 移动节点
      this.moveChild(prevChild, nextIndex, lastIndex);
      lastIndex = Math.max(prevChild._mountIndex, lastIndex);
      prevChild._mountIndex = nextIndex;
    } else {
      if (prevChild) {
        lastIndex = Math.max(prevChild._mountIndex, lastIndex);
        // 删除节点
        this._unmountChild(prevChild);
      }
      // 初始化并创建节点
      this._mountChildAtIndex(
        nextChild, nextIndex, transaction, context
      );
    }
    nextIndex++;
  }
  for (name in prevChildren) {
    if (prevChildren.hasOwnProperty(name) &&
        !(nextChildren && nextChildren.hasOwnProperty(name))) {
      this._unmountChild(prevChildren[name]);
    }
  }
  this._renderedChildren = nextChildren;
},
// 移动节点
moveChild: function(child, toIndex, lastIndex) {
  if (child._mountIndex < lastIndex) {
    this.prepareToManageChildren();
    enqueueMove(this, child._mountIndex, toIndex);
  }
},
// 创建节点
createChild: function(child, mountImage) {
  this.prepareToManageChildren();
  enqueueInsertMarkup(this, mountImage, child._mountIndex);
},
// 删除节点
removeChild: function(child) {
  this.prepareToManageChildren();
  enqueueRemove(this, child._mountIndex);
},

_unmountChild: function(child) {
  this.removeChild(child);
  child._mountIndex = null;
},

_mountChildAtIndex: function(
  child,
  index,
  transaction,
  context) {
  var mountImage = ReactReconciler.mountComponent(
    child,
    transaction,
    this,
    this._nativeContainerInfo,
    context
  );
  child._mountIndex = index;
  this.createChild(child, mountImage);
},
```