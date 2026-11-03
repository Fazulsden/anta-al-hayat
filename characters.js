/* characters.js — Fabeha, drawn from her photos: very long black hair with a centre part and
   face-framing strands, strong brows, dark eyes, a wide warm smile, small gold earrings.
   Outfits follow the real days: cream knit sweater + sunglasses on her head (Malam Jabba),
   tan sherpa coat + black beanie (the van / Kalam snow), white-and-blue floral kurta,
   cream sweater + navy backpack (IBA), black with gold sparkle (evenings), sage shirt (sunflowers),
   grey-white kurta with a dark-grey paisley print and an embroidered neckline (30 June, the car). */
'use strict';
const FB={hair:'#1a1416',hairMid:'#2d2127',hairHi:'#5a4756',skin:'#f4dcc8',skinSh:'#e3bca4',blush:'#ec8c82',eye:'#231616',iris:'#4a2f26',irisHi:'#8a5a44',brow:'#2a1d20',lip:'#c36f6a',lipDark:'#9e4f50',teeth:'#fffaf6',gold:'#e3b55c'};
const SLEEVE={sweater:'#e8dece',coat:'#9c7a59',kurta:'#f1ece3',uni:'#e8dece',black:'#15121a',sage:'#a3b4a3',home:'#dfbfca',floral:'#e8e7e3'};

function drawFabeha(ctx,x,y,s,o={}){
  const t=o.t||0,wind=o.wind||0,hair=o.hair||'down',len=o.len??190;
  ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.lineCap='round';ctx.lineJoin='round';
  if(o.alpha!=null)ctx.globalAlpha*=o.alpha;
  if(o.lean)ctx.rotate(o.lean);
  fbHairBack(ctx,o,t,wind,len,hair);
  fbBody(ctx,o,t);
  fbHairTails(ctx,o,t,wind,len,hair);
  ctx.fillStyle=FB.skinSh;ctx.fillRect(-9,34,18,30);
  ctx.save();ctx.translate(0,46);ctx.rotate(o.tilt||0);ctx.translate(0,-46);
  fbFace(ctx,o,t);
  fbHairFront(ctx,o,t,wind);
  if(hair==='beanie')fbBeanie(ctx);
  if(hair==='halfup')fbBraid(ctx);
  if(o.shades)fbShades(ctx);
  ctx.restore();
  if(o.arms==='hide')fbArms(ctx,o,t);
  ctx.restore();
}
function fbHairBack(ctx,o,t,wind,len,hair){
  ctx.fillStyle=FB.hair;
  if(hair==='low'){
    ell(ctx,0,-10,44,48);ctx.fill();ell(ctx,6,40,16,13,0.3);ctx.fill();
    ctx.strokeStyle=FB.hairHi;ctx.globalAlpha=0.5;ctx.lineWidth=2.5;ctx.beginPath();ctx.arc(0,-10,38,Math.PI*1.15,Math.PI*1.7);ctx.stroke();ctx.globalAlpha=1;
    return;
  }
  const sw=k=>Math.sin(t*1.1+k)*3;
  ctx.beginPath();ctx.moveTo(0,-56);
  ctx.bezierCurveTo(-34,-56,-50,-30,-47,-2);
  ctx.bezierCurveTo(-52,40,-66-wind*14+sw(0),len*0.55,-58-wind*26+sw(1),len);
  ctx.quadraticCurveTo(-40,len+10,-24,len-4);ctx.quadraticCurveTo(-8,len+6,8,len-4);ctx.quadraticCurveTo(24,len+10,40,len-6);
  ctx.quadraticCurveTo(52,len+2,58-wind*10+sw(2),len-8);
  ctx.bezierCurveTo(66,len*0.55,52,40,47,-2);
  ctx.bezierCurveTo(50,-30,34,-56,0,-56);ctx.closePath();ctx.fill();
  ctx.strokeStyle=FB.hairHi;ctx.globalAlpha=0.55;ctx.lineWidth=3;ctx.beginPath();ctx.arc(0,-12,42,Math.PI*1.15,Math.PI*1.62);ctx.stroke();ctx.globalAlpha=1;
  ctx.strokeStyle=FB.hairMid;ctx.globalAlpha=0.6;ctx.lineWidth=1.6;
  for(let k=0;k<6;k++){const x0=-38+k*15;ctx.beginPath();ctx.moveTo(x0,30);ctx.bezierCurveTo(x0-4+sw(k),len*0.4,x0+6-wind*8,len*0.75,x0-2-wind*14+sw(k+2),len-14);ctx.stroke();}
  ctx.globalAlpha=1;
}
function fbHairTails(ctx,o,t,wind,len,hair){
  if(hair==='low')return;
  const L=Math.min(len,170);ctx.fillStyle=FB.hair;
  for(const d of[-1,1]){
    const sw=Math.sin(t*1.2+d)*2;
    ctx.beginPath();ctx.moveTo(d*34,4);
    ctx.bezierCurveTo(d*44,40,d*(44+wind*6),90,d*(40+wind*10)+sw,L);
    ctx.quadraticCurveTo(d*(30+wind*8),L+6,d*(24+wind*6)+sw,L-8);
    ctx.bezierCurveTo(d*26,90,d*24,50,d*26,16);ctx.closePath();ctx.fill();
    ctx.strokeStyle=FB.hairHi;ctx.globalAlpha=0.35;ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(d*36,30);ctx.quadraticCurveTo(d*40,80,d*34,L-20);ctx.stroke();ctx.globalAlpha=1;
  }
}
function fbFace(ctx,o,t){
  const look=o.look||0,sm=o.smile??0.7,blushA=o.blush??0.35;
  ctx.fillStyle=FB.skinSh;ell(ctx,-38,4,6,9);ctx.fill();ell(ctx,38,4,6,9);ctx.fill();
  ctx.fillStyle=FB.skin;ctx.beginPath();ctx.moveTo(-36,-22);ctx.bezierCurveTo(-39,6,-30,34,-8,45);ctx.quadraticCurveTo(0,47,8,45);ctx.bezierCurveTo(30,34,39,6,36,-22);ctx.bezierCurveTo(34,-48,-34,-48,-36,-22);ctx.closePath();ctx.fill();
  ctx.fillStyle=hexA(FB.skinSh,0.6);ctx.beginPath();ctx.moveTo(-36,-22);ctx.bezierCurveTo(-34,-48,34,-48,36,-22);ctx.bezierCurveTo(30,-36,-30,-36,-36,-22);ctx.closePath();ctx.fill();
  ctx.fillStyle=hexA(FB.skinSh,0.5);ctx.beginPath();ctx.moveTo(-36,-10);ctx.bezierCurveTo(-39,10,-30,34,-8,45);ctx.quadraticCurveTo(-18,30,-28,10);ctx.closePath();ctx.fill();
  ctx.strokeStyle=FB.gold;ctx.lineWidth=1.6;circle(ctx,-38,14,3.2);ctx.stroke();circle(ctx,38,14,3.2);ctx.stroke();
  if(blushA>0){ctx.fillStyle=hexA(FB.blush,blushA);ell(ctx,-22,13,8,4.5);ctx.fill();ell(ctx,22,13,8,4.5);ctx.fill();}
  ctx.strokeStyle=hexA(FB.skinSh,0.95);ctx.lineWidth=1.6;ctx.beginPath();ctx.moveTo(2,6);ctx.quadraticCurveTo(6,13,2,15);ctx.stroke();
  const blink=o.eyes?false:(((t+0.9)%4.1)<0.12);
  fbEye(ctx,-16,0,-1,o,look,blink);fbEye(ctx,16,0,1,o,look,blink);
  ctx.strokeStyle=FB.brow;ctx.lineWidth=2.4;const br=(o.brow||0)*3;
  ctx.beginPath();ctx.moveTo(-29,-13-br);ctx.quadraticCurveTo(-18,-20-br,-6,-14-br);ctx.stroke();
  ctx.beginPath();ctx.moveTo(6,-14-br);ctx.quadraticCurveTo(18,-20-br,29,-13-br);ctx.stroke();
  fbMouth(ctx,sm,o,t);
}
function fbEye(ctx,cx,cy,d,o,look,blink){
  const mode=o.eyes||'open';
  if(mode==='happy'||mode==='closed'||blink){
    ctx.strokeStyle=FB.eye;ctx.lineWidth=2.2;ctx.beginPath();
    if(mode==='happy'){ctx.moveTo(cx-12,cy+3);ctx.quadraticCurveTo(cx,cy-9,cx+12,cy+3);}
    else{ctx.moveTo(cx-12,cy+1);ctx.quadraticCurveTo(cx,cy+6,cx+12,cy+1);}
    ctx.stroke();ctx.lineWidth=1.4;ctx.beginPath();ctx.moveTo(cx+d*12,cy+2);ctx.lineTo(cx+d*15,cy-1);ctx.stroke();
    return;
  }
  const w=14,h=11.5,ix=cx+look*4.5,iy=cy+1.5;
  ctx.save();ctx.beginPath();ctx.moveTo(cx-w,cy+1);ctx.quadraticCurveTo(cx,cy-h-3,cx+w,cy+1);ctx.quadraticCurveTo(cx,cy+h-1,cx-w,cy+1);ctx.closePath();
  ctx.fillStyle='#fff';ctx.fill();ctx.clip();
  ctx.fillStyle=FB.iris;ell(ctx,ix,iy,7.4,8.4);ctx.fill();
  ctx.fillStyle=FB.irisHi;ell(ctx,ix,iy+2.8,5.2,4.2);ctx.fill();
  ctx.fillStyle=FB.eye;ell(ctx,ix,iy,3.6,4.4);ctx.fill();
  ctx.fillStyle='rgba(0,0,0,.1)';ctx.beginPath();ctx.moveTo(cx-w,cy+1);ctx.quadraticCurveTo(cx,cy-h-3,cx+w,cy+1);ctx.quadraticCurveTo(cx,cy-4,cx-w,cy+1);ctx.fill();
  ctx.fillStyle='#fff';circle(ctx,ix-2.8,iy-3.4,2.6);ctx.fill();circle(ctx,ix+2.6,iy+2.8,1.2);ctx.fill();
  ctx.restore();
  ctx.strokeStyle=FB.eye;ctx.lineWidth=2.2;ctx.beginPath();ctx.moveTo(cx-w-1,cy+1);ctx.quadraticCurveTo(cx,cy-h-4,cx+w+1,cy+0.5);ctx.stroke();
  ctx.lineWidth=1.6;ctx.beginPath();ctx.moveTo(cx+d*(w+1),cy+0.5);ctx.lineTo(cx+d*(w+4.5),cy-2.5);ctx.stroke();
  ctx.strokeStyle='rgba(60,30,30,.5)';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(cx-w+2,cy+3);ctx.quadraticCurveTo(cx,cy+h,cx+w-1,cy+3);ctx.stroke();
}
function fbMouth(ctx,sm,o,t){
  const y=25,mw=7+13*sm;
  if(o.talk){const op=0.5+0.5*Math.sin(t*9);ctx.fillStyle=FB.lipDark;ctx.beginPath();ctx.moveTo(-mw*0.8,y);ctx.quadraticCurveTo(0,y-1,mw*0.8,y);ctx.quadraticCurveTo(0,y+4+6*op,-mw*0.8,y);ctx.closePath();ctx.fill();
    ctx.fillStyle=FB.teeth;ctx.beginPath();ctx.moveTo(-mw*0.7,y+0.5);ctx.quadraticCurveTo(0,y,mw*0.7,y+0.5);ctx.quadraticCurveTo(0,y+2.5,-mw*0.7,y+0.5);ctx.fill();return;}
  if(sm>0.55){
    ctx.fillStyle=FB.lipDark;ctx.beginPath();ctx.moveTo(-mw,y-2);ctx.quadraticCurveTo(0,y+1,mw,y-2);ctx.quadraticCurveTo(0,y+5+9*(sm-0.55),-mw,y-2);ctx.closePath();ctx.fill();
    ctx.fillStyle=FB.teeth;ctx.beginPath();ctx.moveTo(-mw+2,y-1);ctx.quadraticCurveTo(0,y+1,mw-2,y-1);ctx.quadraticCurveTo(0,y+3+3*(sm-0.55),-mw+2,y-1);ctx.closePath();ctx.fill();
    ctx.strokeStyle=FB.lip;ctx.lineWidth=1.2;ctx.beginPath();ctx.moveTo(-mw-2,y-5);ctx.quadraticCurveTo(-mw-1,y-2,-mw+1,y-1);ctx.stroke();ctx.beginPath();ctx.moveTo(mw+2,y-5);ctx.quadraticCurveTo(mw+1,y-2,mw-1,y-1);ctx.stroke();
  }else{
    ctx.strokeStyle=FB.lipDark;ctx.lineWidth=1.8;ctx.beginPath();ctx.moveTo(-mw,y-1);ctx.quadraticCurveTo(0,y+2+5*sm,mw,y-1);ctx.stroke();
    ctx.strokeStyle=hexA(FB.lip,0.8);ctx.lineWidth=1.2;ctx.beginPath();ctx.moveTo(-mw*0.7,y+3+4*sm);ctx.quadraticCurveTo(0,y+5+5*sm,mw*0.7,y+3+4*sm);ctx.stroke();
  }
}
function fbHairFront(ctx,o,t,wind){
  ctx.fillStyle=FB.hair;const w=wind*5,sw=Math.sin(t*1.4)*1.5;
  ctx.beginPath();ctx.moveTo(2,-54);ctx.bezierCurveTo(-18,-54,-36,-44,-40,-22);ctx.bezierCurveTo(-44,-4,-43,14,-41+w+sw,30);ctx.lineTo(-34+w+sw,28);ctx.bezierCurveTo(-34,8,-33,-10,-24,-28);ctx.bezierCurveTo(-18,-40,-8,-46,2,-47);ctx.closePath();ctx.fill();
  ctx.beginPath();ctx.moveTo(-2,-54);ctx.bezierCurveTo(18,-54,36,-44,40,-22);ctx.bezierCurveTo(44,-4,43,14,41+w-sw,30);ctx.lineTo(34+w-sw,28);ctx.bezierCurveTo(34,8,33,-10,26,-26);ctx.bezierCurveTo(20,-40,8,-46,-2,-47);ctx.closePath();ctx.fill();
  ctx.beginPath();ctx.moveTo(-40,-22);ctx.bezierCurveTo(-36,-54,36,-54,40,-22);ctx.bezierCurveTo(30,-40,10,-46,0,-45);ctx.bezierCurveTo(-10,-46,-30,-40,-40,-22);ctx.closePath();ctx.fill();
  ctx.strokeStyle=FB.hairHi;ctx.globalAlpha=0.45;ctx.lineWidth=1.3;ctx.beginPath();ctx.moveTo(0,-56);ctx.lineTo(0.5,-46);ctx.stroke();ctx.globalAlpha=1;
  ctx.strokeStyle=FB.hair;ctx.lineWidth=1.3;
  ctx.beginPath();ctx.moveTo(-30,-34);ctx.quadraticCurveTo(-38+w,-6,-36+w+sw,12);ctx.stroke();
  ctx.beginPath();ctx.moveTo(30,-34);ctx.quadraticCurveTo(38+w,-6,36+w-sw,12);ctx.stroke();
}
function fbBeanie(ctx){
  ctx.fillStyle='#1b1b21';ctx.beginPath();ctx.moveTo(-46,-26);ctx.bezierCurveTo(-48,-70,48,-70,46,-26);ctx.closePath();ctx.fill();
  ctx.fillStyle='#6d6d74';rrect(ctx,-48,-36,96,16,7);ctx.fill();
  ctx.strokeStyle='rgba(0,0,0,.25)';ctx.lineWidth=1;for(let x=-44;x<46;x+=6){ctx.beginPath();ctx.moveTo(x,-34);ctx.lineTo(x+2,-22);ctx.stroke();}
  ctx.fillStyle='rgba(255,255,255,.08)';ell(ctx,-14,-50,16,8,-0.4);ctx.fill();
}
function fbShades(ctx){
  ctx.fillStyle='#23232a';for(const d of[-1,1]){rrect(ctx,d*14-11,-57,22,11,5);ctx.fill();}
  ctx.strokeStyle='#3b3b44';ctx.lineWidth=2.2;ctx.beginPath();ctx.moveTo(-3,-52);ctx.lineTo(3,-52);ctx.stroke();
  ctx.beginPath();ctx.moveTo(-25,-52);ctx.quadraticCurveTo(-36,-51,-40,-38);ctx.stroke();ctx.beginPath();ctx.moveTo(25,-52);ctx.quadraticCurveTo(36,-51,40,-38);ctx.stroke();
  ctx.fillStyle='rgba(255,255,255,.25)';for(const d of[-1,1]){rrect(ctx,d*14-8,-56,8,3,1.5);ctx.fill();}
}
function fbBraid(ctx){ctx.fillStyle=FB.hairMid;for(const d of[-1,1]){for(let k=0;k<6;k++){const u=k/5,x=d*(36-u*30),y=-30-u*16;ell(ctx,x,y,4.5,2.8,d*(0.6-u*0.9));ctx.fill();}}}
function fbBody(ctx,o,t){
  const f=o.outfit||'sweater',pose=o.pose||'bust';
  const torso=fill=>{ctx.fillStyle=fill;ctx.beginPath();ctx.moveTo(-12,56);ctx.bezierCurveTo(-40,60,-62,66,-66,84);ctx.lineTo(-74,200);ctx.lineTo(74,200);ctx.lineTo(66,84);ctx.bezierCurveTo(62,66,40,60,12,56);ctx.closePath();ctx.fill();};
  const collar=col=>{ctx.fillStyle=col;ell(ctx,0,60,20,8);ctx.fill();ctx.fillStyle=FB.skinSh;ell(ctx,0,58,16,6);ctx.fill();};
  if(pose==='seat')fbLegs(ctx,o);
  if(pose==='snow'){ctx.fillStyle=o.legCol||'#3d2f2a';ell(ctx,46,226,78,34,0.15);ctx.fill();ctx.fillStyle='#1e1a1c';ell(ctx,112,236,22,14,0.3);ctx.fill();ctx.fillStyle='#a98562';ell(ctx,-20,214,52,26,-0.2);ctx.fill();}
  switch(f){
    case 'coat':{
      torso('#a98562');
      ctx.fillStyle='#dccab0';for(let k=0;k<9;k++){const u=k/8,x=-52+u*104,y=66-Math.sin(u*Math.PI)*10+Math.abs(u-0.5)*12;circle(ctx,x,y+6,11);ctx.fill();}
      for(let k=0;k<7;k++){const u=k/6,x=-44+u*88;ctx.fillStyle='#ece0cb';circle(ctx,x,70+Math.abs(u-0.5)*10,7);ctx.fill();}
      ctx.fillStyle='#f1ece2';ctx.beginPath();ctx.moveTo(-18,54);ctx.lineTo(-14,120);ctx.lineTo(14,120);ctx.lineTo(18,54);ctx.closePath();ctx.fill();
      ctx.strokeStyle='rgba(0,0,0,.08)';ctx.lineWidth=1;for(let y=60;y<118;y+=5){ctx.beginPath();ctx.moveTo(-15,y);ctx.lineTo(15,y);ctx.stroke();}
      ctx.fillStyle='#f1ece2';ell(ctx,0,48,17,12);ctx.fill();ctx.fillStyle='rgba(0,0,0,.08)';ctx.fillRect(-16,44,32,3);
      ctx.fillStyle='#8f6e4f';ctx.fillRect(-26,76,8,124);ctx.fillRect(18,76,8,124);
      ctx.fillStyle='#4a3626';for(let y=100;y<190;y+=28){circle(ctx,22,y,3.2);ctx.fill();}
      ctx.strokeStyle='rgba(0,0,0,.12)';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(-62,96);ctx.lineTo(-58,200);ctx.stroke();ctx.beginPath();ctx.moveTo(62,96);ctx.lineTo(58,200);ctx.stroke();
      break;}
    case 'kurta':{
      torso('#f7f3ec');
      const r=rng(77);for(let i=0;i<34;i++){const x=-60+r()*120,y=70+r()*125;ctx.fillStyle=r()<0.5?'#3f63a8':'#5f86c6';for(let k=0;k<5;k++){ell(ctx,x+Math.cos(k*1.26)*4,y+Math.sin(k*1.26)*4,3,2,k*1.26);ctx.fill();}ctx.fillStyle='#f3cf5a';circle(ctx,x,y,1.6);ctx.fill();ctx.fillStyle='#7fb29c';ell(ctx,x+7,y+5,4,2,0.6);ctx.fill();}
      ctx.fillStyle='#f7f3ec';ctx.beginPath();ctx.moveTo(-14,56);ctx.lineTo(-10,110);ctx.lineTo(10,110);ctx.lineTo(14,56);ctx.closePath();ctx.fill();
      ctx.strokeStyle='#3f63a8';ctx.lineWidth=1.4;ctx.beginPath();ctx.moveTo(-12,58);ctx.lineTo(-9,108);ctx.lineTo(9,108);ctx.lineTo(12,58);ctx.stroke();
      ctx.fillStyle='#3f63a8';for(let y=68;y<104;y+=12){circle(ctx,0,y,1.8);ctx.fill();}
      collar('#f7f3ec');
      ctx.fillStyle='rgba(120,170,225,.55)';ctx.beginPath();ctx.moveTo(-66,88);ctx.bezierCurveTo(-30,100,10,120,60,96);ctx.lineTo(74,200);ctx.lineTo(50,200);ctx.bezierCurveTo(10,150,-40,130,-74,120);ctx.closePath();ctx.fill();
      break;}
    case 'uni':{
      torso('#efe6d6');
      ctx.strokeStyle='rgba(0,0,0,.06)';ctx.lineWidth=1.2;for(let x=-60;x<60;x+=7){ctx.beginPath();ctx.moveTo(x,84);ctx.lineTo(x-2,200);ctx.stroke();}
      collar('#e2d8c6');
      ctx.fillStyle='#2f4b6e';ctx.beginPath();ctx.moveTo(-52,62);ctx.lineTo(-30,62);ctx.lineTo(-24,200);ctx.lineTo(-46,200);ctx.closePath();ctx.fill();
      ctx.beginPath();ctx.moveTo(52,62);ctx.lineTo(30,62);ctx.lineTo(24,200);ctx.lineTo(46,200);ctx.closePath();ctx.fill();
      ctx.fillStyle='#1f3550';ctx.fillRect(-46,120,22,8);ctx.fillRect(24,120,22,8);
      break;}
    case 'black':{
      torso('#17131c');
      const r=rng(88);ctx.fillStyle='#e6c470';for(let i=0;i<90;i++){const x=-70+r()*140,y=62+r()*138;ctx.globalAlpha=0.4+r()*0.6;circle(ctx,x,y,0.9+r()*1.1);ctx.fill();}ctx.globalAlpha=1;
      ctx.fillStyle='rgba(0,0,0,.25)';ctx.beginPath();ctx.moveTo(66,84);ctx.bezierCurveTo(30,96,-10,110,-66,150);ctx.lineTo(-74,200);ctx.lineTo(-30,200);ctx.bezierCurveTo(10,150,40,120,74,110);ctx.closePath();ctx.fill();
      ctx.fillStyle=FB.skinSh;ctx.beginPath();ctx.moveTo(-14,56);ctx.quadraticCurveTo(0,80,14,56);ctx.closePath();ctx.fill();
      ctx.strokeStyle=FB.gold;ctx.lineWidth=1.4;ctx.beginPath();ctx.moveTo(-10,58);ctx.quadraticCurveTo(0,76,10,58);ctx.stroke();circle(ctx,0,74,2.5);ctx.stroke();
      break;}
    case 'sage':{
      torso('#aebfae');
      ctx.fillStyle='#2b2b2e';ctx.beginPath();ctx.moveTo(-16,56);ctx.lineTo(-12,96);ctx.lineTo(12,96);ctx.lineTo(16,56);ctx.closePath();ctx.fill();
      ctx.fillStyle='#aebfae';ctx.beginPath();ctx.moveTo(-18,54);ctx.lineTo(-38,76);ctx.lineTo(-12,96);ctx.closePath();ctx.fill();ctx.beginPath();ctx.moveTo(18,54);ctx.lineTo(38,76);ctx.lineTo(12,96);ctx.closePath();ctx.fill();
      ctx.fillStyle='#9aab9a';for(let y=104;y<190;y+=22){circle(ctx,0,y,2.2);ctx.fill();}
      break;}
    case 'home':{torso('#e7c9d3');collar('#d9b6c2');break;}
    case 'floral':{
      /* 30 June, in the car: a light grey-white kurta with small dark-grey leaf / paisley marks all over,
         an embroidered neckline, long loose sleeves (photos/date30.jpg) */
      torso('#ebeae6');
      const r=rng(93);let row=0;
      for(let gy=72;gy<198;gy+=14,row++){
        for(let gx=-60+(row%2?7:0);gx<=60;gx+=14){
          const x=gx+(r()-0.5)*5,y=gy+(r()-0.5)*5,a=r()*TAU,k=0.62+r()*0.22,leaf=r()<0.4;
          ctx.save();ctx.translate(x,y);ctx.rotate(a);ctx.scale(k,k);ctx.globalAlpha*=0.85;
          ctx.fillStyle=r()<0.5?'#575c66':'#6e737d';
          if(leaf){for(const d of[-1,0,1]){ell(ctx,d*5,d*d*1.5,4,1.7,d*0.7);ctx.fill();}ctx.strokeStyle='rgba(70,74,84,.6)';ctx.lineWidth=0.8;ctx.beginPath();ctx.moveTo(-7,3);ctx.lineTo(7,3);ctx.stroke();}
          else{ctx.beginPath();ctx.moveTo(0,-5.5);ctx.bezierCurveTo(4.5,-5.5,5.5,1,2.2,4.4);ctx.quadraticCurveTo(0,6.6,-2.2,4.4);ctx.bezierCurveTo(-5.5,1,-4.5,-5.5,0,-5.5);ctx.closePath();ctx.fill();
            ctx.fillStyle='rgba(235,234,230,.55)';ell(ctx,0,0,1.6,2.6,0);ctx.fill();}
          ctx.restore();
        }
      }
      ctx.fillStyle='rgba(50,52,62,.08)';ctx.beginPath();ctx.moveTo(-66,88);ctx.bezierCurveTo(-30,100,10,120,60,96);ctx.lineTo(74,200);ctx.lineTo(50,200);ctx.bezierCurveTo(10,150,-40,130,-74,120);ctx.closePath();ctx.fill();
      ctx.fillStyle='#ebeae6';ell(ctx,-58,86,15,20,0.3);ctx.fill();ell(ctx,58,86,15,20,-0.3);ctx.fill();
      ctx.fillStyle='rgba(87,92,102,.85)';for(const[sx,sy,sa]of[[-60,80,0.5],[-54,94,-0.3],[60,82,-0.5],[54,96,0.3]]){ell(ctx,sx,sy,3,1.5,sa);ctx.fill();}
      collar('#ebeae6');
      ctx.strokeStyle='#e0dfda';ctx.lineWidth=4;ell(ctx,0,62,21,9);ctx.stroke();
      ctx.strokeStyle='#575c66';ctx.lineWidth=1;ell(ctx,0,62,23.5,11);ctx.stroke();ell(ctx,0,62,18.5,7.4);ctx.stroke();
      ctx.fillStyle='#575c66';for(let k=0;k<13;k++){const a=k/12*Math.PI;circle(ctx,Math.cos(a)*21,62+Math.sin(a)*9,0.9);ctx.fill();}
      ctx.beginPath();ctx.moveTo(0,72);ctx.lineTo(0,92);ctx.stroke();for(const y of[76,84,91]){circle(ctx,0,y,1);ctx.fill();}
      break;}
    default:{
      torso('#efe6d6');
      ctx.strokeStyle='rgba(120,100,70,.12)';ctx.lineWidth=1.4;for(let x=-62;x<62;x+=8){ctx.beginPath();ctx.moveTo(x,86);ctx.quadraticCurveTo(x-3,140,x-1,200);ctx.stroke();}
      ctx.fillStyle='#e2d8c6';ell(ctx,0,62,24,10);ctx.fill();ctx.fillStyle=FB.skinSh;ell(ctx,0,58,18,7);ctx.fill();
      ctx.strokeStyle='rgba(120,100,70,.18)';for(let k=0;k<8;k++){const a=Math.PI+k/7*Math.PI;ctx.beginPath();ctx.moveTo(Math.cos(a)*22,62+Math.sin(a)*9);ctx.lineTo(Math.cos(a)*26,62+Math.sin(a)*12);ctx.stroke();}
    }
  }
  if(o.arms)fbArms(ctx,o,t);
  if(pose==='knees')fbLegs(ctx,o);
}
function fbArms(ctx,o,t){
  const col=SLEEVE[o.outfit||'sweater']||'#e8dece',glove=o.outfit==='coat';
  const hand=(x,y,rot)=>{ctx.fillStyle=glove?'#1c1c22':FB.skin;ell(ctx,x,y,9,12,rot);ctx.fill();};
  ctx.strokeStyle=col;ctx.lineCap='round';ctx.lineWidth=o.outfit==='floral'?27:22;
  if(o.arms==='lap'){ctx.beginPath();ctx.moveTo(-58,90);ctx.quadraticCurveTo(-70,150,-26,186);ctx.stroke();ctx.beginPath();ctx.moveTo(58,90);ctx.quadraticCurveTo(70,150,26,186);ctx.stroke();hand(-20,192,0.4);hand(20,192,-0.4);}
  else if(o.arms==='wave'){const a=Math.sin(t*7)*0.25;ctx.beginPath();ctx.moveTo(-58,90);ctx.quadraticCurveTo(-70,150,-26,186);ctx.stroke();hand(-20,192,0.4);ctx.beginPath();ctx.moveTo(58,88);ctx.quadraticCurveTo(84,70,92+a*20,30);ctx.stroke();hand(96+a*22,20,a);}
  else if(o.arms==='phone'){ctx.beginPath();ctx.moveTo(-58,90);ctx.quadraticCurveTo(-60,140,-14,146);ctx.stroke();ctx.beginPath();ctx.moveTo(58,90);ctx.quadraticCurveTo(60,140,14,146);ctx.stroke();ctx.fillStyle='#17171c';rrect(ctx,-16,118,32,54,6);ctx.fill();ctx.fillStyle='#cfe3ff';rrect(ctx,-13,122,26,46,4);ctx.fill();hand(-18,150,0.5);hand(18,150,-0.5);}
  else if(o.arms==='cup'){ctx.beginPath();ctx.moveTo(-58,90);ctx.quadraticCurveTo(-66,140,-20,150);ctx.stroke();ctx.beginPath();ctx.moveTo(58,90);ctx.quadraticCurveTo(66,140,20,150);ctx.stroke();hand(-14,152,0.5);hand(14,152,-0.5);ctx.fillStyle='#f4efe6';rrect(ctx,-12,128,24,26,5);ctx.fill();ctx.fillStyle='#a56a3a';ell(ctx,0,130,10,3);ctx.fill();}
  else if(o.arms==='hug'){ctx.beginPath();ctx.moveTo(-58,90);ctx.quadraticCurveTo(-60,150,30,130);ctx.stroke();ctx.beginPath();ctx.moveTo(58,90);ctx.quadraticCurveTo(60,150,-30,138);ctx.stroke();hand(32,128,0.9);hand(-32,140,-0.9);}
  else if(o.arms==='hide'){const u=o.hide??1;ctx.beginPath();ctx.moveTo(-58,90);ctx.quadraticCurveTo(-70,60-u*20,-26,20-u*10);ctx.stroke();ctx.beginPath();ctx.moveTo(58,90);ctx.quadraticCurveTo(70,60-u*20,26,20-u*10);ctx.stroke();ctx.fillStyle=col;ell(ctx,-20,12,16,14,0.3);ctx.fill();ell(ctx,20,12,16,14,-0.3);ctx.fill();}
}
function fbLegs(ctx,o){
  const col=o.legCol||'#3d2f2a',boot='#1e1a1c';
  if(o.pose==='seat'){
    ctx.fillStyle=col;ctx.beginPath();ctx.moveTo(-50,180);ctx.lineTo(-40,300);ctx.lineTo(-8,300);ctx.lineTo(-6,180);ctx.closePath();ctx.fill();
    ctx.beginPath();ctx.moveTo(50,180);ctx.lineTo(40,300);ctx.lineTo(8,300);ctx.lineTo(6,180);ctx.closePath();ctx.fill();
    ctx.fillStyle=boot;rrect(ctx,-44,296,38,30,8);ctx.fill();rrect(ctx,6,296,38,30,8);ctx.fill();
  }else if(o.pose==='knees'){
    ctx.fillStyle=col;ell(ctx,-32,210,30,22);ctx.fill();ell(ctx,32,210,30,22);ctx.fill();
    ctx.fillStyle=mixHex(col,'#000000',0.25);ell(ctx,-32,222,26,10);ctx.fill();ell(ctx,32,222,26,10);ctx.fill();
  }
}
/* small far-away figures for wide shots */
function drawFabehaFar(ctx,x,y,s,t,o={}){
  ctx.save();ctx.translate(x,y);ctx.scale(s,s);
  const w=o.wind||0.5;
  ctx.fillStyle='rgba(120,170,225,.6)';ctx.beginPath();ctx.moveTo(-10,-40);ctx.quadraticCurveTo(-30-w*30,-20+Math.sin(t*2)*6,-50-w*40,10);ctx.lineTo(-30-w*20,14);ctx.quadraticCurveTo(-16,0,-8,-28);ctx.closePath();ctx.fill();
  ctx.fillStyle='#f7f3ec';ctx.beginPath();ctx.moveTo(-14,-44);ctx.lineTo(-20,30);ctx.lineTo(20,30);ctx.lineTo(14,-44);ctx.closePath();ctx.fill();
  ctx.fillStyle='#3f63a8';for(let k=0;k<6;k++){circle(ctx,-8+(k%3)*8,-30+Math.floor(k/3)*22,1.6);ctx.fill();}
  ctx.fillStyle='#3d2f2a';ctx.fillRect(-14,28,10,22);ctx.fillRect(4,28,10,22);
  ctx.fillStyle=FB.hair;ctx.beginPath();ctx.moveTo(-14,-52);ctx.quadraticCurveTo(-20-w*8,-20,-16-w*10,10);ctx.lineTo(16+w*4,10);ctx.quadraticCurveTo(18,-20,14,-52);ctx.closePath();ctx.fill();
  ctx.fillStyle=FB.skin;ell(ctx,0,-56,11,13);ctx.fill();
  ctx.fillStyle=FB.hair;ctx.beginPath();ctx.moveTo(-12,-60);ctx.quadraticCurveTo(0,-74,12,-60);ctx.quadraticCurveTo(0,-66,-12,-60);ctx.fill();
  ctx.restore();
}
function drawFigureFar(ctx,x,y,s,col,hair,t,k,sit){
  ctx.save();ctx.translate(x,y);ctx.scale(s,s);const b=Math.sin(t*1.5+k)*1.5;
  ctx.fillStyle=col;ctx.beginPath();ctx.moveTo(-14,-40+b);ctx.lineTo(-18,30);ctx.lineTo(18,30);ctx.lineTo(14,-40+b);ctx.closePath();ctx.fill();
  ctx.fillStyle='#2b2426';if(sit){ctx.fillRect(-16,24,32,12);ctx.fillRect(-14,34,9,14);ctx.fillRect(5,34,9,14);}else{ctx.fillRect(-14,28,10,20);ctx.fillRect(4,28,10,20);}
  ctx.fillStyle='#d9b394';ell(ctx,0,-52+b,10,12);ctx.fill();
  ctx.fillStyle=hair;ctx.beginPath();ctx.moveTo(-11,-56+b);ctx.quadraticCurveTo(0,-70+b,11,-56+b);ctx.quadraticCurveTo(0,-62+b,-11,-56+b);ctx.fill();
  ctx.restore();
}
