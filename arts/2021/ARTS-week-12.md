---
title: ARTS-week-12
date: 2021-04-05 22:10:10
tags:
---


## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm： 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

103. 二叉树的锯齿形层序遍历 https://leetcode-cn.com/problems/binary-tree-zigzag-level-order-traversal/
107. 二叉树的层序遍历 II https://leetcode-cn.com/problems/binary-tree-level-order-traversal-ii/
199. 二叉树的右视图 https://leetcode-cn.com/problems/binary-tree-right-side-view/

### 2.Review:

https://medium.com/m/global-identity?redirectUrl=https%3A%2F%2Ftowardsdatascience.com%2Fclustering-on-mixed-type-data-8bbd0a2569c3
基于R语言对数据进行聚类
          

#### 点评：

作者 Daniel P. Martin
- 现实的商业情境常常不同于这些理想化的用例，而且需要分析由混合型数据组成的数据集，其中数值型（两个值的差是有意义的）和定类型（表示类别，且无顺序）或者是定序型（表示类别，且有顺序）数据特征共存。

- 第一部分方法论：我会探讨使用数学概念上的距离来测量个体相似度的问题。随后介绍了PAM聚类算法（Partitioning Around Medoids）和一种选择最优聚类数的方法——轮廓系数（silhouette coefficient）。最后我将会以简短的解释和说明收尾。
- 第二部分用了一个可在UCI机器学习库中下载的银行营销数据，和一些有用的，在cluster和Rtsne库上的函数。这个数据集是一家葡萄牙银行机构开展的营销活动（电话营销）有关，并且通常用在监督学习的讨论中。（分类的目标是预测是否客户是否会认购一份定期存款）。不过，这份数据包含了一些关于银行客户的，这也是我们将会尝试用来聚类的“先验知识”。

结论：
  本文是我在尝试对混合类型的无监督数据集执行聚类练习时的想法的概述。我认为它可以为其他数据科学家增加价值，所以在这共享。然而我仍面临一些挑战：
- 如何处理海量数据集(cf内存强度)?
- 一种热编码可能是一种解决方案；这两种方法的优缺点是什么?

### 3.Tip:

#### java8 中 lambda 的用法

```java
//1.以某个属性分组
Map<String,List<User>> map = userList.stream().collect(Collectors.groupingBy(User::getName));
//2.获取集合中的某个属性转为集合
pictureList.stream().map(Picture::getSrc).collect(Collectors.toList());
//3.根据集合中的某个属性进行升序重排
roomList.stream().sorted(Comparator.comparing(Room::getAvgPrice)).collect(Collectors.toList());
//4.根据集合中的某个属性进行降序重排
roomList.stream().sorted(Comparator.comparing(Room::getAvgPrice).reversed()).collect(Collectors.toList());
//5.集合中的属性去重
rpTags.stream().distinct().collect(Collectors.toList());
//6.根据集合中的某个属性过滤并获取第一个
benefitList.stream().filter(benefit -> benefit.getId() == 1 || benefit.getId() == 20 || benefit.getId() == 26 || benefit.getId() == 89) .findFirst().orElse(null);
//7.根据集合中的属性转换为键值对Map
getModule().stream().collect(Collectors.toMap(RateplanDO::getRateplanCode, rateplanDO -> rateplanDO));
//8.获取集合中某个最大值的int数据
partnerCityHotelDOList.stream().mapToInt(PartnerCityHotelDO::getId).max().orElse(-1);
//9.提取集合中对象的某个属性转化List
partnerCityHotelDOList.stream().map(PartnerCityHotelDO::getId).collect(Collectors.toList());
```

#### Linux 命令行，循环执行 shell 命令

```shell
方法一：死循环
while true ;do <command>; done;

方法二：普通计数循环
mycount=0; while (( $mycount < 10 )); do  <command>;((mycount=$mycount+1)); done;
```


### 4.Share:

https://www.yuque.com/zhqy/datastructure/airzl1
通过数组创建二叉树

https://stackoverflow.com/questions/4965335/how-to-print-binary-tree-diagram
如何在控制台打印二叉树图

https://www.bookstack.cn/read/go42/74361
《Go语言四十二章经》第十章 string

https://www.cnblogs.com/httpssl/p/11003949.html
Linux - 常见端口和服务的对照和解释

https://blog.csdn.net/fantasy10o10o/article/details/83563473
WINDOWS 常用端口列表

http://leriou.github.io/2019-01-09-mongodb-compareto-elasticsearch
MongoDB 和 Elasticsearch 的对比
