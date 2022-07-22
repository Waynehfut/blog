---
title: PyTorch入门五-数据并行
date: 2019-04-15 11:13:15
tags: [深度学习,PyTorch]
categories: 技术
index_img: https://raw.githubusercontent.com/Waynehfut/blog/img/img/20220722173237.png
---

PyTorch的基础使用官方教程，主要描述了数据并行的原理

<!-- more -->

## 前言 

往往，我们的实际使用环境有多个加速单元，我们将需要使用GPU来进行加速，在这部分中，我们可以使用`DataParalle
l`来调用多个GPU

在PyTorch中使用多个GPU非常简易，可以直接将模型放到GPU中


```python
device = torch.device("cuda:0")
model.to(device)
```

紧接着，你可以将所有的张量放到GPU中


```python
mytensor = my_tensor.to(device)
```

值得注意的是，刚才已经调用了my_tensor.to(device)并返回了一个新的GPU中my_tensor的复制来重写了原有`my_tensor`。你需要将它赋值到一个新的张量中，并在GPU中使用这个张量

在多个GPU上执行前向传播和后向传播仍旧很自然。然而PyTorch默认只用一个GPU。你可以很简单的通过使用`DataParallel`在多个GPU上并行的进行运算操作


```python
model  = nn.DataParallel(model)
```

后续部分将深入探讨核心问题

## 导入和参数

首先需要导入PyTorch模型并定义模型


```python
import torch
import torch.nn as nn
from torch.utils.data import Dataset, DataLoader

# 参数和数据加载
input_size = 5
output_size = 2

batch_size = 30
data_size = 100
```

加载设备


```python
device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
```

## 虚拟数据

为了实现后续教程，你可以使用下述代码来获取随机数据


```python
class RandomDataset(Dataset):
    def __init__(self, size, length):
        self.len = length
        self.data  = torch.randn(length, size)
    def __getitem__(self, index):
        return self.data[index]
    def __len__(self):
        return self.len
rand_loader = DataLoader(dataset=RandomDataset(input_size, data_size),
                                                batch_size=batch_size, shuffle=Trun)
```

## 简单模型

运行实例还需要一个简明的模型，以获取输入输出和中间运算。`DataParallel`可以在任意一个模型中使用(如：CNN，RNN，Capsule Net等)

我们在模型中放置了一个print语句来监视输入和输出张量的大小。请注意第0批打印的内容。


```python
class Model(nn.Module):
    # Our model

    def __init__(self, input_size, output_size):
        super(Model, self).__init__()
        self.fc = nn.Linear(input_size, output_size)

    def forward(self, input):
        output = self.fc(input)
        print("\tIn Model: input size", input.size(),
              "output size", output.size())

        return output
```

## 创建模型及数据并行

这是本教程的核心部分。首先，我们需要创建一个模型实例并检查是否有多个GPU。如果我们有多个GPU，我们可以使用`nn.DataParallel`包装我们的模型。然后我们可以使用`model.to(device)`把我们的模型按模型放到GPU上。


```python
model = Model(input_size, output_size)
if torch.cuda.device_count() > 1:
  print("Let's use", torch.cuda.device_count(), "GPUs!")
  # dim = 0 [30, xxx] -> [10, ...], [10, ...], [10, ...] on 3 GPUs
  model = nn.DataParallel(model)

model.to(device)
```

## 运行模型

现在我们可以看到数据输入输出的大小


```python
for data in rand_loader:
    input = data.to(device)
    output = model(input)
    print("Outside: input size", input.size(),
          "output_size", output.size())
```

## 模型输出

如果您没有GPU或一个GPU，当我们批处理30个输入和30个输出时，模型得到30个输出，如预期的那样。但是如果你有多个GPU，那么你可以得到这样的结果。

### 2 GPUs


```bash
# on 2 GPUs
Let's use 2 GPUs!
    In Model: input size torch.Size([15, 5]) output size torch.Size([15, 2])
    In Model: input size torch.Size([15, 5]) output size torch.Size([15, 2])
Outside: input size torch.Size([30, 5]) output_size torch.Size([30, 2])
    In Model: input size torch.Size([15, 5]) output size torch.Size([15, 2])
    In Model: input size torch.Size([15, 5]) output size torch.Size([15, 2])
Outside: input size torch.Size([30, 5]) output_size torch.Size([30, 2])
    In Model: input size torch.Size([15, 5]) output size torch.Size([15, 2])
    In Model: input size torch.Size([15, 5]) output size torch.Size([15, 2])
Outside: input size torch.Size([30, 5]) output_size torch.Size([30, 2])
    In Model: input size torch.Size([5, 5]) output size torch.Size([5, 2])
    In Model: input size torch.Size([5, 5]) output size torch.Size([5, 2])
Outside: input size torch.Size([10, 5]) output_size torch.Size([10, 2])
```

### 3 GPUs


```bash
Let's use 3 GPUs!
    In Model: input size torch.Size([10, 5]) output size torch.Size([10, 2])
    In Model: input size torch.Size([10, 5]) output size torch.Size([10, 2])
    In Model: input size torch.Size([10, 5]) output size torch.Size([10, 2])
Outside: input size torch.Size([30, 5]) output_size torch.Size([30, 2])
    In Model: input size torch.Size([10, 5]) output size torch.Size([10, 2])
    In Model: input size torch.Size([10, 5]) output size torch.Size([10, 2])
    In Model: input size torch.Size([10, 5]) output size torch.Size([10, 2])
Outside: input size torch.Size([30, 5]) output_size torch.Size([30, 2])
    In Model: input size torch.Size([10, 5]) output size torch.Size([10, 2])
    In Model: input size torch.Size([10, 5]) output size torch.Size([10, 2])
    In Model: input size torch.Size([10, 5]) output size torch.Size([10, 2])
Outside: input size torch.Size([30, 5]) output_size torch.Size([30, 2])
    In Model: input size torch.Size([4, 5]) output size torch.Size([4, 2])
    In Model: input size torch.Size([4, 5]) output size torch.Size([4, 2])
    In Model: input size torch.Size([2, 5]) output size torch.Size([2, 2])
Outside: input size torch.Size([10, 5]) output_size torch.Size([10, 2])
```

### 8 GPUs


```bash
Let's use 8 GPUs!
    In Model: input size torch.Size([4, 5]) output size torch.Size([4, 2])
    In Model: input size torch.Size([4, 5]) output size torch.Size([4, 2])
    In Model: input size torch.Size([2, 5]) output size torch.Size([2, 2])
    In Model: input size torch.Size([4, 5]) output size torch.Size([4, 2])
    In Model: input size torch.Size([4, 5]) output size torch.Size([4, 2])
    In Model: input size torch.Size([4, 5]) output size torch.Size([4, 2])
    In Model: input size torch.Size([4, 5]) output size torch.Size([4, 2])
    In Model: input size torch.Size([4, 5]) output size torch.Size([4, 2])
Outside: input size torch.Size([30, 5]) output_size torch.Size([30, 2])
    In Model: input size torch.Size([4, 5]) output size torch.Size([4, 2])
    In Model: input size torch.Size([4, 5]) output size torch.Size([4, 2])
    In Model: input size torch.Size([4, 5]) output size torch.Size([4, 2])
    In Model: input size torch.Size([4, 5]) output size torch.Size([4, 2])
    In Model: input size torch.Size([4, 5]) output size torch.Size([4, 2])
    In Model: input size torch.Size([4, 5]) output size torch.Size([4, 2])
    In Model: input size torch.Size([2, 5]) output size torch.Size([2, 2])
    In Model: input size torch.Size([4, 5]) output size torch.Size([4, 2])
Outside: input size torch.Size([30, 5]) output_size torch.Size([30, 2])
    In Model: input size torch.Size([4, 5]) output size torch.Size([4, 2])
    In Model: input size torch.Size([4, 5]) output size torch.Size([4, 2])
    In Model: input size torch.Size([4, 5]) output size torch.Size([4, 2])
    In Model: input size torch.Size([4, 5]) output size torch.Size([4, 2])
    In Model: input size torch.Size([4, 5]) output size torch.Size([4, 2])
    In Model: input size torch.Size([4, 5]) output size torch.Size([4, 2])
    In Model: input size torch.Size([4, 5]) output size torch.Size([4, 2])
    In Model: input size torch.Size([2, 5]) output size torch.Size([2, 2])
Outside: input size torch.Size([30, 5]) output_size torch.Size([30, 2])
    In Model: input size torch.Size([2, 5]) output size torch.Size([2, 2])
    In Model: input size torch.Size([2, 5]) output size torch.Size([2, 2])
    In Model: input size torch.Size([2, 5]) output size torch.Size([2, 2])
    In Model: input size torch.Size([2, 5]) output size torch.Size([2, 2])
    In Model: input size torch.Size([2, 5]) output size torch.Size([2, 2])
Outside: input size torch.Size([10, 5]) output_size torch.Size([10, 2])
```

## 总结

DataParallel会自动拆分数据，并在几个GPU上向多个模型发送工单。在每个模型完成它们的工作后，DataParallel收集并合并结果，然后将其返回给您。

更多信息可以点击[此处](https://pytorch.org/tutorials/beginner/former_torchies/parallelism_tutorial.html)查看

