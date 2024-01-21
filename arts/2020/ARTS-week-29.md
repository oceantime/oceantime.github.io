---
title: ARTS-week-29
date: 2020-07-26 18:10:37
tags:
---


## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm: 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

Split Array Largest Sum https://leetcode.com/submissions/detail/371841241/

### 2.Review:

https://www.oreilly.com/content/the-hadoop-tipping-point/
Hadoop的引爆点

#### 点评：

作者 Courtney Webster 提出实时自动化是提高 Hadoop 性能的关键。

过去估计作业所需资源非常困难，因为性能取决于很多变量，其中包括：核心数、节点数、负载变化（大小，强度）、干扰（对于共享集群）。解决方法是高估资源，并允许我们的资源管理器“交通警察”作业，直到可以使用所需的最大资源为止。虽然可以满足高峰需求，但我们的日常群集使用率平均仅为6-12％。

Reiss＆Tumanov 他们研究了Google的集群，建议使用下一代调度程序，应该具备的特性：
- 快速制定任务计划决策
- 撤消以前的任务
- 动态适应正在运行的作业中的资源请求
- 预测（而不仅仅是分配）资源使用情况

### 3.Tip:

1. npm 依赖和缓存

```shell
#清缓存
npm cache verify
npm cache clean --force

#删除项目所有依赖
npm uninstall *

#删除全局依赖
npm uninstall * -g

#安装依赖
npm install xxx 利用 npm 安装 xxx 依赖到当前命令行所在目录
npm install xxx -g 利用 npm 安装全局依赖 xxx
npm install xxx –save 安装并写入 package.json 的 dependencies 中
npm install xxx –save-dev 安装并写入 package.json 的 devDependencies 中
```

2. go mod 依赖

```shell
#初始化
go mod init
go mod init packagename

#下载依赖包
go mod download

#拉取必须模块，移除不用的模块
go mod tidy

#tag 对应的内容更新，需要删除 pkg 中的缓存内容
cd $GOPATH/pkg/mod
rm -rf *

#自动下载依赖
go get
go run
go build

```

### 4.Share:

一文彻底搞懂go mod使用
https://blog.csdn.net/qq_38151401/article/details/105780251