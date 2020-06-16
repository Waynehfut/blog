---
title: ubuntu安装后常见问题
date: 2020-06-08 16:16:35
tags: [Ubuntu, 代码记录]
categories: 教程
---

# 系统安装

## Ubuntu 无法挂载 NTFS 磁盘

可能因为在挂载 wimdows 盘后，强制关机造成的，可使用
sudo ntfsfix /dev/**_
来修复。其中，_**为具体哪个盘，例如 sudo ntfsfix /dev/sda4

## 安装 Nvidia 显卡驱动后， 重启依然卡死。

安装完显卡驱动后，系统需要重启加载驱动，注意如果按照上述流程进行驱动安装的同学，那在重启系统时，会出现一个蓝色背景的界面 perform mok management , 本人在这一步选择了 continue reboot， 导致新安装的 N 卡驱动没有加载，正确的做法如下：

1. 当进入蓝色背景的界面 perform mok management 后，选择 enroll mok,
2. 进入 enroll mok 界面，选择 continue,
3. 进入 enroll the key 界面，选择 yes,
4. 接下来输入你在安装驱动时输入的密码,
5. 之后会跳到蓝色背景的界面 perform mok management 选择第一个 reboot
   这样，重启后 N 卡驱动就加载了，恭喜你，Ubuntu 安装成功。

## Cuda deb

### Installation Instructions:

```shell
- wget https://developer.download.nvidia.com/compute/cuda/repos/ubuntu1804/x86_64/cuda-ubuntu1804.pin
- sudo mv cuda-ubuntu1804.pin /etc/apt/preferences.d/cuda-repository-pin-600
- wget http://developer.download.nvidia.com/compute/cuda/10.2/Prod/local_installers/cuda-repo-ubuntu1804-10-2-local-10.2.89-440.33.01_1.0-1_amd64.deb
- sudo dpkg -i cuda-repo-ubuntu1804-10-2-local-10.2.89-440.33.01_1.0-1_amd64.deb
- sudo apt-key add /var/cuda-repo-10-2-local-10.2.89-440.33.01/7fa2af80.pub
- sudo apt-get update
- sudo apt-get -y install cuda
```

### Cudnn 安装

```shell
sudo cp cuda/include/cudnn.h /usr/local/cuda/include
sudo cp cuda/lib64/libcudnn* /usr/local/cuda/lib64
sudo chmod a+r /usr/local/cuda/include/cudnn.h /usr/local/cuda/lib64/libcudnn*
sudo ln -sf libcudnn.so.7.6.5 libcudnn.so.7 #重建软连接
sudo ln -sf libcudnn.so.7 libcudnn.so
sudo ldconfig
```

### Cudnn 版本

cuda 版本
cat /usr/local/cuda/version.txt

cudnn 版本
cat /usr/local/cuda/include/cudnn.h | grep CUDNN_MAJOR -A 2

# 环境配置

## ZSH

```shell
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

## miniconda

```shell
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh
```

## NPM & Nodejs

### Resolving EACCES permissions errors when installing packages globally

https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally

```shell
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH
source ~/.profile
```

### Hexo

```shell
npm install -g hexo-cli
```

# 软件配置

## VSCODE

- open with code [github](https://github.com/harry-cpp/code-nautilus)

```sh
wget -qO- https://raw.githubusercontent.com/cra0zy/code-nautilus/master/install.sh | bash
```

- 拓展

![Extensions](https://i.imgur.com/ZHBWMLt.png)

## Tweak Theme

![Tweak setting](https://i.imgur.com/90Lbel5.png)

## 空格预览增强工具

```shell
sudo apt install gnome-sushi
```

## fusuma 触控板手势

https://github.com/iberianpig/fusuma

- 配置文件

```YAML
swipe:
  3:
    left:
      command: 'xdotool key alt+Left'
    right:
      command: 'xdotool key alt+Right'
    up:
      command: 'xdotool key super+s'
    down:
      command: 'xdotool key super+a'
  4:
    left:
      command: 'xdotool key super+Left'
    right:
      command: 'xdotool key super+Right'
    up:
      command: 'xdotool key super+Up'
    down:
      command: 'xdotool key super+Down'

pinch:
  2:
    in:
      command: 'xdotool key ctrl+equal'
    out:
      command: 'xdotool key ctrl+minus'
  4:
    in:
      command: 'xdotool key super+d'
    out:
      command: 'xdotool key super+s'

threshold:
  swipe: 0.3
  pinch: 0.1

interval:
  swipe: 1
  pinch: 1

```

## Deepin-wine 容器

Repo: https://github.com/wszqkzqk/deepin-wine-ubuntu

```shell
git clone https://gitee.com/wszqkzqk/deepin-wine-for-ubuntu.git
cd deepin-wine-for-ubuntu
chmod +x ./install_2.8.22.sh
./install_2.8.22.sh
wget https://mirrors.aliyun.com/deepin/pool/non-free/d/deepin.com.wechat/deepin.com.wechat_2.6.8.65deepin0_i386.deb
sudo dpkg -i deepin.com.wechat_2.6.8.65deepin0_i386.deb
sudo apt install fonts-wqy-microhei fonts-wqy-zenhei # 解决中文字体变方块的问题
```

### 修复Wechat中文输入
```shell
cd /opt/deepinwine/tools
sudo gedit run.sh
sudo gedit run_v2.sh
```
修改`run.sh`和`run_v2.sh`如下：
```shell
#WINE_CMD="deepin-wine"
WINE_CMD="LC_ALL=zh_CN.UTF-8 deepin-wine"
 
#added by user
export GTK_IM_MODULE="ibus"
export QT_IM_MODULE="ibus" 
export XMODIFIERS="@im=ibus
```
之后切换一下输入法就可以激活中文输入了。