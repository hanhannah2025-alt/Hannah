'use client';

import { useState, useEffect } from 'react';

type Step = 'input' | 'scanning' | 'result';

interface FormData {
  company: string;
  position: string;
  responsibilities: string;
  salary: string;
  yearsOfExperience: string;
}

export default function RadarPage() {
  const [step, setStep] = useState<Step>('input');
  const [formData, setFormData] = useState<FormData>({
    company: '', position: '', responsibilities: '', salary: '', yearsOfExperience: '',
  });
  const [scanProgress, setScanProgress] = useState(0);

  useEffect(() => {
    if (step === 'scanning') {
      const interval = setInterval(() => {
        setScanProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setStep('result'), 300);
            return 100;
          }
          return prev + 2;
        });
      }, 60);
      return () => clearInterval(interval);
    }
  }, [step]);

  const handleScan = () => {
    if (!formData.company || !formData.position || !formData.salary) return;
    setScanProgress(0);
    setStep('scanning');
  };

  return (
    <div className="min-h-screen px-4 py-6">
      {step === 'input' && (
        <div className="animate-fade-in-up">
          {/* 标题 */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 mb-4 animate-float">
              <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.348 14.651a3.75 3.75 0 0 1 0-5.303m5.304 0a3.75 3.75 0 0 1 0 5.303m-7.425 2.122a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.808-3.808-9.98 0-13.789m13.788 0c3.808 3.808 3.808 9.981 0 13.79M12 12h.008v.007H12V12Z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold mb-2">
              <span className="text-gradient">身价雷达</span>
            </h1>
            <p className="text-muted text-sm">发现你的真实市场价值</p>
          </div>

          {/* 表单 */}
          <div className="space-y-4 max-w-sm mx-auto">
            {[
              { key: 'company', label: '公司名称', placeholder: '例如：字节跳动', type: 'text' },
              { key: 'position', label: '职位名称', placeholder: '例如：高级产品经理', type: 'text' },
              { key: 'salary', label: '当前月薪 (K)', placeholder: '例如：25', type: 'text' },
            ].map((field) => (
              <div key={field.key}>
                <label className="block text-sm text-muted mb-2">{field.label}</label>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  value={formData[field.key as keyof FormData]}
                  onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                  className="w-full px-4 py-3.5 bg-white/5 rounded-xl text-foreground placeholder:text-muted/30 border border-white/5 focus:outline-none focus:border-primary/30 focus:bg-white/[0.07] transition-all"
                />
              </div>
            ))}

            {/* 工作年限 */}
            <div>
              <label className="block text-sm text-muted mb-2">工作年限</label>
              <select
                value={formData.yearsOfExperience}
                onChange={(e) => setFormData({ ...formData, yearsOfExperience: e.target.value })}
                className="w-full px-4 py-3.5 bg-white/5 rounded-xl text-foreground border border-white/5 focus:outline-none focus:border-primary/30 focus:bg-white/[0.07] transition-all appearance-none"
              >
                <option value="">请选择</option>
                <option value="0-1">0-1年</option>
                <option value="1-3">1-3年</option>
                <option value="3-5">3-5年</option>
                <option value="5-10">5-10年</option>
                <option value="10+">10年以上</option>
              </select>
            </div>

            {/* 主要职责 */}
            <div>
              <label className="block text-sm text-muted mb-2">主要职责（选填）</label>
              <textarea
                placeholder="描述你的主要工作内容..."
                value={formData.responsibilities}
                onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
                rows={3}
                className="w-full px-4 py-3.5 bg-white/5 rounded-xl text-foreground placeholder:text-muted/30 border border-white/5 focus:outline-none focus:border-primary/30 focus:bg-white/[0.07] transition-all resize-none"
              />
            </div>

            <button
              onClick={handleScan}
              disabled={!formData.company || !formData.position || !formData.salary}
              className="w-full py-4 btn-gradient text-white font-semibold rounded-xl disabled:opacity-40 disabled:cursor-not-allowed mt-6"
            >
              开始扫描
            </button>
          </div>
        </div>
      )}

      {step === 'scanning' && (
        <div className="flex flex-col items-center justify-center min-h-[70vh] animate-fade-in-scale">
          {/* 雷达动画 */}
          <div className="relative w-64 h-64 mb-8">
            {/* 外圈 */}
            <div className="absolute inset-0 rounded-full border border-primary/20 animate-breathe" />
            <div className="absolute inset-6 rounded-full border border-primary/15" />
            <div className="absolute inset-12 rounded-full border border-primary/10" />
            <div className="absolute inset-18 rounded-full border border-primary/5" />

            {/* 脉冲环 */}
            <div className="absolute inset-0 rounded-full border-2 border-primary/50 animate-pulse-ring" />
            <div className="absolute inset-0 rounded-full border-2 border-accent/30 animate-pulse-ring" style={{ animationDelay: '0.5s' }} />

            {/* 扫描线 */}
            <div className="absolute inset-0 animate-radar-scan">
              <div className="absolute top-1/2 left-1/2 w-1/2 h-0.5 bg-gradient-to-r from-primary via-accent to-transparent origin-left rounded-full" />
            </div>

            {/* 中心点 */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-primary to-accent animate-pulse-glow" />
            </div>

            {/* 角落装饰 */}
            <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-primary rounded-tl-lg" />
            <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-primary rounded-tr-lg" />
            <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-primary rounded-bl-lg" />
            <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-primary rounded-br-lg" />
          </div>

          {/* 进度 */}
          <div className="w-48 mb-4">
            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-100"
                style={{ width: `${scanProgress}%` }}
              />
            </div>
          </div>

          <p className="text-foreground text-lg font-medium">{scanProgress}%</p>
          <p className="text-muted text-sm mt-1">正在分析你的身价...</p>
        </div>
      )}

      {step === 'result' && (
        <div className="animate-fade-in-up pb-8">
          {/* 结果头部 */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-accent/20 to-warning/20 mb-4 animate-float">
              <span className="text-4xl font-bold text-gradient-accent">
                {Math.floor(parseInt(formData.salary) * 1.3)}
              </span>
            </div>
            <h2 className="text-xl font-bold text-gradient">你的市场身价</h2>
            <p className="text-muted text-sm mt-1">基于你的背景，市场参考薪资区间</p>
          </div>

          {/* 薪资对比图 */}
          <div className="glass-card rounded-2xl p-5 mb-4">
            <h3 className="text-sm font-medium text-muted mb-4">薪资对比</h3>
            <div className="space-y-5">
              {[
                { label: '你的薪资', value: formData.salary, color: 'from-slate-500 to-slate-400', width: (parseInt(formData.salary) / 80) * 100 },
                { label: '行业平均', value: Math.floor(parseInt(formData.salary) * 1.15), color: 'from-primary to-primary-light', width: (parseInt(formData.salary) * 1.15 / 80) * 100 },
                { label: 'Top 10%', value: Math.floor(parseInt(formData.salary) * 1.8), color: 'from-accent to-warning', width: (parseInt(formData.salary) * 1.8 / 80) * 100 },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted">{item.label}</span>
                    <span className="font-semibold text-foreground">{item.value}K</span>
                  </div>
                  <div className="h-2.5 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${item.color} rounded-full transition-all duration-1000`}
                      style={{ width: `${Math.min(item.width, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 能力补齐区 */}
          <div className="glass-card rounded-2xl p-5 mb-4">
            <h3 className="text-sm font-medium text-muted mb-4">能力提升建议</h3>
            <div className="space-y-3">
              {[
                { skill: '数据分析能力', impact: '+15%', icon: '📊' },
                { skill: '项目管理经验', impact: '+12%', icon: '🎯' },
                { skill: '团队协作工具', impact: '+8%', icon: '🤝' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-xl group hover:bg-white/[0.07] transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-lg">
                      {item.icon}
                    </div>
                    <span className="font-medium">{item.skill}</span>
                  </div>
                  <span className="text-accent font-semibold text-sm">↑{item.impact}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="flex gap-3">
            <button
              onClick={() => setStep('input')}
              className="flex-1 py-3.5 bg-white/5 text-foreground font-medium rounded-xl border border-white/5 hover:bg-white/10 transition-colors"
            >
              重新评估
            </button>
            <button className="flex-1 py-3.5 btn-gradient text-white font-medium rounded-xl">
              查看学习路径
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
