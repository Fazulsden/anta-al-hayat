/* more.js — scenes for this part of the film (see notes/AUTHORING.md).
   lastday  · 16 January, the van down to Islamabad after the fight; she kept looking at him (and the 19 March chat about it)
   whymaths · 23 January, what the maths is for: quant finance, to support the orphan kids (and Black–Scholes the next day)
   fypchaos · 18 June, her FYP: she recorded her sir and replayed him while she worked; she did what he asked, he bullied her anyway; they laughed */
'use strict';

/* ================================================================================================
   16 January · the road to Islamabad
   The chat pins the ride: on 19 March she remembers looking at him on "isl jatay way when you fought" (line 10296).
   They were in the Islamabad hotel by 23:04 (shawls, line 97), so the ride is the evening of 16 January.
   ================================================================================================ */
const MR_LAST_MSGS=[
  {at:0,   who:'me', time:'07:59',text:'Good sochraha tha apko kyu laga ke phli mulaqat mein i was into you'},
  {at:0,   who:'me', time:'08:00',text:'Tou agr tabhi purpose krdeta 😞 grad trip achi jaati'},
  {at:21.2,who:'her',time:'08:00',text:'I didnt say that but i did feel the energy'},
  {at:23.4,who:'me', time:'08:00',text:'I sensed it to on the van'},
  {at:24.2,who:'me', time:'08:00',text:'Jab ap ghoor ghoor'},
  {at:25.0,who:'me', time:'08:00',text:'Kr dekhti thi'},
  {at:27.3,who:'her',time:'08:01',text:'Lollllll  apko ghoor ghoor kar dekhba was only twice'},
  {at:29.6,who:'me', time:'08:01',text:'Multiple tomes'},
  {at:31.0,who:'her',time:'08:02',text:'Really i just rem malam jabba one and isl jatay way when you fought'},
  {at:33.6,who:'me', time:'08:02',text:'Yess i do isl mein 5,6 dafa'},
];
/* the stretches when her eyes come back to him */
const MR_GLANCES=[[2.0,5.2],[6.8,10.2],[11.6,15.0],[16.4,20.2],[22.2,26.4],[28.2,36.6]];

/* the Hiace shell, the same layout as `van` (act1.js), in afternoon light */
function mrVanShell(){
  const c=mk(W,H),g=c.getContext('2d');
  g.fillStyle=vgrad(g,0,H,[[0,'#dedbd5'],[0.18,'#d4d1cb'],[0.19,'#eeebe5'],[1,'#c0bcb4']]);g.fillRect(0,0,W,H);
  g.fillStyle='#f7f3e8';rrect(g,440,34,400,16,8);g.fill();g.fillStyle='#8a8b90';for(const x of[160,1120]){rrect(g,x-40,86,80,10,5);g.fill();}
  g.fillStyle='#ebe8e2';g.fillRect(0,110,W,16);g.fillRect(0,440,W,16);
  g.fillStyle='#dfdcd6';g.fillRect(0,126,40,314);g.fillRect(1240,126,40,314);g.fillRect(330,126,46,314);g.fillRect(904,126,46,314);
  g.fillStyle='#cbc8c2';g.fillRect(376,126,528,10);
  g.fillStyle='#4d4b4e';g.fillRect(0,456,W,264);g.fillStyle='#575559';for(let y=470;y<720;y+=14)g.fillRect(0,y,W,2);
  return c;
}
/* the patterned bench upholstery of the van scene */
function mrSeat(ctx,x,y,w,h){
  ctx.fillStyle='#8a8c93';rrect(ctx,x,y,w,h,10);ctx.fill();ctx.fillStyle='#6f2f3b';
  for(let yy=y+14;yy<y+h-8;yy+=22)for(let xx=x+12;xx<x+w-8;xx+=24){ctx.beginPath();ctx.moveTo(xx,yy-5);ctx.lineTo(xx+5,yy);ctx.lineTo(xx,yy+5);ctx.lineTo(xx-5,yy);ctx.closePath();ctx.fill();}
  ctx.strokeStyle='#3d3e44';ctx.lineWidth=2;rrect(ctx,x,y,w,h,10);ctx.stroke();
}
/* his left hand on his knee, seen from his own eyes (palm down, thumb on the right). u: 0 clenched tight → 1 open and resting */
function mrFist(ctx,x,y,s,u,lt,rot){
  const e=easeIO(u),tr=(1-e)*Math.sin(lt*31)*0.6;
  ctx.save();ctx.translate(x+tr,y);ctx.rotate(rot||0);ctx.scale(s,s);ctx.lineCap='round';ctx.lineJoin='round';
  /* forearm, then the sleeve of his jacket */
  ctx.fillStyle=HIS.skin;ctx.beginPath();ctx.moveTo(-35,0);ctx.quadraticCurveTo(-42,60,-44,150);ctx.lineTo(42,150);ctx.quadraticCurveTo(40,60,35,4);ctx.closePath();ctx.fill();
  ctx.fillStyle=hexA(HIS.skinSh,0.5);ctx.beginPath();ctx.moveTo(-35,0);ctx.quadraticCurveTo(-42,60,-44,150);ctx.lineTo(-26,150);ctx.quadraticCurveTo(-26,60,-22,4);ctx.closePath();ctx.fill();
  ctx.fillStyle='#2f3644';ctx.beginPath();ctx.moveTo(-52,58);ctx.quadraticCurveTo(0,70,52,56);ctx.lineTo(70,260);ctx.lineTo(-72,260);ctx.closePath();ctx.fill();
  ctx.strokeStyle='#414b5c';ctx.lineWidth=6;ctx.beginPath();ctx.moveTo(-52,60);ctx.quadraticCurveTo(0,72,52,58);ctx.stroke();
  /* fingers: curled stubs past the knuckles when clenched, laid out flat when open */
  const KX=[-29,-10,10,29],KY=[-63,-70,-71,-66],FL=[34,44,47,41],FW=[14,16,16.5,16];
  for(let i=0;i<4;i++){
    const L=lerp(7,FL[i],e),a=(i-1.5)*0.07*e,tx=KX[i]+Math.sin(a)*L,ty=KY[i]-Math.cos(a)*L;
    ctx.strokeStyle=HIS.skinSh;ctx.lineWidth=FW[i]+2.6;ctx.beginPath();ctx.moveTo(KX[i],KY[i]);ctx.lineTo(tx,ty);ctx.stroke();
    ctx.strokeStyle=HIS.skin;ctx.lineWidth=FW[i];ctx.beginPath();ctx.moveTo(KX[i],KY[i]);ctx.lineTo(tx,ty);ctx.stroke();
    if(e>0.35){ctx.fillStyle=hexA(HIS.nail,(e-0.35)/0.65);ell(ctx,tx,ty+3,FW[i]*0.3,5,a);ctx.fill();
      ctx.strokeStyle=hexA(HIS.skinSh,0.5*(e-0.35));ctx.lineWidth=1.2;const mx=lerp(KX[i],tx,0.5),my=lerp(KY[i],ty,0.5);ctx.beginPath();ctx.moveTo(mx-FW[i]*0.3,my);ctx.lineTo(mx+FW[i]*0.3,my);ctx.stroke();}
  }
  /* back of the hand */
  ctx.fillStyle=HIS.skin;ctx.beginPath();ctx.moveTo(-34,2);ctx.bezierCurveTo(-42,-20,-44,-46,-40,-60);ctx.quadraticCurveTo(-32,-75,-10,-75);ctx.quadraticCurveTo(12,-77,28,-73);ctx.quadraticCurveTo(42,-68,40,-54);ctx.bezierCurveTo(40,-38,38,-18,34,6);ctx.closePath();ctx.fill();
  ctx.fillStyle=hexA(HIS.skinSh,0.55);ctx.beginPath();ctx.moveTo(-34,2);ctx.bezierCurveTo(-42,-20,-44,-46,-40,-60);ctx.quadraticCurveTo(-33,-36,-22,2);ctx.closePath();ctx.fill();
  /* tendons stand out while it is clenched */
  for(let i=0;i<4;i++){
    ctx.strokeStyle=hexA('#e8c0a5',0.6*(1-e));ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(KX[i]*0.42,-6);ctx.quadraticCurveTo(KX[i]*0.75,-36,KX[i],KY[i]+8);ctx.stroke();
    ctx.strokeStyle=hexA(HIS.skinSh,0.4*(1-e));ctx.lineWidth=1.4;ctx.beginPath();ctx.moveTo(KX[i]*0.42+3.5,-6);ctx.quadraticCurveTo(KX[i]*0.75+3.5,-36,KX[i]+3.5,KY[i]+8);ctx.stroke();
  }
  /* knuckles: pale with the grip, ordinary once it lets go */
  for(let i=0;i<4;i++){ctx.fillStyle='#d4a386';ell(ctx,KX[i],KY[i]+1,9.5,7.5);ctx.fill();ctx.fillStyle=hexA('#f3d9c6',0.9*(1-e));ell(ctx,KX[i],KY[i],7.5,5.5);ctx.fill();}
  /* thumb: folded across the front of the fist, then easing out to the side */
  const bx=33,by=-24,cx=lerp(54,56,e),cy=lerp(-74,-36,e),tx=lerp(8,74,e),ty=lerp(-86,-56,e);
  ctx.strokeStyle=HIS.skinSh;ctx.lineWidth=21.5;ctx.beginPath();ctx.moveTo(bx,by);ctx.quadraticCurveTo(cx,cy,tx,ty);ctx.stroke();
  ctx.strokeStyle=HIS.skin;ctx.lineWidth=19;ctx.beginPath();ctx.moveTo(bx,by);ctx.quadraticCurveTo(cx,cy,tx,ty);ctx.stroke();
  ctx.fillStyle=hexA(HIS.nail,0.25+0.75*e);ell(ctx,tx+lerp(4,2,e),ty+lerp(2,-2,e),5,6.5,lerp(1.2,0.5,e));ctx.fill();
  ctx.restore();
}

scene({id:'lastday',name:'16 January · the road to Islamabad',when:'2026-01-16T22:00',bars:11,fin:['#ffffff',1.4],fout:['#000000',1.2],
  note:'the last day of the grad trip: the Hiace on the road down to Islamabad, the afternoon going gold in the windows, the road running away behind her. He is back on the aisle jump seat facing her row, his left fist still tight on his knee after the fight; she keeps looking at him, worried and then soft, until his hand opens. Then 19 March, 08:00, the chat where she says she felt it.',
  tag:'“isl jatay way when you fought” · 19 March, 08:02',
  prep(){
    const shell=mrVanShell();
    const far=makeLayer({w:2400,h:320,seed:1702,y0:96,amp:58,oct:4,f0:0.003,top:'#f3f6fa',bottom:'#a7b6c8',patches:['#ffffff','#8fa2b8'],patchN:150,rock:'#7f90a6',rim:'#ffffff',rimA:0.55,rimW:3});
    const mid=makeLayer({w:2400,h:320,seed:1703,y0:172,amp:44,oct:4,f0:0.0052,top:'#7d8f62',bottom:'#55684a',patches:['#97a873','#46593f','#a9a274'],patchN:220,pines:{n:230,size:22,sink:3,dark:'#26422f',light:'#3a5d41'},haze:'rgba(214,222,226,.4)'});
    const near=makeLayer({w:2400,h:320,seed:1704,y0:250,amp:14,oct:3,f0:0.01,top:'#9c9461',bottom:'#77714c',patches:['#b3aa74','#6a653f'],patchN:160,trees:{n:34,size:64,sink:8,dark:'#30492c',light:'#6a9150'},
      after(g,ry){for(let x=90;x<2400;x+=330){const y=ry(x)+4;g.fillStyle='#4a4038';g.fillRect(x-2.5,y-150,5,150);g.fillRect(x-22,y-140,44,4);g.strokeStyle='rgba(40,36,34,.55)';g.lineWidth=1.2;g.beginPath();g.moveTo(x-20,y-138);g.quadraticCurveTo(x+145,y-112,x+310,y-138);g.stroke();}}});
    return{shell,far,mid,near};
  },
  draw(ctx,lt,A){
    const gold=smooth(4,32,lt),shake=Math.sin(lt*7.3)*1.2+Math.sin(lt*13.1)*0.6,z=1+0.08*easeIO(clamp(lt/22));
    const rise=easeOut(clamp((lt-19.6)/1.4));
    ctx.save();ctx.translate(640,330);ctx.scale(z,z);ctx.translate(-640,-330+shake);
    ctx.drawImage(A.shell,0,0);
    /* side windows: the hills going by, the snow peaks slow behind them */
    const win=(x0,x1,y0,y1,off,dir,curtain,sun)=>{
      ctx.save();ctx.beginPath();ctx.rect(x0,y0,x1-x0,y1-y0);ctx.clip();
      ctx.fillStyle=vgrad(ctx,y0,y1,[[0,mixHex('#86b6e4','#eaa978',gold*0.85)],[0.55,mixHex('#d3e5f3','#f8d4a2',gold)],[1,mixHex('#eef2f5','#fbe6c4',gold)]]);ctx.fillRect(x0,y0,x1-x0,y1-y0);
      if(sun){const sx=x0+(x1-x0)*0.62,sy=y0+lerp(40,128,gold);glow(ctx,sx,sy,200,'#fff1c8',0.55+0.25*gold);ctx.fillStyle=mixHex('#fffaf0','#ffd9a0',gold);circle(ctx,sx,sy,15);ctx.fill();}
      for(const[L,sp]of[[A.far,9],[A.mid,52],[A.near,290]]){const ox=(((off+lt*sp*dir)%2400)+2400)%2400;ctx.drawImage(L.c,x0-ox,y0);ctx.drawImage(L.c,x0-ox+2400,y0);}
      ctx.fillStyle=`rgba(255,170,96,${0.2*gold})`;ctx.fillRect(x0,y0,x1-x0,y1-y0);
      if(curtain){const cw=(x1-x0)*0.34,cx0=curtain<0?x0:x1-cw;for(let k=0;k<6;k++){ctx.fillStyle=k%2?'#8d3a46':'#6a2631';ctx.fillRect(cx0+k*cw/6,y0,cw/6+1,y1-y0);}
        ctx.fillStyle='rgba(255,220,180,.3)';for(let y=y0+20;y<y1;y+=34)for(let k=0;k<3;k++){circle(ctx,cx0+cw*(0.18+k*0.3),y+(k%2)*10,3);ctx.fill();}
        ctx.fillStyle=`rgba(255,190,120,${0.25*gold})`;ctx.fillRect(cx0,y0,cw,y1-y0);ctx.fillStyle='#d9c58a';ctx.fillRect(cx0+(curtain<0?cw-12:0),y0+(y1-y0)*0.55,12,10);}
      ctx.strokeStyle='rgba(255,255,255,.28)';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(x0+30,y0);ctx.lineTo(x0+70,y1);ctx.stroke();
      ctx.restore();};
    win(40,330,136,440,300,-1,-1,false);win(950,1240,136,440,1300,1,1,true);
    /* rear window: the road running away behind us, the way we came */
    ctx.save();ctx.beginPath();ctx.rect(430,146,420,150);ctx.clip();
    ctx.fillStyle=vgrad(ctx,146,296,[[0,mixHex('#93bde6','#eeb07e',gold*0.8)],[1,mixHex('#e2ebf2','#fae0bb',gold)]]);ctx.fillRect(430,146,420,150);
    ctx.drawImage(A.far.c,430-((lt*3)%1200),120);ctx.drawImage(A.mid.c,430-((lt*6+500)%1200),95);
    ctx.fillStyle='#6a6660';ctx.beginPath();ctx.moveTo(560,296);ctx.lineTo(636,238);ctx.lineTo(646,238);ctx.lineTo(722,296);ctx.closePath();ctx.fill();
    ctx.fillStyle='#ece6d4';for(let k=0;k<4;k++){const u=1-((lt*0.8+k*0.25)%1);ctx.fillRect(640-1.5-u*2,240+u*54,3+u*4,2+u*7);}
    ctx.fillStyle=`rgba(255,170,96,${0.18*gold})`;ctx.fillRect(430,146,420,150);
    ctx.restore();
    ctx.fillStyle='#dfdcd6';ctx.fillRect(420,136,440,10);ctx.fillRect(420,296,440,8);ctx.fillRect(420,136,10,170);ctx.fillRect(850,136,10,170);
    /* the rows behind her: headrests, heads, everyone else asleep */
    for(const[s,y,al]of[[0.56,300,0.75],[0.74,318,0.9]]){ctx.save();ctx.globalAlpha=al;for(let k=0;k<3;k++){const w=150*s,x=640+(k-1)*165*s-w/2;mrSeat(ctx,x,y-40*s,w,60*s);ctx.fillStyle='#2a2c34';ell(ctx,x+w/2+(k-1)*6,y-50*s,22*s,26*s);ctx.fill();}ctx.restore();}
    /* her row */
    mrSeat(ctx,372,330,170,190);mrSeat(ctx,555,330,170,190);mrSeat(ctx,738,330,170,190);
    ctx.fillStyle='#8a8c93';rrect(ctx,575,332,130,50,12);ctx.fill();ctx.strokeStyle='#3d3e44';ctx.lineWidth=2;rrect(ctx,575,332,130,50,12);ctx.stroke();
    /* her friends at the windows, asleep against the glass */
    ctx.fillStyle='#6b3f4c';ell(ctx,457,442,72,92);ctx.fill();ctx.fillStyle='#7d4a58';ell(ctx,440,410,40,26,-0.3);ctx.fill();
    ctx.save();ctx.translate(430,344);ctx.rotate(-0.32);ctx.fillStyle='#2a2226';ell(ctx,0,0,32,37);ctx.fill();ctx.fillStyle='#c79f86';ell(ctx,12,8,13,19);ctx.fill();ctx.fillStyle='#2a2226';ell(ctx,2,-14,33,22);ctx.fill();ctx.restore();
    ctx.fillStyle='#4f5d6e';ell(ctx,823,442,72,92);ctx.fill();
    ctx.save();ctx.translate(850,346);ctx.rotate(0.3);ctx.fillStyle='#46525f';ell(ctx,0,-2,38,42);ctx.fill();ctx.fillStyle='#3a4450';ell(ctx,-6,4,28,32);ctx.fill();ctx.fillStyle='#b8917a';ell(ctx,-12,10,11,15);ctx.fill();ctx.restore();
    /* her: the window, then him; again and again */
    let at=0;for(const[a,b]of MR_GLANCES)at=Math.max(at,smooth(a,a+0.5,lt)*(1-smooth(b,b+0.55,lt)));
    const tender=smooth(11.5,18,lt);
    drawFabeha(ctx,640,352,1.08,{t:lt,outfit:'sweater',hair:'down',shades:true,pose:'knees',legCol:'#3a3440',arms:'lap',len:230,
      look:lerp(-1,0.02,at)+Math.sin(lt*0.6)*0.04*(1-at),tilt:lerp(-0.11,0.035*tender,at),
      brow:at*lerp(0.75,0.1,tender),smile:lerp(0.3,lerp(0.18,0.62,tender),at),blush:0.28+0.32*at*tender});
    /* afternoon light through the right-hand windows, broken by the trees going past */
    const flick=0.62+0.38*Math.sin(lt*3.7)*Math.sin(lt*1.3+1);
    ctx.save();ctx.globalCompositeOperation='screen';
    ctx.fillStyle=`rgba(255,196,120,${(0.07+0.13*gold)*flick})`;ctx.beginPath();ctx.moveTo(950,150);ctx.lineTo(1240,150);ctx.lineTo(760,720);ctx.lineTo(440,720);ctx.closePath();ctx.fill();
    ctx.restore();
    /* our knees, and his left hand on the left one */
    for(const[x,d]of[[290,-1],[990,1]]){
      ctx.fillStyle='#2f3c58';ctx.beginPath();ctx.moveTo(x-210,740);ctx.quadraticCurveTo(x-140,590,x-86,572);ctx.lineTo(x+90,572);ctx.quadraticCurveTo(x+156,600,x+210,740);ctx.closePath();ctx.fill();
      ctx.fillStyle='#3a4a6c';ell(ctx,x,580,100,38);ctx.fill();ctx.fillStyle='rgba(255,255,255,.06)';ell(ctx,x-d*20,573,58,14);ctx.fill();
    }
    mrFist(ctx,214,642,1.4,smooth(13,19.5,lt),lt,0.8);
    ctx.fillStyle=`rgba(255,184,110,${0.05+0.09*gold})`;ctx.fillRect(0,0,W,H);
    ctx.restore();
    const sw=(lt*0.45)%1;ctx.save();ctx.globalCompositeOperation='screen';const lg=ctx.createLinearGradient(sw*W*2-W,0,sw*W*2,0);lg.addColorStop(0,'rgba(255,236,200,0)');lg.addColorStop(0.5,`rgba(255,236,200,${0.12+0.08*gold})`);lg.addColorStop(1,'rgba(255,236,200,0)');ctx.fillStyle=lg;ctx.fillRect(0,0,W,H);ctx.restore();
    /* 19 March, 08:00: the chat about it, over the memory */
    if(rise>0){
      ctx.fillStyle=`rgba(16,11,8,${0.36*rise})`;ctx.fillRect(0,0,W,H);
      const S=drawPhoneHand(ctx,lt,{x:892,y:lerp(780,96,rise),w:310,h:650});
      chatPanel(ctx,S,MR_LAST_MSGS,lt,{name:'Fabeha',status:'online'});
      ctx.save();ctx.globalAlpha=smooth(20.4,21.4,lt);ctx.shadowColor='rgba(0,0,0,.7)';ctx.shadowBlur=8;ctx.fillStyle='#fff3df';ctx.font='italic 500 26px "Cormorant Garamond",serif';ctx.textAlign='center';
      ctx.fillText('19 March · two months later',S.x+S.w/2-6,S.y-26);ctx.restore();
      phoneTop(ctx,S,{time:lt<27.3?'08:00':lt<31?'08:01':'08:02'});
    }
  },
  subs:[
    [0.8,5.6,'The last day of the trip. In the van, after I’d had a fight with a guy.'],
    [6.4,9.8,'She kept looking at me.'],
    [10.4,14.2,'The whole way. Consistently.'],
    [21.2,23.2,'I didnt say that but i did feel the energy','her'],
    [23.4,24.9,'I sensed it to on the van','him'],
    [25.0,27.1,'Jab ap ghoor ghoor Kr dekhti thi','him'],
    [27.3,29.4,'Lollllll  apko ghoor ghoor kar dekhba was only twice','her'],
    [29.6,30.8,'Multiple tomes','him'],
    [31.0,33.4,'Really i just rem malam jabba one and isl jatay way when you fought','her'],
    [33.6,35.6,'Yess i do isl mein 5,6 dafa','him'],
  ],
  score({T,pad,melody,hit,THEME_B}){
    const ch=['Em','Em','Cmaj7','G','D','Em7','Am7','Cadd9','Dsus','Em','Cmaj7'];
    for(let b=0;b<11;b++)pad(T(b),ch[b],1.05,b<6?0.36:0.28,'strings');
    for(let b=6;b<11;b++)pad(T(b),ch[b],1.05,0.2,'pad');
    for(let b=1;b<11;b++)melody(b,b-1,'box',12,b<6?0.34:0.26,THEME_B);
    for(const m of MR_LAST_MSGS)if(m.at>0)hit(m.at,'tick',m.who==='her'?{hi:true}:{});
  },
  amb(lt){const m=smooth(19.6,21.5,lt);return{hum:lerp(0.55,0.3,m),wind:0.1*(1-m),room:0.12*m};},
});

/* ================================================================================================
   23 January · what the maths is for
   The chat never says why she picked BS Mathematics; it does say what she wants it for. 20:03–20:07 she tells him
   she supports orphan children's education with her pocket money and that this is her "main legit motivation for qf"
   (lines 2278–2293). He wrote it in his notes that night (photos/call23.jpg). The next afternoon: Black–Scholes (2483–2487).
   ================================================================================================ */
const MR_WHY_MSGS=[
  {at:0,   who:'me', time:'19:58',text:'Khayrr rest assured bhaee you would never feeel uncomfy with me that i promise you, and i tend to keep my promises'},
  {at:6.9, who:'her',time:'20:03',text:'Like i lit work for these orphan kids'},
  {at:8.8, who:'her',time:'20:03',text:'By supporting them in education'},
  {at:9.6, who:'her',time:'20:03',text:'And work'},
  {at:10.6,who:'me', time:'20:04',text:'How do you help them?'},
  {at:12.0,who:'her',time:'20:04',text:'Through financial means'},
  {at:13.4,who:'her',time:'20:04',text:'Meri pocket money yahi jaati hai'},
  {at:15.3,who:'me', time:'20:05',text:'MashAllah bro 🙌🏻'},
  {at:16.6,who:'her',time:'20:07',text:'And that is my main legit motivation for qf so that i can support these kids with the privilege i had growing up with safety concerns and all'},
];
/* IBA, the School of Mathematics and Computer Science: red brick, cream stone, arches, a lawn */
function mrSmcs(){
  const c=mk(W,H),g=c.getContext('2d'),r=rng(1811);
  g.fillStyle=vgrad(g,0,H,[[0,'#78acdf'],[0.42,'#bcd7ee'],[0.62,'#efe5d2'],[1,'#efe5d2']]);g.fillRect(0,0,W,H);
  for(const[x,y,w,h,s]of[[40,30,320,96,1813],[840,58,360,104,1814]]){const cl=makeCloud(s,w,h,{hi:'#ffffff',sh:'#c3d3e6'});g.globalAlpha=0.9;g.drawImage(cl,x,y);g.globalAlpha=1;}
  for(let i=0;i<17;i++)drawTreeClump(g,20+i*78+r()*30,448,96+r()*50,'#2f5a36','#5f8f4f',r);
  const bx=120,by=176,bw=1040,bh=290;
  g.fillStyle='#a3503b';g.fillRect(bx,by,bw,bh);
  for(let i=0;i<2600;i++){const x=bx+r()*bw,y=by+Math.floor(r()*bh/9)*9;g.fillStyle=r()<0.5?'rgba(120,40,28,.16)':'rgba(225,145,115,.13)';g.fillRect(x,y+1,14+r()*10,7);}
  g.strokeStyle='rgba(245,215,195,.26)';g.lineWidth=1;for(let y=by+9;y<by+bh;y+=9){g.beginPath();g.moveTo(bx,y);g.lineTo(bx+bw,y);g.stroke();}
  g.fillStyle='#ece2cf';g.fillRect(bx-10,by-18,bw+20,20);g.fillStyle='#d8ccb4';g.fillRect(bx-10,by,bw+20,5);
  g.fillStyle='#ece2cf';g.fillRect(bx,by+128,bw,12);g.fillStyle='rgba(0,0,0,.08)';g.fillRect(bx,by+140,bw,4);
  for(let k=0;k<10;k++){const x=bx+40+k*100;if(Math.abs(x+30-640)<130)continue;
    g.fillStyle='#ece2cf';g.fillRect(x-6,by+30,72,78);g.fillStyle='#34485c';g.fillRect(x,by+36,60,66);
    g.fillStyle='rgba(200,225,245,.22)';g.beginPath();g.moveTo(x,by+36);g.lineTo(x+30,by+36);g.lineTo(x,by+78);g.closePath();g.fill();
    g.fillStyle='#ece2cf';g.fillRect(x+28,by+36,4,66);g.fillRect(x,by+66,60,3);g.fillRect(x-8,by+102,76,6);}
  for(let k=0;k<10;k++){const x=bx+38+k*100,ax=x+32,top=by+192;if(Math.abs(ax-640)<110)continue;
    g.fillStyle='#8c412f';g.beginPath();g.moveTo(x-6,by+bh-14);g.lineTo(x-6,top);g.arc(ax,top,38,Math.PI,0);g.lineTo(ax+38,by+bh-14);g.closePath();g.fill();
    g.fillStyle='#2c3b4b';g.beginPath();g.moveTo(x+2,by+bh-14);g.lineTo(x+2,top+2);g.arc(ax,top+2,30,Math.PI,0);g.lineTo(ax+30,by+bh-14);g.closePath();g.fill();
    g.fillStyle='rgba(200,225,245,.16)';g.fillRect(x+6,top+6,10,by+bh-24-top);}
  /* the entrance block in stone, the name plate above it (the lettering is painted in draw) */
  const ex=540;g.fillStyle='#ece2cf';g.fillRect(ex,by-18,200,bh+18);g.fillStyle='#d6c9b0';g.fillRect(ex,by+150,200,6);g.fillRect(ex-6,by-24,212,8);
  g.fillStyle='#2a3644';g.beginPath();g.moveTo(ex+44,by+bh-12);g.lineTo(ex+44,by+216);g.arc(ex+100,by+216,56,Math.PI,0);g.lineTo(ex+156,by+bh-12);g.closePath();g.fill();
  g.fillStyle='rgba(200,225,245,.18)';g.fillRect(ex+52,by+214,8,bh-238);g.fillStyle='#ece2cf';g.fillRect(ex+98,by+200,4,bh-212);
  g.fillStyle='#f7f1e4';g.fillRect(ex+10,by+26,180,96);g.strokeStyle='#c9b994';g.lineWidth=2;g.strokeRect(ex+15,by+31,170,86);
  g.fillStyle='#cfc3ad';g.fillRect(bx-10,by+bh-14,bw+20,14);
  g.fillStyle='#e3d9c6';g.fillRect(ex-20,by+bh,240,8);g.fillStyle='#d9cfbb';g.fillRect(ex-40,by+bh+8,280,8);
  g.fillStyle=vgrad(g,by+bh,H,[[0,'#7aa95d'],[1,'#5b8e45']]);g.fillRect(0,by+bh,ex-40,H);g.fillRect(ex+240,by+bh,W,H);g.fillRect(0,by+bh+16,W,H);
  g.fillStyle='#8cbb6c';for(let i=0;i<140;i++){g.globalAlpha=0.25+r()*0.4;ell(g,r()*W,by+bh+20+r()*240,24+r()*60,3+r()*5);g.fill();}g.globalAlpha=1;
  g.fillStyle='#dcd1bc';g.beginPath();g.moveTo(ex-40,by+bh+16);g.lineTo(ex+240,by+bh+16);g.lineTo(930,H);g.lineTo(350,H);g.closePath();g.fill();
  g.strokeStyle='rgba(160,140,110,.25)';g.lineWidth=1;for(let k=1;k<8;k++){const y=by+bh+16+k*k*4;g.beginPath();g.moveTo(0,y);g.lineTo(W,y);g.stroke();}
  for(const[x,s]of[[70,170],[1210,150]])drawTreeClump(g,x,560,s,'#2d6a3a','#6fb25a',r);
  for(const[x,h]of[[300,250],[980,230]]){g.strokeStyle='#8a6a48';g.lineWidth=12;g.lineCap='round';g.beginPath();g.moveTo(x,500);g.quadraticCurveTo(x+10,380,x+18,500-h);g.stroke();g.strokeStyle='#3f8a3f';g.lineWidth=7;for(let k=0;k<9;k++){const a=-Math.PI/2+(k/8-0.5)*2.6;g.beginPath();g.moveTo(x+18,500-h);g.quadraticCurveTo(x+18+Math.cos(a)*55,500-h+Math.sin(a)*55+18,x+18+Math.cos(a)*100,500-h+Math.sin(a)*100+62);g.stroke();}}
  g.fillStyle='rgba(0,0,0,.12)';g.fillRect(bx,by+bh-14,bw,4);
  return c;
}
/* a maths classroom inside it: the whiteboard on the left, the window on the right */
function mrClassroom(){
  const c=mk(W,H),g=c.getContext('2d'),r=rng(1821);
  g.fillStyle=vgrad(g,0,H,[[0,'#efe6d6'],[0.64,'#e3d6c1'],[0.641,'#cbb99c'],[0.78,'#c2ae90'],[0.781,'#a88664'],[1,'#8c6b4d']]);g.fillRect(0,0,W,H);
  g.strokeStyle='rgba(70,45,25,.18)';g.lineWidth=1.5;for(let y=576;y<H;y+=22){g.beginPath();g.moveTo(0,y);g.lineTo(W,y);g.stroke();}
  g.fillStyle='#fbf8f0';g.fillRect(180,16,560,9);g.fillStyle='rgba(255,250,235,.35)';g.fillRect(180,25,560,4);
  /* the window, with the red-brick wing across the lawn */
  const wx=1012,wy=108,ww=236,wh=326;
  g.fillStyle='#f6f1e6';g.fillRect(wx-14,wy-14,ww+28,wh+28);
  g.save();g.beginPath();g.rect(wx,wy,ww,wh);g.clip();
  g.fillStyle=vgrad(g,wy,wy+wh,[[0,'#8fc0ea'],[1,'#e6f0f4']]);g.fillRect(wx,wy,ww,wh);
  g.fillStyle='#a3503b';g.fillRect(wx,wy+140,ww,wh-140);g.strokeStyle='rgba(245,215,195,.25)';g.lineWidth=1;for(let y=wy+148;y<wy+wh;y+=8){g.beginPath();g.moveTo(wx,y);g.lineTo(wx+ww,y);g.stroke();}
  g.fillStyle='#ece2cf';g.fillRect(wx,wy+132,ww,10);
  for(let k=0;k<3;k++){const ax=wx+40+k*80;g.fillStyle='#2c3b4b';g.beginPath();g.moveTo(ax-22,wy+wh);g.lineTo(ax-22,wy+200);g.arc(ax,wy+200,22,Math.PI,0);g.lineTo(ax+22,wy+wh);g.closePath();g.fill();}
  drawTreeClump(g,wx+190,wy+330,170,'#2f5a36','#6a9a50',r);drawTreeClump(g,wx+30,wy+300,110,'#2f5a36','#6a9a50',r);
  g.restore();
  g.fillStyle='#f6f1e6';g.fillRect(wx+ww/2-4,wy,8,wh);g.fillRect(wx,wy+wh/2-4,ww,8);
  g.fillStyle='#e7dfcf';g.fillRect(wx-22,wy+wh+14,ww+44,10);
  /* the whiteboard */
  g.fillStyle='rgba(0,0,0,.12)';g.fillRect(64,98,640,338);
  g.fillStyle='#aeb4bc';g.fillRect(58,90,640,338);g.fillStyle='#fafbf8';g.fillRect(68,100,620,318);
  g.fillStyle=vgrad(g,100,418,[[0,'rgba(255,255,255,0)'],[1,'rgba(180,195,210,.18)']]);g.fillRect(68,100,620,318);
  for(let i=0;i<9;i++){g.fillStyle=`rgba(140,160,200,${0.04+r()*0.05})`;ell(g,90+r()*580,130+r()*270,40+r()*70,10+r()*16,r()*0.4-0.2);g.fill();}
  g.fillStyle='#9aa0a8';g.fillRect(64,426,632,10);
  for(const[x,col]of[[120,'#1d3b8c'],[150,'#b5382f'],[180,'#222']]){g.fillStyle=col;rrect(g,x,418,24,8,3);g.fill();g.fillStyle='#f2f2f2';rrect(g,x+16,418,10,8,2);g.fill();}
  g.fillStyle='#6a6e74';rrect(g,600,416,46,12,3);g.fill();g.fillStyle='#2b2d31';rrect(g,600,424,46,4,2);g.fill();
  return c;
}
/* her desk, painted in front of her */
function mrDesk(){
  const c=mk(W,H),g=c.getContext('2d');
  g.fillStyle='#8e6440';g.fillRect(668,628,520,110);g.fillStyle='rgba(0,0,0,.14)';g.fillRect(668,628,520,12);
  g.fillStyle='#b98858';g.beginPath();g.moveTo(700,576);g.lineTo(1150,576);g.lineTo(1196,630);g.lineTo(660,630);g.closePath();g.fill();
  g.fillStyle='rgba(255,236,200,.22)';g.beginPath();g.moveTo(700,576);g.lineTo(1150,576);g.lineTo(1160,586);g.lineTo(692,586);g.closePath();g.fill();
  g.save();g.translate(860,604);g.rotate(-0.06);g.fillStyle='#fdfcf8';g.fillRect(-82,-20,164,40);g.strokeStyle='rgba(80,120,190,.35)';g.lineWidth=1;for(let y=-12;y<20;y+=7){g.beginPath();g.moveTo(-78,y);g.lineTo(78,y);g.stroke();}
  g.strokeStyle='rgba(40,60,120,.7)';g.lineWidth=1.2;g.beginPath();for(let k=0;k<5;k++){const y=-10+k*7;g.moveTo(-70,y);for(let x=-70;x<20+k*8;x+=6)g.lineTo(x,y+Math.sin(x*0.7+k)*1.4);}g.stroke();
  g.fillStyle='#e94b3c';g.fillRect(-1,-22,2,44);g.restore();
  g.save();g.translate(1000,602);g.rotate(0.5);g.fillStyle='#1d3b8c';rrect(g,-36,-3,72,6,3);g.fill();g.fillStyle='#d9d9de';rrect(g,26,-3,10,6,2);g.fill();g.restore();
  return c;
}
/* Black–Scholes, in marker */
function mrBoard(ctx,lt){
  const ink='#1d3b8c',red='#b5382f';
  ctx.save();ctx.textBaseline='alphabetic';
  ctx.fillStyle=red;ctx.font='700 36px "Dancing Script",cursive';ctx.textAlign='left';ctx.fillText('Black–Scholes',96,156);
  ctx.strokeStyle=red;ctx.lineWidth=2.4;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(96,168);ctx.quadraticCurveTo(200,162,318,170);ctx.stroke();
  ctx.fillStyle=ink;ctx.font='700 22px "Dancing Script",cursive';ctx.textAlign='right';ctx.fillText('24 · 01 · 26',666,140);
  const F='italic 500 36px "Cormorant Garamond",serif',Fs='italic 500 27px "Cormorant Garamond",serif';
  let x=96;const y=252;
  const frac=(n,d)=>{ctx.font=Fs;const w=Math.max(ctx.measureText(n).width,ctx.measureText(d).width)+8;ctx.textAlign='center';ctx.fillText(n,x+w/2,y-10);ctx.fillText(d,x+w/2,y+26);ctx.strokeStyle=ink;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(x,y-2);ctx.lineTo(x+w,y-2);ctx.stroke();x+=w+10;};
  const txt=s=>{ctx.font=F;ctx.textAlign='left';ctx.fillText(s,x,y+8);x+=ctx.measureText(s).width+10;};
  ctx.fillStyle=ink;
  frac('∂V','∂t');txt('+');txt('½σ²S²');frac('∂²V','∂S²');txt('+ rS');frac('∂V','∂S');txt('− rV = 0');
  ctx.font=F;ctx.textAlign='left';const y2=338;let x2=96;
  const put=(s,f,dy)=>{ctx.font=f;ctx.fillText(s,x2,y2+(dy||0));x2+=ctx.measureText(s).width+4;};
  put('C = S N(d₁) − K e',F);put('−rT',Fs,-16);put(' N(d₂)',F);
  /* a bell curve with N(d₁) shaded */
  const cx0=478,cx1=668,base=388,pk=56,mu=566,sd=30,gx=v=>Math.exp(-((v-mu)*(v-mu))/(2*sd*sd));
  ctx.fillStyle='rgba(29,59,140,.16)';ctx.beginPath();ctx.moveTo(cx0,base);for(let v=cx0;v<=592;v+=3)ctx.lineTo(v,base-pk*gx(v));ctx.lineTo(592,base);ctx.closePath();ctx.fill();
  ctx.strokeStyle=ink;ctx.lineWidth=2.2;ctx.beginPath();for(let v=cx0;v<=cx1;v+=3){const yy=base-pk*gx(v);if(v===cx0)ctx.moveTo(v,yy);else ctx.lineTo(v,yy);}ctx.stroke();
  ctx.beginPath();ctx.moveTo(cx0-6,base);ctx.lineTo(cx1+6,base);ctx.moveTo(592,base+4);ctx.lineTo(592,base-pk*gx(592)-4);ctx.stroke();
  ctx.fillStyle=ink;ctx.font='italic 500 22px "Cormorant Garamond",serif';ctx.textAlign='center';ctx.fillText('d₁',598,base+19);ctx.fillText('N(d₁)',514,base-40);
  /* underlined as she names it */
  const u=smooth(31.0,31.9,lt);
  if(u>0){ctx.strokeStyle=red;ctx.lineWidth=2.8;ctx.beginPath();ctx.moveTo(92,y+44);const xe=lerp(92,610,u);for(let xx=92;xx<=xe;xx+=8)ctx.lineTo(xx,y+44+Math.sin(xx*0.05)*2.2);ctx.stroke();}
  ctx.restore();
}
function mrWhyExterior(ctx,lt,A){
  const z=1+0.04*clamp(lt/7);
  ctx.save();ctx.translate(640,330);ctx.scale(z,z);ctx.translate(-640,-330);
  ctx.drawImage(A.ext,0,0);
  ctx.fillStyle='#8a2f22';ctx.font='600 13px "Mulish",sans-serif';ctx.textAlign='center';setLS(ctx,'1px');ctx.fillText('IBA',640,226);
  ctx.fillStyle='#4a2a22';ctx.font='700 13px "Mulish",sans-serif';setLS(ctx,'1.5px');ctx.fillText('SCHOOL OF',640,250);ctx.fillText('MATHEMATICS &',640,268);ctx.fillText('COMPUTER SCIENCE',640,286);setLS(ctx,'0px');
  for(let k=0;k<3;k++){const p=(lt*0.035+k*0.31)%1,x=k===1?lerp(860,420,p):lerp(380,900,p);drawFigureFar(ctx,x,560+k*14,0.62+k*0.05,['#2f4b6e','#7b3e4a','#e8dece'][k],'#1e1a1c',lt,k);}
  ctx.restore();
  sunGlow(ctx,1080,70,460,'rgba(255,248,222,0.5)');
  motes(ctx,lt,30,1831,'#fff6cc',1.3,0.5);
}
function mrWhyPhone(ctx,lt,A){
  ctx.drawImage(A.R.night,0,0);ctx.fillStyle='rgba(0,0,10,.2)';ctx.fillRect(0,0,W,H);
  const S=drawPhoneHand(ctx,lt,{x:475,y:104,w:330,h:700});
  chatPanel(ctx,S,MR_WHY_MSGS,lt,{name:'World Cup Trophy',status:'online'});
  phoneTop(ctx,S,{time:lt<10.6?'20:03':lt<15.3?'20:04':lt<16.6?'20:05':'20:07'});
}
function mrWhyClass(ctx,lt,A){
  const k=clamp((lt-20)/20),z=1+0.05*k;
  ctx.save();ctx.translate(560,300);ctx.scale(z,z);ctx.translate(-560,-300);
  ctx.drawImage(A.room,0,0);
  mrBoard(ctx,lt);
  /* afternoon sun from the window across her desk */
  ctx.save();ctx.globalCompositeOperation='screen';
  const sg=ctx.createLinearGradient(1130,120,700,700);sg.addColorStop(0,'rgba(255,236,190,.34)');sg.addColorStop(1,'rgba(255,236,190,0)');
  ctx.fillStyle=sg;ctx.beginPath();ctx.moveTo(1012,120);ctx.lineTo(1248,120);ctx.lineTo(900,720);ctx.lineTo(560,720);ctx.closePath();ctx.fill();ctx.restore();
  /* her at the desk: on the board, then on us */
  const up=smooth(32.8,33.6,lt),happy=lt>36.2&&lt<38.6;
  drawFabeha(ctx,930,384,1.6,{t:lt,outfit:'uni',hair:'down',pose:'bust',arms:'lap',len:220,
    look:lerp(-0.85,0.03,up)+Math.sin(lt*0.5)*0.03,tilt:lerp(lt<28?0.07:0.03,-0.02,up),
    smile:lerp(lt>31?0.5:0.38,0.72,up),brow:lt>31&&lt<33?0.3:0,eyes:happy?'happy':undefined,blush:0.3+0.25*up+(happy?0.2:0),talk:(lt>31.0&&lt<32.4)||(lt>33.0&&lt<35.6)});
  ctx.drawImage(A.desk,0,0);
  ctx.restore();
  motes(ctx,lt,26,1841,'#fff2c8',1.2,0.4);
}

scene({id:'whymaths',name:'23 January · what the maths is for',when:'2026-01-23T20:03',bars:12,fin:['#000000',1.2],fout:['#000000',1.4],
  note:'IBA’s School of Mathematics and Computer Science in red brick; then his phone at 20:03, her contact still “World Cup Trophy”, as she tells him about the orphan children she supports with her pocket money and that they are why she wants quant finance; his note from that night; a whiteboard with Black–Scholes, and her, the next afternoon, saying her final-year project will be on it.',
  tag:'“my main legit motivation for qf” · 23 January, 20:07',
  prep(){return{ext:mrSmcs(),room:mrClassroom(),desk:mrDesk(),R:rooms(),buf:mk(W,H)};},
  draw(ctx,lt,A){
    const x1=smooth(6.2,7.0,lt),x2=smooth(19.9,20.9,lt);
    if(x1<1)mrWhyExterior(ctx,lt,A);else if(x2<1)mrWhyPhone(ctx,lt,A);else mrWhyClass(ctx,lt,A);
    const over=(fn,a)=>{const g=A.buf.getContext('2d');g.setTransform(1,0,0,1,0,0);g.globalAlpha=1;g.globalCompositeOperation='source-over';fn(g,lt,A);ctx.save();ctx.globalAlpha=a;ctx.drawImage(A.buf,0,0);ctx.restore();};
    if(x1>0&&x1<1)over(mrWhyPhone,x1);
    if(x2>0&&x2<1)over(mrWhyClass,x2);
  },
  subs:[
    [0.6,5.8,'BS Mathematics at IBA. That night she told me what she wanted the maths for.'],
    [6.9,8.7,'Like i lit work for these orphan kids','her'],
    [8.8,10.4,'By supporting them in education','her'],
    [10.6,11.9,'How do you help them?','him'],
    [12.0,13.3,'Through financial means','her'],
    [13.4,15.1,'Meri pocket money yahi jaati hai','her'],
    [15.3,16.4,'MashAllah bro 🙌🏻','him'],
    [16.6,20.6,'And that is my main legit motivation for qf so that i can support these kids with the privilege i had growing up with safety concerns and all','her'],
    [21.4,27.4,'In my notes that night: “Qf being the ultimate factor of contributing towards the support of orphen kids.”'],
    [28.0,30.6,'Waise quant do you know about the trillion dollar eq?','him'],
    [31.0,32.6,'Black scholes wali?','her'],
    [33.0,35.8,'Mein ussi se fyp par kam karungi hopefully','her'],
    [36.2,37.8,'MA❤️','him'],
  ],
  score({bars,melody,hit,THEME}){
    const up=[0,2,3,4,5,4,3,2,0,2,3,4,5,4,3,2];
    bars(0,2,['G','D'],{padVel:0.32,arp:up,arpVel:0.12,step:0.25});
    bars(2,4,['Em','C','G','D'],{padVel:0.26});
    for(const m of MR_WHY_MSGS)if(m.at>0)hit(m.at,'tick',m.who==='her'?{hi:true}:{});
    bars(6,6,['G','Em','C','D','G','Bm'],{padVel:0.3,arp:up,arpVel:0.12,step:0.25});
    for(let b=6;b<12;b++)melody(b,b-6,'pluck',0,0.34,THEME);
    hit(31.0,'chime',{midi:88,vel:0.26});
  },
  amb(lt){return lt<6.6?{wind:0.12,crowd:0.1}:lt<20.4?{room:0.25}:{room:0.14,crowd:0.03};},
});


/* ================================================================================================
   18 June · FYP chaos
   The FYP was due that week. 23:27–23:45 (lines 28038–28131) she tells him the saga: her sir gave her a template, she
   followed it completely, on Monday he found faults in it anyway, gave another one, she did all of that, on Tuesday
   "he says kay nhi". Her four voice notes that night (28039, 28106, 28108, 28123) are his recorded instructions: "I do that
   so i dont forbet any of his instruction" / "I replay it while working" (28129–28131). So they are not played here; the
   supervisor is only a voice from off-screen, no face, no name. Fazul's account: it made them both laugh; he listened to all of it.
   ================================================================================================ */
const FC_MSGS=[
  {at:0,   who:'her',time:'23:27',text:'Bhai aik dafa mekn sari instructions do na ye kia intervals meom diya jarahe hain'},
  {at:0,   who:'her',time:'23:28',voice:28,play:12.8},
  {at:15.6,who:'her',time:'23:29',text:'Loke bro so so kay yad kyun araha hai'},
  {at:17.3,who:'me', time:'23:30',text:'🤣🤣🤣🤣🤣🤣🤣🤣'},
  {at:18.0,who:'her',time:'23:31',text:'Toh aise badle nikale gai 😭😭😭😭😭'},
  {at:20.0,who:'her',time:'23:35',text:'Pehle he give aik template to follow'},
  {at:21.0,who:'her',time:'23:35',text:'Toh i followd that temolate completeky'},
  {at:23.0,who:'her',time:'23:35',text:'Ohir mon ko kiay keeray usmein'},
  {at:23.9,who:'her',time:'23:35',text:'But i didnt complain'},
  {at:25.6,who:'me', time:'23:36',text:'Tou ye sab khuwari itne dino se'},
  {at:26.3,who:'me', time:'23:36',text:'Format pe horahi apki?'},
  {at:27.8,who:'her',time:'23:37',voice:41},
  {at:28.6,who:'her',time:'23:38',text:'Phir i did all of that now ab tues he says kay nhi'},
  {at:30.6,who:'her',time:'23:39',text:'Ye aisay kar karke is he trying to annoy me ya fail me'},
  {at:31.5,who:'her',time:'23:39',text:'I dont get it'},
  {at:32.8,who:'me', time:'23:39',text:'Saare hee krloye'},
  {at:33.4,who:'me', time:'23:39',text:'🤣🤣🤣🤣🤣🤣'},
];
/* a WhatsApp thread that can hold voice-note rows: the panel paints the background, header and input bar, the rows are stacked here */
function fcThread(ctx,S,msgs,lt){
  chatPanel(ctx,S,[],lt,{name:'Fabeha',status:'online'});
  const top=S.y+36+58,bottom=Math.min(S.y+S.h-66,H-152),maxW=S.w*0.74,pad=10,lh=19;   /* the thread stops above a two-line subtitle band */
  ctx.save();ctx.beginPath();ctx.rect(S.x,top,S.w,bottom-top);ctx.clip();
  const vis=msgs.filter(m=>m.at<=lt);let y=bottom-6;
  const typing=msgs.find(m=>m.at>lt&&m.at-lt<1.4&&m.who==='her'&&!m.voice);
  if(typing){const px=S.x+14,py=y-30;ctx.fillStyle='#202c33';rrect(ctx,px,py,58,30,12);ctx.fill();for(let k=0;k<3;k++){const b=0.5+0.5*Math.sin(lt*8-k*1.1);ctx.fillStyle=`rgba(160,175,185,${(0.4+0.6*b).toFixed(3)})`;circle(ctx,px+16+k*13,py+15-b*3,3.4);ctx.fill();}y=py-8;}
  for(let i=vis.length-1;i>=0&&y>top-70;i--){
    const m=vis[i],mine=m.who==='me',pop=i===vis.length-1?backOut(clamp((lt-m.at)/0.28)):1;
    ctx.font='500 15px "Mulish",sans-serif';ctx.textAlign='left';
    if(m.voice){const bw=Math.round(S.w*0.8),bh=54,by=y-bh,bx=S.x+14,prog=m.play!=null&&lt>=m.play?clamp((lt-m.play)/m.voice):null;
      ctx.save();ctx.translate(bx,by+bh);ctx.scale(pop,pop);ctx.translate(-bx,-(by+bh));voiceBubble(ctx,bx,by,bw,m.voice,m.time,prog,true);ctx.restore();y=by-7;continue;}
    const lines=wrapText(ctx,m.text,maxW-pad*2);let bw=0;for(const l of lines)bw=Math.max(bw,ctx.measureText(l).width);
    const tw=ctx.measureText(m.time).width*0.8+8;bw=Math.min(maxW+8,Math.max(bw+pad*2+6,tw+pad*2+10));
    const bh=lines.length*lh+pad*2+10,by=y-bh,bx=mine?S.x+S.w-14-bw:S.x+14;
    ctx.save();ctx.translate(mine?bx+bw:bx,by+bh);ctx.scale(pop,pop);ctx.translate(mine?-(bx+bw):-bx,-(by+bh));
    ctx.fillStyle=mine?'#005c4b':'#202c33';rrect(ctx,bx,by,bw,bh,12);ctx.fill();
    ctx.fillStyle='#e9edef';for(let k=0;k<lines.length;k++)ctx.fillText(lines[k],bx+pad,by+pad+14+k*lh);
    ctx.fillStyle='rgba(233,237,239,.55)';ctx.font='500 11px "Mulish",sans-serif';ctx.textAlign='right';ctx.fillText(m.time+(mine?'  ✓✓':''),bx+bw-8,by+bh-7);
    ctx.restore();y=by-7;
  }
  ctx.restore();
}
/* her desk, painted in front of her: the laptop with the document open, the printed draft, a pen, the tea, and the phone propped up on the left */
function fcDeskFront(){
  const c=mk(W,H),g=c.getContext('2d');
  g.fillStyle='#4a3b40';g.fillRect(0,556,W,12);g.fillStyle=vgrad(g,568,720,[[0,'#33282e'],[1,'#1b1519']]);g.fillRect(0,568,W,152);
  g.fillStyle='rgba(255,255,255,.08)';g.fillRect(0,556,W,2);
  const lp=g.createRadialGradient(900,600,0,900,600,420);lp.addColorStop(0,'rgba(255,205,140,.22)');lp.addColorStop(1,'rgba(255,205,140,0)');g.fillStyle=lp;g.fillRect(0,556,W,164);
  /* the laptop */
  g.fillStyle='rgba(0,0,0,.35)';ell(g,870,572,190,16);g.fill();
  g.fillStyle='#262630';rrect(g,748,368,250,190,10);g.fill();g.fillStyle='#0f1118';rrect(g,760,380,226,166,5);g.fill();
  g.fillStyle='#f7f4ee';g.fillRect(776,392,194,154);g.fillStyle='#e4e0d8';g.fillRect(776,392,194,9);
  g.fillStyle='#2a2a30';g.font='700 9px "Mulish",sans-serif';g.textAlign='left';g.fillText('Black–Scholes vs GARCH',788,416);
  g.strokeStyle='rgba(60,60,70,.5)';g.lineWidth=1.2;for(let k=0;k<9;k++){const y=428+k*11,w=100+((k*37)%70);g.beginPath();g.moveTo(788,y);g.lineTo(788+w,y);g.stroke();}
  g.fillStyle='#1d3b8c';g.font='italic 500 11px "Cormorant Garamond",serif';g.fillText('C = S·N(d₁) − K·e^(−rT)·N(d₂)',790,538);
  g.fillStyle='rgba(190,215,255,.1)';g.beginPath();g.moveTo(760,380);g.lineTo(880,380);g.lineTo(760,520);g.closePath();g.fill();
  g.fillStyle='#2a2a34';g.beginPath();g.moveTo(736,558);g.lineTo(1010,558);g.lineTo(1030,604);g.lineTo(716,604);g.closePath();g.fill();
  g.fillStyle='#1c1c24';for(let r=0;r<4;r++)for(let k=0;k<14;k++){const u=(r+0.5)/4,y=564+r*9,x0=740+k*19-u*6;g.fillRect(x0,y,15,6);}
  g.fillStyle='#22222c';g.fillRect(846,598,80,4);
  /* the printed draft, with his corrections in red */
  for(let k=0;k<3;k++){g.save();g.translate(520,598);g.rotate(-0.12+k*0.06);g.fillStyle=k===2?'#f6f1e8':'#ebe5da';g.fillRect(-76,-26,152,52);g.strokeStyle='rgba(60,50,45,.25)';g.lineWidth=1;for(let y=-16;y<22;y+=6){g.beginPath();g.moveTo(-64,y);g.lineTo(60,y);g.stroke();}
    if(k===2){g.strokeStyle='rgba(210,50,50,.85)';g.lineWidth=1.4;g.beginPath();g.moveTo(-50,-10);g.quadraticCurveTo(-30,-18,-8,-8);g.moveTo(10,2);g.lineTo(44,2);g.moveTo(-60,14);g.quadraticCurveTo(-40,8,-20,16);g.stroke();g.beginPath();g.ellipse(30,-12,16,7,0.1,0,TAU);g.stroke();}
    g.restore();}
  g.save();g.translate(640,610);g.rotate(0.35);g.fillStyle='#b5382f';rrect(g,-34,-3,68,6,3);g.fill();g.fillStyle='#d9d9de';rrect(g,24,-3,10,6,2);g.fill();g.restore();
  /* the tea */
  g.fillStyle='rgba(0,0,0,.3)';ell(g,1118,582,26,7);g.fill();
  g.fillStyle='#f4efe6';rrect(g,1100,548,26,32,5);g.fill();g.fillStyle='#b87333';ell(g,1113,550,11,3.5);g.fill();g.strokeStyle='#f4efe6';g.lineWidth=4;g.beginPath();g.arc(1131,563,7,-Math.PI/2,Math.PI/2);g.stroke();
  /* the phone, propped up on the left (its screen is painted live) */
  g.save();g.translate(346,484);g.rotate(-0.06);
  g.fillStyle='rgba(0,0,0,.4)';ell(g,0,84,52,10);g.fill();
  g.fillStyle='#17171c';rrect(g,-46,-80,92,164,12);g.fill();g.fillStyle='#0b0d12';rrect(g,-41,-75,82,154,8);g.fill();
  g.restore();
  return c;
}
/* the phone's screen: recording (the red REC bar) in the first shot, playing him back in the last */
function fcPhoneScreen(ctx,lt,mode,spk){
  ctx.save();ctx.translate(346,484);ctx.rotate(-0.06);ctx.beginPath();ctx.rect(-41,-75,82,154);ctx.clip();
  ctx.fillStyle='#0b0d12';ctx.fillRect(-41,-75,82,154);
  ctx.font='700 10px "Mulish",sans-serif';ctx.textBaseline='alphabetic';
  if(mode==='rec'){
    const s=Math.floor(12+lt),pulse=0.55+0.45*Math.sin(lt*5);
    ctx.fillStyle='#d9342b';ctx.fillRect(-41,-75,82,22);
    ctx.fillStyle=`rgba(255,255,255,${pulse.toFixed(3)})`;circle(ctx,-30,-64,4);ctx.fill();
    ctx.fillStyle='#ffffff';ctx.textAlign='left';ctx.fillText('REC',-22,-60);ctx.textAlign='right';ctx.fillText('00:'+String(s).padStart(2,'0'),36,-60);
    ctx.fillStyle='#8a93a6';ctx.font='600 8px "Mulish",sans-serif';ctx.textAlign='left';ctx.fillText('Recording',-34,-38);
    for(let k=0;k<17;k++){const h=3+(4+24*Math.abs(Math.sin(lt*9+k*1.7)))*spk;ctx.fillStyle='#e0574f';ctx.fillRect(-36+k*4.5,8-h/2,3,h);}
    ctx.fillStyle='#2a2a33';circle(ctx,0,54,15);ctx.fill();ctx.fillStyle='#d9342b';rrect(ctx,-6,48,12,12,3);ctx.fill();
  }else{
    const p=clamp((lt-34.5)/41);
    ctx.fillStyle='#1f2c34';ctx.fillRect(-41,-75,82,22);ctx.fillStyle='#00a884';ctx.textAlign='left';ctx.fillText('PLAYING',-34,-60);
    ctx.fillStyle='#ffffff';ctx.beginPath();ctx.moveTo(26,-68);ctx.lineTo(34,-64);ctx.lineTo(26,-60);ctx.closePath();ctx.fill();
    for(let k=0;k<17;k++){const h=3+(4+24*Math.abs(Math.sin(lt*9+k*1.7)))*spk;ctx.fillStyle=k/17<p*4?'#00a884':'#39434c';ctx.fillRect(-36+k*4.5,8-h/2,3,h);}
    ctx.fillStyle='#39434c';rrect(ctx,-34,30,68,3,1.5);ctx.fill();ctx.fillStyle='#00a884';rrect(ctx,-34,30,Math.max(2,68*p),3,1.5);ctx.fill();circle(ctx,-34+68*p,31.5,4);ctx.fill();
    ctx.fillStyle='#aebac1';ctx.font='600 8px "Mulish",sans-serif';ctx.textAlign='left';ctx.fillText('0:'+String(Math.floor(p*41)).padStart(2,'0'),-34,46);ctx.textAlign='right';ctx.fillText('0:41',34,46);
    ctx.fillStyle='#2a2a33';circle(ctx,0,60,13);ctx.fill();ctx.fillStyle='#e9edef';ctx.fillRect(-5,54,3,12);ctx.fillRect(2,54,3,12);
  }
  ctx.restore();
}
/* her sir: only a voice, from off-screen. A speech bubble with its tail to the edge of the frame; sound rings while he talks */
function fcVoiceIcon(ctx,lt,x,y,spk){
  ctx.save();
  for(let k=0;k<3;k++){const p=(lt*0.8+k/3)%1,a=(1-p)*0.55*spk;if(a<=0.01)continue;ctx.strokeStyle=`rgba(255,240,220,${a.toFixed(3)})`;ctx.lineWidth=2.5;ctx.beginPath();ctx.arc(x+120,y+33,22+p*80,-0.6,0.6);ctx.stroke();}
  ctx.shadowColor='rgba(0,0,0,.5)';ctx.shadowBlur=14;ctx.shadowOffsetY=4;
  ctx.fillStyle='#f3efe6';rrect(ctx,x,y,118,66,22);ctx.fill();
  ctx.beginPath();ctx.moveTo(x+6,y+28);ctx.lineTo(x-42,y+58);ctx.lineTo(x+22,y+54);ctx.closePath();ctx.fill();
  ctx.shadowColor='rgba(0,0,0,0)';ctx.shadowBlur=0;ctx.shadowOffsetY=0;
  for(let k=0;k<9;k++){const h=5+(4+22*Math.abs(Math.sin(lt*7+k*1.3)))*spk;ctx.fillStyle='#6b5a68';rrect(ctx,x+18+k*10,y+33-h/2,6,h,3);ctx.fill();}
  ctx.restore();
}
function fcDeskShot(ctx,lt,A,part){
  const C=part==='C',z=1+0.05*(C?smooth(34.5,43.3,lt):clamp(lt/12.5));
  const win=(a,b)=>smooth(a,a+0.3,lt)*(1-smooth(b,b+0.3,lt));
  const spk=C?win(35.2,37.6)+win(38.6,41.4):win(2.0,4.4)+win(5.0,8.6)+win(9.4,11.8);
  const atPhone=C?0.8:win(1.8,4.8)+win(9.2,12.4),laugh=C?win(36.0,38.2)+win(39.8,41.6):0;
  ctx.save();ctx.translate(600,420);ctx.scale(z,z);ctx.translate(-600,-420);
  ctx.drawImage(A.her,0,0);
  ctx.save();ctx.globalCompositeOperation='screen';glow(ctx,1150,250,360,'#ffd2a0',0.22);glow(ctx,720,400,260,'#a8c8ff',0.16);ctx.restore();
  drawFabeha(ctx,560,318,1.3,{t:lt,outfit:'home',hair:'halfup',pose:'seat',arms:'lap',len:220,legCol:'#3a3440',
    look:lerp(0.45,-0.55,atPhone)+Math.sin(lt*0.7)*0.04,
    tilt:C?0.04+0.05*Math.sin(lt*9)*laugh:0.03-0.04*atPhone,
    brow:C?0:0.35*spk*atPhone,
    smile:C?0.9:0.18+0.22*smooth(8,10.5,lt),
    eyes:laugh>0.5?'happy':undefined,
    blush:C?0.5:0.3});
  ctx.drawImage(A.desk,0,0);
  fcPhoneScreen(ctx,lt,C?'play':'rec',spk);
  fcVoiceIcon(ctx,lt,C?64:lerp(-170,64,easeOut(smooth(1.2,2.2,lt))),300,spk);
  ctx.restore();
  motes(ctx,lt,18,1851,'#ffe6c0',1.1,0.3);
}
function fcPhoneShot(ctx,lt,A){
  ctx.drawImage(A.R.night,0,0);ctx.fillStyle='rgba(0,0,10,.22)';ctx.fillRect(0,0,W,H);
  const S=drawPhoneHand(ctx,lt,{x:475,y:70,w:300,h:640});
  fcThread(ctx,S,FC_MSGS,lt);
  const last=FC_MSGS.filter(m=>m.at<=lt).pop();
  phoneTop(ctx,S,{time:last?last.time:'23:28'});
  ctx.save();ctx.globalCompositeOperation='screen';glow(ctx,S.x+S.w/2,S.y+S.h*0.75,320,'#7fa6d8',0.1);ctx.restore();
}

scene({id:'fypchaos',name:'18 June · FYP chaos',when:'2026-06-18T23:28',bars:13,fin:['#000000',1.2],fout:['#000000',1.2],
  note:'her desk at night, the FYP open on the laptop and the printed draft marked in red; the phone propped up beside her with the red REC bar, recording her sir — who is only a voice from off-screen, a speech bubble, no face. Then his phone at 23:27–23:39: the saga in her words, two voice notes of his recorded instructions in the thread, and both of them laughing. Last, her replaying him while she works.',
  tag:'“I replay it while working” · 18 June, 23:45',
  prep(){return{her:sep_herRoom().back,desk:fcDeskFront(),R:rooms(),buf:mk(W,H)};},
  draw(ctx,lt,A){
    const x1=smooth(12.2,13.2,lt),x2=smooth(34.0,35.0,lt);
    if(x1<1)fcDeskShot(ctx,lt,A,'A');else if(x2<1)fcPhoneShot(ctx,lt,A);else fcDeskShot(ctx,lt,A,'C');
    const over=(fn,a)=>{const g=A.buf.getContext('2d');g.setTransform(1,0,0,1,0,0);g.globalAlpha=1;g.globalCompositeOperation='source-over';fn(g,lt,A);ctx.save();ctx.globalAlpha=a;ctx.drawImage(A.buf,0,0);ctx.restore();};
    if(x1>0&&x1<1)over(fcPhoneShot,x1);
    if(x2>0&&x2<1)over((g,t,B)=>fcDeskShot(g,t,B,'C'),x2);
  },
  subs:[
    [0.8,5.2,'18 June, half past eleven. Her FYP, and her sir, who kept changing what he wanted.'],
    [5.6,8.8,'So she recorded him. Every instruction.'],
    [9.2,12.4,'She did exactly what he asked. He bullied her anyway.'],
    [12.8,15.4,'Bhai aik dafa mekn sari instructions do na ye kia intervals meom diya jarahe hain','her'],
    [15.6,17.2,'Loke bro so so kay yad kyun araha hai','her'],
    [18.0,19.8,'Toh aise badle nikale gai 😭😭😭😭😭','her'],
    [20.0,22.8,'Pehle he give aik template to follow Toh i followd that temolate completeky','her'],
    [23.0,25.4,'Ohir mon ko kiay keeray usmein But i didnt complain','her'],
    [25.6,27.6,'Tou ye sab khuwari itne dino se Format pe horahi apki?','him'],
    [28.6,30.4,'Phir i did all of that now ab tues he says kay nhi','her'],
    [30.6,32.6,'Ye aisay kar karke is he trying to annoy me ya fail me I dont get it','her'],
    [32.8,34.4,'Saare hee krloye 🤣🤣🤣🤣🤣🤣','him'],
    [35.4,38.0,'We laughed till it hurt. I listened to all of it.'],
    [38.4,41.8,'I do that so i dont forbet any of his instruction I replay it while working','her'],
  ],
  score({bars,melody,hit,THEME_B}){
    bars(0,13,['G','C','D','Em','C','G','D','G'],{padVel:0.22,arp:true,arpVel:0.1,step:0.25});
    for(let b=0;b<4;b++)melody(b,b,'pluck',12,0.34,THEME_B);
    for(let b=4;b<10;b++)melody(b,b-4,'box',12,0.3,THEME_B);
    for(let b=10;b<13;b++)melody(b,b-6,'pluck',12,0.3,THEME_B);
    for(const m of FC_MSGS)if(m.at>0)hit(m.at,'tick',m.who==='her'?{hi:true}:{});
  },
  amb(lt){const ph=lt>12.7&&lt<34.5;return{room:ph?0.22:0.3,hum:ph?0:0.06};},
});

/* ---------- Interval: the two chairs at dusk, and the second half announced ---------- */
scene({id:'interval',name:'Interval',when:'2026-08-21T20:30',bars:9,fin:['#000000',1.8],fout:['#000000',2.0],
  note:'the two chairs at dusk; the first half ends here. The second half is the harder one, told the same way: in his own words.',
  tag:'وقفہ',
  prep(){return need('end').prep();},
  draw(ctx,lt,A){
    paintSky(ctx,[[0,'#2b2a5e'],[0.4,'#8d5a86'],[0.7,'#f0a06a'],[0.85,'#ffd9a0']]);
    stars(ctx,lt,120,131,H*0.35,0.6);
    ctx.save();ctx.globalAlpha=0.6;ctx.drawImage(A.S.far.c,-100,30);ctx.restore();ctx.drawImage(A.hill.c,-60,0);
    ctx.fillStyle=vgrad(ctx,380,520,[[0,'#e6d9e4'],[1,'#b7a7c2']]);ctx.beginPath();ctx.moveTo(0,420);ctx.lineTo(W,380);ctx.lineTo(W,520);ctx.lineTo(0,520);ctx.closePath();ctx.fill();
    liftLine(ctx,lt,[120,318],[1200,372],{n:7,spd:0.02,s0:0.3,s1:0.5,dir:1});
    ctx.fillStyle='#5a4432';ctx.fillRect(0,500,W,220);for(let k=0;k<12;k++){const y=500+k*19;ctx.fillStyle=k%2?'#4f3b2a':'#5e4834';ctx.fillRect(0,y,W,19);}
    ctx.fillStyle='#3a2a1e';ctx.fillRect(0,468,W,10);for(let x=40;x<W;x+=140){ctx.fillRect(x,470,8,36);}
    plasticChair(ctx,430,700,1.5,'#d9dde3');plasticChair(ctx,905,690,1.45,'#d9dde3');
    snowfall(ctx,lt,90,132,6,2,0.75);
    const dim=smooth(2,5,lt)*0.55;ctx.fillStyle=`rgba(8,6,18,${dim.toFixed(3)})`;ctx.fillRect(0,0,W,H);
    const a=smooth(3,5,lt);
    if(a>0){ctx.save();ctx.globalAlpha=a;ctx.textAlign='center';ctx.fillStyle='#fff6e8';ctx.shadowColor='rgba(20,10,40,.8)';ctx.shadowBlur=24;
      ctx.font='500 22px "Mulish",sans-serif';setLS(ctx,'10px');ctx.fillText('INTERVAL',640,250);setLS(ctx,'0px');
      ctx.font='400 54px "Noto Nastaliq Urdu",serif';ctx.fillText('وقفہ',640,330);
      ctx.globalAlpha=a*smooth(12,14.5,lt);ctx.font='italic 500 30px "Cormorant Garamond",serif';ctx.fillStyle='#ffe9cf';ctx.fillText('Part two. The harder half, told the same way: in my own words.',640,420);
      ctx.restore();}
  },
  subs:[],
  score({T,pad,melody,bars,hit,THEME}){bars(0,9,['G','Em','Cmaj7','Dsus'],{padVel:0.4});for(let b=2;b<6;b++)melody(b,b+4,'box',12,0.45,THEME);hit(13.5,'chime',{midi:91,vel:0.4});},
  amb(lt){return{wind:0.35};},
});
