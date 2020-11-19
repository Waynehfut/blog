---
title: Conda的新激活方式
date: 2018-12-27 11:04:30
tags: [基本概念]
categories: 技术
---

Conda今天在更新后，使用的过程中遇到了一个小问题，记录备查、
<!-- more -->
```bash
CommandNotFoundError: Your shell has not been properly configured to use 'conda activate'.
If your shell is Bash or a Bourne variant, enable conda for the current user with

$ echo ". /home/wayne/miniconda3/etc/profile.d/conda.sh" >> ~/.bashrc

or, for all users, enable conda with

$ sudo ln -s /home/wayne/miniconda3/etc/profile.d/conda.sh /etc/profile.d/conda.sh

The options above will permanently enable the 'conda' command, but they do NOT
put conda's base (root) environment on PATH. To do so, run

$ conda activate

in your terminal, or to put the base environment on PATH permanently, run

$ echo "conda activate" >> ~/.bashrc

Previous to conda 4.4, the recommended way to activate conda was to modify PATH in
your ~/.bashrc file. You should manually remove the line that looks like

export PATH="/home/wayne/miniconda3/bin:$PATH"

^^^ The above line should NO LONGER be in your ~/.bashrc file! ^^^
```


上述问题是conda更新4.4后对写入bash文件的要求变化，在我的zsh和bash中之前写入了

`export PATH="/home/wayne/miniconda3/bin:$PATH"`

但是现在可以将这行移除，并使用下面的脚本写入文件

> bash:
`echo ". /home/wayne/miniconda3/etc/profile.d/conda.sh" >> ~/.bashrc`

> zsh:
`echo ". /home/wayne/miniconda3/etc/profile.d/conda.sh" >> ~/.zshrc`

可以使得系统的shell识别到你的ananconda命令，同时避免写入系统环境变量导致的问题。


