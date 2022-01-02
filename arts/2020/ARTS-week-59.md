---
title: ARTS-week-57
date: 2020-10-18 17:43:13
tags:
---


## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm： 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

数组中的逆序对 https://leetcode-cn.com/submissions/detail/118306359/

### 2.Review:

https://plumbr.eu/outofmemoryerror/gc-overhead-limit-exceeded
Java heap space

#### 点评：

java.lang.OutOfMemoryError: GC overhead limit exceeded 这种情况发生的原因是, 程序基本上耗尽了所有的可用内存, GC也清理不了。


原因分析
JVM抛出 java.lang.OutOfMemoryError: GC overhead limit exceeded 错误就是发出了这样的信号: 执行垃圾收集的时间比例太大, 有效的运算量太小. 默认情况下, 如果GC花费的时间超过 98%, 并且GC回收的内存少于 2%, JVM就会抛出这个错误。

解决方案
有一种应付了事的解决方案, 就是不想抛出 “java.lang.OutOfMemoryError: GC overhead limit exceeded” 错误信息, 则添加下面启动参数:
// 不推荐
-XX:-UseGCOverheadLimit
强烈建议不要指定该选项: 因为这不能真正地解决问题，只能推迟一点 out of memory 错误发生的时间，到最后还得进行其他处理。
如果想从根本上解决问题, 则需要排查内存分配相关的代码. 简单来说, 需要回答以下问题:
- 哪类对象占用了最多内存？
- 这些对象是在哪部分代码中分配的。

要搞清这一点, 可能需要好几天时间。下面是大致的流程:
- 获得在生产服务器上执行堆转储(heap dump)的权限。“转储”(Dump)是堆内存的快照, 稍后可以用于内存分析. 这些快照中可能含有机密信息, 例如密码、信用卡账号等, 所以有时候, 由于企业的安全限制, 要获得生产环境的堆转储并不容易。
- 在适当的时间执行堆转储。一般来说,内存分析需要比对多个堆转储文件, 假如获取的时机不对, 那就可能是一个“废”的快照. 另外, 每次执行堆转储, 都会对JVM进行“冻结”, 所以生产环境中,也不能执行太多的Dump操作,否则系统缓慢或者卡死,你的麻烦就大了。
- 用另一台机器来加载Dump文件。一般来说, 如果出问题的JVM内存是8GB, 那么分析 Heap Dump 的机器内存需要大于 8GB. 打开转储分析软件(我们推荐Eclipse MAT , 当然你也可以使用其他工具)。
- 检测快照中占用内存最大的 GC roots。详情请参考: Solving OutOfMemoryError (part 6) – Dump is not a waste。 这对新手来说可能有点困难, 但这也会加深你对堆内存结构以及navigation机制的理解。
- 接下来, 找出可能会分配大量对象的代码. 如果对整个系统非常熟悉, 可能很快就能定位了。使用 Plumbr 能捕获所有的 java.lang.OutOfMemoryError , 并找出其他的性能问题, 例如最消耗内存的数据结构等等。

Plumbr 在后台负责收集数据 —— 包括堆内存使用情况(只统计对象分布图, 不涉及实际数据),以及在堆转储中不容易发现的各种问题。 如果发生 java.lang.OutOfMemoryError , 还能在不停机的情况下, 做必要的数据处理. 下面是Plumbr 对一个 java.lang.OutOfMemoryError 的提醒:
- 哪类对象占用了最多的内存(此处是 271 个 com.example.map.impl.PartitionContainer 实例, 消耗了 173MB 内存, 而堆内存只有 248MB)
- 这些对象在何处创建(大部分是在 MetricManagerImpl 类中,第304行处)
- 当前是谁在引用这些对象(从 GC root 开始的完整引用链)

### 3.Tip:

elasticsearch 之 mapping

1.mapping 说明
ES 的 mapping 非常类似于静态语言中的数据类型：声明一个变量为 int 类型的变量， 以后这个变量都只能存储 int 类型的数据。同样的， 一个 number 类型的 mapping 字段只能存储 number 类型的数据。同语言的数据类型相比，mapping 还有一些其他的含义，mapping 不仅告诉 ES 一个 field 中是什么类型的值， 它还告诉 ES 如何索引数据以及数据是否能被搜索到。当查询没有返回相应的数据，mapping 很有可能有问题。当拿不准的时候，直接检查 mapping。

```shell

如何查看当前数据库里面的 mapping（可以用postman或者浏览器访问以下链接）：

http://127.0.0.1:9200/{index}/{type}/_mapping?pretty

如果 index 为： b2bware, type 为：commerical_sku

http://127.0.0.1:9200/b2bware/commercial_sku/_mapping?pretty

以上是看某个 type 下的 mapping 结构，如果你要看整个库的 mapping，URL 请去掉 type 断即可，如：

http://127.0.0.1:9200/b2bware/_mapping?pretty

返回结果如：
{
  "b2bware" : {
    "mappings" : {
      "commercial_sku" : {
        "properties" : {
          "message" : {
            "type" : "string"
          },
          "price" : {
            "type" : "string"
          },
          "tid" : {
            "type" : "string"
          },
          "user" : {
            "type" : "string"
          }
        }
      }
    }
  }
}
```

2.mapping 的创建及修改方式
mapping 一旦创建之后，就无法修改，只能追加，如果要修改，就需要删除掉整个文档进行重建。

```xml
就是直接插入数据，然后 ES 根据插入数据格式自动识别创建 mapping
如，创建一个ID为1 的新对象： http://127.0.0.1:9200/b2bware/newtable/1
{
 "name":"test info ",
  "content":"简单的json对象"
}

建index的时候，直接指定 mappings，可以一次性创建多个mapping,如下面的代码所示：
URL:http://127.0.0.1:9200/b2bware
参数body(放在post或者put请求的body部分)
{
  "settings": {
    "index": {
      "number_of_shards": "10",  //分10个片
      "number_of_replicas": "1"  //1个备份
    }
  },
  "mappings": {
    "commercial_sku": { //这是其中一个mapping，你还可以创建其他mapping
      "_timestamp": {  //这个配置可以删掉
        "enabled": true
      },
        "properties": {
          "message": {
            "type": "string"
          },
          "price": {
            "type": "string"
          },
          "tid": {
            "type": "string"
          },
          "user": {
            "type": "string"
          }
        }
    }
  }
}

已经创建了 index（库已经创建），新增一个 mapping
URL:http://127.0.0.1:9200/b2bware/_mapping/article PUT 方式
注意，这种创建方式 type[表名] 是在 URL 中指定的，BODY 部分只是指定了表结构：
{
    "properties": {
      "message": {
        "type": "string"
      },
      "price": {
        "type": "string"
      },
      "tid": {
        "type": "string"
      },
      "user": {
        "type": "string"
      }
    }
}
```

mapping 的修改：
因为 mapping 只能进行追加修改，所以在建 type 的时候，最好清晰的知道表结构，否则数据变更起来比较麻烦，就像 MySQL 中已经有一个 age 存储的是字符串，突然有一天想改为 int，因为存在历史数据，要变更就不那么容易,所以ES的mapping调整只能追加字段。

```shell
新增一个 visitCount 字段：
URL:http://127.0.0.1:9200/b2bware/article/_mapping PUT方式
{
    "properties": {
      "visitCount": {
        "type": "integer"
      }
    }
}
```

3.mapping 中的可设置的属性：
mappings ： 在index（库）下创建时使用，下面可以有多个mapping 以下数据结构主要针对每个mapping进行说明：


一级属性 | 二级属性 | 三级属性 | 说明
-|-|-|-
dynamic |  |  | 新增字段自动模式；true:表示自动识别新字段并创建索引，false:不自动索引新字段，strict:遇到未知字段，抛异常，不能存入
_timestamp |  |  | 是否使用时间戳，ES会自动加时间戳，使用的话请百度
properties |  |  | 属性列表（类似数据库多个字段定义）
 | {字段名} |  | 某个字段的定义
 |  | type | 数据类型，参见数据类型说明
 |  | index | 映射选型，参见映射选型说明
 |  | doc_values | 布尔值， 对not_analyzed字段，默认都是开启，分词字段不能使用，对排序和聚合能提升较大性能，节约内存
 |  | format | 如果数据类型为日期格式，传入值得时候是字符串，ES需要一个格式进行识别，如：yyyy-MM-dd HH:mm: ss
 |  | analyzer | 分词器，如ik,ansj(中文分词)
 |  | boost | 浮点型，字段级别的分数加权（权重）
 |  | ignore_above | 超过多少字符，就不处理，分词性能损耗较大，对字符串较长的可不分词
 |  | null_value | 设置一些缺失字段的初始化值，只有string可以使用，分词字段的null值也会被分词
 |  | store | 是否单独设置此字段的是否存储而从_source字段中分离，默认是false，只能搜索，不能获取值
 |  | search_analyzer | 设置搜索时的分词器，默认跟ananlyzer是一致的，比如index时用standard+ngram，搜索时用standard用来完成自动提示功能
 |  | 其它 | similarity，term_vector，norms，include_in_all，index_options，fielddata，ignore_malformed，precision_step


```shell
一个典型的mapping对象的属性有：
{
    "mappings": {
        "my_type": {
        //true:表示自动识别新字段并创建索引，false:不自动索引新字段，strict:遇到未知字段，抛异常，不能存入
            "dynamic":      "strict", 
            
              //动态模板
             "dynamic_templates": [
                    { "stash_template": {
                      "path_match":  "stash.*",
                      "mapping": {
                        "type":           "string",
                        "index":       "not_analyzed"
                      }
                    }}
                  ],
            //属性列表
            "properties": {
                //一个strign类型的字段
                "title":  { "type": "string"},
                
                "stash":  {
                    "type":     "object",
                    "dynamic":  true 
                }
            }
        }
    }
}
```

4.Elasticsearch 数据类型
Elasticsearch 自带的数据类型是 Lucene 索引的依据，也是我们做手动映射调整到依据。 映射中主要就是针对字段设置类型以及类型相关参数。

```shell
JSON 基础类型如下：
字符串：string
数字：byte、short、integer、long、float、double、
时间：date
布尔值: true、false
数组: array
对象: object

Elasticsearch 独有的类型：
多重: multi
经纬度: geo_point
网络地址: ip
堆叠对象: nested object
二进制: binary
附件: attachment

复合类型:
数组类型：没有明显的字段类型设置，任何一个字段的值，都可以被添加0个到多个，要求，他们的类型必须一致： 对象类型：存储类似json具有层级的数据 嵌套类型：支持数组类型的对象Aarray[Object]，可层层嵌套

地理类型:
geo-point类型： 支持经纬度存储和距离范围检索
geo-shape类型：支持任意图形范围的检索，例如矩形和平面多边形

专用类型 ipv4类型：用来存储IP地址，es内部会转换成long存储
completion类型：使用fst有限状态机来提供suggest前缀查询功能
token_count类型：提供token级别的计数功能
mapper-murmur3类型：安装sudo bin/plugin install mapper-size插件，可支持_size统计_source数据的大小

```

5.注意点：

Elasticsearch 映射虽然有 idnex 和 type 两层关系，但是实际索引时是以 index 为基础的。 如果同一个 index 下不同 type 的字段出现 mapping 不一致的情况 虽然数据依然可以成功写入并生成并生成各自的 mapping， 但实际上 fielddata 中的索引结果却依然是以 index 内第一个 mapping 类型来生成的。

6.映射选型说明

```shell
某个属性（字段）的index可选值有：
analyzed:默认选项，以标准的全文索引方式，分析字符串，完成索引。
not_analyzed:精确索引，不对字符串做分析，直接索引字段数据的精确内容。
no：不索引该字段。

```

### 4.Share:

https://sq.163yun.com/blog/article/184733100361850880
基于JavaScript的代码编辑器的比较和选型

https://www.cnblogs.com/chen110xi/p/6210098.html
FastDFS文件系统(二) fastdfs和其他文件系统区别

https://zhjwpku.com/2018/01/16/mysql-proxy-alternatives.htmls
mysql proxy 性能测试对比

https://blog.csdn.net/sinat_35930259/article/details/80354732
elasticsearch篇之mapping