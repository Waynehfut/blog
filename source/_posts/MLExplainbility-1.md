---
title: 机器学习可解释性之模型洞悉的应用场景 Use Cases for Model Insights 
date: 2019-03-09 19:30:48
tags: [机器学习]
categories: 技术
---

本篇翻译自Kaggle机器学习可解释性微公开课🎓，本篇时第一课时，主要阐述了机器学习可解释性应用领域


<!-- more -->

Check source at [Kaggle](https://www.kaggle.com/learn/machine-learning-explainability) by Dan Becker, translate by [waynehfut](https://waynehfut.com/)

## 哪类洞察是有可能的 What Types of Insights Are Possible 

许多人会把机器学习的模型称之为"黑盒"(black box),某种意义上实际是在说，在得到很好的预测结果的时候难以理解这些预测背后的逻辑原理。在大多数数据科学家不知道如何从模型中抽取洞察力的时候，这种说法是正确的。

然而，这门微课程将告诉你诸多技巧以从精密的机器学习模型中抽取下述的需要洞察的信息，包括：
- 模型到底认为数据中哪些特征是最重要的？
- 对于模型的一次预测而言，数据中的每个特征是如何影响特定预测的？
- 每个特征在宏观意义上(a big-picture sense)是如何影响模型预测的？(在考虑了大量的可能预测结果后特定的影响是什么？)

## 为什么这些洞察是有价值的 Why Are These Insights Valuable

这些洞察有许多用途，包括：
- 数据调试
- 特征工程指导
- 未来数据的收集修正
- 人类决策指导
- 建立信任

## 数据调试 Debugging

真实世界数据很多是不可靠且杂乱无序的脏数据。在你编写预处理代码的时候就有可能已经加了一个有潜在错误的源。增加了[目标泄露](https://www.kaggle.com/dansbecker/data-leakage)的可能性。同时这也是真实数据科学中的常态而非意外。

鉴于错误的频繁性和灾难性后果，数据调试时数据科学的重要技能之一。理解模型的识别模式有助于你确定与所认知的真实世界不一致是何时发生，这通常也是追踪错误的第一步。

## 特征工程指导 Informing Feature Engineering

特征工程是一种最为常用且有效提高模型准确性的方法。特征工程通常包括转换你的原始数据或者转换已创建的特征。

有时你也可以依据对基本主题的直觉来略过这个过程，但是当你有100组元数据特征或者你缺乏你当前研究主题的背景知识时，你则需要更多指导。

Kaggle上一个[预测贷款违约](https://www.kaggle.com/c/loan-default-prediction)的比赛给出了一个极端的例子。这项比赛有100组原始特征。但由于隐私的原因，这些特征都被命名为`f1`，`f2`，`f3`，而不是常规的英文名词。这实际上模拟了一个对原始数据没有直觉的场景。

一位参赛者发现两种特征的不同，特别是`f527-f528`，可以创造非常强大的新特征。使用这项差异特征的远比不包含的模型要好。但是你有多大可能在开始处理数百项属性的时候创建这个属性呢？

你在该微课程学习的一些技巧将使`f527`和`f528`成为透明的重要特征，并且他们的作用是紧紧联系的。这也将引导你转换这两项属性，并找到类似`f527-f528`这样的“黄金特征”。

随着越来越多数据包含100维甚至1000维度的原始特征，这项方法也越发重要。


## 未来数据收集的指引 Directing Future Data Collection

网上下载的数据是你无法控制的，但是许多商业集团或组织在开展数据科学工作时有机会拓展数据收集的类型。收集新型的数据是昂贵且不易开展的，因此他们只会在知晓这项工作有价值之后才会开展下去。基于模型的洞察让你能知道当前所拥有特征的价值，也帮助你了解哪些新的值最有用。

## 人类决策支持的指引 Informing Human Decision-Making

一些决策过程是由模型自动完成的，亚马逊并没有人类（或者小精灵）去匆匆的决定在你访问网站的时候展示什么，但是对于许多重要的还是要由人类来定的决策，模型的洞察将比预测更有价值。

## 信任构建

在没有验证一些基础事实以前，许多人不会任务他们可以信任你的模型进行重要决策。考虑到数据错误的频率，这是一个明智的预防措施。在实践中，展示符合他们对问题的一般理解的模型洞察将有助于建立对模型的信任，即使是在对数据科学知之甚少的人中也是如此。

To be continued...

相关数据：

- [Medical Data and Hospital Readmissions](https://www.kaggle.com/dansbecker/hospital-readmissions)
- [New York City Taxi Fare Prediction]( https://www.kaggle.com/dansbecker/new-york-city-taxi-fare-prediction)
- [Predict FIFA 2018 Man of the Match](https://www.kaggle.com/mathan/fifa-2018-match-statistics)