'use client';

import { useState, useEffect, useMemo } from 'react';
import { geoMercator, geoPath } from 'd3-geo';
import type { Feature, FeatureCollection, Geometry } from 'geojson';

// GeoJSON 属性类型
type GeoProperties = {
  adcode: number;
  name: string;
  center?: [number, number];
  childrenNum?: number;
  level?: string;
};

type GeoJSONData = FeatureCollection<Geometry, GeoProperties>;

// 行业数据类型
type JobPosition = {
  name: string;
  count: number;
};

type Industry = {
  name: string;
  icon: string;
  color: string;
  count: number;
  positions: JobPosition[];
};

// 各省份行业数据（模拟数据）
const provinceIndustryData: Record<string, Industry[]> = {
  '北京市': [
    { name: '互联网', icon: '💻', color: '#3B82F6', count: 45000, positions: [
      { name: '前端开发', count: 12000 },
      { name: '后端开发', count: 15000 },
      { name: '产品经理', count: 8000 },
      { name: 'UI设计师', count: 5000 },
      { name: '测试工程师', count: 5000 },
    ]},
    { name: '金融', icon: '💰', color: '#10B981', count: 28000, positions: [
      { name: '投资分析师', count: 8000 },
      { name: '基金经理', count: 5000 },
      { name: '风控专员', count: 6000 },
      { name: '财务顾问', count: 9000 },
    ]},
    { name: '教育', icon: '📚', color: '#F59E0B', count: 18000, positions: [
      { name: 'K12教师', count: 8000 },
      { name: '培训讲师', count: 6000 },
      { name: '教研人员', count: 4000 },
    ]},
    { name: '设计', icon: '🎨', color: '#EC4899', count: 12000, positions: [
      { name: '平面设计', count: 5000 },
      { name: '交互设计', count: 4000 },
      { name: '建筑设计', count: 3000 },
    ]},
    { name: '法律', icon: '⚖️', color: '#8B5CF6', count: 8000, positions: [
      { name: '律师', count: 5000 },
      { name: '法务', count: 2000 },
      { name: '公证员', count: 1000 },
    ]},
  ],
  '上海市': [
    { name: '互联网', icon: '💻', color: '#3B82F6', count: 52000, positions: [
      { name: '前端开发', count: 14000 },
      { name: '后端开发', count: 18000 },
      { name: '产品经理', count: 10000 },
      { name: '数据分析师', count: 10000 },
    ]},
    { name: '金融', icon: '💰', color: '#10B981', count: 38000, positions: [
      { name: '投资分析师', count: 12000 },
      { name: '基金经理', count: 8000 },
      { name: '证券交易员', count: 10000 },
      { name: '风控专员', count: 8000 },
    ]},
    { name: '设计', icon: '🎨', color: '#EC4899', count: 15000, positions: [
      { name: '时尚设计', count: 6000 },
      { name: '平面设计', count: 5000 },
      { name: '工业设计', count: 4000 },
    ]},
    { name: '教育', icon: '📚', color: '#F59E0B', count: 12000, positions: [
      { name: '高校教师', count: 5000 },
      { name: '培训讲师', count: 4000 },
      { name: '教研人员', count: 3000 },
    ]},
    { name: '法律', icon: '⚖️', color: '#8B5CF6', count: 10000, positions: [
      { name: '律师', count: 6000 },
      { name: '法务', count: 3000 },
      { name: '合规专员', count: 1000 },
    ]},
  ],
  '广东省': [
    { name: '互联网', icon: '💻', color: '#3B82F6', count: 65000, positions: [
      { name: '前端开发', count: 18000 },
      { name: '后端开发', count: 22000 },
      { name: '产品经理', count: 12000 },
      { name: '运营', count: 13000 },
    ]},
    { name: '金融', icon: '💰', color: '#10B981', count: 22000, positions: [
      { name: '投资分析师', count: 6000 },
      { name: '银行职员', count: 8000 },
      { name: '保险顾问', count: 8000 },
    ]},
    { name: '设计', icon: '🎨', color: '#EC4899', count: 18000, positions: [
      { name: 'UI设计', count: 8000 },
      { name: '工业设计', count: 6000 },
      { name: '服装设计', count: 4000 },
    ]},
    { name: '教育', icon: '📚', color: '#F59E0B', count: 14000, positions: [
      { name: 'K12教师', count: 6000 },
      { name: '培训讲师', count: 5000 },
      { name: '幼教', count: 3000 },
    ]},
    { name: '法律', icon: '⚖️', color: '#8B5CF6', count: 6000, positions: [
      { name: '律师', count: 4000 },
      { name: '法务', count: 2000 },
    ]},
  ],
};

// 默认行业数据
const defaultIndustryData: Industry[] = [
  { name: '互联网', icon: '💻', color: '#3B82F6', count: 25000, positions: [
    { name: '前端开发', count: 7000 },
    { name: '后端开发', count: 9000 },
    { name: '产品经理', count: 5000 },
    { name: '测试工程师', count: 4000 },
  ]},
  { name: '金融', icon: '💰', color: '#10B981', count: 15000, positions: [
    { name: '投资分析师', count: 5000 },
    { name: '银行职员', count: 6000 },
    { name: '财务顾问', count: 4000 },
  ]},
  { name: '设计', icon: '🎨', color: '#EC4899', count: 10000, positions: [
    { name: '平面设计', count: 4000 },
    { name: 'UI设计', count: 3500 },
    { name: '建筑设计', count: 2500 },
  ]},
  { name: '教育', icon: '📚', color: '#F59E0B', count: 12000, positions: [
    { name: 'K12教师', count: 5000 },
    { name: '培训讲师', count: 4000 },
    { name: '高校教师', count: 3000 },
  ]},
  { name: '法律', icon: '⚖️', color: '#8B5CF6', count: 6000, positions: [
    { name: '律师', count: 3500 },
    { name: '法务', count: 2500 },
  ]},
];

// 获取省份行业数据
function getProvinceIndustryData(provinceName: string): Industry[] {
  const shortName = provinceName.replace(/省|市|自治区|特别行政区/g, '');
  for (const [key, value] of Object.entries(provinceIndustryData)) {
    if (key.includes(shortName) || shortName.includes(key.replace(/省|市|自治区|特别行政区/g, ''))) {
      return value;
    }
  }
  // 返回随机调整的默认数据
  return defaultIndustryData.map(industry => ({
    ...industry,
    count: Math.floor(industry.count * (0.3 + Math.random() * 0.5)),
    positions: industry.positions.map(pos => ({
      ...pos,
      count: Math.floor(pos.count * (0.3 + Math.random() * 0.5)),
    })),
  }));
}

// 省份从业者数据
const provinceWorkers: Record<string, number> = {
  '北京市': 280000, '上海市': 320000, '广东省': 410000, '浙江省': 185000, '江苏省': 195000,
  '四川省': 145000, '湖北省': 125000, '陕西省': 95000, '山东省': 135000, '福建省': 110000,
  '河南省': 105000, '湖南省': 98000, '安徽省': 88000, '河北省': 78000, '辽宁省': 72000,
  '重庆市': 85000, '天津市': 68000, '云南省': 55000, '贵州省': 48000, '广西壮族自治区': 62000,
  '黑龙江省': 45000, '吉林省': 38000, '山西省': 52000, '江西省': 58000, '甘肃省': 32000,
  '内蒙古自治区': 28000, '新疆维吾尔自治区': 22000, '海南省': 18000, '宁夏回族自治区': 15000, '青海省': 12000,
  '西藏自治区': 8000, '台湾省': 35000, '香港特别行政区': 85000, '澳门特别行政区': 12000,
};

// 加班热点城市坐标 (经纬度) - 密集分布在发达地区
const overtimeCities = [
  // 北京及周边
  { name: '北京', coords: [116.4, 39.9] as [number, number] },
  { name: '北京海淀', coords: [116.3, 39.95] as [number, number] },
  { name: '北京朝阳', coords: [116.48, 39.92] as [number, number] },
  { name: '天津', coords: [117.2, 39.1] as [number, number] },

  // 上海及周边（江浙沪密集）
  { name: '上海', coords: [121.5, 31.2] as [number, number] },
  { name: '上海浦东', coords: [121.6, 31.25] as [number, number] },
  { name: '上海徐汇', coords: [121.43, 31.18] as [number, number] },
  { name: '杭州', coords: [120.2, 30.3] as [number, number] },
  { name: '杭州滨江', coords: [120.22, 30.2] as [number, number] },
  { name: '南京', coords: [118.8, 32.1] as [number, number] },
  { name: '苏州', coords: [120.6, 31.3] as [number, number] },
  { name: '无锡', coords: [120.3, 31.5] as [number, number] },
  { name: '宁波', coords: [121.5, 29.9] as [number, number] },
  { name: '嘉兴', coords: [120.7, 30.8] as [number, number] },

  // 广东地区（密集）
  { name: '广州', coords: [113.3, 23.1] as [number, number] },
  { name: '广州天河', coords: [113.35, 23.12] as [number, number] },
  { name: '深圳', coords: [114.1, 22.5] as [number, number] },
  { name: '深圳南山', coords: [113.95, 22.53] as [number, number] },
  { name: '深圳福田', coords: [114.05, 22.52] as [number, number] },
  { name: '东莞', coords: [113.7, 23.05] as [number, number] },
  { name: '佛山', coords: [113.1, 23.05] as [number, number] },
  { name: '珠海', coords: [113.5, 22.3] as [number, number] },

  // 其他重点城市
  { name: '成都', coords: [104.1, 30.7] as [number, number] },
  { name: '成都高新', coords: [104.05, 30.63] as [number, number] },
  { name: '武汉', coords: [114.3, 30.6] as [number, number] },
  { name: '武汉光谷', coords: [114.4, 30.5] as [number, number] },
  { name: '西安', coords: [108.9, 34.3] as [number, number] },
  { name: '西安高新', coords: [108.88, 34.23] as [number, number] },
  { name: '长沙', coords: [112.9, 28.2] as [number, number] },
  { name: '郑州', coords: [113.6, 34.75] as [number, number] },
  { name: '重庆', coords: [106.5, 29.55] as [number, number] },
  { name: '合肥', coords: [117.3, 31.85] as [number, number] },
  { name: '厦门', coords: [118.1, 24.5] as [number, number] },
  { name: '福州', coords: [119.3, 26.1] as [number, number] },
  { name: '济南', coords: [117.0, 36.65] as [number, number] },
  { name: '青岛', coords: [120.4, 36.1] as [number, number] },
  { name: '大连', coords: [121.6, 38.9] as [number, number] },
  { name: '沈阳', coords: [123.4, 41.8] as [number, number] },

  // 偏远地区少量
  { name: '乌鲁木齐', coords: [87.6, 43.8] as [number, number] },
  { name: '拉萨', coords: [91.1, 29.65] as [number, number] },
  { name: '兰州', coords: [103.8, 36.05] as [number, number] },
  { name: '西宁', coords: [101.8, 36.6] as [number, number] },
  { name: '银川', coords: [106.3, 38.5] as [number, number] },
  { name: '呼和浩特', coords: [111.7, 40.8] as [number, number] },
  { name: '昆明', coords: [102.7, 25.0] as [number, number] },
  { name: '贵阳', coords: [106.7, 26.6] as [number, number] },
  { name: '南宁', coords: [108.3, 22.8] as [number, number] },
  { name: '海口', coords: [110.3, 20.0] as [number, number] },
  { name: '哈尔滨', coords: [126.6, 45.75] as [number, number] },
  { name: '长春', coords: [125.3, 43.9] as [number, number] },
];

// 省份简称映射
const provinceShortNames: Record<string, string> = {
  '北京市': '北京', '天津市': '天津', '河北省': '河北', '山西省': '山西',
  '内蒙古自治区': '内蒙古', '辽宁省': '辽宁', '吉林省': '吉林', '黑龙江省': '黑龙江',
  '上海市': '上海', '江苏省': '江苏', '浙江省': '浙江', '安徽省': '安徽',
  '福建省': '福建', '江西省': '江西', '山东省': '山东', '河南省': '河南',
  '湖北省': '湖北', '湖南省': '湖南', '广东省': '广东', '广西壮族自治区': '广西',
  '海南省': '海南', '重庆市': '重庆', '四川省': '四川', '贵州省': '贵州',
  '云南省': '云南', '西藏自治区': '西藏', '陕西省': '陕西', '甘肃省': '甘肃',
  '青海省': '青海', '宁夏回族自治区': '宁夏', '新疆维吾尔自治区': '新疆',
  '台湾省': '台湾', '香港特别行政区': '香港', '澳门特别行政区': '澳门',
};

export default function ChinaMapGeo({
  moonActive,
  onProvinceClick,
}: {
  moonActive: boolean;
  onProvinceClick: (name: string, workers: number) => void;
}) {
  const [geoData, setGeoData] = useState<GeoJSONData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProvinceData, setSelectedProvinceData] = useState<{ name: string; industries: Industry[] } | null>(null);
  const [expandedIndustry, setExpandedIndustry] = useState<string | null>(null);
  const [highlightedProvince, setHighlightedProvince] = useState<string | null>(null);

  // 加载 GeoJSON 数据
  useEffect(() => {
    const fetchGeoData = async () => {
      try {
        setLoading(true);
        // 获取中国省级行政区数据（包含海南及南海诸岛）
        const response = await fetch('https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json');
        if (!response.ok) throw new Error('Failed to fetch GeoJSON');
        const data = await response.json();
        setGeoData(data);
        setError(null);
      } catch (err) {
        console.error('Error loading GeoJSON:', err);
        setError('地图数据加载失败');
      } finally {
        setLoading(false);
      }
    };

    fetchGeoData();
  }, []);

  // 计算投影 - 缩小比例确保边缘完整显示
  const { projection, pathGenerator } = useMemo(() => {
    const proj = geoMercator()
      .center([105, 34])
      .scale(250)
      .translate([300 / 2, 260 / 2]);

    const pathGen = geoPath<Feature<Geometry, GeoProperties>>().projection(proj);

    return { projection: proj, pathGenerator: pathGen };
  }, []);

  // 合并所有省份路径生成国界轮廓
  const countryOutline = useMemo(() => {
    if (!geoData || !pathGenerator) return null;
    return geoData.features
      .map(f => pathGenerator(f))
      .filter(Boolean)
      .join(' ');
  }, [geoData, pathGenerator]);

  // 获取省份颜色 - 粉蓝紫渐变色系
  const getProvinceColor = (name: string) => {
    const workers = provinceWorkers[name] || 10000;
    const intensity = workers / 450000;
    if (intensity > 0.6) return '#8B5CF6';      // 紫色
    if (intensity > 0.35) return '#6366F1';     // 靛蓝
    if (intensity > 0.2) return '#3B82F6';      // 蓝色
    if (intensity > 0.1) return '#2563EB';      // 深蓝
    return '#1E1B4B';                           // 深紫蓝
  };

  // 转换坐标为SVG坐标
  const projectPoint = (coords: [number, number]) => {
    if (!projection) return [0, 0];
    const projected = projection(coords);
    return projected || [0, 0];
  };

  // 处理省份点击
  const handleProvinceClick = (name: string, workers: number) => {
    console.log('点击省份:', name);
    onProvinceClick(name, workers);
    const industries = getProvinceIndustryData(name);
    setSelectedProvinceData({ name: name.replace(/省|市|自治区|特别行政区/g, ''), industries });
    setExpandedIndustry(null);
    setHighlightedProvince(name);
    console.log('设置高亮省份:', name);
  };

  // 关闭侧边栏
  const closeSidebar = () => {
    setSelectedProvinceData(null);
    setExpandedIndustry(null);
    setHighlightedProvince(null);
  };

  // 获取最大行业人数用于计算条形图宽度
  const getMaxIndustryCount = () => {
    if (!selectedProvinceData) return 1;
    return Math.max(...selectedProvinceData.industries.map(i => i.count));
  };

  if (loading) {
    return (
      <div className="w-full h-[400px] rounded-2xl flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-3 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-muted text-sm">加载地图数据...</p>
        </div>
      </div>
    );
  }

  if (error || !geoData || !pathGenerator) {
    return (
      <div className="w-full h-[400px] rounded-2xl flex items-center justify-center">
        <p className="text-muted text-sm">{error || '地图数据不可用'}</p>
      </div>
    );
  }

  return (
    <div className="w-full rounded-2xl p-3 relative overflow-hidden">
      <svg
        viewBox="0 0 300 260"
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="spotGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* 粉蓝紫渐变 - 国界线 */}
          <linearGradient id="borderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EC4899" />
            <stop offset="33%" stopColor="#8B5CF6" />
            <stop offset="66%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
          {/* 粉蓝紫渐变 - 省界线 */}
          <linearGradient id="provinceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EC4899" stopOpacity="0.9" />
            <stop offset="33%" stopColor="#8B5CF6" stopOpacity="0.9" />
            <stop offset="66%" stopColor="#6366F1" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        {/* 国界外轮廓 */}
        {countryOutline && (
          <>
            <path
              d={countryOutline}
              fill="none"
              stroke="#0F172A"
              strokeWidth="5"
              strokeLinejoin="round"
              strokeLinecap="round"
              pointerEvents="none"
            />
            <path
              d={countryOutline}
              fill="none"
              stroke="url(#borderGradient)"
              strokeWidth="1.2"
              strokeLinejoin="round"
              strokeLinecap="round"
              pointerEvents="none"
            />
          </>
        )}

        {/* 省份填充 */}
        {geoData.features.map((feature) => {
          const name = feature.properties.name;
          const pathD = pathGenerator(feature);
          if (!pathD) return null;

          return (
            <path
              key={feature.properties.adcode}
              d={pathD}
              fill={getProvinceColor(name)}
              fillOpacity={0.85}
              stroke="url(#provinceGradient)"
              strokeWidth={0.5}
              className="cursor-pointer transition-all duration-300"
              onClick={() => handleProvinceClick(name, provinceWorkers[name] || 10000)}
            />
          );
        })}

        {/* 省份边界线 */}
        {geoData.features.map((feature) => {
          const pathD = pathGenerator(feature);
          if (!pathD) return null;
          return (
            <path
              key={`border-${feature.properties.adcode}`}
              d={pathD}
              fill="none"
              stroke="url(#provinceGradient)"
              strokeWidth="0.4"
              pointerEvents="none"
            />
          );
        })}

        {/* 高亮选中省份 - 最后渲染，显示在最上层 */}
        {(() => {
          if (!highlightedProvince || !geoData) return null;
          const highlightFeature = geoData.features.find(f => f.properties.name === highlightedProvince);
          console.log('高亮省份:', highlightedProvince, '找到:', highlightFeature ? 'yes' : 'no');
          if (!highlightFeature) return null;
          const pathD = pathGenerator(highlightFeature);
          if (!pathD) return null;
          return (
            <path
              d={pathD}
              fill="#EC4899"
              fillOpacity={0.7}
              stroke="#FBBF24"
              strokeWidth={2}
              filter="url(#glow)"
              style={{ pointerEvents: 'none' }}
            />
          );
        })()}

        {/* 所有省份名称标注 */}
        {geoData.features.map((feature) => {
          const center = feature.properties.center;
          if (!center || !Array.isArray(center)) return null;

          const projected = projection(center as [number, number]);
          if (!projected) return null;

          const [x, y] = projected;
          const shortName = provinceShortNames[feature.properties.name] || feature.properties.name;

          return (
            <text
              key={`label-${feature.properties.adcode}`}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="white"
              fontSize="3"
              fontWeight="500"
              className="pointer-events-none select-none"
              style={{ textShadow: '0 1px 2px rgba(0,0,0,0.9)' }}
            >
              {shortName}
            </text>
          );
        })}

        {/* 加班亮点 */}
        {moonActive && overtimeCities.map((city, i) => {
          const [x, y] = projectPoint(city.coords);
          return (
            <g key={`overtime-${i}`}>
              <circle cx={x} cy={y} r="2.5" fill="none" stroke="#FBBF24" strokeWidth="0.8" opacity="0.6">
                <animate attributeName="r" values="2.5;8" dur="1.5s" repeatCount="indefinite" begin={`${i * 0.15}s`} />
                <animate attributeName="opacity" values="0.6;0" dur="1.5s" repeatCount="indefinite" begin={`${i * 0.15}s`} />
              </circle>
              <circle cx={x} cy={y} r="2.5" fill="#FBBF24" filter="url(#spotGlow)">
                <animate attributeName="opacity" values="0.7;1;0.7" dur="1s" repeatCount="indefinite" begin={`${i * 0.1}s`} />
              </circle>
            </g>
          );
        })}

              </svg>

      {/* 行业分布侧边栏 */}
      {selectedProvinceData && (
        <div className="absolute left-0 top-0 bottom-0 w-48 bg-[#070B14]/95 backdrop-blur-xl border-r border-white/10 p-3 overflow-y-auto animate-fade-in-up z-10">
          {/* 标题 */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-white">{selectedProvinceData.name}</h3>
              <p className="text-[10px] text-muted">加班行业分布</p>
            </div>
            <button
              onClick={closeSidebar}
              className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* 行业条形图 */}
          <div className="space-y-3">
            {selectedProvinceData.industries.map((industry, index) => {
              const maxCount = getMaxIndustryCount();
              const widthPercent = (industry.count / maxCount) * 100;
              const isExpanded = expandedIndustry === industry.name;

              return (
                <div key={industry.name}>
                  {/* 行业条 */}
                  <div
                    className="cursor-pointer group"
                    onClick={() => setExpandedIndustry(isExpanded ? null : industry.name)}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm">{industry.icon}</span>
                        <span className="text-xs text-white font-medium">{industry.name}</span>
                      </div>
                      <span className="text-[10px] text-muted">{(industry.count / 1000).toFixed(1)}k</span>
                    </div>
                    <div className="h-5 bg-white/5 rounded overflow-hidden relative">
                      <div
                        className="h-full rounded transition-all duration-500 flex items-center"
                        style={{ width: `${widthPercent}%`, backgroundColor: industry.color }}
                      >
                        <div className="absolute right-2 flex items-center gap-1">
                          <svg
                            className={`w-3 h-3 text-white/70 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 展开的职位列表 */}
                  {isExpanded && (
                    <div className="mt-2 pl-6 space-y-1.5 animate-fade-in-up">
                      {industry.positions.map((position, pIndex) => {
                        const posWidthPercent = (position.count / industry.count) * 100;
                        return (
                          <div key={position.name} className="flex items-center gap-2">
                            <span className="text-[10px] text-muted/80 w-14 truncate">{position.name}</span>
                            <div className="flex-1 h-2 bg-white/5 rounded overflow-hidden">
                              <div
                                className="h-full rounded"
                                style={{ width: `${posWidthPercent}%`, backgroundColor: industry.color, opacity: 0.6 }}
                              />
                            </div>
                            <span className="text-[9px] text-muted w-8 text-right">{(position.count / 1000).toFixed(1)}k</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* 总计 */}
          <div className="mt-4 pt-3 border-t border-white/10">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-muted">总计加班人数</span>
              <span className="text-xs font-bold text-accent">
                {(selectedProvinceData.industries.reduce((sum, i) => sum + i.count, 0) / 10000).toFixed(1)}万
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
