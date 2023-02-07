---
title: Python中缩进需要使用Space
date: 2020-01-28 10:59:56
tags: [Python, 代码记录]
categories: 代码
index_img: https://raw.githubusercontent.com/Waynehfut/blog/img/img/20220722171019.png
---

Python 使用 Tab 是怎么回事呢？Python 使用相信大家都很熟悉，但是 Python 使用 Tab 是怎么回事呢，下面就让小编带大家一起了解吧。
Python 使用 Tab，其实就是 Space，大家可能会很惊讶 Python 使用怎么会 Tab 呢？但事实就是这样，小编也感到非常惊讶。
这就是关于 Python 使用 Tab 的事情了，大家有什么想法呢，欢迎在评论区告诉小编一起讨论哦！

<!-- more -->

今天偶尔逛论坛的时候，看到一条消息，Python 是用 tab 还是 Space 来调整缩进，一直以来都没太关注过，最终在官方的 PEP-8 的文档中找到了答案：
[https://www.python.org/dev/peps/pep-0008/#tabs-or-spaces](https://www.python.org/dev/peps/pep-0008/#tabs-or-spaces)

> Tabs or Spaces?
> Spaces are the preferred indentation method.
> Tabs should be used solely to remain consistent with code that is already indented with tabs.
> Python 3 disallows mixing the use of tabs and spaces for indentation.
> Python 2 code indented with a mixture of tabs and spaces should be converted to using spaces exclusively.
> When invoking the Python 2 command line interpreter with the -t option, it issues warnings about code that illegally mixes tabs and spaces. When using -tt these warnings become rors. These options are highly recommended!

以后在文本编辑器写代码的时候一定要注意这个问题！
