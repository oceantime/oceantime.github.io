---
title: ARTS-week-17
date: 2020-05-03 21:35:24
tags:
---

## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm： 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

Sqrt(x) https://leetcode.com/submissions/detail/333791217/

### 2.Review:

https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/

#### 点评：

Philip Roberts 在 2015 年文章中讨论的事件循环如何处理宏任务 Tasks 与微任务 MicroTasks 。

宏任务（Tasks）#
Tasks 被放到任务源中，这样浏览器就可以从内部进入 JavaScript/DOM 领域，并确保这些操作按顺序进行。在 Tasks 执行期间，浏览器可能更新渲染。从鼠标点击到事件回调需要调度一个任务，解析超文本标记语言也是如此。

宏任务（MicroTasks）#
MicroTasks 通常是当前脚本执行完后要立即执行的内容，比如对一批操作做出响应，或者做一些异步处理。在每一个宏任务的最后，只要执行栈中没有需要执行的 Javascript ，就会在回调结束后处理微任务队列。

如何辨别宏任务和微任务#
1.查看相对于promise和setTimeout如何打印，尽管这取决于实现是否正确。
2.查看规范： 
将一个任务加入队列： [step 14 of setTimeout](https://link.zhihu.com/?target=https%3A//html.spec.whatwg.org/multipage/webappapis.html%23timer-initialisation-steps)
将 microtask 加入队列：[step 5 of queuing a mutation record](https://link.zhihu.com/?target=https%3A//dom.spec.whatwg.org/%23queue-a-mutation-record)
ECMAScript 将微任务称为作业： 调用 EnqueueJob 将一个 微任务加入队列：[step 8.a of PerformPromiseThen](https://link.zhihu.com/?target=http%3A//www.ecma-international.org/ecma-262/6.0/%23sec-performpromisethen)

总结：
1.任务按顺序执行，浏览器可以在它们之间进行渲染。
2.微任务按顺序执行，并执行。
3.在每个回调之后，只要没有其它代码正在运行。
4.在每个任务的末尾。

### 3.Tip:

十进制数字和二进制数字动态转换可视化

``` html

<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<title>Vue Demo</title>
	<script type="text/javascript" src="./vue.js"></script>
	<style>
		input::-webkit-outer-spin-button,
		input::-webkit-inner-spin-button {
			-webkit-appearance: none;
		}
		.container input[type='number'] {
			-moz-appearance: textfield;
		}
		span {
			padding: 0;
			margin: 0;
		}
		input {
			width: 1em;
			height: 2em;
			text-align: center;
		}
		.sign {
			background-color: lightblue;
		}
		.exponent {
			background-color: orange;
		}
	</style>
</head>

<body>
	<div id="root">
	  	<span v-for="v, i of bits">
	    	<input :class="i > 0 ? i > 11 ? 'fraction' :'exponent':'sign' "  type="number" min=0 max=1 v-model="bits[i]"/>
	    	<input v-if="i == 31" />
	    	<br v-if="i == 31" />
	  	</span>
	  	<br />
	  	<input style="width:5em;" v-model="value"/>
  	</div>
	<script type="text/javascript">
		window.vm = new Vue({
			el: "#root",
			data: {
				bits: Array(65).join(0).split("").map(v => Number(v)),
				value: 0
			},
			watch: {
				bits(val) {
					console.log("bits", val)
					const bytes = new Uint8Array(8);
					const memory = new Float64Array(bytes.buffer);
					for (var i = 0; i < 8; i++) {
						var byte = 0;
						for (var j = 0; j < 8; j++) {
							byte = byte << 1;
							byte != Number(val[i * 8 + j]);
							console.log(byte, val[i * 8 + j]);
						}
						console.log("byte", byte);
						bytes[7 - i] = byte;
					}
					this.value = memory[0];
				},
				value(val) {
					const bytes = new Uint8Array(8);
					const memory = new Float64Array(bytes.buffer);
					memory[0] = (val);
					console.log("******");
					for (var i = 0; i < 8; i++) {
						var byte = bytes[i];
						console.log(byte);
						for (var j = 0; j < 8; j++) {
							this.bits[(8 - i) * 8 - j - 1] = byte & 1;
							byte = byte >> 1;
						}
					}
				}
			}
		})
	</script>
</body>

</html>

```

### 4.Share:

HTML字符实体（Character Entities），转义字符串（Escape Sequence）
http://114.xixik.com/character/
