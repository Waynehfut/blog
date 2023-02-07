---
title: 轻量级神经网络处理框架TensorFlow Lite
date: 2018-05-03 20:58:43
tags: [神经网络,Android,TensorFlow]
categories: 技术
index_img: https://raw.githubusercontent.com/Waynehfut/blog/img/img/20220722175213.png
---

作为目前最为流行的神经网络框架，TensorFlow已经在各个神经网络的论文，实验平台等被广泛运用，caffe等安装复杂的网络框架也渐渐的被以TensorFlow为基础的Keras等取代。随着时间的推移，2017年11月基于移动平台的TensorFlow：TensorFlow Lite正式release。

<!-- more -->

## 一、 介绍

TensorFlow Lite(简称：TFLite)是TensorFlow(简称：TF)针对移动设备和嵌入式设备所开发的轻量级版本，使得移动设备在计算能力逐步发展的今天，有能力实现低延迟和较小计算量的设备实时计算。TFLite也可以通过[Android Neural Networks API](https://developer.android.com/ndk/guides/neuralnetworks/index.html)硬件层级的加速。目前Google官方已经将TFLite放在Github上：[Offical repo](https://github.com/tensorflow/tensorflow/tree/master/tensorflow/contrib/lite),相比之前所提出的TF mobile。TFLite的依赖和链接库都更加小，在移动端的计算加速也更容易实现，但由于现实中的手机等设备大同小异，一般都运行在CPU中。

## 二、TFLite 可以做什么

TFLite支持大部分的神经网络计算，包括数据量化和浮点运算，面向Android和IOS两种主流移动OS都提供了支持。利用protobuf库既可实现大部分神经网络需要的操作。
可以实现的算法主要面向CNN、RNN和LSTM，诸如：Conv,pool,pad和relu等基本计算都有提供，对于未实现的接口，可以通过[nnapi_delegate.cc](https://github.com/tensorflow/tensorflow/blob/master/tensorflow/contrib/lite/nnapi_delegate.cc)提供的代理进行实现。代码的整洁度比刚发布时要高很多，加新算子时请参看官方[Doc](https://github.com/tensorflow/tensorflow/blob/master/tensorflow/contrib/lite/g3doc/custom_operators.md)

## 三、已有的一些实作内容及实现

这部分我自己做的不是很多，在Google上找了一些，列如下：

- Inception V3, 基于ImageNet训练的model，比较适用于日常物体检测
- MobileNets，算是上个模型的缩小版，但是在降低model体积的同时，自己的精度也低了很多。

而它的实现思想如下图所示：

![tflite-architecture.jpg](https://raw.githubusercontent.com/Waynehfut/blog/img/img/202207231612482.jpg)

可以看出，训练的过程仍然还是放在大型设备上的，TFLite提供的只是一个转换器，将训练好的Model文件转换为体积更小的`.tflite`文件，而TFLite在Android和IOS设备上的实施则是依赖于Interpreter提供的各种kernels加载`.tflite`中的权重，从而在系统中实现相关的计算，TFLite向上提供了model参数加载的能力，向下实现了浮点运算和数据量化运算的接口，是一个介于`C++`/`JAVA API`和`ANNAPI`/`CoreML`等系统接口之间的计算层。

## 四、如何使用 TFLite

设备限制，仅介绍下Android部分，需要的是[bazel](https://bazel.build/),以及Android SDK和NDK(14b以上版本)的支持，在ndk-gradle中配置：

```bash
android_sdk_repository (
    name = "androidsdk",
    api_level = 23,
    build_tools_version = "23.0.2",
    path = "/home/xxxx/android-sdk/",
)

android_ndk_repository(
    name = "androidndk",
    path = "/home/xxxx/android-ndk-r10e/",
    api_level = 19,
)
```

利用bazel编译：
`bazel build --cxxopt=--std=c++11 //tensorflow/contrib/lite/java/demo/app/src/main:TfLiteCameraDemo`
[注：更换自己的App时，修改路径即可]
即可编译出示例程序，大小约22M。

## 五、演示效果

下图展示了一些示例程序的演示结果：

![sample.jpg](https://raw.githubusercontent.com/Waynehfut/blog/img/img/202207231613987.jpg)

效率还可以
> 题外话：近来忙于一些杂事，心态有些浮躁，论文进度也一般，在此反思。想来8号合肥GDG的Google I/O Extend，希望今年能有机会现场去听一波。

参考:
- https://github.com/tensorflow/tensorflow/blob/master/tensorflow/docs_src/mobile/tflite/demo_android.md
- https://www.tensorflow.org/mobile/tflite/
- http://developers.googleblog.cn/2017/12/tensorflow-lite.html
- https://www.tensorflowers.cn/t/277
