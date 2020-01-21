---
title: 使用Latex写论文之一：Latex简介
date: 2020-01-20 15:54:54
tags: [Latex]
categories: 技术
---

# 什么是$\LaTeX$

写论文的时候经常会有提及 $\LaTeX$，那什么是$\LaTeX$呢，维基百科这样说：
> $\LaTeX$（/ˈlɑːtɛx/，常被读作/ˈlɑːtɛk/或/ˈleɪtɛk/），是一种基于$\TeX$的排版系统，利用这种格式系统的处理，即使用户没有排版和程序设计的知识也可以充分发挥由$\TeX$所提供的强大功能。对于生成复杂表格和数学公式，这一点表现得尤为突出。因此它非常适用于生成高印刷质量的科技和数学、物理文档。

举例来说，我们可以使用以下代码实现一个排版精致的文档:

```tex
\documentclass{article}
\title{I am a title}
\author{Turing Burling}
\date{September 2020}
\begin{document}
   \maketitle
   \section{I am section}
   Hello world!, Let's start \LaTeX
\end{document}
```

便可以产生如图所示的效果

![示例图](https://s2.ax1x.com/2020/01/22/1kHVg0.png)

但是$\LaTeX$的文档大部分都是面向排版的，对于我这样的小白而言，只想写写论文水一水的样子，为了能够高效的摸鱼，我把我遇到的一些经验做个记录。

# 快速上手Latex

## 需要配置本地环境吗？

答案是，不一定。很多的教程都会在第一章提及经过如何如何的步骤，就可以安装好$\TeX$的本地环境。但是庞大的环境安装包（完整的texlive的镜像约3396 MB）往往会给简单尝试带来阻碍。

## 在线服务

除非你需要配置中文环境，选择在线服务是最好的，这里强烈推荐Overleaf [https://www.overleaf.com](https://www.overleaf.com)，一个非常适合写论文和协作的在线$\LaTeX$服务。其中囊括了大量的期刊模板，可以快速开始草稿的撰写，并且可以与包括IEEE,Springer, Taylor & Francis在内的等多家出版社的投稿系统对接，可以实现一键投稿（小声逼逼：虽然我从来不敢这么干~）

![Overleaf的界面](https://s2.ax1x.com/2020/01/22/1kHME4.png)

使用Overleaf最有利的可以直观的所见即所得，除非出现编译错误，大部分情况下不必“知其所以然”了，仅关注写作的内容即可，更重要的是，它支持富文本模式，可以像写Word一样来使用$\LaTeX$

![富文本模式](https://s2.ax1x.com/2020/01/22/1kHubF.png)

## 本地配置

当然，我们也有需要本地环境的时候。我的经验是，可以选择目前流行的texlive作为后端，前端可以按照个人习惯来，我这边推荐两个我用的比较多的环境。

### 安装texlive
   
   安装texlive可以选择在线安装或者是离线安装，如果你的网络比较强势（处于教育骨干网，或者是国外的网络），我推荐你直接下载在线安装器安装（约18MB）
   - Windows: http://mirror.ctan.org/systems/texlive/tlnet/install-tl-windows.exe
   - Linux & macOS: http://mirror.ctan.org/systems/texlive/tlnet/install-tl-unx.tar.gz
   
   当然，最稳妥的方式是下载完整的镜像，避免后续各种环境包缺失等问题。可以通过下述链接来下载完整的镜像（约3.6GB）https://ctan.org/mirrors ,其中中国大陆的镜像地址如下：

   - mirror.bjtu.edu.cn (北京交大) [http](http://mirror.bjtu.edu.cn/CTAN/) rsync://mirror.bjtu.edu.cn/CTAN/
   - mirror.lzu.edu.cn (兰州大学) [http](http://mirror.lzu.edu.cn/CTAN/)
   - mirrors.cqu.edu.cn (重庆大学)) [http](http://mirrors.cqu.edu.cn/CTAN/) 
   - mirrors.geekpie.club (上海极客派) [http](http://mirrors.geekpie.club/CTAN/) [https](https://mirrors.geekpie.club/CTAN/)
   - mirrors.hit.edu.cn (哈工大) [http](http://mirrors.hit.edu.cn/CTAN/) [https](https://mirrors.hit.edu.cn/CTAN/)
   - mirrors.huaweicloud.com (深圳华为云) [http](http://mirrors.huaweicloud.com/repository/toolkit/CTAN/) [https](https://mirrors.huaweicloud.com/repository/toolkit/CTAN/) 
   - mirrors.sjtug.sjtu.edu.cn (上海交大) [http](http://mirrors.sjtug.sjtu.edu.cn/ctan/) [https](https://mirrors.sjtug.sjtu.edu.cn/ctan/)
   - mirrors.tuna.tsinghua.edu.cn (清华)) [http](http://mirrors.tuna.tsinghua.edu.cn/CTAN/) rsync://mirrors.tuna.tsinghua.edu.cn/CTAN/
   - mirrors.ustc.edu.cn (科大) [ftp](ftp://mirrors.ustc.edu.cn/CTAN/) [http](http://mirrors.ustc.edu.cn/CTAN/) rsync://mirrors.ustc.edu.cn/CTAN/

   下载安装的过程一路无脑下一步即可，在此不表。

   需要注意的是，安装完成后请在命令行测试安装是否正常，运行$\TeX$命令：

   ![运行tex](https://s2.ax1x.com/2020/01/22/1kHwUH.png)

   如果提示这样的信息即安装完成：

   ![命令结果](https://s2.ax1x.com/2020/01/22/1kH05d.png)

   如果没有这样的信息，请检查环境变量是否囊括texlive的路径：

   ![环境变量](https://s2.ax1x.com/2020/01/22/1kHr8I.png)

### 在TexStudio中配置本地环境

   配置好后端后，对于大部分人而言，选择TexStudio是最好的选择，https://www.texstudio.org/ ，作为一个跨平台的客户端，它拥有着较好的交互界面，支持9+语言，对于新手更加友好，安装同样是无脑的下一步即可。安装完成后，可以从 `Options-Configure TeXstudio-General-Language` 中修改语言为中文：

   ![TexStudio修改中文](https://s2.ax1x.com/2020/01/22/1kHgr8.png)

   对于写论文的同学，还可以进一步在TexStudio中配置语言检查工具，从而避免单词错误，支持LibreOffice等文字编辑器的开源词典，路径为  `Options-Configure TeXstudio-Language Checking`:

   ![语法检查](https://s2.ax1x.com/2020/01/22/1kHWVg.png) 

   当然你还可以进一步的使用语句检查服务[languagetool](https://www.languagetool.org/)检查语法错误, 这里推荐知乎大佬的教程：https://zhuanlan.zhihu.com/p/38209314
   
### 在Visual Studio Code中配置本地环境

   作为一个半吊子码农，我还是更喜欢Visual Studio Code，它更加的纯粹和简单，只需安装下述插件即可：
   ![VSCodeTex插件](https://s2.ax1x.com/2020/01/22/1kHfaQ.png)

   之后侧边栏便会出现一个$\TeX$符号，让我们打开一个$\TeX$目录试试吧：

   ![实际操作](https://s2.ax1x.com/2020/01/22/1kHh5j.png)

   还是非常方便的，重要的是，它支持保存实时渲染，无需像TexStudio一样需要按F5刷新。

# 常见排版代码块

`需要注意的是，大部分文档都有其自定义的格式，我在这里并不会对特例进行讨论，只列出了大家常用的代码块`

一个文档基本由这样的结构构成

```tex
\documentclass{article}                %文件类型
\title{Title}                          %文件标题
\begin{document}                       %文档从此开始
	\maketitle                          %构建标题命令
	Hello world!, Let's start \LaTeX    %普通文本
\end{document}                         %文件结束
```
在此基础上，我们需要一堆小部件来对文件进行修饰，从而完成一个论文。

## 段落

### 摘要
在开始论文时，我们会需要分段，首先我们需要摘要：

```tex
\begin{abstract}
I am abstract
\end{abstract}
```

效果如图所示：

![摘要](https://s2.ax1x.com/2020/01/22/1kHzGR.png)

### 关键词

接着我们需要关键词：

```tex
\providecommand{\keywords}[1] % 大部分期刊的$\TeX$模板已经自定义了关键词的格式，我们这里使用一个最简单的自定义格式：
{
  \small	
  \textbf{\textit{Keywords---}} #1
}
\keywords{one, two, three, four}
```

效果如下所示：

![关键词](https://s2.ax1x.com/2020/01/22/1kbPsK.png)

### 节标题

节标题有依据的层级不同，包括`\section{}`,`\subsection{}`,`\subssubection{}`等：

```tex
\section{Introduction}
\subsection{Overview of the proposed method}
```

如图所示：

![节标题](https://s2.ax1x.com/2020/01/22/1kbAde.png)

### 致谢附录等特殊标题

此部分在不同的期刊都有不同的格式，需要就特定模板来撰写，这里我使用最简单的自定义标题：

```tex
\section*{Acknowledgement}
\section*{Appendix}
```

效果如下所示：

![Acknowledgement](https://s2.ax1x.com/2020/01/22/1kbKQP.png)

## 表
表，包括列表和表格等常见结构，这里我们



## 图

## 脚注

## 参考文献

## 


如果我们
# 一些技巧
