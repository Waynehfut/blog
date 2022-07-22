---
title: 使用SSH进行代码调试
toc: true
date: 2021-09-15 15:46:09
categories: 代码
index_img: https://raw.githubusercontent.com/Waynehfut/blog/img/img/20220722164620.png
tags: [代码记录]
mathjax2: true
---

大多数情况下，我们并不需要服务器的 GUI 来占用宝贵的 GPU 资源，同时远程桌面的方式给开发带来了诸多不可预见的错误，虽然 SFTP 和 X11 转发的方式使得在本地编辑代码很方便，但是对于 debug 等操作却没法很好的完成，被迫开远程桌面进行 debug 。为此，本篇将以 IDEA 家族的 IDE 为例简要介绍如何使用 SSH 进行远程服务器的代码调试，以避免手动同步代码导致的潜在风险。

<!-- more -->

## 配置 SSH

首先，你要有个具有 SSH 访问权限的服务器，关于如何部署 SSH，这里不再赘述。测试是否可以链接到 SSH 服务器，可以使用`ssh -T <Username>@<IP>`的命令，即可登录。

![re ssh](https://raw.githubusercontent.com/Waynehfut/blog/img/img20210915164533.png)

有了这个基础，即可配置 IDE 中的 SSH 了，以 IDEA 的 PyCharm 为例，打开`File->Setting->Tools->SSH Configurations`输入相应的主机地址、端口、用户名、密码后，即可在 IDE 中配置远程的 SSH 服务器，用以同步代码和远程调试。

![ssh conf](https://raw.githubusercontent.com/Waynehfut/blog/img/img20210915164347.png)

## 增加远程环境

其次，我们的主要目的是将远程服务器作为我们的调试或部署环境，因此还需要为代码添加远程解释器等环境。以 Python 为例，我们打开`Setting->Project:<Project Name>->Python Interpreter`在右侧下拉选择 Show All.

![add](https://raw.githubusercontent.com/Waynehfut/blog/img/img20210915165246.png)

后再选择添加环境。

![select](https://raw.githubusercontent.com/Waynehfut/blog/img/img20210915165327.png)

选择 SSH 解释器，并在右侧下拉找到之前配置过的服务器

![choose](https://raw.githubusercontent.com/Waynehfut/blog/img/img20210915165409.png)

接着，远程环境可能有不同的路径，默认路径可能不是你所需要的，此处可以自行调整

![modify](https://raw.githubusercontent.com/Waynehfut/blog/img/img20210915165522.png)

调整完解释器路径后，还需要注意当前项目的映射关系，一般情况下，项目的根目录会映射到/tmp 目录下，也就意味着，一段时间后，代码会被清理掉，如果想保存代码到特定位置，可以在此处修改文件映射。

![choose path](https://raw.githubusercontent.com/Waynehfut/blog/img/img20210915165651.png)

![sync](https://raw.githubusercontent.com/Waynehfut/blog/img/img20210915165849.png)

当前，你可以自行在后续重新指定文件映射。

![resync](https://raw.githubusercontent.com/Waynehfut/blog/img/img20210915165931.png)

## 远程调试

这时，我们可以在`Settings->Build,Execution,Deployment->Deployment`中看到具体设置，并更新修改相关信息。

![info](https://raw.githubusercontent.com/Waynehfut/blog/img/img20210915170056.png)

这时，我们在本地 IDE 中运行代码时，就可以发现，所有的执行环节都在远程了。

![run](https://raw.githubusercontent.com/Waynehfut/blog/img/img20210915170408.png)

你可以像在本地使用一样去打断点和调试，效果可能会更好。

![debug](https://raw.githubusercontent.com/Waynehfut/blog/img/img20210915170500.png)

## 应规避的风险行为

- 要注意的是，平时使用时，默认情况下是同步所有文件到之前的映射中的。因此，当存在文件不需要在本地保存或大量日志文件不需要同步时，请在`Settings->Build,Execution,Deployment->Deployment`中找到当前的解释器，选择`Excluded Paths`添加不需要进行同步的路径。

![Ex path](https://raw.githubusercontent.com/Waynehfut/blog/img/img20210915170623.png)

- 避免代码覆盖，一般情况下，当本地代码有修改并保存后，文件会自动上传到远程的 SSH 服务器中，如果不希望这样的执行方式，可以考虑关闭自动上传。

![Disable Auto](https://raw.githubusercontent.com/Waynehfut/blog/img/img20210915170737.png)

- 当关闭了自动同步后，请及时推送和拉取更新。

## 在其他 IDE 中尝试

在大多数 IDE 中，其实都具有 SSH 远程调试和代码同步的能力，例如 VS Code 等也可以通过点击

![SSH VSC](https://raw.githubusercontent.com/Waynehfut/blog/img/img20210915171048.png)

来连接到远程服务器中

![SSH VSC](https://raw.githubusercontent.com/Waynehfut/blog/img/img20210915171121.png)

输入 SSH 链接的命令后，即可像在本地打开 VS Code 一样来进行代码编写

![SSH VSC](https://raw.githubusercontent.com/Waynehfut/blog/img/img20210915171241.png)
