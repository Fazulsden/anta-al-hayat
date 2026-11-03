/* aug.js — 1–15 August 2026: the aurora and the moustache, the job, "degree eik bahana tha", Independence Day.
   She has just graduated and is job-hunting in Karachi; he is in Hyderabad. No meeting in this fortnight — it all happens on the phone. */
'use strict';

/* ---------- helpers (aug_ prefix) ---------- */
/* a music-box arpeggio over chord tones, eight notes a bar */
function aug_boxArp(hit,CH,from,n,chords,vel,pattern){
  pattern=pattern||[0,1,2,3,4,3,2,1];
  for(let b=0;b<n;b++){const c=CH[chords[b%chords.length]],tones=[c.p[0],c.p[1],c.p[2],c.p[3],c.p[1]+12,c.p[2]+12];
    pattern.forEach((ix,k)=>{if(ix!=null)hit((from+b)*BAR+k*BEAT/2,'box',{midi:tones[ix]+12,vel});});}
}
/* little things rising out of the phone, one per spawn time: red hearts, or emoji */
function aug_floaters(ctx,lt,spawns,x0,y0,o={}){
  const life=o.life||4.5,sp=o.speed||95,sz=o.size||15;
  for(let i=0;i<spawns.length;i++){const age=lt-spawns[i];if(age<0||age>life)continue;const u=age/life;
    const x=x0+Math.sin(age*1.6+i*2.1)*26+(i-(spawns.length-1)/2)*18*u,y=y0-age*sp,a=smooth(0,0.12,u)*(1-smooth(0.72,1,u)),s=sz*(0.5+0.5*smooth(0,0.18,u));
    ctx.save();ctx.globalAlpha=a;
    if(o.emoji){ctx.font=`${Math.round(s*2.2)}px serif`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(o.emoji[i%o.emoji.length],x,y);ctx.textBaseline='alphabetic';}
    else{glow(ctx,x,y,s*2.4,o.col||'#ff4d6d',0.35);ctx.fillStyle=o.col||'#ff4d6d';heart(ctx,x,y,s);ctx.fill();}
    ctx.restore();}
}
function aug_star(ctx,x,y,r){ctx.beginPath();for(let k=0;k<10;k++){const a=-Math.PI/2+k*Math.PI/5,rr=k%2?r*0.45:r;ctx.lineTo(x+Math.cos(a)*rr,y+Math.sin(a)*rr);}ctx.closePath();ctx.fill();}
/* a Pakistani flag on a pole at (x,y) = top of the pole, flying to the right, the free edge waving */
function aug_flag(ctx,x,y,w,h,lt,ph,pole){
  ctx.fillStyle='#8c9099';ctx.fillRect(x-1.5,y-4,3,h+(pole||50));ctx.fillStyle='#d9b85a';circle(ctx,x,y-6,3);ctx.fill();
  const wave=u=>Math.sin(u*5.5-lt*5.5+ph)*h*0.085*u,N=10;
  ctx.beginPath();ctx.moveTo(x,y);for(let i=1;i<=N;i++){const u=i/N;ctx.lineTo(x+u*w,y+wave(u));}
  for(let i=N;i>=0;i--){const u=i/N;ctx.lineTo(x+u*w,y+h+wave(u));}ctx.closePath();
  ctx.fillStyle='#117a3e';ctx.fill();
  ctx.save();ctx.clip();
  ctx.fillStyle='#f3f6f0';ctx.fillRect(x,y-h,w*0.25,h*3);
  const cx=x+w*0.62,cy=y+h/2+wave(0.62);ctx.fillStyle='#f3f6f0';circle(ctx,cx,cy,h*0.27);ctx.fill();ctx.fillStyle='#117a3e';circle(ctx,cx+h*0.1,cy-h*0.06,h*0.23);ctx.fill();
  ctx.fillStyle='#f3f6f0';aug_star(ctx,cx+h*0.2,cy-h*0.17,h*0.09);
  ctx.fillStyle='rgba(0,0,0,.18)';for(let i=0;i<N;i++){const u=i/N;if(Math.cos(u*5.5-lt*5.5+ph)>0.3)ctx.fillRect(x+u*w,y-h,w/N+1,h*3);}
  ctx.restore();
}
/* a string of green-and-white pennants sagging between two points */
function aug_bunting(ctx,x0,y0,x1,y1,lt,n,ph){
  const mx=(x0+x1)/2,my=(y0+y1)/2+46;
  ctx.strokeStyle='rgba(230,235,230,.45)';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(x0,y0);ctx.quadraticCurveTo(mx,my,x1,y1);ctx.stroke();
  for(let k=0;k<n;k++){const u=(k+0.5)/n,x=(1-u)*(1-u)*x0+2*(1-u)*u*mx+u*u*x1,y=(1-u)*(1-u)*y0+2*(1-u)*u*my+u*u*y1,sw=Math.sin(lt*2.2+ph+k*0.7)*3;
    ctx.fillStyle=k%2?'#f3f6f0':'#1a9a52';ctx.beginPath();ctx.moveTo(x-6,y);ctx.lineTo(x+6,y);ctx.lineTo(x+sw,y+15);ctx.closePath();ctx.fill();}
}
/* far-off fireworks: each burst {x,y,t0,life,R,n,col,seed} */
function aug_fireworks(ctx,lt,bursts){
  ctx.save();ctx.globalCompositeOperation='screen';
  ctx.lineCap='round';
  for(const b of bursts){const age=lt-b.t0;if(age<0||age>b.life)continue;const u=age/b.life,r=rng(b.seed);
    if(u<0.3){glow(ctx,b.x,b.y,b.R*0.7*(1-u*2.5),b.col,0.7*(1-u*3.3));ctx.fillStyle=hexA('#ffffff',0.9*(1-u*3.3));circle(ctx,b.x,b.y,4*(1-u*3));ctx.fill();}
    for(let k=0;k<b.n;k++){const a=k/b.n*TAU+(r()-0.5)*0.4,sp=0.65+r()*0.5,e=easeOut(u),d=b.R*sp*e,d0=b.R*sp*easeOut(Math.max(0,u-0.12)),sag=u*u*b.R*0.7,sag0=Math.max(0,u-0.12)**2*b.R*0.7;
      const x=b.x+Math.cos(a)*d,y=b.y+Math.sin(a)*d+sag,x0=b.x+Math.cos(a)*d0,y0=b.y+Math.sin(a)*d0+sag0,al=(1-u)*(0.7+0.3*Math.sin(lt*11+k*1.3));
      ctx.strokeStyle=hexA(b.col,al);ctx.lineWidth=2.2*(1-u*0.5);ctx.beginPath();ctx.moveTo(x0,y0);ctx.lineTo(x,y);ctx.stroke();
      ctx.fillStyle=hexA('#ffffff',al*0.8);circle(ctx,x,y,1.2+(1-u)*1.2);ctx.fill();}}
  ctx.restore();
}
/* a sheet of paper on a desk: a title line, grey text bars, a stamp or a signature */
function aug_paper(g,x,y,w,h,rot,title,r,o={}){
  g.save();g.translate(x,y);g.rotate(rot);
  g.shadowColor='rgba(0,0,0,.35)';g.shadowBlur=14;g.shadowOffsetY=5;g.fillStyle=o.col||'#f2ecdf';g.fillRect(-w/2,-h/2,w,h);g.shadowColor='transparent';
  g.fillStyle='#6b4a3a';g.font='700 11px "Mulish",sans-serif';g.textAlign='left';setLS(g,'1px');g.fillText(title,-w/2+16,-h/2+24);setLS(g,'0px');
  g.fillStyle='rgba(0,0,0,.12)';g.fillRect(-w/2+16,-h/2+32,w-32,1.5);
  for(let k=0;k<o.lines||8;k++){const ly=-h/2+48+k*13;if(ly>h/2-16)break;const lw=(w-32)*(0.55+r()*0.42);g.fillStyle=`rgba(40,30,30,${0.18+r()*0.14})`;g.fillRect(-w/2+16,ly,lw,4);}
  if(o.stamp){g.save();g.translate(w/2-44,h/2-40);g.rotate(-0.35);g.strokeStyle='rgba(190,40,50,.55)';g.lineWidth=2.4;circle(g,0,0,26);g.stroke();g.fillStyle='rgba(190,40,50,.6)';g.font='700 8px "Mulish",sans-serif';g.textAlign='center';g.fillText(o.stamp,0,3);g.restore();}
  if(o.sign){g.strokeStyle='rgba(20,30,90,.7)';g.lineWidth=1.6;g.beginPath();const sx=w/2-90,sy=h/2-22;g.moveTo(sx,sy);for(let k=1;k<10;k++)g.quadraticCurveTo(sx+k*7-3,sy-14+(k%2)*18,sx+k*7,sy-2+Math.sin(k)*4);g.stroke();}
  g.restore();
}

/* ======================================================================================================
   4 August · 16:10 — the aurora he has only imagined, and the moustache
   ====================================================================================================== */
const GALAXY=[
  /* already on the screen when the phone comes up (the Norway / Greenland exchange, 16:10) */
  {at:0,   who:'me', time:'16:10',text:'Cant wait to be with you in norway'},
  {at:0,   who:'me', time:'16:10',text:'Looking at yhose green eyes'},
  {at:0,   who:'her',time:'16:10',text:'Norway?'},
  {at:0,   who:'me', time:'16:10',text:'Yet your eyes would be the most beautiful thing i’d see'},
  {at:0,   who:'me', time:'16:10',text:'Greenland'},
  {at:13.0,who:'her',time:'16:10',text:'Ohh you mean aurora?'},
  {at:14.4,who:'me', time:'16:11',text:'Yes focus on the romance'},
  {at:15.1,who:'me', time:'16:11',text:'Not my grammer and vocab'},
  {at:16.7,who:'her',time:'16:11',text:'InshaAllah'},
  {at:17.3,who:'her',time:'16:11',text:'🥹'},
  {at:19.2,who:'me', time:'16:15',text:'No amount of words or expression could define the purity of galaxy in your soul and the thousands of milkyways galaxy emotions in your Eyes'},
  {at:21.6,who:'me', time:'16:15',text:'From the childesh bataona'},
  {at:22.4,who:'me', time:'16:15',text:'To the endangered Fabeha freaking out'},
  {at:24.4,who:'me', time:'16:17',text:'You got me in the most ugliest conditions and the stupidest yet you have always showed me love'},
  {at:25.6,who:'me', time:'16:17',text:'Thankyou!'},
  {at:26.4,who:'me', time:'16:17',text:'Yeah even with those big mooche'},
  {at:27.2,who:'me', time:'16:17',text:'Which i zabardasti rakh ke gaya tha'},
  {at:28.0,who:'me', time:'16:17',text:'To see your reaction'},
  {at:29.5,who:'her',time:'16:25',text:'Awwww💕💕💕'},
  {at:30.2,who:'her',time:'16:25',text:'Really lolll'},
  {at:31.3,who:'me', time:'16:26',text:'You hated them na?'},
  {at:32.2,who:'her',time:'16:27',text:'I dont mind them 😋'},
  {at:33.0,who:'me', time:'16:31',text:'Why do you like me'},
  {at:33.9,who:'her',time:'16:31',text:'Mujhe apki kisi bhi physical change se koi farq nhi parta'},
  {at:36.2,who:'me', time:'16:35',text:'I am gratefull for you love'},
  {at:37.3,who:'her',time:'16:35',text:'🥹🥹🥹🥹🥹🥹'},
];
scene({id:'galaxy',name:'4 August · the aurora and the moustache',when:'2026-08-04T16:10',bars:12,fin:['#000000',1.6],fout:['#000000',1.4],
  note:'the aurora, her dream trip, painted the way he imagines it; the phone comes up into it: Norway, Greenland, her eyes, the galaxy in her soul, and the moustache he kept on the grad trip just to see her reaction.',
  tag:'“Mujhe apki kisi bhi physical change se koi farq nhi parta”',
  prep(){
    const far=makeLayer({w:1600,seed:811,y0:468,amp:72,oct:3,f0:0.0035,top:'#3a5680',bottom:'#111a2c',rim:'#a9c2e0',rimA:0.35,rimW:3,haze:'rgba(18,28,52,.6)'});
    const near=makeLayer({w:1600,seed:812,y0:574,amp:26,oct:2,f0:0.005,top:'#e6edf6',bottom:'#9db1c8',patches:['#ffffff','#7d93ad'],patchN:50,pines:{n:120,size:62,sink:3,dark:'#0d241f',light:'#15382c',snow:'#e6edf6'}});
    return{far,near};},
  draw(ctx,lt,A){
    paintSky(ctx,[[0,'#03060f'],[0.55,'#0a1326'],[0.85,'#15223a']]);
    stars(ctx,lt,380,813,540,0.95);
    aurora(ctx,lt,1);
    ctx.drawImage(A.far.c,-80,0);
    ctx.drawImage(A.near.c,-60,0);
    /* the fjord: the aurora again, upside down and squeezed, under dark water */
    ctx.fillStyle=vgrad(ctx,612,720,[[0,'#0a1424'],[1,'#050911']]);ctx.fillRect(0,612,W,108);
    ctx.save();ctx.beginPath();ctx.rect(0,612,W,108);ctx.clip();ctx.translate(0,612+540*0.2);ctx.scale(1,-0.2);aurora(ctx,lt*0.8+3,0.6);ctx.restore();
    ctx.fillStyle='rgba(5,10,22,.3)';ctx.fillRect(0,612,W,108);
    ctx.strokeStyle='rgba(190,215,245,.13)';ctx.lineWidth=1;for(let k=0;k<9;k++){const y=618+k*11+Math.sin(lt*0.8+k)*1.5,x0=((k*197+lt*18)%(W+300))-300;ctx.beginPath();ctx.moveTo(x0,y);ctx.lineTo(x0+140+k*20,y);ctx.stroke();}
    ctx.fillStyle='#e2eaf3';ctx.beginPath();ctx.moveTo(0,604);for(let x=0;x<=W;x+=40)ctx.lineTo(x,604+Math.sin(x*0.02)*4);ctx.lineTo(W,616);ctx.lineTo(0,616);ctx.closePath();ctx.fill();
    motes(ctx,lt,30,814,'#dff6ff',1.2,0.3);
    /* the phone comes up into the picture */
    const up=easeOut(smooth(7.0,8.8,lt));
    if(up>0){
      ctx.fillStyle=`rgba(2,4,12,${0.28*up})`;ctx.fillRect(0,0,W,H);
      const S=drawPhoneHand(ctx,lt,{x:475,y:lerp(790,120,up),w:330,h:700});
      chatPanel(ctx,S,GALAXY,lt,{name:'Fabeha',status:'online'});
      phoneTop(ctx,S,{time:lt<14.4?'16:10':lt<19.2?'16:11':lt<24.4?'16:15':lt<29.5?'16:17':lt<31.3?'16:25':lt<32.2?'16:26':lt<33?'16:27':lt<36.2?'16:31':'16:35'});
    }
  },
  subs:[
    [0.6,4.2,'4 August, four in the afternoon in Hyderabad. The aurora. Her dream trip.'],
    [4.6,8.4,'I had never seen one either. I only knew where I’d be looking when she did.'],
    [9.2,11.0,'Cant wait to be with you in norway','him'],
    [11.4,13.0,'Yet your eyes would be the most beautiful thing i’d see','him'],
    [13.2,14.3,'Ohh you mean aurora?','her'],
    [14.6,16.5,'Yes focus on the romance. Not my grammer and vocab','him'],
    [16.9,18.6,'InshaAllah 🥹','her'],
    [19.4,24.0,'No amount of words or expression could define the purity of galaxy in your soul and the thousands of milkyways galaxy emotions in your Eyes','him'],
    [24.4,26.2,'And then the moustache. January, the grad trip, the big one.'],
    [26.6,29.2,'Yeah even with those big mooche. Which i zabardasti rakh ke gaya tha. To see your reaction','him'],
    [29.6,31.0,'Awwww💕💕💕 Really lolll','her'],
    [31.4,33.6,'I asked if she had hated it. Then why she liked me at all.'],
    [34.0,36.0,'Mujhe apki kisi bhi physical change se koi farq nhi parta','her'],
    [36.4,38.2,'I am gratefull for you love','him'],
  ],
  score({hit,bars,melody,THEME_B,THEME_B_CH}){
    bars(0,4,['Em','Cmaj7','G','Dsus'],{padVel:0.45});
    bars(4,8,THEME_B_CH,{padVel:0.42});
    [[0.5,88],[2.2,91],[4.1,86],[6.3,93],[8.0,88],[13.2,91],[19.6,95],[21.0,93],[24.8,91],[34.1,98],[34.9,95],[36.6,93]].forEach(([t,m])=>hit(t,'chime',{midi:m,vel:0.4}));
    for(let b=4;b<12;b++)melody(b,b-4,'box',0,b<8?0.32:0.26,THEME_B);
    for(const m of GALAXY)if(m.at>0)hit(m.at,'tick',{hi:m.who==='her'});
  },
  amb(lt){return{wind:lt<8?0.28:0.1,room:lt<7?0:0.2};},
});

/* ======================================================================================================
   5 August · 17:28 — "I just got the call amd igot the job"
   ====================================================================================================== */
const JOB=[
  {at:12.6,who:'her',time:'17:28',text:'I just got the call amd igot the job'},
  {at:13.8,who:'her',time:'17:28',text:'It’s relatedto risk management'},
  {at:14.6,who:'her',time:'17:28',text:'Jubilee life insuramce mein'},
  {at:16.4,who:'me', time:'17:29',text:'MashAllahhhhh'},
  {at:17.0,who:'me', time:'17:29',text:'Mubarakkkkkkkk'},
  {at:18.0,who:'me', time:'17:29',text:'❤️'},
  {at:19.0,who:'me', time:'17:29',text:'❤️'},
  {at:20.0,who:'me', time:'17:29',text:'❤️'},
  {at:21.0,who:'me', time:'17:29',text:'❤️'},
  {at:22.2,who:'me', time:'17:29',text:'babe thats soo good news so happy for you uuuuuuuuuuuuuuuuuu'},
  {at:23.6,who:'her',time:'17:29',text:'JazaKAllahhh khairr 💕💕💕💕'},
  {at:25.4,who:'me', time:'17:32',text:'haaye job girlyy'},
  {at:26.0,who:'me', time:'17:32',text:'corporate girlyyy'},
  {at:27.2,who:'her',time:'17:32',text:'It will start end of aug wede'},
  {at:28.6,who:'me', time:'17:33',text:'ageye jaake mein job dooga apko'},
  {at:30.0,who:'her',time:'17:34',text:'Ill rather work w you lol'},
  {at:31.2,who:'me', time:'17:34',text:'❤️'},
];
scene({id:'job',name:'5 August · the job',when:'2026-08-05T17:28',bars:10,fin:['#000000',1.2],fout:['#000000',1.2],
  note:'her side first, as he imagines it: a Karachi afternoon room, the phone ringing on the table; then his: the message, four red hearts a second apart, job girlyy, corporate girlyyy.',
  tag:'“I just got the call amd igot the job” · “Ill rather work w you lol”',
  prep(){
    const r=rng(821),bg=mk(W,H),g=bg.getContext('2d');
    g.fillStyle=vgrad(g,0,H,[[0,'#f3e6d3'],[1,'#d8c4aa']]);g.fillRect(0,0,W,H);
    g.fillStyle='#fff4de';g.fillRect(760,70,390,380);g.fillStyle='#ffe2a6';g.fillRect(776,86,358,348);
    g.fillStyle='rgba(255,255,255,.35)';g.beginPath();g.moveTo(776,86);g.lineTo(1000,86);g.lineTo(776,300);g.closePath();g.fill();
    g.fillStyle='#f7eddc';g.fillRect(951,86,8,348);g.fillRect(776,256,358,8);
    g.fillStyle='rgba(222,160,150,.78)';g.beginPath();g.moveTo(748,60);g.lineTo(912,60);g.lineTo(896,460);g.lineTo(748,460);g.closePath();g.fill();
    for(let k=0;k<8;k++){g.fillStyle=`rgba(255,255,255,${k%2?0.14:0.04})`;g.fillRect(752+k*19,64,11,392);}
    g.fillStyle='#b9a07f';g.fillRect(748,52,170,8);
    const sun=g.createRadialGradient(960,250,0,960,250,560);sun.addColorStop(0,'rgba(255,226,160,.7)');sun.addColorStop(1,'rgba(255,226,160,0)');g.fillStyle=sun;g.fillRect(0,0,W,H);
    g.fillStyle='#a67b55';g.fillRect(80,214,300,12);g.fillStyle='rgba(0,0,0,.12)';g.fillRect(80,226,300,6);
    const cols=['#5a7a9c','#c96b5a','#7c9c6e','#e3b55c','#8a6fa5','#4d5e73'];for(let k=0;k<8;k++){g.fillStyle=cols[k%6];g.fillRect(92+k*34,152+(k%3)*6,28,62-(k%3)*6);}
    g.fillStyle='#e9e2d4';g.fillRect(300,150,70,60);g.fillStyle='#c96b5a';g.beginPath();g.arc(335,180,18,0,TAU);g.fill();g.fillStyle='#e9e2d4';g.beginPath();g.arc(335,180,11,0,TAU);g.fill();
    const vg=g.createRadialGradient(560,330,200,560,330,900);vg.addColorStop(0,'rgba(90,60,40,0)');vg.addColorStop(1,'rgba(90,60,40,.22)');g.fillStyle=vg;g.fillRect(0,0,W,H);
    const tbl=mk(W,H),t=tbl.getContext('2d');
    t.fillStyle='#86553a';t.beginPath();t.moveTo(0,560);t.quadraticCurveTo(640,536,W,560);t.lineTo(W,720);t.lineTo(0,720);t.closePath();t.fill();
    t.fillStyle='#a06b47';t.beginPath();t.moveTo(0,560);t.quadraticCurveTo(640,536,W,560);t.lineTo(W,590);t.quadraticCurveTo(640,566,0,590);t.closePath();t.fill();
    t.fillStyle='rgba(255,255,255,.07)';for(let i=0;i<16;i++){ell(t,r()*W,600+r()*110,60+r()*90,3);t.fill();}
    const tl=t.createRadialGradient(760,600,0,760,600,460);tl.addColorStop(0,'rgba(255,220,160,.4)');tl.addColorStop(1,'rgba(255,220,160,0)');t.fillStyle=tl;t.fillRect(0,540,W,180);
    t.fillStyle='#f4efe6';rrect(t,880,598,42,48,7);t.fill();t.fillStyle='#a56a3a';ell(t,901,602,18,6);t.fill();t.strokeStyle='#f4efe6';t.lineWidth=5;t.beginPath();t.arc(926,622,11,-Math.PI/2,Math.PI/2);t.stroke();
    t.fillStyle='#2f4b6e';rrect(t,250,622,160,38,4);t.fill();t.fillStyle='#ece5d6';rrect(t,258,616,160,38,4);t.fill();t.strokeStyle='rgba(0,0,0,.14)';t.lineWidth=1;for(let y=626;y<650;y+=7){t.beginPath();t.moveTo(268,y);t.lineTo(406,y);t.stroke();}
    t.fillStyle='#c98a4a';rrect(t,1060,548,64,72,8);t.fill();t.fillStyle='#3f8a4f';for(let k=0;k<7;k++){ell(t,1092+Math.cos(k*0.95)*30,520-Math.abs(Math.sin(k*1.3))*48,24,9,k*0.7);t.fill();}
    /* his room at the same hour: the morning room gone gold, the window blazing, a pool of late sun on the floor */
    const his=mk(W,H),h=his.getContext('2d');h.drawImage(rooms().morning,0,0);
    h.fillStyle=hgrad(h,0,W,[[0,'rgba(120,70,50,.45)'],[0.55,'rgba(255,150,70,.18)'],[1,'rgba(255,170,90,.1)']]);h.fillRect(0,0,W,H);
    h.fillStyle=vgrad(h,74,376,[[0,'#ffd27a'],[0.5,'#ffb860'],[1,'#f0904a']]);h.fillRect(834,74,372,302);h.fillStyle='#f6e2c0';h.fillRect(1010,74,8,302);h.fillRect(834,220,372,8);
    const wl=h.createRadialGradient(1020,230,0,1020,230,620);wl.addColorStop(0,'rgba(255,200,120,.55)');wl.addColorStop(1,'rgba(255,200,120,0)');h.fillStyle=wl;h.fillRect(0,0,W,H);
    h.fillStyle='rgba(255,190,110,.22)';h.beginPath();h.moveTo(834,376);h.lineTo(1206,376);h.lineTo(1100,720);h.lineTo(520,720);h.closePath();h.fill();
    const hv=h.createRadialGradient(640,360,300,640,360,900);hv.addColorStop(0,'rgba(40,20,20,0)');hv.addColorStop(1,'rgba(40,20,20,.4)');h.fillStyle=hv;h.fillRect(0,0,W,H);
    return{bg,tbl,his};},
  draw(ctx,lt,A){
    if(lt<12){
      /* her side — a Karachi afternoon room, imagined */
      ctx.drawImage(A.bg,0,0);
      const ringing=lt>0.8&&lt<4.4,pick=smooth(4.4,5.2,lt),listen=smooth(5.4,9,lt),over=smooth(9.6,10.4,lt);
      drawFabeha(ctx,430,350,1.2,{t:lt,outfit:'home',hair:'down',pose:'bust',arms:pick>0.5?'phone':'lap',
        look:ringing?0.65:lerp(0.2,0,over),smile:lt<4.4?0.4:lerp(0.45,1,listen),eyes:lt>9.2&&lt<10.6?'happy':undefined,brow:0.3*smooth(5.2,6.5,lt)*(1-over),
        blush:0.35+0.45*listen,tilt:0.07*smooth(5.2,6,lt)*Math.sin(lt*0.9+1)+0.14*over,wind:0.05,len:250});
      ctx.drawImage(A.tbl,0,0);
      if(pick<1){
        const buzz=ringing?Math.sin(lt*85)*1.6:0;
        ctx.save();ctx.globalAlpha=1-pick;ctx.translate(602+buzz,596);ctx.rotate(0.22);
        ctx.shadowColor='rgba(0,0,0,.35)';ctx.shadowBlur=10;ctx.shadowOffsetY=3;ctx.fillStyle='#101014';rrect(ctx,-30,-60,60,120,11);ctx.fill();ctx.shadowColor='transparent';
        ctx.fillStyle=ringing?'#101c30':'#000';rrect(ctx,-26,-56,52,112,8);ctx.fill();
        if(ringing){ctx.fillStyle='#fff';ctx.font='600 8px "Mulish",sans-serif';ctx.textAlign='center';ctx.fillText('Incoming call',0,-32);ctx.fillStyle='rgba(255,255,255,.6)';ctx.font='500 7px "Mulish",sans-serif';ctx.fillText('Karachi',0,-20);
          ctx.fillStyle='#25d366';circle(ctx,13,38,8);ctx.fill();ctx.fillStyle='#ff4d4d';circle(ctx,-13,38,8);ctx.fill();}
        ctx.restore();
        if(ringing)glow(ctx,602,596,110,'#9fd3f2',0.3+0.15*Math.sin(lt*14));
      }
      ctx.fillStyle='rgba(255,230,180,.1)';ctx.fillRect(0,0,W,H);
      return;
    }
    /* his side — Hyderabad, the same hour, the room gone orange */
    ctx.drawImage(A.his,0,0);
    motes(ctx,lt,36,822,'#ffd9a0',1.4,0.4);
    const S=drawPhoneHand(ctx,lt,{x:475,y:120,w:330,h:700});
    chatPanel(ctx,S,JOB,lt,{name:'Fabeha',status:'online'});
    phoneTop(ctx,S,{time:lt<16.4?'17:28':lt<25.4?'17:29':lt<28.6?'17:32':lt<30?'17:33':'17:34'});
    aug_floaters(ctx,lt,[18.0,19.0,20.0,21.0],S.x+S.w-56,578,{life:4.6,speed:112,size:15});
    aug_floaters(ctx,lt,[31.3],S.x+S.w-56,578,{life:3.4,speed:100,size:15});
  },
  subs:[
    [0.6,4.2,'5 August. Five interviews so far, nothing yet. At twenty-eight past five her phone rang.'],
    [4.8,8.2,'I wasn’t there. I like to imagine it like this.'],
    [12.8,15.6,'I just got the call amd igot the job','her'],
    [16.0,17.8,'MashAllahhhhh Mubarakkkkkkkk','him'],
    [18.2,21.8,'Four hearts, one a second. I counted them later: 17:29:13, 14, 15, 16.'],
    [22.4,23.5,'babe thats soo good news so happy for you uuuuuuuuuuuuuuuuuu','him'],
    [23.8,25.2,'JazaKAllahhh khairr 💕💕💕💕','her'],
    [25.6,27.0,'haaye job girlyy corporate girlyyy','him'],
    [27.3,28.5,'It will start end of aug wede','her'],
    [28.8,29.9,'ageye jaake mein job dooga apko','him'],
    [30.2,31.6,'Ill rather work w you lol','her'],
    [31.9,32.8,'Jubilee Life. Risk management. End of August.'],
  ],
  score({hit,bars,CH}){
    bars(0,4,['G','Cadd9'],{padVel:0.3});
    [1.0,2.3,3.6].forEach(t=>hit(t,'ring',{}));
    hit(11.4,'tick',{hi:true});
    bars(4,6,['G','Cadd9','Em7','D'],{padVel:0.4,bass:true,bassVel:0.34});
    aug_boxArp(hit,CH,4,6,['G','Cadd9','Em7','D'],0.42);
    [18,19,20,21].forEach((t,k)=>hit(t,'chime',{midi:[79,83,86,91][k],vel:0.5}));
    for(const m of JOB)hit(m.at,'tick',{hi:m.who==='her'});
  },
  amb(lt){return{room:0.24};},
});

/* ======================================================================================================
   9 August · 01:04 — "degree eik bahana tha"
   ====================================================================================================== */
const BAHANA=[
  {at:1.2, who:'me', time:'01:04',text:'mere liye uth nahi sakti ho'},
  {at:2.4, who:'me', time:'01:04',text:'mein 6 ghante'},
  {at:3.0, who:'me', time:'01:04',text:'travel krke ata ho'},
  {at:5.2, who:'her',time:'01:05',text:'Apnu degreee kay liye'},
  {at:6.6, who:'me', time:'01:05',text:'excusme me'},
  {at:7.2, who:'me', time:'01:05',text:'the first dte'},
  {at:7.8, who:'me', time:'01:05',text:'uske baad har dinn ana for you'},
  {at:8.8, who:'her',time:'01:05',text:'Tgat was the only time'},
  {at:10.2,who:'me', time:'01:05',text:'degree eik bahana tha'},
  {at:11.4,who:'me', time:'01:05',text:'asal apse milne ata tha'},
  {at:13.0,who:'her',time:'01:05',text:'😭😭😭😭😭😭😭😭😭😭😭😭😭😭 lo bhai'},
  {at:16.6,who:'her',time:'01:06',text:'I thoufht ap degree ki wajah se arahe ho'},
  {at:18.6,who:'me', time:'01:06',text:'degree bhi tha'},
  {at:19.2,who:'me', time:'01:06',text:'but uske baad phase 6 se har din was for you'},
  {at:20.6,who:'her',time:'01:08',text:'😊😊😊'},
  {at:21.0,who:'her',time:'01:08',text:'I didnt kniw thay'},
  {at:21.6,who:'her',time:'01:08',text:'😭😭'},
  {at:22.8,who:'her',time:'01:09',text:'Arayyyyy'},
  {at:24.0,who:'me', time:'01:09',text:'Wasnt it clear'},
  {at:25.2,who:'her',time:'01:09',text:'Nhiii'},
  {at:26.6,who:'me', time:'01:09',text:'Har chez batani parti'},
  {at:27.8,who:'her',time:'01:09',text:'😭😭😭😭😭😭😭'},
];
scene({id:'bahana',name:'9 August · bahana',when:'2026-08-09T01:04',bars:10,fin:['#000000',1.2],fout:['#000000',1.4],
  note:'one in the morning, the IBA paperwork under the lamp, the phone: the transcript, the course, the examination department — every errand this year was an excuse to be in Karachi.',
  tag:'“degree eik bahana tha” · “I didnt kniw thay 😭😭”',
  prep(){
    const r=rng(831),c=mk(W,H),g=c.getContext('2d');
    g.drawImage(rooms().night,0,0);
    g.fillStyle='rgba(0,0,10,.2)';g.fillRect(0,0,W,H);
    g.fillStyle='#35261c';g.beginPath();g.moveTo(0,478);g.lineTo(W,478);g.lineTo(W,720);g.lineTo(0,720);g.closePath();g.fill();
    g.fillStyle='#46342a';g.fillRect(0,478,W,12);
    g.fillStyle='rgba(255,255,255,.05)';for(let i=0;i<18;i++){ell(g,r()*W,500+r()*220,60+r()*120,3);g.fill();}
    g.fillStyle='#2a2230';g.fillRect(116,290,12,190);g.fillStyle='#d8b07a';g.beginPath();g.moveTo(52,296);g.lineTo(192,296);g.lineTo(164,228);g.lineTo(80,228);g.closePath();g.fill();g.fillStyle='rgba(255,230,180,.5)';g.fillRect(60,292,124,6);
    const pool=g.createRadialGradient(122,470,0,122,470,470);pool.addColorStop(0,'rgba(255,196,120,.55)');pool.addColorStop(0.5,'rgba(255,196,120,.2)');pool.addColorStop(1,'rgba(255,196,120,0)');g.fillStyle=pool;g.fillRect(0,200,W,520);
    aug_paper(g,330,590,250,170,-0.1,'EXAMINATION DEPARTMENT',r,{lines:7,stamp:'RECEIVED'});
    aug_paper(g,250,560,230,160,0.16,'TRANSCRIPT',r,{lines:8,col:'#eee6d4'});
    aug_paper(g,410,650,250,120,-0.03,'PROGRAM OFFICE',r,{lines:4,sign:true});
    g.save();g.translate(1010,628);g.rotate(0.12);g.fillStyle='#e9dcc3';g.fillRect(-70,-42,140,84);g.strokeStyle='rgba(0,0,0,.15)';g.lineWidth=1.5;g.beginPath();g.moveTo(-70,-42);g.lineTo(0,8);g.lineTo(70,-42);g.stroke();g.fillStyle='#c0392b';g.fillRect(-60,20,40,10);g.restore();
    g.fillStyle='#f4efe6';rrect(g,1120,540,46,54,8);g.fill();g.fillStyle='#8a5a3a';ell(g,1143,544,19,7);g.fill();g.strokeStyle='#f4efe6';g.lineWidth=6;g.beginPath();g.arc(1170,566,12,-Math.PI/2,Math.PI/2);g.stroke();
    g.fillStyle='#2b3a6b';g.fillRect(1030,500,56,10);g.fillStyle='#1d2a4e';g.fillRect(1030,496,56,4);
    return{c};},
  draw(ctx,lt,A){
    ctx.drawImage(A.c,0,0);
    const ch=0.5+0.5*Math.sin(lt*0.7);ctx.fillStyle=`rgba(255,200,130,${0.03+0.02*ch})`;ctx.fillRect(0,0,W,H);
    motes(ctx,lt,18,832,'#ffe2b0',1.1,0.25);
    const S=drawPhoneHand(ctx,lt,{x:475,y:120,w:330,h:700});
    chatPanel(ctx,S,BAHANA,lt,{name:'Fabeha',status:'online'});
    phoneTop(ctx,S,{time:lt<5.2?'01:04':lt<16.6?'01:05':lt<20.6?'01:06':lt<22.8?'01:08':'01:09'});
  },
  subs:[
    [0.6,4.6,'9 August, past one in the morning. The degree paperwork on the desk, the phone in my hand, and a sulk.'],
    [5.4,6.6,'Apnu degreee kay liye','her'],
    [6.9,8.6,'excusme me. the first dte. uske baad har dinn ana for you','him'],
    [9.0,9.9,'Tgat was the only time','her'],
    [10.4,12.8,'degree eik bahana tha. asal apse milne ata tha','him'],
    [16.8,18.4,'I thoufht ap degree ki wajah se arahe ho','her'],
    [18.8,20.4,'degree bhi tha. but uske baad phase 6 se har din was for you','him'],
    [21.2,22.6,'I didnt kniw thay 😭😭','her'],
    [23.0,23.9,'Arayyyyy','her'],
    [24.2,25.1,'Wasnt it clear','him'],
    [25.4,26.3,'Nhiii','her'],
    [26.8,28.2,'Har chez batani parti','him'],
  ],
  score({hit,bars,melody,THEME_B}){
    bars(0,10,['Em','Cmaj7','G','Dsus'],{padVel:0.42});
    for(let b=3;b<7;b++)melody(b,b-3,'piano',0,0.4,THEME_B);
    hit(10.2,'chime',{midi:76,vel:0.32});hit(11.4,'chime',{midi:79,vel:0.28});
    for(const m of BAHANA)hit(m.at,'tick',{hi:m.who==='her'});
  },
  amb(lt){return{room:0.26,hum:0.08};},
});

/* ======================================================================================================
   13 → 14 August · midnight — "Happy Independence Day My Green Flag"
   ====================================================================================================== */
const AZADI=[
  {at:3.2, who:'me', time:'23:57',text:'Happy Independence Day My Green Flag 💚🎀💝!!! Here are some flowers for you 🌹💐🌺'},
  {at:7.2, who:'her',time:'00:14',text:'Happy Independence day 🥳🥳🥳💕'},
  {at:11.6,who:'me', time:'00:52',text:'💚💚💚😋😋 thankyou my greenflag ab apko apke ghar se Azad krwana hai'},
  {at:16.2,who:'her',time:'01:23',text:'Konsi azadi 😭😭😭😭 azad hu mein😎'},
];
const AZADI_BURSTS=[[0.9,120,170,'#7ef5a5',72],[3.6,1120,150,'#ffffff',66],[6.0,300,120,'#ffe08a',58],[8.4,1000,210,'#7ef5a5',74],[10.6,180,240,'#ffffff',52],[12.8,1180,110,'#ffe08a',70],[15.0,260,160,'#7ef5a5',60],[16.6,1060,140,'#ffffff',84],[17.4,140,120,'#7ef5a5',78],[18.6,1150,230,'#ffe08a',66],[20.2,320,110,'#ffffff',72],[21.8,980,170,'#7ef5a5',60],[23.4,200,190,'#ffe08a',64],[24.8,1110,120,'#ffffff',58]]
  .map(([t0,x,y,col,R],i)=>({t0,x,y,col,R:R*1.25,life:2.6,n:34,seed:851+i,midi:[86,88,91,93,95][i%5]}));
scene({id:'azadi',name:'14 August · azadi',when:'2026-08-13T23:57',bars:8,fin:['#000000',1.2],fout:['#000000',1.4],
  note:'three minutes to midnight on a Hyderabad roof, flags and bunting, fireworks far off; the green-flag message, her reply at 00:14, and at 01:23 the last word.',
  tag:'“Konsi azadi 😭😭😭😭 azad hu mein😎”',
  prep(){
    const r=rng(841),c=mk(W,H),g=c.getContext('2d');
    g.fillStyle=vgrad(g,0,H,[[0,'#04070f'],[0.6,'#0b1222'],[1,'#1c2236']]);g.fillRect(0,0,W,H);
    const cg=g.createRadialGradient(640,560,0,640,560,720);cg.addColorStop(0,'rgba(255,200,120,.24)');cg.addColorStop(1,'rgba(255,200,120,0)');g.fillStyle=cg;g.fillRect(0,0,W,H);
    g.fillStyle='#151b2d';for(let x=-20;x<W;){const w=40+r()*90,h=50+r()*130;g.fillRect(x,520-h,w,h+200);x+=w+2+r()*18;}
    g.fillStyle='#ffd98a';for(let i=0;i<140;i++){g.globalAlpha=0.25+r()*0.6;g.fillRect(r()*W,400+r()*115,3,4);}g.globalAlpha=1;
    const roofs=[];g.fillStyle='#07090f';
    for(let x=-30;x<W;){const w=120+r()*200,h=36+r()*74;g.fillRect(x,560-h,w,h+160);roofs.push({x,w,y:560-h});x+=w+6+r()*30;}
    for(const rf of roofs){g.fillRect(rf.x,rf.y-6,rf.w,6);for(let px=rf.x;px<rf.x+rf.w-10;px+=22)g.fillRect(px,rf.y-12,12,6);
      if(r()<0.6){const tx=rf.x+20+r()*(rf.w-60);g.fillRect(tx,rf.y-28,34,28);g.beginPath();g.arc(tx+17,rf.y-28,17,Math.PI,0);g.fill();}}
    g.fillRect(1040,330,22,240);g.beginPath();g.moveTo(1030,330);g.lineTo(1051,294);g.lineTo(1072,330);g.closePath();g.fill();g.fillStyle='#ffe29a';circle(g,1051,300,2.5);g.fill();
    g.fillStyle='#ffd98a';for(let i=0;i<30;i++){g.globalAlpha=0.3+r()*0.5;const rf=roofs[Math.floor(r()*roofs.length)];g.fillRect(rf.x+10+r()*(rf.w-20),rf.y+30+r()*90,5,7);}g.globalAlpha=1;
    const roofAt=x=>{const rf=roofs.find(f=>x>=f.x&&x<f.x+f.w);return rf?rf.y:560;};
    const flags=[90,250,398,874,1010,1190].map((x,i)=>({x,y:roofAt(x)-92-(i%2)*16,w:52+(i%3)*8,h:33+(i%3)*5,ph:i*1.7}));
    return{c,flags,bursts:AZADI_BURSTS};},
  draw(ctx,lt,A){
    ctx.drawImage(A.c,0,0);
    stars(ctx,lt,220,842,330,0.7);
    aug_fireworks(ctx,lt,A.bursts);
    aug_bunting(ctx,-30,286,430,336,lt,16,0);aug_bunting(ctx,850,330,1310,282,lt,16,2);aug_bunting(ctx,260,214,1020,222,lt,24,4);
    for(const f of A.flags)aug_flag(ctx,f.x,f.y,f.w,f.h,lt,f.ph,88);
    const S=drawPhoneHand(ctx,lt,{x:475,y:120,w:330,h:700});
    chatPanel(ctx,S,AZADI,lt,{name:'Fabeha',status:lt<7.2?'last seen today at 22:08':'online'});
    phoneTop(ctx,S,{time:lt<7.2?'23:57':lt<11.6?'00:14':lt<16.2?'00:52':'01:23'});
    aug_floaters(ctx,lt,[3.4,3.9,4.4,4.9,5.4,5.9],S.x+S.w-60,582,{life:4.4,speed:100,size:14,emoji:['🌹','💐','🌺']});
    aug_floaters(ctx,lt,[11.8,12.2,12.6],S.x+S.w-60,582,{life:3.6,speed:100,size:13,emoji:['💚']});
    const big=smooth(16.2,16.5,lt)*(1-smooth(17.2,18.6,lt));if(big>0){ctx.fillStyle=`rgba(126,245,165,${0.1*big})`;ctx.fillRect(0,0,W,H);}
  },
  subs:[
    [0.6,4.0,'13 August, three minutes to midnight. Flags on every roof in Hyderabad, fireworks somewhere far off.'],
    [4.2,7.0,'Happy Independence Day My Green Flag 💚🎀💝!!! Here are some flowers for you 🌹💐🌺','him'],
    [7.4,9.0,'Happy Independence day 🥳🥳🥳💕','her'],
    [9.4,11.4,'Fourteen minutes past midnight. Just before one, I pushed my luck.'],
    [11.8,14.4,'💚💚💚😋😋 thankyou my greenflag ab apko apke ghar se Azad krwana hai','him'],
    [14.8,16.0,'Half an hour of silence.'],
    [16.6,19.0,'Konsi azadi 😭😭😭😭 azad hu mein😎','her'],
    [19.6,23.6,'Already azad, she said, sunglasses and all. I had nothing to say to that. She was right.'],
  ],
  score({hit,bars,melody,THEME}){
    bars(0,8,['G','Em','C','D'],{padVel:0.4,bass:true,bassVel:0.3});
    for(let b=2;b<6;b++)melody(b,b-2,'box',0,0.34,THEME);
    for(const b of AZADI_BURSTS)hit(b.t0+0.12,'chime',{midi:b.midi,vel:0.26});
    hit(16.4,'chime',{midi:98,vel:0.4});
    for(const m of AZADI)hit(m.at,'tick',{hi:m.who==='her'});
  },
  amb(lt){return{wind:0.16,room:0.06};},
});
