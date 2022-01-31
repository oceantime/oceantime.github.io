---
> **ARTS-week-05**
> 2022-01-31 17:47
---


###### ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
- Algorithm： 每周至少做一个 leetcode 的算法题
- Review: 阅读并点评至少一篇英文技术文章
- Tip: 学习至少一个技术技巧
- Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

- [2045. 到达目的地的第二短时间](https://leetcode-cn.com/submissions/detail/262011003/)  
  + 思路：BFS
    * dist1[i] 记录到节点i的最短路径 dist2[i] 记录到节点i的次最短路径
    * 需加入等红绿灯的时间 由于红绿转换 所以循环是时间 2*change
- [2013. 检测正方形](https://leetcode-cn.com/submissions/detail/262658053/)  
  + 思路：设计 哈希表
    * 左侧黄色区域或者右侧红色区域 
- [1996. 游戏中弱角色的数量](https://leetcode-cn.com/submissions/detail/263275497/)  
  + 思路：对象数组 排序

### 2.Review:

- [Elasticsearch 管道聚合综合指南：第 I 部分](https://qbox.io/blog/comprehensive-guide-to-elasticsearch-pipeline-aggregations-part-i/)  

#### 点评：

在本文中讨论的管道聚合处理其他聚合生成的输出，这些聚合转换它们已经计算的值。因此，管道聚合适用于原始文档集中不存在的中间值。这使得管道聚合对于计算复杂的统计和数学度量（如累积和、导数和移动平均线等）非常有用。

在本系列的第一部分中，我们将讨论两种基本类型的管道聚合，并展示常见 Elasticsearch 管道的示例，如总和累积总和、最小值和最大值、平均存储桶和派生管道聚合。

- 在本教程中，我们将使用有关博客访问的数据创建一个索引。索引映射将包含三个字段：
date visits max_time_spent：
```txt
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
创建索引映射后，让我们向索引中添加一些随机数据：

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

现在，一切都已准备就绪，用于说明管道聚合的示例。让我们从 avg 存储桶聚合开始。

- 平均存储桶聚合
平均存储桶管道是同级管道聚合的典型示例。它处理由另一个同级聚合计算的数值，并计算所有存储桶的平均值。同级聚合的两个要求是，同级聚合必须是多存储桶聚合，并且指定的指标是数字。

若要了解管道聚合的工作原理，将计算过程划分为多个阶段是合理的。让我们看一下下面的查询。它将分三个步骤进行。首先，Elasticsearch 将创建一个具有一个月间隔的日期直方图，并将其应用于索引的"访问量"字段。日期直方图将生成包含 n 个文档的 n 个存储桶。接下来，sum 子聚合将计算每个月存储桶的所有访问量的总和。最后，avg 存储桶管道将引用同级聚合的总和，并使用每个存储桶的总和来计算所有存储桶的平均每月博客访问量。因此，我们最终会得到每月博客访问量的平均值。：

```json
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
    "avg_monthly_visits": {
      "avg_bucket": {
        "buckets_path": "visits_per_month>total_visits" 
      }
    }
  }
}
'
```
我们应该得到以下结果：
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
    "avg_monthly_visits" : {
      "value" : 2582.8333333333335
    }
  }
```
因此，每月博客访问量的平均数为2582.83。仔细查看我们上面描述的步骤，可以了解管道聚合的工作原理。它们采用指标和/或存储桶聚合的中间结果，并对其进行额外的计算。当数据不包含中间结果时，此方法非常有用，而中间结果应在聚合过程中隐式派生。

- 衍生品聚合
这是一个父管道聚合，用于计算父直方图或日期直方图聚合中指定指标的导数。此聚合有两个要求：

  - 指标必须是数字，否则无法找到导数。
  - 封闭直方图必须设置为 （这是聚合的默认值）。如果 大于 0，则将省略某些存储桶，这可能会导致导数值混淆或错误。min_doc_count0histogrammin_doc_count
在数学中，函数的导数测量函数值（输出值）相对于其参数（输入值）变化的敏感性。换句话说，导数根据其变量计算某些函数的变化速度。将此概念应用于我们的数据，我们可以说，与前几个时期相比，导数聚合计算了数字数据的变化速度。让我们看一下真实的例子，以更好地了解我们正在谈论的内容。

首先，我们将计算一阶导数。一阶导数告诉我们一个函数是增加还是减少，以及它增加或减少了多少。请看下面的例子：
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
                "visits_deriv": {
                    "derivative": {
                        "buckets_path": "total_visits" 
                    }
                }
            }
        }
    }
}
'
```
指示导数聚合将父聚合的输出用于导数（我们应该使用父聚合，因为导数是父管道聚合）。buckets_pathtotal_visits

对上述查询的响应应如下所示：
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
          }
        },
        {
          "key_as_string" : "2019-03-01T00:00:00.000Z",
          "key" : 1551398400000,
          "doc_count" : 2,
          "total_visits" : {
            "value" : 3103.0
          },
          "visits_deriv" : {
            "value" : 692.0
          }
        },
        {
          "key_as_string" : "2019-04-01T00:00:00.000Z",
          "key" : 1554076800000,
          "doc_count" : 2,
          "total_visits" : {
            "value" : 2639.0
          },
          "visits_deriv" : {
            "value" : -464.0
          }
        },
        {
          "key_as_string" : "2019-05-01T00:00:00.000Z",
          "key" : 1556668800000,
          "doc_count" : 2,
          "total_visits" : {
            "value" : 2212.0
          },
          "visits_deriv" : {
            "value" : -427.0
          }
        },
        {
          "key_as_string" : "2019-06-01T00:00:00.000Z",
          "key" : 1559347200000,
          "doc_count" : 2,
          "total_visits" : {
            "value" : 2661.0
          },
          "visits_deriv" : {
            "value" : 449.0
          }
        },
        {
          "key_as_string" : "2019-07-01T00:00:00.000Z",
          "key" : 1561939200000,
          "doc_count" : 2,
          "total_visits" : {
            "value" : 2887.0
          },
          "visits_deriv" : {
            "value" : 226.0
          }
        },
        {
          "key_as_string" : "2019-08-01T00:00:00.000Z",
          "key" : 1564617600000,
          "doc_count" : 2,
          "total_visits" : {
            "value" : 2966.0
          },
          "visits_deriv" : {
            "value" : 79.0
          }
        },
        {
          "key_as_string" : "2019-09-01T00:00:00.000Z",
          "key" : 1567296000000,
          "doc_count" : 2,
          "total_visits" : {
            "value" : 3121.0
          },
          "visits_deriv" : {
            "value" : 155.0
          }
        }
      ]
    }
  }
```
如果比较两个相邻的存储桶，将看到一阶导数只是当前存储桶和上一个存储桶中总访问量之间的差异。例如：
```json
{
  "key_as_string" : "2019-08-01T00:00:00.000Z",
  "key" : 1564617600000,
  "doc_count" : 2,
  "total_visits" : {
    "value" : 2966.0
  },
  "visits_deriv" : {
    "value" : 79.0
  }
},
{
  "key_as_string" : "2019-09-01T00:00:00.000Z",
  "key" : 1567296000000,
  "doc_count" : 2,
  "total_visits" : {
    "value" : 3121.0
  },
  "visits_deriv" : {
    "value" : 155.0
  }
}
```
如上所见，2018年8月的总访问量为2966次，而2019年9月为3121次。如果我们从3121中减去2966，我们将得到第一个导数值155.0。就这么简单！
让我们可视化 Kibana 中的第一个导数：
![An image](./images/ARTS-week-05-1.png)
要可视化导数，我们需要选择导数管道聚合和导数使用的自定义指标，即"访问量"字段上的总和聚合。在 X 轴中，我们应该使用"月"间隔在"日期"字段上定义日期直方图聚合。运行可视化后，Kibana 将为每个衍生品创建竖线。正导数将放置在更靠近图表顶部的位置，负导数将放置在更靠近底部的位置。

### 3.Tip:

#### sun.misc.BASE64Decoder是内部专用 API, 可能会在未来发行版中删除
```shell
解决方案进行替换：
import java.util.Base64.Encoder;
import java.util.Base64.Decoder;
```
#### Maven 错误：Using platform encoding (GBK actually) to copy filtered resources...
<project>中添加<properties>标签：
```xml
<properties>
         <project.build.sourceEncoding>
             UTF-8
         </project.build.sourceEncoding>
</properties>
```
修改 Maven 的配置文件中关于编码的配置 <encoding>utf-8</encoding>： 
```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-compiler-plugin</artifactId>
    <version>3.0</version>
    <configuration>
        <encoding>utf-8</encoding>
        <source>1.8</source>
        <target>1.8</target>
    </configuration>
</plugin>
```

#### How do I invoke two different profiles in one maven command?
```shell
mvn clean package -PTest1
```

#### Swagger with Spring Boot 2.0 leads to 404 error page
1.maven dependency
```xml
<dependency>
    <groupId>io.springfox</groupId>
    <artifactId>springfox-swagger2</artifactId>
    <version>2.8.0</version>
</dependency>

<dependency>
    <groupId>io.springfox</groupId>
    <artifactId>springfox-swagger-ui</artifactId>
    <version>2.8.0</version>
</dependency>
```
2.SwaggerConfig bean:

```java
@Configuration
@EnableSwagger2
public class SwaggerConfig {
@Bean
public Docket api() {
    Docket docket = new Docket(DocumentationType.SWAGGER_2)
            .select()
            .apis(RequestHandlerSelectors.any())
            .paths(PathSelectors.any())
            .build();

    return docket;
   }
}
```
3.properties file
```txt
spring.application.name=cat-service
management.server.servlet.context-path=/cat-service
server.servlet.contextPath=/cat-service
```
4.Swagger UI page
```java
http://localhost:8080/cat-service/swagger-ui.html
```

### 4.Share:

- [SpringBoot整合Swagger-ui的配置方法](https://www.cnblogs.com/zhukf/p/12698916.html)  

- [Maven Profile 与 Spring Profile 管理多环境打包](https://lotabout.me/2018/Maven-Profile-and-Spring-Profile/)  

- [maven profile动态选择配置文件](https://www.cnblogs.com/fnlingnzb-learner/p/10752113.html)  

- [Spring Cloud Config 实现配置中心，看这一篇就够了](https://www.cnblogs.com/fengzheng/p/11242128.html)  

- [spring开发笔记（4）spring mvc多环境下配置文件的设置](https://blog.csdn.net/halfclear/article/details/80067998)  

- [Tomcat 9的Maven插件](https://www.codenong.com/41326911/)  

- [Apache Maven Resources Plugin插件详解](https://blog.csdn.net/taiyangdao/article/details/103636330)  

- [IntelliJ IDEA配置Tomcat/Jetty运行Web项目](https://www.cnblogs.com/EasonJim/p/7860700.html)  

- [Springboot项目install打包-某些输入文件使用了未经检查或不安全的操作。分析与解决](https://springboot.io/t/topic/2833)  

- [java: 某些输入文件使用或覆盖了已过时的 API；java: 有关详细信息, 请使用 -Xlint:deprecation 重新编译](https://blog.csdn.net/weixin_44195615/article/details/113400709)  

- [SpringBoot使用Swagger2出现Unable to infer base url](https://blog.csdn.net/qq_41345773/article/details/105693212)  

