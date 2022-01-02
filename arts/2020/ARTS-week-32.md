---
title: ARTS-week-32
date: 2020-04-19 14:29:35
tags:
---

## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm： 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

Search a 2D Matrix https://leetcode.com/submissions/detail/327030583/

### 2.Review:

https://python-history.blogspot.com/2018/05/the-origins-of-pgen.html

#### 点评：

Guido van Rossum 在本文中，介绍了 pgen 的起源。

Pgen 有两个版本一个是最初的，用 C 语言写的，还有一个则是用 Python 重写的，在 lib2to3/pgen2 下面，创建 pgen 的原因：
1.词法解析作者尝试过 Lex 但在尝试扫描超 255 个字节的标记符时 Lex 版本会发生段错误，而语法分析生成器基本上只有 Yacc 但是出于某些原因，作者并不喜欢它。
2.网页所称的的左分解（将 A -> X | X Y Z 替换成 A -> X B; B -> Y Z | <empty>），作者会重写成 A -> X [Y Z]，通过“正则表达式 -> NFA -> DFA”的转换过程，解析引擎（该网页中前面的 syntacticAnalysis 函数）依然可以工作在由这些规则所派生的解析表上。
3.解析引擎生成的解析树节点可能有很多子节点，例如，对于上面的规则 A -> X [Y Z]，节点 A 可能有 1 个子节点（X）或者 3 个（X Y Z）。代码生成器中就需要有一个简单的检查，来确定它遇到的是哪一种可能的情况。（这已经被证明是一把双刃剑，后来作者添加了一个由单独的生成器所驱动的“解析树 -> AST”步骤，以简化字节码生成器。）
4.由于作者本身熟悉 LL(1) 解析器，并已认真地编写过一些递归下降的 LL(1) 解析器——作者很喜欢它，而且还熟悉 LL(1) 解析器的生成技术（同样是因为龙书），所以有了一个改进念头想要试验下：使用正则表达式（某种程度的）而不是标准的 BNF 格式。龙书还教会了作者如何将正则表达式转换成 DFA，所以作者把所有这些东西一结合，pgen 就诞生了。

Pgen2 创建的原因：作者在 Google 一项设计定制语言的任务（目标是作关于系统配置的安全性判定）。作者决定设计一些稍微像 Python 的东西，用 Python 来实现，并且决定要重用 pgen，但是后端要基于 Python，使用 tokenize.py 作为词法分析器。所以作者用 Python 重写了 pgen 里的那些算法，然后继续构建了剩余的部分。

结束语：如果让作者重做一遍，作者可能会选择一个更强大的解析引擎，可能是 LALR(1) 的某个版本（例如 Yacc/Bison）。LALR(1) 的某些地方要比 LL(1) 更给力，也更加有用，例如，关键字参数。

备注：
1.龙书，原文是 Dragon book，指代《Compilers: Principles, Techniques, and Tools》，这是一本讲编译原理的书，属于编译原理界的殿堂级存在。
2.Lex 是“LEXical compiler”的简称，用来生成词法分析器；Yacc 是“Yet another compiler compiler”的简称，用来生成语法分析器。
3.段错误，原文是 segfault，全称是segmentation fault，指的是因为越界访问内存空间而导致的报错。

### 3.Tip:



1. 编写带括号的四则运算产生式


``` java
// 例子：2*(1+2)||2  测试地址 https://pegjs.org/online
start
  = LogicalExpression

DecimalNumber "DecimalNumber"
  = digits:[0-9]+ { return parseInt(digits.join(""), 10); }
  
PrimaryExpression
  = DecimalNumber
  / "(" AdditiveExpression:AdditiveExpression ")" { return AdditiveExpression; }

MultiplicativeExpression
  = left:PrimaryExpression "*" right:MultiplicativeExpression { return left * right; }
  / left:PrimaryExpression "/" right:MultiplicativeExpression { return left / right; }
  / PrimaryExpression

AdditiveExpression
  = left:MultiplicativeExpression "+" right:AdditiveExpression { return left + right; }
  / left:MultiplicativeExpression "-" right:AdditiveExpression { return left - right; }
  / MultiplicativeExpression

LogicalExpression
  = left:AdditiveExpression "||" right:LogicalExpression { return left || right; }
  / left:AdditiveExpression "&&" right:LogicalExpression { return left && right; }
  / AdditiveExpression
```

2. 乔姆斯基 (chomsky) 文法分类

非形式语言
    中文，英文
形式语言（乔姆斯基谱系）
    0型 无限制文法
    1型 上下文相关文法
    2型 上下文无关文法
    3型 正则文法

0型文法其中,至少含有一个非终结符，并且，表示终结符和非终结符的并集。
1型文法：又称为上下文有关文法，对任一产生式α→β，都有|β|≥|α|， 仅仅 S→ε除外
（1）：式子左边可以有多个字符，但必须有一个非终结符
（2）：式子右边可以有多个字符，可以是终结符，也可以是非终结符，但必须是有限个字符
（3）：左边长度必须小于右边（例外）
2型文法：又称为上下文无关文法，对任一产生式α→β，都有α∈VN ， β∈(VN∪VT)*
（1）：式子左边只能有一个字符，而且必须是非终结符
（2）：式子右边可以有多个字符，可以是终结符，也可以是非终结符，8但必须是有限个字符
3型文法：又称为正规文法（正规文法又包括左线性文法和右线性文法）
（1）：式子左边只能有一个字符，而且必须是非终结符
（2）：式子右边最多有二个字符，而且如果有二个字符必须是一个终结符和一个非终结符
如果只有一个字符，那么必须是终结符
（3）：式子右边的格式一定要一致，也就是说如果有一个是（终结符+非终结符）那么所有的式子都必须是（终结符+非终结符）
  如果有一个是（非终结符+终结符），那么所有的式子都必须是（非终结符+终结符）
正规文法——左线性文法：
（1）：必须是三型文法
（2）：式子右边的产生是（非终结符+终结符）的格式
正规文法——右线型文法：
（1）：必须是三型文法
（2）：式子右边的产生式是（终结符+非终结符）的格式

3. 计算机语言分类(待更正)
1型文法 JavaScript Python 
2型文法 C、Pascal、Java、C#、C++、PHP、0C、 Swift、Go、Scala、R
3型文法 正则表达式 SQL

### 4.Share:

less开发常用知识点归纳
https://www.jianshu.com/p/d81496ed0e29

