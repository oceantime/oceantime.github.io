---
> **ARTS-week-02**
> 2021-01-16 17:45
---


## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm: 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

208. 实现 Trie (前缀树) https://leetcode-cn.com/submissions/detail/138944307/
211. 添加与搜索单词 - 数据结构设计 https://leetcode-cn.com/submissions/detail/138968634/
677. 键值映射 https://leetcode-cn.com/submissions/detail/138988183/

### 2.Review:

https://towardsdatascience.com/visualize-programming-language-popularity-using-tiobeindexpy-f82c5a96400d
使用tiobeindexpy可视化分析编程语言排名

#### 点评：

作者：AdbulMajedRaja RS 建议始终关注编程世界中发生变化，TIOBE是一个组织，它每月为编程语言创建一个索引并持续跟踪其变化。
作者通过 jupyter 演示如何通过 tiobeindexpy 基于TIOBE索引可视化分析编程语言的排名。

目的在练习结束时，将尝试实现三件事：
- 最受欢迎的 20 种流行编程语言是什么
- 热度排名前 5 位的编程语言
- 下降排名前 5 位的编程语言

总结：
    数据表明当一种新趋势出现时，Python 多次出现，并以此方式成为排行榜出现次数最多的语言之一。 

### 3.Tip:

1. 使用 netstat、lsof 查看端口占用情况

netstat 用来查看系统当前系统网络状态信息，包括端口，连接情况等

```shell
# 常用方式如下：

netstat -atunlp

# 各参数含义如下:

-t : 指明显示TCP端口
-u : 指明显示UDP端口
-l : 仅显示监听套接字(LISTEN 状态的套接字)
-p : 显示进程标识符和程序名称，每一个套接字/端口都属于一个程序
-n : 不进行DNS解析
-a 显示所有连接的端口
```

lsof 的作用是列出当前系统打开文件(list open files)，不过通过 -i 参数也能查看端口的连接情况，-i 后跟冒号端口可以查看指定端口信息，直接 -i 是系统当前所有打开的端口。

```shell
# 查看22端口连接情况，默认为sshd端口

lsof -i:22

```

2. 基于 Dockerfile 编译、打包、运行 java 工程

- 找到待部署的项目，在 pom.xml 同级目录下添加 Dockerfile：　

```txt
# VERSION 1.0.0
# Author: oceantime
# 打包 jar 采用 maven 镜像
FROM maven:3.5.2-jdk-8-alpine AS MAVEN_BUILD
MAINTAINER oceantime <oceantime@gmail.com>
# 工作目录在镜像的 /build 目录下
WORKDIR /build/
# 把本地的 pom.xml 和 src 目录 复制到镜像的 /build 目录下
COPY pom.xml /build/
COPY src /build/src/
# 执行 maven 打包
RUN mvn package
# 运行 jar 采用 jdk 基础镜像
FROM openjdk:8-jdk-alpine
# 设置工作目录在镜像的 /app 目录下
WORKDIR /app
# 将 jar 包添加到容器中并更名为 app.jar
COPY --from=MAVEN_BUILD /build/target/********-1.0-SNAPSHOT.jar /app/
# 运行 jar 包
ENTRYPOINT ["java","-jar","********-1.0-SNAPSHOT.jar"]
```

- 制作 docker 镜像：　

```txt
docker build -t **********:1.0 .
```

3. redash docker 部署

- 从 github.com/getredash/r… 拉取代码，创建 docker-compose.production.yml

主要修改：
1.增加 redis 和 postgres 的 db 文件与宿主机的映射，不让 docker 容器停止后数据丢失。
2.增加 redis 和 postgres 的端口映射，方便调试，线上环境也可以关掉。
3.修改 REDASH_COOKIE_SECRET。

docker-compose.production.yml 文件如下：

```xml
version: '3'
services:
  server:
    image: redash_oracle:latest
    command: server
    ports:
      - "5000:5000"
    links:
      - postgres
      - redis
    environment:
      PYTHONUNBUFFERED: 0
      REDASH_LOG_LEVEL: "INFO"
      REDASH_REDIS_URL: "redis://redis:6379/0"
      REDASH_DATABASE_URL: "postgresql://postgres@postgres/postgres"
      REDASH_COOKIE_SECRET: "123456"
      REDASH_WEB_WORKERS: 4
  worker:
    image: redash_oracle:latest
    command: scheduler
    environment:
      PYTHONUNBUFFERED: 0
      REDASH_LOG_LEVEL: "INFO"
      REDASH_REDIS_URL: "redis://redis:6379/0"
      REDASH_DATABASE_URL: "postgresql://postgres@postgres/postgres"
      REDASH_COOKIE_SECRET: "123456"
      QUEUES: "queries,scheduled_queries,celery"
      WORKERS_COUNT: 2
    restart: always
  redis:
    image: redis:3.0-alpine
    ports:
    - "6379:6379"
    volumes: 
      - ./data/redis_data:/data
    restart: always
  postgres:
    image: postgres:9.5.6-alpine
    ports:
    - "5432:5432"
    volumes:
      - ./data/postgresql_data:/var/lib/postgresql/data
    restart: always
  nginx:
    image: redash/nginx:latest
    ports:
      - "88:80"
    depends_on:
      - server
    links:
      - server:redash
    restart: always
```

- 创建 redash_oracle 镜像

```shell
# 创建 redash 镜像
git clone https://github.com/getredash/redash
cd redash
docker build -t redash:latest .

# 创建 redash 镜像
cd ..
git clone https://github.com/joaoleite/redash_oracle
cd redash_oracle
docker build -t redash_oracle:latest .

# 创建 redash 镜像
cd ../redash
docker-compose -f docker-compose.production.yml run --rm server create_db
docker-compose -f docker-compose.production.yml up
```

- 创建 docker 集群

```shell
# 创建 db
cd ../redash
docker-compose -f docker-compose.production.yml run --rm server create_db

# 运行
docker-compose -f docker-compose.production.yml up
```

### 4.Share:

https://blog.csdn.net/Small_Tsky/article/details/106799380?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromBaidu-1.control&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromBaidu-1.control
Typora数学公式大全

https://blog.csdn.net/cookie923/article/details/86747495
Windows10中通过命令行启动Sublime Text3

https://blog.csdn.net/lxhandlbb/article/details/80754252
【思维导图】Parquet Orc CarbonData 三种列式存储格式对比

https://www.cnblogs.com/felixzh/p/9094694.html
数据可视化的开源方案: Superset vs Redash vs Metabase (一)
