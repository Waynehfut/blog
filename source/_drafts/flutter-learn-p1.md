---
title: 使用Flutter开发App
toc: true
date: 2020-07-09 21:39:33
tags: [Flutter, Android]
categories: 代码
index_img: https://raw.githubusercontent.com/Waynehfut/blog/img/img/20220722170219.png
---

最近看了一些代码上的东西，偶然看到了 Flutter，感觉他的代码很高级，而且调试起来很简单，所以想来尝试一下。我计划以一个图片浏览器为出发点来开始这个语言的学习，希望能继续下去。

<!-- more -->

## 配置 Flutter 环境

参考[Flutter](https://flutter.dev/docs/get-started/install/linux)很容易配置好 linux 下面的环境。

### 检测安装

在配置过程中，可能会遇到 android-license 的问题，此时执行`lutter doctor --android-licenses`即可

安装好后，执行 Flutter doctor，可以得到

![Flutter doctor](https://raw.githubusercontent.com/Waynehfut/blog/img/img/20201124202851.png)

就可以开始下一步的编写了。

## 开始新项目

我习惯用 vscode 来编写我的代码，此时，我们可以执行命令`Flutter new project`

![new proj](https://raw.githubusercontent.com/Waynehfut/blog/img/img/20201124202920.png)

便可构建出一个模板项目

![temple hello](https://raw.githubusercontent.com/Waynehfut/blog/img/img/20201124202952.png)

我们的主要逻辑也是在这个`main.dart`中执行的，按下 F5 我们便可以得运行。

![debug](https://raw.githubusercontent.com/Waynehfut/blog/img/img/20201124203038.png)

得到运行结果：


<img src="https://raw.githubusercontent.com/Waynehfut/blog/img/img/20201124203109.png" width=256 />

## 有状态页面

```dart
class MyHomePage extends StatefulWidget {
  MyHomePage({Key key, this.title}) : super(key: key);
  final String title;

  @override
  _MyHomePageState createState() => new _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      appBar: new AppBar(
        title: new Text(widget.title),
      ),
      body: new Center(
        child: new Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            new Text(
              'You have pushed the button this many times:',
            ),
            new Text(
              '$_counter',
              style: Theme.of(context).textTheme.headline4,
            ),
          ],
        ),
      ),
      floatingActionButton: new FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: new Icon(Icons.add),
      ), // This trailing comma makes auto-formatting nicer for build methods.
    );
  }
}
```

## 无状态页面

```dart
import 'package:flutter/material.dart';
import '../generated/l10n.dart';

class SettingsWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(S.of(context).setPage),
      ),
      body: Center(
        child: Text(S.of(context).setPageDesc),
      ),
    );
  }
}

```

## 导航页面

```dart
class NaviBar extends StatefulWidget {
  @override
  NaviBar({Key key, this.title}) : super(key: key);
  final String title;
  _NaviBarState createState() => _NaviBarState();
}

class _NaviBarState extends State<NaviBar> {
  int _currentIndex = 0;
  final List<Widget> _children = [
    TestWidget('set1'),
    TestWidget('set2'),
    SettingsWidget()
  ];
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _children[_currentIndex],
      bottomNavigationBar: BottomNavigationBar(
        onTap: onTapped,
        currentIndex: _currentIndex,
        items: [
          BottomNavigationBarItem(
              icon: Icon(Icons.home), title: Text(S.of(context).home)),
          BottomNavigationBarItem(
              icon: Icon(Icons.favorite), title: Text(S.of(context).favorite)),
          BottomNavigationBarItem(
              icon: Icon(Icons.settings), title: Text(S.of(context).settings))
        ],
      ),
    );
  }

  void onTapped(int index) {
    setState(() {
      _currentIndex = index;
    });
  }
}

```
