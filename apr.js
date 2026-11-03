/* apr.js — 16–26 April 2026: the virtual movie date, her Kaaba briefing, the midnight road to the airport, the emptied Rawdah.
   (The 19 April airport prayer and the 26 April "second row" dua live in act2.js → `dua`; nothing here repeats them.) */
'use strict';

/* ---------- small shared bits (apr_ prefix) ---------- */
function apr_hm(min){min=((Math.floor(min)%1440)+1440)%1440;return String(Math.floor(min/60)).padStart(2,'0')+':'+String(min%60).padStart(2,'0');}

/* the laptop on the bed: lid, screen bezel, keyboard deck; returns the screen rect */
function apr_laptop(ctx,L){
  ctx.save();ctx.shadowColor='rgba(0,0,0,.55)';ctx.shadowBlur=44;ctx.shadowOffsetY=16;
  ctx.fillStyle='#17181e';rrect(ctx,L.x,L.y,L.w,L.h,18);ctx.fill();ctx.restore();
  ctx.strokeStyle='rgba(255,255,255,.1)';ctx.lineWidth=1.5;rrect(ctx,L.x+1,L.y+1,L.w-2,L.h-2,18);ctx.stroke();
  ctx.fillStyle='#2b2d36';circle(ctx,L.x+L.w/2,L.y+10,3);ctx.fill();
  const by=L.y+L.h;
  ctx.fillStyle='#1d1e26';ctx.beginPath();ctx.moveTo(L.x-6,by);ctx.lineTo(L.x+L.w+6,by);ctx.lineTo(L.x+L.w+70,by+84);ctx.lineTo(L.x-70,by+84);ctx.closePath();ctx.fill();
  ctx.fillStyle='#262730';ctx.beginPath();ctx.moveTo(L.x-70,by+84);ctx.lineTo(L.x+L.w+70,by+84);ctx.lineTo(L.x+L.w+74,by+98);ctx.lineTo(L.x-74,by+98);ctx.closePath();ctx.fill();
  ctx.fillStyle='#121318';
  for(let r=0;r<4;r++){const y=by+12+r*13,x0=L.x+30-r*10,x1=L.x+L.w-30+r*10,n=15,cw=(x1-x0)/n;for(let c=0;c<n;c++){rrect(ctx,x0+c*cw+2,y,cw-4,9,2);ctx.fill();}}
  ctx.fillStyle='#1a1b22';rrect(ctx,L.x+L.w/2-70,by+66,140,14,4);ctx.fill();
  return{x:L.x+18,y:L.y+18,w:L.w-36,h:L.h-36};
}

/* ---------- 16 April · 22:06 — Shutter Island on Google Meet; both asleep on the call; the morning after ---------- */
const MEET_AM=[
  {at:22.4,who:'me', time:'09:42',text:'good date it was'},
  {at:24.2,who:'her',time:'09:44',text:'Abhi toh uthi hun at 9 am'},
  {at:25.8,who:'me', time:'09:45',text:'idk i slept on a date itna para hai'},
  {at:28.0,who:'her',time:'09:54',text:'Wese not tge first time aik dafa'},
  {at:29.3,who:'her',time:'09:55',text:'On call bhi youvr slept'},
  {at:30.8,who:'her',time:'09:56',text:'10th april wali raat'},
  {at:32.4,who:'her',time:'09:56',text:'😭😭😭😭🤣🤣🤣🤣 han har time first time lagta hai'},
];
const APR_LAP={x:272,y:92,w:736,h:468};
scene({id:'meet',name:'16 April · a virtual movie date',when:'2026-04-16T22:06',bars:11,fin:['#000000',1.2],fout:['#000000',1.2],
  note:'his laptop in the dark room: Shutter Island shared on Google Meet, her tile lamp-lit in the corner; both of them asleep before the end, the lights left on; the debrief the next morning.',
  tag:'“good date it was” · “idk i slept on a date itna para hai”',
  prep(){
    /* the film: a grey sea, a rock, a lighthouse — painted once */
    const f=mk(480,340),g=f.getContext('2d');
    g.fillStyle=vgrad(g,0,340,[[0,'#151c26'],[0.45,'#3b4752'],[0.6,'#6d7a80'],[0.63,'#2a3740'],[1,'#0f171c']]);g.fillRect(0,0,480,340);
    const r=rng(1604);g.fillStyle='rgba(20,26,34,.7)';for(let i=0;i<14;i++){ell(g,r()*480,30+r()*120,60+r()*90,14+r()*16);g.fill();}
    g.fillStyle='#0d1216';g.beginPath();g.moveTo(290,214);g.quadraticCurveTo(330,150,392,166);g.quadraticCurveTo(430,140,480,170);g.lineTo(480,230);g.lineTo(280,230);g.closePath();g.fill();
    g.fillStyle='#e8e2d6';g.fillRect(392,96,14,74);g.fillStyle='#b23a2e';g.fillRect(389,90,20,10);g.fillStyle='#fff3c4';g.fillRect(393,80,12,10);g.fillStyle='#2a2a30';g.fillRect(390,74,18,6);
    for(let i=0;i<70;i++){const y=216+r()*124,w=20+r()*90;g.fillStyle=`rgba(160,185,195,${0.05+r()*0.14})`;g.fillRect(r()*480-20,y,w,1.5);}
    return{film:f,R:rooms()};
  },
  draw(ctx,lt,A){
    if(lt<21.6){
      ctx.drawImage(A.R.night,0,0);
      const lamp=ctx.createRadialGradient(120,40,0,120,40,560);lamp.addColorStop(0,'rgba(255,196,130,.28)');lamp.addColorStop(1,'rgba(255,196,130,0)');ctx.fillStyle=lamp;ctx.fillRect(0,0,W,H);
      const late=lt>=18.8;
      const S=apr_laptop(ctx,APR_LAP);
      ctx.save();rrect(ctx,S.x,S.y,S.w,S.h,6);ctx.clip();
      ctx.fillStyle='#202124';ctx.fillRect(S.x,S.y,S.w,S.h);
      /* browser bar with the clock */
      ctx.fillStyle='#2b2c31';ctx.fillRect(S.x,S.y,S.w,26);ctx.fillStyle='#3b3c42';rrect(ctx,S.x+10,S.y+4,120,20,6);ctx.fill();
      ctx.fillStyle='#d6d7da';ctx.font='500 11px "Mulish",sans-serif';ctx.textAlign='left';ctx.fillText(late?'Netflix':'Meet',S.x+22,S.y+18);
      const clock=late?apr_hm(112+(lt-18.8)*14):apr_hm(Math.min(23*60+21,22*60+6+lt*5.6));
      ctx.textAlign='right';ctx.font='600 12px "Mulish",sans-serif';ctx.fillText(clock,S.x+S.w-14,S.y+18);
      const F={x:S.x+14,y:S.y+40,w:S.w-14-186-28,h:S.h-40-62};
      if(!late){
        /* the shared film */
        ctx.save();rrect(ctx,F.x,F.y,F.w,F.h,8);ctx.clip();ctx.drawImage(A.film,F.x,F.y,F.w,F.h);
        const lx=F.x+F.w*(399/480),ly=F.y+F.h*(85/340),a=lt*0.7;
        ctx.save();ctx.globalCompositeOperation='screen';const bg=ctx.createLinearGradient(lx,ly,lx+Math.cos(a)*600,ly+Math.sin(a)*600);bg.addColorStop(0,'rgba(255,240,190,.55)');bg.addColorStop(1,'rgba(255,240,190,0)');ctx.fillStyle=bg;ctx.beginPath();ctx.moveTo(lx,ly);ctx.lineTo(lx+Math.cos(a-0.05)*700,ly+Math.sin(a-0.05)*700);ctx.lineTo(lx+Math.cos(a+0.05)*700,ly+Math.sin(a+0.05)*700);ctx.closePath();ctx.fill();ctx.restore();
        const rr=rng(1605);ctx.strokeStyle='rgba(210,225,235,.22)';ctx.lineWidth=1;for(let i=0;i<90;i++){const x=F.x+rr()*F.w,sp=260+rr()*200,y=F.y+((rr()*F.h+lt*sp)%(F.h+20))-10;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x-2,y+12);ctx.stroke();}
        ctx.fillStyle='rgba(255,255,255,.25)';ctx.fillRect(F.x+12,F.y+F.h-8,F.w-24,3);ctx.fillStyle='#e50914';ctx.fillRect(F.x+12,F.y+F.h-8,(F.w-24)*Math.min(0.9,0.03+lt*0.011),3);
        ctx.restore();
        /* her tile: a lamp-lit corner of her room */
        const T={x:S.x+S.w-14-186,y:S.y+40,w:186,h:124};
        const drowsy=smooth(7,15,lt),awake=lt>13.2&&lt<15.6,closed=!awake&&lt>6&&Math.sin(lt*1.15+0.6)>1.05-1.5*drowsy;
        ctx.save();rrect(ctx,T.x,T.y,T.w,T.h,10);ctx.clip();
        ctx.fillStyle=vgrad(ctx,T.y,T.y+T.h,[[0,'#4b2d1b'],[1,'#1b110b']]);ctx.fillRect(T.x,T.y,T.w,T.h);
        glow(ctx,T.x+28,T.y+12,120,'#ffb55e',0.6);ctx.fillStyle='rgba(0,0,0,.28)';ctx.fillRect(T.x+T.w-46,T.y,46,T.h);
        ctx.fillStyle='#d9c3b0';ell(ctx,T.x+30,T.y+T.h+4,64,26,-0.1);ctx.fill();
        drawFabeha(ctx,T.x+T.w*0.53,T.y+T.h*0.5,0.5,{t:lt,outfit:'home',hair:'down',pose:'bust',look:awake?0:-0.3,smile:awake?0.55:0.3,eyes:closed?'closed':undefined,blush:0.2,tilt:0.14*drowsy*(awake?0.3:1),len:150});
        ctx.fillStyle='rgba(0,0,0,.45)';rrect(ctx,T.x+6,T.y+T.h-22,60,16,8);ctx.fill();ctx.fillStyle='#fff';ctx.font='600 10px "Mulish",sans-serif';ctx.textAlign='left';ctx.fillText('Fabeha',T.x+13,T.y+T.h-10);
        ctx.restore();
        /* his own tile, camera off */
        const Y={x:T.x,y:T.y+T.h+10,w:T.w,h:T.h};ctx.fillStyle='#3c4043';rrect(ctx,Y.x,Y.y,Y.w,Y.h,10);ctx.fill();
        ctx.fillStyle='#5f6368';circle(ctx,Y.x+Y.w/2,Y.y+Y.h/2-6,22);ctx.fill();ctx.fillStyle='#e8eaed';ctx.font='700 18px "Mulish",sans-serif';ctx.textAlign='center';ctx.fillText('F',Y.x+Y.w/2,Y.y+Y.h/2);
        ctx.fillStyle='rgba(0,0,0,.45)';rrect(ctx,Y.x+6,Y.y+Y.h-22,40,16,8);ctx.fill();ctx.fillStyle='#fff';ctx.font='600 10px "Mulish",sans-serif';ctx.textAlign='left';ctx.fillText('You',Y.x+13,Y.y+Y.h-10);
        /* her message in the Meet chat */
        if(lt>=13.6){const a=smooth(13.6,13.9,lt);ctx.save();ctx.globalAlpha=a;ctx.fillStyle='rgba(0,0,0,.72)';rrect(ctx,F.x+10,F.y+F.h-62,230,44,10);ctx.fill();ctx.fillStyle='#9aa0a6';ctx.font='600 10px "Mulish",sans-serif';ctx.textAlign='left';ctx.fillText('Fabeha · 23:21',F.x+22,F.y+F.h-46);ctx.fillStyle='#fff';ctx.font='500 13px "Mulish",sans-serif';ctx.fillText('Sogaye kiaaa???',F.x+22,F.y+F.h-28);ctx.restore();}
        /* the bar at the bottom */
        ctx.fillStyle='#202124';ctx.fillRect(S.x,S.y+S.h-52,S.w,52);ctx.fillStyle='#e8eaed';ctx.font='500 12px "Mulish",sans-serif';ctx.textAlign='left';ctx.fillText(clock,S.x+18,S.y+S.h-20);
        ctx.fillStyle='#3c4043';for(const dx of[-70,-30,30,70]){circle(ctx,S.x+S.w/2+dx,S.y+S.h-26,14);ctx.fill();}ctx.fillStyle='#ea4335';rrect(ctx,S.x+S.w/2-18,S.y+S.h-40,36,28,14);ctx.fill();
      }else{
        /* two in the morning: the film has ended, the call is gone, the lamp is still on */
        const FF={x:S.x+14,y:S.y+40,w:S.w-28,h:S.h-40-14};ctx.fillStyle='#000';rrect(ctx,FF.x,FF.y,FF.w,FF.h,8);ctx.fill();
        ctx.strokeStyle='rgba(255,255,255,.55)';ctx.lineWidth=2;circle(ctx,FF.x+FF.w/2,FF.y+FF.h/2,26);ctx.stroke();ctx.fillStyle='rgba(255,255,255,.55)';ctx.beginPath();ctx.moveTo(FF.x+FF.w/2-8,FF.y+FF.h/2-12);ctx.lineTo(FF.x+FF.w/2+14,FF.y+FF.h/2);ctx.lineTo(FF.x+FF.w/2-8,FF.y+FF.h/2+12);ctx.closePath();ctx.fill();
        ctx.fillStyle='rgba(255,255,255,.3)';ctx.fillRect(FF.x+12,FF.y+FF.h-8,FF.w-24,3);
      }
      ctx.restore();
      if(!late)glow(ctx,640,330,520,'#9fc3ff',0.08);
      /* my eyelids */
      const lid=Math.min(1,Math.max(0.72*smooth(15.2,16.2,lt)*(1-smooth(16.4,16.9,lt)),smooth(17.0,18.8,lt)));
      if(lid>0&&!late){const hh=lid*H*0.56;ctx.fillStyle='#000';ctx.fillRect(0,-10,W,hh-30+10);ctx.fillRect(0,H-hh+30,W,hh);
        ctx.fillStyle=vgrad(ctx,hh-30,hh+10,[[0,'rgba(0,0,0,1)'],[1,'rgba(0,0,0,0)']]);ctx.fillRect(0,hh-30,W,40);ctx.fillStyle=vgrad(ctx,H-hh-10,H-hh+30,[[0,'rgba(0,0,0,0)'],[1,'rgba(0,0,0,1)']]);ctx.fillRect(0,H-hh-10,W,40);}
      if(late){const a=1-smooth(18.8,19.5,lt)+smooth(21.1,21.6,lt);if(a>0){ctx.fillStyle=`rgba(0,0,0,${Math.min(1,a)})`;ctx.fillRect(0,0,W,H);}}
      return;
    }
    /* 17 April, 09:42 — the morning after */
    ctx.drawImage(A.R.morning,0,0);
    const S=drawPhoneHand(ctx,lt,{x:475,y:120,w:330,h:700});
    chatPanel(ctx,S,MEET_AM,lt,{name:'Fabeha',status:'online'});
    phoneTop(ctx,S,{time:lt<24.2?'09:42':lt<25.8?'09:44':lt<28?'09:45':lt<29.3?'09:54':lt<30.8?'09:55':'09:56'});
    const a=1-smooth(21.6,22.3,lt);if(a>0){ctx.fillStyle=`rgba(0,0,0,${a})`;ctx.fillRect(0,0,W,H);}
  },
  subs:[
    [0.6,4.6,'16 April, ten at night. She invited me to a virtual movie date: Shutter Island, on Google Meet.'],
    [5.0,8.2,'I invite you for a virtual move date, abhi 👉👈','her'],
    [8.6,12.6,'An hour in, her eyes kept closing. Mine were not far behind.'],
    [13.7,15.6,'Sogaye kiaaa???','her'],
    [17.2,19.5,'I slept with the lights on. The film played to the end for nobody.'],
    [19.7,21.4,'When I woke, someone had switched them off.'],
    [22.6,24.0,'good date it was','him'],
    [24.3,25.7,'Abhi toh uthi hun at 9 am','her'],
    [25.9,27.8,'idk i slept on a date itna para hai','him'],
    [28.1,29.2,'Wese not tge first time aik dafa','her'],
    [29.4,30.6,'On call bhi youvr slept','her'],
    [30.9,32.2,'10th april wali raat','her'],
    [32.5,34.6,'😭😭😭😭🤣🤣🤣🤣 han har time first time lagta hai','her'],
    [34.9,36.3,'Twice now. She kept count.'],
  ],
  score({hit,bars,melody,THEME_B}){
    bars(0,6,['Em','Cmaj7','G','Dsus'],{padVel:0.28});
    for(let b=0;b<5;b++)melody(b,b,'box',12,b<4?0.34:0.2,THEME_B);
    hit(13.6,'tick',{hi:true});
    bars(6,5,['G','Cadd9','Em7','Dsus'],{padVel:0.3,arp:true,arpVel:0.1});
    [22.0,23.6,27.1].forEach(t=>hit(t,'bird',{f:2600+((t*700)%800)}));
    for(const m of MEET_AM)hit(m.at,'tick',{hi:m.who==='her'});
  },
  amb(lt){return lt<21.6?{room:0.22,hum:0.12}:{room:0.24};},
});

/* ---------- 19 April · 09:31 — the last breakfast at home, and her Kaaba briefing typed into his notes ---------- */
function apr_plate(g,cx,cy){
  g.fillStyle='rgba(0,0,0,.2)';ell(g,cx+6,cy+10,98,60);g.fill();
  g.fillStyle='#f6f3ec';ell(g,cx,cy,96,58);g.fill();g.fillStyle='#e4ded2';ell(g,cx,cy,82,48);g.fill();g.fillStyle='#faf8f3';ell(g,cx,cy,76,44);g.fill();
  const r=rng(1904);
  g.fillStyle='#dcbb87';g.beginPath();for(let k=0;k<=28;k++){const a=k/28*TAU,rr=56+Math.sin(a*3+1)*3+r()*2;g.lineTo(cx-18+Math.cos(a)*rr,cy+2+Math.sin(a)*rr*0.6);}g.closePath();g.fill();
  g.fillStyle='rgba(120,70,30,.35)';for(let i=0;i<14;i++){const a=r()*TAU,d=r()*42;ell(g,cx-18+Math.cos(a)*d,cy+2+Math.sin(a)*d*0.6,3+r()*5,2+r()*3,a);g.fill();}
  g.fillStyle='rgba(255,240,200,.35)';ell(g,cx-30,cy-8,18,8,-0.4);g.fill();
  for(const[ex,ey,rot]of[[cx+30,cy-14,0.3],[cx+44,cy+12,-0.2],[cx+10,cy+24,0.6]]){
    g.fillStyle='#fbf8f0';g.beginPath();for(let k=0;k<=18;k++){const a=k/18*TAU,rr=22+Math.sin(a*2+rot)*4+Math.sin(a*5)*2;g.lineTo(ex+Math.cos(a)*rr,ey+Math.sin(a)*rr*0.62);}g.closePath();g.fill();
    g.fillStyle='#f0b434';ell(g,ex-2,ey-1,9,6.5);g.fill();g.fillStyle='#f7cf6a';ell(g,ex-4,ey-3,3.5,2.2);g.fill();
  }
}
/* the status bar in dark text, for a light screen */
function apr_phoneTopDark(ctx,S,time){
  ctx.save();rrect(ctx,S.x,S.y,S.w,S.h,S.r);ctx.clip();
  ctx.fillStyle='#0e0e12';rrect(ctx,S.x+S.w/2-44,S.y+8,88,24,12);ctx.fill();
  ctx.fillStyle='#1c1a17';ctx.font='600 13px "Mulish",sans-serif';ctx.textAlign='left';ctx.fillText(time,S.x+22,S.y+26);
  ctx.textAlign='right';ctx.font='500 12px "Mulish",sans-serif';ctx.fillText('●●●  ⌔  ▮',S.x+S.w-18,S.y+26);
  ctx.restore();
}
/* the notes app on the phone: a title, a date line, and big bold lines that type themselves in
   (sizes are in phone space; the briefing draws the phone 1.2× so a line reads at ~24 px on the frame) */
function apr_notes(ctx,S,lt,items,o){
  ctx.save();rrect(ctx,S.x,S.y,S.w,S.h,S.r);ctx.clip();
  ctx.fillStyle='#fbf9f3';ctx.fillRect(S.x,S.y,S.w,S.h);
  const top=S.y+36,lh=26,maxW=S.w-56,cps=o.cps||24;ctx.font='700 20px "Mulish",sans-serif';
  const rows=[];let y=top+116;
  for(const it of items){if(lt<it.at)break;const n=Math.floor((lt-it.at)*cps),text=it.text.slice(0,n),lines=wrapText(ctx,text.length?text:' ',maxW);rows.push({lines,y,done:n>=it.text.length});y+=lines.length*lh+7;}
  const off=Math.max(0,y-Math.min(S.y+S.h-80,o.bottom||H-110));
  ctx.textAlign='left';
  rows.forEach((rw,i)=>{const ry=rw.y-off;ctx.fillStyle='#c9942a';ctx.fillText('•',S.x+20,ry);ctx.fillStyle='#1c1a17';rw.lines.forEach((s,k)=>ctx.fillText(s,S.x+38,ry+k*lh));
    if(i===rows.length-1&&!rw.done&&Math.sin(lt*9)>0){const last=rw.lines[rw.lines.length-1];ctx.fillStyle='#c9942a';ctx.fillRect(S.x+40+ctx.measureText(last).width,ry+(rw.lines.length-1)*lh-17,2.5,21);}});
  ctx.fillStyle='#fbf9f3';ctx.fillRect(S.x,S.y,S.w,top+88-S.y);
  ctx.fillStyle='#c9942a';ctx.font='600 15px "Mulish",sans-serif';ctx.textAlign='left';ctx.fillText('‹ Notes',S.x+14,top+22);ctx.textAlign='right';ctx.font='700 15px "Mulish",sans-serif';ctx.fillText('Done',S.x+S.w-14,top+22);
  ctx.fillStyle='#8f8a80';ctx.font='600 12px "Mulish",sans-serif';ctx.textAlign='center';ctx.fillText(o.date||'',S.x+S.w/2,top+46);
  ctx.fillStyle='#1c1a17';ctx.font='700 25px "Mulish",sans-serif';ctx.textAlign='left';ctx.fillText(o.title||'',S.x+18,top+76);
  ctx.restore();
}
/* the phone in the briefing, held closer (1.2×) so everything on it reads big */
function apr_bigPhone(ctx,lt,paint){
  ctx.save();ctx.translate(800,720);ctx.scale(1.2,1.2);ctx.translate(-800,-720);
  const S=drawPhoneHand(ctx,lt,{x:666,y:262,w:330,h:700});paint(S);
  ctx.restore();
}
/* one of her instructions, big, across the top of the frame: a soft dark band, bold serif, ~3 s, then gone */
function apr_bigLine(ctx,lt,o){
  const a=smooth(o.at,o.at+0.6,lt)*(1-smooth(o.out,o.out+0.7,lt));if(a<=0)return;
  const n=o.lines.length,cy=100,lh=58,rise=(1-easeOut(clamp((lt-o.at)/1.0)))*10;
  ctx.save();ctx.globalAlpha=a;
  ctx.fillStyle=vgrad(ctx,cy-116,cy+124,[[0,'rgba(12,9,14,.25)'],[0.22,'rgba(12,9,14,.78)'],[0.74,'rgba(12,9,14,.78)'],[1,'rgba(12,9,14,0)']]);ctx.fillRect(0,cy-116,W,240);
  let fs=52;ctx.font=`600 ${fs}px "Cormorant Garamond",Georgia,serif`;
  const widest=()=>Math.max(...o.lines.map(l=>ctx.measureText(l).width));
  while(widest()>1120&&fs>36){fs-=2;ctx.font=`600 ${fs}px "Cormorant Garamond",Georgia,serif`;}
  ctx.textAlign='center';ctx.fillStyle='#fff3de';ctx.shadowColor='rgba(255,196,120,.6)';ctx.shadowBlur=18;
  const y0=cy-(n-1)*lh/2+fs*0.32+rise;
  o.lines.forEach((l,k)=>{const la=k&&o.stagger?smooth(o.at+o.stagger,o.at+o.stagger+0.6,lt):1;if(la<=0)return;ctx.globalAlpha=a*la;ctx.fillText(l,640,y0+k*lh);});
  ctx.shadowBlur=0;ctx.globalAlpha=a*0.75;const hw=Math.min(560,widest()/2+30),hy=y0+(n-1)*lh+14;
  ctx.fillStyle=hgrad(ctx,640-hw,640+hw,[[0,'rgba(217,178,122,0)'],[0.5,'rgba(217,178,122,.9)'],[1,'rgba(217,178,122,0)']]);ctx.fillRect(640-hw,hy,hw*2,1.5);
  ctx.restore();
}
const KAABA_NOTES=[
  {at:9.8, text:'an hour or half an hour before fajar — tahajjud'},
  {at:13.5,text:'2 2 2 2 2 parhte hain'},
  {at:15.3,text:'Ya uske baad tawaff'},
  {at:17.2,text:'16 rakaats — nearest to Allah'},
  {at:20.9,text:'3 times durood shareef'},
  {at:21.7,text:'3 times alam shareef'},
  {at:22.3,text:'3 times aytal kursi'},
  {at:22.9,text:'3 times surah iqlas'},
  {at:23.4,text:'3 times falaq'},
  {at:23.8,text:'3 times naas'},
  {at:24.2,text:'3 times durood shareef.'},
  {at:27.8,text:'apni ammi ka bohut kyaal rakna'},
  {at:33.6,text:'dosti mein na thankyou na sorry'},
];
/* her key instructions, big across the top as each one lands (verbatim pieces of her messages) */
const KAABA_BIG=[
  {at:9.8, out:13.4,lines:['an hour or half an hour before fajar','aur maze se pray tahajjud']},
  {at:17.2,out:20.9,lines:['if you pray around 16 rakaats','Toh you\'re nearest to Allah'],stagger:2.2},
  {at:27.9,out:31.6,lines:['apni ammi ka bohut kyaal rakna']},
  {at:36.4,out:40.0,lines:['Youll see your bed after 40 days.']},
];
scene({id:'briefing',name:'19 April · the briefing',when:'2026-04-19T09:31',bars:13,fin:['#000000',1.2],fout:['#000000',1.2],
  note:'the last breakfast at home, cooked by him while Ammi ran late and the gas went; her Kaaba briefing typed into his notes line by line; the packed bags by the door; by evening, the bags still there.',
  tag:'“2 2 2 2 2 parhte hain” · “Youll see your bed after 40 days.”',
  prep(){
    const c=mk(W,H),g=c.getContext('2d');
    g.fillStyle=vgrad(g,0,H,[[0,'#f2eadc'],[0.7,'#e3d8c6'],[1,'#d4c7b3']]);g.fillRect(0,0,W,H);
    g.fillStyle='#f8f4ec';g.fillRect(880,50,330,320);g.fillStyle='#cfe5f4';g.fillRect(894,64,302,292);
    g.fillStyle='#f8f4ec';g.fillRect(1041,64,8,292);g.fillRect(894,206,302,8);
    const sun=g.createRadialGradient(1000,140,0,1000,140,560);sun.addColorStop(0,'rgba(255,244,205,.95)');sun.addColorStop(1,'rgba(255,244,205,0)');g.fillStyle=sun;g.fillRect(0,0,W,H);
    g.fillStyle='#b3a088';g.fillRect(58,56,196,440);g.fillStyle='#cbb9a1';g.fillRect(70,68,172,428);
    g.fillStyle='#bfab92';g.fillRect(90,90,132,150);g.fillRect(90,262,132,170);g.fillStyle='#e8d5b0';circle(g,228,300,6);g.fill();
    g.fillStyle='#cdbfa8';g.fillRect(0,496,W,30);g.fillStyle=vgrad(g,526,720,[[0,'#bfae95'],[1,'#a08c72']]);g.fillRect(0,526,W,194);
    g.fillStyle='rgba(0,0,0,.18)';ell(g,330,498,112,14);g.fill();
    g.strokeStyle='#1a2a3e';g.lineWidth=6;rrect(g,300,282,62,44,8);g.stroke();
    g.fillStyle='#223650';rrect(g,262,320,138,180,14);g.fill();g.fillStyle='#2e4668';rrect(g,274,332,114,156,10);g.fill();
    g.fillStyle='#1a2a3e';g.fillRect(262,380,138,8);g.fillStyle='#e8c66a';rrect(g,372,350,18,28,4);g.fill();
    g.fillStyle='rgba(0,0,0,.14)';ell(g,470,498,70,10);g.fill();
    g.fillStyle='#6b5340';rrect(g,410,420,120,80,20);g.fill();g.strokeStyle='#3d2e22';g.lineWidth=5;g.beginPath();g.moveTo(440,420);g.quadraticCurveTo(470,380,500,420);g.stroke();
    g.fillStyle=vgrad(g,560,720,[[0,'#9c7a55'],[1,'#7a5c3e']]);g.fillRect(-20,560,W+40,160);g.fillStyle='#b08c62';g.fillRect(-20,556,W+40,8);
    apr_plate(g,330,626);
    g.fillStyle='rgba(0,0,0,.18)';ell(g,486,614,30,9);g.fill();g.fillStyle='#efe9df';rrect(g,458,560,52,52,8);g.fill();g.strokeStyle='#e2dbd0';g.lineWidth=6;g.beginPath();g.arc(514,586,13,-Math.PI/2,Math.PI/2);g.stroke();g.fillStyle='#a8683a';ell(g,484,562,24,7);g.fill();
    return{room:c};
  },
  draw(ctx,lt,A){
    ctx.drawImage(A.room,0,0);
    const eve=lt>=35.6;
    if(!eve){
      const rr=rng(1905);ctx.strokeStyle='rgba(255,255,255,.35)';ctx.lineWidth=2;for(let k=0;k<4;k++){const ph=rr()*TAU,x0=330+(k-1.5)*22,u=((lt*0.35+rr())%1);ctx.globalAlpha=0.5*(1-u);ctx.beginPath();ctx.moveTo(x0,600-u*10);ctx.quadraticCurveTo(x0+Math.sin(lt*2+ph)*8,590-u*40,x0+Math.sin(lt*1.5+ph)*4,576-u*70);ctx.stroke();}ctx.globalAlpha=1;
      motes(ctx,lt,30,1906,'#fff6d6',1.3,0.5);
      apr_bigPhone(ctx,lt,S=>{
        if(lt<9.0){
          chatPanel(ctx,S,[{at:0,who:'me',time:'09:17',photos:2,paint:(g,x,y,t,k)=>{g.fillStyle=k?'#d9c7a8':'#e6d9c2';g.fillRect(x,y,t,t);g.save();g.translate(x+t*0.5,y+t*0.55);g.scale(k?0.52:0.6,k?0.52:0.6);g.rotate(k?0.3:0);apr_plate(g,0,0);g.restore();}},{at:0,who:'me',time:'09:17',text:'i can proudly say i am an indepemdemt ,am'},{at:0,who:'me',time:'09:17',text:'man'},{at:3.6,who:'her',time:'09:28',text:'Good efforts wese i like it'},{at:6.6,who:'me',time:'09:28',text:'when there is a will there is a way'}],lt,{name:'Fabeha',status:'online'});
          phoneTop(ctx,S,{time:lt<3.6?'09:17':'09:28'});
        }else{
          apr_notes(ctx,S,lt,KAABA_NOTES,{title:'before the Kaaba',date:'19 April 2026 at 09:31'});
          apr_phoneTopDark(ctx,S,apr_hm(9*60+31+(lt-9)*2.6));
        }
      });
      sunGlow(ctx,1000,140,300,'rgba(255,244,205,0.35)');
      for(const o of KAABA_BIG)apr_bigLine(ctx,lt,o);
      return;
    }
    /* 20:31 — the same room, the bags still by the door */
    ctx.fillStyle='rgba(8,10,24,.8)';ctx.fillRect(0,0,W,H);
    const lamp=ctx.createRadialGradient(160,90,0,160,90,520);lamp.addColorStop(0,'rgba(255,186,110,.42)');lamp.addColorStop(1,'rgba(255,186,110,0)');ctx.fillStyle=lamp;ctx.fillRect(0,0,W,H);
    ctx.fillStyle='rgba(20,30,60,.5)';ctx.fillRect(894,64,302,292);stars(ctx,lt,60,1907,360,0.6);
    apr_bigPhone(ctx,lt,S=>{
      chatPanel(ctx,S,[{at:35.8,who:'her',time:'20:31',text:'Around 9 tak sojaoo aram se for an hour or so if you can.ik nikalna hoga hyd se road drive hogi.  Youll see your bed after 40 days.'}],lt,{name:'Fabeha',status:'online'});
      phoneTop(ctx,S,{time:'20:31'});
    });
    glow(ctx,835,430,400,'#8fb0ff',0.12);
    for(const o of KAABA_BIG)apr_bigLine(ctx,lt,o);
    const a=1-smooth(35.6,36.2,lt);if(a>0){ctx.fillStyle=`rgba(0,0,0,${a})`;ctx.fillRect(0,0,W,H);}
  },
  subs:[
    [0.6,4.6,'19 April, the last morning at home. Ammi was running late and the gas went at nine, so I made breakfast myself.'],
    [5.0,6.6,'Good efforts wese i like it','her'],
    [6.9,8.7,'when there is a will there is a way','him'],
    [9.4,13.2,'Han mein keh rahi thi to go an hour or half an hour before fajar there  in kabba aur maze se pray tahajjud','her'],
    [13.5,14.9,'2 2 2 2 2 parhte hain','her'],
    [15.2,16.7,'Ya uske baad tawaff','her'],
    [17.0,19.2,'Also it is said in ahadees kay if you pray around 16 rakaats','her'],
    [19.4,20.6,'Toh you\'re nearest to Allah','her'],
    [21.0,24.2,'The three-times surahs, with a niyat before each, typed back to her so I would have them.'],
    [24.6,25.8,'thanksss sir','him'],
    [26.0,27.3,'Arayyy kis baat ka','her'],
    [27.7,30.5,'Also, apni ammi ka bohut kyaal rakna , apart from the fact she\'s your mum and all, and it is your primary duty to do it','her'],
    [30.6,33.3,'but from the niyat that you\'re doing for Allah\'s saje and it is your obligation to please him.','her'],
    [33.5,35.2,'ha ha dosti mein na thankyou na sorry','him'],
    [36.2,38.8,'Youll see your bed after 40 days.','her'],
    [40.4,42.6,'Forty days. I was leaving at one.'],
  ],
  score({hit,bars,melody,THEME}){
    bars(0,10,['G','Cadd9','Em7','Dsus'],{padVel:0.34,arp:true,arpVel:0.12});
    for(let b=2;b<7;b++)melody(b,b-2,'flute',0,0.4,THEME);
    [1.2,3.4,9.0,14.2,20.4,26.6].forEach(t=>hit(t,'bird',{f:2500+((t*911)%900)}));
    KAABA_NOTES.forEach((n,i)=>hit(n.at,'pluck',{midi:[79,76,74,79,81,83,84][i%7],vel:0.26}));
    KAABA_BIG.forEach((o,i)=>hit(o.at,'chime',{midi:[88,91,93,91][i],vel:0.26}));
    hit(3.6,'tick',{hi:true});hit(6.6,'tick',{});
    bars(10,3,['Em','Cmaj7','G'],{strings:true,padVel:0.32});
    hit(35.8,'tick',{hi:true});
  },
  amb(lt){return lt<35.6?{room:0.24,wind:0.08}:{room:0.2};},
});

/* ---------- 26 April · 23:46 — the emptied Rawdah from the carpet, then the Madina hotel bed where he tells her ---------- */
const RAWDAH=[
  {at:0,   who:'her',time:'23:34',text:'I was praying jab apka phone aya'},
  {at:3.5, who:'me', time:'23:46',text:'😭 i went in 5:45'},
  {at:5.2, who:'me', time:'23:46',text:'At 6:05 they started kicking'},
  {at:7.0, who:'me', time:'23:46',text:'Tou i went straight in sajda'},
  {at:8.8, who:'me', time:'23:46',text:'30-40Min'},
  {at:10.0,who:'me', time:'23:47',text:'Sajde mein tha'},
  {at:14.6,who:'me', time:'23:47',text:'Its jannat'},
  {at:15.8,who:'me', time:'23:47',text:'😭 literally jannat'},
  {at:17.2,who:'her',time:'23:47',text:'Damn damnn MashaAllah MashaAllah'},
  {at:19.0,who:'me', time:'23:47',text:'Allah al Mustaan( it has worked miracles for me)'},
  {at:20.6,who:'me', time:'23:48',text:'They emptied the whole room'},
  {at:21.8,who:'me', time:'23:48',text:'Sirf 3 log'},
  {at:23.0,who:'her',time:'23:49',text:'Kiaaa baat haiii bhaeeeee'},
  {at:25.0,who:'her',time:'23:52',text:'Khair Allah qabool karne wala hai'},
  {at:26.5,who:'her',time:'23:52',text:'Ap bas abhi waseela ho'},
];
/* his hands flat on the green carpet, either side of the frame, in sajda */
function apr_sajdaHands(ctx,lt){
  const bob=Math.sin(lt*0.8)*2.5;
  for(const d of[-1,1]){const px=640+d*400,py=668+bob;
    ctx.fillStyle='rgba(0,40,10,.28)';ell(ctx,px+d*8,py+26,70,16);ctx.fill();
    for(let k=0;k<4;k++){const fx=px-30+k*20+d*4,fy=py-26,fl=54-Math.abs(k-1.5)*9;ctx.fillStyle=HIS.skin;rrect(ctx,fx-8,fy-fl,16,fl+14,8);ctx.fill();ctx.strokeStyle='rgba(90,55,35,.28)';ctx.lineWidth=1.2;rrect(ctx,fx-8,fy-fl,16,fl+14,8);ctx.stroke();ctx.fillStyle=HIS.nail;ell(ctx,fx,fy-fl+6,5,3.6);ctx.fill();}
    ctx.fillStyle=HIS.skin;ell(ctx,px,py,58,36,d*0.08);ctx.fill();ctx.fillStyle=HIS.skinSh;ell(ctx,px-d*10,py+14,40,12,d*0.1);ctx.fill();
    ctx.fillStyle=HIS.skin;ell(ctx,px-d*60,py-4,16,28,d*0.75);ctx.fill();ctx.fillStyle=HIS.nail;ell(ctx,px-d*70,py-24,4.5,3.4,d*0.75);ctx.fill();
  }
}
scene({id:'rawdah',name:'26 April · Riyaz ul Jannah',when:'2026-04-26T23:46',bars:9,fin:['#000000',1.4],fout:['#ffffff',1.6],
  note:'the Rawdah from the carpet, his hands flat on the green, the room emptying around him — thirty, forty minutes in sajda, three people left; then the Madina hotel bed under the green window, the story told to her line by line.',
  tag:'“Its jannat” · “Ap bas abhi waseela ho”',
  prep(){
    /* the Rawdah from the carpet: white pillars, warm chandeliers, the green floor with its rosettes */
    const c=mk(W,H),g=c.getContext('2d');
    g.fillStyle=vgrad(g,0,236,[[0,'#d8c6a2'],[0.5,'#efe5d2'],[1,'#f7f1e6']]);g.fillRect(0,0,W,236);
    const xs=[-40,160,360,560,720,920,1120,1320];
    g.strokeStyle='#d9ccb0';g.lineWidth=7;for(let i=0;i<xs.length-1;i++){const a=xs[i],b=xs[i+1];g.beginPath();g.moveTo(a+24,96);g.quadraticCurveTo((a+b)/2,-20,b-24,96);g.stroke();}
    for(const x of xs){g.fillStyle='#f8f3ea';g.fillRect(x-24,40,48,196);g.fillStyle='#e4d8c0';g.fillRect(x-24,40,9,196);g.fillStyle='#c9a65a';g.fillRect(x-28,34,56,10);g.fillRect(x-28,222,56,14);}
    for(const x of[260,640,1020]){glow(g,x,26,190,'#ffd98a',0.5);}
    g.fillStyle='#2f7a4c';g.fillRect(0,230,W,8);
    g.fillStyle=vgrad(g,238,720,[[0,'#6ea873'],[0.3,'#4f8d56'],[1,'#2b6a3c']]);g.fillRect(0,238,W,482);
    for(let i=0;i<=18;i++){const u=i/18,y=240+u*u*480,s=2.5+u*26,sp=22+u*150,n=Math.ceil(W/sp)+4;
      for(let k=0;k<n;k++){const x=640+(k-n/2+(i%2)*0.5)*sp;
        g.fillStyle='rgba(232,219,170,.55)';for(let p=0;p<6;p++){const a=p/6*TAU;ell(g,x+Math.cos(a)*s*0.5,y+Math.sin(a)*s*0.28,s*0.34,s*0.18,a);g.fill();}
        g.fillStyle='#d9b64c';ell(g,x,y,s*0.2,s*0.11);g.fill();
        g.fillStyle='rgba(200,180,120,.35)';ell(g,x+sp/2,y+s*0.1,s*0.12,s*0.07);g.fill();}}
    g.strokeStyle='rgba(0,30,10,.14)';g.lineWidth=2;for(let i=1;i<=18;i++){const u=i/18,y=240+u*u*480+8+u*30;g.beginPath();g.moveTo(0,y);g.lineTo(W,y);g.stroke();}
    const vg=g.createRadialGradient(640,420,200,640,420,900);vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(0,10,0,.45)');g.fillStyle=vg;g.fillRect(0,0,W,H);
    /* the hotel room */
    const h=mk(W,H),hg=h.getContext('2d');
    hg.fillStyle=vgrad(hg,0,H,[[0,'#121420'],[0.6,'#1a1c28'],[1,'#0e0f16']]);hg.fillRect(0,0,W,H);
    hg.fillStyle='#2a2d3a';hg.fillRect(846,56,352,380);
    hg.fillStyle=vgrad(hg,70,422,[[0,'#07101f'],[1,'#17263a']]);hg.fillRect(860,70,324,352);
    const rs=rng(2605);hg.fillStyle='#fff6dc';for(let i=0;i<50;i++){const s=rs()*1.3+0.3;hg.fillRect(860+rs()*324,70+rs()*150,s,s);}
    for(const x of[905,1140]){hg.fillStyle='#e9e2d4';hg.fillRect(x-10,140,20,282);hg.fillStyle='#2f7a4c';hg.beginPath();hg.moveTo(x-14,140);hg.lineTo(x,112);hg.lineTo(x+14,140);hg.closePath();hg.fill();glow(hg,x,150,44,'#ffe29a',0.8);hg.fillStyle='#ffe8b0';hg.fillRect(x-8,180,16,6);hg.fillRect(x-8,260,16,6);}
    hg.fillStyle='#e9e2d4';hg.fillRect(930,300,180,122);
    hg.fillStyle='#2f7a4c';hg.beginPath();hg.arc(1020,300,70,Math.PI,0);hg.closePath();hg.fill();hg.fillStyle='#4a9a64';hg.beginPath();hg.arc(1020,300,70,Math.PI*1.2,Math.PI*1.5);hg.lineTo(1020,300);hg.closePath();hg.fill();
    hg.fillStyle='#ffe29a';hg.fillRect(1018,214,4,18);glow(hg,1020,286,170,'#5fd08a',0.55);
    hg.fillStyle='#ffd98a';for(let k=0;k<8;k++){hg.fillRect(942+k*22,340,10,40);}
    hg.fillStyle='rgba(120,200,150,.08)';hg.fillRect(860,70,324,352);
    hg.fillStyle='#2a2d3a';hg.fillRect(1018,70,6,352);hg.fillRect(860,246,324,6);
    hg.fillStyle='#232636';hg.fillRect(800,40,60,420);hg.fillRect(1184,40,60,420);
    const gl=hg.createRadialGradient(1020,260,20,1020,260,900);gl.addColorStop(0,'rgba(80,200,130,.3)');gl.addColorStop(1,'rgba(80,200,130,0)');hg.fillStyle=gl;hg.fillRect(0,0,W,H);
    hg.fillStyle='#2c2f3a';rrect(hg,80,70,260,70,12);hg.fill();hg.fillStyle='#3cd16a';circle(hg,318,100,3);hg.fill();
    hg.fillStyle=vgrad(hg,500,720,[[0,'#cfd6cf'],[1,'#98a39b']]);hg.beginPath();hg.moveTo(0,560);hg.quadraticCurveTo(300,500,640,540);hg.quadraticCurveTo(1000,580,W,520);hg.lineTo(W,720);hg.lineTo(0,720);hg.closePath();hg.fill();
    hg.strokeStyle='rgba(0,0,0,.1)';hg.lineWidth=3;for(const[x0,y0,x1,y1]of[[100,620,420,700],[700,600,1100,660],[200,560,500,610]]){hg.beginPath();hg.moveTo(x0,y0);hg.quadraticCurveTo((x0+x1)/2,y0+30,x1,y1);hg.stroke();}
    hg.fillStyle='#e6e9e3';ell(hg,60,600,120,50,0.2);hg.fill();
    const r=rng(2606),people=[];for(let i=0;i<14;i++)people.push({u0:0.2+r()*0.55,dx:(r()-0.5)*1.6,col:['#f5f1ea','#e9e3d6','#d8cfc0','#cfd6dd','#f5f1ea'][i%5],go:0.8+r()*5});
    return{carpet:c,hotel:h,people};
  },
  draw(ctx,lt,A){
    const ins=1-smooth(16.4,17.2,lt);
    if(ins<0.999){
      ctx.drawImage(A.hotel,0,0);
      motes(ctx,lt,26,2607,'#9fe3b8',1.4,0.3);
      const S=drawPhoneHand(ctx,lt,{x:475,y:120,w:330,h:700});
      chatPanel(ctx,S,RAWDAH,lt,{name:'Fabeha',status:'online'});
      phoneTop(ctx,S,{time:lt<20.6?'23:47':lt<23?'23:48':lt<25?'23:49':'23:52'});
      glow(ctx,640,620,320,'#8fb0ff',0.1);
    }
    if(ins>0){
      ctx.save();ctx.globalAlpha=ins;
      ctx.drawImage(A.carpet,0,0);
      /* the room empties around me */
      for(let i=0;i<A.people.length;i++){const p=A.people[i],leave=smooth(p.go,p.go+5.5,lt),u=p.u0*(1-leave),a=1-smooth(p.go+4.6,p.go+5.5,lt);if(a<=0)continue;
        const s=0.3+u*2.1,y=240+u*u*480,x=640+p.dx*(80+u*520);ctx.save();ctx.globalAlpha=ins*a;drawFigureFar(ctx,x,y-48*s,s,p.col,'#2b2426',lt,i,false);ctx.restore();}
      for(const[x,k]of[[590,0],[640,1],[700,2]]){const s=0.42;drawFigureFar(ctx,x,240+0.004*480-36*s,s,'#f5f1ea','#2b2426',lt,k,true);}
      motes(ctx,lt,40,2608,'#ffe9b0',1.5,0.35);
      const warm=smooth(11,15,lt);if(warm>0){ctx.fillStyle=`rgba(255,226,160,${0.12*warm})`;ctx.fillRect(0,0,W,H);}
      apr_sajdaHands(ctx,lt);
      ctx.restore();
    }
  },
  subs:[
    [0.5,3.2,'26 April, Madina. Riyaz ul Jannah, the seventh time.'],
    [3.5,5.0,'😭 i went in 5:45','him'],
    [5.2,6.8,'At 6:05 they started kicking','him'],
    [7.0,8.6,'Tou i went straight in sajda','him'],
    [8.8,9.8,'30-40Min','him'],
    [10.0,11.3,'Sajde mein tha','him'],
    [11.6,13.0,'They emptied the whole room','him'],
    [13.2,14.3,'Sirf 3 log','him'],
    [14.6,15.6,'Its jannat','him'],
    [15.8,16.9,'😭 literally jannat','him'],
    [17.3,18.7,'Damn damnn MashaAllah MashaAllah','her'],
    [19.0,21.0,'Allah al Mustaan( it has worked miracles for me)','him'],
    [23.0,24.4,'Kiaaa baat haiii bhaeeeee','her'],
    [25.0,26.2,'Khair Allah qabool karne wala hai','her'],
    [26.5,28.6,'Ap bas abhi waseela ho','her'],
  ],
  score({hit,bars,melody,THEME_B}){
    bars(0,9,['Em','Cmaj7','G','Dsus'],{strings:true,padVel:0.3});
    hit(14.6,'chime',{midi:79,vel:0.42});hit(15.8,'chime',{midi:83,vel:0.32});
    for(let b=5;b<8;b++)melody(b,b,'flute',0,0.32,THEME_B);
    for(const m of RAWDAH)if(m.at>16.4)hit(m.at,'tick',{hi:m.who==='her'});
  },
  amb(lt){return lt<16.4?{room:0.1+0.3*(1-smooth(3,10,lt))}:{room:0.2,hum:0.14};},
});
