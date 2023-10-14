---
> **ARTS-week-41**
> 2023-10-14 9:02
---


## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm: 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

- [714. 买卖股票的最佳时机含手续费](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/submissions/471618339/)  
    + 思路：贪心
- [901. 股票价格跨度](https://leetcode.cn/problems/online-stock-span/submissions/471830081/) 
    + 思路：排序
- [2034. 股票价格波动](https://leetcode.cn/problems/stock-price-fluctuation/submissions/472113907/)  
    + 思路：贪心

### 2.Review:

[如何在两分钟内构建一个 markdown 编辑器（使用 GitHub Copilot）](https://dev.to/github/how-to-build-a-markdown-editor-in-two-minutes-with-github-copilot-khb)

#### 使用 GitHub Copilot 构建降价编辑器

先决条件：
- 创建一个GitHub 帐户（如果您没有）
- 注册GitHub Copilot
- 在您选择的编辑器中安装 GitHub Copilot 扩展

##### 步骤 1：创建 Next.js GitHub 代码空间模板（30 秒）

当我想避免安装样板包依赖项并从头开始设置我的环境时，我会使用 GitHub Codespace 模板。当我想快速启动概念验证或提供演示时，它会派上用场。在我们的例子中，我们希望节省安装 Next.js 及其随附依赖项的时间。

您可以通过导航到https://github.com/codespaces/templates 来创建下一步.js GitHub 代码空间模板。然后选择“下一步.js”的“使用此模板”按钮。这将触发代码空间以使用样板打开 Next.js 带有浏览器预览的代码。

[](./images/ARTS-week-41-1.png)

##### 步骤 2：安装特定依赖项（30 秒）

使用 GitHub Codespace 模板减少了安装一些样板依赖项的需求，但我们仍然需要安装更多依赖项。

- 确保已安装 GitHub Copilot 扩展。有关说明，请参阅此处。
- 安装 React Markdown npm 包。为此，请在代码空间的终端中运行以下命令：
```
npm install react-markdown
```
- 安装样式化组件 npm 包。为此，请在代码空间的终端中运行以下命令：
```
npm install styled-components@latest
```

##### 第 3 步：删除文件中的代码（2 秒）index.js

每个 GitHub Codespace 模板都包含样板代码，使开发人员能够试验并快速原型化他们的想法。但是，为了我们的目标，我们将在文件中编写不同的代码;我们不需要现有的代码。index.js

保留 index.js 文件，但删除其中的代码。

[](./images/ARTS-week-41-2.png)

##### 第 4 步：提示 GitHub Copilot 注释（4 秒）

下面的评论提示 GitHub Copilot 解释我们的总体目标，并为我们的 AI 编程助手提供背景信息。从我之前的 DEV 帖子中了解有关此方法的更多信息 –使用 GitHub Copilot 进行提示工程的初学者指南。复制下面的评论并将其粘贴到文件顶部。index.js

```
/*
Create a basic markdown editor in Next.js with the following features:
- Use React hooks
- Create state for markdown with the default text "## markdown preview"
- A text area where users can write markdown 
- Show a live preview of the markdown text as I type
- Support for basic markdown syntax like headers, bold, italics 
- Use React markdown npm package 
- The markdown text and resulting HTML should be saved in the component's state and updated in real time 
*/
```

##### 第 5 步：从 GitHub Copilot 触发建议（18 秒）
我按了两次键以触发GitHub Copilot的建议。我通常在提供上下文后按键盘上的 ，，or 来触发来自 GitHub Copilot 的建议。

[](./images/ARTS-week-41-3.gif)

💡 创建新行时，应会看到来自 GitHub Copilot 的建议或虚影文本。

💡 您可以知道 GitHub Copilot 会在状态栏中的 Copilot 图标旋转时为您提供建议。我喜欢把它称为“思考”。在下面的 GIF 中，我突出显示了 Copilot 图标，因此您可以看到它在处理时如何旋转。

[](./images/ARTS-week-41-4.gif)

💡 您可以知道GitHub Copilot将在状态栏中的Copilot图标旋转时为您提供建议。我喜欢把它称为“思考”。在下面的 GIF 中，我突出显示了 Copilot 图标，因此您可以看到它在处理时如何旋转。

💡 由于 GitHub Copilot 的输出是不确定的，因此结果可能会有所不同。

📝 这是GitHub Copilot给我的输出：

```js
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';

const Index = () => {
  const [markdown, setMarkdown] = useState('## markdown preview');

  const handleChange = (e) => {
    setMarkdown(e.target.value);
  };

  return (
    <div>
      <textarea onChange={handleChange} value={markdown} />
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
  );
}

export default Index;
```

✨ 随意根据自己的喜好调整输出！

##### 第 6 步：保存文件并试用！（30 秒）

GitHub Copilot生成的代码看起来是正确的，但我们怎么知道它有效呢？让我们尝试在 markdown 编辑器的输入框中编写，看看它是否呈现了文本的准确实时预览。

我将测试以下降价元素：
- 要点
```
- bullet
- bullet
- this is the markdown for bullets
- ...
```
- 加粗
```
I am **bold**
How to make a word **bold**: 
- sandwiched it between two asterisks on the left 
- and two asterisks on the right
```
- 斜体
```
I am *italic*
How to make a word *italic*: 
- sandwiched it between one asterisk on the left 
- and one asterisk on the right
```
- 链接
```
I am [link](google.com)
How to convert a word into a [link](google.com): 
- sandwiched it between an opening and closing bracket 
- then place an actual link next to it
- sandwich that link between two parentheses
```
- ######标题
```
I am  ###### heading
How to convert a word into a ##### heading: 
- Preface the word with hashtags 
- The more hashtags, the smaller the word gets
- More hashtags indicate the heading is less important
- # Heading 1 - I am super important.
- ## Heading 2 - I am a subtitle
- ### Heading 3 - I am less important
- #### Heading 4 - I am even smaller and less important
```

[](./images/ARTS-week-41-4.gif)

💪🏾 我们成功了！我们在不到 2 分钟的时间内用 GitHub Copilot 开发了一个降价编辑器。

#### 奖励：使用Copilot Chat来设计，测试和解释您的UI
这很有趣，但我们可以做得更多。我们可以编写单元测试，设置UI样式，并获得代码的解释。我们可以独立做，但为此与 GitHub Copilot 进行配对程序会成倍地有趣。

要完成本教程的后半部分，您需要访问Copilot Chat。此外，您需要订阅GitHub Copilot 才能访问 CopilotChat。在此处了解更多信息。

Copilot Chat在您的编辑器中是一种类似 ChatGPT 的体验，但它不仅仅是一个聊天窗口。由于 Copilot Chat 已深度嵌入到 IDE 中，因此它具有开发人员键入的内容以及开发人员收到的错误消息的上下文。

让我们尝试使用Copilot Chat在我们的markdown编辑器中设置样式，测试和解释代码！

我对这个框架感到满意，所以我自信地接受了以前生成的代码。但是，您可能不熟悉 React 或 Next.js，因此生成的代码对您来说看起来很陌生。这是一个问题，因为您不想盲目接受代码。了解将合并到生产环境中的代码至关重要。幸运的是，Copilot Chat可以为您的代码提供深入的解释。

##### 第 1 步：打开扩展程序！

安装后，尝试打开扩展。它应该呈现一个带有欢迎消息的面板。

[](./images/ARTS-week-41-6.png)

##### 步骤 2：获取生成的代码块的说明
让我们让 Copilot Chat 解释一下功能。 handleChange

首先，突出显示函数的代码块 handleChange
突出显示后右键单击
选择“Copilot”
选择“Explain This”

[](./images/ARTS-week-41-7.gif)

按照上述步骤操作后，Copilot Chat 应提供类似于以下的解释！

```
此代码定义了一个名为 handleChange 的函数，该函数将事件对象作为其参数。handleChange 函数通常用作 React 组件中文本区域元素的事件处理程序。当用户在文本区域中键入内容时，将使用包含有关用户输入的信息的事件对象调用 handleChange 函数。
handleChange 函数使用 setMarkdown 函数来更新名为 markdown 的状态变量的值。setMarkdown 函数是由 React 库提供的 useState 钩子返回的函数。useState 钩子用于在 React 中为功能组件添加状态。通过使用 setMarkdown 函数更新 markdown 状态变量，包含此代码的组件可以重新呈现自身以反映新状态。
总的来说，此代码定义了一个名为 handleChange 的函数，该函数用于更新名为 markdown 的状态变量的值以响应用户输入。setMarkdown 函数用于更新状态变量，useState 钩子用于在 React 中为功能组件添加状态。
```

💡 如果需要更清晰的信息，可以使用任何单独的代码行或代码块重复此步骤。

💡 突出显示的代码行数越多，解释的粒度就越低。如果需要概述，请突出显示整个文件，但如果想要精细的说明，请突出显示各个代码块。


##### 第 3 步：设置 markdown 编辑器的样式

让我们与Copilot Chat交流，以指导我们设置降价编辑器的样式。

✍🏿 这是我问Copilot Chat的问题：“你能提出一些代码来让我的markdown编辑器有一个更现代的UX设计吗？请使用样式化组件。

[](./images/ARTS-week-41-8.gif)

###### 第 4 步：查看 Copilot 聊天的回复

我想再次强调，生成AI和GitHub Copilot具有非确定性输出，因此结果可能会有所不同。Copilot Chat提出了处理以下代码的代码：

- 导入样式化组件 npm 包
- 设置降价编辑器容器的样式
- 设置文本输入的样式
- 设置降价预览的样式

请参阅下面生成的代码：

```js
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
`;

const TextArea = styled.textarea`
  width: 50%;
  height: 50%;
  padding: 1rem;
  border-radius: 5px;
  border: none;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  font-size: 1rem;
  resize: none;
`;

const Preview = styled(ReactMarkdown)`
  width: 50%;
  height: 50%;
  padding: 1rem;
  border-radius: 5px;
  border: none;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  font-size: 1rem;
  overflow-y: scroll;
  background-color: white;
`;

const Index = () => {
  const [markdown, setMarkdown] = useState('## markdown preview');

  const handleChange = e => {
    setMarkdown(e.target.value);
  };

  return (
    <Container>
      <TextArea value={markdown} onChange={handleChange} />
      <Preview>{markdown}</Preview>
    </Container>
  );
}

export default Index;
```

我查看了代码，它对我来说似乎是一个可行的解决方案，所以我复制了生成的代码并将其粘贴到 myfile 中。

###### 第 5 步：查看结果
这是我的最终结果：

[](./images/ARTS-week-41-9.png)

我想这是 Copilot 的现代 UX 设计版本，对我来说看起来好一点，但它可以使用一些改进。对于作为开发人员的您来说，这是一个很好的机会来调整代码以符合您的愿景！

###### 第 6 步：继续尝试
我花了 20 多分钟来试验 Copilot Chat，以改进我的提示游戏并了解 Copilot 的局限性。我问了它不同的问题，例如：

- 如何添加工具栏？
- 如何添加深色模式和浅色模式主题？

这是它想出的：

[](./images/ARTS-week-41-10.png)

🧑🏾 🎨 发挥创意，让您的 markdown 编辑器成为您自己的！

###### 步骤 7：使用 Copilot 聊天编写单元测试

虽然编写单元测试对于任何生产应用程序的寿命都至关重要，但这也是一个非常乏味的过程。我很高兴这个行业正朝着自动化样板代码和重复代码的方向发展。

我们可以请求 Copilot 聊天使用斜杠命令为我们的降价编辑器生成单元测试。

在Copilot Chat中输入“/tests”后，我收到了建议的单元测试，并附有简短的说明。请参阅以下结果：

```js
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Index from './index';

describe('Index', () => {
  it('renders the bold, italic, and theme toggle buttons', () => {
    const { getByText } = render(<Index />);
    expect(getByText('Bold')).toBeInTheDocument();
    expect(getByText('Italic')).toBeInTheDocument();
    expect(getByText('Dark Mode')).toBeInTheDocument();
  });

  it('toggles between dark and light mode when the theme toggle button is clicked', () => {
    const { getByText, container } = render(<Index />);
    const themeToggle = getByText('Dark Mode');
    expect(container.firstChild).toHaveStyle('background-color: #fff');
    fireEvent.click(themeToggle);
    expect(container.firstChild).toHaveStyle('background-color: #000');
    fireEvent.click(themeToggle);
    expect(container.firstChild).toHaveStyle('background-color: #fff');
  });

  it('updates the markdown text when the textarea is changed', () => {
    const { getByLabelText, getByText } = render(<Index />);
    const textarea = getByLabelText('Markdown Input');
    fireEvent.change(textarea, { target: { value: '# Hello World!' } });
    expect(getByText('# Hello World!')).toBeInTheDocument();
  });

  it('applies bold formatting to selected text when the bold button is clicked', () => {
    const { getByText, getByLabelText } = render(<Index />);
    const textarea = getByLabelText('Markdown Input');
    fireEvent.change(textarea, { target: { value: 'Hello **World**!' } });
    const boldButton = getByText('Bold');
    fireEvent.click(boldButton);
    expect(textarea.value).toBe('Hello **World**!');
    fireEvent.change(textarea, { target: { value: 'Hello **World!**' } });
    fireEvent.click(boldButton);
    expect(textarea.value).toBe('Hello World!');
  });

  it('applies italic formatting to selected text when the italic button is clicked', () => {
    const { getByText, getByLabelText } = render(<Index />);
    const textarea = getByLabelText('Markdown Input');
    fireEvent.change(textarea, { target: { value: 'Hello *World*!' } });
    const italicButton = getByText('Italic');
    fireEvent.click(italicButton);
    expect(textarea.value).toBe('Hello *World*!');
    fireEvent.change(textarea, { target: { value: 'Hello *World!*' } });
    fireEvent.click(italicButton);
    expect(textarea.value).toBe('Hello World!');
  });
});
```

这些测试涵盖了组件的基本功能，包括呈现正确的按钮、在深色和浅色模式之间切换、更新降价文本以及对所选文本应用粗体和斜体格式。请注意，这些测试假定 TextArea 和 Preview 组件工作正常，因此您可能还需要为这些组件编写其他测试。

请注意：我没有尝试单元测试，因此请自费使用。我强烈建议在合并到分支之前运行测试并查看代码。

### 3.Tip:

#### What is the use of interface constants?

将静态成员放入接口（并实现该接口）是一种不好的做法，甚至还有一个名称，常量接口反模式，请参阅有效 Java，第 17 项：

```
常量接口模式是对接口的不良使用。类在内部使用一些常量是一个实现细节。实现常量接口会导致此实现详细信息泄漏到类的导出 API 中。对于类的用户来说，类实现常量接口无关紧要。事实上，它甚至可能使他们感到困惑。更糟糕的是，它代表了一个承诺：如果在将来的版本中修改了类，使其不再需要使用常量，它仍然必须实现接口以确保二进制兼容性。如果一个非最终类实现了常量接口，则其所有子类的命名空间都将被接口中的常量污染。

Java 平台库中有几个常量接口，例如。这些接口应被视为异常和 不应模仿。java.io.ObjectStreamConstants
```

为了避免常量接口的一些陷阱（因为你无法阻止人们实现它），应该首选一个带有私有构造函数的适当类（示例借用自维基百科）：

```
public final class Constants {

    private Constants() {
        // restrict instantiation
    }

    public static final double PI = 3.14159;
    public static final double PLANCK_CONSTANT = 6.62606896e-34;
}
```

要访问常量而不必完全限定它们（即不必在它们前面加上类名），请使用静态导入（自 Java 5 以来）：

```
import static Constants.PLANCK_CONSTANT;
import static Constants.PI;

public class Calculations {

    public double getReducedPlanckConstant() {
        return PLANCK_CONSTANT / (2 * PI);
    }
}
```

### 4.Share:

[Java中定义常量方法及建议（Class/Interface） ](https://www.cnblogs.com/wanqieddy/p/9051568.html)

[Mybatis四大组件、四大对象、三个组成部分](https://blog.csdn.net/csdn_tiger1993/article/details/112417864)