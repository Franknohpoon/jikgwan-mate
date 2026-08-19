/**
 * 카카오톡 공유 — 코드만 미리 넣어두고, JS 키가 없으면 완전히 no-op으로
 * 동작한다. 카카오 개발자 콘솔에서 앱 등록 후 발급받은 JS 키를
 * NEXT_PUBLIC_KAKAO_JS_KEY로 설정하면 자동으로 활성화된다.
 *
 * ShareButtons 컴포넌트는 isKakaoShareEnabled()가 false면 버튼 자체를
 * 렌더링하지 않는다.
 */

declare global {
  interface Window {
    Kakao?: {
      isInitialized: () => boolean;
      init: (key: string) => void;
      Share: {
        sendDefault: (options: Record<string, unknown>) => void;
      };
    };
  }
}

const KAKAO_SDK_SRC = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js';

export function isKakaoShareEnabled(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
}

let loadPromise: Promise<void> | null = null;

function loadKakaoSdk(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();
  if (window.Kakao?.isInitialized()) return Promise.resolve();
  if (loadPromise) return loadPromise;

  loadPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = KAKAO_SDK_SRC;
    script.async = true;
    script.onload = () => {
      const key = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;
      if (key && window.Kakao && !window.Kakao.isInitialized()) {
        window.Kakao.init(key);
      }
      resolve();
    };
    script.onerror = () => reject(new Error('카카오 SDK 로드 실패'));
    document.head.appendChild(script);
  });

  return loadPromise;
}

export async function shareToKakao(params: { title: string; description: string; imageUrl: string; linkUrl: string }): Promise<void> {
  if (!isKakaoShareEnabled()) return;

  await loadKakaoSdk();
  if (!window.Kakao) return;

  window.Kakao.Share.sendDefault({
    objectType: 'feed',
    content: {
      title: params.title,
      description: params.description,
      imageUrl: params.imageUrl,
      link: { mobileWebUrl: params.linkUrl, webUrl: params.linkUrl },
    },
    buttons: [
      {
        title: '나도 참여하기',
        link: { mobileWebUrl: params.linkUrl, webUrl: params.linkUrl },
      },
    ],
  });
}
