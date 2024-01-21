---
> **ARTS-week-18**
> 2021-05-05 20:32
---


## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm: 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

字符串问题练习：https://leetcode-cn.com/leetbook/read/top-interview-questions-easy/x2uudv/
- 反转字符串
- 整数反转
- 字符串中的第一个唯一字符
- 有效的字母异位词
- 验证回文串
- 字符串转换整数 (atoi)
- 实现 strStr()
- 外观数列
- 最长公共前缀

### 2.Review:

https://developpaper.com/how-to-use-lua-to-expand-in-golang/
如何在 Golang 中扩展使用 Lua 脚本

#### 点评：

最近，需要在项目中使用 Lua 进行扩展。发现在 GitHub 上有一个用 golang 编写的 Lua 虚拟机，名为 gopher Lua 。使用后还不错，所以我将与分享。我不会多说。让我们看一下详细的介绍。

- 数据类型：

 - Lua 中的数据类型和 golang 中的数据类型之间的对应关系。值得注意的是，类型以 L 开头，类型名称以 Lt 开头将 golang 中的数据转换为 Lua 中的数据时，必须将其转换为以 L 开头的类型：

```golang
str := "hello"
num := 10
L.LString(str)
L.LNumber(float64(num))
```

 - Lua 中的数据将转换为 golang 中的数据。该项目提供 toint 和 checkstring 等功能进行转换。但是，必须事先知道类型。如果不知道，则必须判断类型：

```golang
value := L.Get(1)
switch value.Type() {
case lua.LTString:
case lua.LTTable:
....
}
```

- Golang 和 Lua 互相调用功能

 - golang 中的函数必须转换为 func（L * Lua。State）int 才能注入 Lua。返回参数的 int 表示返回参数的数量

```golang
func hello(L *lua.State) int {
  //Push the return parameter into the stack
  L.Push(lua.LString("hello"))
  //1 return parameter
  return 1
}
//Injected into Lua
L.SetGlobal("hello", L.NewFunction(hello))
```

 - 在 golang 中调用 Lua 函数，Lua 脚本必须首先定义该函数，然后调用 CallByParam 进行调用：

```golang
//Get the functions defined in Lua first
fn := L.GetGlobal("hello")
if err := L.CallByParam(lua.P{
 Fn: fn,
 NRet: 1,
 Protect: true,
 }, lua.LNumber(10)); err != nil {
 panic(err)
}
//Get the function return value here
ret := L.Get(-1)
```

- Table
 - Lua 中的表是非常强大的功能。该项目还为许多表方法提供了支持，例如获取字段和添加字段。在这里，建议使用 glumapper，它可以将 table 转换为 golang 中的结构或 map [string]接口{}的类型。在这里，使用作者提供的示例：

```golang
type Role struct {
 Name string
}

type Person struct {
 Name  string
 Age  int
 WorkPlace string
 Role  []*Role
}

L := lua.NewState()
if err := L.DoString(`
person = {
 name = "Michel",
 age = "31", -- weakly input
 work_place = "San Jose",
 role = {
 {
  name = "Administrator"
 },
 {
  name = "Operator"
 }
 }
}
`); err != nil {
 panic(err)
}
var person Person
if err := gluamapper.Map(L.GetGlobal("person").(*lua.LTable), &person); err != nil {
 panic(err)
}
fmt.Printf("%s %d", person.Name, person.Age)
```

- 模块加载和使用
 - 项目中提供了 Lua 基本模块，可以通过调用 openlibs 来加载它们，包括 IO，math，OS，debug 等。如果要自己加载，可以使用 skipponlibs 参数跳过，如果要开发自己的库，则在文档中也对此进行了说明：

```golang
func Loader(L *lua.LState) int {
 //Export function in registration module
 mod := L.SetFuncs(L.NewTable(), exports)
 L.Push(mod)
 return 1
}

var exports = map[string]lua.LGFunction{
 "myfunc": myfunc,
}

func myfunc(L *lua.LState) int {
 return 0
}
//Here you can load the mymodule module
L.PreloadModule("mymodule", mymodule.Loader)
```

注：这里仅简要介绍一些基本用法。项目中还有一些不受支持的部分，例如 package.loadlib。

### 3.Tip:

#### 解决 go get golang.org/x 包失败问题

```shell
手动下载：
mkdir $GOPATH/src/golang.org/x
cd $GOPATH/src/golang.org/x
git clone git@github.com:golang/text.git
rm -rf text/.git

设置代理：
export http_proxy=http://proxyAddress:port
export https_proxy=http://proxyAddress:port
或者，直接用 all_proxy：
export all_proxy=http://proxyAddress:port

go mod replace：
module example.com/hello

require (
    golang.org/x/text v0.3.0
)

replace (
    golang.org/x/text => github.com/golang/text v0.3.0
)

GOPROXY 环境变量：
export GOPROXY=https://goproxy.io
注意：需要依赖于 go module 功能, 可通过 export GO111MODULE=on 开启 MODULE。
```


### 4.Share:

https://my.oschina.net/freegeek/blog/3046942
国内下载golang.org/x简单方法
