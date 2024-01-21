---
title: ARTS-week-07
date: 2020-02-23 20:58:28
tags:
---

## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm: 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

Number of Islands https://leetcode.com/submissions/detail/306097665/

### 2.Review:

https://www.dovetail.ie/custom-javascript-parser-vs-jison-our-experience/

#### 点评：

本文记录了作者所在的团队，开发产品QuickDBD即通过输入来绘制数据库图表中，其中将源代码转换为关系图功能需要用到解析器
最终作者分析了 PEG.js 和  Jison 两个主流的 JavaScript 解析器，选择了更大的社区、更多的 GitHub 追随者、更多的 StackOverflow 问题和更好的文档支持的 Jison。但使由于作者的团队为 QuickDBD 设计的语言比大多数人认为的编程语言更接近于数据描述语言，所以遇到困难并比较难解决，最后决定使用自己的自定义JavaScript解析器，原因如下：

1.可以完全控制解析器的工作方式
2.团队每个成员都精通 JS
3.Jison 对每个成员来说都是新手，能有效地使用它有一点学习曲线
4.感觉就像在和 Jison 战斗，让它发挥作用，而不应该超过它的感觉，这是一个好的工具，应该让使用者能够做得更好更快
5.有几次很难获得关于如何使用 Jison 的信息，所以团队不得不重新阅读它的源代码来解决问题

总结：
最后作者给出建议，如果正在考虑使用 Jison，也许可以先在自己的语言的一小部分特性上尝试一下，然后再投入使用。试过之后，可以继续写一些习惯性的东西。

### 3.Tip:
logstash 插件安装

1. docker镜像在线插件安装(windows&linux都验证可行):
``` shell
# 下拉需要安装插件的纯净logstash版本
docker pull docker.elastic.co/logstash/logstash-oss:6.5.0
# 启动镜像对应的容器实例并执行插件安装命令(如果安装失败需要多执行几次，直到成功)
docker run -it docker.elastic.co/logstash/logstash-oss:6.5.0 logstash-plugin install logstash-input-mongodb
# 进入容器内部,默认是logstash目录
docker exec -ti -u root <continer_id> bash
# 返回上级目录
cd ..
# 执行打包命令
tar -zcfv logstash.tar.gz logstash
# 从容器中复制 logstash 到宿主机
docker cp <continer_id>:/usr/share/logstash.tar.gz .
```

2. 离线插件安装:
``` shell
# 打包
## 打包前的注意事项
 1、确保需要打包的插件及其依赖插件都已经安装在中转机器上
 2、执行./logstash-plugin prepare-offline-pack logstash-input-jdbc来打包

## 打包命令支持通配符，如下都是可以的
bin/logstash-plugin prepare-offline-pack logstash-input-jdbc 
bin/logstash-plugin prepare-offline-pack logstash-input-* 
bin/logstash-plugin prepare-offline-pack logstash-output-* logstash-input-jdbc

# 安装
 1、下载打包好的文件，通过最方便的方式上传到生产设备中，记住存放的目录和文件名，例如这里为logstash-input-plugins-6.5.0.zip
 2、执行bin/logstash-plugin install命令进行安装

## 在Windows下
bin/logstash-plugin.bat install file:///c:/path/to/logstash-input-plugins-6.5.0.zip

## 在Linux下
bin/logstash-plugin install file:///path/to/logstash-offline-input-6.5.0.zip
```

### 4.Share:

jison VS PEG.js
http://xwjgo.github.io/2018/03/09/jison%20VS%20PEG.js/
