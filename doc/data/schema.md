# 数据结构说明

本项目的所有展品数据存储在 `data/items.json` 文件中。该文件包含一个 JSON 对象数组，每个对象代表一个展品或兴趣点。

## JSON 字段定义

| 字段名 | 类型 | 必填 | 说明 | 示例 |
| :--- | :--- | :--- | :--- | :--- |
| `id` | String | 是 | 唯一标识符，用于查找和关联图片 | `"huayaodai_pottery"` |
| `name` | String | 是 | 展品名称 | `"花腰傣土陶工艺品"` |
| `category` | String | 是 | 展品分类 | `"传统手工艺"` |
| `ethnicity` | String | 是 | 所属民族 | `"傣族（花腰傣）"` |
| `pitch` | Number | 是 | 热点在全景图中的垂直角度（上下） | `-5` |
| `yaw` | Number | 是 | 热点在全景图中的水平角度（左右） | `0` |
| `mainImage` | String | 是 | 详情页展示的主图路径 | `"imgs/real/huayaodai_pottery_01.JPG"` |
| `gallery` | Array<String> | 否 | 详情页底部的图集路径列表 | `["imgs/real/img1.jpg", "imgs/real/img2.jpg"]` |
| `description` | String | 是 | 展品的详细描述文本 | `"花腰傣土陶工艺品..."` |
| `fieldNote` | String | 否 | 田野调查笔记或补充说明 | `"我们在花腰田间寨拜访了..."` |

## 数据示例

```json
[
  {
    "id": "huayaodai_pottery",
    "name": "花腰傣土陶工艺品",
    "category": "传统手工艺",
    "ethnicity": "傣族（花腰傣）",
    "pitch": -5,
    "yaw": 0,
    "mainImage": "imgs/real/huayaodai_pottery_01.JPG",
    "gallery": [
      "imgs/real/huayaodai_pottery_01.JPG",
      "imgs/real/huayaodai_pottery_02.JPG"
    ],
    "description": "详细描述...",
    "fieldNote": "田野笔记..."
  }
]
```

## 注意事项
1.  **ID 唯一性**: `id` 字段必须在数组中唯一。
2.  **图片路径**: 路径是相对于 `index.html` 的相对路径。
3.  **角度坐标**: `pitch` 范围通常为 -90 到 90，`yaw` 范围为 -180 到 180。可以通过 Pannellum 的调试模式或在线工具获取具体的坐标值。
4.  **特殊字符**: JSON 字符串中的双引号需要转义，建议使用中文全角引号或避免在文本中使用双引号。
