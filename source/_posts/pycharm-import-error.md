---
title: 解决Pycharm中的Unresolved Reference "XXX"的问题
date: 2019-11-25 17:36:21
tags: [代码记录]
categories: 代码
comments: true
---

在折腾Pycharm时有时候会遇到`Unresolved Reference "XXX"`的问题，而这个问题是由于自定义文件夹没有包括到索引导致的。
<!-- more -->
如图

![错误图](https://raw.githubusercontent.com/Waynehfut/blog/img/img/20201124203140.png)

这个经常发生在自定义文件夹的情况中

![错误原因](https://raw.githubusercontent.com/Waynehfut/blog/img/img/20201124203157.png)

问题原因是Pycharm没有识别出这个文件夹哪些文件该索引，因此我们在需要索引的文件夹里。

如下图修改即可：

![设置根目录](https://raw.githubusercontent.com/Waynehfut/blog/img/img/20201124203214.png)