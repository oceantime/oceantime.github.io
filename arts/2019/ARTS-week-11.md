---
title: ARTS-week-11
date: 2019-11-10 11:48:08
tags:
---

## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm： 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

Two Sum II - Input array is sorted https://leetcode.com/submissions/detail/277482299/
Climbing Stairs https://leetcode.com/submissions/detail/277483193/
Maximum Depth of Binary Tree https://leetcode.com/submissions/detail/277483608/

### 2.Review:

http://michal.karzynski.pl/blog/2016/06/19/building-beautiful-restful-apis-using-flask-swagger-ui-flask-restplus/

#### 点评：
文章系统介绍了flask中如何实现rest api及swagger ui，并结合Blog例子给出实践案例。
可以在实际flas项目开发中参考，rest api中给出以下特性：
API输入验证
格式化输出（如JSON）
生成交互式文档（带有UI）
将Python异常转换为机器可读的HTTP响应

### 3.Tip:

##### ImportError: No module named _ssl_ 解决方法
``` bash
如果系统没有 openssl 则手动安装
1.下载openssl，地址为 http://www.openssl.org/source/openssl-1.0.2a.tar.gz
2.安装：
tar -xzvf openssl-1.0.2a.tar.gz
./config --prefix=/usr/local --openssldir=/usr/local/openssl
make && make install
 
3.在/usr/local目录下找到lib64和include目录，(注意openssl的库是被安装到lib还是lib64，这步很重要)
找到路径/usr/local/lib64、/usr/local/include，后面的步骤会用到这两个路径
[root@Linux local]# pwd
/usr/local
[root@Linux local]# ll /usr/local/include
drwxr-xr-x 2 root  root 4096 Nov  6 17:19 openssl
 
4.下载Python安装包并解压
tar -xzf Python-3.6.0.tgz
cd Python-3.6.0
 
5.在Modules找到Setup.dist文件，按如下步骤修改，使编译Python的时候能找到刚才安装的openssl的库
1）找到SSL相关配置
#SSL=/usr/local/ssl
#_ssl _ssl.c \
#        -DUSE_SSL -I$(SSL)/include -I$(SSL)/include/openssl \
#        -L$(SSL)/lib -lssl -lcrypto
 
2) 由于openssl是被安装在/usr/local目录下的lib64和include目录的不是安装在/usr/local/ssl目录，所有把步骤1）找到的4行的注释去掉，如下修改
SSL=/usr/local
_ssl _ssl.c \
        -DUSE_SSL -I$(SSL)/include -I$(SSL)/include/openssl \
        -L$(SSL)/lib64 -lssl -lcrypto
        
6.编译安装Python，并创建软连接
./configure --prefix=/usr/local/python3
make && make altinstall
ln -s /usr/local/python3/bin/python3.6 /usr/bin/python3
ln -s /usr/local/python3/bin/pip3.6 /usr/bin/pip3
[root@Linux local]# which python3
/usr/local/bin/python3
[root@Linux local]# 

7.测试ssl是否能正常使用
[root@Linux local]# python3
Python 3.6.0 (default, Nov  6 2019, 17:36:49) 
[GCC 4.8.5 20150623 (Red Hat 4.8.5-16)] on linux2
Type "help", "copyright", "credits" or "license" for more information.
>>> import ssl
>>>
``` 

### 4.Share:
Elasticsearch实现类似 like '?%' 搜索（https://www.cnblogs.com/clonen/p/6674492.html）