---
title: 论文阅读之 PANet Few-Shot Image Semantic Segmentation With Prototype Alignment
date: 2020-11-12 17:20:43
tags: [深度学习, 论文阅读]
categories: 论文
mathjax2: true
index_img: https://raw.githubusercontent.com/Waynehfut/blog/img/img/20201117150836.png
toc: true
---

本文是 2019 ICCV 的文章，由新加坡国立的电子与计算机工程系[学习与视觉实验室](https://www.ece.nus.edu.sg/lv/index.html)的 Wang, KaiXin 等人完成^[注意：在 CVPR2018 中，有同名模型的文章，做的是实例分割，请参阅[此处](https://github.com/ShuLiu1993/PANet)]。文章的目标是解决小样本数据中的图像分割问题，主要策略是使用 Prototype Alignment (原型分配)的方式将 Prototypical Network 中的距离度量思想用到了图像分割领域，实现流程上，文章使用了支持集和查询集互对齐的方式将支持集查找的原型分配交给查询集，查询集将依据此得到新的查询集原型，而这部分的原型应当可以用于支持集的分割，分割的结果将通过 PAR (原型分配正则化)的方式实现区域特征的对齐。其中，文中对于原型的训练使用了非参数度量的学习方式，将分割任务转换为逐像素的分类，最终实现了较好的实验效果。

<!-- more -->

## 相关背景

文章解决的是图像分割问题，在已有方案中，基于 FCN,SegNet,Deeplab 和 PSPNet 的语义分割网络已经得到了较好的应用，但是从越发复杂的网络结构中可以看出，这些网络所需的训练数据相对较多。虽然有半监督或弱监督的方法可以实现语义的分割，但是仍然需要较多的弱注释的数据来训练模型。此外，最核心的问题是，如果这些模型去分割尚未见过的模型，效果一般都不会太好。为此有了一众小样本学习的研究，目前主要还是集中在分类领域中，对于分割领域而言，相对较少。(关于小样本学习的内容，请参见[论文阅读之 Prototypical Network for Few-Shot Learning](https://blog.waynehfut.com/2020/11/02/prototypical_network_for_few_shot_learning/)

无论是度量的算法或是其他方法，现有的小样本学习通常策略是从少量的支持集中学习知识，之后传入到查询集中在进行其他任务。但是作者认为这样的方式存在知识发现和分割过程是混合在一起的问题，可能会将分割模型表示和语义特征混到一起导致特征提取问题。为此作者分了两步来实施工作，分别为原型提取和非参数度量学习。通俗的说，就是分两步来做分割，第一步是提取原型，即将图像像素嵌入到原型中，实际是一种编码过程；第二步是在原型特征图上做基于像素分类的图像分类。但是这样的方式其实在基于 RPN 的网络中是比较常见的思路，作者在这部分更多的是添加了小样本的背景来魔改前人的工作。文章的重点是后续所提的原型分配正则化，这部分内容是通过将两步有监督的分割结果正则化后反向对齐分割结果实现的。如下图所示，其中圆形的是支持集中的嵌入特征，三角形的为查询集的嵌入特征，第一步所做的工作是支持集到查询集的原型特征抽取，即将查询集的所有特征嵌入到特定原型中，从而形成了右侧第二步的查询集原型空间，新的原型空间可以作为逐像素分类的先验信息并在支持集上得出基于支持集的图像分割结果，这一结果可以与支持集的标签进行损失计算。简单来说就是支持集的原型可以在查询集预测到结果，这部分查询集及其预测结果可以作为新的支持集来分割支持集中的数据，并最终比较有标签标注的正则化数据，以获得正则化损失。需要注意的是，这个正则化过程是在训练过程中做的，查询集和 PAR 损失计算的图像是无关的。

![PANet示意图](https://raw.githubusercontent.com/Waynehfut/blog/img/img/20201117150836.png)

作者认为模型基于这样的方式避免了引入新参数的问题，避免了过拟合问题，同时避免了额外网络的辅助，基于正则化的对齐方式也降低了计算量。作者还在实验中尝试了非精确的涂鸦标记，同样得到了较好的效果。

## 实现细节

大体上，文章的数据分治思路与原有小样本学习没有太大区别，数据定义中需要注意，因为涉及到语义分割，因而其类别是依据语义类别来划分的。此外还需重点关注训练策略。

### 符号定义

- $\mathcal{C}_{seen}$ 和 $\mathcal{C}_{unseen}$ 是两个互不重合的图像集合，分别从中可得到 $\mathcal{D}_{train}$ 和 $\mathcal{D}_{test}$；
- $\mathcal{D}_{train}$ 和 $\mathcal{D}_{test}$ 表示训练集和测试集，同时在每次 Few-shot 的训练 (episode) 中，都会从这两个集合抽取部分不重复的数据，称之为 $\mathcal{S}$ 和 $\mathcal{Q}$，通常称为支持集和查询集。则训练集和测试集可以表示为 $\mathcal{D}_{train} = \{(\mathcal{S}_i,\mathcal{Q}_i)\}_{i=1}^{N_{train}}$ 和 $\mathcal{D}_{test} = \{(\mathcal{S}_i,\mathcal{Q}_i)\}_{i=1}^{N_{test}}$，其中 $N_{train}$ 和 $N_{test}$ 分别表示训练集和测试集的总数量，这里可以类比前述 Few-shot 学习中对于 Training Task 和 Test Task 的定义；
- 每次训练（episode）中的 $(\mathcal{S}_i,\mathcal{Q}_i)$ 实例中会 $K$ 个样本 $<image,mask>$ 其中这些样本下每个都有包含 $C$ 个语义类别，也被称为 `C-Way-K-shot`，例如对于$\mathcal{S}_i=\{(I_{c,k},M_{c,k})\}$而言，其中 $k=1,2,...,k$，并且$c\in\mathcal{C}_i$, $|\mathcal{C}_i|=C$。而查询集$\mathcal{Q}_i$包含$N_{query} <image, mask>$个图像对，且总共的类别与支持集$\mathcal{S}_i$相同.
- 所训练的模型$\mathcal{M}$就是在每次训练（episode）从支持集中找特征并应有到查询集中。

### 模型概览

![模型流程](https://raw.githubusercontent.com/Waynehfut/blog/img/img/20201121221328.png)

首先模型将使用共享权值的 VGG-16 作为 backbone 来提取特征，之后使用 average pooling 从支持集中获取原型集，之后（a）步骤用这些原型集在查询集上计算每个像素到原型的距离，取最近距离来划分区域原型，得到查询集分割结果并进一步得到查询集原型,（b）步骤中这个原型再返回支持集获得支持集分割结果，同时作者还设计了一个原型对齐正则化 PAR 来约束（a) 和（b）两个步骤学习到的嵌入方式一致。

听上去很玄乎，但是其实仔细看来就是两轮结果与原始 Ground Truth 对齐的过程，只是这个过程作者用一个比较玄乎的 PAR 来描述而已。

### 原型获取

模型的目标是在每个语义类上学习细分的原型表示，简单来说就是把每个语义分割的目标嵌入到原型中，作者同时考虑了背景类，这个方法参考了[原型网络](https://blog.waynehfut.com/2020/11/02/prototypical_network_for_few_shot_learning/)，稍有不同的是，这篇文章使用的是掩膜来在整张图上分别学习前景和后景，采用了后融合的策略在输入的图像特征图上进行掩膜上分别进行前景和背景的提取。具体而言，对于支持集 $\mathcal{S}_i=\{(I_{c,k},M_{c,k})\}$，假设 $F_{c,k}$ 是图像 $I_{c,k}$ 所提取的特征图，其中 $c$表示的是语义类别，而 $k = 1,..., K$表示的是第 $k$ 个支持图，则内部 $c$ 的原型可以通过基于掩膜的平均池化计算，如下：

$$
p_c=\frac{1}{K}\sum_{k}\frac{\sum_{x,y}F_{c,k}^{(x,y)}\mathbb{1}[M_{c,k}^{(x,y)}=c]}{\sum_{x,y}\mathbb{1}[M_{c,k}^{(x,y)}=c]}
$$

其中 $(x,y)$ 表示时空位置，而 $\mathbb{1}(\centerdot)$ 是一个指示函数，参数为真时输出 1，否则输出 0。实际看来就是逐像素查找掩膜是不是属于某个类，并将这个类所对应的特征图像素数取出，即：$\sum_{x,y}F_{c,k}^{(x,y)}\mathbb{1}[M_{c,k}^{(x,y)}=c]$，再除以该类的掩膜像素数量，实际上得到的是一个概率，之后再计算整个支持集的图片的类别总和。^[Q: 这里有点疑问就是这个加起来的概率有什么意义？ A:这里在阅读源码之后发现公式是有歧义的，因为特征图是有 c 个通道的，所以是对每个通道都计算了一遍特征，然后再对每个特征图的通道计算原型，因此每个类所对应的原型向量的长度应该是对应的特征图的通道数量]

相对应的背景可以计算如下：

$$
p_{bg}=\frac{1}{CK}\sum_{c,k}\frac{\sum_{x,y}F_{c,k}^{(x,y)}\mathbb{1}[M_{c,k}^{(x,y)}\notin {\mathcal{C}_i}]}{\sum_{x,y}\mathbb{1}[M_{c,k}^{(x,y)}\notin \mathcal{C}_i]}
$$

### 非参数度量学习

对于上述原型向量，其值是需要不断优化的，为此作者设计了一个非参数度量的函数来调优，并进一步实施分割。通过计算每个得出的特征向量（以特征通道方向来看）和原型向量的距离，来评估对应 $(x,y)$ 的特征图上的特征向量与该原型的距离，如下图理解：

![原型向量的距离度量](https://raw.githubusercontent.com/Waynehfut/blog/img/img/20201124224106.png)

在左侧的特征图中，每个(W,H)所对应的(x,y)在 c 方向上的向量都将与原型向量组进行距离计算，简单起见作者是用$cos$函数来计算距离的,作者讨论了前人的工作，发现使用带参数$\alpha$的$\cos$函数的效果是类似欧式距离的，因此替代了原有欧式距离计算，降低了计算复杂度^[作者声称在预试验后，这个$\alpha$设置为 20 时效果最好]。之后计算每个 c 方向上的特征图向量属于某个原型的概率得到概率图$\tilde{M}_q$，其中背景被是做同一个类。具体形式化表示而言，假设有分配向量组表示为 $\mathcal{P}=\{p_c|c\in \mathcal{C}_i\}\bigcup\{p_{bg}\}$和特征图$F_q$，对于其中一个原型$p_j\in\mathcal{P}$而言，原型概率图计算如下:

$$
\tilde{M}_{q;j}^{(x,y)}=\frac{\exp(-\alpha d(F_{q}^{(x,y)},p_j))}{\sum_{p_j \in \mathcal{p}}\exp(-\alpha d(F_{q}^{(x,y)},p_j))}
$$

其实简单来看，这个就是一个 Softmax 函数，计算概念而以，计算完之后，即可得到一个大小为(W,H)的概率图。而需要的对应的$j$类别的分割掩膜即为概率图中概率最大的部分所对应的(x,y):

$$
\hat{M}_{q}^{(x,y)}=\argmax_{j}\tilde{M}_{q;j}^{(x,y)}
$$

基于上述的计算分割的那么整个图的损失可以被计算为：

$$
\mathcal{L}_{seg}=-\frac{1}{N}\sum_{x,y}\sum_{p_j\in \mathcal{P}}\mathbb{1}[M_{q}^{(x,y)}=j]\log\tilde{M}_{q;j}^{(x,y)}
$$

其中$M_q$是标签 Ground Truth， $N$则是查询集图片的所有空间位置（即逐像素）

### 原型分配正则化

这部分看上去题目很玄乎，实际上就是把查询集和在支持集原型上得到的分割结果视作新的支持集，并在原有的支持集上进行原型发现和分割，并把分割结果与原有的支持集 Ground Truth 标签进行损失计算得到原型分配正则化，至于为什么起这个名字，可能是作者用了 Softmax 来计算吧。

在模型概览中的（b）步骤已经有了这部分的描述，假设我们从查询集中以相同的方式获得了新的原型$\mathcal{\overline{P}}=\{\overline{p}_c|c\in \mathcal{C}_i\}\bigcup\{\overline{p}_{bg}\}$，接着用相似的非参数学习来获得概率图和分割结果，这部分的分割结果与真实的支持集标签之间的损失被称之为: $\mathcal{L}_{PAR}$,具体来说：对于支持集中的一个图片$I_{c,k}$来说，原型概率图计算如下：

$$
\tilde{M}_{c,k;j}^{(x,y)}=\frac{\exp(-\alpha d(F_{c,k}^{(x,y)},\overline{p}_j))}{\sum_{\overline{p}_j \in \{\mathcal{\overline{p}_c},\overline{p}_{bg}\}}\exp(-\alpha d(F_{c,k}^{(x,y)},\overline{p}_j))}
$$

对应的分割损失$\mathcal{L}_{PAR}$可计算为：^[这部分原文公式有误，最后的 M 项下标应该是 c,k]

$$
\mathcal{L}_{PAR}=-\frac{1}{CKN}\sum_{c,k,x,y}\sum_{p_j\in \mathcal{P}}\mathbb{1}[M_{c,k}^{(x,y)}=j]\log\tilde{M}_{c,k;j}^{(x,y)}
$$

最终，两部分的损失共同组成了模型的训练目标,作者设置了一个$\lambda$来调整两部分的影响，但是实际实验发现两部分同样重要，因此该值为 1：

$$
\mathcal{L}=\mathcal{L}_{seg}+\lambda \mathcal{L}_{PAR}
$$

具体的训练逻辑如下：

![训练逻辑](https://raw.githubusercontent.com/Waynehfut/blog/img/img/20201124231625.png)

### 弱标签的生成

作者声称使用一些弱标签，如涂鸦等标注，同样可以得到较好的效果。

## 实验细节与效果

[代码](https://github.com/kaixin96/PANet)

### 2 Way 2 Shot

![2-way-2-shot](https://raw.githubusercontent.com/Waynehfut/blog/img/img/20201124231903.png)

### 弱标签效果

![Weak annotation](https://raw.githubusercontent.com/Waynehfut/blog/img/img/20201124231935.png)
