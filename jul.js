/* jul.js — July 2026: the empty chairs at Seaview, the scent, and “I was umm missing you too”. */
'use strict';

/* ---------- shared: a perfume bottle standing on (x,y), scale s ---------- */
function jul_bottle(ctx,x,y,s,o={}){
  const w=o.w||44,h=o.h||70,capH=o.capH||18,rd=o.round||8,glass=o.glass||'#d9e4ea',liq=o.liquid||'#e2a44a',cap=o.cap||'#2a2326',lv=o.level??0.78;
  ctx.save();ctx.translate(x,y);ctx.scale(s,s);
  if(o.glow)glow(ctx,0,-h*0.5,h*1.2,o.glow,o.glowA??0.22);
  ctx.fillStyle=hexA(glass,o.glassA??0.5);rrect(ctx,-w/2,-h,w,h,rd);ctx.fill();
  ctx.save();rrect(ctx,-w/2,-h,w,h,rd);ctx.clip();
  const g=ctx.createLinearGradient(0,-h*lv,0,0);g.addColorStop(0,hexA(liq,0.8));g.addColorStop(1,mixHex(liq,'#000000',0.4));ctx.fillStyle=g;ctx.fillRect(-w/2,-h*lv,w,h*lv);
  ctx.fillStyle='rgba(255,255,255,.1)';ell(ctx,0,-h*lv,w/2,3);ctx.fill();
  ctx.fillStyle='rgba(255,255,255,.4)';rrect(ctx,-w/2+4,-h+5,5,h-10,2.5);ctx.fill();
  ctx.fillStyle='rgba(255,255,255,.14)';rrect(ctx,w/2-9,-h+6,3,h-12,1.5);ctx.fill();
  ctx.restore();
  ctx.strokeStyle='rgba(255,255,255,.45)';ctx.lineWidth=1.2;rrect(ctx,-w/2,-h,w,h,rd);ctx.stroke();
  ctx.fillStyle=hexA(glass,0.75);ctx.fillRect(-w*0.18,-h-6,w*0.36,7);
  ctx.fillStyle=cap;rrect(ctx,-w*0.28,-h-6-capH,w*0.56,capH,o.capRound||4);ctx.fill();
  ctx.fillStyle='rgba(255,255,255,.2)';rrect(ctx,-w*0.28+3,-h-6-capH+3,4,capH-6,2);ctx.fill();
  if(o.label!==false){ctx.fillStyle='rgba(255,255,255,.14)';rrect(ctx,-w*0.3,-h*0.64,w*0.6,h*0.22,2);ctx.fill();}
  ctx.restore();
}

/* ---------- shared: the phone as a camera — the world painted again inside the screen, zoomed on (fx,fy) ---------- */
function jul_viewfinder(ctx,S,lt,world,o={}){
  ctx.save();rrect(ctx,S.x,S.y,S.w,S.h,S.r);ctx.clip();ctx.fillStyle='#000';ctx.fillRect(S.x,S.y,S.w,S.h);
  const vw=S.w,vh=S.w*16/9,vy=S.y+(S.h-vh)/2,shake=o.shake??1;
  ctx.save();ctx.beginPath();ctx.rect(S.x,vy,vw,vh);ctx.clip();ctx.translate(S.x+vw/2,vy+vh/2);const z=(o.zoom||1.7)*vh/H;ctx.scale(z,z);
  ctx.translate(-((o.fx??640)+Math.sin(lt*1.7)*8*shake),-((o.fy??400)+Math.cos(lt*1.3)*5*shake));world(ctx);ctx.restore();
  const cy=Math.min(S.y+S.h-80,H-150);
  ctx.textAlign='center';ctx.font='600 13px "Mulish",sans-serif';
  if(o.video){
    const rec=o.rec;
    ctx.fillStyle='rgba(0,0,0,.4)';rrect(ctx,S.x+S.w/2-48,S.y+50,96,26,13);ctx.fill();
    if(rec!=null){ctx.fillStyle=(Math.floor(lt*2)%2)?'#ff3b30':'#ff8a80';circle(ctx,S.x+S.w/2-30,S.y+63,5);ctx.fill();}
    ctx.fillStyle='#fff';ctx.fillText(rec!=null?'00:0'+Math.min(9,Math.floor(rec)):'VIDEO',S.x+S.w/2+8,S.y+68);
    if(o.count){ctx.fillStyle='rgba(0,0,0,.4)';rrect(ctx,S.x+S.w-72,S.y+50,58,26,13);ctx.fill();ctx.fillStyle='#fff';ctx.fillText(o.count,S.x+S.w-43,S.y+68);}
    ctx.strokeStyle='#fff';ctx.lineWidth=3;circle(ctx,S.x+S.w/2,cy,30);ctx.stroke();
    ctx.fillStyle='#ff3b30';if(rec!=null){rrect(ctx,S.x+S.w/2-11,cy-11,22,22,5);ctx.fill();}else{circle(ctx,S.x+S.w/2,cy,22);ctx.fill();}
  }else{
    ctx.fillStyle='rgba(0,0,0,.35)';rrect(ctx,S.x+S.w/2-44,S.y+50,88,26,13);ctx.fill();ctx.fillStyle='#fff';ctx.fillText('PHOTO'+(o.count?' · '+o.count:''),S.x+S.w/2,S.y+68);
    if(o.focus){ctx.strokeStyle='#ffd60a';ctx.lineWidth=2;ctx.strokeRect(S.x+vw/2-40+o.focus[0],vy+vh/2-40+o.focus[1],80,80);}
    ctx.strokeStyle='#fff';ctx.lineWidth=3;circle(ctx,S.x+S.w/2,cy,30);ctx.stroke();ctx.fillStyle='#fff';circle(ctx,S.x+S.w/2,cy,24*(1-0.15*(o.flash||0)));ctx.fill();
  }
  ctx.fillStyle='rgba(0,0,0,.45)';rrect(ctx,S.x+S.w/2-20,cy-70,40,24,12);ctx.fill();ctx.fillStyle='#ffd60a';ctx.font='700 12px "Mulish",sans-serif';ctx.fillText('1x',S.x+S.w/2,cy-53);
  if(o.flash>0){ctx.fillStyle=`rgba(255,255,255,${o.flash*0.9})`;ctx.fillRect(S.x,S.y,S.w,S.h);}
  ctx.restore();
}

/* ======================================================================================================
   1 July · 01:30 — Seaview after IBA: rows of empty plastic chairs on the sand, four videos of the dark
   ====================================================================================================== */
function jul_seaTile(g,px,py,t,k){
  g.fillStyle=vgrad(g,py,py+t,[[0,'#06080f'],[0.5,'#0d1526'],[0.55,'#141a2a'],[1,'#2a2724']]);g.fillRect(px,py,t,t);
  g.strokeStyle='rgba(170,190,210,.35)';g.lineWidth=1;for(let j=0;j<3;j++){g.beginPath();g.moveTo(px,py+t*0.52+j*5);g.lineTo(px+t,py+t*0.52+j*5+(j%2?2:-2));g.stroke();}
  const r=rng(710+k);for(let j=0;j<4;j++)plasticChair(g,px+14+j*(t/4)+r()*4,py+t*0.84+r()*6,0.22,'#9aa0ab');
  g.fillStyle='rgba(0,0,0,.35)';circle(g,px+t/2,py+t/2,16);g.fill();g.fillStyle='#fff';g.beginPath();g.moveTo(px+t/2-5,py+t/2-8);g.lineTo(px+t/2+8,py+t/2);g.lineTo(px+t/2-5,py+t/2+8);g.closePath();g.fill();
  g.fillStyle='rgba(255,255,255,.8)';g.font='600 10px "Mulish",sans-serif';g.textAlign='left';g.fillText('0:0'+(3+k),px+6,py+t-6);g.font='500 15px "Mulish",sans-serif';
}
const SEAV=[
  {at:0,   who:'me', time:'01:33',text:'Kursiya'},
  {at:0,   who:'me', time:'01:33',text:'Or eik bhi banda nahi'},
  {at:0,   who:'me', time:'01:34',text:'Full private beach waali feel'},
  {at:22.3,who:'me', time:'01:34',photos:4,paint:jul_seaTile},
  {at:23.4,who:'me', time:'01:34',text:'Alsoo thankyou smm for the perfeum'},
  {at:25.4,who:'me', time:'01:34',text:'Had great time with you'},
  {at:27.8,who:'her',time:'01:35',text:'I love the viewww'},
  {at:30.8,who:'her',time:'01:38',text:'Fir keepimg boundaries,  abe zam zam , braceket , necklace itni cute tasbi'},
];
scene({id:'seaview',name:'1 July · the empty chairs',when:'2026-07-01T01:30',bars:12,fin:['#000000',1.4],fout:['#000000',1.6],
  note:'half past one in the morning on the sand at Seaview, a few hours after IBA: rows of empty plastic chairs, the sea black, not one other person; four videos of the dark for her; she thanks him for the Zamzam, the bracelet, the necklace and the tasbih he brought back from Hajj.',
  tag:'“I love the viewww” · “itni cute tasbi”',
  prep(){
    const sand=makeLayer({w:1500,seed:701,y0:474,amp:9,oct:2,f0:0.007,top:'#3b3836',bottom:'#1a181b',patches:['#4a4541','#121114'],patchN:150,strokes:'#2c2927'});
    const r=rng(702),chairs=[];let row=0;
    for(const d of[0.1,0.2,0.31,0.44,0.58,0.73]){const s=0.14+d*1.4,y=478+d*d*250,sp=88*s,n=Math.min(70,Math.ceil(1500/sp)),x0=640-(n-1)/2*sp+(row++%2?sp*0.5:0);
      for(let i=0;i<n;i++){const x=x0+i*sp+(r()-0.5)*6*s;if(x<-60||x>W+60)continue;chairs.push({x,y:y+(r()-0.5)*4*s,s,col:mixHex('#3a3e4c','#dfe3e8',0.12+0.88*d*d)});}}
    chairs.push({x:430,y:700,s:1.5,col:'#dfe3e8'},{x:905,y:692,s:1.45,col:'#dfe3e8',gift:true});
    return{sand,chairs};
  },
  draw(ctx,lt,A){
    const world=g=>{
      paintSky(g,[[0,'#04050c'],[0.5,'#090d1a'],[0.9,'#141b2b']]);
      stars(g,lt,260,703,400,0.75);
      glow(g,100,400,460,'#e3a265',0.13);
      glow(g,1040,118,170,'#dfe6f0',0.2);g.fillStyle='#f1eee2';circle(g,1040,118,19);g.fill();g.fillStyle='rgba(190,196,208,.4)';circle(g,1033,112,5);g.fill();circle(g,1047,125,3);g.fill();
      drawSea(g,lt,386,476,'#0a1322','#0f1b2c','#9fb0c4');sunPath(g,lt,1040,388,476,'#aab8cc');
      const rr=rng(704);for(let i=0;i<28;i++){const x=rr()*330,y=381+rr()*4;g.fillStyle=`rgba(255,${(180+rr()*60)|0},120,${0.4+rr()*0.6})`;g.fillRect(x,y,1.5+rr()*1.5,1.5);}
      g.drawImage(A.sand.c,-40,0);
      g.fillStyle='rgba(180,200,220,.16)';g.beginPath();g.moveTo(0,478);for(let x=0;x<=W;x+=24)g.lineTo(x,476+Math.sin(x*0.02+lt*1.3)*3);g.lineTo(W,490);g.lineTo(0,490);g.closePath();g.fill();
      for(const c of A.chairs){plasticChair(g,c.x,c.y,c.s,c.col);
        if(c.gift){g.save();g.translate(c.x+6,c.y-26*c.s);g.rotate(0.12);g.fillStyle='#2a2230';rrect(g,-20,-26,40,26,4);g.fill();g.fillStyle='#c9a24a';g.fillRect(-20,-16,40,2);g.restore();}}
    };
    ctx.save();ctx.translate(Math.sin(lt*0.25)*6,Math.cos(lt*0.2)*3);world(ctx);ctx.restore();
    const up=smooth(15.4,16.8,lt)*(1-smooth(34.8,36.2,lt));
    if(up>0.01){
      const py=lerp(820,120,easeOut(up));
      glow(ctx,640,660,300,'#8fc4ff',0.12*up);
      const S=drawPhoneHand(ctx,lt,{x:475,y:py,w:330,h:700});
      if(lt<22.0){
        const recOn=lt>=17.2&&lt<21.6,k=clamp(Math.floor((lt-17.2)/1.1),0,3),rec=recOn?(lt-17.2)%1.1:null;
        jul_viewfinder(ctx,S,lt,world,{video:true,rec,count:recOn?(k+1)+' / 4':null,fx:640,fy:470,zoom:1.6});
        phoneTop(ctx,S,{time:'01:34'});
      }else{
        chatPanel(ctx,S,SEAV,lt,{name:'Fabeha',status:'online'});
        phoneTop(ctx,S,{time:lt<27.8?'01:34':lt<30.8?'01:35':'01:38'});
      }
    }
  },
  subs:[
    [0.8,4.8,'1 July, half past one in the morning. Seaview, a few hours after IBA.'],
    [5.2,9.4,'Rows of plastic chairs on the sand, the sea black, and not one other person.'],
    [9.8,11.6,'Kursiya','him'],
    [11.8,13.8,'Or eik bhi banda nahi','him'],
    [14.0,16.4,'Full private beach waali feel','him'],
    [17.2,20.6,'I filmed the dark for her. Four videos.'],
    [23.6,25.6,'Alsoo thankyou smm for the perfeum','him'],
    [25.8,27.4,'Had great time with you','him'],
    [28.0,30.2,'I love the viewww','her'],
    [31.0,34.6,'Fir keepimg boundaries,  abe zam zam , braceket , necklace itni cute tasbi','her'],
    [35.2,39.4,'For her: Zamzam, a bracelet, a necklace, a tasbih from Makkah. For me: her perfume, and an empty beach.'],
  ],
  score({T,hit,add,melody,arp,bars,THEME_B}){
    bars(0,12,['Em','Cmaj7','G','Dsus'],{strings:true,padVel:0.42});
    for(let b=2;b<11;b++)arp(b,['Em','Cmaj7','G','Dsus'][b%4],0.13,[0,null,2,null,3,null,4,null],0.5);
    for(let b=4;b<8;b++)melody(b,b-4,'box',12,0.34,THEME_B);
    hit(22.3,'tick',{});hit(23.4,'tick',{});hit(25.4,'tick',{});hit(27.8,'tick',{hi:true});hit(30.8,'tick',{hi:true});
    add(T(11),'chime',{midi:88,vel:0.28});
  },
  amb(lt){return{waves:0.85,wind:0.25};},
});

/* ---------- shared: eased keyframes [time,{numbers…, eyes},dur] → the values at lt ---------- */
function jul_pose(lt,keys,dur=0.7){
  let cur=Object.assign({},keys[0][1]);
  for(let i=1;i<keys.length;i++){const[t0,v,d]=keys[i];if(lt<t0)break;const b=smooth(t0,t0+(d??dur),lt),nx={};
    for(const k in v)nx[k]=typeof v[k]==='number'?lerp(cur[k]??v[k],v[k],b):(b>0.5?v[k]:cur[k]);
    for(const k in cur)if(!(k in nx))nx[k]=b>0.5?undefined:cur[k];
    cur=nx;}
  return cur;
}

/* ======================================================================================================
   1 July · 17:10 — Safeet, the café on campus: a small table in the late sun, fries and two bottles of water
   ====================================================================================================== */
/* a 500 ml water bottle standing on (x,y), height h; the low sun is behind it, to the left */
function jul_water(ctx,x,y,h,o={}){
  const w=h*0.3,nk=h*0.15,cp=h*0.08,lv=o.level??0.8;
  const path=()=>{ctx.beginPath();ctx.moveTo(-w/2+3,0);ctx.lineTo(w/2-3,0);ctx.quadraticCurveTo(w/2,0,w/2,-3);ctx.lineTo(w/2,-h*0.6);
    ctx.bezierCurveTo(w/2,-h*0.72,nk/2,-h*0.76,nk/2,-h*0.84);ctx.lineTo(nk/2,-h+cp);ctx.lineTo(-nk/2,-h+cp);ctx.lineTo(-nk/2,-h*0.84);
    ctx.bezierCurveTo(-nk/2,-h*0.76,-w/2,-h*0.72,-w/2,-h*0.6);ctx.lineTo(-w/2,-3);ctx.quadraticCurveTo(-w/2,0,-w/2+3,0);ctx.closePath();};
  ctx.save();ctx.translate(x,y);
  ctx.fillStyle='rgba(84,48,26,.26)';ctx.beginPath();ctx.moveTo(-w*0.5,0);ctx.lineTo(w*0.5,-1);ctx.lineTo(w*0.45+h*0.46,h*0.11);ctx.lineTo(h*0.42,h*0.15);ctx.closePath();ctx.fill();
  ctx.save();ctx.globalCompositeOperation='screen';ctx.fillStyle='rgba(150,205,255,.35)';ell(ctx,w*0.3+h*0.26,h*0.09,w*0.42,h*0.025,0.24);ctx.fill();ctx.restore();
  path();ctx.fillStyle='rgba(205,230,245,.38)';ctx.fill();
  ctx.save();path();ctx.clip();
  ctx.fillStyle=vgrad(ctx,-h*lv,0,[[0,'rgba(175,215,238,.4)'],[1,'rgba(110,170,215,.6)']]);ctx.fillRect(-w/2,-h*lv,w,h*lv);
  ctx.fillStyle='rgba(255,255,255,.6)';ctx.fillRect(-w/2,-h*lv,w,1.5);
  ctx.strokeStyle='rgba(255,255,255,.28)';ctx.lineWidth=1;for(let k=0;k<5;k++){const yy=-h*0.07-k*h*0.034;ctx.beginPath();ctx.moveTo(-w/2,yy);ctx.quadraticCurveTo(0,yy+3,w/2,yy);ctx.stroke();}
  ctx.fillStyle=o.label||'#2f7fc8';ctx.fillRect(-w/2,-h*0.5,w,h*0.19);
  ctx.fillStyle='rgba(255,255,255,.9)';ctx.beginPath();ctx.moveTo(-w/2,-h*0.4);for(let k=0;k<=8;k++)ctx.lineTo(-w/2+k*w/8,-h*0.4+Math.sin(k*1.4)*h*0.012);ctx.lineTo(w/2,-h*0.37);ctx.lineTo(-w/2,-h*0.37);ctx.closePath();ctx.fill();
  ctx.fillStyle='rgba(20,50,90,.16)';ctx.fillRect(w*0.18,-h,w*0.32,h);
  ctx.fillStyle='rgba(255,255,255,.6)';ctx.fillRect(-w/2+w*0.13,-h*0.8,w*0.09,h*0.74);
  ctx.fillStyle='rgba(255,246,220,.35)';ctx.fillRect(-w/2,-h,w*0.07,h);
  ctx.restore();
  path();ctx.strokeStyle='rgba(255,255,255,.5)';ctx.lineWidth=1.1;ctx.stroke();
  ctx.fillStyle=o.cap||'#2a6fc0';rrect(ctx,-nk/2-2,-h,nk+4,cp,2);ctx.fill();
  ctx.fillStyle='rgba(255,255,255,.35)';ctx.fillRect(-nk/2,-h+2,2,cp-4);
  ctx.fillStyle='rgba(30,60,110,.5)';ctx.fillRect(-nk/2-1,-h+cp,nk+2,2.5);
  ctx.restore();
}
/* a red-and-white paper boat of fries; (x,y) = the middle of its front rim */
function jul_fries(g,x,y,s){
  g.save();g.translate(x,y);g.scale(s,s);
  g.fillStyle='rgba(84,48,26,.28)';g.beginPath();g.moveTo(-92,40);g.lineTo(92,40);g.lineTo(150,62);g.lineTo(-40,66);g.closePath();g.fill();
  g.fillStyle='#efe4d2';g.beginPath();g.moveTo(-96,2);g.lineTo(96,2);g.lineTo(88,-16);g.lineTo(-88,-16);g.closePath();g.fill();
  const r=rng(905),fr=[];
  for(let i=0;i<58;i++){const fx=(r()*2-1)*84,top=30*(1-(fx/92)**2);fr.push({fx,fy:4-r()*top,len:34+r()*24,a:(r()-0.5)*2.6,c:['#f2c25a','#e8b043','#f6d47c','#d9a03a'][i%4]});}
  fr.sort((p,q)=>p.fy-q.fy);
  for(const f of fr){g.save();g.translate(f.fx,f.fy);g.rotate(f.a);g.fillStyle=f.c;rrect(g,-f.len/2,-3.6,f.len,7.2,2.6);g.fill();
    g.fillStyle='rgba(255,250,215,.45)';g.fillRect(-f.len/2+2,-3,f.len-4,1.8);g.fillStyle='rgba(140,80,25,.3)';g.fillRect(-f.len/2+2,1.6,f.len-4,1.6);g.restore();}
  g.save();g.beginPath();g.moveTo(-100,2);g.lineTo(100,2);g.lineTo(88,40);g.lineTo(-88,40);g.closePath();g.clip();
  g.fillStyle='#f6f0e6';g.fillRect(-100,2,200,40);g.fillStyle='#c93a30';
  for(let k=-7;k<8;k++){g.beginPath();g.moveTo(k*14-4,2);g.lineTo(k*14+3,2);g.lineTo(k*12.4+2.4,40);g.lineTo(k*12.4-3.6,40);g.closePath();g.fill();}
  g.fillStyle=vgrad(g,2,40,[[0,'rgba(255,240,210,.15)'],[1,'rgba(60,20,10,.22)']]);g.fillRect(-100,2,200,40);
  g.restore();
  g.strokeStyle='rgba(255,255,255,.75)';g.lineWidth=2;g.beginPath();g.moveTo(-99,2);g.lineTo(99,2);g.stroke();
  g.restore();
}
/* the white plastic chair across the table; (x,y) = the front of its seat */
function jul_chair(g,x,y,s){
  g.save();g.translate(x,y);g.scale(s,s);
  const back=()=>{g.beginPath();g.moveTo(-96,-24);g.lineTo(-106,-168);g.quadraticCurveTo(-104,-198,-72,-200);g.lineTo(72,-200);g.quadraticCurveTo(104,-198,106,-168);g.lineTo(96,-24);g.closePath();};
  back();g.fillStyle=vgrad(g,-200,-24,[[0,'#f6f3ec'],[1,'#d6d0c6']]);g.fill();
  g.save();back();g.clip();
  g.fillStyle='rgba(150,135,120,.35)';for(let k=0;k<4;k++){rrect(g,-74,-164+k*30,148,11,5.5);g.fill();}
  g.fillStyle=hgrad(g,10,108,[[0,'rgba(120,100,90,0)'],[1,'rgba(120,100,90,.22)']]);g.fillRect(10,-202,100,180);
  g.restore();
  g.strokeStyle='rgba(255,238,205,.9)';g.lineWidth=3;g.beginPath();g.moveTo(-98,-40);g.lineTo(-106,-168);g.quadraticCurveTo(-104,-198,-72,-200);g.lineTo(30,-200);g.stroke();
  g.fillStyle='#e4dfd6';rrect(g,-114,-30,228,26,10);g.fill();
  g.restore();
}
/* a soft pastel kurta: embroidery on the 'home' top, in her local units */
function jul_kurta(ctx,x,y,s){
  ctx.save();ctx.translate(x,y);ctx.scale(s,s);
  ctx.strokeStyle='rgba(255,255,255,.7)';ctx.lineWidth=1.2;ctx.beginPath();ctx.moveTo(-9,67);ctx.lineTo(-7,126);ctx.moveTo(9,67);ctx.lineTo(7,126);ctx.stroke();
  ctx.fillStyle='#fffaf4';for(let yy=74;yy<124;yy+=7){circle(ctx,0,yy,1.3);ctx.fill();}
  for(let k=0;k<11;k++){const a=0.12*Math.PI+k/10*0.76*Math.PI;circle(ctx,Math.cos(a)*19,60+Math.sin(a)*9,1.1);ctx.fill();}
  for(const[fx,fy]of[[-18,96],[17,102],[-14,138],[15,146],[0,166],[-19,176],[19,182]]){
    ctx.fillStyle='#fffaf4';for(let k=0;k<5;k++){const a=k*1.2566;ell(ctx,fx+Math.cos(a)*2.6,fy+Math.sin(a)*2.6,1.8,1.1,a);ctx.fill();}
    ctx.fillStyle='#e8c46a';circle(ctx,fx,fy,0.9);ctx.fill();}
  ctx.restore();
}
/* her arm in screen space: shoulder S, elbow E, wrist P; fry = {a:angle,len} held in the fingers */
function jul_arm(ctx,S,E,P,fry){
  const dx=P[0]-E[0],dy=P[1]-E[1],d=Math.hypot(dx,dy)||1,ux=dx/d,uy=dy/d,ang=Math.atan2(uy,ux);
  ctx.lineCap='round';ctx.lineJoin='round';
  ctx.fillStyle='rgba(70,38,18,.2)';ell(ctx,E[0]+8,E[1]+14,20,6);ctx.fill();
  ctx.strokeStyle='rgba(120,70,90,.22)';ctx.lineWidth=28;ctx.beginPath();ctx.moveTo(S[0]+3,S[1]+4);ctx.lineTo(E[0]+3,E[1]+4);ctx.lineTo(P[0]+3,P[1]+4);ctx.stroke();
  ctx.strokeStyle=SLEEVE.home;ctx.lineWidth=28;ctx.beginPath();ctx.moveTo(S[0],S[1]);ctx.lineTo(E[0],E[1]);ctx.stroke();
  ctx.lineWidth=24;ctx.beginPath();ctx.moveTo(E[0],E[1]);ctx.lineTo(P[0]-ux*6,P[1]-uy*6);ctx.stroke();
  ctx.strokeStyle='rgba(255,246,230,.22)';ctx.lineWidth=6;ctx.beginPath();ctx.moveTo(S[0]-8,S[1]+6);ctx.lineTo(E[0]-9,E[1]);ctx.stroke();
  ctx.strokeStyle='#f3e6ec';ctx.lineWidth=25;ctx.lineCap='butt';ctx.beginPath();ctx.moveTo(P[0]-ux*16,P[1]-uy*16);ctx.lineTo(P[0]-ux*4,P[1]-uy*4);ctx.stroke();ctx.lineCap='round';
  ctx.fillStyle='#d9a7b8';for(let k=-2;k<=2;k++){circle(ctx,P[0]-ux*10-uy*k*4.5,P[1]-uy*10+ux*k*4.5,1.2);ctx.fill();}
  const hx=P[0]+ux*10,hy=P[1]+uy*10;
  ctx.fillStyle=FB.skin;ell(ctx,hx,hy,10,14,ang-Math.PI/2);ctx.fill();
  ctx.fillStyle=hexA(FB.skinSh,0.8);ell(ctx,hx+uy*4,hy-ux*4,4,9,ang-Math.PI/2);ctx.fill();
  if(fry){ctx.save();ctx.translate(P[0]+ux*20,P[1]+uy*20);ctx.rotate(fry.a);ctx.fillStyle='#f0bf55';rrect(ctx,-2,-4,fry.len+2,8,3);ctx.fill();
    ctx.fillStyle='rgba(255,250,215,.5)';ctx.fillRect(0,-3.4,fry.len-2,2);
    if(fry.len<25){ctx.fillStyle='#f8e3a6';for(let k=0;k<3;k++){circle(ctx,fry.len,-2.6+k*2.6,1.7);ctx.fill();}}
    ctx.restore();}
  ctx.fillStyle=FB.skin;ell(ctx,hx-uy*7+ux*6,hy+ux*7+uy*6,4.5,7,ang-Math.PI/2+0.5);ctx.fill();
}
/* one of the Safeet cats, sitting, facing left */
function jul_cat(ctx,x,y,s,lt){
  ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.globalAlpha*=0.92;
  const sw=Math.sin(lt*1.4),hx=-6+(Math.sin(lt*0.35)>0.6?2:0),hy=-36,blink=(lt%5.3)<0.15;
  ctx.fillStyle='rgba(70,40,20,.22)';ell(ctx,6,1,30,6);ctx.fill();
  ctx.strokeStyle='#c27a3c';ctx.lineWidth=6;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(20,-5);ctx.quadraticCurveTo(40,-2,38+sw*8,-22-Math.abs(sw)*4);ctx.stroke();
  ctx.fillStyle='#d3884a';ell(ctx,8,-17,17,17);ctx.fill();ell(ctx,-2,-4,10,5);ctx.fill();
  ctx.fillStyle='#f4e6d2';ell(ctx,-3,-14,8,11);ctx.fill();ell(ctx,-6,-2,4,3);ctx.fill();ell(ctx,2,-2,4,3);ctx.fill();
  ctx.strokeStyle='rgba(140,70,25,.5)';ctx.lineWidth=2;for(let k=0;k<3;k++){ctx.beginPath();ctx.arc(10,-17,8+k*4,-1.1,-0.2);ctx.stroke();}
  ctx.fillStyle='#d3884a';circle(ctx,hx,hy,11);ctx.fill();
  ctx.beginPath();ctx.moveTo(hx-10,hy-4);ctx.lineTo(hx-8,hy-17);ctx.lineTo(hx-2,hy-9);ctx.closePath();ctx.fill();
  ctx.beginPath();ctx.moveTo(hx+2,hy-9);ctx.lineTo(hx+8,hy-17);ctx.lineTo(hx+10,hy-4);ctx.closePath();ctx.fill();
  ctx.fillStyle='#f0b7a6';ctx.beginPath();ctx.moveTo(hx-8,hy-6);ctx.lineTo(hx-7.4,hy-13);ctx.lineTo(hx-4,hy-8);ctx.closePath();ctx.fill();
  ctx.fillStyle='#f4e6d2';ell(ctx,hx,hy+4,6,4);ctx.fill();
  ctx.fillStyle='#2b2418';if(blink){ctx.fillRect(hx-6,hy-1,4,1.2);ctx.fillRect(hx+2,hy-1,4,1.2);}else{circle(ctx,hx-4,hy-1,1.6);ctx.fill();circle(ctx,hx+4,hy-1,1.6);ctx.fill();}
  ctx.fillStyle='#c46a5a';circle(ctx,hx,hy+3,1.2);ctx.fill();
  ctx.restore();
}
const JUL_D1K=[
  [0,   {look:-0.35,smile:0.45,tilt:-0.05,blush:0.4}],
  [5.6, {look:0.04,smile:0.8,tilt:0.02,blush:0.5},1.0],
  [10.6,{look:-0.3,smile:0.6,tilt:-0.03,blush:0.5}],
  [12.8,{look:0.08,smile:0.5,tilt:0.0,blush:0.55}],
  [14.3,{look:0.05,smile:0.18,tilt:0.03,blush:0.6},0.4],
  [15.3,{look:0.0,smile:0.95,tilt:-0.07,blush:0.8,eyes:'happy'},0.5],
  [17.6,{look:0.04,smile:0.78,tilt:0.02,blush:0.6}],
  [24.0,{look:-0.45,smile:0.6,tilt:-0.04,blush:0.55}],
  [26.4,{look:0.05,smile:0.92,tilt:0.04,blush:0.7}],
  [28.6,{look:0.05,smile:1,tilt:0.03,blush:0.7,eyes:'happy'},0.5],
  [30.2,{look:0.04,smile:0.85,tilt:0.02,blush:0.65}],
];
/* her right hand: rest → into the fries → up to her mouth → one bite → back down, still holding it */
const JUL_D1A=[
  [0,   {ex:530,ey:594,wx:556,wy:626,fa:-0.4}],
  [10.8,{ex:538,ey:596,wx:604,wy:630,fa:-0.25},1.2],
  [12.7,{ex:542,ey:588,wx:610,wy:398,fa:-0.82},1.5],
  [15.2,{ex:540,ey:590,wx:602,wy:430,fa:-1.0},1.0],
  [16.4,{ex:530,ey:594,wx:556,wy:626,fa:-0.7},1.4],
];
scene({id:'date1jul',name:'1 July · fries and water',when:'2026-07-01T17:10',bars:10,fin:['#000000',1.2],fout:['#000000',1.4],
  note:'a quarter past five at Safeet, the café on campus, the sun low behind the brick: a small table, a paper tray of fries and two bottles of water; the other chair, and then her in it; she takes one fry and has one bite.',
  tag:'“Im outside sc”',
  prep(){
    const r=rng(911),bg=mk(W,H),g=bg.getContext('2d');
    g.fillStyle=vgrad(g,0,330,[[0,'#efcf9a'],[1,'#fae9c9']]);g.fillRect(0,0,W,330);
    g.fillStyle=hgrad(g,0,W,[[0,'#d98463'],[0.5,'#bd664c'],[1,'#a2543f']]);g.fillRect(-20,120,W+40,340);
    g.fillStyle='#ecd9bd';g.fillRect(-20,110,W+40,14);g.fillStyle='rgba(60,25,15,.18)';g.fillRect(-20,124,W+40,6);
    g.strokeStyle='rgba(255,226,200,.16)';g.lineWidth=1;for(let y=134;y<456;y+=9){g.beginPath();g.moveTo(-20,y);g.lineTo(W+20,y);g.stroke();}
    for(let k=0;k<10;k++){const x=30+k*130;g.fillStyle='#5e3a33';g.beginPath();g.moveTo(x,250);g.lineTo(x,196);g.arc(x+24,196,24,Math.PI,0);g.lineTo(x+48,250);g.closePath();g.fill();g.fillStyle='rgba(255,220,170,.25)';g.fillRect(x+4,214,40,3);}
    for(let k=0;k<9;k++){const x=-40+k*160;g.fillStyle='#6b3d33';g.beginPath();g.moveTo(x,458);g.lineTo(x,350);g.arc(x+54,350,54,Math.PI,0);g.lineTo(x+108,458);g.closePath();g.fill();
      g.fillStyle='#3a2a2c';g.beginPath();g.moveTo(x+9,458);g.lineTo(x+9,352);g.arc(x+54,352,45,Math.PI,0);g.lineTo(x+99,458);g.closePath();g.fill();
      g.fillStyle='rgba(255,196,130,.28)';g.beginPath();g.moveTo(x+9,458);g.lineTo(x+40,402);g.lineTo(x+99,402);g.lineTo(x+99,458);g.closePath();g.fill();}
    g.fillStyle=vgrad(g,456,560,[[0,'#a9bf62'],[1,'#86a64e']]);g.fillRect(0,456,W,110);
    g.fillStyle='rgba(50,60,25,.22)';for(let k=0;k<6;k++){g.beginPath();g.moveTo(80+k*210,470);g.lineTo(150+k*210,470);g.lineTo(330+k*210,556);g.lineTo(220+k*210,556);g.closePath();g.fill();}
    g.fillStyle=vgrad(g,550,H,[[0,'#cdb38e'],[1,'#a88c6a']]);g.fillRect(0,552,W,H-552);
    drawTreeClump(g,150,470,330,'#3c6a34','#a7c15a',r);
    drawTreeClump(g,1190,468,240,'#3f6e38','#9cc05a',r);
    for(const[x,y]of[[150,560],[1140,556]]){g.fillStyle='#ece6db';rrect(g,x-70,y,140,10,4);g.fill();g.fillStyle='#cfc8bc';g.fillRect(x-4,y+10,8,40);}
    for(const[x,y,s]of[[60,616,0.95],[235,612,0.9],[1060,606,0.85],[1235,612,0.9]])plasticChair(g,x,y,s,'#efeae2');
    drawFigureFar(g,330,470,0.55,'#e8e0d0','#2a2024',0,1,true);drawFigureFar(g,372,472,0.55,'#5f7fae','#1f1a1c',0,2,true);drawFigureFar(g,930,468,0.5,'#c9786a','#2a2024',0,3,true);
    const bgS=softened(bg,5),h=bgS.getContext('2d');
    sunGlow(h,170,170,560,'rgba(255,236,190,0.75)');
    h.save();h.globalCompositeOperation='screen';for(let k=0;k<6;k++){const a0=0.22+k*0.16,a1=a0+0.05;h.fillStyle='rgba(255,232,185,.07)';h.beginPath();h.moveTo(170,170);h.lineTo(170+Math.cos(a0)*1500,170+Math.sin(a0)*1500);h.lineTo(170+Math.cos(a1)*1500,170+Math.sin(a1)*1500);h.closePath();h.fill();}h.restore();
    const ch=mk(W,H);jul_chair(ch.getContext('2d'),640,612,1.15);
    const tb=mk(W,H),t=tb.getContext('2d'),ex=(x0,y)=>640+(x0-640)*(y-330)/235;
    const top=()=>{t.beginPath();t.moveTo(300,565);t.lineTo(980,565);t.lineTo(ex(980,H),H);t.lineTo(ex(300,H),H);t.closePath();};
    top();t.fillStyle=vgrad(t,565,H,[[0,'#d3a46f'],[1,'#a6744b']]);t.fill();
    t.save();top();t.clip();
    const tr=rng(916);for(let i=0;i<220;i++){const y=566+Math.pow(tr(),0.8)*154,x=tr()*W,l=20+tr()*90;t.strokeStyle=tr()<0.5?'rgba(90,50,25,.1)':'rgba(255,230,190,.1)';t.lineWidth=1;t.beginPath();t.moveTo(x,y);t.lineTo(x+l,y+(tr()-0.5)*1.5);t.stroke();}
    for(const k of[1,2,3]){const y=330+235/(1-0.11*k);t.fillStyle='rgba(70,36,16,.5)';t.fillRect(0,y-1-k*0.5,W,2+k);t.fillStyle='rgba(255,226,180,.3)';t.fillRect(0,y+1+k*0.5,W,1.5);}
    const sl=t.createRadialGradient(260,560,0,260,560,620);sl.addColorStop(0,'rgba(255,224,160,.38)');sl.addColorStop(1,'rgba(255,224,160,0)');t.fillStyle=sl;t.fillRect(0,0,W,H);
    t.restore();
    t.strokeStyle='rgba(255,238,205,.85)';t.lineWidth=2;t.beginPath();t.moveTo(300,565.5);t.lineTo(980,565.5);t.stroke();
    t.strokeStyle='rgba(90,50,25,.55)';t.lineWidth=3;t.beginPath();t.moveTo(300,565);t.lineTo(ex(300,H),H);t.moveTo(980,565);t.lineTo(ex(980,H),H);t.stroke();
    const pr=mk(W,H),p=pr.getContext('2d');
    jul_water(p,860,600,118,{level:0.6});
    jul_fries(p,668,654,1.0);
    jul_water(p,1104,714,232,{level:0.86});
    const vig=mk(W,H),v=vig.getContext('2d'),vg=v.createRadialGradient(640,380,320,640,380,820);vg.addColorStop(0,'rgba(40,20,10,0)');vg.addColorStop(1,'rgba(40,20,10,.42)');v.fillStyle=vg;v.fillRect(0,0,W,H);
    return{bg:bgS,chair:ch,table:tb,props:pr,vig};
  },
  draw(ctx,lt,A){
    const pres=smooth(3.4,5.6,lt),k=jul_pose(lt,JUL_D1K),a=jul_pose(lt,JUL_D1A);
    ctx.drawImage(A.bg,0,0);
    bokeh(ctx,lt,20,912,['#ffe3a6','#ffd08a','#fff3d6','#f7b98a'],8,30,0.34);
    glow(ctx,170,170,260,'#fff4d6',0.35*(0.85+0.15*Math.sin(lt*1.3)*Math.sin(lt*0.7+1)));
    jul_cat(ctx,1004,570,0.75,lt);
    ctx.drawImage(A.chair,0,0);
    if(pres>0){
      glow(ctx,596,300,170,'#fff0c8',0.22*pres);
      drawFabeha(ctx,640,322,1.28,{t:lt,outfit:'home',hair:'down',alpha:pres,smile:k.smile,look:k.look,tilt:k.tilt+Math.sin(lt*0.5)*0.015,blush:k.blush,eyes:k.eyes,wind:0.12+0.05*Math.sin(lt*0.7),len:260});
      ctx.save();ctx.globalAlpha=pres;jul_kurta(ctx,640,322,1.28);ctx.restore();
    }
    ctx.drawImage(A.table,0,0);
    if(pres>0){ctx.save();ctx.globalAlpha=pres;ctx.translate(745,594);ctx.rotate(0.08);ctx.scale(1,0.17);const sg=ctx.createRadialGradient(0,0,0,0,0,200);sg.addColorStop(0,'rgba(70,38,18,.26)');sg.addColorStop(1,'rgba(70,38,18,0)');ctx.fillStyle=sg;ctx.fillRect(-200,-200,400,400);ctx.restore();}
    ctx.save();ctx.globalCompositeOperation='screen';const lr=rng(915);
    for(let i=0;i<9;i++){const x=200+lr()*900+Math.sin(lt*0.5+i)*8,y=590+lr()*120,R=18+lr()*30;ctx.fillStyle=`rgba(255,226,170,${(0.08+0.05*Math.sin(lt*0.8+i*2)).toFixed(3)})`;ell(ctx,x,y,R,R*0.35);ctx.fill();}
    ctx.restore();
    ctx.drawImage(A.props,0,0);
    if(pres>0){
      ctx.save();ctx.globalAlpha=pres;
      jul_arm(ctx,[716.8,439.8],[788,592],[782,626],null);
      jul_arm(ctx,[563.2,439.8],[a.ex,a.ey],[a.wx,a.wy],lt>=12.25?{a:a.fa,len:lt<14.8?30:17}:null);
      ctx.restore();
    }
    motes(ctx,lt,24,913,'#fff0c8',1.4,0.4);
    ctx.fillStyle='rgba(255,186,120,.06)';ctx.fillRect(0,0,W,H);
    ctx.drawImage(A.vig,0,0);
  },
  subs:[
    [0.8,3.2,'Im outside sc','her'],
    [5.6,10.4,'1 July. We went on a date. She was looking absolutely gorgeous.'],
    [14.0,18.2,'Fries and water. She had one bite.'],
    [19.4,23.8,'Safeet, on campus. Mostly, I just looked at her.'],
  ],
  score({T,hit,melody,bars,THEME_B,THEME_B_CH}){
    bars(0,2,['Em7','Cmaj7'],{strings:true,padVel:0.3});
    bars(2,8,THEME_B_CH,{strings:true,padVel:0.38});
    for(let b=2;b<10;b++)melody(b,b-2,'box',12,0.32,THEME_B);
    hit(14.8,'chime',{midi:88,vel:0.24});
    [2.2,9.0,20.5,27.0].forEach((t,k)=>hit(t,'bird',{f:2700+k*220}));
  },
  amb(lt){return{crowd:0.12,wind:0.14};},
});

/* ======================================================================================================
   2 July · 13:00 — she comes down the red-brick arcade in the black dress; then one hour, the light moving
   ====================================================================================================== */
/* the arcade in one-point perspective: camera at the origin, eye 1.6 m above the floor, looking down +Z */
const JA={f:700,cx:640,cy:318,XL:-2.4,XR:2.0,YF:-1.6,YC:2.0,YP:-1.1,YS:0.55,R:1.15,ZN:0.9,ZE:26,sun:[0.95,-1,-0.3]};
function jul_P(X,Y,Z){return[JA.cx+JA.f*X/Z,JA.cy-JA.f*Y/Z];}
function jul_trace(g,pts){pts.forEach((p,i)=>{const q=jul_P(p[0],p[1],p[2]);if(i)g.lineTo(q[0],q[1]);else g.moveTo(q[0],q[1]);});g.closePath();}
function jul_line(g,a,b){const p=jul_P(a[0],a[1],a[2]),q=jul_P(b[0],b[1],b[2]);g.beginPath();g.moveTo(p[0],p[1]);g.lineTo(q[0],q[1]);g.stroke();}
function jul_arches(){const o=[],{XL,YP,YS,R,ZE}=JA;
  for(let i=0;i<9;i++){const z0=2.3+3*i,z1=z0+2.3;if(z1>ZE)break;const c=(z0+z1)/2,pts=[[XL,YP,z0],[XL,YS,z0]];
    for(let k=1;k<16;k++){const th=Math.PI*k/16;pts.push([XL,YS+R*Math.sin(th),c-R*Math.cos(th)]);}
    pts.push([XL,YS,z1],[XL,YP,z1]);o.push({z0,z1,c,pts});}
  return o;}
function jul_sunOn(pts){const s=JA.sun;return pts.map(([X,Y,Z])=>{const t=(JA.YF-Y)/s[1];return[X+s[0]*t,JA.YF,Z+s[2]*t];});}
/* how much of the noon sun falls on her as she walks down the middle (x = -0.15) at depth Z */
function jul_lit(Z){let L=0;for(let i=0;i<8;i++){const c=3.45+3*i,lo=c-1.84,hi=c+0.42;L=Math.max(L,smooth(lo-0.25,lo+0.25,Z)*(1-smooth(hi-0.25,hi+0.25,Z)));}return L;}
function jul_corridor(){
  const{XL,XR,YF,YC,YP,YS,R,ZN,ZE}=JA,c=mk(W,H),g=c.getContext('2d'),r=rng(921),ops=jul_arches();
  g.fillStyle=vgrad(g,0,330,[[0,'#b4d6ee'],[1,'#eef5f0']]);g.fillRect(0,0,W,330);
  g.fillStyle=vgrad(g,322,H,[[0,'#b7d37e'],[1,'#86b45a']]);g.fillRect(0,322,W,H-322);
  for(let x=-60;x<700;x+=62)drawTreeClump(g,x+r()*30,338,70+r()*90,'#5f9b50','#b2d886',r);
  g.fillStyle='rgba(252,252,240,.4)';g.fillRect(0,0,W,H);
  const wall=()=>{g.beginPath();jul_trace(g,[[XL,YF,ZN],[XL,YF,ZE],[XL,YC,ZE],[XL,YC,ZN]]);for(const o of ops)jul_trace(g,o.pts);};
  wall();g.fillStyle=hgrad(g,-300,620,[[0,'#6b3327'],[0.7,'#9c5a47'],[1,'#c19383']]);g.fill('evenodd');
  g.save();wall();g.clip('evenodd');g.strokeStyle='rgba(45,15,10,.18)';g.lineWidth=1;for(let Y=YF;Y<YC;Y+=0.09)jul_line(g,[XL,Y,ZN],[XL,Y,ZE]);g.restore();
  for(const o of ops){
    g.fillStyle='#7c3c2f';g.beginPath();jul_trace(g,[[XL,YP,o.z1],[XL-0.45,YP,o.z1],[XL-0.45,YS,o.z1],[XL,YS,o.z1]]);g.fill();
    const so=[];for(let k=8;k<=16;k++){const th=Math.PI*k/16;so.push([XL,YS+R*Math.sin(th),o.c-R*Math.cos(th)]);}
    for(let k=16;k>=8;k--){const th=Math.PI*k/16;so.push([XL-0.45,YS+R*Math.sin(th),o.c-R*Math.cos(th)]);}
    g.fillStyle='#6e3428';g.beginPath();jul_trace(g,so);g.fill();
    g.fillStyle='#e6b48e';g.beginPath();jul_trace(g,[[XL,YP,o.z0],[XL,YP,o.z1],[XL-0.45,YP,o.z1],[XL-0.45,YP,o.z0]]);g.fill();
  }
  const rw=[[XR,YF,ZN],[XR,YF,ZE],[XR,YC,ZE],[XR,YC,ZN]];
  g.beginPath();jul_trace(g,rw);g.fillStyle=hgrad(g,660,1500,[[0,'#c49a88'],[0.3,'#a46350'],[1,'#7a3a2e']]);g.fill();
  g.save();g.beginPath();jul_trace(g,rw);g.clip();
  g.strokeStyle='rgba(45,15,10,.16)';g.lineWidth=1;for(let Y=YF;Y<YC;Y+=0.09)jul_line(g,[XR,Y,ZN],[XR,Y,ZE]);
  ops.forEach((o,i)=>{const q=R-0.15,bl=[[XR,YF,o.z0+0.15],[XR,YS,o.z0+0.15]];for(let k=1;k<16;k++){const th=Math.PI*k/16;bl.push([XR,YS+q*Math.sin(th),o.c-q*Math.cos(th)]);}bl.push([XR,YS,o.z1-0.15],[XR,YF,o.z1-0.15]);
    g.fillStyle=i===1||i===4?'rgba(60,34,22,.75)':'rgba(70,25,18,.35)';g.beginPath();jul_trace(g,bl);g.fill();});
  g.restore();
  const cl=[[XL,YC,ZN],[XR,YC,ZN],[XR,YC,ZE],[XL,YC,ZE]];
  g.beginPath();jul_trace(g,cl);g.fillStyle=vgrad(g,-200,318,[[0,'#7d7066'],[1,'#e4d9cc']]);g.fill();
  for(let i=0;i<9;i++){const z=1.6+3*i;if(z+0.7>ZE)break;g.beginPath();jul_trace(g,[[XL,YC,z],[XR,YC,z],[XR,YC,z+0.7],[XL,YC,z+0.7]]);g.fillStyle='rgba(120,70,55,.3)';g.fill();}
  const fl=[[XL,YF,ZN],[XR,YF,ZN],[XR,YF,ZE],[XL,YF,ZE]];
  g.beginPath();jul_trace(g,fl);g.fillStyle=vgrad(g,318,H,[[0,'#e3d3bd'],[1,'#a98b70']]);g.fill();
  g.save();g.beginPath();jul_trace(g,fl);g.clip();g.strokeStyle='rgba(90,55,35,.2)';g.lineWidth=1;
  for(let Z=1.0;Z<ZE;Z+=0.6)jul_line(g,[XL,YF,Z],[XR,YF,Z]);
  for(let X=XL;X<=XR+0.01;X+=0.55)jul_line(g,[X,YF,ZN],[X,YF,ZE]);
  g.restore();
  const L=mk(W,H),lg=L.getContext('2d');lg.fillStyle='rgba(255,240,205,1)';
  for(const o of ops){lg.beginPath();jul_trace(lg,jul_sunOn(o.pts));lg.fill();}
  lg.globalCompositeOperation='destination-in';lg.beginPath();jul_trace(lg,fl);lg.fillStyle='#ffffff';lg.fill();
  const V=mk(W,H),vg=V.getContext('2d');vg.fillStyle='rgba(255,236,200,.06)';
  for(const o of ops){const pp=jul_sunOn(o.pts);for(let k=0;k<o.pts.length-1;k++){vg.beginPath();jul_trace(vg,[o.pts[k],o.pts[k+1],pp[k+1],pp[k]]);vg.fill();}}
  g.save();g.globalCompositeOperation='screen';g.globalAlpha=0.6;g.drawImage(softened(L,2),0,0);g.globalAlpha=0.9;g.drawImage(softened(V,6),0,0);g.restore();
  g.beginPath();jul_trace(g,[[XL,YF,ZE],[XR,YF,ZE],[XR,YC,ZE],[XL,YC,ZE]]);g.fillStyle='#fffaf0';g.fill();
  const hz=g.createRadialGradient(640,318,0,640,318,520);hz.addColorStop(0,'rgba(255,250,236,.75)');hz.addColorStop(0.35,'rgba(255,248,232,.25)');hz.addColorStop(1,'rgba(255,248,232,0)');g.fillStyle=hz;g.fillRect(0,0,W,H);
  const vi=g.createRadialGradient(640,360,300,640,360,820);vi.addColorStop(0,'rgba(30,12,8,0)');vi.addColorStop(1,'rgba(30,12,8,.45)');g.fillStyle=vi;g.fillRect(0,0,W,H);
  return c;
}
/* the same arcade from the side: she sits on the sill of an arch, the lawn bright behind her, a clock on the pier */
const JB={op:[[250,800],[960,1510]],sp:200,top:452,fl:548};
function jul_archPath(ctx,x0,x1){const{sp,top}=JB,cx=(x0+x1)/2,rr=(x1-x0)/2;ctx.moveTo(x0,top);ctx.lineTo(x0,sp);ctx.arc(cx,sp,rr,Math.PI,0);ctx.lineTo(x1,top);ctx.closePath();}
function jul_archPts(x0,x1){const{sp,top}=JB,cx=(x0+x1)/2,rr=(x1-x0)/2,p=[[x0,top],[x0,sp]];for(let k=1;k<16;k++){const a=Math.PI+Math.PI*k/16;p.push([cx+rr*Math.cos(a),sp+rr*Math.sin(a)]);}p.push([x1,sp],[x1,top]);return p;}
function jul_side(){
  const{op,sp,top,fl}=JB,c=mk(W,H),g=c.getContext('2d'),r=rng(941);
  g.fillStyle=vgrad(g,0,330,[[0,'#a5cdea'],[1,'#eef5f0']]);g.fillRect(0,0,W,330);
  g.fillStyle='#c79482';g.fillRect(700,236,620,100);
  for(let k=0;k<6;k++){g.fillStyle='#a77566';const x=720+k*96;g.beginPath();g.moveTo(x,336);g.lineTo(x,292);g.arc(x+24,292,24,Math.PI,0);g.lineTo(x+48,336);g.closePath();g.fill();}
  for(let x=-40;x<W+40;x+=58)drawTreeClump(g,x+r()*30,340,70+r()*80,'#5f9b50','#b2d886',r);
  g.fillStyle=vgrad(g,330,fl,[[0,'#b2d27a'],[1,'#7fb057']]);g.fillRect(0,330,W,fl-330);
  for(let k=0;k<9;k++){g.fillStyle=k%2?'rgba(255,255,225,.1)':'rgba(40,80,20,.06)';g.beginPath();g.moveTo(-300+k*230,fl);g.lineTo(-180+k*230,fl);g.lineTo(140+k*130,336);g.lineTo(90+k*130,336);g.closePath();g.fill();}
  g.fillStyle='rgba(252,252,242,.3)';g.fillRect(0,0,W,fl);
  const wall=()=>{g.beginPath();g.rect(0,0,W,fl);for(const[x0,x1]of op)jul_archPath(g,x0,x1);};
  wall();g.fillStyle=vgrad(g,0,fl,[[0,'#6a3328'],[1,'#8e4837']]);g.fill('evenodd');
  g.save();wall();g.clip('evenodd');
  g.strokeStyle='rgba(40,14,8,.2)';g.lineWidth=1;for(let y=6;y<fl;y+=10){g.beginPath();g.moveTo(0,y);g.lineTo(W,y);g.stroke();}
  g.strokeStyle='rgba(40,14,8,.14)';for(let y=6,row=0;y<fl;y+=10,row++){g.beginPath();for(let x=(row%2)*14;x<W;x+=28){g.moveTo(x,y);g.lineTo(x,y+10);}g.stroke();}
  for(const[x0,x1]of op){const cx=(x0+x1)/2,rr=(x1-x0)/2;g.strokeStyle='rgba(40,14,8,.28)';g.lineWidth=1.4;
    for(let a=Math.PI;a<=TAU+0.01;a+=Math.PI/22){g.beginPath();g.moveTo(cx+Math.cos(a)*rr,sp+Math.sin(a)*rr);g.lineTo(cx+Math.cos(a)*(rr+34),sp+Math.sin(a)*(rr+34));g.stroke();}
    g.strokeStyle='rgba(30,10,6,.3)';g.lineWidth=2;g.beginPath();g.arc(cx,sp,rr+34,Math.PI,0);g.stroke();}
  g.restore();
  for(const[x0,x1]of op){const cx=(x0+x1)/2,rr=(x1-x0)/2;
    g.strokeStyle='rgba(255,206,170,.4)';g.lineWidth=7;g.beginPath();g.moveTo(x1-4,top);g.lineTo(x1-4,sp);g.arc(cx,sp,rr-4,0,-Math.PI/2,true);g.stroke();
    g.fillStyle='#d39674';g.fillRect(x0-12,top-10,x1-x0+24,12);g.fillStyle='rgba(255,236,200,.5)';g.fillRect(x0-12,top-10,x1-x0+24,3);g.fillStyle='rgba(30,10,6,.3)';g.fillRect(x0-12,top+2,x1-x0+24,5);}
  g.fillStyle='rgba(20,8,4,.3)';circle(g,884,256,50);g.fill();
  g.fillStyle='#2e2420';g.fillRect(876,192,8,12);circle(g,880,250,50);g.fill();g.fillStyle='#f6f0e3';circle(g,880,250,43);g.fill();
  g.strokeStyle='#2e2420';for(let k=0;k<12;k++){const a=k/12*TAU;g.lineWidth=k%3?1.6:3;g.beginPath();g.moveTo(880+Math.cos(a)*35,250+Math.sin(a)*35);g.lineTo(880+Math.cos(a)*41,250+Math.sin(a)*41);g.stroke();}
  g.fillStyle=vgrad(g,fl,H,[[0,'#a9876b'],[1,'#8f6e55']]);g.fillRect(0,fl,W,H-fl);
  g.strokeStyle='rgba(60,35,22,.25)';g.lineWidth=1;
  for(let k=1;k<7;k++){const y=fl+172*Math.pow(k/6,1.5);g.beginPath();g.moveTo(0,y);g.lineTo(W,y);g.stroke();}
  for(let x=-1400;x<2700;x+=150){g.beginPath();g.moveTo(640+(x-640)*(fl-300)/(H-300),fl);g.lineTo(x,H);g.stroke();}
  g.fillStyle=vgrad(g,fl,fl+22,[[0,'rgba(30,12,6,.35)'],[1,'rgba(30,12,6,0)']]);g.fillRect(0,fl,W,22);
  return c;
}
/* her long black dress (the 'black' top with gold sparkle), walking: shoes, skirt, then drawFabeha on top */
function jul_walker(ctx,x,y,s,lt,amp,o){
  const ph=lt*Math.PI*1.8,sw=Math.sin(ph)*amp,bob=-Math.abs(Math.sin(ph))*5*amp,hs=sw*7,al=o.alpha??1;
  ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.globalAlpha*=al;
  ctx.fillStyle='rgba(40,18,10,.3)';ell(ctx,0,454,74,13);ctx.fill();
  ctx.translate(0,bob);
  const fL=441+Math.max(0,sw)*10,fR=441+Math.max(0,-sw)*10;
  ctx.fillStyle='#141116';ell(ctx,-24,fL,13,7);ctx.fill();ell(ctx,24,fR,13,7);ctx.fill();
  ctx.strokeStyle=FB.gold;ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(-34,fL-1);ctx.lineTo(-14,fL-3);ctx.moveTo(14,fR-3);ctx.lineTo(34,fR-1);ctx.stroke();
  ctx.fillStyle='#17131c';ctx.beginPath();ctx.moveTo(-64,172);ctx.lineTo(64,172);ctx.bezierCurveTo(74,250,92+hs,360,96+hs,436);
  for(let k=1;k<=8;k++){const xx=96+hs-k*24;ctx.quadraticCurveTo(xx+12,436+(k%2?6:-2)+Math.sin(ph+k)*2*amp,xx,436);}
  ctx.bezierCurveTo(-92+hs,360,-74,250,-64,172);ctx.closePath();ctx.fill();
  ctx.lineCap='round';ctx.strokeStyle='rgba(0,0,0,.4)';ctx.lineWidth=3;
  for(const fx of[-34,-8,20,44]){ctx.beginPath();ctx.moveTo(fx*0.7,200);ctx.quadraticCurveTo(fx+hs*0.5,320,fx*1.3+hs,430);ctx.stroke();}
  ctx.strokeStyle='rgba(255,240,220,.06)';ctx.lineWidth=6;ctx.beginPath();ctx.moveTo(-40,190);ctx.quadraticCurveTo(-62+hs*0.4,320,-74+hs,428);ctx.stroke();
  const r=rng(951);ctx.fillStyle='#e6c470';
  for(let i=0;i<70;i++){const v=r(),u=r(),yy=180+v*250,hw=lerp(64,96,(yy-172)/264),xx=(u*2-1)*hw*0.92+hs*(yy-172)/264;ctx.globalAlpha=al*(0.35+0.55*Math.abs(Math.sin(lt*2.2+i)));circle(ctx,xx,yy,0.9+r()*1.1);ctx.fill();}
  ctx.restore();
  drawFabeha(ctx,x,y+bob*s,s,Object.assign({t:lt,outfit:'black',hair:'halfup',arms:'lap',alpha:al,wind:0.1+0.05*amp,len:210},o.face));
}
/* the same dress, sitting on the sill: a skirt over the 'seat' legs, a lap, and her hands flat on the ledge beside her */
function jul_skirtSeat(ctx,x,y,s,lt){
  ctx.save();ctx.translate(x,y);ctx.scale(s,s);const a0=ctx.globalAlpha;
  ctx.fillStyle='#17131c';ctx.beginPath();ctx.moveTo(-70,184);ctx.quadraticCurveTo(0,176,70,184);ctx.quadraticCurveTo(74,204,64,214);ctx.quadraticCurveTo(66,260,68,302);
  for(let k=1;k<=6;k++){const xx=68-k*136/6;ctx.quadraticCurveTo(xx+11,k%2?306:301,xx,302);}
  ctx.quadraticCurveTo(-66,260,-64,214);ctx.quadraticCurveTo(-74,204,-70,184);ctx.closePath();ctx.fill();
  ctx.fillStyle='rgba(255,236,214,.07)';ell(ctx,0,196,62,12);ctx.fill();
  ctx.strokeStyle='rgba(0,0,0,.45)';ctx.lineWidth=4;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(-58,214);ctx.quadraticCurveTo(0,222,58,214);ctx.stroke();
  ctx.lineWidth=3;for(const fx of[-22,2,26]){ctx.beginPath();ctx.moveTo(fx,220);ctx.lineTo(fx*1.2,298);ctx.stroke();}
  const r=rng(952);ctx.fillStyle='#e6c470';for(let i=0;i<46;i++){const yy=186+r()*114,xx=(r()*2-1)*(60+(yy-196)*0.07);ctx.globalAlpha=a0*(0.35+0.55*Math.abs(Math.sin(lt*2+i)));circle(ctx,xx,yy,0.9+r()*1.1);ctx.fill();}
  ctx.globalAlpha=a0;
  for(const d of[-1,1]){
    ctx.strokeStyle=SLEEVE.black;ctx.lineWidth=22;ctx.beginPath();ctx.moveTo(d*58,90);ctx.quadraticCurveTo(d*76,128,d*84,166);ctx.stroke();
    ctx.strokeStyle='rgba(255,226,196,.14)';ctx.lineWidth=2.5;ctx.beginPath();ctx.moveTo(d*68,92);ctx.quadraticCurveTo(d*86,128,d*94,164);ctx.stroke();
    ctx.fillStyle=FB.skin;ell(ctx,d*88,175,12,7.5,d*0.15);ctx.fill();ctx.fillStyle=hexA(FB.skinSh,0.8);ell(ctx,d*88,178,10,3.5,d*0.15);ctx.fill();}
  ctx.restore();
}
const JUL_BK=[
  [0,   {look:0.05,smile:0.6,tilt:0,blush:0.4}],
  [10.6,{look:0.02,smile:0.9,tilt:0.04,blush:0.55}],
  [11.6,{look:0.02,smile:1,tilt:0.05,blush:0.65,eyes:'happy'},0.4],
  [12.4,{look:0.03,smile:0.88,tilt:0.03,blush:0.6},0.4],
];
const JUL_BK2=[
  [0,   {look:0.05,smile:0.75,tilt:0.02,blush:0.45}],
  [16.2,{look:0.3,smile:1,tilt:0.06,blush:0.6,eyes:'happy'},0.5],
  [18.6,{look:-0.55,smile:0.55,tilt:-0.08,blush:0.5},0.5],
  [21.2,{look:0.08,smile:0.88,tilt:0.03,blush:0.6},0.5],
];
scene({id:'blackdress',name:'2 July · one hour',when:'2026-07-02T13:00',bars:10,fin:['#000000',1.2],fout:['#000000',1.4],
  note:'the next day at one o’clock: she comes down the red-brick arcade in the black dress, through the bars of noon light from the arches; then she sits on the sill of an arch while the light slides across the floor and the clock on the pier goes round once.',
  tag:'2 Jul · one hour',
  prep(){return{arc:jul_corridor(),side:jul_side()};},
  draw(ctx,lt,A){
    const xb=lt>=13.3?1:0,dip=smooth(12.5,13.3,lt)*(1-smooth(13.3,14.2,lt));   /* through the noon light, not a crossfade (no two of her) */
    if(xb<1){
      ctx.drawImage(A.arc,0,0);
      const u=clamp((lt-1.4)/9.6),Z=2.5+19.5*Math.pow(1-u,1.5),s=2.323/Z,x=640-105/Z,y=318+70/Z,amp=1-smooth(10.2,11.2,lt),al=smooth(1.2,2.6,lt),lit=jul_lit(Z);
      if(al>0){
        jul_walker(ctx,x,y,s,lt,amp,{alpha:al,face:jul_pose(lt,JUL_BK)});
        if(lit>0.01){ctx.save();ctx.globalCompositeOperation='screen';glow(ctx,x,y+150*s,300*s,'#fff2d0',0.2*lit*al);ctx.restore();}
      }
      motes(ctx,lt,30,925,'#fff3d2',1.3,0.35);
    }
    if(xb>0){
      ctx.save();ctx.globalAlpha=xb;
      const{op,fl}=JB,u=clamp((lt-14.6)/8.8),ft=lt+60*u;
      ctx.drawImage(A.side,0,0);
      ctx.save();ctx.beginPath();for(const[x0,x1]of op)jul_archPath(ctx,x0,x1);ctx.clip();
      for(let k=0;k<3;k++){const x=((k*520+ft*22)%1800)-260;ctx.fillStyle='rgba(255,255,255,.55)';ell(ctx,x,60+k*38,120,22);ctx.fill();ell(ctx,x+60,48+k*38,70,20);ctx.fill();}
      for(const[k,y,s,col,hair,v]of[[0,372,0.3,'#e8e2d6','#2a2024',38],[1,362,0.26,'#3f63a8','#1f1a1c',-30],[2,388,0.36,'#c96b5a','#2a2024',46],[3,368,0.28,'#2b2b33','#3a2a24',-42],[4,380,0.33,'#8aa07a','#1f1a1c',34]]){
        const span=1700,x=((k*330+ft*v)%span+span)%span-200;drawFigureFar(ctx,x,y,s,col,hair,ft*2,k,false);}
      ctx.restore();
      const ax=lerp(-0.3,0.42,u),ay=lerp(0.2,0.3,u);
      ctx.save();ctx.beginPath();ctx.rect(0,fl,W,H-fl);ctx.clip();
      ctx.beginPath();for(const[x0,x1]of op){jul_archPts(x0,x1).forEach(([px,py],i)=>{const h=fl-py,X=px+ax*h,Y=fl+ay*h;if(i)ctx.lineTo(X,Y);else ctx.moveTo(X,Y);});ctx.closePath();}
      ctx.globalCompositeOperation='screen';ctx.fillStyle=`rgba(255,${Math.round(238-18*u)},${Math.round(200-40*u)},0.5)`;ctx.fill();
      ctx.clip();ctx.globalCompositeOperation='source-over';
      for(const[hh,rx,ry]of[[170,64,14+ay*44],[290,34,13]]){const sx=525+ax*hh,sy=fl+ay*hh,sg=ctx.createRadialGradient(sx,sy,0,sx,sy,rx);sg.addColorStop(0,'rgba(70,35,20,.2)');sg.addColorStop(1,'rgba(70,35,20,0)');ctx.fillStyle=sg;ctx.save();ctx.translate(sx,sy);ctx.scale(1,ry/rx);ctx.translate(-sx,-sy);ctx.fillRect(sx-rx,sy-rx,rx*2,rx*2);ctx.restore();}
      ctx.restore();
      glow(ctx,525,330,250,'#fff8e4',0.35);
      ctx.fillStyle='rgba(30,12,6,.35)';ell(ctx,525,562,52,7);ctx.fill();
      const k=jul_pose(lt,JUL_BK2);
      drawFabeha(ctx,525,300,0.8,{t:lt,outfit:'black',hair:'halfup',pose:'seat',legCol:'#17131c',smile:k.smile,look:k.look,tilt:k.tilt+Math.sin(lt*0.5)*0.015,blush:k.blush,eyes:k.eyes,wind:0.06,len:230});
      jul_skirtSeat(ctx,525,300,0.8,lt);
      const mins=60*u,mA=mins/60*TAU-Math.PI/2,hA=(1+mins/60)/12*TAU-Math.PI/2;
      ctx.strokeStyle='#2a2220';ctx.lineCap='round';ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(880,250);ctx.lineTo(880+Math.cos(hA)*23,250+Math.sin(hA)*23);ctx.stroke();
      ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(880,250);ctx.lineTo(880+Math.cos(mA)*35,250+Math.sin(mA)*35);ctx.stroke();
      ctx.fillStyle='#2a2220';circle(ctx,880,250,4);ctx.fill();
      ctx.fillStyle=`rgba(255,190,120,${(0.08*u).toFixed(3)})`;ctx.fillRect(0,0,W,H);
      const vi=ctx.createRadialGradient(640,360,320,640,360,820);vi.addColorStop(0,'rgba(30,12,8,0)');vi.addColorStop(1,'rgba(30,12,8,.4)');ctx.fillStyle=vi;ctx.fillRect(0,0,W,H);
      ctx.restore();
    }
    if(dip>0){ctx.fillStyle=`rgba(255,247,228,${(0.92*dip).toFixed(3)})`;ctx.fillRect(0,0,W,H);}
  },
  subs:[
    [1.4,5.6,'2 July. She came in the black dress.'],
    [20.0,23.4,'For one hour. ❤️'],
    [24.4,26.6,'Thankyou for comming','him'],
    [27.0,29.2,'Ty for being there','her'],
    [29.6,32.4,'Always for you','him'],
  ],
  score({T,hit,add,melody,bars,CH,THEME_B,THEME_B_CH}){
    bars(0,1,['Em7'],{strings:true,padVel:0.24});
    hit(1.3,'swell',{dur:1.8,vel:0.28});
    bars(1,6,THEME_B_CH,{strings:true,padVel:0.46});
    for(let b=1;b<7;b++)melody(b,b-1,'box',12,b<4?0.36:0.3,THEME_B);
    bars(7,1,['G'],{strings:true,padVel:0.36});melody(7,7,'box',12,0.3,THEME_B);
    hit(3.4,'chime',{midi:88,vel:0.22});
    for(let k=0;k<11;k++)hit(14.6+k*0.8333,'pluck',{midi:k%2?84:91,vel:0.08});
    hit(23.4,'chime',{midi:91,vel:0.3});
  },
  amb(lt){return lt<13.4?{crowd:0.1,wind:0.08}:{crowd:0.18,wind:0.1};},
});

/* ======================================================================================================
   4 July · 21:34 — the scent: her cousin has bought his perfume; a bottle on a dresser in her house
   ====================================================================================================== */
const SCENT=[
  {at:1.2, who:'her',time:'21:21',text:'What scent do you use?'},
  {at:5.0, who:'her',time:'21:30',text:'Nhi the one you wore for the continous 3 days'},
  {at:8.2, who:'me', time:'21:32',text:'Wo shayad bonanza ka freedom hai'},
  {at:11.0,who:'her',time:'21:34',text:'No my cousin got this perfume from a diff brand. Lol now he\'s reminding me of you. Your presence feels more evident'},
];
scene({id:'scent',name:'4 July · the scent',when:'2026-07-04T21:34',bars:10,fin:['#000000',1.2],fout:['#000000',1.4],
  note:'his last night in Karachi, at his friends’ flat: she asks what scent he wore for three days; her cousin has bought the same one, and now a bottle on a dresser in her house reminds her of him. Her side, imagined.',
  tag:'“I\'ll still recognise you through scent”',
  prep(){
    const flat=mk(W,H),g=flat.getContext('2d');
    g.fillStyle=vgrad(g,0,H,[[0,'#11141b'],[1,'#07080c']]);g.fillRect(0,0,W,H);
    const tv=g.createRadialGradient(240,275,0,240,275,360);tv.addColorStop(0,'rgba(120,170,255,.5)');tv.addColorStop(1,'rgba(120,170,255,0)');g.fillStyle=tv;g.fillRect(0,0,800,720);
    g.fillStyle='#1a1c22';g.fillRect(40,150,400,250);g.fillStyle='#2a3f66';g.fillRect(52,162,376,226);g.fillStyle='#4a6a9a';g.fillRect(52,300,376,88);
    g.fillStyle='#8fb4e8';g.fillRect(120,330,60,8);g.fillRect(300,330,60,8);g.fillStyle='rgba(255,255,255,.07)';for(let y=166;y<388;y+=4)g.fillRect(52,y,376,1);
    g.fillStyle='#17151a';g.beginPath();g.moveTo(0,560);g.quadraticCurveTo(640,520,W,560);g.lineTo(W,720);g.lineTo(0,720);g.closePath();g.fill();
    g.fillStyle='#2b2733';rrect(g,700,520,620,220,30);g.fill();g.fillStyle='#3a3444';rrect(g,760,470,220,80,26);g.fill();
    const dr=mk(W,H),d=dr.getContext('2d');
    d.fillStyle=vgrad(d,0,H,[[0,'#4d3b47'],[1,'#2b2230']]);d.fillRect(0,0,W,H);
    d.fillStyle='#efe4d4';d.fillRect(70,70,270,370);d.fillStyle=vgrad(d,82,428,[[0,'#564a94'],[0.55,'#c9736a'],[1,'#f3c98f']]);d.fillRect(82,82,246,346);
    d.fillStyle='#efe4d4';d.fillRect(200,82,8,346);d.fillRect(82,250,246,8);
    d.fillStyle='rgba(255,255,255,.2)';for(let k=0;k<6;k++)d.fillRect(90+k*40,82,16,346);
    const spill=d.createRadialGradient(330,300,0,330,300,640);spill.addColorStop(0,'rgba(255,190,130,.36)');spill.addColorStop(1,'rgba(255,190,130,0)');d.fillStyle=spill;d.fillRect(0,0,W,H);
    d.fillStyle='#7a5a3c';rrect(d,640,90,440,350,10);d.fill();d.fillStyle=vgrad(d,100,430,[[0,'#3b2f3f'],[1,'#2a2130']]);rrect(d,652,102,416,326,6);d.fill();
    const mg=d.createRadialGradient(700,220,0,700,220,340);mg.addColorStop(0,'rgba(255,200,150,.3)');mg.addColorStop(1,'rgba(255,200,150,0)');d.fillStyle=mg;rrect(d,652,102,416,326,6);d.fill();
    d.fillStyle='rgba(255,255,255,.06)';d.beginPath();d.moveTo(660,110);d.lineTo(760,110);d.lineTo(680,420);d.lineTo(660,420);d.closePath();d.fill();
    d.fillStyle='#6a4630';d.fillRect(200,440,1080,30);d.fillStyle='#8a5f3e';d.fillRect(200,468,1080,10);
    d.fillStyle='#4e3324';d.fillRect(200,478,1080,242);d.strokeStyle='rgba(0,0,0,.35)';d.lineWidth=2;for(const y of[500,600])d.strokeRect(230,y,1020,80);
    d.fillStyle='#c9a24a';for(const y of[540,640]){circle(d,740,y,7);d.fill();}
    d.strokeStyle='#d9b24c';d.lineWidth=2.4;ell(d,760,456,9,4);d.stroke();ell(d,782,458,9,4);d.stroke();
    d.fillStyle='#4a3a2a';ell(d,1130,452,38,10);d.fill();d.fillStyle='#2a2320';d.fillRect(1160,446,70,9);d.fillStyle='#cbb';for(let k=0;k<12;k++)d.fillRect(1100+k*5,445,2,6);
    d.fillStyle='#e8d9c0';for(let k=0;k<40;k++){const a=k/40*TAU;circle(d,990+Math.cos(a)*52,455+Math.sin(a)*12,3.2);d.fill();}d.fillStyle='#d2c0a0';d.fillRect(1040,452,3,18);d.fillRect(1046,450,3,20);
    return{flat,dr};
  },
  draw(ctx,lt,A){
    const dr=smooth(15.8,17.6,lt);
    if(dr<1){
      ctx.drawImage(A.flat,0,0);
      const S=drawPhoneHand(ctx,lt,{x:475,y:120,w:330,h:700});
      chatPanel(ctx,S,SCENT,lt,{name:'Fabeha',status:'online'});
      phoneTop(ctx,S,{time:lt<5?'21:21':lt<8.2?'21:30':lt<11?'21:32':'21:34'});
    }
    if(dr>0){
      ctx.save();ctx.globalAlpha=dr;
      ctx.drawImage(A.dr,0,0);
      ctx.save();ctx.globalCompositeOperation='screen';for(let k=0;k<3;k++){const a=(0.05+0.03*k)*(0.8+0.2*Math.sin(lt*0.5+k));ctx.fillStyle=`rgba(255,200,140,${a})`;ctx.beginPath();ctx.moveTo(330,110+k*90);ctx.lineTo(330,160+k*90);ctx.lineTo(1280,520+k*120);ctx.lineTo(1280,380+k*120);ctx.closePath();ctx.fill();}ctx.restore();
      ctx.fillStyle='rgba(20,10,20,.35)';ell(ctx,930,468,76,9);ctx.fill();
      ctx.save();ctx.globalCompositeOperation='screen';ctx.fillStyle='rgba(255,180,100,.22)';ell(ctx,940,470,60,8);ctx.fill();ctx.restore();
      jul_bottle(ctx,860,462,1.9,{w:46,h:78,capH:20,glass:'#cfd8e0',liquid:'#d9933c',cap:'#1d1a1f',glow:'#ffb86a',glowA:0.2+0.05*Math.sin(lt*0.8)});
      ctx.save();ctx.globalCompositeOperation='screen';ctx.lineCap='round';
      for(let k=0;k<3;k++){const ph=k*2.1,u=(lt*0.12+k*0.33)%1;ctx.strokeStyle=`rgba(255,220,170,${0.14*(1-u)})`;ctx.lineWidth=6-k;ctx.beginPath();const x0=860+(k-1)*6,y0=272;ctx.moveTo(x0,y0);for(let j=1;j<=8;j++){const t=j/8;ctx.lineTo(x0+Math.sin(t*4+lt*0.8+ph)*(10+t*26),y0-t*(90+u*60));}ctx.stroke();}
      ctx.restore();
      motes(ctx,lt,36,706,'#ffe6c0',1.3,0.35);
      ctx.restore();
    }
  },
  subs:[
    [0.6,4.0,'4 July, my last night in Karachi, at my friends’ flat. She had a question.'],
    [4.2,6.0,'What scent do you use?','her'],
    [6.2,8.6,'Nhi the one you wore for the continous 3 days','her'],
    [8.8,10.8,'Wo shayad bonanza ka freedom hai','him'],
    [11.2,16.2,'No my cousin got this perfume from a diff brand. Lol now he\'s reminding me of you. Your presence feels more evident','her'],
    [17.8,23.0,'Like i wouldn\'t see you at all aur mujhe pata nho hoga you\'ve entered, but I\'ll still recognise you through scent','her'],
    [23.6,27.0,'A bottle on a dresser in a house I had never seen.'],
    [27.4,29.6,'I in genuine miss hajj wala fazul','her'],
    [29.8,32.6,'Ap bro makkah madina mein hi raha karo🤭🤭🤭🤭🤭🤭🤭🤨','her'],
  ],
  score({T,hit,add,melody,bars,THEME_B}){
    bars(0,5,['Em7','Am7','Cadd9','Dsus'],{padVel:0.36});
    bars(5,5,['Cmaj7','G','Em','Dsus'],{strings:true,padVel:0.4});
    for(let b=5;b<9;b++)melody(b,b-5,'piano',0,0.34,THEME_B);
    for(const m of SCENT)hit(m.at,'tick',{hi:m.who==='her'});
    add(T(5),'chime',{midi:91,vel:0.25});
  },
  amb(lt){return lt<16?{room:0.25,hum:0.08}:{room:0.12,wind:0.12};},
});
/* --- end scent --- */

/* ======================================================================================================
   15 July · 07:01 — sunrise, lying on his back with the phone over his face: “I was umm missing you too”
   ====================================================================================================== */
const MISS=[
  {at:0.6, who:'her',time:'06:23',text:'Ap teekh?'},
  {at:4.6, who:'me', time:'06:23',text:'ha'},
  {at:5.2, who:'me', time:'06:24',text:'bas yaad arahi thi'},
  {at:7.6, who:'me', time:'06:37',text:'mein tou idhr hee ho na'},
  {at:8.4, who:'me', time:'06:37',text:'not leaving a sight of yours'},
  {at:11.0,who:'her',time:'06:37',text:'Acha naaaa 😭😭😭😭😭😭😭😭😭😭😭😭😭😭'},
  {at:13.0,who:'her',time:'07:01',text:'I was umm missing you too'},
  {at:16.4,who:'me', time:'07:02',text:'mujhe'},
  {at:17.0,who:'me', time:'07:02',text:'🤣🤣'},
  {at:17.8,who:'me', time:'07:02',text:'mein tou idhr hee ho'},
  {at:18.8,who:'me', time:'07:02',text:'dost ki taraha baat ki jaasakti hai'},
  {at:20.4,who:'her',time:'07:02',text:'😭😭😭😭😭'},
  {at:23.6,who:'me', time:'07:14',text:'how much would you rate my fragnance'},
  {at:26.0,who:'her',time:'07:16',text:'8 ya 9'},
  {at:26.8,who:'her',time:'07:16',text:'The bonanza wala'},
];
scene({id:'missing',name:'15 July · missing you too',when:'2026-07-15T07:01',bars:9,fin:['#000000',1.2],fout:['#000000',1.6],
  note:'sunrise in Hyderabad, lying on his back with the phone over his face and the fan turning; two days into being “bro” she writes “I was umm missing you too”, and rates his perfume 8 ya 9.',
  tag:'“I was umm missing you too” · “8 ya 9”',
  prep(){
    const c=mk(W,H),g=c.getContext('2d');
    g.fillStyle=vgrad(g,0,H,[[0,'#e2d6ca'],[0.7,'#d6c9bd'],[1,'#b9ab9f']]);g.fillRect(0,0,W,H);
    const sun=g.createRadialGradient(1150,160,0,1150,160,700);sun.addColorStop(0,'rgba(255,170,110,.6)');sun.addColorStop(1,'rgba(255,170,110,0)');g.fillStyle=sun;g.fillRect(0,0,W,H);
    g.fillStyle='#b8a295';g.beginPath();g.moveTo(0,590);g.lineTo(W,560);g.lineTo(W,720);g.lineTo(0,720);g.closePath();g.fill();
    g.fillStyle='rgba(255,190,140,.25)';g.beginPath();g.moveTo(700,575);g.lineTo(W,560);g.lineTo(W,720);g.lineTo(700,720);g.closePath();g.fill();
    g.fillStyle='#7a5a40';g.beginPath();g.moveTo(20,612);g.lineTo(420,600);g.lineTo(420,614);g.lineTo(20,626);g.closePath();g.fill();
    g.fillStyle='#5a4030';g.beginPath();g.moveTo(20,626);g.lineTo(420,614);g.lineTo(420,620);g.lineTo(20,632);g.closePath();g.fill();
    jul_bottle(g,120,608,0.9,{w:40,h:62,capH:16,glass:'#cfd8e0',liquid:'#d9933c',cap:'#1d1a1f'});
    jul_bottle(g,200,606,0.7,{w:36,h:70,capH:14,glass:'#d9e4ea',liquid:'#6fa0c8',cap:'#2a2326'});
    jul_bottle(g,300,604,0.6,{w:48,h:48,capH:12,glass:'#e4dce6',liquid:'#c98aa0',cap:'#c9a24a',round:16});
    g.fillStyle='#fff0cc';g.fillRect(880,0,400,310);
    g.fillStyle='#e07a4a';g.beginPath();g.moveTo(900,0);g.lineTo(1280,0);g.lineTo(1280,290);g.lineTo(930,250);g.closePath();g.fill();
    g.fillStyle='rgba(0,0,0,.14)';for(let k=0;k<8;k++){g.beginPath();g.moveTo(920+k*44,0);g.lineTo(936+k*44,0);g.lineTo(950+k*44,258-k*5);g.lineTo(934+k*44,254-k*5);g.closePath();g.fill();}
    g.fillStyle='rgba(255,240,200,.55)';g.fillRect(884,0,16,300);
    return{c};
  },
  draw(ctx,lt,A){
    ctx.drawImage(A.c,0,0);
    const hx=560,hy=170,ang=lt*1.5;
    ctx.fillStyle='rgba(0,0,0,.08)';circle(ctx,hx+10,hy+14,52);ctx.fill();
    for(let k=0;k<3;k++)for(let b=0;b<3;b++){const a=ang+k*TAU/3-b*0.06;ctx.save();ctx.translate(hx,hy);ctx.rotate(a);ctx.globalAlpha=b?0.22:1;ctx.fillStyle='#a89b8c';rrect(ctx,40,-26,250,52,14);ctx.fill();ctx.fillStyle='rgba(0,0,0,.14)';rrect(ctx,40,-26,250,14,7);ctx.fill();ctx.fillStyle='rgba(255,255,255,.14)';rrect(ctx,40,8,250,10,5);ctx.fill();ctx.restore();}
    ctx.fillStyle='#8f8276';circle(ctx,hx,hy,46);ctx.fill();ctx.fillStyle='#b8ab9c';circle(ctx,hx,hy,32);ctx.fill();ctx.fillStyle='#6f655b';circle(ctx,hx,hy,8);ctx.fill();
    const gl=smooth(26.2,27.0,lt)*(1-smooth(28.4,29.6,lt));if(gl>0)glow(ctx,120,560,80,'#ffd9a0',0.55*gl);
    const sh=smooth(16.4,16.6,lt)*(1-smooth(18.0,18.8,lt));
    ctx.save();ctx.translate(Math.sin(lt*31)*2.5*sh,Math.sin(lt*23)*4*sh);
    const S=drawPhoneHand(ctx,lt,{x:475,y:120,w:330,h:700});
    chatPanel(ctx,S,MISS,lt,{name:'Fabeha',status:'online',dark:false});
    phoneTop(ctx,S,{time:lt<4.6?'06:23':lt<7.6?'06:24':lt<13?'06:37':lt<16.4?'07:01':lt<23.6?'07:02':lt<26?'07:14':'07:16'});
    ctx.restore();
    ctx.fillStyle='rgba(255,200,140,.08)';ctx.fillRect(0,0,W,H);
  },
  subs:[
    [0.6,4.6,'15 July, sunrise. Two nights earlier we had agreed to step back and be friends for a while.'],
    [5.4,7.2,'bas yaad arahi thi','him'],
    [7.8,9.2,'mein tou idhr hee ho na','him'],
    [9.3,10.8,'not leaving a sight of yours','him'],
    [11.2,12.6,'Acha naaaa 😭😭😭😭😭😭😭😭😭😭😭😭😭😭','her'],
    [13.2,16.0,'I was umm missing you too','her'],
    [16.4,19.0,'I laughed out loud, alone, at seven in the morning.'],
    [19.3,21.3,'mein tou idhr hee ho','him'],
    [21.5,23.9,'dost ki taraha baat ki jaasakti hai','him'],
    [24.2,26.2,'how much would you rate my fragnance','him'],
    [26.4,27.4,'8 ya 9','her'],
    [27.6,29.4,'The bonanza wala','her'],
  ],
  score({T,hit,bars,melody,THEME_B}){
    bars(0,9,['G','Cmaj7','Em7','D'],{padVel:0.4,arp:true,arpVel:0.12});
    for(let b=3;b<7;b++)melody(b,b-3,'piano',0,0.36,THEME_B);
    hit(13.0,'chime',{midi:91,vel:0.32});
    for(const m of MISS)hit(m.at,'tick',{hi:m.who==='her'});
    [1.2,4.0,9.7,22.5].forEach((t,k)=>hit(t,'bird',{f:2900+k*200}));
  },
  amb(lt){return{room:0.2,hum:0.1,wind:0.05};},
});
