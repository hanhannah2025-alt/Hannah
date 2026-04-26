'use client';

import { useState } from 'react';

interface Offer {
  id: 'A' | 'B';
  company: string;
  position: string;
  baseSalary: number;
  bonus: number;
  probation: number;
  workHours: string;
  location: string;
  stock?: string;
}

const defaultOffers: Record<'A' | 'B', Offer> = {
  A: { id: 'A', company: '字节跳动', position: '高级产品经理', baseSalary: 35, bonus: 4, probation: 6, workHours: '10-7-5', location: '北京' },
  B: { id: 'B', company: '腾讯', position: '产品经理', baseSalary: 30, bonus: 6, probation: 3, workHours: '9-6-5', location: '深圳' },
};

export default function OfferPage() {
  const [offers, setOffers] = useState(defaultOffers);
  const [editingOffer, setEditingOffer] = useState<'A' | 'B' | null>(null);
  const [showComparison, setShowComparison] = useState(false);

  const calculateYearlyTotal = (offer: Offer) => offer.baseSalary * 12 + offer.bonus * offer.baseSalary;
  const calculateHourlyRate = (offer: Offer) => {
    const weeklyHours = 45 + (parseInt(offer.workHours.split('-')[0]) - 9) * 5;
    return (calculateYearlyTotal(offer) * 1000) / (weeklyHours * 52);
  };

  return (
    <div className="min-h-screen px-4 py-6">
      {/* 标题 */}
      <div className="text-center mb-6">
        <h1 className="text-xl font-bold text-gradient mb-1">Offer 天平</h1>
        <p className="text-muted text-sm">理性对比，做出最优决策</p>
      </div>

      {!showComparison ? (
        <div className="animate-fade-in-up">
          {/* 左右分屏 */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            {(['A', 'B'] as const).map((id) => (
              <div
                key={id}
                onClick={() => setEditingOffer(id)}
                className={`relative overflow-hidden rounded-2xl p-4 cursor-pointer transition-all duration-300 ${
                  editingOffer === id
                    ? 'ring-2 ring-primary bg-white/[0.07]'
                    : 'glass-card hover:border-primary/30'
                }`}
              >
                {/* 渐变背景 */}
                <div className={`absolute inset-0 bg-gradient-to-br ${id === 'A' ? 'from-primary/10 to-transparent' : 'from-accent/10 to-transparent'} opacity-50`} />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-lg ${
                      id === 'A' ? 'bg-primary/20 text-primary' : 'bg-accent/20 text-accent'
                    }`}>
                      {id}
                    </span>
                    <svg className="w-4 h-4 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Z" />
                    </svg>
                  </div>

                  <h3 className="font-semibold text-foreground mb-1 truncate">{offers[id].company}</h3>
                  <p className="text-sm text-muted truncate mb-3">{offers[id].position}</p>

                  <div className="flex items-baseline gap-1">
                    <span className={`text-2xl font-bold ${id === 'A' ? 'text-primary' : 'text-accent'}`}>{offers[id].baseSalary}</span>
                    <span className="text-muted text-sm">K/月</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 编辑面板 */}
          {editingOffer && (
            <div className="glass-card rounded-2xl p-5 mb-5 animate-fade-in-scale border border-primary/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">编辑 Offer {editingOffer}</h3>
                <button onClick={() => setEditingOffer(null)} className="text-muted hover:text-foreground">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-muted mb-1.5">公司</label>
                  <input type="text" value={offers[editingOffer].company} onChange={(e) => setOffers({ ...offers, [editingOffer]: { ...offers[editingOffer], company: e.target.value }})} className="w-full px-4 py-3 bg-white/5 rounded-xl text-sm border border-white/5 focus:outline-none focus:border-primary/30" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-muted mb-1.5">月薪 (K)</label>
                    <input type="number" value={offers[editingOffer].baseSalary} onChange={(e) => setOffers({ ...offers, [editingOffer]: { ...offers[editingOffer], baseSalary: parseInt(e.target.value) }})} className="w-full px-4 py-3 bg-white/5 rounded-xl text-sm border border-white/5 focus:outline-none focus:border-primary/30" />
                  </div>
                  <div>
                    <label className="block text-xs text-muted mb-1.5">年终奖 (月)</label>
                    <input type="number" value={offers[editingOffer].bonus} onChange={(e) => setOffers({ ...offers, [editingOffer]: { ...offers[editingOffer], bonus: parseInt(e.target.value) }})} className="w-full px-4 py-3 bg-white/5 rounded-xl text-sm border border-white/5 focus:outline-none focus:border-primary/30" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-muted mb-1.5">试用期 (月)</label>
                    <input type="number" value={offers[editingOffer].probation} onChange={(e) => setOffers({ ...offers, [editingOffer]: { ...offers[editingOffer], probation: parseInt(e.target.value) }})} className="w-full px-4 py-3 bg-white/5 rounded-xl text-sm border border-white/5 focus:outline-none focus:border-primary/30" />
                  </div>
                  <div>
                    <label className="block text-xs text-muted mb-1.5">工作节奏</label>
                    <input type="text" value={offers[editingOffer].workHours} onChange={(e) => setOffers({ ...offers, [editingOffer]: { ...offers[editingOffer], workHours: e.target.value }})} className="w-full px-4 py-3 bg-white/5 rounded-xl text-sm border border-white/5 focus:outline-none focus:border-primary/30" />
                  </div>
                </div>
              </div>

              <button onClick={() => setEditingOffer(null)} className="w-full mt-5 py-3 btn-gradient text-white font-medium rounded-xl">
                完成
              </button>
            </div>
          )}

          {/* 开始对比按钮 */}
          <button onClick={() => setShowComparison(true)} className="w-full py-4 btn-gradient text-white font-semibold rounded-xl">
            开始深度对比
          </button>
        </div>
      ) : (
        <div className="animate-fade-in-up">
          {/* 数据对比表 */}
          <div className="glass-card rounded-2xl p-5 mb-4">
            <h3 className="text-sm font-medium text-muted mb-4">数据对比</h3>
            <div className="space-y-3">
              {[
                { label: '月薪', a: `${offers.A.baseSalary}K`, b: `${offers.B.baseSalary}K`, highlight: offers.A.baseSalary > offers.B.baseSalary ? 'A' : 'B' },
                { label: '年终奖', a: `${offers.A.bonus}个月`, b: `${offers.B.bonus}个月`, highlight: offers.A.bonus > offers.B.bonus ? 'A' : 'B' },
                { label: '年包', a: `${calculateYearlyTotal(offers.A)}K`, b: `${calculateYearlyTotal(offers.B)}K`, highlight: calculateYearlyTotal(offers.A) > calculateYearlyTotal(offers.B) ? 'A' : 'B' },
                { label: '试用期', a: `${offers.A.probation}个月`, b: `${offers.B.probation}个月`, highlight: offers.A.probation < offers.B.probation ? 'A' : 'B' },
              ].map((item, i) => (
                <div key={i} className="flex items-center text-sm">
                  <span className="text-muted w-14">{item.label}</span>
                  <span className={`flex-1 text-center py-2 rounded-lg ${item.highlight === 'A' ? 'bg-primary/10 text-primary font-semibold' : ''}`}>{item.a}</span>
                  <span className={`flex-1 text-center py-2 rounded-lg ${item.highlight === 'B' ? 'bg-accent/10 text-accent font-semibold' : ''}`}>{item.b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* AI 教练评价 */}
          <div className="relative overflow-hidden rounded-2xl p-5 mb-4 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5 border border-primary/20">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl" />

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
                  </svg>
                </div>
                <span className="font-medium text-sm">AI 教练建议</span>
              </div>

              <p className="text-sm leading-relaxed text-foreground/90">
                <span className="text-primary font-medium">Offer A</span> 月薪高 {offers.A.baseSalary - offers.B.baseSalary}K，但考虑到 <span className="text-accent">{offers.A.workHours}</span> 的工作节奏，实际时薪约 <span className="text-gradient-accent font-bold">{calculateHourlyRate(offers.A).toFixed(0)}</span> 元/小时。
                <br /><br />
                <span className="text-accent font-medium">Offer B</span> 时薪约 <span className="text-gradient-accent font-bold">{calculateHourlyRate(offers.B).toFixed(0)}</span> 元/小时。
                <br /><br />
                💡 建议：<span className={`font-bold ${calculateHourlyRate(offers.A) > calculateHourlyRate(offers.B) ? 'text-primary' : 'text-accent'}`}>Offer {calculateHourlyRate(offers.A) > calculateHourlyRate(offers.B) ? 'A' : 'B'}</span> 性价比更高
              </p>
            </div>
          </div>

          {/* 模拟选择 */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <button className="py-4 bg-primary/20 text-primary font-medium rounded-xl hover:bg-primary/30 transition-colors border border-primary/20">
              接受 Offer A
            </button>
            <button className="py-4 bg-accent/20 text-accent font-medium rounded-xl hover:bg-accent/30 transition-colors border border-accent/20">
              接受 Offer B
            </button>
          </div>

          <button onClick={() => setShowComparison(false)} className="w-full py-3 glass-card text-foreground font-medium rounded-xl hover:bg-white/[0.07] transition-colors">
            返回编辑
          </button>
        </div>
      )}
    </div>
  );
}
