---
> **ARTS-week-18**
> 2022-05-01 18:05
---


###### ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
- Algorithm： 每周至少做一个 leetcode 的算法题
- Review: 阅读并点评至少一篇英文技术文章
- Tip: 学习至少一个技术技巧
- Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

- [398. 随机数索引 (中等) ?](https://leetcode-cn.com/submissions/detail/305361052/)  
  + 思路：哈希表
- [417. 太平洋大西洋水流问题 (中等) +](https://leetcode-cn.com/submissions/detail/306351990/)  
  + 思路：DFS
- [1305. 两棵二叉搜索树中的所有元素 (中等) +](https://leetcode-cn.com/submissions/detail/307863511/)  
  + 思路：BST

### 2.Review:

- [告诉编程路上的自己，尽快养成四个好习惯](https://levelup.gitconnected.com/to-my-programmer-self-20-years-ago-do-these-4-things-more-fb562cf7d309)  

#### 点评：

20年前，我得到了我的第一份工作，一个自由的web开发人员。20年之后，我仍然在做这项工作。现在看来，我认为有4个习惯，我希望我早一点养成，而不是晚一点养成。

- 更多的自动化
如今可以见到一个人的超市，可以记住很多细节和过程。一个客户机的部署有15个步骤，每个月都在做，所以记住了它，每次运行不超过5分钟。要和同事讨论这个问题。随着所有需要构建的功能和所有需要修复的bug，这个问题会一次又一次地出现：花点时间去自动化那些只需要几分钟时间，而且每隔一段时间就可以完成的事情，真的值得吗？别这样想。相反，请这样想：手动执行该过程可能只需要5分钟的时间，每月一次。这个过程的创建自动化需要3个小时。这可能会将运行流程所需的时间从5分钟减少到3分钟。但关键是：随着流程自动化，不再需要来运行此流程。对来说，每月的收益不仅仅是2分钟。的5分钟可以变成0分钟，因为现在流程自动化了，其他人可以花3分钟来运行这个流程。事实上，它可以是任何其他人。在关键时刻，团队中任何有3分钟空闲时间的人都可以运行这个自动化过程。不必什么都做。如果更多地自动化，那么其他人就可以做任何事情，这样就可以集中精力了。

- 更多的测试
因为善于把所有东西都记在脑子里，所以善于记住每当构建一个新功能时需要开启的每一个小开关和开关，只是为了确保没有通过添加新代码来破坏其他任何东西。但是，总是确定没有忘记什么吗？而且，当Charles或Rosa添加他们的代码时呢？他们是否有需要开启的每个开关和开关的列表？他们会错过一些东西。所以可能发生的事情是...每当他们集成新代码时，都必须为他们做这种调整。测试就是要给自己信心- 相信添加的新代码不会破坏任何旧代码;自信地认为可以部署的代码，而不会在半夜醒来，想着，"哦，如果用户在删除他们的付款方式而不是之前点击那个按钮，他们会得到500。我现在需要把所有东西都回滚。是的，编写测试需要时间。首先编写测试并不像首先编写实现代码那样令人满意。但是，它可以帮助保持头脑清醒。通过测试编写，可以首先关注代码应该执行的操作。测试就是给自己一些空间——大脑中的空间，专注于重构和改进代码，因为不再需要跟踪所有那些需要摆动的开关和开关，以确保的重构不会破坏任何东西。的测试将为完成此操作。现在，有了重构代码的头部空间。哦，顺便说一句，如果知道如何添加，奖励积分：更多自动化 + 更多测试 = 更多自动化测试 通过自动化测试，任何人都可以贡献他们的代码，任何人都可以运行测试 - ，队友，客户将更有信心地进行构建，更有信心地进行调整，更有信心地进行演示，并更有信心地发布。


- 更多的他人参与
当在大学里做小组项目时，我们都知道我们的代码很糟糕。我们谁也不明白自己在做什么。调试实际上只是摆动代码行，希望能解开一些东西。作为一个人的自由职业者，的眼睛可以看到100%的代码。而且，很有可能，100%的代码只被的眼睛看到。这让感到害怕和不安全。这种恐惧和不安全感会让很难向别人寻求帮助，建立一个团队，把别人带上去。那是因为永远不会觉得写的代码已经准备好（足够好）让其他程序员印象深刻。事实上，他们可能会批评。他们会看到如何使用黑客来进行API调用，或者如何故意忽略这个边缘情况。这种恐惧和不安全感会限制。更严重地，与他人合作和向他人学习的机会。有机会成为需要整个团队而不是一人商店的项目的一部分。需要成长机会。因此，相反，养成让别人更多进来的习惯。让其他程序员看看的代码。接受的代码是蹩脚的，并期望那些审阅者会注意到的代码有多蹩脚。拥有它。然后从中成长。（顺便说一句，他们的代码可能也有其蹩脚的部分。哦，还有，当开始这样做时，会发现自己说，"好吧，特里，我想向展示我构建的这个模块，但给我......再过3天，只是为了先清理一下。别这样。的代码总是可以改进的，它永远不会完全准备好进行审查。会不断想要更多的时间来准备它。只需拥有自己的代码 - 就像它今天的样子一样。然后，请某人进来检查一下。通过更早、更频繁地执行此操作，会发现的代码开始改进。这是因为当在编写代码时，会开始预测有什么习惯或缺点，让的审稿人畏缩或哭泣。问责制不是很好吗？的代码永远不会完美。不要等到那一天才要求另一双眼睛来审查它并提供反馈。否则，那一天永远不会到来。

- 更多的教授
会遇到很多非常具体的编码问题，会在网上搜索解决方案。并不总能找到解决办法。相反，将在一些第三方文档中混日子，尝试不同的设置，创造性地思考试图解决的问题，然后将解决的问题。从这里，可以继续下一个问题。但是，在掠夺世界尤其是那个将要面对刚刚解决的问题的程序员—一些艰苦奋斗的知识。在投入时间和工作成为这一小问题的专家后，不要让专业知识白白浪费。把学到的东西教给别人。肯特·C·多德称之为“增加价值的影响力”SWYX（肖恩·王）称之为“在公共场合学习”无论是写一篇教程文章，还是写一篇博客文章，还是回答堆栈溢出问题，都需要捕捉到这一点。其他人会受益。不要剥夺他们的权利。也会受益。当准备教一些东西时——无论是一篇真实的演讲，还是一篇文章，或是一篇帖子——将比第一次编写解决方案时更好地了解的解决将深入了解问题所在。您将优化初始解决方案。将在如何向新手传达深层次、低级的概念方面成长。将发现并想出解决难题的绝妙方法。这就是为客户所做的。但这也是您在特定代码片段中所做的。花点时间“增加价值的影响力”—分享的发现，让其他人了解同样的问题。会让他们成为专家。自己也会成为一个。

- 总结
 在即将踏上的旅程上提速，这将是一个到达这里曲折的路。但是，如果想到达——也许不是更快，但至少明智给自己记下：
1.更多的自动化
2.更多的测试
3.更多的他人参与
4.更多的教授


### 3.Tip:

#### ImportError: cannot import name 'render_to_response' 解决方法
```python
#  安装指定版本的 Django 版本（3.0以下)
pip3 install django==2.1.3

# 使用 render 代替 render_to_response。
return render(request,"information.html",{"name":"test","password":"123456"})
return render_to_response("information.html",{"name":"test","password":"123456"},context_instance = RequestContext(request))
```

#### join() argument must be str or bytes, not 'dict' -- in Django while making a form with Multi-Table inheritance
```python
template_name = 'edx_sysadmin/gitlogs.html'
context = {'data': 'value'}
return render(request, self.template_name, context)

# earlier was missing `request` like
# return render(self.template_name, context)
```

#### ll 命令报错 -bash: ll: command not found
```shell
＃cd~  回到根目录/ 家目录，即中图产品的根目录

＃vim ~/.bashrc    #打开〜/ .bashrc ，添加“ alias ll = 'ls -l'”
＃source ~/.bashrc #修改立即生效，或者重新登录也可达到同样效果

#ll 此时可以正常使用LL 命令
```

#### 删除 Helm 使用时关于 kubernetes 文件的警告
```shell
~$ helm ls
WARNING: Kubernetes configuration file is group-readable. This is insecure. Location: /home/zhang/.kube/config
WARNING: Kubernetes configuration file is world-readable. This is insecure. Location: /home/zhang/.kube/config
NAME              NAMESPACE REVISION  UPDATED                                 STATUS    CHART       APP VERSION
mysql-1617157855  default   1         2021-03-31 10:30:57.988087373 +0800 CST deployed  mysql-1.6.9 5.7.30

~$ ll .kube/config 
-rw-rw-r-- 1 zhang zhang 4652 3月  17 12:30 .kube/config

~$ chmod g-rw ~/.kube/config
~$ chmod o-r ~/.kube/config

~$ helm ls
NAME              NAMESPACE REVISION  UPDATED                                 STATUS    CHART       APP VERSION
mysql-1617157855  default   1         2021-03-31 10:30:57.988087373 +0800 CST deployed  mysql-1.6.9 5.7.30 
```

### 4.Share:

- [Tutorial Part 2: Implement a Chat Server](https://channels.readthedocs.io/en/stable/tutorial/part_2.html)  

- [Django 集成 Channels](http://taoya.art/blog/post/37)  

- [centos 安装 helm](https://blog.csdn.net/u013078871/article/details/118304230)  

- [Flask 学习（二）jinja2模板介绍](https://www.programminghunter.com/article/28561655426/)  

- [Windows 10 Helm / Kubernetes Development Environment Setup](https://codelabs.solace.dev/codelabs/helm-environment-setup/#0)  

- [lambda HashMap 排序](https://www.jianshu.com/p/c9e52ef21758)  


