---
title: ARTS-week-50
date: 2020-12-21 19:38:28
tags:
---


## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm: 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

349. 两个数组的交集 https://leetcode-cn.com/submissions/detail/132714304/

### 2.Review:

https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design/
REST API设计的最佳做法

#### 点评：

作者：John Au-Yeung 在本文中，我们将研究如何设计 REST API，以使使用它们的任何人都易于理解，面向未来，安全且快速，因为它们将数据提供给可能是机密的客户端。

主要优势：
- 接受并使用JSON进行响应
- 在端点路径中使用名词代替动词
- 用复数名词来命名集合
- 嵌套分层对象的资源
- 妥善处理错误并返回标准错误代码
- 允许过滤，排序和分页
- 保持良好的安全习惯
- 缓存数据以提高性能
- 版本化我们的API

总结：
    设计高质量REST API的最重要要点是遵循Web标准和约定以保持一致性。JSON，SSL / TLS和HTTP状态代码都是现代Web的标准构建块。性能也是重要的考虑因素。我们可以通过一次不返回太多数据来增加它。另外，我们可以使用缓存，这样就不必一直查询数据。端点的路径应该一致，我们仅使用名词，因为HTTP方法指示了我们要采取的行动。嵌套资源的路径应位于父资源的路径之后。他们应该告诉我们我们正在获取或操作的内容，而无需阅读额外的文档以了解它在做什么。

### 3.Tip:

Elasticsearch 数据迁移与任务状态相关 API

1. 基本形式

参数说明：

- version_type
  - internal：忽略文档版本，如果目标索引中恰巧有相同主键的文档，则直接覆盖；（默认）
  - external：保留源索引中文档版本，创建目标索引中没有的文档，并更新目标索引中比源索引中版本旧的文档
- op_type
  - create：仅在目标索引中创建丢失的文档，所有现有文档将导致版本冲突

```shell
POST _reindex
{
  "conflicts": "proceed",
  "source": {
    "index": "source_index"
  },
  "dest": {
    "index": "target_index",
    "op_type": "create"
  }
}
```

2. 进阶形式

- 多索引多类型

```shell
POST _reindex
{
  "conflicts": "proceed",
  "source": {
    "index": ["source_index_1","source_index_2"],
    "type": ["source_index_1_type","source_index_2_type"]
  },
  "dest": {
    "index": "target_index_together"
  }
}
```

- 增加迁移条件

```shell
POST _reindex
{
  "conflicts": "proceed",
  "source": {
    "index": "source_index",
    "query": {
      "match_all": {}
    }
  },
  "dest": {
    "index": "target_index"
  }
}
```

- 迁移固定文档数

```shell
POST _reindex
{
  "conflicts": "proceed",
  "size": 10000,
  "source": {
    "index": "source_index",
    "sort": {
      "xxx": "desc"
    }
  },
  "dest": {
    "index": "target_index"
  }
}
```

- 迁移特定字段

```shell
POST _reindex
{
  "conflicts": "proceed",
  "source": {
    "index": "source_index",
    "_source": ["field_1","field_2"]
  },
  "dest": {
    "index": "target_index"
  }
}
```

- 迁移过程中修改文档

```shell
POST _reindex
{
  "conflicts": "proceed",
  "source": {
    "index": "source_index"
  },
  "dest": {
    "index": "target_index",
    "version_type": "external"
  },
  "script": {
    "inline": "if (ctx._source.field_value == 'value') {ctx._version++; ctx._source.remove('field_value')}",
    "lang": "painless"
  }
}
```

- 修改迁移时每批次的文档数量

```shell
POST _reindex
{
  "conflicts": "proceed",
  "source": {
    "index": "source_index",
    "size": 2000
  },
  "dest": {
    "index": "target_index"
  }
}
```

- 修改字段名称

```shell
POST _reindex
{
  "conflicts": "proceed",
  "source": {
    "index": "source_index"
  },
  "dest": {
    "index": "target_index"
  },
  "script":{
    "inline":"ctx._source.new_field = ctx._source.remove(\"old_field\")"
  }
}
```

- 多并发迁移 Reindex 支持 Sliced Scroll，分两种方式：
  - Manual slicing（手动切片）
  - Automatic slicing（自动切片）

```shell
POST _reindex?slices=5
{
  "conflicts": "proceed",
  "source": {
    "index": "source_index"
  },
  "dest": {
    "index": "target_index"
  }
}
```

- 从远程集群 reindex

```shell
POST _reindex
{
  "source": {
    "remote": {
      "host": "http://otherhost:9200",
      "username": "user",
      "password": "pass"
    },
    "index": "source",
    "query": {
      "match_all": {}
    }
  },
  "dest": {
    "index": "dest"
  }
}
```

3. Task API

- GET Task

```shell
GET _tasks?actions=*reindex
GET _tasks?detailed=true&actions=*reindex
```

- GET Task

```shell
GET _tasks?actions=*reindex
GET _tasks?detailed=true&actions=*reindex
GET _tasks/taskId:number
GET _cat/tasks
GET _cat/tasks?detailed
```

- Cancel Task

```shell
POST _tasks/node_id:task_id/_cancel

查看当前所有迁移任务
GET _tasks?detailed=true&actions=*reindex

取消单个迁移任务
POST _tasks/node_id:task_id/_cancel

取消节点 node_id1, node_id2 上的所有迁移任务
POST _tasks/_cancel?nodes=node_id1,node_id2&actions=*reindex

取消全部的迁移任务
POST _tasks/_cancel?actions=*reindex

取消全部的删除数据任务
POST _tasks/_cancel?actions=*delete/byquery
```

- Wait for a specific task to complete

```shell
GET _tasks/node_id:task_id?wait_for_completion=true&timeout=10s
GET _tasks?actions=*reindex&wait_for_completion=true&timeout=10s
```

### 4.Share:

https://zhuanlan.zhihu.com/p/61113670
Solr - Shards and Indexing Data in SolrCloud

https://blog.csdn.net/liangcheng0523/article/details/105179592
IDEA新建SpringBoot项目报错Cannot resolve symbol @springbootapplication和resolve symbol SpringApplication

https://www.cnblogs.com/zlz099/p/7746056.html
java学习路线和知识图谱

https://blog.csdn.net/the_snail/article/details/79209593
ng:command not found，ng不是内部或外部命令