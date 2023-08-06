---
title: ARTS-week-26
date: 2020-07-05 11:41:44
tags:
---


## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm： 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

Maximal Square https://leetcode.com/submissions/detail/362290763/

### 2.Review:

https://posts.specterops.io/ready-to-hunt-first-show-me-your-data-a642c6b170d6
准备好狩猎了吗？先给我看下的数据

#### 点评：


作者 Roberto Rodriguez 提及通过威胁搜寻提升安全态势感知水平。但如果没有适当的数据质量，狩猎团队很难专注于任务，提高生产力并有效地进行搜寻。

什么是数据质量：关于数据质量的最常用定义是 《Juran’s Quality Handbook》 的作者约瑟夫·朱兰（Joseph M. Juran），他在998页中引用了“如果数据适合其在运营，决策和计划中的预期用途，则它们是高质量的。 ” 换句话说，如果狩猎活动所需的数据不满足狩猎团队定义的特定要求，那么该数据就不会被视为质量数据，因为它会影响其预期目的。

数据质量目标（狩猎角度）：
1. 减少猎人花费在修复和验证数据问题上的时间，从而提高了狩猎活动中的生产率。
2. 改善数据源之间的一致性，以更有效地处理数据，从而允许依赖于多种资源的更复杂的分析提供额外的上下文。
3. 增强自动化流程。

为什么必须关心数据质量：
- 来自不同数据源的数据字段名称不同（标准命名约定） 
- 数据源丢失的数据，而不是被解析/分离正确的CommandLine值不存在于几个端点和它们与空白或空值代替
- “消息”字段包含堆叠所需的额外信息，但不可用。
- 时间戳仅反映摄取时间，而不反映实际创建时间，并且数据仅在特定时间段内可用。
- 端点数据仅可从高价值目标获得，并且仅一周。

数据质量维度：
用于简化数据质量可测量特征的表示。根据数据的预期用途，在那里定义了几个有用的数据质量维度。参考“ DoD核心数据质量要求集”中的一些数据质量维度。这些数据质量（DQ）维度中的一些可以帮助对用于狩猎目的的数据中的差距进行分类。

总结：
数据质量创建度量标准需要如下步骤：
1.识别拥有的数据源
2.确定所需的数据源
3.映射所需要的内容
4.定义数据质量（DQ）维度
5.为数据质量维度定义评分系统
6.评估数据的质量

### 3.Tip:


使用 X-Frame-Options 防止被iframe 造成跨域iframe 提交挂掉

```shell
Refused to display 'http://www.***.com/login/doLogin.html' in a frame because it set 'X-Frame-Options' to 'SAMEORIGIN'. 
```

触发原因：页面的返回头被设置 X-Frame-Options SAMEORIGIN ，只能被同源的iframe 引用。跨域名的iframe 没法显示了。

解决办法：

1. 把 服务器上的 X-Frame-Options header 去掉

```java

protected override void OnResultExecuted(ResultExecutedContext filterContext) {
	filterContext.Httpcontext.Response.Headers.Remove("X-Frame-Options");
	filterContext.Httpcontext.Response.Headers.Add("X-Frame-Options", "ALLOWALL");
	base.OnResultExecuted(filterContext);
}

```

2. 添加 如下代码到 不想被iframe 的页面header 里去。

```html
<style id="antiClickjack">body{display:none !important;}</style>
<script>
if (self === top) {
var antiClickjack = document.getElementById("antiClickjack");
antiClickjack.parentNode.removeChild(antiClickjack);
} else {
top.location = self.location;
}
</script>
```

url 参数和 map 互转

```java
 /**
 * url 参数转 map
 * @param param aa=11&bb=22&cc=33
 * @return
 */
public static Map<String, Object> getUrlParams(String param) {
	Map<String, Object> map = new HashMap<String, Object>(0);
	if (StringUtils.isBlank(param)) {
		return map;
	}
	String[] params = param.split("&");
	for (int i = 0; i < params.length; i++) {
		String[] p = params[i].split("=");
		if (p.length == 2) {
			map.put(p[0], p[1]);
		}
	}
	return map;
}

/**
 * map 转 url 参数
 * @param map
 * @return
 */
public static String getUrlParamsByMap(Map<String, Object> map) {
	if (map == null) {
		return "";
	}
	StringBuffer sb = new StringBuffer();
	for (Map.Entry<String, Object> entry : map.entrySet()) {
		sb.append(entry.getKey() + "=" + entry.getValue());
		sb.append("&");
	}
	String s = sb.toString();
	if (s.endsWith("&")) {
		s = org.apache.commons.lang.StringUtils.substringBeforeLast(s, "&");
	}
	return s;
}
```

### 4.Share:

markdown、html 转义特殊字符代码大全
https://www.cnblogs.com/yifeiyu/p/11402743.html
字典 (dict) 的增删改查及其他方法
https://www.cnblogs.com/yifeiyu/p/11297054.html
像使用cmder一样，使用 WindowsTerminal
https://my.oschina.net/krysl/blog/3160464