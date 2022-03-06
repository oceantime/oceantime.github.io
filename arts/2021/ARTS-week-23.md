---
> **ARTS-week-23**
> 2021-06-13 21:09
---


## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm： 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

518. 零钱兑换 II：https://leetcode-cn.com/submissions/detail/186702661/
494. 目标和：https://leetcode-cn.com/submissions/detail/186702529/
852. 山脉数组的峰顶索引：https://leetcode-cn.com/submissions/detail/186702150/

### 2.Review:

https://www.infoworld.com/article/3446026/rockset-review-real-time-sql-for-operational-data.html
用于操作数据的实时 SQL-用于运营分析的独一无二的数据库可在几毫秒内分析 GB 到 TB 的最新、实时和流数据

#### 点评：

Rockset 可以分析 GB 到 TB 的最新、实时和流数据，并且具有允许大多数查询在几毫秒内运行的索引。

- 优点
 - 能够在几毫秒内分析千兆字节到太字节的实时数据
 - 使用带有 JSON 数据扩展的标准 SQL
 - 仅对活动数据的存储收费
 - 用作操作仪表板、嵌入式分析、物联网应用程序、个性化和 360 度客户分析的数据层
- 缺点
 - 不适用于本地部署
 - 目前仅在 AWS 上运行


### 3.Tip:

#### celery 无密码连接 redis 与带密码连接 redis

```java
//带密码 
app = Celery('celery_tasks.tasks', broker='redis://:password@127.0.0.1:6379/0')
//无密码 
app = Celery('celery_tasks.tasks', broker='redis://:@127.0.0.1:6379/0')
```


#### docker-compose 安装 redis

1.1 创建 docker-compose.yml：

```sql
vim docker-compose.yml
```

```sql
version: '2'
services:
    redis:
      image: redis:5.0.0
      container_name: redis
      command: redis-server --requirepass 123456
      ports:
        - "16379:6379"
      volumes:
        - ./data:/data
```

1.2 在 yml 文件所在的目录下执行下面命令启动容器：

```sql
docker-compose up -d
docker ps
```


### 4.Share:

https://blog.csdn.net/weixin_39032019/article/details/108452901
两种列式存储格式：Parquet和ORC

https://blog.csdn.net/run_bigdata/article/details/101048476
为什么我们选择parquet做数据存储格式
