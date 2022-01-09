---
title: ARTS-week-02
date: 2020-01-12 19:49:09
tags:
---

## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm： 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

Merge Sorted Array https://leetcode.com/submissions/detail/289477912/

### 2.Review:

https://www.holistics.io/blog/why-and-how-we-migrated-from-angularjs-to-vuejs/amp/

#### 点评：

作者简单说明当前项目使用 AngularJS 框架的特性和问题及为何迁移到vue框架。

AngularJS 框架的问题：
渲染性能：由于AngularJs的特性，不得不花大量的时间来呈现一张巨大的数据表。
Angular 的文档不友好：在这成为问题之前，其他都不算什么问题。我们越深入地使用 AngularJS，就越觉得它的文档实在难以理解。
双向数据流使得逻辑处理起来相当困难，不管是写组件还是写视图控制器都是如此。这可能是AngularJS不好使用最重要的一个原因。

为何迁移到vue框架：
最重要的决定性因素是：一个清晰、可逐步迁移到 VueJS，而又不会破坏发展路径的迁移路径。
VueJS 的文档写得非常好，结构也非常清晰。

迁移完成后：
非常整洁的代码和模块（基于组件的），以及 VueX 和 Vue Store 大大提高了编程效率
再没有复杂的逻辑
改善了 UI 性能

### 3.Tip:

Docker-compose 构建 Kibana 实例：

1.目录结构
``` shell
├── docker-compose.yml
├── kibana.yml
└── client-ca.cer
```
2. docker-compose.yml kiban端口及kibana.yml和client-ca.cer证书映射：
``` yml
version: "3"
services:
    kibana:
        image: docker.elastic.co/kibana/kibana:6.8.1
        container_name: kibana
        environment:
            - I18N_LOCALE=zh-CN
        ports:
            - "5601:5601"
        volumes:
            - ./kibana.yml:/usr/share/kibana/config/kibana.yml
            - ./client-ca.cer:/kibana-6.8.1/config/client-ca.cer
```
3. kibana.yml 与 9200 进行组合出 es-client 暴露的节点位置及ssl证书和认证配置
``` yml
server.port:5601
server.host: "0"
elasticsearch.hosts: "https://127.0.0.1:9200"
xpack.security.enabled: true
elasticsearch.username: "kibana"
elasticsearch.password: "xxxxxx"
elasticsearch.ssl.certificateAuthorities: /kibana-6.8.1/config/client-ca.cer
elasticsearch.ssl.verificationMode: certificate
```

### 4.Share:

面试问题：Vuejs如何实现双向绑定
https://segmentfault.com/a/1190000016884795
