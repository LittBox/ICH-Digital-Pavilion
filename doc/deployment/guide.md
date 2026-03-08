# 部署指南

由于本项目是纯静态网站，部署非常简单，无需配置后端环境。

## 1. 本地开发环境

由于浏览器安全策略（CORS），直接双击打开 `index.html` 通常无法加载 JSON 数据。你需要启动一个本地静态服务器。

### 方法 A: 使用 Python (推荐)
如果你的系统已安装 Python 3：
```bash
# 在项目根目录下运行
python3 -m http.server 8000
```
然后在浏览器访问: `http://localhost:8000`

### 方法 B: 使用 Node.js live-server
如果你安装了 Node.js：
```bash
# 安装
npm install -g live-server

# 运行
live-server
```

### 方法 C: VS Code 插件
安装 "Live Server" 插件，右键点击 `index.html` 选择 "Open with Live Server"。

## 2. 生产环境部署

### 方案 A: GitHub Pages (免费)
1.  将代码推送到 GitHub 仓库。
2.  进入仓库 Settings -> Pages。
3.  Source 选择 `main` (或 `master`) 分支。
4.  保存后，GitHub 会生成访问链接。

### 方案 B: Nginx 服务器
配置 Nginx 指向项目根目录：
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/dai-yi-elmuseum;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

### 方案 C: Apache 服务器
将所有文件上传到 Apache 的 `public_html` 或 `var/www/html` 目录下即可。

## 3. 常见问题
-   **图片无法加载**: 检查 `items.json` 中的路径是否正确，注意区分大小写（Linux 服务器对大小写敏感）。
-   **跨域错误 (CORS)**: 确保全景图或 JSON 文件与网页在同一域名下，或者服务器配置了允许跨域的 Header。
