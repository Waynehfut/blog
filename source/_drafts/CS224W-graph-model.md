---
title: 初步学习图模型
tags: [机器学习，深度学习, 基本概念]
mathjax: true
toc: true
date: 2021-12-18 10:26:30
categories:
    - [算法]
    - [学习]
---

本文主要用以记录学习斯坦福大学Jure Leskovec教授的CS224W课程中所做的笔记，文字可能会随着学习过程持续改进。

## Lecture 1.1 Why Graphs

[Slides](https://web.stanford.edu/class/cs224w/slides/01-intro.pdf)

为什么要有图？图实际上是一种用于描述实体关系和交互方式的通用语言，主要是通过节点以及节点之间的关系来描述数据，如下图，诸如，事件、计算机网络甚至是计算机代码、3D的物体等多种数据都可以用图来表示，例如信息和知识可以被组织和链接，软件可以被表示为图，相似的节点可以被连接为相似网络，其他具象物体相关关系也可以进一步表示为一个图的形式：
![多种类型的图](https://raw.githubusercontent.com/Waynehfut/blog/img/img/20220630114941.png)
![网络与图](https://raw.githubusercontent.com/Waynehfut/blog/img/img/20220630162311.png)

既然这么多的实际事物都可以用图来表示，那么这门课程的主要目标就是以图为基准，利用图的关系结构和数据的关联关系，辅助模型来做出更好的性能表现。
![Why this class](https://raw.githubusercontent.com/Waynehfut/blog/img/img/20220630162949.png)

虽然现在的深度学习啥的都已经取得了很好的效果了，但是不论是声音还是图像，都会被处理为固定长度的数据，接着相关的神经网络等算法会进一步进行处理，得到比较惊艳的结果。但对于复杂的图结构而言，图的结构更加复杂，结构不确定，数据组成结构也更为多变，例如图像只有上下左右的相关关系，但是图的邻接关系则更为多变。
![复杂度对比](https://raw.githubusercontent.com/Waynehfut/blog/img/img/20220630163844.png)