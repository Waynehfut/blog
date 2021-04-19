---
title: zsh与oh-my-zsh的配置与使用
date: 2021-04-19T09:26:35+08:00
categories: 技术
tags: [工具]
toc: true
---

ZSH 是一个流行的 Shell 客户端，相比 Bash 等传统 Shell，ZSH 不论在易用性和显示效果上都更为优秀，但是 ZSH 本身的配置比较复杂，为此开源项目[Oh My Zsh](https://ohmyz.sh/)诞生了，其中涉及到一些配置信息，在此做个记录。

<!-- more -->

## 安装

在支持的终端中先安装 Zsh 后安装 ohmyzsh，注意此时还要安装 Git，Wget 等必要的组件

```bash
sudo apt install zsh git wget
```

接着就可以从 Oh My Zsh 官方安装最新的包了

```bash
sh -c "$(wget https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh -O -)"
```

