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
}: FeedCardProps) {
  const [isPressed, setIsPressed] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const gradient = cardGradients[index % cardGradients.length];
  const avatarGradient = avatarColors[index % avatarColors.length];

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
              <p className="text-muted/80 text-xs mb-3 line-clamp-3 leading-relaxed">
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

            {/* 用户信息和互动 */}
            <div className="flex items-center justify-between pt-2 border-t border-white/5">
              {/* 用户头像和昵称 */}
              <div className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${avatarGradient} flex items-center justify-center flex-shrink-0`}>
                  <span className="text-white text-[10px] font-bold">
                    {nickname.charAt(0)}
                  </span>
                </div>
                <span className="text-muted text-[10px] truncate max-w-[60px]">
                  {nickname}
                </span>
              </div>

              {/* 互动按钮 */}
              <div className="flex items-center gap-3">
                {/* 点赞 */}
                <button
                  onClick={() => setIsLiked(!isLiked)}
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

                {/* 评论 */}
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                  </svg>
                  <span className="text-[10px] text-muted">{comments}</span>
                </div>

                {/* 收藏 */}
                <button
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className="transition-all active:scale-90"
                >
                  <svg
                    className={`w-4 h-4 transition-colors ${isBookmarked ? 'text-warning' : 'text-muted'}`}
                    fill={isBookmarked ? 'currentColor' : 'none'}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
