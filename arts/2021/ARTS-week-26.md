---
> **ARTS-week-26**
> 2021-07-04 20:00
---


## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm： 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

645. 错误的集合：https://leetcode-cn.com/submissions/detail/192073198/
1833. 雪糕的最大数量：https://leetcode-cn.com/submissions/detail/191509915/
LCP 07. 传递信息：https://leetcode-cn.com/submissions/detail/191208704/

### 2.Review:

https://www.confluent.io/blog/analytics-with-apache-kafka-and-rockset/
使用 Apache Kafka 和 Rockset 的实时分析和监控仪表板

#### 点评：

早期，许多公司只是使用 Apache Kafka ®将数据摄取到 Hadoop 或其他数据湖中。然而，Apache Kafka 不仅仅是消息传递。今天的显着区别在于，公司使用 Apache Kafka 作为事件流平台来构建关键任务基础设施和核心运营平台。示例包括微服务架构、大型机集成、即时支付、欺诈检测、传感器分析、实时监控等等——由商业价值驱动，从每个新的 Kafka 项目开始，这应该始终是一个关键驱动因素：通过 Kafka 访问大量事件流数据引发了对交互式实时仪表板和分析的驱动，其想法类似于过去使用 Impala、Presto 或 BigQuery 在 Hadoop 等批处理框架之上构建的内容: 用户想快速提问并得到答案。

- Apache Kafka 作为实时分析的事件流平台：
  - Apache Kafka 是一个结合了消息、存储和数据处理的事件流平台。
  - Kafka 通常充当现代集成层的核心基础。
  - Kafka 不仅可以用于实时和批处理应用程序，而且还可以与非事件流通信范式（如文件、REST 和 JDBC）集成。
  - Kafka Connect是事件流架构中的核心组件。

- Rockset 技术概述：
  - Rockset 是一个无服务器搜索和分析引擎，可以从 Kafka 连续摄取数据流，而无需固定模式，并为该数据提供快速 SQL 查询。
  - Rockset 采用聚合索引，其中每个文档在文档、搜索和列索引中以多种方式被索引，为实时分析提供低延迟查询。
  - Rockset 旨在充分利用云弹性进行分布式查询处理，从而确保大规模的可靠性能，而无需管理分片或服务器。

- 使用 Kafka 和 Rockset 的实时决策和实时仪表板：
  - 将 Kafka 连接到 Rockset
  - 从 Kafka 数据源创建集合
  - 从 Kafka 查询 Twitter 数据
  - 与其他数据集连接
  - 为Kafka数据生成实时监控仪表盘

总结：对可扩展的事件流数据进行交互式分析，以便在数据热时采取行动,借助 Confluent Platform 和 Rockset，您可以使用 SQL 查询实时处理和分析大量数据流，无论是通过命令行上的人工交互还是自定义用户界面，集成到您公司的标准 BI 工具中，还是内部自动化卡夫卡应用程序。

### 3.Tip:

#### java 十进制转换成二进制数

1.1 十进制转成二进制：

```java
String s = Integer.toBinaryString(n)  //将十进制数转成字符串，例如n=5 ，s = "101"
```

1.2 将字符串转成整形：

```java
int a = Integer.valueof("1002");  //当然s只能是数字类的字符串
或者
int a = Integer.parseInt("1002");
```

1.3 将整形转成字符串：

```java
String s = String.valueof(1025);  //直接转成了
```

1.4 将整形转成十六进制的数：

```java
String s = Integer.toHexString(18);   //输出结果12
```

#### Java 中 List<String> 与 String 字符串互转

```java
System.out.println("+++++++++++++++++++++++++++++++++");
System.out.println("List转字符串");
List<String> list1 = new ArrayList<String>();
list1.add("1");
list1.add("2");
list1.add("3");
String ss = String.join(",", list1);
System.out.println(StringUtils.join("",list1));
System.out.println(ss);
System.out.println("+++++++++++++++++++++++++++++++++");
System.out.println("字符串转List");
List<String> listString = Arrays.asList(ss.split(","));
for (String string : listString) {
    System.out.println(string);
}
System.out.println("+++++++++++++++++++++++++++++++++");
```


#### Java List 转 String 数组与 String 数组转 List

1.1 String 数据转 List：

```java
String title = "\t 10月上旬\t 10月中旬\t 10月下旬"; 
String[] arrTitles = title.split("\t");

// 方法1（不推荐）：
List<String> titleList = Arrays.asList(arrTitles);
// 注意：Arrays.asList()将数组转换为集合后，底层其实还是数组。Arrays.asList() 方法返回的并不是 java.util.ArrayList ，而是 java.util.Arrays 的一个内部类，这个内部类并没有实现集合的修改方法或者说并没有重写这些方法。使用集合的修改方法:add()、remove()、clear()会抛出异常。

// 方法2：
List list = new ArrayList<>(Arrays.asList(arrTitles));

// 方法3（推荐）：
//使用 Java8 的Stream
List list2 = Arrays.stream(arrTitles).collect(Collectors.toList());
//基本类型也可以实现转换（依赖boxed的装箱操作）
int [] arrIndex = { 1, 2, 3 };
List listIndex = Arrays.stream(arrIndex).boxed().collect(Collectors.toList());

// 方法4：
//使用 Apache Commons Collections
List<String> list3 = new ArrayList<String>();
CollectionUtils.addAll(list3,arrTitles);
```

1.2 List 转 String 数组：

```java
//List转String
String[] strs1 = titleList.toArray(new String[titleList.size()]);
```

### 4.Share:

http://tonybai.com/2020/03/10/visualizing-memory-management-in-golang
可视化 golang 内存管理

https://zhuanlan.zhihu.com/p/142641300
一文搞懂 match、match_phrase 与 match_phrase_prefix 的检索过程
