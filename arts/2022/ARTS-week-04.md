---
> **ARTS-week-04**
> 2022-01-23 18:24
---


###### ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
- Algorithm： 每周至少做一个 leetcode 的算法题
- Review: 阅读并点评至少一篇英文技术文章
- Tip: 学习至少一个技术技巧
- Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

- [300. 最长递增子序列](https://leetcode-cn.com/submissions/detail/261467856/)  
  + 思路1：数学归纳思想
   + dp[i]定义:表示以 nums[i] 这个数结尾的最长递增子序列的长度。
   + 正确计算每个 dp[i]:可能形成很多种新的子序列，只选择最长的那一个子序列的长度作为 dp[i] 的值即可。
  + 思路2：二分查找
   + 遵循以下规则：
    1.只能把点数小的牌压到点数比它大的牌上；
    2.如果当前牌点数较大没有可以放置的堆，则新建一个堆，把这张牌放进去；
    3.如果当前牌有多个堆可供选择，则选择最左边的那一堆放置。
   + 每次处理一张扑克牌，要找一个合适的牌堆顶来放，牌堆顶的牌有序，可以用二分查找来搜索当前牌应放置的位置。最终牌的堆数就是最长递增子序列的长度。
- [322. 零钱兑换](https://leetcode-cn.com/submissions/detail/261168930/)  
  + 思路：
    * 1、确定 base case
    * 目标金额 amount 为 0 时算法返回 0。
    * 2、确定「状态」
    * 目标金额 amount。
    * 3、确定「选择」
    * 所有硬币的面值
    * 4、明确 dp 函数/数组的定义
    * 要凑出金额 n，至少要 dp(coins, n) 个硬币
- [698. 划分为k个相等的子集](https://leetcode-cn.com/submissions/detail/260853871/)  
  + 思路：回溯
    * 将 n 个数字分配到 k 个桶里，我们可以有两种视角：
    * 视角一，如果我们切换到这 n 个数字的视角，每个数字都要选择进入到 k 个桶中的某一个。
    * 视角二，如果我们切换到这 k 个桶的视角，对于每个桶，都要遍历 nums 中的 n 个数字，然后选择是否将当前遍历到的数字装进自己这个桶里。

### 2.Review:

- [Elasticsearch 管道聚合综合指南：第 I 部分](https://qbox.io/blog/comprehensive-guide-to-elasticsearch-pipeline-aggregations-part-i/)  

#### 点评：

在本文中讨论的管道聚合处理其他聚合生成的输出，这些聚合转换它们已经计算的值。因此，管道聚合适用于原始文档集中不存在的中间值。这使得管道聚合对于计算复杂的统计和数学度量（如累积和、导数和移动平均线等）非常有用。

在本系列的第一部分中，我们将讨论两种基本类型的管道聚合，并展示常见 Elasticsearch 管道的示例，如总和累积总和、最小值和最大值、平均存储桶和派生管道聚合。


- 管道聚合的类型：
Elasticsearch 中有两种广泛的管道聚合类型：父管道聚合和同级管道聚合。
  - 父管道聚合与其父聚合的输出一起使用。它获取此聚合的值，并计算新的存储桶或聚合，将它们添加到已存在的存储桶中。导数和累积和聚合是 Elasticsearch 中父管道聚合的两个常见示例。
  - 与父管道相反，同级聚合处理同级聚合的输出。他们获取此输出并计算一个新的聚合，该聚合将与同级聚合处于同级。

管道聚合需要一种方法来访问父聚合或同级聚合。他们可以使用指示所需指标路径的参数来引用所需的聚合。此参数具有您需要了解的特殊语法：buckets_path：
```txt
AGG_SEPARATOR       =  '>' ;
METRIC_SEPARATOR    =  '.' ;
AGG_NAME            =  <the name of the aggregation> ;
METRIC              =  <the name of the metric (in case of multi-value metrics aggregation)> ;
PATH                =  <AGG_NAME> [ <AGG_SEPARATOR>, <AGG_NAME> ]* [ <METRIC_SEPARATOR>, <METRIC> ] ;
```
例如，路径将以指标中的值为目标，该值包含在存储桶聚合中。"my_bucket>my_stats.sum"sum"my_stats""my_bucket"

应该注意的是，路径与管道聚合的位置是相对的。这就是为什么路径不能"向上"返回聚合树的原因。例如，此派生管道聚合嵌入到 a 中，并引用"同级"指标：date_histogram"the_sum"

```json
curl -X POST "localhost:9200/traffic_stats/_search" -H 'Content-Type: application/json' -d'
{
    "aggs": {
        "total_monthly_visits":{
            "date_histogram":{
                "field":"date",
                "interval":"month"
            },
            "aggs":{
                "the_sum":{
                    "sum":{ "field": "visits" } 
                },
                "the_derivative":{
                    "derivative":{ "buckets_path": "the_sum" } 
                }
            }
        }
    }
}
'
```

同级管道聚合也可以放置在一系列存储桶的"旁边"，而不是嵌入到"内部"。在这种情况下，要访问所需的指标，我们需要指定一个完整的路径，包括其父聚合：

```json
curl -X POST "localhost:9200/traffic_stats/_search?size=0&pretty" -H 'Content-Type: application/json' -d'
{
  "aggs": {
    "visits_per_month": {
      "date_histogram": {
        "field": "date",
        "interval": "month"
      },
      "aggs": {
        "total_visits": {
          "sum": {
            "field": "visits"
          }
        }
      }
    },
    "avg_monthly_visits": {
      "avg_bucket": {
        "buckets_path": "visits_per_month>total_visits" 
      }
    }
  }
}
'
```

- 在上面的示例中，我们引用了通过其父日期直方图命名的同级聚合，命名为 。因此，目标聚合的完整路径将为 。total_visitsvisits_per_monthvisits_per_month>total_visits

- 此外，请务必记住，管道聚合不能具有子聚合。但是，某些管道聚合（如派生管道聚合）可以在其 中引用其他管道聚合。这允许链接多个管道聚合。例如，我们可以将两个一阶导数链接在一起，以计算二阶导数（导数的导数）。buckets_path

- 指标和存储桶聚合使用"缺失"参数处理数据中的差距。管道聚合使用该参数来处理文档不包含必填字段或没有与一个或多个存储桶的查询匹配的文档等的情况。此参数支持以下间隙策略：gap_policy
  - skip ― 将丢失的数据视为存储桶不存在。如果启用了该策略，则聚合将跳过空存储桶，并使用下一个可用值继续计算。
  - insert_zeros — 将所有缺失值替换为零，管道计算将照常进行。


### 3.Tip:

#### Elasticsearch list indices sorted by name
```shell
curl "localhost:9200/_cat/indices?pretty&v&s=index"`.
```
#### Tomcat Manager 管理页面，报没有权限的错误
```shell
bin/shutdown.sh 
vim webapps/manager/META-INF/context.xml
```
注释
```xml
<Context antiResourceLocking="false" privileged="true" >
  <!--<Valve className="org.apache.catalina.valves.RemoteAddrValve"
         allow="127\.\d+\.\d+\.\d+|::1|0:0:0:0:0:0:0:1" />
  <Manager sessionAttributeValueClassNameFilter="java\.lang\.(?:Boolean|Integer|Long|Number|String)|org\.apache\.catalina\.filters\.CsrfPreventionFilter\$LruCache(?:\$1)?|java\.util\.(?:Linked)?HashMap"/>-->
</Context>
```
#### Tomcat 增加管理界面的用户名、密码
```shell
bin/shutdown.sh 
vim conf/tomcat-users.xml
```
添加
```xml
 <user username="admin" password="1234" roles="manager-gui"/>
```
#### 严重: The web application [] appears to have started a thread named [TestScheduler_Worker-1] but has failed to stop it. This is very likely to create a memory leak.
1.获取 dump
2.从 dump 找到正在运行的线程所属 class
3.在 IDEA 开启 debug 模式,给正在运行的方法加上断点
4.这时会发现当停止 application 时,有一个线程还没有停止掉
5.在 AppContextListener 进行 contextDestroyed 时,要加一段额外的代码,用来关闭 tomcat 的时候可以同时关闭此线程

例如此例:
在 tomcat7 + quartz1.8/1.7 + spring3.0.5 做定时任务的时候，当关闭 tomcat 时抛异常"严重: The web application [] appears to have started a thread named [Thread-"：
```txt
January 17, 2022 6:05:35 PM org.apache.coyote.AbstractProtocol pause
INFO: Pausing ProtocolHandler ["http-nio-8082"]
January 17, 2022 6:05:35 PM org.apache.catalina.core.StandardService stopInternal
INFO: Stopping service Catalina
January 17, 2022 6:05:35 PM org.apache.catalina.loader.WebappClassLoader clearReferencesThreads
SEVERE: The web application [/****] appears to have started a thread named [startQuertz_Worker-1] buthas       failed to stop it. This is very likely to create a memory leak.
January 17, 2022 6:05:35 PM org.apache.catalina.loader.WebappClassLoader clearReferencesThreads
SEVERE: The web application [/****] appears to have started a thread named [startQuertz_Worker-2] buthas  failed to stop it. This is very likely to create a memory leak.
January 17, 2022 6:05:35 PM org.apache.catalina.loader.WebappClassLoader clearReferencesThreads
SEVERE: The web application [/****] appears to have started a thread named [startQuertz_Worker-3] buthas   failed to stop it. This is very likely to create a memory leak.
January 17, 2022 6:05:35 PM org.apache.catalina.loader.WebappClassLoader clearReferencesThreads
```
原因: tomcat 在 shutdown 做清理工作的时候没能等待 quartz 完成 cleanShutdown。
解决办法：自己实现一个 ServletContextListener，在 contextDestroyed 的时候主动调用 quartz schedular的shutdown 方法,并且主线程 sleep 一会儿.

```java
public class QuartzContextListener implements ServletContextListener {

    /*
     * 测试代码写得随便
     *
     * @seejavax.servlet.ServletContextListener#contextDestroyed(javax.servlet.
     * ServletContextEvent)
     */
    @Override
    public void contextDestroyed(ServletContextEvent arg0) {
        WebApplicationContext webApplicationContext = (WebApplicationContext) arg0
                .getServletContext()
                .getAttribute(
                        WebApplicationContext.ROOT_WEB_APPLICATION_CONTEXT_ATTRIBUTE);
        org.quartz.impl.StdScheduler startQuertz = (org.quartz.impl.StdScheduler) webApplicationContext
                .getBean("startQuertz");
        if(startQuertz != null) {
            startQuertz.shutdown();
        }
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    /*
     * (non-Javadoc)
     *
     * @see
     * javax.servlet.ServletContextListener#contextInitialized(javax.servlet
     * .ServletContextEvent)
     */
    @Override
    public void contextInitialized(ServletContextEvent arg0) {
      //不做任何事情
    }
}
```
最后在 web.xml 配置 QuartzContextListener

#### spring 动态注入 bean
1.使用的 registerSingleton 方法
```java
public void registerBean(String name, Object obj) {
  // 获取BeanFactory
  DefaultListableBeanFactory defaultListableBeanFactory = (DefaultListableBeanFactory) ctx
      .getAutowireCapableBeanFactory();

  // 动态注册bean.
  defaultListableBeanFactory.registerSingleton(name, obj);
}
```
2.使用刚注册的 必须通过 getBean("xx")的方式 。这种方式还多用于在过滤器中获取容器对象，因为spring不能为过滤器注入任何属性
```java
ApplicationContext ac = WebApplicationContextUtils.getRequiredWebApplicationContext(request.getServletContext());  
ConfigurableApplicationContext context = (ConfigurableApplicationContext) ac;   
//Bean的实例工厂  
DefaultListableBeanFactory dbf = (DefaultListableBeanFactory) context.getBeanFactory();  
//Bean构建  BeanService.class 要创建的Bean的Class对象  
BeanDefinitionBuilder dataSourceBuider = BeanDefinitionBuilder. genericBeanDefinition(BeanService.class);  
//向里面的属性注入值，提供get set方法  
dataSourceBuider.addPropertyValue("msg", "hello ");  
//dataSourceBuider.setParentName("");  同配置 parent  
//dataSourceBuider.setScope("");   同配置 scope  
//将实例注册spring容器中   bs 等同于  id配置  
dbf.registerBeanDefinition("bs", dataSourceBuider.getBeanDefinition());  
```
3.获取 BeanFactory
```java
public void registerBean2(String name, Class<?> beanClass) {
  // 获取BeanFactory
  DefaultListableBeanFactory defaultListableBeanFactory = (DefaultListableBeanFactory) ctx
      .getAutowireCapableBeanFactory();

  // 创建bean信息.
  BeanDefinitionBuilder beanDefinitionBuilder = BeanDefinitionBuilder.genericBeanDefinition(beanClass);

  // beanDefinitionBuilder.addPropertyValue("name","张三");

  // 动态注册bean.
  defaultListableBeanFactory.registerBeanDefinition(name, beanDefinitionBuilder.getBeanDefinition());
}
```

### 4.Share:

- [一文搞懂全排列、组合、子集问题](https://segmentfault.com/a/1190000040142137)  

- [AtomicBoolean介绍与使用](https://www.jianshu.com/p/9985810bd8cb)  

- [内存泄漏与线程池](https://blog.yahui.tech/2021/03/memory-leak-experience-in-tomcat/)  

- [Tomcat7 Maven Plugin Invalid Byte Tag in Constant Pool 19](https://relentlesscoding.com/posts/tomcat7-maven-plugin-invalid-byte-tag-in-constant-pool-19/)  

- [记一次tomcat部署失败：Invalid byte tag in constant pool: 19](https://www.jianshu.com/p/ff66e98454d1)  

- [To prevent a memory leak, the JDBC Driver has been forcibly unregistered](https://stackoverflow.com/questions/3320400/to-prevent-a-memory-leak-the-jdbc-driver-has-been-forcibly-unregistered)  

- [The web application appears to have started a thread named [Timer-0] but has failed to stop it](https://stackoverflow.com/questions/48254517/the-web-application-appears-to-have-started-a-thread-named-timer-0-but-has-fai)  

- [Tomcat关闭时报错【驱动程序已被强制取消注册】【内存泄漏】【连接未能停止】-问题](https://blog.csdn.net/weixin_43102797/article/details/110097017)  

- [解决“至少有一个JAR被扫描用于TLD但尚未包含TLD”的问题](https://blog.csdn.net/konley233/article/details/108245695)  

- [IntelliJ IDEA配置Tomcat/Jetty运行Web项目](https://www.cnblogs.com/EasonJim/p/7860700.html)  

- [自动注入失败的两种可能：NoSuchBeanDefinitionException: No qualifying bean of type 'com.aaa.xxx'' available](https://blog.csdn.net/lezeqe/article/details/106091039)  

