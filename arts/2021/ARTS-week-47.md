---
> **ARTS-week-47**
> 2021-11-20 20:43
---


## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm： 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

648. 单词替换：https://leetcode-cn.com/submissions/detail/240129097/
34. 在排序数组中查找元素的第一个和最后一个位置：https://leetcode-cn.com/submissions/detail/240169767/
480. 滑动窗口中位数：https://leetcode-cn.com/submissions/detail/240580889/

### 2.Review:

https://www.baeldung.com/java-metrics
在 Java 中监视磁盘使用情况和其他指标

#### 点评：

我们将讨论如何在 Java 中监视关键指标。我们将重点介绍磁盘空间、内存使用情况和线程数据 – 仅使用核心 Java API。

1. 文件类简介：
File类表示文件或目录的抽象。它可用于获取有关文件系统的关键信息，并保持有关文件路径的操作系统独立性。在本教程中，我们将使用此类来检查 Windows 和 Linux 计算机上的根分区。

2. 管理工厂：
Java 提供了 ManagementFactory 类作为工厂，用于获取包含 JVM 特定信息的托管 Bean （MXBeans）。我们将在以下代码示例中检查两个：

MemoryMXBean：
表示 JVM 内存系统的管理接口。在运行时，JVM 创建了这个接口的一个实例，我们可以使用 ManuageFactory 的 getMemoryMXBean（）方法调用它。

ThreadMXBean：
与 MemoryMXBean 类似，ThreadMXBean 是 JVM 线程系统的管理接口。它可以使用 getThreadMXBean（）方法调用，并保存有关线程的关键数据。

在下面的示例中，我们将使用 ThreadMXBean 来获取 JVM 的 ThreadInfo 类 ， 该类包含有关在 JVM 上运行的线程的特定信息。

3. 监控磁盘使用情况
在此代码示例中，我们将使用 File 类来包含有关分区的关键信息。以下示例将返回 Windows 计算机上 C： 驱动器的可用空间、总空间和可用空间：
```java
File cDrive = new File("C:");
System.out.println(String.format("Total space: %.2f GB",
  (double)cDrive.getTotalSpace() /1073741824));
System.out.println(String.format("Free space: %.2f GB", 
  (double)cDrive.getFreeSpace() /1073741824));
System.out.println(String.format("Usable space: %.2f GB", 
  (double)cDrive.getUsableSpace() /1073741824));
```
同样，我们可以为 Linux 机器的根目录返回相同的信息：
```java
File root = new File("/");
System.out.println(String.format("Total space: %.2f GB", 
  (double)root.getTotalSpace() /1073741824));
System.out.println(String.format("Free space: %.2f GB", 
  (double)root.getFreeSpace() /1073741824));
System.out.println(String.format("Usable space: %.2f GB", 
  (double)root.getUsableSpace() /1073741824));
```
上面的代码打印出已定义文件的总可用空间。默认情况下，上述方法提供字节数。我们将这些字节转换为千兆字节，以使结果更具人类可读性。

4. 监控内存使用情况
现在，我们将使用 ManagementFactory 类通过调用 MemoryMXBean 来查询 JVM 可用的内存。在此示例中，我们将主要关注查询堆内存。请务必注意，也可以使用 MemoryMXBean 查询非堆内存：
```java
MemoryMXBean memoryMXBean = ManagementFactory.getMemoryMXBean();
System.out.println(String.format("Initial memory: %.2f GB", 
  (double)memoryMXBean.getHeapMemoryUsage().getInit() /1073741824));
System.out.println(String.format("Used heap memory: %.2f GB", 
  (double)memoryMXBean.getHeapMemoryUsage().getUsed() /1073741824));
System.out.println(String.format("Max heap memory: %.2f GB", 
  (double)memoryMXBean.getHeapMemoryUsage().getMax() /1073741824));
System.out.println(String.format("Committed memory: %.2f GB", 
  (double)memoryMXBean.getHeapMemoryUsage().getCommitted() /1073741824));
```
上面的示例分别返回初始内存、已用内存、最大内存和已提交内存。以下是对这意味着什么的简短解释：
- 初始：启动期间 JVM 从操作系统请求的初始内存
- 已使用：JVM 当前使用的内存量
- 最大：JVM 可用的最大内存。如果达到此限制，则可能会引发"内存不足异常"
- 已提交：保证可供 JVM 使用的内存量

5. 中央处理器使用率
接下来，我们将使用 ThreadMXBean 获取 ThreadInfo 对象的完整列表，并查询它们以获取有关在 JVM 上运行的当前线程的有用信息。
```java
ThreadMXBean threadMXBean = ManagementFactory.getThreadMXBean();
for(Long threadID : threadMXBean.getAllThreadIds()) {
    ThreadInfo info = threadMXBean.getThreadInfo(threadID);
    System.out.println("Thread name: " + info.getThreadName());
    System.out.println("Thread State: " + info.getThreadState());
    System.out.println(String.format("CPU time: %s ns", 
      threadMXBean.getThreadCpuTime(threadID)));
}
```
首先，代码使用 getAllThreadIds 方法获取当前线程的列表。然后，对于每个线程，它输出线程的名称和状态，后跟线程的 CPU 时间（以纳秒为单位）。

6. 使用探查器监视指标
最后，值得一提的是，我们可以在不使用任何Java代码的情况下监视这些关键指标。Java Profilers 在 JVM 级别密切监视关键构造和操作，并提供对内存，线程等的实时分析。
VisualVM 是 Java 探查器的一个例子，自 Java 6 以来一直与 JDK 捆绑在一起。许多集成开发环境 （IDE） 都包含插件，以便在开发新代码时利用探查器。

### 3.Tip:

#### java 动态获取 src 目录下的文件路径
```java
InputStream in = Demo.class.getResourceAsStream("/xxx.properties");  
URL url = Demo.class.getResource("xxx.properties");

InputStream in = Demo.class.getClassLoader().getResourceAsStream("xxx.properties");  
URL url = Demo.class.getClassLoader().getResource("xxx.properties"); 

InputStream in = Thread.currentThread().getContextClassLoader()  
                .getResourceAsStream("xxx.properties");

Resources.getResourceAsReader("xxx.properties");
```

### 4.Share:

https://blog.csdn.net/baiye_xing/article/details/75096571
【排序算法】折半插入排序

https://www.cnblogs.com/WWIandMC/p/15360247.html
顺序栈

https://blog.csdn.net/weixin_45629285/article/details/111146240
前缀和与差分 图文并茂 超级详细整理（全网最通俗易懂）

https://zhuanlan.zhihu.com/p/273591816
秒懂力扣区间题目：重叠区间、合并区间、插入区间
