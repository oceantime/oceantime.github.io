---
> **ARTS-week-20**
> 2021-05-23 19:36
---


## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm: 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

树问题练习：https://leetcode-cn.com/leetbook/read/top-interview-questions-easy/x28wnt/
- 二叉树的最大深度
- 验证二叉搜索树
- 对称二叉树
- 二叉树的层序遍历
- 将有序数组转换为二叉搜索树

排序和搜索问题练习：https://leetcode-cn.com/leetbook/read/top-interview-questions-easy/x2uudv/
- 合并两个有序数组
- 第一个错误的版本

### 2.Review:

https://www.toptal.com/java/hunting-memory-leaks-in-java
如何排查 Java 内存泄漏

#### 点评：

没有经验的程序员经常认为 Java 的自动垃圾回收完全使他们免于担心内存管理。这是一个常见的误解：虽然垃圾收集器做得很好，但即使是最好的程序员也完全有可能成为严重破坏内存泄漏的牺牲品。让我解释一下。当不必要地维护不再需要的对象引用时，会发生内存泄漏。这些泄漏很糟糕。首先，当程序消耗越来越多的资源时，它们会对计算机施加不必要的压力。更糟糕的是，检测这些泄漏可能很困难：静态分析通常很难精确识别这些冗余引用，现有的泄漏检测工具会跟踪和报告有关单个对象的细粒度信息，产生难以解释且缺乏精确度的结果。

- 实际上有四类内存问题具有相似和重叠的特征，但原因和解决方案各不相同：
  - Performance (性能):通常与过多的对象创建和删除，垃圾收集的长时间延迟，过多的操作系统页面交换等相关联。
  - Resource constraints (资源约束)：当可用内存很少或内存过于分散而无法分配大对象时 - 这可能是本机的，或者更常见的是与 Java  堆相关。
  - Java heap leaks (java 堆泄漏):经典的内存泄漏，Java 对象在不释放的情况下不断创建。这通常是由潜在对象引用引起的。
  - Native memory leaks (本机内存泄漏):与 Java 堆之外的任何不断增长的内存利用率相关联，例如由 JNI 代码，驱动程序甚至 JVM 分配。


1. 内存泄漏：基础
- 并非所有 OOM 都意味着内存泄漏：由于生成大量局部变量或其他此类事件，OOM 可能会发生。
- 非所有 OutOfMemoryErrors 都意味着内存泄漏，并非所有内存泄漏都表现为 OutOfMemoryErrors。
- 程序执行期间泄漏的内存块通常会降低系统性能，因为分配但未使用的内存块必须在系统耗尽空闲物理内存时进行换出。

2. 解密 OutOfMemoryError
诊断 OOM 的第一步是确定错误的实际含义。这听起来很清楚，但答案并不总是那么清晰。例如：OOM是否是因为Java堆已满而出现，还是因为本机堆已满？为了帮助回答这个问题，让我们分析一些可能的错误消息：
- java.lang.OutOfMemoryError: Java heap space
- java.lang.OutOfMemoryError: PermGen space
- java.lang.OutOfMemoryError: Requested array size exceeds VM limit
- java.lang.OutOfMemoryError: request bytes for . Out of swap space?
- java.lang.OutOfMemoryError: (Native method)

2.1.“Java heap space”
此错误消息不一定意味着内存泄漏。实际上，问题可能与配置问题一样简单。
- 我负责分析一直产生这种类型的 OutOfMemoryError 的应用程序。经过一番调查后，我发现罪魁祸首是阵列实例化，因为需要太多的内存;在这种情况下，并不是应用程序的错，而是应用程序服务器依赖于默认的堆太小了。我通过调整 JVM 的内存参数解决了这个问题。
- 特别是对于长期存在的应用程序，该消息可能表明我们无意中持有对象的引用，从而阻止垃圾收集器清理它们。这时 Java 语言等同于内存泄漏。（注意：应用程序调用的API也可能无意中持有对象引用。）
- “Java 堆空间” OOM 的另一个潜在来源是使用 finalizers。如果类具有 finalize 方法，则在垃圾收集时该类型的对象不会被回收。而是在垃圾收集之后，稍后对象将排队等待最终确定。在 Sun 实现中，finalizers 由守护线程执行。如果 finalizers 线程无法跟上 finalization 队列，那么 Java 堆可能会填满并且可能抛出 OOM。

2.2. “PermGen space”
此错误消息表明永久代已满。永久代是存储类和方法对象的堆的区域。如果应用程序加载了大量类，则可能需要使用 -XX：MaxPermSize 选项增加永久代的大小。
- Interned java.lang.String 对象也存储在永久代中。 java.lang.String 类维护一个字符串池。调用实习方法时，该方法检查池以查看是否存在等效字符串。如果是这样，它由实习方法返回;如果没有，则将字符串添加到池中。更准确地说，java.lang.String.intern 方法返回一个字符串的规范表示;结果是对该字符串显示为文字时将返回的同一个类实例的引用。如果应用程序实例化大量字符串，则可能需要增加永久代的大小。
注意：可以使用 jmap -permgen 命令打印与永久生成相关的统计信息，包括有关内部化 String 实例的信息。

2.3.“Requested array size exceeds VM limit”
此错误表示应用程序（或该应用程序使用的API）尝试分配大于堆大小的数组。例如，如果应用程序尝试分配512MB的数组但最大堆大小为256MB，则将抛出此错误消息的 OOM。在大多数情况下，问题是配置问题或应用程序尝试分配海量数组时导致的错误。

2.4. “Request bytes for . Out of swap space?”
此消息似乎是一个 OOM。但是，当本机堆的分配失败并且本机堆可能将被耗尽时，HotSpot VM 会抛出此异常。消息中包括失败请求的大小（以字节为单位）以及内存请求的原因。在大多数情况下，是报告分配失败的源模块的名称。如果抛出此类型的 OOM，则可能需要在操作系统上使用故障排除实用程序来进一步诊断问题。在某些情况下，问题甚至可能与应用程序无关。例如，可能会在以下情况下看到此错误：
- 操作系统配置的交换空间不足。
- 系统上的另一个进程是消耗所有可用的内存资源。
由于本机泄漏，应用程序也可能失败（例如，如果某些应用程序或库代码不断分配内存但无法将其释放到操作系统）。

2.5. Native method
如果看到此错误消息并且堆栈跟踪的顶部框架是本机方法，则该本机方法遇到分配失败。此消息与上一个消息之间的区别在于，在JNI或本机方法中检测到 Java 内存分配失败，而不是在 Java VM 代码中检测到。
如果抛出此类型的 OOM，可能需要在操作系统上使用实用程序来进一步诊断问题。

2.6. Application Crash Without OOM
有时，应用程序可能会在从本机堆分配失败后很快崩溃。如果运行的本机代码不检查内存分配函数返回的错误，则会发生这种情况。
例如，如果没有可用内存，malloc 系统调用将返回 NULL。如果未检查 malloc 的返回，则应用程序在尝试访问无效的内存位置时可能会崩溃。根据具体情况，可能很难定位此类问题。
在某些情况下，致命错误日志或崩溃转储的信息就足以诊断问题。如果确定崩溃的原因是某些内存分配中缺少错误处理，那么必须找到所述分配失败的原因。与任何其他本机堆问题一样，系统可能配置了但交换空间不足，另一个进程可能正在消耗所有可用内存资源等。

3. 泄漏诊断
在大多数情况下，诊断内存泄漏需要非常详细地了解相关应用程序。警告：该过程可能很长并且是迭代的。我们寻找内存泄漏的策略将相对简单：
- 识别症状
- 启用详细垃圾回收
- 启用分析
- 分析踪迹

3.1. 识别症状
正如所讨论的，在许多情况下，Java 进程最终会抛出一个 OOM 运行时异常，这是一个明确的指示，表明的内存资源已经耗尽。在这种情况下，需要区分正常的内存耗尽和泄漏。分析 OOM 的消息并尝试根据上面提供的讨论找到罪魁祸首。
通常，如果 Java 应用程序请求的存储空间超过运行时堆提供的存储空间，则可能是由于设计不佳导致的。例如，如果应用程序创建映像的多个副本或将文件加载到数组中，则当映像或文件非常大时，它将耗尽存储空间。这是正常的资源耗尽。该应用程序按设计工作（虽然这种设计显然是愚蠢的）。
但是，如果应用程序在处理相同类型的数据时稳定地增加其内存利用率，则可能会发生内存泄漏。

3.2. 启用详细垃圾收集
断言确实存在内存泄漏的最快方法之一是启用详细垃圾回收。通常可以通过检查verbosegc输出中的模式来识别内存约束问题。
具体来说，-verbosegc 参数允许在每次垃圾收集（GC）过程开始时生成跟踪。也就是说，当内存被垃圾收集时，摘要报告会打印到标准错误，让了解内存的管理方式。
此GC跟踪文件中的每个块（或节）按递增顺序编号。要理解这种跟踪，应该查看连续的分配失败节，并查找随着时间的推移而减少的释放内存（字节和百分比），同时总内存（此处，19725304）正在增加。这些是内存耗尽的典型迹象。

3.3. 启用分析
不同的 JVM 提供了生成跟踪文件以反映堆活动的不同方法，这些方法通常包括有关对象类型和大小的详细信息。这称为分析堆。

3.4. 分析路径
本文重点介绍 Java VisualVM 生成的跟踪。跟踪可以有不同的格式，因为它们可以由不同的 Java 内存泄漏检测工具生成，但它们背后的想法总是相同的：
在堆中找到不应该存在的对象块，并确定这些对象是否累积而不是释放。特别感兴趣的是每次在 Java 应用程序中触发某个事件时已知的临时对象。应该仅存少量，但存在许多对象实例，通常表示应用程序出现错误。
最后，解决内存泄漏需要彻底检查代码。了解对象泄漏的类型可能对此非常有用，并且可以大大加快调试速度。

4. 垃圾收集如何在 JVM 中运行？
在我们开始分析具有内存泄漏问题的应用程序之前，让我们首先看看垃圾收集在 JVM 中的工作原理。
JVM 使用一种称为跟踪收集器的垃圾收集器，它基本上通过暂停它周围的世界来操作，标记所有根对象（由运行线程直接引用的对象），并遵循它们的引用，标记它沿途看到的每个对象。
Java 基于分代假设-实现了一种称为分代垃圾收集器的东西，该假设表明创建的大多数对象被快速丢弃，而未快速收集的对象可能会存在一段时间。
基于此假设，[Java 将对象分为多代](http://www.oracle.com/technetwork/java/gc-tuning-5-138395.html#1.1. Generations|outline)。

- Young Generation - 这是对象的开始。它有两个子代
- Eden Space - 对象从这里开始。大多数物体都是在 Eden Space 中创造和销毁的。在这里，GC 执行 Minor GCs，这是优化的垃圾收集。执行 Minor GC 时，对仍然需要的对象的任何引用都将迁移到其中一个 survivors 空间（S0或S1）。
Survivor Space (S0 and S1)-幸存 Eden Space 的对象最终来到这里。其中有两个，在任何给定时间只有一个正在使用（除非我们有严重的内存泄漏）。一个被指定为空，另一个被指定为活动，与每个 GC 循环交替。
- Tenured Generation - 也被称为老年代（图2中的旧空间），这个空间容纳存活较长的对象，使用寿命更长（如果它们活得足够长，则从 Survivor 空间移过来）。填充此空间时，GC 会执行完整 GC，这会在性能方面降低成本。如果此空间无限制地增长，则 JVM 将抛出 OutOfMemoryError - Java 堆空间。
- Permanent Generation - 作为与终身代密切相关的第三代，永久代是特殊的，因为它保存虚拟机所需的数据，以描述在 Java 语言级别上没有等价的对象。例如，描述类和方法的对象存储在永久代中。
Java 足够聪明，可以为每一代应用不同的垃圾收集方法。使用名为 Parallel New Collector 的跟踪复制收集器处理年轻代。这个收集器阻止了这个世界，但由于年轻一代通常很小，所以暂停很短暂。有关 JVM 代及其工作原理的更多信息，请查阅 Memory Management in the Java HotSpot™ Virtual Machine 。

5. 检测内存泄漏
要查找内存泄漏并消除它们，需要合适的内存泄漏工具。是时候使用 Java VisualVM 检测并删除此类泄漏。

5.1. 使用 Java VisualVM 远程分析堆
VisualVM 是一种工具，它提供了一个可视化界面，用于查看有关基于 Java 技术的应用程序运行时的详细信息。使用 VisualVM，可以查看与本地应用程序和远程主机上运行的应用程序相关的数据。还可以捕获有关 JVM 软件实例的数据，并将数据保存到本地系统。为了从 Java VisualVM 的所有功能中受益，应该运行 Java 平台标准版（Java SE）版本6或更高版本。Related: Why You Need to Upgrade to Java 8 Already

5.2. 为 JVM 启用远程连接
在生产环境中，通常很难访问运行代码的实际机器。幸运的是，我们可以远程分析我们的 Java 应用程序。
首先，我们需要在目标机器上授予自己JVM访问权限。为此，请使用以下内容创建名为 jstatd.all.policy 的文件：

```shell
grant codebase "file:${java.home}/../lib/tools.jar" {
permission java.security.AllPermission;
};
```

创建文件后，我们需要使用 jstatd - Virtual Machine jstat Daemon 工具启用与目标VM的远程连接，如下所示：

```shell
jstatd -p <PORT_NUMBER> -J-Djava.security.policy=<PATH_TO_POLICY_FILE>
例如：
jstatd -p 1234 -J-Djava.security.policy=D:jstatd.all.policy
```
通过在目标 VM 中启动 jstatd，我们能够连接到目标计算机并远程分析应用程序的内存泄漏问题。

5.3. 连接到远程主机
在客户端计算机中，打开提示并键入 jvisualvm 以打开 VisualVM 工具。
接下来，我们必须在 VisualVM 中添加远程主机。当目标JVM启用以允许来自具有 J2SE 6或更高版本的另一台计算机的远程连接时，我们启动 Java VisualVM 工具并连接到远程主机。如果与远程主机的连接成功，我们将看到在目标 JVM 中运行的 Java 应用程序，要在应用程序上运行内存分析器，我们只需在侧面板中双击其名称即可。现在我们已经设置了内存分析器，让我们研究一个内存泄漏问题的应用程序，我们称之为 MemLeak。

6. MemLeak
当然，有很多方法可以在 Java 中创建内存泄漏。为简单起见，我们将一个类定义为 HashMap 中的键，但我们不会定义 equals 和 hashcode 方法。 HashMap 是 Map 接口的哈希表实现，因此它定义了键和值的基本概念：每个值都与唯一键相关，因此如果给定键值对的键已经存在于 HashMap，它的当前值被替换。我们的必须提供 equals 和 hashcode 方法的正确实现。没有它们，就无法保证会生成一个好的key。通过不定义 equals 和 hashcode 方法，我们一遍又一遍地向HashMap添加相同的键，而不是按原样替换键，HashMap 不断增长，无法识别这些相同的键并抛出 OutOfMemoryError。MemLeak 类:

```java
package com.post.memory.leak;
import java.util.Map;
public class MemLeak {
	public final String key;
	public MemLeak(String key) {
		this.key =key;
	}
	public static void main(String args[]) {
		try {
			Map map = System.getProperties;
			for(;;) {
			map.put(new MemLeak("key"), "value");
			}
		} catch(Exception e) {
			e.printStackTrace;
		}
	}
}
```
注意：内存泄漏不是由于第14行的无限循环：无限循环可能导致资源耗尽，但不会导致内存泄漏。如果我们已经正确实现了equals和hashcode方法，那么即使使用无限循环，代码也能正常运行，因为我们在HashMap中只有一个元素。

7. 使用 Java VisualVM
使用 Java VisualVM，我们可以对 Java Heap 进行内存监视，并确定其行为是否存在内存泄漏。仅仅30秒之后，老年代几乎已满，表明即使使用 Full GC，老年代也在不断增长，这是内存泄漏的明显迹象。检测此泄漏原因的一种方法，使用带有 heapdump 的 Java VisualVM 生成。在这里，我们看到 50％ 的 Hashtable $ Entry 对象在堆中，而第二行指向 MemLeak 类。因此，内存泄漏是由 MemLeak 类中使用的哈希表引起的。最后，在 OutOfMemoryError 之后观察 Java Heap，其中 Young 和 Old 代完全填满。内存泄漏是最难解决的 Java 应用程序问题之一，因为症状多种多样且难以重现。在这里，我们概述了一种逐步发现内存泄漏并确定其来源的方法。但最重要的是，仔细阅读的错误消息并注意堆栈跟踪 - 并非所有泄漏都像它们出现的那样简单。

8. 结束语
内存泄漏是最难解决的 Java 应用程序问题之一，因为症状多种多样且难以重现。在这里，我们概述了一种逐步发现内存泄漏并确定其来源的方法。但最重要的是，仔细阅读的错误消息并注意堆栈跟踪 - 并非所有泄漏都像它们出现的那样简单。

### 3.Tip:

#### Docker 限制容器日志大小

1.1 查看 docker 某个容器日志：

```shell
docker logs -f 容器名称
```

1.2 在 linux 上容器日志一般存放在 /var/lib/docker/containers/container_id/下面，以 json.log 结尾的文件(业务日志)很大：

```shell
du -h --max-depth=1 * //可以查看当前目录下各文件、文件夹的大小。
du -h --max-depth=0 *  //可以只显示直接子目录文件及文件夹大小统计值。
du –sh //查看指定目录的总大小。
```

1.3 清理 Docker 容器（治标）, 这里需要用 cat /dev/null > 进行清空，而不是 rm：

```shell
cat /dev/null > /var/lib/docker/containers/容器id/容器id-json.log
```

1.4 设置Docker容器日志大小（治本）

```shell
设置一个容器服务的日志大小上限
nginx: 
  image: nginx:1.12.1 
  restart: always 
  logging: 
    driver: "json-file"
    options: 
      max-size: "5g"

全局设置 新建/etc/docker/daemon.json，若有就不用新建了
# vim /etc/docker/daemon.json
{
  "registry-mirrors": ["http://f613ce8f.m.daocloud.io"],
  "log-driver":"json-file",
  "log-opts": {"max-size":"500m", "max-file":"3"}
}
```

#### Docker 启动出现 "No space left on device" 或者 docker 日志太多导致磁盘占满问题

1.1 对/var/lib/docker/containers下的文件夹进行排序，看看哪个容器占用了太多的磁盘空间

```shell
下面命令会按照升序的方式对于容器文件夹进行排序，并列出容器文件夹的大小:
[root@docker ~]# du -d1 -h /var/lib/docker/containers | sort -h
36K  /var/lib/docker/containers/4d91f92dd7604216f2e9e123572e9a80d7bbee3d8c8ce7be2ed241c572816fb
640K /var/lib/docker/containers/374aa0ba92b37d829012282ff15c1bb838d95dedb54589874c4285991be2d4aa
40K  /var/lib/docker/containers/7cfdbc453b2f7109b52e974061754266e6cdc0ccaee62ab4a5887865113e1144
40K  /var/lib/docker/containers/84ee24989ad52383c6e99eaa4d236e600095aa7f855e81fbafe10416b75ceefb
40K  /var/lib/docker/containers/aeced3ef3e23df27e52f65743bb05448b46a2c660acc5b0aab12604e060779b4
40K  /var/lib/docker/containers/ebd1bd211a1b9d02bb39bfb80eec3d0960a5b25e18f54d7371781ec456e7a1e8
176K /var/lib/docker/containers/1fe0a241e5ce9726c547c68739793633f9dd906768a36fe80e8fb80373aa3bfb
17M  /var/lib/docker/containers/ac30e68d454b37d22b3964053a2b52ba043baa1add13556a09c0e3e05589104f
25M  /var/lib/docker/containers/872ca4e3d005594591ca2df0e832d36eef448981ab2820c69df4ff1399f8423e
```

1.2 选择要清理的容器进行清理

```shell
cat /dev/null > /var/lib/docker/containers/container_id/container_log_name
如下命令会清空对应的日志,如:
[root@docker ~]# cat /dev/null > /var/lib/docker/containers/374aa0ba92b37d829012282ff15c1bb838d95dedb54589874c4285991be2d4aa/374aa0ba92b37d829012282ff15c1bb838d95dedb54589874c4285991be2d4aa-json.log
```

1.3 限制 docker 容器日志文件的大小

```shell
启动容器时，可以通过参数设置日志文件的大小、日志文件的格式。
[root@docker ~]# docker run -it --log-opt max-size=10m --log-opt max-file=3 centos
```


### 4.Share:

https://blog.csdn.net/weixin_32820767/article/details/81196250
/var/lib/docker/overlay2 占用很大，清理 Docker占用的磁盘空间，迁移 /var/lib/docker 目录

https://blog.csdn.net/seabreezesuper/article/details/84874917
[Spring Boot] 用 Jmeter 测试 maxConnections、maxThreads、acceptCount 的关系

https://luyiisme.github.io/2017/02/18/conn-abort-problom/
ClientAbortException 问题分析

https://www.cnblogs.com/technologykai/p/9766459.html
线上问题！----------ORG.APACHE.CATALINA.CONNECTOR.CLIENTABORTEXCEPTION: JAVA.IO.IOEXCEPTION: BROKEN PIPE

https://www.jianshu.com/p/fb5781e91bb7
JVM 诊断工具

https://blog.csdn.net/li563868273/article/details/102920689
解密阿里线上问题诊断工具 Arthas 和 jvm-sandbox

https://blog.csdn.net/rosefun96/article/details/79248846
JAVA 系列(11)：产生指定范围的随机整数

https://blog.csdn.net/wangjiao121/article/details/103577980
关于解决 Request method 'HEAD' not supported

https://www.cnblogs.com/jasondan/p/3499175.html
nohup 不输出日志信息的方法，及 linux 重定向学习

https://www.cnblogs.com/jhhe66/articles/9523149.html
京东三级列表页持续架构优化—Golang+Lua(OpenResty)最佳实践