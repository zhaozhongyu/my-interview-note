Background Tasks API
幕后任务协作调度 API (也叫幕后任务 API 或者简单称为 requestIdleCallback() API) 提供了由用户代理决定，在空闲时间自动执行队列任务的能力。


概念和用法
浏览器的主线程以其事件循环队列为中心。此代码渲染 Document 上待更新展示的内容，执行页面待运行的 JavaScript 脚本，接收来自输入设备的事件，以及分发事件给需要接收事件的元素。此外，事件循环队列处理与操作系统的交互、浏览器自身用户界面的更新等等。这是一个非常繁忙的代码块，您的主要 JavaScript 代码可能会和这些代码一起也在这个线程中执行。当然，大多数（不是所有）能够更改 DOM 的代码都在主线程中运行，因为用户界面更改通常只对主线程可用。

因为事件处理和屏幕更新是用户关注性能最明显的两种方式。对于您的代码来说，防止在事件队列中出现卡顿是很重要的。在过去，除了编写尽可能高效的代码和将尽可能多的工作移交给 workers 之外，没有其他可靠的方法可以做到这一点。 Window.requestIdleCallback() 允许浏览器告诉您的代码可以安全使用多少时间而不会导致系统延迟，从而有助于确保浏览器的事件循环平稳运行。如果您保持在给定的范围内，您可以使用户体验更好。

https://zhuanlan.zhihu.com/p/60189423

requestIdleCallback 的缺陷
requestIdleCallback is called only 20 times per second - Chrome on my 6x2 core Linux machine, it's not really useful for UI work。—— from Releasing Suspense
也就是说 requestIdleCallback 的 FPS 只有 20, 这远远低于页面流畅度的要求！(一般 FPS 为 60 时对用户来说是感觉流程的, 即一帧时间为 16.7 ms), 这也是 React 需要自己实现 requestIdleCallback 的原因。