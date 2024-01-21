---
> **ARTS-week-38**
> 2021-09-18 08:04
---


## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm: 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

380. O(1) 时间插入、删除和获取随机元素：https://leetcode-cn.com/submissions/detail/217371971/

239. 滑动窗口最大值：https://leetcode-cn.com/submissions/detail/218046821/

1338. 数组大小减半：https://leetcode-cn.com/submissions/detail/218060935/

### 2.Review:

https://hackernoon.com/the-rise-of-robots-insights-into-the-global-robotics-market-374g3u2q
机器人的兴起：洞察2020全球机器人市场【Part 1】

#### 点评：

2020年是科幻剧作家卡雷尔-卡佩克首次提出 "机器人 "一词的一百年。40年后，1961年，通用汽车公司安装了世界上第一个工业机器人，为自动化生产和可编程机器时代铺平了道路。今天，全球工业机器人市场每年价值480亿美元，对机器人技术的需求正在快速增长。这是在第四次工业革命和数字技术进步的背景下，使机器人技术的使用更加民主化。

在本文中，我们分析了全球机器人市场的增长，确定了推动需求的主要趋势。
- 在第一部分，我们探讨了数字技术的影响和 "先进 "机器人的出现。
- 在第二部分中，我们分析了哪些行业正在推动对先进机器人的需求，并对供应链自动化进行了深入研究。
- 在第三部分中，我们剖析了更广泛的机器人生态系统，确定了提供机器人硬件、软件和配件的主要市场参与者。

第一部分：更智能、更便宜、更快
- 最新一代的 "高级 "机器人结合了完整的技术堆栈，将物理自动化与数字效率相结合。因此，"高级 "机器人能够产生传统机器人无法产生的价值。
  - 云技术：如今出货的机器人中，有90%能够连接到云端，而2016年这一比例还不到50%。这有利于远程监控、实时协作，在数据收集&异地分析方面有了显著的进步。
  - 先进的传感器和机器视觉，让机器人发展出空间意识，这对自主移动和精准拣选至关重要。
  - AI和机器学习，让机器人应用逻辑并有效地自动决策，增加了最后一层复杂性。

- 工业机器人的价格从未如此便宜，操作也从未如此简单，随着机器人价格持续下降，我们预计将出现两个主要拐点。
  - 进一步的通货紧缩压力将加速工业中小企业的兴趣，这些企业由于成本和复杂性，传统上都避免使用机器人自动化。在欧洲，有超过200万家中小型制造企业，雇用了欧洲大陆1700万制造业员工中的6％。制造业中小企业的机器人密度为每万名员工6台。这大大低于欧洲114的平均水平，凸显了尚未充分解决的市场潜力。
  - 未来5年，我们预计工业机器人的前期单位成本将低于中国制造业年平均工资。因此，中国在全球制造业中的竞争优势将可能下降，推动全球生产向更便宜的市场转移。为了应对这一趋势，中国正在大力投资于机器人自动化。中国目前是世界上最大的工业机器人市场，占每年安装量的36%。

- 灵巧性和复杂性的进步使得工业机器人能够更深入地进入精密角色。

- 2015年，机器人单位销售额达到了一个关键的拐点，标志着 "高级 "机器人的到来，也标志着一个新的增长阶段。

### 3.Tip:

#### [ElasticSearch] API

什么是聚合分析:聚合分析有点类似于SQL语句中的那种group by、where age > 20 and age < 30、这种操作。常见的聚合分析就是根据某一个字段进行分组分析，要求这个字段是不能被分词的，如果被聚合的字段被分词，按照倒排索引的方式去索引的话，就不得不去扫描整个倒排索引(才可能将被聚合的字段找全，效率很低)。聚合分析是基于doc value的数据结果集进行操作的，这个doc value 其实就是正排索引，关于聚合分析有三个重要的概念：
- bucket:特别是去使用一下java、golang中的es相关的api，就会看到这个bucket关键字，bucket就是聚合操作得到的结果集。
- metric:metric就是对bucket进行分析，比如取最大值、最小值、平均值。
- 下钻:下钻就是在现有的分好组的bucket继续分组，比如可以先按性别分组、下钻再按年龄分组。

15个聚合分析案例:
1、比如我们公司人很多，其中不泛有很多重名的人，现在我的需求是：我想知道我们公司中有多个人叫tom、多少个人叫jerry，也就是说，我想知道：重名的人分别有多少个。于是我们需要像下面这样根据名字聚合。聚合的结果中天然存在一个metric，它就是当前bucket的count，也就是我们想要的结果：
```json
GET /your_index/your_type/_search
{
  # 表示只要聚合的结果，而不要参与聚合的原始数据
  “size”:0,
  # 使用聚合时，天然存在一个metric，就是当前bucket的count
  "aggs": {
    "group_by_name": { # 自定义的名字
      "term": {
        "field": "name" # 指定聚合的字段， 意思是 group by name
      }
    }
  }
} 
GET /your_index/your_type/_search
{
  “size”:0,
   # 使用聚合时，天然存在一个metric，就是当前bucket的count
  "aggs": {
    "group_by_xxx": { # 自定义的名字
     # 除了使用term还可以使用terms
     # trems允许指定多个字段
     "terms": {
         # 指定聚合的字段， 意思是 group by v1、v2、v3
        "field": {"value1","value2","value3"}
      }
    }
  }
}
```
2、先搜索，再对搜索结果聚合。比如我想知道在所有的男生中的重名情况
```json
GET /your_index/your_type/_search
{
  # 先查询
  “query”:{
      "term":{
        "gender":"man"
      }
  },
   # 再聚合
  "aggs": {
    "group_by_name": {
      "term": {
        "field": "name" # 指定聚合的字段， 意思是 group by name
      }
    }
  }
}
```
3、我想把重名的人分成一组，然后我想了解每组人的平均年龄。可以像下面这样干
```json
GET /your_index/your_type/_search
{
  "size":0,
   # 聚合中嵌套聚合，意思是先 group by avg age，再 group by field1。
  "aggs": {
    "group_by_name": {
      "terms": {
        "field": "name"
      },
       # 在上面的name分组的结果之上再按照age聚合
      "aggs": {
        "average_age": {
          # 指定聚合函数为avg
          "avg": {
            "field": "age"
          }
        }
      }
    }
  }
}
```
4、我想了解我们公司不同年龄段：20岁～25岁有多少人、25岁～30岁有多少人、30岁～35岁、35岁～40岁有多少人，以及每个年龄段有多少女生，多少男生。
```json
GET /your_index/your_type/_search
{
   "size":0,
   # 先按照年龄分组，在按照性别分组
   "aggs": {
    "group_by_age": {
      "range": {
        "field": "age",
        "ranges": [
          {
            "from": 20,
            "to": 25
          },{
            "from": 25,
            "to": 30
          },{
            "from": 30,
            "to": 35
          },{
            "from": 35,
            "to": 40
          }
        ]
      },
      "aggs": {
        "group_by_gender": {
          "terms": {
            # gender.keyword一般是ES自动为我们创建的类型
            # keyword类型的field不会分词、默认长度256字符
            # 这里大家初步了解有这个东西，知道怎么回事就行，下一篇文章扫盲
            "field": "gender.keyword"
          }
        }
       }
    }
}
```
5、我想知道我们公司每个年龄段，每个性别的平均账户余额。
```json
GET /your_index/your_type/_search
{
  "size":0,
   # 先按照年龄分组，在按照性别分组，再按照平均工资聚合
   # 最终的结果就得到了每个年龄段，每个性别的平均账户余额
   "aggs": {
    "group_by_age": {
      "range": {
        "field": "age",
        "ranges": [
          {
            "from": 20,
            "to": 30
          }
        ]
      },
      "aggs": {
        "group_by_gender": {
          "term": {
            "field": "gender.keyword"
          },
          # 在上一层根据gender聚合的基础上再基于avg balance聚合
          "aggs": {
            "average_balance": {
              "avg": {
                "field": "balance"
              }
            }
          }
        }
      }
    }
}
```
6、嵌套聚合，并且使用内部聚合的结果集
```json
GET /your_index/your_type/_search
{
  "size":0,
   # 嵌套聚合，并且使用内部聚合的结果集
   "aggs": {
    "group_by_state": {
      "term": {
        "field": "state.keyword",
        "order": {
          # average_balance是下面内部聚合的结果集合，在此基础上做desc
          "average_balance": "desc"
        }
      },
      # 如下的agg会产出多个bucket如：
      # bucket1 => {state=1，acg=xxx、min=xxx、max=xxx、sum=xxx}
      # bucket2 => {state=2，acg=xxx、min=xxx、max=xxx、sum=xxx}
      "aggs": {
        "average_balance": {
          "avg": {  # avg 求平均值  metric
            "field": "balance"
          }
        },
         "min_price": {
          "min": {  # metric 求最小值
            "field": "price"
          }
        },
         "max_price": {
          "max": {  # metric 求最大值
            "field": "price"
          }
        },
         "sum_price": {
          "sum": {  # metric 计算总和
            "field": "price"
          }
        },
      }
    }
  }
}
```
8、除了前面说的按照值分组聚合，比如男、女，还可以使用histogram按区间聚合分析。
```json
GET /your_index/your_type/_search
{
  "size":0,
  # histogram，类似于terms，同样会进行bucket分组操作。
  # 使用histogram需要执行一个field，比如下例中的age，表示按照age的范围进行分组聚合
  "aggs": { # 聚合中嵌套聚合
      "group_by_price": {
            "histogram": {
                 "field": "age",
                  # interval为10，它会划分成这样 0-10  10-20  20-30 ...
                  # 那age为21的记录就会被分进20-30的区间中
                 "interval":10
             },
       "aggs": { # 聚合中嵌套聚合
            "average_price": {
               "avg": {
                  "field": "price"
               }
            }
        }
     }
  }
}
```
9、根据日期进行聚合
```json
GET /your_index/your_type/_search
{
  "size":0,
  "aggs": {
     "agg_by_time" : {
          # 关键字
          "date_histogram" : {
                "field" : "age",
                # 间隔，一个月为一个跨度
                "interval" : "1M",
                "format" : "yyyy-MM-dd",
                # 即使这个区间中一条数据都没有，这个区间也要返回
                "min_doc_count":0
                # 指定区间
                “extended_bounds”:{
                  "min":"2021-01-01",
                  "max":"2021-01-01",
                }
            }
        }
    }
}
# 补充
"interval":“quarter”按照季度划分
```
10、filter aggregate 过滤、聚合。
```json
# Case1
# 如下例子：我想先过滤出年龄大于20的人，然后聚合他们的平均工资
GET /your_index/your_type/_search
{
  "size":0,
  "query":{
    "consitant_score":{
      # 这个filter会针对ES中全局的数据进行filter
      "filter":{
        "range":{"age":{"gte":20}}
      }
    }
  },
  "aggs":{
    "avg_salary":{
      "avg":{
        "field":"salary"
      }
    }
  }
}
# Case2
# bucket filter
POST /sales/_search
{
    "aggs" : {
        # T恤bucket的agg
        "agg_t_shirts" : {
            "filter" : {
              "term": {
                "type": "t-shirt"
              }
            },
            "aggs" : {
                "avg_price" : { "avg" : { "field" : "price" } }
            }
        },
      # 毛衣bucket的agg
      "agg_sweater" : {
            "filter" : {
              "term": {
                "type": "sweater"
              }
            },
            "aggs" : {
                "avg_price" : { "avg" : { "field" : "price" } }
            }
        }
    }
}
```
11、嵌套聚合-广度优先:说一个应用于场景: 我们检索电影的评论， 但是我们先按照演员分组聚合，再按照评论的数量进行聚合。且我们假设每个演员都出演了10部电影。
分析: 如果我们选择深度优先的话， ES在构建演员电影相关信息时，会顺道计算出电影下面评论数的信息，假如说有10万个演员的filter aggregate话， 10万*10=100万个电影 每个电影下又有很多影评，接着处理影评， 就这样内存中可能会存在几百万条数据，但是我们最终就需要50条，这种开销是很大的。广度优先的话，是我们先处理电影数，而不管电影的评论数的聚合情况，先从10万演员中干掉99990条数据，剩下10个演员再聚合。
```json
"aggs":{
        "target_actors":{
            "terms":{
                "field":"actors",
                "size":10,
                "collect_mode":"breadth_first" # 广度优先
            }
        }
}
```
12、global aggregation 全局聚合，下面先使用query进行全文检索，然后进行聚合， 下面的聚合实际上是针对两个不同的结果进行聚合。
- 第一个聚合添加了global关键字，意思是ES中存在的所有doc进行聚合计算得出t-shirt的平均价格
- 第二个聚合针对全文检索的结果进行聚合
```json
POST /sales/_search?size=0
{
    "query" : {
        # 全文检索 type = t-shirt的商品
        "match" : { "type" : "t-shirt" }
    },
    "aggs" : {
        "all_products" : {
            "global" : {}, # 表示让 all_products 对ES中所有数据进行聚合
            "aggs" : {
                # 没有global关键字，表示针对全文检索的结果进行聚合
                "avg_price" : { "avg" : { "field" : "price" } }
            }
        },
        "t_shirts": { "avg" : { "field" : "price" } }
    }
}
```
13、Cardinality Aggregate 基数聚合在ES中聚合时去重一般选用cardinality metric，它可以实现对每一个bucket中指定的field进行去重，最终得到去重后的count值。虽然她会存在5%左右的错误率，但是性能特别好
```json
POST /sales/_search?size=0
{
    "aggs" : {
        # 先按照月份聚合得到不同月的bucket
        "agg_by_month" : {
            "date_histogram":{
              "field" : "my_month",
              "internal":"month"
            }
        },
        # 在上一步得到的以月份为维护划分的bucket基础上，再按照品牌求基数去重。
        # 于是最终我们就得到了每个月、每种品牌的销售量。
        "aggs" : {
          "dis_by_brand" : {
              "cardinality" : {
                 "field" : "brand"
            }
        }
    }
}
```
对Cardinality Aggregate的性能优化， 添加 precision_threshold 优化准确率和内存的开销。还是下面的例子，如果将precision_threshold的值调整到100意思是：当品牌的总数量小于100时，去重的精准度为100%， 此时内存的占用情况为 100*8=800字节。加入我们将这个值调整为1000，意思是当品台的种类在1000个以内时，去重的精准度100%，内存的占用率为1000*8=80KB。官方给出的指标是：将precision_threshold设置为5时，错误率会被控制在5%以内。
```json
POST /sales/_search?size=0
{
    "aggs" : {
        "type_count" : {
            "cardinality" : { # 关键字
                "field" : "brand"
                "precision_threshold":100
            }
        }
    }
}
```
进一步优化，Cardinality底层使用的算法是 HyperLogLog++。因为这个算法的底层会对所有的 unique value取hash值，利用这个hash值去近似的求distcint count， 因此我们可以在创建mapping时，将这个hash的求法设置好，添加doc时，一并计算出这个hash值，这样 HyperLogLog++ 就无需再计算hash值，而是直接使用。从而达到优化速度的效果。
```json
PUT /index/
{
    "mappings":{
        "my_type":{
            "properties":{
                "my_field":{
                    "type":"text",
                    "fields":{
                        "hash":{
                            "type":"murmu3"
                        }
                    }
                }
            }
        }
    }
}
```
14、控制聚合的升降序:比如我想知道每种颜色item的平均价格，并且我希望按照价格的从小到大升序展示给我看。于是就像下面这样，先按照颜色聚合可以将相同颜色的item聚合成1组，在聚合的结果上再根据价格进行聚合。期望在最终的结果中，通过order控制按照价格聚合的分组中升序排序， 这算是个在下钻分析时的排序技巧。
```json
GET /index/type/_search
{
     "size":0，
     "aggs":{
         "group_by_color":{
             "term":{
                 "field":"color",
                 "order":{ #
                     "avg_price":"asc"
                 }
             }
         },
         "aggs":{
             # 在上一层按color聚合的基础上，再针对price进行聚合
             "avg_price":{
                 "avg":{
                     "field":"price"
                 }
             }
         }
     }
}
```
15、Percentiles Aggregation:计算百分比， 常用它计算：在200ms内成功访问网站的比率、在500ms内成功访问网站的比例、在1000ms内成功访问网站的比例，或者是销售价为1000元的商品占总销售量的比例、销售价为2000元的商品占总销售量的比例等等。示例: 针对doc中的 load_time字段， 计算出在不同百分比下面的 load_time_outliner情况。
```json
GET latency/_search
{
    "size": 0，
    "aggs" : {
        "load_time_outlier" : {
            # 关键字
            "percentiles" : {
                "field" : "load_time"
            }
        }
    }
}
```
响应解读：在百分之50的加载请求中，平均load_time的时间是在445.0。 在99%的请求中，平均加载时间980.1。
```json
{
    ...
   "aggregations": {
      "load_time_outlier": {
         "values" : {
            "1.0": 9.9,
            "5.0": 29.500000000000004,
            "25.0": 167.5,
            "50.0": 445.0,
            "75.0": 722.5,
            "95.0": 940.5,
            "99.0": 980.1000000000001
         }
      }
   }
}
```
还可以自己指定百分比跨度间隔。
```json
GET latency/_search
{
    "size": 0，
    "aggs" : {
        "load_time_outlier" : {
            "percentiles" : {
                "field" : "load_time",
                "percents" : [95,99,99.9]
            }
        }
    }
}
```
优化: percentile底层使用的是 TDigest算法。用很多个节点执行百分比计算，近似估计，有误差，节点越多，越精准。可以设置compression的值， 默认是100 ， ES限制节点的最多是 compression*20 =2000个node去计算 ， 因为节点越多，性能就越差。一个节点占用 32字节， 1002032 = 64KB。
```json
GET latency/_search
{
    "size": 0，
    "aggs" : {
        "load_time_outlier" : {
            "percentiles" : {
                "field" : "load_time",
                "percents" : [95,99,99.9],
                "compression":100 # 默认值100
            }
        }
    }
}
```


### 4.Share:

https://blog.csdn.net/laoyang360/article/details/107133008
Elasticsearch 聚合数据结果不精确，怎么破？

https://www.cnblogs.com/wangzhuxing/p/9581947.html
ES系列十四、ES聚合分析（聚合分析简介、指标聚合、桶聚合）

https://www.jianshu.com/p/200d4abee8ec
Elasticsearch——聚合搜索

https://mp.weixin.qq.com/s/m7PLNAJdN9dAzq_Nsv6Gqw
7种优化后的查询技巧
