# 前端业务逻辑 (main.js)

`js/main.js` 文件包含了项目的核心交互逻辑。

## 主要功能模块

### 1. 数据加载与初始化
-   **入口**: `window.addEventListener('load', ...)`
-   **流程**:
    1.  使用 `fetch('data/items.json')` 请求数据。
    2.  解析 JSON 响应。
    3.  调用 `initHotspots(data)` 初始化全景图。
-   **错误处理**: 如果数据加载失败，会在控制台输出错误信息。

### 2. 全景图初始化 (`initHotspots`)
-   **参数**: `items` (数据数组)。
-   **功能**:
    1.  遍历数据数组，为每个展品生成 Pannellum 的热点配置对象 (`hotSpots`)。
    2.  **热点配置**:
        -   `pitch`/`yaw`: 坐标位置。
        -   `type`: 固定为 `'custom'`。
        -   `cssClass`: 样式类名 `'hotspot-item'`。
        -   `createTooltipFunc`: 自定义 Tooltip HTML，显示缩略图。
        -   `clickHandlerFunc`: 点击事件处理函数，绑定 `showDetail`。
    3.  调用 `pannellum.viewer` 初始化全景容器 `#panorama-container`。
        -   设置全景图路径、自动加载、指南针等配置。

### 3. 详情页展示 (`showDetail`)
-   **参数**: `id` (展品 ID)。
-   **功能**:
    1.  根据 ID 在 `itemsData` 中查找对应数据。
    2.  填充 DOM 元素：名称、民族、描述、田野笔记、主图。
    3.  初始化图集状态 (`currentGalleryImages`, `currentGalleryIndex`)。
    4.  调用 `renderGallery()` 渲染缩略图列表。
    5.  移除 `#detail-overlay` 的 `hidden` 类，显示弹窗。

### 4. 图集渲染与交互 (`renderGallery`, `updateMainImage`)
-   **`renderGallery()`**:
    -   清空图集容器。
    -   遍历 `currentGalleryImages` 生成 `<img>` 元素。
    -   将原图路径转换为缩略图路径（逻辑：`imgs/real/` -> `imgs/thumbs_gallery/`）。
    -   绑定点击事件到 `updateMainImage(index)`。
-   **`updateMainImage(index)`**:
    -   更新 `currentGalleryIndex`。
    -   切换主图显示（包含简单的透明度淡入淡出效果）。
    -   更新缩略图的高亮状态 (`active` 类)。
    -   滚动选中的缩略图到可视区域。

### 5. 事件监听
-   **关闭按钮**: 点击 `.close-btn` 隐藏弹窗。
-   **遮罩层点击**: 点击弹窗背景区域隐藏弹窗。
-   **键盘导航**:
    -   `Escape`: 关闭弹窗。
    -   `ArrowLeft`: 切换上一张图片。
    -   `ArrowRight`: 切换下一张图片。

## 全局变量
-   `itemsData`: 缓存从 JSON 加载的完整数据。
-   `currentGalleryImages`: 当前详情页展示的图片数组。
-   `currentGalleryIndex`: 当前展示图片的索引。
