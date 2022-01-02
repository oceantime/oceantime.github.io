---
title: ARTS-week-41
date: 2021-10-09 18:31:00
tags:
---


## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm： 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

34. 在排序数组中查找元素的第一个和最后一个位置：https://leetcode-cn.com/submissions/detail/226233122/

852. 山脉数组的峰顶索引：https://leetcode-cn.com/submissions/detail/226440121/

154. 寻找旋转排序数组中的最小值 II：https://leetcode-cn.com/submissions/detail/226417234/

### 2.Review:

https://towardsdatascience.com/geometric-ml-becomes-real-in-fundamental-sciences-3b0d109883b5
几何 ML 在基础科学中“将科幻变为现实”，Halicin、AlphaFold 2.0、MaSIF

#### 点评：

1.几何ML方法被刊登在两大生物学杂志《细胞方法》和《自然方法》的2020年2月的封面上。什么方法?基于图神经网络的深度学习方法用于发现新的抗生素药物。 怎么做?训练一个图神经网络来预测已知抗菌活性的>2000分子(包括批准的抗生素药物以及来自动植物界的天然化合物)数据集上大肠杆菌(生物工程)的生长抑制。该预测仅基于分子图，不依赖任何副作用信息，如药物作用机制。药物发现的关键挑战之一是巨大的搜索空间，估计包含超过10个同质⁰分子。由于这些分子中只有一小部分可以在实验室中测试，因此选择有希望的候选分子是至关重要的。通过计算来完成这个过程被称为“虚拟筛选”。虽然ML方法过去曾被用于分子的虚拟筛选，更广泛地用于协助药物开发和发现的不同阶段，但这是第一次在不使用任何先前人类假设的情况下，从无到有一类全新的抗生素被发现。  

2.J. Jumper等人，使用深度学习的高精度蛋白质结构预测(2020)，又名AlphaFold 2.0(论文尚未发表) 。蛋白质可以说是最重要的生物分子，通常被称为“生命分子”，因为我们目前还没有发现任何非基于蛋白质的生命形式。蛋白质被编码在我们的DNA中，在我们的身体中有无数的功能，包括防止病原体 (antibodies), 赋予我们的皮肤结构(collagen),向细胞输送氧气(haemoglobin),催化化学反应 (enzymes)和信号(许多激素是蛋白质)。

3.P. Gainza等人，从蛋白质分子表面使用几何深度学习破译交互指纹(2020)自然方法17(2):184-192。蛋白质与其他生物分子之间的相互作用是蛋白质在大多数生物过程中发挥功能的基础。因此，更好地理解蛋白质如何相互作用是基础生物学和药物开发的关键:许多疾病都与蛋白质-蛋白质相互作用(PPI)有关，这是有希望的药物靶点。然而，这种相互作用通常涉及被认为是“不可用药”的平面界面，因为它们与传统的药物小分子靶向的口袋状结构有很大不同。

### 3.Tip:

#### Elasticsearch查询 highlight(高亮显示)
高亮显示需要字段中的内容，如果没有存储字段store=true，则加载实际的_source并从_source提取相关字段。

【1】简单的例子
```json
PUT article/_mapping
{
    "properties": {
        "article_type": {
            "type": "keyword"
        },
        "article_title": {
            "type": "text"
        },
        "content": {
            "type": "text"
        },
        "date": {
            "type": "date",
            "format": ["yyyy-MM-dd HH:mm:ss"]
        },
        "read_num": {
            "type": "integer"
        },
        "comment_num": {
            "type": "integer"
        }
    }
}
```

【2】执行下面请求之后在返回内容中除了常规的数据匹配之外还存在highlight对象，此对象中会将查询字段中和查询条件一直的内容使用预设的HTML标签进行包裹。
```json
GET article/_search
{
    "size":5,
    "query": {
        "match": {
            "content": "简单的查询"
        }
    },
    "highlight": {
        "boundary_scanner_locale":"zh_CN",
        "fields": {
            "content": {
                "pre_tags": [
                    "<em>"
                ],
                "post_tags": [
                    "</em>"
                ]
            }
        }
    }
}
```
【3】高亮设置
下面的参数可以设置在highlight的下一级此时未全局设置，也可以设置在字段的下一级，此时为字段设置。单个字段的设置优先级高于全局设置。比如下面的请求中最终匹配的短语会被包裹。
```json
GET article/_search
{
    "size":5,
    "query": {
        "match": {
            "content": "简单的查询"
        }
    },
    "highlight": {
        "boundary_scanner_locale":"zh_CN",
        "boundary_scanner":"sentence",
        "fragmenter":"span", 
        "pre_tags": ["<em>"],
        "post_tags": ["</em>"],
        "fields": {
            "content": {
               "pre_tags": [
                    "<h1>"
                ],
                "post_tags": [
                    "</h1>"
                ] 
            }
        }
    }
}
```

【3】高亮参数
参数 | 说明
-|-
boundary_chars | 包含每个边界字符的字符串。默认为,! ?\ \ n。
boundary_max_scan | 扫描边界字符的距离。默认为20。
boundary_scanner | 指定如何分割突出显示的片段，支持chars, sentence, or word三种方式。
boundary_scanner_locale | 用来设置搜索和确定单词边界的本地化设置，此参数使用语言标记的形式（“en-US”, “fr-FR”, “ja-JP”）
encoder | 表示代码段应该是HTML编码的:默认(无编码)还是HTML (HTML-转义代码段文本，然后插入高亮标记)
fields | 指定检索高亮显示的字段。可以使用通配符来指定字段。例如，可以指定comment_*来获取以comment_开头的所有文本和关键字字段的高亮显示。
force_source | 根据源高亮显示。默认值为false。
fragmenter | 指定文本应如何在突出显示片段中拆分:支持参数simple或者span。
fragment_offset | 控制要开始突出显示的空白。仅在使用fvh highlighter时有效。
fragment_size | 字符中突出显示的片段的大小。默认为100。
highlight_query | 突出显示搜索查询之外的其他查询的匹配项。这在使用重打分查询时特别有用，因为默认情况下高亮显示不会考虑这些问题。
matched_fields | 组合多个匹配结果以突出显示单个字段，对于使用不同方式分析同一字符串的多字段。所有的matched_fields必须将term_vector设置为with_positions_offsets，但是只有将匹配项组合到的字段才会被加载，因此只有将store设置为yes才能使该字段受益。只适用于fvh highlighter。
no_match_size | 如果没有要突出显示的匹配片段，则希望从字段开头返回的文本量。默认为0(不返回任何内容)。
number_of_fragments | 返回的片段的最大数量。如果片段的数量设置为0，则不会返回任何片段。相反，突出显示并返回整个字段内容。当需要突出显示短文本(如标题或地址)，但不需要分段时，使用此配置非常方便。如果number_of_fragments为0，则忽略fragment_size。默认为5。
order | 设置为score时，按分数对突出显示的片段进行排序。默认情况下，片段将按照它们在字段中出现的顺序输出(order:none)。将此选项设置为score将首先输出最相关的片段。每个高亮应用自己的逻辑来计算相关性得分。
phrase_limit | 控制文档中所考虑的匹配短语的数量。防止fvh highlighter分析太多的短语和消耗太多的内存。提高限制会增加查询时间并消耗更多内存。默认为256。
pre_tags | 与post_tags一起使用，定义用于突出显示文本的HTML标记。默认情况下，突出显示的文本被包装在和标记中。指定为字符串数组。
post_tags | 与pre_tags一起使用，定义用于突出显示文本的HTML标记。默认情况下，突出显示的文本被包装在和标记中。指定为字符串数组。
require_field_match | 默认情况下，只突出显示包含查询匹配的字段。将require_field_match设置为false以突出显示所有字段。默认值为true。
tags_schema | 设置为使用内置标记模式的样式。
type | 使用的高亮模式:unified, plain, or fvh. 默认为 unified。

【4】高亮参数内容的补充
- boundary_scanner：指定如何分割突出显示的片段，支持chars, sentence, or word三种方式。默认unified highlighter使用sentence，fvh highlighter使用chars。
  - chars：使用boundary_chars指定的字符突出显示边界。boundary_max_scan设置控制扫描边界字符的距离。只适用于fvh highlighter。
  - sentence：根据Java的BreakIterator确定，在下一个句子边界处中断突出显示的片段。配置了此参数后上面例子返回内容,可以看到其每个分段都是一个句子
```json
"highlight" : {
  "content" : [
    "<em>简</em><em>单</em><em>查</em><em>询</em>字符串——URI Search 实际业务中我们通常都是使用一个完整<em>的</em>请求体从elasticsearch获得数据。",
    "然而在有些时候我们为了调试系统或者数据<em>的</em>时候需要临时进行一些<em>简</em><em>单</em><em>的</em><em>查</em><em>询</em>时候，编写完整<em>的</em>请求体JSON可能会稍微麻烦。而elasticsearch提供了一种基于URI<em>的</em><em>简</em><em>单</em><em>的</em><em>查</em><em>询</em>方"
  ]
}
```
  - word:根据Java的BreakIterator确定，在下一个单词边界处中断突出显示的片段。使用此参数上面的例子返回内容，此时每个分段并不是一个完整的句子。
```json
"highlight" : {
  "content" : [
    "<em>简</em><em>单</em><em>查</em><em>询</em>字符串",
    "实际业务中我们通常都是使用一个完整<em>的</em>请求体从",
    "然而在有些时候我们为了调试系统或者数据<em>的</em>时候需要临时进行一些<em>简</em><em>单</em><em>的</em><em>查</em><em>询</em>时候",
    "编写完整<em>的</em>请求体",
    "<em>的</em><em>简</em><em>单</em><em>的</em><em>查</em><em>询</em>方"
  ]
}
```
- boundary_scanner_locale:用来设置搜索和确定单词边界的本地化设置
  - 可以通过https://docs.oracle.com/javase/8/docs/api/java/util/Locale.html#forLanguageTag-java.lang.String-获得更多语言标签
  - 默认参数为[Locale.ROOT]{https://docs.oracle.com/javase/8/docs/api/java/util/Locale.html#ROOT}

- fragmenter:指定文本应如何在突出显示片段中拆分。只适用于plain highlighter。默认为span。
  - simple:将文本分割成相同大小的片段
  - span:将文本分割为大小相同的片段，但尽量避免在突出显示的术语之间分割文本。这在查询短语时很有用
- type:type字段允许强制使用特定的高亮策略。可以配置的参数:unified, plain and fvh。下面是一个使用plain策略的例子:
```json
GET article/_search
{
    "query" : {
        "match": { "content": "简单的查询" }
    },
    "highlight" : {
        "fields" : {
            "content" : {"type" : "plain"}
        }
    }
}
```
三种不同的高亮策略的区别:
  - unified（通用高亮策略）:其使用的是Lucene的Unified Highlighter。此高亮策略将文本分解成句子，并使用BM25算法对单个句子进行评分，支持精确的短语和多术语(模糊、前缀、正则表达式)突出显示。这个是默认的高亮策略。
  - plain （普通高亮策略）:其使用的是Lucene的standard Lucene highlighter。它试图在理解词的重要性和短语查询中的任何词定位标准方面反映查询匹配逻辑。此高亮策略是和在单个字段中突出显示简单的查询匹配。如果想用复杂的查询在很多文档中突出显示很多字段，还是使用unified
  - Fast vector highlighter（快速向量策略）:其使用的是Lucene的Fast Vector highlighter。使用此策略需要在映射中将对应字段中属性term_vector设置为with_positions_offsets。这个策略以后会单独介绍。

- pre_tags和post_tags:默认情况下，高亮显示将以和包装突出显示的文本。这可以通过设置pre_tags和post_tags来控制，例如:
```json
GET article/_search
{
    "size":5,
    "query": {
        "match": {
            "content": "简单的查询"
        }
    },
    "highlight": {
        "boundary_scanner_locale":"zh_CN",
        "fields": {
            "content": {
               "pre_tags": [
                    "<h1>"
                ],
                "post_tags": [
                    "</h2>"
                ] 
            }
        }
    }
}
```
当然也可以使用系统预设的标签模式:
```json
GET article/_search
{
    "size":5,
    "query": {
        "match": {
            "content": "简单的查询"
        }
    },
    "highlight": {
        "boundary_scanner_locale":"zh_CN",
        "tags_schema" : "styled",
        "fields": {
            "content": {
                
            }
        }
    }
}
```
- fragment_size 和 number_of_fragments:fragment_size主要控制了每个高亮片段的大小，而number_of_fragments控制了返回多少个高亮片段。下面例子中就是控制返回两个长度10的片段
```json
GET article/_search
{
    "query": {
        "bool": {
            "must": [
                {
                    "match": {
                        "content": "简单的查询"
                    }
                }
            ]
        }
    },
    "highlight": {
        "boundary_scanner_locale": "zh_CN",
        "fields": {
            "content": {
              "fragment_size" : 10,
              "number_of_fragments" : 2
            }
        }
    }
}
```
- order:order控制了返回对象中highlight片段的排序。下面例子中返回的高亮片段将会根据分数顺序输出。假如设置了none则是按照顺序输出。
```json
GET article/_search
{
    "query": {
        "bool": {
            "must": [
                {
                    "match": {
                        "content": "简单的查询"
                    }
                }
            ]
        }
    },
    "highlight": {
        "order" : "score",
        "boundary_scanner_locale": "zh_CN",
        "fields": {
            "content": {}
        }
    }
}
```
- 对一个字段进行查询的时候希望高亮其他字段
在请求参数highlight中可以设置多个字段，同时需要为每个字段配置highlight_query。通过配置这个字段可以实现对content进行匹配查询同时高亮article_title和content字段的内容。同时使用此方法可以实现使用使用查询条件查询,而最终高亮字符串内容。
```json
GET article/_search
{
    "query": {
        "match": {
            "content": "查询"
        }
    },
    "highlight": {
        "fields": {
            "content": {
                "type": "unified",
                "highlight_query": {
                    "bool": {
                        "must": {
                            "match": {
                                "content": {
                                    "query": "字符串"
                                }
                            }
                        },
                        "minimum_should_match": 0
                    }
                }
            },
            "article_title": {
                "type": "unified",
                "highlight_query": {
                    "bool": {
                        "must": {
                            "match": {
                                "article_title": {
                                    "query": "字符串"
                                }
                            }
                        },
                        "minimum_should_match": 0
                    }
                }
            }
        }
    }
}
```
- highlighter如何确定高亮内容
为了从查询的词汇中获得搜索片段位置，高亮策略显示需要知道原始文本中每个单词的起始和结束字符偏移量。目前根据模式不同获取这些数据途径不同
  - 检索列表，如果在映射中index_options设置了offsets，unified会将其中数据应用在文档中，而不会重新分析文本。它直接对文档进行原始查询，并从索引中提取匹配的偏移数据。在字段内容很大的时候，使用此配置很重要，因为它不需要重新分析文本内容。和term_vectors相比，它还需要更少的磁盘空间。
  - 术语向量，如果在映射中term_vector设置为with_positions_offsets则unified highlighter使用term_vector来突出显示字段。对于大字段（大于1MB）和多术语查询它的速度会比较快。而fvh highlighter总是使用term_vector。
  - 普通的高亮策略（Plain highlighting），当没有其他选择的时候，unified highlighter使用此模式，他在内存中创建一个小的索引（index），通过运行Lucene的查询执行计划来访问文档的匹配信息，对需要高亮显示的每个字段和每个文档进行处理。plain highlighter总是使用此策略。注意此方式在大型文本上可能需要大量的时间和内存。在使用此策略时候可以设置分析的文本字符的最大数量限制为1000000。这个数值可以通过修改索引的index.highlight.max_analyzed_offset参数来改变。


### 4.Share:

https://blog.csdn.net/u013850277/article/details/90647636
程序员小灰2017-2019年原创汇总

https://github.com/LjyYano/Thinking_in_Java_MindMapping
LjyYano编程笔记

