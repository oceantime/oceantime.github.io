(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{400:function(a,t,s){"use strict";s.r(t);var r=s(42),e=Object(r.a)({},(function(){var a=this,t=a.$createElement,s=a._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[s("h2",{attrs:{id:"arts-2019-左耳听风社群活动-每周完成一个-arts"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#arts-2019-左耳听风社群活动-每周完成一个-arts"}},[a._v("#")]),a._v(" ARTS-2019 左耳听风社群活动--每周完成一个 ARTS")]),a._v(" "),s("p",[a._v("1.Algorithm： 每周至少做一个 leetcode 的算法题\n2.Review: 阅读并点评至少一篇英文技术文章\n3.Tip: 学习至少一个技术技巧\n4.Share: 分享一篇有观点和思考的技术文章")]),a._v(" "),s("h3",{attrs:{id:"_1-algorithm"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-algorithm"}},[a._v("#")]),a._v(" 1.Algorithm:")]),a._v(" "),s("p",[a._v("Longest Palindromic Substring：https://leetcode.com/submissions/detail/264961731/")]),a._v(" "),s("h3",{attrs:{id:"_2-review"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-review"}},[a._v("#")]),a._v(" 2.Review:")]),a._v(" "),s("p",[a._v("Dapper：http://research.google.com/pubs/pub36356.html\n大规模分布式系统的跟踪系统\n作者：Benjamin H. Sigelman, Luiz Andr´e Barroso, Mike Burrows, Pat Stephenson, Manoj Plakal, Donald Beaver, Saul Jaspan, Chandan Shanbhag")]),a._v(" "),s("h4",{attrs:{id:"点评："}},[s("a",{staticClass:"header-anchor",attrs:{href:"#点评："}},[a._v("#")]),a._v(" 点评：")]),a._v(" "),s("h5",{attrs:{id:"背景"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#背景"}},[a._v("#")]),a._v(" 背景:")]),a._v(" "),s("p",[a._v("现代的应用服务，往往是非常复杂的，如下的情况非常常见：\n软件的模块有不同团队开发\n整体由多种编程语言实现\n牵扯到多种操作系统和硬件\n关联不同数据中心的众多服务器\n…\n在这样的背景下，跟踪系统更加复杂，传统方式的跟踪系统往往是系统整体机能的一部分，往往侵入性过强，往往会产生由监控代码段引入的缺陷出现，同时由于监控间隔的设定调整也往往会对整体性能带来较大的负担，尤其是实时跟踪的场合下。")]),a._v(" "),s("h5",{attrs:{id:"为什么需要跟踪系统："}},[s("a",{staticClass:"header-anchor",attrs:{href:"#为什么需要跟踪系统："}},[a._v("#")]),a._v(" 为什么需要跟踪系统：")]),a._v(" "),s("p",[a._v("故障快速定位、恶性循环的形成、现状把握&决策支持")]),a._v(" "),s("h5",{attrs:{id:"启示1-跟踪系统的需求"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#启示1-跟踪系统的需求"}},[a._v("#")]),a._v(" 启示1: 跟踪系统的需求")]),a._v(" "),s("p",[a._v("在 Dapper 的论文这样认为，有两个重要的需求需要予以满足：ubiquitous deployment 和 continuous monitoring 。而这两个需求是对跟踪系统的使用范围（不要有死角）和运行方式（不要停）做了规范。")]),a._v(" "),s("h5",{attrs:{id:"启示2-跟踪系统的三大设计要点"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#启示2-跟踪系统的三大设计要点"}},[a._v("#")]),a._v(" 启示2: 跟踪系统的三大设计要点")]),a._v(" "),s("p",[a._v("dapper 在设计的时候考虑到了上述的背景，作为大规模集群的跟踪系统，需要满足如下三大设计要点：\n低损耗（Low overhead）\n应用级透明（Application-level transparency）\n扩展性（Scalability）")]),a._v(" "),s("h5",{attrs:{id:"启示3-跟踪系统的kpi"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#启示3-跟踪系统的kpi"}},[a._v("#")]),a._v(" 启示3: 跟踪系统的KPI")]),a._v(" "),s("p",[a._v("采样率：根据 google 的实践经验，采样率效率1/16时即能避免明显延迟，性能损耗在实验误差范围之内。\n损耗：跟踪系统自身的性能影响对于系统应该是能够忽略不计的，pinpoint 控制在3%之内。\n实效性：跟踪数据产生之后，分析的速度需要及时快速，理想状况数据在一分钟之内能够统计出来，以便对于生产环境的异常状况作出快速反应。")]),a._v(" "),s("h5",{attrs:{id:"启示4-可以关闭的跟踪系统"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#启示4-可以关闭的跟踪系统"}},[a._v("#")]),a._v(" 启示4: 可以关闭的跟踪系统")]),a._v(" "),s("p",[a._v("考虑到性能和安全的因素，生产环境的跟踪系统应该也可以关闭。")]),a._v(" "),s("h5",{attrs:{id:"启示5-准确定位延迟问题"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#启示5-准确定位延迟问题"}},[a._v("#")]),a._v(" 启示5: 准确定位延迟问题")]),a._v(" "),s("p",[a._v("google 通过使用 dapper 提供了这种情况下的急需数据，其实践有如下经验：")]),a._v(" "),s("ol",[s("li",[a._v("问题往往来源于一些意想不到的服务之间的交互，问题的纠正往往比较容易，而在 dapper 引入之前发现较为困难")]),a._v(" "),s("li",[a._v("简化跟踪的接口，使用唯一的追踪ID，便于集成和检测")])]),a._v(" "),s("h5",{attrs:{id:"启示6-跟踪系统给开发团队能带来什么"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#启示6-跟踪系统给开发团队能带来什么"}},[a._v("#")]),a._v(" 启示6: 跟踪系统给开发团队能带来什么")]),a._v(" "),s("p",[a._v("根据 google 的实践，跟踪系统能够帮助开发团队快速定位需要优化的应用，以及确定关键路径上非必要的串行请求。")]),a._v(" "),s("h5",{attrs:{id:"启示7-安全和隐私的考虑"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#启示7-安全和隐私的考虑"}},[a._v("#")]),a._v(" 启示7: 安全和隐私的考虑")]),a._v(" "),s("p",[a._v("跟踪系统能够记录一定的信息用于解释系统异常的原因，然后，这些数据可能包含一些不应该透露的内部信息，而这些信息可能正在调试的工程师也无权访问。")]),a._v(" "),s("h5",{attrs:{id:"启示8-dapper系统的核心构成"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#启示8-dapper系统的核心构成"}},[a._v("#")]),a._v(" 启示8: dapper系统的核心构成")]),a._v(" "),s("p",[a._v("dapper 是通过 trace tree 和 span 构建跟踪系统的。")]),a._v(" "),s("p",[a._v("span 名称：用于记录 span 的名称\nspanid：用于记录 span的Id，一般用全局唯一的64位整数表示\n父 spanid：父 span 的 spanid ，用于描述跟踪树结构\n事件信息：cs/cr/sr/ss 四种事件类型，span 不同的事件类型对应不同的时间戳，根据这些时间戳，可计算出不同阶段的耗时信息。\nannotation：一般，事件信息在 annotation 中存放，另外自定义的信息也可以与之关联")]),a._v(" "),s("h5",{attrs:{id:"启示9-定位全局网络流量和使用率"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#启示9-定位全局网络流量和使用率"}},[a._v("#")]),a._v(" 启示9: 定位全局网络流量和使用率")]),a._v(" "),s("p",[a._v("Dapper 不是设计用来做链路级的监控的，但是在实践中发现，其比较适合去做集群之间活动性的应用及认为分析，显示集群之间最活跃的网络流量的应用级热点，与传统的的网络相关的工具相比，最重要的特点是 dapper 可以定位到应用程序级别的根本问题。")]),a._v(" "),s("h5",{attrs:{id:"启示10：dapper不太适合的场景"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#启示10：dapper不太适合的场景"}},[a._v("#")]),a._v(" 启示10：dapper不太适合的场景")]),a._v(" "),s("p",[a._v("dapper 的模型的隐含前提是不同的子系统使用同一个被跟踪的请求所产生的连锁链式调用栈的情况。如果是多个追踪请求合并起来，而最终只使用其中的一个的情况则无法很好地对应。\ndapper 可以找出性能瓶颈，但是并不一定能准确定位到根本原因，因为定位出很慢的结果往往是由其他请求造成的，而这则需要进一步的分析。\ndapper 的设计主要是针对在线服务的系统，尤其是一个用户请求的系统行为，但是离线的情况下，则不能直接使用，需要一些人工的关联和干预行为。")]),a._v(" "),s("h3",{attrs:{id:"_3-tip"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-tip"}},[a._v("#")]),a._v(" 3.Tip:")]),a._v(" "),s("p",[a._v("nginx 反向代理配置 url")]),a._v(" "),s("p",[a._v("在 nginx 中配置 proxy_pass 时，当在后面的url加上了/，相当于是绝对根路径，则 nginx 不会把 location 中匹配的路径部分代理走;\n如果没有/，则会把匹配的路径部分也给代理走。下面四种场景分别用 http://192.168.1.6/proxy/index.html 进行访问。")]),a._v(" "),s("p",[a._v("场景一：会被代理到 http://127.0.0.1:8080/index.html")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[a._v("location /proxy/ "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n     proxy_pass http://127.0.0.1:8080/"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n")])])]),s("p",[a._v("场景二：相对于场景一，最后少一个 /。会被代理到 http://127.0.0.1:8080/proxy/index.html")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[a._v("location /proxy/ "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n     proxy_pass http://127.0.0.1:8080"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n")])])]),s("p",[a._v("场景三：会被代理到 http://127.0.0.1:8080/app/index.html")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[a._v("location /proxy/ "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n     proxy_pass http://127.0.0.1:8080/app/"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n")])])]),s("p",[a._v("场景四：相对于场景三，最后少一个 /。会被代理到 http://127.0.0.1:8080/appindex.html")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[a._v("location /proxy/ "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n     proxy_pass http://127.0.0.1:8080/app"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n")])])]),s("h3",{attrs:{id:"_4-share"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_4-share"}},[a._v("#")]),a._v(" 4.Share:")]),a._v(" "),s("p",[a._v("Maven私服Nexus的搭建(https://www.jianshu.com/p/e4a3ab0298df)")])])}),[],!1,null,null,null);t.default=e.exports}}]);