---
> **ARTS-week-18**
> 2023-04-28 20:26
---


## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm： 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

- [1105. 填充书架](https://leetcode.cn/submissions/detail/427017002/)  
    + 思路：DFS
- [1031. 两个非重叠子数组的最大和](https://leetcode.cn/submissions/detail/427949104/)  
    + 思路：双指针
- [1048. 最长字符串链](https://leetcode.cn/submissions/detail/428223175/)  
    + 思路：哈希

### 2.Review:

[知识共享是专业成长的催化剂](https://underthehood.meltwater.com/blog/2022/08/30/knowledge-sharing-as-a-catalyst-for-professional-growth/)

我们还有另一个Devopsicon——我们的内部工程（un）会议。我们记录了大部分公司内部会议，以确保我们能够与那些无法参加的人分享知识，并随着时间的推移建立知识库。

我们决定更进一步，公开分享其中一些会议。这篇文章描述了这种方法如何使我们公司和我们工程师的专业成长受益。

#### 1、创建知识库

上一次非会议产生了大量的视频材料！在整个组织内录制和共享了大约130次会议。许多会议是并行进行的，因此录制会议有助于观众克服他们的FOMO，至少一点点。:)

由于我们最近完全远程运行了 Devopsicon 活动，因此我们在活动结束后记录、编目和共享这些记录方面做得更好。这创建了一个包含500 +各种主题视频的庞大知识库：

- 实时劫持 JavaScript 会话
- 理解大脑化学物质是加强团队的一种方式
- 将 terraform 与 GitHub 结合使用
- Backstage 作为提高开发人员生产力的工具

我们认为其中一些会议对于 Meltwater 工程师以外的人也会很有趣。这些会议将让了解我们是谁，我们如何工作以及我们正在做什么。

#### 2、Meltwater 有什么优势？

让我们坦白一点：我们一直在为我们的工程团队招聘新的优秀同事。为了让 Meltwater 以外的人了解我们的工作文化并展示我们在技术领域是一个有吸引力的雇主，我们需要为他们提供足够的机会来了解 Meltwater 工程文化。

但是我们如何创建相关材料呢？

我们发现，对于我们的许多同事来说，撰写博客文章的进入门槛很高。然而，在我们的内部非会议上，其中许多人发表了简短的内部演讲。显然，这比写作更容易！因此，我们决定将一些现有的视频内容转化为我们可以公开分享的材料。

此外，我们希望我们的工程师成长！这些演讲是我们支持他们个人和职业发展的一种方式。

#### 3、Meltwater 工程文化公开展示的原因

我们从非会议中挑选了一些最好的演讲，并要求演讲者重新录制它们。Ufff - 为他们做额外的工作！他们自然会问：“对我有什么好处？

从公开展示一些东西中可以学到很多东西：

- 展示的作品 - 在像 Meltwater 这样的B2B产品中，可能很难解释或展示的工作。创建有关正在处理的内容的视频可以一瞥它。
- 个人发展——学习如何表达复杂的话题，同时使其清晰但同时有趣，是一项艰巨的任务。因此，在公共场合提出一个话题对演讲者的个人发展有很大帮助。作为奖励，我们通过提供有关幻灯片和演示的建设性反馈来帮助我们的工程师。我们还处理大部分编辑工作，以相对较少的努力制作出具有专业外观的视频。
- 专业品牌 — 通过这些视频，我们的工程师将自己展示为知识渊博的专业人士，甚至是某个领域的专家。这有助于他们建立自己的专业品牌，这可能帮助他们在会议上获得演讲机会。

#### 4、在哪里可以找到视频？

我们从 fantastic 办事处的精彩Patrick Nanys关于 “Terraform中的KEDA - 好，坏，节省”的会议开始。

### 3.Tip:

#### dependencies 与 dependencyManagement 的区别

1、DepencyManagement应用场景
由于我们的模块很多，所以又抽象了一层，抽出一个 common-parent 来管理子项目的公共的依赖。为了项目的正确运行，必须让所有的子项目使用依赖项的统一版本，必须确保应用的各个项目的依赖项和版本一致，才能保证测试的和发布的是相同的结果。

在我们项目顶层的POM文件中，我们会看到 dependencyManagement 元素。通过它元素来管理jar包的版本，让子项目中引用一个依赖而不用显示的列出版本号。Maven 会沿着父子层次向上走，直到找到一个拥有 dependencyManagement 元素的项目，然后它就会使用在这个 dependencyManagement 元素中指定的版本号。

common-parent(pom.xml)
```xml
<artifactId>common-parent</artifactId>  
<groupId>com.test</groupId>  
<version>0.0.1-SNAPSHOT</version>
<packaging>pom</packaging>

<dependencyManagement>  
        <dependencies>  
            <dependency>  
                <groupId>org.eclipse.persistence</groupId>  
                <artifactId>org.eclipse.persistence.jpa</artifactId>  
                <version>${org.eclipse.persistence.jpa.version}</version>  
                <scope>provided</scope>  
            </dependency>  
              
            <dependency>  
                <groupId>javax</groupId>  
                <artifactId>javaee-api</artifactId>  
                <version>${javaee-api.version}</version>  
            </dependency>  
        </dependencies>  
    </dependencyManagement>  
```

sub-base(pom.xml)
```xml
<!--继承父类-->
<modelVersion>4.0.0</modelVersion>
<groupId>com.test</groupId>
<artifactId>sub-base</artifactId>  
<packaging>jar</packaging>

<parent>
    <artifactId>common-parent</artifactId>  
    <groupId>com.test</groupId>  
    <version>0.0.1-SNAPSHOT</version>  
    <relativePath>../common-parent/pom.xml</relativePath>  
</parent>
      
<!--依赖关系-->  
<dependencies>  
    <dependency>  
        <groupId>javax</groupId>  
        <artifactId>javaee-api</artifactId>  
    </dependency>  
      
    <dependency>  
        <groupId>com.fasterxml.jackson.core</groupId>  
        <artifactId>jackson-annotations</artifactId>  
    </dependency>  
      
    <dependency>  
        <groupId>org.eclipse.persistence</groupId>  
        <artifactId>org.eclipse.persistence.jpa</artifactId>  
        <scope>provided</scope>  
    </dependency>  
</dependencies>
```

这样做的好处：统一管理项目的版本号，确保应用的各个项目的依赖和版本一致，才能保证测试的和发布的是相同的成果，因此，在顶层pom中定义共同的依赖关系。同时可以避免在每个使用的子项目中都声明一个版本号，这样想升级或者切换到另一个版本时，只需要在父类容器里更新，不需要任何一个子项目的修改；如果某个子项目需要另外一个版本号时，只需要在dependencies中声明一个版本号即可。子类就会使用子类声明的版本号，不继承于父类版本号。

2.Dependencies
相对于 dependencyManagement，所有生命在 dependencies 里的依赖都会自动引入，并默认被所有的子项目继承。

3.区别
dependencies 即使在子项目中不写该依赖项，那么子项目仍然会从父项目中继承该依赖项（全部继承）
dependencyManagement 里只是声明依赖，并不实现引入，因此子项目需要显示的声明需要用的依赖。如果不在子项目中声明依赖，是不会从父项目中继承下来的；
只有在子项目中写了该依赖项，并且没有指定具体版本，才会从父项目中继承该项，并且 version 和 scope 都读取自父pom;
另外如果子项目中指定了版本号，那么会使用子项目中指定的jar版本。

4.Maven约定优于配置
它提出这一概念，为项目提供合理的默认行为，无需不必要的配置。提供了默认的目录
src      ——>   源代码和测试代码的根目录
main           应用代码的源目录
Java           源代码
resources      项目的资源文件
test           测试代码的源目录
java           测试代码
resources      测试的资源文件
target         编译后的类文件、jar文件等

对于Maven约定优于配置的理解，一方面对于小型项目基本满足我们的需要基本不需要自己配置东西，使用Maven已经配置好的，快速上手，学习成本降低；另一方面，对于不满足我们需要的还可以自定义设置，体现了灵活性。配置大量减少了，随着项目变的越复杂，这种优势就越明显。

总结区别：
<dependencies> 中的jar直接加到项目中，管理的是依赖关系（如果有父pom,子pom,则子pom中只能被动接受父类的版本）；
<dependencyManagement> 主要管理版本，对于子类继承同一个父类是很有用的，集中管理依赖版本不添加依赖关系，对于其中定义的版本，子pom不一定要继承父pom所定义的版本。

### 4.Share:

[解决IDEA导入maven项目Plugin ‘org.apache.maven.plugins:maven-compiler-plugin:‘ not found问题](https://blog.csdn.net/weixin_39984460/article/details/117825089)  

[缩印技巧知多少？缩印怎么设置？](http://bmabk.com/index.php/post/112273.html)
