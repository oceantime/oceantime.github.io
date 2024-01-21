---
> **ARTS-week-40**
> 2021-10-02 18:30
---


## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm: 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

153. 寻找旋转排序数组中的最小值：https://leetcode-cn.com/submissions/detail/223675371/

154. 寻找旋转排序数组中的最小值 II：https://leetcode-cn.com/submissions/detail/224042638/

33. 搜索旋转排序数组：https://leetcode-cn.com/submissions/detail/224374715/

### 2.Review:

https://www.analyticsvidhya.com/blog/2020/11/build-your-own-desktop-voice-assistant-in-python/
用Python构建自己的桌面语音助手

#### 点评：

建立自己的私人助理，如Alexa或Siri有多酷？这不是很复杂，可以很容易地实现在Python。个人数字助理最近吸引了很多关注。聊天机器人在大多数商业网站上都很常见。随着人工智能的不断进步，训练机器处理日常任务成为常态。在这个智能家居和智能设备的时代，基于语音的个人助理已经大受欢迎。这些个人助理只需发出语音命令，即可轻松配置以执行许多常规任务。谷歌已经普及了基于语音的搜索，这对许多不喜欢使用键盘/键盘的老年人来说是一个福音。本文将引导完成步骤，以快速开发基于语音的桌面助手。可以在任何设备上快速部署。开发此应用程序的先决条件是了解 Python。

##### 第一步是安装和导入所有必要的库。在导入库之前，使用pip install来安装库。以下是本计划中使用的一些关键库：
- 语音识别库允许 Python 从系统的麦克风访问音频，转录音频并保存音频。
- 谷歌的文本-语音包，gTTS将音频问题转换为文本。为获取问题答案而编写的查找函数的响应由 gTTS 转换为音频短语。此包与谷歌翻译的 API 接口相连。
- Playsound包用于为答案发出声音。Playsound允许 Python 播放 MP3 文件。
- Web 浏览器包提供了一个高级界面，允许向用户显示基于 Web 的页面。钚是显示网页的另一种选择。但是，要使用此，需要安装并提供针对浏览器的 Web 驱动程序。
- 维基百科用于从维基百科网站获取各种信息。
- Wolfram | Alpha 是一种计算知识引擎或答案引擎，可以使用Wolfram知识库和人工智能技术计算数学问题。需要获取API才能使用此包。

##### 个人助理的实现
此应用程序的整个代码是使用 Python 支持的库在 Python 中编写的。
导入所需的库：
```python
import speech_recognition as sr #convert speech to text 
import datetime #for fetching date and time 
import wikipedia 
import webbrowser 
import requests 
import playsound # to play saved mp3 file  from gtts 
import gTTS # google text to speech  
import os # to save/open files  
import wolframalpha # to calculate strings into formula from selenium 
import webdriver # to control browser operations
```
编写一个功能来捕获请求/问题：
```python
def talk():     
    input=sr.Recognizer()     
    with sr.Microphone() as source:         
        audio=input.listen(source)         
        data=""         
        try:             
            data=input.recognize_google(audio)             
            print("Your question is, " + data)                      
        except sr.UnknownValueError:             
            print("Sorry I did not hear your question, Please repeat again.") 
return data
```
接下来，编写一个功能来回答问题：
```python
def respond(output):     
    num=0     
    print(output)     
    num += 1     
    response=gTTS(text=output,)     
    file = str(num)+".mp3"     
    response.save(file)     
    playsound.playsound(file, True)     
    os.remove(file)
```
现在编写模块以添加对问题的所有必需自定义响应：
```python
if __name__=='__main__':     
    respond("Hi, I am Minchu your personal desktop assistant")                
    while(1):         
        respond("How can I help you?")         
        text=talk().lower()                  
    if text==0:             
        continue                      
    if "stop" in str(text) or "exit" in str(text) or "bye" in str(text):             
        respond("Ok bye and take care")             
        break                      
    if 'wikipedia' in text:             
        respond('Searching Wikipedia')             
        text =text.replace("wikipedia", "")             
        results = wikipedia.summary(text, sentences=3)             
        respond("According to Wikipedia")             
        print(results)             
        respond(results)                            
    elif 'time' in text:             
        strTime=datetime.datetime.now().strftime("%H:%M:%S")             
        respond(f"the time is {strTime}")                       
    elif 'search'  in text:             
        text = text.replace("search", "")             
        webbrowser.open_new_tab(text)             
        time.sleep(5)                  
    elif "calculate" or "what is" in text:              
        question=talk()             
        app_id="Mention your API Key"             
        client = wolframalpha.Client(app_id)             
        res = client.query(question)             
        answer = next(res.results).text             
        respond("The answer is " + answer)                      
    elif 'open googlr' in text:             
        webbrowser.open_new_tab("https://www.google.com")             
        respond("Google is open")             
        time.sleep(5)                      
    elif 'youtube' in text:              
        driver = webdriver.Chrome(r"Mention your webdriver location")              
        driver.implicitly_wait(1)              
        driver.maximize_window()             
        respond("Opening in youtube")              
        indx = text.split().index('youtube')              
        query = text.split()[indx + 1:]              
        driver.get("http://www.youtube.com/results?search_query =" + '+'.join(query))                                        
    elif "open word" in text:              
        respond("Opening Microsoft Word")              
        os.startfile('Mention location of Word in your system')                   
    else:            
        respond("Application not available")
```
准备好程序的所有模块后执行它。听到自己的私人助理与交谈非常激动。可以根据要求添加更多自定义，并开发一个非常直观的基于语音的助手。桌面助理准备好后就部署它了。可以将其转换为可执行文件，并在任何设备上运行它。

##### 为语音助手生成可执行的
要从Python脚本创建可执行的，可以使用Pyinstaller。首先，必须将 .ipynb Python文件转换为.py扩展。对于这个使用ipython和nbconvert 包。接下来，使用 Pyinstaller 为.py文件创建一个.exe文件。所有以下步骤都需要在安装 Python 的位置的命令提示中执行：
```python
pip install ipython 
pip install nbconvert 
pip install pyinstaller
ipython nbconvert --to script minchu.ipynb #mention .ipynb file name to convert to .py
pyinstaller minchu.py #builds .exe file
```
创建的.py文件应位于 .ipynb 文件所在的同一文件夹中。构建完成后，Pyinstaller创建两个文件夹，build 和dist 。导航到 dist 文件夹并执行.exe文件以运行个人桌面助理。此应用程序是便携式的，可以在任何设备上执行。

结论
这就是建立自己的语音助手是多么简单。可以添加更多功能，如播放喜爱的歌曲、提供天气详细信息、打开电子邮件应用程序、撰写电子邮件、重新启动系统等。也可以将此应用程序集成到手机或平板电脑中。有乐趣探索和发展自己的Alexa/Siri/Cortana。


### 3.Tip:

#### Elasticsearch 进行日期(数值)范围查询

【1】范围查询的符号
符号 | 含义
-|-
gte | greater-than or equal to, 大于或等于
gt  | greater-than, 大于
lte | less-than or equal to, 小于或等于
lt  | less-than, 小于

【2】数值范围查询
需求: 查询商品中40 <= price <= 80的文档:
```json
GET book_shop/_search
{
    "query": {
        "range": {
            "price": {
                "gte": 40,
                "lte": 80,
                "boost": 2.0    // 设置得分的权重值(提升值), 默认是1.0
            }
        }
    }
}
```
【3】时间范围查询
- 简单查询示例
需求: 查询网站中最近一天发布的博客:
```json
GET website/_search
{
    "query": {
        "range": {
            "post_date": {
                "gte": "now-1d/d",  // 当前时间的上一天, 四舍五入到最近的一天
                "lt":  "now/d"      // 当前时间, 四舍五入到最近的一天
            }
        }
    }
}
```
- 关于时间的数学表达式(date-math)
Elasticsearch中时间可以表示为now, 也就是系统当前时间, 也可以是以||结尾的日期字符串表示.在日期之后, 可以选择一个或多个数学表达式:
  - +1h —— 加1小时;
  - -1d —— 减1天;
  - /d —— 四舍五入到最近的一天.
下面是Elasticsearch支持数学表达式的时间单位:

表达式 | 含义 | 表达式 | 含义
-|-|-|-
y | 年   | M | 月
w | 星期 | d | 天
h | 小时 | H | 小时
m | 分钟 | s | 秒

说明: 假设系统当前时间now = 2018-10-01 12:00:00 :
  - now+1h: now的毫秒值 + 1小时, 结果是: 2018-10-01 13:00:00.
  - now-1h: now的毫秒值 - 1小时, 结果是: 2018-10-01 11:00:00.
  - now-1h/d: now的毫秒值 - 1小时, 然后四舍五入到最近的一天的起始, 结果是: 2018-10-01 00:00:00.
  - 2018.10.01||+1M/d: 2018-10-01的毫秒值 + 1月, 再四舍五入到最近一天的起始, 结果是: 2018-11-01 00:00:00.

- 关于时间的四舍五入
  - 对日期中的日、月、小时等 进行四舍五入时, 取决于范围的结尾是包含(include)还是排除(exclude).
  - 向上舍入: 移动到舍入范围的最后一毫秒;
  - 向下舍入: 一定到舍入范围的第一毫秒.

举例说明:
① "gt": "2018-12-18||/M" —— 大于日期, 需要向上舍入, 结果是2018-12-31T23:59:59.999, 也就是不包含整个12月.
② "gte": "2018-12-18||/M" —— 大于或等于日期, 需要向下舍入, 结果是 2018-12-01, 也就是包含整个12月.
③ "lt": "2018-12-18||/M" —— 小于日期, 需要向上舍入, 结果是2018-12-01, 也就是不包含整个12月.
④ "lte": "2018-12-18||/M" —— 小于或等于日期, 需要向下舍入, 结果是2018-12-31T23:59:59.999, 也就是包含整个12月.

【4】日期格式化范围查询(format)
格式化日期查询时, 将默认使用日期field中指定的格式进行解析, 当然也可以通过format参数来覆盖默认配置.示例:
```json
GET website/_search
{
    "query": {
        "range": {
            "post_date": {
                "gte": "2/1/2018", 
                "lte": "2019",
                "format": "dd/MM/yyyy||yyyy"
            }
        }
    }
}
```
注意: 如果日期中缺失了部分年、月、日, 缺失的部分将被填充为unix系统的初始值, 也就是1970年1月1日.比如, 将dd指定为format, 像"gte": 10将转换为1970-01-10T00:00:00.000Z.

【5】时区范围查询(time_zone)
如果日期field的格式允许, 也可以通过在日期值本身中指定时区, 从而将日期从另一个时区的时间转换为UTC时间, 或者为其指定特定的time_zone参数.示例:
```json
GET website/_search
{
    "query": {
        "range": {
            "post_date": {
                "gte": "2018-01-01 00:00:00",
                "lte": "now",
                "format": "yyyy-MM-dd hh:mm:ss",
                "time_zone": "+1:00"
            } 
        }
    }
}
```
ES中的日期类型必须按照UTC时间格式存储, 所以, 上述的2018-01-01 00:00:00将被转换为2017-12-31T23:00:00 UTC.另外需要注意的是, now是不受time_zone影响的.

### 4.Share:

https://discuss.elastic.co/t/several-date-math-questions/27453/4
elastic几个日期数学问题

https://my.oschina.net/u/2392330/blog/1788667
SPL 查询语法 for elasticsearch

https://superuser.com/questions/1579881/mysql-8-no-longer-starts-because-of-lower-case-table-names
lower_case_table_names导致Mysql启动异常
