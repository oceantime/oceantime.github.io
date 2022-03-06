---
> **ARTS-week-04**
> 2021-02-01 19:43
---


## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm： 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

387. 字符串中的第一个唯一字符 https://leetcode-cn.com/submissions/detail/142935594/

### 2.Review:

http://attilaolah.eu/2014/09/10/json-and-struct-composition-in-go/
Go 中的 JSON 和结构组合

#### 点评：

作者：Attila Oláh 假设您要将 JSON 对象转为 Go 结构。可能会用 json.Marshaler , 但它有一些缺点:
- 复杂性：为大型结构添加了许多额外的代码
- 内存使用情况：必须注意不要做不必要的分配

以下时一些 JSON 结构化的通用技巧：
- 临时忽略 struct 字段
```json
type User struct {
    Email    string `json:"email"`
    Password string `json:"password"`
    // many more fields…
}

# 临时忽略掉 Password 字段
json.Marshal(struct {
     *User
     Password bool `json:"password,omitempty"` }{
     User: user, })

# 临时忽略掉 Password 字段，并且添加 token 字段
json.Marshal(struct {
    *User
    Token    string `json:"token"`
    Password bool `json:"password,omitempty"`
}{
    User: user,
    Token: token,
})
```


- 临时粘合两个 struct
```json
type BlogPost struct {
    URL   string `json:"url"`
    Title string `json:"title"`
}

type Analytics struct {
    Visitors  int `json:"visitors"`
    PageViews int `json:"page_views"`
}

json.Marshal(struct{
    *BlogPost
    *Analytics
}{post, analytics})
```

- 一个 json 切分成两个 struct
```json
json.Unmarshal([]byte(`{
  "url": "attila@attilaolah.eu",
  "title": "Attila's Blog",
  "visitors": 6,
  "page_views": 14
}`), &struct {
  *BlogPost
  *Analytics
}{&post, &analytics})
```

- 重命名字段
```json
type CacheItem struct {
    Key    string `json:"key"`
    MaxAge int    `json:"cacheAge"`
    Value  Value  `json:"cacheValue"`
}

json.Marshal(struct{
    *CacheItem

    // Omit bad keys
    OmitMaxAge omit `json:"cacheAge,omitempty"`
    OmitValue  omit `json:"cacheValue,omitempty"`

    // Add nice keys
    MaxAge int    `json:"max_age"`
    Value  *Value `json:"value"`
}{
    CacheItem: item,

    // Set the int by value:
    MaxAge: item.MaxAge,

    // Set the nested struct by reference, avoid making a copy:
    Value: &item.Value,
})
```

### 3.Tip:

#### 在命令行上通过 cscript 将参数传递给 javascript

1.创建此JScript文件，将其保存在C目录中（作为xx.js）
```js
alert = function(s){WScript.Echo(s)}

var arg = WScript.arguments(0)
alert(arg.toUpperCase() + " now upper case")
...
```
2.打开命令提示符，然后键入
```json
C:\> windows\wscript.exe xx.js "apples and bananas"
```

#### anaconda 环境管理
1.回滚
```shell
conda list --revisions
conda install --revision [revision number]
```

2.卸载
```shell
# 删除 anaconda 的文件夹
rm -rf ~/anaconda3
# 在环境变量中删除 anaconda
打开 ~/.bashrc (例如: vim ~/.bashrc),找到与 conda 相关的，注释掉即可：
```

3.删除相关隐藏文件
```shell
rm -rf ~/.condarc ~/.conda ~/.continuum
```

#### anaconda 安装包管理

1.在线安装
```shell
conda install 包名=版本号，如conda install cudatoolkit=10.2
```

2.离线安装，先在国内的镜像网站（https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/）下载对应的版本包
```shell
conda install --offline 对应的安装包文件名字
```

### 4.Share:

https://blog.csdn.net/weixin_36048246/article/details/106641543
带你体验Apache NIFI新建数据同步流程(NIFI入门)

https://blog.csdn.net/bobo79888/article/details/95068654
大数据流处理：Flume、Kafka和NiFi对比

https://blog.csdn.net/itcodexy/article/details/113287622
Redis 核心篇：唯快不破的秘密

https://reposhub.com/java/compiler-compiler/GraxCode-JByteMod-Beta-java.html
java字节码编辑