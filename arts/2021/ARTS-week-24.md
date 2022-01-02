---
title: ARTS-week-24
date: 2021-06-20 21:35:28
tags:
---


## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm： 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

65. 有效数字：https://leetcode-cn.com/submissions/detail/187342790/
483. 最小好进制：https://leetcode-cn.com/submissions/detail/187799064/
1600. 皇位继承顺序：https://leetcode-cn.com/submissions/detail/188160427/

### 2.Review:

https://fraugster.com/resources/post/future-proofing-our-storage-needs-with-aws-athena-apache-parquet
使用 Go 在 Datalakes 中畅游

#### 点评：

   我们很高兴地宣布 github.com/fraugster/parquet-go 的发布，这是完全用 Go 编写的 Parquet 文件格式规范的全功能实现。这适用于希望读写 Parquet 文件以与 Apache Presto、AWS Athena 和 Google BigQuery 等技术结合使用的 Go 开发人员。

- Fraugster 的数据
  Fraugster 的分析师在他们的日常工作中使用 SQL，到目前为止 PostgreSQL 已被证明是一个可靠的选择。然而，在过去的几年里，我们已经超出了它支持的用例集。 

- 什么是 Parquet 文件？
  Apache Parquet 是一种二进制格式，用于以强类型列形式存储嵌套数据结构。Parquet v2 规范提供了广泛的压缩和重复数据删除方案，可以在每列的基础上应用，从而实现小文件大小和快速读取性能。

- 开发 Parquet-Go
  自公司成立以来，Fraugster 一直在研发团队中使用 Go，虽然分析和数据科学也在使用 Go，但他们往往更喜欢 Python 进行研究。因此，虽然 Parquet 文件格式在 Java 和 Python 世界中得到了很好的支持，但我们看到了 Go 支持方面的差距。已经存在用于读取和写入 Parquet 文件的包，我们在我们的概念验证中成功地使用了它们，但最终发现它们太有限，无法在未来可靠地管理我们的数据。还有一个担忧是，作为一个长期项目，我们需要对我们正在构建的内容充满信心。有一些考虑只是将我们的一些基础设施迁移到 Java 并使用官方 Parquet 实现，但由于我们没有任何（愿意的）Java 程序员，因此支持它并不容易。此外，虽然有官方的 parquet 实现，但没有一个标准的 parquet 实现，但它没有用于 presto 的两个“官方”实现中的任何一个。我们确实考虑过 ORC，但它与 Parquet 存在相同的问题，即没有维护良好的 Go 包，也不支持嵌套数据。因此，我们着手为 Go 实现我们自己的 Parquet 库，这将为我们提供管理任意、不断变化的数据所需的灵活性。通过让库的用户访问有关其 Parquet 文件中的数据和元数据的低级详细信息，对我们而言，提供最大程度的灵活性和内省对我们来说非常重要。同时，我们还确保提供简单的接口，允许开发人员在更高的抽象级别上读取和写入 Parquet 文件，只需将现有的 Go 对象写入他们的文件或直接从文件中读取它们，而无需烦恼太多细节。

- 你在哪里可以得到它？
  您可以从 Fraugster 的 GitHub 存储库下载该软件包：github.com/fraugster/parquet-go

### 3.Tip:

#### golang GC 相关调试参数

1.1  pprof 生成 CPU 和 memory profile：

```java
kill -s SIGUSR1 < Pid >
```

1.2 开启 GODEBUG 查看 GC 日志：

```java
GODEBUG=gctrace=1
//从GC日志来看，GC占用了6%了CPU时间片，这已经挺严重的了：
gc 3 @46.886s 6%: 0.006+39+0.004 ms clock, 0.006+36/2.2/0.8+0.004 ms cpu, 420->435->210 MB, 420 MB goal, 1 P
```

1.3 goalng GC 策略：

```java
// 1. 内存达到上限触发GC
func BenchmarkAllocationEveryMs(b *testing.B) {
    // need permanent allocation to clear see when the heap double its size
    var s *[]int
    tmp := make([]int, 1100000, 1100000)
    s = &tmp

    var a *[]int
    for i := 0; i < b.N; i++  {
        tmp := make([]int, 10000, 10000)
        a = &tmp

        time.Sleep(time.Millisecond)
    }
    _ = a
    runtime.KeepAlive(s)
}
// 2. 时间达到触发GC的阈值
// 垃圾收集器关注的第二个指标是两个垃圾收集器之间的延迟。如果它没有被触发超过两分钟，一个循环将被强制。
// GC trace日志：
GC forced
gc 15 @121.340s 0%: 0.058+1.2+0.015 ms clock, 0.46+0/2.0/4.1+0.12 ms cpu, 1->1->1 MB, 4 MB goal, 8 P
```

####  MySQL

1.1 MySQL 日期时间列的默认值：

```sql
 create table test (str varchar(32), ts TIMESTAMP DEFAULT CURRENT_TIMESTAMP);
```
1.2 查看 MySQL 选择的库：

```sql
 select database() from dual;
```

1.3 查看 MySQL 库大小，表大小，索引大小：

```sql
# 查看所有库的大小
mysql> select concat(round(sum(DATA_LENGTH/1024/1024),2),'MB') as data  from TABLES;
+----------+
| data     |
+----------+
| 104.21MB |
+----------+
# 查看指定库的大小
mysql> select concat(round(sum(DATA_LENGTH/1024/1024),2),'MB') as data  from TABLES where table_schema='jishi';
+---------+
| data    |
+---------+
| 26.17MB |
+---------+
# 查看指定库的指定表的大小
mysql> select concat(round(sum(DATA_LENGTH/1024/1024),2),'MB') as data  from TABLES where table_schema='jishi' and table_name='a_ya';
+--------+
| data   |
+--------+
| 0.02MB |
+--------+
# 查看指定库的索引大小
mysql> SELECT CONCAT(ROUND(SUM(index_length)/(1024*1024), 2), ' MB') AS 'Total Index Size' FROM TABLES  WHERE table_schema = 'jishi'; 
+------------------+
| Total Index Size |
+------------------+
| 0.94 MB          |
+------------------+
# 查看指定库的指定表的索引大小
mysql> SELECT CONCAT(ROUND(SUM(index_length)/(1024*1024), 2), ' MB') AS 'Total Index Size' FROM TABLES  WHERE table_schema = 'test' and table_name='a_yuser'; 
+------------------+
| Total Index Size |
+------------------+
| 21.84 MB         |
+------------------+
# 查看一个库中的情况
mysql>  SELECT CONCAT(table_schema,'.',table_name) AS 'Table Name', CONCAT(ROUND(table_rows/1000000,4),'M') AS 'Number of Rows', CONCAT(ROUND(data_length/(1024*1024*1024),4),'G') AS 'Data Size', CONCAT(ROUND(index_length/(1024*1024*1024),4),'G') AS 'Index Size', CONCAT(ROUND((data_length+index_length)/(1024*1024*1024),4),'G') AS'Total'FROM information_schema.TABLES WHERE table_schema LIKE 'test';
+---------------+----------------+-----------+------------+---------+
| Table Name    | Number of Rows | Data Size | Index Size | Total   |
+---------------+----------------+-----------+------------+---------+
| test.a_br     | 0.4625M        | 0.0259G   | 0.0171G    | 0.0431G |
| test.a_skuclr | 0.7099M        | 0.0660G   | 0.0259G    | 0.0919G |
| test.a_yuser  | 1.0736M        | 0.0497G   | 0.0213G    | 0.0710G |
| test.test     | 0.0000M        | 0.0000G   | 0.0000G    | 0.0000G |
+---------------+----------------+-----------+------------+---------+
```


### 4.Share:

https://kaelzhang81.github.io/2019/05/24/Restful-API%E8%AE%BE%E8%AE%A1%E6%9C%80%E4%BD%B3%E5%AE%9E%E8%B7%B5/
Restful API设计最佳实践

https://www.cnblogs.com/sld666666/p/6145854.html
利用ANTLR4实现一个简单的四则运算计算器

https://ld246.com/article/1526032653405/comment/1528621487992
将 Go 的文件 IO 性能提高 100 倍的方法

https://www.cnblogs.com/sunsky303/p/11077030.html
教你如何找到Go内存泄露【精编实战】