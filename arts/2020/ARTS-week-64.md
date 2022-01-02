---
title: ARTS-week-65
date: 2020-11-29 20:43:13
tags:
---


## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm： 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

215. 数组中的第K个最大元素 https://leetcode-cn.com/submissions/detail/127168639/
剑指 Offer 40. 最小的k个数 https://leetcode-cn.com/submissions/detail/127168560/
面试题 17.14. 最小K个数 https://leetcode-cn.com/submissions/detail/127168482/
704. 二分查找 https://leetcode-cn.com/submissions/detail/127156061/

### 2.Review:

http://bicortex.com/data-analysis-with-dask-a-python-scale-out-parallel-computation-framework-for-big-data/
使用 Dask 进行数据分析–适用于大数据的 Python 横向扩展并行计算框架

#### 点评：

作者目睹越来越多的人们致力于数据领域的研究，他们倾向于使用Python丰富的库生态系统，尤其是所谓的Python开放数据科学堆栈，即Pandas，NumPy，SciPy和Scikit-learn，远离诸如Fortran，Matlab和Octave之类的行业巨头。

对于相对较小的数据集而言，使用 Python 开放数据科学堆栈，并且可以轻松地放入RAM中。这样一来，就可以轻松地产生，收集，存储和处理比以前更多的数据，而价格却一直在下降。
- Pandas 等工具进行数据清理和探索性数据分析
- SciPy 和 NumPy 对数据进行统计测试
- Scikit-Learn 建立预测模型。

但是，由于数据收集和存储费用的减少，数据科学家越来越多地致力于解决涉及分析大量数据集的问题。当使用超过一定大小的数据集时，这些工具对其可行性具有上限。由于它们本身并不是为在分布式数据集上运行而构建的，一旦超过阈值，由于痛苦的长时间运行，即使是最简单的计算，不稳定的代码和笨拙的工作流，也很难从数据中提取含义。大型数据集既不能放入RAM，也不能放入一台计算机的永久性存储中。这些数据集的大小通常超过1 TB，并且根据问题的不同，可以达到PB甚至更高。

Dask 由 2014 年下半年由 Matthew Rocklin 发起项目，目标是将原生可扩展性带入 Python 开放数据科学堆栈，并克服其单机限制。Dask由几个不同的组件和API组成，可以分为三层：任务计划程序，低级API和高级别API。
- 任务调度程序是核心，它可以协调和监视 CPU 内核和计算机之间的计算执行。这些计算在代码中表示为 Dask Delayed 对象或 Dask Futures 对象（主要区别在于前者是惰性计算的-意味着它们在需要值时会及时评估，而后者则是热切评估-意味着它们实时评估，无论是否立即需要该值）。Dask 的高级 PI 为 Delayed 和 Futures 对象提供了一层抽象。这些高级对象上的操作会导致由任务调度程序管理许多并行的低级操作，从而为用户提供了无缝的体验。
- Dask 的 API 集来解决广泛范围内的问题，例如多维数据分析，可扩展的机器学习训练以及对大型模型的预测等，其主要用途之一就是能够实现类似 Pandas 的工作流程，即在大数据上按时间序列，商业智能和常规数据处理启用应用程序。与 Pandas 一样，Dask 也利用 DataFrame 的概念，大多数功能与 Pandas 重叠。Dask DataFrame 是由许多较小的 Pandas DataFrame 组成的大型并行 DataFrame，它们沿索引分割。这些 Pandas DataFrame 可以驻留在磁盘上，以便在一台计算机上或群集中的许多不同计算机上进行大于内存的计算。一个 Dask DataFrame 操作触发对组成的 Pandas DataFrames 的许多操作。

总结，在 Pandas 上使用类似 Dask 数据帧这样的并行数据帧的性能优势（或缺点）根据执行的计算类型而有所不同：
- 如果要进行小型计算，那么 Pandas 始终是正确的选择。并行化的管理成本将超过任何收益。如果计算花费不到100毫秒，则不应并行化。
- 对于诸如过滤，清理和聚合大数据之类的简单操作，应该通过使用并行数据帧实现线性加速。如果使用的是20核计算机，则可能会获得20倍的加速。随着扩展，管理开销将增加，因此加速会有所降低。
- 对于像分布式联接这样的复杂操作，它会更加复杂。可能会得到如上所述的线性加速，甚至可能会减速。具有类似数据库的计算和并行计算经验的人可能会很好地预测哪些计算会做得很好。

### 3.Tip:

1. Python 字符串转换为数值
```python
#整数
>>> int('123')
123
>>> int('1.23')
ValueError
>>> int('')
ValueError
>>> int(None)
TypeError

#浮点数
>>> float('123')
123.0
>>> float('1.23')
1.23
>>> float('')
ValueError
>>> float(None)
TypeError
>>> float('1e3')
1000.0

#百分号的数值
>>> s='12%'
>>> float(s.rstrip('%'))/100
0.12

#中文字符的数值字符
import unicodedata
>>> unicodedata.numeric('三')
3.0
>>> unicodedata.numeric('二十一')
TypeError: numeric() argument 1 must be a unicode character, not str

```

2. 用 pandas 处理大型 csv 文件

```python
# 1.读取限定列
file = pd.read_csv('demo.csv',usecols=['column1', 'column2', 'column3'])

# 2.读取限定行
file = pd.read_csv('demo.csv',nrows=1000,usecols=['column1', 'column2', 'column3'])

# 3.分块读取
reader = pd.read_csv('demo.csv',nrows=10000,
                     usecols=['column1','column2','column3'], 
                     chunksize=1000,iterator=True)
reader

# 4.head()方法默认是10条，也可以用tail()方法查看最后10条数据。
file = pd.read_csv('demo.csv')
df = pd.DataFrame(file)
df.head()
df.tail()

```

3. Elasticsearch 任务管理 api

```json
#任务api会从一个节点或集群中所有节点获取任务列表及状态.
GET /_tasks 
GET /_tasks?nodes=nodeId1,nodeId2 
GET /_tasks?nodes=nodeId1,nodeId2&actions=cluster:* 
注意：
Reindex 不会复制源索引的设置，应在执行 reindex 操作之前，提前设置好目标索引的映射、分片数等。

#任务id查询获取任务
GET /_tasks/taskId1
GET /_tasks?parent_task_id=parentTaskId1

#指定某个任务的状态一直等待该任务完成或者满足超时的条件
GET /_tasks/tidxiaorui.cctid:12345?wait_for_completion=true&timeout=10s

#强制取消暂停某个任务
POST /_tasks/taskId1/_cancel

#同时取消多个任务
POST /_tasks/_cancel?node_id=nodeId1,nodeId2&actions=*reindex

```

### 4.Share:

https://zhuanlan.zhihu.com/p/100535193
为什么选择R而不是Python做ETL

https://blog.csdn.net/xinlingjun2007/article/details/80358033
GPU数据库介绍

https://blog.csdn.net/vkingnew/article/details/85339844
GPU 数据库

https://blog.csdn.net/wushijingzuo/article/details/109554839
新一代Notebook神器出现，Jupyter危险了！
