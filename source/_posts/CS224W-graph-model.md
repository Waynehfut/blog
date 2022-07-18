---
title: 初步学习图模型
tags: [机器学习, 深度学习, 基本概念]
mathjax: true
toc: true
date: 2022-07-01 10:26:30
categories:
    - [算法]
    - [学习]
---

本文主要用以记录学习斯坦福大学Jure Leskovec教授的CS224W课程中所做的笔记，文字可能会随着学习过程持续改进。P.S. 俄式英语真的蛮有意思的

## Lecture 1 Introduction; Machine Learning for Graphs

[Slides](https://web.stanford.edu/class/cs224w/slides/01-intro.pdf)

### Why Graphs?

为什么要有图？它是一种用于描述实体关系和及其关联关系的表示方式，主要描述了节点以及节点之间的关系来抽象数据，例如下图，事件、计算机网络甚至是计算机代码、3D的物体等多种数据都可以用图来表示。例如信息和知识等都可以被表示为图，其中具有关系的节点可以被连接为相似网络，其他具象物体相关关系也可以进一步表示为一个图的形式：
![多种类型的图](https://raw.githubusercontent.com/Waynehfut/blog/img/img/20220630114941.png)
![网络与图](https://raw.githubusercontent.com/Waynehfut/blog/img/img/20220630162311.png)

既然这么多的实际事物都可以用图来表示，那是否可以以图为基准，利用图的关系结构和数据的关联关系，辅助模型来做出更好的性能表现？实际上是可以的，但是这个有一定难度。
![Why this class](https://raw.githubusercontent.com/Waynehfut/blog/img/img/20220630162949.png)

虽然现在的深度学习啥的都已经取得了很好的效果了，但是不论是声音还是图像，都会被处理为固定长度的数据，接着相关的神经网络等算法会进一步进行处理，得到比较惊艳的结果。对于复杂的图结构而言，图的结构更加复杂，结构不确定，数据组成结构也更为多变，例如图像只有上下左右的相关关系，但是图的邻接关系则更为多变。
![复杂度对比](https://raw.githubusercontent.com/Waynehfut/blog/img/img/20220630163844.png)

而这门课主要内容包含了图与深度学习的结合，使得神经网络可以处理更为复杂的网络结构数据，学习到相关的表示，并得到新的节点及节点关系的预测。图神经网络是一个深度学习的新前沿领域。
![图深度学习](https://raw.githubusercontent.com/Waynehfut/blog/img/img/20220630195450.png)
与深度学习有所区别的是，其目标主要是找到一个表示方式来自动学习特征。
![表示学习](https://raw.githubusercontent.com/Waynehfut/blog/img/img/20220630201748.png)
例如将一个图结构通过构建一个神经网络转换为一个d维度的特征表示
![映射](https://raw.githubusercontent.com/Waynehfut/blog/img/img/20220630195849.png)

课程的主要内容包括下述部分：
![主要内容](https://raw.githubusercontent.com/Waynehfut/blog/img/img/20220630200019.png)

### Application of Graph ML

在图机器学习领域，我们可以制定多种不同类型的任务，例如在节点层级、边层级、区域层级和图层级，
![不同层级的任务](https://raw.githubusercontent.com/Waynehfut/blog/img/img/20220707205131.png)
并针对各层级制定开展相关的任务：在节点层级可以进行节点性质的预测，例如进行在线用户或商品的分类；在链接（边）层级可以进行节点是否链接的预测，例如知识图谱的完善；在图层级可以进行不同图的分类，例如在药物制备中进行分子性质的预测等；还可以在社交圈检测、新药发现、物理模拟等等领域都可以进行应用。
![相关的任务](https://raw.githubusercontent.com/Waynehfut/blog/img/img/20220707205328.png)

其中，最近的一个研究成果就是DeepMind的AlphaFold，使用了空间图（Spatial Graph）来进行氨基酸的节点和边（节点关联度）的预测，进一步可以估计出相关的氨基酸可以生成什么样的蛋白质。

![AlphaFold](https://raw.githubusercontent.com/Waynehfut/blog/img/img/20220707212038.png)

在推荐系统中，可以使用用户和物体的关系来进行商品销售的推荐，这个在亚马逊、阿里巴巴等电商网站上用的尤为多。或是进行药物并发症的研究等等。

### Choice of Graph Representation

如何表示网络会直接影响到上述应用的效果。因此，如何构建网络就显得尤为重要了，这里可以看一个简单的网络的抽象组成。包括对象（节点，顶点）、交叉（链接，边）、系统整体（网络，图结构）三个层次形式化表示。
![网络的一般结构](https://raw.githubusercontent.com/Waynehfut/blog/img/img/20220715163357.png)
在结合真实场景后，就可以赋予具体的含义，例如人际关系等等。

那如何定义一个网络呢？具体来说是现实中我们需要哪些是节点哪些是边。这直接决定了我们能否用这个网络来去解决我们的问题。有些例子很明显可以进行定义，但有些情况下合适的抽象表示往往是没有实际含义的。
同时图本身也并非是有向的，例如协作关系，朋友关系等等网络。但通话记录，和互粉干系等等则是有向的网络。

![有向图和无向图](https://raw.githubusercontent.com/Waynehfut/blog/img/img/20220715164752.png)

因此可以定义一个图的机构为 $G=(V,E,R,T)$, 其中$V$中包含不同的节点$v_i\in V$，边关系可以表示为$(v_i,r,v_j)\in E$，节点类型可以表示为$T(v_i)$，节点关系既可以进一步表示为$r\in R$。

可以在此基础上进一步定义出节点的复杂程度，称之为度，根据有向图和无向图的区别，则有不同的计算方式，对于无向图，是指连接点连接的边的个数，而有向图则需要明确指向和指出的区别，A点的度数为4，而C点的入度为2，出度为1。同样，可以在此基础上，再进行节点的平均，从而得到平均度数。
![无向图](https://raw.githubusercontent.com/Waynehfut/blog/img/img/20220715172643.png)
![有向图](https://raw.githubusercontent.com/Waynehfut/blog/img/img/20220715173356.png)

另一类常见的图称之为二分图（Bipartite Graph），这类图的节点可以被划分为两个集合$U$和$V$，其中每个$U$中的节点都和$V$中的某个节点相连，而内部不曾相连。
![二分图](https://raw.githubusercontent.com/Waynehfut/blog/img/img/20220718163918.png)

那图怎么表示呢？一个很简单的办法就是通过邻接矩阵来表示图结构，节点可以用矩阵的维度来表示，而节点链接情况可以用矩阵赋值0-1来表示。
![邻接矩阵](https://raw.githubusercontent.com/Waynehfut/blog/img/img/20220718165140.png)

需要注意的是，实际的情况下这种矩阵是十分稀疏的，这时，可以使用链接列表来表示：
![连接列表](https://raw.githubusercontent.com/Waynehfut/blog/img/img/20220718165901.png)

对于特别大且较稀疏的网络而言，还可以进一步考虑使用邻接列表。
![邻接列表](https://raw.githubusercontent.com/Waynehfut/blog/img/img/20220718170023.png)

此外还可以对节点和链接赋予权值权重，给予更为丰富的含义表示。
![节点权重](https://raw.githubusercontent.com/Waynehfut/blog/img/img/20220718170931.png)

同时每个节点还可以增加循环或多个链接等方式来增强图结构的表示能力。

在此基础上，可以依据节点的链接情况来定义强连接和弱连接。其中，强连接是指这部分的节点都有相互连接的通路（如：A-B，B-A），相应的没有这个通路的称之为弱连接。

![连接性](https://raw.githubusercontent.com/Waynehfut/blog/img/img/20220718172051.png)

而具有强连接的部分就可以称之为强连通分量（Strongly connected components）。
![](https://raw.githubusercontent.com/Waynehfut/blog/img/img/20220718172205.png)