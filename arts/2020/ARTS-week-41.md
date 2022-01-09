---
title: ARTS-week-41
date: 2020-10-18 17:43:13
tags:
---


## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm： 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

爬楼梯 https://leetcode-cn.com/submissions/detail/116047430/

### 2.Review:

https://plumbr.eu/outofmemoryerror/java-heap-space
Java heap space

#### 点评：

每个Java程序都只能使用一定量的内存, 这种限制是由JVM的启动参数决定的。而更复杂的情况在于, Java程序的内存分为两部分: 堆内存(Heap space)和 永久代(Permanent Generation, 简称 Permgen):这两个区域的最大内存大小, 由JVM启动参数 -Xmx 和 -XX:MaxPermSize 指定. 如果没有明确指定, 则根据平台类型(OS版本+ JVM版本)和物理内存的大小来确定。假如在创建新的对象时, 堆内存中的空间不足以存放新创建的对象, 就会引发java.lang.OutOfMemoryError: Java heap space 错误。不管机器上还没有空闲的物理内存, 只要堆内存使用量达到最大内存限制,就会抛出 java.lang.OutOfMemoryError: Java heap space 错误。


原因分析
产生 java.lang.OutOfMemoryError: Java heap space 错误的原因, 很多时候, 就类似于将 XXL 号的对象,往 S 号的 Java heap space 里面塞。其实清楚了原因, 就很容易解决对不对? 只要增加堆内存的大小, 程序就能正常运行. 另外还有一些比较复杂的情况, 主要是由代码问题导致的:
- 超出预期的访问量/数据量。 应用系统设计时,一般是有 “容量” 定义的, 部署这么多机器, 用来处理一定量的数据/业务。 如果访问量突然飙升, 超过预期的阈值, 类似于时间坐标系中针尖形状的图谱, 那么在峰值所在的时间段, 程序很可能就会卡死、并触发 java.lang.OutOfMemoryError: Java heap space 错误。
- 内存泄露(Memory leak). 这也是一种经常出现的情形。由于代码中的某些错误, 导致系统占用的内存越来越多. 如果某个方法/某段代码存在内存泄漏的, 每执行一次, 就会（有更多的垃圾对象）占用更多的内存. 随着运行时间的推移, 泄漏的对象耗光了堆中的所有内存, 那么 java.lang.OutOfMemoryError: Java heap space 错误就爆发了。

解决方案
如果设置的最大内存不满足程序的正常运行, 只需要增大堆内存即可, 配置参数可以参考下文。但很多情况下, 增加堆内存空间并不能解决问题。比如存在内存泄漏, 增加堆内存只会推迟 java.lang.OutOfMemoryError: Java heap space 错误的触发时间。当然, 增大堆内存, 可能会增加 GC pauses 的时间, 从而影响程序的 吞吐量或延迟。要从根本上解决问题, 则需要排查分配内存的代码. 简单来说, 需要解决这些问题:
- 哪类对象占用了最多内存？
- 这些对象是在哪部分代码中分配的。

要搞清这一点, 可能需要好几天时间。下面是大致的流程:
- 获得在生产服务器上执行堆转储(heap dump)的权限。“转储”(Dump)是堆内存的快照, 稍后可以用于内存分析. 这些快照中可能含有机密信息, 例如密码、信用卡账号等, 所以有时候, 由于企业的安全限制, 要获得生产环境的堆转储并不容易。
- 在适当的时间执行堆转储。一般来说,内存分析需要比对多个堆转储文件, 假如获取的时机不对, 那就可能是一个“废”的快照. 另外, 每次执行堆转储, 都会对JVM进行“冻结”, 所以生产环境中,也不能执行太多的Dump操作,否则系统缓慢或者卡死,你的麻烦就大了。
- 用另一台机器来加载Dump文件。一般来说, 如果出问题的JVM内存是8GB, 那么分析 Heap Dump 的机器内存需要大于 8GB. 打开转储分析软件(我们推荐Eclipse MAT , 当然你也可以使用其他工具)。
- 检测快照中占用内存最大的 GC roots。详情请参考: Solving OutOfMemoryError (part 6) – Dump is not a waste。 这对新手来说可能有点困难, 但这也会加深你对堆内存结构以及navigation机制的理解。
- 接下来, 找出可能会分配大量对象的代码. 如果对整个系统非常熟悉, 可能很快就能定位了。使用 Plumbr 能捕获所有的 java.lang.OutOfMemoryError , 并找出其他的性能问题, 例如最消耗内存的数据结构等等。

Plumbr 在后台负责收集数据 —— 包括堆内存使用情况(只统计对象分布图, 不涉及实际数据),以及在堆转储中不容易发现的各种问题。 如果发生 java.lang.OutOfMemoryError , 还能在不停机的情况下, 做必要的数据处理. 下面是Plumbr 对一个 java.lang.OutOfMemoryError 的提醒:
- 哪类对象占用了最多的内存(此处是 271 个 com.example.map.impl.PartitionContainer 实例, 消耗了 173MB 内存, 而堆内存只有 248MB)
- 这些对象在何处创建(大部分是在 MetricManagerImpl 类中,第304行处)
- 当前是谁在引用这些对象(从 GC root 开始的完整引用链)

### 3.Tip:

Docker-compose 建立ELK集群

1.规划
计划创建3个ES实例组成一个集群，同时创建一个Kibana实例连接该集群。每个ES实例使用本地配置文件，方便配置文件的保存和版本管理。Kibana的配置文件也放在本地，通过文件映射的方式挂载到容器内。

```shell
$ tree
.
├── docker-compose.yml
├── kibana.yml
├── node1
│   └── es1.yml
├── node2
│   └── es2.yml
└── node3
    └── es3.yml

3 directories, 5 files
```

2.编排文件
docker-compose.yml

```xml
version: "2.1"
services:
  es-node1:
    image: docker.elastic.co/elasticsearch/elasticsearch:6.7.0
    hostname: es-node1
    expose:         #不会将端口暴露给容器外应用
      - "9001"
    ports:          #将端口暴露到宿主机中
      - "9200:9200"
      - "9300:9300"
    volumes:
      - ~/Projects/sh-valley/docker-conf/elasticstack/cluster/node1/es1.yml:/usr/share/elasticsearch/config/elasticsearch.yml
    environment:
      - cluster.name=es-cluster
      - bootstrap.memory_lock=true
      - "ES_JAVA_OPTS=-Xms256m -Xmx256m"
    ulimits:
      memlock:
        soft: -1
        hard: -1
    networks:
      es-cluster-network:
        ipv4_address: 172.21.0.10
  es-node2:
    image: docker.elastic.co/elasticsearch/elasticsearch:6.7.0
    hostname: es-node2
    expose:         #不会将端口暴露给容器外应用
      - "9002"
    ports:          #将端口暴露到宿主机中
      - "9201:9201"
      - "9301:9301"
    volumes:
      - ~/Projects/sh-valley/docker-conf/elasticstack/cluster/node2/es2.yml:/usr/share/elasticsearch/config/elasticsearch.yml
    environment:
      - cluster.name=es-cluster
      - bootstrap.memory_lock=true
      - "ES_JAVA_OPTS=-Xms256m -Xmx256m"
    ulimits:
      memlock:
        soft: -1
        hard: -1
    networks:
      es-cluster-network:
        ipv4_address: 172.21.0.11
  es-node3:
    image: docker.elastic.co/elasticsearch/elasticsearch:6.7.0
    hostname: es-node3
    expose:         #不会将端口暴露给容器外应用
      - "9003"
    ports:          #将端口暴露到宿主机中
      - "9202:9202"
      - "9302:9302"
    volumes:
      - ~/Projects/sh-valley/docker-conf/elasticstack/cluster/node3/es3.yml:/usr/share/elasticsearch/config/elasticsearch.yml
    environment:
      - cluster.name=es-cluster
      - bootstrap.memory_lock=true
      - "ES_JAVA_OPTS=-Xms256m -Xmx256m"
    ulimits:
      memlock:
        soft: -1
        hard: -1
    networks:
      es-cluster-network:
        ipv4_address: 172.21.0.12
  kibana:
    image: docker.elastic.co/kibana/kibana:6.7.0
    ports:
      - "5601:5601"
    volumes:
      - ~/Projects/sh-valley/docker-conf/elasticstack/cluster/kibana.yml:/usr/share/kibana/config/kibana.yml
    environment:
      - ELASTICSEARCH_URL=http://es-node1:9200
    networks:
      - es-cluster-network
networks:
  es-cluster-network:
    driver: bridge
    ipam:
      driver: default
      config:
      - subnet: 172.21.0.0/16
        gateway: 172.21.0.1
```

ES配置文件（其中一个）：

```shell
cluster.name: elasticsearch-cluster
node.name: es-node1
network.bind_host: 0.0.0.0
network.publish_host: 172.21.0.10
http.port: 9200
transport.tcp.port: 9300
http.cors.enabled: true
http.cors.allow-origin: "*"
node.master: true 
node.data: true  
discovery.zen.ping.unicast.hosts: ["172.21.0.10:9300","172.21.0.11:9301","172.21.0.12:9302"]
discovery.zen.minimum_master_nodes: 2
```

Kibana的配置文件：

```shell
server.name: kibana
server.host: "0"
elasticsearch.hosts: [ "http://es-node1:9200", "http://es-node2:9201", "http://es-node3:9202" ]
xpack.monitoring.ui.container.elasticsearch.enabled: false
```

4.启动

```shell
$ docker-compose up -d
$ curl http://localhost:9200/_cat/nodes
172.21.0.12 51 96 29 6.53 6.43 3.72 md  - es-node3
172.21.0.11 47 96 30 6.53 6.43 3.72 mdi - es-node2
172.21.0.10 49 96 30 6.53 6.43 3.72 mdi * es-node1
```

### 4.Share:

http://streamsets.vip/?page_id=605
StreamSets 窗口聚合算子