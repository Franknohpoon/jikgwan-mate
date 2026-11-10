import type { Board } from './store';
export const dayKst=(time:number)=>new Date(time+9*3600000).toISOString().slice(0,10);
export function summarizeBoards(boards:Board[],now=Date.now()){
 const today=dayKst(now),days=Array.from({length:14},(_,i)=>({date:dayKst(now-(13-i)*86400000),maps:0,joins:0}));
 const perMap:{id:string;createdAt:number;participants:number}[]=[];
 let maps=0,activeMaps=0,joins=0,todayMaps=0,todayJoins=0;
 for(const b of boards){if(!b||!Number.isFinite(b.expiresAt)||b.expiresAt<=now)continue;maps++;const friends=Array.isArray(b.friends)?b.friends:[];if(typeof b.id==='string'&&/^[\w-]{16}$/.test(b.id))perMap.push({id:b.id,createdAt:b.createdAt,participants:friends.length});if(friends.length)activeMaps++;joins+=friends.length;const created=dayKst(b.createdAt);if(created===today)todayMaps++;const day=days.find(d=>d.date===created);if(day)day.maps++;
  for(const f of friends){const joined=dayKst(f.joinedAt);if(joined===today)todayJoins++;const day=days.find(d=>d.date===joined);if(day)day.joins++;}
 }
 perMap.sort((a,b)=>b.participants-a.participants||b.createdAt-a.createdAt);
 return {perMap,maps,activeMaps,joins,todayMaps,todayJoins,days,asOf:now};
}
