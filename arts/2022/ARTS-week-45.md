---
> **ARTS-week-45**
> 2022-11-5 21:04
---


###### ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
- Algorithm: 每周至少做一个 leetcode 的算法题
- Review: 阅读并点评至少一篇英文技术文章
- Tip: 学习至少一个技术技巧
- Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

- [481. 神奇字符串 (^^+)](https://leetcode.cn/submissions/detail/378145930/)  
  + 思路:模拟
- [1620. 网络信号最好的坐标 (^^+)](https://leetcode.cn/submissions/detail/378795723/)  
  + 思路:模拟
- [754. 到达终点数字 (^^+)](https://leetcode.cn/submissions/detail/379367244/)  
  + 思路: 数学

### 2.Review:

- [Apache Parquet support for ScyllaDB](https://docslib.org/doc/11888741/apache-parquet-support-for-scylladb)  
- [GNU 核心实用程序简介](https://opensource.com/article/18/4/gnu-core-utilities)

#### 点评：

- 摘要
大多数 Linux 系统管理员需要做的事情都可以在 GNU coreutils 或 util-linux 中找到。

许多 Linux 系统管理员最基本和常用的工具主要包括在两套实用程序中：GNU 核心实用程序（coreutils）和 util-linux。它们的基本功能允许系统管理员执行许多管理 Linux 系统的任务，包括管理和操作文本文件、目录、数据流、存储介质、进程控制、文件系统等等。

这些工具是不可缺少的，因为没有它们，就不可能在 Unix 或 Linux 计算机上完成任何有用的工作。鉴于它们的重要性，让我们来研究一下它们。

- GNU coreutils

要了解 GNU 核心实用程序的起源，我们需要乘坐时光机进行一次短暂的旅行，回到贝尔实验室的 Unix 早期。编写 Unix 是为了让 Ken Thompson、Dennis Ritchie、Doug McIlroy 和 Joe Ossanna 可以继续他们在大型多任务和多用户计算机项目 Multics 上的工作：开发一个叫做《太空旅行》游戏的小东西。正如今天一样，推动计算技术发展的似乎总是游戏玩家。这个新的操作系统比 Multics（LCTT 译注：multi- 字头的意思是多数的）的局限性更大，因为一次只能有两个用户登录，所以被称为 Unics（LCTT 译注：uni- 字头的意思是单独的）。后来这个名字被改成了 Unix。

随着时间的推移，Unix 取得了如此巨大的成功，开始贝尔实验室基本上是将其赠送给大学，后来送给公司也只是收取介质和运输的费用。在那个年代，系统级的软件是在组织和程序员之间共享的，因为在系统管理这个层面，他们努力实现的是共同的目标。

最终，AT&T 公司的老板们决定，他们应该在 Unix 上赚钱，并开始使用限制更多的、昂贵的许可证。这发生在软件变得更加专有、受限和封闭的时期，从那时起，与其他用户和组织共享软件变得不可能。

有些人不喜欢这种情况，于是用自由软件来对抗。Richard M. Stallman（RMS），他带领着一群“反叛者”试图编写一个开放的、自由的可用操作系统，他们称之为 GNU 操作系统。这群人创建了 GNU 实用程序，但并没有产生一个可行的内核。

当 Linus Torvalds 开始编写和编译 Linux 内核时，他需要一套非常基本的系统实用程序来开始执行一些稍微有用的工作。内核并不提供命令或任何类型的命令 shell，比如 Bash，它本身是没有任何用处的，因此，Linus 使用了免费提供的 GNU 核心实用程序，并为 Linux 重新编译了它们。这让他拥有了一个完整的、即便是相当基本的操作系统。

可以通过在终端命令行中输入命令 info coreutils 来了解 GNU 核心实用程序的全部内容。下面的核心实用程序列表就是这个信息页面的一部分。这些实用程序按功能进行了分组，以方便查找；在终端中，选择想了解更多信息的组，然后按回车键。

```c++
* Output of entire files::       cat tac nl od base32 base64
* Formatting file contents::     fmt pr fold
* Output of parts of files::     head tail split csplit
* Summarizing files::            wc sum cksum b2sum md5sum sha1sum sha2
* Operating on sorted files::    sort shuf uniq comm ptx tsort
* Operating on fields::          cut paste join
* Operating on characters::      tr expand unexpand
* Directory listing::            ls dir vdir dircolors
* Basic operations::             cp dd install mv rm shred
* Special file types::           mkdir rmdir unlink mkfifo mknod ln link readlink
* Changing file attributes::     chgrp chmod chown touch
* Disk usage::                   df du stat sync truncate
* Printing text::                echo printf yes
* Conditions::                   false true test expr
* Redirection::                  tee
* File name manipulation::       dirname basename pathchk mktemp realpath
* Working context::              pwd stty printenv tty
* User information::             id logname whoami groups users who
* System context::               date arch nproc uname hostname hostid uptime
* SELinux context::              chcon runcon
* Modified command invocation::  chroot env nice nohup stdbuf timeout
* Process control::              kill
* Delaying::                     sleep
* Numeric operations::           factor numfmt seq
```

这个列表里有 102 个实用程序。它涵盖了在 Unix 或 Linux 主机上执行基本任务所需的许多功能。但是，很多基本的实用程序都缺失了，例如，mount 和 umount 命令不在这个列表中。这些命令和其他许多不在 GNU 核心实用程序中的命令可以在 util-linux 中找到。

- util-linux

util-linix 实用程序包中包含了许多系统管理员常用的其它命令。这些实用程序是由 Linux 内核组织发布的，这 107 条命令中几乎每一个都来自原本是三个单独的集合 —— fileutils、shellutils 和 textutils，2003 年它们被合并成一个包：util-linux。

```c
agetty          fsck.minix      mkfs.bfs        setpriv 
blkdiscard      fsfreeze        mkfs.cramfs     setsid 
blkid           fstab           mkfs.minix      setterm 
blockdev        fstrim          mkswap          sfdisk 
cal             getopt          more            su 
cfdisk          hexdump         mount           sulogin 
chcpu           hwclock         mountpoint      swaplabel 
chfn            ionice          namei           swapoff 
chrt            ipcmk           newgrp          swapon 
chsh            ipcrm           nologin         switch_root 
colcrt          ipcs            nsenter         tailf 
col             isosize         partx           taskset 
colrm           kill            pg              tunelp 
column          last            pivot_root      ul 
ctrlaltdel      ldattach        prlimit         umount 
ddpart          line            raw             unshare 
delpart         logger          readprofile     utmpdump 
dmesg           login           rename          uuidd 
eject           look            renice          uuidgen 
fallocate       losetup         reset           vipw 
fdformat        lsblk           resizepart      wall 
fdisk           lscpu           rev             wdctl 
findfs          lslocks         RTC Alarm       whereis 
findmnt         lslogins        runuser         wipefs 
flock           mcookie         script          write 
fsck            mesg            scriptreplay    zramctl 
fsck.cramfs     mkfs            setarch
```

这些实用程序中的一些已经被淘汰了，很可能在未来的某个时候会从集合中被踢出去。应该看看维基百科的 util-linux 页面来了解其中许多实用程序的信息，而 man 页面也提供了关于这些命令的详细信息。

- 总结

这两个 Linux 实用程序的集合，GNU 核心实用程序和 util-linux，共同提供了管理 Linux 系统所需的基本实用程序。在研究这篇文章的过程中，我发现了几个有趣的实用程序，这些实用程序是我从不知道的。这些命令中的很多都是很少需要的，但当需要的时候，它们是不可缺少的。

在这两个集合里，有 200 多个 Linux 实用工具。虽然 Linux 的命令还有很多，但这些都是管理一个典型的 Linux 主机的基本功能所需要的。

### 3.Tip:

#### Linux 之 touch 命令

命令用于修改文件或者目录的时间属性，包括访问时间和修改时间，若文件不存在，系统会建立一个新的文件。我们平时用得最多的是通过touch创建一个空文件，实际上通过touch命令可以修改文件的atime、mtime，所以文件的真实访问时间和修改时间是可以被修改，我们在排查系统异常的时候还需要结合日志、历史命令等等因素综合决策。

1、获取命令帮助
2、查看命令版本
3、创建一个空文件
4、更新atime、mtime、ctime
使用touch命令，如果文件存在则更新atime,mtime,ctime为当前时间。
5、-a更新atime和ctime
使用-a参数，touch文件时，文件存在只会更新atime和ctime为当前时间。
6、-m参数修改mtime
使用-m参数，touch文件时，文件存在只会更新mtime和ctime为当前时间。
7、-d参数将文件的atime,mtime,ctime按照设置修改
使用touch -d "3 years ago"可以将文件的三个时间改为3年前。
8、-t参数修改atime和mtime
使用touch -t "[[CC]YY]MMDDhhmm[.ss]"修改文件的atime和mtime
9、使用-at参数只修改atime
如果只想更新atime可以使用-at组合参数。
10、使用-mt参数只修改mtime
如果只想更新mtime可以使用-mt组合参数。
11、-r参数修改文件时间属性为另一文件时间属性
通过touch -r file1 file2，将file2的时间属性值修改为file1文件的时间属性。
12、-h更新软连接的时间属性
touch命令默认更新的是真实文件的时间属性，如果需要更新软连接的时间属性，需要使用-h参数。

#### Linux – Fake File Access, Modify and Change TimeStamps

```
$ NOW=$(date) && date -s "2030-08-15 21:30:11" && touch file.txt && date -s "$NOW"
```


### 4.Share:

- [Android WebView在API17后addJavascriptInterface方法无效](https://blog.csdn.net/u012721519/article/details/79173377)

- [一切尽在不言中 RESTful API设计指南(中)](http://it.hzqiuxm.com/%e4%b8%80%e5%88%87%e5%b0%bd%e5%9c%a8%e4%b8%8d%e8%a8%80%e4%b8%ad-2/)

- [理解本真的 REST 架构风格](https://www.infoq.cn/article/understanding-restful-style)

- [RESTful介绍和使用（Java）教程](https://blog.csdn.net/jiduochou963/article/details/90114653)

- [十分钟搞懂 WebAssembly](https://xie.infoq.cn/article/0bb5ff2fa5d5d9db492c88a4c)

- [甩掉容量规划炸弹：用 AHPA 实现 Kubernetes 智能弹性伸缩](https://www.51cto.com/article/720008.html)

- [GNU Coreutils](https://xy2401.com/local-docs/gnu/manual.zh/coreutils.html)

- [Linux – Fake File Access, Modify and Change TimeStamps](https://www.shellhacks.com/fake-file-access-modify-change-timestamps-linux/)