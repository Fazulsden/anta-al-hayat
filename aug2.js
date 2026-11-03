/* aug2.js — 27–30 August 2026: the Saddar chase, the library at five, the perfume that would not wash off,
   the ribbon tag at midnight, the 2 a.m. rider. (see notes/AUTHORING.md; helpers here carry the a2_ prefix) */
'use strict';

/* ---------- Saddar through the windscreen: a painted street with projecting signboards, the Empress Market tower, the road ---------- */
const A2_VX=640,A2_VY=300;                                   /* vanishing point of the street */
function a2_saddarLayer(night){
  const c=mk(W,H),g=c.getContext('2d'),r=rng(night?271:270);
  if(night)g.fillStyle=vgrad(g,0,H,[[0,'#05060e'],[0.28,'#110f26'],[0.42,'#2b1a2c']]);
  else g.fillStyle=vgrad(g,0,H,[[0,'#5a4a8c'],[0.16,'#b2685a'],[0.3,'#e89a62'],[0.42,'#f7d4a0']]);
  g.fillRect(0,0,W,H);
  if(!night){const s=g.createRadialGradient(600,300,0,600,300,560);s.addColorStop(0,'rgba(255,224,170,.75)');s.addColorStop(1,'rgba(255,224,170,0)');g.fillStyle=s;g.fillRect(0,0,W,H);}
  /* far skyline round the vanishing point */
  g.fillStyle=night?'#17132a':'#d9b49a';
  for(let i=0;i<26;i++){const x=440+i*16+r()*6,h=14+r()*46,w=12+r()*20;g.fillRect(x,A2_VY-h,w,h+2);}
  /* the Empress Market clock tower, a little left of the road's end */
  const tx=560,tb=A2_VY+2;
  g.fillStyle=night?'#1a1422':'#8e5a48';g.fillRect(tx-34,tb-150,68,150);
  g.fillStyle=night?'#221a2c':'#b5775c';g.fillRect(tx-34,tb-150,26,150);
  g.fillStyle=night?'#140f1c':'#6e4336';g.beginPath();g.moveTo(tx-40,tb-150);g.lineTo(tx,tb-200);g.lineTo(tx+40,tb-150);g.closePath();g.fill();
  for(const dx of[-34,34]){g.fillStyle=night?'#1a1422':'#8e5a48';g.fillRect(tx+dx-5,tb-166,10,22);}
  g.fillStyle=night?'#ffe9b0':'#f6ecd6';circle(g,tx,tb-110,15);g.fill();g.strokeStyle=night?'#6b5a3a':'#5a3a30';g.lineWidth=2;g.beginPath();g.moveTo(tx,tb-110);g.lineTo(tx,tb-121);g.moveTo(tx,tb-110);g.lineTo(tx+8,tb-106);g.stroke();
  if(night)glow(g,tx,tb-110,46,'#ffe9b0',0.5);
  g.fillStyle=night?'#120d18':'#6e4336';for(let k=0;k<3;k++){g.beginPath();g.moveTo(tx-24+k*20,tb-40);g.lineTo(tx-24+k*20,tb-66);g.arc(tx-18+k*20,tb-66,6,Math.PI,0);g.lineTo(tx-12+k*20,tb-40);g.closePath();g.fill();}
  /* the two facades: triangles from the frame edges to the vanishing point */
  const top=u=>lerp(60,A2_VY,u),bot=u=>lerp(448,A2_VY,u);
  for(const side of[-1,1]){
    const X=u=>side<0?lerp(0,A2_VX,u):lerp(W,A2_VX,u);
    g.fillStyle=side<0?hgrad(g,0,A2_VX,[[0,night?'#1a1620':'#a8826a'],[1,night?'#120f1e':'#d7b49c']]):hgrad(g,W,A2_VX,[[0,night?'#171320':'#9a7660'],[1,night?'#120f1e':'#d7b49c']]);
    g.beginPath();g.moveTo(X(0),top(0));g.lineTo(A2_VX,A2_VY);g.lineTo(X(0),bot(0));g.closePath();g.fill();
    /* floors, windows, shutters, awnings in perspective */
    for(let u=0.0;u<0.86;){
      const du=0.035+u*0.08,u1=Math.min(0.9,u+du),x0=X(u),x1=X(u1);
      const quad=(v0,v1,col)=>{g.fillStyle=col;g.beginPath();g.moveTo(x0,lerp(top(u),bot(u),v0));g.lineTo(x1,lerp(top(u1),bot(u1),v0));g.lineTo(x1,lerp(top(u1),bot(u1),v1));g.lineTo(x0,lerp(top(u),bot(u),v1));g.closePath();g.fill();};
      quad(0.0,1.0,r()<0.5?(night?'rgba(0,0,0,.18)':'rgba(255,255,255,.06)'):'rgba(0,0,0,.05)');
      for(const v of[0.16,0.4]){const lit=night&&r()<0.55;quad(v,v+0.14,lit?'rgba(255,214,140,.8)':(night?'#0b0a14':'#4a3a44'));quad(v+0.11,v+0.14,night?'rgba(255,255,255,.06)':'rgba(255,255,255,.3)');}
      quad(0.62,0.66,night?'#2a2434':'#c74a3a');quad(0.66,0.84,night?'#0c0b14':'#3a3040');
      if(r()<0.5)quad(0.84,0.9,night?'#2a2838':'#b8b0a0');
      u=u1;
    }
  }
  /* awnings and projecting signboards that face the car (the Saddar look), near to far */
  const boards=[
    ['SHAKIR TRADERS','#1f4e9c','#ffffff'],['MOBILE ZONE','#d7262a','#ffe36a'],['BAKERY','#e6a51e','#3a2010'],['JUICE CORNER','#2a9d4a','#fff8e0'],
    ['DRY FRUITS','#b23b3b','#ffffff'],['ELECTRONICS','#174f7a','#9fe0ff'],['SWEETS','#e85d8a','#ffffff'],['BOOK STALL','#3a3a3a','#ffd36a'],['OPTICALS','#ffffff','#1f4e9c'],['TEA HOUSE','#6b3a2a','#ffe9c0'],
  ];
  let bi=0;
  for(const[u,side0]of[[0.06,1],[0.09,-1],[0.19,-1],[0.22,1],[0.33,1],[0.37,-1],[0.48,-1],[0.52,1],[0.62,1],[0.68,-1]]){
    const side=night?-side0:side0;                       /* at night the phone is in his hand on the right, so the found sign hangs on the left */
    const[t,bg,fg]=boards[bi%boards.length];bi++;
    const s=Math.pow(1-u,1.35),w=170*s,h=56*s,x=side<0?lerp(165,A2_VX-20,u):lerp(W-165,A2_VX+20,u),y=lerp(150,A2_VY-24,u);
    g.fillStyle='rgba(0,0,0,.25)';g.fillRect(x-w/2+4*s,y-h/2+6*s,w,h);
    g.fillStyle=bg;g.fillRect(x-w/2,y-h/2,w,h);
    g.strokeStyle='rgba(255,255,255,.25)';g.lineWidth=Math.max(0.6,2*s);g.strokeRect(x-w/2,y-h/2,w,h);
    const fs=24*s;if(fs>=7){g.fillStyle=fg;g.font=`700 ${fs}px "Mulish",sans-serif`;g.textAlign='center';g.fillText(t,x,y+fs*0.36);}
    g.fillStyle=night?'#2a2838':'#5a4a4a';g.fillRect(x-w/2-4*s,y-h/2-3*s,w+8*s,4*s);
    if(night){glow(g,x,y,w*0.9,bg==='#ffffff'?'#ffe9c0':bg,0.5);}
  }
  /* the road: kerbs, asphalt, the far haze */
  g.fillStyle=night?'#262129':'#5b5450';g.beginPath();g.moveTo(A2_VX-28,A2_VY);g.lineTo(A2_VX+28,A2_VY);g.lineTo(W+320,H);g.lineTo(-320,H);g.closePath();g.fill();
  g.fillStyle=night?'#4a4650':'#cfc6b4';g.beginPath();g.moveTo(-320,H);g.lineTo(A2_VX-28,A2_VY);g.lineTo(A2_VX-22,A2_VY);g.lineTo(-290,H);g.closePath();g.fill();
  g.beginPath();g.moveTo(W+320,H);g.lineTo(A2_VX+28,A2_VY);g.lineTo(A2_VX+22,A2_VY);g.lineTo(W+290,H);g.closePath();g.fill();
  const hz=g.createLinearGradient(0,A2_VY-120,0,A2_VY+40);hz.addColorStop(0,night?'rgba(40,24,40,0)':'rgba(247,212,160,0)');hz.addColorStop(1,night?'rgba(40,24,40,.55)':'rgba(247,212,160,.6)');g.fillStyle=hz;g.fillRect(0,A2_VY-120,W,160);
  if(!night){g.fillStyle='rgba(255,220,180,.1)';g.fillRect(0,0,W,H);}
  return c;
}
/* vehicles on the road, live: u = depth 0 (at the bumper) → 1 (at the vanishing point), lat = lanes left/right */
function a2_vehicle(ctx,kind,u,lat,lt,night,ph){
  const s=Math.pow(1-u,1.5),y=lerp(600,A2_VY,Math.pow(u,0.8))+Math.sin(lt*7+ph)*1.2*s,x=A2_VX+lat*(1-u)*(1-u)*560;
  ctx.save();ctx.translate(x,y);ctx.scale(s,s);
  ctx.fillStyle='rgba(0,0,0,.28)';ell(ctx,0,4,kind==='bus'?130:kind==='rick'?48:82,10);ctx.fill();
  if(kind==='bus'){
    ctx.fillStyle='#1f6b3a';rrect(ctx,-118,-230,236,232,14);ctx.fill();
    ctx.fillStyle='#e4b23a';ctx.fillRect(-118,-150,236,22);ctx.fillStyle='#c0392b';ctx.fillRect(-118,-104,236,18);ctx.fillStyle='#2f7fbf';ctx.fillRect(-118,-66,236,12);
    ctx.fillStyle='#d9d4c8';ctx.fillRect(-118,-128,236,4);ctx.fillRect(-118,-86,236,4);
    ctx.fillStyle='#0f1a24';rrect(ctx,-96,-214,192,56,8);ctx.fill();ctx.fillStyle='rgba(255,255,255,.14)';ctx.fillRect(-96,-214,192,16);
    ctx.fillStyle='#f1e7c6';for(let k=0;k<8;k++){circle(ctx,-84+k*24,-150+11,5);ctx.fill();}
    ctx.fillStyle='#6b5a3a';ctx.fillRect(-100,-250,200,20);ctx.fillStyle='#8a7a5a';for(let k=0;k<5;k++)ctx.fillRect(-96+k*40,-262,30,12);
    ctx.fillStyle='#fff';ctx.fillRect(-26,-50,52,22);ctx.fillStyle='#111';ctx.font='700 15px "Mulish",sans-serif';ctx.textAlign='center';ctx.fillText('W-11',0,-33);
    ctx.fillStyle='#111';ctx.fillRect(-108,-12,36,12);ctx.fillRect(72,-12,36,12);
    for(const dx of[-92,92]){ctx.fillStyle=night?'#ff4d3a':'#8a1f16';circle(ctx,dx,-26,9);ctx.fill();if(night)glow(ctx,dx,-26,40,'#ff5a3a',0.6);}
  }else if(kind==='sedan'){
    ctx.fillStyle='#e9e7e2';rrect(ctx,-80,-78,160,78,10);ctx.fill();ctx.fillStyle='#d2cfc8';rrect(ctx,-66,-124,132,52,16);ctx.fill();
    ctx.fillStyle='#1a2430';rrect(ctx,-58,-118,116,38,8);ctx.fill();ctx.fillStyle='rgba(255,255,255,.18)';ctx.fillRect(-58,-118,116,10);
    ctx.fillStyle='#bfbcb4';ctx.fillRect(-80,-30,160,6);ctx.fillStyle='#fff';ctx.fillRect(-22,-26,44,16);
    ctx.fillStyle='#111';ctx.fillRect(-74,-8,28,10);ctx.fillRect(46,-8,28,10);
    for(const dx of[-62,62]){ctx.fillStyle=night?'#ff5a4a':'#a8322a';rrect(ctx,dx-12,-64,24,14,4);ctx.fill();if(night)glow(ctx,dx,-57,34,'#ff5a3a',0.55);}
  }else if(kind==='rick'){
    ctx.fillStyle='#1a1a1e';rrect(ctx,-44,-70,88,70,10);ctx.fill();ctx.fillStyle='#e9c21e';rrect(ctx,-44,-128,88,64,18);ctx.fill();
    ctx.fillStyle='#0f1a24';rrect(ctx,-30,-118,60,30,6);ctx.fill();ctx.fillStyle='#2a2a30';rrect(ctx,-48,-134,96,10,4);ctx.fill();
    ctx.fillStyle='#c0392b';ctx.fillRect(-44,-70,88,6);ctx.fillStyle='#111';ctx.fillRect(-34,-10,20,12);ctx.fillRect(14,-10,20,12);
    ctx.fillStyle=night?'#ff5a4a':'#8a1f16';circle(ctx,0,-48,6);ctx.fill();if(night)glow(ctx,0,-48,28,'#ff5a3a',0.5);
  }else{/* motorbike with a rider, from behind */
    ctx.fillStyle='#111';ctx.fillRect(-7,-34,14,36);ctx.fillStyle='#2b3550';rrect(ctx,-22,-96,44,54,10);ctx.fill();ctx.fillStyle='#161a26';circle(ctx,0,-108,15);ctx.fill();
    ctx.fillStyle='#d9b394';ctx.fillRect(-26,-70,8,20);ctx.fillRect(18,-70,8,20);ctx.fillStyle=night?'#ff5a4a':'#8a1f16';circle(ctx,0,-40,4);ctx.fill();
  }
  ctx.restore();
}
function a2_saddar(ctx,lt,A,night){
  ctx.drawImage(night?A.night:A.day,0,0);
  if(night){stars(ctx,lt,90,272,150,0.5);}
  /* lane dashes creeping towards us (stop-and-go) */
  const crawl=lt*0.035+0.02*Math.sin(lt*0.6);
  ctx.fillStyle=night?'#8f8a7a':'#e4dcc8';for(let k=0;k<8;k++){const u=1-((crawl+k/8)%1),yy=lerp(600,A2_VY,Math.pow(u,0.8)),ww=(1-u)*(1-u)*20+1,hh=(1-u)*(1-u)*40+2;if(yy<A2_VY+6)continue;ctx.fillRect(A2_VX-ww/2,yy,ww,hh);}
  const sway=k=>0.012*Math.sin(lt*0.45+k);
  if(night){for(let k=0;k<4;k++){const u=0.3+((lt*0.05+k*0.23)%0.6),s=Math.pow(1-u,1.5),x=A2_VX+0.42*(1-u)*(1-u)*560,y=lerp(600,A2_VY,Math.pow(u,0.8))-70*s;glow(ctx,x-22*s,y,90*s+8,'#fff1c8',0.8);glow(ctx,x+22*s,y,90*s+8,'#fff1c8',0.8);}}
  a2_vehicle(ctx,'bike',0.66+sway(1),0.18,lt,night,1);
  a2_vehicle(ctx,'sedan',0.6+sway(2),-0.05,lt,night,2);
  a2_vehicle(ctx,'rick',0.5+sway(3),0.36,lt,night,3);
  a2_vehicle(ctx,'bus',0.42+sway(4),-0.3,lt,night,4);
  a2_vehicle(ctx,'bike',0.46+sway(5),0.1,lt,night,5);
  if(!night){ctx.fillStyle='rgba(255,200,140,.06)';ctx.fillRect(0,0,W,H);}
}
/* the phone in the dash mount, left of the wheel (as in drive7) */
function a2_mountPhone(ctx,lt,msgs,o={}){
  ctx.save();ctx.translate(o.x??150,o.y??166);ctx.rotate(-0.04);ctx.scale(0.6,0.6);
  if(o.empty){ctx.fillStyle='#1d1e26';ctx.fillRect(PHONE.w/2-12,PHONE.h-60,24,90);ctx.fillStyle='#2a2b34';ctx.fillRect(-16,PHONE.h-40,PHONE.w+32,22);ctx.restore();return;}
  const S=drawPhone(ctx,0,0,PHONE.w,PHONE.h,{});
  chatPanel(ctx,S,msgs,lt,{name:'Fabeha',status:o.status||'online',dark:o.dark!==false,draft:o.draft});
  phoneTop(ctx,S,{time:o.time||'18:00'});
  ctx.fillStyle='#2a2b34';ctx.fillRect(-16,PHONE.h-40,PHONE.w+32,22);ctx.restore();
}
/* the cockpit of feb.js with the right hand optionally off the wheel (it is holding the phone up, at a standstill or in a jam) */
function a2_cockpit(ctx,lt,o={}){
  const dark=!!o.dark,bob=Math.sin(lt*9)*0.8,right=o.right!==false;
  ctx.save();ctx.translate(0,bob);
  ctx.fillStyle=dark?'#0c0d12':'#1a1b22';
  ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(W,0);ctx.lineTo(W,74);ctx.quadraticCurveTo(640,44,0,74);ctx.closePath();ctx.fill();
  ctx.beginPath();ctx.moveTo(0,74);ctx.lineTo(74,74);ctx.lineTo(0,440);ctx.closePath();ctx.fill();
  ctx.beginPath();ctx.moveTo(W,74);ctx.lineTo(W-74,74);ctx.lineTo(W,440);ctx.closePath();ctx.fill();
  ctx.fillStyle='#2a2b34';ctx.fillRect(600,60,80,14);ctx.fillStyle='#0a0b10';rrect(ctx,540,66,200,58,8);ctx.fill();
  ctx.fillStyle=dark?'#111218':'#1c1d25';ctx.beginPath();ctx.moveTo(0,478);ctx.quadraticCurveTo(640,426,W,478);ctx.lineTo(W,720);ctx.lineTo(0,720);ctx.closePath();ctx.fill();
  ctx.fillStyle=dark?'#191a21':'#262830';ctx.beginPath();ctx.moveTo(0,478);ctx.quadraticCurveTo(640,426,W,478);ctx.lineTo(W,506);ctx.quadraticCurveTo(640,454,0,506);ctx.closePath();ctx.fill();
  ctx.fillStyle=dark?'#0d1a2a':'#16263a';rrect(ctx,760,520,280,70,10);ctx.fill();glow(ctx,900,556,150,'#6fb7ff',dark?0.18:0.1);
  ctx.strokeStyle=dark?'#6fb7ff':'#9fd0ff';ctx.lineWidth=2;for(const cx of[830,970]){ctx.beginPath();ctx.arc(cx,560,26,Math.PI*0.75,Math.PI*2.25);ctx.stroke();ctx.beginPath();ctx.moveTo(cx,560);ctx.lineTo(cx+Math.cos(Math.PI*1.2+Math.sin(lt*0.7)*0.2)*20,560+Math.sin(Math.PI*1.2+Math.sin(lt*0.7)*0.2)*20);ctx.stroke();}
  ctx.strokeStyle='#14151a';ctx.lineWidth=34;ctx.beginPath();ctx.arc(900,760,210,Math.PI*1.08,Math.PI*1.92);ctx.stroke();
  ctx.strokeStyle='#30323a';ctx.lineWidth=22;ctx.beginPath();ctx.arc(900,760,210,Math.PI*1.08,Math.PI*1.92);ctx.stroke();
  ctx.strokeStyle=HIS.skin;ctx.lineCap='round';ctx.lineWidth=44;ctx.beginPath();ctx.moveTo(760,740);ctx.lineTo(738,628);if(right){ctx.moveTo(1040,740);ctx.lineTo(1058,620);}ctx.stroke();
  ctx.fillStyle=HIS.skin;ell(ctx,735,610,30,42,-0.5);ctx.fill();if(right){ell(ctx,1060,600,30,42,0.5);ctx.fill();}
  ctx.fillStyle=HIS.skinSh;ell(ctx,722,580,10,18,-0.6);ctx.fill();if(right){ell(ctx,1074,572,10,18,0.6);ctx.fill();}
  ctx.restore();
}

/* ---------- 27 August · 17:57 — the gift hunt through Saddar: Empress Market, Shakir Traders, Numaish ---------- */
const SADDAR_A=[
  {at:4.4, who:'me', time:'17:57',text:'I am at city campsu'},
  {at:5.6, who:'her',time:'17:58',text:'Im at empress market  with baba'},
  {at:7.2, who:'me', time:'17:58',text:'Empress ajao kya'},
  {at:8.5, who:'her',time:'17:58',text:'Baba hai bhai'},
  {at:9.7, who:'me', time:'17:59',text:'Dekhlooga apko'},
  {at:11.0,who:'her',time:'17:59',text:'Maafiiii 🤣'},
  {at:14.8,who:'her',time:'17:59',text:'Pehle batate i couldve just come to city campus'},
  {at:16.8,who:'me', time:'18:00',text:'I am still driving'},
  {at:18.3,who:'me', time:'18:01',text:'🎤  voice note'},
];
const SADDAR_B=[
  {at:0,   who:'me', time:'21:23',text:'phly empress'},
  {at:0,   who:'me', time:'21:24',text:'phir shakir'},
  {at:0,   who:'me', time:'21:24',text:'phir numaish'},
  {at:23.7,who:'her',time:'21:30',text:'Toh meine apse kaha tha ap rehne do'},
  {at:25.3,who:'her',time:'21:34',text:'Uss becharay ko bhi kia'},
  {at:26.4,who:'her',time:'22:31',text:'🎤  voice note · 0:12'},
];
scene({id:'saddar',name:'27 August · Saddar',when:'2026-08-27T17:57',bars:12,fin:['#000000',1.2],fout:['#000000',1.4],
  note:'his car crawling through Saddar at dusk behind her father’s sedan: the Empress Market tower, a W-11 behind a rickshaw, shop signs, the phone in the dash mount; by night the shop found at last, and her voice note of 22:31.',
  tag:'“Dekhlooga apko” · “ap rehne do”',
  prep(){return{day:a2_saddarLayer(false),night:a2_saddarLayer(true)};},
  draw(ctx,lt,A){
    const night=lt>=19.4;
    a2_saddar(ctx,lt,A,night);
    /* the phone: in the dash mount while he drives, lifted into his hand for the talking beats (a jam at 17:57, parked at night) */
    const up=night?smooth(19.4,20.2,lt):smooth(2.2,3.0,lt)*(1-smooth(11.9,12.7,lt));
    a2_cockpit(ctx,lt,{dark:night,right:up<0.5});
    const timeA=lt<4.4?'17:57':lt<9.7?'17:58':lt<16.8?'17:59':lt<18.3?'18:00':'18:01',timeB=lt<23.7?'21:24':lt<25.3?'21:30':lt<26.4?'21:34':'22:31';
    if(up<0.02&&!night)a2_mountPhone(ctx,lt,SADDAR_A,{dark:false,time:timeA,draft:lt>15.6&&lt<16.8?'I am still driving':undefined});
    else a2_mountPhone(ctx,lt,[],{empty:true});
    if(up>0.01){
      const S=drawPhoneHand(ctx,lt,{x:880,y:lerp(820,130,easeOut(up)),w:330,h:700});
      chatPanel(ctx,S,night?SADDAR_B:SADDAR_A,lt,{name:'Fabeha',status:'online',dark:!!night,draft:!night&&lt>3.2&&lt<4.4?'I am at city campsu':undefined});
      phoneTop(ctx,S,{time:night?timeB:timeA});
    }
    if(!night){sunGlow(ctx,600,300,260,'rgba(255,224,170,0.22)');}
    else{ctx.fillStyle='rgba(20,10,30,.12)';ctx.fillRect(0,0,W,H);}
    const dip=smooth(18.9,19.4,lt)*(1-smooth(19.4,20.2,lt));if(dip>0){ctx.fillStyle=`rgba(0,0,0,${dip})`;ctx.fillRect(0,0,W,H);}
  },
  subs:[
    [0.8,4.2,'27 August, Karachi. I had come for campus paperwork. She was at Empress Market, in the car with her father.'],
    [4.5,5.5,'I am at city campsu','him'],
    [5.7,7.1,'Im at empress market  with baba','her'],
    [7.3,8.4,'Empress ajao kya','him'],
    [8.6,9.6,'Baba hai bhai','her'],
    [9.8,10.9,'Dekhlooga apko','him'],
    [11.1,12.1,'Maafiiii 🤣','her'],
    [12.4,14.6,'So I drove after her car through Saddar, my friend in the passenger seat hunting a shop sign.'],
    [14.9,16.6,'Pehle batate i couldve just come to city campus','her'],
    [16.9,18.0,'I am still driving','him'],
    [20.2,22.0,'phly empress · phir shakir · phir numaish','him'],
    [22.0,23.7,'Just a glimpse of her was all I was looking for.'],
    [23.8,25.2,'Toh meine apse kaha tha ap rehne do','her'],
    [25.4,26.3,'Uss becharay ko bhi kia','her'],
  ],
  voices:[{at:26.4,file:'00045836-AUDIO-2026-08-27-22-31-13',dur:12.5,label:'27 Aug · 22:31'}],
  score({T,hit,bars,melody,CH,THEME_C}){
    bars(0,6,['G','Cmaj7','Am7','D'],{padVel:0.4,bass:true,bassVel:0.36});
    for(let b=0;b<6;b++){const c=['G','Cmaj7','Am7','D'][b%4],p=CH[c].p;[0,0.5,1,1.5,2,2.5,3,3.5].forEach((q,k)=>{if(k%2===0||b>=1)hit(b*BAR+q*BEAT,'pluck',{midi:p[(k%4)===0?1:(k%4)===1?2:(k%4)===2?3:2]+12,vel:0.4});});if(b>=1&&b<5)melody(b,b-1,'piano',0,0.42,THEME_C);}
    bars(6,6,['Em','Cmaj7','G','Dsus'],{strings:true,padVel:0.34});
    for(let b=6;b<8;b++)melody(b,b-6,'box',12,0.3,THEME_C);
    for(const m of SADDAR_A)if(m.at>0)hit(m.at,'tick',{hi:m.who==='her'});
    for(const m of SADDAR_B)if(m.at>0)hit(m.at,'tick',{hi:true});
  },
  amb(lt){return lt<19.4?{hum:0.75,wind:0.15}:{hum:0.3,room:0.1};},
});

/* ---------- a borrowed room in Karachi (nights at a friend's): a mattress on the floor, a low table, a lamp, the window ---------- */
let A2_ROOM=null;
function a2_room(){
  if(A2_ROOM)return A2_ROOM;
  const paint=(lamp,day)=>{const c=mk(W,H),g=c.getContext('2d'),r=rng(301);
    g.fillStyle=day?vgrad(g,0,H,[[0,'#f1ebe2'],[0.6,'#ddd4c6'],[1,'#c8bcac']]):vgrad(g,0,H,[[0,'#0b0c1a'],[0.6,'#171428'],[1,'#1f1a2c']]);g.fillRect(0,0,W,H);
    g.fillStyle=day?'#efe8dc':'#2a2438';g.fillRect(860,80,340,320);
    g.fillStyle=day?vgrad(g,94,386,[[0,'#d8ecfb'],[1,'#f6ecd8']]):vgrad(g,94,386,[[0,'#0a1230'],[0.6,'#2a1e3a'],[1,'#5a3a2e']]);g.fillRect(874,94,312,292);
    if(!day){g.fillStyle='#fff8e6';for(let i=0;i<40;i++){const s=r()*1.4+0.4;g.fillRect(880+r()*300,100+r()*120,s,s);}
      g.fillStyle='#120e1c';g.fillRect(874,250,312,136);g.fillStyle='rgba(255,210,140,.7)';for(let i=0;i<14;i++){if(r()<0.6)g.fillRect(890+(i%7)*42,264+Math.floor(i/7)*48,16,22);}}
    else{g.fillStyle='#c9b9a4';g.fillRect(874,290,312,96);g.fillStyle='rgba(255,255,255,.5)';g.fillRect(874,94,312,60);}
    g.fillStyle=day?'#f6f1ea':'#3a3350';g.fillRect(1026,94,8,292);g.fillRect(874,236,312,8);
    g.fillStyle=day?'#e4ddd0':'#211b30';g.fillRect(820,70,50,340);                  /* curtain */
    g.fillStyle=day?'#cfc4b4':'#2b2436';g.beginPath();g.moveTo(0,560);g.quadraticCurveTo(640,520,W,560);g.lineTo(W,720);g.lineTo(0,720);g.closePath();g.fill();
    g.fillStyle=day?'#efeae0':'#d9d2c7';g.beginPath();g.moveTo(0,640);g.quadraticCurveTo(300,604,720,652);g.lineTo(720,720);g.lineTo(0,720);g.closePath();g.fill();
    g.fillStyle=day?'#fbf8f2':'#e9e4da';ell(g,180,656,120,28,-0.08);g.fill();
    g.fillStyle=day?'#6b4a34':'#4a3326';g.fillRect(160,470,310,20);g.fillStyle=day?'#8a6446':'#5a4030';g.fillRect(160,452,310,18);g.fillStyle=day?'#5a3c2a':'#3a281e';g.fillRect(176,490,16,100);g.fillRect(438,490,16,100);
    g.fillStyle=day?'#3a3340':'#2a2430';ell(g,240,452,30,8);g.fill();g.fillStyle='#8a7a66';g.fillRect(236,380,8,72);
    g.fillStyle=lamp?'#f2d9a8':(day?'#e8dcc4':'#5a5048');g.beginPath();g.moveTo(190,386);g.lineTo(290,386);g.lineTo(272,316);g.lineTo(208,316);g.closePath();g.fill();
    if(lamp){const L=g.createRadialGradient(240,400,0,240,400,400);L.addColorStop(0,'rgba(255,190,110,.42)');L.addColorStop(1,'rgba(255,190,110,0)');g.fillStyle=L;g.fillRect(0,0,W,H);g.fillStyle='rgba(255,200,130,.2)';g.fillRect(160,452,310,18);}
    if(day){const s=g.createRadialGradient(1000,180,0,1000,180,520);s.addColorStop(0,'rgba(255,248,220,.8)');s.addColorStop(1,'rgba(255,248,220,0)');g.fillStyle=s;g.fillRect(0,0,W,H);}
    return c;};
  A2_ROOM={lamp:paint(true,false),dark:paint(false,false),day:paint(false,true)};return A2_ROOM;
}
/* the little satin ribbon tag of hers (a loop and a tiny card) */
function a2_tag(ctx,x,y,s,rot){
  ctx.save();ctx.translate(x,y);ctx.rotate(rot||0);ctx.scale(s,s);
  ctx.fillStyle='rgba(0,0,0,.22)';ell(ctx,2,12,30,6);ctx.fill();
  ctx.strokeStyle='#efe0c8';ctx.lineWidth=5;ctx.lineCap='round';
  ctx.beginPath();ctx.moveTo(-4,4);ctx.bezierCurveTo(-42,-4,-36,-42,-8,-32);ctx.bezierCurveTo(12,-26,14,-6,-4,4);ctx.stroke();
  ctx.strokeStyle='rgba(255,255,255,.5)';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(-10,-2);ctx.bezierCurveTo(-36,-10,-32,-36,-10,-30);ctx.stroke();
  ctx.fillStyle='#fffdf6';rrect(ctx,-8,0,26,14,2);ctx.fill();ctx.strokeStyle='rgba(0,0,0,.2)';ctx.lineWidth=1;rrect(ctx,-8,0,26,14,2);ctx.stroke();
  ctx.fillStyle='rgba(0,0,0,.3)';ctx.fillRect(-4,5,16,1.5);ctx.fillRect(-4,9,10,1.5);
  ctx.restore();
}

/* ---------- 29 August · the library at five ---------- */
function a2_libraryOut(){
  const c=mk(W,H),g=c.getContext('2d'),r=rng(281);
  g.fillStyle=vgrad(g,0,160,[[0,'#7fb3e6'],[1,'#f3dfb6']]);g.fillRect(0,0,W,160);
  g.fillStyle='#9a4b3b';g.fillRect(0,120,W,420);
  g.strokeStyle='rgba(255,230,210,.16)';g.lineWidth=1;for(let y=140;y<540;y+=11){g.beginPath();g.moveTo(0,y);g.lineTo(W,y);g.stroke();}
  g.strokeStyle='rgba(60,20,10,.14)';for(let y=140,k=0;y<540;y+=11,k++){for(let x=(k%2)*20;x<W;x+=40){g.beginPath();g.moveTo(x,y);g.lineTo(x,y+11);g.stroke();}}
  g.fillStyle='rgba(255,220,170,.16)';g.fillRect(0,120,W,420);
  g.fillStyle='rgba(40,10,10,.16)';for(let i=0;i<40;i++){ell(g,r()*420,160+r()*360,30+r()*50,14+r()*20,r()*1.2);g.fill();}   /* tree dapple on the left wall */
  g.fillStyle='#7d3a2e';g.fillRect(0,120,W,16);g.fillStyle='#b07060';g.fillRect(0,136,W,4);
  g.fillStyle='#2b3a4a';g.fillRect(500,196,280,348);
  for(const x of[512,648]){g.fillStyle=vgrad(g,208,540,[[0,'#19242f'],[0.5,'#2d4256'],[1,'#141c24']]);g.fillRect(x,208,120,332);
    g.fillStyle='rgba(243,223,182,.26)';g.beginPath();g.moveTo(x,208);g.lineTo(x+120,208);g.lineTo(x+120,290);g.lineTo(x,350);g.closePath();g.fill();
    g.fillStyle='rgba(255,255,255,.08)';g.fillRect(x+40,208,6,332);g.fillStyle='#c9c3b8';g.fillRect(x===512?x+104:x+8,330,8,70);}
  g.fillStyle='#1f2a36';g.fillRect(470,150,340,40);g.fillStyle='#f3e9d8';g.font='700 22px "Mulish",sans-serif';g.textAlign='center';setLS(g,'5px');g.fillText('LIBRARY',640,179);setLS(g,'0px');
  for(const x of[150,290,910,1050]){g.fillStyle='#2b3a4a';g.fillRect(x,220,90,250);g.fillStyle='#1d2b38';g.fillRect(x+6,226,78,238);g.fillStyle='rgba(243,223,182,.2)';g.fillRect(x+6,226,78,80);g.fillStyle='#2b3a4a';g.fillRect(x+42,226,6,238);}
  g.fillStyle='#d8cdb8';g.fillRect(0,540,W,62);g.fillStyle='#c9bda8';g.fillRect(470,540,340,14);g.fillStyle='#bdb09b';g.fillRect(460,554,360,16);
  g.fillStyle='#6fa75a';g.fillRect(0,602,W,118);g.fillStyle='#86b96a';for(let i=0;i<70;i++){g.globalAlpha=0.3+r()*0.5;ell(g,r()*W,608+r()*108,30+r()*60,4+r()*5);g.fill();}g.globalAlpha=1;
  g.fillStyle='#d8cdb8';g.beginPath();g.moveTo(470,720);g.lineTo(560,602);g.lineTo(720,602);g.lineTo(810,720);g.closePath();g.fill();
  drawTreeClump(g,70,560,160,'#2d6a3a','#6fb25a',r);drawTreeClump(g,1220,560,140,'#2d6a3a','#6fb25a',r);
  return c;
}
function a2_bookcase(g,x,y,w,h,r){
  g.fillStyle='#7a5a42';g.fillRect(x,y,w,h);
  const rows=6,rh=h/rows,cols=['#b23b3b','#2f5d8a','#d9a441','#3f7a4a','#6a4c8a','#e7e0d0','#8a3a5a','#c66a3a','#4a7a8a','#9a9a5a'];
  for(let i=0;i<rows;i++){const sy=y+i*rh;g.fillStyle='#4a3326';g.fillRect(x+6,sy+6,w-12,rh-8);
    let bx=x+10;while(bx<x+w-16){const bw=6+r()*12,bh=rh-14-r()*12;if(r()<0.08){bx+=bw+6;continue;}g.fillStyle=cols[Math.floor(r()*cols.length)];g.fillRect(bx,sy+rh-4-bh,bw,bh);g.fillStyle='rgba(255,255,255,.2)';g.fillRect(bx+1,sy+rh-bh,bw-2,2);bx+=bw+1.5;}
    g.fillStyle='#8a6446';g.fillRect(x,sy+rh-4,w,4);}
  g.fillStyle='#8a6446';g.fillRect(x,y,w,6);
}
function a2_libraryIn(){
  const LW=1500,c=mk(LW,H),g=c.getContext('2d'),r=rng(282);
  g.fillStyle=vgrad(g,0,H,[[0,'#efe6d6'],[0.55,'#e2d6c2'],[1,'#c9b9a0']]);g.fillRect(0,0,LW,H);
  g.fillStyle='#f6f0e4';g.fillRect(0,0,LW,118);g.fillStyle='rgba(0,0,0,.07)';g.fillRect(0,114,LW,6);
  for(let x=120;x<LW;x+=300){g.fillStyle='#fff9e8';rrect(g,x,36,170,22,6);g.fill();}
  g.fillStyle=vgrad(g,460,H,[[0,'#d9cdb6'],[1,'#b7a78c']]);g.fillRect(0,460,LW,260);
  g.strokeStyle='rgba(255,255,255,.22)';g.lineWidth=1;for(let y=476;y<H;y+=30){g.beginPath();g.moveTo(0,y);g.lineTo(LW,y);g.stroke();}
  for(let x=-200;x<LW+200;x+=110){g.beginPath();g.moveTo(x,460);g.lineTo(x+(x-750)*0.22,H);g.stroke();}
  g.fillStyle='rgba(255,236,190,.35)';g.beginPath();g.moveTo(820,460);g.lineTo(1120,460);g.lineTo(1260,720);g.lineTo(760,720);g.closePath();g.fill();  /* the window's light on the floor */
  g.fillStyle='#3a3f4a';g.fillRect(872,124,176,326);g.fillStyle=vgrad(g,130,440,[[0,'#ffe9bd'],[1,'#f3cf8f']]);g.fillRect(880,132,160,310);g.fillStyle='#3a3f4a';g.fillRect(956,132,8,310);g.fillRect(880,280,160,8);
  a2_bookcase(g,20,126,390,336,r);a2_bookcase(g,430,126,390,336,r);
  g.fillStyle='#6b4a34';g.fillRect(1060,404,440,200);g.fillStyle='#8a6446';g.fillRect(1060,392,440,14);g.fillStyle='#5a3c2a';g.fillRect(1060,406,440,4);
  g.fillStyle='#22262e';rrect(g,1300,330,110,66,6);g.fill();g.fillStyle='#394250';rrect(g,1306,336,98,54,4);g.fill();g.fillStyle='#22262e';g.fillRect(1346,396,18,10);
  g.fillStyle='#e8e0d0';for(let k=0;k<4;k++){g.fillRect(1090+k*3,386-k*7,46,7);}
  g.fillStyle='#f3e9d8';rrect(g,1086,440,170,34,4);g.fill();g.fillStyle='#4a2f2a';g.font='700 15px "Mulish",sans-serif';g.textAlign='center';setLS(g,'3px');g.fillText('RECEPTION',1171,463);setLS(g,'0px');
  g.fillStyle='#a07a5a';g.fillRect(196,330,12,156);g.fillRect(532,330,12,156);
  g.fillStyle='#f3e9d8';rrect(g,214,352,70,24,3);g.fill();g.fillStyle='#4a2f2a';g.font='700 13px "Mulish",sans-serif';g.textAlign='center';g.fillText('ILS 27',249,369);
  return c;
}
const LIB_A=[
  {at:0,   who:'her',time:'12:30',text:'Bs Allah karay reports bhi sahi ayein'},
  {at:0,   who:'me', time:'12:30',text:'InshaAllah'},
  {at:4.4, who:'her',time:'12:31',text:'Ap khama kha aogay for itnay se ghnatay'},
  {at:5.8, who:'her',time:'12:31',text:'Ill meet you kisi din aur'},
  {at:6.7, who:'her',time:'12:31',text:'Ap choro'},
  {at:7.8, who:'me', time:'12:31',text:'nahiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii'},
  {at:9.4, who:'me', time:'12:31',text:'i saw your dram'},
  {at:9.8, who:'me', time:'12:31',text:'that i have to tell it to you'},
  {at:10.5,who:'me', time:'12:31',text:'kaafi galat dream'},
  {at:11.4,who:'her',time:'12:32',text:'Ohh fudgeee'},
  {at:12.4,who:'her',time:'12:33',text:'A ha phr 3 bajay tak ajao'},
  {at:14.0,who:'me', time:'12:33',text:'ok boss'},
  {at:14.5,who:'me', time:'12:33',text:'late hee aoga'},
];
const LIB_B=[
  {at:0,   who:'me', time:'15:35',text:'leaving'},
  {at:19.3,who:'me', time:'16:56',text:'Where are you'},
  {at:19.5,who:'me', time:'16:56',text:'Library ke andr yesss'},
  {at:20.5,who:'her',time:'16:57',text:'Yeahh'},
  {at:20.7,who:'her',time:'16:57',text:'Where re you?'},
  {at:20.9,who:'her',time:'16:57',text:'Ils 27'},
  {at:22.2,who:'me', time:'16:57',text:'Ye kahan hai'},
  {at:23.1,who:'her',time:'16:58',text:'Acha ekin arahi hun bahair wiat'},
  {at:23.3,who:'her',time:'16:58',text:'Let me pack'},
  {at:23.45,who:'her',time:'16:58',text:'Wese ground floor'},
  {at:23.6,who:'her',time:'16:58',text:'Left of reception walay'},
  {at:25.0,who:'me', time:'16:58',text:'I am coming'},
  {at:25.3,who:'me', time:'16:58',text:'Not in library'},
  {at:26.6,who:'me', time:'16:58',text:'Ruko'},
  {at:27.7,who:'her',time:'16:59',text:'Ohkkay'},
];
scene({id:'libraryfive',name:'29 August · the library at five',when:'2026-08-29T16:56',bars:11,fin:['#000000',1.2],fout:['#000000',1.4],
  note:'noon in the borrowed room, the phone: she tries to call it off, he will not, there is a dream to tell her in person; then the red brick of the IBA library at four minutes to five, the reception desk, a turn left, and her at ILS 27 packing her bag.',
  tag:'“Library ke andr yesss” · “Left of reception walay”',
  prep(){return{R:a2_room(),out:a2_libraryOut(),inn:a2_libraryIn()};},
  draw(ctx,lt,A){
    if(lt<15.6){
      ctx.drawImage(A.R.day,0,0);
      const S=drawPhoneHand(ctx,lt,{x:475,y:120,w:330,h:700});
      chatPanel(ctx,S,LIB_A,lt,{name:'Fabeha',status:'online',dark:false,draft:lt>7&&lt<8?'nahiiiiiiiiiiiiii':undefined});
      phoneTop(ctx,S,{time:lt<4.4?'12:30':lt<11.4?'12:31':lt<12.4?'12:32':'12:33'});
      ctx.fillStyle='rgba(255,248,220,.08)';ctx.fillRect(0,0,W,H);
      const dip=smooth(15.1,15.6,lt);if(dip>0){ctx.fillStyle=`rgba(0,0,0,${dip})`;ctx.fillRect(0,0,W,H);}
      return;
    }
    if(lt<29.0){
      const z=1+0.07*smooth(15.6,29,lt);
      ctx.save();ctx.translate(640,420);ctx.scale(z,z);ctx.translate(-640,-420);ctx.drawImage(A.out,0,0);ctx.restore();
      sunGlow(ctx,120,80,520,'rgba(255,236,190,0.5)');motes(ctx,lt,30,283,'#fff6cc',1.3,0.5);
      const S=drawPhoneHand(ctx,lt,{x:880,y:130,w:330,h:700});
      chatPanel(ctx,S,LIB_B,lt,{name:'Fabeha',status:'online',dark:false,draft:lt>18.4&&lt<19.3?'Where are you':undefined});
      phoneTop(ctx,S,{time:lt<19.3?'16:55':lt<20.5?'16:56':lt<23.1?'16:57':lt<27.7?'16:58':'16:59'});
      const dip=(1-smooth(15.6,16.3,lt))+smooth(28.5,29.0,lt);if(dip>0){ctx.fillStyle=`rgba(0,0,0,${clamp(dip)})`;ctx.fillRect(0,0,W,H);}
      return;
    }
    /* inside: the reception on the right, then the look to the left where she is */
    const pan=smooth(29.2,33.2,lt),ox=lerp(-220,0,pan);
    ctx.drawImage(A.inn,ox,0);
    motes(ctx,lt,24,284,'#fff6cc',1.2,0.4);
    const her=smooth(30.4,31.8,lt);
    if(her>0){
      const up=smooth(32.0,33.4,lt),laugh=lt>34.4;
      ctx.save();ctx.translate(ox,0);
      ctx.globalAlpha=her;
      drawFabeha(ctx,370,404,1.0,{t:lt,outfit:'black',hair:'halfup',pose:'bust',arms:'lap',smile:lerp(0.35,0.95,up),eyes:laugh?'happy':undefined,look:lerp(-0.15,0.1,up),tilt:lerp(0.14,0.0,up)+Math.sin(lt*0.5)*0.015,blush:0.3+0.45*up,wind:0.05,len:150});
      ctx.fillStyle='#8a6446';ctx.fillRect(200,470,340,16);ctx.fillStyle='#6b4a34';ctx.fillRect(200,486,340,134);ctx.fillStyle='rgba(0,0,0,.18)';ctx.fillRect(200,600,340,20);
      ctx.fillStyle='#2f4b6e';rrect(ctx,436,414,82,62,12);ctx.fill();ctx.fillStyle='#1f3550';rrect(ctx,446,408,62,14,6);ctx.fill();ctx.fillStyle='#3a5a80';ctx.fillRect(446,438,62,6);
      ctx.fillStyle='#f4efe6';ctx.fillRect(226,448,70,22);ctx.fillStyle='#d9d0c2';ctx.fillRect(226,448,70,4);
      ctx.restore();
    }
    const py=130+760*smooth(29.4,30.8,lt);
    if(py<H){const S=drawPhoneHand(ctx,lt,{x:880,y:py,w:330,h:700});chatPanel(ctx,S,LIB_B,lt,{name:'Fabeha',status:'online',dark:false});phoneTop(ctx,S,{time:'16:59'});}
    ctx.fillStyle='rgba(255,236,190,.08)';ctx.fillRect(0,0,W,H);
    const dip=1-smooth(29.0,29.8,lt);if(dip>0){ctx.fillStyle=`rgba(0,0,0,${dip})`;ctx.fillRect(0,0,W,H);}
  },
  subs:[
    [0.7,4.1,'29 August, half past twelve. She had to be home by half past seven and in the library till then. She tried to call it off.'],
    [4.5,6.5,'Ap khama kha aogay for itnay se ghnatay','her'],
    [6.8,7.7,'Ap choro','her'],
    [8.1,9.2,'nahiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii','him'],
    [9.5,12.1,'I had dreamt about her, a wrong, worrying dream, and it had to be told to her face. She gave in.'],
    [12.5,13.8,'A ha phr 3 bajay tak ajao','her'],
    [14.1,15.1,'ok boss','him'],
    [16.2,19.0,'The water at my friend’s place chose that afternoon to stop. I left at 15:35 and reached the library at four minutes to five.'],
    [19.4,20.5,'Library ke andr yesss','him'],
    [20.9,21.9,'Ils 27','her'],
    [22.2,23.1,'Ye kahan hai','him'],
    [23.6,25.0,'Left of reception walay','her'],
    [25.3,26.4,'Not in library','him'],
    [26.6,27.4,'Ruko','him'],
    [27.7,28.6,'Ohkkay','her'],
    [30.2,35.2,'Ground floor, left of the reception desk, the last carrel: she was packing her bag. And I still had the dream to tell her.'],
  ],
  score({T,hit,bars,melody,THEME_B}){
    bars(0,5,['Em','Cmaj7','G','Dsus'],{strings:true,padVel:0.4});
    for(let b=1;b<4;b++)melody(b,b-1,'box',12,0.3,THEME_B);
    bars(5,6,['G','Em7','Cadd9','D'],{strings:true,padVel:0.44,arp:true,arpVel:0.12,step:1});
    for(let b=6;b<10;b++)melody(b,b-6,'flute',0,0.4,THEME_B);
    hit(31.0,'chime',{midi:79,vel:0.5});hit(32.4,'chime',{midi:83,vel:0.45});
    for(const m of LIB_A)if(m.at>0)hit(m.at,'tick',{hi:m.who==='her'});
    for(const m of LIB_B)if(m.at>0)hit(m.at,'tick',{hi:m.who==='her'});
    [16.4,17.9,21.3,24.2].forEach(t=>hit(t,'bird',{f:2300+((t*977)%800)}));
  },
  amb(lt){return lt<15.6?{room:0.3}:lt<29?{wind:0.2}:{room:0.28};},
});

/* ---------- 29 August · 19:49 — the perfume that would not wash off ---------- */
function a2_nightRoadLayer(){
  const c=mk(W,H),g=c.getContext('2d'),r=rng(291);
  g.fillStyle=vgrad(g,0,H,[[0,'#05060e'],[0.32,'#120f24'],[0.46,'#2b1c2a']]);g.fillRect(0,0,W,H);
  for(let i=0;i<70;i++){const x=r()*W,h=10+r()*70,w=14+r()*40;g.fillStyle='#15122a';g.fillRect(x,A2_VY-h+6,w,h);g.fillStyle='rgba(255,210,140,.6)';for(let k=0;k<4;k++){if(r()<0.35)g.fillRect(x+3+(k%2)*8,A2_VY-h+12+Math.floor(k/2)*12,4,6);}}
  g.fillStyle='rgba(255,140,80,.12)';g.fillRect(0,A2_VY-90,W,100);
  g.fillStyle='#1f1c24';g.beginPath();g.moveTo(A2_VX-26,A2_VY);g.lineTo(A2_VX+26,A2_VY);g.lineTo(W+320,H);g.lineTo(-320,H);g.closePath();g.fill();
  g.fillStyle='#4a4650';g.beginPath();g.moveTo(-320,H);g.lineTo(A2_VX-26,A2_VY);g.lineTo(A2_VX-20,A2_VY);g.lineTo(-290,H);g.closePath();g.fill();g.beginPath();g.moveTo(W+320,H);g.lineTo(A2_VX+26,A2_VY);g.lineTo(A2_VX+20,A2_VY);g.lineTo(W+290,H);g.closePath();g.fill();
  g.fillStyle='#0d0c16';g.fillRect(0,A2_VY,W,2);
  return c;
}
function a2_nightRoad(ctx,lt,A){
  ctx.drawImage(A.road,0,0);stars(ctx,lt,140,292,220,0.6);
  for(let k=0;k<7;k++){const u=1-((lt*0.11+k/7)%1),s=Math.pow(1-u,1.4),x=A2_VX+0.9*(1-u)*(1-u)*560+40,y=lerp(600,A2_VY,Math.pow(u,0.8));if(s<0.06)continue;
    ctx.fillStyle='#2a2830';ctx.fillRect(x-3*s,y-170*s,6*s,170*s);ctx.fillRect(x-40*s,y-170*s,40*s,4*s);glow(ctx,x-40*s,y-168*s,60*s+6,'#ffb347',0.75);
    const pool=ctx.createRadialGradient(x-40*s,y,0,x-40*s,y,70*s);pool.addColorStop(0,'rgba(255,180,90,.22)');pool.addColorStop(1,'rgba(255,180,90,0)');ctx.fillStyle=pool;ctx.fillRect(x-120*s,y-30*s,160*s,50*s);}
  for(let k=0;k<3;k++){const u=0.25+((lt*0.07+k*0.31)%0.7),s=Math.pow(1-u,1.5),x=A2_VX+0.5*(1-u)*(1-u)*560,y=lerp(600,A2_VY,Math.pow(u,0.8))-60*s;glow(ctx,x-24*s,y,90*s+8,'#fff1c8',0.85);glow(ctx,x+24*s,y,90*s+8,'#fff1c8',0.85);}
  ctx.fillStyle='#8f8a7a';for(let k=0;k<8;k++){const u=1-((lt*0.11+k/8)%1),yy=lerp(600,A2_VY,Math.pow(u,0.8)),ww=(1-u)*(1-u)*20+1,hh=(1-u)*(1-u)*40+2;if(yy<A2_VY+6)continue;ctx.fillRect(A2_VX-ww/2,yy,ww,hh);}
  a2_vehicle(ctx,'sedan',0.56+0.01*Math.sin(lt*0.5),-0.2,lt,true,7);
}
/* what he pictured: her basin, the mirror light, the tap run twice, the scent still on her hand */
function a2_basin(ctx,lt,a){
  if(a<=0)return;
  ctx.save();ctx.globalAlpha=a;
  ctx.fillStyle=vgrad(ctx,0,H,[[0,'#e7edf0'],[0.5,'#d3dde2'],[1,'#b9c6cc']]);ctx.fillRect(0,0,W,H);
  ctx.strokeStyle='rgba(255,255,255,.5)';ctx.lineWidth=2;for(let y=120;y<H;y+=90){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}for(let x=40;x<W;x+=120){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke();}
  ctx.fillStyle='#fff9ea';rrect(ctx,300,40,680,26,13);ctx.fill();glow(ctx,640,56,520,'#fff4d6',0.8);glow(ctx,640,56,260,'#ffffff',0.6);
  ctx.fillStyle='rgba(255,255,255,.35)';ctx.fillRect(360,80,560,250);ctx.strokeStyle='rgba(255,255,255,.7)';ctx.lineWidth=6;ctx.strokeRect(360,80,560,250);
  ctx.fillStyle='#f4f6f6';ell(ctx,640,540,250,70);ctx.fill();ctx.fillStyle='#d8dfe2';ell(ctx,640,536,214,48);ctx.fill();ctx.fillStyle='#c6d0d4';ell(ctx,640,540,180,34);ctx.fill();
  ctx.fillStyle='#c9ccd0';rrect(ctx,626,380,28,110,10);ctx.fill();ctx.fillStyle='#e2e5e8';rrect(ctx,600,372,80,22,10);ctx.fill();ctx.fillStyle='#b4b9bf';rrect(ctx,630,394,20,70,6);ctx.fill();
  const run=(lt>13.2&&lt<15.3)||(lt>16.2&&lt<18.2);
  ctx.strokeStyle='#e7c9d3';ctx.lineWidth=48;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(1120,780);ctx.quadraticCurveTo(930,660,712,520);ctx.stroke();
  ctx.fillStyle=FB.skin;ell(ctx,676,504,46,28,-0.3);ctx.fill();
  for(let k=0;k<4;k++){ell(ctx,636-k*5+Math.sin(lt*2+k)*1.5,486+k*13,24,8.5,-0.5+k*0.16);ctx.fill();}
  ell(ctx,700,470,11,20,-0.5);ctx.fill();
  ctx.fillStyle=hexA(FB.skinSh,0.45);ell(ctx,690,516,26,10,-0.3);ctx.fill();
  if(run){ctx.strokeStyle='rgba(200,232,250,.9)';ctx.lineWidth=8;ctx.beginPath();ctx.moveTo(640,462);ctx.quadraticCurveTo(641+Math.sin(lt*30)*2,486,640,500);ctx.stroke();ctx.strokeStyle='rgba(255,255,255,.75)';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(642,464);ctx.lineTo(642,498);ctx.stroke();
    ctx.strokeStyle='rgba(255,255,255,.8)';ctx.lineWidth=2;for(let k=0;k<6;k++){const rr=4+((lt*70+k*19)%44);ell(ctx,644,500,rr*1.5,rr*0.4);ctx.stroke();}
    ctx.fillStyle='rgba(255,255,255,.8)';for(let k=0;k<8;k++){const ph=lt*9+k*1.3,dx=Math.cos(ph)*(14+k*4),dy=-Math.abs(Math.sin(ph))*18;circle(ctx,644+dx,498+dy,1.6);ctx.fill();}}
  if(!run){ctx.strokeStyle='rgba(255,255,255,.55)';ctx.lineWidth=2;for(let k=0;k<3;k++){const ph=lt*1.2+k*2.1,x=650+k*22,y0=470;ctx.beginPath();for(let j=0;j<=16;j++){const t=j/16;ctx.lineTo(x+Math.sin(ph+t*5)*12*(1-t*0.5),y0-t*130);}ctx.stroke();}}
  ctx.fillStyle='rgba(255,226,180,.14)';ctx.fillRect(0,0,W,H);
  const v=ctx.createRadialGradient(640,400,200,640,400,760);v.addColorStop(0,'rgba(120,100,120,0)');v.addColorStop(1,'rgba(110,90,110,.55)');ctx.fillStyle=v;ctx.fillRect(0,0,W,H);
  ctx.restore();
}
const PERF=[
  {at:3.5, who:'her',time:'19:49',text:'Youve transmiteed your perfume scent on me 😭😭'},
  {at:5.7, who:'her',time:'19:49',text:'Ye valentino wala nhi hai'},
  {at:7.1, who:'her',time:'19:50',text:'The one youre wearinh'},
  {at:8.5, who:'me', time:'20:35',text:'Han'},
  {at:9.4, who:'me', time:'20:35',text:'Kyu kisi ne pucha hai kya'},
  {at:10.9,who:'her',time:'20:58',text:'Nhi nhi but i sniffed my hand aisay hi'},
  {at:13.0,who:'her',time:'20:58',text:'The worst part is mene apne hath do dafa wash kiay phir bhi arahi hai lol'},
  {at:19.1,who:'me', time:'22:34',text:'But i didnt touched your hands'},
  {at:20.8,who:'me', time:'22:34',text:'Bhaee'},
  {at:21.7,who:'me', time:'22:34',text:'😭 i am so glad i have you naa'},
];
scene({id:'perfume2',name:'29 August · the perfume',when:'2026-08-29T19:49',bars:8,fin:['#000000',1.2],fout:['#000000',1.4],
  note:'driving back across Karachi at night, the phone in the mount: his perfume is on her hand, two washes have not shifted it; he pictures the basin and the mirror light, and takes till half past ten to answer that he never touched her hands.',
  tag:'“do dafa wash kiay phir bhi arahi hai”',
  prep(){return{road:a2_nightRoadLayer()};},
  draw(ctx,lt,A){
    const dream=smooth(13.3,14.3,lt)*(1-smooth(18.3,19.0,lt));
    a2_nightRoad(ctx,lt,A);
    /* the phone comes up into his hand to read her, drops while he pictures the basin, comes up again to answer */
    const up=clamp(smooth(3.0,3.8,lt)*(1-smooth(12.9,13.7,lt))+smooth(18.8,19.6,lt));
    a2_cockpit(ctx,lt,{dark:true,right:up<0.5});
    const time=lt<3.5?'19:48':lt<7.1?'19:49':lt<8.5?'19:50':lt<10.9?'20:35':lt<19.1?'20:58':'22:34';
    if(up<0.02)a2_mountPhone(ctx,lt,PERF,{dark:true,time});else a2_mountPhone(ctx,lt,[],{empty:true});
    if(up>0.01){
      const S=drawPhoneHand(ctx,lt,{x:880,y:lerp(820,130,easeOut(up)),w:330,h:700});
      chatPanel(ctx,S,PERF,lt,{name:'Fabeha',status:'online',draft:lt>18.0&&lt<19.1?'But i didnt touched':undefined});
      phoneTop(ctx,S,{time});
    }
    ctx.fillStyle='rgba(20,10,30,.1)';ctx.fillRect(0,0,W,H);
    a2_basin(ctx,lt,dream);
  },
  subs:[
    [0.6,3.2,'Seven minutes to eight. I was driving back across Karachi.'],
    [3.6,5.6,'Youve transmiteed your perfume scent on me 😭😭','her'],
    [5.8,7.0,'Ye valentino wala nhi hai','her'],
    [7.2,8.3,'The one youre wearinh','her'],
    [8.6,9.3,'Han','him'],
    [9.5,10.8,'Kyu kisi ne pucha hai kya','him'],
    [11.0,12.8,'Nhi nhi but i sniffed my hand aisay hi','her'],
    [13.1,16.0,'The worst part is mene apne hath do dafa wash kiay phir bhi arahi hai lol','her'],
    [16.4,18.8,'Two washes. Still there. It took me till half past ten to answer.'],
    [19.2,20.6,'But i didnt touched your hands','him'],
    [20.9,21.6,'Bhaee','him'],
    [21.9,24.6,'😭 i am so glad i have you naa','him'],
  ],
  score({hit,bars,melody,THEME_B}){
    bars(0,8,['G','Em7','Cmaj7','D'],{padVel:0.36,arp:true,arpVel:0.12,step:1});
    for(let b=2;b<6;b++)melody(b,b-2,'box',12,0.32,THEME_B);
    hit(13.3,'chime',{midi:84,vel:0.45});hit(16.4,'chime',{midi:81,vel:0.4});
    for(const m of PERF)if(m.at>0)hit(m.at,'tick',{hi:m.who==='her'});
  },
  amb(lt){const d=lt>13.3&&lt<19?1:0;return{hum:d?0.2:0.5,waves:d?0.22:0,room:d?0.15:0};},
});

/* ---------- 30 August · 00:43 — the ribbon tag, midnight after the majestic day ---------- */
/* his two real photographs of that night (film/photos/): the tag tied round his wrist, the laptop, the friend's room */
const A2_PHOTO_FILES=['00046193-PHOTO-2026-08-30-00-46-49.jpg','00046194-PHOTO-2026-08-30-00-46-51.jpg'],A2_PHOTOS={};
function a2_photo(name){if(!A2_PHOTOS[name]){const im=new Image();im.src='photos/'+name;A2_PHOTOS[name]=im;}return A2_PHOTOS[name];}
function a2_ready(im){return !!(im&&im.complete&&im.naturalWidth);}
/* draw an image to cover a box, keeping the point (fx,fy) (0..1 of the image) as near the box centre as the crop allows */
function a2_cover(g,im,x,y,w,h,fx=0.5,fy=0.5){
  const s=Math.max(w/im.naturalWidth,h/im.naturalHeight),iw=im.naturalWidth*s,ih=im.naturalHeight*s;
  const ox=clamp(x+w/2-fx*iw,x+w-iw,x),oy=clamp(y+h/2-fy*ih,y+h-ih,y);
  g.drawImage(im,ox,oy,iw,ih);
}
function a2_tagPhoto(g,px,py,tile,k){
  const im=a2_photo(A2_PHOTO_FILES[k?1:0]);
  if(a2_ready(im)){a2_cover(g,im,px,py,tile,tile,0.5,0.7);return;}
  g.fillStyle=vgrad(g,py,py+tile,[[0,'#e6e2da'],[1,'#c6c0b4']]);g.fillRect(px,py,tile,tile);
  g.strokeStyle='rgba(255,255,255,.4)';g.lineWidth=3;for(let i=0;i<3;i++){g.beginPath();g.moveTo(px,py+tile*(0.2+i*0.3));g.quadraticCurveTo(px+tile/2,py+tile*(0.1+i*0.3),px+tile,py+tile*(0.25+i*0.3));g.stroke();}
  a2_tag(g,px+tile*0.55,py+tile*0.5,tile/70,k?0.5:-0.3);
}
const RIB=[
  {at:0,   who:'her',time:'00:14',text:'💕'},
  {at:4.6, who:'me', time:'00:43',text:'Sogayi ap?'},
  {at:6.0, who:'her',time:'00:46',text:'Nhi i did sleep beech nein ab ankh khuk gai'},
  {at:7.2, who:'me', time:'00:46',photos:2,paint:a2_tagPhoto},
  {at:8.4, who:'me', time:'00:47',text:'I feel happy ke. Apka kuch hai mere pass'},
  {at:10.6,who:'me', time:'00:47',text:'Also sad ke kya hai 😭'},
  {at:12.0,who:'her',time:'00:47',text:'Shirt ka ribbon tag😭😭😭'},
  {at:13.6,who:'me', time:'00:48',text:'Ab tou saar pe hooga mere'},
  {at:14.4,who:'me', time:'00:49',text:'Please jaana nahi'},
  {at:15.1,who:'her',time:'00:49',text:'🤭🤭🥹🥹🥹🥹'},
  {at:15.6,who:'me', time:'00:53',text:'Humne khaana nahi khaya'},
  {at:16.2,who:'her',time:'00:54',text:'I was fulll'},
  {at:16.6,who:'her',time:'00:54',text:'Ammi nade mutton raan lol kuch zyada kha hi nhi payi'},
  {at:17.7,who:'her',time:'00:56',text:'With karahi and taftan'},
  {at:19.6,who:'her',time:'00:58',text:'Ae dont eat it with rice'},
  {at:20.6,who:'her',time:'00:58',text:'We eat it with naan or taftan'},
  {at:22.8,who:'her',time:'00:58',text:'IA'},
  {at:24.0,who:'her',time:'01:00',text:'But apki amma?'},
  {at:25.4,who:'me', time:'01:00',text:'Mein dekhlooga'},
  {at:26.0,who:'me', time:'01:00',text:'InshaAllah'},
  {at:26.3,who:'me', time:'01:00',text:'Sab maanege'},
  {at:26.9,who:'her',time:'01:00',text:'InshaAllah InshaAllah'},
];
scene({id:'ribbon',name:'30 August · the ribbon tag',when:'2026-08-30T00:43',bars:9,fin:['#000000',1.2],fout:['#000000',1.6],
  note:'a mattress on a friend’s floor after midnight, the lamp; his two real photographs of the small ribbon tag of hers tied round his wrist; the phone: mutton raan with karahi and taftan, “But apki amma?”.',
  tag:'“Apka kuch hai mere pass” · “Mein dekhlooga”',
  prep(){return{R:a2_room(),p1:a2_photo(A2_PHOTO_FILES[0]),p2:a2_photo(A2_PHOTO_FILES[1])};},
  draw(ctx,lt,A){
    ctx.drawImage(A.R.lamp,0,0);
    const S=drawPhoneHand(ctx,lt,{x:880,y:130,w:330,h:700});
    chatPanel(ctx,S,RIB,lt,{name:'Fabeha',status:lt<6?'last seen today at 00:14':'online',draft:lt>3.4&&lt<4.6?'Sogayi ap?':undefined});
    phoneTop(ctx,S,{time:lt<4.6?'00:43':lt<8.4?'00:46':lt<12?'00:47':lt<14.4?'00:48':lt<15.6?'00:49':lt<16.2?'00:53':lt<17.7?'00:54':lt<19.6?'00:56':lt<24?'00:58':'01:00'});
    const pg=ctx.createRadialGradient(1040,420,0,1040,420,420);pg.addColorStop(0,'rgba(150,190,230,.1)');pg.addColorStop(1,'rgba(150,190,230,0)');ctx.fillStyle=pg;ctx.fillRect(0,0,W,H);
    /* the photograph itself, full frame for a few seconds: the whole picture first, then a slow push in to the wrist */
    const im=a2_ready(A.p2)?A.p2:a2_ready(A.p1)?A.p1:null,a=smooth(7.6,8.4,lt)*(1-smooth(11.3,12.0,lt));
    if(im&&a>0){
      const z=easeIO(smooth(8.0,11.4,lt)),fit=H/im.naturalHeight,cover=W/im.naturalWidth*1.12,s=lerp(fit,cover,z),iw=im.naturalWidth*s,ih=im.naturalHeight*s;
      const fx=lerp(0.5,0.54,z)*iw,fy=lerp(0.5,0.77,z)*ih,ox=clamp(640-fx,Math.min(0,W-iw),Math.max(0,640-iw/2)),oy=clamp(360-fy,Math.min(0,H-ih),0);
      ctx.save();ctx.globalAlpha=a;ctx.fillStyle='rgba(6,5,12,.8)';ctx.fillRect(0,0,W,H);
      ctx.shadowColor='rgba(0,0,0,.6)';ctx.shadowBlur=40;ctx.drawImage(im,ox,oy,iw,ih);ctx.shadowBlur=0;
      ctx.fillStyle='rgba(255,210,150,.06)';ctx.fillRect(0,0,W,H);
      ctx.fillStyle='rgba(255,255,255,.7)';ctx.font='500 13px "Mulish",sans-serif';ctx.textAlign='left';setLS(ctx,'2px');ctx.fillText('30 AUGUST · 00:46',40,H-40);setLS(ctx,'0px');
      ctx.restore();
    }
  },
  subs:[
    [0.8,4.3,'29 August was the last time I saw her. That midnight, round my wrist, one small thing of hers I had kept.'],
    [4.7,5.8,'Sogayi ap?','him'],
    [6.1,8.1,'Nhi i did sleep beech nein ab ankh khuk gai','her'],
    [8.5,10.4,'I feel happy ke. Apka kuch hai mere pass','him'],
    [10.7,11.8,'Also sad ke kya hai 😭','him'],
    [12.1,13.4,'Shirt ka ribbon tag😭😭😭','her'],
    [13.7,15.0,'Ab tou saar pe hooga mere','him'],
    [15.4,17.4,'We never did eat. At home her mother had made mutton raan; she was too full to do it justice.'],
    [17.8,19.3,'With karahi and taftan','her'],
    [19.7,21.0,'Ae dont eat it with rice','her'],
    [21.3,22.5,'The first time I visit, she said. If.'],
    [22.9,23.7,'IA','her'],
    [24.1,25.1,'But apki amma?','her'],
    [25.5,26.5,'Mein dekhlooga','him'],
    [27.0,28.3,'InshaAllah InshaAllah','her'],
  ],
  score({hit,bars,melody,THEME_B}){
    bars(0,9,['G','Em','Cmaj7','D'],{padVel:0.3});
    for(let b=1;b<8;b++)melody(b,b-1,'box',12,0.38,THEME_B);
    for(const m of RIB)if(m.at>0)hit(m.at,'tick',{hi:m.who==='her'});
  },
  amb(lt){return{room:0.3};},
});

/* ---------- 30 August · 01:11 — the 2 a.m. rider ---------- */
function a2_map(ctx,S,lt,u){
  ctx.save();rrect(ctx,S.x,S.y,S.w,S.h,S.r);ctx.clip();
  ctx.fillStyle='#161b24';ctx.fillRect(S.x,S.y,S.w,S.h);
  ctx.strokeStyle='#242b38';ctx.lineWidth=5;for(let y=S.y+70;y<S.y+S.h;y+=52){ctx.beginPath();ctx.moveTo(S.x,y);ctx.lineTo(S.x+S.w,y);ctx.stroke();}for(let x=S.x+24;x<S.x+S.w;x+=58){ctx.beginPath();ctx.moveTo(x,S.y);ctx.lineTo(x,S.y+S.h);ctx.stroke();}
  ctx.strokeStyle='#30394a';ctx.lineWidth=11;ctx.beginPath();ctx.moveTo(S.x-10,S.y+420);ctx.lineTo(S.x+S.w+10,S.y+300);ctx.stroke();ctx.beginPath();ctx.moveTo(S.x+120,S.y-10);ctx.lineTo(S.x+150,S.y+S.h+10);ctx.stroke();
  ctx.fillStyle='#1d3a2e';rrect(ctx,S.x+170,S.y+360,120,90,8);ctx.fill();rrect(ctx,S.x+30,S.y+110,80,60,8);ctx.fill();
  const P=[[S.x+46,S.y+S.h-200],[S.x+46,S.y+372],[S.x+208,S.y+372],[S.x+208,S.y+186],[S.x+S.w-56,S.y+186]];
  ctx.strokeStyle='#2ec27e';ctx.lineWidth=4;ctx.lineJoin='round';ctx.beginPath();P.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));ctx.stroke();
  let L=0;const segs=[];for(let i=1;i<P.length;i++){const d=Math.hypot(P[i][0]-P[i-1][0],P[i][1]-P[i-1][1]);segs.push(d);L+=d;}
  let d=clamp(u)*L,bx=P[0][0],by=P[0][1];for(let i=0;i<segs.length;i++){if(d<=segs[i]){const t=d/segs[i];bx=lerp(P[i][0],P[i+1][0],t);by=lerp(P[i][1],P[i+1][1],t);break;}d-=segs[i];bx=P[i+1][0];by=P[i+1][1];}
  ctx.fillStyle='#8a94a6';circle(ctx,P[0][0],P[0][1],7);ctx.fill();
  const px=P[4][0],py=P[4][1];ctx.fillStyle='#e8453c';ctx.beginPath();ctx.moveTo(px,py);ctx.lineTo(px-12,py-22);ctx.arc(px,py-26,12,Math.PI*0.9,Math.PI*2.1);ctx.closePath();ctx.fill();ctx.fillStyle='#fff';circle(ctx,px,py-26,4.5);ctx.fill();
  glow(ctx,bx,by,26,'#2ec27e',0.5);ctx.fillStyle='#fff';circle(ctx,bx,by,9);ctx.fill();ctx.fillStyle='#2ec27e';circle(ctx,bx,by,6.5);ctx.fill();
  ctx.fillStyle='#1a1a22';circle(ctx,bx-4,by+1,2.6);ctx.fill();circle(ctx,bx+4,by+1,2.6);ctx.fill();
  ctx.fillStyle='rgba(22,27,36,.94)';ctx.fillRect(S.x,S.y+36,S.w,124);ctx.fillStyle='#2a3140';ctx.fillRect(S.x,S.y+160,S.w,1);
  ctx.fillStyle='#e9edef';ctx.font='700 15px "Mulish",sans-serif';ctx.textAlign='left';ctx.fillText('Delivery',S.x+22,S.y+66);ctx.fillStyle='#8696a0';ctx.font='500 12px "Mulish",sans-serif';ctx.textAlign='right';ctx.fillText('01:3'+Math.min(9,Math.floor(u*10)),S.x+S.w-18,S.y+66);
  ctx.fillStyle='#d8b4a0';circle(ctx,S.x+44,S.y+118,20);ctx.fill();ctx.fillStyle='#2a2430';ell(ctx,S.x+44,S.y+110,14,10);ctx.fill();ctx.fillStyle='#394250';rrect(ctx,S.x+30,S.y+124,28,16,6);ctx.fill();
  ctx.fillStyle='#e9edef';ctx.font='700 15px "Mulish",sans-serif';ctx.textAlign='left';ctx.fillText(u<1?'Rider on the way':'Rider has arrived',S.x+76,S.y+114);
  ctx.fillStyle='#8696a0';ctx.font='500 12px "Mulish",sans-serif';ctx.fillText(u<1?'Parcel · 1 bag · ETA '+Math.max(1,Math.round((1-u)*16))+' min':'Parcel handed over',S.x+76,S.y+134);
  ctx.fillStyle='#2ec27e';ctx.fillRect(S.x+76,S.y+146,(S.w-100)*clamp(u),3);ctx.fillStyle='#2a3140';ctx.fillRect(S.x+76+(S.w-100)*clamp(u),S.y+146,(S.w-100)*(1-clamp(u)),3);
  ctx.restore();
}
/* what he pictured at 02:12: a lane asleep, a bike's headlamp on the gate, her hand taking the bag */
function a2_gate(ctx,lt,a){
  if(a<=0)return;
  ctx.save();ctx.globalAlpha=a;
  paintSky(ctx,[[0,'#04060e'],[0.5,'#0a0f20'],[1,'#141a2a']]);stars(ctx,lt,90,311,260,0.55);
  ctx.fillStyle='#0b0d16';for(let i=0;i<9;i++){const x=i*150-20,h=80+((i*53)%70);ctx.fillRect(x,250-h,120,h+4);}
  ctx.fillStyle='#0f1118';ctx.beginPath();ctx.moveTo(1040,250);ctx.quadraticCurveTo(1010,120,1120,110);ctx.quadraticCurveTo(1230,100,1240,200);ctx.quadraticCurveTo(1280,250,1280,260);ctx.lineTo(1040,260);ctx.closePath();ctx.fill();
  ctx.fillStyle='#1c1b26';ctx.fillRect(0,250,W,250);ctx.fillStyle='#25242f';ctx.fillRect(0,250,W,14);
  ctx.fillStyle='#15171f';ctx.fillRect(0,500,W,220);ctx.fillStyle='#1b1d26';ctx.fillRect(0,500,W,8);
  ctx.fillStyle='#06070c';ctx.fillRect(716,268,212,232);
  /* her, behind the gate in the dark: a silhouette, and the arm that comes through the bars */
  ctx.fillStyle='#161a2a';ctx.beginPath();ctx.moveTo(846,500);ctx.lineTo(846,420);ctx.quadraticCurveTo(848,386,868,378);ctx.quadraticCurveTo(858,350,870,330);ctx.quadraticCurveTo(900,310,918,340);ctx.quadraticCurveTo(926,360,916,380);ctx.quadraticCurveTo(928,400,928,500);ctx.closePath();ctx.fill();
  ctx.fillStyle='#1a1e30';circle(ctx,892,350,20);ctx.fill();
  ctx.strokeStyle='#d9bcc6';ctx.lineWidth=20;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(896,412);ctx.quadraticCurveTo(850,430,790,446);ctx.stroke();
  ctx.strokeStyle='#3a3842';ctx.lineWidth=6;for(let x=730;x<924;x+=24){ctx.beginPath();ctx.moveTo(x,268);ctx.lineTo(x,500);ctx.stroke();}
  ctx.lineWidth=8;for(const y of[300,478]){ctx.beginPath();ctx.moveTo(716,y);ctx.lineTo(928,y);ctx.stroke();}
  ctx.fillStyle='#2a2834';ctx.fillRect(706,262,12,240);ctx.fillRect(926,262,12,240);
  const beam=ctx.createLinearGradient(500,470,940,470);beam.addColorStop(0,'rgba(255,236,190,.55)');beam.addColorStop(1,'rgba(255,236,190,0)');
  ctx.fillStyle=beam;ctx.beginPath();ctx.moveTo(498,460);ctx.lineTo(980,290);ctx.lineTo(980,570);ctx.lineTo(498,482);ctx.closePath();ctx.fill();
  glow(ctx,500,470,110,'#fff2c8',0.95);glow(ctx,500,470,40,'#ffffff',0.9);
  ctx.fillStyle='#07070c';circle(ctx,392,562,36);ctx.fill();circle(ctx,548,562,36);ctx.fill();ctx.fillStyle='#17171f';circle(ctx,392,562,16);ctx.fill();circle(ctx,548,562,16);ctx.fill();
  ctx.fillStyle='#0c0c14';ctx.beginPath();ctx.moveTo(396,544);ctx.lineTo(440,512);ctx.lineTo(500,504);ctx.lineTo(540,520);ctx.lineTo(548,562);ctx.lineTo(392,562);ctx.closePath();ctx.fill();
  ctx.fillRect(486,462,10,46);ctx.fillRect(410,498,70,12);
  drawFigureFar(ctx,636,520,1.75,'#0e0e16','#09090f',lt,1);
  ctx.strokeStyle='#0e0e16';ctx.lineWidth=13;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(656,466);ctx.lineTo(724,438);ctx.stroke();
  ctx.fillStyle='#c9a876';rrect(ctx,722,416,46,60,4);ctx.fill();ctx.fillStyle='#b08f5e';ctx.fillRect(722,416,46,9);ctx.fillStyle='rgba(0,0,0,.2)';ctx.fillRect(722,440,46,36);
  ctx.fillStyle=FB.skin;ell(ctx,782,446,16,11,-0.2);ctx.fill();for(let k=0;k<4;k++){ell(ctx,764-k*2,436+k*7,11,4,-0.1+k*0.08);ctx.fill();}
  ctx.fillStyle='rgba(0,0,0,.35)';ell(ctx,470,570,120,14);ctx.fill();ell(ctx,636,566,40,8);ctx.fill();
  const v=ctx.createRadialGradient(640,420,240,640,420,820);v.addColorStop(0,'rgba(4,6,14,0)');v.addColorStop(1,'rgba(4,6,14,.75)');ctx.fillStyle=v;ctx.fillRect(0,0,W,H);
  ctx.restore();
}
const RID=[
  {at:0,   who:'me', time:'01:11',text:'send m your add'},
  {at:0,   who:'me', time:'01:11',text:'apko rhod bhjdo'},
  {at:3.9, who:'her',time:'01:11',text:'Sure'},
  {at:4.4, who:'her',time:'01:11',text:'📍  Location'},
  {at:5.8, who:'her',time:'01:12',text:'But abhi khala nhi gai lol'},
  {at:7.8, who:'her',time:'01:12',text:'Theyll be like kia aya hai🤣'},
  {at:8.8, who:'me', time:'01:12',text:'dekha dena'},
  {at:13.4,who:'me', time:'01:30',text:'I have sent'},
  {at:13.5,who:'me', time:'01:30',text:'The items'},
  {at:13.6,who:'me', time:'01:30',text:'Rhode wagera'},
  {at:13.8,who:'me', time:'01:31',text:'Pardon for not wrapping them'},
  {at:14.8,who:'her',time:'01:33',text:'What do you mean by items?'},
  {at:16.5,who:'me', time:'01:33',text:'gift tou gift hoota'},
  {at:17.9,who:'her',time:'01:38',text:'It\'s just rhode right?'},
  {at:19.5,who:'me', time:'01:38',text:'nahi'},
  {at:20.5,who:'me', time:'01:39',text:'keychains'},
  {at:20.9,who:'me', time:'01:39',text:'achee waale'},
  {at:21.5,who:'me', time:'01:39',text:'and a diary'},
  {at:21.7,who:'me', time:'01:39',text:'😋'},
  {at:22.9,who:'her',time:'01:39',text:'Ohhh achaaa'},
  {at:23.4,who:'her',time:'01:39',text:'🥹🥹🥹🥹🥹'},
  {at:24.4,who:'her',time:'02:04',text:'Hes here?'},
  {at:25.6,who:'me', time:'02:08',text:'Yess'},
  {at:33.6,who:'her',time:'02:12',text:'Woh na khala abhi tak gai jhi hai'},
  {at:33.8,who:'her',time:'02:12',text:'Had to sneak to go down'},
  {at:34.0,who:'her',time:'02:13',text:'Aisa koi adventure tha lolll'},
  {at:34.8,who:'me', time:'02:18',text:'Kholo unke saamne kholo'},
  {at:35.6,who:'me', time:'02:18',text:'Bolo mere bande ne diya kis baat ka darr'},
  {at:36.7,who:'me', time:'02:18',text:'Jab pyar kiya tou darna kya'},
];
scene({id:'rider',name:'30 August · the 2 a.m. rider',when:'2026-08-30T01:11',bars:12,fin:['#000000',1.2],fout:['#000000',1.6],
  note:'ten past one in the borrowed room: her address, a rider on the map crawling toward her street with keychains and a diary, unwrapped; her aunt still up, the stairs in the dark, a hand through the gate; “Jab pyar kiya tou darna kya”.',
  tag:'“Pardon for not wrapping them” · “Had to sneak to go down”',
  prep(){return{R:a2_room()};},
  draw(ctx,lt,A){
    const dream=smooth(26.6,27.6,lt)*(1-smooth(32.8,33.6,lt));
    ctx.drawImage(A.R.dark,0,0);
    const S=drawPhoneHand(ctx,lt,{x:880,y:130,w:330,h:700});
    const map=lt>=9.4&&lt<13.4;
    if(map){a2_map(ctx,S,lt,0.12+0.5*smooth(9.4,13.4,lt));}
    else{chatPanel(ctx,S,RID,lt,{name:'Fabeha',status:'online',draft:lt>12.8&&lt<13.4?'I have sent':lt>36&&lt<36.7?'Jab pyar kiya tou':undefined});}
    phoneTop(ctx,S,{time:lt<5.8?'01:11':lt<13.4?(map?'01:3'+Math.min(5,Math.floor((lt-9.4)*1.5)):'01:12'):lt<14.8?'01:31':lt<16.5?'01:33':lt<19.5?'01:38':lt<24.4?'01:39':lt<25.6?'02:04':lt<33.6?'02:08':lt<34.8?'02:13':'02:18'});
    const pg=ctx.createRadialGradient(1040,420,0,1040,420,460);pg.addColorStop(0,'rgba(150,190,230,.16)');pg.addColorStop(1,'rgba(150,190,230,0)');ctx.fillStyle=pg;ctx.fillRect(0,0,W,H);
    a2_gate(ctx,lt,dream);
  },
  subs:[
    [0.8,4.2,'Ten past one. I asked for her address. Somewhere in Karachi a rider was still awake, and I had a bag I had not wrapped.'],
    [4.6,5.6,'apko rhod bhjdo','him'],
    [5.9,7.5,'But abhi khala nhi gai lol','her'],
    [7.9,9.3,'Theyll be like kia aya hai🤣','her'],
    [9.8,12.8,'I watched the little bike crawl across the map toward her street.'],
    [13.9,15.2,'Pardon for not wrapping them','him'],
    [15.5,16.6,'What do you mean by items?','her'],
    [16.9,17.9,'gift tou gift hoota','him'],
    [18.2,19.3,'It\'s just rhode right?','her'],
    [19.6,20.3,'nahi','him'],
    [20.6,21.4,'keychains','him'],
    [21.7,22.7,'and a diary','him'],
    [23.0,24.1,'Ohhh achaaa','her'],
    [24.5,25.4,'Hes here?','her'],
    [25.7,26.5,'Yess','him'],
    [27.0,30.6,'Her aunt was still up. So she crept down the stairs in the dark, to a stranger on a bike holding a bag of keychains.'],
    [31.0,32.6,'Had to sneak to go down','her'],
    [32.9,34.5,'Aisa koi adventure tha lolll','her'],
    [34.9,36.5,'Kholo unke saamne kholo','him'],
    [36.8,38.5,'Jab pyar kiya tou darna kya','him'],
  ],
  score({hit,bars,melody,THEME_B,THEME}){
    bars(0,8,['Em','Cmaj7','G','Dsus'],{padVel:0.34,arp:true,arpVel:0.12,step:0.5});
    for(let b=8;b<10;b++)melody(b,b-8,'box',12,0.36,THEME_B);
    bars(8,4,['Em7','Cadd9','G','D'],{padVel:0.36});
    for(let b=10;b<12;b++)melody(b,b-6,'box',12,0.34,THEME);
    for(const m of RID)if(m.at>0)hit(m.at,'tick',{hi:m.who==='her'});
    hit(39.0,'ring',{});
  },
  amb(lt){const d=lt>26.6&&lt<33.6;return{room:d?0.1:0.25,wind:d?0.18:0,hum:d?0.12:0};},
});
