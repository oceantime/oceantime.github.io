---
title: ARTS-week-21
date: 2020-02-02 21:59:00
tags:
---

## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm： 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

Valid Parentheses https://leetcode.com/submissions/detail/299575367/

### 2.Review:

https://logz.io/blog/logstash-grok/

#### 点评：

文章介绍了如何使用 logstash 的 grok 插件让非结构化数据转换为结构化消息。

Grok的概念:
最初的术语实际上是由 Robert A. Heinlein 在1961年的书 《Stranger in a Strange Land》 中创造出来的，它指的是理解某种东西到一个人真正沉浸在其中的程度即用感觉感知,而非动脑思考 to understand sth completely using your feelings rather than considering the facts。

Grok是如何工作的:
简单地说，grok是一种将行与正则表达式匹配、将行的特定部分映射到专用字段并基于此映射执行操作的方法。内置了200多个Logstash模式，用于过滤AWS、Bacula、Bro、Linux Syslog等系统中的单词、数字和日期等项。如果找不到所需的模式，可以编写自己的自定义模式。还有多个匹配模式的选项，它简化了用于捕获日志数据的表达式的编写。

最后，文章后面给出了关于Grok是如何工作的基本语法格式详细的例子，可以自己尝试实践。

### 3.Tip:
	
1.Promise.all 原理分析：
``` javascript
可以将多个Promise实例包装成一个新的Promise实例：
全部成功的时候返回的是一个结果数组；
失败的时候则返回最先被reject失败状态的值；
let wake = (time) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`${time / 1000}秒后醒来`)
    }, time)
  })
}

let p1 = wake(3000)
let p2 = wake(2000)

Promise.all([p1, p2]).then((result) => {
  console.log(result)       // [ '3秒后醒来', '2秒后醒来' ]
}).catch((error) => {
  console.log(error)
})

```

2.Promise.race 原理分析：
``` javascript
哪个实例获得结果最快，就返回那个结果，不管结果本身是成功还是失败；
let p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('success')
  },1000)
})

let p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('failed')
  }, 500)
})

Promise.race([p1, p2]).then((result) => {
  console.log(result)
}).catch((error) => {
  console.log(error)  // 打开的是 'failed'
})
```

### 4.Share:

Vue 实例的生命周期
https://www.jianshu.com/p/3ce732385073
