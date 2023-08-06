---
> **ARTS-week-15**
> 2021-04-18 20:55
---


## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm： 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

300. 最长递增子序列 https://leetcode-cn.com/submissions/detail/169346482/
343. 整数拆分 https://leetcode-cn.com/submissions/detail/169282927/
51. N 皇后 https://leetcode-cn.com/submissions/detail/169258306/

### 2.Review:

https://towardsdatascience.com/supercharge-your-python-string-with-textblob-2d9c08a8da05
一行代码便可更正拼写！Textblob 增强 Python 字符串格式化

#### 点评：

作者 Khuyen Tran

TextBlob 旨在通过熟悉的界面提供对常见文本处理操作的访问。可以把 TextBlob 对象当作是 Python strings 他们学会了如何进行自然语言处理：
- 分词
- 名词短语提取
- 情感分析
- 更正拼写
- 拼写校对
- 词频统计


### 3.Tip:

#### Java 用 Arrays.fill() 初始化 二维数组

```java
# Arrays.fill() 并不能提高赋值的效率，在函数的内部也是用 for 循环的方式 实现的
int[][] memo = new int[4][5];
for(int i = 0; i < memo.length; i++){
	Arrays.fill(memo[i], -1);
}
```

#### Java 字符数组 char[] 和字符串 String 之间的转换

```java
# 使用 String.valueOf() 将字符数组转换成字符串
char[] cs = {'A','G','C','T'};
String str = String.valueOf(cs);

# 使用 .toCharArray() 将字符串转换成字符数组
String str = "AGCT";
char[] cs = str.toCharArray();
```

#### Java 中初始化 ArrayList 的三种方式

```java
# 常规初始化
List<String> list1 = new ArrayList<String>();
list1.add("apple");

# 使用 List 初始化
List<String> list2 = new ArrayList<String>(Arrays.asList("apple", "apple"));
List<String> list3 = new ArrayList<String>(Collections.nCopies(2, "apple"));

# 匿名内部类初始化
List<String> list4 = new ArrayList<String>() {{
	add("apple");
}}
```

#### golang 字符串截取

```golang
tracer := "死神来了, 死神bye bye"
comma := strings.Index(tracer, ", ")
pos := strings.Index(tracer[comma:], "死神")
fmt.Println(comma, pos, tracer[comma + pos:]) // 12 3 死神bye bye
```

### 4.Share:

https://studygolang.com/articles/5769
golang 中 strings 包用法

https://blog.csdn.net/qq_26981997/article/details/53454606
golang 积累-时间、时区、格式的使用

https://www.jianshu.com/p/a7c11d858783
redis 中 hash 的使用

https://m.yisu.com/zixun/13097.html
golang 初始化数据库和 redis 的方法

https://segmentfault.com/a/1190000021702953
golang 操作 redis 5大数据类型(string、hash、list、set、zset)(go-redis)

https://cloud.tencent.com/developer/news/358315
Redis 的模糊查询在生产环境出现严重的性能问题

http://jsoniter.com/go-tips.html
jsoniter 是一款快且灵活的 JSON 解析器

https://morning.work/page/go/json.html
Go 语言操作 JSON 的几种方法

https://studygolang.com/articles/12702
大幅提升 golang 写日志序列化性能实践