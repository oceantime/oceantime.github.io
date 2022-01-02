---
title: ARTS-week-20
date: 2020-01-19 21:30:08
tags:
---

## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm： 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

3Sum https://leetcode.com/submissions/detail/295569235/

### 2.Review:

https://www.drdobbs.com/parallel/choose-concurrency-friendly-data-structu/208801371?pgno=1

#### 点评：

作者分析了在高并发场景中如何选择有效的数据结构，并进行了分析对比。

在并行代码中，性能包括允许多个线程同时使用数据的能力。如果是高争用数据结构，那么它是否允许同时在数据结构的不同部分中的并发读写器和/或写入器？如果答案是“否”，则设计可能存在一个固有的瓶颈进入系统，只是要求锁车队等待线程，只有一个能够使用数据结构一次。
在并行硬件上，需注重最小化内存同步成本。当一个线程更新数据结构的一个部分时，需要移动多少内存以使更改可见到另一个线程？如果答案是“不仅仅是表面上改变的部分”，那么又存在一个潜在的性能损失，由于缓存刷新，更多的数据必须从执行更新的核心移动到读取结果的内核。

总结
1 跳表的复杂度和红黑树一样，而且实现起来更简单。
2 在并发环境下跳表有另外一个优势，红黑树在插入和删除的时候可能需要做一些平衡的操作，这样的操作可能会涉及到整个树的其他部分，而跳表的操作显然更加局部性，锁需要盯住的节点更少性能好一些。


### 3.Tip:
	
curl 不验证证书进行 https 请求：

1.忽略证书 直接 curl -k 即可
``` shell
curl 'https://www.xxxx.com/get_ips' -k
```

2.指定证书 curl --cacert 路径
``` shell
curl -k --cert client.pem --key key.pem https://www.xxxx.com/get_ips
```

3.设定系统环境变量方式 指定证书，无需--cacert
``` shell
set CURL_CA_BUNDLE=/etc/ssl/certs/ca-certificates.crt
set CURL_CA_BUNDLE=c:\curl\ca-certificates.crt
```

### 4.Share:

【技术】聊聊告警
http://github.tiankonguse.com/blog/2019/02/25/say-alarm.html
