---
title: 使用 C++ 调用 PyTorch 模型
date: 2020-10-17T21:21:59+08:00
categories: 技术
tags: [PyTorch, C++, 深度学习]
toc: true
index_img: https://raw.githubusercontent.com/Waynehfut/blog/img/img/20220722165948.png
---

最近所里有一个 GUI 项目需要调用 PyTorch 的模型，虽然之前做过一些，但是大部分用的是 Python 接口，这次对实效性有要求，因此做一个 C++的接口，现在把一些配置事项做个记录。

<!-- more -->

## 准备工作

### 下载安装支持库

首先，需要下载安装[`LibTorch`支持库](https://pytorch.org/get-started/locally/)，推荐使用
![LibPyTorch](https://i.loli.net/2020/10/17/IRexd6gaAzskvGZ.png)

下载后直接解压

```sh
wget https://download.pytorch.org/libtorch/nightly/cpu/libtorch-shared-with-deps-latest.zip
unzip libtorch-shared-with-deps-latest.zip
```

## 基于已训练的 Torch 模型

### 追踪原始模型

需要注意的是，如果希望加载 PyTorch 库到 C++中，首先需要基于 JIT 库的 [TorchScript](https://pytorch.org/docs/master/jit.html#creating-torchscript-code) 对模型进行转化，这里以简单`resnet18`模型来作为示例，可以简单的使用`torchvision`中的模型库进行生成，接着我们生成一个简单的假数据，利用`torch.jit.trace`让 TorchScript 能够遍历一遍模型，便可完成追踪。

```python
import torch
import torchvision
# 实例模型
model = torchvision.models.resnet18()
# 假数据
example = torch.rand(1, 3, 224, 224)
# 使用JIT遍历模型，从而获得记录
traced_script_module = torch.jit.trace(model, example)

```

对于可能存在依赖于数据输入条件的情况，如以下模型：

```python
import torch

class MyModule(torch.nn.Module):
    def __init__(self, N, M):
        super(MyModule, self).__init__()
        self.weight = torch.nn.Parameter(torch.rand(N, M))

    def forward(self, input):
        if input.sum() > 0:
          output = self.weight.mv(input)
        else:
          output = self.weight + input
        return output
```

数据的前向传播有赖于输入的值，那么可以调用`torch.jit.script`直接进行转换：

```python
my_module = MyModule(10,20)
traced_script_module2 = torch.jit.script(my_module)
```

区别在于第二种方式实现时可以直接将正在训练的模型调用加载。
在获得上述的`traced_script_module`后，实际上这是一个序列化的 torch 张量字典，可以直接调用`save`方法完成保存:

```python
# 保存使用TorchScript遍历的模型
traced_script_module.save("traced_resnet_model.pt")
```

### 加载 Torch 模型

有了保存后的 pt 模型后，在 C++中的调用，即为和 LibTorch 库的交互，这里以官方的例子作说明

新建 C++项目, CMakeList 配置可以参考以下

```CMake
cmake_minimum_required(VERSION 3.16)
project(torchcpp)
set(Torch_DIR ./libtorch/share/cmake/Torch) #设置Torch的执行位置

find_package(Torch REQUIRED) # 查找支持库
add_executable(torchcpp main.cpp) # 项目主入口
target_link_libraries(torchcpp "${TORCH_LIBRARIES}") # 指出动态连接库
set(CMAKE_CXX_STANDARD 14) # C++标准
```

对应简单加载 C++代码如下：

```C++
#include <torch/script.h> // One-stop header.
#include <iostream>
#include <memory>

at::Tensor baseModel(std::vector<torch::jit::IValue> inputs, torch::jit::script::Module module) {
    at::Tensor output = module.forward(inputs).toTensor();
    return output;
}

int main(int argc, const char *argv[]) {
    if (argc != 2) {
        std::cerr << "usage: example-app <path-to-exported-script-module>\n";
        return -1;
    }
    torch::jit::script::Module module;
    try {
        // 使用 torch::jit::load() 反序列化原有模型.
        module = torch::jit::load(argv[1]);
    }
    catch (const c10::Error &e) {
        std::cerr << "error loading the model\n";
        return -1;
    }
    std::cout << "model loads ok\n";
    //  生成假数据以测试
    std::vector<torch::jit::IValue> inputs;
    inputs.push_back(torch::ones({1, 3, 224, 224}));
    at::Tensor output = baseModel(inputs, module);
    std::cout << output.slice(1, 0, 5) << "\n";
    return 0;
}
```

同时我们新建一个 build 文件夹以保存编译时文件

至此项目大致结构如下：

```shell
├── build
├── CMakeLists.txt
└── main.cpp
```

进入 build 文件夹执行

```shell
(base) ➜  cd build
(base) ➜  cmake ..
(base) ➜  cmake --build . --config Release
```

可以获得类似输出：

```shell
(base) ➜  build cmake ..
-- The C compiler identification is GNU 9.3.0
-- The CXX compiler identification is GNU 9.3.0
-- Check for working C compiler: /usr/bin/cc
-- Check for working C compiler: /usr/bin/cc -- works
-- Detecting C compiler ABI info
-- Detecting C compiler ABI info - done
-- Detecting C compile features
-- Detecting C compile features - done
-- Check for working CXX compiler: /usr/bin/c++
-- Check for working CXX compiler: /usr/bin/c++ -- works
-- Detecting CXX compiler ABI info
-- Detecting CXX compiler ABI info - done
-- Detecting CXX compile features
-- Detecting CXX compile features - done
-- Looking for pthread.h
-- Looking for pthread.h - found
-- Performing Test CMAKE_HAVE_LIBC_PTHREAD
-- Performing Test CMAKE_HAVE_LIBC_PTHREAD - Failed
-- Looking for pthread_create in pthreads
-- Looking for pthread_create in pthreads - not found
-- Looking for pthread_create in pthread
-- Looking for pthread_create in pthread - found
-- Found Threads: TRUE
-- Found CUDA: /usr/local/cuda (found version "10.2")
-- Caffe2: CUDA detected: 10.2
-- Caffe2: CUDA nvcc is: /usr/local/cuda/bin/nvcc
-- Caffe2: CUDA toolkit directory: /usr/local/cuda
-- Caffe2: Header version is: 10.2
-- Found CUDNN: /usr/local/cuda/lib64/libcudnn.so
-- Found cuDNN: v8.0.4  (include: /usr/local/cuda/include, library: /usr/local/cuda/lib64/libcudnn.so)
-- Autodetected CUDA architecture(s):  7.5
-- Added CUDA NVCC flags for: -gencode;arch=compute_75,code=sm_75
-- Found Torch: /media/hao/Data/Code/DL/torchcppsample/libtorch/lib/libtorch.so
-- Configuring done
-- Generating done
-- Build files have been written to: /media/hao/Data/Code/DL/torchcppsample/build
```

```shell
(base) ➜  build cmake --build . --config Release
Scanning dependencies of target torchcpp
[ 50%] Building CXX object CMakeFiles/torchcpp.dir/main.cpp.o
[100%] Linking CXX executable torchcpp
[100%] Built target torchcpp

```

接着前往上级文件夹，执行编译得到的主程序：

```shell
(base) ➜  cd ..
(base) ➜  torchcppsample build/torchcpp Python/traced_resnet_model.pt
model loads ok
 0.1439 -0.8914 -0.0475  0.2474  0.3108
[ CPUFloatType{1,5} ]
```

> 使用CLion等IDE可以更简单的编译管理，而不需要自行build。

### 注意事项

注意加载模型时，两者必须在同一设备(Device)中。

## 基于 C++ 前端训练模型

实际上 C++前端提供了训练模型的接口，但是实施难度不低，相比 Python 训练完成后转 TypeScript 调用，这个方式稍显复杂。
官方提供的教程如下：[使用 PyTorch 的 C++前端](https://pytorch.org/tutorials/advanced/cpp_frontend.html)，后续再更新吧。
