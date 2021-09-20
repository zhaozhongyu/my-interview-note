## 无状态
什么是无状态呢？
就是说这一次请求和上一次请求是没有任何关系的，互不认识的，没有关联的。这种无状态的的好处是快速。

## cookie
一个cookie就是存储在用户主机浏览器中的一小段文本文件。Cookies是纯文本形式，它们不包含任何可执行代码。一个Web页面或服务器告之浏览器来将这些信息存储并且基于一系列规则在之后的每个请求中都将该信息返回至服务器. Web服务器之后可以利用这些信息来标识用户。

通过HTTP的Set-Cookie消息头，Web服务器可以指定存储一个cookie。Set-Cookie消息的格式如下面的字符串（中括号中的部分都是可选的）

Set-Cookie:value [ ;expires=date][ ;domain=domain][ ;path=path][ ;secure]
* expires，其指定了cookie何时不会再被发送到服务器端的，因此该cookie可能会被浏览器删掉。该选项所对应的值是一个格式为Wdy,DD-Mon--YYYY HH:MM:SS GMT的值, 在没有expires选项时，cookie的寿命仅限于单一的会话中。为了要将一个持久化cookie变为一个会话cookie，你必须删除这个持久化cookie，这只要设置它的失效日期为过去某个时间之后再创建一个同名的会话cookie就可以实现
* domain，指示cookie将要发送到哪个域或那些域中。默认情况下，domain会被设置为创建该cookie的页面所在的域名。 domain设置的值必须是发送Set-Cookie消息头的域名。
* path指明了在发Cookie消息头之前必须在请求资源中存在一个URL路径, path属性的默认值是发送Set-Cookie消息头所对应的URL中的path部分
* 最后一个选项是secure。不像其它选项，该选项只是一个标记并且没有其它的值。一个secure cookie只有当请求是通过SSL和HTTPS创建时，才会发送到服务器端。默认情况下，在HTTPS链接上传输的cookies都会被自动添加上secure选项。

cookie会被浏览器自动删除，通常存在以下几种原因：

* 会话cooke(Session cookie)在会话结束时（浏览器关闭）会被删除
* 持久化cookie（Persistent cookie）在到达失效日期时会被删除
* 如果浏览器中的cookie限制到达，那么cookies会被删除以为新建cookies创建空间。
发向服务器的所有cookies的最大数量（空间）仍旧维持原始规范中所指出的：4KB

通过访问document.cookie返回的cookies遵循发向服务器的cookies一样的访问规则。要通过Javascript访问cookies，该页面和cookies必须在相同的域中，有相同的path，有相同的安全级别。
注意：一旦cookies通过Javascript设置后遍不能提取它的选项，所以你将不会知道domain，path，expiration日期或secure标记。

HTTP-Only cookies HTTP-Only背后的意思是告之浏览器该cookie绝不应该通过Javascript的document.cookie属性访问。
SameSite Cookie 允许服务器要求某个cookie在跨站请求时不会被发送，从而可以阻止跨站请求伪造攻击.

设置withCredentials为true即可让该跨域请求携带 Cookie

* Access-Control-Allow-Credentials
只设置客户端当然是没用的，还需要目标服务器接受你跨域发送的 Cookie。 否则会被浏览器的同源策略挡住。服务器同时设置Access-Control-Allow-Credentials响应头为"true"， 即可允许跨域请求携带 Cookie。

* Access-Control-Allow-Origin
除了Access-Control-Allow-Credentials之外，跨域发送 Cookie 还要求 Access-Control-Allow-Origin不允许使用通配符。 事实上不仅不允许通配符，而且只能指定单一域名，否则，浏览器还是会挡住跨域请求。
## session
首先，客户端会发送一个http请求到服务器端。
服务器端接受客户端请求后，建立一个session，并发送一个http响应到客户端，这个响应头，其中就包含Set-Cookie头部。该头部包含了sessionId。

## token
token 也称作令牌，由uid+time+sign[+固定参数]
token 的认证方式类似于临时的证书签名, 并且是一种服务端无状态的认证方式, 非常适合于 REST API 的场景. 所谓无状态就是服务端并不会保存身份认证相关的数据。

组成
* uid: 用户唯一身份标识
* time: 当前时间的时间戳
* sign: 签名, 使用 hash/encrypt 压缩成定长的十六进制字符串，以防止第三方恶意拼接
* 固定参数(可选): 将一些常用的固定参数加入到 token 中是为了避免重复查库

存放
token在客户端一般存放于localStorage，cookie，或sessionStorage中。在服务器一般存于数据库中

token认证流程
token 的认证流程与cookie很相似

用户登录，成功后服务器返回Token给客户端。
客户端收到数据后保存在客户端
客户端再次访问服务器，将token放入headers中
服务器端采用filter过滤器校验。校验成功则返回请求数据，校验失败则返回错误码

特点：
* 服务端无状态化、可扩展性好
* 支持移动端设备
* 安全
* 支持跨程序调用

### cookie保存在浏览器端，session保存在服务器端.
* cookie机制：如果不在浏览器中设置过期时间，cookie被保存在内存中，生命周期随浏览器的关闭而结束，这种cookie简称会话cookie。如果在浏览器中设置了cookie的过期时间，cookie被保存在硬盘中，关闭浏览器后，cookie数据仍然存在，直到过期时间结束才消失
* session机制：当服务器收到请求需要创建session对象时，首先会检查客户端请求中是否包含sessionid。如果有sessionid，服务器将根据该id返回对应session对象。如果客户端请求中没有sessionid，服务器会创建新的session对象，并把sessionid在本次响应中返回给客户端。通常使用cookie方式存储sessionid到客户端，在交互中浏览器按照规则将sessionid发送给服务器。如果用户禁用cookie，则要使用URL重写，可以通过response.encodeURL(url) 进行实现；API对encodeURL的结束为，当浏览器支持Cookie时，url不做任何处理；当浏览器不支持Cookie的时候，将会重写URL将SessionID拼接到访问地址后。
* 存储内容：cookie只能保存字符串类型，以文本的方式；session通过类似与Hashtable的数据结构来保存，能支持任何类型的对象(session中可含有多个对象)