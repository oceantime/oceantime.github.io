---
title: ARTS-week-32
date: 2020-08-16 10:43:44
tags:
---


## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm: 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

Palindromic Substrings https://leetcode.com/submissions/detail/381501711/

### 2.Review:

https://www.oreilly.com/content/should-i-use-microservices/
我应该使用微服务吗？

#### 点评：

作者 Sam Newman 讨论了在组织中何时以及何时不应用微服务的注意事项。

总结：
- 微服务不足的地方
定义稳定的服务边界的重要性方面，微服务架构对于全新产品或初创企业而言通常是一个糟糕的选择。领域模型的这种转变反过来将导致对服务边界进行更多更改，并且跨服务边界协调更改是一项昂贵的工作。总的来说，定义域模型需要足够多的尝试后再定义服务边界是比较合适的。

我确实看到了对于初创公司首先采用微服务的一种诱惑。原因是：“如果我们真的成功的话，我们需要扩大规模！” 问题是，不一定知道是否有人愿意使用的新产品，即使确实成功地需要一种高度可扩展的体系结构，最终交付给用户的东西也可能非常与一开始就开始构建的东西不同。找到适合市场的过程意味着最终可能会得到与开始时想像的产品截然不同的产品。

通常，最大的制约因素是人员，这使初创企业面临微服务的挑战。对于一个小型团队来说，微服务架构可能很难证明其合理性，因为需要做一些工作来处理微服务本身的部署和管理，有些人将其称为“微服务税”。这会使得五人团队中有一个人将时间花在这些问题上而不花在构建产品上。一旦了解了体系结构中的约束条件和痛点所在，以后转移到微服务会容易得多，那么就可以将精力集中在最明智的地方使用微服务。

- 微服务好的地方
我看到组织采用微服务的最大原因可能是，允许更多的开发人员在同一个系统上工作而不会互相干扰。正确安排的体系结构和组织边界，并允许更多的人彼此独立工作，从而减少交付争用。

通常，软件即服务（SaaS）软件也非常适合微服务体系结构。这些产品通常被期望以24×7全天候运行，这在推出变更方面带来了挑战。微服务架构的独立可释放性在这个领域是一个巨大的福音。此外，可以根据需要按比例放大或缩小微服务。这意味着，当为系统的负载特性建立合理的基准时，将获得更多控制权，以确保可以以最具成本效益的方式扩展系统。

微服务的技术不可知性确保可以充分利用云平台。公共云供应商为的代码提供了广泛的服务和部署机制。可以更轻松地将特定服务的需求与云服务相匹配，这将最好地帮助实现它们。

最重要的是，微服务架构可以为提供不断扩展的系统灵活性。这种灵活性当然是有代价的，但是如果想在将来可能要进行的更改方面保持开放的态度，那可能是值得付出的代价。

### 3.Tip:

1. idea 创建第一个 maven 项目报错：Cannot resolve plugin org.apache.maven.plugins:maven-clean-plugin:2.5

```shell
# 主要原因是本地maven的配置文件和仓库地址不一致。
# 其中Local repository 的地址和 settings file中的地址保持一致
maven配置中3个选项
Maven home directory
User settings file
Local repository
```

2. Celery的工具flower安装和使用：

```shell
# 安装flower
pip install flower

# 启动flower
flower -A celery_tasks.task --port=5555

# 进入http://localhost:5555即可查看
```

3. nginx: [emerg] socket() [::]:80 failed (97: Address family not supported by protocol)

```shell
vim /etc/nginx/conf.d/default.conf
# 将
listen       80 default_server;
listen       [::]:80 default_server;

# 改为：
listen       80;
#listen       [::]:80 default_server;
```

4. Linux下RPM软件包的安装及卸载
RPM 有五种操作模式，分别为：安装、卸载、升级、查询和验证。

#### RPM 安装操作
命令：
rpm -i 需要安装的包文件名

举例如下：
```shell
rpm -i example.rpm 安装 example.rpm 包；
rpm -iv example.rpm 安装 example.rpm 包并在安装过程中显示正在安装的文件信息；
rpm -ivh example.rpm 安装 example.rpm 包并在安装过程中显示正在安装的文件信息及安装进度；
```

#### RPM 查询操作
命令：
rpm -q …

附加查询命令：
a 查询所有已经安装的包以下两个附加命令用于查询安装包的信息；
i 显示安装包的信息；
l 显示安装包中的所有文件被安装到哪些目录下；
s 显示安装版中的所有文件状态及被安装到哪些目录下；以下两个附加命令用于指定需要查询的是安装包还是已安装后的文件；
p 查询的是安装包的信息；
f 查询的是已安装的某文件信息；

举例如下：
```shell
rpm -qa | grep tomcat4 查看 tomcat4 是否被安装；
rpm -qip example.rpm 查看 example.rpm 安装包的信息；
rpm -qif /bin/df 查看/bin/df 文件所在安装包的信息；
rpm -qlf /bin/df 查看/bin/df 文件所在安装包中的各个文件分别被安装到哪个目录下；
```

#### RPM 卸载操作
命令：
rpm -e 需要卸载的安装包

在卸载之前，通常需要使用rpm -q …命令查出需要卸载的安装包名称。
举例如下：
```shell
rpm -e tomcat4 卸载 tomcat4 软件包
```

#### RPM 升级操作
命令：
rpm -U 需要升级的包

举例如下：
```shell
rpm -Uvh example.rpm 升级 example.rpm 软件包
```

#### RPM 验证操作
命令：
rpm -V 需要验证的包

举例如下：
```shell
rpm -Vf /etc/tomcat4/tomcat4.conf
输出信息类似如下：
S.5....T c /etc/tomcat4/tomcat4.conf
```

其中，S 表示文件大小修改过，T 表示文件日期修改过。限于篇幅，更多的验证信息请参考rpm 帮助文件：man rpm

#### RPM 的其他附加命令
--force 强制操作 如强制安装删除等；
--requires 显示该包的依赖关系；
--nodeps 忽略依赖关系并继续操作；

### 4.Share:

https://blog.csdn.net/xixiaoyaoww/article/details/106536594
7款优秀Vim插件帮打造完美IDE