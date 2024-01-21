---
> **ARTS-week-13**
> 2021-04-05 22:16
---


## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm: 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

23. 合并K个升序链表 https://leetcode-cn.com/problems/merge-k-sorted-lists/
347. 前 K 个高频元素 https://leetcode-cn.com/problems/top-k-frequent-elements/
127. 单词接龙 https://leetcode-cn.com/problems/word-ladder/

### 2.Review:

https://medium.com/towards-artificial-intelligence/machine-learning-with-low-code-75d152172e4b
手把手教使用建模神器Pycaret，几行代码搞定房价预测模型!
        

#### 点评：

作者 Robin Mizreh 构建机器学习非常困难，使用复杂的代码。这绝对不是真的。实际上，我们可以用一个简单的代码来开发它。但在实际情况中，构建机器学习的重要之处在于了解问题并找到解决方案。我们不了解问题，就找不到解决办法。编码只是找到解决方案的桥梁。所以我们必须在心态上承受。因此，作为一个数据科学家，我们会有一个很好的判断力。 本节中，我们将使用一个回归问题来预测Kaggle中的房价。请下载这方面的数据集来练习。 这里，我们只关注使用Pycaret进行自动预处理和机器学习建模。我们还没有进行探索性数据分析(EDA)。实际上，在建模之前，我们必须让EDA获得一些洞见，也许还需要一些新特性。但在这里，我们只建立模型。为了更好地理解这些提纲，我们建议:  
- 定义问题
- 需求评估
- 预处理与 Pycaret
- 建模和评估
- 进行提交

结论:在这一节中，我们可以得出一些结论，构建一个低代码的机器学习模型是非常可行的。但是，我们得到的性能模型并没有更好。因为我们不做EDA，预处理数据和特征工程。所以，如果想改进的性能模型，请这样做。

### 3.Tip:

#### postgresql ----- 查看 sql 执行时间

```shell
方法一;
\timing on
执行的 sql 语句
不再使用时：
\timing off

方法二： 查看执行计划
explain select count(*) from  的表;
                                     QUERY PLAN                                     
------------------------------------------------------------------------------------
 Aggregate  (cost=14798.38..14798.39 rows=1 width=0)
   ->  Seq Scan on 的表  (cost=0.00..14423.10 rows=150110 width=0)
(2 rows)
cost=说明：
第一个数字 0.00 表示启动 cost，这是执行到返回第一行时需要的 cost 值。
第二个数字 14423.10 表示执行整个 SQL 的 cost
```

#### greenplum 数据导入导出

```java
//1.以某个属性分组
psql -d databasename -h localhost -p 5432 -c "\copy (select * from tablename limit 10000) to /tmp/my_data2.csv with csv header delimiter '|' "

#不添加字段头导出
psql -d databasename -h localhost -p 5432 -c "\copy (select * from tablename limit 10000) to /tmp/my_data2.csv with csv delimiter '|' "

//2.导入语句
psql -h localhost -p 5432 -d databasename -U gpadmin -c "\\copy tablename FROM '/tmp/my_data.csv' with DELIMITER as '|' NULL as 'null string' "
```



#### postgresql role "root" does not exist 解决办法

```shell
#方法一
非必要情况下就不要用 root 用户使用 postgresql

#方法二
手动创建 root role，我这里是使用用户名为 postgres 来启动 postgresql 服务的
su postgres

#创建root用户
postgres=#create user root with password 'password';    
CREATE ROLE

#将数据库权限赋予 root 用户
postgres=# GRANT ALL PRIVILEGES ON DATABASE mydatabase to root;
GRANT

#将用户修改为超级用户（看实际需求）
postgres=# ALTER ROLE root WITH SUPERUSER;
postgres=# \q
```


### 4.Share:

https://www.jianshu.com/p/22de9247749f
Golang 中 Buffer 高效拼接字符串以及自定义线程安全 Buffer

https://www.jianshu.com/p/2781bbc539a7
Go Do not copy me

https://www.jianshu.com/p/5c58bdeaf27a
MySQL 与 PostgreSQL 的时间类型

http://piaoyi.org/linux/PHP-Laravel-MIXPHP-Go-QPS.html
原生 PHP、Laravel、MIXPHP、Go 高并发性能测试 QPS

https://blog.csdn.net/ronon77/article/details/84716629
Ngx_lua 与 go 高并发性能对比