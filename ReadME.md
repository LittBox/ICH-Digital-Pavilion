“傣乡彝韵·非遗数字展馆”技术文档
1. 项目概述
本项目是参加“传智杯第七届非遗创造赛道”的作品，旨在利用现代Web技术为云南玉溪市新平县（扬武镇）的傣族与彝族非物质文化遗产打造一个沉浸式在线展示平台。团队成员通过实地调研，拍摄了大量一手图片并记录了传承人口述故事。项目以360°全景展厅为核心，结合自定义热点与动态数据，让用户仿佛置身于数字展馆中，点击代表非遗项目的缩略图即可查看高清实拍照片、详细描述及调研笔记。

项目完全基于静态网页技术（HTML/CSS/JavaScript），使用Pannellum开源库实现全景图浏览，通过JSON文件管理展品数据，并部署于Vercel平台，具备良好的可扩展性。

2. 技术栈
类别	技术/工具	用途
核心语言	HTML5、CSS3、JavaScript (ES6)	页面结构、样式、交互逻辑
全景库	Pannellum	360°全景图渲染与热点管理
数据处理	本地JSON (items.json)	存储展品信息，模拟数据库
图标	Font Awesome (可选)	界面图标美化
图片优化	TinyPNG、图像处理工具	压缩图片，提升加载速度
版本控制	Git + GitHub	代码管理
部署	Vercel	自动化部署，生成线上访问链接
3. 项目结构
text
dai-yi-nonmuseum/
│
├── index.html                # 主页面：全景展馆
├── css/
│   ├── style.css              # 全局样式（包含浮层、热点样式）
│   └── pannellum-custom.css    # 对Pannellum默认样式的微调（可选）
├── js/
│   ├── main.js                 # 初始化Pannellum、加载数据、绑定热点
│   └── utils.js                 # 工具函数（如数据加载、浮层控制）
├── data/
│   └── items.json              # 所有非遗展品的结构化数据
├── imgs/
│   ├── real/                    # 实地调研照片（按展品分类存放）
│   ├── thumbs/                  # 热点用的缩略图（由调研照片生成）
│   └── panorama/                # 背景全景图（如展厅.jpg）

└── README.md                     # 项目说明
4. 数据设计：items.json
每个非遗项目对应一个JSON对象，包含以下字段：

json
[
  {
    "id": "firecake",
    "name": "扬武火烤饼",
    "category": "饮食文化",
    "ethnicity": "傣族",
    "pitch": -5,
    "yaw": 30,
    "mainImage": "imgs/real/firecake_01.jpg",
    "gallery": ["imgs/real/firecake_02.jpg", "imgs/real/firecake_03.jpg"],
    "description": "扬武镇传统火烤饼，用当地紫米、红糖烤制，外酥里糯……",
    "fieldNote": "我们在扬武镇xx村拜访了制作火烤饼的刀阿姨，她说这是节日待客必不可少的点心。"
  },
  {
    "id": "watmao",
    "name": "瓦猫",
    "category": "传统习俗",
    "ethnicity": "彝族",
    "pitch": 0,
    "yaw": -15,
    "mainImage": "images/real/watmao_01.jpg",
    "gallery": ["images/real/watmao_02.jpg", "images/real/watmao_03.jpg"],
    "description": "彝族瓦猫，置于屋顶镇宅辟邪，造型夸张……",
    "fieldNote": "在扬武镇老街上，我们见到了一位制作瓦猫的老人，他说这是祖传的手艺。"
  }
  // 更多展品...
]
字段说明：

id: 唯一标识符，用于热点关联。

name: 展品名称。

category: 分类（如饮食文化、歌舞文化、传统习俗）。

ethnicity: 民族归属（傣族/彝族/共有）。

pitch, yaw: 热点在全景图中的位置（度），通过Pannellum的Ctrl+点击拾取。

mainImage: 详情页主图路径。

gallery: 附加图片数组，用于详情页轮播。

description: 标准介绍。

fieldNote: 调研手记，增加人文温度。

5. 开发步骤详解
5.1 阶段一：基础环境搭建与Pannellum集成
引入Pannellum
在index.html的<head>中添加：

html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css"/>
<script src="https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js"></script>
创建容器
<body>中加入一个占满视口的div：

html
<div id="panorama-container" style="width: 100vw; height: 100vh;"></div>
初始化查看器
在js/main.js中写入：

javascript
window.addEventListener('load', () => {
    pannellum.viewer('panorama-container', {
        type: 'equirectangular',
        panorama: 'images/panorama/your-background.jpg', // 替换为实际路径
        autoLoad: true,
        compass: true,
        northOffset: 0
    });
});
此时应能看到可拖拽旋转的全景图。

5.2 阶段二：加载JSON数据
在main.js中使用fetch加载items.json，并存储为全局变量以便后续使用：

javascript
let itemsData = [];

fetch('data/items.json')
    .then(response => response.json())
    .then(data => {
        itemsData = data;
        // 下一步：生成热点配置
        initHotspots(data);
    })
    .catch(error => console.error('数据加载失败:', error));
5.3 阶段三：自定义热点（缩略图样式）
5.3.1 确定热点坐标
在已运行的全景页面上，按住Ctrl键点击想要放置热点的位置（如墙面、展台），浏览器控制台会输出该点的pitch和yaw。

将这些数值记录到items.json中对应的pitch和yaw字段。

5.3.2 生成热点配置
编写initHotspots函数，将每个展品转换为Pannellum热点对象：

javascript
function initHotspots(items) {
    const hotSpots = items.map(item => ({
        pitch: item.pitch,
        yaw: item.yaw,
        type: 'custom',
        cssClass: 'hotspot-item',
        createTooltipFunc: (hotSpotDiv, args) => {
            hotSpotDiv.innerHTML = `
                <div class="hotspot-frame">
                    <img src="images/thumbs/${item.id}-thumb.jpg" alt="${item.name}">
                </div>
            `;
        },
        clickHandlerFunc: (args) => showDetail(args.id),
        clickHandlerArgs: { id: item.id }
    }));

    // 重新初始化查看器（或更新场景）
    const viewer = pannellum.viewer('panorama-container', {
        type: 'equirectangular',
        panorama: 'images/panorama/your-background.jpg',
        autoLoad: true,
        hotSpots: hotSpots
    });
}
注意：需要为每个展品准备一张缩略图（如firecake-thumb.jpg），放在images/thumbs/目录下。

5.3.3 美化热点样式
在css/style.css中添加：

css
.hotspot-item {
    width: 80px;
    height: 80px;
    cursor: pointer;
    transition: transform 0.2s;
}
.hotspot-item:hover {
    transform: scale(1.1);
}
.hotspot-frame {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
    border: 3px solid rgba(255,255,255,0.8);
    box-shadow: 0 0 20px rgba(0,255,255,0.7);
    background: rgba(0,0,0,0.5);
}
.hotspot-frame img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
可根据科技展馆风格调整边框、阴影和动画。

5.4 阶段四：详情浮层实现
5.4.1 添加浮层HTML
在index.html的<body>末尾添加：

html
<div id="detail-overlay" class="overlay hidden">
    <div class="overlay-content">
        <span class="close-btn">&times;</span>
        <div class="detail-left">
            <img id="detail-main-img" src="" alt="">
            <div id="detail-gallery" class="gallery-thumbs"></div>
        </div>
        <div class="detail-right">
            <h2 id="detail-name"></h2>
            <p id="detail-ethnicity" class="ethnicity-badge"></p>
            <p id="detail-desc"></p>
            <div id="detail-fieldnote" class="fieldnote"></div>
        </div>
    </div>
</div>
5.4.2 浮层样式
在CSS中定义浮层样式，确保居中、半透明背景、合适的宽高：

css
.overlay {
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: rgba(0,0,0,0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}
.overlay.hidden {
    display: none;
}
.overlay-content {
    background: #111;
    color: white;
    width: 80%;
    max-width: 1000px;
    max-height: 80vh;
    overflow-y: auto;
    border-radius: 12px;
    padding: 20px;
    display: flex;
    gap: 20px;
    box-shadow: 0 0 30px rgba(0,255,255,0.3);
}
.detail-left {
    flex: 1;
}
.detail-left img {
    width: 100%;
    border-radius: 8px;
}
.gallery-thumbs {
    display: flex;
    gap: 10px;
    margin-top: 10px;
}
.gallery-thumb {
    width: 60px;
    height: 60px;
    object-fit: cover;
    cursor: pointer;
    border-radius: 4px;
    border: 2px solid transparent;
}
.gallery-thumb:hover {
    border-color: cyan;
}
.detail-right {
    flex: 1;
}
.close-btn {
    position: absolute;
    top: 20px;
    right: 30px;
    font-size: 40px;
    color: white;
    cursor: pointer;
}
.ethnicity-badge {
    display: inline-block;
    background: #ffaa00;
    color: black;
    padding: 4px 12px;
    border-radius: 20px;
    font-weight: bold;
}
.fieldnote {
    margin-top: 20px;
    font-style: italic;
    border-left: 4px solid cyan;
    padding-left: 15px;
    background: rgba(255,255,255,0.1);
    border-radius: 4px;
}
5.4.3 实现showDetail函数
在main.js中（需能访问itemsData）：

javascript
function showDetail(id) {
    const item = itemsData.find(i => i.id === id);
    if (!item) return;

    // 填充元素
    document.getElementById('detail-name').textContent = item.name;
    document.getElementById('detail-ethnicity').textContent = `民族：${item.ethnicity}`;
    document.getElementById('detail-desc').textContent = item.description;
    document.getElementById('detail-fieldnote').textContent = item.fieldNote;
    document.getElementById('detail-main-img').src = item.mainImage;

    // 生成图库缩略图
    const galleryDiv = document.getElementById('detail-gallery');
    galleryDiv.innerHTML = '';
    if (item.gallery && item.gallery.length) {
        item.gallery.forEach(src => {
            const thumb = document.createElement('img');
            thumb.src = src;
            thumb.className = 'gallery-thumb';
            thumb.onclick = () => document.getElementById('detail-main-img').src = src;
            galleryDiv.appendChild(thumb);
        });
    }

    // 显示浮层
    document.getElementById('detail-overlay').classList.remove('hidden');
}

// 关闭浮层事件
document.querySelector('.close-btn').addEventListener('click', () => {
    document.getElementById('detail-overlay').classList.add('hidden');
});
document.getElementById('detail-overlay').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
        e.currentTarget.classList.add('hidden');
    }
});
5.5 阶段五：按民族筛选（可选扩展）
若时间充裕，可增加“傣族”“彝族”“全部”按钮，动态过滤热点。

在页面添加筛选栏：

html
<div id="filter-bar">
    <button data-ethnicity="all">全部</button>
    <button data-ethnicity="傣族">傣族</button>
    <button data-ethnicity="彝族">彝族</button>
</div>
在main.js中保存查看器实例和完整热点列表，为按钮绑定事件，利用Pannellum的removeHotSpot和addHotSpot方法动态更新。由于Pannellum原生热点移除需遍历，更简单的实现是重新初始化查看器（会重置视角），但为了更好体验，可采用以下策略：

获取当前场景的hotSpotContainer，遍历移除所有热点。

根据筛选结果重新添加热点（使用viewer.addHotSpot）。

由于代码较复杂，这里仅提供思路，可根据实际进度决定是否实现。

5.6 阶段六：测试与部署
5.6.1 本地测试
使用live-server或直接打开index.html（注意跨域问题，建议用本地服务器）。

测试热点点击、浮层显示、图片切换、关闭浮层等功能。

调整热点坐标直至视觉位置合适。

5.6.2 部署到Vercel
将项目代码推送到GitHub仓库。

登录Vercel，导入该仓库，保持默认配置（框架预设选“Other”）。

部署完成后，Vercel会生成一个可公开访问的URL（如xxx.vercel.app）。

可将此链接用于比赛作品提交。

6. 所需资源清单
全景背景图：一张360°等距柱状投影图（宽高比2:1），可从免费素材网站获取或AI生成。

调研照片：每个展品至少1张主图，2-3张附加图，放入images/real/。

缩略图：为每个展品生成一张100x100左右的缩略图，放入images/thumbs/。



