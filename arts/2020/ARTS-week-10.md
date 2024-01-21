---
title: ARTS-week-10
date: 2020-03-14 20:59:26
tags:
---

## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm: 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

Binary Tree Preorder Traversal https://leetcode.com/submissions/detail/312666779/

### 2.Review:

https://www.binarytides.com/linux-scp-command

#### 点评：

Scp(Secure Copy) 是一个在各个主机之间进行复制或者文件传输的一个命令行工具。它使用一种同ssh一样的安全机制。事实上，它在后台使用ssh连接来进行文件的传输。scp既指一种定义安全复制应该如何工作的协议，也指一种可以被安装的作为OpenSSH工具套的一部分的软件或是指令。本文作者在这篇简单的教程中，例出 12 种 scp 指令的场景以及如何使用它进行安全的文件传输。

1. 详细输出
2. 多文件传输
3. 复制整个文件夹（递归）
4. 在两个远程主机之间复制文件
5. 用压缩来加快传输
6. 限制带宽的使用
7. 在远程主机上连接一个不同的端口
8. 保存文件属性
9. 静默模式
10. 特殊标识文件
11. 使用不同的ssh_config文件
12. 使用不同的加密

总结：
尽管 SCP 在安全地传输文件方面是非常有效的，它缺乏一个文件同步工具必要的功能。它所能做的就是复制粘贴上述所有文件从一个位置到另一个位置。一个更强大的工具的 Rsync 它不仅具有 SCP 的所有功能，而且增加了更多的功能用来在2个主机智能同步文件。例如，它可以检查并上传只有修改过的文件，忽略现有的文件等等。

### 3.Tip:

git命令下载代码中断恢复
``` shell
# 运行git下载命令：
~/source/$ git clone --recursive https://github.com/manic-3dprint/EzArduinoGamePad.git

# 下载异常提示：
error: RPC failed; curl 56 GnuTLS recv error (-9): A TLS packet with unexpected length was received.
fatal: The remote end hung up unexpectedly
fatal: early EOF
fatal: index-pack failed
fatal: clone of 'https://github.com/manic-3dprint/EzArduinoGamePad.git' into submodule path 'third_party/protobuf' failed

# 进入 EzArduinoGamePad 刚刚下载的目录
~/source/$ cd EzArduinoGamePad
~/source/EzArduinoGamePad$ git submodule update --init --recursive

```

Anaconda在已有python3.6的情况下安装python2.7
``` shell
# 新建 python27 环境 (Anaconda -> Enviroments -> base(root) -> Open Terminal) 中执行
conda create -n python27 python=2.7

# 查看已安装环境
conda info -e

# 会看到安装的环境列表
#  (base) C:\Users\name>conda info -e
#  WARNING: The conda.compat module is deprecated and will be removed in a future release.
#  # conda environments:
#  #
#  base                  *  C:\Users\name\Anaconda3
#  python27              *  C:\Users\name\Anaconda3\envs\python27
# 
# (base) C:\Users\name>

# 切换到python27环境下
conda activate python27

# 切回到base环境
deactivate

```

日志采集 FileBeat -> Redis -> Logstash 配置

``` shell
# FileBeat -> Redis
filebeat.inputs:
- type: log
  enabled: true
  paths:
    - /usr/local/openresty/nginx/logs/access.log
  fields:
    log_source: messages
  fields_under_root: true

output.redis:
  hosts: ["192.168.0.1:6379"]
  key: nginx_log
  password: password
  db: 0


# Redis -> Logstash
input {
  redis {
    batch_count => 1 #EVAL命令返回的事件数目
    data_type => "list" #logstash redis插件工作方式
    key => "logstash-test-list" #监听的键值
    host => "127.0.0.1" #redis地址
    port => 6379 #redis端口号
    codec => "plain" #编码插件json
    password => "123qwe" #如果有安全认证，此项为密码
    db => 0 #redis数据库的编号
    threads => 1 #启用线程数量
  }
}
output {
  stdout{
  }
}

## db
Redis里面有数据库的概念，一般是16个，默认登录后是0，可以通过命令选择。如果应用系统选择使用了不同的数据库，那么可以通过配置这个参数从指定的数据库中读取信息。

## key
Redis中的数据都是通过键值来索引的，不管是字符串还是列表，所以这个key相当于数据库中的表。
如果是list或者channel模式，key都是指定的键值；而如果是pattern_channel，那么key可以通过glob通配的方式来指定。

## password
有的Redis为了安全，是需要进行验证的。只有设置了password，才能正确的读取信息。相反，如果redis没有设置密码，而logstash中配置了密码，也会报错！

## batch_count
这个属性设置了服务器端返回的事件数目，比如设置了5条，那么每次请求最多会直接获取5条日志返回。

## data_type logstash工作的类型
logstash中的redis插件，指定了三种方式来读取redis队列中的信息。
list=>BLPOP
channel=>SUBSCRIBE
pattern_channel=>PSUBSCRIBE
其中list，相当于队列；
channel相当于发布订阅的某个特定的频道；
pattern_channel相当于发布订阅某组频道；
channel与pattern_channel区别就在于一个是监听特定的键值，一个是监听某一组键值。
```

### 4.Share:

Logstash最佳实践
http://doc.yonyoucloud.com/doc/logstash-best-practice-cn/index.html
CentOS 7离线安装Redis
https://www.jellythink.com/archives/379
使用Redis的用户要请往这瞅瞅，小心数据泄漏！
https://bbs.huaweicloud.com/blogs/103636