'use client';

import { useState } from 'react';

interface FilePreviewProps {
  file: File;
  onRemove: () => void;
  type: 'resume' | 'jd';
}

export default function FilePreview({ file, onRemove, type }: FilePreviewProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 检查是否为图片文件
  const isImage = file.type.startsWith('image/');

  // 获取文件类型图标
  const getFileIcon = () => {
    if (file.name.endsWith('.pdf')) {
      return (
        <div className="w-12 h-12 rounded-xl bg-danger/10 flex items-center justify-center">
          <svg className="w-6 h-6 text-danger" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
          </svg>
        </div>
      );
    }

    if (file.name.endsWith('.doc') || file.name.endsWith('.docx')) {
      return (
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
          </svg>
        </div>
      );
    }

    return (
      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
        <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
        </svg>
      </div>
    );
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const labels = type === 'resume' ? '简历' : '职位描述';

  return (
    <div className="glass-card rounded-2xl p-4 animate-fade-in-up">
      <div className="flex items-start gap-4">
        {isImage && preview ? (
          <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
            <img
              src={preview}
              alt={file.name}
              className="w-full h-full object-cover"
              onLoad={() => setIsLoading(false)}
            />
          </div>
        ) : (
          getFileIcon()
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <p className="font-medium text-foreground truncate">{file.name}</p>
            <button
              onClick={onRemove}
              className="p-1 rounded-lg hover:bg-white/10 transition-colors flex-shrink-0"
            >
              <svg className="w-4 h-4 text-muted hover:text-danger" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted">
            <span>{labels}</span>
            <span>•</span>
            <span>{formatFileSize(file.size)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
