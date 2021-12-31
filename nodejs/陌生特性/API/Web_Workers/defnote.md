### 简单多线程
通过使用Web Workers，Web应用程序可以在独立于主线程的后台线程中，运行一个脚本操作。这样做的好处是可以在独立线程中执行费时的处理任务，从而允许主线程（通常是UI线程）不会因此被阻塞/放慢。

Web Workers 概念与用法
使用构造函数（例如,Worker()）创建一个 worker 对象, 构造函数接受一个 JavaScript文件URL — 这个文件包含了将在 worker 线程中运行的代码。worker 将运行在与当前 window不同的另一个全局上下文中，这个上下文由一个对象表示，标准情况下为DedicatedWorkerGlobalScope （标准 workers 由单个脚本使用; 共享workers使用SharedWorkerGlobalScope (en-US)）。

你可以在worker 线程中运行任意的代码，但注意存在一些例外：直接在 worker 线程中操纵 DOM 元素；或使用window 对象中的某些方法和属性。大部分 window 对象的方法和属性是可以使用的，包括 WebSockets，以及诸如 IndexedDB 和 FireFox OS 中独有的 Data Store API 这一类数据存储机制。更多信息请参见： Functions and classes available to workers 。

主线程和 worker 线程相互之间使用 postMessage() 方法来发送信息, 并且通过 onmessage 这个 event handler来接收信息（传递的信息包含在 Message 这个事件的data属性内) 。数据的交互方式为传递副本，而不是直接共享数据。

worker 可以另外生成新的 worker，这些 worker 与它们父页面的宿主相同。 此外，worker 可以通过 XMLHttpRequest 来访问网络，只不过 XMLHttpRequest 的 responseXML 和 channel 这两个属性的值将总是 null 。

http://www.ruanyifeng.com/blog/2018/07/web-worker.html