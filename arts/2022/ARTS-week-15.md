---
> **ARTS-week-15 **
> 2022-04-09 19:43
---


###### ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
- Algorithm: 每周至少做一个 leetcode 的算法题
- Review: 阅读并点评至少一篇英文技术文章
- Tip: 学习至少一个技术技巧
- Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

- [661. 图片平滑器 (简单) ?](https://leetcode-cn.com/submissions/detail/288743923/)  
  + 思路：模拟
- [567. 字符串的排列 (中等) ?](https://leetcode-cn.com/submissions/detail/293689730/)  
  + 思路：滑动窗口

### 2.Review:

- [Elasticsearch 管道聚合综合指南：第 II 部分](https://qbox.io/blog/introduction-to-elasticsearch-pipeline-aggregations-part-ii/)  

#### 点评：

在之前的教程中，我们讨论了 Elasticsearch 管道聚合的结构，并引导设置了几个常见的管道，例如导数、累积总和 avg 桶聚合。

在本文中，我们将继续分析 Elasticsearch 管道聚合，重点介绍统计信息、移动平均线和移动函数、百分位数、存储桶排序和存储桶脚本等管道。Kibana 支持本文中讨论的一些管道聚合（如移动平均线），因此我们还将展示如何可视化它们。让我们开始吧！

- 存储桶选择器聚合
有时，根据某些条件筛选由日期直方图或其他聚合返回的存储桶会很有用。在这种情况下，可以使用包含脚本的存储桶选择器聚合来确定是否应在父存储桶聚合的输出中保留当前存储桶。

指定的指标必须是数字，并且脚本必须返回布尔值。如果脚本语言为 ，它可以返回一个数字布尔值。在这种情况下，0.0 的计算结果将为 ，所有其他值的计算结果将为 。expressionfalsetrue

在下面的示例中，我们首先计算每月访问量的总和，然后评估此总和是否大于 3000。如果为 ，则存储桶将保留在存储桶列表中。否则，它将从最终输出中删除：true
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
                "visits_bucket_filter": {
                   "bucket_selector": {
                       "buckets_path": {
                          "total_visits": "total_visits"
                        },
                    "script": "params.total_visits > 3000"
                  }
              }
         }
      }
   }
}
'
 ```
正如在下面的响应中看到的，聚合只留下了两个与规则匹配的存储桶。
```
"aggregations" : {
    "visits_per_month" : {
      "buckets" : [
        {
          "key_as_string" : "2019-03-01T00:00:00.000Z",
          "key" : 1551398400000,
          "doc_count" : 2,
          "total_visits" : {
            "value" : 3103.0
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
    }
  }
```

### 3.Tip:

#### 解决 WSL Centos sshd: no hostkeys available -- exiting.
```shell
#启动ssh
~$ service ssh restart
sshd: no hostkeys available -- exiting.
#解决
~$ yum -y install openssh-server openssh-clients
~$ /usr/sbin/ssh-keygen -A
~$ nohup /usr/sbin/sshd -D &
~$ netstat -ant | grep 22
```

#### Failed to download metadata for repo ‘AppStream’ [CentOS]
```shell
~$ yum update
CentOS-8 - AppStream 70 B/s | 38 B 00:00
Error: Failed to download metadata for repo 'AppStream': Cannot prepare internal mirrorlist: No URLs in mirrorlist

#修复无法为 repo 下载数据
~$ cd /etc/yum.repos.d/
~$ sed -i 's/mirrorlist/#mirrorlist/g' /etc/yum.repos.d/CentOS-*
~$ sed -i 's|#baseurl=http://mirror.centos.org|baseurl=http://vault.centos.org|g' /etc/yum.repos.d/CentOS-*
#再次执行 yum update 成功
~$ yum -y update
```

#### "-bash: netstat: command not found"
```shell
~$ yum -y install net-tools
```

#### "-bash: nmap: command not found"
```shell
~$ yum install nmap
```

#### docker 容器内 centos8 修改 root 密码
```shell
~$ yum install -y passwd
# 安装完成后再输入passwd root即可
~$ passwd root
```

#### WSL 安装，卸载
```shell
wslconfig /l
# 从列表中选择要卸载的发行版（例如Ubuntu）并键入命令
wslconfig /u Ubuntu
```

### 4.Share:

- [MybatisPlus学习笔记](http://luokangyuan.com/mybatisplusxue-xi-bi-ji/)  

- [ELKstack运维手册](http://www.sunrisenan.com/docs/elkstack/elk01.html)  

- [win10基于自带插件功能WSL安装/卸载ubuntu子系统及桌面](https://blog.csdn.net/weixin_41469272/article/details/104916102)  

- [在Windows 10上使用WSL安装Centos](https://zhuanlan.zhihu.com/p/272735470)  

- [虚拟机下CentOS7开启SSH连接](https://blog.csdn.net/tuntun1120/article/details/65443757)  

- [python-nmap 使用基础](https://www.cnblogs.com/Hi-blog/p/python-nmap.html)  

- [commandnotfound](https://commandnotfound.cn/)  
