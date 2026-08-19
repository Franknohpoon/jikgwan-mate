'use client';

import { useState } from 'react';
import { isKakaoShareEnabled, shareToKakao } from '@/lib/kakaoShare';

interface ShareButtonsProps {
  url: string;
  title: string;
  description: string;
}

export default function ShareButtons({ url, title, description }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // 클립보드 권한이 없는 환경 — 조용히 무시하고 사용자가 직접 복사하도록 둔다.
    }
  };

  const handleShareX = () => {
    const text = `${title}\n${description}`;
    const intent = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(intent, '_blank', 'noopener,noreferrer');
  };

  const handleShareKakao = () => {
    void shareToKakao({
      title,
      description,
      imageUrl: `${window.location.origin}/og-image.png`,
      linkUrl: url,
    });
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={handleCopy}
        className="flex-1 rounded-xl border border-border py-2.5 text-sm font-bold transition-colors"
        style={{ background: 'var(--surface-2)' }}
      >
        {copied ? '✅ 복사됨' : '🔗 링크 복사'}
      </button>
      <button
        onClick={handleShareX}
        className="flex-1 rounded-xl py-2.5 text-sm font-bold text-white"
        style={{ background: '#000000' }}
      >
        X로 공유
      </button>
      {isKakaoShareEnabled() && (
        <button
          onClick={handleShareKakao}
          className="flex-1 rounded-xl py-2.5 text-sm font-bold"
          style={{ background: '#FEE500', color: '#191600' }}
        >
          카카오톡 공유
        </button>
      )}
    </div>
  );
}
