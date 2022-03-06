---
> **ARTS-week-01**
> 2021-01-10 15:57
---


## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm： 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

303. 区域和检索 - 数组不可变 https://leetcode-cn.com/submissions/detail/137351836/
307. 区域和检索 - 数组可修改 https://leetcode-cn.com/submissions/detail/137352154/

### 2.Review:

http://medium.com/a-journey-with-go/go-fan-out-pattern-in-our-etl-9357a1731257
go语言ETL中的扇出模式

#### 点评：

作者：Vincent Blanchon 介绍Go在构建命令行应用程序方面非常强大，作者给出基于扇出模式构建ETL示例。ETL（提取，转换，加载）通常需要处理大量数据，这种情况下，为ETL制定良好的并发策略可能对性能产生很大的影响。

Fan in（扇入）模式：
- 多个功能可以从同一个管道读取消费数据，直到通道关闭

Fan out（扇出）模式：
- 一个功能可以从多个输入中读取并继续进行操作，直到将所有输入通道复用到一个在所有输入都关闭时关闭的通道上，将所有通道关闭。


总结：
    扇入模式可以解决加载过程中网络延迟，可以在保持分离业务逻辑的同时利用并发性。多个执行器分布式处理可以轻松解决业务流高峰期的负载。

### 3.Tip:

1. JAVA 中 SimpleDateFormat yyyy 和 YYYY 的区别

参数说明：
- yyyy：Y 表示的是 year
- YYYY：Y 表示的是 Week year

```java
//Week year意思是当天所在的周属于的年份，一周从周日开始，周六结束，只要本周跨年，那么这周就算入下一年
public static void main(String[] args) {
    Calendar calendar = Calendar.getInstance();
    // 2020-12-26
    calendar.set(2020, Calendar.DECEMBER, 26);
    Date strDate1 = calendar.getTime();
    
    SimpleDateFormat f1 = new SimpleDateFormat("YYYY-MM-dd");
    System.out.println("Result for YYYY: " + f1.format(strDate1));
    
    SimpleDateFormat f2 = new SimpleDateFormat("yyyy-MM-dd");
    System.out.println("Result for yyyy: " + f2.format(strDate1));
}
```

2. Intellij IDEA 修改默认 Target bytecode version

- 在工程 pom.xml 中添加　

```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-compiler-plugin</artifactId>
            <version>3.3</version>
            <configuration>
                <source>1.8</source>
                <target>1.8</target>
            </configuration>
        </plugin>
    </plugins>
</build>
```

3. yum-config-manager 命令找不到的解决方法

- yum-config-manager: command not found 这个命令在 yum-utils 包里，可以通过命令安装就可以了

```shell
yum -y install yum-utils
```

4. 解决离线下缺少 libssl-dev 问题

```shell
sudo  apt-get  install  libssl-dev
有时候会出现安装失败的情况

可以先执行
sudo  apt-get  update 然后执行 sudo  apt-get  install  libssl-dev
```

5. linux 下如何打包链接文件

- tar 参数
-c ：建立一个压缩文件的参数指令(create 的意思)。
-x ：解开一个压缩文件的参数指令。
-t ：查看 tarfile 里面的文件。特别注意，在参数的下达中，c/x/t 仅能存在一个，不可同时存在， 因为不可能同时压缩与解压缩。
-z ：使用gzip进行压缩打包文档。
-j ：使用bzip2进行压缩打包文档。
-v ：压缩的过程中显示文件。这个常用，但不建议用在背景执行过程。
-f ：使用档名。请留意，在 f 之后要立即接档名，不要再加参数。
例如使用“tar -zcvfP tfile sfile”就是错误的写法，要写成“tar -zcvPf tfile sfile”才对。
(关于这点我保留意见，因为平时我解压，都是-xvfz….没见有神马不对的….也许是改进了？)
-p ：使用原文件的原来属性（属性不会依据使用者而变）。
-P ：可以使用绝对路径来压缩。
-N ：比后面接的日期(yyyy/mm/dd)还要新的才会被打包进新建的文件中。
–exclude FILE：在压缩的过程中，不要将 FILE 打包。

```shell
-h, --dereference          follow symlinks; archive and dump the files they  point to
    --hard-dereference     follow hard links; archive and dump the files they refer to

# 大致意思就是可以存储指向、引用文件（软链接、硬链接）
压缩命令如：tar -chvf xxx.tar xxx/
```

### 4.Share:

https://cloud.tencent.com/developer/article/1676915
ES分页看这篇就够了

https://mp.weixin.qq.com/s/g4N9oXP4eage7wW4yBalSA
当 TiDB 与 Flink 相结合：高效、易用的实时数仓

https://draveness.me/golang/docs/part4-advanced/ch08-metaprogramming/golang-plugin/
Go 语言插件系统

https://www.jianshu.com/p/529cdc72b64a?utm_campaign=maleskine&utm_content=note&utm_medium=seo_notes&utm_source=recommendation
centos7上rpm离线安装docker18

https://www.cnblogs.com/yanqingyang/p/12731855.html
Ubuntu中安装Cmake