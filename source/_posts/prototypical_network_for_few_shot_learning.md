---
title: 论文阅读之 Prototypical Network for Few-shot Learning
date: 2020-11-03T09:08:49+08:00
tags: [深度学习, 论文阅读]
categories: 论文
mathjax2: true
toc: true
---

基于 Few-shot learning 和 Meta-learning 的方法在现实场景中有着较广泛的应用，特别是在对医学等数据标注成本较高的场景中，基于 Few-shot 甚至是 Zero-shot 的方法具有一定的优势。这篇文章来自于 2017 年的 NeurIPS，由加拿大多伦多大学 Vector Institute 的 Jake Snell 完成。这个方法简单且有效，在该领域有一定的影响力。此文基于这篇文章作了一些自己的理解，并总结了部分小样本学习和元学习的内容。

<!-- more -->

## 小样本学习与 Meta Learning 的理解

小样本学习的问题在各个领域都是非常常见的，主流的观点认为小样本学习是一个模型已经从一个大型数据集学习道路许多信息后，可以从新给出的几个少量新类实例（Few-shot）中学习到有用的知识，并调整训练器的权重适应并分类出这些新的类别数据。一般这样的任务被称为 N-Way-M-Shot, 如下图所示是一个5-way 1-shot的示意图：

![](https://i.loli.net/2020/11/03/DNHR1AfXezjaBt3.png)

但是问题在于，如果是采用 Fine-tune 或是 re-train 的方式，少量的新类别数据基本不可能得到好的分类性能，大部分情况都会导致过拟合。目前小样本学习的主流思路是将数据视作一个空间内的高维数据表示，在这个假设下，每个数据将可以被编码（embedding）到一个向量中。此外，如果可以找到一个合理的编码规则，那么同一类的数据将被编码到该高维空间的相近距离中，不同类的数据将尽可能的远离。基于这一思想，Matching Network 和 Prototypical Network 等方法相继被提出。但是本质上还是在距离计算上做工作，这部分的方法也被称为**基于度量的方法**。需要注意的是这部分的方法有个前提假设，即同类的相似而异类的不相似。如果不使用这个假设，那么可以考虑**基于模型的方法**，这类方法的思路是使用模型来生成这个假设，主流方法有 MANN(Memory-Augmented Neural Network)和 Meta Networks，这部分的内容比较复杂，后续会再更新这部分内容。上述的方法多数还是在模型构建之前做工作，但是训练过程中，基于梯度的优化方法可能不适用与小样本的数据，为此，部分研究对优化内容进行了修改，提出了**基于优化的方法**。如 MAML 和 Reptile 等，这类方法我的理解是针对参数优化设计了一些替代方法，如基于多任务的 MAML 和基于多轮优化内循环的 Reptile。这部分内容较多，还需要进一步阅读。这篇主要还是讨论基于度量的方法。

## 原型网络的定义

## 原型网络混合密度估计

## 原型网络的线性原理

## 与匹配网络的对比

## 实验设计的策略影响

## Omniglot Few-shot 实验

## miniImageNet Few-shot 实验

## CUB Zero-shot 实验

## 参考

在理解原文时，参考了以下博文和主页，谢谢！

- Lilian Weng. Meta-Learning: Learning to Learn Fast. [https://lilianweng.github.io/lil-log/2018/11/30/meta-learning.html](https://lilianweng.github.io/lil-log/2018/11/30/meta-learning.html). 2018-11-30
- ZMonster's Blog. 论文笔记：Few-Shot Learning.[https://www.zmonster.me/2019/12/08/few-shot-learning.html](https://www.zmonster.me/2019/12/08/few-shot-learning.html),2019-12-08
- Cyprien NIELLY, Few-shot Learning with Prototypical Networks. [https://towardsdatascience.com/few-shot-learning-with-prototypical-networks-87949de03ccd](https://towardsdatascience.com/few-shot-learning-with-prototypical-networks-87949de03ccd), 2020-06-25
- Daisukelab.Prototypical Networks as a Fine Grained Classifier.[https://www.kaggle.com/c/humpback-whale-identification/discussion/81085](https://www.kaggle.com/c/humpback-whale-identification/discussion/81085),2018
- 羽\_羊， 小样本学习（few-shot learning）之——原形网络（Prototypical Networks）. [https://blog.csdn.net/m0_38031488/aricle/details/85274890](https://blog.csdn.net/m0_38031488/aricle/details/85274890). 2018-12-27
- Poppy,《Prototypical Networks for Few-shot Learning》阅读笔记.[https://zhuanlan.zhihu.com/p/54340045](https://zhuanlan.zhihu.com/p/54340045).2019-01-08
- MSnoopy',小样本学习之原型网络. [https://blog.csdn.net/Snoopy_S/article/details/88420013](https://blog.csdn.net/Snoopy_S/article/details/88420013). 2019-03-12
