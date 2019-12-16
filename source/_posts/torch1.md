---
title: PyTorch入门一-PyTorch与numpy
date: 2019-04-10 16:24:53
tags: [深度学习,PyTorch]
categories: 技术
---


# 1. 前言

使用PyTorch时，没有那么多七七八八的导入，它时一个基于python的科学计算包，对于大众而言主要有两个方面的功能：
1. 通过使用GPU加速的高性能Numpy替代工具
2. 一个高度灵活和高速的深度学习研究平台


```python
import torch
```

我们可以随机创建一个未初始化的矩阵（5*3）


```python
x=torch.empty(5,3)
print(x)
```
    tensor([[1.8370e+25, 1.0901e+27, 1.7260e+25],
            [1.2393e+28, 2.7376e+20, 7.3909e+22],
            [2.2855e+20, 3.2607e-12, 7.0373e+22],
            [6.7415e+22, 4.2038e+30, 1.4348e-19],
            [2.7530e+12, 7.5338e+28, 1.4822e+11]])
    

我们也可以像使用numpy一样去创建向量或者张量等等。


```python
x = torch.rand(5, 3)
y = torch.zeros(5, 3, dtype=torch.long)
z = torch.tensor([5.5, 3])
print(x)
print(y)
print(z)
```
    tensor([[0.6813, 0.4026, 0.9534],
            [0.8680, 0.3184, 0.6279],
            [0.1557, 0.6849, 0.7569],
            [0.8989, 0.8249, 0.7073],
            [0.5857, 0.8452, 0.2623]])
    tensor([[0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]])
    tensor([5.5000, 3.0000])
    

同时我们也可以创建变量或者重写变量，这类方法通常会重用输入向量的属性，除非我们修改了其中的值


```python
x=x.new_ones(5,3,dtype=torch.double)   #新建一个全1矩阵，尺寸为5*3
print(x)
x=torch.randn_like(x,dtype=torch.float)  #重写属性,实际上内存时变化的，地址重写了
print(x)
```
    tensor([[1., 1., 1.],
            [1., 1., 1.],
            [1., 1., 1.],
            [1., 1., 1.],
            [1., 1., 1.]], dtype=torch.float64)
    tensor([[-0.5054, -1.0962, -1.0304],
            [-2.1840,  1.5417, -0.2002],
            [-0.5618,  0.3006, -0.3610],
            [-2.1936, -1.7692, -0.4636],
            [-0.1050, -1.2666,  1.8402]])
    

输出向量的尺寸也会非常的简单


```python
print(x.size())
```
    torch.Size([5, 3])
    

因为是以元组(tuple)的形式保存的，故而它支持众多的其他运算

# 2. 运算

Torch支持许多的运算符，以加法为例：


```python
y = torch.rand(5,3)
print(x+y)
```
    tensor([[-0.1500, -0.1588, -0.1751],
            [-1.8099,  2.2868,  0.6413],
            [-0.3108,  0.6843,  0.6317],
            [-2.0301, -0.8799, -0.1055],
            [ 0.3287, -0.8820,  2.5337]])
    

或是使用torch函数


```python
print(torch.add(x,y)) 
```
    tensor([[-0.1500, -0.1588, -0.1751],
            [-1.8099,  2.2868,  0.6413],
            [-0.3108,  0.6843,  0.6317],
            [-2.0301, -0.8799, -0.1055],
            [ 0.3287, -0.8820,  2.5337]])
    

或者可以指定输出向量


```python
result = torch.empty(5,3)
torch.add(x,y,out=result)
print(result)
```
    tensor([[-0.1500, -0.1588, -0.1751],
            [-1.8099,  2.2868,  0.6413],
            [-0.3108,  0.6843,  0.6317],
            [-2.0301, -0.8799, -0.1055],
            [ 0.3287, -0.8820,  2.5337]])
    

或者使用内联函数


```python
y.add_(x)
print(y)
```
    tensor([[-0.1500, -0.1588, -0.1751],
            [-1.8099,  2.2868,  0.6413],
            [-0.3108,  0.6843,  0.6317],
            [-2.0301, -0.8799, -0.1055],
            [ 0.3287, -0.8820,  2.5337]])
    

> 注意:在torch中，所有使用_结尾的函数都会调整张量，例如：`x.copy＿(y) , x.t＿()` ，都会改变x的值

在torch中所有的numpy的原生方法，如切片等也可以使用：


```python
print(x[:,1])
```
    tensor([-1.0962,  1.5417,  0.3006, -1.7692, -1.2666])
    

如果需要调整张量的尺寸，你可以使用`torch.view`


```python
x = torch.randn(4,4)
y=x.view(16)
z=x.view(-1,8)
print(x.size(),y.size(),z.size())
```
    torch.Size([4, 4]) torch.Size([16]) torch.Size([2, 8])
    

如果你有一个张量对象，你可以使用`.item()`来获取到其中的数值


```python
x=torch.randn(1)
print(x)
print(x.item())
```
    tensor([0.0375])
    0.037461359053850174
    

> 稍后阅读：将近100+种张量操作符，包括transposing，indexing，slicing， mathematical operations， linear algebra，random numbers等，可以在此处找到[Here](https://pytorch.org/docs/stable/torch.html)

# 3. Numpy 桥接

从Torch张量到Numpy向量之间的相互转换非常的简单

Torch张量和Numpy向量直接共享底层的内存地址，对其中之一做改动都会影响到另一个


```python
a = torch.ones(5)
print(a)
```
    tensor([1., 1., 1., 1., 1.])
    

## 3.1 从Torch张量转Numpy向量


```python
b=a.numpy()
print(b)
```
    [1. 1. 1. 1. 1.]
    

检查一下torch数值变化以后numpy向量的变化


```python
a.add_(1)
print(a)
print(b)
```
    tensor([2., 2., 2., 2., 2.])
    [2. 2. 2. 2. 2.]
    

### 3.2 从Numpy向量转换为Torch张量

同样检查np数据的变化所对应带来的Torch张量的变化


```python
import numpy as np
a = np.ones(5)
b = torch.from_numpy(a)
np.add(a, 1, out=a)
print(a)
print(b)
```
    [2. 2. 2. 2. 2.]
    tensor([2., 2., 2., 2., 2.], dtype=torch.float64)
    

注意：除了ChatTensor以外，其他所有类型的Tensor都支持转换为Numpy形式返回

# 4. CUDA向量 

张量可以使用`.to`方法转移到任意一个设备中


```python
# 注意此部分仅仅在CUDA加速运行时存在时可用
# 我们将需要使用`torch.device`对象来将张量对象从内存中移出
if torch.cuda.is_avaiable():
    device = torch.device("cuda")
    y = torch.ones_like(x, device=device)
    x = x.to(device)
    z = x + y
    print(z)
    print(z.to("cpu", torch.double))
```


```
tensor([-0.7816], device='cuda:0')
tensor([-0.7816], dtype=torch.float64)
```

