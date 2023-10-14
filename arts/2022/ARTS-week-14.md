---
> **ARTS-week-14**
> 2022-04-04 21:02
---


###### ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
- Algorithm: 每周至少做一个 leetcode 的算法题
- Review: 阅读并点评至少一篇英文技术文章
- Tip: 学习至少一个技术技巧
- Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

- [653. 两数之和 IV - 输入 BST (简单) ?](https://leetcode-cn.com/submissions/detail/287445152/)  
  + 思路：双指针
- [440. 字典序的第K小数字 (困难) ?](https://leetcode-cn.com/submissions/detail/288321940/)  
  + 思路：模拟

### 2.Review:

- [Elasticsearch 管道聚合综合指南：第 II 部分](https://qbox.io/blog/introduction-to-elasticsearch-pipeline-aggregations-part-ii/)  

#### 点评：

在之前的教程中，我们讨论了 Elasticsearch 管道聚合的结构，并引导设置了几个常见的管道，例如导数、累积总和 avg 桶聚合。

在本文中，我们将继续分析 Elasticsearch 管道聚合，重点介绍统计信息、移动平均线和移动函数、百分位数、存储桶排序和存储桶脚本等管道。Kibana 支持本文中讨论的一些管道聚合（如移动平均线），因此我们还将展示如何可视化它们。让我们开始吧！

- 存储桶脚本聚合
这种父管道聚合允许执行一个脚本，对多桶聚合中的某些指标执行桶计算。指定的度量值必须是数字，脚本必须返回一个数值。脚本可以是内联的、文件的或索引的。

例如，这里我们首先对日期直方图生成的桶使用最小和最大度量聚合。然后，将得到的最小值和最大值除以bucket脚本聚合，以计算每个bucket的比率：min/max：
```
curl -X POST "localhost:9200/traffic_stats/_search?size=0&pretty" -H 'Content-Type: application/json' -d'
{
    "aggs" : {
        "visits_per_month" : {
            "date_histogram" : {
                "field" : "date",
                "interval" : "month"
            },
            "aggs": {
                "min_visits": {
                    "min": {
                        "field": "visits"
                    }
                },
                "max_visits": {
                    "max": {
                        "field":"visits"
                    }
                },
                "min_max_ratio": {
                   "bucket_script": {
                       "buckets_path": {
                          "min_visits": "min_visits",
                          "max_visits": "max_visits"
                        },
                    "script": "params.min_visits / params.max_visits"
                  }
              }
         }
      }
  }
}
'
 ```
聚合计算每个 bucket 的最小值，并将结果附加到 bucket:min_max_ratio 的末尾：
```
"aggregations" : {
    "visits_per_month" : {
      "buckets" : [
        {
          "key_as_string" : "2018-10-01T00:00:00.000Z",
          "key" : 1538352000000,
          "doc_count" : 3,
          "min_visits" : {
            "value" : 488.0
          },
          "max_visits" : {
            "value" : 789.0
          },
          "min_max_ratio" : {
            "value" : 0.6185044359949303
          }
        },
        {
          "key_as_string" : "2018-11-01T00:00:00.000Z",
          "key" : 1541030400000,
          "doc_count" : 3,
          "min_visits" : {
            "value" : 394.0
          },
          "max_visits" : {
            "value" : 1299.0
          },
          "min_max_ratio" : {
            "value" : 0.30331023864511164
          }
        },
        {
          "key_as_string" : "2018-12-01T00:00:00.000Z",
          "key" : 1543622400000,
          "doc_count" : 3,
          "min_visits" : {
            "value" : 768.0
          },
          "max_visits" : {
            "value" : 1194.0
          },
          "min_max_ratio" : {
            "value" : 0.6432160804020101
          }
        },
        {
          "key_as_string" : "2019-01-01T00:00:00.000Z",
          "key" : 1546300800000,
          "doc_count" : 2,
          "min_visits" : {
            "value" : 872.0
          },
          "max_visits" : {
            "value" : 972.0
          },
          "min_max_ratio" : {
            "value" : 0.897119341563786
          }
        },
        {
          "key_as_string" : "2019-02-01T00:00:00.000Z",
          "key" : 1548979200000,
          "doc_count" : 2,
          "min_visits" : {
            "value" : 827.0
          },
          "max_visits" : {
            "value" : 1584.0
          },
          "min_max_ratio" : {
            "value" : 0.5220959595959596
          }
        },
        {
          "key_as_string" : "2019-03-01T00:00:00.000Z",
          "key" : 1551398400000,
          "doc_count" : 2,
          "min_visits" : {
            "value" : 1499.0
          },
          "max_visits" : {
            "value" : 1604.0
          },
          "min_max_ratio" : {
            "value" : 0.9345386533665836
          }
        },
        {
          "key_as_string" : "2019-04-01T00:00:00.000Z",
          "key" : 1554076800000,
          "doc_count" : 2,
          "min_visits" : {
            "value" : 1247.0
          },
          "max_visits" : {
            "value" : 1392.0
          },
          "min_max_ratio" : {
            "value" : 0.8958333333333334
          }
        },
        {
          "key_as_string" : "2019-05-01T00:00:00.000Z",
          "key" : 1556668800000,
          "doc_count" : 2,
          "min_visits" : {
            "value" : 984.0
          },
          "max_visits" : {
            "value" : 1228.0
          },
          "min_max_ratio" : {
            "value" : 0.8013029315960912
          }
        },
        {
          "key_as_string" : "2019-06-01T00:00:00.000Z",
          "key" : 1559347200000,
          "doc_count" : 2,
          "min_visits" : {
            "value" : 1238.0
          },
          "max_visits" : {
            "value" : 1423.0
          },
          "min_max_ratio" : {
            "value" : 0.8699929725931131
          }
        },
        {
          "key_as_string" : "2019-07-01T00:00:00.000Z",
          "key" : 1561939200000,
          "doc_count" : 2,
          "min_visits" : {
            "value" : 1388.0
          },
          "max_visits" : {
            "value" : 1499.0
          },
          "min_max_ratio" : {
            "value" : 0.9259506337558372
          }
        },
        {
          "key_as_string" : "2019-08-01T00:00:00.000Z",
          "key" : 1564617600000,
          "doc_count" : 2,
          "min_visits" : {
            "value" : 1443.0
          },
          "max_visits" : {
            "value" : 1523.0
          },
          "min_max_ratio" : {
            "value" : 0.9474720945502298
          }
        },
        {
          "key_as_string" : "2019-09-01T00:00:00.000Z",
          "key" : 1567296000000,
          "doc_count" : 2,
          "min_visits" : {
            "value" : 1534.0
          },
          "max_visits" : {
            "value" : 1587.0
          },
          "min_max_ratio" : {
            "value" : 0.9666036546943919
          }
        }
      ]
    }
  }
```

### 3.Tip:

#### Java向上/向下/四舍五入取整
1、四舍五入：Math.round（result）;
记忆方式：单词round，是“附近”的意思
2、向上取整 ：Math.ceil(result)
记忆方式：单词ceil，是“天花板”的意思
3、向下取整 ：Math.floor(result);
记忆方式：单词floor，是“地板”的意思
```java

public class Test {
 
    public static void main(String[] args) {
        double d1 = 17;
        double d2 = 3;
 
        double result = d1 / d2;
 
        /**
         * 四舍五入
         */
        int roundNum = (int) Math.round(result);
        /**
         * 向上取整
         */
        int ceilNum = (int) Math.ceil(result);
        /**
         * 向下取整
         */
        int floorNum = (int) Math.floor(result);
 
        System.out.println("除法商值：" + result);
        System.out.println("四舍五入：" + roundNum);
        System.out.println("向上取整：" + ceilNum);
        System.out.println("向下取整：" + floorNum);
    }
}
```

### 4.Share:

- [Linux scp命令](https://www.runoob.com/linux/linux-comm-scp.html)  

- [c/c++字符串处理大集合](https://www.cnblogs.com/lidabo/p/3487043.html)  

- [Arthas问题实践](https://blog.csdn.net/hengyunabc/category_8289781.html)  

- [Java诊断利器Arthas优雅排查生产环境 ](https://www.cnblogs.com/ytao-blog/p/11779164.html)  
