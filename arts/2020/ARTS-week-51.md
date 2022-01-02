---
title: ARTS-week-51
date: 2020-08-30 19:51:44
tags:
---


## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm： 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

Burst Balloons https://leetcode.com/submissions/detail/388446068/

### 2.Review:

https://link.zhihu.com/?target=https%3A//dev.to/lydiahallie/javascript-visualized-event-loop-3dif
数据分析和可视化采用的状态

#### 点评：

Lydia Hallie，通过生动形象的动画，以更加直观的方式，向开发者展示 Git 命令中的 merge、rebase、reset、revert、cherry-pick 等常用骚操作的具体原理。

1.合并（Merge） 当我们在不同分支开发完代码后，会选择将分支进行合并（merge）。平时常用的 git merge 操作，又可分为这两种类型：fast-forwar 和 no-fast-forward。
- fast-forward 一般情况下，Git 会默认使用 fast-forward 这种类型来处理分支合并，当我们成功合并后，不会产生任何提交记录，且当旧分支被移除后，其分支信息也会被一并删除。
- no-fast-forward 而当我们使用 no-fast-forward 模式，即在合并分支命令加入 --no-ff 后缀的方式运行时，便会生成一个新的提交记录。

2.合并冲突 在我们日常进行团队协作开发的时候，总会出现同个文件在不同分支上被同时编辑的情况。这样，当我们提交代码的时候，比较晚提交的另一方，在运行 Git 命令时就会报冲突错误。在正常情况下，只要我们手动处理下冲突文件，然后再重新提交即可。

3.Rebase 在进行分支合并前，我们一般会先使用 pull 命令拉取线上的最新代码，在保证无任何冲突发生的前提下，再进行分支合并。但是，这种代码拉取方式是最为简单粗暴的，通过这种方式合并，会使得整个提交记录看起来特别乱，不太直观与优雅。因此，对 Git 使用比较规范、追求比较高的程序员，都会先使用rebase整理下提交记录，再提交代码。

4.Hard Reset 日常开发中，我们可能会因为提交了某些无用代码而进行回滚操作。通常在只有一个人独立开发的项目情况下，会选用--hard命令来进行回滚处理。不过，这种操作方式有个不好的地方，在多人协作的时候，这么搞很容易使分支出现冲突，或直接毁掉别人的提交记录。


### 3.Tip:

Fair Scheduler 

默认公平调度调度策略仅仅基于内存资源，通过使用 DRF(Dominant Resource Fairness) 能够配置基于内存和CPU资源任务调度。当只有一个应用运行的时候，该应用能够使用整个集群。当其他应用提交到集群，空闲出来的资源将分配给新提交的应用，这样每个应用能够得到大致相同的资源。Hadoop 默认调度器，形成一个应用的队列，如此小应用可以在一个合理时间范围内完成，并且不会让大应用长时间等待资源。这也是一个合理方式在许多用户中分享集群资源。最后，公平调度可以设置应用的优先度，设置优先度权重决定应用占用资源比例。


1. 可插入策略的分层队列
公平调度可以配置自定义的调度策略，比如 FifiPolicy, FairSharePolicy, DominantResourceFairnessPolicy 使用公平调度需要在 yarn-site.xml 中配置如下内容

```xml
<property>
  <name>yarn.resourcemanager.scheduler.class</name>
  <value>org.apache.hadoop.yarn.server.resourcemanager.scheduler.fair.FairScheduler</value>
</property>
```

配置公平调度主要包含两个文件，首先是 yarn-site.xml，在 Hadoop 配置目录下，其次需要创建一个配置文件 fair-scheduler.xml，主要配置队列的权重和资源容量等。

```xml
<?xml version="1.0"?>
<allocations>
  <queue name="sample_queue">
    <minResources>10000 mb,0vcores</minResources>
    <maxResources>90000 mb,0vcores</maxResources>
    <maxRunningApps>50</maxRunningApps>
    <maxAMShare>0.1</maxAMShare>
    <weight>2.0</weight>
    <schedulingPolicy>fair</schedulingPolicy>
    <queue name="sample_sub_queue">
      <aclSubmitApps>charlie</aclSubmitApps>
      <minResources>5000 mb,0vcores</minResources>
    </queue>
  </queue>

  <queueMaxAMShareDefault>0.5</queueMaxAMShareDefault>
  <queueMaxResourcesDefault>40000 mb,0vcores</queueMaxResourcesDefault>

  <!-- Queue 'secondary_group_queue' is a parent queue and may have
       user queues under it -->
  <queue name="secondary_group_queue" type="parent">
  <weight>3.0</weight>
  </queue>

  <user name="sample_user">
    <maxRunningApps>30</maxRunningApps>
  </user>
  <userMaxAppsDefault>5</userMaxAppsDefault>

  <queuePlacementPolicy>
    <rule name="specified" />
    <rule name="primaryGroup" create="false" />
    <rule name="nestedUserQueue">
        <rule name="secondaryGroupExistingQueue" create="false" />
    </rule>
    <rule name="default" queue="sample_queue"/>
  </queuePlacementPolicy>
</allocations>
```

2. 队列访问控制列表
ACLs 对队列进行控制，管理哪些用户可以访问特定队列。主要包括了 aclSubmitApps 和 aclAdministerApps 配置项，每个队列都可以配置这两个参数。


### 4.Share:

https://bgbiao.top/post/sre%E8%BF%90%E7%BB%B4%E4%BD%93%E7%B3%BB/
sre 运维体系
https://blog.csdn.net/qq_26222859/article/details/79374836
Fair Scheduler 与 Capacity Scheduler 比较