---
> **ARTS-week-26**
> 2022-06-26 09:30
---


###### ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
- Algorithm: 每周至少做一个 leetcode 的算法题
- Review: 阅读并点评至少一篇英文技术文章
- Tip: 学习至少一个技术技巧
- Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

- [513. 找树左下角的值 (中等) +](https://leetcode.cn/submissions/detail/328231594/)  
  + 思路:二叉树的递归分为「遍历」和「分解问题」两种思维模式，这道题需要用到「遍历」的思维。
- [515. 在每个树行中找最大值 (中等) +](https://leetcode.cn/submissions/detail/328940647/)  
  + 思路：遍历+哈希
- [710. 黑名单中的随机数 (困难) +](https://leetcode.cn/submissions/detail/329342249/)  
  + 思路: 哈希+排除法


### 2.Review:

- [为什么选择ZeroMQ？](https://zeromq.org/)  

#### 点评：

ZeroMQ（也称为ØMQ，0MQ或zmq）看起来像一个可嵌入的网络库，但作用类似于并发框架。它为提供了跨各种传输（如进程内、进程间、TCP 和多播）传输原子消息的套接字。可以使用扇出、发布-订阅、任务分发和请求-回复等模式将套接字 N 到 N 连接起来。它的速度足以成为集群产品的结构。其异步 I/O 模型提供了可扩展的多核应用程序，这些应用程序构建为异步消息处理任务。它具有大量语言 API，可在大多数操作系统上运行。

ZeroMQ 中的 Zero:
ZeroMQ的理念始于零。零表示零代理（ZeroMQ 是无代理）、零延迟、零成本（免费）和零管理。更一般地说，“零”是指渗透到项目中的极简主义文化。我们通过消除复杂性而不是通过公开新功能来增加功能。

ZeroMQ 特性:
- 通用
任何语言和平台都可以链接。

- 智能
支持多种消息传递模式，如发布-订阅、推送-拉取和客户端-服务器。

- 高速
高性能的异步I/O消息传递库。

- 多种传输
支持通过各种传输 TCP，进程内，进程间，多播，WebSocket等


https://github.com/zeromq/jeromq
jeromq 纯java实现的zeromq

jeromq 特性:
- 基于 libzmq 4.1.7。
- ZMTP/3.0 （http://rfc.zeromq.org/spec:23）.
- tcp:// 协议和 inproc:// 与 zeromq 兼容。
- ipc:// 协议仅在jeromq之间工作（内部使用tcp：//127.0.0.1：port）。

jeromq 安全:
ZMTP PLAIN 机制为 ZMTP 3.0 定义了一个简单的用户名/密码机制，允许服务器对客户端进行身份验证。PLAIN 不尝试安全性或机密性。它旨在用于安全要求较低的内部网络。此机制解决了我们在 0MQ 架构中面临的一组特定挑战：
- 当我们在同一网络（例如，开发服务器和生产服务器）上运行多个服务时，客户端必须确保它们正在访问正确的服务器。
- 当我们想要对客户端执行最小身份验证时（以避免配置错误）。
PLAIN机制甚至无法抵御最简单的流量窥探或欺骗攻击，并且不应该在没有传输级安全性的公共基础设施上使用（例如，通过VPN）。

jeromq 性能:
```
进程延迟
ZeroMQ （c++）
./inproc_lat 10B/100B/1K/10K/100K 1000000
11.480   11.980   11.488   11.774   11.249 [us]
jeromq
java -server perf.InprocLat 10B/100B/1K/10K/100K 1000000
9.106    9.043    8.987    9.101    9.272 [us]

TCP 吞吐量（使用 127.0.0.1 和 10M 消息）
每秒消息数                       100B    100B    1K      10K     100K
ZeroMQ PULL - ZeroMQ PUSH       5758013 2272273 767917  65393   11941
ZeroMQ PULL - JeroMQ PUSH       5423075 2328149 648161  57821   14138
比较（J / Z），或Jero的速度/速度  0.94    1.02    0.84    0.88    1.18
```

测试命令：
ZeroMQ PULL - ZeroMQ PUSH:
```
./local_thr tcp://*:5555 10B/100B/1K/10K/100K 10000000 (bind)
./remote_thr tcp://localhost:5555 10B/100B/1K/10K/100K 10000000 (connect)
5758013     2272273     767917     65393    11941   [msg/s]
```
ZeroMQ PULL - JeroMQ PUSH (to verify message send speed)
```
./local_thr tcp://localhost:5555 10B/100B/1K/10K/100K 10000000 (bind)
java -server perf.RemoteThr tcp://localhost:5555 10B/100B/1K/10K/100K 10000000 (connect)
5423075     2328149     648161     57821    14138   [msg/s]
```

### 3.Tip:

#### MySQL中的基数是什么？

在MySQL中，基数一词是指可以放入列中的数据值的唯一性。它是一种属性，会影响搜索，聚类和排序数据的能力。

基数可以分为以下两种类型-

低基数-列的所有值必须相同。

高基数-列的所有值必须唯一。

如果我们在列上施加约束以限制重复值，则使用高基数的概念。

高基数
以下是高基数的示例，其中列的所有值都必须是唯一的。

```java
mysql> create table UniqueDemo1
   -> (
   -> id int,
   -> name varchar(100),
   ->UNIQUE(id,name)
   -> );

mysql> insert into UniqueDemo1 values(1,'John');
ERROR 1062 (23000): Duplicate entry '1-John' for key 'id'
```

在上面的代码中，当我们在表中插入相同的记录时，会出现错误。

显示所有记录。

```shell
mysql> select * from UniqueDemo1;
```

以下是输出。因为对于重复值，它显示错误；因此，表中现在只有1条记录，这是我们之前添加的。

```
+------+------+
| id   | name |
+------+------+
|    1 | John |
+------+------+
1 row in set (0.00 sec)
```

低基数
低基数的示例。

创建一个表。

```
mysql> create table LowCardinality
   -> (
   -> id int,
   -> name varchar(100)
   -> );
```

插入具有重复值的记录。

```
mysql> insert into LowCardinality values(1,'John');

mysql> insert into LowCardinality values(1,'John');
```

显示所有记录。

```
mysql> select * from LowCardinality;
```

输出显示重复的值，因为创建表时未包含UNIQUE。

```
+------+------+
| id   | name |
+------+------+
|    1 | John |
|    1 | John |
+------+------+
2 rows in set (0.00 sec)
```

### 4.Share:

- [性能比拼：2022 Apache Pulsar 与 Kafka 基准测试报告出炉](https://mp.weixin.qq.com/s/i77H-xRR720mWONW1p8bcA?)  

