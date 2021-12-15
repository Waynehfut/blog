---
title: 初步理解TCN与WaveNet
toc: true
date: 2021-10-26 09:24:03
tags: [深度学习, 论文阅读]
categories: 论文
mathjax2: true
---

TCN 和 WaveNet 在时序数据处理中具有一定的优势，在过去的阅读中也偶尔可以看到这类技术的应用，但对于技术细节了解程度还是不够。谨以此文，以做记录。

<!-- more -->

## WaveNet

在理解 TCN 之前，得先了解一下 Wavenet^[Oord, A. van den, Dieleman, S., Zen, H., Simonyan, K., Vinyals, O., Graves, A., Kalchbrenner, N., Senior, A., & Kavukcuoglu, K. (2016). WaveNet: A Generative Model for Raw Audio. ArXiv:1609.03499 [Cs]. http://arxiv.org/abs/1609.03499
], WaveNet 是 DeepMind 于 2016 年提出的一个用于语言合成的模型，可以基于某一部分的语言数据合成下一阶段的语音信息，它在利用某个时段时序数据进行未来时段数据预测这一任务中具有较好的性能。例如 TKDD 的曾经看到的一篇稿子使用 WaveNet 进行家庭用电预测^[Jie Jiang, Qiuqiang Kong, Mark D. Plumbley, Nigel Gilbert, Mark Hoogendoorn, and Diederik M. Roijers. 2021. Deep Learning-Based Energy Disaggregation and On/Off Detection of Household Appliances. ACM Trans. Knowl. Discov. Data 15, 3, Article 50 (June 2021), 21 pages. DOI:https://doi.org/10.1145/3441300]。由于 WaveNet 在设计时是面向一维数据的，因此在处理图像等高维度数据时，需要在数据输入 WaveNet 之前额外添加 CNN 等特征提取器，以转换为一维时序数据。在有这样一个基本认识后，我们可以对 WaveNet 的基本原理进行进一步的解释。

### 基本结构

我们可以通过下图（图源：[Deep Mind 官方博客](https://deepmind.com/blog/article/wavenet-generative-model-raw-audio)）来对 WaveNet 需要处理的任务有一个直观的了解，可以看到的是，对于一个时序的输入而言，通过多层的隐含层，可以逐步将现有的数据进行特征的提取，并且在最后进行输出的预测，直观来说就是上一阶段的数据导致了下一阶段的结果。这样的过程被称之为因果卷积。
![WaveNet的处理流程(by Deepmind)](https://lh3.googleusercontent.com/Zy5xK_i2F8sNH5tFtRa0SjbLp_CU7QwzS2iB5nf2ijIf_OYm-Q5D0SgoW9SmfbDF97tNEF7CmxaL-o6oLC8sGIrJ5HxWNk79dL1r7Rc=w1440-rw-v1)

### 膨胀因果卷积（DILATED CAUSAL CONVOLUTIONS）

但是要注意的是，这样的设计方案还需要考虑数据本身的维度问题，例如音视频数据本身的码率较高时，对应的输入会呈现出较高的增长。因此，WaveNet 的第一个需要解决便是使用特殊的隐含层提取方法，来降低后续对数据特征处理的算力需求，一个简单的办法就是在因果卷积的过程中降低特征采样的密度，避免卷积的全连接，通过设置膨胀参数来控制采样的步长，称之为膨胀因果卷积（也有译作空洞因果卷积，个人认为膨胀卷积更直观）。

![膨胀卷积](https://raw.githubusercontent.com/Waynehfut/blog/img/img20211215170253.png)

膨胀因果卷积，包含两个部分，一是之前提及的因果卷积；其次是膨胀卷积，这种卷积方法最早是出现在语义分割的场景中^[Yu, F., & Koltun, V. (2015). Multi-scale context aggregation by dilated convolutions. ArXiv Preprint ArXiv:1511.07122.]，如下图所示，便是原始的膨胀卷积的示意，

![膨胀卷积在图像处理中的示意，图a的膨胀值为0，实际上等效与普通卷积，图b的膨胀值为2，其感知野变为7 $\times$ 7，图c的膨胀值为4，感知野变为15 $\times$ 15](https://raw.githubusercontent.com/Waynehfut/blog/img/img20211215171533.png)

## TCN

实际上，现在通行的 TCN 结构是受到 WaveNet 启发的，

### 基本结构
