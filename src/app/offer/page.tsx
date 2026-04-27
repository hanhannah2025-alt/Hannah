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
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([
    { role: 'ai', content: '您好！我是AI决策助手，已为您分析两个Offer的关键数据。从数据来看，您更关注哪个方面呢？' },
    { role: 'user', content: '哪个更值得去？' },
    { role: 'ai', content: '综合来看，建议选择 Offer B。虽然年包少64万，但工作节奏更友好（9-6-5 vs 10-7-5），真实时薪反而更高。长期来看，更好的工作生活平衡有助于职业可持续发展。' },
    { role: 'user', content: '但是字节薪资更高啊' },
    { role: 'ai', content: '确实，字节年包高约13%。但您需要考虑：\n\n1️⃣ 每天多工作2-3小时，时薪实际更低\n2️⃣ 高强度工作可能带来健康成本\n3️⃣ 腾讯晋升体系更稳定\n\n如果您看重短期收入，选字节；看重长期发展，选腾讯。您目前更倾向哪个？' },
    { role: 'user', content: '发展前景对比一下' },
    { role: 'ai', content: '两家都是行业头部，发展路径各有优势：\n\n📍 字节跳动：短视频赛道领先，出海业务增长快，但组织调整频繁\n\n📍 腾讯：生态更全面（社交、游戏、云、金融），晋升制度成熟，WLB更好\n\n建议：如果您想搏一搏快速成长，选字节；如果追求稳定发展，选腾讯。' },
  ]);

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
        <div className="flex flex-col flex-1">
          {/* 数据对比表 */}
          <div className="glass-card rounded-2xl p-4 mb-3 overflow-x-auto">
            <h3 className="text-sm font-medium text-white mb-4 text-center">数据对比</h3>

            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="p-3 text-left text-xs text-muted font-medium">维度</th>
                  <th className="p-3 text-center text-xs text-primary font-medium bg-primary/10">Offer A</th>
                  <th className="p-3 text-center text-xs text-accent font-medium bg-accent/10">Offer B</th>
                  <th className="p-3 text-center text-xs text-warning font-medium bg-warning/10">差异点分析</th>
                </tr>
              </thead>
              <tbody>
                {/* 年化总包 */}
                <tr className="border-b border-white/5">
                  <td className="p-3">
                    <p className="text-white font-medium">年化总包</p>
                    <p className="text-[10px] text-muted">年薪</p>
                  </td>
                  <td className="p-3 text-center bg-primary/5">
                    <p className="text-white font-bold">{calculateYearlyTotal(offers.A)}万</p>
                    <p className="text-[10px] text-muted">{offers.A.baseSalary}K×{12 + offers.A.bonus}</p>
                  </td>
                  <td className="p-3 text-center bg-accent/5">
                    <p className="text-white font-bold">{calculateYearlyTotal(offers.B)}万</p>
                    <p className="text-[10px] text-muted">{offers.B.baseSalary}K×{12 + offers.B.bonus}</p>
                  </td>
                  <td className="p-3 text-center bg-warning/5">
                    <p className="text-xs text-white">
                      {calculateYearlyTotal(offers.A) > calculateYearlyTotal(offers.B) ?
                        `A多${calculateYearlyTotal(offers.A) - calculateYearlyTotal(offers.B)}万` :
                        calculateYearlyTotal(offers.B) > calculateYearlyTotal(offers.A) ?
                        `B多${calculateYearlyTotal(offers.B) - calculateYearlyTotal(offers.A)}万` : '持平'}
                    </p>
                  </td>
                </tr>

                {/* 真实时薪 */}
                <tr className="border-b border-white/5">
                  <td className="p-3">
                    <p className="text-white font-medium">真实时薪</p>
                    <p className="text-[10px] text-muted">元/小时</p>
                  </td>
                  <td className="p-3 text-center bg-primary/5">
                    <p className="text-white font-bold">{calculateHourlyRate(offers.A).toFixed(0)}/h</p>
                    <p className="text-[10px] text-muted">含加班时长</p>
                  </td>
                  <td className="p-3 text-center bg-accent/5">
                    <p className="text-white font-bold">{calculateHourlyRate(offers.B).toFixed(0)}/h</p>
                    <p className="text-[10px] text-muted">含加班时长</p>
                  </td>
                  <td className="p-3 text-center bg-warning/5">
                    <p className="text-xs text-white">
                      {calculateHourlyRate(offers.A) > calculateHourlyRate(offers.B) ?
                        `A高${(calculateHourlyRate(offers.A) - calculateHourlyRate(offers.B)).toFixed(0)}元` :
                        calculateHourlyRate(offers.B) > calculateHourlyRate(offers.A) ?
                        `B高${(calculateHourlyRate(offers.B) - calculateHourlyRate(offers.A)).toFixed(0)}元` : '持平'}
                    </p>
                  </td>
                </tr>

                {/* 工作时长 */}
                <tr className="border-b border-white/5">
                  <td className="p-3">
                    <p className="text-white font-medium">工作时长</p>
                    <p className="text-[10px] text-muted">周工作节奏</p>
                  </td>
                  <td className="p-3 text-center bg-primary/5">
                    <p className="text-white font-bold">{offers.A.workHours}</p>
                    <p className="text-[10px] text-muted">{offers.A.company}</p>
                  </td>
                  <td className="p-3 text-center bg-accent/5">
                    <p className="text-white font-bold">{offers.B.workHours}</p>
                    <p className="text-[10px] text-muted">{offers.B.company}</p>
                  </td>
                  <td className="p-3 text-center bg-warning/5">
                    <p className="text-xs text-white">
                      {parseInt(offers.A.workHours.split('-')[0]) < parseInt(offers.B.workHours.split('-')[0]) ?
                        'A更轻松' :
                        parseInt(offers.B.workHours.split('-')[0]) < parseInt(offers.A.workHours.split('-')[0]) ?
                        'B更轻松' : '持平'}
                    </p>
                  </td>
                </tr>

                {/* 简历溢价 */}
                <tr>
                  <td className="p-3">
                    <p className="text-white font-medium">简历溢价</p>
                    <p className="text-[10px] text-muted">背书价值</p>
                  </td>
                  <td className="p-3 text-center bg-primary/5">
                    <p className="text-white font-medium">{offers.A.company}</p>
                    <p className="text-[10px] text-success">行业头部 ✓</p>
                    <p className="text-[10px] text-muted">大厂背书强</p>
                  </td>
                  <td className="p-3 text-center bg-accent/5">
                    <p className="text-white font-medium">{offers.B.company}</p>
                    <p className="text-[10px] text-success">行业头部 ✓</p>
                    <p className="text-[10px] text-muted">大厂背书强</p>
                  </td>
                  <td className="p-3 text-center bg-warning/5">
                    <p className="text-xs text-white">两者相当</p>
                    <p className="text-[10px] text-muted">均为大厂</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* AI 对话区域 - 延伸到页面底部 */}
          <div className="flex-1 flex flex-col glass-card rounded-2xl p-4 min-h-[300px]">
            {/* 对话消息区 - 可滚动 */}
            <div className="flex-1 space-y-3 mb-4 overflow-y-auto">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'ai' ? 'justify-start' : 'justify-end'}`}>
                  {msg.role === 'ai' && (
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mr-2 flex-shrink-0">
                      <span className="text-xs">🤖</span>
                    </div>
                  )}
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm whitespace-pre-line ${
                    msg.role === 'ai'
                      ? 'bg-white/5 text-white rounded-tl-sm'
                      : 'bg-gradient-to-r from-primary to-accent text-white rounded-tr-sm'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>

            {/* 快捷问题 */}
            <div className="flex flex-wrap gap-2 mb-3">
              {['哪个更值得去？', '薪资差距大吗？', '发展前景对比'].map((q, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setMessages([...messages, { role: 'user', content: q }]);
                    setTimeout(() => {
                      const responses = [
                        '综合考虑薪资和工作强度，Offer B 性价比更高。虽然年包略低，但工作节奏更好，真实时薪更高。',
                        '年化总包差距约 ' + Math.abs(calculateYearlyTotal(offers.A) - calculateYearlyTotal(offers.B)) + ' 万，但考虑到工作时长，真实时薪差距并不大。',
                        '两家都是行业头部公司，职业发展前景都不错。字节跳动在短视频领域领先，腾讯生态更全面，可根据您的职业规划选择。'
                      ];
                      setMessages(prev => [...prev, { role: 'ai', content: responses[i] }]);
                    }, 500);
                  }}
                  className="px-3 py-1.5 bg-white/5 rounded-full text-xs text-muted hover:bg-white/10 hover:text-white transition-colors border border-white/10"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* 输入框 */}
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="输入您的问题..."
                className="flex-1 px-4 py-3 bg-white/5 rounded-xl text-sm text-white border border-white/10 focus:outline-none focus:border-primary/30 placeholder:text-muted"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && inputValue.trim()) {
                    setMessages([...messages, { role: 'user', content: inputValue }]);
                    setInputValue('');
                    setTimeout(() => {
                      setMessages(prev => [...prev, {
                        role: 'ai',
                        content: '这是一个很好的问题。根据您的两个Offer情况，我建议您从职业发展、生活平衡、薪资待遇三个维度综合考虑。如需更详细的分析，可以告诉我您更关注哪个方面。'
                      }]);
                    }, 500);
                  }
                }}
              />
              <button
                onClick={() => {
                  if (inputValue.trim()) {
                    setMessages([...messages, { role: 'user', content: inputValue }]);
                    setInputValue('');
                    setTimeout(() => {
                      setMessages(prev => [...prev, {
                        role: 'ai',
                        content: '这是一个很好的问题。根据您的两个Offer情况，我建议您从职业发展、生活平衡、薪资待遇三个维度综合考虑。如需更详细的分析，可以告诉我您更关注哪个方面。'
                      }]);
                    }, 500);
                  }
                }}
                className="px-4 py-3 bg-gradient-to-r from-primary to-accent rounded-xl text-white font-medium"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
