---
title: 初步理解TCN与WaveNet
toc: true
date: 2021-12-16 09:24:03
tags: [深度学习, 论文阅读]
categories: 论文
mathjax2: true
---

时序卷积网络（Temporal Convolutional Networks，TCN） 和 WaveNet 在时序数据处理中具有一定的优势，在过去的阅读中也偶尔可以看到这类技术的应用，但对于技术细节了解程度还是不够。谨以此文，以做记录。

<!-- more -->

## WaveNet

在理解 TCN 之前，得先了解一下 Wavenet^[Oord, A. van den, Dieleman, S., Zen, H., Simonyan, K., Vinyals, O., Graves, A., Kalchbrenner, N., Senior, A., & Kavukcuoglu, K. (2016). WaveNet: A Generative Model for Raw Audio. ArXiv:1609.03499 [Cs]. <http://arxiv.org/abs/1609.03499>
], WaveNet 是 DeepMind 于 2016 年提出的一个用于语言合成的模型，可以基于某一部分的语言数据合成下一阶段的语音信息，它在利用某个时段时序数据进行未来时段数据预测这一任务中具有较好的性能。例如 TKDD 的曾经看到的一篇稿子使用 WaveNet 进行家庭用电预测^[Jiang, J., Kong, Q., Plumbley, M. D., Gilbert, N., Hoogendoorn, M., & Roijers, D. M. (2021). Deep Learning-Based Energy Disaggregation and On/Off Detection of Household Appliances. ACM Transactions on Knowledge Discovery from Data, 15(3), 50:1-50:21. <https://doi.org/10.1145/3441300>]。由于 WaveNet 在设计时是面向一维数据的，因此在处理图像等高维度数据时，需要在数据输入 WaveNet 之前额外添加 CNN 等特征提取器，以转换为一维时序数据。在有这样一个基本认识后，我们可以对 WaveNet 的基本原理进行进一步的解释。

### 因果卷积（CAUSAL CONVOLUTIONS）

我们可以通过下图（图源：[Deep Mind 官方博客](https://deepmind.com/blog/article/wavenet-generative-model-raw-audio)）来对 WaveNet 需要处理的任务有一个直观的了解，可以看到的是，对于一个时序的输入而言，通过多层的隐含层，可以逐步将现有的数据进行特征的提取，并且在最后进行输出的预测，直观来说就是上一阶段的数据导致了下一阶段的结果。这样的过程被称之为因果卷积。
![WaveNet的处理流程(by Deepmind)](https://lh3.googleusercontent.com/Zy5xK_i2F8sNH5tFtRa0SjbLp_CU7QwzS2iB5nf2ijIf_OYm-Q5D0SgoW9SmfbDF97tNEF7CmxaL-o6oLC8sGIrJ5HxWNk79dL1r7Rc=w1440-rw-v1)

### 膨胀因果卷积（DILATED CAUSAL CONVOLUTIONS）

但是要注意的是，这样的设计方案还需要考虑数据本身的维度问题，例如音视频数据本身的码率较高时，对应的输入会呈现出较高的增长。因此，WaveNet 的第一个需要解决便是使用特殊的隐含层提取方法，来降低后续对数据特征处理的算力需求，一个简单的办法就是在因果卷积的过程中降低特征采样的密度，避免卷积的全连接，通过设置膨胀参数来控制采样的步长，称之为膨胀因果卷积（也有译作空洞因果卷积，个人认为膨胀卷积更直观）。

膨胀因果卷积，包含两个部分，一是之前提及的因果卷积；其次是膨胀卷积，这种卷积方法最早是出现在语义分割的场景中^[Yu, F., & Koltun, V. (2015). Multi-scale context aggregation by dilated convolutions. ArXiv Preprint ArXiv:1511.07122. <https://arxiv.org/abs/1511.07122>]，如下图所示，便是原始的膨胀卷积的示意，
![膨胀卷积在图像处理中的示意](https://raw.githubusercontent.com/Waynehfut/blog/img/img20211215171533.png)

其中，图 a 的膨胀值为 1，实际上等效于普通卷积，图 b 的膨胀值为 2，则在处理相同像素点的情况下其感知野膨胀为 7 $\times$ 7，图 c 的膨胀值为 4，同理感知野膨胀为 15 $\times$ 15，这就意味着随着膨胀值的增大，在相同计算复杂度的情况下，采集的视野区域更大，获得的信息也更多^[vdumoulin Convolution arithmetic <https://github.com/vdumoulin/conv_arithmetic>]。
![膨胀卷积示意(图源：vdumoulin)](https://github.com/vdumoulin/conv_arithmetic/raw/master/gif/dilation.gif)

如上图所示，是一个膨胀系数为 2 的膨胀卷积具体卷积的过程，实际上是将一个 3 $\times$ 3 的卷积核中间插入0，使其变为 5 $\times$ 5 的卷积核，这一设计的目的是替代原有图像处理中的 Pooling 操作，同时通过这样的方式，减少了卷积过程的计算量，使得不同膨胀系数的卷积核组合后，可以在多个尺度上获得图像信息，在对于分割等像素级的影像处理任务时，有较好的性能^[如何理解空洞卷积（dilated convolution）？ - 刘诗昆的回答 - 知乎
<https://www.zhihu.com/question/54149221/answer/323880412>]。在原始的膨胀卷积的文章中，作者提到多尺度的膨胀系数在设置时不能有大于 1 的公约数，同时采用`1; 2; 5; 1; 2; 5;`的循环膨胀系数设置会有较好的效果这些可以在 PSPNet 等网络结构中看到更多的设计技巧^[Zhao, H., Shi, J., Qi, X., Wang, X., & Jia, J. (2017). Pyramid Scene Parsing Network. 2017 IEEE Conference on Computer Vision and Pattern Recognition (CVPR), 6230–6239. <https://doi.org/10.1109/CVPR.2017.660>]。

而到 WaveNet 中，DeepMind 将二维的操作，转移到了一维的音频数据（波形数据）中，而膨胀系数可以直接转换为数据的跳过处理，如下图所示，自下而上分别时膨胀系数为 1，2，4，8 的膨胀因果卷积操作。在原文中，DeepMind 还提及，他们使用了多组`1; 2; 4; ...; 512;`的膨胀系数设置，这一点与图像中处理膨胀卷积的操作类似，但是与图像不同的是，由于不涉及二维的步长，因此无需关注最大公约数的问题。通知每组`1; 2; 4; ...; 512;`均有长度为 1024 的感知野，但实际上计算时，由于膨胀跳过的处理，减少了较多的中间层计算。
![膨胀因果卷积](https://raw.githubusercontent.com/Waynehfut/blog/img/img20211215170253.png)

在具体实施中，WaveNet 使用了 SoftMax 进行数据归一化，门控激活函数进行激活，以及使用了级联块来加速训练等，在此不表。
![具有级联块的WaveNet基本结构](https://raw.githubusercontent.com/Waynehfut/blog/img/img20211215214242.png)

## 时序卷积网络（Temporal Convolutional Networks，TCN）

简单过了一遍 WaveNet 后，我们再来看 TCN 就容易理解的多，现在通行的 TCN 结构是受到 WaveNet 启发的。

### TCN 的基本结构

TCN 的基本结构如下，主要是用来处理动作分类和识别^[Lea, C., Flynn, M. D., Vidal, R., Reiter, A., & Hager, G. D. (2017). Temporal Convolutional Networks for Action Segmentation and Detection. 2017 IEEE Conference on Computer Vision and Pattern Recognition (CVPR), 1003–1012. <https://doi.org/10.1109/CVPR.2017.113>]：
![具有膨胀卷积的TCN的基本结构](https://raw.githubusercontent.com/Waynehfut/blog/img/img20211215215530.png)

而作者还设计了具有编解码结构的 TCN
![具有编解码结构的TCN的基本结构](https://raw.githubusercontent.com/Waynehfut/blog/img/img20211215214430.png)

TBD

### 致谢

本文的撰写过程中参考了以下文献与链接，并在参考处进行标注，在此表示感谢。
