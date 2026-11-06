/* more2.js — the small things (see notes/AUTHORING.md).
   gatorade     · 23 December, after `lab`: her hands at the desk beside him, his paper an inch closer; Pepsi Café, her cap on the floor, his blue cap on her bottle
   characterday · 4 May, Makkah at night: Kim Possible at ten (lines 21261–21270), the very princess wala dress by midnight (lines 21463–21500), the picture she sent
   chips        · 9 July, half past five on the bike: what would she be doing? Chips (lines 33445–33470)
   trust        · after `whowould`, the dark room: her trust, and her firsts
   forties      · after `iltija`: the arthritis of her forties (19 March, lines 11157–11166) — the whole scene: he carries her
   Verbatim lines live on the phone; the subtitle band carries them too, except the one the smoke test forbids in subtitles. */
'use strict';

/* ================================================================================================
   shared: hands seen from above, a photograph of a painted canvas, a soft vignette
   ================================================================================================ */
/* a hand resting on a desk, seen from above: the forearm comes in along −x, the fingers reach along +x, the thumb lies on the −y side
   (o.mirror flips it for the other hand). o.cuff = a knitted cuff, o.sleeve = a jacket sleeve; o.curl 0..1 how much the fingers draw in */
function m2_handFlat(ctx,x,y,s,dir,o={}){
  const skin=o.skin||FB.skin,sh=o.shade||FB.skinSh,nail=o.nail||'#f1d2c6',curl=o.curl??0.2;
  ctx.save();ctx.translate(x,y);ctx.rotate(dir);ctx.scale(s,o.mirror?-s:s);ctx.lineCap='round';ctx.lineJoin='round';
  if(o.cuff){ctx.strokeStyle=o.cuff;ctx.lineWidth=60;ctx.beginPath();ctx.moveTo(-300,0);ctx.lineTo(-62,0);ctx.stroke();
    ctx.strokeStyle='rgba(0,0,0,.07)';ctx.lineWidth=1.2;for(let k=-106;k<-66;k+=6){ctx.beginPath();ctx.moveTo(k,-28);ctx.lineTo(k-2,28);ctx.stroke();}
    ctx.fillStyle='rgba(0,0,0,.08)';ctx.fillRect(-70,-30,6,60);}
  else if(o.sleeve){ctx.strokeStyle=o.sleeve;ctx.lineWidth=66;ctx.beginPath();ctx.moveTo(-300,0);ctx.lineTo(-76,0);ctx.stroke();
    ctx.strokeStyle='rgba(255,255,255,.08)';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(-82,-30);ctx.lineTo(-82,30);ctx.stroke();}
  ctx.strokeStyle=skin;ctx.lineWidth=46;ctx.beginPath();ctx.moveTo(-96,0);ctx.lineTo(-22,0);ctx.stroke();
  ctx.fillStyle='rgba(0,0,0,.13)';ell(ctx,8,9,42,30);ctx.fill();
  ctx.fillStyle=skin;ell(ctx,0,0,36,29);ctx.fill();
  ctx.fillStyle=hexA(sh,0.32);ell(ctx,-12,7,18,13);ctx.fill();
  const L=[42,50,48,40],Wd=[14,15,14.5,12.5];
  for(let k=0;k<4;k++){const by=(k-1.5)*13.5,a=(k-1.5)*0.05,len=L[k]*(1-curl*0.35),ex=26+Math.cos(a)*len,ey=by+Math.sin(a)*len;
    ctx.strokeStyle=sh;ctx.lineWidth=Wd[k]+2.4;ctx.beginPath();ctx.moveTo(24,by);ctx.lineTo(ex,ey);ctx.stroke();
    ctx.strokeStyle=skin;ctx.lineWidth=Wd[k];ctx.beginPath();ctx.moveTo(24,by);ctx.lineTo(ex,ey);ctx.stroke();
    const mx=lerp(24,ex,0.55),my=lerp(by,ey,0.55);ctx.strokeStyle=hexA(sh,0.5);ctx.lineWidth=1.1;ctx.beginPath();ctx.moveTo(mx,my-Wd[k]*0.4);ctx.lineTo(mx,my+Wd[k]*0.4);ctx.stroke();
    ctx.fillStyle=nail;ell(ctx,ex-2,ey,Wd[k]*0.34,Wd[k]*0.26,a);ctx.fill();}
  ctx.strokeStyle=sh;ctx.lineWidth=16.4;ctx.beginPath();ctx.moveTo(-8,-24);ctx.quadraticCurveTo(8,-40,26,-46);ctx.stroke();
  ctx.strokeStyle=skin;ctx.lineWidth=14;ctx.beginPath();ctx.moveTo(-8,-24);ctx.quadraticCurveTo(8,-40,26,-46);ctx.stroke();
  ctx.fillStyle=nail;ell(ctx,25,-45,4.6,3.6,-0.4);ctx.fill();
  ctx.restore();
}
/* a painted canvas shown like a photograph: fit to a height, a shadow, a push-in by z */
function m2_photo(ctx,img,a,z,o={}){
  if(a<=0)return;const h=(o.h??600)*(z||1),w=h*img.width/img.height,cx=o.cx??640,cy=o.cy??H/2,x=cx-w/2,y=cy-h/2,r=o.r??10;
  ctx.save();ctx.globalAlpha=a;
  ctx.shadowColor='rgba(0,0,0,.75)';ctx.shadowBlur=48;ctx.shadowOffsetY=14;ctx.fillStyle='#07070a';rrect(ctx,x,y,w,h,r);ctx.fill();
  ctx.shadowColor='rgba(0,0,0,0)';ctx.shadowBlur=0;ctx.shadowOffsetY=0;
  ctx.save();rrect(ctx,x,y,w,h,r);ctx.clip();ctx.drawImage(img,x,y,w,h);ctx.restore();
  ctx.strokeStyle='rgba(255,255,255,.1)';ctx.lineWidth=1;rrect(ctx,x+0.5,y+0.5,w-1,h-1,r);ctx.stroke();
  ctx.restore();
}
function m2_softVig(){const c=mk(W,H),g=c.getContext('2d');const v=g.createRadialGradient(640,360,320,640,360,900);v.addColorStop(0,'rgba(60,30,10,0)');v.addColorStop(1,'rgba(60,30,10,.3)');g.fillStyle=v;g.fillRect(0,0,W,H);return c;}

/* ================================================================================================
   23 December · 12:30 — the blue cap
   ================================================================================================ */
/* the desk in the lab, close: the room beyond it pushed in and softened, the laminate, his laptop's corner at the left */
function m2_labDesk(){
  const c=mk(W,H),g=c.getContext('2d');
  g.drawImage(jan_lab(),-300,-150,W*1.55,H*1.55);
  const soft=softened(c,6),d=mk(W,H),h=d.getContext('2d');
  h.drawImage(soft,0,0);h.fillStyle='rgba(236,232,222,.38)';h.fillRect(0,0,W,H);
  h.fillStyle='#cfc8b9';h.beginPath();h.moveTo(0,322);h.lineTo(W,306);h.lineTo(W,330);h.lineTo(0,346);h.closePath();h.fill();
  h.fillStyle=vgrad(h,330,H,[[0,'#ece8dd'],[0.5,'#e4dfd2'],[1,'#d6d0c2']]);h.beginPath();h.moveTo(0,346);h.lineTo(W,330);h.lineTo(W,H);h.lineTo(0,H);h.closePath();h.fill();
  const r=rng(1230);h.strokeStyle='rgba(120,100,70,.07)';h.lineWidth=1;for(let i=0;i<70;i++){const y=350+r()*370,x0=r()*W,len=80+r()*300;h.beginPath();h.moveTo(x0,y);h.lineTo(x0+len,y-len*0.012);h.stroke();}
  h.fillStyle='#2a2b30';h.beginPath();h.moveTo(-20,500);h.lineTo(240,484);h.lineTo(262,720);h.lineTo(-20,720);h.closePath();h.fill();
  h.fillStyle='#3a3b41';h.beginPath();h.moveTo(0,512);h.lineTo(226,496);h.lineTo(242,640);h.lineTo(10,656);h.closePath();h.fill();
  h.fillStyle='#232428';for(let yy=0;yy<6;yy++)for(let xx=0;xx<7;xx++)h.fillRect(14+xx*30+yy*1.5,522+yy*19-xx*1.4,24,13);
  return d;
}
/* an exam sheet: the printed questions, the answers in ink */
function m2_sheet(ctx,x,y,w,h,rot,seed,ink){
  ctx.save();ctx.translate(x,y);ctx.rotate(rot);
  ctx.shadowColor='rgba(0,0,0,.18)';ctx.shadowBlur=14;ctx.shadowOffsetY=4;ctx.fillStyle='#f9f7f1';ctx.fillRect(0,0,w,h);ctx.shadowColor='rgba(0,0,0,0)';ctx.shadowBlur=0;ctx.shadowOffsetY=0;
  const r=rng(seed);
  ctx.fillStyle='#3a3a44';ctx.font='700 11px "Mulish",sans-serif';ctx.textAlign='left';ctx.fillText('COMPUTER SECURITY  ·  FINAL EXAMINATION',16,22);
  ctx.fillStyle='#8a8a94';ctx.font='500 9px "Mulish",sans-serif';ctx.fillText('Time allowed: 3 hours',16,36);
  ctx.strokeStyle='rgba(0,0,0,.12)';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(16,44);ctx.lineTo(w-16,44);ctx.stroke();
  ctx.fillStyle='rgba(40,40,50,.45)';for(let k=0;k<10;k++){const yy=62+k*16,len=k%4===0?40:120+r()*140;ctx.fillRect(16,yy,len,2.2);}
  ctx.strokeStyle=ink;ctx.lineWidth=1.3;ctx.globalAlpha=0.8;
  for(let k=0;k<11;k++){const yy=70+k*16+r()*3,x0=60+r()*20,len=100+r()*160;ctx.beginPath();ctx.moveTo(x0,yy);for(let xx=x0;xx<x0+len;xx+=7)ctx.lineTo(xx+7,yy+(r()-0.5)*4);ctx.stroke();}
  ctx.globalAlpha=1;ctx.restore();
}
/* Pepsi Café with its floor instead of the long table (dt_cafe keeps the sign's red and blue in the window); a small round table in front, in its own layer */
function m2_cafeRoom(){
  const c=mk(W,H),g=c.getContext('2d');
  g.drawImage(dt_cafe(),0,0);
  g.fillStyle=vgrad(g,470,H,[[0,'#3a2a26'],[1,'#241815']]);g.fillRect(0,470,W,H-470);
  g.strokeStyle='rgba(255,220,180,.08)';g.lineWidth=1.5;for(let k=0;k<9;k++){const y=470+k*k*3.4;g.beginPath();g.moveTo(0,y);g.lineTo(W,y);g.stroke();}
  for(let k=-6;k<=6;k++){g.beginPath();g.moveTo(640+k*60,470);g.lineTo(640+k*200,H);g.stroke();}
  g.fillStyle='rgba(255,200,150,.06)';ell(g,640,660,460,80);g.fill();
  return c;
}
function m2_cafeTable(){
  const c=mk(W,H),g=c.getContext('2d');
  g.fillStyle='#2e1f1a';g.fillRect(600,590,80,130);g.fillStyle='#3a2822';ell(g,640,700,120,22);g.fill();
  g.fillStyle='#4a3028';rrect(g,320,536,640,64,18);g.fill();
  g.fillStyle=vgrad(g,470,610,[[0,'#9a6a46'],[1,'#6a4630']]);ell(g,640,540,330,70);g.fill();
  g.strokeStyle='rgba(255,220,180,.35)';g.lineWidth=2;ell(g,640,540,330,70);g.stroke();
  g.fillStyle='rgba(255,255,255,.06)';ell(g,560,522,150,24);g.fill();
  g.fillStyle='#f4efe6';g.save();g.translate(640,560);g.rotate(0.1);rrect(g,-40,-13,80,26,4);g.fill();g.restore();
  return c;
}
/* a Gatorade bottle, base at (x,y): blue inside, the grip waist, a plain white label with a stripe, the blue cap (o.cap 0..1) */
function m2_bottle(ctx,x,y,s,o={}){
  ctx.save();ctx.translate(x,y);ctx.scale(s,s);
  const body=()=>{ctx.beginPath();ctx.moveTo(-30,0);ctx.lineTo(-30,-70);ctx.quadraticCurveTo(-22,-100,-30,-130);ctx.lineTo(-30,-170);ctx.quadraticCurveTo(-30,-196,-14,-204);ctx.lineTo(14,-204);ctx.quadraticCurveTo(30,-196,30,-170);ctx.lineTo(30,-130);ctx.quadraticCurveTo(22,-100,30,-70);ctx.lineTo(30,0);ctx.closePath();};
  ctx.fillStyle='rgba(0,0,0,.2)';ell(ctx,6,4,38,10);ctx.fill();
  ctx.fillStyle='#1f7fd6';body();ctx.fill();
  ctx.save();body();ctx.clip();
  ctx.fillStyle='#8fc8f2';ctx.fillRect(-30,-204,60,22);ctx.fillStyle='rgba(255,255,255,.22)';ctx.beginPath();ctx.ellipse(-15,-100,6,88,0,0,TAU);ctx.fill();
  ctx.fillStyle='rgba(0,40,100,.25)';ctx.beginPath();ctx.ellipse(22,-100,8,90,0,0,TAU);ctx.fill();
  ctx.fillStyle='#f4f4f0';ctx.fillRect(-30,-62,60,46);ctx.fillStyle='#1f5fb8';ctx.fillRect(-30,-44,60,6);ctx.fillStyle='#e88a2a';ctx.fillRect(-30,-36,60,2);
  ctx.restore();
  ctx.fillStyle='#dfe8f0';ctx.fillRect(-12,-222,24,18);ctx.fillStyle='rgba(0,0,0,.1)';ctx.fillRect(-12,-212,24,2);
  if(o.cap>0){ctx.globalAlpha*=o.cap;ctx.fillStyle='#1b64c9';rrect(ctx,-14,-242,28,22,4);ctx.fill();ctx.fillStyle='rgba(255,255,255,.2)';for(let k=0;k<5;k++)ctx.fillRect(-12+k*5.5,-242,2,22);ctx.fillStyle='#2f7ee0';rrect(ctx,-14,-242,28,5,2);ctx.fill();}
  ctx.restore();
}
/* a cap on its own, rolling: rot turns the ridges */
function m2_cap(ctx,x,y,s,rot){
  ctx.save();ctx.translate(x,y);ctx.scale(s,s);
  ctx.fillStyle='rgba(0,0,0,.25)';ell(ctx,2,12,16,5);ctx.fill();
  ctx.rotate(rot);ctx.fillStyle='#1b64c9';rrect(ctx,-14,-11,28,22,4);ctx.fill();
  ctx.fillStyle='rgba(255,255,255,.2)';for(let k=0;k<5;k++)ctx.fillRect(-12+k*5.5,-11,2,22);
  ctx.fillStyle='rgba(255,255,255,.35)';ctx.fillRect(-12,-9,22,2);
  ctx.restore();
}
/* where her cap is, u seconds after it fell: off the bottle onto the table, along the table to its edge, off the edge to the floor, and away to the right */
function m2_capPath(u){
  if(u<0.55){const f=u/0.55;return{x:850+22*f,y:313+209*f*f,rot:u*9,s:0.85};}
  if(u<0.85){const f=(u-0.55)/0.3;return{x:872+8*f,y:522-22*Math.sin(Math.PI*f),rot:5+f*2,s:0.85};}
  if(u<1.9){const f=easeOut((u-0.85)/1.05);return{x:880+78*f,y:522+30*f,rot:7+f*9,s:0.85};}
  if(u<2.4){const f=(u-1.9)/0.5;return{x:958+46*f,y:552+110*f*f,rot:16+f*4,s:0.85+0.05*f};}
  if(u<2.7){const f=(u-2.4)/0.3;return{x:1004+10*f,y:664-14*Math.sin(Math.PI*f),rot:20+f*1.5,s:0.9};}
  const f=easeOut(clamp((u-2.7)/1.9));return{x:1014+166*f,y:664+10*f,rot:21.5+f*12,s:0.9+0.04*f};
}
/* his right hand coming up to the bottle, the forearm down to the bottom of the frame */
function m2_hisGrip(ctx,x,y,s,rot){
  ctx.save();ctx.lineCap='round';
  ctx.strokeStyle='#2f3644';ctx.lineWidth=104;ctx.beginPath();ctx.moveTo(x+24,y+300);ctx.lineTo(x+70,H+120);ctx.stroke();
  ctx.strokeStyle=HIS.skin;ctx.lineWidth=92;ctx.beginPath();ctx.moveTo(x+14,y+210);ctx.lineTo(x+40,y+330);ctx.stroke();
  ctx.restore();
  may_hand(ctx,x,y,s,rot);
}
/* her face through the café beat: the cap drops, she follows it, looks at him, watches his hand, and the smile comes */
const M2_GAT_K=[[0,{look:0.04,smile:0.55,tilt:0,blush:0.4,brow:0}],
  [3.3,{look:0.75,smile:0.05,tilt:0.1,blush:0.5,brow:-0.5},0.35],
  [5.6,{look:0.85,smile:0.05,tilt:0.12,blush:0.5,brow:-0.55},0.6],
  [7.6,{look:0.02,smile:0.12,tilt:0.02,blush:0.5,brow:-0.4},0.7],
  [10.4,{look:-0.3,smile:0.2,tilt:-0.03,blush:0.5,brow:-0.15},0.8],
  [12.4,{look:0.3,smile:0.45,tilt:0.04,blush:0.55,brow:0.05},0.9],
  [14.0,{look:0.02,smile:1,tilt:0.04,blush:0.62,brow:0.08,eyes:'happy'},0.5],
  [17.0,{look:0.03,smile:0.85,tilt:0,blush:0.58,brow:0.05},0.8]];
function m2_gatLab(ctx,lt,A){
  const z=1+0.04*smooth(0,16,lt);
  ctx.save();ctx.translate(640,430);ctx.scale(z,z);ctx.translate(-640,-430);
  ctx.drawImage(A.desk,0,0);
  const slide=easeIO(smooth(6.6,8.6,lt))*44,settle=smooth(8.8,12.5,lt),tr=1-settle;
  m2_sheet(ctx,780,352,330,214,0.05,41,'#2b4b8c');
  ctx.fillStyle='#1d3f8a';ctx.save();ctx.translate(1120,470);ctx.rotate(0.9);rrect(ctx,-4,-62,8,124,4);ctx.fill();ctx.fillStyle='#d9c9a8';rrect(ctx,-3,-62,6,16,3);ctx.fill();ctx.restore();
  m2_sheet(ctx,396+slide,384,330,214,-0.05,42,'#2a2a30');
  /* her hands at the edge of her paper, a tremor that settles once his paper is beside her; the near one keeps curling and letting go */
  const shake=k=>tr*(Math.sin(lt*27+k)*1.1+Math.sin(lt*41+k*2)*0.5);
  m2_handFlat(ctx,950+shake(0),500+shake(1),1.0,Math.PI+0.3,{cuff:SLEEVE.uni,curl:0.45+0.3*tr*(0.5+0.5*Math.sin(lt*6.5))});
  m2_handFlat(ctx,1040+shake(2),420+shake(3),0.96,Math.PI-0.12,{cuff:SLEEVE.uni,curl:0.5,mirror:true});
  /* his hand on the near corner of his paper, moving it an inch */
  m2_handFlat(ctx,452+slide,470+Math.sin(lt*0.8)*1.5,1.12,-1.05,{skin:HIS.skin,shade:HIS.skinSh,nail:HIS.nail,sleeve:'#2f3644',curl:0.15});
  ctx.restore();
  ctx.save();ctx.globalCompositeOperation='screen';for(let i=0;i<7;i++){const x=-60+i*190;ctx.fillStyle='rgba(255,224,170,0.11)';ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x+70,0);ctx.lineTo(x+560,720);ctx.lineTo(x+470,720);ctx.closePath();ctx.fill();}ctx.restore();
  motes(ctx,lt,30,1231,'#fff2cc',1.3,0.5);
  ctx.fillStyle='rgba(255,240,215,.08)';ctx.fillRect(0,0,W,H);
}
function m2_gatCafe(ctx,t,A){
  ctx.drawImage(A.cafe,0,0);
  bokeh(ctx,t,16,208,['#ffd8a0','#ff9a8a','#8ab0ff'],6,22,0.35);
  const k=dt_pose(t,M2_GAT_K);
  drawFabeha(ctx,640,296,1.15,{t,outfit:'uni',hair:'low',pose:'bust',arms:'lap',smile:k.smile,look:(k.look||0)+0.02*Math.sin(t*0.8),tilt:(k.tilt||0)+Math.sin(t*0.5)*0.012,blush:k.blush,brow:k.brow,eyes:k.eyes,len:170});
  ctx.drawImage(A.table,0,0);
  const fall=t-3.4,given=t>=13.6?1:0;
  m2_bottle(ctx,850,512,0.85,{cap:fall<0?1:given});
  m2_bottle(ctx,400,600,1.15,{cap:t<12.2?1:0});
  if(fall>=0){const p=m2_capPath(fall);m2_cap(ctx,p.x,p.y,p.s,p.rot);}
  /* his hand: up to his bottle, two twists, the cap carried across, set down on hers, and away */
  const up=smooth(10.0,11.0,t),carry=easeIO(smooth(12.2,13.4,t)),set=smooth(13.4,13.7,t),away=smooth(13.8,14.8,t);
  if(t>=10.0&&t<14.9){
    const twist=t>=11.0&&t<12.2?Math.sin((t-11)*8)*0.3*(1-smooth(11.9,12.2,t)):0;
    let hx=lerp(430,400,easeOut(up)),hy=lerp(830,356,easeOut(up));
    hx=lerp(hx,850,carry);hy=lerp(hy,364,carry)-70*Math.sin(Math.PI*carry)+6*set;
    hx=lerp(hx,760,away);hy=lerp(hy,860,easeIO(away));
    if(t>=12.2&&given<1)m2_cap(ctx,hx,hy-22*0.95,0.95,twist);
    m2_hisGrip(ctx,hx,hy,0.95,twist);
  }
  ctx.save();ctx.globalCompositeOperation='screen';glow(ctx,440,150,320,'#ffd9a8',0.16);ctx.restore();
  ctx.fillStyle='rgba(255,180,120,.08)';ctx.fillRect(0,0,W,H);
  ctx.drawImage(A.vig,0,0);
}
scene({id:'gatorade',name:'23 December · the blue cap',when:'2025-12-23T12:30',bars:12,fin:['#000000',1.2],fout:['#000000',1.4],
  note:'the desk in the lab, close: her hands beside his paper, shaking a little, the morning through the blinds; his hand slides his sheet an inch towards her and the shaking stops. Then Pepsi Café: a small table, two blue Gatorades, the sign’s red and blue in the window; her cap drops, rolls off the table and across the floor, and her face falls with it; his hand opens his own bottle and sets his cap on hers. The first thing he ever gave her.',
  tag:'23 Dec · the first thing I ever gave her',
  prep(){return{desk:m2_labDesk(),cafe:m2_cafeRoom(),table:m2_cafeTable(),vig:dt_vig()};},
  draw(ctx,lt,A){
    if(lt<16.9)m2_gatLab(ctx,lt,A);else m2_gatCafe(ctx,lt-17,A);
    const dip=smooth(16.3,16.9,lt)*(1-smooth(16.9,17.6,lt));if(dip>0){ctx.fillStyle=`rgba(0,0,0,${dip.toFixed(3)})`;ctx.fillRect(0,0,W,H);}
  },
  subs:[
    [0.8,4.6,'23 December. The exam, and she was panicking beside me.'],
    [5.2,9.6,'I only wanted one thing that morning: for her to feel safe. Next to me.'],
    [10.4,14.8,'So my paper moved an inch closer. The marks were never the point.'],
    [17.8,20.6,'Afterwards, Pepsi Café. Two blue Gatorades.'],
    [24.2,28.4,'Her cap fell and rolled away, and she looked at it like the day had broken.'],
    [29.0,32.2,'I opened mine, and gave her my cap.'],
    [33.0,38.6,'The first thing I ever gave her was a blue cap. And the day was whole again.'],
  ],
  score({hit,melody,bars,THEME_B,THEME_B_CH}){
    bars(0,5,['Em','Cmaj7','G','Dsus','Em7'],{padVel:0.3});
    for(let b=1;b<5;b++)melody(b,b-1,'box',12,0.24,THEME_B);
    hit(7.4,'piano',{midi:64,dur:3,vel:0.2});hit(16.5,'swell',{dur:1.0,vel:0.1});
    bars(5,7,THEME_B_CH.slice(0,7),{padVel:0.34,strings:true});
    for(let b=5;b<12;b++)melody(b,b-5,'piano',0,0.28,THEME_B);
    hit(20.5,'pluck',{midi:76,vel:0.3});for(let k=0;k<6;k++)hit(21.0+k*0.4,'pluck',{midi:71-k,vel:0.16-k*0.02});
    hit(30.5,'chime',{midi:95,vel:0.36});hit(31.0,'chime',{midi:100,vel:0.24});
  },
  amb(lt){return lt<17?{room:0.3,hum:0.22}:{room:0.2,crowd:0.12};},
});

/* ================================================================================================
   4 May · 22:02 — the very princess wala dress (lines 21261–21270, 21463–21500)
   ================================================================================================ */
const M2_CD_A=[
  {at:0.8, who:'me', time:'22:02',text:'Ap kya banrahi'},
  {at:1.3, who:'me', time:'22:02',text:'Character'},
  {at:2.8, who:'her',time:'22:02',text:'Abgi tak toh planning to be kim possible'},
  {at:4.8, who:'her',time:'22:03',text:'But i dont have gloves'},
  {at:5.6, who:'her',time:'22:03',text:'And orange hair'},
  {at:7.0, who:'me', time:'22:03',text:'Gloves ship hojayege'},
  {at:8.0, who:'me', time:'22:03',text:'Orange baal krwalo'},
];
const M2_CD_B=[
  {at:13.9,who:'her',time:'23:36',text:'Han aik dress nikla abhi'},
  {at:15.0,who:'her',time:'23:36',text:'I bought it in 9th grade'},
  {at:16.2,who:'her',time:'23:37',text:'Nanu zip sahi karahi thi abhi'},
  {at:17.6,who:'her',time:'23:37',text:'It\'s a v princess wala dress lill'},
  {at:20.2,who:'me', time:'23:37',text:'The dress isnt'},
  {at:20.5,who:'me', time:'23:37',text:'Worth it'},
  {at:20.9,who:'me', time:'23:38',text:'The one who wears'},
  {at:22.0,who:'her',time:'23:38',text:'Ohoooo'},
  {at:22.8,who:'her',time:'23:38',text:'Also it gives aurora wali vibr'},
  {at:23.6,who:'me', time:'23:38',text:'Makes the difference'},
  {at:24.2,who:'her',time:'23:38',text:'Sleeping beauty wali'},
  {at:25.8,who:'her',time:'23:40',text:'Han na aur uski zip tooti wi thi thora tight higaya hai dress lolll'},
  {at:27.6,who:'her',time:'23:40',text:'But ab sahi hogya'},
  {at:28.6,who:'her',time:'23:41',text:'Uski peeche se pleat nikal di nanu ne'},
  {at:30.2,who:'her',time:'23:41',text:'📷  Photo'},
  {at:30.8,who:'her',time:'23:42',text:'Ye toh aisa trial kia tha pehn kay'},
  {at:32.0,who:'her',time:'23:43',text:'Abhi kal iron hoga'},
];
/* the picture she sent, painted: her in the long pale blue-and-gold gown in the lamp light of her room, her nani's hands at her waist from behind, a pin in the fingers, the pleat let out */
function m2_dressPic(){
  const c=mk(600,900),g=c.getContext('2d');
  g.fillStyle=vgrad(g,0,900,[[0,'#3a2c2a'],[0.5,'#5a4238'],[1,'#2e2220']]);g.fillRect(0,0,600,900);
  glow(g,300,330,440,'#ffd2a0',0.5);
  g.fillStyle='#4a3630';g.fillRect(450,40,150,700);g.fillStyle='#3b2a26';g.fillRect(462,52,60,676);g.fillRect(534,52,60,676);g.fillStyle='#8a7054';circle(g,524,400,4);g.fill();circle(g,540,400,4);g.fill();
  g.fillStyle='#2a2020';g.fillRect(0,740,600,160);g.fillStyle='#3f3230';g.fillRect(0,740,600,10);
  g.fillStyle='rgba(255,210,160,.08)';ell(g,300,790,260,60);g.fill();
  const x=300,y=300,s=1.5;
  g.save();g.translate(x,y);g.scale(s,s);
  g.fillStyle='#cfe0f3';g.beginPath();g.moveTo(-72,196);g.bezierCurveTo(-110,250,-150,320,-168,372);g.lineTo(168,372);g.bezierCurveTo(150,320,110,250,72,196);g.closePath();g.fill();
  g.fillStyle='#e2edf8';g.beginPath();g.moveTo(-26,200);g.bezierCurveTo(-46,260,-70,320,-84,372);g.lineTo(84,372);g.bezierCurveTo(70,320,46,260,26,200);g.closePath();g.fill();
  g.strokeStyle='rgba(90,120,170,.25)';g.lineWidth=1.6;for(const f of[-120,-96,96,120]){g.beginPath();g.moveTo(f*0.45,214);g.quadraticCurveTo(f*0.8,300,f*1.2,370);g.stroke();}
  g.strokeStyle='#d9b45c';g.lineWidth=4;g.beginPath();g.moveTo(-168,370);g.lineTo(168,370);g.stroke();g.lineWidth=1.4;g.beginPath();g.moveTo(-164,362);g.lineTo(164,362);g.stroke();
  g.strokeStyle='rgba(217,180,92,.7)';g.lineWidth=1.6;for(const f of[-1,1]){g.beginPath();g.moveTo(f*26,200);g.bezierCurveTo(f*46,260,f*70,320,f*84,370);g.stroke();}
  g.fillStyle='#e4c46c';for(let k=0;k<7;k++){const u=k/6;for(const f of[-1,1]){const px=f*lerp(28,82,u),py=lerp(212,360,u);for(let j=0;j<5;j++){ell(g,px+Math.cos(j*1.26)*3.2,py+Math.sin(j*1.26)*3.2,2,1.3,j*1.26);g.fill();}}}
  g.restore();
  drawFabeha(g,x,y,s,{t:0.3,outfit:'home',hair:'down',pose:'bust',look:0.05,smile:0.78,tilt:0.03,blush:0.5,len:230});
  g.save();g.translate(x,y);g.scale(s,s);
  g.fillStyle='#d6e5f5';g.beginPath();g.moveTo(-12,56);g.bezierCurveTo(-40,60,-62,66,-66,84);g.lineTo(-74,200);g.lineTo(74,200);g.lineTo(66,84);g.bezierCurveTo(62,66,40,60,12,56);g.closePath();g.fill();
  g.fillStyle='rgba(90,120,170,.14)';g.beginPath();g.moveTo(-66,84);g.lineTo(-74,200);g.lineTo(-30,200);g.lineTo(-30,96);g.closePath();g.fill();
  g.fillStyle=FB.skin;g.beginPath();g.moveTo(-26,50);g.quadraticCurveTo(0,78,26,50);g.closePath();g.fill();
  g.strokeStyle='#d9b45c';g.lineWidth=2.2;g.beginPath();g.moveTo(-40,62);g.quadraticCurveTo(-20,80,0,70);g.quadraticCurveTo(20,80,40,62);g.stroke();
  g.beginPath();g.moveTo(-72,196);g.lineTo(72,196);g.stroke();
  g.fillStyle='#e4c46c';for(let k=0;k<9;k++){const px=-48+k*12,py=100+Math.abs(k-4)*10;for(let j=0;j<5;j++){ell(g,px+Math.cos(j*1.26)*3,py+Math.sin(j*1.26)*3,1.9,1.2,j*1.26);g.fill();}}
  g.fillStyle='#d6e5f5';ell(g,-66,86,22,20);g.fill();ell(g,66,86,22,20);g.fill();
  g.strokeStyle='#d6e5f5';g.lineCap='round';g.lineWidth=22;g.beginPath();g.moveTo(-70,100);g.quadraticCurveTo(-96,160,-92,224);g.stroke();g.beginPath();g.moveTo(70,100);g.quadraticCurveTo(96,160,92,224);g.stroke();
  g.fillStyle=FB.skin;ell(g,-92,232,9,12,0.2);g.fill();ell(g,92,232,9,12,-0.2);g.fill();
  const nani='#d4a98c',naniSh='#b88a70';
  for(const f of[-1,1]){g.save();g.translate(f*78,186);g.scale(f,1);
    g.fillStyle='#bfd3ea';g.beginPath();g.moveTo(-6,-14);g.quadraticCurveTo(-26,-4,-22,16);g.lineTo(-4,14);g.closePath();g.fill();
    g.fillStyle=naniSh;ell(g,8,0,16,11,0.3);g.fill();g.fillStyle=nani;ell(g,6,-2,15,10,0.3);g.fill();
    g.strokeStyle=nani;g.lineWidth=7;g.lineCap='round';for(let k=0;k<3;k++){g.beginPath();g.moveTo(2+k*2,-6+k*5);g.lineTo(-16+k*2,-2+k*6);g.stroke();}
    g.strokeStyle='rgba(120,80,60,.5)';g.lineWidth=1;for(let k=0;k<3;k++){g.beginPath();g.moveTo(-6+k*2,-5+k*5);g.lineTo(-6+k*2,-1+k*5);g.stroke();}
    g.strokeStyle='#e9e9e9';g.lineWidth=1.4;g.beginPath();g.moveTo(-12,-6);g.lineTo(-30,-16);g.stroke();g.fillStyle='#c94a4a';circle(g,-30,-16,1.8);g.fill();
    g.restore();}
  g.restore();
  g.fillStyle='rgba(255,196,130,.10)';g.fillRect(0,0,600,900);
  const v=g.createRadialGradient(300,420,220,300,420,720);v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(1,'rgba(0,0,0,.45)');g.fillStyle=v;g.fillRect(0,0,600,900);
  return c;
}
const M2_CD_T={dipA:12.9,threadB:13.3,big:[17.8,20.6],dipB:33.2,pic:33.6,line:[42.0,51.4],may:46.6};
scene({id:'characterday',name:'4 May · the very princess wala dress',when:'2026-05-04T22:02',bars:16,fin:['#000000',1.4],fout:['#000000',1.4],
  note:'the hotel window over Makkah at night, the phone in his hand: at ten her plan is Kim Possible, no gloves, no orange hair; then 23:36, a dress she bought in ninth grade, her nani at the zip, her own words big beside the phone — it’s a v princess wala dress — his four fragments about the one who wears it, aurora, sleeping beauty, the pleat let out; then the picture she sent, painted: the long pale blue-and-gold gown in the lamp light, her nani’s hands at her waist with a pin; his line held over it, and 5 May.',
  tag:'“It\'s a v princess wala dress lill” · “The one who wears / Makes the difference”',
  prep(){return Object.assign({pic:m2_dressPic()},may_assets());},
  draw(ctx,lt,A){
    const Tt=M2_CD_T;
    const toPic=smooth(Tt.dipB,Tt.pic,lt);
    may_roomNight(ctx,lt,A);
    if(toPic<1){
      const S=drawPhoneHand(ctx,lt,{x:475,y:120,w:330,h:700});
      const msgs=lt<Tt.threadB?M2_CD_A:M2_CD_B;
      may_chat(ctx,S,msgs,lt,{name:'Fabeha',status:'online'});
      phoneTop(ctx,S,{time:may_clock(msgs,lt,lt<Tt.threadB?'22:02':'23:36')});
      glow(ctx,S.x+S.w/2,S.y+S.h*0.45,480,'#9fd3f2',0.12);
      /* her line, big beside the phone the moment it lands */
      const a=smooth(Tt.big[0],Tt.big[0]+0.7,lt)*(1-smooth(Tt.big[1]-0.5,Tt.big[1],lt));
      s3_big(ctx,'It\'s a v princess wala dress lill',a,{x:240,y:330,size:46,maxW:380,italic:true,label:'23:37',glowCol:'#9fd3f2'});
      const dipA=smooth(Tt.dipA,Tt.dipA+0.4,lt)*(1-smooth(Tt.threadB,Tt.threadB+0.6,lt));
      if(dipA>0){ctx.fillStyle=`rgba(0,0,0,${dipA.toFixed(3)})`;ctx.fillRect(0,0,W,H);}
    }
    if(toPic>0){
      ctx.fillStyle=`rgba(3,3,7,${(0.97*toPic).toFixed(3)})`;ctx.fillRect(0,0,W,H);
      glow(ctx,640,360,620,'#c89a6a',0.12*toPic);
      m2_photo(ctx,A.pic,toPic,1+0.05*smooth(Tt.pic,Tt.pic+12,lt),{h:620,cy:340,r:12});
      const la=smooth(Tt.line[0]-0.2,Tt.line[0]+0.8,lt)*(1-smooth(Tt.line[1]-0.5,Tt.line[1],lt));
      s4_band(ctx,'In the picture you sent me, you were still the very princess wala dress.',la,{y:330,size:54,maxW:1000});
      const ma=smooth(Tt.may,Tt.may+0.8,lt)*(1-smooth(Tt.line[1]-0.5,Tt.line[1],lt));
      if(ma>0){ctx.save();ctx.globalAlpha=ma;ctx.font='italic 500 30px "Cormorant Garamond",serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle='#ffd3a6';ctx.shadowColor='rgba(255,186,140,.5)';ctx.shadowBlur=14;ctx.fillText('And on 5 May, you went as that.',640,452);ctx.restore();}
    }
  },
  subs:[
    [3.0,4.7,'Abgi tak toh planning to be kim possible','her'],
    [4.9,5.5,'But i dont have gloves','her'],
    [5.7,6.8,'And orange hair','her'],
    [7.1,7.9,'Gloves ship hojayege','him'],
    [8.1,9.4,'Orange baal krwalo','him'],
    [9.9,12.6,'Character day, the next morning. At ten she was going as Kim Possible, gloves or no gloves.'],
    [14.1,15.0,'Han aik dress nikla abhi','her'],
    [15.2,16.2,'I bought it in 9th grade','her'],
    [16.4,17.5,'Nanu zip sahi karahi thi abhi','her'],
    [20.4,21.9,'The dress isnt / Worth it / The one who wears','him'],
    [22.1,22.7,'Ohoooo','her'],
    [22.9,23.6,'Also it gives aurora wali vibr','her'],
    [23.7,24.3,'Makes the difference','him'],
    [24.4,25.6,'Sleeping beauty wali','her'],
    [25.9,27.5,'Han na aur uski zip tooti wi thi thora tight higaya hai dress lolll','her'],
    [27.7,28.5,'But ab sahi hogya','her'],
    [28.7,30.1,'Uski peeche se pleat nikal di nanu ne','her'],
    [30.9,31.9,'Ye toh aisa trial kia tha pehn kay','her'],
    [32.1,33.1,'Abhi kal iron hoga','her'],
    [34.2,38.2,'Kim Possible at ten, and by midnight the dress you bought in ninth grade.'],
    [38.6,41.6,'Your nani fixed the zip, and let a pleat out of the back.'],
    [42.2,46.2,'In the picture you sent me, you were still the very princess wala dress.'],
    [46.8,50.2,'And on 5 May, you went as that.'],
  ],
  score({hit,melody,bars,THEME,THEME_B,THEME_B_CH}){
    bars(0,4,['G','Em7','Cmaj7','D'],{padVel:0.3,arp:true,arpVel:0.1,step:1});
    for(let b=1;b<4;b++)melody(b,b-1,'box',12,0.24,THEME);
    bars(4,6,['Em','Cmaj7','G','Dsus','Em7','Am7'],{padVel:0.32});
    for(let b=5;b<10;b++)melody(b,b-5,'piano',0,0.26,THEME_B);
    hit(M2_CD_T.big[0]+0.2,'chime',{midi:91,vel:0.3});
    bars(10,4,THEME_B_CH.slice(4,8),{padVel:0.4,strings:true});
    bars(14,2,['Cmaj7','G'],{padVel:0.34,strings:true});
    for(let b=10;b<14;b++)melody(b,b-6,'box',12,0.28,THEME_B);
    hit(M2_CD_T.pic+0.2,'chime',{midi:95,vel:0.34});hit(M2_CD_T.line[0]+0.3,'chime',{midi:100,vel:0.26});
    for(const m of M2_CD_A.concat(M2_CD_B))hit(m.at,'tick',{hi:m.who==='her'});
  },
  amb(lt){return{room:0.22,wind:0.14};},
});

/* ================================================================================================
   9 July · 07:18 — chips (lines 33445–33470)
   ================================================================================================ */
const M2_CHIPS=[
  {at:15.0,who:'me', time:'07:18',text:'Bike chalate waqt'},
  {at:15.4,who:'me', time:'07:18',text:'Ke tum kya karahi hogi'},
  {at:16.6,who:'her',time:'07:18',text:'Chips kha rahi thi🤣🤣🤣🤣'},
  {at:18.2,who:'me', time:'07:19',text:'Kal calories deficit'},
  {at:18.5,who:'me', time:'07:19',text:'Ki baat krke'},
  {at:18.8,who:'me', time:'07:19',text:'Khud chios kharahi'},
  {at:20.4,who:'her',time:'07:19',text:'Aray aisa nhi khati ussi ko measure karkay khati hun withi calorie limit'},
  {at:22.6,who:'her',time:'07:19',text:'Mine is around 1500'},
  {at:23.0,who:'her',time:'07:19',text:'1500-1600'},
  {at:24.2,who:'her',time:'07:20',text:'Ab kia jeena chorh dun 😭😭😭😭'},
  {at:25.8,who:'me', time:'07:20',text:'Wo tou mere sath jeena hai'},
  {at:27.2,who:'me', time:'07:20',text:'Bas jaisi ho waisi rehna'},
];
/* the road out of town at half past five in July: a low sun, flat Sindh, the first shops; spd 0 = stopped */
function m2_dawnRoad(ctx,lt,spd){
  paintSky(ctx,[[0,'#6f84b8'],[0.35,'#c9a9b8'],[0.55,'#f2c9a0'],[0.7,'#f7e2c0']]);
  sunGlow(ctx,980,396,440,'rgba(255,214,150,0.85)');ctx.fillStyle='#fff1c8';circle(ctx,980,398,26);ctx.fill();
  ctx.fillStyle='#9a8a9c';for(let k=0;k<30;k++){const q=((k*7919)%97)/97,x=k*46-20,h=12+q*28;ctx.fillRect(x,432-h,40,h+4);if(k%9===4){ctx.fillRect(x+14,432-h-40,6,40);ctx.fillStyle='#8a7a8c';ell(ctx,x+17,432-h-42,6,4);ctx.fill();ctx.fillStyle='#9a8a9c';}}
  ctx.fillStyle='rgba(247,226,192,.55)';ctx.fillRect(0,396,W,38);
  ctx.fillStyle=vgrad(ctx,432,720,[[0,'#cdbf98'],[1,'#a89670']]);ctx.fillRect(0,432,W,288);
  const r=rng(709);
  for(let i=0;i<30;i++){const side=i%2?1:-1,u=((r()+lt*spd*0.18)%1),x=640+side*(90+r()*60)*(0.3+u*4.2),y=432+u*u*230,s=0.12+u*1.3;if(x<-80||x>W+80)continue;ctx.fillStyle='#5b5a3e';ctx.fillRect(x-2*s,y-30*s,4*s,30*s);ctx.fillStyle='#55703a';ell(ctx,x,y-38*s,26*s,16*s);ctx.fill();ell(ctx,x-10*s,y-30*s,14*s,10*s);ctx.fill();}
  for(let k=0;k<7;k++){const u=((k/7+lt*spd*0.25)%1),x=560-u*u*900,y=432+u*u*230,s=0.1+u*1.6;if(x>-60){ctx.fillStyle='#6b6660';ctx.fillRect(x-2*s,y-70*s,4*s,70*s);ctx.fillRect(x-10*s,y-68*s,20*s,3*s);}}
  ctx.fillStyle='#55555c';ctx.beginPath();ctx.moveTo(600,432);ctx.lineTo(680,432);ctx.lineTo(1280,720);ctx.lineTo(0,720);ctx.closePath();ctx.fill();
  ctx.fillStyle='#e8e4d6';for(let k=0;k<7;k++){const u=((lt*spd+k/7)%1),y=432+u*u*288,w=3+u*22,h=5+u*36;ctx.fillRect(640-w/2+(u*u)*14,y,w,h);}
  ctx.fillStyle='rgba(255,200,140,.14)';ctx.fillRect(0,0,W,H);
}
/* the handlebar from the saddle: the mirrors, the chrome bar, the dials, the grips, his hands on them (o.right false = the right hand is off the grip) */
function m2_bikeBars(ctx,lt,o={}){
  const mv=o.spd?1:0.3,y=556+Math.sin(lt*1.1)*3*mv+(o.spd?Math.sin(lt*37)*0.7:0);
  ctx.save();ctx.lineCap='round';
  for(const[mx,d]of[[150,-1],[1130,1]]){ctx.strokeStyle='#2a2a30';ctx.lineWidth=8;ctx.beginPath();ctx.moveTo(mx-d*40,y-20);ctx.quadraticCurveTo(mx-d*10,y-100,mx,y-170);ctx.stroke();
    ctx.fillStyle='#1c1c22';ell(ctx,mx,y-190,46,32,d*0.1);ctx.fill();ctx.fillStyle='#d9c8b8';ell(ctx,mx,y-190,38,25,d*0.1);ctx.fill();ctx.fillStyle='#8b7a74';ell(ctx,mx,y-180,38,12,d*0.1);ctx.fill();ctx.fillStyle='rgba(255,255,255,.3)';ell(ctx,mx-d*10,y-198,14,5,d*0.3);ctx.fill();}
  const bar=dy=>{ctx.beginPath();ctx.moveTo(90,y+10+dy);ctx.quadraticCurveTo(360,y-30+dy,640,y+30+dy);ctx.quadraticCurveTo(920,y-30+dy,1190,y+10+dy);ctx.stroke();};
  ctx.strokeStyle='#3a3a40';ctx.lineWidth=26;bar(0);ctx.strokeStyle='#b9bcc4';ctx.lineWidth=18;bar(0);ctx.strokeStyle='rgba(255,255,255,.45)';ctx.lineWidth=4;bar(-6);
  ctx.fillStyle='#1d1d22';rrect(ctx,560,y+16,160,110,18);ctx.fill();
  ctx.fillStyle='#0f0f13';circle(ctx,606,y+62,36);ctx.fill();circle(ctx,678,y+62,26);ctx.fill();
  ctx.fillStyle='#f3efe4';circle(ctx,606,y+62,30);ctx.fill();circle(ctx,678,y+62,20);ctx.fill();
  ctx.strokeStyle='#333';ctx.lineWidth=1.5;for(let k=0;k<9;k++){const a=Math.PI*0.75+k*Math.PI*1.5/8;ctx.beginPath();ctx.moveTo(606+Math.cos(a)*24,y+62+Math.sin(a)*24);ctx.lineTo(606+Math.cos(a)*28,y+62+Math.sin(a)*28);ctx.stroke();}
  const na=Math.PI*0.75+(o.spd?0.5+0.05*Math.sin(lt*2.3):0.02)*Math.PI*1.5;ctx.strokeStyle='#d8352b';ctx.lineWidth=2.5;ctx.beginPath();ctx.moveTo(606,y+62);ctx.lineTo(606+Math.cos(na)*24,y+62+Math.sin(na)*24);ctx.stroke();
  ctx.beginPath();ctx.moveTo(678,y+62);ctx.lineTo(678+Math.cos(Math.PI*1.3)*16,y+62+Math.sin(Math.PI*1.3)*16);ctx.stroke();
  for(const[gx,d,on]of[[150,-1,o.left!==false],[1130,1,o.right!==false]]){
    ctx.fillStyle='#17171c';rrect(ctx,gx-70,y-16,140,32,14);ctx.fill();ctx.fillStyle='rgba(255,255,255,.08)';for(let k=0;k<8;k++)ctx.fillRect(gx-60+k*16,y-12,6,24);
    if(!on)continue;
    const hx=gx+d*8,hy=y+Math.sin(lt*1.3+gx)*1.5;
    ctx.strokeStyle='#2f3644';ctx.lineWidth=80;ctx.beginPath();ctx.moveTo(hx+d*40,hy+130);ctx.lineTo(hx+d*90,H+70);ctx.stroke();
    ctx.strokeStyle=HIS.skin;ctx.lineWidth=58;ctx.beginPath();ctx.moveTo(hx+d*8,hy+52);ctx.lineTo(hx+d*48,hy+142);ctx.stroke();
    ctx.fillStyle='rgba(0,0,0,.18)';ell(ctx,hx+d*6,hy+40,54,30,0.1*d);ctx.fill();
    ctx.fillStyle=HIS.skin;ell(ctx,hx,hy+26,52,40,0.12*d);ctx.fill();
    for(let k=0;k<4;k++){const kx=hx-36+k*24,ky=hy-8+Math.abs(k-1.5)*3;ctx.fillStyle=HIS.skin;ell(ctx,kx,ky,12,20,0.08*d*(k-1.5));ctx.fill();ctx.strokeStyle='rgba(90,55,35,.3)';ctx.lineWidth=1.2;ell(ctx,kx,ky,12,20,0.08*d*(k-1.5));ctx.stroke();ctx.fillStyle='rgba(90,55,35,.18)';ell(ctx,kx,ky-10,5,3);ctx.fill();}
    ctx.fillStyle=HIS.skin;ell(ctx,hx+d*48,hy+14,14,24,0.5*d);ctx.fill();ctx.fillStyle=HIS.nail;ell(ctx,hx+d*54,hy-2,5,6,0.5*d);ctx.fill();
    ctx.strokeStyle='rgba(255,255,255,.1)';ctx.lineWidth=2;ctx.beginPath();ctx.arc(hx,hy+26,40,Math.PI*1.1,Math.PI*1.6);ctx.stroke();
  }
  ctx.restore();
}
/* her room at half past five: the window going gold, a shelf, a plant, the bed she is sitting on */
function m2_herMorning(){
  const back=mk(W,H),g=back.getContext('2d');
  g.fillStyle=vgrad(g,0,H,[[0,'#f3e9dc'],[0.6,'#e9dccb'],[1,'#cdbfae']]);g.fillRect(0,0,W,H);
  g.fillStyle='#fff6e2';g.fillRect(880,60,320,380);g.fillStyle='#ffd9a8';g.fillRect(892,72,296,356);g.fillStyle=vgrad(g,72,428,[[0,'#9fc4e8'],[0.5,'#f6c99a'],[1,'#ffe3b8']]);g.fillRect(892,72,296,356);
  g.fillStyle='#fff';g.fillRect(1034,72,8,356);g.fillRect(892,244,296,8);
  sunGlow(g,1000,200,520,'rgba(255,236,190,0.85)');
  g.fillStyle='#e8c9c4';g.beginPath();g.moveTo(840,40);g.lineTo(920,40);g.lineTo(900,470);g.lineTo(820,470);g.closePath();g.fill();
  g.fillStyle='rgba(0,0,0,.08)';for(let k=0;k<4;k++){g.beginPath();g.moveTo(850+k*18,40);g.lineTo(856+k*18,40);g.lineTo(846+k*18,470);g.lineTo(838+k*18,470);g.closePath();g.fill();}
  g.fillStyle='#d9c3b2';g.fillRect(60,214,420,12);for(const[x,w,col,h]of[[80,28,'#c95a4a',50],[112,20,'#4a6a9a',44],[136,32,'#6a8a52',56],[172,24,'#d9a441',40],[200,18,'#8a6aa8',52]]){g.fillStyle=col;g.fillRect(x,214-h,w,h);}
  g.fillStyle='#b98a6e';g.fillRect(312,186,40,28);g.fillStyle='#6f8f5a';for(let k=0;k<6;k++){ell(g,332+Math.cos(k*1.1)*18,176-Math.abs(Math.sin(k*1.1))*18,12,6,k*0.6);g.fill();}
  g.fillStyle='rgba(255,230,190,.22)';g.fillRect(0,0,W,H);
  const front=mk(W,H),f=front.getContext('2d');
  f.fillStyle='#f6f1ea';f.beginPath();f.moveTo(0,540);f.quadraticCurveTo(640,500,W,540);f.lineTo(W,720);f.lineTo(0,720);f.closePath();f.fill();
  f.fillStyle='#e3cbd3';f.beginPath();f.moveTo(0,590);f.quadraticCurveTo(420,540,800,610);f.lineTo(740,720);f.lineTo(0,720);f.closePath();f.fill();
  f.fillStyle='rgba(0,0,0,.06)';f.beginPath();f.moveTo(0,600);f.quadraticCurveTo(420,550,800,620);f.lineTo(800,630);f.quadraticCurveTo(420,560,0,610);f.closePath();f.fill();
  return{back,front};
}
/* the packet in her hands: red and yellow, crinkled, two chips showing at the top (drawn in her figure's own coordinates) */
function m2_chipsPacket(ctx,x,y,s,t){
  ctx.save();ctx.translate(x,y);ctx.scale(s,s);
  ctx.fillStyle='#f0d27a';for(const[cx,cy,a]of[[-6,104,-0.5],[8,100,0.4]]){ell(ctx,cx,cy,11,7,a);ctx.fill();ctx.fillStyle='#e2bb5a';ell(ctx,cx,cy+1,9,5,a);ctx.fill();ctx.fillStyle='#f0d27a';}
  ctx.fillStyle='#d8352b';ctx.beginPath();ctx.moveTo(-26,108);ctx.quadraticCurveTo(0,114,26,108);ctx.lineTo(28,172);ctx.quadraticCurveTo(0,178,-28,172);ctx.closePath();ctx.fill();
  ctx.fillStyle='#f3c23b';ell(ctx,0,140,16,12,0.2);ctx.fill();ctx.fillStyle='#d8352b';ell(ctx,0,140,11,7,0.2);ctx.fill();
  ctx.strokeStyle='rgba(255,255,255,.35)';ctx.lineWidth=1.4;for(let k=0;k<4;k++){ctx.beginPath();ctx.moveTo(-22+k*7,112+Math.sin(t*3+k)*1.5);ctx.lineTo(-18+k*7,170);ctx.stroke();}
  ctx.strokeStyle='rgba(120,0,0,.35)';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(-26,110);ctx.quadraticCurveTo(0,116,26,110);ctx.stroke();
  ctx.restore();
}
scene({id:'chips',name:'9 July · chips',when:'2026-07-09T07:18',bars:9,fin:['#000000',1.2],fout:['#000000',1.2],
  note:'half past five on the bike out of town, the sun just up, the road running under the handlebars; a cut to her on her bed with a packet of chips, laughing; then the bike pulled over and the thread on the phone: calories deficit kal, chips aaj; her measured limit; “Ab kia jeena chorh dun”; “Wo tou mere sath jeena hai. Bas jaisi ho waisi rehna.”',
  tag:'“Chips kha rahi thi🤣🤣🤣🤣” · “Wo tou mere sath jeena hai”',
  prep(){return{her:m2_herMorning()};},
  draw(ctx,lt,A){
    if(lt<9.0||lt>=14.6){
      const riding=lt<9.0,spd=riding?0.55:0;
      m2_dawnRoad(ctx,lt,spd);
      if(riding)windRibbons(ctx,lt,5,713,0.22);
      m2_bikeBars(ctx,lt,{spd,right:riding});
      if(!riding){
        const S=drawPhoneHand(ctx,lt,{x:475,y:lerp(760,120,easeOut(smooth(14.6,15.3,lt))),w:330,h:700});
        chatPanel(ctx,S,M2_CHIPS,lt,{name:'Fabeha',status:'online',dark:false});
        jan_phoneTopLight(ctx,S,may_clock(M2_CHIPS,lt,'07:18'));
      }
      sunGlow(ctx,980,396,300,'rgba(255,230,180,0.25)');
    }else{
      const t=lt-9.0;
      ctx.drawImage(A.her.back,0,0);
      const laugh=0.5+0.5*Math.sin(t*9),tilt=0.06+0.05*Math.sin(t*4.5),s=1.25;
      drawFabeha(ctx,640,300+Math.sin(t*9)*3,s,{t:lt,outfit:'home',hair:'down',pose:'bust',arms:'cup',smile:1,eyes:'happy',blush:0.6,tilt,look:0,len:240,wind:0.03});
      m2_chipsPacket(ctx,640+Math.sin(t*4.5)*2,300+Math.sin(t*9)*3,s,lt);
      ctx.drawImage(A.her.front,0,0);
      for(let k=0;k<3;k++){const age=(t*0.9+k*0.37)%1.1,x=560+k*70+Math.sin(age*7+k)*10,y=250-age*60;ctx.fillStyle=`rgba(80,50,30,${(0.55*(1-age/1.1)).toFixed(3)})`;ctx.font='600 16px "Mulish",sans-serif';ctx.textAlign='center';ctx.fillText('ha',x,y);}
      glow(ctx,1000,220,420,'#ffe6b0',0.22*(0.8+0.2*laugh));
    }
    const dip=Math.max(smooth(8.5,9.0,lt)*(1-smooth(9.0,9.6,lt)),smooth(14.1,14.6,lt)*(1-smooth(14.6,15.2,lt)));
    if(dip>0){ctx.fillStyle=`rgba(0,0,0,${dip.toFixed(3)})`;ctx.fillRect(0,0,W,H);}
  },
  subs:[
    [0.8,4.8,'9 July. Half past five in the morning, on the bike, and one thought: what would she be doing right now?'],
    [5.4,8.4,'Something graceful, I decided. Something with discipline.'],
    [9.6,11.6,'Chips kha rahi thi🤣🤣🤣🤣','her'],
    [12.2,14.2,'Chips. At half past five.'],
    [15.2,16.5,'Bike chalate waqt / Ke tum kya karahi hogi','him'],
    [16.8,18.0,'Chips kha rahi thi🤣🤣🤣🤣','her'],
    [18.6,20.2,'Kal calories deficit / Ki baat krke / Khud chios kharahi','him'],
    [20.6,22.4,'Aray aisa nhi khati ussi ko measure karkay khati hun withi calorie limit','her'],
    [22.8,24.0,'Mine is around 1500 / 1500-1600','her'],
    [24.4,25.6,'Ab kia jeena chorh dun 😭😭😭😭','her'],
    [26.0,27.0,'Wo tou mere sath jeena hai','him'],
    [27.4,29.2,'Bas jaisi ho waisi rehna','him'],
  ],
  score({hit,melody,bars,CH,THEME_C}){
    const ch=['G','Cmaj7','Am7','D'];
    bars(0,9,ch,{padVel:0.28,bass:true,bassVel:0.3});
    for(let b=0;b<9;b++){const p=CH[ch[b%4]].p;for(let q=0;q<4;q++)if(b<3||b>=4)hit(b*BAR+q*BEAT,'pluck',{midi:p[(q+1)%4]+12,vel:b<3?0.4:0.3});}
    for(let b=0;b<3;b++)melody(b,b,'flute',0,0.3,THEME_C);
    hit(1.6,'bird',{});hit(3.1,'bird',{f:3400});hit(10.2,'bird',{f:2600});hit(12.4,'bird',{f:3100});
    hit(9.1,'chime',{midi:91,vel:0.3});hit(9.4,'chime',{midi:95,vel:0.2});
    for(const m of M2_CHIPS)hit(m.at,'tick',{hi:m.who==='her'});
    hit(25.9,'chime',{midi:88,vel:0.26});hit(27.3,'chime',{midi:91,vel:0.22});
  },
  amb(lt){return lt<9?{hum:0.6,wind:0.26}:lt<14.6?{room:0.2,wind:0.04}:{wind:0.12,crowd:0.04,hum:0.06};},
});

/* ================================================================================================
   Her trust — between “Who would” and “Please don’t be”
   ================================================================================================ */
const M2_TRUST=[
  {at:1.4, until:8.0, size:58,text:'You put your trust in me. That is why so many of your firsts were with me.'},
  {at:8.6, until:15.2,size:56,text:'The first late-night calls. The first time you texted someone every single day.'},
  {at:15.8,until:23.8,size:54,text:'The first time you sat in a car beside someone, for hours, and were not in a hurry to leave.'},
  {at:24.4,until:30.6,size:56,text:'Being with someone for hours. Letting that someone be me.'},
  {at:31.2,until:38.4,size:60,text:'I know what that cost you. I know what it was worth.'},
];
scene({id:'trust',name:'Her trust',when:'2026-09-06T23:47:45',bars:13,fin:['#000000',1.4],fout:['#000000',1.6],
  note:'the same room and light, Fabeha softly behind a dark band; his acknowledgement in cream, one line at a time: she put her trust in him, and that is why so many of her firsts were with him — the late-night calls, texting someone every day, the car for hours, being with someone for hours; he knows what it cost her and what it was worth. The band goes, and she is there in the light for a moment.',
  tag:'“I know what that cost you. I know what it was worth.”',
  prep(){return{room:s3_room(),vig:s3_vignette()};},
  draw(ctx,lt,A){
    const dim=0.42*smooth(0.8,1.8,lt)*(1-smooth(38.8,40.0,lt));
    const cost=smooth(31.4,34,lt),after=smooth(38.8,40.2,lt);
    s4_room(ctx,lt,A,1+0.03*smooth(0,43,lt),{smile:lerp(0.28,0.5,smooth(8,36,lt))+0.04*after,brow:lerp(0.02,0.1,cost)*(1-0.5*after),tilt:0.04*Math.sin(lt*0.3)+0.02,blush:lerp(0.32,0.46,cost),seed:947});
    if(dim>0){ctx.fillStyle=`rgba(3,3,7,${dim.toFixed(3)})`;ctx.fillRect(0,0,W,H);}
    for(const c of M2_TRUST){const a=smooth(c.at-0.2,c.at+0.7,lt)*(1-smooth(c.until-0.6,c.until+0.1,lt));s4_band(ctx,c.text,a,{size:c.size,y:330});}
  },
  subs:M2_TRUST.map(c=>[c.at+0.2,c.until-0.6,c.text]),
  score({add,T,at,hit,pad,melody,THEME_B,THEME_B_CH}){
    for(let i=0;i<8;i++){pad(T(i),THEME_B_CH[i],1.05,0.2,'strings');if(i>=1)melody(i,i,'piano',0,0.24,THEME_B);}
    ['Em','Cmaj7','Am7','G','Em'].forEach((c,k)=>pad(T(8+k),c,1.05,0.22,'strings'));
    [[27.2,64],[29.8,62],[33.0,59],[35.8,64],[38.6,67]].forEach(([t,m])=>add(at(t),'piano',{midi:m,dur:3,vel:0.18}));
    hit(1.8,'chime',{midi:91,vel:0.26});hit(31.6,'chime',{midi:95,vel:0.3});
    add(T(12),'piano',{midi:52,dur:4,vel:0.2});add(T(12),'piano',{midi:64,dur:4,vel:0.16});
  },
  amb(){return{room:0.14};},
});

/* ================================================================================================
   In your forties — after “Eik hi iltija”, before the end card (19 March, lines 11157–11166)
   ================================================================================================ */
/* the bedroom of a future morning, seen looking down: the floor, the bed's edge at the left, the window and the garden at the top */
function m2_futureRoom(){
  const c=mk(W,H),g=c.getContext('2d');
  g.fillStyle=vgrad(g,0,H,[[0,'#f6efe4'],[0.42,'#efe5d6'],[1,'#d8c9b4']]);g.fillRect(0,0,W,H);
  g.fillStyle='#fffaf0';g.fillRect(300,20,700,250);
  g.save();g.beginPath();g.rect(316,36,668,220);g.clip();
  g.fillStyle=vgrad(g,36,256,[[0,'#9ccbf0'],[0.4,'#d8ecf7'],[0.55,'#8fbf6a'],[1,'#5f9a4a']]);g.fillRect(316,36,668,220);
  g.fillStyle='#3a5a30';g.fillRect(820,120,14,80);g.fillStyle='#4f8a46';for(const[x,y,r]of[[826,110,52],[790,128,38],[862,130,40],[826,92,34]]){circle(g,x,y,r);g.fill();}g.fillStyle='rgba(255,255,255,.12)';circle(g,812,96,26);g.fill();
  g.fillStyle='#6fa85a';ell(g,420,150,70,40);g.fill();ell(g,480,160,50,30);g.fill();
  const r=rng(2046);for(let i=0;i<70;i++){const x=320+r()*660,y=176+r()*70;g.fillStyle=['#e86a8a','#f3c24a','#ffffff','#c86ad8'][i%4];circle(g,x,y,2.5+r()*2.5);g.fill();}
  g.fillStyle='rgba(255,246,210,.35)';g.fillRect(316,36,668,220);
  g.restore();
  g.fillStyle='#fffaf0';g.fillRect(644,20,12,250);g.fillRect(300,140,700,10);
  g.strokeStyle='#d9ccb8';g.lineWidth=4;g.strokeRect(300,20,700,250);
  g.fillStyle='#e9dfcf';g.fillRect(0,270,W,60);g.fillStyle='#d4c6b0';g.fillRect(0,326,W,10);
  g.fillStyle=vgrad(g,336,H,[[0,'#caa57a'],[1,'#a67f58']]);g.fillRect(0,336,W,H-336);
  g.strokeStyle='rgba(80,50,30,.18)';g.lineWidth=2;for(let k=0;k<9;k++){const y=336+k*k*5.2;g.beginPath();g.moveTo(0,y);g.lineTo(W,y);g.stroke();}
  for(let k=-5;k<=5;k++){g.beginPath();g.moveTo(640+k*120,336);g.lineTo(640+k*260,H);g.stroke();}
  g.fillStyle='#f7f3ec';g.beginPath();g.moveTo(0,300);g.lineTo(260,330);g.lineTo(200,720);g.lineTo(0,720);g.closePath();g.fill();
  g.fillStyle='#d9c3cf';g.beginPath();g.moveTo(0,420);g.lineTo(230,440);g.lineTo(210,520);g.lineTo(0,540);g.closePath();g.fill();
  g.fillStyle='rgba(0,0,0,.08)';g.beginPath();g.moveTo(260,330);g.lineTo(300,340);g.lineTo(230,720);g.lineTo(200,720);g.closePath();g.fill();
  g.fillStyle='rgba(255,236,190,.35)';g.beginPath();g.moveTo(330,336);g.lineTo(980,336);g.lineTo(1180,720);g.lineTo(420,720);g.closePath();g.fill();
  return c;
}
/* the hallway to the garden door, the same gaze: walls either side with a door each, the open door at the end full of green */
function m2_hall(){
  const c=mk(W,H),g=c.getContext('2d');
  g.fillStyle=vgrad(g,0,H,[[0,'#efe6d8'],[0.4,'#e6dccb'],[1,'#d3c4ae']]);g.fillRect(0,0,W,H);
  g.fillStyle='#7a5a3c';g.fillRect(540,0,200,300);g.fillStyle=vgrad(g,0,300,[[0,'#bfe3f5'],[0.5,'#9ccf78'],[1,'#5f9a4a']]);g.fillRect(556,0,168,290);glow(g,640,150,300,'#ffffd8',0.5);
  g.fillStyle='#e2d6c3';g.beginPath();g.moveTo(0,0);g.lineTo(540,0);g.lineTo(540,300);g.lineTo(0,420);g.closePath();g.fill();
  g.beginPath();g.moveTo(W,0);g.lineTo(740,0);g.lineTo(740,300);g.lineTo(W,420);g.closePath();g.fill();
  g.fillStyle='#8a6a4a';g.beginPath();g.moveTo(120,60);g.lineTo(300,80);g.lineTo(300,330);g.lineTo(120,380);g.closePath();g.fill();
  g.beginPath();g.moveTo(1160,60);g.lineTo(980,80);g.lineTo(980,330);g.lineTo(1160,380);g.closePath();g.fill();
  g.fillStyle='#d9b45c';circle(g,286,210,5);g.fill();circle(g,994,210,5);g.fill();
  g.fillStyle='#d4c6b0';g.beginPath();g.moveTo(0,420);g.lineTo(540,300);g.lineTo(540,310);g.lineTo(0,432);g.closePath();g.fill();g.beginPath();g.moveTo(W,420);g.lineTo(740,300);g.lineTo(740,310);g.lineTo(W,432);g.closePath();g.fill();
  g.fillStyle=vgrad(g,300,H,[[0,'#b08a60'],[1,'#a67f58']]);g.beginPath();g.moveTo(540,300);g.lineTo(740,300);g.lineTo(W,432);g.lineTo(W,H);g.lineTo(0,H);g.lineTo(0,432);g.closePath();g.fill();
  g.fillStyle='rgba(255,246,200,.35)';g.beginPath();g.moveTo(556,300);g.lineTo(724,300);g.lineTo(900,720);g.lineTo(380,720);g.closePath();g.fill();
  return c;
}
/* his arms under her, from his own eyes: the left under her shoulders, the right under her knees, his shoulder at the left edge and his chest along the bottom */
function m2_hisArms(ctx,lt){
  const sleeve='#5e6b7a',skin=HIS.skin;
  ctx.save();ctx.lineCap='round';
  ctx.fillStyle='#55637a';ctx.beginPath();ctx.moveTo(-20,360);ctx.quadraticCurveTo(170,380,170,560);ctx.quadraticCurveTo(150,700,60,780);ctx.lineTo(-20,780);ctx.closePath();ctx.fill();
  ctx.fillStyle='#4a5870';ctx.beginPath();ctx.moveTo(0,650);ctx.quadraticCurveTo(640,600,W,660);ctx.lineTo(W,780);ctx.lineTo(0,780);ctx.closePath();ctx.fill();
  ctx.strokeStyle=sleeve;ctx.lineWidth=100;ctx.beginPath();ctx.moveTo(150,780);ctx.quadraticCurveTo(230,560,330,470);ctx.stroke();
  ctx.strokeStyle=skin;ctx.lineWidth=80;ctx.beginPath();ctx.moveTo(310,490);ctx.quadraticCurveTo(380,410,500,330);ctx.stroke();
  ctx.strokeStyle=sleeve;ctx.lineWidth=100;ctx.beginPath();ctx.moveTo(1180,780);ctx.quadraticCurveTo(1080,580,960,500);ctx.stroke();
  ctx.strokeStyle=skin;ctx.lineWidth=80;ctx.beginPath();ctx.moveTo(990,520);ctx.quadraticCurveTo(910,450,850,410);ctx.stroke();
  for(const[hx,hy,rot]of[[530,296,-0.6],[876,382,-0.3]]){
    ctx.save();ctx.translate(hx,hy);ctx.rotate(rot);
    ctx.fillStyle=skin;ell(ctx,0,0,38,30);ctx.fill();
    for(let k=0;k<4;k++){const kx=-30+k*20;ctx.fillStyle=skin;ell(ctx,kx,-26,10,18,(k-1.5)*0.08);ctx.fill();ctx.strokeStyle='rgba(90,55,35,.3)';ctx.lineWidth=1.2;ell(ctx,kx,-26,10,18,(k-1.5)*0.08);ctx.stroke();ctx.fillStyle=HIS.nail;ell(ctx,kx,-40,4.5,4,0);ctx.fill();}
    ctx.restore();}
  ctx.restore();
}
/* her arm up to his shoulder: from her near shoulder, the sleeve across, her hand resting on him */
function m2_herArmOnHim(ctx,lt){
  ctx.save();ctx.lineCap='round';
  const hx=128+Math.sin(lt*0.7)*2,hy=520+Math.sin(lt*0.9)*2;
  ctx.strokeStyle=SLEEVE.sweater;ctx.lineWidth=44;ctx.beginPath();ctx.moveTo(560,520);ctx.quadraticCurveTo(380,560,hx+60,hy+10);ctx.stroke();
  ctx.strokeStyle='rgba(0,0,0,.08)';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(560,520);ctx.quadraticCurveTo(380,560,hx+60,hy+10);ctx.stroke();
  ctx.fillStyle='rgba(0,0,0,.16)';ell(ctx,hx+6,hy+12,40,26,0.2);ctx.fill();
  ctx.fillStyle=FB.skin;ell(ctx,hx,hy,34,26,0.2);ctx.fill();
  for(let k=0;k<4;k++){const a=-1.5-(k-1.5)*0.28,len=36-Math.abs(k-1.5)*4,ex=hx-8+Math.cos(a)*len,ey=hy+Math.sin(a)*len;ctx.strokeStyle=FB.skinSh;ctx.lineWidth=14;ctx.beginPath();ctx.moveTo(hx-8+k*8,hy-6);ctx.lineTo(ex,ey);ctx.stroke();ctx.strokeStyle=FB.skin;ctx.lineWidth=11.5;ctx.beginPath();ctx.moveTo(hx-8+k*8,hy-6);ctx.lineTo(ex,ey);ctx.stroke();ctx.fillStyle='#f1d2c6';ell(ctx,ex,ey,4,3,a);ctx.fill();}
  ctx.strokeStyle=FB.skin;ctx.lineWidth=12;ctx.beginPath();ctx.moveTo(hx+22,hy+8);ctx.quadraticCurveTo(hx+40,hy-2,hx+44,hy-18);ctx.stroke();
  ctx.restore();
}
/* her hair, falling back from her head and down over his arm (gravity, not the figure's own down): a dark spill behind the head, a few locks over the sleeve */
function m2_hairSpill(ctx,lt){
  ctx.save();ctx.translate(430,380);ctx.scale(1.9,1.9);ctx.rotate(-1.35);
  const sw=Math.sin(lt*0.9)*2;
  ctx.fillStyle=FB.hair;
  ctx.beginPath();ctx.moveTo(-50,-20);ctx.bezierCurveTo(-96,-40,-150,-60+sw,-176,-28);ctx.bezierCurveTo(-196,0,-184,40,-150,52);ctx.bezierCurveTo(-120,62,-90,50,-60,40);ctx.bezierCurveTo(-54,20,-56,0,-50,-20);ctx.closePath();ctx.fill();
  ctx.beginPath();ctx.moveTo(-40,30);ctx.bezierCurveTo(-70,70,-120,90+sw,-160,96);ctx.bezierCurveTo(-180,98,-186,84,-170,74);ctx.bezierCurveTo(-130,60,-90,40,-44,10);ctx.closePath();ctx.fill();
  ctx.strokeStyle=FB.hairMid;ctx.globalAlpha=0.6;ctx.lineWidth=1.6;
  for(let k=0;k<7;k++){const y0=-14+k*8;ctx.beginPath();ctx.moveTo(-54,y0);ctx.bezierCurveTo(-100,y0-18+k,-140,y0-10+sw,-172+k*2,y0+6+k*2);ctx.stroke();}
  ctx.strokeStyle=FB.hairHi;ctx.globalAlpha=0.4;ctx.lineWidth=2.2;ctx.beginPath();ctx.moveTo(-70,-26);ctx.bezierCurveTo(-110,-40,-150,-40,-170,-20);ctx.stroke();ctx.globalAlpha=1;
  ctx.restore();
}
/* a few grey strands, in her figure's own coordinates: along the front hair from the parting, and in the hair behind */
function m2_greyStrands(ctx,x,y,s,lean){
  ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.rotate(lean);ctx.lineCap='round';
  ctx.strokeStyle='rgba(232,230,236,.78)';ctx.lineWidth=1.5;
  for(const[d,k]of[[-1,0],[-1,1],[1,0],[1,1],[-1,2],[1,2]]){ctx.beginPath();ctx.moveTo(d*(3+k*2),-54+k*1.5);ctx.bezierCurveTo(d*(14+k*4),-50+k*2,d*(30+k*3),-36+k*4,d*(38+k*2),-8+k*10);ctx.stroke();}
  ctx.strokeStyle='rgba(232,230,236,.5)';ctx.lineWidth=1.2;for(let k=0;k<3;k++){const y0=-10+k*12;ctx.beginPath();ctx.moveTo(-56,y0);ctx.bezierCurveTo(-100,y0-14,-140,y0-6,-168,y0+8);ctx.stroke();}
  ctx.restore();
}
scene({id:'forties',name:'In your forties',when:'2026-09-06T23:50:30',bars:14,fin:['#000000',1.6],fout:['#000000',2.0],
  note:'a future morning, painted: a warm house, the window full of garden; looking down at her in his arms, his two arms under her, her face up to him, a few grey strands in her hair and the same smile; her hand on his shoulder; then the hallway passing as he carries her, and the garden door opening into green light. Her theme whole on the strings; a chime.',
  tag:'“Easy scene hai. Mein hoon na.”',
  prep(){return{room:m2_futureRoom(),hall:m2_hall(),vig:m2_softVig()};},
  draw(ctx,lt,A){
    const walk=smooth(20,23,lt),hall=smooth(21,23.5,lt),garden=smooth(37,42,lt);
    const bobY=Math.sin(lt*4.4)*6*walk,bobX=Math.sin(lt*2.2)*4*walk,breathe=Math.sin(lt*0.9)*2;
    ctx.drawImage(A.room,0,0);
    if(hall>0){ctx.save();ctx.globalAlpha=hall;ctx.drawImage(A.hall,0,0);
      ctx.strokeStyle='rgba(80,50,30,.2)';ctx.lineWidth=2;for(let k=0;k<10;k++){const u=((k/10+lt*0.14)%1),y=300+u*u*420,x0=640-(100+u*560),x1=640+(100+u*560);ctx.beginPath();ctx.moveTo(x0,y);ctx.lineTo(x1,y);ctx.stroke();}
      ctx.restore();}
    if(garden>0){ctx.save();ctx.globalCompositeOperation='screen';glow(ctx,640,60,780,'#eaffc8',0.55*garden);ctx.restore();bokeh(ctx,lt,14,2046,['#d8ffb0','#fff0a0','#ffffff'],10,36,0.35*garden);}
    ctx.save();ctx.globalCompositeOperation='screen';glow(ctx,640,150,620,'#fff0c8',0.22);ctx.restore();
    ctx.save();ctx.translate(bobX,bobY+breathe);
    m2_hisArms(ctx,lt);
    m2_hairSpill(ctx,lt);
    const sm=lerp(0.78,1,smooth(30,40,lt)),happy=lt>=39.6;
    drawFabeha(ctx,430,380,1.9,{t:lt,outfit:'sweater',hair:'low',pose:'knees',legCol:'#8d9db5',lean:-1.35,look:0.02*Math.sin(lt*0.7),smile:sm,blush:0.46,brow:0.05,eyes:happy?'happy':undefined,len:230,wind:0.03});
    m2_greyStrands(ctx,430,380,1.9,-1.35);
    m2_herArmOnHim(ctx,lt);
    ctx.restore();
    ctx.fillStyle='rgba(255,226,180,.10)';ctx.fillRect(0,0,W,H);
    ctx.drawImage(A.vig,0,0);
    if(garden>0){ctx.fillStyle=`rgba(255,250,230,${(0.18*garden).toFixed(3)})`;ctx.fillRect(0,0,W,H);}
  },
  subs:[
    [1.0,6.0,'You told me once: in my forties, the arthritis may come. Mere genes mein hai.'],
    [6.8,10.4,'Easy scene hai, I said. Mein hoon na.'],
    [12.0,17.0,'So here is the whole scene. When it comes, I carry you.'],
    [17.8,23.6,'From the bed to the garden, from the garden to the car. Every day, for as long as it takes.'],
    [25.0,30.0,'You will not have to walk a single step you don’t want to.'],
    [32.0,37.0,'A few grey strands by then, and the same smile. Easy scene hai.'],
    [39.6,43.4,'Mein hoon na.'],
  ],
  score({add,T,hit,pad,melody,THEME_B,THEME_B_CH}){
    /* her theme whole on the piano over soft strings (bars 0–7), then whole on the strings, the low strings under it (bars 8–13), a chime as the garden opens */
    for(let i=0;i<8;i++){pad(T(i),THEME_B_CH[i],1.05,0.22,'strings');melody(i,i,'piano',0,0.26,THEME_B);}
    for(let i=0;i<6;i++){const b=8+i;pad(T(b),THEME_B_CH[i],1.05,0.3+0.1*i/5,'strings');let beat=0;for(const[m,d]of THEME_B[i]){add(T(b,beat),'strings',{notes:[m,m-12],dur:d*BEAT*1.1,vel:0.3+0.06*i/5});beat+=d;}melody(b,i,'piano',12,0.14,THEME_B);}
    hit(38.8,'chime',{midi:95,vel:0.4});hit(39.4,'chime',{midi:100,vel:0.28});hit(40.0,'chime',{midi:103,vel:0.2});
    pad(T(13)+1.2,'Em',1.0,0.3,'strings');add(T(13)+1.2,'piano',{midi:52,dur:4,vel:0.22});add(T(13)+1.2,'piano',{midi:64,dur:4,vel:0.18});
  },
  amb(lt){return{room:0.1,wind:0.06+0.1*smooth(37,42,lt)};},
});
