---
title: ARTS-week-39
date: 2020-06-07 09:43:29
tags:
---

## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm： 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

Coin Change 2 https://leetcode.com/submissions/detail/350215476/

### 2.Review:

https://dev.to/lydiahallie/javascript-visualized-the-javascript-engine-4cdf
JavaScript️可视化： JavaScript 引擎

#### 点评：

Lydia Hallie 基于 Node.js 和 Chrom 的浏览器所用的 V8 引擎讲解 js 代码是如何运行的。

1.代码加载：代码从 网络请求、缓存 或者 Service Worker 中加载并以 UTF-16 字节流加载到字节流解码器。

2.生成抽象语法树（AST）：词法分析，字节流解码器生成单词， 语法分析，解析器生成抽象语法树。

- 词法分析：字节流解码器从代码字节流中识别出一个个单词（token）后传递给 解析器（parser）
- 语法分析：JavaScript 引擎使用了两个解析器。一个是 预解析器，一个是 解析器。 为了减少加载网站所需的时间，该引擎尝试避免分析不需要立即执行的代码。
  - 解析器（parser）：处理立即需要的代码
  - 预解析器（pre-parser）：处理稍后可能使用的代码。 

3.生成字节码：接下来就要交给 解释器（interpreter） 了。解释器会遍历整个 AST，并生成 字节码。当字节码生成后，AST 便会被删除以节省内存空间。最终我们得到了更贴近 机器码 的 字节码。

4.执行字节码：生成了字节码之后，就可以进入执行阶段了。执行阶段过程中引擎会做一些优化操作，一个是 即时编译，一个是 内联缓存。

- 即时编译（JIT：Just In Time）
尽管 字节码 很快，但是它还可以更快！解释器在逐条解释执行字节码时，会分析是否有某段代码被多次执行，这样的代码被称为 热点代码。
热点代码 和生成的 类型反馈 （type feedback） 会被发送到一个称为 优化编译器 的东西中，然后由它转换为可以直接被电脑执行的 机器码，这样在下次执行这段代码的时候就不需要再编译了，从而大大提升了代码的执行效率。

- 内联缓存
JavaScript 是一种动态类型的语言，这意味着数据类型可以不断变化。如果 JS 引擎每次都要检查数据的类型，那速度将会非常慢。
所以引擎就使用了一种叫做 内联缓存 （inline caching） 的技术。它将代码缓存在内存中，以便将来可以针对相同的行为直接返回缓存的值。比如你有一个函数调用了 100 次，每次都返回同一个值，那么引擎就会假定在 101 次时也返回该值。

总结
JavaScript 引擎执行代码主要过程： 代码加载 -> 生成抽象语法树 ->  生成字节码 -> 执行字节码

### 3.Tip:

1.StreamSets 是一家致力于数据处理与分析的大数据解决方案的公司。公司主要选择 DataOps 发展路线，解决将数据转化为业务价值的重大挑战。

参考：https://streamsets.com/why-dataops/what-is-dataops/

- Streamsets 推出的产品主要包含：
Data Collector：是一种轻量级，功能强大的设计和执行引擎，可实时传输数据。使用该软件来路由和处理数据流中的数据。目前为开源产品。
Transformer：是一个执行引擎，可在Apache Spark（一种开放源代码群集计算框架）上运行数据处理管道。由于Transformer管道在群集上部署的Spark上运行，因此管道可以执行转换，这些转换需要以批处理或流模式对整个数据集进行大量处理。暂未开源。
Control Hub：是所有数据流管道的中央控制点。Control Hub允许团队大规模构建和执行大量复杂的数据流。收费产品，可申请试用。

- Data Collector：可以实现不写一行代码完成数据的采集和流转。 通过拖拽式的可视化界面，实现数据管道 Pipelines 的设计和定时任务调度。最大的特点有：
  - 可视化界面操作，不写代码完成数据的采集和流转
  - 内置监控，可是实时查看数据流传输的基本信息和数据的质量
  - 强大的整合力，对现有常用组件全力支持，包括50种数据源、44种数据操作、46种目的地。

- Data Collector 最重要的概念就是数据源 (Origins)、操作 (Processors)、目的地 (Destinations)。 创建一个Pipelines管道配置也基本是这三个方面：
  - Origins 常用的有 Kafka、HTTP、UDP、JDBC、HDFS 等；
  - Processors 可以实现对每个字段的过滤、更改、编码、聚合等操作；
  - Destinations 跟 Origins差不多，可以写入Kafka、Flume、JDBC、HDFS、Redis等。

2.Tarball 安装

```shell

1.下载完整或核心的 Data Collector tarball：
https://streamsets.com/products/dataops-platform/data-collector/download/

2.将使用以下命令压缩包解压到所需位置：

tar zxf streamsets-datacollector-all-3.15.0.tgz

3.配置： 

目录结构：
bin：运行脚本目录
etc：默认配置文件目录，包括系统配置、权限配置、邮件配置、日志配置等
data：默认数据目录，用于存储用户设计的数据流等
log：默认的日志目录，包括GC日志和系统日志
libexec：默认运行时环境配置目录
streamsets-libs：默认系统自带组件目录
user-libs：用户自定义开发组件目录
edge-binaries：Streamsets DC Edge 各种类型的安装包

配置：
启动之前配置用于存储配置文件，在 $SDC_DIST 运行时目录之外创建用于配置，数据，日志和资源文件的目录。并确保文件目录的读写权限。在 $SDC_DIST/libexec/sdc-env.sh 文件中，将以下环境变量设置为新创建的目录：

SDC_CONF：数据收集器配置目录
SDC_DATA：数据收集器目录，用于管道状态和配置信息
SDC_LOG：日志的数据收集器目录
SDC_RESOURCES：运行时资源文件的数据收集器目录。

将所有文件从 $SDC_DIST/etc 复制到新创建的 $SDC_CONF 目录。

4.启动 Data Collector：

bin/streamsets dc

5.后台托管启动 Data Collector：

nohup bin/streamsets dc >/dev/null 2>&1 &

6.访问地址 http://Ip:18630/ 默认用户密码为：admin/admin

```

3.Docker 安装

```shell

1.创建数据目录并启动：
mkdir -p /opt/streamset-datas
docker run --restart on-failure –v /opt/streamset-datas:/data -p 18630:18630 -d --name streamsets-dc streamsets/datacollector dc

2.访问地址 http://Ip:18630/ 默认用户密码为：admin/admin

```

### 4.Share:

虚拟DOM与真实DOM的区别
https://www.cnblogs.com/jack-wangsir/articles/12564674.html