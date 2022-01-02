---
title: ARTS-week-27
date: 2021-07-10 19:20:28
tags:
---


## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm： 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

225. 用队列实现栈：https://leetcode-cn.com/submissions/detail/193781077/

981. 基于时间的键值存储：https://leetcode-cn.com/submissions/detail/194088771/

面试题 17.10. 主要元素：https://leetcode-cn.com/submissions/detail/193781077/

### 2.Review:

https://mtyurt.net/post/spring-how-to-handle-ioexception-broken-pipe.html
spring 如何处理 broken pipe IO异常

#### 点评：

当客户端关闭连接时，其请求仍在服务器中处理时，将抛出 IOExceptionClientAbortException。 这是一个有点棘手的处理在 spring MVC 框架，我会在这篇文章解释如何做到这一点。

- 为什么它很棘手？
我们可以处理以 @ExceptionHandler 注释的方法的例外。首先想到的是处理完例外后，我们可以返回适当的响应，对不对？这是我一开始尝试过的，但它不起作用，因为服务器无法返回响应，连接已断开。那么，我们怎样才能告诉 Spring 连接已断开，不要再做任何事情了？

- 解决方法：
```java
@ExceptionHandler(IOException.class)
@ResponseStatus(HttpStatus.SERVICE_UNAVAILABLE)   //(1)
public Object exceptionHandler(IOException e, HttpServletRequest request) {
    if (StringUtils.containsIgnoreCase(ExceptionUtils.getRootCauseMessage(e), "Broken pipe")) {   //(2)
        return null;        //(2) socket is closed, cannot return any response    
    } else {
        return new HttpEntity<>(e.getMessage());  //(3)
    }
}
```
(1) 在处理异常处理程序的结果时，春季框架检查状态代码。返回空和设置响应的组合正确处理了 broken pipe 错误。
(2) 真正的例外在于根本原因，我们不想抛弃每一个都有。因此，我们需要筛选出消息的例外。为了更安全，我想得到根本原因的信息。apache 常见的包有相当不错的实用程序的例外，我们将使用  ExceptionUtils.getRootCauseMessage 检索根因。
(3) 正如我上面提到的，我们不想处理每一个有，这是一个典型的代码味道。这里的处理者应遵循单一的责任原则，只处理 broken pipe 错误。IOException

总结：我只是直观地解决了这个问题。希望它能减少您的调试时间。。

### 3.Tip:

#### GOLANG 连接 Mysql 的时区问题

1.1 使用 go-sql-driver 来连接 mysql 数据库，获取的时区默认是 UTC+0 的，与本地的东八区是有区别，在业务处理中会出现问题：
1.2 获取mysql中的日期，是string类型，需要在代码中用time.Parse进行转化：

解决方案：
- 在连接的dsn中，添加parseTime=true 和loc=Local，此处的local可以换为具体的时区(Asia/Shanghai)

```go
package main

import (
    "database/sql"
    "fmt"
    "time"

    _ "github.com/go-sql-driver/mysql"
)

func main() {
    db, err := sql.Open("mysql", 
    "bp:123456@tcp(10.13.4.161:3309)/bp_members?parseTime=true&loc=Local")

    var myTime time.Time
    rows, err := db.Query("SELECT current_timestamp()")
    fmt.Println(time.Now())
    if rows.Next() {
        if err = rows.Scan(&myTime); err != nil {
            panic(err)
        }
    }

    fmt.Println(myTime)
}

#运行结果，已经一致了
2017-05-27 11:26:32.387955955 +0800 CST
2017-05-27 11:26:32 +0800 CST
```


####  使用 Jasypt 对 SpringBoot 配置文件加密

```xml
<dependency>
    <groupId>com.github.ulisesbocchio</groupId>
    <artifactId>jasypt-spring-boot-starter</artifactId>
    <version>2.0.0</version>
</dependency>
```

1.1 java 生成要加密的字符串：

```java
public static void main(String[] args) {
    BasicTextEncryptor textEncryptor = new BasicTextEncryptor();
    //加密所需的密钥
    textEncryptor.setPassword("G0CvDz7oJn6");
    //要加密的数据（数据库的用户名或密码）
    String username = textEncryptor.encrypt("root");
    String password = textEncryptor.encrypt("root123");
    System.out.println("username:"+username);
    System.out.println("password:"+password);
}

输出信息为:
username:i8QgEN4uOy2E1rHzrpSTYA==
password:6eaMh/RX5oXUVca9ignvtg==
```

1.2 shell 生成要加密的字符串：

```shell
默认加密方式PBEWithMD5AndDES , 可以更改为PBEWithMD5AndTripleDES

加密命令:
java -cp 自己jar包的地址 org.jasypt.intf.cli.JasyptPBEStringEncryptionCLI input=“自己需要加密的字符串” password=“自己加密时的盐” algorithm=“自己的加密方式”

解密命令:
java -cp 自己jar包的地址 org.jasypt.intf.cli.JasyptPBEStringDecryptionCLI input=“自己需要解密的字符串” password=“自己加密时的盐” algorithm=“自己的加密方式”


java -cp jasypt-1.9.2.jar org.jasypt.intf.cli.JasyptPBEStringEncryptionCLI password=G0CvDz7oJn6 algorithm=PBEWithMD5AndDES input=root
输出信息为:
----ENVIRONMENT-----------------
Runtime: Oracle Corporation Java HotSpot(TM) 64-Bit Server VM 25.171-b11

----ARGUMENTS-------------------
input: root
algorithm: PBEWithMD5AndDES
password: G0CvDz7oJn6

----OUTPUT----------------------
Gvkoz+sbFWiRe3ECtizV1A==
```

1.3 配置 properties 文件：

```yml
# 加密所需的密钥
jasypt.encryptor.password=G0CvDz7oJn6
# 默认加密方式PBEWithMD5AndDES,可以更改为PBEWithMD5AndTripleDES
# jasypt.encryptor.algorithm=PBEWithMD5AndDES
spring.datasource.username=ENC(6eaMh/RX5oXUVca9ignvtg==)
spring.datasource.password=ENC(6eaMh/RX5oXUVca9ignvtg==)
```

1.4 部署时配置密钥值

```shell
# 为了防止密钥泄露,反解出密码.可以在项目部署的时候使用命令传入密钥值
java -jar -Djasypt.encryptor.password=G0CvDz7oJn6 xxx.jar

# 或者在服务器的环境变量里配置,进一步提高安全性
打开/etc/profile文件
vim /etc/profile

文件末尾插入
export JASYPT_PASSWORD = G0CvDz7oJn6

编译 
source /etc/profile

运行 
java -jar -Djasypt.encryptor.password=${JASYPT_PASSWORD} xxx.jar

```


### 4.Share:

https://www.dyxmq.cn/other/windows/win10-ubuntu.html
Win10 自带 ubuntu 的安装和使用

https://www.cnblogs.com/rickiyang/p/11074171.html
Go 中的 fmt 几种输出的区别和格式化方式
