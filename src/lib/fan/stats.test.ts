import {describe,it,expect} from 'vitest';
import {summarizeBoards,dayKst} from './stats';
import type {Board} from './store';
const now=Date.parse('2026-11-10T15:30:00Z');
const board=(createdAt:number,joined:number[],expiresAt=now+1000)=>({createdAt,expiresAt,friends:joined.map(joinedAt=>({joinedAt}))}) as Board;
describe('retained-map statistics',()=>{
 it('uses Korean midnight rather than UTC midnight',()=>{expect(dayKst(now)).toBe('2026-11-11');expect(dayKst(Date.parse('2026-11-10T14:59:59Z'))).toBe('2026-11-10')});
 it('counts maps with friends, retained joins and current-day records; excludes expired maps',()=>{
  const yesterday=now-86400000;const s=summarizeBoards([board(now,[]),board(yesterday,[yesterday,now]),board(now,[now],now-1)],now);
  expect(s.maps).toBe(2);expect(s.activeMaps).toBe(1);expect(s.joins).toBe(2);expect(s.todayMaps).toBe(1);expect(s.todayJoins).toBe(1);expect(s.days).toHaveLength(14);expect(s.days.at(-1)).toEqual({date:'2026-11-11',maps:1,joins:1});expect(JSON.stringify(s)).not.toContain('friends');
 });
});

it('lists retained maps by participation without exposing profiles',()=>{const a={...board(now,[now]),id:'abcdefghijklmnop',owner:{name:'비공개'}},b={...board(now,[]),id:'qrstuvwxyzABCDEF'},expired={...board(now,[now],now-1),id:'1234567890123456'};const result=summarizeBoards([b,a,expired] as Board[],now);expect(result.perMap).toEqual([{id:a.id,createdAt:now,participants:1},{id:b.id,createdAt:now,participants:0}]);expect(JSON.stringify(result)).not.toContain('비공개')});
