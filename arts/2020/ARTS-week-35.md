---
title: ARTS-week-35
date: 2020-09-06 21:51:13
tags:
---


## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm： 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

Implement Trie (Prefix Tree) https://leetcode.com/submissions/detail/281301737/

### 2.Review:

https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/
数据分析和可视化采用的状态

#### 点评：

作者 Jake 讨论了任务、微任务的执行顺序。
1.Tasks 按顺序执行，浏览器可能在 Tasks 之间执行渲染。
2.Microtasks 也按顺序执行，时机是：
- 如果没有执行中的 js 堆栈，则在每个回调之后。
- 在每个 task 之后。

### 3.Tip:

1.查看 Maven 项目中的 jar 包依赖树

```shell
mvn dependency:tree
```
2.导出 Maven 项目中的 jar 包依赖树到文件

```shell
mvn dependency:tree -Doutput=tree.txt
```

### 4.Share:

https://blog.csdn.net/ffjl1985/article/details/80641437
在大数据场景下借鉴Splunk SPL的提供通用的数据分析手段
https://zhuanlan.zhihu.com/p/76837302
基于大数据平台的数据分析