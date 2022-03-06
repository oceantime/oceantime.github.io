---
> **ARTS-week-09**
> 2021-03-07 17:32
---


## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm： 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

438. 找到字符串中所有字母异位词 https://leetcode-cn.com/submissions/detail/152275240/
3. 无重复字符的最长子串 https://leetcode-cn.com/submissions/detail/152215555/
209. 长度最小的子数组 https://leetcode-cn.com/submissions/detail/152208797/

### 2.Review:

https://towardsdatascience.com/lazy-predict-fit-and-evaluate-all-the-models-from-scikit-learn-with-a-single-line-of-code-7fe510c7281
一行代码完成 Scikit-Learn 所有模型的训练与评价
          

#### 点评：

作者Lazy Predict给出处理监督学习问题时不确定那些模型可以处理手头的数据集，可以使用 lazypredict 训练索引可用的模型。实际的例子：

- 分类任务
- 回归任务

- 可能的改进
  - 这是一个简单的方法，但是要确保库有正确的依赖项列表，这样用户就不必根据他们得到的错误手动安装每个库
  - 允许访问最好的/所有训练过的模型，现在我们只能看到带有结果和预测的表格
  - 并行训练模型——对于小数据集来说不是问题，但是，对于大数据集来说，加速训练是很好的
  - 创建一个专门的预测方法
  - 让默认的预处理是可选的，并且有清晰的文档记录
  - 允许一些超参数调优

结论:是一个方便的包装器库，它使我们能够快速地将所有模型适合我们的数据集，并比较它们的性能。这样，我们就可以看到什么是“开箱即用”的。然而，这并不是模型训练和选择的灵丹妙药，因为只训练了默认的变量。正如我们所知，超参数调优可以极大地改变性能。


### 3.Tip:

#### Python3 安装异常

1.npm 安装 node-sass 失败
```shell
npm install --save node-sass --registry=https://registry.npm.taobao.org --disturl=https://npm.taobao.org/dist --sass-binary-site=http://npm.taobao.org/mirrors/node-sass
npm rebuild node-sass --force
npm cache clean --force
```

2.开机自启 Powershell 脚本
```shell
# 1.PowerShell 脚本文件
打开记事本，输入启动新 frpc 进程的命令：
start-process -FilePath d:\tools\frpc.exe -ArgumentList "-c d:\tools\frpc.ini" -WindowStyle Hidden
将此文件存为 frpc.ps1 脚本文件。

# 1.开机时自动运行 PowerShell 脚本
由于Windows系统默认策略不允许随意运行脚本文件，所以要更改一下：
Set-ExecutionPolicy -ExecutionPolicy Unrestricted -Scope LocalMachine
定义触发器，设置定时任务：
$trigger = New-JobTrigger -AtStartup -RandomDelay 00:00:30
Register-ScheduledJob -Trigger $trigger -FilePath d:\tools\frpc.ps1 -Name StartFrpc
```

### 4.Share:

http://mysql.taobao.org/monthly/2021/02/01/
PolarDB · 特性分析 · Explain Format Tree 详解

http://mysql.taobao.org/monthly/2017/01/06/
PgSQL · 引擎介绍 · 向量化执行引擎简介

https://blog.csdn.net/hjxzb/article/details/84927567
docker实践之docker-compose部署mysql

https://cloud.tencent.com/developer/section/1189879
CSP: worker-src