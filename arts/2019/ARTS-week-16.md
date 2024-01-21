---
title: ARTS-week-16
date: 2019-12-15 07:53:52
tags:
---

## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm: 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

Decode Ways https://leetcode.com/submissions/detail/286135648/

### 2.Review:

https://lemire.me/blog/2017/07/07/are-your-strings-immutable/

#### 点评：
文章中用图文的方式分析了 Rabin-Karp如何进行字符串匹配的判断的。Rabin-Karp比较的是pat的hash值和当前对应的txt子串的hash值。如果hash值相等，然后再去逐个检查子串的字符。最直接的方法莫过于计算h(pat)和txt中所有子串的hash，然后一一比较。但光是计算txt中所有子串的hash就需要O(mn)的时间，这样一来，相比起 Naive Pattern Searching，这个方法就毫无优势了。

如何计算hash值是Rabin-Karp的关键，最好是能够利用当前txt子串的hash值，计算后移一位以后的，以减少计算的开销。Rabin-Karp使用的hash叫做Rolling hash，基本实现是刚刚的方法实际上重复计算了很多重叠的部分，而Rolling hash就要利用当前子串的hash值，来计算后移一个位置之后子串的hash值。最后，文章给出了各个语言版本的具体实现。

### 3.Tip:

判断当前时间是否在某段时间范围内

``` java
public void isBelong(){
    SimpleDateFormat df = new SimpleDateFormat("HH:mm");//设置日期格式
    Date currentTime =null;
    Date beginTime = null;
    Date endTime = null;
    try {
        currentTime = df.parse(df.format(new Date()));
        beginTime = df.parse("06:00");
        endTime = df.parse("09:00");
    } catch (Exception e) {
        e.printStackTrace();
    }

    Boolean flag = belongCalendar(currentTime, beginTime, endTime);
    System.out.println(flag);
}

/**
 * 判断时间是否在某段时间范围内
 * @param currentTime
 * @param beginTime
 * @param endTime
 * @return
 */
public static boolean belongCalendar(Date currentTime, Date beginTime, Date endTime) {
    Calendar current = Calendar.getInstance();
    current.setTime(currentTime);

    Calendar begin = Calendar.getInstance();
    begin.setTime(beginTime);

    Calendar end = Calendar.getInstance();
    end.setTime(endTime);

    if (current.after(begin) && current.before(end)) {
        return true;
    } else {
        return false;
    }
}
```

### 4.Share:

#### 数据结构

##### 一维
基础：数组 array(string)，链表 linked list
高级：栈 stack，队列 queue，双端队列 deque，集合 set， 映射 map(hash or map), etc

##### 二维
基础：树 tree， 图 graph
高级：二叉搜索树 binary search tree(red-black tree, AVL), 堆 heap, 并查集 disjoint set, 字典树 Trie, etc

##### 特殊
位运算 Bitwise, 布隆过滤器 BloomFilter
LRU Cache

#### 算法
if-else, switch -> branch
for, while loop -> iteration
递归 Recursion(Divide & Conquer, Backtrace)
搜索 Search:深度优先搜索 Depth first search, 广度优先搜索 Breadth first search, A\*, etc
动态规划 Dynamic Programming
二分查找 Binary Search
贪心 Greedy
数学 Math, 几何 Geometry
注意： 在头脑中回忆上面每种算法的思想和代码模板

#### 化繁为简的思想
1.人肉递归低效、很累
2.找到最近最简方法，将其拆解成可重复解决的问题
3.数学归纳法思维
本质： 寻找重复性 -> 计算机指令集

#### 学习要点
基本功是区别业余和职业选手的根本。深厚功底来自于-过遍数
最大的误区: 只做一遍
五毒神掌
刻意练习-练习缺陷点地方、不舒服、枯燥
反馈-看题解、看国际版的高票回答

#### 经典习题
爬楼梯、硬币兑换
括号匹配、括号生成、直方图最大面积、滑动窗口
二叉树遍历、分层输出树、判断二叉排序树
股票买卖、偷房子、字符串编辑距离、最长上升子序列、最长公共子序列
异位词(判断和归类)、回文串(最大回文串)、regex和通配符匹配
高级数据结构(Trie、BloomFilter、LRU cache、etc)


#### 五毒神掌
第一遍：不要死磕，要看代码学习(一定要看国际版的高票回答)
第二遍：自己写
第三遍：24小时后
第四遍：一周后
第五遍：面试前

#### 面试技巧
1.Clarifica: 明确题目意思、边界、数据规模
2.Possible solutions: 穷尽所有可能的解法
- compare time/space
- optimal solution
3.Coding: 代码简洁、高性能、美感
https://shimo.im/docs/rHTyt8hcpT6D9Tj8
4.Test cases 
