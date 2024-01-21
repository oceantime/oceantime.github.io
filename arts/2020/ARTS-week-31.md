---
title: ARTS-week-31
date: 2020-08-09 20:24:36
tags:
---


## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm: 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

Task Scheduler https://leetcode.com/submissions/detail/378377076/

### 2.Review:

https://www.oreilly.com/content/5-key-drivers-for-getting-more-value-from-your-data/
5 个关键驱动因素从数据获取更多价值 

#### 点评：

作者  Michael Li and Matt Maccaux 确定了五个关键驱动因素，可以帮助成熟的企业更快地实现获利。

总结：
- 将数据整合到单个数据湖中，以避免数据泛滥
随着组织逐渐发展为大数据，通常会在整个企业中弹出Hadoop和其他大数据技术的部署。最初的分散式方法可以加快采用速度，但最终会导致数据和技术孤岛。这些孤岛是有问题的，因为数据经常在部署之间重复，从而导致可能的合规性问题，但无疑会导致更高的总体维护成本。

- 为用户提供适当级别的数据访问权限
对于将数据整合到一个集中的湖中的组织，下一个挑战是提供对数据的正确访问级别。为了使数据科学家能够执行高级分析，他们需要做些事情：访问大量数据，使用外部数据源扩充现有数据的能力以及使用尖端工具和库对数据进行建模的能力。这通常与规避风险的IT管理员想要提供的内容完全相反，这会导致数据科学家的生产力下降。IT策略要求在安全性和稳定性之间取得平衡。成功的客户通常通过提供独立于生产系统的分析沙箱来回避此问题，为数据科学界。

- 在治理与自由之间取得平衡
如果没有治理和结构，数据湖将很快成为无法居住的数据沼泽，并且泻湖的表不受支持。关键是要在给用户自由使用某些工具和进行实验的能力之间找到适当的平衡，同时为操作环境提供一致的服务质量。

- 使数据计划与业务目标保持一致
太多组织在其大数据部署的早期阶段就迅速建立数据平台并做出技术选择，而没有考虑整个过程中的业务战略。事实证明，如果在不了解企业如何实际利用底层系统的情况下进行技术选择和业务流程，那么部署的平台很可能无法满足企业的需求，因此将被废弃。IT和业务部门必须协作并共同努力，在实施之前定义系统的要求。

- 创建具有扩展能力的数据基础架构
大多数良好的数据湖实施都遵循在商品，裸机基础架构上进行部署的久经考验的指导。很好，直到事实并非如此。一旦这些部署通过数十名分析用户到达数十台服务器和数百TB数据，配置沙箱便成为了一项全职工作，而事实并非如此。有两点可以帮助简化此过程：
 - 容器化计算环境，以便单击按钮即可部署新的沙箱。
 - 将数据存储与计算环境分离，并提供从容器化沙箱到数据的只读访问。
Docker和Kubernetes为此提供了出色的工具。这为分析师提供了灵活性，并易于访问具有完整性的数据，同时允许计算与存储层的独立可伸缩性。结果是降低了总拥有成本并简化了总体维护。


### 3.Tip:

1. Apache Maven 项目提供的 Dependency 插件详解

```shell
# 下载 nginx 安装包
Dependency插件提供了大量的goals，常用的如下：

dependency:analyze 分析此项目的依赖项，并确定哪些是：已使用并已声明；已使用和未声明；未使用和已声明。
dependency:display-ancestors 显示父级项目的所有原始 pom，需要知道项目所有父 pom 的连续集成系统中可能很有用。
dependency:list 列出此项目的依赖项的列表别名。
dependency:resolve Maven 解析所有依赖项并显示版本。
dependency:resolve-plugins 解析插件 Maven 来解析插件及其依赖关系。
dependency:tree 显示此项目的依赖关系树。
dependency:unpack 拆开包装复制但解包。
```

2. 利用 dependency:analyze-only 分析依赖
对 Maven 项目的依赖的分析默认属于 verify 阶段，即执行 mvn verify 默认将会执行 dependency:analyze。
但是也可以将 dependency:analyze 与构建阶段绑定。
pom.xml配置如下：

```shell
<build>
    <plugins>
      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-dependency-plugin</artifactId>
        <version>2.10</version>
        <executions>
          <execution>
            <id>analyze-only-in-package</id>
            <phase>package</phase>
            <goals>
              <goal>analyze-only</goal>
            </goals>
            <configuration>
              <!-- configure the plugin here -->
            </configuration>
          </execution>
        </executions>
      </plugin>
    </plugins>
</build>
```

3. 利用dependency:tree解决依赖冲突

```shell
mvn dependency:tree -Dverbose -Dincludes=log4j
```

### 4.Share:

Presto实现原理和美团的使用实践
https://tech.meituan.com/2014/06/16/presto.html