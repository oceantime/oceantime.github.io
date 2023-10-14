---
title: ARTS-week-21
date: 2020-05-31 21:29:18
tags:
---


## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm: 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

Coin Change https://leetcode.com/submissions/detail/347140929/

### 2.Review:

https://dev.to/lydiahallie/javascript-visualized-scope-chain-13pd
JavaScript️可视化：作用域链

#### 点评：

Lydia Hallie 通过可视化例子讲解了作用域链的原理。

1.不同的执行上下文会分配不同的内存空间。 默认的全局上下文（浏览器中是 window，Node 中是 global），函数 getPersonInfo 在被调用时也会创建一个 本地上下文。每个执行上下文都有一个 作用域（链）。作用域（链）里面存储着执行上下文需要访问的变量。
2.作用域类型
本地作用域:访问变量时，JS 引擎会首先检查本地作用域链。  
全局作用域:JS 引擎会 顺着作用域链查找。作用域链一直找顶层 global object 位置。
块级作用域:除了全局作用域和本地作用域，还有一个是 块级作用域，当在花括号 { } 中用 let 或者 const 关键字定义变量时，就产生了块级作用域。

总结
1.可以将“作用域链”视为对 可在当前上下文中访问的值 的引用链。
2.作用域还可以重用变量名，只要不在同一个作用域中，变量名就可以重复。

### 3.Tip:

clickhouse 集群搭建

1.软件准备
- 依赖：
libtool-ltdl-2.4.2-22.e17_3.x86_64.rpm
libicu-50.1.2-15.e17.x86_64.rpm

- clickhouse：
clickhouse-common-static-19.16.14.65-1.e17.x86_64.rpm (按顺序必选)
clickhouse-server-common-19.16.14.65-1.e17.x86_64.rpm (按顺序必选)
clickhouse-server-19.16.14.65-1.e17.x86_64.rpm (按顺序必选)
clickhouse-client-19.16.14.65-1.e17.x86_64.rpm (按顺序必选)
clickhouse-debuginfo-19.16.14.65-1.e17.x86_64.rpm (可选)
clickhouse-test-19.16.14.65-1.e17.x86_64.rpm (可选)

``` shell

# rpm 安装
rpm -ivh libtool-ltdl-2.4.2-22.e17_3.x86_64.rpm
rpm -ivh libicu-50.1.2-15.e17.x86_64.rpm
rpm -ivh clickhouse-common-static-19.16.14.65-1.e17.x86_64.rpm
rpm -ivh clickhouse-server-common-19.16.14.65-1.e17.x86_64.rpm
rpm -ivh clickhouse-server-19.16.14.65-1.e17.x86_64.rpm
rpm -ivh clickhouse-client-19.16.14.65-1.e17.x86_64.rpm
# rpm 卸载(顺序相反)
rpm -e clickhouse-client-19.16.14.65-1.e17.x86_64
rpm -e clickhouse-server-19.16.14.65-1.e17.x86_64
rpm -e clickhouse-server-common-19.16.14.65-1.e17.x86_64
rpm -e clickhouse-common-static-19.16.14.65-1.e17.x86_64

```

2.配置

启动脚本文件： /etc/init.d/clickhouse-server
全局信息配置文件： /etc/clickhouse-server/config.xml
集群信息配置文件： /etc/clickhouse-server/metrika.xml
用户信息配置文件： /etc/clickhouse-server/users.xml
客户端配置： /etc/clickhouse-client
日志： /data/clickhouse/log
数据： /data/clickhouse

``` shell
[root@master ~]# sudo vim /etc/init.d/clickhouse-server
CLUCKHOUSE_USER=clickhouse(需要创建对应的用户组并授权)
CLICKHOUSE_DIR=/data/clickhouse
#CLICKHOUSE_LOGDIR=/var/log/clickhouse-server 
CLICKHOUSE_LOGDIR=${CLICKHOUSE_DIR}/log

[root@master ~]# sudo vim /etc/clickhouse-server/config.xml
#生效如下两个配置，其他不变
<interserver_http_host>ck_server_01</interserver_http_host> <!--填命令hostname -f返回的值-->
<listen_host>0.0.0.0</listen_host> <!--监听IP-->
<timezone>Asia/Shanghai</timezone> <!--设置时区-->
<include_from>/etc/clickhouse-server/metrica.xml</include_from> <!--添加该参数-->
<!--日志 修改路径-->
<logger>
	<level>error</level>
	<log>/data/clickhouse/log/clickhouse-server.log</log>
	<errorlog>/data/clickhouse/log/clickhouse-server-error.log</errorlog>
	<size>500M</size>
	<count>5</count>
</logger>
<path>/data/clickhouse/</path>
<tmp_path>/data/clickhouse/tmp/</tmp_path>
<user_files_path>/data/clickhouse/user_files/</user_files_path>
<format_schema_path>/data/clickhouse/format_schemas/</format_schema_path>

#创建用户组并授权目录
[root@master ~]# useradd clickhouse
[root@master ~]# passwd clickhouse
Changing password for user clickhouse.
New password: 
BAD PASSWORD: it does not contain enough DIFFERENT characters
BAD PASSWORD: is too simple
Retype new password: 
passwd: all authentication tokens updated successfully.
[root@master ~]# groupadd clickhouse
groupadd: group 'clickhouse' already exists
[root@master ~]# chown -R clickhouse:clickhouse /data/clickhouse


[root@master ~]# sudo vim /etc/clickhouse-server/metrika.xml
#添加如下配置
<yandex>
<!--ck集群节点-->
<clickhouse_remote_servers>
    <test_ck_cluster>
        <!--分片1-->
        <shard>
            <weight>1</weight>
            <replica>
                <internal_replication>false</internal_replication>
                <host>10.72.120.100</host>
                <port>9000</port>
                <user>default</user>
                <password>UHXQQmhb</password>
               <compression>true</compression>
            </replica>
            <replica>
                <internal_replication>false</internal_replication>
                <host>10.72.120.101</host>
                <port>9000</port>
                <user>default</user>
                <password>UHXQQmhb</password>
                <compression>true</compression>
            </replica>
        </shard>
        <!--分片2-->
        <shard>
            <weight>1</weight>
            <replica>
                <internal_replication>false</internal_replication>
                <host>10.72.120.102</host>
                <port>9000</port>
                <user>default</user>
                <password>UHXQQmhb</password>
                <compression>true</compression>
            </replica>
            <replica>
                <internal_replication>false</internal_replication>
                <host>10.72.120.103</host>
                <port>9000</port>
                <user>default</user>
                <password>UHXQQmhb</password>
                <compression>true</compression>
            </replica>
        </shard>
    </test_ck_cluster>
</clickhouse_remote_servers>

<!--zookeeper相关配置-->
<zookeeper-servers>
    <node index="1">
        <host>10.72.120.101</host>
        <port>2181</port>
    </node>
    <node index="2">
        <host>10.72.120.102</host>
        <port>2181</port>
    </node>
    <node index="3">
        <host>10.72.120.103</host>
        <port>2181</port>
    </node>
</zookeeper-servers>

<macros>
    <replica>hostname</replica> <!--当前节点主机名-->
</macros>

<networks>
    <ip>::/0</ip>
</networks>

<!--压缩相关配置-->
<clickhouse_compression>
    <case>
        <min_part_size>10000000000</min_part_size>
        <min_part_size_ratio>0.01</min_part_size_ratio>
        <method>lz4</method> <!--压缩算法lz4压缩比zstd快, 更占磁盘-->
    </case>
</clickhouse_compression>
</yandex>


[root@master ~]# sudo vim /etc/clickhouse-server/users.xml
#可以更改默认用户default的密码
<default>
    <!-- PASSWORD=$(base64 < /dev/urandom | head -c8); echo  "$PASSWORD"; echo -n  "$PASSWORD" | sha256sum | tr -d '-'   -->
    <!-- password UHXQQmhb -->
    <password_sha256_hex>65b84b497ef843f7c9629251a64e307caecbf7327975af4d18f83261239e1460</password_sha256_hex>
    <networks>
    <ip>::/0</ip>
    </networks>
    <profile>default</profile>
    <quota>default</quota>
</default>
```

3.服务启动

```shell
#通过命令方式启动初始化配置目录，如果直接使用服务方式启动会有可能失败
[root@master ~]# clickhouse-server --config-file=/etc/clickhouse-server/config.xml
#正常启动后结束进程
[root@master ~]# ps -ef | grep clickhouse | grep -v grep | awk '{print "kill -9" $2}' | sh
#服务方式启动
[root@master ~]# sudo service clickhouse-server start
#非服务方式后台托管服务启动
nohup clickhouse-server --config-file=/etc/clickhouse-server/config.xml > null 2 > & 1 &
#其他命令
[root@master ~]# sudo service clickhouse-server status
[root@master ~]# sudo service clickhouse-server restart
```

4.测试

```shell
clickhouse-client --help
#连接数据库
clickhouse-client -u default --password UHXQQmhb
select 1
show databases
show tables
#查看分片信息
select * from system.clusters;
#查看分区信息
select partition, name, active from system.parts where table = 'szt_data';
#查询zookeeper状态
select * from system.zookeeper where path='/clickhouse';
#批量导入数据方式
#1. 命令行客户端
cat file.csv | clickhouse-client --database=test --query="INSERT INTO test FORMAT CSV"; 
#2. http客户端
GET 'http://localhost:8123/?query=SELECT 1'
echo 'INSERT INTO t VALUES (1),(2),(3)' | POST 'http://localhost:8123/'
#3. 第三方客户端库
#
```

### 4.Share:

深入理解ClickHouse之5-ClickHouse集群的replica实现方式
http://liangfan.tech/2019/01/02/%E6%B7%B1%E5%85%A5%E7%90%86%E8%A7%A3ClickHouse%E4%B9%8B5-ClickHouse%E9%9B%86%E7%BE%A4%E7%9A%84replica%E5%AE%9E%E7%8E%B0%E6%96%B9%E5%BC%8F/
Clickhouse集群应用、分片、复制(分片性能对比)
https://www.jianshu.com/p/20639fdfdc99
ClickHouse表引擎到底怎么选
https://developer.aliyun.com/article/739801
ClickHouse学习系列之三【配置文件说明】
https://www.cnblogs.com/zhoujinyi/p/12627780.html
clickhouse + chproxy 集群搭建
https://www.jianshu.com/p/9498fedcfee7