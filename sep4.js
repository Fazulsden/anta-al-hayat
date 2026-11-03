/* sep4.js — the two closing scenes, "Worthy of love" and "Eik hi iltija" (see notes/AUTHORING.md).
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
  ctx.shadowColor='rgba(255,186,140,.45)';ctx.shadowBlur=20;ctx.fillStyle='#fff4e6';
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
  {at:8.3, until:16.9,size:46,text:'I would not want any relationship with you, since I cannot hurt you. If I did, I would have left in the first place.'},
  {at:17.4,until:26.8,size:46,text:'But my love, if you were in front of me that day, nothing would have caused you hurt. Nothing would have happened in the first place.'},
  {at:27.3,until:34.9,size:48,text:'My love for you was paak. And I would only want one thing: us getting married, and me arranging everything.'},
  {at:35.4,until:43.4,size:56,text:'Eik hi iltija hai: don’t cry, and don’t hurt yourself. Be happy that we shared itna kuch.'},
  {at:43.9,until:54.5,size:44,text:'And InshaAllah, if you agree to marriage, with the help of ALLAH SWT I will make it happen. Unke saamne tou kya cheez impossible hai? Kuch bhi nahi.'},
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
