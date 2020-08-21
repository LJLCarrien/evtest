# evtest

> An electron-vue project

#### Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev
```


#### 1 环境搭建

方法1
```bash
npm install vue-cli -g
```

方法2

```bash
cnpm install -g @vue/cli
```



#### 2 下载模板

```bash
cnpm install simulatedgreg/electron-vue --save-dev
```



#### 3 创建项目

```bash
vue init simulatedgreg/electron-vue evtest
```

Use Sass /Scss ? yes (no了一次发现css样式都无效了我哭)

Use lint with EsLint ?No （对新手不友好，我选了no)

#### 4 应用

**应用1：实现长按按钮+-输入框数字自增自减。按下的鼠标移出2个按钮范围无视按钮+-属性，往上拖增加，往下拖减少**

参考 [vue中父组件调用子组件的方法](https://www.cnblogs.com/gitByLegend/p/10868538.html)

参考 [按下鼠标并拖到按钮外松开，如何触发click事件？](https://blog.csdn.net/epy007/article/details/84759574)

参考 [用鼠标按下事件和鼠标松开事件实现长按事件](https://blog.csdn.net/weixin_44569835/article/details/88947979)

参考 [VUE长按事件](https://www.cnblogs.com/clm960227/p/7685758.html)

参考[vue组件：input数字输入框](https://www.cnblogs.com/ddkei/p/9485927.html)

