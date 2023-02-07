---
title: 从Keras的第一个Sample说起
date: 2018-02-27 23:32:15
tags: Keras
categories: 技术
index_img: https://raw.githubusercontent.com/Waynehfut/blog/img/img/20220722175914.png
---

看了一些视频和论文，自己也动手做了一些，但是说积累了多少，真的很惭愧，与其手忙脚乱。不如好好做做自己的笔记，也算是对得起自己的时间。虽然开始的几个都很低级，但是低级就是低级，没什么大不了的，总有一天会高级起来。categories: 技术

<!-- more -->
Keras就不在此多啰嗦了，第一个Sample是Mnist，用的模型也非常简单，先说几个这个代码里设计到的概念：

**Batch_size, Epoch, Batch(Mini-Batch)**：可以将这几个词语一起理解。在数据较多时，我们的机器不可能一下子将所有的数据全部处理，为此需要对数据进行分批次进行，按照批的大小来将数据分为若干批，每批为里面都是可以视作一个SGD(每看一组数据就算一下损失函数，然后求梯度更新参数)，为了照顾到所有的分批情况，我们会多分几次。而批的大小即为Batch_size，一批跑一次bp即为batch，当前的分类情况下所有批跑完为一个Epoch。一般会有多个Epoch

**Dense**: 即为全连接层，在神经网络中，使用运算是：output = activation(dot(input, kernel)+bias) 其中activation是逐元素计算的激活函数，kernel是权重矩阵，随着bp过程，会不断变化，bias是偏置向量。Keras中需要use_bias=True才会添加。

**Sequential**：序贯模型，即指模型为多个网络层的堆叠，一条路走下去。在Keras中可以通过传递一个layer的list来构造当前的模型。

**Dropout**: 这个是一个为了得到更好的测试结果所使用的策略，在训练的过程中，会偶尔丢弃一些神经元，使得未被丢弃的神经元被强化，同时在最终测试时每个神经元都可以训练的很好。

**RMSprop**：是一个计算梯度的函数，与SGD的功能相同，其中RMS是均方根的缩写。它是由Adadelta发展而来，而Adadelta又是Adagrad的发展，这里不再多说，理解为对学习速率的一个特别约束就好，也可以理解为一种梯度计算的约束。

以上概念，下面我逐句的说一下这个代码：

从第16行开始，我们可以看到这个代码所设置的batch_size为128，即每次设置的批处理的批次大小为128，计算loss的时候，是将128个训练数据在当前模型权重下得到的结果与验证结果进行比对。

第17行是数据的分类，Mnist是手写数字识别，其类别共有10类。

接着是第18行，表示的是分20次组。（实际上，我们可以得知，Mnist中训练数据共有60000个，测试数据有10000个，20次组并不能完全得到覆盖到所有匹配。因此，每次训练的过程都有可能不一样。）

第21行开始是数据导入，mnist.load_data()是将mnist数据导入到当前的model中，通过解压原始数据可以得知，mnist数据集是有一堆图片组成，但是当前的代码处理的是npz文件，里面包含了训练集[(x_train)数据,(y_train)类别]，测试集[(x_test)数据，(y_test)类别]

Name | size | range 
- | :- | - 
x_train.npy|uint8(60000,28,28)|[0,255]
y_train.npy|uint8(60000,)|[0,9]
x_test.npy|uint8(10000,28,28)|[0,255]
y_test.npy|uint8(10000,)|[0,9]

在第21行load以后，这些numpy数据将被加载到程序中。23行是将原始的数据变形为了28*28 = 784 的一维向量,25行则是将数据转型为float32位，方便后续归一化（27-28行）。

再到第33行，将测试集的标签导入到程序中，此行在输入的过程中，是将1,2,3,...,9,0的标签转换为一维的长度为10的向量,如0->[1,0,...,0]。方便后续softmax进行分类。

再到36行开始至41行是NN的基本结构。输入784(relu正则化)输出512，按20%的概率drop，输入512(relu正则化)输出512，按20%dropout，按类别输出，分类函数为softmax，多类判别常用的是便是softmax.

45行开始是model的构建，损失量是categorical cross-entropy，与softmax相对应。RMSprop前文已经说过，metrics对应的是由模型评估的度量，在训练和测试期间。 通常你会使用`index= [ 'accuracy' ] `.

49行表示训练开始，其中verbose表示的是训练过程中输出的情况，例如进度条等等：`0 = silent, 1 = progress bar, 2 = one line per epoch`.

54行表示的是验证结果，静默模式下降数据跑一遍后，输出loss和acc。
至此，基本分析完这个简单的代码。

希望每天都可以写一篇吧 ;)

[相关Link](https://github.com/keras-team/keras/blob/master/examples/mnist_mlp.py)
