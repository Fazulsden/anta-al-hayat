/* jul2.js — 20–31 July 2026: Spain at 2:43, one call away, the last paper, “Always 😊”, the light coming back. (see notes/AUTHORING.md) */
'use strict';

/* ---------- small helpers (all j7_) ---------- */
function j7_clock(hhmm,addMin){const[h,m]=hhmm.split(':').map(Number);const t=(((h*60+m+Math.floor(addMin))%1440)+1440)%1440;return String(Math.floor(t/60)).padStart(2,'0')+':'+String(t%60).padStart(2,'0');}
function j7_mmss(sec){sec=Math.max(0,Math.floor(sec));const h=Math.floor(sec/3600),m=Math.floor((sec%3600)/60),s=sec%60;return(h?h+':':'')+String(m).padStart(2,'0')+':'+String(s).padStart(2,'0');}
function j7_timeAt(msgs,lt,def){let t=def;for(const m of msgs)if(m.at<=lt&&m.time)t=m.time;return t;}
function j7_pop(t){t=clamp(t);const s=1.4;return 1+(s+1)*Math.pow(t-1,3)+s*Math.pow(t-1,2);}
/* her little avatar, the same face chatPanel paints in the header */
function j7_avatar(ctx,x,y,r){ctx.fillStyle='#d8b4a0';circle(ctx,x,y,r);ctx.fill();ctx.fillStyle='#2a1d22';ell(ctx,x,y-r*0.24,r*0.76,r*0.65);ctx.fill();ctx.fillStyle='#f3d8c4';ell(ctx,x,y+r*0.06,r*0.53,r*0.59);ctx.fill();ctx.fillStyle='#2a1d22';ctx.fillRect(x-r*0.7,y-r*0.59,r*0.35,r*1.18);ctx.fillRect(x+r*0.35,y-r*0.59,r*0.35,r*1.18);}
/* an in-call screen: avatar, name, the running timer */
function j7_callScreen(ctx,S,lt,o={}){
  ctx.save();rrect(ctx,S.x,S.y,S.w,S.h,S.r);ctx.clip();
  ctx.fillStyle=vgrad(ctx,S.y,S.y+S.h,[[0,'#10292a'],[0.5,'#0b1b22'],[1,'#07121a']]);ctx.fillRect(S.x,S.y,S.w,S.h);
  const cx=S.x+S.w/2,ay=S.y+196;
  glow(ctx,cx,ay,170,'#2fa37a',0.22);
  ctx.strokeStyle='rgba(255,255,255,.12)';ctx.lineWidth=2;circle(ctx,cx,ay,66+2*Math.sin(lt*2));ctx.stroke();
  j7_avatar(ctx,cx,ay,54);
  ctx.textAlign='center';ctx.fillStyle='#e9edef';ctx.font='700 26px "Mulish",sans-serif';ctx.fillText(o.name||'Fabeha',cx,ay+112);
  ctx.fillStyle='#8696a0';ctx.font='500 14px "Mulish",sans-serif';ctx.fillText(o.sub||(o.video?'WhatsApp video call':'WhatsApp voice call'),cx,ay+138);
  ctx.fillStyle='#e9edef';ctx.font='300 36px "Mulish",sans-serif';ctx.fillText(o.timer||'00:00',cx,ay+188);
  const by=Math.min(S.y+S.h-120,H-150);
  [[-96,'#2a3942','🔈'],[-32,'#2a3942','📷'],[32,'#2a3942','🎤'],[96,'#e3463e','📞']].forEach(([dx,col,ic])=>{ctx.fillStyle=col;circle(ctx,cx+dx,by,24);ctx.fill();ctx.fillStyle='#fff';ctx.font='20px serif';ctx.textBaseline='middle';ctx.fillText(ic,cx+dx,by+1);ctx.textBaseline='alphabetic';});
  ctx.restore();
}
/* the Calls tab: entries {at,who:'me'|'her',time,dur,missed}, newest on top, each one popping in */
function j7_callLog(ctx,S,entries,lt){
  ctx.save();rrect(ctx,S.x,S.y,S.w,S.h,S.r);ctx.clip();
  ctx.fillStyle='#0b141a';ctx.fillRect(S.x,S.y,S.w,S.h);
  const vis=entries.filter(e=>e.at<=lt),rowH=64;let y=S.y+124;
  for(let i=vis.length-1;i>=0&&y<H-150;i--){const e=vis[i],pop=i===vis.length-1?j7_pop((lt-e.at)/0.32):1;
    ctx.save();ctx.globalAlpha=clamp(pop);ctx.translate(0,(1-pop)*-16);
    j7_avatar(ctx,S.x+40,y+rowH/2,20);
    ctx.textAlign='left';ctx.fillStyle=e.missed?'#ff6b6b':'#e9edef';ctx.font='700 16px "Mulish",sans-serif';ctx.fillText('Fabeha',S.x+74,y+27);
    ctx.fillStyle=e.missed?'#ff6b6b':e.who==='me'?'#25d366':'#53bdeb';ctx.font='600 13px "Mulish",sans-serif';ctx.fillText(e.who==='me'&&!e.missed?'↗':'↙',S.x+74,y+48);
    ctx.fillStyle='#8696a0';ctx.font='500 13px "Mulish",sans-serif';ctx.fillText((e.missed?'Missed':e.who==='me'?'Outgoing':'Incoming')+' · '+e.time+(e.dur?' · '+e.dur:''),S.x+92,y+48);
    ctx.fillStyle='#25d366';ctx.font='18px serif';ctx.textAlign='right';ctx.textBaseline='middle';ctx.fillText('📞',S.x+S.w-18,y+rowH/2);ctx.textBaseline='alphabetic';
    ctx.strokeStyle='rgba(255,255,255,.06)';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(S.x+74,y+rowH);ctx.lineTo(S.x+S.w,y+rowH);ctx.stroke();
    ctx.restore();y+=rowH;}
  ctx.fillStyle='#0b141a';ctx.fillRect(S.x,S.y,S.w,36);
  ctx.fillStyle='#1f2c34';ctx.fillRect(S.x,S.y+36,S.w,58);ctx.fillStyle='#e9edef';ctx.font='700 20px "Mulish",sans-serif';ctx.textAlign='left';ctx.fillText('Calls',S.x+18,S.y+74);
  ctx.fillStyle='#0b141a';ctx.fillRect(S.x,S.y+94,S.w,28);ctx.fillStyle='#8696a0';ctx.font='600 12px "Mulish",sans-serif';ctx.fillText('RECENT',S.x+18,S.y+114);
  ctx.restore();
}
/* rain streaks between x0..x1 (re-seeded every frame, so deterministic), and splashes on a ground band */
function j7_rain(ctx,lt,x0,x1,n,seed,alpha,slant){
  const r=rng(seed);ctx.save();ctx.strokeStyle=`rgba(225,232,240,${alpha})`;ctx.lineWidth=1.3;ctx.lineCap='round';ctx.beginPath();
  for(let i=0;i<n;i++){const sp=560+r()*380,len=16+r()*26,x=x0+r()*(x1-x0),ph=r()*(H+80),y=((ph+lt*sp)%(H+80))-40,xx=x+slant*(y/H);ctx.moveTo(xx,y);ctx.lineTo(xx+slant*0.05,y+len);}
  ctx.stroke();ctx.restore();
}
function j7_splashes(ctx,lt,x0,x1,y0,y1,n,seed){
  const r=rng(seed);ctx.save();ctx.strokeStyle='rgba(235,240,245,.6)';ctx.lineWidth=1;
  for(let i=0;i<n;i++){const x=x0+r()*(x1-x0),y=y0+r()*(y1-y0),ph=r(),u=(lt*2.2+ph)%1;if(u<0.35){const k=u/0.35;ctx.globalAlpha=1-k;ell(ctx,x,y,4+k*10,1.5+k*3);ctx.stroke();}}
  ctx.restore();
}
/* an umbrella: x,y = the apex of the shaft; the shaft runs down behind whoever stands under it */
function j7_umbrella(ctx,x,y,R,col,tilt){
  ctx.save();ctx.translate(x,y);ctx.rotate(tilt||0);
  ctx.strokeStyle='#3b2d26';ctx.lineWidth=4;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(0,-R*0.78);ctx.lineTo(0,R*1.5);ctx.stroke();
  ctx.fillStyle=col;ctx.beginPath();ctx.moveTo(-R,0);ctx.quadraticCurveTo(-R*0.92,-R*0.76,0,-R*0.72);ctx.quadraticCurveTo(R*0.92,-R*0.76,R,0);
  const n=7;for(let k=n;k>0;k--){const x1=-R+(k/n)*2*R,x0=-R+((k-1)/n)*2*R;ctx.quadraticCurveTo((x0+x1)/2,R*0.1,x0,0);}ctx.closePath();ctx.fill();
  ctx.strokeStyle='rgba(0,0,0,.2)';ctx.lineWidth=1.3;for(let k=0;k<=n;k++){const xx=-R+(k/n)*2*R;ctx.beginPath();ctx.moveTo(0,-R*0.7);ctx.lineTo(xx,0);ctx.stroke();}
  ctx.fillStyle='rgba(255,255,255,.14)';ctx.beginPath();ctx.moveTo(-R*0.62,-R*0.34);ctx.quadraticCurveTo(-R*0.25,-R*0.7,R*0.15,-R*0.64);ctx.quadraticCurveTo(-R*0.12,-R*0.5,-R*0.62,-R*0.34);ctx.fill();
  ctx.restore();
}
/* a candle on the desk; a = how much it matters (0..1) */
function j7_candle(ctx,x,y,lt,a){
  if(a<=0)return;const fl=0.86+0.1*Math.sin(lt*13.1)+0.06*Math.sin(lt*7.7)+0.04*Math.sin(lt*23);
  glow(ctx,x,y-60,340*a,'#ffb15a',0.34*a*fl);
  ctx.fillStyle='#e8dcc2';rrect(ctx,x-11,y-58,22,58,4);ctx.fill();ctx.fillStyle='rgba(0,0,0,.18)';ctx.fillRect(x+4,y-56,7,54);ctx.fillStyle='#d6c7a5';ell(ctx,x,y-58,11,4);ctx.fill();
  ctx.strokeStyle='#2b2320';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(x,y-58);ctx.lineTo(x+0.5,y-66);ctx.stroke();
  const fh=24*fl,fx=x+Math.sin(lt*9.3)*1.6;ctx.save();ctx.globalAlpha=a;
  ctx.fillStyle='rgba(255,150,40,.5)';ell(ctx,fx,y-66-fh*0.45,8,fh*0.6);ctx.fill();
  ctx.fillStyle='rgba(255,190,80,.95)';ell(ctx,fx,y-66-fh*0.42,5.5,fh*0.48);ctx.fill();
  ctx.fillStyle='rgba(255,246,200,.98)';ell(ctx,fx,y-66-fh*0.3,2.8,fh*0.26);ctx.fill();ctx.restore();
}
/* a ceiling fan seen from below, hub at x,y; w = angular speed (for the blur when it is going) */
function j7_fan(ctx,x,y,ang,a,w){
  ctx.fillStyle=`rgba(120,126,134,${a})`;ctx.fillRect(x-4,y-90,8,90);
  ctx.save();ctx.translate(x,y);ctx.scale(1,0.42);
  const n=w>3?6:3,al=w>3?a*0.55:a;ctx.fillStyle=`rgba(190,196,204,${al})`;
  for(let k=0;k<n;k++){ctx.save();ctx.rotate(ang+k*TAU/n);rrect(ctx,24,-16,172,32,14);ctx.fill();ctx.restore();}
  ctx.fillStyle=`rgba(120,126,134,${a})`;circle(ctx,0,0,26);ctx.fill();ctx.fillStyle=`rgba(80,84,92,${a})`;circle(ctx,0,0,13);ctx.fill();
  ctx.restore();
}

/* ---------- 20 July · 02:43 — Spain in extra time, two fifty-nine-minute calls, the window going pink ---------- */
const J7_SPAIN=[
  {at:0.0, who:'me', time:'01:14',text:'Mein ghar araha'},
  {at:0.0, who:'me', time:'01:14',text:'In 20min'},
  {at:0.0, who:'me', time:'01:14',text:'Phir we talk'},
  {at:0.0, who:'me', time:'01:41',text:'Here i am'},
  {at:0.0, who:'her',time:'01:56',text:'Bas dil pakar jar bethi thi'},
  {at:5.8, who:'me', time:'02:00',text:'Bhai i am here'},
  {at:6.4, who:'me', time:'02:00',text:'Kisi chez ki tention mat le ap'},
  {at:8.4, who:'her',time:'02:05',text:'Mein koi dayan hun jo phatt rahi hai😭😭😭😭😭😭😭😭😭'},
  {at:11.8,who:'me', time:'02:43',text:'Goal hogya'},
  {at:12.3,who:'me', time:'02:43',text:'Over time mein'},
  {at:12.8,who:'me', time:'02:43',text:'They won'},
  {at:13.3,who:'me', time:'02:43',text:'Spainnnnn'},
  {at:14.1,who:'her',time:'02:43',text:'Ohhhhh'},
  {at:14.7,who:'her',time:'02:43',text:'Damnnnnnn'},
  {at:15.3,who:'me', time:'02:43',text:'❤️❤️❤️❤️❤️❤️❤️🙃🙃🙃🙃'},
  {at:15.9,who:'her',time:'02:43',text:'Yessss'},
  {at:20.0,who:'me', time:'02:58',text:'Dill halka karo'},
  {at:21.6,who:'me', time:'02:58',text:'Mein khinhota'},
  {at:22.7,who:'me', time:'02:58',text:'Har din araha hota'},
  {at:23.8,who:'me', time:'02:58',text:'Apke pass'},
  {at:30.6,who:'her',time:'04:51',text:'Jaan kar nhi ki thi'},
  {at:31.7,who:'her',time:'04:51',text:'Accidental touches'},
  {at:32.8,who:'me', time:'04:51',text:'Meri jaan'},
  {at:37.7,who:'her',time:'06:11',text:'Sojaoo'},
];


/* ---------- 24 July · 00:56 — “teekh teekh”, one call/text away, five calls in a row ---------- */
const J7_ONECALL=[
  {at:0.0, who:'her',time:'00:55',text:'Bas teekh?'},
  {at:0.0, who:'her',time:'00:55',text:'Ap toh mast hitay ho'},
  {at:3.6, who:'me', time:'00:56',text:'Bas aj kal teekh teekh ho'},
  {at:5.5, who:'her',time:'00:56',text:'Kyunnnn'},
  {at:6.3, who:'me', time:'00:56',text:'Pata nahi yr'},
  {at:7.3, who:'her',time:'00:56',text:'Arayyy hojayegaa dwww'},
  {at:7.9, who:'her',time:'00:56',text:'InshaAllah'},
  {at:9.4, who:'me', time:'00:57',text:'Ami bolti rehti'},
  {at:9.9, who:'me', time:'00:57',text:'Jis din degree ayegi'},
  {at:10.4,who:'me', time:'00:57',text:'2kilo dampukht khaoga'},
  {at:12.6,who:'her',time:'00:58',text:'Ap tension na lo. Lol ap par suite hi nhi karta 😩'},
  {at:15.8,who:'her',time:'01:11',text:'Do you wanna rant wagaira on call? im always there. Just dont let these things build inside you your mental health will affect the most'},
  {at:19.2,who:'me', time:'01:13',text:'nahi nahi easy scen hai'},
  {at:20.2,who:'her',time:'01:19',text:'You are never going to bother bhaee. I shoyld be the last person you appear strong infront'},
  {at:23.6,who:'her',time:'01:21',text:'Ik you\'re strong but  you can be vulnerable around me'},
  {at:27.0,who:'her',time:'01:21',text:'That\'s what partners are there for'},
  {at:29.6,who:'her',time:'01:25',text:'But do rem im always one call/text away'},
  {at:33.6,who:'me', time:'01:26',text:'i am alr gratefull to have you'},
  {at:41.0,who:'me', time:'02:31',text:'thankyou bhaee'},
];
/* the four lines Fazul wanted big: each is held as a large overlay across the frame as it lands */
const J7_ONECALL_BIG=[
  {at:20.2,until:23.4,text:'You are never going to bother bhaee. I shoyld be the last person you appear strong infront'},
  {at:23.6,until:26.8,text:'Ik you\'re strong but  you can be vulnerable around me'},
  {at:27.0,until:29.4,text:'That\'s what partners are there for'},
  {at:29.6,until:33.0,text:'But do rem im always one call/text away'},
];
const J7_CALLS=[
  {at:36.2,who:'me', time:'01:28',dur:'6 min'},
  {at:36.9,who:'her',time:'01:34',missed:true},
  {at:37.6,who:'me', time:'01:34',dur:'56 sec'},
  {at:38.3,who:'her',time:'01:35',dur:'11 min'},
  {at:39.0,who:'her',time:'01:46',dur:'20 min'},
  {at:39.7,who:'me', time:'02:08',dur:'23 min'},
];
/* a line of hers, big and bold across the whole frame; a = presence 0..1 */
function j7_bigLine(ctx,text,a){
  if(a<=0)return;ctx.save();ctx.globalAlpha=a;
  ctx.fillStyle='rgba(0,0,0,.3)';ctx.fillRect(0,0,W,H);
  const s=0.96+0.04*a;ctx.translate(W/2,330);ctx.scale(s,s);ctx.translate(-W/2,-330);
  ctx.font='700 44px "Mulish",sans-serif';ctx.textAlign='center';
  const lines=wrapText(ctx,text,1040),lh=56,bh=lines.length*lh+52,by=330-bh/2;
  ctx.fillStyle='rgba(8,10,18,.8)';ctx.fillRect(-40,by,W+80,bh);
  ctx.fillStyle='#ff9fbb';ctx.fillRect(-40,by,W+80,3);ctx.fillRect(-40,by+bh-3,W+80,3);
  ctx.shadowColor='rgba(255,150,180,.55)';ctx.shadowBlur=16;ctx.fillStyle='#ffd6e2';
  lines.forEach((l,k)=>ctx.fillText(l,W/2,by+26+(k+1)*lh-14));
  ctx.restore();
}
scene({id:'onecall',name:'24 July · one call away',when:'2026-07-24T00:56',bars:13,fin:['#000000',1.2],fout:['#000000',1.2],
  note:'one in the morning, 24 July, his room in Hyderabad: he is “teekh teekh”; she tells him he can be vulnerable around her — her four lines held big across the frame; then five calls in a row until half past two.',
  tag:'“you can be vulnerable around me” · “i am alr gratefull to have you”',
  prep(){return rooms();},
  draw(ctx,lt,A){
    ctx.drawImage(A.night,0,0);
    const log=lt>=36.0&&lt<40.8,warm=smooth(33.6,36.6,lt);
    if(warm>0)glow(ctx,640,420,760,'#ffb070',0.14*warm);
    const S=drawPhoneHand(ctx,lt,{x:475,y:120,w:330,h:700});
    if(log){j7_callLog(ctx,S,J7_CALLS,lt);phoneTop(ctx,S,{time:j7_timeAt(J7_CALLS,lt,'01:28')});}
    else{chatPanel(ctx,S,J7_ONECALL,lt,{name:'Fabeha',status:'online'});phoneTop(ctx,S,{time:j7_timeAt(J7_ONECALL,lt,'00:55')});}
    for(const b of J7_ONECALL_BIG)j7_bigLine(ctx,b.text,smooth(b.at,b.at+0.4,lt)*(1-smooth(b.until-0.45,b.until,lt)));
  },
  subs:[
    [0.6,3.4,'24 July, just before one. I was, I told her, fine. Fine fine.'],
    [3.7,5.3,'Bas aj kal teekh teekh ho','him'],
    [5.6,6.4,'Kyunnnn','her'],
    [7.4,9.1,'Arayyy hojayegaa dwww','her'],
    [9.5,10.3,'Ami bolti rehti','him'],
    [10.5,11.2,'Jis din degree ayegi','him'],
    [11.3,12.4,'2kilo dampukht khaoga','him'],
    [12.7,15.5,'Ap tension na lo. Lol ap par suite hi nhi karta 😩','her'],
    [15.9,18.9,'Do you wanna rant wagaira on call? im always there.','her'],
    [19.3,20.1,'nahi nahi easy scen hai','him'],
    [20.3,23.3,'You are never going to bother bhaee. I shoyld be the last person you appear strong infront','her'],
    [23.7,26.7,'Ik you\'re strong but  you can be vulnerable around me','her'],
    [27.1,29.3,'That\'s what partners are there for','her'],
    [29.7,32.7,'But do rem im always one call/text away','her'],
    [33.7,35.6,'i am alr gratefull to have you','him'],
    [36.4,40.4,'Then five calls, one after another, until half past two.'],
    [41.1,42.5,'thankyou bhaee','him'],
  ],
  score({hit,bars,melody,THEME_B}){
    bars(0,8,['Am7','Fmaj7','Cmaj7','G'],{padVel:0.36,arp:[0,2,3,4,null,4,3,2],arpVel:0.11,step:0.5});
    bars(8,4,['Em','Cmaj7','G','Dsus'],{padVel:0.4,strings:true});
    for(let b=8;b<11;b++)melody(b,b-8,'box',12,0.3,THEME_B);
    for(const m of J7_ONECALL)hit(m.at,'tick',{hi:m.who==='her'});
    hit(33.4,'ring');for(const e of J7_CALLS)hit(e.at,'tick',{hi:e.who==='her'});
  },
  amb(lt){return{room:0.3};},
});

/* ---------- 24 July · 16:57 — her last paper at IBA; rain in Karachi, none in Hyderabad ---------- */
const J7_NOLONGER=[
  {at:0.0, who:'me', time:'14:57',text:'ha babe'},
  {at:0.0, who:'me', time:'14:57',text:'how was it'},
  {at:0.0, who:'me', time:'14:57',text:'the paper'},
  {at:2.6, who:'her',time:'16:56',text:'Loll iss waqt toh shori hua tha'},
  {at:3.4, who:'her',time:'16:56',text:'Just got done w it'},
  {at:5.6, who:'her',time:'16:57',text:'But it feels so weird'},
  {at:6.4, who:'her',time:'16:58',text:'Since this is iba ka akhri paper'},
  {at:9.6, who:'her',time:'16:58',text:'Im no longer a student😭'},
  {at:13.2,who:'me', time:'16:58',text:'Lesss go'},
  {at:13.7,who:'me', time:'16:58',text:'Bhagoooooo'},
  {at:14.2,who:'me', time:'16:58',text:'Mubarakkkk'},
  {at:14.8,who:'me', time:'16:58',text:'Babyyyyy'},
  {at:15.4,who:'me', time:'16:58',text:'Januuu'},
  {at:17.6,who:'her',time:'16:59',text:'Yayyyyyy'},
  {at:18.3,who:'her',time:'16:59',text:'Khair Mubarak'},
  {at:20.6,who:'me', time:'17:00',text:'Treat kahan pe do'},
  {at:21.1,who:'me', time:'17:00',text:'Apko'},
  {at:21.7,who:'me', time:'17:00',text:'You completing iba'},
  {at:22.2,who:'me', time:'17:00',text:'❤️'},
  {at:24.2,who:'her',time:'17:00',text:'Lolll kahi pe nhi'},
  {at:25.2,who:'me', time:'17:01',text:'Ja bhai ja'},
  {at:27.0,who:'her',time:'17:01',text:'Jab meri job lagegi ill give you one'},
];
scene({id:'nolonger',name:'24 July · the last paper',when:'2026-07-24T16:57',bars:11,fin:['#000000',1.2],fout:['#000000',1.4],
  note:'four minutes to five, 24 July: her last paper at IBA ends; red brick and rain on her side of the frame, a dry Hyderabad afternoon on his, and the phone bursting between them; four years of IBA, and then she was free.',
  tag:'“Im no longer a student😭” · “Mubarakkkk” · “Babyyyyy” · “Januuu”',
  prep(){const r=rng(724),c=mk(W,H),g=c.getContext('2d');
    /* left — IBA in the rain */
    g.save();g.beginPath();g.rect(0,0,640,H);g.clip();
    g.fillStyle=vgrad(g,0,H,[[0,'#5a6678'],[0.45,'#8a95a6'],[0.72,'#a9b0b9']]);g.fillRect(0,0,640,H);
    for(const[x,s]of[[30,74],[590,84]])drawTreeClump(g,x,396,s,'#28462f','#4b7446',r);
    g.fillStyle='#7c3d33';g.fillRect(60,150,640,250);g.fillStyle='#8a4538';g.fillRect(60,150,640,16);
    g.strokeStyle='rgba(255,225,205,.15)';g.lineWidth=1;for(let y=172;y<400;y+=11){g.beginPath();g.moveTo(60,y);g.lineTo(700,y);g.stroke();}
    for(let k=0;k<4;k++){const x=118+k*140;g.fillStyle='#4a2d28';g.beginPath();g.moveTo(x,400);g.lineTo(x,250);g.arc(x+45,250,45,Math.PI,0);g.lineTo(x+90,400);g.closePath();g.fill();g.fillStyle='#1f2a36';g.beginPath();g.moveTo(x+8,400);g.lineTo(x+8,252);g.arc(x+45,252,37,Math.PI,0);g.lineTo(x+82,400);g.closePath();g.fill();g.fillStyle='rgba(255,240,200,.10)';g.fillRect(x+8,300,74,4);}
    g.fillStyle='#53804a';g.fillRect(0,400,640,320);g.fillStyle='#6a9458';for(let i=0;i<70;i++){g.globalAlpha=0.25+r()*0.4;ell(g,r()*640,410+r()*300,24+r()*50,3+r()*5);g.fill();}g.globalAlpha=1;
    g.fillStyle='#b4aea2';g.beginPath();g.moveTo(170,720);g.lineTo(290,400);g.lineTo(370,400);g.lineTo(500,720);g.closePath();g.fill();
    g.fillStyle='rgba(190,200,214,.55)';for(const[x,y,w]of[[230,560,70],[420,640,110],[120,690,90],[330,480,50]]){ell(g,x,y,w,w*0.22);g.fill();}
    g.restore();
    /* right — Hyderabad, dry and bright */
    g.save();g.beginPath();g.rect(640,0,640,H);g.clip();
    g.fillStyle=vgrad(g,0,H,[[0,'#7fb0dc'],[0.4,'#cfd9d6'],[0.62,'#e6d9bd'],[1,'#d8c8a0']]);g.fillRect(640,0,640,H);
    const sun=g.createRadialGradient(1010,120,0,1010,120,360);sun.addColorStop(0,'rgba(255,250,225,.95)');sun.addColorStop(0.2,'rgba(255,245,210,.55)');sun.addColorStop(1,'rgba(255,245,210,0)');g.fillStyle=sun;g.fillRect(640,0,640,500);
    let x=640;while(x<1280){const w=40+r()*90,h=16+r()*50;g.fillStyle='#c9b894';g.fillRect(x,440-h,w,h);if(r()<0.45){g.fillStyle='#a89a78';g.fillRect(x+w*0.3,426-h,14,14);}x+=w+r()*20;}
    g.fillStyle='#d9ccae';g.fillRect(1150,330,14,110);g.beginPath();g.arc(1157,330,12,Math.PI,0);g.fill();
    g.strokeStyle='#5a4a32';g.lineWidth=8;g.lineCap='round';g.beginPath();g.moveTo(760,440);g.quadraticCurveTo(770,380,790,350);g.stroke();g.lineWidth=4;for(const[a,b,c2,d]of[[790,350,740,320],[790,350,830,318],[780,370,730,352]]){g.beginPath();g.moveTo(a,b);g.lineTo(c2,d);g.stroke();}
    g.fillStyle='#4f6a3a';for(const[tx,ty,tw]of[[745,316,34],[828,312,36],[730,350,26],[792,336,30]]){ell(g,tx,ty,tw,tw*0.5);g.fill();}
    g.fillStyle=vgrad(g,440,720,[[0,'#d7c69c'],[1,'#b9a67c']]);g.fillRect(640,440,640,280);
    g.fillStyle='#e3d8bf';g.beginPath();g.moveTo(640,560);g.lineTo(1280,540);g.lineTo(1280,720);g.lineTo(640,720);g.closePath();g.fill();g.fillStyle='#cdbf9f';g.beginPath();g.moveTo(640,560);g.lineTo(1280,540);g.lineTo(1280,556);g.lineTo(640,576);g.closePath();g.fill();
    g.fillStyle='rgba(255,240,200,.14)';g.fillRect(640,0,640,H);
    g.restore();
    g.fillStyle='#0b0b10';g.fillRect(635,0,10,H);
    return{c};},
  draw(ctx,lt,A){
    ctx.drawImage(A.c,0,0);
    const got=smooth(9.6,10.3,lt),burst=smooth(13.2,13.6,lt)*(1-smooth(17.4,17.9,lt));
    j7_umbrella(ctx,352,266+Math.sin(lt*0.9)*2,150,'#2f5f6e',0.06+Math.sin(lt*0.7)*0.02);
    drawFabeha(ctx,330,400,1.6,{t:lt,outfit:'uni',hair:'down',arms:'phone',hide:burst,smile:0.5+0.4*got,eyes:burst>0.5?'happy':undefined,look:lerp(0.15,-0.1,got),tilt:0.08+Math.sin(lt*0.5)*0.03,blush:0.35+0.55*burst,wind:0.15,len:200});
    j7_rain(ctx,lt,-20,640,170,725,0.5,-40);
    j7_splashes(ctx,lt,0,635,420,715,40,726);
    ctx.fillStyle='rgba(120,135,150,.10)';ctx.fillRect(0,0,635,H);
    ctx.fillStyle='#0b0b10';ctx.fillRect(635,0,10,H);
    ctx.save();ctx.beginPath();ctx.rect(645,0,635,H);ctx.clip();motes(ctx,lt,30,727,'#fff2cc',1.3,0.4);ctx.restore();
    const S=drawPhoneHand(ctx,lt,{x:800,y:120,w:330,h:700});
    chatPanel(ctx,S,J7_NOLONGER,lt,{name:'Fabeha',status:'online'});
    phoneTop(ctx,S,{time:j7_timeAt(J7_NOLONGER,lt,'14:57')});
  },
  subs:[
    [0.6,4.6,'24 July. Her last paper at IBA ended at four minutes to five.'],
    [5.7,7.5,'But it feels so weird','her'],
    [7.6,9.2,'Since this is iba ka akhri paper','her'],
    [9.7,12.6,'Im no longer a student😭','her'],
    [13.3,14.1,'Lesss go','him'],
    [14.3,15.2,'Mubarakkkk','him'],
    [15.3,16.1,'Babyyyyy','him'],
    [16.2,17.3,'Januuu','him'],
    [17.7,19.6,'Khair Mubarak','her'],
    [20.0,23.6,'It rained in Karachi that day. In Hyderabad, not a drop.'],
    [24.3,25.4,'Lolll kahi pe nhi','her'],
    [25.6,26.7,'Ja bhai ja','him'],
    [27.1,29.6,'Jab meri job lagegi ill give you one','her'],
    [30.0,31.6,'Noted.'],
    [32.2,35.8,'Four years of IBA. And then you were free.'],
  ],
  score({hit,bars,melody,THEME}){
    bars(0,3,['G','Cmaj7','Em7'],{strings:true,padVel:0.42});
    bars(3,1,['Dsus'],{strings:true,padVel:0.45});
    bars(4,6,['G','D','Em','Cmaj7','G','D'],{strings:true,padVel:0.5,arp:true,arpVel:0.14,bass:true,bassVel:0.32});
    bars(10,1,['G'],{strings:true,padVel:0.4});
    for(let b=4;b<8;b++)melody(b,b-4,'flute',0,0.5,THEME);
    hit(32.2,'chime',{midi:79,vel:0.35});
    hit(9.6,'chime',{midi:83,vel:0.5});hit(13.2,'swell',{dur:0.8,vel:0.35});
    for(const m of J7_NOLONGER)hit(m.at,'tick',{hi:m.who==='her'});
  },
  amb(lt){return{wind:0.3,waves:0.35,room:0.15};},
});

/* ---------- 31 July · 01:41 — lights out in Hyderabad; the ComSec day retold; “My light just came” ---------- */
const J7_LIGHT=[
  {at:0.0, who:'me', time:'01:41',text:'I rmr i cane you walked away'},
  {at:0.0, who:'me', time:'01:41',text:'Comsec waale din'},
  {at:5.0, who:'her',time:'01:41',text:'Apko avoid nhi karahi thi'},
  {at:5.8, who:'her',time:'01:42',text:'Agr hoti toh i wouldn\'t have returned back'},
  {at:8.8, who:'me', time:'01:44',text:'Wapis kyu ayi?'},
  {at:10.6,who:'her',time:'01:44',text:'Nhi curiosity thi apki pres ki'},
  {at:13.2,who:'me', time:'01:45',text:'Tou ye curiosity'},
  {at:13.7,who:'me', time:'01:45',text:'Kab se start hoyi'},
  {at:15.4,who:'her',time:'01:45',text:'Hamesha se thi'},
  {at:17.6,who:'me', time:'01:47',text:'No entry for tou ab'},
  {at:18.2,who:'me', time:'01:47',text:'Dil mein'},
  {at:19.8,who:'her',time:'01:48',text:'Koi nhi i already have conquered it 😉'},
  {at:20.6,who:'her',time:'01:48',text:'Han han uska nam bhi Fabeha'},
  {at:23.2,who:'me', time:'01:48',text:'Jhal gaya ghar mera'},
  {at:25.0,who:'her',time:'01:49',text:'Curiosity closed books ki hoti hai ap toh open book ho😋'},
  {at:29.0,who:'me', time:'02:03',text:'Thank god'},
  {at:29.5,who:'me', time:'02:03',text:'My light just came'},
  {at:30.1,who:'me', time:'02:03',text:'Allah ka shukr hai'},
  {at:31.4,who:'her',time:'02:03',text:'Alhumdulilah'},
];

