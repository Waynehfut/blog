---
title: 在Mnist中使用CNN
date: 2018-02-28 23:12:13
tags: Keras
categories: 技术
---

*在[上篇](https://waynehfut.github.io/2018/02/27/mnist-mlp/)中，说了Keras中的Hello World,说到了一些神经网络的基本概念，这篇将以keras的卷积神经网络为切入点，介绍卷积神经网络。[相关Link](https://github.com/keras-team/keras/blob/master/examples/mnist_cnn.py)*
<!-- more -->
第二个Sample是Cnn下的Mnist，用的模型也非常简单，先说几个这个代码里设计到的概念：
**Flatten：** 字面意思是平滑，拉平。也就是告诉我们这个东西是将什么东西拉直的，实际上一般是用在包含卷积或者池化的神经网络中，将矩阵数据转换为向量的，从而在后续的全连接层(Dense)实现后续操作。

**Conv2D：** 2D卷积，概念在此不做赘述，可以理解为通过卷积核将大矩阵转换为小矩阵的过程，可自定卷积核大小和卷积方式。通常的，在卷积层后会有激活函数将上一层卷积核卷积出的每个feature map合并到一个feature map中，从而实现局部感知

**MaxPooling2D：** 最大池化，是一类池化类型。池化可以理解为简单的卷积，即在池化层定义的尺寸内，选取最大值，一般池化层在卷积层以后。

**backend：** 这是Keras为了适应多个后端(backend)所设计的，因为在神经网络的下层的实现可以有多个，如：`Tensorflow`,`Theano`,`CNTK`等，为了实现用户自定义，故设计了此接口。一个后端的配置实例如下：
```
{
    "image_data_format": "channels_last",
    "epsilon": 1e-07,
    "floatx": "float32",
    "backend": "tensorflow"
}
```
iamge_data_format：字符串，"channels_last"或"channels_first"，该选项指定了Keras将要使用的维度顺序，可通过keras.backend.image_data_format()来获取当前的维度顺序。对2D数据来说，"channels_last"假定维度顺序为(rows,cols,channels)而"channels_first"假定维度顺序为(channels, rows, cols)。对3D数据而言，"channels_last"假定(conv_dim1, conv_dim2, conv_dim3, channels)，"channels_first"则是(channels, conv_dim1, conv_dim2, conv_dim3)

epsilon：浮点数，防止除0错误的小数字

floatx：字符串，"float16", "float32", "float64"之一，为浮点数精度
backend：字符串，所使用的后端，为"tensorflow"或"theano"

#### 以上概念，下面我逐句的说一下这个代码：

部分相似代码，不再赘述，有需要的请参考[上篇](https://waynehfut.github.io/2018/02/27/mnist-mlp/)。

第20行描述了数据文件的的行高为28，列高为28。

第25行是调用Keras后端接口，检查当前系统对于图片信道的处理情况,一般情况下image_data_format都是channels_last，目前是重新变形,增加一个通信信道：从(60000, 28, 28)转为(60000, 28, 28, 1).

第47行开始开始构建卷积神经网络，首先增加了一个卷积层，输入28 * 28 * 1，输出维度为32，卷积核的窗口选用3*3像素窗口，激活函数为relu。

同样的第48行是将输出设为64，卷积核变为3*3，激活函数为relu。

接下来为池化，池化区域为2*2，取最大值。

之后进行平滑，开始如前一篇所提的一样进行全连接神经网络操作。

> 谢谢您的阅读，如您所见，文章结束还有小红心和分享按钮。