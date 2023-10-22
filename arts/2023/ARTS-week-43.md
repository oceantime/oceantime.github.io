---
> **ARTS-week-43**
> 2023-10-20 20:36
---


## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm: 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

- [260. 只出现一次的数字 III](https://leetcode.cn/problems/single-number-iii/submissions/474480011/)  
    + 思路：哈希
- [2530. 执行 K 次操作后的最大分数](https://leetcode.cn/problems/maximal-score-after-applying-k-operations/submissions/475104547/) 
    + 思路：哈希
- [1726. 同积元组](https://leetcode.cn/problems/tuple-with-same-product/submissions/475412196/)  
    + 思路：哈希

### 2.Review:

[使用 Copilot Chat 来辅助 JavaScript 进行 TypeScript 迁移](https://dev.to/github/migrate-from-javascript-to-typescript-with-copilot-chat-2f91)

人们将 JavaScript 应用程序迁移到 TypeScript 的原因有很多，包括帮助开发人员在开发过程中快速捕获错误。但是，将项目从 JavaScript 转换为 TypeScript 可能很复杂。幸运的是，有一些工具可以帮助我们进行迁移。在这篇博文中，我们将探讨 Copilot Chat 如何帮助将 JavaScript 应用程序迁移到 TypeScript。

#### 什么是 Copilot Chat？

Copilot Chat 是一个聊天界面，允许您提出与编码相关的问题并直接在受支持的 IDE 中接收答案。

#### 将 JavaScript 迁移到 TypeScript

就我而言，我构建了一个使用 Next.js 和 Web5 SDK 构建的 AI 驱动的任务管理应用程序。我希望我的Next.js项目使用TypeScript。我计划向此应用程序添加更多功能，切换到 TypeScript 可以帮助我管理应用程序的可维护性。

不幸的是，我不记得将JavaScript应用程序转换为TypeScript的所有步骤，因为这不是我每天都要做的事情，所以我依靠Copilot Chat寻求帮助。

[](./images/ARTS-week-43-1.png)

#### 第 1 步：向 Copilot Chat 寻求帮助

首先，我在我首选的IDE（Codespaces/Visual Studio Code）中打开了我的项目，我问Copilot Chat：“你能帮我把Next.js项目转换为TypeScript吗？

[](./images/ARTS-week-43-2.png)

Copilot Chat通过分步指南回答了我的询问。

[](./images/ARTS-week-43-3.png)

##### 步骤 2：安装所需类型

首先，Copilot Chat 建议在我的终端中运行一个命令来安装 Next.js 和 React 所需的类型。

```
npm install --save-dev typescript @types/react @types/node 
```

##### 第 3 步：重命名我的文件

接下来，Copilot Chat建议我重命名我的所有文件。它进一步解释说，使用文件扩展名有助于TypeScript实现文件包含JSX。.js.tsx.tsx

##### 步骤 4：创建 tsconfig.json 文件

然后，为了配置TypeScript编译器并指定如何编译TypeScript代码，Copilot Chat建议我在项目的根目录下创建aat。它还提供了编译器选项，我可以将其复制并粘贴到文件中。tsconfig.json

```json
{
  "compilerOptions": {
    "target": "esnext",
    "module": "commonjs",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "jsx": "preserve",
    "noEmit": true,
    "isolatedModules": true,
    "esModuleInterop": true,
    "strict": true,
    "noImplicitAny": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

##### 第 5 步：修改我的 next.config.js 文件
Copilot Chat 建议我更新我的 next.config.js 文件，使 Webpack 能够识别和编译我项目中的 TypeScript 文件。

```js
module.exports = {
  // ...
  webpack(config, options) {
    config.resolve.extensions.push('.ts', '.tsx');
    return config;
  },
};
```

##### 步骤 6：更新我的包.json 文件

Copilot Chat 建议我将以下脚本添加到我的package.json

```js
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "type-check": "tsc",
    "lint": "eslint . --ext .ts,.tsx"
  }
}
```

"type-check": "tsc"运行 TypeScript 编译器以检查我的 TypeScript 代码是否存在错误。

"lint": "eslint . --ext .ts,.tsx"运行 ESLint linter 以检查我的代码是否存在样式和语法错误。


##### 步骤 7：转换索引文件中的代码

最后一步涉及将索引文件中的代码转换为 TypeScript。Copilot Chat 将 myfile 转换为使用 TypeScript 语法。此外，Copilot Chat 为任务和子任务生成了两个界面，以确保类型安全。index.js

```ts
interface Task {
  id: string;
  text: string;
  subTasks: SubTask[];
}

interface SubTask {
  text: string;
  completed: boolean;
}
```

#### Copilot Chat 的美妙之处
我喜欢的是：除了简化可能令人生畏的迁移过程外，Copilot Chat 还为每项更改提供了清晰的解释。这有助于我对添加的 AI 生成的代码做出明智的决定。我还可以向Copilot Chat提出后续问题，以获取我仍然不清楚的概念或建议。例如，我问Copilot Chat：“为什么我需要更新我的package.json？

作为回应，Copilot Chat告诉我，更新将帮助我进行代码类型检查。它还分解了新package.json

- "dev": "next dev"启动 Next.js 应用程序的开发服务器。
- "build": "next build"为生产环境构建 Next.js 应用程序。
- "start": "next start"启动 Next.js 应用程序的生产服务器。
- "type-check": "tsc"运行 TypeScript 编译器以检查 TypeScript 代码是否存在错误。
- "lint": "eslint . --ext .ts,.tsx"运行 ESLint linter 以检查代码是否存在样式和语法错误。

### 3.Tip:

#### IDEA 重构快捷键-抽(extract)

```
抽取当前选择为变量（extract variable）：CTRL+ALT+V
抽取当前选择为属性（extract field）：CTRL+ALT+F
抽取当前选择为常量（extract constant）：CTRL+ALT+C
抽取当前选择为方法（extract method）：CTRL+ALT+M
抽取当前选择为方法参数（extract parameter）：CTRL+ALT+P
抽取代码块至if、try等结构中（surround with）：CTRL+ALT+T
```

### 4.Share:

[mybatis 九大动态标签详解](https://blog.csdn.net/qq_39249094/article/details/107199696)

[何所谓DFX](https://bbs.huaweicloud.com/blogs/detail/111852)
