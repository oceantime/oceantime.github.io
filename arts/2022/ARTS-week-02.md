---
title: ARTS-week-02
date: 2022-01-09 19:27:28
tags:
---


## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm： 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

1185. 一周中的第几天：https://leetcode-cn.com/submissions/detail/254434993/
913. 猫和老鼠：https://leetcode-cn.com/submissions/detail/254948657/
23. 合并K个升序链表：https://leetcode-cn.com/submissions/detail/255139576/

### 2.Review:

https://qbox.io/blog/all-about-elasticsearch-bucket-script
Elasticsearch 桶脚本

#### 点评：

在管道聚合博客系列的前几期中，我们讨论了可以与查询一起使用的现成聚合。在这篇文章中，我们探索了使用脚本进行操作的管道聚合，从而为用户处理字段数据提供了灵活性。

[数据集](https://drive.google.com/file/d/0B6ayo5tF48fZTkJrOVpLNW5PNXZ2cnltYV80TEFoR0lkZllB/view?usp=sharing)

- 桶脚本
该"bucket_script"管道聚集落在父类的聚合下。它可以执行一个脚本，该脚本可以对父多桶聚合的所需指标进行每桶计算。要操作的指标应该是数字。该脚本将返回一个数值。

注意：必须启用内联脚本才能使这些聚合工作，否则可能会遇到来自 elasticsearch 的脚本执行错误。

查看生成的数据集，会发现所有温度值都以华氏温度给出。有一个要求，希望这些值以华氏为单位。我们知道如何将华氏度转换为摄氏度，乘以 0.5556。为了在每个桶的基础上应用它，我们可以将以下查询与"bucket_script"聚合结合使用：

```json
curl -XPOST 'localhost:9200/weather-data/_search?pretty' -d '{
  "query": {
    "match": {
      "city": "NY"
    }
  },
  "aggs": {
    "temp": {
      "date_histogram": {
        "field": "date",
        "interval": "month",
        "format": "dd-MM-yyyy"
      },
      "aggs": {
        "monthly": {
          "avg": {
            "field": "temp"
          }
        },
        "farenhietTo_celsius": {
          "bucket_script": {
            "buckets_path": {
              "farht_value": "monthly"
            },
            "script": "farht_value*0.5556"
          }
        }
      }
    }
  }
}'
```

通过运行上面的脚本，可以看到每个聚合桶都持有一个字段"farenhietToCelsius"，其中对应的温度值被转换为摄氏度。

- 桶选择器聚合
Bucket Selector 聚合是一个父聚合。它运行一个脚本来决定响应中应显示哪些所有存储桶。指定的指标应该是一个数字指标，并且脚本返回值必须是布尔值，桶选择器聚合才能工作。假设只想检索纽约市温度值大于 50 的存储桶。使用如下桶选择器聚合：

```json
curl -XPOST 'localhost:9200/weather-data/_search?pretty' -d '{
  "query": {
    "match": {
      "city": "NY"
    }
  },
  "aggs": {
    "temp": {
      "date_histogram": {
        "field": "date",
        "interval": "month",
        "format": "dd-MM-yyyy"
      },
      "aggs": {
        "monthly": {
          "avg": {
            "field": "temp"
          }
        },
        "temp_bucket_filter": {
          "bucket_selector": {
            "buckets_path": {
              "temp_var": "monthly"
            },
            "script": "temp_var >= 50"
          }
        }
      }
    }
  }
}'
```

在这里可以看到"bucket_selector"在 name 下应用了聚合"temp_bucket_filter"。在内部，我们创建了一个名为的变量"temp_var"，其值等于"monthly"聚合中的每个桶的值。现在，有一个脚本指定条件以仅显示值大于或等于 50 的存储桶。

结论
在这篇文章中，展示了两种不同类型的管道聚合，使用脚本进行操作。
注意：必须启用内联脚本才能使这些聚合工作，否则可能会遇到来自 elasticsearch 的脚本执行错误。在本系列的下一篇文章中，我们将展示另一组有用的聚合。

### 3.Tip:

#### kibana console 中调整索引 mapping 结构
1.查看索引 mapping 结构
```shell
GET /'index_name'/_mapping 
```
2.修改索引 mapping 结构
```shell
# 新增字段
PUT 'index_name'/_mapping
{
  "properties": {
    "field_name":{
        "type": "long"
    }
  }
}
# 新增字段赋值
POST /'index_name'/_update_by_query
{
    "query": {
        "match_all": {}
    },
    "script": {
        "source": "if (ctx._source.field_name== null) {ctx._source.field_name= 0}"
    }
}
```
3.修改字段
```shell
# 创建索引 idx_v1 并添加数据
PUT /idx_v1
# 创建索引 idx_v1 mapping结构
POST /idx_v1/_mapping
{
  "properties": {
    "id": {
      "type": "long"
    },
    "name": {
      "type": "text"
    }
  }
}
# 给索引添加别名
POST /_aliases
{
    "actions": [
        { "add": {
            "alias": "idx_alias",
            "index": "idx_v1"
        }}
    ]
}
# 索引 idx_v1 添加数据
POST idx_v1
{
  "id":1283239366077513729,
  "name":"天天"
}
# 查询 idx_v1 mapping 结构
GET /idx_v1/_mapping

# 创建索引 idx_v2
PUT /idx_v2
# 创建索引 mapping 结构
POST /idx_v2/_mapping
{
  "properties": {
    "id": {
      "type": "keyword"
    },
    "name": {
      "type": "text"
    }
  }
}
```
4. 使用 reindex API，将旧索引数据导入新索引
```shell
POST _reindex
{
  "source": {
    "index": "idx_v1",
    "type": "_doc"

  },
  "dest": {
    "index": "idx_v2",
    "type": "_doc"
  }
}
```
5. 给新索引 idx_v2 添加别名
```shell
POST /_aliases
{
    "actions": [
        { "add": {
            "alias": "idx_alias",
            "index": "idx_v2"
        }}
    ]
}
```
6. 将旧索引别名添加迁移到新索引请求：
```shell
POST /_aliases
{
    "actions" : [
        { "remove" : 
          { "index" : "idx_v1", "alias" : "item_alias" }
        },
        { "add" : 
          { "index" : "idx_v2", "alias" : "item_alias" }
        }
    ]
}
```
7. 删除旧索引v1
```shell
DELETE /idx_v1
```

#### Linux 下根据进程 ID 查看进程文件的路径
```shell
# 执行命令,就得到进程 jar 包所在的位置：
pwdx PID
```

### 4.Share:

https://coolcao.com/2020/04/30/SlidingWindowAlgorithm/
滑动窗口算法思想

https://zhuanlan.zhihu.com/p/74930691
OpenTelemetry-可观察性的新时代

https://www.jianshu.com/p/b1215d6b1cf7
使用 opentelemetry 搭建新一代可视化分布式监控系统

https://www.blackvoid.club/loki-log-aggregation-platform-from-the-creators-of-grafana/
Loki - log aggregation platform from the creators of Grafana

https://www.jianshu.com/p/5be3aeb27488
Elasticsearch 的索引别名管理

https://blog.csdn.net/qingmou_csdn/article/details/106275097
Elasticsearch 数据迁移与任务状态相关 API

https://www.codeleading.com/article/28525244095/
Filebeat自动关闭问题解决

https://blog.csdn.net/sky__man/article/details/78178821
systemctl 命令的使用及服务状态的查看