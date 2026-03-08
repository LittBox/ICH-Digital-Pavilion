# 傣乡彝韵·非遗数字展馆 (Dai Xiang Yi Yun - Intangible Cultural Heritage Digital Exhibition)

![项目封面](imgs/panorama/church_meeting_room_4k.jpg)

## 📖 项目简介
本项目是一个基于 Web 技术的沉浸式非遗数字展馆，旨在通过 360 度全景交互技术，展示云南新平地区的傣族（花腰傣）与彝族非物质文化遗产。用户可以在虚拟空间中漫游，点击热点查看详细的展品介绍、田野调查笔记以及高清图集，深入了解当地的传统手工艺、民俗活动与文化故事。

## ✨ 核心功能
-   **360° 全景漫游**: 沉浸式的虚拟展厅体验。
-   **交互式热点**: 点击展品热点获取详细信息。
-   **图文详情页**: 包含展品名称、民族归属、详细描述及田野笔记。
-   **高清图集**: 支持缩略图预览与大图切换的图片画廊。
-   **键盘导航**: 支持使用键盘方向键切换图片，ESC 键关闭详情页。

## 🛠 技术栈
-   **前端框架**: HTML5, CSS3, JavaScript (Vanilla ES6+)
-   **全景引擎**: [Pannellum](https://pannellum.org/) (v2.5.6)
-   **数据存储**: JSON (无需后端数据库)
-   **部署方式**: 静态网页部署 (Static Web Hosting)

## 📂 目录结构
```
dai-yi-elmuseum/
├── doc/                    # 技术文档
│   ├── architecture/       # 架构文档
│   ├── data/               # 数据结构说明
│   ├── frontend/           # 前端开发文档
│   └── deployment/         # 部署指南
├── css/                    # 样式文件
├── js/                     # 脚本文件
├── data/                   # 数据源 (items.json)
├── imgs/                   # 图片资源库
│   ├── panorama/           # 全景底图
│   ├── real/               # 展品原图
│   ├── thumbs/             # 热点缩略图
│   └── thumbs_gallery/     # 图集缩略图
├── pannellum/              # Pannellum 库文件
├── index.html              # 主页入口
└── README.md               # 项目说明书
```

## 🚀 快速开始

### 1. 环境准备
本项目无需复杂的构建工具，只需一个静态文件服务器。
-   推荐安装: Python 3.x 或 Node.js

### 2. 本地运行
由于浏览器安全策略（CORS），直接双击打开 `index.html` 可能会导致数据加载失败。请使用以下任一方法运行：

**方法一：使用 Python (推荐)**
```bash
# 进入项目目录
cd dai-yi-elmuseum

# 启动 HTTP 服务器
python3 -m http.server 8000
```
然后在浏览器访问: [http://localhost:8000](http://localhost:8000)

**方法二：使用 Node.js live-server**
```bash
# 安装
npm install -g live-server

# 运行
live-server
```

**方法三：VS Code**
安装 "Live Server" 插件，右键点击 `index.html` 选择 "Open with Live Server"。

## 📝 开发与维护

### 添加新展品
1.  准备图片资源：
    -   主图放入 `imgs/real/`
    -   缩略图放入 `imgs/thumbs/`
    -   图集缩略图放入 `imgs/thumbs_gallery/`
2.  编辑 `data/items.json`：
    -   在数组中添加新的 JSON 对象。
    -   填写 `id`, `name`, `pitch`, `yaw` 等必要信息。
    -   **提示**: `pitch` (上下角度) 和 `yaw` (左右角度) 可以通过开启 Pannellum 的调试模式获取。

详细文档请参考 [doc/data/schema.md](doc/data/schema.md)。

### 文档索引
-   [架构概述](doc/architecture/overview.md)
-   [技术栈说明](doc/architecture/tech-stack.md)
-   [数据结构说明](doc/data/schema.md)
-   [前端逻辑说明](doc/frontend/logic.md)
-   [界面样式说明](doc/frontend/ui.md)
-   [部署指南](doc/deployment/guide.md)

## 🤝 贡献指南
1.  Fork 本仓库。
2.  创建您的特性分支 (`git checkout -b feature/AmazingFeature`)。
3.  提交您的更改 (`git commit -m 'Add some AmazingFeature'`)。
4.  推送到分支 (`git push origin feature/AmazingFeature`)。
5.  开启一个 Pull Request。


---
**维护者**: [LittBox]
**更新日期**: 2026-03-08
