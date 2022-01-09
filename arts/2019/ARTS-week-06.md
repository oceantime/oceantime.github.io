---
title: ARTS-week-6
date: 2019-10-08 22:18:03
tags:
---

## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm： 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

ZigZag Conversion：https://leetcode.com/submissions/detail/267324038/

### 2.Review:

https://qiita.com/kazuki43zoo/items/e12a72d4ac4de418ee37
Spring MVC(Spring Boot)中的静态资源处理

#### 点评：
文章介绍了spring mvc获取静态资源的webjar解决方案

##### 要点:
1.Servlet 3 允许直接访问 WEB-INF/lib 下 jar 中的 /META-INF/resources 目录下的资源
2.Spring MVC 中 Dispatcher Servlet 直接可以访问到静态资源，资源的查找，处理使用的是责任链设计模式（Filter Chain）
通过配置添加一个 PathResourceResolver，来访问1中的资源。

##### 特性：
1.为静态资源添加版本号，指定版本号或MD5版本号进行版本控制，如果过找不到版本号去除版本号再次查找。
2.为降低传说的数据量，可以对资源进行压缩，并通过配置在请求头中的 Content-Encoding 包含 gzip。
3.Spring MVC 会对资源进行较多的处理。如果过没一次请求都做这些处理，会降低服务器的性能。为避免这种情况，可以添加 CachingResourceResolver 来解决这种问题。
4.省略 webjar 版本，添加 webjars-locator 依赖，在 Spring MVC 中添加 WebJarsResourceResolvers。
5.修改资源内容：
AppCacheMainfestTransformer 帮助处理 HTML5 离线应用的 AppCache 清单内的文件
CachingResourceTransformer 缓存其他 transfomer 的结果，作用同 CachingResourceResolver
CssLinkResourceTransformer 处理 css 文件中的链接，为其加上版本号
ResourceTransformerSupport 抽象类，自定义 transfomer 时继承
6.Http 缓存： 避免客户端重复获取资源， HTTP/1.1 规范中定义了 Cache-Control 头，基本所有浏览器都实现支持 Cache-Control

### 3.Tip:

五种不同的 URL 参数解析方法及性能比较

1.httpclient org.apache.http.client.utils.URLEncodedUtils

``` java

URLEncodedUtils.parse(query, Charset.forName("UTF-8"));

```

2.jettyUtil org.eclipse.jetty.util.UrlEncoded

``` java

MultiMap<String> values = new MultiMap<String>();  
UrlEncoded.decodeTo(query, values, "UTF-8", 1000);

```

3.tomcat org.apache.catalina.util.RequestUtil

``` java

Map<String, String> values = new HashMap<String, String>();  
RequestUtil.parseParameters(values, query, "UTF-8");

```

4.regex 正则表达式

``` java

String u = URLDecoder.decode(url, "UTF-8");  
for (String s : parameters) {  
    Pattern p = Pattern.compile(s + "=([^&]*)(&|$)");  
    Matcher m = p.matcher(u);  
    if (m.find()) {  
        m.group(1);  
    }  
}

```

5.split 使用String 的 split 方法对 URL 进行分割，然后用 equals 匹配对应的 参数

``` java

String u = URLDecoder.decode(url, "UTF-8");  
for (String s : parameters) {  
    String[] a = new String[100];   
    if (u.indexOf(s) != -1) {  
        a = (u.substring(u.indexOf(s))).split("&");  
        a[0].split("=");  
    }  
}

```

测试：用这五种方法分别解析同一个URL 100000遍，得到如下的数据。考虑到 Java 的代 码缓存特性，共运行4遍这样的测试，测试数据取最后一次的结果。

``` bash
---1---
httpclient: 3063
jettyUtil: 1767
tomcat: 2405
regex: 9226
split: 22905
---2---
httpclient: 2766
jettyUtil: 1618
tomcat: 2229
regex: 9025
split: 23661
---3---
httpclient: 2799
jettyUtil: 1632
tomcat: 2251
regex: 8761
split: 23476
---4---
httpclient: 2989
jettyUtil: 1634
tomcat: 2251
regex: 8895
split: 23571 
```

总结：在最后一组数据中，可以看到 jettyUtil 的性能最高，split 和 regex 的方法性 能较差。
应尽可能的考虑使用 jettyUtil 来解析。

### 4.Share:

ELK百亿实时查询优化(https://mp.weixin.qq.com/s/UV6NoI6-Y3Zh4BR-m5jP8w)