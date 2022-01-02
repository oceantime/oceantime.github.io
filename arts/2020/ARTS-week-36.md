---
title: ARTS-week-36
date: 2020-05-17 20:39:03
tags:
---

## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm： 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

Unique Paths II https://leetcode.com/submissions/detail/340713979/

### 2.Review:

https://dev.to/lydiahallie/javascript-visualized-event-loop-3dif
JavaScript️可视化：事件循环

#### 点评：

Lydia Hallie 通过可视化例子演示了调用栈 (call stack)、任务队列 (callback queue)、事件循环 (event Loop)的工作机制。

总结：
1.调用栈：当调用一个函数时，它会被添加到一个叫做 调用栈 (call stack) 的地方，调用栈是 JS 引擎的一部分，而不是浏览器特有的。本质上它是一个栈，具有 后进先出 (Last In, First Out. 即 LIFO)的特点。当一个函数调用完成，它就被从调用栈中弹出。
2.任务队列：在 Web API 中，一个定时器已经创建，它将会等待 1000 ms，当时间到后，这个箭头函数并不会立即被调用栈执行，它会被添加到一个任务队列 (callback queue)。
3.事件循环：Event Loop 的唯一任务就是 连接任务队列和调用栈，它不停检查调用栈 中是否有任务需要执行，如果没有，就检查任务队列，从中弹出一个任务，放入调用栈中，如此往复循环。

### 3.Tip:

状态机实现字符串匹配。

1.标准状态机实现 

``` javascript
function match(string) {
	let state = start;
	for(let c of string) {
		console.log(c);
		state = state(c);
	}
	return state === end;
}

function start(c) {
	if(c === "a") {
		return foundA;
	} else {
		return start;
	}
}

function end(c) {
	return end;
}

function foundA(c) {
	if(c === "b") {
		return foundA2;
	} else {
		return start(c);
	}
}

function foundA2(c) {
	if(c === "a") {
		return foundB2;
	} else {
		return start(c);
	}
}

function foundB2(c) {
	if(c === "b") {
		return foundA3;
	} else {
		return start(c);
	}
}

function foundA3(c) {
	if(c === "a") {
		return foundB3;
	} else {
		return start(c);
	}
}

function foundB3(c) {
	if(c === "b") {
		return foundX;
	} else {
		return start(c);
	}
}

function foundX(c) {
	if(c === "x") {
		return end;
	} else {
		return foundA(c);
	}
}

console.log(match("I am ababx! hhha! abababx"));

```

2.自动生成状态机

``` JavaScript
//状态机数据结构
//{"0":start,"1":machines[1],"2":machines[2],...,"n":end}
let machines = {};

function match(patten, string) {
	
	//自动生成状态机
	for (var i = patten.length -1; i >= 0; i--) {
		let c = patten.charAt(i);
		// console.log(c);
		if(i == 0) {
			console.log(i);
			var tpl = "return c === '" + c + "' ? machines[" + (i + 1) + "]:machines[0]; ";
			machines[i] = new Function("c", tpl);
			// console.log(machines[i]);
		} else if(i == patten.length - 1) {
			console.log(i);
			var tpl = "return machines[" + i + "]; ";
			machines[i] = new Function("c", tpl);
			// console.log(machines[i]);
		} else {
			console.log(i);
			var tpl = "return c === '" + c + "' ? machines[" + (i + 1) + "]:machines[" + i + "]; ";
			machines[i] = new Function("c", tpl);
			// console.log(machines[i]);
		}
	}
	// console.log(machines);
	let state = machines[0];
	for(let c of string) {
		console.log(c);
		state = state(c);
		// console.log(state);
	}
	
	return state === machines[patten.length - 1];
}

console.log(match("abababx", "I am ababx! hhha! abababx"));
console.log(match("ababx", "I am ababx! hhha!"));

```

### 4.Share:

使用确定有限状态自动机解KMP算法
https://cgiirw.github.io/2018/04/22/KMP/
KMP算法和有限状态自动机
https://github.com/WGrape/Blog/issues/2
从有限状态机的角度去理解Knuth-Morris-Pratt Algorithm(又叫KMP算法)
https://www.cnblogs.com/courtier/p/4273193.html