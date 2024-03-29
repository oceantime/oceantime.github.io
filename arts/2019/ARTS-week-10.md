---
title: ARTS-week-10
date: 2019-11-03 11:51:33
tags:
---

## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm: 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

Word Ladder https://leetcode.com/submissions/detail/275568561/
Lemonade Change https://leetcode.com/submissions/detail/275570784/
Search in Rotated Sorted Array https://leetcode.com/submissions/detail/275583573/

### 2.Review:

https://tomassetti.me/parsing-in-java/

#### 点评：
文章系统介绍了目前主流的java解析工具及相关工具示例代码。
基本概念介绍：token、ast、grammar、lrr
分析生成器：给出了各种主流工具的基本实现样例代码


### 3.Tip:

##### 深度优先搜索、广度优先搜索的实现和特性
搜索和遍历
遍历搜索：在树（图/状态集）中找到特定的节点
每个节点都要访问一次
每个节点仅仅要访问一次（不做过多无用的访问，否则效率很低）
对节点的访问顺序不限
-深度优先：depth first search
-广度优先：breadth first search
优先级优先（启发式搜索）：估价函数 搜索效率属于深度学习  应用在各种推荐算法和高级搜索算法

DFS深度优先搜索方法：递归法、非递归法

深度优先和广度优先遍历的区别
1.BFS  	遍历完本层一次性加入后再遍历下一层
		BFS 队列就是一个数组
2.DFS  	有个level标志多少层
		类似水波的效果

##### 贪心的实现、特性及实战题目解析

贪心算法Greedy
每一步选择中都采取在当前状态下最好或最优（即最有利）的选择，从而希望导致结果时全局最好或最优的算法
与动态规划的不同在于对每个子问题的解决方案都做出选择，不能回退。

特点：
可以解决一些最优化问题：最小生成树、求哈夫曼编码等。
对于工程和生活中的问题，一般不能得到答案。
一旦一个问题可以通过贪心算法解决，一般就是最好的解决办法。
高效性及答案接近最优结果，可以作辅助算法或者解决要求结果不特别精确的问题。

适用场景
问题能够分解成子问题解决，子问题的最优解能递推到最终问题的最优解。子问题最优解称为最优子结构

贪心：当下局部最优判断
回溯：能够回退
动态规划：最优判断 + 回退

##### 二分查找的实现、特性及实战题目解析
前提
1.目标函数单调性（单调递增或者递减）
2.存在上下界（bounded）
3.能够通过索引访问（index accessible）

五毒神掌：

四步做题：
审题
所有解法思考 时间复杂度 空间复杂度 最后选出最优解
1.暴力：还原 O(n) 或 O(logN) ->   升序 -> 二分  O(logN)  （课后作业写、总结）
2.正解：二分查找
a.单调
b.边界
c.index
写代码
测试样例

##### 二分查找的实现、特性及实战题目解析
``` java
public class Search {
    //O(logN)
    /*  题目： 使用二分查找，寻找一个半有序数组[4, 5, 6, 7, 0, 1, 2]中间无序的地方
        处理思路：
        找到mid位置，判断该数是否与目标值相同，如果相同return
        不同就与当前范围的第一个数比较，如果不小于，则说明该数前面的数字是有序的，再判断target是否在该范围内，不在就转到后面
        如果小于，则说明前面的数中，包含折断位置，那么该数后面的数一定是有序的，即判断是否在后面的范围内，不在则往前找。
     */
    public static int search(int[] nums,int left,int right) {

        while(left <= right) {

            // 1.获取数组中间位置为当前位置
            int target = left + ((right - left) >> 1);

            //2.判断是否满足半有序数组中间无序的地方,即当前位置的值比前一个位置的值小,不满足则继续
            if(nums[target] < nums[target - 1]) {
                return target;
            } else if(nums[target] < nums[right] && (target + 1) == right){
                return target + 1;
            }

            //3.比较当前位置的值和数组第一个位置的值，如果大于则前面是有序的，替换左边位置为当前位置
            if(nums[target] >= nums[left]) {
                left = target;
            }else {//如果小于则后面是有序的，替换右边位置为当前位置
                right = target;
            }
        }
        return -1;
    }

    public static void main(String[] args) {
        //测试样例
//        int[] nums = {4, 5, 6, 7, 0, 1, 2};//样例数组
//        int[] nums = {8, 9, 10, 0, 1, 2, 3, 4, 5, 6, 7};//中间数组第一次取值小于左边第一个位置的值
        int[] nums = {2, 3, 4, -10, -9, -7, -2, -1, 0, 1};//带负数测试
        System.out.println(search(nums,0,nums.length-1));
    }
}
``` 

### 4.Share:
ANTLR 4进阶（https://www.liangshuang.name/2017/08/20/antlr/）