---
> **ARTS-week-06**
> 2022-02-06 17:43
---


###### ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
- Algorithm: 每周至少做一个 leetcode 的算法题
- Review: 阅读并点评至少一篇英文技术文章
- Tip: 学习至少一个技术技巧
- Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

- [1414. 和为 K 的最少斐波那契数字数目](https://leetcode-cn.com/submissions/detail/264553361/)  
  + 思路：递归+贪心
    * 取到小于等于k时离k最近的斐波那契数字
    * 递归进行计算求到每个距离k最近且小于等于k的斐波那契数字进行求解
- [1725. 可以形成最大正方形的矩形数目](https://leetcode-cn.com/submissions/detail/264774435/)  
  + 思路：模拟
- [1219. 黄金矿工](https://leetcode-cn.com/submissions/detail/265009022/)  
  + 思路：回溯
    * 枚举每个黄金点作为起点，然后使用 DFS 回溯搜索以该点作为起点所能得到的最大收益。

### 2.Review:

- [Elasticsearch 管道聚合综合指南：第 I 部分](https://qbox.io/blog/comprehensive-guide-to-elasticsearch-pipeline-aggregations-part-i/)  

#### 点评：

在本文中讨论的管道聚合处理其他聚合生成的输出，这些聚合转换它们已经计算的值。因此，管道聚合适用于原始文档集中不存在的中间值。这使得管道聚合对于计算复杂的统计和数学度量（如累积和、导数和移动平均线等）非常有用。

在本系列的第一部分中，我们将讨论两种基本类型的管道聚合，并展示常见 Elasticsearch 管道的示例，如总和累积总和、最小值和最大值、平均存储桶和派生管道聚合。

- 二阶导数：
二阶导数是双导数或导数的导数。它衡量一个数量的变化率本身是如何变化的。

在 Elasticsearch 中，我们可以通过将导数管道聚合链接到另一个导数管道聚合的输出来计算二阶导数。通过这种方式，我们首先计算第一个导数，然后基于第一个导数计算第二个导数。让我们看下面一个示例：
```txt
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
                },
                "visits_deriv": {
                    "derivative": {
                        "buckets_path": "total_visits"
                    }
                },
                "visits_2nd_deriv": {
                    "derivative": {
                        "buckets_path": "visits_deriv" 
                    }
                }
            }
        }
    }
}
'
```
如下图所见，第一个导数使用由和聚合计算的路径，而第二个导数使用指向 的路径，这是第一个导数管道。这样，我们可以将二阶导数计算视为双管道聚合。上述查询应返回以下响应：

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
          },
          "visits_deriv" : {
            "value" : 81.0
          }
        },
        {
          "key_as_string" : "2018-12-01T00:00:00.000Z",
          "key" : 1543622400000,
          "doc_count" : 3,
          "total_visits" : {
            "value" : 2949.0
          },
          "visits_deriv" : {
            "value" : 808.0
          },
          "visits_2nd_deriv" : {
            "value" : 727.0
          }
        },
        {
          "key_as_string" : "2019-01-01T00:00:00.000Z",
          "key" : 1546300800000,
          "doc_count" : 2,
          "total_visits" : {
            "value" : 1844.0
          },
          "visits_deriv" : {
            "value" : -1105.0
          },
          "visits_2nd_deriv" : {
            "value" : -1913.0
          }
        },
        {
          "key_as_string" : "2019-02-01T00:00:00.000Z",
          "key" : 1548979200000,
          "doc_count" : 2,
          "total_visits" : {
            "value" : 2411.0
          },
          "visits_deriv" : {
            "value" : 567.0
          },
          "visits_2nd_deriv" : {
            "value" : 1672.0
          }
        }
      ]
    }
  }
```

让我们仔细观察两个相邻的桶，看看二阶导数真正表示什么：

```json
{
  "key_as_string" : "2018-11-01T00:00:00.000Z",
  "key" : 1541030400000,
  "doc_count" : 3,
  "total_visits" : {
    "value" : 2141.0
  },
  "visits_deriv" : {
    "value" : 81.0
  }
},
{
  "key_as_string" : "2018-12-01T00:00:00.000Z",
  "key" : 1543622400000,
  "doc_count" : 3,
  "total_visits" : {
    "value" : 2949.0
  },
  "visits_deriv" : {
    "value" : 808.0
  },
  "visits_2nd_deriv" : {
    "value" : 727.0
  }
}
```
因此，一阶导数只是当前存储桶（例如）和前一个存储桶（）中的总访问量之间的差异。这就是我们从前面的例子中知道的。在我们的例子中，这个差值是808（2949 – 2141）。2018-12-01 bucket2019-11-01

什么是二阶导数？这只是两个相邻存储桶的一阶导数之间的差异。例如，"2018-11-01"桶的第一个导数为 81，"2018-12-01"桶的第一个导数为 808.0。因此，"2018-12-01"桶的二阶导数是727.0（808-81）。简单！

假设，我们可以设计三个链式管道聚合来计算第三、第四甚至更高阶导数。然而，对于大多数数据来说，这几乎没有价值。

注意：前两个存储桶没有二阶导数，因为我们至少需要来自一阶导数的 2 个数据点来计算二阶导数。

### 3.Tip:

#### array 数组打印方式
```java
// array 
System.out.println(Arrays.toString(arrayName))
// 2D array
System.out.println(Arrays.deepToString(arrayName))
// lambda
Arrays.stream(arrayName).forEach(System.out::println); 
```

### 4.Share:

- [基于大数据平台的数据分析](https://zhuanlan.zhihu.com/p/76837302)  

- [LeetCode刷题的一点个人建议和心得](https://www.cnblogs.com/liuzhen1995/p/13767751.html)  

- [How to use Java's lambda expressions to print an array?](https://stackoverflow.com/questions/23324782/how-to-use-javas-lambda-expressions-to-print-an-array)  
