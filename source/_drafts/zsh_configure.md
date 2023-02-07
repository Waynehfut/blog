---
title: zsh与oh-my-zsh的配置与使用
date: 2021-04-19T09:26:35+08:00
categories: 技术
tags: [工具, 代码记录]
index_img: https://raw.githubusercontent.com/Waynehfut/blog/img/img/20220722165625.png
toc: true
---

ZSH 是一个流行的 Shell 客户端，相比 Bash 等传统 Shell，ZSH 不论在易用性和显示效果上都更为优秀，但是 ZSH 本身的配置比较复杂，为此开源项目[Oh My Zsh](https://ohmyz.sh/)诞生了，其中涉及到一些配置信息，在此做个记录。

<!-- more -->

## 安装

在支持的终端中先安装 Zsh 后安装 Oh My Zsh ，注意此时还要安装 Git，Wget 等必要的组件

```bash
sudo apt install zsh git wget
```

接着就可以从 Oh My Zsh 官方安装最新的包了

```bash
sh -c "$(wget https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh -O -)"
```

一般会自动配置 ZSH 为默认 Shell，配置好 ZSH 的终端如下：

![初步配置好的Zsh](https://raw.githubusercontent.com/Waynehfut/blog/img/img20210422100017.png)

## 插件

### autojump

这个是用来进行自动跳转的插件
安装命令：

```shell
git clone git://github.com/wting/autojump.git # 克隆仓库
cd autojump # 转到目录
./install.py or ./uninstall.py # 安装或卸载
```

注意安装时最后提示:

![手动修改提示](https://raw.githubusercontent.com/Waynehfut/blog/img/img20210422100851.png)

基本使用：

```shell
j dir_name # 跳转到一个文件名包含<dir_name>的目录
```

进阶使用：
[autojump github](https://github.com/wting/autojump)

### zsh-syntax-highlighting

提供命令行关键词高亮的插件：

安装命令：

```shell
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```

启用插件：

```shell
vi ~/.zshrc
```

找到`plugins=(**** )`添加`zsh-syntax-highlighting`

重载配置文件

```shell
source ~/.zshrc
```

### zsh-autosuggestions

提供命令行自动补全

安装命令：

```shell
git clone git://github.com/zsh-users/zsh-autosuggestions $ZSH_CUSTOM/plugins/zsh-autosuggestions
```

启用插件：

```shell
vi ~/.zshrc
```

找到`plugins=(**** )`添加`autosuggestions`

重载配置文件

```shell
source ~/.zshrc
```

## 主题

### p10k

[powerlevel10k](https://github.com/romkatv/powerlevel10k)：一个用来美化 zsh 的主题

安装脚本：

```shell
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k
```

启用主题

```shell
vi ~/.zshrc
```

ZSH_THEME="powerlevel10k/powerlevel10k"

终端输入`p10k configure`，即可按照向导进行配置，下图展示了我配置好的 ZSH
![配置好的p10k](https://raw.githubusercontent.com/Waynehfut/blog/img/img20210422102000.png)

> 注：部分系统需要安装字体，请查阅原始GitHub获取安装教程。