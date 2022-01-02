---
title: ARTS-week-23
date: 2020-02-16 11:17:27
tags:
---

## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm： 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

Plus One https://leetcode.com/submissions/detail/303765795/

### 2.Review:

https://github.com/elastic/beats/issues/1037

#### 点评：

这个问题讨论的是日志采集的一个业务典型场景，比如一个订单生成会产生多个流程步骤，步骤不确定多少个节点这种情况一般业务会生成订单的单独日志文件，但如果 ELK 采集时会切分日志，如果日志采集链路经过 Kafka 队列会有一定几率会出现日志错位的情况，针对这种情况就产生了 Filebeat 采集时如何输入文件行号的问题。 

针对这个问题，官方也给出了解答:
此刻，我认为这里没有任何解决方案。 Logstash，Beats，Kibana 都是随着时间推移的事件的思路，这基本上是订购事物的方式。行号更像是文本编辑器的一种功能。在某种程度上，Kibana 可以向您显示文件中的事件。它不会为您提供逐页列表，您可以实际点击页码，但使用时间框架，理论上可以查看整个文件。

另一个回答：
首先让我给出 Filebeat 还没有行号字段的主要原因。当 Filebeat 恢复读取文件时（如重启后），它会 fseek 从最后记录的偏移量恢复。如果必须报告行号，则需要将此状态存储在其注册表中，或者重新读取该文件并将新行计数到偏移量。
如果要提供允许您对 Elasticsearch 支持的日志进行分页的服务，则可以使用滚动 API 和文件查询。您必须进行排序的结果通过 @timestamp，然后通过 offset 。您的服务将使用滚动查询来获取结果的第一页。
然后获取您使用 scroll_id 第一个查询返回的所有后续页面。
这将为您提供给定文件名的所有日志数据，甚至可以在旋转中跟踪它。如果行号是关键的，你可以通过计算从第一个事件开始的事件来合成地产生它们 offset == 0，但我避免这样做，因为它非常容易出错，特别是如果你添加任何过滤或多行分组。

总结：
最终个人理解，目前只依赖 Filebeat 采集无法解决此问题，只能通过业务日志输出行号，再采集过程中单独解析字段，最终通过 Kibana 增加此字段通过过滤和排序达到获取完整业务日志的需求。

### 3.Tip:
spring boot 搭建 https 服务器

1. 自签名证书:
将生成的jks文件放置在 classpath 下，在 spring boot 的配置文件中增加如下内容
``` shell
# 建立 CA 密钥
openssl genrsa -des3 -out ca.key 1024 # 创建密钥
chmod 400 ca.key # 修改权限为仅 root 能访问并不需要执行
openssl rsa -nout -text -in ca.key # 查看创建的证书

# 利用 CA 密钥自签署 CA 证书
openssl req -new -x509 -days 3650 -key ca.key -out -ca.crt
chmod 400 ca.car # 修改权限为仅 root 能访问并不需要执行

# CA 服务端 java 证书
# crt 转 p12
openssl pkcs12 -export -in ca.crt -inkey ca.key -out ca.p12 -name "xxx"
# p12 转 jks
keytool -importkeystore -srckeystore ca.p12 -destkeystore ca.jks -deststoretype pkcs12
# jsk 转 p12
keytool -importkeystore -srckeystore ca.jks -srcstoretype JKS -deststoretype pkcs12 -destkeystore ca.p12

# CA 客户端证书
openssl x509 -noout -text -in ca.crt # 查看创建的证书
cat ca.key ca.crt > cert.pem
openssl rsa -in cert.pem -out key.pem
```

2. spring boot 服务端配置:
将生成的 jks 文件放置在 classpath 下，在 spring boot 的配置文件中增加如下内容
``` java
server.port: 443
server.ssl.key-store: classpath:ca.jks
server.ssl.key-store-password: password
server.ssl.keyAlias: xxx
```

3. 客户端使用 curl 命令模拟调用:
``` shell
# 将 cert.pem 和 key.pem 放在目录下
curl -k --cert client.pem --key key.pem https://www.xxx.com/
```

### 4.Share:

OneAPM 工作两年总结
https://yufan.me/two-years-in-oneapm/
