---
> **ARTS-week-16**
> 2022-04-17 17:32
---


###### ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
- Algorithm: 每周至少做一个 leetcode 的算法题
- Review: 阅读并点评至少一篇英文技术文章
- Tip: 学习至少一个技术技巧
- Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

- [357. 统计各位数字都不同的数字个数 (中等) +](https://leetcode-cn.com/submissions/detail/298576908/)  
  + 思路：归纳
- [385. 迷语法分析器 (中等) +](https://leetcode-cn.com/submissions/detail/300619047/)  
  + 思路：栈

### 2.Review:

- [Elasticsearch 管道聚合综合指南：第 II 部分](https://qbox.io/blog/introduction-to-elasticsearch-pipeline-aggregations-part-ii/)  

#### 点评：

在之前的教程中，我们讨论了 Elasticsearch 管道聚合的结构，并引导设置了几个常见的管道，例如导数、累积总和 avg 桶聚合。

在本文中，我们将继续分析 Elasticsearch 管道聚合，重点介绍统计信息、移动平均线和移动函数、百分位数、存储桶排序和存储桶脚本等管道。Kibana 支持本文中讨论的一些管道聚合（如移动平均线），因此我们还将展示如何可视化它们。让我们开始吧！

- 存储桶排序聚合
存储桶排序是一种父管道聚合，它对其父级多存储桶聚合（例如日期直方图）返回的存储桶进行排序。可以指定多个排序字段以及相应的排序顺序。此外，可以根据存储桶或其子聚合对每个存储桶进行排序。还可以通过设置和参数截断结果存储桶。

在下面的示例中，我们根据计算值对父日期直方图聚合的存储桶进行排序。存储桶按降序排序，以便首先返回具有最高值的存储桶。
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
                "visits_bucket_sort": {
                    "bucket_sort": {
                        "sort": [
                          {"total_visits": {"order": "desc"}}
                        ],
                        "size": 5
                    }
                }
            }
        }
    }
}
'
 ```
如所见，排序顺序是在聚合的字段中指定的。我们还将参数设置为 5，以仅返回响应中的前 5 个存储桶：
```
"aggregations" : {
    "visits_per_month" : {
      "buckets" : [
        {
          "key_as_string" : "2019-09-01T00:00:00.000Z",
          "key" : 1567296000000,
          "doc_count" : 2,
          "total_visits" : {
            "value" : 3121.0
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
          "key_as_string" : "2019-08-01T00:00:00.000Z",
          "key" : 1564617600000,
          "doc_count" : 2,
          "total_visits" : {
            "value" : 2966.0
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
          "key_as_string" : "2019-07-01T00:00:00.000Z",
          "key" : 1561939200000,
          "doc_count" : 2,
          "total_visits" : {
            "value" : 2887.0
          }
        }
      ]
    }
  }
```
我们还可以使用此聚合来截断结果存储桶，而无需进行任何排序。为此，只需使用不带 .fromsizesort
以下示例只是截断结果，以便仅返回第二个和第三个存储桶：

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
                "visits_bucket_sort": {
                    "bucket_sort": {
                        "from": 2,
                        "size": 2
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
        }
      ]
    }
  }
```

- 结论
我们已经了解了Elasticsearch中支持的几乎所有管道聚合。正如我们所看到的，管道聚合有助于实现涉及中间值和由其他聚合生成的存储桶的复杂计算。还可以利用 Elasticsearch 脚本的强大功能，对返回的指标执行编程操作。例如，可以评估存储桶是否与特定规则匹配，并可能计算默认情况下不可用的任何自定义指标 （例如，最小/最大比率）。

### 3.Tip:

#### vi 在Vim中上下移动整行
```shell
ddkp
dd:将删除该行并将其添加到默认寄存器
k:将向上移动一行(j将向下移动一行)
p:将寄存器内容粘贴在当前行之上
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
~$ yum update -y
```

#### ModuleNotFoundError: No module named 'setuptools_rust'
```shell
~$ pip install -U pip setuptools
```

#### ModuleNotFoundError: No module named '\_ctypes'
```shell
#1.安装外部函数库(libffi)
~$ yum install libffi-devel -y
#2.重新安装python
~$ yum install python
#3.用pip3 Install 安装需要的包
~$ pip3 install sklearn
```

#### centos7 中在使用 yum 遇到 “undefined symbol: CRYPTO_num_locks”
问题描述：
centos7 中在使用 yum 安装程序时出现以下错误提示
/usr/lib64/python2.7/site-packages/pycurl.so: undefined symbol: CRYPTO_num_locks
```shell
#1.用命令查看依赖关系
~$ ldd /usr/lib64/python2.7/site-packages/pycurl.so | grep "curl"
libcurl.so.4 => /hrifs/usr/lib/libcurl.so.4 (0x00007f1442fa4000)
#2.到目录/hrifs/usr/lib/（注意目录因个人环境可能不同）下移除与libcurl.so.4相关的文件
~$ cd /hrifs/usr/lib/
lib$ ll | grep "libcurl"
-rwxr-xr-x 1 root root 415743 4月 15 12:01 libcurl.so
-rwxr-xr-x 1 root root 415743 4月 15 12:01 libcurl.so.4
lib$ rm -rf libcurl.so libcurl.so.4
```

#### "-bash: make: command not found"
```shell
# 安装 make
~$ yum -y install gcc automake autoconf libtool make
# 安装 g++
~$ yum -y install gcc gcc-c++ kernel-devel
```

#### python 字节和字符串互转
```python
#bytes object
byte = b"byte example"

# str object
str = "str example"

# str to bytes 字符串转字节
bytes(str, encoding="utf8")

# bytes to str  字节转字符串
str(bytes, encoding="utf-8")

# an alternative method
# str to bytes  字符串转为字节
str.encode(str)

# bytes to str  字节转为字符串
bytes.decode(bytes)
```

### 4.Share:

- [sshpass：一个很棒的免交互 SSH 登录工具，但不要用在生产服务器上](https://linux.cn/article-8086-1.html)  

- [Linux 用户和用户组管理](https://www.runoob.com/linux/linux-user-manage.html)  

- [sshd命令 – openssh服务器守护进程](https://www.linuxcool.com/sshd)  

- [ssh-keygen](https://www.jianshu.com/p/dd053c18e5ee)  

- [Python3 telnetlib 实现 telnet 客户端](https://www.cnblogs.com/lsdb/p/9258964.html)  

- [python-nmap 使用基础](https://www.cnblogs.com/Hi-blog/p/python-nmap.html)