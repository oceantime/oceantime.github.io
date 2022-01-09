---
title: ARTS-week-25
date: 2020-06-28 20:04:27
tags:
---


## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm： 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

Jump Game II https://leetcode.com/submissions/detail/359390582/

### 2.Review:

https://statsbot.co/blog/open-source-etl/
开源 ETL 工具 Apache NiFi 和 Streamsets 比较

#### 点评：

作者介绍了两个可视化 ETL 工具，通过减少开发工作。
注：ETL，是英文Extract-Transform-Load的缩写，用来描述将数据从来源端经过抽取（extract）、转换（transform）、加载（load）至目的端的过程。

当用户的 ETL 需求比较复杂时，使用可视化 Dataflow 处理工具能降低使用门槛，提高效率。有两个开源的 Dataflow 数据处理工具，可以帮助完成复杂ETL的工作：Apache NiFi 和 StreamSets Data Collector（SDC），两个工具都有Web界面有。 NiFi 是2014年由 NASA 捐赠给 Apache 基金会，目前的开发和支持主要由 Hortonworks 提供。 SDC 由加利福尼亚州的一家初创公司于 2014 年创立，作为 GitHub 上的开源 ETL 项目。 第一个版本于2015年6月发布。


架构和特性：
1. Apache NiFi
- Processor 每一个 Processor 表示对数据的一种处理，通常有3个输出：
  - 失败: 如果无法正确处理 FlowFile，则原始 FlowFile 将路由到此输出;
  - 原始: 处理完传入的 FlowFile 后，原始 FlowFile 将路由到此输出;
  - 成功: 成功处理的 FlowFiles 将路由到此关系;
- Processor Group 是一组 Processor 的集合，可以被当做一个整体被使用。
- Controller Service 是Dataflow之外的特性，提供Processor配置、控制的功能。
- Data Provenance 数据跟踪服务，可在处理数据时记录Dataflow中的所有内容。

2. StreamSets Data Collector 有4种 Processor 类型：
- Origin：用来从外部来源获取数据。Dataflow中可能只有一个Origin处理器;
- Processor：用来对数据做转换;
- Destination：用来将数据保存到外部系统或文件;
- Executor：用来处理由其他处Processor生成的事件。一些Streamsets Processor在处理过程中可能会产生错误、异常等事件。 在StreamSet使用称为Executors的特殊Processor来处理。 例如，Email Executor，可以在发生错误时发送电子邮件。

UI界面:
Apache Nifi 
- 界面美观程度一般，但是设计的比较紧凑，感觉简洁，并且很容易上手。
StreamSets Data Collector 
- 首先，没有 Controller Service，特别是 JDBC 的设置，导致就算是从同一个数据源读取数据，也需要手动配置每一个 Processor 的 JDBC 参数，使用起来不够友好。
- 其次，在启动 Dataflow 之前，Streamsets 将检查 Dataflow 中的每个 Processor，以确保正确配置所有处理器。有时能帮助找到错误，但有时候会特别麻烦。
- 最后，在界面上无法同时选中多个 Processor，调整 Processor 的布局时候，如果量特别多操作起来稍微有些麻烦。

总结：

对比项 | Apache Nifi |  StreamSets Data Collector  
-|-|-
公司 | Hortonworks |  StreamSets |
可视化数据流建模 | 支持 |  支持 |
统计信息的实时监控/调试功能 | 不支持 |  支持 |
处理二进制数据 | 支持 |  不支持 |
有结构的数据和流式数据 | 支持 |  支持 |
编辑单个处理器配置 | 支持 |  不支持 |
可重用的JDBC配置 | 支持 |  不支持 |
UI界面 | 支持 |  支持更好 |


### 3.Tip:

RestTemplate 接口请求总结

1. 获取接口返回状态码

```java
public static Boolean ping(){
    String url = domain + "/health";
    try{
        ResponseEntity<String> responseEntity = template.getForEntity(url,String.class);
        HttpStatus status = responseEntity.getStatusCode();//获取返回状态
        return status.is2xxSuccessful();//判断状态码是否为2开头的
    }catch(Exception e){
        return false; //502 ,500 是不能正常返回结果的，需要 catch 住，返回一个false
    }
}
```

2. 请求 url 参数拼接

```java
public static void login(String userId, String tocken, int appId, WebDriver driver){
    RestTemplate template = new RestTemplate();
    String url = "https://login.xxx.com/api/userLogin";//请求地址
    String param ="?userId=" + userId + "&tocken=" + tocken + "&appId=" + appId;
    try {
            String str = template.postForObject(url + param, null, String.class);//所得结果为调整成 String 类型
    } catch(Exception e) {
        log.error("登录失败");
        e.printStackTrace();
    }
}
```

3. 带 cookie header 参数

```java
public static HttpHeaders getHeader(WebDriver driver){
    HttpHeaders headers = new HttpHeaders();
    Set<Cookie> cookies = driver.manage().getCookies();//获取浏览器 cookies
    List<String> cookieList = new ArrayList<String>();
    for(Cookie cookie:cookies){ //将浏览器 cookies 放入 list 中
        log.info("当前 cookies 为:" +  cookie.getDomain() + " " + cookie.getName() + ":" + cookie.getValue());
        cookieList.add(cookie.getName() + "=" + cookie.getValue());
    }
    log.info("cookie 为：" + cookieList.toString());
    headers.put(HttpHeaders.COOKIE,cookieList); //将 cookie 放入 header
    headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED); // post 表单 ，如果是个 json 则设置为 MediaType.APPLICATION_JSON
    return headers;
}


public static void gitUpLoad(WebDriver driver,String uploadUrl,String fileName,String content,String branch,String requestUrl) throws  Exception{

    String authenticity_token = getToken(driver,uploadUrl);//获取 token
    RestTemplate template = new RestTemplate();
    HttpHeaders headers = getHeader(driver);//获取 header
    MultiValueMap<String,String> param = new LinkedMultiValueMap<String, String>();//参数放入一个 map 中，restTemplate 不能用 hashMap
    //将请求参数放入 map 中
    param.add("authenticity_token",authenticity_token);
    param.add("file_name",fileName);
    param.add("encoding","text");
    param.add("commit_message","addFile");
    param.add("target_branch",branch);
    param.add("original_branch",branch);
    param.add("content",content);
    param.add("utf8","✓");
    log.info("参数内容为：" + param.toString());
    HttpEntity<MultiValueMap<String,String>> request = new HttpEntity<MultiValueMap<String,String>>(param,headers);//将参数和 header 组成一个请求
    ResponseEntity<String> response = template.postForEntity(requestUrl, request, String.class);

}
```

4. 使用 exchange 指定调用方式

```java
public  void  deleteQueue(String vhost,String queue){
 
    HttpHeaders headers = new HttpHeaders();// header 参数
    headers.add("authorization",Auth);
    headers.setContentType(MediaType.APPLICATION_JSON);

    JSONObject content = new JSONObject();// 放入 body 中的 json 参数
    content.put("mode","delete");
    content.put("name",queue);
    content.put("vhost","/" + vhost);

    String newVhost = "%2F" + vhost;
    String newUrl = url + "/api/queues/" + newVhost + "/" + queue;

    HttpEntity<JSONObject> request = new HttpEntity<>(content,headers); //组装

    ResponseEntity<String> response = template.exchange(newUrl,HttpMethod.DELETE,request,String.class);
}
```

### 4.Share:

StreamSets实战之路系列
https://blog.csdn.net/zwzfgr/article/details/106973786
gulp命令找不到 – 安装gulp后出错
https://blog.csdn.net/weixin_33935505/article/details/91666585
SQL on Elasticsearch
https://blog.csdn.net/qq_27639777/article/details/93717659