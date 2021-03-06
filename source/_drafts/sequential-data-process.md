---
title: 时序影像信息处理：从稀疏表示到门控循环单元
tags: [机器学习, 神经网络]
categories: 算法
mathjax2: true
toc: true
---

图像数据的表现形式是复杂的。对于一个图像而言，这个图像可以是一维的，可以是高维的。对于高维图像，它可能在某个维度上存在关联，其关联方式可以是连续的，也可以是离散的，也可以是混合的。因此机器学习或深度学习等领域的进行图像处理时，诞生了一系列适用于时序信息处理的方法论。但是我对这个领域的内容的知识储备还不够立体，因此希望在此做这个记录以便于加强对这个方面的认识。本文的数据重点将放在图像数据处理中，方法上将重点讨论神经网络相关的时序信息处理，对于非神经网络方法将主要介绍隐式马尔科夫和稀疏字典。这篇 post 可能会随着我的认识而持续更新。

<!-- more -->

## 时序影像处理基本思路

处理时序影像数据的一般过程是将影像数据张量（Tensor）进行维度转换,到另一个目标维度的张量。这个转换在早期受制于算力，一般是人工设计方法来实现。近年来随着 GPU 算力的飞跃，诸如 Pytorch 和 TensorFlow 等框架提供的优秀 API 已经将这个过程的门槛降低了很多。在转换后的数据上在应用领域相关的处理方法或可视化表示，将可以得到不同的数据处理结果。对于时序数据而言，这一过程同样适用。只是转换过程需要额外考虑时序信息表示，以及时序信息如何影像数据处理。

## 字典学习 Dictionary Learning, DL

严格来说，字典学习并不是时序数据的专利，在 Stackexchange^[https://dsp.stackexchange.com/questions/47726/what-exactly-is-sparse-representation] 上和这篇博客^[https://www.cnblogs.com/endlesscoding/p/10090866.html]上都有一些不错的介绍，以下多数文字也来源于这些介绍。简言之，字典学习就是将数据通过字典约束，进行更稀疏的表示（Sparse Representation），之后在这个粗粒度数据上进行数据分类。打个比方，句子由汉字构成，而这篇博文所使用的词语基本上在现代汉语词典可以查到，但是这些文字所形成的信息应该是没有哪篇文章完全一样的，因此现代汉语词典就是一个很好的词典表示，阅读这篇博文时就可以以词的方式来认知文章了。推广到诸如时序信息，影像信息等也同样适用，图像像素可以类别汉字，而稀疏表示可以视作使用字典规范后的词语。因此一般也称之为稀疏字典学习。

稀疏字典学习的模型也相对容易理解，从下述的模型优化目标可见一斑：

$$
\min_{D,X}\|Y-DX\|_{2}^{2}+\lambda\sum_{i=1}^{N}\|x_i\|_1
$$

稀疏字典学习的目标就是尽可能的保证两项总和小，其中$x_i$代表的是稀疏表示，$X=\{x_1,x_2,...,x_n\}$，$D$则是一个字典用以稀疏表示$x_i$重构出稀疏表示下的数据。其中，尽可能降低第一项的值，意味着重构值与标签值想近。第二项表示的是非零值的个数，也就是字典的稀疏程度，字典越稀疏，数值越小，因此在这样的约束目标下，稀疏表示将尽可能重构出目标值且数据稀疏。

显然需要求解的由$D$和$x_i$两部分组成，一般的策略是先固定其中一个数值后对另一个数值进行优化，如此循环多次后得到一个较好的字典和稀疏表示。

假设$x_i$是已知的，那么字典$D$就需要被更新，首先字典的初始化是随机的，而后的更新过程才是重点，当然好的字典可以节省时间。算法使用的是 K-SVD，在计算$x_i$时，可以使用 OMP 方法找出字典$D$所对应的$X$值，在一次$X$求解后，每次更新$D$中的一列$d_k$,并固定$D$中的其他列，上式可以更新为：

$$
\|Y-DX\|_{2}^{2}=\|Y-\sum_{j=1}^{K}d_jx_T^j\|_F^2=\|(Y-\sum_{j\neq k}d_jx_T^j)-d_k x_T^k\|_2^2=\|E_k-d_k x_T^k\|_2^2
$$

因此只要$E_k$和$d_k x_T^k$足够接近那么目标即可达到，实际上就是$d_k$和$x_T^k$的最小二乘问题，这里可以使用SVD方式求解，注意需要将$E_k$中的0项全部剔除，以避免稀疏表示$x_i$不稀疏。因此目标变为$\|E^{'}_k-d_k x_T^{'k}\|_2^2$，对于$E^{'}_k$有：

$$
E^{'}_k=UEV^T
$$
则取左奇异矩阵$U$的第一个列向量作为$d_k$，取右奇异矩阵的第一行向量与第一个奇异值的乘积作为$x_T^{'k}$，并更新原有$x_T^k$，重复上述步骤将可以得到字典和稀疏表示。

同样的，对于时序数据而言同样可以产生一个字典来抽象这批数据，但是显而易见的，这样的方式会损失时序信息导致模型效果查，因此这样的方法已经难以单独作为解决方案来对处理时序数据了。

## 隐马尔科夫模型 Hidden Markov Model, HMM

说到隐马尔可夫模型，首先要说到的是马尔科夫链。它可能是我最早接触到适用于时序信息处理的方法，但是由于各种原因，我到现在还是一知半解。

马尔可夫链，又称离散时间马尔科夫链，是指状态空间从一个状态转移到另一个状态的过程。严格的马尔科夫链要求转移过程是“无记忆”的，即下一状态仅于当前状态有关。对于时序序列而言，马尔科夫链及其变体可以作为时序数据状态变化的抽象。下图中的$z$就是一个满足一阶马尔科夫链要求的示例。但是有时候数据并不一定是严格无记忆的，可能存在多个元素无记忆的过程，此时进一步的演化出来二阶甚至高阶的马尔科夫链，在此不再赘述。这样的要求对于大多数数据而言是严格的，因此学者引入了潜在变量来表示无法满足马尔科夫链要求的顺序数据，下图就是使用$z$来作为潜在变量，以映射不满足要求的时序观测变量$x$。新得到的潜在变量空间图称为状态空间模型。对于这样的数据情况，如果潜在变量$Z$是离散的（观测变量$X$无要求），那么这个模型就可以被称为隐马尔科夫模型。如果是连续的，那么将称之为线性动态系统。

![](https://raw.githubusercontent.com/Waynehfut/blog/img/img/20210130165327.png)

在时序数据处理领域，隐马尔科夫模型具有很广泛的应用。

## 循环神经网络 Recurrent neural network, RNN

## 长短期记忆单元 Long Short-Term Memory, LSTM

## 门控循环单元 Gated recurrent unit, GRU
