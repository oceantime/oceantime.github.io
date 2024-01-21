---
> **ARTS-week-08**
> 2021-02-28 17:32
---


## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm: 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

678. 有效的括号字符串 https://leetcode-cn.com/submissions/detail/147744211/
1190. 反转每对括号间的子串 https://leetcode-cn.com/submissions/detail/147753534/
617. 合并二叉树 https://leetcode-cn.com/submissions/detail/148061857/

### 2.Review:

https://geekflare.com/csp-frame-ancestors-configuration/
如何在 Apache，Nginx 中配置 CSP 框架 ancestors

#### 点评：

作者给出通过实施 CSP（内容安全策略）标头来保护网站免遭点击劫持攻击，frame-ancestors 与 X-Frame-Options 标头相比，在 CSP 版本2中引入的被调用的指令之一提供了更大的灵活性。 frame-ancestors 以与 X-Frame-Options 相同的方式工作，以允许或禁止使用 iframe，frame，object，embed 和 applet 元素嵌入资源。实现过程：


Apache HTTP：
- 全部拒绝：Header set Content-Security-Policy "frame-ancestors none;"
- 允许自己，但拒绝其他人：Header set Content-Security-Policy "frame-ancestors 'self';"
- 允许来自自己和多个域：Header set Content-Security-Policy "frame-ancestors 'self' test.com test.dev test.io;"

Nginx:
- 全部拒绝：add_header Content-Security-Policy "frame-ancestors none;";
- 允许自己，但拒绝其他人：add_header Content-Security-Policy "frame-ancestors 'self';";
- 允许来自自己和多个域：add_header Content-Security-Policy "frame-ancestors test.com test.dev test.io;";

确认:完成实施后，可以使用浏览器内置的开发人员工具或安全标头测试工具。


### 3.Tip:

#### Python3 安装异常

1.Python3 安装 paramiko 异常： command 'gcc' failed
```shell
# 1.安装依赖
sudo apt-get install openssl-delvel python-delvel python3-delvel libffi-delvel zlib zlib-delvel gcc gcc-c++ sqlite-delvel readline-delvel

# 2.解决依赖后重新安装 
pip install paramiko
```

2.Python3 安装 psycopg2 异常： pg_config executable not found
```shell
# 1.安装依赖
sudo apt-get install libpq-dev
# 2.解决依赖后重新安装 
pip install psycopg2
```

3.Python3 更新 six 异常： pip "Cannot uninstall 'six'.It is a distutils installed project..."
```shell
pip install six --upgrade --ignore-installed six
```

### 4.Share:

https://segmentfault.com/a/1190000021746086
利用 docker 和 docker-compose 部署单机 kafka

https://forum.dorisdb.com/t/topic/60
【Doris全面解析】存储层设计介绍

https://blog.csdn.net/wutongyuwxc/article/details/82624583
kibana安装及使用说明

https://www.fujieace.com/python/os-fork.html
AttributeError: module ‘os’ has no attribute ‘fork’ 原因与解决方法

https://www.jianshu.com/p/a81d63600244
Nginx的https配置记录以及http强制跳转到https的方法梳理

https://jingyan.baidu.com/article/48206aeae52f22606bd6b337.html
Win10如何解决端口被占用的问题