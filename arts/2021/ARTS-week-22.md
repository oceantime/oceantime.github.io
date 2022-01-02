---
title: ARTS-week-22
date: 2021-06-06 18:06:28
tags:
---


## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm： 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

376. 摆动序列：https://leetcode-cn.com/submissions/detail/184277628/
354. 俄罗斯套娃信封问题：https://leetcode-cn.com/submissions/detail/184149328/
673. 最长递增子序列的个数：https://leetcode-cn.com/submissions/detail/184134156/

### 2.Review:

https://mtyurt.net/post/2020/good-bad-parts-of-ansible-after-two-years.html
使用 ansible 两年后的优点和缺点

#### 点评：

   我已经专业地使用 Ansible 2.5 年了。我读了 Ansible 的替代品相关的博文，这让我重新评估我为什么用 Ansible。所以我想列出一个优点/缺点以供将来参考，记录我喜欢和不喜欢 Ansible 的原因。

- 我用 Ansible 做什么？
  - 主要是配置服务器，安装软件。
  - 在可变基础设施中进行部署，在事情变得混乱时运行 shell 命令。
  - 创建/删除数据库，在这些数据库中创建/删除用户，分配角色等。
  - 与云服务（例如 S3 和 EC2）交互。

- 我们的设计原则
  - 相同的资源，多种环境
  - 几乎类似于生产环境
  - 维持一个小团队

- Ansible：优点
  - 久经考验
  - 声明式语言
  - 许多现成的模块
  - 语言入门门槛低
  - 过滤器、函数、标准工具

- Ansible：缺点
  - Ansible 在运行 ansible 命令的机器和运行 playbook 的主机上都对 Python 模块有外部依赖。
  - 需要从一开始就处理 Python 的依赖管理问题。
  - 安装第三方库兼容性
  - 在复杂的软件项目中，可读性就是一切，尤其是在代码使用和维护时间超过 6 个月的情况下。
  - 跳过角色或任务是可能的，但不是很好。我总是想在开发和生产中使用相同的剧本。
  - when条件适用于 if-else 情况，但如果您需要存储另一个任务的结果并在下一个任务的when条件中使用它，您的代码会在 1 个月后被遗忘，而不是常规的 3 个月时间线。您需要更频繁地重新发现自己的代码。
  - Ansible 允许我指定角色查找路径，我将其指定为 common. 但它不允许我从领域驱动的角度来处理整个项目。
  - Ansible 不显示实时输出。

- 结论
  Ansible 是一个很好的工具，它已经为它的投资付出了代价。话虽如此，我已经为下一个工具和下一个概念做好了准备。

### 3.Tip:

#### Arrays.sort() 二维数组排序

1.1 Comparator：

```java
Arrays.sort(int[] nums, Comparator<Integer>(){

    public int compare(int[] a, int[] b){

         return a[0] - b[0];   升序
        // return b[0] - a[0];   降序
        /* a[0]-b[0]>0 交换a b位置，反之不变， 即返回值为正数时，交换数组中正在比较
        的两个元素的位置，返回值为负数时，不交换。 记住第一个参数去比较第二个
        参数就是升序，第二个参数比较第一个参数就是降序就OK了。
        */
    }
})
```

1.2 Lambda：

```java
Arrays.sort(nums, (a, b) -> a[0] - b[0]);
```

1.3 复杂应用：

```java
Arrays.sort(int[] nums, Comparator<Integer>(){

    public int compare(int[] a, int[] b){

        if(a[0]>b[0]){
            return 1;
        }else if(a[0]<b[0]){
            return -1
        }else if(a[1]>b[1]){
            return 1;
        }else if(a[1]<b[1]){
            return -1;
        }else{
            return 0;
        }
    }
})
```

####  MySQL

1.1 MySQL 日期时间列的默认值：

```sql
 create table test (str varchar(32), ts TIMESTAMP DEFAULT CURRENT_TIMESTAMP);
```
1.2 查看 MySQL 选择的库：

```sql
 select database() from dual;
```

1.3 查看 MySQL 库大小，表大小，索引大小：

```sql
# 查看所有库的大小
mysql> select concat(round(sum(DATA_LENGTH/1024/1024),2),'MB') as data  from TABLES;
+----------+
| data     |
+----------+
| 104.21MB |
+----------+
# 查看指定库的大小
mysql> select concat(round(sum(DATA_LENGTH/1024/1024),2),'MB') as data  from TABLES where table_schema='jishi';
+---------+
| data    |
+---------+
| 26.17MB |
+---------+
# 查看指定库的指定表的大小
mysql> select concat(round(sum(DATA_LENGTH/1024/1024),2),'MB') as data  from TABLES where table_schema='jishi' and table_name='a_ya';
+--------+
| data   |
+--------+
| 0.02MB |
+--------+
# 查看指定库的索引大小
mysql> SELECT CONCAT(ROUND(SUM(index_length)/(1024*1024), 2), ' MB') AS 'Total Index Size' FROM TABLES  WHERE table_schema = 'jishi'; 
+------------------+
| Total Index Size |
+------------------+
| 0.94 MB          |
+------------------+
# 查看指定库的指定表的索引大小
mysql> SELECT CONCAT(ROUND(SUM(index_length)/(1024*1024), 2), ' MB') AS 'Total Index Size' FROM TABLES  WHERE table_schema = 'test' and table_name='a_yuser'; 
+------------------+
| Total Index Size |
+------------------+
| 21.84 MB         |
+------------------+
# 查看一个库中的情况
mysql>  SELECT CONCAT(table_schema,'.',table_name) AS 'Table Name', CONCAT(ROUND(table_rows/1000000,4),'M') AS 'Number of Rows', CONCAT(ROUND(data_length/(1024*1024*1024),4),'G') AS 'Data Size', CONCAT(ROUND(index_length/(1024*1024*1024),4),'G') AS 'Index Size', CONCAT(ROUND((data_length+index_length)/(1024*1024*1024),4),'G') AS'Total'FROM information_schema.TABLES WHERE table_schema LIKE 'test';
+---------------+----------------+-----------+------------+---------+
| Table Name    | Number of Rows | Data Size | Index Size | Total   |
+---------------+----------------+-----------+------------+---------+
| test.a_br     | 0.4625M        | 0.0259G   | 0.0171G    | 0.0431G |
| test.a_skuclr | 0.7099M        | 0.0660G   | 0.0259G    | 0.0919G |
| test.a_yuser  | 1.0736M        | 0.0497G   | 0.0213G    | 0.0710G |
| test.test     | 0.0000M        | 0.0000G   | 0.0000G    | 0.0000G |
+---------------+----------------+-----------+------------+---------+
```


### 4.Share:

https://discuss.redash.io/t/how-to-create-new-visualization-types-in-redash/86/2 
https://discuss.redash.io/t/creating-a-new-query-runner-data-source-in-redash/347
关于 redash 自定义可视化以及 query runner 开发的几篇文章

https://www.jianshu.com/p/b2d2edb4ba5b
一文看懂递归

https://www.polarxiong.com/archives/Python-%E6%93%8D%E4%BD%9Cdict%E6%97%B6%E9%81%BF%E5%85%8D%E5%87%BA%E7%8E%B0KeyError%E7%9A%84%E5%87%A0%E7%A7%8D%E6%96%B9%E6%B3%95.html
Python:操作 dict 时避免出现 KeyError 的几种方法
