---
title: ARTS-week-03
date: 2021-01-23 17:45:28
tags:
---


## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm： 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

1319. 连通网络的操作次数 https://leetcode-cn.com/submissions/detail/140603584/

### 2.Review:

https://github.com/npretto/pathfinding
路径规划算法 A\*、Dijkstra、BFS 可视化

#### 点评：

作者：npretto 广度优先搜索、Dijkstra和A\*是图的三种典型路径规划算法。它们都可用于图搜索，不同之处在于队列和启发式函数两个参数。作者都给出了可视化演示

算法的一般性原理如下：
- 将边界初始化为包含起始节点的队列。
- 当边界队列不为空时，从队列中“访问”并删除一个“当前”节点，同时将访问节点的每个邻居节点添加到队列，其成本是到达当前节点的成本加上从当前节点访问邻居的成本再加上邻居节点和目标节点的启发式函数值。其中，启发式函数是对两个节点的路径成本的估计。
- 存储访问路径（通常存储在cameFrom图中），以便后续重建路径。如果邻居节点已经在列表中，同时新路径的成本较低，那么更改其成本。
- 找到目标路径（提前退出）或列表为空时，停止算法。

BFS：使用先进先出队列实现BFS。这种队列会忽略路径中链接的开销，并根据跳数进行扩展，因此可以确保找到最短路径的跳数，而跳数相关的成本。启发式函数的选择是任意的，因为在这个过程中其并不起作用。使用数组可实现先进先出，即将元素附加到末尾并从头删除。

Dijkstra：在图上使用优先级队列和始终返回0的启发式函数，便得到Dijkstra算法。相比于BFS，Dijkstra最大的不同在于考虑了成本。通过该算法，可以根据节点到节点的成本找到最短路径。优先级队列使用数组实现，在每次插入新节点后对该数组进行排序。尽管实现优先级队列还有其他更高效的方式，但在我们的场景中，数组是足够快的，而且实现起来也简单。

A\*：为实现A\*算法，需要传递一个实际启发式函数，例如两个节点之间的欧式距离。通过“节点成本”+“节点到目标节点的估算成本”对节点进行加权，通过优先搜索更大可能的节点加快搜索速度。

非允许的启发式函数:只有应用可允许启发式函数，A\*才能找到最短路径，这也意味着算法永远不会高估实际路径长度。由于欧氏距离是两点之间的最短距离/路径，因此欧氏距离绝不会超出。但如果将其乘以常数k>0会怎样呢？这样会高估距离，成为非允许的启发式函数。

### 3.Tip:

1. Spark基于Yarn提交任务两种方式

- yarn-client提交任务方式
 - 客户端提交一个Application，在客户端启动一个Driver进程
 - Driver进程会向RS(ResourceManager)发送请求，启动AM(ApplicationMaster)的资源
 - RS收到请求，随机选择一台NM(NodeManager)启动AM。这里的NM相当于Standalone中的Worker节点
 - AM启动后，会向RS请求一批container资源，用于启动Executor
 - RS会找到一批NM返回给AM,用于启动Executor
 - AM会向NM发送命令启动Executor
 - Executor启动后，会反向注册给Driver，Driver发送task到Executor,执行情况和结果返回给Driver端

Yarn-client模式同样是适用于测试，因为Driver运行在本地，Driver会与yarn集群中的Executor进行大量的通信，会造成客户机网卡流量的大量增加

- yarn-cluster提交任务方式
 - 客户机提交Application应用程序
 - 发送请求到RS(ResourceManager),请求启动AM(ApplicationMaster)
 - RS收到请求后随机在一台NM(NodeManager)上启动AM（相当于Driver端）
 - AM启动，AM发送请求到RS，请求一批container用于启动Executor
 - RS返回一批NM节点给AM
 - AM连接到NM,发送请求到NM启动Executor
 - Executor反向注册到AM所在的节点的Driver。Driver发送task到Executor，监控task执行，回收结果

Yarn-Cluster主要用于生产环境中，因为Driver运行在Yarn集群中某一台nodeManager中，每次提交任务的Driver所在的机器都是随机的，不会产生某一台机器网卡流量激增的现象，缺点是任务提交后不能看到日志。只能通过yarn查看日志

2. Elasticsearch 查询高亮及聚合

- Elasticsearch 查询高亮：　

```json
{
  "query": {
      "bool": {
          "must":  [{
              "span_near": {
                  "clauses": [
                      {"span_term": {"description": "quick"}},
                      {"span_term": {"description": "over"}}
                  ],
                  "slop": 3,
                  "in_order":false
              }
          }]
      }
  },
  "highlight": {
      "fields": {
          "description": {
              "pre_tags": ["<b class='highlight_color'>"],
              "post_tags": ['</b>'],
              "number_of_fragments": 15,
              "boundary_scanner": "sentence",
              "boundary_chars": '.!?\t\n',
              "fragment_size": 0
          }
      }
  }
}
```

- Elasticsearch 的聚合主要分类： 指标聚合\桶聚合\矩阵聚合\管道聚合
  - 桶聚合-时间柱状聚合:
```json
{
"aggs":{
    "articles_over_time":{
        "date_histogram":{
              "field":"@timestamp",
              "interval":"month"
            }
        }
    }
}
```

### 4.Share:

https://blog.csdn.net/weixin_44904816/article/details/110212151
基于 Flink+Iceberg 构建企业级实时数据湖

https://segmentfault.com/a/1190000002967413
三种技术的融合

https://blog.csdn.net/ghy429090/article/details/94865922
开源OLAP系统对比

https://www.infoq.cn/article/trillion-log-and-data-storage-query-techniques
万亿级日志与行为数据存储查询技术剖析

https://nicedoc.io/dzharii/awesome-elasticsearch?theme=light
Elasticsearch相关资源
