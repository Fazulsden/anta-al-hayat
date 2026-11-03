/* engine.js — shared painting helpers for "The Other Chair".
   Classic script: everything declared here is global to the other film scripts. */
'use strict';
const W=1280,H=720,TAU=Math.PI*2;
const clamp=(v,a=0,b=1)=>v<a?a:v>b?b:v;
const lerp=(a,b,t)=>a+(b-a)*t;
const smooth=(a,b,x)=>{const t=clamp((x-a)/(b-a));return t*t*(3-2*t);};
const easeIO=t=>{t=clamp(t);return t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;};
const easeOut=t=>1-Math.pow(1-clamp(t),3);
const backOut=t=>{const c1=1.70158,c3=c1+1;return 1+c3*Math.pow(t-1,3)+c1*Math.pow(t-1,2);};
function rng(seed){let a=seed>>>0;return()=>{a=(a+0x6D2B79F5)|0;let t=Math.imul(a^(a>>>15),1|a);t=(t+Math.imul(t^(t>>>7),61|t))^t;return((t^(t>>>14))>>>0)/4294967296;};}
function rgbOf(h){const n=parseInt(h.slice(1),16);return[(n>>16)&255,(n>>8)&255,n&255];}
function hexA(h,a){const c=rgbOf(h);a=Number.isFinite(a)?Math.max(0,Math.min(1,a)):0;return `rgba(${c[0]},${c[1]},${c[2]},${a})`;}
function mixHex(a,b,t){const A=rgbOf(a),B=rgbOf(b);t=Number.isFinite(t)?Math.max(0,Math.min(1,t)):0;const f=i=>Math.round(lerp(A[i],B[i],t)).toString(16).padStart(2,'0');return '#'+f(0)+f(1)+f(2);}
function mk(w,h){const c=document.createElement('canvas');c.width=Math.max(1,Math.round(w));c.height=Math.max(1,Math.round(h));return c;}
function vgrad(ctx,y0,y1,stops){const g=ctx.createLinearGradient(0,y0,0,y1);for(const[o,c]of stops)g.addColorStop(o,c);return g;}
function hgrad(ctx,x0,x1,stops){const g=ctx.createLinearGradient(x0,0,x1,0);for(const[o,c]of stops)g.addColorStop(o,c);return g;}
function circle(ctx,x,y,r){ctx.beginPath();ctx.arc(x,y,r,0,TAU);}
function ell(ctx,x,y,rx,ry,rot=0){ctx.beginPath();ctx.ellipse(x,y,rx,ry,rot,0,TAU);}
function rrect(ctx,x,y,w,h,r){ctx.beginPath();if(ctx.roundRect){ctx.roundRect(x,y,w,h,r);return;}r=Math.min(r,w/2,h/2);ctx.moveTo(x+r,y);ctx.arcTo(x+w,y,x+w,y+h,r);ctx.arcTo(x+w,y+h,x,y+h,r);ctx.arcTo(x,y+h,x,y,r);ctx.arcTo(x,y,x+w,y,r);ctx.closePath();}
function setLS(ctx,v){if('letterSpacing' in ctx)ctx.letterSpacing=v;}
function paintSky(ctx,stops){ctx.fillStyle=vgrad(ctx,0,H,stops);ctx.fillRect(-40,-40,W+80,H+80);}
function sunGlow(ctx,x,y,R,col){const g=ctx.createRadialGradient(x,y,0,x,y,R);g.addColorStop(0,col);g.addColorStop(1,col.replace(/[\d.]+\)$/,'0)'));ctx.fillStyle=g;ctx.fillRect(x-R,y-R,R*2,R*2);}
function glow(ctx,x,y,R,hex,a){const g=ctx.createRadialGradient(x,y,0,x,y,R);g.addColorStop(0,hexA(hex,a));g.addColorStop(1,hexA(hex,0));ctx.fillStyle=g;ctx.fillRect(x-R,y-R,R*2,R*2);}
function ridge(seed,oct,f0){const r=rng(seed),comps=[];for(let i=0;i<oct;i++)comps.push({f:f0*Math.pow(2.03,i)*(0.8+r()*0.4),p:r()*TAU,a:Math.pow(0.5,i)});const n=comps.reduce((s,c)=>s+c.a,0);return x=>{let v=0;for(const c of comps)v+=Math.sin(x*c.f+c.p)*c.a;return v/n;};}
function softened(c,px){try{const d=mk(c.width,c.height),g=d.getContext('2d');if(!('filter' in g))return c;g.filter=`blur(${px}px)`;g.drawImage(c,0,0);g.filter='none';return d;}catch(e){return c;}}
function wrapText(ctx,text,maxW){const out=[];for(const para of String(text).split('\n')){let line='';for(const w0 of para.split(' ')){const parts=[];let cps=Array.from(w0);while(ctx.measureText(cps.join('')).width>maxW&&cps.length>2){let n=cps.length-1;while(n>2&&ctx.measureText(cps.slice(0,n).join('')).width>maxW)n--;parts.push(cps.slice(0,n).join(''));cps=cps.slice(n);}parts.push(cps.join(''));for(const p of parts){const test=line?line+' '+p:p;if(ctx.measureText(test).width>maxW&&line){out.push(line);line=p;}else line=test;}}out.push(line);}return out;}
function textBlock(ctx,lines,x,y,lh){for(let i=0;i<lines.length;i++)ctx.fillText(lines[i],x,y+i*lh);}

/* ---------- landscape blocks ---------- */
function drawPine(g,x,y,h,dark,light,snow,r){
  g.fillStyle=dark;g.fillRect(x-h*0.025,y-h*0.14,h*0.05,h*0.14);
  for(let i=0;i<3;i++){
    const ty=y-h*(0.1+i*0.27),tw=h*(0.3-i*0.07)*(0.85+r()*0.3),th=h*0.38;
    g.fillStyle=i%2?light:dark;g.beginPath();g.moveTo(x-tw,ty);g.lineTo(x,ty-th);g.lineTo(x+tw,ty);g.closePath();g.fill();
    if(snow){g.fillStyle=snow;g.globalAlpha=0.75;g.beginPath();g.moveTo(x-tw*0.5,ty-th*0.38);g.lineTo(x,ty-th*0.97);g.lineTo(x+tw*0.22,ty-th*0.6);g.lineTo(x-tw*0.1,ty-th*0.5);g.closePath();g.fill();g.globalAlpha=1;}
  }
}
function drawTreeClump(g,x,y,s,dark,light,r){
  g.fillStyle=dark;g.fillRect(x-s*0.05,y-s*0.55,s*0.1,s*0.6);
  const blobs=[],n=4+Math.floor(r()*4);
  for(let i=0;i<n;i++)blobs.push([x+(r()-0.5)*s*0.8,y-s*0.6-r()*s*0.45,s*(0.2+r()*0.16)]);
  g.fillStyle=dark;for(const b of blobs){circle(g,b[0],b[1],b[2]);g.fill();}
  g.fillStyle=light;g.globalAlpha=0.55;for(const b of blobs){circle(g,b[0]-b[2]*0.28,b[1]-b[2]*0.3,b[2]*0.62);g.fill();}g.globalAlpha=1;
}
function makeLayer(o){
  const w=o.w,h=o.h||H,c=mk(w,h),g=c.getContext('2d'),r=rng(o.seed*7+1);
  const f=ridge(o.seed,o.oct||3,o.f0||0.004);
  const ry=x=>(o.base?o.base(x):o.y0)-o.amp*f(x);
  const fill=new Path2D(),line=new Path2D();
  fill.moveTo(0,h);
  for(let x=0;x<=w;x+=4){const y=ry(x);fill.lineTo(x,y);if(x===0)line.moveTo(x,y);else line.lineTo(x,y);}
  fill.lineTo(w,h);fill.closePath();
  let minY=h;for(let x=0;x<=w;x+=16)minY=Math.min(minY,ry(x));
  g.fillStyle=vgrad(g,minY,h,[[0,o.top],[1,o.bottom]]);g.fill(fill);
  g.save();g.clip(fill);
  if(o.patches){const n=o.patchN||Math.round(w/12);for(let i=0;i<n;i++){const x=r()*w,y0=ry(x),y=y0+Math.pow(r(),1.4)*(h-y0);g.globalAlpha=0.05+r()*0.09;g.fillStyle=o.patches[i%o.patches.length];g.beginPath();g.ellipse(x,y,20+r()*80,5+r()*16,0,0,TAU);g.fill();}g.globalAlpha=1;}
  if(o.strokes){g.strokeStyle=o.strokes;g.lineWidth=1.2;g.globalAlpha=0.22;g.beginPath();const n=Math.round(w*0.9);for(let i=0;i<n;i++){const x=r()*w,y0=ry(x),y=y0+3+r()*Math.min(110,h-y0),l=3+r()*6;g.moveTo(x,y);g.lineTo(x+1.5+r()*1.5,y-l);}g.stroke();g.globalAlpha=1;}
  if(o.rock){const n=Math.round(w/9);for(let i=0;i<n;i++){const x=r()*w,y0=ry(x),y=y0+r()*Math.min(160,h-y0);g.globalAlpha=0.12+r()*0.22;g.fillStyle=o.rock;g.beginPath();g.moveTo(x,y);g.lineTo(x+6+r()*26,y+3+r()*8);g.lineTo(x+2+r()*10,y+10+r()*18);g.closePath();g.fill();}g.globalAlpha=1;}
  if(o.rim){g.strokeStyle=o.rim;g.globalAlpha=o.rimA||0.5;g.lineWidth=o.rimW||5;g.stroke(line);g.globalAlpha=1;}
  if(o.haze){const hg=g.createLinearGradient(0,minY,0,h);hg.addColorStop(0,'rgba(190,215,225,0)');hg.addColorStop(1,o.haze);g.fillStyle=hg;g.fillRect(0,0,w,h);}
  g.restore();
  if(o.pines){const P=o.pines;for(let i=0;i<P.n;i++){const x=P.xs?P.xs(r):r()*w;drawPine(g,x,ry(x)+(P.sink||3),P.size*(0.7+r()*0.6),P.dark,P.light,P.snow,r);}}
  if(o.trees){const T=o.trees;for(let i=0;i<T.n;i++){const x=T.xs?T.xs(r):r()*w;drawTreeClump(g,x,ry(x)+T.sink,T.size*(0.7+r()*0.6),T.dark,T.light,r);}}
  if(o.after)o.after(g,ry,r);
  return {c,ry};
}
function makeCloud(seed,w,h,o={}){
  const pad=30,c=mk(w+pad*2,h+pad*2),g=c.getContext('2d'),r=rng(seed);
  const hi=o.hi||'#ffffff',sh=o.sh||'#b3c5dc',base=pad+h,puffs=[],n=o.n||28;
  for(let i=0;i<n;i++){const u=0.06+0.88*r(),dome=Math.pow(Math.sin(Math.PI*u),o.peak||1.2);const rad=h*(0.13+0.13*r())*(0.55+0.7*dome);const lift=Math.max(0,h-rad*2)*dome*(0.35+0.65*r());puffs.push({x:pad+w*u,y:base-rad*0.65-lift,r:rad});}
  puffs.sort((a,b)=>a.y-b.y);
  g.fillStyle=sh;for(const p of puffs){circle(g,p.x,p.y,p.r);g.fill();}
  g.clearRect(0,base,c.width,pad+2);
  g.globalCompositeOperation='source-atop';
  for(const p of puffs){const cx=p.x-p.r*0.18,cy=p.y-p.r*0.28;const gr=g.createRadialGradient(cx-p.r*0.2,cy-p.r*0.25,p.r*0.05,cx,cy,p.r*0.92);gr.addColorStop(0,hi);gr.addColorStop(0.55,hi);gr.addColorStop(1,hexA(hi,0));g.fillStyle=gr;circle(g,cx,cy,p.r*0.92);g.fill();}
  const bg=g.createLinearGradient(0,pad+h*0.45,0,base);bg.addColorStop(0,hexA(sh,0));bg.addColorStop(1,hexA(sh,0.9));g.fillStyle=bg;g.fillRect(0,0,c.width,c.height);
  if(o.warm){const wg=g.createLinearGradient(c.width,0,0,c.height);wg.addColorStop(0,hexA(o.warm,0.55));wg.addColorStop(0.6,hexA(o.warm,0));g.fillStyle=wg;g.fillRect(0,0,c.width,c.height);}
  g.globalCompositeOperation='source-over';
  return softened(c,0.8);
}
function makeWisps(seed,w,h){const c=mk(w,h),g=c.getContext('2d'),r=rng(seed);g.lineCap='round';for(let i=0;i<9;i++){const y=r()*h,len=w*(0.3+r()*0.6),x0=r()*(w-len),lw=6+r()*22;g.strokeStyle=`rgba(255,255,255,${0.18+r()*0.3})`;g.lineWidth=lw;g.beginPath();g.moveTo(x0,y);g.bezierCurveTo(x0+len*0.3,y-20-r()*40,x0+len*0.7,y+20+r()*40,x0+len,y+(r()-0.5)*30);g.stroke();}return softened(c,6);}

/* ---------- atmosphere ---------- */
function snowfall(ctx,lt,n,seed,wind,sz,alpha){
  const r=rng(seed);ctx.fillStyle=`rgba(255,255,255,${alpha})`;
  for(let i=0;i<n;i++){const x0=r()*W,y0=r()*H,sp=35+r()*70,ph=r()*TAU,s=sz*(0.4+r()*0.9),span=W+60;
    const x=((x0+Math.sin(lt*0.7+ph)*22+lt*wind)%span+span)%span-30,y=((y0+lt*sp)%(H+60)+(H+60))%(H+60)-30;
    circle(ctx,x,y,s);ctx.fill();}
}
function motes(ctx,lt,n,seed,col,size,speed=1){
  const r=rng(seed);ctx.save();ctx.globalCompositeOperation='screen';
  for(let i=0;i<n;i++){const x0=r()*W,y0=r()*H,sp=(4+r()*10)*speed,ph=r()*TAU,s=size*(0.5+r());
    const x=((x0+Math.sin(lt*0.3+ph)*30+lt*sp)%W+W)%W,y=((y0-lt*sp*0.6+Math.cos(lt*0.4+ph)*20)%H+H)%H,tw=0.5+0.5*Math.sin(lt*2+ph*3);
    const g=ctx.createRadialGradient(x,y,0,x,y,s*3);g.addColorStop(0,hexA(col,0.9*tw));g.addColorStop(1,hexA(col,0));ctx.fillStyle=g;ctx.fillRect(x-s*3,y-s*3,s*6,s*6);}
  ctx.restore();
}
function bokeh(ctx,lt,n,seed,cols,rmin,rmax,alpha=0.5){
  const r=rng(seed);ctx.save();ctx.globalCompositeOperation='screen';
  for(let i=0;i<n;i++){const x=r()*W,y=r()*H,R=rmin+r()*(rmax-rmin),ph=r()*TAU,col=cols[i%cols.length],a=alpha*(0.55+0.45*Math.sin(lt*0.9+ph));
    const g=ctx.createRadialGradient(x,y,0,x,y,R);g.addColorStop(0,hexA(col,a));g.addColorStop(0.7,hexA(col,a*0.7));g.addColorStop(1,hexA(col,0));ctx.fillStyle=g;ctx.fillRect(x-R,y-R,R*2,R*2);}
  ctx.restore();
}
function stars(ctx,lt,n,seed,ymax,alpha=1){const r=rng(seed);for(let i=0;i<n;i++){const x=r()*W,y=r()*ymax,s=r()*1.4+0.3,ph=r()*TAU,a=alpha*(0.4+0.6*Math.sin(lt*1.6+ph));ctx.fillStyle=`rgba(255,250,235,${a})`;ctx.fillRect(x,y,s,s);}}
function aurora(ctx,lt,alpha=1){
  ctx.save();ctx.globalCompositeOperation='screen';
  const cols=[['#52f0a6','#8ad8ff'],['#5ee3b0','#c58cff'],['#9cf2c8','#ff9bd0']];
  for(let k=0;k<3;k++){
    const base=120+k*55,amp=28+k*14,sp=0.35+k*0.12,[c1,c2]=cols[k];
    ctx.beginPath();ctx.moveTo(-20,H*0.75);
    for(let x=-20;x<=W+20;x+=16){const y=base+Math.sin(x*0.004+lt*sp+k)*amp+Math.sin(x*0.011-lt*0.5)*amp*0.4;ctx.lineTo(x,y);}
    ctx.lineTo(W+20,H*0.75);ctx.closePath();
    const g=ctx.createLinearGradient(0,base-amp,0,H*0.72);g.addColorStop(0,hexA(c1,0.5*alpha));g.addColorStop(0.35,hexA(c2,0.22*alpha));g.addColorStop(1,hexA(c2,0));ctx.fillStyle=g;ctx.fill();
  }
  ctx.restore();
}
function drawSea(ctx,lt,y0,y1,far,near,foam){
  ctx.fillStyle=vgrad(ctx,y0,y1,[[0,far],[1,near]]);ctx.fillRect(0,y0,W,y1-y0);
  ctx.save();ctx.lineCap='round';
  for(let i=0;i<14;i++){
    const u=((i/14)+lt*0.045)%1,y=lerp(y0+4,y1,u*u),a=0.15+0.7*u,amp=1+u*5;
    ctx.strokeStyle=hexA(foam,a);ctx.lineWidth=0.8+u*3.2;ctx.beginPath();
    const seg=28,start=-20+((i*131)%200);
    for(let x=start;x<=W+40;x+=seg){const yy=y+Math.sin(x*0.02+lt*1.4+i)*amp+Math.sin(x*0.051-lt*0.9)*amp*0.4;if(x===start)ctx.moveTo(x,yy);else ctx.lineTo(x,yy);}
    ctx.stroke();
  }
  ctx.restore();
}
function sunPath(ctx,lt,x,y0,y1,col){ctx.save();ctx.globalCompositeOperation='screen';for(let i=0;i<30;i++){const u=i/30,y=lerp(y0,y1,u*u),w=10+u*120,a=(0.12+0.3*u)*(0.6+0.4*Math.sin(lt*3+i));const g=ctx.createLinearGradient(x-w,0,x+w,0);g.addColorStop(0,hexA(col,0));g.addColorStop(0.5,hexA(col,a));g.addColorStop(1,hexA(col,0));ctx.fillStyle=g;ctx.fillRect(x-w,y,w*2,2.2);}ctx.restore();}
function windRibbons(ctx,lt,n,seed,alpha){
  const r=rng(seed);ctx.save();ctx.lineCap='round';
  for(let i=0;i<n;i++){const y0=120+r()*420,sp=380+r()*360,len=260+r()*320,ph=r()*TAU,amp=14+r()*26,off=r()*3000,lw=1.5+r()*2.5,span=W+len+600,head=((lt*sp+off)%span)-300,seg=12,yf=x=>y0+Math.sin(x*0.009+ph+lt*1.2)*amp+Math.sin(x*0.023+ph)*amp*0.25;
    ctx.lineWidth=lw;for(let k=0;k<seg;k++){const x0=head-len*(1-k/seg),x1=head-len*(1-(k+1)/seg),xm=(x0+x1)/2;ctx.strokeStyle=`rgba(255,255,255,${alpha*Math.sin(Math.PI*(k+0.5)/seg)*0.5})`;ctx.beginPath();ctx.moveTo(x0,yf(x0));ctx.quadraticCurveTo(xm,yf(xm),x1,yf(x1));ctx.stroke();}}
  ctx.restore();
}
function confetti(ctx,lt,n,seed,cols){const r=rng(seed);for(let i=0;i<n;i++){const x0=r()*W,sp=60+r()*90,ph=r()*TAU,w=5+r()*7,h=3+r()*5,col=cols[i%cols.length],rot=r()*TAU;const x=x0+Math.sin(lt*1.3+ph)*40,y=((lt*sp+r()*H)%(H+80))-40;ctx.save();ctx.translate(x,y);ctx.rotate(rot+lt*3);ctx.fillStyle=col;ctx.fillRect(-w/2,-h/2,w,h*Math.abs(Math.cos(lt*4+ph)));ctx.restore();}}

/* ---------- the phone (first person: his hand) ---------- */
const PHONE={w:300,h:640};
function drawPhone(ctx,x,y,w,h,o={}){
  const r=w*0.16;
  ctx.save();ctx.shadowColor='rgba(0,0,0,.45)';ctx.shadowBlur=30;ctx.shadowOffsetY=12;
  ctx.fillStyle='#101014';rrect(ctx,x,y,w,h,r);ctx.fill();ctx.restore();
  ctx.strokeStyle='rgba(255,255,255,.18)';ctx.lineWidth=1.5;rrect(ctx,x+1,y+1,w-2,h-2,r);ctx.stroke();
  const S={x:x+9,y:y+9,w:w-18,h:h-18,r:r-7};
  ctx.fillStyle=o.screen||'#0b141a';rrect(ctx,S.x,S.y,S.w,S.h,S.r);ctx.fill();
  return S;
}
function phoneTop(ctx,S,o={}){
  ctx.save();rrect(ctx,S.x,S.y,S.w,S.h,S.r);ctx.clip();
  ctx.fillStyle='#0e0e12';ctx.beginPath();ctx.roundRect?ctx.roundRect(S.x+S.w/2-44,S.y+8,88,24,12):ctx.rect(S.x+S.w/2-44,S.y+8,88,24);ctx.fill();
  ctx.fillStyle=o.light?'#111':'#e8e8ea';ctx.font='600 13px "Mulish",sans-serif';ctx.textAlign='left';ctx.fillText(o.time||'16:40',S.x+22,S.y+26);
  ctx.textAlign='right';ctx.font='500 12px "Mulish",sans-serif';ctx.fillText('●●●  ⌔  ▮',S.x+S.w-18,S.y+26);
  ctx.restore();
}
function chatPanel(ctx,S,msgs,lt,o={}){
  const name=o.name||'Fabeha',dark=o.dark!==false;
  ctx.save();rrect(ctx,S.x,S.y,S.w,S.h,S.r);ctx.clip();
  ctx.fillStyle=dark?'#0b141a':'#efe7dd';ctx.fillRect(S.x,S.y,S.w,S.h);
  if(dark){const r=rng(9);ctx.fillStyle='rgba(255,255,255,.035)';for(let i=0;i<90;i++){circle(ctx,S.x+r()*S.w,S.y+r()*S.h,1+r()*3);ctx.fill();}}
  const hy=S.y+36,hh=58;
  const bottom=Math.min(S.y+S.h-66,H-136),maxW=S.w*0.74,pad=10,lh=19;
  ctx.font='500 15px "Mulish",sans-serif';
  const vis=msgs.filter(m=>m.at<=lt);
  let y=bottom-6;
  const typing=msgs.find(m=>m.at>lt&&m.at-lt<1.4&&m.who==='her');
  if(typing){const px=S.x+14,py=y-30;ctx.fillStyle=dark?'#202c33':'#ffffff';rrect(ctx,px,py,58,30,12);ctx.fill();for(let k=0;k<3;k++){const b=0.5+0.5*Math.sin(lt*8-k*1.1);ctx.fillStyle=`rgba(160,175,185,${0.4+0.6*b})`;circle(ctx,px+16+k*13,py+15-b*3,3.4);ctx.fill();}y=py-8;}
  for(let i=vis.length-1;i>=0&&y>hy+hh-10;i--){
    if(i===vis.length-1){/* header is painted after the bubbles so long ones slide under it */}
    const m=vis[i],mine=m.who==='me',deleted=m.del!=null&&lt>=m.del,lines=m.photos?[]:wrapText(ctx,deleted?'⊘  You deleted this message.':m.text,maxW-pad*2);
    let bw=0;for(const l of lines)bw=Math.max(bw,ctx.measureText(l).width);
    const tw=m.time?ctx.measureText(m.time).width*0.8+8:0;bw=Math.min(maxW+8,Math.max(bw+pad*2+6,tw+pad*2+10));
    const tile=m.photos?Math.floor((maxW-6)/2):0;if(m.photos)bw=tile*2+12;
    const bh=(m.photos?tile*Math.min(2,Math.ceil(m.photos/2))+6+6:lines.length*lh)+pad*2+(m.time?10:0),by=y-bh,bx=mine?S.x+S.w-14-bw:S.x+14;
    const age=lt-m.at,pop=i===vis.length-1?backOut(clamp(age/0.28)):1;
    ctx.save();ctx.translate(mine?bx+bw:bx,by+bh);ctx.scale(pop,pop);ctx.translate(mine?-(bx+bw):-bx,-(by+bh));
    ctx.fillStyle=mine?(dark?'#005c4b':'#d9fdd3'):(dark?'#202c33':'#ffffff');rrect(ctx,bx,by,bw,bh,12);ctx.fill();
    if(m.photos){/* a 2×2 collage of photos (sunflowers, or the painter in m.paint) with the rest counted on the last tile */
      const n=Math.min(4,m.photos);for(let k=0;k<n;k++){const px=bx+6+(k%2)*(tile+4),py=by+6+Math.floor(k/2)*(tile+4);ctx.save();rrect(ctx,px,py,tile,tile,8);ctx.clip();
        if(m.paint)m.paint(ctx,px,py,tile,k);else{ctx.fillStyle=vgrad(ctx,py,py+tile,[[0,'#9fcbea'],[0.5,'#d9e8cf'],[1,'#5d8d3e']]);ctx.fillRect(px,py,tile,tile);const rr=rng(400+k*7+m.at*3);for(let j=0;j<5;j++){const s=tile*(0.22+rr()*0.3);ctx.drawImage(SPR.sunflower,px+rr()*(tile-s),py+tile*0.25+rr()*(tile*0.6-s),s,s);}}
        if(k===3&&m.photos>4){ctx.fillStyle='rgba(0,0,0,.5)';ctx.fillRect(px,py,tile,tile);ctx.fillStyle='#fff';ctx.font='700 20px "Mulish",sans-serif';ctx.textAlign='center';ctx.fillText('+'+(m.photos-4),px+tile/2,py+tile/2+7);ctx.textAlign='left';ctx.font='500 15px "Mulish",sans-serif';}
        ctx.restore();}
    }
    ctx.fillStyle=deleted?(dark?'rgba(233,237,239,.55)':'rgba(0,0,0,.45)'):(dark?'#e9edef':'#111');ctx.textAlign='left';if(deleted)ctx.font='italic 500 15px "Mulish",sans-serif';
    for(let k=0;k<lines.length;k++)ctx.fillText(lines[k],bx+pad,by+pad+14+k*lh);
    if(deleted)ctx.font='500 15px "Mulish",sans-serif';
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
  ctx.fillStyle=dark?'#8696a0':'#888';ctx.font='500 14px "Mulish",sans-serif';ctx.textAlign='left';ctx.fillText(o.draft||'Message',S.x+28,iy+33);
  ctx.fillStyle='#00a884';circle(ctx,S.x+S.w-30,iy+28,18);ctx.fill();ctx.fillStyle='#fff';ctx.beginPath();ctx.moveTo(S.x+S.w-37,iy+20);ctx.lineTo(S.x+S.w-21,iy+28);ctx.lineTo(S.x+S.w-37,iy+36);ctx.closePath();ctx.fill();
  ctx.restore();
}
/* his right hand holding the phone, bottom of frame; returns the screen rect */
const HIS={skin:'#c9977a',skinSh:'#a9775c',nail:'#e2bba6'};
function drawPhoneHand(ctx,lt,o={}){
  const bob=Math.sin(lt*0.8)*3,sway=Math.sin(lt*0.5)*0.01,x=(o.x??490),y=(o.y??150)+bob,w=o.w||PHONE.w,h=o.h||PHONE.h;
  ctx.save();ctx.translate(640,720);ctx.rotate(sway);ctx.translate(-640,-720);
  ctx.fillStyle=HIS.skin;
  ctx.beginPath();ctx.moveTo(x-30,y+h*0.42);ctx.bezierCurveTo(x-70,y+h*0.5,x-80,y+h*0.9,x-40,H+40);ctx.lineTo(x+w*0.6,H+40);ctx.bezierCurveTo(x+w*0.6,y+h*0.9,x+w*0.3,y+h*0.85,x+w*0.1,y+h*0.8);ctx.closePath();ctx.fill();
  const S=drawPhone(ctx,x,y,w,h,o);
  for(let k=0;k<4;k++){const fy=y+h*(0.36+k*0.1),fw=48-k*3,fh=h*0.07,fx=x-fw+18;ctx.fillStyle=HIS.skin;rrect(ctx,fx,fy,fw,fh,fh/2);ctx.fill();ctx.strokeStyle='rgba(90,55,35,.32)';ctx.lineWidth=1.4;rrect(ctx,fx,fy,fw,fh,fh/2);ctx.stroke();ctx.fillStyle=HIS.nail;ell(ctx,fx+8,fy+fh/2,4.5,fh*0.3);ctx.fill();ctx.fillStyle='rgba(90,55,35,.16)';ell(ctx,x+6,fy+fh*0.5,6,fh*0.34);ctx.fill();}
  ctx.fillStyle=HIS.skin;ctx.beginPath();ctx.moveTo(x+w+6,y+h*0.62);ctx.bezierCurveTo(x+w-10,y+h*0.6,x+w-40,y+h*0.74,x+w-30,y+h*0.9);ctx.bezierCurveTo(x+w-10,y+h*1.0,x+w+40,y+h*0.9,x+w+30,y+h*0.7);ctx.closePath();ctx.fill();
  ctx.fillStyle=HIS.nail;ell(ctx,x+w-30,y+h*0.72,6,9,-0.4);ctx.fill();
  ctx.restore();
  return S;
}
function drawGlovesOnBar(ctx,lt,o={}){
  const y=(o.y||556)+Math.sin(lt*1.1)*4;
  ctx.save();ctx.lineCap='round';
  ctx.strokeStyle='#4b4f58';ctx.lineWidth=22;ctx.beginPath();ctx.moveTo(60,y+26);ctx.quadraticCurveTo(640,y-14,1220,y+26);ctx.stroke();
  ctx.strokeStyle='#8f949e';ctx.lineWidth=7;ctx.beginPath();ctx.moveTo(60,y+18);ctx.quadraticCurveTo(640,y-22,1220,y+18);ctx.stroke();
  for(const[gx,dir]of[[400,1],[880,-1]]){
    const gy=y+2+Math.sin(lt*1.3+gx)*2;
    ctx.fillStyle='#17171c';ell(ctx,gx,gy+30,46,38,0.15*dir);ctx.fill();
    ctx.fillStyle='#202026';for(let k=0;k<4;k++){ell(ctx,gx-30+k*20,gy-4+Math.abs(k-1.5)*4,12,20,0.1*dir*(k-1.5));ctx.fill();}
    ctx.fillStyle='#2b2b32';ell(ctx,gx+dir*44,gy+18,13,22,0.5*dir);ctx.fill();
    ctx.strokeStyle='rgba(255,255,255,.1)';ctx.lineWidth=2;ctx.beginPath();ctx.arc(gx,gy+30,34,Math.PI*1.1,Math.PI*1.6);ctx.stroke();
    ctx.fillStyle='#3a3f4a';rrect(ctx,gx-26,gy+54,52,40,10);ctx.fill();
  }
  ctx.restore();
}
/* glass reflection of Fazul (dark hair, strong brows, beard), used for window shots */
function drawFazul(ctx,x,y,s,alpha,o={}){
  ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.globalAlpha*=alpha;
  const t=o.t||0;
  ctx.fillStyle='#5f6a4a';ctx.beginPath();ctx.moveTo(-70,120);ctx.quadraticCurveTo(-72,60,-26,50);ctx.lineTo(26,50);ctx.quadraticCurveTo(72,60,70,120);ctx.closePath();ctx.fill();
  ctx.fillStyle='#8a9470';ctx.beginPath();ctx.moveTo(-26,50);ctx.lineTo(-14,120);ctx.lineTo(14,120);ctx.lineTo(26,50);ctx.closePath();ctx.fill();
  ctx.fillStyle='#b98a6e';ctx.fillRect(-12,30,24,26);
  ctx.fillStyle='#c9977a';ctx.beginPath();ctx.moveTo(-34,-24);ctx.bezierCurveTo(-38,10,-26,40,0,44);ctx.bezierCurveTo(26,40,38,10,34,-24);ctx.bezierCurveTo(32,-48,-32,-48,-34,-24);ctx.closePath();ctx.fill();
  ctx.fillStyle='rgba(40,28,24,.55)';ctx.beginPath();ctx.moveTo(-30,8);ctx.bezierCurveTo(-30,30,-18,44,0,44);ctx.bezierCurveTo(18,44,30,30,30,8);ctx.bezierCurveTo(26,22,10,26,0,26);ctx.bezierCurveTo(-10,26,-26,22,-30,8);ctx.closePath();ctx.fill();
  ctx.fillStyle='rgba(40,28,24,.6)';ell(ctx,0,16,13,3.6);ctx.fill();
  ctx.fillStyle='#1c1416';ctx.beginPath();ctx.moveTo(-36,-20);ctx.bezierCurveTo(-36,-52,36,-52,36,-20);ctx.lineTo(30,-14);ctx.bezierCurveTo(26,-30,14,-34,4,-28);ctx.bezierCurveTo(-6,-36,-24,-32,-30,-10);ctx.closePath();ctx.fill();
  ctx.strokeStyle='#241a1c';ctx.lineWidth=3;ctx.lineCap='round';
  ctx.beginPath();ctx.moveTo(-26,-10);ctx.quadraticCurveTo(-16,-16,-6,-11);ctx.stroke();ctx.beginPath();ctx.moveTo(6,-11);ctx.quadraticCurveTo(16,-16,26,-10);ctx.stroke();
  const blink=((t+1.3)%4.6)<0.12;ctx.fillStyle='#2a1c1a';
  for(const ex of[-15,15]){if(blink)ctx.fillRect(ex-6,-2,12,1.6);else{ell(ctx,ex,-1,5,3.6);ctx.fill();}}
  ctx.strokeStyle='rgba(120,80,60,.6)';ctx.lineWidth=1.4;ctx.beginPath();ctx.moveTo(2,2);ctx.lineTo(5,10);ctx.lineTo(1,12);ctx.stroke();
  ctx.restore();
}

/* ---------- film overlays ---------- */
const SPR={};
function buildSprites(){
  { const c=mk(256,256),g=c.getContext('2d'),id=g.createImageData(256,256),d=id.data;
    for(let i=0;i<d.length;i+=4){const v=Math.random()*255;d[i]=d[i+1]=d[i+2]=v;d[i+3]=Math.random()<0.5?20:0;}
    g.putImageData(id,0,0);SPR.grain=c; }
  { const c=mk(W,H),g=c.getContext('2d'),r=rng(5);
    for(let i=0;i<60;i++){const x=r()*W,y=r()*H,R=60+r()*220,dark=r()<0.5,col=dark?'#4a3a4a':'#fff6ea';const gr=g.createRadialGradient(x,y,0,x,y,R);gr.addColorStop(0,hexA(col,0.05));gr.addColorStop(1,hexA(col,0));g.fillStyle=gr;g.fillRect(x-R,y-R,R*2,R*2);}
    const v=g.createRadialGradient(W/2,H*0.55,H*0.35,W/2,H*0.55,H*0.95);v.addColorStop(0,'rgba(14,12,26,0)');v.addColorStop(1,'rgba(14,12,26,.4)');g.fillStyle=v;g.fillRect(0,0,W,H);
    SPR.overlay=c; }
  { const c=mk(64,64),g=c.getContext('2d'),cx=32,cy=32;
    for(const[R,col,n]of[[26,'#f2b93b',22],[19,'#f7cd47',18],[12,'#f9dc62',14]]){g.fillStyle=col;for(let i=0;i<n;i++){g.save();g.translate(cx,cy);g.rotate(i/n*TAU+R*0.1);g.beginPath();g.ellipse(R*0.55,0,R*0.5,R*0.11+1.2,0,0,TAU);g.fill();g.restore();}}
    g.fillStyle='#5a3a1c';circle(g,cx,cy,7);g.fill();g.fillStyle='#7a5228';for(let i=0;i<10;i++){circle(g,cx+Math.cos(i*1.9)*3.5,cy+Math.sin(i*1.9)*3.5,1.2);g.fill();}SPR.sunflower=c; }
}
function heart(ctx,x,y,s){ctx.beginPath();ctx.moveTo(x,y+s*0.9);ctx.bezierCurveTo(x-s*1.3,y-s*0.1,x-s*0.6,y-s*1.1,x,y-s*0.4);ctx.bezierCurveTo(x+s*0.6,y-s*1.1,x+s*1.3,y-s*0.1,x,y+s*0.9);ctx.closePath();}
function coin(ctx,x,y,r,t){ctx.save();ctx.translate(x,y);const sq=Math.abs(Math.cos(t));ctx.scale(Math.max(0.15,sq),1);ctx.fillStyle='#d99a2b';circle(ctx,0,0,r);ctx.fill();ctx.fillStyle='#f6c957';circle(ctx,0,0,r*0.78);ctx.fill();ctx.fillStyle='#d99a2b';ctx.font=`700 ${r*1.1}px "Mulish",sans-serif`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('F',0,1);ctx.restore();}
