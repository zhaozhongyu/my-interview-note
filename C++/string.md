1	strcpy(s1, s2);
复制字符串 s2 到字符串 s1。

2	strcat(s1, s2);
连接字符串 s2 到字符串 s1 的末尾。连接字符串也可以用 + 号，例如:
string str1 = "runoob";
string str2 = "google";
string str = str1 + str2;

3	strlen(s1);
返回字符串 s1 的长度。

4	strcmp(s1, s2);
如果 s1 和 s2 是相同的，则返回 0；如果 s1<s2 则返回值小于 0；如果 s1>s2 则返回值大于 0。

5	strchr(s1, ch);
返回一个指针，指向字符串 s1 中字符 ch 的第一次出现的位置。

6	strstr(s1, s2);
返回一个指针，指向字符串 s1 中字符串 s2 的第一次出现的位置。

### 当把string对象和字符字面值及字符串字面值混在一条语句中使用时，必须确保每个加法运算符（+）的两侧的运算对象至少有一个是string. C++语言中的字符串字面值并不是标准库类型string的对象.
### 在执行读取操作时，string对象会自动忽略开头的空白（即空格符、换行符、制表符等）并从第一个真正的字符开始读起，直到遇见下一处空白为止, 可以使用getline读取一整行


## C++语言中的字符串字面值并不是标准库类型string的对象
* isalnum 判断是否字母或数字
* isalpha 判断是否字母
* iscntrl 判断是否控制字符
* isdigit 判断是否数字
* isgraph 不是空格并且可打印时为true
* islower 小写
* isprint 是可打印字符
* ispunct 是标点符号
* isspace 是空格, 制表符, 回车符, 换行符
* isupper 大写
* isxdigit 是十六进制数字
* tolower 转小写
* toupper 转大写


### 如果想要改变string对象中字符的值，必须把循环变量定义成引用类型

## vector 顺序表, 是一个封装了动态大小数组的顺序容器, 可以简单的认为，向量是一个能够存放任意类型的动态数组

### 字符串操作
* strlen 获取长度
* strcmp(p1, p2) 比较相等
* strcat(p1, p2) 附加
* strcpy(p1, p2) p2拷贝给p1, 最好使用strcpy_s(p1, len, p2) 
