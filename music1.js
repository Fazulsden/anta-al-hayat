/* music1.js — the music and ambience of cut 3, scene by scene.
   scoreFor(id, ({add,T,at,hit,pad,melody,arp,bassline,me}) => …) · T(bar,beat) and at(sec) are film times inside the scene.
   ambFor(id, lt => ({wind,waves,room,hum})) with 0..1 levels. */
'use strict';
scoreFor('title',({add,T,at,hit,pad,melody,arp,bassline,me})=>{
  pad(T(0),'G',1.1,0.6);[79,83,86,91].forEach((m,k)=>add(T(0,0.5+k*0.7),'box',{midi:m,vel:0.5}));
  for(let b=0;b<4;b++){pad(T(b+1),THEME_CH[b],1.05,0.7);melody(b+1,b,'box',12,0.6);add(T(b+1),'piano',{midi:CH[THEME_CH[b]].b+12,dur:BAR,vel:0.3});}
  pad(T(5),'Dsus',1.0,0.8);
});
scoreFor('queue',({add,T,at,hit,pad,melody,arp,bassline,me})=>{
  for(let b=0;b<8;b++){const c=['G','Cmaj7','Em','D','G','Cmaj7','Dsus','G'][b];pad(T(b),c,1.05,0.6);arp(b,c,0.18,[0,2,3,4,5,4,3,2],0.5);if(b>=1&&b<=4)melody(b,b-1,'flute',0,0.65);if(b>=6)add(T(b),'strings',{notes:CH[c].p,dur:BAR*1.05,vel:0.5});}
  add(at(24.6),'chime',{midi:91,vel:0.5});
});
scoreFor('zip',({add,T,at,hit,pad,melody,arp,bassline,me})=>{
  for(let b=0;b<7;b++){const c=['G','D','Em','C','G','Cmaj7','Dsus'][b];pad(T(b),c,1.05,b<3?0.7:0.5);if(b<3){bassline(b,c,0.5);arp(b,c,0.3,[0,2,3,4,5,4,3,2],0.5);}else{melody(b,b-3,'piano',0,0.5);arp(b,c,0.16,[null,1,2,3],1);}}
  add(at(8.6),'swell',{dur:1.2,vel:0.5});add(at(22.6),'chime',{midi:96,vel:0.4});
});
scoreFor('van',({add,T,at,hit,pad,melody,arp,bassline,me})=>{
  for(let b=0;b<9;b++){const c=['Am','C','G','D','Am','C','G','D','Em'][b];pad(T(b),c,1.05,0.4);const p=CH[c].p,tones=[p[1]+12,p[2]+12,p[3]+12,p[1]+24];[0,null,1,2,null,1,3,null].forEach((ix,k)=>{if(ix!==null)add(T(b,k*0.5),'pluck',{midi:tones[ix],vel:0.5});});add(T(b),'bass',{midi:CH[c].b+12,dur:BEAT*1.5,vel:0.35});if(b>=3&&b<7)melody(b,b-3,'box',12,0.35);}
});
scoreFor('kalam',({add,T,at,hit,pad,melody,arp,bassline,me})=>{
  for(let b=0;b<5;b++){const c=['G','D','Em','C','G'][b];pad(T(b),c,1.05,0.55);arp(b,c,0.3,[0,2,3,4,5,4,3,2],0.5);bassline(b,c,0.45);}
  [0.6,2.6,8.9,9.3].forEach(t=>add(at(t),'chime',{midi:96+((t*7)|0)%5,vel:0.45}));
});
scoreFor('beach',({add,T,at,hit,pad,melody,arp,bassline,me})=>{
  for(let b=0;b<10;b++){const c=['Cmaj7','G','D','Em','Cmaj7','G','Am','D','Cmaj7','G'][b];pad(T(b),c,1.05,0.5);if(b<3||b>=8){arp(b,c,0.18,[0,1,2,3],1);}else{const p=CH[c].p;[0,2].forEach(k=>add(T(b,k),'pluck',{midi:p[2]+12,vel:0.35}));}}
  for(const m of BET)add(at(m.at),'tick',{hi:m.who==='her'});
});
scoreFor('letter',({add,T,at,hit,pad,melody,arp,bassline,me})=>{
  for(let b=0;b<11;b++){const c=['Em','Cmaj7','G','D','Em','Cmaj7','G','Dsus','Em','Cmaj7','G'][b];pad(T(b),c,1.05,0.5);if(b<4)add(T(b),'box',{midi:CH[c].p[3]+12,vel:0.3});if(b>=6&&b<8)melody(b,b-2,'piano',0,0.4);if(b>=8)arp(b,c,0.14,[null,1,2,3],1);}
  add(at(15.2),'tick',{});add(at(16),'swell',{dur:4,vel:0.6});add(at(17),'strings',{notes:CH.Cmaj7.p,dur:4.5,vel:0.7});
  add(at(21.9),'tick',{hi:true});add(at(23.6),'tick',{});add(at(25.0),'tick',{hi:true});
});
scoreFor('iba',({add,T,at,hit,pad,melody,arp,bassline,me})=>{
  for(let b=0;b<9;b++){const c=THEME_CH[b%8];pad(T(b),c,1.05,0.5);if(b<8)melody(b,b,'piano',0,0.5);bassline(b,c,0.4);const p=CH[c].p;[1,3].forEach(k=>add(T(b,k),'pluck',{midi:p[1]+12,vel:0.35}));}
  [1.2,1.5,5.3,9.8,10.1,14.6,20.2,20.5,25.1].forEach(t=>add(at(t),'bird',{f:2500+((t*977)%900)}));
});
scoreFor('voices',({add,T,at,hit,pad,melody,arp,bassline,me})=>{
  for(let b=0;b<10;b++){const c=['Em','Cmaj7','Em','Cmaj7','G','Dsus','Em','Cmaj7','G','G'][b];pad(T(b),c,1.05,b<3?0.5:0.3);if(b<3)add(T(b),'box',{midi:CH[c].p[3]+12,vel:0.25});}
  for(const v of VN28)add(at(v.at),'tick',{hi:true});
});
scoreFor('birthday',({add,T,at,hit,pad,melody,arp,bassline,me})=>{
  pad(T(0),'G',1.3,0.4);
  for(const m of BDAY)add(at(m.at),'tick',{hi:m.who==='her'});
  [91,95,98,103,107].forEach((m,k)=>add(at(4.2)+k*0.08,'chime',{midi:m,vel:0.6}));
  for(let b=2;b<13;b++){const c=['G','C','D','Em','C','G','D','Em','C','G','Dsus'][b-2];pad(T(b),c,1.05,0.5);arp(b,c,0.24,[0,2,3,4,5,4,3,2],0.5);if(b>=5&&b<11)melody(b,(b-5)%8,'box',12,0.45);if(b>=11)add(T(b),'strings',{notes:CH[c].p,dur:BAR*1.05,vel:0.45});}
});
scoreFor('tenth',({add,T,at,hit,pad,melody,arp,bassline,me})=>{
  for(let b=0;b<7;b++){const c=['Em','C','G','D','Em','C','Dsus'][b];pad(T(b),c,1.05,b<3?0.45:0.5);arp(b,c,0.15,[null,1,2,3],1);}
  for(const m of TENTH_B)add(at(m.at),'tick',{hi:m.who==='her'});
  for(const e of TENTH_C)add(at(e.at),e.kind==='call'?'ring':'tick',{hi:true});
});
scoreFor('spring',({add,T,at,hit,pad,melody,arp,bassline,me})=>{
  for(let b=0;b<20;b++){const c=THEME_CH[b%8];add(T(b),'strings',{notes:CH[c].p,dur:BAR*1.02,vel:0.75});melody(b,b%8,'piano',0,0.5);bassline(b,c,0.5);arp(b,c,0.2,[0,2,3,4,5,4,3,2],0.5);if(b>=4&&b<12||b>=16)melody(b,b%8,'flute',12,0.6);}
});
scoreFor('majestic',({add,T,at,hit,pad,melody,arp,bassline,me})=>{
  for(let b=0;b<7;b++){const c=['Gmaj7','Em','Cmaj7','D','Gmaj7','Em','Dsus'][b];pad(T(b),c,1.05,0.55);add(T(b),'piano',{midi:CH[c].b+12,dur:BAR,vel:0.35});arp(b,c,0.18,[null,1,2,3],1);if(b<4)melody(b,b+4,'piano',0,0.4);}
});
scoreFor('end',({add,T,at,hit,pad,melody,arp,bassline,me})=>{
  for(let b=0;b<4;b++){const c=THEME_CH[b+4];pad(T(b),c,1.05,0.5);melody(b,b+4,'box',12,0.5);add(T(b),'piano',{midi:CH[c].b+12,dur:BAR,vel:0.3});}
  add(T(4),'pad',{notes:[43,55,59,62,67],dur:BAR*2.9,vel:0.5});[79,83,86,91].forEach((m,k)=>add(T(4,k*0.5),'box',{midi:m,vel:0.5}));add(T(6,1),'chime',{midi:103,vel:0.35});
});

/* ambience: wind · waves · room · hum (the van, the car) */
ambFor('title',lt=>({wind:0.5}));
ambFor('queue',lt=>({wind:0.55}));
ambFor('zip',lt=>({wind:lt<10?1.0:0.3}));
ambFor('van',lt=>({hum:0.85,wind:0.08}));
ambFor('kalam',lt=>({wind:0.7}));
ambFor('beach',lt=>({waves:lt<9||lt>27.4?0.85:0.25}));
ambFor('letter',lt=>({room:0.25}));
ambFor('iba',lt=>({wind:0.1,room:0.15}));
ambFor('voices',lt=>({room:0.2}));
ambFor('birthday',lt=>({room:0.15}));
ambFor('tenth',lt=>({room:0.3}));
ambFor('spring',lt=>({wind:0.25}));
ambFor('majestic',lt=>({room:0.3,hum:lt>=13?0.5:0}));
ambFor('end',lt=>({wind:0.4}));
