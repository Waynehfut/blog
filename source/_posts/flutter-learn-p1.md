---
title: 使用Flutter开发App
toc: true
date: 2020-07-09 21:39:33
tags: [flutter,Android]
categories: 代码
---

最近看了一些代码上的东西，偶然看到了Flutter，感觉他的代码很高级，而且调试起来很简单，所以想来尝试一下。我计划以一个图片浏览器为出发点来开始这个语言的学习，希望能继续下去。

<!-- more -->

# 配置flutter环境

参考[Flutter](https://flutter.dev/docs/get-started/install/linux)很容易配置好linux下面的环境。

## 检测安装

在配置过程中，可能会遇到android-license的问题，此时执行`lutter doctor --android-licenses`即可

安装好后，执行flutter doctor，可以得到

![flutter doctor](https://i.imgur.com/gbjdxWs.png)

就可以开始下一步的编写了。

# 开始新项目

我习惯用vscode来编写我的代码，此时，我们可以执行命令`flutter new project`

![new proj](https://i.imgur.com/2URumrB.png)

便可构建出一个模板项目

![temple hello](https://i.imgur.com/31MzbLz.png)

我们的主要逻辑也是在这个`main.dart`中执行的，按下F5我们便可以得运行。

![debug](https://i.imgur.com/r6qaNbr.png)

得到运行结果：
![run](https://imgur.com/LaDAFWL.png)