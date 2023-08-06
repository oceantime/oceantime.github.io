---
> **ARTS-week-11**
> 2022-03-13 21:44
---


###### ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
- Algorithm： 每周至少做一个 leetcode 的算法题
- Review: 阅读并点评至少一篇英文技术文章
- Tip: 学习至少一个技术技巧
- Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

- [2055. 蜡烛之间的盘子（中等）?](https://leetcode-cn.com/submissions/detail/279762592/)  
  + 思路：前缀和
- [798. 得分最高的最小轮调（困难）?](https://leetcode-cn.com/submissions/detail/280354023/)  
  + 思路：差分
- [2049. 统计最高分的节点数目（中等）+](https://leetcode-cn.com/submissions/detail/281522785/)  
  + 思路：数组构建树 二叉树
- [393. UTF-8 编码验证 +](https://leetcode-cn.com/submissions/detail/282594224/)  
  + 思路：模拟

### 2.Review:

- [Elasticsearch 管道聚合综合指南：第 II 部分](https://qbox.io/blog/introduction-to-elasticsearch-pipeline-aggregations-part-ii/)  

#### 点评：

在之前的教程中，我们讨论了 Elasticsearch 管道聚合的结构，并引导设置了几个常见的管道，例如导数、累积总和 avg 桶聚合。

在本文中，我们将继续分析 Elasticsearch 管道聚合，重点介绍统计信息、移动平均线和移动函数、百分位数、存储桶排序和存储桶脚本等管道。Kibana 支持本文中讨论的一些管道聚合（如移动平均线），因此我们还将展示如何可视化它们。让我们开始吧！

- 移动平均线聚合
移动平均线或滚动平均线是一种计算技术，用于构造完整数据集不同子集的一系列平均值。子集通常称为特定大小的窗口。实际上，窗口的大小表示每次迭代时窗口覆盖的数据点数。在每次迭代中，该算法都会计算适合窗口的所有数据点的平均值，然后通过排除前一个子集的第一个成员并包括下一个子集中的第一个成员来向前滑动。这就是为什么我们称这个平均线为移动平均线。

例如，给定数据，我们可以计算出一个简单的移动平均线，窗口的大小如下：[1, 5, 8, 23, 34, 28, 7, 23, 20, 19]5
```
 （1 + 5 + 8 + 23 + 34） / 5 = 14.2
 （5 + 8 + 23 + 34+ 28） / 5 = 19.6
 （8 + 23 + 34 + 28 + 7） / 5 = 20
 等等
 ```
移动平均线通常与时间序列数据一起使用，以平滑短期波动并突出显示长期趋势或周期。平滑通常用于消除高频波动或随机噪声，因为它使较低频率的趋势更加明显。

  - 支持的移动平均线模型
聚合支持五个移动平均线"模型"：简单、线性、指数加权、霍尔特线性和霍尔特冬季。这些模型在窗口值的加权方式上有所不同。moving_avg
随着数据点变得"变旧"（即，窗口从它们滑出），它们的权重可能会有所不同。可以通过设置聚合的参数来指定所选的模型。model
在下文中，我们将讨论适用于大多数用例的简单、线性和指数加权模型。有关可用型号的更多信息，请参阅官方 Elasticsearch 文档。

  - 简单模型
该模型首先计算窗口中所有数据点的总和，然后将该总和除以窗口的大小。换句话说，简单模型为数据集中的每个窗口计算一个简单的算术平均值。simple
在下面的示例中，我们使用窗口大小为 30 的简单模型。聚合将计算由日期直方图生成的所有存储桶的移动平均值：
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
                "the_movavg":{
                   "moving_avg":{
                      "buckets_path": "total_visits",
                      "window" : 30,
                      "model" : "simple"
                    }
                 }
            }
        }
    }
}
'
```

响应应如下所示：
```
"aggregations" : {
    "visits_per_month" : {
      "buckets" : [
       ...
        {
          "key_as_string" : "2019-08-01T00:00:00.000Z",
          "key" : 1564617600000,
          "doc_count" : 2,
          "total_visits" : {
            "value" : 2966.0
          },
          "the_movavg" : {
            "value" : 2490.7
          }
        },
        {
          "key_as_string" : "2019-09-01T00:00:00.000Z",
          "key" : 1567296000000,
          "doc_count" : 2,
          "total_visits" : {
            "value" : 3121.0
          },
          "the_movavg" : {
            "value" : 2533.909090909091
          }
        }
      ]
    }
  }
```

请注意，窗口大小可能会改变移动平均线的行为。较小的窗口大小 （） 将紧跟数据，并且只能平滑小尺度的波动。相反，具有较大窗口（）的移动平均线将平滑所有高频波动，只留下低频的长期趋势。它还倾向于"滞后"实际数据很多。"window": 10simple"window": 100
![An image](./images/ARTS-week-11-1.png)

  -线性模型
该模型为序列中的数据点分配不同的线性权重，以便"较旧的"数据点（即更接近窗口开头的数据点）对最终平均计算的贡献较小。这种方法可以减少数据平均值背后的"滞后"，因为较旧的数据点对最终结果的影响较小。与在简单模型中一样，较小的窗口倾向于平滑小尺度的波动，而较大的窗口倾向于仅平滑较高频率的波动。此外，与简单模型类似，线性模型倾向于"滞后"于实际数据，尽管程度低于简单模型。在下面的示例中，我们使用窗口大小为 30 的线性模型：
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
                "the_movavg":{
                   "moving_avg":{
                      "buckets_path": "total_visits",
                      "window" : 30,
                      "model" : "linear"
                    }
                 }
            }
        }
    }
}
'
```

响应应为：

```
"aggregations" : {
    "visits_per_month" : {
      "buckets" : [
        {
          "key_as_string" : "2019-08-01T00:00:00.000Z",
          "key" : 1564617600000,
          "doc_count" : 2,
          "total_visits" : {
            "value" : 2966.0
          },
          "the_movavg" : {
            "value" : 2539.75
          }
        },
        {
          "key_as_string" : "2019-09-01T00:00:00.000Z",
          "key" : 1567296000000,
          "doc_count" : 2,
          "total_visits" : {
            "value" : 3121.0
          },
          "the_movavg" : {
            "value" : 2609.731343283582
          }
        }
      ]
    }
  }
```


### 3.Tip:

#### java 获取当前方法的调用栈

```java
StackTraceElement stack[] = Thread.currentThread().getStackTrace();  
for(int i=0;i<stack.length;i++){
    System.out.print(stack[i].getClassName()+" 。"+stack[i].getMethodName()+"-----");
}
```

#### Java 设置信任所有的 SSL 证书(解决PKIX path building failed问题)

```java
// 自定义
X509HostnameVerifier hostnameVerifier = new X509HostnameVerifier() {
    @Override
    public void verify(String s, SSLSocket sslSocket) throws IOException {

    }

    @Override
    public void verify(String s, X509Certificate x509Certificate) throws SSLException {

    }

    @Override
    public void verify(String s, String[] strings, String[] strings1) throws SSLException {

    }

    @Override
    public boolean verify(String s, SSLSession sslSession) {
        return true;
    }
};

// 设置
SSLContext sslContext = SSLContextBuilder.create().useProtocol(SSLConnectionSocketFactory.SSL).loadTrustMaterial((x, y) -> true).build();
RequestConfig config = RequestConfig.custom().setConnectTimeout(5000).setSocketTimeout(5000).build();
httpClient = HttpClientBuilder.create().setSslcontext(sslContext).setDefaultRequestConfig(config).setHostnameVerifier(hostnameVerifier).build();
```

#### filebeat 进程运行一段时间后自动退出问题解决方法
```shell
nohup ./filebeat -e -c filebeat_xxx.yml > startxxx.log 2>&1 &

# 1 使用 yum 安装或 RPM 包安装
sudo yum install filebeat -y
rpm -ivh filebeat-xxx.rpm

# 2 退出执行 nohup 命令当前用户终端
exit
```

#### 日志多行合并采集
```
multiline.pattern: '^\['
multiline.negate: true
multiline.match: after
```

### 4.Share:

- [filebeat 提取获取massage字段 利用pipeline grok 7.12](https://www.cnblogs.com/fanfanfanlichun/p/14977166.html)  

- [使用Filebeat结合Ingest Node提取特定字段](https://blog.csdn.net/maquealone/article/details/93200288)  

- [J20RC 遥控器](https://github.com/J20RC/STM32_RC_Transmitter)  
