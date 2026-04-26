'use client';

import { useState, useEffect } from 'react';
import FeedCard from '@/components/FeedCard';

// 行业分类
const industries = {
  '互联网': ['产品经理', '前端开发', '后端开发', '测试工程师', '运维工程师', 'UI设计师', '数据分析师', '算法工程师'],
  '金融': ['投资经理', '风控专员', '产品经理', '数据分析师', '量化交易员'],
  '教育': ['课程顾问', '教研老师', '运营专员', '产品经理'],
  '医疗': ['医学编辑', '产品经理', '数据分析师', '临床协调员'],
  '电商': ['运营专员', '产品经理', '客服主管', '供应链专员'],
};

// 城市列表
const cities = [
  { name: '北京', isLocated: true },
  { name: '上海' },
  { name: '广州' },
  { name: '深圳' },
  { name: '杭州' },
  { name: '成都' },
  { name: '武汉' },
  { name: '南京' },
  { name: '西安' },
  { name: '苏州' },
];

// 模拟数据
const feedData = [
  {
    id: 1, city: '北京', position: '高级产品经理', company: '字节跳动 · 朝阳区', salary: '35-50K', industry: '互联网',
    tags: [{ text: '不加班', type: 'trend' as const }, { text: '公积金全额', type: 'salary' as const }],
    content: '团队氛围好，领导nice，有成长空间',
  },
  {
    id: 2, city: '上海', position: '前端开发工程师', company: '蚂蚁集团 · 浦东新区', salary: '25-35K', industry: '互联网',
    tags: [{ text: '神仙主管', type: 'trend' as const }, { text: '弹性打卡', type: 'trend' as const }],
    content: '技术栈新，可以学到很多东西',
  },
  {
    id: 3, city: '深圳', position: '数据分析师', company: '腾讯 · 南山区', salary: '30-45K', industry: '互联网',
    tags: [{ text: '免费三餐', type: 'salary' as const }, { text: '年终奖高', type: 'salary' as const }],
    content: '福利待遇好，加班有补贴',
  },
  {
    id: 4, city: '杭州', position: '全栈开发', company: '某创业公司 · 西湖区', salary: '15-25K', industry: '互联网',
    tags: [{ text: '避雷', type: 'warning' as const }, { text: '加班严重', type: 'warning' as const }],
    content: '试用期不给交社保，经常拖欠工资，快跑！',
  },
  {
    id: 5, city: '广州', position: 'UI设计师', company: '网易 · 天河区', salary: '20-30K', industry: '互联网',
    tags: [{ text: '不加班', type: 'trend' as const }, { text: '神仙主管', type: 'trend' as const }],
    content: '设计团队很强，可以学到很多',
  },
  {
    id: 6, city: '北京', position: '算法工程师', company: '美团 · 海淀区', salary: '50-80K', industry: '互联网',
    tags: [{ text: '高薪', type: 'salary' as const }, { text: '六险一金', type: 'salary' as const }],
    content: '薪资天花板，但对学历要求高',
  },
  {
    id: 7, city: '成都', position: '运营专员', company: '某教育公司 · 高新区', salary: '8-12K', industry: '教育',
    tags: [{ text: '裁员潮', type: 'warning' as const }, { text: '行业下行', type: 'warning' as const }],
    content: '教育行业现在很不稳定，慎重考虑',
  },
  {
    id: 8, city: '上海', position: 'Java开发', company: '拼多多 · 长宁区', salary: '40-60K', industry: '互联网',
    tags: [{ text: '高薪', type: 'salary' as const }, { text: '强度大', type: 'warning' as const }],
    content: '钱多但累，适合想赚钱的年轻人',
  },
  {
    id: 9, city: '深圳', position: '产品运营', company: '大疆 · 南山区', salary: '18-28K', industry: '互联网',
    tags: [{ text: '行业领先', type: 'trend' as const }, { text: '福利好', type: 'salary' as const }],
    content: '无人机行业龙头，发展前景好',
  },
  {
    id: 10, city: '杭州', position: '测试工程师', company: '阿里巴巴 · 余杭区', salary: '25-40K', industry: '互联网',
    tags: [{ text: '大厂背书', type: 'trend' as const }, { text: '期权', type: 'salary' as const }],
    content: 'P6起招，有期权，福利齐全',
  },
  {
    id: 11, city: '北京', position: '投资经理', company: '某证券公司 · 金融街', salary: '30-50K', industry: '金融',
    tags: [{ text: '行业趋势', type: 'trend' as const }, { text: '奖金高', type: 'salary' as const }],
    content: '金融行业核心岗位，奖金丰厚',
  },
  {
    id: 12, city: '上海', position: '量化交易员', company: '某私募基金 · 陆家嘴', salary: '60-100K', industry: '金融',
    tags: [{ text: '高薪', type: 'salary' as const }, { text: '门槛高', type: 'warning' as const }],
    content: '薪资天花板，但需要名校背景',
  },
];

export default function IntelligencePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('全部');
  const [showIndustryPicker, setShowIndustryPicker] = useState(false);
  const [showCityPicker, setShowCityPicker] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string>('北京');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const filters = ['全部', '高薪', '避雷', '行业趋势'];

  const filteredData = feedData.filter((item) => {
    const matchesSearch =
      item.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.city.includes(searchQuery);
    const matchesCity = selectedCity === '全部' || item.city === selectedCity;
    const matchesIndustry = !selectedIndustry || item.industry === selectedIndustry;
    const matchesPosition = !selectedPosition || item.position.includes(selectedPosition);

    if (activeFilter === '全部') return matchesSearch && matchesCity && matchesIndustry && matchesPosition;
    if (activeFilter === '高薪') return matchesSearch && matchesCity && matchesIndustry && matchesPosition && item.tags.some((t) => t.type === 'salary');
    if (activeFilter === '避雷') return matchesSearch && matchesCity && matchesIndustry && matchesPosition && item.tags.some((t) => t.type === 'warning');
    if (activeFilter === '行业趋势') return matchesSearch && matchesCity && matchesIndustry && matchesPosition && item.tags.some((t) => t.type === 'trend');
    return matchesSearch && matchesCity && matchesIndustry && matchesPosition;
  });

  return (
    <div className="min-h-screen">
      {/* 顶部栏 */}
      <header className="sticky top-0 z-20 backdrop-blur-2xl bg-[#070B14]/80 border-b border-white/5">
        <div className="px-4 py-3">
          {/* 搜索框 */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-lg opacity-0 group-focus-within:opacity-100 transition-opacity" />
            <div className="relative flex items-center">
              <svg className="absolute left-4 w-5 h-5 text-muted group-focus-within:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
              <input
                type="text"
                placeholder="搜索职位/公司/城市..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/5 rounded-xl text-foreground placeholder:text-muted/50 border border-white/5 focus:outline-none focus:border-primary/30 focus:bg-white/[0.07] transition-all"
              />
            </div>
          </div>

          {/* 行业 + 地点 筛选器 */}
          <div className="flex gap-2 mt-3">
            {/* 行业筛选 */}
            <button
              onClick={() => { setShowIndustryPicker(!showIndustryPicker); setShowCityPicker(false); }}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm transition-all duration-300 ${
                selectedIndustry || selectedPosition
                  ? 'bg-gradient-to-r from-primary/20 to-accent/20 text-foreground border border-primary/30'
                  : 'bg-white/5 text-muted border border-white/5 hover:bg-white/10 hover:border-white/10'
              }`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
              </svg>
              <span className="font-medium">{selectedPosition || selectedIndustry || '行业'}</span>
              <svg className={`w-3 h-3 transition-transform ${showIndustryPicker ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </button>

            {/* 地点筛选 */}
            <button
              onClick={() => { setShowCityPicker(!showCityPicker); setShowIndustryPicker(false); }}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm transition-all duration-300 ${
                selectedCity !== '全部'
                  ? 'bg-gradient-to-r from-primary/20 to-accent/20 text-foreground border border-primary/30'
                  : 'bg-white/5 text-muted border border-white/5 hover:bg-white/10 hover:border-white/10'
              }`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
              <span className="font-medium">{selectedCity}</span>
              <svg className={`w-3 h-3 transition-transform ${showCityPicker ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
          </div>
        </div>

        {/* 行业选择器面板 */}
        {showIndustryPicker && (
          <div className="absolute left-0 right-0 bg-[#0D1320]/95 backdrop-blur-xl border-b border-white/5 shadow-2xl z-30 animate-fade-in-up">
            <div className="p-4 max-h-[60vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">选择行业</h3>
                <button onClick={() => { setSelectedIndustry(null); setSelectedPosition(null); setShowIndustryPicker(false); }} className="text-xs text-muted hover:text-accent transition-colors">清除筛选</button>
              </div>
              <div className="space-y-2">
                {Object.entries(industries).map(([industry, positions]) => (
                  <div key={industry}>
                    <button
                      onClick={() => { setSelectedIndustry(industry); setSelectedPosition(null); }}
                      className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all duration-200 ${
                        selectedIndustry === industry
                          ? 'bg-gradient-to-r from-primary/20 to-accent/20 text-foreground border border-primary/30'
                          : 'bg-white/5 hover:bg-white/10 border border-transparent'
                      }`}
                    >
                      {industry}
                    </button>
                    {selectedIndustry === industry && (
                      <div className="flex flex-wrap gap-2 mt-3 pl-2 animate-fade-in-up">
                        {positions.map((pos) => (
                          <button
                            key={pos}
                            onClick={() => { setSelectedPosition(pos); setShowIndustryPicker(false); }}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                              selectedPosition === pos
                                ? 'bg-gradient-to-r from-primary to-accent text-white'
                                : 'bg-white/5 border border-white/10 hover:bg-white/10'
                            }`}
                          >
                            {pos}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 城市选择器面板 */}
        {showCityPicker && (
          <div className="absolute left-0 right-0 bg-[#0D1320]/95 backdrop-blur-xl border-b border-white/5 shadow-2xl z-30 animate-fade-in-up">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">选择城市</h3>
                <button onClick={() => { setSelectedCity('全部'); setShowCityPicker(false); }} className="text-xs text-muted hover:text-accent transition-colors">清除筛选</button>
              </div>
              {/* 当前定位 */}
              <div className="mb-4">
                <p className="text-xs text-muted mb-2 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                  当前定位
                </p>
                <button
                  onClick={() => { setSelectedCity('北京'); setShowCityPicker(false); }}
                  className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl text-foreground border border-primary/30"
                >
                  <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                  <span className="font-medium">北京</span>
                </button>
              </div>
              {/* 热门城市 */}
              <p className="text-xs text-muted mb-2">热门城市</p>
              <div className="grid grid-cols-5 gap-2">
                {cities.map((city) => (
                  <button
                    key={city.name}
                    onClick={() => { setSelectedCity(city.name); setShowCityPicker(false); }}
                    className={`py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                      selectedCity === city.name
                        ? 'bg-gradient-to-r from-primary to-accent text-white'
                        : 'bg-white/5 hover:bg-white/10 border border-white/5'
                    }`}
                  >
                    {city.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 标签筛选 */}
        <div className="px-4 pb-3 flex gap-2 overflow-x-auto scrollbar-hide">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap font-medium transition-all duration-300 ${
                activeFilter === filter
                  ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/20'
                  : 'bg-white/5 text-muted border border-white/5 hover:bg-white/10 hover:text-foreground'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </header>

      {/* 瀑布流布局 */}
      <div className={`px-3 py-4 columns-2 gap-3 transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        {filteredData.map((item, index) => (
          <FeedCard
            key={item.id}
            city={item.city}
            position={item.position}
            salary={item.salary}
            company={item.company}
            tags={item.tags}
            content={item.content}
            index={index}
          />
        ))}
      </div>

      {/* 空状态 */}
      {filteredData.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 animate-fade-in-up">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4">
            <svg className="w-10 h-10 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </div>
          <p className="text-muted">没有找到相关内容</p>
        </div>
      )}
    </div>
  );
}
