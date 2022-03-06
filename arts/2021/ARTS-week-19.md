---
> **ARTS-week-19**
> 2021-05-23 18:58
---


## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm： 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

链表问题练习：https://leetcode-cn.com/leetbook/read/top-interview-questions-easy/x2t7vj/
- 删除链表中的节点
- 删除链表的倒数第N个节点
- 反转链表
- 合并两个有序链表
- 回文链表
- 环形链表

### 2.Review:

http://otm.github.io/2015/07/embedding-lua-in-go
在 Go 中使用 lua 脚本

#### 点评：

- 在Go中运行Lua代码：

 - 首先，通过安装 gopher-lua 来设置环境并测试其是否正常工作：

```shell
go get github.com/yuin/gopher-lua
```

 - 其次，让我们创建一个最小的实现：

```golang
package main

import "github.com/yuin/gopher-lua"

func main() {
  L := lua.NewState()
  defer L.Close()
  if err := L.DoString(`print("Hello World")`); err != nil {
    panic(err)
  }
}
```
 - lua.NewState() 创建我们的 Lua VM，尽管这样 L （* lua.LState）我们将来会与Lua进行交互。在整个帖子中，L 都将指向的指针 lua.LState 。L.DoString 在 VM 中运行 Lua 代码。运行 Go 代码将产生：

```shell
$ go run hello.go
Hello World
```

 - 要运行 Lua 文件而不是字符串，请调用 lua.DoFile：

```golang
L := lua.NewState()
defer L.Close()
if err := L.DoFile("hello.lua"); err != nil {
    panic(err)
}
```

- 将Lua代码嵌入为字符串：

 - DoFile 并且 DoString 可以多次调用，因此可以用来公开 Lua 函数。在示例 sayHello 中，首先定义了波纹管功能，然后在第二个调用中调用 DoString：

```golang
func main() {
  L := lua.NewState()
  defer L.Close()
  if err := L.DoString(`function sayHello() print("Hello Again") end`); err != nil {
    panic(err)
  }

  if err := L.DoString(`sayHello()`); err != nil {
    panic(err)
  }
}
```

- 从 Lua 调用 Go Code
 - 将 Go 函数暴露给 Lua 对于创建自定义自定义 API 是必不可少的。 Go 函数应实现 LGFunction 可从 Lua 调用的类型：

```golang
type LGFunction func(*LState) int
```

 - 它接收 a\*lua.LState 并返回一个整数。该 LState 是需要用 Lua 的 VM 检索功能参数进行交互，最常见的。返回的整数定义将多少个返回值压入 Lua 堆栈。一个完整的示例如下所示：


```golang
func square(L *lua.LState) int {  //*
  i := L.ToInt(1)          // get first (1) function argument and convert to int
  ln := lua.LNumber(i * i) // make calculation and cast to LNumber
  L.Push(ln)               // Push it to the stack
  return 1                 // Notify that we pushed one value to the stack
}

func main() {
  L := lua.NewState()
  defer L.Close()

  L.SetGlobal("square", L.NewFunction(square)) // Register our function in Lua
  if err := L.DoString(`print("4 * 4 = " .. square(4))`); err != nil {
    panic(err)
  }
}
```

 - LState 定义了一些便利函数，在上面的示例中，我们 L.ToInt(1) 用于获取第一个函数参数。
 - 注意：
   - Lua 不是零索引的，因此第一个函数参数是通过获取的 L.ToInt(1)，第二个参数是使用的 L.ToInt(2)。在 Lua 中，所有数组都是1索引的，但是 t [0] 仍然有效，但是这将导致数组的长度不一一对应。
   - 有许多To...(n int)功能可用。这些函数不会引发错误，但是如果无法进行转换，则将返回Go默认值。要获得自动错误，L.Check...(n int)可以使用一系列功能；如果类型检查失败，则会抛出Lua错误。对于可选参数，L.Opt...(n int, default T)可以使用函数。例子：
   - L.GetTop()返回调用函数时使用的参数数量。要获取参数而不进行转换，L.Get(n int)可以使用该函数。
   - 如果某个函数的参数可以是一个以上的类型，则该L.CheckTypes(n int, types ...LValueType)函数可用于检查并向用户产生错误。使用该L.CheckTypes函数等同于手动检查类型，然后L.TypeError(n int, message string)在出现错误时调用。

```golang
// Second argument can be string or function
L.CheckTypes(2, lua.LTString, lua.LTFunction)
switch lv := L.Get(2).(type) {
case LString:
  // use as string
case Lfunction:
  // use as function
}
```

- 从 Go 呼叫 Lua:
 - 通过调用 Lua 代码是通过来完成的 L.CallByParam，它将参数对象P和参数作为可变参数。参数对象采用三个重要参数：
  - Fn - lua.LFunction 调用
  - Nret - 返回值的数量
  - Protect -如果true返回保护错误，则将发生恐慌。

 - 以下代码在 Lua 中定义了 “concat” 函数。使用参数 “Go” 和 “Lua” 调用 concat 函数，并将结果字符串输出到 stdout。

```golang
// luaCode is the Lua code we want to call from Go
var luaCode = `
function concat(a, b)
  return a .. " + " .. b
end
`

func main() {
  L := lua.NewState()
  defer L.Close()

  if err := L.DoString(luaCode); err != nil {
    panic(err)
  }

  // Call the Lua function concat
  // Lua analogue:
  //  str = concat("Go", "Lua")
  //  print(str)
  if err := L.CallByParam(lua.P{
    Fn:      L.GetGlobal("concat"), // name of Lua function
    NRet:    1,                     // number of returned values
    Protect: true,                  // return err or panic
  }, lua.LString("Go"), lua.LString("Lua")); err != nil {
    panic(err)
  }

  // Get the returned value from the stack and cast it to a lua.LString
  if str, ok := L.Get(-1).(lua.LString); ok {
    fmt.Println(str)
  }

  // Pop the returned value from the stack
  L.Pop(1)
}
```

- Gopher-Lua 特性:
 - Gopher-Lua类型, gopher-lua库在名为的接口上运行LValue。

```golang
type LValue interface {
  String() string
  Type()   LValueType
}
```

 - 实现此接口的对象是LNilType，LBool，LNumber，LString，LFunction，LUserData，LState，LTable，和LChannel。调用LValue.Type()返回相应的LValueType。
```golang
const (
  LTNil LValueType = iota
  LTBool
  LTNumber
  LTString
  LTFunction
  LTUserData
  LTThread
  LTTable
  LTChannel
)
```

 - 转换和检查功能, 一些实用的功能可以转换和检查 lua.LValue 对象。
   - lua.LVAsBool(v LValue) - 转换为 bool，nil 和 false 变为 false。否则为真。
   - lua.LVAsString(v LValue) - 将 LString 和 LNumber 转换为字符串。否则为空字符串。
   - lua.CanConvToString(v LValue) - 如果为 LString 或 LNumber，则为 true。否则为假。
   - lua.LVIsFalse(v LValue) - 如果为 nil 或 false，则返回 true。

 - LTable类型, LTable 是Lua 中功能最多且使用最广泛的数据结构之一（实际上，它是唯一的）。LTable 类型可用于模拟名称空间和类。但是，基本的API非常简单，高级功能值得一提。

### 3.Tip:

#### go string 处理

- uin8 数组转 string
```shell
myByteSlice := []byte{ ... }     // same as myByteSlice := []uint8{ ... }
myString := string(myByteSlice)  // myString is a string representation of the byte slice
myOtherSlice := []byte(myString) // Converted back to byte slice
```

- string 转 struct
```golang
package main

import (
    "fmt"
    "encoding/json"
)

type s struct {
    Int       int
    String    string
    ByteSlice []byte
}

func main() {
    a := &s{42, "Hello World!", []byte{0,1,2,3,4}}

    out, err := json.Marshal(a)
    if err != nil {
        panic (err)
    }

    fmt.Println(string(out))
}

// {"Int":42,"String":"Hello World!","ByteSlice":"AAECAwQ="}
```

#### go import使用及 . \_的作用解析


1、使用点操作引入包时，可以省略包前缀：
```golang
import(
. "fmt"
)
注意上面 fmt前多了 . 字符。代码中使用时：
Println("hello world")
前缀fmt就不需要了。
```

2、别名操作可以给包起个小名儿。如：
```golang
import(
f "fmt"
)
f.Println("hello world")
```

3、\_操作 由于go在引入包时调用包的init方法。所以使用_操作，主要是为了使用包的init函数，一般用在数据库方面的包中：：
```golang
import (
"database/sql"
_ "github.com/ziutek/mymysql/godrv"
)
```

#### go 读取一个未知的Json（支持数组型Json）

```golang
package main

import (
    "encoding/json"
    "fmt"
    "strings"
)

func UnknownJson(data string) {
    if data != `` {
        r := strings.NewReader(data)
        dec := json.NewDecoder(r)
        switch data[0] {
        case 91:
            // "[" 开头的Json（数组型Json）
            param := []interface{}{}
            dec.Decode(&param)
            fmt.Println(param)
            // fmt.Println(param[0])                      // 使用一个值
            // println(reflect.TypeOf(param[0]).String()) // 获取值的类型
        case 123:
            // "{" 开头的Json（对象型Json）
            param := make(map[string]interface{})
            dec.Decode(&param)
            fmt.Println(param)
            // fmt.Println(param[`a`])                      // 使用一个值
            // println(reflect.TypeOf(param[`a`]).String()) // 获取值的类型
        }
    }
}

func main() {
    UnknownJson(`{"a":1}`)
    UnknownJson(`[{"a":1},{"b":2}]`)
    UnknownJson(`[1,2,3,4]`)
}
```



### 4.Share:

http://github.com/yuin/gopher-lua/issues/160
How to convert a go map to lua table

https://www.cnblogs.com/liuzhongchao/p/9233177.html
Golang 包管理工具之 govendor 的使用

https://segmentfault.com/a/1190000018482369
当 Go 遇上了 Lua

https://blog.csdn.net/aiqinxuancai/article/details/49905153
lua 中使用 json 格式

https://blog.guaik.org/2020/04/15/%E9%80%92%E5%BD%92%E7%AE%97%E6%B3%95%EF%BC%8Clua%E7%9A%84table%E4%B8%8Ejson%E4%BA%92%E8%BD%AC/
递归算法，lua 的 table 与 json 互转

https://blog.csdn.net/zdyueguanyun/article/details/53741401
go 对象 json 转 map

https://golangtc.com/t/5ad068124ce40d265405345e
GO 二维数组的 json 字符串如何转成 map 或 struct

https://blog.csdn.net/qq_36383623/article/details/103955190
Lua 中的非空判断

https://blog.guaik.org/2021/01/29/%E6%9C%B4%E7%B4%A0%E8%B4%9D%E5%8F%B6%E6%96%AF%E7%AE%97%E6%B3%95%E8%AF%86%E5%88%AB%E5%9E%83%E5%9C%BE%E7%9F%AD%E4%BF%A1/
朴素贝叶斯算法识别垃圾短信

https://www.cnblogs.com/zhoujie/p/mongo1.html
mongodb 高级聚合查询
