---
> **ARTS-week-07**
> 2022-02-12 20:54
---


###### ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
- Algorithm： 每周至少做一个 leetcode 的算法题
- Review: 阅读并点评至少一篇英文技术文章
- Tip: 学习至少一个技术技巧
- Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

- [1020. 飞地的数量](https://leetcode-cn.com/submissions/detail/267517848/)  
  + 思路：递归
    * 沉没网格边界的岛屿
    * 遍历剩余的岛屿
- [15. 三数之和](https://leetcode-cn.com/submissions/detail/267476067/)  
  + 思路：对撞指针+递归
- [870. 优势洗牌](https://leetcode-cn.com/submissions/detail/267316473/)  
  + 思路：排序+双指针
    * 当前值相比大则移动右指针，相比小移动左指针

### 2.Review:

- [Elasticsearch 管道聚合综合指南：第 I 部分](https://qbox.io/blog/comprehensive-guide-to-elasticsearch-pipeline-aggregations-part-i/)  

#### 点评：

在本文中讨论的管道聚合处理其他聚合生成的输出，这些聚合转换它们已经计算的值。因此，管道聚合适用于原始文档集中不存在的中间值。这使得管道聚合对于计算复杂的统计和数学度量（如累积和、导数和移动平均线等）非常有用。

在本系列的第一部分中，我们将讨论两种基本类型的管道聚合，并展示常见 Elasticsearch 管道的示例，如总和累积总和、最小值和最大值、平均存储桶和派生管道聚合。

- 最小和最大存储桶聚合：
最大存储桶聚合是同级管道聚合，用于搜索同级聚合中某个指标的最大值的存储桶，并输出存储桶的值和键。指标必须是数字，并且同级聚合必须是多存储桶聚合。

在下面的示例中，最大存储桶聚合计算日期直方图聚合生成的所有存储桶中每月总访问量的最大数量。在这种情况下，最大存储桶聚合以总和聚合的结果为目标，即其同级聚合。total_visits：
```txt
curl -X POST "localhost:9200/traffic_stats/_search?size=0&pretty" -H 'Content-Type: application/json' -d'
{
  "aggs": {
    "visits_per_month": {
      "date_histogram": {
        "field": "date",
        "interval": "month"
      },
      "aggs": {
        "total_visits": {
          "sum": {
            "field": "visits"
          }
        }
      }
    },
    "max_monthly_visits": {
      "max_bucket": {
        "buckets_path": "visits_per_month>total_visits" 
      }
    }
  }
}
'
```
上面的查询应返回以下结果。

```json
"aggregations" : {
    "visits_per_month" : {
      "buckets" : [
        {
          "key_as_string" : "2018-10-01T00:00:00.000Z",
          "key" : 1538352000000,
          "doc_count" : 3,
          "total_visits" : {
            "value" : 2060.0
          }
        },
        {
          "key_as_string" : "2018-11-01T00:00:00.000Z",
          "key" : 1541030400000,
          "doc_count" : 3,
          "total_visits" : {
            "value" : 2141.0
          }
        },
        {
          "key_as_string" : "2018-12-01T00:00:00.000Z",
          "key" : 1543622400000,
          "doc_count" : 3,
          "total_visits" : {
            "value" : 2949.0
          }
        },
        {
          "key_as_string" : "2019-01-01T00:00:00.000Z",
          "key" : 1546300800000,
          "doc_count" : 2,
          "total_visits" : {
            "value" : 1844.0
          }
        },
        {
          "key_as_string" : "2019-02-01T00:00:00.000Z",
          "key" : 1548979200000,
          "doc_count" : 2,
          "total_visits" : {
            "value" : 2411.0
          }
        },
        {
          "key_as_string" : "2019-03-01T00:00:00.000Z",
          "key" : 1551398400000,
          "doc_count" : 2,
          "total_visits" : {
            "value" : 3103.0
          }
        },
        {
          "key_as_string" : "2019-04-01T00:00:00.000Z",
          "key" : 1554076800000,
          "doc_count" : 2,
          "total_visits" : {
            "value" : 2639.0
          }
        },
        {
          "key_as_string" : "2019-05-01T00:00:00.000Z",
          "key" : 1556668800000,
          "doc_count" : 2,
          "total_visits" : {
            "value" : 2212.0
          }
        },
        {
          "key_as_string" : "2019-06-01T00:00:00.000Z",
          "key" : 1559347200000,
          "doc_count" : 2,
          "total_visits" : {
            "value" : 2661.0
          }
        },
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
    "max_monthly_visits" : {
      "value" : 3121.0,
      "keys" : [
        "2019-09-01T00:00:00.000Z"
      ]
    }
  }
```
总和聚合计算了每个月存储桶的所有访问量的总和。然后，我们的最大存储桶管道聚合评估了结果，并确定了最大访问量值为 3121 的存储桶— "2019-09-01" 存储桶的值。

最小存储桶聚合具有相同的逻辑。要使其正常工作，我们只需要将 替换为 查询中的 。max_bucketmin_bucket：

```json
"min_monthly_visits": {
  "min_bucket": {
    "buckets_path": "visits_per_month>total_visits" 
  }
}
```
它将返回每月总访问量的最小数量：

```json
...
"avg_monthly_visits" : {
  "value" : 1844.0,
  "keys" : [
    "2019-01-01T00:00:00.000Z"
  ]
}
```
这是"2019-01-01"存储桶的值。

### 3.Tip:

#### List 转 Array
```java
// array
Integer[] arr = new Integer[list.size()];
arr = list.toArray(arr);
// 2D array
List<int[]> res = new ArrayList();
res.toArray(new int[0][0]);
// lambda
int[] arr = list.stream().mapToInt(i->i).toArray();
```

### 4.Share:

- [MySQL 存储过程](https://www.runoob.com/w3cnote/mysql-stored-procedure.html)  

- [专业术语之------迭代，循环，遍历，递归的区别？](https://www.cnblogs.com/feichengwulai/articles/3642107.html)  

- [Elasticsearch系列篇之Delete document](https://blog.csdn.net/daiyutage/article/details/69722451)  

- [Elasticsearch索引某个字段存在查询或不存在查询](https://blog.csdn.net/sxf_123456/article/details/81532570)  

- [使用okhttp3提示【clientBuilder.sslSocketFactory(SSLSocketFactory) not supported on JDK 9+】](https://blog.csdn.net/liang1352389/article/details/110393030)  
