---
title: ARTS-week-63
date: 2020-11-22 20:41:13
tags:
---


## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm： 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

215. 数组中的第K个最大元素 https://leetcode-cn.com/submissions/detail/125352531/
剑指 Offer 40. 最小的k个数 https://leetcode-cn.com/submissions/detail/125355104/
面试题 17.14. 最小K个数 https://leetcode-cn.com/submissions/detail/125355700/
704. 二分查找 https://leetcode-cn.com/submissions/detail/125412090/

### 2.Review:

https://towardsdatascience.com/why-90-percent-of-all-machine-learning-models-never-make-it-into-production-ce7e250d5a4a
为什么90%的机器学习模型从未投入生产？

#### 点评：

作者：Rhea Moutafis

当使用 Python 的 Pandas 认为尽管十分之九的科技高管认为，人工智能将成为下一次技术革命的中心，但它的采用和部署仍有增长空间。数据科学家不是罪魁祸首。

公司不是为机器学习而建立的：
- 领导的支持不仅仅是为了金钱
- 缺乏对数据的访问
- IT、数据科学和工程之间的脱节

机器学习模型有其自身的一系列挑战：
- 扩大规模比你想象的要难
- 劳动是重复的
- 高管们并不总是买账
- 缺乏跨语言和框架支持
- 版本控制和复现能力仍然是一个挑战

总结：
如果一个数据科学家90%的努力没有结果，那不是一个好预兆。如上所示，这不是数据科学家的错，而是由于固有的和组织上的障碍。改变并非朝夕。对于刚开始使用机器学习模型的公司来说，从一个非常小和简单的项目开始是明智的。但由于机器学习提供了许多改善客户体验和企业效率的方法，因此很明显，那些快速、早期部署模型的公司将是赢家。

```python
＃通过引用仅返回x> 5的行（在其上写会更改原始df）
df2  =  df。loc [ df [ 'x' ] >  5 ]
＃通过引用仅返回x为0、1、2、3或4的行
df3  =  df。X。isin（范围（4））
＃通过只读引用仅返回x> 5的行（无法写入）
df4  =  df [ df [ 'x' ] > 5 ]
```

结论：
  作者在一台非常旧的 4 核 PC 上，一分钟内运行 2.5 亿行内容，觉得会在实际应用中有着举足轻重的地位。因此建议，下次处理本地或从单个 AWS 实例中处理数据集时，可以考虑使用这个框架，非常高效。


### 3.Tip:

1. Linux 关闭 GPU 进程
```shell
~$nvidia-smi
#查看 Processes 结果
kill -9 PID
```

2. The StackOverflowError in Java

```shell
-Xss10M
```

3. hadoop 环境配置

```shell
# 环境变量配置
export HADOOP_HOME=$hadoop_home_dir
export PATH=$PATH:$HADOOP_HOME/bin
export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:$HADOOP_HOME/lib/native/
export CLASSPATH=`$HADOOP_HOME/bin/hdfs classpath --glob`
export ARROW_LIBHDFS_DIR=$PATH:$HADOOP_HOME/lib/native/

```

4. hadoop 客户端命令

```shell
# 列出HDFS中目录的内容
$ hdfs dfs -mkdir /user
$ hdfs dfs -mkdir /user/hduser
$ hdfs dfs -ls /

# put与get数据
$ hdfs dfs -put /home/hduser_/input.txt /user/hduser
$ hdfs dfs -cat /user/hduser/input.txt
https://china-testing.github.io/
$ hdfs  dfs -get /user/hduser/input.txt /home/hduser_/test.txt

# 更多帮助可以　hdfs dfs -usage <option> 或　hdfs dfs -help <option>
```

5. python 操作 hadoop

```python
# pyarrow
import pyarrow as pa
fs = pa.hdfs.connect(host, port, user=user, kerb_ticket=ticket_cache_path)
with fs.open(path, 'rb') as f:

fs = pa.hdfs.connect(host, port, user=user, kerb_ticket=ticket_cache_path,
                    driver='libhdfs3')

# hdfs
from hdfs import InsecureClient
client = InsecureClient('http://localhost:50070', user='hduser_')

fs_folders_list = client.list("/")
print(fs_folders_list)
with client.read('/user/hduser/input.txt', encoding='utf-8') as reader:
    for line in reader:
        print(line)
```

### 4.Share:

https://blog.csdn.net/u010738528/article/details/105276504
win10 单机配置 hadoop 3.1.1

https://blog.csdn.net/qq_26295547/article/details/79721488
hadoop学习笔记1-客户端搭建

