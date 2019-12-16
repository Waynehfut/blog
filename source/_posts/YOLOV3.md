---
title: 利用YOLOV3训练自己的网络
date: 2018-03-26 18:51:17
tags: [论文阅读,神经网络,目标检测]
categories: 算法
---
最近，著名的目标检测方法，来自华盛顿大学Joseph团队的YOLO迎来了V3版本的更新，诸如国内的“海燕”等系统都能看到这个方法的影子，相较于上个版本的YOLO V2，其网络结构愈加复杂，令人惊叹的是，精度和检测速度都有了较大的提升。自己对目标检测方面并不如其他同学那么熟练，写此篇仅为记录用法：[Git repo](https://github.com/pjreddie/darknet)|[论文](https://pjreddie.com/media/files/papers/YOLOv3.pdf)|[官网](https://pjreddie.com/darknet/yolo/).

<!-- more -->

# 一、 配置编译
需要做的是：

1. 安装OpenCV,Cuda,cuDNN相关的框架。
2. 下载darknet的repo

```bash
git clone https://github.com/pjreddie/darknet
cd darknet
```

3. 修改darknet的make文件

```bash
CUDNN=1     # 开启cuDNN加速
GPU=1       # 开启GPU加速
OPENCV=1    # 开启OpenCV，支持视频检测
NVCC=/usr/local/cuda-8.0/bin/nvcc   #cudaz支撑库
```

4. make

```bash
make
```

# 二、 准备自己的数据

需要做的是：

1. 数据准备

需要准的文件有原始的图像及对应的标注，标注可以参考工具[LabelImg](https://github.com/tzutalin/labelImg)生成对应的XML(VOC格式)
基本格式如下：
```bash
---YourWorkPath             #工作目录
    |---Weights             #训练过程中保存的权重文件
        |---***.weights     #权重文件
    |---labels              #生成的YOLO相对位置格式的标记文件
        |---***.txt         #生成的YOLO格式标记文件
    |---JPEGImages          #原始的图片
        |---***.jpg         #相应图片
    |---ImageSets           #放置图片名称
        |---Main            #存放文件名称
            |---***.txt     #文件名文件
    |---Annotations         #VOC格式的标记
        |---***.xml         #VOC xml标记
```
2. 图片目录

可以通过使用

```bash
import glob
imgs = glob.glob('*.jpg')
outpur = []
out = open("./Main/train.txt",'w')
for item in imgs:
    item =item.split(".")[0]
    outpur.append(item)
    out.write(item+'\n')
print(outpur)
out.close()
```

获取到所有文件的文件名，并存为train.txt文件

3. 文件列表与标记

可以使用下述代码实现文件转存：

```bash
import xml.etree.ElementTree as ET
import pickle
import os
from os import listdir, getcwd
from os.path import join

#sets=[('2012', 'train'), ('2012', 'val'), ('2007', 'train'), ('2007', 'val'), ('2007', 'test')]

#classes = ["aeroplane", "bicycle", "bird", "boat", "bottle", "bus", "car", "cat", "chair", "cow", "diningtable", "dog", "horse", "motorbike", "person", "pottedplant", "sheep", "sofa", "train", "tvmonitor"]

sets=[('2007', 'train')]
classes = ["insulator"]


def convert(size, box):
    dw = 1./size[0]
    dh = 1./size[1]
    x = (box[0] + box[1])/2.0
    y = (box[2] + box[3])/2.0
    w = box[1] - box[0]
    h = box[3] - box[2]
    x = x*dw
    w = w*dw
    y = y*dh
    h = h*dh
    return (x,y,w,h)

def convert_annotation(year, image_id):
    in_file = open('VOC%s/Annotations/%s.xml'%(year, image_id))  
    out_file = open('VOC%s/labels/%s.txt'%(year, image_id), 'w')
    tree=ET.parse(in_file)
    root = tree.getroot()
    size = root.find('size')
    w = int(size.find('width').text)
    h = int(size.find('height').text)

    for obj in root.iter('object'):
        difficult = obj.find('difficult').text
        cls = obj.find('name').text
        if cls not in classes or int(difficult) == 1:
            continue
        cls_id = classes.index(cls)
        xmlbox = obj.find('bndbox')
        b = (float(xmlbox.find('xmin').text), float(xmlbox.find('xmax').text), float(xmlbox.find('ymin').text), float(xmlbox.find('ymax').text))
        bb = convert((w,h), b)
        out_file.write(str(cls_id) + " " + " ".join([str(a) for a in bb]) + '\n')

wd = getcwd()

for year, image_set in sets:
    if not os.path.exists('VOC%s/labels/'%(year)):
        os.makedirs('VOC%s/labels/'%(year))
    image_ids = open('VOC%s/ImageSets/Main/%s.txt'%(year, image_set)).read().strip().split()
    list_file = open('VOC%s/%s_%s.txt'%(year,year, image_set), 'w')
    for image_id in image_ids:
        list_file.write('%s/VOC%s/JPEGImages/%s.jpg\n'%(wd, year, image_id))
        convert_annotation(year, image_id.split('/')[-1])
    list_file.close()
```

此时数据准备才实际完成，示意如下:
![Tree](tree1.png)
![overview](overview.png)

4. 修改相关配置和权重

修改配置文件voc.data(位于darknet/script文件夹下，到对应的文件中)，如图：
![Voc](vocname.png)
可以在找到voc.data文件夹下再次寻找相应的权重配置文件依据你的分类数量不同，需进行修改，如图：
![cfg](cfg.png)
注意:有三个相同的位置需要修改，classes是对应的输出类别，而filter是你的卷积核数量，计算公式为`n = 3 * (classes + 5)`

# 三、训练

你现在可以在自己的机器上训练了，在此之前，请下载配置相应的预训练文件，以加速你的训练
`wget https://pjreddie.com/media/files/darknet53.conv.74`
之后进行训练：
`./darknet detector train scripts/VOCdevkit/VOC2007/voc.data scripts/VOCdevkit/VOC2007/myweights.cfg darknet53.conv.74`

> Everything will be ok, while you may need a lot of time on waitting.

欢迎打赏支持我的写作。