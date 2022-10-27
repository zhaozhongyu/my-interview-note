## 问题
默认情况下，JS 运算、页面布局和页面绘制都是运行在浏览器的主线程当中，他们之间是互斥的关系。如果 JS 运算持续占用主线程，页面就没法得到及时的更新。当我们调用setState更新页面的时候，React 会遍历应用的所有节点，计算出差异，然后再更新 UI。整个过程是一气呵成，不能被打断的。如果页面元素很多，整个过程占用的时机就可能超过 16 毫秒，就容易出现掉帧的现象。

## 解题思路
解决主线程长时间被 JS 运算占用这一问题的基本思路，是将运算切割为多个步骤，分批完成。也就是说在完成一部分任务之后，将控制权交回给浏览器，让浏览器有时间进行页面的渲染。等浏览器忙完之后，再继续之前未完成的任务。

旧版 React 通过递归的方式进行渲染，使用的是 JS 引擎自身的函数调用栈，它会一直执行到栈空为止。而Fiber实现了自己的组件调用栈，它以链表的形式遍历组件树，可以灵活的暂停、继续和丢弃执行的任务。实现方式是使用了浏览器的requestIdleCallback这一 API。

## 结果
React 框架内部的运作可以分为 3 层：

* Virtual DOM 层，描述页面长什么样。
* Reconciler 层，负责调用组件生命周期方法，进行 Diff 运算等。
* Renderer 层，根据不同的平台，渲染出相应的页面，比较常见的是 ReactDOM 和 ReactNative。


Fiber 其实指的是一种数据结构，它可以用一个纯 JS 对象来表示：

```
const fiber = {
    stateNode,    // 节点实例
    child,        // 子节点
    sibling,      // 兄弟节点
    return,       // 父节点
}
```
Fiber Reconciler 每执行一段时间，都会将控制权交回给浏览器，可以分段执行.

为了达到这种效果，就需要有一个调度器 (Scheduler) 来进行任务分配。任务的优先级有六种：

* synchronous，与之前的Stack Reconciler操作一样，同步执行
* task，在next tick之前执行
* animation，下一帧之前执行
* high，在不久的将来立即执行
* low，稍微延迟执行也没关系
* offscreen，下一次render时或scroll时才执行

优先级高的任务（如键盘输入）可以打断优先级低的任务（如Diff）的执行，从而更快的生效。

Fiber Reconciler 在执行过程中，会分为 2 个阶段

阶段一 Reconcilition Phase(调和阶段)，生成 Fiber 树，得出需要更新的节点信息。这一步是一个渐进的过程，可以被打断。
阶段二 Commit Phase(交付阶段)，将需要更新的节点一次过批量更新，这个过程不能被打断。

更新任务分成俩个阶段，Reconcilition Phase(调和阶段)和Commit Phase(交付阶段)。Reconciliation Phase的任务干的事情是，找出要做的更新工作(Diff Fiber Tree),就是一个计算阶段，计算结果可以被缓存，也就可以被打断；Commit Phase需要提交所有更新并渲染，为了防止页面抖动，被设置为不能打断。

componentWillReceiveProps componentWillUpdate 几个生命周期方法，在Reconciliation Phase被调用，有被打断的可能（时间用尽等情况），所以可能被多次调用

## Fiber树
Fiber Reconciler 在阶段一进行 Diff 计算的时候，会生成一棵 Fiber 树。这棵树是在 Virtual DOM 树的基础上增加额外的信息来生成的，它本质来说是一个链表。

Fiber 树在首次渲染的时候会一次过生成。在后续需要 Diff 的时候，会根据已有树和最新 Virtual DOM 的信息，生成一棵新的树。这颗新树每生成一个新的节点，都会将控制权交回给主线程，去检查有没有优先级更高的任务需要执行。如果没有，则继续构建树的过程

如果过程中有优先级更高的任务需要进行，则 Fiber Reconciler 会丢弃正在生成的树，在空闲的时候再重新执行一遍。

在构造 Fiber 树的过程中，Fiber Reconciler 会将需要更新的节点信息保存在Effect List当中，在阶段二执行的时候，会批量更新相应的节点。


## Fiber的执行流程
1. 用户操作引起setState被调用以后，先调用enqueueSetState方法，该方法可以划分成俩个阶段（个人理解），第一阶段Data Preparation，是初始化一些数据结构，比如fiber，updateQueue，update。
2. 新的update会通过insertUpdateIntoQueue方法，根据优先级插入到队列的对应位置，ensureUpdateQueues方法初始化俩个更新队列，queue1和current.updateQueue对应，queue2和current.alternate.updateQueue对应。
3. 第二阶段，Fiber Reconciler，就开始进行任务分片调度，scheduleWork首先更新每个fiber的优先级，这里并没有updatePriority这个方法，但是干了这件事。当fiber.return === null，找到父节点，把所有diff出的变化(side effect)归结到root上。
4. requestWork，首先把当前的更新添加到schedule list中(addRootToSchedule),然后根据当前是否为异步渲染(isAsync参数)，异步渲染调用。scheduleCallbackWithExpriation方法，下一步高能！！
5. scheduleCallbackWithExpriation这个方法在不同环境，实现不一样，chrome等浏览器中使用requestIdleCallback API，没有这个API的浏览器中，通过requestAnimationFrame模拟一个requestIdCallback，来在浏览器空闲时，完成下一个分片的工作，注意，这个函数会传入一个expirationTime，超过这个时间活没干完，就放弃了。
6. 执行到performWorkOnRoot，就是fiber文档中提到的Commit Phase和Reconciliation Phase俩阶段。
7. 第一阶段Reconciliation Phase,在workLoop中，通过一个while循环，完成每个分片任务。
8. performUnitOfWork也可以分成俩阶段，蓝色框表示。beginWork是一个入口函数，根据workInProgress的类型去实例化不同的react element class。workInProgress是通过alternate挂载一些新属性获得的。
9. 实例化不同的react element class时候会调用和will有关的生命周期方法。
10. completeUnitOfWork是进行一些收尾工作，diff完一个节点以后，更新props和调用生命周期方法等。
11. 然后进入Commit Phase阶段，这个阶段不能被打断。
