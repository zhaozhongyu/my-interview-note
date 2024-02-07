事件冒泡会从当前触发的事件目标一级一级往上传递，依次触发，直到document为止。
事件捕获会从document开始触发，一级一级往下传递，依次触发，直到真正事件目标为止。

#### 添加两种监听的方法
        在不使用任何框架的情况下，我们在js中通过addEventListener方法给Dom添加事件监听。这个方法有三个参数可以传递addEventListener(event,fn,useCapture)。event是事件类型click，focus，blur等；fn是事件触发时将执行的函数方法（function）；第三个参数可以不传，默认是false，这个参数控制是否捕获触发。所以我们只穿两个参数时，这个事件是冒泡传递触发的，当第三个参数存在且为true时，事件是捕获传递触发的。

#### 阻止传递
   在不使用任何框架的情况下，我们在js中通过stopPropagation方法阻止事件继续传递。