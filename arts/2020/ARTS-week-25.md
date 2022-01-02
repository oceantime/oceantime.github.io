---
title: ARTS-week-25
date: 2020-03-01 16:06:18
tags:
---

## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm： 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

Letter Combinations of a Phone Number https://leetcode.com/submissions/detail/308293205/

### 2.Review:

https://www.sitepoint.com/fixing-bugs-in-running-java-code-with-dynamic-attach/

#### 点评：

本文作者通过利用大多数 JVM 具备 Java 的 HotSwap 特性，有可能在不重启 Java 进程条件下，改变 Java 方法的实现类。通过这种方式，不用停止运行程序，就可以扩展在线的应用程序，或者在运行的项目上修复小的 Bug 。这篇文章中，作者演示了动态绑定、应用运行期代码变化进行绑定、并介绍一些工具 API 以及 Byte Buddy 库，通过 Byte Buddy 库提供的 API 代码相对更方便更改。

大概分为以下几个步骤：
1.Attach API：使用动态附件来渗透另外一个 JVM
2.Instrumentation API：修改目标 VM 的程序
3.使用 Byte Buddy 来追踪内存泄漏

总结：
通过 attach API 使得将一个 Java 代理按顺序注入到任意一个运行中的 JVM 进程成为可能。该代理被表示为一个 JAR 文件，里面包含了一个类，类里面有一个远程进程可以在一个指定线程中执行的 agentmain 方法。该方法可以接收一个 Instrumentation 接口的实例作为参数，可以读已经加载的类进行重新定义。对代码的重定义，既可以通过用打了补丁的版本替换整个 class 文件来实现，也可以通过对现有类的字节码进行修改来实现，这样的操作可以比较简单的用诸如 Byte Buddy 这样的库来完成。

### 3.Tip:

1. Windows 下类似 Linux 的 which 命令:
``` shell
# cmd 下执行
C:\Users\{username}\> for %x in (test.exe) do @echo %~PATH:x

# pwoershell 下执行
PS C:\Users\{username}\> Get-Command test.exe
```

2. npm update check failed 问题解决:
``` shell
# 问题提示
# npm update check failed
# Try running with sudo or get access
# to the local update config store via
# sudo chown -R $USER:$(id -gn $USER) /home/{username}/.config

## linux 下
/home/{username}/ rm -rf .config/configstore

## Windows 下(管理员权限)
C:\Users\{username}\> del .config

```

### 4.Share:

用 inotify 监控 Linux 文件系统事件
https://www.ibm.com/developerworks/cn/linux/l-inotify/index.html
