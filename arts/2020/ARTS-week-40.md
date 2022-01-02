---
title: ARTS-week-40
date: 2020-06-14 06:49:20
tags:
---

## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm： 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

Edit Distance https://leetcode.com/submissions/detail/353470296/

### 2.Review:

https://dev.to/lydiahallie/javascript-visualized-generators-and-iterators-e36
JavaScript️可视化： 生成器和迭代器

#### 点评：

Lydia Hallie 讲解生成器使用的例子 。

总结
普通函数遵循一种称为 run-to-completion 的模型。 generator 函数不遵循 run-to-completion 模型，可以在执行 generator 函数的过程中随机暂停它。
实现了迭代器协议： Symbol.iterator。
- 调用 generator 函数返回生成器对象，该对象是迭代器。
- 可以在生成器函数中使用 yield 关键字来暂停执行。

### 3.Tip:


1. Nginx 反向代理多个 vue 效果

```shell
http://localhost:8080/进入最外层的 index.html
http://localhost:8080/project1 进入项目一
http://localhost:8080/project2 进入项目二
```

2. vue.config.js 配置

```shell

// project1
module.exports = {
   publicPath: '/project1/' // 注意前后的 ‘/’
}

// project2
module.exports = {
  publicPath: '/project2/' // 注意前后的 ‘/’
}

```

3. .env 配置,使用到了 BASE_API 作为代理的前缀

```shell

// project1
NODE_ENV=production
VUE_APP_API_BASE_URL=/api/pro1 // 这里待会与 nginx 配置对应
BASE_URL=/project1 // 注意更改子项目名，这个对应 vue.config.js publicPath

// project2
NODE_ENV=production
VUE_APP_API_BASE_URL=/api/pro2 // 这里待会与 nginx 配置对应
BASE_URL=/project2 // 注意更改子项目名，这个对应 vue.config.js publicPath

```

4. vue-router 文件配置 history 模式

```shell

// project1
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL, // 注意更改子项目名，这个对应 vue.config.js publicPath
  routes
})

// project2
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL, // 注意更改子项目名，这个对应 vue.config.js publicPath
  routes
})
```

5. Nginx 配置

```shell
.
├─conf
│  ├─... # 其他文件
│  └─nginx.conf
│
├─html # 只看这里，其他暂时我没用到 
│  ├─project1
│  │  └─static
│  │      ├─css
│  │      ├─fonts
│  │      └─js
│  │          ├─g
│  │          └─V
│  ├─project2
│  │   └─static
│  │       ├─css
│  │       ├─fonts
│  │       └─js
│  │           ├─g
│  │           └─V
│  ├─index.html
│  └─50x.html
└─... # 其他文件

# ...
# 反向代理
http {
    include mime.types;
    default_type application/octet-stream;

    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    sendfile        on;
    keepalive_timeout  65;

    client_max_body_size 20M;
    client_body_buffer_size 10M;
    large_client_header_buffers 4 128k;
    
    # 这里可以做集群
    upstream p1_server {
        server localhost:8081;
    }

    # 这里可以做集群
    upstream p2_server {
        server localhost:8082;
    }

    server {
        listen 8080;
        server_name localhost;
        charset utf-8;

        proxy_connect_timeout 180;
        proxy_send_timeout 180;
        proxy_read_timeout 180;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarder-For $remote_addr;

        root html; # 根项目路由文件夹
        
        # 根项目路由
        # 如果有多可以配置多个 conf 文件，使用 include 关联进来
        location / {
            try_files $uri $uri/ /index.html; # 这里可以理解指定到 html 文件夹下的 index.html
        }
        
        # project1
        # vue 项目的 vue.config.js publicPath
        # 也是 vue 项目中配置的 router 中的 base
        location ^~ /project1 {
            try_files $uri $uri/ /project1/index.html; # 这里可以理解指定到 html 文件夹下 project1 文件夹 的 index.html
        }
        
        # project2
        # 这里是项目二的配置
        location ^~ /project2 { # 
            try_files $uri $uri/ /project2/index.html; # 这里可以理解指定到 html 文件夹下 project2 文件夹 的 index.html
        }
        
        # 这里是 project1 配置需要调用的接口
        location /api/pro1 { # 这里就是在 vue 项目中 .env 的配置 BASE_API 
            proxy_redirect off;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_pass http://p1_server; # 此处的 p1_server 对应的上面的配置 upstream p1_server {}，这里可以做集群
        }
        
         # 这里是 project1 配置需要调用的接口
        location /api/pro2 { # 这里就是在 vue 项目中 .env 的配置 BASE_API
            proxy_redirect off;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_pass http://p2_server;  # 此处的 p2_server 对应的上面的配置 upstream p2_server {}，这里可以做集群
        }

        # ...
    }

    # ...
}
```

6. 验证

```shell
分别访问
http://localhost:8080
http://localhost:8080/project1
http://localhost:8080/project2
```

### 4.Share:

npm和bower的区别
https://www.jianshu.com/p/e422c28e2471
一行命令更新所有 npm 依赖包
https://www.cnblogs.com/stevexu/p/10744765.html
Gulp构建Angularjs应用
https://segmentfault.com/a/1190000005015099
前端打包构建工具Gulp、Rollup、Webpack、Webpack-stream
https://my.oschina.net/tongjh/blog/837663