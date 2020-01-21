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
表，包括列表和表格等常见结构，这里我们以最简单的格式做例子：

### 无序号列表

```tex
\begin{itemize}
    \item item 1
    \item item 2
\end{itemize}
```

效果如下：

![无序列表](https://s2.ax1x.com/2020/01/22/1kbQL8.png)

### 有序化列表

```tex
\begin{enumerate}
   \item item 1
   \item item 2
\end{enumerate}
```

效果如下：

![有序列表](https://s2.ax1x.com/2020/01/22/1kb3dg.png)

### 普通表格

这里展示了一个没有任何效果的表格环境{table}，使用`{tabular}`来声明表格区域，之后紧接着的是每一列对其方式，`l`,`c`,`r`分别代表居左，居中，居右，我们使用`&`符号来分割各个单元格，使用`\\`来分隔各个行，

```tex
\begin{table}[]
   \begin{tabular}{ c c c }
      cell1 & cell2 & cell3 \\ 
      cell4 & cell5 & cell6 \\  
      cell7 & cell8 & cell9    
   \end{tabular}
\end{table}
```

效果如下：

![空白表格](https://s2.ax1x.com/2020/01/22/1kb8oQ.png)

如果我们要加一些线条，可以使用三线表格。

### 三线表格

我们可以使用`\hline`命令来增加横线：

```tex
\begin{table}[]
   \begin{tabular}{ c c c }
      \hline
      cell1 & cell2 & cell3 \\ 
      \hline
      cell4 & cell5 & cell6 \\  
      cell7 & cell8 & cell9 \\ 
      \hline
   \end{tabular}
\end{table}
```

效果如下：

![三线表格](https://s2.ax1x.com/2020/01/22/1kbYJs.png)

当然，我们有时候需要网格化表格：

### 网格表格

网格化表格，只需要增加竖向内容控制符即可，但是，往往我们还需要合并表格单元格。我们可以使用`\multicolumn`或者`\multirow`来控制单元格，这里我们把我们需要合并的单元格视作一个元素，后接需要合并的行或者列数（如这里的{2}），之后再跟上控制内容（如这里的{|c|}和{*}），最后紧接着单元格内容，注意，当使用了列合并时，一定要使用`\usepackage{multirow}`包，并控制合并行的线条，否则会出现渲染错误的问题

```tex
\begin{table}[]
    \begin{tabular}{|c|c|c|}                 %控制表格对其方式
    \hline                                   %划线
    \multicolumn{2}{|c|}{cell1} & cell3    \\ \hline     %合并行
    cell4 & cell5 & \multirow{2}{*}{cell6} \\ \cline{1-2}   %合并列，注意使用了\cline来控制合并后的线条
    cell7 & cell8 &                        \\ \hline
    \end{tabular}
\end{table}
```

效果如下：

![复合表格](https://s2.ax1x.com/2020/01/22/1kbwLT.png)

### 标题及标签

对于表格而言，我们还需要的是标题和标签，以在正文中引用，我们使用`\caption{}`和`\lable{}`来控制内容，注意只能将`caption`和`label`标签放置于`tabular`结构体外部，当`caption`存在于`\begin{taular}`之前时，注释将存在表格之前，当在`\end{tabular}`之后时，将出现在表格下方，一个好的实践是将`label`和`caption`放在一起：

```
\begin{table}[]
	\caption{I am sample table} %显示在表格上的标记
	\label{tab1sample}          %用于正文引用的标签
	\begin{tabular}{|c|c|c|}
		\hline
		\multicolumn{2}{|c|}{cell1} & cell3    \\ \hline
		cell4 & cell5 & \multirow{2}{*}{cell6} \\ \cline{1-2}
		cell7 & cell8 &                        \\ \hline
	\end{tabular}
\end{table}
```

效果如下：

![引用表格](https://s2.ax1x.com/2020/01/22/1kbDwF.png)

如果我们在正文中使用了表格，那我们以`~\ref{label}`方式来实现引用，如：

```tex
I will ref the table here~\ref{tab1sample}
```

效果如下：

![引用表格](https://s2.ax1x.com/2020/01/22/1kbro4.png)

但是我们看到这里还是非常的丑，表格和标题都是歪着的，这时，我们可以使用`\centering`命令开控制`{tabular}`结构体：

```tex
\begin{table}[]
	\caption{I am sample table}
	\label{tab1sample}
	\centering
	\begin{tabular}{|c|c|c|}
		\hline
		\multicolumn{2}{|c|}{cell1} & cell3    \\ \hline
		cell4 & cell5 & \multirow{2}{*}{cell6} \\ \cline{1-2}
		cell7 & cell8 &                        \\ \hline
	\end{tabular}
\end{table
```

效果如下：

 ![表格居中](https://s2.ax1x.com/2020/01/22/1kb6Y9.png)


### 位置控制符

我有时候希望表格的位置可以更加精确的显示在某个页面上，此时，我们可以使用精确的位置控制符，位置控制符对于任何的结构都适用，但是大部分情况下是用在表和图中，以下列举了常用的5个命令，需要注意的是，这些命令可以叠加，以防某个命令不可用时导致的布局错误。（小声逼逼：以下命令组合的效果请自行尝试啦，图表排版可以说是论文最烦人的部分了）

- h:
   会立即在当前位置显示表格；
- t:
   会在当前页面的顶端显示；
- b:
   会在当前页面的低端显示；
- p:
   会在特定面（当前）显示，仅适用于表格；
- !:
   覆盖预定义显示方式；
- H:
   把表格放置在精确的位置，效果于`h!`叠加类似；

### 其他补充

1. 对于部分期刊，如IEEE,有双栏的情况，如果希望跨栏，则将`{table}`环境修改为`{table*}`即可；
2. 表格的创建非常麻烦，推荐[Tex Table Generator](http://www.tablesgenerator.com/)来直接生成。


## 图

## 脚注

## 参考文献

## 


如果我们
# 一些技巧
