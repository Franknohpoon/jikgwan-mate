import { timingSafeEqual } from 'node:crypto';
import { handleTeamCommand, readSkillRequest, textResponse } from '@/lib/kakaoProfile';
import { createTeamStore } from '@/lib/kakaoStore';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  const secret = process.env.KAKAO_SKILL_SECRET;
  if (!secret || secret.length < 32) return Response.json({ error: 'Skill unavailable' }, { status: 503 });
  // A secret query parameter works with a skill URL without requiring custom headers.
  // Treat the entire URL as a credential; never log or share it.
  const supplied = new URL(request.url).searchParams.get('key') ?? '';
  const expectedBytes = Buffer.from(secret);
  const suppliedBytes = Buffer.from(supplied);
  if (suppliedBytes.length !== expectedBytes.length || !timingSafeEqual(suppliedBytes, expectedBytes)) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }
  let body: unknown;
  try { body = await request.json(); }
  catch { return Response.json({ error: 'Invalid JSON' }, { status: 400 }); }
  const input = readSkillRequest(body);
  if (!input) return Response.json({ error: 'Invalid skill request' }, { status: 400 });
  try {
    return Response.json(await handleTeamCommand(input.userId, input.utterance, createTeamStore()));
  } catch {
    // Do not expose Redis credentials, user IDs, or request content in logs/responses.
    return Response.json(textResponse('응원팀 정보를 처리하지 못했어요. 잠시 후 다시 시도해 주세요.'));
  }
}
