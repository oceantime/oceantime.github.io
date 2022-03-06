---
> **ARTS-week-35**
> 2021-08-25 08:04
---


## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm： 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

260. 只出现一次的数字 III：https://leetcode-cn.com/submissions/detail/212486937/

剑指 Offer 39. 数组中出现次数超过一半的数字：https://leetcode-cn.com/submissions/detail/212483544/

480. 滑动窗口中位数：https://leetcode-cn.com/submissions/detail/207095459/

### 2.Review:

https://entrepreneurshandbook.co/elon-musks-2-rules-for-learning-anything-faster-cf9a79fba35
“钢铁侠”埃隆·马斯克的两条快速学习法则

#### 点评：

学习是普通创业者过度关注交流但未被充分利用的方法之一。每个人都在谈论学习，但很少有人能在信息和应用中找到实际的且能产生净利润的技术。埃隆-马斯克用学习技术突破了这一障碍，这些技术也被无数次证明是非常成功的。

- 识别树的不同部分：
  - 规则1--确保你正在建立一棵知识之树。
  - "一点建议：将知识视为某种语义树是很重要的--在你进入叶子/细节之前，确保你理解基本原则，即树干和大树枝，否则它们就没有什么可扩展的了。"
  - 如果你想更快地学习任何东西，你需要从构成树干的材料开始。在开始的时候可能会慢一点，但是如果没有一个结实的树干，你就没有基础来支持任何额外的学习和技能。

- 连接为您的学习提供动力：
  - 规则2--你无法记住你无法联系的东西。
  - 他从扎实的根基和密集的树干开始，然后随着他的知识开始向上发展，他开始把枝叶和其他树的枝叶连接在一起。马斯克从不随意学习一条信息。他所摄取的一切，都会连接回一些更深、更坚实的基础。
  - 今天的学习者大多不是园丁高手，而是收棍子的人。我们在生活中走来走去，这里捡点小插曲，那里捡点小插曲，直到我们的手臂上全是棍子。一旦我们有了一堆好棍子，只要有一堆棍子躺在那里，我们就会自然而然地做什么。我们把它们烧掉。我们认为我们火的大小等于我们学习的大小。但我们迟迟没有意识到埃隆-马斯克建立整个学习结构的原因：火会烧尽。
  - 马斯克在肥沃的土壤里种树，长成厚实而丰富的学习中心。你也可以这样做。你只需要接受他的两条规则。先建立树干，然后孜孜不倦地努力建立联系。

- 指数式增长
  - 像任何新的系统一样，你可能需要一点时间来掌握它的窍门。你可能会觉得自己的学习速度比以前慢了。这没关系，你实际上在做的是为指数级增长打基础。亨利-福特曾经说过："如果你总是做你一直做的事，你就一定会得到你想得到的东西。"

### 3.Tip:

#### [Redash] 权限管理机制

Redash 权限管理机制分为 Users 和 Groups，一个 Users 可以加多个 Groups，用 Groups 管理该 Users 对每个 Data Sources 的权限，
权限分为三种：
- Full Access：可以对该 Data Sources 做任何 Query 及执行
- View Only：只能看人家用该 Data Sources 建好的 Query 及定期更新或上次的执行结果，不能使用 Execute、Refresh、Parameter，但能使用 Filter
- 完全沒有该 Data Sources

Redash 预设两个 Groups：
- default：所有新的 Users 都会预设加入此 Groups；而如果增加新的 Data Sources，该权限会设为 Full Access
- admin：新的 Data Sources 并不会自动加入，需要管理员设置，有最高的编辑权限！

### 4.Share:

https://baike.baidu.com/item/%E5%88%86%E7%BB%84%E5%AF%86%E7%A0%81%E5%B7%A5%E4%BD%9C%E6%A8%A1%E5%BC%8F/22657583?fr=aladdin
分组密码工作模式

https://www.cnblogs.com/daoren/p/12835578.html
Redash使用体验