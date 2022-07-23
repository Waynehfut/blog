---
title: PyTorch入门三-神经网络
date: 2019-04-11 18:01:59
tags: [深度学习,PyTorch]
categories: 技术
index_img: https://raw.githubusercontent.com/Waynehfut/blog/img/img/20220722173237.png
---

PyTorch的基础使用官方教程，主要描述了PyTorch构建简单神经网络

<!-- more -->

# Torch中的Nerual Networks

我们可以使用`torch.nn`来构建神经网络

现在你已经对`autograd`有了概览，`nn`依赖于`autograd`去定义模型并区分他们，一个`nn.Module`包括多个层，然后方法`forward(input)`返回了`output`

例如，对于数字图像的分类网络

![mnist](https://raw.githubusercontent.com/Waynehfut/blog/img/img/202207231613546.png)

    convnet

这个是一个简单的前馈神经网络，它包含输入，传递了个神经层后，获得了最终的输出

一个典型的神经网络训练过程如下：

- 定义一个神经网络及其可训练的参数
- 迭代输入数据集
- 处理神经网络输入
- 计算损失(输出距离正确目标的距离)
- 反向传播方法调优网络参数
- 更新网络参数，典型的更新规则是：`weight`=`weight`-`learning_rate`+`gradient`

## 定义一个网络

我们可以这样定义网络：


```python
import torch
import torch.nn as nn
import torch.nn.functional as F
class Net(nn.Module):
    def __init__(self):
        super(Net, self).__init__()
        # 1个输入通道，6个输出通道，卷积尺度为5*5
        self.conv1 = nn.Conv2d(1, 6, 5)
        self.conv2 = nn.Conv2d(6, 16, 5)
        # 一个映射变换：y = Wx + b
        self.fc1 = nn.Linear(16 * 5 * 5, 120)
        self.fc2 = nn.Linear(120, 84)
        self.fc3 = nn.Linear(84, 10)
        
    def forward(self,x):
        # 使用最大池化，滑动窗口尺度（2，2）
        x = F.max_pool2d(F.relu(self.conv1(x)), (2, 2))
        # 如果大小为正方形，则只需要指定一个数字
        x = F.max_pool2d(F.relu(self.conv2(x)),2)
        x = x.view(-1, self.num_flat_features(x))
        x = F.relu(self.fc1(x))
        x = F.relu(self.fc2(x))
        x = self.fc3(x)
        return x
    def num_flat_features(self,x):
        size = x.size()[1:]  # 除批尺寸维度以外的其他所有维度
        num_features = 1
        for s in size:
            num_features *= s
        return num_features
net = Net()
print(net)
```

    Net(
      (conv1): Conv2d(1, 6, kernel_size=(5, 5), stride=(1, 1))
      (conv2): Conv2d(6, 16, kernel_size=(5, 5), stride=(1, 1))
      (fc1): Linear(in_features=400, out_features=120, bias=True)
      (fc2): Linear(in_features=120, out_features=84, bias=True)
      (fc3): Linear(in_features=84, out_features=10, bias=True)
    )
    

刚才已经完成了`forward`函数的定义，然后`backward`函数（计算梯度的位置）将在你声明了`autograd`之后自动定义。你可以在`forward`函数中使用任意一类张量操作


```python
params = list(net.parameters())
print(len(params))
print(params[0].size())  # conv1 的权重
```

    10
    torch.Size([6, 1, 5, 5])
    

接着尝试一下32x32的随机输入，注意LeNet的输入是要求32x32的，为了使用Mnist数据集，你也需要将从数据集中抽取的图片重设大小至32x32


```python
input = torch.randn(1, 1, 32, 32)
out = net(input)
print(out)
```

    tensor([[ 0.1762,  0.0182,  0.0410, -0.1050,  0.0997, -0.1558,  0.0132, -0.1638,
              0.0705, -0.1359]], grad_fn=<AddmmBackward>)
    

使用随机梯度将所有参数和反向的梯度缓冲区归零


```python
net.zero_grad()
out.backward(torch.randn(1,10))
```

> 注意
`torch.nn`仅支持mini-batchs，整个`torch.nn`包仅支持mini-batchs的采样，并不支持单个采样
例如，`nn.Conv2d`将采用一个4D的张量`nSamples`x`nChannels`x`Heights`x`Width`
如果你确实需要在输入时采用一整个样例的输入，那就设置`input.unsqueeze(0)`来增加一个假的批维度

在进一步处理前，在此总结一下已经有的输入

### 小结

- `torch.Tensor` - 一个多维的向量，支持类似于`backward()`的自动梯度操作，同时支持关于张量的梯度，
- `nn.Module` - 神经网络模型，便于封装参数的实现，有助于进行GPU加速，导出加载等操作，
- `nn.Parameter` - 一种张量，在分配到模型的时候将被自动注册的一类参数，
- `autograd.Function` - 实现前向后向传播中自动梯度的计算操作。每一个`Tensor`操作将创建至少一个`Function`节点，该节点连接到创建`Tensor`并编码历史的函数中。

### 截至目前已学习

- 定义网络
- 处理输入及调用反馈

### 还存在

- 计算损失
- 更新模型的权重

## 损失函数

损失函数将（output和target）作为函数输入，然后计算数值以估计目前输出与目标的距离

在nn包中很有多不同的损失函数，一个简单的损失函数是：nn.MSELoss，它计算了模型输出和目标的均方误差

例如：


```python
output = net(input)
target = torch.randn(10) # 举例虚设的目标
target = target.view(1, -1) # 转换为与输出相同的尺度，其中-1表示没有约束
criterion = nn.MSELoss()
loss = criterion(output, target)
print(loss)
```

    tensor(0.9942, grad_fn=<MseLossBackward>)
    

现在，如果你遵循反向传播过程中`loss`的计算路径，使用`.grad_fn`属性将能够看到如下的计算图

```
    input-> conv2d -> relu -> maxpool2d -> conv2d -> relu -> maxpool2d
            -> view -> linear -> relu -> linear -> relu -> linear
            -> MSELoss
            -> loss
```

至此，我们将调用`loss.backward()`，之后整个计算图都是关于损失的微分，然后图中所有的张量中`requires_grad=True`的部分都将累加运算过程中的梯度至`.grad`中

具体而言，我们遵照下面的步骤来反向计算


```python
print(loss.grad_fn) #MSELoss
print(loss.grad_fn.next_functions[0][0])#Linear
print(loss.grad_fn.next_functions[0][0].next_functions[0][0]) #ReLU
```

    <MseLossBackward object at 0x000001D1DBFDBEF0>
    <AddmmBackward object at 0x000001D1DBFDB4E0>
    <AccumulateGrad object at 0x000001D1DBFDBEF0>
    

## 反向传播（Backprop）

要反向传播误差值，我们需要计算`loss.backward()`。你需要清空现有的梯度，否则传播过程会在原有梯度上累计

现在你可以调用`loss.backward()`，然后看一下conv1的偏置梯度之后进行反向传播


```python
net.zero_grad()
print('conv1.bias.grad before backward')
print(net.conv1.bias.grad)

loss.backward()

print('conv1.bias.grad after backward')
print(net.conv1.bias.grad)
```

    conv1.bias.grad before backward
    tensor([0., 0., 0., 0., 0., 0.])
    conv1.bias.grad after backward
    tensor([-0.0026,  0.0131, -0.0005, -0.0052, -0.0071, -0.0015])
    

现在我们可以一览如何使用损失函数了

### 稍后阅读

神经网络包以构建区块的方式实现了众多的模型和损失函数，完整包含文档的列表可以参见[此处](https://pytorch.org/docs/nn)

### 仅剩下需要学习的

- 更新网络的权重

## 更新网络的权重

实践中最简单的网络更新规则是随机梯度下降法（Stochastic Gradient Descent,SGD）

`weight`=`weight`-`learning_rate`*`gradinent`

我们可以使用下述简单的代码实现：


```python
learning_rate = 0.01
for f in net.parameters():
    f.data.sub_(f.grad.data * learning_rate)
```

然而，在你使用神经网络的过程中，你也许会想使用多种不同的更新规则，如：SGD,Nesterov-SGD,RMSProp等。为了实现这个方法，Torch构建了一个数据包：`torch.optim`以实现这些方法，使用起来也很简单：


```python
 import torch.optim as optim
# 创建一个优化器
optimizer = optim.SGD(net.parameters(), lr=0.01)

# 训练循环中
optimizer.zero_grad() #梯度置零
output = net(input)
loss = criterion(output, target)
loss.backward()
optimizer.step() #更新权重
```

> 注意
观察是如何使用optimizer.zero_grad()手动将梯度缓冲区设置为零的，因为正如在反向传播部分介绍的一样梯度是累计的
