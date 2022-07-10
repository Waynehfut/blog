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
