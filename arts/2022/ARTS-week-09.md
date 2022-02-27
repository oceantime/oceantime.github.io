---
> **ARTS-week-09**
> 2022-02-27 12:17
---


###### ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
- Algorithm： 每周至少做一个 leetcode 的算法题
- Review: 阅读并点评至少一篇英文技术文章
- Tip: 学习至少一个技术技巧
- Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

- [969 煎饼排序](https://leetcode-cn.com/submissions/detail/270519144/)  
  + 思路：递归
    * 第一次翻转，将最大饼翻到最上面
    * 第二次翻转，将最大饼翻到最下面
- [688. 骑士在棋盘上的概率](https://leetcode-cn.com/submissions/detail/267476067/)  
  + 思路：记忆化搜索
- [151. 翻转字符串里的单词](https://leetcode-cn.com/submissions/detail/267316473/)  
  + 思路：递归
    * 空格字符串分割用 \\s+
    * 先翻转，再收缩

### 2.Review:

- [Elasticsearch 管道聚合综合指南：第 II 部分](https://qbox.io/blog/introduction-to-elasticsearch-pipeline-aggregations-part-ii/)  

#### 点评：

在之前的教程中，我们讨论了 Elasticsearch 管道聚合的结构，并引导设置了几个常见的管道，例如导数、累积总和 avg 桶聚合。

在本文中，我们将继续分析 Elasticsearch 管道聚合，重点介绍统计信息、移动平均线和移动函数、百分位数、存储桶排序和存储桶脚本等管道。Kibana 支持本文中讨论的一些管道聚合（如移动平均线），因此我们还将展示如何可视化它们。让我们开始吧！

教程
本教程中的示例在以下环境中进行了测试：
Elasticsearch 6.4.0
Kibana 6.4.0

在本教程中，我们将使用流量数据创建一个索引。索引映射将包含三个字段：date、 visit 和 smax_time_spent。
下面是索引映射：
```json
curl -XPUT "http://localhost:9200/traffic_stats/" -H "Content-Type: application/json" -d'
{
   "mappings": {
      "blog": {
         "properties": {
            "date": {
               "type": "date",
               "format": "dateOptionalTime"
            },
            "visits": {
               "type": "integer"
            },
             "max_time_spent": {
                 "type": "integer"
             }
         }
      }
   }
}'
```
创建索引映射后，让我们将一些任意数据保存到其中：

```json
curl -XPOST "http://localhost:9200/traffic_stats/_bulk" -H "Content-Type: application/json" -d'
{"index":{"_index":"traffic_stats","_type":"blog"}}
{"visits":"488", "date":"2018-10-1", "max_time_spent":"900"}
{"index":{"_index":"traffic_stats","_type":"blog"}}
{"visits":"783", "date":"2018-10-6", "max_time_spent":"928"}
{"index":{"_index":"traffic_stats","_type":"blog"}}
{"visits":"789", "date":"2018-10-12", "max_time_spent":"1834"}
{"index":{"_index":"traffic_stats","_type":"blog"}}
{"visits":"1299", "date":"2018-11-3", "max_time_spent":"592"}
{"index":{"_index":"traffic_stats","_type":"blog"}}
{"visits":"394", "date":"2018-11-6", "max_time_spent":"1249"}
{"index":{"_index":"traffic_stats","_type":"blog"}}
{"visits":"448", "date":"2018-11-24", "max_time_spent":"874"}
{"index":{"_index":"traffic_stats","_type":"blog"}}
{"visits":"768", "date":"2018-12-18", "max_time_spent":"876"}
{"index":{"_index":"traffic_stats","_type":"blog"}}
{"visits":"1194", "date":"2018-12-24", "max_time_spent":"1249"}
{"index":{"_index":"traffic_stats","_type":"blog"}}
{"visits":"987", "date":"2018-12-28", "max_time_spent":"1599"}
{"index":{"_index":"traffic_stats","_type":"blog"}}
{"visits":"872", "date":"2019-01-1", "max_time_spent":"828"}
{"index":{"_index":"traffic_stats","_type":"blog"}}
{"visits":"972", "date":"2019-01-5", "max_time_spent":"723"}
{"index":{"_index":"traffic_stats","_type":"blog"}}
{"visits":"827", "date":"2019-02-5", "max_time_spent":"1300"}
{"index":{"_index":"traffic_stats","_type":"blog"}}
{"visits":"1584", "date":"2019-02-15", "max_time_spent":"1500"}
{"index":{"_index":"traffic_stats","_type":"blog"}}
{"visits":"1604", "date":"2019-03-2", "max_time_spent":"1488"}
{"index":{"_index":"traffic_stats","_type":"blog"}}
{"visits":"1499", "date":"2019-03-27", "max_time_spent":"1399"}
{"index":{"_index":"traffic_stats","_type":"blog"}}
{"visits":"1392", "date":"2019-04-8", "max_time_spent":"1294"}
{"index":{"_index":"traffic_stats","_type":"blog"}}
{"visits":"1247", "date":"2019-04-15", "max_time_spent":"1194"}
{"index":{"_index":"traffic_stats","_type":"blog"}}
{"visits":"984", "date":"2019-05-15", "max_time_spent":"1184"}
{"index":{"_index":"traffic_stats","_type":"blog"}}
{"visits":"1228", "date":"2019-05-18", "max_time_spent":"1485"}
{"index":{"_index":"traffic_stats","_type":"blog"}}
{"visits":"1423", "date":"2019-06-14", "max_time_spent":"1452"}
{"index":{"_index":"traffic_stats","_type":"blog"}}
{"visits":"1238", "date":"2019-06-24", "max_time_spent":"1329"}
{"index":{"_index":"traffic_stats","_type":"blog"}}
{"visits":"1388", "date":"2019-07-14", "max_time_spent":"1542"}
{"index":{"_index":"traffic_stats","_type":"blog"}}
{"visits":"1499", "date":"2019-07-24", "max_time_spent":"1742"}
{"index":{"_index":"traffic_stats","_type":"blog"}}
{"visits":"1523", "date":"2019-08-13", "max_time_spent":"1552"}
{"index":{"_index":"traffic_stats","_type":"blog"}}
{"visits":"1443", "date":"2019-08-19", "max_time_spent":"1511"}
{"index":{"_index":"traffic_stats","_type":"blog"}}
{"visits":"1587", "date":"2019-09-14", "max_time_spent":"1497"}
{"index":{"_index":"traffic_stats","_type":"blog"}}
{"visits":"1534", "date":"2019-09-27", "max_time_spent":"1434"}
'
```
现在，一切都已准备就绪，以说明一些管道聚合。让我们从统计信息存储桶聚合开始。

- 统计桶聚合

正如我们在指标聚合系列中所讨论的，统计信息聚合会计算索引中某些数值字段的一组统计度量值，例如最小值、最大值、平均值和总和。在 Elasticsearch 中，还可以计算由其他聚合生成的存储桶的统计信息。当必须首先使用其他一些聚合计算每个存储桶的统计信息聚合所需的值时，这非常有用。

为了理解这个想法，让我们看下面的例子：

```json
curl -X POST "localhost:9200/traffic_stats/_search?size=0&pretty" -H 'Content-Type: application/json' -d'
{
    "aggs" : {
        "visits_per_month" : {
            "date_histogram" : {
                "field" : "date",
                "interval" : "month"
            },
            "aggs": {
                "total_visits": {
                    "sum": {
                        "field": "visits"
                    }
                }
            }
        },
        "stats_monthly_visits": {
            "stats_bucket": {
                "buckets_path": "visits_per_month>total_visits" 
            }
        }
    }
}
'
```
在此查询中，我们首先为"访问次数"字段生成日期直方图，并计算每个生成的存储桶的每月总访问量。接下来，我们使用管道计算每个生成的存储桶的统计信息。响应应如下所示：stats

```json
...
"aggregations" : {
  "visits_per_month" : {
    "buckets" : [
      ....
      {
        "key_as_string" : "2019-07-01T00:00:00.000Z",
        "key" : 1561939200000,
        "doc_count" : 2,
        "total_visits" : {
          "value" : 2887.0
        }
      },
      {
        "key_as_string" : "2019-08-01T00:00:00.000Z",
        "key" : 1564617600000,
        "doc_count" : 2,
        "total_visits" : {
          "value" : 2966.0
        }
      },
      {
        "key_as_string" : "2019-09-01T00:00:00.000Z",
        "key" : 1567296000000,
        "doc_count" : 2,
        "total_visits" : {
          "value" : 3121.0
        }
      }
    ]
  },
  "stats_monthly_visits" : {
    "count" : 12,
    "min" : 1844.0,
    "max" : 3121.0,
    "avg" : 2582.8333333333335,
    "sum" : 30994.0
  }
}
```
在后台，统计信息聚合对日期直方图生成的存储桶执行最小、最大值、avg 和 sum 管道聚合，计算结果，然后在响应结束时反映它们。扩展的统计信息存储桶聚合具有相同的逻辑，只是它返回其他统计信息，如方差、平方和、标准差和标准差边界。让我们稍微调整上面的查询以使用扩展的统计信息管道：

```json
curl -X POST "localhost:9200/traffic_stats/_search?size=0&pretty" -H 'Content-Type: application/json' -d'
{
    "aggs" : {
        "visits_per_month" : {
            "date_histogram" : {
                "field" : "date",
                "interval" : "month"
            },
            "aggs": {
                "total_visits": {
                    "sum": {
                        "field": "visits"
                    }
                }
            }
        },
        "stats_monthly_visits": {
            "extended_stats_bucket": {
                "buckets_path": "visits_per_month>total_visits" 
            }
        }
    }
}
'
```

响应将包含比简单统计信息桶聚合更多的统计信息：
```json
....
"stats_monthly_visits" : {
  "count" : 12,
  "min" : 1844.0,
  "max" : 3121.0,
  "avg" : 2582.8333333333335,
  "sum" : 30994.0,
  "sum_of_squares" : 8.21767E7,
  "variance" : 177030.30555555597,
  "std_deviation" : 420.7496946588981,
  "std_deviation_bounds" : {
    "upper" : 3424.3327226511296,
    "lower" : 1741.3339440155373
  }
}
```

Kibana 支持标准偏差边界的可视化，可能会在上面的响应中看到这一点。在下图中，我们看到了日期直方图生成的每个存储桶的上限（蓝色）和下限（绿色）标准偏差边界：
![An image](./images/ARTS-week-09-1.png)

### 3.Tip:

#### ElasticSearch 创建模板与查询模板
```java
// 1.创建模版：
curl -PUT http://ip:9200/_template/模版名称
 
{
  "index_patterns": [
    "*"
  ],
  "order": 0,
  "version": 1,
  "mappings": {
    "dynamic_templates": [
      {
        "string_fields": {
          "match": "*Text",
          "mapping": {
            "type": "text",
            "analyzer": "ik_max_word",
            "fields": {
              "keyword": {
                "type": "keyword"
              }
            }
          }
        }
      },
      {
        "nested_fields": {
          "match": "*_nested",
          "mapping": {
            "type": "nested"
          }
        }
      }
    ]
  }
}
// 2.查询模版：
curl -GET http://ip:9200/_template/模版名称
```

### 4.Share:

- [数据集成之 kettle、sqoop、datax、streamSets 比较](https://my.oschina.net/peakfang/blog/2056426)  

- [es 创建索引_ES中的动态映射和动态模板](https://blog.csdn.net/weixin_39768645/article/details/110649381)  

- [关于Oracle的NVARCHAR2在mybatis-generator中的使用](https://blog.csdn.net/u014418725/article/details/79526262)  

- [Java JDBC中，MySQL字段类型到JAVA类型的转换](https://www.cnblogs.com/waterystone/p/6226356.html)  

- [What is the correct java.sql.Types for Oracle's NVARCHAR2](https://stackoverflow.com/questions/22761042/what-is-the-correct-java-sql-types-for-oracles-nvarchar2)  
