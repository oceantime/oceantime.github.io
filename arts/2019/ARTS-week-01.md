---
title: ARTS-week-1
date: 2019-09-22 11:43:30
tags:
---

## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm： 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

Two Sum：https://leetcode.com/submissions/detail/256656862/

### 2.Review:

How to define and spend  your tech debt budget
https://hackernoon.com/how-to-define-and-spend-your-tech-debt-budget-8429z32h2

点评：
文章提到一个困境是：
如果业务压力接管，公司可能承担过多的技术债务，工程师最终失去动力，公司在技术上破产，他们的竞争对手获胜。
如果工程压力接管，公司可能会承担太少的技术债务，竞争对手更快地发运产品和功能，获得市场上最大的份额，并使用现金来偿还技术债务。再次输了。

如何衡量技术债务 [下周Review](https://www.notion.so/stepsize/3-Metrics-to-Understand-Tackle-Technical-Debt-4e7442a592cf40759bdd7e3733b7f815)

需要承担多少债务
识别按季度路标线图新特性和有技术债务的代码库工作的交集部分。然后，只偿还该交集中的债务，不能超过这个范围。

使用数据来确定需要偿还技术债的区域：
1.识别代码库中所有权较弱的文件。
2.测量这些文件的内聚和耦合。
3.计算每个文件的流失以识别问题文件的子集。
4.将这些文件与本季度的路标线图进行比较。

### 3.Tip:

在使用 Elasticsearch 的时候，经常会遇到多维分析的场景。
通常为了方便数据淘汰，并使得数据管理更加灵活，我们经常会以时间为粒度建立索引,
但实际业务需要进行多维度的数据分析，往往需要组合多个索引，为了很好的支撑这个场景，
需要使用到 Elasticsearch 里的两个东西，索引别名和 Template。

索引别名：建立索引对外的统一视图
例如，如果建立了上述类似的索引时间序列，在查询的时候以wildcards的方式指定索引，例如 index=monthly-*，或者 index=daily-201710*。
当需要组合索引分析时使用索引别名例如 myAnalysis

建立索引别名方法:
``` bash
curl -XPOST 'http://{IP}:{PORT}/_aliases' -d '
{
    "actions": [
        {"add": {"index": "app-201908", "alias": "myAnalysis"}},
        {"add": {"index": "app-201909", "alias": "myAnalysis"}} 
    ]
}'
```

### 4.Share:

详解Java Quartz Job Scheduling(https://blog.csdn.net/zhuyiquan/article/details/81809160)
