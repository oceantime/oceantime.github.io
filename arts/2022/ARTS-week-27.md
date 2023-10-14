---
> **ARTS-week-27**
> 2022-07-02 09:30
---


###### ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
- Algorithm: 每周至少做一个 leetcode 的算法题
- Review: 阅读并点评至少一篇英文技术文章
- Tip: 学习至少一个技术技巧
- Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

- [556. 下一个更大元素 III (中等) +](https://leetcode.cn/submissions/detail/331995270/)  
  + 思路：模拟
- [241. 为运算表达式设计优先级 (中等) +](https://leetcode.cn/submissions/detail/331495987/)  
  + 思路：递归
- [535. TinyURL 的加密与解密 (中等) +](https://leetcode.cn/submissions/detail/330609626/)  
  + 思路: 哈希


### 2.Review:

- [如何使用 NDepend 标识数据类？](https://www.simpleorientedarchitecture.com/how-to-identify-data-class-using-ndepend/)  

#### 点评：

在本文中，我们将了解如何识别数据类代码坏味道。

- 数据类检测策略
数据类是直接公开其数据的类，并且具有很少的功能方法。Michele Lanza和Radu Marinescu的《面向对象的指标实践》为数据类提出了以下检测策略：
（WOC <一三）和
（（（NOPA + NOAM > Few）和（WMC < High）） OR
（（NOPA + NOAM > Many） and （WMC < Very High）））

此检测策略使用四个指标：
- WOC – 类的权重 – 用于测量函数成员与类的所有成员的相对数量
- NOAM – 访问器方法的数量
- NOPA – 公共属性的数量
- WMC – 加权方法计数 – 用于测量类复杂性

此检测策略使用三种类型的阈值：
- NOPA和NOAM使用普遍接受的含义阈值。在 2 和 5 之间定义很少。许多是短期记忆容量，所以它是7或8。
- WOC 使用通用分数阈值。三分之一是0.33。
- WMC 使用基于统计信息的阈值。对于这些类型的阈值，需要分析大量项目。《面向对象指标实践》的作者分析了 45 个 Java 项目，并提取了一些基本指标的低、平均、高和极高阈值。WMC 的高阈值为 31，非常高的阈值为 47。

- 指标定义
让我们回顾一下所用指标的定义，以及如何使用 NDepend 实现它们。有关更详细的定义，请务必查看实践中面向对象指标的附录 A.2。如果不熟悉 CQLinq，请查看 NDepend 文档或我的博客文章，了解如何查询的代码库。

WOC – 一个类的重量：
此指标测量与类的所有成员相比，函数成员的相对数量。它的计算方法是将公共功能成员的数量除以公共成员的总数。

```
// <Name>WOC</Name>
// ** Helper Functions **
let isProperty = new Func<ICodeElement, bool>(member => 
 member.IsMethod && 
 (member.AsMethod.IsPropertyGetter || member.AsMethod.IsPropertySetter)) 
 
// ** Metric Functions **
let allPublicFunctionalMembersFor = new Func<IType, IEnumerable<IMember>>(t =>
 t.Methods.Where(m => m.IsPublic && !isProperty(m) && !m.IsAbstract))
 
let allPublicMembersFor = new Func<IType, IEnumerable<IMember>>(t =>
 t.Members.Where(m => 
     m.IsPublic && 
     (!m.IsMethod || (!m.AsMethod.IsClassConstructor && !m.AsMethod.IsConstructor))))
 
let wocFor = new Func<IType, double>(t =>
 (double) allPublicFunctionalMembersFor(t).Count() / allPublicMembersFor(t).Count())
 
// ** Sample Usage **
from t in JustMyCode.Types.Where(type => !type.IsEnumeration)
let functionalPublicMembers = allPublicFunctionalMembersFor(t)
let allPublicMembers = allPublicMembersFor(t)
let woc = wocFor(t)
orderby woc ascending
select new { t, woc, functionalPublicMembers , allPublicMembers }
```

WMC – 加权方法计数:
此指标衡量类的复杂性。这是通过对一个类的所有方法的复杂性求和来完成的。McCabe的循环复杂性用于测量方法的复杂性。

```
// <Name>WMC</Name>
let wmcFor = new Func<IType, int>(t => 
 t.MethodsAndContructors
  .Select(m => (int) m.CyclomaticComplexity.GetValueOrDefault())
  .Sum())
 
// ** Sample Usage **
from t in JustMyCode.Types
let wmc = wmcFor(t)
orderby wmc descending
select new { t, wmc }
```

NOAM – 访问器方法的数量:
此指标计算类的访问器（getters 和 setter）的数量。

```
// <Name>NOAM</Name>
// ** Helper Functions **
let isProperty = new Func<ICodeElement, bool>(member => 
 member.IsMethod && 
 (member.AsMethod.IsPropertyGetter || member.AsMethod.IsPropertySetter)) 
 
// ** Metric Functions **
let accessorsFor = new Func<IType, IEnumerable<IMember>>(t =>
 t.Methods.Where(m => m.IsPublic &&
                      isProperty(m) && 
                      !m.IsAbstract && 
                      !m.IsStatic))
 
let noamFor = new Func<IType, int>(t => 
 accessorsFor(t).Count())
 
// ** Sample Usage **
from t in JustMyCode.Types
let accessors = accessorsFor(t)
let noam = noamFor(t)
orderby noam ascending
select new { t, noam, accessors }
```

NOPA – 公共属性的数量:
此指标计算类的公共属性数。

```
// <Name>NOPA</Name>
// ** Metric Functions **
let publicAttributesFor = new Func<IType, IEnumerable<IMember>>(t => 
 t.Fields.Where(f => f.IsPublic && !f.IsInitOnly && !f.IsStatic))
 
let nopaFor = new Func<IType, int>(t => publicAttributesFor(t).Count())
 
// ** Sample Usage **
from t in JustMyCode.Types
let nopa = nopaFor(t)
orderby nopa descending
select new { t, nopa }
```

- 将它们放在一起
现在我们知道了如何计算每个必需的指标，让我们看看检测策略是什么样的：

```
// <Name>Data Class</Name>
warnif count > 0
// *** WOC ***
// ** Helper Functions **
let isProperty = new Func<ICodeElement, bool>(member => 
 member.IsMethod && 
 (member.AsMethod.IsPropertyGetter || member.AsMethod.IsPropertySetter)) 
 
// ** Metric Functions **
let allPublicFunctionalMembersFor = new Func<IType, IEnumerable<IMember>>(t =>
 t.Methods.Where(m => m.IsPublic && !isProperty(m) && !m.IsAbstract))
 
let allPublicMembersFor = new Func<IType, IEnumerable<IMember>>(t =>
 t.Members.Where(m => 
      m.IsPublic && 
      (!m.IsMethod || (!m.AsMethod.IsClassConstructor && !m.AsMethod.IsConstructor))))
 
let wocFor = new Func<IType, double>(t =>
 (double) allPublicFunctionalMembersFor(t).Count() / allPublicMembersFor(t).Count())
 
// *** WMC ***
let wmcFor = new Func<IType, int>(t => 
 t.MethodsAndContructors
  .Select(m => (int) m.CyclomaticComplexity.GetValueOrDefault())
  .Sum())
 
// *** NOAM ***
let accessorsFor = new Func<IType, IEnumerable<IMember>>(t =>
 t.Methods.Where(m => m.IsPublic && 
                      isProperty(m) && 
                      !m.IsAbstract && 
                      !m.IsStatic))
 
let noamFor = new Func<IType, int>(t => 
 accessorsFor(t).Count())
 
// *** NOPA ***
// ** Metric Functions **
let publicAttributesFor = new Func<IType, IEnumerable<IMember>>(t => 
 t.Fields.Where(f => f.IsPublic && !f.IsInitOnly && !f.IsStatic))
 
let nopaFor = new Func<IType, int>(t => publicAttributesFor(t).Count())
 
// ** Thresholds **
let Few = 5
let Many = 8
let OneThird = 0.33
let wmcVeryHigh = 47
let wmcHigh = 31
 
// ** Detection Strategy **
from t in JustMyCode.Types
let woc = wocFor(t)
let wmc = wmcFor(t)
let nopa = nopaFor(t)
let noam = noamFor(t)
 
where
 // Interface of class reveals data rather than offering services
 (woc < OneThird) && 
  (
   (
    // More than a few public data
    (nopa + noam) > Few && 
    // Complexity of the class is not high
    (wmc < wmcHigh)
   ) ||
   (
    // Class has many public data
    (nopa + noam) > Many &&
    // Complexity of the class is not very high 
    (wmc < wmcVeryHigh)
   )
 )
 
select new { t, woc, wmc, nopa, noam }
```

- 结论
使用 NDepend 实现数据类检测策略非常简单。在一个更大的项目上运行检测策略后，我注意到它（正确地）拾取了许多DTO类。我最终要做的是在检测策略中添加另一个 Where 子句。这样，我就可以忽略某些命名空间和程序集，以免触发误报。

### 3.Tip:

#### Java 8 Runnable Lambda示例(带参数)

Java 8 支持 lambda 表达式并且已使用 @FunctionalInterface 注释了 Runnable 接口，因此可以使用 lambda 表达式创建 Runnable 实例。

```java
Runnable r = () -> System.out.println("Hello World!");
Thread th = new Thread(r);
th.start();
```

如果需要在 run() 方法中编写多行代码，可以使用如下所示的 lambda 表达式进行操作。

```java
Runnable r = () -> {
  Consumer<Book> prop = (Book b) -> System.out.println("Book Id:"+b.getId() + ", Book Name:"+b.getName());
  list.forEach(prop);
}; 
```

要将参数传递给我们的 run() 方法，我们应该使用 final 修饰符。

```java
final List<Book> list =  Arrays.asList(new Book(1, "Roma"), new Book(2, "Mahabharat"));
Runnable r = () -> {
  Consumer<Book> prop = (Book b) -> System.out.println("Book Id:"+b.getId() + ", Book Name:"+b.getName());
  list.forEach(prop);
}; 
```

### 4.Share:

- [TabLayout与RecyclerView的联动（没有ViewPager的事儿）](https://www.jianshu.com/p/2e1995c0ccfe)  

- [TabLayout 和 RecyclerView 联动（不使用ViewPager）](https://blog.csdn.net/qq_30236145/article/details/80607766)