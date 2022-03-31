---
title: 文献检索基本技巧
date: 2022-03-27T15:48:02+08:00
tags: [论文阅读]
categories:
  - [论文]
  - [教程]
mathjax: true
toc: true
---

我一直觉得文献检索是一件非常简单的事情，对于同学找不到论文甚至持有怀疑态度，觉得提出找不到文献的问题，有点想当然了。但在我仔细看了相关的内容后，发现自己其实也有很多不熟悉的地方，对于同学们来说可能就更加难上加难了，我可能才是那个想当然的人。因此，写下这篇文稿，以期能对有文献检索需求的人有所帮助。

<!-- more -->

## 1. 有效的检索

1. 检索文献不建议漫无目的的用宽泛的词来进行检索（如：`神经网络`，`深度学习`等），否则很难定位到自己想要的东西。选好一个（组）检索词组，并添加领域限定，是进行有效检索的前提（如：`内窥镜图像 神经网络 算法`）；
2. 善用代表性文献进行检索，一般代表性文献都会引用或被其他文献引用，这会是非常高效的文献检索办法（查阅 Reference 和谷歌他引）；
3. 使用官方的渠道进行检索，如 [CNKI](https://www.cnki.net/), [图书馆外文检索工具（校内使用）](https://hfut.summon.serialssolutions.com/), [WebofScience](https://www.webofscience.com/wos/alldb/basic-search), [IEEEXplore](https://ieeexplore.ieee.org/Xplore/home.jsp), [sciencedirect](https://www.sciencedirect.com/)等。具体可参见我校图书馆已订阅的[电子资源列表](http://lib.hfut.edu.cn/list.php?fid=100)。对于学术类引擎，仅推荐[谷歌学术](https://ac.scmor.com/)，其他暂不推荐。对于如 paperwithcode 等聚合类的网站，可以作为参考，但强烈建议去原文的出版商处查找原始文章；
4. Arxiv, Biorxiv, chinaxiv 等预印本网站，现在也会有较多高质量论文，但在没有正式出版之前，质量难以明确，除非是非常有影响力的文章，否则不建议过多参考；
5. 妥善维护好自己的文献库，以 Zotero 为例，良好的分组和标签习惯是进行本地检索的前提（最新的 Zotero 6.0 已经支持内嵌 PDF 阅读器，支持标注与 PDF 的分离，非常推荐）。

## 2. 中文检索

中文的检索平台主要以知网（CNKI）、万方、维普等商业数据库公司为主，检索途径相对简单。

### CNKI

#### 基本检索

[知网](https://www.cnki.net/)应该是中文搜索的首选，一般教育机构的IP都可以正常访问。下图可以看到专利论文等信息都可以在网站上进行检索。

![知网的搜索框](https://raw.githubusercontent.com/Waynehfut/blog/img/img/20220331160502.png)

我们以`深度学习` `图像分割`为检索词，就可以得到如下结果：
![简单的检索](https://raw.githubusercontent.com/Waynehfut/blog/img/img/20220331160754.png)

并进一步对检索得到的内容进行筛选，例如检索学术期刊、学位论文、会议、专利、标准、成果等。
![筛选](https://raw.githubusercontent.com/Waynehfut/blog/img/img/20220331160952.png)

而对于特定子项，以学术期刊为例，可以在左侧栏进一步筛选，例如发表时间，期刊来源，研究层次等。
![左侧栏](https://raw.githubusercontent.com/Waynehfut/blog/img/img/20220331161043.png)

#### 高级检索

简单检索可用于找到特定的文献或者宽泛的检索，而对于检索要求更为复杂的情境下，更为实用的可能是知网的高级检索，高级检索可以对于主题、作者、文献来源等等类别进行检索，并且支持模糊匹配。这里可以理解为增强版的基本检索。
> 高级检索支持使用运算符*、+、-、''、""、()进行同一检索项内多个检索词的组合运算，检索框内输入的内容不得超过120个字符。输入运算符*(与)、+(或)、-(非)时，前后要空一个字节，优先级需用英文半角括号确定。若检索词本身含空格或*、+、-、()、/、%、=等特殊符号，进行多词组合运算时，为避免歧义，须将检索词用英文半角单引号或英文半角双引号引起来。

![高级检索](https://raw.githubusercontent.com/Waynehfut/blog/img/img/20220331161946.png)
![高级检索](https://raw.githubusercontent.com/Waynehfut/blog/img/img/20220331162252.png)

而如果我们想要更加复杂的检索过程，可以选择专业检索。

> 专业检索可检索字段包括：SU%=主题,TKA=篇关摘,TI=题名,KY=关键词,AB=摘要,FT=全文,AU=作者,FI=第一责任人,RP=通讯作者,AF=机构,JN=文献来源, RF=参考文献,YE=年,FU=基金,CLC=分类号,SN=ISSN,CN=统一刊号,IB=ISBN,CF=被引频次

例如我想检索管理学部推荐期刊关于`医疗`的相关文献，我就可以编写如下的表达式：
```
SU=(医疗) AND (LY=(管理科学学报) OR LY=(系统工程理论与实践) OR LY=(管理世界) OR LY=(数量经济技术经济研究) OR LY=(中国软科学) OR LY=(金融研究) OR LY=(中国管理科学) OR LY=(系统工程学报) OR LY=(会计研究) OR LY=(系统管理学报) OR LY=(管理评论) OR LY=(管理工程学报) OR LY=(南开管理评论) OR LY=(科研管理) OR LY=(情报学报) OR LY=(公共管理学报) OR LY=(管理科学) OR LY=(预测) OR LY=(运筹与管理) OR LY=(科学学研究) OR LY=(中国工业经济) OR LY=(农业经济问题) OR LY=(管理学报) OR LY=(工业工程与管理) OR LY=(系统工程) OR LY=(科学学与科学技术管理) OR LY=(研究与发展管理) OR LY=(中国人口、资源与环境) OR LY=(数理统计与管理) OR LY=(中国农村经济))
```
当然包括年份、排序等工作，都可以在搜索框中进行额外选择，更多信息可以访问[官方的文档](https://piccache.cnki.net/2022/kdn/index/helper/manual.html#frame2-1-5)。
### 万方数据

### 维普期刊

### 中国社会科学引文索引

### 中文专利检索

## 3. 英文检索

### Web of science（SCIE）

### Nature

### IEEEXplore

### ScienceDirect

### Taylor & Francis ST

### ACM

### Engineering Village（Ei）

### 英文专利检索

## 4. 维护自己的文献库

### Zotero

## 5. 后记

文献检索说来简单，但是在整理完我常用的数据库后发现还是需要比较长的时间，才能真正的形成“高效”的检索方式。
