---
> **ARTS-week-12**
> 2022-03-19 17:44
---


###### ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
- Algorithm： 每周至少做一个 leetcode 的算法题
- Review: 阅读并点评至少一篇英文技术文章
- Tip: 学习至少一个技术技巧
- Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

- [2044. 统计按位或能得到最大值的子集数目（中等）?](https://leetcode-cn.com/submissions/detail/283470670/)  
  + 思路：DFS
- [720. 词典中最长的单词（简单）?](https://leetcode-cn.com/submissions/detail/284985447/)  
  + 思路：哈希表
- [2043. 简易银行系统（中等）\*](https://leetcode-cn.com/submissions/detail/285497375/)  
  + 思路：设计

### 2.Review:

- [Elasticsearch 管道聚合综合指南：第 II 部分](https://qbox.io/blog/introduction-to-elasticsearch-pipeline-aggregations-part-ii/)  

#### 点评：

在之前的教程中，我们讨论了 Elasticsearch 管道聚合的结构，并引导设置了几个常见的管道，例如导数、累积总和 avg 桶聚合。

在本文中，我们将继续分析 Elasticsearch 管道聚合，重点介绍统计信息、移动平均线和移动函数、百分位数、存储桶排序和存储桶脚本等管道。Kibana 支持本文中讨论的一些管道聚合（如移动平均线），因此我们还将展示如何可视化它们。让我们开始吧！

- 指数加权移动平均线 （EWMA）
此模型具有与线性模型相同的行为，只是"较旧的"数据点的重要性呈指数级下降，而不是线性下降。"较旧"点的重要性下降的速度可以通过设置进行控制。对于 较小的值，权重会缓慢衰减，从而提供更好的平滑效果。相反，较大的值使"较旧"数据点的重要性会很快下降，从而减少它们对移动平均线的影响。的默认值为 ，并且该设置接受 0-1 之间的任何浮点数（包括 0-1）。

正如在上面的查询中看到的那样，EWMA 聚合具有一个额外的"设置"对象，可以在其中定义：
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
                      "model" : "ewma",
                       "settings": {
                           "alpha": 0.5
                       }
                    }
                 }
            }
        }
    }
}
'
 ```
管道应生成以下响应：
```
管道应生成以下响应：
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
  -外推/预测
有时，可能希望根据当前趋势推断数据的行为。所有移动平均线模型都支持"预测"模式，该模式尝试在给定当前平滑移动平均线的情况下预测数据的移动。根据模型和参数，这些预测可能准确，也可能不准确。和模型都产生"平坦"预测，收敛于集合中最后一个值的平均值。

可以使用参数来指定要追加到序列末尾的预测数。这些预测将以与存储桶相同的间隔间隔进行。例如，对于线性模型：
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
                      "model" : "linear",
                      "predict" : 3
                    }
                 }
            }
        }
    }
}
'
```

此查询将在存储桶列表的末尾添加 3 个预测：

```
"aggregations" : {
    "visits_per_month" : {
      "buckets" : [
        ...
        {
          "key_as_string" : "2019-10-01T00:00:00.000Z",
          "key" : 1569888000000,
          "doc_count" : 0,
          "the_movavg" : {
            "value" : 2687.3924050632913
          }
        },
        {
          "key_as_string" : "2019-11-01T00:00:00.000Z",
          "key" : 1572566400000,
          "doc_count" : 0,
          "the_movavg" : {
            "value" : 2687.3924050632913
          }
        },
        {
          "key_as_string" : "2019-12-01T00:00:00.000Z",
          "key" : 1575158400000,
          "doc_count" : 0,
          "the_movavg" : {
            "value" : 2687.3924050632913
          }
        }
      ]
    }
  }
```
我们已经预测了未来三个月的网站流量。所见，预测是"平坦的"。也就是说，它们对所有 3 个月返回相同的值。如果要根据局部或全局常数趋势进行推断，则应选择该模型。

### 3.Tip:

#### 利用 grep 打印日志匹配的上下几行

```shell
$grep -r -5 ‘parttern’ filename    #打印匹配行的前后5行
$grep -r -C 5 ‘parttern’ filename  #打印匹配行的前后5行
$grep -r -A 5 ‘parttern’ filename  #打印匹配行的后5行
$grep -r -B 5 ‘parttern’ filename  #打印匹配行的前5行
$grep -rin ‘parttern’ filename     #打印匹配行并显示行号
```
注意：i-忽略大小写、n-显示行号、-r显示关键字所在的行

#### 删除文件后 df -h 显示目录大小未减小
1.删除文件 df -h 文件目录大小未改变，du 查看目录大小却改变了
2.df会计算各自meta数据，当该目录的文件被删除了，却仍有进程hold住这个文件句柄，此时这个文件的block并未被释放，df仍会统计到该文件的block，du不会。
3.遇到这种情况，就需要查hold进程,kill 掉进程就好了
```shell
$lsof | grep delete #找到 对应文件的 hold 进程 id
$kill -9 $id
```

#### java 优先队列 PriorityQueue 的使用
优点：
在定义了排序的规则之后可以再加入的同时进行排序，可以缩短排序所需的时间，同时较set来说没有单一元素不可重复的的限制。

常用方法：
add：加入元素
clear：删除所有元素
isEmpty：判断队列是否为空
poll：检索并删除此队列的头，如果此队列为空，则返回 null 
peek：检索但不删除此队列的头，如果此队列为空，则返回null
remove：检索并删除此队列的头，如果此队列为空会出现异常
comparator：返回用于排序此队列中元素的比较器，如果此队列是根据其元素的自然顺序排序的，则返回null
contains：返回队列中是否包含所给元素
size：返回所含的元素数量
```java
// 创建方法
/**
* 使用默认比较器
*/
 
PriorityQueue<Object> que = new PriorityQueue<>();
/**
* 使用自定义比较器（cmp）
*/
 
PriorityQueue<Object> que = new PriorityQueue<>(cmp);

// 比较器
Comparator<Integer> cmp = new Comparator<Integer>() {
    public int compare(Integer e1, Integer e2) {
        //比较方法
        return e2 - e1;
    }
};

// 代码示例
import java.util.Comparator;
import java.util.PriorityQueue;
 
public class TestPriorityQueue{
 
    /**
     * 写成静态方便试验时操作
     */
    static Comparator<Test> cmp = new Comparator<Test>() {
        @Override
        public int compare(Test o1, Test o2) {
            // TODO Auto-generated method stub
            return o1.index-o2.index;
        }
    };
    static PriorityQueue<Test> que = new PriorityQueue<>(cmp);
    public static void main(String[] args) {
        // TODO Auto-generated method stub
 
 
        CreatElement();
 
        System.out.println("输出元素数量："+que.size());
        System.out.println("是否包含："+que.contains(que.peek()));
        System.out.println("是否包含："+que.contains(new Test(11)));
        System.out.println("检索不弹出："+que.peek().index);
        /**
         * 输出元素数量：10
         * 是否包含：true
         * 是否包含：false
         * 检索不弹出：0
         */
        while(!que.isEmpty())
        {
            System.out.println("检索并弹出："+que.poll().index);
        }
        System.out.println("检索并弹出，此时为空队列："+que.poll());
        /**
         * 检索并弹出：0
         * 检索并弹出：1
         * 检索并弹出：2
         * 检索并弹出：3
         * 检索并弹出：4
         * 检索并弹出：5
         * 检索并弹出：6
         * 检索并弹出：7
         * 检索并弹出：8
         * 检索并弹出：9
         * 检索并弹出，此时为空队列：null
         */
        CreatElement();
        
        while(!que.isEmpty())
        {
            System.out.println("移除并输出："+que.remove().index);
        }
        /**
         * 移除并输出：0
         * 移除并输出：1
         * 移除并输出：2
         * 移除并输出：3
         * 移除并输出：4
         * 移除并输出：5
         * 移除并输出：6
         * 移除并输出：7
         * 移除并输出：8
         * 移除并输出：9
         */
    }
    
    /**
     * 添加元素的方法
     */
    public static void CreatElement()
    {
         for(int a=0;a<10;a++)
         {
             que.add(new Test(a)); 
         }
    }
 
}
class Test
{
    public Test(int index){
        this.index = index;
    }
    int index;
}
```

### 4.Share:

- [最清晰的进制转换讲解 - java实现](https://blog.51cto.com/u_15198640/2771794)  

- [实现ApplicationContextAware接口后调用时候报空指针NullPointerException异常](https://blog.csdn.net/CrazyRango/article/details/115556255)  

- [linux查找日志技巧](https://blog.51cto.com/u_15127660/4374631)  

- [Arthas官方文档](https://arthas.aliyun.com/doc/quick-start.html)  
