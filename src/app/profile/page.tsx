'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

interface User {
  id: string;
  username: string;
  phone: string;
  email: string;
  avatar: string;
  stats: {
    follow: number;
    likes: number;
    favorites: number;
  };
  isVerified: boolean;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('currentUser');
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const menuItems = [
    { icon: 'community', label: '社区', desc: '我的社区动态', color: 'from-violet-500 to-purple-500' },
    { icon: 'history', label: '浏览记录', desc: '最近浏览 56', color: 'from-cyan-500 to-blue-500' },
    { icon: 'order', label: '订单', desc: '我的订单 3', color: 'from-emerald-500 to-teal-500' },
    { icon: 'course', label: '我的课程', desc: '已购课程 5', color: 'from-indigo-500 to-blue-500' },
    { icon: 'settings', label: '设置', desc: '账号与偏好设置', color: 'from-slate-500 to-slate-400' },
  ];

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 mb-4 animate-float">
            <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-white mb-2">请先登录</h2>
          <p className="text-muted text-sm mb-6">登录后查看个人信息</p>
          <button
            onClick={() => router.push('/login')}
            className="py-3 px-8 btn-gradient text-white font-semibold rounded-xl"
          >
            立即登录
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-6 relative overflow-hidden">
      {/* 用户卡片 */}
      <div className="relative overflow-hidden rounded-3xl p-6 mb-6">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-primary/5" />
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-primary/30 to-accent/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-br from-accent/30 to-warning/30 rounded-full blur-2xl" />

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-5">
            <div className="relative">
              <div className="w-18 h-18 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-primary/30">
                {user.avatar}
              </div>
              {user.isVerified && (
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-success rounded-full border-2 border-[#0D1320] flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-foreground">{user.username}</h2>
                {user.isVerified && (
                  <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                )}
              </div>
              <p className="text-muted text-sm">{user.phone}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { value: user.stats.follow, label: '关注', color: 'text-accent' },
              { value: user.stats.likes + user.stats.favorites, label: '获赞与收藏', color: 'text-primary' },
              { value: user.stats.favorites, label: '我的收藏', color: 'text-warning' },
            ].map((stat, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-sm rounded-2xl py-3">
                <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-xs text-muted mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 功能列表 */}
      <div className="space-y-3">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className="w-full glass-card rounded-2xl p-4 text-left group card-hover-lift"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">{item.label}</p>
                <p className="text-xs text-muted">{item.desc}</p>
              </div>
              <svg className="w-5 h-5 text-muted group-hover:text-primary group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </div>
          </button>
        ))}
      </div>

      <p className="text-center text-muted/50 text-xs mt-10">
        职途导航 v1.0.0
      </p>
    </div>
  );
}
