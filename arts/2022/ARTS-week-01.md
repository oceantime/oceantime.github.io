---
> 2022-01-03 21:50:00 **ARTS-week-01**
---


## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm： 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

75. 颜色分类：https://leetcode-cn.com/submissions/detail/254201313/
451. 根据字符出现频率排序：https://leetcode-cn.com/submissions/detail/254271311/
1185. 一周中的第几天：https://leetcode-cn.com/submissions/detail/254434993/

### 2.Review:

https://www.math3ma.com/blog/fibonacci-sequence
关于GCD和斐波那契数列的一个有趣事实

#### 点评：

多年来，本博客上的文章已经跨越了广泛的受众，从有趣的事实（乘以非数字），到本科水平（第一同构定理，直观地），到研究生水平（什么是操作？），到研究水平。今天的文章更多的是关于有趣的一面，以及 - 像这里的大多数文章一样 - 对类别理论的关注。所以这里有一个关于最大公约数（GCD）和斐波那契数列的有趣事实潜伏在背景中，这种身份意味着它具有某种不错的属性。但那张地图是什么呢？它保留了什么结构？描述它拥有的漂亮属性的正式方式是什么？现在，一个每个非空有限子集都有一个相遇的偏序集合被称为相遇半格，自然数就是一个例子。你总是可以找到自然数的有限子集的GCD。以及相遇半晶格之间的相遇保持函数，例如我们的以上，称为相遇半晶格同态。但是偏序集合，满足和满足半格同态都可以用范畴论的语言重新表达：偏序集合是范畴;相遇是分类极限，而相遇半格同态是具有良好性质的函子。这种视角的转变有点过分，但想想很有趣！

总而言之，斐波那契数列可以被认为是来自完整类别的连续函子序列。更简单地说，当被视为可除性下的偏序集合时，它是自然数之间的相遇半格同态。现在，我将是第一个承认的人 - 对于这样一个简单的想法，分类语言有点过载。但是，进入抽象世界是很有趣的，看看熟悉的东西是多么的一般事物的特例！顺便说一句，这里的斐波那契数列没有什么特别之处 - 任何强可除性序列都可以以这种方式重铸！

### 3.Tip:

#### ignite 修改密码
ignite默认是没有开启认证的,修改配置文件后
```shell
<property name="authenticationEnabled" value="true"/>
```
可以使用默认的ignite/ignite首次登录,登录后修改ignite用户的密码
```java
ALTER USER "ignite" WITH PASSWORD 'IGNITEABC';
```

2、在mysql数据库中，“1252999488000”（java中的long型数据）转化为日期：
```java
select from_unixtime(1252999488);
```
【注】：要将最后三位去掉。

#### maven snapshot 的 jar 包中的类找不到
maven管理项目的过程中碰到这样一个问题，引用同项目组的同事开发的第三方jar包，开发完成后编译也通过了，但是在启动的过程中，结果怎么都找不到引用的别人项目jar包下面所有的类，引用的jar是snapshort包，在idea中将所有冲突的jar都清楚了之后，问题还是没有解决。
在pom.xml中依赖的jar是
```xml
<dependency>
 <groupId>com.mintq.bigdata.platform</groupId>
 <artifactId>mintq-bdp-kafka</artifactId>
 <version>0.0.1-SNAPSHOT</version>
</dependency>
```
最后发现 maven install 之后，在生成的项目jar中的
![An image](./images/ARTS-week-01-1.gif)
在这个文件中打开之后，查看编译的snapshot包，看到的是，这是一个带有时间戳的版本，因此找不到对应的jar包。
分析原因可能是上传了同一版本号的多个snapshot版本，编译之后找不到pom.xml中的jar包。可以通过两种方式来解决这个问题

第一种方法：
```xml
<plugin>
 <groupId>org.apache.maven.plugins</groupId>
 <artifactId>maven-jar-plugin</artifactId>
 <version>2.4</version>
 <configuration>
     <archive>
         <manifest>
             <addClasspath>true</addClasspath>
             <mainClass>com.test.Application</mainClass>
             <classpathPrefix>dependency/</classpathPrefix>
             <useUniqueVersions>false</useUniqueVersions>
         </manifest>
     </archive>
 </configuration>
</plugin>
```
中添加<useUniqueVersions>false</useUniqueVersions>，这样编译之后仍然是mintq-bdp-kafka-0.0.1-SNAPSHOT.jar包，就可以找到对应的该jar中的类了。

第二种方法：
将snapshot版本的jar修改为release版本，并上传到私服，从私服下载release版本，也可以解决该问题

#### git 创建、删除远程分支和本地分支
1.使用命令git branch -a 查看所有分支remote/origin/master表示的是远程分支
2.创建远程分支
git checkout -b bug-001  # 创建本地分支并切换
git push --set-upstream origin bug-001  # 创建远程分支
3.删除远程分支   
如：使用命令 git push origin --delete dev   可以删除远程分支dev   
4.删除本地分支
使用命令，git branch -d dev 可以删除本地分支（在主分支中）

### 4.Share:

https://blog.csdn.net/x541211190/article/details/79597236
Java 数组转 List 的三种方式及对比

https://blog.csdn.net/xiaowanziwuha/article/details/47734315
ThreadMXBean 定位 CPU 占用过高 JSP

https://blog.csdn.net/u014532901/article/details/78820124
Java Array、List、Set互相转化

https://www.cnblogs.com/shamo89/p/9885779.html
TreeMap 升序|降序排列

https://www.jianshu.com/p/c8419c40596b
终结：IntelliJ IDEA(idea) 查看 maven依赖树

http://ignite-service.cn/doc/java/Persistence.html
Apache Ignite技术服务-配置持久化

http://events.jianshu.io/p/57ff1ec380b5
全面对比，深度解析 Ignite 与 Spark

https://www.saoniuhuo.com/question/detail-2070582.html
apache ignite 2.7.5监控指标