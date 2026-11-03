/* jan.js — 23 December 2025 → 22 January 2026: the chair kept in the lab, the missed flight and the first call, one rupee before dawn,
   the star she circled, and the contact renamed twice in one night. (see notes/AUTHORING.md) */
'use strict';

/* ---------- his room, with the window interior left open (paint the sky first, then drawImage this over it) ---------- */
function jan_room(o={}){
  const c=mk(W,H),g=c.getContext('2d');
  g.fillStyle=vgrad(g,0,H,[[0,o.top||'#0e1020'],[1,o.bottom||'#1a1626']]);g.fillRect(0,0,W,H);
  g.fillStyle=o.floor||'#2b2436';g.beginPath();g.moveTo(0,560);g.quadraticCurveTo(640,500,W,560);g.lineTo(W,720);g.lineTo(0,720);g.closePath();g.fill();
  if(o.light){
    g.fillStyle=hexA(o.light,0.14);g.beginPath();g.moveTo(834,380);g.lineTo(1206,380);g.lineTo(1280,720);g.lineTo(640,720);g.closePath();g.fill();
    const gl=g.createRadialGradient(1020,230,0,1020,230,620);gl.addColorStop(0,hexA(o.light,0.26));gl.addColorStop(1,hexA(o.light,0));g.fillStyle=gl;g.fillRect(0,0,W,H);
  }
  if(o.lamp){const lamp=g.createRadialGradient(160,420,0,160,420,360);lamp.addColorStop(0,'rgba(255,190,120,.35)');lamp.addColorStop(1,'rgba(255,190,120,0)');g.fillStyle=lamp;g.fillRect(0,0,W,H);}
  if(o.mat){ /* the prayer mat under the window, a tasbih on it */
    g.fillStyle='#4a1a26';g.beginPath();g.moveTo(900,596);g.lineTo(1150,596);g.lineTo(1215,704);g.lineTo(850,704);g.closePath();g.fill();
    g.strokeStyle='#cdb084';g.lineWidth=3;g.beginPath();g.moveTo(914,606);g.lineTo(1137,606);g.lineTo(1195,694);g.lineTo(870,694);g.closePath();g.stroke();
    g.fillStyle='#6b2a38';g.beginPath();g.moveTo(968,686);g.lineTo(968,640);g.quadraticCurveTo(1030,586,1096,640);g.lineTo(1096,686);g.closePath();g.fill();g.strokeStyle='#cdb084';g.lineWidth=2;g.stroke();
    g.fillStyle='#e8d9b0';for(let k=0;k<24;k++){const a=k/24*TAU;circle(g,1066+Math.cos(a)*26,670+Math.sin(a)*8,2.3);g.fill();}
  }
  g.fillStyle=o.frame||'#2a2438';g.fillRect(820,60,400,330);
  g.clearRect(834,74,372,302);
  g.fillStyle=o.mullion||'#3a3350';g.fillRect(1010,74,8,302);g.fillRect(834,220,372,8);
  return c;
}
/* the sky in that window: gradient stops over the window's height, and stars that twinkle */
function jan_window(ctx,lt,stops,starA,seed=77){
  ctx.save();ctx.beginPath();ctx.rect(834,74,372,302);ctx.clip();
  ctx.fillStyle=vgrad(ctx,74,376,stops);ctx.fillRect(834,74,372,302);
  if(starA>0){const r=rng(seed);for(let i=0;i<90;i++){const x=834+r()*372,y=74+r()*250,s=r()*1.6+0.4,ph=r()*TAU;ctx.fillStyle=`rgba(255,248,230,${starA*(0.5+0.5*Math.sin(lt*1.3+ph))})`;ctx.fillRect(x,y,s,s);}}
  ctx.restore();
}

/* the status bar for a light-theme chat (phoneTop paints light text, invisible on the cream screen) */
function jan_phoneTopLight(ctx,S,time){
  ctx.save();rrect(ctx,S.x,S.y,S.w,S.h,S.r);ctx.clip();
  ctx.fillStyle='#0e0e12';rrect(ctx,S.x+S.w/2-44,S.y+8,88,24,12);ctx.fill();
  ctx.fillStyle='#111';ctx.font='600 13px "Mulish",sans-serif';ctx.textAlign='left';ctx.fillText(time,S.x+22,S.y+26);
  ctx.textAlign='right';ctx.font='500 12px "Mulish",sans-serif';ctx.fillText('●●●  ⌔  ▮',S.x+S.w-18,S.y+26);
  ctx.restore();
}

/* ---------- the WhatsApp screens the engine does not have: a call, and Contact info ---------- */
function jan_callScreen(ctx,S,o={}){
  ctx.save();rrect(ctx,S.x,S.y,S.w,S.h,S.r);ctx.clip();
  ctx.fillStyle=vgrad(ctx,S.y,S.y+S.h,[[0,'#0f2a24'],[1,'#06130f']]);ctx.fillRect(S.x,S.y,S.w,S.h);
  const cx=S.x+S.w/2,t=o.t||0,ay=S.y+262;
  glow(ctx,cx,ay,230,'#1f7a5a',0.35);
  ctx.textAlign='center';ctx.fillStyle='rgba(233,237,239,.7)';ctx.font='500 13px "Mulish",sans-serif';ctx.fillText('WhatsApp voice call',cx,S.y+76);
  ctx.fillStyle='#ffffff';ctx.font='700 28px "Mulish",sans-serif';ctx.fillText(o.name||'Fabeha',cx,S.y+116);
  ctx.fillStyle='rgba(233,237,239,.75)';ctx.font='500 15px "Mulish",sans-serif';
  if(o.state==='incoming')ctx.fillText('Incoming voice call',cx,S.y+144);else ctx.fillText('00:'+String(Math.max(0,Math.floor(o.secs||0))).padStart(2,'0'),cx,S.y+144);
  if(o.state==='incoming'){for(let k=0;k<2;k++){const u=((t*0.8+k*0.5)%1);ctx.strokeStyle=`rgba(37,211,102,${0.5*(1-u)})`;ctx.lineWidth=2;circle(ctx,cx,ay,64+u*60);ctx.stroke();}}
  ctx.fillStyle='#d8b4a0';circle(ctx,cx,ay,62);ctx.fill();ctx.fillStyle='#2a1d22';ell(ctx,cx,ay-16,47,40);ctx.fill();ctx.fillStyle='#f3d8c4';ell(ctx,cx,ay+4,33,36);ctx.fill();ctx.fillStyle='#2a1d22';ctx.fillRect(cx-44,ay-24,22,70);ctx.fillRect(cx+22,ay-24,22,70);
  const by=S.y+S.h-120;
  if(o.state==='incoming'){
    for(const[x,col,lab,up]of[[cx-70,'#ff3b30','Decline',false],[cx+70,'#34c759','Accept',true]]){ctx.fillStyle=col;circle(ctx,x,by,34);ctx.fill();ctx.fillStyle='#fff';ctx.save();ctx.translate(x,by);ctx.rotate(up?-0.6:2.4);rrect(ctx,-12,-5,24,10,5);ctx.fill();ctx.restore();ctx.fillStyle='rgba(255,255,255,.8)';ctx.font='500 12px "Mulish",sans-serif';ctx.fillText(lab,x,by+56);}
  }else{
    [['#2a3a35',0],['#2a3a35',1],['#2a3a35',2],['#ff3b30',3]].forEach(([col,k])=>{const x=cx-96+k*64;ctx.fillStyle=col;circle(ctx,x,by,24);ctx.fill();ctx.fillStyle='rgba(255,255,255,.85)';if(k===3){ctx.save();ctx.translate(x,by);ctx.rotate(2.4);rrect(ctx,-10,-4,20,8,4);ctx.fill();ctx.restore();}else{circle(ctx,x,by,6);ctx.fill();}});
    ctx.fillStyle='rgba(255,255,255,.6)';ctx.font='500 11px "Mulish",sans-serif';['speaker','video','mute','end'].forEach((l,k)=>ctx.fillText(l,cx-96+k*64,by+42));
  }
  ctx.restore();
}
function jan_contact(ctx,S,o={}){
  ctx.save();rrect(ctx,S.x,S.y,S.w,S.h,S.r);ctx.clip();
  ctx.fillStyle='#000000';ctx.fillRect(S.x,S.y,S.w,S.h);
  const cx=S.x+S.w/2;
  ctx.fillStyle='#e9edef';ctx.font='700 15px "Mulish",sans-serif';ctx.textAlign='center';ctx.fillText('Contact info',cx,S.y+62);
  ctx.font='600 20px "Mulish",sans-serif';ctx.textAlign='left';ctx.fillText('‹',S.x+16,S.y+64);
  ctx.font='500 15px "Mulish",sans-serif';ctx.textAlign='right';ctx.fillStyle=o.editing?'#25d366':'#e9edef';ctx.fillText(o.editing?'Done':'Edit',S.x+S.w-16,S.y+62);
  ctx.fillStyle='#7a3f2e';circle(ctx,cx,S.y+140,46);ctx.fill();
  ctx.fillStyle='#f3d0c0';circle(ctx,cx,S.y+128,14);ctx.fill();ctx.beginPath();ctx.moveTo(cx-24,S.y+170);ctx.quadraticCurveTo(cx-24,S.y+144,cx,S.y+144);ctx.quadraticCurveTo(cx+24,S.y+144,cx+24,S.y+170);ctx.closePath();ctx.fill();
  const name=o.name||'';let fs=21;ctx.font=`700 ${fs}px "Mulish",sans-serif`;while(ctx.measureText(name).width>S.w-36&&fs>13){fs--;ctx.font=`700 ${fs}px "Mulish",sans-serif`;}
  const nw=ctx.measureText(name).width;
  if(o.editing){ctx.fillStyle='#1c1c1e';rrect(ctx,S.x+18,S.y+194,S.w-36,34,8);ctx.fill();}
  ctx.fillStyle='#ffffff';ctx.textAlign='center';ctx.fillText(name,cx,S.y+218);
  if(o.caret&&(((o.t||0)*2.4)|0)%2===0){ctx.fillStyle='#34c759';ctx.fillRect(cx+nw/2+2,S.y+202,2,20);}
  ctx.fillStyle='#8696a0';ctx.font='500 13px "Mulish",sans-serif';ctx.fillText('+92 3•• •••••••',cx,S.y+242);
  const by=S.y+262,bw=(S.w-40-18)/3;
  [['Audio',0],['Video',1],['Search',2]].forEach(([lab,k])=>{const bx=S.x+20+k*(bw+9);ctx.fillStyle='#1c1c1e';rrect(ctx,bx,by,bw,56,10);ctx.fill();ctx.fillStyle='#25d366';ctx.font='600 12px "Mulish",sans-serif';ctx.textAlign='center';ctx.fillText(lab,bx+bw/2,by+46);
    ctx.strokeStyle='#25d366';ctx.lineWidth=2;const ix=bx+bw/2,iy=by+20;
    if(k===0){ctx.beginPath();ctx.arc(ix,iy,7,0.4,Math.PI*1.6);ctx.stroke();}else if(k===1){ctx.strokeRect(ix-9,iy-5,13,11);ctx.beginPath();ctx.moveTo(ix+4,iy-1);ctx.lineTo(ix+10,iy-4);ctx.lineTo(ix+10,iy+5);ctx.closePath();ctx.stroke();}else{ctx.beginPath();ctx.arc(ix-2,iy-2,6,0,TAU);ctx.stroke();ctx.beginPath();ctx.moveTo(ix+2,iy+2);ctx.lineTo(ix+8,iy+8);ctx.stroke();}});
  const groups=[[['Media, links and docs',String(o.media||9)],['Starred','None']],[['Notifications',''],['Chat theme',''],['Save to Photos','Default']],[['Disappearing messages','Off'],['Lock chat',''],['Advanced chat privacy','Off'],['Encryption','']]];
  let gy=by+72;ctx.font='500 13px "Mulish",sans-serif';
  for(const grp of groups){const h=grp.length*34;ctx.fillStyle='#161618';rrect(ctx,S.x+20,gy,S.w-40,h,10);ctx.fill();
    grp.forEach((r,k)=>{const ry=gy+k*34;ctx.fillStyle='#8696a0';circle(ctx,S.x+40,ry+17,6);ctx.fill();ctx.fillStyle='#e9edef';ctx.textAlign='left';ctx.fillText(r[0],S.x+56,ry+22);ctx.fillStyle='#8696a0';ctx.textAlign='right';ctx.fillText(r[1]+'  ›',S.x+S.w-30,ry+22);if(k){ctx.fillStyle='rgba(255,255,255,.08)';ctx.fillRect(S.x+56,ry,S.w-76,1);}});
    gy+=h+12;}
  if(o.toast>0){ctx.globalAlpha=o.toast;const ty=S.y+446;ctx.fillStyle='#2a2a2c';rrect(ctx,cx-92,ty,184,40,20);ctx.fill();ctx.strokeStyle='#34c759';ctx.lineWidth=2;circle(ctx,cx-68,ty+20,8);ctx.stroke();ctx.beginPath();ctx.moveTo(cx-72,ty+20);ctx.lineTo(cx-69,ty+23);ctx.lineTo(cx-64,ty+16);ctx.stroke();ctx.fillStyle='#fff';ctx.font='700 13px "Mulish",sans-serif';ctx.textAlign='left';ctx.fillText('Contact updated',cx-52,ty+25);ctx.globalAlpha=1;}
  ctx.restore();
}
/* a small Contact-info card for a screenshot tile */
function jan_contactTile(ctx,px,py,tile,name){
  ctx.fillStyle='#000';ctx.fillRect(px,py,tile,tile);const cx=px+tile/2;
  ctx.fillStyle='#e9edef';ctx.font='600 7px "Mulish",sans-serif';ctx.textAlign='center';ctx.fillText('Contact info',cx,py+14);
  ctx.fillStyle='#7a3f2e';circle(ctx,cx,py+40,16);ctx.fill();ctx.fillStyle='#f3d0c0';circle(ctx,cx,py+36,5);ctx.fill();ell(ctx,cx,py+48,8,5);ctx.fill();
  let fs=10;ctx.font=`700 ${fs}px "Mulish",sans-serif`;while(ctx.measureText(name).width>tile-8&&fs>6){fs--;ctx.font=`700 ${fs}px "Mulish",sans-serif`;}
  ctx.fillStyle='#fff';ctx.fillText(name,cx,py+70);
  ctx.fillStyle='#1c1c1e';for(let k=0;k<3;k++){rrect(ctx,px+8+k*((tile-16)/3+1),py+78,(tile-16)/3-3,16,3);ctx.fill();}
  ctx.fillStyle='#161618';rrect(ctx,px+8,py+100,tile-16,tile-108,4);ctx.fill();
  ctx.fillStyle='#8696a0';ctx.font='500 6px "Mulish",sans-serif';ctx.textAlign='left';ctx.fillText('Media, links and docs',px+14,py+111);
}
/* the one-rupee receipt */
function jan_receipt(ctx,px,py,tile,k){
  ctx.fillStyle='#f4f6f8';ctx.fillRect(px,py,tile,tile);const cx=px+tile/2;
  ctx.fillStyle='#1d9d55';circle(ctx,cx,py+tile*0.3,tile*0.13);ctx.fill();ctx.strokeStyle='#fff';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(cx-7,py+tile*0.3);ctx.lineTo(cx-2,py+tile*0.3+5);ctx.lineTo(cx+8,py+tile*0.3-6);ctx.stroke();
  ctx.fillStyle='#1b2330';ctx.textAlign='center';ctx.font='700 11px "Mulish",sans-serif';ctx.fillText(k?'Donation done':'Transfer successful',cx,py+tile*0.56);
  ctx.font='700 16px "Mulish",sans-serif';ctx.fillText('PKR 1.00',cx,py+tile*0.74);
  ctx.fillStyle='#6b7684';ctx.font='500 8px "Mulish",sans-serif';ctx.fillText('21 Jan 2026 · 05:16',cx,py+tile*0.88);
}

/* ---------- the comp-sec lab at IBA, from the last row (static: built once) ---------- */
function jan_lab(){
  const c=mk(W,H),g=c.getContext('2d'),r=rng(1223);
  const X=(u,k)=>640+k*(640-360*u),YC=u=>150*u,YF=u=>720-290*u;      /* room coordinates: depth u (0 here, 1 the front wall), k across (−1..1) */
  g.fillStyle='#eef0f2';g.fillRect(0,0,W,H);
  /* front wall, whiteboard, door, clock, AC */
  g.fillStyle='#e3ddd0';g.fillRect(360,150,560,280);
  g.fillStyle='#cfc8b8';g.fillRect(360,150,560,6);
  g.fillStyle='#b8b2a4';g.fillRect(420,186,340,148);g.fillStyle='#f8f8f5';g.fillRect(426,192,328,136);
  g.lineWidth=1.6;for(let i=0;i<14;i++){const x0=440+r()*260,y0=206+r()*100,len=20+r()*60;g.strokeStyle=['#2b4b8c','#333','#b03030'][i%3];g.globalAlpha=0.5;g.beginPath();g.moveTo(x0,y0);g.lineTo(x0+len,y0+(r()-0.5)*6);g.stroke();}g.globalAlpha=1;
  g.fillStyle='#8c6a4a';g.fillRect(826,236,62,194);g.fillStyle='#6f5238';g.fillRect(826,236,62,6);g.fillStyle='#d9c9a8';circle(g,876,340,3);g.fill();
  g.fillStyle='#f4f4f0';circle(g,790,182,14);g.fill();g.strokeStyle='#333';g.lineWidth=1.5;circle(g,790,182,14);g.stroke();g.beginPath();g.moveTo(790,182);g.lineTo(790+Math.cos(-Math.PI/2+Math.PI*2*(9.23/12))*8,182+Math.sin(-Math.PI/2+Math.PI*2*(9.23/12))*8);g.moveTo(790,182);g.lineTo(790+Math.cos(-Math.PI/2+Math.PI*2*(14/60))*11,182+Math.sin(-Math.PI/2+Math.PI*2*(14/60))*11);g.stroke();
  g.fillStyle='#f6f6f3';g.fillRect(440,160,96,18);g.fillStyle='#d8d8d2';g.fillRect(440,174,96,4);
  /* side walls, floor */
  g.fillStyle='#ddd6c6';g.beginPath();g.moveTo(0,0);g.lineTo(360,150);g.lineTo(360,430);g.lineTo(0,720);g.closePath();g.fill();
  g.fillStyle='#cdc6b8';g.beginPath();g.moveTo(W,0);g.lineTo(920,150);g.lineTo(920,430);g.lineTo(W,720);g.closePath();g.fill();
  g.fillStyle=vgrad(g,430,720,[[0,'#b9b3a5'],[1,'#a39d8f']]);g.beginPath();g.moveTo(0,720);g.lineTo(360,430);g.lineTo(920,430);g.lineTo(W,720);g.closePath();g.fill();
  /* ceiling panels */
  for(let i=0;i<4;i++){const u0=0.12+i*0.2,u1=u0+0.1;for(const k of[-0.55,0.55]){g.fillStyle='#fbfbf5';g.beginPath();g.moveTo(X(u0,k-0.2),YC(u0));g.lineTo(X(u0,k+0.2),YC(u0));g.lineTo(X(u1,k+0.2),YC(u1));g.lineTo(X(u1,k-0.2),YC(u1));g.closePath();g.fill();}}
  /* windows with blinds on the left wall */
  for(const[u0,u1]of[[0.2,0.4],[0.47,0.64],[0.7,0.84]]){
    const yt=u=>lerp(YC(u),YF(u),0.16),yb=u=>lerp(YC(u),YF(u),0.56);
    g.fillStyle='#dcecfb';g.beginPath();g.moveTo(360*u0,yt(u0));g.lineTo(360*u1,yt(u1));g.lineTo(360*u1,yb(u1));g.lineTo(360*u0,yb(u0));g.closePath();g.fill();
    g.strokeStyle='#c4cbd2';g.lineWidth=2;for(let i=1;i<14;i++){const f=i/14;g.beginPath();g.moveTo(360*u0,lerp(yt(u0),yb(u0),f));g.lineTo(360*u1,lerp(yt(u1),yb(u1),f));g.stroke();}
    g.strokeStyle='#8a8f96';g.lineWidth=3;g.beginPath();g.moveTo(360*u0,yt(u0));g.lineTo(360*u1,yt(u1));g.lineTo(360*u1,yb(u1));g.lineTo(360*u0,yb(u0));g.closePath();g.stroke();
  }
  /* rows of desks, monitors and the backs of heads, far to near */
  const back=(x,y,s,col,hair)=>{g.fillStyle=col;g.beginPath();g.moveTo(x-62*s,y+44*s);g.quadraticCurveTo(x-64*s,y-30*s,x-30*s,y-40*s);g.quadraticCurveTo(x,y-50*s,x+30*s,y-40*s);g.quadraticCurveTo(x+64*s,y-30*s,x+62*s,y+44*s);g.closePath();g.fill();
    g.fillStyle='#d9b394';circle(g,x,y-70*s,26*s);g.fill();g.fillStyle=hair;ell(g,x,y-74*s,27*s,25*s);g.fill();};
  const rows=[{u:0.82,y:350,s:0.3},{u:0.67,y:372,s:0.44},{u:0.5,y:405,s:0.64},{u:0.3,y:455,s:1.0}];
  const cols=['#4a5a7a','#2f3f3a','#6b3a3a','#3a3a44','#7a6a4a','#2b4b6b'],hairs=['#1a1416','#2b2426','#111'];
  rows.forEach((row,ri)=>{
    const {u,y,s}=row,x0=X(u,-1)-40*s,x1=X(u,1)+40*s;
    g.fillStyle='#cfcabf';g.fillRect(x0,y,x1-x0,16*s);g.fillStyle='#e8e4da';g.fillRect(x0,y-10*s,x1-x0,10*s);
    const seats=[];for(let k=-0.8;k<=0.81;k+=0.27)seats.push(k);
    for(const k of seats){const mx=X(u,k);g.fillStyle='#3a3d44';g.fillRect(mx-3*s,y-20*s,6*s,14*s);g.fillStyle='#1e2126';rrect(g,mx-42*s,y-78*s,84*s,60*s,4*s);g.fill();g.fillStyle='#2b3a46';g.fillRect(mx-38*s,y-74*s,76*s,52*s);g.fillStyle='rgba(120,180,220,.25)';for(let i=0;i<5;i++)g.fillRect(mx-34*s,y-68*s+i*9*s,(20+((k*31+i*17)%40))*s,3*s);}
    const occ=ri===3?[-0.53,0.28,0.81]:seats.filter((k,i)=>(i+ri)%2===0);
    occ.forEach((k,i)=>back(X(u,k)+6*s,y+30*s,s*1.05,cols[(i+ri*2)%cols.length],hairs[(i+ri)%hairs.length]));
  });
  /* our desk, the laptop base, the chair beside us */
  g.fillStyle='#e9e5db';g.fillRect(0,560,W,160);g.fillStyle='#d6d1c5';g.fillRect(0,560,W,6);
  g.fillStyle='#2a2d33';rrect(g,936,292,208,236,26);g.fill();g.fillStyle='#3a3e46';rrect(g,950,306,180,208,20);g.fill();
  g.strokeStyle='rgba(255,255,255,.08)';g.lineWidth=1;for(let yy=320;yy<500;yy+=10){g.beginPath();g.moveTo(954,yy);g.lineTo(1126,yy);g.stroke();}
  g.fillStyle='#1f2227';ell(g,1040,540,118,36);g.fill();g.fillStyle='#2e3238';ell(g,1040,532,112,28);g.fill();
  g.fillStyle='#2a2d33';rrect(g,900,468,44,16,8);g.fill();
  g.fillStyle='#2a2b30';g.beginPath();g.moveTo(300,600);g.lineTo(700,600);g.lineTo(730,700);g.lineTo(270,700);g.closePath();g.fill();
  g.fillStyle='#3a3b41';g.beginPath();g.moveTo(312,606);g.lineTo(688,606);g.lineTo(712,676);g.lineTo(288,676);g.closePath();g.fill();
  g.fillStyle='#232428';for(let yy=0;yy<5;yy++)for(let xx=0;xx<13;xx++){const f=yy/5,x=lerp(322,296,f)+xx*lerp(28,30,f),y=612+yy*13;g.fillRect(x,y,24,9);}
  g.fillStyle='#4a4b52';rrect(g,440,672,120,22,6);g.fill();
  return c;
}
function jan_bag(ctx,x,y,a){
  ctx.save();ctx.globalAlpha=a;ctx.translate(x,y);
  ctx.fillStyle='#23304a';rrect(ctx,-78,-150,156,160,26);ctx.fill();ctx.fillStyle='#2d3c5c';rrect(ctx,-64,-66,128,70,14);ctx.fill();
  ctx.strokeStyle='#1a2436';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(-60,-120);ctx.lineTo(60,-120);ctx.stroke();ctx.fillStyle='#1a2436';circle(ctx,0,-120,4);ctx.fill();
  ctx.strokeStyle='#1b2538';ctx.lineWidth=14;ctx.beginPath();ctx.moveTo(-40,-150);ctx.quadraticCurveTo(-30,-100,-48,-40);ctx.moveTo(40,-150);ctx.quadraticCurveTo(30,-100,48,-40);ctx.stroke();
  ctx.fillStyle='#d9c9a8';rrect(ctx,-18,-40,36,16,4);ctx.fill();ctx.fillStyle='#3b2a1a';ctx.font='700 9px "Mulish",sans-serif';ctx.textAlign='center';ctx.fillText('IBA',0,-28);
  ctx.restore();
}

/* ---------- 23 December · the lab: his bag on the chair beside him, the first call, she sits down ---------- */
const LAB=[
  {at:5.6, who:'her',time:'09:06',text:'Pls come early takay sath aik jaga lab mein bath jaye gai warna theory wala part phir dekhana mushkil hojayega'},
  {at:9.4, who:'me', time:'09:10',text:'I am alr on campus'},
  {at:11.0,who:'me', time:'09:14',text:'📞  Voice call · 44 sec'},
  {at:13.0,who:'her',time:'09:42',text:'Fazul?'},
  {at:14.0,who:'me', time:'09:42',text:'Hn'},
  {at:15.2,who:'her',time:'09:43',text:'Can you just keep your laptop so that it\'s easy for me to keep your space'},
  {at:18.0,who:'me', time:'09:45',text:'Bilkul back mein'},
];
const LAB_NIGHT=[
  {at:31.0,who:'me', time:'20:47',text:'Yr it was fun cheating with you 😭, hopefully sir full full marks pe masla nahi krega'},
  {at:34.2,who:'her',time:'21:34',text:'I really hope not 😭'},
  {at:36.2,who:'me', time:'22:14',text:'Itne sahi kisi ke nahi hoote 😭'},
  {at:37.6,who:'her',time:'22:23',text:'Itna mat socho kia hi karlenge zyade se zyada? Also he\'s going to check papers of at least 50+ students'},
];
scene({id:'lab',name:'23 December · the other chair',when:'2025-12-23T09:14',bars:12,fin:['#ffffff',1.2],fout:['#000000',1.2],
  note:'the comp-sec lab at IBA from the last row, morning light through the blinds; his bag on the chair beside him and his laptop pushed over to hold it; the first call ever, forty-four seconds; she sits down. Night: “it was fun cheating with you”.',
  tag:'“Can you just keep your laptop so that it\'s easy for me to keep your space”',
  prep(){return{lab:jan_lab(),R:rooms()};},
  draw(ctx,lt,A){
    if(lt>=30){
      ctx.drawImage(A.R.night,0,0);
      const S=drawPhoneHand(ctx,lt,{x:475,y:120,w:330,h:700});
      chatPanel(ctx,S,LAB_NIGHT,lt,{name:'Fabeha',status:'online'});
      phoneTop(ctx,S,{time:lt<34.2?'20:47':lt<36.2?'21:34':lt<37.6?'22:14':'22:23'});
      return;
    }
    ctx.drawImage(A.lab,0,0);
    /* the laptop screen (a terminal) and the chair beside us */
    ctx.fillStyle='#1b1d22';ctx.beginPath();ctx.moveTo(304,338);ctx.lineTo(696,338);ctx.lineTo(700,600);ctx.lineTo(300,600);ctx.closePath();ctx.fill();
    ctx.fillStyle='#0c1116';ctx.beginPath();ctx.moveTo(318,352);ctx.lineTo(682,352);ctx.lineTo(686,588);ctx.lineTo(314,588);ctx.closePath();ctx.fill();
    ctx.fillStyle='#8fe39a';ctx.font='500 13px ui-monospace,Menlo,Consolas,monospace';ctx.textAlign='left';
    const term=['fazul@mbp ~/compsec $ docker compose up -d','[+] Running 3/3',' ✔ Container web-1    Started',' ✔ Container db-1     Started',' ✔ Container proxy-1  Started','fazul@mbp ~/compsec $ '];
    term.forEach((l,k)=>{if(k<term.length-1||true)ctx.fillText(l,330,376+k*20);});
    if(((lt*2)|0)%2===0){ctx.fillRect(330+ctx.measureText(term[5]).width,476,8,14);}
    ctx.fillStyle='#3a3d44';circle(ctx,500,345,2.5);ctx.fill();
    /* the bag on the chair, then she is in it */
    const bagDrop=smooth(21.0,22.4,lt);
    if(bagDrop<1)jan_bag(ctx,1040,520+bagDrop*220,1-bagDrop);
    const her=smooth(23.6,24.8,lt);
    if(her>0){
      const glance=smooth(27.0,27.8,lt)*(1-smooth(29.2,29.8,lt));
      drawFabeha(ctx,lerp(1120,1040,her),356,1.05,{t:lt,outfit:'uni',hair:'low',pose:'seat',arms:'lap',alpha:her,smile:0.5+0.45*glance,look:lerp(-0.35,-0.75,glance),tilt:-0.04-glance*0.1,blush:0.3+0.3*glance,len:170});
      ctx.fillStyle='#e9e5db';ctx.fillRect(900,560,380,160);ctx.fillStyle='#d6d1c5';ctx.fillRect(900,560,380,6);
    }
    /* morning light through the blinds, motes */
    ctx.save();ctx.globalCompositeOperation='screen';for(let i=0;i<7;i++){const x=80+i*170;ctx.fillStyle='rgba(255,224,170,0.10)';ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x+60,0);ctx.lineTo(x+520,720);ctx.lineTo(x+440,720);ctx.closePath();ctx.fill();}ctx.restore();
    motes(ctx,lt,36,1224,'#fff2cc',1.3,0.5);
    /* the phone up for the thread */
    const up=smooth(5.0,5.8,lt)*(1-smooth(19.6,20.4,lt));
    if(up>0){
      const S=drawPhoneHand(ctx,lt,{x:475,y:lerp(760,120,easeOut(up)),w:330,h:700});
      chatPanel(ctx,S,LAB,lt,{name:'Fabeha',status:'online',dark:false});
      jan_phoneTopLight(ctx,S,lt<9.4?'09:06':lt<11?'09:10':lt<13?'09:14':lt<15.2?'09:42':lt<18?'09:43':'09:45');
    }
    ctx.fillStyle='rgba(255,240,215,.08)';ctx.fillRect(0,0,W,H);
  },
  subs:[
    [0.8,4.8,'23 December. The comp-sec final, in the lab at IBA. I came in before everyone and took the very back.'],
    [5.8,7.5,'Pls come early takay sath aik jaga lab mein bath jaye gai','her'],
    [7.6,9.2,'warna theory wala part phir dekhana mushkil hojayega','her'],
    [9.6,10.8,'I am alr on campus','him'],
    [11.2,12.8,'09:14. The first call ever. Forty-four seconds, mostly directions.'],
    [13.2,14.8,'Fazul?','her'],
    [15.4,17.8,'Can you just keep your laptop so that it\'s easy for me to keep your space','her'],
    [18.2,19.6,'Bilkul back mein','him'],
    [20.8,24.0,'So I kept the chair next to me with my bag, and the laptop, and waited.'],
    [25.2,29.4,'The first chair I ever kept for her. I didn’t know yet what it was.'],
    [31.2,34.0,'Yr it was fun cheating with you 😭, hopefully sir full full marks pe masla nahi krega','him'],
    [34.4,36.0,'I really hope not 😭','her'],
    [36.4,37.4,'Itne sahi kisi ke nahi hoote 😭','him'],
    [37.8,39.6,'Itna mat socho kia hi karlenge zyade se zyada? Also he\'s going to check papers of at least 50+ students','her'],
  ],
  score({hit,melody,bars,THEME}){
    bars(0,9,['G','Cmaj7','Em7','D'],{padVel:0.4,arp:true,arpVel:0.14,step:0.5});
    for(let b=1;b<5;b++)melody(b,b-1,'piano',0,0.4,THEME);
    for(let b=6;b<9;b++)melody(b,b-2,'box',12,0.38,THEME);
    hit(11.0,'ring',{});hit(11.9,'ring',{});
    for(const m of LAB)if(m.at!==11.0)hit(m.at,'tick',{hi:m.who==='her'});
    bars(9,3,['Em','Cmaj7','G'],{padVel:0.35});
    for(const m of LAB_NIGHT)hit(m.at,'tick',{hi:m.who==='her'});
  },
  amb(lt){return lt<30?{room:0.3,hum:0.22}:{room:0.22};},
});

/* ---------- 17 January · the departure gate at 8:20, when boarding closed (line 174) ---------- */
function jan_gateOut(){ /* through the glass: morning sky, the hills in haze, the runway */
  const c=mk(W,H),g=c.getContext('2d');
  g.fillStyle=vgrad(g,0,470,[[0,'#88abcb'],[0.55,'#c4d1d8'],[1,'#ecdcc0']]);g.fillRect(0,0,W,470);
  const sg=g.createRadialGradient(170,340,0,170,340,560);sg.addColorStop(0,'rgba(255,238,200,.85)');sg.addColorStop(0.22,'rgba(255,228,184,.32)');sg.addColorStop(1,'rgba(255,228,184,0)');g.fillStyle=sg;g.fillRect(0,0,W,H);
  g.drawImage(makeLayer({w:W,seed:1702,y0:430,amp:64,oct:4,f0:0.0055,top:'#8e9ca7',bottom:'#aab3b5',haze:'rgba(226,218,204,.65)'}).c,0,0);
  g.drawImage(makeLayer({w:W,seed:1703,y0:452,amp:16,oct:2,f0:0.008,top:'#9aa29a',bottom:'#b0b2a6',haze:'rgba(230,222,206,.5)'}).c,0,0);
  g.fillStyle='#9c9a78';g.fillRect(0,456,W,10);
  g.fillStyle=vgrad(g,466,600,[[0,'#a7a197'],[1,'#7b7871']]);g.fillRect(0,466,W,134);
  g.fillStyle='rgba(255,255,255,.55)';g.fillRect(0,472,W,2);g.fillRect(0,500,W,2);
  g.fillStyle='rgba(255,255,255,.75)';for(let x=10;x<W;x+=74)g.fillRect(x,485,40,3);
  g.strokeStyle='rgba(226,186,64,.85)';g.lineWidth=4;g.beginPath();g.moveTo(-20,604);g.quadraticCurveTo(520,520,1300,516);g.stroke();
  return c;
}
function jan_gateIn(){ /* the glass wall, the lounge floor, two rows of empty seats, the board */
  const c=mk(W,H),g=c.getContext('2d');
  g.save();g.globalCompositeOperation='screen';g.fillStyle='rgba(255,255,255,.07)';for(let i=0;i<7;i++){const x=i*230-40;g.beginPath();g.moveTo(x,0);g.lineTo(x+80,0);g.lineTo(x-90,600);g.lineTo(x-170,600);g.closePath();g.fill();}g.restore();
  g.fillStyle='#262931';for(const x of[0,213,426,640,853,1066,1280])g.fillRect(x-6,0,12,600);g.fillRect(0,92,W,12);
  g.fillStyle='#1c1d21';g.fillRect(0,592,W,12);
  g.fillStyle=vgrad(g,604,720,[[0,'#3e3b37'],[1,'#24221f']]);g.fillRect(0,604,W,116);
  g.fillStyle='rgba(255,230,190,.09)';g.fillRect(0,610,W,34);
  const seat=(x,y,s)=>{g.fillStyle='#17181c';rrect(g,x,y-60*s,46*s,56*s,7*s);g.fill();rrect(g,x-2*s,y-10*s,50*s,12*s,4*s);g.fill();g.fillRect(x+6*s,y,5*s,24*s);g.fillRect(x+36*s,y,5*s,24*s);};
  for(const x0 of[24,960]){for(let k=0;k<5;k++)seat(x0+k*58,680,1.15);g.fillStyle='#121316';g.fillRect(x0,700,5*58,6);}
  /* the board hanging inside, top right */
  g.fillStyle='#0f1114';rrect(g,904,122,330,70,6);g.fill();g.fillStyle='#262931';g.fillRect(950,104,4,18);g.fillRect(1184,104,4,18);
  g.font='700 20px ui-monospace,Menlo,Consolas,monospace';g.textAlign='left';g.fillStyle='#ffb43a';g.fillText('08:20  KARACHI',922,152);
  g.fillStyle='#ff5a4a';g.fillText('BOARDING CLOSED',922,180);
  return c;
}
function jan_plane(ctx,x,y,s,tilt,gear){ /* side view, nose to the right; (x,y) the middle of the fuselage */
  ctx.save();ctx.translate(x,y);ctx.rotate(tilt);ctx.scale(s,s);
  ctx.fillStyle='#98a1ab';ctx.beginPath();ctx.moveTo(-12,-14);ctx.lineTo(36,-14);ctx.lineTo(-30,-46);ctx.lineTo(-50,-46);ctx.closePath();ctx.fill();
  ctx.fillStyle='#2f7a6a';ctx.beginPath();ctx.moveTo(-148,-28);ctx.lineTo(-190,-98);ctx.lineTo(-168,-98);ctx.lineTo(-108,-28);ctx.closePath();ctx.fill();
  ctx.fillStyle='#f4f5f6';ctx.beginPath();ctx.moveTo(-170,-30);ctx.lineTo(118,-30);ctx.quadraticCurveTo(178,-28,188,-8);ctx.quadraticCurveTo(180,6,128,8);ctx.lineTo(-150,8);ctx.quadraticCurveTo(-178,4,-190,-22);ctx.closePath();ctx.fill();
  ctx.fillStyle='rgba(120,130,146,.32)';ctx.fillRect(-150,-1,282,9);
  ctx.fillStyle='#2f7a6a';ctx.fillRect(-166,-11,300,4);
  ctx.fillStyle='#3a4a5a';for(let i=0;i<22;i++)ctx.fillRect(-128+i*11,-22,5,5);
  ctx.fillStyle='#26303b';ctx.beginPath();ctx.moveTo(150,-24);ctx.lineTo(170,-22);ctx.lineTo(177,-16);ctx.lineTo(152,-16);ctx.closePath();ctx.fill();
  ctx.fillStyle='#c9ced4';ctx.beginPath();ctx.moveTo(-168,-24);ctx.lineTo(-204,-32);ctx.lineTo(-198,-20);ctx.lineTo(-160,-15);ctx.closePath();ctx.fill();
  if(gear>0){ctx.fillStyle='#23262b';ctx.fillRect(110,6,3,16*gear);circle(ctx,111.5,8+16*gear,5*gear);ctx.fill();ctx.fillRect(-28,6,4,16*gear);circle(ctx,-32,10+18*gear,6*gear);ctx.fill();circle(ctx,-18,10+18*gear,6*gear);ctx.fill();}
  ctx.fillStyle='#b4bcc5';ctx.beginPath();ctx.moveTo(-22,-6);ctx.lineTo(48,-6);ctx.lineTo(-40,30);ctx.lineTo(-66,30);ctx.closePath();ctx.fill();
  ctx.fillStyle='#dcdfe3';rrect(ctx,-8,2,46,17,8);ctx.fill();ctx.fillStyle='#4a5260';ell(ctx,38,10.5,3,7.5);ctx.fill();
  ctx.restore();
}

/* ---------- 17 January · the missed flight (lines 136–137, 164) → 20 January · 13:32 (197) → 17:39 "Is it alright if i can call you rn?" (311) ---------- */
const FLIGHT=[
  {at:0,   who:'her',time:'14:18',text:'Ohh shitttt!!!'},
  {at:0,   who:'her',time:'14:18',text:'Chalo at least pohunch toh jaye karachi'},
  {at:6.0, who:'me', time:'14:31',text:'Khayr choro mujhe tou call krdeti 😭FLIGHT miss hogyi :( meri tou zimmedar ap hai 😭'},
];
const FIRSTCALL=[
  {at:0,   who:'her',time:'13:29',text:'Hey, have you guys reached khi safely yet?'},
  {at:0,   who:'me', time:'13:29',text:'Sup, Yes i have'},
  {at:12.4,who:'her',time:'13:32',text:'Akhir flight chori thi donon ne 😂'},
  {at:17.4,who:'her',time:'17:39',text:'Is it alright if i can call you rn?'},
  {at:27.9,who:'her',time:'17:40',text:'📞  Voice call · 19 sec'},
  {at:28.4,who:'me', time:'18:24',text:'Bro i would not shout 😭😭😭 thats the last thing i’d do'},
  {at:31.0,who:'her',time:'18:26',text:'Bro kia bharosa 😂😂😭😭😭😭'},
  {at:33.0,who:'her',time:'18:27',text:'You sounded so scary from your texts'},
  {at:35.0,who:'me', time:'18:44',text:'Sure thing, raat call krloga ap Chaku or Pepper Spray ready rakhna'},
];
scene({id:'firstcall',name:'20 January · the first call',when:'2026-01-20T17:39',bars:13,fin:['#000000',1.2],fout:['#000000',1.2],
  note:'17 January, the departure gate at 8:20: the plane home rolls out and lifts off without him, two rows of empty seats, “BOARDING CLOSED”; his half-joking message that she is to blame. Three days later her joke about the flight, and his room in Hyderabad going from afternoon to dusk; she thought it was her fault, so she called: nineteen seconds, then the thread about shouting. Night, and a plane’s lights crossing the window.',
  tag:'“Akhir flight chori thi donon ne 😂” · “Is it alright if i can call you rn?”',
  prep(){return{gateOut:jan_gateOut(),gateIn:jan_gateIn(),
    roomD:jan_room({top:'#3c3944',bottom:'#4a424c',floor:'#5c5058',light:'#fff2d6',frame:'#564c5a',mullion:'#66596a'}),
    room:jan_room({top:'#241a2a',bottom:'#2e2030',floor:'#3a2a36',light:'#ff9a5a',frame:'#3a2c3c',mullion:'#4a3a4c'}),
    roomN:jan_room({top:'#0e1020',bottom:'#1a1626',lamp:true})};},
  draw(ctx,lt,A){
    if(lt<10.6){
      /* the gate: the plane rolls left to right and lifts off; then his phone, later that day */
      ctx.drawImage(A.gateOut,0,0);
      const u=clamp(lt/5.6),x=120+1300*Math.pow(u,1.6),air=Math.max(0,x-760),s=0.55-0.2*clamp(air/600);
      if(x<1520){
        const gnd=1-clamp(air/60);if(gnd>0){ctx.fillStyle=`rgba(40,36,30,${0.2*gnd})`;ell(ctx,x-12,489,170*s,5,0);ctx.fill();}
        jan_plane(ctx,x,486-28*s-air*0.34,s,-0.14*clamp(air/90),1-clamp(air/220));
      }
      ctx.drawImage(A.gateIn,0,0);
      const up=smooth(5.0,5.8,lt);
      if(up>0){
        ctx.fillStyle=`rgba(10,12,18,${0.35*up})`;ctx.fillRect(0,0,W,H);
        const S=drawPhoneHand(ctx,lt,{x:475,y:lerp(760,120,easeOut(up)),w:330,h:700});
        chatPanel(ctx,S,FLIGHT,lt,{name:'Fabeha',status:'online'});
        phoneTop(ctx,S,{time:lt<6?'14:18':'14:31'});
      }
      const dip=smooth(10.0,10.6,lt);if(dip>0){ctx.fillStyle=`rgba(0,0,0,${dip})`;ctx.fillRect(0,0,W,H);}
      return;
    }
    /* his room, 20 January: afternoon → dusk → night; at the end the phone goes down and the camera drifts to the window */
    const dusk=smooth(14.8,17.4,lt),night=smooth(27.0,28.6,lt),down=smooth(37.9,39.1,lt),z=1+0.07*smooth(38.4,43.3,lt);
    const sky=(d,k,n)=>mixHex(mixHex(d,k,dusk),n,night);
    ctx.save();if(z>1){ctx.translate(1020,240);ctx.scale(z,z);ctx.translate(-1020,-240);}
    jan_window(ctx,lt,[[0,sky('#86a9c9','#5b3a6e','#0a1030')],[0.5,sky('#bfd0da','#d2693f','#1c2446')],[1,sky('#e8dcc2','#f3b26a','#2a3058')]],night*0.8);
    if(night<1){ctx.save();ctx.beginPath();ctx.rect(834,74,372,302);ctx.clip();
      if(dusk<1)sunGlow(ctx,1120,110,300,`rgba(255,250,232,${0.5*(1-dusk)})`);
      if(dusk>0)sunGlow(ctx,900,330,260,`rgba(255,200,120,${0.6*dusk*(1-night)})`);ctx.restore();}
    if(lt>=38.2){ /* a plane's lights, crossing the stars */
      const p=clamp((lt-38.2)/5.2),px=lerp(856,1196,p),py=lerp(316,232,p);
      ctx.save();ctx.beginPath();ctx.rect(834,74,372,302);ctx.clip();
      ctx.fillStyle='rgba(255,238,214,.9)';circle(ctx,px,py,1.7);ctx.fill();
      if((lt*1.1)%1<0.16){glow(ctx,px-5,py+1,12,'#ff4a4a',0.9);ctx.fillStyle='#ff6a6a';circle(ctx,px-5,py+1,1.9);ctx.fill();}
      if(((lt+0.45)*1.1)%1<0.07)glow(ctx,px+4,py,16,'#ffffff',0.9);
      ctx.restore();
    }
    ctx.drawImage(A.roomD,0,0);
    if(dusk>0){ctx.globalAlpha=dusk;ctx.drawImage(A.room,0,0);ctx.globalAlpha=1;}
    if(night>0){ctx.globalAlpha=night;ctx.drawImage(A.roomN,0,0);ctx.globalAlpha=1;}
    ctx.restore();
    glow(ctx,640,430,420,'#8fc5ff',0.12*night*(1-down));
    if(down<1){
      const ringing=lt>=20.2&&lt<23.0;
      ctx.save();if(ringing)ctx.translate(Math.sin(lt*90)*2,Math.cos(lt*77)*1.5);
      const S=drawPhoneHand(ctx,lt,{x:475,y:lerp(120,800,down*down),w:330,h:700});
      if(lt<20.2){chatPanel(ctx,S,FIRSTCALL,lt,{name:'Fabeha',status:'online'});phoneTop(ctx,S,{time:lt<12.4?'13:29':lt<17.4?'13:32':'17:39'});}
      else if(lt<28){jan_callScreen(ctx,S,{name:'Fabeha',state:ringing?'incoming':'active',secs:Math.min(19,(lt-23)/4.8*19),t:lt});phoneTop(ctx,S,{time:'17:40'});}
      else{chatPanel(ctx,S,FIRSTCALL,lt,{name:'Fabeha',status:'online'});phoneTop(ctx,S,{time:lt<31?'18:24':lt<33?'18:26':lt<35?'18:27':'18:44'});}
      ctx.restore();
    }
    const fade=1-smooth(10.6,11.2,lt);if(fade>0){ctx.fillStyle=`rgba(0,0,0,${fade})`;ctx.fillRect(0,0,W,H);}
  },
  subs:[
    [0.6,4.4,'17 January. Boarding closed at 8:20. I missed my flight home.'],
    [6.2,8.0,'Khayr choro mujhe tou call krdeti 😭','him'],
    [8.1,10.2,'FLIGHT miss hogyi :( meri tou zimmedar ap hai 😭','him'],
    [10.9,12.3,'20 January. Home in Hyderabad.'],
    [12.6,14.6,'Akhir flight chori thi donon ne 😂','her'],
    [15.0,17.0,'She thought it was her fault.'],
    [17.6,19.8,'Is it alright if i can call you rn?','her'],
    [20.4,22.9,'Her name on the screen. Apparently I had been scary over text all afternoon.'],
    [23.4,27.6,'Nineteen seconds. She wanted to hear for herself that I wasn’t shouting.'],
    [28.6,30.7,'Bro i would not shout 😭😭😭 thats the last thing i’d do','him'],
    [31.2,32.8,'Bro kia bharosa 😂😂😭😭😭😭','her'],
    [33.2,34.8,'You sounded so scary from your texts','her'],
    [35.2,37.8,'Sure thing, raat call krloga ap Chaku or Pepper Spray ready rakhna','him'],
    [38.8,42.0,'I would miss every flight of my life, if it meant being with her.'],
  ],
  score({T,add,hit,melody,bars,CH,THEME_B}){
    /* the gate: thin, a rush of air for the take-off */
    bars(0,3,['Em','Cmaj7','Dsus'],{padVel:0.32});
    melody(1,0,'box',12,0.26,THEME_B);melody(2,1,'box',12,0.26,THEME_B);
    hit(1.6,'swell',{dur:3.2,vel:0.34});
    hit(6.0,'tick',{});
    /* 20 January */
    bars(3,10,['Em','Cmaj7','G','Dsus'],{padVel:0.38});
    for(let b=4;b<7;b++)melody(b,b-4,'box',12,0.3,THEME_B);
    for(let b=8;b<11;b++)melody(b,b-5,'piano',0,0.34,THEME_B);
    [20.2,21.4,22.6].forEach(t=>hit(t,'ring',{}));hit(23.0,'chime',{midi:88,vel:0.35});
    for(const m of FIRSTCALL)if(m.at>0)hit(m.at,'tick',{hi:m.who==='her'});
    /* night, the plane's lights in the window */
    add(T(11,2),'strings',{notes:CH.Cmaj7.p,dur:BAR*1.6,vel:0.36});
    melody(11,6,'box',12,0.3,THEME_B);melody(12,7,'box',12,0.28,THEME_B);
  },
  amb(lt){return lt<10.6?{hum:0.26,crowd:0.06,wind:0.04}:{room:0.25,wind:0.08};},
});

/* ---------- 21 January · 05:16 — one rupee, before dawn ---------- */
const RUPEE=[
  {at:1.6, who:'me', time:'05:16',photos:2,paint:jan_receipt},
  {at:2.4, who:'me', time:'05:16',text:'Donation done'},
  {at:5.0, who:'her',time:'05:18',text:'Kyun khairiat'},
  {at:6.4, who:'her',time:'05:18',text:'Yar bas 1 rs dedia apne😂'},
  {at:9.4, who:'her',time:'05:20',text:'Also, thank you for listening to my side of the story as well.'},
  {at:13.0,who:'her',time:'05:21',text:'If you need anything in future pls dont hesitate to reach out. I\'ll try my level best to be there for you.'},
  {at:17.0,who:'me', time:'05:23',text:'Yr i just knew ke you are an geniune person'},
  {at:20.0,who:'her',time:'05:30',text:'Baqi on that acquaintance shit dont mind that thing, i would\'ve never be talking to you this freely if you were one.'},
  {at:24.0,who:'me', time:'05:31',text:'Ohhh glad not to be acquaintance 😋'},
  {at:26.0,who:'me', time:'05:31',text:'You woke up for namaz?'},
  {at:27.6,who:'her',time:'05:31',text:'Yepp'},
  {at:29.0,who:'her',time:'05:32',text:'Also abhi gym hai at 6:30 am'},
];
scene({id:'rupee',name:'21 January · one rupee',when:'2026-01-21T05:16',bars:10,fin:['#000000',1.4],fout:['#000000',1.4],
  note:'his room before dawn, the phone the only light, the prayer mat under the window; one rupee sent back as a donation; her thank-you after Fajr; the window going from black to blue.',
  tag:'“Also, thank you for listening to my side of the story as well.”',
  prep(){return{room:jan_room({top:'#07080f',bottom:'#0d0c16',floor:'#15121c',mat:true,frame:'#1a1826',mullion:'#262238'})};},
  draw(ctx,lt,A){
    const d=clamp(lt/33);
    jan_window(ctx,lt,[[0,mixHex('#04050c','#0c1a36',d)],[1,mixHex('#0b1226','#3a4f7a',d)]],1-0.7*d,78);
    ctx.drawImage(A.room,0,0);
    ctx.save();ctx.globalCompositeOperation='screen';ctx.fillStyle=hexA('#8fb0ff',0.05+0.1*d);ctx.beginPath();ctx.moveTo(834,380);ctx.lineTo(1206,380);ctx.lineTo(1260,720);ctx.lineTo(760,720);ctx.closePath();ctx.fill();ctx.restore();
    glow(ctx,640,430,440,'#9fd0ff',0.14);
    const S=drawPhoneHand(ctx,lt,{x:475,y:120,w:330,h:700});
    chatPanel(ctx,S,RUPEE,lt,{name:'Fabeha',status:'online'});
    phoneTop(ctx,S,{time:lt<5?'05:16':lt<9.4?'05:18':lt<13?'05:20':lt<17?'05:21':lt<20?'05:23':lt<24?'05:30':lt<29?'05:31':'05:32'});
  },
  subs:[
    [0.6,2.6,'21 January, 05:16. She was awake for namaz.'],
    [2.8,5.0,'I was awake for nothing in particular. I sent her one rupee.'],
    [5.2,6.2,'Kyun khairiat','her'],
    [6.6,8.8,'Yar bas 1 rs dedia apne😂','her'],
    [9.6,12.6,'Also, thank you for listening to my side of the story as well.','her'],
    [13.2,15.0,'If you need anything in future pls dont hesitate to reach out.','her'],
    [15.1,16.8,'I\'ll try my level best to be there for you.','her'],
    [17.2,19.6,'Yr i just knew ke you are an geniune person','him'],
    [20.2,21.9,'Baqi on that acquaintance shit dont mind that thing,','her'],
    [22.0,23.8,'i would\'ve never be talking to you this freely if you were one.','her'],
    [24.2,25.8,'Ohhh glad not to be acquaintance 😋','him'],
    [26.2,27.4,'You woke up for namaz?','him'],
    [27.8,28.8,'Yepp','her'],
    [29.2,30.6,'Also abhi gym hai at 6:30 am','her'],
    [31.0,32.9,'The window went from black to blue while we typed.'],
  ],
  score({hit,melody,bars,THEME_B}){
    bars(0,10,['Em','Cmaj7','G','Dsus'],{padVel:0.34});
    for(let b=1;b<9;b++)melody(b,b-1,'box',12,0.3,THEME_B);
    hit(1.6,'chime',{midi:88,vel:0.32});
    for(const m of RUPEE)hit(m.at,'tick',{hi:m.who==='her'});
  },
  amb(lt){return{room:0.18,wind:0.1};},
});

/* ---------- 21 January · 17:51 — the Nathia Gali sky, and the star she circled ---------- */
let jan_T=0; /* seconds into the current scene, for the photo-tile painters */
function jan_skyTile(ctx,px,py,tile,o={}){
  const k=tile/200,bx=o.bx??72,by=o.by??48;
  ctx.save();ctx.translate(px,py);ctx.scale(k,k);
  if(o.zoom){ctx.translate(100,100);ctx.scale(2.4,2.4);ctx.translate(-(bx+8),-(by+14));}
  ctx.fillStyle=vgrad(ctx,0,200,[[0,'#070b16'],[0.55,'#10203a'],[0.85,'#3a4e68'],[1,'#8c9bb0']]);ctx.fillRect(-200,-200,600,600);
  const r=rng(o.seed||902);ctx.fillStyle='#fff';
  for(let i=0;i<70;i++){const x=r()*200,y=r()*170,s=0.5+r()*1.2;ctx.globalAlpha=0.5+0.5*r();ctx.fillRect(x,y,s,s);}ctx.globalAlpha=1;
  for(const[x,y,s]of[[40,120,1.6],[48,117,1.6],[56,114,1.6],[30,100,1.8],[66,98,1.8],[34,140,1.6],[70,138,1.6]]){circle(ctx,x,y,s);ctx.fill();}
  const gl=ctx.createRadialGradient(bx,by,0,bx,by,14);gl.addColorStop(0,'rgba(255,255,255,.95)');gl.addColorStop(0.3,'rgba(220,235,255,.4)');gl.addColorStop(1,'rgba(200,220,255,0)');ctx.fillStyle=gl;ctx.fillRect(bx-14,by-14,28,28);ctx.fillStyle='#fff';circle(ctx,bx,by,2.6);ctx.fill();
  ctx.fillStyle='rgba(160,175,195,.18)';ctx.fillRect(0,140,200,60);
  ctx.strokeStyle='rgba(20,24,32,.8)';ctx.lineWidth=0.8;ctx.beginPath();ctx.moveTo(200,150);ctx.lineTo(90,185);ctx.stroke();
  const rr=rng(5);drawPine(ctx,10,215,70,'#0d161a','#13232a','#d7e2ea',rr);drawPine(ctx,178,218,90,'#0d161a','#13232a','#d7e2ea',rr);drawPine(ctx,150,222,60,'#0d161a','#13232a','#d7e2ea',rr);
  if(o.circle>0){ctx.strokeStyle='#2ee59d';ctx.lineWidth=2.4;ctx.lineCap='round';ctx.beginPath();const a0=-1.25,a1=a0+TAU*0.93*o.circle;for(let i=0;i<=60;i++){const a=a0+(a1-a0)*i/60,x=bx+8+Math.cos(a)*44,y=by+14+Math.sin(a)*48;if(i)ctx.lineTo(x,y);else ctx.moveTo(x,y);}ctx.stroke();}
  ctx.restore();
}
const STAR=[
  {at:0,who:'me',time:'17:51',text:'',del:0},{at:0,who:'me',time:'17:51',text:'',del:0},{at:0,who:'me',time:'17:51',text:'',del:0},
  {at:3.4, who:'her',time:'17:53',text:'Why did you delete them'},
  {at:4.8, who:'me', time:'17:53',text:'Gpt ne bata diya 😭'},
  {at:6.2, who:'me', time:'17:54',photos:2,paint:(c,px,py,t,k)=>jan_skyTile(c,px,py,t,{t:jan_T,bx:k?62:72,by:k?58:48,seed:902+k})},
  {at:7.8, who:'her',time:'17:54',text:'Damnnn this is so pretty'},
  {at:9.6, who:'me', time:'17:54',text:'Not itna pretty, pretty was something else uss din'},
  {at:12.0,who:'her',time:'17:55',text:'Twilight kay waqt li thi?'},
  {at:13.4,who:'me', time:'17:55',text:'12-1 Baaje jiss waqt tum bhi cafe mein ayi thi'},
  {at:14.6,who:'me', time:'17:55',text:'Nathia gaali mein chai lene'},
  {at:25.4,who:'her',time:'17:58',photos:2,paint:(c,px,py,t,k)=>jan_skyTile(c,px,py,t,{t:jan_T,circle:smooth(25.8,27.2,jan_T),zoom:k===1})},
  {at:28.2,who:'me', time:'17:58',text:'Gpt tou saying its Sirius'},
  {at:29.6,who:'her',time:'17:59',text:'Sirius toh star hai wese'},
  {at:31.0,who:'her',time:'18:01',text:'Ye walay starts kabhi set nhi kartay'},
  {at:32.2,who:'her',time:'18:01',text:'They are always there'},
  {at:34.0,who:'me', time:'18:01',text:'Hmm guardian angel ki taraha har waqt hoote'},
];
scene({id:'star',name:'21 January · the star she circled',when:'2026-01-21T17:51',bars:11,fin:['#000000',1.2],fout:['#000000',1.4],
  note:'seven messages deleted, then the Nathia Gali sky photo from the midnight chai run; cut to the real sky over the pines, a cup in his hand, her at the cafe door; back on the phone her green circle arrives around the brightest star.',
  tag:'“They are always there” · “guardian angel ki taraha”',
  prep(){
    const r=rng(921),stars=[];for(let i=0;i<420;i++)stars.push({x:r()*W,y:r()*560,s:0.5+r()*1.6,ph:r()*TAU,a:0.4+r()*0.6});
    const ridge=makeLayer({w:1400,seed:922,y0:612,amp:14,oct:2,f0:0.01,top:'#8e9bab',bottom:'#3b4656',patches:['#aab6c4','#2a3340'],patchN:80,pines:{n:34,size:150,sink:6,dark:'#0b1518',light:'#13262b',snow:'#cfdbe6',xs:r=>{const u=r();return u<0.45?u/0.45*260:1080+(u-0.45)/0.55*320;}}});
    return{room:jan_room({top:'#1e1626','bottom':'#261a2a',floor:'#30222e',light:'#ff8a50',frame:'#342636',mullion:'#443446'}),stars,ridge};
  },
  draw(ctx,lt,A){
    jan_T=lt;
    if(lt>=16&&lt<25){
      const u=lt-16;
      ctx.save();ctx.translate(Math.sin(u*0.25)*8,0);
      paintSky(ctx,[[0,'#04070f'],[0.5,'#0d1828'],[0.78,'#2a3a52'],[1,'#8794a6']]);
      for(const s of A.stars){const a=0.4+0.6*Math.sin(lt*1.4+s.ph);ctx.fillStyle=`rgba(255,250,240,${a*s.a})`;ctx.fillRect(s.x,s.y,s.s,s.s);}
      ctx.fillStyle='rgba(255,250,240,.95)';for(const[x,y,s]of[[300,470,3],[334,460,3],[368,450,3],[250,380,3.6],[410,372,3.4],[270,548,3],[428,540,3.2]]){circle(ctx,x,y,s);ctx.fill();}
      const gl=ctx.createRadialGradient(470,150,0,470,150,46);gl.addColorStop(0,'rgba(255,255,255,.95)');gl.addColorStop(0.25,'rgba(220,235,255,.4)');gl.addColorStop(1,'rgba(200,220,255,0)');ctx.fillStyle=gl;ctx.fillRect(424,104,92,92);ctx.fillStyle='#fff';circle(ctx,470,150,6);ctx.fill();
      ctx.fillStyle=vgrad(ctx,440,620,[[0,'rgba(150,170,195,0)'],[1,'rgba(150,170,195,.35)']]);ctx.fillRect(0,440,W,180);
      ctx.drawImage(A.ridge.c,-60,0);
      ctx.strokeStyle='rgba(10,14,20,.85)';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(1060,470);ctx.lineTo(300,560);ctx.stroke();ctx.beginPath();ctx.moveTo(1060,480);ctx.lineTo(300,574);ctx.stroke();
      /* the cafe: a pitched roof under snow, two warm windows, a door */
      glow(ctx,880,630,220,'#ffb060',0.22);
      ctx.fillStyle='#2a2320';ctx.fillRect(770,500,220,114);ctx.fillStyle='#3a3230';ctx.beginPath();ctx.moveTo(748,506);ctx.lineTo(880,428);ctx.lineTo(1012,506);ctx.closePath();ctx.fill();
      ctx.fillStyle='#dfe6ee';ctx.beginPath();ctx.moveTo(752,500);ctx.lineTo(880,424);ctx.lineTo(1008,500);ctx.lineTo(1000,500);ctx.lineTo(880,436);ctx.lineTo(760,500);ctx.closePath();ctx.fill();
      for(const wx of[800,920]){ctx.fillStyle='#ffb85a';ctx.fillRect(wx,528,42,38);ctx.fillStyle='rgba(60,30,10,.5)';ctx.fillRect(wx+19,528,4,38);ctx.fillRect(wx,546,42,3);}
      ctx.fillStyle='#161210';ctx.fillRect(860,540,40,74);ctx.fillStyle='#ffc070';ctx.fillRect(896,540,4,74);
      ctx.fillStyle='#5a3a2a';ctx.fillRect(846,508,68,20);ctx.fillStyle='#f1e3c8';ctx.font='700 11px "Mulish",sans-serif';ctx.textAlign='center';ctx.fillText('CHAI',880,522);
      drawFabeha(ctx,842,532,0.4,{t:lt,outfit:'coat',hair:'beanie',arms:'lap',smile:0.65,look:0.1,tilt:-0.1,blush:0.4,len:200});
      /* our hand, a paper cup of chai, the steam */
      ctx.fillStyle='#efe6d6';ctx.beginPath();ctx.moveTo(596,604);ctx.lineTo(694,604);ctx.lineTo(682,720);ctx.lineTo(608,720);ctx.closePath();ctx.fill();
      ctx.fillStyle='#8a5a3a';ctx.beginPath();ctx.moveTo(592,640);ctx.lineTo(698,640);ctx.lineTo(692,696);ctx.lineTo(598,696);ctx.closePath();ctx.fill();
      ctx.fillStyle='#f6f1e8';ell(ctx,645,604,50,11);ctx.fill();ctx.fillStyle='#d9d2c6';ell(ctx,645,604,34,6);ctx.fill();
      ctx.fillStyle=HIS.skin;for(const[fy,fw]of[[642,30],[668,32],[694,30]]){ell(ctx,598,fy,fw,13,0.1);ctx.fill();}ell(ctx,700,660,16,30,0.3);ctx.fill();
      ctx.save();ctx.strokeStyle='rgba(255,255,255,.22)';ctx.lineWidth=5;ctx.lineCap='round';for(let k=0;k<3;k++){const ph=lt*1.3+k*2.1,x0=630+k*14;ctx.beginPath();ctx.moveTo(x0,596);ctx.bezierCurveTo(x0-16+Math.sin(ph)*10,560,x0+18+Math.cos(ph)*10,530,x0-6+Math.sin(ph*0.7)*14,490-k*10);ctx.stroke();}ctx.restore();
      ctx.restore();
      const dip=Math.max(1-smooth(16,16.7,lt),smooth(24.3,25,lt));if(dip>0){ctx.fillStyle=`rgba(0,0,0,${dip})`;ctx.fillRect(0,0,W,H);}
      return;
    }
    const night=clamp(smooth(25,27,lt)*0.6+lt/60);
    jan_window(ctx,lt,[[0,mixHex('#4a2e60','#0a1030',night)],[0.5,mixHex('#c4603c','#1c2446',night)],[1,mixHex('#eaa860','#2a3058',night)]],night*0.8,79);
    if(night<1){ctx.save();ctx.beginPath();ctx.rect(834,74,372,302);ctx.clip();sunGlow(ctx,880,350,240,`rgba(255,190,120,${0.5*(1-night)})`);ctx.restore();}
    ctx.drawImage(A.room,0,0);
    ctx.fillStyle=`rgba(8,6,14,${0.45*night})`;ctx.fillRect(0,0,W,H);
    glow(ctx,640,430,420,'#8fc5ff',0.1*night);
    const S=drawPhoneHand(ctx,lt,{x:475,y:120,w:330,h:700});
    chatPanel(ctx,S,STAR,lt,{name:'Fabeha',status:'online'});
    phoneTop(ctx,S,{time:lt<3.4?'17:51':lt<6.2?'17:53':lt<12?'17:54':lt<25.4?'17:55':lt<29.6?'17:58':lt<31?'17:59':'18:01'});
    if(lt>=25){const dip=1-smooth(25,25.6,lt);if(dip>0){ctx.fillStyle=`rgba(0,0,0,${dip})`;ctx.fillRect(0,0,W,H);}}
  },
  subs:[
    [0.6,3.2,'21 January, 17:51. I typed seven messages about a photo, then deleted all seven.'],
    [3.6,4.7,'Why did you delete them','her'],
    [5.0,6.0,'Gpt ne bata diya 😭','him'],
    [8.0,9.4,'Damnnn this is so pretty','her'],
    [9.8,11.8,'Not itna pretty, pretty was something else uss din','him'],
    [12.2,13.3,'Twilight kay waqt li thi?','her'],
    [13.6,15.8,'12-1 Baaje jiss waqt tum bhi cafe mein ayi thi','him'],
    [16.8,20.6,'Nathia Gali, a week before, past midnight. I had gone out for chai and looked up.'],
    [21.2,24.2,'She walked into the cafe just then. Pretty was something else, that night.'],
    [25.8,28.0,'She sent it back with a circle around the brightest one, in green.'],
    [28.4,29.5,'Gpt tou saying its Sirius','him'],
    [29.8,30.9,'Sirius toh star hai wese','her'],
    [31.2,32.1,'Ye walay starts kabhi set nhi kartay','her'],
    [32.4,33.8,'They are always there','her'],
    [34.2,36.2,'Hmm guardian angel ki taraha har waqt hoote','him'],
  ],
  score({add,at,hit,melody,bars,CH,THEME_B}){
    bars(0,5,['Em','Cmaj7','G','Dsus','Em'],{padVel:0.36});
    for(let b=1;b<5;b++)melody(b,b-1,'box',12,0.3,THEME_B);
    hit(16.0,'swell',{dur:1.0,vel:0.4});add(at(16.4),'strings',{notes:CH.Cmaj7.p,dur:4.2,vel:0.5});add(at(20.6),'strings',{notes:CH.G.p,dur:4.2,vel:0.45});
    for(let b=5;b<8;b++)melody(b,b-1,'flute',0,0.42,THEME_B);
    bars(8,3,['Em7','Cadd9','Dsus'],{padVel:0.34});
    for(let b=8;b<11;b++)melody(b,b-3,'box',12,0.3,THEME_B);
    hit(25.9,'chime',{midi:91,vel:0.4});hit(27.0,'chime',{midi:95,vel:0.3});
    for(const m of STAR)if(m.at>0)hit(m.at,'tick',{hi:m.who==='her'});
  },
  amb(lt){return lt>=16&&lt<25?{wind:0.32}:{room:0.22,wind:0.06};},
});

/* ---------- 21 January · 21:12 → 22 January · 01:56 — Best Friend Fabeha Adnan, then World Cup Trophy ---------- */
const TROPHY=[
  {at:0.6, who:'me', time:'21:12',text:'Bhaee i am your best friend'},
  {at:11.0,who:'me', time:'21:12',photos:2,paint:(c,px,py,t,k)=>jan_contactTile(c,px,py,t,'Best Friend Fabeha Adnan')},
  {at:22.2,who:'me', time:'01:56',photos:2,paint:(c,px,py,t,k)=>jan_contactTile(c,px,py,t,'World Cup Trophy')},
  {at:25.0,who:'her',time:'01:57',text:'😂😂😂😭😭😭😭😭'},
];
scene({id:'trophy',name:'21 January · World Cup Trophy',when:'2026-01-21T21:12',bars:9,fin:['#000000',1.2],fout:['#000000',1.4],
  note:'the Contact info screen at 21:12, “Fabeha” retyped as “Best Friend Fabeha Adnan”, screenshot, sent; at 01:56, still on the call, retyped again.',
  tag:'“World Cup Trophy”',
  prep(){return rooms();},
  draw(ctx,lt,A){
    ctx.drawImage(A.night,0,0);
    const late=lt>=13;
    ctx.fillStyle=`rgba(6,5,12,${0.35*smooth(12.6,13.4,lt)})`;ctx.fillRect(0,0,W,H);
    const S=drawPhoneHand(ctx,lt,{x:475,y:120,w:330,h:700});
    const NAME1='Best Friend Fabeha Adnan',NAME2='World Cup Trophy';
    const nameNow=lt<7.6?'Fabeha':lt<18.4?NAME1:NAME2;
    let flash=0;
    if((lt>=3&&lt<10.8)||(lt>=14.6&&lt<22)){
      const first=lt<12,t0=first?3:14.6,from=first?'Fabeha':NAME1,to=first?NAME1:NAME2;
      const e0=t0+1.6,e1=e0+(first?0.6:1.2),ty0=e1,ty1=ty0+to.length/10,done=ty1+0.2;
      let name,editing=lt>=e0&&lt<done,caret=editing;
      if(lt<e0)name=from;else if(lt<e1)name=from.slice(0,Math.round(from.length*(1-smooth(e0,e1,lt))));else name=to.slice(0,Math.min(to.length,Math.floor((lt-ty0)*10)));
      const toast=smooth(done,done+0.3,lt)*(1-smooth(done+2.4,done+2.9,lt));
      jan_contact(ctx,S,{name,editing,caret,t:lt,media:first?9:12,toast});
      const shot=done+1.4;flash=smooth(shot,shot+0.05,lt)*(1-smooth(shot+0.1,shot+0.45,lt));
      const tapU=smooth(t0+1.0,t0+1.4,lt)*(1-smooth(t0+1.7,t0+2.1,lt));
      if(tapU>0){ctx.fillStyle=HIS.skin;ell(ctx,lerp(S.x+S.w+70,S.x+S.w-34,tapU),lerp(S.y+S.h+60,S.y+76,tapU),24,42,-0.45);ctx.fill();}
    }else{
      chatPanel(ctx,S,TROPHY,lt,{name:nameNow,status:'online'});
      if(late){ctx.save();rrect(ctx,S.x,S.y,S.w,S.h,S.r);ctx.clip();ctx.fillStyle='#1daa61';ctx.fillRect(S.x,S.y+34,S.w,18);ctx.fillStyle='#fff';ctx.font='600 11px "Mulish",sans-serif';ctx.textAlign='center';ctx.fillText('Group call · tap to return',S.x+S.w/2,S.y+47);ctx.restore();}
    }
    phoneTop(ctx,S,{time:lt<13?'21:12':lt<25?'01:56':'01:57'});
    if(flash>0){ctx.save();rrect(ctx,S.x,S.y,S.w,S.h,S.r);ctx.clip();ctx.fillStyle=`rgba(255,255,255,${flash})`;ctx.fillRect(S.x,S.y,S.w,S.h);ctx.restore();}
    const dip=smooth(12.5,13,lt)*(1-smooth(13,13.6,lt));if(dip>0){ctx.fillStyle=`rgba(0,0,0,${dip})`;ctx.fillRect(0,0,W,H);}
  },
  subs:[
    [0.8,2.2,'Bhaee i am your best friend','him'],
    [2.6,5.8,'21 January, 21:12. I had just informed her that I was her best friend. Then I made it official.'],
    [9.4,12.0,'Screenshot. Sent. Evidence.'],
    [13.8,17.6,'Five hours later, still on a call with her, I thought of a better title.'],
    [19.2,21.8,'There is no higher honour I could think of.'],
    [25.4,27.8,'😂😂😂😭😭😭😭😭','her'],
  ],
  score({hit,melody,bars,THEME}){
    bars(0,9,['G','Cmaj7','Em7','D'],{padVel:0.34});
    for(let b=0;b<8;b++)melody(b,b,'box',12,0.38,THEME);
    [91,95,98].forEach((m,k)=>hit(7.8+k*0.15,'chime',{midi:m,vel:0.38}));
    [86,91,95,98,103].forEach((m,k)=>hit(19.2+k*0.12,'chime',{midi:m,vel:0.42}));
    hit(9.2,'tick',{hi:true});hit(20.6,'tick',{hi:true});
    for(const m of TROPHY)hit(m.at,'tick',{hi:m.who==='her'});
  },
  amb(lt){return{room:0.22,hum:0.08};},
});

