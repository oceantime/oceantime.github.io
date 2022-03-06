---
> **ARTS-week-07**
> 2021-02-21 20:23
---


## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm： 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

75. 颜色分类 https://leetcode-cn.com/submissions/detail/147257322/
167. 两数之和 II - 输入有序数组 https://leetcode-cn.com/submissions/detail/147268889/

### 2.Review:

https://tomassetti.me/improving-the-performance-of-an-antlr-parser/
提升antlr解析性能--Gabriele Tomassetti

#### 点评：

作者给出影响解析性能的几个方面：
- ANTLR 运行时不同
- 改变语法
- 处理表达式

性能优化建议：
- 合并子规则
- 避免前面的可选值
- 避免歧义
- 确保解析的是整个输入

深入 ANTLR 的内部结构优化:
- 更改预测模式：SLL和LL *
- 分析器分析
- 分析词法分析器
- ANTLR 缓存

### 3.Tip:

#### Apache Doris 使用 Docker 开发镜像编译(安装 Docker 省略)

1.apachedoris/doris-dev:build-env-1.2 版本
- JDK 为 1.8.0_211（需自己配置 jdk 环境变量）
- CMake 版本为 3.12.3
- gcc/g++ 为 7.3.0
- Bison 为 3.0.4

```java
# 1 拉取 Doris 官方提供的 Docker 镜像
#  可访问上面的连接，获取可用的镜像版本
#  目前可用版本有：build-env、build-env-1.1、build-env-1.2、、
docker pull apachedoris/doris-dev:build-env-1.2

# 2 查看 Docker 镜像 
docker images
#REPOSITORY              TAG                 IMAGE ID            CREATED             SIZE
#apachedoris/doris-dev   build-env-1.2       87dfd327471f        5 months ago        3.26GB
#apachedoris/doris-dev   build-env           fd75ea7306bf        21 months ago       3.85GB

# 3 运行镜像
# 3.1 方式一：直接运行
docker run -it apachedoris/doris-dev:build-env-1.2
# 3.2 方式二【推荐】：挂载本地文件
#  这种方式会将容器中的 maven 下载的包保存到宿主机本地指定的文件中，避免重复下载
#  同时会将编译的 Doris 文件保存到宿主机本地指定的文件，方便部署
docker run -it \
-v ./m2:/root/.m2 \
-v ./incubator-doris-DORIS-0.13.0-release/:/root/incubator-doris-DORIS-0.13.0-release/ \
apachedoris/doris-dev:build-env-1.2
# 3.3 以后台进程方式启动
#     将容器中的 22 暴露为宿主机的 20022 端口，这样方便 sftp 访问
#     若不需要 ssh 访问的可以不暴露 22 端口，也可以添加 --privileged=true --cap-add SYS_ADMIN
docker run -p 20022:22 -h "doris-dev" --name="apachedoris" \
--privileged=true --cap-add SYS_ADMIN \
-d apachedoris/doris-dev:build-env-1.2 /usr/sbin/init


# 4 docker 其它操作
# 4.1 查看 docker 容器进程
docker ps
#NER ID        IMAGE                                 COMMAND             CREATED             STATUS              PORTS                   NAMES
#4fadd7f85e44        apachedoris/doris-dev:build-env-1.2   "/usr/sbin/init"    32 seconds ago      Up 31 seconds       0.0.0.0:20022->22/tcp   frosty_raman

# 4.2 进入容器环境
docker exec -it $CONTAINER_ID_flag /bin/bash
```

2.dt-1.10.22 会下载失败,详细可查看 Issues #5128 或 PR [Thirdparty] Fix the DataTables.zip download issue。
因此 thirdparty/vars.sh 第 285-289 行修改为如下
```java
# datatables, bootstrap 3 and jQuery 3
DATATABLES_DOWNLOAD="https://datatables.net/download/builder?bs-3.3.7/jq-3.3.1/dt-1.10.23"  #DATATABLES_DOWNLOAD="https://datatables.net/download/builder?bs-3.3.7/jq-3.3.1/dt-1.10.22"
DATATABLES_NAME="DataTables.zip"
DATATABLES_SOURCE="DataTables-1.10.23"  #DATATABLES_SOURCE="DataTables-1.10.22"
DATATABLES_MD5SUM="f7f18a9f39d692ec33b5536bff617232"    #DATATABLES_MD5SUM="62558846fc6a6db1428e7816a2a351f7"
```

3.编译构建时默认使用 PARALLEL=$[$(nproc)/4+1] 进程资源数，如果CPU 进程资源充足，可以调大，修改 build.sh 脚本第 44 行 vim build.sh +44。

4.Plugin net.sourceforge.czt.dev:cup-maven-plugin:1.6-cdh or one of its dependencies could not be resolved
根据官方提供的问题解决方法，参考 PR #4769 ，我们直接修改 fe/pom.xml，如下图所示，保存后然后再次编译项目。
```xml
<!-- for general repository -->
<profile>
    <id>general-env</id>
    <activation>
        <property>
            <name>!env.CUSTOM_MAVEN_REPO</name>
        </property>
    </activation>

    <repositories>
        <repository>
            <id>central</id>
            <name>central maven repo https</name>
            <url>https://repo.maven.apache.org/maven2</url>
        </repository>
        <!-- for java-cup -->
        <repository>
            <!--
            <id>cloudera-thirdparty</id>
            <url>https://repository.cloudera.com/content/repositories/third-party/</url>
            -->
            <id>cloudera-public</id>
            <url>https://repository.cloudera.com/artifactory/public/</url>
        </repository>
        <!-- for bdb je -->
        <repository>
            <id>oracleReleases</id>
            <url>http://download.oracle.com/maven</url>
        </repository>
    </repositories>

    <pluginRepositories>
        <pluginRepository>
            <!--
            <id>spring-plugins</id>
            <url>https://repo.spring.io/plugins-release/</url>
            -->
            <url>https://repository.cloudera.com/artifactory/ext-release-local</url>
        </pluginRepository>
        <!-- for cup-maven-plugin -->
        <pluginRepository>
            <!--
            <id>cloudera-plugins</id>
            <url>https://repository.cloudera.com/content/groups/public/</url>
            -->
            <id>cloudera-public</id>
            <url>https://repository.cloudera.com/artifactory/public/</url>
        </pluginRepository>
    </pluginRepositories>
</profile>
```

### 4.Share:

https://blog.csdn.net/weixin_42003671/article/details/111282079
Doris 编译安装(完整版)

https://baijiahao.baidu.com/s?id=1672503631507777862&wfr=spider&for=pc
上亿数据怎么玩深度分页？兼容MySQL + ES + MongoDB

https://www.jianshu.com/p/33ef443bc05e
CentOS 7 设置自启动