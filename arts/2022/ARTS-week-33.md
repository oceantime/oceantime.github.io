---
> **ARTS-week-33**
> 2022-08-13 11:34
---


###### ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
- Algorithm: 每周至少做一个 leetcode 的算法题
- Review: 阅读并点评至少一篇英文技术文章
- Tip: 学习至少一个技术技巧
- Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

- [640. 求解方程 (中等) +](https://leetcode.cn/submissions/detail/348572472/)  
  + 思路:数学 把 “-” 替换成 “+-”，然后，先按 “=” 分割，再按 “+” 分割，再移项、合并同类项即可，注意，“x” 和 “-x” 的特殊处理。
- [1282. 用户分组 (中等) +](https://leetcode.cn/submissions/detail/349438836/)  
  + 思路:哈希
- [768. 最多能完成排序的块 II (困难) +](https://leetcode.cn/submissions/detail/349564640/)  
  + 思路: 前缀和


### 2.Review:

- [神话破灭：古老的SQL数据库和当今的实时分析](https://rockset.com/blog/busting-myths-about-the-SQL-database-and-real-time-analytics/)  

#### 点评：

在本文中，我们将研究一些关于 SQL 数据库的常见误解。希望我们能够理解SQL数据库如何不一定受到过去局限性的约束，从而使它们在实时分析时代保持非常重要的相关性。

- SQL 数据库简史

SQL最初由IBM研究人员于1974年开发，用于其开创性的关系数据库System R。System R只能在IBM大型机上运行，这些大型机在当时非常强大，而且非常昂贵，除了NASA和NOAA（负责国家气象局的国家海洋和大气管理局）之外，任何人都无法企及。

SQL直到20世纪80年代才真正起飞，当时Oracle公司推出了其SQL驱动的数据库，可以在较便宜的微型计算机和服务器上运行。其他竞争对手如Microsoft（SQL Server）和Teradata也很快紧随其后。

随着时间的推移，添加了不同风格的 SQL 数据库。数据仓库在20世纪90年代出现，开源数据库，如MySQL和PostgreSQL，在90年代末和2000年代开始发挥作用。

我们不要掩盖这样一个事实，即SQL作为一种语言仍然非常受欢迎，是数据世界的通用语言。根据2020年Stack Overflow调查，它在所有编程语言中排名第三，54.7%的开发人员使用。

可能会认为，鉴于 SQL 数据库的丰富传统，工程团队会尽可能地支持在 SQL 数据库上进行构建。然而，当我与首席技术官和工程副总裁交谈时，我不断听到三个关于SQL数据库如何不可能很好地支持实时分析的神话。让我们一个接一个地解决这些神话。

- 误区 1：SQL 数据库无法支持高流式处理写入速率
在实时分析成为梦想之前，第一个SQL数据库在一台机器上运行。随着数据库大小的增长，供应商将它们重写为在服务器集群上运行。但这也意味着数据必须分布在多个服务器上。面向列的数据库将按列进行分区，每列存储在特定服务器上。虽然这样可以有效地从列的子集中检索数据，但写入记录需要写入多个服务器。面向行的数据库可以改为执行范围分区，并将整个记录一起保存在一台服务器上。但是，一旦使用按不同键分片的二级索引，我们就会再次遇到必须将单个记录写入存储主表和二级索引的不同服务器的问题。

由于单个数据记录被发送到许多要写入的计算机，因此这些分布式数据库（无论是面向行还是面向列）都必须确保数据以正确的顺序在多个服务器中更新，以便早期的更新不会覆盖以后的更新。这可以通过以下两种技术之一来确保：分布式锁定或两阶段锁定和提交。虽然它确保了数据的完整性，但分布式两阶段锁为SQL数据库写入增加了巨大的延迟 - 如此之大，以至于它激发了针对快速数据写入而优化的NoSQL数据库的兴起，例如HBase，Couchbase和Cassandra。

较新的 SQL 数据库的构建方式不同。它们针对实时分析进行了优化，通过使用称为文档分片的替代存储技术，避免了过去与SQL数据库有关的问题。当引入新文档时，文档分片数据库将立即将整个文档写入最近的可用计算机，而不是将其拆分并发送不同的字段到不同的服务器。文档的所有二级索引都驻留在本地同一台服务器上。这使得存储和写入数据的速度非常快。当新文档到达系统时，该文档的所有字段和该文档的所有二级索引都存储在一台服务器上。不需要为每次更新使用分布式跨服务器事务。

这也让我想起了亚马逊如何以最快的速度将物品存储在仓库中。大多数物品不是将所有笔记本电脑放在一个过道上，将所有真空吸尘器放在另一个过道中，而是存储在最近的随机位置，与不相关的物品相邻，尽管由亚马逊的库存软件进行跟踪。

除了文档分片之外，新的实时SQL数据库还支持超快的数据写入速度，因为它们可以使用NoSQL数据库中首次出现的日志结构化合并（LSM）树结构，而不是以前的SQL数据库使用的高度结构化的B树。我将跳过LSM和B-Tree数据库如何工作的细节。可以说，在 B 树数据库中，数据以 B 树的形式布置为存储页，并且更新将对相关的 B 树页进行读-修改-写。这会在写入阶段产生额外的 I/O 开销。

相比之下，基于 LSM 的数据库可以立即将数据写入任何空闲位置 — 无需先进行读-修改-写 I/O 循环。LSM还具有其他功能，例如压缩（通过删除未使用的部分来压缩数据库），但是能够灵活，立即地写入数据，从而实现极高的速度。这是一篇研究论文，显示了RocksDB LSM引擎与基于B-Tree的InnoDB存储引擎相比更高的写入率。

通过使用文档分片和LSM树，基于SQL的实时数据库可以摄取和存储大量数据，并在几秒钟内使其可用。

- 误区 2：SQL 数据库无法处理流数据不断变化的架构
这个神话也是基于对SQL数据库的过时看法。

确实，所有 SQL 数据库都要求数据结构化或以架构的形式进行组织。过去，SQL 数据库需要提前定义这些架构。任何引入的数据都必须完全符合架构，因此需要 ETL（提取、转换、加载）步骤。

但是，流数据通常以JSON，Avro或Protobuf的形式到达原始和半结构化。这些流还会不断提供可能与现有架构不兼容的新字段和数据列。这就是为什么传统刚性 SQL 数据库无法引入原始数据流的原因。

但是，一些较新的 SQL 数据库可以通过动态检查数据来引入流数据。它们检查半结构化数据本身，并从中自动构建架构，无论数据嵌套程度如何。

数据类型是流数据和 SQL 数据库的另一个看似障碍。作为其对模式的承诺的一部分，SQL要求数据是强类型的 - 每个值都必须分配一个数据类型，例如整数，文本字符串等。强数据类型有助于防止在查询中混合使用不兼容的数据类型并生成不良结果。

传统的 SQL 数据库在创建数据表/架构时为其中的每一列分配数据类型。与架构的其余部分一样，数据类型将是静态的，永远不会更改。这似乎排除了原始数据馈送，其中数据类型由于其动态性质而不断变化。

但是，有一些实时 SQL 数据库支持的更新方法，称为强动态类型。这些数据库仍然为所有数据分配数据类型，但现在它们可以在极其精细的级别上执行此操作。与其仅仅为整列数据分配相同的数据类型，不如为单个列中的每个值分配自己的数据类型。仅仅因为SQL是强类型的并不意味着数据库必须是静态类型的。编程语言（PL）已经表明，强大的动态类型是可能的和强大的。PL编译器和运行时的许多最新进展证明它们也可以非常高效;看看近年来V8 Javascript引擎的性能提升！

并非所有较新的 SQL 数据库在支持半结构化实时数据方面都一致。某些数据仓库可以提取 JSON 文档数据并将其分配给不同的列。但是，如果检测到单个 null 值，则操作将失败，从而强制数据仓库将文档的其余部分转储到单个通用的“其他”数据类型中，该数据类型速度慢且不便于查询。其他数据库甚至不会尝试对半结构化数据流进行架构化，而是将整个引入的文档转储到具有一种数据类型的单个 blob 字段中。这也使它们变得缓慢且难以查询。

- 误区 3：SQL 数据库无法在不影响查询的情况下扩展写入
这仍然是另一个过时的神话，对新的实时SQL数据库来说是不真实的。传统的本地 SQL 数据库将用于引入和查询数据的资源紧密耦合。这意味着，每当数据库同时扩展读取和写入时，就会产生争用，从而导致两个函数都发生拖累。解决方案是过度配置硬件，但这既昂贵又浪费。

因此，许多人转向基于NoSQL的系统，如键值存储，图形数据库等大数据工作负载，而NoSQL数据库因其在处理海量数据集方面的表现而受到赞誉。事实上，NoSQL数据库也存在与传统SQL数据库相同的争用问题。用户只是没有遇到它，因为大数据和机器学习往往是面向批处理的工作负载，数据集的摄取远远早于实际查询。事实证明，当NoSQL数据库集群尝试同时读取和写入大量数据时，它们也容易受到速度变慢的影响。

新的云原生SQL数据库服务通过将用于引入的资源与用于查询的资源分离来完全避免此问题，从而使公司可以同时享受快速的读写速度以及复杂分析查询的强大功能。最新的提供程序显式设计其系统以分离引入函数和查询函数。这完全避免了资源争用问题，并且如果另一个缩放，读取或写入速度不受影响。

- 总结
SQL数据库已经走过了漫长的道路。最新的产品将SQL久经考验的强大功能和效率与NoSQL的大规模功能以及云原生技术的灵活可扩展性融为一体。尖端的 SQL 数据库可以使用最新的数据提供实时分析。可以同时运行许多复杂的查询，并且仍然可以立即获得结果。也许是最被低估的功能：SQL在数据工程师和开发人员中的持久流行使其成为公司最务实的选择，因为它实现了从批处理到实时分析的飞跃。

### 3.Tip:

#### spring 启动错误 Singleton bean creation not allowed while the singletons of this factory are indestruction

原因分析：
单例的bean在创建的时候，容器已经处于销毁阶段，生命周期不同，不允许再次创建生产 Bean。
为什么会发生这个问题呢？是因为任务提交给了线程池，具体看代码：

```java
@Test
public void testReconcile(){
    sapReconcile.reconcile("123",2);
}

public TRResponse reconcile(String taskId, int type) {
    log.info("当日对账处理|taskId:{}, type:{}, startTime:{}", taskId, type, DateUtil.getNowStr());
    List<Long> times = getReconcileTime(type);
    executor.execute(() -> sapPaydetailClean(times.get(0),times.get(1)));
    executor.execute(() -> paydetailClean(times.get(0),times.get(1)));
    log.info("当日对账处理|endTime:{}", DateUtil.getNowStr());
    return new TRResponse().setCode(ResponseCodeEnum.SUCCESS.getCode());
}
```

解决方案：
测试用例中增加线程池的任务判断，如果有线程池任务未完成，当前主线程阻塞。
利用屏障等同步工具，等待线程执行完成后再退出主线程。

```java
@Test
public void test2(){
    sapReconcile.reconcile("123",2);
    while (sapReconcile.executor.getActiveCount() > 0){
        try {
            Thread.sleep(500);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
```

#### springmvc 拦截器拦截静态资源
springmvc 拦截器 interceptors 能够对请求的资源路径进行拦截，极大的简化了拦截器的书写。
但是，千万千万要注意一点：静态资源的放行。上代码：

```xml
<mvc:resources mapping="/resources/**" location="/static/resources" />
<mvc:resources mapping="/static/css/**" location="/static/css/" />
<mvc:resources mapping="/static/images/**" location="/static/images/" />
<mvc:resources mapping="/static/js/**" location="/static/js/" />

<mvc:interceptors>
    <!-- 使用bean定义一个Interceptor，直接定义在mvc:interceptors根下面的Interceptor将拦截所有的请求 
    <bean class="com.myTree.interceptor.LoginInterceptor" />-->
    <mvc:interceptor>
         <mvc:mapping path="/**" />
         <!-- 需排除拦截的地址 -->  
         <mvc:exclude-mapping path="/Login"/>  
         <mvc:exclude-mapping path="/login"/>  
         <mvc:exclude-mapping path="/sattic/**"/>  
         <!-- 定义在mvc:interceptor下面的表示是对特定的请求才进行拦截的 -->
         <beans:bean class="com.myTree.interceptor.LoginInterceptor" />
    </mvc:interceptor>
</mvc:interceptors>
```

问题分析: 在请求 jsp 页面的时候，静态资源的访问仍然会被自定义拦截器拦截，这会导致程序运行的效率大大下降，还会不停的跳转到拦截器的逻辑。
主要原因是

```xml
<mvc:mapping path="/**" />
```

会对所有的请求资源进行拦截，虽然静态资源已经排除了，但还是会被拦截到。

解决方案：
三种方式：
1、修改请求的url地址。
如果请求的 url 地址都是以 \*.do 结尾，那么拦截器中的配置可以变为拦截以 do 结尾的资源，静态资源自然就不会被拦截到了；
2、在自定义拦截器中对资源进行判断，如果满足需要排除的资源，就进行放行。

```xml
<!-- 拦截器配置 -->  
<mvc:interceptors>  
  <!-- session超时 -->  
  <mvc:interceptor>  
    <mvc:mapping path="/*/*"/>  
    <bean class="com.myTree.interceptor.LoginInterceptor">
      <property name="allowUrls">  
        <list>  
          <!-- 如果请求中包含以下路径，则不进行拦截 -->  
          <value>/login</value>  
          <value>/js</value>  
          <value>/css</value>  
          <value>/image</value>  
          <value>/images</value>  
        </list>  
      </property>  
    </bean>  
  </mvc:interceptor>  
</mvc:interceptors>  
```

```java
/** 
 * 处理登录拦截器 
 */  
public class LoginInterceptor  implements HandlerInterceptor{  
      
    public String[] allowUrls; // 还没发现可以直接配置不拦截的资源，所以在代码里面来排除  
      
    public void setAllowUrls(String[] allowUrls) {  
        this.allowUrls = allowUrls;  
    }  
  
    @Override  
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
    String requestUrl = request.getRequestURI().replace(request.getContextPath(), "");    
        System.out.println(requestUrl);  
        if(null != allowUrls && allowUrls.length>=1){  
            for(String url : allowUrls) {    
                if(requestUrl.contains(url)) {    
                    return true;    
                }    
            }
    }
}
```

3、设置 web.xml 中的默认拦截器，不拦截静态资源
 在 springmvc 的 Dispatcher 中配置 <mvc:default-servlet-handler /> 一般 Web 应用服务器默认的 Servlet 名称是 "default"，所以这里我们激活 Tomcat 的 defaultServlet 来处理静态文件，在 web.xml 里配置如下代码即可

```xml
<!--　该servlet为tomcat,jetty等容器提供,将静态资源映射从/改为/static/目录，如原来访问　http://localhost/foo.css　,现在http://localhost/static/foo.css　-->  
<!-- 不拦截静态文件 -->  
<servlet-mapping>
    <servlet-name>default</servlet-name>  
    <url-pattern>/js/*</url-pattern>  
    <url-pattern>/css/*</url-pattern>  
    <url-pattern>/images/*</url-pattern>  
    <url-pattern>/fonts/*</url-pattern>  
</servlet-mapping>
```

### 4.Share:

- [基于ck+redash构建MySQL慢日志+审计日志展示平台](https://www.modb.pro/db/449423)

- [Mysql专栏 - 线上调优与压力测试](https://www.modb.pro/db/324039)
