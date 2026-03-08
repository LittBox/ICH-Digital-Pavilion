# 项目架构概述

## 1. 系统简介
本项目是一个基于 Web 技术的非遗数字展馆，名为“傣乡彝韵·非遗数字展馆”。它利用 360 度全景技术展示云南新平地区的非物质文化遗产，通过交互式热点（Hotspots）连接详细的图文介绍和图片画廊，为用户提供沉浸式的文化体验。

## 2. 系统架构
本项目采用 **静态网页架构（Static Web Architecture）**，无需复杂的后端服务和数据库，所有数据和资源均由静态文件提供。

### 核心组件
1.  **全景展示层 (Panorama Layer)**
    -   基于开源库 [Pannellum](https://pannellum.org/) 实现。
    -   负责加载和渲染 360 度全景图像。
    -   处理用户的视角控制（旋转、缩放）。
    -   渲染交互式热点图标。

2.  **数据层 (Data Layer)**
    -   使用 JSON 文件 (`data/items.json`) 作为轻量级数据库。
    -   存储所有展品的元数据，包括名称、描述、位置坐标（pitch/yaw）、图片路径等。
    -   前端通过 Fetch API 异步加载数据。

3.  **交互逻辑层 (Interaction Layer)**
    -   由原生 JavaScript (`js/main.js`) 实现。
    -   负责初始化全景图。
    -   处理热点点击事件。
    -   管理详情页面的显示与隐藏。
    -   实现图片画廊的切换逻辑。

4.  **展示层 (Presentation Layer)**
    -   HTML5 (`index.html`) 构建页面结构。
    -   CSS3 (`css/style.css`) 定义样式和布局。
    -   包含全景容器和详情弹窗（Overlay）。

## 3. 数据流向
1.  页面加载 (`window.onload`)。
2.  JavaScript 发起请求获取 `data/items.json`。
3.  解析 JSON 数据，生成热点配置对象。
4.  初始化 Pannellum 实例，传入全景图路径和热点配置。
5.  用户点击热点 -> 触发点击事件 -> 根据 ID 查找数据 -> 填充详情弹窗 -> 显示弹窗。

## 4. 目录结构
```
project-root/
├── index.html          # 入口文件
├── css/                # 样式文件
├── js/                 # 逻辑脚本
├── data/               # 数据文件 (JSON)
├── imgs/               # 图片资源 (全景图、缩略图、原图)
├── pannellum/          # Pannellum 库文件 (本地备份，实际使用 CDN)
└── doc/                # 项目文档
```
