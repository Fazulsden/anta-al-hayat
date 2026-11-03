/* feb2.js — February 2026 after the first date: the 3 a.m. drive home, the most celestial thing, the grapes and the glass of milk,
   Ramadan chai at a dhaba, the sehri shift. Helpers here carry the f2_ prefix. */
'use strict';

/* ---------- f2_ painters: food on tables, steam, bulbs, a fan, a desk ---------- */
function f2_steam(g,x,y,s,lt,seed,n=6){const r=rng(seed);g.save();for(let i=0;i<n;i++){const off=r(),sp=0.5+r()*0.5,ph=r()*TAU,u=((lt*0.16*sp+off)%1),yy=y-10*s-u*84*s,xx=x+(r()-0.5)*18*s+Math.sin(lt*1.2+ph+u*4)*10*s*u,a=(1-u)*0.16*Math.min(1,u*8);g.fillStyle=`rgba(255,255,255,${a})`;ell(g,xx,yy,(6+r()*5)*s*(0.5+u),(3.5+r()*2.5)*s);g.fill();}g.restore();}
function f2_plate(g,rx=95,ry=34){g.fillStyle='rgba(0,0,0,.25)';ell(g,4,8,rx*1.02,ry*1.05);g.fill();g.fillStyle='#b9bcc2';ell(g,0,0,rx,ry);g.fill();g.fillStyle='#d8dbe0';ell(g,0,-2,rx*0.86,ry*0.82);g.fill();g.fillStyle='#c3c6cc';ell(g,0,0,rx*0.7,ry*0.66);g.fill();}
function f2_biryani(g,x,y,s,seed=701){g.save();g.translate(x,y);g.scale(s,s);f2_plate(g);const r=rng(seed);
  g.fillStyle='#d98a2b';ell(g,0,-10,62,30);g.fill();g.fillStyle='#e8a94a';ell(g,-4,-16,52,24);g.fill();
  const cols=['#f4d58a','#f2c25a','#e9a23a','#fff1c0','#c8742a'];for(let i=0;i<120;i++){const a=r()*TAU,d=Math.sqrt(r()),px=Math.cos(a)*58*d,py=-14+Math.sin(a)*26*d;g.fillStyle=cols[i%5];g.save();g.translate(px,py);g.rotate(r()*TAU);g.fillRect(-3,-1,6,2);g.restore();}
  g.fillStyle='#6b3a1e';ell(g,-18,-20,16,12,0.3);g.fill();ell(g,20,-8,14,10,-0.4);g.fill();g.fillStyle='#8a4a24';ell(g,-16,-23,10,7,0.3);g.fill();
  g.fillStyle='#f1e26a';ell(g,46,-18,10,7,0.5);g.fill();g.fillStyle='#fff8b8';ell(g,46,-18,7,4,0.5);g.fill();
  g.fillStyle='#3f7a30';for(const[cx,cy]of[[-30,-30],[8,-26],[30,-18]]){ell(g,cx,cy,5,2.5,0.6);g.fill();}
  g.restore();}
function f2_kabab(g,x,y,s,seed=702){g.save();g.translate(x,y);g.scale(s,s);f2_plate(g,110,38);const r=rng(seed);
  g.strokeStyle='#efd9f1';g.lineWidth=2;for(let i=0;i<5;i++){ell(g,-60+i*30+r()*8,-6+r()*6,12,5);g.stroke();}
  for(let i=0;i<3;i++){const yy=-28+i*14,xx=-52+i*6;g.fillStyle='#d9b58a';rrect(g,xx-40,yy-6,86,12,6);g.fill();g.fillStyle='rgba(120,60,20,.35)';for(let k=0;k<6;k++){ell(g,xx-30+k*14,yy+(k%2?2:-2),5,3);g.fill();}}
  for(let i=0;i<7;i++){const xx=24+(i%4)*18-(i>3?9:0),yy=-20+Math.floor(i/4)*15;g.fillStyle=i%2?'#8d3b1f':'#a84a24';rrect(g,xx-9,yy-8,18,16,4);g.fill();g.fillStyle='rgba(0,0,0,.25)';ell(g,xx-2,yy-3,4,2);g.fill();}
  g.fillStyle='#f1e26a';ell(g,90,-4,9,6,0.5);g.fill();g.fillStyle='#3f7a30';ell(g,-82,-22,7,3,0.5);g.fill();
  g.restore();}
function f2_chai(g,x,y,s,lt){g.save();g.translate(x,y);g.scale(s,s);
  g.fillStyle='rgba(0,0,0,.25)';ell(g,4,10,48,14);g.fill();g.fillStyle='#e9e4da';ell(g,0,4,46,13);g.fill();g.fillStyle='#d4cec2';ell(g,0,4,30,8);g.fill();
  g.fillStyle='rgba(235,240,245,.5)';g.beginPath();g.moveTo(-22,-56);g.lineTo(22,-56);g.lineTo(18,2);g.lineTo(-18,2);g.closePath();g.fill();
  g.fillStyle='#b9743a';g.beginPath();g.moveTo(-20,-48);g.lineTo(20,-48);g.lineTo(17,0);g.lineTo(-17,0);g.closePath();g.fill();g.fillStyle='#c98a4e';ell(g,0,-48,20,5);g.fill();
  g.strokeStyle='rgba(255,255,255,.6)';g.lineWidth=2;g.beginPath();g.moveTo(-14,-50);g.lineTo(-11,-6);g.stroke();
  g.strokeStyle='rgba(235,240,245,.85)';g.lineWidth=2;g.beginPath();g.moveTo(-22,-56);g.lineTo(22,-56);g.lineTo(18,2);g.lineTo(-18,2);g.closePath();g.stroke();
  g.lineWidth=4;g.beginPath();g.arc(27,-28,12,-Math.PI/2,Math.PI/2);g.stroke();
  g.restore();if(lt!=null)f2_steam(g,x,y-56*s,s,lt,703);}
function f2_grapes(g,x,y,s,seed=704){g.save();g.translate(x,y);g.scale(s,s);const r=rng(seed);
  g.fillStyle='#f4f1ea';g.beginPath();g.moveTo(-90,-10);g.lineTo(80,-16);g.lineTo(96,30);g.lineTo(-76,36);g.closePath();g.fill();
  g.strokeStyle='#7a5a3a';g.lineWidth=3;g.beginPath();g.moveTo(-10,-60);g.quadraticCurveTo(0,-30,10,-10);g.stroke();
  for(let row=0;row<5;row++){const n=6-row;for(let k=0;k<n;k++){const px=(k-(n-1)/2)*20+(r()-0.5)*4,py=-6+row*16;g.fillStyle='#8fbf5a';circle(g,px,py,11);g.fill();g.fillStyle='#a9d46e';circle(g,px-3,py-3,5);g.fill();g.fillStyle='rgba(255,255,255,.5)';circle(g,px-4,py-5,2);g.fill();}}
  g.restore();}
function f2_egg(g,x,y,s){g.save();g.translate(x,y);g.scale(s,s);
  g.fillStyle='rgba(0,0,0,.18)';ell(g,4,8,56,16);g.fill();g.fillStyle='#f3efe6';ell(g,0,2,54,15);g.fill();g.fillStyle='#e2ddd2';ell(g,0,2,36,9);g.fill();
  g.fillStyle='#f8f4ec';ell(g,-6,-18,20,26);g.fill();g.fillStyle='rgba(0,0,0,.08)';ell(g,0,-12,14,20);g.fill();g.fillStyle='#fdfbf6';ell(g,-12,-24,7,10,-0.3);g.fill();
  g.fillStyle='#fff';for(let k=0;k<14;k++){const a=k*0.9,d=k*0.8;g.fillRect(30+Math.cos(a)*d*0.8,2+Math.sin(a)*d*0.3,1.5,1.5);}
  g.restore();}
function f2_milk(g,x,y,s){g.save();g.translate(x,y);g.scale(s,s);
  g.fillStyle='rgba(0,0,0,.2)';ell(g,4,6,26,8);g.fill();
  g.fillStyle='rgba(235,240,245,.5)';g.beginPath();g.moveTo(-22,-80);g.lineTo(22,-80);g.lineTo(18,0);g.lineTo(-18,0);g.closePath();g.fill();
  g.fillStyle='#efe0c6';g.beginPath();g.moveTo(-21,-62);g.lineTo(21,-62);g.lineTo(18,0);g.lineTo(-18,0);g.closePath();g.fill();g.fillStyle='#f6ead3';ell(g,0,-62,21,5);g.fill();
  g.strokeStyle='rgba(255,255,255,.7)';g.lineWidth=2;g.beginPath();g.moveTo(-14,-74);g.lineTo(-11,-8);g.stroke();g.strokeStyle='rgba(235,240,245,.85)';g.beginPath();g.moveTo(-22,-80);g.lineTo(22,-80);g.lineTo(18,0);g.lineTo(-18,0);g.closePath();g.stroke();
  g.restore();}
function f2_fruit(g,x,y,s){g.save();g.translate(x,y);g.scale(s,s);
  g.fillStyle='#f1d04a';g.beginPath();g.moveTo(-60,10);g.quadraticCurveTo(-30,-30,30,-14);g.quadraticCurveTo(10,10,-50,20);g.closePath();g.fill();g.fillStyle='#6b4a1a';ell(g,32,-14,4,3);g.fill();
  for(const[dx,dy,rot]of[[50,6,0.3],[70,12,-0.4],[62,-4,0.9]]){g.fillStyle='#5a2d1a';ell(g,dx,dy,11,6,rot);g.fill();g.fillStyle='rgba(255,255,255,.18)';ell(g,dx-2,dy-2,5,2,rot);g.fill();}
  for(const[dx,dy]of[[95,2],[112,14]]){g.fillStyle='#b48a5a';circle(g,dx,dy,9);g.fill();g.strokeStyle='#7a5530';g.lineWidth=1.2;g.beginPath();g.moveTo(dx-7,dy);g.quadraticCurveTo(dx,dy-6,dx+7,dy);g.stroke();g.beginPath();g.moveTo(dx,dy-8);g.lineTo(dx,dy+8);g.stroke();}
  g.restore();}
/* a photo tile inside a chat bubble: {photos:2,paint:f2_tile('chai')} */
function f2_tile(kind){return(ctx,px,py,tile,k)=>{const s=tile/190,cx=px+tile/2,cy=py+tile*0.62;
  ctx.fillStyle=kind==='grapes'?'#8a7b67':kind==='chai'?'#3b3a33':kind==='kabab'?'#f1ece2':'#6f7f74';ctx.fillRect(px,py,tile,tile);
  if(kind==='kabab'){ctx.fillStyle='rgba(200,50,50,.22)';for(let x=px-10;x<px+tile;x+=26)ctx.fillRect(x,py,8,tile);}
  if(kind==='biryani')f2_biryani(ctx,cx+(k?8:-4),cy,s*(k?1.0:0.9),701+k);
  else if(kind==='kabab')f2_kabab(ctx,cx,cy,s*0.8,702+k);
  else if(kind==='chai')f2_chai(ctx,cx-(k?18:0),cy+8,s*1.25,null);
  else if(kind==='grapes')f2_grapes(ctx,cx,cy-14,s*0.9,704+k);
  ctx.fillStyle='rgba(0,0,0,.14)';ctx.fillRect(px,py,tile,tile*0.16);};}
function f2_bulbs(g,lt,y0,n,seed,sag=40){const r=rng(seed);g.strokeStyle='rgba(20,20,25,.85)';g.lineWidth=2;g.beginPath();g.moveTo(-10,y0);g.quadraticCurveTo(W/2,y0+sag*2,W+10,y0);g.stroke();
  for(let i=0;i<n;i++){const u=(i+0.5)/n,x=u*W,y=y0+4*sag*u*(1-u)+6,tw=0.75+0.25*Math.sin(lt*3+r()*TAU);glow(g,x,y+6,38,'#ffb347',0.22*tw);g.fillStyle=i%3===0?'#ffd27a':'#ffe9b8';ell(g,x,y+6,4,6);g.fill();g.fillStyle='#333';g.fillRect(x-2,y-2,4,4);}}
function f2_vignette(g,a=0.6,col='10,6,14'){const v=g.createRadialGradient(W/2,H*0.5,H*0.3,W/2,H*0.5,H*0.95);v.addColorStop(0,`rgba(${col},0)`);v.addColorStop(1,`rgba(${col},${a})`);g.fillStyle=v;g.fillRect(0,0,W,H);}
function f2_pictured(g){g.fillStyle='rgba(40,20,50,.10)';g.fillRect(0,0,W,H);f2_vignette(g,0.6);}
function f2_fan(ctx,lt,x,y){ctx.save();ctx.translate(x,y);const a0=lt*6.5;
  for(let b=0;b<3;b++)for(let k=0;k<5;k++){ctx.save();ctx.rotate(a0+b*TAU/3-k*0.07);ctx.globalAlpha=0.16;ctx.fillStyle='#8c857a';rrect(ctx,30,-17,230,34,14);ctx.fill();ctx.restore();}
  ctx.fillStyle='#8c857a';circle(ctx,0,0,30);ctx.fill();ctx.fillStyle='#a39c90';circle(ctx,0,0,20);ctx.fill();ctx.fillStyle='#6f6960';circle(ctx,0,0,6);ctx.fill();ctx.restore();}
function f2_desk(g,y,col='#5a3f30',edge='#7a5641'){g.fillStyle=col;g.beginPath();g.moveTo(-20,y);g.lineTo(W+20,y);g.lineTo(W+60,H);g.lineTo(-60,H);g.closePath();g.fill();g.fillStyle=edge;g.fillRect(-20,y,W+40,14);g.fillStyle='rgba(255,210,150,.10)';ell(g,460,y+110,340,70);g.fill();}

/* ---------- f2_ painted layers (built once in prep) ---------- */
/* a roadside dhaba in Hyderabad at night: string bulbs, a stove glow, far figures, a formica table */
function f2_dhabaLayer(seed,o={}){const c=mk(W,H),g=c.getContext('2d'),r=rng(seed);
  paintSky(g,[[0,'#05060e'],[0.5,'#0d1020'],[0.75,'#1b1a28']]);
  g.fillStyle='#1c1a22';g.fillRect(0,250,W,200);g.fillStyle='#262330';g.fillRect(0,250,W,12);
  const st=g.createRadialGradient(1040,360,0,1040,360,260);st.addColorStop(0,'rgba(255,150,60,.45)');st.addColorStop(1,'rgba(255,150,60,0)');g.fillStyle=st;g.fillRect(700,120,580,340);
  g.fillStyle='#2b2520';g.fillRect(900,330,280,120);g.fillStyle='#8a8f98';ell(g,1040,336,74,20);g.fill();g.fillStyle='#55585f';ell(g,1040,338,66,16);g.fill();g.fillStyle='#1a1512';ell(g,1040,336,58,12);g.fill();g.fillStyle='#c9cdd3';ell(g,1040,331,70,6);g.fill();
  g.fillStyle='#6b6f78';g.fillRect(1036,290,8,46);g.fillStyle='#8a8f98';ell(g,1040,288,14,6);g.fill();
  for(const[x,col,hair,k]of[[150,'#6f7a8a','#1c1416',0],[215,'#8a7a66','#2a2a2a',1],[880,'#5a6a5a','#1c1416',2]])drawFigureFar(g,x,430,1.0,col,hair,0,k,true);
  g.fillStyle='#4a4236';g.fillRect(0,430,W,130);g.fillStyle='rgba(255,255,255,.04)';for(let i=0;i<60;i++)g.fillRect(r()*W,430+r()*130,2+r()*20,1);
  g.fillStyle=o.table||'#6f7f74';g.beginPath();g.moveTo(-40,560);g.lineTo(W+40,560);g.lineTo(W+80,H);g.lineTo(-80,H);g.closePath();g.fill();g.fillStyle='rgba(255,255,255,.06)';g.fillRect(0,560,W,6);
  g.fillStyle='rgba(255,255,255,.08)';for(let i=0;i<40;i++){g.globalAlpha=0.3+r()*0.5;ell(g,r()*W,580+r()*140,10+r()*30,2+r()*3);g.fill();}g.globalAlpha=1;
  g.fillStyle='#aeb3b8';g.beginPath();g.moveTo(1070,520);g.lineTo(1120,520);g.lineTo(1112,610);g.lineTo(1078,610);g.closePath();g.fill();g.fillStyle='#d9dde1';ell(g,1095,520,25,7);g.fill();g.fillStyle='rgba(255,255,255,.3)';g.fillRect(1078,530,4,70);
  return c;}
/* her room in Karachi as he pictures it: a lamp, a shelf of books, the window with the city; the desk is painted live so she can sit behind it */
function f2_herRoomLayer(){const c=mk(W,H),g=c.getContext('2d'),r=rng(731);
  g.fillStyle=vgrad(g,0,H,[[0,'#17111a'],[1,'#2a1d26']]);g.fillRect(0,0,W,H);
  g.fillStyle='#3a2f3e';g.fillRect(900,90,300,300);g.fillStyle='#0b1326';g.fillRect(912,102,276,276);g.fillStyle='#fff3cf';for(let i=0;i<40;i++){g.globalAlpha=0.3+r()*0.6;g.fillRect(920+r()*260,260+r()*110,2,2);}g.globalAlpha=1;g.fillStyle='#3a2f3e';g.fillRect(1046,102,8,276);g.fillRect(912,236,276,8);
  g.fillStyle='#4a3a3e';g.fillRect(80,150,420,10);const cols=['#b5533c','#3c6e8a','#c9a24a','#5c8a5a','#8a5c8a','#d9d2c2'];let x=100;for(let i=0;i<14;i++){const w=16+r()*16,h=50+r()*30;g.fillStyle=cols[i%cols.length];g.fillRect(x,150-h,w,h);x+=w+2;}
  g.fillStyle='#8a7a66';g.fillRect(226,250,8,230);g.fillStyle='#d9b27a';g.beginPath();g.moveTo(170,250);g.lineTo(290,250);g.lineTo(270,180);g.lineTo(190,180);g.closePath();g.fill();
  const lamp=g.createRadialGradient(230,260,0,230,260,560);lamp.addColorStop(0,'rgba(255,196,120,.42)');lamp.addColorStop(1,'rgba(255,196,120,0)');g.fillStyle=lamp;g.fillRect(0,0,W,H);
  return c;}
/* his ceiling at noon, seen from the bed: cream plaster, sun slats from the window */
function f2_ceilingLayer(){const c=mk(W,H),g=c.getContext('2d');
  g.fillStyle=vgrad(g,0,H,[[0,'#e9e2d5'],[1,'#f6f1e8']]);g.fillRect(0,0,W,H);
  const sun=g.createRadialGradient(1100,520,0,1100,520,700);sun.addColorStop(0,'rgba(255,240,200,.75)');sun.addColorStop(1,'rgba(255,240,200,0)');g.fillStyle=sun;g.fillRect(0,0,W,H);
  g.fillStyle='rgba(255,235,190,.35)';for(let i=0;i<4;i++){g.save();g.translate(980+i*64,0);g.transform(1,0,-0.35,1,0,0);g.fillRect(0,300,26,420);g.restore();}
  g.fillStyle='rgba(0,0,0,.05)';g.fillRect(0,0,W,30);g.fillStyle='rgba(0,0,0,.035)';g.fillRect(0,30,W,3);
  return c;}
/* a mug of tea, base at (x,y) */
function f2_mug(g,x,y,s){g.save();g.translate(x,y);g.scale(s,s);
  g.fillStyle='rgba(0,0,0,.28)';ell(g,6,4,44,10);g.fill();
  g.strokeStyle='#c8d2d6';g.lineWidth=9;g.beginPath();g.arc(34,-40,18,-Math.PI/2.4,Math.PI/2.4);g.stroke();
  g.fillStyle=hgrad(g,-34,34,[[0,'#9fb0b8'],[0.35,'#dfe7ea'],[1,'#8e9ea6']]);g.beginPath();g.moveTo(-34,-76);g.lineTo(34,-76);g.lineTo(32,-4);g.quadraticCurveTo(0,6,-32,-4);g.closePath();g.fill();
  g.fillStyle='#b5533c';g.fillRect(-33,-48,66,10);
  g.fillStyle='#e6edf0';ell(g,0,-76,34,8);g.fill();g.fillStyle='#8a5a34';ell(g,0,-74,29,6);g.fill();g.fillStyle='rgba(255,220,170,.35)';ell(g,-8,-75,12,2.5);g.fill();
  g.restore();}
/* his desk at home at dusk: the wall, the window going orange over flat roofs, the laptop open on his SaaS dashboard, the grapes on a tissue, a mug */
function f2_homeDeskLayer(){const c=mk(W,H),g=c.getContext('2d'),r=rng(741);
  g.fillStyle=vgrad(g,0,H,[[0,'#2e2533'],[0.7,'#4a3838']]);g.fillRect(0,0,W,H);
  const wx=830,wy=60,ww=390,wh=330;
  const dusk=g.createRadialGradient(wx+ww/2,wy+wh,0,wx+ww/2,wy+wh,620);dusk.addColorStop(0,'rgba(255,160,90,.30)');dusk.addColorStop(1,'rgba(255,160,90,0)');g.fillStyle=dusk;g.fillRect(0,0,W,H);
  g.fillStyle='#3a2c34';g.fillRect(wx-14,wy-14,ww+28,wh+28);
  g.fillStyle=vgrad(g,wy,wy+wh,[[0,'#27305e'],[0.4,'#6a5384'],[0.72,'#d9845a'],[1,'#f2b56a']]);g.fillRect(wx,wy,ww,wh);
  g.save();g.beginPath();g.rect(wx,wy,ww,wh);g.clip();
  g.fillStyle='#fff6e0';for(let i=0;i<5;i++){g.globalAlpha=0.35+r()*0.4;g.fillRect(wx+20+r()*(ww-40),wy+10+r()*70,1.6,1.6);}g.globalAlpha=1;
  glow(g,wx+ww*0.7,wy+wh-10,170,'#ffcf8a',0.55);
  g.fillStyle='#2a2030';let bx=wx;while(bx<wx+ww){const bw=36+r()*60,bh=24+r()*60;g.fillRect(bx,wy+wh-bh,bw+1,bh);if(r()<0.4){g.fillRect(bx+bw*0.3,wy+wh-bh-12,16,12);}
    g.fillStyle='rgba(255,214,140,.75)';for(let k=0;k<3;k++)if(r()<0.5)g.fillRect(bx+6+r()*(bw-14),wy+wh-bh+8+r()*(bh-14),4,5);g.fillStyle='#2a2030';bx+=bw;}
  const mx=wx+ww*0.8;g.fillRect(mx-5,wy+wh-120,10,120);g.beginPath();g.moveTo(mx-8,wy+wh-120);g.lineTo(mx,wy+wh-140);g.lineTo(mx+8,wy+wh-120);g.closePath();g.fill();g.fillRect(mx-8,wy+wh-96,16,5);
  g.restore();
  g.fillStyle='#3a2c34';g.fillRect(wx+ww/2-4,wy,8,wh);g.fillRect(wx,wy+wh*0.45,ww,8);
  g.fillStyle='rgba(255,190,120,.10)';g.fillRect(wx,wy,ww,wh);
  g.fillStyle='#6a4a52';g.beginPath();g.moveTo(wx-40,wy-24);g.lineTo(wx+18,wy-24);g.quadraticCurveTo(wx+4,wy+wh*0.6,wx+22,wy+wh+40);g.lineTo(wx-46,wy+wh+40);g.closePath();g.fill();
  g.strokeStyle='rgba(0,0,0,.18)';g.lineWidth=3;for(let k=0;k<3;k++){g.beginPath();g.moveTo(wx-30+k*16,wy-20);g.quadraticCurveTo(wx-24+k*14,wy+wh*0.6,wx-34+k*18,wy+wh+36);g.stroke();}
  g.fillStyle='#4a3a30';g.beginPath();g.moveTo(-20,500);g.lineTo(W+20,500);g.lineTo(W+60,H);g.lineTo(-60,H);g.closePath();g.fill();g.fillStyle='#6a5240';g.fillRect(-20,500,W+40,12);
  const sg=g.createRadialGradient(410,500,0,410,500,360);sg.addColorStop(0,'rgba(120,170,230,.28)');sg.addColorStop(1,'rgba(120,170,230,0)');g.fillStyle=sg;g.fillRect(40,380,740,340);
  g.fillStyle='#1b1d24';rrect(g,220,236,380,262,10);g.fill();g.fillStyle='#0f1218';g.fillRect(232,248,356,238);
  g.fillStyle='#161a24';g.fillRect(232,248,70,238);g.fillStyle='#2b3140';for(let k=0;k<6;k++)g.fillRect(244,276+k*22,46,6);g.fillStyle='#5b8def';g.fillRect(244,276,46,6);
  g.fillStyle='#1b2030';g.fillRect(302,248,286,26);g.fillStyle='#8a94a8';g.font='600 10px "Mulish",sans-serif';g.textAlign='left';g.fillText('Dashboard',312,265);
  [['Users','1,248','#5b8def'],['Signups','↑ 12%','#34c38f'],['Active','312','#f5b14c']].forEach((t,k)=>{const x=312+k*92;g.fillStyle='#161b26';rrect(g,x,284,84,46,5);g.fill();g.fillStyle='#8a94a8';g.font='500 9px "Mulish",sans-serif';g.fillText(t[0],x+8,298);g.fillStyle=t[2];g.font='700 14px "Mulish",sans-serif';g.fillText(t[1],x+8,320);});
  g.fillStyle='#161b26';rrect(g,312,340,180,120,5);g.fill();g.strokeStyle='rgba(255,255,255,.06)';g.lineWidth=1;for(let k=0;k<4;k++){g.beginPath();g.moveTo(320,360+k*26);g.lineTo(484,360+k*26);g.stroke();}
  g.strokeStyle='#5b8def';g.lineWidth=2;g.beginPath();for(let k=0;k<=12;k++){const x=322+k*13.5,y=440-(20+k*7+Math.sin(k*1.7)*12);if(k)g.lineTo(x,y);else g.moveTo(x,y);}g.stroke();
  g.fillStyle='#161b26';rrect(g,500,340,76,120,5);g.fill();for(let k=0;k<5;k++){const h=18+((k*37)%60);g.fillStyle=k===3?'#34c38f':'#2f5fb8';g.fillRect(508+k*13,452-h,9,h);}
  g.fillStyle='#161b26';rrect(g,312,468,264,12,3);g.fill();g.fillStyle='#2b3140';for(let k=0;k<3;k++)g.fillRect(320+k*90,472,60,4);
  g.fillStyle='#2a2d36';g.beginPath();g.moveTo(206,498);g.lineTo(614,498);g.lineTo(634,548);g.lineTo(186,548);g.closePath();g.fill();
  g.fillStyle='#3a3d47';for(let row=0;row<3;row++)for(let k=0;k<16;k++){rrect(g,236+k*22+row*3,506+row*11,18,8,2);g.fill();}g.fillStyle='#34373f';rrect(g,370,538,80,8,3);g.fill();
  f2_grapes(g,112,606,0.9);
  f2_mug(g,1150,612,1.0);
  return c;}
/* a shinwari hall at half past three: tiles, tube lights, a menu board, the tandoor, the table with the platters and the untouched naan */
function f2_hallLayer(){const c=mk(W,H),g=c.getContext('2d'),r=rng(751);
  g.fillStyle='#e9eee6';g.fillRect(0,0,W,H);
  g.fillStyle='#dde4da';for(let y=0;y<440;y+=44)for(let x=0;x<W;x+=44){if(((x/44+y/44)|0)%2===0)g.fillRect(x,y,44,44);}
  g.strokeStyle='rgba(0,0,0,.06)';g.lineWidth=1;for(let y=0;y<=440;y+=44){g.beginPath();g.moveTo(0,y);g.lineTo(W,y);g.stroke();}for(let x=0;x<=W;x+=44){g.beginPath();g.moveTo(x,0);g.lineTo(x,440);g.stroke();}
  for(const x of[260,900]){g.fillStyle='#f4fff2';g.fillRect(x-150,30,300,10);glow(g,x,36,220,'#eaffe8',0.35);}
  g.fillStyle='#1d1f1d';rrect(g,250,120,320,150,6);g.fill();g.fillStyle='#f3e9c8';g.font='700 26px "Mulish",sans-serif';g.textAlign='center';g.fillText('SEHRI BUFFET',410,165);g.font='600 15px "Mulish",sans-serif';g.fillStyle='#ffd27a';g.fillText('reshmi kabab · achaari boti · malai boti',410,200);g.fillText('tikka · chapli · naan · chai',410,226);g.fillStyle='#8fd18f';g.fillText('open till sehri',410,254);
  g.fillStyle='#6b5a4a';ell(g,1120,420,90,30);g.fill();g.fillStyle='#8a7560';g.beginPath();g.moveTo(1030,420);g.lineTo(1050,320);g.lineTo(1190,320);g.lineTo(1210,420);g.closePath();g.fill();g.fillStyle='#2a1a10';ell(g,1120,322,52,14);g.fill();glow(g,1120,322,120,'#ff9a3a',0.55);
  g.fillStyle='#b8b0a6';g.fillRect(60,380,300,14);g.fillRect(80,394,10,50);g.fillRect(330,394,10,50);
  for(const[x,col,hair,k]of[[120,'#5a6a8a','#1c1416',0],[200,'#8a7a66','#2a2a2a',1],[300,'#6a5a4a','#1c1416',2]])drawFigureFar(g,x,372,0.95,col,hair,0,k,true);
  g.fillStyle='#b9b2a4';g.fillRect(0,440,W,120);g.fillStyle='rgba(0,0,0,.05)';for(let x=0;x<W;x+=80)g.fillRect(x,440,2,120);
  g.fillStyle='#f4f1ea';g.beginPath();g.moveTo(-40,540);g.lineTo(W+40,540);g.lineTo(W+90,H);g.lineTo(-90,H);g.closePath();g.fill();
  g.fillStyle='rgba(200,50,50,.26)';for(let x=-80;x<W+80;x+=52)g.fillRect(x,540,16,200);for(let y=540;y<H;y+=52)g.fillRect(-90,y,W+180,16);
  f2_kabab(g,300,615,1.2);
  g.fillStyle='#c7cbd0';ell(g,520,572,40,14);g.fill();g.fillStyle='#6f9a3a';ell(g,520,568,34,10);g.fill();
  g.fillStyle='#c7cbd0';ell(g,610,560,36,12);g.fill();g.fillStyle='#f1f1ee';ell(g,610,557,30,9);g.fill();
  g.fillStyle='#a8793f';ell(g,1120,600,86,26);g.fill();g.fillStyle='#c79a5a';ell(g,1120,594,78,20);g.fill();for(const[dx,dy,rt]of[[-18,-10,0.3],[14,-6,-0.4],[0,-16,0.1]]){g.fillStyle='#e9c98c';ell(g,1120+dx,594+dy,54,20,rt);g.fill();g.fillStyle='rgba(120,70,20,.35)';for(let k=0;k<7;k++){circle(g,1120+dx-30+k*10,594+dy+(k%2?3:-3),2.2);g.fill();}}
  g.fillStyle='rgba(0,0,0,.07)';g.fillRect(0,0,W,H);
  return c;}
/* her kitchen before fajr: a pre-dawn window, one bulb, the counter with a kettle; the saucer with the egg */
function f2_kitchenLayer(){const c=mk(W,H),g=c.getContext('2d'),r=rng(761);
  g.fillStyle='#55606c';g.fillRect(0,0,W,520);g.strokeStyle='rgba(255,255,255,.07)';g.lineWidth=1;for(let y=0;y<520;y+=40){g.beginPath();g.moveTo(0,y);g.lineTo(W,y);g.stroke();}for(let x=0;x<W;x+=60){g.beginPath();g.moveTo(x,0);g.lineTo(x,520);g.stroke();}
  g.fillStyle='#2a2f3a';g.fillRect(400,80,440,300);g.fillStyle=vgrad(g,92,368,[[0,'#1b2440'],[0.6,'#3e5278'],[1,'#8a7a8a']]);g.fillRect(412,92,416,276);
  g.fillStyle='#fff';for(let i=0;i<18;i++){g.globalAlpha=0.2+r()*0.5;g.fillRect(420+r()*400,100+r()*120,1.5,1.5);}g.globalAlpha=1;
  g.fillStyle='#141a28';for(let i=0;i<9;i++){const w=30+r()*60,h=20+r()*60,x=412+i*46;g.fillRect(x,368-h,w,h);}
  g.fillStyle='#2a2f3a';g.fillRect(614,92,8,276);g.fillRect(412,228,416,8);
  g.fillStyle='#2a2f3a';g.fillRect(198,0,4,52);g.fillStyle='#fff1c4';ell(g,200,70,10,14);g.fill();glow(g,200,80,420,'#ffd49a',0.35);
  return c;}
/* the kitchen counter, painted after her so she stands behind it: the kettle, a glass of water, the saucer with the egg */
function f2_counter(g){
  g.fillStyle='#cfc9bf';g.beginPath();g.moveTo(-20,470);g.lineTo(W+20,470);g.lineTo(W+60,H);g.lineTo(-60,H);g.closePath();g.fill();g.fillStyle='#e0dbd2';g.fillRect(-20,470,W+40,10);
  g.fillStyle='#9ea4ab';ell(g,1040,470,60,16);g.fill();g.fillStyle='#b9bec4';g.beginPath();g.moveTo(985,470);g.lineTo(1000,390);g.lineTo(1080,390);g.lineTo(1095,470);g.closePath();g.fill();g.fillStyle='#8f959b';ell(g,1040,390,40,10);g.fill();g.strokeStyle='#8f959b';g.lineWidth=6;g.beginPath();g.arc(1040,382,34,Math.PI*1.1,Math.PI*1.9);g.stroke();
  g.fillStyle='rgba(235,240,245,.5)';g.beginPath();g.moveTo(560,430);g.lineTo(600,430);g.lineTo(596,510);g.lineTo(564,510);g.closePath();g.fill();g.fillStyle='rgba(170,200,230,.45)';g.beginPath();g.moveTo(562,450);g.lineTo(598,450);g.lineTo(596,510);g.lineTo(564,510);g.closePath();g.fill();
  f2_egg(g,380,528,1.25);}
/* the darkness around a phone at night: everything the screen's light does not reach */
function f2_phoneDark(ctx,S,inner=200,outer=640,a=0.96){const m=ctx.createRadialGradient(S.x+S.w/2,S.y+S.h*0.55,inner,S.x+S.w/2,S.y+S.h*0.55,outer);m.addColorStop(0,'rgba(2,2,8,0)');m.addColorStop(0.45,`rgba(2,2,8,${a*0.55})`);m.addColorStop(1,`rgba(2,2,8,${a})`);
  ctx.save();ctx.beginPath();ctx.rect(0,0,W,H);if(ctx.roundRect)ctx.roundRect(S.x,S.y,S.w,S.h,S.r);else ctx.rect(S.x,S.y,S.w,S.h);ctx.clip('evenodd');ctx.fillStyle=m;ctx.fillRect(0,0,W,H);ctx.restore();}

/* ---------- 8 February · 03:05 → 04:44 — the blocked highway home, then “Am i this lucky” in the dark ---------- */
const LUCKY_A=[
  {at:0.0, who:'me', time:'03:05',text:'Full off roading horahi boss 😭😭'},
  {at:0.0, who:'me', time:'03:05',text:'Poora hoghway block'},
  {at:4.4, who:'her',time:'03:40',text:'Ohh shittt'},
  {at:5.6, who:'her',time:'03:41',text:'Is it better now wese?'},
  {at:9.4, who:'her',time:'03:50',text:'Text me when you reach home wese'},
];
const LUCKY_B=[
  {at:0,   who:'her',time:'03:50',text:'Text me when you reach home wese'},
  {at:14.6,who:'me', time:'04:19',text:'Just reached'},
  {at:16.8,who:'her',time:'04:25',text:'Alhumdulilah'},
  {at:19.0,who:'me', time:'04:26',text:'Bro thankyou for the crumble'},
  {at:19.8,who:'me', time:'04:26',text:'I have no words'},
  {at:21.6,who:'her',time:'04:27',text:'Anytime bro'},
  {at:24.2,who:'me', time:'04:34',text:'😭 i was jst looking at you thinking is it for real'},
  {at:27.4,who:'me', time:'04:34',text:'Am i this lucky'},
  {at:30.6,who:'her',time:'04:44',text:'🤦🏼‍♀️🤦🏼‍♀️🤦🏼‍♀️🤦🏼‍♀️'},
];
scene({id:'lucky',name:'8 February · am i this lucky',when:'2026-02-08T03:05',bars:11,fin:['#000000',1.2],fout:['#000000',1.4],
  note:'three in the morning on the blocked Super Highway, dust in the headlights, the phone in the dash mount; then a room lit only by the screen, “Am i this lucky”, and her four facepalms ten minutes later.',
  tag:'“Just reached” · “Alhumdulilah” · “Am i this lucky”',
  prep(){return{};},
  draw(ctx,lt,A){
    const CUT=13.6;
    if(lt<CUT){
      /* the world is lifted 130 px so the road and the headlights show above the dash */
      ctx.save();ctx.translate(0,-130);
      motorway(ctx,lt,{night:true,truck:false,spd:0.28});
      /* the diversion: dirt over the carriageway, stones coming at us, a barrier on the closed lane */
      ctx.fillStyle='rgba(110,88,60,.55)';ctx.beginPath();ctx.moveTo(585,432);ctx.lineTo(695,432);ctx.lineTo(1280,720);ctx.lineTo(0,720);ctx.closePath();ctx.fill();
      const r=rng(801);ctx.fillStyle='#2a241c';for(let i=0;i<40;i++){const u=((r()+lt*0.25)%1),x=640+(r()-0.5)*(60+u*1100),y=436+u*u*284,s=0.5+u*5;ell(ctx,x,y,s*1.6,s*0.7);ctx.fill();}
      {const u=0.42,s=0.1+u*1.7,x=760+u*u*560,y=434+u*u*230;ctx.fillStyle='#ddd';rrect(ctx,x-60*s,y-40*s,120*s,22*s,4*s);ctx.fill();ctx.fillStyle='#d9372b';for(let k=0;k<4;k++)ctx.fillRect(x-56*s+k*30*s,y-38*s,14*s,18*s);ctx.fillStyle='#777';ctx.fillRect(x-54*s,y-18*s,6*s,22*s);ctx.fillRect(x+48*s,y-18*s,6*s,22*s);ctx.fillStyle='#ffb02e';circle(ctx,x+40*s,y-46*s,5*s*(0.6+0.4*Math.sin(lt*6)));ctx.fill();}
      /* headlights: two warm cones over the dirt, dust drifting in the beam */
      ctx.save();ctx.globalCompositeOperation='lighter';
      for(const bx of[560,720]){const g=ctx.createLinearGradient(0,720,0,440);g.addColorStop(0,'rgba(255,225,170,.5)');g.addColorStop(1,'rgba(255,225,170,0)');ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(bx-120,720);ctx.lineTo(bx+120,720);ctx.lineTo(640+(bx-640)*0.1,440);ctx.closePath();ctx.fill();}
      const d=rng(802);for(let i=0;i<70;i++){const u=((d()+lt*0.09)%1),x=640+(d()-0.5)*(80+u*700),y=444+u*u*276+Math.sin(lt*0.7+i)*6,s=0.6+u*2.6,a=(0.15+0.55*u)*(0.5+0.5*Math.sin(lt*2.3+i*1.7));ctx.fillStyle=`rgba(255,232,190,${a})`;circle(ctx,x,y,s);ctx.fill();}
      ctx.fillStyle='rgba(230,205,160,.08)';ctx.fillRect(0,432,W,288);
      ctx.restore();
      ctx.restore();
      cockpit(ctx,lt,{dark:true});
      glow(ctx,243,420,230,'#7fb2ff',0.14);
      ctx.save();ctx.translate(150,205);ctx.rotate(-0.05);ctx.scale(0.62,0.62);
      const S=drawPhone(ctx,0,0,PHONE.w,PHONE.h,{});
      chatPanel(ctx,S,LUCKY_A,lt,{name:'Fabeha',status:lt<4.4?'last seen today at 03:04':'online',dark:true});
      phoneTop(ctx,S,{time:lt<4.4?'03:05':lt<5.6?'03:40':lt<9.4?'03:41':'03:50'});
      ctx.fillStyle='#2a2b34';ctx.fillRect(-16,PHONE.h-40,PHONE.w+32,22);ctx.restore();
      const k=smooth(CUT-0.7,CUT,lt);if(k>0){ctx.fillStyle=`rgba(0,0,0,${k})`;ctx.fillRect(0,0,W,H);}
      return;
    }
    /* 04:19 — home. A black room; the only light is the screen */
    ctx.fillStyle='#030309';ctx.fillRect(0,0,W,H);
    const on=smooth(CUT,CUT+0.9,lt);
    ctx.save();ctx.globalAlpha=on;
    glow(ctx,640,480,460,'#3b5f8a',0.42);
    const S=drawPhoneHand(ctx,lt,{x:475,y:120,w:330,h:700});
    chatPanel(ctx,S,LUCKY_B,lt,{name:'Fabeha',status:'online'});
    phoneTop(ctx,S,{time:lt<16.8?'04:19':lt<19?'04:25':lt<21.6?'04:26':lt<24.2?'04:27':lt<30.6?'04:34':'04:44'});
    f2_phoneDark(ctx,S,200,640,0.96);
    ctx.restore();
  },
  subs:[
    [0.6,4.4,'8 February, three in the morning. The Super Highway home was blocked; the diversion was dirt.'],
    [4.8,7.0,'Full off roading horahi boss 😭😭','him'],
    [7.4,8.8,'Poora hoghway block','him'],
    [9.6,12.4,'Text me when you reach home wese','her'],
    [14.8,16.4,'Just reached','him'],
    [17.0,18.6,'Alhumdulilah','her'],
    [19.4,23.4,'Lights off. Awake since the morning before, and still not tired.'],
    [24.4,27.0,'😭 i was jst looking at you thinking is it for real','him'],
    [27.6,29.6,'Am i this lucky','him'],
    [30.8,32.8,'🤦🏼‍♀️🤦🏼‍♀️🤦🏼‍♀️🤦🏼‍♀️','her'],
    [33.2,35.6,'Ten minutes, then four facepalms. I took them as a yes.'],
  ],
  score({hit,melody,bars,THEME_C,THEME_B}){
    bars(0,4,['G','Cmaj7','Am7','D'],{padVel:0.36,bass:true,bassVel:0.3});
    for(let b=0;b<4;b++)melody(b,b,'piano',-12,0.4,THEME_C);
    bars(4,7,['G','Dsus','Em','Cmaj7'],{padVel:0.3});
    for(let b=6;b<10;b++)melody(b,b-6,'box',12,0.3,THEME_B);
    for(const m of LUCKY_A)if(m.at>0)hit(m.at,'tick',{hi:m.who==='her'});
    for(const m of LUCKY_B)if(m.at>0)hit(m.at,'tick',{hi:m.who==='her'});
    hit(30.6,'chime',{midi:76,vel:0.4});
  },
  amb(lt){return lt<13.6?{hum:0.55,wind:0.3}:{room:0.18};},
});

/* ---------- 10 February · 12:24 — noon under the fan, the most celestial thing ---------- */
const CEL=[
  {at:0,   who:'me', time:'12:24',text:'Easy scen iba was fun'},
  {at:0,   who:'her',time:'12:24',text:'Han it was'},
  {at:2.6, who:'me', time:'12:24',text:'Place doesnt matter at all person does'},
  {at:5.0, who:'me', time:'12:26',text:'😔 reel banani paregi travelling 8Hours spent xyz money just for the glance of the most celestial thing in this world'},
  {at:9.8, who:'her',time:'12:27',text:'😭😭😭😭😭😭😭😭😭🥲🥲🥲🥲🫡🫡🫡🫡🫡🫡🫡🫡'},
];
scene({id:'celestial',name:'10 February · the most celestial thing',when:'2026-02-10T12:24',bars:5,fin:['#000000',1.2],fout:['#000000',1.4],
  note:'noon under the fan, the phone above his face: “Place doesnt matter at all person does” and the reel line about eight hours of travel for one glance, answered with a row of salutes.',
  tag:'“Place doesnt matter at all person does”',
  prep(){return{ceiling:f2_ceilingLayer()};},
  draw(ctx,lt,A){
    /* noon: the ceiling fan, the phone above his face */
    ctx.drawImage(A.ceiling,0,0);
    f2_fan(ctx,lt,640,230);
    const S=drawPhoneHand(ctx,lt,{x:475,y:120,w:330,h:700});
    chatPanel(ctx,S,CEL,lt,{name:'Fabeha',status:'online',dark:false});
    phoneTop(ctx,S,{time:lt<5?'12:24':lt<9.8?'12:26':'12:27',light:true});
  },
  subs:[
    [0.5,2.4,'10 February, noon, under the fan. Three days after the date.'],
    [2.8,4.6,'Place doesnt matter at all person does','him'],
    [5.2,7.2,'😔 reel banani paregi travelling 8Hours spent xyz money','him'],
    [7.4,9.4,'just for the glance of the most celestial thing in this world','him'],
    [10.0,12.0,'😭😭😭😭😭😭😭😭😭🥲🥲🥲🥲🫡🫡🫡🫡🫡🫡🫡🫡','her'],
    [12.4,14.8,'Eight hours of road for one glance. Worth it.'],
  ],
  score({hit,melody,bars,THEME}){
    bars(0,5,['G','Em','Cmaj7','D','G'],{padVel:0.42,strings:true});
    for(let b=0;b<4;b++)melody(b,b,'flute',0,0.4,THEME);
    for(const m of CEL)if(m.at>0)hit(m.at,'tick',{hi:m.who==='her'});
    hit(9.8,'chime',{midi:79,vel:0.4});
  },
  amb(lt){return{room:0.2,hum:0.2};},
});

/* ---------- 15 February · 18:57 → 22:49 — grapes at his desk at home, her limp told lightly, the glass of milk, “Peeliya?” ---------- */
const PEEL_A=[
  {at:0.0, who:'her',time:'18:57',text:'How\'s work going?'},
  {at:1.4, who:'me', time:'18:57',text:'Grape'},
  {at:2.6, who:'me', time:'18:57',photos:2,paint:f2_tile('grapes')},
  {at:4.4, who:'her',time:'18:59',text:'🍇🍇'},
  {at:5.4, who:'me', time:'18:59',text:'Us moment 😭'},
  {at:7.4, who:'her',time:'19:02',text:'Sisak sisak kay jaraha hai but jaraha hai'},
  {at:9.6, who:'her',time:'19:06',text:'Bro i cant walk 😭😭😭😭😭😭'},
  {at:11.2,who:'me', time:'19:07',text:'Allah khayr kre bro'},
  {at:12.8,who:'me', time:'19:11',text:'Only if i could have taken this pain'},
  {at:14.4,who:'me', time:'19:11',text:'Even 10times hogher i would have immediately'},
  {at:15.8,who:'me', time:'19:11',text:'I wish i could'},
];
const PEEL_C=[
  {at:0,   who:'me', time:'21:55',text:'Also drink banana dates mix juice'},
  {at:0,   who:'me', time:'21:55',text:'It helps with legs'},
  {at:0,   who:'me', time:'22:00',text:'Walnuts underratted as hell'},
  {at:0,   who:'her',time:'22:00',text:'InshaAllah'},
  {at:0,   who:'me', time:'22:01',text:'Insha Allah'},
  {at:29.2,who:'me', time:'22:31',text:'Peeliya?'},
  {at:33.6,who:'her',time:'22:49',text:'Yepp'},
];
scene({id:'peeliya',name:'15 February · peeliya?',when:'2026-02-15T18:57',bars:11,fin:['#000000',1.2],fout:['#000000',1.4],
  note:'Sunday evening at his desk at home, working on his own SaaS, a bunch of grapes beside the laptop; she tells her gym injury like a joke and he wishes he could take the pain himself; the banana-date-walnut prescription, and at 22:31 one word, “Peeliya?” — eighteen minutes later, “Yepp”.',
  tag:'“Grape” · “Peeliya?” · “Yepp”',
  prep(){return{desk:f2_homeDeskLayer(),room:f2_herRoomLayer(),R:rooms()};},
  draw(ctx,lt,A){
    const C1=19.6,C2=28.8;
    if(lt<C1){
      ctx.drawImage(A.desk,0,0);
      ctx.fillStyle=`rgba(120,170,230,${0.02+0.015*Math.sin(lt*1.3)})`;ctx.fillRect(232,248,356,238);
      f2_steam(ctx,1150,546,1,lt,742,4);
      const S=drawPhoneHand(ctx,lt,{x:700,y:120,w:330,h:700});
      chatPanel(ctx,S,PEEL_A,lt,{name:'Fabeha',status:'online'});
      phoneTop(ctx,S,{time:lt<4.4?'18:57':lt<5.4?'18:59':lt<7.4?'19:00':lt<9.6?'19:02':lt<11.2?'19:06':lt<12.8?'19:07':'19:11'});
      const k=smooth(C1-0.5,C1,lt);if(k>0){ctx.fillStyle=`rgba(0,0,0,${k})`;ctx.fillRect(0,0,W,H);}
      return;
    }
    if(lt<C2){
      /* her room at ten, as he pictures it: the glass in both hands, the banana and the dates on the desk */
      ctx.drawImage(A.room,0,0);
      const sip=smooth(23.5,24.5,lt)*(1-smooth(26.5,27.5,lt));
      drawFabeha(ctx,600,385,1.05,{t:lt,outfit:'home',hair:'down',pose:'bust',arms:'cup',smile:0.45+0.3*sip,look:-0.1,tilt:-0.04-0.12*sip,blush:0.3,len:230,wind:0.05,eyes:sip>0.6?'happy':undefined});
      f2_milk(ctx,600,385+152*1.05+8-sip*26,1.0);
      f2_desk(ctx,560);
      f2_fruit(ctx,330,610,1.0);
      f2_pictured(ctx);
      const k=smooth(C1,C1+0.8,lt)*(1-smooth(C2-0.5,C2,lt));if(k<1){ctx.fillStyle=`rgba(0,0,0,${1-k})`;ctx.fillRect(0,0,W,H);}
      return;
    }
    /* 22:31, his room */
    ctx.drawImage(A.R.night,0,0);
    const S=drawPhoneHand(ctx,lt,{x:475,y:120,w:330,h:700});
    chatPanel(ctx,S,PEEL_C,lt,{name:'Fabeha',status:lt>=32.2&&lt<33.6?'typing…':'online'});
    phoneTop(ctx,S,{time:lt<33.6?'22:31':'22:49'});
    const k=smooth(C2,C2+0.6,lt);if(k<1){ctx.fillStyle=`rgba(0,0,0,${1-k})`;ctx.fillRect(0,0,W,H);}
  },
  subs:[
    [0.6,2.4,'15 February, Sunday evening, my desk at home.'],
    [2.6,4.4,'Working on my SaaS. Dinner was grapes.'],
    [7.6,9.4,'Sisak sisak kay jaraha hai but jaraha hai','her'],
    [9.8,11.0,'Bro i cant walk 😭😭😭😭😭😭','her'],
    [11.4,12.6,'Allah khayr kre bro','him'],
    [13.0,14.4,'Only if i could have taken this pain','him'],
    [14.6,16.6,'Even 10times hogher i would have immediately','him'],
    [17.2,19.4,'The gym, two days before. She told it like a joke.'],
    [20.0,23.6,'At ten I prescribed what I drink myself: banana, dates, milk. Walnuts if there were any.'],
    [24.0,25.6,'Walnuts underratted as hell','him'],
    [26.0,27.0,'InshaAllah','her'],
    [27.2,28.2,'Insha Allah','him'],
    [29.6,31.4,'Half an hour later I checked.'],
    [31.6,32.6,'Peeliya?','him'],
    [33.8,35.0,'Yepp','her'],
  ],
  score({hit,melody,bars,THEME_B}){
    bars(0,6,['Cmaj7','Dsus','G','Em','Cmaj7','G'],{padVel:0.36,strings:true});
    for(let b=3;b<6;b++)melody(b,b-3,'piano',0,0.4,THEME_B);
    bars(6,5,['Em','Cmaj7','G','Dsus','G'],{padVel:0.34});
    for(let b=6;b<9;b++)melody(b,b-6,'box',12,0.3,THEME_B);
    for(const m of PEEL_A)if(m.at>0)hit(m.at,'tick',{hi:m.who==='her'});
    for(const m of PEEL_C)if(m.at>0)hit(m.at,'tick',{hi:m.who==='her'});
    hit(33.6,'chime',{midi:79,vel:0.45});
  },
  amb(lt){return lt<19.6?{hum:0.12,room:0.2}:lt<28.8?{room:0.25}:{room:0.2};},
});

/* ---------- 22 February · 21:31 — Ramadan chai at a dhaba; she knows before he says; “Soul connections” ---------- */
const SOUL=[
  {at:3.0, who:'her',time:'21:31',text:'You\'re outside abhi?'},
  {at:4.6, who:'me', time:'21:31',text:'How do you know'},
  {at:5.4, who:'me', time:'21:31',text:'Stalker'},
  {at:6.6, who:'her',time:'21:31',text:'Chai peerahe ho'},
  {at:7.6, who:'her',time:'21:31',text:'Bas kia karey'},
  {at:8.8, who:'me', time:'21:31',text:'😭😭😭😭😭'},
  {at:9.8, who:'me', time:'21:31',text:'Han 😭'},
  {at:14.4,who:'me', time:'21:32',photos:2,paint:f2_tile('chai')},
  {at:15.6,who:'her',time:'21:32',text:'🤣🤣🤣🤣🤣🤣🤣'},
  {at:16.4,who:'her',time:'21:32',text:'Damnnn'},
  {at:18.0,who:'me', time:'21:33',text:'Nice guess probablity master'},
  {at:20.4,who:'her',time:'21:36',text:'I didnt guess i was sure of it'},
  {at:22.6,who:'me', time:'21:40',text:'How ?'},
  {at:23.8,who:'her',time:'21:40',text:'Bas pata tga mujhe'},
  {at:25.6,who:'me', time:'21:41',text:'Kya baat hai'},
  {at:26.6,who:'me', time:'21:41',text:'Soul connections'},
];
scene({id:'soul',name:'22 February · soul connections',when:'2026-02-22T21:31',bars:9,fin:['#000000',1.2],fout:['#000000',1.4],
  note:'Ramadan, night chai at a dhaba in Hyderabad; “You\'re outside abhi?” before he has told anyone, the cup photographed as evidence, “I didnt guess i was sure of it”.',
  tag:'“Chai peerahe ho” · “Soul connections”',
  prep(){return{dhaba:f2_dhabaLayer(771,{table:'#5b4a3a'})};},
  draw(ctx,lt,A){
    const world=g=>{g.drawImage(A.dhaba,0,0);stars(g,lt,120,772,230,0.6);f2_bulbs(g,lt,96,12,773,44);glow(g,1040,360,200,'#ff9a3a',0.12+0.05*Math.sin(lt*7));f2_steam(g,1040,330,1.2,lt,775,5);
      g.fillStyle='#fff3d0';circle(g,1150,80,16);g.fill();g.fillStyle='#0b0d1c';circle(g,1143,76,15);g.fill();
      f2_chai(g,300,600,1.7,lt);
      g.fillStyle='#e9e4da';ell(g,470,585,34,11);g.fill();g.fillStyle='#d8b06a';for(let k=0;k<3;k++){ell(g,458+k*12,580-(k%2)*3,13,6,0.2);g.fill();}
    };
    world(ctx);motes(ctx,lt,30,774,'#ffe2b0',1.2,0.4);
    const cam=lt>10.6&&lt<14.2;
    const S=drawPhoneHand(ctx,lt,{x:600,y:120,w:330,h:700});
    if(cam){
      ctx.save();rrect(ctx,S.x,S.y,S.w,S.h,S.r);ctx.clip();ctx.fillStyle='#000';ctx.fillRect(S.x,S.y,S.w,S.h);
      const vw=S.w,vh=S.w*16/9,vy=S.y+(S.h-vh)/2;
      ctx.save();ctx.beginPath();ctx.rect(S.x,vy,vw,vh);ctx.clip();ctx.translate(S.x+vw/2,vy+vh/2);const z=vh/H*2.2;ctx.scale(z,z);ctx.translate(-(300+Math.sin(lt*0.5)*5),-(560+Math.sin(lt*0.8)*4));world(ctx);ctx.restore();
      const SH=[12.0,12.8],fl=SH.reduce((m,s)=>Math.max(m,smooth(s,s+0.06,lt)*(1-smooth(s+0.08,s+0.35,lt))),0);
      ctx.strokeStyle='#ffd60a';ctx.lineWidth=2;ctx.strokeRect(S.x+vw/2-40,vy+vh/2-40,80,80);
      ctx.fillStyle='rgba(0,0,0,.35)';rrect(ctx,S.x+S.w/2-44,S.y+52,88,28,14);ctx.fill();ctx.fillStyle='#fff';ctx.font='600 14px "Mulish",sans-serif';ctx.textAlign='center';ctx.fillText('PHOTO',S.x+S.w/2,S.y+71);
      ctx.fillStyle='rgba(0,0,0,.45)';rrect(ctx,S.x+S.w/2-20,S.y+S.h-150,40,24,12);ctx.fill();ctx.fillStyle='#ffd60a';ctx.font='700 12px "Mulish",sans-serif';ctx.fillText('1x',S.x+S.w/2,S.y+S.h-133);
      ctx.strokeStyle='#fff';ctx.lineWidth=3;circle(ctx,S.x+S.w/2,S.y+S.h-80,30);ctx.stroke();ctx.fillStyle='#fff';circle(ctx,S.x+S.w/2,S.y+S.h-80,24*(1-0.15*fl));ctx.fill();
      if(fl>0){ctx.fillStyle=`rgba(255,255,255,${fl*0.9})`;ctx.fillRect(S.x,S.y,S.w,S.h);}
      ctx.restore();phoneTop(ctx,S,{time:'21:32'});
    }else{
      chatPanel(ctx,S,SOUL,lt,{name:'Fabeha',status:'online'});
      phoneTop(ctx,S,{time:lt<14.4?'21:31':lt<18?'21:32':lt<20.4?'21:33':lt<22.6?'21:36':lt<25.6?'21:40':'21:41'});
    }
  },
  subs:[
    [0.6,3.4,'22 February, Ramadan. Chai at a dhaba in Hyderabad; I hadn\'t told her where I was.'],
    [3.6,4.7,'You\'re outside abhi?','her'],
    [4.9,6.0,'How do you know','him'],
    [6.2,7.0,'Stalker','him'],
    [7.2,8.4,'Chai peerahe ho','her'],
    [8.6,9.6,'Bas kia karey','her'],
    [10.4,13.6,'I photographed the cup, as evidence.'],
    [15.8,16.8,'Damnnn','her'],
    [18.2,20.0,'Nice guess probablity master','him'],
    [20.6,22.4,'I didnt guess i was sure of it','her'],
    [24.0,25.2,'Bas pata tga mujhe','her'],
    [25.6,26.6,'Kya baat hai','him'],
    [26.8,28.6,'Soul connections','him'],
  ],
  score({hit,melody,bars,CH,THEME_B}){
    const CHS=['Am7','Cmaj7','Dsus','Em7','Dsus','Em7','Cmaj7','G','Dsus'];
    bars(0,9,CHS,{padVel:0.4});
    for(let b=0;b<9;b++){const p=CH[CHS[b]].p;[[0,1],[1.5,2],[2,3],[3,2]].forEach(([q,ix])=>hit(b*BAR+q*BEAT,'pluck',{midi:p[ix]+12,vel:0.36}));}
    for(let b=5;b<9;b++)melody(b,b-5,'box',12,0.28,THEME_B);
    for(const m of SOUL)hit(m.at,'tick',{hi:m.who==='her'});
    hit(12.0,'tick',{});hit(12.8,'tick',{});
    hit(26.6,'chime',{midi:83,vel:0.4});
  },
  amb(lt){return{wind:0.1,room:0.3,hum:0.12};},
});

/* ---------- 23 February · 00:28 → 05:26 — the shinwari sehri buffet, her one boiled egg, and the “Sojao” ping-pong ---------- */
const SEH_A=[
  {at:0.8, who:'me', time:'00:28',text:'Sehri bahir krooga'},
  {at:1.6, who:'me', time:'00:28',text:'Tou full buffet'},
  {at:3.2, who:'her',time:'00:30',text:'Eat all bbq item'},
  {at:4.0, who:'her',time:'00:30',text:'Protein hi protein'},
  {at:5.4, who:'her',time:'00:38',text:'But if you\'re going dor sehri na tih attack their reshni kabab, achaari boti wagaira'},
  {at:7.4, who:'me', time:'00:39',text:'Ok boss'},
  {at:8.4, who:'her',time:'00:40',text:'Also dont touch naan wagaira'},
  {at:9.8, who:'me', time:'00:43',text:'Ayi ayi Cap'},
];
const SEH_B=[
  {at:0,   who:'me', time:'03:36',photos:2,paint:f2_tile('kabab')},
  {at:0,   who:'her',time:'05:05',text:'Ohoooi'},
  {at:0,   who:'her',time:'05:05',text:'Kia baat hai😋😋😋😋'},
  {at:13.0,who:'me', time:'05:16',photos:2,paint:f2_tile('kabab')},
  {at:14.2,who:'me', time:'05:16',text:'Dosri shift ye thi'},
  {at:15.4,who:'me', time:'05:16',text:'What are you having'},
  {at:17.6,who:'her',time:'05:17',text:'Im just having 1 boiled egg abhi toh'},
];
const SEH_C=[
  {at:0,   who:'her',time:'05:20',text:'Ap abhi sona mat'},
  {at:0,   who:'her',time:'05:21',text:'Chicken waly kay pas jana'},
  {at:0,   who:'her',time:'05:21',text:'Sharafat se'},
  {at:28.8,who:'me', time:'05:23',text:'Sojao'},
  {at:30.2,who:'her',time:'05:24',text:'Namaz toh hinay do bhai'},
  {at:31.6,who:'her',time:'05:24',text:'Aik kam karo nened ka injection dedia karo jab dekho sojao kehte rehte ho'},
  {at:33.4,who:'me', time:'05:25',text:'Eik baat bolo?'},
  {at:34.8,who:'her',time:'05:26',text:'Bolo'},
  {at:35.8,who:'me', time:'05:26',text:'Sojao'},
  {at:37.0,who:'her',time:'05:26',text:'😒😒😒😠😠😠😫😫😫'},
];
scene({id:'sehri',name:'23 February · sehri shift',when:'2026-02-23T00:28',bars:12,fin:['#000000',1.2],fout:['#000000',1.4],
  note:'the sehri buffet at a shinwari hall under tube lights, kabab in two shifts under her orders (no naan); her one boiled egg on a saucer before fajr; the phone passing “Sojao” back and forth until she goes to pray.',
  tag:'“Ayi ayi Cap” · “Im just having 1 boiled egg abhi toh” · “Sojao”',
  prep(){return{hall:f2_hallLayer(),kitchen:f2_kitchenLayer(),R:rooms()};},
  draw(ctx,lt,A){
    const C1=11.6,C2=20.0,C3=28.0;
    const fade=(a,b)=>{const k=smooth(a,a+0.7,lt)*(1-smooth(b-0.5,b,lt));if(k<1){ctx.fillStyle=`rgba(0,0,0,${1-k})`;ctx.fillRect(0,0,W,H);}};
    if(lt<C1){
      ctx.drawImage(A.R.night,0,0);
      const S=drawPhoneHand(ctx,lt,{x:475,y:120,w:330,h:700});
      chatPanel(ctx,S,SEH_A,lt,{name:'Fabeha',status:'online'});
      phoneTop(ctx,S,{time:lt<3.2?'00:28':lt<5.4?'00:30':lt<7.4?'00:38':lt<8.4?'00:39':lt<9.8?'00:40':'00:43'});
      fade(-1,C1);return;
    }
    if(lt<C2){
      ctx.drawImage(A.hall,0,0);
      ctx.fillStyle=`rgba(235,255,235,${0.04+(Math.sin(lt*41)>0.92?0.04:0)})`;ctx.fillRect(0,0,W,H);
      f2_steam(ctx,300,575,1.1,lt,781,5);
      glow(ctx,1120,322,160,'#ff9a3a',0.25+0.08*Math.sin(lt*9));
      const S=drawPhoneHand(ctx,lt,{x:600,y:120,w:330,h:700});
      chatPanel(ctx,S,SEH_B,lt,{name:'Fabeha',status:'online'});
      phoneTop(ctx,S,{time:lt<13?'05:05':lt<17.6?'05:16':'05:17'});
      fade(C1,C2);return;
    }
    if(lt<C3){
      /* her kitchen before fajr, as he pictures it: one boiled egg on a saucer */
      ctx.drawImage(A.kitchen,0,0);
      drawFabeha(ctx,840,352,1.0,{t:lt,outfit:'home',hair:'low',pose:'bust',arms:'lap',smile:0.35,look:-0.6,tilt:0.06,blush:0.2});
      f2_counter(ctx);
      f2_pictured(ctx);
      fade(C2,C3);return;
    }
    /* his room at dawn: the window going grey */
    ctx.drawImage(A.R.night,0,0);
    ctx.fillStyle='rgba(90,120,170,.22)';ctx.fillRect(834,74,372,302);ctx.fillStyle='rgba(120,140,180,.08)';ctx.fillRect(0,0,W,H);
    const S=drawPhoneHand(ctx,lt,{x:475,y:120,w:330,h:700});
    chatPanel(ctx,S,SEH_C,lt,{name:'Fabeha',status:'online'});
    phoneTop(ctx,S,{time:lt<28.8?'05:21':lt<30.2?'05:23':lt<33.4?'05:24':lt<34.8?'05:25':'05:26'});
    fade(C3,99);
  },
  subs:[
    [0.6,2.4,'23 February, half past midnight.'],
    [2.6,4.2,'The plan: sehri outside, the full buffet, all protein.'],
    [4.4,5.3,'Eat all bbq item','her'],
    [5.6,6.8,'But if you\'re going dor sehri na tih','her'],
    [6.9,8.3,'attack their reshni kabab, achaari boti wagaira','her'],
    [8.6,9.8,'Also dont touch naan wagaira','her'],
    [10.0,11.2,'Ayi ayi Cap','him'],
    [12.2,14.0,'Half past three, a shinwari hall under tube lights.'],
    [14.2,15.6,'Two shifts of kabab and no naan, captain’s orders.'],
    [15.8,17.0,'Dosri shift ye thi','him'],
    [17.8,19.6,'Im just having 1 boiled egg abhi toh','her'],
    [20.6,24.2,'Her sehri, as I pictured it: the kitchen before fajr, one boiled egg on a saucer, a pinch of salt.'],
    [24.8,27.6,'Two shifts on my side, one egg on hers, and she was the one giving orders.'],
    [29.0,30.0,'Sojao','him'],
    [30.4,31.6,'Namaz toh hinay do bhai','her'],
    [31.8,32.8,'Aik kam karo nened ka injection dedia karo','her'],
    [32.9,33.9,'jab dekho sojao kehte rehte ho','her'],
    [34.1,34.9,'Eik baat bolo?','him'],
    [35.1,35.8,'Bolo','her'],
    [36.0,36.9,'Sojao','him'],
    [37.2,38.8,'😒😒😒😠😠😠😫😫😫','her'],
  ],
  score({hit,melody,bars,THEME,THEME_B}){
    const CHS=['G','G','Em','Cmaj7','D','G','Bm','Cmaj7','Em','Cmaj7','G','D'];
    bars(0,12,CHS,{padVel:0.3});
    for(let b=1;b<8;b++)melody(b,b-1,'box',12,0.38,THEME);
    for(let b=8;b<12;b++)melody(b,b-8,'box',12,0.3,THEME_B);
    [20.8,23.1,26.0].forEach((t,i)=>hit(t,'bird',{f:2600+i*300}));
    for(const m of SEH_A)hit(m.at,'tick',{hi:m.who==='her'});
    for(const m of SEH_B)if(m.at>0)hit(m.at,'tick',{hi:m.who==='her'});
    for(const m of SEH_C)if(m.at>0)hit(m.at,'tick',{hi:m.who==='her'});
  },
  amb(lt){return lt<11.6?{room:0.2}:lt<20?{hum:0.4,room:0.3}:lt<28?{room:0.12,wind:0.08}:{room:0.18};},
});
