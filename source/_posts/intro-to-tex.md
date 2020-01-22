---
title: 使用Latex写论文之一：Latex快速上手与基础教程
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

## 作者单位

使用`\author`即可注明作者，但是对于大部分的期刊而言，单位等格式都已经指定了固定格式，这里我们使用最简单的`authblk`包作为示例,`\usepackage{authblk}`，需要注意的是，作者信息也是作为题目的一部分，故而，我们需要在\maketitle之前使用这样的命令，此外，如果需要对作者进行标注（如邮箱或者通讯作者，在作者后增加`\thanks`命令即可）：

```tex
\renewcommand\Affilfont{\itshape\small}
\author[1]{Hao~Wang, Sherleen~Zhu \thanks{Happy everyday}}%
\author[2]{Turling Burling}
\affil[1]{Hefei University of Technology}
\affil[2]{University of Pittsburgh}	
\maketitle
```

效果如下：

![作者](https://s2.ax1x.com/2020/01/22/1kbvm8.png)

脚注：

![脚注](https://s2.ax1x.com/2020/01/22/1kq9Yj.png)


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

- h:  会立即在当前位置显示表格；
- t:  会在当前页面的顶端显示；
- b:  会在当前页面的低端显示；
- p:  会在特定面（当前）显示，仅适用于表格；
- !:  覆盖预定义显示方式；
- H:  把表格放置在精确的位置，效果于`h!`叠加类似；

### 其他补充

1. 对于部分期刊，如IEEE,有双栏的情况，如果希望跨栏，则将`{table}`环境修改为`{table*}`即可；
2. 表格的创建非常麻烦，推荐[Tex Table Generator](http://www.tablesgenerator.com/)来直接生成。

## 图

### 无子图的图片

相较于表格，图片相对简单。我对图片的创建就不多说了，一般我在latex中使用的是矢量的`pdf`或者`eps`文件，注意使用pdf时，需要导入相应的包，如：`\usepackage[pdftex]{graphicx}`，一个较好的实践是将所有的图都放到一个位置（如:`pic`文件夹），同时我们仍然可以使用`\centering`控制居中。当我们加载一个图片时，可以使用`\includegraphics[大小控制]{图片源}`来控制显示图片。

```tex
\begin{figure}[!t]
	\centering
	\includegraphics[width=1.13in]{pic/1-1}
	\caption{I am sample figure.}
	\label{fig1sample}
\end{figure}
```

效果如下：

![图片示例](https://s2.ax1x.com/2020/01/22/1kbcWR.png)

当然我们可以把一堆图片复合到一起：

```tex
\begin{figure}[!t]
	\centering
	\includegraphics[width=1.13in]{pic/1-1}
	\includegraphics[width=1.13in]{pic/1-1}
	\includegraphics[width=1.13in]{pic/1-1}
	\caption{I am sample figure.}
	\label{fig1sample}
\end{figure}
```

效果如下：

![复合图](https://s2.ax1x.com/2020/01/22/1kbWy6.png)

### 带子图的图片

有时候，实验会有好多个图，我需要把这些图复合在一起，这里我习惯使用`subfig`包，如：`\usepackage{subfig}`，使用时可以参考以下例子：

```tex
\begin{figure}[!t]
	\centering
	\subfloat[]{
		\includegraphics[width=1.6in]{pic/1-1}
	}
	\subfloat[]{
		\includegraphics[width=1.6in]{pic/1-1}
	}
	\quad 
	\subfloat[]{
		\includegraphics[width=1.6in]{pic/1-1}
	}
	\subfloat[]{
		\includegraphics[width=1.6in]{pic/1-1}
	}
	\caption{combine 4 picture}
	\label{fig2combine}
\end{figure}
```

效果如下：

![compact图片](https://s2.ax1x.com/2020/01/22/1kbTFH.png)


## 脚注

类似 [作者单位](##作者单位)部分，我们可以使用`\footnote`命令来实现，如下所示：

```tex
\footnote{Hope must come true}.
```

效果如下:

![角标](https://s2.ax1x.com/2020/01/22/1kqutJ.png)

## 算法

有时，我们会描述算法结构，这里我们需要导入`algorithm2e`或`algorithmic`包，具体的包存在细节上的不同，我们在此简单写一些示例，具体使用时还需要自行查找文档[algorithm2e文档](http://tug.ctan.org/macros/latex/contrib/algorithm2e/doc/algorithm2e.pdf)，[algorithmic文档](http://tug.ctan.org/macros/latex/contrib/algorithmicx/algorithmicx.pdf)

以`algorithm2e`为例：

```tex
\begin{algorithm}[H]
   \SetAlgoLined
   \KwData{this text}
   \KwResult{how to write algorithm with \LaTeX2e }
   initialization\;
   \While{not at end of this document}{
      read current\;
      \eIf{understand}
         {go to next section\;
         current section becomes this one\;}
      {go back to the beginning of current section\;}
   }
\label{Algorithmsample}
\caption{How to write algorithms}
\end{algorithm}
```

效果为：

![algorithm2e效果](https://s2.ax1x.com/2020/01/22/1kq5j0.png)


以`algorithmic`为例，注意包需要首先使用`\usepackage{algorithm}`包：

```tex
\begin{algorithm}
	\caption{How to write algorithms}
	\label{algo2}
		\begin{algorithmic}[H]
      \REQUIRE	this text
		\ENSURE  how to write algorithm with \LaTeX
		\WHILE{not at end of this document}
		\STATE	read current
		\IF {understand}
		\STATE	go to next section
		\STATE current section becomes this one
		\ELSE
		\STATE go back to the beginning of current section
		\ENDIF
		\ENDWHILE
		\label{Algorithmsample}
	\end{algorithmic}
\end{algorith
```

效果如下：

![algorithmic效果](https://s2.ax1x.com/2020/01/22/1kLxiQ.png)

## 公式

公式编辑有很多技巧，例如使用word，或者商业软件Mathtype，在这里我推荐一个在线编辑工具 https://www.latex4technics.com/ ，非常的方便，可以实时预览Latex或者MathJax的渲染结果，比较直观。

### 行内公式

定义行内公式，使用`$$`即可如下：

```tex
I am a inline equation $a=b+c$
```

效果如下：

![inline公式](https://s2.ax1x.com/2020/01/22/1kOQL6.png)

### 行间公式

对于多行公式则可以考虑使用`equation`环境来实现,同样可以使用`label`标签来实现引用，在此不表

```tex
I am a inline equation $a=b+c$, and I am display equation: 
\begin{equation}
   \label{eq1}
   a^2=b^2+c^2
\end{equation}
```

效果如下：

![display公式](https://s2.ax1x.com/2020/01/22/1kO3dO.png)

### 不带标号公式

有时我们不需要公式带标号，我们可以使用`\[   \]`或者`\(   \)`来撰写公式，其中`\[   \]`表示不带编号的公式，`\(   \)`表示不带行号的inline公式，效果与`$$`类似

```tex
 we can get a no number display equation:
 \[ a^2=b^2+c^2\] I am an equation.
 \(a^3=b^3+c^3\) ,Wow, me too
```

如图所示：

![不带行号的公式](https://s2.ax1x.com/2020/01/22/1kOwOP.png)


## 参考文献

以上的部分，大致把论文用到的结构做了一个介绍，为了完成论文，我们还需要一些参考文献。需要注意的是，参考文献格式有太多不同风格，每个期刊都要特别注意，这里仅仅做了一个例子，我们需要使用到`cite`包。在文件头部添加`\usepackage{cite}`后，我们可以有两种方式来实现参考文献引用，bbl是内嵌于tex文件的一种实现，便于文件传输与发布，而我们常用到的是bibtex，也就是常说的`bib`文件，具体文档可以参考此处[cite包文档](http://mirror.las.iastate.edu/tex-archive/macros/latex/contrib/cite/cite.pdf)。

### 使用bbl形式构建参考文献

首先我们需要自行构建bbl，一般是通过`bib`文件生成，其与`cite.sty`相关，所以每个期刊都有可能不同。一般格式如下：

```tex
\begin{thebibliography}{1}
   \bibitem{citekey}
   H.~Kopka and P.~W. Daly, \emph{A Guide to \LaTeX}, 3rd~ed.\hskip 1em plus
   0.5em minus 0.4em\relax Harlow, England: Addison-Wesley, 1999.
\end{thebibliography}
```


使用时，可以在正文如此引用：

```tex
Here, we will cite a reference~\cite{citekey}
```

效果如下：

![引文](https://s2.ax1x.com/2020/01/22/1kOO61.png)

### 使用bibtex构建参考文献

但是很麻烦的是，我们每次修改了参考文献，都需要更新`thebibliography`环境域下的代码（小声逼逼：有点蠢蠢的），所以为什么不直接引用bib文件呢，所以有了bibtex引用的方式。区别在于这种方式把参考文献单独放到了`bib`文件中，同时格式固定，可以依据`sty`文件自动生成`bbl`文件。此外，大部分文件管理工具都支持直接导出`bib`文件，所以强烈推荐啊！

1. 首先使用文献管理工具导出bib文件，假设为`ref.bib`

   ![bib](https://s2.ax1x.com/2020/01/22/1kXipd.png)

2. 在原有参考文献部分替换为以下代码
   
   ```tex
   \bibliographystyle{IEEEtran}  % 制定了生成的bbl格式的sty文件，大部分期刊的格式在texlive中都有涵盖
   \bibliography{ref}            % 参考文献所在的路径
   ```

3. 正常的使用`citekey`引用
   
   ```tex
   Here, we will cite a reference~\cite{citekey}
   ```
   
   注：这里的`citekey`是指bib文件每个条目的第一个值，每个条目应当唯一，如下图：

   ![bib文件](https://s2.ax1x.com/2020/01/22/1kXZ0f.png)

   引用效果如下：

   ![引用效果](https://s2.ax1x.com/2020/01/22/1kXF1A.png)


## 其他补充

本文仅仅是快速上手，后续有时间还会继续更新各部分细节，文中提及的源文件已经上传，点击此处[下载](https://github.com/Waynehfut/blog/releases/download/intro_to_tex_attach/appendix.zip)可供参考。如有疑问可以评论交流。