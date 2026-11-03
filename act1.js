/* act1.js — Act I · the mountains and the first weeks: Malam Jabba, the van, Kalam, the beach bet (scenes 1–6 of cut 3). */
'use strict';
act('I','Snow','the grad trip · January 2026','2026-01-22T23:59');

/* shared snow-country assets (Malam Jabba / Swat) */
let SNOWSET=null;
function snowset(){
  if(SNOWSET)return SNOWSET;
  SNOWSET={
    far:makeLayer({w:1700,seed:11,y0:300,amp:120,oct:4,f0:0.003,top:'#f6f8fb',bottom:'#c6d5e5',patches:['#dde7f0','#b3c4d8'],patchN:90,rock:'#8a98ab',rim:'#ffffff',rimA:0.7,rimW:3}),
    peaks:makeLayer({w:1700,seed:15,y0:260,amp:170,oct:4,f0:0.0025,top:'#ffffff',bottom:'#b9cadc',patches:['#e4ecf4','#9fb3c8'],patchN:110,rock:'#6f7f94',rim:'#ffffff',rimA:0.8,rimW:4}),
    mid:makeLayer({w:1700,seed:12,y0:432,amp:60,oct:3,f0:0.004,top:'#e9eff3',bottom:'#9fb3c3',patches:['#f6f8fa','#8aa0b2'],pines:{n:280,size:34,sink:4,dark:'#1f3a30',light:'#2f5543',snow:'#eef4f8'},rim:'#ffffff',rimA:0.5,rimW:3}),
    wisps:makeWisps(14,1000,260),
  };
  return SNOWSET;
}
function liftChair(ctx,x,y,s,o={}){
  ctx.save();ctx.translate(x,y);ctx.scale(s,s);
  ctx.strokeStyle='#3b3f47';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(0,-70);ctx.lineTo(0,-6);ctx.stroke();
  ctx.fillStyle='#2b2f36';ctx.fillRect(-26,-10,52,6);ctx.fillRect(-26,-34,4,26);ctx.fillRect(22,-34,4,26);
  ctx.fillStyle=o.col||'#c9452f';ctx.fillRect(-24,-36,48,10);
  if(o.people){ctx.fillStyle='#2a2d3a';for(const px of o.people){ctx.fillRect(px-7,-32,14,22);circle(ctx,px,-38,6);ctx.fill();}}
  ctx.strokeStyle='#5a606b';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(-26,-20);ctx.lineTo(26,-20);ctx.stroke();
  ctx.restore();
}
function liftLine(ctx,lt,p0,p1,o={}){
  const n=o.n||7,spd=o.spd||0.03;
  ctx.strokeStyle='rgba(40,44,52,.75)';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(p0[0],p0[1]-6);ctx.lineTo(p1[0],p1[1]-6);ctx.stroke();
  for(let k=0;k<4;k++){const u=0.12+k*0.24,x=lerp(p0[0],p1[0],u),y=lerp(p0[1],p1[1],u),s=lerp(o.s0||0.25,o.s1||1,u);ctx.fillStyle='#4a4f5a';ctx.fillRect(x-2*s,y-6,4*s,80*s);ctx.fillRect(x-12*s,y-8,24*s,4*s);}
  for(let k=0;k<n;k++){const u=((k/n)+lt*spd*(o.dir||1))%1,uu=(u+1)%1,x=lerp(p0[0],p1[0],uu),y=lerp(p0[1],p1[1],uu),s=lerp(o.s0||0.25,o.s1||1,uu);liftChair(ctx,x,y+70*s,s,{col:k%3?'#c9452f':'#2f6fb5',people:k%2?[-10,10]:[]});}
}
function gulls(ctx,lt){ctx.save();ctx.strokeStyle='rgba(60,50,60,.7)';ctx.lineWidth=1.6;ctx.lineCap='round';for(const[st,y0,s]of[[0.5,150,1],[1.4,180,0.8],[2.2,135,0.9]]){const u=lt-st;if(u<0)continue;const x=-40+u*70*s,y=y0+Math.sin(u*1.1)*12;if(x>W+40)continue;const f=Math.sin(u*9)*0.6+0.3;ctx.beginPath();ctx.moveTo(x-9*s,y-5*s*f);ctx.quadraticCurveTo(x-4*s,y-s,x,y+s);ctx.quadraticCurveTo(x+4*s,y-s,x+9*s,y-5*s*f);ctx.stroke();}ctx.restore();}
function plasticChair(ctx,x,y,s,col='#e9eef3'){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.fillStyle=col;rrect(ctx,-30,-72,60,48,10);ctx.fill();rrect(ctx,-34,-26,68,12,5);ctx.fill();ctx.fillStyle=mixHex(col,'#000000',0.25);for(const dx of[-28,23]){ctx.fillRect(dx,-14,5,44);}ctx.fillStyle='rgba(0,0,0,.08)';rrect(ctx,-26,-68,52,40,8);ctx.fill();ctx.restore();}
function drawHotel(ctx,x,y,s){
  ctx.save();ctx.translate(x,y);ctx.scale(s,s);
  ctx.fillStyle='#d9d4cc';ctx.fillRect(-260,-150,520,150);
  ctx.fillStyle='#8f3b2f';ctx.beginPath();ctx.moveTo(-280,-150);ctx.lineTo(-200,-230);ctx.lineTo(200,-230);ctx.lineTo(280,-150);ctx.closePath();ctx.fill();
  ctx.fillStyle='#f3f6f9';ctx.beginPath();ctx.moveTo(-280,-150);ctx.lineTo(-200,-230);ctx.lineTo(200,-230);ctx.lineTo(280,-150);ctx.lineTo(250,-154);ctx.lineTo(190,-218);ctx.lineTo(-190,-218);ctx.lineTo(-250,-154);ctx.closePath();ctx.fill();
  ctx.fillStyle='#cfc8bd';ctx.fillRect(-380,-110,120,110);ctx.fillRect(260,-110,120,110);
  ctx.fillStyle='#8f3b2f';ctx.beginPath();ctx.moveTo(-392,-110);ctx.lineTo(-320,-164);ctx.lineTo(-248,-110);ctx.closePath();ctx.fill();ctx.beginPath();ctx.moveTo(248,-110);ctx.lineTo(320,-164);ctx.lineTo(392,-110);ctx.closePath();ctx.fill();
  ctx.fillStyle='#2b3f5c';for(let r=0;r<3;r++)for(let k=0;k<9;k++)ctx.fillRect(-240+k*56,-138+r*44,32,28);
  for(const wx of[-370,270])for(let r=0;r<2;r++)for(let k=0;k<2;k++)ctx.fillRect(wx+k*56,-98+r*44,32,28);
  ctx.fillStyle='#e6e1d8';ctx.fillRect(-40,-60,80,60);ctx.fillStyle='#3a3f47';ctx.fillRect(-4,-300,4,70);ctx.fillStyle='#1f6b3a';ctx.fillRect(0,-300,40,24);ctx.fillStyle='#fff';ctx.fillRect(18,-294,10,10);
  ctx.restore();
}
/* her, on the zipline: seated harness, holding the straps, hair flying back */
function drawZipRider(ctx,x,y,s,t,o={}){
  ctx.save();ctx.translate(x,y);ctx.scale(s,s);
  ctx.strokeStyle='#6b6f78';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(0,-150);ctx.lineTo(-52,40);ctx.moveTo(0,-150);ctx.lineTo(52,40);ctx.stroke();
  ctx.fillStyle='#3a3f47';rrect(ctx,-14,-160,28,22,6);ctx.fill();ctx.fillStyle='#8f949e';circle(ctx,-8,-150,5);ctx.fill();circle(ctx,8,-150,5);ctx.fill();
  drawFabeha(ctx,0,0,1,{t,outfit:'sweater',hair:'down',shades:o.shades,pose:'seat',legCol:'#3a3330',arms:'hug',smile:o.smile??1,eyes:o.eyes,look:o.look||0,wind:o.wind??1.2,blush:0.5,len:210});
  ctx.strokeStyle='#2b2d33';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(-52,40);ctx.lineTo(-44,150);ctx.moveTo(52,40);ctx.lineTo(44,150);ctx.stroke();ctx.fillStyle='#2b2d33';rrect(ctx,-50,150,100,14,5);ctx.fill();
  ctx.restore();
}

/* 1 · Malam Jabba — title */
scene({id:'title',   when:'2025-12-01T00:00',name:'Malam Jabba',            bars:6, fin:['#000000',2.5],fout:['#ffffff',1.4],
  prep(){const S=snowset();return{S,
    near:makeLayer({w:1700,seed:13,y0:570,amp:40,oct:3,f0:0.005,top:'#f7fafc',bottom:'#c4d3df',patches:['#ffffff','#aabccc'],pines:{n:70,size:96,sink:8,dark:'#17302a',light:'#25473a',snow:'#f4f8fb',xs:r=>r()<0.5?r()*430:1000+r()*700}})};},
  draw(ctx,lt,A){
    paintSky(ctx,[[0,'#2f6fc2'],[0.45,'#9cc6ef'],[0.8,'#e8f1f8']]);
    sunGlow(ctx,980,120,360,'rgba(255,250,235,0.7)');
    ctx.drawImage(A.S.wisps,120+lt*4,30);ctx.drawImage(A.S.wisps,-500+lt*6,150);
    const pan=lt*5;
    ctx.drawImage(A.S.far.c,-120-pan*0.2,0);ctx.drawImage(A.S.mid.c,-160-pan*0.4,0);
    ctx.fillStyle=vgrad(ctx,330,720,[[0,'#f3f7fa'],[1,'#d7e3ee']]);ctx.beginPath();ctx.moveTo(610,338);ctx.lineTo(690,338);ctx.lineTo(1000,720);ctx.lineTo(300,720);ctx.closePath();ctx.fill();
    ctx.strokeStyle='rgba(150,175,200,.35)';ctx.lineWidth=1.2;for(let k=-3;k<=3;k++){ctx.beginPath();ctx.moveTo(650+k*8,345);ctx.quadraticCurveTo(650+k*60,540,650+k*95,720);ctx.stroke();}
    liftLine(ctx,lt,[648,338],[560,790],{n:8,spd:0.028,s0:0.18,s1:1.6,dir:-1});
    ctx.drawImage(A.near.c,-100-pan*0.9,0);
    snowfall(ctx,lt,140,31,12,2.2,0.8);
    const a=smooth(3,5.5,lt)*(1-smooth(17.5,19.5,lt));
    if(a>0.001){
      ctx.save();ctx.globalAlpha=a;ctx.textAlign='center';ctx.fillStyle='#fffdf7';ctx.shadowColor='rgba(20,40,80,.55)';ctx.shadowBlur=24;
      const y=lerp(330,318,smooth(3,19,lt));
      ctx.font='400 40px "Noto Nastaliq Urdu", serif';ctx.fillText('أنتَ الحياة',640,y-78);
      ctx.font='600 82px "Cormorant Garamond", serif';ctx.fillText('Anta Al Hayat',640,y);
      ctx.shadowBlur=0;ctx.fillStyle='#213655';ctx.font='700 14px "Mulish", sans-serif';setLS(ctx,'6px');ctx.fillText('MALAM JABBA  ·  JANUARY 2026',640,y+46);setLS(ctx,'0px');
      ctx.restore();
    }
  }
});

/* 2 · The zipline queue — chairs at the top, huge mountains in front, number 5 waiting for number 48 */
scene({id:'queue',   when:'2026-01-16T12:00',name:'Number 5, number 48',    bars:8, fin:['#ffffff',1.4],fout:['#000000',1.2],
  prep(){const S=snowset(),r=rng(221),crowd=[];
    for(let i=0;i<8;i++)crowd.push({x:70+i*95+r()*30,s:0.52+r()*0.12,col:['#3a3f5a','#6b3a3a','#2f4a3a','#5a4a2a','#4a3a6a'][i%5],hair:r()<0.5?'#222':'#4a2a1a'});
    return{S,crowd};},
  draw(ctx,lt,A){
    paintSky(ctx,[[0,'#2a67bd'],[0.45,'#96c3ee'],[0.75,'#e6f0f8']]);
    sunGlow(ctx,1020,90,420,'rgba(255,250,235,0.75)');
    ctx.drawImage(A.S.wisps,260+lt*3,0);
    ctx.drawImage(A.S.peaks.c,-120,-30);
    ctx.drawImage(A.S.mid.c,-160,70);
    /* the valley falls away; the PC Hotel is tiny down there, the cable runs down to it */
    ctx.fillStyle=vgrad(ctx,440,520,[[0,'#dfe8f0'],[1,'#c7d6e3']]);ctx.fillRect(0,440,W,90);
    drawHotel(ctx,190,478,0.2);
    const cab=u=>{const x=lerp(1090,210,u),y=lerp(300,468,u)+Math.sin(u*Math.PI)*70;return[x,y];};
    ctx.strokeStyle='rgba(40,44,52,.85)';ctx.lineWidth=2;ctx.beginPath();for(let k=0;k<=40;k++){const[x,y]=cab(k/40);if(k)ctx.lineTo(x,y);else ctx.moveTo(x,y);}ctx.stroke();
    for(let k=0;k<2;k++){const u=((lt*0.1+k*0.5)%1),[x,y]=cab(u),s=lerp(0.5,0.12,u);ctx.fillStyle='#2a2d3a';ctx.fillRect(x-7*s,y+4,14*s,22*s);circle(ctx,x,y+2,7*s);ctx.fill();ctx.strokeStyle='#2a2d3a';ctx.lineWidth=2*s;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x,y+4);ctx.stroke();}
    /* launch tower */
    ctx.fillStyle='#4a4f5a';ctx.fillRect(1072,300,8,200);ctx.fillRect(1112,300,8,200);ctx.fillRect(1066,296,60,8);ctx.strokeStyle='#4a4f5a';ctx.lineWidth=3;for(let y=320;y<480;y+=40){ctx.beginPath();ctx.moveTo(1076,y);ctx.lineTo(1116,y+40);ctx.moveTo(1116,y);ctx.lineTo(1076,y+40);ctx.stroke();}
    ctx.fillStyle='#8f949e';ctx.fillRect(1040,470,120,10);
    /* platform */
    ctx.fillStyle=vgrad(ctx,500,720,[[0,'#f4f7fa'],[1,'#d5e0ea']]);ctx.fillRect(0,500,W,220);
    ctx.fillStyle='#6b4e36';ctx.fillRect(0,486,W,14);ctx.fillStyle='#5a4028';for(let x=30;x<W;x+=120)ctx.fillRect(x,452,6,36);ctx.fillRect(0,448,W,5);
    ctx.fillStyle='rgba(150,175,200,.25)';for(let k=0;k<16;k++){ell(ctx,(k*191)%W,540+(k*53)%160,30+(k*17)%60,5);ctx.fill();}
    /* the number board */
    const n=lt<4?5:lt<20?Math.min(46,5+Math.floor((lt-4)/16*41)):lt<24.5?47:48;
    ctx.fillStyle='#4a4f5a';ctx.fillRect(1004,520,8,150);ctx.fillStyle='#1d2430';rrect(ctx,940,470,136,84,8);ctx.fill();ctx.strokeStyle='#8f949e';ctx.lineWidth=2;rrect(ctx,940,470,136,84,8);ctx.stroke();
    ctx.fillStyle='#9fb3c3';ctx.font='700 11px "Mulish",sans-serif';ctx.textAlign='center';setLS(ctx,'2px');ctx.fillText('ZIPLINE · NOW',1008,492);setLS(ctx,'0px');
    ctx.fillStyle=n>=48?'#ffd27a':'#e9edef';ctx.font='700 44px "Mulish",sans-serif';ctx.fillText(String(n),1008,540);
    /* the others, waiting on their chairs behind */
    for(let i=0;i<A.crowd.length;i++){const c=A.crowd[i];plasticChair(ctx,c.x,572,c.s*1.3);drawFigureFar(ctx,c.x,534,c.s*0.95,c.col,c.hair,lt,i,true);}
    /* Fabeha on the chair across from us, ticket 48 in her hands */
    const shy=smooth(12,13,lt)*(1-smooth(15.5,16.5,lt)),last=smooth(24.5,25.5,lt);
    plasticChair(ctx,760,700,1.55);
    drawFabeha(ctx,760,470,1.25,{t:lt,outfit:'sweater',hair:'down',shades:true,pose:'knees',legCol:'#3a3330',arms:'lap',smile:0.5+0.5*smooth(2,6,lt)*(1-shy*0.6)+0.1*last,look:-0.85*shy+0.1*Math.sin(lt*0.4),tilt:-0.05*shy+Math.sin(lt*0.35)*0.025,wind:0.3,blush:0.4+0.4*shy,eyes:(lt>17&&lt<19)||(lt>25.5)?'happy':undefined,len:260});
    ctx.save();ctx.translate(760,690);ctx.rotate(-0.08);ctx.fillStyle='#fffdf5';rrect(ctx,-30,-20,60,40,4);ctx.fill();ctx.fillStyle='#b8402f';ctx.font='700 24px "Mulish",sans-serif';ctx.textAlign='center';ctx.fillText('48',0,9);ctx.restore();
    /* his gloved hand with ticket 5 */
    ctx.save();ctx.translate(190,650+Math.sin(lt*1.1)*4);ctx.rotate(-0.25);
    ctx.fillStyle='#17171c';ell(ctx,0,40,62,50,0.2);ctx.fill();for(let k=0;k<4;k++){ell(ctx,-40+k*26,-6+Math.abs(k-1.5)*6,15,26,0.1*(k-1.5));ctx.fill();}
    ctx.fillStyle='#fffdf5';rrect(ctx,-46,-66,92,58,5);ctx.fill();ctx.fillStyle='#b8402f';ctx.font='700 38px "Mulish",sans-serif';ctx.textAlign='center';ctx.fillText('5',0,-22);ctx.fillStyle='#777';ctx.font='600 9px "Mulish",sans-serif';setLS(ctx,'1px');ctx.fillText('MALAM JABBA ZIPLINE',0,-54);setLS(ctx,'0px');
    ctx.fillStyle='#2b2b32';ell(ctx,52,10,16,26,0.5);ctx.fill();
    ctx.restore();
    snowfall(ctx,lt,70,33,8,1.8,0.7);
  }
});

/* 3 · The zipline — down to the PC Hotel, then filming her coming back */
scene({id:'zip',     when:'2026-01-16T13:41',name:'The zipline',            bars:7, fin:['#000000',1.0],fout:['#000000',1.4],
  prep(){const S=snowset(),r=rng(301),pines=[];for(let i=0;i<120;i++){const side=r()<0.5?-1:1;pines.push({x:side*(0.18+r()*0.8),d0:0.05+r()*2.6,h:50+r()*40});}
    const slope=makeLayer({w:1600,seed:32,y0:430,amp:60,oct:3,f0:0.004,top:'#eef3f7',bottom:'#b9cad8',patches:['#ffffff','#9fb3c4'],pines:{n:220,size:44,sink:4,dark:'#1b382c',light:'#2b5240',snow:'#f1f6fa'},rim:'#ffffff',rimA:0.6,rimW:3});
    return{S,pines,slope};},
  draw(ctx,lt,A){
    if(lt<10){
      const p=clamp(lt/8.6),shake=Math.sin(lt*23)*2.5+Math.sin(lt*7)*1.5;
      ctx.save();ctx.translate(Math.sin(lt*17)*2,shake);
      paintSky(ctx,[[0,'#2a67bd'],[0.5,'#96c3ee'],[0.75,'#e6f0f8']]);
      sunGlow(ctx,1020,90,420,'rgba(255,250,235,0.7)');
      ctx.drawImage(A.S.peaks.c,-120,-10);ctx.drawImage(A.S.mid.c,-160,120);
      ctx.fillStyle=vgrad(ctx,400,720,[[0,'#eef3f7'],[1,'#c3d4e2']]);ctx.fillRect(0,400,W,320);
      const VPX=560,VPY=400,proj=(d,x)=>({sx:VPX+x*760/(d+0.18),sy:VPY+100/(d+0.18),s:0.95/(d+0.18)});
      const ps=A.pines.map(q=>{const d=((q.d0-lt*0.6)%2.6+2.6)%2.6+0.05;return{q,d};}).sort((a,b)=>b.d-a.d);
      const r=rng(5);
      const hs=0.06+1.15*p*p;drawHotel(ctx,VPX,VPY+40+60*p,hs);
      for(const{q,d}of ps){const pr=proj(d,q.x);if(pr.sx<-150||pr.sx>W+150)continue;drawPine(ctx,pr.sx,pr.sy,q.h*pr.s,'#1b382c','#2b5240','#f1f6fa',r);}
      ctx.save();ctx.globalCompositeOperation='screen';for(let k=0;k<14;k++){const a=k/14*TAU+lt*0.3,len=200+((k*97)%300),x0=VPX+Math.cos(a)*120,y0=VPY+Math.sin(a)*120;ctx.strokeStyle=`rgba(255,255,255,${0.12+0.1*Math.sin(lt*9+k)})`;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(x0,y0);ctx.lineTo(VPX+Math.cos(a)*(120+len),VPY+Math.sin(a)*(120+len));ctx.stroke();}ctx.restore();
      windRibbons(ctx,lt,10,3030,1);snowfall(ctx,lt,120,34,160,2,0.7);
      ctx.strokeStyle='rgba(40,44,52,.9)';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(640,-10);ctx.lineTo(VPX,VPY);ctx.stroke();
      ctx.fillStyle='#3a3f47';rrect(ctx,606,0,68,40,8);ctx.fill();ctx.fillStyle='#8f949e';circle(ctx,626,22,9);ctx.fill();circle(ctx,654,22,9);ctx.fill();
      ctx.strokeStyle='#17171c';ctx.lineWidth=26;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(430,740);ctx.lineTo(640,56);ctx.moveTo(850,740);ctx.lineTo(640,56);ctx.stroke();
      ctx.strokeStyle='#2b2b32';ctx.lineWidth=14;ctx.beginPath();ctx.moveTo(436,740);ctx.lineTo(642,60);ctx.moveTo(844,740);ctx.lineTo(642,60);ctx.stroke();
      ctx.restore();
      const fl=smooth(8.5,8.9,lt)*(1-smooth(9.1,9.9,lt));if(fl>0){ctx.fillStyle=`rgba(255,255,255,${fl})`;ctx.fillRect(0,0,W,H);}
      return;
    }
    /* landed by the hotel: filming her coming down */
    const u=clamp((lt-10)/12),cab=k=>[lerp(300,1010,k),lerp(250,600,k)+Math.sin(k*Math.PI)*90];
    const world=g=>{
      paintSky(g,[[0,'#2a67bd'],[0.5,'#96c3ee'],[0.8,'#e6f0f8']]);sunGlow(g,1040,80,400,'rgba(255,250,235,0.7)');
      g.drawImage(A.S.peaks.c,-100,-80);g.drawImage(A.slope.c,-60,0);
      g.fillStyle='#4a4f5a';g.fillRect(292,214,5,40);g.fillRect(304,214,5,40);g.fillRect(288,210,24,5);
      g.strokeStyle='rgba(40,44,52,.9)';g.lineWidth=2.2;g.beginPath();for(let k=0;k<=40;k++){const[x,y]=cab(k/40);if(k)g.lineTo(x,y);else g.moveTo(x,y);}g.stroke();
      g.fillStyle='#8f949e';g.fillRect(960,596,120,10);g.fillStyle='#4a4f5a';g.fillRect(1000,606,8,114);g.fillRect(1040,606,8,114);
      g.fillStyle=vgrad(g,600,720,[[0,'#f4f7fa'],[1,'#d5e0ea']]);g.fillRect(0,600,W,120);
      const[x,y]=cab(u),s=0.12+0.95*Math.pow(u,1.6);
      drawZipRider(g,x,y+150*s,s,lt,{shades:true,smile:1,eyes:u>0.6?'happy':undefined,look:0,wind:1.2});
      windRibbons(g,lt,4,3031,0.5);snowfall(g,lt,60,35,10,1.8,0.6);
    };
    world(ctx);
    const S=drawPhoneHand(ctx,lt,{x:475,y:120,w:330,h:700});
    ctx.save();rrect(ctx,S.x,S.y,S.w,S.h,S.r);ctx.clip();ctx.fillStyle='#000';ctx.fillRect(S.x,S.y,S.w,S.h);
    const vw=S.w,vh=S.w*16/9,vy=S.y+(S.h-vh)/2,[hx,hy]=cab(u),hs=0.12+0.95*Math.pow(u,1.6);ctx.save();ctx.beginPath();ctx.rect(S.x,vy,vw,vh);ctx.clip();ctx.translate(S.x+vw/2,vy+vh/2);const z=vh/H*1.9;ctx.scale(z,z);ctx.translate(-lerp(hx,640,0.25),-(hy+205*hs));world(ctx);ctx.restore();
    const rec=lt<22.6;
    ctx.fillStyle='rgba(0,0,0,.35)';rrect(ctx,S.x+S.w/2-60,S.y+52,120,30,15);ctx.fill();
    if(rec){ctx.fillStyle=((lt*2)|0)%2?'#ff3b30':'#8a1f1a';circle(ctx,S.x+S.w/2-40,S.y+67,6);ctx.fill();}
    ctx.fillStyle='#fff';ctx.font='600 14px "Mulish",sans-serif';ctx.textAlign='left';ctx.fillText(rec?'00:00:'+String(Math.floor(lt-10)).padStart(2,'0'):'saved ✓',S.x+S.w/2-26,S.y+72);
    ctx.fillStyle='rgba(0,0,0,.45)';rrect(ctx,S.x+S.w/2-20,S.y+S.h-150,40,24,12);ctx.fill();ctx.fillStyle='#ffd60a';ctx.font='700 12px "Mulish",sans-serif';ctx.textAlign='center';ctx.fillText('1.9x',S.x+S.w/2,S.y+S.h-133);
    ctx.strokeStyle='#fff';ctx.lineWidth=3;circle(ctx,S.x+S.w/2,S.y+S.h-80,30);ctx.stroke();ctx.fillStyle=rec?'#ff3b30':'#fff';if(rec)rrect(ctx,S.x+S.w/2-11,S.y+S.h-91,22,22,5);else circle(ctx,S.x+S.w/2,S.y+S.h-80,24);ctx.fill();
    ctx.restore();phoneTop(ctx,S,{time:'13:41'});
  }
});

/* 4 · The van — a Pakistani Hiace, Malam Jabba to Kalam; seven hours backwards on the aisle jump seat */
scene({id:'van',     when:'2026-01-16T17:00',name:'The folding seat',       bars:9, fin:['#000000',1.4],fout:['#000000',1.2],
  prep(){
    const scen=makeLayer({w:2600,seed:41,y0:250,amp:90,oct:4,f0:0.003,top:'#f2f6fa',bottom:'#b7c8d8',patches:['#ffffff','#9fb3c4'],pines:{n:420,size:36,sink:4,dark:'#1b382c',light:'#2b5240',snow:'#f1f6fa'},rock:'#8a98ab'});
    const c=mk(W,H),g=c.getContext('2d');
    g.fillStyle=vgrad(g,0,H,[[0,'#d9dadc'],[0.18,'#cfd0d3'],[0.19,'#e9eaec'],[1,'#b9bbc0']]);g.fillRect(0,0,W,H);
    g.fillStyle='#f6f3ea';rrect(g,440,34,400,16,8);g.fill();g.fillStyle='#8a8b90';for(const x of[160,1120]){rrect(g,x-40,86,80,10,5);g.fill();}
    /* pillars and window frames (white body) */
    g.fillStyle='#e9eaec';g.fillRect(0,110,W,16);g.fillRect(0,440,W,16);
    g.fillStyle='#dcdde0';g.fillRect(0,126,40,314);g.fillRect(1240,126,40,314);g.fillRect(330,126,46,314);g.fillRect(904,126,46,314);
    g.fillStyle='#c9cacf';g.fillRect(376,126,528,10);
    /* floor and our knees */
    g.fillStyle='#4b4a4e';g.fillRect(0,456,W,264);g.fillStyle='#55545a';for(let y=470;y<720;y+=14)g.fillRect(0,y,W,2);
    return{scen,c};
  },
  draw(ctx,lt,A){
    const shake=Math.sin(lt*7.3)*1.2+Math.sin(lt*13.1)*0.6,cam=lt*120;
    ctx.save();ctx.translate(0,shake);
    ctx.drawImage(A.c,0,0);
    const win=(x0,x1,y0,y1,off,dir,curtain)=>{ctx.save();ctx.beginPath();ctx.rect(x0,y0,x1-x0,y1-y0);ctx.clip();ctx.fillStyle=vgrad(ctx,y0,y1,[[0,'#7fb0e0'],[0.6,'#cfe2f2'],[1,'#e7eef4']]);ctx.fillRect(x0,y0,x1-x0,y1-y0);const ox=((off+cam*dir)%2600+2600)%2600;ctx.drawImage(A.scen.c,-ox,y0-60);ctx.drawImage(A.scen.c,2600-ox,y0-60);ctx.fillStyle='rgba(120,160,200,.16)';ctx.fillRect(x0,y0,x1-x0,y1-y0);
      if(curtain){const cw=(x1-x0)*0.42,cx0=curtain<0?x0:x1-cw;ctx.fillStyle='#7a2f3a';ctx.fillRect(cx0,y0,cw,y1-y0);for(let k=0;k<7;k++){const u=k/6,x=cx0+u*cw;ctx.fillStyle=k%2?'#8d3a46':'#6a2631';ctx.fillRect(x,y0,cw/7,y1-y0);}ctx.fillStyle='rgba(255,220,180,.35)';for(let y=y0+20;y<y1;y+=34)for(let k=0;k<4;k++){circle(ctx,cx0+cw*(0.15+k*0.23),y+(k%2)*10,3);ctx.fill();}ctx.fillStyle='#d9c58a';ctx.fillRect(cx0+(curtain<0?cw-12:0),y0+(y1-y0)*0.55,12,10);}
      ctx.strokeStyle='rgba(255,255,255,.3)';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(x0+20,y0);ctx.lineTo(x0+60,y1);ctx.stroke();ctx.restore();};
    win(40,330,136,440,400,-1,-1);win(950,1240,136,440,1400,1,1);
    /* rear window (the road running away behind her) */
    ctx.save();ctx.beginPath();ctx.rect(430,146,420,150);ctx.clip();ctx.fillStyle=vgrad(ctx,146,296,[[0,'#8fbce6'],[1,'#dfe9f2']]);ctx.fillRect(430,146,420,150);ctx.drawImage(A.scen.c,-((cam*0.25)%2600),120);ctx.fillStyle='#5b6068';ctx.beginPath();ctx.moveTo(610,296);ctx.lineTo(640,236);ctx.lineTo(650,236);ctx.lineTo(690,296);ctx.closePath();ctx.fill();ctx.fillStyle='#e8e4d6';for(let k=0;k<4;k++){const u=((lt*0.9+k*0.25)%1);ctx.fillRect(644-1.5*u,236+u*60,3+u*3,3+u*6);}ctx.restore();
    ctx.fillStyle='#dcdde0';ctx.fillRect(420,136,440,10);ctx.fillRect(420,296,440,8);ctx.fillRect(420,136,10,170);ctx.fillRect(850,136,10,170);
    /* rows behind: headrests and sleeping heads, smaller as they recede */
    const seatPattern=(x,y,w,h)=>{ctx.fillStyle='#8a8c93';rrect(ctx,x,y,w,h,10);ctx.fill();ctx.fillStyle='#6f2f3b';for(let yy=y+14;yy<y+h-8;yy+=22)for(let xx=x+12;xx<x+w-8;xx+=24){ctx.beginPath();ctx.moveTo(xx,yy-5);ctx.lineTo(xx+5,yy);ctx.lineTo(xx,yy+5);ctx.lineTo(xx-5,yy);ctx.closePath();ctx.fill();}ctx.strokeStyle='#3d3e44';ctx.lineWidth=2;rrect(ctx,x,y,w,h,10);ctx.stroke();};
    for(const[s,y,alpha]of[[0.56,300,0.75],[0.74,318,0.9]]){ctx.save();ctx.globalAlpha=alpha;for(let k=0;k<3;k++){const w=150*s,x=640+(k-1)*165*s-w/2;seatPattern(x,y-40*s,w,60*s);ctx.fillStyle='#2a2c34';ell(ctx,x+w/2+(k-1)*6,y-50*s,22*s,26*s);ctx.fill();}ctx.restore();}
    /* her row: the bench right behind the jump seat */
    seatPattern(372,330,170,190);seatPattern(555,330,170,190);seatPattern(738,330,170,190);
    ctx.fillStyle='#8a8c93';rrect(ctx,575,332,130,50,12);ctx.fill();ctx.strokeStyle='#3d3e44';ctx.lineWidth=2;rrect(ctx,575,332,130,50,12);ctx.stroke();
    for(const[x,d]of[[457,-1],[823,1]]){ctx.fillStyle='#33363f';ell(ctx,x,440,70,90);ctx.fill();ctx.fillStyle='#3b3e48';ell(ctx,x+d*18,340,34,38);ctx.fill();ctx.fillStyle='#2a2c34';ell(ctx,x+d*18,328,36,24);ctx.fill();ctx.fillStyle='#4a3d35';ell(ctx,x+d*14,348,22,24);ctx.fill();}
    const asleep=1-smooth(8,9.5,lt),talk=lt>12&&lt<14.5||lt>19.5&&lt<21.5,laugh=lt>22&&lt<24.5,stare=lt>25;
    drawFabeha(ctx,640,352-asleep*18,1.08,{t:lt,outfit:'coat',hair:'beanie',pose:'knees',legCol:'#3d2f2a',arms:'lap',smile:asleep>0.5?0.25:(laugh?1:0.75),talk:talk&&!laugh,look:asleep>0.5?0:(stare?0.05:0.15*Math.sin(lt*0.7)),tilt:asleep*0.24+Math.sin(lt*0.5)*0.02,eyes:asleep>0.5?'closed':laugh?'happy':undefined,blush:0.3+0.3*(stare?1:0),len:230});
    /* the aisle jump seat we sit on, backwards: our knees and the AirPods case */
    ctx.fillStyle='#2f3c58';ell(ctx,330,700,120,60);ctx.fill();ell(ctx,950,700,120,60);ctx.fill();ctx.fillStyle='#3a4a6c';ell(ctx,330,690,100,40);ctx.fill();ell(ctx,950,690,100,40);ctx.fill();
    ctx.fillStyle=HIS.skin;ctx.beginPath();ctx.moveTo(1180,720);ctx.quadraticCurveTo(1120,600,1030,610);ctx.quadraticCurveTo(1000,640,1040,720);ctx.closePath();ctx.fill();
    ctx.fillStyle='#f4f4f6';rrect(ctx,1040,620,54,44,12);ctx.fill();ctx.fillStyle='#d8d8dc';rrect(ctx,1040,620,54,18,10);ctx.fill();ctx.fillStyle=((lt*2)|0)%2?'#34c759':'#1f6b3a';circle(ctx,1067,650,3);ctx.fill();
    ctx.restore();
    const lightSweep=(lt*0.5)%1;ctx.save();ctx.globalCompositeOperation='screen';const g=ctx.createLinearGradient(lightSweep*W*2-W,0,lightSweep*W*2,0);g.addColorStop(0,'rgba(255,245,220,0)');g.addColorStop(0.5,'rgba(255,245,220,.16)');g.addColorStop(1,'rgba(255,245,220,0)');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);ctx.restore();
  }
});

/* 5 · Kalam — snow, minus fifteen */
scene({id:'kalam',   when:'2026-01-16T21:00',name:'Kalam, minus fifteen',   bars:5, fin:['#000000',1.0],fout:['#ffffff',1.6],
  prep(){const r=rng(51);
    const wall=makeLayer({w:1700,seed:52,y0:150,amp:110,oct:4,f0:0.0035,top:'#c9d4df',bottom:'#8d9cae',patches:['#e4ebf2','#6f7f92'],patchN:120,rock:'#5d6b7c',pines:{n:260,size:30,sink:2,dark:'#1b382c',light:'#2b5240',snow:'#eef4f8'},rim:'#ffffff',rimA:0.8,rimW:4});
    const field=makeLayer({w:1600,seed:53,y0:400,amp:10,oct:2,f0:0.01,top:'#fbfcfe',bottom:'#cfdbe7',patches:['#ffffff','#b9cad9','#e6eef5'],patchN:260});
    const mounds=[];for(let i=0;i<60;i++)mounds.push({x:r()*W,y:420+r()*300,rx:40+r()*120,ry:8+r()*22});
    return{wall,field,mounds};},
  draw(ctx,lt,A){
    paintSky(ctx,[[0,'#8fa6bd'],[0.5,'#c9d6e2'],[1,'#e9eef3']]);
    ctx.drawImage(A.wall.c,-80,0);ctx.drawImage(A.field.c,-60,0);
    for(const m of A.mounds){ctx.fillStyle='rgba(255,255,255,.9)';ell(ctx,m.x,m.y,m.rx,m.ry);ctx.fill();ctx.fillStyle='rgba(150,175,200,.25)';ell(ctx,m.x+m.rx*0.15,m.y+m.ry*0.6,m.rx*0.8,m.ry*0.5);ctx.fill();}
    ctx.fillStyle='#6f8aa6';ell(ctx,250,470,190,24);ctx.fill();ctx.fillStyle='rgba(255,255,255,.35)';ell(ctx,230,466,120,10);ctx.fill();
    for(const[x,y,s,col]of[[120,392,1,'#b8402f'],[260,386,0.8,'#b8402f'],[930,392,0.9,'#b8402f'],[1180,398,1.1,'#c45a2e']]){ctx.fillStyle='#8c7b6a';ctx.fillRect(x-34*s,y-22*s,68*s,24*s);ctx.fillStyle=col;ctx.beginPath();ctx.moveTo(x-40*s,y-22*s);ctx.lineTo(x,y-44*s);ctx.lineTo(x+40*s,y-22*s);ctx.closePath();ctx.fill();ctx.fillStyle='#f4f7fa';ctx.beginPath();ctx.moveTo(x-40*s,y-22*s);ctx.lineTo(x,y-44*s);ctx.lineTo(x+40*s,y-22*s);ctx.lineTo(x+30*s,y-24*s);ctx.lineTo(x,y-38*s);ctx.lineTo(x-30*s,y-24*s);ctx.closePath();ctx.fill();}
    const r=rng(7);for(let i=0;i<14;i++)drawFigureFar(ctx,420+r()*500,404,0.32,['#3a3f5a','#6b3a3a','#2f4a3a'][i%3],'#222',lt,i);
    const throwT=lt-8.5,arm=throwT>0&&throwT<1.2;
    drawFabeha(ctx,520,500,1.25,{t:lt,outfit:'coat',hair:'beanie',pose:'snow',legCol:'#3d2f2a',arms:arm?'wave':'lap',smile:1,eyes:(lt>4&&lt<6.5)||(lt>9.5&&lt<12)?'happy':undefined,look:0.1,tilt:Math.sin(lt*0.8)*0.04,wind:0.2,blush:0.55,len:230});
    if(throwT>0&&throwT<1.1){const u=throwT/1.1,x=640,y=lerp(380,440,u)-Math.sin(u*Math.PI)*160,s=lerp(8,90,u*u);const g=ctx.createRadialGradient(x-s*0.3,y-s*0.3,s*0.1,x,y,s);g.addColorStop(0,'#ffffff');g.addColorStop(0.75,'#f4f8fc');g.addColorStop(1,'#c9d8e6');ctx.fillStyle=g;circle(ctx,x,y,s);ctx.fill();}
    if(throwT>1.0){const a=1-smooth(1.0,2.6,throwT);ctx.fillStyle=`rgba(255,255,255,${0.85*a})`;for(const[x,y,rr]of[[640,420,170],[520,520,90],[780,560,70],[700,300,60],[430,380,50]]){circle(ctx,x,y,rr*(1+(1-a)*0.3));ctx.fill();}}
    snowfall(ctx,lt,260,54,18,2.6,0.9);snowfall(ctx,lt,40,55,30,5,0.5);
  }
});

/* 6 · 23 January — Engro beach, the bet */
const BET=[
  {at:9.6, who:'me', time:'16:40',text:'Rembr the bet? Ap jeeta tou mera iphone apka or agr mein jeeta tou 😋'},
  {at:11.4,who:'her',time:'16:42',text:'Tou?'},
  {at:12.8,who:'me', time:'16:47',text:'😭 maarogi agr bola ageye'},
  {at:13.9,who:'me', time:'16:48',text:'Ap Meri ❤️',del:15.0},
  {at:16.2,who:'her',time:'16:57',text:'Toh apka iphone ab mera hai 😂😂😂'},
  {at:17.6,who:'me', time:'16:58',text:'😭😭😭 lelo boss bas meri crumble cookie'},
  {at:19.0,who:'me', time:'17:03',text:'Tou mtlb i won? 😭😭'},
  {at:20.2,who:'me', time:'17:06',text:'Luckiest guy alive 😋😭😭'},
  {at:21.6,who:'her',time:'17:13',text:'Yar ye kesi deal hai'},
  {at:22.8,who:'me', time:'17:13',text:'Eik side its just an worthless phone'},
  {at:24.2,who:'me', time:'17:15',text:'Which can be replaced but on the other side someone like you can’t'},
  {at:26.0,who:'her',time:'17:17',text:'Awwww'},
];
act('II','Winter in Karachi','23 January – 15 March 2026','2026-03-15T23:59');
scene({id:'beach',   when:'2026-01-23T16:40',name:'23 January · the bet',   bars:10,fin:['#ffffff',1.6],fout:['#000000',1.4],
  prep(){const r=rng(61);const dunes=makeLayer({w:1500,seed:62,y0:560,amp:14,oct:2,f0:0.006,top:'#f0d9b4',bottom:'#c9a97c',patches:['#f7e6c6','#b8956a'],patchN:120,strokes:'#b08a5c'});
    const fam=[];for(let i=0;i<5;i++)fam.push({x:150+i*52+r()*20,s:0.26+r()*0.08,col:['#7b3e4a','#2f3f6b','#8a6a3a','#4a5a3a','#6b3a5a'][i]});
    const room=mk(W,H),g=room.getContext('2d');g.fillStyle=vgrad(g,0,H,[[0,'#2a2230'],[1,'#120f17']]);g.fillRect(0,0,W,H);
    g.fillStyle='#3a2f3f';g.fillRect(760,110,360,300);g.fillStyle='#1b2a44';g.fillRect(772,122,336,276);const lg=g.createRadialGradient(940,200,0,940,200,260);lg.addColorStop(0,'rgba(255,170,110,.55)');lg.addColorStop(1,'rgba(255,170,110,0)');g.fillStyle=lg;g.fillRect(760,110,360,300);
    g.fillStyle='#223a5c';g.fillRect(772,300,336,98);const r2=rng(9);g.fillStyle='#ffd28a';for(let i=0;i<40;i++)g.fillRect(780+r2()*320,310+r2()*80,2,2);
    g.fillStyle='#4a3b2c';g.fillRect(0,480,W,240);g.fillStyle='#5a4733';g.fillRect(0,480,W,12);
    const lamp=g.createRadialGradient(200,300,0,200,300,420);lamp.addColorStop(0,'rgba(255,200,130,.5)');lamp.addColorStop(1,'rgba(255,200,130,0)');g.fillStyle=lamp;g.fillRect(0,0,W,H);
    return{dunes,fam,room};},
  draw(ctx,lt,A){
    const phase=lt<9?0:lt<27.4?1:2;
    if(phase===1){
      ctx.drawImage(A.room,0,0);
      const S=drawPhoneHand(ctx,lt-9,{x:470,y:120,w:330,h:700});
      chatPanel(ctx,S,BET,lt,{name:'Fabeha',status:'at the beach 🏖️'});phoneTop(ctx,S,{time:'16:4'+Math.min(9,Math.floor((lt-9)/2))});
      return;
    }
    const gold=phase===2?1:0.6+0.4*smooth(0,9,lt);
    paintSky(ctx,[[0,mixHex('#6d7fb8','#3f4a8c',gold*0.5)],[0.45,mixHex('#f2b58c','#e37f6a',gold*0.5)],[0.62,'#ffd9a0'],[0.72,'#ffe9c4']]);
    const sy=lerp(400,452,gold);sunGlow(ctx,960,sy,320,'rgba(255,200,120,0.75)');ctx.fillStyle='#fff1cf';circle(ctx,960,sy,32);ctx.fill();
    gulls(ctx,lt);
    drawSea(ctx,lt,452,560,'#c98c7a','#4e6f93','#ffffff');sunPath(ctx,lt,960,455,560,'#ffd9a0');
    ctx.drawImage(A.dunes.c,-40,0);
    ctx.fillStyle='rgba(255,255,255,.7)';ctx.beginPath();ctx.moveTo(0,562);for(let x=0;x<=W;x+=24)ctx.lineTo(x,560+Math.sin(x*0.02+lt*1.3)*4);ctx.lineTo(W,575);ctx.lineTo(0,575);ctx.closePath();ctx.fill();
    ctx.fillStyle='#8a6a48';ctx.fillRect(90,470,160,90);ctx.fillStyle='#b8402f';ctx.beginPath();ctx.moveTo(70,472);ctx.lineTo(170,420);ctx.lineTo(270,472);ctx.closePath();ctx.fill();ctx.fillStyle='#5a4028';ctx.fillRect(150,500,40,60);
    ctx.fillStyle='#e8b86a';ell(ctx,330,470,52,8);ctx.fill();ctx.fillStyle='#d9533a';ctx.beginPath();ctx.moveTo(278,470);ctx.quadraticCurveTo(330,420,382,470);ctx.closePath();ctx.fill();ctx.fillStyle='#6b4e36';ctx.fillRect(328,470,4,100);
    for(let i=0;i<A.fam.length;i++){const f=A.fam[i];drawFigureFar(ctx,f.x,590,f.s,f.col,'#222',lt,i);}
    if(phase===0){drawFabehaFar(ctx,760,600,0.75,lt,{wind:0.6});}
    else{drawFabeha(ctx,760,470,1.3,{t:lt,outfit:'kurta',hair:'down',pose:'bust',arms:'phone',smile:0.6+0.4*smooth(27.7,29.2,lt),look:0.35-0.5*smooth(29.7,30.7,lt),tilt:-0.08,wind:0.7,blush:0.5+0.3*smooth(29.2,30.2,lt),eyes:lt>31&&lt<33?'happy':undefined,len:220});}
    ctx.fillStyle=`rgba(255,160,90,${0.12*gold})`;ctx.fillRect(0,0,W,H);
    motes(ctx,lt,30,66,'#ffe2b0',1.4,0.6);
  }
});
