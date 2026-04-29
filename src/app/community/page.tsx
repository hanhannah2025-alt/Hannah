'use client';

import { useState, useEffect } from 'react';
import ChinaMapGeo from '@/components/ChinaMapGeo';

// 薪资统计数据
const salaryData = [
  { years: '0-1年', avg: 12, top10: 18, bottom10: 8 },
  { years: '1-3年', avg: 18, top10: 28, bottom10: 12 },
  { years: '3-5年', avg: 28, top10: 45, bottom10: 18 },
  { years: '5-10年', avg: 42, top10: 70, bottom10: 25 },
  { years: '10年以上', avg: 58, top10: 100, bottom10: 35 },
];

// 省份从业者数据
const provinceWorkers: Record<string, number> = {
  '北京': 280000, '上海': 320000, '广东': 410000, '浙江': 185000, '江苏': 195000,
  '四川': 145000, '湖北': 125000, '陕西': 95000, '山东': 135000, '福建': 110000,
  '河南': 105000, '湖南': 98000, '安徽': 88000, '河北': 78000, '辽宁': 72000,
  '重庆': 85000, '天津': 68000, '云南': 55000, '贵州': 48000, '广西': 62000,
  '黑龙江': 45000, '吉林': 38000, '山西': 52000, '江西': 58000, '甘肃': 32000,
  '内蒙古': 28000, '新疆': 22000, '海南': 18000, '宁夏': 15000, '青海': 12000,
  '西藏': 8000, '台湾': 35000, '香港': 85000, '澳门': 12000,
};

type Tab = 'map' | 'radar' | 'salary';
type RadarStep = 'input' | 'scanning' | 'result';

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<Tab>('map');
  const [moonActive, setMoonActive] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [overtimeCount, setOvertimeCount] = useState(0);
  const [selectedYears, setSelectedYears] = useState('全部');

  // 雷达状态
  const [radarStep, setRadarStep] = useState<RadarStep>('input');
  const [formData, setFormData] = useState({ company: '', position: '', salary: '', yearsOfExperience: '' });
  const [scanProgress, setScanProgress] = useState(0);

  useEffect(() => {
    if (moonActive) {
      const interval = setInterval(() => setOvertimeCount((prev) => prev + Math.floor(Math.random() * 50)), 500);
      return () => clearInterval(interval);
    }
  }, [moonActive]);

  useEffect(() => {
    if (radarStep === 'scanning') {
      const interval = setInterval(() => {
        setScanProgress((prev) => {
          if (prev >= 100) { clearInterval(interval); setTimeout(() => setRadarStep('result'), 300); return 100; }
          return prev + 2;
        });
      }, 60);
      return () => clearInterval(interval);
    }
  }, [radarStep]);

  const handleProvinceClick = (name: string) => {
    setSelectedProvince(name);
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* 背景 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-[100px] animate-breathe" />
        <div className="absolute bottom-40 right-10 w-80 h-80 bg-accent/10 rounded-full blur-[100px] animate-breathe" style={{ animationDelay: '2s' }} />
      </div>

      {/* 顶部 */}
      <header className="sticky top-0 z-20 bg-[#070B14]/80 backdrop-blur-xl border-b border-white/5 px-3 sm:px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-gradient">行业社区</h1>
            <p className="text-[10px] sm:text-xs text-muted mt-0.5">看到你的同行在哪里</p>
          </div>
          {moonActive && activeTab === 'map' && (
            <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-accent/20 to-warning/20 rounded-full animate-fade-in-up border border-accent/20">
              <div className="relative">
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-accent" />
                <div className="absolute inset-0 w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-accent animate-ping" />
              </div>
              <span className="text-[10px] sm:text-sm text-accent font-semibold">{overtimeCount.toLocaleString()} 人加班中</span>
            </div>
          )}
        </div>

        {/* Tab切换 */}
        <div className="flex gap-2">
          <button onClick={() => setActiveTab('map')} className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-all duration-300 ${activeTab === 'map' ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/20' : 'bg-white/5 text-muted border border-white/5 hover:bg-white/10'}`}>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" /></svg>
            <span className="text-xs">行业地图</span>
          </button>
          <button onClick={() => setActiveTab('radar')} className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-all duration-300 ${activeTab === 'radar' ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/20' : 'bg-white/5 text-muted border border-white/5 hover:bg-white/10'}`}>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.348 14.651a3.75 3.75 0 0 1 0-5.303m5.304 0a3.75 3.75 0 0 1 0 5.303m-7.425 2.122a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.808-3.808-9.98 0-13.789m13.788 0c3.808 3.808 3.808 9.981 0 13.79M12 12h.008v.007H12V12Z" /></svg>
            <span className="text-xs">身价雷达</span>
          </button>
          <button onClick={() => setActiveTab('salary')} className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-all duration-300 ${activeTab === 'salary' ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/20' : 'bg-white/5 text-muted border border-white/5 hover:bg-white/10'}`}>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>
            <span className="text-xs">涨薪路径</span>
          </button>
        </div>
      </header>

      {/* 地图内容 */}
      {activeTab === 'map' && (
        <div className="flex-1 relative animate-fade-in-up overflow-y-auto pb-28">
          {/* 薪资统计 */}
          <div className="px-3 sm:px-4 pt-3 sm:pt-4">
            <div className="glass-card rounded-2xl p-3 sm:p-4 mb-3 sm:mb-4">
              <div className="flex flex-col sm:flex-row items-center justify-between mb-3 gap-2">
                <h3 className="font-semibold text-xs sm:text-sm">薪资分布统计</h3>
                <div className="flex gap-0.5 sm:gap-1">
                  {['全部', '0-1年', '1-3年', '3-5年', '5-10年'].map((y) => (
                    <button key={y} onClick={() => setSelectedYears(y)} className={`px-1.5 sm:px-2 py-1 sm:py-1 text-[9px] sm:text-[10px] rounded-lg transition-all ${selectedYears === y ? 'bg-primary text-white' : 'bg-white/5 text-muted'}`}>
                      {y}
                    </button>
                  ))}
                </div>
              </div>

              {/* 图表 */}
              <div className="h-32 sm:h-40 flex items-end justify-around gap-1 sm:gap-2">
                {salaryData.map((item, i) => {
                  const maxVal = 100;
                  const show = selectedYears === '全部' || selectedYears === item.years;
                  return (
                    <div key={i} className={`flex flex-col items-center gap-0.5 sm:gap-1 transition-all duration-300 ${show ? 'opacity-100' : 'opacity-30'}`}>
                      <div className="relative w-8 sm:w-10 flex flex-col items-center justify-end h-20 sm:h-28">
                        <div className="absolute w-full rounded-t bg-gradient-to-t from-accent/60 to-accent transition-all duration-500" style={{ bottom: `${(item.top10 / maxVal) * 100}%`, height: `${((item.top10 - item.avg) / maxVal) * 100}%` }} />
                        <div className="absolute w-full bg-gradient-to-t from-primary to-primary-light transition-all duration-500" style={{ bottom: `${(item.avg / maxVal) * 100}%`, height: `${((item.avg - item.bottom10) / maxVal) * 100}%` }} />
                        <div className="absolute w-full rounded-b bg-gradient-to-b from-primary/30 to-primary/10 transition-all duration-500" style={{ bottom: 0, height: `${(item.bottom10 / maxVal) * 100}%` }} />
                      </div>
                      <span className="text-[9px] sm:text-[10px] text-muted whitespace-nowrap">{item.years}</span>
                      <span className="text-[10px] sm:text-xs font-bold text-primary">{item.avg}K</span>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-center gap-3 sm:gap-4 mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-white/5">
                <div className="flex items-center gap-1">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded bg-gradient-to-r from-primary to-primary-light" />
                  <span className="text-[9px] sm:text-[10px] text-muted">平均薪资</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded bg-accent" />
                  <span className="text-[9px] sm:text-[10px] text-muted">Top 10%</span>
                </div>
              </div>
            </div>
          </div>

          {/* 中国地图 */}
          <div className="px-3 sm:px-4">
            <div className="glass-card rounded-2xl p-3 sm:p-4 mb-3 sm:mb-4">
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <h3 className="font-semibold text-sm">从业者分布</h3>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="flex items-center gap-0.5 sm:gap-1">
                    <div className="w-2 sm:w-3 h-2 sm:h-3 rounded" style={{ backgroundColor: '#1E1B4B' }} />
                    <div className="w-2 sm:w-3 h-2 sm:h-3 rounded" style={{ backgroundColor: '#3730A3' }} />
                    <div className="w-2 sm:w-3 h-2 sm:h-3 rounded" style={{ backgroundColor: '#4F46E5' }} />
                    <div className="w-2 sm:w-3 h-2 sm:h-3 rounded" style={{ backgroundColor: '#6366F1' }} />
                    <div className="w-2 sm:w-3 h-2 sm:h-3 rounded" style={{ backgroundColor: '#F472B6' }} />
                  </div>
                  <span className="text-[9px] sm:text-[10px] text-muted">低 → 高</span>
                </div>
              </div>

              <ChinaMapGeo
                moonActive={moonActive}
                onProvinceClick={(name) => handleProvinceClick(name)}
              />

              {moonActive && (
                <div className="flex items-center justify-center gap-2 mt-3 pt-3 border-t border-white/5">
                  <div className="w-3 h-3 rounded-full bg-warning animate-pulse" />
                  <span className="text-xs text-warning font-medium">加班亮点已点亮</span>
                </div>
              )}
            </div>
          </div>

          {/* 省份信息弹窗 */}
          {selectedProvince && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in-scale" onClick={() => setSelectedProvince(null)}>
              <div className="glass-card rounded-2xl p-5 w-64 mx-4" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-lg">{selectedProvince}</h3>
                  <button onClick={() => setSelectedProvince(null)} className="text-muted hover:text-foreground">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
                  </button>
                </div>
                <p className="text-xs text-muted mb-1">从业者数量</p>
                <p className="text-2xl font-bold text-gradient-accent">{((provinceWorkers[selectedProvince] || 10000) / 10000).toFixed(1)}万</p>
                <div className="flex gap-2 mt-4">
                  <button className="flex-1 py-2 bg-gradient-to-r from-primary/20 to-accent/20 text-primary text-xs font-medium rounded-xl">查看岗位</button>
                  <button className="flex-1 py-2 bg-white/5 text-xs rounded-xl border border-white/10">加入社区</button>
                </div>
              </div>
            </div>
          )}

          {/* 月亮按钮 */}
          <div className="fixed bottom-16 sm:bottom-20 left-0 right-0 flex justify-center pb-3 sm:pb-4 z-40">
            <button onClick={() => { setMoonActive(!moonActive); setOvertimeCount(moonActive ? 0 : 150000); }} className={`group relative flex items-center gap-2 sm:gap-3 px-4 sm:px-7 py-3 sm:py-4 rounded-full transition-all duration-500 ${moonActive ? 'bg-gradient-to-r from-accent to-warning text-white shadow-lg shadow-accent/30 scale-105' : 'glass-card hover:border-accent/30'}`}>
              {moonActive && <div className="absolute -inset-1 bg-gradient-to-r from-accent to-warning rounded-full opacity-30 blur-lg animate-pulse" />}
              <div className={`relative w-7 sm:w-9 h-7 sm:h-9 transition-transform duration-500 ${moonActive ? 'rotate-12' : 'group-hover:scale-110'}`}>
                {moonActive ? (
                  <svg className="w-9 h-9 drop-shadow-lg" viewBox="0 0 24 24" fill="currentColor"><path d="M21.64 13a1 1 0 0 0-1.05-.14 8.05 8.05 0 0 1-3.37.73 8.15 8.15 0 0 1-8.14-8.14 8.59 8.59 0 0 1 .25-2A1 1 0 0 0 8 2.36a10.14 10.14 0 1 0 14 11.69 1 1 0 0 0-.36-1.05z" /></svg>
                ) : (
                  <svg className="w-9 h-9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" /></svg>
                )}
              </div>
              <div className="text-left relative z-10">
                <p className="font-semibold text-sm sm:text-base">{moonActive ? '加班中' : '我在加班'}</p>
                <p className="text-[10px] sm:text-xs opacity-70">{moonActive ? '点击结束' : '点亮让同行看到'}</p>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* 涨薪路径内容 */}
      {activeTab === 'salary' && (
        <div className="flex-1 px-4 py-5 animate-fade-in-up overflow-y-auto pb-28">
          <div className="text-center mb-4">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 mb-3 animate-float">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}>
                <defs>
                  <linearGradient id="boltGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6366F1" />
                    <stop offset="100%" stopColor="#F472B6" />
                  </linearGradient>
                </defs>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" stroke="url(#boltGradient)" />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-gradient">涨薪路径</h2>
            <p className="text-muted text-xs mt-1">精选课程，加速成长</p>
          </div>

          {/* 好课优享 */}
          <div className="mb-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-4 rounded-full bg-gradient-to-b from-primary to-accent" />
              <h3 className="font-semibold text-foreground text-sm">好课优享</h3>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { title: '产品经理进阶', students: '12.8K', rating: 4.9, price: '¥399', tags: ['热门', '实战'] },
                { title: '数据分析实战', students: '8.5K', rating: 4.8, price: '¥499', tags: ['Python', 'SQL'] },
                { title: '运营增长策略', students: '6.2K', rating: 4.7, price: '¥299', tags: ['增长', '案例'] },
                { title: '项目管理PMP', students: '9.1K', rating: 4.9, price: '¥599', tags: ['认证', '管理'] },
              ].map((course, i) => (
                <div key={i} className="glass-card rounded-2xl p-3 group card-hover-lift">
                  <div className="flex gap-1.5 mb-2">
                    {course.tags.map((tag, j) => (
                      <span key={j} className="px-1.5 py-0.5 bg-primary/20 text-primary text-[9px] rounded-lg">{tag}</span>
                    ))}
                  </div>
                  <h4 className="font-medium text-xs text-foreground mb-2 truncate">{course.title}</h4>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] text-muted">{course.students}</span>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, k) => (
                          <svg key={k} className={`w-2.5 h-2.5 ${k < Math.floor(course.rating) ? 'text-warning' : 'text-muted/30'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.95 1.69l1.07 3.292c.3.921-.005 1.603.3 1.902 0l-2.362 1.845c-.3.23.505-.509.55-.838l.866 3.375c.323 1.005 1.624.005 1.947 0l-3.234-2.025c-.293-.182-.646-.182-.94 0l-3.234 2.025c-.323.005-1.624-1.005-1.947 0l.866-3.375c-.05-.329-.325-.608-.55-.838l-2.362-1.845z" /></svg>
                        ))}
                      </div>
                    </div>
                    <span className="text-xs font-bold text-accent">{course.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 技能红利 */}
          <div className="mb-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-4 rounded-full bg-gradient-to-b from-accent to-warning" />
              <h3 className="font-semibold text-foreground text-sm">技能红利</h3>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { title: 'Python数据分析', students: '15.2K', rating: 4.8, price: '¥299', tags: ['初级', '实战'] },
                { title: '机器学习入门', students: '8.9K', rating: 4.7, price: '¥399', tags: ['AI', '算法'] },
                { title: '前端开发进阶', students: '12.5K', rating: 4.9, price: '¥349', tags: ['高级', '框架'] },
                { title: '云计算DevOps', students: '6.3K', rating: 4.6, price: '¥449', tags: ['运维', '部署'] },
              ].map((course, i) => (
                <div key={i} className="glass-card rounded-2xl p-3 group card-hover-lift">
                  <div className="flex gap-1.5 mb-2">
                    {course.tags.map((tag, j) => (
                      <span key={j} className="px-1.5 py-0.5 bg-accent/20 text-accent text-[9px] rounded-lg">{tag}</span>
                    ))}
                  </div>
                  <h4 className="font-medium text-xs text-foreground mb-2 truncate">{course.title}</h4>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] text-muted">{course.students}</span>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, k) => (
                          <svg key={k} className={`w-2.5 h-2.5 ${k < Math.floor(course.rating) ? 'text-warning' : 'text-muted/30'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.95 1.69l1.07 3.292c.3.921-.005 1.603.3 1.902 0l-2.362 1.845c-.3.23.505-.509.55-.838l.866 3.375c.323 1.005 1.624.005 1.947 0l-3.234-2.025c-.293-.182-.646-.182-.94 0l-3.234 2.025c-.323.005-1.624-1.005-1.947 0l.866-3.375c-.05-.329-.325-.608-.55-.838l-2.362-1.845z" /></svg>
                        ))}
                      </div>
                    </div>
                    <span className="text-xs font-bold text-accent">{course.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 职场杠杆 */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-4 rounded-full bg-gradient-to-b from-warning to-danger" />
              <h3 className="font-semibold text-foreground text-sm">职场杠杆</h3>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { title: '跳槽策略', students: '18.5K', rating: 4.8, price: '¥199', tags: ['实战', '案例'] },
                { title: '晋升谈判', students: '12.3K', rating: 4.9, price: '¥249', tags: ['沟通', '数据'] },
                { title: '管理能力提升', students: '9.8K', rating: 4.7, price: '¥399', tags: ['团队', '领导'] },
                { title: '高效沟通', students: '15.6K', rating: 4.6, price: '¥179', tags: ['表达', '汇报'] },
              ].map((course, i) => (
                <div key={i} className="glass-card rounded-2xl p-3 group card-hover-lift">
                  <div className="flex gap-1.5 mb-2">
                    {course.tags.map((tag, j) => (
                      <span key={j} className="px-1.5 py-0.5 bg-warning/20 text-warning text-[9px] rounded-lg">{tag}</span>
                    ))}
                  </div>
                  <h4 className="font-medium text-xs text-foreground mb-2 truncate">{course.title}</h4>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] text-muted">{course.students}</span>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, k) => (
                          <svg key={k} className={`w-2.5 h-2.5 ${k < Math.floor(course.rating) ? 'text-warning' : 'text-muted/30'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.95 1.69l1.07 3.292c.3.921-.005 1.603.3 1.902 0l-2.362 1.845c-.3.23.505-.509.55-.838l.866 3.375c.323 1.005 1.624.005 1.947 0l-3.234-2.025c-.293-.182-.646-.182-.94 0l-3.234 2.025c-.323.005-1.624-1.005-1.947 0l.866-3.375c-.05-.329-.325-.608-.55-.838l-2.362-1.845z" /></svg>
                        ))}
                      </div>
                    </div>
                    <span className="text-xs font-bold text-accent">{course.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 身价雷达内容 */}
      {activeTab === 'radar' && (
        <div className="flex-1 px-4 py-6 animate-fade-in-up overflow-y-auto">
          {radarStep === 'input' && (
            <div>
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 mb-3 animate-float">
                  <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.348 14.651a3.75 3.75 0 0 1 0-5.303m5.304 0a3.75 3.75 0 0 1 0 5.303m-7.425 2.122a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.808-3.808-9.98 0-13.789m13.788 0c3.808 3.808 3.808 9.981 0 13.79M12 12h.008v.007H12V12Z" /></svg>
                </div>
                <h2 className="text-lg font-bold text-gradient">身价雷达</h2>
                <p className="text-muted text-xs mt-1">发现你的真实市场价值</p>
              </div>
              <div className="space-y-3 max-w-sm mx-auto">
                {[
                  { key: 'company', label: '公司名称', placeholder: '例如：字节跳动' },
                  { key: 'position', label: '职位名称', placeholder: '例如：高级产品经理' },
                  { key: 'salary', label: '当前月薪 (K)', placeholder: '例如：25' },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="block text-xs text-muted mb-1.5">{field.label}</label>
                    <input type="text" placeholder={field.placeholder} value={formData[field.key as keyof typeof formData]} onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })} className="w-full px-3.5 py-3 bg-white/5 rounded-xl text-foreground placeholder:text-muted/30 border border-white/5 focus:outline-none focus:border-primary/30 focus:bg-white/[0.07] transition-all text-sm" />
                  </div>
                ))}
                <div>
                  <label className="block text-xs text-muted mb-1.5">工作年限</label>
                  <select value={formData.yearsOfExperience} onChange={(e) => setFormData({ ...formData, yearsOfExperience: e.target.value })} className="w-full px-3.5 py-3 bg-white/5 rounded-xl text-foreground border border-white/5 focus:outline-none focus:border-primary/30 transition-all appearance-none text-sm">
                    <option value="" className="text-gray-400">请选择</option>
                    <option value="0-1" className="text-gray-400">0-1年</option>
                    <option value="1-3" className="text-gray-400">1-3年</option>
                    <option value="3-5" className="text-gray-400">3-5年</option>
                    <option value="5-10" className="text-gray-400">5-10年</option>
                    <option value="10+" className="text-gray-400">10年以上</option>
                  </select>
                </div>
                <button onClick={() => { if (formData.company && formData.position && formData.salary) { setScanProgress(0); setRadarStep('scanning'); } }} disabled={!formData.company || !formData.position || !formData.salary} className="w-full py-3.5 btn-gradient text-white font-semibold rounded-xl disabled:opacity-40 disabled:cursor-not-allowed mt-3 text-sm">开始扫描</button>
              </div>
            </div>
          )}

          {radarStep === 'scanning' && (
            <div className="flex flex-col items-center justify-center min-h-[50vh] animate-fade-in-scale">
              <div className="relative w-44 h-44 mb-4">
                <div className="absolute inset-0 rounded-full border border-primary/20 animate-breathe" />
                <div className="absolute inset-4 rounded-full border border-primary/15" />
                <div className="absolute inset-8 rounded-full border border-primary/10" />
                <div className="absolute inset-0 rounded-full border-2 border-primary/50 animate-pulse-ring" />
                <div className="absolute inset-0 animate-radar-scan"><div className="absolute top-1/2 left-1/2 w-1/2 h-0.5 bg-gradient-to-r from-primary via-accent to-transparent origin-left rounded-full" /></div>
                <div className="absolute inset-0 flex items-center justify-center"><div className="w-4 h-4 rounded-full bg-gradient-to-r from-primary to-accent animate-pulse-glow" /></div>
              </div>
              <div className="w-32 mb-2"><div className="h-1 bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-100" style={{ width: `${scanProgress}%` }} /></div></div>
              <p className="text-foreground text-base font-medium">{scanProgress}%</p>
              <p className="text-muted text-xs mt-1">正在分析你的身价...</p>
            </div>
          )}

          {radarStep === 'result' && (
            <div className="pb-4">
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-warning/20 mb-3 animate-float">
                  <span className="text-2xl font-bold text-gradient-accent">{Math.floor(parseInt(formData.salary) * 1.3)}</span>
                </div>
                <h2 className="text-base font-bold text-gradient">你的市场身价</h2>
              </div>
              <div className="glass-card rounded-2xl p-5 mb-4">
                <h3 className="text-sm font-semibold text-foreground mb-4">薪资对比</h3>
                {(() => {
                  const currentSalary = parseInt(formData.salary) || 12;
                  const avgSalary = Math.floor(currentSalary * 1.15) || 15;
                  const diffPercent = Math.round(((currentSalary - avgSalary) / avgSalary) * 100);
                  const isAbove = diffPercent > 0;

                  return (
                    <div>
                      {/* 左右对比条形图 */}
                      <div className="relative mb-4">
                        <div className="flex gap-3 items-center">
                          {/* 左侧 - 你的薪资 */}
                          <div className="flex-1">
                            <div className="text-center mb-2">
                              <p className="text-xs text-muted">你的薪资</p>
                              <p className={`text-2xl font-bold ${isAbove ? 'text-success' : 'text-foreground'}`}>{currentSalary}w</p>
                            </div>
                            <div className="h-8 bg-white/5 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all duration-1000 ${isAbove ? 'bg-gradient-to-r from-success to-emerald-500' : 'bg-gradient-to-r from-danger to-orange-500'}`}
                                style={{ width: `${Math.min((currentSalary / 100) * 100, 100)}%` }}
                              />
                            </div>
                          </div>

                          {/* 中间 VS */}
                          <div className="flex items-center justify-center px-2">
                            <span className="text-xs font-bold text-muted">VS</span>
                          </div>

                          {/* 右侧 - 行业平均 */}
                          <div className="flex-1">
                            <div className="text-center mb-2">
                              <p className="text-xs text-muted">行业平均</p>
                              <p className="text-2xl font-bold text-primary">{avgSalary}w</p>
                            </div>
                            <div className="h-8 bg-white/5 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-primary to-primary-light rounded-full transition-all duration-1000"
                                style={{ width: `${Math.min((avgSalary / 100) * 100, 100)}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
              <div className="flex gap-3">
                <button onClick={() => setRadarStep('input')} className="flex-1 py-3 bg-white/5 text-foreground font-medium rounded-xl border border-white/5 hover:bg-white/10 transition-colors">重新评估</button>
                <button className="flex-1 py-3 btn-gradient text-white font-medium rounded-xl">学习路径</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
