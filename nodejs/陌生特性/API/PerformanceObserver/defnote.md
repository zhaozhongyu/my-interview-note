```
var observer = new PerformanceObserver(function(list) {
    var perfEntries = list.getEntries();
    for (var i = 0; i < perfEntries.length; i++) {
        // Process long task notifications:
        // report back for analytics and monitoring
        // ...
    }
});
// register observer for long task notifications
observer.observe({entryTypes: ["longtask"]});
// Long script execution after this will result in queueing
// and receiving "longtask" entries in the observer.
```

长任务（Long task）
任何连续不间断的且主UI线程繁忙50毫秒及以上的时间区间。比如以下常规场景：

长耗时的事件回调（long running event handlers）
代价高昂的回流和其他重绘（expensive reflows and other re-renders）
浏览器在超过50毫秒的事件循环的相邻循环之间所做的工作（work the browser does between different turns of the event loop that exceeds 50 ms）
浏览上下文的罪魁容器
浏览上下文的罪魁容器，简称“容器”，指任务发生在其中的顶层页面（the top level page）、iframe、嵌入插槽（embed）或对象（object）。

清单（Attributions）
即执行任务的容器清单。针对没有在顶层页面容器内执行的任务，containerId、containerName和containerSrc字段可以用来提供任务源信息。


#### 没用, 返回值看不出是哪个地方耗时过长
