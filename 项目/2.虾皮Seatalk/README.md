## Seatalk是一个企业IM工具, 支持web版, 并且有一个运行客户端
### 负责模块
* 截图模块
* node-net-ipc
* emoji
* 消息搜索
* 消息发送接收部分需求

### 难题
* 在实现node-net-ipc的时候, electron自身会导致server无法连接
* 在emoji实现时, 对于特定的机器出现emoji裂开的情况

### 架构
#### web
独立完备的web前端页面, 通过判断运行环境的方式决定是否启用客户端能力.

#### 客户端
electron打包的客户端, 用于加载seatalk web页面, 并提供聊天记录保存与搜索, 截图能力.

### 优化
* 消息搜索优化
* 