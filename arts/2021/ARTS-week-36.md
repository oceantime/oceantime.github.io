---
> **ARTS-week-36**
> 2021-09-04 08:04
---


## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm： 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

面试题 17.14. 最小K个数：https://leetcode-cn.com/submissions/detail/214616895/

225. 用队列实现栈：https://leetcode-cn.com/submissions/detail/215770934/

622. 设计循环队列：https://leetcode-cn.com/submissions/detail/215776682/

### 2.Review:

https://github.com/romenrg/evergreen-skills-developers
如何提升职场竞争力？开发人员必须要有这些能力

#### 点评：

非技术技能

核心技能（又名“软”技能）
- 沟通
  - 遵守电子邮件的信件规则（例如一些电子邮件礼仪规则）
  - 遵循聊天时的规则（例如使用线程来组织讨论，其他来自 Slack 的最佳实践）
  - 减少对别人的干扰
  - 有礼貌

- 团队合作
  - 锻炼共情
  - 不自负
  - 做一个积极的倾听者
  - 做一个好的导师
  - 分享知识
  - 参与建设性的决策

- 创新和（自我）管理能力
  - 开发过程
  - 了解敏捷软件开发原则
  - 熟悉迭代和增量开发
  - 有自组织能力
  - 避免产生错误的期望（例如时间预期）
  - 关注优先级和业务价值

- 解决问题的能力
  - 运用科学方法
  - 研究技能
  - 横向思维
  - 抽象
  - 创造力
  - 5个“为什么”
  - 风险管理

- 心态
  - 不要害怕改变
  - 敢于失败
  - 做一个终身学习者
  - 理性：质疑决策，“用事实来说话”


技术技能
- 一般的技术知识
  - 基础
    - 基本控制结构和布尔代数    
    - 面向对象编程    
    - SOLID，GRASP    
    - 函数式编程（纯函数，递归…）    
    - 声明式编程与命令式编程


  - 数据结构
    - 基本结构（基本类型、数组、矩阵、对象…）    
    - 缓存/默记法    
    - 哈希码、令牌、编码（例如 Base64）


  - 干净代码
    - 自解释的代码    
    - 使用好的命名（文件、变量、类、函数…）    
    - 避免长函数和类    
    - 提取复杂的布尔条件到函数    
    - 使用轻量级文档，而不是内联注释    
    - 语义版本控制  

  - 源代码管理
    - CVS（控制版本系统）/ SCM（源代码管理）基础：分支、标签、集中与分散…
    - SCM vs 存储库管理 / 托管（即 Git 和 GitHub 的区别）
    - 理解为什么版本控制很重要
    - 提交最佳实践（微提交 / 原子提交、良好的描述……）
    - 特性分支（短暂）
    - Trunk-based 发展
    - 依赖管理（包管理器的重要性、依赖地狱的风险...）

  - 技术合作
    - Pull Request 最佳实践
    - 在执行代码检查时，关注相关的部分
    - 结对编程最佳实践

  - DevOps实践
    - 构建自动化
    - 编写自动化测试
    - 单元测试、集成测试和系统测试的区别
    - 测试金字塔
    - 持续集成
    - 持续交付与部署
    - 功能标志 / 功能切换

- 领域的技术知识
  - 前端开发
    - DOM（定义、理解、虚拟 DOM…）
    - 响应式设计（目的、优点、渐进增强……）
    - API 标准：REST / SOAP
    - 状态管理（相关问题、无状态方法…）
    - MVC 和衍生品
    - WebSockets


  - 后端开发
    - 关系数据库（如何工作、基本概念…）
    - 批处理进程 /  Cron Jobs
    - 数据库设计
    - ORM
    - 会话处理
    - 错误处理、审计和日志记录


  - 架构和基础设施
    - 外部化配置
    - 一切都是代码（例如配置是代码、基础设施是代码、文档是代码…）
    - Microservices
    - 虚拟机 vs 容器
    - 主从模式
    - 客户端-服务器模式
    - IAAS，PAAS，SASS

  - 安全
    - 公开密钥密码系统（如RSA）
    - 最小特权原则
    - DoS / DDoS
    - SQL 注入
    - 中间人攻击
    - XSS 和 CSRF

  - 扩展和优化
    - 负载平衡
    - 冗余
    - 延迟
    - 延迟加载

  - 并发性
    - 竞态条件
    - 死锁
    - 互斥

### 3.Tip:

#### [ElasticSearch] API

query string search:ES为我们提供的一种检索方式。下面这行请求就是典型的通过 query string search的方式进行检索。
```
GET /your_index/your_type/_search?q=*&sort=account_number:asc&pretty
```
q=* ，表示匹配index=bank的下的所有doc，sort=account_number:asc表示告诉ES，结果按照account_number字段升序排序，pretty是告诉ES，返回一个漂亮的json格式的数据。

上面的q还可以写成下面这样：
```language
GET /your_index/your_type/_search?q=自定义field:期望的值
GET /your_index/your_type/_search?q=+自定义field:期望的值
GET /your_index/your_type/_search?q=-自定义field:期望的值
```

解读ES返回的响应如下:
```json
{
  "took" : 63,// 耗费的时间
  // 是否超时了，默认情况下不存在time_out,比如的搜索耗时1分钟，它就等1分钟，但是不超时
  // 在发送搜索请求时可以指定超时时间
  // 比如指定了10ms超时，它就会把这10ms内获得的数据返回给
  "timed_out" : false,
  "_shards" : { // 的搜索请求打到了几个shard上面去。
    // Primary Shard可以承接读、写流量。Replica Shard会承接读流量。
    // 因为我是默认配置，有五个primary shard。
    // 所以它的搜索请求会被打到5个分片上去，并且都成功了
    "total" : 5,
    "successful" : 5,
    "skipped" : 0,// 跳过了0个
    "failed" : 0 // 失败了0个
  },
  "hits" : {//命中的情况
    "total" : 1000,// 命中率 1000个
    // _score 全文检索时使用，这个相关性得分越高，说明doc和检索的内容的越相关、越匹配
    // max_score就是最大的 _score
    "max_score" : null,
    // 默认查询前10条，直接返回每个doc的完整数据
    "hits" : [ {
      "_index" : "bank",// 索引
      "_type" : "_doc",// type
      "_id" : "0",// id
      "sort": [0],
      "_score" : null,// 相关性得分
      // _source里面存放的是doc的具体数据
      "_source" :     {"account_number":0,
                       "balance":16623,
                       "firstname":"Bradshaw",
                       "lastname":"Mckenzie",
                       "age":29,
                       "gender":"F",
                       "address":"244 Columbus Place",
                       "employer":"Euron",
                       "email":"bradshawmckenzie@euron.com",
                       "city":"Hobucken",
                       "state":"CO"}
        },
     {
      "_index" : "bank",
      "_type" : "_doc",
      "_id" : "1",
      "sort": [1],
      "_score" : null,
      "_source" : {"account_number":1,
                   "balance":39225,
                   "firstname":"Amber",
                   "lastname":"Duke",
                   "age":32,
                   "gender":"M",
                   "address":"880 Holmes Lane",
                   "employer":"Pyrami",
                   "email":"amberduke@pyrami.com",
                   "city":"Brogan",
                   "state":"IL"}
    }, ...
    ]
  }
}
```
指定超时时间: GET /_search?timeout=10ms 在进行优化时，可以考虑使用timeout， 比如: 正常来说我们可以在10s内获取2000条数据，但是指定了timeout，发生超时后我们可以获取10ms中获取到的 100条数据。

### 4.Share:

https://baike.baidu.com/item/%E5%88%86%E7%BB%84%E5%AF%86%E7%A0%81%E5%B7%A5%E4%BD%9C%E6%A8%A1%E5%BC%8F/22657583?fr=aladdin
分组密码工作模式

https://www.cnblogs.com/daoren/p/12835578.html
Redash使用体验