* webpack介绍；webpack做了什么
* webpack整个生命周期；webpack打包的过程
* dev-server怎么跑起来的
* webpack插件是怎么实现的
* 使用过webpack哪些plugin/loader；webpack常用的plugin
* loader/plugin有什么区别
* 一般怎么组织CSS；配css需要哪些loader
* webpack如何配sass，需要配哪些loader
* 如何把js、css、html单独打包成一个文件
* 打包时hash码是怎么生成的
* 如何实现分模块打包；

https://webpack.wuhaolin.cn/5%E5%8E%9F%E7%90%86/5-4%E7%BC%96%E5%86%99Plugin.html

-----
## webpack做了什么
webpack本质上就是一个将我们平时写的模块化代码转成现在浏览器可以直接执行的代码

## dev-server怎么跑起来的
webpack-dev-server 可以作为命令行工具使用，核心模块依赖是 webpack 和 `webpack-dev-middleware`。webapck-dev-server 负责启动一个 express 服务器监听客户端请求；实例化 webpack compiler；启动负责推送 webpack 编译信息的 webscoket 服务器；负责向 bundle.js 注入和服务端通信用的 webscoket 客户端代码和处理逻辑。webapck-dev-middleware 把 webpack compiler 的 outputFileSystem 改为 in-memory fileSystem；启动 webpack watch 编译；处理浏览器发出的静态资源的请求，把 webpack 输出到内存的文件响应给浏览器。

每次 webpack 编译完成后向客户端广播 ok 消息，客户端收到信息后根据是否开启 hot 模式使用 liveReload 页面级刷新模式或者 hotReload 模块热替换。hotReload 存在失败的情况，失败的情况下会降级使用页面级刷新。
关键是: 监听文件变化, 以及向客户端广播消息.

## webpack插件是怎么实现的
在 Webpack 运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在合适的时机通过 Webpack 提供的 API 改变输出结果

Webpack 启动后，在读取配置的过程中会先执行 new BasicPlugin(options) 初始化一个 BasicPlugin 获得其实例。 在初始化 compiler 对象后，再调用 basicPlugin.apply(compiler) 给插件实例传入 compiler 对象。 插件实例在获取到 compiler 对象后，就可以通过 compiler.plugin(事件名称, 回调函数) 监听到 Webpack 广播出来的事件。 并且可以通过 compiler 对象去操作 Webpack。

1. Webpack 运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在合适的时机通过 Webpack 提供的 API 改变输出结果

一个 JavaScript 函数或 JavaScript 类，用于承接这个插件模块的所有逻辑；
在它原型上定义的 apply 方法，会在安装插件时被调用，并被 webpack compiler 调用一次；
指定一个触及到 webpack 本身的事件钩子，即下文会提及的 hooks，用于特定时机处理额外的逻辑；
对 webpack 实例内部做一些操作处理；
在功能流程完成后可以调用 webpack 提供的回调函数；

## 如何把js、css、html单独打包成一个文件


## tree-shaking 原理
可以理解为通过工具"摇"我们的JS文件，将其中用不到的代码"摇"掉，是一个性能优化的范畴, 
Tree-shaking的本质是消除无用的js代码。无用代码消除在广泛存在于传统的编程语言编译器中，编译器可以判断出某些代码根本不影响输出，然后消除这些代码，这个称之为DCE.
-----


### loader
1. loader本质上就是把传入的文件内容解析并转换成新的内容, 传给下一个loader



## webpack 配置项
* entry webpack的执行构建入口
* output webpack打包的输出配置, 包含文件名, 位置等
* chunk 代码块, 用于代码合并和分割
* bundle：资源经过Webpack 流程解析编译后最终结输出的成果文件
* loader：默认情况下，webpack仅支持.js .json文件，通过loader，可以让它解析其他类型的文件，充当翻译官的角色。理论上只要有相应的loader，就可以处理任何类型的文件。
* plugin：loader主要的职责是让webpack认识更多的文件类型，而plugin的职责则是让其可以控制构建流程，从而执行一些特殊的任务。插件的功能非常强大，可以完成各种各样的任务
* mode: 打包环境, 如production

### 常见loader
* style-loader
* css-loader
* less-loader
* ts-loader
* babel
* file-loader
* eslint-loader

### 常见plugin
* htmlWebpackPlugin
* CopyWebpackPlugin 拷贝文件用
* 