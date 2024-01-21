---
title: ARTS-week-24
date: 2020-06-20 20:23:35
tags:
---


## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm: 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

Jump Game https://leetcode.com/submissions/detail/356539265/

### 2.Review:

https://streamsets.com/blog/machine-learning-with-tensorflow-and-kafka-in-data-collector/
在 Data Collector 中使用 TensorFlow 进行实时机器学习

#### 点评：

作者通过乳腺肿瘤分类为恶性或良性的用例，讲解如何使用 TensorFlow 模型进行预测和分类，使用StreamSets Data Collector 3.5.0 的 TensorFlow Evaluator。

一般ML分为两大类：
- 监督学习：监督学习是学习功能的机器学习任务，它根据示例输入-输出对，将输入映射到输出。
- 监督学习解决的常见业务问题：
1. 二进制分类（学习预测分类值）
   - 客户是否会购买特定产品？
   - 这种癌症是恶性的还是良性的？

2. 多类分类（学习预测分类值）
   - 给定的文本是否有毒，威胁或淫秽？
   - 这种鸢尾花属植物，杂色或维吉尼亚的种类？

3. 回归（学习预测连续价值）
   - 房屋的预测售价是多少？
   - 明天在旧金山会有什么温度？

- 无监督学习：允许我们在很少或根本不知道输出是什么的情况下解决问题。它涉及构建模型，其中过去数据的标签不可用。在这些类型的问题中，通过基于数据中的变量之间的关系对数据进行聚类来导出结构。
- 常见的神经网络和深度学习应用包括：
1. 计算机视觉/图像识别/物体检测
2. 语音识别/自然语言处理（NLP）
3. 推荐系统（产品，配对等）
4. 异常检测（网络安全等）

分析方法：
使用 TensorFlow SavedModelBuilder 训练和导出模型后，只要将模型保存在Data Collector 可访问的位置，就可以在数据流管道中使用它进行预测或分类非常简单。

处理流程：
1. 目录来源：
- 从.csv文件加载乳腺癌记录

2. 场转换器：
- 此处理器将转换模型使用的所有输入乳腺癌记录功能

3. TensorFlow Evaluator *：
- 保存的模型路径：指定要使用的预训练TF模型的位置。
- 模型标签：设置为“提供”，因为元图（在我们的导出模型中）旨在用于服务。
- 输入配置：指定在训练和导出模型期间配置的输入张量信息。
- 输出配置：指定在训练和导出模型期间配置的输出张量信息。
- 输出字段：我们要存储分类值的输出记录字段。

4. 表达式计算器：
- 此处理器评估模型输出/分类值0或1（存储在输出字段TF_Model_Classification中）并创建一个新记录字段'Condition'，其值分别为Benign或Malignant。

5. 流选择器：
- 该处理器评估癌症状况（良性或恶性）并将记录路由到相应的Kafka生产者。

6. Kafka Producers：
- 输入记录以及模型输出/分类值有条件地路由到两个Kafka生产者进行进一步处理和分析。

总结：
文章通过 Data Collector 的 TensorFlow Evaluator, 使用提供预先训练的TF模型生成预测和/或分类，而无需编写任何自定义代码。


### 3.Tip:

1. Miniconda3 安装

```shell
官网 https://conda.io/miniconda.html
```

2. Conda 管理环境

```shell
# 创建 
conda create -n rcnn python=3.6

# 删除 
conda remove -n rcnn --all

# 重命名  
conda create -n tf --clone rcnn
conda remove -n rcnn --all

# 激活 rcnn 环境
activate rcnn  # windows
source activate test_py2 # linux/mac

# 退出环境
deactivate

# 查看所有环境
conda info -e

```

3. Pip 管理包

```shell
# 更新 pip
python -m pip install --upgrade pip

# 安装命令
pip install package_name

# 安装numpy,输入
pip install numpy

# 安装 tensorflow
pip install tensorflow

# 查看已安装的包
pip list installed

# 搜索安装包
pip search tensorflow

# 同时安装多个包
pip install numpy scipy pandas

# 安装指定版本的包
pip install tensorflow=1.12.0

# 卸载包
pip remove tensorflow

# 更新包
pip update tensorflow

# 更新环境中的所有包
pip update --all
```

4. 配置 tensorflow 环境

```shell
# 删除 tensorflow 已有环境
conda remove -n tensorflow -all

# 创建 tensorflow 环境并指定 python 版本
conda create -n tensorflow python=3.6

# 进入 tensorflow 环境
conda activate tensorflow

# 更新 tensorflow 环境的 pip
python -m pip install --upgrade pip

# 安装 tensorflow 包
pip install tensorflow==1.12.0

# 检查 tensorflow 包是否安装好 tensorflow 1.12.0
pip list installed 

# 安装 tensorflow 包
pip install tensorflow==1.12.0

```

5. python 环境验证 tensorflow

```shell

a.进入 python 解释器
python
>>> import tensorflow as tf
numpy 高级提示有个 api 马上废弃
>>> exit()

b.numpy 降低版本
pip remove numpy
pip install numpy==1.15.4

c.重新执行a无异常提示
python
>>> import tensorflow as tf
>>> hello = tf.constant("Hello Tansorflow")
>>> sess = tf.Session()
>>> sess.run(hello)
>>> exit()

```

6. 交互式开发环境验证 tensorflow

```shell

a.安装 jupyter
pip install jupyter

b.生成 ipykernel
python -m ipykernel install --user --name=tensorflow

c.查看 ipykernel
jupyter kernelspec list

d.打开 jupyter
jupyter notbook

```

7. 容器环境验证 tensorflow (忽略 docker 环境安装)

```shell
a.下载 tensorflow 镜像
docker pull tensorflow/tensorflow:nightly-jupyter

b.启动交互式 tensorflow 容器
docker run -it --rm -p 8888:8888 -v $PWD:/tf/notebooks tensorflow/tensorflow:nightly-jupyter

```
### 4.Share:

高频dom操作和页面性能优化探索
https://feclub.cn/post/content/dom
重定向 CORS 跨域请求
https://harttle.land/2016/12/30/cors-redirect.html
CORS 跨域发送 Cookie
https://harttle.land/2016/12/28/cors-with-cookie.html
自定义编程语言的实现
https://www.jianshu.com/p/6a2f4ae4e099