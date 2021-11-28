(window.webpackJsonp=window.webpackJsonp||[]).push([[75],{455:function(t,s,a){"use strict";a.r(s);var n=a(42),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h2",{attrs:{id:"arts-2019-左耳听风社群活动-每周完成一个-arts"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#arts-2019-左耳听风社群活动-每周完成一个-arts"}},[t._v("#")]),t._v(" ARTS-2019 左耳听风社群活动--每周完成一个 ARTS")]),t._v(" "),a("p",[t._v("1.Algorithm： 每周至少做一个 leetcode 的算法题\n2.Review: 阅读并点评至少一篇英文技术文章\n3.Tip: 学习至少一个技术技巧\n4.Share: 分享一篇有观点和思考的技术文章")]),t._v(" "),a("h3",{attrs:{id:"_1-algorithm"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-algorithm"}},[t._v("#")]),t._v(" 1.Algorithm:")]),t._v(" "),a("ol",{attrs:{start:"1122"}},[a("li",[t._v("数组的相对排序 https://leetcode-cn.com/submissions/detail/123602434/")])]),t._v(" "),a("h3",{attrs:{id:"_2-review"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-review"}},[t._v("#")]),t._v(" 2.Review:")]),t._v(" "),a("p",[t._v("https://towardsdatascience.com/trying-out-dask-dataframes-in-python-for-fast-data-analysis-in-parallel-aa960c18a915\n如何在 Python 中使用 Dask Dataframes 加速并行数据分析")]),t._v(" "),a("h4",{attrs:{id:"点评："}},[a("a",{staticClass:"header-anchor",attrs:{href:"#点评："}},[t._v("#")]),t._v(" 点评：")]),t._v(" "),a("p",[t._v("作者：Luciano Strika\n当使用 Python 的 Pandas 打开了一个几百万行的数据集，尝试获取一些指标，可能要等一整分钟才能获得一系列简单的平均值，而当如果达到数十亿时，无法进行分析。Dask 是一个开源项目，可为解决这个问题。 Dask 提供有关 NumPy 数组，Pandas 数据帧和常规​​列表的抽象，从而允许您使用多核处理并行运行它们。")]),t._v(" "),a("p",[t._v("Dask 官方文档中介绍的特性：")]),t._v(" "),a("ul",[a("li",[t._v("处理大型数据集，即使这些数据集不适合存储在内存中")]),t._v(" "),a("li",[t._v("通过使用多个内核来加速长计算")]),t._v(" "),a("li",[t._v("使用标准的 Pandas 操作（例如 groupby，join 和时间序列计算）在大型数据集上进行分布式计算")])]),t._v(" "),a("p",[t._v("使用 Dask Dataframes 时确实非常快的一些场景：")]),t._v(" "),a("ul",[a("li",[t._v("算术运算（乘或加到系列中）")]),t._v(" "),a("li",[t._v("常见的汇总（平均值，最小值，最大值，总和等）")]),t._v(" "),a("li",[t._v("调用 apply（只要它沿着索引-即不在 \"y\" 不是索引的 groupby（'y'）之后）")]),t._v(" "),a("li",[t._v("调用 value_counts（），drop_duplicates（）或 corr（）")]),t._v(" "),a("li",[t._v("使用 loc，isin 和按行选择进行过滤")])]),t._v(" "),a("div",{staticClass:"language-python extra-class"},[a("pre",{pre:!0,attrs:{class:"language-python"}},[a("code",[t._v("＃通过引用仅返回x"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("5")]),t._v("的行（在其上写会更改原始df）\ndf2  "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("  df。loc "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v(" df "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'x'")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("  "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("5")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n＃通过引用仅返回x为"),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v("、"),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v("、"),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),t._v("、"),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),t._v("或"),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("4")]),t._v("的行\ndf3  "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("  df。X。isin（范围（"),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("4")]),t._v("））\n＃通过只读引用仅返回x"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("5")]),t._v("的行（无法写入）\ndf4  "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("  df "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v(" df "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'x'")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("5")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n")])])]),a("p",[t._v("结论：\n作者在一台非常旧的 4 核 PC 上，一分钟内运行 2.5 亿行内容，觉得会在实际应用中有着举足轻重的地位。因此建议，下次处理本地或从单个 AWS 实例中处理数据集时，可以考虑使用这个框架，非常高效。")]),t._v(" "),a("h3",{attrs:{id:"_3-tip"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-tip"}},[t._v("#")]),t._v(" 3.Tip:")]),t._v(" "),a("ol",[a("li",[t._v("pipenv 虚拟环境")])]),t._v(" "),a("div",{staticClass:"language-python extra-class"},[a("pre",{pre:!0,attrs:{class:"language-python"}},[a("code",[a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v("、安装\n   "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" pip3 install pipenv    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("pip3安装的会指向Python3"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),t._v("、新建一个项目文件：letgo\n"),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),t._v("、进入文件夹：cd letgo\n"),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("4")]),t._v("、指定虚拟环境使用哪个版本的python\n   "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" pipenv "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("three 会使用当前系统的Python3创建环境\n"),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("5")]),t._v("、换成国内镜像，被墙网速慢\n   "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" 编辑文件letgo"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("Pipfile\n   "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" 将 url "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"https://pypi.org/simple"')]),t._v(" 替换成国内镜像 \n      url "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"https://pypi.tuna.tsinghua.edu.cn/simple/"')]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("6")]),t._v("、激活虚拟环境\n   "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" pipenv shell "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("进入虚拟环境"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("新建的虚拟环境存放在"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("root"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("local"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("share"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("virtualenvs"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("下，想要删除这个环境，直接删除这个文件夹"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("7")]),t._v("、pipenv install django"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1.11")]),t._v(" 安装固定版本模块，并加入到 Pipfile \n"),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("8")]),t._v("、当项目放到阿里云上时，直接运行：pipenv install 就能自动生成一份和本地环境，一模一样的环境\n"),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("9")]),t._v("、常用命令：\n   pipenv graph                  查看目前安装的库及其依赖\n \n   pipenv uninstall "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("all")]),t._v("        卸载全部包并从Pipfile中移除\n   pipenv uninstall django"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1.11")]),t._v(" 卸载指定包并从Pipfile中移除\n   \n   pipenv update requests        "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 更新指定个包")]),t._v("\n   pipenv update                 "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 更新所有的包")]),t._v("\n  \n   pipenv shell  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 进入环境")]),t._v("\n   exit  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 退出环境")]),t._v("\n   pipenv "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("rm   "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 删除虚拟环境")]),t._v("\n")])])]),a("ol",{attrs:{start:"2"}},[a("li",[t._v("Linux 系统安装、卸载 Anaconda 要点")])]),t._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v(".在 Anaconda 官网 https://repo.anaconda.com/archive/ 内下载需要的版本；\n\n"),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),t._v(".bash 下载好的文件\n\n"),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),t._v(".配置和验证安装是否成功：\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 将anaconda的bin目录加入PATH，根据版本不同，也可能是~/anaconda3/bin")]),t._v("\n$ "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("echo")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'export PATH=\"~/anaconda3/bin:"),a("span",{pre:!0,attrs:{class:"token environment constant"}},[t._v("$PATH")]),t._v("\"'")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">>")]),t._v(" ~/.bashrc\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 更新bashrc以立即生效")]),t._v("\n$ "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("source")]),t._v(" ~/.bashrc\n$ conda --version\n\n"),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("4")]),t._v(".其他拓展：\n列出安装的包：\n$ conda list\n更新包：\n$ conda update conda\n\n"),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("5")]),t._v(".卸载 Anaconda\n$ rm-rf ~/anaconda\n$ "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("vim")]),t._v(" ~/.bashrc\n注释\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# export PATH=~/anaconda3/bin:$PATH")]),t._v("\n$ "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("source")]),t._v(" ~/.bashrc\n")])])]),a("p",[t._v("3.Conda 安装本地 package：")]),t._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# --use-local 后面最好写绝对路径，或者进入到 Anaconda 的 pkgs 目录下再执行上述语句。")]),t._v("\n$ conda "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" --use-local your-pkg-name\n")])])]),a("p",[t._v('4.解决 conda 的 "Solving environment: failed" 问题')]),t._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[t._v("$ conda config --set channel_priority flexible\n")])])]),a("p",[t._v("5.Conda Python 版本转换：")]),t._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[t._v("安装其他版本的 python，通过定义 "),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[t._v("python")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("x 自选版本，名字可自定义，这里叫 python37\n$ conda create -n python37 "),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[t._v("python")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("3.7")]),t._v("\n\n查看当前的 python 编辑器，带*号的当前使用版本，后面是当前版本使用的环境变量\n$ conda info -e\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# conda environments:")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#")]),t._v("\nbase                  *  /home/python/anaconda3\npython37                 /home/python/anaconda3/envs/python37\n\n版本切换\n$ conda activate python37     "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#激活版本，conda activate + 编辑器名字")]),t._v("\n$ python -V                   "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#前面会带有版本注释    ")]),t._v("\nPython "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("3.7")]),t._v(".16 :: Anaconda, Inc.\n$ conda deactivate python37    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#退出当前版本")]),t._v("\n\n开机既指定版本为当前使用版本，可直接在环境变量文件中激活\n$ "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("vim")]),t._v(" ~/.bashrc    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#添加所需激活的版本")]),t._v("\nconda activate python37\n$ "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("source")]),t._v(" ~/.bashrc\n\n删除 python 版本：conda remove -n 编辑器名字 --all\n$ conda remove -n python37 --all\n")])])]),a("p",[t._v("6.ipython 是增强的 Python Shell，自动补全、自动缩进、支持 shell，增加了很多函数。")]),t._v(" "),a("div",{staticClass:"language-python extra-class"},[a("pre",{pre:!0,attrs:{class:"language-python"}},[a("code",[t._v("$ ipython\nPython "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("3.6")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v(".5")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v("Anaconda"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" Inc"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("default"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" Apr "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("29")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("2018")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("16")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("14")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("56")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\nType "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'copyright'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'credits'")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("or")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'license'")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" more information\nIPython "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("6.4")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v(".0")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v(" An enhanced Interactive Python"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v(" Type "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'?'")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("help")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("\n \nIn "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("print")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Hello World!"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\nHello World!\n \nIn "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" quit\n")])])]),a("p",[t._v("7.jupyter 是基于 web 的交互式笔记本，其中可以非常方便的使用 python，后台使用的是 ipython。")]),t._v(" "),a("div",{staticClass:"language-python extra-class"},[a("pre",{pre:!0,attrs:{class:"language-python"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#生成jupyter notebook启动参数文件并修改参数")]),t._v("\n$ jupyter notebook "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("generate"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("config\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#添加jupyter登录密码，执行如下指令输入密码，并在用户如下目录生成json的密码文件")]),t._v("\n$ jupyter notebook password              \n$ cat "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("jupyter"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("jupyter_notebook_config"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("json \n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"NotebookApp"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"password"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"sha1:XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"')]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#文件jupyter_notebook_config.py添加如下参数，后保存")]),t._v("\n$ vim "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("jupyter"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("jupyter_notebook_config"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("py\nc"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("NotebookApp"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("ip "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'*'")]),t._v("  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#外部IP地址客户端可以访问")]),t._v("\nc"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("NotebookApp"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("notebook_dir "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'/jupyter_nb_demo'")]),t._v("  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#本地notebook访问的目录")]),t._v("\nc"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("NotebookApp"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("open_browser "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("False")]),t._v("   "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#jupyter notebook启用时不再本地默认打开浏览器")]),t._v("\nc"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("NotebookApp"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("port "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("9999")]),t._v("            "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#默认访问的端口是9999")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#直接启动notebook后台服务，并输出运行日志，之后就可以远程访问这个服务了")]),t._v("\n$ jupyter notebook "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("jupyter"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("jupyter_notebook"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("log "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("10395")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#后面可以使用如下指令查看运行日志")]),t._v("\n$ tail "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("f "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("jupyter"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("jupyter_notebook"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("log\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#指定本机ip与自定义运行端口 ")]),t._v("\n$ jupyter notebook "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("ip"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0.0")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v(".0")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v(".0")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("port"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("8888")]),t._v("\n")])])]),a("p",[t._v("8.Jupyter Notebook 中添加 conda 虚拟环境")]),t._v(" "),a("div",{staticClass:"language-python extra-class"},[a("pre",{pre:!0,attrs:{class:"language-python"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#安装 ipykernel")]),t._v("\nconda activate 环境名称\nconda install ipykernel\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#写入 Jupyter 的 kernel")]),t._v("\npython "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("m ipykernel install "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("user "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("name 环境名称 "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("display"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("name "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Python (环境名称)"')]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#切换 kernel  Kernel->Change kernel->选择环境")]),t._v("\njupyter notebook\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#删除 kernel 环境")]),t._v("\njupyter kernelspec remove 环境名称\n")])])]),a("h3",{attrs:{id:"_4-share"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4-share"}},[t._v("#")]),t._v(" 4.Share:")]),t._v(" "),a("p",[t._v("http://www.dataguru.cn/article-15038-1.html\n比Spark快100倍的GPU加速SQL引擎！BlazingSQL开源了")]),t._v(" "),a("p",[t._v("https://blog.csdn.net/houzhe_adore/article/details/51315036?spm=a2c6h.12873639.0.0.5e7f5f45kFQGxy\nLogstash吞吐量性能优化")]),t._v(" "),a("p",[t._v("https://www.jianshu.com/p/763aa1102a98\nHadoop 2.7.3之后到最新的Hadoop3.2.0的主要新特性")]),t._v(" "),a("p",[t._v("https://blog.csdn.net/weixin_41133061/article/details/89647202\nPython虚拟环境和包管理工具Pipenv的使用详解")]),t._v(" "),a("p",[t._v("https://blog.csdn.net/yuejisuo1948/article/details/81043823\nanaconda python 版本对应关系")]),t._v(" "),a("p",[t._v("https://zhuanlan.zhihu.com/p/67959768\n利器|JupyterLab 数据分析必备IDE完全指南")])])}),[],!1,null,null,null);s.default=e.exports}}]);