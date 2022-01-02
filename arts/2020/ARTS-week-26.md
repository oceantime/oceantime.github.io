---
title: ARTS-week-26
date: 2020-03-07 20:34:39
tags:
---

## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm： 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

Sliding Window Maximum https://leetcode.com/submissions/detail/310508503/

### 2.Review:

https://www.infoq.com/articles/java-profiling-with-open-source/

#### 点评：

本文作者推荐了工作中经常碰到很多疑难问题的处理，在解决问题的同时，使用到的一些开源工具起到了相当大的作用。

Jmap 
特性1: jps 命令查找java进程
特性2: jmap -histo:live 现实 heap 中活动对象清单
特性3: 显示最近4分钟内增长对象实例数量最快的排鸣
特性4: 显示英语启动后增长对象实例数量的最多排名
存在问题：JVM可能会在生成内存统计图期间停止，因此请确保应用程序可以在生成内存统计图所需的时间内暂停。

VisualVM
特性5: 应用启动后VM内存趋势图
特性6: 应用修复内存泄漏
特性7: 对象方法执行耗时表
特性8: 对象占用内存排名
存在问题：比较耗费性能执行30多秒的方法启用VisualVM会变为30多分治，会影响应用，不能持久化和出发告警

BTrace https://github.com/btraceio/btrace
Figure 9: 通过脚本中启用方法分析需要的地方

应用监控业务场景
1.应用程序堆、非堆、永久生成和JVM拥有的不同内存池（新一代、永久生成、生存空间等）的内存使用情况
2.当前在应用程序中处于活动状态的线程数，以及正在使用的线程类型的详细信息（单独计数）
3.JVMs的CPU负载
4.系统负载系统的平均/总CPU使用率
5.对于应用程序中的某些类和方法，我想查看调用计数、平均自执行时间和平均墙时钟时间。
6.SQL调用的调用计数和执行时间
7.磁盘和网络操作的调用计数和执行时间
存在问题：原始日志难以解析的输出格式。需要更好的方法来处理BTrace输出和数据，最好是在一致的图形用户界面中。还需要比较来自不同时间点的数据的能力，以及在超过阈值时发送警报的能力。

EurekaJ 作者本人开发的工具
特性10: 通过界面勾选对应统计指标
特性11: 可视化显示系统负载
特性12: 显示实时多个指标图
特性13: 内存溢出趋势图分析
特性14: 在趋势图基础上进行下钻分析
特性15: 不同应用程序的内存使用情况。这种类型的图表分组使比较来自应用程序不同部分的数据，甚至跨应用程序和服务器的数据变得容易。
特性16: 一个数据访问对象性能分析演示 Example of a simple Data Access Object class that we might want to profile
特性18: EurekaJ 部署架构

EurekaJ 提供了两个主要应用：
1.一个基于 Java 的管理器程序，可以接收传入的统计数据并一致地以可视化视图展现出来一个解析BTrace 输出的代理程序，将其转化为JSON 格式并输入到EurekaJ 管理程序的REST 接口。
2.EurekaJ 接受两种类型的输入数据格式。EurekaJ 代理期望 BTrace 脚本的输出被格式化为逗号分隔的文件（这点在 BTrace 中可很容易做到），而 EurekaJ 管理程序期望它的输入符合它的JSON REST 接口格式。这意味着你能通过代理程序或直接经由REST 接口来传递度量数据。

总结：
作者介绍了一些开源工具的优点，这些工具既可以在需要对运行中的JVM进行深入分析时使用，也可以在需要使用 profiler  工具对开发/测试/生产应用程序部署进行更广泛和连续的监视时使用。

### 3.Tip:

Javascript 函数传参

#### 1. 函数不传参:立即执行函数[2]定义的函数为一个闭包函数，在函数体内的变量 a 指向[1]处声明的变量所以当立即执行函数[2]执行完毕后，a的值为2。函数中的 a 变量是 global 的 a。
``` javascript
var a=1;//[1]
(function(){
    a++;
})();//[2]
console.log(a);//2
```

#### 2. 函数传参:立即执行函数[2]不形成任何闭包，在函数体内的变量 a 为函数生成的形参变量，和[1]处声明的变量没有关系，只是名字相同而已。函数中的a屏蔽了全局变量a，是局部变量，对局部变量a的改变不会影响到global的a。
``` shell
var a=1;//[1]
(function(a){    
    a++;
    console.log(a);//输出2
})(a);//[2]
console.log(a);//1
```

#### 3. 如果修改如下代码，那么输出就为2，有闭包函数形成。
``` shell
var a=1;//[1]
(function(b){    
    a++;
    console.log(a);//输出2
})(a);//[2]
console.log(a);//2
```

### 4.Share:

性能分析之 profiling 及火焰图
https://www.cnblogs.com/baiwfg2/p/8623476.html
BTrace实战
https://www.jianshu.com/p/3467bb69f8d6
JVM 异常诊断神器 Greys 实战 - 玩转 JVM
https://www.jianshu.com/p/4bcce45e743d
