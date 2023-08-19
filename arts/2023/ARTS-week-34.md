---
> **ARTS-week-34**
> 2023-08-19 20:12
---


## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm： 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

- [617. 合并二叉树](https://leetcode.cn/problems/merge-two-binary-trees/submissions/456138238/)  
    + 思路：二叉树
- [833. 字符串中的查找与替换](https://leetcode.cn/problems/find-and-replace-in-string/submissions/456476574/)  
    + 思路：模拟
- [2682. 找出转圈游戏输家](https://leetcode.cn/problems/find-the-losers-of-the-circular-game/submissions/456811279/)  
    + 思路：模拟

### 2.Review:

[使用 WorkManager 掌握 Android 中的后台处理：高效后台处理指南](https://dev.to/manoj_pedvi/mastering-background-processing-in-android-with-workmanager-a-guide-to-efficient-background-processing-1h7h)

在移动应用程序开发领域，高效执行后台任务对于提供流畅的用户体验至关重要。Android 提供了各种用于后台处理的 API，但推荐的持久工作解决方案是 WorkManager。作为Android Jetpack的一部分，WorkManager提供了一个简化且一致的API，用于调度需要在后台运行的任务，即使在应用程序重新启动和系统重新启动期间也是如此。

在这篇博文中，我们将探索 WorkManager 的强大功能，并学习如何安排不同类型的任务、定义工作约束、处理工作链以及与其他线程框架集成。我们还将讨论使用 WorkManager 进行可靠工作的好处，以及它如何取代已弃用的 API，如 FirebaseJobDispatcher、GcmNetworkManager 和 Job Scheduler。

#### 1. 持续工作的类型

WorkManager 有三种类型的持久工作：

##### 立即的
即时任务应立即开始执行并尽快完成。在需要优先权的情况下，也可以加快执行。

##### 长时间运行
长时间运行的任务是指可能运行更长时间（可能超过 10 分钟）的任务。这些任务可以计划为一次性或定期运行。

##### 可延的
可延迟任务计划在以后开始，也可以定期运行。它们提供了基于特定时间间隔或条件执行任务的灵活性。

#### 2. 工作管理器的特点

WorkManager 提供了几个关键功能，使其成为后台处理的强大工具：

##### 工作约束
使用工作约束以声明方式定义工作运行的最佳条件。例如，可以指定任务应仅在设备位于未按流量计费的网络上、设备空闲或电池电量充足时运行。

##### 稳健的调度
工作管理器允许使用灵活的调度窗口安排工作一次性或重复运行。可以标记和命名的工作，以安排独特的、可替换的任务，并一起监视或取消工作组。

##### 即时工作
可以使用工作管理器安排即时工作以在后台执行。即时工作对于对用户很重要且在几分钟内完成的任务非常有用。

##### 灵活的重试策略
WorkManager 提供灵活的重试策略，包括可配置的指数退避策略，以处理工作可能失败的情况。

##### 工作链
对于复杂的相关工作，可以使用直观的界面将各个工作任务链接在一起，该界面允许控制哪些部分按顺序运行，哪些部分并行运行。一个任务的输出数据可以自动传递到下一个任务。

##### 内置线程互操作性
WorkManager 与协程和 RxJava 无缝集成，提供了插入自己的异步 API 的灵活性，以便更好地控制线程。

#### 3. 安排即时工作
要在 WorkManager 中安排即时工作，可以将类与实现一起使用。如果需要执行更高优先级的任务，还可以将任务设置为即时。

```java
val workRequest = OneTimeWorkRequestBuilder<MyWorker>()
    .setExpedited(true) // Set as expedited if required
    .build()

WorkManager.getInstance(context).enqueue(workRequest)
```

#### 4. 安排长时间运行的工作
对于长时间运行的任务，可以使用 anysubclass 以及相应的实现。如果要显示正在进行的任务的通知，可以调用该类。

```java
val longRunningWork = PeriodicWorkRequestBuilder<MyWorker>(repeatInterval, repeatIntervalTimeUnit)
    .setInputData(myData)
    .setForeground(true) // Show notification for ongoing task
    .build()

WorkManager.getInstance(context).enqueue(longRunningWork)
```

#### 5. 安排可延期的工作
要安排稍后开始并且可以定期运行的可延迟工作，可以与实现一起使用。

```java
val deferrableWork = PeriodicWorkRequestBuilder<MyWorker>(repeatInterval, repeatIntervalTimeUnit)
    .setInputData(myData)
    .build()

WorkManager.getInstance(context).enqueue(deferrableWork)
```

#### 6. 定义工作约束
工作约束允许指定工作运行的最佳条件。可以定义网络连接、设备充电状态、电池电量等约束。

```java
val workConstraints = Constraints.Builder()
    .setRequiredNetworkType(NetworkType.UNMETERED)
    .setRequiresCharging(true)
    .setRequiresBatteryNotLow(true)
    .build()

val constrainedWork = OneTimeWorkRequestBuilder<MyWorker>()
    .setConstraints(workConstraints)
    .build()

WorkManager.getInstance(context).enqueue(constrainedWork)
```

#### 7. 处理工作链
工作链允许将多个工作任务链接在一起，定义它们之间的依赖关系。一个任务的输出数据可以作为输入数据自动传递给下一个任务。

```java
val cleanupWork = OneTimeWorkRequestBuilder<CleanupWorker>().build()
val waterColorFilterWork = OneTimeWorkRequestBuilder<WaterColorFilterWorker>().build()
val grayScaleFilterWork = OneTimeWorkRequestBuilder<GrayScaleFilterWorker>().build()
val blurEffectFilterWork = OneTimeWorkRequestBuilder<BlurEffectFilterWorker>().build()

val saveImageToGalleryWork = OneTimeWorkRequestBuilder<SaveImageToGalleryWorker>()
    .addTag(Constants.TAG_OUTPUT)
    .build()

val uploadWork = OneTimeWorkRequestBuilder<UploadWorker>()
    .addTag(Constants.TAG_OUTPUT)
    .build()

val continuation = WorkManager.getInstance(context)
    .beginUniqueWork(Constants.IMAGE_MANIPULATION_WORK_NAME, ExistingWorkPolicy.REPLACE, cleanupWork)
    .then(waterColorFilterWork)
    .then(grayScaleFilterWork)
    .then(blurEffectFilterWork)
    .then(if (save) saveImageToGalleryWork else uploadWork)

continuation.enqueue()
```

#### 8. 内置线程互操作性
使用 WorkManager 的优点之一是它与 Coroutines 和 RxJava 的无缝集成。可以轻松地将这些线程框架与 WorkManager 结合使用，以处理任务中的异步操作。

例如，将协程与工作管理器结合使用：

```java
class MyCoroutineWorker(appContext: Context, workerParams: WorkerParameters) :
    CoroutineWorker(appContext, workerParams) {

    override suspend fun doWork(): Result {
        // Perform asynchronous operations using Coroutines
        return Result.success()
    }
}
```

#### 9. 使用工作管理器进行可靠的工作
WorkManager 专为可靠的工作而设计，即使用户离开应用程序或设备重新启动，也需要运行。它适用于将日志或分析发送到后端服务或定期将应用程序数据与服务器同步等任务。

但是，它不适用于进程内后台工作，如果应用进程消失，可以安全地终止这些工作。它也不是所有需要立即执行的工作的通用解决方案。在这种情况下，应考虑其他解决方案，如协程或 AlarmManager。

#### 10. 与其他 API 的关系
虽然建议将协程用于某些不需要持久性的用例，但它们不应用于持久性工作。协程主要是一个并发框架，而 WorkManager 是专门为持久后台处理而设计的。

警报管理器只能用于与时钟或日历相关的警报，而不应用于常规后台工作。与WorkManager不同，AlarmManager从打瞌睡模式唤醒设备，这在电源和资源管理方面效率较低。

#### 11. 工作管理器入门
要在 Android 应用中开始使用 WorkManager，请按照以下步骤操作：

将必要的依赖项添加到项目的 build.gradle 文件中。
定义子类并实现所需的方法。WorkerdoWork()
创建使用构建器模式的实例。OneTimeWorkRequestPeriodicWorkRequest
使用对工作请求进行排队。WorkManager.getInstance(context).enqueue()
有关详细说明和代码示例，请参阅有关开始使用 WorkManager 的官方 Android 文档。

### 3.Tip:

#### 修改Android WebView的字体大小

```java
WebView webView = findViewById(R.id.wv_web);
WebSettings settings = webView.getSettings();
settings.setTextZoom(100); // 通过百分比来设置文字的大小，默认值是100。
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

[yyyy-MM-dd'T'HH:mm:ss.SSS'Z'即UTC时间，与String日期转换](https://www.cnblogs.com/zjdxr-up/p/9673050.html)

[哈夫曼编码详解——图解真能看了秒懂](https://blog.csdn.net/Young_IT/article/details/106730343)

[Android核心技术-Activity与Intent](https://blog.csdn.net/qq_40318498/article/details/89743478)
