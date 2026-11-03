/* jan2.js — 23–31 January 2026: four hours on a call and the list he wrote, her name in his phone, room 221, midnight chess.
   Helpers here carry a j2_ prefix. Quotes verbatim from _chat.txt (line numbers in the comments). */
'use strict';

/* ---------- her name in his phone from 24 Jan 00:09 (line 2372; the screenshot shows it in Arabic) ---------- */
const J2_NAME='أنتَ الحياة';
const J2_AR='"Segoe UI","Noto Naskh Arabic","Noto Nastaliq Urdu",serif';

/* ---------- phone screens ---------- */
function j2_avatar(ctx,cx,cy,R){
  ctx.fillStyle='#7a4a36';circle(ctx,cx,cy,R);ctx.fill();ctx.fillStyle='#f3c7b1';circle(ctx,cx,cy-R*0.22,R*0.3);ctx.fill();
  ctx.beginPath();ctx.moveTo(cx-R*0.6,cy+R*0.68);ctx.quadraticCurveTo(cx-R*0.6,cy+R*0.12,cx,cy+R*0.12);ctx.quadraticCurveTo(cx+R*0.6,cy+R*0.12,cx+R*0.6,cy+R*0.68);ctx.closePath();ctx.fill();
}
function j2_callScreen(ctx,S,o={}){
  ctx.save();rrect(ctx,S.x,S.y,S.w,S.h,S.r);ctx.clip();
  ctx.fillStyle=vgrad(ctx,S.y,S.y+S.h,[[0,'#0f1b22'],[1,'#071014']]);ctx.fillRect(S.x,S.y,S.w,S.h);
  const cx=S.x+S.w/2,ay=S.y+190;
  glow(ctx,cx,ay,150,'#5a8a7a',0.25);j2_avatar(ctx,cx,ay,54);
  ctx.textAlign='center';ctx.fillStyle='#e9edef';ctx.font=`600 26px ${J2_AR}`;ctx.fillText(o.name||J2_NAME,cx,ay+104);
  ctx.fillStyle='#aebac1';ctx.font='500 15px "Mulish",sans-serif';ctx.fillText(o.sub||'',cx,ay+132);
  if(o.incoming){
    for(const[dx,col,lab]of[[-70,'#e53935','Decline'],[70,'#25d366','Accept']]){const bx=cx+dx,by=S.y+S.h-120,pulse=lab==='Accept'?1+0.06*Math.sin((o.t||0)*6):1;ctx.fillStyle=col;circle(ctx,bx,by,32*pulse);ctx.fill();ctx.fillStyle='#fff';
      if(lab==='Accept'){rrect(ctx,bx-13,by-7,17,14,3);ctx.fill();ctx.beginPath();ctx.moveTo(bx+5,by);ctx.lineTo(bx+14,by-7);ctx.lineTo(bx+14,by+7);ctx.closePath();ctx.fill();}
      else{ctx.save();ctx.translate(bx,by);ctx.rotate(2.3);rrect(ctx,-14,-5,28,10,5);ctx.fill();ctx.restore();}
      ctx.fillStyle='#e9edef';ctx.font='500 13px "Mulish",sans-serif';ctx.fillText(lab,bx,by+54);}
  }else{
    const by=S.y+S.h-150;
    for(let k=0;k<4;k++){const bx=cx+(k-1.5)*62;ctx.fillStyle='rgba(255,255,255,.14)';circle(ctx,bx,by,24);ctx.fill();ctx.fillStyle='#e9edef';
      if(k===0){rrect(ctx,bx-10,by-6,13,12,2);ctx.fill();ctx.beginPath();ctx.moveTo(bx+4,by);ctx.lineTo(bx+11,by-6);ctx.lineTo(bx+11,by+6);ctx.closePath();ctx.fill();}
      else if(k===1){ctx.beginPath();ctx.moveTo(bx-10,by-4);ctx.lineTo(bx-4,by-4);ctx.lineTo(bx+3,by-11);ctx.lineTo(bx+3,by+11);ctx.lineTo(bx-4,by+4);ctx.lineTo(bx-10,by+4);ctx.closePath();ctx.fill();}
      else if(k===2){rrect(ctx,bx-4,by-11,8,14,4);ctx.fill();ctx.strokeStyle='#e9edef';ctx.lineWidth=2;ctx.beginPath();ctx.arc(bx,by-2,8,0.2,Math.PI-0.2);ctx.stroke();}
      else for(const dx of[-7,0,7]){circle(ctx,bx+dx,by,2.4);ctx.fill();}}
    ctx.fillStyle='#e53935';circle(ctx,cx,S.y+S.h-72,30);ctx.fill();ctx.save();ctx.translate(cx,S.y+S.h-72);ctx.rotate(2.3);ctx.fillStyle='#fff';rrect(ctx,-13,-5,26,10,5);ctx.fill();ctx.restore();
  }
  ctx.restore();
}
function j2_contactInfo(ctx,S,o={}){
  ctx.save();rrect(ctx,S.x,S.y,S.w,S.h,S.r);ctx.clip();
  ctx.fillStyle='#0b0b0d';ctx.fillRect(S.x,S.y,S.w,S.h);
  const cx=S.x+S.w/2;
  ctx.fillStyle='#e9edef';ctx.font='700 16px "Mulish",sans-serif';ctx.textAlign='center';ctx.fillText('Contact info',cx,S.y+62);
  ctx.textAlign='left';ctx.font='600 22px "Mulish",sans-serif';ctx.fillText('‹',S.x+16,S.y+64);
  ctx.textAlign='right';ctx.font='500 16px "Mulish",sans-serif';ctx.fillStyle=o.editHot?'#25d366':'#e9edef';ctx.fillText('Edit',S.x+S.w-16,S.y+62);
  const ay=S.y+170;j2_avatar(ctx,cx,ay,56);
  ctx.save();ctx.translate(cx,ay+100);ctx.scale(o.pop||1,o.pop||1);ctx.fillStyle='#fff';ctx.textAlign='center';ctx.font=(o.arabic?'700 30px ':'700 22px ')+J2_AR;ctx.fillText(o.name,0,0);ctx.restore();
  ctx.fillStyle='#8696a0';ctx.font='500 15px "Mulish",sans-serif';ctx.textAlign='center';ctx.fillText('+92 3··  ···  ····',cx,ay+130);
  const by=ay+160,bw=(S.w-40)/3;
  for(let k=0;k<3;k++){const bx=S.x+14+k*(bw+6),mx=bx+bw/2;ctx.fillStyle='#1c1c20';rrect(ctx,bx,by,bw,58,10);ctx.fill();ctx.fillStyle='#25d366';
    if(k===0){ctx.save();ctx.translate(mx,by+22);ctx.rotate(-0.6);rrect(ctx,-9,-4,18,8,4);ctx.fill();ctx.restore();}
    else if(k===1){rrect(ctx,mx-11,by+15,14,13,3);ctx.fill();ctx.beginPath();ctx.moveTo(mx+4,by+21);ctx.lineTo(mx+12,by+15);ctx.lineTo(mx+12,by+27);ctx.closePath();ctx.fill();}
    else{ctx.strokeStyle='#25d366';ctx.lineWidth=2.5;circle(ctx,mx-2,by+20,7);ctx.stroke();ctx.beginPath();ctx.moveTo(mx+3,by+25);ctx.lineTo(mx+9,by+31);ctx.stroke();}
    ctx.fillStyle='#e9edef';ctx.font='500 12px "Mulish",sans-serif';ctx.textAlign='center';ctx.fillText(['Audio','Video','Search'][k],mx,by+48);}
  const ry=by+74;ctx.fillStyle='#1c1c20';rrect(ctx,S.x+14,ry,S.w-28,46,10);ctx.fill();ctx.fillStyle='#25d366';rrect(ctx,S.x+26,ry+14,18,18,3);ctx.fill();
  ctx.fillStyle='#e9edef';ctx.textAlign='left';ctx.font='500 13px "Mulish",sans-serif';ctx.fillText('Media, links and docs',S.x+54,ry+29);ctx.textAlign='right';ctx.fillStyle='#8696a0';ctx.fillText('31  ›',S.x+S.w-26,ry+29);
  ctx.restore();
}
/* ---------- the Kalam hotel corridor at night (room 221), painted once ---------- */
const J2_VX=640,J2_VY=330;
const j2_fl=x=>J2_VY+(720-J2_VY)*Math.abs(x-J2_VX)/640,j2_ce=x=>J2_VY-J2_VY*Math.abs(x-J2_VX)/640;
function j2_corridor(){
  const c=mk(W,H),g=c.getContext('2d'),fl=j2_fl,ce=j2_ce;
  g.fillStyle=vgrad(g,0,J2_VY,[[0,'#0f1320'],[1,'#1b2030']]);g.beginPath();g.moveTo(0,0);g.lineTo(W,0);g.lineTo(J2_VX,J2_VY);g.closePath();g.fill();
  g.fillStyle=vgrad(g,J2_VY,720,[[0,'#2a2630'],[1,'#3b3340']]);g.beginPath();g.moveTo(0,720);g.lineTo(W,720);g.lineTo(J2_VX,J2_VY);g.closePath();g.fill();
  g.fillStyle='#5a2630';g.beginPath();g.moveTo(240,720);g.lineTo(1040,720);g.lineTo(J2_VX+10,J2_VY+8);g.lineTo(J2_VX-10,J2_VY+8);g.closePath();g.fill();
  g.strokeStyle='#8a4a3a';g.lineWidth=3;g.beginPath();g.moveTo(300,720);g.lineTo(J2_VX-6,J2_VY+12);g.moveTo(980,720);g.lineTo(J2_VX+6,J2_VY+12);g.stroke();
  for(const side of[-1,1]){
    const x0=side<0?0:W;
    g.fillStyle=side<0?'#2f3444':'#333848';g.beginPath();g.moveTo(x0,0);g.lineTo(J2_VX,J2_VY);g.lineTo(x0,720);g.closePath();g.fill();
    g.fillStyle='#4a3326';g.beginPath();g.moveTo(x0,fl(x0));g.lineTo(J2_VX,J2_VY);g.lineTo(x0,lerp(fl(x0),ce(x0),0.2));g.closePath();g.fill();
    g.strokeStyle='rgba(255,255,255,.08)';g.lineWidth=2;g.beginPath();g.moveTo(x0,lerp(fl(x0),ce(x0),0.2));g.lineTo(J2_VX,J2_VY);g.stroke();
  }
  const door=(x0,x1,o={})=>{
    const t=x=>lerp(fl(x),ce(x),0.76);
    g.fillStyle=o.col||'#4b2f22';g.beginPath();g.moveTo(x0,t(x0));g.lineTo(x1,t(x1));g.lineTo(x1,fl(x1));g.lineTo(x0,fl(x0));g.closePath();g.fill();g.strokeStyle='#2a1a12';g.lineWidth=2;g.stroke();
    g.fillStyle='rgba(0,0,0,.18)';const xa=lerp(x0,x1,0.18),xb=lerp(x0,x1,0.82);
    for(const[a,b]of[[0.55,0.92],[0.1,0.45]]){g.beginPath();g.moveTo(xa,lerp(fl(xa),t(xa),a));g.lineTo(xb,lerp(fl(xb),t(xb),a));g.lineTo(xb,lerp(fl(xb),t(xb),b));g.lineTo(xa,lerp(fl(xa),t(xa),b));g.closePath();g.fill();}
    const hx=lerp(x0,x1,0.86),hy=lerp(fl(hx),t(hx),0.5);g.fillStyle='#c9a24a';circle(g,hx,hy,Math.max(2,Math.abs(x1-x0)*0.035));g.fill();
    if(o.light){g.fillStyle='rgba(255,210,140,.8)';g.beginPath();g.moveTo(x0,fl(x0)-1);g.lineTo(x1,fl(x1)-1);g.lineTo(x1,fl(x1)+4);g.lineTo(x0,fl(x0)+4);g.closePath();g.fill();}
    if(o.plate){const px=lerp(x0,x1,0.5),py=lerp(fl(px),t(px),0.84),s=Math.abs(x1-x0)/90,slope=(t(x1)-t(x0))/(x1-x0);g.save();g.translate(px,py);g.transform(1,slope,0,1,0,0);g.fillStyle='#b58a3c';rrect(g,-26*s,-10*s,52*s,20*s,3*s);g.fill();g.fillStyle='#2a1a0e';g.font=`700 ${14*s}px "Mulish",sans-serif`;g.textAlign='center';g.fillText(o.plate,0,5*s);g.restore();}
  };
  door(1060,1180,{plate:'221',light:true});door(860,920,{plate:'223'});door(760,796,{});
  door(300,200,{plate:'220'});door(420,360,{col:'#3f2a20'});door(520,485,{});
  /* the far wall, with a small window */
  g.fillStyle='#2b3040';g.fillRect(560,289,160,90);g.fillStyle='#1a2236';g.fillRect(584,300,112,62);
  /* sconces */
  g.save();g.globalCompositeOperation='lighter';
  for(const x of[1230,985,830,50,295,450]){const y=lerp(fl(x),ce(x),0.62),R=40+110*(1-Math.abs(x-J2_VX)/640);const gl=g.createRadialGradient(x,y,0,x,y,R*2.2);gl.addColorStop(0,'rgba(255,200,130,.5)');gl.addColorStop(1,'rgba(255,200,130,0)');g.fillStyle=gl;g.fillRect(x-R*2.2,y-R*2.2,R*4.4,R*4.4);g.fillStyle='#ffe6b8';ell(g,x,y,R*0.09,R*0.14);g.fill();}
  g.restore();
  g.fillStyle='rgba(110,140,190,.12)';g.fillRect(0,0,W,H);
  return c;
}
/* the snowy night outside a corridor window, drawn live (clip first) */
function j2_snowView(ctx,lt,x,y,w,h,scale,n){
  ctx.fillStyle=vgrad(ctx,y,y+h,[[0,'#0b1026'],[0.6,'#1c2a4a'],[0.62,'#dfe8f2'],[1,'#b9cad8']]);ctx.fillRect(x,y,w,h);
  const r=rng(77);for(let i=0;i<7;i++)drawPine(ctx,x+w*(0.05+r()*0.9),y+h*(0.62+r()*0.25),h*(0.2+r()*0.22),'#1b382c','#2b5240','#f1f6fa',r);
  ctx.save();ctx.translate(x,y);ctx.scale(scale,scale);snowfall(ctx,lt,n,88,10,2.2,0.85);ctx.restore();
}

/* ---------- chess, the way the app shows it ---------- */
const J2_FILES='abcdefgh';
function j2_sq(s){return[J2_FILES.indexOf(s[0]),parseInt(s[1])];}
const J2_START=(()=>{const P=[],back=['r','n','b','q','k','b','n','r'];for(let f=0;f<8;f++){P.push({t:back[f],w:true,f,r:1});P.push({t:'p',w:true,f,r:2});P.push({t:back[f],w:false,f,r:8});P.push({t:'p',w:false,f,r:7});}return P;})();
/* a scholar's mate: his white pieces at the bottom, hers at the top */
const J2_MOVES=[{at:9.0,from:'e2',to:'e4'},{at:10.6,from:'e7',to:'e5'},{at:12.2,from:'f1',to:'c4'},{at:14.0,from:'b8',to:'c6'},{at:17.4,from:'d1',to:'h5'},{at:19.2,from:'g8',to:'f6'},{at:22.6,from:'h5',to:'f7',mate:true}];
function j2_piece(ctx,x,y,s,t,white){
  ctx.save();ctx.translate(x,y);ctx.scale(s/40,s/40);ctx.fillStyle=white?'#f5f1e6':'#2a2320';ctx.strokeStyle=white?'#5a4a3a':'#0d0a08';ctx.lineWidth=1.8;ctx.lineJoin='round';
  rrect(ctx,-13,10,26,6,2);ctx.fill();ctx.stroke();
  switch(t){
    case 'p':circle(ctx,0,-6,7);ctx.fill();ctx.stroke();ctx.beginPath();ctx.moveTo(-8,10);ctx.quadraticCurveTo(-6,-2,0,0);ctx.quadraticCurveTo(6,-2,8,10);ctx.closePath();ctx.fill();ctx.stroke();break;
    case 'r':rrect(ctx,-9,-10,18,20,2);ctx.fill();ctx.stroke();ctx.fillRect(-11,-16,5,7);ctx.fillRect(-2.5,-16,5,7);ctx.fillRect(6,-16,5,7);ctx.strokeRect(-11,-16,22,7);break;
    case 'n':ctx.beginPath();ctx.moveTo(-9,10);ctx.lineTo(-7,-4);ctx.quadraticCurveTo(-6,-14,2,-16);ctx.lineTo(6,-20);ctx.lineTo(9,-14);ctx.quadraticCurveTo(12,-6,6,-4);ctx.lineTo(2,-2);ctx.lineTo(9,10);ctx.closePath();ctx.fill();ctx.stroke();break;
    case 'b':ell(ctx,0,-4,8,12);ctx.fill();ctx.stroke();circle(ctx,0,-18,2.5);ctx.fill();ctx.stroke();break;
    case 'q':ctx.beginPath();ctx.moveTo(-10,10);ctx.lineTo(-7,-8);ctx.lineTo(-11,-16);ctx.lineTo(-4,-10);ctx.lineTo(0,-19);ctx.lineTo(4,-10);ctx.lineTo(11,-16);ctx.lineTo(7,-8);ctx.lineTo(10,10);ctx.closePath();ctx.fill();ctx.stroke();break;
    case 'k':ctx.beginPath();ctx.moveTo(-10,10);ctx.lineTo(-8,-6);ctx.quadraticCurveTo(0,-12,8,-6);ctx.lineTo(10,10);ctx.closePath();ctx.fill();ctx.stroke();ctx.lineWidth=2.6;ctx.beginPath();ctx.moveTo(0,-20);ctx.lineTo(0,-8);ctx.moveTo(-4,-16);ctx.lineTo(4,-16);ctx.stroke();break;
  }
  ctx.restore();
}
function j2_chess(ctx,S,lt){
  ctx.save();rrect(ctx,S.x,S.y,S.w,S.h,S.r);ctx.clip();
  ctx.fillStyle='#262421';ctx.fillRect(S.x,S.y,S.w,S.h);
  const sq=Math.floor((S.w-20)/8),bx=S.x+(S.w-sq*8)/2,by=S.y+110;
  const applied=J2_MOVES.filter(m=>m.at<=lt).length,whiteToMove=applied%2===0,mmss=s=>Math.floor(s/60)+':'+String(s%60).padStart(2,'0');
  const bar=(y,name,clock,active)=>{ctx.fillStyle='#302e2b';rrect(ctx,S.x+10,y,S.w-20,42,8);ctx.fill();ctx.fillStyle='#7a4a36';rrect(ctx,S.x+18,y+6,30,30,6);ctx.fill();ctx.fillStyle='#f3c7b1';circle(ctx,S.x+33,y+17,6);ctx.fill();ctx.beginPath();ctx.moveTo(S.x+22,y+33);ctx.quadraticCurveTo(S.x+22,y+22,S.x+33,y+22);ctx.quadraticCurveTo(S.x+44,y+22,S.x+44,y+33);ctx.closePath();ctx.fill();
    ctx.fillStyle='#e9edef';ctx.font='600 14px "Mulish",sans-serif';ctx.textAlign='left';ctx.fillText(name,S.x+58,y+26);ctx.fillStyle=active?'#f5f1e6':'#5a5854';rrect(ctx,S.x+S.w-86,y+7,66,28,6);ctx.fill();ctx.fillStyle=active?'#262421':'#aaa';ctx.font='600 15px "Mulish",sans-serif';ctx.textAlign='center';ctx.fillText(clock,S.x+S.w-53,y+27);};
  bar(S.y+56,'Fabeha',mmss(Math.max(0,599-Math.floor(lt*2.1))),!whiteToMove&&lt>8);
  for(let f=0;f<8;f++)for(let r=1;r<=8;r++){ctx.fillStyle=((f+r)%2===0)?'#769656':'#eeeed2';ctx.fillRect(bx+f*sq,by+(8-r)*sq,sq,sq);}
  ctx.font='600 9px "Mulish",sans-serif';for(let f=0;f<8;f++){ctx.fillStyle=f%2?'#769656':'#eeeed2';ctx.textAlign='right';ctx.fillText(J2_FILES[f],bx+f*sq+sq-2,by+8*sq-3);}
  const P=J2_START.map(p=>Object.assign({},p));let last=null;
  for(const m of J2_MOVES){if(m.at>lt)break;const[f0,r0]=j2_sq(m.from),[f1,r1]=j2_sq(m.to);const cap=P.find(p=>p.alive!==false&&p.f===f1&&p.r===r1);if(cap)cap.alive=false;const mv=P.find(p=>p.alive!==false&&p.f===f0&&p.r===r0);if(mv){mv.f=f1;mv.r=r1;mv.from=[f0,r0];last={m,p:mv};}}
  if(last){const[f0,r0]=j2_sq(last.m.from),[f1,r1]=j2_sq(last.m.to);ctx.fillStyle='rgba(255,255,51,.35)';ctx.fillRect(bx+f0*sq,by+(8-r0)*sq,sq,sq);ctx.fillRect(bx+f1*sq,by+(8-r1)*sq,sq,sq);}
  for(const p of P){if(p.alive===false)continue;let f=p.f,r=p.r;if(last&&p===last.p){const u=easeIO((lt-last.m.at)/0.5);f=lerp(p.from[0],p.f,u);r=lerp(p.from[1],p.r,u);}j2_piece(ctx,bx+f*sq+sq/2,by+(8-r)*sq+sq/2+2,sq,p.t,p.w);}
  bar(by+8*sq+12,'previx1',mmss(Math.max(0,598-Math.floor(lt*1.3))),whiteToMove&&lt>8);
  /* her question mark (no words of hers are invented), and his answer */
  for(const[q0,q1]of[[14.6,16.4],[19.8,21.6]]){const a=smooth(q0,q0+0.3,lt)*(1-smooth(q1-0.3,q1,lt));if(a<=0)continue;ctx.save();ctx.globalAlpha=a;const qx=S.x+S.w-130,qy=S.y+58;ctx.fillStyle='#ffffff';rrect(ctx,qx,qy-28,54,30,12);ctx.fill();ctx.beginPath();ctx.moveTo(qx+42,qy+2);ctx.lineTo(qx+52,qy+10);ctx.lineTo(qx+36,qy+2);ctx.closePath();ctx.fill();j2_piece(ctx,qx+16,qy-12,22,'k',false);ctx.fillStyle='#111';ctx.font='700 18px "Mulish",sans-serif';ctx.textAlign='left';ctx.fillText('?',qx+32,qy-6);ctx.restore();
    const b=smooth(q0+0.8,q0+1.1,lt)*(1-smooth(q1+0.4,q1+0.7,lt));if(b>0){ctx.save();ctx.globalAlpha=b;ctx.font='500 13px "Mulish",sans-serif';const txt='this is not check mate',tw=ctx.measureText(txt).width+22,ty=by+8*sq+62;ctx.fillStyle='#005c4b';rrect(ctx,S.x+S.w-14-tw,ty,tw,28,12);ctx.fill();ctx.fillStyle='#e9edef';ctx.textAlign='left';ctx.fillText(txt,S.x+S.w-14-tw+11,ty+19);ctx.restore();}}
  const mate=J2_MOVES[J2_MOVES.length-1];
  if(lt>=mate.at+0.6){const a=smooth(mate.at+0.6,mate.at+1.0,lt);ctx.save();ctx.globalAlpha=a;ctx.fillStyle='rgba(0,0,0,.55)';ctx.fillRect(bx,by,sq*8,sq*8);const cy=by+sq*4;ctx.fillStyle='#302e2b';rrect(ctx,S.x+34,cy-56,S.w-68,112,14);ctx.fill();ctx.fillStyle='#f5f1e6';ctx.textAlign='center';ctx.font='700 24px "Mulish",sans-serif';ctx.fillText('You won',S.x+S.w/2,cy-12);ctx.fillStyle='#aaa';ctx.font='500 14px "Mulish",sans-serif';ctx.fillText('by checkmate',S.x+S.w/2,cy+12);ctx.fillStyle='#81b64c';rrect(ctx,S.x+S.w/2-60,cy+24,120,24,8);ctx.fill();ctx.fillStyle='#fff';ctx.font='600 12px "Mulish",sans-serif';ctx.fillText('Rematch',S.x+S.w/2,cy+40);ctx.restore();}
  ctx.restore();
}

/* ================================================================================================
   24 January · 00:09 → 25 January · 17:08 — her name (lines 2372, 2505–2513, 3167–3176)
   ================================================================================================ */
const HAYAT=[
  {at:0,   who:'me', time:'00:09',text:'Fixed your name 😋'},
  {at:12.0,who:'her',time:'17:05',text:'Antal hayat ka kia matlab'},
  {at:12.6,who:'her',time:'17:05',text:'Hai?'},
  {at:13.8,who:'her',time:'17:07',text:'Also is that arabic?'},
  {at:14.6,who:'me', time:'17:07',text:'Yep'},
  {at:15.6,who:'me', time:'17:07',text:'You are life'},
  {at:16.8,who:'me', time:'17:08',text:'Anta Al Hayat*'},
  {at:18.0,who:'me', time:'17:08',text:'In urdu tum meri zindagi ho'},
  {at:20.0,who:'her',time:'17:08',text:'Han han samjh gai'},
  {at:20.8,who:'her',time:'17:08',text:'Shukria'},
];
scene({id:'hayat',name:'24 January · her name',when:'2026-01-24T00:09',bars:7,fin:['#000000',1.2],fout:['#000000',1.0],
  note:'nine minutes past midnight he renames her contact from World Cup Trophy to أنتَ الحياة; the next afternoon she asks what it means.',
  tag:'“In urdu tum meri zindagi ho”',
  prep(){return{R:rooms()};},
  draw(ctx,lt,A){
    ctx.drawImage(A.R.night,0,0);
    const S=drawPhoneHand(ctx,lt,{x:475,y:120,w:330,h:700});
    if(lt<9.2){
      const sw=lt>=4.2,pop=sw?backOut(clamp((lt-4.2)/0.35)):1;
      if(lt<7.2)j2_contactInfo(ctx,S,{name:sw?J2_NAME:'World Cup Trophy',arabic:sw,pop,editHot:lt>3.4&&lt<4.2});
      else chatPanel(ctx,S,[{at:7.3,who:'me',time:'00:09',text:'Fixed your name 😋'}],lt,{name:J2_NAME,status:'last seen today at 23:04'});
      phoneTop(ctx,S,{time:'00:09'});
      return;
    }
    chatPanel(ctx,S,HAYAT,lt,{name:J2_NAME,status:'online'});
    phoneTop(ctx,S,{time:lt<13.8?'17:05':lt<16.8?'17:07':'17:08'});
  },
  subs:[
    [0.6,3.8,'Nine minutes past midnight, after the beach. Her name in my phone was still World Cup Trophy.'],
    [4.4,6.6,'I fixed it.'],
    [7.5,9.0,'Fixed your name 😋','him'],
    [9.6,11.6,'The next afternoon she asked.'],
    [12.2,13.6,'Antal hayat ka kia matlab','her'],
    [15.8,16.8,'You are life','him'],
    [18.2,19.8,'In urdu tum meri zindagi ho','him'],
    [21.0,21.7,'Shukria','her'],
    [21.9,23.1,'Shukria. Like I’d held a door.'],
  ],
  score({T,hit,bars,melody,add,CH,THEME_B}){
    bars(0,3,['Em','Cmaj7','Em'],{padVel:0.35,arp:[null,1,2,3],arpVel:0.12,step:1});
    hit(4.2,'chime',{midi:91,vel:0.45});hit(7.3,'tick',{});
    bars(3,4,['Cmaj7','G','Em','Dsus'],{padVel:0.42,arp:[null,1,2,3],arpVel:0.12,step:1});
    for(let b=3;b<7;b++)melody(b,b-3,'box',12,0.32,THEME_B);
    for(const m of HAYAT)if(m.at>0)hit(m.at,'tick',{hi:m.who==='her'});
    add(T(5,1),'strings',{notes:CH.Cmaj7.p,dur:BAR*1.6,vel:0.5});
  },
  amb(lt){return{room:0.22};},
});

/* ================================================================================================
   23 January · 20:00 — four hours on a call, and the list he wrote during it
   (his notes app, photos/call23.jpg: "List to care abt", created 23 January 2026 at 20:05)
   ================================================================================================ */
const J2_NOTE_TOP=66;                                   /* the screenshot's own status bar (taken later, at 15:08) is cropped off */
function j2_noteRect(im,ok){const nw=ok?im.naturalWidth:592,nh=(ok?im.naturalHeight:1280)-J2_NOTE_TOP;return{nw,nh,ar:nh/nw};}
function j2_drawNote(ctx,im,ok,x,y,w,h){
  ctx.fillStyle='#000';ctx.fillRect(x,y,w,h);
  if(ok){const{nw,nh}=j2_noteRect(im,true);ctx.drawImage(im,0,J2_NOTE_TOP,nw,nh,x,y,w,h);}
}
function j2_hms(secs){const h=Math.floor(secs/3600),m=Math.floor(secs%3600/60),s=secs%60;return h?h+':'+String(m).padStart(2,'0')+':'+String(s).padStart(2,'0'):String(m).padStart(2,'0')+':'+String(s).padStart(2,'0');}
scene({id:'decades',name:'23 January · four hours',when:'2026-01-23T20:00',bars:9,fin:['#000000',1.2],fout:['#000000',1.6],
  note:'night in his room, the phone in his hand on a call with “World Cup Trophy”; the timer races to four hours while a thin crescent moon sets in the window. The longest she had ever talked to a guy. Then his real note from that call, “List to care abt”, created at 20:05, lifted out of the phone and held up to be read.',
  tag:'“List to care abt” · 23 January 2026, 20:05',
  prep(){const im=new Image();im.src='photos/call23.jpg';return{R:rooms(),im};},
  draw(ctx,lt,A){
    const im=A.im,ok=!!(im.complete&&im.naturalWidth),N=j2_noteRect(im,ok);
    const lift=easeIO(clamp((lt-18.4)/1.6));
    /* the room; a waxing crescent setting in the window while the timer runs */
    ctx.drawImage(A.R.night,0,0);
    const m=clamp((lt-1.0)/12),mx=lerp(880,1150,m),my=lerp(120,410,m*m*0.4+m*0.6);
    ctx.save();ctx.beginPath();ctx.rect(834,74,372,302);ctx.clip();
    glow(ctx,mx,my,60,'#fff2d0',0.16);
    ctx.beginPath();ctx.rect(mx-20,my-20,40,40);ctx.arc(mx-5,my-4,12,0,TAU);ctx.clip('evenodd');ctx.fillStyle='#f6efd6';circle(ctx,mx,my,13);ctx.fill();
    ctx.restore();
    ctx.fillStyle='#3a3350';ctx.fillRect(1010,74,8,302);ctx.fillRect(834,220,372,8);
    glow(ctx,640,430,420,'#4a8a7a',0.18*(1-lift));
    /* the frame darkens as the note comes up */
    if(lift>0){ctx.fillStyle=`rgba(4,4,10,${0.74*lift})`;ctx.fillRect(0,0,W,H);glow(ctx,640,330,560,'#c89a6a',0.22*lift);}
    /* his phone: the call, then the note */
    const S=drawPhoneHand(ctx,lt,{x:475,y:lerp(120,820,lift*lift),w:330,h:700});
    const secs=lt<1.8?Math.floor(Math.max(0,lt-0.4)):Math.min(14400,1+Math.floor(14399*easeIO((lt-1.8)/10))),tot=20*60+Math.floor(secs/60);
    const clock=String(Math.floor(tot/60)%24).padStart(2,'0')+':'+String(tot%60).padStart(2,'0');
    if(lift<=0){
      if(lt<14.2)j2_callScreen(ctx,S,{name:'World Cup Trophy',sub:j2_hms(secs)});
      const n=smooth(13.6,14.2,lt);
      if(n>0){ctx.save();rrect(ctx,S.x,S.y,S.w,S.h,S.r);ctx.clip();ctx.globalAlpha=n;
        j2_drawNote(ctx,im,ok,S.x,S.y+34,S.w,S.w*N.ar);ctx.fillStyle='#000';ctx.fillRect(S.x,S.y,S.w,34);
        ctx.fillStyle='#25d366';rrect(ctx,S.x+12,S.y+10,64,22,11);ctx.fill();ctx.restore();}
      phoneTop(ctx,S,{time:lt<13.6?clock:'20:05'});
    }
    /* lifted out of the phone to the middle of the frame, fit to the frame height, then a slow push-in */
    if(lift>0){
      const x0=484,y0=129+34,w0=312,th=H-32,tw=th/N.ar,tx=640-tw/2,ty=16;
      let w=lerp(w0,tw,lift),x=lerp(x0,tx,lift),y=lerp(y0,ty,lift),h=w*N.ar;
      const p=1+0.1*clamp((lt-19.6)/10.4),ax=640,ay=ty+th*0.36;
      x=ax+(x-ax)*p;y=ay+(y-ay)*p;w*=p;h*=p;
      const r=lerp(4,16,lift);
      ctx.save();ctx.shadowColor='rgba(0,0,0,.75)';ctx.shadowBlur=60*lift;ctx.shadowOffsetY=18*lift;ctx.fillStyle='#000';rrect(ctx,x,y,w,h,r);ctx.fill();ctx.restore();
      ctx.save();rrect(ctx,x,y,w,h,r);ctx.clip();j2_drawNote(ctx,im,ok,x,y,w,h);ctx.restore();
      ctx.strokeStyle=`rgba(255,240,220,${0.14*lift})`;ctx.lineWidth=1.5;rrect(ctx,x,y,w,h,r);ctx.stroke();
    }
  },
  subs:[
    [0.8,4.4,'23 January. A call that ran four hours.'],
    [5.0,10.4,'The longest she had ever talked to a guy. The first time at that hour, and that long.'],
    [14.2,18.2,'We talked about things that mattered to her. I wrote them down.'],
  ],
  score({hit,bars,melody,THEME_B}){
    bars(0,9,['Em','Cmaj7','G','Dsus'],{padVel:0.3});
    for(let b=1;b<9;b++)melody(b,b-1,'box',12,0.27,THEME_B);
    hit(11.8,'chime',{midi:88,vel:0.28});
  },
  amb(lt){return{room:0.22};},
});

/* ================================================================================================
   25 January · 23:34 — room 221 (lines 3924–3990)
   ================================================================================================ */
const R221=[
  {at:0.8, who:'me', time:'23:34',text:'Confession krte hooowe guilt feel horaha'},
  {at:2.4, who:'her',time:'23:34',text:'Nhi nhi boldo'},
  {at:4.0, who:'me', time:'23:36',text:'But i convinced all the three members to stay in the room without the heater working'},
  {at:6.4, who:'me', time:'23:36',text:'I said i’d sleep on the ground'},
  {at:7.8, who:'me', time:'23:36',text:'Yourrr room was 221'},
  {at:9.6, who:'her',time:'23:36',text:'Ohhh shittt'},
  {at:10.8,who:'her',time:'23:36',text:'Isliye itnay achay se yaad tha room num'},
  {at:24.8,who:'me', time:'23:37',text:'Bro 😭😭😭 who thell forgets stuff about someone jo apko pasand hoota'},
  {at:26.4,who:'me', time:'23:37',text:'I’d prolly remember every instance of you'},
  {at:27.8,who:'me', time:'23:37',text:'The day your hands were shaking'},
  {at:28.6,who:'me', time:'23:37',text:'You offering hands to write'},
  {at:29.4,who:'me', time:'23:37',text:'To the day i took the bet'},
  {at:30.8,who:'her',time:'23:38',text:'Ayee you\'re making me feel guilt now kesay woh pata nhi'},
  {at:32.4,who:'me', time:'23:38',text:'So the more glances the more better'},
  {at:33.8,who:'her',time:'23:42',text:'My room is clear now'},
];
scene({id:'room221',name:'25 January · room 221',when:'2026-01-25T23:34',bars:12,fin:['#000000',1.2],fout:['#000000',1.4],
  note:'a confession from the trip: the cold ground-floor room in Kalam he talked three friends into, because hers was 221; the hotel corridor at night, snow in the window; then “My room is clear now” and the call timer passing four hours.',
  tag:'“I’d prolly remember every instance of you”',
  prep(){return{R:rooms(),cor:j2_corridor()};},
  draw(ctx,lt,A){
    if(lt>=12.8&&lt<24.4){
      const u=lt-12.8;
      ctx.drawImage(A.cor,0,0);
      /* the near window on the left wall, and the little one at the end: snow */
      const fl=j2_fl,ce=j2_ce,poly=[[60,lerp(fl(60),ce(60),0.72)],[170,lerp(fl(170),ce(170),0.72)],[170,lerp(fl(170),ce(170),0.28)],[60,lerp(fl(60),ce(60),0.28)]];
      ctx.save();ctx.beginPath();poly.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));ctx.closePath();ctx.clip();j2_snowView(ctx,lt,40,200,150,310,0.45,160);ctx.restore();
      ctx.strokeStyle='#1c1a22';ctx.lineWidth=5;ctx.beginPath();poly.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));ctx.closePath();ctx.stroke();ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(115,lerp(poly[0][1],poly[1][1],0.5));ctx.lineTo(115,lerp(poly[3][1],poly[2][1],0.5));ctx.stroke();
      ctx.save();ctx.beginPath();ctx.rect(584,300,112,62);ctx.clip();j2_snowView(ctx,lt,584,300,112,62,0.1,40);ctx.restore();
      ctx.fillStyle='rgba(120,160,220,.08)';ctx.fillRect(0,0,W,H);
      /* the three of them, with the bags, going into the cold room; one looks back */
      const walk=clamp(u/6);
      for(const[k,x0,col,bag]of[[0,470,'#2a2d3a',true],[1,430,'#3a2f2a',true],[2,500,'#23303a',false]]){const x=x0-walk*(60+k*20),y=lerp(fl(x),ce(x),0.02)-34*0.7+Math.sin(lt*6+k)*1.2*(1-walk),s=0.7;drawFigureFar(ctx,x,y,s,col,'#1a1416',lt,k,false);if(bag){ctx.fillStyle='#1d1f28';rrect(ctx,x+14*s,y+10*s,22*s,26*s,4*s);ctx.fill();}}
      /* our breath in the cold */
      const ph=(lt%3.2)/3.2,ba=0.22*Math.sin(Math.PI*ph);glow(ctx,640,560-ph*40,40+ph*90,'#ffffff',ba);
      return;
    }
    ctx.drawImage(A.R.night,0,0);
    if(lt<35.4){
      const S=drawPhoneHand(ctx,lt,{x:475,y:120,w:330,h:700});
      chatPanel(ctx,S,R221,lt,{name:J2_NAME,status:'online'});
      phoneTop(ctx,S,{time:lt<4?'23:34':lt<24.8?'23:36':lt<30.8?'23:37':lt<33.8?'23:38':'23:42'});
      return;
    }
    /* the phone on the pillow, the timer */
    ctx.fillStyle='rgba(0,0,10,.3)';ctx.fillRect(0,0,W,H);
    ctx.save();ctx.translate(640,470);ctx.rotate(0.08);ctx.scale(1,0.92);
    const S=drawPhone(ctx,-150,-320,PHONE.w,PHONE.h,{screen:'#000'});
    const secs=3*3600+59*60+57+Math.floor(lt-35.4),hh=Math.floor(secs/3600),mm=Math.floor(secs%3600/60),ss=secs%60;
    j2_callScreen(ctx,S,{sub:hh+':'+String(mm).padStart(2,'0')+':'+String(ss).padStart(2,'0')});
    phoneTop(ctx,S,{time:'03:42'});
    ctx.restore();
    glow(ctx,640,470,420,'#4a8a7a',0.22);
  },
  subs:[
    [1.0,2.2,'Confession krte hooowe guilt feel horaha','him'],
    [2.6,3.6,'Nhi nhi boldo','her'],
    [4.2,5.3,'But i convinced all the three members','him'],
    [5.4,6.3,'to stay in the room without the heater working','him'],
    [6.6,7.6,'I said i’d sleep on the ground','him'],
    [8.0,9.4,'Yourrr room was 221','him'],
    [9.8,10.6,'Ohhh shittt','her'],
    [11.0,12.6,'Isliye itnay achay se yaad tha room num','her'],
    [13.2,16.8,'Kalam. The hotel had the big warm rooms upstairs, facing the valley.'],
    [17.1,20.6,'I talked all three of my friends into the cold one downstairs, heater dead. I said I’d take the floor.'],
    [20.9,24.0,'Her room was 221. The more glances, the better.'],
    [25.0,25.8,'Bro 😭😭😭 who thell forgets stuff','him'],
    [25.9,26.5,'about someone jo apko pasand hoota','him'],
    [26.6,28.6,'I’d prolly remember every instance of you','him'],
    [31.0,32.2,'Ayee you\'re making me feel guilt now kesay woh pata nhi','her'],
    [34.0,35.0,'My room is clear now','her'],
    [35.8,38.4,'I called at 23:42. When the timer passed four hours, it was the only light in the house.'],
  ],
  score({T,hit,bars,melody,add,CH,THEME_B}){
    bars(0,4,['Em','Cmaj7','G','Dsus'],{padVel:0.35,arp:[null,1,2,3],arpVel:0.12,step:1});
    for(const m of R221)hit(m.at,'tick',{hi:m.who==='her'});
    hit(12.3,'swell',{dur:1.2,vel:0.4});
    /* the van's plucked figure comes back for the trip memory */
    for(let b=4;b<8;b++){const c=['Am','C','G','D'][b-4],p=CH[c].p,tones=[p[1]+12,p[2]+12,p[3]+12,p[1]+24];add(T(b),'pad',{notes:CH[c].p,dur:BAR*1.05,vel:0.35});[0,null,1,2,null,1,3,null].forEach((ix,k)=>{if(ix!==null)add(T(b,k*0.5),'pluck',{midi:tones[ix],vel:0.4});});if(b>=5)melody(b,b-5,'box',12,0.3);}
    bars(8,2,['Em','Cmaj7'],{padVel:0.4});
    add(T(10),'strings',{notes:CH.Em.p,dur:BAR*2.1,vel:0.45});hit(35.4,'ring',{});for(let b=10;b<12;b++)melody(b,b-10,'box',12,0.35,THEME_B);
  },
  amb(lt){return lt>=12.8&&lt<24.4?{wind:0.5,room:0.1}:{room:0.25};},
});

/* ================================================================================================
   30 January · 00:42 — midnight chess (lines 4882–4883, 4909–4915, 4989–5012)
   ================================================================================================ */
const CHESS=[
  {at:0.6, who:'her',time:'00:37',text:'Ab neend nhi arahi'},
  {at:1.8, who:'me', time:'00:37',text:'Mujhe sochlo ajayegi'},
  {at:3.0, who:'her',time:'00:37',text:'😂😂😂😂🤦🏼‍♀️🤦🏼‍♀️🤦🏼‍♀️'},
  {at:4.4, who:'her',time:'00:47',text:'Which game is the easiest to play?'},
  {at:5.6, who:'me', time:'00:49',text:'Dont learn to play'},
  {at:6.4, who:'me', time:'00:49',text:'Ill explain rules'},
  {at:25.6,who:'her',time:'01:36',text:'My legit head hurts the amount of times iv heard this is not check mate 😭😭😭😭😭😭😭😭'},
  {at:27.6,who:'me', time:'01:37',text:'Brooo itss itni asaan'},
  {at:28.6,who:'her',time:'01:37',text:'Bro ap smart hona 😭😭😭😭😭😭😭'},
  {at:29.8,who:'her',time:'01:44',text:'AP IN PERSON SIKHA DENA'},
  {at:31.2,who:'me', time:'01:44',text:'Waise ap bolo tou kal ajata ho'},
];
scene({id:'chess',name:'30 January · midnight chess',when:'2026-01-30T00:42',bars:10,fin:['#000000',1.2],fout:['#000000',1.2],
  note:'she can’t sleep, so he sends a chess link and explains the rules by text; the board glows on the phone, her pieces hesitate, his queen lands; “AP IN PERSON SIKHA DENA”.',
  tag:'“Dont learn to play” · “Ill explain rules”',
  prep(){return{R:rooms()};},
  draw(ctx,lt,A){
    ctx.drawImage(A.R.night,0,0);ctx.fillStyle='rgba(0,0,10,.35)';ctx.fillRect(0,0,W,H);
    const board=lt>=7.6&&lt<25.0;
    glow(ctx,640,430,440,board?'#8fb36a':'#6fa8ff',board?0.16:0.12);
    const S=drawPhoneHand(ctx,lt,{x:475,y:100,w:330,h:700});
    if(board){j2_chess(ctx,S,lt);phoneTop(ctx,S,{time:lt<14?'00:5'+Math.min(9,Math.floor(lt-7)):lt<20?'01:0'+Math.min(9,Math.floor(lt-14)):'01:'+String(Math.min(35,10+Math.floor((lt-20)*5))).padStart(2,'0')});}
    else{chatPanel(ctx,S,CHESS,lt,{name:'Fabeha',status:'online'});phoneTop(ctx,S,{time:lt<4.4?'00:37':lt<5.6?'00:47':lt<25.6?'00:49':lt<28.6?'01:36':lt<29.8?'01:37':'01:44'});}
  },
  subs:[
    [0.8,1.7,'Ab neend nhi arahi','her'],
    [1.9,2.9,'Mujhe sochlo ajayegi','him'],
    [4.6,5.5,'Which game is the easiest to play?','her'],
    [5.8,6.3,'Dont learn to play','him'],
    [6.5,7.4,'Ill explain rules','him'],
    [8.2,11.6,'Half past midnight. Chess, over the phone, rules included.'],
    [12.0,15.2,'I explained the rules. All of them. More than once.'],
    [16.0,19.4,'Every few moves she announced checkmate. It was not checkmate.'],
    [22.8,24.6,'Then it was.'],
    [25.8,26.7,'My legit head hurts the amount of times','her'],
    [26.8,27.5,'iv heard this is not check mate 😭😭😭😭😭😭😭😭','her'],
    [27.7,28.5,'Brooo itss itni asaan','him'],
    [30.0,31.0,'AP IN PERSON SIKHA DENA','her'],
    [31.4,32.8,'Waise ap bolo tou kal ajata ho','him'],
  ],
  score({T,hit,bars,melody,add,CH,THEME}){
    bars(0,2,['G','Cmaj7'],{padVel:0.3});
    for(const m of CHESS)hit(m.at,'tick',{hi:m.who==='her'});
    /* the board: a music-box figure, a pluck on every move, a chime for the mate */
    for(let b=2;b<8;b++){const c=['G','Em','C','D','G','Cmaj7'][b-2];add(T(b),'pad',{notes:CH[c].p,dur:BAR*1.05,vel:0.32});const p=CH[c].p;[0,1.5,2,3.5].forEach((q,k)=>add(T(b,q),'box',{midi:p[(k+b)%4]+12,vel:0.3}));if(b>=3&&b<7)melody(b,b-3,'pluck',12,0.34,THEME);}
    J2_MOVES.forEach((m,i)=>hit(m.at,'pluck',{midi:[67,71,74,76,79,81,86][i],vel:0.5}));
    hit(23.2,'chime',{midi:91,vel:0.5});hit(23.35,'chime',{midi:98,vel:0.4});
    bars(8,2,['Cmaj7','G'],{padVel:0.35,arp:[null,1,2,3],arpVel:0.12,step:1});
  },
  amb(lt){return{room:0.2};},
});
