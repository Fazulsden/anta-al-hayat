/* dates.js — the car. Five dates on which they sat in the car for hours and just looked at each other
   (see notes/AUTHORING.md). First person from the driver's seat, turned to the passenger seat: her in the
   seat beside him, close, the belt across her, the door window behind her with the street or the campus,
   the dashboard glow at the bottom edge. One shared painter (dt_car) and one scene per date; the light
   follows the hour and the outfit follows the day. His words: "how majestic she looked when we were sitting
   in the car for hours and hours, and how majestic her eyes were, celestial." */
'use strict';

/* ---------- keyframed face: [[t,{look,smile,tilt,blush,eyes},dur],…] → the values at lt ---------- */
function dt_pose(lt,keys,dur=0.9){
  let cur=Object.assign({},keys[0][1]);
  for(let i=1;i<keys.length;i++){const[t0,v,d]=keys[i];if(lt<t0)break;const b=smooth(t0,t0+(d??dur),lt),nx={};
    for(const k in v)nx[k]=typeof v[k]==='number'?lerp(cur[k]??v[k],v[k],b):(b>0.5?v[k]:cur[k]);
    for(const k in cur)if(!(k in nx))nx[k]=b>0.5?undefined:cur[k];
    cur=nx;}
  return cur;
}

/* ---------- the three windows seen from the driver's seat, turned left: rear door · front door · the windscreen corner ---------- */
const DT_WIN={rear:[[0,132],[236,126],[236,406],[0,408]],front:[[300,118],[846,92],[846,404],[300,406]],screen:[[892,56],[1280,40],[1280,338],[880,350]]};
function dt_poly(ctx,pts,fresh=true){if(fresh)ctx.beginPath();pts.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.closePath();}
function dt_winClip(ctx){ctx.beginPath();for(const k in DT_WIN)dt_poly(ctx,DT_WIN[k],false);ctx.clip();}

/* ---------- what is outside the glass, painted once and softened (she is the focus, the world is not) ---------- */
function dt_outside(o){
  const c=mk(W,H),g=c.getContext('2d'),r=rng(o.seed);
  g.fillStyle=vgrad(g,0,344,o.sky);g.fillRect(0,0,W,H);
  if(o.stars){const rs=rng(o.seed+1);g.fillStyle='rgba(255,250,235,.85)';for(let i=0;i<70;i++)g.fillRect(rs()*W,rs()*170,1.4,1.4);}
  if(o.sun)sunGlow(g,o.sun[0],o.sun[1],o.sun[2],o.sun[3]);
  g.fillStyle=o.far;for(let x=-30;x<W+30;){const w=50+r()*120,h=40+r()*110;g.fillRect(x,310-h,w,h+40);x+=w+r()*24;}
  if(o.brick){
    g.fillStyle=o.brick;g.fillRect(520,196,W,160);g.fillStyle=mixHex(o.brick,'#ffffff',0.18);g.fillRect(520,196,W,12);
    g.strokeStyle='rgba(255,230,210,.14)';g.lineWidth=1;for(let y=214;y<352;y+=9){g.beginPath();g.moveTo(520,y);g.lineTo(W,y);g.stroke();}
    g.fillStyle=mixHex(o.brick,'#000000',0.45);for(let k=0;k<7;k++){const x=560+k*108;g.beginPath();g.moveTo(x,352);g.lineTo(x,276);g.arc(x+30,276,30,Math.PI,0);g.lineTo(x+60,352);g.closePath();g.fill();}
    g.fillStyle=o.winLit;for(let k=0;k<7;k++){const x=560+k*108;g.fillRect(x+8,300,44,22);}
  }
  if(o.street){
    for(let k=0;k<5;k++){const x=-20+k*280,h=100+r()*70;g.fillStyle=o.street;g.fillRect(x,340-h,250,h+20);g.fillStyle=o.winLit;for(let j=0;j<6;j++){if(r()<0.6)g.fillRect(x+22+(j%3)*72,350-h+18+Math.floor(j/3)*46,36,26);}}
  }
  if(o.sign){for(const[x,y,col,gl]of[[586,214,'#d8262c','rgba(220,40,50,0.7)'],[716,220,'#1049a0','rgba(20,80,180,0.7)']]){sunGlow(g,x,y,160,gl);g.fillStyle=col;circle(g,x,y,42);g.fill();g.fillStyle='rgba(255,255,255,.45)';ell(g,x-10,y-14,12,6,-0.5);g.fill();}}
  for(let k=0;k<o.trees;k++){const x=40+r()*(W-80),s=70+r()*80,y=346;g.fillStyle=o.trunk||'#3a2c22';g.fillRect(x-5,y-s*0.6,10,s*0.6+8);g.fillStyle=o.tree;ell(g,x,y-s*0.72,s*0.62,s*0.42);g.fill();ell(g,x-s*0.32,y-s*0.5,s*0.4,s*0.3);g.fill();ell(g,x+s*0.3,y-s*0.52,s*0.42,s*0.3);g.fill();g.fillStyle=o.treeHi||'rgba(255,255,255,.08)';ell(g,x-s*0.1,y-s*0.86,s*0.34,s*0.18);g.fill();}
  g.fillStyle=vgrad(g,344,540,[[0,o.ground[0]],[1,o.ground[1]]]);g.fillRect(0,344,W,H-344);
  if(o.kerb){g.fillStyle=o.kerb;g.fillRect(0,344,W,10);}
  if(o.lamps){for(const x of o.lamps){g.fillStyle='#2a2a30';g.fillRect(x-3,150,6,200);g.fillRect(x-24,150,48,5);g.fillStyle=o.lampCol||'#ffe2a0';ell(g,x,154,11,6);g.fill();sunGlow(g,x,156,140,o.lampGlow||'rgba(255,220,150,0.55)');}}
  return softened(c,o.blur??6);
}

/* ---------- the cabin, built once: roof, pillars, door panel, dash, console and the passenger seat; the windows are holes ---------- */
function dt_cab(){
  const c=mk(W,H),g=c.getContext('2d');
  g.fillStyle='#1b1c24';g.fillRect(0,0,W,H);
  g.globalCompositeOperation='destination-out';for(const k in DT_WIN){dt_poly(g,DT_WIN[k]);g.fill();}g.globalCompositeOperation='source-over';
  g.strokeStyle='#101117';g.lineWidth=7;for(const k in DT_WIN){dt_poly(g,DT_WIN[k]);g.stroke();}
  g.fillStyle='#242530';g.fillRect(244,122,14,286);
  g.beginPath();g.moveTo(852,96);g.lineTo(866,88);g.lineTo(858,398);g.lineTo(848,402);g.closePath();g.fill();
  /* door panel, sill, armrest, handle */
  g.fillStyle='#20212a';g.fillRect(0,408,848,312);
  g.fillStyle=vgrad(g,408,444,[[0,'#2c2d37'],[1,'#20212a']]);g.fillRect(0,408,848,36);
  g.fillStyle='#2a2b35';rrect(g,36,444,790,36,14);g.fill();g.fillStyle='#353641';rrect(g,36,444,790,8,4);g.fill();
  g.fillStyle='#8d9099';rrect(g,640,456,74,12,6);g.fill();g.fillStyle='#b9bcc4';rrect(g,644,458,66,4,2);g.fill();
  g.fillStyle='#1a1b23';rrect(g,60,520,560,130,16);g.fill();g.fillStyle='#262730';g.fillRect(0,660,848,60);
  /* dash and console */
  g.fillStyle='#1c1d25';g.beginPath();g.moveTo(848,404);g.lineTo(880,350);g.lineTo(1280,338);g.lineTo(1280,720);g.lineTo(600,720);g.lineTo(600,600);g.quadraticCurveTo(700,480,848,404);g.closePath();g.fill();
  g.fillStyle='#2a2b34';g.beginPath();g.moveTo(880,350);g.lineTo(1280,338);g.lineTo(1280,354);g.lineTo(886,368);g.closePath();g.fill();
  g.fillStyle='#22232c';rrect(g,930,396,320,118,14);g.fill();g.strokeStyle='#15161c';g.lineWidth=2;rrect(g,930,396,320,118,14);g.stroke();
  g.fillStyle='#15161c';for(const x of[905,1200]){rrect(g,x-32,366,64,20,6);g.fill();}g.fillStyle='#2a2b34';for(const x of[905,1200])for(let y=369;y<384;y+=5)g.fillRect(x-28,y,56,2);
  g.fillStyle='#0d1a2a';rrect(g,740,470,130,170,12);g.fill();
  g.fillStyle='#22232c';rrect(g,640,560,180,220,22);g.fill();g.fillStyle='#2e2f38';circle(g,730,614,18);g.fill();g.fillStyle='#3a3b45';circle(g,726,610,8);g.fill();
  /* the passenger seat */
  g.fillStyle='#262830';rrect(g,318,286,304,380,50);g.fill();
  g.fillStyle='#2c2e38';rrect(g,362,318,216,330,40);g.fill();
  g.strokeStyle='#222330';g.lineWidth=2;for(let y=360;y<640;y+=46){g.beginPath();g.moveTo(372,y);g.lineTo(568,y);g.stroke();}
  g.fillStyle='#1f2028';g.fillRect(436,296,12,34);g.fillRect(492,296,12,34);
  g.fillStyle='#2b2d37';rrect(g,388,204,164,112,38);g.fill();g.fillStyle='#31333d';rrect(g,402,216,136,88,30);g.fill();
  g.fillStyle='#22232b';rrect(g,296,556,352,240,44);g.fill();g.fillStyle='#2a2b34';rrect(g,296,556,352,14,7);g.fill();
  return c;
}
function dt_vig(){const c=mk(W,H),g=c.getContext('2d'),vg=g.createRadialGradient(470,330,300,470,330,900);vg.addColorStop(0,'rgba(10,8,12,0)');vg.addColorStop(1,'rgba(10,8,12,.42)');g.fillStyle=vg;g.fillRect(0,0,W,H);return c;}

/* the belt: from the pillar behind her, over her shoulder, across to the buckle by the console */
function dt_belt(ctx){
  const path=()=>{ctx.beginPath();ctx.moveTo(272,236);ctx.quadraticCurveTo(330,330,400,398);ctx.quadraticCurveTo(480,470,560,600);};
  ctx.fillStyle='#15161c';rrect(ctx,256,222,34,26,5);ctx.fill();
  ctx.lineCap='butt';ctx.strokeStyle='#26272f';ctx.lineWidth=26;path();ctx.stroke();
  ctx.strokeStyle='#30313b';ctx.lineWidth=18;path();ctx.stroke();
  ctx.strokeStyle='rgba(255,255,255,.05)';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(262,232);ctx.quadraticCurveTo(320,326,390,394);ctx.quadraticCurveTo(470,466,550,596);ctx.stroke();
  ctx.fillStyle='#9a9ca3';rrect(ctx,546,596,30,22,4);ctx.fill();ctx.fillStyle='#c0392b';rrect(ctx,554,602,8,10,2);ctx.fill();
}
/* the gold hoops of 30 June, hung from the ears, following the tilt of her head */
function dt_hoops(ctx,x,y,s,tilt){
  const c=Math.cos(tilt),si=Math.sin(tilt);
  for(const d of[-1,1]){const lx=d*38,ly=14-46,X=lx*c-ly*si,Y=lx*si+ly*c+46;
    ctx.save();ctx.translate(x+X*s,y+Y*s);ctx.scale(s,s);ctx.rotate(tilt);
    ctx.strokeStyle=FB.gold;ctx.lineWidth=2.4;ctx.beginPath();ctx.arc(0,11,9.5,0,TAU);ctx.stroke();
    ctx.strokeStyle='rgba(255,250,220,.75)';ctx.lineWidth=1.1;ctx.beginPath();ctx.arc(0,11,9.5,Math.PI*1.1,Math.PI*1.55);ctx.stroke();
    ctx.restore();}
}

/* ---------- the frame: turned to the passenger seat ---------- */
function dt_car(ctx,lt,A,o){
  const t=o.t??lt,z=1+0.035*clamp(t/o.D),bob=Math.sin(lt*0.9)*1.2,k=dt_pose(t,o.keys),tilt=(k.tilt||0)+Math.sin(lt*0.5)*0.012;
  ctx.save();ctx.translate(470,330);ctx.scale(z,z);ctx.translate(-470,-330+bob);
  ctx.drawImage(A.out,0,0);
  if(o.bokeh){ctx.save();dt_winClip(ctx);bokeh(ctx,lt,o.bokeh.n,o.bokeh.seed,o.bokeh.cols,8,30,o.bokeh.a);ctx.restore();}
  ctx.save();dt_winClip(ctx);ctx.fillStyle=hgrad(ctx,220,980,[[0,'rgba(255,255,255,0)'],[0.42,`rgba(255,255,255,${o.glass})`],[0.6,'rgba(255,255,255,0)']]);ctx.fillRect(0,0,W,H);ctx.restore();
  ctx.drawImage(A.cab,0,0);
  if(o.spill){ctx.save();ctx.globalCompositeOperation='screen';glow(ctx,580,330,470,o.rim,o.spill);ctx.restore();}
  drawFabeha(ctx,470,300,1.25,{t:lt,outfit:o.outfit,hair:o.hair,pose:'knees',legCol:o.legCol,arms:'lap',smile:k.smile,look:(k.look||0)+0.025*Math.sin(lt*0.8),tilt,blush:k.blush,eyes:k.eyes,wind:0.04,len:o.len??250});
  if(o.kurta)jul_kurta(ctx,470,300,1.25);
  if(o.hoops)dt_hoops(ctx,470,300,1.25,tilt);
  dt_belt(ctx);
  ctx.save();ctx.globalCompositeOperation='screen';glow(ctx,620,230,260,o.rim,o.rimA);if(o.dash>0.1)glow(ctx,500,560,190,'#6fb7ff',o.dash*0.3);ctx.restore();
  /* the dashboard glow, bottom right */
  glow(ctx,830,560,250,'#6fb7ff',o.dash);glow(ctx,805,520,70,'#9fd0ff',o.dash*1.2);
  if(o.amber)glow(ctx,1000,430,140,'#ffb060',o.amber);
  ctx.fillStyle='#9fd0ff';ctx.globalAlpha=0.45+o.dash;for(const x of[770,790,810]){circle(ctx,x,492,2);ctx.fill();}ctx.globalAlpha=1;
  ctx.restore();
  ctx.drawImage(A.vig,0,0);
  ctx.fillStyle=o.tint;ctx.fillRect(0,0,W,H);
}

/* ---------- Pepsi Café, 7 February, before the car: a small table, the pizza box, the sign's red and blue in the window ---------- */
function dt_cafe(){
  const c=mk(W,H),g=c.getContext('2d');
  g.fillStyle=vgrad(g,0,540,[[0,'#2e1c1a'],[1,'#5a3a30']]);g.fillRect(0,0,W,H);
  g.fillStyle='#1d1312';rrect(g,760,70,460,360,14);g.fill();
  g.save();rrect(g,774,84,432,332,10);g.clip();g.fillStyle=vgrad(g,84,416,[[0,'#4b3f6e'],[0.55,'#c47a5e'],[1,'#5a4458']]);g.fillRect(774,84,432,332);
  g.fillStyle='#2f2538';for(const[x,w,h]of[[774,120,110],[900,90,80],[1000,150,120],[1150,80,90]])g.fillRect(x,330-h,w,h+90);
  sunGlow(g,900,220,180,'rgba(220,40,50,0.8)');sunGlow(g,1070,232,180,'rgba(20,80,180,0.8)');g.fillStyle='#d8262c';circle(g,900,220,46);g.fill();g.fillStyle='#1049a0';circle(g,1070,232,46);g.fill();
  g.fillStyle='rgba(255,255,255,.4)';ell(g,888,204,14,7,-0.5);g.fill();ell(g,1058,216,14,7,-0.5);g.fill();g.restore();
  g.strokeStyle='#1a1210';g.lineWidth=6;g.beginPath();g.moveTo(990,84);g.lineTo(990,416);g.moveTo(774,250);g.lineTo(1206,250);g.stroke();
  for(const x of[200,440,660]){g.strokeStyle='#1a1210';g.lineWidth=2;g.beginPath();g.moveTo(x,0);g.lineTo(x,120);g.stroke();g.fillStyle='#c8372f';g.beginPath();g.moveTo(x-32,152);g.lineTo(x-12,118);g.lineTo(x+12,118);g.lineTo(x+32,152);g.closePath();g.fill();g.fillStyle='#ffe3a8';ell(g,x,152,32,6);g.fill();sunGlow(g,x,164,190,'rgba(255,214,150,0.5)');}
  g.fillStyle='#2b1c18';g.fillRect(0,300,250,240);g.fillStyle='#3d2a24';g.fillRect(0,300,250,14);
  g.fillStyle='rgba(255,255,255,.08)';for(let k=0;k<5;k++)g.fillRect(20+k*46,230,20,62);
  g.fillStyle='#3a2622';for(const[x,y]of[[1160,470],[700,480]]){rrect(g,x-30,y-80,60,50,8);g.fill();g.fillRect(x-26,y-30,52,8);}
  const bgS=softened(c,4),h=bgS.getContext('2d');
  h.fillStyle=vgrad(h,540,H,[[0,'#8a5a3a'],[1,'#5a3a26']]);h.beginPath();h.moveTo(120,540);h.lineTo(1160,540);h.lineTo(1280,720);h.lineTo(0,720);h.closePath();h.fill();
  return bgS;
}
function dt_cafeTable(){
  const c=mk(W,H),g=c.getContext('2d');
  g.fillStyle=vgrad(g,540,H,[[0,'#8e5e3c'],[1,'#5c3c28']]);g.beginPath();g.moveTo(120,540);g.lineTo(1160,540);g.lineTo(1280,720);g.lineTo(0,720);g.closePath();g.fill();
  g.strokeStyle='rgba(255,220,180,.45)';g.lineWidth=2;g.beginPath();g.moveTo(120,541);g.lineTo(1160,541);g.stroke();
  g.fillStyle='rgba(255,255,255,.05)';for(let i=0;i<12;i++){ell(g,(i*211)%W,560+(i*47)%150,60+(i*17)%80,3);g.fill();}
  /* the pizza box, open: lid up behind, the creamy pizza in the base, one slice gone */
  g.fillStyle='#a87a4e';rrect(g,772,418,300,146,8);g.fill();g.fillStyle='#d8c3a0';rrect(g,784,430,276,122,6);g.fill();g.fillStyle='rgba(120,80,40,.18)';ell(g,900,500,70,40);g.fill();
  g.fillStyle='#c9a06a';rrect(g,760,556,324,40,6);g.fill();g.fillStyle='#b58b57';g.fillRect(760,590,324,8);
  g.fillStyle='#d9a560';ell(g,922,566,144,44);g.fill();g.fillStyle='#f3e4bf';ell(g,922,566,126,36);g.fill();
  const r=rng(777);g.fillStyle='#e8d3a5';for(let i=0;i<40;i++){const a=r()*TAU,d=r();ell(g,922+Math.cos(a)*118*d,566+Math.sin(a)*32*d,4+r()*5,2.5+r()*2,a);g.fill();}
  g.fillStyle='#8a6a52';for(let i=0;i<14;i++){const a=r()*TAU,d=0.2+r()*0.75;ell(g,922+Math.cos(a)*118*d,566+Math.sin(a)*32*d,5,3,a);g.fill();}
  g.fillStyle='#6a8a52';for(let i=0;i<10;i++){const a=r()*TAU,d=0.2+r()*0.75;circle(g,922+Math.cos(a)*118*d,566+Math.sin(a)*32*d,2);g.fill();}
  g.strokeStyle='rgba(120,80,40,.4)';g.lineWidth=1.5;for(let k=0;k<4;k++){const a=k/4*Math.PI;g.beginPath();g.moveTo(922-Math.cos(a)*126,566-Math.sin(a)*36);g.lineTo(922+Math.cos(a)*126,566+Math.sin(a)*36);g.stroke();}
  g.fillStyle='#c9a06a';g.beginPath();g.moveTo(922,566);g.lineTo(922+Math.cos(0.2)*150,566+Math.sin(0.2)*46);g.lineTo(922+Math.cos(0.95)*150,566+Math.sin(0.95)*46);g.closePath();g.fill();
  /* two glasses of water, a napkin */
  for(const[x,y]of[[300,566],[372,582]]){g.fillStyle='rgba(205,228,240,.55)';rrect(g,x-16,y-54,32,60,5);g.fill();g.fillStyle='rgba(170,210,235,.6)';rrect(g,x-14,y-28,28,32,4);g.fill();g.fillStyle='rgba(255,255,255,.5)';g.fillRect(x-12,y-50,3,50);}
  g.fillStyle='#f4efe6';g.save();g.translate(560,600);g.rotate(0.12);rrect(g,-40,-14,80,28,4);g.fill();g.restore();
  return c;
}
const DT_CAFE_K=[[0,{look:0.04,smile:0.6,tilt:-0.03,blush:0.4}],[2.6,{look:0.5,smile:0.5,tilt:0.04,blush:0.4},0.8],[4.6,{look:0.02,smile:1,tilt:0.02,blush:0.5,eyes:'happy'},0.6],[6.6,{look:0.04,smile:0.78,tilt:0,blush:0.5},0.6]];
function dt_cafeDraw(ctx,lt,A){
  ctx.drawImage(A.cafe,0,0);
  bokeh(ctx,lt,18,207,['#ffd8a0','#ff9a8a','#8ab0ff'],6,22,0.4);
  const k=dt_pose(lt,DT_CAFE_K);
  drawFabeha(ctx,500,318,1.2,{t:lt,outfit:'sage',hair:'low',pose:'bust',arms:'lap',smile:k.smile,look:(k.look||0)+0.02*Math.sin(lt*0.8),tilt:(k.tilt||0)+Math.sin(lt*0.5)*0.012,blush:k.blush,eyes:k.eyes,wind:0.05});
  ctx.drawImage(A.table,0,0);
  ctx.save();ctx.globalCompositeOperation='screen';glow(ctx,440,150,320,'#ffd9a8',0.16);ctx.restore();
  ctx.fillStyle='rgba(255,180,120,.08)';ctx.fillRect(0,0,W,H);
  ctx.drawImage(A.vig,0,0);
}

/* ---------- her, in the seat: the same shape every time — she looks at him, looks away, looks back, and smiles ---------- */
const DT_K7=[[0,{look:0.04,smile:0.55,tilt:0.02,blush:0.35}],[2.8,{look:0.8,smile:0.45,tilt:0.08,blush:0.35},1.1],[7.0,{look:0.03,smile:0.82,tilt:0.02,blush:0.5},1.0],[10.4,{look:0.04,smile:1,tilt:0.04,blush:0.55,eyes:'happy'},0.4],[12.2,{look:0.04,smile:0.85,tilt:0.02,blush:0.55},0.5],[14.6,{look:-0.45,smile:0.6,tilt:-0.06,blush:0.5},1.0],[17.6,{look:0.02,smile:0.8,tilt:0,blush:0.5},1.0]];
const DT_K30=[[0,{look:0.03,smile:0.6,tilt:0.0,blush:0.38}],[3.4,{look:0.82,smile:0.5,tilt:0.09,blush:0.38},1.2],[8.6,{look:0.03,smile:0.85,tilt:0.02,blush:0.52},1.0],[12.0,{look:0.04,smile:1,tilt:0.05,blush:0.58,eyes:'happy'},0.4],[13.8,{look:0.04,smile:0.88,tilt:0.02,blush:0.55},0.5],[17.0,{look:-0.5,smile:0.62,tilt:-0.07,blush:0.5},1.0],[20.8,{look:0.02,smile:0.84,tilt:0.0,blush:0.52},1.0]];
const DT_K1=[[0,{look:0.03,smile:0.5,tilt:-0.02,blush:0.4}],[2.4,{look:-0.5,smile:0.45,tilt:-0.08,blush:0.4},1.0],[6.8,{look:0.03,smile:0.8,tilt:0.02,blush:0.52},1.0],[11.0,{look:0.8,smile:0.6,tilt:0.08,blush:0.5},1.2],[14.6,{look:0.02,smile:0.95,tilt:0.03,blush:0.58},0.9],[17.8,{look:0.03,smile:1,tilt:0.04,blush:0.6,eyes:'happy'},0.4],[19.6,{look:0.02,smile:0.86,tilt:0.0,blush:0.56},0.6]];
const DT_K2=[[0,{look:0.04,smile:0.62,tilt:0.02,blush:0.4}],[3.0,{look:0.8,smile:0.5,tilt:0.09,blush:0.4},1.2],[7.4,{look:0.03,smile:0.84,tilt:0.02,blush:0.5},1.0],[11.4,{look:-0.42,smile:0.58,tilt:-0.06,blush:0.5},1.0],[15.0,{look:0.02,smile:0.9,tilt:0.0,blush:0.55},1.0],[18.4,{look:0.03,smile:1,tilt:0.04,blush:0.6,eyes:'happy'},0.4],[20.2,{look:0.02,smile:0.86,tilt:0.0,blush:0.56},0.6]];
const DT_K29=[[0,{look:0.03,smile:0.56,tilt:0.0,blush:0.4}],[3.6,{look:0.8,smile:0.48,tilt:0.08,blush:0.4},1.2],[9.0,{look:0.03,smile:0.8,tilt:0.02,blush:0.5},1.1],[13.0,{look:0.04,smile:1,tilt:0.04,blush:0.58,eyes:'happy'},0.4],[14.8,{look:0.04,smile:0.86,tilt:0.02,blush:0.56},0.5],[18.6,{look:-0.48,smile:0.6,tilt:-0.07,blush:0.52},1.0],[22.6,{look:0.02,smile:0.82,tilt:0.0,blush:0.54},1.2]];

/* ====================================================================================================
   7 February · 18:30 — after the sunflowers: Pepsi Café, a creamy pizza, and then the car, for hours
   ==================================================================================================== */
scene({id:'car7feb',name:'7 February · the car',when:'2026-02-07T18:30',bars:9,fin:['#000000',1.2],fout:['#000000',1.4],
  note:'after the sunflowers, Pepsi Café: a creamy pizza in its open box across a small table, the sign’s red and blue in the window behind her; then the car outside at the end of the afternoon, turned to the passenger seat, the sage shirt, her hair tied low, for hours.',
  tag:'7 Feb · “her liking is my liking”',
  prep(){return{cafe:dt_cafe(),table:dt_cafeTable(),cab:dt_cab(),vig:dt_vig(),
    out:dt_outside({seed:702,sky:[[0,'#4b3f6e'],[0.45,'#c47a5e'],[0.75,'#f0c48c'],[1,'#f6dcb0']],far:'#5a4458',street:'#3a2f3c',winLit:'rgba(255,220,160,.55)',sign:true,trees:3,tree:'#3c4a3a',ground:['#5a5560','#3e3a44'],kerb:'#8a8590',lamps:[420,1010],blur:6})};},
  draw(ctx,lt,A){
    if(lt<9)dt_cafeDraw(ctx,lt,A);
    else dt_car(ctx,lt,A,{t:lt-9,D:21,keys:DT_K7,outfit:'sage',hair:'low',legCol:'#2b2b2e',len:190,tint:'rgba(255,170,110,.09)',rim:'#ffc890',rimA:0.16,spill:0.07,dash:0.13,amber:0.05,glass:0.07,bokeh:{n:14,seed:703,cols:['#ffd27a','#ff6a6a','#6a9bff'],a:0.35}});
    const dip=smooth(8.5,9,lt)*(1-smooth(9,9.6,lt));if(dip>0){ctx.fillStyle=`rgba(0,0,0,${dip.toFixed(3)})`;ctx.fillRect(0,0,W,H);}
  },
  subs:[
    [0.8,8.2,'After the sunflowers, Pepsi Café. We ordered a creamy pizza. I didn’t like it. But her liking is my liking.'],
    [11.0,15.2,'And then the car, for hours.'],
    [17.4,22.6,'She looked majestic. Her eyes, celestial.'],
  ],
  score({hit,bars,melody,THEME_B,THEME_B_CH}){
    bars(0,3,['G','Cmaj7','Em7'],{padVel:0.34,arp:true,arpVel:0.12});
    hit(9.0,'swell',{dur:1.6,vel:0.22});
    bars(3,6,THEME_B_CH,{padVel:0.4,strings:true});
    for(let b=3;b<9;b++)melody(b,b-3,'piano',0,0.36,THEME_B);
    hit(23.4,'chime',{midi:88,vel:0.22});
  },
  amb(lt){return lt<9?{room:0.2,crowd:0.12}:{hum:0.2};},
});

/* ====================================================================================================
   30 June · 15:00 — the afternoon of the date: the grey-white kurta with the dark print, hair down, gold hoops
   ==================================================================================================== */
scene({id:'car30jun',name:'30 June · the car',when:'2026-06-30T15:00',bars:8,fin:['#000000',1.2],fout:['#000000',1.4],
  note:'three in the afternoon, parked on campus in the flat white light: the grey-white kurta with its dark-grey print and the embroidered neckline, her hair down, gold hoops, the belt across her; hours of just looking at each other.',
  tag:'30 Jun · the car',
  prep(){return{cab:dt_cab(),vig:dt_vig(),
    out:dt_outside({seed:630,sky:[[0,'#7fb6e6'],[0.5,'#cfe4f3'],[1,'#f3efe3']],sun:[1000,70,420,'rgba(255,250,225,0.8)'],far:'#b9c6cf',brick:'#9a4b3b',winLit:'rgba(255,255,255,.14)',trees:5,tree:'#3f7a46',ground:['#8fb866','#6f9a4e'],blur:6})};},
  draw(ctx,lt,A){
    dt_car(ctx,lt,A,{D:26.7,keys:DT_K30,outfit:'floral',hair:'down',legCol:'#3a3540',hoops:true,len:250,tint:'rgba(255,246,225,.07)',rim:'#fff5dc',rimA:0.18,spill:0.14,dash:0.06,glass:0.1});
  },
  subs:[
    [1.0,5.8,'30 June. Hours in the car, just looking at each other.'],
    [14.2,18.8,'Majestic. Her eyes, celestial.'],
  ],
  score({hit,bars,melody,THEME_B,THEME_B_CH}){
    bars(0,8,THEME_B_CH,{padVel:0.38});
    for(let b=1;b<8;b++)melody(b,b-1,'box',12,0.32,THEME_B);
    hit(14.2,'chime',{midi:91,vel:0.2});
  },
  amb(lt){return{hum:0.16,wind:0.05};},
});

/* ====================================================================================================
   1 July · 19:40 — after Safeet: the pink pastel kurta, dusk, the first lamps on
   ==================================================================================================== */
scene({id:'car1jul',name:'1 July · Safeet, and the car',when:'2026-07-01T19:40',bars:8,fin:['#000000',1.2],fout:['#000000',1.4],
  note:'twenty to eight, the car after Safeet: the pink pastel kurta, her hair down, the dusk going violet behind the glass and the first campus lamps coming on, the dash glow on her hands.',
  tag:'1 Jul · the car',
  prep(){return{cab:dt_cab(),vig:dt_vig(),
    out:dt_outside({seed:701,sky:[[0,'#2c2a5e'],[0.45,'#8d5a86'],[0.75,'#f0a06a'],[1,'#ffd3a0']],far:'#4a3a58',brick:'#6e3a30',winLit:'rgba(255,220,160,.5)',trees:4,tree:'#2b3a30',trunk:'#1e1812',treeHi:'rgba(255,200,150,.08)',ground:['#4f6b3e','#3a4f30'],lamps:[560,1120],stars:true,blur:6})};},
  draw(ctx,lt,A){
    dt_car(ctx,lt,A,{D:26.7,keys:DT_K1,outfit:'home',kurta:true,hair:'down',legCol:'#ead9df',len:260,tint:'rgba(255,150,110,.1)',rim:'#ffb080',rimA:0.17,spill:0.05,dash:0.18,amber:0.07,glass:0.05,bokeh:{n:10,seed:711,cols:['#ffd27a','#ffb37a'],a:0.3}});
  },
  subs:[
    [1.0,6.6,'At Safeet, and in the car, we would just sit and look at each other. Hours.'],
    [15.2,19.2,'Majestic, every time.'],
  ],
  score({hit,bars,melody,THEME_B,THEME_B_CH}){
    bars(0,8,THEME_B_CH,{padVel:0.4,strings:true});
    for(let b=0;b<8;b++)melody(b,b,'box',12,0.3,THEME_B);
    for(let b=4;b<8;b++)melody(b,b,'piano',-12,0.2,THEME_B);
    hit(15.2,'chime',{midi:88,vel:0.2});
  },
  amb(lt){return{hum:0.18};},
});

/* ====================================================================================================
   2 July · 15:00 — Commerce, then the car: the black dress, hair half up, the afternoon
   ==================================================================================================== */
scene({id:'car2jul',name:'2 July · Commerce, and the car',when:'2026-07-02T15:00',bars:8,fin:['#000000',1.2],fout:['#000000',1.4],
  note:'three o’clock, the car after Commerce: the black dress with its gold sparkle, her hair half up, the brick and the lawns bright behind the glass, nothing said, for hours.',
  tag:'2 Jul · the car',
  prep(){return{cab:dt_cab(),vig:dt_vig(),
    out:dt_outside({seed:702,sky:[[0,'#6fa9e0'],[0.5,'#c9def0'],[1,'#efe3c8']],sun:[1050,60,420,'rgba(255,240,200,0.8)'],far:'#b4bfc8',brick:'#9a4b3b',winLit:'rgba(255,255,255,.14)',trees:4,tree:'#447a48',ground:['#9bbd6a','#789e52'],blur:6})};},
  draw(ctx,lt,A){
    dt_car(ctx,lt,A,{D:26.7,keys:DT_K2,outfit:'black',hair:'halfup',legCol:'#17131c',len:250,tint:'rgba(255,230,180,.08)',rim:'#fff0cc',rimA:0.16,spill:0.13,dash:0.06,glass:0.12});
  },
  subs:[
    [1.0,6.4,'Commerce, then the car. Looking at each other, saying nothing, for hours.'],
    [15.2,19.0,'Her eyes. Celestial.'],
  ],
  score({hit,bars,melody,THEME_B,THEME_B_CH}){
    bars(0,8,THEME_B_CH,{padVel:0.36,arp:true,arpVel:0.1,step:1});
    for(let b=1;b<8;b++)melody(b,b-1,'piano',0,0.34,THEME_B);
    hit(15.2,'chime',{midi:91,vel:0.2});
  },
  amb(lt){return{hum:0.16,wind:0.05};},
});

/* ====================================================================================================
   29 August · 18:40 — the last time: the car again, the street lights starting
   ==================================================================================================== */
scene({id:'car29aug',name:'29 August · the car, again',when:'2026-08-29T18:40',bars:9,fin:['#000000',1.2],fout:['#000000',1.6],
  note:'twenty to seven, the last time: the car again, turned to the passenger seat; the black dress, her hair half up; the sky going blue behind her, the street lights just starting, the dash glow under her chin.',
  tag:'29 Aug · the last time',
  prep(){return{cab:dt_cab(),vig:dt_vig(),
    out:dt_outside({seed:829,sky:[[0,'#141a3e'],[0.5,'#3a3568'],[0.8,'#b4624e'],[1,'#e9a070']],far:'#1d1a30',street:'#221d2e',winLit:'rgba(255,214,150,.6)',trees:3,tree:'#1a2420',trunk:'#120f14',treeHi:'rgba(255,183,90,.06)',ground:['#3a3640','#26242c'],kerb:'#5a5560',lamps:[380,760,1140],lampCol:'#ffb75a',lampGlow:'rgba(255,183,90,0.6)',stars:true,blur:6})};},
  draw(ctx,lt,A){
    dt_car(ctx,lt,A,{D:30,keys:DT_K29,outfit:'black',hair:'halfup',legCol:'#17131c',len:250,tint:'rgba(90,110,200,.08)',rim:'#ffb86a',rimA:0.2,dash:0.26,amber:0.08,glass:0.04,bokeh:{n:22,seed:830,cols:['#ffb75a','#ffd98a','#ff8a6a','#8ab8ff'],a:0.5}});
  },
  subs:[
    [1.0,5.6,'The last time. The car, for hours, like every time.'],
    [16.2,21.4,'Majestic. I don’t have another word.'],
  ],
  score({hit,bars,melody,THEME_B,THEME_B_CH}){
    bars(0,9,THEME_B_CH,{padVel:0.42,strings:true});
    for(let b=0;b<8;b++)melody(b,b,'box',12,0.3,THEME_B);
    melody(8,7,'piano',0,0.26,THEME_B);
    hit(16.2,'chime',{midi:88,vel:0.22});hit(27.0,'chime',{midi:91,vel:0.18});
  },
  amb(lt){return{hum:0.2};},
});
