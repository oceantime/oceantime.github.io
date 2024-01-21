---
> **ARTS-week-06**
> 2021-02-14 19:36
---


## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm: 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

102. 二叉树的层序遍历 https://leetcode-cn.com/submissions/detail/145893422/
589. N叉树的前序遍历 https://leetcode-cn.com/submissions/detail/145895492/
590. N叉树的后序遍历 https://leetcode-cn.com/submissions/detail/145895682/
429. N叉树的层序遍历 https://leetcode-cn.com/submissions/detail/145896436/

### 2.Review:

https://medium.com/m/global-identity?redirectUrl=https%3A%2F%2Ftowardsdatascience.com%2Flife-after-hadoop-getting-data-science-to-work-for-your-business-c9ab6605733f
后 Hadoop 时代的大规模数据科学实践建议--Josh Patterson & Jim Scott

#### 点评：

数据科学可以对业务产生变革影响，但如果需要数周的时间才能得到结果，则不会。将数据科学落地可以简化为三个步骤：
- 从业务流程中捕获数据
- 将这些大数据与海量处理相结合，以创建机器学习模型
- 验证模型的准确性并进行部署

RAPIDS 建立在 NVIDIA CUDA-X AI 之上，结合了图形，机器学习，深度学习，HPC 等方面的多年发展。

### 3.Tip:

#### Groovy 的 Java 动态计算能力
- groovy 是一种基于 JVM 的敏捷开发语言, 代码能够和 java 很好的结合, groovy 还可以使用 java 的类型, 应用中可能会遇到 java 中执行自定义 script 的能力, 比如, 自定义输入一些公式 a +b, a%2, '000'+s.substr(0,3), 可以通过 GroovyShell 解决。

1.使用 GroovyShell
```java
//在使用 GroovyShell 之前,先 Import
import groovy.lang.Binding;
import groovy.lang.GroovyShell;
import groovy.lang.Script;

GroovyShell shell = new GroovyShell();
Object result = shell.evaluate("(1+5)/2");
System.out.println(result);
```

2.绑定参数
```java
Binding binding = new Binding();
binding.setVariable("p",3.1415926);
binding.setVariable("r",5);

GroovyShell shell = new GroovyShell(binding);
Object result = shell.evaluate("p*r*r");
System.out.println(result);

result: 78.539815
```

3.引用数学函数
```java
//Java 中的数学函数很多, 见 Math.xxx, 上面的计算结果因为小数位太长, 我们需求四舍五入, 可以直接用 Math.round,
Object result = shell.evaluate("Math.round(p*r*r)");
System.out.println(result);

result: 79

//保留2位小数, 这时候 Math.xxx 并没有这样的函数直接拿来即用, groovy 代码:
import java.math.RoundingMode

def result = 78.539815
BigDecimal bg = new BigDecimal(result)
bg.setScale(2,RoundingMode.HALF_DOWN).doubleValue()
```

4.自定义函数
```java
//先创建一个 Java Class
public class EvalBaseScript extends Script {

    @Override
    public Object run() {
        Method[] methods = EvalBaseScript.class.getDeclaredMethods();
        StringBuilder sb=new StringBuilder();
        for (Method method : methods) {
            sb.append(method);
        }

        return sb.substring(0, sb.length()-1);
    }

    public static double round(String value, int scale) {
        BigDecimal bd = new BigDecimal(value);
        return bd.setScale(scale, 4).doubleValue();
    }

    public static double round(double value, int scale) {
        BigDecimal bd = new BigDecimal(value);
        return bd.setScale(scale, 4).doubleValue();
    }
}

//groovy 中如何使用上面的 class
Binding binding = new Binding();
if(vars!=null) {
    vars.keySet().forEach(name ->
            binding.setVariable(name, vars.get(name))
    );
}
CompilerConfiguration cfg = new CompilerConfiguration();
cfg.setScriptBaseClass(EvalBaseScript.class.getName());
GroovyShell shell = new GroovyShell(binding,cfg);

try {
    Script script = shell.parse(buildScript());
    return script.run();
} catch (Exception ex) {
    logger.error("catch script execution error, script:"+buildScript(), ex);
    return 0;
}
```

### 4.Share:

https://cnblogs.com/mumusen/p/9760732.html
yarn的安装和使用

https://blog.csdn.net/sunyurun/article/details/8168923
跟我一起写Windows JS脚本（一）：Hello World

https://blog.csdn.net/hit0803107/article/details/70241155
万亿级日志与行为数据存储查询技术剖析