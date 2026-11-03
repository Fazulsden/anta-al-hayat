/* jun.js — June 2026: the 4:01 call (a night of Snapchat and Instagram calls), and 12 baaje — DHA Phase 6 to campus with the zamzam bottle, the counter closing at one, her call. */
'use strict';

/* a WhatsApp call screen (the IBA calls on 30 June): mode 'out' (calling her) · 'in' (she is calling) · 'live' (connected, sub = timer) · 'ended' */
function jun_callScreen(ctx,S,o,lt){
  ctx.save();rrect(ctx,S.x,S.y,S.w,S.h,S.r);ctx.clip();
  ctx.fillStyle=vgrad(ctx,S.y,S.y+S.h,[[0,'#10202a'],[1,'#071015']]);ctx.fillRect(S.x,S.y,S.w,S.h);
  const cx=S.x+S.w/2;
  ctx.fillStyle='#8696a0';ctx.font='500 13px "Mulish",sans-serif';ctx.textAlign='center';ctx.fillText(o.top||'WhatsApp voice call',cx,S.y+68);
  ctx.fillStyle='#e9edef';ctx.font='300 30px "Mulish",sans-serif';ctx.fillText(o.name||'Fabeha',cx,S.y+110);
  ctx.fillStyle=o.mode==='ended'?'#ff6b6b':'#aebac1';ctx.font='500 15px "Mulish",sans-serif';ctx.fillText(o.sub||'',cx,S.y+140);
  const ay=S.y+270;
  if(o.mode==='in'||o.mode==='out'){const p=(lt*1.1)%1;ctx.strokeStyle=`rgba(37,211,102,${0.55*(1-p)})`;ctx.lineWidth=3;circle(ctx,cx,ay,60+p*44);ctx.stroke();}
  ctx.fillStyle='#d8b4a0';circle(ctx,cx,ay,54);ctx.fill();ctx.fillStyle='#2a1d22';ell(ctx,cx,ay-12,40,34);ctx.fill();ctx.fillStyle='#f3d8c4';ell(ctx,cx,ay+4,28,32);ctx.fill();ctx.fillStyle='#2a1d22';ctx.fillRect(cx-38,ay-20,16,62);ctx.fillRect(cx+22,ay-20,16,62);
  const by=S.y+S.h-120;ctx.textBaseline='middle';
  if(o.mode==='in'){
    const jig=Math.sin(lt*16)*2;
    ctx.fillStyle='#ff3b30';circle(ctx,cx-70,by,34);ctx.fill();ctx.fillStyle='#25d366';circle(ctx,cx+70,by+jig,34);ctx.fill();
    ctx.fillStyle='#fff';ctx.font='22px serif';ctx.fillText('📞',cx-70,by+1);ctx.fillText('📞',cx+70,by+1+jig);
    ctx.textBaseline='alphabetic';ctx.fillStyle='#e9edef';ctx.font='500 12px "Mulish",sans-serif';ctx.fillText('Decline',cx-70,by+58);ctx.fillText('Accept',cx+70,by+58);
  }else{
    for(const[dx,ic]of[[-80,'🔇'],[0,'🔊'],[80,'📹']]){ctx.fillStyle='rgba(255,255,255,.12)';circle(ctx,cx+dx,by-70,26);ctx.fill();ctx.fillStyle='#fff';ctx.font='18px serif';ctx.fillText(ic,cx+dx,by-69);}
    ctx.fillStyle='#ff3b30';circle(ctx,cx,by+10,34);ctx.fill();ctx.fillStyle='#fff';ctx.font='22px serif';ctx.fillText('📞',cx,by+11);
  }
  ctx.textBaseline='alphabetic';ctx.restore();
}
/* the phone's status bar in dark text, for a light screen */
function jun_topDark(ctx,S,time){
  ctx.save();rrect(ctx,S.x,S.y,S.w,S.h,S.r);ctx.clip();
  ctx.fillStyle='#0e0e12';rrect(ctx,S.x+S.w/2-44,S.y+8,88,24,12);ctx.fill();
  ctx.fillStyle='#111';ctx.font='600 13px "Mulish",sans-serif';ctx.textAlign='left';ctx.fillText(time,S.x+22,S.y+26);
  ctx.textAlign='right';ctx.font='500 12px "Mulish",sans-serif';ctx.fillText('●●●  ⌔  ▮',S.x+S.w-18,S.y+26);
  ctx.restore();
}
/* the Snapchat ghost, centred on (x,y) */
function jun_ghost(ctx,x,y,r){
  ctx.save();ctx.translate(x,y);ctx.scale(r/10,r/10);
  ctx.beginPath();ctx.moveTo(-9,-1);ctx.arc(0,-1,9,Math.PI,0);ctx.lineTo(9,7);ctx.lineTo(6,5);ctx.lineTo(3,9);ctx.lineTo(0,6);ctx.lineTo(-3,9);ctx.lineTo(-6,5);ctx.lineTo(-9,7);ctx.closePath();
  ctx.fillStyle='#fff';ctx.fill();ctx.strokeStyle='#111';ctx.lineWidth=1.4;ctx.stroke();
  ctx.restore();
}
/* the night's call list in Snapchat's style (white, yellow top): entries {at,t:'01:19',d:'14 min',out}, newest at the top */
function jun_snapLog(ctx,S,entries,lt){
  ctx.save();rrect(ctx,S.x,S.y,S.w,S.h,S.r);ctx.clip();
  ctx.fillStyle='#ffffff';ctx.fillRect(S.x,S.y,S.w,S.h);
  ctx.fillStyle='#fffc00';ctx.fillRect(S.x,S.y,S.w,98);
  jun_ghost(ctx,S.x+S.w/2,S.y+68,11);
  ctx.fillStyle='#111';ctx.font='700 17px "Mulish",sans-serif';ctx.textAlign='left';ctx.fillText('Calls',S.x+18,S.y+74);
  ctx.textAlign='right';ctx.font='600 16px "Mulish",sans-serif';ctx.fillText('⋯',S.x+S.w-18,S.y+74);
  ctx.fillStyle='#8a8a8a';ctx.font='700 11px "Mulish",sans-serif';ctx.textAlign='left';ctx.fillText('RECENT',S.x+18,S.y+122);
  const vis=entries.filter(e=>e.at<=lt),rowH=60,maxRows=Math.floor((S.h-140)/rowH);
  let y=S.y+134;
  for(let i=vis.length-1,k=0;i>=0&&k<maxRows;i--,k++){
    const e=vis[i],age=lt-e.at;
    ctx.save();ctx.globalAlpha=k===0?clamp(age/0.25):1;
    ctx.fillStyle='#fff3a6';circle(ctx,S.x+36,y+26,19);ctx.fill();ctx.fillStyle='#2a1d22';ell(ctx,S.x+36,y+22,14,12);ctx.fill();ctx.fillStyle='#f3d8c4';ell(ctx,S.x+36,y+28,10,11);ctx.fill();ctx.fillStyle='#2a1d22';ctx.fillRect(S.x+23,y+16,6,22);ctx.fillRect(S.x+43,y+16,6,22);
    ctx.fillStyle='#111';ctx.font='700 15px "Mulish",sans-serif';ctx.textAlign='left';ctx.fillText('Fabeha',S.x+68,y+22);
    const ax=S.x+70,ay=y+40;ctx.strokeStyle=e.out?'#0fadff':'#00c853';ctx.lineWidth=2;ctx.lineCap='round';ctx.beginPath();
    if(e.out){ctx.moveTo(ax,ay+4);ctx.lineTo(ax+9,ay-5);ctx.moveTo(ax+3,ay-5);ctx.lineTo(ax+9,ay-5);ctx.lineTo(ax+9,ay+1);}
    else{ctx.moveTo(ax+9,ay-5);ctx.lineTo(ax,ay+4);ctx.moveTo(ax+6,ay+4);ctx.lineTo(ax,ay+4);ctx.lineTo(ax,ay-2);}
    ctx.stroke();
    ctx.fillStyle='#7a7a7a';ctx.font='500 12px "Mulish",sans-serif';ctx.fillText('Voice call · '+e.d,S.x+86,y+44);
    ctx.fillStyle='#9a9a9a';ctx.textAlign='right';ctx.fillText(e.t,S.x+S.w-44,y+24);
    ctx.fillStyle='#f0f0f0';circle(ctx,S.x+S.w-26,y+40,13);ctx.fill();ctx.fillStyle='#111';ctx.font='12px serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('📞',S.x+S.w-26,y+41);ctx.textBaseline='alphabetic';
    ctx.restore();
    ctx.fillStyle='rgba(0,0,0,.06)';ctx.fillRect(S.x+68,y+rowH-4,S.w-80,1);
    y+=rowH;
  }
  ctx.restore();
}
/* an Instagram audio-call screen (purple → pink → orange): mode 'live' (sub = timer) · 'ended' */
function jun_instaCall(ctx,S,o,lt){
  ctx.save();rrect(ctx,S.x,S.y,S.w,S.h,S.r);ctx.clip();
  const g=ctx.createLinearGradient(S.x,S.y,S.x+S.w,S.y+S.h);g.addColorStop(0,'#4a2a8a');g.addColorStop(0.5,'#c13584');g.addColorStop(1,'#f5804e');ctx.fillStyle=g;ctx.fillRect(S.x,S.y,S.w,S.h);
  const cx=S.x+S.w/2;
  ctx.fillStyle='rgba(255,255,255,.85)';ctx.font='500 13px "Mulish",sans-serif';ctx.textAlign='center';ctx.fillText(o.top||'Instagram audio call',cx,S.y+68);
  ctx.fillStyle='#fff';ctx.font='300 30px "Mulish",sans-serif';ctx.fillText(o.name||'Fabeha',cx,S.y+110);
  ctx.fillStyle=o.mode==='ended'?'#ffe0e0':'rgba(255,255,255,.9)';ctx.font='500 15px "Mulish",sans-serif';ctx.fillText(o.sub||'',cx,S.y+140);
  const ay=S.y+270;
  ctx.strokeStyle='rgba(255,255,255,.9)';ctx.lineWidth=3;circle(ctx,cx,ay,61);ctx.stroke();
  ctx.fillStyle='#d8b4a0';circle(ctx,cx,ay,54);ctx.fill();ctx.fillStyle='#2a1d22';ell(ctx,cx,ay-12,40,34);ctx.fill();ctx.fillStyle='#f3d8c4';ell(ctx,cx,ay+4,28,32);ctx.fill();ctx.fillStyle='#2a1d22';ctx.fillRect(cx-38,ay-20,16,62);ctx.fillRect(cx+22,ay-20,16,62);
  const by=S.y+S.h-120;ctx.textBaseline='middle';
  for(const[dx,ic]of[[-80,'🔇'],[0,'🔊'],[80,'📹']]){ctx.fillStyle='rgba(255,255,255,.22)';circle(ctx,cx+dx,by-70,26);ctx.fill();ctx.fillStyle='#fff';ctx.font='18px serif';ctx.fillText(ic,cx+dx,by-69);}
  ctx.fillStyle='#ff3b30';circle(ctx,cx,by+10,34);ctx.fill();ctx.fillStyle='#fff';ctx.font='22px serif';ctx.fillText('📞',cx,by+11);
  ctx.textBaseline='alphabetic';ctx.restore();
}
/* a small zamzam bottle, base at (x,y) */
function jun_bottle(ctx,x,y,s){
  ctx.save();ctx.translate(x,y);ctx.scale(s,s);
  ctx.fillStyle='rgba(0,0,0,.25)';ell(ctx,0,2,30,8);ctx.fill();
  ctx.fillStyle='rgba(200,228,246,.9)';rrect(ctx,-22,-122,44,122,10);ctx.fill();
  ctx.fillStyle='rgba(185,215,238,.95)';ctx.beginPath();ctx.moveTo(-22,-112);ctx.quadraticCurveTo(-22,-136,-10,-140);ctx.lineTo(10,-140);ctx.quadraticCurveTo(22,-136,22,-112);ctx.closePath();ctx.fill();
  ctx.fillStyle='#1f6fbf';rrect(ctx,-11,-158,22,20,4);ctx.fill();
  ctx.fillStyle='#ffffff';rrect(ctx,-22,-98,44,54,4);ctx.fill();ctx.fillStyle='#1f6fbf';ctx.fillRect(-22,-98,44,12);ctx.fillRect(-22,-52,44,6);
  ctx.fillStyle='#1f6fbf';ctx.font='700 9px "Mulish",sans-serif';ctx.textAlign='center';ctx.fillText('ZAMZAM',0,-66);
  ctx.fillStyle='rgba(255,255,255,.4)';rrect(ctx,-16,-114,6,92,3);ctx.fill();
  ctx.restore();
}
/* a brown paper bag, base at (x,y) */
function jun_bag(ctx,x,y,s){
  ctx.save();ctx.translate(x,y);ctx.scale(s,s);
  ctx.fillStyle='rgba(0,0,0,.25)';ell(ctx,0,2,54,9);ctx.fill();
  ctx.fillStyle='#c9a77a';ctx.beginPath();ctx.moveTo(-50,0);ctx.lineTo(-44,-120);ctx.lineTo(44,-120);ctx.lineTo(50,0);ctx.closePath();ctx.fill();
  ctx.fillStyle='#b8946a';ctx.fillRect(-44,-120,88,10);
  ctx.fillStyle='rgba(0,0,0,.12)';ctx.beginPath();ctx.moveTo(-50,0);ctx.lineTo(-44,-120);ctx.lineTo(-30,-120);ctx.lineTo(-34,0);ctx.closePath();ctx.fill();
  ctx.strokeStyle='#8a6a48';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(-24,-120);ctx.quadraticCurveTo(-24,-152,0,-152);ctx.quadraticCurveTo(24,-152,24,-120);ctx.stroke();
  ctx.restore();
}
/* ---------- shared: a Karachi road through the windscreen — a dual carriageway with a median, blocks of flats and shops, neem trees, cars, a green sign ---------- */
function jun_city(ctx,lt,o={}){
  const spd=o.spd||0.5;
  paintSky(ctx,[[0,'#86b3df'],[0.45,'#c9dcea'],[0.7,'#e9e0cc']]);sunGlow(ctx,1040,120,420,'rgba(255,240,200,0.7)');
  ctx.fillStyle='rgba(225,214,190,.6)';ctx.fillRect(0,380,W,60);
  ctx.fillStyle=vgrad(ctx,432,720,[[0,'#c9bda0'],[1,'#a89a78']]);ctx.fillRect(0,432,W,288);
  const r=rng(702),items=[];
  for(let i=0;i<22;i++){const side=i%2?1:-1,u=((r()+lt*spd*0.16)%1),w=120+r()*120,h=150+r()*170,col=['#d9d2c4','#cfc8ba','#e3dccd','#bfb8a8','#d6cbb3'][i%5],sign=['#c0392b','#1d6b3a','#1f5fbf','#d9a441','#7d3c98'][i%5],fl=2+Math.floor(r()*4);items.push({side,u,w,h,col,sign,fl});}
  items.sort((a,b)=>a.u-b.u);
  for(const it of items){const u=it.u,s=0.06+u*u*1.5,y=432+u*u*230,x=it.side<0?585-u*u*640-30*s:695+u*u*640+30*s,w=it.w*s,h=it.h*s,x0=it.side<0?x-w:x;
    if(x0>W+50||x0+w<-50)continue;
    ctx.fillStyle=it.col;ctx.fillRect(x0,y-h,w,h);
    ctx.fillStyle='rgba(0,0,0,.08)';ctx.fillRect(it.side<0?x0+w-6*s:x0,y-h,6*s,h);
    ctx.fillStyle='#4a5a6a';const cw=w/(it.fl+1);for(let f=0;f<it.fl;f++)for(let row=1;row*26*s<h-30*s;row++)ctx.fillRect(x0+cw*0.35+f*cw,y-h+row*26*s,cw*0.4,12*s);
    ctx.fillStyle=it.sign;ctx.fillRect(x0,y-22*s,w,14*s);ctx.fillStyle='rgba(255,255,255,.5)';ctx.fillRect(x0+w*0.15,y-18*s,w*0.5,6*s);
  }
  const rt=rng(703);
  for(let i=0;i<16;i++){const side=i%2?1:-1,u=((rt()+lt*spd*0.16)%1),s=0.08+u*u*1.5,y=432+u*u*230,x=side<0?585-u*u*640+10*s:695+u*u*640-10*s;if(x<-80||x>W+80)continue;
    ctx.fillStyle='#5b4a3a';ctx.fillRect(x-2*s,y-34*s,4*s,34*s);ctx.fillStyle='#4f7a3a';ell(ctx,x,y-44*s,22*s,16*s);ctx.fill();ctx.fillStyle='#6a9a48';ell(ctx,x-8*s,y-50*s,14*s,10*s);ctx.fill();}
  ctx.fillStyle='#4a4b50';ctx.beginPath();ctx.moveTo(585,432);ctx.lineTo(695,432);ctx.lineTo(W,720);ctx.lineTo(0,720);ctx.closePath();ctx.fill();
  ctx.fillStyle='#d9dde3';ctx.beginPath();ctx.moveTo(585,432);ctx.lineTo(0,720);ctx.lineTo(44,720);ctx.lineTo(591,432);ctx.closePath();ctx.fill();ctx.beginPath();ctx.moveTo(695,432);ctx.lineTo(W,720);ctx.lineTo(W-44,720);ctx.lineTo(689,432);ctx.closePath();ctx.fill();
  ctx.fillStyle='#9a9a8c';ctx.beginPath();ctx.moveTo(636,432);ctx.lineTo(644,432);ctx.lineTo(700,720);ctx.lineTo(580,720);ctx.closePath();ctx.fill();
  ctx.fillStyle='#5c8a3c';for(let k=0;k<12;k++){const u=((k/12+lt*spd*0.16)%1),s=0.06+u*u*1.5,y=432+u*u*230;ell(ctx,640,y-6*s,14*s,8*s);ctx.fill();}
  ctx.fillStyle='#e8e4d6';for(let k=0;k<7;k++){const u=((lt*spd+k/7)%1),y=432+u*u*288,w=3+u*20,h=5+u*32;ctx.fillRect(612-u*u*390-w/2,y,w,h);}
  const car=(x,y,s,col,rear)=>{ctx.fillStyle='rgba(0,0,0,.25)';ell(ctx,x,y+2*s,46*s,6*s);ctx.fill();ctx.fillStyle=col;rrect(ctx,x-42*s,y-40*s,84*s,40*s,8*s);ctx.fill();ctx.fillStyle='#1b2a44';rrect(ctx,x-34*s,y-38*s,68*s,16*s,4*s);ctx.fill();ctx.fillStyle=rear?'#ff4d3a':'#fff6d0';circle(ctx,x-32*s,y-14*s,4*s);ctx.fill();circle(ctx,x+32*s,y-14*s,4*s);ctx.fill();ctx.fillStyle='#111';ctx.fillRect(x-38*s,y-6*s,14*s,8*s);ctx.fillRect(x+24*s,y-6*s,14*s,8*s);};
  for(const[k,col]of[[0,'#e9edef'],[1,'#c9c9c9'],[2,'#2f6fb5']]){const u=0.2+0.13*k+0.03*Math.sin(lt*0.6+k),s=0.12+u*1.2,y=434+u*u*230,x=(k===1?600-u*u*480:626-u*u*300);car(x,y,s,col,true);}
  for(let k=0;k<3;k++){const u=((lt*0.45+k/3)%1),s=0.12+u*1.2,y=434+u*u*230,x=690+u*u*420;if(u>0.03)car(x,y,s,['#f1e7c6','#8a8f98','#c0392b'][k],false);}
  if(o.sign){const u=((lt*spd*0.2+0.3)%1),s=0.1+u*1.7,x=540-u*u*520,y=434+u*u*230;if(s>0.2){ctx.fillStyle='#777';ctx.fillRect(x-3*s,y-90*s,6*s,90*s);ctx.fillStyle='#1d6b3a';rrect(ctx,x-70*s,y-150*s,140*s,62*s,6*s);ctx.fill();ctx.fillStyle='#fff';ctx.font=`700 ${Math.max(6,20*s)}px "Mulish",sans-serif`;ctx.textAlign='center';ctx.fillText(o.sign,x,y-118*s);ctx.font=`600 ${Math.max(5,15*s)}px "Mulish",sans-serif`;ctx.fillText(o.sign2||'',x,y-98*s);}}
  ctx.fillStyle='rgba(255,236,200,.12)';ctx.fillRect(0,0,W,H);
}

/* ---------- 29 June · 01:19–04:01 — twelve calls chained through the night on Snapchat and Instagram; she ends the last one on a sleeping man; the morning after ---------- */
const CL=[
  {at:2.0, t:'01:19',d:'14 min'},
  {at:2.85,t:'01:34',d:'15 min'},
  {at:3.7, t:'01:49',d:'9 min'},
  {at:4.55,t:'01:59',d:'2 min',out:true},
  {at:5.4, t:'02:01',d:'7 min',out:true},
  {at:6.25,t:'02:09',d:'8 min'},
  {at:7.1, t:'02:18',d:'17 min'},
  {at:7.95,t:'02:36',d:'19 min'},
  {at:8.8, t:'02:55',d:'15 min'},
  {at:9.65,t:'03:11',d:'10 min'},
  {at:10.5,t:'03:21',d:'24 min'},
  {at:11.35,t:'03:46',d:'15 min',out:true},
];
const CL_B=[
  {at:21.6,who:'me', time:'07:55',text:'Did i slot'},
  {at:22.3,who:'me', time:'07:56',text:'Slept'},
  {at:23.6,who:'me', time:'08:08',text:'I am so sorry if i did 😭😭'},
  {at:25.4,who:'her',time:'08:35',text:'Yeah u slept lolll, heyyy it\'s fine'},
  {at:27.4,who:'her',time:'08:36',text:'I ended the call qt 4:01 and u slept in btw lollll'},
  {at:30.0,who:'me', time:'09:57',text:'My cute little insominc baby'},
  {at:32.2,who:'her',time:'14:00',text:'Im too sleep deprived 😭😭😭😭😭😭😭😭😭'},
  {at:34.0,who:'me', time:'14:00',text:'And i am vitamin fabeha deprived 👉👈'},
  {at:36.2,who:'her',time:'22:51',text:'Sleep deprivation mein mat chalan gari pls'},
  {at:38.2,who:'me', time:'22:56',text:'Ok ok 🙏🏻🙏🏻 master'},
];
scene({id:'calls401',name:'29 June · the 4:01 call',when:'2026-06-29T01:19',bars:12,fin:['#000000',1.2],fout:['#000000',1.4],
  note:'the ceiling of his room, the fan turning, the new AC’s green light; the Snapchat call log filling from 01:19 to 03:46 on a dropping line; the last call, on Instagram, ending on a sleeping man at 04:01; dawn in the window, then the day after, morning to night.',
  tag:'“My cute little insominc baby” · “Sleep deprivation mein mat chalan gari pls”',
  prep(){
    const c=mk(W,H),g=c.getContext('2d');
    g.fillStyle=vgrad(g,0,H,[[0,'#0c0e1c'],[1,'#161829']]);g.fillRect(0,0,W,H);
    g.fillStyle='#1a1829';g.beginPath();g.moveTo(0,720);g.lineTo(0,556);g.lineTo(W,536);g.lineTo(W,720);g.closePath();g.fill();
    g.fillStyle='#272340';g.beginPath();g.moveTo(0,548);g.lineTo(W,528);g.lineTo(W,540);g.lineTo(0,560);g.closePath();g.fill();
    g.fillStyle='#dfe3e8';rrect(g,120,584,300,76,16);g.fill();g.fillStyle='#c6cbd2';g.fillRect(130,644,280,8);g.fillStyle='#b9bec6';g.fillRect(140,604,120,4);
    g.fillStyle='#2a2438';g.fillRect(880,556,340,164);g.clearRect(894,570,312,150);g.fillStyle='#3a3350';g.fillRect(1046,570,8,150);
    return{c,R:rooms()};
  },
  draw(ctx,lt,A){
    if(lt<20.6){
      const dawn=smooth(18.4,20.6,lt);
      ctx.fillStyle=vgrad(ctx,570,720,[[0,mixHex('#070a1e','#6f7d9c',dawn)],[1,mixHex('#0d1230','#b9b0b4',dawn)]]);ctx.fillRect(894,570,312,150);
      const r=rng(641);ctx.fillStyle=`rgba(255,248,230,${0.9*(1-dawn)})`;for(let i=0;i<40;i++){const s=r()*1.4+0.4;ctx.fillRect(900+r()*300,576+r()*120,s,s);}
      ctx.drawImage(A.c,0,0);
      ctx.fillStyle='#6ee07a';circle(ctx,392,600,3.5);ctx.fill();glow(ctx,392,600,26,'#6ee07a',0.35);
      /* the ceiling fan, upper left */
      const ang=lt*2.6;ctx.save();ctx.translate(300,230);
      ctx.fillStyle='rgba(0,0,0,.25)';circle(ctx,10,12,30);ctx.fill();
      for(const[da,al]of[[-0.1,0.35],[0,1]]){ctx.save();ctx.globalAlpha=al;for(let k=0;k<3;k++){ctx.save();ctx.rotate(ang+da+k*TAU/3);ctx.fillStyle='#2e3047';rrect(ctx,-17,-184,34,164,12);ctx.fill();ctx.fillStyle='rgba(255,255,255,.05)';rrect(ctx,-17,-184,10,164,6);ctx.fill();ctx.restore();}ctx.restore();}
      ctx.fillStyle='#3a3c55';circle(ctx,0,0,24);ctx.fill();ctx.fillStyle='#4a4c66';circle(ctx,0,0,14);ctx.fill();
      ctx.restore();
      const slide=smooth(14.8,16.3,lt);
      glow(ctx,640,430,420,'#86a9d6',0.1*(1-slide));
      const buzz=lt>16.5&&lt<18.6?0.65+0.35*Math.sin((lt-16.5)*9):0;if(buzz>0){glow(ctx,560,720,620,'#9fbfff',0.34*buzz);glow(ctx,560,720,220,'#dbe8ff',0.3*buzz);}
      if(slide<1){
        const S=drawPhoneHand(ctx,lt,{x:475,y:120+760*slide,w:330,h:700});
        if(lt<12.2){jun_snapLog(ctx,S,CL,lt);const last=CL.filter(e=>e.at<=lt).pop();jun_topDark(ctx,S,last?last.t:'01:17');}
        else{const live=lt<14.5;jun_instaCall(ctx,S,{mode:live?'live':'ended',sub:live?'14:'+String(Math.min(59,50+Math.floor((lt-12.2)*4))).padStart(2,'0'):'Call ended · 15:00'},lt);phoneTop(ctx,S,{time:live?'04:00':'04:01'});}
      }
      return;
    }
    /* the day after, in one held shot: morning light, then evening, then the lamp */
    const R=A.R,nt=smooth(31.5,37.5,lt),ev=Math.sin(Math.PI*clamp((lt-29.5)/8));
    ctx.drawImage(R.morning,0,0);
    if(ev>0){ctx.fillStyle=`rgba(255,150,70,${0.16*ev})`;ctx.fillRect(0,0,W,H);}
    if(nt>0){ctx.save();ctx.globalAlpha=nt;ctx.drawImage(R.night,0,0);ctx.restore();}
    const S=drawPhoneHand(ctx,lt,{x:475,y:120,w:330,h:700});
    chatPanel(ctx,S,CL_B,lt,{name:'Fabeha',status:'online',dark:false});
    const last=CL_B.filter(m=>m.at<=lt).pop();phoneTop(ctx,S,{time:last?last.time:'07:55'});
  },
  subs:[
    [0.6,4.8,'29 June. We had a plan for Tuesday, so we talked the night through: twelve calls on Snapchat and Instagram, the line dropping, one of us calling straight back.'],
    [6.0,9.4,'Two phones on a bad network. Whoever got cut off rang first.'],
    [12.4,14.4,'The last one was mine, at 03:46. Fifteen minutes in, I was gone.'],
    [16.6,19.2,'She ended it at 04:01, and rang once more at 04:09, in case.'],
    [21.8,23.4,'Did i slot','him'],
    [23.8,25.2,'I am so sorry if i did 😭😭','him'],
    [25.6,27.2,'Yeah u slept lolll, heyyy it\'s fine','her'],
    [27.6,29.6,'I ended the call qt 4:01 and u slept in btw lollll','her'],
    [30.2,31.9,'My cute little insominc baby','him'],
    [32.4,33.8,'Im too sleep deprived 😭😭😭😭😭😭😭😭😭','her'],
    [34.2,35.9,'And i am vitamin fabeha deprived 👉👈','him'],
    [36.4,38.0,'Sleep deprivation mein mat chalan gari pls','her'],
    [38.4,39.5,'Ok ok 🙏🏻🙏🏻 master','him'],
  ],
  score({hit,bars,melody,THEME_B}){
    bars(0,6,['Em','Em7','Cmaj7','Am7'],{padVel:0.34});
    for(let b=1;b<6;b++)melody(b,b-1,'box',12,0.32,THEME_B);
    for(const e of CL)hit(e.at,'tick',{hi:!e.out});
    hit(14.6,'tick',{});
    hit(16.7,'ring',{});hit(17.6,'ring',{});
    hit(19.8,'bird',{f:2800});hit(20.3,'bird',{f:3300});
    bars(6,6,['G','Cmaj7','Am7','D'],{padVel:0.42,arp:true,arpVel:0.12});
    for(let b=7;b<11;b++)melody(b,b-7,'piano',0,0.38);
    for(const m of CL_B)hit(m.at,'tick',{hi:m.who==='her'});
  },
  amb(lt){return lt<20.6?{room:0.3,hum:0.15}:{room:0.2};},
});

/* ---------- shared: the IBA arcade at noon — red brick, three arches onto the lawn, the exam-office counter at the left ---------- */
function jun_ibaLayer(){
  const c=mk(W,H),g=c.getContext('2d'),r=rng(651);
  g.fillStyle=vgrad(g,0,H,[[0,'#9cc4ea'],[0.45,'#dbe7ee'],[1,'#f2e9d4']]);g.fillRect(0,0,W,H);
  g.fillStyle='#a3574a';g.fillRect(0,236,W,170);g.fillStyle='#b3655a';g.fillRect(0,236,W,12);
  g.fillStyle='rgba(255,230,210,.16)';for(let y=252;y<406;y+=11)g.fillRect(0,y,W,1);
  for(let x=40;x<W;x+=130){g.fillStyle='#2b3a4a';g.fillRect(x,290,54,80);g.fillStyle='rgba(255,255,255,.14)';g.fillRect(x,318,54,3);}
  g.fillStyle='#8fbf62';g.fillRect(0,406,W,200);g.fillStyle='#a6cf72';for(let i=0;i<90;i++){g.globalAlpha=0.3+r()*0.5;ell(g,r()*W,416+r()*170,30+r()*50,3+r()*5);g.fill();}g.globalAlpha=1;
  g.fillStyle='#d8cdb8';g.fillRect(0,470,W,26);
  drawTreeClump(g,180,430,70,'#2d6a3a','#6fb25a',r);drawTreeClump(g,760,440,56,'#2d6a3a','#6fb25a',r);drawTreeClump(g,1180,428,64,'#2d6a3a','#6fb25a',r);
  g.fillStyle='rgba(255,250,235,.22)';g.fillRect(0,236,W,370);
  const wc=mk(W,H),w=wc.getContext('2d');
  w.fillStyle='#9a4b3b';w.fillRect(0,0,W,590);w.fillStyle='#a85443';w.fillRect(0,0,W,16);
  w.strokeStyle='rgba(255,230,210,.22)';w.lineWidth=1;for(let y=24;y<590;y+=11){w.beginPath();w.moveTo(0,y);w.lineTo(W,y);w.stroke();}
  w.strokeStyle='rgba(0,0,0,.08)';for(let y=24;y<590;y+=22){for(let x=((y/22)%2)*40;x<W;x+=80){w.beginPath();w.moveTo(x,y);w.lineTo(x,y+11);w.stroke();}}
  w.globalCompositeOperation='destination-out';
  for(const cx of[560,800,1040]){w.beginPath();w.moveTo(cx-88,590);w.lineTo(cx-88,240);w.arc(cx,240,88,Math.PI,0);w.lineTo(cx+88,590);w.closePath();w.fill();}
  w.globalCompositeOperation='source-over';
  w.strokeStyle='#5b3a33';w.lineWidth=8;for(const cx of[560,800,1040]){w.beginPath();w.moveTo(cx-92,590);w.lineTo(cx-92,240);w.arc(cx,240,92,Math.PI,0);w.lineTo(cx+92,590);w.stroke();}
  w.fillStyle='#5b3a33';w.fillRect(100,236,280,250);w.fillStyle='#2b2420';w.fillRect(112,248,256,226);
  w.fillStyle='#3a312c';w.fillRect(112,400,256,74);w.fillStyle='#6b5a4a';w.fillRect(100,474,280,12);
  w.fillStyle='rgba(255,255,255,.06)';w.fillRect(120,256,240,60);
  w.fillStyle='#f3e9d8';w.fillRect(110,166,260,56);w.fillStyle='#4a2f2a';w.font='700 15px "Mulish",sans-serif';w.textAlign='center';w.fillText('EXAMINATION DEPARTMENT',240,190);w.font='600 11px "Mulish",sans-serif';w.fillText('counter  ·  9 to 1',240,210);
  g.drawImage(wc,0,0);
  g.fillStyle=vgrad(g,590,720,[[0,'#d3cdc1'],[1,'#bfb8aa']]);g.fillRect(0,590,W,130);g.fillStyle='rgba(0,0,0,.07)';for(let x=0;x<W;x+=96)g.fillRect(x,590,1,130);g.fillRect(0,590,W,2);
  return c;
}

/* ---------- 30 June · 02:49 — the sleepless plan and the Talha lyric; 10:00 DHA Phase 6 to campus with the zamzam bottle; 12:47 IBA, the counter closing at one, three calls, then hers ---------- */
const B12_A=[
  {at:1.0,who:'me', time:'02:44',text:'Nend nahi arahi'},
  {at:2.6,who:'me', time:'02:49',text:'And we meeting at 12'},
  {at:3.8,who:'her',time:'02:49',text:'Yep'},
  {at:4.8,who:'me', time:'02:50',text:'Eik gaana hai'},
  {at:5.3,who:'me', time:'02:50',text:'Talha ka'},
  {at:6.0,who:'me', time:'02:50',text:'12 baaje badle ye irade hamare 12 baaje'},
  {at:7.0,who:'me', time:'02:50',text:'😋🤣🤣'},
  {at:8.4,who:'her',time:'02:54',text:'Campus par'},
  {at:9.0,who:'her',time:'02:54',text:'🤭🤭🤭'},
];
const B12_B=[
  {at:0,   who:'me', time:'09:58',text:'Mein abhi bas nikalraha'},
  {at:0,   who:'me', time:'09:58',text:'12 tak cmapus hooga'},
  {at:17.0,who:'her',time:'12:33',text:'U in khi yet?'},
];
const B12_C=[
  {at:20.0,who:'me', time:'12:47',text:'Yes'},
  {at:20.5,who:'me', time:'12:47',text:'Iba'},
  {at:22.0,who:'her',time:'12:48',text:'Where?'},
  {at:23.0,who:'me', time:'12:50',text:'Where r u'},
  {at:23.8,who:'her',time:'12:50',text:'Tabba north'},
  {at:24.5,who:'her',time:'12:50',text:'Let me know when you get free'},
  {at:25.2,who:'me', time:'12:50',text:'I just arrived'},
  {at:25.9,who:'her',time:'12:53',text:'Dekhlena but it\'s abiut to be 1 they dont entertain you at all'},
  {at:27.8,who:'me', time:'12:56',text:'Lemme see'},
  {at:35.6,who:'me', time:'13:11',text:'Where r u'},
];
scene({id:'12baaje',name:'30 June · 12 baaje',when:'2026-06-30T02:49',bars:14,fin:['#000000',1.2],fout:['#000000',1.6],
  note:'ten to three in the morning, no sleep, a Talha lyric for the plan; ten o’clock, DHA Phase 6 to campus through the morning traffic with a small zamzam bottle and a paper bag on the passenger seat; IBA at 12:47, the exam-office shutter coming down at one, three unanswered calls, and her 28-second call at 13:13.',
  tag:'“12 baaje badle ye irade hamare 12 baaje”',
  prep(){const ph=new Image();ph.src='photos/date30.jpg';return{R:rooms(),iba:jun_ibaLayer(),ph};},
  draw(ctx,lt,A){
    if(lt<9.6){
      ctx.drawImage(A.R.night,0,0);
      const hue=(lt*0.45)%3,col=hue<1?mixHex('#ff4d7a','#4de1ff',hue):hue<2?mixHex('#4de1ff','#8dff6a',hue-1):mixHex('#8dff6a','#ff4d7a',hue-2);
      glow(ctx,170,600,260,col,0.22);
      const S=drawPhoneHand(ctx,lt,{x:475,y:120,w:330,h:700});
      chatPanel(ctx,S,B12_A,lt,{name:'Fabeha',status:'online'});
      const last=B12_A.filter(m=>m.at<=lt).pop();phoneTop(ctx,S,{time:last?last.time:'02:44'});
      return;
    }
    if(lt<19.2){
      jun_city(ctx,lt,{sign:'University Rd',spd:0.5});
      cockpit(ctx,lt,{});
      /* the passenger seat, lower left, with the small zamzam bottle and a paper bag */
      ctx.fillStyle='#23252d';ctx.beginPath();ctx.moveTo(0,470);ctx.quadraticCurveTo(190,446,340,520);ctx.quadraticCurveTo(372,640,330,720);ctx.lineTo(0,720);ctx.closePath();ctx.fill();
      ctx.fillStyle='#2c2f38';ctx.beginPath();ctx.moveTo(0,528);ctx.quadraticCurveTo(150,506,290,566);ctx.quadraticCurveTo(316,660,286,720);ctx.lineTo(0,720);ctx.closePath();ctx.fill();
      jun_bag(ctx,80,668,0.9);jun_bottle(ctx,190,676,1.0);
      ctx.save();ctx.translate(310,336);ctx.rotate(-0.04);ctx.scale(0.5,0.5);
      const S=drawPhone(ctx,0,0,PHONE.w,PHONE.h,{});
      chatPanel(ctx,S,B12_B,lt,{name:'Fabeha',status:lt<17?'last seen today at 09:51':'online',dark:false});
      phoneTop(ctx,S,{time:lt<13?'10:12':lt<17?'12:10':'12:33'});
      ctx.fillStyle='#2a2b34';ctx.fillRect(-16,PHONE.h-40,PHONE.w+32,22);ctx.restore();
      sunGlow(ctx,1040,120,300,'rgba(255,240,200,0.22)');
      return;
    }
    const t=lt-19.2;
    ctx.drawImage(A.iba,0,0);
    sunGlow(ctx,1150,40,420,'rgba(255,250,225,0.5)');
    ctx.save();ctx.beginPath();for(const cx of[560,800,1040]){ctx.moveTo(cx-88,590);ctx.lineTo(cx-88,240);ctx.arc(cx,240,88,Math.PI,0);ctx.lineTo(cx+88,590);ctx.closePath();}ctx.clip();
    for(let k=0;k<3;k++){const x=((lt*(14+k*5)+k*330)%900)+300;drawFigureFar(ctx,x,498,0.34,['#7b3e4a','#2f3f6b','#4a5a3a'][k],'#222',lt,k);}
    ctx.restore();
    motes(ctx,lt,30,652,'#fff6cc',1.2,0.4);
    /* the wall clock by the counter: 12:47 to one o’clock */
    const mins=lerp(47,60,smooth(0,10.4,t)),ma=mins/60*TAU-Math.PI/2,ha=(mins/60)/12*TAU-Math.PI/2;
    ctx.fillStyle='#2b2420';circle(ctx,430,190,27);ctx.fill();ctx.fillStyle='#f6f1e7';circle(ctx,430,190,24);ctx.fill();
    ctx.strokeStyle='#2b2420';ctx.lineWidth=2.5;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(430,190);ctx.lineTo(430+Math.cos(ha)*12,190+Math.sin(ha)*12);ctx.stroke();ctx.lineWidth=1.8;ctx.beginPath();ctx.moveTo(430,190);ctx.lineTo(430+Math.cos(ma)*18,190+Math.sin(ma)*18);ctx.stroke();
    /* the shutter comes down at one */
    const sh=250*smooth(8.4,10.4,t);
    if(sh>0){ctx.fillStyle='#8f939b';ctx.fillRect(100,236,280,sh);ctx.fillStyle='rgba(0,0,0,.18)';for(let y=242;y<236+sh;y+=10)ctx.fillRect(100,y,280,3);ctx.fillStyle='#5a5d66';ctx.fillRect(100,236+sh-6,280,6);}
    const S=drawPhoneHand(ctx,lt,{x:720,y:120,w:330,h:700});
    let cs=null;
    if(lt>=30.0&&lt<31.9)cs={mode:'out',sub:lt<31.3?'Calling…':'No answer',time:'13:06'};
    else if(lt>=32.0&&lt<33.9)cs={mode:'out',sub:lt<33.3?'Ringing…':'No answer',time:'13:08'};
    else if(lt>=34.0&&lt<35.4)cs={mode:'out',sub:lt<34.9?'Ringing…':'No answer',time:'13:11'};
    else if(lt>=37.2&&lt<38.6)cs={mode:'in',top:'Incoming voice call',sub:'WhatsApp',time:'13:13'};
    else if(lt>=38.6)cs={mode:'live',sub:lt<39.5?'00:00':'00:01',time:'13:13'};
    if(cs){jun_callScreen(ctx,S,cs,lt);phoneTop(ctx,S,{time:cs.time});}
    else{chatPanel(ctx,S,B12_C,lt,{name:'Fabeha',status:'online'});const last=B12_C.filter(m=>m.at<=lt).pop();phoneTop(ctx,S,{time:last?last.time:'12:47'});}
    ctx.fillStyle='rgba(255,236,200,.08)';ctx.fillRect(0,0,W,H);
    /* the date itself: the photo he took that afternoon */
    const pa=smooth(39.7,40.7,lt);
    if(pa>0){
      ctx.save();ctx.globalAlpha=pa;ctx.fillStyle=vgrad(ctx,0,H,[[0,'#1d1418'],[1,'#2e1e22']]);ctx.fillRect(0,0,W,H);
      bokeh(ctx,lt,30,1230,['#ffd27a','#ffb3c7','#fff2d0'],10,34,0.45);
      const im=A.ph;
      if(im&&im.complete&&im.naturalWidth){
        const z=1+0.04*smooth(40.5,46.7,lt),h=(H-60)*z,w=h*im.naturalWidth/im.naturalHeight,x=W/2-w/2,y=H/2-h/2-6;
        ctx.shadowColor='rgba(0,0,0,.6)';ctx.shadowBlur=40;ctx.fillStyle='#000';ctx.fillRect(x,y,w,h);ctx.shadowBlur=0;
        ctx.drawImage(im,x,y,w,h);
      }
      ctx.fillStyle='rgba(255,255,255,.7)';ctx.font='500 13px "Mulish",sans-serif';ctx.textAlign='left';setLS(ctx,'2px');ctx.fillText('30 JUNE · 13:24',40,H-40);setLS(ctx,'0px');
      ctx.restore();
    }
  },
  subs:[
    [0.5,2.5,'30 June, ten to three in the morning. No sleep; a game installing on the laptop; the plan for the day.'],
    [2.8,4.1,'And we meeting at 12','him'],
    [6.2,8.3,'12 baaje badle ye irade hamare 12 baaje','him'],
    [8.6,9.5,'Campus par','her'],
    [9.9,13.3,'Ten in the morning, DHA Phase 6 to campus. A new tyre, a small bottle of zamzam on the seat beside me, and a paper bag I wasn’t going to mention.'],
    [13.7,16.7,'Across the city in the morning traffic, the bottle sliding on the seat at every brake.'],
    [17.2,18.7,'U in khi yet?','her'],
    [19.6,21.7,'IBA, 12:47. Thirteen minutes before the exam office shut for the day.'],
    [23.9,24.9,'Tabba north','her'],
    [26.1,27.9,'Dekhlena but it\'s abiut to be 1 they dont entertain you at all','her'],
    [28.3,30.0,'It was. The shutter came down while I stood there. Fine — the degree was the excuse.'],
    [30.4,35.3,'Three calls. No answer, no answer, no answer.'],
    [35.8,36.9,'Where r u','him'],
    [37.4,39.6,'13:13. Her name on the screen, twenty-eight seconds. After that I didn’t need the phone.'],
    [41.0,45.6,'Our date, that afternoon. I took this.'],
  ],
  score({hit,bars,melody,pad,T,CH,THEME_B,THEME_C}){
    bars(0,3,['Em','Cmaj7','G','Dsus'],{padVel:0.36});
    for(let b=0;b<3;b++)melody(b,b,'box',12,0.3,THEME_B);
    bars(3,3,['G','Cmaj7','Am7','D'],{padVel:0.4,bass:true,bassVel:0.36});
    pad(T(3),'G',2,0.5,'strings');
    for(let b=3;b<6;b++){const c=['G','Cmaj7','Am7'][b-3],p=CH[c].p;[0,1,2,3].forEach(q=>hit(b*BAR+q*BEAT,'pluck',{midi:p[1+(q%3)]+12,vel:0.4}));melody(b,b-3,'piano',0,0.42,THEME_C);}
    bars(6,6,['G','Em','Cmaj7','Dsus'],{padVel:0.4,strings:true});
    for(let b=7;b<9;b++)melody(b,b-7,'piano',0,0.36);
    for(const m of B12_A.concat(B12_B,B12_C))if(m.at>0)hit(m.at,'tick',{hi:m.who==='her'});
    for(const t of[30.0,30.9,32.0,32.9,34.0,34.9])hit(t,'ring',{});
    hit(37.2,'ring',{});hit(38.1,'ring',{});
    hit(38.6,'chime',{midi:79,vel:0.55});hit(39.4,'chime',{midi:83,vel:0.4});
    bars(12,2,['G','Cmaj7'],{padVel:0.36,strings:true});for(let b=12;b<14;b++)melody(b,b-12,'box',12,0.32,THEME_B);hit(40.6,'chime',{midi:86,vel:0.45});
  },
  amb(lt){return lt<9.6?{room:0.22}:lt<19.2?{hum:0.55,wind:0.1}:lt<40?{wind:0.14,room:0.08}:{room:0.12};},
});
