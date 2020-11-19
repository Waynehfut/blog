---
title: XML解析简介
date: 2019-03-18 17:24:27
tags: [基本概念]
categories: 技术
---
XML作为一种常见的数据交换格式，在数据交换中扮演了重要的角色，但是开放的数据格式定义也为XML的解析带来了一定的不确定性，我在实际的工作里遇到了一定的小困难，在此记录以备查阅。
<!-- more -->

# 本文XML的限定

在开始`XML`解析相关方法之前，我想对本文所提及的XML做一个简单限定。XML（Extensible Markup Language）中文全称可拓展标记语言。其变体在众多领域都有应用，如：数据交换、页面显示等。广为人知的`HTML`就是一种符合`XML`标准的语言。本文仅讨论用于数据交换的`XML`，其格式定义为`<key>value</key>`或`<key attribute="value1">value</key>`此类的开闭代码块以并联和串联的方式所构建的文本记录，不用于数据展示。常见于图片标记或是序列化数据标记，依据组合方式和key-value组合，可以完成多种复杂数据的定义。例如下面的文本：
```xml
<?xml version='1.0' encoding='utf-8'?>
<tagDocument>
    <numberOfFrames id="2">1</numberOfFrames>
    <frame>
        <PositionIndex>1575</PositionIndex>
        <tool>208 268 64.844827 5.848515</tool>
        <tool>123 174 43.747142 4.022589</tool>
    </frame>
</tagDocument>
```

# Python中解析XML

在`python`中，`XML`的解析实现的方式有很多，但是综合我的实践结果。我对这些方法做出以下取舍：

## 1. `xml.dom.*`

`xml.dom.*`包是一个符合W3C关于XML定义的DOM API，它实现的过程是首先将整个文档视为一个树，通过依次访问相邻节点和子节点的方式实现数据解析的。上述XML我们的解析代码如下：
```python
def get_xml_data(filename='test.xml'):
    dom_tree = xdom.parse(filename)
    collection = dom_tree.documentElement  # 获取根节点
    nums_frame = collection.getElementsByTagName('numberOfFrames')[0].firstChild.data  # 以名称的方式获取第一个子节点值
    id_s=collection.getElementsByTagName('numberOfFrames')[0].getAttribute("id") #以名称方式获取子节点的属性
    frame_nodes = collection.getElementsByTagName('frame')  # 获取所有名称为frame的节点
    pos_dict = {}
    for node in frame_nodes: #所有的frame节点都是一个小型的树状结构
        frame_name =node.getElementsByTagName('PositionIndex')[
            0].firstChild.data  # 获取树状结构的第一个节点值
        tools = node.getElementsByTagName('tool') # 在frame内部选取所有的tool的内容
        tool_array = []
        for tool in tools:
            tool_pos = tool.firstChild.data  # 遍历tool列表
            tool_array.append(tool_pos)
        pos_dict[frame_name] = tool_array
    return nums_frame, pos_dict
```
这样的方式在实现时可以提高你对代码的可控性，对于有一定格式的数据而言，可以通过这样的方式来实现，但相应的缺点便是其效率比较低。

## 2. `xml.sax.*`

`xml.sax.*`是比`xml.dom.*`更加低层级的实现，以事件驱动的方式带来了更高的实现效率。但是也带了编写代码的不便性，同样以前文的xml为例，我们的解析代码为：
```python
import xml.sax.handler
class DataHandler(xml.sax.ContentHandler):# 重写内容处理类，必须实现startElement,endElement,characters三个成员函数。
    def __init__(self):
        self.id_s = ""
        self.frames = ""
        self.tool_array = []
        self.index_array = []

    def startElement(self, tag, attrs): #标签开始，一般用以处理Attribute
        self.CurrentData = tag
        if tag == 'numberOfFrames':
            self.id_s = attrs['id']

    def endElement(self, tag): # 标签结束，一般用于处理value值
        if self.CurrentData == "numberOfFrames":
            self.frames = self.numberOfFrames
        elif self.CurrentData == "PositionIndex":
            self.index_array.append(self.PositionIndex)
        elif self.CurrentData == "tool":
            if not self.tool.isspace():
                self.tool_array.append(self.tool)

    def characters(self, content): # 统一的value处理函数，以简化endElement函数
        if self.CurrentData == "PositionIndex":
            self.PositionIndex = content
        elif self.CurrentData == "numberOfFrames":
            self.numberOfFrames = content
        elif self.CurrentData == "tool":
            self.tool = content


parser = xml.sax.make_parser() # 解析器初始化
parser.setFeature(xml.sax.handler.feature_namespaces, 0)# 占位符
handler = DataHandler() # 实例化处理器
parser.setContentHandler(handler) # 重写处理器
parser.parse("test.xml")
print(handler.tool_array, handler.index_array)
```
可以看出，这个实现方式非常的复杂，那有没有效率与代码兼顾的呢？

## 3. `xml.etree.ElementTree`
`xml.etree.ElementTree`是一个比`SAX`层级高，比`DOM`效率高的解析包，相对于前两者而言，`ElementTree`有着更加高效的处理效率和简洁的接口，同时还有对应的C实现：`xml.etree.cElementTree`，工程中，我更推荐这个方法，同样对于前文的方法，我们有：
```python
import xml.etree.cElementTree as ET
tree = ET.ElementTree(file='test.xml') # 获取根节点
root = tree.getroot()
frames = root.iter(tag="numberOfFrames") # 遍历numberOfFrames
pos_index_array=[]
pos_array=[]
for children in root.iter(tag="frame"): # 遍历frame节点
    for child in children.iter(tag="PositionIndex"):
        pos_index_array.append(child.text)
    for child in  children.iter(tag="tool"):
        pos_array.append(child.text)
print(pos_index_array,pos_array)
```
效率与代码整洁度都有保证

# Java中解析XML

# C++中解析XML