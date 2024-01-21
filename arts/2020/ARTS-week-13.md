---
title: ARTS-week-13
date: 2020-04-05 20:34:14
tags:
---

## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm: 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

Walking Robot Simulation https://leetcode.com/submissions/detail/320155566/

### 2.Review:

https://medium.com/@gvanrossum_83706/building-a-peg-parser-d4869b5958fb

#### 点评：

Guido van Rossum 在本文中，通过展示一个简单的手写解析器，我为如何理解解析器的工作原理奠定了基础。

1.最常见的 PEG 解析方式是使用可以无限回溯的递归下降解析器。上周中的例子：

``` shell
statement: assignment | expr | if_statement
expr: expr '+' term | expr '-' term | term
term: term '*' atom | term '/' atom | atom
atom: NAME | NUMBER | '(' expr ')'
assignment: target '=' expr
target: NAME
if_statement: 'if' expr ':' statement
``` 

这种超级抽象的递归下降解析器将为每个符号定义一个函数，该函数会尝试调用与备选项相对应的函数。
例如，对于statement，有如下函数：

``` shell
def statement():
    if assignment():
        return True
   if expr():
        return True
    if if_statement():
        return True
    return False
```

 tokenizer，用于生成标记 token。以下简称为“标记器”）

2.PEG 解析器（像其它现代解析器，如 ANTLR）通常会把标记与解析过程统一。但是作者选择保留单独的标记器。
如何实现无限回溯呢？所以我的设计是按需标记，所用的列表是惰性列表。基础 API 非常简单。Tokenizer 对象封装了一个数组，存放标记及其位置信息。四个基本方法作为 Tokenizer 类的核心代码：

``` python
class Tokenizer:
    def __init__(self, tokengen):
        """Call with tokenize.generate_tokens(...)."""
        self.tokengen = tokengen
        self.tokens = []
        self.pos = 0
    def mark(self): # 返回数组的当前索引
        return self.pos
    def reset(self, pos): # 设置数组的索引（参数必须从 mark() 方法中得到）
        self.pos = pos
    def get_token(self): # 返回下一个标记，并推进数组的索引（如果到了数组末尾，则从源码中读取另一个标记）
        token = self.peek_token()
        self.pos += 1
        return token
    def peek_token(self): # 它返回下一个标记且不推进索引
        if self.pos == len(self.tokens):
            self.tokens.append(next(self.tokengen))
        return self.tokens[self.pos]
```

构建解析器创建一个 AST，让每个解析方法在成功时返回 Node 对象，在失败时返回 None 。

``` python
class Node:
    def __init__(self, type, children):
        self.type = type # type 表示了该 AST 节点是什么类型（例如是个“add”节点或者“if”节点）
        self.children = children # children 表示了一些节点和标记（TokenInfo 类的实例）
```

Parser 类的基础结构

``` python
class Parser:
    def __init__(self, tokenizer):
        self.tokenizer = tokenizer
    def mark(self): # 为了支持回溯，封装了标记器的 mark() 和 reset() 方法（不改变 API）
        return self.tokenizer.mark()
    def reset(self, pos):
        self.tokenizer.reset(pos)
    def expect(self, arg): # expect() 方法在成功时会返回一个 TokenInfo 对象，在失败时返回 None
        token = self.tokenizer.peek_token()
        if token.type == arg or token.string == arg:
            return self.tokenizer.get_token()
        return None
```

总结：
1.语法规则相当于解析器方法，当一条语法规则引用另一条语法规则时，它的解析方法会调用另一条规则的解析方法
2.当多个条目构成备选项时，解析方法会一个接一个地调用相应的方法
3.当一条语法规则引用一个标记时，其解析方法会调用 expect()
4.当一个解析方法在给定的输入位置成功地识别了它的语法规则时，它返回相应的 AST 节点；当识别失败时，它返回 None
5.一个解析方法在消费（consum）一个或多个标记（直接或间接地，通过调用另一个成功的解析方法）后放弃解析时，必须显式地重置标记器的位置。这适用于放弃一个备选项而尝试下一个，也适用于完全地放弃解析

### 3.Tip:

logstash-clickhouse 插件安装

``` shell
1.在线安装
bin/logstash-plugin install logstash-output-clickhouse

2.本地编译插件安装
$ yum install ruby
$ git clone https://github.com/mikechris/logstash-output-clickhouse.git
$ cd logstash-output-clickhouse
$ gem build logstash-output-clickhouse.gemspec
$ LOGSTASH_HOME/bin/plugin install logstash-output-clickhouse-0.1.0.gem

3.logstash output 配置
output {
    #stdout { codec => json }
    #stdout { codec => json_lines }
    clickhouse {
        http_hosts => ["http://127.0.0.1:8123/"]
        table => "default.table"
        request_tolerance => 1
        #flush_size => 1000
        #pool_max => 1000
        mutations => {
            id => id
            reg_time => reg_time
        }
    }
}
```

java 中Gson 转换long到科学计数法的解决方法

``` java
1. Gson工具类
public class GsonUtils {
  /**
   * 解决gson解析long自动转为科学计数的问题
   */
  public static Gson getMapGson() {
    Gson gson = new GsonBuilder().registerTypeAdapter(Map.class, new JsonDeserializer<Map>() {
      public Map deserialize(JsonElement json, Type typeOfT, JsonDeserializationContext context)
              throws JsonParseException {
        HashMap<String, Object> resultMap = new HashMap<>();
        JsonObject jsonObject = json.getAsJsonObject();
        Set<Map.Entry<String, JsonElement>> entrySet = jsonObject.entrySet();
        for (Map.Entry<String, JsonElement> entry : entrySet) {
            resultMap.put(entry.getKey(), entry.getValue());
        }
        return resultMap;
      }
    }).setLongSerializationPolicy(LongSerializationPolicy.STRING).create();
    return gson;
  }
}


2.调用 Gson
/**
 * 把json字符串解析成为map
 *
 * @param json
 * @return HashMap<String, Object>
 */
public static HashMap<String, Object> parseJsonToMap(String json) {
    Gson gson = GsonUtils.getMapGson();
    Type type = new TypeToken<HashMap<String, Object>>() {}.getType();
    HashMap<String, Object> map = null;
    try {
        map = gson.fromJson(json, type);
    } catch (Exception e) {
        LKLogUtil.e(e.getMessage(), e);
    }
    return map;
}

```

### 4.Share:

安装 Ruby
http://www.ruby-lang.org/zh_cn/documentation/installation/#yum

位运算实现加、减、乘、除运算
https://www.jianshu.com/p/7bba031b11e7