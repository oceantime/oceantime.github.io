---
title: ARTS-week-05
date: 2020-02-09 21:22:20
tags:
---

## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm: 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

Group Anagrams https://leetcode.com/submissions/detail/301688951/

### 2.Review:

https://www.techmanyu.com/logstash-fluentd-which-one-is-better/

#### 点评：

文章介绍了 Logstash 和 Fluentd 在日志采集场景先的对比。ELK是经典的Elastic stack解决方案，
本文给出的是EFK解决方案。Fluentd 出现是为了适配 Kubernetes 中容器微服务日志的采集，原生支持
Kubernetes, Prometheus, OpenTracing协议的日志采集和监控指标采集。 


对比项 | Logstash |  Fluentd  
-|-|-
公司 | ELK stack |  CNCF |
开发语言 | JRuby | CRuby |
事件路由 | 条件语句 | 标签 |
插件 | 500+ | 500+ |
性能 | 比较耗费内存 | 较少内存 |
传输 | 内存队列机制 | 磁盘IO缓存 |
官方支持 | 是 | 是 |
平台支持 | windows 和 linux | windows 和 linux |

最后，文章后面给出了EFK采集日志的架构，可以参考。

### 3.Tip:

1.n 是 npm 全局的开源包, 依赖 npm 来全局安装、使用，n 是 node 里面的一个模块，电脑如果没有安装node 或者 npm，n就无法使用：
``` javascript
安装 n
npm install n -g

安装稳定版本
n stable

安装最新版本
n latest

安装指定版本
n v8.1.0

删除某个版本
n rm 8.1.0

以指定的版本来执行脚本
 n use 0.10.21 xxx.js
```

2.nvm 全称 Node Version Manager，nvm 是一个独立软件包，相比 n 会复杂点，通过 shell 脚本实现:
``` javascript
安装 nvm
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash

安装完后，验证安装
command -v nvm

安装 node 当前最新的稳定版本
nvm install stable

安装早期的版本
nvm install 4.1.0

查看当前的版本
nvm current

切换版本
nvm use 8.1.0

列出所以版本
nvm ls
```

### 4.Share:

使用 docker 运行 easy-mock
https://xkcoding.com/2019/10/08/docker-easy-mock.html
