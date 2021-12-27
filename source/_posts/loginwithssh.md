---
title: 使用 SSH Public Key 进行远程登录
tags: [代码记录]
mathjax: true
toc: true
date: 2021-12-27 17:29:39
categories: 代码
---

为了服务器的安全，和避免未经授权的用户登陆服务器，我们一般可以使用 SSH Public Key 的方式来进行权限控制，同时避免密码的泄露。
![原理图，来源https://www.cnblogs.com/xz816111/p/9479139.html](https://raw.githubusercontent.com/Waynehfut/blog/img/img20211227173450.png)

## 服务端配置

Server 端需要安装`openssh-server`，大多数情况下服务器已经集成了这个库，如果没有，请安装：

```shell
sudo apt-get install openssh-server
```

之后在当前用户的用户目录下新建一个`.ssh`的文件夹

```shell
mkdir ~/.ssh
```

建立一个授权用户 id 列表以进行授权维护：

```shell
touch ~/.ssh/authorized_keys
```

## 本地端配置

当服务器端配置完毕以后，对于需要授权的机器的 Public Key 上传到 Server 端，而生成 Public Key 的方法，请参见[Git 配置|生成 SSH Key](https://blog.waynehfut.com/2020/06/08/ubuntuissues/#git)中代码的第一行。

```shell
ssh-keygen -t rsa -b 4096 -C "id@outlook.com"
```

之后会在本地用户目录中生成一个`id_rsa.pub`的文件，将这个文件追加到 Server 端的`authorized_keys`文件即可。

![生成的public key](https://raw.githubusercontent.com/Waynehfut/blog/img/img20211227171352.png)

![追加到Server端的authorized_keys中](https://raw.githubusercontent.com/Waynehfut/blog/img/img20211227171610.png)

而在此之后，本地客户端的只要添加了 SSH Key 的设备都可以基于这个 SSH Key 自动登录而不需要密码。使用 `ssh username@ip`。

![使用用户名和ip登录而不需要密码](https://raw.githubusercontent.com/Waynehfut/blog/img/img20211227171832.png)

## 其他客户端注意事项

需要注意的是，对于部分客户端，需要指定私钥位置，例如 MobaXterm，这时，在类似`Advanced SSH settings`的选项卡下，勾选`Use private key`后，选择`id_rsa.pub`目录下的 id_rsa 即可。

![MobaXterm指定私钥登录SSH](https://raw.githubusercontent.com/Waynehfut/blog/img/img20211227172306.png)

同理，也适用于 Sftp 等

![MobaXterm指定私钥登录SFTP](https://raw.githubusercontent.com/Waynehfut/blog/img/img20211227172623.png)

对于 PyCharm 一般会自动获取本地的私钥，如果遇到无法登录的情况，请在新建 SSH 服务时，选择指定私钥
![Pycharm新建SSH向导时，选择使用特定私钥](https://raw.githubusercontent.com/Waynehfut/blog/img/img20211227173236.png)
