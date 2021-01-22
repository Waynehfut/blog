---
title: 时序影像信息处理：从稀疏表示到门口循环单元
tags: [机器学习, 神经网络]
categories: 算法
mathjax2: true
toc: true
---

图像数据的表现形式是复杂的。对于一个图像而言，这个图像可以是一维的，可以是高维的。其中对于高维数据而言，图像在某个维度上可能存在关联，这样的关联方式可以是连续的，也可以是离散的，也可以是混合的。因此机器学习或深度学习等领域的进行图像处理时，诞生了一系列适用于时序信息处理的方法论。但是我对这个领域的内容的知识储备还不够立体，因此希望在此做这个记录以便于加强对这个方面的认识。本文的数据重点将放在图像数据处理中，方法上将重点讨论神经网络相关的时序信息处理，对于非神经网络方法将主要介绍隐式马尔科夫和稀疏字典。这篇 post 可能会随着我的认识而持续更新。

<!-- more -->

## 时序影像处理基本思路

处理影像数据的一般过程是将影像数据张量（Tensor）进行维度转换,到另一个目标维度的张量。这个转换在早期受制于算力，一般是人工设计方法来实现。近年来随着 GPU 算力的飞跃，诸如 Pytorch 和 TensorFlow 等框架提供的优秀 API 已经将这个过程的门槛降低了很多。在转换后的数据上在应用领域相关的处理方法或可视化表示，将可以得到不同的数据处理结果。对于时序数据而言，这一过程同样适用。只是转换过程需要额外考虑时序信息表示，以及时序信息如何影像数据处理。

## 稀疏表示 Sparse Representation, SR

在 Stackexchange^[https://dsp.stackexchange.com/questions/47726/what-exactly-is-sparse-representation] 上有一个回答讲的挺好

## 隐马尔科夫模型 Hidden Markov Model, HMM

## 循环神经网络 Recurrent neural network, RNN

## 长短期记忆单元 Long Short-Term Memory, LSTM

## 门口循环单元 Gated recurrent unit, GRU
