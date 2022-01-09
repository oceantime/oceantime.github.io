---
title: ARTS-week-48
date: 2020-12-6 17:21:28
tags:
---


## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm： 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

1011. 在 D 天内送达包裹的能力 https://leetcode-cn.com/submissions/detail/129017043/
875. 爱吃香蕉的珂珂 https://leetcode-cn.com/submissions/detail/128962576/

### 2.Review:

https://www.omnisci.com/blog/fast-and-flexible-query-analysis-at-mapd-with-apache-calcite-2
使用 Apache Calcite 在 MapD 上进行快速灵活的查询分析

#### 点评：

作者：MapD Core 数据库中使用SQL解析器。在评估了其他一些选择之后，决定使用Apache Calcite（当时是一个孵化阶段的项目）。它使用高度可配置的基于成本的优化器进行SQL查询并生成扩展的关系代数。一些项目已经将Calcite用于SQL解析和查询优化。

主要优势：
- 其高度模块化的结构，该结构允许多个集成点和创新用途。它提供了一个关系代数生成器，使转换到其他SQL解析器变得可行。
- 包括一个功能强大且灵活的基于成本的优化器，该优化器可以基于查询模式和统计信息对关系代数进行高级转换。
- 一个功能强大且灵活的基于成本的优化器，该优化器可以基于查询模式和统计信息对关系代数进行高级转换。

总结：
关于性能，Apache Calcite 需要几毫秒的时间来解析并将 SQL 从 SQL 转换为序列化关系代数，而 JNI 编组则完全可以忽略。集成 Calcite  能够快速获得基本的子查询和外部联接。不断扩大可以执行的SQL查询的范围。像往常一样，真正的挑战是认识到实用的模式并发现执行它们的快速方法。Calcite 支持的各种查询能够提前计划，因为在执行方面进行任何工作之前，可以看到关系代数。

### 3.Tip:

1. vi/vim 中可以使用 :s 命令来替换字符串
```shell
1.:s/vivian/sky/ 替换当前行第一个 vivian 为 sky
:s/vivian/sky/g 替换当前行所有 vivian 为 sky

2. :n,$s/vivian/sky/ 替换第 n 行开始到最后一行中每一行的第一个 vivian 为 sky
:n,$s/vivian/sky/g 替换第 n 行开始到最后一行中每一行所有 vivian 为 sky
(n 为数字，若 n 为 .，表示从当前行开始到最后一行)

3. :%s/vivian/sky/(等同于 :g/vivian/s//sky/) 替换每一行的第一个 vivian 为 sky
:%s/vivian/sky/g(等同于 :g/vivian/s//sky/g) 替换每一行中所有 vivian 为 sky

4. 可以使用 # 作为分隔符，此时中间出现的 / 不会作为分隔符
:s#vivian/#sky/# 替换当前行第一个 vivian/ 为 sky/


1. 全局替换
(1) v + G + $ 选定全部，然后输入 :s/原始字符串/目标字符串/
(2) :%s/原始字符串/目标字符串/

2. 清除页面中所有行尾的空白符：
:%s//s/+$//

3. 清除所有空白
:%s//(/s*/n/)/+//r/

4. 去掉所有的//注释
:%s!/s*//.*!!

5. 去掉所有的/* */注释
:%s!/s*//*/_./{-}/*//s*! !

7. 增加注释（一个操作应用在多行）
比如需要增加#或者是//这种注释：
Ctrl + v 定位到开始行，然后选定需要的行，然后执行 I 命令，然后输入 # 或 //，然后按 Esc键两次，即可把注释操作应用到所有选定的行，记住选定不能使用v指令，而应该使用Ctrl + v （清除注释请参考上面的方法）(v是按行选定，Ctrl + v 是按照列选定)

8. 对齐行
v 选定需要整齐的行，输入 = 进行归整

9. 打开多窗口
在vim中使用 :sp 文件名 打开行窗口（横），使用 :vsp 文件名 打开列窗口（竖），使用 :q 关闭当前窗口，使用 :qa 关闭所有窗口，使用 Ctrl + w 在各个窗口中进行切换。
最大化窗口：Ctrl + w 激活某个窗口，然后 Shitf + - 进行最大化
改变窗口到指定行高度：Ctrl + w 激活窗口，10（需要变成的行大小数字），Shift + -，执行改变
增加若干行高度：Ctrl + w 激活窗口，10（需要增加的行大小数字），Shift + +，执行改变

10. 字符串/变量提示
在输入内容状态，按 Ctrl + P 则显示所有本页中定义的字符串，如果输入字符串部分内容，然后按 Ctrl + p 则把所有你输入字符串开头的内容显示出来。在输入状态下按 Ctrl + x 能过查看所有有效的其他方式
删除操作

:%s/r//g 删除DOS方式的回车^M
:%s= *$== 删除行尾空白

:%s/^(.*)n1/1$/ 删除重复行

:%s/^.{-}pdf/new.pdf/ 只是删除第一个pdf

:%s/<!--_.{-}-->// 又是删除多行注释（咦？为什么要说「又」呢？）

:g/s*^$/d 删除所有空行 ：这个好用有没有人用过还有其他的方法吗？
:g!/^dd/d 删除不含字符串'dd'的行
:v/^dd/d 同上 （译释：v == g!，就是不匹配！）

:g/str1/,/str2/d 删除所有第一个含str1到第一个含str2之间的行


:v/./.,/./-1join 压缩空行
:g/^$/,/./-j 压缩空行

ndw 或 ndW 删除光标处开始及其后的 n-1 个字符。
d0 删至行首。
d$ 删至行尾。
ndd 删除当前行及其后 n-1 行。
x 或 X 删除一个字符。
Ctrl+u 删除输入方式下所输入的文本。
^R 恢复u的操作
J 把下一行合并到当前行尾
V 选择一行
^V 按下^V后即可进行矩形的选择了
aw 选择单词
iw 内部单词(无空格)
as 选择句子
is 选择句子(无空格)
ap 选择段落
ip 选择段落(无空格)
D 删除到行尾
x,y 删除与复制包含高亮区

dl 删除当前字符（与x命令功能相同）
d0 删除到某一行的开始位置
d^ 删除到某一行的第一个字符位置（不包括空格或TAB字符）
dw 删除到某个单词的结尾位置
d3w 删除到第三个单词的结尾位置
db 删除到某个单词的开始位置
dW 删除到某个以空格作为分隔符的单词的结尾位置
dB 删除到某个以空格作为分隔符的单词的开始位置
d7B 删除到前面7个以空格作为分隔符的单词的开始位置
d） 删除到某个语句的结尾位置
d4） 删除到第四个语句的结尾位置
d（ 删除到某个语句的开始位置
d） 删除到某个段落的结尾位置
d{ 删除到某个段落的开始位置
d7{ 删除到当前段落起始位置之前的第7个段落位置
dd 删除当前行
d/text 删除从文本中出现“text”中所指定字样的位置，
一直向前直到下一个该字样所出现的位置（但不包括该字样）之间的内容
dfc 删除从文本中出现字符“c”的位置，一直向前直到下一个该字符所出现的位置（包括该字符）之间的内容
dtc 删除当前行直到下一个字符“c”所出现位置之间的内容
D 删除到某一行的结尾
d$ 删除到某一行的结尾
5dd 删除从当前行所开始的5行内容
dL 删除直到屏幕上最后一行的内容
dH 删除直到屏幕上第一行的内容
dG 删除直到工作缓存区结尾的内容
d1G 删除直到工作缓存区开始的内容
今天用了
4. 去掉所有的//注释
:%s!/s*//.*!!

5. 去掉所有的/* */注释
:%s!/s*//*/_./{-}/*//s*! !

:1,$ /^M//
```

2. maven 编译异常：编码GBK的不可映射字符

```xml
<properties>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <maven.compiler.encoding>UTF-8</maven.compiler.encoding>
</properties>
```

3. maven 安装 jar 文件到本地仓库

```shell
org.jenkins-ci:task-reactor:jar:1.5
mvn install:install-file -Dfile=D:/task-reactor-1.5.jar -DgroupId=org.jenkins-ci -DartifactId=task-reactor -Dversion=1.5 -Dpackaging=jar

ibator-1.2.1.681.jar
mvn install:install-file -Dfile=D:/ibator-1.2.1.681.jar -DgroupId=org.apache.ibatis -DartifactId=ibator -Dversion=1.2.1.681 -Dpackaging=jar
```

4. tar 分卷压缩与解压缩

```shell
# 分卷压缩gz
# tar zcf - 2017.log |split -d -b 100m - logs.tar.gz.
# 生成文件： logs.tar.gz.00 logs.tar.gz.01
# 分卷压缩bz2
# tar jcf - 2017.log |split -d -b 100m - logs.tar.bz2.
# 生成文件： logs.tar.bz2.00 logs.tar.bz2.01

# 解压gz分卷
# cat logs.tar.gz* | tar zx
# 解压bz2分卷
# cat logs.tar.gz* | tar jx
```

5. pip 镜像使用

```shell
升级 pip >=10.0.0 后配置：
全局配置
pip install pip -U
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
单次安装包使用
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple pip -U
```

6. conda 安装本地包

```shell
wget https://conda.anaconda.org/pytorch/win-64/pytorch-1.2.0-py3.5_cuda100_cudnn7_1.tar.bz2
conda install --use-local pytorch-1.2.0-py3.5_cuda100_cudnn7_1.tar.bz2
```

7. python 安装本地包

```shell
pip install *.whl
python setup.py install  一般为 zip、tar.gz等压缩包，解压进入目录执行
```

8. conda 激活默认环境

```shell
# 激活环境
conda activate
# 退出环境
conda deactivate
```
### 4.Share:

https://zhuanlan.zhihu.com/p/72981916
利用python的dask搭建分布式集群

https://www.pythonf.cn/read/113814
Python的分布式计算框架——Dask调度器简介

https://blog.csdn.net/wudinaniya/article/details/98988345
ansible简介 及 CentOS7 安装ansible （rpm）及 安装ansible插件ansible-cmdb 实现cmdb功能

https://www.infoq.cn/article/0dVxZ4DwFPbLDBUWiriG
在阿里云容器服务中体验RAPIDS加速数据科学

https://www.jianshu.com/p/aeed2a56a3eb
Nginx 反向代理及 Cookie 相关问题

https://www.jianshu.com/p/022685baba7d
微服务部署：蓝绿部署、滚动部署、灰度发布、金丝雀发布
