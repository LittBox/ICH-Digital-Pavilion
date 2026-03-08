# 前端界面与样式说明

## 1. 页面结构 (index.html)

页面主要分为两个层级：
1.  **全景层**: 底层的 `#panorama-container`，占据全屏。
2.  **交互层**: 顶层的 `#detail-overlay`，默认隐藏，点击热点后覆盖在全景层之上。

### 详情弹窗结构
```html
<div id="detail-overlay" class="overlay hidden">
    <div class="overlay-content">
        <!-- 关闭按钮 -->
        <span class="close-btn">&times;</span>
        
        <!-- 顶部大图 -->
        <div class="detail-main-view">...</div>
        
        <!-- 中间滑动图集 -->
        <div class="detail-gallery-container">...</div>
        
        <!-- 底部信息 -->
        <div class="detail-info-area">
            <h2>标题</h2>
            <p class="ethnicity-badge">民族标签</p>
            <p>描述文本</p>
            <div class="fieldnote">田野笔记</div>
        </div>
    </div>
</div>
```

## 2. 样式设计 (css/style.css)

### 全局布局
-   使用 `position: fixed` 和 `z-index` 管理层级关系。
-   `#panorama-container`: `width: 100vw; height: 100vh;` 确保全屏显示。

### 弹窗样式 (.overlay)
-   **定位**: `position: fixed; top: 0; left: 0;` 全屏覆盖。
-   **背景**: 半透明黑色背景，聚焦用户视线。
-   **内容容器 (.overlay-content)**:
    -   居中显示。
    -   最大宽度/高度限制，确保在不同屏幕上适配。
    -   `overflow-y: auto`: 内容过多时允许纵向滚动。

### 响应式设计
-   虽然没有显式的 `@media` 查询（需确认源码），但通过百分比宽度和 Flexbox 布局实现了一定的自适应能力。
-   图片使用 `max-width: 100%` 确保在小屏幕下不溢出。

### 热点样式 (.hotspot-item)
-   自定义 Pannellum 热点样式。
-   包含缩略图预览 (`.hotspot-frame`)，鼠标悬停或点击时可见。

## 3. 资源路径约定
-   `css/`: 存放样式文件。
-   `imgs/`: 存放所有图片资源。
    -   `imgs/panorama/`: 全景底图。
    -   `imgs/real/`: 展品高清原图。
    -   `imgs/thumbs/`: 热点缩略图。
    -   `imgs/thumbs_gallery/`: 详情页图集缩略图。
