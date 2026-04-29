'use client';

import { useState } from 'react';

interface FeedCardProps {
  city: string;
  position: string;
  salary?: string;
  company: string;
  tags: Array<{
    text: string;
    type: 'salary' | 'warning' | 'trend';
  }>;
  content?: string;
  index?: number;
  avatar?: string;
  nickname?: string;
  likes?: number;
  comments?: number;
  onClick?: () => void;
}

const tagStyles = {
  salary: 'bg-gradient-to-r from-amber-500/90 to-orange-500/90 text-white shadow-lg shadow-amber-500/20',
  warning: 'bg-gradient-to-r from-rose-500/90 to-pink-500/90 text-white shadow-lg shadow-rose-500/20',
  trend: 'bg-gradient-to-r from-violet-500/90 to-purple-500/90 text-white shadow-lg shadow-violet-500/20',
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

// 头像颜色
const avatarColors = [
  'from-pink-400 to-rose-500',
  'from-blue-400 to-indigo-500',
  'from-green-400 to-emerald-500',
  'from-yellow-400 to-orange-500',
  'from-purple-400 to-violet-500',
];

export default function FeedCard({
  city,
  position,
  salary,
  company,
  tags,
  content,
  index = 0,
  avatar,
  nickname = '匿名用户',
  likes = 0,
  comments = 0,
  onClick,
}: FeedCardProps) {
  const [isPressed, setIsPressed] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const gradient = cardGradients[index % cardGradients.length];
  const avatarGradient = avatarColors[index % avatarColors.length];

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 150);
    onClick?.();
  };

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
        className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${gradient} p-[1px] card-hover-lift cursor-pointer`}
        onClick={onClick}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
      >
        {/* 内部卡片 */}
        <div className="bg-[#0D1320]/95 backdrop-blur-xl rounded-2xl overflow-hidden">
          {/* 图片区域 - 更大的展示 */}
          <div className="relative aspect-square bg-gradient-to-br from-slate-800/50 to-slate-900/50 overflow-hidden">
            {/* 动态背景 */}
            <div className="absolute inset-0 opacity-40">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-primary to-accent rounded-full blur-3xl animate-float" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-br from-accent to-warning rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }} />
            </div>

            {/* 城市标签 */}
            <div className="absolute top-3 left-3 z-10">
              <div className="px-2.5 py-1 bg-black/50 backdrop-blur-md rounded-full border border-white/10">
                <span className="text-white text-[10px] font-medium flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-success animate-pulse" />
                  {city}
                </span>
              </div>
            </div>

            {/* 主要内容展示 */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-5 z-0">
              <h3 className="text-lg font-bold text-white/90 text-center leading-tight drop-shadow-lg mb-2 line-clamp-3">
                {position}
              </h3>
              {salary && (
                <div className="px-3 py-1 bg-gradient-to-r from-accent/80 to-warning/80 rounded-full">
                  <span className="text-white text-sm font-bold">{salary}</span>
                </div>
              )}
            </div>

            {/* 装饰元素 */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0D1320] to-transparent" />
          </div>

          {/* 内容区域 */}
          <div className="p-3.5">
            {/* 标签 */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {tags.map((tag, i) => (
                <span
                  key={i}
                  className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-medium ${tagStyles[tag.type]}`}
                >
                  {tag.text}
                </span>
              ))}
            </div>

            {/* 内容描述 */}
            {content && (
              <p className="text-muted/80 text-xs mb-3 line-clamp-2 leading-relaxed">
                {content}
              </p>
            )}

            {/* 公司信息 */}
            {company && (
              <p className="text-muted/60 text-[10px] mb-3 truncate flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21" />
                </svg>
                {company}
              </p>
            )}

            {/* 用户头像和昵称 */}
            <div className="flex items-center justify-between pt-2 border-t border-white/5">
              <div className="flex items-center gap-2">
                {avatar ? (
                  <img src={avatar} alt={nickname} className="w-7 h-7 rounded-full object-cover flex-shrink-0" />
                ) : (
                  <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${avatarGradient} flex items-center justify-center flex-shrink-0`}>
                    <span className="text-white text-[10px] font-bold">
                      {nickname.charAt(0)}
                    </span>
                  </div>
                )}
                <span className="text-muted text-[10px] truncate">
                  {nickname}
                </span>
              </div>

              {/* 点赞按钮 */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsLiked(!isLiked);
                }}
                className="flex items-center gap-1 transition-all active:scale-90"
              >
                <svg
                  className={`w-4 h-4 transition-colors ${isLiked ? 'text-accent' : 'text-muted'}`}
                  fill={isLiked ? 'currentColor' : 'none'}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
                <span className={`text-[10px] ${isLiked ? 'text-accent' : 'text-muted'}`}>
                  {likes}
                </span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
