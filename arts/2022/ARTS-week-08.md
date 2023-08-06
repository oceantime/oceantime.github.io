---
> **ARTS-week-08**
> 2022-02-20 19:50
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

- [Elasticsearch 管道聚合综合指南：第 I 部分](https://qbox.io/blog/comprehensive-guide-to-elasticsearch-pipeline-aggregations-part-i/)  

#### 点评：

在本文中讨论的管道聚合处理其他聚合生成的输出，这些聚合转换它们已经计算的值。因此，管道聚合适用于原始文档集中不存在的中间值。这使得管道聚合对于计算复杂的统计和数学度量（如累积和、导数和移动平均线等）非常有用。

在本系列的第一部分中，我们将讨论两种基本类型的管道聚合，并展示常见 Elasticsearch 管道的示例，如总和累积总和、最小值和最大值、平均存储桶和派生管道聚合。

- 总和累计总和存储桶聚合：
在某些情况下，需要计算由某些其他聚合计算的所有存储桶值的总和。在这种情况下，可以使用 sum 存储桶聚合，这是同级管道聚合。

让我们计算一下所有存储桶中每月访问的总和：
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
    "sum_monthly_visits": {
      "sum_bucket": {
        "buckets_path": "visits_per_month>total_visits" 
      }
    }
  }
}
'
```
如所见，此管道聚合面向表示每月总访问量的同级聚合。响应应如下所示：

```json
"aggregations" : {
  "visits_per_month" : {
    "buckets" : [
      ...
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
  "sum_monthly_visits" : {
    "value" : 30994.0
  }
}
```
因此，我们的 sum 管道聚合只是计算了每个存储桶的所有每月访问量的总和，这本身就是由同级总和聚合计算的每月所有访问量的总和。

累积总和聚合采用不同的方法。通常，累积和是给定序列的部分和序列。例如，序列 {a，b，c，,...} 的累积和为 a、 a+b、 a+b+c、 ...

累积总和聚合是父管道聚合，用于计算父直方图（或date_histogram）聚合中指定指标的累积总和。与其他父管道聚合一样，指定的指标必须是数字，并且封闭的直方图必须设置为（聚合的默认值）：

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
                },
                "cumulative_visits": {
                    "cumulative_sum": {
                        "buckets_path": "total_visits" 
                    }
                }
            }
        }
    }
}
'
```
响应将如下所示：

```json
...
"aggregations" : {
  "visits_per_month" : {
    "buckets" : [
      {
        "key_as_string" : "2018-10-01T00:00:00.000Z",
        "key" : 1538352000000,
        "doc_count" : 3,
        "total_visits" : {
          "value" : 2060.0
        },
        "cumulative_visits" : {
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
        "cumulative_visits" : {
          "value" : 4201.0
        }
      },
      {
        "key_as_string" : "2018-12-01T00:00:00.000Z",
        "key" : 1543622400000,
        "doc_count" : 3,
        "total_visits" : {
          "value" : 2949.0
        },
        "cumulative_visits" : {
          "value" : 7150.0
        }
      },
      {
        "key_as_string" : "2019-01-01T00:00:00.000Z",
        "key" : 1546300800000,
        "doc_count" : 2,
        "total_visits" : {
          "value" : 1844.0
        },
        "cumulative_visits" : {
          "value" : 8994.0
        }
      },
      {
        "key_as_string" : "2019-02-01T00:00:00.000Z",
        "key" : 1548979200000,
        "doc_count" : 2,
        "total_visits" : {
          "value" : 2411.0
        },
        "cumulative_visits" : {
          "value" : 11405.0
        }
      },
      {
        "key_as_string" : "2019-03-01T00:00:00.000Z",
        "key" : 1551398400000,
        "doc_count" : 2,
        "total_visits" : {
          "value" : 3103.0
        },
        "cumulative_visits" : {
          "value" : 14508.0
        }
      },
      {
        "key_as_string" : "2019-04-01T00:00:00.000Z",
        "key" : 1554076800000,
        "doc_count" : 2,
        "total_visits" : {
          "value" : 2639.0
        },
        "cumulative_visits" : {
          "value" : 17147.0
        }
      },
      {
        "key_as_string" : "2019-05-01T00:00:00.000Z",
        "key" : 1556668800000,
        "doc_count" : 2,
        "total_visits" : {
          "value" : 2212.0
        },
        "cumulative_visits" : {
          "value" : 19359.0
        }
      },
      {
        "key_as_string" : "2019-06-01T00:00:00.000Z",
        "key" : 1559347200000,
        "doc_count" : 2,
        "total_visits" : {
          "value" : 2661.0
        },
        "cumulative_visits" : {
          "value" : 22020.0
        }
      },
      {
        "key_as_string" : "2019-07-01T00:00:00.000Z",
        "key" : 1561939200000,
        "doc_count" : 2,
        "total_visits" : {
          "value" : 2887.0
        },
        "cumulative_visits" : {
          "value" : 24907.0
        }
      },
      {
        "key_as_string" : "2019-08-01T00:00:00.000Z",
        "key" : 1564617600000,
        "doc_count" : 2,
        "total_visits" : {
          "value" : 2966.0
        },
        "cumulative_visits" : {
          "value" : 27873.0
        }
      },
      {
        "key_as_string" : "2019-09-01T00:00:00.000Z",
        "key" : 1567296000000,
        "doc_count" : 2,
        "total_visits" : {
          "value" : 3121.0
        },
        "cumulative_visits" : {
          "value" : 30994.0
        }
      }
    ]
  }
}
```
如上所见，聚合首先计算两个存储桶的总和，然后将结果相加到下一个存储桶的值，依此类推。通过这种方式，它会累积序列中所有存储桶的总和。

- 结论
正如我们所看到的，管道聚合有助于实现涉及中间值和由其他聚合生成的存储桶的复杂计算。这允许提取复杂的度量值，例如导数、移动平均数、二阶导数和其他度量值，这些度量值在数据中不直接可用，并且涉及要计算的几个中间步骤。

在管道聚合系列的下一部分中，我们将继续分析管道聚合，重点关注移动平均线等聚合。百分位数、移动函数、串行差异、存储桶排序和其他常见管道聚合。

### 3.Tip:

#### string[] 数组转 string 字符串
```java
// 数组：
string[] s = { "a", "b", "c", "d", "e" };
// 1.Join转换字符串：
string str1 = string.Join(",", s);
// 2.格式化字符串：
string str2 = String.Format("{0},{1},{2},{3},{4}", s);
```

#### JDBC 从 ResultSet 中获取所有列名
```java
//注册驱动程序      
DriverManager.registerDriver(new com.mysql.jdbc.Driver());
//获得连接      
String mysqlUrl = "jdbc:mysql://localhost/mydatabase";
Connection con = DriverManager.getConnection(mysqlUrl, "root", "password");
System.out.println("建立连接......");
//创建一个Statement对象      
Statement stmt = con.createStatement();
//检索数据      
ResultSet rs = stmt.executeQuery("select * from MyPlayers");
//检索ResultSetMetadata对象      
ResultSetMetaData rsMetaData = rs.getMetaData();
System.out.println("当前表中的列名列表: ");
//检索列名列表      
int count = rsMetaData.getColumnCount();
for(int i = 1; i<=count; i++) {
   System.out.println(rsMetaData.getColumnName(i));
}
```

#### Okhttp 中获取全部请求头(含系统自带)
```java
Headers requestHeaders= response.networkResponse().request().headers();
int requestHeadersLength = requestHeaders.size();
for (int i = 0; i < requestHeadersLength; i++){
    String headerName = requestHeaders.name(i);
    String headerValue = requestHeaders.get(headerName);
    System.out.println(headerName + ":" + headerValue);
}
```

### 4.Share:

- [FastJson 反序列化学习](http://www.lmxspace.com/2019/06/29/FastJson-%E5%8F%8D%E5%BA%8F%E5%88%97%E5%8C%96%E5%AD%A6%E4%B9%A0/)  

- [[转]mysql dual虚拟表](https://www.cnblogs.com/Athrun/p/mysql_dual.html)  

- [MySQL CURDATE() and CURRENT_TIMESTAMP return different value?](https://dba.stackexchange.com/questions/257070/mysql-curdate-and-current-timestamp-return-different-value)  

- [How to split a String by space](https://stackoverflow.com/questions/7899525/how-to-split-a-string-by-space)  

- [What is the correct java.sql.Types for Oracle's NVARCHAR2](https://stackoverflow.com/questions/22761042/what-is-the-correct-java-sql-types-for-oracles-nvarchar2)  

- [关于Oracle的NVARCHAR2在mybatis-generator中的使用](https://blog.csdn.net/u014418725/article/details/79526262)  
