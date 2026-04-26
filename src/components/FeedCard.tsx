'use client';

import { useState } from 'react';

interface FeedCardProps {
  city: string;
  position: string;
  salary: string;
  company: string;
  tags: Array<{
    text: string;
    type: 'salary' | 'warning' | 'trend';
  }>;
  content?: string;
  index?: number;
}

const tagStyles = {
  salary: 'bg-gradient-to-r from-amber-500/90 to-orange-500/90 text-white shadow-lg shadow-amber-500/20',
  warning: 'bg-gradient-to-r from-rose-500/90 to-pink-500/90 text-white shadow-lg shadow-rose-500/20',
  trend: 'bg-gradient-to-r from-violet-500/90 to-purple-500/90 text-white shadow-lg shadow-violet-500/20',
};

const tagIcons = {
  salary: '💰',
  warning: '⚠️',
  trend: '📈',
};

// 卡片渐变背景
const cardGradients = [
  'from-indigo-500/10 via-purple-500/5 to-pink-500/10',
  'from-cyan-500/10 via-blue-500/5 to-indigo-500/10',
  'from-emerald-500/10 via-teal-500/5 to-cyan-500/10',
  'from-orange-500/10 via-amber-500/5 to-yellow-500/10',
  'from-rose-500/10 via-pink-500/5 to-purple-500/10',
  'from-violet-500/10 via-indigo-500/5 to-blue-500/10',
];

export default function FeedCard({
  city,
  position,
  salary,
  company,
  tags,
  content,
  index = 0,
}: FeedCardProps) {
  const [isPressed, setIsPressed] = useState(false);
  const gradient = cardGradients[index % cardGradients.length];

  return (
    <div
      className={`break-inside-avoid mb-3 transition-all duration-300 ${
        isPressed ? 'scale-[0.98]' : ''
      }`}
      style={{
        animationDelay: `${index * 50}ms`,
      }}
    >
      <div
        className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${gradient} p-[1px] card-hover-lift`}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
      >
        {/* 内部卡片 */}
        <div className="bg-[#0D1320]/90 backdrop-blur-xl rounded-2xl overflow-hidden">
          {/* 图片区域 */}
          <div className="relative aspect-[4/3] bg-gradient-to-br from-slate-800/50 to-slate-900/50 overflow-hidden">
            {/* 动态背景 */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-primary to-accent rounded-full blur-3xl animate-float" />
              <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-gradient-to-br from-accent to-warning rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }} />
            </div>

            {/* 城市标签 */}
            <div className="absolute top-3 left-3 z-10">
              <div className="px-3 py-1.5 bg-black/40 backdrop-blur-md rounded-full border border-white/10">
                <span className="text-white text-xs font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                  {city}
                </span>
              </div>
            </div>

            {/* 职位 */}
            <div className="absolute inset-0 flex items-center justify-center p-4 z-0">
              <h3 className="text-xl font-bold text-white/90 text-center leading-tight drop-shadow-lg">
                {position}
              </h3>
            </div>

            {/* 装饰元素 */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#0D1320] to-transparent" />
          </div>

          {/* 内容区域 */}
          <div className="p-4">
            {/* 公司 */}
            <p className="text-muted text-sm mb-2 truncate flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21" />
              </svg>
              {company}
            </p>

            {/* 薪资 */}
            <div className="flex items-baseline gap-1 mb-3">
              <span className="text-2xl font-bold text-gradient-accent">{salary}</span>
              <span className="text-muted text-sm">/月</span>
            </div>

            {/* 标签 */}
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag, i) => (
                <span
                  key={i}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${tagStyles[tag.type]}`}
                >
                  <span>{tagIcons[tag.type]}</span>
                  {tag.text}
                </span>
              ))}
            </div>

            {/* 内容描述 */}
            {content && (
              <p className="text-muted/70 text-xs mt-3 line-clamp-2 leading-relaxed">
                {content}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
