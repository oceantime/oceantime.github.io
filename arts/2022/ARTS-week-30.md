---
> **ARTS-week-30**
> 2022-07-23 20:23
---


###### ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
- Algorithm: 每周至少做一个 leetcode 的算法题
- Review: 阅读并点评至少一篇英文技术文章
- Tip: 学习至少一个技术技巧
- Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

- [731. 我的日程安排表 II (中等) +](https://leetcode.cn/submissions/detail/339069558/)  
  + 思路:TreeMap
- [814. 二叉树剪枝 (中等) +](https://leetcode.cn/submissions/detail/339979202/)  
  + 思路:这道题的难点在于要一直剪枝，直到没有值为 0 的叶子节点为止，只有从后序遍历位置自底向上处理才能获得最高的效率。
- [剑指 Offer II 115. 重建序列 (中等) +](https://leetcode.cn/submissions/detail/340704488/)  
  + 思路: 拓扑排序


### 2.Review:

- [MySQL-第 23 章 编写自定义存储引擎](https://dev.mysql.com/doc/internals/en/custom-engine.html)  

#### 点评：

- 概述
MySQL服务器以模块化方式构建：

存储引擎管理 MySQL 的数据存储和索引管理。MySQL服务通过定义的API与存储引擎进行通信。

每个存储引擎都是一个类，该类的每个实例通过指定的接口处理器(handler)与MySQL服务器进行通信。

处理程序基于需要使用指定的表的为每个线程的处理器(handler)进行实例化。例如：如果三个连接都开始使用同一个表，则需要创建三个处理程序实例。

创建处理程序实例后，MySQL服务器会向处理程序发出命令以执行数据存储和检索任务，例如打开表，操作行和管理索引。

自定义存储引擎可以逐步构建：开发人员可以从只读存储引擎开始，然后增加写入操作的支持，甚至稍后添加对索引、事务和其他高级操作的支持。INSERT UPDATE DELETE

- 创建存储引擎源文件
实现新存储引擎的最简单方法是从复制和修改存储引擎开始。这些文件和可以在MySQL 5.1源代码树的目录中找到。有关如何获取 5.1 源代码树的说明，请参阅从源代码安装 MySQL。EXAMPLEha_example.ccha_example.hstorage/example

复制文件时，请将名称从和更改为适合的存储引擎的名称，例如 和 。ha_example.ccha_example.hha_foo.ccha_foo.h

复制并重命名文件后，必须将 存储引擎的所有实例 都替换为 存储引擎的名称。如果熟悉 ，则可以自动完成以下步骤（在此示例中，存储引擎的名称将为 FOO）：EXAMPLEexamplesed

```
sed -e s/EXAMPLE/FOO/g -e s/example/foo/g ha_example.h > ha_foo.h
sed -e s/EXAMPLE/FOO/g -e s/example/foo/g ha_example.cc > ha_foo.cc
```

- 添加引擎特定的变量和参数
有关在命令行或配置文件上添加系统变量、状态变量和选项的更多信息，请参见第 5.5 节 “在插件中指定 mysqld 变量”。

- 创建处理程序
（处理程序单例的缩写）定义存储引擎，并包含指向应用于整个存储引擎的那些方法的方法的方法指针，而不是基于每个表工作的方法。此类方法的一些示例包括用于处理提交和回滚的事务方法。handlerton

下面是存储引擎中的一个示例：EXAMPLE

```
handlerton example_hton= {
  "EXAMPLE",
  SHOW_OPTION_YES,
  "Example storage engine",
  DB_TYPE_EXAMPLE_DB,
  NULL,    /* Initialize */
  0,       /* slot */
  0,       /* savepoint size. */
  NULL,    /* close_connection */
  NULL,    /* savepoint */
  NULL,    /* rollback to savepoint */
  NULL,    /* release savepoint */
  NULL,    /* commit */
  NULL,    /* rollback */
  NULL,    /* prepare */
  NULL,    /* recover */
  NULL,    /* commit_by_xid */
  NULL,    /* rollback_by_xid */
  NULL,    /* create_cursor_read_view */
  NULL,    /* set_cursor_read_view */
  NULL,    /* close_cursor_read_view */
  example_create_handler,    /* Create a new handler */
  NULL,    /* Drop a database */
  NULL,    /* Panic call */
  NULL,    /* Release temporary latches */
  NULL,    /* Update Statistics */
  NULL,    /* Start Consistent Snapshot */
  NULL,    /* Flush logs */
  NULL,    /* Show status */
  NULL,    /* Replication Report Sent Binlog */
  HTON_CAN_RECREATE
};
```

这是 from 的定义：handlertonhandler.h

```
typedef struct
  {
    const char *name;
    SHOW_COMP_OPTION state;
    const char *comment;
    enum db_type db_type;
    bool (*init)();
    uint slot;
    uint savepoint_offset;
    int  (*close_connection)(THD *thd);
    int  (*savepoint_set)(THD *thd, void *sv);
    int  (*savepoint_rollback)(THD *thd, void *sv);
    int  (*savepoint_release)(THD *thd, void *sv);
    int  (*commit)(THD *thd, bool all);
    int  (*rollback)(THD *thd, bool all);
    int  (*prepare)(THD *thd, bool all);
    int  (*recover)(XID *xid_list, uint len);
    int  (*commit_by_xid)(XID *xid);
    int  (*rollback_by_xid)(XID *xid);
    void *(*create_cursor_read_view)();
    void (*set_cursor_read_view)(void *);
    void (*close_cursor_read_view)(void *);
    handler *(*create)(TABLE *table);
    void (*drop_database)(char* path);
    int (*panic)(enum ha_panic_function flag);
    int (*release_temporary_latches)(THD *thd);
    int (*update_statistics)();
    int (*start_consistent_snapshot)(THD *thd);
    bool (*flush_logs)();
    bool (*show_status)(THD *thd, stat_print_fn *print, enum ha_stat_type stat);
    int (*repl_report_sent_binlog)(THD *thd, char *log_file_name, my_off_t end_offset);
    uint32 flags;
  } handlerton;
```

总共有30个处理程序元素，其中只有少数是必需的（特别是前四个元素和方法）。create()
1.存储引擎的名称。这是创建表时将使用的名称 （）。CREATE TABLE ... ENGINE = FOO;
2.用户发出命令时要在字段中显示的值。statusSHOW STORAGE ENGINES
3.存储引擎注释，使用命令时显示的存储引擎的说明。SHOW STORAGE ENGINES
4.唯一标识 MySQL 服务器中的存储引擎的整数。内置存储引擎使用的常量在文件中定义。自定义引擎应使用 。handler.hDB_TYPE_UNKOWN
5.指向存储引擎初始值设定项的方法指针。仅当服务器开始允许存储引擎类执行在实例化处理程序之前所需的任何内务处理时，才会调用此方法一次。
6.插槽。每个存储引擎在 中都有自己的内存区域（实际上是一个指针），用于存储每个连接的信息。它以 .插槽号在调用后由 MySQL 初始化。有关 的详细信息，请参见#Implementing回滚。thdthd->ha_data[foo_hton.slot]foo_init()thd
7.保存点偏移。为了存储每个保存点数据，存储引擎提供了一个请求大小的区域（如果不需要保存点内存）。0

保存点偏移必须静态初始化为存储每个保存点信息所需的内存大小。将其更改为存储点存储区域的偏移量后，存储引擎无需使用。有关详细信息，请参见#Specifying保存点偏移。foo_init
1.由事务性存储引擎使用，清理在其插槽中分配的任何内存。
2.指向处理程序的方法的方法指针。这用于创建保存点并将其存储在请求大小的内存中。savepoint_set()

有关详细信息，请参阅#Implementing savepoint_set方法。
1.指向处理程序的方法的方法指针。这用于在事务期间返回到保存点。它仅针对支持保存点的存储引擎进行填充。rollback_to_savepoint()

有关详细信息，请参阅#Implementing savepoint_rollback（） 方法。
1.指向处理程序的方法的方法指针。这用于在事务期间释放保存点的资源。可以选择为支持保存点的存储引擎填充它。release_savepoint()

有关更多信息，请参见实现 savepoint_release（） 方法。
1.指向处理程序的方法的方法指针。这用于提交事务。它仅针对支持事务的存储引擎进行填充。commit()

有关详细信息，请参阅#Implementing提交。
1.指向处理程序的方法的方法指针。这用于回滚事务。它仅针对支持事务的存储引擎进行填充。rollback()

有关详细信息，请参阅#Implementing回滚。
1.对于 XA 事务性存储引擎是必需的。准备要提交的事务。
2.对于 XA 事务性存储引擎是必需的。返回处于“已准备”状态的事务的列表。
3.对于 XA 事务性存储引擎是必需的。提交由 XID 标识的事务。
4.对于 XA 事务性存储引擎是必需的。由 XID 标识的回滚事务。
5.在创建游标时调用，以允许存储引擎创建一致的读取视图。
6.调用以切换到特定的一致读取视图。
7.调用以关闭特定的读取视图。
8.必需 - 构造并返回处理程序实例。

有关更多信息，请参见处理处理程序实例化。
1.当存储引擎在删除模式时需要执行特殊步骤（例如在使用表空间的存储引擎中）时使用。
2.在服务器关闭和崩溃期间调用的清理方法。
3.InnoDB-特定方法。
4.InnoDB-在 开始时调用的特定方法。SHOW ENGINE InnoDB STATUS
5.调用方法以开始一致读取。
6.调用以指示应将日志刷新到可靠存储。
7.在 的存储引擎上提供人类可读的状态信息。SHOW ENGINE foo STATUS
8.InnoDB-用于复制的特定方法。
9.指示存储引擎功能的处理程序标志。可能的值定义并复制到此处：sql/handler.h

```
#define HTON_NO_FLAGS                 0
#define HTON_CLOSE_CURSORS_AT_COMMIT (1 << 0)
#define HTON_ALTER_NOT_SUPPORTED     (1 << 1)
#define HTON_CAN_RECREATE            (1 << 2)
#define HTON_FLUSH_AFTER_RENAME      (1 << 3)
#define HTON_NOT_USER_SELECTABLE     (1 << 4)
```

HTON_ALTER_NOT_SUPPORTED用于指示存储引擎不能接受语句。存储引擎就是一个示例。 表示必须在表重命名后调用 。 表示当用户调用 时不应显示存储引擎。用于系统存储引擎，如二进制日志的虚拟存储引擎。ALTER TABLEFEDERATEDHTON_FLUSH_AFTER_RENAMEFLUSH LOGSHTON_NOT_USER_SELECTABLESHOW STORAGE ENGINES


### 3.Tip:

#### springboot 中 mybatis 连接池中 maxIdle,MaxActive,maxWait 参数

name：表示的连接池的名称也就是要访问连接池的地址
auth：是连接池管理权属性，Container表示容器管理
type：是对象的类型
driverClassName：是数据库驱动的名称
url：是数据库的地址
username：是登陆数据库的用户名
password：是登陆数据库的密码
maxIdle：最大空闲数，数据库连接的最大空闲时间。超过空闲时间，数据库连接将被标记为不可用，然后被释放。设为0表示无限制。
MaxActive：连接池的最大数据库连接数。设为0表示无限制。
maxWait：最大建立连接等待时间。如果超过此时间将接到异常。设为-1表示无限制。

```
<bean id="aaa" class="org.apache.commons.dbcp.BasicDataSource" destroy-method="close">
    <property name="driverClassName" value="oracle.jdbc.driver.OracleDriver" />
    <property name="url"
        value="jdbc:oracle:thin:@ip:port:cbdb" />
    <property name="username" value="aaa" />
    <property name="password" value="aaa" />
    <property name="maxActive" value="4000" />
    <property name="maxIdle" value="1000" />
    <property name="maxWait" value="30000" />
</bean>
```

#### springboot 中 mybatis sql 执行进行耗时统计

方法一：对 Mapper 接口做拦截器，通过拦截器统计耗时


```
1、引入aop包，使用aspect切面编程
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-aop</artifactId>
    </dependency>

2、定义一个注解，到时候对需要的方法进行注解
import java.lang.annotation.*;
 
@Target(value={ElementType.PARAMETER, ElementType.METHOD})
@Retention(value= RetentionPolicy.RUNTIME)
@Documented
public @interface Cost {
    String description()  default "";
}

3、编写aspect切面代码
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
 
 
@Aspect
@Component
public class MethodHandlerInterceptor {
    Logger logger = LoggerFactory.getLogger(MethodHandlerInterceptor.class);
    @Around("@annotation(com.xucf.aop.Cost)")
    public Object interceptor(ProceedingJoinPoint pjp) throws Throwable {
        long startTime = System.currentTimeMillis();
        Object object = pjp.proceed();
        long endTime = System.currentTimeMillis();
        logger.info( pjp.getSignature().getDeclaringType().getName() + "." + pjp.getSignature().getName() + " time consume " +(endTime - startTime) + " ms");
        return object;
    }
 
}

4、然后在mapper方法上加上这个注解
@Repository
public interface TestDao {
    @Cost
    List<Map> selectAll ();
}
```

方法二：用 mybatis 拦截器，对所有 sql 执行进行拦截

```
 
import org.apache.ibatis.executor.statement.StatementHandler;
import org.apache.ibatis.plugin.*;
import org.apache.ibatis.session.ResultHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
 
import java.sql.Statement;
import java.util.Properties;
 
@Component
@Intercepts({
        @Signature(
                type = StatementHandler.class,
                method = "query",
                args = {Statement.class, ResultHandler.class})
})
public class MyAop implements Interceptor {
    public static final Logger log = LoggerFactory.getLogger(MyAop.class);
    @Override
    public Object intercept(Invocation invocation) throws Throwable {
        Long b = System.currentTimeMillis();
        String sql = ((StatementHandler)invocation.getTarget()).getBoundSql().getSql();
        Object obj = invocation.proceed();
        log.info(sql + " cost " + (System.currentTimeMillis() - b) + "ms");
        return obj;
    }
    @Override
    public Object plugin(Object target) {
        return Plugin.wrap(target, this);
    }
    @Override
    public void setProperties(Properties properties) {
    }
}
```

### 4.Share:

- [使用Arthas trace定位并优化接口响应慢的问题](https://www.sunshanpeng.com/2019/11/28/%E4%BD%BF%E7%94%A8Arthas%20trace%E5%AE%9A%E4%BD%8D%E5%B9%B6%E4%BC%98%E5%8C%96%E6%8E%A5%E5%8F%A3%E5%93%8D%E5%BA%94%E6%85%A2%E7%9A%84%E9%97%AE%E9%A2%98/)  

- [Arthas实践：解决由于druid版本造成的慢sql问题](https://mp.weixin.qq.com/s?__biz=MzkxNDI0ODE0NQ==&mid=2247483958&idx=1&sn=f36434b2a53d533d29cf2497f694797f&source=41#wechat_redirect)

- [arthas线上性能分析及mysql执行计划调优](https://blog.csdn.net/weixin_42740540/article/details/112846414)

- [命令行交互-JCommander）](https://github.com/Sayi/sayi.github.com/issues/32)

- [分布式任务和单机定时任务的几种实现](https://juejin.cn/post/6844904198752960519)

- [Spring boot开启定时任务的三种方式](https://blog.csdn.net/qianlixiaomage/article/details/106599951)

- [Spring定时任务的几种实现](https://www.jianshu.com/p/fb3c768c2256)

- [Mybatis和jdbc的执行流程](https://blog.csdn.net/weixin_46217160/article/details/121387025)

- [MyBatis - SQL执行过程（十三）StatementHandler](https://blog.csdn.net/Zack_tzh/article/details/112281176)

- [MyBatis 核心配置综述之StatementHandler](https://www.cnblogs.com/cxuanBlog/p/11295488.html)

- [聊聊Mybatis[StatementHandler核心原理]](https://lasbun.github.io/2020/08/04/Mybatis-5/)