﻿WebSockets 是一种先进的技术。它可以在用户的浏览器和服务器之间打开交互式通信会话。使用此API，您可以向服务器发送消息并接收事件驱动的响应，而无需通过轮询服务器的方式以获得响应。

接口
WebSocket
用于连接WebSocket服务器的主要接口，之后可以在这个连接上发送 和接受数据。
CloseEvent
连接关闭时WebSocket对象发送的事件。
MessageEvent
当从服务器获取到消息的时候WebSocket对象触发的事件。