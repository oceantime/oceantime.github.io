---
title: ARTS-week-45
date: 2020-11-15 16:51:13
tags:
---


## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm： 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

1122. 数组的相对排序 https://leetcode-cn.com/submissions/detail/123602434/

### 2.Review:

https://towardsdatascience.com/trying-out-dask-dataframes-in-python-for-fast-data-analysis-in-parallel-aa960c18a915
如何在 Python 中使用 Dask Dataframes 加速并行数据分析 

#### 点评：

作者：Luciano Strika 
当使用 Python 的 Pandas 打开了一个几百万行的数据集，尝试获取一些指标，可能要等一整分钟才能获得一系列简单的平均值，而当如果达到数十亿时，无法进行分析。Dask 是一个开源项目，可为解决这个问题。 Dask 提供有关 NumPy 数组，Pandas 数据帧和常规​​列表的抽象，从而允许使用多核处理并行运行它们。

Dask 官方文档中介绍的特性：
- 处理大型数据集，即使这些数据集不适合存储在内存中
- 通过使用多个内核来加速长计算
- 使用标准的 Pandas 操作（例如 groupby，join 和时间序列计算）在大型数据集上进行分布式计算

使用 Dask Dataframes 时确实非常快的一些场景：
- 算术运算（乘或加到系列中）
- 常见的汇总（平均值，最小值，最大值，总和等）
- 调用 apply（只要它沿着索引-即不在 "y" 不是索引的 groupby（'y'）之后）
- 调用 value_counts（），drop_duplicates（）或 corr（）
- 使用 loc，isin 和按行选择进行过滤

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

1. pipenv 虚拟环境
```python
1、安装
   -> pip3 install pipenv    (pip3安装的会指向Python3)
2、新建一个项目文件：letgo
3、进入文件夹：cd letgo
4、指定虚拟环境使用哪个版本的python
   -> pipenv --three 会使用当前系统的Python3创建环境
5、换成国内镜像，被墙网速慢
   -> 编辑文件letgo/Pipfile
   -> 将 url = "https://pypi.org/simple" 替换成国内镜像 
      url = "https://pypi.tuna.tsinghua.edu.cn/simple/"
6、激活虚拟环境
   -> pipenv shell (进入虚拟环境)
      (新建的虚拟环境存放在/root/.local/share/virtualenvs/下，想要删除这个环境，直接删除这个文件夹)
7、pipenv install django==1.11 安装固定版本模块，并加入到 Pipfile 
8、当项目放到阿里云上时，直接运行：pipenv install 就能自动生成一份和本地环境，一模一样的环境
9、常用命令：
   pipenv graph                  查看目前安装的库及其依赖
 
   pipenv uninstall --all        卸载全部包并从Pipfile中移除
   pipenv uninstall django==1.11 卸载指定包并从Pipfile中移除
   
   pipenv update requests        # 更新指定个包
   pipenv update                 # 更新所有的包
  
   pipenv shell  # 进入环境
   exit  # 退出环境
   pipenv --rm   # 删除虚拟环境
```

2. Linux 系统安装、卸载 Anaconda 要点

```shell
1.在 Anaconda 官网 https://repo.anaconda.com/archive/ 内下载需要的版本；

2.bash 下载好的文件

3.配置和验证安装是否成功：
# 将anaconda的bin目录加入PATH，根据版本不同，也可能是~/anaconda3/bin
$ echo 'export PATH="~/anaconda3/bin:$PATH"' >> ~/.bashrc
# 更新bashrc以立即生效
$ source ~/.bashrc
$ conda --version

4.其他拓展：
列出安装的包：
$ conda list
更新包：
$ conda update conda

5.卸载 Anaconda
$ rm-rf ~/anaconda
$ vim ~/.bashrc
注释
# export PATH=~/anaconda3/bin:$PATH
$ source ~/.bashrc
```

3.Conda 安装本地 package：

```shell
# --use-local 后面最好写绝对路径，或者进入到 Anaconda 的 pkgs 目录下再执行上述语句。
$ conda install --use-local your-pkg-name
```

4.解决 conda 的 "Solving environment: failed" 问题

```shell
$ conda config --set channel_priority flexible
```

5.Conda Python 版本转换：
```shell
安装其他版本的 python，通过定义 python=x 自选版本，名字可自定义，这里叫 python37
$ conda create -n python37 python=3.7

查看当前的 python 编辑器，带*号的当前使用版本，后面是当前版本使用的环境变量
$ conda info -e
# conda environments:
#
base                  *  /home/python/anaconda3
python37                 /home/python/anaconda3/envs/python37

版本切换
$ conda activate python37     #激活版本，conda activate + 编辑器名字
$ python -V                   #前面会带有版本注释    
Python 3.7.16 :: Anaconda, Inc.
$ conda deactivate python37    #退出当前版本

开机既指定版本为当前使用版本，可直接在环境变量文件中激活
$ vim ~/.bashrc    #添加所需激活的版本
conda activate python37
$ source ~/.bashrc

删除 python 版本：conda remove -n 编辑器名字 --all
$ conda remove -n python37 --all
```

6.ipython 是增强的 Python Shell，自动补全、自动缩进、支持 shell，增加了很多函数。
```python
$ ipython
Python 3.6.5 |Anaconda, Inc.| (default, Apr 29 2018, 16:14:56)
Type 'copyright', 'credits' or 'license' for more information
IPython 6.4.0 -- An enhanced Interactive Python. Type '?' for help.
 
In [1]: print("Hello World!")
Hello World!
 
In [2]: quit
```

7.jupyter 是基于 web 的交互式笔记本，其中可以非常方便的使用 python，后台使用的是 ipython。

```python
#生成jupyter notebook启动参数文件并修改参数
$ jupyter notebook --generate-config
#添加jupyter登录密码，执行如下指令输入密码，并在用户如下目录生成json的密码文件
$ jupyter notebook password              
$ cat .jupyter/jupyter_notebook_config.json 
{
  "NotebookApp": {
  "password": "sha1:XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
}
#文件jupyter_notebook_config.py添加如下参数，后保存
$ vim .jupyter/jupyter_notebook_config.py
c.NotebookApp.ip = '*'  #外部IP地址客户端可以访问
c.NotebookApp.notebook_dir = '/jupyter_nb_demo'  #本地notebook访问的目录
c.NotebookApp.open_browser = False   #jupyter notebook启用时不再本地默认打开浏览器
c.NotebookApp.port = 9999            #默认访问的端口是9999
#直接启动notebook后台服务，并输出运行日志，之后就可以远程访问这个服务了
$ jupyter notebook >.jupyter/jupyter_notebook.log 2>&1 &
[1] 10395
#后面可以使用如下指令查看运行日志
$ tail -f .jupyter/jupyter_notebook.log

#指定本机ip与自定义运行端口 
$ jupyter notebook --ip=0.0.0.0 --port=8888
```
8.Jupyter Notebook 中添加 conda 虚拟环境

```python
#安装 ipykernel
conda activate 环境名称
conda install ipykernel
#写入 Jupyter 的 kernel
python -m ipykernel install --user --name 环境名称 --display-name "Python (环境名称)"
#切换 kernel  Kernel->Change kernel->选择环境
jupyter notebook
#删除 kernel 环境
jupyter kernelspec remove 环境名称
```

### 4.Share:

http://www.dataguru.cn/article-15038-1.html
比Spark快100倍的GPU加速SQL引擎！BlazingSQL开源了

https://blog.csdn.net/houzhe_adore/article/details/51315036?spm=a2c6h.12873639.0.0.5e7f5f45kFQGxy
Logstash吞吐量性能优化

https://www.jianshu.com/p/763aa1102a98
Hadoop 2.7.3之后到最新的Hadoop3.2.0的主要新特性

https://blog.csdn.net/weixin_41133061/article/details/89647202
Python虚拟环境和包管理工具Pipenv的使用详解

https://blog.csdn.net/yuejisuo1948/article/details/81043823
anaconda python 版本对应关系

https://zhuanlan.zhihu.com/p/67959768
利器|JupyterLab 数据分析必备IDE完全指南