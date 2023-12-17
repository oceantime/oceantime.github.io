---
> **ARTS-week-51**
> 2023-12-17 08:42
---


## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm: 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

- [1631. 最小体力消耗路径](https://leetcode.cn/problems/path-with-minimum-effort/submissions/488099050/) 
    + 思路：BFS
- [2415. 反转二叉树的奇数层](https://leetcode.cn/problems/reverse-odd-levels-of-binary-tree/submissions/489007359/) 
    + 思路：DFS
- [2697. 字典序最小回文串](https://leetcode.cn/problems/lexicographically-smallest-palindrome/submissions/488790912/)
    + 思路：贪心

### 2.Review:

[👏 你比你想象的更擅长编码](https://dev.to/evergrowingdev/youre-better-at-coding-than-you-think-you-are-1gd)

有抱负的开发人员永远不会成功。

哇，这是一个大胆的声明，对吧？但是，在你认为我疯了或只是彻头彻尾的卑鄙😅之前，让我分解一下

当人们说他们“渴望”成为任何东西时，他们通常有实现某事的梦想或目标。

但有梦想并不等于付诸行动。

作为一个“有抱负”的开发人员，你可能强烈渴望在编程方面取得成功，但如果你不采取任何行动，你的抱负不会带来任何切实的结果。

然而，另一方面，如果你曾经写过任何代码，即使它很简单，那么我希望你从你的脑海中抹去“有抱负”这个词，并开始声称你应得的头衔：开发人员。console.log('hello world')

“但我还在学习，我怎么能声称这个？”

这么说吧，如果你喜欢唱歌，但你没有与唱片公司签约，这会让你变得不那么像歌手吗？

我在这里告诉你，无论你的水平或经验如何，你都比你想象的更擅长编码。

以下是你如何开始相信你也很棒：

#### 转变这种思维方式 🤯

在学习如何编码时，您的思维方式可以使一切变得不同。

拥有固定的心态=相信你的能力是预先确定的和不可改变的。

结果：当面临挑战或挫折时，你更有可能放弃。

而。。。

拥有成长心态=相信自己的能力可以通过努力工作和奉献精神得到发展。

结果：在面对障碍时，您将更具弹性，并且更有可能坚持您的编码之旅。

#### 那么，当谈到更好地编码时，如何从固定心态转变为成长心态呢？

当你犯了一个编码错误时——相信我，你会犯很多错误——试着把它看作是学习和成长的机会，而不是你内在失败的标志。

通过以这种方式重新定义你的错误，你将更有可能从中吸取教训，而不太可能气馁。

学习会让你变得更好。

此外，无论多么小，都要专注于取得进步。庆祝每一次小小的胜利，并将其作为继续前进的动力。

进步使你变得更好。

#### 找到你的优势 💪

作为一名开发人员（是的，现在包括你），重要的是要记住，你拥有独特的优势和才能，使你与其他编码人员区分开来。

无论是解决问题的天赋、设计眼光，还是编写干净、高效代码的诀窍，您的优势都可以帮助您在编码世界中茁壮成长。

#### 但是，作为程序员，您如何发现和利用自己的优势呢？

答案很简单，就是反复试验。

尝试尝试不同的编程语言，看看您最喜欢和喜欢使用哪种语言。不要害怕尝试新事物——即使它超出了你的舒适区。例如，后端语言，尽管只使用前端语言。

实验会让你变得更好。

发现和利用自己优势的另一个技巧是寻求他人的反馈。询问人们对您作为编码员的优势和劣势的诚实意见。使用此反馈来帮助你专注于自己的优势，并努力改进任何劣势。

接受反馈会让你变得更好。

#### 实践💫的力量

正如我之前提到的，只有行动才能使你成为一个成功的开发人员。

持续的练习对于建立技能和信心至关重要。就像任何其他技能一样，编码需要重复和奉献精神才能熟练掌握。

#### 但是，如何才能创建一个适合您的练习程序呢？

开始每天或每周留出固定的练习时间。无论是 30 分钟还是一个小时，保持一致的练习时间表都将帮助您保持专注和动力。

考虑每天或每周锁定一个特定时间，并像对待任何其他重要的约会或任务一样对待它。

定期练习会让你变得更好。

一种实用的练习方法是进行编码挑战和练习。这些挑战可以通过提供要解决的实际问题来帮助您建立技能和信心。寻找适合您的经验水平的在线编码挑战或练习，并尝试在每次练习中至少完成一个挑战。

挑战自己会让你变得更好。

请记住，有效练习的关键是重复。如果您一开始对某个特定概念或练习感到困难，请不要气馁 - 继续练习，直到它成为第二天性。随着时间的流逝，您会发现持续的练习会带来稳步的进步并增强对编码技能的信心。

重复会让你变得更好。

### 3.Tip:

#### AOP 

@Pointcut 方式一：设置为注解@LogFilter1标记的方法，有标记的方法触发该AOP，没有标记就没有。

```java
@Aspect
@Component
public class LogFilter1Aspect {
    @Pointcut(value = "@annotation(com.train.aop.annotation.LogFilter1)")
    public void pointCut(){
    
    }
}

// LogFilter1代码：
@Target(ElementType.METHOD)
@Retention(value = RetentionPolicy.RUNTIME)
public @interface LogFilter1 {
}

// 对应的Controller方法如下，手动添加@LogFilter1注解：
@RestController
public class AopController {

    @RequestMapping("/aop")
    @LogFilter1
    public String aop(){
        System.out.println("这是执行方法");
        return "success";
    }
}
```

@Pointcut 方式二：采用表达式批量添加切入点，如下方法，表示AopController下的所有public方法都添加LogFilter1切面

```java
@Pointcut(value = "execution(public * com.train.aop.controller.AopController.*(..))")
public void pointCut(){

}
```

@Around 环绕通知，可以说是使用最频繁的方式，会将整个方法包围起来

```java
@Around(value = "pointCut()")
public Object round(ProceedingJoinPoint joinPoint){
    System.out.println("1、Round begin");
    Object obj = null;
    try {
        obj = joinPoint.proceed();
    } catch (Throwable throwable) {
        throwable.printStackTrace();
    }
    System.out.println("1、Round end");
    return obj;
}
```

### 4.Share:

[Spring AOP讲解（Pointcut、Before、Around、AfterReturning、After）](https://www.cnblogs.com/fhblikesky/p/13692689.html)

[The PARA Method: The Simple System for Organizing Your Digital Life in Seconds](https://fortelabs.com/blog/para/)