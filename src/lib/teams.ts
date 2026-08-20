/**
 * KBO 팀 매칭 로직 — 1차 스펙 (고정 관계 데이터)
 *
 * factpepe-v3의 teamRelationships.mjs를 TypeScript로 이식.
 * 고정 관계(역사적/지역적 라이벌)만 우선 구현. 동적 관계(순위/상대전적
 * 등 시즌 데이터 기반)는 2차 작업에서 getTeamRelationship()의 3순위
 * 로직으로 추가될 예정 — 지금은 "dynamic_pending" 플레이스홀더만 반환한다.
 *
 * 전체 45쌍(10팀 조합) 중 1차 구현 커버리지: 20쌍 (고정 라이벌 16 + 흥참동
 * 전용 4). 나머지 25쌍은 2차 작업 전까지 dynamic_pending으로 처리된다.
 */

// ─── 팀 코드 ─────────────────────────────────────────────────────────

export const TEAMS = ['LG', '두산', '키움', 'SSG', 'KT', '한화', 'KIA', '삼성', '롯데', 'NC'] as const;

export type TeamCode = (typeof TEAMS)[number];

// ─── 팀 연고지 ───────────────────────────────────────────────────────

export const TEAM_REGION: Record<TeamCode, string> = {
  LG: '서울', 두산: '서울', 키움: '서울',
  SSG: '인천',
  KT: '수원',
  한화: '대전',
  KIA: '광주',
  삼성: '대구',
  롯데: '부산',
  NC: '창원',
};

// ─── 관계 타입 ───────────────────────────────────────────────────────

export type RelationshipType = 'fixed_rivalry' | 'heungchamdong' | 'dynamic_pending';
export type RelationshipTier = 'S' | 'A' | 'B' | 'C' | null;

export interface TeamRelationship {
  type: RelationshipType;
  name: string;
  tier: RelationshipTier;
  description: string;
  tags: string[];
  chemistry_score: number;
  role_label: string;
}

export interface SameTeamError {
  error: string;
}

interface RivalryEntry {
  teams: [TeamCode, TeamCode];
  name: string;
  tier: Exclude<RelationshipTier, null>;
  description: string;
  tags: string[];
  chemistry_score: number;
  role_label: string;
}

// ─── 두 팀 조합 키(순서 무관) ────────────────────────────────────────
// TS/JS에는 frozenset이 없으므로, 두 팀명을 정렬해 이어붙인 문자열을
// Map의 키로 사용해 "A-B == B-A"를 보장한다.

function pairKey(teamA: string, teamB: string): string {
  return [teamA, teamB].sort().join('__');
}

function buildPairMap(entries: RivalryEntry[]): Map<string, RivalryEntry> {
  const map = new Map<string, RivalryEntry>();
  for (const entry of entries) {
    const [a, b] = entry.teams;
    map.set(pairKey(a, b), entry);
  }
  return map;
}

// ─── 고정 관계 매핑 (1차 구현 대상, 16쌍) ───────────────────────────

const FIXED_RIVALRY_LIST: RivalryEntry[] = [
  {
    teams: ['LG', '두산'],
    name: '잠실 더비',
    tier: 'S',
    description: '같은 잠실야구장을 홈으로 공유하는 전통의 라이벌. 매년 어린이날 더비로도 유명함.',
    tags: ['같은구장', '전통라이벌', '어린이날더비'],
    chemistry_score: 98,
    role_label: '천생 라이벌',
  },
  {
    teams: ['삼성', 'KIA'],
    name: '달빛동맹 (88고속도로 시리즈)',
    tier: 'A',
    description: "리그 우승 횟수 1·2위를 다투는 원년 명문 구단 간의 라이벌전. 대구(달구벌)와 광주(빛고을)의 지역 협력을 뜻하는 '달빛동맹'에서 이름을 땀.",
    tags: ['원년구단', '명문구단', '지역동맹'],
    chemistry_score: 86,
    role_label: '숙명의 맞수',
  },
  {
    teams: ['롯데', 'KIA'],
    name: '구도 라이벌',
    tier: 'A',
    description: '전통의 구도(球都) 라이벌전.',
    tags: ['전통라이벌'],
    chemistry_score: 82,
    role_label: '구도 라이벌',
  },
  {
    teams: ['롯데', '삼성'],
    name: '클래식 시리즈',
    tier: 'A',
    description: '경상권(부산-대구) 원년 구단 간 지역 라이벌. 양 팀이 올드 유니폼을 입고 치르는 이벤트 매치이기도 하며, 1984년 한국시리즈·1999년 플레이오프 명승부로 유명.',
    tags: ['영남권', '원년구단', '올드유니폼이벤트'],
    chemistry_score: 80,
    role_label: '구도 클래식 맞수',
  },
  {
    teams: ['롯데', 'NC'],
    name: '낙동강 시리즈',
    tier: 'S',
    description: "부산-창원 사이를 흐르는 낙동강에서 유래한 이름. '서울에 잠실 시리즈가 있다면 동남권엔 낙동강 시리즈'라 불릴 만큼 KBO를 대표하는 라이벌 매치업. 부마 더비, 경남 더비로도 불림.",
    tags: ['영남권', '잠실시리즈급', '확실한흥행카드'],
    chemistry_score: 94,
    role_label: '동남권 맞수',
  },
  {
    teams: ['삼성', 'NC'],
    name: '영남 더비',
    tier: 'B',
    description: '경상권(대구-창원) 지역 라이벌.',
    tags: ['영남권', '지역라이벌'],
    chemistry_score: 68,
    role_label: '영남 라이벌',
  },
  {
    teams: ['LG', '롯데'],
    name: '엘롯라시코',
    tier: 'S',
    description: '축구 엘 클라시코에 빗댄 국내 최대 유행어 매치업. KBO에서 가장 널리 쓰이는 라이벌 별명 중 하나.',
    tags: ['유행어', '최다언급'],
    chemistry_score: 95,
    role_label: '애증의 맞수',
  },
  {
    teams: ['삼성', '두산'],
    name: '싸대기매치',
    tier: 'A',
    description: 'KBO 포스트시즌 최다 대진(10회, 한국시리즈 5회+플레이오프 5회)을 기록한 명문 구단 간의 라이벌전.',
    tags: ['포스트시즌최다대진', '명문구단'],
    chemistry_score: 88,
    role_label: '진검승부 상대',
  },
  {
    teams: ['LG', 'KT'],
    name: '통신전',
    tier: 'A',
    description: '모기업(LG U+/KT)의 통신업계 라이벌에서 유래. 2020년대 최강팀 매치업으로, 2023년 한국시리즈·2024년 준플레이오프 등 명승부를 자주 만듦.',
    tags: ['통신업계', '최강팀매치업'],
    chemistry_score: 80,
    role_label: '라이벌 신흥강자',
  },
  {
    teams: ['SSG', '롯데'],
    name: '항구 시리즈',
    tier: 'A',
    description: '대한민국 양대 항구도시(인천-부산)의 라이벌 매치. 유통업계(신세계-롯데) 라이벌이기도 하며, SSG 입장에서 메인 라이벌 중 하나.',
    tags: ['항구도시', '유통업계라이벌', '구도'],
    chemistry_score: 84,
    role_label: '항구 라이벌',
  },
  {
    teams: ['LG', '키움'],
    name: '엘키라시코',
    tier: 'B',
    description: '넥센 히어로즈 시절부터 이어진 명승부 매치업. LG 공식 인포박스에도 정식 라이벌전으로 등재된 이름.',
    tags: ['넥센시절부터', '정식명칭'],
    chemistry_score: 74,
    role_label: '티격태격 매치업',
  },
  {
    teams: ['KT', 'SSG'],
    name: '수인선 시리즈',
    tier: 'A',
    description: "수원-인천을 잇는 수인선 철도에서 유래한 이름. 경인선(서울-인천)과 헷갈리기 쉬우나 정확한 지리적 명칭. 2000년대 이후 창단 4팀 '흥참동'의 멤버이기도 함.",
    tags: ['수인선', '흥참동'],
    chemistry_score: 78,
    role_label: '이웃 라이벌',
  },
  {
    teams: ['두산', 'KIA'],
    name: '단군매치',
    tier: 'A',
    description: '원년 팀(OB 베어스-해태 타이거즈) 시절부터 이어진 명문 구단 라이벌전. 통산 전적은 두산 우세. 두 팀 팬덤 모두 LG·삼성을 공공의 적으로 여기는 정서 덕에 팬덤 간 관계는 상대적으로 호의적.',
    tags: ['원년팀', '명문구단', '단군'],
    chemistry_score: 85,
    role_label: '오래된 맞수',
  },
  {
    teams: ['두산', 'SSG'],
    name: '두산-SSG 라이벌전',
    tier: 'A',
    description: 'SK 와이번스 전성기(2000년대 후반)부터 이어진 라이벌리. SSG 팬 중 상당수가 항구 시리즈(롯데)보다 두산을 더 중요한 라이벌로 꼽음. (※ 별도로 통용되는 명칭 없음)',
    tags: ['SK전성기부터', 'SSG메인라이벌후보'],
    chemistry_score: 76,
    role_label: '은근한 신경전',
  },
  // ── 나무위키 조사 반영 신규 추가 ──
  {
    teams: ['KIA', 'LG'],
    name: '이름 없는 앙숙',
    tier: 'S',
    description: "해태 타이거즈-MBC 청룡 시절 선동열·최동원 라이벌전부터 이어진, KIA 팬덤·선수단 사이에서 'LG전은 무조건 이겨야 한다'는 정서가 강한 최상급 라이벌. 나무위키 표현으로 'KBO 역사상 최악의 불구대천의 라이벌 관계'.",
    tags: ['해태시절부터', '이름없는앙숙', '최상급라이벌'],
    chemistry_score: 93,
    role_label: '이름 없는 앙숙',
  },
  {
    teams: ['키움', 'SSG'],
    name: '1호선 시리즈',
    tier: 'B',
    description: "수도권 전철 1호선으로 연결된 두 구단. 2018년 플레이오프 1·2차전 연속 벤치클리어링, 2019년 SK가 9경기차를 뒤집히고 키움에 업셋당하며 완벽한 신흥 라이벌리로 자리매김. '삼청태현' 계보의 악연이기도 함.",
    tags: ['1호선', '신흥라이벌', '흥참동'],
    chemistry_score: 72,
    role_label: '신흥 라이벌',
  },
];

export const FIXED_RIVALRIES = buildPairMap(FIXED_RIVALRY_LIST);

// ─── 흥행참패동맹 (별도 그룹, 4쌍) ───────────────────────────────────
// KT-SSG는 "수인선 시리즈", 키움-SSG는 "1호선 시리즈"로 FIXED_RIVALRIES에
// 포함되어 있으므로, 흥참동은 나머지 4쌍에만 적용한다.

export const HEUNGCHAMDONG_TEAMS: TeamCode[] = ['SSG', '키움', 'NC', 'KT'];

const HEUNGCHAMDONG_LIST: RivalryEntry[] = [
  {
    teams: ['SSG', 'NC'],
    name: '흥행참패동맹 (흥참동)',
    tier: 'C',
    description: '2000년대 이후 창단한 4개 구단을 묶는 신조어.',
    tags: ['흥참동', '신생구단'],
    chemistry_score: 56,
    role_label: '흥참동 동지',
  },
  {
    teams: ['키움', 'NC'],
    name: '흥행참패동맹 (흥참동)',
    tier: 'C',
    description: '2000년대 이후 창단한 4개 구단을 묶는 신조어.',
    tags: ['흥참동', '신생구단'],
    chemistry_score: 52,
    role_label: '흥참동 동지',
  },
  {
    teams: ['키움', 'KT'],
    name: '흥행참패동맹 (흥참동)',
    tier: 'C',
    description: '2000년대 이후 창단한 4개 구단을 묶는 신조어.',
    tags: ['흥참동', '신생구단'],
    chemistry_score: 50,
    role_label: '흥참동 동지',
  },
  {
    teams: ['NC', 'KT'],
    name: '흥행참패동맹 (흥참동)',
    tier: 'C',
    description: '2000년대 이후 창단한 4개 구단을 묶는 신조어.',
    tags: ['흥참동', '신생구단'],
    chemistry_score: 58,
    role_label: '흥참동 동지',
  },
  // KT-SSG("수인선 시리즈")와 키움-SSG("1호선 시리즈")는 고정 라이벌이 우선 적용되므로 여기 없음
];

export const HEUNGCHAMDONG_PAIRS = buildPairMap(HEUNGCHAMDONG_LIST);

// ─── 매칭 함수 (1차 버전 — 고정 관계만) ─────────────────────────────

/**
 * 두 팀 간의 관계를 반환.
 * 1차 버전: 고정 관계(FIXED_RIVALRIES)와 흥참동(HEUNGCHAMDONG_PAIRS)만 처리.
 * 동적 관계(순위/상대전적 기반)는 2차 작업에서 이 함수에 3순위 로직으로
 * 추가될 예정 — 그 전까지는 "dynamic_pending"을 반환한다.
 */
export function getTeamRelationship(teamA: TeamCode, teamB: TeamCode): TeamRelationship | SameTeamError {
  if (teamA === teamB) {
    return { error: '같은 팀입니다' };
  }

  const key = pairKey(teamA, teamB);

  // 1순위: 고정 라이벌 관계
  const fixed = FIXED_RIVALRIES.get(key);
  if (fixed) {
    return {
      type: 'fixed_rivalry',
      name: fixed.name,
      tier: fixed.tier,
      description: fixed.description,
      tags: fixed.tags,
      chemistry_score: fixed.chemistry_score,
      role_label: fixed.role_label,
    };
  }

  // 2순위: 흥참동
  const heung = HEUNGCHAMDONG_PAIRS.get(key);
  if (heung) {
    return {
      type: 'heungchamdong',
      name: heung.name,
      tier: heung.tier,
      description: heung.description,
      tags: heung.tags,
      chemistry_score: heung.chemistry_score,
      role_label: heung.role_label,
    };
  }

  // 3순위: 동적 관계 (2차 작업 예정 — 현재는 플레이스홀더)
  // TODO(2차): 순위 라이벌 / 격차 관계 / 동병상련 / 우승 후보 매치업 /
  //            상대전적 우위 / 물고 물리는 사이 등을 시즌 데이터 기반으로
  //            여기에 추가.
  return {
    type: 'dynamic_pending',
    name: '관계 분석 예정',
    tier: null,
    description: '이 매치업은 시즌 데이터(순위/상대전적) 기반으로 분석될 예정입니다.',
    tags: [],
    chemistry_score: 0,
    role_label: '',
  };
}

export function isSameTeamError(result: TeamRelationship | SameTeamError): result is SameTeamError {
  return 'error' in result;
}
