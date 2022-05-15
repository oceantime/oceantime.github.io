---
> **ARTS-week-20**
> 2022-05-14 20:21
---


###### ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
- Algorithm： 每周至少做一个 leetcode 的算法题
- Review: 阅读并点评至少一篇英文技术文章
- Tip: 学习至少一个技术技巧
- Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

- [1728. 猫和老鼠 II (困难) ?](https://leetcode.cn/submissions/detail/311861458/)  
  + 思路：博弈
- [449. 序列化和反序列化二叉搜索树 (中等) +](https://leetcode.cn/submissions/detail/312291260/)  
  + 思路：递归
- [面试题 01.05. 一次编辑 (中等) ?](https://leetcode.cn/submissions/detail/313139654/)  
  + 思路:双指针

### 2.Review:

- [React Native vs Native App 开发 ：哪一个最适合你的应用？](https://www.excellentwebworld.com/react-native-vs-native)  

#### 点评：

在开发移动应用程序时，企业只能选择两种方式。他们要么可以进行本机应用程序开发？或者，他们可以选择在跨平台开发中构建自己的应用。可能会问，跨平台和原生应用开发有什么区别？好吧，前者允许开发人员编写一次代码，但让所有平台上运行代码。但后者需要单独编码（即 iOS-Swift 或 Objective-C，Android-JAVA 或 Kotlin）。因此，原生应用程序开发需要更多的时间，金钱和资源来构建应用程序。但这并不意味着为的应用程序开发选择跨平台是一个绿色信号。两者都有其利与弊。在本文中，我们将找出 React 原生与原生之间哪个更好。

- 那么，究竟什么是原生移动应用呢？
让我们从教科书上对原生应用的定义开始。本机应用程序是为特定平台构建的，该平台适用于一组特定的设备和操作系统。正如我之前解释的那样，这些特定的平台可能是 Android 或 iOS。这些应用程序能够利用可用于该特定设备及其操作系统的所有硬件和软件功能。例如，如果我们采用Apple的iOS应用程序，它们是使用 Objective C 或 Swift 编写的。因此，这些iOS应用程序不适用于 Android 或 Windows 平台，反之亦然。本机应用程序具有操作系统提供的功能以及该特定平台上安装的软件的优势。本机应用开发需要使用编程语言和集成开发环境 （IDE） 工具。例如，Xcode 工具在 iOS 上使用 Objective-C 语言，Android Studio 将 Java 和 Kotlin 语言与 Android 一起使用。

- 原生应用开发的优点
  - 内置组件，如摄像头，麦克风，指南针，加速度计等，可以无缝工作。这是因为本机应用内置于设备的这些组件的法规中。
  - 对于原生应用程序来说，文档很容易，因为仅iOS和Android就有至少2500本书。此外;互联网上有数百篇文章和博客。
  - 本机应用中存在快速响应的体验，因为它们的功能是根据特定平台构建的。
  - 在构建应用程序时，必须遵循相应应用商店的准则，因此要保持安全性。
  - UI/UX 对于每个平台都是独一无二的。因此;根据平台的特定 UI/UX 构建应用程序将为用户提供更加个性化的体验。
  - App Store支持原生应用程序开发，因为这会鼓励他们的市场。结果;将从各自的 App Store 获得更多支持，使的应用程序更容易被用户访问。
  - 在本机应用开发中，API 访问可充分利用，而无需在功能上查找任何其他映射。这降低了应用对更新的依赖程度。
  - 来自其他开发社区的第三方库是使用本机应用程序开发时获得的额外好处。
  - 更严格的语言 - Android 和 iOS 的所有本机语言都被认为是严格的语言。学习其他语言之一非常容易。

- 本机应用开发的缺点
  - 必须使用不同的代码库在不同的平台上构建应用程序。为Android构建的应用程序将无法在 iOS 平台上运行，反之亦然。因此，必须使用该特定平台的不同代码库和不同团队。
  - 比混合应用开发更耗时，因为任何一次完成的工作都仅适用于该单个平台。因此;需要从头开始与一个全新的团队合作，并为另一个平台提供不同的方法。
  - 成本增加，因为基本上正在为两个不同的平台（Android和iOS）制作两个不同的应用程序。因此，要获得这两个平台，需要支付几乎两倍的开发成本，如果不是更多的话。成本因素在本机应用与混合应用开发中起着重要作用。

- 什么是 React Native？
React Native 是由 Jordan Walke 在 Facebook 举办的黑客马拉松项目中开发的。它的根源来自 React.JS React 最初是为了解决 Facebook 与其跨平台应用程序相关的特定问题而构建的。因此，该应用程序与其他“移动Web应用程序”不同，它是使用 JavaScript 制作的真正的移动应用程序，而不会影响任何质量。另一件使移动应用程序工作更顺畅和高效的事情是 React Native Database。

- React Native App Development 的优点
  - 开源提供了对代码的更多理解，并通过其他功能改进了框架。
  - 编写一次，在任何地方运行适用于多个平台的代码类型。因此，只需构建一次多平台应用程序。
  - 热重新加载有助于连续运行应用，同时将最新代码部署到应用中以进行更新。
  - 与 Native 应用程序开发相比，React Native 的上市时间更短，因为只需构建一个应用程序，而不是至少两个。
  - 扩展对于 React Native 来说是很自然的。它能够处理越来越多的应用程序工作，并且可以轻松处理更新到更高功能。
  - 降低应用开发中的时间消耗。因为相同的代码可以用来制作不同的面向平台的应用。
  - 确保节约成本。由于相同的代码用于 iOS 和 Android，因此应用程序开发成本几乎是 Native 方法的一半。
  - 高质量的移动应用程序是一种保证，因为 React Native 专注于图形处理单元（GPU），这与专注于本机应用程序不同。
  - 中央处理器 （CPU）。GPU 帮助 React Native 在内存类别中提供更好的性能。
  - Web 到移动开发 – 所以，现在知道 React Native 是否适合移动应用程序开发。但是，还需要注意一些缺点。

- React 原生 App 开发的缺点
  - 获得不同应用商店的许可证更加困难。与这些应用商店提供更多支持的本机应用程序相比。
  - 目前，React Native 中普遍存在一些自定义模块的缺失。大多数通用库都存在于 React Native 中，但是根据各自的项目，可能会有例外。在这种情况下，需要为此类模块查找或构建自己的解决方案。
  - 对于更适合原生建筑的模块，如访问摄像头、推送通知和其他设备传感器，需要原生开发人员。
  - 与本机应用程序相比，社区支持较少;此外，所需的资源少于本地开发。

- 何时选择原生应用开发？
  - 不想担心更改 API 和语言。
  - 想要原生用户体验
  - 需要创建基于物联网的应用程序
  - 想要在任一平台（Android 或 iOS）中构建应用
  - 正在寻找频繁更新
- 什么时候应该进行 React Native App 开发？
  - 想要构建电子商务应用
  - Instagram 和 Facebook 等社交媒体应用程序
  - 需要快速进入市场
  - 项目预算更少
  - 希望在应用中加入 Facebook 广告

- 结论 React Native vs Native
总而言之，这取决于的规模和项目的紧迫性。如果你想尽早进入移动应用程序，雇用 React Native 开发人员是你的最佳选择。然而，如果你有一个很好的预算，并且你不想在应用程序的 UI 和功能上妥协，那么 Native 应该是你的选择。

### 3.Tip:

#### Android Studio 安卓模拟器不能联网的解决方案
```python
方案一：
进入到 SDK 安装目录下执行：
emulator -avd Nexus_5X_API_27 -prop net.eth0.dns1=192.168.xxx.xxx （Nexus_5X_API_27 是模拟器的名字）

方案二：
进入到 SDK 安装目录下执行：
emulator @你模拟器的名字 -dns-server 8.8.8.8,114.114.114.114

这时候你的模拟器就可以启动了

方案三：
进入到 SDK 安装目录的 platform_tools 目录下，然后使用 adb shell 命令，
如果配置了 sdk 的环境变量的，那么直接在 CMD 窗口中输入 adb shell，
如：C:\Documents and Settings\Administrator>adb shell
getprop 查看属性 net.dns1
setprop net.dns1 192.168.xxx.xxx
```

#### AndroidStudio报错：GradleSyncIssues-Could not install Gradle distribution from...
这是因为无法将所需要的gradle进行下载，这时就需要手动进行下载。将报错信息后面的网址复制，在浏览器中打开，然后会弹出下载页面，进行下载 gradle 的 zip 包。然后找到 gradle 所在的位置，默认路径 C:\Users\Administrator\.gradle\wrapper\dists 如果修改过，则找到修改的位置。这里是修改的位置。然后将上面下载的 zip 包在目录中解压。然后回到 Android Studio 点击 Try Again。

### 4.Share:

- [Vo 对象，Dao 对象，Dto 对象的部分属性复制 BeanCopier&BeanUtils](https://blog.csdn.net/sunyuhua_keyboard/article/details/107548613)  

- [DevEco Studio 一直提示下载 gradle-5.4.1-all.zip](https://blog.csdn.net/weixin_45214268/article/details/108674720)  

- [Android WebView 清除缓存，总有一个方法适合你](https://blog.csdn.net/ezconn/article/details/106460367)  

- [Android Studio vs React Native（stackshare）](https://stackshare.io/stackups/android-studio-vs-react-native)  

- [mybatis plus 实现敏感数据的加密 (仅限于单表的实体映射)](https://blog.csdn.net/qq_35868553/article/details/106199457)  

- [如何正确选型，React Native 还是 Native？](https://www.infoq.cn/article/t3ypfdi88*gkzwhr2bpt)

- [How to Choose the Best Mobile App Development Technology in 2022?](https://www.excellentwebworld.com/mobile-app-development-technology/)

- [Flutter vs React Native: Which One Has the Upper Hand in 2022?](https://www.excellentwebworld.com/flutter-vs-react-native/)

- [流言终结者- Flutter和RN谁才是更好的跨端开发方案？](https://www.jianshu.com/p/20c30834f137)
- 
- [移动性能测试 shell 脚本通过 dumpsys SurfaceFlinger --latency 数据计算 FPS 和评价流畅度。](https://testerhome.com/topics/4775)