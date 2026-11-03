/* sep.js — September 2026: the warmest evenings of the month. “Ilyt” by the keyboard glow, and the 3 a.m. letter with the four hearts at dawn.
   (see notes/AUTHORING.md; source: notes/bible/15-sep-oct3.md) */
'use strict';

/* ---------- helpers (sep_ prefix; sep.js only) ---------- */
function sep_hsl(h,s,l){s/=100;l/=100;const k=n=>(n+h/30)%12,a=s*Math.min(l,1-l),f=n=>l-a*Math.max(-1,Math.min(k(n)-3,9-k(n),1));const to=v=>Math.round(v*255).toString(16).padStart(2,'0');return '#'+to(f(0))+to(f(8))+to(f(4));}

/* a WhatsApp thread like chatPanel (engine.js), with one difference: o.draft is painted as real typed text with a cursor in the composer */
function sep_chatPanel(ctx,S,msgs,lt,o={}){
  const name=o.name||'Fabeha',dark=o.dark!==false;
  ctx.save();rrect(ctx,S.x,S.y,S.w,S.h,S.r);ctx.clip();
  ctx.fillStyle=dark?'#0b141a':'#efe7dd';ctx.fillRect(S.x,S.y,S.w,S.h);
  if(dark){const r=rng(9);ctx.fillStyle='rgba(255,255,255,.035)';for(let i=0;i<90;i++){circle(ctx,S.x+r()*S.w,S.y+r()*S.h,1+r()*3);ctx.fill();}}
  const hy=S.y+36,hh=58;
  const bottom=Math.min(S.y+S.h-66,H-120),maxW=S.w*0.74,pad=10,lh=19;
  ctx.font='500 15px "Mulish",sans-serif';
  const vis=msgs.filter(m=>m.at<=lt);
  let y=bottom-6;
  const typing=msgs.find(m=>m.at>lt&&m.at-lt<1.4&&m.who==='her');
  if(typing){const px=S.x+14,py=y-30;ctx.fillStyle=dark?'#202c33':'#ffffff';rrect(ctx,px,py,58,30,12);ctx.fill();for(let k=0;k<3;k++){const b=0.5+0.5*Math.sin(lt*8-k*1.1);ctx.fillStyle=`rgba(160,175,185,${0.4+0.6*b})`;circle(ctx,px+16+k*13,py+15-b*3,3.4);ctx.fill();}y=py-8;}
  for(let i=vis.length-1;i>=0&&y>hy+hh-10;i--){
    const m=vis[i],mine=m.who==='me',lines=wrapText(ctx,m.text,maxW-pad*2);
    let tw0=0;for(const l of lines)tw0=Math.max(tw0,ctx.measureText(l).width);
    const tw=m.time?ctx.measureText(m.time).width*0.8+8:0,bw=Math.min(maxW+8,Math.max(tw0+pad*2+6,tw+pad*2+10)),bh=lines.length*lh+pad*2+(m.time?10:0);
    const by=y-bh,bx=mine?S.x+S.w-14-bw:S.x+14;
    const age=lt-m.at,pop=i===vis.length-1?backOut(clamp(age/0.28)):1;
    ctx.save();ctx.translate(mine?bx+bw:bx,by+bh);ctx.scale(pop,pop);ctx.translate(mine?-(bx+bw):-bx,-(by+bh));
    ctx.fillStyle=mine?(dark?'#005c4b':'#d9fdd3'):(dark?'#202c33':'#ffffff');rrect(ctx,bx,by,bw,bh,12);ctx.fill();
    ctx.fillStyle=dark?'#e9edef':'#111';ctx.textAlign='left';for(let k=0;k<lines.length;k++)ctx.fillText(lines[k],bx+pad,by+pad+14+k*lh);
    if(m.time){ctx.fillStyle=dark?'rgba(233,237,239,.55)':'rgba(0,0,0,.45)';ctx.font='500 11px "Mulish",sans-serif';ctx.textAlign='right';ctx.fillText(m.time+(mine?'  ✓✓':''),bx+bw-8,by+bh-7);ctx.font='500 15px "Mulish",sans-serif';}
    ctx.restore();
    y=by-7;
  }
  ctx.fillStyle=dark?'#0b141a':'#efe7dd';ctx.fillRect(S.x,S.y,S.w,hy-S.y);
  ctx.fillStyle=dark?'#1f2c34':'#f7f4ef';ctx.fillRect(S.x,hy,S.w,hh);
  ctx.fillStyle='#d8b4a0';circle(ctx,S.x+44,hy+hh/2,17);ctx.fill();
  ctx.fillStyle='#2a1d22';ell(ctx,S.x+44,hy+hh/2-4,13,11);ctx.fill();ctx.fillStyle='#f3d8c4';ell(ctx,S.x+44,hy+hh/2+1,9,10);ctx.fill();ctx.fillStyle='#2a1d22';ctx.fillRect(S.x+32,hy+hh/2-10,6,20);ctx.fillRect(S.x+50,hy+hh/2-10,6,20);
  ctx.fillStyle=dark?'#e9edef':'#111';ctx.font='700 16px "Mulish",sans-serif';ctx.textAlign='left';ctx.fillText(name,S.x+70,hy+hh/2+1);
  ctx.fillStyle=dark?'#8696a0':'#667';ctx.font='500 12px "Mulish",sans-serif';ctx.fillText(o.status||'online',S.x+70,hy+hh/2+18);
  ctx.fillStyle=dark?'#aebac1':'#333';ctx.font='600 18px "Mulish",sans-serif';ctx.textAlign='right';ctx.fillText('⋮',S.x+S.w-16,hy+hh/2+6);
  const iy=S.y+S.h-56;ctx.fillStyle=dark?'#1f2c34':'#f0f0f0';ctx.fillRect(S.x,iy,S.w,56);
  ctx.fillStyle=dark?'#2a3942':'#ffffff';rrect(ctx,S.x+12,iy+10,S.w-70,36,18);ctx.fill();
  ctx.font='500 14px "Mulish",sans-serif';ctx.textAlign='left';
  if(o.draft){ctx.fillStyle=dark?'#e9edef':'#111';const cur=((lt*2)|0)%2?'|':'';ctx.fillText(o.draft+cur,S.x+28,iy+33);}
  else{ctx.fillStyle=dark?'#8696a0':'#888';ctx.fillText('Message',S.x+28,iy+33);}
  ctx.fillStyle='#00a884';circle(ctx,S.x+S.w-30,iy+28,18);ctx.fill();ctx.fillStyle='#fff';ctx.beginPath();ctx.moveTo(S.x+S.w-37,iy+20);ctx.lineTo(S.x+S.w-21,iy+28);ctx.lineTo(S.x+S.w-37,iy+36);ctx.closePath();ctx.fill();
  ctx.restore();
}

/* the status bar on a light screen (phoneTop paints light text, invisible on a light chat) */
function sep_phoneTop(ctx,S,o={}){
  ctx.save();rrect(ctx,S.x,S.y,S.w,S.h,S.r);ctx.clip();
  ctx.fillStyle='#0e0e12';rrect(ctx,S.x+S.w/2-44,S.y+8,88,24,12);ctx.fill();
  ctx.fillStyle='#1b1b22';ctx.font='600 13px "Mulish",sans-serif';ctx.textAlign='left';ctx.fillText(o.time||'06:27',S.x+22,S.y+26);
  ctx.textAlign='right';ctx.font='500 12px "Mulish",sans-serif';ctx.fillText('●●●  ⌔  ▮',S.x+S.w-18,S.y+26);
  ctx.restore();
}

/* his desk at night: the room from rooms().night turned down, a dark monitor, the new keyboard (static caps here, lit per frame by sep_keyGlow) */
function sep_deskNight(){
  const R=rooms(),c=mk(W,H),g=c.getContext('2d');
  g.fillStyle='#05060c';g.fillRect(0,0,W,H);
  g.globalAlpha=0.5;g.drawImage(R.night,0,0);g.globalAlpha=1;
  g.fillStyle='#14151c';rrect(g,236,146,540,330,10);g.fill();g.fillStyle='#07080d';rrect(g,250,160,512,300,6);g.fill();
  g.fillStyle='rgba(255,255,255,.025)';g.beginPath();g.moveTo(250,160);g.lineTo(520,160);g.lineTo(250,420);g.closePath();g.fill();
  g.fillStyle='#1a1b23';g.fillRect(486,476,40,46);g.fillRect(426,520,160,10);
  g.fillStyle=vgrad(g,544,720,[[0,'#262030'],[1,'#110e16']]);g.fillRect(0,544,W,176);
  g.fillStyle='#342d3e';g.fillRect(0,541,W,7);
  g.fillStyle='#16161d';g.beginPath();g.moveTo(322,572);g.lineTo(958,572);g.lineTo(1040,694);g.lineTo(240,694);g.closePath();g.fill();
  g.strokeStyle='rgba(255,255,255,.06)';g.lineWidth=2;g.stroke();
  const keys=[];
  for(let r=0;r<6;r++){const u=(r+0.5)/6,y=574+u*118,kh=lerp(11,16,u),hw=lerp(300,378,u),n=15,pitch=hw*2/n;
    for(let k=0;k<n;k++){
      if(r===5&&k>=4&&k<=10){if(k===4)keys.push({x:640-hw+4*pitch+2,y:y-kh/2,w:pitch*7-4,h:kh,r});continue;}
      keys.push({x:640-hw+k*pitch+2,y:y-kh/2,w:pitch-4,h:kh,r});}}
  for(const K of keys){g.fillStyle='#22222e';rrect(g,K.x,K.y,K.w,K.h,3);g.fill();g.fillStyle='#2d2d3a';rrect(g,K.x+1,K.y+1,K.w-2,K.h*0.45,2);g.fill();}
  g.fillStyle='#1c1c25';ell(g,1120,640,26,38,-0.2);g.fill();g.fillStyle='#262631';ell(g,1116,626,10,6,-0.2);g.fill();
  g.fillStyle='#2a2531';rrect(g,150,588,46,60,8);g.fill();g.fillStyle='#161219';ell(g,173,590,21,6);g.fill();
  return{c,keys};
}
function sep_keyGlow(ctx,lt,keys,a){
  for(const K of keys){const hue=(K.x*0.24+K.r*16+lt*42)%360;ctx.fillStyle=`hsla(${hue},75%,62%,${0.6*a})`;rrect(ctx,K.x+1,K.y+1,K.w-2,K.h-2,3);ctx.fill();}
}
function sep_haze(ctx,lt,a){
  ctx.save();ctx.globalCompositeOperation='screen';
  for(let i=0;i<5;i++){const x=300+i*170,hue=(x*0.24+lt*42)%360;glow(ctx,x,634,190,sep_hsl(hue,75,60),0.17*a);}
  glow(ctx,640,660,560,sep_hsl((lt*42+120)%360,70,60),0.08*a);
  ctx.restore();
}

/* her room at night, as he pictured it: a window and a curtain, a shelf, the desk with the laptop, the report and a cup of tea */
function sep_herRoom(){
  const back=mk(W,H),g=back.getContext('2d');
  g.fillStyle=vgrad(g,0,H,[[0,'#171430'],[0.6,'#251d3e'],[1,'#2d2444']]);g.fillRect(0,0,W,H);
  g.fillStyle='#3a3152';g.fillRect(104,76,332,356);g.fillStyle='#10203a';g.fillRect(118,90,304,328);
  const r=rng(731);g.fillStyle='#fff6e0';for(let i=0;i<60;i++){const s=r()*1.5+0.4;g.fillRect(124+r()*292,96+r()*200,s,s);}
  const moon=g.createRadialGradient(330,160,0,330,160,150);moon.addColorStop(0,'rgba(255,245,220,.55)');moon.addColorStop(0.12,'rgba(255,245,220,.35)');moon.addColorStop(1,'rgba(255,245,220,0)');g.fillStyle=moon;g.fillRect(118,90,304,328);
  g.fillStyle='#fff8e8';circle(g,330,160,16);g.fill();
  g.fillStyle='#1b2c48';g.beginPath();g.moveTo(118,418);for(let x=118;x<=422;x+=6){g.lineTo(x,352+Math.sin(x*0.05)*8+(x%48<24?12:0));}g.lineTo(422,418);g.closePath();g.fill();
  g.fillStyle='#4a3a62';g.fillRect(118,90,8,328);g.fillRect(266,90,8,328);g.fillRect(118,250,304,8);
  g.fillStyle='#4b3b66';g.beginPath();g.moveTo(96,70);g.lineTo(290,70);g.lineTo(250,440);g.lineTo(96,440);g.closePath();g.fill();
  g.fillStyle='rgba(0,0,0,.18)';for(let k=0;k<8;k++){const x=110+k*22;g.beginPath();g.moveTo(x,70);g.lineTo(x+6,70);g.lineTo(x-4+(k*2),440);g.lineTo(x-10+(k*2),440);g.closePath();g.fill();}
  g.fillStyle='#5a4a7a';g.fillRect(90,62,210,12);
  g.fillStyle='#4a3b5c';g.fillRect(860,170,320,10);g.fillRect(860,300,320,10);
  const books=['#a0505a','#4f7b9a','#c89a4e','#5f8a5a','#8a6aa8','#c86f5a','#e3d6c3'];for(let k=0;k<9;k++){const x=880+k*26,h=36+(k*7)%22;g.fillStyle=books[k%books.length];g.fillRect(x,170-h,20,h);}
  g.fillStyle='#6a4a3a';g.fillRect(1120,276,30,24);g.fillStyle='#4f8a4a';for(let k=0;k<7;k++){ell(g,1135+Math.cos(k*0.9)*18,268-Math.abs(Math.sin(k*0.9))*18,9,5,k*0.6);g.fill();}
  g.fillStyle='#3c2f3a';g.fillRect(930,260,70,40);g.fillStyle='#e7dccb';g.fillRect(936,266,58,28);
  const front=mk(W,H),f=front.getContext('2d');
  f.fillStyle='#4a3b40';f.fillRect(0,556,W,12);f.fillStyle=vgrad(f,566,720,[[0,'#2f252b'],[1,'#1b1519']]);f.fillRect(0,566,W,154);
  f.fillStyle='#1f1f27';rrect(f,704,548,200,16,4);f.fill();f.fillStyle='#2a2a33';rrect(f,714,408,180,146,8);f.fill();f.fillStyle='#1a1a22';rrect(f,724,418,160,126,5);f.fill();
  f.strokeStyle='rgba(190,215,255,.55)';f.lineWidth=2;rrect(f,714,408,180,146,8);f.stroke();
  f.fillStyle='rgba(190,215,255,.14)';ell(f,804,566,150,16);f.fill();f.fillStyle='rgba(190,215,255,.35)';f.fillRect(716,408,176,3);
  f.fillStyle='#8a8a96';circle(f,804,478,5);f.fill();
  f.fillStyle='#e9e2d4';for(let k=0;k<3;k++){f.save();f.translate(500,552);f.rotate(-0.06+k*0.05);f.fillRect(-62,-14+k*2,124,20);f.restore();}
  f.strokeStyle='rgba(0,0,0,.18)';f.lineWidth=1;for(let yy=546;yy<558;yy+=4){f.beginPath();f.moveTo(450,yy);f.lineTo(560,yy);f.stroke();}
  f.fillStyle='#f4efe6';f.beginPath();f.ellipse(412,556,22,6,0,0,TAU);f.fill();f.fillStyle='#f4efe6';rrect(f,400,530,26,28,5);f.fill();f.fillStyle='#b87333';ell(f,413,532,11,3.5);f.fill();
  f.strokeStyle='#f4efe6';f.lineWidth=4;f.beginPath();f.arc(431,544,7,-Math.PI/2,Math.PI/2);f.stroke();
  return{back,front};
}

/* a long message of his rendered once as one bubble (for the wall of text that scrolls past on the phone) */
function sep_wall(text,w,time){
  const c0=mk(8,8),g0=c0.getContext('2d');g0.font='500 15px "Mulish",sans-serif';
  const bw=w-28,lines=wrapText(g0,text,bw-20),lh=19,bh=lines.length*lh+30;
  const c=mk(w,bh+4),g=c.getContext('2d');g.font='500 15px "Mulish",sans-serif';
  g.fillStyle='#005c4b';rrect(g,14,0,bw,bh,12);g.fill();
  g.fillStyle='#e9edef';g.textAlign='left';for(let k=0;k<lines.length;k++)g.fillText(lines[k],24,24+k*lh);
  g.fillStyle='rgba(233,237,239,.55)';g.font='500 11px "Mulish",sans-serif';g.textAlign='right';g.fillText(time+'  ✓✓',14+bw-8,bh-7);
  return c;
}

/* ---------- 2 September · 23:12 — “I love you” by the keyboard glow, and “Ilyt” ---------- */
const SEP_ILYT=[
  {at:0,   who:'me', time:'23:11',text:'Sogyii ap'},
  {at:0,   who:'me', time:'23:11',text:'?'},
  {at:0,   who:'her',time:'23:12',text:'Nope'},
  {at:0,   who:'me', time:'23:12',text:'Sojaona'},
  {at:0,   who:'me', time:'23:12',text:'😩'},
  {at:7.4, who:'me', time:'23:12',text:'Also i wanted to say'},
  {at:11.6,who:'me', time:'23:12',text:'I love you'},
  {at:21.6,who:'her',time:'23:12',text:'Kam kon karagay phir 😭'},
  {at:24.6,who:'her',time:'23:13',text:'Ilyt'},
  {at:27.2,who:'me', time:'23:13',text:'Mein kro?'},
  {at:27.9,who:'me', time:'23:13',text:'Bheju'},
  {at:29.8,who:'her',time:'23:13',text:'Bs compole kara rahi hun'},
  {at:32.0,who:'me', time:'23:17',text:'Okoe dokiiieeeeeeeee myyyyyyyy loveeeeeeeeeeeeeee'},
];
scene({id:'ilyt',name:'2 September · Ilyt',when:'2026-09-02T23:12',bars:11,fin:['#000000',1.2],fout:['#000000',1.3],
  note:'his desk at eleven at night, the new keyboard glowing under the phone; “I love you”, a cut to her side of the city as he pictured it, the typing dots, and her two answers.',
  tag:'“Kam kon karagay phir 😭” · “Ilyt”',
  prep(){const D=sep_deskNight(),Hr=sep_herRoom();return{desk:D.c,keys:D.keys,herBack:Hr.back,herFront:Hr.front};},
  draw(ctx,lt,A){
    if(lt>=14.0&&lt<20.0){
      /* her side, as he pictured it: the report on the laptop, the phone lighting up in her hands */
      const z=1+0.06*smooth(14,20,lt);
      ctx.save();ctx.translate(640,430);ctx.scale(z,z);ctx.translate(-640,-430);
      ctx.drawImage(A.herBack,0,0);
      ctx.save();ctx.globalCompositeOperation='screen';glow(ctx,770,470,320,'#9db8e8',0.16);ctx.restore();
      const got=smooth(15.4,16.0,lt),sm=lerp(0.25,0.9,smooth(16.6,17.8,lt)),laugh=lt>18.2&&lt<19.3;
      drawFabeha(ctx,600,330,1.25,{t:lt,outfit:'home',hair:'down',pose:'seat',arms:'phone',look:lerp(0.55,0,got),tilt:lerp(0.02,0.1,got),smile:sm,eyes:laugh?'happy':undefined,blush:0.3+0.35*got,len:230,wind:0.05});
      ctx.drawImage(A.herFront,0,0);
      ctx.save();ctx.globalCompositeOperation='screen';glow(ctx,600,374,140,'#bfe0ff',0.34*got);glow(ctx,600,500,100,'#bfe0ff',0.5*got);ctx.restore();
      ctx.restore();
      return;
    }
    ctx.drawImage(A.desk,0,0);
    sep_keyGlow(ctx,lt,A.keys,1);
    sep_haze(ctx,lt,1);
    const S=drawPhoneHand(ctx,lt,{x:475,y:44,w:300,h:640});
    let draft;
    if(lt>=5.0&&lt<7.4){const t='Also i wanted to say';draft=t.slice(0,Math.ceil(clamp((lt-5.0)/2.1)*t.length));}
    else if(lt>=9.8&&lt<11.6){const t='I love you';draft=t.slice(0,Math.ceil(clamp((lt-9.8)/1.5)*t.length));}
    sep_chatPanel(ctx,S,SEP_ILYT,lt,{name:'Fabeha',status:'online',draft});
    phoneTop(ctx,S,{time:lt<24.6?'23:12':lt<32?'23:13':'23:17'});
    sep_haze(ctx,lt,0.35);
    ctx.save();ctx.globalCompositeOperation='screen';glow(ctx,S.x+S.w/2,S.y+S.h*0.8,300,'#7fa6d8',0.1);ctx.restore();
    /* the four letters, landing */
    const LET=['I','l','y','t'];
    for(let k=0;k<4;k++){const t0=24.7+k*0.42,u=(lt-t0)/2.8;if(u<=0||u>=1)continue;
      const a=Math.sin(u*Math.PI)*0.8,x=1030+(k-1.5)*100+Math.sin(lt*1.3+k)*6,y=lerp(430,250,easeOut(u)),hue=(k*70+lt*40)%360;
      ctx.save();ctx.globalCompositeOperation='screen';ctx.globalAlpha=a;glow(ctx,x,y,120,sep_hsl(hue,80,62),0.5);
      ctx.fillStyle=sep_hsl(hue,85,84);ctx.font='italic 500 150px "Cormorant Garamond",serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(LET[k],x,y);ctx.restore();}
  },
  subs:[
    [0.6,4.6,'2 September, past eleven. The new keyboard glowing on the desk; she was still up, compiling a report.'],
    [7.6,9.6,'Also i wanted to say','him'],
    [11.8,13.6,'I love you','him'],
    [14.4,19.4,'Somewhere across the city — I pictured it like this — her phone lit up beside the report.'],
    [21.8,24.0,'Kam kon karagay phir 😭','her'],
    [24.8,26.8,'Ilyt','her'],
    [27.3,29.4,'Mein kro? Bheju','him'],
    [30.0,31.8,'Bs compole kara rahi hun','her'],
    [32.2,35.0,'Okoe dokiiieeeeeeeee myyyyyyyy loveeeeeeeeeeeeeee','him'],
  ],
  score({T,hit,pad,melody,bars,THEME_B}){
    bars(0,11,['Em','Cmaj7','G','Dsus'],{padVel:0.38});
    for(let b=2;b<10;b++)melody(b,b-2,'box',12,0.36,THEME_B);
    pad(T(4),'Em7',2,0.22,'strings');pad(T(6),'Cmaj7',2,0.22,'strings');
    for(const m of SEP_ILYT)if(m.at>0)hit(m.at,'tick',{hi:m.who==='her'});
    hit(15.4,'tick',{});
    [76,79,83,88].forEach((m,k)=>hit(24.7+k*0.42,'chime',{midi:m,vel:0.3}));
  },
  amb(lt){return{room:0.25,hum:lt>=14&&lt<20?0.12:0.05};},
});

/* ---------- 4 September · 03:00 — the letter, as one wall of text; then four hearts at 06:27 ---------- */
const SEP_LETTER='I geniunllyyy feeeel so mesmarized/Happpppy that you are in my life, i feel like i have finally got the thing i have always mesmarized eik bandi jisko mein kitna bhi dekhlo but ankhe na thaake someone who would always use me over others someone who would blindly trust me! Ke she is safe with me someone who trusts that i would not break her someone who chooses meee every single timeeee i geniunlyyy feel that my life is you and you is my life from seeing into your eyes seeing these gizellion stars, Just as the milkyway Galaxy has them even those would feel less these eyes hold a qudtrillion expressions and god not what that they hold me close to you!!!!!!!!!! 😭😭😭 bas tum meri hojao jo ke tum phly se ho actions ki baat krti rehti ho vulnerability ki baat krti rehti ho apke sath i’d never leave poori duniya eik taraf hojaye if i have you on my hands on my eyes on my heart which would always be true positive none can make you leave me i would not give two damn about the world or the problem you have,!!!!! Ohh my godddddd fa Be Ha adnan( yes i pronounced it the way you want) i wouldddddd always be yours and you always being mine i’d have my whole self at your ease bhale kitna bhi independent dependent krlo you would always have mee in every difficulty!!! Bhale kitna bhi you say i cant let go of the freedom ke d and e word! Deep down you are the most important thing i want and the same goes for you!!!! Fa be ha adnannnnnn i love youuuuuuuuuuuuuú pleaseeeeee beee my alreadyyyyyyyyyyyyyyyyyy or kal carpool sahi se khair se jana please wapis claustrophobic waali chez na ho 😭 goood luckkk my love for the thing syou ha e tomorrow and i would always be there for you thora lamba hogya but kyaaaa krooooooooooo ap mere zehn se heee nahi jarahiiiiii fa be haaaaaaaaaaaaaaaaa';
scene({id:'letter3am',name:'4 September · three in the morning',when:'2026-09-04T03:00',bars:12,fin:['#000000',1.3],fout:['#000000',1.4],
  note:'three in the morning, the room black except the phone; the letter scrolls past as one wall of text, then four hearts land at 06:27 with the first light.',
  tag:'“ap mere zehn se heee nahi jarahiiiiii”',
  prep(){return{R:rooms(),wall:sep_wall(SEP_LETTER,282,'03:00'),msgsM:[{at:0,who:'me',time:'03:00',text:SEP_LETTER},{at:31.0,who:'her',time:'06:27',text:'♥️♥️♥️♥️'}]};},
  draw(ctx,lt,A){
    const morning=lt>=28.3;
    if(!morning){
      ctx.fillStyle='#030409';ctx.fillRect(0,0,W,H);
      ctx.save();ctx.globalAlpha=0.42;ctx.drawImage(A.R.night,0,0);ctx.restore();
      ctx.save();ctx.beginPath();ctx.rect(834,74,372,302);ctx.clip();stars(ctx,lt,70,702,380,0.5);ctx.restore();
      const S=drawPhoneHand(ctx,lt,{x:475,y:44,w:300,h:640});
      sep_chatPanel(ctx,S,[],lt,{name:'Fabeha',status:'last seen today at 00:24'});
      const top=S.y+94,bot=Math.min(S.y+S.h-66,H-120);
      const u=clamp((lt-3.0)/23.5),e=lerp(u,smooth(0,1,u),0.4);
      const travel=Math.max(0,A.wall.height+12-(bot-top));
      ctx.save();ctx.beginPath();ctx.rect(S.x,top,S.w,bot-top);ctx.clip();ctx.drawImage(A.wall,S.x,top+8-e*travel);ctx.restore();
      phoneTop(ctx,S,{time:lt<13?'03:01':'03:02'});
      ctx.save();ctx.globalCompositeOperation='screen';glow(ctx,S.x+S.w/2,S.y+S.h*0.75,380,'#7fa6d8',0.15);ctx.restore();
    }else{
      const m=smooth(28.3,31.8,lt);
      ctx.drawImage(A.R.morning,0,0);
      ctx.fillStyle=`rgba(255,160,120,${0.1+0.2*(1-m)})`;ctx.fillRect(0,0,W,H);
      ctx.fillStyle=`rgba(24,18,46,${0.5*(1-m)})`;ctx.fillRect(0,0,W,H);
      const S=drawPhoneHand(ctx,lt,{x:475,y:44,w:300,h:640});
      sep_chatPanel(ctx,S,A.msgsM,lt,{name:'Fabeha',status:'online',dark:false});
      sep_phoneTop(ctx,S,{time:'06:27'});
    }
  },
  subs:[
    [0.6,4.4,'4 September, three in the morning. I could not sleep, so I wrote to her.'],
    [5.0,10.0,'i feel like i have finally got the thing i have always mesmarized eik bandi jisko mein kitna bhi dekhlo but ankhe na thaake','him'],
    [10.6,16.2,'from seeing into your eyes seeing these gizellion stars, Just as the milkyway Galaxy has them even those would feel less these eyes hold a qudtrillion expressions','him'],
    [16.8,22.0,'Ohh my godddddd fa Be Ha adnan( yes i pronounced it the way you want) i wouldddddd always be yours and you always being mine','him'],
    [22.6,27.4,'thora lamba hogya but kyaaaa krooooooooooo ap mere zehn se heee nahi jarahiiiiii fa be haaaaaaaaaaaaaaaaa','him'],
    [31.4,33.4,'♥️♥️♥️♥️','her'],
    [34.0,38.4,'Four hearts at 06:27, with the first light. I read them twice.'],
  ],
  score({T,hit,pad,melody,bars,THEME_B}){
    bars(0,8,['Em','Cmaj7','Am7','Dsus'],{strings:true,padVel:0.3});
    for(let b=1;b<8;b++)melody(b,b-1,'box',12,0.3,THEME_B);
    bars(8,4,['G','Cmaj7','Em7','D'],{padVel:0.4,arp:true,arpVel:0.1});
    hit(31.0,'tick',{hi:true});
    [29.4,30.6,33.8,36.2].forEach((t,k)=>hit(t,'bird',{f:2300+k*310}));
  },
  amb(lt){return lt<28.3?{room:0.22}:{room:0.12,wind:0.12};},
});
