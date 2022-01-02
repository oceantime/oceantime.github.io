---
title: ARTS-week-66
date: 2020-12-13 13:31:28
tags:
---


## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm： 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

804. 唯一摩尔斯密码词 https://leetcode-cn.com/submissions/detail/130699876/

### 2.Review:

https://www.oreilly.com/content/big-fast-easy-data-with-ksql/
使用 KSQL 进行快速，便捷的大数据分析

#### 点评：

作者：Michael Noll 查看适用于 Apache Kafka 的新流式 SQL 引擎。可以实时检测异常和欺诈活动，监视基础架构和 IoT 设备，对用户活动进行基于会话的分析，执行实时 ETL 等。

主要优势：
- 无需编写大量编程代码，开始进行流处理所需的只是一个简单的 SQL 语句
- KSQL 是开源的（获得 Apache 2.0 许可），并建立在 Kafka 的 Streams API 之上
- 支持各种强大的流处理操作，包括过滤，转换，聚合，联接，窗口和会话化

KSQL 可以用于什么场景：
- 实时监控和实时分析
- 在线数据整合与充实
- 安全和异常检测

### 3.Tip:

1. Check os version in linux
```shell
cat /etc/os-release
lsb_release -a
hostnamectl
uname -r
```

2. mysql 导入导出数据中文乱码解决方法

```shell
mysqldump -u root -p --default-character-set=utf-8 dbname tablename > bak.sql
mysqldump -u root -p --default-character-set=utf-8 dbname tablename < bak.sql
```

3. yum 将安装包及依赖包下载到本地

```shell
# Downloadonly
yum install yum-plugin-downloadonly
yum install --downloadonly --downloaddir=/root/packages vim

# Yumdownloader
yum install yum-utils
yumdownloader --resolve --destdir=/root/package vim

# reposync
yum install reposync
reposync -r vim -p /root/package
```

4. InetAddress.getLocalHost().getHostAddress() 获取的 ip 为 127.0.0.1

```shell
# 检查主机名
hostname

# 主机名设置
vim /etc/sysconfig/network
HOSTNAME=myhost # 修改 HOSTNAME 为设定的主机名

# 修改 hosts
vim /etc/hosts
192.168.10.1 myhost # 本地 ip 对于新的主机名

# 重启
rebot

```

5. Java 获取 src 下包的文件路径

```shell
String path = getClass().getClassLoader().getResource("filename.text").getPath();
```

### 4.Share:

https://www.datalearner.com/blog/1051585624649623
Dask调度器简介

https://www.cnblogs.com/crazycode2/p/11154786.html
CentOS 7离线安装MySQL 5.7

https://blog.51cto.com/frankch/1876716
Linux中查看和设置MySQL数据库字符集

https://blog.csdn.net/eric_wii/article/details/86300450
Linux下卸载MySQL8.0版本

https://blog.csdn.net/cjfeii/article/details/48494089
MySql 启动报错:The server quit without updating PID file 如何解决

https://zhuanlan.zhihu.com/p/137574234?utm_source=wechat_session
带你走进神一样的Elasticsearch索引机制

https://blog.csdn.net/hanniel/article/details/94294155
Pipenv使用入门

https://blog.csdn.net/xzm5708796/article/details/89357434
ansible离线安装操作手册（含所有安装包内容）

https://www.cnblogs.com/kevingrace/archive/2004/01/13/5569648.html
Ansible-playbook 运维笔记

https://www.cnblogs.com/eoalfj/p/12332808.html
Java 命令行 编译、执行、打包