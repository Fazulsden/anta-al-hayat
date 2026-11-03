/* film.js — the timeline.
   Scenes register themselves in the order the script files load (or with after:'id' to slot in behind another scene).
   Acts group them for the chapter list. Subtitles, voice notes, music and ambience hang off scene ids, so a scene can be
   inserted anywhere without renumbering anything. Nothing here may use s.start before finalizeFilm() runs. */
'use strict';
const BPM=72,BEAT=60/BPM,BAR=BEAT*4;
const SCENES=[],SC=SCENES,ACTS=[],SUBS=[],VOICES=[];
let TOTAL=0,POSTER_T=0;
const FILM={title:'Anta Al Hayat',cut:'9',poster:['queue',14]};

/* act(numeral, name, caption, until) — an act is a date range: every scene whose `when` is <= until (ISO date-time) and later than the previous act's belongs to it */
function act(num,name,when,until){ACTS.push({num,name,when:when||'',until:until||'2099-12-31',from:0,to:0});}

/* scene({id, name, when:'2026-02-07T09:03', bars, fin:[colour,sec], fout:[colour,sec], prep()->assets, draw(ctx,lt,A), subs, voices, score, amb, note, tag})
   The film is sorted by `when`, so a scene can be defined in any file; `after:'id'` is accepted instead of `when` and means "right after that scene". */
function scene(def){
  if(!def||!def.id||!def.bars||typeof def.draw!=='function')throw new Error('scene needs id, bars and draw: '+(def&&def.id));
  if(sceneById(def.id))throw new Error('duplicate scene id '+def.id);
  if(!def.when&&def.after){const a=sceneById(def.after);if(!a)throw new Error('scene '+def.id+': no scene '+def.after+' to follow');def.when=a.when+'~'+String(SCENES.length).padStart(3,'0');}
  if(!def.when)throw new Error('scene '+def.id+' needs when (ISO date-time of the moment, e.g. 2026-02-07T09:03)');
  def.prep=def.prep||(()=>({}));def.subs=def.subs||[];def.voices=def.voices||[];def.order=SCENES.length;
  SCENES.push(def);return def;
}
function sceneById(id){return SCENES.find(s=>s.id===id);}
function need(id){const s=sceneById(id);if(!s)throw new Error('no scene called '+id);return s;}
/* the same hooks as the scene fields, usable from any file loaded after the scene */
function sub(id,a,b,text,kind='n'){need(id).subs.push([a,b,text,kind]);}
function voiceAt(id,at,v){need(id).voices.push(Object.assign({at},v));}
function scoreFor(id,fn){need(id).score=fn;}
function ambFor(id,fn){need(id).amb=fn;}
function noteFor(id,note,tag){const s=need(id);s.note=note;if(tag!==undefined)s.tag=tag;}

/* lay the scenes end to end; resolve subtitles and voice notes to film time */
function finalizeFilm(){
  SCENES.sort((a,b)=>a.when<b.when?-1:a.when>b.when?1:a.order-b.order);
  ACTS.sort((a,b)=>a.until<b.until?-1:1);
  SCENES.forEach((s,i)=>{s.act=ACTS.findIndex(a=>s.when<=a.until);if(s.act<0)s.act=ACTS.length-1;});
  ACTS.forEach((a,i)=>{a.from=SCENES.findIndex(s=>s.act===i);a.to=a.from<0?-1:SCENES.length-[...SCENES].reverse().findIndex(s=>s.act===i);});
  let acc=0;for(const s of SCENES){s.start=acc;s.dur=s.bars*BAR;acc+=s.dur;}
  TOTAL=acc;
  /* fades meet in the same colour: a scene fades in from whatever the previous one faded out to */
  for(let i=1;i<SCENES.length;i++){const p=SCENES[i-1],s=SCENES[i];if(p.fout&&s.fin&&p.fout[0]!==s.fin[0]){p.fout=['#000000',p.fout[1]];s.fin=['#000000',s.fin[1]];}}
  SUBS.length=0;VOICES.length=0;
  for(const s of SCENES){
    for(const q of s.subs){const[a,b,text,kind]=q;SUBS.push([s.start+a,s.start+Math.min(b,s.dur),text,kind||'n']);}
    for(const v of s.voices){if(!v.file||!v.dur)throw new Error('voice note in '+s.id+' needs file and dur');VOICES.push(Object.assign({},v,{t:s.start+v.at,scene:s.id}));}
  }
  SUBS.sort((x,y)=>x[0]-y[0]);VOICES.sort((x,y)=>x.t-y.t);
  const p=sceneById(FILM.poster[0]);POSTER_T=(p?p.start:0)+FILM.poster[1];
  for(const a of ACTS)a.start=a.from>=0&&SCENES[a.from]?SCENES[a.from].start:0;
  return TOTAL;
}
function sceneIndex(t){for(let i=SCENES.length-1;i>=0;i--)if(t>=SCENES[i].start)return i;return 0;}
function sceneAt(t){return SCENES[sceneIndex(t)];}
