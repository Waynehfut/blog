---
title: 论文阅读之 Predicting Lymph Node Metastasis Using Histopathological Images Based on Multiple Instance Learning With Deep Graph Convolution
date: 2020-12-20 20:03:15
tags: [论文阅读, 神经网络]
categories: 论文
mathjax: true
toc: true
---

本文是 2020 年 CVPR 的 Oral 展示的论文，来自于腾讯的 AI 实验室，主要说的是医学影像中的分割问题，使用的方法是多实例学习（Multiple Instance Learning）来做病理学图片的分割。其中多实例学习对我而言是一个没有接触过的领域，它与一般的标签不一样的在于 MIL 所给出的是一系列被称之为词袋（Bag of Instances）的标签，而 MIL 的目标就是从词袋中找出相关的标签。文章使用了基于变分自动编码器和生成对抗网络的组合模型(VAE-GAN)构建了一个特征提取器，并使用了图卷积神经网络实现了结肠癌病理学切片的区域分割，性能有些许优势。文章的创新点主要在于使用了这些技术首次利用病理图片来预测淋巴结的转移。

<!-- more -->

## 相关概念

### 多任务学习

多示例学习并不是一个特别新的方法，在 2013 年前后曾经流行过一段时间，但是水花明显没有 GAN 或者 GNN 大。需要注意的一个概念是一个包(Bag)中可能包含多个示例(Instance)

### 图神经网络

这里仅做一个简述，具体的内容后期再更新详细的内容。

## 前言

弱监督学习目前在减少人工标注工作量方面广受关注，多示例学习(Multi-instace Learning, MIL)是一类典型的弱监督的应用，广泛应用于不同的任务中，包括目标检测、语义分割、场景分类、医学诊断等。多示例学习与传统学习不一样的是，它的标签是一系列的类别组成的标签，称之为包(bag)，而不是单一的分类结果，同时这个数据视作由多个示例（instance）组成，这些示例可能是与包层级的标签相关或者不相关。

基于判定信息所属层级以及如何提取相关信息，MIL 算法可以分为三个类别，包括示例空间范式、包范式和嵌入空间范式。其中示例空间范式着重关注局部信息，并分为两个阶段，先是设计示例分类器抽取合适的示例，接着是划分示例到具体的类别。示例空间算法大部分基于标准多示例假设，即当某个数据中存在一个示例属于某个包时，这个数据记为正类，否则记为负类。但是这样的方法在实际应用中有所限制。而基于包范式和嵌入空间范式则是从整个包层级提取出判定信息，只是包范式是隐式的提取包与包之间的距离，而嵌入空间范式则是将信息嵌入到特征空间中。

这篇文章就是基于嵌入空间的方式将多示例学习方法所提取到的特征从到了图神经网络中，来进行淋巴癌病理图片的疾病判定。主要包括：示例级特征提取、示例级特征选择和包级分类。由于病理图片一般尺寸较大(一个完整示例的病理图片像素有 100000x50000 之巨)。因此作者将这个全图切分成了多个尺寸为(512x512)的切片(Patch)来实现嵌入空间的多示例学习。为了解决数据拟合难的问题，作者设计了 VAE-GAN 的住模型来作为特征提取器，并使用图卷积神经网络来实现示例的有效嵌入表示，实验结果表现的较好。

## 模型结构

模型的处理流程如下图所示，分别是图像的切片（Patch）、基于示例层的特征获取和选择以及基于包层级的分类。在本文的问题中，基于包层级的分类即是有无淋巴结转移。

![处理流程](https://raw.githubusercontent.com/Waynehfut/blog/img/img/20210101100825.png)

### 图像预处理

在图像预处理阶段，肿瘤区域首先会有人为进行标定为感兴趣区域。之后 ROI 会分到多个非重叠的 512*512 的小切片中。

### VAE-GAN

![VAE-GAN](https://raw.githubusercontent.com/Waynehfut/blog/img/img/20210101100900.png)

紧接着每个切片都将进行 VAE-GAN 的处理，文中作者所使用的 VAE 部分与传统的 VAE 并没有特殊的部分，同样使用了高斯分布对编码器部分进行了正则化。

传统的 VAE 损失函数可以由如下公式进行表示：

$$
\begin{aligned}
\mathscr{L}_{V A E} &=\mathscr{L}_{L Like}^{\text {pixel}}+\mathscr{L}_{K L} \\
&=-E_{q(h \mid x)}[\log (p(x \mid h))]+D_{K L}(q(h \mid x) \| p(h))
\end{aligned}
$$

其中，$h$是输入$x$的模式表示，前半部分表示的是 VAE 中的逐像素损失，$D_{KL}$是指 KL 距离，关于 VAE 损失函数请参考此处。^[陈雄辉,变分自编码器 VAE (Variational Autoencoder),https://zhuanlan.zhihu.com/p/56773895]

而对于 GAN 来说，损失函数可以表示为：

$$
\mathscr{L}_{GAN}=\log(D(x))+\log(1-D(G(h)))
$$

因此对于如图 2 所示的 VAE-GAN 的模型来说，VAE 的解码器和 GAN 的编码器共享了相同的组件，因此可以使用 GAN 的判别器中所表示出的重构损失来表示原始 VAE 的逐像素重构损失（VAE 的第一部分）。具体而言，假设$Dis_{l}(x)$表示 GAN 判别器第$l_{th}$层的隐式表示，那么用于$Dis_{l}(x)$的均值为$Dis_{l}(\tilde{x})$的高斯观测模型模型可以表示为

$$
p\left(D i s_{l}(x) \| h\right)=N\left(D i s_{l}(x) \mid D i s_{l}(\tilde{x}), I\right)
$$

其中$\tilde{x}\thicksim Decoder(h)$表示解码器自数据输入$x$所得到的样本。则 GAN 的判别器的重构误差可以表示为：

$$
\mathscr{L}_{L_{like}}^{Dis_l}=- E_{q(h \mid x)}[\log p(Dis_{l}(x) \mid h)]
$$

使用$\mathscr{L}_{L_{like}}^{Dis_l}$来替换$\mathscr{L}_{L Like}^{\text {pixel}}$，即可得到 VAE-GAN 的损失：

$$
\mathscr{L}=\lambda_{Dis}*\mathscr{L}_{L_{like}}^{Dis_l}+\lambda_{KL}*\mathscr{L}_{K L}+\lambda_{GAN}*\mathscr{L}_{GAN}
$$

其中$\lambda_{Dis}$、$\lambda_{KL}$和$\lambda_{GAN}$均为 VAE-GAN 损失的超参数。但需要注意的是，该部分的内容并不是特别创新的点，早在 2015 年就有相关文章提出了相同概念^[Larsen, Anders Boesen Lindbo, et al. "Autoencoding beyond pixels using a learned similarity metric." International conference on machine learning. PMLR, 2016.]
文章不同的点在于，作者使用这个结构主要是用来训练用以进行示例级特征提取的编码器，文中使用的是基于 ResNet-18 的网络结构。

### 特征选取

特征选取在文中的流程可以参考下图所示。文章的特征选择的输入是一系列示例要素，而结果则与示例要素没有直接关系。为此文章通过重要性直方图和特征差异性来剔除冗余的特征标签，并简化学习任务难度。

![特征选取](https://raw.githubusercontent.com/Waynehfut/blog/img/img/20210101100937.png)

假设现有$N$个包级标签对$\{X_1,X_2,X_3,...，X_N\}$和$\{Y_1,Y_2,Y_3,...，Y_N\}$，其中第$i$包包含$K_i$个示例特征可表示为$\{x_1^i,x_2^i,...,x_K^i\}$，在文中，每个$x_j^i$的维度为$\mathbb{R}^D$，$x_j^i$表示自第$i$个包中选取的第$j^{th}$个示例特征，其对应标签为$Y_i\in\{0,1\}$。为了简化表示，$F$可以表示为$[f_1,f_2,...,f_D]$，而$x_j^i$可以视作$F$的特例。作者的目标就是提取出每个特征在不同包中的重要性$f_k=F[k]$。为此，文章首先为每个包中的每个特征都生成了长度为$N_b$的直方图向量，接着生成的直方图作为包级表示来计算正负标签的差值，进一步获取判别值以进行分类。

#### 直方图生成

对于每个特征向量$f_k$而言，作者计算了所有特征的极大值和极小值：

$$
\begin{aligned}
f_{k}^{\max } &=\max \left\{x_{j}^{i}[k]\right\},\left(i=1, \ldots, N, j=1, \ldots, K_{i}\right) \\
f_{k}^{\min } &=\min \left\{x_{j}^{i}[k]\right\},\left(i=1, \ldots, N, j=1, \ldots, K_{i}\right)
\end{aligned}
$$

接着将区间$[f_{k}^{\min },f_{k}^{\max }]$划分到长度为$N_b$的空间中，并将每个包$X_i$置于直方图$H_k^i=(h_1^{(i,k)},...,h_{N_b}^{(i,k)})$中，其中$h_o^i$表示具有特征$f_k$的示例$X_i$置于第$o^{th}$个直方图区域的百分比，其计算公式如下：

$$
h_{o}^{i, k}=\frac{1}{K_{i}} \sum_{x_{j}^{i} \in \mathbf{X}_{1}} f_{o}\left(x_{j}^{i}[k]\right)
$$

其中，$o=1,...,N_b$，$j=1,...,K_i$,当$x_j^i[k]$落在第$o^{th}$个区间时，$ f{o}\left(x{j}^{i}[k]\right)$为 1，否则为 0。

这个生成方式并没有太多特别的部分，主要是要分清$x_j^i$与$F$实际上是一个东西即可。

#### 特征验证
在获取到了特征$f_k$在所有包$\{H_k^1,...,H_k^N\}$的直方图后，作者使用了最大平均偏差（Maximum mean discrepancy，MMD）距离来衡量特征的重要性,

$$
D\left(f_{k}\right)=\left\|\frac{1}{\left|G_{P}\right|} \sum_{X_{i} \in G_{P}} \phi\left(H_{k}^{i}\right)-\frac{1}{\left|G_{N}\right|} \sum_{X_{j} \in G_{N}} \phi\left(H_{k}^{j}\right)\right\|
$$

其中$G_P$和$G_N$表示正包和负包，$\phi$表示映射函数，距离值越大表示判别器更容易区分正负的包集合。

### 基于图神经网络的多示例学习

#### 图的构建

#### 谱卷积

#### 网络结构
#### 

## 实验

### 数据示例

![数据示例](https://raw.githubusercontent.com/Waynehfut/blog/img/img/20210101101004.png)

### 实验结果

![实验结果](https://raw.githubusercontent.com/Waynehfut/blog/img/img/20210101101039.png)

## 后记

通篇读下来，感觉文章可圈可点，但是还是有很多我个人觉得有问题的地方，例如，部分论述没有严格的引文，部分文字等描述也有点模糊。这篇文章的所使用的多示例学习实际上也在医学影像分割领域有了很多应用，文章虽然强调了他的方法是集中在 MIL 中，但是技术路线与 2016 年 CVPR 的 Patch-based convolutional neural network for whole slide tissue image classification 相近，大部分 VAE-GAN 方法都是类似的方式进行实现的，主要还是集成了 GCN 做了一些工作。

{% pdf ./manu.pdf %}
