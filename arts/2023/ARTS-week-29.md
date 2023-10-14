---
> **ARTS-week-29**
> 2023-07-15 9:48
---


## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm: 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

- [931. 下降路径最小和](https://leetcode.cn/submissions/detail/446528968/)  
    + 思路：DP
- [979. 在二叉树中分配硬币](https://leetcode.cn/submissions/detail/446830315/)  
    + 思路：二叉树
- [18. 四数之和](https://leetcode.cn/submissions/detail/447099112/)  
    + 思路：双指针

### 2.Review:

[每天使用简单的流处理器结构化 450M 文档](https://underthehood.meltwater.com/blog/2019/08/26/enriching-450m-docs-daily-with-a-boring-stream-processor/)

对于我们的fairhair.ai平台，我们每天结构化超过 4.5 亿个文档，例如新闻文章和社交帖子，以及包含 20 多个 NLP 语法和语义结构化任务的依赖树。我们将这些文档作为连续数据流引入，并保证在引入后 5 分钟内交付扩充文档。

这一技术壮举需要两个专业团队之间的密切合作：数据科学和平台工程。使两个团队能够围绕一个通用的工作流执行引擎高效协作是我们需要解决的另一个问题。

#### 1、处理环节太多

fairhair.ai 的某些组件由各个团队拥有。数据科学团队拥有扩充的所有权，这些扩充以 HTTP 服务的形式编写，以便轻松部署和精细的水平扩展。平台工程团队拥有生产流管道的所有权，使用 Kafka 作为消息总线。

[](./images/ARTS-week-29-1.png)

这种责任分工提供了一定的自主权。但是，工作流执行引擎的逻辑需要由多个团队共享。扩充通常是根据其他扩充的结果（例如，基于语言检测选择的情感分析类型）来选择的，有些具有针对某些类别的文档（例如长篇编辑文本与社交文本）量身定制的风格，使其成为一个庞大而繁琐的管理系统。

我们的数据科学家最有能力描述组件之间不断发展的依赖关系树，以及确定哪种扩充风格适合每种文档类型的逻辑。我们的平台工程师拥有调整工作流程所需的专业知识，以最大限度地提高性能、可观测性和弹性。

我们还需要多次部署引擎，每次部署都根据特定团队的要求量身定制。我们的平台工程师最终负责将生产引擎作为流处理组件运行，从 Kafka 到 Kafka。但是，我们的数据科学团队还需要定期运行它以进行模型改进、指标评估和集成测试，通常是在自定义训练和黄金标准数据集上，通常是从 S3 到 S3。

因此，我们需要一个足够简单的工作流引擎，无论其编程技能如何，任何人都可以做出贡献，并且功能强大到足以满足我们复杂的工作流程。它还需要足够灵活，以便任何团队都可以根据需要进行部署，并具有满足生产中的扩展和弹性要求所需的性能。

#### 2、工作流引擎

我们对这个问题的解决方案是使用Benthos，这是一个流处理器，专注于通过将复杂任务分解为简单的无状态操作来解决复杂任务，以 YAML 文件表示。它的目标是成为流处理管道的坚实而无聊的基础。

可以在docs.benthos.dev/workflows 阅读有关Benthos工作流程的完整指南。总之，它能够自动解析我们工作流阶段的有向无环图 （DAG），前提是它们表示为process_map处理器。

对于每个阶段，我们定义一个映射，用于提取与目标扩充相关的源文档部分，然后是执行扩充的处理阶段。最后，我们还定义了一个映射，将扩充结果放回源文档中。我们还可以选择定义条件来确定文档是否适合该阶段。

下面是我们的一个扩充目标示例，表示为流程中的一个步骤：
```
basics:
  premap:
    id: id
    language: tmp.enrichments.language.code
    title: body.title.text
    body: body.content.text
  processors:
  - http:
      parallel: true
      request:
        url: http://<address_of_the_enrichment>/enrich
        verb: POST
        headers:
          Content-Type: application/json
        backoff_on: [ 429 ]
        drop_on: [ 400 ]
        retries: 3
  postmap:
    tmp.enrichments.basics: .
```
根据这个定义，Benthos能够确定任何改变部分路径的阶段都是其依赖项，并确保它们事先执行。同样，在命名空间中预先映射值的任何阶段都将被视为依赖于此阶段。tmp.enrichments.language.codebasicstmp.enrichments.basics

Workflow stages are parallelised by Benthos at runtime

工作流中的这些阶段由 Benthos 在运行时组织为层，其中层的阶段仅依赖于它们之前的层。每个层仅在预先完成层并且并行执行层的各个阶段后执行。

此保证允许这些工作流阶段的作者忽略整体流，而只关注手头的扩充。它还允许这个阶段的读者在其他阶段的上下文之外理解它。

最后，它清楚地概述了舞台的相关技术行为。在上面的例子中，我们可以一目了然地看到，一批文档是并行 HTTP 请求发送到目标扩充的，并且对于一个文档，我们最多重试三次（除非我们收到状态代码 400）。由于Benthos 处理器的强大功能，更新此阶段很容易，下面是一个差异，而是在单个请求中将批处理文档作为 JSON 数组发送：

[](./images/ARTS-week-29-2.png)


```
@@ -5,4 +5,6 @@ basics:
     body: body.content.text
   processors:
+  - archive:
+      format: json_array
   - http:
       parallel: true
@@ -15,4 +17,6 @@ basics:
         drop_on: [ 400 ]
         retries: 3
+  - unarchive:
+      format: json_array
   postmap:
     tmp.enrichments.basics: baz
```

在富集被聚合到命名空间后，我们有一个单独的过程，使用另一种称为IDML 的融水技术将它们映射到它们的最终结构中。tmp

##### 单元测试
我们的一小部分工作流步骤非常复杂，因此对其进行更改会带来重大风险。在这种情况下，Benthos 支持为我们的处理器定义单元测试。

然而，尽管这为我们提供了一定程度的保护，但它被认为是一个例外。使用 Benthos 的主要好处是保持这些步骤简单易懂。每当工作流阶段达到我们不满意的复杂程度时，我们就会退后一步，尝试简化扩充。

#### 3、托管部署和自定义部署

将所有这些逻辑保留在配置文件中，使我们能够使用与常规代码库相同的所有源代码控制和协作工具。这些配置位于中央存储库中，使用配置引用，我们可以将它们导入到特定于团队的部署配置中，让我们来看看它是如何工作的。

将我们的扩充配置导入到一个简单的 Kafka 到 Kafka 管道中，如下所示：

```
input:
  kafka_balanced:
    addresses:
      - exampleserver:9092
    topics:
      - example_input_stream
    consumer_group: benthos_consumer_group
    max_batch_count: 20

pipeline:
  processors:
    # Import our entire enrichment flow.
    - $ref: ./enrichments.yaml#/pipeline/processors/0

output:
  kafka:
    addresses:
      - exampleserver:9092
    topic: example_output_stream
```

对于希望针对存储在 S3 作为 JSON 文档存档中的数据集进行测试的数据科学家来说，它可能如下所示：.tar.gz

```
input:
  s3:
    region: eu-west-1
    bucket: example-bucket

pipeline:
  processors:
    - decompress:
        algorithm: gzip

    - unarchive:
        format: tar

    - $ref: ./enrichments.yaml#/pipeline/processors/0

    - archive:
        format: tar

    - compress:
        algorithm: gzip

output:
  s3:
    region: eu-west-1
    bucket: another-example-bucket
    # Upload with the same key as the source archive.
    path: ${!metadata:s3_key}
```

甚至可以将我们的扩充流部署为 HTTP 服务，这使解决方案工程师可以轻松地在一次性请求中针对自定义文档进行测试：

```
http:
  address: 0.0.0.0:4195

input:
  http_server:
    path: "/post"

pipeline:
  processors:
    - $ref: ./enrichments.yaml#/pipeline/processors/0

output:
  # Route the resulting payloads back to the source of the message.
  type: sync_response
```

Benthos 支持广泛的输入和输出，包括用于在输入和输出级别组合它们的代理。事实证明，这非常有用，因为我们经常有团队希望共享数据馈送，但依赖于不同的服务，在这种情况下，Benthos 可以轻松地跨队列系统桥接并偶尔重复馈送。

##### 可观察性

Benthos 会自动报告配置的组件的指标，并将其发送到选择的聚合器。下面是我们的一些扩充仪表板在Grafana 中的外观示例，显示延迟、吞吐量、状态代码等：

[](./images/ARTS-week-29-3.png)

这为我们提供了扩充性能的鸟瞰图，并允许我们针对 200 状态率下降、延迟激增等事件构建警报。

##### 错误处理
当出现问题并且扩充失败时，Benthos 提供了大量的错误处理机制，允许团队选择他们希望如何处理它们。在生产中，我们为失败的文档配置了一个死信队列，但在集成测试期间，我们的数据科学团队选择简单地记录错误。

### 结论

数据洞察的创新往往因未能在数据科学和工程之间建立强耦合而受到阻碍，从而导致部署尴尬和缺乏协作。然而，要正确实现这种耦合需要一个通用框架，使每个人都能专注于自己的专长。

我们发现 Benthos 在弥合这一差距方面非常有效。它使我们通用工作流程的部署民主化，允许团队在不影响他人的情况下破解自己的测试环境，从而实现持续创新。它还满足了我们对生产环境的所有技术要求。最后，也是最重要的一点，所有团队都可以轻松合作。

这是因为它能够公开使我们的管道独特的简单过程，同时解决更复杂的流问题，这些问题并非特定于我们开箱即用。因此，Benthos 对我们团队的生产力和平台的质量产生了巨大影响。


### 3.Tip:

#### Android禁止截屏的方法


1.第一种方法，也是网上搜到的最多的一种方法：

实现的方式就是在setContentView()方法前加上:

```java
getWindow().setFlags(LayoutParams.FLAG_SECURE, LayoutParams.FLAG_SECURE);
```

代码示例:

```java
@Override
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);
    getWindow().addFlags(WindowManager.LayoutParams.FLAG_SECURE);

}
```

这种方法的缺点是必须写在 onCreate 方法里面。


2.第二种方法：

```java
if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.HONEYCOMB) {
    getWindow().setFlags(WindowManager.LayoutParams.FLAG_SECURE, WindowManager.LayoutParams.FLAG_SECURE);
    Window window = getWindow();
    WindowManager wm = getWindowManager();
    wm.removeViewImmediate(window.getDecorView());
    wm.addView(window.getDecorView(), window.getAttributes());
}
```

这种方法使用起来相对于第一种方法会更灵活一些。 

3.第三种方法：

```java
getDialog().getWindow().setFlags(WindowManager.LayoutParams.FLAG_SECURE,
        WindowManager.LayoutParams.FLAG_SECURE);
```

### 4.Share:

[Python重要知识点梳理](https://zhuanlan.zhihu.com/p/511276180)

[SpringBoot自定义validation注解校验参数只能为指定的值](https://blog.csdn.net/weixin_44953227/article/details/118752844)

[Hibernate Validator 参数校验优雅实战](https://zhuanlan.zhihu.com/p/588464122)

[SpringBoot Validation参数校验 详解自定义注解规则和分组校验](https://blog.csdn.net/u011738045/article/details/118539706)