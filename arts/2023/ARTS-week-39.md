---
> **ARTS-week-39**
> 2023-09-23 08:29
---


## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm: 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

- [337. 打家劫舍 III](https://leetcode.cn/problems/house-robber-iii/submissions/467214217/)  
    + 思路：DP
- [2560. 打家劫舍 IV](https://leetcode.cn/problems/house-robber-iv/submissions/467569640/) 
    + 思路：二分
- [1993. 树上的操作](https://leetcode.cn/problems/operations-on-tree/submissions/468840433/)  
    + 思路：图遍历

### 2.Review:

[如何使用 GitHub Copilot 构建石头、纸、剪刀游戏](https://dev.to/github/how-to-build-a-rock-paper-scissors-game-with-github-copilot-1flo)

在本教程中，我们将使用 GitHub Copilot 构建一个石头、纸、剪刀游戏。我们还将探索GitHub Copilot，这是一个基于云的AI工具，可帮助各种编辑器的用户立即建议代码行和整个功能。我们将讨论Copilot如何为数百万开发人员重新定义生产力，以及它提供的好处。本教程包括使用 CodeTour（VS Code 扩展），它允许开发人员创建并遵循代码库的引导式演练。让我们开始吧！

#### 1. 什么是 GitHub Copilot？

GitHub Copilot 通过向数百万开发人员介绍人工智能辅助的魔力，帮助他们重新定义了生产力。GitHub Copilot是由GitHub和OpenAI开发的基于云的人工智能工具，通过即时建议代码行和整个功能来帮助Visual Studio，Visual Studio Code，Neovim和JetBrains的用户。使用 Copilot，您可以在不离开编辑器的情况下首次编写正则表达式或与 API 交互。

#### 2. 为什么我喜欢 GitHub Copilot？

GitHub Copilot 提高了生产力，因为它可以帮助开发人员花更多的时间思考他们正在构建的理论，而不是代码本身。

然而，除了生产力之外，GitHub Copilot 还帮助我提供了心理安全感。心理安全是指相信你可以大声说出来，提出问题，犯错误，做出贡献，而不必担心受到惩罚或羞辱。当员工感到安全学习、提出问题、做出贡献和领导时，它会提高团队和个人的整体信心、士气和绩效。

不幸的是，现实情况是心理安全在工作中并不总是很常见。当我不确定是否要寻求帮助，或者我甚至不确定如何表达我的问题时，我可以使用 GitHub Copilot 来帮助我：

- 当我达到心理障碍时集思广益
- 减缓我的思考
- 保持专注
- 确定我是否朝着正确的方向前进

#### 3.我为什么要做石头、纸、剪刀游戏？

- 我这样做是为了好玩
- 我这样做是为了培养我的Python技能。我是一个Python初学者。在过去的 5 年里，我一直在前端和后端编写不同形式的 JavaScript，但自从我开始使用 GitHub Copilot 以来，我对 Python 产生了兴趣。我想继续阅读、键入和导航用 Python 编写的代码。它是一种比JavaScript更不冗长的语言，所以对我来说很容易学习。
- 我想创建一个简短而有趣的活动来帮助人们学习如何利用GitHub Copilot，因为如何开始并不总是很明显。提示：通过注释和代码行提供尽可能多的上下文。
- 我记得 2018 年我在编码训练营时制作了一个石头、纸、剪刀游戏。当时，逻辑似乎很难。我希望这对于正在学习编码的开发人员来说是一个有用的工具。
- 我想继续在不同情况下创造性地使用 GitHub Copilot，以了解它的局限性和优势。

##### 这是如何工作的？
CodeTour 提示开发人员编写注释和代码行，触发 GitHub Copilot 生成代码以创建石头、纸张、剪刀游戏。

##### 什么是CodeTour？
CodeTour是由我了不起的同事Jonathan Carter开发的VS Code扩展！它允许开发人员创建并遵循代码库的引导式演练。

##### 您将在此存储库中找到的内容
在此存储库中，您将找到：
- 没有内容的文件main.py
- 一个开发容器，用于在创建代码空间时安装 CodeTour 和 GitHub Copilot
- 一个CodeTour，用于指导开发人员使用GitHub Copilot开发石头，纸张，剪刀游戏。

##### 如何使用引导式代码导览
导航到我创建的此存储库。然后按照以下说明操作：

- 步骤 1
选择“使用此模板”和“在代码空间中打开”
[](./images/ARTS-week-39-1.png)

- 步骤 2
选择编辑器左侧边栏上的“资源管理器图标”。
[](./images/ARTS-week-39-2.png)

- 步骤 3
切换“代码游览”面板
[](./images/ARTS-week-39-3.png)

- 步骤 4
按“播放按钮”开始游览。
[](./images/ARTS-week-39-4.png)

- 步骤 5
您的代码之旅将开始！按照 CodeTour 的步骤了解如何使用 GitHub Copilot。
[](./images/ARTS-week-39-5.png)

#### 您的代码之旅将引导您完成以下步骤
- 步骤 1
简介：你好！这是一个帮助您了解 GitHub Copilot 的导览。我们将用Python构建一个石头，纸，剪刀游戏。

- 步骤 2
让我们给 GitHub Copilot 一些关于我们正在构建的内容的背景。将此注释写在 main.py 文件的顶部。# Write a rock, paper, scissors, game
[](./images/ARTS-week-39-6.png)

现在，让我们提示 Copilot 导入随机模块。在下一行写下此评论。按回车键创建新行并接受 Copilot 的建议。# import random module
[](./images/ARTS-week-39-7.png)

- 步骤 3
现在，让我们提示 Copilot 创建一个 main 函数来处理游戏的逻辑，并带有注释。按回车键创建新行并接受 Copilot 的建议。# define main function that handles all the logic
[](./images/ARTS-week-39-8.png)

- 步骤 4
现在，让我们提示 Copilot 调用 main 函数。在下一行写下此评论。按回车键创建新行并接受 Copilot 的建议。# call main function
[](./images/ARTS-week-39-9.png)

- 步骤 5
试试吧！让我们运行代码以查看它是否有效。在您的终端中，运行。它应该开始石头，纸，剪刀游戏。任务完成！你已经使用 GitHub Copilot 在 Python 中创建了一个石头、纸、剪刀游戏！python3 main.py

### 3.Tip:

#### MySQL分页查询的5种方法

方式1：
```sql
select * from table order by id limit m, n;
```
很简单，该语句的意思就是查询m+n条记录，去掉前m条，返回后n条。无疑该查询能够实现分页，但m越大，查询性能就越低，因为MySQL需要扫描全部m+n条记录。

方式2：
```sql
select * from table where id > #max_id# order by id limit n;
```
该查询同样会返回后n条记录，却无需像方式1扫描前m条记录，但必须在每次查询时拿到上一次查询（上一页）的最大id（或最小id），是比较常用的方式。当然该查询的问题也在于我们不一定能拿到这个id，比如当前在第3页，需要查询第5页的数据，就不行了。

方式3：
为了避免方式2不能实现的跨页查询，就需要结合方式1。
性能需要，m得尽量小。比如当前在第3页，需要查询第5页，每页10条数据，且当前第3页的最大id为#max_id#，则：
```sql
select * from table where id > #max_id# order by id limit 10, 10;
```
该方式就部分解决了方式2的问题，但如果当前在第2页，要查第1000页，性能仍然较差。

方式4：
```sql
select * from table as a inner join (select id from table order by id limit m, n) as b on a.id = b.id order by a.id;
```
该查询同方式1一样，m的值可能很大，但由于内部的子查询只扫描了id字段，而非全表，所以性能要强于方式1，并且能够解决跨页查询问题。

方式5：
```sql
select * from table where id > (select id from table order by id limit m, 1) limit n;
```
该查询同样是通过子查询扫描字段id，效果同方式4。但方式5的性能会略好于方式4，因为它不需要进行表的关联，而是一个简单的比较，在不知道上一页最大id的情况下，是比较推荐的用法。

### 4.Share:

[如何在RPC和RESTful之间做选择？](https://blog.csdn.net/weixin_37604985/article/details/131118671)

[MySQL优化之超大分页查询](https://zhuanlan.zhihu.com/p/279863859)

[mermaid(流程图)](https://zhuanlan.zhihu.com/p/440934038)

[Markdown 进阶技能：用代码画流程图](https://zhuanlan.zhihu.com/p/69495726)

[使用 Typora 画图（类图、流程图、时序图）](https://zhuanlan.zhihu.com/p/172635547)

[使用Typora画 流程图、时序图、顺序图、甘特图、等图详解](https://blog.csdn.net/qq_36075612/article/details/118161100)