/**
 * OG 이미지용 한글 폰트 로더
 *
 * Satori(next/og)는 woff2를 지원하지 않으므로,
 * Google Fonts API에서 woff 포맷을 받아 사용한다.
 * 모듈 레벨에서 캐싱하여 중복 네트워크 요청을 방지.
 */

let fontCache: ArrayBuffer | null = null;

/**
 * Noto Sans KR Black(900) 폰트를 로드한다.
 * Satori 호환 포맷(woff)으로 반환.
 */
export async function loadNotoSansKR(): Promise<ArrayBuffer> {
  if (fontCache) return fontCache;

  // Safari 6 UA → Google Fonts가 woff 포맷을 반환
  const css = await fetch(
    'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@900&display=swap',
    {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/600.1.17 (KHTML, like Gecko) Version/6.2 Safari/537.85.10',
      },
      next: { revalidate: 86400 }, // 24시간 캐싱
    }
  ).then((r) => r.text());

  // CSS에서 첫 번째 font URL 추출
  const match = css.match(/url\(([^)]+)\)/);
  if (!match?.[1]) {
    throw new Error('Google Fonts CSS에서 Noto Sans KR 폰트 URL을 파싱할 수 없습니다.');
  }

  const buf = await fetch(match[1]).then((r) => r.arrayBuffer());
  fontCache = buf;
  return buf;
}

/** OG ImageResponse에 전달할 fonts 옵션을 구성한다. */
export async function getOgFonts() {
  const fontData = await loadNotoSansKR();
  return [
    {
      name: 'NotoSansKR',
      data: fontData,
      weight: 900 as const,
      style: 'normal' as const,
    },
  ];
}
