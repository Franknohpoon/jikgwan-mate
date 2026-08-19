import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-20 text-center">
      <div className="max-w-sm space-y-6">
        <div className="text-5xl">🐸⚾</div>
        <div className="space-y-2">
          <h1 className="text-3xl font-black">직관메이트</h1>
          <p className="text-muted text-[15px] leading-relaxed">
            내 응원팀을 고르고 링크를 공유하면,
            <br />
            친구들과 함께 &quot;직관메이트 지도&quot;가 완성돼요.
          </p>
        </div>

        <Link
          href="/create"
          className="inline-flex w-full items-center justify-center rounded-2xl py-3.5 font-black text-white shadow-lg transition-transform active:scale-[0.98]"
          style={{ background: 'var(--accent-red)' }}
        >
          지도 만들기
        </Link>

        <p className="text-muted text-[11px]">
          FACTPEPE 사이드 프로젝트 · <span className="font-bold">@factpepe_</span>
        </p>
      </div>
    </div>
  );
}
