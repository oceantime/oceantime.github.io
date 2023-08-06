---
title: ARTS-week-16
date: 2020-04-24 21:30:50
tags:
---

## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm： 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

Valid Perfect Square https://leetcode.com/submissions/detail/329455512/

### 2.Review:

http://www.brandonsmith.ninja/blog/three-types-of-data

#### 点评：

作者在软件中建立三种不同类型的数据：常量、状态和缓存。所谓“数据”，是指“代码中的变量”，但同样的原则也适用于磁盘上的文件、数据库中的表或其他任何东西。
这三个类别是不相交的：即，如果一个数据属于其中一个类别，也不应将其视为其他类别之一。不同的语言通过类型系统或其他方式表达这种约束的能力会有所不同，因此最好将其视为一种约定或一种思维方式（尽管如果能够实际执行它，那当然会更好）。

常量#
常数是在程序运行过程中不变的信息。它也可以采用配置文件或命令行参数的形式。常数可以在开发过程中更改，但不能在运行时更改。

状态#
状态是在程序运行态中自然变化的信息。这通常由可变值组成。它还可以由不可变的数据结构组成，其明确目的是允许拥有不可变的状态（在这些结构中，新的状态是从前一个状态派生的，并与一些新信息结合在一起）。即使是Haskell等语言中基于monad的I/O也属于这一类。

缓存#
缓存是直接从常量和/或状态派生的信息。缓存值类似于常量，但实际上可能会使用与状态相同的语言功能，因为在顶层，它可以也将更改（否则将是常量！）。

总结：
常数既不可替换也不可变
状态是任意可替换和可变的
缓存值在特定情况下是可替换的，但不可更改

### 3.Tip:

1.字符串和各个进制数字互转

``` javascript
function convertStringToNumber(string, x){
	if(arguments.length < 2) {
		x = 10;
	}

	var chars = string.split('');
	var number = 0;

	var i = 0;
	while(i < chars.length && chars[i] != '.') {
		number = number * x;
		number += chars[i].codePointAt(0) - '0'.codePointAt(0);
		i++;
	}
	if(chars[i] == '.') {
		i++;
	}
	var fraction = 0;
	while(i < chars.length) {
		fraction = fraction / x;
		fraction += chars[i].codePointAt(0) - '0'.codePointAt(0);
		i++;
	}
	fraction = fraction / x;
	return number + fraction;
}
convertStringToNumber("10.01");

function convertNumberToString(number, x) {
	var integer = Math.floor(number);
	var fraction = number - integer;
	var string = '';
	while(integer > 0) {
		string = String(integer % x) + string;
		integer = Math.floor(integer / x); 
	}
	console.log(fraction);
	var string1 = '';
	while(fraction > 0) {
		string1 = String(fraction % x) + string1;
		fraction = Math.floor(fraction / x); 
	}
	return string + "." + string1;
}
convertNumberToString(100, 10)

```

2.各个进制数字之间互转

``` javascript
/**
* number  数字
* oriented  原进制
* target  目标进制
* orilist  原数进制字符表
* targetlist  目标进制字符表
*/
function convertNumberToNumber(number, oriented, target, orilist, targetlist) {
	var jslist = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
		tnum = [], m, negative = ((number += '').trim()[0] == '-'), decnum = 0;
	orilist || (orilist = jslist);
	targetlist || (targetlist = jslist);
	if (negative) number = number.slice(1);
	for (var i = number.length; i--;)
		decnum += orilist.indexOf(number[i]) * Math.pow(oriented, number.length - i - 1);
	for (; decnum != 0; tnum.unshift(targetlist[m])) {
		m = decnum % target;
		decnum = Math.floor(decnum / target);
	}
	decnum && tnum.unshift(targetlist[decnum]);

	var aNew;
	var re = /([0-9]+\.[0-9]{2})[0-9]*/;
	aNew = number.replace(re,"$1");
	alert(Math.round(number*100)/100);

	return (negative ? '-' : '') + tnum.join('');
}

convertNumberToNumber(22.123456,10,10)            //"10011010010"
convertNumberToNumber(15,10,16)            //"f"
convertNumberToNumber('ABC',16,10)        //"9846"
 
convertNumberToNumber(3245670,10,10,null,'零一二三四五六七八九')        //"三二四五六七零"
convertNumberToNumber('①②③',10,2,'〇①②③④⑤⑥⑦⑧⑨')                    //"1111011"

```

### 4.Share:

运算符优先级： 
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence

