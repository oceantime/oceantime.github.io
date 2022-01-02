---
title: ARTS-week-55
date: 2020-09-28 22:00:13
tags:
---


## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm： 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

Trapping Rain Water https://leetcode.com/submissions/detail/401829300/

### 2.Review:

https://towardsdatascience.com/data-engineering-how-to-set-dependencies-between-data-pipelines-in-apache-airflow-using-sensors-fc34cfa55fba
如何在 Apache Airflow 中设置数据管道之间的依赖关系

#### 点评：

作者 Nicholas Leong 提出作为数据工程师，能做的最好的事情就是建立有效的管道，以适应数据仓库本身的优点和缺点。

- 每个数据仓库都从数据源获取数据，并且可能是主数据库或该数据库的副本。我们认为运行ELT管道会更快，更省钱，因为它减轻了主数据库从服务器的负担。是目前在数据领域中非常普遍的做法。通常的议程是纯数据提取的原始表从午夜开始X个小时，导致这些表再转换X个小时以完成整个管道。
- 如此设计管道的原因是因为已转换表的第一级产生并取决于原始表提取的完成。然后，第二级转换表依赖于这些第一级转换表。因此，重要的是我们设置这些任务之间的依赖关系。如果尚未提取/转换原始表之一，则我们不希望执行该表的转换。这将导致数据不正确，这正是数据工程师应负的责任。

传感器
- Apache Airflow 作为我们的主要任务流管理。这样，我们可以有效地监视我们的工作流程，能够跟踪失败的任务。传感器预先内置在 Airflow 中。监控 Airflow 任何任务的完成状态就这么简单。我们将使用传感器设置 DAGS 管道之间的依赖关系，以便在依赖关系完成之前不会运行。无需为此编写任何自定义运算符。
- 执行增量可能很棘手，它取决于任务的执行时间，而不是运行时间。
- 超时参数是必需的。当管道扩展时，将运行许多传感器以检查完工情况。如果未设置超时且我们的某些依存关系失败，则传感器将无限期运行，并导致 Airflow 停止。这是因为 Airflow 仅允许在实例上运行一定数量的最大任务，并且传感器被视为任务。如果以某种方式达到该数字，Airflow 将不再处理其他任务。

结论：
  传感器可用于所有 Airflow 任务。想在查询运行后发送电子邮件吗？使用传感器

### 3.Tip:

使用 docker 部署 airflow

1.localExcutor 适用于那种不需要做横向扩展的情况,一般就是单机部署,它的好处是相对更加轻量,对资源的消耗更低,也不需要依赖消息队列.

```xml
version: '3.6'
services:
  postgres:
    image: postgres:latest
    environment:
      - POSTGRES_USER=airflow
      - POSTGRES_PASSWORD=airflow
      - POSTGRES_DB=airflow

  webserver:
    image: puckel/docker-airflow:latest
    restart: always
    depends_on:
      - postgres
    environment:
      - LOAD_EX=n
      - EXECUTOR=Local
    volumes:
      - ./dags:/usr/local/airflow/dags
      # Uncomment to include custom plugins
      # - ./plugins:/usr/local/airflow/plugins
    ports:
      - 8080:8080
    command: webserver
    healthcheck:
      test: ["CMD-SHELL", "[ -f /usr/local/airflow/airflow-webserver.pid ]"]
      interval: 30s
      timeout: 30s
      retries: 3
```


2.CeleryExcutor 可以借助消息队列实现横向扩展,适合有大量错综复杂任务流,且必须使用集群的的情况.

```xml
version: '3.6'
services:
  redis: #如果有外部的redis则可以不创建
    image: redis:latest
  broker: #如果有外部的rabbitmq则可以不创建
    image: rabbitmq:3.7-management

  postgres: #如果有外部的pg则可以不创建
    image: postgres:latest
    environment:
        - POSTGRES_USER=airflow
        - POSTGRES_PASSWORD=airflow
        - POSTGRES_DB=airflow

  airflow-webserver:
    image: puckel/docker-airflow:latest
    restart: always
    depends_on:
      - postgres
      - broker
      - redis
    environment:
      - LOAD_EX=n
      - FERNET_KEY=46BKJoQYlPPOexq0OhDZnIlNepKFf87WFwLbfzqDDho=
      - EXECUTOR=Celery
      - AIRFLOW__CELERY__BROKER_URL=amqp://guest:guest@broker:5672/
      - AIRFLOW__CELERY__RESULT_BACKEND=db+postgresql://airflow:airflow@postgres:3306/airflow
      # - POSTGRES_USER=airflow
      # - POSTGRES_PASSWORD=airflow
      # - POSTGRES_DB=airflow
      # - REDIS_PASSWORD=redispass
    volumes:
      - dags:/usr/local/airflow/dags
      # Uncomment to include custom plugins
      # - ./plugins:/usr/local/airflow/plugins
    ports:
      - 8080:8080
    networks:
      - net-output
    deploy:
      replicas: 1
      restart_policy:
        condition: on-failure
    command: webserver
    healthcheck:
      test: ["CMD-SHELL", "[ -f /usr/local/airflow/airflow-webserver.pid ]"]
      interval: 30s
      timeout: 30s
      retries: 3

  flower:
    image: puckel/docker-airflow:latest
    restart: always
    depends_on:
      - broker
      - redis
    environment:
      - EXECUTOR=Celery
      - AIRFLOW__CELERY__BROKER_URL=amqp://guest:guest@broker:5672/
      - AIRFLOW__CELERY__RESULT_BACKEND=db+postgresql://airflow:airflow@postgres:3306/airflow
      # - REDIS_PASSWORD=redispass
    networks:
      - net-output
    deploy:
      replicas: 1
      # restart_policy:
      #   condition: on-failure
    command: flower

  scheduler:
    image: puckel/docker-airflow:latest
    restart: always
    depends_on:
      - airflow-webserver
    volumes:
      - dags:/usr/local/airflow/dags
      # Uncomment to include custom plugins
      # - ./plugins:/usr/local/airflow/plugins
    environment:
      - LOAD_EX=n
      - FERNET_KEY=46BKJoQYlPPOexq0OhDZnIlNepKFf87WFwLbfzqDDho=
      - EXECUTOR=Celery
      - AIRFLOW__CELERY__BROKER_URL=amqp://guest:guest@broker:5672/
      - AIRFLOW__CELERY__RESULT_BACKEND=db+postgresql://airflow:airflow@postgres:3306/airflow
      # - POSTGRES_USER=airflow
      # - POSTGRES_PASSWORD=airflow
      # - POSTGRES_DB=airflow
      # - REDIS_PASSWORD=redispass
    deploy:
      replicas: 1
      # restart_policy:
      #   condition: on-failure
    command: scheduler

  worker:
    image: puckel/docker-airflow:latest
    restart: always
    depends_on:
      - scheduler
    volumes:
      - dags:/usr/local/airflow/dags
      # Uncomment to include custom plugins
      # - ./plugins:/usr/local/airflow/plugins
    environment:
      - FERNET_KEY=46BKJoQYlPPOexq0OhDZnIlNepKFf87WFwLbfzqDDho=
      - EXECUTOR=Celery
      - AIRFLOW__CELERY__BROKER_URL=amqp://guest:guest@broker:5672/
      - AIRFLOW__CELERY__RESULT_BACKEND=db+postgresql://airflow:airflow@postgres:3306/airflow
      # - POSTGRES_USER=airflow
      # - POSTGRES_PASSWORD=airflow
      # - POSTGRES_DB=airflow
      # - REDIS_PASSWORD=redispass
    deploy:
      replicas: 4
      # restart_policy:
      #   condition: on-failure
    command: worker

  networks:
    net-output:
      external: true
  volumes:
    dags:
      driver_opts:
      type: "nfs"
      o: "addr=10.40.0.199,nolock,soft,rw"
      device: ":/docker/dags"
```

### 4.Share:

https://zhuanlan.zhihu.com/p/43383509
airflow 实战总结