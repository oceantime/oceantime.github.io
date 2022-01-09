---
title: ARTS-week-18
date: 2019-12-29 19:37:05
tags:
---

## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm： 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

Merge Sorted Array https://leetcode.com/submissions/detail/289477912/

### 2.Review:

http://recursion.org/query-parser

#### 点评：
构建查询分析器#
作者详细介绍了为应用程序的搜索功能构建自己的查询解析器。可以为Elasticsearch查询DSL生成查询。通过Ruby的Parslet结合PEG从一个简单的词语匹配开始构建，添加布尔运算符、短语，最后结合一个特定场景的应用程序进行实践。

### 3.Tip:

禁止文本框输入有以下四种方法：

1.设置input为只读状态，代码如下：
``` html
<input type="text" readonly="readonly" value="只读字段是不能修改的。仍然可以使用 tab 键切换到该字段，还可以选中或拷贝其文本。">
```
2.设置input为不用状态，代码如下：
``` html
<input type="text" disabled="disabled" value="被禁用的 input 元素既不可用，也不可点击">
```
3.设置为可操作，但不能输入，代码如下：
``` html
<input type="text"  maxlength="0" value="maxlength属性：规定输入字段的最大长度">
```
4.onfocus="this.blur();"onfocuse是聚焦的意思，当你把光标放在文本框上输入的时候，就是聚焦，但这里添加了"this.blur()"，blur的作用就是去除聚焦，也就是你不能把光标放在这个文本框上，换句话说就是你不能输入文本了
``` html
<input type="text" onfocus="this.blur();" value="我是000">
```

### 4.Share:

使用 gulp 构建 Angular 项目
https://www.ibm.com/developerworks/cn/web/wa-cn-gulpangular/index.html
