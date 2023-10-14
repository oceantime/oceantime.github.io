---
title: ARTS-week-30
date: 2020-08-02 19:26:21
tags:
---


## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm: 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

Student Attendance Record II https://leetcode.com/submissions/detail/374934742/

### 2.Review:

https://www.oreilly.com/content/hadoop-in-the-cloud/
运行于云端的 Hadoop —— 数据即服务的论证

#### 点评：

作者 Thomas Phelan 和 Joel Baxter 数据即服务的论证。

- 将 Hadoop 运行在云端
早期的Hadoop分布式计算平台都是运行内部存储的裸机服务器上，而云计算意味着基础设施资源的共享。许多研究现在正挑战着这一传统观念，表示Hadoop以往的计算和存储托管（co-location）架构对于有分布式应用程序的高性能不是必须的。

- 大数据即服务案例
近几年一类新的大数据即服务（Big-Data as a Service）解决方案已经出现了。这些解决方案的大部分都被用于机房以外的公共云服务，现在也有 Big-Data as a Service 可用于机房内的部署。然而，这避免不了云自身的一些问题，例如：
  - 系统可靠性；
  - 计算和存储性能；
  - 数据安全性；

- 对 Big-Data-as-Service 的评价
在云端部署大数据架构，只剩下两个问题：计算存储性能问题和数据安全性问题。
  - 容器技术，使得这种计算的负载已基本消除，CPU性能不再是采用大数据即服务的瓶颈。
  - 存储访问，更快的网络接入速度、新存储技术（如固态硬盘SSDs）以及对象存储这样的技术的引入使的我们可以重新评估Hadoop以往的计算和存储托管（co-location）架构。
  - 一些客户确实有数据和业务管理、隐私或操作权限的诸多要求，这使得他们选择在公共云服务中部署他们的大数据业务较为谨慎。但对于这类客户，可以通过提供客制化的解决方案和保姆化的服务来提高数据和业务的安全性，并最大限度地减少数据迁移的工作量。

### 3.Tip:

1. nginx 离线安装

```shell
# 下载 nginx 安装包
http://nginx.org/download/

# 安装第三方依赖
yum -y installgcc gcc-c++ autoconf automake make
yum install -ypcre pcre-devel
yum install -yopenssl openssl-devel

# 解压、编译、安装
tar –zxvf nginx-1.13.6.tar.gz
./configure --prefix=/usr/local/nginx  --with-http_ssl_module
make&&make install

# 配置环境变量
vim /etc/profile 
export NGINX_HOME= /usr/local/nginx
export PATH=$PATH:$NGINX_HOME/sbin

# 验证
nginx –v
```

2. centos 添加 nginx 服务

#### 新建文件

```shell
# 新建服务文件
vim /etc/init.d/nginx

# 添加服务代码
#!/bin/sh
# nginx - this script starts and stops the nginx daemin
#
# chkconfig:   - 85 15

# description:  Nginx is an HTTP(S) server, HTTP(S) reverse \
#               proxy and IMAP/POP3 proxy server

# processname: nginx
# config:      /usr/local/nginx/conf/nginx.conf
# pidfile:     /usr/local/nginx/logs/nginx.pid

# Source function library.

. /etc/rc.d/init.d/functions

# Source networking configuration.

. /etc/sysconfig/network

# Check that networking is up.

[ "$NETWORKING" = "no" ] && exit 0

nginx="/usr/local/nginx/sbin/nginx"

prog=$(basename $nginx)

NGINX_CONF_FILE="/usr/local/nginx/conf/nginx.conf"

lockfile=/var/lock/subsys/nginx

start() {

    [ -x $nginx ] || exit 5

    [ -f $NGINX_CONF_FILE ] || exit 6

    echo -n $"Starting $prog: "

    daemon $nginx -c $NGINX_CONF_FILE

    retval=$?

    echo

    [ $retval -eq 0 ] && touch $lockfile

    return $retval

}


stop() {

    echo -n $"Stopping $prog: "

    killproc $prog -QUIT

    retval=$?

    echo

    [ $retval -eq 0 ] && rm -f $lockfile

    return $retval

}



restart() {

    configtest || return $?

    stop

    start

}


reload() {

    configtest || return $?

    echo -n $"Reloading $prog: "

    killproc $nginx -HUP

    RETVAL=$?

    echo

}

force_reload() {

    restart

}


configtest() {

  $nginx -t -c $NGINX_CONF_FILE

}



rh_status() {

    status $prog

}


rh_status_q() {

    rh_status >/dev/null 2>&1

}

case "$1" in

    start)

        rh_status_q && exit 0
        $1
        ;;

    stop)


        rh_status_q || exit 0
        $1
        ;;

    restart|configtest)
        $1
        ;;

    reload)
        rh_status_q || exit 7
        $1
        ;;


    force-reload)
        force_reload
        ;;
    status)
        rh_status
        ;;


    condrestart|try-restart)

        rh_status_q || exit 0
            ;;

    *)

        echo $"Usage: $0 {start|stop|status|restart|condrestart|try-restart|reload|force-reload|configtest}"
        exit 2

esac

# 授权和启动服务
chmod 755 /etc/init.d/nginx
chkconfig --add nginx
service nginx start
```

### 4.Share:

比拼 Kafka, 大数据分析新秀 Pulsar 到底好在哪
https://blog.csdn.net/D55dffdh/article/details/84990154