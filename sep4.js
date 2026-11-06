/* sep4.js — the closing scenes after "What should I let go?": "Who would", "Hamein tou", "Worthy of love", "The first time, for both of us" and "Eik hi iltija" (see notes/AUTHORING.md).
   Straight after `nothurt` (sep3.js), before the end card: the same dark room and the same pool of light on her.
   `worthy`: the gist of a piece she liked, three short cards with her softly behind them; then his own words, one
   at a time, big on a dark band across the frame; her name with the Arabic of the title small above it; the last
   line held, then the band goes, she is there for a moment in the light, and the room fades to black.
   `iltija`: his words as large cards, one at a time, her behind them; the one request bigger; the last held; then
   her face in the light for two seconds, and black. */
'use strict';

/* ================================================================================================
   Worthy of love
   ================================================================================================ */
/* the gist of a piece she liked (paraphrased), three short cards, one at a time */
const S4_PIECE=[
  {at:1.6, until:10.8,size:46,y:218,text:'Women are taught to lower their expectations: don’t ask for too much, don’t have standards that make you seem difficult. Then they are praised for being easy to manage.'},
  {at:11.3,until:18.7,size:48,text:'So much of it is about becoming acceptable to a man. Shrinking her needs, her preferences, her personality, to keep him comfortable.'},
  {at:19.2,until:27.2,size:48,text:'Having standards is not being difficult. A woman should never have to make herself smaller, quieter, or easier to control, to be worthy of love.'},
];
/* his words, big and centred on the band; the fourth the biggest, the title's Arabic small above it */
const S4_HIS=[
  {at:28.0,until:33.8,size:60,text:'I know that. Jinse pyar karte hain, unke saamne shartein nahi lagate.'},
  {at:34.2,until:38.6,size:64,text:'Jinse pyar karte hain, unhe majboor nahi karte.'},
  {at:39.0,until:43.4,size:64,text:'Jinse pyar karte hain, unse roothte nahi hain.'},
  {at:43.9,until:50.3,size:78,text:'Tum meri zindagi ho, Fabeha Adnan Chughtai.',arabic:'أنتَ الحياة'},
  {at:50.8,until:55.4,size:56,text:'Aur mein apne aap ko tab tak mitaata jaaoga, jab tak mein aapke qaabil nahi ban jaata.'},
];
const S4_T={dimIn:1.0,dimOut:55.7,name:44.5};   /* the veil over the room (in with the first card, out before the fade), the chime on her name */

/* the room of `nothurt`, the same light, the slowest push-in; her listening in the middle of it (o = her expression) */
function s4_room(ctx,lt,A,z,o){
  ctx.save();ctx.translate(640,390);ctx.scale(z,z);ctx.translate(-640,-390);
  ctx.drawImage(A.room,0,0);
  s3_doorLight(ctx,lt,0.4);
  ctx.fillStyle='rgba(255,214,170,.06)';ctx.fillRect(0,0,W,H);
  glow(ctx,640,380,760,'#ffc090',0.11);
  s3_her(ctx,lt,A,Object.assign({light:1.15,look:0.04*Math.sin(lt*0.45),tilt:0.04*Math.sin(lt*0.3)+0.03},o));
  ctx.restore();
}
/* the cards, high in the frame so her face stays below them; each in over 0.8 s, out over 0.7 s */
function s4_cards(ctx,list,lt){
  for(const c of list){const a=smooth(c.at-0.2,c.at+0.8,lt)*(1-smooth(c.until-0.5,c.until+0.2,lt));
    s3_big(ctx,c.text,a,{y:c.y??230,size:c.size,lhm:1.28,maxW:980,label:c.label});}
}
/* a line of his on a dark band across the frame, feathered top and bottom; a = presence 0..1 */
function s4_band(ctx,text,a,o={}){
  if(a<=0)return;
  const cy=o.y??336,size=o.size??60,lh=Math.round(size*1.18),maxW=o.maxW??1040,rise=(1-a)*10,F=44;
  ctx.save();
  ctx.font=`600 ${size}px "Cormorant Garamond",serif`;
  let mw=maxW,lines=wrapText(ctx,text,mw);
  if(lines.length>1)while(mw>400){const t=wrapText(ctx,text,mw-20);if(t.length>lines.length)break;mw-=20;lines=t;}
  const th=lines.length*lh,arH=o.arabic?Math.round(size*0.78):0,top=cy-th/2-arH-30,bot=cy+th/2+30,hh=bot-top+2*F;
  ctx.globalAlpha=a;
  ctx.fillStyle=vgrad(ctx,top-F,bot+F,[[0,'rgba(3,3,7,0)'],[F/hh,'rgba(3,3,7,.8)'],[1-F/hh,'rgba(3,3,7,.8)'],[1,'rgba(3,3,7,0)']]);
  ctx.fillRect(0,top-F,W,hh);
  ctx.textAlign='center';
  if(o.arabic){ctx.textBaseline='alphabetic';ctx.font=`400 ${Math.round(size*0.4)}px "Noto Nastaliq Urdu",serif`;ctx.fillStyle='#ffd3a6';ctx.shadowColor='rgba(255,186,140,.45)';ctx.shadowBlur=14;ctx.fillText(o.arabic,640,cy-th/2-20+rise);}
  ctx.textBaseline='middle';ctx.font=`600 ${size}px "Cormorant Garamond",serif`;
  ctx.shadowColor=o.gold?'rgba(255,196,90,.6)':'rgba(255,186,140,.45)';ctx.shadowBlur=o.gold?26:20;ctx.fillStyle=o.gold?'#f3c66a':'#fff4e6';
  for(let k=0;k<lines.length;k++)ctx.fillText(lines[k],640,cy-th/2+lh/2+k*lh+rise);
  ctx.restore();
}

scene({id:'worthy',name:'Worthy of love',when:'2026-09-06T23:49',bars:18,fin:['#000000',1.4],fout:['#000000',2.2],
  note:'the same room and the same light on her, a veil over it; the gist of a piece she liked, three short cards one at a time with Fabeha softly behind them — expectations lowered and then praised, shrinking herself to keep a man comfortable, standards are not difficulty and no one should have to be smaller to be worthy of love; then his own words on a dark band across the frame, one at a time, bigger each time: I know that; jinse pyar karte hain, unke saamne shartein nahi lagate; unhe majboor nahi karte; unse roothte nahi hain; her name, the biggest, the title’s Arabic small above it and a chime; the last line held; then the band goes, she is there for a moment in the full light, and the room fades to black. Her theme on the piano, the strings rising under it.',
  tag:'“Tum meri zindagi ho.”',
  prep(){return{room:s3_room(),vig:s3_vignette()};},
  draw(ctx,lt,A){
    const Tt=S4_T;
    const dim=0.46*smooth(Tt.dimIn,Tt.dimIn+1.0,lt)*(1-smooth(Tt.dimOut,Tt.dimOut+0.9,lt));
    /* her: listening; the smile arrives with his words, the blush with her name, the brow lifts a little at the last line */
    const his=smooth(27.8,32.2,lt),name=smooth(Tt.name-0.3,Tt.name+2.2,lt),last=smooth(51.0,54.0,lt),after=smooth(55.6,57.0,lt);
    s4_room(ctx,lt,A,1+0.03*smooth(0,58,lt),{smile:lerp(lerp(0.28,0.4,his),lerp(0.46,0.52,after),name),brow:lerp(0.02,0.1,last)*(1-after*0.5),
      tilt:0.04*Math.sin(lt*0.3)+0.03+0.02*name,blush:lerp(0.3,0.46,name),seed:913});
    if(dim>0){ctx.fillStyle=`rgba(3,3,7,${dim.toFixed(3)})`;ctx.fillRect(0,0,W,H);}
    s4_cards(ctx,S4_PIECE,lt);
    for(const c of S4_HIS){const a=smooth(c.at-0.2,c.at+0.8,lt)*(1-smooth(c.until-0.5,c.until+0.3,lt));
      s4_band(ctx,c.text,a,{y:336,size:c.size,arabic:c.arabic});}
  },
  subs:[
    ...S4_PIECE.map(c=>[c.at+0.2,c.until-0.6,c.text]),
    ...S4_HIS.map(c=>[c.at+0.2,c.until-0.6,c.text]),
  ],
  score({add,T,at,hit,pad,melody,THEME_B,THEME_B_CH}){
    /* part one (bars 0–8): a pad under the cards, one piano note as each card arrives and a few passing ones;
       part two (bars 9–16): her theme whole on the piano, the strings rising under it, the low strings doubling its second half;
       a chime on her name; an Em to close */
    const ch=['Em','Cmaj7','Am7','Dsus','Em7','Cmaj7','Am7','G','Em'];
    for(let b=0;b<9;b++)pad(T(b),ch[b],1.05,b<8?0.16:0.18,'pad');
    [[1.8,64,0.2],[6.0,67,0.15],[11.5,62,0.2],[15.4,64,0.15],[19.4,59,0.2],[23.6,62,0.15]].forEach(([t,m,v])=>add(at(t),'piano',{midi:m,dur:3.2,vel:v}));
    for(let i=0;i<8;i++){const b=9+i;
      pad(T(b),THEME_B_CH[i],1.05,0.18+0.14*i/7,'strings');
      melody(b,i,'piano',0,0.3+0.06*i/7,THEME_B);
      if(i>=4){let beat=0;for(const[m,d]of THEME_B[i]){if(d>=2)add(T(b,beat),'strings',{notes:[m-12],dur:d*BEAT,vel:0.14});beat+=d;}}
    }
    hit(S4_T.name,'chime',{midi:95,vel:0.4});hit(S4_T.name+0.55,'chime',{midi:100,vel:0.26});
    pad(T(17),'Em',1.4,0.26,'strings');add(T(17),'piano',{midi:52,dur:4,vel:0.24});add(T(17),'piano',{midi:64,dur:4,vel:0.2});add(T(17,2),'piano',{midi:71,dur:3,vel:0.16});
  },
  amb(){return{room:0.14};},
});

/* ================================================================================================
   Eik hi iltija — his words as cards, her behind them; the one request bigger; the last held
   ================================================================================================ */
const S4_ILTIJA=[
  {at:1.6, until:7.8, size:50,text:'I was fixing myself. Being careful, in the full midst of it, to not hurt you.'},
  {at:8.3, until:16.9,size:46,text:'No one can make you hurt. Not even me. If I did, then I had told you: I would leave.'},
  {at:17.4,until:26.8,size:46,text:'But my love, if you were in front of me that day, nothing would have caused you hurt. Nothing would have happened in the first place.'},
  {at:27.3,until:34.9,size:48,text:'My love for you is PAAK. And I would only want one thing: us getting married, and us figuring out everything, together.'},
  {at:35.4,until:43.4,size:56,text:'Eik hi iltija hai: don’t cry, and don’t hurt yourself. Be happy that we shared itna kuch.'},
  {at:43.9,until:54.5,size:44,text:'And InshaAllah, if you agree to marriage, with the help of ALLAH SWT we will make it happen, like partners. Unke saamne tou kya cheez impossible hai? Kuch bhi nahi.'},
  {at:55.0,until:63.6,size:52,text:'Aur meri har dua aapki khair, aur aapse shaadi ke liye hoti hai.'},
];
const S4_IT={dimIn:1.0,dimOut:63.8,chime:35.9};   /* the veil; the chime on “iltija” */
scene({id:'iltija',name:'Eik hi iltija',when:'2026-09-06T23:50',bars:21,fin:['#000000',1.4],fout:['#000000',2.6],
  note:'the same room and light; his words as large cards one at a time, Fabeha softly behind them — he was fixing himself, careful not to hurt her; he could not hurt her, or he would have left at the start; had she been in front of him that day nothing would have happened; his love was paak and he wanted one thing, marriage, arranged by him; then, bigger, the one iltija: don’t cry, don’t hurt yourself, be happy that we shared itna kuch; if she agrees, with the help of ALLAH SWT he will make it happen; the last line held: every dua of his is for her khair and for marrying her. The veil lifts, her face in the light for two seconds, then black. Her theme carried on from the scene before, piano and strings, soft; a chime on the iltija.',
  tag:'“Eik hi iltija hai.”',
  prep(){return{room:s3_room(),vig:s3_vignette()};},
  draw(ctx,lt,A){
    const Tt=S4_IT;
    const dim=0.46*smooth(Tt.dimIn,Tt.dimIn+1.0,lt)*(1-smooth(Tt.dimOut,Tt.dimOut+0.9,lt));
    /* her: listening; a little warmer at “my love”, the blush and a lifted brow at the iltija, the smile settling for the last line, fuller once the veil lifts */
    const love=smooth(17.6,21,lt),plea=smooth(35.6,38.4,lt),last=smooth(55.2,58,lt),after=smooth(63.8,65.2,lt);
    s4_room(ctx,lt,A,1+0.03*smooth(0,66,lt),{smile:lerp(lerp(0.28,0.38,love),lerp(0.44,0.52,after),last),brow:lerp(0.02,0.1,plea)*(1-0.6*after),
      tilt:0.04*Math.sin(lt*0.3)+0.03+0.02*plea,blush:lerp(0.3,0.44,plea),seed:917});
    if(dim>0){ctx.fillStyle=`rgba(3,3,7,${dim.toFixed(3)})`;ctx.fillRect(0,0,W,H);}
    s4_cards(ctx,S4_ILTIJA,lt);
  },
  subs:S4_ILTIJA.map(c=>[c.at+0.2,c.until-0.6,c.text]),
  score({add,T,at,hit,pad,melody,THEME_B,THEME_B_CH}){
    /* her theme carried on: bars 0–7 on the piano over soft strings; bars 8–11 strings alone with a few piano notes (the chime on the iltija sits here);
       bars 12–19 the theme again, the strings rising a little and the low strings doubling its second half; an Em to close */
    for(let i=0;i<8;i++){pad(T(i),THEME_B_CH[i],1.05,0.2,'strings');melody(i,i,'piano',0,0.26,THEME_B);}
    ['Em','Cmaj7','Am7','Dsus'].forEach((c,k)=>pad(T(8+k),c,1.05,0.18,'strings'));
    [[27.5,64],[30.4,62],[33.6,59],[36.6,64],[40.0,67]].forEach(([t,m])=>add(at(t),'piano',{midi:m,dur:3,vel:0.18}));
    hit(S4_IT.chime,'chime',{midi:95,vel:0.38});
    for(let i=0;i<8;i++){const b=12+i;
      pad(T(b),THEME_B_CH[i],1.05,0.2+0.1*i/7,'strings');
      melody(b,i,'piano',0,0.28+0.04*i/7,THEME_B);
      if(i>=4){let beat=0;for(const[m,d]of THEME_B[i]){if(d>=2)add(T(b,beat),'strings',{notes:[m-12],dur:d*BEAT,vel:0.13});beat+=d;}}
    }
    pad(T(20),'Em',1.3,0.24,'strings');add(T(20),'piano',{midi:52,dur:4,vel:0.22});add(T(20),'piano',{midi:64,dur:4,vel:0.18});add(T(20,2),'piano',{midi:71,dur:3,vel:0.14});
  },
  amb(){return{room:0.14};},
});


/* ---------- Who would — his questions, in gold, between “What should I let go?” and “Please don’t be” ---------- */
const S4_WHO=[
  {at:1.4, until:7.6, size:58,text:'Who would tell me the meanings of the dreams I have?'},
  {at:8.0, until:13.6,size:58,text:'Who would tell me what skincare to use?'},
  {at:14.0,until:22.0,size:54,text:'Who would get me mutton raan, their second-best dish, the first time I come to visit their house?'},
  {at:22.4,until:29.6,size:56,text:'Who would rant to me about their whole day, and their masle, and I would listen?'},
  {at:30.0,until:36.0,size:60,text:'Who would look at me with those eyes full of love?'},
  {at:36.4,until:42.4,size:60,text:'Who would I look at, with eyes full of love?'},
  {at:42.8,until:48.2,size:60,text:'Who would I travel the world with?'},
  {at:48.6,until:54.2,size:60,text:'Who would I see the aurora lights with?'},
  {at:55.0,until:62.6,size:54,text:'And how the perfume was on her, when we met, on 29 August.'},
];
scene({id:'whowould',name:'Who would',when:'2026-09-06T23:47:30',bars:20,fin:['#000000',1.4],fout:['#000000',1.6],
  note:'the same room and light, Fabeha softly behind a dark band; his questions in gold, one at a time: the dreams, the skincare, the mutton raan, the rants, the eyes, the world, the aurora; and the perfume on her, 29 August.',
  tag:'“Who would I see the aurora lights with?”',
  prep(){return{room:s3_room(),vig:s3_vignette()};},
  draw(ctx,lt,A){
    const dim=0.4*smooth(0.8,1.8,lt)*(1-smooth(63.2,64.4,lt));
    s4_room(ctx,lt,A,1+0.03*smooth(0,66,lt),{smile:0.3+0.12*smooth(28,34,lt),brow:0.03,tilt:0.04*Math.sin(lt*0.3)+0.02,blush:0.34,seed:931});
    if(dim>0){ctx.fillStyle=`rgba(3,3,7,${dim.toFixed(3)})`;ctx.fillRect(0,0,W,H);}
    for(const c of S4_WHO){const a=smooth(c.at-0.2,c.at+0.7,lt)*(1-smooth(c.until-0.6,c.until+0.1,lt));s4_band(ctx,c.text,a,{size:c.size,gold:true,y:330});}
  },
  subs:S4_WHO.map(c=>[c.at+0.2,c.until-0.6,c.text]),
  score({add,T,at,hit,pad,melody,THEME_B,THEME_B_CH}){
    for(let i=0;i<8;i++){pad(T(i),THEME_B_CH[i],1.05,0.2,'strings');if(i>=2)melody(i,i,'piano',0,0.22,THEME_B);}
    for(let i=0;i<8;i++){const b=8+i;pad(T(b),THEME_B_CH[i],1.05,0.22+0.08*i/7,'strings');melody(b,i,'piano',0,0.26,THEME_B);}
    for(let b=16;b<20;b++)pad(T(b),['Em','Cmaj7','G','Em'][b-16],1.05,0.22,'strings');
    for(const c of S4_WHO)hit(c.at+0.3,'chime',{midi:[88,91,95,91,98,95,100,103,91][S4_WHO.indexOf(c)],vel:0.22});
  },
  amb(){return{room:0.14};},
});


/* ================================================================================================
   Hamein tou — the plans they had made, in gold, a small painted vignette above each;
   between “Who would” and the trust scene
   ================================================================================================ */
const S4_HAMEIN=[
  {at:1.8, until:11.4,size:54,text:'Hamein K2 base camp bhi jaana tha.\nK2 top, I said. Locally, and the real one.'},
  {at:11.9,until:20.9,size:56,text:'Hamein tou trips bhi maarni thi.\nEvery weekend, from Islamabad, you said.'},
  {at:21.4,until:30.4,size:56,text:'Poori duniya dekhni thi. Ireland. Dubai.\nThe aurora, your dream trip.'},
  {at:31.0,until:40.4,size:52,text:'Aur QF se orphan bachon ki funding bhi tou karni thi.\nHamein. Saath.'},
  {at:41.2,until:47.4,size:76,text:'Ap bhool gayi?'},
];
/* the vignettes: which painting, when (the globe gives way to the aurora inside the third line) */
const S4_HAMEIN_VIG=[{k:'peak',at:1.2,until:11.6},{k:'road',at:11.5,until:21.1},{k:'globe',at:21.0,until:26.4},{k:'aurora',at:25.9,until:30.6},{k:'hand',at:30.6,until:40.5}];
const S4_HT={dimIn:0.8,dimOut:47.6};
const S4_VW=540,S4_VH=230,S4_VX=370,S4_VY=24;   /* the vignette’s size and place: centred, above the band */

/* a soft-edged mask: a rounded rectangle feathered over 54 px (drawn 'lighter' so the alphas add up to 1 in the middle) */
function s4_vigMask(){const c=mk(S4_VW,S4_VH),g=c.getContext('2d'),N=28;
  g.globalCompositeOperation='lighter';g.fillStyle=`rgba(0,0,0,${(1/N).toFixed(4)})`;
  for(let k=0;k<N;k++){const i=56-k*2;rrect(g,i,i,S4_VW-2*i,S4_VH-2*i,Math.max(10,48-k));g.fill();}
  return c;}
function s4_vigDone(c,mask){const g=c.getContext('2d');g.globalCompositeOperation='destination-in';g.drawImage(mask,0,0);g.globalCompositeOperation='source-over';return c;}
/* a painted blob: a closed curve through the points */
function s4_blob(g,P){const n=P.length,mid=i=>{const a=P[i%n],b=P[(i+1)%n];return[(a[0]+b[0])/2,(a[1]+b[1])/2];};
  g.beginPath();let m=mid(0);g.moveTo(m[0],m[1]);for(let i=1;i<=n;i++){const p=P[i%n];m=mid(i);g.quadraticCurveTo(p[0],p[1],m[0],m[1]);}g.closePath();g.fill();}

/* K2 before dawn: the pyramid, its left face in shadow, its right face catching the first light, a plume off the summit, a near ridge */
function s4_vigPeak(mask){const c=mk(S4_VW,S4_VH),g=c.getContext('2d'),W2=S4_VW,H2=S4_VH,r=rng(1401);
  g.fillStyle=vgrad(g,0,H2,[[0,'#070c22'],[0.45,'#1d2352'],[0.8,'#6b5b88'],[1,'#d39c90']]);g.fillRect(0,0,W2,H2);
  for(let i=0;i<70;i++){const x=r()*W2,y=r()*H2*0.55,s=0.5+r()*1.3;g.fillStyle=`rgba(255,250,235,${(0.3+r()*0.6).toFixed(2)})`;g.fillRect(x,y,s,s);}
  glow(g,250,214,280,'#f2a88a',0.3);
  const f=ridge(1402,3,0.012);g.fillStyle='#3a3862';g.beginPath();g.moveTo(0,H2);for(let x=0;x<=W2;x+=4)g.lineTo(x,170-Math.abs(f(x))*26);g.lineTo(W2,H2);g.closePath();g.fill();
  const ax=312,ay=48;
  g.fillStyle=vgrad(g,ay,H2,[[0,'#8e8cbc'],[0.5,'#4c4d80'],[1,'#2a2c50']]);g.beginPath();g.moveTo(92,H2);g.lineTo(150,166);g.lineTo(214,110);g.lineTo(262,72);g.lineTo(ax,ay);g.lineTo(ax+6,H2);g.closePath();g.fill();
  g.fillStyle=vgrad(g,ay,H2,[[0,'#fff7f4'],[0.45,'#ead8e0'],[1,'#b9a3c0']]);g.beginPath();g.moveTo(ax,ay);g.lineTo(362,92);g.lineTo(406,124);g.lineTo(448,172);g.lineTo(524,H2);g.lineTo(ax-4,H2);g.closePath();g.fill();
  g.lineCap='round';
  for(let i=0;i<90;i++){const s=r()<0.5?-1:1,t=0.08+r()*0.85,x=ax+s*t*(s<0?162:134),y=ay+t*135+6+r()*Math.max(4,(H2-ay-t*135)*0.5),l=5+r()*20;
    g.strokeStyle=s<0?'rgba(30,28,58,.6)':'rgba(70,60,95,.5)';g.lineWidth=0.8+r()*1.5;g.globalAlpha=0.3+r()*0.5;g.beginPath();g.moveTo(x,y);g.lineTo(x+s*(2+r()*5),y+l);g.stroke();}
  g.globalAlpha=1;
  g.strokeStyle='rgba(255,242,236,.75)';g.lineWidth=2;g.beginPath();g.moveTo(150,166);g.lineTo(214,110);g.lineTo(262,72);g.lineTo(ax,ay);g.stroke();
  g.save();g.globalCompositeOperation='screen';for(let i=0;i<6;i++){g.fillStyle=`rgba(255,246,246,${(0.14-0.016*i).toFixed(3)})`;ell(g,ax+28+i*20,ay+4+i*2,30+i*7,7+i*2,0.22);g.fill();}g.restore();
  const f2=ridge(1403,3,0.02);g.fillStyle='#141830';g.beginPath();g.moveTo(0,H2);for(let x=0;x<=W2;x+=4)g.lineTo(x,214-Math.abs(f2(x))*22);g.lineTo(W2,H2);g.closePath();g.fill();
  return s4_vigDone(c,mask);}

/* the road out of Islamabad on a weekend morning: the Margalla hills blue in the haze, fields, the dashed line running to the sun */
function s4_vigRoad(mask){const c=mk(S4_VW,S4_VH),g=c.getContext('2d'),W2=S4_VW,H2=S4_VH,r=rng(1411);
  g.fillStyle=vgrad(g,0,H2,[[0,'#2c2e60'],[0.38,'#9b6c80'],[0.6,'#f0b67c'],[0.66,'#f7d8a0'],[1,'#c9aa7c']]);g.fillRect(0,0,W2,H2);
  sunGlow(g,300,146,130,'rgba(255,220,160,0.75)');
  const f=ridge(1412,3,0.012);g.fillStyle='#6f6c9c';g.beginPath();g.moveTo(0,H2);for(let x=0;x<=W2;x+=4)g.lineTo(x,136-Math.abs(f(x))*36);g.lineTo(W2,H2);g.closePath();g.fill();
  const f2=ridge(1413,3,0.02);g.fillStyle='#4c4b78';g.beginPath();g.moveTo(0,H2);for(let x=0;x<=W2;x+=4)g.lineTo(x,150-Math.abs(f2(x))*16);g.lineTo(W2,H2);g.closePath();g.fill();
  g.fillStyle=vgrad(g,148,H2,[[0,'#9a9460'],[1,'#44552e']]);g.fillRect(0,148,W2,H2-148);
  for(let i=0;i<110;i++){const y=150+Math.pow(r(),1.3)*(H2-150),x=r()*W2;g.globalAlpha=0.06+r()*0.12;g.fillStyle=r()<0.5?'#2d4a24':'#d2bc6e';ell(g,x,y,12+r()*50,1.5+(y-140)*(0.05+r()*0.08),0);g.fill();}g.globalAlpha=1;
  const vx=300,vy=149;
  g.fillStyle=vgrad(g,vy,H2,[[0,'#6c6674'],[1,'#3a3541']]);g.beginPath();g.moveTo(vx-2,vy);g.lineTo(vx+2,vy);g.lineTo(486,H2);g.lineTo(106,H2);g.closePath();g.fill();
  g.fillStyle='rgba(255,232,205,.07)';g.beginPath();g.moveTo(vx,vy);g.lineTo(392,H2);g.lineTo(336,H2);g.closePath();g.fill();g.beginPath();g.moveTo(vx,vy);g.lineTo(258,H2);g.lineTo(204,H2);g.closePath();g.fill();
  g.fillStyle='#f4df9c';for(let k=0;k<9;k++){const t0=Math.pow(0.78,k),t1=t0*0.9,y0=vy+(H2-vy)*t0,y1=vy+(H2-vy)*t1,w0=4.5*t0+0.4,w1=4.5*t1+0.4;g.globalAlpha=0.45+0.45*t0;g.beginPath();g.moveTo(vx-w0,y0);g.lineTo(vx+w0,y0);g.lineTo(vx+w1,y1);g.lineTo(vx-w1,y1);g.closePath();g.fill();}
  g.globalAlpha=1;g.strokeStyle='rgba(255,246,222,.32)';g.lineWidth=1.4;g.beginPath();g.moveTo(vx,vy);g.lineTo(106,H2);g.moveTo(vx,vy);g.lineTo(486,H2);g.stroke();
  for(const[x,y,s]of[[438,176,20],[478,196,28],[530,228,40],[128,180,18],[74,204,30],[20,236,40]])drawTreeClump(g,x,y,s,'#2b3b24','#637d3e',r);
  g.fillStyle=vgrad(g,vy-12,vy+64,[[0,'rgba(247,216,160,.62)'],[1,'rgba(247,216,160,0)']]);g.fillRect(0,vy-12,W2,76);
  return s4_vigDone(c,mask);}

/* the world: a globe turned to the Atlantic; home, Ireland, the Gulf and the north in gold, the routes between them in gold thread */
function s4_vigGlobe(mask){const c=mk(S4_VW,S4_VH),g=c.getContext('2d'),W2=S4_VW,H2=S4_VH,r=rng(1421);
  g.fillStyle=vgrad(g,0,H2,[[0,'#0a0c22'],[1,'#1b1532']]);g.fillRect(0,0,W2,H2);
  for(let i=0;i<60;i++){const x=r()*W2,y=r()*H2,s=0.5+r()*1.3;g.fillStyle=`rgba(255,250,235,${(0.25+r()*0.6).toFixed(2)})`;g.fillRect(x,y,s,s);}
  const cx=270,cy=120,R=90;
  glow(g,cx,cy,R*2.4,'#6ea8ff',0.2);
  const og=g.createRadialGradient(cx-R*0.42,cy-R*0.45,R*0.08,cx,cy,R);og.addColorStop(0,'#62a8dc');og.addColorStop(0.55,'#2c6cab');og.addColorStop(1,'#10335e');g.fillStyle=og;circle(g,cx,cy,R);g.fill();
  g.save();circle(g,cx,cy,R);g.clip();
  g.fillStyle='#7cae68';
  s4_blob(g,[[cx-36,cy-58],[cx-14,cy-74],[cx+14,cy-70],[cx+40,cy-56],[cx+30,cy-38],[cx+6,cy-32],[cx-14,cy-40],[cx-30,cy-44]]);   /* Europe */
  s4_blob(g,[[cx-30,cy-28],[cx+8,cy-32],[cx+34,cy-12],[cx+28,cy+26],[cx+10,cy+62],[cx-8,cy+68],[cx-22,cy+40],[cx-34,cy+4]]);     /* Africa */
  s4_blob(g,[[cx+36,cy-30],[cx+62,cy-28],[cx+70,cy-8],[cx+56,cy+8],[cx+40,cy-4]]);                                               /* Arabia */
  s4_blob(g,[[cx+44,cy-66],[cx+90,cy-70],[cx+96,cy-20],[cx+72,cy-34],[cx+56,cy-50]]);                                            /* Asia, off the edge */
  s4_blob(g,[[cx-96,cy-60],[cx-60,cy-72],[cx-56,cy-50],[cx-82,cy-40]]);                                                          /* Greenland’s edge */
  s4_blob(g,[[cx-96,cy+10],[cx-64,cy+6],[cx-58,cy+36],[cx-74,cy+70],[cx-96,cy+60]]);                                              /* South America’s edge */
  g.fillStyle='rgba(240,255,250,.75)';s4_blob(g,[[cx-60,cy-92],[cx+40,cy-96],[cx+70,cy-78],[cx-30,cy-74],[cx-70,cy-80]]);        /* the ice cap */
  const sh=g.createRadialGradient(cx-R*0.35,cy-R*0.4,R*0.2,cx,cy,R*1.05);sh.addColorStop(0,'rgba(255,255,255,.14)');sh.addColorStop(0.55,'rgba(255,255,255,0)');sh.addColorStop(1,'rgba(5,8,30,.72)');g.fillStyle=sh;g.fillRect(cx-R,cy-R,R*2,R*2);
  g.strokeStyle='rgba(255,255,255,.1)';g.lineWidth=1;for(let k=1;k<=2;k++){ell(g,cx,cy,k*R/3,R,0);g.stroke();ell(g,cx,cy,R,k*R/3,0);g.stroke();}
  g.restore();
  g.strokeStyle='rgba(200,225,255,.45)';g.lineWidth=1.5;circle(g,cx,cy,R);g.stroke();
  const home=[cx+74,cy-6],P=[[cx-24,cy-54],[cx+60,cy-10],[cx-6,cy-82]];
  g.strokeStyle='rgba(243,198,106,.8)';g.lineWidth=1.3;g.setLineDash([3,4]);
  for(const p of P){const d=Math.hypot(p[0]-home[0],p[1]-home[1]);g.beginPath();g.moveTo(home[0],home[1]);g.quadraticCurveTo((home[0]+p[0])/2,Math.min(home[1],p[1])-Math.max(12,d*0.4),p[0],p[1]);g.stroke();}
  g.setLineDash([]);
  for(const p of[home,...P]){glow(g,p[0],p[1],16,'#ffd27a',0.7);g.fillStyle='#ffe29a';circle(g,p[0],p[1],2.6);g.fill();}
  return s4_vigDone(c,mask);}

/* the aurora: a night sky painted once; the engine’s aurora drawn into it live; a snowfield and pines in front */
function s4_vigAuroraBase(){const c=mk(S4_VW,S4_VH),g=c.getContext('2d'),W2=S4_VW,H2=S4_VH,r=rng(1431);
  g.fillStyle=vgrad(g,0,H2,[[0,'#03071a'],[0.7,'#0a1a30'],[1,'#132a44']]);g.fillRect(0,0,W2,H2);
  for(let i=0;i<90;i++){const x=r()*W2,y=r()*H2*0.78,s=0.5+r()*1.4;g.fillStyle=`rgba(255,250,235,${(0.3+r()*0.6).toFixed(2)})`;g.fillRect(x,y,s,s);}
  glow(g,270,60,300,'#3fe39a',0.16);
  return c;}
function s4_vigAuroraFront(){const c=mk(S4_VW,S4_VH),g=c.getContext('2d'),W2=S4_VW,H2=S4_VH,r=rng(1432);
  const f=ridge(1433,3,0.015),gy=x=>190-Math.abs(f(x))*20;
  g.fillStyle=vgrad(g,168,H2,[[0,'#46608a'],[1,'#1a2640']]);g.beginPath();g.moveTo(0,H2);for(let x=0;x<=W2;x+=4)g.lineTo(x,gy(x));g.lineTo(W2,H2);g.closePath();g.fill();
  g.fillStyle='rgba(120,240,180,.1)';g.beginPath();g.moveTo(0,H2);for(let x=0;x<=W2;x+=4)g.lineTo(x,gy(x));g.lineTo(W2,H2);g.closePath();g.fill();
  for(let i=0;i<30;i++){const x=r()*W2;drawPine(g,x,gy(x)+6,16+r()*30,'#0a1020','#132038',null,r);}
  return c;}
function s4_vigAurora(A,lt){const g=A.scratch.getContext('2d');g.clearRect(0,0,S4_VW,S4_VH);g.drawImage(A.auroraBase,0,0);
  g.save();g.beginPath();g.rect(0,0,S4_VW,S4_VH);g.clip();g.translate(0,-14);g.scale(S4_VW/W,0.44);aurora(g,lt*0.7,1);g.restore();
  g.drawImage(A.auroraFront,0,0);
  g.globalCompositeOperation='destination-in';g.drawImage(A.mask,0,0);g.globalCompositeOperation='source-over';return A.scratch;}

/* a child’s hand, palm up, held out a little to the right, a coin in it; a small red jumper’s cuff below */
function s4_vigHand(mask){const c=mk(S4_VW,S4_VH),g=c.getContext('2d'),W2=S4_VW,H2=S4_VH;
  g.fillStyle=vgrad(g,0,H2,[[0,'#1b120f'],[1,'#3b2619']]);g.fillRect(0,0,W2,H2);
  glow(g,300,40,260,'#ffb870',0.32);
  const cx=270,cy=156,skin='#efbf98',shade='rgba(150,80,50,.28)',deep='rgba(120,60,40,.35)',edge='rgba(120,60,40,.3)';
  g.save();g.translate(cx,cy);g.rotate(0.3);g.scale(1.05,1.05);g.translate(-cx,-cy);
  /* the cuff */
  g.fillStyle='#b4433d';g.beginPath();g.moveTo(cx-56,H2+40);g.lineTo(cx-50,cy+50);g.quadraticCurveTo(cx,cy+64,cx+50,cy+50);g.lineTo(cx+56,H2+40);g.closePath();g.fill();
  g.strokeStyle='rgba(60,10,10,.25)';g.lineWidth=2;for(let k=-4;k<=4;k++){g.beginPath();g.moveTo(cx+k*11,cy+58);g.lineTo(cx+k*12,H2+40);g.stroke();}
  g.fillStyle='#c9524a';g.beginPath();g.moveTo(cx-50,cy+50);g.quadraticCurveTo(cx,cy+64,cx+50,cy+50);g.quadraticCurveTo(cx,cy+76,cx-50,cy+50);g.closePath();g.fill();
  /* the wrist, the palm */
  g.fillStyle=skin;rrect(g,cx-32,cy+18,64,44,16);g.fill();
  ell(g,cx,cy+2,56,50,0);g.fill();
  /* four fingers a little apart, curled toward us, and the thumb */
  const F=[[-0.66,54,10.5,36],[-0.24,58,11,40],[0.16,58,11,39],[0.54,54,10,33]];
  for(const[a,d,rx,ry]of F){const fx=cx+Math.sin(a)*d*1.05,fy=cy-Math.cos(a)*d*0.9;g.save();g.translate(fx,fy);g.rotate(a);
    g.fillStyle=skin;ell(g,0,-ry*0.25,rx,ry,0);g.fill();g.strokeStyle=edge;g.lineWidth=1.2;g.stroke();
    g.fillStyle=shade;ell(g,0,ry*0.3,rx*0.9,ry*0.4,0);g.fill();g.fillStyle='rgba(255,214,196,.45)';ell(g,0,-ry*0.8,rx*0.62,rx*0.55,0);g.fill();
    g.strokeStyle='rgba(140,70,45,.25)';g.lineWidth=1;g.beginPath();g.moveTo(-rx*0.6,-ry*0.2);g.quadraticCurveTo(0,-ry*0.1,rx*0.6,-ry*0.2);g.stroke();g.restore();}
  g.save();g.translate(cx-60,cy+12);g.rotate(-1.0);g.fillStyle=skin;ell(g,0,-6,14,30,0);g.fill();g.strokeStyle=edge;g.lineWidth=1.2;g.stroke();g.fillStyle=shade;ell(g,0,10,12,14,0);g.fill();g.restore();
  /* the palm’s hollow and its creases */
  g.fillStyle=deep;ell(g,cx+2,cy+10,34,22,0);g.fill();
  g.strokeStyle='rgba(140,70,45,.3)';g.lineWidth=1.6;g.beginPath();g.moveTo(cx-38,cy+8);g.quadraticCurveTo(cx-10,cy+30,cx+28,cy+36);g.moveTo(cx-42,cy-6);g.quadraticCurveTo(cx-8,cy+4,cx+36,cy+18);g.stroke();
  /* the coin */
  const kx=cx+4,ky=cy-2;glow(g,kx,ky,70,'#ffd27a',0.38);
  g.fillStyle='#a8741c';ell(g,kx,ky+4,29,21,0);g.fill();
  const cg=g.createRadialGradient(kx-12,ky-10,2,kx,ky,32);cg.addColorStop(0,'#fff0b0');cg.addColorStop(0.4,'#f3c95a');cg.addColorStop(1,'#c9962c');g.fillStyle=cg;ell(g,kx,ky,29,21,0);g.fill();
  g.strokeStyle='rgba(170,120,40,.6)';g.lineWidth=1.4;ell(g,kx,ky,22,15,0);g.stroke();
  g.fillStyle='rgba(190,140,50,.55)';ell(g,kx+4,ky,6.5,8.5,0);g.fill();g.fillStyle=cg;ell(g,kx+7,ky-1,5.5,7.5,0);g.fill();
  g.fillStyle='rgba(255,255,255,.9)';for(const[sx,sy,s]of[[kx-17,ky-13,5],[kx+20,ky+9,3]]){g.beginPath();g.moveTo(sx,sy-s);g.quadraticCurveTo(sx,sy,sx+s,sy);g.quadraticCurveTo(sx,sy,sx,sy+s);g.quadraticCurveTo(sx,sy,sx-s,sy);g.quadraticCurveTo(sx,sy,sx,sy-s);g.closePath();g.fill();}
  g.restore();
  return s4_vigDone(c,mask);}

/* a vignette above the band: in with its line, a slow push-in while it is there */
function s4_vig(ctx,img,a,lt,t0){if(a<=0)return;const z=1+0.03*clamp((lt-t0)/10,0,1),w=S4_VW*z,h=S4_VH*z;
  ctx.save();ctx.globalAlpha=a;ctx.drawImage(img,S4_VX+S4_VW/2-w/2,S4_VY+S4_VH/2-h/2+(1-a)*8,w,h);ctx.restore();}

scene({id:'hamein',name:'Hamein tou',when:'2026-09-06T23:47:40',bars:15,fin:['#000000',1.4],fout:['#000000',1.6],
  note:'the same room and light, Fabeha softly behind the dark band; the plans they had made, one at a time in gold, a small painted vignette above each: K2 before dawn (base camp, no — the top, locally and the real one), the road out of Islamabad (trips every weekend, she said), a globe with Ireland, Dubai and the north in gold thread, the green aurora over a snowfield (her dream trip), a child’s hand with a coin in it (the orphan children they were going to fund through quant finance, together); then, held alone over her: Ap bhool gayi? The veil lifts, her face in the light, black. Her theme on the music box over soft strings, a chime on each plan, one low piano chord under the question.',
  tag:'“Ap bhool gayi?”',
  prep(){const mask=s4_vigMask();return{room:s3_room(),vig:s3_vignette(),mask,scratch:mk(S4_VW,S4_VH),
    peak:s4_vigPeak(mask),road:s4_vigRoad(mask),globe:s4_vigGlobe(mask),hand:s4_vigHand(mask),auroraBase:s4_vigAuroraBase(),auroraFront:s4_vigAuroraFront()};},
  draw(ctx,lt,A){
    const Tt=S4_HT,dim=0.4*smooth(Tt.dimIn,Tt.dimIn+1.0,lt)*(1-smooth(Tt.dimOut,Tt.dimOut+0.9,lt));
    /* her: listening, the smile growing with the plans; at the question the brow lifts and the smile softens; fuller once the veil lifts */
    const plans=smooth(8,30,lt),ask=smooth(41.0,43.6,lt),after=smooth(47.6,49.0,lt);
    s4_room(ctx,lt,A,1+0.03*smooth(0,50,lt),{smile:lerp(lerp(0.3+0.1*plans,0.32,ask),0.5,after),brow:0.03+0.08*ask*(1-0.6*after),
      tilt:0.04*Math.sin(lt*0.3)+0.02+0.02*ask,blush:0.32+0.12*ask,seed:937});
    if(dim>0){ctx.fillStyle=`rgba(3,3,7,${dim.toFixed(3)})`;ctx.fillRect(0,0,W,H);}
    for(const v of S4_HAMEIN_VIG){const a=smooth(v.at,v.at+1.1,lt)*(1-smooth(v.until-0.7,v.until,lt));if(a<=0)continue;
      s4_vig(ctx,v.k==='aurora'?s4_vigAurora(A,lt):A[v.k],a,lt,v.at);}
    for(const c of S4_HAMEIN){const a=smooth(c.at-0.2,c.at+0.7,lt)*(1-smooth(c.until-0.6,c.until+0.1,lt));s4_band(ctx,c.text,a,{size:c.size,gold:true,y:350});}
  },
  subs:S4_HAMEIN.map(c=>[c.at+0.2,c.until-0.6,c.text.replace(/\n/g,' ')]),
  score({add,T,at,hit,pad,melody,THEME_B,THEME_B_CH}){
    /* bars 0–7: her theme on the music box over soft strings, a chime as each plan arrives; bars 8–11: strings with a few piano notes
       under the orphan children; bar 12, the question: an Em held with one low piano chord; bar 14 closes */
    for(let i=0;i<8;i++){pad(T(i),THEME_B_CH[i],1.05,0.18,'strings');if(i>=1)melody(i,i,'box',12,0.17,THEME_B);}
    ['Em','Cmaj7','Am7','Dsus'].forEach((c,k)=>pad(T(8+k),c,1.05,0.2,'strings'));
    [[27.4,64],[30.6,62],[33.8,59],[37.2,64]].forEach(([t,m])=>add(at(t),'piano',{midi:m,dur:3,vel:0.18}));
    S4_HAMEIN.forEach((c,i)=>hit(c.at+0.3,'chime',{midi:[91,95,98,100,88][i],vel:i===4?0.3:0.22}));
    hit(26.2,'chime',{midi:103,vel:0.16});
    pad(T(12),'Em',2.1,0.2,'strings');add(T(12),'piano',{midi:52,dur:5,vel:0.22});add(T(12),'piano',{midi:59,dur:5,vel:0.16});add(T(12,2),'piano',{midi:64,dur:4,vel:0.14});
    pad(T(14),'Em',1.3,0.16,'strings');add(T(14),'piano',{midi:64,dur:3.5,vel:0.16});
  },
  amb(){return{room:0.14};},
});


/* ================================================================================================
   The first time, for both of us — his acknowledgement as cream cards, between “Worthy of love” and “Eik hi iltija”
   ================================================================================================ */
const S4_FIRST=[
  {at:1.6, until:11.0,size:50,text:'Fabeha, this was the first time, for both of us. The first relationship either of us had been in.'},
  {at:11.5,until:21.9,size:46,text:'And ever since, I have been praying for one thing: the ability to see my own shortcomings. My downfalls. My lack of communication.'},
  {at:22.4,until:31.0,size:48,text:'But if you were in front of me, none of it would have happened. I would have noticed it in 0.1 second.'},
  {at:31.5,until:39.6,size:60,text:'That is what you do to me. You make me see.'},
];
const S4_FT={dimIn:1.0,dimOut:39.9};
scene({id:'firsttime',name:'The first time, for both of us',when:'2026-09-06T23:49:50',bars:13,fin:['#000000',1.4],fout:['#000000',2.0],
  note:'the same room and light; his acknowledgement as cream cards, one at a time, Fabeha softly behind them — this was the first time, for both of us, the first relationship either had been in; ever since he has prayed for one thing, the ability to see his own shortcomings, his downfalls, his lack of communication; had she been in front of him none of it would have happened, he would have noticed it in 0.1 second; the last, bigger: that is what you do to me, you make me see. The veil lifts, her face in the light, black. Her theme on the piano, the strings rising under the last card.',
  tag:'“You make me see.”',
  prep(){return{room:s3_room(),vig:s3_vignette()};},
  draw(ctx,lt,A){
    const Tt=S4_FT,dim=0.46*smooth(Tt.dimIn,Tt.dimIn+1.0,lt)*(1-smooth(Tt.dimOut,Tt.dimOut+0.9,lt));
    /* her: listening; a little warmer at the first card, the brow lifting at “0.1 second”, the smile and the blush arriving with the last card, fuller once the veil lifts */
    const first=smooth(1.8,5,lt),notice=smooth(26.5,29.5,lt),see=smooth(31.7,34.5,lt),after=smooth(39.9,41.3,lt);
    s4_room(ctx,lt,A,1+0.03*smooth(0,43,lt),{smile:lerp(lerp(0.26+0.08*first,0.42,see),0.52,after),brow:lerp(0.02,0.1,notice)*(1-0.6*after),
      tilt:0.04*Math.sin(lt*0.3)+0.03+0.02*see,blush:lerp(0.3,0.46,see),seed:941});
    if(dim>0){ctx.fillStyle=`rgba(3,3,7,${dim.toFixed(3)})`;ctx.fillRect(0,0,W,H);}
    s4_cards(ctx,S4_FIRST,lt);
  },
  subs:S4_FIRST.map(c=>[c.at+0.2,c.until-0.6,c.text]),
  score({add,T,at,hit,pad,melody,THEME_B,THEME_B_CH}){
    /* her theme on the piano over soft strings (bars 0–7); its second half again (bars 8–11), the strings rising under the last card
       and the low strings doubling it; an Em to close */
    for(let i=0;i<8;i++){pad(T(i),THEME_B_CH[i],1.05,0.16,'strings');melody(i,i,'piano',0,0.26,THEME_B);}
    for(let i=0;i<4;i++){const b=8+i,k=4+i;
      pad(T(b),THEME_B_CH[k],1.05,0.2+0.16*i/3,'strings');
      melody(b,k,'piano',0,0.28+0.04*i/3,THEME_B);
      let beat=0;for(const[m,d]of THEME_B[k]){if(d>=2)add(T(b,beat),'strings',{notes:[m-12],dur:d*BEAT,vel:0.13+0.06*i/3});beat+=d;}
    }
    pad(T(12),'Em',1.3,0.3,'strings');add(T(12),'piano',{midi:52,dur:4,vel:0.22});add(T(12),'piano',{midi:64,dur:4,vel:0.18});add(T(12,2),'piano',{midi:71,dur:3,vel:0.14});
  },
  amb(){return{room:0.14};},
});
