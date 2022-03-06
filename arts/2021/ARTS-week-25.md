---
> **ARTS-week-25**
> 2021-06-27 21:19
---


## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm： 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

401. 二进制手表：https://leetcode-cn.com/problems/binary-watch/submissions/
剑指 Offer 38. 字符串的排列：https://leetcode-cn.com/submissions/detail/188634609/
剑指 Offer 15. 二进制中1的个数：https://leetcode-cn.com/submissions/detail/188951165/

### 2.Review:

https://eltonminetto.dev/en/post/2019-12-09-parquet-golang/
在 Golang 中处理 parquet 文件

#### 点评：

在这篇文章中，我将讨论一种相对较新的数据文件格式，以及如何在 Go 中使用它。该格式称为 Parquet，目前是 Apache 基金会支持的一个项目。它是一种二进制文件格式，用于存储和方便数据处理的一种列式存储格式。它支持不同类型的压缩，广泛应用于数据科学和大数据环境，与 Hadoop 等工具配合使用。我们使用这种格式将统计数据存储在 S3 存储桶中。这样，我们就可以使用 Lambda 函数进行并行处理，而不会使我们的数据库服务器过载。

- 第一步是创建一个struct代表我们将在此示例中处理的数据的对象：
```golang
type user struct {
  ID        string    `parquet:"name=id, type=UTF8, encoding=PLAIN_DICTIONARY"`
  FirstName string    `parquet:"name=firstname, type=UTF8, encoding=PLAIN_DICTIONARY"`
  LastName  string    `parquet:"name=lastname, type=UTF8, encoding=PLAIN_DICTIONARY"`
  Email     string    `parquet:"name=email, type=UTF8, encoding=PLAIN_DICTIONARY"`
  Phone     string    `parquet:"name=phone, type=UTF8, encoding=PLAIN_DICTIONARY"`
  Blog      string    `parquet:"name=blog, type=UTF8, encoding=PLAIN_DICTIONARY"`
  Username  string    `parquet:"name=username, type=UTF8, encoding=PLAIN_DICTIONARY"`
  Score     float64   `parquet:"name=score, type=DOUBLE"`
  CreatedAt time.Time //wont be saved in the parquet file
}
```
此代码中的重要细节是 tags，它说明 struct 在生成 parquet 文件时将如何处理 的每个字段。为了处理数据，我使用了github.com/xitongsys/parquet-go 包，在存储库中，您可以看到更多可用标签示例。 

- 现在让我们以以下 parquet 格式生成我们的第一个文件：
```golang
package main

import (
  "fmt"
  "log"
  "time"
  "github.com/bxcodec/faker/v3"
  "github.com/xitongsys/parquet-go-source/local"
  "github.com/xitongsys/parquet-go/parquet"
  "github.com/xitongsys/parquet-go/reader"
  "github.com/xitongsys/parquet-go/writer"
)

type user struct {
  ID        string    `parquet:"name=id, type=UTF8, encoding=PLAIN_DICTIONARY"`
  FirstName string    `parquet:"name=firstname, type=UTF8, encoding=PLAIN_DICTIONARY"`
  LastName  string    `parquet:"name=lastname, type=UTF8, encoding=PLAIN_DICTIONARY"`
  Email     string    `parquet:"name=email, type=UTF8, encoding=PLAIN_DICTIONARY"`
  Phone     string    `parquet:"name=phone, type=UTF8, encoding=PLAIN_DICTIONARY"`
  Blog      string    `parquet:"name=blog, type=UTF8, encoding=PLAIN_DICTIONARY"`
  Username  string    `parquet:"name=username, type=UTF8, encoding=PLAIN_DICTIONARY"`
  Score     float64   `parquet:"name=score, type=DOUBLE"`
  CreatedAt time.Time //wont be saved in the parquet file
}

const recordNumber = 10000

func main() {
  var data []*user
  //create fake data
  for i := 0; i < recordNumber; i++ {
    u := &user{
      ID:        faker.UUIDDigit(),
      FirstName: faker.FirstName(),
      LastName:  faker.LastName(),
      Email:     faker.Email(),
      Phone:     faker.Phonenumber(),
      Blog:      faker.URL(),
      Username:  faker.Username(),
      Score:     float64(i),
      CreatedAt: time.Now(),
    }
    data = append(data, u)
  }
  err := generateParquet(data)
  if err != nil {
    log.Fatal(err)
  }

}

func generateParquet(data []*user) error {
  log.Println("generating parquet file")
  fw, err := local.NewLocalFileWriter("output.parquet")
  if err != nil {
    return err
  }
  //parameters: writer, type of struct, size
  pw, err := writer.NewParquetWriter(fw, new(user), int64(len(data)))
  if err != nil {
    return err
  }
  //compression type
  pw.CompressionType = parquet.CompressionCodec_GZIP
  defer fw.Close()
  for _, d := range data {
    if err = pw.Write(d); err != nil {
      return err
    }
  }
  if err = pw.WriteStop(); err != nil {
    return err
  }
  return nil
}
```

- 下一个片段显示了我们如何读取 parquet 文件中的内容：
```golang
func readParquet() ([]*user, error) {
  fr, err := local.NewLocalFileReader("output.parquet")
  if err != nil {
    return nil, err
  }
  pr, err := reader.NewParquetReader(fr, new(user), recordNumber)
  if err != nil {
    return nil, err
  }
  u := make([]*user, recordNumber)
  if err = pr.Read(&u); err != nil {
    return nil, err
  }
  pr.ReadStop()
  fr.Close()
  return u, nil
}
```

- 上面的例子只是一个说教的例子。当我正在读取整个文件并将所有 10,000 条记录放入内存时，这在谈论千兆字节数据时可能是一个问题。在实际应用中，我们将使用包提供的函数来仅获取文件的一部分：
```golang
func readPartialParquet(pageSize, page int) ([]*user, error) {
  fr, err := local.NewLocalFileReader("output.parquet")
  if err != nil {
    return nil, err
  }
  pr, err := reader.NewParquetReader(fr, new(user), int64(pageSize))
  if err != nil {
    return nil, err
  }
  pr.SkipRows(int64(pageSize * page))
  u := make([]*user, pageSize)
  if err = pr.Read(&u); err != nil {
    return nil, err
  }
  pr.ReadStop()
  fr.Close()
  return u, nil
}
```

- 正如定义所表明的那样，我们使用的是列式存储格式。因此，我们可以只取该Score列并计算其平均值：：
```golang
func calcScoreAVG() (float64, error) {
  fr, err := local.NewLocalFileReader("output.parquet")
  if err != nil {
    return 0.0, err
  }
  pr, err := reader.NewParquetColumnReader(fr, recordNumber)
  if err != nil {
    return 0.0, err
  }
  num := int(pr.GetNumRows())

  data, _, _, err := pr.ReadColumnByPath("parquet_go_root.score", num)
  if err != nil {
    return 0.0, err
  }
  var result float64
  for _, i := range data {
    result += i.(float64)
  }
  return (result / float64(num)), nil
}
```

总结：这篇文章的目的是介绍 parquet 文件格式，它对于数据传输非常有用，在不同规模的项目中替换 CSV 或 JSON 文件。

### 3.Tip:

#### 如何清理 sync.map

1.1 range：

```golang
//erase map
map2.Range(func(key interface{}, value interface{}) bool {
    map2.Delete(key)
    return true
})
```

1.2 func + range：

```java
//erase map
delete2 := func(key interface{}, value interface{}) bool {
    map2.Delete(key)
    return true
}
map2.Range(delete2)
```

1.3 func + range：

```java
func eraseSyncMap(m *sync.Map) {
    m.Range(func(key interface{}, value interface{}) bool {
        m.Delete(key)
        return true
    })
}

func main() {
    // . . .

    //erase map
    eraseSyncMap(&map2)
}
```

1.4 new：

```java
//erase map: A zero sync.Map is empty and ready for use.
map2 = sync.Map{}
```

#### go map[string]interface{} 类型判断

1.1 有时候，map[string]interface{} 有可能存储的是map，也可能是数组等等，那么在取值的时候需要做类型判断，例如：

```golang
.(类型)
stu_count = detail_dic["dynamic"].(map[string]interface{})["stu_count"].(float64)
```
有时候会报错：interface {} is nil, 等等，需要在使用之前，判断nil即可。

### 4.Share:

https://blog.csdn.net/u010230794/article/details/82143179
go sync.Map 使用和介绍

https://iswade.github.io/articles/boltdb/
BoltDB 源码阅读

https://jimchenglin.github.io/2019/05/12/KV-%E5%AD%98%E5%82%A8%E5%BC%95%E6%93%8E/
KV 存储引擎

https://www.cnblogs.com/chnmig/p/11806609.html
go module 基本使用

https://blog.csdn.net/ronon77/article/details/84796629
动态追踪技术（中） - Dtrace、SystemTap、火焰图
