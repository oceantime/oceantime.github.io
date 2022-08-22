---
> **ARTS-week-34**
> 2022-08-21 20:58
---


###### ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
- Algorithm： 每周至少做一个 leetcode 的算法题
- Review: 阅读并点评至少一篇英文技术文章
- Tip: 学习至少一个技术技巧
- Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

- [641 设计循环双端队列 (??+)](https://leetcode.cn/submissions/detail/350675652/)  
  + 思路:设计
- [1302. 层数最深叶子节点的和 (??+)](https://leetcode.cn/submissions/detail/351627461/)  
  + 思路:BFS
- [654. 最大二叉树 (??+)](https://leetcode.cn/submissions/detail/352695873/)  
  + 思路: 递归


### 2.Review:

- [Rockset 的 RocksDB-Cloud Library - 启用下一代云原生数据库](https://rockset.com/blog/rocksdb-cloud-enabling-the-next-generation-of-cloud-native-databases/)  

#### 点评：

Rockset 和我在 2016 年开始合作，因为我对他们的 RocksDB-Cloud 开源键值存储感兴趣。这篇文章主要是关于 Rockset 在 2016 年开源的 RocksDB-Cloud 软件，而不是 Rockset 新推出的云服务。在其中，我将探讨如何使用 RocksDB-Cloud 来构建一个开源的云友好型存储系统。

Rockset 从隐身模式的出现值得对其平台背后的一个关键观察进行反思：最大的公共云服务提供商（CSP）的产品共有一组核心服务。特别是两个，基于 REST 的对象存储（例如 Amazon S3）和事件流（例如 Amazon Kinesis）用于组合其他服务，作为这些缓存系统的共享存储服务。Rockset 的开源 RocksDB-Cloud 库为如何将现有的缓存系统适应云提供了一个有趣的例证。

“缓存系统”是什么意思？这是一个跨主内存和主存储管理其状态的系统。RocksDB 采用日志结构化合并树（LSM-Tree）的实现来实现这一目标。LSM 树的基础是一条已经存在了 30 多年的经验法则。“五分钟规则”简明扼要地捕捉了数据存储设计中内存和存储之间固有的经济权衡（Appuswamy/ADMS@VLDB 2017）。RocksDB-Cloud 的愿景的独特之处在于这种权衡如何适应云。

云原生数据库（CNDB）是专门为云时代构建的本地数据库系统。此类数据库旨在充分利用云中可用的大量网络、处理和存储资源。为此，CNDB 跨云存储卷维护数据库（数据、索引和事务日志）的一致映像，以满足用户目标，并利用远程 CPU 工作线程执行关键的后台工作，如压缩和迁移。

设计为在本地主机上运行的数据库系统如何重构，以便其状态的一致映像驻留在 Cloud Storage 上？答案是双重的。首先，数据库必须是缓存系统，而不是内存系统。缓存系统在本地持久性存储上维护数据库的完整映像，而只有活动状态在内存中。一旦确定，将此类缓存系统转换为 CNDB 需要将此持久状态映射到 Cloud Storage 构造，以便远程工作人员可以访问它。

缓存系统的持久状态由时间点快照、元数据/主要 DDL 和事务日志组成。但是，一个规定是缓存系统必须执行“盲目更新”。也就是说，应用于数据库的所有突变都必须追加到日志中。然后使用索引方案从本地主机的内存中显示数据库的当前映像。

RocksDB库提供了构建此类缓存系统的方法（Lomet/ DaMoN18）。例如，Facebook 部署了配置为使用MyRocks存储引擎的 MySQL，该引擎在内部使用RocksDB库。RocksDB 实现了 Log Structured Merge Tree （LSM-Tree）。这意味着所有突变都将追加到预写日志 （WAL） 中，然后应用于内存中的内存表。随着时间的推移，这些 mem 表变得不可变，被刷新到 sstable 文件中，随后，关联的资源被释放。因此，将 MySQL w / MyRocks 转换为 CNDB 是将 WAL 和 sstable 文件映射到适当的云存储结构的功能。

进入 Rockset 的 RocksDB-Cloud 库，这是 RocksDB 的扩展，它将本地 sstable 文件映射到 S3 风格的存储桶，并将 WAL 条目映射到云原生日志（如 Kafka或 Kinesis Partition）。英特尔一直在与多个最终客户和 Rockset 团队合作，以实现此部署方案。到目前为止，我们已经成功地使数据库能够在 MariaDB 配置为在本地和基于 Minio 的 S3 存储桶中维护其稳定文件的情况下运行。WAL 配置为本地。我们依靠 MariaDB 实例二进制日志来维护当前数据库的更改状态。

Rockset 还使用 RocksDB-Cloud 作为其自己的云服务的基础。Rockset 服务是一个无服务器的搜索和分析 CNDB，它使用 RocksDB-Cloud 为半结构化文档编制索引。RocksDB-Cloud 是开源社区可以利用的数据工具库的重要补充，也可以利用它来构建其他 CNDB。

英特尔对启用下一代 CNDB 的兴趣是什么？英特尔预计将推出傲腾DC持久内存，这将为数据库生态系统提供重新审视几代人以来一直存在的权衡正统观念的机会。然而，一个仍然存在的权衡是五分钟规则（Appuswamy/ADMS@VLDB 2017）。CNDB 的缓存系统模型就是这种权衡的体现。因此，我们相信 CNDB 为英特尔持久内存的长期广泛采用奠定了基础。使用 RocksDB-Cloud 库将英特尔的 Optane DC 持久内存整合到 RocksDB 的缓存基板中的存储引擎是朝着这个方向迈出的一大步。

### 3.Tip:

#### PACKAGE-INFO.JAVA 作用

特点：
首先，它不能随便被创建，会报 "Type name is notvalid" 错误，类名无效。
其次，它是描述和记录本包信息。
最后，在package-info.java中只能声明默认访问权限的类，也就是友好类，不可以继承，没有接口，没有类间关系（关联、组合、聚合等等）等。

三个作用：
为标注在包上Annotation提供便利；
声明友好类和包常量；
提供包的整体注释说明。

### 4.Share:

- [openEuler 资源利用率提升之道 02：典型应用下的效果](https://xie.infoq.cn/article/47dda769938f670aa05e46068)

- [如何实现一个 Git Diff 解析器](https://fed.taobao.org/blog/taofed/do71ct/how-to-display-git-diff/)

- [悄悄学习Doris，偷偷惊艳所有人 | Apache Doris四万字小总结](https://cloud.tencent.com/developer/article/1880330)