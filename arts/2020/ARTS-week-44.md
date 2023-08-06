---
title: ARTS-week-44
date: 2020-11-01 17:43:13
tags:
---


## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm： 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

402. 移掉K位数字 https://leetcode-cn.com/problems/remove-k-digits/

### 2.Review:

https://eng.uber.com/aresdb/
aresdb 实时分析引擎

#### 点评：

Jian Shen, Ze Wang, David Wang, Jeremy Shi, and Steven Chen 介绍 AresDB 的设计以及这种强大的实时分析解决方案如何能够更高效，更有效地统一，简化和改进 Uber 的实时分析数据库解决方案。实时分析能够获得业务见解和运营效率，能够做出以数据为依据的决策，以改善用户在 Uber 平台上的体验。


AresDB 的体系结构支持以下功能：
- 具有压缩功能的基于列的存储，可提高存储效率（减少存储字节所需的内存使用量）和查询效率（减少查询期间从CPU内存到GPU内存的数据传输）
- 具有主键重复数据删除功能的实时Ups，可在几秒钟内实现 高数据准确性和近实时数据更新
由GPU驱动的查询处理，用于由GPU驱动的高度并行化的数据处理，呈现低查询延迟（亚秒级到秒级）

AresDB 在 Uber 广泛用于支持我们的实时数据分析仪表板，使我们能够针对业务的各个方面做出大规模的数据驱动决策。通过开源该工具，我们希望社区中的其他人可以利用AresDB进行自己的分析。将来，我们打算通过以下功能增强该项目：
- 分布式设计：我们正在努力构建 AresDB 的分布式设计，包括复制，分片管理和模式管理，以提高其可伸缩性并降低运营成本。
- 开发人员支持和工具：自2018年11月开源 AresDB 以来，我们一直在致力于构建更直观的工具，重构代码结构以及丰富文档以改善入门体验，从而使开发人员能够快速将 AresDB 集成到其分析堆栈中。
- 扩展功能集： 我们还计划扩展查询功能集，使其包含诸如窗口功能和嵌套循环联接之类的功能，从而使该工具能够支持更多用例。
- 查询引擎优化：我们还将寻求开发更高级的方法来优化查询性能，例如低级虚拟机（LLVM）和GPU内存缓存。

### 3.Tip:

python 之 requests 用法总结

官方文档 http://docs.python-requests.org/en/master/
安装 $ pip install requests

1.GET 请求
```python
r  = requests.get('http://httpbin.org/get')
传参
>>> payload = {'key1': 'value1', 'key2': 'value2', 'key3': None}
>>> r = requests.get('http://httpbin.org/get', params=payload)
http://httpbin.org/get?key2=value2&key1=value1

参数也可以传递列表
>>> payload = {'key1': 'value1', 'key2': ['value2', 'value3']}
>>> r = requests.get('http://httpbin.org/get', params=payload)
>>> print(r.url)

http://httpbin.org/get?key1=value1&key2=value2&key2=value3
r.text 返回headers中的编码解析的结果，可以通过r.encoding = 'gbk'来变更解码方式
r.content返回二进制结果
r.json()返回JSON格式，可能抛出异常
r.status_code
r.raw返回原始socket respons，需要加参数stream=True

>>> r = requests.get('https://api.github.com/events', stream=True)
>>> r.raw
<requests.packages.urllib3.response.HTTPResponse object at 0x101194810>
>>> r.raw.read(10)
'\x1f\x8b\x08\x00\x00\x00\x00\x00\x00\x03'

将结果保存到文件，利用r.iter_content()
with open(filename, 'wb') as fd:
    for chunk in r.iter_content(chunk_size):
        fd.write(chunk)

传递headers
>>> headers = {'user-agent': 'my-app/0.0.1'}
>>> r = requests.get(url, headers=headers)

传递cookies
>>> url = 'http://httpbin.org/cookies'
>>> r = requests.get(url, cookies=dict(cookies_are='working'))
>>> r.text
'{"cookies": {"cookies_are": "working"}}'
```

2.POST 请求

```python
传递表单
r = requests.post('http://httpbin.org/post', data = {'key':'value'})

发送 HTML 表单形式的数据—非常像一个HTML表单。只需简单地传递一个字典给 data 参数。数据字典 在发出请求时会自动编码为表单形式:
>>> payload = {'key1': 'value1', 'key2': 'value2'}
>>> r = requests.post("http://httpbin.org/post", data=payload)
>>> print(r.text)
{
  ...
  "form": {
    "key2": "value2",
    "key1": "value1"
  },
  ...
}

发送的数据并非编码为表单形式的。比如传递一个 string 而不是一个dict ，那么数据会被直接发布出去。
>>> url = 'https://api.github.com/some/endpoint'
>>> payload = {'some': 'data'}
>>> r = requests.post(url, data=json.dumps(payload))
或者
>>> r = requests.post(url, json=payload)

传递文件
url = 'http://httpbin.org/post'
>>> files = {'file': open('report.xls', 'rb')}
>>> r = requests.post(url, files=files)

配置files，filename, content_type and headers
files = {'file': ('report.xls', open('report.xls', 'rb'), 'application/vnd.ms-excel', {'Expires': '0'})}
files = {'file': ('report.csv', 'some,data,to,send\nanother,row,to,send\n')}

响应
r.status_code
r.heards
r.cookies

跳转
By default Requests will perform location redirection for all verbs except HEAD.
>>> r = requests.get('http://httpbin.org/cookies/set?k2=v2&k1=v1')
>>> r.url
'http://httpbin.org/cookies'
>>> r.status_code
200
>>> r.history
[<Response [302]>]

If you\'re using HEAD, you can enable redirection as well:
r=requests.head('http://httpbin.org/cookies/set?k2=v2&k1=v1',allow_redirects=True)

You can tell Requests to stop waiting for a response after a given number of seconds with the timeoutparameter:
requests.get('http://github.com', timeout=0.001)

```

3.高级特性：

```python
session，自动保存cookies，可以设置请求参数，下次请求自动带上请求参数
s = requests.Session()
s.get('http://httpbin.org/cookies/set/sessioncookie/123456789')
r = s.get('http://httpbin.org/cookies')
print(r.text)
# '{"cookies": {"sessioncookie": "123456789"}}'

session可以用来提供默认数据，函数参数级别的数据会和session级别的数据合并，如果key重复，函数参数级别的数据将覆盖session级别的数据。如果想取消session的某个参数，可以在传递一个相同key，value为None的dict
s = requests.Session()
s.auth = ('user', 'pass') #权限认证
s.headers.update({'x-test': 'true'})
# both 'x-test' and 'x-test2' are sent
s.get('http://httpbin.org/headers', headers={'x-test2': 'true'})

函数参数中的数据只会使用一次，并不会保存到session中如：cookies仅本次有效
r = s.get('http://httpbin.org/cookies', cookies={'from-my': 'browser'})

session也可以自动关闭
with requests.Session() as s:
    s.get('http://httpbin.org/cookies/set/sessioncookie/123456789')

响应结果不仅包含响应的全部信息，也包含请求信息
r = requests.get('http://en.wikipedia.org/wiki/Monty_Python')
r.headers
r.request.headers
```

4.SSL 证书验证

```shell
Requests可以为HTTPS请求验证SSL证书，就像web浏览器一样。要想检查某个主机的SSL证书，可以使用 verify 参数:
>>> requests.get('https://kennethreitz.com', verify=True)
requests.exceptions.SSLError: hostname 'kennethreitz.com' doesn't match either of '*.herokuapp.com', 'herokuapp.com'

在该域名上我没有设置SSL，所以失败了。但Github设置了SSL:
>>> requests.get('https://github.com', verify=True)
<Response [200]>

对于私有证书，可以传递一个 CA_BUNDLE 文件的路径给 verify 。也可以设置 REQUEST_CA_BUNDLE 环境变量。
>>> requests.get('https://github.com', verify='/path/to/certfile')

如果将 verify 设置为 False，Requests 也能忽略对 SSL 证书的验证。
>>> requests.get('https://kennethreitz.com', verify=False)
<Response [200]>

默认情况下， verify 是设置为 True 的。选项 verify 仅应用于主机证书。也可以指定一个本地证书用作客户端证书，可以是单个文件（包含密钥和证书）或一个包含两个文件路径的元组:
>>> requests.get('https://kennethreitz.com', cert=('/path/server.crt', '/path/key'))
<Response [200]>

```

5.响应体内容工作流：
```python
默认情况下，当进行网络请求后，响应体会立即被下载。可以通过 stream 参数覆盖这个行为，推迟下载响应体直到访问 Response.content 属性:
tarball_url = 'https://github.com/kennethreitz/requests/tarball/master'
r = requests.get(tarball_url, stream=True)

此时仅有响应头被下载下来了，连接保持打开状态，因此允许根据条件获取内容:
if int(r.headers['content-length']) < TOO_LONG:
  content = r.content
  ...

如果设置 stream 为 True，请求连接不会被关闭，除非读取所有数据或者调用 Response.close。
可以使用 contextlib.closing 来自动关闭连接：

import requests
from contextlib
import closing
tarball_url = 'https://github.com/kennethreitz/requests/tarball/master'
file = r'D:\Documents\WorkSpace\Python\Test\Python34Test\test.tar.gz'
with closing(requests.get(tarball_url, stream=True)) as r:
with open(file, 'wb') as f:
for data in r.iter_content(1024):
f.write(data)
```

6.Keep-Alive
来自 <http://docs.python-requests.org/en/master/user/advanced/>同一会话内发出的任何请求都会自动复用恰当的连接！
注意：只有所有的响应体数据被读取完毕连接才会被释放为连接池；所以确保将 stream 设置为 False 或读取 Response 对象的 content 属性。

7.流式上传

```python
Requests 支持流式上传，这允许发送大的数据流或文件而无需先把它们读入内存。要使用流式上传，仅需为的请求体提供一个类文件对象即可:
读取文件请使用字节的方式，这样 Requests 会生成正确的 Content-Length
with open('massive-body', 'rb') as f:
    requests.post('http://some.url/streamed', data=f)
```

8.分块传输编码

```python
对于出去和进来的请求，Requests也支持分块传输编码。要发送一个块编码的请求，仅需为的请求体提供一个生成器注意生成器输出应该为bytes
def gen():
    yield b'hi'
    yield b'there'

requests.post('http://some.url/chunked', data=gen())

For chunked encoded responses, it's best to iterate over the data using Response.iter_content(). In an ideal situation you'll have set stream=True on the request, in which case you can iterate chunk-by-chunk by calling iter_content with a chunk size parameter of None. If you want to set a maximum size of the chunk, you can set a chunk size parameter to any integer.
POST Multiple Multipart-Encoded Files
来自 <http://docs.python-requests.org/en/master/user/advanced/>

<input type="file" name="images" multiple="true" required="true"/>
To do that, just set files to a list of tuples of (form_field_name, file_info):
>>> url = 'http://httpbin.org/post'
>>> multiple_files = [
        ('images', ('foo.png', open('foo.png', 'rb'), 'image/png')),
        ('images', ('bar.png', open('bar.png', 'rb'), 'image/png'))]
>>> r = requests.post(url, files=multiple_files)
>>> r.text
{
  ...
  'files': {'images': 'data:image/png;base64,iVBORw ....'}
  'Content-Type': 'multipart/form-data; boundary=3131623adb2043caaeb5538cc7aa0b3a',
  ...
}
```

9.认证

```python
Requests allows you to use specify your own authentication mechanism.Any callable which is passed as the auth argument to a request method will have the opportunity to modify the request before it is dispatched.Authentication implementations are subclasses of requests.auth.AuthBase, and are easy to define. Requests provides two common authentication scheme implementations in requests.auth:HTTPBasicAuth and HTTPDigestAuth.Let's pretend that we have a web service that will only respond if the X-Pizza header is set to a password value. Unlikely, but just go with it.
from requests.auth import AuthBase
class PizzaAuth(AuthBase):
    """Attaches HTTP Pizza Authentication to the given Request object."""
    def __init__(self, username):
        # setup any auth-related data here
        self.username = username

def __call__(self, r):
        # modify and return the request
        r.headers['X-Pizza'] = self.username
        return r

Then, we can make a request using our Pizza Auth:
>>> requests.get('http://pizzabin.org/admin', auth=PizzaAuth('kenneth'))
<Response [200]>
来自 <http://docs.python-requests.org/en/master/user/advanced/>
```

10.流式请求

```python
r = requests.get('http://httpbin.org/stream/20', stream=True)
for line in r.iter_lines():
```

11.代理

```python
If you need to use a proxy, you can configure individual requests with the proxies argument to any request method:
import requests
proxies = {
  'http': 'http://10.10.1.10:3128',
  'https': 'http://10.10.1.10:1080',
}
requests.get('http://example.org', proxies=proxies)

To use HTTP Basic Auth with your proxy, use the http://user:password@host/ syntax:
proxies = {'http': 'http://user:pass@10.10.1.10:3128/'}
```

12.超时

```python
If you specify a single value for the timeout, like this:
r = requests.get('https://github.com', timeout=5)

The timeout value will be applied to both the connect and the read timeouts. Specify a tuple if you would like to set the values separately:
r = requests.get('https://github.com', timeout=(3.05, 27))

If the remote server is very slow, you can tell Requests to wait forever for a response, by passing None as a timeout value and then retrieving a cup of coffee.
r = requests.get('https://github.com', timeout=None)
来自 <http://docs.python-requests.org/en/master/user/advanced/>
```

### 4.Share:

https://db-engines.com/en/ranking
数据库排名

https://www.cnblogs.com/merely/p/10793877.html
linux下NFS远程目录挂载

https://blog.csdn.net/weixin_45950544/article/details/103956052
Flask之Blueprint蓝图