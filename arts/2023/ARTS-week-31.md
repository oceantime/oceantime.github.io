---
> **ARTS-week-31**
> 2023-07-30 09:00
---


## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm： 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

- [2208. 将数组和减半的最少操作次数](https://leetcode.cn/problems/minimum-operations-to-halve-array-sum/submissions/449909080/)  
    + 思路：队列
- [142. 环形链表 II](https://leetcode.cn/problems/linked-list-cycle-ii/submissions/451502803/)  
    + 思路：双指针
- [834. 树中距离之和](https://leetcode.cn/problems/sum-of-distances-in-tree/submissions/451504020/)  
    + 思路：树型dp

### 2.Review:

[了解网络安全🚨中的 CORS 和同源策略](https://dev.to/burakboduroglu/understanding-cors-and-same-origin-policy-in-web-security-54hm)

在 Web 安全和浏览器安全领域，两个基本概念发挥着重要作用：CORS（Cross-Origin Resource Sharing 跨源资源共享）和 SOP(Same Origin Policy 同源策略) 。这篇博文旨在阐明这些概念及其在确保安全 Web 交互方面的重要性。

#### 1. 同源策略：

同源策略是由 Web 浏览器实施的安全措施，它允许在网页上执行的 JavaScript 代码仅访问来自同一源的资源，该源包含相同的域、协议和端口组合。此策略可防止不同源之间的请求，并限制基于浏览器的攻击。

同源策略基于源的三个组成部分：
- Origin Domain:资源来源的网页的域名，例如“example.com”。
- Protocol:用于访问网页的通信协议，例如“https://”或“http://”。
- Port:默认值为“80”或“443”。

此策略可确保网页只能访问其所属同一源的资源。例如，JavaScript 只能从共享相同源（相同域、协议和端口）的资源中检索数据。

#### 2. 跨域资源共享：

跨源资源共享 （CORS） 是一种用于克服同源策略施加的限制的机制。CORS 允许 Web 浏览器放宽限制，并为来自不同源的请求授予对其资源的访问权限。它是一种基于 HTTP header(标头)的机制。

当 Web 浏览器向其他源（域、协议或端口）发出请求时，浏览器将启动 CORS 进程以确定请求的资源是否可访问。作为响应，服务器在其 HTTP 响应中包含“Access-Control-Allow-Origin”标头。此标头指定允许访问所请求资源的源。

例如，如果位于“example.com”的网站想要向位于“api.example.org”的 API 发出请求，则 API 服务器需要在其响应中包含以下标头：

```
Access-Control-Allow-Origin: https://example.com
```

使用此标头，API 服务器显式授予“example.com”处的网站访问其资源的权限。如果请求源未在“访问控制允许源”标头中列出或缺少标头，则浏览器将强制执行同源策略并拒绝对请求资源的访问。

CORS 还包括其他标头，例如“Access-Control-Allow-Methods”(访问控制允许方法)和“Access-Control-Allow-Headers”(访问控制允许标头)，用于指定跨源请求允许的 HTTP 方法和标头。

让我们可视化 CORS：

[](./images/ARTS-week-31-1.png)


#### 总结

SOP 和 CORS 是确保 Web 安全和浏览器安全的基本概念。虽然同源策略限制不同源之间的访问，但 CORS 提供了一种受控机制，用于在需要时放宽这些限制。通过在服务器端正确配置 CORS 标头，Web 开发人员可以允许跨源请求，同时仍保持安全的环境。

### 3.Tip:

#### Gradle 查看包的依赖关系

工具查看
- 在 Android Studio 中选择 View > Tool Windoors > Gradle 或者直接选择 Gradle工具栏
- 展开AppName > Tasks > android , 双击 androidDependencies
- 选择 View > Tool Windows > Gradle Console ,查看输出的日志

命令查看

- 输出查询结果
```shell
./gradlew :app:dependencies > log.txt
```

- 查看指定库的依赖关系
```
 ./gradlew :app:dependencyInsight --dependency fastjson --configuration compile
```

### 4.Share:

[android 的injustdecodebounds](https://blog.csdn.net/yezhouyong/article/details/50402022)

[Android之Bitmap深入理解（BitmapFactory）二](https://blog.csdn.net/tangedegushi/article/details/80257855?spm=1001.2101.3001.6650.1&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-1-80257855-blog-50402022.235%5Ev38%5Epc_relevant_default_base&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-1-80257855-blog-50402022.235%5Ev38%5Epc_relevant_default_base&utm_relevant_index=2)
