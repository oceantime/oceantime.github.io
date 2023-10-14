---
> **ARTS-week-37**
> 2023-09-08 10:00
---


## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm: 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

- [1123. 最深叶节点的最近公共祖先](https://leetcode.cn/problems/lowest-common-ancestor-of-deepest-leaves/submissions/463413816/)  
    + 思路：二叉树
- [2594. 修车的最少时间](https://leetcode.cn/problems/minimum-time-to-repair-cars/submissions/463754749/) 
    + 思路：二分
- [207. 课程表](https://leetcode.cn/problems/course-schedule/submissions/464425295/)  
    + 思路：图

### 2.Review:

[如何使用GitHub Copilot发送推文](https://dev.to/github/how-to-send-a-tweet-with-github-copilot-4ih7)

这个月，我学会了如何使用 GitHub Copilot 发送推文。太酷了！我预计你可能会想知道：

- 什么是 GitHub Copilot？
- 为什么我想使用 GitHub Copilot 发送推文？
- 它对你有什么价值？
- 我是如何用 Copilot 发送推文的？

#### 1. 首先，什么是GitHub Copilot？

Copilot 是一个 AI 对程序员，可帮助你以更少的工作量更快地编写代码。如果你从未使用过它并且正在努力想象这种行为，我会将其比作Gmail和Google Docs中的智能撰写功能。与智能撰写类似，GitHub Copilot 预测你的下一行代码以提高你的工作效率。

[](./images/ARTS-week-37-1.png)


#### 为什么我使用 GitHub Copilot 发送推文？


##### 原因1

我是一名开发教练，我的部分职责是构建演示以提高开发人员对新功能的认识。七月份，Twitter 的 DevRel 团队要求 GitHub DevRel 团队合作开发一个显示 Twitter API v2 和 GitHub Copilot 的流。该流的目的是表明 GitHub Copilot 可以帮助你利用 Twitter 的 API v2。我兴奋地同意做直播，然后我意识到我必须使用 Tweepy，一个易于使用的 Python 库来访问 Twitter API。我遇到了一个巨大的、明显的问题：我不知道如何用 Python 编写，所以我不容易使用。我是一名训练有素的 JavaScript 开发人员。我甚至可以在 Java 或 C# 代码库中找到自己的方式，但我一生中从未接触过 Python。每个人都说 Python 很容易，因为它很容易阅读，这是他们在学校学到的语言。但是，我只有不到一周的时间来准备和交付演示，互联网上的陌生人看着我。

巧合的是，我发现自己依靠 Copilot 通过 Tweepy 访问 Twitter 的 API。虽然我很紧张，但我意识到这是一个完美的情况。我可以有机地展示 GitHub Copilot 如何帮助我使用 Tweepy。它奏效了！GitHub Copilot 帮助我在不到 30 分钟的时间内构建了演示。虽然我在直播中打了几个小嗝嗝，但它是有效的。

诚然，在我的角色中，我已经签约使用不熟悉的工具进行演示、讨论或构建，因为我相信离开我的舒适区将有助于我快速成长和学习新概念。我已经将 GitHub Copilot 用于多个项目，以帮助我完成快速项目。一些例子包括：

- 使用 Applitools 演示 GitHub Copilot。
- 在我的存储库中构建自动化。
- 只需在不到一天的时间内完成随机的短期申请。

GitHub Copilot并不能取代学习如何编码的复杂性，因为在不知道自己在做什么的情况下，你很容易无意中引入错误或不良做法。但是，如果你对要完成的任务有想法，并且对要编写的代码行背后的逻辑有深入的了解，但又不熟悉语法，Copilot 可以提供帮助。

##### 原因2

我选择使用 Copilot 发送推文是因为我沉迷于 Twitter，我觉得以编程方式发送推文比通过 GET 请求检索推文更令人兴奋。

##### 原因3

从表面上看，以编程方式发送推文似乎并不切实际。我的一个想法是，每当一个问题被标记为 “好的第一个问题” 时，开源项目就可以自动发布 “好的优先问题”。目的是吸引新的贡献者并帮助新的贡献者找到可实现的问题。在 Copilot 的帮助下，我使用 GitHub Actions 为此构建了一个解决方案，我将在以后的文章中介绍。


#### 2.它对你有什么价值？

如果你对 GitHub Copilot 如何为你工作感到好奇，我在这里写了它的各种用例。对于我的简短回答，这很有趣，你将学习如何优化 Copilot 的功能以提高你的工作效率。

#### 3.如何使用 Copilot 发送推文

##### 第 1 步：注册 Twitter 开发者账号
你可以在 Twitter 的文档中找到有关注册 Twitter 开发者账号的信息。

##### 第 2 步：在 Twitter 开发者平台上创建应用
此步骤将帮助你生成访问 Twitter API 所需的令牌和密钥。请注意：这不是创建应用商店中存在的应用程序。相反，这是指你正在构建的“应用程序”，用于与 Twitter 的 API 进行交互。保存使用者机密、使用者密钥、访问令牌和访问令牌机密，因为我们将在本教程后面使用这些凭据。

##### 第 3 步：启用 GitHub Copilot
要启用 GitHub Copilot，请导航到 https://github.com/settings/copilot 这应该会将你带到一个带有按钮的页面，提示你启用 GitHub Copilot。请注意，如果你是学生，你可以免费访问 GitHub Copilot。

[](./images/ARTS-week-37-2.png)

##### 第 4 步：在编辑器中安装 Copilot 扩展
你可以在 Neovim、JetBrains IDE、Visual Studio 和 Visual Studio Code 中安装 GitHub Copilot 扩展。在下图中，我突出显示了 GitHub Copilot 扩展和 GitHub Copilot Labs 扩展。阅读我过去的博客文章，了解这些扩展之间的差异。安装扩展后，它可能会要求你登录，因此请按照提示完成身份验证过程。

[](./images/ARTS-week-37-3.png)

##### 第 5 步：安装 Tweepy

正如我所提到的，tweepy 是一个 Python 库，它可以轻松使用 Twitter API。Twitter 似乎很欣赏它的存在，因为 Twitter DevRel 团队建议我使用该库。要开始使用 Tweepy，

- 创建一个文件夹，希望此项目的相关代码驻留在其中
- 在该文件夹中，运行以下命令以安装 tweepy

```shell
pip3 install tweepy
```

- 如果你之前安装了 tweepy，请运行

```shell
pip3 install tweepy --upgrade
```

##### 第 6 步：安装 Tweepy

我将文件 sendTweet.py 存储在一个名为的新目录（又名文件夹）中。

[](./images/ARTS-week-37-4.png)

##### 第 7 步：让我们使用 Copilot 导入 tweepy 库
我写了一条评论说

```
# import the tweepy library
```

这对我很有帮助，因为我不确定你如何处理 Python 中的库导入，Copilot 向我展示了如何操作。在下面的屏幕截图中，它填充了一行代码，上面写着：

```
import tweepy
```

[](./images/ARTS-week-37-5.png)

##### 第 8 步：查看来自 Copilot 的多个建议
我写了一条评论，所以我可以使用 tweepy 客户端和我的 API 凭据，但 Copilot 没有提出所需的解决方案！由于 Twitter API v2 仍然相对较新，因此它不会出现为顶级建议。

下面的屏幕截图显示 Copilot 提出了一个对我的目标不准确的建议。

[](./images/ARTS-week-37-6.png)

默认情况下，Copilot 将提供初始建议，但你可以通过以下方式查看更多 Copilot 建议：
- 将鼠标悬停在 Copilot 建议上，它将显示选项以查看更多建议
或
- 使用键盘快捷键。在此处了解每个特定操作系统的 Copilot 键盘快捷键。

对于这种情况，我选择了“打开GitHub Copilot”选项来显示多个建议。它打开了一个包含 119 行建议的新选项卡。在阅读了一些 Twitter API 文档后，我了解到这是 Twitter API v2 的正确语法，所以我专门搜索了关键字。我找到了我需要的解决方案并接受了该解决方案。

[](./images/ARTS-week-37-7.png)

最适合我的建议是

```
client = tweepy.Client(consumer_key="",
                       consumer_secret="",
                       access_token="",
                       access_token_secret="")
```

##### 步骤 9：创建配置文件以存储凭据
我创建了一个在同一个目录中调用的文件。我使用此文件是为了避免向公众公开 API 凭据。

##### 步骤 10：使用 Copilot 自动完成配置文件
我在配置文件中写了前几行。

```
# consumer secret
CONSUMER_SECRET_KEY = ""
# consumer key
```

Copilot 现在可以推断我需要引入的 ACCESS_TOKENACCESS_TOKEN_SECRET。

[](./images/ARTS-week-37-8.png)

我为每个键传递了正确的值。

##### 第 11 步：在 sendTweet.py 文件中，使用 Copilot 导入配置文件
我写了一条评论，说并接受了 Copilot 在下一行的建议。# import the config file

[](./images/ARTS-week-37-9.png)

##### 步骤 12：在 sendTweet.py 文件中，传入以下参数的值：consumer_key、consumer_secret、access_token 和 access_token_secret。
当你填写每个值时，Copilot 会注意到该模式并为你自动填充值！

[](./images/ARTS-week-37-10.png)

下面是输入所有值后该代码块的外观：
```python
client = tweepy.Client(consumer_key=config.CONSUMER_KEY,
                       consumer_secret=config.CONSUMER_SECRET_KEY,
                       access_token=config.ACCESS_TOKEN,
                       access_token_secret=config.ACCESS_TOKEN_SECRET)
```

##### 第 13 步：在 sendTweet.py 文件中，写入推文内容
我写了一条评论说
```
# create a  variable called tweet with a string that says 'I wrote this tweet with Copilot
```
Copilot 正确地解释了我的评论，所以我接受了最初的建议。

[](./images/ARTS-week-37-11.png)

##### 第 14 步：现在，是时候发送推文了
在这一步中，我必须写一个非常具体的评论。我最初写了一条评论，说：
```
# send tweet
```

不幸的是，Copilot 从 Twitter API v1 中吐出了建议。为了提示 Copilot 提供所需的建议，我写了

```
# send tweet with client.create_tweet method and text as argument. Save the result in a variable called response
```

这次 Copilot 给了我正确的结果。

[](./images/ARTS-week-37-12.png)

发送推文的行应如下所示：
```python
# send tweet with client.create_tweet method and text as argument. Save the result in a variable called response
response = client.create_tweet(text=tweet)
```

##### 步骤 15：打印健全性检查响应的值。
打印响应变量可以帮助我们了解我们的推文是否成功以及为什么。
```python
print(response)
```

##### 步骤 16：确认两个文件都具有所有必需的代码行
我的两个文件看起来都像下面的代码片段：

sendTweet.py
```python
# import the tweepy library
import tweepy
# import the config file
import config
# create client with tweepy.Client with consumer key and consumer secret and access token as arguments
client = tweepy.Client(consumer_key=config.CONSUMER_KEY,
                       consumer_secret=config.CONSUMER_SECRET_KEY,
                       access_token=config.ACCESS_TOKEN,
                       access_token_secret=config.ACCESS_TOKEN_SECRET)

# create a  variable called tweet with a string that says 'I wrote this tweet with Copilot'
tweet = 'I wrote this tweet with Copilot'

# send tweet with client.create_tweet method and text as argument. Save the result in a variable called response
response = client.create_tweet(text=tweet)


print(response)
```

config.py
```python
# consumer secret 
CONSUMER_SECRET_KEY = "YOUR SECRET KEY GOES HERE"
# consumer key
CONSUMER_KEY = "YOUR KEY GOES HERE"
# access token
ACCESS_TOKEN = "YOUR TOKEN GOES HERE"
# access token secret
ACCESS_TOKEN_SECRET = "YOUR TOKEN SECRET GOES HERE"
```

##### 步骤 17：运行代码
在我的终端中，我运行了命令：。为了检查它是否成功，我前往我的推特提要并找到了这条推文！python3 sendTweet.py

[](./images/ARTS-week-37-13.png)

#### 经验 教训
从Copilot获得最佳结果的关键是：
- 写清晰、具体的评论
- 利用Copilot，一旦它可以识别代码中的连续模式
- 并检查Copilot的替代建议

### 3.Tip:

#### android 的 TextView 实现滚动效果
用 ScrollView 和重写 TextView 这两种方式都很麻烦，另外一种简单的方式如下:
1.在页面的布局 xml 文件中的 TextView 加上两个属性：
```xml
android:maxLines = "30"   //最大显示行数，超过了就滚动
android:scrollbars = "vertical"  //方向
```
2.然后在页面的 java 代码中用： 
```java
TextView.setMovementMethod(new ScrollingMovementMethod());
```

#### Json 串的字段如果和类中字段不一致，fastjson 如何映射、转换？
@JSONField
```java
public class A {

    // 配置 userId 序列化和反序列映射 json 中的 id 属性
    @JSONField(name="ID")
    private int userId;

    // 配置 date 序列化和反序列使⽤ yyyyMMdd ⽇期格式
    @JSONField(format="yyyyMMdd")
    public Date date;
}
```

#### 【Java】Date类型获取年月日时分秒的两种方法（12小时制、24小时制）
以前Date提供了一系列的get方法来获取，但是这些方法现在都被弃用了,解决办法：

1.Calendar 类
```java
Calendar calendar = Calendar.getInstance();
calendar.setTime(new Date());                   //放入Date类型数据
 
calendar.get(Calendar.YEAR);                    //获取年份
calendar.get(Calendar.MONTH);                   //获取月份
calendar.get(Calendar.DATE);                    //获取日
 
calendar.get(Calendar.HOUR);                    //时（12小时制）
calendar.get(Calendar.HOUR_OF_DAY);             //时（24小时制）
calendar.get(Calendar.MINUTE);                  //分
calendar.get(Calendar.SECOND);                  //秒
 
calendar.get(Calendar.DAY_OF_WEEK);             //一周的第几天
```

方法二：SimpleDateFormat 类
```java
String[] strNow1 = new SimpleDateFormat("yyyy-MM-dd").format(new Date()).toString().split("-");
 
Integer.parseInt(strNow1[0]);           //获取年
Integer.parseInt(strNow1[1]);           //获取月
Integer.parseInt(strNow1[2]);           //获取日
 
String[] strNow2 = new SimpleDateFormat("hh:mm:ss").format(new Date()).toString().split(":");
 
Integer.parseInt(strNow2[0]);           //获取时（12小时制）
Integer.parseInt(strNow2[1]);           //获取分
Integer.parseInt(strNow2[2]);           //获取秒
 
String[] strNow3 = new SimpleDateFormat("HH:mm:ss").format(new Date()).toString().split(":");
        
Integer.parseInt(strNow3[0]);           //获取时（24小时制）
Integer.parseInt(strNow3[1]);           //获取分
Integer.parseInt(strNow3[2]);           //获取秒
```

#### Java InputStream 转 Byte Array 和 ByteBuffer

1. 使用Guava实现
```java
byte[] targetArray = ByteStreams.toByteArray(inputStream);
```
2. 使用Commons IO
```java
byte[] targetArray = IOUtils.toByteArray(inputStream);
```

### 4.Share:

[android Https的使用及双向验证证书](https://blog.csdn.net/jiushi1995/article/details/114021074)

[Android https 自签名和CA证书验证（基于OkHttp）](https://blog.csdn.net/HHHceo/article/details/109614762)