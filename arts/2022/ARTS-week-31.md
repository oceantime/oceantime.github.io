---
> **ARTS-week-31**
> 2022-07-30 20:11
---


###### ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
- Algorithm: 每周至少做一个 leetcode 的算法题
- Review: 阅读并点评至少一篇英文技术文章
- Tip: 学习至少一个技术技巧
- Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

- [592. 分数加减运算 (中等) +](https://leetcode.cn/submissions/detail/342561658/)  
  + 思路:模拟
- [593. 有效的正方形 (中等) +](https://leetcode.cn/submissions/detail/343412755/)  
  + 思路:哈希
- [1161. 最大层内元素和 (中等) +](https://leetcode.cn/submissions/detail/343892873/)  
  + 思路: BFS


### 2.Review:

- [EC2 上的性能调优 Linux 实例](https://brendangregg.com/blog/2015-03-03/performance-tuning-linux-instances-on-ec2.html)  

#### 点评：

- 概述
在上一次 AWS re：Invent 上，我做了一个关于“性能调优 EC2 实例”的演讲，其中我展示了我的团队（性能和可靠性工程）如何在 Netflix 上调优 Linux EC2 实例。这包括实例选择、EC2 功能、Linux 内核调优和可观察性的使用。这是我做过的最全面的调优讲座，总结了我们在实例级别进行调优的不同方式。它应该对任何在云中运行Linux的人有用，而不仅仅是在EC2中。

[幻灯片位于幻灯片共享上](http://www.slideshare.net/brendangregg/performance-tuning-ec2-instances)

[它还被视频化，在youtube上](https://www.youtube.com/watch?v=7Cyd22kOqWc)


我经常分享我在性能可观察性方面的工作，但不是调整。可观察性是更大的胜利所在，因为可以发现并消除不必要的工作。它还可以帮助显示需要调整。但我也一直想分享相同的调优示例，并有机会在 AWS re：Invent 工作。

在演讲的第 3 部分中，我介绍了我们在 Ubuntu Trusty 上使用的可调参数，以展示可能性的示例。我将它们包含在下面以便于浏览。请观看视频了解相关情况。警告：这些可调参数是在 2014 年末为 EC2 上的 Ubuntu Trusty 实例开发的。

```
中央处理器
schedtool –B PID

虚拟内存
vm.swappiness = 0       # from 60

大页面
# echo never > /sys/kernel/mm/transparent_hugepage/enabled  # from madvise

文件系统
vm.dirty_ratio = 80                     # from 40
vm.dirty_background_ratio = 5           # from 10
vm.dirty_expire_centisecs = 12000       # from 3000
mount -o defaults,noatime,discard,nobarrier …

存储 I/O
/sys/block/*/queue/rq_affinity  2
/sys/block/*/queue/scheduler        noop
/sys/block/*/queue/nr_requests  256
/sys/block/*/queue/read_ahead_kb    256
mdadm –chunk=64 ...

网络
net.core.somaxconn = 1000
net.core.netdev_max_backlog = 5000
net.core.rmem_max = 16777216
net.core.wmem_max = 16777216
net.ipv4.tcp_wmem = 4096 12582912 16777216
net.ipv4.tcp_rmem = 4096 12582912 16777216
net.ipv4.tcp_max_syn_backlog = 8096
net.ipv4.tcp_slow_start_after_idle = 0
net.ipv4.tcp_tw_reuse = 1
net.ipv4.ip_local_port_range = 10240 65535
net.ipv4.tcp_abort_on_overflow = 1    # maybe

虚拟机管理程序 （Xen）
echo tsc > /sys/devices/system/clocksource/clocksource0/current_clocksource
```

设置时钟源来自我们在迁移到 Ubuntu Trusty 时发现的性能回归，这可以通过将时钟源切换到 TSC 来修复。最佳案例示例（到目前为止）：CPU 使用率降低了 30%，平均应用延迟减少了 43%。当心时钟漂移，因为在（遥远的）过去的TSC一直不可靠。

在演讲中，我将这些可调参数描述为我们的药柜，并“在2015年之前最好地考虑这些”。调优是一个过程，而不是一个产品。复制粘贴这些可调参数有点像服用别人的药物;多年后这样做就像服用别人过期的药物一样。

作为更新：幻灯片62在火焰图中显示了“破碎的Java堆栈”，我们现在有一个解决方法（我写的OpenJDK补丁）。请参阅我在[Netflix帖子上的Linux分析](https://brendangregg.com/blog/2015-02-27/linux-profiling-at-netflix.html)，其中我有一个示例火焰图，其中包含工作的Java堆栈。

AWS re：Invent 是一个大型活动，我错过了许多演讲。幸运的是，他们被录制下来了，Adrian Cockcroft发表了一份值得一看的[有趣演讲](http://perfcap.blogspot.com/2014/12/interesting-videos-from-aws-reinvent.html)清单。


### 3.Tip:

#### Android Studio error "Installed Build Tools revision 31.0.0 is corrupted"

For Windows

```

1.go to the location
"C:\Users\user\AppData\Local\Android\Sdk\build-tools\31.0.0"

2.find a file named d8.bat. This is a Windows batch file.

3.rename d8.bat to dx.bat.

4.in the folder lib ("C:\Users\user\AppData\Local\Android\Sdk\build-tools\31.0.0\lib")

5.rename d8.jar to dx.jar

Remember AppData is a hidden folder. Turn on hidden items to see the AppData folder.
```

For macOS or Linux

```
# change below to your Android SDK path
cd ~/Library/Android/sdk/build-tools/31.0.0 \
  && mv d8 dx \
  && cd lib  \
  && mv d8.jar dx.jar
```

#### [ExpiringMap](https://github.com/jhalterman/expiringmap/)

功能简介：
1.可设置Map中的Entry在一段时间后自动过期。
2.可设置Map最大容纳值，当到达Maximum size后，再次插入值会导致Map中的第一个值过期。
3.可添加监听事件，在监听到Entry过期时调度监听函数。
4.可以设置懒加载，在调用get()方法时创建对象。

pom.xml 依赖：

```xml
<dependency> 
    <groupId>net.jodah</groupId> 
    <artifactId>expiringmap</artifactId> 
    <version>0.5.8</version> 
</dependency> 
```

示例源码：

```java
public class ExpiringMapApp {

    public static void main(String[] args) {
        // maxSize: 设置最大值,添加第11个entry时，会导致第1个立马过期(即使没到过期时间)
        // expiration：设置每个key有效时间10s, 如果key不设置过期时间，key永久有效。
        // variableExpiration: 允许更新过期时间值,如果不设置variableExpiration，不允许后面更改过期时间,一旦执行更改过期时间操作会抛异常UnsupportedOperationException
        // policy:
        //        CREATED: 只在put和replace方法清零过期时间
        //        ACCESSED: 在CREATED策略基础上增加, 在还没过期时get方法清零过期时间。
        //        清零过期时间也就是重置过期时间，重新计算过期时间.
        ExpiringMap<String, String> map = ExpiringMap.builder()
            .maxSize(10)
            .expiration(10, TimeUnit.SECONDS)
            .variableExpiration().expirationPolicy(ExpirationPolicy.CREATED).build();

        map.put("token", "lkj2412lj1412412nmlkjl2n34l23n4");
        map.put("name", "管理员", 20000, TimeUnit.SECONDS);

        // 模拟线程等待...
        try {
            Thread.sleep(15000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        System.out.println("token ===> " + map.get("token"));
        System.out.println("name ===> " + map.get("name"));

        // 注意： 在创建map时，指定的那些参数如过期时间和过期策略都是全局的, 对map中添加的每一个entry都适用.
        //        在put一个entry键值对时可以对当前entry 单独设置 过期时间、过期策略,只对当前这个entry有效.
    }
}
```

运行结果：
```
token ===> null
name ===> 管理员
```

### 4.Share:

- [如何修改文件的 “创建时间” 和 “修改时间” (macOS, Linux, Windows)](https://sysin.org/blog/how-to-change-file-date/)  

- [JVM CPU Profiler技术原理及源码深度解析](https://tech.meituan.com/2019/10/10/jvm-cpu-profiler.html)

- [Docker desktop安装使用](http://bigtspace.com/archives/8981.html)