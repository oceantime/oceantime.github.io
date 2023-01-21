---
> **ARTS-week-04**
> 2023-01-21 20:14
---


## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm： 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

- [1814. 统计一个数组中好对子的数目](https://leetcode.cn/submissions/detail/395788029/)  
    + 思路：哈希表
- [1817. 查找用户活跃分钟数](https://leetcode.cn/submissions/detail/396378308/)  
    + 思路：哈希表
- [1824. 最少侧跳次数](https://leetcode.cn/submissions/detail/396532855/)  
    + 思路：BFS

### 2.Review:

[One API, Many Facades?](https://www.infoq.com/articles/api-facades/)

#### 点评：

Web API 领域正在出现一个有趣的趋势，各种工程师和公司倡导为每个具有特定需求的消费者提供专用 API。想象一下这样一个世界：的系统不仅需要公开一个用于 iOS、一个用于 Android 的 API、一个用于网站和一个用于 AngularJS 应用程序前端的 API，还需要为各种机顶盒和异国情调的移动平台或调用的 API 的第三方公司公开 API。除了 API 的任何理想设计之外，现实还反击了不同 API 使用者的具体和不同的关注点。可能需要相应地优化的 API。

#### 体验接口
在 InfoQ 上，Jérôme Louvel（Restlet 的首席极客和联合创始人）采访了 Daniel Jacobson（Netflix 边缘工程副总裁），讨论了 Netflix 的体验 API 和短暂的 API。Daniel 的团队负责处理全球设备上视频注册、发现和播放的所有流量。借助体验 API 的概念，Netflix 创建了特殊的 API 来处理给定请求代理的优化响应。借助临时 API，Netflix 工程师可以迭代转换并改进这些体验 API。

体验 API 的目标是解决 Netflix 在数十种具有不同特征的设备上将其平台扩展到超过 6000 万消费者时遇到的问题。提供此类专用 API 使 Netflix 能够在所有设备上提供最佳的用户体验，并根据设备的屏幕尺寸优化带宽，以减少延迟和数据消耗。它让 Netflix 工程师能够独立于核心后端团队，使用自己的版本控制方案和编排自己的部署，快速且独立于核心后端团队。

在 Netflix，专门的团队负责这些体验 API。不是中央或核心 API 团队负责为每个可能的客户端派生的所有 API。没有多少公司拥有与 Netflix 相同的规模，仅仅因为 Netflix 为所有 API 消费者构建专用 API，并不意味着它对自己的环境有意义。对于小商店来说，维护和发展过多的 API 前端可能是无效的，甚至是反模式的，因为成本会相当高。Netflix 必须构建一个特殊的 API 平台来支持这种方法。

#### 微服务架构

随着基于微服务的架构的趋势，API 网关或 API 门面正在复兴。的体系结构分散在几个小型服务中，需要具有负责向使用者公开 API 的前端服务。因此，通过拥有许多微服务，还可以为消费者提供多个门面，这并不奇怪。

网关或门面将允许使用者只进行一次调用，而不是强制使用者对多个基础微服务进行多次调用。对于 API 使用者来说，仅此一项就更容易，并且随着利用缓存（因为仍需要进行多次调用）、应用安全问题（身份验证、授权）或实施规则（速率限制、IP 过滤）的更智能网关或门面，好处就会增加。API 提供程序可以控制使用者如何使用其 API。

来自供应商或内部构建的网关（如 Netflix）也增加了互补价值，如边缘服务（公司 DMZ 中的 API 基础设施可以以新颖有趣的方式使用，例如 Netflix 如何使用 Zuul 实现多区域弹性）或流水线或过滤器链接（有助于提取横切关注点并实现企业范围的模式）。

#### 前端的后端

在最近的一篇文章中，Sam Newman 将这种专用消费者 API 的方法视为一种名为“前端后端”（BfFs） 的模式。可以拥有多个 BfF，而不是所有客户端的通用 API：一个用于 Web 前端，一个用于移动客户端（甚至一个用于 iOS，一个用于 Android）等等。

SoundCloud 采用了 BfF 模式，iOS 平台，Android 平台，网站和 Web 嵌入的 API 前端。与 Netflix 的情况一样，当有专门的团队负责这些前端时，这种技术似乎效果最好。如果你只有一个团队负责后端及其API，你最好不要为不同的消费者使用大量的变体来超载它们。

回到微服务，BfF 对于迁移也很有意义：将单体迁移到微服务时，一个 BfF 可以调用单体，而其他 BfF 可以调用新的微服务，遵循 Strangler 模式，在该模式中，可以逐步摆脱旧代码以采用更新的演变。

整体架构很复杂，很容易积累技术债务，并且同时混合了太多问题，而微服务可帮助一次专注于一个特定问题。但微服务架构也有缺点。你必须操作和编排它们，它们可能必须以与一个大整体不同的速度发展。维护此类分布式系统中所有服务之间的一致性也不容易。由于通信延迟，许多微服务之间的通信可能会引入额外的延迟。围绕每个微服务的数据重复和非规范化的共识也可能使数据管理和一致性复杂化。微服务不是免费的午餐，你可以通过 Vijay Alagarasan 的反模式文章或 Tareq Abedrabbo 的“微服务的7大罪”阅读更多关于微服务反模式的信息。

选择使用体验 API 或 BfF 的决定性因素很可能是是否有专门的团队。如果很小，只有一个团队负责后端和前端或边缘 Web API，那么处理许多变体（考虑维护成本）可能会更复杂，但如果足够大，团队可以更轻松地拥有这些前端 API 并按照自己的节奏发展它们。

#### 作为团队通信模式的 API
虽然公司是按团队组织的，但我看到越来越多的实例，开发人员被分为前端开发人员（无论是 Web 还是移动）和后端开发人员，他们实现了Web或移动设备所需的 API。Web API 已成为项目交付方式的核心：API 是将不同团队绑定在一起并允许他们高效协作的合同。

在开发将被其他人使用的 API 时，重要的是不要破坏该契约。通常，框架和工具允许从代码库生成 API 定义 — 例如，使用注释驱动的方法，使用注释标记终结点、查询参数等。但有时，即使你自己的测试用例仍然通过，最小的代码重构也很可能会破坏契约。的代码库可能没问题，但重构可能会破坏 API 使用者的代码。为了更有效地协作，请考虑采用 API 协定优先的方法，并确保实现仍符合共享协议：API 定义。现在有不同的 API 定义语言可用和流行，如 Swagger（开放API规范），RAML 或 API 蓝图。选择一个你觉得舒服的。

使用 API 定义有几个优点。首先，它应该使破坏兼容性变得更加困难，因为的实现必须符合 API 定义。其次，API 定义在工具方面非常完善。从 API 定义中，可以生成客户端 SDK，API 使用者可以将这些 SDK 集成到其项目中以调用的 API，甚至可以生成服务器框架以生成服务的初始实现。还可以创建 API 的模拟，开发人员可以在构建底层 API 时轻松调用这些模拟，而无需处理 API 生产者和使用者的不同开发周期。每个团队都可以按照自己的节奏工作！但是，这不仅与代码或兼容性有关，还与文档有关。API 定义语言在记录 API 时也有帮助，它提供了很好的生成文档，显示各种端点、查询参数等，以及（有时）提供交互式控制台，允许轻松创建对 API 的调用。

#### 针对不同使用者的不同有效载荷
采用 API 契约优先的方法当然很有帮助并提供好处，但是当不同的客户端有不同的 API 需求时，能做什么？特别是，如果没有专门的团队来拥有不同的 API 门面，那么如何让的 API 满足所有 API 使用者的需求？

在最近一篇关于 InfoQ 的文章中，Jean-Jacques Dubray 解释了他为什么停止使用MVC框架。在介绍中，他解释了移动或前端开发人员如何经常要求针对其 UI 需求量身定制 API，而不管底层业务概念的合理数据模型如何。Dubray 描述的状态-操作-模型 （SAM） 模式很好地支持 BfF 方法。SAM 是一种新的响应式功能模式，它通过明确分离业务逻辑和效果来简化前端架构，特别是将后端 API 与视图分离。由于状态和模型与操作和视图是分开的，因此操作可以特定于给定的前端，也可以根本不显示：由决定将光标放置在哪里。还可以从中央后端或这些中间立面生成状态表示或视图。

网站或单页应用程序可能需要显示产品及其所有评论的详细视图，但移动设备可能只会显示产品详细信息及其评级，让移动用户点击以加载评论。根据 UI，流、可用操作、详细级别和检索的实体可能会有所不同。通常，由于连接和带宽限制，希望减少在移动设备上检索数据的 API 调用次数，并且希望返回的有效负载仅包含所需的内容，仅包含其他内容。但这对 Web 前端来说并不重要，使用异步调用，完全可以懒惰地加载更多内容或资源。无论哪种情况，API 都应该快速响应，并具有良好的服务级别协议。但是，向不同的消费者提供多个自定义 API 有哪些选择？

#### 特定终结点、查询参数和字段筛选
一种基本方法可能是提供不同的端点（/api/mobile/movie vsus/api/web/movie），甚至只是查询参数（/api/movie？format=full 或/api/movie？format=mobile），但也许有更优雅的解决方案。

与查询参数类似，的 API 可能能够通过让使用者决定他或她想要哪些字段来自定义返回的有效负载，例如：/api/movie？fields=title、kind、rating，or/api/movie？exclude=actor。

通过字段过滤，还可以决定是否要在响应中获取相关资源：/api/movie？include=actor.name。

#### 自定义 MIME 媒体类型
作为 API 的实现者，有多种选择。可能决定根本不提供任何自定义！消费者要么必须使用提供的产品，要么将的 API 包装在他们自己的门面中，他们已经在其中构建了他们想要的自定义。但是，既然你是一个伟大的人，你可以为他们提供个人资料：你可以对媒体类型进行创意，并根据消费者要求的媒体类型提供更精简或更丰富的有效载荷。例如，如果你看一下GitHub API，你会注意到这样的类型：application/vnd.github.v3.full+json。

除了提供整个有效负载和相关实体的“完整”配置文件外，还可以提供“移动”变体，也许也可以提供“最小”变体。

API 使用者进行调用，请求最适合他/她的用例的媒体类型。


#### 首选标头
Irakli Nadareishvili 写了一篇关于 API 中客户端优化资源表示的文章，提到了一个鲜为人知的标头字段：Preferred 标头 （RFC 7240）。

与自定义媒体类型一样，客户端将使用首选标头请求特定配置文件：使用首选：返回=移动将使 API 回复自定义有效负载和标头首选项应用：返回=移动。请注意，“Vary”标头还应提及“首选”标头可用。

根据你（API 开发人员）是否希望负责决定支持哪种有效负载，你可能喜欢自定义媒体类型、首选标头或专用终结点。如果要让客户端更明确地决定要检索的字段和关系类型，可以选择字段筛选或查询参数。


#### GraphQL
通过其 React 视图框架，Facebook 向开发人员介绍了 GraphQL。在这里，消费者可以完全控制他们将收到什么：字段和关系。使用者发出一个调用，指定返回有效负载的门面：
```
{
  user(id: 3500401) {
    id,
    name,
    isViewerFriend,
    profilePicture(size: 50)  {
      uri,
      width,
      height
    }
  }
}
```
API 应使用以下有效负载进行回复：
```json
{
  "user" : {
    "id": 3500401,
    "name": "Jing Chen",
    "isViewerFriend": true,
    "profilePicture": {
      "uri": "http://someurl.cdn/pic.jpg",
      "width": 50,
      "height": 50
    }
  }
}
```
GraphQL 同时是一个查询，也是希望此查询的答案是什么的描述。GraphQL 让 API 消费者完全控制他们将获得的回报，提供最高水平的灵活性。

OData 等规范中也存在类似的方法，它允许你使用 $select、$expand 和 $value 参数自定义有效负载。但 OData 并没有真正流行起来，可能处于被抛弃的边缘; Netflix 和 eBay 不久前停止支持 OData。也就是说，微软和 SalesForce 等其他参与者仍然支持它。

#### 超媒体接口
最后一个要探索的选项是超媒体 API。在考虑超媒体 API 时，通常会想到所有其他超链接，这些超链接会使响应混乱，并且很容易使有效负载大小翻倍。有效负载大小和呼叫数量对移动设备非常重要。尽管如此，通过 HATEOAS（超媒体作为应用程序状态的引擎）来考虑超媒体是很重要的，这是 REST API 的核心原则，经常被忽视。这是关于 API 提供的功能。消费者将可以访问相关资源，但通过这些超媒体关系提供的链接也可以是关于提供不同的配置文件可供选择，例如：
```json
{
    "_links": {
        "self": { "href": "/movie/123" },
        "mobile": { "href": "/m/movie/123" },
    }
}
```
此外，某些超媒体方法完全接受嵌入相关实体的概念。Hydra、HAL 和 SIREN 提供了嵌入子实体的功能，以便可以检索特定电影以及该电影中所有演员的嵌入式列表。

在一篇关于如何选择超媒体格式的文章中，Kevin Sookocheff 举了一个例子，展示了访问“玩家的朋友列表”资源如何嵌入这些朋友的实际表示，而不仅仅是链接到这些单独的资源，从而消除了对每个朋友资源的调用：
```json
{
  "_links": {
    "self": { "href": 
        "https://api.example.com/player/1234567890/friends" 
    },
    "size": "2",
    "_embedded": { 
      "player": [
        { 
          "_links": { 
            "self": { "href":
                "https://api.example.com/player/1895638109" },
            "friends": { "href": 
                "https://api.example.com/player/1895638109/friends" }
          },
          "playerId": "1895638109",
          "name": "Sheldon Dong"
        },
        { 
          "_links": { 
            "self": { "href": 
              "https://api.example.com/player/8371023509" },
            "friends": { "href": 
                "https://api.example.com/player/8371023509/friends" }
            },
            "playerId": "8371023509",
            "name": "Martin Liu"
      }
    ]
  }
}
```

#### 总结
Web API 越来越多地具有具有不同需求的多种使用者。微服务架构可以鼓励我们为这些需求部署细粒度的 API 门面（所谓的体验 API 或 BfF 模式），但如果你有太多不同的消费者需要取悦，这可能会成为一种反模式，特别是如果你只有一个小团队来处理所有这些前端。

一定要算一算！在走一种或另一种方式之前，必须研究的选择的成本以及是否可以支持它们。创建 API 的不同变体对实施者和使用者都有成本，这取决于所采用的策略。此外，一旦你释放了你的 API 并将其提供给它的消费者，也许也是时候重新思考和重构这个 API，因为也许你在设计阶段没有充分考虑这些特殊的设备或消费者需求。

如果有专门的团队负责这些 API 门面，那么这是一个可以考虑的选项。当没有这种奢侈时，还有其他方法可以为消费者自定义有效负载，而不会产生复杂性，从简单的技巧（如字段过滤或首选标头）到成熟的解决方案，如自定义媒体类型或规范，如 GraphQL。

但是你不一定需要开枪，可以选择中间道路：一个主要的、完整的API，加上一两个移动设备的变体，你可能会满足所有消费者的要求。考虑包括少量字段过滤，每个人都会对的 API 感到满意！

### 3.Tip:

#### Linux系统中的最大进程数，最大文件描述，最大线程数
1.Linux系统中最大可以起多少个进程？
（1）32位系统中最多可以起32768个进程
（2）64位系统中最多可以起2的22次方（4194304）约420万个
如何查看linux系统默认的最大进程数，这里以centos7(x64)作为例子:
```shell
# cat /proc/sys/kernel/pid_max
131072
# ulimit -a | grep processes
max user processes        (-u) 15012
# cat /proc/1/limits | grep processes
Max processes      15012    15012  processes
```
上面使用了三种方法：
注意第一种才是内核级别的配置，后面的设置不能超过内核级别设置的限制，这个值是可以具体的情况修改的，centos7（x64）给的还是比较大，在centos6好像给的是32768

2.Linux系统中的最大文件描述符？
文件描述符定义：

文件描述符在形式上是一个非负整数。实际上，它是一个索引值，指向内核为每一个进程所维护的该进程打开文件的记录表。当程序打开一个现有文件或者创建一个新文件时，内核向进程返回一个文件描述符

关于文件描述符的最大数量，其实是可以无限大的，但考虑到每一个文件描述符都需要一定数量的内存和磁盘维护，所以还是有限制的，另外一个问题，为什么linux系统要限制文件描述符的数量？

原因有两方面：
（1）系统本身的资源有限
（2）比如一个机器有多个用户，如果没有限制，某一个用户起了无限多的进程和无休止的创建文件描述符，就直接有可能导致整台机器挂掉，影响了其他正常的用户的使用，所以还是有必要给不同的用户根据所需限制文件描述的数量，避免一定程度上的fork bomb的问题出现。
下面看几个关于文件描述符的命令：
```shell
# cat /proc/ss/fs/file-max
379804
# ulimit -n
65536
# lsof | wc -l
2201 
```
第一个命令代表：当前系统允许创建的最大文件描述符的数量
第二个命令代表：当前会话session的允许创建的最大文件描述符，默认每个进程允许打开的最大文件描述符数量应该是1024
第三个命令代表：统计当前所有进程的占用的文件描述符的总量

查看每个进程打开的文件描述符的数量，并按打开的数量降序排序：
```shell
# lsof -n | awk '{print $2}'|sort|uniq -c|sort -nr
306 637
261 651
130 1112
117 650
...
```
第一列是文件描述符数量，第二列是进程id

3.Linux系统中的最大线程数量
其实最大线程数量也可以配置无限大，在资源充足的情况下，但一般都有会默认限制，主要影响线程的参数如下：
```shell
ulimit -s 栈大小设置
ulimit -i 阻塞的引号量
ulimit -u 最大的线程/进程数
/proc/sys/kernel/threads-max 最大线程数量
/proc/sys/vm/max_map_count 限制一个进程可以拥有的VMA(虚拟内存区域)的数量
/proc/sys/kernel/pid_max 最大进程数量
```

#### how-to-convert-fileinputstream-into-string-in-java

```java
public static String getFileContent(FileInputStream fis, String encoding) throws IOException {
   try( BufferedReader br = new BufferedReader( new InputStreamReader(fis, encoding ))) {
      StringBuilder sb = new StringBuilder();
      String line;
      while(( line = br.readLine()) != null ) {
         sb.append( line );
         sb.append( '\n' );
      }
      return sb.toString();
   }
}
```

#### Optional 乱用 Empty 之 No value present 
API 返回失败，没有描述原因。看着蛋疼，因为公开的 API 不方便返回错误详情。于是查 log，发现错误日志的 message 为：No value present。没搞清楚这个错误信息是哪一层跑出来的。需要进一步跟踪。A=>B=>C=>D，一直追踪到C层才找到问题。

问题代码如下：
```java
public FieldBuilder withSubcategoryId(Optional<String> id) {
    this.id = id.get();
    return this;
}
```
这是一个创建工厂类，负责创建一个可以使用对象。所有的字段都采用了Opetional的包裹。这个是对象，理应不包含业务逻辑，应该没有错误异常。如果有异常应该显式的throws出来，不然这个非检查性异常将在出现bug的时候难以定位。而这里确实有一个异常没有捕获，而且也不能保证不会发生，甚至就是这里引起的bug:java.util.Optional#get

源码如下：
```java
/**
 * If a value is present in this {@code Optional}, returns the value,
 * otherwise throws {@code NoSuchElementException}.
 *
 * @return the non-null value held by this {@code Optional}
 * @throws NoSuchElementException if there is no value present
 *
 * @see Optional#isPresent()
 */
public T get() {
    if (value == null) {
        throw new NoSuchElementException("No value present");
    }
    return value;
}
```
虽然没有显式的抛出异常，但在javadoc中写清楚了会出现的问题。而我们这些新手则没有认真看文档就想当然的采用了。以为当内容为null的时候get出来的还是null。

Find Uage找这个Builder的用法发现：
```java
new FieldBuilder().withSubcategoryId(Optional.ofNullable(entity.getSubcategoryId()))
```
这里直接使用了Optional.OfNullable。然而，我们知道在下一步中会调用get，get的时候回判断是否是null，null会抛出异常。这简直就是自己挖坑，写一个条件抛异常，而传参数又专门去符合这个条件。前面也没有校验，外面也没有捕获异常，最终导致异常直接一路抛出到API外层去了。Optional不要滥用，Optional不是安全的随便用的，Optional用的时候记得捕获异常。

### 4.Share:

[Alibaba Sentinel RESTful 接口流控处理优化](https://toutiao.io/posts/3gcxlk/preview)  

[Sentinel-流量防卫兵](https://www.cnblogs.com/wlandwl/p/sentinel.html)

[ElasticSearch--写入数据的流程(原理) ](https://blog.51cto.com/knifeedge/5684856)

[用图讲解 ElasticSearch 搜索原理，你就明白了！](https://zhuanlan.zhihu.com/p/242368593)

[10张图理解Elasticsearch核心概念](https://ost.51cto.com/posts/13361)

[elk 默认分片只有1000导致新索引没有创建](https://www.tielemao.com/1454.html)

[好奇？！Elasticsearch 25 个必知必会的默认值](https://cloud.tencent.com/developer/article/1638738)

[《Elasticsearch 源码解析与优化实战》第12章：allocation模型分析](https://cloud.tencent.com/developer/article/1829016)

[百亿级实时计算系统性能优化–—Elasticsearch 篇](https://www.infoq.cn/article/hRIWI6JdRsxoMbP4vGdE)
