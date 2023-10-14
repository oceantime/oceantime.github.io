---
> **ARTS-week-35**
> 2023-08-27 08:55
---


## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm: 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

- [1267. 统计参与通信的服务器](https://leetcode.cn/problems/count-servers-that-communicate/submissions/459327837/)  
    + 思路：计数
- [1448. 统计二叉树中好节点的数目](https://leetcode.cn/problems/count-good-nodes-in-binary-tree/submissions/459648343/)  
    + 思路：DFS
- [56. 合并区间](https://leetcode.cn/problems/merge-intervals/submissions/460194494/)  
    + 思路：排序

### 2.Review:

[为什么使用 GitHub Copilot 和 Copilot Labs：AI 对程序员的实际用例](https://dev.to/github/why-use-github-copilot-and-copilot-labs-practical-use-cases-for-the-ai-pair-programmer-4hf4)

尽管当他们宣布Copilot时，我没有在GitHub工作，但我记得它激起了我的兴趣。也许，我主要是兴奋，因为它是新的和闪亮的。（另外，因为我喜欢其他环境中的预测文本，比如写电子邮件，为什么不在我的代码编辑器中呢？当我获得该功能的访问权限时，我意识到两件事：

- 1.这不是魔法。
- 2.GitHub Copilot无法读懂我的想法，它也不会总是吐出写得很好的最新代码。

Copilot增强了我作为程序员的信心和速度。

对我来说，Copilot的价值在于我花更少的时间强调语法，从而有更多的时间解决问题。

最近，GitHub Next，一个探索技术和软件未来超越相邻可能性的团队，发布了Copilot Labs。这个实验性的 VS Code 侧边栏使开发人员能够将他们的代码从一种编程语言翻译成另一种编程语言，并用简单的语言解释代码片段。

借助 Copilot 和 Copilot Labs，您可以：
- 根据代码中的注释和现有模式生成预测代码行
- 阅读代码片段的说明
- 将代码从一种编程语言翻译成另一种编程语言

这些听起来超级酷，但你什么时候会使用它们？

在这篇博文中，我分享了我最喜欢的 GitHub Copilot 和 GitHub Copilot Labs 用例。

#### 1. 什么是 Copilot？

在我介绍如何使用Copilot之前，我将向不熟悉它的人解释该功能。

GitHub Copilot 是一个 AI 对程序员，可帮助您更快地编写代码，减少工作量。GitHub Copilot 从注释和代码中提取上下文，并立即建议单个行和整个函数。GitHub Copilot由OpenAI Codex提供支持，OpenAI Codex是由OpenAI创建的新AI系统。GitHub Copilot技术预览版可作为Visual Studio Code，Neovim和JetBrains集成IDE的扩展。

TLDR：换句话说，GitHub Copilot 是一个 IDE 扩展，它根据您编写的注释和代码中的模式提供预测代码。

- 请注意：GitHub Copilot 处于技术预览阶段，因此并非所有用户都能访问此功能。如果您想注册技术预览版，请加入候补名单。

##### 使用案例

- 编码速度快一点

无论我是软件工程师还是开发人员倡导者，我都发现自己处于最后一刻编写代码的时刻，或者我正在经历编码人员的障碍。阅读Copilot的建议让我想起了如何解决常见的日常算法。你可以阅读我的一篇博客文章，关于我如何使用Copilot编写和理解二叉搜索算法。

例如：在一个项目中，我必须读取一个文件，按字母顺序排序，按字母分组，在正确的字母位置插入一个新元素，然后将更新的内容写回文件。幸运的是，Copilot帮助我编写了一个解决方案。见下文：

[](./images/ARTS-week-35-1.png)

- 编写测试
虽然我知道为你的代码编写测试是必不可少的，但我不喜欢它。我经常花很长时间开始 - 试图记住像mock，nock，beforeEach和After All这样的关键字之间的区别。然后，当我了解模式时，对我来说，达到特定的测试覆盖率是一个乏味的过程。这就是Copilot可以派上用场的地方。我可以写一些评论来描述我想测试的内容;然后，Copilot可能会建议测试所需的代码。我也可以开始编写测试，Copilot可能会为其他需要的测试提供预期的代码。要了解更多信息，请阅读 Colby Fayock 的 UsingGitHub Copilot to Automate Tests。

- 写更好的评论
有时，写出精彩的评论最终会被搁置一旁。有一种倾向是，假设你的代码是干净的，可读的，并且不需要注释，直到你第二天回到你的代码并且你无法破译象形文字。由于写得好的评论往往会从 Copilot 获得更好的结果，所以我更有动力写明确的、相关的评论（我把它们留在我的代码中插入脑海中的表情符号）。

- 与同事结对编程
我在结对编程方面也不是很好，尤其是当我是经验不足的工程师时。人们注视着我的一举一动，尤其是当我编码时，我感到焦虑。阻止我前进的是我经常试图记住语法。有了Copilot，我的结对编程伙伴无数次花在谷歌上看“减少javaScript数组方法”的时间更少了。相反，它可能会为我建议正确的语法。

#### 2. 什么是 Copilot Labs？
在我介绍如何使用Copilot Labs之前，我将向不熟悉它的人解释该功能。

Copilot Labs 独立于 GitHub Copilot 扩展（并依赖于 GitHub Copilot 扩展）。虽然Copilot继续向全面发布迈进，但实验室将成为机器学习实验应用的试验场，以改善开发人员的体验。目前，Copilot Labs由一个VS Code侧边栏组成，其中包含以“解释此代码”和“翻译此代码”开头的独特功能。

##### 使用案例

- 适应新的代码库
无论您是获得新的工作还是加入新的开源社区，构建新代码库的心智模型都没有简单的答案。这可能需要几个月的时间，并且代码库不断发展。虽然Copilot Labs无法向我解释整个代码库，但我可以使用它来描述新代码库中的代码块。

- 了解您在 StackOverflow 上找到的解决方案
通常，软件开发人员会复制并粘贴他们在StackOverflow上找到的解决方案，这完全没问题。尽管如此，我们还是有必要了解我们复制了什么以及它为什么有效。利用Copilot Lab的“解释此代码”功能，我能够从StackOverflow复制代码并了解代码在做什么。

- 获取不同数据结构和算法的上下文
我从阅读、观看和实践中学习得最好，这意味着我需要各种资源来创建一个强大的心智模型。当我为面试、大学考试和编码训练营而学习时，我会观看视频，完成 LeetCode 练习，并写代码解释。Copilot Labs作为一个额外的资源，为我提供了更多关于特定算法为什么以及如何工作的背景信息。

- 成为更好的导师
我指导早期职业开发人员。当他们目前是我指导的项目的学生时，我很有帮助，但是一旦他们毕业并开始从事不同技术的工作，我就没用了。有很多时候，他们要求我帮助他们使用 Python 或 Ruby，但我无法提供帮助，因为我不熟悉这些语言。通过Copilot Labs，我可以翻译学员的代码片段，以熟悉的语言阅读代码，更好地了解他们的代码，然后引导他们朝着正确的方向前进。它甚至可以帮助我向学员解释他们的代码中发生了什么，因为有时，作为较新的开发人员，您不确定代码为什么有效，但它确实有效！

### 3.Tip:

#### Thread-safe singleton

第一种：懒汉式（线程不安全）
```java
public class Singleton {    
    private static Singleton instance;    
    private Singleton (){}    
    
    public static Singleton getInstance() {    
    if (instance == null) {    
        instance = new Singleton();    
    }    
    return instance;    
    }    
} 
```

第二种：懒汉式（线程安全）
```java
public class Singleton {    
    private static Singleton instance;    
    private Singleton (){}    
    public static synchronized Singleton getInstance() {    
    if (instance == null) {    
        instance = new Singleton();    
    }    
    return instance;    
    }    
}
```

第三种：饿汉式（线程安全）
```java
public class Singleton {    
    private static Singleton instance = new Singleton();    
    private Singleton (){}    
    public static Singleton getInstance() {    
    return instance;    
    }    
}   
```

第四种：静态内部类的方式创建单例模式（static inner class）（线程不安全）
```java
public class Singleton {
    private Singleton() {
    }
    private static class SingletonHolder {// 静态内部类
        private static Singleton singleton = new Singleton();
    }
    public static Singleton getInstance() {
        return SingletonHolder.singleton;
    }
}
```

第五种：双重校验锁（dubble check instance）（线程不安全）
```java
public class Singleton {  
  
    private static Singleton singleton;  
    private Singleton() {  
    }  
    public static Singleton getInstance(){  
        if (singleton == null) {  
            synchronized (Singleton.class) {  
                if (singleton == null) {  
                    /** 
                     * 为什么这里会使用双重判定呢？ 
                     */  
                    singleton = new Singleton();  
                }  
            }  
        }  
        return singleton;  
    }  
}  
```
#### Android APP之WebView校验SSL证书的方法

```java
webview.setWebViewClient(new WebViewClient() {
  @Override
  public void onReceivedSslError(WebView view, SslErrorHandler handler, SslError error) {
    if (error.getPrimaryError() == SslError.SSL_DATE_INVALID // 日期不正确
        || error.getPrimaryError() == SslError.SSL_EXPIRED // 日期不正确
        || error.getPrimaryError() == SslError.SSL_INVALID // webview BUG
        || error.getPrimaryError() == SslError.SSL_UNTRUSTED) { // 根证书丢失
        if (chkMySSLCNCert(error.getCertificate())) {
            handler.proceed(); // 如果证书一致，忽略错误
        }
    }
  }
  
  private boolean chkMySSLCNCert(SslCertificate cert) {
    byte[] MySSLCNSHA256 = { 35, 76, 110, -121, -68, -104, -12, 84, 39, 119, -55,
        101, 95, -8, -90, 9, 36, -108, 5, -57, 76, -98, -19, -73, 91, -37, 18,
        64, 32, -41, 0, 109 }; //证书指纹
    Bundle bundle = SslCertificate.saveState(cert);
    byte[] bytes = bundle.getByteArray("x509-certificate");
    if (bytes != null) {
        try {
          CertificateFactory cf = CertificateFactory.getInstance("X.509"); 
          Certificate ca = cf.generateCertificate(new ByteArrayInputSteam(bytes)); 
          MessageDigest sha256 = MessageDigest.getInstance("SHA-256");
          byte[] Key = sha256.digest(((X509Certificate) ca).getEncoded());
          return Arrays.equals(key, MySSLCNSHA256);
        } catch (Exception Ex) {}
    }
    return false;
  }
}
```
### 4.Share:

[apache-通用语言库commons-lang](https://blog.csdn.net/ssehs/article/details/106123458)

[Android -- WebView 支持文件下载的几种方式](https://blog.csdn.net/qq_24382363/article/details/110084912)

[记 Android 依赖排除](https://www.jianshu.com/p/8c6c688b7f0c)

[Jetpack Compose 中的状态管理](https://blog.csdn.net/rikkatheworld/article/details/126007325)

[Java反射深入再理解](https://www.freebuf.com/articles/web/373124.html)