---
title: ARTS-week-28
date: 2020-07-19 20:27:42
tags:
---


## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm: 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

Frog Jump https://leetcode.com/submissions/detail/368707533/

### 2.Review:

https://www.oreilly.com/content/best-practices-for-data-lakes/
数据湖的最佳实践

#### 点评：

作者Alice LaPlante 和 Ben Sharma 讲了如何构建、维护和挖掘Hadoop数据湖的价值。。

有价值的数据湖具备以下几点：
1. 业务收益优先级列表：解决关键业务痛点或创造新的盈利点。
2. 架构规划：这是一项长期投资，所以需要仔细把握技术的导向。有必要验证一下概念，从而得到一些经验，在此过程中不断调整和学习。规划中特别重要一点就是拥有很好的数据管理策略，包括数据治理和元数据，以及如何做好这几点。
3. 安全策略：数据隐私和安全及多租户。
4. I / O和内存模型：作为技术平台和体系结构的一部分，必须考虑数据湖的扩展功能。
5. 数据库技能评估：专家应该具备构建数据平台实践经验，有丰富的数据管理和数据治理经验，这样他们就可以预先明确策略和项目流程。还需要邀请日后会使用这一数据湖的数据科学家们，并将其作为利益相关者参与到早期的建筑过程中去，听取他们的需求，了解他们更愿意怎样与数据湖交互。
6. 运维计划：从服务水平协议，需要从几乎零停机时间、可重复读取、处理、改变数据的角度，制定适当的服务水平协议，需要有相关经验的人运维。
7. 运营计划：如何考虑如何做广告宣传、拓展用户。
8. 灾备计划：保证其关键性能高可用。
9. 五年愿景：数据湖会成为下一代企业级数据技术的关键基础平台，企业需要提前计划如何将数据湖纳入长期策略。。


### 3.Tip:

Java11 HttpClient 

特性：

- 从 java9 的 jdk.incubator.httpclient 模块迁移到 java.net.http 模块，包名由 jdk.incubator.http 改为 java.net.http
- 原来的诸如 HttpResponse.BodyHandler.asString() 方法变更为 HttpResponse.BodyHandlers.ofString() ，变化一为 BodyHandler 改为 BodyHandlers，变化二为 asXXX() 之类的方法改为 ofXXX()，由 as 改为 of

1. 设置超时时间

```java

public void testTimeout() throws IOException, InterruptedException {
    //1.set connect timeout
    HttpClient client = HttpClient.newBuilder()
            .connectTimeout(Duration.ofMillis(5000))
            .followRedirects(HttpClient.Redirect.NORMAL)
            .build();

    //2.set read timeout
    HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create("https://www.google.com"))
            .timeout(Duration.ofMillis(5009))
            .build();

    HttpResponse<String> response =
            client.send(request, HttpResponse.BodyHandlers.ofString());

    log.info(response.body());
}

HttpConnectTimeoutException

Caused by: java.net.http.HttpConnectTimeoutException: HTTP connect timed out
    at java.net.http/jdk.internal.net.http.ResponseTimerEvent.handle(ResponseTimerEvent.java:68)
    at java.net.http/jdk.internal.net.http.HttpClientImpl.purgeTimeoutsAndReturnNextDeadline(HttpClientImpl.java:1248)
    at java.net.http/jdk.internal.net.http.HttpClientImpl$SelectorManager.run(HttpClientImpl.java:877)
Caused by: java.net.ConnectException: HTTP connect timed out
    at java.net.http/jdk.internal.net.http.ResponseTimerEvent.handle(ResponseTimerEvent.java:69)
    ... 2 more

HttpTimeoutException

java.net.http.HttpTimeoutException: request timed out
 
    at java.net.http/jdk.internal.net.http.HttpClientImpl.send(HttpClientImpl.java:559)
    at java.net.http/jdk.internal.net.http.HttpClientFacade.send(HttpClientFacade.java:119)
    at com.example.HttpClientTest.testTimeout(HttpClientTest.java:40)
```

2. 设置 authenticator

- authenticator 可以用来设置 HTTP authentication，比如 Basic authentication
- 虽然 Basic authentication 也可以自己设置 header，不过通过 authenticator 省得自己去构造 header

```java
public void testBasicAuth() throws IOException, InterruptedException {
    HttpClient client = HttpClient.newBuilder()
            .connectTimeout(Duration.ofMillis(5000))
            .authenticator(new Authenticator() {
                @Override
                protected PasswordAuthentication getPasswordAuthentication() {
                    return new PasswordAuthentication("username","password".toCharArray());
                }
            })
            .build();

    HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create("http://localhost:8080/demo/login"))
            .timeout(Duration.ofMillis(5009))
            .build();

    HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

    log.info(response.statusCode());
    log.info(response.body());
}

```

3. 设置 header

- 通过 request 可以自定义设置 header

```java
public void testCookies() throws IOException, InterruptedException {
        HttpClient client = HttpClient.newBuilder()
                .connectTimeout(Duration.ofMillis(5000))
                .build();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("http://localhost:8080/demo/cookie"))
                .header("Cookie","JSESSIONID=ghco9xdnaco31gmafukxchph-eb636; userId=demo")
                .timeout(Duration.ofMillis(5009))
                .build();
        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
 
        log.info(response.statusCode());
        log.info(response.body());

```

4. GET

```java
public void testSyncGet() throws IOException, InterruptedException {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://www.google.com"))
                .build();
 
        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
 
        log.info(response.body());
}

public void testAsyncGet() throws ExecutionException, InterruptedException {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://www.google.com"))
                .build();
 
        CompletableFuture<String> result = client.sendAsync(request, HttpResponse.BodyHandlers.ofString())
                .thenApply(HttpResponse::body);
        log.info(result.get());
}
```

5. POST 表单

- header 指定内容是表单类型，然后通过 BodyPublishers.ofString 传递表单数据，需要自己构建表单参数

```java
public void testPostForm() throws IOException, InterruptedException {
    HttpClient client = HttpClient.newBuilder().build();
    HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create("http://www.w3school.com.cn/demo/demo_form.asp"))
            .header("Content-Type","application/x-www-form-urlencoded")
            .POST(HttpRequest.BodyPublishers.ofString("name1=value1&name2=value2"))
            .build();

    HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
    log.info(response.statusCode());
}
```

6. POST JSON

- body 自动把 json 化为 string，header 指定 json 格式

```java
public void testPostJsonGetJson() throws ExecutionException, InterruptedException, JsonProcessingException {
    ObjectMapper objectMapper = new ObjectMapper();
    StockDto dto = new StockDto();
    dto.setName("demo");
    dto.setSymbol("demo");
    dto.setType(StockDto.StockType.SH);
    String requestBody = objectMapper
            .writerWithDefaultPrettyPrinter()
            .writeValueAsString(dto);

    HttpRequest request = HttpRequest.newBuilder(URI.create("http://localhost:8080/demo/json"))
            .header("Content-Type", "application/json")
            .POST(HttpRequest.BodyPublishers.ofString(requestBody))
            .build();

    CompletableFuture<StockDto> result = HttpClient.newHttpClient()
            .sendAsync(request, HttpResponse.BodyHandlers.ofString())
            .thenApply(HttpResponse::body)
            .thenApply(body -> {
                try {
                    return objectMapper.readValue(body,StockDto.class);
                } catch (IOException e) {
                    return new StockDto();
                }
            });
    log.info(result.get());
}
```

7. 文件上传

官方的HttpClient并没有提供类似WebClient那种现成的BodyInserters.fromMultipartData方法，因此这里需要自己转换
这里使用org.apache.httpcomponents(httpclient及httpmime)的MultipartEntityBuilder构建multipartEntity，最后通过HttpRequest.BodyPublishers.ofInputStream来传递内容
这里header要指定Content-Type值为multipart/form-data以及boundary的值，否则服务端可能无法解析

```java
public void testUploadFile() throws IOException, InterruptedException, URISyntaxException {
    HttpClient client = HttpClient.newHttpClient();
    Path path = Path.of(getClass().getClassLoader().getResource("demo.txt").toURI());
    File file = path.toFile();

    String multipartFormDataBoundary = "Java11HttpClientFormBoundary";
    org.apache.http.HttpEntity multipartEntity = MultipartEntityBuilder.create()
            .addPart("file", new FileBody(file, ContentType.DEFAULT_BINARY))
            .setBoundary(multipartFormDataBoundary) //要设置，否则阻塞
            .build();

    HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create("http://localhost:8080/demo/upload"))
            .header("Content-Type", "multipart/form-data; boundary=" + multipartFormDataBoundary)
            .POST(HttpRequest.BodyPublishers.ofInputStream(() -> {
                try {
                    return multipartEntity.getContent();
                } catch (IOException e) {
                    e.printStackTrace();
                    throw new RuntimeException(e);
                }
            }))
            .build();

    HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

    log.info(response.body());
}
```

8. 文件下载

- 使用 HttpResponse.BodyHandlers.ofFile 来接收文件

```java
public void testAsyncDownload() throws ExecutionException, InterruptedException {
    HttpClient client = HttpClient.newHttpClient();
    HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create("http://localhost:8080/demo/download"))
            .build();

    CompletableFuture<Path> result = client.sendAsync(request, HttpResponse.BodyHandlers.ofFile(Paths.get("/tmp/demo.txt")))
            .thenApply(HttpResponse::body);
    log.info(result.get());
}
```

9. 并发请求

- sendAsync 方法返回的是 CompletableFuture，可以方便地进行转换、组合等操作
- 这里使用 CompletableFuture.allOf 组合在一起，最后调用 join 等待所有 future 完成

```java
public void testConcurrentRequests(){
    HttpClient client = HttpClient.newHttpClient();
    List<String> urls = List.of("http://www.baidu.com","http://www.alibaba.com/","http://www.tencent.com");
    List<HttpRequest> requests = urls.stream()
            .map(url -> HttpRequest.newBuilder(URI.create(url)))
            .map(reqBuilder -> reqBuilder.build())
            .collect(Collectors.toList());

    List<CompletableFuture<HttpResponse<String>>> futures = requests.stream()
            .map(request -> client.sendAsync(request, HttpResponse.BodyHandlers.ofString()))
            .collect(Collectors.toList());
    futures.stream()
            .forEach(e -> e.whenComplete((resp,err) -> {
                if(err != null){
                    err.printStackTrace();
                }else{
                    log.info(resp.body());
                    log.info(resp.statusCode());
                }
            }));
    CompletableFuture.allOf(futures
            .toArray(CompletableFuture<?>[]::new))
            .join();
}
```


10. 错误处理

- HttpClient 异步请求返回的是 CompletableFuture<HttpResponse<T>>，其自带 exceptionally 方法可以用来做 fallback 处理
- 另外值得注意的是 HttpClient 不像 WebClient 那样，它没有对 4xx 或 5xx 的状态码抛出异常，需要自己根据情况来处理，手动检测状态码抛出异常或者返回其他内容

```java
 public void testHandleException() throws ExecutionException, InterruptedException {
    HttpClient client = HttpClient.newBuilder()
            .connectTimeout(Duration.ofMillis(5000))
            .build();
    HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create("https://twitter.com"))
            .build();

    CompletableFuture<String> result = client.sendAsync(request, HttpResponse.BodyHandlers.ofString())
            .thenApply(HttpResponse::body)
            .exceptionally(err -> {
                err.printStackTrace();
                return "fallback";
            });
    log.info(result.get());
}
```

11. HTTP2

- 执行之后可以看到返回的 response 的 version 为 HTTP_2

```java
public void testHttp2() throws URISyntaxException {
    HttpClient.newBuilder()
            .followRedirects(HttpClient.Redirect.NEVER)
            .version(HttpClient.Version.HTTP_2)
            .build()
            .sendAsync(HttpRequest.newBuilder()
                            .uri(new URI("https://http2.akamai.com/demo"))
                            .GET()
                            .build(),
                    HttpResponse.BodyHandlers.ofString())
            .whenComplete((resp,t) -> {
                if(t != null){
                    t.printStackTrace();
                }else{
                    log.info(resp.version());
                    log.info(resp.statusCode());
                }
            }).join();
}
```

12. WebSocket

- HttpClient 支持 HTTP2，也包含了 WebSocket，通过 newWebSocketBuilder 去构造 WebSocket
- 传入 listener 进行接收消息，要发消息的话，使用 WebSocket 来发送，关闭使用 sendClose 方法

```java
public void testWebSocket() throws InterruptedException {
    HttpClient client = HttpClient.newHttpClient();
    WebSocket webSocket = client.newWebSocketBuilder()
            .buildAsync(URI.create("ws://localhost:8080/echo"), new WebSocket.Listener() {

                @Override
                public CompletionStage<?> onText(WebSocket webSocket, CharSequence data, boolean last) {
                    // request one more
                    webSocket.request(1);

                    // Print the message when it's available
                    return CompletableFuture.completedFuture(data)
                            .thenAccept(System.out::println);
                }
            }).join();
    webSocket.sendText("hello ", false);
    webSocket.sendText("world ",true);

    TimeUnit.SECONDS.sleep(10);
    webSocket.sendClose(WebSocket.NORMAL_CLOSURE, "ok").join();
}
```

11. reactive streams

- BodySubscriber 接口继承了 Flow.Subscriber<List<ByteBuffer>> 接口
- Subscription 来自 Flow 类，该类是 java9 引入的，里头包含了支持 Reactive Streams 的实现

```java
public static class ByteArraySubscriber<T> implements BodySubscriber<T> {
    private final Function<byte[], T> finisher;
    private final CompletableFuture<T> result = new MinimalFuture<>();
    private final List<ByteBuffer> received = new ArrayList<>();

    private volatile Flow.Subscription subscription;

    public ByteArraySubscriber(Function<byte[],T> finisher) {
        this.finisher = finisher;
    }

    @Override
    public void onSubscribe(Flow.Subscription subscription) {
        if (this.subscription != null) {
            subscription.cancel();
            return;
        }
        this.subscription = subscription;
        // We can handle whatever you've got
        subscription.request(Long.MAX_VALUE);
    }

    @Override
    public void onNext(List<ByteBuffer> items) {
        // incoming buffers are allocated by http client internally,
        // and won't be used anywhere except this place.
        // So it's free simply to store them for further processing.
        assert Utils.hasRemaining(items);
        received.addAll(items);
    }

    @Override
    public void onError(Throwable throwable) {
        received.clear();
        result.completeExceptionally(throwable);
    }

    static private byte[] join(List<ByteBuffer> bytes) {
        int size = Utils.remaining(bytes, Integer.MAX_VALUE);
        byte[] res = new byte[size];
        int from = 0;
        for (ByteBuffer b : bytes) {
            int l = b.remaining();
            b.get(res, from, l);
            from += l;
        }
        return res;
    }

    @Override
    public void onComplete() {
        try {
            result.complete(finisher.apply(join(received)));
            received.clear();
        } catch (IllegalArgumentException e) {
            result.completeExceptionally(e);
        }
    }

    @Override
    public CompletionStage<T> getBody() {
        return result;
    }
}
```

### 4.Share:

JVM - 参数配置影响线程数
https://blackist.org/2019/09/29/java-jvm-thread-params/