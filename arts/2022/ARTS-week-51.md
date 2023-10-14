---
> **ARTS-week-51**
> 2022-12-18 20:54
---


###### ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
- Algorithm: 每周至少做一个 leetcode 的算法题
- Review: 阅读并点评至少一篇英文技术文章
- Tip: 学习至少一个技术技巧
- Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

- [1781. 所有子字符串美丽值之和 (^^+)](https://leetcode.cn/submissions/detail/388567081/)  
  + 思路:模拟
- [1785. 构成特定和需要添加的最少元素 (^^+)](https://leetcode.cn/submissions/detail/389369796/)  
  + 思路:贪心
- [1764. 通过连接另一个数组的子数组得到一个数组 (^^+)](https://leetcode.cn/submissions/detail/389718418/)  
  + 思路:模拟

### 2.Review:

- [Apache Solr 9.0 发布](https://opensourceconnections.com/blog/2022/07/07/apache-solr-9-0-released/)  

#### 点评：

Apache Solr 9.0于 2022 年 5 月 12 日发布。这个版本是自Solr从Apache Lucene项目中分离出来再次成为自己的顶级Apache项目以来的第一个主要版本（两者在2012年合并为一个项目）。这种分裂使Apache Solr能够专注于清理技术债务，并以与Lucene不同的节奏发布。

Solr 9是一个重要的版本，与其说是因为发布了新功能，不如说是因为已经解决的核心技术债务，以及为未来建立Solr的工作。

- 使用 Gradle for Java 11 构建

Apache Solr 9.0基于Apache Lucene 9.0，包括一系列依赖项更新。最低Java版本已经升级到Java 11（Docker版本使用Java 17）。此外，Solr现在使用Gradle构建，这简化了项目的依赖关系管理。许多依赖项已从旧的 Apache Ant 构建过程升级或简化。这应该有助于那些正在增加安全扫描的公司，因为许多旧的依赖项（其中一些会触发潜在的警告）已经得到解决。

- 模块使Solr更轻巧

从历史上看，Apache Solr项目维护了一些作为Solr的一部分发布的“贡献”（在/contrib目录中），例如学习排名功能。这些贡献扩展了Solr的功能，但也扩大了Solr的规模，并增加了安全足迹。

在清理技术债务的同时，Apache Solr将许多核心依赖项转移到新的Solr模块上。这些新模块包括SQL，HDFS，Hadoop身份验证等。这使用户能够仅选择他们实际想要使用的Solr部分，并大大减少了拉入的核心依赖项的数量。许多已弃用的项目（如数据导入处理程序 （DIH））也已删除，以精简分发。

- 新功能：向量、SQL、速率限制和日志

Apache Solr还添加了一些新功能。矢量搜索通过 DenseVectorField 字段类型和 K-Nearest-Neighbor （KNN） 查询解析器首次出现。Solr 管理 UI 中有一个新的 SQL 查询 UI，如果不需要，现在可以通过系统属性禁用管理 UI。

对与操作相关的项目进行了多项改进，例如速率限制和指定节点角色的功能。Solr 通过默认启用异步日志记录来改进日志记录。此外，默认情况下启用Jetty请求日志，以使Solr管理员更深入地了解向Solr本身发出的请求。

- 镜像现已正式发布

在新的Gradle构建系统的支持下，Apache Solr项目也接管了官方Solr Docker镜像的构建和发布。现在，这作为版本的一部分进行了测试，并包含在生成过程中。用户可以在本地构建 Solr Docker 镜像，以获得与发布到 Docker Hub 的输出相同的输出。

这篇博文只是触及了Apache Solr 9.0版本的表面，所以请尝试一下，亲眼看看！请务必查看发行说明和主要更改以查看所有详细信息。Anshum Gupta在Berlin Buzzwords上发表了关于Solr 9的精彩演讲，并且有来自Pure Insights和Solr.pl的博客可供阅读。

### 3.Tip:

#### Accessing body string of an OkHttp Response twice results in IllegalStateException: closed

```java
String responseBodyString = response.peekBody(Long.MAX_VALUE).string();
Log.d("TAG", responseBodyString);
```

### 4.Share:

- [【分享吧】嵌入式数据库 H2 Database vs SQLite](https://www.modb.pro/db/196155)

- [Android流行ORM框架性能对比及Room踩坑总结](http://andyken.github.io/2017/10/26/Android%E6%B5%81%E8%A1%8CORM%E6%A1%86%E6%9E%B6%E6%80%A7%E8%83%BD%E5%AF%B9%E6%AF%94%E5%8F%8ARoom%E8%B8%A9%E5%9D%91%E6%80%BB%E7%BB%93/)

- [android webview同步cookie](https://www.jianshu.com/p/3f9fcde4b80f)
