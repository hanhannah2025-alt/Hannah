'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ResumePage() {
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [jdUploaded, setJdUploaded] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const handleResumeUpload = () => {
    setResumeUploaded(true);
    checkAndAnalyze();
  };

  const handleJdUpload = () => {
    setJdUploaded(true);
    checkAndAnalyze();
  };

  const checkAndAnalyze = () => {
    if (resumeUploaded && jdUploaded) {
      // 两边都上传后可以开始分析
    }
  };

  const startAnalysis = () => {
    if (resumeUploaded && jdUploaded) {
      setAnalyzing(true);
      setTimeout(() => {
        setAnalyzing(false);
        setAnalyzed(true);
      }, 3000);
    }
  };

  const resetAll = () => {
    setResumeUploaded(false);
    setJdUploaded(false);
    setAnalyzing(false);
    setAnalyzed(false);
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* 背景光效 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-[100px] animate-breathe" />
        <div className="absolute bottom-40 right-10 w-80 h-80 bg-accent/10 rounded-full blur-[100px] animate-breathe" style={{ animationDelay: '2s' }} />
      </div>

      {/* 顶部 */}
      <header className="sticky top-0 z-20 bg-[#070B14]/80 backdrop-blur-xl border-b border-white/5 px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/intelligence" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-lg font-bold text-gradient">AI 简历助手</h1>
          <div className="w-10" />
        </div>
      </header>

      <div className="flex-1 px-4 py-6 pb-24 overflow-y-auto">
        {!analyzing && !analyzed && (
          <>
            {/* 标题 */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 mb-4 animate-float">
                <span className="text-3xl">🤖</span>
              </div>
              <h2 className="text-xl font-bold text-white mb-2">智能简历优化</h2>
              <p className="text-sm text-muted">上传简历和目标岗位，AI 帮你精准匹配优化</p>
            </div>

            {/* 左右上传区域 */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {/* 左侧：上传简历 */}
              <div
                onClick={handleResumeUpload}
                className={`glass-card rounded-2xl p-4 text-center cursor-pointer transition-all group ${
                  resumeUploaded ? 'border-success/50 bg-success/5' : 'hover:border-accent/30'
                }`}
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-3 transition-transform ${
                  resumeUploaded ? 'bg-success/20' : 'bg-gradient-to-br from-primary/20 to-accent/20 group-hover:scale-110'
                }`}>
                  {resumeUploaded ? (
                    <svg className="w-7 h-7 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  ) : (
                    <svg className="w-7 h-7 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 15 9.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                    </svg>
                  )}
                </div>
                <p className="text-sm text-white font-medium mb-1">
                  {resumeUploaded ? '简历已上传' : '点击上传简历'}
                </p>
                <p className="text-[10px] text-muted">
                  {resumeUploaded ? '点击重新选择' : 'PDF / Word'}
                </p>
              </div>

              {/* 右侧：上传目标JD */}
              <div
                onClick={handleJdUpload}
                className={`glass-card rounded-2xl p-4 text-center cursor-pointer transition-all group ${
                  jdUploaded ? 'border-success/50 bg-success/5' : 'hover:border-accent/30'
                }`}
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-3 transition-transform ${
                  jdUploaded ? 'bg-success/20' : 'bg-gradient-to-br from-accent/20 to-warning/20 group-hover:scale-110'
                }`}>
                  {jdUploaded ? (
                    <svg className="w-7 h-7 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  ) : (
                    <svg className="w-7 h-7 text-warning" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
                    </svg>
                  )}
                </div>
                <p className="text-sm text-white font-medium mb-1">
                  {jdUploaded ? 'JD已上传' : '点击上传目标JD'}
                </p>
                <p className="text-[10px] text-muted">
                  {jdUploaded ? '点击重新选择' : '岗位描述'}
                </p>
              </div>
            </div>

            {/* 功能亮点 */}
            <div className="glass-card rounded-2xl p-4 mb-6">
              <h3 className="text-sm font-medium text-white mb-3">AI 分析能力</h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { icon: '📝', text: '简历诊断', desc: '发现不足' },
                  { icon: '🎯', text: '岗位匹配', desc: '精准对标' },
                  { icon: '✨', text: '智能优化', desc: '一键生成' },
                  { icon: '💎', text: '亮点提取', desc: '突出优势' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 bg-white/5 rounded-lg">
                    <span className="text-lg">{item.icon}</span>
                    <div>
                      <p className="text-xs text-white font-medium">{item.text}</p>
                      <p className="text-[10px] text-muted">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 开始分析按钮 */}
            <button
              onClick={startAnalysis}
              disabled={!resumeUploaded || !jdUploaded}
              className="w-full py-4 btn-gradient text-white font-semibold rounded-xl disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {resumeUploaded && jdUploaded ? '简历匹配度分析' : '请先上传简历和目标JD'}
            </button>
          </>
        )}

        {/* 分析中 */}
        {analyzing && (
          <div className="flex flex-col items-center justify-center py-12 animate-fade-in-scale">
            <div className="relative w-32 h-32 mb-6">
              <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-accent animate-spin" />
              <div className="absolute inset-4 rounded-full border-4 border-transparent border-t-primary animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl">🔍</span>
              </div>
            </div>
            <p className="text-white font-medium mb-2">正在进行简历匹配度分析...</p>
            <p className="text-sm text-muted">预计需要 30 秒</p>
          </div>
        )}

        {/* 分析结果 */}
        {analyzed && (
          <div className="animate-fade-in-up">
            {/* 匹配度 - 无背景框，突出数值 */}
            <div className="text-center mb-6">
              <div className="relative inline-flex items-center justify-center">
                <div className="absolute w-32 h-32 rounded-full bg-gradient-to-br from-success/30 via-accent/20 to-warning/10 blur-xl animate-pulse" />
                <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-success/10 to-accent/10 flex items-center justify-center border border-accent/20">
                  <span className="text-5xl font-bold text-gradient-accent">65%</span>
                </div>
              </div>
              <h3 className="text-lg font-bold text-white mt-4 mb-1">简历与岗位匹配度</h3>
              <p className="text-sm text-muted">发现 6 个优化项，优化后可提升至 95%</p>
            </div>

            {/* 数据对比 */}
            <div className="glass-card rounded-2xl p-4 mb-4">
              <h3 className="text-sm font-medium text-white mb-4 text-center">简历对比</h3>

              {/* 表头 */}
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="text-center">
                  <span className="text-xs text-primary font-medium">我的简历</span>
                </div>
                <div className="text-center">
                  <span className="text-xs text-accent font-medium">岗位要求</span>
                </div>
              </div>

              {/* 对比列表 */}
              <div className="space-y-2">
                {/* 学历 - 匹配 */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-2.5 bg-primary/10 rounded-xl text-center">
                    <p className="text-[10px] text-muted mb-0.5">学历</p>
                    <p className="text-xs text-white font-medium">本科</p>
                  </div>
                  <div className="p-2.5 bg-accent/10 rounded-xl relative">
                    <p className="text-[10px] text-muted mb-0.5 text-center">学历</p>
                    <p className="text-xs text-white font-medium text-center">本科及以上</p>
                    <svg className="w-4 h-4 text-success absolute right-2 top-1/2 -translate-y-1/2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>

                {/* 专业 - 匹配 */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-2.5 bg-primary/10 rounded-xl text-center">
                    <p className="text-[10px] text-muted mb-0.5">专业</p>
                    <p className="text-xs text-white font-medium">计算机科学</p>
                  </div>
                  <div className="p-2.5 bg-accent/10 rounded-xl relative">
                    <p className="text-[10px] text-muted mb-0.5 text-center">专业</p>
                    <p className="text-xs text-white font-medium text-center">计算机/软件相关</p>
                    <svg className="w-4 h-4 text-success absolute right-2 top-1/2 -translate-y-1/2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>

                {/* 经验要求 - 匹配 */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-2.5 bg-primary/10 rounded-xl text-center">
                    <p className="text-[10px] text-muted mb-0.5">经验要求</p>
                    <p className="text-xs text-white font-medium">5年工作经验</p>
                  </div>
                  <div className="p-2.5 bg-accent/10 rounded-xl relative">
                    <p className="text-[10px] text-muted mb-0.5 text-center">经验要求</p>
                    <p className="text-xs text-white font-medium text-center">3-5年经验</p>
                    <svg className="w-4 h-4 text-success absolute right-2 top-1/2 -translate-y-1/2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>

                {/* 岗位技能 - 待优化 */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-2.5 bg-primary/10 rounded-xl">
                    <p className="text-[10px] text-muted mb-1 text-center">岗位技能</p>
                    <div className="space-y-1 text-center">
                      <p className="text-[10px] text-white">产品规划</p>
                      <p className="text-[10px] text-white">Axure</p>
                      <p className="text-[10px] text-white">用户研究</p>
                    </div>
                  </div>
                  <div className="p-2.5 bg-accent/10 rounded-xl relative">
                    <p className="text-[10px] text-muted mb-1 text-center">岗位技能</p>
                    <div className="space-y-1 text-center pr-5">
                      <div className="flex items-center justify-center">
                        <span className="text-[10px] text-white">数据分析</span>
                      </div>
                      <div className="flex items-center justify-center">
                        <span className="text-[10px] text-white">SQL</span>
                      </div>
                      <div className="flex items-center justify-center">
                        <span className="text-[10px] text-white">Python</span>
                      </div>
                    </div>
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-1.5">
                      <svg className="w-3.5 h-3.5 text-warning" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <svg className="w-3.5 h-3.5 text-warning" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <svg className="w-3.5 h-3.5 text-warning" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* 项目经历总览 - 部分匹配 */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-2.5 bg-primary/10 rounded-xl">
                    <p className="text-[10px] text-muted mb-1 text-center">项目经历</p>
                    <div className="space-y-1 text-center">
                      <p className="text-[10px] text-white">电商平台重构</p>
                      <p className="text-[10px] text-white">会员增长系统</p>
                      <p className="text-[10px] text-white">数据中台搭建</p>
                    </div>
                  </div>
                  <div className="p-2.5 bg-accent/10 rounded-xl relative">
                    <p className="text-[10px] text-muted mb-1 text-center">项目经历</p>
                    <div className="space-y-1 text-center pr-5">
                      <div className="flex items-center justify-center">
                        <span className="text-[10px] text-white">大型平台产品经验</span>
                      </div>
                      <div className="flex items-center justify-center">
                        <span className="text-[10px] text-white">用户增长项目</span>
                      </div>
                      <div className="flex items-center justify-center">
                        <span className="text-[10px] text-white">数据驱动决策</span>
                      </div>
                    </div>
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-1.5">
                      <svg className="w-3.5 h-3.5 text-warning" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <svg className="w-3.5 h-3.5 text-warning" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <svg className="w-3.5 h-3.5 text-warning" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* 匹配统计 */}
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-center gap-6">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs text-success font-medium">符合 3项</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-warning" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs text-warning font-medium">待优化 6项</span>
                </div>
              </div>
            </div>

            {/* 优化建议 */}
            <div className="glass-card rounded-2xl p-4 mb-4">
              <h3 className="text-sm font-medium text-white mb-3">优化建议</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 bg-warning/10 rounded-lg text-xs text-white border border-warning/20">⚠️ 缺少数据分析技能</span>
                <span className="px-3 py-1.5 bg-warning/10 rounded-lg text-xs text-white border border-warning/20">⚠️ 缺少SQL技能</span>
                <span className="px-3 py-1.5 bg-warning/10 rounded-lg text-xs text-white border border-warning/20">⚠️ 缺少Python技能</span>
                <span className="px-3 py-1.5 bg-accent/10 rounded-lg text-xs text-white border border-accent/20">💡 项目需补充量化数据</span>
                <span className="px-3 py-1.5 bg-accent/10 rounded-lg text-xs text-white border border-accent/20">💡 体现数据驱动决策</span>
                <span className="px-3 py-1.5 bg-primary/10 rounded-lg text-xs text-white border border-primary/20">📊 补充团队协作关键词</span>
              </div>
            </div>

            {/* 一键优化按钮 */}
            <div className="relative mb-4 group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-warning rounded-2xl blur-lg opacity-50 group-hover:opacity-70 transition-opacity animate-pulse" />
              <button className="relative w-full py-4 bg-gradient-to-r from-primary via-accent to-warning text-white font-semibold rounded-2xl flex items-center justify-center gap-2 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                </svg>
                <span>一键优化</span>
              </button>
            </div>

            {/* AI 润色优化 */}
            <div className="glass-card rounded-2xl p-4 mb-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <span className="text-xs">✨</span>
                  </div>
                  <h3 className="text-sm font-medium text-white">理想候选人画像</h3>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-accent"></span>
                    <span className="text-[10px] text-muted">新增/润色</span>
                  </div>
                </div>
              </div>

              {/* 简历 Markdown 展示 */}
              <div className="bg-white/5 rounded-xl p-4 font-mono text-[11px] leading-relaxed">
                {/* 基本信息 */}
                <div className="mb-4">
                  <p className="text-accent font-medium text-xs mb-2"># 个人信息</p>
                  <p className="text-white/80">姓名：张三</p>
                  <p className="text-white/80">电话：138-xxxx-xxxx</p>
                  <p className="text-white/80">邮箱：zhangsan@email.com</p>
                </div>

                {/* 教育背景 */}
                <div className="mb-4">
                  <p className="text-accent font-medium text-xs mb-2"># 教育背景</p>
                  <p className="text-white/80">2015.09 - 2019.06 | 某某大学 | 计算机科学 | 本科</p>
                </div>

                {/* 工作经历 */}
                <div className="mb-4">
                  <p className="text-accent font-medium text-xs mb-2"># 工作经历</p>
                  <p className="text-white/80 mb-1">**某某科技有限公司 | 产品经理 | 2019.07 - 至今**</p>
                  <p className="text-white/70">负责公司核心产品的规划与迭代，主导多个重点项目落地。</p>
                </div>

                {/* 项目经历 */}
                <div className="mb-4">
                  <p className="text-accent font-medium text-xs mb-2"># 项目经历</p>

                  <div className="mb-3">
                    <p className="text-white/80 mb-1">**电商平台重构**</p>
                    <p className="text-white/70">
                      负责电商平台重构项目，
                      <span className="bg-accent/30 text-accent px-1 rounded">协调 20 人跨职能团队，使用敏捷开发方法，项目按时交付并获得公司年度优秀项目奖。该平台日均 UV 50万+，重构后系统响应速度提升 60%</span>
                    </p>
                  </div>

                  <div className="mb-3">
                    <p className="text-white/80 mb-1">**会员增长系统**</p>
                    <p className="text-white/70">
                      设计并落地会员增长体系，
                      <span className="bg-accent/30 text-accent px-1 rounded">通过 SQL 查询分析用户行为数据，建立数据看板，为产品迭代提供数据支持</span>
                      ，实现会员转化率提升 25%，为公司带来年收入增长 500 万。
                    </p>
                  </div>

                  <div className="mb-3">
                    <p className="text-white/80 mb-1">**数据中台搭建**</p>
                    <p className="text-white/70">
                      <span className="bg-accent/30 text-accent px-1 rounded">主导搭建数据分析平台，建立用户行为分析模型，通过数据驱动决策</span>
                      使运营效率提升 40%，<span className="bg-accent/30 text-accent px-1 rounded">为公司节省人力成本 200 万/年</span>
                    </p>
                  </div>
                </div>

                {/* 技能标签 */}
                <div className="mb-4">
                  <p className="text-accent font-medium text-xs mb-2"># 专业技能</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-0.5 bg-primary/20 text-primary rounded text-[10px]">产品规划</span>
                    <span className="px-2 py-0.5 bg-primary/20 text-primary rounded text-[10px]">Axure</span>
                    <span className="px-2 py-0.5 bg-primary/20 text-primary rounded text-[10px]">用户研究</span>
                    <span className="px-2 py-0.5 bg-primary/20 text-primary rounded text-[10px]">项目管理</span>
                    <span className="px-2 py-0.5 bg-accent/30 text-accent rounded text-[10px]">SQL ✓新增</span>
                    <span className="px-2 py-0.5 bg-accent/30 text-accent rounded text-[10px]">数据分析 ✓新增</span>
                    <span className="px-2 py-0.5 bg-accent/30 text-accent rounded text-[10px]">Python ✓新增</span>
                  </div>
                </div>
              </div>

              {/* 底部操作 */}
              <div className="flex justify-between items-center mt-4">
                <p className="text-[10px] text-muted">共优化 6 处内容</p>
                <div className="flex gap-3">
                  <button className="text-[10px] text-muted hover:text-white transition-colors">重写</button>
                  <button className="text-[10px] text-accent font-medium hover:text-accent/80 transition-colors">采用</button>
                </div>
              </div>
            </div>

            {/* 重新上传按钮 */}
            <div className="flex flex-col items-center gap-2 mt-6">
              <button
                onClick={resetAll}
                className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/30 hover:scale-110 transition-transform"
              >
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </button>
              <span className="text-xs text-muted">重新上传</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
