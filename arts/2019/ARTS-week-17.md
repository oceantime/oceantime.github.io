---
title: ARTS-week-17
date: 2019-12-22 12:14:22
tags:
---

## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm： 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

Valid Palindrome https://leetcode.com/submissions/detail/287704292/

### 2.Review:

https://markhneedham.com/blog/2008/09/15/clean-code-book-review/

#### 点评：
文章作者谈到学习了《Principles, Patterns and Practices in C#》，其中讨论到关于书中作者推荐“Clean Code”的思想。关于“Clean Code”，描述了让代码像报纸文章一样阅读的想法，把重要的步骤放在头部。在进一步阅读越来越多的细节之前，我们应该能够大致了解它是如何运行的，细节步伐通过进一步将代码分解成许多小方法来实现。作者描述这时编写好代码的最好的书，建议在阅读敏捷原则、模式和实践之前先阅读这本书。最突出的关键思想是保持代码的简洁和表达能力——代码应该做你希望它做的事情，这样当你（或其他人）回来阅读时，就可以快速轻松地完成这项工作。同时最后三章案例给出了代码，确定了问题所在，提出了解决方案（并引用了它的名称），然后详细介绍了实现过程。

### 3.Tip:

Docker 常用操作

``` Shell
# 删除 null 镜像
sudo docker rmi $(docker image -f "dangling=true" -q)

# 删除所有镜像
# 删除容器
docker stop $(docker ps -qa)
docker rm $(docker ps -qa)
# 删除镜像
docker rmi --force $(docker images -q)

# 删除名称中包含某个字符串的镜像
docker rmi --force $(docker images | grep some | awk '{print $3}')

# 进入容器命令
docker exec -it 容器ID bash

# 镜像导出
docker save -o ./imagename.tar imagename:tag

# 镜像导入
docker load --input ./imagename.tar
```

### 4.Share:

kafka-manager部署安装
https://www.jianshu.com/p/cb412d587a21
