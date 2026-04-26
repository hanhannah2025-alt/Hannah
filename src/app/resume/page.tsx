'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ResumePage() {
  const [uploaded, setUploaded] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const handleUpload = () => {
    setUploaded(true);
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setAnalyzed(true);
    }, 3000);
  };

  return (
    <div className="min-h-screen px-4 py-6 pb-24">
      {/* 顶部标题 */}
      <div className="flex items-center justify-between mb-6">
        <Link href="/intelligence" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <h1 className="text-lg font-bold text-gradient">AI 简历助手</h1>
        <div className="w-10" />
      </div>

      {/* AI 形象 */}
      <div className="flex justify-center mb-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary via-accent to-warning p-[3px] animate-pulse">
            <div className="w-full h-full rounded-full bg-[#070B14] flex items-center justify-center">
              <span className="text-3xl">🤖</span>
            </div>
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-accent/20 rounded-full">
            <span className="text-xs text-accent font-medium">AI 助手</span>
          </div>
        </div>
      </div>

      {/* 功能说明 */}
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-white mb-2">智能简历优化</h2>
        <p className="text-sm text-muted">上传简历，AI 帮你分析优化建议</p>
      </div>

      {!uploaded && !analyzed && (
        <div className="max-w-sm mx-auto">
          {/* 上传区域 */}
          <div
            onClick={handleUpload}
            className="glass-card rounded-2xl p-8 text-center cursor-pointer hover:border-accent/30 transition-all group"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
              </svg>
            </div>
            <p className="text-white font-medium mb-1">点击上传简历</p>
            <p className="text-xs text-muted">支持 PDF、Word 格式</p>
          </div>

          {/* 快捷功能 */}
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="glass-card rounded-xl p-4 text-center">
              <div className="text-2xl mb-2">📝</div>
              <p className="text-xs text-white font-medium">简历诊断</p>
              <p className="text-[10px] text-muted">发现不足之处</p>
            </div>
            <div className="glass-card rounded-xl p-4 text-center">
              <div className="text-2xl mb-2">✨</div>
              <p className="text-xs text-white font-medium">智能优化</p>
              <p className="text-[10px] text-muted">一键生成建议</p>
            </div>
            <div className="glass-card rounded-xl p-4 text-center">
              <div className="text-2xl mb-2">🎯</div>
              <p className="text-xs text-white font-medium">岗位匹配</p>
              <p className="text-[10px] text-muted">提高通过率</p>
            </div>
            <div className="glass-card rounded-xl p-4 text-center">
              <div className="text-2xl mb-2">💎</div>
              <p className="text-xs text-white font-medium">亮点提取</p>
              <p className="text-[10px] text-muted">突出核心优势</p>
            </div>
          </div>
        </div>
      )}

      {analyzing && (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="relative w-32 h-32 mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-accent animate-spin" />
            <div className="absolute inset-4 rounded-full border-4 border-transparent border-t-primary animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl">🔍</span>
            </div>
          </div>
          <p className="text-white font-medium mb-2">AI 正在分析简历...</p>
          <p className="text-sm text-muted">预计需要 30 秒</p>
        </div>
      )}

      {analyzed && (
        <div className="max-w-sm mx-auto animate-fade-in-up">
          {/* 分析结果 */}
          <div className="glass-card rounded-2xl p-5 mb-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-success/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              </div>
              <div>
                <p className="text-white font-medium">分析完成</p>
                <p className="text-xs text-muted">发现 3 个优化建议</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-warning/10 rounded-xl border border-warning/20">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-warning">⚠️</span>
                  <span className="text-sm text-white font-medium">项目描述不够具体</span>
                </div>
                <p className="text-xs text-muted">建议添加量化数据，如提升了多少效率、节省了多少成本</p>
              </div>

              <div className="p-3 bg-accent/10 rounded-xl border border-accent/20">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-accent">💡</span>
                  <span className="text-sm text-white font-medium">技能关键词可优化</span>
                </div>
                <p className="text-xs text-muted">建议添加更多行业热词，提高 ATS 系统匹配度</p>
              </div>

              <div className="p-3 bg-primary/10 rounded-xl border border-primary/20">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-primary">📊</span>
                  <span className="text-sm text-white font-medium">缺少成果展示</span>
                </div>
                <p className="text-xs text-muted">建议增加 1-2 个核心成果案例</p>
              </div>
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="flex gap-3">
            <button
              onClick={() => { setUploaded(false); setAnalyzed(false); }}
              className="flex-1 py-3 bg-white/5 text-white font-medium rounded-xl border border-white/10"
            >
              重新上传
            </button>
            <button className="flex-1 py-3 bg-gradient-to-r from-primary to-accent text-white font-medium rounded-xl">
              一键优化
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
