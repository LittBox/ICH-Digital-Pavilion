let itemsData = [];

window.addEventListener('load', () => {
    // Initial load, we will reload with hotspots after fetching data
    // But to show something initially, or we can just fetch first.
    // The README says "5.2 阶段二：加载JSON数据 ... initHotspots(data)"
    // So we should fetch data first.
    
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
            // Add click event listener to the div or the image
            // Pannellum handles clickHandlerFunc but for custom tooltips, sometimes we need to be careful.
            // But the README uses clickHandlerFunc which is standard Pannellum API.
        },
        clickHandlerFunc: (evt, args) => showDetail(args.id),
        clickHandlerArgs: { id: item.id }
    }));

    pannellum.viewer('panorama-container', {
        type: 'equirectangular',
        panorama: 'imgs/panorama/church_meeting_room_4k.png',
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

    // Generate gallery thumbnails
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

    // Show overlay
    document.getElementById('detail-overlay').classList.remove('hidden');
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
