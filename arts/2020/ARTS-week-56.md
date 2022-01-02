---
title: ARTS-week-56
date: 2020-10-08 21:43:13
tags:
---


## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm： 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

设计循环队列 https://leetcode-cn.com/submissions/detail/113969351/

### 2.Review:

http://minervadb.com/index.php/2019/12/25/how-to-use-proxysql-to-work-on-clickhouse-like-mysql/
如何通过 ProxySQL 在 clickhouse 实现类似 mysql 查询

#### 点评：

介绍
1.安装
2.成功完成安装后，启动 ProxySQL 
3.创建 ClickHouse 用户
4.从MySQL客户端连接到ClickHouse 
5.查询ClickHouse之类的MySQL
6.局限性

结论：ProxySQL 2.0.8版的新功能和增强功能
- 将默认的max_allowed_pa​​cket从4M更改为64M
- 添加了对mysqldump 8.0和Admin ＃2340的支持
- 添加了新变量mysql-aurora_max_lag_ms_only_read_from_replicas：如果使用了max_lag_ms且writer在读取器主机组中，则如果至少N个副本是最佳候选者，则将排除该writer。
- 添加了对未知字符集和排序规则ID大于255的支持＃1273
- 添加了新变量mysql-log_unhealthy_connections以禁止关闭与不健康的客户端连接有关的消息
- 使用khash重新实现rules_fast_routing
- 添加了对SET CHARACTER SET  ＃1692的支持
- 在多个Galera群集中添加了对同一节点的支持＃2290
- 为错误2019添加了更多详细输出（无法初始化字符集）＃2273
- 为mysql_replication_hostgroups.check_type ＃2186添加了更多可能的值 
- 只读 innodb_read_only
- read_only和innodb_read_only
- 添加了对RHEL / CentOS 8的支持和软件包

### 3.Tip:

Linux下 / 和 ~ 的区别

1. / 是根目录，~ 是 home 目录。 Linux存储是以挂载的方式，相当于是树状的，源头就是 /，也就是根目录。而每个用户都有 home 目录，也就是用户的个人目录，比如 root 用户的 home 目录就是 /root

```shell
[root@iZj6cidck6s26tnpwx4ymoZ ~]# cd /
[root@iZj6cidck6s26tnpwx4ymoZ /]# ll
total 4194388
lrwxrwxrwx.   1 root root          7 Jul 11  2019 bin -> usr/bin
dr-xr-xr-x.   5 root root       4096 Aug 13 22:06 boot
drwxr-xr-x   19 root root       2960 Aug 21 06:47 dev
drwxr-xr-x.  92 root root       4096 Aug 27 10:18 etc
drwxr-xr-x.   2 root root       4096 Apr 11  2018 home
lrwxrwxrwx.   1 root root          7 Jul 11  2019 lib -> usr/lib
lrwxrwxrwx.   1 root root          9 Jul 11  2019 lib64 -> usr/lib64
drwx------.   2 root root      16384 Jul 11  2019 lost+found
drwxr-xr-x.   2 root root       4096 Apr 11  2018 media
drwxr-xr-x.   2 root root       4096 Apr 11  2018 mnt
drwxr-xr-x.   2 root root       4096 Apr 11  2018 opt
dr-xr-xr-x  111 root root          0 Aug 21 06:47 proc
dr-xr-x---.  17 root root       4096 Sep 21 18:15 root
drwxr-xr-x   26 root root        760 Sep 28 23:36 run
lrwxrwxrwx.   1 root root          8 Jul 11  2019 sbin -> usr/sbin
drwxr-xr-x.   2 root root       4096 Apr 11  2018 srv
-rw-------    1 root root 4294967296 Aug 27 10:17 swapfile
dr-xr-xr-x   13 root root          0 Aug 21 14:47 sys
drwxrwxrwt.   8 root root      20480 Oct 11 03:36 tmp
drwxr-xr-x.  13 root root       4096 Jul 11  2019 usr
drwxr-xr-x.  19 root root       4096 Jul 11  2019 var
[root@iZj6cidck6s26tnpwx4ymoZ /]# cd root
[root@iZj6cidck6s26tnpwx4ymoZ ~]#

```

2. 用户创建完后，我们就可以在 /home 目录下看到，就是系统默认创建的该用户的 /home 目录。

```shell
[root@iZj6cidck6s26tnpwx4ymoZ ~]# cd /
[root@iZj6cidck6s26tnpwx4ymoZ /]# cd home
[root@iZj6cidck6s26tnpwx4ymoZ home]# ll
total 1
drwx------.  19 root root       4096 Jul 11  2019 a
[root@iZj6cidck6s26tnpwx4ymoZ home]#
```

3. /home/a 就是切到 a 用户后的家目录 ~

```shell
[root@iZj6cidck6s26tnpwx4ymoZ home]# ll
total 1
drwx------.  19 root root       4096 Jul 11  2019 a
[root@iZj6cidck6s26tnpwx4ymoZ home]# su - a
[a@iZj6cidck6s26tnpwx4ymoZ ~]# 
```

### 4.Share:

https://www.jianshu.com/p/71564cff134e?utm_campaign=maleskine&utm_content=note&utm_medium=seo_notes&utm_source=recommendation
深度解析 | 基于DAG的分布式任务调度平台：Maat