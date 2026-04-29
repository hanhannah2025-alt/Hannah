'use client';

import { useState, useEffect, useRef } from 'react';

interface Comment {
  id: number;
  user: string;
  avatar?: string;
  content: string;
  time: string;
  likes: number;
}

interface FeedCardDetailProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    city: string;
    position: string;
    salary?: string;
    company: string;
    tags: Array<{
      text: string;
      type: 'salary' | 'warning' | 'trend';
    }>;
    content?: string;
    avatar?: string;
    nickname?: string;
    likes?: number;
    comments?: number;
  };
}

const tagStyles = {
  salary: 'bg-gradient-to-r from-amber-500/90 to-orange-500/90 text-white shadow-lg shadow-amber-500/20',
  warning: 'bg-gradient-to-r from-rose-500/90 to-pink-500/90 text-white shadow-lg shadow-rose-500/20',
  trend: 'bg-gradient-to-r from-violet-500/90 to-purple-500/90 text-white shadow-lg shadow-violet-500/20',
};

// 模拟评论数据
const mockComments: Comment[] = [
  { id: 1, user: '职场新人', content: '太厉害了！请问面试准备了多久？', time: '2小时前', likes: 23 },
  { id: 2, user: '大佬求带', content: '同在互联网行业，求经验分享～', time: '5小时前', likes: 15 },
  { id: 3, user: '转行加油', content: '转行成功真的不容易，为你点赞！', time: '1天前', likes: 8 },
];

export default function FeedCardDetail({ isOpen, onClose, data }: FeedCardDetailProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [slideOffset, setSlideOffset] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const touchStartY = useRef(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setSlideOffset(0);
      setIsSliding(false);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    setIsSliding(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isSliding) return;
    const currentY = e.touches[0].clientY;
    const deltaY = currentY - touchStartY.current;

    // 只允许向下滑动
    if (deltaY > 0) {
      setSlideOffset(deltaY);
    }
  };

  const handleTouchEnd = () => {
    if (!isSliding) return;

    // 滑动超过阈值，关闭页面
    if (slideOffset > 100) {
      onClose();
    } else {
      // 回弹
      setSlideOffset(0);
    }
    setIsSliding(false);
  };

  const handleScroll = (e: React.WheelEvent) => {
    if (contentRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
      const isAtTop = scrollTop === 0;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight;

      // 在顶部向上滚动，或在底部向下滚动，允许滑动关闭
      if ((isAtTop && e.deltaY > 0) || (isAtBottom && e.deltaY < 0)) {
        e.preventDefault();
        const newOffset = Math.max(0, slideOffset + e.deltaY);
        setSlideOffset(newOffset);

        if (newOffset > 100) {
          onClose();
        }
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#0D1320] flex flex-col transition-transform duration-300 ease-out"
      style={{ transform: `translateY(${slideOffset}px)` }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onWheel={handleScroll}
    >
      {/* 顶部返回按钮 */}
      <div className="flex items-center p-4 border-b border-white/10">
        <button
          onClick={onClose}
          className="p-2 -ml-2 text-muted hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3-3m0 0l-7-7m7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* 顶部用户头像和转发标识 */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          {/* 用户头像 */}
          {data.avatar ? (
            <img src={data.avatar} alt={data.nickname} className="w-10 h-10 rounded-full object-cover" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center">
              <span className="text-white text-sm font-bold">
                {data.nickname?.charAt(0) || '匿'}
              </span>
            </div>
          )}
          <div className="flex flex-col">
            <span className="text-white text-sm font-medium">{data.nickname || '匿名用户'}</span>
            <span className="text-muted text-xs">{data.city} · {data.company.split('·')[1]?.trim() || ''}</span>
          </div>
        </div>

        {/* 转发标识 */}
        <button className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-full transition-colors">
          <svg className="w-4 h-4 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093v8.443c0 .397-.103.77-.283 1.093m0 0A2.25 2.25 0 0 1 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-8.25-2.25h.008v.008h-.008v-.008Zm12-3.377a1.125 1.125 0 1 1 1.12-1.128h1.238c.462 0 .84-.379.84-.84V8.25c0-.462-.378-.84-.84-.84h-1.238a1.125 1.125 0 1 1-1.12-1.128m-8.246 4.878V5.25c0-.462.379-.84.84-.84h1.238a1.125 1.125 0 1 1 1.12 1.128v11.256Z" />
          </svg>
          <span className="text-muted text-xs">转发</span>
        </button>
      </div>

      {/* 内容区域 - 可滚动 */}
      <div ref={contentRef} className="flex-1 overflow-y-auto p-4">
        {/* 职位和薪资 */}
        <h3 className="text-lg font-bold text-white mb-2">{data.position}</h3>
        {data.salary && (
          <div className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-accent/80 to-warning/80 rounded-full mb-3">
            <span className="text-white text-sm font-bold">{data.salary}</span>
          </div>
        )}

        {/* 标签 */}
        <div className="flex flex-wrap gap-2 mb-4">
          {data.tags.map((tag, i) => (
            <span
              key={i}
              className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${tagStyles[tag.type]}`}
            >
              {tag.text}
            </span>
          ))}
        </div>

        {/* 内容描述 */}
        {data.content && (
          <p className="text-muted/90 text-sm leading-relaxed mb-4">
            {data.content}
          </p>
        )}

        {/* 评论列表 */}
        <div className="mt-6">
          <h4 className="text-white text-sm font-medium mb-3 flex items-center gap-2">
            <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
            </svg>
            全部评论 ({data.comments || mockComments.length})
          </h4>

          <div className="space-y-4">
            {mockComments.map((comment) => (
              <div key={comment.id} className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-bold">
                    {comment.user.charAt(0)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white text-xs font-medium">{comment.user}</span>
                    <span className="text-muted text-[10px]">{comment.time}</span>
                  </div>
                  <p className="text-muted/90 text-xs leading-relaxed">{comment.content}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <svg className="w-3 h-3 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>
                    <span className="text-muted text-[10px]">{comment.likes}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 底部操作栏 */}
      <div className="border-t border-white/10 p-4">
        {/* 评论输入框 */}
        <div className="flex items-center gap-3 mb-3">
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="说点什么..."
            className="flex-1 bg-white/5 text-white text-sm px-4 py-2.5 rounded-full border border-white/10 focus:outline-none focus:border-accent/50 transition-colors placeholder:text-muted/60"
          />
        </div>

        {/* 操作按钮 */}
        <div className="flex items-center justify-between">
          {/* 点赞 */}
          <button
            onClick={() => setIsLiked(!isLiked)}
            className="flex items-center gap-1.5 transition-all active:scale-90"
          >
            <svg
              className={`w-5 h-5 transition-colors ${isLiked ? 'text-accent' : 'text-muted'}`}
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
            <span className={`text-sm ${isLiked ? 'text-accent' : 'text-muted'}`}>
              {data.likes || 0}
            </span>
          </button>

          {/* 评论 */}
          <div className="flex items-center gap-1.5">
            <svg className="w-5 h-5 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
            </svg>
            <span className="text-sm text-muted">{data.comments || 0}</span>
          </div>

          {/* 收藏 */}
          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className="transition-all active:scale-90"
          >
            <svg
              className={`w-5 h-5 transition-colors ${isBookmarked ? 'text-warning' : 'text-muted'}`}
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
  );
}
