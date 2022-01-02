---
title: ARTS-week-35
date: 2020-05-10 15:00:29
tags:
---

## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm： 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

Unique Paths https://leetcode.com/submissions/detail/337271800/

### 2.Review:

https://dev.to/lydiahallie/javascript-visualized-prototypal-inheritance-47co
JavaScript️可视化：原型继承

#### 点评：

Lydia Hallie 通过 JavaScript 对象和方法的例子演示并生动的解释了原型继承这个概念 。

总结：
1. \__proto__是对Dog.prototype对象的引用。这就是原型继承的全部内容：构造函数的每个实例都可以访问构造函数的原型,收益是
为什么每次创建新对象时都创建一个新函数很消耗内存，相反可以将其添加到对象的prototype对象中。
2. 对象的prototype本身是一个对象，实际上就是Object构造函数的实例。这意味着对象的prototype还包含一个__proto__属性，
该属性是对Object.prototype！的引用。所有内置方法的来源都在原型链上可以找到。
3. ES6实际上为构造函数和原型使用了一种更简单的语法：类。类仅是构造函数的语法糖。一切仍然以相同的方式工作！
一个类有一个constructor函数，与用ES5语法编写的构造函数一样。要添加到原型的属性是在类主体本身上定义的。
在扩展类中，可以使用super关键字访问父类的构造函数。父类的构造函数期望的参数，在这种情况下，子类必须传把构造函数参数递给父类。
4. 原型链不会永远持续下去。最终有一个原型等于null的Object.prototype对象：在这种情况下就是对象！如果尝试访问在本地或原型链上找不到的属性，undefined则会返回。

### 3.Tip:


1. 问题：vue-router 去除URL中的 # 号，故使用 history 路由模式，首页能正常访问，但刷新页面后，则出现 404 Not Found。
使用默认 hash 路由模式，在本地与部署线上环境后都没有问题。

分析：和前端路由冲突，需要在后端 Nginx 进行路由重定向。
解决办法：在服务端nginx配置里添加 vue-route 的重定向配置：

``` html
server
{
    listen 80;
    server_name testwx.wangshibo.com;
    index index.php index.html index.htm default.php default.htm default.html;
    root /www/app/dist;

    #vue-router配置
    location / {
        try_files $uri $uri/ @router;
        index index.html;
    }
    location @router {
        rewrite ^.*$ /index.html last;
    }
}

```

2.问题：vue/cli3.0打包后html文件引入的是绝对路径修改成相对路径问题。
分析：在 vue 中配置，通过 webpack 打包动态添加。
      history 路由模式只能在根目录，原理跟问题1相同。
      hash 路由模式可以不再根目录。
解决办法：在 vue.config.js 配置：

``` JavaScript

module.exports = {
  publicPath: "相对目录名"
};

```

3.问题：把 vue 打包的文件整合到 springboot 工程
分析：使用 springboot 静态资源机制
     只支持hash 路由模式，history 路由模式不支持,需要在 springboot 中做路由转发。
解决办法：

``` shell
1.修改 vue 工程中 config/index.js 的 assetsPublicPath 改为 /dist/, build:{} 中，不是 dev:{} 的, 如下：
build： {
	...
	assetsPublicPath: ' /dist/',
	...
}

2.执行 npm run build，会出现一个 dist 文件夹在 vue 项目目录中

3.把 dist 文件夹中的所有文件复制到 springboot 的 resources/static/

4.访问 http://localhost:8080/index.html/#/

```


4.问题：vue v-html渲染后，样式不生效
分析：html绑定渲染的内容可以理解为子组件的内容，如果是 scoped 子组件不会被加上对应的属性。
解决办法：尝试去掉style 中 scoped属性后，问题解决

``` Html
...
<div v-html="data.head"></div>
...

<style lang='less' scoped> ----错误
<style lang='less'> ----正确
@import '../assets/css/bar.less';
</style>

```

### 4.Share:

JavaScript原型链学习指南
https://www.shuaihuajun.com/article/javascript-prototype-chain/index.html?_blank