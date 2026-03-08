# 技术栈说明

## 1. 前端核心技术
-   **HTML5**: 构建页面语义化结构。
-   **CSS3**: 负责页面样式设计、布局（Flexbox/Grid）以及动画效果。
-   **JavaScript (ES6+)**: 实现核心业务逻辑，包括数据获取、DOM 操作、事件处理等。

## 2. 第三方库
-   **Pannellum (v2.5.6)**
    -   **用途**: 轻量级、基于 WebGL 的全景查看器。
    -   **引入方式**: 通过 CDN (`jsdelivr`) 引入 CSS 和 JS 文件。
    -   **文档**: [https://pannellum.org/documentation/](https://pannellum.org/documentation/)
    -   **关键特性**: 支持等距柱状投影（Equirectangular）、多分辨率、热点（Hotspots）、自动旋转等。

## 3. 数据存储
-   **JSON (JavaScript Object Notation)**
    -   **文件**: `data/items.json`
    -   **用途**: 存储结构化的展品数据。
    -   **优点**: 轻量、易读、易于与 JavaScript 集成。

## 4. 开发与运行环境
-   **浏览器**: 支持现代 Web 标准的浏览器（Chrome, Firefox, Safari, Edge）。
-   **服务器**: 任意静态文件服务器（Nginx, Apache, Python http.server, Node live-server 等）。
    -   *注意*: 由于浏览器安全策略（CORS），直接双击打开 `index.html` 可能无法加载 JSON 数据，必须通过 HTTP/HTTPS 协议访问。

## 5. 资源管理
-   **图片格式**: JPG/PNG。
    -   全景图：高分辨率 JPG。
    -   展品图：普通 JPG。
    -   缩略图：优化后的小尺寸 JPG。
