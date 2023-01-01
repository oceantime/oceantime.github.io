---
> **ARTS-week-01**
> 2023-01-01 08:18
---


## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm： 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

- [1759. 统计同构子字符串的数目](https://leetcode.cn/submissions/detail/391049730/)  
    + 思路：计数
- [1750. 删除字符串两端相同字符后的最短长度](https://leetcode.cn/submissions/detail/391441099/)  
    + 思路：双指针
- [855. 考场就座](https://leetcode.cn/submissions/detail/391891153/)  
    + 思路：哈希

### 2.Review:

[Apache Parquet 简介](https://thenewstack.io/an-introduction-to-apache-parquet/)  

#### 点评：

看看 Parquet 是什么，它是如何工作的，以及一些公司使用其优化技术作为其架构中的关键组件。

随着为分析而生成和存储的数据量以越来越快的速度增长，开发人员正在寻求从各个角度优化性能并降低成本。在PB级规模上，即使是边际收益和优化，在存储和处理数据时，也可以为公司节省数百万美元的硬件成本。

作为这些优化技术的一个例子的一个项目是 Apache Parquet 。在本文中，将了解 Parquet 是什么，它是如何工作的，以及许多使用 Parquet 作为其架构中关键组件的公司和项目。

#### 什么是 Apache Parquet？
Parquet 是一种开源的面向列的存储格式，由 Twitter 和 Cloudera 开发，然后捐赠给 Apache 基金会。Parquet 旨在改进 Hadoop 现有的存储格式，包括各种性能指标，例如通过压缩减少磁盘上的数据大小，以及加快分析查询的读取速度。

随着时间的推移，越来越多的项目和公司采用了 Parquet，它已成为希望让用户更轻松地导入和导出数据的项目的通用交换格式。

采用 Parquet 使新用户更容易迁移或采用新工具，同时将对其工作流程的干扰降至最低，因此它既有利于用户，也有利于希望为其产品获取新用户的公司。

#### Apache Parquet 技术细分
Parquet 使用多种创新技术来提供出色的性能。在进入细节之前，我们可以查看与用于存储数据的另一种文件格式进行比较的结果：不起眼的 CSV（逗号分隔值文件）。

Databricks 中的某些数字在将 1 TB 的 CSV 文件转换为 Parquet 时显示以下结果：
- 文件大小减少到 130 GB，减少了 87%
- 查询运行时间从 236 秒减少到 6.78 秒，速度提高了 34 倍
- 为查询扫描的数据量从 1.15TB 下降到 2.51GB，减少了 99%
- 成本从 5.75 美元降低到 0.01 美元，成本降低 99.7%

那么，让 Parquet 的性能比 CSV 和其他文件格式好得多的秘诀是什么？让我们看一下 Parquet 背后的一些关键概念和功能：
- 运行长度和字典编码 — Parquet 能够简单地列出该值在列中出现的次数，从而节省大量空间，而不是多次将相同的值存储在磁盘上，从而通过一次又一次地存储相同的值来有效地浪费空间，从而在频繁重复值的数据集上节省大量空间。这方面的一个例子是 CPU 监控，其中每个值都将在利用率百分比的 1-100 范围内。
- 记录分解和组装 - Apache Parquet 借用了 Google 的 Dremel 论文中的一种技术，该技术允许 Parquet 将嵌套的数据结构映射到基于列的布局。这样做的好处是，开发人员仍然可以以更自然的嵌套样式处理其数据，同时获得基于列的数据结构的性能优势。
- 丰富的元数据 — 在幕后，Hood Parquet 会跟踪大量元数据，这是实现上述策略所必需的。Parquet 数据分为行组、列块和页面。文件可以包含多个行组，每个行组每列只包含一个列块。每个列区块包含一页或多页数据。所有这些复杂性都被抽象出来，因此开发人员不必直接担心它。

所有这些功能共同赋予了 Parquet 其性能特征。归结为最简单的级别，这一切都是为了提供元数据来优化查询，以减少计算资源需求，同时减少重复数据点的数量，从而降低存储成本。这样可以加快查询速度并减少存储需求。

在云计算时代，许多云服务根据您正在处理和扫描的数据量收费，因此Parquet特别有益。由于 Parquet 保留了有关数据结构的其他元数据，因此它能够显著减少扫描的不必要数据量，因此您无需付费扫描、处理和分析完成查询不需要的数据，而只需获取所需的数据。

#### 使用 Apache Parquet 的公司和项目
许多项目支持 Parquet 作为导入和导出数据的文件格式，以及在内部使用 Parquet 进行数据存储。以下是其中的一小部分以及它们的用途：

- Hadoop 是一个基于谷歌 MapReduce 论文的大数据处理工具。Parquet 最初被设计为用于使用 Hadoop 的文件格式。
- ApacheIceberg 试图通过允许 Spark、Trino 和 Flink 等流处理工具处理来自同一存储后端的所有查询和处理数据，将普通关系数据库表的简单性带到大数据规模上。
- Delta Lake 是一个开源存储框架，用于构建数据湖仓风格的架构。Delta Lake 与 Spark，PrestoDB，Flink 和 Trino 等常见计算工具集成，使处理和存储数据变得容易。
- ApacheSpark 是一个用于处理大量数据的分析引擎。除了 Pandas API 等高级工具外，它还允许使用 SQL 进行数据处理。

#### Apache Parquet 和 InfluxDB
InfluxDB 时间序列数据库是另一个将严重依赖 Parquet 的项目，特别是 InfluxDB 的新列式存储引擎 IOx。InfluxDB 使用 Parquet 通过对象存储持久存储数据。这允许数据有效地在热存储层和冷存储层之间移动，使 InfluxDB 能够为用户提供更好的性能，同时降低他们的存储成本。与 InfluxDB 以前的迭代相比，它还提供了更好的数据压缩率。

InfluxDB 通过映射以行协议格式发送到 InfluxDB 的数据来与 Parquet 配合使用，然后将行协议中定义的标记、字段和时间戳映射到 Parquet 中的列。然后，可以根据该字段值的数据类型使用最佳压缩算法压缩这些列。然后按时间范围拆分 Parquet 文件，因此您只需以访问的 Parquet 文件数量最少来获取所需的时间序列数据。从 Parquet 文件中提取数据时，将使用 Apache Arrow 格式将其加载到内存中，该格式也是基于列的，因此产生的性能开销最小。

#### 总结
在大规模处理数据时，每一点效率都可以为公司和用户带来重大利益。Parquet 只是致力于提高效率的众多项目之一。虽然可能不会以开发人员的身份直接与 Parquet 交互，但经常使用的一些工具很有可能底层使用 Parquet。

### 3.Tip:

#### Elasticsearch 7.3 的 offheap 原理
1.一直以来，ES 堆中常驻内存中占据比重最大是 FST，即 tip(terms index) 文件占据的空间，1TB 索引大约占用 2GB 或者更多的内存，因此为了节点稳定运行，业界通常认为一个节点 open 的索引不超过5TB。现在，从 ES 7.3 版本开始，将 tip 文件修改为通过 mmap 的方式加载，这使 FST 占据的内存从堆内转移到了堆外由操作系统的 pagecache 管理。

- 参考 ES 7.3 的 release-notes ：
```shell
Also mmap terms index (.tip) files for hybridfs #43150 (issue: #42838)
```
- hybridfs 是索引默认的 store 类型，他根据操作系统类型自动选择 nio 或者 mmap，那么究竟哪些文件被 mmap 方式打开，手册中说：
```java
Currently only the Lucene term dictionary, norms and doc values files are memory mapped. All other files are opened using Lucene NIOFSDirectory
```
- 对应到文件扩展名，就是 nvd(norms), dvd(doc values), tim(term dictionary), tip(term index), cfs(compound) 类型的文件使用 mmap 方式加载，其余使用 nio：
```java
switch(extension) {
    case "nvd":
    case "dvd":
    case "tim":
    case "tip":
    case "cfs":
        return true;
    default:
        return false;
}
```

2.为什么把 tip 文件通过 mmap 方式读取就实现 offheap 了？像 hbase 实现 offheap 要把数据转移到堆外的数据结构，为什么 ES 不需要？

- FST 的查找过程
onheap 的情况下，Lucene 将 tip 文件的的数据读进一个数组，在 FST 查找时，seek 到某个位置，读取一些字节，然后再次 seek，再读取，相当于边读取边解析。
```java
// FST::findTargetArc
private Arc<T> findTargetArc(BytesReader in,...)
{
    //....
    in.setPosition(follow.target);
    arc.numArcs = in.readVInt();
    arc.bytesPerArc = in.readVInt();
    arc.posArcsStart = in.getPosition();
    arc.nextArc = arc.posArcsStart;
    //....
}
```
这个 BytesReader 的初始化 就是简单地将文件读进数组而已
```java
// OnHeapFSTStore::init
public void init(DataInput in, long numBytes)
{
    bytesArray = new byte[(int) numBytes];
    in.readBytes(bytesArray, 0, bytesArray.length);
}
```
因此，在 offheap 的情况下，mmap 像数组一样读取就可以了。如果想要查看文件被 pagecache 缓存的百分比，可以用 vmtouch（推荐），pcstat，hcache，或 fincore等工具来检查：
```shell
$ vmtouch -v /xxx/xxx/_6m_lucene20_9.tip
```
如果想要确认某个 tip 文件是否被 mmap 方式读取的，可以使用 pmap 命令，被 mmap 映射的文件会在这里列出来：
```shell
$ pmap -x 27399|grep _6m_lucene20_9.tip
```

- tip offheap 后的效果
使用 geonames 数据集写入索引 1TB，使用 \_cat/segments API 查看 segments.memory内存占用量，对比 offheap 后的内存占用效果：
store.type | segments.memory
-|-
niofs | 4.7GB
hybridfs | 1.06GB

JVM 内存占用量降低了78%左右，不同数据样本结果不同，其他的可能会降低更多。

3.由于 offheap 后的堆外内存由操作系统的 pagecache 管理，什么时候被驱逐出去由操作系统决定，进程无法控制。如果 tip 文件的内容被驱逐出 pagecache，对 FST 的查找会涉及到磁盘 io，对查询延迟有比较大的影响。

Linux 系统的 pagecache 回收有两种情况：
- 当系统 free 内存不足的时候，系统自动回收 pagecache 缓存的数据，其中可能包括 mmap 映射的 tip文件。
- 通过改写 /proc/sys/vm/drop_caches 或 posix_fadvise 调用来手工回收，此时如果索引处于 open 状态，由 mmap 映射到 pagecache 的 tip 数据并不会被回收。 而如果索引处于 close 状态，则会被完全回收。

在 linux 2.6.34 的内核中，对 pagecache 的回收策略使用双链策略，参考《Linux内核设计与实现第三版》，算法描述大致如下：
```
该算法引入两个链表,一个 active list，一个 inactive list，两个链表都是从尾部加入，头部移出，页面换出操作只在 inactive list 执行，对于文件缓存，当第一次访问的时候加入到 inactive list，再次访问的时候把他提升到 active list，当 active list 大小大于 inactive list，就将 active list 头部的页面降级到 inactive list
```
更多 pagecache 的信息可以参考：https://linux-mm.org/PageReplacementDesign

4.依据 mmap 的原理，文件 fd 被映射为指针（或者说字节数组）供进程直接访问，仅在进程访问到相应位置的时候才去读取磁盘，是根据内容按需读取磁盘。你会想既然如此，\_open 索引是不是变快了？原来 nio 需要把整个文件读进堆内存，现在 mmap 一下就结束了，那么等索引首次被查询的时候才会加载到 pagecache？实际上 \_open 索引并没变快，因为在 \_open 索引的过程中，Lucene 会检查文件的校验和，把整个文件读取一遍：
```java
// BlockTreeTermsReader:BlockTreeTermsReader()-> CodecUtil.checksumEntireFile(indexIn);
ChecksumIndexInput in = new BufferedChecksumIndexInput(clone);
//读取文件到目标位置，并更新校验和，居然命名 seek 函数，即使 Lucene 大牛我也忍不住要吐槽
in.seek(in.length() - footerLength());
return checkFooter(in);
```

5.关于 \_id 字段要不要 offheap 的问题
Lucene 支持字段级的 offheap 设置，ES 7.3中将 tip offheap 时并不包含 \_id 字段，#52518 中提到，因为担心降低写入速度。不过在经历了一些测试之后发现影响并不大。
```
In general, the indexing rate is only affected if explicit IDs are used, as
otherwise Elasticsearch almost never performs lookups in the terms
dictionary for the purpose of indexing. So it’s quite wasteful to
require the terms index of _id to be loaded on-heap for users who have
append-only workloads. Furthermore I’ve been conducting benchmarks when
indexing with explicit ids on the http_logs dataset that suggest that
the slowdown is low enough that it’s probably not worth forcing the terms
index to be kept on-heap
```
这段内容说使用外部 doc id 方式入库时需要从 term dictionary中查询，这是因为使用外部 id写入时，ES 需要判断该 id 是否存在，以便执行 update 或 append 操作。因此在分片中对 \_id 字段执行 Lucene 的 seekExact 查询来判断此 id 是否存在，所以使用外部 id 入库时写入速度会比较低一些（20%左右）。这也是 \_id 字段需要写入的 FST 的一个原因。

在将 \_id 字段 offheap 之后，使用 http_logs 数据集和外部 id 的方式执行写入测试，写入速度降低了 1.8%，JVM 内存降低了 100倍：
Run | Master | Patch
-|-|-
1 | 41.1720 | 0.352083
2 | 45.1545 | 0.382534
3 | 41.7746 | 0.381285
4 | 45.3673 | 0.412737
5 | 45.4616 | 0.375063
因此在 ES 7.7版本中会将 \_id 字段也放到堆外。

6.总结
把 FST 放到堆外可以让节点能够持有更多的数据，这对 ES 集群能处理的数据规模有重大提升，意义重大。但是 tip 文件需要加载到内存的意义比 tim 等文件要重要地多，pagecache 总会有需要回收的时候，谁能保证 tip 不被回收呢？所以总体来说让查询延迟增加不确定性，且不便重现和诊断。不过也用太担心，这种情况一般很少发生。

7.参考
https://github.com/elastic/elasticsearch/issues/38390
https://github.com/elastic/elasticsearch/pull/42838
https://github.com/elastic/elasticsearch/pull/43150
https://github.com/elastic/elasticsearch/pull/52518
https://www.elastic.co/guide/en/elasticsearch/reference/current/release-notes-7.3.0.html


### 4.Share:

[jvm压缩指针原理以及32g内存压缩指针失效详解](https://zhuanlan.zhihu.com/p/149678226)  

[FST Off Heap 内存优化](https://cloud.tencent.com/document/product/845/55436)

[压缩算法优化](https://cloud.tencent.com/document/product/845/55435)

[定向路由优化](https://cloud.tencent.com/document/product/845/55434)