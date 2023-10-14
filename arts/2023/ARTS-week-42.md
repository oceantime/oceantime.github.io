---
> **ARTS-week-42**
> 2023-10-15 9:02
---


## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm: 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

- [2731. 移动机器人](https://leetcode.cn/problems/movement-of-robots/submissions/472749316/)  
    + 思路：数组排序
- [2512. 奖励最顶尖的 K 名学生](https://leetcode.cn/problems/reward-top-k-students/submissions/473078973/) 
    + 思路：优先队列排序
- [1488. 避免洪水泛滥](https://leetcode.cn/problems/avoid-flood-in-the-city/submissions/473696726/)  
    + 思路：哈希树排序

### 2.Review:

[我如何使用 GitHub Copilot 学习 p5.js](https://dev.to/github/how-im-using-github-copilot-to-learn-p5js-39gh)

在这篇博文中，我旨在有效地阐明这种方法。写作帮助我组织我的想法，所以我分享我的见解，希望造福他人。虽然我写作的主要原因是为了我自己，但我也相信使用我公司的工具和分享最佳实践是有效的开发人员倡导的一部分。通过了解如何负责任地将 GitHub Copilot 用作学习工具，读者可以探索更多 AI 辅助编程用例。在这篇文章中，我将说明如何使用 GitHub Copilot 来学习编程语言或框架，重点是我目前使用 p5.js 的经验。

#### 什么是p5.js我为什么要学习它？

P5.js 是一个用于创意编码的开源 JavaScript 库，专注于使编码易于访问和包容。

我选择学习 p5.js 作为重新点燃我休眠的创造力的一种手段。自从我学会了如何编码后，我就不再利用我的创造力了。我了解到，创意编码的目的是制作一些富有表现力的东西，而不是功能性的东西，我在我的生活中需要它。我渴望创作纯粹的表现力作品，不受迎合广大观众或满足功能需求的负担。将代码从诸如修复公司财务影响的错误或在博客文章中面临有关我的演示有用性的潜在批评等担忧中解放出来。

#### 什么是 GitHub Copilot？

这是一个 AI 辅助程序员，可以从注释和代码中提取上下文，并立即建议单个行和整个功能！


#### 我如何学习编程概念

在我们讨论如何使用 GitHub Copilot 进行学习之前，我想揭穿一些关于学习编程概念的误解。根据我的经验，开发人员倾向于采用一种共享的传统方式，人们应该学习编码，这可能会让他们反驳 GitHub Copilot 帮助你学习的方式。每个人的学习方式都不同。有些人通过实践来学习，而有些人通过观察来学习。但是，我认为我们认为如何学习编程语言与我们实际学习编程语言的现实之间存在差异。以下是一些示例：

##### 期望 - 学习编码很简单
当我回顾我的编程教育时，我以一种直截了当的方式回忆起这段经历，看起来像这样：

我听了讲师（大学、训练营或在线视频）介绍一个概念
我看了教练演示这个概念
我把从课堂上学到的东西应用到我的家庭作业中

##### 现实 - 软件工程是一条非线性的职业道路，涉及各种步骤
现实情况是，编码是一个连续的、非线性的旅程。“知识的诅咒”或“知识偏见”经常导致我们忘记学习代码的真实情况。知识的诅咒是指认知偏差，即拥有特定主题知识或专业知识的个人发现难以记住或准确评估仍在获取该知识的新手或学习者面临的困难和挑战。

当我开始教初学者编码时，我有时会感到沮丧。为什么他们不能快速理解 Box Model？我向他们展示了一个有趣但全面的插图。他们应该得到它。

然后，我意识到当我第一次学习编码时，学习 CSS Box Model 对我来说是多么令人困惑。我记得有些高级工程师仍然将 padding 与 margin 混为一谈。我记得我每天都在与其他概念作斗争。（我仍然对 hook 和 method 感到困惑）。useEffectPromise.all()

在实践中，学习编码涉及故障排除、阅读文档、复制代码片段、浏览堆栈溢出，以及解决代码在分配期间无法按预期工作的挫败感。学习之旅的这一方面经常被忽视，但在掌握新的编程语言或框架时却是一种常见的经历。即使在今天，在使用新技术时，我也会遇到类似的挫折。

##### 期望 - 为了更好地编写代码，请编写更多代码。
对于希望提高编码技能或学习新编程概念的新手和经验丰富的开发人员来说，一些最常见的建议是编写更多代码

##### 现实 - 通过阅读代码提高您的编码技能
编写更多的代码会有所帮助，但阅读代码会更好。我的朋友 Ramón Huidobro 向我介绍了一本名为《程序员的大脑》的书。

Felienne Hermans的“每个程序员都需要知道的认知知识”。虽然 Felienne 承认编写代码很重要，但她也强调我们的领域对阅读代码没有给予足够的重视或指导。她相信个性化学习过程，以便您可以理解代码并改善您的短期、工作和长期记忆，从而成为一名更好的程序员。观看 [Felienne 的演讲之一](https://www.infoq.com/presentations/reading-code/)以了解更多信息！

我相信，虽然你可能并不总是理解代码片段，但阅读代码是有帮助的，这样你就可以识别符号，并随着时间的推移不那么不知所措。

##### 期望 - 你必须理解为什么要写每一行代码
虽然我相信代码理解是关键，但我认为总会有我们不理解代码的时候，而且理解会随着时间的推移而增长。当我担任软件工程师时，我最大的挫败感之一是我的同事希望我理解我编写的每一行代码。

他们：你为什么写这个？
我：我不确定。这是我在网上看到的。我认为这是一种有趣的方法，但我并不完全理解它。
他们：不要只是复制你在网上看到的东西。

你可能同意我过去的同事的观点，他们说的话有一定的道理，但请阅读下一段，了解为什么我不完全同意这种心态。

##### 现实 - 复制代码和过程支持仪式式学习
我发现许多工程师喜欢在如何之前知道原因的想法。另一方面，我从学习如何做某事中学习得最好，然后我就会知道我为什么要做某事。这样在我的大脑中点击得更好。就像我之前提到的，每个人的学习方式都不同。

这里有一个例子：从 2018 年 1 月到 2018 年 3 月的连续 3 个月里，我知道如何将代码推送到 GitHub，但我不明白任何命令,我为什么要写它们？我毫无头绪。只知道我需要在终端中输入它们才能在 GitHub 上获取我的代码。但是，当我遇到问题时，例如由于缺乏存储库访问权限而无法推送或面临合并冲突，我会谷歌问题并获取有关解决方案以及每个命令如何工作的更多上下文。几个月后，我了解了这些命令的含义，并且知道如何解决围绕这些命令出现的问题。这种方法并没有以任何方式抑制我的学习，因为现在我在当今最流行的基于 Web 的 Git 存储库托管服务中工作。

这不是一种虚构的学习方式。这种方法称为仪式式学习。它涉及遵循一组指示或步骤，而不一定理解其背后的基本原则或原因。随着时间的推移，随着您获得更多的经验和对主题的接触，您的理解会逐渐发展。

#### GitHub Copilot 如何帮助我学习
为了清楚起见（我想感觉很花哨），我将命名使用 GitHub Copilot 学习新编程概念的框架：AI 驱动学习。它包含 5 个步骤，包括：

- Conceptual Pseudocoding (概念伪代码)
- Syntax Familiarization (熟悉语法)
- Iteration (迭 代)
- AI Rubber Ducking (AI 扩展未知)
- Self-Directed Application (自主应用)

让我们深入了解每个步骤，以了解它们的含义以及如何应用它们！

##### Conceptual Pseudocoding (概念伪代码)

我在为 2022 年的 GitHub Universe 主题演讲计划我的部分时发现了概念伪代码的重要性。我们与首席执行官的技术顾问乔纳森·卡特（Jonathan Carter）合作，旨在创建一个有趣且直观的 GitHub Copilot 演示，该演示可以在分配的 5分钟 时间范围内进行。

在我们的 Slack 头脑风暴会议期间，我顿悟了！为什么不通过使用 p5.js 创建图像来展示 GitHub Copilot 的功能呢？乔纳森喜欢这个主意，我们都准备好了。只有一个小小的障碍——我以前从未在 p5.js 中写过任何东西。我为什么首先建议它？但随后，一线希望出现了。也许我可以很快掌握它？能有多难？也许不到一个小时的学习就足够了。现在我正在查看 p5.js 的代码示例，我不确定为什么有这么多数字。这是数学吗？

在与 Jonathan 交换截图和屏幕录像几次后，我们制定了一个计划，在文件顶部提供注释，为 GitHub Copilot 提供我们希望 GitHub Copilot 构建的内容的上下文。它说：

```
/* 
Draw a  draw a green house, 
with a blue roof, 
a red door,
 and two windows 
*/
```
这帮助我分解了p5.js创作的不同元素。

就像魔术一样，GitHub Copilot遵循了所有说明。

[](./images/ARTS-week-42-1.png)

这个过程帮助GitHub Copilot了解了我们想要的结果，并帮助我，程序员，清楚地知道我想要实现的目标。虽然伪编码在大学、编码训练营和面试中经常被强调，但一旦我们进入这个行业，它往往会被忽视。通过编写提示并向 GitHub Copilot 提供上下文的注释，开发人员可以深思熟虑地考虑应用程序的功能和结构。

为了进一步说明这一点，让我们通过安装p5.js和GitHub Copilot并编写一个高级提示来绘制冰淇淋蛋筒来创建我们自己的示例：

```

/* draw a light brown ice cream cone with

- a scoop of light pink ice cream

- a red cherry on top

*/
```

##### Syntax Familiarization (熟悉语法)
在您编写注释或一些代码后，GitHub Copilot 可能会建议代码。我们称之为幽灵文本。您可以通过按 tab 键接受虚影文本。虽然许多开发人员承认，按 Tab 键浏览代码可以提高工作效率，但他们担心不键入代码会减少对语法的记忆，尤其是对于初学者。

意向性在这里起着关键作用。尽管您没有主动键入代码，但允许 GitHub Copilot 生成代码可以公开该语言的语法和典型文件结构。在此阶段，不需要完全理解代码，但持续公开有助于防止它显得不熟悉。这种暴露使您的大脑能够更有效地分解代码，从而有助于理解。

###### 我将在理解复杂单词和通过语法熟悉来理解代码之间进行比较，以最好地说明我的观点。
```
我不怕大词或不熟悉的词。也许，大声朗读它们不是我的强项，但我的大脑能够很快地处理单词的含义，那是因为我在中学时学习了拉丁语。我可以推断，像“催眠”这样的词意味着让你昏昏欲睡。“sopor”一词的前半部分是拉丁语，意为“深度睡眠”。“fic”一词的后半部分是拉丁语，意思是“制造”。这篇博文的读者甚至可以推断出这一点，即使他们不熟悉拉丁语。他们可能会从“小说”这个词中认出“fic”这个词，这也意味着你正在从你的头脑中制造或发明一些东西。
```

正如我以前的拉丁语知识帮助我根据前缀和后缀破译复杂的单词一样，熟悉代码语法使您能够推断含义和上下文。语法熟悉通过让开发人员了解可跨语言应用的各种编程概念来提供额外的好处。虽然具体的语法可能有所不同，但基本原则保持一致。这种接触拓宽了开发人员的思维方式，鼓励探索各种方法和解决方案，并促进知识转移。

看看这个GIF，GitHub Copilot生成代码来绘制冰淇淋蛋筒：

[](./images/ARTS-week-42-2.gif)

虽然 GitHub Copilot 没有生成完美的冰淇淋蛋筒，但我学到了一些关于文件语法和结构的东西：

P5.js文件以设置功能启动
设置函数使用一个名为createCanvas的方法，我可以推断它初始化我们创建的画布
P5.js文件还使用称为draw的函数，这是我们绘图的所有元素将存在的地方
我可以通过使用方法背景并传入RGB颜色代码来确定背景颜色
我可以通过指定形状的名称并传入数字来创建三角形、椭圆形和圆弧等形状。虽然，目前，我不确定这些数字的作用。我假设它们决定了形状的大小和位置。
我可以使用方法填充和传入 RGB 颜色代码为形状着色
通过有意识地熟悉语法，开发人员可以利用他们的先验知识，进行推理，并在不同的编程概念之间建立有意义的联系。


##### Iteration (迭 代)

在与我的开发人员朋友的对话中，GitHub Copilot生成有缺陷的代码的问题经常出现。他们认为这可能会误导初学者并教他们糟糕的编程实践。我不会撒谎。盲目地信任不正确的代码生成代码可能会误导初学者。但是，我相信遇到不完美的代码是学习过程中不可或缺的一部分，无论是否涉及 GitHub Copilot。在探索一种新的编程语言时，尤其是在我职业生涯的初期，我经常求助于从 StackOverflow 复制代码、浏览文档和随意粘贴代码片段。有时，我复制的代码甚至不起作用，但它仍然提供了一个起点，并帮助我掌握手头的问题。随着时间的推移，我学会了更好的实践和方法，逐渐完善了我的技能。

同样的原则也适用于 GitHub Copilot。在上面的示例中，GitHub Copilot 尝试生成一个冰淇淋蛋筒，上面有一个浅粉色的勺子和一个樱桃。但是，生成的圆锥三角形的尖头部分朝上，而圆锥体的尖头部分通常朝下。虽然可以说 GitHub Copilot 误导了我，但如果没有它的指导，我就不知道如何创建一个三角形。这为我提供了一个调试和迭代生成的代码的机会，使我能够学习和发展更深入的理解。

虽然我可能无法完全理解所使用的数字符号，但我可以修改值以达到所需的结果。

查看下面的 GIF，看看我如何调整值以将三角形翻转到所需方向：

[](./images/ARTS-week-42-3.gif)

当 GitHub Copilot 提供包含小错误或缺陷的代码建议时，它允许学习者采用动手方法。通过尝试执行建议的代码，识别和解决遇到的问题，然后完善代码以纠正错误，学习者可以获得在给定框架内编写和编辑的实践经验。

##### AI Rubber Ducking (AI 扩展未知)

通过反复试验，我达到了预期的结果，但我仍然不真正理解数字符号或为什么它有效。我现在可以看到每个三角形的数字代表顶点，但我不知道公式。在这种情况下，我很想与比我知识渊博的人交谈以获得更好的理解，但我不想打扰任何人。或者也许我可以谷歌，但搜索引擎结果并不总是有我特定用例的答案。

幸运的是，我可以选择使用名为Copilot Chat的工具与我的AI配对程序员进行对话。在GitHub，我们有一套名为Copilot X的Copilot工具。这些工具旨在帮助开发人员超越其编辑器，因为我们认识到开发人员所做的不仅仅是代码。Copilot X中的一款产品称为Copilot Chat。Copilot Chat是一个IDE扩展，提供ChatGPT式的体验。它提供了一个 IDE 扩展，提供 ChatGPT 式的体验，利用编辑器中打开的文件的上下文。根据我的经验，突出显示相关的代码行可以增强Copilot Chat的性能。Copilot Chat可以生成代码，单元测试，解释等。在此处了解有关 [Copilot Chat 2023 年 6 月最新](https://code.visualstudio.com/updates/v1_80#_github-copilot)和最精彩更新的更多信息。尝试Copilot Chat的斜杠命令以最大化其优势！

[](./images/ARTS-week-42-4.png)

对于我们的特定方案，我将使用 Copilot 聊天来帮助我更好地理解生成的 p5.js 代码。我会问一些澄清性的问题，例如：

```
你能向我解释这行代码吗？ triangle(100, 200, 300, 200, 200, 400);
```
[](./images/ARTS-week-42-5.gif)

```
那么该方法是这样构造的 triangle(x1, y1, x2, y2, x3, y3)?
```

[](./images/ARTS-week-42-6.gif)

```
画布有多大？我如何知道每个坐标的位置？
```

[](./images/ARTS-week-42-7.gif)

通过与Copilot Chat的交流，我学到了一些p5.js基础知识：

用于定义画布宽度和高度的 createCanvas（400， 400） 方法
笛卡尔坐标系在画布中的利用
三角形函数的顶点顺序：x1、y1、x2、y2 和 x3、y3
弧函数的表示法：arc（centerX， centerY， width， height， startAngle， stopAngle）
创建省略号的语法：省略号（中心X，中心Y，宽度，高度）
如果要创建此修改图形，代码如下：

```js
/* draw a light brown ice cream cone with

- a scoop of light pink ice cream

- a red cherry on top

*/

function setup() {
  createCanvas(400, 400);
}

function draw() {
    // light blue background

    background(200, 220, 255);

    // light brown ice cream cone

    fill(255, 200, 100);

    triangle(100, 200, 300, 200, 200, 400);

    // light pink ice cream half-circle

    fill(255, 200, 200);

    arc(200, 200, 200, 200, PI, TWO_PI);

    // red cherry

    fill(255, 0, 0);

    ellipse(200, 100, 30, 30);
} 
```

凭借我新发现的知识，我准备挑战自己创造更多！

##### Self-Directed Application (自主应用)

现在我知道如何绘制形状和控制形状的位置，尤其是三角形，我准备承担一项更具挑战性的任务：绘制我父母的国旗。圭亚那国旗突出地以不同大小和颜色的三角形为特色。

这是我画圭亚那国旗的尝试

[](./images/ARTS-week-42-8.png)


下面是标志的代码：

```js
// draw a Guyanese flag

function setup() {
    createCanvas(700, 400);
}

function draw() {
    // background is green
    background(0, 153, 0);
    stroke(0);
    strokeWeight(2);
    flag();
}

function flag() {
    yellowTriangle();
    redTriangle();
}

function yellowTriangle() {
   // yellow triangle and white outline
   stroke(255, 255, 255);
   strokeWeight(4);
   fill(255, 255, 0);
   triangle(0, 400, 0, 5, 715, 200);
}

function redTriangle() {
    // red triangle and black outline
    stroke(0, 0, 0);
    strokeWeight(7);
    fill(255, 0, 0);
    triangle(0, 400, 0, 5, 350, 200);
} 
```

我继续运用我的形状操纵知识来堆雪人，戴着礼帽，胡萝卜鼻子和几个纽扣。GitHub Copilot 和 Copilot Chat 在我探索动画和用户交互时派上了用场。这允许我添加带有随机生成的绿色方块的背景，现在用户可以通过在画布上拖动鼠标来绘制随机的棕色线条。

在下面看看我的雪人！

[](./images/ARTS-week-42-9.gif)


以下是用于您自己的修改目的的代码：

```js
// draw a snowman

function setup() {
    createCanvas(400, 400);
}

function draw() {
    // background is dark blue

    // background(0, 0, 102);

    stroke(0);

    strokeWeight(2);

    snowman();
}

function snowman() {
    changeBackground();

    // call all functions

    body();

    eyes();

    nose();

    buttons();

    hat();

    arms();
}

function body() {
    // snowman body
    fill(255, 255, 255);
    ellipse(200, 300, 150, 150);
    ellipse(200, 200, 100, 100);
    ellipse(200, 120, 75, 75);
}

function eyes() {
    // snowman eyes
    fill(0, 0, 0);
    ellipse(185, 110, 10, 10);
    ellipse(215, 110, 10, 10);
}

function nose(){
    // snowman nose
    fill(255, 102, 0);
    triangle(200, 120, 200, 130, 220, 125);
}

function buttons() {
    // snowman buttons
    fill(250, 0, 0);
    ellipse(200, 180, 10, 10);
    ellipse(200, 200, 10, 10);
    ellipse(200, 220, 10, 10);
}

function hat() {
    // snowman hat
    fill(250, 0, 0);
    rect(150, 65, 100, 20);
    rect(170, 33, 60, 30);
}

// create snowman arms

function arms() {
    stroke(102, 51, 0);
    strokeWeight(5);
    line(150, 200, 100, 150);
    line(250, 200, 300, 150);

}

function changeBackground() {
    // make the background be random green squares
    for (var i = 0; i &lt; 100; i++) {
        fill(0, 255, 0);
        rect(random(400), random(400), random(50), random(50));
        frameRate(2);
    }
  }

  // draw with mouse

function mouseDragged() {
    fill(0);
    ellipse(mouseX, mouseY, 10, 10);
    return false;
}
```

基于我对形状处理和动画的理解，我开始创建3D绘图，而没有特定的计划或目标。我让p5的生成性质.js指导我，专注于开发3D元素，添加阴影和整合照明效果。

这是我的3D创作。它给了空间！

查看下面的代码：

```js
// create a 3d sphere with WEBGL and p5.js

let angleX = 0;

let angleY = 0;

function setup() {
    createCanvas(400, 400, WEBGL);
}

function draw() {
    // background is dark blue
    background(0, 0, 102);
    // set up lighting
    ambientLight(60, 60, 60);
    pointLight(255, 255, 255, 80, -100, 100);
    // set up material properties
    specularMaterial(250);
    shininess(20);
    rotateX(angleX);
    rotateY(angleY);
    // draw 3D sphere
    noStroke();
    fill(255, 204, 0);
    sphere(100);
    // draw 3D torus
    noFill();
    stroke(255, 204, 0);
    torus(200, 200);
    angleX += 0.01;
    angleY += 0.02;
}
```

作为前面步骤的高潮，我现在能够在编码时独立应用所获得的知识和概念。通过反复接触伪编码、语法熟悉、迭代和 AI 橡皮鸭，我对 p5.js 中的基础知识有了直观的理解。

#### 结论

无论您是新手开发人员还是经验丰富的专业人士，学习和掌握编程的旅程都是一个不断成长的过程。重要的是要认识到，学习很少是线性路径，并且通常涉及经常被忽视的各种认知方法。从复制和粘贴代码片段到探索新概念，这些方法在我们作为程序员的开发中发挥着重要作用。通过有意采用 GitHub Copilot 等 AI 工具和其他 AI 结对编程工具，我们可以增强我们的学习体验并利用生成 AI 的力量。

回顾一下，人工智能驱动的学习涉及：

- Conceptual Pseudocoding (概念伪代码)
- Syntax Familiarization (熟悉语法)
- Iteration (迭 代)
- AI Rubber Ducking (AI 扩展未知)
- Self-Directed Application (自主应用)

### 3.Tip:

#### Android 路由 ARouter 简单九步

1 远程依赖在项目的根 build.gradle 最顶层加上

```
apply plugin:  'com.alibaba.arouter'
```

2 远程依赖在在项目的 build.gradlede dependencie 节点下加上

```
classpath   "com.alibaba:arouter-register:1.0.2"
```

3 远程依赖在 moudle 的 build.gradle 文件的 dependencie 节点上加上

```
api  'com.alibaba:arouter-api:1.5.0'
annotationProcessor   'com.alibaba:arouter-compiler:1.2.2'
```

4 新建 MyApplication 继承 Application 在 OnCreate 方法里面初始化 ARouter 如下

```java
import android.app.Application;
import com.alibaba.android.arouter.launcher.ARouter;

public class MyApplicationextends Application {

    // ARouter 调试开关
    private boolean isDebugARouter =true;
    @Override
    public void onCreate() {
        super.onCreate();
        if (isDebugARouter) {
            // 下面两行必须写在init之前否则无效
            ARouter.openLog();
            // 开启调试模式(如果在InstantRun模式下运营,必须开启调试模式
            // 线上版本需要关闭,否则有安全风险)
            ARouter.openDebug();
        }
        ARouter.init(MyApplication.this);
    }
}
```

5 写配置文件 将你所以跳转的 Activity 或要加载的 Fragment 写入一下配置文件(注意:/必须有两层)

```java
public class ARouterConfig {

    public static final String APP_LOGIN="/login/LoginActivity";

    public static final String APP_REGISTER="/login/RegisterActivity";

}
```

6 在需要跳转的 Activity 或者 Fragment 类上面加上 @Route(path = ARouterConfig.App_LOGIN)

```java
@Route(path = ARouterConfig.APP_LOGIN)
```

7 在 OnCreate 方法中注册 ARouter

```java
ARouter.getInstance().inject(this);
```

8 同样的方法在跳转目标 Acitivity 里面加上

```java
ARouter.getInstance().inject(this);
```

9 跳转从 LoginActivity 跳转到 RegisterActivity

```java
ARouter.getInstance().build(ARouterConfig.APP_REGISTER).navigation();
```

注意: 这里有一个坑爹的地方:
如果你的项目有多个moudle 需要在你要用到ARouter的每一个moudle里面加上这一句:

```
annotationProcessor 'com.alibaba:arouter-compiler:1.2.2'
```

### 4.Share:

[教你写一手漂亮的伪代码（详细规则&简单实例）](https://blog.csdn.net/Dan1374219106/article/details/106676043)

[Android-记录阿里的ARouter的使用以及遇到的坑](https://www.jianshu.com/p/8d001cd0fa77)

[Android WebView 支持文件下载的几种方式](https://www.jianshu.com/p/6e38e1ef203a)