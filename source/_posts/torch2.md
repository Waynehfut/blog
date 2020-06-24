---
title: PyTorch入门二-自动微分
date: 2019-04-10 22:45:43
tags: [深度学习,PyTorch]
categories: 技术
mathjax: true
---

Pytorch的基础使用官方教程，主要描述了自动微分的原理

<!-- more -->

# Autograd:自动计算微分

PyTorch的神经网络计算核心是`autograd`包，在这节我们简单的过一遍这个部分的内容，之后我们将开始训练我们的第一个神经网络

`autograd`包为所有向量运提供了自动微分计算法。这是一个按运行需求而定义的网络框架，也意味着你的反向传播方法取决于你的代码运行方式，每个独立的迭代都可能是不一样的。

下文将通过一些例子展示简单的术语

## 1. 张量（Tensor）

`torch.Tensor`是整个包类的核心。如果你设置他的`.requries_grad`属性为`True`，它的整个计算操作都将被追踪。当你结束你的计算后，你可以调用`.backward()`以自动计算梯度。当前张量的梯度都将保存在`.grad`属性中

如果需要从追踪历史中停止某个张量，你可以使用`.detach()`来将它从计算历史中分离出来，以避免将来计算时被追踪。

如果需要完全阻止追踪历史（并使用这部分内存），你可以在这部分代码使用`with`语句和`torch.no_grad()`.这对模型验证阶段将会非常有帮助，因为模型也许有以`requires_grad=True`来标记可训练参数，但是在这个阶段我们不需要这些梯度。

另一个对于autograd实现的非常重要的类是-`Function`

`Tensor`和`Function`是互联的并组成了非循环图，共同编码了整个计算过程。每个张量都有`.grad_fn`属性指向创建该`Tensor`的`Function`(但是用户自行创建的张量除外，此部分的`grad_fn`属性是`None`)

如果你想计算导数，你可以在`Tensor`上调用`.backward()`，如果`Tensor`是标量（Scalar，例如仅保存了一个元素数据），你将不需要指定`backward()`的参数，然而如果存在多个元素的时候，你就需要指定`gradient`参数来匹配目标张量的尺寸。


```python
import torch
```

创建一个张量并设置`requires_grad=True`以追踪计算过程


```python
x = torch.ones(2,2,requires_grad=True)
print(x)
```
    tensor([[1., 1.],
            [1., 1.]], requires_grad=True)
    

进行张量的运算


```python
y = x + 2
print(y)
```
    tensor([[3., 3.],
            [3., 3.]], grad_fn=<AddBackward0>)
    

y是一个运算处理后的结果，因此它会有`grad_fn`属性


```python
print(y.grad_fn)
```
    <AddBackward0 object at 0x000002774F3AB780>
    

在y上进行更多的操作


```python
z = y * y * 3
out = z.mean()
print(z, out)
```
    tensor([[27., 27.],
            [27., 27.]], grad_fn=<MulBackward0>) tensor(27., grad_fn=<MeanBackward1>)
    

`.requires_grad_(...)`将就地修改已存在的张量的`requires_grad`标签，这个输入标签如果没有设置的话，默认是`False`


```python
a = torch.randn(2, 2)
a = ((a * 3)/(a - 1))
print(a.requires_grad)
a.requires_grad_(True)
print(a.requires_grad)
b = (a * a).sum()
print(b.grad_fn)
```
    False
    True
    <SumBackward0 object at 0x000002774F3AB9E8>
    

## 2. 梯度（Gradients）

现在让我们来处理反向传播，因为`out`包含一个标量，`out.backward()`等价于`out.backward(toch.tensor(1.))`。


```python
out.backward()
```

尝试输出$\frac { \partial \left( out \right)  }{ \partial \left( x \right)  }$的梯度


```python
print(x.grad)
```
    tensor([[4.5000, 4.5000],
            [4.5000, 4.5000]])
    

你将得到一个全是4.5的矩阵，我们将`out`张量记作$o$. 那么我们将有$o=\frac{1}{4}\sum _{i}{}z_{i}$，${z_i} = 3{({x_i} + 2)^2}$ 和 $z_{i}\mid_{x_{i}=1}=27$，因$\frac{\partial o}{\partial x_i} = 4*\frac{1}{4}*\frac{3}{2}(x_i + 2)$，于是有$\frac{\partial o}{\partial x_i}\left| {_{x_i = 1} = \frac{9}{2} = 4.5} \right.$

在数学上如果你有个矢量函数$\overrightarrow y=f \left( { \overrightarrow x} \right)$，那么对于$\overrightarrow y$的$\overrightarrow x$梯度是一个Jacobian矩阵
$$
J=\begin{pmatrix}
    \frac{\partial y_1}{\partial x_1} & \cdots &  \frac{\partial y_1 }{\partial x_n}\\ 
    \vdots& \ddots &  \vdots\\ 
    \frac{\partial y_m}{\partial x_1} & \cdots &  \frac{\partial y_m }{\partial x_n}
\end{pmatrix}
$$

通常而言，`torch.autograd`是一个计算Jacobian向量积的引擎。就是说，给定任意向量$v = {({v_1},{v_2} \cdots {v_m})^T}$，它计算了乘积${v^T}\cdot J$。如果$v$恰好是标量函数${\text{l = g}}\left( {\overrightarrow y } \right)$的梯度。也就是有，$v={\left ( \frac{\partial l }{\partial y_1} \cdots  \frac{\partial l }{\partial y_m} \right )}^{T}$，之后依据链式法则。Jacobian向量积可以转换为由$\overrightarrow x$相对于$l$的梯度：

$$
    {J^T} \cdot v = 
    \begin{pmatrix}
        \frac{\partial y_1}{\partial x_1} & \cdots &  \frac{\partial y_1 }{\partial x_n}\\ 
        \vdots& \ddots &  \vdots\\ 
        \frac{\partial y_m}{\partial x_1} & \cdots &  \frac{\partial y_m }{\partial x_n}
    \end{pmatrix}
    \begin{pmatrix}
        \frac{\partial y_1}{\partial x_1}\\ 
        \vdots\\ 
        \frac{\partial y_1}{\partial x_1}
    \end{pmatrix}=
    \begin{pmatrix}
        \frac{\partial l}{\partial x_1}\\ 
        \vdots\\ 
        \frac{\partial l}{\partial x_1}
    \end{pmatrix} 
$$


(注意，${v^T} \cdot J$给出了一个行向量，但是可以通过${J^T} \cdot v$将其视作列向量)

Jacobian向量积的这一特性是的外部梯度输入到具有非标量输出的模型中非常方便

现在我们可以看一个使用Jacobian向量积的例子


```python
x = torch.randn(3, requires_grad = True)

y = x * 2
while y.data.norm() < 1000:
    y = y * 2
print(y)
```
    tensor([-1389.2472,   936.7593,  -448.8310], grad_fn=<MulBackward0>)
    

你会发现`y`已经不是一个标量了，`torch.autograd`无法计算完整的Jacobian行列式，但是我们仅仅想要Jacobian向量积，可以简单的将向量作为参数向后传递：


```python
v = torch.tensor([0.1,1.0,0.0001],dtype=torch.float)
y.backward(v)
print(x.grad)
```
    tensor([1.0240e+02, 1.0240e+03, 1.0240e-01])
    

你也可以通过使用`with torch.no_grad()`代码块包裹具有`.requires_grad=True`张量来停止追踪计算自动梯度


```python
print(x.requires_grad)
print((x ** 2).requires_grad)

with torch.no_grad():
    print((x ** 2).requires_grad)
```
    True
    True
    False
    
