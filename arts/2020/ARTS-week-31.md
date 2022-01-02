---
title: ARTS-week-31
date: 2020-04-12 15:39:00
tags:
---

## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm： 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

Find Minimum in Rotated Sorted Array https://leetcode.com/submissions/detail/323554474/

### 2.Review:

https://medium.com/@gvanrossum_83706/generating-a-peg-parser-520057d642a9

#### 点评：

Guido van Rossum 在本文中，制作了一个原始的元编译器并通过 @memoize 装饰器演示 packrat parsing 原理。

1.上周中的例子：

``` shell
statement: assignment | expr | if_statement
expr: expr '+' term | expr '-' term | term
term: term '*' atom | term '/' atom | atom
atom: NAME | NUMBER | '(' expr ')'
assignment: target '=' expr
target: NAME
if_statement: 'if' expr ':' statement
``` 

2.元语法,元编译器是一种编译器，其输入是一套语法，而输出是一个解析器:

``` shell
grammar: rule+ ENDMARKER
rule: NAME ':' alternative ('|' alternative)* NEWLINE
alternative: item+
item: NAME | STRING
```


3.有个简单地表示元语法的方法，主要是使用内置的数据类型：一条规则的右侧只是由一系列的条目组成的列表，且这些条目只能是字符串。（Hack：通过检查第一个字符是否为引号，我们可以区分出NAME和STRING）至于规则，我用了一个简单的 Rule 类，所以整个语法就是一些 Rule 对象。：

``` python
class Rule:
    def __init__(self, name, alts):
        self.name = name
        self.alts = alts
```

调用它的是这个GrammarParser类（关于基类Parser ，请参阅我之前的帖子）：

``` python
class GrammarParser(Parser):
    def grammar(self):
        pos = self.mark()
        if rule := self.rule():
            rules = [rule]
            while rule := self.rule():
                rules.append(rule)
            if self.expect(ENDMARKER):
                return rules    # <------------- final result
        self.reset(pos)
        return None
    def rule(self):
        pos = self.mark()
        if name := self.expect(NAME):
            if self.expect(":"):
                if alt := self.alternative():
                    alts = [alt]
                    apos = self.mark()
                    while (self.expect("|")
                           and (alt := self.alternative())):
                        alts.append(alt)
                        apos = self.mark()
                    self.reset(apos)
                    if self.expect(NEWLINE):
                        return Rule(name.string, alts)
        self.reset(pos)
        return None
    def alternative(self):
        items = []
        while item := self.item():
            items.append(item)
        return items
    def item(self):
        if name := self.expect(NAME):
            return name.string
        if string := self.expect(STRING):
            return string.string
        return None
```

4.用以上代码解析上周的语法的文件上，则 grammar() 方法会返回以下的由 Rule 对象组成的列表：

``` python
[
  Rule('statement', [['assignment'], ['expr'], ['if_statement']]),
  Rule('expr', [['term', "'+'", 'expr'],
                ['term', "'-'", 'term'],
                ['term']]),
  Rule('term', [['atom', "'*'", 'term'],
                ['atom', "'/'", 'atom'],
                ['atom']]),
  Rule('atom', [['NAME'], ['NUMBER'], ["'('", 'expr', "')'"]]),
  Rule('assignment', [['target', "'='", 'expr']]),
  Rule('target', [['NAME']]),
  Rule('if_statement', [["'if'", 'expr', "':'", 'statement']]),
]
```

5.把以上聚合起来，就形成一个基本的元编译器：

``` python
def generate_parser_class(rules):
    print(f"class ToyParser(Parser):")
    for rule in rules:
        print()
        print(f"    @memoize")
        print(f"    def {rule.name}(self):")
        print(f"        pos = self.mark()")
        for alt in rule.alts:
            items = []
            print(f"        if (True")
            for item in alt:
                if item[0] in ('"', "'"):
                    print(f"            and self.expect({item})")
                else:
                    var = item.lower()
                    if var in items:
                        var += str(len(items))
                    items.append(var)
                    if item.isupper():
                        print("            " +
                              f"and ({var} := self.expect({item}))")
                    else:
                        print(f"            " +
                              f"and ({var} := self.{item}())")
            print(f"        ):")
            print(f"            " +
              f"return Node({rule.name!r}, [{', '.join(items)}])")
            print(f"        self.reset(pos)")
        print(f"        return None")
```

6.注意@memoize 装饰器：我“偷运”（smuggle）它进来，以便转向另一个主题：使用记忆法（memoization）来加速生成的解析器。包装器会缓存每次调用解析方法后的结果——这就是为什么它会被称为“口袋老鼠解析”（packrat parsing）！这是实现该装饰器的 memoize() 函数：

``` python
def memoize(func):
    def memoize_wrapper(self, *args):
        pos = self.mark()
        memo = self.memos.get(pos)
        if memo is None:
            memo = self.memos[pos] = {}
        key = (func, args)
        if key in memo:
            res, endpos = memo[key]
            self.reset(endpos)
        else:
            res = func(self, *args)
            endpos = self.mark()
            memo[key] = res, endpos
        return res
return memoize_wrapper
```

总结：
1.以上缓存是一个字典，元素是存储在 Parser 实例上的那些字典。外部字典的 key 是输入的位置；我将 self.memos = {} 添加到 Parser.__init__() ，以初始化它。内部字典按需添加，它们的 key 由方法及其参数组成。（在当前的设计中没有参数，但我们应该记得 expect()，它恰好有一个参数，而且给它新增通用性，几乎不需要成本。）
2.一个解析方法的结果被表示成一个元组，因为它正好有两个结果：一个显式的返回值（对于我们生成的解析器，它是一个 Node，表示所匹配的规则），以及我们从 self.mark() 中获得的一个新的输入位置。
3.在调用解析方法后，我们会在内部的记忆字典中同时存储它的返回值（res）以及新的输入位置（endpos）。
4.再次调用相同的解析方法时（在相同的位置，使用相同的参数），我们会从缓存中取出那两个结果，并用 self.reset() 来向前移动输入位置，最后返回那缓存中的返回值。
5.缓存负数的结果也很重要——实际上大多数对解析方法的调用都是负数的结果。在此情况下，返回值为 None，而输入位置不会变。你可以加一个assert 断言来检查它。

### 3.Tip:

query-string 解析 URL

1. querystring.parse(str[, sep[, eq[, options]]]):
str <string> 要解析的 URL 查询字符串。
sep <string> 用于在查询字符串中分隔键值对的子字符串。默认值: '&'。
eq <string> 用于在查询字符串中分隔键和值的子字符串。默认值: '='。
options: <Object>
decodeURIComponent <Function> 当解码查询字符串中的百分比编码字符时使用的函数。默认值: querystring.unescape()。
maxKeys <number> 指定要解析的键的最大数量。指定 0 可移除键的计数限制。默认值: 1000。
querystring.parse() 方法将 URL 查询字符串 str 解析为键值对的集合。

``` javascript
import qs from 'query-string';
 
location.search  // ?name=jim
location.hash  // #token=123
qs.parse('?name=jim')  // {name: 'jim'}
qs.parse('#token=123')  // {token: '123'}

//默认情况下，字符将会被解码为 UTF-8。 如果需要其他的编码，则需要指定其他的 encodeURIComponent 选项：
qs.parse('name=jim&name=lily&age=22', null, null, { decodeURIComponent: gbkDecodeURIComponent })  // {name: ['jim', 'lily'], age: 22}
```

2. qs.stringify(object, [options])
obj <Object> 要序列化为 URL 查询字符串的对象。
sep <string> 用于在查询字符串中分隔键值对的子字符串。默认值: '&'。
eq <string> 用于在查询字符串中分隔键和值的子字符串。默认值: '='。
options:
encodeURIComponent <Function> 当将查询字符串中不安全的 URL 字符转换为百分比编码时使用的函数。默认值: querystring.escape()。
querystring.stringify() 方法通过遍历对象的自身属性从给定的 obj 生成 URL 查询字符串。
它会序列化传入的 obj 中以下类型的值：<string> | <number> | <boolean> | <string[]> | <number[]> | <boolean[]>。 任何其他的输入值都将会被强制转换为空字符串。


``` javascript
import qs from 'query-string';
 
qs.stringify({name: 'jim', age: 22});  // 'age=22&name=jim'
qs.stringify({name: ['jim', 'lily'], age: 22});  // 'age=22&name=jim&name=lily'

//默认情况下，字符将会被编码为 UTF-8。 如果需要其他的编码，则需要指定其他的 encodeURIComponent 选项：
querystring.stringify({ w: '中文', foo: 'bar' }, null, null,
                      { encodeURIComponent: gbkEncodeURIComponent });
```

3. qs.parseUrl(string, [options])

``` javascript
qs.parseUrl('http://www.baidu.com?name=jim');
// {url: 'http://www.baidu.com', query: {name: 'jim'}}
```

用 a 标签解析 url

``` javascript
function parseUrl(url) {
    let a = document.createElement('a');
    a.href = url;
    return {
        host: a.hostname,
        port: a.port,
        query: a.search,
        hash: a.hash.replace('#', ''),
        params: (() => {
            let searchArr = a.search.replace(/^\?/, '').split('&');
            let params = {};
            searchArr.forEach(item => {
                let [key, value] = item.split('=');
                params[key] = value;
            });
            return params;
        })()
    }
}
```

### 4.Share:

一致性Hash算法
https://www.xuxueli.com/blog/?blog=./notebook/6-%E7%AE%97%E6%B3%95/%E4%B8%80%E8%87%B4%E6%80%A7Hash%E7%AE%97%E6%B3%95.md

前端打包构建工具Gulp、Rollup、Webpack、Webpack-stream
https://my.oschina.net/tongjh/blog/837663
