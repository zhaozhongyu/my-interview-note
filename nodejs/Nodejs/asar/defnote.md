方案0:
1. 修改asar的结构, 用rsa加密aes key放在header中, 用aes加密header和各个文件
2. 修改archive.cc的读取asar的代码, 读取时进行解密
3. 优点是优雅, 对方近乎无法破解查看到源码, 因为使用了rsa加密, 几乎无法篡改源码(唯一的漏洞在于对方直接修改electron内核), 缺点在于难度较大, 改起来对两边的加解密需要同步



方案1
1. 不加密html和css, js在解密后使用executeJavaScript执行, 通过使用node文件来进行加解密操作
2. 

1. asar.js 中封装了fs方法, hook _compile 的api



electron的修改:
1. 修改`electron/lib/common/asar.js` 读取asar头并解密


在`third_party/electron_node/src/node_crypto.cc`中定义了js的crypto的方法
html中的script标签会走`asar_url_loader.cc`中的方法

1. `electron/shell/common/asar/archive.cc` 定义初始化asar头的方法
2. `electron/shell/common/api/electron_api_asar.cc` 中定义api方法
1. `electron/lib/common/asar.js` 封装了fs读取asar的方法
2. `electron\shell\browser\api\electron_api_web_contents.cc` 定义loadurl等方法
2. `electron/shell/browser/net/asar/asar_url_loader.cc` 在html中的script标签引入和loadUrl时会调用   (总入口)
3. `third_party/electron_node/src/node_crypto.cc`中定义了js的crypto的方法




`asar_url_loader.cc ` -- 
  `mojo/public/cpp/system/file_data_source.h` 定义setRange 文件偏移和大小, Read读取文件到buffer, 不管是不是asar, 最终都会走`file_data_source.cc -> Read` 方法读取file数据, 并且, 第一次读取1024字节, 然后每次读取65536字节
 进入`data_pipe.h`, 使用DataPipeProducer.write写入从file_data_source中读出的数据, 并且在使用时, DataPipeConsumer.Read 读出管道中的数据使用


AES加密是以每16个字节进行加密的, 也可以分段解密, 但是必须要在不足16位时补足16位