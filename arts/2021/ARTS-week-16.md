---
> **ARTS-week-16**
> 2021-05-04 21:15
---


## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm: 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

数组问题练习：https://leetcode-cn.com/leetbook/read/top-interview-questions-easy/x2i30g/
- 删除排序数组中的重复项
- 买卖股票的最佳时机 II
- 旋转数组
- 存在重复元素
- 只出现一次的数字
- 两个数组的交集 II

### 2.Review:

http://golangcode.com/mocking-s3-upload
模拟测试S3上传

#### 点评：

作者 Author: Edd Turtle

后端开发人员可能会遇到的常见情况是编写代码，该文件将文件上传到外部存储平台（例如 S3 或 Azure ）。这很简单，但是为这些代码编写与依赖项隔离的测试并不那么直接。我们可以在 Go 中使用界面并在运行测试时创建一个“模拟”上传器来实现此目的。

- 首先显示测试，然后显示它正在测试的代码。相同的原理几乎可以应用于任何依赖项，并且对于模拟从 S3 下载文件也很有用。尽管我们手动完成了此过程，但仍有一些软件包可帮助创建这些模拟。
 - uploader_test.go
```golang
package main

import (
	"log"
	"testing"

	"github.com/aws/aws-sdk-go/service/s3"
)

type fileFetcher struct{}

func (f *fileFetcher) PutObject(input *s3.PutObjectInput) (*s3.PutObjectOutput, error) {
	log.Println("Mock Uploaded to S3:", *input.Key)
	return &s3.PutObjectOutput{}, nil
}

func TestMyFunc(t *testing.T) {

	f := fileFetcher{}
	err := MyFuncToTest(&f)

	if err != nil {
		t.Errorf("TestMyFunc returned an error: %s", err)
	}
}
```

 - uploader.go
```golang
package main

import (
	"bytes"
	"fmt"
	"net/http"
	"os"
	"path"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
)

const (
	S3BucketName = "{{!! YOUR_S3 BUCKET !!}}"
)

type ReportS3 interface {
	PutObject(*s3.PutObjectInput) (*s3.PutObjectOutput, error)
}

func main() {

	// Create AWS Session
	s, _ := session.NewSession(&aws.Config{Region: aws.String("eu-west-1")})
	svc := s3.New(s)

	if MyFuncToTest(svc) == nil {
		fmt.Println("File uploaded")
	}
}

// MyFuncToTest uploads a file to S3 - This is the function we're going to test!
func MyFuncToTest(s3Svc ReportS3) error {
	f, err := os.Open("golangcode-file.txt")
	if err != nil {
		return err
	}
	return UploadToS3(s3Svc, f)
}

// UploadToS3 will upload a single file to S3, it will require a pre-built aws s3 service.
func UploadToS3(s3Svc ReportS3, file *os.File) error {

	// Get file size and read the file content into a buffer
	fileInfo, err := file.Stat()
	if err != nil {
		return err
	}
	var size int64 = fileInfo.Size()
	buffer := make([]byte, size)
	file.Read(buffer)

	// S3 Name
	s3Key := path.Base(file.Name())
	_, err = s3Svc.PutObject(&s3.PutObjectInput{
		Bucket:        aws.String(S3BucketName),
		Key:           aws.String(s3Key),
		ACL:           aws.String("private"),
		Body:          bytes.NewReader(buffer),
		ContentLength: aws.Int64(size),
		ContentType:   aws.String(http.DetectContentType(buffer)),
	})
	return err
}
```

- 运行的测试：
```shell
$ go test -v
```

- 程序运行：
```shell
$ go run uploader.go
```

### 3.Tip:

#### go.mod 中使用 “replace” 指向本地模块

```text
//在 require 语句上方使用 replace 关键字替换行 
module github.com/pselle/foo

replace github.com/pselle/bar => /Users/pselle/Projects/bar

require (
	github.com/pselle/bar v1.0.0
)

//go mod edit从命令行创建此行
$ go mod edit -replace github.com/pselle/bar=/Users/pselle/Projects/bar
```

### 4.Share:

https://thewebivore.com/using-replace-in-go-mod-to-point-to-your-local-module/
在 go.mod 中使用 “replace” 指向本地模块

https://blog.csdn.net/CJQ99419/article/details/107703504
关于 go mod 和内部包 import

https://segmentfault.com/a/1190000021854441
Go Modules 终极入门

https://colobu.com/2018/08/27/learn-go-module/
跳出 Go module 的泥潭

https://blog.csdn.net/qq_21187515/article/details/90760337
mysql 根据 json 字段内容作为查询条件（包括 json 数组），检索数据

https://www.cnblogs.com/akidongzi/p/11772701.html
go mod 生成 vendor

https://www.cnblogs.com/youhui/articles/11152843.html
Go Mod & Go Vendor
