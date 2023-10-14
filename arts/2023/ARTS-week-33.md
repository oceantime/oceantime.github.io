---
> **ARTS-week-33**
> 2023-08-12 19:38
---


## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm: 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

- [1749. 任意子数组和的绝对值的最大值](https://leetcode.cn/problems/maximum-absolute-sum-of-any-subarray/submissions/454267019/)  
    + 思路：贪心
- [1289. 下降路径最小和 II](https://leetcode.cn/problems/minimum-falling-path-sum-ii/submissions/454958141/)  
    + 思路：二维数组DP
- [23. 合并 K 个升序链表](https://leetcode.cn/problems/merge-k-sorted-lists/submissions/455771367/)  
    + 思路：优先队列排序

### 2.Review:

[使用 ChatGPT 提示📝加速您的工作流程 - 抛弃样板📃✖️并消除重复项](https://dev.to/renanfranca/accelerate-your-workflow-with-chatgpt-prompts-ditch-the-boilerplate-and-eliminate-duplicates-p14)

在我们不断发展的数字环境中，效率是游戏规则的代名词。作为开发人员，我们一直在寻找能够简化工作流程并提高代码质量的工具和实践。实现这一目标的一种强大方法是使用基于AI的提示，特别是OpenAI的ChatGPT提示。

#### 1. 解开样板代码

样板代码是指必须包含在许多地方的代码部分，几乎没有更改。这通常是必要的，但可能会使我们的代码库膨胀，使其更难阅读和维护。此外，不断键入这些代码部分的行为既耗时又单调。

这就是 ChatGPT 提示的美妙之处。

#### 2. 利用 ChatGPT 提示的强大功能

ChatGPT 提示可以通过自动生成样板代码来大大加快开发过程。这不仅减少了手动键入，而且还最大限度地减少了在复制和粘贴代码等重复性任务中经常出现的错误风险。我将向您展示一些使用 chatGPT-4 的示例。

##### 一个实际的例子：从JSON到Typescript对象

作为第一个示例，我将介绍一个简单的提示，让您在转到复杂提示之前习惯它。

假设您有一个需要转换为 Typescript 对象的 JSON。下面是您可以使用的示例提示：

提示：将以下 JSON 转换为打字稿对象：

```json
{
  "id": 1,
  "name": "John",
  "email": "john@example.com",
  "details": {
    "age": 30,
    "address": "123 Main St"
  }
}
```

在 ChatGPT 的帮助下，输出将是：

```ts
interface Details {
  age: number;
  address: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  details: Details;
}

const user: User = {
  id: 1,
  name: "John",
  email: "john@example.com",
  details: {
    age: 30,
    address: "123 Main St",
  },
};
```

通过一个简单的提示，我们设法将JSON对象转换为Typescript对象，大大减少了这项常见任务所需的时间和精力。

立即尝试此提示：来自 JSON 的 TS 对象

##### 抛弃带有提示的样板

我喜欢在不同的文件中组织我的 Vuejs 组件，例如，一个名为 Homepage 的组件：

[](./images/ARTS-week-33-1.png)

以下提示为不同的组件名称生成这些文件的内容：

提示：

在 vue 3 js 中，考虑文件夹主页内此文件的组织：

```ts
- index.ts:
import HomepageVue from './HomepageVue.vue';

export { HomepageVue };

- HomepageVue.vue:
<template src="./Homepage.html"></template>

<script lang="ts" src="./Homepage.component.ts"></script>

- Homepage.html:

<div>
</div>

- Homepage.component.ts:
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomepageVue',
});
```

现在，您将向我询问新组件的名称，并将主页替换为新组件名称。之后，您将永远再次要求其他组件名称。

ChatGPT：当然，我可以帮你。首先，新组件的名称是什么？

提示：登录

ChatGPT：

```
根据您的请求，新组件“登录”的文件结构应如下所示：
```

- index.ts:：
```ts
import SignInVue from './SignInVue.vue';

export { SignInVue };
```

- SignInVue.vue：
```ts
<template src="./SignIn.html"></template>

<script lang="ts" src="./SignIn.component.ts"></script>
```

- SignIn.html:
```ts
<div>
</div>
```

- SignIn.component.ts:
```ts
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SignInVue',
});
```

```
让我们继续。您想使用的下一个组件名称是什么？
```

然后我可以继续创建新组件并将它们复制并粘贴到我的 Vuejs 项目中😎！

立即查看此提示：生成 Vuejs 组件

##### 使用提示放弃重复项

ChatGPT 不仅限于样板代码;它还可用于识别和重构重复的代码，这是软件开发中的另一个常见问题。

假设我们有一个图书馆的软件系统。该系统有两个主要功能：向图书馆成员借书和补充归还的书籍。

以下是具有大量重复的代码以及您可以在以下位置使用的提示：

提示：
从以下 Java 类中删除重复项：

```java
public class LibrarySystem {

    private List<Book> availableBooks;
    private Map<Member, List<Book>> lentBooks;

    // other necessary code...

    public void lendBook(Member member, Book book) {
        if (availableBooks.contains(book)) {
            // removing the book from the available book list
            availableBooks.remove(book);
            // adding the book to the member's lent books
            List<Book> memberBooks = lentBooks.get(member);
            if (memberBooks == null) {
                memberBooks = new ArrayList<>();
                lentBooks.put(member, memberBooks);
            }
            memberBooks.add(book);
            // generating a due date for returning the book, let's say in two weeks
            LocalDate dueDate = LocalDate.now().plusWeeks(2);
            // printing out a receipt
            System.out.println("Book: " + book.getTitle() + " lent to: " + member.getName() + " Due date: " + dueDate);
            // other necessary code...
        } else {
            System.out.println("The book is not available.");
        }
    }

    public void restockBook(Member member, Book book) {
        if (lentBooks.get(member) != null && lentBooks.get(member).contains(book)) {
            // removing the book from the member's lent books
            lentBooks.get(member).remove(book);
            // adding the book to the available book list
            availableBooks.add(book);
            // calculating and printing out any late fees
            LocalDate dueDate = LocalDate.now().minusWeeks(2); // assuming the book was due two weeks ago
            LocalDate returnDate = LocalDate.now();
            if (returnDate.isAfter(dueDate)) {
                long daysLate = ChronoUnit.DAYS.between(dueDate, returnDate);
                double lateFee = daysLate * 0.50; // assuming the late fee is 50 cents per day
                System.out.println("Late fee for book: " + book.getTitle() + " is: " + lateFee);
            }
            // other necessary code...
        } else {
            System.out.println("The book was not lent to this member.");
        }
    }
}
```

ChatGPT:

在从映射中检索成员的书籍列表的代码中可以看到此 Java 类中的重复项。此代码段在两种方法中都重复，并且。若要删除此重复项，可以创建一个帮助程序方法，该方法采用 aas 参数并返回 a。以下是重构的代码：lendBookrestockBookgetMemberBooksMemberList<Book>

```java
public class LibrarySystem {

    private List<Book> availableBooks;
    private Map<Member, List<Book>> lentBooks;

    // other necessary code...

    private List<Book> getMemberBooks(Member member) {
        List<Book> memberBooks = lentBooks.get(member);
        if (memberBooks == null) {
            memberBooks = new ArrayList<>();
            lentBooks.put(member, memberBooks);
        }
        return memberBooks;
    }

    public void lendBook(Member member, Book book) {
        if (availableBooks.contains(book)) {
            // removing the book from the available book list
            availableBooks.remove(book);
            // adding the book to the member's lent books
            List<Book> memberBooks = getMemberBooks(member);
            memberBooks.add(book);
            // generating a due date for returning the book, let's say in two weeks
            LocalDate dueDate = LocalDate.now().plusWeeks(2);
            // printing out a receipt
            System.out.println("Book: " + book.getTitle() + " lent to: " + member.getName() + " Due date: " + dueDate);
            // other necessary code...
        } else {
            System.out.println("The book is not available.");
        }
    }

    public void restockBook(Member member, Book book) {
        List<Book> memberBooks = getMemberBooks(member);
        if (memberBooks.contains(book)) {
            // removing the book from the member's lent books
            memberBooks.remove(book);
            // adding the book to the available book list
            availableBooks.add(book);
            // calculating and printing out any late fees
            LocalDate dueDate = LocalDate.now().minusWeeks(2); // assuming the book was due two weeks ago
            LocalDate returnDate = LocalDate.now();
            if (returnDate.isAfter(dueDate)) {
                long daysLate = ChronoUnit.DAYS.between(dueDate, returnDate);
                double lateFee = daysLate * 0.50; // assuming the late fee is 50 cents per day
                System.out.println("Late fee for book: " + book.getTitle() + " is: " + lateFee);
            }
            // other necessary code...
        } else {
            System.out.println("The book was not lent to this member.");
        }
    }
}
```

通过简单地运行 ChatGPT 提示来识别和重构重复的代码，我们简化了代码，增强了可读性和可维护性。

此提示在此处可用：在 Java 中删除重复项


### 3.Tip:

#### Android DialogFragment 如何显示和隐藏

- 隐藏其实是可以直接使用 dialog.show() or dialog.hide() 来实现
```shell
@Override
public void onStart() {
    super.onStart();
    if (mDialog != null) {
        mViewDestroyed = false;
        mDialog.show();
    }
}

@Override
public void onStop() {
    super.onStop();
    if (mDialog != null) {
        mDialog.hide();
    }
}
```

### 4.Share:

[DialogFragment 设置全屏方法](https://blog.csdn.net/wangtao0921/article/details/51003353)

[Android 入门（四） | Intent 实现 Activity 切换](https://blog.csdn.net/Jormungand_V/article/details/122540602)

[Android核心技术-Activity与Intent](https://blog.csdn.net/qq_40318498/article/details/89743478)
