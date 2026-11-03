/* score.js — the music engine: chords and themes, the per-scene cue builder, ambience (wind, waves, rooms, engines) and her real voice notes.
   Scenes compose themselves with scoreFor(id, fn) / scene({score}) — see music1.js and notes/AUTHORING.md. */
'use strict';
const CH={
  G:{b:43,p:[55,59,62,67]},Em:{b:40,p:[52,55,59,64]},C:{b:48,p:[55,60,64,67]},D:{b:50,p:[54,57,62,66]},Bm:{b:47,p:[54,59,62,66]},Am:{b:45,p:[52,57,60,64]},
  Cmaj7:{b:48,p:[55,59,64,67]},Dsus:{b:50,p:[55,57,62,67]},Gmaj7:{b:43,p:[54,59,62,67]},
  /* added for the long cut */
  Em7:{b:40,p:[52,55,59,62]},Am7:{b:45,p:[52,57,60,67]},Fmaj7:{b:41,p:[53,57,60,64]},Bm7:{b:47,p:[54,59,62,69]},D7:{b:50,p:[54,57,60,66]},
  Gsus:{b:43,p:[55,60,62,67]},Cadd9:{b:48,p:[55,62,64,67]},Em9:{b:40,p:[54,55,59,64]},
};
/* THEME — the main theme in G (8 bars). THEME_B — her theme: a quieter answer in E minor (8 bars). THEME_C — the road theme (4 bars, repeats). */
const THEME=[[[71,1],[74,1],[79,2]],[[78,1],[76,1],[74,2]],[[72,1],[74,1],[76,1],[72,1]],[[71,2],[69,1],[67,1]],[[71,1],[74,1],[79,1],[81,1]],[[79,2],[76,1],[74,1]],[[72,1],[74,1],[76,1],[79,1]],[[74,4]]];
const THEME_CH=['G','Em','C','D','G','Bm','C','D'];
const THEME_B=[[[76,2],[74,1],[71,1]],[[72,2],[71,1],[69,1]],[[67,1],[69,1],[71,1],[72,1]],[[74,3],[71,1]],[[76,2],[79,1],[78,1]],[[76,1],[74,1],[72,2]],[[71,1],[72,1],[74,1],[69,1]],[[67,4]]];
const THEME_B_CH=['Em','Cmaj7','G','D','Em7','Am7','Cadd9','Dsus'];
const THEME_C=[[[67,1],[71,0.5],[74,0.5],[79,1],[74,1]],[[76,1],[74,0.5],[71,0.5],[72,2]],[[69,1],[72,0.5],[76,0.5],[81,1],[76,1]],[[74,2],[71,1],[67,1]]];
const THEME_C_CH=['G','Cmaj7','Am7','D'];
/* every scene's cues, in film time */
let EVENTS=[];
function buildScore(){
  const E=[];const add=(t,kind,o={})=>E.push(Object.assign({t,kind},o));
  for(const me of SCENES){
    if(!me.score)continue;
    const T=(bar,beat=0)=>me.start+bar*BAR+beat*BEAT,at=sec=>me.start+sec,hit=(sec,kind,o={})=>add(me.start+sec,kind,o);
    const pad=(t,ch,bars,vel,kind='pad')=>add(t,kind,{notes:CH[ch].p,dur:bars*BAR,vel});
    const melody=(bar,tb,kind,shift,vel,theme=THEME)=>{let beat=0;for(const[m,d]of theme[tb%theme.length]){add(T(bar,beat),kind,{midi:m+shift,dur:d*BEAT,vel});beat+=d;}};
    const arp=(bar,ch,vel,pattern,step)=>{const c=CH[ch],tones=[c.b+12,c.p[1],c.p[2],c.p[3],c.p[1]+12,c.p[2]+12];pattern.forEach((ix,k)=>{if(ix!==null)add(T(bar,k*step),'piano',{midi:tones[ix],dur:step*BEAT*2,vel});});};
    const bassline=(bar,ch,vel)=>{for(let q=0;q<4;q++)add(T(bar,q),'bass',{midi:CH[ch].b+(q===2?7:0),dur:BEAT*0.9,vel});};
    /* a whole bar in one call: chords[] cycled, with a texture name */
    const bars=(from,n,chords,o={})=>{for(let b=0;b<n;b++){const c=chords[b%chords.length];if(o.pad!==false)pad(T(from+b),c,1.05,o.padVel??0.5,o.strings?'strings':'pad');if(o.arp)arp(from+b,c,o.arpVel??0.18,o.arp===true?[0,2,3,4,5,4,3,2]:o.arp,o.step??0.5);if(o.bass)bassline(from+b,c,o.bassVel??0.4);if(o.melody)melody(from+b,b,o.melody,o.shift??0,o.melVel??0.5,o.theme||THEME);}};
    try{me.score({add,T,at,hit,pad,melody,arp,bassline,bars,me,CH,THEME,THEME_B,THEME_C,THEME_CH,THEME_B_CH,THEME_C_CH});}
    catch(e){console.error('score of scene '+me.id+' failed',e);}
  }
  for(const v of VOICES)add(v.t,'voice',{v});
  E.sort((a,b)=>a.t-b.t);return E;
}
function composeScore(){EVENTS=buildScore();return EVENTS;}
function ambience(t){const s=SCENES[sceneIndex(t)];if(!s||!s.amb)return{};return s.amb(t-s.start)||{};}
function voiceActive(t){return VOICES.find(v=>t>=v.t-0.15&&t<v.t+v.dur);}
/* ---------- synth ---------- */
const A={ac:null,master:null,rev:null,bus:null,white:null,muted:false,next:0,amb:{},filmT:0,vnBuf:{},vnSrc:[]};
const mtof=m=>440*Math.pow(2,(m-69)/12);
function audioInit(){
  if(A.ac)return true;
  const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return false;
  try{
    const ac=new AC();A.ac=ac;
    const comp=ac.createDynamicsCompressor();comp.threshold.value=-14;comp.ratio.value=3;comp.connect(ac.destination);
    A.master=ac.createGain();A.master.gain.value=A.muted?0:0.9;A.master.connect(comp);
    const ir=ac.createBuffer(2,Math.round(ac.sampleRate*3.2),ac.sampleRate);
    for(let ch=0;ch<2;ch++){const d=ir.getChannelData(ch);for(let i=0;i<d.length;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/d.length,2.6);}
    const conv=ac.createConvolver();conv.buffer=ir;const rvOut=ac.createGain();rvOut.gain.value=0.55;conv.connect(rvOut);rvOut.connect(A.master);
    A.rev=ac.createGain();A.rev.gain.value=0.5;A.rev.connect(conv);
    const wb=ac.createBuffer(1,ac.sampleRate*2,ac.sampleRate),wd=wb.getChannelData(0);for(let i=0;i<wd.length;i++)wd[i]=Math.random()*2-1;A.white=wb;
    const mkNoise=(type,f,q)=>{const s=ac.createBufferSource();s.buffer=wb;s.loop=true;const flt=ac.createBiquadFilter();flt.type=type;flt.frequency.value=f;flt.Q.value=q;const g=ac.createGain();g.gain.value=0;s.connect(flt);flt.connect(g);g.connect(A.master);g.connect(A.rev);s.start();return{g,flt};};
    A.amb.wind=mkNoise('bandpass',500,0.6);A.amb.waves=mkNoise('lowpass',420,0.5);A.amb.room=mkNoise('lowpass',180,0.4);A.amb.rain=mkNoise('highpass',2600,0.4);A.amb.crowd=mkNoise('bandpass',900,1.2);
    const h=ac.createOscillator();h.type='triangle';h.frequency.value=52;const hl=ac.createBiquadFilter();hl.type='lowpass';hl.frequency.value=160;const hg=ac.createGain();hg.gain.value=0;h.connect(hl);hl.connect(hg);hg.connect(A.master);h.start();
    const hn=mkNoise('lowpass',240,0.8);A.amb.hum={g:hg,n:hn.g};
    A.voiceOut=ac.createGain();A.voiceOut.gain.value=1.15;A.voiceOut.connect(A.master);
    for(const v of VOICES)loadVoice(v);
    return true;
  }catch(e){A.ac=null;return false;}
}
function loadVoice(v){
  if(A.vnBuf[v.file]||!A.ac)return;A.vnBuf[v.file]='loading';
  fetch('voice/'+v.file+'.mp3').then(r=>r.arrayBuffer()).then(b=>A.ac.decodeAudioData(b)).then(buf=>{A.vnBuf[v.file]=buf;}).catch(()=>{A.vnBuf[v.file]='failed';});
}
function playVoice(v,at,offset){
  const buf=A.vnBuf[v.file];if(!buf||typeof buf==='string'){
    if(buf==='failed')return;const tries=v._tries||0;if(tries>60)return;v._tries=tries+1;
    setTimeout(()=>{if(!A.bus)return;const t=A.filmT;if(t>=v.t&&t<v.t+v.dur-0.4)playVoice(v,A.ac.currentTime+0.02,t-v.t);},250);return;}
  const src=A.ac.createBufferSource();src.buffer=buf;src.connect(A.voiceOut);src.start(at,Math.max(0,offset||0));A.vnSrc.push(src);
}
function osc(type,f,at,stop,dest){const o=A.ac.createOscillator();o.type=type;o.frequency.setValueAtTime(f,at);o.connect(dest);o.start(at);o.stop(stop);return o;}
function playEvent(e,at){
  const ac=A.ac,bus=A.bus;if(!ac||!bus)return;
  const v=e.vel??0.7;
  switch(e.kind){
    case 'voice':playVoice(e.v,at,0);break;
    case 'piano':{const f=mtof(e.midi),len=Math.min(4,Math.max(1.4,(e.dur||1)*1.5));const g=ac.createGain(),lp=ac.createBiquadFilter();lp.type='lowpass';lp.frequency.value=Math.min(5000,f*6);g.connect(lp);lp.connect(bus);
      g.gain.setValueAtTime(0.0001,at);g.gain.exponentialRampToValueAtTime(0.16*v,at+0.006);g.gain.exponentialRampToValueAtTime(0.05*v,at+0.35);g.gain.exponentialRampToValueAtTime(0.0001,at+len);
      osc('triangle',f,at,at+len+0.05,g);const g2=ac.createGain();g2.gain.value=0.35;g2.connect(g);osc('sine',f*2,at,at+len+0.05,g2);break;}
    case 'box':{const f=mtof(e.midi),g=ac.createGain();g.connect(bus);g.gain.setValueAtTime(0.0001,at);g.gain.exponentialRampToValueAtTime(0.12*v,at+0.004);g.gain.exponentialRampToValueAtTime(0.0001,at+1.6);
      osc('sine',f,at,at+1.65,g);const g2=ac.createGain();g2.gain.value=0.15;g2.connect(g);osc('sine',f*4,at,at+1.65,g2);break;}
    case 'flute':{const f=mtof(e.midi),d=Math.max(0.2,e.dur||0.5),g=ac.createGain(),lp=ac.createBiquadFilter();lp.type='lowpass';lp.frequency.value=3200;g.connect(lp);lp.connect(bus);
      const peak=0.12*v;g.gain.setValueAtTime(0.0001,at);g.gain.exponentialRampToValueAtTime(peak,at+0.07);g.gain.linearRampToValueAtTime(peak*0.75,at+d*0.9);g.gain.exponentialRampToValueAtTime(0.0001,at+d+0.35);
      const o=osc('sine',f,at,at+d+0.4,g);const g2=ac.createGain();g2.gain.value=0.3;g2.connect(g);const o2=osc('triangle',f,at,at+d+0.4,g2);
      const lfo=ac.createOscillator();lfo.frequency.value=5.2;const lg=ac.createGain();lg.gain.setValueAtTime(0,at);lg.gain.linearRampToValueAtTime(f*0.006,at+Math.min(0.6,d));lfo.connect(lg);lg.connect(o.frequency);lg.connect(o2.frequency);lfo.start(at);lfo.stop(at+d+0.4);break;}
    case 'pad':case 'strings':{const str=e.kind==='strings',g=ac.createGain(),lp=ac.createBiquadFilter();lp.type='lowpass';lp.frequency.value=str?2200:950;lp.Q.value=0.4;lp.connect(g);g.connect(bus);
      const atk=Math.min(str?0.5:1.1,e.dur*0.4),end=at+e.dur,rel=1.4,peak=(str?0.03:0.026)*v;
      g.gain.setValueAtTime(0,at);g.gain.linearRampToValueAtTime(peak,at+atk);g.gain.setValueAtTime(peak,end);g.gain.linearRampToValueAtTime(0,end+rel);
      for(const m of e.notes){for(const dt of[-7,7]){const o=ac.createOscillator();o.type='sawtooth';o.frequency.value=mtof(m);o.detune.value=dt;o.connect(lp);o.start(at);o.stop(end+rel+0.05);}}break;}
    case 'bass':{const f=mtof(e.midi),d=Math.min(e.dur||1,1.5),g=ac.createGain(),lp=ac.createBiquadFilter();lp.type='lowpass';lp.frequency.value=700;g.connect(lp);lp.connect(bus);
      g.gain.setValueAtTime(0.0001,at);g.gain.exponentialRampToValueAtTime(0.22*v,at+0.01);g.gain.exponentialRampToValueAtTime(0.0001,at+d+0.3);osc('triangle',f,at,at+d+0.35,g);break;}
    case 'pluck':{const f=mtof(e.midi),g=ac.createGain();g.connect(bus);g.gain.setValueAtTime(0.0001,at);g.gain.exponentialRampToValueAtTime(0.1*v,at+0.004);g.gain.exponentialRampToValueAtTime(0.0001,at+0.35);osc('triangle',f,at,at+0.4,g);break;}
    case 'chime':{const f=mtof(e.midi);[[1,1],[2.76,0.4],[5.4,0.2]].forEach(([ra,am])=>{const g=ac.createGain();g.connect(bus);const len=2.2/Math.sqrt(ra);g.gain.setValueAtTime(0.0001,at);g.gain.exponentialRampToValueAtTime(0.06*v*am,at+0.003);g.gain.exponentialRampToValueAtTime(0.0001,at+len);osc('sine',f*ra,at,at+len+0.05,g);});break;}
    case 'tick':{const g=ac.createGain();g.connect(bus);const f0=e.hi?1760:1320;g.gain.setValueAtTime(0.0001,at);g.gain.exponentialRampToValueAtTime(0.05,at+0.004);g.gain.exponentialRampToValueAtTime(0.0001,at+0.16);const o=osc('sine',f0,at,at+0.2,g);o.frequency.exponentialRampToValueAtTime(f0*1.25,at+0.06);break;}
    case 'ring':{for(let k=0;k<2;k++){const st=at+k*0.42,g=ac.createGain(),lp=ac.createBiquadFilter();lp.type='lowpass';lp.frequency.value=220;g.connect(lp);lp.connect(bus);g.gain.setValueAtTime(0.0001,st);g.gain.exponentialRampToValueAtTime(0.09,st+0.02);g.gain.setValueAtTime(0.09,st+0.26);g.gain.exponentialRampToValueAtTime(0.0001,st+0.34);const o=osc('square',46,st,st+0.36,g);const m=ac.createOscillator();m.frequency.value=28;const mg=ac.createGain();mg.gain.value=18;m.connect(mg);mg.connect(o.frequency);m.start(st);m.stop(st+0.36);}break;}
    case 'bird':{const f0=e.f||2900;for(let k=0;k<2;k++){const st=at+k*0.15,o=ac.createOscillator();o.type='sine';o.frequency.setValueAtTime(f0,st);o.frequency.linearRampToValueAtTime(f0*1.3,st+0.05);o.frequency.linearRampToValueAtTime(f0*0.95,st+0.1);
      const g=ac.createGain();g.gain.setValueAtTime(0,st);g.gain.linearRampToValueAtTime(0.03,st+0.012);g.gain.linearRampToValueAtTime(0,st+0.11);o.connect(g);g.connect(bus);o.start(st);o.stop(st+0.12);}break;}
    case 'swell':{const src=ac.createBufferSource();src.buffer=A.white;src.loop=true;const bp=ac.createBiquadFilter();bp.type='bandpass';bp.Q.value=0.9;bp.frequency.setValueAtTime(300,at);bp.frequency.exponentialRampToValueAtTime(5000,at+e.dur);
      const g=ac.createGain();g.gain.setValueAtTime(0.0001,at);g.gain.exponentialRampToValueAtTime(0.18*v,at+e.dur*0.95);g.gain.linearRampToValueAtTime(0,at+e.dur+0.25);src.connect(bp);bp.connect(g);g.connect(bus);src.start(at);src.stop(at+e.dur+0.3);break;}
  }
}
function ambSet(t,tc){
  if(!A.ac)return;const now=A.ac.currentTime,L=ambience(t);
  A.amb.wind.g.gain.setTargetAtTime((L.wind||0)*0.32,now,tc);A.amb.wind.flt.frequency.setTargetAtTime(320+(L.wind||0)*1400+Math.sin(t*0.8)*160*(L.wind||0),now,0.4);
  A.amb.waves.g.gain.setTargetAtTime((L.waves||0)*0.5*(0.55+0.45*Math.sin(t*0.9)),now,tc);
  A.amb.room.g.gain.setTargetAtTime((L.room||0)*0.25,now,tc);
  A.amb.rain.g.gain.setTargetAtTime((L.rain||0)*0.16*(0.8+0.2*Math.sin(t*2.3)),now,tc);A.amb.crowd.g.gain.setTargetAtTime((L.crowd||0)*0.14*(0.7+0.3*Math.sin(t*0.6)),now,tc);
  A.amb.hum.g.gain.setTargetAtTime((L.hum||0)*0.12,now,tc);A.amb.hum.n.gain.setTargetAtTime((L.hum||0)*0.16,now,tc);
  if(A.bus)A.bus.gain.setTargetAtTime(voiceActive(t)?0.4:1,now,0.25);
}
function audioStop(){
  if(!A.ac)return;const now=A.ac.currentTime;
  if(A.bus){const b=A.bus;A.bus=null;b.gain.cancelScheduledValues(now);b.gain.setValueAtTime(b.gain.value,now);b.gain.linearRampToValueAtTime(0,now+0.12);setTimeout(()=>{try{b.disconnect();}catch(e){}},400);}
  for(const k of['wind','waves','room','rain','crowd'])A.amb[k].g.gain.setTargetAtTime(0,now,0.1);
  A.amb.hum.g.gain.setTargetAtTime(0,now,0.1);A.amb.hum.n.gain.setTargetAtTime(0,now,0.1);
  for(const s of A.vnSrc){try{s.stop();}catch(e){}}A.vnSrc=[];
}
function audioStart(t){
  if(!A.ac)return;audioStop();A.filmT=t;
  const b=A.ac.createGain();b.gain.value=1;b.connect(A.master);b.connect(A.rev);A.bus=b;
  A.next=0;while(A.next<EVENTS.length&&EVENTS[A.next].t<t)A.next++;
  const now=A.ac.currentTime+0.04;
  for(const e of EVENTS){if(e.t>=t)break;if((e.kind==='pad'||e.kind==='strings')&&e.t+e.dur>t+0.3)playEvent(Object.assign({},e,{dur:e.t+e.dur-t}),now);if(e.kind==='voice'&&e.t+e.v.dur>t+0.4)playVoice(e.v,now,t-e.t);}
  ambSet(t,0.3);
}
function audioTick(t){
  A.filmT=t;if(!A.ac||!A.bus)return;const now=A.ac.currentTime;
  while(A.next<EVENTS.length&&EVENTS[A.next].t<t+0.3){const e=EVENTS[A.next++];playEvent(e,now+Math.max(0.005,e.t-t));}
  ambSet(t,0.35);
}
