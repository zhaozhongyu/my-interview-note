1. 圆形
```
  width: 100px; height: 100px;
  background: red;
  border-radius: 50%   // 50%以上的值跟50%一样效果
```

2. 椭圆
```
  width: 200px; height: 100px;
  background: red;
  border-radius: 50%;
```

3. 向上三角(其实就是用边框画出的三角, 利用另外的边框挤成的斜边)
```
width: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-bottom: 100px solid red;
```

4. 向下三角
```
width: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-top: 100px solid red;
```

5. 左上三角
```
  width: 0;
  border-top: 100px solid red;
  border-right: 100px solid transparent;
```

6. 弧形尾箭头
```
#curvedarrow {
  position: relative;
  width: 0;
  border-top: 90px solid transparent;
  border-right: 90px solid red;
  transform: rotate(10deg) translateX(100%);
}
#curvedarrow:after {
  content: "";
  position: absolute;
  border: 0 solid transparent;
  border-top: 30px solid red;
  border-radius: 200px 0 0 0;
  top: -120px; left: -90px;
  width: 120px; height: 120px;
  transform: rotate(45deg);
}
```

7. 等边四边形
```
  width: 150px;
  height: 100px;
  transform: skew(20deg);
  background: red;
```

8. 放大镜
```
#magnifying-glass {
  font-size: 10em;
  display: inline-block;
  width: 0.4em; height: 0.4em;
  border: 0.1em solid red;
  position: relative;
  border-radius: 0.35em;
}
#magnifying-glass:before {
  content: "";
  display: inline-block;
  position: absolute;
  right: -0.25em; bottom: -0.1em;
  border-width: 0;
  background: red;
  width: 0.35em; height: 0.08em;
  transform: rotate(45deg);
}
```

9. 月亮
```
width: 80px; height: 80px;
  border-radius: 50%;
  box-shadow: 15px 15px 0 0 red;
```

10. 圆锥体
```
width: 0; height: 0;
  border-left: 70px solid transparent;
  border-right: 70px solid transparent;
  border-top: 100px solid red;
  border-radius: 50%;
```

11. 十字
```
#cross {
  background: red;
  width: 20px; height: 100px;
  position: relative;
}
#cross:after {
  background: red;
  content: "";
  width: 100px; height: 20px;
  position: absolute;
  left: -40px; top: 40px;
}
```
