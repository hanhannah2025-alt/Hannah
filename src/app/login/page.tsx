'use client';

import { useState } from 'react';
import Link from 'next/link';

type AuthMode = 'login' | 'register';

export default function AuthPage() {
  const [mode, setMode] = useState<AuthMode>('login');
  const [formData, setFormData] = useState({
    phone: '',
    password: '',
    verifyCode: '',
    email: '',
    username: '',
  });
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const handleSendCode = () => {
    if (!formData.phone) return;
    setCountdown(60);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const userData = {
        id: Date.now().toString(),
        username: mode === 'register' ? formData.username : '职场探索者',
        phone: formData.phone,
        email: formData.email || '',
        avatar: mode === 'register' ? formData.username.charAt(0) : '职',
        stats: { follow: 12, likes: 48, favorites: 23 },
        isVerified: false,
      };

      localStorage.setItem('currentUser', JSON.stringify(userData));

      const users = JSON.parse(localStorage.getItem('users') || '[]');
      if (mode === 'register') {
        if (!users.find((u: any) => u.phone === formData.phone)) {
          users.push(userData);
          localStorage.setItem('users', JSON.stringify(users));
        }
      } else {
        const existingUser = users.find((u: any) => u.phone === formData.phone);
        if (existingUser) {
          localStorage.setItem('currentUser', JSON.stringify(existingUser));
        }
      }

      window.location.href = '/profile';
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-[100px] animate-breathe" />
        <div className="absolute bottom-40 right-10 w-80 h-80 bg-accent/10 rounded-full blur-[100px] animate-breathe" style={{ animationDelay: '2s' }} />
      </div>

      <div className="flex-1 px-4 py-6 flex flex-col">
        <header className="mb-8">
          <Link href="/intelligence" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors inline-flex">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
        </header>

        <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 mb-4 animate-float">
              <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold mb-2">
              {mode === 'login' ? '欢迎回来' : '创建账号'}
            </h1>
            <p className="text-muted text-sm">
              {mode === 'login' ? '登录后解锁更多职场洞察' : '开启你的职场探索之旅'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-sm text-muted mb-2">昵称</label>
                <input
                  type="text"
                  placeholder="给自己起个昵称"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  required
                  className="w-full px-4 py-3.5 bg-white/5 rounded-xl text-foreground placeholder:text-muted/30 border border-white/5 focus:outline-none focus:border-primary/30 focus:bg-white/[0.07] transition-all"
                />
              </div>
            )}

            <div>
              <label className="block text-sm text-muted mb-2">手机号</label>
              <div className="relative">
                <input
                  type="tel"
                  placeholder="请输入手机号"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  pattern="[1][3-9][0-9]{9}"
                  maxLength={11}
                  className="w-full px-4 py-3.5 bg-white/5 rounded-xl text-foreground placeholder:text-muted/30 border border-white/5 focus:outline-none focus:border-primary/30 focus:bg-white/[0.07] transition-all"
                />
              </div>
            </div>

            {mode === 'login' ? (
              <div>
                <label className="block text-sm text-muted mb-2">密码</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="请输入密码"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    className="w-full px-4 py-3.5 bg-white/5 rounded-xl text-foreground placeholder:text-muted/30 border border-white/5 focus:outline-none focus:border-primary/30 focus:bg-white/[0.07] transition-all pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 0 1-4.293 5.774M6.228 6.228 3 3 0 0 0 5.97 5.97m0 0L17.771 17.771m0 0-2.696-2.696m0 0-5.97-5.97" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div>
                  <label className="block text-sm text-muted mb-2">验证码</label>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="请输入验证码"
                      value={formData.verifyCode}
                      onChange={(e) => setFormData({ ...formData, verifyCode: e.target.value })}
                      required
                      maxLength={6}
                      className="flex-1 px-4 py-3.5 bg-white/5 rounded-xl text-foreground placeholder:text-muted/30 border border-white/5 focus:outline-none focus:border-primary/30 focus:bg-white/[0.07] transition-all"
                    />
                    <button
                      type="button"
                      onClick={handleSendCode}
                      disabled={countdown > 0 || !formData.phone}
                      className="px-5 py-3.5 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-medium disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
                    >
                      {countdown > 0 ? `${countdown}s` : '获取验证码'}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-muted mb-2">设置密码</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="6-16位，包含字母和数字"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                      minLength={6}
                      className="w-full px-4 py-3.5 bg-white/5 rounded-xl text-foreground placeholder:text-muted/30 border border-white/5 focus:outline-none focus:border-primary/30 focus:bg-white/[0.07] transition-all pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors"
                    >
                      {showPassword ? (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 0 1-4.293 5.774M6.228 6.228 3 3 0 0 0 5.97 5.97m0 0L17.771 17.771m0 0-2.696-2.696m0 0-5.97-5.97" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 btn-gradient text-white font-semibold rounded-xl disabled:opacity-40 disabled:cursor-not-allowed mt-6 relative overflow-hidden"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                  </svg>
                  {mode === 'login' ? '登录中...' : '注册中...'}
                </span>
              ) : (
                <span className="relative z-10">{mode === 'login' ? '登录' : '注册'}</span>
              )}
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-muted text-sm">
              {mode === 'login' ? '还没有账号？' : '已有账号？'}
              <button
                type="button"
                onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                className="ml-2 text-accent font-medium hover:text-accent/80 transition-colors"
              >
                {mode === 'login' ? '立即注册' : '立即登录'}
              </button>
            </p>
          </div>

          {mode === 'login' && (
            <div className="mt-8 pt-6 border-t border-white/5">
              <p className="text-center text-muted text-xs mb-4">其他登录方式</p>
              <div className="flex justify-center gap-4">
                <button className="w-12 h-12 rounded-xl bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89c-.135-.01-.27-.027-.407-.03zm-2.53 3.274c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.969-.982z" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
