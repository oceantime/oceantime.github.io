---
title: ARTS-week-2
date: 2019-09-22 11:43:37
tags:
---

## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm： 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

Add Two Numbers：https://leetcode.com/submissions/detail/258727869/

### 2.Review:

Metrics to Understand & Tackle Technical Debt
https://www.notion.so/stepsize/3-Metrics-to-Understand-Tackle-Technical-Debt-4e7442a592cf40759bdd7e3733b7f815

点评：
通过快速行动承担债务是理解系统如何构建及目的的短途径。文章提到了3个有效指标来衡量技术债务，优先偿还并持续跟踪进展。

所有权，防止缺陷和不必要的技术债
定义：
修订版本数计每个文件的历史活动及使用时间的折扣因子来计算所有权。超过n%所有权的贡献者为主要贡献者，所有其他贡献者为次要贡献者。
如何跟踪：
1.由所有者审查次要贡献者贡献及减少贡献
2.识别若拥有域定义所有者并计划提供其所有权

内聚力提升架构
定义：
提交都在路径内部的文件中为内聚提交，否则是非内聚提交。内聚提交和提交总数的比例为内聚力。
如何跟踪：
1.内聚占比：组件内部的修改可以隔离或减少对其他组件的影响。
2.耦合组件：了解那些组件和此组件有耦合，耦合强度，并找到根本原因。

流失以识别问题区域
定义：
过去1个月未修改的路径为稳定
过去1个月至少修改过2次的路径为活动
过去n个月也处于活动状态的路径为循环活动
如何跟踪：
1.改动频繁的文件:检查改动较多的文件确认是否和预期的，还是为了确保生产力避免意外而偿还的技术债务
2.检查文件更改频率：所有更改都进行审核，因为与缺陷密切相关
3.改动文件的比例：增长系统，指标保持在各个组件的水平，成熟系统，最小化次指标趋于稳定

### 3.Tip:

linux Expect 是一个用来处理交互的命令。借助 Expect 我们可以将交互过程写在一个脚本上，使之自动化完成。形象的说，ssh 登录，ftp 登录等都符合交互的定义。

shell 脚本实现 ssh 自动登录远程服务器示例:
``` bash
#!/usr/bin/expect
spawn ssh root@192.168.22.194
expect "*password:"
send "123\r"
expect "*#"
interact
```
Expect 中最关键的四个命令是 send expect spawn interact
``` xml
send：用于向进程发送字符串
expect：从进程接收字符串
spawn：启动新的进程
interact：允许用户交互
```
1. send 命令：接收一个字符串参数，并将该参数发送到进程
``` bash
expect1.1> send "hello world\n"
hello world
```
2. expect 命令：和 send 命令正好相反，expect 通常是用来等待一个进程的反馈。 expect 可以接收一个字符串参数，也可以接收正则表达式参数。和上文的 send 命令结合，现在我们可以看一个最简单的交互式的例子：
(1)基础知识
``` bash
expect "hi\n"
send "hello there!\n"
#这两行代码的意思是：从标准输入中等到hi和换行键后，向标准输出输出 hello there。

#tips： $expect_out(buffer)存储了所有对expect的输入，<$expect_out(0,string)>存储了匹配到expect参数的输入。
#比如如下程序：

expect "hi\n"
send "you typed <$expect_out(buffer)>"
send "but I only expected <$expect_out(0,string)>"
#当在标准输入中输入

test
hi
#是，运行结果如下

you typed: test
hi
I only expect: hi
```
(2)模式-动作
``` bash
#expect 最常用的语法是来自 tcl 语言的模式-动作。 这种语法极其灵活，下面我们就各种语法分别说明。

#单一分支模式语法：

expect "hi" {send "You said hi"}
#匹配到hi后，会输出"you said hi"

#多分支模式语法：

expect "hi" { send "You said hi\n" } \
"hello" { send "Hello yourself\n" } \
"bye" { send "That was unexpected\n" }
#匹配到 hi hello bye 任意一个字符串时，执行相应的输出。等同于如下写法：

expect {
"hi" { send "You said hi\n"}
"hello" { send "Hello yourself\n"}
"bye" { send "That was unexpected\n"}
}
``` 
3. spawn 命令：上文的所有 demo 都是和标准输入输出进行交互，但是我们跟希望他可以和某一个进程进行交互。 spawm 命令就是用来启动新的进程的。 spawn 后的 send 和 expect 命令都是和 spawn 打开的进程进行交互的。 结合上文的 send 和 expect 命令我们可以看一下更复杂的程序段了。
``` bash
set timeout -1
spawn ftp ftp.test.com      # 打开新的进程，该进程用户连接远程ftp服务器
expect "Name"               # 进程返回Name时
send "user\r"               # 向进程输入anonymous\r
expect "Password:"          # 进程返回Password:时
send "123456\r"             # 向进程输入don@libes.com\r
expect "ftp> "              # 进程返回ftp>时
send "binary\r"             # 向进程输入binary\r
expect "ftp> "              # 进程返回ftp>时
send "get test.tar.gz\r"    # 向进程输入get test.tar.gz\r
#这段代码的作用是登录到 ftp 服务器 ftp ftp.uu.net 上，并以二进制的方式下载服务器上的文件 test.tar.gz 。
``` 
4. interact 命令：到现在为止，我们已经可以结合 spawn expect send自动化的完成很多任务了。 但是，如何让人在适当的时候干预这个过程了。比如下载完 ftp 文件时，仍然可以停留在 ftp 命令行状态，以便手动的执行后续命令。 interact 可以达到这些目的。
下面一段脚本实现了从机器 A 登录到机器 B ，然后执行机器 B 上的 pwd 命令，并停留在 B 机器上，等待用户交互。
``` bash
#!/home/tools/bin/64/expect -f
 set timeout -1  
 spawn ssh $BUser@$BHost
 expect  "*password:" { send "$password\r" }
 expect  "$*" { send "pwd\r" }
 interact
``` 

### 4.Share:

OpenSSL 证书生成及Mac上Apache服务器配置 HTTPS(https://www.jianshu.com/p/b2a9655fe687)
