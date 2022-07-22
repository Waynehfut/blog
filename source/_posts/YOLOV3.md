---
title: 利用YOLOV3训练自己的网络
date: 2018-03-26 18:51:17
tags: [论文阅读,神经网络,目标检测]
categories: 算法
index_img: https://raw.githubusercontent.com/Waynehfut/blog/img/img/20220722175304.png
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

# 四、后记

今天拿到了一些可视化代码，我这边一并贴出来

```python
import numpy as np

# GRID0 = 13
# GRID1 = 26
# LISTSIZE = 85
GRID0 = 10
GRID1 = 20
LISTSIZE = 12
SPAN = 3
NUM_CLS = 7
MAX_BOXES = 2
OBJ_THRESH = 0.5
NMS_THRESH = 0.6

CLASSES = ("hand1", "hand2", "hand3", "hand4", "hand5", "hand6", "hand7")


def sigmoid(x):
    return 1 / (1 + np.exp(-x))


def process(input, mask, anchors):
    # 在这个函数中，我仍然以input_data0举例。在前面我们已经得到input_data0的维度是[10,10,3,12],mask是[3, 4, 5],
    # 所以这里面首先做的就是选择出对应的anchors
    print("--- hello,my.py process ----")
    anchors = [anchors[i] for i in mask]
    # 这里是切片出框的大小，input_data0的分割框是10*10,grid_h, grid_w对应也是10和10
    grid_h, grid_w = map(int, input.shape[0:2])
    # 这里处理的是候选框的置信度，使用sigmoid函数，具体请参考https://zhuanlan.zhihu.com/p/24990626
    # 目的是为了把数组中所有的数据映射到[0,1]区间，也就是我们所说的概率。
    # 通过此处我们可以得知，input_data0的第4个维度的第4个下标中存储了概率，因为<0,1,2,3>分别存储了中心点坐标和长宽，
    # 从而存储概率的向量input[..., 4]的维度为[10,10,3]，这是因为我们有3个archors，[10,10,3]中对应
    # 10*10的格子中，每个格子都有的3个archors的概率，即里面是否存在着物体的概率（box_confidence）。
    box_confidence = sigmoid(input[..., 4])
    # 这一步扩增一个维度，为了方便返回后处理。
    box_confidence = np.expand_dims(box_confidence, axis=-1)
    # 这步是截取了 input[..., 5:]维度是[10,10,3,7] 即此时的向量的第四个维度的后7个下标对应的是概率信息，因为我们的分类是7类。
    box_class_probs = sigmoid(input[..., 5:])

    # 正如之前说的，这里截取了input[..., :2],维度是[10,10,3,2]即每个框对应的左上角点位置,共10*10个区域，每个区域3个archors，
    # 每个archors的左上角点是两个值存储
    box_xy = sigmoid(input[..., :2])
    # 正如之前说的，这里截取了input[..., :2],维度是[10,10,3,2]即每个框对应的长宽,共10*10个区域，每个区域3个archors，
    # 每个archors的长宽是两个值存储
    box_wh = np.exp(input[..., 2:4])
    # 但是要注意的是，因为边框的预测时通过回归实现的，所以之前保存的都是缩放尺度，因此为了得到真正的边框大小，还需要额外乘以
    # archors原本的大小，才能得到被检测物体的真正大小。
    box_wh = box_wh * anchors

    # 这里做的就是构建grid=[10,10,3,2]维度的向量，来转换每个archors的左上角点坐标和archors大小
    col = np.tile(np.arange(0, grid_w), grid_w).reshape(-1, grid_w)
    row = np.tile(np.arange(0, grid_h).reshape(-1, 1), grid_h)
    col = col.reshape(grid_h, grid_w, 1, 1).repeat(3, axis=-2)
    row = row.reshape(grid_h, grid_w, 1, 1).repeat(3, axis=-2)
    grid = np.concatenate((col, row), axis=-1)
    # 因为这里的坐标是相对于该网格中的比例值，即从网格的左上角为原点的坐标系。
    # 因此，这里需要按照当前网格的中心点比值从将相对于每个网格转换为相对于整个图像（即移动一格比值加1）再除以格子数
    # 通过该box_xy += grid和box_xy /= (grid_w, grid_h)语句转换。
    box_xy += grid
    box_xy /= (grid_w, grid_h)
    # 将长宽转换为相对于整个图像的比例，这个图像是320*320的，所以要除以[320,320]
    box_wh /= (320, 320)
    # 将左上角坐标转换为中心点坐标
    box_xy -= (box_wh / 2.)
    # 将每个格子和每个坐标对应起来，得到的维度应该是[10,10,3,4]
    box = np.concatenate((box_xy, box_wh), axis=-1)

    return box, box_confidence, box_class_probs


def filter_boxes(boxes, box_confidences, box_class_probs):
    """Filter boxes with object threshold.

    # Arguments
        boxes: ndarray, boxes of objects.
        box_confidences: ndarray, confidences of objects.
        box_class_probs: ndarray, class_probs of objects.

    # Returns
        boxes: ndarray, filtered boxes.
        classes: ndarray, classes for boxes.
        scores: ndarray, scores for boxes.
    """
    # 这里就比较简单了，只要当前这个框预测出来的有物体且类别概率大于OBJ_THRESH就保留，否则就删除
    print("--- hello,my.py filter_boxes ----")
    # 计算每个archors有物体及其对应类别概率，尺度为[10,10,3,7]
    box_scores = box_confidences * box_class_probs
    # 选出每个archors预测出来类别（取最大概率）尺度为[10,10,3,1]
    box_classes = np.argmax(box_scores, axis=-1)
    # 选出每个archors预测的类所对应概率，尺度为[10,10,3,[3]]，最后一维存储的是一个维度为3的vector
    box_class_scores = np.max(box_scores, axis=-1)
    # 选取出大于阈值OBJ_THRESH的下标，这里只有三个下标，实际上分别对应着第一个维度，第二个维度和第三个维度。请参考
    #  np.where   https://www.zhihu.com/question/62844162/answer/300561552
    pos = np.where(box_class_scores >= OBJ_THRESH)

    # 依据pos选取对应的框[中心点，长宽]，类别和相应的预测概率，注意此处使用的pos是一个tuple
    boxes = boxes[pos]
    classes = box_classes[pos]
    scores = box_class_scores[pos]

    return boxes, classes, scores


def nms_boxes(boxes, scores):
    """Suppress non-maximal boxes.

    # Arguments
        boxes: ndarray, boxes of objects.
        scores: ndarray, scores of objects.

    # Returns
        keep: ndarray, index of effective boxes.
    """
    # 非极大值抑制请参考https://zhuanlan.zhihu.com/p/37489043
    # 是为了去掉预测结果中可能重叠的框。
    print("--- hello,my.py nms_boxes ----")
    x = boxes[:, 0]
    y = boxes[:, 1]
    w = boxes[:, 2]
    h = boxes[:, 3]

    areas = w * h
    order = scores.argsort()[::-1]

    keep = []
    # 通过计算重叠面积来剔除较小概率的框，并且不断重复这一过程，直到将所有框遍历完。
    while order.size > 0:
        i = order[0]
        keep.append(i)

        # 计算单个面积
        xx1 = np.maximum(x[i], x[order[1:]])
        yy1 = np.maximum(y[i], y[order[1:]])
        xx2 = np.minimum(x[i] + w[i], x[order[1:]] + w[order[1:]])
        yy2 = np.minimum(y[i] + h[i], y[order[1:]] + h[order[1:]])

        w1 = np.maximum(0.0, xx2 - xx1 + 0.00001)
        h1 = np.maximum(0.0, yy2 - yy1 + 0.00001)
        inter = w1 * h1
        # 计算重叠面积
        ovr = inter / (areas[i] + areas[order[1:]] - inter)
        inds = np.where(ovr <= NMS_THRESH)[0]
        order = order[inds + 1]
    keep = np.array(keep)
    return keep


def yolov3_post_process(input_data):
    print("--- hello,my.py yolov3_post_process ----")
    # yolov3
    # 这里分别定义了mask和archors，mask决定了使用哪些archors，而archors则是指定了待检测物体可能的长和宽。
    # 正如前面所说的，分割的框越小，对小物体检测精度越高，因此这边对影两个input_data0和input_data1使用的mask是不一样的
    # input_data0使用的mask是[3, 4, 5]，也就是archors是[205,283],  [153,240],  [145,308]，也就意味着检测[10,10,3,12]
    # 这样的形式输入时，使用的archors更大。相对应的， input_data1使用的mask是[0, 1, 2]，
    # 使用的archors是[88,275],  [140,161],  [113,291], 这就意味检测[20,20,3,12]这样的输入时需要的archors更小。
    masks = [[3, 4, 5], [0, 1, 2]]
    anchors = [[88, 275], [140, 161], [113, 291], [205, 283], [153, 240], [145, 308]]

    # 这块处理了yolo内部的预测结果
    boxes, classes, scores = [], [], []
    for input, mask in zip(input_data, masks):
        # 在这个循环中，实际上是分别预测两个结果的，我这里就解释其中一个循环的计算了
        # 以第一个循环为例，它使用的数据是input_data0,对应的mask是[3, 4, 5],archors虽然全部传入了process函数，
        # 但是后面只需要使用[205, 283], [153, 240], [145, 308]这三个archors，细节请跳转到process函数查看。
        b, c, s = process(input, mask, anchors)
        # 在对每个格子都得到了对应的3个archors之后，需要进一步过滤检测到的目标，细节请跳转到filter_box查看。
        b, c, s = filter_boxes(b, c, s)
        boxes.append(b)
        classes.append(c)
        scores.append(s)
    # 以上找完了两个文件的所有框，之后进行一次拼接
    boxes = np.concatenate(boxes)
    classes = np.concatenate(classes)
    scores = np.concatenate(scores)

    # 因为两次预测结果会有很多框，所以我们会使用nms（非极大值抑制）来找出最有可能的框和对应的类别
    # 对于每个类别所对应的所有框我们都进行一次遍历，如果通过了nms的要求，就保留，否则提出
    nboxes, nclasses, nscores = [], [], []
    for c in set(classes):
        inds = np.where(classes == c)
        b = boxes[inds]
        c = classes[inds]
        s = scores[inds]

        keep = nms_boxes(b, s)

        nboxes.append(b[keep])
        nclasses.append(c[keep])
        nscores.append(s[keep])

    if not nclasses and not nscores:
        return None, None, None
    # 筛选过后的预测框，类别和对应精度。因为存在多个框的可能，所以还要做一次拼接。
    boxes = np.concatenate(nboxes)
    classes = np.concatenate(nclasses)
    scores = np.concatenate(nscores)

    return boxes, classes, scores


def main(input0_data, input1_data):
    print("--- hello,my.py main ---")
    print(input0_data)
    print(input1_data)
    # 将txt数据转换为np数组，txt数组的意义我还不知道，目前是3600,1维度
    matrix = np.array(input0_data)
    matrix1 = np.array(input1_data)
    print("--- hello,my.py main ---matrix")
    print(matrix)
    # 这步重新变形了数组，从[3600,1]变成了[3,12,10,10],分别对应[SPAN, LISTSIZE, GRID0, GRID0]
    input0_data = matrix.reshape(SPAN, LISTSIZE, GRID0, GRID0)
    # 这步重新变形了数组，从[3600,1]变成了[3,12,20,20],分别对应[SPAN, LISTSIZE, GRID0, GRID0]
    input1_data = matrix1.reshape(SPAN, LISTSIZE, GRID1, GRID1)
    # input0和input1是两个不同的预测尺度，理论上分割的格子越小对小物体的预测精度越高。
    print("--- hello,my.py main ---input1_data")

    input_data = []
    # 这个步骤是转换了维度顺序，类似矩阵的转置，将原先的[3,12,10,10]转换为[10,10,3,12],但是input_data里面存的还是两个单独的向量
    # 维度分别为[10,10,3,12]和[20,20,3,12]
    input_data.append(np.transpose(input0_data, (2, 3, 0, 1)))
    input_data.append(np.transpose(input1_data, (2, 3, 0, 1)))

    print("--- hello,my.py main ---input_data")
    # print(input_data)
    # 这一步开始yolo的后处理
    boxes, classes, scores = yolov3_post_process(input_data)
    draw(boxes, scores, classes)
    print (boxes)
    print (classes)
    print (scores)
    return classes, scores


def draw( boxes, scores, classes):
    """Draw the boxes on the image.

    # Argument:
        image: original image.
        boxes: ndarray, boxes of objects.
        classes: ndarray, classes of objects.
        scores: ndarray, scores of objects.
        all_classes: all classes name.
    """
for box, score, cl in zip(boxes, scores, classes):
    x, y, w, h = box
    print('class: {}, score: {}'.format(CLASSES[cl], score))
    print('box coordinate left,top,right,down: [{}, {}, {}, {}]'.format(x, y, x+w, y+h))
    # cv2.rectangle(image, (top, left), (right, bottom), (255, 0, 0), 2)
    str='{0} {1:.2f}'.format(CLASSES[cl], score)
    print (str)
cv2.putText(image, '{0} {1:.2f}'.format(CLASSES[cl], score),
            (top, left - 6),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.6, (0, 0, 255), 2)


output0 = np.loadtxt('output0.txt')
output1 = np.loadtxt('output1.txt')
classes, scores = main(output0, output1)
print(classes, scores)
```