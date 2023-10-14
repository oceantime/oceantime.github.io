---
> **ARTS-week-03**
> 2022-01-16 17:03
---


###### ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
- Algorithm: 每周至少做一个 leetcode 的算法题
- Review: 阅读并点评至少一篇英文技术文章
- Tip: 学习至少一个技术技巧
- Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

- [306. 累加数](https://leetcode-cn.com/submissions/detail/257100560/)  
  + 思路：穷举 [0,i] 和 [i,j] 的前两个数字组合并 DFS 剩余的数字  
- [1036. 逃离大迷宫](https://leetcode-cn.com/submissions/detail/257452542/)  
  + 思路：双向 DFS 从起点和终点分别 DFS 判断能否走过包围圈最大的范围  
- [334. 递增的三元子序列](https://leetcode-cn.com/submissions/detail/257795189/)  
  + 思路：贪心 遍历数组获取第一大和第二大的数字  

### 2.Review:

- [Elasticsearch 源字段管理](https://opster.com/guides/elasticsearch/glossary/elasticsearch-source/)  

#### 点评：

当发送一个文档进行索引时，Elasticsearch以倒排索引的格式对所有字段进行索引，但它还将原始 JSON 文档保存在一个名为 _source 的特殊字段中。 

- 禁用索引中的源字段：

```json
PUT /your_index?pretty
{
  "mappings": {
    "_source": {
      "enabled": false
    }
  }
}
```

- 仅将选定字段存储为 _source 字段的一部分：：

```json
PUT your_index
{
  "mappings": {
    "_source": {
      "includes": [
        "*.count",
        "error_info.*"
      ],
      "excludes": [
        "error_info.traceback_message"
      ]
    }
  }
}
```

- 仅包括使用源过滤的选定字段：

```json
GET your_index/_search
{
  "query": {
    "match_all": {}
  },
  "_source": {
       "includes": ["api_name","status_code", "*id"]
  }
}
```

总结：
源字段带来额外存储空间的开销，但用于特殊用途，例如：
- 执行搜索查询时作为响应的一部分返回。
- 用于重新索引目的、更新和 update_by_query 操作。
- 用于高亮，如果该字段未存储，则表示该字段在映射中未设置为“store to true” 。
- 允许选择要返回的字段。
源字段的唯一问题是磁盘上的额外存储使用。但是源字段使用的这个存储空间可以通过将压缩级别更改为 best_compression 来优化。此设置使用 index.codec 参数完成。


### 3.Tip:

#### ES 中 Json 字段转为字符串保存
```shell
PUT 'index_name'/_mapping
{
  "properties": {
    "json_field":{
        "type": "object",
        "enabled": false
    }
  }
}
```
#### ES 重建索引 reindex
```shell
POST _reindex
{
    "source": {
        "index": "source"
    },
    "dest": {
        "index": "destination"
    }
}
```
#### ES 查询 SQL
```shell
POST /_opendistor/_sql
{
  "query": "SELECT * FROM index LIMIT 10"
}
```
#### ES 任务管理
```shell
GET _tasks/<task_id>
POST  _tasks/<task_id>/_cancel
```
#### SpringMVC 添加自定义 servlet filter
```java
public class MyServletInitializer implements WebApplicationInitializer {
    @Override
    public void onStartup(ServletContext servletContext) throws ServletException {
        //注册servlet
        ServletRegistration.Dynamic myServlet = servletContext.addServlet("myServlet", MyServlet.class);
        myServlet.addMapping("/myServlet");
        //注册filter
        FilterRegistration.Dynamic filterRegistration = servletContext.addFilter("myFilter", MyFilter.class);
        filterRegistration.addMappingForUrlPatterns(null, false, "/*");
    }
}
```
#### java.sql.SQLException: Invalid column type at ...jdbc.driver...
JDBC 只支持 java.sql.Date, java.sql.Time, java.sql.Timestamp 作为 SQL 字段类型，不支持 java.util.Date
```java
// Date 类型转换
preparedStatement.setObject(1, LocalDate.parse("2022-01-16"));
// Timestamp 类型转换
preparedStatement.setTimestamp(1, java.sql.Timestamp.valueOf(LocalDateTime.parse("2022-01-16T19:15:16")));
```

### 4.Share:

- [冗余连接 II 并查集](https://www.cnblogs.com/silentteller/p/12361741.html)  

- [LeetCode-位运算相关题解](https://www.cnblogs.com/panlq/p/13334117.html)  

- [reindex-data](https://opendistro.github.io/for-elasticsearch-docs/docs/elasticsearch/reindex-data/)  

- [查询Elasticsearch SQL](https://support.huaweicloud.com/usermanual-css/css_01_0061.html)  

- [Elasticsearch _source字段设置](https://doc.codingdict.com/elasticsearch/311/)  

- [Tomcat Filter之动态注入](https://www.cnblogs.com/cxccc/p/13235572.html)  

- [过滤器（Filter）和拦截器（Interceptor）的执行顺序和区别](https://www.cnblogs.com/kuotian/p/13176186.html)  

- [Java HttpServletRequest.getCookies方法代码示例](https://vimsky.com/examples/detail/java-method-javax.servlet.http.HttpServletRequest.getCookies.html)  

- [Allatori 3.0 source code](https://github.com/netindev/Allatori-v3.0)  

- [debezium source code](https://github.com/debezium/debezium)  