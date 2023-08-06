---
> **ARTS-week-32**
> 2023-08-06 08:51
---


## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm： 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

- [822. 翻转卡片游戏](https://leetcode.cn/problems/card-flipping-game/submissions/452410546/)  
    + 思路：哈希
- [722. 删除注释](https://leetcode.cn/problems/remove-comments/submissions/452750107/)  
    + 思路：字符串
- [24. 两两交换链表中的节点](https://leetcode.cn/problems/swap-nodes-in-pairs/submissions/453645653/)  
    + 思路：链表

### 2.Review:

[Kotlin 还是 Java？哪种编程语言最适合安卓开发人员？](https://dev.to/javinpaul/should-android-developers-learn-kotlin-or-java-13k7)

自从谷歌在2017年谷歌IO上宣布@Kotlin作为Android开发的官方语言以来，想要成为Android开发人员的程序员就陷入了两难境地。
摆在他们面前的大问题是他们应该学习Kotlin还是Java。
如果是一个想要学习Android开发的初学者，那么我的答案是Java，但如果是一个想要进入利润丰厚的Android应用程序开发的Java开发人员，那么我的答案是Kotlin。
在本文中，我将讨论为什么初学者 Android 程序员应该从 Java 开始，以及为什么 Java 开发人员应该学习 Kotlin。
当我说初学者应该从Java开始时，可能会想，“到底是什么？Kotlin 的工作效率更高，样板代码更少，现在是Android 开发的官方语言，这家伙建议学习 Java。我不会上当的...”
好吧，作为一个Java开发人员，我可能有点偏见，但我会尝试解释为什么我建议初学者Android开发人员从Java而不是Kotlin开始的原因。

#### 1. Kotlin 还是 Java？哪个更适合安卓开发者？

首先也是最重要的一点是，Android开发并不是一切;作为一名程序员，可能从Android开发开始的职业生涯，但如果从Java这样的成熟语言开始，就会成为更大的Java社区和市场的一部分，这直接意味着更多的工作机会。

第二件也是更重要的事情是，有一个庞大的Java程序员社区，这意味着当遇到困难时，可以找到答案。

这非常重要，因为作为初学者，将面临很多技术问题，并且当遇到困难时，可能不知道该去哪里。

当在谷歌上搜索Java问题时，一定会得到答案;对于 Kotlin 来说，情况并非如此，它仍然是一种新的编程语言。

还有更多的教程，书籍和课程，免费和付费，可以教使用Java进行Android开发，就像这个Java程序员的Android资源列表，但Kotlin并不多，尤其是Android开发的免费资源。

当越来越多的程序员开始使用 Kotlin 时，随着时间的推移，情况肯定会有所改善，但我怀疑它是否会触及 Java 编程语言的普及和采用。

```
这就是为什么我建议，一个想要成为Android开发人员的初学者应该从Java开始，而不是Kotlin。
```

但是，这不是一个硬性规定;如果由于生产力原因更喜欢学习 Kotlin 而不是 Java，并且主要专注于 Android 开发，那么肯定可以从 Kotlin 开始，Kotlin Fundamentals是一个很好的起点。

但是，一旦了解了 Java，的 Kotlin 之旅也会变得轻松顺利，因为 Kotlin 与 Java 是 100% 可互操作的。它编译成Java字节码并在JVM上运行。

#### 2. Java 程序员应该学习 Kotlin

现在，回到第二组想要学习Android开发的程序员：我们的Java开发人员。对他们来说，我认为最好学习 Kotlin，因为它确实提高了生产力。

一个在 Java 中需要 50 行代码的类实际上可以在 Kotlin 中只用一行编写。它可以帮助避免所有样板代码，例如不需要指定getters和setters，equals（），hashCode（）或toString（）方法。Kotlin 可以自己生成所有这些。

以下是Kotlin和Java在生产力和编写类似内容的代码行方面的一个很好的比较：

[](./images/ARTS-week-32-1.png)

如果不知道，Kotlin 是由 JetBrains 开发的，JetBrains 是最受欢迎的 Java IDE 之一 IntelliJ IDEA 背后的公司。他们是一个Java商店，开发像IntelliJ IDEA，PyCharm和ReSharper这样的IDE，所有这些都是用Java编写的，并构建了Kotlin以提高他们的生产力，但与此同时，他们不能用Kotlin重写所有代码，所以这就是为什么他们使Kotlin与Java完全互操作。

由于 Kotlin 生成 Java 字节码，因此可以在 Kotlin 中使用自己喜欢的 Java 框架和库，的 Java 朋友也可以使用开发的任何 Kotlin框架。

即使是像 Spring 这样的主要 Java 框架，也从 Spring 5 开始支持 Kotlin。如果不知道Spring 5 中的新功能，请查看一下。

尽管目前几乎所有@android代码、示例和应用程序都是用 Java 编写的，但将来它会发生变化，因为 Google 已宣布 Kotlin 为 Android 应用程序开发的官方语言。

许多公司已经开始使用 Kotlin 进行Android 应用程序开发，这也是我认为 Java 开发人员应该学习 Kotlin 的主要原因。

如果决定学习 Kotlin 编程语言，那么Kotlin for Android：从初学者到高级也是一个很棒的地方。对于 Java 开发人员来说，这是一门严肃的课程，它将帮助立即开始使用 Kotlin。

不需要从变量和对象之类的东西开始，因为与其他用于 Android 开发的初学者 Kotlin 课程相比，本课程对 Java 开发人员具有正确的速度和深度。

如果更喜欢书籍，那么Kotlin in Action也不错。可以自己了解 Kotlin 的所有基本功能，例如 var vs val、数据关键字和函数式编程。

[](./images/ARTS-week-32-2.png)

这完全取决于Android 开发人员是否应该学习 Kotlin 或 Java。正如我所说，如果是一个完全的初学者，想要开始的Android开发人员的职业生涯，最好从Java开始。

```
不仅可以立即上手，而且会得到更好的社区支持，并且Java知识将在未来为提供很多帮助。它还将帮助将来学习 Kotlin。
```

如果是一个 Java 开发人员，那么最好开始学习 Kotlin，不仅可以提高的生产力，还可以帮助成为了解 Kotlin 的 Java 开发人员利润丰厚的利基市场的一部分，这可能会给在就业市场上的竞争优势。它也是Java开发人员应该在我的列表中学习的3种JVM语言之一。


### 3.Tip:

#### yyyy-MM-dd'T'HH:mm:ss.SSS'Z'即UTC时间，与String日期转换

- 输出查询结果
```shell
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class UTCTimeFormatTest {
    //UTC就是世界标准时间，与北京时间相差八个时区。所以只要将UTC时间转化成一定格式的时间，再在此基础上加上8个小时就得到北京时间了。
    public static void main(String[] args) throws ParseException {
        //Z代表UTC统一时间:2017-11-27T03:16:03.944Z
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
        Date date = new Date();
        System.out.println(date);
        String str = format.format(date);
        System.out.println(str);
        SimpleDateFormat dayformat = new SimpleDateFormat("yyyy-MM-dd");
        String source ="2018-09-18";        //先将年月日的字符串日期格式化为date类型
        Date day = dayformat.parse(source);　　　　 //然后将date类型的日期转化为UTC格式的时间
        String str2= format.format(day);
        System.out.println(str2);
    }
}
```

运行结果为：
[](./images/ARTS-week-32-3.png)

### 4.Share:

[Spring 5 中的新功能](https://www.pluralsight.com/courses/whats-new-spring-5?clickid=3V8W0pRMSxyNRdTzwETI3zYfUkF1g1zBYx8R3k0&irgwc=1&mpid=1193463&aid=7010a000001xAKZAA2&utm_medium=digital_affiliate&utm_campaign=1193463&utm_source=impactradius)

[The Java Developer Roadmap](https://zhuanlan.zhihu.com/p/112311591)

[3 JVM languages Java Developer Should Learn in 2021](https://blog.vvauban.com/blog/3-jvm-languages-java-developer-should-learn-in-2021#:~:text=If%20you%20want%20to%20move%20to%20the%20functional,do%20scripting%20then%20Groovy%20is%20the%20great%20language.)
