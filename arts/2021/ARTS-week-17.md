---
> **ARTS-week-17**
> 2021-05-05 20:32
---


## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm： 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

数组问题练习：https://leetcode-cn.com/leetbook/read/top-interview-questions-easy/x2i30g/
- 加一
- 移动零
- 两数之和
- 有效的数独
- 旋转图像

### 2.Review:

https://golangcode.com/read-a-files-contents/
读取文件到字符串

#### 点评：

作者 Author: Edd Turtle

Go 中有多种实现此目的的方法-全部有效。在本指南中，尽管我们采用了简单的方法。通过使用 ioutil，我们不必担心关闭文件或使用缓冲区，这使我们很容易。尽管代价是对于我们需要文件的哪些部分没有灵活性。：

```golang
package main

import (
    "fmt"
    "io/ioutil"
    "log"
)

func main() {

    // Read entire file content, giving us little control but
    // making it very simple. No need to close the file.
    content, err := ioutil.ReadFile("golangcode.txt")
    if err != nil {
        log.Fatal(err)
    }

    // Convert []byte to string and print to screen
    text := string(content)
    fmt.Println(text)
}
```


### 3.Tip:

#### Windows10 WSL 命令

```shell
wsl -l  # 查看win10系统安装的linux子系统
wsl -l --running #查看运行子系统
wsl --veresion # 版本信息和命令行参数
wsl -d Ubuntu-18.04 # 运行子系统
wsl -t Ubuntu-18.04 # 停止子系统
 
备份与还原：
wsl --export Ubuntu-18.04 c:\tmp\Ubuntu-18.04.tar # 备份子系统到指定的tar文件
wsl --unregister Ubuntu-18.04 # 删除子系统
wsl --import Ubuntu-18.04 c:\WSL c:\tmp\Ubuntu-18.04.tar #还原子系统
```

#### Postgresql 帐号密码修改方法

```shell
#su postgres   
-bash-3.2$psql -U postgres   
postgres=#alter user postgres with password 'new password';  
postgres=#\q
```

#### 使用 docker-compose 在 Docker 中启动有密码的 Redis 容器

```yml
redis:
  image: redis
  container_name: my_redis
  command: redis-server --requirepass yourpassword
  ports:
    - "6379:6379"
  volumes:
    - ./data:/data
```

#### 使用 webpack-dev-server 进行编译，在磁盘上编写和提供静态内容 (js / css)

```js
devServer: {
    historyApiFallback: true,
    contentBase: './'
}
```

#### nginx sub 模块替换文本

```shell
1.安装 ngx_http_sub_module
# nginx 默认是不安装 ngx_http_sub_module 模块的，直接应用 sub_filter 指令将报错,因此需要在编译过程中添加 --with-http_sub_module 参数
# 编译
./configure --prefix=/nginx-sub  --with-http_sub_module
# 安装
make install

2.sub 模块替换文本
官网文档说明，ngx_http_sub_module包括四个命令：

sub_filter string replacement; 
将字符串string修改成replacement，不区分大小写，传入文本是上一次处理后的文本

sub_filter_last_modified on | off;　　　　default: off
是否阻止 response header 中写入 Last-Modified，防止缓存，默认是 off，即防止缓存

sub_filter_once on | off;　　　　　　　　default: on　　　　　　
sub_filter 指令是执行一次，还是重复执行，默认是只执行一次

sub_filter_types mime-type ...;　　　　　 default: text/html　　　　
指定类型的 MINE TYPE 才有效
```


### 4.Share:

https://imququ.com/post/my-nginx-conf-for-security.html
本博客 Nginx 配置之安全篇

https://blog.csdn.net/qq_35246620/article/details/79104520
Linux 命令之 find：查找文件

https://www.jianshu.com/p/68be095f983c
postgres pg ubuntu 安装

https://blog.51cto.com/darrenmemos/1971280
pg_hba.conf 和 pg_ident.conf

https://www.cnblogs.com/fsg6/p/14117791.html
关于webpack配置webpack-dev-server 报错问题。Error: Cannot find module 'webpack-cli/bin/config-yargs'

https://blog.csdn.net/qq_16485855/article/details/106619413
实现 tomca t的 https 单向认证及双向认证

https://stackoverflow.com/questions/57120378/jasypt-encryption-successful-but-decryption-fails-for-stronger-algorithms
Jasypt: Encryption successful but decryption fails for stronger algorithms

https://www.freesion.com/article/4809112436/
POWERVIM - 强大的 VIM 配置
