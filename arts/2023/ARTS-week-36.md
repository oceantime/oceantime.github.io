---
> **ARTS-week-36**
> 2023-09-02 12:05
---


## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm： 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

- [1654. 到家的最少跳跃次数](https://leetcode.cn/problems/minimum-jumps-to-reach-home/submissions/461166872/)  
    + 思路：DFS
- [2240. 买钢笔和铅笔的方案数](https://leetcode.cn/problems/number-of-ways-to-buy-pens-and-pencils/submissions/461825298/) 
    + 思路：模拟
- [1171. 从链表中删去总和值为零的连续节点](https://leetcode.cn/problems/remove-zero-sum-consecutive-nodes-from-linked-list/submissions/461825417/)  
    + 思路：链表

### 2.Review:

[使用 Copilot 编写和翻译二进制搜索算法](https://dev.to/github/use-copilot-to-write-and-translate-a-binary-search-algorithm-lcm)

我从阅读、观看和实践中学习得最好，这意味着我需要各种资源来创建一个强大的心智模型。当我为面试、大学考试和编码训练营而学习时，我会观看视频，完成 LeetCode 练习，并写代码解释。Copilot Labs作为一个额外的资源，为我提供了更多关于特定算法为什么以及如何工作的背景信息。

在这篇博文中，我将使用 Copilot 和 Copilot Labs 来编写和理解二进制搜索算法。

#### 1. 先决条件：

确保已安装 GitHub Copilot 扩展和 GitHub Copilot Labs 扩展。

##### 请注意：GitHub Copilot 处于技术预览阶段，因此并非所有用户都能访问此功能。如果您想注册技术预览版，请加入候补名单。
[](./images/ARTS-week-36-1.png)

##### 使用 Copilot 编写代码
第 1 步：打开您的 IDE。在这个例子中，我通过代码空间使用Visual Studio Code。键入一条注释，指出“编写二分搜索算法”。
[](./images/ARTS-week-36-2.png)

第 2 步：在新行中键入关键字“const”。这应该触发 Copilot 提供建议的代码来编写二分搜索算法。若要接受建议的代码，请按 Tab 键。
[](./images/ARTS-week-36-3.png)
[](./images/ARTS-week-36-4.png)
[](./images/ARTS-week-36-5.png)

##### 使用Copilot实验室解释代码
第 3 步：现在，我们可以通过将代码转换为简单的语言来更好地理解代码正在完成什么。让我们打开Copilot Labs侧边栏。
[](./images/ARTS-week-36-6.png)

第 4 步：突出显示代码片段，然后在左上角选择“解释”。按下“询问 Copilot”按钮以生成代码片段中发生的事情的分步说明。
[](./images/ARTS-week-36-7.png)
[](./images/ARTS-week-36-8.png)
[](./images/ARTS-week-36-9.png)


#### 2.与Copilot实验室一起将代码翻译成不同的编程语言
第 5 步：我们还可以将此代码片段转换为Python（或您选择的任何编程语言）。导航到 Copilot Labs 侧边栏的语言翻译，然后选择目标语言。按“询问 Copilot”按钮查看不同语言的代码片段版本。
[](./images/ARTS-week-36-9.png)
[](./images/ARTS-week-36-10.png)
[](./images/ARTS-week-36-11.png)

### 3.Tip:

#### java: package org.xxxx does not exist

主要是因为你修改了pom文件, 所以需要重新执行命令：
```shell
mvn idea:module
```

### 4.Share:

[java中十六进制编码与解码](https://blog.csdn.net/chinabestchina/article/details/105212391)