---
> **ARTS-week-05**
> 2023-01-22 12:17
---


## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm： 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

- [1824. 最少侧跳次数](https://leetcode.cn/submissions/detail/396532855/)  
    + 思路：BFS
- [1815. 得到新鲜甜甜圈的最多组数](https://leetcode.cn/submissions/detail/396654341/)  
    + 思路：DFS

### 2.Review:

[Spring Boot – Best Practices](https://www.e4developer.com/2018/08/06)

#### 点评：

Spring Boot 是用于开发微服务的最流行的 Java 框架。在本文中，我将与分享自 2016 年以来我在专业开发中使用它收集的使用 Spring Boot 的最佳实践。我基于我的个人经验和公认的Spring Boot专家的著作。

#### 1、使用自定义BOM来维护第三方依赖
这条实践是我根据实际项目中的经历总结出的。

Spring Boot 项目本身使用和集成了大量的开源项目，它帮助我们维护了这些第三方依赖。但是也有一部分在实际项目使用中并没有包括进来，这就需要我们在项目中自己维护版本。如果在一个大型的项目中，包括了很多未开发模块，那么维护起来就非常的繁琐。

怎么办呢？事实上，Spring IO Platform 就是做的这个事情，它本身就是Spring Boot的子项目，同时维护了其他第三方开源库。我们可以借鉴 Spring IO Platform 来编写自己的基础项目 platform-bom，所有的业务模块项目应该以BOM的方式引入。这样在升级第三方依赖时，就只需要升级这一个依赖的版本而已。

```xml
<dependencyManagement>
   <dependencies>
       <dependency>
           <groupId>io.spring.platform</groupId>
           <artifactId>platform-bom</artifactId>
           <version>Cairo-SR3</version>
           <type>pom</type>
           <scope>import</scope>
       </dependency>
   </dependencies>
</dependencyManagement>
```

#### 2、使用自动配置
Spring Boot的一个主要特性是使用自动配置。这是Spring Boot的一部分，它可以简化的代码并使之工作。当在类路径上检测到特定的jar文件时，自动配置就会被激活。

使用它的最简单方法是依赖Spring Boot Starters。因此，如果想与Redis进行集成，可以首先包括：

```xml
<dependency>
   <groupId>org.springframework.boot</groupId>
   <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
```

如果想与MongoDB进行集成，需要这样：

```xml
<dependency>
   <groupId>org.springframework.boot</groupId>
   <artifactId>spring-boot-starter-data-mongodb</artifactId>
</dependency>
```

借助于这些 starters，这些繁琐的配置就可以很好地集成起来并协同工作，而且它们都是经过测试和验证的。这非常有助于避免可怕的 [Jar 地狱](https://link.zhihu.com/?target=https%3A//dzone.com/articles/what-is-jar-hell)。

通过使用以下注解属性，可以从自动配置中排除某些配置类：

```java
@EnableAutoConfiguration（exclude = {ClassNotToAutoconfigure.class}）
```
但只有在绝对必要时才应该这样做。

有关自动配置的官方文档可在[此处](https://link.zhihu.com/?target=https%3A//docs.spring.io/spring-boot/docs/current/reference/html/using-boot-auto-configuration.html)找到。


#### 3、使用Spring Initializr来开始一个新的Spring Boot项目

这一条最佳实践来自Josh Long （Spring Advocate，@starbuxman）。

Spring Initializr 提供了一个超级简单的方法来创建一个新的Spring Boot项目，并根据的需要来加载可能使用到的[依赖](https://link.zhihu.com/?target=https%3A//start.spring.io/)。

使用Initializr创建应用程序可确保获得经过测试和验证的依赖项，这些依赖项适用于Spring自动配置。甚至可能会发现一些新的集成，但可能并没有意识到这些。

#### 4、考虑为常见的组织问题创建自己的自动配置
这一条也来自Josh Long（Spring Advocate，@starbuxman）——这个实践是针对高级用户的。

如果在一个严重依赖Spring Boot的公司或团队中工作，并且有共同的问题需要解决，那么可以创建自己的自动配置。

这项任务涉及较多工作，因此需要考虑何时获益是值得投入的。与多个略有不同的定制配置相比，维护单个自动配置更容易。

如果将这个提供Spring Boot配置以开源库的形式发布出去，那么将极大地简化数千个用户的配置工作。

#### 5、正确设计代码目录结构
尽管允许有很大的自由，但是有一些基本规则值得遵守来设计的源代码结构。

避免使用默认包。确保所有内容（包括的入口点）都位于一个名称很好的包中，这样就可以避免与装配和组件扫描相关的意外情况；

将Application.java（应用的入口类）保留在顶级源代码目录中；

我建议将控制器和服务放在以功能为导向的模块中，但这是可选的。一些非常好的开发人员建议将所有控制器放在一起。不论怎样，坚持一种风格！

#### 保持@Controller的简洁和专注
Controller应该非常简单。可以在此处阅读有关GRASP中有关控制器模式部分的说明。希望控制器作为协调和委派的角色，而不是执行实际的业务逻辑。以下是主要做法：

[#Controller](https://link.zhihu.com/?target=https%3A//en.wikipedia.org/wiki/GRASP_%28object-oriented_design%29)
- 控制器应该是无状态的！默认情况下，控制器是单例，并且任何状态都可能导致大量问题；
- 控制器不应该执行业务逻辑，而是依赖委托；
- 控制器应该处理应用程序的HTTP层，这不应该传递给服务；
- 控制器应该围绕用例/业务能力来设计。

要深入这个内容，需要进一步地了解设计REST API的最佳实践。无论是否想要使用Spring Boot，都是值得学习的。

#### 7、围绕业务功能构建 @Service
Service 是 Spring Boot 的另一个核心概念。我发现最好围绕业务功能/领域/用例（无论怎么称呼都行）来构建服务。

在应用中设计名称类似 AccountService, UserService, PaymentService 这样的服务，比起像 DatabaseService、ValidationService、CalculationService 这样的会更合适一些。

可以决定使用 Controler 和 Service 之间的一对一映射，那将是理想的情况。但这并不意味着，Service 之间不能互相调用！

#### 8、使数据库独立于核心业务逻辑之外
我之前还不确定如何在 Spring Boot 中最好地处理数据库交互。在阅读了罗伯特·C·马丁的 “Clear Architecture” 之后，对我来说就清晰多了。

希望的数据库逻辑于服务分离出来。理想情况下，不希望服务知道它正在与哪个数据库通信，这需要一些抽象来封装对象的持久性。
```
罗伯特C.马丁强烈地说明，的数据库是一个“细节”，这意味着不将的应用程序与特定数据库耦合。过去很少有人会切换数据库，我注意到，使用 Spring Boot 和现代微服务开发会让事情变得更快。
```

#### 9、保持业务逻辑不受 Spring Boot 代码的影响
考虑到 “Clear Architecture” 的教训，还应该保护的业务逻辑。将各种 Spring Boot 代码混合在一起是非常诱人的……不要这样做。如果能抵制诱惑，将保持的业务逻辑可重用。

部分服务通常成为库。如果不从代码中删除大量 Spring 注解，则更容易创建。

#### 10、推荐使用构造函数注入
这一条实践来自 Phil Webb（Spring Boot 的项目负责人, @phillip_webb）。

保持业务逻辑免受 Spring Boot 代码侵入的一种方法是使用构造函数注入。 不仅是因为 @Autowired 注解在构造函数上是可选的，而且还可以在没有 Spring 的情况下轻松实例化 bean。

#### 11、熟悉并发模型
我写过的最受欢迎的文章之一是“介绍Spring Boot中的并发”。我认为这样做的原因是这个领域经常被误解和忽视。如果使用不当，就会出现[问题](https://link.zhihu.com/?target=https%3A//www.e4developer.com/2018/03/30/introduction-to-concurrency-in-spring-boot/)。

在Spring Boot中，Controller和Service是默认是单例。如果不小心，这会引入可能的并发问题。 通常也在处理有限的线程池。请熟悉这些概念。

如果正在使用新的WebFlux风格的Spring Boot应用程序，我已经解释了它在“Spring’s WebFlux/Reactor Parallelism and Backpressure”中是如何工作的。

#### 12、加强配置管理的外部化
这一点超出了Spring Boot，虽然这是人们开始创建多个类似服务时常见的问题……

可以手动处理Spring应用程序的配置。如果正在处理多个Spring Boot应用程序，则需要使配置管理能力更加强大。

我推荐两种主要方法：
- 使用配置服务器，例如Spring Cloud Config；
- 将所有配置存储在环境变量中（可以基于git仓库进行配置）。

这些选项中的任何一个（第二个选项多一些）都要求在DevOps更少工作量，但这在微服务领域是很常见的。

#### 13、提供全局异常处理
真的需要一种处理异常的一致方法。Spring Boot提供了两种主要方法：

应该使用HandlerExceptionResolver定义全局异常处理策略；
也可以在控制器上添加@ExceptionHandler注解，这在某些特定场景下使用可能会很有用。
这与Spring中的几乎相同，并且Baeldung有一篇[关于REST与Spring的错误处理](https://link.zhihu.com/?target=https%3A//www.baeldung.com/exception-handling-for-rest-with-spring)的详细文章，非常值得一读。

#### 14、使用日志框架
可能已经意识到这一点，但应该使用Logger进行日志记录，而不是使用System.out.println()手动执行。这很容易在Spring Boot中完成，几乎没有配置。只需获取该类的记录器实例：

```java
Logger logger = LoggerFactory.getLogger(MyClass.class);
```

这很重要，因为它可以让根据需要设置不同的日志记录级别。

#### 15、测试的代码
这不是Spring Boot特有的，但它需要提醒——测试的代码！如果没有编写测试，那么将从一开始就编写遗留代码。

如果有其他人使用的代码库，那边改变任何东西将会变得危险。当有多个服务相互依赖时，这甚至可能更具风险。

由于存在Spring Boot最佳实践，因此应该考虑将Spring Cloud Contract用于的消费者驱动契约，它将使与其他服务的集成更容易使用。

#### 16、使用测试切片让测试更容易，并且更专注
这一条实践来自Madhura Bhave（Spring 开发者, @madhurabhave23）。

使用Spring Boot测试代码可能很棘手——需要初始化数据层，连接大量服务，模拟事物……实际上并不是那么难！答案是使用测试切片。

使用测试切片，可以根据需要仅连接部分应用程序。这可以为节省大量时间，并确保的测试不会与未使用的内容相关联。来自 spring.io 的一篇名为[Custom test slice with Spring test 1.4](https://link.zhihu.com/?target=https%3A//spring.io/blog/2016/08/30/custom-test-slice-with-spring-boot-1-4)的博客文章解释了这种技术。

#### 总结
感谢 Spring Boot，编写基于 Spring 的微服务正变得前所未有的简单。我希望通过这些最佳实践，的实施过程不仅会变得很快，而且从长远来看也会更加强大和成功。祝好运！

### 3.Tip:

#### 使用 pdfbox，将 PDF 转图片后，中文乱码问题
使用pdfbox,将PDF转成图片后，其中的中文显示乱码（方块□□□□□）
控制台日志如下：
```shell
2020-08-18 00:41:12.388  WARN 2848 --- [nio-8081-exec-7] o.a.pdfbox.pdmodel.font.PDCIDFontType0   : Using fallback MalgunGothic-Semilight for CID-keyed font STSong-Light
2020-08-18 00:41:12.499  WARN 2848 --- [nio-8081-exec-7] o.a.pdfbox.rendering.CIDType0Glyph2D     : No glyph for 37197 (CID 0ba5) in font STSong-Light
2020-08-18 00:41:12.502  WARN 2848 --- [nio-8081-exec-7] o.a.pdfbox.rendering.CIDType0Glyph2D     : No glyph for 22871 (CID 0e2a) in font STSong-Light
2020-08-18 00:41:12.504  WARN 2848 --- [nio-8081-exec-7] o.a.pdfbox.rendering.CIDType0Glyph2D     : No glyph for 22269 (CID 0753) in font STSong-Light
2020-08-18 00:41:12.504  WARN 2848 --- [nio-8081-exec-7] o.a.pdfbox.rendering.CIDType0Glyph2D     : No glyph for 32593 (CID 0ea9) in font STSong-Light
```
分析：
```shell
Using fallback MalgunGothic-Semilight for CID-keyed font STSong-Light
```
解读此行日志，先识别字体为STSong-Light，但系统中没有找到此字库，所以默认匹配到了MalgunGothic-Semilight。此字库为韩语字库，无法显示出中文，所以中文显示为□□□□□。

解决：
进入 pdfbox 包内的 FontMapperImpl 找到如下位置，可以看到 substitutes 内的一个映射关系，我们可以将 STSong-Light 映射到另一已存在的字体
```java
FontMapperImpl() {
        this.substitutes.put("Courier", Arrays.asList("CourierNew", "CourierNewPSMT", "LiberationMono", "NimbusMonL-Regu"));
        this.substitutes.put("Courier-Bold", Arrays.asList("CourierNewPS-BoldMT", "CourierNew-Bold", "LiberationMono-Bold", "NimbusMonL-Bold"));
        this.substitutes.put("Courier-Oblique", Arrays.asList("CourierNewPS-ItalicMT", "CourierNew-Italic", "LiberationMono-Italic", "NimbusMonL-ReguObli"));
        this.substitutes.put("Courier-BoldOblique", Arrays.asList("CourierNewPS-BoldItalicMT", "CourierNew-BoldItalic", "LiberationMono-BoldItalic", "NimbusMonL-BoldObli"));
        this.substitutes.put("Helvetica", Arrays.asList("ArialMT", "Arial", "LiberationSans", "NimbusSanL-Regu"));
        this.substitutes.put("Helvetica-Bold", Arrays.asList("Arial-BoldMT", "Arial-Bold", "LiberationSans-Bold", "NimbusSanL-Bold"));
        this.substitutes.put("Helvetica-Oblique", Arrays.asList("Arial-ItalicMT", "Arial-Italic", "Helvetica-Italic", "LiberationSans-Italic", "NimbusSanL-ReguItal"));
        this.substitutes.put("Helvetica-BoldOblique", Arrays.asList("Arial-BoldItalicMT", "Helvetica-BoldItalic", "LiberationSans-BoldItalic", "NimbusSanL-BoldItal"));
        this.substitutes.put("Times-Roman", Arrays.asList("TimesNewRomanPSMT", "TimesNewRoman", "TimesNewRomanPS", "LiberationSerif", "NimbusRomNo9L-Regu"));
        this.substitutes.put("Times-Bold", Arrays.asList("TimesNewRomanPS-BoldMT", "TimesNewRomanPS-Bold", "TimesNewRoman-Bold", "LiberationSerif-Bold", "NimbusRomNo9L-Medi"));
        this.substitutes.put("Times-Italic", Arrays.asList("TimesNewRomanPS-ItalicMT", "TimesNewRomanPS-Italic", "TimesNewRoman-Italic", "LiberationSerif-Italic", "NimbusRomNo9L-ReguItal"));
        this.substitutes.put("Times-BoldItalic", Arrays.asList("TimesNewRomanPS-BoldItalicMT", "TimesNewRomanPS-BoldItalic", "TimesNewRoman-BoldItalic", "LiberationSerif-BoldItalic", "NimbusRomNo9L-MediItal"));
        this.substitutes.put("Symbol", Arrays.asList("Symbol", "SymbolMT", "StandardSymL"));
        this.substitutes.put("ZapfDingbats", Arrays.asList("ZapfDingbatsITC", "Dingbats", "MS-Gothic"));
        Iterator var1 = Standard14Fonts.getNames().iterator();
```
先按照这个 FontMapperImpl 类在自己的项目中建立一个和这个路径完全一致的 FontMapperImpl 类，代码内容复制过来。并在 substitutes 中增加一个 STSong-Light 的映射关系，映射到我的环境中已有的 AdobeSongStd-Light 字体。
```java
this.substitutes.put("STSong-Light", Arrays.asList("AdobeSongStd-Light","DengXian"));
```
启动项目，即可显示中文。

#### Java全排列算法实现
1.回溯
```java
public class Solution46 {
    //存放最终答案的java容器
    List<List<Integer>> ans=new ArrayList<>();
    //全排列的方法
    public List<List<Integer>> permute(int[] nums) {
        //我们用来存放是否访问过的数组（避免重复使用某一元素）
        boolean[] isVisted=new boolean[nums.length];
        //回溯法的核心，这是一个递归的调用
        dfs(nums,isVisted,new ArrayList<Integer>());
        //返回答案
        return ans;
    }
    //核心算法
    public void dfs(int[] nums,boolean[] isVisited,ArrayList<Integer> path){
        //如果我们的路径，也就是我们用来存放我们一步步加入元素的容器的尺寸和num数组的长度是一样的，这说明我们找到了一个全排列，所以我们把它放入最终的答案数组
        if(path.size()==nums.length)
            ans.add(new ArrayList<>(path));
        //我们对于从下标0到数组num长度减1的数进行遍历
        for (int i=0;i<nums.length;i++){
            //如果没有被访问，即被加入到路径容器中，就进行下面的操作
            if (!isVisited[i]){
                //变成访问过的元素
                isVisited[i]=true;
                //加入到路径容器中
                path.add(nums[i]);
                //递归进行深度优先搜索
                dfs(nums,isVisited,path);
                //回溯的两步，去掉路径容器的最后的值，因为最后被添加的最先被回溯到
                path.remove(path.size()-1);
                //第二步，因为回溯，所以这个元素要被设置回未访问的
                isVisited[i]=false;
            }
        }
    }
}
```

2.数组交换
```java
import java.util.*;
import java.math.*;
public class Main {
    
    public static boolean nextPermutation(int[] arr) {
        int i = arr.length - 2;
        while (i >= 0 && arr[i] > arr[i + 1]) // 从后往前找，找到第一个不满足降序的数（要考虑到重复的数字）
            i--;
        if (i == -1)
            return false;
        int k = i + 1;
        while (k < arr.length && arr[k] > arr[i])   // 从i开始往后找到大于arr[i]的最小的数
            k++;
        { int tmp; tmp = arr[i]; arr[i] = arr[k - 1]; arr[k - 1] = tmp; } // 交换arr[i]和arr[k-1]
        Arrays.sort(arr, i + 1, arr.length);    // 重新对arr[i]后面的数排序，接下来继续进行全排列操作
        return true;
    }

    public static void main(String[] args) {    //利用nextPermutation求全排列的功能演示
        Scanner sc=new Scanner(System.in);
        int n=sc.nextInt();
        int arr[] = new int[n];
        for(int i=0;i<n;i++)
            arr[i]=i+1;
        do {
            for (int i = 0; i < n; i++) {
                System.out.printf("%5d",arr[i]);
            }
            System.out.println();
        } while (nextPermutation(arr));
    }
}
```


### 4.Share:

[微服务设计 - API网关模式](https://zhuanlan.zhihu.com/p/298154221)  

[通过swagger json一键解析为html页面、导出word和excel的解析算法分享](https://www.cnblogs.com/lmyupupblogs/p/12965580.html)

[Swagger文档转Word 文档](https://www.cnblogs.com/jmcui/p/8298823.html)

[OpenApi-Generator：简化RESTful API开发流程](https://blog.csdn.net/sinat_33718563/article/details/125553508)

[Swagger Codegen生成接口](https://blog.csdn.net/hl6164085/article/details/107481231)

[How to Convert HTML Table into Excel Spreadsheet using jQuery ?](https://www.geeksforgeeks.org/how-to-convert-html-table-into-excel-spreadsheet-using-jquery/)