(window.webpackJsonp=window.webpackJsonp||[]).push([[42],{422:function(s,t,a){"use strict";a.r(t);var n=a(42),e=Object(n.a)({},(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h2",{attrs:{id:"arts-2019-左耳听风社群活动-每周完成一个-arts"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#arts-2019-左耳听风社群活动-每周完成一个-arts"}},[s._v("#")]),s._v(" ARTS-2019 左耳听风社群活动--每周完成一个 ARTS")]),s._v(" "),a("p",[s._v("1.Algorithm： 每周至少做一个 leetcode 的算法题\n2.Review: 阅读并点评至少一篇英文技术文章\n3.Tip: 学习至少一个技术技巧\n4.Share: 分享一篇有观点和思考的技术文章")]),s._v(" "),a("h3",{attrs:{id:"_1-algorithm"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-algorithm"}},[s._v("#")]),s._v(" 1.Algorithm:")]),s._v(" "),a("p",[s._v("Subsets https://leetcode.com/submissions/detail/317114194/")]),s._v(" "),a("h3",{attrs:{id:"_2-review"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-review"}},[s._v("#")]),s._v(" 2.Review:")]),s._v(" "),a("p",[s._v("https://medium.com/@gvanrossum_83706/peg-parsers-7ed72462f97c")]),s._v(" "),a("h4",{attrs:{id:"点评："}},[a("a",{staticClass:"header-anchor",attrs:{href:"#点评："}},[s._v("#")]),s._v(" 点评：")]),s._v(" "),a("p",[s._v("Guido van Rossum 是 Python 之父去年写了关于 PEG 解析器的系列文章，作者去年学了很多关于 PEG（Parsing Expression Grammars）打算用 PEG 换掉自己写的 LL(1) 解析器 pgen。")]),s._v(" "),a("p",[s._v("pgen 存在的问题： 1.LL(1) 名字中的 “1” 表明它只使用单一的前向标记符（a single token lookahead），但某些规则（如 expr 和 term）是左递归的，而 pgen 还不足以聪明地解析。前向的单一标记符，解析器无法确定它查看的是一个表达式的开头，还是一个赋值。")]),s._v(" "),a("p",[s._v("PEG 解析器是如何解决的：通过使用无限的前向缓冲！PEG 解析器的经典实现中使用了一个叫作“packrat parsing” 的东西，它不仅会在解析之前将整个程序加载到内存中，而且还能允许解析器任意地回溯。 PEG 语法生成的解析器是可以无限回溯的递归下降（recursive-descent）解析器，“packrat parsing”通过记忆每个位置所匹配的规则，来使之生效。")]),s._v(" "),a("p",[s._v("2.pgen 驱动的解析器输出的是一个解析树，但是这个解析树并不直接用作代码生成器的输入。它首先会被转换成抽象语法树（AST），然后再被编译成字节码。原因 AST 比解析树更稳定，这减少了编译器出错的可能。")]),s._v(" "),a("p",[s._v("作者现在的想法是看看能否为 CPython 创造一个新的解析器，在解析时，使用 PEG 与 packrat parsing 来直接构建 AST，从而跳过中间解析树结构，并尽可能地节省内存，尽管它会使用无限的前向缓冲。转换成 PEG 的最后一个好处是它为语言的未来演化提供了更大的灵活性。")]),s._v(" "),a("p",[s._v("总结： 作者打算通过 PEG 创建一个新的 CPython 解析器。收益是未来演化提供了更大的灵活性，并解决递归下降算法中的表达式左递归问题。")]),s._v(" "),a("h3",{attrs:{id:"_3-tip"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-tip"}},[s._v("#")]),s._v(" 3.Tip:")]),s._v(" "),a("p",[s._v("scp 远程下载文件免密码验证方式")]),s._v(" "),a("p",[s._v("1.sshpass")]),s._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v(".创建编译安装目录\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("mkdir")]),s._v(" /usr/local/sshpass\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" /usr/local/sshpass\n"),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),s._v(".从 http://sourceforge.net/projects/sshpass/ 下载 sshpass-1.06.tar.gz 并上传到 /usr/local/sshpass \n"),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("3")]),s._v(".解压 \n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("tar")]),s._v(" -zxvf sshpass-1.06.tar.gz\n"),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("4")]),s._v(".进入解压后的文件目录\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" sshpass-1.06\n"),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("5")]),s._v(".安装\n./configure --prefix"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("/usr/local/sshpass\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("make")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("&")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("make")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("6")]),s._v(".创建软链接\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("ln")]),s._v(" -s /usr/local/sshpass/bin/sshpass /usr/bin/sshpass\n"),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("7")]),s._v(".检验是否安装成功\nsshpass\n出现如下提示即安装成功：\nUsage: sshpass "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("-f"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("-d"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("-p"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("-e"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("-hV"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("command")]),s._v(" parameters\n   -f filename   Take password to use from "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("file")]),s._v("\n   -d number     Use number as "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("file")]),s._v(" descriptor "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("for")]),s._v(" getting password\n   -p password   Provide password as argument "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("security unwise"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n   -e            Password is passed as env-var "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"SSHPASS"')]),s._v("\n   With no parameters - password will be taken from stdin\n\n   -h            Show "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("help")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("this "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("screen")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n   -V            Print version information\nAt "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("most")]),s._v(" one of -f, -d, -p or -e should be used\n\n使用：\nsshpass -p "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'密码'")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("scp")]),s._v(" -P 端口 -r 用户名@主机名:源文件 目的文件\n例子： \nsshpass -p "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'123456'")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("scp")]),s._v(" -P "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("5000")]),s._v(" -r root@192.168.0.1:/data/src_file.txt /data/dest_file\n")])])]),a("p",[s._v("2.expect")]),s._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v(". shell 脚本\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#!/usr/bin/expect")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("set")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("timeout")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("10")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("set")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("host")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("lindex "),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$argv")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("set")]),s._v(" username "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("lindex "),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$argv")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("set")]),s._v(" password "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("lindex "),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$argv")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("set")]),s._v(" src_file "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("lindex "),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$argv")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("3")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("set")]),s._v(" dest_file "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("lindex "),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$argv")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("4")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\nspawn "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("scp")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$src_file")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$username")]),s._v("@"),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$host")]),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(":")]),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$dest_file")]),s._v("\n "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("expect")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"(yes/no)?"')]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    send "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"yes'),a("span",{pre:!0,attrs:{class:"token entity",title:"\\n"}},[s._v("\\n")]),s._v('"')]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("expect")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"*assword:"')]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v(" send "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"'),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$password")]),a("span",{pre:!0,attrs:{class:"token entity",title:"\\n"}},[s._v("\\n")]),s._v('"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"*assword:"')]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    send "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"'),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$password")]),a("span",{pre:!0,attrs:{class:"token entity",title:"\\n"}},[s._v("\\n")]),s._v('"')]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("expect")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"100%"')]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("expect")]),s._v(" eof\n\n使用\n./expect_scp 主机名 用户名 密码 源文件 目的文件\n例子：\n./expect_scp "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("192.168")]),s._v(".0.1 root "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("123456")]),s._v(" /data/src_file.txt /data/dest_file\n\n"),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),s._v(". python 脚本\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#!/usr/bin/python")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#coding:utf-8")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("import")]),s._v(" sys,re\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("import")]),s._v(" os\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("import")]),s._v(" subprocess\n \n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#scp file to remote node.")]),s._v("\ndef expect_scp"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("user,ip,password,localsource,remotedest,port"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("22")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(":\n \n  SCP_CMD_BASE "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" r"),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('""')]),s._v('"\n      '),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("expect")]),s._v(" -c "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"\n      set timeout 300 ;\n      spawn scp -P {port} -r {localsource} {username}@{host}:{remotedest} ;\n      expect *assword* {{{{ send {password}'),a("span",{pre:!0,attrs:{class:"token entity",title:"\\r"}},[s._v("\\r")]),s._v(" }}}} ;\n      expect *"),a("span",{pre:!0,attrs:{class:"token entity",title:"\\r"}},[s._v("\\r")]),s._v(" ;\n      expect "),a("span",{pre:!0,attrs:{class:"token entity",title:"\\r"}},[s._v("\\r")]),s._v(' ;\n      expect eof\n      "')]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('""')]),s._v('".format'),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("username"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("user,password"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("password,host"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("ip,localsource"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("localsource,remotedest"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("remotedest,port"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("port"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n  SCP_CMD "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" SCP_CMD_BASE.format"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("localsource "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" localsource"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n  print "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"execute SCP_CMD: "')]),s._v(",SCP_CMD\n  p "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" subprocess.Popen"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v(" SCP_CMD , "),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("stdout")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("subprocess.PIPE, "),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("stderr")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("subprocess.PIPE, "),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("shell")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("True"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n  p.communicate"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n \n  os.system"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("SCP_CMD"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n   \n使用\nexpect_scp"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("用户名,主机名,密码,源文件,目的文件,端口）\n例子：\nexpect_scp"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"root"')]),s._v(","),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"192.168.156.72"')]),s._v(","),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"密码"')]),s._v(","),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"/tmp/var/log"')]),s._v(","),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"/etc/"')]),s._v(",22"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])])]),a("p",[s._v("3.建立SSH的信任关系")]),s._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v(".输入命令生成key:\n$ ssh-keygen -t rsa \n一直按回车，会在 /root/.ssh 生成三个文件:\nauthorized_keys\nid_rsa.pub\nid_rsa\n注意：为了各个主机之间免登录，每台主机都需要执行\n\n"),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),s._v(".设定其中一台主机为 master 合并公钥到 authorized_keys 中\n$ "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" /root/.ssh "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 进入/root/.ssh 目录")]),s._v("\n$ "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("cat")]),s._v(" id_rsa.pub "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">>")]),s._v(" authorized_keys "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 把 master 公钥合并到 authorized_keys 中")]),s._v("\n$ "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("ssh")]),s._v(" root@slave1_IP "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("cat")]),s._v(" ~/.ssh/id_rsa.pub "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">>")]),s._v(" authorized_keys "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 把 slave1 公钥合并到 authorized_keys 中")]),s._v("\n$ "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("ssh")]),s._v(" root@slave2_IP "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("cat")]),s._v(" ~/.ssh/id_rsa.pub "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">>")]),s._v(" authorized_keys "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 把 slave2 公钥合并到 authorized_keys 中")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("3")]),s._v(".把 master 的 authorized_keys 复制到所有 slave 主机中\n$ "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("scp")]),s._v(" authorized_keys slave1_IP:/root/.ssh/\n$ "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("scp")]),s._v(" authorized_keys slave2_IP:/root/.ssh/\n\n"),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("4")]),s._v(".复制完成后，每台主机重启 "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("ssh")]),s._v(" 服务\n$ "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("service")]),s._v(" sshd restart\n\n"),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("5")]),s._v(".每台主机输出测试能否无需输入密码连接其他主机\n$ "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("ssh")]),s._v(" 主机_IP\n")])])]),a("h3",{attrs:{id:"_4-share"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4-share"}},[s._v("#")]),s._v(" 4.Share:")]),s._v(" "),a("p",[s._v("Comparison of parser generators\nhttps://blog.csdn.net/gongwx/article/details/99645305")]),s._v(" "),a("p",[s._v("Open Source Parser Generators in Java\nhttps://java-source.net/open-source/parser-generators")])])}),[],!1,null,null,null);t.default=e.exports}}]);