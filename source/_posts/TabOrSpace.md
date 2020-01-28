---
title: TabOrSpace
date: 2020-01-28 10:59:56
tags: [Python,代码记录]
categories: 代码
---

今天偶尔逛论坛的时候，看到一条消息，Python是用tab还是Space来调整缩进，一直以来都没太关注过，最终在官方的PEP-8的文档中找到了答案：
https://www.python.org/dev/peps/pep-0008/#tabs-or-spaces

> # Tabs or Spaces?
>  Spaces are the preferred indentation method.
>  空格是首选的缩进方法。
>  
>  Tabs should be used solely to remain consistent with code that is already indented with tabs.
>  制表符应仅用于与已经使用了制表符缩进的代码保持一致。
>  
>  Python 3 disallows mixing the use of tabs and spaces for indentation.
>  Python 3不允许混用制表符和空格控制缩进。
>  
>  Python 2 code indented with a mixture of tabs and spaces should be converted to using spaces  exclusively.
>  由制表符和空格组成的缩进的Python 2代码应转换为仅使用空格的方式。
>  
>  When invoking the Python 2 command line interpreter with the -t option, it issues warnings about code that illegally mixes tabs and spaces. When using -tt these warnings become errors. These options are  highly recommended!
>  当使用-t选项调用Python 2命令行解释器时，它会发出有关非法混用制表符和空格的代码的警告。当使用-tt时，这些警告变为错误。强烈建议使用这些选项！
"


以后在文本编辑器写代码的时候一定要注意这个问题！




