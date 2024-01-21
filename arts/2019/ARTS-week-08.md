---
title: ARTS-week-8
date: 2019-10-20 21:38:57
tags:
---

## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm: 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

Trapping Rain Water：https://leetcode.com/submissions/detail/271565471/
Design Circular Deque : https://leetcode.com/submissions/detail/271557968/
Remove Duplicates from Sorted Array : https://leetcode.com/submissions/detail/271543489/

### 2.Review:

跳跃表 https://www.cl.cam.ac.uk/teaching/0506/Algorithms/skiplists.pdf


#### 点评：
跳跃表以有序的方式在层次化的链表中保存元素，效率和平衡树媲美——查找、删除、添加等操作都可以在对数期望时间下完成,
并且比起平衡树来说,跳跃表的实现要简单直观得多。

为了满足自身的功能需要， Redis 基于 William Pugh 论文中描述的跳跃表进行了以下修改：

允许重复的 score 值：多个不同的 member 的 score 值可以相同。
进行对比操作时，不仅要检查 score 值，还要检查 member ：当 score 值可以重复时，单靠 score 值无法判断一个元素的身份，所以需要连 member 域都一并检查才行。
每个节点都带有一个高度为 1 层的后退指针，用于从表尾方向向表头方向迭代：当执行 ZREVRANGE 或 ZREVRANGEBYSCORE 这类以逆序处理有序集的命令时，就会用到这个属性。
这个修改版的跳跃表由 redis.h/zskiplist 结构定义：
``` c
typedef struct zskiplist {

    // 头节点，尾节点
    struct zskiplistNode *header, *tail;

    // 节点数量
    unsigned long length;

    // 目前表内节点的最大层数
    int level;

} zskiplist;
```
跳跃表的节点由 redis.h/zskiplistNode 定义：
``` c
typedef struct zskiplistNode {

    // member 对象
    robj *obj;

    // 分值
    double score;

    // 后退指针
    struct zskiplistNode *backward;

    // 层
    struct zskiplistLevel {

        // 前进指针
        struct zskiplistNode *forward;

        // 这个层跨越的节点数量
        unsigned int span;

    } level[];

} zskiplistNode;
```

##### 总结：
跳跃表是一种随机化数据结构，查找、添加、删除操作都可以在对数期望时间下完成。
跳跃表目前在 Redis 的唯一作用，就是作为有序集类型的底层数据结构（之一，另一个构成有序集的结构是字典）。
为了满足自身的需求，Redis 基于 William Pugh 论文中描述的跳跃表进行了修改，包括：
score 值可重复。
对比一个元素需要同时检查它的 score 和 memeber 。
每个节点带有高度为 1 层的后退指针，用于从表尾方向向表头方向迭代。

### 3.Tip:

数组、链表和跳表
任何高维的数据结构都是有低维数据结构组成
数组：查找快但插入和删除慢
链表：插入和删除快但查找慢
跳表：为链表条件多级聚合索引加快查找速度，时间复杂度由O(n)降低到O(logn)，但插入和删除时间复杂度提高到O(logn)

工程实践参考
链表：LRUCache
跳表：Redis

跳表查询时间复杂度推导：
从第1层到最高层，各层链表的平均节点数是一个指数递减的等比数列。容易推算出，总层数的均值为log 1/p n，而最高层的平均节点数为1/p。
综上，粗略来计算的话，平均查找长度约等于：C(log 1/p n-1)=(log 1/p n-1)/p

栈、队列、优先队列和双端队列
栈：后进先出
队列：先进先出
优先队列：按优先级弹出元素的队列，可以使用堆实现
双端队列：可以从两端插入或弹出元素的队列

算法优化思路
升维：当前维度难以处理问题时，可以考虑提高数据的维度，例如将数组的元素构造为二叉树。
空间换时间：通过存储索引、缓存数据等方法来提升解决问题的速度。跳表就是运用了这种思维方式。
定位指针：使用一个指针标记待处理的元素，然后寻找需要处理的元素，使得在找到处理元素时可以迅速取得待处理元素的思路。移动零
双指针：拥有两个指针定位数据的两端，在过程中不断向中间逼近。盛最多水的容器，三数之和
递归：找到重复问题的终结点，逆推整个过程。爬梯子


### 4.Share:

##### Java Queue 源码分析:

Queue也继承自Collection，说明它是集合家族的一员。Queue接口主要提供了以下方法：
``` java
//将元素插入队列
boolean add(E e);

//将元素插入队列，与add相比，在容量受限时应该使用这个
boolean offer(E e);

//将队首的元素删除，队列为空则抛出异常
E remove();

//将队首的元素删除，队列为空则返回null
E poll();

//获取队首元素，但不移除，队列为空则抛出异常
E element();

//获取队首元素，但不移除，队列为空则返回null
E peek();
```

超级实现类AbstractQueue仅实现了add、remove和element三个方法，并且分别调用了另外一个仅细微区别的方法
``` java
//这里我们就明白，对于有容量限制的，直接调用offer肯定会更快
public boolean add(E e) {
    if (offer(e))
        return true;
    else
        throw new IllegalStateException("Queue full");
}
```

实现了clear与addAll方法，重写这些方法可以使其更符合当前场景。
``` java
public void clear() {
    while (poll() != null)
        ;
}

public boolean addAll(Collection<? extends E> c) {
    if (c == null)
        throw new NullPointerException();
    if (c == this)
        throw new IllegalArgumentException();
    boolean modified = false;
    for (E e : c)
        if (add(e))
            modified = true;
    return modified;
}
```

##### Java PriorityQueue 源码分析:
特性：
1. 基于优先级堆的无界优先级队列；
2. 元素是按照自然排序或者在队列构建时提供的方法来进行排序；
3. 队列中不允许存在null元素；
4. 不是多线程安全的； 
5. 使用的是二叉堆，二叉堆分为大根堆和小根堆，大根堆是父节点的值总是大于或等于子节点的值，小根堆是父节点的值总是小于或等于子节点的值；
6. 是一棵完全而查实或近似完全二叉树；
7. 内部的实现是基于数组格式的，对于数组中任意位置n上的元素，它的左孩子是在[2n+1]的位置上，它的右孩子是在[2n+2]的位置上，它的父节点则在[(n-1)/2]上，而根节点在[0]上；

初始化定义
``` java
//默认容量为11
private static final int DEFAULT_INITIAL_CAPACITY = 11;
//元素的存储方式是数组
private transient Object[] queue;
//队列中元素的个数
private int size = 0;
//比较器
private final Comparator<? super E> comparator;
//队列修改的次数
private transient int modCount = 0;
```

PriorityQueue 的构造函数
``` java
 /**
 * 构造函数：创建一个默认容量（11）和自然顺序的PriorityQueue
 */
public PriorityQueue() {
    this(DEFAULT_INITIAL_CAPACITY, null);
}

/**
 * 构造函数：创建一个指定容量和自然顺序的队列
 * @param initialCapacity
 */
public PriorityQueue(int initialCapacity) {
    this(initialCapacity, null);
}

/**
 * 构造函数：创建一个指定容量和指定顺序的队列
 * @param initialCapacity
 * @param comparator
 */
public PriorityQueue(int initialCapacity,
                     Comparator<? super E> comparator) {
    if (initialCapacity < 1)
        throw new IllegalArgumentException();
    this.queue = new Object[initialCapacity];
    this.comparator = comparator;
}

/**
 * 构造函数：根据指定集合创建一个队列
 * 如果c是有序的集合：根据集合获取到对应的比较器comparator，将集合中的元素
 * @param c
 */
@SuppressWarnings("unchecked")
public PriorityQueue(Collection<? extends E> c) {
    if (c instanceof SortedSet<?>) {
        SortedSet<? extends E> ss = (SortedSet<? extends E>) c;
        this.comparator = (Comparator<? super E>) ss.comparator();
        initElementsFromCollection(ss);
    }
    else if (c instanceof PriorityQueue<?>) {
        PriorityQueue<? extends E> pq = (PriorityQueue<? extends E>) c;
        this.comparator = (Comparator<? super E>) pq.comparator();
        initFromPriorityQueue(pq);
    }
    else {
        this.comparator = null;
        initFromCollection(c);
    }
}

/**
 * 构造函数：创建一个指定优先级的集合中的元素的队列
 * @param c
 */
@SuppressWarnings("unchecked")
public PriorityQueue(PriorityQueue<? extends E> c) {
    this.comparator = (Comparator<? super E>) c.comparator();
    initFromPriorityQueue(c);
}

@SuppressWarnings("unchecked")
public PriorityQueue(SortedSet<? extends E> c) {
    this.comparator = (Comparator<? super E>) c.comparator();
    initElementsFromCollection(c);
}

/**
 * 初始化一个队列
 * @param c
 */
private void initFromPriorityQueue(PriorityQueue<? extends E> c) {
    if (c.getClass() == PriorityQueue.class) {
        this.queue = c.toArray();
        this.size = c.size();
    } else {
        initFromCollection(c);
    }
}

/**
 * 从集合中初始化数据到队列中
 * @param c
 */
private void initElementsFromCollection(Collection<? extends E> c) {
	//将集合转化成数组
    Object[] a = c.toArray();
    //如果数组不是Object类型，转换成Object类型
    if (a.getClass() != Object[].class)
        a = Arrays.copyOf(a, a.length, Object[].class);
    int len = a.length;
    //如果数组的长度为1或者比较器不为空，如果队列中的元素
    if (len == 1 || this.comparator != null)
        for (int i = 0; i < len; i++)
            if (a[i] == null)
                throw new NullPointerException();
    this.queue = a;
    this.size = a.length;
}

private void initFromCollection(Collection<? extends E> c) {
    initElementsFromCollection(c);
    heapify();
}

private void heapify() {
    for (int i = (size >>> 1) - 1; i >= 0; i--)
        siftDown(i, (E) queue[i]);
}
```

add 方法的实现
``` java
 /**
* 向队列中插入一个元素
*/
public boolean add(E e) {
    return offer(e);
}

/**
 * 向队列中插入一个元素
 * 1.如果元素为空，抛出异常
 */
public boolean offer(E e) {
    if (e == null)
        throw new NullPointerException();
    modCount++;
    int i = size;
    //如果队列中的元素个数大于或等于队列的长度
    if (i >= queue.length)
        grow(i + 1);
    size = i + 1;
    //如果队列中的元素为空，那么新加入的元素为第一个元素，直接赋值到[0]位置
    if (i == 0)
        queue[0] = e;
    else
        siftUp(i, e);  //插入元素向上进行调整
    return true;
}

/**
 * 对数组的容量进行扩容
 * @param minCapacity
 */
private void grow(int minCapacity) {
    int oldCapacity = queue.length;
    //扩容的的大小要么是翻倍要么是增长50%
    int newCapacity = oldCapacity + ((oldCapacity < 64) ?
                                     (oldCapacity + 2) :
                                     (oldCapacity >> 1));
    //当数组的长度超过最大限制时，进行调整
    if (newCapacity - MAX_ARRAY_SIZE > 0)
        newCapacity = hugeCapacity(minCapacity);
    queue = Arrays.copyOf(queue, newCapacity);
}

//检验数组的长度是否超过限制，如果超过了进行调整或抛出异常
private static int hugeCapacity(int minCapacity) {
    if (minCapacity < 0) // overflow
        throw new OutOfMemoryError();
    return (minCapacity > MAX_ARRAY_SIZE) ?
        Integer.MAX_VALUE :
        MAX_ARRAY_SIZE;
}

/**
 * 在k位置插入元素x，同时对数组中的元素进行调整，使其满足队列的要求
 * @param k
 * @param x
 */
private void siftUp(int k, E x) {
    if (comparator != null)
        siftUpUsingComparator(k, x);
    else
        siftUpComparable(k, x);
}

/**
 * 如果是默认比较器，插入元素时的调整方法
 * @param k
 * @param x
 */
private void siftUpComparable(int k, E x) {
    Comparable<? super E> key = (Comparable<? super E>) x;
    //k大于0时，循环遍历k
    while (k > 0) {
    	//获取k的父节点
        int parent = (k - 1) >>> 1;
        //获取父节点的元素e
        Object e = queue[parent];
        //如果key的值大于等于其父节点的元素，那么不需要进行调整，结束操作
        if (key.compareTo((E) e) >= 0)
            break;
        //否则的话将两个值进行对换，同时将k赋值为其父节点的位置
        queue[k] = e;
        k = parent;
    }
    queue[k] = key;
}

/**
 * 如果有指定的比较器，插入元素之后的调整方法
 * @param k
 * @param x
 */
private void siftUpUsingComparator(int k, E x) {
    while (k > 0) {
        int parent = (k - 1) >>> 1;
        Object e = queue[parent];
        if (comparator.compare(x, (E) e) >= 0)
            break;
        queue[k] = e;
        k = parent;
    }
    queue[k] = x;
}
```

remove(Object obj) 方法的实现
``` java
/**
 * 删除某一个元素
 */
public boolean remove(Object o) {
	//首先回去元素在数组中的索引位置
    int i = indexOf(o);
    if (i == -1)
        return false;
    else {
        removeAt(i);
        return true;
    }
}

/**
 * 获取某个元素的索引位置，对数组进行遍历
 * @param o
 * @return
 */
private int indexOf(Object o) {
    if (o != null) {
        for (int i = 0; i < size; i++)
            if (o.equals(queue[i]))
                return i;
    }
    return -1;
}

/**
 * 删除某个位置的元素
 * @param i
 * @return
 */
private E removeAt(int i) {
    assert i >= 0 && i < size;
    modCount++;
    //s为数组中的最后一个元素的位置
    int s = --size;
    //如果删除的是最后一个元素，将最后一个位置的元素置为null
    if (s == i) // removed last element
        queue[i] = null;
    else {
    	//获取最后一个元素值
        E moved = (E) queue[s];
        //将最后一个位置的元素置为null
        queue[s] = null;
        siftDown(i, moved);
        //如果是最后一个元素替换到了删除的元素的位置，那么需要将元素进行向上比较，使其满足优先级队列的特性
        if (queue[i] == moved) {
            siftUp(i, moved);
            if (queue[i] != moved)
                return moved;
        }
    }
    return null;
}

/**
 * 向下调整队列中的元素
 * @param k
 * @param x
 */
private void siftDown(int k, E x) {
    if (comparator != null)
        siftDownUsingComparator(k, x);
    else
        siftDownComparable(k, x);
}

/**
 * 当无比较器时的下移操作的实现
 * @param k
 * @param x
 */
private void siftDownComparable(int k, E x) {
    Comparable<? super E> key = (Comparable<? super E>)x;
    //half为队列的中间一半位置
    int half = size >>> 1;        // loop while a non-leaf
    //循环调整k，k小于中间位置索引值时循环
    while (k < half) {
    	//获取k的左孩子索引值
        int child = (k << 1) + 1; // assume left child is least
        //获取左孩子的值
        Object c = queue[child];
        //获取k的右孩子索引值
        int right = child + 1;
        //如果存在右孩子，并且右孩子的值小于左孩子的值，那么将c值赋值为右孩子的值，也就是取左右孩子中值较小的那位
        if (right < size &&
            ((Comparable<? super E>) c).compareTo((E) queue[right]) > 0)
            c = queue[child = right];
        //如果key值小于等于孩子结点中的值，不需要调整，结束循环
        if (key.compareTo((E) c) <= 0)
            break;
        //如果key值大于孩子结点中的最小值，那么将两个
        queue[k] = c;
        k = child;
    }
    queue[k] = key;
}

private void siftDownUsingComparator(int k, E x) {
    int half = size >>> 1;
    while (k < half) {
        int child = (k << 1) + 1;
        Object c = queue[child];
        int right = child + 1;
        if (right < size &&
            comparator.compare((E) c, (E) queue[right]) > 0)
            c = queue[child = right];
        if (comparator.compare(x, (E) c) <= 0)
            break;
        queue[k] = c;
        k = child;
    }
    queue[k] = x;
}
```

总结：
1. 普通队列都是先进先出的，但是优先级队列是根据优先级进行确定的，优先级最高的先出队列；
2. 优先级队列类似于一棵完全二叉树，其内部实现使用的是数组；
3. 优先级队列在数组中其元素不一定是完全有序的，但是在出队列时，其元素是有序的；
4. 优先级队列插入和删除元素时，都需要对队列中的元素进行调整，其中remove()和add()方法的时间复杂度为O(log n),而remove(Obejct obj)和contaions()方法需要O(n)时间复杂度，取对头元素只需要O(1)时间；
5. 优先级队列是非同步的，队列中不允许使用null元素。