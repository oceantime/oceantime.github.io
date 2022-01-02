---
title: ARTS-week-44
date: 2020-07-12 18:44:24
tags:
---


## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm： 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

Max Sum of Rectangle No Larger Than K https://leetcode.com/submissions/detail/365585708/

### 2.Review:

http://martin.kleppmann.com/2015/05/27/logs-for-data-infrastructure.html
使用日志构建可靠的数据基础结构

#### 点评：

作者 Martin Kleppmann，借鉴了 linkedin 的思想，通过 日志的采集方案解决数据的使用方得到一致性、实时的数据。

过去的通用做法有几种，分别是：
1. DBA开放各个系统的备库，在业务低峰期（比如夜间），使用方各自抽取所需数据。由于抽取时间不同，各个数据使用方数据不一致，数据发生冲突，而且重复抽取，相信不少DBA很头疼这个事情。
2. 公司统一的大数据平台，通过 Sqoop 在业务低峰期到各个系统统一抽取数据， 并保存到Hive表中, 然后为其他数据使用方提供数据服务。这种做法解决了一致性问题，但时效性差，基本是T+1的时效。
3. 基于 trigger 的方式获取增量变更，主要问题是业务方侵入性大，而且trigger也带来性能损失。
但作者表示以上方案都不算完美。作者在了解和考虑了不同实现方式后，最后借鉴了 linkedin 的思想，认为要想同时解决数据一致性和实时性，比较合理的方法应该是来自于日志。

总结：作者建议把增量的日志作为一切系统的基础。 后续的数据使用方，通过订阅 kafka 来消费日志。
- 大数据的使用方可以将数据保存到 Hive 表或者 Parquet 文件给 Hive 或 Spark 查询；
- 提供搜索服务的使用方可以保存到 Elasticsearch 或 HBase 中；
- 提供缓存服务的使用方可以将日志缓存到 Redis 或 alluxio 中；
- 数据同步的使用方可以将数据保存到自己的数据库中；
- 由于 kafka 的日志是可以重复消费的，并且缓存一段时间，各个使用方可以通过消费kafka的日志来达到既能保持与数据库的一致性，也能保证实时性；


### 3.Tip:

Java http client 工具类

1. 支持超时/重试/SSL

```java

public class HTTPClient {

    //HTTP请求读取超时时间
    private static final int SOCKET_TIME_OUT = 5000;
    //HTTP请求连接时间
    private static final int CONNECT_TIME_OUT = 5000;
    //请求重试次数
    private static final int RETRY_TIMES = 3;
    
     /**
     * 
     * @param address 请求地址
     * @param method  请求方式
     * @param params 请求参数
     * @param paramSendType 发送类型
     * @param cookies 设置cookies值发送
     * @return 
     */
    public String request(String address, String method, String params, String paramSendType, String cookies) {
        address = address.trim();
        CloseableHttpResponse closeableHttpResponse = null;
        if (SupportProtocol.HTTP_METHOD_GET.equalsIgnoreCase(method)) {
            closeableHttpResponse = this.GET(address, params, paramSendType, cookies);
        } else if (SupportProtocol.HTTP_METHOD_POST.equalsIgnoreCase(method)) {
            closeableHttpResponse = this.POST(address, params, paramSendType, cookies);
        } else if (SupportProtocol.HTTP_METHOD_PUT.equalsIgnoreCase(method)) {
            closeableHttpResponse = this.PUT(address, params, paramSendType, cookies);
        } else {
            closeableHttpResponse = this.POST(address, params, paramSendType, cookies);
        }

        return this.buildReponseMsg(closeableHttpResponse);
    }
    
    private CloseableHttpResponse PUT(String address, String params, String paramSendType, String cookies) {
        try {
            URI uri = URI.create(address);
            HttpPut httpPut = new HttpPut(uri);
            RequestConfig requestConfig = RequestConfig.custom().setSocketTimeout(SOCKET_TIME_OUT).setConnectTimeout(CONNECT_TIME_OUT).build();
            httpPut.setConfig(requestConfig);

            if (SupportProtocol.SUPPORT_JSON.equalsIgnoreCase(paramSendType)) {
                httpPut.setHeader("Content-Type", "application/json; charset=UTF-8");
                StringEntity entity = new StringEntity(params, ContentType.APPLICATION_JSON);
                httpPut.setEntity(entity);
            } else if (SupportProtocol.SUPPORT_JSON.equalsIgnoreCase(paramSendType)) {
                httpPut.setHeader("Content-Type", "application/xml; charset=UTF-8");
                StringEntity entity = new StringEntity(params, ContentType.APPLICATION_XML);
                httpPut.setEntity(entity);
            } else {
                httpPut.setHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
                StringEntity entity = new StringEntity(params, ContentType.APPLICATION_FORM_URLENCODED);
                httpPut.setEntity(entity);
            }

            if (StrUtil.isNotEmpty(cookies)) {
                httpPut.setHeader("Cookie", cookies);
            }

            CloseableHttpClient httpClient = HttpClients.createDefault();

            if (address.toLowerCase().startsWith("https")) {
                httpClient = this.createSSLClientDefault();
            }

            return httpClient.execute(httpPut);
        } catch (Exception ex) {
            LogUtil.error(ex);
        }
        return null;
    }

    private CloseableHttpResponse GET(String address, String params, String paramSendType, String cookies) {
        try {
            URI uri;
            if (EmptyUtil.isNotEmpty(params)) {
                uri = URI.create(String.format("%s?%s", address, params));
            } else {
                uri = URI.create(address);
            }

            HttpGet httpGet = new HttpGet(uri);
            RequestConfig requestConfig = RequestConfig.custom().setSocketTimeout(SOCKET_TIME_OUT).setConnectTimeout(CONNECT_TIME_OUT).build();
            httpGet.setConfig(requestConfig);

            if (SupportProtocol.SUPPORT_JSON.equalsIgnoreCase(paramSendType)) {
                httpGet.setHeader("Content-Type", "application/json; charset=UTF-8");
            } else if (SupportProtocol.SUPPORT_XML.equalsIgnoreCase(paramSendType)) {
                httpGet.setHeader("Content-Type", "application/xml; charset=UTF-8");
            } else {
                httpGet.setHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
            }

            if (StrUtil.isNotEmpty(cookies)) {
                httpGet.setHeader("Cookie", cookies);
            }
            CloseableHttpClient httpClient = HttpClients.createDefault();
            if (address.toLowerCase().startsWith("https")) {
                httpClient = this.createSSLClientDefault();
            }
            return httpClient.execute(httpGet);
        } catch (Exception ex) {
            LogUtil.error(ex);
        }
        return null;
    }

    private CloseableHttpResponse POST(String address, String params, String paramSendType, String cookies) {
        try {
            URI uri = URI.create(address);
            HttpPost httpPost = new HttpPost(uri);
            RequestConfig requestConfig = RequestConfig.custom().setSocketTimeout(SOCKET_TIME_OUT).setConnectTimeout(CONNECT_TIME_OUT).build();
            httpPost.setConfig(requestConfig);

            if (SupportProtocol.SUPPORT_JSON.equalsIgnoreCase(paramSendType)) {
                httpPost.setHeader("Content-Type", "application/json; charset=UTF-8");
                StringEntity entity = new StringEntity(params, ContentType.APPLICATION_JSON);
                httpPost.setEntity(entity);
            } else if (SupportProtocol.SUPPORT_XML.equalsIgnoreCase(paramSendType)) {
                httpPost.setHeader("Content-Type", "application/xml; charset=UTF-8");
                StringEntity entity = new StringEntity(params, ContentType.APPLICATION_XML);
                httpPost.setEntity(entity);
            } else {
                httpPost.setHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
                StringEntity entity = new StringEntity(params, ContentType.APPLICATION_FORM_URLENCODED);
                httpPost.setEntity(entity);
            }

            if (StrUtil.isNotEmpty(cookies)) {
                httpPost.setHeader("Cookie", cookies);
            }

            CloseableHttpClient httpClient = HttpClients.createDefault();
            if (address.toLowerCase().startsWith("https")) {
                httpClient = this.createSSLClientDefault();
            }
            return httpClient.execute(httpPost);
        } catch (Exception ex) {
            LogUtil.error(ex);
        }
        return null;
    }

    private CloseableHttpClient createSSLClientDefault() {
        try {
            SSLContext sslContext = new SSLContextBuilder().loadTrustMaterial(null, new TrustStrategy() {
                @Override
                public boolean isTrusted(X509Certificate[] chain,
                        String authType) throws CertificateException {
                    return true;
                }
            }).build();
            SSLSocketFactory ssf = new SSLSocketFactory(sslContext, SSLSocketFactory.ALLOW_ALL_HOSTNAME_VERIFIER);
            return HttpClients.custom().setSSLSocketFactory(ssf).build();
        } catch (Exception e) {
            LogUtil.error(e.getMessage());
        }
        return HttpClients.createDefault();
    }

    private String buildReponseMsg(CloseableHttpResponse closeableHttpResponse) {
        if (closeableHttpResponse == null) {
            return null;
        }
        try {
            int code = closeableHttpResponse.getStatusLine().getStatusCode();
            String msg = EntityUtils.toString(closeableHttpResponse.getEntity());
            if (code == HttpStatus.SC_OK) {
                return msg;
            }
        } catch (Exception ex) {
            LogUtil.error(ex);
        }
        return null;
    }
}

```

2. 依赖

```xml
<dependency>
    <groupId>org.apache.httpcomponents</groupId>
    <artifactId>httpclient</artifactId>
    <version>4.4</version>
</dependency>
<dependency>
    <groupId>org.apache.httpcomponents</groupId>
    <artifactId>httpcore</artifactId>
    <version>4.4</version>
</dependency>
<dependency>
    <groupId>org.apache.httpcomponents</groupId>
    <artifactId>httpcore-nio</artifactId>
    <version>4.4</version>
</dependency>
```

### 4.Share:

时间序列数据库的秘密 (2)——索引
https://www.infoq.cn/article/database-timestamp-02/?utm_source=infoq&utm_medium=related_content_link&utm_campaign=relatedContent_articles_clk