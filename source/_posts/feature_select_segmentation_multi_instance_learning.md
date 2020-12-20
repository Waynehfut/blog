---
title: 论文阅读之 Predicting Lymph Node Metastasis Using Histopathological Images Based on Multiple Instance Learning With Deep Graph Convolution
date: 2020-12-20 20:03:15
tags: [论文阅读, 神经网络]
categories: 论文
mathjax: true
toc: true
---

本文是 2020 年 CVPR 的 Oral 展示的论文，来自于腾讯的 AI 实验室，主要说的是医学影像中的分割问题，使用的方法是多实例学习（Multiple Instance Learning）来做病理学图片的分割。其中多实例学习对我而言是一个没有接触过的领域，它与一般的标签不一样的在于 MIL 所给出的是一系列被称之为词袋（Bag of Instances）的标签，而 MIL 的目标就是从词袋中找出相关的标签。文章使用了基于变分自动编码器和生成对抗网络的组合模型构建了一个特征提取器，并使用了图卷积神经网络实现了结肠癌病理学切片的区域分割，性能有些许优势。文章的创新点主要在于使用了这些技术首次利用病理图片来预测淋巴结的转移。

<!-- more -->
