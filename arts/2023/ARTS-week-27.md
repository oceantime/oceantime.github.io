---
> **ARTS-week-27**
> 2023-07-01 10:36
---


## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm： 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

- [1253. 重构 2 行二进制矩阵](https://leetcode.cn/submissions/detail/442867710/)  
    + 思路：贪心
- [1186. 删除一次得到子数组最大和](https://leetcode.cn/submissions/detail/442390480/)  
    + 思路：DP
- [1599. 经营摩天轮的最大利润](https://leetcode.cn/submissions/detail/441432568/)  
    + 思路：模拟

### 2.Review:

[Web 组件 - 什么和为什么？](https://underthehood.meltwater.com/blog/2019/12/18/web-components-what-and-why/)

在2019年，我们的应用程序框架团队和前端公会在一个可重用的前端组件库上做了很多工作。在这篇文章中，前端公会的成员Andy Desmarais分享了Web组件的内容和原因的介绍。

#### 1、它们是什么？

```
Web 组件是一组 Web 平台 API，允许创建新的自定义、可重用、封装的 HTML 标记，以便在网页和 Web 应用程序中使用 webcomponents.org。
```

这是一种冗长的说法，“无需框架即可创建组件的能力”。

有三个主要部分组合在一起可以创建一个WebComponent：

- 自定义元素
- 虚拟DOM
- 模板

##### 自定义元素

自定义元素是我们创建新的 DOM 元素的方式。第一个要求是扩展 HTMLElement 类的 ES6 类。

```
class HelloWorld extends HTMLElement {}
```

然后我们需要告诉 DOM 这个新的元素类。这是使用 window.customElements 注册表上的 define 方法完成的。

```
window.customElements.define('hello-word', HelloWorld)
```

在上面的代码段中，第一个参数是 DOM 中使用的标记名称。要求标签名称中包含“-”。这是为了将自定义元素与 DOM 本机元素区分开来。第二个参数是扩展 HTML 的类。

一旦你定义了那个类，你可以简单地把那个标签放在 DOM 中，它就会工作！

```
<hello-world></hello-world>
```

##### 虚拟 DOM
虚拟 DOM 为我们提供了元素和样式的封装。它提供了一个不受文档样式影响的沙盒。这使我们能够以非常简单的方式设置元素样式，而不必在 CSS 上使用 BEM（块元素修饰符）等技巧来避免冲突。

将虚拟 DOM 附加到自定义元素非常简单。调用 attachShadow 方法，该元素将获得一个新属性：shadowRoot。

```
class HelloWorld extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
}
```

虚拟 DOM 有两种模式。

- 打开
这允许使用 javascript API 从主文档访问新创建的虚拟根。
shadowRoot 属性将填充在 DOM 节点上。
- 关闭
shadowRoot 属性将返回 null。
这是一个高级用例，除非深入了解虚拟 DOM 的细微差别，否则应避免使用。

##### 模板

\<template\> 元素是 DOM 中唯一不会立即呈现的元素。这意味着我们可以存储我们打算在未来使用的 HTML，而无需支付渲染该标记的成本！使用 \<script\> 标签来保存 JavaScript 模板的日子已经一去不复返了！

此标签使我们能够快速克隆 HTML 以填充自定义元素的新副本。

这是在实践中的样子：

```javascript
const helloWorldTemplate = document.createElement('template');
helloWorldTemplate.innerHTML = `<h1>Hello World!</h1>`;
document.appendChild(helloWorldTemplate);

class HelloWorld extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const templateCopy = document.importNode(helloWorldTemplate, true);
        this.shadowRoot.appendChild(templateCopy);
    }
}
```

document.importNode 方法允许我们获取模板中节点的克隆版本。导入节点的第二个参数是浅标志与深标志。
  - true将生成节点树中所有节点的深层克隆。
  - false将仅克隆外部节点的根级别。不克隆任何子节点！

#### 2、我为什么关心？（警告：未来意见）

Web 组件被构建为通用的。跨所有框架，所有现代浏览器（甚至带有polyfill的IE11）的工作，并且不会受到框架的不断流失的影响。

##### 相对于框架的优势
这只是JavaScript！如果你不需要IE11兼容性，你可以再次编写本机JS，而不需要任何东西。这让人想起了Web的早期，在启动网站需要大规模的构建管道之前。

它很稳定。Web组件的API不会随着Chrome，Firefox或Safari的下一个版本而改变。API 的稳定性意味着更新代码所花费的时间更少，只是为了维护当前功能。

##### 浏览器原生意味着什么

当一项新功能作为标准引入浏览器时，它不会很快被删除。当我们编写新代码时，这一点非常重要，因为这意味着我们不会编写在短时间内过时的代码。此外，我们不必处理以迫使我们重构现有代码以维护功能的速度发生的 API 更改。

浏览器不能只是更改或删除功能，因为它们可能会“破坏网络”。

### 3.Tip:

#### Java 中 List.of() 和 Arrays.asList() 区别，以及原因

1.Arrays.asList() 可以插入 null，而 List.of() 不可以

```java
import java.util.List;
import java.util.Arrays;
 
class Solution {
    public static void main(String[] args) {
        List<Integer> ls1 = Arrays.asList(1, 2, null);
        //List<Integer> ls2 = List.of(1,2,null);
        System.out.println(ls1);
        //System.out.println(ls2);
    }
}
 
/*结果
[1, 2, null]
*/

import java.util.List;
import java.util.Arrays;
 
class Solution {
    public static void main(String[] args) {
        //List<Integer> ls1 = Arrays.asList(1, 2, null);
        List<Integer> ls2 = List.of(1,2,null);
        //System.out.println(ls1);
        System.out.println(ls2);
    }
}
 
/*结果
Exception in thread "main" java.lang.NullPointerException.....
*/
```

2.用 List.of 的 List 自然是不包含null，而用 Arrays.asList 的 List 包含 null。上图结果也可得知。

```java
import java.util.List;
import java.util.Arrays;
 
class Solution {
    public static void main(String[] args) {
        List<Integer> ls1 = Arrays.asList(1, 2, null);
        //List<Integer> ls2 = List.of(1,2);
        System.out.println(ls1.contains(null));
        //System.out.println(ls2.contains(null));
    }
}
 
/*结果
true
*/

import java.util.List;
import java.util.Arrays;
 
class Solution {
    public static void main(String[] args) {
        //List<Integer> ls1 = Arrays.asList(1, 2, null);
        List<Integer> ls2 = List.of(1,2);
        //System.out.println(ls1.contains(null));
        System.out.println(ls2.contains(null));
    }
}
 
/*结果
Exception in thread "main" java.lang.NullPointerException.....
*/
```

3.List.of 生成的 List 不能修改，Arrays.asList 生成的 List能修改。

```java
import java.util.List;
import java.util.Arrays;
 
class Solution {
    public static void main(String[] args) {
        List<Integer> ls1 = Arrays.asList(1, 2, null);
        //List<Integer> ls2 = List.of(1,2);
        ls1.set(0,5);
        //ls2.set(0,5);
        System.out.println(ls1);
        //System.out.println(ls2);
    }
}
 
/*结果
[5, 2, null]
*/

import java.util.List;
import java.util.Arrays;
 
class Solution {
    public static void main(String[] args) {
        //List<Integer> ls1 = Arrays.asList(1, 2, null);
        List<Integer> ls2 = List.of(1,2);
        //ls1.set(0,5);
        ls2.set(0,5);
        //System.out.println(ls1);
        System.out.println(ls2);
    }
}
 
 
/*结果
Exception in thread "main" java.lang.UnsupportedOperationExceptio.....
*/
```

4.关于数组修改对 List 的影响。数组修改对 Arrays.asList 生成的 List 有影响，对 List.of 生成的 List 无影响
```java
import java.util.List;
import java.util.Arrays;
 
class Solution {
    public static void main(String[] args) {
        Integer[] a = new Integer[]{1,2,3,4};
        // 不能用int[]，会导致转型错误，错误: 不兼容的类型: 推论变量 T 具有不兼容的上限
        List<Integer> ls1 = Arrays.asList(a);
        //List<Integer> ls2 = List.of(a);
        System.out.println(ls1);
        //System.out.println(ls2);
        a[0] = 5;
        //ls2.set(0,5);
        System.out.println(ls1);
        //System.out.println(ls2);
    }
}
 
 
/*结果
[1, 2, 3, 4]
[5, 2, 3, 4]
*/

import java.util.List;
import java.util.Arrays;
 
class Solution {
    public static void main(String[] args) {
        Integer[] a = new Integer[]{1,2,3,4};
        //List<Integer> ls1 = Arrays.asList(a);
        List<Integer> ls2 = List.of(a);
        //System.out.println(ls1);
        System.out.println(ls2);
        a[0] = 5;
        //ls2.set(0,5);
        //System.out.println(ls1);
        System.out.println(ls2);
    }
}
 
 
/*结果
[1, 2, 3, 4]
[1, 2, 3, 4]
*/
```

原因

关于 List.of 为什么不能插入 null，和修改了原数组不影响到 List.of 生成的 List。先看看 List.of 有关的源码

```java
    @SafeVarargs
    @SuppressWarnings("varargs")
    public static <T> List<T> asList(T... a) {
        return new ArrayList<>(a);
    }
 
//----------------------------------------------------------------------------------------
 
    ArrayList(E[] array) {
            a = Objects.requireNonNull(array);
        }
 
//----------------------------------------------------------------------------------------
 
 
    public static <T> T requireNonNull(T obj) {
        if (obj == null)
            throw new NullPointerException();
        return obj;
    }
```

由源码可知，底层的数组就是传入的数组，所以对原数组的修改会影响到用Arrays.asList方法生成的List。而且Objects.requireNonNull(array)检查的是整个数组是不是null，而非对每个元素进行检查是否为null。所以用Arrays.asList方法可以插入空值。也没有规定是final的，所以支持修改。

### 4.Share:

[logback - 自定义日志脱敏组件，一种不错的脱敏方案](https://blog.csdn.net/qq_40885085/article/details/113385261)

[Android日志开发实践(一)](https://segmentfault.com/a/1190000038944710)
