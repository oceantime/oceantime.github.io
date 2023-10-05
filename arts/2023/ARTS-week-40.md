---
> **ARTS-week-40**
> 2023-10-05 15:41
---


## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm： 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

- [146. LRU 缓存](https://leetcode.cn/problems/lru-cache/submissions/469067708/)  
    + 思路：哈希
- [1333. 餐厅过滤器](https://leetcode.cn/problems/filter-restaurants-by-vegan-friendly-price-and-distance/submissions/469922611/) 
    + 思路：排序
- [122. 买卖股票的最佳时机 II](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-ii/submissions/470859094/)  
    + 思路：贪心

### 2.Review:

[使用 GitHub Copilot 进行提示工程的初学者指南](https://dev.to/github/a-beginners-guide-to-prompt-engineering-with-github-copilot-3ibp)

当我开始使用 GitHub Copilot 和其他生成AI工具时，我感到沮丧，因为我没有收到预期的结果。人们如何使用这些工具感到如此成功，为什么他们没有做我想做的事？例如，我会要求 GitHub Copilot 为我解决 LeetCode 问题。GitHub Copilot 图标会旋转以表明它正在思考，然后我会收到一个不一致的建议或根本没有建议。我很生气，但事实证明——我用错了！经过更多的实验，我改进了与 GitHub Copilot 的沟通方法，以注释和代码的形式提供上下文、示例和清晰的说明。后来，我了解到这种做法被称为提示工程。在这篇博文中，我将讨论一些重要提示，以帮助您充分利用 GitHub Copilot。

首先，让我们从不熟悉 GitHub Copilot 或提示工程的人的基础知识开始。

#### 1. 什么是 GitHub Copilot？

GitHub Copilot 是由 GitHub 开发的 AI 对程序员，GitHub Copilot 由 OpenAI Codex 提供支持，OpenAI Codex 是由 OpenAI 创建的生成式预训练语言模型，可根据注释和代码中的上下文提供上下文化代码建议。要使用它，您可以在以下集成开发环境 （IDE） 中安装可用的 GitHub Copilot 扩展：
- Visual Studio
- Visual Studio Code
- Neovim
- JetBrains IDE（IntelliJ、PyCharm、WebStorm等）

#### 2. GitHub Copilot可以自己编码吗？

在 GitHub，我们使用术语“AI 配对程序员”、“AI 助手”和“Copilot”，因为没有您（开发人员）此工具将无法工作！事实上，人工智能系统只能执行开发人员编程执行的任务，它们不具备自由意志或独立决策的能力。在这种情况下，GitHub Copilot 利用您编写的代码和注释中的上下文来立即建议代码！使用 GitHub Copilot，您可以将注释转换为代码、自动填充重复代码并显示替代建议。

#### 3.GitHub Copilot 如何在引擎盖下工作？

在引擎盖下，GitHub Copilot 从注释和代码中提取上下文，立即建议单个行和整个功能。OpenAI Codex 是一种可以将自然语言翻译成代码的机器学习模型，为 GitHub Copilot 提供支持。

#### 4.什么是提示工程？
提示工程是向 AI 模型提供特定指令以产生所需结果的做法。提示是可以触发来自 AI 模型的响应的文本序列或代码行。您可以将这个概念比作接收论文提示。您可能会收到写一篇关于您克服挑战的时间的文章的提示，或者提示您撰写一本经典书籍，例如《了不起的盖茨比》。因此，您会根据所学内容对提示做出响应。大型语言模型或LLM的行为类似。

##### 这是提示工程的另一个例子：
当我学习编码时，我参加了一个活动，我向机器人提供了如何制作三明治的指导。这是一个有趣而愚蠢的活动，教会了我：
- 计算机只能做你告诉它们做的事情
- 您需要非常具体地说明
- 他们更擅长一步一步地接受订单
- 算法只是一系列指令

例如，如果我告诉“机器人”做一个三明治，我需要告诉它：
- 打开面包袋
- 从袋子里取出前两片面包
- 将面包片并排放在柜台上
- 用黄油刀将花生酱涂在一片面包上
- 等等，等等，等等

如果没有这些明确的指示，机器人可能会做一些愚蠢的事情，比如在两片面包上涂抹花生酱，或者它可能什么都不做。机器人不知道三明治是什么，也不知道如何制作三明治。它只知道如何遵循说明。

同样，GitHub Copilot 需要清晰的分步说明来生成最能帮助您的代码。

让我们讨论快速工程的最佳实践，以便向 GitHub Copilot 提供明确的说明并生成您想要的结果。

#### 5.使用 GitHub Copilot 进行提示工程的最佳实践

##### 提供高级上下文，然后提供更详细的说明
对我来说，最好的技术是在文件顶部的注释中提供高级上下文，然后以注释和代码的形式提供更详细的说明。

例如，如果我正在构建一个待办事项应用程序。在顶部，我将写一条评论，上面写着“使用 Next 构建一个待办事项.js允许用户添加、编辑和删除待办事项。然后在以下几行中，我将写一条注释来创建：

- 待办事项列表组件，我将让GitHub Copilot在注释下生成组件
- 按钮组件，我将让 GitHub Copilot 在评论下方生成组件
- 输入组件，我将让 GitHub Copilot 在注释下方生成组件
- 添加函数，我会让 GitHub Copilot 在评论下生成函数
- 编辑函数，我会让 GitHub Copilot 在评论下方生成函数
- 删除函数，我会让 GitHub Copilot 在评论下生成函数
- 等等，等等，等等...

##### 以下是我使用这种技术用 p5.js 建造房屋的示例：
在下面的 GIF 中，我在顶部写了一条评论，在高层次上描述了我希望 p5.js 绘制的内容。我想画一个白色的房子，棕色的屋顶，红色的门和红色的烟囱。然后，我为房子的每个元素写一个注释，我让GitHub Copilot为每个元素生成代码。
[](./images/ARTS-week-40-1.png)

##### 提供具体详细信息
当您提供特定详细信息时，GitHub Copilot 将能够生成更准确的代码建议。例如，如果您希望 GitHub Copilot 从 API 检索数据，则需要告诉它要检索的数据类型、如何处理数据以及您希望命中哪个 API 端点。

下面是一个非特定注释（提示）的示例，其中 GitHub Copilot 不太可能生成有用的建议：
```js
// Get data from API
function getData() {
  //code goes here
}
```

在上面的例子中，GitHub Copilot 除了函数的名称以及左括号和右括号之外，没有为我生成任何内容。

下面是一个特定注释（提示）的示例，其中 GitHub Copilot 更有可能生成有用的建议：

```js
// Pass in user ids and retrieve user data from jsonplaceholder.typicode.com API, then return it as a JSON object
async function getUserData(userId) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    const data = await response.json();
    return data;
}
```

##### 提供示例
除了告诉 GitHub Copilot 你想要它做什么之外，你还可以用你喜欢的编码风格的例子来展示你想要它做什么。虽然 GitHub Copilot 正在使用已经在大量数据上训练的 AI 模型，但向 GitHub Copilot 提供示例有助于它了解特定代码片段的上下文和约束。向 AI 模型展示您希望它们执行的操作的示例是机器学习中的常见做法。

以下是工程师用来训练 AI 模型的几种方法：
- 零镜头学习
- 一次性学习
- 少镜头学习
我要求 ChatGPT 像我 5 岁一样向我解释这些方法之间的区别，这就是它给我的：

###### 零镜头学习
这就像你看到一个你从未见过的新玩具，但你知道它是什么，因为它看起来像你见过的其他玩具。例如，如果您见过许多不同种类的毛绒玩具，即使您以前从未见过确切的毛绒玩具，您也可能能够认出一个新的毛绒玩具。同样，计算机可以通过利用它对类似事物的了解来学习识别新事物，从而对新事物进行有根据的猜测。

###### 一次性学习
这就像你第一次看到一个新玩具，你的妈妈或爸爸告诉你它叫什么，它做什么。听过一次后，你会记得它是什么，下次看到它时可以认出它。计算机可以通过展示几个示例并从中学习来学习以同样的方式识别新事物。

###### 少镜头学习
少镜头学习就像只看几个例子来学习做一些新的事情。例如，假设您想学习如何画猫，但您以前只看过几张猫的图片。通过少量镜头学习，即使您以前没有见过很多猫，您仍然可以学习如何画猫。它就像一种神奇的力量，可以帮助您快速学习新事物，即使您没有很多示例可以学习！

##### 以下是我展示 GitHub Copilot 示例时与未展示示例时发生的情况：

###### 没有例子
```js
# Create a list of the first 10 prime numbers
primes = []

for num in range(2, 30):
    if all(num % i != 0 for i in range(2, num)):
        primes.append(num)
print(primes)
```
在上面的代码片段中，GitHub Copilot 将准确地返回前 10 个数字，但它效率低下，因为它将遍历 2 到 30 之间的所有 29 个数字。我们可以通过提供一个我们希望GitHub Copilot做什么的具体示例来获得更有效的结果。

###### 带示例
```js
# Create a list of the first 10 prime numbers
# Example: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]
primes = []

for num in range(2, 30):
    if all(num % i != 0 for i in range(2, num)):
        primes.append(num)
    if len(primes) == 10:
        break
print(primes)
```
在上面的代码片段中，GitHub Copilot 将返回前十个素数，并在找到所有 10 个质数时停止。我的目标是获得准确但快速的结果，GitHub Copilot 在我将其推向正确的方向后成功实现了这一目标。

##### 其他提示

- 迭代提示
如果您的初始提示引起了所需的响应，请删除生成的代码建议，使用更多详细信息和示例编辑您的注释，然后重试！这对你和GitHub Copilot来说都是一个学习的过程。你使用它的次数越多，你就越能更好地与GitHub Copilot沟通。

- 在 IDE 中保持相关文件的标签页处于打开状态
目前，GitHub Copilot 无法获取整个代码库的上下文。但是，它可以读取当前文件以及在 IDE 中打开的任何文件。我发现保持一个打开的相关文件的选项卡很有帮助，我希望GitHub Copilot引用这些文件。例如，如果我正在编写一个使用另一个文件中的变量的函数，我将在我的 IDE 中保持该文件处于打开状态。这将有助于GitHub Copilot提供更准确的建议。

- 为您的 AI 助手提供身份
我从BitRise的开发者倡导者Leilah Simone那里得到了这个建议。我还没有用GitHub Copilot尝试过这个，但这是有用的建议。它有助于控制用户将收到的响应类型。在 Leila 的案例中，她要求 ChatGPT 表现得像一名高级 iOS 工程师。她说，“这帮助她减少了语法和 linting 问题。

- 使用可预测的模式
正如我们在上面的许多示例中所看到的，GitHub Copilot 将遵循代码中的模式。AI爱好者和开发人员内容创建者，YK又名CS Dojo，分享了他如何利用这一点来发挥自己的优势：

- 对描述其用途的变量和函数使用一致、特定的命名约定
声明变量或函数时，请使用特定于变量用途的名称。这将有助于 GitHub Copilot 了解变量的上下文并生成更多相关建议。例如，不要使用通用变量名称（如“value”），而应使用更具体的名称（如“input_string”或“output_file”。

GitHub Copilot 还将使用您在代码中使用的命名约定。例如，如果您将 camelCase 用于变量，GitHub Copilot 将建议 camelCase 变量。如果您使用 snake_case 作为变量，GitHub Copilot 将建议snake_case变量。

- 使用良好的编码实践
虽然 GitHub Copilot 可以成为生成代码建议的强大工具，但重要的是要记住，它不能替代您自己的编程技能和专业知识。人工智能模型的好坏取决于它们所训练的数据，因此，使用这些工具作为辅助工具而不是完全依赖它们是很重要的。我鼓励 GitHub Copilot 的每个用户：

  - 查看代码
  - 运行单元测试、集成测试和任何其他编程形式的测试代码
  - 手动测试代码以确保其按预期工作
  - 并使用良好的编码实践，因为 GitHub Copilot 将遵循您的编码风格和模式作为其建议的指南。

- 超越您的编辑器
目前，GitHub Copilot是一个扩展，可以在最流行的IDE中使用。还有GitHub Copilot Labs，这是一个单独的实验扩展，可通过GitHub Copilot访问。Copilot 实验室可以帮助您翻译、调试、测试、记录和重构代码。此外，我们最近推出了Copilot X，这是一套可在IDE之外提高开发人员工作效率的功能。Copilot X 包括：

  - Copilot for Docs - 使开发人员无需搜索大量文档。
  - 用于拉取请求的 Copilot - 帮助您编写更好的 PR 描述，并帮助您的团队更快地审查和合并 PR/
  - Copilot Chat - 通过 GitHub Copilot 聊天在您的编辑器中提供类似 ChatGPT 的体验。
  - CLI 的 Copilot - 帮助您记住shell命令和标志，以更快地在终端中运行命令。
  - Copilot Voice - 编写和编辑代码，导航代码库，并使用语音控制 Visual Studio Code。

### 3.Tip:

#### Mybatis查询缓存

- 一级缓存是 SqlSession 级别的缓存。在操作数据库时需要构造 sqlSession 对象，在对象中有一个数据结构（HashMap）用于存储缓存数据。不同的sqlSession之间的缓存数据区域（HashMap）是互相不影响的。

第一次发起查询用户 id 为 1 的用户信息，先去找缓存中是否有 1 的用户，如果有的话拿去用，如果没有去数据库中查去。得到用户信息放入一级缓存中去。如果 SqlSession 去执行 commit 操作（执行插入、删除、更新）的话，清空 SqlSession 中的一级缓存，这样做就是为了让缓存中的数据保持最新，避免用户读到错误的数据。

- 二级缓存是 mapper 级别的缓存，多个 SqlSession 去操作同一个 Mapper 的 sql 语句，多个 SqlSession 可以共用二级缓存，二级缓存是跨 SqlSession 的。

首先得开启二级缓存，sqlSession1 去查询用户 id 为 1 的用户信息，查询到用户信息会将查询数据存储到二级缓存中。如果 SqlSession3 去执行相同 mapper 下 sql，执行 commit 提交，清空该 mapper 下的二级缓存区域的数据。sqlSession2 去查询用户 id 为 1 的用户信息，去缓存中找是否存在数据，如果存在直接从缓存中取出数据。

- 一级缓存和二级缓存的区别
二级缓存的范围更大，多个 sqlSession 可以共享一个 UserMapper 的二级缓存区域。UserMapper 有一个二级缓存区域（按 namespace 分） ，其它 mapper 也有自己的二级缓存区域（按 namespace 分）。每一个 namespace 的 mapper 都有一个二缓存区域，两个 mapper 的 namespace 如果相同，这两个 mapper 执行 sql 查询到数据将存在相同 的二级缓存区域中。mybaits 的二级缓存是 mapper 范围级别的缓存，所以我们需要开启二级缓存，并在 Mapper 文件中开启具体的缓存配置 MyBatis 中开启二级缓存及 flushCache 与 useCache 的使用。

  - 第一步：Configuration.xml 设置二级缓存的总开关
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE configuration PUBLIC "-//mybatis.org//DTD Config 3.0//EN" "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
 <settings>
 <!-- 全局映射器启用缓存 -->
 <setting name="cacheEnabled" value="true" />
 <!-- 查询时，关闭关联对象即时加载以提高性能 -->
 <setting name="lazyLoadingEnabled" value="false" />
 <!-- 对于未知的SQL查询，允许返回不同的结果集以达到通用的效果 -->
 <setting name="multipleResultSetsEnabled" value="true" />
 <!-- 允许使用列标签代替列名 -->
 <setting name="useColumnLabel" value="true" />
 <!-- 对于批量更新操作缓存SQL以提高性能  -->
 <setting name="defaultExecutorType" value="REUSE" />
 <!-- 数据库超过25000秒仍未响应则超时 -->
 <setting name="defaultStatementTimeout" value="25000" />
 </settings>
 <mappers>
 <!--<mapper resource="dao/mysql/CtdAuthCommonMapper.xml"/>-->
 </mappers>
</configuration>
```

  - 第二步：在具体的 mapper.xml 中开启二级缓存。
```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd" >
<mapper namespace="com.ctd.cmp.loganalyse.bean.pojo.mapper.CtdBizMetricsMapper">
    <!-- 缓存10分钟 -->
    <cache eviction="FIFO" flushInterval="600000" size="4096" readOnly="true"/>
   <select id="save" parameterType="XX" flushCache="true" useCache="false"> </select>
</mapper>
```

  - 各个属性意义如下：
    - eviction：缓存回收策略
    - LRU：最少使用原则，移除最长时间不使用的对象
    - FIFO：先进先出原则，按照对象进入缓存顺序进行回收
    - SOFT：软引用，移除基于垃圾回收器状态和软引用规则的对象
    - WEAK：弱引用，更积极的移除移除基于垃圾回收器状态和弱引用规则的对象
    - flushInterval：刷新时间间隔，单位为毫秒，这里配置的100毫秒。如果不配置，那么只有在进行数据库修改操作才会被动刷新缓存区
    - size：引用额数目，代表缓存最多可以存储的对象个数
    - readOnly：是否只读，如果为 true，则所有相同的 sql 语句返回的是同一个对象（有助于提高性能，但并发操作同一条数据时，可能不安全），如果设置为 false，则相同的 sql，后面访问的是 cache 的 clone 副本。

  - 可以在 Mapper 的具体方法下设置对二级缓存的访问意愿：
```xml
<select id="save" parameterType="XX" flushCache="true" useCache="false"> </select>
```

  - 如果没有去配置 flushCache、useCache，那么默认是启用缓存的
    - flushCache 默认为 false，表示任何时候语句被调用，都不会去清空本地缓存和二级缓存。
    - useCache 默认为 true，表示会将本条语句的结果进行二级缓存。
    - 在 insert、update、delete 语句时： flushCache 默认为 true，表示任何时候语句被调用，都会导致本地缓存和二级缓存被清空。 useCache 属性在该情况下没有。update 的时候如果 flushCache="false"，则当你更新后，查询的数据数据还是老的数据。

### 4.Share:

[字节跳动面试官：请你实现一个大文件上传和断点续传](https://juejin.cn/post/6844904046436843527)