---
> **ARTS-week-10**
> 2022-03-06 14:54
---


###### ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
- Algorithm： 每周至少做一个 leetcode 的算法题
- Review: 阅读并点评至少一篇英文技术文章
- Tip: 学习至少一个技术技巧
- Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

- [1601. 最多可达成的换楼请求数目（困难）?](https://leetcode-cn.com/submissions/detail/274975455/)  
  + 思路：回溯
- [6. Z 字形变换（中等）?](https://leetcode-cn.com/submissions/detail/275571184/)  
  + 思路：模拟
- [564. 寻找最近的回文数（困难）?](https://leetcode-cn.com/submissions/detail/276227114/)  
  + 思路：模拟(5种情况分析)
- [2104. 子数组范围和（中等）+](https://leetcode-cn.com/submissions/detail/277366569/)  
  + 思路：模拟 维护每个子集的最大小值
- [2100. 适合打劫银行的日子（中等）+](https://leetcode-cn.com/submissions/detail/278445132/)  
  + 思路：模拟 超时
  + 思路：前缀和

### 2.Review:

- [Elasticsearch 管道聚合综合指南：第 II 部分](https://qbox.io/blog/introduction-to-elasticsearch-pipeline-aggregations-part-ii/)  

#### 点评：

在之前的教程中，我们讨论了 Elasticsearch 管道聚合的结构，并引导设置了几个常见的管道，例如导数、累积总和 avg 桶聚合。

在本文中，我们将继续分析 Elasticsearch 管道聚合，重点介绍统计信息、移动平均线和移动函数、百分位数、存储桶排序和存储桶脚本等管道。Kibana 支持本文中讨论的一些管道聚合（如移动平均线），因此我们还将展示如何可视化它们。让我们开始吧！

- 百分位数存储桶聚合
百分位数是指示以下值的统计度量，该值是组中给定的观测值百分比。例如，第 65 百分位是低于该值可以找到 65% 的观测值的值。简单百分位数指标聚合计算索引数据中直接可用的值的百分位数。

但是，在某些情况下，使用日期直方图生成存储桶，并在应用百分位数之前计算这些存储桶的值。当我们可以使用百分位数存储桶管道来处理父聚合生成的存储桶和同级聚合计算的某些指标时，情况正是如此。请看下面的例子：：

```json
curl -X POST "localhost:9200/traffic_stats/_search?size=0&pretty" -H 'Content-Type: application/json' -d'
{
    "aggs" : {
        "visits_per_month" : {
            "date_histogram" : {
                "field" : "date",
                "interval" : "month"
            },
            "aggs": {
                "total_visits": {
                    "sum": {
                        "field": "visits"
                    }
                }
            }
        },
        "percentiles_monthly_visits": {
            "percentiles_bucket": {
                "buckets_path": "visits_per_month>total_visits",
                "percents": [ 15.0, 50.0, 75.0, 99.0 ] 
            }
        }
    }
}
'
```
在这里，我们计算由日期直方图生成的每个存储桶中指标输出的百分位数。与常规百分位聚合类似，百分位数管道聚合允许指定要返回的一组百分位数。在本例中，我们选择计算第 15、50、75 和 99 个百分位数，这反映在聚合字段中。total_visitspercents

上面的查询应返回以下响应：

```json
...
"percentiles_monthly_visits" : {
  "values" : {
    "15.0" : 2141.0,
    "50.0" : 2661.0,
    "75.0" : 2949.0,
    "99.0" : 3121.0
  }
}
```
例如，此数据显示，我们存储桶中所有每月访问量中有 99% 低于 3121。

### 3.Tip:

#### 正则表达式符号

| 字符串 | 功能           | 举例 |
| ------ | -------------- | ---- |
| 字符串 | 匹配字符串的值 | foo  |
|   re1&#124;re2     | 匹配正则表达式re1或re2 | foo&#124;bar |
| . | 匹配任何字符(换行符除外) | b.b |
| ^ | 匹配字符串的开始 | ^Dear(以Dear开头的字符串) |
| $ | 匹配字符串的结尾 | /bin/*sh (比配：/bin/bash、/bin/csh等) |
| * | 匹配前面出现的正则表达式零次或 多次 | \[A-Zaz0-9\]* |
| + | 匹配前面出现的正则表达式一次或 多次 | \[a-z\]+\.com |
| ? | 匹配前面出现正则表达式零次 或 一次 | goo? |
| \{N\} | 匹配前面出现的正则表达式N次 | \[0-9\]\{3\} |
| \{M,N\} | 匹配重复出现M次 到 N次正则表达式 | \[0-9\]\{5,9\} |
| \[...\] | 匹配字符组里出现的任意一个字符 | \[aeiou\] |
| \[x-y\] | 匹配从字符x到y中的任意一个字符 | \[0-9\],\[A-Za-z\] |
| \[^...\] | 不匹配字符集中出现的任何一个字符 | \[^aeiou\], \[^A-Za-z0-9\] |
| \(...\) | 匹配封闭括号中正则表达式\(RE\),并保存为子组 | \(\[0-9\]\{3\}\)?,f\(00&#124;u\)bar |
| \d | 匹配任何数字，和[0-9]一样(\D是\d的反义：任何非数字) | data\d+.text |
| \w | 匹配任何数字字母字符，和\[A-Za-z0-9\]相同 | \[A-Zq-z_\]\w+ |
| \s | 匹配任何空白符号 | of\sthe |
| \b | 匹配单词边界 | \bThe\b |
| \c | 匹配特殊字符 | \\.,\\\\,\\* |
| \\A\(\\Z\) | 匹配字符串的起始（结束） |  |

#### 正则表达式匹配举例

| 正则表达式模式 | 匹配的字符串   |
| -------------- | -------------- |
| at&#124;home         | at,home |
|  r2d2&#124;c3po  |r2d2,c3po|
| f.o |fao,f9o等|
| .. |aa,bb,ab等任意两个字符|
| \\.doc |.doc|
| ^From |匹配任何以From开始的字符串|
| /bin/tcsh$ |匹配以/bin/tcsh结束的字符串|
| ^Subject:hi$ |匹配仅由Subject:hi组成字符串|
| the |任何包含"the"字符串|
| \bthe |任何以"the"开始的字符串|
| \bthe\b |仅匹配单词"the"|
| \Bthe |任意包含"the"但不以"the"开头的单词|
| b\[aeiu\]t |bat, bet, bit, but|
| \[cr\]\[23\]\[dp\]\[o2\] |一个包含 4 个字符的字符串: 第一个字符是“r”或“c”,后面是“2”或 “3”,再接下来是 “d” 或 “p”,最后是 “o” 或 “2“ ,例 如:c2do, r3p2, r2d2, c3po, 等等。|
| \[r-u\]\[env-y\]\[us\] |“r”“s,”“t” 或 “u” 中的任意一个字符,后面跟的是 “e,” “n,” “v,” “w,” “x,” 或 “y”中的任意一个字符,再后面 是字符“u” 或 “s”. |
| \[^aeiou\] | 一个非元音字符 |
| \[^\\t\\n\] | 除 TAB 制表符和换行符以外的任意一个字符 |
| \\w+@\\w+\\.com | 简单的 XXX@YYY.com 格式的电子邮件地址 |
| \\d+\(\\.\\d*\)? | 浮点数 匹配：0.004,”“2.”“75.” |

#### Markdown 转义字符

```
\\ 反斜杠
\` 反引号
\* 星号
\_ 下划线
\{\} 大括号
\[\] 中括号
\(\) 小括号
\# 井号
\+ 加号
\- 减号
\. 英文句号
\! 感叹号
&#124; " | "
```

#### Java 字符串反转
```java

/**
 * 利用 StringBuffer 的内置 reverse 方法进行逆序排序
 *
 * @param str
 * @return
 */
public static String reverse1(String str) {
    return new StringBuffer(str).reverse().toString();
}

/**
 * 从头部开始,正序:通过字符串数组实现从尾部开始顺序逐个进入字符串 reverse
 *
 * @param str
 * @return
 */
public static String reverse2(String str) {
    int len = str.length();
    // 空串。方便拼接字符串
    String reverse = "";
    for (int i = 0; i < len; i++) {
        // charArt(int index) 返回指定索引处的字符。
        reverse = str.charAt(i) + reverse;
    }
    return reverse;
}

/**
 * 从尾部开始,倒序
 * @param str
 * @return
 */
public static String reverse3(String str) {
    // string 转换成char数组
    char[] arr = str.toCharArray();
    String reverse = "";
    for (int i = arr.length - 1; i >= 0; i--) {
        reverse += arr[i];
    }
    return reverse;
}

/**
 * 利用栈: First In Last Out
 * @param str
 * @return
 */
public static String reverse4(String str) {
    StringBuffer sb = new StringBuffer();
    // 创建只装字符型的 stack
    Stack<Character> s = new Stack<Character>();

    for (int i = 0; i < str.length(); i++) {
        s.add(str.charAt(i));
    }

    // 出栈，StringBuffer.append() 添加到sb的缓冲区末端；.insert(int index,添加的内容) 添加到指定位置
    for (int i = 0; i < str.length(); i++) {
        sb.append(s.pop());
    }

    return sb.toString();
}

/**
 * 二位进制的右移，利用临时变量进行交换
 * @param str
 * @return
 */
public static String reverse5(String str) {
    StringBuffer sb = new StringBuffer();

    //右移>>
    for (int i = 0, j = sb.length() - 1; i < sb.length() >>> 1; i++, j--) {
        char temp = sb.charAt(i);
        // setCharAt(int index 取代的位置, Char ch 要替换为的字符串)
        sb.setCharAt(i, sb.charAt(j));
        sb.setCharAt(j, temp);
    }
    return sb.toString();
}

/**
 * 递归
 * @param str
 * @return
 */
public static String reverse6(String str) {
    int len = str.length();
    if (len <= 1) {
        return str;
    }

    String left = str.substring(0, len / 2);
    String right = str.substring(len / 2, len);

    return reverse6(left) + reverse6(right);

}

/**
 * 异或^
 * @param str
 * @return
 */
public static String reverse7(String str) {
    char[] s = str.toCharArray();
    int begin = 0;
    int end = str.length() - 1;
    while (begin < end) {
        s[begin] = (char) (s[begin] ^ s[end]);
        System.out.println("第一次^ : " + s[begin] + s[end]);
        // s[begin] 被 s[end] 异或两次，得到 s[begin] 赋值给 s[end]
        s[end] = (char) (s[begin] ^ s[end]);
        System.out.println("第二次^ : " + s[begin] + s[end]);
        s[begin] = (char) (s[end] ^ s[begin]);
        // 换位成功
        System.out.println("第三次^ : " + s[begin] + s[end]);
        begin++;
        end--;
    }
    return new String(s);
}

```

#### Java 中 char 转化为 int 的两种方法

```java
char numChar = '9';
int  intNum = (int)numChar;
System.out.println(numChar + ": " + intNum);

//method 1:
char[] charArray = {numChar};
intNum = Integer.parseInt(new String(charArray));
System.out.println("method 1: " + numChar + ":" + intNum);

//method 2:
System.out.println("method 2: " + numChar + ":" + Character.getNumericValue(numChar));

```

### 4.Share:

- [反转字符串的7种方法（Java）](https://blog.csdn.net/EuniBoom/article/details/80136800)  

- [java精确除法运算（BigDecimal）](https://blog.csdn.net/qq_37080455/article/details/98964856)  

- [git commit --amend 修改git提交记录用法详解](https://zhuanlan.zhihu.com/p/100243017)  

- [Java JDBC 使用自定义类型映射](https://pingfangx.github.io/java-tutorials/jdbc/basics/sqlcustommapping.html)  

- [Markdown中尖括号和转义字符及Haroopad中包含尖括号不能折叠解决方式](https://blog.csdn.net/jhsword/article/details/95590250)  

- [spel表达式](https://elim168.github.io/spring/bean/23.spel%E8%A1%A8%E8%BE%BE%E5%BC%8F.html)  

- [Spring Expression Language学习文档（5.1.0.RELEASE版本）](https://www.codeleading.com/article/6771106134/)  

- [由浅入深SpEL表达式注入漏洞](http://rui0.cn/archives/1043?vkjqpy=dntpd3)  

- [SpEL表达式注入漏洞学习和回显poc研究](https://www.cnblogs.com/bitterz/p/15206255.html)  
