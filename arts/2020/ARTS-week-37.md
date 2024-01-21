---
title: ARTS-week-37
date: 2020-09-20 18:00:13
tags:
---


## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm: 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

Shortest Path in Binary Matrix https://leetcode.com/submissions/detail/398332905/

### 2.Review:

https://www.oreilly.com/content/rethinking-task-size-in-sre/
重新思考任务大小

#### 点评：

作者 Luis Otero and Ulrich Spörlein 发现以更少，更大的任务运行工作可以显着提高我们的效率（对于本文中描述的示例，该效率提高了25％），这促使我们探索并采用垂直扩展来提高我们的计算基础架构团队的效率。

为什么更大的副本会更高效？

- 任务成本分类：中间的框 v 指示与正在处理的工作量（例如，网络请求）成比例或至少相关的资源部分。底部的方框 f 表示开发人员为运行预定任务支付的费用。它是按副本修复的，不会因负载而变化。修复成本的示例包括程序中的静态变量，二进制文本，监视，日志记录以及保持前端/后端连接打开。因此，减少任务数量可以减少工作消耗的固定成本总额。

多个数据点和观察结果表明，通过这种技术评估舰队可以节省大量资源。例如：
- 机器越来越大
- 有水平缩放的偏好
- 资源配置会随着时间而过时
- 高利用率并不意味着高效率
- 重塑可以（但是）提高利用率

重新重塑工作，并迭代过程，在此过程中可以通过不同的大小来评估作业。具体步骤如下：
- 识别并监控相关的SLO和效率指标
- 选择要试验的任务
- 以适当的速度调整作业大小
- 评估收集到的效率指标，以确保赢得效率，同时仍要满足工作的SLO标准
- 如果度量标准分析表明该作业从调整大小中受益，请重复步骤3和4

选择适当的指标
- 为了确定任务是否在提高生产率，有必要确定衡量效率的适当指标。效率指标通常表示为QPS / CPU（每CPU每秒查询数）或服务生产率。后者可能是特别有用的，因为它是用户定义的并且可以抽象出正在执行的实际工作。

风险与警告
- 随着任务变大并开始处理更大的负载，可能会开始出现不同类型的现象，从而影响其继续扩展的能力-甚至在某些极端情况下危及服务的稳定性。

权衡延迟以提高效率
- 重塑数据中心的服务可以为资源使用和效率带来好处。这些资源节省是通过降低此类服务的客户端看到的延迟来进行权衡的。

结论：
  技术在机器尺寸上呈上升趋势。与其他因素一起，这为使用垂直可伸缩性提供了令人信服的理由，它可以减少工作的固定成本并提高软件效率。Google已经注意到并正在积极修改其工作形式，以减少其计算基础架构的占用空间，从而节省了实际的资金。

### 3.Tip:

Clickhouse 创建 MySQL 引擎表

```shell

语法：
CREATE TABLE [IF NOT EXISTS] [db.]table_name [ON CLUSTER cluster]
(
    name1 [type1] [DEFAULT|MATERIALIZED|ALIAS expr1] [TTL expr1],
    name2 [type2] [DEFAULT|MATERIALIZED|ALIAS expr2] [TTL expr2],
    ...
) ENGINE = MySQL('host:port', 'database', 'table', 'user', 'password'[, replace_query, 'on_duplicate_clause']);
 
解释：
host:port MySQL服务器的地址和端口
database MySQL中的数据库名
table 表示需要映射的MySQL表名称
user mysql的用户名
password mysql的用户名对应的密码
replace_query 默认为0，对应于MySQL的REPLACE INTO 语法；若为1则会用replace into 代替insert into
on_duplicate_clause 默认为0 对应MySQL的 ON DUPLICATE KEY语法，若需要使用该设置则必须将replace——query 设置为0.

```

### 4.Share:

https://www.zoomdata.com/master-class/state-market/state-data-analytics-and-visualization-adoption/?utm_source=oreilly&utm_medium=press-release&utm_content=master-class&utm_campaign=master-class-oreilly-state-of-data-analytics-sep-2017
数据分析和可视化采用| 缩放数据