---
title: ARTS-week-12
date: 2020-03-22 11:18:15
tags:
---

## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm: 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

Subsets https://leetcode.com/submissions/detail/317114194/

### 2.Review:

https://medium.com/@gvanrossum_83706/peg-parsers-7ed72462f97c

#### 点评：

Guido van Rossum 是 Python 之父去年写了关于 PEG 解析器的系列文章，作者去年学了很多关于 PEG（Parsing Expression Grammars）打算用 PEG 换掉自己写的 LL(1) 解析器 pgen。

pgen 存在的问题： 1.LL(1) 名字中的 “1” 表明它只使用单一的前向标记符（a single token lookahead），但某些规则（如 expr 和 term）是左递归的，而 pgen 还不足以聪明地解析。前向的单一标记符，解析器无法确定它查看的是一个表达式的开头，还是一个赋值。

PEG 解析器是如何解决的：通过使用无限的前向缓冲！PEG 解析器的经典实现中使用了一个叫作“packrat parsing” 的东西，它不仅会在解析之前将整个程序加载到内存中，而且还能允许解析器任意地回溯。 PEG 语法生成的解析器是可以无限回溯的递归下降（recursive-descent）解析器，“packrat parsing”通过记忆每个位置所匹配的规则，来使之生效。

2.pgen 驱动的解析器输出的是一个解析树，但是这个解析树并不直接用作代码生成器的输入。它首先会被转换成抽象语法树（AST），然后再被编译成字节码。原因 AST 比解析树更稳定，这减少了编译器出错的可能。

作者现在的想法是看看能否为 CPython 创造一个新的解析器，在解析时，使用 PEG 与 packrat parsing 来直接构建 AST，从而跳过中间解析树结构，并尽可能地节省内存，尽管它会使用无限的前向缓冲。转换成 PEG 的最后一个好处是它为语言的未来演化提供了更大的灵活性。

总结： 作者打算通过 PEG 创建一个新的 CPython 解析器。收益是未来演化提供了更大的灵活性，并解决递归下降算法中的表达式左递归问题。

### 3.Tip:

scp 远程下载文件免密码验证方式

1.sshpass

``` shell
1.创建编译安装目录
mkdir /usr/local/sshpass
cd /usr/local/sshpass
2.从 http://sourceforge.net/projects/sshpass/ 下载 sshpass-1.06.tar.gz 并上传到 /usr/local/sshpass 
3.解压 
tar -zxvf sshpass-1.06.tar.gz
4.进入解压后的文件目录
cd sshpass-1.06
5.安装
./configure --prefix=/usr/local/sshpass
make & make install
6.创建软链接
ln -s /usr/local/sshpass/bin/sshpass /usr/bin/sshpass
7.检验是否安装成功
sshpass
出现如下提示即安装成功：
Usage: sshpass [-f|-d|-p|-e] [-hV] command parameters
   -f filename   Take password to use from file
   -d number     Use number as file descriptor for getting password
   -p password   Provide password as argument (security unwise)
   -e            Password is passed as env-var "SSHPASS"
   With no parameters - password will be taken from stdin

   -h            Show help (this screen)
   -V            Print version information
At most one of -f, -d, -p or -e should be used

使用：
sshpass -p '密码' scp -P 端口 -r 用户名@主机名:源文件 目的文件
例子： 
sshpass -p '123456' scp -P 5000 -r root@192.168.0.1:/data/src_file.txt /data/dest_file
```

2.expect

``` shell
1. shell 脚本
#!/usr/bin/expect
set timeout 10
set host [lindex $argv 0]
set username [lindex $argv 1]
set password [lindex $argv 2]
set src_file [lindex $argv 3]
set dest_file [lindex $argv 4]
spawn scp $src_file $username@$host:$dest_file
 expect {
 "(yes/no)?"
  {
    send "yes\n"
    expect "*assword:" { send "$password\n"}
  }
 "*assword:"
  {
    send "$password\n"
  }
}
expect "100%"
expect eof

使用
./expect_scp 主机名 用户名 密码 源文件 目的文件
例子：
./expect_scp 192.168.0.1 root 123456 /data/src_file.txt /data/dest_file

2. python 脚本
#!/usr/bin/python
#coding:utf-8
import sys,re
import os
import subprocess
 
#scp file to remote node.
def expect_scp(user,ip,password,localsource,remotedest,port=22):
 
  SCP_CMD_BASE = r"""
      expect -c "
      set timeout 300 ;
      spawn scp -P {port} -r {localsource} {username}@{host}:{remotedest} ;
      expect *assword* {{{{ send {password}\r }}}} ;
      expect *\r ;
      expect \r ;
      expect eof
      "
  """.format(username=user,password=password,host=ip,localsource=localsource,remotedest=remotedest,port=port)
  SCP_CMD = SCP_CMD_BASE.format(localsource = localsource)
  print "execute SCP_CMD: ",SCP_CMD
  p = subprocess.Popen( SCP_CMD , stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True)
  p.communicate()
 
  os.system(SCP_CMD)
   
使用
expect_scp(用户名,主机名,密码,源文件,目的文件,端口）
例子：
expect_scp("root","192.168.156.72","密码","/tmp/var/log","/etc/",22)
```

3.建立SSH的信任关系

``` shell
1.输入命令生成key:
$ ssh-keygen -t rsa 
一直按回车，会在 /root/.ssh 生成三个文件:
authorized_keys
id_rsa.pub
id_rsa
注意：为了各个主机之间免登录，每台主机都需要执行

2.设定其中一台主机为 master 合并公钥到 authorized_keys 中
$ cd /root/.ssh # 进入/root/.ssh 目录
$ cat id_rsa.pub >> authorized_keys # 把 master 公钥合并到 authorized_keys 中
$ ssh root@slave1_IP cat ~/.ssh/id_rsa.pub >> authorized_keys # 把 slave1 公钥合并到 authorized_keys 中
$ ssh root@slave2_IP cat ~/.ssh/id_rsa.pub >> authorized_keys # 把 slave2 公钥合并到 authorized_keys 中

3.把 master 的 authorized_keys 复制到所有 slave 主机中
$ scp authorized_keys slave1_IP:/root/.ssh/
$ scp authorized_keys slave2_IP:/root/.ssh/

4.复制完成后，每台主机重启 ssh 服务
$ service sshd restart

5.每台主机输出测试能否无需输入密码连接其他主机
$ ssh 主机_IP
```

### 4.Share:

Comparison of parser generators 
https://blog.csdn.net/gongwx/article/details/99645305

Open Source Parser Generators in Java 
https://java-source.net/open-source/parser-generators