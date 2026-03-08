let itemsData = [];
let currentGalleryImages = [];
let currentGalleryIndex = 0;

window.addEventListener('DOMContentLoaded', () => {
    fetch('data/items.json')
        .then(response => response.json())
        .then(data => {
            itemsData = data;
            initHotspots(data);
        })
        .catch(error => console.error('数据加载失败:', error));
});

function initHotspots(items) {
    const hotSpots = items.map(item => ({
        pitch: item.pitch,
        yaw: item.yaw,
        type: 'custom',
        cssClass: 'hotspot-item',
        createTooltipFunc: (hotSpotDiv, args) => {
            hotSpotDiv.innerHTML = `
                <div class="hotspot-frame">
                    <img src="imgs/thumbs/${item.id}-thumb.jpg" alt="${item.name}">
                </div>
            `;
        },
        clickHandlerFunc: (evt, args) => showDetail(args.id),
        clickHandlerArgs: { id: item.id }
    }));

    // 检测屏幕宽度，判断是否为移动端
    // 阈值设为 768px (iPad Portrait)
    const isMobile = window.innerWidth < 768;
    
    // 根据设备选择全景图资源
    // 移动端使用专门优化的小图 (需确保 imgs/panorama/church_meeting_room_mobile.jpg 存在)
    // PC端使用 4K 原图
    const panoramaImage = isMobile 
        ? 'imgs/panorama/church_meeting_room_mobile.jpg' 
        : 'imgs/panorama/church_meeting_room_4k.jpg';

    pannellum.viewer('panorama-container', {
        type: 'equirectangular',
        panorama: panoramaImage,
        autoLoad: true,
        compass: true,
        northOffset: 0,
        hotSpots: hotSpots
    });
}

function showDetail(id) {
    const item = itemsData.find(i => i.id === id);
    if (!item) return;

    // Fill elements
    document.getElementById('detail-name').textContent = item.name;
    document.getElementById('detail-ethnicity').textContent = `民族：${item.ethnicity}`;
    document.getElementById('detail-desc').textContent = item.description;
    document.getElementById('detail-fieldnote').textContent = item.fieldNote;
    document.getElementById('detail-main-img').src = item.mainImage;

    // Setup gallery state
    if (item.gallery && item.gallery.length > 0) {
        currentGalleryImages = item.gallery;
    } else {
        currentGalleryImages = [item.mainImage];
    }
    
    // Reset index to mainImage or 0
    currentGalleryIndex = currentGalleryImages.indexOf(item.mainImage);
    if (currentGalleryIndex === -1) currentGalleryIndex = 0;

    // Generate gallery thumbnails
    renderGallery();

    // Show overlay
    document.getElementById('detail-overlay').classList.remove('hidden');
}

function renderGallery() {
    const galleryDiv = document.getElementById('detail-gallery');
    galleryDiv.innerHTML = '';
    
    currentGalleryImages.forEach((src, index) => {
        const thumb = document.createElement('img');
        // Convert real image path to gallery thumbnail path
        // imgs/real/foo.jpg -> imgs/thumbs_gallery/foo.jpg
        const thumbSrc = src.replace('imgs/real/', 'imgs/thumbs_gallery/');
        thumb.src = thumbSrc;
        thumb.className = 'gallery-thumb';
        thumb.loading = 'lazy'; // Lazy load
        if (index === currentGalleryIndex) {
            thumb.classList.add('active');
        }
        thumb.onclick = () => updateMainImage(index);
        galleryDiv.appendChild(thumb);
    });
}

function updateMainImage(index) {
    if (index < 0 || index >= currentGalleryImages.length) return;
    
    currentGalleryIndex = index;
    const src = currentGalleryImages[index];
    const mainImg = document.getElementById('detail-main-img');
    
    // Simple fade transition
    mainImg.style.opacity = '0';
    setTimeout(() => {
        mainImg.src = src;
        mainImg.style.opacity = '1';
    }, 200);
    
    // Update active state in thumbnails
    const thumbs = document.querySelectorAll('.gallery-thumb');
    thumbs.forEach((thumb, i) => {
        if (i === index) {
            thumb.classList.add('active');
            thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        } else {
            thumb.classList.remove('active');
        }
    });
}

// Close overlay events
const closeBtn = document.querySelector('.close-btn');
if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        document.getElementById('detail-overlay').classList.add('hidden');
    });
}

const overlay = document.getElementById('detail-overlay');
if (overlay) {
    overlay.addEventListener('click', (e) => {
        if (e.target === e.currentTarget) {
            e.currentTarget.classList.add('hidden');
        }
    });
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    const overlay = document.getElementById('detail-overlay');
    // Only handle keys if overlay is visible
    if (!overlay || overlay.classList.contains('hidden')) return;

    if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        overlay.classList.add('hidden');
    } else if (e.key === 'ArrowLeft') {
        let newIndex = currentGalleryIndex - 1;
        if (newIndex < 0) newIndex = currentGalleryImages.length - 1; // Loop to last
        updateMainImage(newIndex);
    } else if (e.key === 'ArrowRight') {
        let newIndex = currentGalleryIndex + 1;
        if (newIndex >= currentGalleryImages.length) newIndex = 0; // Loop to first
        updateMainImage(newIndex);
    }
});
