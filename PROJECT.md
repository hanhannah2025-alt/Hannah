# 职途导航 - 项目文档

## 项目概述
一款职业发展辅助移动应用，帮助求职者进行职业决策和简历优化。

## 技术栈
- **框架**: Next.js 16 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **地图**: d3-geo + GeoJSON (阿里 DataV)
- **设计**: 深蓝主题 + 玻璃态效果 + 渐变色

## 设计规范
- **主背景**: #070B14
- **主色调**: #3B82F6 (蓝色)
- **强调色**: #F59E0B (橙色)
- **渐变**: 粉(#EC4899) → 紫(#8B5CF6) → 蓝(#3B82F6)

## 页面结构

### 1. 情报站 (/intelligence)
- 瀑布流卡片布局
- 行业/地点筛选
- 卡片标签：薪资(黄)、警示(红)、趋势(蓝)

### 2. 行业社区 (/community)
- 中国地图 (GeoJSON + d3-geo)
- 省份点击交互 + 高亮效果
- 行业分布条形图 (互联网/金融/设计/教育/法律)
- 职位类型展开
- 加班亮点动画 (50个城市点位)
- 身价雷达功能

### 3. Offer决策 (/offer)
- A/B对比卡片
- 维度评分雷达
- AI教练建议

### 4. AI简历 (/resume)
- 简历上传
- AI分析动画
- 优化建议展示

### 5. 个人中心 (/profile)
- 用户信息卡片
- 功能入口列表

## 组件结构
```
src/
├── app/
│   ├── page.tsx          # 首页重定向
│   ├── layout.tsx        # 根布局
│   ├── globals.css       # 全局样式
│   ├── intelligence/     # 情报站
│   ├── community/        # 行业社区
│   ├── offer/           # Offer决策
│   ├── resume/          # AI简历
│   └── profile/         # 个人中心
└── components/
    ├── BottomNav.tsx    # 底部导航
    ├── FeedCard.tsx     # 情报卡片
    └── ChinaMapGeo.tsx  # 中国地图
```

## 启动命令
```bash
npm install          # 安装依赖
npm run dev          # 开发模式
npm run build        # 生产构建
npm start            # 生产运行
```

## Git 提交记录
- fe1109e: 职途导航 v1.0 - 初始版本

---
创建日期: 2026-04-26
