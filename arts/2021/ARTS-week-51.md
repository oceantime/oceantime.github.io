---
title: ARTS-week-48
date: 2022-01-03 19:47:00
tags:
---


## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm： 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

1500. 设计文件分享系统：https://leetcode-cn.com/submissions/detail/248023832/
631. 设计 Excel 求和公式：https://leetcode-cn.com/submissions/detail/248052078/
895. 最大频率栈：https://leetcode-cn.com/submissions/detail/248255005/

### 2.Review:

https://hackernoon.com/dont-make-these-5-golang-mistakes-3l3x3wcw
编写Golang不要犯这5个错误！

#### 点评：

这些是我在编写中犯的错误。虽然这些可能不会导致任何错误，但它们可能会影响运行。 

1.内部循环
需要注意的是，有几种方法会在循环中造成混乱。  
1.1在循环迭代器变量上使用 reference
为了更高的效率，循环迭代器变量是一个单变量，在每次循环迭代中接受不同的值。这可能会导致不知情的行为。 

```go
in := []int{1, 2, 3}
var out []*int
for  _, v := range in {
    out = append(out, &v)
}

fmt.Println("Values:", *out[0], *out[1], *out[2])
fmt.Println("Addresses:", out[0], out[1], out[2])

// 结果将是:  
Values: 3 3 3
Addresses: 0xc000014188 0xc000014188 0xc000014188
```

正如您所看到的， out slice 中的所有元素都是3。实际上很容易解释这种情况为什么发生：在每次迭代中，我们都将单变量 v 添加到 out slice ，在每次迭代中都取 v 值。因此，正如您在输出的第二行所看到的，地址是相同的，并且它们都指向相同的值。
简单的修复方法是将循环迭代器变量复制到新的变量中:

```go
in := []int{1, 2, 3}
var out []*int
for  _, v := range in {
    v := v
    out = append(out, &v)
}

fmt.Println("Values:", *out[0], *out[1], *out[2])
fmt.Println("Addresses:", out[0], out[1], out[2])
// 这是新的输出：
Values: 1 2 3
Addresses: 0xc0000b6010 0xc0000b6018 0xc0000b6020
```

在 Goroutine 中使用的循环迭代变量中也可以发现同样的问题。  
```go
list := []int{1, 2, 3}
for _, v := range list {    
        go func() {
        fmt.Printf("%d ", v)
    }()
}
// 输出将: 
3 3 3
```
它可以用上面提到的相同的解决方案来修复。注意，如果不使用Goroutine运行函数，代码将按预期运行。  

1.2  使用 WaitGroup ，等待循环
使用 WaitGroup 类型的共享变量可能会犯这个错误，如下面的代码所示，当第5行中的 Done() 被调用len(tasks) 次，第7行中的 Wait() 只能被解除阻塞，因为它被用作参数来调用第2行中的Add()。但是，在循环中调用Wait()，以便在下一次迭代中阻塞第4行Goroutine的创建。简单的解决方案是将Wait()的调用移出循环。 

```go
var wg sync.WaitGroup
wg.Add(len(tasks))for _, t := range tasks { 
        go func(t *task) { 
        defer group.Done()
    }(t)    // group.Wait()}

group.Wait()
```

1.3使用延迟循环
defer直到函数返回才执行。除非你确定你在做什么，否则你不应该在循环中使用defer。  

```go
var mutex sync.Mutex
type Person struct {
    Age int}
persons := make([]Person, 10)for _, p := range persons {
    mutex.Lock()    
    // defer mutex.Unlock()
    p.Age = 13
    mutex.Unlock()
}
```

defer直到函数返回才执行。除非你确定你在做什么，否则你不应该在循环中使用defer。在上面的例子中，如果您使用第8行而不是第10行，那么下一次迭代就不能持有互斥锁，因为该锁已经在使用中，并且循环将永远阻塞。如果你真的需要使用内部循环，你可能需要委托另一个函数来完成这项工作。

```go
var mutex sync.Mutex
type Person struct {
    Age int}
persons := make([]Person, 10)
for _, p := range persons { 
        func() {
        mutex.Lock()        
        defer mutex.Unlock()
        p.Age = 13
    }()
}
```

但是，有时使用递延循环可能会变得很方便。所以你真的需要知道你在做什么。

2. 发送到一个无缓存的通道
您可以将值从 Goroutine 发送到通道，并将这些值接收到另一个 Goroutine 。默认情况下，发送和接收阻塞，直到另一方准备好。这允许Goroutines在没有显式锁或条件变量的情况下进行同步。  

```go
func doReq(timeout time.Duration) obj { // ch :=make(chan obj)
    ch := make(chan obj, 1) go func() {
        obj := do()
        ch <- result
    } ()    select {    
                case result = <- ch :       
                return result   
                case<- time.After(timeout):     
                return nil 
                }
}
```

您可以将值从 一个Goroutine 发送到通道，并将这些值接收到另一个Goroutine。让我们检查一下上面的代码。doReq 函数在第4行创建一个子 Goroutine 来处理请求，这是Go服务器程序中的常见做法。子Goroutine 执行do函数，并通过第6行通道ch将结果发送回父进程。子进程将在第6行阻塞，直到父进程在第9行接收到ch的结果。同时，父进程将在select处阻塞，直到子进程将结果发送给ch(第9行)或发生超时(第11行)。如果超时发生在更早的时候，父进程将在第12行从doReq func返回，并且没有其他人可以接收到ch的结果，这将导致子进程永远被阻塞。修复方法是将ch从一个未缓冲的通道更改为一个缓冲的通道，这样即使父进程退出，子进程Goroutine也可以总是发送结果。另一个修复方法是在第6行使用带有空默认情况的select语句，这样如果没有Goroutine接收ch，就会出现默认情况。尽管这个解决方案可能并不总是有效。默认情况下，发送和接收阻塞，直到另一方准备好。这允许Goroutines在没有显式锁或条件变量的情况下进行同步。

```go
...select { 
case ch <- result: 
default:
}
...
```

3.不使用接口
接口可以使代码更加灵活。这是在代码中引入多态性的一种方式。接口允许您请求一组行为，而不是特定的 type  。不使用接口可能不会导致任何错误，但你的代码可能相对没那么简单、灵活和可扩展。
在许多接口中，  io.Reade 和  io.Writer 可能是最受人喜欢。

```go
type Reader interface {
    Read(p []byte) (n int, err error)
}type Writer interface {
    Write(p []byte) (n int, err error)
}
```

这些接口非常强大。假设你要将一个对象写入一个文件，所以你定义了一个Save方法:  

```go
func (o *obj) Save(file os.File) error
```

如果您需要写入   http.ResponseWriter  ，该怎么办? 你不想定义一个新方法。所以你使用 io.Writer。

```go
func (o *obj) Save(w io.Writer) error
```

另外，你应该知道的重要一点是，要经常询问你将要使用的行为。在上面的例子中，请求一个所以大多数时候你最好坚持行为而不是具体的类型。请求 io.ReadWriteCloser 也可以很好地工作，但当您将要使用的唯一方法是编写时，它不是最佳实践。界面越大，抽象就越弱。

4. 有缺陷的有序结构
这个错误不会导致任何错误，但它会导致更多的内存使用。  

```go
type BadOrderedPerson struct {
    Veteran bool   // 1 byte
    Name    string // 16 byte
    Age     int32  // 4 byte
}
        type OrderedPerson struct {
    Name    string
    Age     int32
    Veteran bool}
}
```

这两种类型似乎都有相同的21字节大小，但结果显示完全不同。使用 GOARCH=amd64 编译代码，BadOrderedPerson 类型分配32个字节，而 OrderedPerson 类型分配24个字节。为什么？原因是数据结构对齐。在64位体系结构中，内存分配连续的8个字节的数据包。需要添加的填充可以通过以下方式计算: 

```go
padding = (align - (offset mod align)) mod align
aligned = offset + padding
        = offset + ((align - (offset mod align)) mod align)
type BadOrderedPerson struct {
    Veteran bool     // 1 byte
    _       [7]byte  // 7 byte: padding for alignment
    Name    string   // 16 byte
    Age     int32    // 4 byte
    _       struct{} // to prevent unkeyed literals
    // zero sized values, like struct{} and [0]byte occurring at 
    // the end of a structure are assumed to have a size of one byte.
    // so padding also will be addedd here as well.
    }type OrderedPerson struct {
    Name    string
    Age     int32
    Veteran bool
    _       struct{} 
}
```

当您有一个很大且需要经常使用的 type 时，它可能会导致性能问题。但是不要担心，您不需要手动处理所有的struct。使用 maligned 您可以很容易地检查您的代码来解决这个问题。 

5. 在测试中没有使用race检测
数据竞争会导致神秘的故障，通常是在代码部署到生产环境很久之后。因为这些是并发系统中最常见、最难调试的 bug 类型。为了帮助区分这类 bug, Go 1.1引入了一个内置的数据竞争检测器。它可以简单地添加-race标志。  

```go
$ go test -race pkg    # to test the package
$ go run -race pkg.go  # to run the source file
$ go build -race       # to build the package
$ go install -race pkg # to install the package
```

当race检测器启用时，编译器将记录代码中访问内存的时间和方式，而运行时将监视对共享变量的非同步访问。当发现一个数据竞争时，竞争检测器会打印一个报告，其中包含冲突访问的堆栈跟踪信息。下面是一个例子:

```go
WARNING: DATA RACE
Read by goroutine 185:
  net.(*pollServer).AddFD()
      src/net/fd_unix.go:89 +0x398
  net.(*pollServer).WaitWrite()
      src/net/fd_unix.go:247 +0x45
  net.(*netFD).Write()
      src/net/fd_unix.go:540 +0x4d4
  net.(*conn).Write()
      src/net/net.go:129 +0x101
  net.func·060()
      src/net/timeout_test.go:603 +0xaf

Previous write by goroutine 184:
  net.setWriteDeadline()
      src/net/sockopt_posix.go:135 +0xdf
  net.setDeadline()
      src/net/sockopt_posix.go:144 +0x9c
  net.(*conn).SetDeadline()
      src/net/net.go:161 +0xe3
  net.func·061()
      src/net/timeout_test.go:616 +0x3ed

Goroutine 185 (running) created at:
  net.func·061()
      src/net/timeout_test.go:609 +0x288

Goroutine 184 (running) created at:
  net.TestProlongTimeout()
      src/net/timeout_test.go:618 +0x298
  testing.tRunner()
      src/testing/testing.go:301 +0xe8
```

结尾：
唯一的真正错误是，我们不能从中学到任何错误。  

### 3.Tip:

#### vim 文本编辑器比较两文件 
```shell
vim -d <file1> <file2>
```

#### mysql 中 long 时间的转换
1.在mysql 数据库中，“2009-09-15 00：00：00”转化为列为长整型的函数：
```java
select unix_timstamp("2013-03-15 00:00:00")*1000;
```
这里要注意，mysql数据库中的长整型，比java中的长整型少了秒后面的毫秒数，所以要乘以1000，这样只有几毫秒之差

2、在mysql数据库中，“1252999488000”（java中的long型数据）转化为日期：
```java
select from_unixtime(1252999488);
```
【注】：要将最后三位去掉。

#### Cron 表达式范例

```
每隔5秒执行一次：*/5 * * * * ?

每隔1分钟执行一次：0 */1 * * * ?

每天23点执行一次：0 0 23 * * ?

每天凌晨1点执行一次：0 0 1 * * ?

每月1号凌晨1点执行一次：0 0 1 1 * ?

每月最后一天23点执行一次：0 0 23 L * ?

每周星期天凌晨1点实行一次：0 0 1 ? * L

在26分、29分、33分执行一次：0 26,29,33 * * * ?

每天的0点、13点、18点、21点都执行一次：0 0 0,13,18,21 * * ?
```

### 4.Share:

https://elasticstack.blog.csdn.net/article/details/107489737
Kibana：Markdown 可视化教程

https://zhuanlan.zhihu.com/p/83649046
Markdown cheatsheet（个人版本）

https://www.runoob.com/w3cnote/linux-crontab-tasks.html
Linux Crontab 定时任务

https://blog.csdn.net/weixin_33762321/article/details/85949391
mysql 计算时间差函数

https://www.cnblogs.com/heyonggang/p/8117754.html
Mysql 字符串截取总结：left()、right()、substring()、substring_index()

https://www.cnblogs.com/simpledev/p/3965964.html
mysql 关联修改 SQL 及 long 与 datetime 类型相互转换

https://zhuanlan.zhihu.com/p/354603010
Windows Terminal美化（oh-my-posh3）
