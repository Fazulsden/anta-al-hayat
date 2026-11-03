/* mar.js — March 2026, Ramadan in two cities: meri eid, the necklace in the gearbox, the thirtieth sehri,
   chaand raat in the rain (the night she said it), and a promise (see notes/AUTHORING.md; sources notes/bible/05-mar01-20.md and 06-mar21-31.md). */
'use strict';

/* ---------- shared helpers (mar_) ---------- */
/* rain on a pane: streaks running down the glass and a few beaded drops; call every frame, inside a clip */
function mar_rain(ctx,lt,x,y,w,h,seed,alpha){
  const r=rng(seed);ctx.save();ctx.lineCap='round';
  for(let i=0;i<64;i++){const x0=x+r()*w,sp=80+r()*150,len=12+r()*36,ph=r()*(h+len),lw=0.8+r()*1.3,a=alpha*(0.25+r()*0.45);const yy=y+((ph+lt*sp)%(h+len))-len;ctx.strokeStyle=`rgba(220,235,255,${a})`;ctx.lineWidth=lw;ctx.beginPath();ctx.moveTo(x0,yy);ctx.lineTo(x0-2,yy+len);ctx.stroke();}
  for(let i=0;i<54;i++){const bx=x+r()*w,by=y+r()*h,s=1.2+r()*2.4,ph=r()*TAU,a=alpha*(0.35+0.4*Math.sin(lt*0.7+ph));ctx.fillStyle=`rgba(230,240,255,${a})`;ell(ctx,bx,by,s,s*1.4);ctx.fill();ctx.fillStyle=`rgba(255,255,255,${a*0.8})`;circle(ctx,bx-s*0.3,by-s*0.4,s*0.35);ctx.fill();}
  ctx.restore();
}
/* a string of fairy lights sagging between x0 and x1 at height y */
function mar_fairy(ctx,lt,x0,x1,y,sag,n,seed,bright=1){
  const r=rng(seed);ctx.save();
  ctx.strokeStyle='rgba(30,30,40,.8)';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(x0,y);ctx.quadraticCurveTo((x0+x1)/2,y+sag*2,x1,y);ctx.stroke();
  const cols=['#ffd27a','#fff1c8','#ffb08a','#ffe6a0'];
  for(let i=0;i<n;i++){const u=(i+0.5)/n,px=lerp(x0,x1,u),py=y+4*sag*u*(1-u)+7,col=cols[i%cols.length],tw=(0.55+0.45*Math.sin(lt*2.1+i*1.7+r()*6))*bright;
    ctx.fillStyle='rgba(30,30,40,.9)';ctx.fillRect(px-1,py-8,2,6);
    ctx.save();ctx.globalCompositeOperation='screen';glow(ctx,px,py,18,col,0.55*tw);ctx.restore();
    ctx.fillStyle=col;ctx.globalAlpha=0.5+0.5*tw;circle(ctx,px,py,2.8);ctx.fill();ctx.globalAlpha=1;}
  ctx.restore();
}
/* steam rising from (x,y) */
function mar_steam(ctx,lt,x,y,n,seed,spread,alpha){
  const r=rng(seed);ctx.save();ctx.globalCompositeOperation='screen';
  for(let i=0;i<n;i++){const ph=r(),dx=(r()-0.5)*spread,wob=r()*TAU,life=2.6+r()*2.2,rise=110+r()*70;const u=((lt*0.55+ph*life)%life)/life;
    const px=x+dx+Math.sin(lt*1.1+wob+u*4)*(6+u*22),py=y-u*rise,s=10+u*30,a=alpha*(1-u)*Math.min(1,u*5);
    const g=ctx.createRadialGradient(px,py,0,px,py,s);g.addColorStop(0,`rgba(255,250,240,${a})`);g.addColorStop(1,'rgba(255,250,240,0)');ctx.fillStyle=g;ctx.fillRect(px-s,py-s,s*2,s*2);}
  ctx.restore();
}
/* a thin crescent (the open side to the right before tilt) */
function mar_moon(ctx,x,y,R,a,tilt=0){
  if(a<=0)return;
  const d=R*0.22,R2=R*0.94,ix=(d*d+R*R-R2*R2)/(2*d),iy=Math.sqrt(Math.max(0,R*R-ix*ix));
  ctx.save();ctx.globalAlpha*=a;ctx.translate(x,y);ctx.rotate(tilt);
  ctx.save();ctx.globalCompositeOperation='screen';glow(ctx,0,0,R*4,'#ffe9b0',0.32);ctx.restore();
  ctx.fillStyle='#fff6d6';ctx.beginPath();ctx.arc(0,0,R,Math.atan2(-iy,ix),Math.atan2(iy,ix),true);ctx.arc(d,0,R2,Math.atan2(iy,ix-d),Math.atan2(-iy,ix-d),false);ctx.closePath();ctx.fill();
  ctx.restore();
}
/* a WhatsApp voice-call screen inside the phone rect S */
function mar_callScreen(ctx,S,lt,o={}){
  ctx.save();rrect(ctx,S.x,S.y,S.w,S.h,S.r);ctx.clip();
  ctx.fillStyle=vgrad(ctx,S.y,S.y+S.h,[[0,'#17222c'],[1,'#0b141a']]);ctx.fillRect(S.x,S.y,S.w,S.h);
  const cx=S.x+S.w/2,ay=S.y+S.h*0.5;
  ctx.textAlign='center';ctx.fillStyle='#e9edef';ctx.font='700 26px "Mulish",sans-serif';ctx.fillText(o.name||'Fabeha',cx,S.y+86);
  ctx.fillStyle='#aebac1';ctx.font='500 14px "Mulish",sans-serif';ctx.fillText(o.sub||'WhatsApp voice call',cx,S.y+110);
  ctx.fillStyle='#e9edef';ctx.font='300 30px "Mulish",sans-serif';ctx.fillText(o.timer||'0:00',cx,S.y+150);
  ctx.fillStyle='#d8b4a0';circle(ctx,cx,ay,46);ctx.fill();ctx.fillStyle='#2a1d22';ell(ctx,cx,ay-10,36,30);ctx.fill();ctx.fillStyle='#f3d8c4';ell(ctx,cx,ay+4,25,27);ctx.fill();ctx.fillStyle='#2a1d22';ctx.fillRect(cx-34,ay-16,16,54);ctx.fillRect(cx+18,ay-16,16,54);
  const by=S.y+S.h-120;
  for(const[dx,ico]of[[-80,'mute'],[0,'spk'],[80,'vid']]){ctx.fillStyle='rgba(255,255,255,.14)';circle(ctx,cx+dx,by,24);ctx.fill();ctx.fillStyle='#e9edef';
    if(ico==='mute'){rrect(ctx,cx+dx-5,by-12,10,16,5);ctx.fill();ctx.strokeStyle='#e9edef';ctx.lineWidth=2;ctx.beginPath();ctx.arc(cx+dx,by-2,9,0.2,Math.PI-0.2);ctx.stroke();}
    else if(ico==='spk'){ctx.beginPath();ctx.moveTo(cx+dx-10,by-5);ctx.lineTo(cx+dx-4,by-5);ctx.lineTo(cx+dx+4,by-12);ctx.lineTo(cx+dx+4,by+12);ctx.lineTo(cx+dx-4,by+5);ctx.lineTo(cx+dx-10,by+5);ctx.closePath();ctx.fill();}
    else{rrect(ctx,cx+dx-11,by-7,15,14,3);ctx.fill();ctx.beginPath();ctx.moveTo(cx+dx+5,by-2);ctx.lineTo(cx+dx+12,by-7);ctx.lineTo(cx+dx+12,by+7);ctx.lineTo(cx+dx+5,by+2);ctx.closePath();ctx.fill();}}
  ctx.fillStyle='#ea4335';circle(ctx,cx,by+66,26);ctx.fill();ctx.fillStyle='#fff';ctx.save();ctx.translate(cx,by+66);ctx.rotate(2.3);rrect(ctx,-7,-12,14,22,6);ctx.fill();ctx.restore();
  ctx.restore();
}
/* his left hand, palm down, fingers along local -y; curl 0..1 closes the fingers */
function mar_hisHand(ctx,x,y,rot,curl){
  ctx.save();ctx.translate(x,y);ctx.rotate(rot);
  ctx.fillStyle=HIS.skin;ell(ctx,0,0,36,44);ctx.fill();
  for(let k=0;k<4;k++){const fx=-27+k*18,len=(46-Math.abs(k-1.5)*7)*(1-curl*0.45);ctx.save();ctx.translate(fx,-30);ctx.rotate((k-1.5)*0.07);rrect(ctx,-7.5,-len,15,len+12,7.5);ctx.fillStyle=HIS.skin;ctx.fill();ctx.strokeStyle='rgba(90,55,35,.25)';ctx.lineWidth=1.2;ctx.stroke();ctx.fillStyle=HIS.nail;ell(ctx,0,-len+6,4.5,5.5);ctx.fill();ctx.restore();}
  ctx.fillStyle=HIS.skin;ell(ctx,38,-4,11,26,-0.45);ctx.fill();ctx.fillStyle=HIS.nail;ell(ctx,46,-24,4,5,-0.45);ctx.fill();
  ctx.fillStyle='rgba(90,55,35,.12)';ell(ctx,0,12,24,10);ctx.fill();
  ctx.restore();
}
/* the thin chain: hanging from (x,y) with a small pendant, or coiled where it lay */
function mar_chain(ctx,x,y,len,sway,t){
  ctx.save();ctx.strokeStyle='#e3b55c';ctx.lineWidth=1.8;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(x,y);let px=x,py=y;const n=14;
  for(let k=1;k<=n;k++){const u=k/n;px=x+Math.sin(t*2.6+u*2.2)*sway*u;py=y+u*len;ctx.lineTo(px,py);}ctx.stroke();
  ctx.fillStyle='rgba(255,255,255,.75)';for(let k=2;k<n;k+=3){const u=k/n;circle(ctx,x+Math.sin(t*2.6+u*2.2)*sway*u,y+u*len,1.1);ctx.fill();}
  ctx.fillStyle='#e3b55c';circle(ctx,px,py+6,6.5);ctx.fill();ctx.fillStyle='#cfe9ff';circle(ctx,px,py+6,3);ctx.fill();ctx.fillStyle='#fff';circle(ctx,px-1.2,py+4.6,1.3);ctx.fill();
  ctx.restore();
}
function mar_chainCoil(ctx,cx,cy,s,k){
  ctx.save();ctx.strokeStyle='#e3b55c';ctx.lineWidth=1.8;ctx.lineCap='round';ctx.beginPath();
  for(let i=0;i<=48;i++){const a=i/48*TAU*1.7+k,r=s*(0.6+0.4*Math.sin(i*0.7+k));const x=cx+Math.cos(a)*r,y=cy+Math.sin(a)*r*0.55;if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);}ctx.stroke();
  ctx.fillStyle='#e3b55c';circle(ctx,cx+s*0.5,cy+s*0.35,s*0.16);ctx.fill();ctx.fillStyle='#cfe9ff';circle(ctx,cx+s*0.5,cy+s*0.35,s*0.07);ctx.fill();ctx.fillStyle='#fff';circle(ctx,cx+s*0.47,cy+s*0.31,s*0.03);ctx.fill();
  ctx.restore();
}
function mar_sparkle(ctx,x,y,s,a){if(a<=0)return;ctx.save();ctx.globalAlpha*=a;ctx.strokeStyle='#fff8dc';ctx.lineWidth=1.5;for(let k=0;k<4;k++){const an=k*Math.PI/4;ctx.beginPath();ctx.moveTo(x-Math.cos(an)*s,y-Math.sin(an)*s);ctx.lineTo(x+Math.cos(an)*s,y+Math.sin(an)*s);ctx.stroke();}ctx.fillStyle='#fff';circle(ctx,x,y,2);ctx.fill();ctx.restore();}
/* a plate with two boiled eggs */
function mar_plateEggs(ctx,x,y){
  ctx.fillStyle='rgba(0,0,0,.18)';ell(ctx,x+3,y+8,84,28);ctx.fill();
  ctx.fillStyle='#d8d2c8';ell(ctx,x,y+3,82,28);ctx.fill();ctx.fillStyle='#f3efe7';ell(ctx,x,y,80,27);ctx.fill();ctx.fillStyle='#faf7f1';ell(ctx,x,y-2,70,22);ctx.fill();
  ctx.fillStyle='rgba(0,0,0,.07)';ell(ctx,x-18,y+3,16,5);ctx.fill();ell(ctx,x+22,y+5,16,5);ctx.fill();
  ctx.fillStyle='#fbf7ee';ell(ctx,x-22,y-6,18,13,-0.3);ctx.fill();ell(ctx,x+18,y-4,18,13,0.2);ctx.fill();ctx.fillStyle='rgba(255,255,255,.7)';ell(ctx,x-28,y-10,5,3,-0.3);ctx.fill();ell(ctx,x+12,y-8,5,3,0.2);ctx.fill();
}
/* Ammi's hands — only ever her hands: warm, a soft sleeve, thin bangles — carrying (or reaching for) a plate */
function mar_ammiHands(ctx,x,y,withPlate){
  const sk='#d9a98a',sl='#9fb8c9';
  const arm=(hx,hy,rot)=>{ctx.strokeStyle=sl;ctx.lineCap='round';ctx.lineWidth=52;ctx.beginPath();ctx.moveTo(hx-440,hy+130);ctx.lineTo(hx-132,hy+48);ctx.stroke();
    ctx.strokeStyle=sk;ctx.lineWidth=36;ctx.beginPath();ctx.moveTo(hx-150,hy+52);ctx.lineTo(hx-28,hy+14);ctx.stroke();
    ctx.strokeStyle='#e3b55c';ctx.lineWidth=2.2;for(let k=0;k<3;k++){ell(ctx,hx-92+k*7,hy+34-k*2,5,19,0.35);ctx.stroke();}
    ctx.fillStyle=sk;ell(ctx,hx,hy+8,32,20,rot);ctx.fill();for(let k=0;k<4;k++){ell(ctx,hx+14+k*8,hy-2+Math.abs(k-1.5)*3,6,14,rot+0.25*(k-1.5));ctx.fill();}};
  arm(x+70,y+10,0.2);arm(x-80,y+16,-0.2);
  if(withPlate){mar_plateEggs(ctx,x,y);ctx.fillStyle=sk;ell(ctx,x+58,y-6,9,16,0.6);ctx.fill();ell(ctx,x-66,y-2,9,16,-0.6);ctx.fill();}
}

/* ---------- 13 March · 01:22 — "Lekin meri eid tou ap hai" ---------- */
const MERI=[
  {at:0,   who:'her',time:'01:21',text:'Cant wait for yours 😊'},
  {at:0,   who:'me', time:'01:21',text:'I have 22hours 39mins'},
  {at:0,   who:'me', time:'01:21',text:'🥹'},
  {at:5.8, who:'her',time:'01:21',text:'Phir eid kay baad shayad baat ho apse'},
  {at:8.2, who:'me', time:'01:22',text:'😞'},
  {at:10.6,who:'me', time:'01:22',text:'Lekin meri eid tou ap hai'},
  {at:15.6,who:'her',time:'01:23',text:'Aik baat batao ye kesi space hui we talked almost everyday janay ajnay mein 😭😭😭😭😭😭'},
  {at:19.6,who:'me', time:'01:24',text:'Eik kaam kro rocket lo elon se or space mein bhejdo'},
  {at:21.4,who:'me', time:'01:24',text:'😭'},
];
scene({id:'merieid',name:'13 March · meri eid',when:'2026-03-13T01:22',bars:9,fin:['#000000',1.2],fout:['#000000',1.2],
  note:'one in the morning in Ramadan: the table not yet cleared, dates and Rooh Afza under the lamp, the phone face-up beside the plate; her “space” was due to start on Friday, and she says maybe they will talk after Eid.',
  tag:'“Lekin meri eid tou ap hai”',
  prep(){
    const c=mk(W,H),g=c.getContext('2d'),r=rng(301);
    g.fillStyle=vgrad(g,0,H,[[0,'#100b10'],[1,'#261418']]);g.fillRect(0,0,W,H);
    g.fillStyle='#1b1218';g.fillRect(0,0,W,150);g.fillStyle='#2a1c22';g.fillRect(0,120,W,30);
    /* the cloth, in a little perspective */
    g.fillStyle=vgrad(g,140,H,[[0,'#5a2028'],[1,'#2e1119']]);g.beginPath();g.moveTo(-90,170);g.lineTo(W+90,154);g.lineTo(W+140,H);g.lineTo(-140,H);g.closePath();g.fill();
    g.strokeStyle='rgba(255,220,200,.05)';g.lineWidth=1;for(let y=176;y<H;y+=7){g.beginPath();g.moveTo(0,y);g.lineTo(W,y-7);g.stroke();}
    g.fillStyle='rgba(255,214,160,.09)';g.beginPath();g.moveTo(0,336);g.lineTo(W,318);g.lineTo(W,482);g.lineTo(0,500);g.closePath();g.fill();
    g.strokeStyle='rgba(255,214,160,.16)';g.lineWidth=2;for(const[y0,y1]of[[336,318],[500,482]]){g.beginPath();g.moveTo(0,y0);g.lineTo(W,y1);g.stroke();}
    const lp=g.createRadialGradient(600,400,0,600,400,760);lp.addColorStop(0,'rgba(255,196,120,.38)');lp.addColorStop(0.5,'rgba(255,176,96,.14)');lp.addColorStop(1,'rgba(255,176,96,0)');g.fillStyle=lp;g.fillRect(0,0,W,H);
    /* the jug of Rooh Afza, half out of frame at the left */
    g.fillStyle='rgba(0,0,0,.25)';ell(g,150,470,120,36);g.fill();
    g.fillStyle='#b7163f';g.beginPath();g.moveTo(60,250);g.quadraticCurveTo(40,420,80,460);g.lineTo(220,460);g.quadraticCurveTo(262,420,240,250);g.closePath();g.fill();
    g.fillStyle='#e0245c';g.beginPath();g.moveTo(74,300);g.quadraticCurveTo(52,420,88,452);g.lineTo(212,452);g.quadraticCurveTo(250,420,228,300);g.closePath();g.fill();
    g.fillStyle='rgba(255,255,255,.14)';g.beginPath();g.moveTo(84,262);g.quadraticCurveTo(70,380,96,446);g.lineTo(112,446);g.quadraticCurveTo(90,380,100,262);g.closePath();g.fill();
    g.fillStyle='rgba(255,255,255,.22)';ell(g,150,250,92,16);g.fill();g.fillStyle='#d41c52';ell(g,150,252,84,11);g.fill();
    g.strokeStyle='rgba(255,255,255,.35)';g.lineWidth=8;g.beginPath();g.moveTo(240,290);g.quadraticCurveTo(300,320,236,400);g.stroke();
    /* the glass */
    g.fillStyle='rgba(0,0,0,.22)';ell(g,330,470,54,16);g.fill();
    g.fillStyle='rgba(255,255,255,.1)';rrect(g,292,290,78,176,12);g.fill();
    g.fillStyle=vgrad(g,318,462,[[0,'#e8286a'],[1,'#a8143f']]);rrect(g,298,318,66,146,10);g.fill();
    g.fillStyle='rgba(255,255,255,.28)';rrect(g,308,332,22,24,6);g.fill();rrect(g,330,364,24,22,6);g.fill();
    g.fillStyle='rgba(255,255,255,.3)';g.fillRect(304,300,8,150);g.fillStyle='rgba(255,255,255,.5)';ell(g,331,290,39,8);g.fill();g.fillStyle='rgba(232,40,106,.6)';ell(g,331,318,33,6);g.fill();
    g.fillStyle='rgba(255,255,255,.55)';for(let i=0;i<16;i++){circle(g,296+r()*70,300+r()*160,1+r()*1.6);g.fill();}
    /* the plate of dates */
    g.fillStyle='rgba(0,0,0,.28)';ell(g,500,500,150,108);g.fill();
    g.fillStyle='#d9d0c2';ell(g,500,488,146,104);g.fill();g.fillStyle='#f4efe6';ell(g,500,484,142,100);g.fill();g.fillStyle='#e9e2d6';ell(g,500,486,110,76);g.fill();g.fillStyle='#f6f1e8';ell(g,500,482,106,72);g.fill();
    const dates=[[450,460,0.3],[492,448,-0.2],[536,458,0.5],[470,492,0.1],[514,488,-0.4],[556,496,0.2],[488,520,0.6],[532,524,-0.1]];
    for(const[dx,dy,ro]of dates){g.fillStyle='rgba(0,0,0,.18)';ell(g,dx+2,dy+5,23,13,ro);g.fill();g.fillStyle='#4a2416';ell(g,dx,dy,23,13,ro);g.fill();g.fillStyle='#7a4324';ell(g,dx-4,dy-4,14,6,ro);g.fill();g.fillStyle='rgba(255,230,200,.35)';ell(g,dx-8,dy-6,5,2.5,ro);g.fill();g.fillStyle='#2b140c';ell(g,dx+Math.cos(ro)*20,dy+Math.sin(ro)*20,3,2,ro);g.fill();}
    g.fillStyle='#6a5340';for(const[sx,sy]of[[430,540],[590,530]]){ell(g,sx,sy,9,3.5,0.4);g.fill();}
    /* a stray date beside the phone, and a folded napkin */
    g.fillStyle='rgba(0,0,0,.2)';ell(g,1122,564,22,12,0.4);g.fill();g.fillStyle='#4a2416';ell(g,1120,560,22,12,0.4);g.fill();g.fillStyle='#7a4324';ell(g,1116,556,13,5,0.4);g.fill();
    g.fillStyle='#efe6d6';g.beginPath();g.moveTo(1040,240);g.lineTo(1250,220);g.lineTo(1270,330);g.lineTo(1060,350);g.closePath();g.fill();g.strokeStyle='rgba(0,0,0,.1)';g.lineWidth=2;g.beginPath();g.moveTo(1050,278);g.lineTo(1258,258);g.moveTo(1056,314);g.lineTo(1264,294);g.stroke();
    /* the lamp shade at the top of the frame */
    g.fillStyle='#3a2a1c';g.beginPath();g.moveTo(560,0);g.lineTo(720,0);g.lineTo(760,60);g.lineTo(520,60);g.closePath();g.fill();g.fillStyle='rgba(255,200,120,.5)';g.fillRect(520,58,240,6);
    const vg=g.createRadialGradient(640,380,300,640,380,900);vg.addColorStop(0,'rgba(10,5,8,0)');vg.addColorStop(1,'rgba(10,5,8,.55)');g.fillStyle=vg;g.fillRect(0,0,W,H);
    return{c};
  },
  draw(ctx,lt,A){
    ctx.drawImage(A.c,0,0);
    const flick=0.03*Math.sin(lt*7.1)+0.02*Math.sin(lt*3.3);glow(ctx,640,70,520,'#ffc27a',0.16+flick);
    ctx.save();ctx.translate(735,34);ctx.rotate(-0.045);ctx.scale(0.92,0.92);
    const S=drawPhone(ctx,0,0,PHONE.w,PHONE.h,{});
    const typing=lt>8.4&&lt<10.6?'Lekin meri eid tou ap hai'.slice(0,Math.max(0,Math.floor((lt-8.4)*12))):'';
    chatPanel(ctx,S,MERI,lt,{name:'Fabeha',status:'online',draft:typing||undefined});
    phoneTop(ctx,S,{time:lt<8.2?'01:21':lt<15.6?'01:22':lt<19.6?'01:23':'01:24'});
    ctx.restore();
    motes(ctx,lt,16,302,'#ffe2b0',1.2,0.3);
  },
  subs:[
    [0.6,5.2,'Thirteenth of March, one in the morning. Her “space” was due to start on Friday, mine on Saturday. I had counted the hours.'],
    [6.0,8.0,'Phir eid kay baad shayad baat ho apse','her'],
    [10.8,13.6,'Lekin meri eid tou ap hai','him'],
    [15.8,19.2,'Aik baat batao ye kesi space hui we talked almost everyday janay ajnay mein 😭😭😭😭😭😭','her'],
    [19.8,22.6,'Eik kaam kro rocket lo elon se or space mein bhejdo','him'],
    [23.6,28.4,'Neither of us managed the space. We kept talking, by accident mostly, every day.'],
  ],
  score({hit,melody,bars,THEME_B}){
    bars(0,9,['Em','Cmaj7','G','Dsus'],{padVel:0.42});
    for(let b=2;b<7;b++)melody(b,b-2,'flute',0,0.4,THEME_B);
    for(const m of MERI)if(m.at>0)hit(m.at,'tick',{hi:m.who==='her'});
  },
  amb(lt){return{room:0.25};},
});

/* ---------- 16 March · 01:12 — the necklace in the gearbox ---------- */
const NECK_PAINT=(ctx,px,py,t,k)=>{ctx.fillStyle='#262730';ctx.fillRect(px,py,t,t);ctx.fillStyle='rgba(255,255,255,.05)';for(let y=py+9;y<py+t;y+=13)ctx.fillRect(px,y,t,1);glow(ctx,px+t*0.5,py+t*0.4,t*0.6,'#ffd9a0',0.18);mar_chainCoil(ctx,px+t/2,py+t/2,t*0.3,k*1.9);};
const GEAR=[
  {at:11.0,who:'me', time:'01:12',photos:2,paint:NECK_PAINT},
  {at:12.2,who:'me', time:'01:12',text:'See what i found'},
  {at:13.6,who:'her',time:'01:12',text:'From whereeee'},
  {at:15.8,who:'me', time:'01:13',text:'Gaaar mein tha meri niece ko mila'},
  {at:17.6,who:'me', time:'01:14',text:'She was playing, meri family ko laga soone ka hai'},
  {at:20.2,who:'her',time:'01:16',text:'Istg \nHamaray sammay tha'},
  {at:21.8,who:'me', time:'01:16',text:'😭 pehna deta apko'},
  {at:23.8,who:'her',time:'01:18',text:'Ig might have slipped jab ap ne jacket utari thi'},
  {at:25.6,who:'me', time:'01:19',text:'Koi nahi mill tou gya i am glad'},
  {at:27.2,who:'her',time:'01:20',text:'Cheezain toh ati jati rehti hai khair hai'},
  {at:29.2,who:'me', time:'01:21',text:'Ye tou hai ap constant ho bas'},
  {at:29.7,who:'me', time:'01:21',text:'👉👈'},
  {at:31.6,who:'her',time:'01:24',text:'Necklace so goated it has gold allegations now'},
  {at:33.6,who:'me', time:'01:25',text:'Sone ka hee hai'},
  {at:34.1,who:'me', time:'01:25',text:'Tabhi apko deraha'},
  {at:34.7,who:'me', time:'01:25',text:'Diamond  pe sona suit krta 👉👈'},
  {at:36.6,who:'her',time:'01:25',text:'Apne pas hi rakho plssss'},
  {at:37.8,who:'me', time:'01:25',text:'Nahi hai sone ka 😭'},
  {at:38.8,who:'her',time:'01:25',text:'Thank God'},
];
scene({id:'gearbox',name:'16 March · the gearbox',when:'2026-03-16T01:12',bars:12,fin:['#000000',1.2],fout:['#000000',1.2],
  note:'one in the morning in the parked car: the necklace he had carried to Karachi for her was lost in the car — it had slipped out of his jacket by the gearbox; his niece found it playing, the family suspected gold, he claimed it as his and drove off with it.',
  tag:'“Diamond  pe sona suit krta 👉👈” · “ap constant ho bas”',
  prep(){
    const c=mk(W,H),g=c.getContext('2d'),r=rng(311);
    g.fillStyle=vgrad(g,0,H,[[0,'#07080c'],[1,'#121319']]);g.fillRect(0,0,W,H);
    /* the underside of the dash */
    g.fillStyle='#15161c';g.beginPath();g.moveTo(0,0);g.lineTo(W,0);g.lineTo(W,150);g.quadraticCurveTo(640,110,0,150);g.closePath();g.fill();
    g.fillStyle='#1d1e26';rrect(g,480,40,320,70,12);g.fill();g.fillStyle='#0c0d12';rrect(g,500,52,280,46,8);g.fill();
    for(let k=0;k<5;k++){g.fillStyle=k===2?'#ff8a3a':'#4a4c58';circle(g,540+k*50,75,6);g.fill();}
    /* the passenger seat, left */
    g.fillStyle='#1b1c23';g.beginPath();g.moveTo(0,150);g.lineTo(400,180);g.lineTo(330,H);g.lineTo(0,H);g.closePath();g.fill();
    g.strokeStyle='rgba(255,255,255,.05)';g.lineWidth=2;for(let k=0;k<6;k++){g.beginPath();g.moveTo(40+k*54,200);g.lineTo(10+k*50,H);g.stroke();}
    g.fillStyle='rgba(255,255,255,.03)';for(let i=0;i<40;i++){ell(g,r()*330,220+r()*500,30+r()*40,6+r()*8);g.fill();}
    /* the gap between seat and console */
    g.fillStyle='#04050a';g.beginPath();g.moveTo(400,180);g.lineTo(436,150);g.lineTo(336,H);g.lineTo(300,H);g.closePath();g.fill();
    /* his leg, right */
    g.fillStyle='#1d2130';g.beginPath();g.moveTo(W,250);g.lineTo(830,330);g.lineTo(790,H);g.lineTo(W,H);g.closePath();g.fill();
    g.strokeStyle='rgba(255,255,255,.05)';g.lineWidth=3;g.beginPath();g.moveTo(1180,290);g.quadraticCurveTo(1000,520,960,H);g.stroke();
    /* the centre console */
    g.fillStyle='#22232b';g.beginPath();g.moveTo(436,150);g.lineTo(760,150);g.lineTo(830,H);g.lineTo(336,H);g.closePath();g.fill();
    g.fillStyle='#2b2c35';g.beginPath();g.moveTo(474,182);g.lineTo(722,182);g.lineTo(780,H);g.lineTo(400,H);g.closePath();g.fill();
    g.strokeStyle='rgba(255,255,255,.07)';g.lineWidth=1.5;g.beginPath();g.moveTo(474,182);g.lineTo(400,H);g.moveTo(722,182);g.lineTo(780,H);g.stroke();
    /* the gear boot and stick */
    for(let k=0;k<5;k++){g.fillStyle=k%2?'#101116':'#191a20';ell(g,592,338+k*8,82-k*10,42-k*5);g.fill();}
    g.strokeStyle='#3a3b44';g.lineWidth=16;g.lineCap='round';g.beginPath();g.moveTo(592,330);g.lineTo(602,245);g.stroke();
    g.fillStyle='#2a2b33';circle(g,603,232,30);g.fill();g.fillStyle='rgba(255,255,255,.12)';ell(g,595,222,12,8,-0.5);g.fill();
    g.fillStyle='rgba(255,255,255,.3)';g.font='700 10px "Mulish",sans-serif';g.textAlign='center';g.fillText('1  3  5',603,229);g.fillText('2  4  R',603,243);
    /* the handbrake and the cup holders */
    g.strokeStyle='#30313a';g.lineWidth=18;g.beginPath();g.moveTo(650,520);g.lineTo(712,650);g.stroke();g.fillStyle='#1c1d24';ell(g,650,520,22,12,0.6);g.fill();
    g.fillStyle='#15161c';ell(g,520,570,36,26);g.fill();ell(g,526,650,38,28);g.fill();
    /* a car key and a coin in the tray */
    g.fillStyle='#3a3a40';ell(g,560,430,8,4);g.fill();g.fillStyle='#8a8f98';circle(g,548,470,7);g.fill();
    return{c};
  },
  draw(ctx,lt,A){
    const B=lt>=10.5;
    ctx.drawImage(A.c,0,0);
    const dome=B?0.06:0.42;
    glow(ctx,640,-60,820,'#ffd9a0',dome);ctx.fillStyle=`rgba(255,220,170,${dome*0.12})`;ctx.fillRect(0,0,W,H);
    if(!B){
      const reach=smooth(1.6,4.2,lt),grip=smooth(4.4,5.0,lt),lift=smooth(5.4,7.8,lt);
      const spot={x:466,y:434};
      const hx=lerp(1010,spot.x+6,reach)+lerp(0,170,lift),hy=lerp(790,spot.y+16,reach)-lerp(0,150,lift),rot=-0.55+0.35*lift;
      if(lift<0.02)mar_chainCoil(ctx,spot.x,spot.y,26,0.4);
      mar_sparkle(ctx,spot.x+8,spot.y-6,9,(0.5+0.5*Math.sin(lt*9))*smooth(0.8,1.4,lt)*(1-smooth(3.6,4.2,lt)));
      /* his left arm from the seat: the jacket sleeve, then the wrist */
      ctx.strokeStyle='#2a2d3a';ctx.lineCap='round';ctx.lineWidth=88;ctx.beginPath();ctx.moveTo(1180,860);ctx.quadraticCurveTo(1040,660,hx+48,hy+66);ctx.stroke();
      ctx.strokeStyle=HIS.skin;ctx.lineWidth=58;ctx.beginPath();ctx.moveTo(hx+52,hy+72);ctx.lineTo(hx+14,hy+26);ctx.stroke();
      mar_hisHand(ctx,hx,hy,rot,grip);
      if(lift>0.02){const tx=hx+Math.sin(rot)*50,ty=hy-Math.cos(rot)*50;mar_chain(ctx,tx,ty,70+40*lift,16*lift,lt);}
      ctx.fillStyle=`rgba(0,0,0,${smooth(9.6,10.5,lt)})`;ctx.fillRect(0,0,W,H);
      return;
    }
    ctx.fillStyle='rgba(0,0,8,.42)';ctx.fillRect(0,0,W,H);
    const S=drawPhoneHand(ctx,lt,{x:475,y:120,w:330,h:700});
    chatPanel(ctx,S,GEAR,lt,{name:'Fabeha',status:'online'});
    phoneTop(ctx,S,{time:lt<13.6?'01:12':lt<17.6?'01:13':lt<20.2?'01:14':lt<23.8?'01:16':lt<25.6?'01:18':lt<27.2?'01:19':lt<29.2?'01:20':lt<31.6?'01:21':lt<33.6?'01:24':'01:25'});
    glow(ctx,S.x+S.w/2,S.y+S.h*0.5,520,'#6fb7ff',0.08);
    ctx.fillStyle=`rgba(0,0,0,${1-smooth(10.5,11.3,lt)})`;ctx.fillRect(0,0,W,H);
  },
  subs:[
    [0.6,5.4,'Sixteenth of March, one in the morning, in the car outside the house. The necklace I had carried to Karachi for her — lost in this car, before I found the moment to give it.'],
    [5.8,10.0,'It had slipped out of my jacket by the gearbox. My niece found it, playing. The family decided it was gold.'],
    [12.4,13.9,'See what i found','him'],
    [16.0,17.5,'Gaaar mein tha meri niece ko mila','him'],
    [17.8,20.0,'She was playing, meri family ko laga soone ka hai','him'],
    [20.4,21.7,'Hamaray sammay tha','her'],
    [22.0,23.6,'😭 pehna deta apko','him'],
    [24.0,26.0,'Ig might have slipped jab ap ne jacket utari thi','her'],
    [27.4,29.1,'Cheezain toh ati jati rehti hai khair hai','her'],
    [29.4,31.3,'Ye tou hai ap constant ho bas','him'],
    [31.8,33.5,'Necklace so goated it has gold allegations now','her'],
    [33.8,34.6,'Sone ka hee hai','him'],
    [34.9,36.4,'Diamond  pe sona suit krta 👉👈','him'],
    [36.8,37.7,'Apne pas hi rakho plssss','her'],
    [38.0,38.7,'Nahi hai sone ka 😭','him'],
    [39.0,39.7,'Thank God','her'],
  ],
  score({hit,melody,bars,THEME_B}){
    bars(0,12,['Em','Am7','Cmaj7','Bm7'],{padVel:0.38,arp:true,arpVel:0.11,step:0.5});
    for(let b=4;b<9;b++)melody(b,b-4,'box',12,0.3,THEME_B);
    hit(1.0,'chime',{midi:91,vel:0.35});hit(5.6,'chime',{midi:88,vel:0.3});
    for(const m of GEAR)hit(m.at,'tick',{hi:m.who==='her'});
  },
  amb(lt){return lt<10.5?{room:0.14,wind:0.12}:{room:0.22};},
});

/* ---------- 20 March · 04:30 — the thirtieth sehri, cooked as promised ---------- */
const SEHRI=[
  {at:1.2, who:'me', time:'04:30',text:'Acha i gotta make sehri aj'},
  {at:2.6, who:'me', time:'04:30',text:'😋 kal maine bola tha agr 30 roze honge mein banaoga'},
  {at:4.0, who:'me', time:'04:30',text:'Talk to you after sehri'},
  {at:6.2, who:'her',time:'04:31',text:'Okkk Allah hafiz'},
  {at:8.2, who:'her',time:'04:31',text:'Achi sehri banana'},
  {at:27.2,who:'me', time:'05:04',text:'Yesss bana li 😋'},
];

/* ---------- 20 March · 23:30 — chaand raat: on the call, past the hour, she said it; it felt like standing in the same rain ---------- */
/* the imagined lane is laid out in metres and projected: F focal length, (VX,VY) vanishing point, HC eye height (he is a little taller);
   the lane canvases reach OY above the frame so the camera can tilt up to the moon at the end */
const MRL={F:820,VX:760,VY:360,HC:1.7,OY:400};
function mar_P(X,Y,Z){return[MRL.VX+MRL.F*X/Z,MRL.VY-MRL.F*(Y-MRL.HC)/Z+MRL.OY];}
function mar_poly(g,pts){g.beginPath();for(let i=0;i<pts.length;i++){const q=mar_P(pts[i][0],pts[i][1],pts[i][2]);if(i)g.lineTo(q[0],q[1]);else g.moveTo(q[0],q[1]);}g.closePath();}
function mar_wall(g,X,Ya,Yb,Za,Zb){mar_poly(g,[[X,Ya,Za],[X,Ya,Zb],[X,Yb,Zb],[X,Yb,Za]]);}
function mar_line3(g,a,b){const p=mar_P(a[0],a[1],a[2]),q=mar_P(b[0],b[1],b[2]);g.beginPath();g.moveTo(p[0],p[1]);g.lineTo(q[0],q[1]);g.stroke();}
/* the night sky over the lane (tall canvas) */
function mar_buildSky(){
  const HH=H+MRL.OY,c=mk(W,HH),g=c.getContext('2d'),r=rng(4031);
  g.fillStyle=vgrad(g,0,HH,[[0,'#04050c'],[0.3,'#080c1c'],[0.55,'#111833'],[0.66,'#1c2140'],[0.7,'#2c2a48'],[1,'#3a2e46']]);g.fillRect(0,0,W,HH);
  for(let i=0;i<46;i++){const x=r()*W,y=r()*(MRL.OY+330),R=80+r()*220,gr=g.createRadialGradient(x,y,0,x,y,R);gr.addColorStop(0,'rgba(84,96,150,.06)');gr.addColorStop(1,'rgba(84,96,150,0)');g.fillStyle=gr;g.fillRect(x-R,y-R,R*2,R*2);}
  return c;
}
/* a quiet Karachi lane on chaand raat, wet: low old buildings on both sides, balconies, water tanks, shutters and a few shops still lit,
   a bangle stall, street lamps down the right, strings of chaand-raat lights across, wires overhead */
function mar_buildLane(){
  const HH=H+MRL.OY,c=mk(W,HH),g=c.getContext('2d'),r=rng(4021),haze='#2a2b46',hy=MRL.VY+MRL.OY;
  /* the road: dark wet asphalt holding the sky */
  g.fillStyle=vgrad(g,hy,HH,[[0,'#36324c'],[0.1,'#24222f'],[0.5,'#17171f'],[1,'#0d0e14']]);g.fillRect(0,hy-2,W,HH-hy+2);
  for(let i=0;i<80;i++){const v=Math.pow(r(),1.5),y=hy+6+v*(HH-hy),x=r()*W,w=(18+r()*60)*(0.2+v*2.2),h=(1+r()*2)*(0.3+v*2.6);
    g.fillStyle=`rgba(${70+Math.floor(r()*30)},${78+Math.floor(r()*30)},${116+Math.floor(r()*34)},${(0.07+r()*0.12).toFixed(3)})`;ell(g,x,y,w,h);g.fill();}
  /* sidewalks and curbs */
  for(const[xa,xb]of[[-5.2,-3.9],[4.5,5.8]]){g.fillStyle='#23212c';mar_poly(g,[[xa,0.15,1.5],[xb,0.15,1.5],[xb,0.15,220],[xa,0.15,220]]);g.fill();
    g.fillStyle='#3d3b4c';mar_wall(g,xa<0?xb:xa,0,0.15,1.5,220);g.fill();}
  /* the buildings, far to near */
  const cols=['#3d3848','#2f3b47','#46383e','#3c3b38','#2d3442','#4a4238','#384540','#463a4a'],segs=[],shops=[];
  for(const[X,dir]of[[-5.2,-1],[5.8,1]]){let z=3.0;while(z<160){const L=4+r()*5.5+z*0.05,h=6.4+r()*7.0;segs.push({X,dir,z0:z,z1:z+L,h,col:cols[Math.floor(r()*cols.length)],seed:Math.floor(r()*1e6)});z+=L;}}
  segs.sort((a,b)=>b.z0-a.z0);
  for(const b of segs){
    /* near the camera the walls fall into shadow (the lamps are further down); far away they sink into the rain haze */
    const rb=rng(b.seed),{X,dir,z0,z1,h}=b,L=z1-z0,t=clamp((z0-5)/90)*0.8,sh=clamp(1-(z0-3)/30)*0.5,dk=cc=>mixHex(cc,'#07070f',sh),col=dk(mixHex(b.col,haze,t)),lw=k=>Math.max(0.5,MRL.F*k/z0);
    g.fillStyle=mixHex(col,'#06060c',0.5);mar_poly(g,[[X,0,z0],[X+dir*10,0,z0],[X+dir*10,h,z0],[X,h,z0]]);g.fill();      /* the end wall facing us */
    g.fillStyle=col;mar_wall(g,X,0,h,z0,z1);g.fill();
    g.save();mar_wall(g,X,0,h,z0,z1);g.clip();      /* weathering: soft dark water stains */
    for(let k=0;k<6;k++){const zz=z0+rb()*L,yy=rb()*h,p=mar_P(X,yy,zz),R=MRL.F*(0.8+rb()*1.8)/zz,sg=g.createRadialGradient(p[0],p[1],0,p[0],p[1],R);sg.addColorStop(0,'rgba(0,0,0,.14)');sg.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=sg;g.fillRect(p[0]-R,p[1]-R,R*2,R*2);}
    g.restore();
    g.fillStyle='rgba(6,6,14,.16)';mar_wall(g,X,h*0.55,h,z0,z1);g.fill();
    g.fillStyle=mixHex(col,'#c8c2d8',0.12);mar_wall(g,X,h-0.4,h,z0,z1);g.fill();g.fillStyle='rgba(0,0,0,.2)';mar_wall(g,X,h-0.55,h-0.4,z0,z1);g.fill();
    g.strokeStyle='rgba(0,0,0,.14)';g.lineWidth=lw(0.08);for(let k=0;k<4;k++){const zz=z0+rb()*L;mar_line3(g,[X,h-0.4,zz],[X,h-1.5-rb()*3,zz]);}   /* rain stains */
    const nf=Math.max(2,Math.floor(h/3.1));
    for(let k=0;k<nf;k++){const y0=k*3.1;if(k>0&&y0+2.4>h-0.5)break;
      if(k===0){const za=z0+0.35,zb=z1-0.35,lit=rb()<0.4&&z0>11;
        if(lit){const lc=rb()<0.7?'#ffcb80':'#ffe6b8';g.fillStyle=mixHex(lc,haze,t*0.5);mar_wall(g,X,0.15,2.5,za,zb);g.fill();
          g.fillStyle=hexA(mixHex('#7a4a2a',haze,t),0.5);for(let q=0;q<3;q++){mar_wall(g,X,0.8+q*0.42,0.9+q*0.42,za,zb);g.fill();}
          shops.push({X,za,zb,col:mixHex(lc,haze,t*0.5)});}
        else{g.fillStyle=dk(mixHex('#2c2f39',haze,t));mar_wall(g,X,0.15,2.5,za,zb);g.fill();g.strokeStyle='rgba(12,13,20,.32)';g.lineWidth=lw(0.02);for(let y=0.4;y<2.5;y+=0.3)mar_line3(g,[X,y,za],[X,y,zb]);}
        if(rb()<0.55){const sc=['#2f6a64','#7a3440','#34507a','#86703a','#54406e'][Math.floor(rb()*5)];g.fillStyle=dk(mixHex(mixHex(sc,'#1a1a26',0.35),haze,t*0.7));mar_wall(g,X,2.6,3.0,za,zb);g.fill();}
      }else{
        const nw=Math.max(1,Math.round(L/2.6));
        for(let w=0;w<nw;w++){const zc=z0+(w+0.5)*L/nw,za=zc-0.55,zb=zc+0.55,lit=rb()<(z0<9?0.25:0.4),warm=rb()<0.68;
          g.fillStyle=lit?mixHex(mixHex(warm?'#ffc46e':'#d4e2ff',haze,t*0.45),'#07070f',sh*0.7):mixHex('#12131b',haze,t*0.7);mar_wall(g,X,y0+0.9,y0+2.3,za,zb);g.fill();
          if(lit){g.fillStyle=hexA(mixHex(warm?'#a0583a':'#5a6a8a',haze,t),0.55);mar_wall(g,X,y0+0.9,y0+2.3,za,za+0.42);g.fill();}
          g.strokeStyle='rgba(10,10,16,.6)';g.lineWidth=Math.max(0.5,MRL.F*0.025/zc);for(let q=1;q<4;q++){const zq=za+q*(zb-za)/4;mar_line3(g,[X,y0+0.9,zq],[X,y0+2.3,zq]);}
          if(!lit&&rb()<0.3){const Xa=X-dir*0.45;g.fillStyle=dk(mixHex('#5e5f68',haze,t));mar_wall(g,Xa,y0+0.25,y0+0.8,zc-0.4,zc+0.4);g.fill();}
        }
        if(rb()<0.5){const Xb=X-dir*0.9,za=z0+0.3,zb=z1-0.3,dk=mixHex(col,'#05050a',0.55);
          g.fillStyle=dk;mar_poly(g,[[X,y0,za],[Xb,y0,za],[Xb,y0,zb],[X,y0,zb]]);g.fill();
          g.fillStyle=hexA(mixHex('#0d0e15',haze,t),0.7);mar_poly(g,[[X,y0,za],[Xb,y0,za],[Xb,y0+1,za],[X,y0+1,za]]);g.fill();mar_wall(g,Xb,y0,y0+1,za,zb);g.fill();
          g.strokeStyle=hexA(mixHex('#7a7686',haze,t),0.55);g.lineWidth=Math.max(0.5,MRL.F*0.03/za);mar_line3(g,[Xb,y0+1,za],[Xb,y0+1,zb]);
          g.strokeStyle='rgba(8,8,12,.6)';for(let zq=za+0.25;zq<zb;zq+=0.3)mar_line3(g,[Xb,y0,zq],[Xb,y0+1,zq]);}
      }
    }
    if(rb()<0.55){const zm=z0+L*(0.3+rb()*0.4),xa=X+dir*1.6,xb=X+dir*2.9;g.fillStyle='#0b0c14';mar_poly(g,[[xa,h,zm],[xb,h,zm],[xb,h+1.3,zm],[xa,h+1.3,zm]]);g.fill();}   /* a water tank on the roof */
  }
  /* the shops' light lying on the wet sidewalk */
  g.save();g.globalCompositeOperation='lighter';
  for(const s of shops){g.fillStyle=hexA(s.col,0.1);mar_wall(g,s.X,-2.3,0.15,s.za,s.zb);g.fill();g.fillStyle=hexA(s.col,0.1);mar_wall(g,s.X,-1.0,0.15,s.za,s.zb);g.fill();}
  g.restore();
  /* the bangle stall on the left, under its canopy */
  { const z0=9.4,z1=11.6,xa=-5.0,xb=-3.95;
    g.fillStyle='#2a1e24';mar_poly(g,[[xa,0.9,z0],[xb,0.9,z0],[xb,0.9,z1],[xa,0.9,z1]]);g.fill();
    g.fillStyle='#4a1e2c';mar_wall(g,xb,0.15,0.9,z0,z1);g.fill();g.fillStyle='#5a2434';mar_poly(g,[[xa,0.15,z0],[xb,0.15,z0],[xb,0.9,z0],[xa,0.9,z0]]);g.fill();
    g.fillStyle='#d9c08a';mar_wall(g,xb,0.84,0.9,z0,z1);g.fill();
    g.strokeStyle='#15121a';g.lineWidth=2;mar_line3(g,[xb+0.3,0.15,z0-0.1],[xb+0.3,2.4,z0-0.1]);mar_line3(g,[xb+0.3,0.15,z1+0.1],[xb+0.3,2.4,z1+0.1]);
    g.fillStyle='#5e2232';mar_poly(g,[[xa,2.4,z0-0.25],[xb+0.45,2.4,z0-0.25],[xb+0.45,2.4,z1+0.25],[xa,2.4,z1+0.25]]);g.fill();
    g.fillStyle='#7a2e40';mar_poly(g,[[xb+0.45,2.4,z0-0.25],[xb+0.45,2.4,z1+0.25],[xb+0.45,2.15,z1+0.25],[xb+0.45,2.15,z0-0.25]]);g.fill();
    g.fillStyle='#2e1e22';mar_wall(g,xa+0.02,0.95,2.2,z0,z1);g.fill();
    /* bangles stacked on rods, seen edge-on: thin rings of glass and gold catching the bulb */
    const bc=['#c8a050','#b8384e','#3a8a62','#3e5eaa','#c0608e','#d0a860','#8a3a8a'],rs=rng(4040);
    for(let row=0;row<4;row++){const yy=1.15+row*0.28;g.strokeStyle='rgba(90,80,70,.8)';g.lineWidth=1;mar_line3(g,[xa+0.05,yy+0.12,z0+0.12],[xa+0.05,yy+0.12,z1-0.12]);
      for(let k=0;k<26;k++){const zz=z0+0.2+k*(z1-z0-0.4)/26,p=mar_P(xa+0.05,yy,zz),cc=bc[Math.floor(rs()*bc.length)];g.strokeStyle=mixHex(cc,'#140f16',0.3);g.lineWidth=1.1;ell(g,p[0],p[1],1.1,3.6);g.stroke();}}
    for(let k=0;k<9;k++){const p=mar_P(lerp(xa+0.2,xb-0.12,(k%3)/2),0.94,z0+0.25+k*0.2);g.strokeStyle=mixHex(bc[k%bc.length],'#140f16',0.25);g.lineWidth=1.2;ell(g,p[0],p[1],3.4,1.3);g.stroke();}
  }
  const sp=mar_P(-4.3,2.2,10.5),stall={x:sp[0],y:sp[1]};
  /* street lamps down the right side */
  const lamps=[];
  for(const Z of[8,19,38,75,140]){const lw=Math.max(1,MRL.F*0.16/Z),a=mar_P(5.2,0,Z),b=mar_P(5.2,6.3,Z),c2=mar_P(4.1,6.3,Z),hd=mar_P(4.1,6.1,Z);
    g.strokeStyle='#13131b';g.lineWidth=lw;g.lineCap='round';g.beginPath();g.moveTo(a[0],a[1]);g.lineTo(b[0],b[1]);g.lineTo(c2[0],c2[1]);g.stroke();
    g.fillStyle='#1c1c26';ell(g,hd[0],hd[1]-lw*0.4,lw*2.4,lw*0.9);g.fill();
    lamps.push({x:hd[0],y:hd[1],Z,gy:mar_P(4.1,0,Z)[1],my:mar_P(4.1,-6.1,Z)[1]});}
  /* strings of chaand-raat lights across the lane */
  const strings=[],SC=['#ffd27a','#ff8f7a','#a8e68f','#8fbfff','#fff1c8','#ffb0dc'];
  for(const[Z,ya,yb,n]of[[10,5.3,5.0,26],[15,5.6,5.2,24],[23,5.2,5.5,22],[36,5.4,5.1,20],[58,5.3,5.3,16]]){
    const sag=0.9,pts=[];for(let i=0;i<=40;i++){const u=i/40;pts.push(mar_P(lerp(-5.2,5.8,u),lerp(ya,yb,u)-4*sag*u*(1-u),Z));}
    g.strokeStyle='rgba(12,12,18,.85)';g.lineWidth=Math.max(0.6,MRL.F*0.012/Z);g.beginPath();pts.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1]));g.stroke();
    const bulbs=[];for(let i=0;i<n;i++){const u=(i+0.5)/n,X=lerp(-5.2,5.8,u),Y=lerp(ya,yb,u)-4*sag*u*(1-u)-0.08,p=mar_P(X,Y,Z),m=mar_P(X,-Y,Z);bulbs.push({x:p[0],y:p[1],my:m[1],col:SC[(i+Z)%SC.length],ph:i*1.7+Z});}
    strings.push({Z,bulbs,r:Math.max(1,MRL.F*0.05/Z)});}
  /* wires overhead, against the sky */
  g.strokeStyle='rgba(6,6,12,.9)';g.lineCap='round';
  for(const[x0,y0,x1,y1,s,lwd]of[[-40,-40,1320,-110,70,1.8],[-40,40,640,-170,40,1.5],[300,-300,1320,-20,50,1.4],[-40,-210,1320,-260,60,1.2]]){
    g.lineWidth=lwd;g.beginPath();g.moveTo(x0,y0+MRL.OY);g.quadraticCurveTo((x0+x1)/2,(y0+y1)/2+s*2+MRL.OY,x1,y1+MRL.OY);g.stroke();}
  return{c,lamps,strings,stall};
}
/* falling rain in screen space: one path, one colour; o = {len:[a,b], sp:[a,b] px/s, lw, col, slant, x0,x1,y0,y1} */
function mar_streaks(ctx,lt,n,seed,o){
  if(n<=0)return;
  const r=rng(seed),x0=o.x0??-60,x1=o.x1??W+220,y0=o.y0??-50,y1=o.y1??H+50,span=y1-y0,sl=o.slant??-0.14;
  ctx.save();ctx.strokeStyle=o.col;ctx.lineWidth=o.lw||1.2;ctx.lineCap='round';ctx.beginPath();
  for(let i=0;i<n;i++){const x=x0+r()*(x1-x0),sp=o.sp[0]+r()*(o.sp[1]-o.sp[0]),len=o.len[0]+r()*(o.len[1]-o.len[0]),ph=r()*span,y=y0+((ph+lt*sp)%span),xx=x+sl*(y-y0);
    ctx.moveTo(xx,y);ctx.lineTo(xx+sl*len,y+len);}
  ctx.stroke();ctx.restore();
}
/* splashes and rings on the wet ground, bigger toward the bottom; y0 = the horizon */
function mar_splashes(ctx,lt,n,seed,y0,y1,a){
  const r=rng(seed);ctx.save();ctx.lineWidth=1;
  for(let i=0;i<n;i++){const x=r()*W,v=Math.pow(r(),0.7),y=y0+v*(y1-y0),ph=r(),rate=1.5+r()*1.5,u=(lt*rate+ph)%1;
    if(u>=0.4)continue;const k=u/0.4,s=0.15+v*1.1;
    ctx.strokeStyle=`rgba(220,230,250,${(a*(1-k)).toFixed(3)})`;ell(ctx,x,y,(3+k*14)*s,(1+k*4)*s);ctx.stroke();
    if(k<0.3){ctx.fillStyle=`rgba(235,240,255,${(a*(1-k/0.3)).toFixed(3)})`;for(let q=-1;q<=1;q+=2){circle(ctx,x+q*k*14*s,y-k*30*s*(1-k),1.2*s+0.4);ctx.fill();}}
  }
  ctx.restore();
}
/* one line made big across the upper frame, clear of the subtitle band: a soft dark band, a rose glow, large italic serif, a small label above it */
function mar_bigLine(ctx,text,a,o={}){
  if(a<=0)return;
  const cy=o.y??146,rise=(1-a)*10;
  ctx.save();ctx.font='italic 500 58px "Cormorant Garamond",serif';
  let mw=o.maxW||900,lines=wrapText(ctx,text,mw);
  if(lines.length>1)while(mw>360){const t=wrapText(ctx,text,mw-20);if(t.length>lines.length)break;mw-=20;lines=t;}
  const lh=68,th=lines.length*lh,top=Math.max(0,cy-th/2-(o.label?84:62)),bot=cy+th/2+62;
  ctx.globalAlpha=a;
  ctx.fillStyle=vgrad(ctx,top,bot,[[0,'rgba(7,8,18,0)'],[0.3,'rgba(7,8,18,.58)'],[0.7,'rgba(7,8,18,.58)'],[1,'rgba(7,8,18,0)']]);ctx.fillRect(0,top,W,bot-top);
  ctx.save();ctx.globalCompositeOperation='screen';glow(ctx,640,cy,560,'#ffb3c6',0.13);ctx.restore();
  ctx.textAlign='center';ctx.textBaseline='middle';ctx.shadowColor='rgba(255,176,200,.8)';ctx.shadowBlur=26;ctx.fillStyle='#fff6ee';
  for(let k=0;k<lines.length;k++)ctx.fillText(lines[k],640,cy-th/2+lh/2+k*lh+rise);
  ctx.shadowBlur=0;
  if(o.label){ctx.font='600 13px "Mulish",sans-serif';setLS(ctx,'4px');ctx.fillStyle='rgba(255,205,220,.85)';ctx.fillText(o.label.toUpperCase(),640,cy-th/2-16+rise);setLS(ctx,'0px');}
  ctx.restore();
}
/* his right forearm and hand from the lower right, held flat over her head like an umbrella that isn't there;
   (kx,ky) = his knuckles, the fingers point left; rain splashes on the back of the hand and drips off the fingertips */
function mar_rainHand(ctx,lt,kx,ky){
  const C=[kx+148,ky+14],E=[kx+600,ky+650],dx=E[0]-C[0],dy=E[1]-C[1],dl=Math.hypot(dx,dy),ux=dx/dl,uy=dy/dl,nx=-uy,ny=ux,w0=33,w1=120,M=[(C[0]+E[0])/2,(C[1]+E[1])/2],wm=(w0+w1)/2;
  const rb=rng(4300),edge=mixHex(HIS.skinSh,'#5a3a2a',0.25);
  ctx.save();ctx.lineCap='round';ctx.lineJoin='round';
  /* the wrist, coming out of the cuff */
  ctx.strokeStyle=HIS.skinSh;ctx.lineWidth=50;ctx.beginPath();ctx.moveTo(kx+98,ky+3);ctx.lineTo(C[0]-ux*6,C[1]-uy*6);ctx.stroke();
  ctx.strokeStyle=HIS.skin;ctx.lineWidth=40;ctx.beginPath();ctx.moveTo(kx+98,ky-1);ctx.lineTo(C[0]-ux*6+nx*-4,C[1]-uy*6+ny*-4);ctx.stroke();
  /* the sleeve: a dark kurta, soaked, widening toward the camera */
  const gr=ctx.createLinearGradient(M[0]+nx*wm,M[1]+ny*wm,M[0]-nx*wm,M[1]-ny*wm);gr.addColorStop(0,'#131722');gr.addColorStop(0.55,'#242b3d');gr.addColorStop(1,'#353e58');
  ctx.fillStyle=gr;ctx.beginPath();ctx.moveTo(C[0]+nx*w0,C[1]+ny*w0);ctx.quadraticCurveTo(M[0]+nx*wm*1.1,M[1]+ny*wm*1.1,E[0]+nx*w1,E[1]+ny*w1);ctx.lineTo(E[0]-nx*w1,E[1]-ny*w1);
  ctx.quadraticCurveTo(M[0]-nx*wm*1.04,M[1]-ny*wm*1.04,C[0]-nx*w0,C[1]-ny*w0);ctx.closePath();ctx.fill();
  ctx.strokeStyle='rgba(8,10,18,.45)';ctx.lineWidth=3;
  for(const k of[0.06,0.15,0.27,0.42]){const px=C[0]+dx*k,py=C[1]+dy*k,w=lerp(w0,w1,k)*0.85;ctx.beginPath();ctx.moveTo(px+nx*w,py+ny*w);ctx.quadraticCurveTo(px+ux*16,py+uy*16,px-nx*w*0.55,py-ny*w*0.55);ctx.stroke();}
  ctx.strokeStyle='rgba(255,186,120,.5)';ctx.lineWidth=2.4;ctx.beginPath();ctx.moveTo(C[0]-nx*(w0-2),C[1]-ny*(w0-2));ctx.quadraticCurveTo(M[0]-nx*(wm*1.04-2),M[1]-ny*(wm*1.04-2),E[0]-nx*(w1-2),E[1]-ny*(w1-2));ctx.stroke();
  for(let i=0;i<18;i++){const k=0.03+rb()*0.45,s=(rb()-0.5)*1.6,w=lerp(w0,w1,k)*0.9,px=C[0]+dx*k+nx*w*s,py=C[1]+dy*k+ny*w*s,rr=1+rb()*1.6;
    ctx.fillStyle='rgba(200,215,245,.38)';circle(ctx,px,py,rr);ctx.fill();ctx.fillStyle='rgba(255,255,255,.5)';circle(ctx,px-rr*0.3,py-rr*0.3,rr*0.4);ctx.fill();}
  /* the cuff */
  ctx.lineCap='butt';ctx.strokeStyle='#2f374d';ctx.lineWidth=16;ctx.beginPath();ctx.moveTo(C[0]+nx*(w0+3),C[1]+ny*(w0+3));ctx.lineTo(C[0]-nx*(w0+3),C[1]-ny*(w0+3));ctx.stroke();
  ctx.strokeStyle='rgba(255,196,140,.35)';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(C[0]-ux*8+nx*(w0+2),C[1]-uy*8+ny*(w0+2));ctx.lineTo(C[0]-ux*8-nx*(w0+2),C[1]-uy*8-ny*(w0+2));ctx.stroke();
  ctx.lineCap='round';
  /* the fingers, far (little finger) to near (index), flat and a little cupped */
  const FL=[58,76,86,79],FW=[11,12.5,13.5,13.5],tips=[];
  for(let i=0;i<4;i++){const bx=kx+4,by=ky-15+i*10.4,len=FL[i],tx=bx-len,ty=by+6+i*0.6,mx=bx-len*0.55,my=by-3;
    ctx.strokeStyle=edge;ctx.lineWidth=FW[i]+2.6;ctx.beginPath();ctx.moveTo(bx,by);ctx.quadraticCurveTo(mx,my,tx,ty);ctx.stroke();
    ctx.strokeStyle=i===0?mixHex(HIS.skin,HIS.skinSh,0.45):i===1?mixHex(HIS.skin,HIS.skinSh,0.2):HIS.skin;ctx.lineWidth=FW[i];ctx.beginPath();ctx.moveTo(bx,by);ctx.quadraticCurveTo(mx,my,tx,ty);ctx.stroke();
    ctx.fillStyle=HIS.nail;ell(ctx,tx+5,ty-1.5,4.8,FW[i]*0.3,-0.1);ctx.fill();
    ctx.strokeStyle='rgba(120,70,50,.22)';ctx.lineWidth=1;ctx.beginPath();ctx.arc(bx-len*0.48,by-1.2,3,-1.1,1.1);ctx.stroke();
    tips.push([tx,ty]);}
  /* the back of the hand */
  ctx.fillStyle=HIS.skin;ctx.beginPath();ctx.moveTo(kx+108,ky-21);ctx.bezierCurveTo(kx+66,ky-29,kx+24,ky-27,kx+2,ky-21);ctx.quadraticCurveTo(kx-9,ky-2,kx+2,ky+19);ctx.bezierCurveTo(kx+34,ky+27,kx+78,ky+28,kx+110,ky+24);ctx.closePath();ctx.fill();
  ctx.fillStyle='rgba(120,70,50,.14)';ctx.beginPath();ctx.moveTo(kx+2,ky+6);ctx.bezierCurveTo(kx+40,ky+14,kx+80,ky+16,kx+110,ky+12);ctx.lineTo(kx+110,ky+24);ctx.bezierCurveTo(kx+78,ky+28,kx+34,ky+27,kx+2,ky+19);ctx.closePath();ctx.fill();
  for(let i=0;i<4;i++){ctx.fillStyle='rgba(255,228,205,.32)';ell(ctx,kx+7,ky-15+i*10.4,5,3.3);ctx.fill();ctx.strokeStyle='rgba(150,95,70,.2)';ctx.lineWidth=1.4;ctx.beginPath();ctx.moveTo(kx+96,ky-8+i*5);ctx.lineTo(kx+16,ky-15+i*10.4);ctx.stroke();}
  /* the thumb, nearest */
  ctx.strokeStyle=edge;ctx.lineWidth=17;ctx.beginPath();ctx.moveTo(kx+84,ky+16);ctx.quadraticCurveTo(kx+52,ky+34,kx+24,ky+36);ctx.stroke();
  ctx.strokeStyle=HIS.skin;ctx.lineWidth=14.5;ctx.beginPath();ctx.moveTo(kx+84,ky+16);ctx.quadraticCurveTo(kx+52,ky+34,kx+24,ky+36);ctx.stroke();
  ctx.fillStyle=HIS.nail;ell(ctx,kx+28,ky+34,5,4,-0.2);ctx.fill();
  /* the lamp behind her catching the top edge */
  ctx.strokeStyle='rgba(255,196,130,.55)';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(kx+108,ky-21);ctx.bezierCurveTo(kx+66,ky-29,kx+24,ky-27,kx+2,ky-21);ctx.stroke();
  ctx.beginPath();ctx.moveTo(kx+2,ky-21);ctx.quadraticCurveTo(kx-28,ky-24,kx-52,ky-15);ctx.stroke();
  /* water: beads, splashes, a drop gathering at the fingertips and falling */
  for(let i=0;i<10;i++){const px=kx+8+rb()*96,py=ky-18+rb()*36,rr=1.1+rb()*1.5,tw=0.6+0.4*Math.sin(lt*2.3+i*1.9);
    ctx.fillStyle=`rgba(225,235,255,${(0.5*tw).toFixed(3)})`;circle(ctx,px,py,rr);ctx.fill();ctx.fillStyle=`rgba(255,255,255,${(0.8*tw).toFixed(3)})`;circle(ctx,px-rr*0.35,py-rr*0.35,rr*0.42);ctx.fill();}
  ctx.lineWidth=1.2;
  for(let i=0;i<8;i++){const px=kx-40+rb()*140,py=ky-16+rb()*26,ph=rb(),u=(lt*1.9+ph)%1;if(u>0.24)continue;const k=u/0.24,a=(1-k)*0.85;
    ctx.strokeStyle=`rgba(230,240,255,${a.toFixed(3)})`;ctx.fillStyle=`rgba(240,246,255,${a.toFixed(3)})`;
    for(const q of[-1,-0.45,0.45,1]){const ex=px+q*9*k,ey=py-(5+5*(1-Math.abs(q)))*Math.sin(k*Math.PI*0.9);ctx.beginPath();ctx.moveTo(px,py);ctx.lineTo(ex,ey);ctx.stroke();circle(ctx,ex,ey,1.1);ctx.fill();}}
  for(const[fi,per,off]of[[2,1.35,0],[0,1.9,0.6]]){const[tx,ty]=tips[fi],p=(lt/per+off)%1;
    if(p<0.72){const s=1.4+2.0*(p/0.72);ctx.fillStyle='rgba(215,228,255,.75)';ell(ctx,tx-2,ty+6+s*0.6,s*0.8,s);ctx.fill();ctx.fillStyle='rgba(255,255,255,.8)';circle(ctx,tx-2.6,ty+5.4+s*0.4,s*0.3);ctx.fill();}
    else{const k=(p-0.72)/0.28;ctx.fillStyle=`rgba(215,228,255,${(0.8*(1-k*0.6)).toFixed(3)})`;ell(ctx,tx-2,ty+8+k*k*70,2,4.5);ctx.fill();}}
  ctx.restore();
}
/* how she looks from moment to moment in the rain (seconds into the scene) */
function mar_herLook(lt){
  const glance=smooth(16.9,17.7,lt)*(1-smooth(19.2,19.9,lt)),said=smooth(22.9,23.6,lt),hap=(lt>17.8&&lt<19.0)||(lt>23.5&&lt<25.1)||(lt>30.3&&lt<31.9);
  return{
    look:lerp(-0.3,0,smooth(16.6,17.2,lt))+0.42*glance+0.05*Math.sin(lt*0.5)*smooth(25,26,lt),
    smile:Math.min(1,lerp(0.45,0.6,smooth(19.4,20.2,lt))+0.4*glance+0.35*said),
    blush:0.6+0.35*smooth(19.5,21,lt),
    tilt:0.07*(1-smooth(16.6,17.4,lt))-0.04*glance+0.06*said*(1-smooth(26,28,lt))+0.02*Math.sin(lt*0.45),
    brow:0.3*smooth(19.6,20.2,lt)*(1-said),
    eyes:hap?'happy':undefined,
    talk:lt>20.25&&lt<22.9,
  };
}
/* his room: the window with the rain on it, the fairy lights, the call on the pillow */
function mar_roomCall(ctx,lt,A){
  ctx.save();ctx.beginPath();ctx.rect(714,64,492,402);ctx.clip();
  ctx.fillStyle=vgrad(ctx,64,466,[[0,'#121a33'],[1,'#2a3450']]);ctx.fillRect(714,64,492,402);
  ctx.fillStyle='#0d1220';for(const[x,y,w]of[[714,360,120],[820,330,90],[900,372,140],[1030,340,110],[1130,366,90]]){ctx.fillRect(x,y,w,110);}
  ctx.fillRect(714,440,492,30);
  bokeh(ctx,lt,5,363,['#ffd27a','#ffb08a'],18,40,0.45);
  mar_rain(ctx,lt,714,64,492,402,364,0.22);
  mar_rain(ctx,lt,714,64,492,402,365,0.6);
  ctx.restore();
  ctx.drawImage(A.room,0,0);
  mar_fairy(ctx,lt,700,1220,66,22,26,362,1);
  const sec=4000+Math.floor(lt),timer=Math.floor(sec/3600)+':'+String(Math.floor(sec%3600/60)).padStart(2,'0')+':'+String(sec%60).padStart(2,'0');
  glow(ctx,640,620,420,'#6fa0ff',0.16);
  ctx.save();ctx.translate(556,404);ctx.rotate(-0.2);ctx.scale(0.82,0.82);
  const S=drawPhone(ctx,0,0,PHONE.w,PHONE.h,{});
  mar_callScreen(ctx,S,lt,{name:'Fabeha',timer,sub:'WhatsApp voice call'});
  phoneTop(ctx,S,{time:'23:3'+Math.min(9,Math.floor(lt/2))});
  ctx.restore();
}
/* the lane in the rain: sky and crescent, the lane, lamps and lights, rain behind her, her, his arm, rain in front, her words */
function mar_laneShot(ctx,lt,A){
  const D=240*smooth(32.4,38.8,lt),oy=D-MRL.OY,hy=MRL.VY+D;
  const rainI=1-0.82*smooth(31,38.6,lt),glowUp=smooth(20.2,21.6,lt)*(1-0.6*smooth(27,33,lt)),clear=smooth(16,33,lt),fl=0.9+0.1*Math.sin(lt*1.3);
  /* sky, the thin crescent breaking through the clouds */
  ctx.drawImage(A.sky,0,oy);
  const mx=820,my=90+D;
  stars(ctx,lt,60,4450,Math.min(H,250+D),0.5*smooth(30,37,lt));
  ctx.save();ctx.globalCompositeOperation='screen';glow(ctx,mx,my,380,'#9fb2ff',0.05+0.1*clear);ctx.restore();
  mar_moon(ctx,mx,my,23,0.6+0.4*clear,-0.5);
  for(const c of A.clouds){ctx.globalAlpha=c.a;ctx.drawImage(c.c,c.x+lt*c.v,c.y+D);}
  ctx.globalAlpha=0.93;ctx.drawImage(A.mcl,mx-A.mcl.width*0.5+(lt-12)*16,my-A.mcl.height*0.62);ctx.globalAlpha=1;
  ctx.save();ctx.globalCompositeOperation='screen';glow(ctx,mx,my,210,'#dfe6ff',0.05+0.12*clear);glow(ctx,mx,my,64,'#fff3d0',0.08+0.3*clear);ctx.restore();
  /* the bazaar glow at the far end of the lane, then the lane */
  glow(ctx,MRL.VX,hy-14,300,'#ffae66',0.28*fl);
  ctx.drawImage(A.lane,0,oy);
  ctx.save();ctx.globalCompositeOperation='screen';
  glow(ctx,MRL.VX,hy-10,220,'#ffb978',0.22*fl);glow(ctx,MRL.VX,hy,460,'#8a90b8',0.1);
  glow(ctx,A.stall.x,A.stall.y+oy,95,'#ffd28a',0.4+0.08*Math.sin(lt*3.1));
  /* street lamps: the halo, the cone of light full of rain, the long broken reflection on the road */
  for(const L of A.lamps){const x=L.x,y=L.y+oy,R=2400/L.Z,gy=L.gy+oy,myy=Math.min(H+40,L.my+oy),k=1+0.3*glowUp;
    const ca=0.15*k*Math.min(1,L.Z/18);ctx.fillStyle=vgrad(ctx,y,gy,[[0,hexA('#ffbe7a',ca)],[1,hexA('#ffbe7a',0)]]);ctx.beginPath();ctx.moveTo(x-R*0.08,y);ctx.lineTo(x-R*1.1,gy);ctx.lineTo(x+R*1.1,gy);ctx.lineTo(x+R*0.08,y);ctx.closePath();ctx.fill();
    glow(ctx,x,y,R*1.7,'#ffaa5a',0.2*k);glow(ctx,x,y,R*0.45,'#ffe4b8',0.7);
    if(myy>gy+4){const len=myy-gy,wr=Math.min(R*0.16,40);ctx.save();ctx.translate(x,gy+len*0.42);ctx.scale(wr/(len*0.6),1);glow(ctx,0,0,len*0.6,'#ffb35c',0.36*k);ctx.restore();
      ctx.lineWidth=Math.min(2.2,Math.max(1,R*0.012));ctx.lineCap='round';
      for(let i=0;i<12;i++){const u=(i+0.5)/12,yy=gy+u*(myy-gy),ww=Math.min(70,R*(0.18+0.22*Math.abs(Math.sin(i*2.7))))*(1-0.5*u),jx=Math.sin(lt*2.4+i*2.3)*Math.min(R,120)*0.06;
        ctx.strokeStyle=hexA('#ffd29a',0.24*(1-u)*k*(0.6+0.4*Math.sin(lt*3.3+i*1.7)));ctx.beginPath();ctx.moveTo(x-ww/2+jx,yy);ctx.lineTo(x+ww/2+jx,yy);ctx.stroke();}}
  }
  /* the strings of lights: glow, and their colours lying in the puddles */
  for(const s of A.strings){const near=s.Z<=23;for(const b of s.bulbs){const tw=(0.6+0.4*Math.sin(lt*2.2+b.ph))*(1+0.35*glowUp);
    if(near)glow(ctx,b.x,b.y+oy,s.r*5,b.col,0.4*tw);
    const ry=b.my+oy;if(ry<H+10&&ry>hy){ctx.fillStyle=hexA(b.col,0.22*tw);ctx.fillRect(b.x-s.r*0.7,ry-s.r*3,s.r*1.4,s.r*6);}}}
  ctx.restore();
  for(const L of A.lamps){ctx.fillStyle='#fff3d6';circle(ctx,L.x,L.y+oy,Math.max(1.2,MRL.F*0.12/L.Z));ctx.fill();}
  for(const s of A.strings){for(const b of s.bulbs){ctx.fillStyle=b.col;circle(ctx,b.x,b.y+oy,s.r);ctx.fill();}}
  ctx.fillStyle='#fff1cc';circle(ctx,A.stall.x,A.stall.y+oy,3.2);ctx.fill();
  /* rain behind her: the fine far rain, the rain lit gold inside each lamp's light, splashes on the road */
  mar_streaks(ctx,lt,Math.round(230*rainI),4401,{len:[9,18],sp:[650,850],lw:1,col:'rgba(190,206,236,.24)'});
  for(const L of A.lamps){const x=L.x,y=L.y+oy,R=2400/L.Z*1.3;if(y<-R*1.4||y>H+R)continue;
    ctx.save();ctx.beginPath();ctx.arc(x,y+R*0.4,R,0,TAU);ctx.clip();mar_streaks(ctx,lt,Math.round(46*rainI),4410+L.Z,{x0:x-R-40,x1:x+R+140,y0:y-R*0.8,y1:y+R*1.6,len:[10,20],sp:[600,820],lw:1.2,col:'rgba(255,212,160,.55)'});ctx.restore();}
  mar_splashes(ctx,lt,Math.round(90*rainI),4420,hy+6,H,0.5);
  /* the night closing in at the edges of the frame */
  const vg=ctx.createRadialGradient(MRL.VX-60,hy-20,240,MRL.VX-60,hy-20,980);vg.addColorStop(0,'rgba(5,6,14,0)');vg.addColorStop(0.55,'rgba(5,6,14,.22)');vg.addColorStop(1,'rgba(5,6,14,.6)');
  ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);
  /* her: close, in the rain, drawn offscreen so the wet night and the lamp behind her can light her */
  const herD=D*3.2,X=590,Y=440+herD+Math.sin(lt*1.1)*1.5,S=1.85,OX=230,OYf=125,fa=smooth(10.2,13.4,lt);
  if(Y-140<H&&fa>0){
    ctx.save();ctx.globalCompositeOperation='screen';glow(ctx,X+30,Y-40,300,'#ffb070',0.14*fa*(1+0.5*glowUp));ctx.restore();   /* the lane's warm light behind her head */
    const f=A.fg,FW=A.fig.width,FH=A.fig.height,e=mar_herLook(lt);
    f.save();f.globalCompositeOperation='source-over';f.clearRect(0,0,FW,FH);
    drawFabeha(f,OX,OYf,S,{t:lt,outfit:'kurta',hair:'down',len:232,wind:0.42+0.12*Math.sin(lt*0.6),look:e.look,smile:e.smile,blush:e.blush,tilt:e.tilt,brow:e.brow,eyes:e.eyes,talk:e.talk});
    /* wet hair: a sheen on the crown, beads of rain caught in it */
    f.save();f.translate(OX,OYf);f.scale(S,S);
    f.strokeStyle='rgba(205,220,255,.3)';f.lineWidth=2.2;f.beginPath();f.arc(0,-14,40,Math.PI*1.22,Math.PI*1.7);f.stroke();
    f.strokeStyle='rgba(205,220,255,.14)';f.lineWidth=1.4;f.beginPath();f.arc(-2,-12,38,Math.PI*1.12,Math.PI*1.32);f.stroke();
    const rb=rng(4077);
    for(let i=0;i<20;i++){let xx,yy;if(i<8){const an=Math.PI*(1.18+rb()*0.64),rr=39+rb()*7;xx=Math.cos(an)*rr;yy=-12+Math.sin(an)*rr;}else{const sd=rb()<0.5?-1:1;yy=rb()*110;xx=sd*(42+rb()*8);}
      const s=0.8+rb()*1.1,tw=0.6+0.4*Math.sin(lt*2+i*1.3);f.fillStyle=`rgba(220,232,255,${(0.55*tw).toFixed(3)})`;circle(f,xx,yy,s);f.fill();f.fillStyle=`rgba(255,255,255,${(0.85*tw).toFixed(3)})`;circle(f,xx-s*0.3,yy-s*0.35,s*0.42);f.fill();}
    f.restore();
    /* the night on her, and warm light from the lamps and the bazaar behind her right shoulder */
    f.globalCompositeOperation='source-atop';f.fillStyle='rgba(24,32,70,.2)';f.fillRect(0,0,FW,FH);
    f.fillStyle=hgrad(f,150,FW,[[0,'rgba(255,170,100,0)'],[1,'rgba(255,170,100,.2)']]);f.fillRect(0,0,FW,FH);
    f.restore();
    const g=A.rg;g.save();g.globalCompositeOperation='source-over';g.clearRect(0,0,FW,FH);g.drawImage(A.fig,0,0);
    g.globalCompositeOperation='source-in';g.fillStyle='#ffc58e';g.fillRect(0,0,FW,FH);g.globalCompositeOperation='destination-out';g.drawImage(A.fig,-7,6);g.restore();
    ctx.save();ctx.globalAlpha=fa;ctx.drawImage(A.fig,X-OX,Y-OYf);ctx.globalCompositeOperation='screen';ctx.globalAlpha=fa*(0.5+0.3*glowUp);ctx.drawImage(A.rim,X-OX,Y-OYf);ctx.restore();
  }
  /* his arm comes up at 15.8 and holds nothing over her through her words and his; lowered by 32 */
  const hin=easeOut(smooth(15.8,18.0,lt)),hout=easeIO(smooth(29.8,32.2,lt)),ha=hin*(1-hout);
  const hx=612+(1-hin)*0.58*560+hout*0.58*620+Math.sin(lt*0.9)*2.5,hk=262+(1-hin)*0.81*560+hout*0.81*620+Math.cos(lt*0.7)*2+herD;
  ctx.save();
  if(ha>0.85){ctx.beginPath();ctx.rect(-10,-10,W+20,H+20);ctx.moveTo(hx-90,hk+14);ctx.lineTo(hx+120,hk+24);ctx.lineTo(hx+100,hk+250);ctx.lineTo(hx-70,hk+240);ctx.closePath();ctx.clip('evenodd');}
  mar_streaks(ctx,lt,Math.round(150*rainI),4402,{len:[24,44],sp:[900,1150],lw:1.4,col:'rgba(212,224,246,.3)'});
  ctx.restore();
  if(hin>0&&hout<1)mar_rainHand(ctx,lt,hx,hk);
  mar_streaks(ctx,lt,Math.round(28*rainI),4403,{len:[70,130],sp:[1500,1900],lw:2.6,col:'rgba(222,232,250,.15)'});
  /* her words, big, in the upper frame */
  mar_bigLine(ctx,'Yes. I am in love with you. Ready for everything.',smooth(20.2,21.0,lt)*(1-smooth(24.8,25.6,lt)),{y:150,label:'Fabeha · chaand raat'});
}
scene({id:'eidrain',name:'20 March · chaand raat',when:'2026-03-20T23:30',bars:12,fin:['#000000',1.4],fout:['#000000',1.4],
  note:'chaand raat: the call past the hour, rain running down his window under the fairy lights; then the room dissolves into the rain — a Karachi lane strung with chaand-raat lights, the wet road full of lamplight, a thin crescent breaking through the clouds — and she is there, close, hair wet, while his hand holds nothing over her like an umbrella that isn’t there; she says it, and the camera rises to the moon.',
  tag:'“Yes. I am in love with you. Ready for everything.” · on the call, 20 March',
  prep(){
    /* his room */
    const c=mk(W,H),g=c.getContext('2d'),r=rng(361);
    g.fillStyle=vgrad(g,0,H,[[0,'#0b0e1a'],[1,'#1a1626']]);g.fillRect(0,0,W,H);
    g.fillStyle='rgba(255,255,255,.025)';for(let i=0;i<70;i++){ell(g,r()*W,r()*H,40+r()*120,10+r()*30);g.fill();}
    g.fillStyle='#17141f';g.fillRect(0,0,120,560);g.fillStyle='#211c2c';g.fillRect(120,0,8,560);
    g.fillStyle='#2a2438';g.fillRect(200,300,400,10);g.fillStyle='#3a3350';rrect(g,230,250,60,50,6);g.fill();g.fillStyle='#4a2f3a';rrect(g,300,262,40,38,4);g.fill();g.fillStyle='#2f3f5a';rrect(g,350,256,46,44,4);g.fill();
    g.fillStyle='#2a2438';g.fillRect(700,50,520,430);g.clearRect(714,64,492,402);
    g.fillStyle='#2a2438';g.fillRect(954,64,10,402);g.fillRect(714,260,492,10);
    g.fillStyle='#352c44';g.fillRect(690,480,540,16);g.fillStyle='rgba(0,0,0,.3)';g.fillRect(690,496,540,10);
    g.fillStyle='#2e2a3e';g.beginPath();g.moveTo(0,560);g.quadraticCurveTo(640,500,W,560);g.lineTo(W,H);g.lineTo(0,H);g.closePath();g.fill();
    g.fillStyle='rgba(255,255,255,.04)';for(let i=0;i<30;i++){ell(g,r()*W,560+r()*160,60+r()*120,8+r()*14);g.fill();}
    g.fillStyle='#cfc8dc';rrect(g,280,400,560,330,80);g.fill();g.fillStyle='rgba(0,0,0,.08)';rrect(g,300,422,520,286,64);g.fill();g.fillStyle='rgba(255,255,255,.18)';rrect(g,310,412,500,44,30);g.fill();
    const rb=mk(W,H),fig=mk(460,480),rim=mk(460,480),lane=mar_buildLane();
    return{room:c,rb,rbg:rb.getContext('2d'),fig,fg:fig.getContext('2d'),rim,rg:rim.getContext('2d'),sky:mar_buildSky(),lane:lane.c,lamps:lane.lamps,strings:lane.strings,stall:lane.stall,
      clouds:[
        {c:makeCloud(4101,560,150,{hi:'#59648c',sh:'#151a2c',n:30}),x:-150,y:-30,v:3,a:0.9},
        {c:makeCloud(4105,500,130,{hi:'#4f5a80',sh:'#141a2b',n:26}),x:-60,y:170,v:3.5,a:0.75},
        {c:makeCloud(4104,460,120,{hi:'#4a5478',sh:'#141828',n:26}),x:1000,y:150,v:2,a:0.8},
        {c:makeCloud(4102,640,170,{hi:'#4e5a82',sh:'#13182a',n:32}),x:260,y:-270,v:4,a:0.85},
        {c:makeCloud(4103,520,140,{hi:'#56628a',sh:'#151a2c',n:28}),x:960,y:-200,v:2.5,a:0.85}],
      mcl:makeCloud(4106,420,130,{hi:'#6c78a2',sh:'#1b2136',n:30})};
  },
  draw(ctx,lt,A){
    if(lt>9.6)mar_laneShot(ctx,lt,A);
    /* the room, pushing slowly toward the window, then through the glass into the rain */
    const ra=1-smooth(9.8,13.2,lt);
    if(ra>0){
      mar_roomCall(A.rbg,lt,A);
      const z=1+0.05*smooth(0,9.6,lt)+1.5*Math.pow(smooth(9.6,13.2,lt),2);
      ctx.save();ctx.globalAlpha=ra;ctx.translate(960,265);ctx.scale(z,z);ctx.translate(-960,-265);ctx.drawImage(A.rb,0,0);ctx.restore();
    }
  },
  subs:[
    [0.6,5.4,'Chaand raat, the twentieth of March. Rain on her window in Karachi, and on mine.'],
    [5.9,9.4,'We were on a call, past the hour.'],
    [20.2,24.8,'Yes. I am in love with you. Ready for everything.','her'],
    [25.8,29.6,'On the phone it felt like this: the two of us, standing in the same rain.'],
    [30.0,33.6,'It made my day. It made my year.'],
  ],
  score({hit,melody,bars,pad,T,THEME_B,THEME_B_CH}){
    /* the call: soft strings, a slow piano */
    bars(0,3,['Em','Cmaj7','G'],{strings:true,padVel:0.3,arp:[0,2,3,null,4,3,2,null],arpVel:0.12});
    /* into the rain: a swell, then her theme on the flute over strings, the piano under her words */
    hit(9.4,'swell',{dur:3.4,vel:0.42});
    bars(3,8,THEME_B_CH,{strings:true,padVel:0.42});
    for(let b=3;b<11;b++)melody(b,b-3,'flute',0,b>=6&&b<8?0.46:0.4,THEME_B);
    for(let b=6;b<10;b++)melody(b,b-3,'piano',-12,0.2,THEME_B);
    hit(17.6,'swell',{dur:2.6,vel:0.28});
    /* she says it */
    hit(20.2,'chime',{midi:83,vel:0.42});hit(20.75,'chime',{midi:88,vel:0.3});hit(21.3,'chime',{midi:91,vel:0.22});
    hit(30.0,'chime',{midi:86,vel:0.26});
    /* the moon: an open G, three notes falling */
    pad(T(11),'Gmaj7',1.1,0.3,'strings');
    hit(36.8,'piano',{midi:79,dur:1.6,vel:0.28});hit(37.6,'piano',{midi:74,dur:1.6,vel:0.24});hit(38.4,'piano',{midi:71,dur:2.2,vel:0.22});
  },
  amb(lt){const out=smooth(9.8,13,lt),slow=smooth(31,38.6,lt);return{rain:lerp(0.45,0.9,out)*(1-0.65*slow),room:0.2*(1-out),wind:(0.08+0.16*out)*(1-0.5*slow)};},
});

/* ---------- 28 March · 10:55 — promise me this ---------- */
const PROM=[
  {at:4.4, who:'me', time:'10:55',text:'pleaseeee kabhi roona nahi'},
  {at:5.2, who:'me', time:'10:56',text:'promise me this'},
  {at:7.6, who:'her',time:'10:56',text:'Han han ok'},
  {at:9.2, who:'me', time:'10:56',text:'i lit can handle sabkuch bas you being sed'},
  {at:12.4,who:'me', time:'11:05',text:'dekhu you are the most important to me ap mere baare mein sochti hai somthing which i have not received even from my parents uss haadd tak'},
  {at:16.4,who:'her',time:'11:07',text:'Ab kia ronay par bhi pabandi hai 😅😅😅🤣🤣🤣🤣🤣😭'},
  {at:19.6,who:'her',time:'11:24',text:'But koi nhi we\'ll figure it out'},
  {at:20.5,who:'her',time:'11:24',text:'Everything will end well'},
  {at:22.4,who:'me', time:'11:24',text:'inshaAllah'},
  {at:24.2,who:'her',time:'11:44',text:'Ap sonay jao'},
  {at:24.8,who:'her',time:'11:44',text:'Shabash'},
  {at:26.2,who:'me', time:'11:56',text:'ok babes'},
  {at:26.8,who:'me', time:'11:56',text:'mamdi'},
  {at:27.4,who:'me', time:'11:56',text:'pookie'},
  {at:28.0,who:'me', time:'11:56',text:'hottie'},
  {at:28.6,who:'me', time:'11:56',text:'pyaari'},
  {at:29.2,who:'me', time:'11:56',text:'masoom'},
  {at:29.9,who:'me', time:'11:56',text:'chooti baachi'},
  {at:32.0,who:'her',time:'12:01',text:'😊😊😊😊'},
];
scene({id:'promise',name:'28 March · promise me this',when:'2026-03-28T10:55',bars:10,fin:['#000000',1.2],fout:['#000000',1.2],
  note:'late morning in his room, the curtain half open: he has learned she cried that week and cannot bear it — “promise me this”; she says everything will end well, sends him to sleep, and he signs off with every name he has for her.',
  tag:'“Everything will end well” · “mamdi · pookie · pyaari · masoom · chooti baachi”',
  prep(){return rooms();},
  draw(ctx,lt,A){
    ctx.drawImage(A.morning,0,0);
    ctx.fillStyle='rgba(255,226,180,.14)';ctx.fillRect(0,0,W,H);
    ctx.save();ctx.globalCompositeOperation='screen';const lg=ctx.createLinearGradient(1000,160,300,720);lg.addColorStop(0,'rgba(255,246,215,.3)');lg.addColorStop(1,'rgba(255,246,215,0)');ctx.fillStyle=lg;ctx.beginPath();ctx.moveTo(834,74);ctx.lineTo(1206,74);ctx.lineTo(700,720);ctx.lineTo(200,720);ctx.closePath();ctx.fill();ctx.restore();
    motes(ctx,lt,36,411,'#fff6cc',1.3,0.4);
    const S=drawPhoneHand(ctx,lt,{x:475,y:120,w:330,h:700});
    chatPanel(ctx,S,PROM,lt,{name:'Fabeha',status:'online',dark:false,draft:lt>2.4&&lt<4.4?'pleaseeee kabhi roona nahi'.slice(0,Math.floor((lt-2.4)*14)):undefined});
    phoneTop(ctx,S,{time:lt<5.2?'10:55':lt<12.4?'10:56':lt<16.4?'11:05':lt<19.6?'11:07':lt<24.2?'11:24':lt<26.2?'11:44':lt<32?'11:56':'12:01'});
    if(lt>26){const a=smooth(26,28,lt)*(1-smooth(31,33,lt));bokeh(ctx,lt,22,412,['#ffd27a','#ffb3c6','#fff'],8,26,0.22*a);}
  },
  subs:[
    [0.6,4.2,'Twenty-eighth of March, late morning. I had learned that she had cried that week, and could not bear it.'],
    [4.6,6.0,'pleaseeee kabhi roona nahi','him'],
    [6.2,7.4,'promise me this','him'],
    [7.8,8.9,'Han han ok','her'],
    [9.4,11.8,'i lit can handle sabkuch bas you being sed','him'],
    [12.6,16.2,'dekhu you are the most important to me ap mere baare mein sochti hai somthing which i have not received even from my parents uss haadd tak','him'],
    [16.6,19.3,'Ab kia ronay par bhi pabandi hai 😅😅😅🤣🤣🤣🤣🤣😭','her'],
    [19.8,21.4,'But koi nhi we\'ll figure it out','her'],
    [21.6,23.0,'Everything will end well','her'],
    [23.2,24.0,'inshaAllah','him'],
    [26.4,30.6,'And then, because she had told me to go to sleep, every name I had for her.'],
    [31.4,32.9,'😊😊😊😊','her'],
  ],
  score({hit,melody,bars,THEME_B}){
    bars(0,10,['Em','Cmaj7','G','Dsus'],{padVel:0.4});
    for(let b=2;b<7;b++)melody(b,b-2,'piano',0,0.4,THEME_B);
    hit(20.5,'chime',{midi:83,vel:0.35});
    for(const m of PROM)hit(m.at,'tick',{hi:m.who==='her'});
  },
  amb(lt){return{room:0.2};},
});
