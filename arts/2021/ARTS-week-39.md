---
> **ARTS-week-39**
> 2021-09-25 22:04
---


## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm： 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

863. 二叉树中所有距离为 K 的结点：https://leetcode-cn.com/submissions/detail/221938034/

973. 最接近原点的 K 个点：https://leetcode-cn.com/submissions/detail/221943902/

200. 岛屿数量：https://leetcode-cn.com/submissions/detail/222293895/

### 2.Review:

https://medium.com/digital-diplomacy/history-warns-of-the-deadly-threat-to-humanity-from-artificial-intelligence-e08eccfc9a5f
历史预警！农业文明加剧了贫富差距，而人工智能的全面发展也将威胁人类存亡

#### 点评：

2017年秋天在《Nature》杂志上发表的一篇文章很值得一读。它报道了华盛顿州立大学和亚利桑那州立大学进行的一项研究，结果表明，农业文明发展前，人类社会的财富差距非常小。大约在13,000年前，这种情况（因为农业文明的发展，贫富差距不断加大）发生在世界各地。接下来发生的事情也可以是对人工智能（AI）时代的人类的警告。

从广义上来说，拥有最新、最强大的技术意味着财富和力量。工业革命使用蒸汽动力代替了许多动物和人类的体力和汗水，蒸汽机的所有者和工厂变得非常富有。在当今，相当于牛、马和蒸汽机的技术是计算机，就像在早期人类时代一样，控制新技术的人也是最富有的人。然而，技术本身可能很快会颠覆这种古老的等同物。

许多受尊敬的专家预测，在未来几十年内，计算机的处理能力将超过人类。其中包括特斯拉和SpaceX首席执行官埃隆·马斯克（Elon Musk），以及已故的理论物理学家史蒂芬·霍金（Stephen Hawking），都担心人工智能机器最终将变得有意识，即具有自我意识，比人类更智能，并且将继续变得更快更强大。专家警告说，这些超智能机器将对人类构成生存威胁，因为人类将不知道他们在想什么，将无法继续控制它们。当然，没有人能确定这种情况是否会发生，何时发生，但专家警告是值得认真对待。

科学家将机器有意识的现象称为“奇点”。在那一刻到来前，专家们提出了许多有可能应对的方案。好点来说，这些机器将为人类创造者的利益服务，并且没有理由伤害人类。但是，既然人类不知道机器在想什么，那么谁能确定是这种情况呢？直到今天，计算机科学家仍不完全理解为什么复杂的计算机会做出某些决定。可以伤害人类的自主机器已经存在，可以将没有人工控制器的无人机编程为定位并攻击目标。一些科学家认为，如果机器变得有意识，它们很可能会将人类视为不必要和效率低下的人，并将其消灭。

埃隆·马斯克（Elon Musk）等人建议，匹配这些超级智能机器的唯一方法是通过将人的大脑连接到机器来增强人类智能。在那种科幻场景中，人类将成为半机械人的种族。（赛博朋克！）由于机器人的机器元素无疑会比生物元素进化地更快，因此人类将逐渐但有效地变成机器。这表明埃隆·马斯克（Elon Musk）的提议根本不是真正的解决方案，并且这些机器最终将以另一种方式被接管和控制。

多亏了人工智能，富有的人才能变得更加富有，具有讽刺意味的是，人们失去了对他们所发明技术的控制。这种情况不太可能很快发生，但可能比大多数人想的要早。当它在人类历史上的第一次发生时，非常富有的人群将变得更为稀少。

### 3.Tip:

#### 4.5 以卫语句取代嵌套条件式

【1】原代码
```json
double GetPayAmount()
{
    double result;
    if (IsDead())
    {
        result = DeadAmount();
    }
    else
    {
        if (IsSeparated())
        {
            result = SeparatedAmount();
        }
        else
        {
            if (IsRetired())
            {
                result = RetiredPayAmount();
            }
            else
            {
                result = NormalPayAmount();
            }
        }
    }

    return result;
}
```
【2】以卫语句取代嵌套条件式
```json
double getPayAmount()
{
    if (isDead())
    {
        return deadPayAmount();
    }
    if (isSeparated())
    {
        return separatedPayAmount();
    }
    if (isRetired())
    {
        return retiredPayAmount();
    }

    return normalPayAmount();
}
```
【3】总结
函数中的条件逻辑使人难以看清正常的分支执行路径。使用卫语句表现所有特殊情况。所谓卫语句，如果某个条件极其罕见，就应该单独检查该条件，并在该条件为真时立刻从函数中返回。这样的单独检查常常被称为“卫语句”。

### 4.Share:

https://blog.csdn.net/a704397849/article/details/99656703
建立docker 私有仓库 上传镜像失败的各种原因和解决办法

https://www.linuxidc.com/Linux/2018-03/151308.htm
使用Docker Registry快速搭建私有镜像仓库

https://blog.csdn.net/qq_43570369/article/details/91350476
docker搭建本地免密仓库、私有仓库registry加密访问控制（身份验证）

https://www.cnblogs.com/xiao987334176/p/9946915.html
Ubuntu 搭建docker registry 私有仓库

https://www.cnblogs.com/weschen/p/12658839.html
Docker Desktop启动Kubernetes

https://www.cnblogs.com/k3s2019/p/14339547.html
一文搞定全场景K3s离线安装

https://cloud.tencent.com/developer/news/836337
单节点Rancher离线安装的关键一步

https://xixuebin.github.io/2019-05-28-103541-ch.html
Redash环境搭建及二次开发

https://blog.csdn.net/zzb7728317/article/details/111592129
rancher2.5+版本中local集群找不到rancher/shell:v0.1.5