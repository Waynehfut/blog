---
title: ROC和AUC的理解
date: 2018-08-23 17:13:37
tags: [基本概念]
categories: 技术
toc: true
index_img: https://raw.githubusercontent.com/Waynehfut/blog/img/img/20220722175007.png
---
本篇主要解释了ROC和AUC的定义来源，希望能让自己更清楚这些指标。

<!-- more -->

# ROC

## 一、基本定义及理解

ROC曲线全称是受试者工作特征曲线(Receiver Operating Characteristic curve). ROC 曲线上的每个点都反映着对同一信号刺激的感受性。需要注意的是，ROC的定义仅对于二分类，如果需要多分类，需要进行转换，后续会继续补充。

- **横轴**是负正类率(false positive rate aka. **FPR**)即划分的例子中所有负例占所有负例的比例，其实就是特异度。
- **纵轴**是真正类率(True postive rate aka. **TPR**)也叫灵敏度。



要绘制这两个轴线，还需要四个概念

- TP(True Postive)正类被预测为正类
- FN(False Negative)正类被预测为负类
- FP(False Postive)负类被预测为正类
- TN(True Negative)负类被预测为负类

他们常被表示为混淆矩阵：

&nbsp;| 预测真 |预测假
---|---|---
**真实真**|TP|FN
**真实假**|FP|TN

当然TP和TN的所占比例越高则所设计的模型效果更好。

为此

- **TPR=TP/(TP+FN) 也称Sensitivity**
- FNR=FN/(TP+FN) 也称漏诊率
- **FPR=FP/(FP+TN) 也称误诊率**
- TNR=TN/(FP+TN) 也称Specificity

以一个例子来说明：

假设存在一个数据标签为：[0,1,0,1]
经过模型的预测后得到的对每个类别的预测为[0.1,0.35,0.4,0.8]的概率认为他是属于标签1的则依据前述的定义有：
新的四个混淆矩阵（注意：ROC曲线绘制的时候是以所有数据的预测结果的概率作为阈值，并从小到大进行排序，从而得到多个新的混淆矩阵）从而我们有新的混淆矩阵为

&nbsp;| 预测真 |预测假
---|---|---
**真实真**|2|0
**真实假**|2|0

- TPR = 2/(2+0) = 1
- FPR = 2/(2+0) = 1

&nbsp;| 预测真 |预测假
---|---|---
**真实真**|2|0
**真实假**|1|1

- TPR = 2/(2+0) = 1
- FPR = 1/(1+1) = 0.5

&nbsp;| 预测真 |预测假
---|---|---
**真实真**|1|1
**真实假**|1|1

- TPR = 1/(1+1) = 0.5
- FPR = 1/(1+1) = 0.5

&nbsp;| 预测真 |预测假
---|---|---
**真实真**|1|1
**真实假**|0|2

- TPR = 1/(1+1) = 0.5
- FPR = 0/(0+2) = 0

即：
FPR:[1,0.5,0.5,0]
TPR:[1,1,0.5,0.5]
则我们新的ROC图可以画出为：

![clipboard.png](https://raw.githubusercontent.com/Waynehfut/blog/img/img/202207231612921.png)

**意义**：分析ROC曲线的主要从两个方面来解释：1）曲线本身的平滑程度，当一条曲线足够平滑的时候，这个预测模型的过拟合可能就会越小，可以理解为模型在预测的过程中受到特殊数据的影响较小。2）曲线本身接近([0,0],[0,1])和([0,1],[1,1])这两条线的程度，越接近说明方法本身预测的效果越好，可以理解为TP值很小的时候，FP值很小，从而不被错误数据误导，TP值很大的时候，FP值仍很小，从而证明模型可以正确的分类，而这一效果本身已经被量化，请参阅下节AUC;

## 二、利用Python绘制ROC曲线

除此之外，理解了初步的定义之后，在实际的使用中并不是需要手动的计算，Python中的Sklearn包中已经提供了相关的计算和绘图方法（[官方链接](http://scikit-learn.org/stable/modules/generated/sklearn.metrics.roc_curve.html/)）

具体使用中可以参考官方的做法,一个最简单的示例如下：

```python
import numpy as np
from sklearn import metrics
import matplotlib.pyplot as plt
y = np.array([1, 1, 2, 2])
scores = np.array([0.1, 0.4, 0.35, 0.8])
fpr, tpr, thresholds = metrics.roc_curve(y, scores, pos_label=2)
plt.plot(fpr,tpr,'b')
plt.xlim([-1, 1])
plt.ylim([-1, 1])
plt.show()
```

可以得到：
![figure_1-1.png](https://raw.githubusercontent.com/Waynehfut/blog/img/img/202207231612137.png)

## 三、多类分类的ROC曲线绘制

一个值得注意的问题是，最初ROC是面向二分类所提出的。目前对于多分类的ROC曲线绘制并没有一致的说法，即使是在较新的文献中，ROC也仅仅是对于某个二分类所提出的，可以理解为将多分类的每个类别认为是二分类，则可以将原问题转换为0-1的二分类问题，举个例子来解释：

> 假设存在一个四分类问题，其分类的标签目标分别记为：[A,B,C,D],则对于标签A的分类进行ROC曲线绘制时，将B,C,D三个类别的分类全部置为0，将A标签的分类置为1，则将其转换为了二分类问题。对于B,C,D标签同理，而同样的在sklearn中也提供了对应的代码方式实现这样的ROC曲线绘制,可以绘制出类似下述图像的ROC曲线([来源](http://scikit-learn.org/stable/auto_examples/model_selection/plot_roc.html)):

![myplot.png](https://raw.githubusercontent.com/Waynehfut/blog/img/img/202207231612495.png)
```python

# -*- coding: utf-8 -*-
"""
-------------------------------------------------
   File Name：       roc-multi on daily-test
   Description :
   Author :          wayne
   Date:             18-10-11
   Create by :       PyCharm
   Check status:     https://waynehfut.github.io
-------------------------------------------------
"""
import numpy as np
import matplotlib.pyplot as plt
from itertools import cycle

from sklearn import svm, datasets
from sklearn.metrics import roc_curve, auc
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import label_binarize
from sklearn.multiclass import OneVsRestClassifier
from scipy import interp

# Import some data to play with
iris = datasets.load_iris()
X = iris.data
y = iris.target

# Binarize the output
y = label_binarize(y, classes=[0, 1, 2])
n_classes = y.shape[1]

# Add noisy features to make the problem harder
random_state = np.random.RandomState(0)
n_samples, n_features = X.shape
X = np.c_[X, random_state.randn(n_samples, 200 * n_features)]

# shuffle and split training and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=.5,
                                                    random_state=0)

# Learn to predict each class against the other
classifier = OneVsRestClassifier(svm.SVC(kernel='linear', probability=True,
                                 random_state=random_state))
y_score = classifier.fit(X_train, y_train).decision_function(X_test)
print(y_test)
print(y_score)
# 读取各个子类的fpr和tpr,其计算时数据格式为y_test=[[1,0,0],[0,0,1],...,[0,1,0]],y_score=[[score1,score2,score3],...,[scoren1,scoren2,scoren3]]
fpr = dict()
tpr = dict()
roc_auc = dict()
for i in range(n_classes):
    fpr[i], tpr[i], _ = roc_curve(y_test[:, i], y_score[:, i])
    roc_auc[i] = auc(fpr[i], tpr[i])
lw = 2 #线条粗细
colors = cycle(['aqua', 'darkorange', 'cornflowerblue'])
for i, color in zip(range(n_classes), colors):
    plt.plot(fpr[i], tpr[i], color=color, lw=lw,
             label='ROC curve of class {0} (area = {1:0.2f})'
             ''.format(i, roc_auc[i]))

plt.plot([0, 1], [0, 1], 'k--', lw=lw)
plt.xlim([0.0, 1.0])
plt.ylim([0.0, 1.05])
plt.xlabel('False Positive Rate')
plt.ylabel('True Positive Rate')
plt.title('Some extension of Receiver operating characteristic to multi-class')
plt.legend(loc="lower right")
plt.show()
```

# AUC

为什么把AUC和ROC放在一起说呢，因为AUC的定义既是ROC的进一步，在上节的图例中可以看到的是当预测精度十分高的时候ROC曲线会无限接近于([0,0],[0,1])和([0,1],[1,1])这两条线。因此前文所述ROC曲线的意义可以以AUC这一量化指标予以确定。

## 计算方式

最直接的计算方式是将曲线下面积通过坐标进行计算，还是以上文简单的例子计算。
对于：
FPR:[1,0.5,0.5,0]
TPR:[1,1,0.5,0.5]
则有AUC计算结果如下：

0.5*(0.5-0)+1*(1-0.5)=0.75

## python实现

在Python中对于AUC的实现仍然在sklearn中，可以实现的示例如下：

```python
import numpy as np
from sklearn import metrics
y = np.array([0,1,0,1])
pred = np.array([0.1, 0.35, 0.4, 0.8])
fpr, tpr, thresholds = metrics.roc_curve(y, pred, pos_label=1)
print(metrics.auc(fpr, tpr))
```

输出为0.75.
