/* apr1.js — 10–14 April 2026: the five frozen seconds at midnight, the near-miss in SMCHS, the five coins,
   and the paper rose. (see notes/AUTHORING.md) */
'use strict';

/* ---------- helpers (a1_) ---------- */

/* a WhatsApp thread like chatPanel, plus voice-note bubbles ({voice:{dur,mine}}), date pills ({pill:'14 APRIL 2026'}) and photo tiles ({photos,paint}) */
function a1_chat(ctx,S,msgs,lt,o={}){
  const name=o.name||'Fabeha',dark=o.dark!==false;
  ctx.save();rrect(ctx,S.x,S.y,S.w,S.h,S.r);ctx.clip();
  ctx.fillStyle=dark?'#0b141a':'#efe7dd';ctx.fillRect(S.x,S.y,S.w,S.h);
  if(dark){const r=rng(9);ctx.fillStyle='rgba(255,255,255,.035)';for(let i=0;i<90;i++){circle(ctx,S.x+r()*S.w,S.y+r()*S.h,1+r()*3);ctx.fill();}}
  const hy=S.y+36,hh=58,bottom=Math.min(S.y+S.h-66,H-120),maxW=S.w*0.74,pad=10,lh=19;
  const vis=msgs.filter(m=>m.at<=lt);let y=bottom-6;
  const typing=msgs.find(m=>m.at>lt&&m.at-lt<1.4&&m.who==='her');
  if(typing){const px=S.x+14,py=y-30;ctx.fillStyle=dark?'#202c33':'#ffffff';rrect(ctx,px,py,58,30,12);ctx.fill();for(let k=0;k<3;k++){const b=0.5+0.5*Math.sin(lt*8-k*1.1);ctx.fillStyle=`rgba(160,175,185,${0.4+0.6*b})`;circle(ctx,px+16+k*13,py+15-b*3,3.4);ctx.fill();}y=py-8;}
  ctx.font='500 15px "Mulish",sans-serif';
  for(let i=vis.length-1;i>=0&&y>hy+hh-10;i--){
    const m=vis[i],mine=m.who==='me',pop=i===vis.length-1?backOut(clamp((lt-m.at)/0.28)):1;
    if(m.pill){const bh=24;y-=bh;ctx.fillStyle=dark?'#182229':'#fff';rrect(ctx,S.x+S.w/2-62,y,124,bh,8);ctx.fill();ctx.fillStyle=dark?'#8696a0':'#667';ctx.font='600 11px "Mulish",sans-serif';ctx.textAlign='center';ctx.fillText(m.pill,S.x+S.w/2,y+16);ctx.font='500 15px "Mulish",sans-serif';y-=10;continue;}
    let bw,bh,lines=[],tile=0;
    if(m.voice){bw=S.w*0.8;bh=54;}
    else if(m.photos){tile=Math.floor((maxW-6)/2);bw=tile*2+12;bh=tile*Math.min(2,Math.ceil(m.photos/2))+12+pad*2+10;}
    else{lines=wrapText(ctx,m.text,maxW-pad*2);for(const l of lines)bw=Math.max(bw||0,ctx.measureText(l).width);const tw=m.time?ctx.measureText(m.time).width*0.8+8:0;bw=Math.min(maxW+8,Math.max(bw+pad*2+6,tw+pad*2+10));bh=lines.length*lh+pad*2+(m.time?10:0);}
    const by=y-bh,bx=mine?S.x+S.w-14-bw:S.x+14;
    ctx.save();ctx.translate(mine?bx+bw:bx,by+bh);ctx.scale(pop,pop);ctx.translate(mine?-(bx+bw):-bx,-(by+bh));
    ctx.fillStyle=mine?(dark?'#005c4b':'#d9fdd3'):(dark?'#202c33':'#ffffff');rrect(ctx,bx,by,bw,bh,12);ctx.fill();
    if(m.voice){
      const v=m.voice,prog=v.prog!=null?v.prog(lt-m.at):null,fg=dark?'#e9edef':'#111',dim=dark?'rgba(233,237,239,.5)':'rgba(0,0,0,.4)';
      ctx.fillStyle=mine?'#8fb5ad':'#d8b4a0';circle(ctx,bx+26,by+27,17);ctx.fill();
      if(!mine){ctx.fillStyle='#2a1d22';ell(ctx,bx+26,by+22,13,11);ctx.fill();ctx.fillStyle='#f3d8c4';ell(ctx,bx+26,by+28,9,10);ctx.fill();ctx.fillStyle='#2a1d22';ctx.fillRect(bx+14,by+20,6,20);ctx.fillRect(bx+32,by+20,6,20);}
      else{ctx.fillStyle='#1f3b36';ctx.fillRect(bx+22,by+18,8,12);rrect(ctx,bx+22,by+18,8,12,4);ctx.fill();ctx.strokeStyle='#1f3b36';ctx.lineWidth=2;ctx.beginPath();ctx.arc(bx+26,by+29,7,Math.PI*0.1,Math.PI*0.9);ctx.stroke();ctx.fillRect(bx+25,by+35,2,5);}
      ctx.fillStyle='#53bdeb';circle(ctx,bx+38,by+40,7);ctx.fill();ctx.fillStyle='#fff';rrect(ctx,bx+36,by+35,4,7,2);ctx.fill();
      ctx.fillStyle=dim;ctx.beginPath();ctx.moveTo(bx+54,by+17);ctx.lineTo(bx+68,by+27);ctx.lineTo(bx+54,by+37);ctx.closePath();ctx.fill();
      const wx=bx+78,ww=bw-96,n=24;for(let k=0;k<n;k++){const hhh=5+14*Math.abs(Math.sin(k*1.9+v.dur*3));ctx.fillStyle=(prog!=null&&k/n<prog)?'#53bdeb':dim;rrect(ctx,wx+k*(ww/n),by+27-hhh/2,ww/n-2,hhh,1.5);ctx.fill();}
      if(prog!=null){ctx.fillStyle='#53bdeb';circle(ctx,wx+ww*prog,by+27,5);ctx.fill();}
      ctx.fillStyle=dim;ctx.font='500 11px "Mulish",sans-serif';ctx.textAlign='left';ctx.fillText('0:'+String(Math.floor(v.dur)).padStart(2,'0'),wx,by+49);
      ctx.textAlign='right';ctx.fillText((m.time||'')+(mine?(m.sent!=null&&lt<m.sent?'  🕓':'  ✓✓'):''),bx+bw-10,by+49);
    }else if(m.photos){
      const n=Math.min(4,m.photos);for(let k=0;k<n;k++){const px=bx+6+(k%2)*(tile+4),py=by+6+Math.floor(k/2)*(tile+4);ctx.save();rrect(ctx,px,py,tile,tile,8);ctx.clip();m.paint(ctx,px,py,tile,k);ctx.restore();}
      ctx.fillStyle=dark?'rgba(233,237,239,.55)':'rgba(0,0,0,.45)';ctx.font='500 11px "Mulish",sans-serif';ctx.textAlign='right';ctx.fillText(m.time+(mine?'  ✓✓':''),bx+bw-8,by+bh-7);
    }else{
      ctx.fillStyle=dark?'#e9edef':'#111';ctx.textAlign='left';ctx.font='500 15px "Mulish",sans-serif';
      for(let k=0;k<lines.length;k++)ctx.fillText(lines[k],bx+pad,by+pad+14+k*lh);
      if(m.time){ctx.fillStyle=dark?'rgba(233,237,239,.55)':'rgba(0,0,0,.45)';ctx.font='500 11px "Mulish",sans-serif';ctx.textAlign='right';ctx.fillText(m.time+(mine?(m.sent!=null&&lt<m.sent?'  🕓':'  ✓✓'):''),bx+bw-8,by+bh-7);}
    }
    ctx.restore();ctx.font='500 15px "Mulish",sans-serif';
    y=by-7;
  }
  ctx.fillStyle=dark?'#0b141a':'#efe7dd';ctx.fillRect(S.x,S.y,S.w,hy-S.y);
  ctx.fillStyle=dark?'#1f2c34':'#f7f4ef';ctx.fillRect(S.x,hy,S.w,hh);
  ctx.fillStyle='#d8b4a0';circle(ctx,S.x+44,hy+hh/2,17);ctx.fill();ctx.fillStyle='#2a1d22';ell(ctx,S.x+44,hy+hh/2-4,13,11);ctx.fill();ctx.fillStyle='#f3d8c4';ell(ctx,S.x+44,hy+hh/2+1,9,10);ctx.fill();ctx.fillStyle='#2a1d22';ctx.fillRect(S.x+32,hy+hh/2-10,6,20);ctx.fillRect(S.x+50,hy+hh/2-10,6,20);
  ctx.fillStyle=dark?'#e9edef':'#111';ctx.font='700 16px "Mulish",sans-serif';ctx.textAlign='left';ctx.fillText(name,S.x+70,hy+hh/2+1);
  ctx.fillStyle=dark?'#8696a0':'#667';ctx.font='500 12px "Mulish",sans-serif';ctx.fillText(o.status||'online',S.x+70,hy+hh/2+18);
  ctx.fillStyle=dark?'#aebac1':'#333';ctx.font='600 18px "Mulish",sans-serif';ctx.textAlign='right';ctx.fillText('⋮',S.x+S.w-16,hy+hh/2+6);
  const iy=S.y+S.h-56;ctx.fillStyle=dark?'#1f2c34':'#f0f0f0';ctx.fillRect(S.x,iy,S.w,56);
  if(o.rec!=null){/* recording a voice note: red mic, a running timer, "slide to cancel" */
    ctx.fillStyle='#f15c6d';circle(ctx,S.x+30,iy+28,7+2*Math.sin(lt*6));ctx.fill();ctx.fillStyle=dark?'#e9edef':'#111';ctx.font='600 14px "Mulish",sans-serif';ctx.textAlign='left';ctx.fillText('0:'+String(Math.floor(o.rec)).padStart(2,'0'),S.x+48,iy+33);
    ctx.fillStyle=dark?'#8696a0':'#888';ctx.font='500 13px "Mulish",sans-serif';ctx.fillText('‹  slide to cancel',S.x+108,iy+33);
    ctx.fillStyle='#00a884';circle(ctx,S.x+S.w-30,iy+28,24);ctx.fill();ctx.fillStyle='#fff';rrect(ctx,S.x+S.w-34,iy+16,8,14,4);ctx.fill();ctx.strokeStyle='#fff';ctx.lineWidth=2;ctx.beginPath();ctx.arc(S.x+S.w-30,iy+28,8,Math.PI*0.1,Math.PI*0.9);ctx.stroke();
  }else{
    ctx.fillStyle=dark?'#2a3942':'#ffffff';rrect(ctx,S.x+12,iy+10,S.w-70,36,18);ctx.fill();
    ctx.fillStyle=dark?'#8696a0':'#888';ctx.font='500 14px "Mulish",sans-serif';ctx.textAlign='left';ctx.fillText(o.draft||'Message',S.x+28,iy+33);
    ctx.fillStyle='#00a884';circle(ctx,S.x+S.w-30,iy+28,18);ctx.fill();ctx.fillStyle='#fff';
    if(o.draft&&o.draft!=='Message'){ctx.beginPath();ctx.moveTo(S.x+S.w-37,iy+20);ctx.lineTo(S.x+S.w-21,iy+28);ctx.lineTo(S.x+S.w-37,iy+36);ctx.closePath();ctx.fill();}
    else{rrect(ctx,S.x+S.w-33,iy+19,6,11,3);ctx.fill();ctx.strokeStyle='#fff';ctx.lineWidth=1.6;ctx.beginPath();ctx.arc(S.x+S.w-30,iy+28,6,Math.PI*0.1,Math.PI*0.9);ctx.stroke();}
  }
  ctx.restore();
}

/* a single floating message bubble (for lines shown over a picture, not inside a phone) */
function a1_bubble(ctx,x,y,maxW,text,who,time,alpha=1){
  ctx.save();ctx.globalAlpha=alpha;ctx.font='500 16px "Mulish",sans-serif';
  const lines=wrapText(ctx,text,maxW-24);let bw=0;for(const l of lines)bw=Math.max(bw,ctx.measureText(l).width);bw=Math.max(bw+24,80);const bh=lines.length*21+30;
  const mine=who==='me',bx=mine?x-bw:x;
  ctx.shadowColor='rgba(0,0,0,.25)';ctx.shadowBlur=14;ctx.shadowOffsetY=4;ctx.fillStyle=mine?'#d9fdd3':'#ffffff';rrect(ctx,bx,y,bw,bh,14);ctx.fill();ctx.shadowBlur=0;ctx.shadowOffsetY=0;
  ctx.fillStyle='#111';ctx.textAlign='left';lines.forEach((l,k)=>ctx.fillText(l,bx+12,y+22+k*21));
  ctx.fillStyle='rgba(0,0,0,.45)';ctx.font='500 11px "Mulish",sans-serif';ctx.textAlign='right';ctx.fillText(time+(mine?'  ✓✓':''),bx+bw-10,y+bh-8);
  ctx.restore();return bh;
}

/* a laptop seen from the chair: lid, screen (painted by o.screen(ctx,x,y,w,h)), keyboard, his hands; the screen's glow spills onto the desk */
function a1_laptop(ctx,lt,o={}){
  const x=o.x??300,y=o.y??120,w=o.w??680,h=o.h??430,bob=Math.sin(lt*0.9)*1.2;
  ctx.save();ctx.translate(0,bob);
  glow(ctx,x+w/2,y+h,560,o.glowCol||'#9fb8ff',0.22);
  ctx.fillStyle='#1b1c25';rrect(ctx,x-6,y-6,w+12,h+12,16);ctx.fill();ctx.fillStyle='#0b0b10';rrect(ctx,x+10,y+10,w-20,h-20,6);ctx.fill();
  ctx.save();ctx.beginPath();ctx.rect(x+10,y+10,w-20,h-20);ctx.clip();if(o.screen)o.screen(ctx,x+10,y+10,w-20,h-20);ctx.restore();
  ctx.fillStyle='#24252f';ctx.beginPath();ctx.moveTo(x-6,y+h+6);ctx.lineTo(x+w+6,y+h+6);ctx.lineTo(x+w+110,y+h+150);ctx.lineTo(x-110,y+h+150);ctx.closePath();ctx.fill();
  ctx.fillStyle='#2d2e39';ctx.beginPath();ctx.moveTo(x-106,y+h+150);ctx.lineTo(x+w+106,y+h+150);ctx.lineTo(x+w+124,y+h+176);ctx.lineTo(x-124,y+h+176);ctx.closePath();ctx.fill();
  /* keys */
  for(let r=0;r<4;r++){const ky=y+h+22+r*22,n=13-(r===3?6:0),sx=x+20-r*14,kw=(w-40+r*28)/13;for(let k=0;k<n;k++){const kx=sx+k*kw+(r===3&&k===3?0:0);ctx.fillStyle='#15161d';if(r===3&&k===3){rrect(ctx,kx+2,ky,kw*5-4,16,4);ctx.fill();k+=4;continue;}rrect(ctx,kx+2,ky,kw-4,16,4);ctx.fill();}}
  ctx.fillStyle='#1d1e27';rrect(ctx,x+w/2-70,y+h+114,140,46,8);ctx.fill();
  /* his hands: right on the trackpad, left resting at the keys */
  const hx=x+w/2+10+Math.sin(lt*0.7)*3,hy=y+h+130;
  ctx.fillStyle=HIS.skin;ell(ctx,hx+40,hy+70,70,46,0.2);ctx.fill();for(let k=0;k<4;k++){ctx.save();ctx.translate(hx-10+k*26,hy+20);ctx.rotate(-0.35+k*0.12);rrect(ctx,-9,-20,18,70,9);ctx.fill();ctx.restore();}
  ctx.fillStyle=HIS.skinSh;ell(ctx,hx+96,hy+60,16,26,0.6);ctx.fill();
  ctx.fillStyle=HIS.skin;ell(ctx,x+90,y+h+170,78,46,-0.25);ctx.fill();for(let k=0;k<4;k++){ctx.save();ctx.translate(x+40+k*26,y+h+140);ctx.rotate(0.25-k*0.1);rrect(ctx,-9,-18,18,60,9);ctx.fill();ctx.restore();}
  ctx.restore();
}

/* ---------- 10 April · the five coins, and 11 April · 11:04 — "adhi duniya" ---------- */
const A1_COINS=[
  {x:430,y:290,at:2.0, outer:'#c9a24a',inner:'#dfe2e6',glyph:'₺',  label:'lira',  midi:79},
  {x:565,y:238,at:4.1, outer:'#a8653a',inner:'#c98050',glyph:'¢',  label:'cent',  midi:83},
  {x:705,y:282,at:6.2, outer:'#c3c8ce',inner:'#d4af37',glyph:'€',  label:'euro',  midi:86},
  {x:650,y:420,at:8.3, outer:'#b4b9c1',inner:'#d6dae0',glyph:'د.إ',label:'dirham',midi:88},
  {x:495,y:440,at:10.4,outer:'#c9a24a',inner:'#dfe2e6',glyph:'﷼', label:'riyal', midi:91},
];
function a1_coinFace(ctx,x,y,r,sq,c){
  ctx.save();ctx.translate(x,y);ctx.scale(Math.max(0.06,sq),1);
  ctx.fillStyle='rgba(0,0,0,.35)';circle(ctx,3,5,r);ctx.fill();
  ctx.fillStyle=c.outer;circle(ctx,0,0,r);ctx.fill();ctx.fillStyle=mixHex(c.outer,'#000000',0.25);circle(ctx,0,0,r*0.84);ctx.fill();
  ctx.fillStyle=c.inner;circle(ctx,0,0,r*0.66);ctx.fill();
  ctx.strokeStyle='rgba(255,255,255,.45)';ctx.lineWidth=2;ctx.beginPath();ctx.arc(0,0,r*0.92,Math.PI*1.1,Math.PI*1.6);ctx.stroke();
  ctx.fillStyle='rgba(40,30,20,.6)';ctx.font=`700 ${r*0.72}px "Mulish","Segoe UI",sans-serif`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(c.glyph,0,1);ctx.textBaseline='alphabetic';
  ctx.restore();
}
/* his right hand from above, pinching a coin between thumb and index; a = angle of the hand, open = fingers parting */
function a1_pinchHand(ctx,x,y,a,open){
  ctx.save();ctx.translate(x,y);ctx.rotate(a);ctx.lineCap='round';
  ctx.strokeStyle=HIS.skin;ctx.lineWidth=92;ctx.beginPath();ctx.moveTo(10,40);ctx.lineTo(48,250);ctx.stroke();
  ctx.fillStyle=HIS.skin;ell(ctx,0,0,64,54,0.1);ctx.fill();
  for(const[fx,fy,fa,fl]of[[14,-30,0.15,52],[34,-22,0.3,46],[50,-6,0.5,38]]){ctx.save();ctx.translate(fx,fy);ctx.rotate(fa);rrect(ctx,-12,-fl,24,fl+10,12);ctx.fill();ctx.restore();}
  ctx.save();ctx.translate(-10,-26);ctx.rotate(-0.08-open*0.18);rrect(ctx,-12,-84,24,96,12);ctx.fill();ctx.fillStyle=HIS.nail;ell(ctx,0,-74,7,9);ctx.fill();ctx.restore();
  ctx.fillStyle=HIS.skin;ctx.save();ctx.translate(-44,-10);ctx.rotate(-0.7+open*0.25);rrect(ctx,-12,-70,24,82,12);ctx.fill();ctx.fillStyle=HIS.nail;ell(ctx,0,-60,7,9);ctx.fill();ctx.restore();
  ctx.fillStyle=HIS.skinSh;ell(ctx,22,22,26,16,0.4);ctx.fill();
  ctx.restore();
}
const COINS_A=[
  {at:14.6,who:'her',time:'17:40',text:'Thank you, i received it. This is so cute and thoughtful. Im glad you trusted me with your passion 🥹🥹🥹'},
  {at:16.8,who:'me', time:'20:29',text:'😭😭 ye mere thori hai'},
  {at:17.8,who:'me', time:'20:30',text:'its not about me'},
  {at:18.8,who:'me', time:'20:30',text:'uss din apne bola tha na one day you will travel the world'},
  {at:20.0,who:'me', time:'20:30',text:'amd make a collection of different countries different money'},
  {at:21.2,who:'me', time:'20:30',text:'so here we are starting it'},
  {at:23.0,who:'her',time:'20:55',text:'InshaAllah for more to come'},
  {at:24.2,who:'her',time:'20:55',text:'Han han, i know, and i do remember'},
  {at:25.0,who:'her',time:'20:55',text:'🥹🥹🥹'},
];
const COINS_B=[
  {at:26.8,who:'me', time:'11:03',text:'coins tou dekhana konse diye usne'},
  {at:28.0,who:'her',time:'11:04',text:'Turkish lira cent , us cent , euro coin , uae ka coin hai'},
  {at:29.2,who:'her',time:'11:04',text:'Aur saudis ka bhi hai'},
  {at:30.6,who:'me', time:'11:04',text:'wah adhi duniya collect krli'},
  {at:32.0,who:'her',time:'11:05',text:'Lollll hannn🥹🥹'},
  {at:33.2,who:'me', time:'11:05',text:'baki adhi tou meim ho'},
  {at:33.8,who:'me', time:'11:05',text:'😋'},
];
scene({id:'coins',name:'10 April · the five coins',when:'2026-04-10T17:40',bars:11,fin:['#000000',1.2],fout:['#000000',1.2],
  note:'five coins laid out on a cloth by his hand — a Turkish lira cent, a US cent, a euro, a dirham, a riyal — knotted up for an inDrive rider; her message at 17:40, his answer at 20:29, and the next morning the two halves of the world.',
  tag:'“Im glad you trusted me with your passion” · “baki adhi tou meim ho”',
  prep(){
    const R=rooms(),c=mk(W,H),g=c.getContext('2d'),r=rng(421);
    g.fillStyle=vgrad(g,0,H,[[0,'#4a3222'],[1,'#2a1a10']]);g.fillRect(0,0,W,H);
    g.strokeStyle='rgba(0,0,0,.18)';g.lineWidth=1;for(let i=0;i<70;i++){const y=r()*H;g.beginPath();g.moveTo(0,y);g.bezierCurveTo(400,y+(r()-0.5)*30,900,y+(r()-0.5)*30,W,y+(r()-0.5)*20);g.stroke();}
    const desk=mk(W,H),dg=desk.getContext('2d');dg.drawImage(c,0,0);{const lamp=dg.createRadialGradient(560,300,0,560,300,620);lamp.addColorStop(0,'rgba(255,205,140,.32)');lamp.addColorStop(1,'rgba(255,205,140,0)');dg.fillStyle=lamp;dg.fillRect(0,0,W,H);const vig=dg.createRadialGradient(640,360,300,640,360,820);vig.addColorStop(0,'rgba(0,0,0,0)');vig.addColorStop(1,'rgba(0,0,0,.55)');dg.fillStyle=vig;dg.fillRect(0,0,W,H);}
    g.save();g.translate(640,360);g.rotate(-0.04);g.fillStyle='rgba(0,0,0,.35)';rrect(g,-470,-250,940,520,26);g.fill();
    g.fillStyle=vgrad(g,-250,270,[[0,'#6a2742'],[0.5,'#56203a'],[1,'#3e1629']]);rrect(g,-460,-260,920,520,24);g.fill();
    g.save();rrect(g,-460,-260,920,520,24);g.clip();
    for(let i=0;i<14;i++){const x=-520+i*80+(r()-0.5)*30,w=24+r()*40;const fg=g.createLinearGradient(x,0,x+w,0);fg.addColorStop(0,'rgba(0,0,0,0)');fg.addColorStop(0.5,`rgba(${r()<0.5?0:255},${r()<0.5?0:220},${r()<0.5?0:200},${0.05+r()*0.06})`);fg.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=fg;g.save();g.rotate(0.35);g.fillRect(x,-600,w,1200);g.restore();}
    g.restore();g.restore();
    const lamp=g.createRadialGradient(560,300,0,560,300,620);lamp.addColorStop(0,'rgba(255,205,140,.32)');lamp.addColorStop(1,'rgba(255,205,140,0)');g.fillStyle=lamp;g.fillRect(0,0,W,H);
    const vig=g.createRadialGradient(640,360,300,640,360,820);vig.addColorStop(0,'rgba(0,0,0,0)');vig.addColorStop(1,'rgba(0,0,0,.55)');g.fillStyle=vig;g.fillRect(0,0,W,H);
    const night=mk(W,H),ng=night.getContext('2d');ng.drawImage(R.night,0,0);ng.fillStyle='rgba(4,4,12,.4)';ng.fillRect(0,0,W,H);
    return{cloth:c,desk,night,morning:R.morning};},
  draw(ctx,lt,A){
    if(lt<13.6){
      ctx.drawImage(A.cloth,0,0);
      /* the coins already down, their labels */
      for(const c of A1_COINS){const L=c.at;if(lt<L)continue;const sq=Math.sin(clamp((lt-L)/0.28)*Math.PI/2),bounce=1+0.08*(1-smooth(L,L+0.35,lt));a1_coinFace(ctx,c.x,c.y,38*bounce,sq,c);
        const la=smooth(L+0.5,L+1.0,lt);if(la>0){ctx.save();ctx.globalAlpha=la*0.9;ctx.fillStyle='#f1dcc6';ctx.font='700 17px "Dancing Script",cursive';ctx.textAlign='center';ctx.fillText(c.label,c.x,c.y+64);ctx.restore();}}
      /* the hand bringing the next one */
      for(const c of A1_COINS){const L=c.at,t0=L-1.3,t1=L-0.3;if(lt<t0||lt>L+0.8)continue;
        const a=-0.55,px=-38,py=-98,ox=px*Math.cos(a)-py*Math.sin(a),oy=px*Math.sin(a)+py*Math.cos(a);
        const inU=easeOut((lt-t0)/(t1-t0)),outU=smooth(L,L+0.8,lt);const hx0=1240,hy0=820,tx=c.x-ox,ty=c.y-oy;
        const hx=lt<t1?lerp(hx0,tx,inU):lerp(tx,hx0,outU),hy=lt<t1?lerp(hy0,ty,inU):lerp(ty,hy0,outU),open=lt<t1?0:1-outU*0.4;
        if(lt<t1){coin(ctx,c.x,c.y-14,36,0.35);}
        else if(lt<L){const u=(lt-t1)/(L-t1);coin(ctx,c.x,c.y-14-26*Math.sin(Math.PI*u)+14*u,36,u*2.5*Math.PI);}
        a1_pinchHand(ctx,hx,hy,a,open);}
      /* the cloth folds over the coins */
      const f=smooth(11.4,13.3,lt);if(f>0){/* the right half folds over the coins, hinged at x=760 */
        const top=x=>118-0.0403*(x-170),bot=x=>639-0.0403*(x-191),th=easeIO(f)*Math.PI,fe=760+330*Math.cos(th),fl=760,lift=Math.sin(th);
        /* the desk shows where the right half used to lie */
        const ex=Math.max(fl,fe);ctx.save();ctx.beginPath();ctx.moveTo(ex,top(ex)-6);ctx.lineTo(1120,top(1120)-6);ctx.lineTo(1120,bot(1120)+6);ctx.lineTo(ex,bot(ex)+6);ctx.closePath();ctx.clip();ctx.drawImage(A.desk,0,0);ctx.restore();
        ctx.save();ctx.fillStyle=`rgba(0,0,0,${0.25+0.25*lift})`;ctx.beginPath();ctx.moveTo(fl,top(fl)+6);ctx.lineTo(fe+(fe<fl?-14:14)*lift,top(fe)+4);ctx.lineTo(fe+(fe<fl?-10:10)*lift,bot(fe)+12);ctx.lineTo(fl,bot(fl)+12);ctx.closePath();ctx.fill();
        ctx.fillStyle=vgrad(ctx,80,640,[[0,mixHex('#62264a','#2a0e22',lift*0.5)],[1,mixHex('#3c1530','#1a0812',lift*0.5)]]);ctx.beginPath();ctx.moveTo(fl,top(fl));ctx.lineTo(fe,top(fe));ctx.lineTo(fe,bot(fe));ctx.lineTo(fl,bot(fl));ctx.closePath();ctx.fill();
        ctx.strokeStyle='rgba(255,220,200,.22)';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(fe,top(fe));ctx.lineTo(fe,bot(fe));ctx.stroke();ctx.strokeStyle='rgba(0,0,0,.3)';ctx.beginPath();ctx.moveTo(fl,top(fl));ctx.lineTo(fl,bot(fl));ctx.stroke();ctx.restore();}
      motes(ctx,lt,18,422,'#ffd9a8',1.2,0.4);
      return;
    }
    const morning=lt>=26.4;
    ctx.drawImage(morning?A.morning:A.night,0,0);
    const S=drawPhoneHand(ctx,lt,{x:475,y:120,w:330,h:700});
    if(!morning){a1_chat(ctx,S,COINS_A,lt,{name:'Fabeha',status:'online'});phoneTop(ctx,S,{time:lt<16.8?'17:40':lt<17.8?'20:29':lt<23?'20:30':'20:55'});}
    else{a1_chat(ctx,S,COINS_B,lt,{name:'Fabeha',status:'online',dark:false});phoneTop(ctx,S,{time:lt<28?'11:03':lt<32?'11:04':'11:05'});}
  },
  subs:[
    [0.6,4.4,'10 April, afternoon. Before the parcel went, I laid them out once more on a cloth.'],
    [4.8,9.8,'Five coins a friend had brought home from his travels: a Turkish lira cent, an American cent, a euro, a dirham, a riyal.'],
    [10.2,13.2,'Knotted in the cloth, handed to a friend, handed to an inDrive rider.'],
    [14.8,18.4,'Thank you, i received it. This is so cute and thoughtful. Im glad you trusted me with your passion 🥹🥹🥹','her'],
    [19.0,21.0,'uss din apne bola tha na one day you will travel the world','him'],
    [21.4,23.0,'so here we are starting it','him'],
    [23.4,26.0,'She had said it once, in passing: one day she would travel, and collect the money of the world. So we started.'],
    [28.2,30.4,'Turkish lira cent , us cent , euro coin , uae ka coin hai','her'],
    [30.8,32.2,'wah adhi duniya collect krli','him'],
    [33.4,35.6,'baki adhi tou meim ho','him'],
  ],
  score({hit,bars,melody,THEME}){
    bars(0,6,['G','Em7','Cadd9','Dsus'],{padVel:0.3});
    for(const c of A1_COINS)hit(c.at,'chime',{midi:c.midi,vel:0.55});
    for(let b=1;b<5;b++)melody(b,b-1,'box',0,0.34,THEME);
    bars(6,5,['Em','Cmaj7','G','D'],{padVel:0.36,arp:true,arpVel:0.12});
    for(let b=7;b<11;b++)melody(b,b-7,'box',12,0.26,THEME);
    for(const m of COINS_A.concat(COINS_B))hit(m.at,'tick',{hi:m.who==='her'});
  },
  amb(lt){return lt<13.6?{room:0.22}:lt<26.4?{room:0.25}:{room:0.15,wind:0.06};},
});

/* ---------- 10 April · 16:10 — a voice note from a petrol pump; 11 April · noon — the map ---------- */
const SOCLOSE_A=[
  {at:4.4, who:'me', time:'16:10',voice:{dur:2.5},sent:5.6},
  {at:8.4, who:'her',time:'16:22',text:'Mein toh ghar pe nhi hun'},
  {at:9.8, who:'her',time:'16:24',text:'Acha ruko'},
  {at:10.6,who:'her',time:'16:24',text:'Vn mat bhejo'},
  {at:12.0,who:'her',time:'16:24',text:'Amma kay sath hun'},
  {at:13.4,who:'me', time:'16:25',text:'ap enjoy kro'},
];
const SOCLOSE_B=[
  {at:19.8,who:'her',time:'12:18',text:'Mein wahi thi ussi waqt'},
  {at:22.2,who:'her',time:'12:19',text:'Damnnn we were so close yet so far'},
  {at:24.6,who:'me', time:'12:19',text:'Maine wahab se ghusne se 5min phly'},
  {at:25.6,who:'me', time:'12:20',text:'Apko msg kiya'},
  {at:27.4,who:'her',time:'12:30',text:'Acha makes sense no wonder awaz itni clustered thi'},
  {at:29.0,who:'me', time:'12:32',text:'Pata hoota millete'},
  {at:31.0,who:'me', time:'12:33',text:'Ayeee naseeb'},
  {at:31.8,who:'me', time:'12:33',text:'Itba close'},
  {at:32.6,who:'me', time:'12:33',text:'Yet itnaaaaa'},
  {at:33.4,who:'me', time:'12:33',text:'Far fatched'},
  {at:34.0,who:'me', time:'12:33',text:'😭'},
];
const A1_ROUTE=[[760,420],[740,420],[740,520],[1000,520],[1000,560]];
function a1_pin(ctx,x,y,col,drop,t){
  const u=easeOut(clamp((t-drop)/0.5)),bounce=t>drop+0.5?0:Math.sin(clamp((t-drop-0.3)/0.3)*Math.PI)*6;if(t<drop)return;
  const yy=y-(1-u)*90-bounce;
  if(t>drop+0.5){const p=((t-drop-0.5)%2.2)/2.2;ctx.strokeStyle=hexA(col,0.5*(1-p));ctx.lineWidth=2;circle(ctx,x,y,8+p*42);ctx.stroke();}
  ctx.fillStyle='rgba(0,0,0,.2)';ell(ctx,x,y+2,9*u,4*u);ctx.fill();
  ctx.fillStyle=col;ctx.beginPath();ctx.moveTo(x,yy);ctx.lineTo(x-13,yy-26);ctx.arc(x,yy-32,14,Math.PI*0.9,Math.PI*2.1);ctx.lineTo(x,yy);ctx.closePath();ctx.fill();
  ctx.fillStyle='#fff';circle(ctx,x,yy-32,5.5);ctx.fill();
}
scene({id:'soclose',name:'So close, yet so far',when:'2026-04-10T16:10',bars:11,fin:['#000000',1.2],fout:['#000000',1.4],
  note:'through the windscreen at a petrol pump on Shahrah-e-Faisal, a two-second voice note she could not play; then, at noon the next day, a map of SMCHS with two pins five minutes apart at the same hour, neither of them knowing.',
  tag:'“Damnnn we were so close yet so far” · “Ayeee naseeb”',
  prep(){
    const r=rng(431),st=mk(W,H),g=st.getContext('2d');
    g.fillStyle=vgrad(g,0,H,[[0,'#9fbdd8'],[0.42,'#d6dbd6'],[0.6,'#e9dfc8'],[1,'#e9dfc8']]);g.fillRect(0,0,W,H);
    sunGlow(g,1040,110,380,'rgba(255,246,220,0.7)');
    for(let i=0;i<40;i++){const x=i*34+(r()-0.5)*20,w=26+r()*40,h=30+r()*90,c=['#b5afa3','#a9a398','#bdb7ab'][i%3];g.fillStyle=c;g.fillRect(x,400-h,w,h);g.fillStyle='rgba(255,255,255,.25)';for(let k=0;k<Math.floor(h/14);k++)g.fillRect(x+4,400-h+6+k*14,w-8,3);}
    for(const[x,y,w,h,c]of[[60,286,120,60,'#d85a4a'],[960,296,140,70,'#3a7fc1']]){g.fillStyle='#777';g.fillRect(x+w/2-3,y+h,6,400-y-h);g.fillStyle=c;g.fillRect(x,y,w,h);g.fillStyle='rgba(255,255,255,.7)';g.fillRect(x+10,y+16,w-20,8);g.fillRect(x+10,y+32,w*0.5,8);}
    for(const[x,s]of[[30,1],[1150,1.15],[1240,0.9]]){g.strokeStyle='#6b5a3a';g.lineWidth=6*s;g.beginPath();g.moveTo(x,400);g.quadraticCurveTo(x+10*s,300,x+4*s,240);g.stroke();g.fillStyle='#4f7a3a';for(let k=0;k<7;k++){g.save();g.translate(x+4*s,240);g.rotate(k/7*TAU);ell(g,30*s,0,34*s,9*s);g.fill();g.restore();}}
    g.fillStyle='rgba(233,223,200,.35)';g.fillRect(0,280,W,130);
    g.fillStyle=vgrad(g,400,H,[[0,'#cfc9bd'],[1,'#a8a295']]);g.fillRect(0,400,W,320);
    g.fillStyle='rgba(255,255,255,.35)';for(let k=0;k<5;k++){const u=k/5,y=430+u*u*300,w=6+u*30;g.fillRect(640-w/2-200+u*60,y,w,8+u*18);}
    g.fillStyle='#e8bf2d';g.fillRect(140,190,1000,46);g.fillStyle='#d9372b';g.fillRect(140,236,1000,12);g.fillStyle='rgba(0,0,0,.08)';g.fillRect(140,248,1000,8);
    g.fillStyle='#bfc2c6';for(const x of[250,640,1030])g.fillRect(x-12,248,24,200);
    g.fillStyle='#9a9a9a';g.fillRect(1095,120,10,300);g.fillStyle='#fff';rrect(g,1045,96,110,56,8);g.fill();g.fillStyle='#d9372b';g.font='700 26px "Mulish",sans-serif';g.textAlign='center';g.fillText('SHELL',1100,134);
    for(const x of[430,820]){g.fillStyle='#f2f2f0';rrect(g,x,330,100,120,8);g.fill();g.fillStyle='#d9372b';g.fillRect(x,330,100,16);g.fillStyle='#222';g.fillRect(x+12,360,76,30);g.fillStyle='#888';g.fillRect(x+80,400,10,50);g.fillStyle='#444';g.fillRect(x+70,395,30,10);}
    const cx=400,cy=478;g.fillStyle='#e9e9ea';rrect(g,cx-80,cy-60,160,60,14);g.fill();g.fillStyle='#2a3a4a';rrect(g,cx-60,cy-66,120,30,10);g.fill();g.fillStyle='#c0392b';g.fillRect(cx-70,cy-30,20,8);g.fillRect(cx+50,cy-30,20,8);g.fillStyle='#222';g.fillRect(cx-70,cy-4,30,10);g.fillRect(cx+40,cy-4,30,10);
    g.fillStyle='rgba(255,236,200,.1)';g.fillRect(0,0,W,H);
    /* the map of SMCHS, drawn once */
    const M=mk(1600,1000),m=M.getContext('2d'),mr=rng(432);
    m.fillStyle='#ece7da';m.fillRect(0,0,1600,1000);
    const xs=[-40,200,380,560,740,920,1100,1280,1460,1640],ys=[160,280,400,520,640,760,880,1040];
    for(let i=0;i<xs.length-1;i++)for(let j=0;j<ys.length-1;j++){const x=xs[i]+8,y=ys[j]+8,w=xs[i+1]-xs[i]-16,h=ys[j+1]-ys[j]-16;m.fillStyle=mixHex('#e3ddcd','#d6cfbc',mr()*0.7);rrect(m,x,y,w,h,6);m.fill();for(let k=0;k<7;k++){m.fillStyle='rgba(0,0,0,.05)';m.fillRect(x+6+mr()*(w-30),y+6+mr()*(h-24),12+mr()*14,10+mr()*10);}}
    m.fillStyle='#cfe3b5';rrect(m,1108,648,164,104,30);m.fill();m.fillStyle='#a9c98a';for(let k=0;k<9;k++){circle(m,1124+mr()*132,664+mr()*72,6+mr()*6);m.fill();}
    m.fillStyle='#ece7da';circle(m,920,520,46);m.fill();m.fillStyle='#cfe3b5';circle(m,920,520,24);m.fill();m.strokeStyle='#d6d0c0';m.lineWidth=1;circle(m,920,520,46);m.stroke();
    m.strokeStyle='#e0c66f';m.lineWidth=42;m.lineCap='round';m.beginPath();m.moveTo(-20,300);m.lineTo(1620,80);m.stroke();m.strokeStyle='#f6e3a1';m.lineWidth=34;m.beginPath();m.moveTo(-20,300);m.lineTo(1620,80);m.stroke();
    m.strokeStyle='rgba(255,255,255,.7)';m.lineWidth=2;m.setLineDash([14,12]);m.beginPath();m.moveTo(-20,300);m.lineTo(1620,80);m.stroke();m.setLineDash([]);
    m.save();m.translate(560,228);m.rotate(Math.atan2(-220,1640));m.fillStyle='#7a6a3a';m.font='700 15px "Mulish",sans-serif';m.textAlign='center';setLS(m,'3px');m.fillText('SHAHRAH-E-FAISAL',0,-28);setLS(m,'0px');m.restore();
    m.fillStyle='rgba(0,0,0,.11)';m.font='700 46px "Mulish",sans-serif';m.textAlign='center';setLS(m,'8px');m.fillText('S.M.C.H.S.',900,760);setLS(m,'0px');
    const mark=(x,y,col,icon,txt,dx,dy)=>{m.fillStyle=col;rrect(m,x-11,y-11,22,22,6);m.fill();m.fillStyle='#fff';m.font='700 12px "Mulish",sans-serif';m.textAlign='center';m.fillText(icon,x,y+4);if(txt){m.fillStyle='#4a4a4a';m.font='600 13px "Mulish",sans-serif';m.textAlign='left';m.fillText(txt,x+dx,y+dy);}};
    mark(430,246,'#3f6fc4','S','Shell',-10,-18);mark(740,280,'#c0392b','K','KFC chowk',16,5);mark(760,420,'#e8a33d','A','',0,0);mark(1000,560,'#8e6cc9','H','',0,0);
    m.fillStyle='#8a8a8a';m.font='500 11px "Mulish",sans-serif';m.textAlign='center';m.fillText('park',1190,712);m.fillText('roundabout',920,586);
    return{street:st,map:M};},
  draw(ctx,lt,A){
    if(lt<15.5){
      ctx.save();ctx.translate(0,Math.sin(lt*7)*0.6);ctx.drawImage(A.street,0,0);ctx.restore();
      cockpit(ctx,lt,{});
      const S=drawPhoneHand(ctx,lt,{x:820,y:150,w:300,h:640});
      a1_chat(ctx,S,SOCLOSE_A,lt,{name:'Fabeha',status:lt<8?'last seen today at 12:37':'online',rec:lt>1.4&&lt<4.1?lt-1.4:null});
      phoneTop(ctx,S,{time:lt<8.4?'16:10':lt<9.8?'16:22':lt<13.4?'16:24':'16:25'});
      if(lt>15.1){ctx.fillStyle=`rgba(0,0,0,${smooth(15.1,15.5,lt)})`;ctx.fillRect(0,0,W,H);}
      return;
    }
    const u=smooth(15.5,36.7,lt),s=lerp(0.9,1.0,u);
    ctx.save();ctx.translate(640,360);ctx.scale(s,s);ctx.translate(-880,-480);
    ctx.drawImage(A.map,0,0);
    /* the route between the two pins */
    const ru=smooth(21,23.5,lt);if(ru>0){let tot=0;const segs=[];for(let i=1;i<A1_ROUTE.length;i++){const[a,b]=[A1_ROUTE[i-1],A1_ROUTE[i]],l=Math.hypot(b[0]-a[0],b[1]-a[1]);segs.push(l);tot+=l;}let left=tot*ru;ctx.strokeStyle='#3f6fc4';ctx.lineWidth=5;ctx.lineCap='round';ctx.setLineDash([10,9]);ctx.beginPath();ctx.moveTo(A1_ROUTE[0][0],A1_ROUTE[0][1]);for(let i=1;i<A1_ROUTE.length&&left>0;i++){const[a,b]=[A1_ROUTE[i-1],A1_ROUTE[i]],l=segs[i-1],k=Math.min(1,left/l);ctx.lineTo(lerp(a[0],b[0],k),lerp(a[1],b[1],k));left-=l;}ctx.stroke();ctx.setLineDash([]);}
    if(lt>23.6){const a=smooth(23.6,24.1,lt);ctx.save();ctx.globalAlpha=a;ctx.fillStyle='#3f6fc4';rrect(ctx,842,476,76,26,13);ctx.fill();ctx.fillStyle='#fff';ctx.font='700 13px "Mulish",sans-serif';ctx.textAlign='center';ctx.fillText('≈ 5 min',880,494);ctx.restore();}
    a1_pin(ctx,760,420,'#e0453a',17.0,lt);a1_pin(ctx,1000,560,'#e86a9a',19.6,lt);
    const card=(x,y,lines,drop)=>{const a=smooth(drop+0.5,drop+0.9,lt);if(a<=0)return;ctx.save();ctx.globalAlpha=a;ctx.fillStyle='rgba(255,255,255,.94)';ctx.shadowColor='rgba(0,0,0,.2)';ctx.shadowBlur=10;ctx.shadowOffsetY=3;rrect(ctx,x,y,196,48,10);ctx.fill();ctx.shadowBlur=0;ctx.fillStyle='#222';ctx.textAlign='left';ctx.font='700 13px "Mulish",sans-serif';ctx.fillText(lines[0],x+12,y+20);ctx.fillStyle='#666';ctx.font='500 12px "Mulish",sans-serif';ctx.fillText(lines[1],x+12,y+38);ctx.restore();};
    card(782,372,['me · Alvigha, with Ammi','4:10 – 5:24'],17.0);card(1022,540,['her · a friend’s house','cake, till about 4:20'],19.6);
    ctx.restore();
    if(lt<15.9){ctx.fillStyle=`rgba(0,0,0,${1-smooth(15.5,15.9,lt)})`;ctx.fillRect(0,0,W,H);}
    /* the lines, floating over the map */
    const vis=SOCLOSE_B.filter(m=>m.at<=lt).slice(-5);let y=64;
    for(const m of vis){const a=smooth(m.at,m.at+0.3,lt);const bh=a1_bubble(ctx,m.who==='me'?470:40,y,400,m.text,m.who,m.time,a);y+=bh+10;}
  },
  subs:[
    [0.6,4.6,'10 April, 16:10. A petrol pump on Shahrah-e-Faisal, Ammi in the next seat. I sent her a voice note from the car.'],
    [5.0,8.2,'Two seconds long, through the car speaker. When she finally played it, it sounded like a crowd.'],
    [8.6,10.2,'Mein toh ghar pe nhi hun','her'],
    [10.8,12.0,'Vn mat bhejo','her'],
    [12.2,13.4,'Amma kay sath hun','her'],
    [13.6,15.3,'She was at a friend’s house, a few streets away. Neither of us knew that yet.'],
    [16.2,19.0,'At noon the next day, we compared afternoons.'],
    [20.0,22.0,'Mein wahi thi ussi waqt','her'],
    [22.4,24.4,'Damnnn we were so close yet so far','her'],
    [25.0,28.8,'Alvigha with Ammi from ten past four. Her friend’s house behind the roundabout, till twenty past. The same lane. Five minutes, maybe less.'],
    [29.2,30.6,'Pata hoota millete','him'],
    [31.2,32.4,'Ayeee naseeb','him'],
    [32.8,35.4,'Itba close … Yet itnaaaaa … Far fatched','him'],
  ],
  score({hit,bars,melody,THEME_B,THEME_C}){
    bars(0,5,['Am7','Fmaj7','Cmaj7','G'],{padVel:0.26});
    melody(1,0,'flute',-12,0.3,THEME_C);melody(2,1,'flute',-12,0.3,THEME_C);
    bars(5,6,['Em','Cmaj7','G','Dsus'],{padVel:0.4,strings:true,arp:true,arpVel:0.1,step:1});
    for(let b=6;b<10;b++)melody(b,b-6,'piano',0,0.34,THEME_B);
    hit(17.0,'chime',{midi:79,vel:0.5});hit(19.6,'chime',{midi:83,vel:0.5});hit(23.6,'chime',{midi:86,vel:0.4});
    for(const m of SOCLOSE_A.concat(SOCLOSE_B))hit(m.at,'tick',{hi:m.who==='her'});
  },
  amb(lt){return lt<15.5?{hum:0.5,wind:0.12}:{room:0.2};},
});

/* ---------- 10 April · 00:00 — the other side of the wish: five frozen seconds on WhatsApp Web ---------- */
const A1_SEND=3.4,A1_SENT=9.2;   /* film seconds: send pressed, delivered */
function a1_waWeb(g,x,y,w,h,lt){
  g.fillStyle='#111b21';g.fillRect(x,y,w,h);
  const lw=Math.round(w*0.3);g.fillStyle='#111b21';g.fillRect(x,y,lw,h);g.fillStyle='#202c33';g.fillRect(x,y+16,lw,44);g.fillStyle='#2a3942';rrect(g,x+10,y+66,lw-20,26,13);g.fill();g.fillStyle='#8696a0';g.font='500 10px "Mulish",sans-serif';g.textAlign='left';g.fillText('Search or start a new chat',x+22,y+83);
  const r=rng(77);for(let k=0;k<9;k++){const ry=y+104+k*56;if(k===0){g.fillStyle='#2a3942';g.fillRect(x,ry-8,lw,56);}g.fillStyle=['#d8b4a0','#8fa3b5','#b5a08f','#9fb58f'][k%4];circle(g,x+26,ry+18,16);g.fill();g.fillStyle=k===0?'#e9edef':'#8696a0';g.font=(k===0?'700 ':'600 ')+'12px "Mulish",sans-serif';g.fillText(k===0?'Fabeha':'',x+52,ry+14);g.fillStyle='rgba(134,150,160,.45)';if(k>0)g.fillRect(x+52,ry+6,60+r()*70,8);g.fillRect(x+52,ry+24,90+r()*90,6);}
  g.fillStyle='#2a3942';g.fillRect(x+lw,y,1,h);
  const rx=x+lw+1,rw=w-lw-1;g.fillStyle='#0b141a';g.fillRect(rx,y,rw,h);g.fillStyle='rgba(255,255,255,.03)';const rr=rng(9);for(let i=0;i<140;i++){circle(g,rx+rr()*rw,y+rr()*h,1+rr()*3);g.fill();}
  g.fillStyle='#202c33';g.fillRect(rx,y+16,rw,44);g.fillStyle='#d8b4a0';circle(g,rx+30,y+38,15);g.fill();g.fillStyle='#2a1d22';ell(g,rx+30,y+34,11,10);g.fill();g.fillStyle='#f3d8c4';ell(g,rx+30,y+39,8,9);g.fill();g.fillStyle='#e9edef';g.font='700 13px "Mulish",sans-serif';g.fillText('Fabeha',rx+54,y+36);g.fillStyle='#8696a0';g.font='500 10px "Mulish",sans-serif';g.fillText('online',rx+54,y+50);
  /* the connection banner */
  const ban=smooth(A1_SEND+0.3,A1_SEND+0.6,lt)*(1-smooth(A1_SENT,A1_SENT+0.4,lt));if(ban>0){g.save();g.globalAlpha=ban;g.fillStyle='#ffd279';g.fillRect(rx,y+60,rw,34);g.fillStyle='#3b2f0b';g.font='700 11px "Mulish",sans-serif';g.fillText('Computer not connected',rx+42,y+74);g.font='500 10px "Mulish",sans-serif';g.fillText('Make sure your computer has an active Internet connection.',rx+42,y+88);g.strokeStyle='#3b2f0b';g.lineWidth=1.5;circle(g,rx+22,y+77,9);g.stroke();g.fillStyle='#3b2f0b';g.fillRect(rx+21,y+72,2,6);g.fillRect(rx+21,y+80,2,2);g.restore();}
  /* the bubbles */
  const B=[[A1_SEND,'happy birthday my love'],[A1_SEND+0.25,'❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️'],[A1_SEND+0.5,'🔗 fabeha-happybirthday-love.tiiny.site']];
  let by=y+h-120;g.font='500 12px "Mulish",sans-serif';
  for(let i=B.length-1;i>=0;i--){const[at,txt]=B[i];if(lt<at)continue;const tw=g.measureText(txt).width+70,bh=38;by-=bh+6;const bx=rx+rw-18-tw;g.fillStyle='#005c4b';rrect(g,bx,by,tw,bh,8);g.fill();g.fillStyle='#e9edef';g.textAlign='left';g.fillText(txt,bx+10,by+17);g.fillStyle='rgba(233,237,239,.55)';g.font='500 9px "Mulish",sans-serif';g.textAlign='right';g.fillText('00:00  '+(lt<A1_SENT?'🕓':'✓✓'),bx+tw-8,by+32);g.font='500 12px "Mulish",sans-serif';}
  /* the composer */
  g.fillStyle='#202c33';g.fillRect(rx,y+h-56,rw,56);g.fillStyle='#2a3942';rrect(g,rx+50,y+h-44,rw-110,32,8);g.fill();
  const typed=lt<A1_SEND?'happy birthday my love':'';g.fillStyle=typed?'#e9edef':'#8696a0';g.font='500 12px "Mulish",sans-serif';g.textAlign='left';g.fillText(typed||'Type a message',rx+62,y+h-24);
  if(typed&&Math.floor(lt*2)%2===0){const cw=g.measureText(typed).width;g.fillRect(rx+64+cw,y+h-36,1.5,16);}
  g.fillStyle='#8696a0';g.font='500 14px "Mulish",sans-serif';g.fillText('☺',rx+16,y+h-23);g.fillText('🎤',rx+rw-40,y+h-22);
  /* the menu bar with the seconds */
  const sec=lt<A1_SEND?0:Math.min(23,Math.floor((lt-A1_SEND)/(A1_SENT-A1_SEND)*23));
  g.fillStyle='rgba(0,0,0,.6)';g.fillRect(x,y,w,16);g.fillStyle='#fff';g.font='500 10px "Mulish",sans-serif';g.textAlign='right';g.fillText((lt<A1_SEND?'Thu 9 Apr  23:59:'+String(52+Math.min(7,Math.floor(lt*3))).padStart(2,'0'):'Fri 10 Apr  00:00:'+String(sec).padStart(2,'0')),x+w-10,y+12);g.textAlign='left';g.fillText('⌘  WhatsApp',x+10,y+12);
  if(lt>A1_SEND+0.3&&lt<A1_SENT){g.fillStyle='#ffd279';g.font='700 10px "Mulish",sans-serif';g.textAlign='right';g.fillText('⚠  Wi-Fi: no internet',x+w-130,y+12);}
}
scene({id:'deadphone',name:'10 April · five seconds',when:'2026-04-10T00:01',bars:4,fin:['#000000',1.2],fout:['#000000',1.2],
  note:'the same midnight from the other side: WhatsApp Web on his laptop, the wish pressed at twelve and stuck behind a yellow banner for five seconds, delivered at 00:00:23.',
  tag:'“laptop pe kraha tha net stuck hogya for 5sec”',
  prep(){const R=rooms(),c=mk(W,H),g=c.getContext('2d');g.drawImage(R.night,0,0);g.fillStyle='rgba(4,4,12,.5)';g.fillRect(0,0,W,H);return{bg:c};},
  draw(ctx,lt,A){
    ctx.drawImage(A.bg,0,0);
    a1_laptop(ctx,lt,{screen:(g,x,y,w,h)=>a1_waWeb(g,x,y,w,h,lt),glowCol:'#7fb7a8'});
  },
  subs:[
    [0.6,3.2,'The same midnight, from my side of it. The wish typed and waiting on the laptop at 23:59.'],
    [3.6,8.8,'Then the net froze. Five seconds, with a yellow banner over them. I counted every one. 00:00:23.'],
    [9.6,12.4,'Delivered. She answered twenty-seven seconds later.'],
  ],
  score({hit,bars}){
    bars(0,4,['Em','Cmaj7','Am7','Dsus'],{padVel:0.42});
    hit(A1_SEND+0.25,'tick',{});hit(A1_SENT,'tick',{});hit(A1_SENT+0.4,'tick',{});
  },
  amb(lt){return{room:0.28,hum:0.1};},
});

/* ---------- 12 April · 02:08 — kagaz ka gulab: the paper rose made for the comsec day, and lost ---------- */
function a1_rose(ctx,x,y,s,n,t){
  ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.rotate(t*0.02);
  const cols=['#e89cb2','#f2b3c4','#dd87a2','#f6c3d0'];
  for(let i=n-1;i>=0;i--){const a=i*2.39996+0.4,r=6+i*6.5,rx=16+i*2.2,ry=11+i*1.4;ctx.save();ctx.rotate(a);ctx.translate(r,0);ctx.rotate(0.5);ctx.fillStyle=cols[i%cols.length];ell(ctx,0,0,rx,ry,0);ctx.fill();ctx.strokeStyle='rgba(120,40,70,.35)';ctx.lineWidth=1.2;ctx.stroke();ctx.fillStyle='rgba(255,255,255,.18)';ell(ctx,-rx*0.25,-ry*0.3,rx*0.5,ry*0.35,0);ctx.fill();ctx.restore();}
  ctx.fillStyle='#c9607f';circle(ctx,0,0,4);ctx.fill();
  ctx.restore();
}
function a1_stem(ctx,x,y,s,u){
  ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.strokeStyle='#5c8a4a';ctx.lineWidth=7;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(0,0);ctx.quadraticCurveTo(30,60*u,24,130*u);ctx.stroke();
  ctx.strokeStyle='#6f9f58';ctx.lineWidth=2.5;ctx.beginPath();ctx.moveTo(-2,4);ctx.quadraticCurveTo(28,60*u,22,128*u);ctx.stroke();
  if(u>0.7){ctx.fillStyle='#6f9f58';ctx.save();ctx.translate(18,70);ctx.rotate(0.9);ell(ctx,0,0,26,10,0);ctx.fill();ctx.restore();}
  ctx.restore();
}
/* a hand from above (first person) resting on the paper: palm, four fingers, thumb */
function a1_flatHand(ctx,x,y,a,mirror){
  ctx.save();ctx.translate(x,y);ctx.rotate(a);if(mirror)ctx.scale(-1,1);ctx.lineCap='round';
  ctx.strokeStyle=HIS.skin;ctx.lineWidth=96;ctx.beginPath();ctx.moveTo(10,50);ctx.lineTo(60,260);ctx.stroke();
  ctx.fillStyle=HIS.skin;ell(ctx,0,0,66,58,0.05);ctx.fill();
  for(const[fx,fy,fa,fl]of[[-34,-36,-0.25,86],[-8,-48,-0.08,96],[18,-46,0.08,90],[42,-32,0.28,74]]){ctx.save();ctx.translate(fx,fy);ctx.rotate(fa);rrect(ctx,-12,-fl,24,fl+14,12);ctx.fill();ctx.fillStyle=HIS.nail;ell(ctx,0,-fl+10,7,9);ctx.fill();ctx.fillStyle=HIS.skin;ctx.restore();}
  ctx.save();ctx.translate(-56,-4);ctx.rotate(-0.9);rrect(ctx,-13,-66,26,78,13);ctx.fill();ctx.fillStyle=HIS.nail;ell(ctx,0,-56,7,9);ctx.fill();ctx.restore();
  ctx.fillStyle=HIS.skinSh;ell(ctx,26,24,26,16,0.4);ctx.fill();
  ctx.restore();
}
const GULAB_B=[
  {at:18.6,who:'me', time:'02:08',text:'eid wala suit i was wearing'},
  {at:19.2,who:'me', time:'02:08',text:'for you'},
  {at:19.8,who:'me', time:'02:08',text:'having the jewelry with me'},
  {at:20.5,who:'me', time:'02:08',text:'lost'},
  {at:21.1,who:'me', time:'02:08',text:'kagaz ka gulab'},
  {at:21.5,who:'me', time:'02:08',text:'😭'},
  {at:21.9,who:'me', time:'02:08',text:'uss din'},
  {at:23.0,who:'her',time:'02:08',text:'How cutee'},
  {at:23.6,who:'her',time:'02:08',text:'Kagaz ka gulab'},
  {at:25.0,who:'me', time:'02:09',text:'but i made it to showcase my love for you everlasting'},
  {at:26.6,who:'her',time:'02:10',text:'Kagaz ka hota na isliye'},
  {at:27.3,who:'her',time:'02:10',text:'Also you made it'},
  {at:28.4,who:'her',time:'02:11',text:'Usko preserve karsakte hain'},
  {at:29.6,who:'me', time:'02:12',text:'or mere pyaaar ko kaise kregi'},
  {at:30.4,who:'me', time:'02:13',text:'wo tou bahirajayegs kyu ke har din bharta hai'},
  {at:31.6,who:'her',time:'02:13',text:'Apko tootne nhi dun gi sounds good?'},
  {at:33.0,who:'me', time:'02:13',text:'spundsss more thaaan gooooooood'},
  {at:36.0,pill:'14 APRIL'},
  {at:36.4,who:'her',time:'05:54',text:'Yeag 6 days to hajj'},
  {at:37.6,who:'her',time:'21:25',text:'Toh make sure ap 6 bajay airport ho'},
  {at:38.6,who:'me', time:'21:25',text:'yess boss'},
  {at:39.0,who:'me', time:'21:26',text:'4 baaje wahee hooga mein'},
];
scene({id:'gulab',name:'12 April · kagaz ka gulab',when:'2026-04-12T02:08',bars:12,fin:['#000000',1.2],fout:['#000000',1.6],
  note:'his hands folding a rose out of pink paper under a lamp; the classroom on the day of her comsec paper, her at the next desk, the Eid kurta sleeve, the rose already lost; then 02:08, telling her; and two days later the countdown — six days to Hajj, be at the airport by six.',
  tag:'“Apko tootne nhi dun gi sounds good?” · “6 days to hajj”',
  prep(){
    const R=rooms(),d=mk(W,H),g=d.getContext('2d'),r=rng(451);
    g.fillStyle=vgrad(g,0,H,[[0,'#2a1c12'],[1,'#120b06']]);g.fillRect(0,0,W,H);
    g.strokeStyle='rgba(0,0,0,.2)';for(let i=0;i<60;i++){const y=r()*H;g.beginPath();g.moveTo(0,y);g.bezierCurveTo(400,y+(r()-0.5)*24,900,y+(r()-0.5)*24,W,y);g.stroke();}
    const lamp=g.createRadialGradient(620,250,0,620,250,520);lamp.addColorStop(0,'rgba(255,214,150,.55)');lamp.addColorStop(0.5,'rgba(255,200,130,.18)');lamp.addColorStop(1,'rgba(255,200,130,0)');g.fillStyle=lamp;g.fillRect(0,0,W,H);
    g.fillStyle='#1c1a22';rrect(g,1040,60,120,26,8);g.fill();g.fillStyle='#2b2a33';g.fillRect(1090,86,20,300);g.fillStyle='#24222b';rrect(g,980,380,240,40,10);g.fill();
    g.fillStyle='#3a3540';rrect(g,150,520,170,22,6);g.fill();g.fillStyle='#8a8f9a';rrect(g,160,526,150,10,4);g.fill();
    /* the classroom, remembered: a window of red brick and lawn, a whiteboard, two rows of desks */
    const c=mk(W,H),k=c.getContext('2d');
    k.fillStyle=vgrad(k,0,H,[[0,'#f1e9d8'],[1,'#d9d0bc']]);k.fillRect(0,0,W,H);
    k.fillStyle='#e6dfcf';k.fillRect(0,0,W,110);k.fillStyle='#cfc6b2';k.fillRect(0,110,W,6);
    k.fillStyle='#fbfbf8';k.fillRect(430,140,480,230);k.fillStyle='#cfc6b2';k.fillRect(426,136,488,4);k.fillRect(426,370,488,6);
    k.strokeStyle='rgba(60,80,140,.35)';k.lineWidth=2;for(let i=0;i<7;i++){k.beginPath();k.moveTo(460+(i%2)*20,170+i*26);k.lineTo(560+((i*73)%280),170+i*26);k.stroke();}
    k.fillStyle='#7d4a3a';k.fillRect(60,130,300,250);k.fillStyle='#9ec8ea';k.fillRect(74,144,272,222);k.fillStyle=vgrad(k,144,366,[[0,'#9ec8ea'],[0.5,'#cfe2ee'],[0.62,'#a94d3c'],[0.82,'#8f3f31'],[1,'#6fa557']]);k.fillRect(74,144,272,222);
    k.strokeStyle='rgba(255,230,210,.25)';for(let y=286;y<326;y+=8){k.beginPath();k.moveTo(74,y);k.lineTo(346,y);k.stroke();}k.fillStyle='#7d4a3a';k.fillRect(206,144,8,222);k.fillRect(74,250,272,8);
    k.fillStyle='#d8cdb5';for(let i=0;i<5;i++){const x=120+i*230;k.fillStyle='#b99d78';k.fillRect(x,420,180,22);k.fillStyle='#8f7657';k.fillRect(x+10,442,10,70);k.fillRect(x+160,442,10,70);}
    k.fillStyle='#a88a62';k.beginPath();k.moveTo(0,560);k.lineTo(W,540);k.lineTo(W,720);k.lineTo(0,720);k.closePath();k.fill();k.fillStyle='#b99d78';k.beginPath();k.moveTo(0,560);k.lineTo(W,540);k.lineTo(W,560);k.lineTo(0,580);k.closePath();k.fill();
    const warm=k.createLinearGradient(0,0,W,0);warm.addColorStop(0,'rgba(255,240,200,.35)');warm.addColorStop(0.5,'rgba(255,240,200,0)');k.fillStyle=warm;k.fillRect(0,0,W,H);
    return{desk:d,room:c,night:R.night};},
  draw(ctx,lt,A){
    if(lt<11){
      ctx.drawImage(A.desk,0,0);
      const stage=Math.min(5,Math.floor(lt/1.75)),su=(lt%1.75)/1.75,dip=Math.exp(-Math.pow((lt%1.75)/0.3,2))*(lt<9?1:0);
      const px=620,py=330,lift=smooth(9,10.4,lt);
      ctx.save();ctx.translate(px,py-lift*40);ctx.scale(1+lift*0.25,1+lift*0.25);ctx.rotate(-0.18+lift*0.5);
      ctx.shadowColor='rgba(0,0,0,.35)';ctx.shadowBlur=14;ctx.shadowOffsetY=6+lift*18;
      if(stage===0){ctx.fillStyle='#f1b9c8';ctx.fillRect(-100,-100,200,200);ctx.shadowBlur=0;ctx.strokeStyle='rgba(120,40,70,.25)';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(-100,100);ctx.lineTo(100,-100);ctx.stroke();}
      else if(stage===1){ctx.fillStyle='#f1b9c8';ctx.beginPath();ctx.moveTo(-100,100);ctx.lineTo(100,100);ctx.lineTo(100,-100);ctx.closePath();ctx.fill();ctx.shadowBlur=0;ctx.fillStyle='rgba(255,255,255,.18)';ctx.beginPath();ctx.moveTo(-100,100);ctx.lineTo(100,100);ctx.lineTo(100,-100);ctx.closePath();ctx.fill();}
      else if(stage===2){ctx.fillStyle='#eeadbf';ctx.beginPath();ctx.moveTo(0,100);ctx.lineTo(100,100);ctx.lineTo(100,0);ctx.closePath();ctx.fill();ctx.shadowBlur=0;ctx.strokeStyle='rgba(120,40,70,.25)';ctx.beginPath();ctx.moveTo(100,100);ctx.lineTo(0,0);ctx.stroke();}
      else{ctx.shadowBlur=0;const n=stage===3?3:stage===4?6:9;a1_rose(ctx,0,0,1.15,n,lt);if(stage===5)a1_stem(ctx,10,40,1.15,smooth(8.9,9.6,lt));}
      ctx.restore();
      if(lift>0){ctx.fillStyle=`rgba(0,0,0,${lift*0.22})`;ell(ctx,px+20,py+120,120*(1-lift*0.3),30,0);ctx.fill();}
      /* his hands: the left holding the paper's edge, the right folding */
      a1_flatHand(ctx,455-dip*20,460,0.55,true);
      a1_flatHand(ctx,825-dip*70,460+dip*20,-0.55,false);
      motes(ctx,lt,14,452,'#ffd9a8',1.2,0.35);
      if(lt>10.5){ctx.fillStyle=`rgba(0,0,0,${smooth(10.5,11,lt)})`;ctx.fillRect(0,0,W,H);}
      return;
    }
    if(lt<18.2){
      ctx.drawImage(A.room,0,0);
      drawFabeha(ctx,950,250,1.12,{t:lt,outfit:'uni',hair:'down',pose:'seat',arms:'lap',look:-0.75,smile:0.08,blush:0.3,tilt:-0.05,len:220});
      ctx.fillStyle='#b99d78';ctx.fillRect(840,420,230,24);ctx.fillStyle='#8f7657';ctx.fillRect(1050,444,10,80);
      /* his desk and his sleeve: the Eid kurta, cream, a cuff; the hand resting flat */
      ctx.fillStyle='#8f7657';ctx.beginPath();ctx.moveTo(-40,560);ctx.lineTo(W+40,540);ctx.lineTo(W+40,720);ctx.lineTo(-40,720);ctx.closePath();ctx.fill();
      ctx.fillStyle='#a88a62';ctx.beginPath();ctx.moveTo(-40,560);ctx.lineTo(W+40,540);ctx.lineTo(W+40,566);ctx.lineTo(-40,586);ctx.closePath();ctx.fill();
      ctx.save();ctx.translate(0,Math.sin(lt*0.8)*2-34);ctx.strokeStyle='#f3ecdc';ctx.lineCap='round';ctx.lineWidth=110;ctx.beginPath();ctx.moveTo(300,780);ctx.lineTo(560,620);ctx.stroke();ctx.strokeStyle='#e4d9c2';ctx.lineWidth=8;ctx.beginPath();ctx.moveTo(548,566);ctx.lineTo(610,660);ctx.stroke();
      ctx.fillStyle=HIS.skin;ell(ctx,640,600,70,46,-0.5);ctx.fill();for(let k=0;k<4;k++){ctx.save();ctx.translate(690+k*22,560-k*14+(k===3?10:0));ctx.rotate(-0.95+k*0.1);rrect(ctx,-11,-10,22,80,11);ctx.fill();ctx.restore();}ctx.fillStyle=HIS.skinSh;ell(ctx,610,632,16,26,-0.5);ctx.fill();ctx.restore();
      const memo=ctx.createRadialGradient(640,360,260,640,360,760);memo.addColorStop(0,'rgba(80,50,20,0)');memo.addColorStop(1,'rgba(80,50,20,.55)');ctx.fillStyle=memo;ctx.fillRect(0,0,W,H);
      ctx.fillStyle='rgba(255,226,180,.14)';ctx.fillRect(0,0,W,H);
      motes(ctx,lt,24,453,'#fff2cc',1.3,0.4);
      if(lt<11.6){ctx.fillStyle=`rgba(0,0,0,${1-smooth(11,11.6,lt)})`;ctx.fillRect(0,0,W,H);}
      if(lt>17.7){ctx.fillStyle=`rgba(0,0,0,${smooth(17.7,18.2,lt)})`;ctx.fillRect(0,0,W,H);}
      return;
    }
    ctx.drawImage(A.night,0,0);ctx.fillStyle='rgba(4,4,12,.35)';ctx.fillRect(0,0,W,H);
    const S=drawPhoneHand(ctx,lt,{x:475,y:120,w:330,h:700});
    a1_chat(ctx,S,GULAB_B,lt,{name:'Fabeha',status:'online'});
    phoneTop(ctx,S,{time:lt<25?'02:08':lt<26.6?'02:09':lt<28.4?'02:10':lt<29.6?'02:11':lt<30.4?'02:12':lt<36?'02:13':lt<37.6?'05:54':lt<39?'21:25':'21:26'});
    if(lt<18.7){ctx.fillStyle=`rgba(0,0,0,${1-smooth(18.2,18.7,lt)})`;ctx.fillRect(0,0,W,H);}
    /* her line, large across the frame, held */
    const ov=smooth(31.7,32.2,lt)*(1-smooth(34.7,35.2,lt));
    if(ov>0){ctx.save();ctx.globalAlpha=ov;ctx.fillStyle='rgba(6,6,14,.62)';ctx.fillRect(0,0,W,H);
      const pop=backOut(clamp((lt-31.7)/0.5));ctx.translate(640,300);ctx.scale(0.9+0.1*pop,0.9+0.1*pop);
      ctx.font='italic 500 68px "Cormorant Garamond",serif';ctx.textAlign='center';const lines=wrapText(ctx,'Apko tootne nhi dun gi sounds good?',980);
      lines.forEach((l,i)=>{const y=i*82-(lines.length-1)*41,tw=ctx.measureText(l).width;ctx.fillStyle='rgba(255,150,185,.3)';rrect(ctx,-tw/2-18,y-40,tw+36,64,10);ctx.fill();});
      ctx.shadowColor='rgba(255,200,220,.9)';ctx.shadowBlur=26;ctx.fillStyle='#fff3f6';lines.forEach((l,i)=>{const y=i*82-(lines.length-1)*41;ctx.fillText(l,0,y+12);});
      ctx.shadowBlur=0;ctx.font='500 18px "Mulish",sans-serif';ctx.fillStyle='rgba(255,220,230,.85)';ctx.fillText('Fabeha · 02:13',0,(lines.length-1)*41+78);
      ctx.restore();}
  },
  subs:[
    [0.6,4.2,'Once, for the day of her comsec paper, I folded a rose out of paper.'],
    [4.6,8.4,'I wore my Eid suit that day, for her, the jewellery in my pocket, the rose with it.'],
    [8.8,10.6,'Somewhere in that day, I lost the rose.'],
    [11.8,15.4,'She was at her lowest that morning, she told me later. I was right beside her. The rose was already gone.'],
    [15.8,17.8,'Nobody ever saw it. I told her about it at two in the morning.'],
    [19.2,22.6,'eid wala suit i was wearing · for you · having the jewelry with me · lost · kagaz ka gulab','him'],
    [23.2,24.6,'How cutee · Kagaz ka gulab','her'],
    [25.2,27.8,'but i made it to showcase my love for you everlasting','him'],
    [28.2,29.4,'Usko preserve karsakte hain','her'],
    [29.8,31.4,'or mere pyaaar ko kaise kregi','him'],
    [35.3,36.3,'spundsss more thaaan gooooooood','him'],
    [36.5,37.5,'Yeag 6 days to hajj','her'],
    [37.7,38.9,'Toh make sure ap 6 bajay airport ho','her'],
    [39.0,39.9,'yess boss · 4 baaje wahee hooga mein','him'],
  ],
  score({hit,bars,melody,THEME,THEME_B}){
    bars(0,12,['G','Em','Cmaj7','D','G','Bm','Em7','Cadd9','G','D','Em','Cmaj7'],{padVel:0.28});
    for(let b=0;b<8;b++)melody(b,b,'box',0,0.4,THEME);
    for(let b=8;b<12;b++)melody(b,b-8,'box',12,0.26,THEME_B);
    [1.75,3.5,5.25,7,8.75].forEach((t,k)=>hit(t,'chime',{midi:[79,81,83,86,91][k],vel:0.4}));
    for(const m of GULAB_B)if(m.who)hit(m.at,'tick',{hi:m.who==='her'});
  },
  amb(lt){return lt<11?{room:0.25}:lt<18.2?{room:0.1,wind:0.1}:{room:0.25};},
});
