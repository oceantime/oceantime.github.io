---
title: ARTS-week-33
date: 2020-08-22 17:16:44
tags:
---


## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm： 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

Minimum Window Substring https://leetcode.com/submissions/detail/384577085/

### 2.Review:

https://www.oreilly.com/content/the-state-of-data-analytics-and-visualization-adoption/
数据分析和可视化采用的状态

#### 点评：

2017年春季，Zoomdata委托O'Reilly Media创建并执行一项评估数据和分析行业状况的调查。重点是了解现代大数据和流数据技术的渗透，用户如何使用数据分析以及组织对人员配备最感兴趣的技能。来自不同行业以及政府和学术界的近900人对此调查做出了回应。以下是调查提供的一些见解的预览。

1.当然，关系数据库仍然是在线事务处理（OLTP）系统的核心。但是，最有趣的发现之一是，当被问及组织的主要数据来源时，不到三分之一的受访者列出了关系数据库，而大约三分之二的人选择了非关系来源。
2.这些现代数据源经过优化，可以处理大数据的“三个V”：非常大的数据量；高速流数据；以及各种各样的非结构化和半结构化数据，例如文本和日志文件。
3.分析数据库（19％）和Hadoop（14％）是两个最受欢迎的非关系源。

参考资料：http://go.zoomdata.com/l/190352/2017-09-22/515vpz
具有生产和开发中的大数据项目的组织的比例
不同级别的数据新鲜度对组织有多么重要
最受欢迎的流数据平台
组织要配备的主要技术技能
组织是通过独立的BI应用程序使用分析还是作为嵌入其他业务应用程序和流程的分析组件使用

### 3.Tip:

Velocity 模板引擎介绍

Velocity 是一个基于 java 的模板引擎（template engine）。它允许任何人仅仅简单的使用模板语言（template language）来引用由 java 代码定义的对象。当 Velocity 应用于web开发时，界面设计人员可以和 java 程序开发人员同步开发一个遵循 MVC 架构的 web 站点，也就是说，页面设计人员可以只关注页面的显示效果，而由 java 程序开发人员关注业务逻辑编码。

1. Velocity 基本语法

```java
"#"用来标识 Velocity 的关键字，包括 #set、#if 、#else、#end、#foreach、#end、#include、#parse、#macro 等；
"$"用来标识 Velocity 的变量；如：$i、$msg、$TagUtil.options(...) 等。
"{}"用来明确标识 Velocity 变量；比如在页面中，页面中有一个 $someonename，此时，Velocity 将把 someonename 作为变量名，若我们程序是想在 someone 这个变量的后面紧接着显示 name 字符，则上面的标签应该改成 ${someone}name。
"!"用来强制把不存在的变量显示为空白。如：当找不到 username 的时候，$username 返回字符串 "$username"，而 $!username 返回空字符串""
```

2. Velocity 语法使用

#### 变量定义
```java
#set($name ="velocity")
```
等号后面的字符串 Velocity 引擎将重新解析，例如出现以$开始的字符串时，将做变量的替换。

#### 变量赋值
```java
#set($hello ="hello $name")
```
上面的这个等式将会给$hello赋值为"velocity"

#### 循环
```java
#foreach($element in $list) 
    <span>$!element</span><br>
#end
```
Velocity引擎会将list中的值循环赋给element变量

#### 条件语句
```java
#if(condition)
...
#elseif(condition)
…
#else
…
#end
```

#### 关系操作符
```java
#if($foo && $bar)
...
#end
```
Velocity 引擎提供了 AND、OR 和 NOT 操作符，分别对应 &&、|| 和 !

#### 关系操作符
```java

```

#### 宏
```java
Velocity 中的宏可以理解为函数定义
#macro(macroName arg1 arg2 ...)
...
#end

调用这个宏的语法是
#macroName(arg1 arg2 ...)

这里的参数之间使用空格隔开，下面是定义和使用 Velocity 宏的例子：
#macro(sayHello $name)
    hello $name
#end

#sayHello("velocity")
输出的结果为 hello velocity
```

#### #parse 和 #include
```java
#parse 和 #include 指令的功能都是在外部引用文件，而两者的区别是，#parse 会将引用的内容当成类似于源码文件，会将内容在引入的地方进行解析，#include 是将引入文件当成资源文件，会将引入内容原封不动地以文本输出。分别看以下例子：

foo.vm 文件：

#set($name = "velocity")
parse.vm：

#parse("foo.vm")
输出结果为：velocity

include.vm：

#include("foo.vm")
输出结果为：#set($name = "velocity")
```

#### 注释
```java
单行注释

##单行注释
多行注释

#*
    多行注释
*#
```

#### 单双引号
```java
单引号不解析引用内容，双引号解析引用内容

#set ($var="hello")

'$var'  ## 结果为：$var
"$var"  ## 结果为：hello
```

#### 属性
```java
通过'.'操作符使用变量内容

$Identifier.Identifier
$user.name
```

### 4.Share:

http://blog.itpub.net/31559354/viewspace-2712458/
ClickHouse留存分析工具十亿数据秒级查询方案