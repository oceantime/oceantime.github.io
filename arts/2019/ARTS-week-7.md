---
title: ARTS-week-7
date: 2019-10-13 16:32:56
tags:
---

## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm： 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

Reverse Integer：https://leetcode.com/submissions/detail/269441638/

### 2.Review:

https://logz.io/blog/managing-elasticsearch-indices/
管理elasticsearch索引的最佳实践

#### 点评：
文章给出 ElasticSearch 索引管理的传统建议和最近发布的特性，探索进一步优化和自动化索引管理。

##### 索引：
ElasticSearch 中的数据存储在一个或多个索引中，索引中的数据被划分为多个分片
数据存储在不同的节点中，提升查询性能。
分片数据需要有至少一个副本，确保分片节点故障是，副本可以替代主分片数据。
副本不但能过多，太多会带来系统性能开销。

##### 时序数据优化：
ElasticSearch 主要管理的是时序数据，比如日志，事件等。
用时间段管理索引，比如按天创建索引，另外一种方式使用 rollover api 自动创建新索引。
可以根据老的索引的数据量动态规划新索引的分片数，或合并索引等等。

##### 冻结索引：
对于访问量比较小的索引可以通过API冻结变为只读状态，减小系统资源分配。
查询中包含冻结索引必须使用查询参数 ignore_throttled=false，防止查询性能下降。

##### 索引生命周期管理：
使用索引生命周期管理建立一个热-温-冷体系结构，其中的阶段和操作是可选的，可以根据需要进行配置。

热索引正在积极地接收要索引的数据，并经常为查询提供服务。此阶段的典型操作包括：
恢复设置高优先级。
指定滚动更新策略，以便在当前索引太大、太旧或文档太多时创建新索引。

温索引不再包含索引数据，但它们仍然处理查询。此阶段的典型操作包括：
恢复设置中等优先级。
通过缩小索引、强制合并索引或将其设置为只读来优化索引。
将索引分配给性能较差的硬件。

很少查询的冷索引，此阶段的典型操作包括：
恢复设置低优先级。
冻结索引。
将索引分配给性能更低的硬件。
删除早于任意保留期的索引。

索引生命周期管理策略可以使用 ElasticSearch Rest API设置，甚至可以直接在Kibana中设置。

##### 按索引组织数据：
除了 ElasticSearch 稳定性和性能外，索引的数据结构也是整个系统可用性的一个非常重要的因素。
数据结构会影响搜索查询对数据的准确性和灵活性，而这些数据可能来自多个数据源，因此也会影响您分析和可视化数据的方式。
ElasticSearch 7.x 发布的 ElasticCommon 模式是该领域的一个新发展。通过设置一个标准来合并字段名和数据类型，
搜索和可视化来自不同数据源的数据变得更加容易。用户能够通过 Kibana 管理各种不同系统的单一统一视图。

##### 总结：
正确设置索引分片和复制直接影响 ElasticSearch 群集的稳定性和性能。虽然利用文章提出的建议和工具，可以灵活管理索引。但实际操作仍然是 ElasticSearch 最具挑战性的工作之一，需要了解 ElasticSearch 的数据模型和被索引的特定数据集。
对于时序数据，滚动和收缩是基本的索引优化方法。最新的冻结索引功能可以处理老化索引。
索引生命周期管理功能也是最近添加的功能，允许索引生命周期转换的完全自动化。
最后，为索引数据创建映射并将字段映射到弹性公共模式可以从 ElasticSearch 中发掘数据的最大价值。

### 3.Tip:

Linux 挂载磁盘，很多时经常出现重启重新挂载等小问题

``` shell

$ df -h                                                 #查看磁盘占用情况，发现之前插入的一块大容量磁盘 dev/vdb 消失了
$ fdisk -l                                              #查看新磁盘是否被系统识别
$ fdisk -u /dev/vdb                                     #创建分区
$ mkfs.ext4 /dev/vdb                                    #分区格式化为 ext4
$ cp /etc/fstab /etc/fstab.bak                          #备份开机启动挂载
$ mkdir /data                                           #创建一个文件夹，作为将来访问 vdb 的标识
$ echo /dev/vdb /data ext4 defaults 0 0 >> /etc/fatab   #配置开机启动自动挂载
$ cat /etc/fstab                                        #查看自动挂载是否生效
$ mount /dev/vdb /data01                                #挂载磁盘vdb到data
$ df -h

```

参考：创建分区        https://codingbee.net/rhcsa/rhcsa-creating-partitions
参考：fdisk 命令详解  http://wangchujiang.com/linux-command/c/fdisk.html

总结：以上是一个完整的挂载磁盘的步骤，每一个步骤都不可缺失，包括检查确认，可以做为生产环境操作的 checklist 参考。

### 4.Share:

可以设置过期时间的Java缓存Map(https://www.cnblogs.com/xhq1024/p/11115755.html)