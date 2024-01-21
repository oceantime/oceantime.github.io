---
> **ARTS-week-05**
> 2021-02-07 20:39
---


## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm: 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

303. 区域和检索 - 数组不可变 https://leetcode-cn.com/submissions/detail/145254170/
307. 区域和检索 - 数组可修改 https://leetcode-cn.com/submissions/detail/145262643/
75. 颜色分类 https://leetcode-cn.com/submissions/detail/145289514/

### 2.Review:

https://laike9m.com/blog/requests-secret-pool_connections-and-pool_maxsize,89/
Python requests 库 pool_connections 和 pool_maxsize 解密

#### 点评：

- HTTPAdapter
class requests.adapters.HTTPAdapter(pool_connections=10, pool_maxsize=10, max_retries=0, pool_block=False)urllib3 的内置 HTTP 适配器。提供一个通用接口，用于通过实现传输适配器接口来请求会话以联系 HTTP 和 HTTPS url。此类通常是由 Session 类在幕后创建的。
参数：
 * pool_connections–要缓存的 urllib3 连接池的数量。
 * pool_maxsize–要保存在池中的最大连接数。
 * max_retries(int)–每个连接应尝试的最大重试次数。请注意，这仅适用于失败的 DNS 查找，套接字连接和连接超时，不适用于将数据发送到服务器的请求。默认情况下，请求不会重试失败的连接。如果需要对我们重试请求的条件进行精细控制，请导入 urllib3 的 Retry 类，然后传递该类。
 * pool_block–连接池是否应阻止连接。

### 3.Tip:

#### count call on query object doesnt pass in params to es client
1.Create DSL query
2.Call - query.using(esClient).index(index_name).doc_type(doc_type).params(request_timeout=timeout, ignore_unavailable=True)
3.Call this for an index that doesnt exist
4.Instead of getting count as 0, I am getting an exception for index not found

### 4.Share:

http://xiaorui.cc/archives/4437
构建高效的 python requests 长连接池