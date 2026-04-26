'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/intelligence', label: '情报', icon: 'flame' },
  { href: '/community', label: '社区', icon: 'globe' },
  { href: '/offer', label: '决策', icon: 'scale' },
  { href: '/profile', label: '我', icon: 'user' },
];

const icons: Record<string, React.ReactNode> = {
  flame: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.753 6.365a6 6 0 0 0 6-2.292 6 6 0 0 0 6 2.292 8.252 8.252 0 0 1-3.391 1.141Z" />
    </svg>
  ),
  globe: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
  ),
  scale: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971Zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971Z" />
    </svg>
  ),
  user: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
    </svg>
  ),
};

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 safe-area-bottom">
      <div className="absolute inset-0 bg-[#070B14]/80 backdrop-blur-2xl border-t border-white/5" />
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-20 bg-gradient-radial from-primary/20 to-transparent blur-2xl" />

      <div className="relative flex justify-around items-center h-18 max-w-lg mx-auto px-2 py-2">
        {/* 左侧两个按钮 */}
        {navItems.slice(0, 2).map((item) => {
          const isActive = pathname === item.href || (pathname === '/' && item.href === '/intelligence');

          return (
            <Link key={item.href} href={item.href} className="relative flex flex-col items-center justify-center gap-1 py-2 px-4 rounded-2xl transition-all duration-300 group">
              {isActive && <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-primary/20 to-accent/10 blur-sm" />}
              {isActive && <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-gradient-to-r from-primary to-accent" />}

              <div className={`relative transition-all duration-300 ${isActive ? 'text-accent scale-110' : 'text-muted group-hover:text-foreground group-hover:scale-105'}`}>
                {icons[item.icon]}
                {isActive && <div className="absolute inset-0 animate-pulse-glow rounded-full" />}
              </div>

              <span className={`text-[10px] font-medium transition-all duration-300 ${isActive ? 'text-accent' : 'text-muted group-hover:text-foreground'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}

        {/* 中间AI简历按钮 */}
        <Link
          href="/resume"
          className="relative -mt-8 flex flex-col items-center justify-center group"
        >
          {/* 外发光效果 */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-warning rounded-full blur-xl opacity-60 group-hover:opacity-80 transition-opacity scale-110" />

          {/* 主按钮 */}
          <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-primary via-accent to-warning p-[3px] shadow-lg shadow-accent/30 group-hover:shadow-accent/50 transition-all group-hover:scale-110 group-active:scale-95">
            <div className="w-full h-full rounded-full bg-[#070B14] flex items-center justify-center">
              <div className="text-center">
                <div className="text-lg font-bold bg-gradient-to-r from-primary via-accent to-warning bg-clip-text text-transparent">
                  AI
                </div>
                <div className="text-[8px] text-white/80 font-medium -mt-0.5">简历</div>
              </div>
            </div>
          </div>

          {/* 闪烁动画点 */}
          <div className="absolute top-1 right-1 w-2 h-2 bg-warning rounded-full animate-ping" />
          <div className="absolute top-1 right-1 w-2 h-2 bg-warning rounded-full" />
        </Link>

        {/* 右侧两个按钮 */}
        {navItems.slice(2).map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link key={item.href} href={item.href} className="relative flex flex-col items-center justify-center gap-1 py-2 px-4 rounded-2xl transition-all duration-300 group">
              {isActive && <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-primary/20 to-accent/10 blur-sm" />}
              {isActive && <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-gradient-to-r from-primary to-accent" />}

              <div className={`relative transition-all duration-300 ${isActive ? 'text-accent scale-110' : 'text-muted group-hover:text-foreground group-hover:scale-105'}`}>
                {icons[item.icon]}
                {isActive && <div className="absolute inset-0 animate-pulse-glow rounded-full" />}
              </div>

              <span className={`text-[10px] font-medium transition-all duration-300 ${isActive ? 'text-accent' : 'text-muted group-hover:text-foreground'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
