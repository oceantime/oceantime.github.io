---
> **ARTS-week-49**
> 2022-01-03 18:43
---


## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm： 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

1166. 设计文件系统：https://leetcode-cn.com/submissions/detail/247819220/
622. 设计循环队列：https://leetcode-cn.com/submissions/detail/247839040/
1797. 设计一个验证系统：https://leetcode-cn.com/submissions/detail/247930300/

### 2.Review:

https://medium.com/python-in-plain-english/101-guide-to-pytorch-6dffa11989ef
PyTorch 101 ：基本概念和常见模型

#### 点评：

介绍
PyTorch是一个面向Python的开源机器学习库，它允许在深度学习的科学计算方面拥有最大的灵活性和速度。  

在其核心，PyTorch提供了两个主要特性:  
- n维张量，类似于NumPy，但可以在GPU上运行
- 用于构建和训练神经网络的自动微分

1.张量在PyTorch的用法
张量是一种n维数据容器，类似于NumPy的ndarray。我们也可以在GPU上使用这些张量(NumPy不能用于GPU)。  
PyTorch支持多种类型的张量，包括:  
- Float张量:32位浮点数
- Double张量:64位浮点数
- 半张量:16位浮点数
- Int张量:32位整数
- Long张量:64位int

可以直接赋值或设置张量的大小来初始化一个张量。  

```python
import torchnew_tensor = torch.Tensor([[1, 2], [3, 4]])# create a 3 x 3 tensor with random values
  empty_tensor = torch.Tensor(3, 3)
# 使用索引来访问或替换张量中的元素。  
# new_tensor[1][1]返回一个张量对象，其中包含位置为1,1的元素。
# 切片还可以用于访问张量中的每一行和每一列。
print(slice_tensor[:, 0])print(slice_tensor[1, :])
# x.type(), x.size() 可用于访问张量信息(张量的类型/形状)。 
# type of a tensor
print(new_tensor.type())# shape of a tensor
print(new_tensor.shape) 
print(new_tensor.size())
# 可使用 view(n,m)对张量进行reshape .使张量形状变成n x m。 
tensor = torch.Tensor([[1, 2], [3, 4]])reshape_tensor.view(1,4)  # tensor([[ 1.,  2.,  3.,  4.]])
```

2.基本的张量操作

```python
# 1.转置: .t() 或 .permute(-1, 0)
tensor.t()
tensor.permute(-1,0)
# 2. 矩阵乘:.mm()
matrix_product = tensor_1.mm(tensor_2)
# 3.算术运算操作 (+,-,*,/) 
#matrix addition
print(torch.add(a,b), '\n')# matrix subtraction
print(torch.sub(a,b), '\n')# matrix multiplication                       
print(torch.mm(a,b), '\n')# matrix division                       
print(torch.div(a,b), '\n')
# 4. 叉积: a.cross(b) or torch.cross(a, b)
#creating two random 3x3 matrices
tensor_1 = torch.randn(3, 3) 
tensor_2 = torch.randn(3, 3) cross_prod = tensor_1.cross(tensor_2)
# 5.连接张量
# concatenating vertically
torch.cat((a,b))
# 也可以通过设置 dim参数为1来水平连接张量。
torch.cat((a,b),dim=1)
```

3.PyTorch - NumPy互转
NumPy ndarray可转为PyTorch张量，反之亦然。  
.from_numpy()用于将NumPy ndarray转换为PyTorch张量。
.numpy()用于将张量转换回NumPy ndarray。

4.PyTorch NN模块背景
神经网络(NNs)是在输入数据上执行的嵌套函数的集合。这些函数由参数(由权重和偏置组成)定义，在PyTorch中，这些参数存储在张量中。
训练NN分为两个步骤:
正向传播:神经网络对正确输出做出最佳猜测。它通过每个函数运行输入数据来进行猜测。  
反向传播:神经网络根据其猜测中的误差调整其参数。通过向后遍历输出,收集错误的导数对函数的参数(梯度),并使用梯度下降优化参数(梯度下降法是一个迭代优化算法，以迭代的方式沿（由负梯度定义的）最快下降方向移动，得到最小化函数误差)。  

5.常见PyTorch模块

```python
# 1.Autograd模块 torch.autograd是PyTorch的自动微分引擎，为神经网络训练提供动力。它记录我们正在执行的所有操作，并向后回放以计算梯度。这种技术帮助我们在计算前向传递本身的梯度时节省时间。考虑一个张量a包括requires_grad=True。这向autograd信号，张量上的每个操作都应该被跟踪。 
import torch

a = torch.tensor([1., 2.], requires_grad=True)# performing operations on the tensor                       
b = a + 5                       
c = b.mean()                       
print(b,c)OUTPUT: tensor([6., 7.], grad_fn=<AddBackward0>) tensor(6.5000, grad_fn=<MeanBackward0>)

# 现在，c对a的导数是1 / 2所以梯度矩阵是0.50。让我们用PyTorch验证一下:  
# back propagating 
c.backward() # computing gradients 
print(a.grad)OUTPUT: tensor([0.5000, 0.5000])
# Autograd如预期的那样，计算梯度。

# 2. Optim 模块 PyTorch中的Optim模块已为构建神经网络所需的大多数优化器编写了大量代码。  
# importing the optim module from PyTorch
import optim
# PyTorch支持大多数常用的优化器，因此使用时不必从头编写。  

# 3.nn 模块 当我们处理一个复杂神经网络时，这个模块定义了一组函数，类似于神经网络的层次，它从之前的状态获取输入并产生输出。  
import torch.nn as nn
import torch.nn.functional as F
# nn模块是PyTorch中用于训练深度神经网络最常用的模块之一。  
```

### 3.Tip:

#### ElasticSearch:桶过滤聚合(Bucket Selector Aggregation)
这个聚合使用于做分桶后的过滤的，父聚合传下来的参数需要为数值型，聚合中的script需要返回一个布尔型的结果
```json
{
    "bucket_selector": {
        "buckets_path": {
            "my_var1": "the_sum", 
            "my_var2": "the_value_count"
        },
        "script": "params.my_var1 > params.my_var2"
    }
}
```
script  过滤条件    是   
buckets_path    上层聚合的变量 是   
gap_policy  当出现间隔时候的处理方式    否   skip

#示例 返回按月聚合后销售额大于400的结果
```json
POST /sales/_search
{
    "size": 0,
    "aggs" : {
        "sales_per_month" : {
            "date_histogram" : {
                "field" : "date",
                "interval" : "month"
            },
            "aggs": {
                "total_sales": {
                    "sum": {
                        "field": "price"
                    }
                },
                "sales_bucket_filter": {
                    "bucket_selector": {
                        "buckets_path": {
                          "totalSales": "total_sales"
                        },
                        "script": "params.totalSales > 200"
                    }
                }
            }
        }
    }
}
```

返回结果

```json
{
   "took": 11,
   "timed_out": false,
   "_shards": ...,
   "hits": ...,
   "aggregations": {
      "sales_per_month": {
         "buckets": [
            {
               "key_as_string": "2015/01/01 00:00:00",
               "key": 1420070400000,
               "doc_count": 3,
               "total_sales": {
                   "value": 550.0
               }
            },
            {
               "key_as_string": "2015/03/01 00:00:00",
               "key": 1425168000000,
               "doc_count": 2,
               "total_sales": {
                   "value": 375.0
               },
            }
         ]
      }
   }
}
```

#### ES聚合后根据 doc_count 进行过滤
统计具有相同flow_id的日志数量，并过滤统计数量大于等于1000条的日志。
```java
GET index_*/_search?size=0
{

  "aggs": {
    "age_terms": {
      "terms": {
        "field": "flow_id"
        },
        "aggs":{
        "having": {
          "bucket_selector": {
            "buckets_path": { 
              "view_count": "_count"
            },
            "script": "params.view_count < 1000"
          }
        }
        }
      }
    },
  "query":{
    "bool":{
      "must":[
    {"match":{
      "event_type":"alert"
    }
    }
    ]
  }
  }
}
```

### 4.Share:

https://www.cnblogs.com/sanduzxcvbnm/p/12092513.html
Elasticsearch：top_hits aggregation

https://blog.csdn.net/DPnice/article/details/80251696
ElasticSearch 清空index数据的方法 _delete_by_query

https://blog.csdn.net/weixin_39723544/article/details/103952501
Elasticsearch(011)：es映射(mapping)的创建、修改、删除等操作

https://www.bilibili.com/video/av457027449/
Creating Drilldowns in Kibana

https://blog.csdn.net/cpongo3/article/details/90235135
kibana json input里使用自定义脚本

https://www.elastic.co/cn/blog/using-painless-kibana-scripted-fields
在 kibana 脚本化 fields 中使用 painless

https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-scripting-expression.html
Lucene 表达式脚本

https://blog.csdn.net/UbuntuTouch/article/details/102797703
Elasticsearch：significant terms aggregation

https://elasticsearch.cn/question/1966
ElasticSearch能否对bucket的结果做筛选？

https://blog.csdn.net/alex_yangchuansheng/article/details/114696852
Loki系列文章

https://github.com/grafana/loki