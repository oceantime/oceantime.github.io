---
> **ARTS-week-10**
> 2021-03-15 20:19
---


## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm： 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

242. 有效的字母异位词 https://leetcode-cn.com/submissions/detail/155087701/
1. 两数之和 https://leetcode-cn.com/submissions/detail/155068788/
451. 根据字符出现频率排序 https://leetcode-cn.com/submissions/detail/155051959/

### 2.Review:

https://medium.com/@mhewedy_46874/implement-job-queue-in-redis-9f0f8d394561
使用 Redis 实现任务队列
          

#### 点评：

作者 Mohammed Hewedy 在本文中，我们将看到如何在Redis中使用List内置类型来实现消息队列。

- 什么是消息队列
  - 消息队列提供 ASYN Ç 之间 hronous 通信协议发送和接收消息的所以它们不需要进行交互以在同一时间的消息队列。放置在队列中的邮件将被存储，直到收件人检索到它们为止。
  - 消息队列范例是 pub-sub 模式的同级。但是，pub-sub 模式允许消息的发送者（称为发布者）通过通道将消息发布到称为订阅者的接收者，而无需知道存在哪些订阅者（如果有）。接收到的消息可以同时接收到该消息时，所有订户都存在。Redis 对 pub-sub 模式有明确的支持。

- Redis 内置的 List 数据结构：
  - 该数据类型是按插入顺序排序的字符串列表。可以将元素推到列表的开头（LPUSH）或结尾（RPUSH）。
  - 列表中最有趣的命令之一是支持“阻止”命令，BLPOP并分别BRPOP从列表的左（头）和右（尾）将弹出元素夹住，如果没有可用元素，则将其阻止。

- 使用 redis-cli 
  - 实现简单的任务队列
  - 实现任务处理
  - 实现任务分发

### 3.Tip:

#### Python3 安装异常

1.pg_config(PostgreSQL - pg_config -bash: pg_config: command not found)

```shell
$ yum install postgresql-devel
$ pg_config
```

2.Issue with libpq.so.5 and PQencryptPasswordConn version RHPG_10 on Fedora30

```shell
pip install psycopg2-binary
```

3.CentOS 安装 node.js

```shell
# 方法一：从EPEL库安装Node.js
$ yum install epel-release
$ sudo yum install nodejs
$ sudo yum install npm

$ node --version
v6.12.2
$ npm --version
3.10.10

# 方法二：下载源代码，编译安装
$ wget https://nodejs.org/dist/v8.9.4/node-v8.9.4.tar.gz
$ tar zxvf node-v8.9.4.tar.gz
$ cd node-v8.9.4
$ ./configure
$ make
$ make install

$ node --version
v6.12.2
$ npm --version
3.10.10
```

4.Go-lang will drop your specified headers on the redirects.

```golang
func basicAuth(username, password string) string {
  auth := username + ":" + password
  return base64.StdEncoding.EncodeToString([]byte(auth))
}

func redirectPolicyFunc(req *http.Request, via []*http.Request) error{
  req.Header.Add("Authorization","Basic " + basicAuth("username1","password123"))
  return nil
}

func main() {
  client := &http.Client{
    Jar: cookieJar,
    CheckRedirect: redirectPolicyFunc,
  }

  req, err := http.NewRequest("GET", "http://localhost/", nil)
  req.Header.Add("Authorization","Basic " + basicAuth("username1","password123")) 
  resp, err := client.Do(req)
}
```
4.Redash 登录提示 Too Many Requests

```python
THROTTLE_LOGIN_PATTERN = os.environ.get("REDASH_THROTTLE_LOGIN_PATTERN", "5000/hour")
```

5.libssl.so.1.1: cannot open shared object file: No such file or directory

```shell
# 从官网下载
$ wget https://www.openssl.org/source/openssl-1.1.1e.tar.gz

# 编译
$ tar -xvf openssl-1.1.1e.tar.gz
$ ./config shared --openssldir=/usr/local/openssl --prefix=/usr/local/openssl
$ make && make install

# 配置
$ echo "/usr/local/lib64/" >> /etc/ld.so.conf
$ ldconfig
```


### 4.Share:

https://colobu.com/2017/04/19/go-http-redirect/
Go HTTP Redirect的知识点总结

https://blog.csdn.net/raoxiaoya/article/details/109014347
golang调用外部程序，创建进程，守护进程，shell命令

https://cnblogs.com/hiyang/p/12631908.html
s3fs把 s3-like 对象存储挂载到本地
