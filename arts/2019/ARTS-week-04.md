---
title: ARTS-week-4
date: 2019-09-22 11:56:21
tags:
---

## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm： 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

Median of Two Sorted Arrays：https://leetcode.com/submissions/detail/263046752/

### 2.Review:

Technical Overview Of Pinpoint：https://github.com/naver/pinpoint/wiki/Technical-Overview-Of-Pinpoint
Pinpoint 是一个分析大型分布式系统的平台，提供解决方案来处理海量跟踪数据。2012年七月开始开发，2015年1月9日作为开源项目启动。

#### 点评：

##### Pinpoint 的特点如下:

分布式事务跟踪，跟踪跨分布式应用的消息
自动检测应用拓扑，帮助你搞清楚应用的架构
水平扩展以便支持大规模服务器集群
提供代码级别的可见性以便轻松定位失败点和瓶颈
使用字节码增强技术，添加新功能而无需修改代码

##### 分布式事务跟踪，基于 google Dapper：
pinpoint 跟踪单个事务中的分布式请求，基于google Dapper。

在 Google Dapper 中分布式事务追踪是如何工作的
Google's Dapper 请见 "Dapper, a Large-Scale Distributed Systems Tracing Infrastructure." [下周Review]（http://research.google.com/pubs/pub36356.html）
Pinpoint 基于 google dapper 的跟踪技术,但是已经修改为在调用的header中添加应用级别标签数据以便在远程调用中跟踪分布式事务。标签数据由多个key组成，定义为 TraceId。

##### Pinpoint中的数据结构：
Pinpoint中，核心数据结构由Span, Trace, 和 TraceId组成。

Span: RPC (远程过程调用/remote procedure call)跟踪的基本单元; 当一个 RPC 调用到达时指示工作已经处理完成并包含跟踪数据。为了确保代码级别的可见性，Span 拥有带 SpanEvent 标签的子结构作为数据结构。每个 Span 包含一个 TraceId。
Trace: 多个 Span 的集合; 由关联的 RPC (Spans) 组成. 在同一个 trace 中的 span 共享相同的 TransactionId。Trace 通过 SpanId 和 ParentSpanId 整理为继承树结构.
TraceId: 由 TransactionId, SpanId, 和 ParentSpanId 组成的key的集合. TransactionId 指明消息ID，而 SpanId 和 ParentSpanId 表示 RPC 的父-子关系。
TransactionId (TxId): 在分布式系统间单个事务发送/接收的消息的ID; 必须跨整个服务器集群做到全局唯一.
SpanId: 当收到 RPC 消息时处理的工作的 ID; 在 RPC 请求到达节点时生成。
ParentSpanId (pSpanId): 发起 RPC 调用的父 span 的 SpanId. 如果节点是事务的起点，这里将没有父 span - 对于这种情况， 使用值-1来表示这个 span 是事务的根 span。

##### TraceId如何工作：
TransactionId 由 AgentIds, JVM (java虚拟机)启动时间, 和 SequenceNumbers 序列号组成.
AgentId: 当Jvm启动时用户创建的 ID; 必须在 pinpoinit 安装的全部服务器集群中全局唯一. 最简单的让它保持唯一的方法是使用 hostname($HOSTNAME)，因为 hostname 一般不会重复. 如果需要在服务器集群中运行多个 JVM，请在 hostname 前面增加一个前缀来避免重复。
JVM 启动时间: 需要用来保证从0开始的 SequenceNumber 的唯一性. 当用户错误的创建了重复的 AgentId 时这个值可以用来预防 ID 冲突。
SequenceNumber: Pinpoint agent 生成的 ID, 从0开始连续自增;为每个消息生成一个.

字节码增强，无需代码修改
Twitter 的 Zipkin 使用修改过的类库和它自己的容器 (Finagle)来提供分布式事务跟踪的功能。但是，它要求在需要时修改代码。为了解决这个问题，pinpoint 中使用了字节码增强技术。Pinpoint agent 干预发起 RPC 的代码以此来自动处理标签信息。

克服字节码增强的缺点
字节码增强在手工方法和自动方法两者之间属于自动方法。
手工方法： 开发人员使用 ponpoint 提供的 API 在关键点开发记录数据的代码
自动方法： 开发人员不需要代码改动，因为 pinpoint 决定了哪些 API 要调节和开发

##### 字节码增强的价值：
隐藏API
容易启用或者禁用
字节码如何工作
pinpoint agent 的性能优化
使用二进制格式 (thrift)
使用变长编码和格式优化数据记录
用常量表替换重复的 API 信息，SQL 语句和字符串
处理大量请求的采样
使用异步数据传输来最小化应用线程中止，使用 UDP 传输数据


### 3.Tip:

更新 spring boot 打包的 jar 中的 BOOT-INF/lib 目录下 jar

1.场景：需要更新 lib 目录下某个 jar 中的配置文件

2.失败的解决方式：用解压软件依次打开 spring boot jar 包（设为 ***a.jar*** ）、BOOT-INF/lib 目录下的 jar 包（设为 ***b.jar*** ），然后修改配置文件后保存回 a.jar 包中，这样操作在通过 java -jar 运行 ***a.jar*** 包时会导致以下错误：
``` bash
java.lang.IllegalStateException: Unable to open nested entry b.jar. It has been compressed and nested jar files must be stored without compression
```

3.错误原因：保存修改后 lib 下的 ***b.jar*** 时压缩软件对 ***b.jar*** 进行了压缩，导致 ***b.jar*** 包损坏

4.解决方案：
``` bash
在 ***a.jar*** 包所在文件夹新建 BOOT-INF 文件夹，再在 BOOT-INF 下新建 lib 文件夹；
复制 BOOT-INF/lib 下的 ***b.jar*** 包到以上新建的 lib 文件夹下；
修改 ***b.jar*** 包配置文件并保存；
在 a.jar 所在的文件夹运行 jar -uf0 a.jar BOOT-INF/lib/b.jar 命令，即可将修改后 b.jar 无压缩地添加 a.jar 的指定路径中。
备注：在 jar -uf0 命令中，
u 指更新现有的归档文件，
f 指定归档文件名 / 为压缩包指定名字，
0 仅存储，不压缩，只是打包；不使用任何 ZIP 压缩
```

### 4.Share:

velocity（vm）模板引擎学习语法(https://www.jianshu.com/p/d458d7b8d759)