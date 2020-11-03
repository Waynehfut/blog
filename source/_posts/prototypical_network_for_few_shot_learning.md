---
title: 论文阅读之 Prototypical Network for Few-shot Learning
date: 2020-11-03T09:08:49+08:00
tags: [深度学习, 论文阅读]
categories: 论文
mathjax2: true
toc: true
---

基于 Few-shot learning 和 Meta-learning 的方法在现实场景中有着较广泛的应用，特别是在对医学等数据标注成本较高的场景中，基于 Few-shot 甚至是 Zero-shot 的方法具有一定的优势。这篇文章来自于 2017 年的 NeurIPS，由加拿大多伦多大学 Vector Institute 的 Jake Snell 完成。这个方法简单且有效，在该领域有一定的影响力。此文基于这篇文章作了一些自己的理解，并简要介绍了部分小样本学习和元学习的内容。

<!-- more -->

## 小样本学习与 Meta Learning 的理解

在开始论文之前，先了解一些这方面的一些术语。

首先小样本的问题在各个领域都常见，它是 Meta Learning（元学习） 的一个特例，多数情况下所讨论的元学习就是小样本或零样本学习。主流的观点认为元学习是一个模型已经从一个大型数据集学习许多信息后，可以依据新的少量的标记样本得到新的分类器，该分类器可以在新的数据集中识别出该类样本，形式化的来说就是元学习是我们希望训练得到一个模型 $F$，这个模型可以生成另一个模型 $f$ ，而这个 $f$ 可以识别分类出新出现的类别 $c$ 所对应的样本 $x$ 。其中涉及到几个概念，首先是给定的新样本被称之为 Support set ，它表示每次训练的样本集合,而相应的测试集合被称之为 Query set。在实际的学习中可能会有多组新的样本可供选择，因此针对不同的任务组合，会有不同的 Task, 为此会有一组任务来训练验证 $F$，其中，用来训练 $F$ 的 Task 被称之为 Training task,而验证$F$有效性的被称为 Testing task，模型 $F$ 的好坏则由 $F$ 生成的 $f$ 在每个 Training task 的 Test set 上进行测试并计算损失，从而进行后续优化。这里的新的概念很多，我用一个简单的图来表示数据关系：

![元学习中的数据划分](https://i.loli.net/2020/11/03/MRYTuZhmyH7b9ix.png)

其中绿色块所代表的数据是 Support set,是每个任务训练时需要使用的，而蓝色块是 Query set，是每个任务验证时所使用的，Task 1 和 2 即为 Training task, Task 3 则是 Test task。

在上述的示意图中，我们可以看到有 3 个新的任务，每个新的任务只有 3 个训练数据，因此被称之为 3-way-3-shot。更形式化的表示则是元学习可以基于新给出的 N 个新类(Way) M 个实例（shot）中学到一个模型 $F$ ，这个 $F$ 将输出一个 $f$ 模型，从而分类出这些新的类别数据。一般这样的任务被称为 N-Way-M-Shot, 如下图所示是一个 3-way-1-shot 的示意图。一种元学习的优化策略就是从大量的数据中学到一个 $F$（NN 或其他模型）能够提取出 Support set 的有效特征，并可以通过相似度计算等方法计算出测试的图片所属种类。如果在这个 NN 能够识别出对应的分类，那么这个 $F$ 就是一个比较优秀的 $F$ 。需要注意的是，这里的 $F$ 不一定要达到训练最优，而是让他尽可能的发现一个合适的 $f$ ，用以分类图片。

![3-Way 1-Shot示意图](https://i.loli.net/2020/11/03/I6YEe3lVbNGzu2i.png)

但是问题在于，如果是采用 Fine-tune 或是 re-train 的方式，少量的新类别数据基本不可能得到好的分类性能，大部分情况都会导致过拟合。目前小样本学习的主流思路是将数据视作一个空间内的高维数据表示，在这个假设下，每个数据将可以被编码（embedding）到一个向量中。此外，如果将寻找$F$的任务视作找一个合理的编码规则，那么同一类的数据将被编码到该高维空间的相近距离中，不同类的数据将尽可能的远离。基于这一思想，Matching Network 和 Prototypical Network 等方法相继被提出。但是本质上还是在距离计算上做工作，这部分的方法也被称为**基于度量的方法**。需要注意的是这部分的方法有个前提假设，即同类的相似而异类的不相似。如果不使用这个假设，那么可以考虑**基于模型的方法**，这类方法的思路是使用模型来生成这个假设，主流方法有 MANN(Memory-Augmented Neural Network)和 Meta Networks，这部分的内容比较复杂，后续会再更新这部分内容。上述的方法多数还是在模型构建之前做工作，但是训练过程中，基于梯度的优化方法可能不适用与小样本的数据，为此，部分研究对优化内容进行了修改，提出了**基于优化的方法**。如 MAML 和 Reptile 等，这类方法我的理解是针对参数优化设计了一些替代方法，如基于多任务的 MAML 和基于多轮优化内循环的 Reptile。这部分内容较多，还需要进一步阅读。这篇主要还是讨论基于度量的方法。

## 原型网络的立意及形式化表示

基于度量的方法可以从 K 阶近邻的算法中参考从而加深理解。类比 k 阶近邻算法，可以将 Support Set 中的数据视作$K$个类别数据的特征组合，基于度量的方法就是将这些特征组合编码起来，并计算数据样本之间的相似性。原型网络基于这一思想，认为 Support set 中同类的数据具有相同的原型表示，不同类型的原型表示之间应该具有较大的差别。基于这个思想，对于一个给定的具有 $N$ 个图片的小规模 Support set 数据 $S=\{\left(x_1,y_1\right),...,\left(x_N,y_N\right)\}$，其中 $x_i\in\mathbb{R}^{D\times H\times W}$，表示输入的图具有 $D$ 个维度，高宽分别为 $H$ 和 $W$。$y_i$ 表示对应的标签，它可以是一个 class 的标签，也可以是其他任务，如图片分割，目标检测等任务的标签。对于一个类别$k$而言，所有属于$k$的值记作 $S_k$.

原型网络的目标就是计算出一个维度为 $M$ 的特征表示 $c_k\in\mathbb{R}^{M}$，称之为原型，而这个原型将由一个编码函数来实现，文中记作$f_{\phi}: \mathbb{R}^{D\times H \times W} \to \mathbb{R}^{M}$，其中$\phi$是一个可学习的参数。对于每个 Support set 的中的第$i$数据都将计算出一个$c_k^i$,而类别$k$原型则需要考虑该类别下所有数据的表示，文中使用了向量均值来计算得出：

$$
c_k=\frac{1}{|S_k|}\sum_{\left(x_i,y_i\right)\in S_k}f_{\phi}\left(x_i\right)
$$

而相应的距离公式可表示为:$d:\mathbb{R}\times\mathbb{R}\to[0,+\infty)$，而对于一个特定数据$x_i$从属于当前这个类别$k$的概率可以由以下公式计算：

$$
p_{\phi}\left(y=k|X\right)=\frac{\exp(-d(f_{\phi}(x),c_k))}{\sum_{k'}\exp\left(-d(f_\phi\left(x\right),c_{k'})\right)}
$$

训练的目标则是使用 SGD 最小化类别$k$对应的$p_{\phi}$负对数概率的值来计算作为优化目标，即：$J\left(\phi\right)=-\log p_{\phi}\left(y=k|x\right)$，而对于训练 training task 的数据则是随机从训练集中选取得到，并进一步的分为 support set 和 query set. 计算$J\left(\phi\right)$的算法伪代码如下：

![伪代码](https://i.loli.net/2020/11/03/drpsXJFnq4RGevT.png)

对于一个有$K$个类的训练集来说，$N_C$表示每轮 episode 所提取的数据包含的子类量。$N_S$是每个类中的 Support set 数据的数量。$N_Q$是每个类中的 Query set 数据的数量。$RANDOMSAMPLE(S,N)$表示从集合$S$中取得$N$个不重复的元素

算法的输入是一批训练数据$\mathcal{D}=\{(x_1,y_1),...,(x_N,y_N)\}$,其中每个$y_i\in\{1,...,K\}$。作者使用$\mathcal{D}_k$表示数据集$\mathcal{D}$中所有$y_i=k$的集合$\left(X_i,y_i\right)$。算法执行时，对于每个类别而言首先会为当前迭代（episode）从$\{1,...,K\}$选择$N_C$个类。接着在选定的$N_C$个类别中，分别遍历每个类别。对于特定的类别$k$，支持集$S_k$是从当前 episode 的数据集中所有类别为$k$的数据中选取$N_S$个数据，接着在当前 eposide 剩余的数据（$D_{V_k}\backslash S_k$）中选取$N_Q$个数据作为 Query set。接着计算当前支持集所对应的原型公式如下^[需要注意此部分的计算依据前述的定义的分母应当为$N_S$]：

$$
\mathbb{c}_k\leftarrow \frac{1}{N_S}\sum_{(x_i,y_i)\in S_k}f_{\phi}(x_i)
$$

接着这个 episode 的损失是对于每个类别$k$，该类所有位于$Q_k$中的数据有下述公式可以计算损失：

$$
J \leftarrow J + \frac{1}{N_C N_Q}[d(f_{\phi}(x),\mathbb{c}_k)+\log\sum_{k'}\exp(-d(f_{\phi(x)},c_{k'}))]
$$

这部分的公式推导如下：假设对于第$k$类的第$i$个样本，有损失函数更新值：$J_i^k$，则对应的更新值为：

$$
J_i^k=d(f_{\phi(x_i)},c_k)+\log\sum_{i=1}^{N_q}\exp(-d(f_{\phi}(x_i),c_i))
$$

则对于所有的$N_C$个类而言，就有每个都会有$N_Q$个 Query set 样本。因此会共有$N_C\times N_Q$个部分损失，因此所有的 Query set 样本的损失是除以$N_CN_Q$的均值。

至此方法论部分已经完全说明，后续主要更新一下理论分析部分。

## 原型网络混合密度估计

对于一个原型网络而言如果使用一个特定的距离函数，比如说[regular Bergman divergences](https://www.zhihu.com/question/22426561/answer/209945856)，那么原型网络的算法等价于在具有指数族分布的支持集上实施了混合密度估计。

## 原型网络的线性原理

## 与匹配网络的对比

## 实验设计的策略影响

## Omniglot Few-shot 实验

## miniImageNet Few-shot 实验

## CUB Zero-shot 实验

## 参考

在写作这篇文字时，参考了以下博文和主页，谢谢！

- Lilian Weng. Meta-Learning: Learning to Learn Fast. [https://lilianweng.github.io/lil-log/2018/11/30/meta-learning.html](https://lilianweng.github.io/lil-log/2018/11/30/meta-learning.html). 2018-11-30
- ZMonster's Blog. 论文笔记：Few-Shot Learning.[https://www.zmonster.me/2019/12/08/few-shot-learning.html](https://www.zmonster.me/2019/12/08/few-shot-learning.html),2019-12-08
- sirlis. 元学习文章阅读（Prototypical Network）[http://sirlis.cn/MetaLearning-ProtoNet/](http://sirlis.cn/MetaLearning-ProtoNet/)
- 如何理解 Bregman divergence？ - 覃含章的回答 - [https://www.zhihu.com/question/22426561/answer/209945856 知乎](https://www.zhihu.com/question/22426561/answer/209945856)
- Cyprien NIELLY. Few-shot Learning with Prototypical Networks. [https://towardsdatascience.com/few-shot-learning-with-prototypical-networks-87949de03ccd](https://towardsdatascience.com/few-shot-learning-with-prototypical-networks-87949de03ccd), 2020-06-25
- Daisukelab. Prototypical Networks as a Fine Grained Classifier.[https://www.kaggle.com/c/humpback-whale-identification/discussion/81085](https://www.kaggle.com/c/humpback-whale-identification/discussion/81085),2018
- 羽\_羊， 小样本学习（few-shot learning）之——原形网络（Prototypical Networks）. [https://blog.csdn.net/m0_38031488/aricle/details/85274890](https://blog.csdn.net/m0_38031488/aricle/details/85274890). 2018-12-27
- Poppy.《Prototypical Networks for Few-shot Learning》阅读笔记.[https://zhuanlan.zhihu.com/p/54340045](https://zhuanlan.zhihu.com/p/54340045).2019-01-08
- MSnoopy'. 小样本学习之原型网络. [https://blog.csdn.net/Snoopy_S/article/details/88420013](https://blog.csdn.net/Snoopy_S/article/details/88420013). 2019-03-12
