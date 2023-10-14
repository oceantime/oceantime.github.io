---
> **ARTS-week-29**
> 2021-07-25 17:09
---


## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm: 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

973. 最接近原点的 K 个点：https://leetcode-cn.com/submissions/detail/199543463/

863. 二叉树中所有距离为 K 的结点：https://leetcode-cn.com/submissions/detail/199523247/

1743. 从相邻元素对还原数组：https://leetcode-cn.com/submissions/detail/199523029/

### 2.Review:

https://www.mihaileric.com/posts/we-need-data-engineers-not-data-scientists/?utm_source=aidigest&utm_medium=web&utm_campaign=139
我们不要数据科学家，我们要数据工程师！

#### 点评：

数据。 它无处不在，我们只会得到更多。 在过去的5-10年中，数据科学吸引了越来越多的新人来尝试品尝这种禁果。但是，如今数据科学招聘的状况如何？ 文章的要旨是为忙碌的读者提供的两句意见。 TLDR(Too Long; Didn’t Read  简述 )：与数据科学相比，公司在数据工程领域的开放角色要多70％。 在培训下一代数据和机器学习从业人员时，让我们更加注重工程技能。

数据比语言更响亮。因此，我决定对自 2012 年以来从 Y-Combinator 中招聘的每家公司的数据角色进行分析。指导我研究的问题：
- 公司最常招聘哪些数据角色？
  - 数据科学家：在统计学和机器学习中使用各种技术来处理和分析数据。通常负责构建模型，以探测从某些数据源中可以学到什么，尽管通常是在原型上，而不是在生产水平上。
  - 数据工程师：开发一套强大且可扩展的数据处理工具/平台。必须适应 SQL/NoSQL 数据库的争吵和构建/维护 ETL 管道。
  - 机器学习 （ML） 工程师：通常负责培训模型和生产模型。需要熟悉一些高级 ML 框架，还必须舒适地构建可扩展的模型培训、推理和部署管道。
  - 机器学习 （ML） 科学家：从事尖端研究。通常负责探索可以在学术会议上发表的新想法。通常只需要原型新的最先进的模型，然后再交给ML工程师进行生产。

- 我们谈论那么多的传统数据科学家的需求如何？
  - 与其他数据驱动型职业相比，数据工程师的需求越来越高。

- 今天启动数据革命的相同技能相关吗？
  - 随着ML工程师的大量开放，公司往往想要一个混合数据从业者：一个可以构建和部署模型的人。或者说得更简洁，有人可以使用Tensorflow，但也可以从源头构建它。
  - 只是没有那么多的ML研究职位

总结：我们必须承认，数据科学现在不同了。我希望这篇文章能够揭示一些今天现场的状态。只有当我们知道自己在哪里时，我们才知道我们需要去哪里。。

### 3.Tip:

#### python 安装 psycopg2 报错问题处理

```shell
# 缺少安装依赖
sudo apt-get install libpq-dev python-dev
```

#### Go 语言通用重试函数封装

1.重试次数、时间：

```go
//重试，限制次数
func RetryTimes(name string, tryTimes int, sleep time.Duration, callback func() error) (err error) {
    for i := 1; i <= tryTimes; i++ {
        err = callback()
        if err == nil {
            return nil
        }
        fmt.Printf("[%v]失败，第%v次重试， 错误信息:%s \n", name, i, err)
        time.Sleep(sleep)
    }
    err = fmt.Errorf("[%v]失败，共重试%d次, 最近一次错误:%s \n", name, tryTimes, err)
    fmt.Println(err)
    return err

}

//重试，限制时间
func RetryDurations(name string, max time.Duration, sleep time.Duration, callback func() error) (err error) {
    t0 := time.Now()
    i := 0
    for {
        err = callback()
        if err == nil {
            return
        }
        delta := time.Now().Sub(t0)
        if delta > max {
            fmt.Printf("[%v]失败，超过最大时间%s, 共重试%d次，最近一次错误: %s \n", name, max, i, err)
            return err
        }
        time.Sleep(sleep)
        i++
        fmt.Printf("[%v]失败，第%v次重试， 错误信息:%s \n", name, i, err)
    }
}
```

2.使用：

```go
func main() {
    //示例任务函数，只会失败
    var task = func() error {
        return errors.New("task error")
    }

    fmt.Println("RetryTimes")
    //设定3秒最大重试次数，最大3次，1秒重试一次
    RetryTimes("测试任务", 3, time.Second, task)

    fmt.Println("RetryDurations")
    //设定3秒最大重试期限，最多3秒，1秒重试一次
    RetryDurations("测试任务", 3*time.Second, time.Second, task)
}
```


### 4.Share:

https://blog.csdn.net/qq_38529889/article/details/108827004
DBeaver连接数据库驱动配置问题

https://www.dazhuanlan.com/2020/04/18/5e9ac3ca3db40/
Redash环境搭建及二次开发

https://blog.csdn.net/weixin_30739595/article/details/99445147?utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7Edefault-10.pc_relevant_baidujshouduan&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7Edefault-10.pc_relevant_baidujshouduan
Ubuntu PostgreSQL安装和配置
