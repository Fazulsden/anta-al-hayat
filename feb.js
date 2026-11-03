/* feb.js — February 2026: the road to the first date, the sunflower patch, the twelve photos. */
'use strict';

/* ---------- shared: the view from the driver's seat of his car (right-hand drive), his hands on the wheel ---------- */
function cockpit(ctx,lt,o={}){
  const dark=!!o.dark,bob=Math.sin(lt*9)*0.8;
  ctx.save();ctx.translate(0,bob);
  ctx.fillStyle=dark?'#0c0d12':'#1a1b22';
  ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(W,0);ctx.lineTo(W,74);ctx.quadraticCurveTo(640,44,0,74);ctx.closePath();ctx.fill();
  ctx.beginPath();ctx.moveTo(0,74);ctx.lineTo(74,74);ctx.lineTo(0,440);ctx.closePath();ctx.fill();
  ctx.beginPath();ctx.moveTo(W,74);ctx.lineTo(W-74,74);ctx.lineTo(W,440);ctx.closePath();ctx.fill();
  ctx.fillStyle='#2a2b34';ctx.fillRect(600,60,80,14);ctx.fillStyle='#0a0b10';rrect(ctx,540,66,200,58,8);ctx.fill();
  if(o.mirror){ctx.save();rrect(ctx,540,66,200,58,8);ctx.clip();o.mirror(ctx);ctx.restore();}
  ctx.fillStyle=dark?'#111218':'#1c1d25';ctx.beginPath();ctx.moveTo(0,478);ctx.quadraticCurveTo(640,426,W,478);ctx.lineTo(W,720);ctx.lineTo(0,720);ctx.closePath();ctx.fill();
  ctx.fillStyle=dark?'#191a21':'#262830';ctx.beginPath();ctx.moveTo(0,478);ctx.quadraticCurveTo(640,426,W,478);ctx.lineTo(W,506);ctx.quadraticCurveTo(640,454,0,506);ctx.closePath();ctx.fill();
  ctx.fillStyle=dark?'#0d1a2a':'#16263a';rrect(ctx,760,520,280,70,10);ctx.fill();glow(ctx,900,556,150,'#6fb7ff',dark?0.18:0.1);
  ctx.strokeStyle=dark?'#6fb7ff':'#9fd0ff';ctx.lineWidth=2;for(const cx of[830,970]){ctx.beginPath();ctx.arc(cx,560,26,Math.PI*0.75,Math.PI*2.25);ctx.stroke();ctx.beginPath();ctx.moveTo(cx,560);ctx.lineTo(cx+Math.cos(Math.PI*1.2+Math.sin(lt*0.7)*0.2)*20,560+Math.sin(Math.PI*1.2+Math.sin(lt*0.7)*0.2)*20);ctx.stroke();}
  ctx.strokeStyle='#14151a';ctx.lineWidth=34;ctx.beginPath();ctx.arc(900,760,210,Math.PI*1.08,Math.PI*1.92);ctx.stroke();
  ctx.strokeStyle='#30323a';ctx.lineWidth=22;ctx.beginPath();ctx.arc(900,760,210,Math.PI*1.08,Math.PI*1.92);ctx.stroke();
  ctx.strokeStyle=HIS.skin;ctx.lineCap='round';ctx.lineWidth=44;ctx.beginPath();ctx.moveTo(760,740);ctx.lineTo(738,628);ctx.moveTo(1040,740);ctx.lineTo(1058,620);ctx.stroke();
  ctx.fillStyle=HIS.skin;ell(ctx,735,610,30,42,-0.5);ctx.fill();ell(ctx,1060,600,30,42,0.5);ctx.fill();
  ctx.fillStyle=HIS.skinSh;for(const[x,y,r]of[[722,580,-0.6],[1074,572,0.6]]){ell(ctx,x,y,10,18,r);ctx.fill();}
  ctx.restore();
}
/* ---------- shared: the Karachi–Hyderabad motorway through the windscreen (flat Sindh, kikar trees, a truck, a sign) ---------- */
function motorway(ctx,lt,o={}){
  const night=!!o.night,spd=o.spd||0.55;
  if(night){paintSky(ctx,[[0,'#05060f'],[0.6,'#0d1020'],[0.72,'#1a1a28']]);stars(ctx,lt,220,601,420,0.8);}
  else{paintSky(ctx,[[0,'#6fa9e0'],[0.45,'#b8d6ef'],[0.7,'#f1e4c9']]);sunGlow(ctx,180,110,420,'rgba(255,240,200,0.75)');}
  ctx.fillStyle=night?'#15141a':vgrad(ctx,432,720,[[0,'#cdbf98'],[1,'#a89670']]);ctx.fillRect(0,432,W,288);
  const r=rng(602);
  for(let i=0;i<34;i++){const side=i%2?1:-1,u=((r()+lt*spd*0.18)%1),x=640+side*(90+r()*60)*(0.3+u*4.2),y=432+u*u*230,s=0.12+u*1.3;if(x<-80||x>W+80)continue;
    ctx.fillStyle=night?'#0a0a10':'#5b6b3e';ctx.fillRect(x-2*s,y-30*s,4*s,30*s);ctx.fillStyle=night?'#0e0f14':'#4f7a3a';ell(ctx,x,y-38*s,26*s,16*s);ctx.fill();ell(ctx,x-10*s,y-30*s,14*s,10*s);ctx.fill();}
  for(let k=0;k<7;k++){const u=((k/7+lt*spd*0.25)%1),x=560-u*u*900,y=432+u*u*230,s=0.1+u*1.6;if(x>-60){ctx.fillStyle=night?'#0b0b10':'#6b6660';ctx.fillRect(x-2*s,y-70*s,4*s,70*s);ctx.fillRect(x-10*s,y-68*s,20*s,3*s);}}
  ctx.fillStyle=night?'#2a2b33':'#4a4b50';ctx.beginPath();ctx.moveTo(585,432);ctx.lineTo(695,432);ctx.lineTo(1280,720);ctx.lineTo(0,720);ctx.closePath();ctx.fill();
  ctx.fillStyle=night?'#8b8f98':'#d9dde3';ctx.beginPath();ctx.moveTo(585,432);ctx.lineTo(0,720);ctx.lineTo(50,720);ctx.lineTo(592,432);ctx.closePath();ctx.fill();ctx.beginPath();ctx.moveTo(695,432);ctx.lineTo(1280,720);ctx.lineTo(1230,720);ctx.lineTo(688,432);ctx.closePath();ctx.fill();
  ctx.fillStyle=night?'#c8c3a8':'#e8e4d6';for(let k=0;k<7;k++){const u=((lt*spd+k/7)%1),y=432+u*u*288,w=3+u*22,h=5+u*36;ctx.fillRect(640-w/2+(u*u)*14,y,w,h);}
  if(o.truck!==false){const u=0.22+0.1*Math.sin(lt*0.25),s=0.25+u*1.1,x=640+40*u,y=434+u*u*200;
    ctx.fillStyle='#2a6b3a';rrect(ctx,x-46*s,y-74*s,92*s,74*s,6*s);ctx.fill();ctx.fillStyle='#d9a441';ctx.fillRect(x-46*s,y-50*s,92*s,8*s);ctx.fillStyle='#c0392b';ctx.fillRect(x-46*s,y-30*s,92*s,8*s);
    ctx.fillStyle='#f1e7c6';for(let k=0;k<6;k++){circle(ctx,x-36*s+k*14*s,y-62*s,3*s);ctx.fill();}ctx.fillStyle='#111';ctx.fillRect(x-40*s,y-6*s,18*s,8*s);ctx.fillRect(x+22*s,y-6*s,18*s,8*s);
    if(night){ctx.fillStyle='#ff4d3a';circle(ctx,x-34*s,y-12*s,4*s);ctx.fill();circle(ctx,x+34*s,y-12*s,4*s);ctx.fill();}}
  if(o.sign){const u=((lt*spd*0.22+0.35)%1),s=0.1+u*1.7,x=760+u*u*520,y=434+u*u*230;if(s>0.2){ctx.fillStyle='#777';ctx.fillRect(x-3*s,y-90*s,6*s,90*s);ctx.fillStyle='#1d6b3a';rrect(ctx,x-70*s,y-150*s,140*s,62*s,6*s);ctx.fill();ctx.fillStyle='#fff';ctx.font=`700 ${Math.max(6,22*s)}px "Mulish",sans-serif`;ctx.textAlign='center';ctx.fillText(o.sign,x,y-118*s);ctx.font=`600 ${Math.max(5,16*s)}px "Mulish",sans-serif`;ctx.fillText(o.sign2||'',x,y-98*s);}}
  if(!night){ctx.fillStyle='rgba(255,240,210,.12)';ctx.fillRect(0,0,W,H);}
}

/* ---------- 7 February · 09:03 — four hours of road for the first date, and the first "babe" ---------- */
const DRIVE7=[
  {at:0.0, who:'me', time:'00:55',text:'Bro when should i leave for campus?'},
  {at:0.0, who:'her',time:'06:47',text:'Bro aram se 9 tak nikal lena koi itni jaldi jhi hai'},
  {at:0.0, who:'her',time:'06:59',text:'Campus kay liye aram se 11 tak'},
  {at:12.4,who:'me', time:'09:03',text:'Okk babe'},
  {at:15.4,who:'me', time:'09:03',text:'Ill be there around 11-11:15'},
  {at:18.6,who:'her',time:'09:04',text:'Chalo perf'},
];
scene({id:'drive7',name:'7 February · four hours',when:'2026-02-07T09:03',bars:8,fin:['#000000',1.2],fout:['#000000',1.2],
  note:'the Super Highway at nine in the morning on four hours of sleep; the phone in the dash mount; the first “babe” in the whole chat.',
  tag:'“Okk babe” · “Chalo perf”',
  prep(){return{};},
  draw(ctx,lt,A){
    motorway(ctx,lt,{sign:'KARACHI',sign2:'120 km',spd:0.6});
    cockpit(ctx,lt,{});
    ctx.save();ctx.translate(150,282);ctx.rotate(-0.05);ctx.scale(0.62,0.62);
    const S=drawPhone(ctx,0,0,PHONE.w,PHONE.h,{});
    chatPanel(ctx,S,DRIVE7,lt,{name:'Fabeha',status:'online',dark:false,draft:lt>10&&lt<12.4?'Okk babe':undefined});
    phoneTop(ctx,S,{time:lt<18.6?'09:03':'09:04'});
    ctx.fillStyle='#2a2b34';ctx.fillRect(-16,PHONE.h-40,PHONE.w+32,22);ctx.restore();
    sunGlow(ctx,180,110,300,'rgba(255,240,200,0.25)');
  },
  subs:[
    [0.6,4.8,'7 February. Four hours of sleep, then four hours of road to Karachi, for the first date.'],
    [5.2,8.8,'Bro aram se 9 tak nikal lena koi itni jaldi jhi hai','her'],
    [9.2,11.8,'Campus kay liye aram se 11 tak','her'],
    [12.6,14.6,'Okk babe','him'],
    [15.0,18.2,'The first “babe” in the whole chat. I didn’t notice I’d typed it. She didn’t say anything.'],
    [18.8,20.6,'Chalo perf','her'],
    [21.2,25.6,'The Super Highway, the sun coming up behind me, a truck to overtake. I wasn’t tired at all.'],
  ],
  score({T,hit,pad,melody,bars,CH,THEME_C}){
    bars(0,8,['G','Cmaj7','Am7','D'],{padVel:0.4,bass:true,bassVel:0.38});
    for(let b=0;b<8;b++){const c=['G','Cmaj7','Am7','D'][b%4],p=CH[c].p;[0,0.5,1,1.5,2,2.5,3,3.5].forEach((q,k)=>{if(k%2===0||b>=2)hit(b*BAR+q*BEAT,'pluck',{midi:p[(k%4)===0?1:(k%4)===1?2:(k%4)===2?3:2]+12,vel:0.42});});if(b>=2&&b<6)melody(b,b-2,'piano',0,0.42,THEME_C);}
    hit(12.4,'tick',{});hit(15.4,'tick',{});hit(18.6,'tick',{hi:true});
  },
  amb(lt){return{hum:0.7,wind:0.18};},
});

/* ---------- 7 February · the Karachi University graveyard, then the sunflower field by the bio department ---------- */
/* the KU graveyard: whitewashed wall, old neem trees, rows of graves, a dusty path; built once */
function feb_graveyard(){
  const c=mk(W,H),g=c.getContext('2d'),r=rng(631);
  g.fillStyle=vgrad(g,0,H,[[0,'#b9d3e6'],[0.45,'#e6e2d2'],[1,'#e9e1cc']]);g.fillRect(0,0,W,H);
  /* far trees beyond the wall */
  for(let k=0;k<14;k++)drawTreeClump(g,k*100+r()*40,350,90+r()*60,'#2f5a32','#5f8f4a',r);
  /* the boundary wall */
  g.fillStyle='#ece6d8';g.fillRect(0,330,W,58);g.fillStyle='#d8d0bd';g.fillRect(0,330,W,7);g.fillStyle='rgba(120,100,70,.18)';for(let x=0;x<W;x+=64)g.fillRect(x,337,2,51);
  g.fillStyle='rgba(90,80,60,.25)';g.fillRect(0,386,W,4);
  /* ground */
  g.fillStyle=vgrad(g,388,H,[[0,'#d9cfb4'],[0.5,'#c9bd98'],[1,'#b3a57c']]);g.fillRect(0,388,W,H-388);
  for(let i=0;i<260;i++){const y=392+Math.pow(r(),1.6)*328,x=r()*W;g.fillStyle=r()<0.5?'rgba(110,140,70,.35)':'rgba(150,120,80,.25)';ell(g,x,y,3+(y-388)*0.05,1+(y-388)*0.012,r());g.fill();}
  /* the path to the far end */
  g.fillStyle='rgba(240,232,212,.75)';g.beginPath();g.moveTo(600,390);g.lineTo(680,390);g.lineTo(860,H);g.lineTo(420,H);g.closePath();g.fill();
  /* rows of graves either side of the path, receding */
  const rows=[];for(let k=0;k<7;k++){const u=k/6,y=404+u*u*156,s=Math.max(0.12,(y-388)/172);rows.push({y,s});}
  for(const{y,s}of rows){
    for(const side of[-1,1]){
      for(let j=0;j<5;j++){
        const x=640+side*(120*s+50+j*92*s)+(r()-0.5)*10*s;if(x<-120||x>W+120)continue;
        const w=58*s,h=18*s;
        const gw=34*s,gh=24*s;
        g.fillStyle='rgba(60,50,30,.22)';ell(g,x+4*s,y+3*s,gw*0.7,gh*0.45);g.fill();
        g.fillStyle='#f2efe6';rrect(g,x-gw/2,y-gh,gw,gh,4*s);g.fill();
        g.fillStyle='#c9bd9c';ell(g,x,y-gh*0.45,gw*0.36,gh*0.36);g.fill();
        if(r()<0.35){g.fillStyle='#2f6b3a';ell(g,x,y-gh*0.45,gw*0.36,gh*0.36);g.fill();g.strokeStyle='rgba(255,220,120,.7)';g.lineWidth=1.2*s;ell(g,x,y-gh*0.45,gw*0.3,gh*0.3);g.stroke();}
        g.fillStyle='#eeeae0';g.beginPath();g.moveTo(x-9*s,y-gh+2*s);g.lineTo(x-9*s,y-gh-22*s);g.arc(x,y-gh-22*s,9*s,Math.PI,0);g.lineTo(x+9*s,y-gh+2*s);g.closePath();g.fill();
        g.fillStyle='rgba(0,0,0,.14)';g.fillRect(x+4*s,y-gh-24*s,3*s,26*s);g.fillStyle='rgba(90,80,60,.35)';g.fillRect(x-5*s,y-gh-16*s,10*s,1.4*s);g.fillRect(x-5*s,y-gh-12*s,10*s,1.4*s);
      }
    }
  }
  /* two old neem trees in the foreground, left and right, framing the path */
  for(const[x,lean]of[[150,0.08],[1150,-0.1]]){
    g.strokeStyle='#5b4632';g.lineCap='round';g.lineWidth=46;g.beginPath();g.moveTo(x,H+20);g.quadraticCurveTo(x+lean*300,420,x+lean*520,120);g.stroke();
    g.lineWidth=20;g.beginPath();g.moveTo(x+lean*380,300);g.quadraticCurveTo(x+lean*700+(lean>0?120:-120),220,x+(lean>0?260:-260),140);g.stroke();
    g.strokeStyle='rgba(255,240,210,.18)';g.lineWidth=8;g.beginPath();g.moveTo(x-12,H);g.quadraticCurveTo(x+lean*300-12,430,x+lean*520-10,140);g.stroke();
  }
  /* canopy */
  for(let i=0;i<70;i++){const x=r()*W,y=r()*170-20,R=50+r()*90;g.fillStyle=r()<0.5?'#2c5230':'#3d6b3c';g.globalAlpha=0.85;circle(g,x,y,R);g.fill();}
  g.globalAlpha=1;for(let i=0;i<160;i++){g.fillStyle='rgba(150,200,110,.35)';ell(g,r()*W,r()*190,6+r()*10,3+r()*4,r()*3);g.fill();}
  return c;
}
/* standing legs under drawFabeha (its own poses stop at the hips), in her local units */
function feb_legs(g,x,y,s,col,t){
  g.save();g.translate(x,y);g.scale(s,s);g.fillStyle=col||'#24211f';
  g.beginPath();g.moveTo(-58,190);g.lineTo(-46,338);g.lineTo(-12,338);g.lineTo(-4,196);g.closePath();g.fill();
  g.beginPath();g.moveTo(58,190);g.lineTo(46,338);g.lineTo(12,338);g.lineTo(4,196);g.closePath();g.fill();
  g.fillStyle='#e9e2d6';rrect(g,-50,332,40,16,7);g.fill();rrect(g,10,332,40,16,7);g.fill();
  g.fillStyle='rgba(50,40,25,.28)';ell(g,0,350,86,12);g.fill();g.restore();
}
function feb_dapple(ctx,lt,seed,alpha){
  const r=rng(seed);ctx.save();ctx.globalCompositeOperation='screen';
  for(let i=0;i<34;i++){const x=r()*W,y=300+r()*420,R=14+r()*40,a=alpha*(0.25+0.25*Math.sin(lt*0.9+i));ctx.fillStyle=`rgba(255,236,190,${a.toFixed(3)})`;ell(ctx,x+Math.sin(lt*0.4+i)*6,y,R,R*0.42);ctx.fill();}
  for(let k=0;k<4;k++){const x=260+k*240;const gr=ctx.createLinearGradient(x,0,x-160,H);gr.addColorStop(0,`rgba(255,240,200,${(0.12*alpha).toFixed(3)})`);gr.addColorStop(1,'rgba(255,240,200,0)');ctx.fillStyle=gr;ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x+60,0);ctx.lineTo(x-90,H);ctx.lineTo(x-200,H);ctx.closePath();ctx.fill();}
  ctx.restore();
}
/* the phone held up as a camera: the world repainted inside the screen, a focus box, the shutter */
function feb_camera(ctx,lt,up,world,focus,shots,label){
  const y=lerp(820,120,up);const S=drawPhoneHand(ctx,lt,{x:475,y,w:330,h:700});
  ctx.save();rrect(ctx,S.x,S.y,S.w,S.h,S.r);ctx.clip();ctx.fillStyle='#000';ctx.fillRect(S.x,S.y,S.w,S.h);
  const vw=S.w,vh=S.w*16/9,vy=S.y+(S.h-vh)/2;ctx.save();ctx.beginPath();ctx.rect(S.x,vy,vw,vh);ctx.clip();ctx.translate(S.x+vw/2,vy+vh/2);const z=vh/H*1.7;ctx.scale(z,z);ctx.translate(-focus[0],-focus[1]);world(ctx);ctx.restore();
  const taken=shots.filter(s=>lt>=s).length,fl=shots.reduce((m,s)=>Math.max(m,smooth(s,s+0.06,lt)*(1-smooth(s+0.08,s+0.35,lt))),0);
  ctx.strokeStyle='#ffd60a';ctx.lineWidth=2;ctx.strokeRect(S.x+vw/2-40+Math.sin(lt*0.4)*6,vy+vh/2-70,80,80);
  ctx.fillStyle='rgba(0,0,0,.35)';rrect(ctx,S.x+S.w/2-52,S.y+52,104,28,14);ctx.fill();ctx.fillStyle='#fff';ctx.font='600 14px "Mulish",sans-serif';ctx.textAlign='center';ctx.fillText(label+' · '+(1+taken),S.x+S.w/2,S.y+71);
  ctx.fillStyle='rgba(0,0,0,.45)';rrect(ctx,S.x+S.w/2-20,S.y+S.h-150,40,24,12);ctx.fill();ctx.fillStyle='#ffd60a';ctx.font='700 12px "Mulish",sans-serif';ctx.fillText('1x',S.x+S.w/2,S.y+S.h-133);
  ctx.strokeStyle='#fff';ctx.lineWidth=3;circle(ctx,S.x+S.w/2,S.y+S.h-80,30);ctx.stroke();ctx.fillStyle='#fff';circle(ctx,S.x+S.w/2,S.y+S.h-80,24*(1-0.15*fl));ctx.fill();
  if(fl>0){ctx.fillStyle=`rgba(255,255,255,${(fl*0.9).toFixed(3)})`;ctx.fillRect(S.x,S.y,S.w,S.h);}
  ctx.restore();return S;
}
scene({id:'graveyard',name:'7 February · the graveyard',when:'2026-02-07T14:30',bars:8,fin:['#000000',1.2],fout:['#000000',1.2],
  note:'before the sunflowers, the Karachi University graveyard: old neem trees, a whitewashed wall, rows of quiet graves, the afternoon through the leaves; the two of them walking the path.',
  tag:'7 Feb · KU',
  prep(){return{bg:feb_graveyard()};},
  draw(ctx,lt,A){
    const world=g=>{
      g.drawImage(A.bg,0,0);
      const look=lerp(-0.5,0.15,smooth(3,5,lt))+0.1*Math.sin(lt*0.3);
      const walk=smooth(0,24,lt),hy=lerp(470,535,walk),hs=lerp(0.36,0.46,walk),hx=640+Math.sin(lt*0.35)*10;
      feb_legs(g,hx,hy,hs,'#24211f',lt);
      drawFabeha(g,hx,hy,hs,{t:lt,outfit:'sage',hair:'low',arms:lt>11&&lt<13.5?'wave':'lap',smile:0.75+0.25*smooth(9,10,lt),eyes:lt>13.8&&lt<15.5?'happy':undefined,look,tilt:Math.sin(lt*0.5)*0.04,blush:0.45,wind:0.12,len:200,legCol:'#24211f'});
      feb_dapple(g,lt,633,1);
      motes(g,lt,26,634,'#cfe3a0',1.6,0.35);
    };
    world(ctx);
    void A;
  },
  subs:[
    [0.6,4.6,'7 February. Before the sunflowers, we went to see the Karachi University graveyard.'],
    [5.4,9.4,'Old neem trees, the afternoon coming down through the leaves, everything quiet.'],
    [10.2,13.8,'We walked the path between them, slowly.'],
    [21.8,25.4,'Then we walked on, to the sunflowers.'],
  ],
  score({T,hit,pad,melody,bars,THEME_B}){
    bars(0,8,['Em','Cmaj7','G','Dsus'],{padVel:0.4});
    for(let b=1;b<7;b++)melody(b,b-1,'flute',0,0.42,THEME_B);
    [1.2,1.5,6.9,11.4,11.7,17.3,22.6].forEach(t=>hit(t,'bird',{f:2300+((t*977)%900)}));
  },
  amb(lt){return{wind:0.2};},
});

/* his ten real photographs from the sunflower field (photos/sunflower-15…24.jpg): loaded once, blurred backdrops cached */
const FEB_SUN_FILES=[15,16,17,18,19,20,21,22,23,24].map(n=>'photos/sunflower-'+n+'.jpg'),FEB_SUN=[];
function feb_sun(k){if(!FEB_SUN.length)for(const f of FEB_SUN_FILES){const im=new Image();im.src=f;FEB_SUN.push(im);}return FEB_SUN[((k%FEB_SUN.length)+FEB_SUN.length)%FEB_SUN.length];}
function feb_ready(im){return !!(im&&im.complete&&im.naturalWidth);}
function feb_cover(g,im,x,y,w,h,fy){const sc=Math.max(w/im.naturalWidth,h/im.naturalHeight),iw=im.naturalWidth*sc,ih=im.naturalHeight*sc;g.drawImage(im,x+(w-iw)/2,clamp(y+h*0.5-ih*(fy??0.5),y+h-ih,y),iw,ih);}
function feb_blur(im){if(!im._blur){const c=mk(320,180),g=c.getContext('2d');g.filter='blur(9px)';feb_cover(g,im,-20,-20,360,220,0.5);g.filter='none';im._blur=c;}return im._blur;}
/* one photograph, full frame: the blurred photo behind, the portrait itself in the middle with a warm glow */
function feb_showPhoto(ctx,im,a,z){
  if(!feb_ready(im)||a<=0)return;
  ctx.save();ctx.globalAlpha=a;
  ctx.drawImage(feb_blur(im),0,0,W,H);ctx.fillStyle='rgba(20,14,6,.35)';ctx.fillRect(0,0,W,H);
  const h=H*1.55*z,w=h*im.naturalWidth/im.naturalHeight,x=W/2-w/2,y=H*0.46-h*0.56;
  ctx.shadowColor='rgba(255,214,120,.55)';ctx.shadowBlur=46;ctx.fillStyle='#fff6e0';ctx.fillRect(x-6,y-6,w+12,h+12);ctx.shadowBlur=0;
  ctx.drawImage(im,x,y,w,h);
  const gl=ctx.createRadialGradient(x+w*0.2,y+h*0.15,0,x+w*0.2,y+h*0.15,h*0.9);gl.addColorStop(0,'rgba(255,236,190,.22)');gl.addColorStop(1,'rgba(255,236,190,0)');ctx.fillStyle=gl;ctx.fillRect(x,y,w,h);
  ctx.restore();
}
/* hearts rising from the bottom of the frame to the top, swaying left and right */
function feb_hearts(ctx,lt,t0,t1,n,seed){
  if(lt<t0)return;const r=rng(seed);
  for(let i=0;i<n;i++){
    const delay=r()*(t1-t0-1.2),sp=110+r()*120,x0=60+r()*(W-120),sz=8+r()*16,ph=r()*TAU,col=['#ff5c8a','#ff8fab','#ff3d6e','#ffc2d1','#e8436b'][i%5];
    const age=lt-t0-delay;if(age<0)continue;const y=H+30-age*sp;if(y<-40)continue;
    const x=x0+Math.sin(age*1.6+ph)*(30+sz*2),a=Math.min(1,age*2)*(lt>t1-0.6?Math.max(0,(t1-lt)/0.6):1)*(y<120?Math.max(0,y/120):1);
    ctx.save();ctx.globalAlpha=0.85*a;ctx.fillStyle=col;heart(ctx,x,y,sz*(0.9+0.15*Math.sin(age*5+ph)));ctx.fill();ctx.restore();
  }
}
function feb_tile(ctx,px,py,tile,k){const im=feb_sun(k*3);if(feb_ready(im)){feb_cover(ctx,im,px,py,tile,tile,0.32);}else{ctx.fillStyle=vgrad(ctx,py,py+tile,[[0,'#9fcbea'],[0.5,'#d9e8cf'],[1,'#5d8d3e']]);ctx.fillRect(px,py,tile,tile);}}
const SUNF=[
  {at:19.0,who:'me', time:'19:33',photos:12,paint:feb_tile},
  {at:22.8,who:'her',time:'19:34',text:'They are so badddd cri araha hai 😭😭😭😭😭😭😭😭😭😭🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣'},
  {at:24.6,who:'me', time:'19:34',text:'I would keep this photo in my wallet and go on a war'},
  {at:26.8,who:'her',time:'19:35',text:'But ty for the memory wese'},
  {at:28.2,who:'her',time:'19:35',text:'Han sunflowers lag rahe hain 🤣🤣🤣😍😍'},
  {at:29.8,who:'me', time:'19:36',text:'The only thing i see is you not the sunflowers'},
  {at:31.2,who:'me', time:'19:36',text:'Pretty? eww infront of you'},
  {at:32.8,who:'her',time:'20:51',text:'🤦🏼‍♀️🤦🏼‍♀️ you’re too nice'},
  {at:34.8,who:'me', time:'21:05',text:'No 😂 you are the prettiest women ik and respected'},
];
/* the sunflower field by the KU bio department: flat horizon, low buildings far off, tall plants to her waist */
function feb_fieldFar(){
  const c=mk(W,H),g=c.getContext('2d'),r=rng(641);
  /* the bio department and its neighbours, low and pale on the horizon */
  for(const[x,w,h]of[[150,120,24],[330,80,16],[860,190,30],[1060,90,18],[1180,120,22]]){g.fillStyle='#dcd3c0';g.fillRect(x,404-h,w,h);g.fillStyle='#c8bea8';g.fillRect(x,404-h,w,3);g.fillStyle='rgba(90,90,100,.45)';for(let wx=x+6;wx<x+w-8;wx+=12)g.fillRect(wx,404-h+7,6,Math.max(3,h*0.25));}
  for(let k=0;k<26;k++)drawTreeClump(g,r()*W,406,26+r()*36,'#4f6f3c','#7f9b5a',r);
  g.fillStyle='#86a35c';g.fillRect(0,402,W,8);
  return c;
}
scene({id:'sunflowers',name:'The sunflower field',when:'2026-02-07T15:12',bars:12,fin:['#000000',1.0],fout:['#000000',1.2],
  note:'a whole field of sunflowers inside KU by the bio department, on the afternoon of the first date; his real photographs of her, shining; the next day all twelve land at once, hearts rise when she opens them, and he answers every one of her jokes.',
  tag:'“I would keep this photo in my wallet and go on a war”',
  prep(){
    const r=rng(611),flowers=[];
    for(let i=0;i<230;i++){const u=r();flowers.push({x:r()*1.3*W-0.15*W,u,s:14+u*u*120,ph:r()*TAU,lean:(r()-0.5)*0.4});}
    flowers.sort((a,b)=>a.u-b.u);
    feb_sun(0);
    return{flowers,far:feb_fieldFar(),R:rooms()};},
  draw(ctx,lt,A){
    const SHOTS=[5.0,6.4,7.8,9.2,10.6,12.0,13.4,14.8,16.2,17.6];
    if(lt<18.6){
      const field=g=>{
        paintSky(g,[[0,'#86b9e4'],[0.5,'#c8ddef'],[0.8,'#eee7d2']]);sunGlow(g,170,110,460,'rgba(255,246,220,0.8)');
        g.strokeStyle='rgba(255,255,255,.4)';g.lineWidth=2.5;for(let k=0;k<3;k++){g.beginPath();g.moveTo(40+k*90,60+k*36);g.quadraticCurveTo(300+k*80,20+k*40,620+k*60,150+k*30);g.stroke();}
        g.drawImage(A.far,0,0);
        g.fillStyle=vgrad(g,406,720,[[0,'#7aa24e'],[0.35,'#557f35'],[1,'#2f5a22']]);g.fillRect(0,406,W,314);
        for(const f of A.flowers){
          const y=410+f.u*f.u*300,sw=Math.sin(lt*1.4+f.ph)*5*f.u,x=f.x;
          g.strokeStyle=f.u<0.5?'#4f8a3a':'#3f7a30';g.lineWidth=1.5+f.u*5;g.beginPath();g.moveTo(x,y+f.s*1.1);g.quadraticCurveTo(x+sw+f.lean*20,y+f.s*0.4,x+sw,y-f.s*0.1);g.stroke();
          if(f.u>0.2){g.fillStyle=f.u<0.5?'#4e8636':'#3b7029';ell(g,x+sw-f.s*0.3,y+f.s*0.45,f.s*0.26,f.s*0.1,-0.6);g.fill();ell(g,x+sw+f.s*0.28,y+f.s*0.7,f.s*0.24,f.s*0.09,0.5);g.fill();}
          g.drawImage(SPR.sunflower,x+sw-f.s/2,y-f.s*0.6,f.s,f.s);
        }
        motes(g,lt,40,614,'#fff6cc',1.4,0.5);
      };
      field(ctx);
      /* the phone comes up as a camera; every shutter press is one of the real photographs, full frame */
      const k=SHOTS.filter(t=>lt>=t).length-1;
      if(k<0){const up=smooth(2.6,4.2,lt);if(up>0.01){const S=feb_camera(ctx,lt,up,field,[640,470],[],'PHOTO');phoneTop(ctx,S,{time:'15:12'});}}
      else{
        const t0=SHOTS[k],z=1+0.035*(lt-t0),im=feb_sun(k);
        if(k>0)feb_showPhoto(ctx,feb_sun(k-1),1,1+0.035*(t0-SHOTS[k-1]));
        feb_showPhoto(ctx,im,smooth(t0,t0+0.25,lt),z);
        motes(ctx,lt,26,615,'#fff3c4',1.6,0.6);
        const fl=smooth(t0,t0+0.04,lt)*(1-smooth(t0+0.05,t0+0.22,lt));if(fl>0){ctx.fillStyle=`rgba(255,255,255,${(0.7*fl).toFixed(3)})`;ctx.fillRect(0,0,W,H);}
        ctx.fillStyle='rgba(0,0,0,.35)';rrect(ctx,W/2-56,24,112,28,14);ctx.fill();ctx.fillStyle='#fff';ctx.font='600 14px "Mulish",sans-serif';ctx.textAlign='center';ctx.fillText('PHOTO · '+(k+1),W/2,43);
      }
      return;
    }
    /* the next day, 19:33 — his room; all twelve go out at once, she opens them, the hearts rise */
    ctx.drawImage(A.R.night,0,0);
    const S=drawPhoneHand(ctx,lt,{x:475,y:120,w:330,h:700});
    const open=lt>=19.6&&lt<22.6;
    if(open){
      ctx.save();rrect(ctx,S.x,S.y,S.w,S.h,S.r);ctx.clip();ctx.fillStyle='#000';ctx.fillRect(S.x,S.y,S.w,S.h);
      const j=Math.min(2,Math.floor((lt-19.6)/1.0)),im=feb_sun([0,4,8][j]);
      const fit=(im2,al)=>{if(!feb_ready(im2))return;const h=S.w*im2.naturalHeight/im2.naturalWidth;ctx.globalAlpha=al;ctx.drawImage(im2,S.x,S.y+(S.h-h)/2,S.w,h);ctx.globalAlpha=1;};
      if(j>0)fit(feb_sun([0,4,8][j-1]),1);fit(im,j===0?smooth(19.6,19.8,lt):smooth(19.6+j,19.85+j,lt));
      ctx.fillStyle='rgba(255,255,255,.8)';ctx.font='600 13px "Mulish",sans-serif';ctx.textAlign='center';ctx.fillText((1+[0,4,8][j])+' of 12',S.x+S.w/2,S.y+70);
      ctx.restore();phoneTop(ctx,S,{time:'19:33'});
    }else{
      chatPanel(ctx,S,SUNF,lt,{name:'Fabeha',status:'online'});
      phoneTop(ctx,S,{time:lt<22.8?'19:33':lt<26.8?'19:34':lt<29.8?'19:35':lt<32.8?'19:36':lt<34.8?'20:51':'21:05'});
    }
    feb_hearts(ctx,lt,19.4,24.2,46,617);
  },
  subs:[
    [0.6,4.8,'Inside KU, by the bio department, a whole field of sunflowers. That afternoon we ended up there.'],
    [5.4,9.0,'I took twelve photos of her in it.'],
    [9.6,13.0,'She shone in every one of them.'],
    [19.0,22.2,'The next day, I sent her all twelve at once.'],
    [24.8,26.6,'I would keep this photo in my wallet and go on a war','him'],
    [27.0,28.0,'But ty for the memory wese','her'],
    [28.4,29.6,'Han sunflowers lag rahe hain 🤣🤣🤣😍😍','her'],
    [30.0,32.6,'The only thing i see is you not the sunflowers. Pretty? eww infront of you','him'],
    [33.0,34.6,'🤦🏼‍♀️🤦🏼‍♀️ you’re too nice','her'],
    [35.0,38.6,'No 😂 you are the prettiest women ik and respected','him'],
  ],
  score({T,hit,pad,melody,arp,bars,CH,THEME}){
    bars(0,6,['G','Cmaj7','Em7','D'],{padVel:0.5,arp:true,arpVel:0.16});
    for(let b=1;b<5;b++)melody(b,b-1,'flute',0,0.55);
    [0.8,1.1,4.1,8.2,8.5,12.9,16.1].forEach(t=>hit(t,'bird',{f:2400+((t*977)%900)}));
    [5.0,6.4,7.8,9.2,10.6,12.0,13.4,14.8,16.2,17.6].forEach((t,i)=>{hit(t,'tick',{});hit(t+0.05,'chime',{midi:[84,86,88,91][i%4],vel:0.22});});
    bars(6,6,['Em','Cmaj7','G','Dsus','G','Cmaj7'],{padVel:0.4});
    hit(19.6,'swell',{dur:1.4,vel:0.4});[19.7,20.2,20.7,21.2,21.7].forEach((t,i)=>hit(t,'chime',{midi:[91,95,98,95,91][i],vel:0.35}));
    for(const m of SUNF)hit(m.at,'tick',{hi:m.who==='her'});
  },
  amb(lt){return lt<18.6?{wind:0.22}:{room:0.22};},
});
