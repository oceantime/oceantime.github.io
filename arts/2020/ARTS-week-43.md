---
title: ARTS-week-43
date: 2020-11-08 17:43:13
tags:
---


## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm： 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

计算器 https://leetcode-cn.com/submissions/detail/114925301/

### 2.Review:

http://kb.objectrocket.com/elasticsearch/get-the-mapping-of-an-elasticsearch-index-in-python-880
python 方式获取 elasticsearch 索引映射表

#### 点评：

本文演示如何使用 Python 客户端进行 Elasticsearch，以 mapping 使用 indices.get_alias() 客户端库的方法以嵌套 Python 字典的形式返回索引的映射表, 具有很强的操作性。

环境准备：
- 安装 Python 3 和 PIP3
- 安装 Elasticsearch Python 客户端

操作步骤：
- 导入用于Elasticsearch的Python包
- 使用Python连接到Elasticsearch集群
- 使用Python获取所有Elasticsearch集群的索引
- 使用Python获取每个Elasticsearch索引的映射
- 获取Elasticsearch索引的映射模板

### 3.Tip:

1.Python 字典操作

```python
#字典合并
dict1 = {'a':1,'b':2,'c':3}
dict2 = {'d':8,'e':7,'g':6}
dict7 = {}
for k,v in dict1.items():
    dict7[k] = v
for k,v in dict2.items():
    dict7[k] = v

#判断字典中是否存在某个key
d = {'name':{},'age':{},'sex':{}}
#打印返回值，其中d.keys()是列出字典所有的key
print name in d.keys()
#结果返回True
```

2.在es里面index aliases就像是软连接一样，它可以映射一个或多个索引，提供了非常灵活的特性，使用它我们可以做到：
（1）在一个运行中的es集群中无缝的切换一个索引到另一个索引上
（2）分组多个索引，比如按月创建的索引，我们可以通过别名构造出一个最近3个月的索引
（3）查询一个索引里面的部分数据构成一个类似数据库的视图（views）

```shell
es里面操作索引别名的有两个api命令：
_alias 执行单个别名操作
_aliases 原子的执行多个别名操作


PUT /my_index_v1   //构建索引
PUT /my_index_v1/_alias/my_index   //给索引添加别名
GET /*/_alias/my_index  //查某个别名映射的所有index
GET /my_index_v1/_alias/* //查询某个index拥有的别名
{
    "my_index_v1" : {
        "aliases" : {
            "my_index" : { }
        }
    }
}

PUT /my_index_v2   //构建索引
POST /_aliases
{
    "actions": [
        { "remove": { "index": "my_index_v1", "alias": "my_index" }},
        { "add":    { "index": "my_index_v2", "alias": "my_index" }}
    ]
}
```

3.访问 ssl 认证的 elasticsearch 

```python
import ssl
from elasticsearch import Elasticsearch
from elasticsearch.connection import create_ssl_context


def main():
    # no cafile!
    ssl_context = create_ssl_context()
    ssl_context.check_hostname = False
    ssl_context.verify_mode = ssl.CERT_NONE

    es = Elasticsearch(hosts=[{'host': 'localhost', 'port': 39200}],
                       scheme="https",
                       # to ensure that it does not use the default value `True`
                       verify_certs=False,
                       ssl_context=ssl_context,
                       http_auth=("rally", "rally-password"))
    es.info()


if __name__ == '__main__':
    main()
```

### 4.Share:

https://www.cnblogs.com/mengxiaoleng/p/11837703.html
java使用顺序数组实现二叉树

https://www.cnblogs.com/xing901022/p/4867614.html
[Logstash-input-redis] 使用详解

https://blog.csdn.net/vkingnew/article/details/106772513
Clickhouse TTL

https://blog.csdn.net/weixin_39990025/article/details/99754989
使用elasticsearch_dsl完成对ElasticSearch的复杂搜索

https://blog.csdn.net/zzl394935072/article/details/88920361
ElasticSearch DSL 详解