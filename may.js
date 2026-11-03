/* may.js — May 2026: Makkah with Ammi for the whole month, her finals in Karachi, the istekhara, the Kaaba dream, Hajj. */
'use strict';

/* ---------- shared painted assets for May, built once (the city, the hotel room, the old Kaaba, the Mina tent, the souvenir lane, a bed cover) ---------- */
let MAY_A=null;
function may_assets(){
  if(MAY_A)return MAY_A;
  const A={};
  /* Makkah at night from his hotel on the hills, ten kilometres out: a basin of lights, the clock tower, the Haram's white glow */
  { const c=mk(W,H),g=c.getContext('2d'),r=rng(501);
    g.fillStyle=vgrad(g,0,H,[[0,'#05071a'],[0.35,'#10122c'],[0.55,'#2a2040'],[0.64,'#4a3348']]);g.fillRect(0,0,W,H);
    g.fillStyle='#fff6e0';for(let i=0;i<170;i++){const s=r()*1.3+0.3;g.globalAlpha=0.3+r()*0.6;g.fillRect(r()*W,r()*340,s,s);}g.globalAlpha=1;
    const hg=g.createRadialGradient(850,472,0,850,472,560);hg.addColorStop(0,'rgba(255,222,170,.55)');hg.addColorStop(0.35,'rgba(255,190,140,.22)');hg.addColorStop(1,'rgba(255,190,140,0)');g.fillStyle=hg;g.fillRect(0,0,W,H);
    const far=makeLayer({w:1600,seed:502,y0:420,amp:60,oct:3,f0:0.003,top:'#34294b',bottom:'#1c1830',patches:['#3f3360','#161228'],patchN:50});g.drawImage(far.c,-120,0);
    glow(g,850,474,230,'#fff0d0',0.8);
    for(const[x,h]of[[806,48],[826,60],[964,60],[984,48]]){g.fillStyle='#f3ece0';g.fillRect(x-3,472-h,6,h);g.fillStyle='#2e7d4f';g.fillRect(x-4,472-h-6,8,6);glow(g,x,472-h-4,14,'#b8ffd0',0.9);}
    may_tower(g,900,470,0.42);
    const band=g.createLinearGradient(0,430,0,560);band.addColorStop(0,'rgba(255,190,120,0)');band.addColorStop(0.3,'rgba(255,190,120,.28)');band.addColorStop(1,'rgba(255,190,120,0)');g.fillStyle=band;g.fillRect(0,430,W,130);
    for(let i=0;i<3400;i++){const u=Math.pow(r(),0.75),y=442+u*278,spread=0.45+u*1.0,x=640+(r()-0.5)*W*1.7*spread;if(x<-10||x>W+10)continue;const k=r();g.fillStyle=k<0.72?'#ffd27a':k<0.9?'#fff4dc':'#8fd6ff';g.globalAlpha=0.5+r()*0.5;const s=1.5+u*2.4;g.fillRect(x,y,s,s);}
    g.globalAlpha=1;
    for(let i=0;i<40;i++){const x=r()*W,y=448+r()*60;glow(g,x,y,8+r()*10,'#ffd9a0',0.5);}
    const haze=g.createLinearGradient(0,440,0,520);haze.addColorStop(0,'rgba(90,60,80,.3)');haze.addColorStop(1,'rgba(90,60,80,0)');g.fillStyle=haze;g.fillRect(0,440,W,80);
    A.city=c; }
  /* the hotel room around the window: dark walls, a maroon curtain, the sill, one lamp, the edge of the bed */
  { const c=mk(W,H),g=c.getContext('2d');
    g.fillStyle=vgrad(g,0,H,[[0,'#0f0d17'],[1,'#1a1523']]);g.fillRect(0,0,W,H);
    g.save();g.globalCompositeOperation='destination-out';g.fillRect(300,50,700,470);g.restore();
    g.fillStyle='rgba(255,255,255,.035)';g.fillRect(300,50,700,470);
    g.fillStyle='#2a2434';g.fillRect(290,40,720,10);g.fillRect(290,40,10,490);g.fillRect(1000,40,10,490);g.fillRect(646,40,8,480);
    g.fillStyle='#2e2838';g.fillRect(276,520,748,22);g.fillStyle='#1c1724';g.fillRect(276,542,748,8);
    for(let k=0;k<5;k++){const x=232+k*24;g.fillStyle=k%2?'#3b2132':'#2a1724';g.beginPath();g.moveTo(x-20,30);g.lineTo(x+10,30);g.lineTo(x+16,546);g.lineTo(x-16,546);g.closePath();g.fill();}
    for(let k=0;k<3;k++){const x=1000-k*24;g.fillStyle=k%2?'#3b2132':'#2a1724';g.beginPath();g.moveTo(x-10,30);g.lineTo(x+20,30);g.lineTo(x+16,546);g.lineTo(x-16,546);g.closePath();g.fill();}
    g.fillStyle='#241c2c';g.fillRect(260,22,780,14);
    const lamp=g.createRadialGradient(120,440,0,120,440,340);lamp.addColorStop(0,'rgba(255,190,120,.42)');lamp.addColorStop(1,'rgba(255,190,120,0)');g.fillStyle=lamp;g.fillRect(0,0,W,H);
    g.fillStyle='#e9cfa2';g.beginPath();g.moveTo(84,392);g.lineTo(156,392);g.lineTo(176,452);g.lineTo(64,452);g.closePath();g.fill();
    g.fillStyle='#3a3042';g.fillRect(114,452,12,58);g.fillRect(92,508,56,10);
    g.fillStyle='#d8d0c6';g.beginPath();g.moveTo(0,610);g.quadraticCurveTo(300,566,520,650);g.lineTo(520,720);g.lineTo(0,720);g.closePath();g.fill();
    g.fillStyle='rgba(0,0,0,.22)';g.beginPath();g.moveTo(0,640);g.quadraticCurveTo(260,620,520,690);g.lineTo(520,720);g.lineTo(0,720);g.closePath();g.fill();
    A.room=c; }
  /* the Kaaba as he dreamed it: older, plainer, on a little raised ground, in a gold haze */
  { const c=mk(W,H),g=c.getContext('2d'),r=rng(531);
    g.fillStyle=vgrad(g,0,H,[[0,'#f6e2b8'],[0.45,'#f6cd92'],[0.7,'#e9aa6c'],[1,'#c98a52']]);g.fillRect(0,0,W,H);
    sunGlow(g,640,330,720,'rgba(255,244,210,0.85)');
    const hz=makeLayer({w:1600,seed:532,y0:380,amp:36,oct:3,f0:0.003,top:'#e8bd8c',bottom:'#dba878',patches:['#f1c99a','#cf9a64'],patchN:40});g.drawImage(hz.c,-100,0);
    g.fillStyle=vgrad(g,400,720,[[0,'#dfb47f'],[1,'#b98650']]);g.fillRect(0,400,W,320);
    g.fillStyle='#cf9f6a';g.fillRect(0,352,W,56);for(let k=0;k<17;k++){const x=20+k*78;g.fillStyle='#e2b784';g.beginPath();g.moveTo(x,408);g.lineTo(x,376);g.arc(x+24,376,24,Math.PI,0);g.lineTo(x+48,408);g.closePath();g.fill();}
    g.fillStyle='rgba(255,230,190,.35)';g.fillRect(0,352,W,56);
    for(let k=0;k<3;k++){const y=512+k*18,inset=k*26;g.fillStyle=k%2?'#d3ac7c':'#dcb98a';g.beginPath();g.moveTo(330-inset*-1,y);g.lineTo(950+inset,y);g.lineTo(990+inset,y+22);g.lineTo(290-inset,y+22);g.closePath();g.fill();g.fillStyle='rgba(80,50,30,.18)';g.fillRect(290-inset,y+18,700+inset*2,4);}
    g.fillStyle='rgba(60,35,20,.25)';ell(g,640,532,240,16);g.fill();
    g.fillStyle='#201b1e';g.fillRect(540,300,200,214);g.fillStyle='#2b2528';g.beginPath();g.moveTo(740,300);g.lineTo(792,282);g.lineTo(792,498);g.lineTo(740,514);g.closePath();g.fill();
    g.fillStyle='#161215';g.beginPath();g.moveTo(540,300);g.lineTo(592,282);g.lineTo(792,282);g.lineTo(740,300);g.closePath();g.fill();
    g.fillStyle='#b8902e';g.fillRect(540,364,200,14);g.beginPath();g.moveTo(740,364);g.lineTo(792,348);g.lineTo(792,362);g.lineTo(740,378);g.closePath();g.fill();
    g.fillStyle='rgba(255,220,150,.25)';for(let x=548;x<736;x+=10)g.fillRect(x,368,5,6);
    g.fillStyle='#c9a24a';g.fillRect(690,418,38,72);g.fillStyle='rgba(0,0,0,.25)';g.fillRect(708,418,2,72);
    g.fillStyle='#9a9a9a';circle(g,738,478,7);g.fill();g.fillStyle='#2b2426';circle(g,738,478,4);g.fill();
    const wl=g.createRadialGradient(640,420,0,640,420,760);wl.addColorStop(0,'rgba(255,214,150,.18)');wl.addColorStop(1,'rgba(255,214,150,0)');g.fillStyle=wl;g.fillRect(0,0,W,H);
    A.dream=c; }
  /* the tent in Mina: cream canvas, one tube light, a red carpet, thin mattresses in rows */
  { const c=mk(W,H),g=c.getContext('2d'),r=rng(541);
    g.fillStyle=vgrad(g,0,H,[[0,'#ece4d2'],[0.55,'#f1eadb'],[1,'#d9d0bd']]);g.fillRect(0,0,W,H);
    g.strokeStyle='rgba(120,100,80,.22)';g.lineWidth=2;for(let x=0;x<=W;x+=160){g.beginPath();g.moveTo(x,0);g.lineTo(x+(x-640)*0.08,428);g.stroke();}
    g.fillStyle='#fffbe8';rrect(g,470,38,340,14,7);g.fill();glow(g,640,48,460,'#fff6d0',0.6);
    g.fillStyle='#d6cdb9';g.fillRect(0,424,W,8);
    g.fillStyle='#8c2f2f';g.fillRect(0,430,W,290);
    g.fillStyle='rgba(255,220,180,.16)';for(let y=440;y<720;y+=28)for(let x=((y/28)|0)%2?14:0;x<W;x+=28){g.beginPath();g.moveTo(x+14,y);g.lineTo(x+28,y+14);g.lineTo(x+14,y+28);g.lineTo(x,y+14);g.closePath();g.fill();}
    g.fillStyle='rgba(60,20,20,.18)';g.fillRect(0,430,W,290);
    for(const[x,w]of[[-40,330],[330,330],[980,330]]){g.fillStyle='#e9e2d6';rrect(g,x,462,w,118,10);g.fill();g.fillStyle='#b9c7d3';for(let k=0;k<5;k++)g.fillRect(x+16,476+k*20,w-32,6);g.fillStyle='#f6f1e7';rrect(g,x+16,448,110,36,8);g.fill();g.fillStyle='rgba(0,0,0,.18)';g.fillRect(x,580,w,6);}
    g.fillStyle='#2b3f5c';rrect(g,1040,392,90,46,8);g.fill();g.fillStyle='#1d2d44';g.fillRect(1052,386,66,8);
    g.fillStyle='#3b8bd1';rrect(g,150,398,24,46,5);g.fill();g.fillStyle='#e9f3fb';g.fillRect(154,404,16,30);
    g.fillStyle='#4a3b36';for(const sx of[760,800]){ell(g,sx,600,16,36,0.1);g.fill();}
    A.tent=c; }
  /* a souvenir lane by the Haram at night: a canopy of bulbs, cords of keychains, trays on the counter */
  { const c=mk(W,H),g=c.getContext('2d'),r=rng(551);
    g.fillStyle=vgrad(g,0,H,[[0,'#17111a'],[0.5,'#2a1c22'],[1,'#3a2a26']]);g.fillRect(0,0,W,H);
    for(let k=0;k<17;k++){const x=10+k*80,col=['#b4472f','#2f7a4a','#c9a24a','#3f63a8','#8a3a6a'][k%5];g.fillStyle=col;rrect(g,x,86,62,54,6);g.fill();g.fillStyle='rgba(255,255,255,.16)';g.fillRect(x+8,96,46,8);}
    g.fillStyle='#4a3328';g.fillRect(0,140,W,14);g.fillRect(0,336,W,14);
    for(let k=0;k<17;k++){const x=30+k*78,col=['#d9b35a','#6aa0d8','#c96a8a','#8fd0a0'][k%4];g.fillStyle=col;rrect(g,x,290,22,46,5);g.fill();g.fillStyle='#f1e7c6';g.fillRect(x+6,284,10,8);}
    g.fillStyle='#5a2d22';g.beginPath();g.moveTo(0,0);g.lineTo(W,0);g.lineTo(W,54);g.quadraticCurveTo(640,84,0,54);g.closePath();g.fill();
    for(let x=70;x<W;x+=130){glow(g,x,62,120,'#ffd27a',0.45);g.fillStyle='#fff1c4';circle(g,x,62,7);g.fill();}
    const cols=['#c9a24a','#2f7a4a','#b4472f','#3f63a8','#e2b86a'];
    for(const y of[180,246,396,462]){g.strokeStyle='#8a7a66';g.lineWidth=2;g.beginPath();g.moveTo(0,y);g.lineTo(W,y);g.stroke();
      for(let x=24+(y%7)*3;x<W;x+=46){g.strokeStyle='#cfc2a8';g.lineWidth=1.2;g.beginPath();g.moveTo(x,y);g.lineTo(x,y+22);g.stroke();may_charm(g,x,y+24,0.8,Math.floor(r()*5),cols[Math.floor(r()*5)]);}}
    g.fillStyle='#6b4a36';g.fillRect(0,560,W,160);g.fillStyle='#8a6246';g.fillRect(0,560,W,12);
    for(let k=0;k<4;k++){const x=60+k*320;g.fillStyle='#2a2a30';rrect(g,x,590,260,110,10);g.fill();const rr=rng(560+k);for(let i=0;i<22;i++)may_charm(g,x+20+rr()*220,606+rr()*80,0.6,Math.floor(rr()*5),cols[i%5]);}
    g.fillStyle='rgba(0,0,0,.22)';g.fillRect(0,0,W,H);
    A.market=c; }
  /* the bed cover, close: cream quilting, soft folds */
  { const c=mk(W,H),g=c.getContext('2d'),r=rng(521);
    g.fillStyle=vgrad(g,0,H,[[0,'#f1e9da'],[1,'#dacdb9']]);g.fillRect(0,0,W,H);
    g.strokeStyle='rgba(120,100,80,.07)';g.lineWidth=1;for(let y=0;y<H;y+=6){g.beginPath();g.moveTo(0,y);g.lineTo(W,y+2);g.stroke();}
    for(let k=0;k<6;k++){const x=r()*W,y=r()*H;const f=g.createRadialGradient(x,y,0,x,y,220+r()*220);f.addColorStop(0,'rgba(90,70,60,.14)');f.addColorStop(1,'rgba(90,70,60,0)');g.fillStyle=f;g.fillRect(0,0,W,H);}
    g.strokeStyle='rgba(255,255,255,.4)';g.lineWidth=1.5;for(let x=-300;x<W;x+=240){g.beginPath();g.moveTo(x,0);g.lineTo(x+340,H);g.stroke();g.beginPath();g.moveTo(x+340,0);g.lineTo(x,H);g.stroke();}
    A.cloth=c; }
  MAY_A=A;return A;
}
/* the Abraj al-Bait clock tower, simplified: podium, shaft, the green clock, the spire and crescent (base at x,y) */
function may_tower(g,x,base,s){
  g.save();g.translate(x,base);g.scale(s,s);
  g.fillStyle='#2b2340';g.fillRect(-120,-80,240,80);
  g.fillStyle='rgba(255,220,160,.35)';for(let y=-72;y<-14;y+=12)for(let k=0;k<16;k++)g.fillRect(-112+k*15,y,6,6);
  g.fillStyle='#362c4c';g.fillRect(-44,-320,88,240);
  g.fillStyle='rgba(255,220,160,.3)';for(let y=-312;y<-90;y+=12)for(let k=0;k<5;k++)g.fillRect(-36+k*16,y,7,7);
  glow(g,0,-360,120,'#a8ffcf',0.55);
  g.fillStyle='#3d3450';g.fillRect(-58,-400,116,84);g.fillStyle='#17432e';g.fillRect(-50,-394,100,72);
  g.fillStyle='#d6ffe4';circle(g,0,-358,30);g.fill();
  g.strokeStyle='#17432e';g.lineWidth=4;g.lineCap='round';g.beginPath();g.moveTo(0,-358);g.lineTo(0,-380);g.moveTo(0,-358);g.lineTo(14,-350);g.stroke();
  g.fillStyle='#4a4062';g.beginPath();g.moveTo(-34,-400);g.lineTo(-16,-470);g.lineTo(16,-470);g.lineTo(34,-400);g.closePath();g.fill();
  g.fillStyle='#3a3350';g.fillRect(-4,-520,8,52);
  g.strokeStyle='#ffe29a';g.lineWidth=6;g.beginPath();g.arc(0,-536,16,Math.PI*0.25,Math.PI*1.75);g.stroke();glow(g,0,-536,60,'#ffe29a',0.8);
  g.restore();
}
/* the room at night: the city through the window, the stars breathing, the room around it */
function may_roomNight(ctx,lt,A,o={}){
  ctx.drawImage(A.city,0,0);
  stars(ctx,lt,70,504,300,0.45);
  if(o.dusk){ctx.fillStyle=vgrad(ctx,40,520,[[0,'rgba(255,140,80,.5)'],[0.5,'rgba(255,170,110,.22)'],[1,'rgba(255,200,140,0)']]);ctx.fillRect(300,40,700,480);}
  ctx.drawImage(A.room,0,0);
}
/* a little souvenir charm on a ring: 0 the Kaaba · 1 crescent and star · 2 a heart · 3 the clock tower · 4 a loop of beads */
function may_charm(g,x,y,s,kind,col){
  g.save();g.translate(x,y);g.scale(s,s);
  g.strokeStyle='#d9c58a';g.lineWidth=2.2;circle(g,0,-16,6);g.stroke();g.beginPath();g.moveTo(0,-10);g.lineTo(0,-2);g.stroke();
  if(kind===0){g.fillStyle='#1d191c';g.fillRect(-11,-2,22,22);g.fillStyle='#c9a24a';g.fillRect(-11,5,22,3);g.fillRect(4,10,5,10);}
  else if(kind===1){g.strokeStyle=col;g.lineWidth=4;g.beginPath();g.arc(0,9,10,Math.PI*0.3,Math.PI*1.7);g.stroke();g.fillStyle=col;circle(g,8,9,3);g.fill();}
  else if(kind===2){g.fillStyle=col;heart(g,0,8,11);g.fill();g.fillStyle='rgba(255,255,255,.35)';circle(g,-4,3,2.5);g.fill();}
  else if(kind===3){g.fillStyle='#4a4062';g.fillRect(-5,-2,10,24);g.fillRect(-9,14,18,8);g.fillStyle='#8fffc0';g.fillRect(-4,1,8,7);g.fillStyle='#ffe29a';circle(g,0,-5,2.5);g.fill();}
  else{g.strokeStyle=col;g.lineWidth=1.2;ell(g,0,10,9,11);g.stroke();g.fillStyle=col;for(let k=0;k<10;k++){circle(g,Math.cos(k/10*TAU)*9,10+Math.sin(k/10*TAU)*11,2.2);g.fill();}}
  g.restore();
}
/* his right hand pinching something at (x,y), seen from his side of the table: fingers curled up, the thumb across */
function may_hand(ctx,x,y,s,rot){
  ctx.save();ctx.translate(x,y);ctx.rotate(rot||0);ctx.scale(s,s);
  ctx.fillStyle=HIS.skin;ctx.beginPath();ctx.moveTo(-46,40);ctx.bezierCurveTo(-66,90,-56,180,-16,250);ctx.lineTo(76,250);ctx.bezierCurveTo(88,160,76,96,54,46);ctx.closePath();ctx.fill();
  for(let k=0;k<4;k++){const fx=-34+k*24,fy=40-Math.abs(k-1.2)*6,h=66-k*9;ctx.fillStyle=HIS.skin;rrect(ctx,fx,fy-h,22,h+34,11);ctx.fill();ctx.strokeStyle='rgba(90,55,35,.3)';ctx.lineWidth=1.4;rrect(ctx,fx,fy-h,22,h+34,11);ctx.stroke();ctx.fillStyle=HIS.nail;ell(ctx,fx+11,fy-h+9,6,5);ctx.fill();}
  ctx.fillStyle=HIS.skin;ctx.beginPath();ctx.moveTo(-44,70);ctx.bezierCurveTo(-66,36,-56,-4,-28,-22);ctx.bezierCurveTo(-12,-32,2,-24,0,-12);ctx.bezierCurveTo(-8,4,-22,44,-16,80);ctx.closePath();ctx.fill();
  ctx.fillStyle=HIS.nail;ell(ctx,-20,-16,7,5,-0.5);ctx.fill();
  ctx.fillStyle='rgba(90,55,35,.14)';ell(ctx,14,130,42,54);ctx.fill();
  ctx.restore();
}
/* looking down at his own feet on the tent carpet, the heels cracked from two hundred kilometres */
function may_feet(ctx,lt){
  for(const[fx,dir]of[[572,-1],[708,1]]){
    ctx.save();ctx.translate(fx,598+Math.sin(lt*0.9+fx)*1.5);ctx.rotate(dir*0.06);
    ctx.fillStyle='rgba(0,0,0,.18)';ell(ctx,6,10,38,90);ctx.fill();
    ctx.fillStyle=HIS.skin;ell(ctx,0,0,34,86);ctx.fill();
    ctx.fillStyle=HIS.skinSh;ell(ctx,0,66,28,24);ctx.fill();
    for(let k=0;k<5;k++){const tx=dir<0?24-k*13:-24+k*13,ty=-84+Math.abs(k-0.5)*5,rr=7.5-k*0.8;ctx.fillStyle=HIS.skin;circle(ctx,tx,ty,rr);ctx.fill();ctx.fillStyle=HIS.nail;ell(ctx,tx,ty-3,rr*0.5,2.2);ctx.fill();}
    ctx.strokeStyle='rgba(120,60,40,.55)';ctx.lineWidth=1.2;for(let k=0;k<7;k++){const a=Math.PI*0.35+k*0.1;ctx.beginPath();ctx.moveTo(Math.cos(a)*22,62+Math.sin(a)*18);ctx.lineTo(Math.cos(a)*30,66+Math.sin(a)*26);ctx.stroke();}
    ctx.fillStyle='rgba(210,185,150,.3)';ell(ctx,0,-24,22,40);ctx.fill();
    ctx.restore();
  }
}
/* a bird and a fish in thin pale line, like something drawn on the glass */
function may_bird(ctx,x,y,s,a,t){
  ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.globalAlpha=a;ctx.strokeStyle='#fff3d6';ctx.lineWidth=1.8;ctx.lineCap='round';ctx.lineJoin='round';
  const f=Math.sin(t*5)*0.5,w=-26-14*f;
  ell(ctx,0,0,22,8);ctx.stroke();
  ctx.beginPath();ctx.moveTo(22,-2);ctx.lineTo(32,0);ctx.lineTo(22,3);ctx.stroke();
  ctx.beginPath();ctx.moveTo(-22,0);ctx.lineTo(-34,-6);ctx.moveTo(-22,0);ctx.lineTo(-34,5);ctx.stroke();
  ctx.fillStyle='#fff3d6';circle(ctx,13,-3,1.6);ctx.fill();
  ctx.beginPath();ctx.moveTo(-4,-6);ctx.quadraticCurveTo(6,w,22,w-8);ctx.quadraticCurveTo(10,w*0.5,2,-2);ctx.stroke();
  ctx.beginPath();ctx.moveTo(-8,-7);ctx.quadraticCurveTo(-14,w+6,-2,w-2);ctx.stroke();
  ctx.restore();
}
function may_fish(ctx,x,y,s,a,t){
  ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.globalAlpha=a;ctx.strokeStyle='#fff3d6';ctx.lineWidth=1.8;ctx.lineCap='round';ctx.lineJoin='round';
  const sw=Math.sin(t*3)*6;
  ctx.beginPath();ctx.moveTo(26,0);ctx.quadraticCurveTo(10,-18,-18,-10);ctx.quadraticCurveTo(-30,-4,-30,0);ctx.quadraticCurveTo(-30,4,-18,10);ctx.quadraticCurveTo(10,18,26,0);ctx.closePath();ctx.stroke();
  ctx.beginPath();ctx.moveTo(-30,0);ctx.lineTo(-44,-12+sw);ctx.lineTo(-40,0);ctx.lineTo(-44,12+sw);ctx.closePath();ctx.stroke();
  ctx.beginPath();ctx.moveTo(-4,-12);ctx.quadraticCurveTo(0,-24,10,-14);ctx.stroke();
  ctx.beginPath();ctx.moveTo(0,8);ctx.quadraticCurveTo(-4,18,6,16);ctx.stroke();
  ctx.beginPath();ctx.moveTo(14,-2);ctx.quadraticCurveTo(10,0,14,3);ctx.stroke();
  ctx.fillStyle='#fff3d6';circle(ctx,18,-3,1.8);ctx.fill();
  for(let k=0;k<3;k++){ctx.beginPath();ctx.arc(-4-k*8,0,6,-0.9,0.9);ctx.stroke();}
  ctx.restore();
}
/* the phone's clock: the time of the newest visible message */
function may_clock(msgs,lt,first){let t=first;for(const m of msgs){if(m.at<=lt&&m.time)t=m.time;}return t;}
/* the chat thread, kept clear of the subtitle band: the newest bubble ends above MAY_CHAT_BOTTOM, the input bar sits at the frame's foot */
const MAY_CHAT_BOTTOM=556;
function may_chat(ctx,S,msgs,lt,o={}){
  const h2=Math.min(S.h,MAY_CHAT_BOTTOM+66-S.y),dark=o.dark!==false,iy=690;
  chatPanel(ctx,Object.assign({},S,{h:h2}),msgs,lt,o);
  ctx.save();rrect(ctx,S.x,S.y,S.w,S.h,S.r);ctx.clip();
  ctx.fillStyle=dark?'#0b141a':'#efe7dd';ctx.fillRect(S.x,S.y+h2-60,S.w,S.h-h2+60);
  ctx.fillStyle=dark?'#1f2c34':'#f0f0f0';ctx.fillRect(S.x,iy,S.w,56);
  ctx.fillStyle=dark?'#2a3942':'#ffffff';rrect(ctx,S.x+12,iy+10,S.w-70,36,18);ctx.fill();
  ctx.fillStyle=dark?'#8696a0':'#888';ctx.font='500 14px "Mulish",sans-serif';ctx.textAlign='left';ctx.fillText(o.draft||'Message',S.x+28,iy+33);
  ctx.fillStyle='#00a884';circle(ctx,S.x+S.w-30,iy+28,18);ctx.fill();ctx.fillStyle='#fff';ctx.beginPath();ctx.moveTo(S.x+S.w-37,iy+20);ctx.lineTo(S.x+S.w-21,iy+28);ctx.lineTo(S.x+S.w-37,iy+36);ctx.closePath();ctx.fill();
  ctx.restore();
}
/* Malam Jabba, for a memory: the snow set from act1 and the chairlift */
function may_snow(ctx,lt,S){
  paintSky(ctx,[[0,'#2f6fc2'],[0.45,'#9cc6ef'],[0.8,'#e8f1f8']]);sunGlow(ctx,980,120,360,'rgba(255,250,235,0.7)');
  ctx.drawImage(S.wisps,120+lt*4,30);ctx.drawImage(S.peaks.c,-120,-20);ctx.drawImage(S.mid.c,-160,70);
  ctx.fillStyle=vgrad(ctx,480,720,[[0,'#f4f7fa'],[1,'#d5e0ea']]);ctx.fillRect(0,480,W,240);
  liftLine(ctx,lt,[140,600],[1180,150],{n:9,spd:0.02,s0:1.2,s1:0.3});
  snowfall(ctx,lt,120,541,10,2,0.8);
}

/* one line made big across the frame, kept in the upper two thirds (clear of the subtitle band): a soft dark band, a rose glow, large serif, a small label above */
function may_bigLine(ctx,text,a,o={}){
  if(a<=0)return;
  const cy=o.y??250,rise=(1-a)*12;
  ctx.save();
  ctx.font='italic 500 56px "Cormorant Garamond",serif';
  /* wrap to maxW, then narrow the measure while the line count holds, so the lines come out balanced (no orphan word) */
  let mw=o.maxW||900,lines=wrapText(ctx,text,mw);
  if(lines.length>1)while(mw>320){const t=wrapText(ctx,text,mw-20);if(t.length>lines.length)break;mw-=20;lines=t;}
  const lh=64,th=lines.length*lh,top=Math.max(0,cy-th/2-80),bot=cy+th/2+84;
  ctx.globalAlpha=a;
  ctx.fillStyle=vgrad(ctx,top,bot,[[0,'rgba(8,7,16,0)'],[0.26,'rgba(8,7,16,.72)'],[0.74,'rgba(8,7,16,.72)'],[1,'rgba(8,7,16,0)']]);ctx.fillRect(0,top,W,bot-top);
  glow(ctx,640,cy,520,'#ffb3c6',0.16);
  ctx.textAlign='center';ctx.textBaseline='middle';
  if(o.label){ctx.font='600 13px "Mulish",sans-serif';setLS(ctx,'4px');ctx.fillStyle='rgba(255,199,214,.9)';ctx.fillText(o.label.toUpperCase(),640,cy+th/2+30+rise);setLS(ctx,'0px');}
  ctx.font='italic 500 56px "Cormorant Garamond",serif';ctx.shadowColor='rgba(255,170,195,.6)';ctx.shadowBlur=22;ctx.fillStyle='#fff4e8';
  for(let k=0;k<lines.length;k++)ctx.fillText(lines[k],640,cy-th/2+lh/2+k*lh+rise);
  ctx.restore();
}

/* ---------- 4 May · fish and bird — the istekhara night ---------- */
/* the first text lands at 4.0, after the opening line, and is shown big for four seconds; the rest of the thread follows from 9.0 */
const MAY_FB=[
  {at:4.0, who:'her',time:'22:22',text:'Lolll ive no idea but idts you\'ll harm me ever'},
  {at:9.0, who:'her',time:'22:32',text:'We are like fish and bird.'},
  {at:11.2,who:'her',time:'22:33',text:'Hum dono khi aur hyd ghum ghun kay pagal hojaynge'},
  {at:15.4,who:'me', time:'22:34',text:'I wont let you cry kabhi bhi'},
  {at:18.0,who:'her',time:'22:34',text:'But it would ask us to comprimise our lives but efforts toh dalni hoti hai to make anything work. Im not afraid of that.'},
  {at:21.6,who:'me', time:'22:34',text:'I’d die for you'},
  {at:27.0,who:'me', time:'23:33',text:'Lets wait for a dream'},
  {at:29.6,who:'her',time:'23:33',text:'Han lets wait'},
];
scene({id:'fishbird',name:'4 May · fish and bird',when:'2026-05-04T22:32',bars:12,fin:['#000000',1.4],fout:['#000000',1.4],
  note:'the hotel window over Makkah after Isha, the Haram a pool of white light ten kilometres off; her istekhara has come back mixed; her first text fills the frame; a bird and a fish on the glass.',
  tag:'“Lolll ive no idea but idts you\'ll harm me ever” · “We are like fish and bird.”',
  prep(){return may_assets();},
  draw(ctx,lt,A){
    may_roomNight(ctx,lt,A);
    const fb=smooth(9,11.5,lt)*(1-smooth(24.5,28,lt));
    if(fb>0){
      const bx=900+Math.sin(lt*0.5)*14,by=135+Math.sin(lt*1.3)*5,fx=385+Math.sin(lt*0.4)*8,fy=430+Math.sin(lt*0.8)*4;
      glow(ctx,bx,by,70,'#fff3d6',0.18*fb);glow(ctx,fx,fy,70,'#fff3d6',0.18*fb);
      may_bird(ctx,bx,by,1,fb*0.6,lt);may_fish(ctx,fx,fy,1,fb*0.6,lt);
    }
    /* the phone comes up into frame as her first text is typed (laid out at its resting place, then shifted) */
    const d=640*(1-easeOut((lt-1.6)/2.0));
    if(d<620){
      ctx.save();ctx.translate(0,d);
      const S=drawPhoneHand(ctx,lt,{x:475,y:120,w:330,h:700});
      may_chat(ctx,S,MAY_FB,lt,{name:'Fabeha',status:'online'});
      phoneTop(ctx,S,{time:may_clock(MAY_FB,lt,'22:22')});
      ctx.restore();
    }
    /* her first text, big: in over 0.4 s, held four seconds, out */
    const ov=smooth(4.0,4.4,lt)*(1-smooth(8.4,8.9,lt));
    if(ov>0)may_bigLine(ctx,'“'+MAY_FB[0].text+'”',ov,{y:300,label:'Fabeha · 22:22'});
  },
  subs:[
    [0.6,3.8,'4 May, Makkah. Her istekhara had come back mixed, slightly negative. We talked till past eleven.'],
    [9.4,11.2,'We are like fish and bird.','her'],
    [11.6,14.8,'Hum dono khi aur hyd ghum ghun kay pagal hojaynge','her'],
    [15.6,17.6,'I wont let you cry kabhi bhi','him'],
    [18.2,21.4,'But it would ask us to comprimise our lives but efforts toh dalni hoti hai to make anything work. Im not afraid of that.','her'],
    [21.8,23.4,'I’d die for you','him'],
    [23.8,26.6,'Fish and bird: her family and mine, two different waters. At that window it did not sound like too much to say.'],
    [27.2,29.2,'Lets wait for a dream','him'],
    [29.8,31.4,'Han lets wait','her'],
    [35.4,37.8,'Dost tou hoona, I wrote. At the end of the day. Doneee, she said.'],
  ],
  score({bars,melody,hit,THEME_B}){
    bars(0,12,['Em','Cmaj7','G','Dsus'],{strings:true,padVel:0.38});
    for(let b=3;b<7;b++)melody(b,b-3,'flute',0,0.34,THEME_B);
    for(const m of MAY_FB)hit(m.at,'tick',{hi:m.who==='her'});
    hit(4.1,'chime',{midi:83,vel:0.3});
    hit(27.0,'chime',{midi:76,vel:0.35});hit(32.0,'chime',{midi:79,vel:0.28});
  },
  amb(lt){return{room:0.3,wind:0.1};},
});

/* ---------- 11 May · forty minutes to midnight — his own telling (not in the chat): she calls, makes him wait, and sings ---------- */
/* Happy Birthday (the public-domain tune) in G for the music box: [midi, beats]; phrase three ("…dear —") starts at index 12 */
const MAY_HB=[[74,.75],[74,.25],[76,1],[74,1],[79,1],[78,2],[74,.75],[74,.25],[76,1],[74,1],[81,1],[79,2],
  [74,.75],[74,.25],[86,1],[83,1],[79,1],[78,1],[76,2],[84,.75],[84,.25],[83,1],[79,1],[81,1],[79,2]];
function may_hbNotes(t0,beat,from){const out=[];let t=t0;for(let i=from;i<MAY_HB.length;i++){out.push({t,m:MAY_HB[i][0],d:MAY_HB[i][1]*beat});t+=MAY_HB[i][1]*beat;}return out;}
const MAY_SONG=may_hbNotes(11.8,0.42,0).concat(may_hbNotes(23.6,0.46,12));   /* to "Sana" in full (11.8–22.3), then again from "dear …" to him (23.6–29.6) */
const MAY_BFLY=[[13.2,-1],[15.4,1],[17.6,-1],[20.0,1],[23.8,-1],[25.8,1],[28.0,-1],[29.6,1],[31.2,-1]];   /* [born at, drift side] */
/* the call's elapsed seconds: it rings till 2.0, then a time-lapse lands on exactly forty minutes at 11.0 (midnight), then real time */
function may_callSecs(lt){if(lt<2)return 0;if(lt<11)return (lt-2)+(2400-9)*easeIO((lt-2.8)/8.2);return 2400+(lt-11);}
const may_mss=s=>Math.floor(s/60)+':'+String(Math.floor(s%60)).padStart(2,'0');
const may_hhmm=m=>String(Math.floor(m/60)%24).padStart(2,'0')+':'+String(Math.floor(m%60)).padStart(2,'0');
/* how loud the music box (her singing) is right now, 0..1, for the rings round her picture */
function may_voice(lt){let v=0;for(const n of MAY_SONG){if(n.t>lt)break;const age=lt-n.t;if(age<1.4)v=Math.max(v,Math.exp(-age*3.2));}return v;}
/* a WhatsApp voice call, laid out to stay above the subtitle band: name and timer up top, her picture, the controls */
function may_callScreen(ctx,S,lt,o={}){
  ctx.save();rrect(ctx,S.x,S.y,S.w,S.h,S.r);ctx.clip();
  ctx.fillStyle=vgrad(ctx,S.y,S.y+S.h,[[0,'#14382f'],[0.5,'#0c241e'],[1,'#071310']]);ctx.fillRect(S.x,S.y,S.w,S.h);
  const cx=S.x+S.w/2,ay=S.y+290,v=o.voice||0;
  glow(ctx,cx,ay,230,'#2a9a72',0.22+0.3*v);
  ctx.textAlign='center';ctx.fillStyle='rgba(233,237,239,.55)';ctx.font='500 12px "Mulish",sans-serif';
  const enc='End-to-end encrypted',ew=ctx.measureText(enc).width,lx=cx+7-ew/2-12;ctx.fillText(enc,cx+7,S.y+68);
  ctx.strokeStyle='rgba(233,237,239,.55)';ctx.lineWidth=1.4;ctx.beginPath();ctx.arc(lx,S.y+59,3,Math.PI,0);ctx.stroke();ctx.fillRect(lx-4.5,S.y+59,9,7);
  ctx.fillStyle='#ffffff';ctx.font='600 30px "Mulish",sans-serif';ctx.fillText(o.name||'Fabeha',cx,S.y+112);
  ctx.fillStyle='rgba(233,237,239,.85)';ctx.font='600 18px "Mulish",sans-serif';ctx.fillText(o.ringing?'Incoming voice call':o.timer,cx,S.y+144);
  if(o.ringing){for(let k=0;k<2;k++){const u=(lt*0.9+k*0.5)%1;ctx.strokeStyle=`rgba(37,211,102,${0.55*(1-u)})`;ctx.lineWidth=2.5;circle(ctx,cx,ay,70+u*56);ctx.stroke();}}
  else if(v>0.02){for(let k=0;k<3;k++){ctx.strokeStyle=`rgba(150,240,200,${0.34*v*(1-k/3)})`;ctx.lineWidth=2;circle(ctx,cx,ay,74+k*13+v*8);ctx.stroke();}}
  /* her picture: long dark hair with a centre part, the grey sweater, small gold hoops */
  ctx.save();circle(ctx,cx,ay,66);ctx.clip();
  ctx.fillStyle=vgrad(ctx,ay-66,ay+66,[[0,'#e3c3b2'],[1,'#c99f8e']]);ctx.fillRect(cx-66,ay-66,132,132);
  ctx.fillStyle='#2a1d22';ctx.beginPath();ctx.moveTo(cx-38,ay-8);ctx.bezierCurveTo(cx-40,ay-50,cx+40,ay-50,cx+38,ay-8);ctx.lineTo(cx+46,ay+66);ctx.lineTo(cx-46,ay+66);ctx.closePath();ctx.fill();
  ctx.fillStyle='#8d919b';ell(ctx,cx,ay+78,62,34);ctx.fill();
  ctx.fillStyle='#2a1d22';ctx.fillRect(cx-40,ay+20,18,40);ctx.fillRect(cx+22,ay+20,18,40);
  ctx.fillStyle='#e6c2ab';ctx.fillRect(cx-9,ay+18,18,26);
  ctx.fillStyle='#f3d8c4';ell(ctx,cx,ay+2,25,31);ctx.fill();
  ctx.fillStyle='#2a1d22';ctx.beginPath();ctx.moveTo(cx-28,ay+8);ctx.quadraticCurveTo(cx-31,ay-31,cx,ay-31);ctx.quadraticCurveTo(cx+31,ay-31,cx+28,ay+8);ctx.quadraticCurveTo(cx+22,ay-17,cx+1.5,ay-23);ctx.lineTo(cx-1.5,ay-23);ctx.quadraticCurveTo(cx-22,ay-17,cx-28,ay+8);ctx.closePath();ctx.fill();
  ctx.strokeStyle='#e2b85c';ctx.lineWidth=1.6;circle(ctx,cx-25,ay+13,3);ctx.stroke();circle(ctx,cx+25,ay+13,3);ctx.stroke();
  ctx.restore();
  const by=S.y+432;
  if(o.ringing){
    const jig=Math.sin(lt*16)*2;
    for(const[x,col,dy,rot]of[[cx-70,'#ff3b30',0,0],[cx+70,'#25d366',jig,Math.PI*0.8]]){ctx.fillStyle=col;circle(ctx,x,by+dy,30);ctx.fill();may_handset(ctx,x,by+dy,rot);}
  }else{
    const xs=[cx-102,cx-34,cx+34,cx+102];
    for(let k=0;k<4;k++){const x=xs[k];ctx.fillStyle=k===3?'#ff3b30':'rgba(255,255,255,.14)';circle(ctx,x,by,25);ctx.fill();ctx.fillStyle='#fff';ctx.strokeStyle='#fff';ctx.lineWidth=2;
      if(k===0){ctx.fillRect(x-9,by-4,5,8);ctx.beginPath();ctx.moveTo(x-4,by-4);ctx.lineTo(x+2,by-9);ctx.lineTo(x+2,by+9);ctx.lineTo(x-4,by+4);ctx.closePath();ctx.fill();ctx.beginPath();ctx.arc(x+4,by,5,-0.9,0.9);ctx.stroke();ctx.beginPath();ctx.arc(x+4,by,9,-0.9,0.9);ctx.stroke();}
      else if(k===1){rrect(ctx,x-10,by-6,14,12,3);ctx.fill();ctx.beginPath();ctx.moveTo(x+5,by-1);ctx.lineTo(x+11,by-6);ctx.lineTo(x+11,by+6);ctx.lineTo(x+5,by+1);ctx.closePath();ctx.fill();}
      else if(k===2){rrect(ctx,x-4,by-11,8,14,4);ctx.fill();ctx.beginPath();ctx.arc(x,by-1,8,0.15*Math.PI,0.85*Math.PI);ctx.stroke();ctx.beginPath();ctx.moveTo(x,by+7);ctx.lineTo(x,by+11);ctx.stroke();}
      else may_handset(ctx,x,by,0);}
  }
  ctx.restore();
}
/* a white telephone handset, lying down (rot 0: hung up, as on the red button) */
function may_handset(ctx,x,y,rot){
  ctx.save();ctx.translate(x,y);ctx.rotate(rot);ctx.strokeStyle='#fff';ctx.fillStyle='#fff';ctx.lineWidth=5;ctx.lineCap='round';
  ctx.beginPath();ctx.moveTo(-10,1);ctx.quadraticCurveTo(0,-8,10,1);ctx.stroke();
  rrect(ctx,-15,0,9,6,2.5);ctx.fill();rrect(ctx,6,0,9,6,2.5);ctx.fill();
  ctx.restore();
}
/* painted butterfly wings (one half, the body axis at x 2, y 47), pale gold and rose, built once */
function may_bflySprites(){
  const out=[];
  for(const[c1,c2]of[['#f6e2b0','#dcae5e'],['#f8d6de','#de94ab']]){
    const c=mk(70,92),g=c.getContext('2d');
    const up=new Path2D();up.moveTo(2,44);up.bezierCurveTo(10,10,46,-2,62,10);up.bezierCurveTo(70,22,52,42,4,48);up.closePath();
    const lo=new Path2D();lo.moveTo(3,48);lo.bezierCurveTo(30,50,46,70,36,82);lo.bezierCurveTo(24,90,8,72,2,52);lo.closePath();
    for(const p of[lo,up]){const gr=g.createRadialGradient(4,46,2,4,46,68);gr.addColorStop(0,hexA(c2,0.95));gr.addColorStop(0.55,hexA(c1,0.9));gr.addColorStop(1,hexA('#fffaf0',0.78));g.fillStyle=gr;g.fill(p);}
    g.strokeStyle=hexA(c2,0.45);g.lineWidth=0.8;for(const[ex,ey]of[[58,12],[50,30],[34,40],[30,74],[40,64]]){g.beginPath();g.moveTo(4,47);g.quadraticCurveTo((4+ex)/2,(47+ey)/2-4,ex,ey);g.stroke();}
    g.fillStyle='rgba(255,252,240,.85)';for(const[dx,dy]of[[56,15],[60,23],[49,35],[33,78],[40,70]]){circle(g,dx,dy,1.6);g.fill();}
    g.strokeStyle=hexA(c2,0.6);g.lineWidth=1.2;g.stroke(up);g.stroke(lo);
    out.push(softened(c,0.7));
  }
  return out;
}
/* one butterfly at (x,y): ph flaps the wings (they fold toward the body), rot tilts it, a its alpha */
function may_butterfly(ctx,spr,x,y,s,ph,rot,a){
  if(a<=0.01)return;
  const f=0.32+0.68*Math.abs(Math.cos(ph));
  ctx.save();ctx.globalAlpha*=a;
  glow(ctx,x,y,48*s,'#fff0cc',0.3);
  ctx.translate(x,y);ctx.rotate(rot);
  ctx.save();ctx.scale(s*f,s);ctx.drawImage(spr,-2,-47);ctx.restore();
  ctx.save();ctx.scale(-s*f,s);ctx.drawImage(spr,-2,-47);ctx.restore();
  ctx.fillStyle='rgba(92,62,52,.9)';ell(ctx,0,2*s,2.4*s,14*s);ctx.fill();
  ctx.strokeStyle='rgba(92,62,52,.7)';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(-1,-11*s);ctx.quadraticCurveTo(-5*s,-20*s,-8*s,-25*s);ctx.moveTo(1,-11*s);ctx.quadraticCurveTo(5*s,-20*s,8*s,-25*s);ctx.stroke();
  ctx.restore();
}
/* the time, large and soft on the dark wall right of the window (a time-lapse readout of the phone's clock) */
function may_wallClock(ctx,hhmm,date,a,gold){
  ctx.save();ctx.globalAlpha=a;ctx.textAlign='center';
  if(gold>0)glow(ctx,1158,150,160,'#ffd88a',0.3*gold);
  ctx.fillStyle=mixHex('#e6e1ee','#ffe2a6',gold);ctx.font='400 60px "Mulish",sans-serif';ctx.fillText(hhmm,1158,172);
  ctx.font='600 12px "Mulish",sans-serif';setLS(ctx,'3px');ctx.fillStyle=gold>0.5?'rgba(255,226,166,.9)':'rgba(201,191,214,.8)';ctx.fillText(date,1158,200);
  ctx.restore();
}
scene({id:'bdaycall',name:'11 May · happy birthday dear Sana',when:'2026-05-11T01:20',bars:11,fin:['#000000',1.2],fout:['#000000',1.4],
  note:'the hotel room in Makkah, forty minutes to midnight; she calls and keeps him waiting on the line while the timer runs to 40:00; at twelve she sings happy birthday to “Sana”, then again to him; butterflies rise from the phone.',
  tag:'11 May, 00:00 in Makkah · his own telling',
  prep(){return Object.assign({bf:may_bflySprites()},may_assets());},
  draw(ctx,lt,A){
    const secs=may_callSecs(lt),mins=23*60+20+secs/60,v=may_voice(lt);
    may_roomNight(ctx,lt+secs/120,A);   /* the stars hurry while the time-lapse runs */
    const S=drawPhoneHand(ctx,lt,{x:475,y:120,w:330,h:700});
    may_callScreen(ctx,S,lt,{ringing:lt<2,timer:may_mss(secs),voice:v});
    phoneTop(ctx,S,{time:may_hhmm(mins)});
    glow(ctx,S.x+S.w/2,S.y+300,520,'#3fcf9a',0.05+0.07*v);
    const ca=smooth(1.0,2.2,lt)*(1-smooth(15,17,lt)),gold=smooth(10.9,11.4,lt)*(1-smooth(14,16.5,lt));
    if(ca>0)may_wallClock(ctx,may_hhmm(mins),mins>=1440?'11 MAY · MAKKAH':'10 MAY · MAKKAH',ca,gold);
    /* butterflies out of her picture on the screen, drifting up past the phone into the room */
    const cx=S.x+S.w/2,ay=S.y+290;
    for(let i=0;i<MAY_BFLY.length;i++){
      const[t0,dir]=MAY_BFLY[i],age=lt-t0;if(age<0||age>7)continue;
      const s=(0.8+0.3*((i*37)%10)/10)*lerp(0.4,1,smooth(0,0.8,age));
      const x=cx+dir*(24+age*46)+Math.sin(age*1.4+i)*26,y=ay-10-(50*age+5*age*age);
      const a=smooth(0,0.7,age)*(1-smooth(4.8,6.6,age));
      may_butterfly(ctx,A.bf[i%2],x,y,s,age*6.5+i,dir*0.22*Math.cos(age*1.4+i),a);
    }
  },
  subs:[
    [0.6,4.4,'11 May, my birthday, in Makkah. She called forty minutes before midnight.'],
    [4.8,8.6,'And then she made me wait. On the call, till midnight.'],
    [12.0,19.8,'♪ Happy birthday to you… happy birthday dear Sana… ♪','her'],
    [20.2,23.2,'Sana. Not my name. Mom had walked in.'],
    [23.8,28.4,'♪ Happy birthday dear Fazul… ♪','her'],
    [29.0,33.2,'She made me so happy that day. Only butterflies.'],
  ],
  score({bars,pad,melody,hit,at,T,THEME}){
    /* the wait: a quiet music box over soft pads, a low buzz as she rings */
    bars(0,3,['G','Em7','Cmaj7'],{padVel:0.26});pad(T(3),'Dsus',0.55,0.24);
    for(let b=0;b<3;b++)melody(b,b,'box',12,0.2,THEME);
    hit(0.2,'ring');hit(1.1,'ring');
    hit(11.0,'chime',{midi:79,vel:0.32});hit(11.25,'chime',{midi:86,vel:0.22});
    /* her singing: the tune on the music box, low, with soft chords under it */
    for(const n of MAY_SONG)hit(n.t,'box',{midi:n.m,dur:n.d,vel:0.34});
    for(const[t,c,d]of[[11.8,'G',2.52],[14.32,'D',2.52],[16.84,'Cadd9',2.94],[19.78,'G',2.6],[23.6,'Cadd9',3.22],[26.82,'G',2.9]])pad(at(t),c,d/3.333,0.24);
    pad(at(29.7),'Gmaj7',1.25,0.3,'strings');pad(at(33.8),'Cmaj7',0.9,0.24,'strings');
    /* a chime for each butterfly */
    const cm=[86,91,88,93,86,91,88,95,91];for(let i=0;i<MAY_BFLY.length;i++)hit(MAY_BFLY[i][0],'chime',{midi:cm[i],vel:0.16});
  },
  amb(lt){return{room:0.24,crowd:0.06};},
});

/* ---------- 11 May · his birthday at midnight, Makkah time ---------- */
const MAY_BDAY_TEXT='Happy birthday to the man in the shining armour. May Allah bless you with all of the righteous things you desire. May you get success at every step of your way in life. May Allah accept your hajj, and may he forgive all your sins. May you always stay this happy and positive. \nAmeen. May your life be filled with barakah, and may every dawn bring you closer to Jannah. Keep shining, and know that you are deeply loved and cherished.And how could we forget? Your generosity knows no bounds. May the Most Generous Lord repay you abundantly for every open hand and warm heart you\'ve shown. Happy birthday once again.';
const MAY_BDAY=[
  {at:5.0, who:'her',time:'00:59',text:'Call ao'},
  {at:8.0, who:'her',time:'02:01',text:MAY_BDAY_TEXT},
  {at:17.6,who:'me', time:'02:53',text:'🥺🥺🥺 it seriously means the world to me'},
  {at:19.6,who:'me', time:'02:55',text:'Thankyouuuu yr'},
  {at:24.6,who:'me', time:'03:11',text:'Where is my present'},
  {at:25.2,who:'me', time:'03:11',text:'👉👈'},
  {at:26.6,who:'her',time:'03:11',text:'Akar lelena'},
  {at:28.6,who:'her',time:'03:12',text:'Present ko isliye present boltsy hzin bro'},
];
scene({id:'bday11',name:'11 May · the man in the shining armour',when:'2026-05-11T02:01',bars:10,fin:['#000000',1.2],fout:['#000000',1.4],
  note:'Makkah from a high balcony at midnight, his time; the dark phone lights up with her birthday message; the present must be collected in person.',
  tag:'“Keep shining, and know that you are deeply loved and cherished.” · “Akar lelena”',
  prep(){return may_assets();},
  draw(ctx,lt,A){
    ctx.drawImage(A.city,-150,-210,W*1.24,H*1.24);
    stars(ctx,lt,80,506,160,0.5);
    ctx.fillStyle='#120f18';ctx.fillRect(0,556,W,12);for(let x=30;x<W;x+=72)ctx.fillRect(x,566,6,160);ctx.fillRect(0,700,W,20);
    ctx.fillStyle='rgba(255,200,140,.08)';ctx.fillRect(0,0,W,H);
    const lit=lt>=5;
    const S=drawPhoneHand(ctx,lt,{x:475,y:120,w:330,h:700,screen:lit?undefined:'#07070c'});
    if(!lit){ctx.save();rrect(ctx,S.x,S.y,S.w,S.h,S.r);ctx.clip();ctx.globalAlpha=0.09;ctx.drawImage(A.city,S.x-260,S.y-60,W*0.9,H*0.9);ctx.restore();return;}
    if(lt<15.6){
      may_chat(ctx,S,MAY_BDAY.filter(m=>m.at<8),lt,{name:'Fabeha',status:'online'});
      if(lt>=8){
        ctx.save();rrect(ctx,S.x,S.y,S.w,S.h,S.r);ctx.clip();
        const hy=S.y+36,hh=58,top=hy+hh+10,bottom=MAY_CHAT_BOTTOM-6;
        ctx.font='500 15px "Mulish",sans-serif';const maxW=S.w*0.74,pad=10,lh=19,lines=wrapText(ctx,MAY_BDAY_TEXT,maxW-pad*2);
        const bw=maxW+6,bh=lines.length*lh+pad*2+10,bx=S.x+14,by=lerp(top,bottom-bh,smooth(9.6,15.4,lt)),pop=backOut(clamp((lt-8)/0.28));
        ctx.beginPath();ctx.rect(S.x,hy+hh,S.w,S.h);ctx.clip();
        ctx.translate(bx,by+bh);ctx.scale(pop,pop);ctx.translate(-bx,-(by+bh));
        ctx.fillStyle='#202c33';rrect(ctx,bx,by,bw,bh,12);ctx.fill();
        ctx.fillStyle='#e9edef';ctx.textAlign='left';for(let k=0;k<lines.length;k++)ctx.fillText(lines[k],bx+pad,by+pad+14+k*lh);
        ctx.fillStyle='rgba(233,237,239,.55)';ctx.font='500 11px "Mulish",sans-serif';ctx.textAlign='right';ctx.fillText('02:01',bx+bw-8,by+bh-7);
        ctx.restore();
      }
    }else may_chat(ctx,S,MAY_BDAY,lt,{name:'Fabeha',status:'online'});
    phoneTop(ctx,S,{time:may_clock(MAY_BDAY,lt,'00:59')});
    const g=smooth(5,5.6,lt)*0.5+smooth(8,8.6,lt)*(1-smooth(12,15,lt));if(g>0)glow(ctx,S.x+S.w/2,S.y+S.h*0.45,480,'#9fd3f2',0.2*g);
  },
  subs:[
    [0.6,4.4,'Then, one minute past midnight in Makkah, my timezone, not hers, her message came.'],
    [5.2,7.2,'Call ao','her'],
    [8.4,11.6,'Happy birthday to the man in the shining armour. May Allah bless you with all of the righteous things you desire.','her'],
    [11.9,14.3,'May Allah accept your hajj, and may he forgive all your sins.','her'],
    [14.6,17.4,'Keep shining, and know that you are deeply loved and cherished.','her'],
    [17.8,19.6,'🥺🥺🥺 it seriously means the world to me','him'],
    [20.0,21.6,'Thankyouuuu yr','him'],
    [22.0,24.2,'A birthday boy has one question.'],
    [24.8,25.9,'Where is my present','him'],
    [26.0,26.6,'👉👈','him'],
    [26.8,28.4,'Akar lelena','her'],
    [28.8,31.0,'Present ko isliye present boltsy hzin bro','her'],
    [31.3,33.0,'She told me not to sleep through tahajjud. I said I wouldn’t. I did.'],
  ],
  score({bars,melody,hit,THEME}){
    bars(0,10,['G','Em7','Cmaj7','D'],{strings:true,padVel:0.4});
    for(let b=3;b<7;b++)melody(b,b-3,'flute',0,0.36,THEME);
    for(let b=7;b<9;b++)melody(b,b-3,'box',12,0.3,THEME);
    for(const m of MAY_BDAY)hit(m.at,'tick',{hi:m.who==='her'});
    hit(8.0,'chime',{midi:79,vel:0.4});hit(8.3,'chime',{midi:83,vel:0.3});
  },
  amb(lt){return{room:0.22,wind:0.16};},
});

/* ---------- 16 May · "You felt home to me" — the grad trip, told by its own two strangers ---------- */
const MAY_HOME=[
  {at:0.0, who:'me', time:'01:22',text:'😭😭😭 poori grad trip stranger raahiii ap'},
  {at:2.0, who:'her',time:'01:22',text:'Nhi nhu akhrin din we talkef'},
  {at:14.5,who:'me', time:'01:30',text:'You felt home to me for some reason'},
  {at:17.0,who:'her',time:'01:30',text:'Reallyy??? Damnnn'},
  {at:19.4,who:'me', time:'01:40',text:'Vibe match'},
  {at:21.2,who:'her',time:'01:40',text:'Han vibe toh match thi'},
  {at:22.4,who:'her',time:'01:40',text:'Not gonna deny it'},
  {at:24.6,who:'me', time:'01:44',text:'🙏🏻🙏🏻🙏🏻😭 mujhe ap kaise milli ho bhaee'},
  {at:25.8,who:'me', time:'01:44',text:'Is this a dream'},
  {at:27.8,who:'her',time:'01:45',text:'Pinch karunnn 🤣🤣🤣'},
  {at:28.8,who:'her',time:'01:45',text:'🥹🥹🥹🥹🥹🥹'},
  {at:31.4,who:'her',time:'02:11',text:'Bro my hands are tied'},
  {at:32.2,who:'her',time:'02:11',text:'Cant break her promise'},
  {at:34.6,who:'me', time:'02:13',text:'Tou you are meeting business partner'},
  {at:36.6,who:'her',time:'02:13',text:'Han i thibk that would make sense'},
];
scene({id:'home',name:'16 May · you felt home to me',when:'2026-05-16T01:22',bars:12,fin:['#000000',1.2],fout:['#000000',1.4],
  note:'past one in the hotel room, going back over the grad trip; Malam Jabba comes through the window for a moment — the chairlift, seat seven and seat forty-five; then “business partner”, the cover story for meeting after Hajj.',
  tag:'“You felt home to me for some reason” · “Pinch karunnn 🤣🤣🤣”',
  prep(){return Object.assign({S:snowset()},may_assets());},
  draw(ctx,lt,A){
    const snow=smooth(3.6,4.4,lt)*(1-smooth(13.6,14.4,lt));
    if(snow<1){
      may_roomNight(ctx,lt,A);
      const S=drawPhoneHand(ctx,lt,{x:475,y:120,w:330,h:700});
      may_chat(ctx,S,MAY_HOME,lt,{name:'Fabeha',status:'online'});
      phoneTop(ctx,S,{time:may_clock(MAY_HOME,lt,'01:22')});
    }
    if(snow>0){ctx.save();ctx.globalAlpha=snow;may_snow(ctx,lt,A.S);ctx.restore();}
    const fl=Math.max(smooth(3.4,3.9,lt)*(1-smooth(3.9,4.9,lt)),smooth(13.4,13.9,lt)*(1-smooth(13.9,14.9,lt)));
    if(fl>0){ctx.fillStyle=`rgba(255,255,255,${fl*0.92})`;ctx.fillRect(0,0,W,H);}
  },
  subs:[
    [0.5,2.2,'😭😭😭 poori grad trip stranger raahiii ap','him'],
    [2.4,3.9,'Nhi nhu akhrin din we talkef','her'],
    [4.6,6.8,'Malam jabba pe 7 number tha','him'],
    [7.0,8.6,'45 ke baad gaya','him'],
    [8.8,10.6,'Ap akele boat pe chali gyi','him'],
    [10.8,13.4,'I wanted to be with you uss waqt','him'],
    [14.7,16.8,'You felt home to me for some reason','him'],
    [17.2,18.8,'Reallyy??? Damnnn','her'],
    [19.6,21.0,'Vibe match','him'],
    [21.4,22.3,'Han vibe toh match thi','her'],
    [22.5,24.2,'Not gonna deny it','her'],
    [24.8,25.9,'🙏🏻🙏🏻🙏🏻😭 mujhe ap kaise milli ho bhaee','him'],
    [26.1,27.6,'Is this a dream','him'],
    [28.0,30.4,'Pinch karunnn 🤣🤣🤣','her'],
    [30.9,34.3,'Then the real question: campus was over, and she had made her mother a promise she would not break. So I found us a loophole.'],
    [34.8,36.4,'Tou you are meeting business partner','him'],
    [36.8,38.3,'Han i thibk that would make sense','her'],
    [38.5,39.6,'Partners, then.'],
  ],
  score({bars,melody,hit,THEME_B,THEME_B_CH}){
    bars(0,12,THEME_B_CH,{strings:true,padVel:0.38});
    for(let b=1;b<5;b++)melody(b,b-1,'box',12,0.42,THEME_B);
    for(let b=5;b<9;b++)melody(b,b-1,'flute',0,0.3,THEME_B);
    hit(3.5,'swell',{dur:1.2});hit(13.5,'swell',{dur:1.2});
    hit(14.5,'chime',{midi:76,vel:0.36});
    for(const m of MAY_HOME)hit(m.at,'tick',{hi:m.who==='her'});
  },
  amb(lt){const s=smooth(3.6,4.4,lt)*(1-smooth(13.6,14.4,lt));return{room:0.3*(1-s),wind:0.1+0.5*s};},
});

/* ---------- 18 May · the Kaaba dream, and "to the core" ---------- */
const MAY_KB=[
  {at:16.8,who:'her',time:'01:10',text:'It\'s  a good dream wese'},
  {at:18.6,who:'her',time:'01:11',text:'It does mean Allah\'s spiritual blessings'},
  {at:21.0,who:'me', time:'01:12',text:'Allah Malik hai'},
  {at:22.2,who:'me', time:'01:12',text:'Wo sahi rasta dekhayege and best of the best karege'},
  {at:25.4,who:'me', time:'01:35',text:'Best of the best!!! Paper dena'},
  {at:27.6,who:'me', time:'01:35',text:'I love you to the core!'},
  {at:30.0,who:'her',time:'01:35',text:'🥹🥹🥹🥹🥹'},
  {at:32.0,who:'me', time:'01:36',text:'This on is glad i have you'},
  {at:33.6,who:'her',time:'01:36',text:'Aray ye wala emo wala hai ehen one is feeling happy'},
  {at:34.6,who:'her',time:'01:36',text:'And grateful'},
];

/* ---------- 21 May · the keychains ---------- */
const MAY_KC_COLS=['#c9a24a','#2f7a4a','#b4472f','#3f63a8','#e2b86a'];
function may_kcTile(ctx,px,py,tile,k){
  ctx.fillStyle=vgrad(ctx,py,py+tile,[[0,'#efe6d6'],[1,'#d6c8b2']]);ctx.fillRect(px,py,tile,tile);
  const r=rng(570+k);for(let i=0;i<3;i++)may_charm(ctx,px+tile*(0.25+i*0.25),py+tile*(0.3+(i%2)*0.22),tile/54,(k+i)%5,MAY_KC_COLS[(k*2+i)%5]);
  ctx.fillStyle='rgba(0,0,0,.4)';circle(ctx,px+tile/2,py+tile/2,16);ctx.fill();ctx.fillStyle='#fff';ctx.beginPath();ctx.moveTo(px+tile/2-5,py+tile/2-8);ctx.lineTo(px+tile/2+8,py+tile/2);ctx.lineTo(px+tile/2-5,py+tile/2+8);ctx.closePath();ctx.fill();
  ctx.fillStyle='rgba(0,0,0,.45)';rrect(ctx,px+6,py+tile-20,36,14,4);ctx.fill();ctx.fillStyle='#fff';ctx.font='600 10px "Mulish",sans-serif';ctx.textAlign='left';ctx.fillText('0:0'+(4+k),px+11,py+tile-9);ctx.font='500 15px "Mulish",sans-serif';
}
const MAY_KC=[
  {at:10.0,who:'me', time:'02:12',text:'Eraser ki collection'},
  {at:10.8,who:'me', time:'02:13',text:'Abhi bhi karahi ap?'},
  {at:13.2,who:'her',time:'08:33',text:'Keychain ki'},
  {at:14.8,who:'me', time:'08:33',text:'Yess i bought'},
  {at:15.6,who:'me', time:'08:33',text:'Kaafi cute for you'},
  {at:17.4,who:'her',time:'08:33',text:'Ayye tyyyy'},
  {at:19.2,who:'me', time:'08:34',photos:4,paint:may_kcTile},
  {at:22.6,who:'her',time:'08:34',text:'These are so prettyyy 😍😍😍😍😍😍😍😍😍😍😍😍😍😍😍😍😍😍😍😍😍😍😍😍😍'},
  {at:25.4,who:'me', time:'08:35',text:'Glad you liked them'},
  {at:26.8,who:'her',time:'08:35',text:'Yeppp 🥰🥰'},
  {at:30.4,who:'her',time:'22:16',text:'Vn bhedun?'},
  {at:31.0,who:'her',time:'22:16',text:'Ap sun sakogay?'},
  {at:31.8,who:'me', time:'22:16',text:'Bhejdo'},
  {at:33.0,who:'her',time:'22:17',text:'🎤  voice note · 0:43'},
  {at:35.0,who:'me', time:'22:18',text:'Kam awaz mein suna hai'},
];

/* ---------- 24 May · a tasbeeh for Arafat, from her nanu; the eve of Hajj ---------- */
function may_kalmaTile(ctx,px,py,tile){
  ctx.fillStyle='#f6f1e4';ctx.fillRect(px,py,tile,tile);
  ctx.strokeStyle='#3a3a44';ctx.lineWidth=1.6;ctx.lineCap='round';const r=rng(591);
  for(let y=py+16;y<py+tile-10;y+=14){let x=px+tile-10;while(x>px+14){const l=8+r()*22;ctx.beginPath();ctx.moveTo(x,y);ctx.bezierCurveTo(x-l*0.3,y-5,x-l*0.6,y+5,x-l,y);ctx.stroke();if(r()<0.5){ctx.fillStyle='#3a3a44';circle(ctx,x-l*0.5,y-5,1.2);ctx.fill();}x-=l+5;}}
}
const MAY_TS=[
  {at:0.0, who:'me', time:'18:02',text:'Can you send us tasbihi'},
  {at:0.8, who:'me', time:'18:02',text:'For arafat?'},
  {at:3.6, who:'her',time:'18:14',text:'Bro mujhe dua ka nhi pata let me ask my nanu or amma'},
  {at:7.0, who:'her',time:'18:18',photos:1,paint:may_kalmaTile},
  {at:7.8, who:'her',time:'18:18',text:'Teesra kalma'},
  {at:8.8, who:'her',time:'18:18',text:'Chotha kalma'},
  {at:9.6, who:'her',time:'18:18',text:'Durood shareef'},
  {at:12.4,who:'me', time:'18:21',text:'Tasbeehi tyar kraha'},
  {at:14.6,who:'me', time:'18:24',text:'Ill be totally disconnected'},
  {at:15.4,who:'me', time:'18:24',text:'After isha'},
  {at:18.4,who:'her',time:'21:12',text:'May Allah accept your hajj ameen'},
  {at:20.6,who:'her',time:'21:18',text:'Also rem me in your duas pls  👉👈'},
  {at:22.6,who:'her',time:'21:30',text:'Sending virtual hugs'},
  {at:25.6,who:'her',time:'23:48',text:'You\'re in ahram now?'},
  {at:27.6,who:'me', time:'00:46',text:'Han'},
];
scene({id:'tasbeeh',name:'24 May · a tasbeeh for Arafat',when:'2026-05-24T18:02',bars:9,fin:['#000000',1.2],fout:['#ffffff',1.2],   /* white out: the phone goes dark, then the glare of Arafat */
  note:'the eve of Hajj, the window going from afternoon to night, two white cloths folded on the bed; he asks her for something to recite on Arafat and her nanu sends the kalmas; after Isha the phone goes dark for three days.',
  tag:'“Teesra kalma · Chotha kalma · Durood shareef” · “Also rem me in your duas pls 👉👈”',
  prep(){return may_assets();},
  draw(ctx,lt,A){
    /* 18:02 on her clock is four in the afternoon in Makkah: hot daylight at the window, then dusk, then night by the time the bus comes */
    const day=1-smooth(13,20,lt),dusk=smooth(12,17,lt)*(1-smooth(19,25,lt));
    ctx.drawImage(A.city,0,0);
    if(day>0){ctx.save();ctx.globalAlpha=0.9*day;ctx.fillStyle=vgrad(ctx,40,520,[[0,'#a9c8e6'],[0.55,'#dfe0d8'],[0.8,'#efe2c6'],[1,'#e8d2ae']]);ctx.fillRect(300,40,700,480);ctx.globalAlpha=0.35*day;may_tower(ctx,900,470,0.42);ctx.restore();}
    if(dusk>0){ctx.save();ctx.globalAlpha=dusk;ctx.fillStyle=vgrad(ctx,40,520,[[0,'rgba(255,140,80,.6)'],[0.5,'rgba(255,170,110,.3)'],[1,'rgba(255,200,140,0)']]);ctx.fillRect(300,40,700,480);ctx.restore();}
    stars(ctx,lt,70,504,300,0.45*(1-day));
    ctx.drawImage(A.room,0,0);
    if(day>0){ctx.fillStyle=`rgba(230,215,190,${0.22*day})`;ctx.fillRect(0,0,W,H);}
    for(const[x,y]of[[120,620],[250,650]]){ctx.fillStyle='rgba(0,0,0,.18)';ell(ctx,x+8,y+34,78,16);ctx.fill();ctx.fillStyle='#f4f1ea';rrect(ctx,x-70,y-10,140,46,10);ctx.fill();ctx.fillStyle='#e2ddd2';rrect(ctx,x-70,y+8,140,8,3);ctx.fill();ctx.fillStyle='#faf8f3';rrect(ctx,x-64,y-18,128,14,6);ctx.fill();}
    const S=drawPhoneHand(ctx,lt,{x:475,y:120,w:330,h:700});
    may_chat(ctx,S,MAY_TS,lt,{name:'Fabeha',status:lt<25?'online':'last seen today at 23:48'});
    phoneTop(ctx,S,{time:may_clock(MAY_TS,lt,'18:02')});
    const off=smooth(27.6,28.6,lt);if(off>0){ctx.save();rrect(ctx,S.x,S.y,S.w,S.h,S.r);ctx.clip();ctx.fillStyle=`rgba(5,5,8,${off})`;ctx.fillRect(S.x,S.y,S.w,S.h);ctx.restore();}
  },
  subs:[
    [0.5,3.4,'24 May, the eve of Hajj. I asked her for something to recite on Arafat.'],
    [3.8,6.6,'Bro mujhe dua ka nhi pata let me ask my nanu or amma','her'],
    [7.2,10.6,'Her nanu read them out to her: the third kalma, the fourth, durood shareef.'],
    [12.6,14.2,'Tasbeehi tyar kraha','him'],
    [14.8,16.0,'Ill be totally disconnected','him'],
    [16.2,17.6,'After isha','him'],
    [18.6,20.2,'May Allah accept your hajj ameen','her'],
    [20.8,22.4,'Also rem me in your duas pls  👉👈','her'],
    [22.8,24.2,'Sending virtual hugs','her'],
    [24.5,27.4,'The bus to Mina came after midnight. Her last question reached me already in ihram.'],
    [27.8,29.2,'Han','him'],
  ],
  score({bars,melody,hit,THEME_B}){
    bars(0,8,['Em','Cmaj7','Am7','Dsus'],{strings:true,padVel:0.36});
    for(let b=1;b<5;b++)melody(b,b-1,'flute',0,0.3,THEME_B);
    bars(8,1,['Em'],{padVel:0.2});
    for(const m of MAY_TS)hit(m.at,'tick',{hi:m.who==='her'});
    hit(12.4,'chime',{midi:71,vel:0.3});
  },
  amb(lt){return{room:0.3,wind:0.08};},
});

/* ---------- 26 May · Arafat: half past one on the plain, the sun straight ahead, his hands up ---------- */
let MAY_AR=null;
/* a pilgrim far off: white ihram, a dark head; now and then an umbrella, now and then a black abaya */
function may_pilgrim(g,x,y,s,k){
  g.save();g.translate(x,y);g.scale(s,s);
  const kind=k%23,dark=kind===5;
  g.fillStyle=dark?'#2a2528':'#f7f3ea';g.beginPath();g.moveTo(-8,-30);g.lineTo(8,-30);g.lineTo(11,2);g.lineTo(-11,2);g.closePath();g.fill();
  if(!dark){g.fillStyle='rgba(120,100,80,.22)';g.fillRect(-8,-30,4,32);}
  g.fillStyle=dark?'#2a2528':'#c99a74';ell(g,0,-36,6,7);g.fill();
  if(kind===3||kind===11||kind===17){g.fillStyle=kind===11?'#2f7a4a':kind===17?'#3f63a8':'#f6f1e4';g.beginPath();g.arc(0,-46,15,Math.PI,0);g.closePath();g.fill();g.fillStyle='rgba(0,0,0,.15)';g.fillRect(-15,-47,30,2);}
  g.restore();
}
/* a rubber slipper set aside on the ground: the sole, the lighter footbed, the thong */
function may_slipper(g,x,y,rot){
  g.save();g.translate(x,y);g.rotate(rot);
  g.fillStyle='rgba(0,0,0,.2)';ell(g,4,8,36,78);g.fill();
  g.fillStyle='#3a2a20';ell(g,0,0,34,76);g.fill();
  g.fillStyle='#6b4a36';ell(g,0,-2,28,68);g.fill();
  g.fillStyle='rgba(255,230,200,.12)';ell(g,-6,-30,14,26);g.fill();
  g.strokeStyle='#241812';g.lineWidth=5;g.lineCap='round';g.beginPath();g.moveTo(6,-40);g.lineTo(-20,-6);g.moveTo(6,-40);g.lineTo(24,-2);g.stroke();
  g.fillStyle='#241812';circle(g,6,-40,4);g.fill();
  g.restore();
}
function may_arafat(){
  if(MAY_AR)return MAY_AR;
  const A={},HZ=432;A.HZ=HZ;
  /* beyond the horizon: the plain, Jabal al-Rahmah in the haze, the far white tents, the crowd in white; the sky is left clear for the sun */
  { const c=mk(W,H),g=c.getContext('2d'),r=rng(601);
    g.fillStyle=vgrad(g,HZ,H,[[0,'#e4d4b6'],[0.3,'#d4bd98'],[1,'#c2a278']]);g.fillRect(0,HZ,W,H-HZ);
    for(let i=0;i<160;i++){const u=Math.pow(r(),1.3),y=HZ+u*(H-HZ),x=r()*W;g.globalAlpha=0.05+r()*0.08;g.fillStyle=r()<0.5?'#b58f62':'#efe0c4';ell(g,x,y,30+u*120,3+u*12);g.fill();}g.globalAlpha=1;
    /* the hill: a low round back right of centre, people on it like salt, the pillar on top */
    const hillY=x=>{const u=clamp((x-640)/580);return HZ-66*Math.pow(Math.sin(Math.PI*u),1.3)-4*Math.sin(u*31)*Math.sin(Math.PI*u);};
    const hill=()=>{g.beginPath();g.moveTo(640,HZ+2);for(let x=640;x<=1220;x+=6)g.lineTo(x,hillY(x));g.lineTo(1220,HZ+2);g.closePath();};
    g.fillStyle='#cdb597';hill();g.fill();
    g.save();hill();g.clip();
    for(let i=0;i<80;i++){const x=660+r()*540,y=hillY(x)+r()*(HZ-hillY(x));g.globalAlpha=0.1+r()*0.16;g.fillStyle=r()<0.5?'#a98a66':'#e6d6b8';ell(g,x,y,8+r()*30,2+r()*6);g.fill();}
    g.globalAlpha=1;g.fillStyle='#fbf8f0';for(let i=0;i<420;i++){const x=700+r()*460,top=hillY(x),y=top+Math.pow(r(),0.8)*(HZ-top);g.fillRect(x,y,1.4,2);}
    g.restore();
    g.fillStyle='#fbf8f0';g.fillRect(928,hillY(930)-16,4,16);
    /* the tents: three rows along the horizon, the nearer ones a little bigger; a few big ones at the left edge */
    for(const[y,s,gap]of[[HZ-4,5,7],[HZ+3,7,9],[HZ+11,9,12]]){for(let x=-10;x<W+10;x+=gap+r()*gap*0.6){if(r()<0.18)continue;const w=s+r()*2,h=s*0.6+r()*1.5;g.fillStyle='#f8f5ee';g.fillRect(x,y-h,w,h);g.fillStyle='#d8d0c0';g.fillRect(x+w-1.5,y-h,1.5,h);g.fillStyle='rgba(0,0,0,.08)';g.fillRect(x,y,w,1);}}
    for(let k=0;k<6;k++){const x=30+k*44+r()*20,y=HZ+22+k*3,w=22,h=14;g.fillStyle='#f7f3ea';rrect(g,x,y-h,w,h,3);g.fill();g.fillStyle='#ddd4c4';g.fillRect(x+w-4,y-h+2,4,h-2);g.fillStyle='rgba(0,0,0,.1)';g.fillRect(x-2,y,w+4,2);}
    /* the crowd: dense at the horizon, thinning towards him; the near ground left bare */
    const P=[];for(let i=0;i<2600;i++){const y=HZ+5+Math.pow(r(),1.7)*122,x=r()*W;P.push({x,y,k:Math.floor(r()*23)});}
    P.sort((a,b)=>a.y-b.y);
    for(const p of P){const s=0.09+(p.y-HZ)/127*0.34;if(s<0.17){const h=3.4*s/0.17;g.fillStyle=p.k===5?'#2a2528':'#f8f5ee';g.fillRect(p.x,p.y-h,1.6,h);g.fillStyle='#8c6a4c';g.fillRect(p.x,p.y-h-1,1.6,1);}else may_pilgrim(g,p.x,p.y,s,p.k);}
    /* the haze over everything far */
    g.fillStyle=vgrad(g,HZ-90,HZ+110,[[0,'rgba(243,232,210,0)'],[0.45,'rgba(243,232,210,.55)'],[1,'rgba(243,232,210,0)']]);g.fillRect(0,HZ-90,W,200);
    A.far=c; }
  /* the ground at his feet: hot, pale, cracked, pebbled; his slippers set aside to the left */
  { const c=mk(W,H),g=c.getContext('2d'),r=rng(611);
    g.fillStyle=vgrad(g,0,H,[[0,'#d0b791'],[0.5,'#c7a97e'],[1,'#b8966c']]);g.fillRect(0,0,W,H);
    for(let i=0;i<220;i++){const x=r()*W,y=r()*H;g.globalAlpha=0.05+r()*0.09;g.fillStyle=r()<0.5?'#a9825a':'#e6d2ac';ell(g,x,y,30+r()*110,10+r()*40);g.fill();}g.globalAlpha=1;
    g.strokeStyle='rgba(90,60,35,.17)';g.lineWidth=1.3;g.lineJoin='round';for(let i=0;i<22;i++){let x=r()*W,y=r()*H;g.beginPath();g.moveTo(x,y);for(let k=0;k<5;k++){x+=(r()-0.5)*60;y+=(r()-0.5)*40;g.lineTo(x,y);}g.stroke();}
    for(let i=0;i<520;i++){const x=r()*W,y=r()*H,s=1.5+r()*4.5;g.fillStyle=['#9c7a55','#b59670','#7d5f44','#d6c2a0'][i%4];ell(g,x,y,s,s*0.7,r()*3);g.fill();g.fillStyle='rgba(255,240,210,.5)';ell(g,x-s*0.3,y-s*0.3,s*0.4,s*0.25);g.fill();}
    may_slipper(g,340,418,-0.35);may_slipper(g,426,478,-0.22);
    A.ground=c; }
  MAY_AR=A;return A;
}
/* one of his hands raised in dua, seen from his own eyes: the palm towards him, the fingers up, the forearm going down out of frame. dir: +1 right hand, -1 left */
function may_duaHand(ctx,x,y,dir,s){
  ctx.save();ctx.translate(x,y);ctx.rotate(dir*0.1);ctx.scale(dir*s,s);
  const skin=vgrad(ctx,-240,360,[[0,'#dcae8e'],[0.35,HIS.skin],[1,HIS.skinSh]]),line='rgba(90,55,35,.24)';
  ctx.fillStyle=skin;
  ctx.beginPath();ctx.moveTo(-56,60);ctx.lineTo(52,60);ctx.lineTo(90,380);ctx.lineTo(-30,380);ctx.closePath();ctx.fill();
  ell(ctx,0,8,76,98);ctx.fill();
  ell(ctx,58,14,26,46,0.3);ctx.fill();
  for(const[fx,len,w,th]of[[-58,108,31,-0.17],[-20,132,33,-0.06],[18,142,35,0.02],[56,128,33,0.12]]){
    ctx.save();ctx.translate(fx,-66);ctx.rotate(th);ctx.fillStyle=skin;rrect(ctx,-w/2,-len,w,len+34,w/2);ctx.fill();
    ctx.strokeStyle=line;ctx.lineWidth=1.3;for(const f of[0.36,0.66]){ctx.beginPath();ctx.moveTo(-w/2+4,-len*f);ctx.quadraticCurveTo(0,-len*f+4,w/2-4,-len*f);ctx.stroke();}
    ctx.fillStyle='rgba(255,225,200,.18)';ell(ctx,0,-len+8,w*0.32,6);ctx.fill();
    ctx.restore();}
  ctx.save();ctx.translate(64,-16);ctx.rotate(0.58);ctx.fillStyle=skin;rrect(ctx,-20,-98,40,122,20);ctx.fill();ctx.strokeStyle=line;ctx.lineWidth=1.3;ctx.beginPath();ctx.moveTo(-14,-46);ctx.quadraticCurveTo(0,-42,14,-46);ctx.stroke();ctx.restore();
  ctx.strokeStyle=line;ctx.lineWidth=1.6;ctx.lineCap='round';
  ctx.beginPath();ctx.moveTo(-62,-26);ctx.quadraticCurveTo(-4,-48,54,-10);ctx.stroke();
  ctx.beginPath();ctx.moveTo(-64,-4);ctx.quadraticCurveTo(-8,-6,44,36);ctx.stroke();
  ctx.beginPath();ctx.moveTo(44,-34);ctx.quadraticCurveTo(50,40,-6,86);ctx.stroke();
  ctx.fillStyle='rgba(90,55,35,.1)';ell(ctx,0,-56,74,12);ctx.fill();
  ctx.restore();
}
/* a line of the dua, big in the sky above his hands: upright bold serif on a soft dark band, kept in the upper half */
function may_duaLine(ctx,text,a){
  if(a<=0)return;
  const cy=172,rise=(1-a)*10;
  ctx.save();
  ctx.font='600 54px "Cormorant Garamond",serif';
  let mw=1060,lines=wrapText(ctx,text,mw);
  if(lines.length>1)while(mw>420){const t=wrapText(ctx,text,mw-20);if(t.length>lines.length)break;mw-=20;lines=t;}
  const lh=62,th=lines.length*lh,top=Math.max(0,cy-th/2-78),bot=cy+th/2+80;
  ctx.globalAlpha=a;
  ctx.fillStyle=vgrad(ctx,top,bot,[[0,'rgba(34,20,10,0)'],[0.24,'rgba(34,20,10,.8)'],[0.76,'rgba(34,20,10,.8)'],[1,'rgba(34,20,10,0)']]);ctx.fillRect(0,top,W,bot-top);
  ctx.textAlign='center';ctx.textBaseline='middle';
  ctx.shadowColor='rgba(0,0,0,.55)';ctx.shadowBlur=12;ctx.fillStyle='#fff7e6';
  for(let k=0;k<lines.length;k++)ctx.fillText(lines[k],640,cy-th/2+lh/2+k*lh+rise);
  ctx.restore();
}
/* his dua, in his words, a line at a time; each held about four seconds */
const MAY_DUA=[
  [14.0,18.6,'Ya Allah, give her the right naseeb, and let me be it.'],
  [18.8,23.6,'If she is not good for me, ya Allah, make her good for me, and grant her to me.'],
  [23.8,28.6,'And if I am not good for her, ya Allah, make me good for her, and grant her to me.'],
  [28.8,33.4,'Marry us both. InshaAllah.'],
  [35.6,40.0,'Unko bohot jaldi sehat ata farmao, Allah sain.'],
  [40.2,44.4,'Aur unhe lambi umar ata farmao.'],
];
scene({id:'arafat',name:'26 May · Arafat',when:'2026-05-26T13:30',bars:15,fin:['#ffffff',1.6],fout:['#000000',1.8],
  note:'half past one on the plain of Arafat: the sun straight ahead, the hill and the white tents in the haze, thousands in white; he looks down at his bare feet on the hot ground, the slippers set aside, then raises his hands, and his dua for her stands in the sky a line at a time; then the one for her nani; the sun lower, the plain beginning to move.',
  tag:'“Ya Allah, give her the right naseeb, and let me be it.” · “Saudi ki garmi”',
  prep(){return may_arafat();},
  draw(ctx,lt,A){
    const HZ=A.HZ,td=smooth(5.6,7.6,lt)*(1-smooth(10.4,12.4,lt)),rise=smooth(12.2,14.2,lt)*(1-smooth(44.6,46.8,lt)),late=smooth(38,49,lt);
    let txt=0;for(const[a,b]of MAY_DUA)txt=Math.max(txt,smooth(a,a+0.6,lt)*(1-smooth(b-0.5,b,lt)));
    const ox=Math.sin(lt*0.5)*3,oy=-td*560+Math.sin(lt*0.8)*2;
    const sx=640+ox,sy=lerp(350,394,late)+oy;
    /* the sky: bleached at the top, cream at the horizon, warming as the afternoon goes */
    paintSky(ctx,[[0,mixHex('#c9d6e4','#d9b48a',late)],[0.3,mixHex('#e8ebe6','#edcfa8',late)],[0.58,mixHex('#f5edd8','#f1d2a6',late)],[0.65,mixHex('#efe2c4','#e8c89c',late)],[1,'#e8dcc0']]);
    sunGlow(ctx,sx,sy,640,`rgba(255,250,232,${0.95-0.4*txt})`);
    sunGlow(ctx,sx,sy,170,`rgba(255,255,248,${0.72-0.3*txt})`);
    ctx.fillStyle=mixHex('#fffcee','#ffe2a6',late);circle(ctx,sx,sy,36);ctx.fill();
    ctx.strokeStyle=`rgba(255,214,140,${0.35+0.3*late})`;ctx.lineWidth=3;circle(ctx,sx,sy,38);ctx.stroke();
    /* the far plain, the heat bending the horizon */
    ctx.drawImage(A.far,ox,oy);
    for(let y=HZ-70;y<HZ+90;y+=7){const dx=Math.sin(lt*5+y*0.11)*1.8*(1-0.5*late);ctx.drawImage(A.far,0,y,W,7,ox+dx,y+oy,W,7);}
    /* pilgrims on the move across the middle distance, walking in earnest as the day goes */
    { const r=rng(621),mv=0.3+1.4*smooth(40,47,lt);for(let i=0;i<90;i++){const y=HZ+28+Math.pow(r(),1.3)*96,x0=r()*W,sp=8+r()*10,k=Math.floor(r()*23),s=0.1+(y-HZ)/127*0.34;const x=((x0+lt*sp*mv*s*4)%(W+40)+W+40)%(W+40)-20;may_pilgrim(ctx,x+ox,y+oy,s,k);} }
    /* dust near the ground, thicker at the end */
    ctx.fillStyle=vgrad(ctx,HZ+oy,HZ+150+oy,[[0,`rgba(232,206,160,${0.12+0.3*late})`],[1,'rgba(232,206,160,0)']]);ctx.fillRect(0,HZ+oy,W,150);
    /* the ground at his feet slides up as he looks down: his bare feet, the slippers set aside */
    const gy=560-td*560+Math.sin(lt*0.8)*2;
    ctx.drawImage(A.ground,ox,gy);
    if(gy<700){ctx.save();ctx.translate(ox,gy-130);ctx.fillStyle='rgba(70,40,15,.2)';for(const fx of[572,708]){ell(ctx,fx+4,632,38,106);ctx.fill();}may_feet(ctx,lt);ctx.restore();}
    /* his hands come up, palms to the sky, the sun between them */
    if(rise>0.01){const hy=548+(1-rise)*560+Math.sin(lt*0.9)*3;
      may_duaHand(ctx,452+ox+Math.sin(lt*1.3)*1.5,hy,-1,1);may_duaHand(ctx,828+ox+Math.sin(lt*1.1)*1.5,hy,1,1);
      glow(ctx,sx,sy+60,300,'#ffe6b4',0.16*rise);}
    /* the glare: the flare off the sun, a veil over everything */
    ctx.save();ctx.globalCompositeOperation='screen';
    for(const[k,R,col,a]of[[1,26,'#ffe9b8',0.16],[1.7,58,'#bcd6ff',0.1],[2.4,36,'#ffd3a0',0.12],[3.1,90,'#ffeedc',0.07]])glow(ctx,sx-30*k,sy+70*k,R,col,a*(1-0.5*txt));
    ctx.fillStyle=hgrad(ctx,0,W,[[0,'rgba(255,240,205,0)'],[0.5,`rgba(255,240,205,${0.3*(1-0.6*txt)})`],[1,'rgba(255,240,205,0)']]);ctx.fillRect(0,sy-2,W,4);
    ctx.restore();
    ctx.fillStyle=`rgba(255,250,236,${0.14-0.06*late-0.05*txt-0.06*td})`;ctx.fillRect(0,0,W,H);
    motes(ctx,lt,50,613,'#e8d4ae',1.6,0.6);
    ctx.fillStyle=`rgba(40,20,5,${0.18*late})`;ctx.fillRect(0,0,W,H);
    /* the dua, a line at a time */
    for(const[a,b,text]of MAY_DUA){const al=smooth(a,a+0.6,lt)*(1-smooth(b-0.5,b,lt));if(al>0)may_duaLine(ctx,text,al);}
  },
  subs:[
    [0.8,3.6,'26 May. The day of Arafat.'],
    [4.0,7.4,'I stood in front of the sun, slippers off, on the bare ground,'],
    [7.6,10.8,'in the full scorching heat. And I prayed for her.'],
    [12.0,13.6,'And this was my dua.'],
    [14.2,18.2,'Ya Allah, give her the right naseeb, and let me be it.'],
    [18.9,23.3,'If she is not good for me, ya Allah, make her good for me, and grant her to me.'],
    [23.9,28.3,'And if I am not good for her, ya Allah, make me good for her, and grant her to me.'],
    [28.9,32.8,'Marry us both. InshaAllah.'],
    [33.4,35.3,'And for her nani, who was unwell.'],
    [35.7,39.7,'Unko bohot jaldi sehat ata farmao, Allah sain.'],
    [40.3,44.0,'Aur unhe lambi umar ata farmao.'],
    [45.2,48.4,'The sun came down over Arafat, and the whole plain began to move.'],
  ],
  score({add,T,pad,hit,THEME_B}){
    pad(T(0),'Em',15,0.34,'pad');                                                     /* one low drone the whole way */
    /* her theme on the flute at half speed: theme bars 0–3 over bars 3–10, then its last two bars over 11–14 */
    const slow=(bar,tb,vel)=>{let beat=0;for(const[m,d]of THEME_B[tb]){add(T(bar,beat),'flute',{midi:m,dur:(T(0,d*2)-T(0,0))*0.92,vel});beat+=d*2;}};
    slow(3,0,0.3);slow(5,1,0.3);slow(7,2,0.32);slow(9,3,0.3);slow(11,6,0.3);slow(13,7,0.26);
    hit(29.3,'chime',{midi:76,vel:0.34});hit(29.65,'chime',{midi:83,vel:0.26});       /* “InshaAllah” */
  },
  amb(lt){return{wind:0.3,crowd:0.25};},
});

/* ---------- 28 May · out of ihram: "OFFICIALLLY A HAAJJI" ---------- */
const MAY_IH=[
  {at:6.6, who:'me', time:'01:25',text:'Just got out of ehraam'},
  {at:9.4, who:'her',time:'01:31',text:'OFFICIALLLY A HAAJJI NOWWW ALHUMDULILAH MASHAALLAH'},
  {at:11.4,who:'her',time:'01:32',text:'So happy for you'},
  {at:12.6,who:'her',time:'01:32',text:'MASHAALLAH MASHAALLAH'},
  {at:13.2,who:'her',time:'01:32',text:'✨✨✨✨'},
  {at:14.6,who:'me', time:'01:33',text:'❤️❤️❤️❤️❤️❤️'},
  {at:15.4,who:'me', time:'01:33',text:'Haji from now on'},
  {at:17.2,who:'me', time:'01:33',text:'Bhaee its a new level experience'},
  {at:18.2,who:'me', time:'01:33',text:'😭 muzdalfa'},
  {at:18.8,who:'me', time:'01:33',text:'Arafat'},
  {at:19.8,who:'her',time:'01:40',text:'It kinda gives me goosebumps kay bibi hajra jab bhagi thi for paani to feed her son. Allaha tala felt so pleased by it that it has been made a ritual for everyone to follow on haj.'},
  {at:22.2,who:'me', time:'01:42',text:'And the mother having lit nothing'},
  {at:23.0,who:'me', time:'01:42',text:'Yet keep asking Allah'},
  {at:25.6,who:'me', time:'01:51',text:'You comming when'},
  {at:26.4,who:'me', time:'01:51',text:'Hajji hajji'},
  {at:28.4,who:'her',time:'01:52',text:'InshaAllah as soon as i can'},
];
scene({id:'ihram',name:'28 May · out of ihram',when:'2026-05-28T01:25',bars:10,fin:['#000000',1.6],fout:['#000000',1.6],
  note:'the tent in Mina on the night of Eid: his cracked feet on the carpet, the phone switched on after three dark days, her all-caps joy; Bibi Hajra, and a mother who kept asking.',
  tag:'“OFFICIALLLY A HAAJJI NOWWW ALHUMDULILAH MASHAALLAH” · “Hajji hajji”',
  prep(){return may_assets();},
  draw(ctx,lt,A){
    ctx.drawImage(A.tent,0,0);
    ctx.fillStyle='rgba(255,240,210,.06)';ctx.fillRect(0,0,W,H);
    may_feet(ctx,lt);
    const py=lerp(790,120,smooth(5.4,7.4,lt)),lit=lt>=6.2;
    const S=drawPhoneHand(ctx,lt,{x:475,y:py,w:330,h:700,screen:lit?undefined:'#07070c'});
    if(lit){may_chat(ctx,S,MAY_IH,lt,{name:'Fabeha',status:lt<9?'last seen today at 08:17':'online'});phoneTop(ctx,S,{time:may_clock(MAY_IH,lt,'01:25')});}
    const g=smooth(9.4,9.9,lt)*(1-smooth(12,14,lt));if(g>0)glow(ctx,S.x+S.w/2,S.y+S.h*0.45,420,'#ffe3a8',0.2*g);
    ctx.fillStyle='rgba(60,30,10,.1)';ctx.fillRect(0,0,W,H);
  },
  subs:[
    [0.6,3.8,'Three days without a phone: Arafat, Muzdalifah, the stones at Mina.'],
    [4.2,6.4,'The night of Eid, out of ihram at last. I switched it on.'],
    [6.8,8.6,'Just got out of ehraam','him'],
    [9.6,11.6,'OFFICIALLLY A HAAJJI NOWWW ALHUMDULILAH MASHAALLAH','her'],
    [11.8,13.2,'So happy for you','her'],
    [15.6,17.0,'Haji from now on','him'],
    [17.4,19.4,'Bhaee its a new level experience','him'],
    [20.0,22.0,'It kinda gives me goosebumps kay bibi hajra jab bhagi thi for paani to feed her son.','her'],
    [22.4,23.5,'And the mother having lit nothing','him'],
    [23.7,25.2,'Yet keep asking Allah','him'],
    [25.8,26.6,'You comming when','him'],
    [26.7,27.9,'Hajji hajji','him'],
    [28.6,30.2,'InshaAllah as soon as i can','her'],
    [30.6,33.0,'Her nani was unwell. That evening she asked me for one dua. I had made it already, on Arafat.'],
  ],
  score({bars,melody,hit,THEME}){
    bars(0,2,['Em7','Cmaj7'],{padVel:0.3});
    bars(2,8,['G','D','Em7','Cmaj7'],{strings:true,padVel:0.4});
    for(let b=3;b<7;b++)melody(b,b-3,'flute',0,0.38,THEME);
    for(let b=7;b<9;b++)melody(b,b-3,'box',12,0.3,THEME);
    for(const m of MAY_IH)hit(m.at,'tick',{hi:m.who==='her'});
    hit(9.4,'chime',{midi:79,vel:0.4});hit(9.7,'chime',{midi:83,vel:0.32});hit(10.0,'chime',{midi:86,vel:0.26});
  },
  amb(lt){return{room:0.36,wind:0.1};},
});
