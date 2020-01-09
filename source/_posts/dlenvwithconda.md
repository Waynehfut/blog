---
title: 使用Anaconda配置机器学习环境
date: 2019-04-10 11:04:17
tags: [深度学习]
categories: 技术
---
Anaconda是一个python的虚拟环境包管理工具，相对于原本的python独立环境而言，可以自由的修改当前系统默认的运行时，而不需要反复安装，同时自带的conda包管理命令可以自动的匹配和分析包依赖，不需要再去下载whl文件或修改环境变量。

# 1. 安装方法：

初次安装建议使用：[tuna.tsinghua.edu.cn](https://mirrors.tuna.tsinghua.edu.cn) 上的miniconda安装包，从而节约IDE(如：pycharm等)初次加载的时间。

在获取下载安装包以后，运行安装，注意写入环境变量（Add to Path），建议设置为默认python
安装完毕以后，就可以在命令行中使用conda命令

配置镜像地址，因为conda镜像默认地址在国外，速度过慢。推荐使用清华的源：
```shell
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/
conda config --set show_channel_urls yes
```
# 2. 配置方法：

创建环境：作为一个虚拟环境，首先得创建一个环境容器以支撑运行，创建命令为：`conda create -n <env_name> python=<python_version>`，如我想创建一个名为sci的python3.5的运行环境，则命令为：
```shell
conda create -n sci python=3.5
```
稍等几秒后，输入y，回车便可执行下一步。
输入`activate <env_name>`，如`activate sci`，便可激活环境

激活后的命令行之前会有环境的名称，在这个状态下便可以安装python的各种包，你可以使用多种包管理工具：如pip，conda等。为了保证依赖的正确，不建议使用conda以外的包管理工具。

# 3. 安装包：
安装python包有多种不同的配置。
1. 直接安装：`conda install <package_name>`，适用于直接安装一些流行的包，如`numpy`，`scikit-learn`, 以numpy为例：`conda install numpy`，便可安装最新的版本。注意，同样需要y输入回车确认。
2. 对于有特定版本需求的而言，只需要在package_name后加版本号即可，`conda install <package_name>==<version>` ，如：`conda install numpy==1.12`
3. 从文件安装，对于特定需求的whl文件，建议以`pip install <whl_file>`的方式安装，但是绝大多数情况下，conda都有对应的包。建议以`conda search <package_name>`的方式搜索包。
4. 从requirements.txt文件安装，对于python项目而言，多数项目的依赖会以requirements.txt文件的形式发布依赖及版本，在conda中，你可以使用：`conda install --yes --file requirements.txt`的方式安装requirement，conda会自动安装依赖包。

# 4. 管理包：
包的升级和移除
包升级：conda upgrade <package_name>
包移除：conda remove <package_name>

# 5. 配置你的深度学习环境
1. 一般而言，我们面向的平台是基于python实现的深度学习框架，以tensorflow+keras为例，我们需要执行下述命令：
```shell
conda create -n <env_name> python=3.5   # 创建环境名为<env_name>的python3.5环境
conda install tensorflow                # 安装tensorflow
conda install matplotlib                # 安装matplotlib
conda install pillow                    # 安装pillow
pip install opencv-python               # 安装opencv
conda install scikit-learn              # 安装scikit-learn
```
2. 其次选择一个IDE,推荐[PyCharm](https://www.jetbrains.com/pycharm/download/),选择社区版即可

# 6. 删除你的环境
1. 如果遇到环境需要删除，你可以使用以下命令：

```shell
conda env remove -n ENV_NAME
```
2. 试试

> 注：在IDE中你需要在建立项目后自行指定interpreter.
