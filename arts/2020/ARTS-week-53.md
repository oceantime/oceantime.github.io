---
title: ARTS-week-53
date: 2020-09-13 20:40:13
tags:
---


## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm： 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

Word Search II https://leetcode.com/submissions/detail/395080215/

### 2.Review:

https://stackoverflow.blog/2020/09/02/if-everyone-hates-it-why-is-oop-still-so-widely-spread/?utm_source=Iterable&utm_medium=email&utm_campaign=the_overflow_newsletter
如果每个人都讨厌它，为什么OOP仍然如此广泛传播？

#### 点评：

作者 Medi Madelen Gwosdz OOP取得了巨大的成功。但是成功仅仅是偶然吗？并且它还能在2020年提供其他编程范例无法提供的独特功能吗？

OOP可以做什么呢？OOP有一些有价值的方面，即使它有缺点，也有一些方面使其无处不在。让我们看一下OOP的基石。

- 封装:这意味着，如果可能的话，通常会将数据从语言的其他部分隐藏起来（放在胶囊中）。OOP默认封装数据；对象包含数据和影响该数据的方法，良好的OOP实践意味着您提供了getter和setter方法来控制对数据的访问。这样可以防止可变数据被随意更改，并使应用程序数据更安全。据说，这是OOP的最大好处之一。尽管它最常与面向对象的编程相关联，但概念本身实际上与它是分开的，可以在不使用对象的情况下实现。抽象是此处封装的补充概念。在封装隐藏内部信息的地方，抽象提供了易于使用的公共数据接口。在任何情况下，它都不是唯一的OOP功能，并且可以通过隔离系统功能或模块数据以及模块中对这些数据的操作的模块来完成。

- 继承:因为可以将对象创建为其他对象的子类型，所以它们可以从那些对象继承变量和方法。这允许对象支持由先前类型定义的操作，而不必提供自己的定义。目的是不要重复自己—难以维护同一代码的多次使用。但是函数式编程也可以通过可重用的函数来实现DRY。内存效率也是如此。即使继承确实对此有所贡献，FP中的闭包概念也是如此。 虽然继承是面向对象的特定概念，但有人认为继承可以通过组合更好地实现。如果失去继承，则对象和方法将迅速溶解为结构和过程的语法糖。注意：继承对于允许多态性也是必要的，我们将在下面讨论。

- 多态性:从字面上讲，这种改变形状的概念允许一个对象或方法（无论是通用对象，接口还是常规对象）充当其他对象和方法的模板。有多种形式的多态性。单个函数可以重载，变形并适应其所在的任何类。面向对象的编程倾向于使用许多子类型多态性和即席多态性，但是同样，这不限于OOP。 


### 3.Tip:

LINUX创建用户没有密码只使用ssh登录

1.添加用户（不要密码）

```shell
useradd -m -d /home/$username -s /bin/bash $username
```

2.添加sudo权限

```shell
echo '$username ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers.d/$username
```

3.进入用户，创建密钥

```shell
su - $username
ssh-keygen
```

4.处理密钥

```shell
cd ~/.ssh
cat id_rsa.pub >> authorized_keys
```

5.SSH登录设置

```shell
chmod 600 ~/.ssh/authorized_keys
chmod 700 ~/.ssh
```

6.添加配置 /etc/ssh/sshd_config

```shell
RSAAuthentication yes
PubkeyAuthentication yes
```

### 4.Share:

https://sq.163yun.com/blog/article/184733100361850880s
基于JavaScript的代码编辑器的比较和选型