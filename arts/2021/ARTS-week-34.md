---
> **ARTS-week-34**
> 2021-08-22 08:04
---


## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm: 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

315. 计算右侧小于当前元素的个数：https://leetcode-cn.com/submissions/detail/212526709/

162. 寻找峰值：https://leetcode-cn.com/submissions/detail/212498647/

268. 丢失的数字：https://leetcode-cn.com/submissions/detail/212490811/

### 2.Review:

https://www.mihaileric.com/posts/machine-learning-project-model-deployment/
从零开始的完整机器学习项目：错误分析和模型 V2

#### 点评：

在这篇文章中，将继续上文的地方，并考虑部署模型和建立一个连续的集成系统。这将能够不断更新、改进和测试代码：

- 这些将涵盖以下所有内容：
  - 构想、组织代码库和设置模组
  - 数据集采集和探索性数据分析
  - 使用 v1 模型构建和测试管道
  - 执行错误分析并向 v2 模型重复
  - 部署模型并连接连续集成解决方案（此帖子）

- 快速回顾：
    本文将重点部署模型，包括构建一个 Chrome 扩展，可以拨打 REST API 的电话。之后，将讨论如何设置连续集成，以便能够不断更新、测试和部署项目的最新版本。。

- 设置预测休息 API
  - 正如在第一篇文章中提到的，在这个项目中的目标是建立一个模型，可以部署作为Chrome网络扩展。这将需要模型实时进行预测的能力，因此需要在线推理解决方案。目前有两种可能的解决方案：
    - 运行完整型号的客户端（即在浏览器中）。
    - 运行模型服务器侧，并将REST API呼叫到服务器。
    - 为此，将利用 python 网络框架：FastAPI。使用 FastAPI， REST API 的核心看起来像这样：

```python
class Settings(BaseSettings):
    model_dir: str

app = FastAPI()
settings = Settings()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model
config = {
    "model_output_path": settings.model_dir,
    "featurizer_output_path": settings.model_dir
}
model = RandomForestModel(config)


class Statement(BaseModel):
    text: str


class Prediction(BaseModel):
    label: float
    probs: List[float]


@app.post("/api/predict-fakeness", response_model=Prediction)
def predict_fakeness(statement: Statement):
    datapoint = construct_datapoint(statement.text)
    probs = model.predict([datapoint])
    label = np.argmax(probs, axis=1)
    prediction = Prediction(label=label[0], probs=list(probs[0]))
    LOGGER.info(prediction)
    return prediction
```

  - 这定义了称为摄入文本语句、在适当定义的数据点上进行推理并输出响应对象的单个 REST 端点。/api/predict-fakenessPrediction 然后，可以使用以下命令在本地运行服务器：

```shell
MODEL_DIR=/path/to/fake-news/model_checkpoints/random_forest uvicorn --reload main:app
```

- 构建 Chrome 扩展
  - 现在，服务器已运行，将创建一个 Chrome 扩展，可以拨打 API 呼叫。
  - 扩展目标是允许用户浏览互联网，以突出一些部分的文本（如新闻标题），并让扩展指示文本是假的还是真实的。。
  - 核心组件是：content.js：
  ```js
  console.log('loaded...');
const FAKE_NEWS_URL = "http://127.0.0.1:8000/api/predict-fakeness";
const RED = "red";
const GREEN = "#4be371";

let spanSelection = null;

async function detectFakeNews(text) {
    const data = {
        text: text
    }
    return fetch(FAKE_NEWS_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
}

document.addEventListener("mouseup", (event) => {
    if (spanSelection) {
        // Reset and remove span selection
        document.body.removeChild(spanSelection);
        spanSelection = null;
    }
    let text = ""
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    if (text === "") return;
    detectFakeNews(text)
        .then(res => res.json())
        .then(data => {
            const imgURL = chrome.runtime.getURL("images/trump_amca_48.png");
            const spanElem = document.createElement("span");
            
            spanElem.className = "popup-tag";
            spanElem.style.display = "flex";
            spanElem.style.left = `${window.scrollX + event.clientX}px`;
            spanElem.style.top = `${window.scrollY + event.clientY}px`;
            let label;
            if (!data.label) {
                label = "FAKE!";
                spanElem.style.backgroundColor = RED;
            } else {
                label = "REAL!";
                spanElem.style.backgroundColor = GREEN;
            }
            spanElem.innerHTML = `
                <img class="img-sty" src=${imgURL} height=32 width=32> ${label}
            `;
            document.body.appendChild(spanElem);
            spanSelection = spanElem;

        })
        .catch((error) => {
            console.error("Error:", error);
        });;

});
  ```
  定义实际扩展的定义：manifest.json：
  ```python
    {
      "name": "Fake News Detector",
      "version": "1.0",
      "description": "Detect fake news on your browser page",
      "permissions": [
        "activeTab",
        "storage",
        "declarativeContent"
      ],
      "browser_action": {
        "default_icon": {
          "16": "images/trump_amca_16.png",
          "32": "images/trump_amca_32.png",
          "48": "images/trump_amca_48.png",
          "128": "images/trump_amca_128.png"
        }
      },
      "icons": {
        "16": "images/trump_amca_16.png",
        "32": "images/trump_amca_32.png",
        "48": "images/trump_amca_48.png",
        "128": "images/trump_amca_128.png"
      },
      "web_accessible_resources": [
        "images/trump_amca_16.png",
        "images/trump_amca_32.png",
        "images/trump_amca_48.png",
        "images/trump_amca_128.png"
      ],
      "content_scripts": [
        {
          "matches": [
            "*://*/*"
          ],
          "js": [
            "content.js"
          ],
          "css": [
            "content.css"
          ],
          "run_at": "document_end"
        }
      ],
      "manifest_version": 2
    }
  ```
  - 连续集成：
    - 现在，将讨论机器学习项目背景下的持续集成。首先，什么是连续集成？连续集成（或 CI） 是一个更广泛的软件工程概念，它是指以集中的方式在多个贡献者之间实现代码更改自动化的做法。这通常涉及设置一个环境和模因，以便轻松跟踪、测试和验证代码更改。
    - 将利用吉图布行动。请注意，可以使用第三方工具，如特拉维斯 CI，但会使用 Github 的本地功能，因为方便。将定义以下操作：
  ```shell
    name: run-tests
    on: [push]
    defaults:
      run:
        working-directory: /home/fake-news
    jobs:
      run-tests:
        runs-on: ubuntu-latest
        container:
          image: custom-docker-image
          credentials:
            username: ${{ secrets.DOCKERHUB_USERNAME }}
            password: ${{ secrets.DOCKERHUB_PAT }}
        steps:
          - name: Set PYTHONPATH env var
            run: echo "PYTHONPATH=$PYTHONPATH:/home/fake-news" >> $GITHUB_ENV
          - name: Set GE_DIR env var
            run: echo "GE_DIR=`pwd`" >> $GITHUB_ENV
          - name: Run unit tests
            run: pytest tests/
          - name: Run great expectations data tests
            working-directory: /home/fake-news/tests
            run: python great_expectations/validate_data.py
  ```
    - 此操作拉取自定义 Docker 图像（上面需要提供的自定义码头图像），执行一点环境设置，然后执行功能测试。自定义码头图像是通过以下多克文件构建的：
  ```shell
    FROM python:3.8

    ADD . /home/fake-news

    WORKDIR /home/fake-news

    RUN pip install --no-cache-dir -r requirements.txt
  ```

  - 对于机器学习应用程序，项目的新贡献者应该很容易重新培训任何模型。为了实现这一目标，利用DVC。DVC 使能够做几件事：
    - 版本使用类似 Git 的界面控制数据。
    - 定义模型创建各个步骤的工作流程，如预处理、壮举化和培训。
    - 首先，可以通过运行来跟踪原始数据集文件（即）data/raw/train2.tsv
    - DVC 的另一个非常强大的功能是能够定义版本可控的工作流，称为管道。这是通过在文件中创建阶段来完成的。看起来会是这样的：dvc.yaml
  ```xml
    stages:
      compute-credit-bins:
        cmd: python scripts/compute_credit_bins.py --train-data-path data/processed/cleaned_train_data.json
          --output-path data/processed/optimal_credit_bins.json
        deps:
        - data/processed/cleaned_train_data.json
        outs:
        - data/processed/optimal_credit_bins.json
      normalize-and-clean-data:
        cmd: python scripts/normalize_and_clean_data.py --train-data-path data/raw/train2.tsv
          --val-data-path data/raw/val2.tsv --test-data-path data/raw/test2.tsv --output-dir
          data/processed
        deps:
        - data/raw/test2.tsv
        - data/raw/train2.tsv
        - data/raw/val2.tsv
        - scripts/normalize_and_clean_data.py
        outs:
        - data/processed/cleaned_test_data.json
        - data/processed/cleaned_train_data.json
        - data/processed/cleaned_val_data.json
      train-random-forest:
        cmd: python fake_news/train.py --config-file config/random_forest.json
        deps:
        - config/random_forest.json
        - data/processed/cleaned_test_data.json
        - data/processed/cleaned_train_data.json
        - data/processed/cleaned_val_data.json
        - data/processed/optimal_credit_bins.json
        - fake_news/train.py
        outs:
        - model_checkpoints/random_forest
  ```
    - 正如所看到的，各种管道定义了一系列依赖性、要执行的命令以及该命令的输出。DVC 在检测何时应该重新运行管道方面很明智，因为依赖性已经改变，并且还会跟踪管道的输出。当涉及到复制像数据规范化/清洁这样的阶段时，它就像运行一样简单：
  ```shell
    dvc repro normalize-and-clean-data
  ```
    - 到目前为止，已经在本地部署了模型，并以这种方式与服务器进行交互。但是，如果想要扩展应用程序（如果有 1000 多个用户会发生什么），需要找到一种方法，通过云提供商在远程服务器上部署模型，该提供商可以根据使用情况自动进行刻度。再次，将定义一个适当的文件如下：
  ```
    FROM tiangolo/uvicorn-gunicorn-fastapi:python3.8 as base

    ADD fake_news /home/fake-news/fake_news
    ADD requirements.txt /home/fake-news/
    ADD model_checkpoints/random_forest /home/fake-news/random_forest

    WORKDIR /home/fake-news

    ENV PYTHONPATH $PYTHONPATH:/home/fake-news

    RUN pip install --no-cache-dir -r requirements.txt
  ```  
    - 此图像基于FastAPI Web 应用基础图像构建，只需将模型检查点嵌入其中即可。现在，可以执行以下容器化应用程序：
  ```
    docker run -p 8000:80 -e MODEL_DIR="/home/fake-news/random_forest" -e MODULE_NAME="fake_news.server.main" created-image
  ```
- 有了这个设置，可以轻松地在任何支持 Docker 的远程服务器上部署模型。这就是过渡到真正构建基于可扩展的机器学习应用的地方。可以更进一步，创建处理培训工作流程的图像，这将使能够轻松地在远程服务器上扩展培训作业，但这留给读者的练习。因此，完成了旋风之旅，从零开始构建一个完整的机器学习项目。

### 3.Tip:

#### ubuntu gcc 安装及使用

```shell
方法一： sudo apt-get build-dep gcc
方法二： sudo apt-get install build-essential
gcc --version
```

#### linux tar文件打包分割文件和解压
```
首先是压缩：
$ tar -czvp -f skype_backup.tar.gz skype_backup

分割：
$ split -b 4000k skype_backup.tar.gz skype_backup_20090626.tar.gz. –verbose

如上两句命令合并为一句：
$ tar -czvp -f – skype_backup |split -b 4000k – skype_backup_20090626.tar.gz. –verbose

合并文件：
$ cat skype_backup_20090626.tar.gz.a* >skype_backup_cat.tar.gz

解压：
$ tar -zxvf skype_backup_cat.tar.gz

如上两句合并为一句：
$ cat skype_backup_20090626.tar.gz.a* |tar -zxv
```

#### Error: pg_config executable not found

```shell
pip install psyconpg2-binary
```

#### libpcre.so.1 cannot be found

```shell
# 安装完Nginx之后，启动报错
$ sudo ./nginx
./nginx: error while loading shared libraries: libpcre.so.1: cannot open shared object file: No such file or directory

# 执行ldd命令，找到Nginx的依赖共享库文件
$ ldd $(which /usr/local/nginx/sbin/nginx)
linux-vdso.so.1 =>  (0x00007fff1b74a000)
libpthread.so.0 => /lib64/libpthread.so.0 (0x00000032b2600000)
libcrypt.so.1 => /lib64/libcrypt.so.1 (0x00000032b3a00000)
libpcre.so.1 => not found
libcrypto.so.6 => /lib64/libcrypto.so.6 (0x00000032b4200000)
libc.so.6 => /lib64/libc.so.6 (0x00000032b1a00000)
/lib64/ld-linux-x86-64.so.2 (0x00000032b1600000)
libdl.so.2 => /lib64/libdl.so.2 (0x00000032b1e00000)
libz.so.1 => /usr/lib64/libz.so.1 (0x00000032b3200000)

# 对libpcre.so.0.0.1做软连接
$ sudo ln -s /usr/lib64/libpcre.so.0.0.1 libpcre.so.1

# 再次执行ldd命令，就可以找到libpcre.so.1依赖库了。
$ ldd $(which /usr/local/nginx/sbin/nginx)
linux-vdso.so.1 =>  (0x00007fffd43d5000)
libpthread.so.0 => /lib64/libpthread.so.0 (0x00000032b2600000)
libcrypt.so.1 => /lib64/libcrypt.so.1 (0x00000032b3a00000)
libpcre.so.1 => /lib64/libpcre.so.1 (0x00000032b1e00000)
libcrypto.so.6 => /lib64/libcrypto.so.6 (0x00000032b4200000)
libc.so.6 => /lib64/libc.so.6 (0x00000032b1a00000)
/lib64/ld-linux-x86-64.so.2 (0x00000032b1600000)
libdl.so.2 => /lib64/libdl.so.2 (0x00002aebb7623000)
libz.so.1 => /usr/lib64/libz.so.1 (0x00000032b3200000)
```

#### Docker部署jar包运行
- 方式一：
    - 1. 上传jar到服务器的指定目录
    - 2. 在该目录下创建Dockerfile 文件 vi Dockerfile
    - 3. 然后将下面的内容复制到Dockerfile文件中
    ```
        FROM java:8
        MAINTAINER bingo
        ADD demo-0.0.1-SNAPSHOT.jar demo.jar
        EXPOSE 8080
        ENTRYPOINT ["java","-jar","demo.jar"]
    ```
    - 4. 创建好Dockerfile文件之后，执行命令 构建镜像： 
    ```
        docker build -t my/demo .
        # 注意最后的 .  表示 Dockerfile 文件在当前目录下 my/demo  构建之后镜像名称
    ```
    - 5. 镜像构建成功之后，就可以运行容器了：
    ```
        docker run -d --name demo -p 8080:8080 my/demo
    ```    
    - 6. 然后docker ps 看看的容器有没有在运行即可 
    - 7. docker logs --tail  300 -f  demo  查看启动日志 
    - 8. 如果docker run 的时候没有加 --restart=always ，然后已经运行的docker容器怎么设置自动重启？ 执行下面命令：
    ```
        docker update –-restart=always demo 
    ```

- 方式二： 这种方式就是运行一个jdk的容器，然后挂载其中的目录到宿主机，然后运行之后，就可以将需要运行的jar放在宿主机的挂载目录下，然后每次重新运行docker容器即可。不用每次发布需要重新构建docker容器，只需要替换宿主机中的jar包即可。
    - 1. 在服务器中拉取jdk1.8的镜像
    ```
        docker pull jdk8
    ```
    - 2. 创建目录
    ```
        cd /server/
        mkdir deploy/jar
    ```
    - 3. 构建容器
    ```
        docker run -d \
        --restart=always \
        -v /server/deploy/jar:/jar -v /server/logs/demo:/mnt/logs/demo \
        -p 7778:7778 \
        --name demo \
        jdk8 /usr/bin/java -jar \
        -Duser.timezone=GMT+08 \
        /jar/demo-1.0.jar
    ```

### 4.Share:

https://www.coder.work/article/4680159
java - python中的Fernet类加密和java中的解密不起作用

https://blog.csdn.net/boling_cavalry/article/details/87904485
用golang官方Docker镜像运行项目

https://www.cnblogs.com/Qian123/p/5707154.html
Java提高篇——理解String 及 String.intern() 在实际中的应用

https://www.jianshu.com/p/8c207a5f2774
java 方法内联

https://my.oschina.net/jimmywa/blog/3075665
使用docker快速搭建本地kafka服务

https://blog.51cto.com/u_12462495/2163239
如何简洁优雅地实现Kubernetes的服务暴露

https://www.cnblogs.com/phonecom/p/10995611.html
使用docker搭建OpenResty开发环境

https://www.cnblogs.com/xiao987334176/p/9946915.html
Ubuntu 搭建docker registry 私有仓库