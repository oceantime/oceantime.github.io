(window.webpackJsonp=window.webpackJsonp||[]).push([[32],{411:function(t,a,s){"use strict";s.r(a);var e=s(42),n=Object(e.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h2",{attrs:{id:"arts-2019-左耳听风社群活动-每周完成一个-arts"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#arts-2019-左耳听风社群活动-每周完成一个-arts"}},[t._v("#")]),t._v(" ARTS-2019 左耳听风社群活动--每周完成一个 ARTS")]),t._v(" "),s("p",[t._v("1.Algorithm： 每周至少做一个 leetcode 的算法题\n2.Review: 阅读并点评至少一篇英文技术文章\n3.Tip: 学习至少一个技术技巧\n4.Share: 分享一篇有观点和思考的技术文章")]),t._v(" "),s("h3",{attrs:{id:"_1-algorithm"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-algorithm"}},[t._v("#")]),t._v(" 1.Algorithm:")]),t._v(" "),s("p",[t._v("Merge Sorted Array https://leetcode.com/submissions/detail/289477912/")]),t._v(" "),s("h3",{attrs:{id:"_2-review"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-review"}},[t._v("#")]),t._v(" 2.Review:")]),t._v(" "),s("p",[t._v("https://www.holistics.io/blog/why-and-how-we-migrated-from-angularjs-to-vuejs/amp/")]),t._v(" "),s("h4",{attrs:{id:"点评："}},[s("a",{staticClass:"header-anchor",attrs:{href:"#点评："}},[t._v("#")]),t._v(" 点评：")]),t._v(" "),s("p",[t._v("作者简单说明当前项目使用 AngularJS 框架的特性和问题及为何迁移到vue框架。")]),t._v(" "),s("p",[t._v("AngularJS 框架的问题：\n渲染性能：由于AngularJs的特性，不得不花大量的时间来呈现一张巨大的数据表。\nAngular 的文档不友好：在这成为问题之前，其他都不算什么问题。我们越深入地使用 AngularJS，就越觉得它的文档实在难以理解。\n双向数据流使得逻辑处理起来相当困难，不管是写组件还是写视图控制器都是如此。这可能是AngularJS不好使用最重要的一个原因。")]),t._v(" "),s("p",[t._v("为何迁移到vue框架：\n最重要的决定性因素是：一个清晰、可逐步迁移到 VueJS，而又不会破坏发展路径的迁移路径。\nVueJS 的文档写得非常好，结构也非常清晰。")]),t._v(" "),s("p",[t._v("迁移完成后：\n非常整洁的代码和模块（基于组件的），以及 VueX 和 Vue Store 大大提高了编程效率\n再没有复杂的逻辑\n改善了 UI 性能")]),t._v(" "),s("h3",{attrs:{id:"_3-tip"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-tip"}},[t._v("#")]),t._v(" 3.Tip:")]),t._v(" "),s("p",[t._v("Docker-compose 构建 Kibana 实例：")]),t._v(" "),s("p",[t._v("1.目录结构")]),t._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[t._v("├── docker-compose.yml\n├── kibana.yml\n└── client-ca.cer\n")])])]),s("ol",{attrs:{start:"2"}},[s("li",[t._v("docker-compose.yml kiban端口及kibana.yml和client-ca.cer证书映射：")])]),t._v(" "),s("div",{staticClass:"language-yml extra-class"},[s("pre",{pre:!0,attrs:{class:"language-yml"}},[s("code",[s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("version")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"3"')]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("services")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("kibana")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("image")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" docker.elastic.co/kibana/kibana"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("6.8.1\n        "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("container_name")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" kibana\n        "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("environment")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n            "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" I18N_LOCALE=zh"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("CN\n        "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("ports")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n            "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"5601:5601"')]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("volumes")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n            "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" ./kibana.yml"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("/usr/share/kibana/config/kibana.yml\n            "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" ./client"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("ca.cer"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("/kibana"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("6.8.1/config/client"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("ca.cer\n")])])]),s("ol",{attrs:{start:"3"}},[s("li",[t._v("kibana.yml 与 9200 进行组合出 es-client 暴露的节点位置及ssl证书和认证配置")])]),t._v(" "),s("div",{staticClass:"language-yml extra-class"},[s("pre",{pre:!0,attrs:{class:"language-yml"}},[s("code",[t._v("server.port"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("5601")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("server.host")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"0"')]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("elasticsearch.hosts")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"https://127.0.0.1:9200"')]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("xpack.security.enabled")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean important"}},[t._v("true")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("elasticsearch.username")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"kibana"')]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("elasticsearch.password")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"xxxxxx"')]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("elasticsearch.ssl.certificateAuthorities")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" /kibana"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("6.8.1/config/client"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("ca.cer\n"),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("elasticsearch.ssl.verificationMode")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" certificate\n")])])]),s("h3",{attrs:{id:"_4-share"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_4-share"}},[t._v("#")]),t._v(" 4.Share:")]),t._v(" "),s("p",[t._v("面试问题：Vuejs如何实现双向绑定\nhttps://segmentfault.com/a/1190000016884795")])])}),[],!1,null,null,null);a.default=n.exports}}]);