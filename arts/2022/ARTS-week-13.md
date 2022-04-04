---
> **ARTS-week-13**
> 2022-04-04 17:44
---


###### ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
- Algorithm： 每周至少做一个 leetcode 的算法题
- Review: 阅读并点评至少一篇英文技术文章
- Tip: 学习至少一个技术技巧
- Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

- [2039. 网络空闲的时刻 (中等) ?](https://leetcode-cn.com/submissions/detail/286557864/)  
  + 思路：建图+BFS
- [2038. 如果相邻两个颜色均相同则删除当前颜色 (中等) ?](https://leetcode-cn.com/submissions/detail/287444388/)  
  + 思路：模拟

### 2.Review:

- [Elasticsearch 管道聚合综合指南：第 II 部分](https://qbox.io/blog/introduction-to-elasticsearch-pipeline-aggregations-part-ii/)  

#### 点评：

在之前的教程中，我们讨论了 Elasticsearch 管道聚合的结构，并引导设置了几个常见的管道，例如导数、累积总和 avg 桶聚合。

在本文中，我们将继续分析 Elasticsearch 管道聚合，重点介绍统计信息、移动平均线和移动函数、百分位数、存储桶排序和存储桶脚本等管道。Kibana 支持本文中讨论的一些管道聚合（如移动平均线），因此我们还将展示如何可视化它们。让我们开始吧！

- 移动函数聚合（仅在Elasticsearch 6.4.0中支持）
与移动平均聚合一样，移动函数聚合允许处理数据点的子集，在数据集中逐渐滑动窗口。但是，移动功能还允许指定在每个数据窗口上执行的自定义脚本。Elasticsearch支持诸如最小/最大、移动平均等预定义脚本。让我们看看移动函数聚合的标准定义：
```
{
    "moving_fn": {
        "buckets_path": "the_sum",
        "window": 10,
        "script": "MovingFunctions.min(values)"
    }
}
 ```

如所见，我们定义了一个移动函数聚合，它使用内置的聚合脚本，可以在10个数据点的窗口中工作。应该注意，聚合必须嵌入到or聚合中：
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
                "total_visits": {
                   "sum": {
                        "field": "visits"
                    }
                },
                "the_movfn": {
                    "moving_fn": {
                         "buckets_path": "total_visits", 
                         "window": 10,
                         "script": "MovingFunctions.unweightedAvg(values)"
                    }
                }
            }
        }
    }
}
'
```
如所见，移动平均值是聚合的兄弟项，也是日期直方图的子项。

讨论的聚合支持以下内置函数：
  - max()
  - min()
  - sum()
  - stdDev()
  - unweightedAvg()
  - linearWeightedAvg()
  - ewma()
  - holt()
  - holtWinters()

所有这些函数都可以从名称空间中获得（.我们将在后续教程中回顾这些函数。现在，可以在官方的Elasticsearch文档中找到更多信息。MovingFunctionsMovingFunctions.min（）。

### 3.Tip:

#### 获取 Spring 上下文 ApplicationContextAware 时 applicationContext 为 null 异常解决

application-spring.xml 配置
```xml
<bean id="springUtil" class="com.xxx.util.SpringUtil" scope="singleton" lazy-init="false" />
```

```java

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.ImportResource;
 
@Configuration
@ImportResource(locations = {"classpath:config/Entrance.xml","classpath:spring/application-spring.xml"})
@SpringBootApplication
public class MyApplication {
 
    public static void main(String[] args) {
 
        try {
            SpringApplication.run(MyApplication.class, args);
        } catch (Exception e) {
            e.printStackTrace();
        }
 
    }
 
}

### 4.Share:

- [java开发工具精讲](https://blog.csdn.net/lz710117239/category_9703109.html)  

- [Ignite spark 踩坑记录](https://www.cnblogs.com/wxiaotong/p/15207353.html)  
