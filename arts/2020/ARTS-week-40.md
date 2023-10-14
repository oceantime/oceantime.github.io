---
title: ARTS-week-40
date: 2020-10-11 17:43:13
tags:
---


## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm: 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

计算器 https://leetcode-cn.com/submissions/detail/114925301/

### 2.Review:

https://blog.insightdatascience.com/scheduling-spark-jobs-with-airflow-4c66f3144660
使用 Airflow 调度 Spark 任务

#### 点评：

作者 Nicholas Leong 这篇文章提供了如何使用 Airflow 调度通过从 S3 下载 Reddit 数据触发 Spark 任务。

- 安装 Airflow 要使用pip安装
- 创建 Airflow DAG 的脚本
- 运行教程的 Airflow 检查项
- 有趣的测试：打开和关闭 WiFi 为了测试 Airflow 在失败时会重试任务
- 先决条件：本地安装 Spark

结束语：
作者给出了一个创建 DAG 的示例，该DAG包含三个任务：
  （1）从 S3 下载 Reddit 数据
  （2）Spark 中的唯一作者数以及
  （3）计算平均投票数。任务（2）和（3）彼此独立，并且都取决于任务（1）的完成。
实例创建的DAG比较简单。实际上，生产环境的 Airflow DAG 可能具有数十个具有复杂依赖性的节点，并且将按小时或每天运行。

### 3.Tip:

1.云服务器就只有 1G 内存, make 出现 OOM 编译进程被 killed, 解决办法：

```shell
// 使用 swap 需要开启一下，默认是关闭的。使用交换文件来做交换分区。
// 先创建交换文件
fallocate -l 4G /swapfile
// or 
dd if=/dev/zero of=/swapfile bs=1M count=4096
// 修改权限
chmod 600 /swapfile
// 格式化文件
mkswap /swapfile
//激活
swapon /swapfile
// 有需要的也可以设开机自启动
// 打开 /etc/fstab，加上
vim /etc/fstab
/swapfile    none    swap    defaults     0 0
// 查看 swap 
[root@iZj6cidck6s26tnpwx4ymoZ ~]# free
              total        used        free      shared  buff/cache   available
Mem:        1881952       82192      129584         240     1670176     1628592
Swap:       4194300       43784     4150516
```

2.Linux 下设置 swappiness 参数来配置内存使用到多少才开始使用swap分区

swappiness的值的大小对如何使用swap分区是有着很大的联系的。swappiness=0的时候表示最大限度使用物理内存，然后才是swap空间，swappiness＝100的时候表示积极的使用swap分区，并且把内存上的数据及时的搬运到swap空间里面。linux的基本默认设置为60，具体如下：

```shell
cat /proc/sys/vm/swappiness
#60
```

也就是说，的内存在使用到100-60=40%的时候，就开始出现有交换分区的使用。大家知道，内存的速度会比磁盘快很多，这样子会加大系统IO，同时造的成大量页的换进换出，严重影响系统的性能，所以我们在操作系统层面，要尽可能使用内存，对该参数进行调整。临时调整的方法如下，我们调成10：

```shell
sysctl vm.swappiness=10
#vm.swappiness=10
cat /proc/sys/vm/swappiness
#10
```

这只是临时调整的方法，重启后会回到默认设置的.要想永久调整的话，需要在/etc/sysctl.conf修改，加上：

```shell
sudo vim /etc/sysctl.conf
// 加上
# Controls the maximum number of shared memory segments, in pages
kernel.shmall = 4294967296 #这一个可以不用设置
vm.swappiness = 10
// 生效
sudo sysctl -p
```

### 4.Share:

https://www.cnblogs.com/zhangfengshi/p/12736921.html
分布式定时任务调度系统技术解决方案(xxl-job、Elastic-job、Saturn)