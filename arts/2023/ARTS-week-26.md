---
> **ARTS-week-26**
> 2023-06-22 10:39
---


## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm: 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

- [1262. 可被三整除的最大和](https://leetcode.cn/submissions/detail/440805809/)  
    + 思路：贪心
- [LCP 41. 黑白翻转棋](https://leetcode.cn/submissions/detail/441239501/)  
    + 思路：DFS
- [面试题 16.19. 水域大小](https://leetcode.cn/submissions/detail/441432568/)  
    + 思路：DFS

### 2.Review:

[实践中的真相发现 — 聚合冲突的数据源](https://underthehood.meltwater.com/blog/2020/01/20/truth-discovery-in-practice-aggregating-conflicting-datasources/)

如果一个消息来源说微软的总部位于西雅图，而另一个消息来源说它在旧金山，我们如何确定哪一个更合理？文献称之为真相发现或真实性问题。

在这篇博文中，来自我们知识图谱团队的 Andreas Klintberg 分享了 Fairhair.ai 如何使用 Truthfinder 算法融合来自数十个来源的数千个数据点，用于我们的知识图谱。

#### 1、真实性问题（真相发现）

Fairhair.ai 的愿景是通过结合使用 5 个先进的 AI 系统来利用各种在线资源的力量来呈现、构建、连接、理解、推理和获得可操作的见解。在 Fairhair.ai 知识图谱团队中，我们正在连接、清理和提炼来自不同来源的所有这些信息，以形成一个连贯的存储和视图。

所有这些数据点告诉我们每个实体的不同之处，有时是互补的，有时是相互矛盾的。在线资源在连贯性、可靠性和准确性方面各不相同。

我们的客户希望回答诸如“百事可乐公司在饮料领域的哪些竞争对手进行了最多的收购？

要回答这个问题，我们需要汇总与百事可乐公司及其竞争对手有关的所有信息。这些信息以非结构化格式提供，如维基百科、新闻文章、公司网站;和结构化来源，即DBPedia和维基数据。我们如何融合所有这些来源的信息以创建一个知识来源？[5].

这个问题通常被称为真实性问题或真相发现：来自一系列相互冲突的来源的信息是最准确的信息[1]。

在这篇文章中，我将向介绍结构化数据集成解决此问题的一种可能方法，并提供编码示例和解释。

#### 2、真相发现者

TruthFinder [1] 是一种试图在迭代过程中解决准确性问题的算法，类似于HITS 算法或 PageRank。然而，与HITS算法相比，它告诉随机步行者/冲浪者最终到达源头的几率，TruthFinder强调事实的正确性，而不是从该来源提供的事实数量[1，7]。

我们将从一个真实世界的数据集[2]开始，其中包含来自895个不同电子商务网站的1265本书和26554个作者属性。可以直接从这里下载。

##### 表示问题
这个问题最好像在论文中一样直观地表示，使用图形结构：

[](./images/ARTS-week-26-1.png)

其中w是来源，f是事实或属性，o是书籍或对象。不同的来源提供不同的事实，它们为不同的对象提供事实。所有这些事实都属于同一类型，它们都为书籍提供了作者。这是我们的图表，其中填写了一些实际的作者数据。

[](./images/ARTS-week-26-2.png)

##### 真相查找器算法假设

TruthFinder算法利用了一些潜在的假设/启发式方法：

- 对于对象的属性，只有一个真实事实——有时被称为“单真假设”[3]——我们将使用简化。
- （A）真实事实在不同的网站上是相同或相似的——真实事实在不同的来源通常是相似的。
- 不同网站上的虚假事实不太可能相同或相似——虚假事实通常比真实事实更随机。
- 在某个域中，为许多对象提供大部分真实事实的网站可能会为其他对象提供真实事实 — 类似于权威中心假设：一个好的中心表示指向许多其他页面的页面，一个好的权威代表一个由许多不同的中心链接到的页面。

可能会认为这些都是非常笼统的假设，并不总是正确的。但是，它们现在将作为一个足够好的假设。将这些假设浓缩为：

- 如果事实由（许多）值得信赖的网站提供，则具有很高的置信度。
- 如果一个网站以高置信度提供许多事实，那么它就是值得信赖的。

我们将介绍 TruthFinder 算法 [4] 中的 2 个主要步骤：

- 计算事实置信度分数
- 计算源可信度分数

重复此操作，直到可信度或事实置信度没有变化。

##### 探索数据

让我们首先将数据加载到Pandas中并显示前 10 行来探索数据。

[](./images/ARTS-week-26-3.png)

每本书都有一个唯一的 ISBN 标识符，我们将使用它来标识每本书，也称为“对象”。每个数据点都有一个来源、一个标题和一个作者属性字段。作者字段是我们试图协调并找到最准确值的事实或属性;哪些作者是特定书籍的正确作者。

此外，检查行重复项，包括 -

```java
sum(data.duplicates())
```

显示大量相同的行。让我们删除所有重复项，以便我们的结果不会扭曲。

```python
data = data.drop_duplicates()
```

#### 3、真相查找器步骤解释

让我们继续定义一些常量并初始化我们的源，以确保所有w（源）从 [1] 开始具有相等的可信度 0.9。

```python
max_iteration_count = 10
it = 0
error = 99
tol = 0.001
# intialize source trustworthiness structure
source_trustworthiness = {k: -np.log(1 - 0.9) for k in data['source'].unique()}
```

[](./images/ARTS-week-26-4.png)

我们继续使用 TruthFinder 算法的基本假设/启发式来定义迭代过程的一般结构。让我们定义到目前为止在 Python 中描述的迭代过程，将每个步骤定义为一个单独的函数，以便于实现。

```python
while error > tol and it < max_iteration_count:
    source_trustworthiness_old = copy.deepcopy(source_trustworthiness)

    # 1. Compute fact confidence score
    data = compute_confidence(data, objects, source_trustworthiness,   attribute_key)

    # 2. Compute source trustworthiness score
    source_trustworthiness = compute_source_trust(data, source_trustworthiness)

    # Check convergence of the process
    error = 1 - np.dot(list(source_trustworthiness.values()),
                       list(source_trustworthiness_old.values()) / (np.linalg.norm(list(source_trustworthiness.values())) *
                                                                    np.linalg.norm(list(source_trustworthiness_old.values()))))
```

别担心，我会引导完成每一步。

##### 计算事实置信度分数

有3个子步骤可以使用TruthFinder计算事实置信度。

[](./images/ARTS-week-26-5.png)

1.通过将提供该确切事实的源的所有源置信度分数相加来计算属性/事实置信度

[](./images/ARTS-week-26-6.png)

2.如果存在涉及类似事实，则通过添加到分数来调整置信度分数，但如果存在相互冲突的事实，则从分数中减去。

[](./images/ARTS-week-26-7.png)

3.处理事实的负概率和来源的独立性假设。向 S 形函数添加阻尼因子伽马。

[](./images/ARTS-week-26-8.png)

3个子步骤的实施和详细说明

- 1. 通过汇总提供该事实的来源的可信度日志来计算初始事实置信度。

```python
def compute_confidence(df, objects, source_trust, attribute_key):
    # compute claims confidence score

    all_objects_data = pd.DataFrame()
    for obj in objects:
        data = df[df['object'] == obj]

       # Sub-step 1. compute from source trust
       data, confidence = compute_confidence_score(data, source_trust, attribute_key)

        # Sub-step 2. similarity between claims
        data, confidence = compute_confidence_score_with_similarity(data, confidence, attribute_key)

        # Sub-step 3. compute the adjusted confidence
        data, confidence = compute_final_confidence(data, confidence)

        # concatenate all objects
        all_objects_data = pd.concat([all_objects_data, data])
    return all_objects_data
```

[](./images/ARTS-week-26-9.png)

在此步骤中，我们希望使用提供该特定事实的所有来源的源可信度之和来计算事实置信度。

因此，在我们的初始实例中，两个源提供乔治·卢格，并且初始状态都有0.9，这将计算如下。

```python
def compute_confidence_score(data, source_trust, attribute_key):
    '''
    compute the confidence score using the sources trust worthiness, sum the scores for all sources
    for a specific claim.
    '''
    # loop through each source for a book
    for idx, claim in data.iterrows():
        # get all sources for a specific claim
        sources = get_sources_for_claim(data, claim, attribute_key)
        # sum the trust score for all the sources for a specific claim
        ln_sum = sum([source_trust[src] for src in sources])
        # set the sum confidence for these facts
        data.at[idx, 'confidence'] = ln_sum

    confidence = data['confidence'].values
    return (data, confidence)
```

首先，我们希望获得所有同意特定事实的来源。两个消息来源声称“计算机编程艺术”的作者是“唐纳德·高德纳”。一个消息来源声称它是“D. Knuth”。将提供相同事实的所有来源的分数相加。请记住，在这个阶段，所有来源都具有相同的可信度，因此“Donald Knuth”将获得“D. Knuth”的两倍分数。

[](./images/ARTS-week-26-10.png)

σ（f） 就是所谓的置信度分数，它是通过求和 τ（w） 来计算事实不正确的负对数概率，即 W（F） 中所有来源的置信度分数 w。τ（w） 是源可信度的负对数概率。

[](./images/ARTS-week-26-11.png)

置信度 s（f） 的事实置信度分数西格玛

[](./images/ARTS-week-26-12.png)

来源可信度分数 tau，用于来源可信度

为什么这样定义这些？通常，计算事实置信度定义如下。

[](./images/ARTS-week-26-13.png)

这可能导致乘法中的下溢（∏是序列乘积的符号 [9]）。论文中给出了另一个原因：“假设有两个网站w1和w2，可信度t（w1）=0.9，t（w2）=0.99。我们可以看到 w2 比 w1 准确得多，但它们的可信度没有太大差异，因为 t（w2） = 1.1 × t（w1）。如果我们用可信度分数来衡量它们的准确性，我们会发现τ（w2）= 2×τ（w1），这更好地代表了网站的准确性。

假设两边都是对数，我们可以使用对数乘积规则来产生初始方程

[](./images/ARTS-week-26-14.png)

我们要做的最后一件事是使用此事实置信度分数更新 Pandas 数据帧和数据样本。

- 2. 使用与其他事实的相似性提高事实的置信度分数

[](./images/ARTS-week-26-15.png)

ρ 是一个介于 0–1 之间的数字，控制一个事实对另一个事实的影响。暗示函数imp（f' → f）是一个函数，例如返回事实f'和f之间的Levenshtein或Jaro Winkler相似性（字符串距离度量）。我使用了Jaro-Winkler，它往往更适合名字。

```python
sigma_f = 0.9 + 0.9 * ( 0.8*0.9 + 0.6*-0.3)
```

相似的事实可能涉及其他类似的事实;乔治，卢格暗示乔治卢格F，因为除了最后一个首字母外，名字是相同的。这种相似性函数是特定于域的，这意味着，它可以因不同的属性而有所不同。对于数值（如国家人口数字），两个值之间的差异可能足够好。

这个蕴涵函数的一个重要属性是，如果事实是冲突的，我们希望它是负的，我们通过减去一个基本相似常数来解决这个问题。

```python
def compute_confidence_score_with_similarity(data, confidence, attribute_key):
    '''
    Compute the confidence score of a claim based on its already computed confidence score
    and the similarity between it and the other claims.
    Then set the confidence value to this new confidence computed with similarity measure.
    '''
    # get unique facts for object
    facts_set = data[attribute_key].unique()
    # create fact : confidence dict
    facts_confidence = {x[attribute_key]: x['confidence'] for _, x in data.iterrows()}
    # create an ordered confidence array
    facts_array = np.array(list(facts_confidence.values()))
    # create a copy to assign new adjusted confidence values for
    new_facts_array = copy.deepcopy(facts_array)
    for i, f in enumerate(facts_set):
        # for each source that provides this fact, update its  confidence (similarity factor here, like levenshtein
        similarity_sum = (1 - SIMILARITY_CONSTANT) * facts_array[i] + SIMILARITY_CONSTANT * sum(
            implicates(f, facts_confidence) * facts_array)
        # update the confidence score
        data.loc[data[attribute_key] == f, 'confidence'] = similarity_sum
return (data, new_facts_array)
```

论文中提到了一个重要的警告，如果相似性的值小于基本相似性常数（0.5），它将被视为一个相互矛盾的事实，因此小于0（负），对于所有高于基本相似性的相似性，它们将大于0（正）。

```python
import jellyfish
def implicates(fact, fact_sources):
    '''
    How many sources implicates this fact
    :param fact: dataframe row
    :param fact_sources: dataframe
    :return:
    '''
    return [jellyfish.jaro_winkler(fact.lower(),f.lower()) - 0.5 for f in fact_sources]
```

- 3. 调整事实置信度分数

要从 σ*（f） 计算事实置信概率 s（f），我们可以做

[](./images/ARTS-week-26-16.png)


然而，这个等式假设来源是独立的，而实际上它们不是;他们互相复制和窃取。为了解释这一点，在sigmoid函数中添加了一个阻尼因子γ。

为什么使用S形函数？如果 f 与非常值得信赖的网站提供的某些事实冲突，则事实 f 的置信度可能为负。这反过来会使概率 s∗（f） 为负。这是没有意义的，因为即使有负面证据，f仍然很有可能是正确的。为了解释这一点，本文使用了各种广泛采用的sigmoid函数，但如前所述，使用伽马阻尼因子进行了调整。

[](./images/ARTS-week-26-17.png)


下面的代码实现了上面的等式，

```python
def compute_final_confidence(data, confidence):
    for idx, claim in data.iterrows():
        data.at[idx, 'confidence'] = 1 / (1 + np.exp(-DAMPING_FACTOR * claim['confidence']))
    return (data, confidence)
```

我们现在已经实现了算法的第一部分！如果仍然和我们在一起，已经走了很长一段路。最后一段路程。

[](./images/ARTS-week-26-18.png)

这不像计算事实的置信度那样复杂;来源可信度是来自该特定来源的所有事实的平均值。

[](./images/ARTS-week-26-19.png)

其中 F（w） 是 w [1] 提供的事实集。

```python
def compute_source_trust(data, sources):
    '''
    Compute every source trustworthiness. The trustworthiness score is the average confidence of
    all facts supplied by source w
    :param data: Dataframe all facts for object O
    :param sources: dict all unique sources and current scores
    :return: dict of unique sources with updated scores
    '''
    for source in sources:
            # t(w) trustworthiness of website w
            # the average confidence of all facts supplied by website/source w
            t_w = sum([confidence for confidence in data[data['source'] == source]['confidence'].values]) / len(
                data[data['source'] == source].index)
            # tau(w) trustworthiness score of website w
            # as explained in the paper, 1 - t(w) is usually quite small and multiplying many of them
            # might lead to underflow. Therefore we take the logarithm of it to better model how trustworthy a source is
            tau_w = -np.log(1 - t_w)
            # update the source score to the new score
            sources[source] = tau_w
    return sources
```

我们遍历每个源，并从源提供的有关不同对象的所有事实中检索所有置信度值。我们得到这些置信度分数的平均值，以获得该来源提供的事实的平均置信度分数。

最后，如果我们想要概率 s（f），我们做源的 ln（1 — 置信度分数）。

[](./images/ARTS-week-26-20.gif)

##### 最后的步骤
就是这样！现在，如果我们不断迭代和更新事实置信度，并连续更新源信任分数，我们最终将达到分数不会改变的平衡。

```python
error = 1 - np.dot(list(source_trustworthiness.values()), list(source_trustworthiness_old.values()) / (
        np.linalg.norm(list(source_trustworthiness.values())) * np.linalg.norm(
    list(source_trustworthiness_old.values()))))
```

结果将是我们的来源可信度分数列表和每个事实的分数。我们为置信度分数最高的每个对象选择事实。

#### 5、结果和结论

作者的黄金集可以在这里找到。不幸的是，将论文的结果与我的实现进行比较是非常困难的，因为作者的清理和准确性评分与原始论文有很大不同。

然而，与简单的朴素多数投票相比，TruthFinder的这种实现提供了10%的相对改进。

[](./images/ARTS-week-26-21.png)

这篇文章试图作为多个冲突来源的数据融合的介绍。如果一路来到这里，可能已经在考虑更简单和更复杂的方法来解决这个问题[5]。一个更简单的，是天真的多数投票，计算大多数来源提供的事实。然而，简单的多数投票可能会有问题，因为来源可能存在偏见，并且来源之间的抄袭很常见[8]。

有很多方法更复杂，更准确并支持更多用例。参考文献部分引用了一些有趣的论文，以供进一步探索。

引用
[1]网络上多个相互冲突的信息提供者的真相发现，X. Yin，J. Han和P. S. Yu。
[2]全局检测源之间的复杂复制关系
[3]一种基于图的有效多真相发现方法
[4]迈向大数据中的真实性挑战
[5]从数据集成的冲突来源中发现真相的贝叶斯方法
[6]大数据的真实性 CIKM 2015 幻灯片
[7]数据的真实性：从真相发现计算算法到错误信息动态模型
[8]数据融合：解决来自多个来源的冲突
[9]序列或大写 Pi 符号的乘积

### 3.Tip:

#### Java 使用新方法打印 Word 文档

使用类库 Spire.Doc for Java 提供的 PrinterJob 类可设置打印纸张大小、打印份数、是否弹出打印对话框等，且使用该方法打印出来的文档清晰度更高。类库可通过官网下载，解压后将lib文件夹下的Spire.Doc.jar手动导入IDEA中，或者也可通过Maven仓库安装导入产品及相关依赖。

```java

import com.spire.doc.*;
import java.awt.print.*;
 
public class PrintDocument {
    public static void main(String[] args)throws Exception {
        //加载文档
        Document doc = new Document();
        doc.loadFromFile("Sample.docx");
 
        PrinterJob loPrinterJob = PrinterJob.getPrinterJob();
        PageFormat loPageFormat = loPrinterJob.defaultPage();
 
        //设置打印纸张大小
        Paper loPaper = loPageFormat.getPaper();
        loPaper.setSize(600, 500);
        loPageFormat.setPaper(loPaper);
 
        //删除默认页边距
        loPaper.setImageableArea(0, 0, loPageFormat.getWidth(), loPageFormat.getHeight());
        //设置打印份数
        loPrinterJob.setCopies(1);
        loPrinterJob.setPrintable((Printable) doc, loPageFormat);
        //设置打印对话框
        if (loPrinterJob.printDialog()) {
            //执行打印
            try {
                loPrinterJob.print();
            } catch (PrinterException e)
 
            {
                e.printStackTrace();
            }
        }
    }
}
```

### 4.Share:

[Java：使用Java调用打印机进行打印（JPG、PDF和Word三种文件格式）](https://blog.csdn.net/s_156/article/details/123368322?spm=1001.2101.3001.6650.2&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-2-123368322-blog-108661816.235%5Ev38%5Epc_relevant_anti_t3_base&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-2-123368322-blog-108661816.235%5Ev38%5Epc_relevant_anti_t3_base&utm_relevant_index=3)
