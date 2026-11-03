/* sep4.js — the closing scene, "Worthy of love" (see notes/AUTHORING.md).
   Straight after `nothurt` (sep3.js), before the end card: the same dark room and the same pool of light on her.
   First the gist of a piece she liked, as large cards with her softly behind them; then his own words, one at a
   time, big on a dark band across the frame; her name with the Arabic of the title small above it; the last line
   held, then the band goes, she is there for a moment in the light, and the room fades to black. */
'use strict';

/* ---------- the gist of a piece she liked (paraphrased), one card at a time ---------- */
const S4_PIECE=[
  {at:1.6, until:9.6, size:46,text:'From a young age, women are taught to lower their expectations. Don’t ask for too much. Don’t want too much. Don’t have standards that might make you seem difficult.'},
  {at:10.1,until:17.1,size:46,text:'And then they are praised for it: for being easy to manage, grateful for whatever they are given, careful not to make life difficult for anyone else.'},
  {at:17.6,until:25.6,size:46,text:'So much of it is about becoming acceptable to a man. One person deciding, and the other shrinking her needs, her preferences, her personality, to keep him comfortable.'},
  {at:26.1,until:33.1,size:48,text:'Having standards is not being difficult. It is taking care of yourself, and refusing to feel guilty for wanting more from life.'},
  {at:33.6,until:41.6,size:48,text:'A woman should never have to make herself smaller, quieter, or easier to control, to be worthy of love.'},
];
/* ---------- his words, big and centred on the band; the fourth the biggest, the title's Arabic small above it ---------- */
const S4_HIS=[
  {at:42.4,until:48.2,size:60,text:'I know that. Jinse pyar karte hain, unke saamne shartein nahi lagate.'},
  {at:48.6,until:53.0,size:64,text:'Jinse pyar karte hain, unhe majboor nahi karte.'},
  {at:53.4,until:57.8,size:64,text:'Jinse pyar karte hain, unse roothte nahi hain.'},
  {at:58.3,until:64.7,size:78,text:'Tum meri zindagi ho, Fabeha Adnan Chughtai.',arabic:'أنتَ الحياة'},
  {at:65.2,until:69.8,size:56,text:'Aur mein apne aap ko tab tak mitaata jaaoga, jab tak mein aapke qaabil nahi ban jaata.'},
];
const S4_T={dimIn:1.0,dimOut:70.1,name:58.9};   /* the veil over the room, the band's life, the chime on her name */

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

scene({id:'worthy',name:'Worthy of love',when:'2026-09-06T23:49',bars:22,fin:['#000000',1.4],fout:['#000000',2.2],
  note:'the same room and the same light on her, a veil over it; what women are taught about lowering themselves, five large cards one at a time with Fabeha softly behind them — expectations lowered and praised, standards are not difficulty, no one should have to be smaller to be worthy of love; then his own words on a dark band across the frame, one at a time, bigger each time: jinse pyar karte hain, unke saamne shartein nahi lagate; unhe majboor nahi karte; unse roothte nahi hain; her name, the biggest, the title’s Arabic small above it and a chime; the last line held; then the band goes, she is there for a moment in the full light, and the room fades to black. Her theme on the piano, the strings rising under it.',
  tag:'“Tum meri zindagi ho.”',
  prep(){return{room:s3_room(),vig:s3_vignette()};},
  draw(ctx,lt,A){
    const Tt=S4_T;
    /* the veil that keeps her soft behind the words: in with the first card, gone before the fade so she is seen once more in the light */
    const dim=0.46*smooth(Tt.dimIn,Tt.dimIn+1.0,lt)*(1-smooth(Tt.dimOut,Tt.dimOut+0.9,lt));
    /* her: listening; the smile arrives with his words, the blush with her name, the brow lifts a little at the last line */
    const his=smooth(42.0,46.4,lt),name=smooth(Tt.name-0.3,Tt.name+2.2,lt),last=smooth(65.4,68.4,lt),after=smooth(70.0,71.4,lt);
    const z=1+0.03*smooth(0,71.4,lt);
    ctx.save();ctx.translate(640,390);ctx.scale(z,z);ctx.translate(-640,-390);
    ctx.drawImage(A.room,0,0);
    s3_doorLight(ctx,lt,0.4);
    ctx.fillStyle='rgba(255,214,170,.06)';ctx.fillRect(0,0,W,H);
    glow(ctx,640,380,760,'#ffc090',0.11);
    s3_her(ctx,lt,A,{light:1.15,look:0.04*Math.sin(lt*0.45),smile:lerp(lerp(0.28,0.4,his),lerp(0.46,0.52,after),name),brow:lerp(0.02,0.1,last)*(1-after*0.5),
      tilt:0.04*Math.sin(lt*0.3)+0.03+0.02*name,blush:lerp(0.3,0.46,name),seed:913});
    ctx.restore();
    if(dim>0){ctx.fillStyle=`rgba(3,3,7,${dim.toFixed(3)})`;ctx.fillRect(0,0,W,H);}
    /* the cards, high in the frame so her face stays below them */
    for(const c of S4_PIECE){const a=smooth(c.at-0.2,c.at+0.8,lt)*(1-smooth(c.until-0.5,c.until+0.2,lt));
      s3_big(ctx,c.text,a,{y:230,size:c.size,lhm:1.28,maxW:980,label:c.label});}
    /* his words on the band */
    for(const c of S4_HIS){const a=smooth(c.at-0.2,c.at+0.8,lt)*(1-smooth(c.until-0.5,c.until+0.3,lt));
      s4_band(ctx,c.text,a,{y:336,size:c.size,arabic:c.arabic});}
  },
  subs:[
    ...S4_PIECE.map(c=>[c.at+0.2,c.until-0.6,c.text]),
    ...S4_HIS.map(c=>[c.at+0.2,c.until-0.6,c.text]),
  ],
  score({add,T,at,hit,pad,melody,THEME_B,THEME_B_CH}){
    /* part one: a pad under the cards, one piano note as each card arrives and a few passing ones;
       part two: her theme whole on the piano (bars 9–16), the strings rising under it, the low strings doubling its second half;
       a chime on her name; an Em to close */
    const ch=['Em','Cmaj7','Am7','Dsus','Em7','Cmaj7','Am7','G','Em','Cmaj7','Am7','Dsus','Em'];
    for(let b=0;b<13;b++)pad(T(b),ch[b],1.05,b<12?0.16:0.18,'pad');
    [[1.8,64,0.2],[6.2,67,0.15],[10.3,62,0.2],[14.2,64,0.15],[17.8,59,0.2],[22.0,62,0.15],[26.3,64,0.2],[30.2,67,0.15],[33.8,62,0.2],[38.0,59,0.15]].forEach(([t,m,v])=>add(at(t),'piano',{midi:m,dur:3.2,vel:v}));
    for(let i=0;i<8;i++){const b=13+i;
      pad(T(b),THEME_B_CH[i],1.05,0.18+0.14*i/7,'strings');
      melody(b,i,'piano',0,0.3+0.06*i/7,THEME_B);
      if(i>=4){let beat=0;for(const[m,d]of THEME_B[i]){if(d>=2)add(T(b,beat),'strings',{notes:[m-12],dur:d*BEAT,vel:0.14});beat+=d;}}
    }
    hit(S4_T.name,'chime',{midi:95,vel:0.4});hit(S4_T.name+0.55,'chime',{midi:100,vel:0.26});
    pad(T(21),'Em',1.4,0.26,'strings');add(T(21),'piano',{midi:52,dur:4,vel:0.24});add(T(21),'piano',{midi:64,dur:4,vel:0.2});add(T(21,2),'piano',{midi:71,dur:3,vel:0.16});
  },
  amb(){return{room:0.14};},
});
