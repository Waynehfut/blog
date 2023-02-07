---
title: 利用Mask对数据进行处理 
date: 2018-12-26 18:40:26
tags: [基本概念,数据扩充]
categories: 技术
index_img: https://raw.githubusercontent.com/Waynehfut/blog/img/img/20220722174304.png
---

Mask,最早看到这个名词是在Mask R-CNN中，当时对这个Mask特别的朝圣，以为又有新的技术提出，实际上，Mask早在图像处理的最早阶段就已经开始有这方面的技术，而那个时候大家普遍将其称之为，掩膜。
<!-- more -->

## 1. Mask的基本用途


掩膜技术可以将其理解为盖了一层模子，大部分时候再处理图像数据时会有到比较多，不过对于文本数据，诸如数据缺失，或特殊位置异常值时，也可以使用掩膜技术对数据做处理。主流的掩膜技术有以下三种用途：

1. 提取感兴趣区域，掩膜作为感兴趣区域的内区域限定或外边界限定，对数据进行切分
2. 去除噪声数据，与1类似，一般用于数据中噪声分布均匀时
3. 结构数据提取，可以视作是1的拓展，如指定一个区域等，或是区域中的一个形状。
4. 特殊形状图片的制作，比如在ps中的抠图经常会用到这种方式

## 2. Mask的实现原理

以Python中的数组操作为例，

```python
data = np.array([[1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4]])
mask = np.array([[1, 0, 0, 1], [1, 0, 0, 1], [1, 0, 0, 1]])
mask = mask < 1
masked_data = data[mask]
print(masked_data)
```

输出

```bash
[[1 0 0 4]
 [1 0 0 4]
 [1 0 0 4]]
```

以上便是最简单的掩膜处理,事实上是对数据进行与操作，掩膜数据会首先转换为True,False形式数据，之后取所有True位置的数据

## 3. Numpy中的Mask

大部分情况下，上述方法已经满足了我们的需求了，但对于一些复杂操作是，从头手写的效率还是有点低，因此建议使用numpy的原有包numpy.ma以方便数据处理

参见包：`numpy.ma`  
_ma几乎重写了所有numpy的函数，因此对于mask的数据而言，使用ma包效率会更高_

```python
import numpy.ma as npm
import numpy as np

data = np.random.randint(1, 10, size=[1, 5, 5])
mask = data < 5
arr = npm.array(data, mask=mask)
print(arr)
```

Output:

```bash
[[[6 6 -- 8 --]
  [-- -- -- 6 7]
  [9 -- -- 6 9]
  [-- -- 5 -- 8]
  [6 9 -- 5 --]]]
```

此时与上述情况有所不同的是，数据中“被掩膜”的部分都存储为“--”。

或者我们可以简化操作，直接调用ma的array构造函数：

```python
>>> x = ma.array([1, 2, 3], mask=[0, 1, 0])
>>> x
masked_array(data=[1, --, 3],
             mask=[False,  True, False],
       fill_value=999999)
>>> x.data
array([1, 2, 3])
>>> x.recordmask
array([False,  True, False])
```

可以看出即使使用了ma进行操作，数据本身并没有变化，而是数据多存储了掩膜数据，对于高维数据而言，本身造成的内存占用并不推荐。更多信息，请参见[Link](https://docs.scipy.org/doc/numpy-1.15.1/reference/maskedarray.baseclass.html#numpy.ma.masked)

## 4. Mask实战

以下图为例，我们将实际对数据进行掩膜，以测试掩膜的影响。

```python
from keras.preprocessing.image import load_img, img_to_array, array_to_img
import numpy as np
import numpy.ma as npm

sample_img = img_to_array(load_img("sample.jpg"))

```

![sample](https://raw.githubusercontent.com/Waynehfut/blog/img/img/202207231609622.jpg)

我们尝试仅保存上半[0:30]像素的部分，设计得到的掩膜如下：

```python
data1 = np.ones([169, 169, 3])
data1[0:30, :, :] = 0
mask1 = data1 == 0
print("mask1", mask1.shape)
mask_img = array_to_img(mask1)
mask_img.save("mask.jpg")
```

![mask](https://raw.githubusercontent.com/Waynehfut/blog/img/img/202207231609702.jpg)

进行掩膜则有：

```python
mask_data = npm.array(sample_img, mask=mask1)
mask_data = mask_data.filled(fill_value=0)
print("mask_data", mask_data)
print(mask_data.shape)
rec_img = array_to_img(mask_data)
rec_img.save("masked.jpg")
```

![masked](https://raw.githubusercontent.com/Waynehfut/blog/img/img/202207231609395.jpg)