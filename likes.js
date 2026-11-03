/* likes.js — "What she loves": a portrait of the small things Fabeha loves, in three scenes right after the
   montage "The little things" (spring, 28 Aug 12:00). Painted cards, about one a bar: one object or place each,
   one line set large, his narration underneath. Her chat lines are kept in the data but not shown (he remembers these himself)
   _chat.txt with their spelling (line numbers beside each card). Everything else is said without quotation marks.

   Sources (_chat.txt line numbers):
     sweets 20903–20904 (27 Apr) · stew first / raan second 46410–46414 (30 Aug) · "Apka is more pulao" 18611–18612 (15 Apr)
     bun kabab 34164, "Wah Bunny had a bun kabab" 34166 (13 Jul) · "I ordered kfc 🤣" 39656 (5 Aug) · donuts 41465 (9 Aug)
     crumble on the first date 7334 (7 Feb) · mango milkshake 31201 · peach iced tea 33703 · olives 25588–25604 (19 May)
     sugar → fruit, dates 6405–6406 (30 Jan) · dish soap 2144 (23 Jan) + his own note "Dishwasher se allergy" (photos/call23.jpg)
     colours 2698 (25 Jan) · bangles, rings 8517 · gym at 6:30 563, "Gym jana hai so no sona 😜" 5443 · concerts 4281 (27 Jan)
     "Malam jabba was soo funn" 1015 · sudoku 5067, badminton 5086, scrabble 5087–5088 · chess "AP IN PERSON SIKHA DENA" 5009, 5053
     rabbit 48616–48619 (5 Sep) · Mirzapur 2211–2213 · From 4036–4064 · Bridgerton 5713 · "Ive watched too many murder mysteries" 5852
     Black–Scholes 2484, 28891 · crops 24076 · epidemiology 25226 · orphan kids 2278–2279 (and his note "support of orphen kids")
     paper flowers 41909–41913 · keychains, "The purple one" 47014–47015 · bracelet + necklace 7419 · "the best gift" 20744 (26 Apr)
     respect 39079 (3 Aug) · "Actions se lol / Batein har koi karleta hai🤣" 48220–48221 (3 Sep) · "hajj wala fazul" 32527, 32530 (4 Jul)
     "Okay my hype queen 😂" 35566 (23 Jul) · "I dont like waffles" 37108 · "Meri zidd hai yeh" 27413 (13 Jun) · crowds 5389
   Found in the chat beyond his list (her favourite things, in her words):
     perfume that is soft, close, never loud — 34648, 34652 (15 Jul)
     books, alongside Netflix — 5208, 5211 (30 Jan)
     weddings she loves: the simple ones — 5777 (30 Jan)
     talking to him while he was in Makkah and Madina — 23543 (14 May)
     of all the keychains, the purple one — 47015 (31 Aug)
   From Fazul's own notes (no chat line): she recognises people by their scent, so he built a collection of perfumes
     to smell and rate together (his photograph, photos/scents.jpg); the perfume she gave him, its box and its bag are kept with the crumble box.
*/
'use strict';

/* a photograph of his, loaded once and painted when it is ready (a dark panel until then) */
const LK_IMG={};
function lkImg(name){let im=LK_IMG[name];if(!im){im=new Image();im.src='photos/'+name;LK_IMG[name]=im;}return im;}
function lkPhoto(ctx,im,x,y,w,h,r){
  ctx.save();ctx.shadowColor='rgba(0,0,0,.6)';ctx.shadowBlur=36;ctx.shadowOffsetY=12;ctx.fillStyle='#0a0a0e';rrect(ctx,x,y,w,h,r);ctx.fill();
  ctx.shadowColor='rgba(0,0,0,0)';ctx.shadowBlur=0;ctx.shadowOffsetY=0;
  if(im.complete&&im.naturalWidth){ctx.save();rrect(ctx,x,y,w,h,r);ctx.clip();ctx.drawImage(im,x,y,w,h);ctx.restore();}
  ctx.strokeStyle='rgba(255,255,255,.14)';ctx.lineWidth=1.5;rrect(ctx,x+0.5,y+0.5,w-1,h-1,r);ctx.stroke();
  ctx.restore();
}
if(typeof Image!=='undefined')lkImg('scents.jpg');

/* ================================================================== the card frame ============ */
const LKF={eye:'700 12px "Mulish",sans-serif',small:'italic 500 29px "Cormorant Garamond",serif',bub:'500 19px "Mulish",sans-serif',cap:'600 11px "Mulish",sans-serif'};
function lkSoft(g,x,y,rx,ry,col,a){if(!(rx>0&&ry>0))return;g.save();g.translate(x,y);g.scale(1,ry/rx);const gr=g.createRadialGradient(0,0,0,0,0,rx);gr.addColorStop(0,hexA(col,a));gr.addColorStop(1,hexA(col,0));g.fillStyle=gr;g.fillRect(-rx,-rx,rx*2,rx*2);g.restore();}
function lkBlots(g,seed,n,cols,y0,y1,rmin,rmax,a){const r=rng(seed);for(let i=0;i<n;i++){const R=rmin+r()*(rmax-rmin);lkSoft(g,r()*W,lerp(y0,y1,r()),R,R*(0.5+r()*0.4),cols[i%cols.length],a*(0.4+r()*0.6));}}
function lkScrim(g,side,a){if(!(a>0))return;const L=side==='L';g.fillStyle=hgrad(g,L?W:0,L?520:760,[[0,`rgba(18,10,14,${a})`],[0.6,`rgba(18,10,14,${(a*0.85).toFixed(3)})`],[1,'rgba(18,10,14,0)']]);g.fillRect(0,0,W,H);}
function lkVignette(g,a=0.42){const v=g.createRadialGradient(640,360,300,640,360,820);v.addColorStop(0,'rgba(12,6,10,0)');v.addColorStop(1,`rgba(12,6,10,${a})`);g.fillStyle=v;g.fillRect(0,0,W,H);}
function lkOX(c){return c.ox??(c.side==='L'?380:900);}
/* the still part of a card is painted once, the first time it is needed, and only the last three are kept */
function lkStatic(A,cards,k){
  let im=A.cache.get(k);if(im){A.cache.delete(k);A.cache.set(k,im);return im;}
  const c=cards[k],b=mk(W,H),bg=b.getContext('2d');c.bg(bg,c);
  im=mk(W,H);const g=im.getContext('2d');g.drawImage(b,0,0);if(c.blur!==0)g.drawImage(softened(b,c.blur||3),0,0);
  if(c.obj){g.save();g.translate(0,c.dy||0);c.obj(g,c);g.restore();}
  lkScrim(g,c.side,c.scrim??0.46);lkVignette(g,c.vig??0.42);
  A.cache.set(k,im);while(A.cache.size>3)A.cache.delete(A.cache.keys().next().value);
  return im;
}
function lkIndex(cards,lt){let k=0;for(let i=0;i<cards.length;i++)if(lt>=cards[i].t0)k=i;return k;}
function lkPaint(ctx,lt,A,cards,k,alpha){
  const c=cards[k],dt=lt-c.t0,u=clamp(dt/c.dur,0,1.3),z=1+0.032*u,fx=lkOX(c),fy=c.oy??400;
  ctx.save();ctx.globalAlpha=alpha;ctx.translate(fx,fy);ctx.scale(z,z);ctx.translate(-fx,-fy);
  ctx.drawImage(lkStatic(A,cards,k),0,0);
  if(c.live){ctx.save();ctx.translate(0,c.ldy||0);c.live(ctx,lt,dt,c);ctx.restore();}
  ctx.restore();
}
function lkBubble(ctx,b,x,y,show){
  const mine=b.q.who==='me';
  ctx.save();ctx.globalAlpha*=show;ctx.translate(0,(1-show)*10);
  ctx.shadowColor='rgba(0,0,0,.35)';ctx.shadowBlur=18;ctx.shadowOffsetY=6;
  ctx.fillStyle=mine?'#1f7a63':'#fbf7ef';rrect(ctx,x,y,b.bw,b.bh,16);ctx.fill();
  ctx.beginPath();if(mine){ctx.moveTo(x+b.bw-18,y);ctx.lineTo(x+b.bw+8,y);ctx.lineTo(x+b.bw-4,y+14);}else{ctx.moveTo(x+18,y);ctx.lineTo(x-8,y);ctx.lineTo(x+4,y+14);}ctx.closePath();ctx.fill();
  ctx.shadowColor='rgba(0,0,0,0)';ctx.shadowBlur=0;ctx.shadowOffsetY=0;
  ctx.font=LKF.bub;ctx.fillStyle=mine?'#f3fff9':'#231c20';ctx.textAlign='left';b.lines.forEach((s,k)=>ctx.fillText(s,x+16,y+27+k*25));
  ctx.font=LKF.cap;ctx.fillStyle=mine?'rgba(243,255,249,.62)':'rgba(35,28,32,.45)';ctx.fillText((mine?'Fazul':'Fabeha')+(b.q.tag?' · '+b.q.tag:''),x+16,y+b.bh-11);
  ctx.restore();
}
function lkText(ctx,c,dt){
  const dur=c.dur,a=smooth(0.1,0.55,dt)*(1-smooth(dur-0.55,dur-0.15,dt));if(a<=0.002)return;
  const L=c.side==='L',x0=c.tx??(L?712:96),maxW=c.tw??470,bs=c.bs||58,blh=Math.round(bs*1.06);
  ctx.save();ctx.textAlign='left';ctx.textBaseline='alphabetic';
  ctx.font=`italic 500 ${bs}px "Cormorant Garamond",serif`;const big=wrapText(ctx,c.line,maxW);
  ctx.font=LKF.small;const sm=c.small?wrapText(ctx,c.small,maxW):[];
  ctx.font=LKF.bub;const bubs=[].map(q=>{const lines=wrapText(ctx,q.text,maxW-44);let bw=0;for(const s of lines)bw=Math.max(bw,ctx.measureText(s).width);ctx.font=LKF.cap;const cw=ctx.measureText('Fabeha · '+(q.tag||'')).width;ctx.font=LKF.bub;return{q,lines,bw:Math.max(bw,cw)+32,bh:lines.length*25+40};});
  let total=34+big.length*blh;if(sm.length)total+=10+sm.length*36;if(bubs.length)total+=20+bubs.reduce((s,b)=>s+b.bh+12,0)-12;
  let y=clamp((c.ty??340)-total/2,58,600-total);
  const ink=c.ink==='dark',INK=ink?{eye:'#9a4a26',rule:'rgba(154,74,38,.6)',big:'#34201a',small:'#7a4628',sh:'rgba(255,248,236,.0)'}:{eye:'#f4cf8e',rule:'rgba(244,207,142,.6)',big:'#fff4e3',small:'#f7d9a8',sh:'rgba(25,12,8,.7)'};
  if(!ink)lkSoft(ctx,x0+maxW*0.4,y+total*0.5,maxW*0.8,total*0.62+70,'#140a10',0.42*a);
  ctx.globalAlpha=a;ctx.font=LKF.eye;setLS(ctx,'4px');ctx.fillStyle=INK.eye;ctx.shadowColor=ink?'rgba(0,0,0,0)':'rgba(0,0,0,.55)';ctx.shadowBlur=8;ctx.fillText(c.eye.toUpperCase(),x0+2,y+12);setLS(ctx,'0px');
  ctx.shadowBlur=0;ctx.fillStyle=INK.rule;ctx.fillRect(x0+2,y+22,38,1.5);y+=34;
  const e=easeOut(clamp((dt-0.15)/0.9));ctx.globalAlpha=a*smooth(0.15,0.75,dt);
  ctx.font=`italic 500 ${bs}px "Cormorant Garamond",serif`;ctx.fillStyle=INK.big;ctx.shadowColor=INK.sh;ctx.shadowBlur=ink?0:20;
  big.forEach((s,k)=>ctx.fillText(s,x0,y+bs*0.8+k*blh+(1-e)*16));y+=big.length*blh;
  if(sm.length){y+=10;ctx.globalAlpha=a*smooth(0.5,1.05,dt);ctx.font=LKF.small;ctx.fillStyle=INK.small;ctx.shadowBlur=ink?0:14;sm.forEach((s,k)=>ctx.fillText(s,x0+2,y+26+k*36));y+=sm.length*36;}
  ctx.shadowColor='rgba(0,0,0,0)';ctx.shadowBlur=0;ctx.globalAlpha=a;
  if(bubs.length){y+=20;const q0=c.qa??0.85;bubs.forEach((b,i)=>{const show=smooth(q0+i*0.5,q0+0.3+i*0.5,dt);if(show>0)lkBubble(ctx,b,b.q.who==='me'?x0+maxW-b.bw:x0+10,y,show);y+=b.bh+12;});}
  ctx.restore();
}
function lkDraw(ctx,lt,A,cards){
  const k=lkIndex(cards,lt),c=cards[k],dt=lt-c.t0,X=0.75;
  if(k>0&&dt<X)lkPaint(ctx,lt,A,cards,k-1,1);
  lkPaint(ctx,lt,A,cards,k,k>0?smooth(0,X,dt):1);
  lkText(ctx,c,dt);
  if(dt>1.4&&k+1<cards.length&&!A.cache.has(k+1))lkStatic(A,cards,k+1);   /* paint the next card early, mid-hold, not at the cut */
}
/* likesScene({id,name,when,cards:[{d(bars),side,eye,line,small,q,n,bg,obj,live,amb}],score,note,tag}) */
function likesScene(def){
  const cards=def.cards;let acc=0;
  for(const c of cards){c.t0=acc*BAR;c.dur=c.d*BAR;acc+=c.d;}
  const subs=[];
  for(const c of cards){const ns=Array.isArray(c.n)?c.n:[c.n],tot=ns.reduce((a,x)=>a+x.length+14,0);let t=c.t0+0.3;ns.forEach(x=>{const d=(c.dur-0.5)*(x.length+14)/tot;subs.push([+t.toFixed(2),+(t+d-0.2).toFixed(2),x,'n']);t+=d;});}   /* a card's lines share its time by length */
  return scene({id:def.id,name:def.name,when:def.when,bars:acc,fin:def.fin||['#000000',1.0],fout:def.fout||['#000000',1.0],note:def.note,tag:def.tag,
    prep(){const A={cache:new Map()};if(typeof document!=='undefined'&&document.fonts&&document.fonts.load){Promise.all([['italic 500 40px "Cormorant Garamond"','Quant Black'],['400 40px "Great Vibes"','Happy Birthday Fabeha'],['400 40px "Noto Nastaliq Urdu"','مٹھائی زمزم'],['700 30px "Mulish"','FABEH 10'],['600 14px "Mulish"','123456789']].map(([f,t])=>document.fonts.load(f,t))).then(()=>A.cache.clear()).catch(()=>{});}lkStatic(A,cards,0);return A;},
    draw(ctx,lt,A){lkDraw(ctx,lt,A,cards);},
    subs,
    score(o){def.score(o);cards.forEach((c,i)=>{if(i>0)o.hit(c.t0+0.05,'chime',{midi:[83,86,88,91,88,86][i%6],vel:0.16});});},
    amb(lt){const c=cards[lkIndex(cards,lt)];return Object.assign({room:0.16},c.amb||{});},
  });
}

/* ================================================================== painting kit ============ */
function lkRoom(g,o){
  const ty=o.ty??470,r=rng(o.seed||7);
  g.fillStyle=vgrad(g,0,ty,[[0,o.wall[0]],[1,o.wall[1]]]);g.fillRect(0,0,W,ty+2);
  lkBlots(g,(o.seed||7)+1,24,[o.wall[0],'#ffffff',o.wall[1]],-40,ty,70,220,0.16);
  if(o.lamp)lkSoft(g,o.lamp[0],o.lamp[1],o.lamp[2],o.lamp[2]*0.8,o.light||'#ffd9a0',0.55);
  if(o.win){const w=o.win,fr=o.frame||'#5a3b2a';
    lkSoft(g,w.x+w.w/2,w.y+w.h/2,w.w*1.25,w.h*1.05,o.light||'#fff0cc',0.55);
    g.fillStyle=fr;rrect(g,w.x-12,w.y-12,w.w+24,w.h+24,6);g.fill();
    g.fillStyle=vgrad(g,w.y,w.y+w.h,[[0,(w.sky||['#fff8e6'])[0]],[1,(w.sky||['#fff8e6','#ffe0ac'])[1]||'#ffe0ac']]);g.fillRect(w.x,w.y,w.w,w.h);
    if(w.paint)w.paint(g,w);
    lkSoft(g,w.x+w.w*0.5,w.y+w.h*0.5,w.w*0.6,w.h*0.5,'#ffffff',0.35);
    g.fillStyle=fr;g.fillRect(w.x+w.w/2-4,w.y,8,w.h);g.fillRect(w.x,w.y+w.h*0.48-4,w.w,8);
    g.save();g.globalCompositeOperation='screen';const dx=o.rayDx??240;
    for(let k=0;k<3;k++){const x=w.x+w.w*(0.1+k*0.3);g.fillStyle=hexA(o.light||'#fff0cc',0.07+0.03*k);g.beginPath();g.moveTo(x,w.y+w.h);g.lineTo(x+w.w*0.24,w.y+w.h);g.lineTo(x+w.w*0.24+dx,ty+60);g.lineTo(x+dx-50,ty+60);g.closePath();g.fill();}
    g.restore();}
  g.fillStyle=vgrad(g,ty,H,[[0,o.top[0]],[1,o.top[1]]]);g.fillRect(0,ty,W,H-ty);
  g.fillStyle='rgba(255,255,255,.13)';g.fillRect(0,ty,W,2.5);g.fillStyle='rgba(0,0,0,.18)';g.fillRect(0,ty+2.5,W,3);
  if(o.grain!==false){g.strokeStyle=hexA(o.grainCol||'#24130a',0.13);g.lineWidth=1.2;for(let i=0;i<46;i++){const y=ty+6+Math.pow(r(),1.4)*(H-ty),amp=2+(y-ty)/60;g.beginPath();g.moveTo(-10,y);for(let x=0;x<=W+40;x+=60)g.lineTo(x,y+Math.sin(x*0.005+i*1.7)*amp);g.stroke();}}
  if(o.pool)lkSoft(g,o.pool[0],o.pool[1],o.pool[2],o.pool[2]*0.3,o.light||'#fff0cc',0.32);
}
function lkShadow(g,x,y,rx,ry,a=0.45){lkSoft(g,x,y,rx,ry,'#1c0e08',a);}
function lkTwinkle(ctx,lt,pts,col,s){ctx.save();ctx.globalCompositeOperation='screen';for(const[x,y,p]of pts){const a=Math.max(0,Math.sin(lt*2.2+p*7));if(a<0.05)continue;const R=s*(0.6+a);ctx.fillStyle=hexA(col,0.9*a);ctx.beginPath();ctx.moveTo(x,y-R*2.2);ctx.lineTo(x+R*0.35,y-R*0.35);ctx.lineTo(x+R*2.2,y);ctx.lineTo(x+R*0.35,y+R*0.35);ctx.lineTo(x,y+R*2.2);ctx.lineTo(x-R*0.35,y+R*0.35);ctx.lineTo(x-R*2.2,y);ctx.lineTo(x-R*0.35,y-R*0.35);ctx.closePath();ctx.fill();lkSoft(ctx,x,y,R*4,R*4,col,0.35*a);}ctx.restore();}
function lkSteam(ctx,lt,x,y,n,spread,h,a){ctx.save();ctx.globalCompositeOperation='screen';for(let i=0;i<n;i++){const p=(lt*0.22+i/n)%1,xx=x+(i/(n-1||1)-0.5)*spread+Math.sin(p*5+i*1.3)*16*p,yy=y-p*h,R=14+p*30;lkSoft(ctx,xx,yy,R,R*1.3,'#ffffff',a*Math.sin(p*Math.PI));}ctx.restore();}
function lkBowl(g,x,y,rx,ry,dep,col,inner,rim){
  lkShadow(g,x+rx*0.12,y+dep*0.95,rx*1.05,ry*0.8,0.4);
  g.fillStyle=mixHex(col,'#000000',0.35);ell(g,x,y+dep*0.82,rx*0.42,ry*0.32);g.fill();
  g.fillStyle=hgrad(g,x-rx,x+rx,[[0,mixHex(col,'#000000',0.3)],[0.3,mixHex(col,'#ffffff',0.22)],[0.55,col],[1,mixHex(col,'#000000',0.5)]]);
  g.beginPath();g.moveTo(x-rx,y);g.bezierCurveTo(x-rx*0.96,y+dep*1.15,x+rx*0.96,y+dep*1.15,x+rx,y);g.ellipse(x,y,rx,ry,0,0,Math.PI,false);g.closePath();g.fill();
  g.fillStyle=vgrad(g,y-ry,y+ry,[[0,mixHex(inner,'#000000',0.35)],[1,inner]]);ell(g,x,y,rx,ry);g.fill();
  g.strokeStyle=rim||mixHex(col,'#ffffff',0.35);g.lineWidth=Math.max(2,rx*0.03);ell(g,x,y,rx,ry);g.stroke();
}
function lkGlass(g,x,by,w,h,o){
  const tw=w,bw=w*0.86,top=by-h,lvl=by-h*(o.level??0.85);
  const path=(y0)=>{g.beginPath();g.moveTo(x-tw/2,top);g.lineTo(x-bw/2,by);g.lineTo(x+bw/2,by);g.lineTo(x+tw/2,top);g.closePath();};
  lkShadow(g,x+w*0.25,by+4,w*0.9,w*0.16,0.4);
  if(o.cast)lkSoft(g,x+w*0.6,by+8,w*0.8,w*0.14,o.cast,0.35);
  g.save();path();g.clip();
  g.fillStyle=vgrad(g,lvl,by,[[0,o.liq[0]],[1,o.liq[1]]]);g.fillRect(x-tw,lvl,tw*2,by-lvl);
  if(o.inside)o.inside(g,lvl);
  g.fillStyle=hgrad(g,x-tw/2,x+tw/2,[[0,'rgba(255,255,255,.28)'],[0.18,'rgba(255,255,255,.05)'],[0.75,'rgba(0,0,0,.06)'],[1,'rgba(0,0,0,.18)']]);g.fillRect(x-tw,top,tw*2,h);
  g.restore();
  const lw=lerp(tw,bw,(lvl-top)/h);g.fillStyle=o.surf||mixHex(o.liq[0],'#ffffff',0.25);ell(g,x,lvl,lw/2,lw*0.09);g.fill();
  g.strokeStyle='rgba(255,255,255,.55)';g.lineWidth=2;path();g.stroke();
  g.strokeStyle='rgba(255,255,255,.7)';ell(g,x,top,tw/2,tw*0.09);g.stroke();
  g.fillStyle='rgba(255,255,255,.55)';rrect(g,x-tw/2+7,top+12,5,h*0.7,3);g.fill();g.fillStyle='rgba(255,255,255,.25)';rrect(g,x+tw/2-14,top+18,3,h*0.5,2);g.fill();
  g.fillStyle='rgba(255,255,255,.35)';ell(g,x,by,bw/2,bw*0.07);g.fill();
}
function lkLeaf(g,x,y,l,w,rot,col){g.save();g.translate(x,y);g.rotate(rot);g.fillStyle=col;g.beginPath();g.moveTo(0,0);g.quadraticCurveTo(l*0.5,-w,l,0);g.quadraticCurveTo(l*0.5,w,0,0);g.fill();g.strokeStyle='rgba(255,255,255,.25)';g.lineWidth=1;g.beginPath();g.moveTo(1,0);g.lineTo(l*0.9,0);g.stroke();g.restore();}
function lkLemon(g,x,y,s,rot){g.save();g.translate(x,y);g.rotate(rot);g.fillStyle='#e8c22a';g.beginPath();g.arc(0,0,22*s,Math.PI,0);g.closePath();g.fill();g.fillStyle='#f7e47a';g.beginPath();g.arc(0,-1,18*s,Math.PI,0);g.closePath();g.fill();g.strokeStyle='rgba(255,255,255,.7)';g.lineWidth=1.2;for(let k=1;k<6;k++){const a=Math.PI+k/6*Math.PI;g.beginPath();g.moveTo(0,-1);g.lineTo(Math.cos(a)*17*s,Math.sin(a)*17*s-1);g.stroke();}g.restore();}
function lkOnion(g,x,y,r){g.strokeStyle='#c98bb0';g.lineWidth=3;ell(g,x,y,r,r*0.42);g.stroke();g.strokeStyle='rgba(250,235,245,.85)';g.lineWidth=1.5;ell(g,x,y,r*0.72,r*0.3);g.stroke();}
function lkCoin(g,x,y,r,face,sym,tilt){
  g.save();g.translate(x,y);g.scale(1,tilt??0.42);
  g.fillStyle=mixHex(face,'#000000',0.45);circle(g,0,r*0.22,r);g.fill();
  const gr=g.createLinearGradient(-r,-r,r,r);gr.addColorStop(0,mixHex(face,'#ffffff',0.45));gr.addColorStop(0.5,face);gr.addColorStop(1,mixHex(face,'#000000',0.3));g.fillStyle=gr;circle(g,0,0,r);g.fill();
  g.strokeStyle=mixHex(face,'#ffffff',0.3);g.lineWidth=r*0.08;circle(g,0,0,r*0.82);g.stroke();
  g.fillStyle=mixHex(face,'#000000',0.35);g.font=`700 ${r*0.9}px "Mulish",sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillText(sym,0,r*0.05);g.textBaseline='alphabetic';
  g.restore();
}
/* his forearm and hand, coming up from the bottom of the frame */
function lkArm(g,x0,y0,x1,y1,w,sleeve){g.lineCap='round';if(sleeve){g.strokeStyle=sleeve;g.lineWidth=w*1.35;g.beginPath();g.moveTo(x0,y0+60);g.lineTo(lerp(x0,x1,0.45),lerp(y0,y1,0.45));g.stroke();}
  g.strokeStyle=HIS.skin;g.lineWidth=w;g.beginPath();g.moveTo(lerp(x0,x1,sleeve?0.4:0),lerp(y0,y1,sleeve?0.4:0));g.lineTo(x1,y1);g.stroke();g.strokeStyle='rgba(120,70,45,.25)';g.lineWidth=w*0.3;g.beginPath();g.moveTo(lerp(x0,x1,0.5)+w*0.25,lerp(y0,y1,0.5));g.lineTo(x1+w*0.25,y1);g.stroke();}

/* ================================================================== I · sweet things ============ */
function lkPethaPiece(g,cx,by,w,h,d,col,r){
  const x=cx-w/2,y=by-h;
  g.fillStyle=mixHex(col,'#ffffff',0.5);g.beginPath();g.moveTo(x+1,y+2);g.lineTo(x+w-1,y+2);g.lineTo(x+w-7,y-d);g.lineTo(x+7,y-d);g.closePath();g.fill();
  g.fillStyle=vgrad(g,y,by,[[0,mixHex(col,'#ffffff',0.15)],[0.55,col],[1,mixHex(col,'#7c8a5a',0.4)]]);rrect(g,x,y,w,h,6);g.fill();
  lkSoft(g,cx-w*0.08,y+h*0.45,w*0.4,h*0.3,'#ffffff',0.45);
  g.fillStyle='rgba(255,255,255,.25)';g.beginPath();g.moveTo(x+w-7,y-d);g.lineTo(x+w-1,y+2);g.lineTo(x+w-1,by-4);g.lineTo(x+w-6,by-8);g.closePath();g.fill();
  g.strokeStyle='rgba(255,255,255,.85)';g.lineWidth=1.6;g.beginPath();g.moveTo(x+5,y+1.5);g.lineTo(x+w-5,y+1.5);g.stroke();
  g.fillStyle='rgba(255,255,255,.95)';for(let i=0;i<18;i++){const sx=x+5+r()*(w-10),sy=y-d+2+r()*(d+h-6),s=0.8+r()*1.6;g.fillRect(sx,sy,s,s);}
}
function lkPetha(g,c){
  const x=lkOX(c),y=505,r=rng(201);
  lkShadow(g,x+40,y+40,320,70,0.5);
  g.fillStyle='#6e4416';ell(g,x,y+12,262,84);g.fill();
  g.fillStyle=hgrad(g,x-260,x+260,[[0,'#8c5c1e'],[0.22,'#f6d98e'],[0.45,'#cf9d44'],[0.7,'#fbe6a8'],[1,'#86561a']]);ell(g,x,y,260,80);g.fill();
  g.fillStyle=vgrad(g,y-62,y+62,[[0,'#a8782c'],[1,'#efcd7c']]);ell(g,x,y+2,214,62);g.fill();
  g.fillStyle='rgba(255,243,200,.85)';for(let k=0;k<64;k++){const a=k/64*TAU;circle(g,x+Math.cos(a)*238,y+Math.sin(a)*71,2.1);g.fill();}
  g.fillStyle='rgba(255,252,244,.94)';for(let k=0;k<44;k++){const a=k/44*TAU;circle(g,x+Math.cos(a)*176,y+4+Math.sin(a)*50,10);g.fill();}ell(g,x,y+4,176,50);g.fill();
  g.fillStyle='rgba(200,178,150,.45)';for(let k=0;k<44;k++){const a=(k+0.5)/44*TAU;circle(g,x+Math.cos(a)*158,y+4+Math.sin(a)*44,2.4);g.fill();}
  const cols=['#eef1dc','#e2edca','#f3ead0','#e6efd2'];
  const P=[[-102,-12,62],[-36,-16,62],[30,-16,62],[96,-12,62],[-70,26,66],[0,24,68],[70,26,66],[-44,-34,60],[22,-36,60],[-10,-72,58],[150,44,56]];
  P.forEach(([dx,dy,w],i)=>lkPethaPiece(g,x+dx,y+dy,w,w*0.6,w*0.32,cols[i%4],r));
  lkSoft(g,x-60,y-80,200,80,'#fff6dc',0.25);
}
function lkBarfi(g,x,y,s,col){const w=40*s,h=14*s,d=26*s;g.fillStyle=mixHex(col,'#000000',0.12);rrect(g,x-w/2,y-h,w,h,3*s);g.fill();g.fillStyle=col;g.beginPath();g.moveTo(x-w/2,y-h);g.lineTo(x+w/2,y-h);g.lineTo(x+w/2-5*s,y-h-d*0.55);g.lineTo(x-w/2+5*s,y-h-d*0.55);g.closePath();g.fill();
  g.fillStyle='rgba(232,238,244,.9)';g.beginPath();g.moveTo(x-w*0.38,y-h-2);g.lineTo(x+w*0.3,y-h-3);g.lineTo(x+w*0.22,y-h-d*0.48);g.lineTo(x-w*0.3,y-h-d*0.45);g.closePath();g.fill();
  g.fillStyle='rgba(255,255,255,.9)';g.fillRect(x-w*0.1,y-h-d*0.35,w*0.18,1.2);g.fillStyle='#6c9a3a';for(let k=0;k<3;k++){ell(g,x-w*0.2+k*w*0.2,y-h-d*0.25+(k%2)*3,3.6*s,1.4*s,0.5*k);g.fill();}}
function lkJamun(g,x,y,R){lkSoft(g,x,y+R*0.6,R*1.3,R*0.45,'#c0661c',0.6);const gr=g.createRadialGradient(x-R*0.35,y-R*0.4,R*0.1,x,y,R);gr.addColorStop(0,'#c9703c');gr.addColorStop(0.45,'#8e3a18');gr.addColorStop(1,'#3e140a');g.fillStyle=gr;circle(g,x,y,R);g.fill();g.fillStyle='rgba(255,255,255,.75)';ell(g,x-R*0.38,y-R*0.45,R*0.26,R*0.13,-0.6);g.fill();g.fillStyle='rgba(255,210,150,.35)';ell(g,x+R*0.3,y+R*0.35,R*0.35,R*0.12,-0.4);g.fill();}
function lkChamCham(g,x,y,s,col,r){g.save();g.translate(x,y);g.rotate(-0.25);const gr=g.createLinearGradient(0,-15*s,0,15*s);gr.addColorStop(0,mixHex(col,'#ffffff',0.35));gr.addColorStop(1,mixHex(col,'#8a3a4a',0.25));g.fillStyle=gr;ell(g,0,0,30*s,15*s);g.fill();g.fillStyle='#fff7e4';ell(g,0,-1,20*s,3.2*s);g.fill();g.fillStyle='rgba(255,255,255,.9)';for(let k=0;k<26;k++){const a=r()*TAU,rr=Math.sqrt(r());g.fillRect(Math.cos(a)*27*s*rr,Math.sin(a)*12*s*rr,1.6,1.6);}g.restore();}
function lkMithaiBox(g,c){
  const x=lkOX(c),r=rng(211);
  /* the lid, leaning behind */
  g.save();g.translate(x+10,318);g.rotate(-0.04);
  g.fillStyle='rgba(30,10,14,.35)';rrect(g,-196,-110,400,236,14);g.fill();
  g.fillStyle=vgrad(g,-118,118,[[0,'#d8587a'],[1,'#a83456']]);rrect(g,-200,-118,400,236,14);g.fill();
  g.strokeStyle='#e8c46a';g.lineWidth=5;rrect(g,-184,-102,368,204,10);g.stroke();g.lineWidth=1.5;rrect(g,-174,-92,348,184,8);g.stroke();
  g.fillStyle='#f3d27e';for(let k=0;k<4;k++){const px=k<2?-160:160,py=k%2?-76:76;for(let j=0;j<6;j++){const a=j/6*TAU;ell(g,px+Math.cos(a)*9,py+Math.sin(a)*9,6,3,a);g.fill();}}
  g.font='400 64px "Noto Nastaliq Urdu",serif';g.textAlign='center';g.fillStyle='#f6dc94';g.shadowColor='rgba(80,10,30,.5)';g.shadowBlur=6;g.fillText('مٹھائی',0,30);g.shadowBlur=0;
  g.restore();
  /* the open box */
  const BL=[x-176,432],BR=[x+176,432],FL=[x-212,520],FR=[x+212,520],P=(u,v)=>[lerp(lerp(BL[0],BR[0],u),lerp(FL[0],FR[0],u),v),lerp(lerp(BL[1],BR[1],u),lerp(FL[1],FR[1],u),v)];
  lkShadow(g,x+40,598,280,46,0.5);
  g.fillStyle='#f6ead4';g.beginPath();g.moveTo(...BL);g.lineTo(...BR);g.lineTo(...FR);g.lineTo(...FL);g.closePath();g.fill();
  g.fillStyle='rgba(120,70,40,.18)';g.beginPath();g.moveTo(...BL);g.lineTo(...BR);g.lineTo(BR[0]+4,BR[1]+16);g.lineTo(BL[0]-4,BL[1]+16);g.closePath();g.fill();
  g.strokeStyle='rgba(150,110,70,.35)';g.lineWidth=2;for(const u of[1/3,2/3]){const a=P(u,0),b=P(u,1);g.beginPath();g.moveTo(...a);g.lineTo(...b);g.stroke();}
  for(const v of[0.36,0.82]){
    const s=lerp(0.86,1.05,v);
    for(const du of[-0.07,0.07]){const[bx,by]=P(1/6+du,v);lkBarfi(g,bx,by+8*s,s*1.05,(du<0)===(v<0.5)?'#efe0bf':'#d6dfae');}
    for(const du of[-0.075,0.075]){const[jx,jy]=P(0.5+du,v);lkJamun(g,jx,jy-6*s,19*s);}
    for(const du of[-0.07,0.07]){const[cx,cy]=P(5/6+du,v);lkChamCham(g,cx,cy-2*s,s*0.95,du<0?'#f2a2b6':'#f4d47c',r);}
  }
  g.fillStyle=vgrad(g,520,588,[[0,'#e2658a'],[1,'#a83456']]);g.beginPath();g.moveTo(...FL);g.lineTo(...FR);g.lineTo(FR[0]-6,588);g.lineTo(FL[0]+6,588);g.closePath();g.fill();
  g.fillStyle='#e8c46a';g.fillRect(FL[0]+8,532,FR[0]-FL[0]-16,4);g.fillRect(FL[0]+10,572,FR[0]-FL[0]-20,3);
  g.fillStyle='rgba(255,255,255,.25)';g.fillRect(FL[0],519,FR[0]-FL[0],3);
}
function lkStewRaan(g,c){
  const x=lkOX(c),r=rng(221);
  /* the raan on its platter, behind */
  const px=x+70,py=405;
  lkShadow(g,px+30,py+30,250,50,0.45);
  g.fillStyle='#e9e4da';ell(g,px,py+6,232,64);g.fill();g.fillStyle='#fbf8f2';ell(g,px,py,232,62);g.fill();g.strokeStyle='#2f5d8a';g.lineWidth=3;ell(g,px,py,218,56);g.stroke();g.fillStyle='#efe9dd';ell(g,px,py+4,190,44);g.fill();
  for(let k=0;k<9;k++){const a=k/9*TAU;lkOnion(g,px+Math.cos(a)*150,py+Math.sin(a)*34+4,16);}
  g.save();g.translate(px-10,py-14);g.rotate(-0.1);
  g.strokeStyle='#ece2cc';g.lineWidth=18;g.lineCap='round';g.beginPath();g.moveTo(110,-8);g.lineTo(178,-30);g.stroke();g.fillStyle='#f4ecd8';circle(g,184,-34,13);g.fill();circle(g,174,-40,9);g.fill();
  const gr=g.createRadialGradient(-50,-30,10,0,0,160);gr.addColorStop(0,'#d48444');gr.addColorStop(0.5,'#8e4018');gr.addColorStop(1,'#46190a');g.fillStyle=gr;
  g.beginPath();g.moveTo(-150,0);g.bezierCurveTo(-150,-62,40,-70,120,-16);g.bezierCurveTo(132,-6,130,10,116,14);g.bezierCurveTo(40,58,-150,56,-150,0);g.closePath();g.fill();
  g.strokeStyle='rgba(40,12,4,.55)';g.lineWidth=3;for(let k=0;k<7;k++){const xx=-110+k*30;g.beginPath();g.moveTo(xx,-30+((k*7)%10));g.lineTo(xx+18,10+((k*5)%8));g.stroke();}
  g.strokeStyle='rgba(255,220,170,.45)';g.lineWidth=4;g.beginPath();g.moveTo(-120,-24);g.quadraticCurveTo(-30,-58,70,-34);g.stroke();
  g.fillStyle='rgba(255,255,255,.6)';for(let k=0;k<9;k++){ell(g,-100+k*22,-34+Math.sin(k)*8,4,1.6,-0.3);g.fill();}
  g.restore();
  lkLemon(g,px-170,py+18,1,0.2);lkLemon(g,px+150,py+24,0.9,-0.3);
  g.strokeStyle='#3f7a2a';g.lineWidth=5;g.lineCap='round';g.beginPath();g.moveTo(px-120,py+38);g.quadraticCurveTo(px-60,py+50,px-10,py+36);g.stroke();
  for(let k=0;k<6;k++)lkLeaf(g,px+60+k*14,py+36+(k%2)*6,16,6,-0.5+k*0.3,'#3e8a3a');
  /* the stew, in a clay bowl, in front */
  const bx=x-120,by=505;
  lkBowl(g,bx,by,150,44,96,'#a4552c','#6a2c10','#c97a4a');
  g.save();ell(g,bx,by+2,138,38);g.clip();
  g.fillStyle=vgrad(g,by-40,by+40,[[0,'#6e3212'],[1,'#a65a26']]);g.fillRect(bx-150,by-50,300,100);
  for(let i=0;i<14;i++){g.fillStyle=`rgba(255,${150+((i*37)%60)},60,.35)`;ell(g,bx-120+r()*240,by-28+r()*56,4+r()*9,2+r()*3);g.fill();}
  const chunk=(cx,cy,w,h,col,hi)=>{g.fillStyle=col;rrect(g,cx-w/2,cy-h/2,w,h,h*0.45);g.fill();g.fillStyle=hi;ell(g,cx-w*0.15,cy-h*0.22,w*0.28,h*0.18);g.fill();};
  [[-80,-8,'#5a2a12'],[30,-18,'#5e2c14'],[90,4,'#57270f'],[-20,16,'#61301a']].forEach(([dx,dy,col])=>chunk(bx+dx,by+dy,40,24,col,'rgba(255,190,140,.35)'));
  [[-40,-20],[60,18],[-100,14]].forEach(([dx,dy])=>chunk(bx+dx,by+dy,34,24,'#e3c08a','rgba(255,255,255,.5)'));
  [[0,-4],[110,-12],[-60,24]].forEach(([dx,dy])=>{g.fillStyle='#e0782a';ell(g,bx+dx,by+dy,13,6);g.fill();g.strokeStyle='#f6a660';g.lineWidth=1.2;ell(g,bx+dx,by+dy,7,3);g.stroke();});
  for(let k=0;k<16;k++)lkLeaf(g,bx-110+r()*220,by-26+r()*50,9,4,r()*TAU,k%2?'#3f8a3a':'#5aa04a');
  g.fillStyle='#2a1a10';for(let k=0;k<30;k++){g.fillRect(bx-120+r()*240,by-30+r()*60,1.6,1.6);}
  g.restore();
  g.strokeStyle='rgba(255,220,180,.5)';g.lineWidth=3;g.beginPath();g.ellipse(bx,by,150,44,0,0.15,Math.PI-0.15);g.stroke();
}
function lkBiryani(g,c){
  const x=lkOX(c),y=452,r=rng(231);
  lkShadow(g,x+40,y+170,280,50,0.55);
  /* the deg */
  g.fillStyle=hgrad(g,x-212,x+212,[[0,'#5a2a12'],[0.2,'#b8642e'],[0.38,'#f4b47c'],[0.55,'#c06a34'],[0.85,'#7a3818'],[1,'#4a200c']]);
  g.beginPath();g.moveTo(x-196,y);g.bezierCurveTo(x-226,y+70,x-214,y+160,x-150,y+200);g.lineTo(x+150,y+200);g.bezierCurveTo(x+214,y+160,x+226,y+70,x+196,y);g.closePath();g.fill();
  g.strokeStyle='rgba(255,220,180,.18)';g.lineWidth=2;for(let k=1;k<4;k++){g.beginPath();g.ellipse(x,y+k*42,200+k*4,40,0,0.1,Math.PI-0.1);g.stroke();}
  lkSoft(g,x-90,y+80,60,90,'#ffe0b8',0.25);
  g.fillStyle='#5a2a12';ell(g,x,y,198,50);g.fill();
  /* rice dome */
  const top=x0=>y-92*(1-Math.pow(x0/176,2));
  g.save();ell(g,x,y+2,186,44);g.clip();g.fillStyle='#e9d2a0';g.fillRect(x-200,y-60,400,120);g.restore();
  g.fillStyle=vgrad(g,y-96,y+30,[[0,'#fbf1d8'],[1,'#ead39f']]);
  g.beginPath();g.moveTo(x-180,y+6);for(let k=-176;k<=176;k+=8)g.lineTo(x+k,top(k));g.lineTo(x+180,y+6);g.ellipse(x,y+6,180,40,0,0,Math.PI,false);g.closePath();g.fill();
  const GC=['#fdf8ea','#fdf8ea','#fdf8ea','#f6eed6','#f2c43a','#f0b432','#e8822a','#e06a1c'];
  for(let i=0;i<1300;i++){const px=(r()*2-1)*172,yt=top(px),yb=y+6+38*Math.sqrt(Math.max(0,1-Math.pow(px/180,2))),py=lerp(yt+2,yb-2,Math.pow(r(),0.8));
    g.fillStyle=GC[(r()*GC.length)|0];ell(g,x+px,py,3.4,1.2,r()*Math.PI);g.fill();}
  for(let i=0;i<70;i++){const px=(r()*2-1)*150,yy=lerp(top(px)+6,y+20,r());g.strokeStyle=i%2?'#7a3a14':'#9a521e';g.lineWidth=2;g.beginPath();g.moveTo(x+px,yy);g.quadraticCurveTo(x+px+6,yy-5,x+px+11,yy+1);g.stroke();}
  const piece=(dx,dy,w,h,col)=>{const gr=g.createRadialGradient(x+dx-w*0.2,y+dy-h*0.3,2,x+dx,y+dy,w);gr.addColorStop(0,mixHex(col,'#ffffff',0.35));gr.addColorStop(1,mixHex(col,'#000000',0.25));g.fillStyle=gr;ell(g,x+dx,y+dy,w,h,0.2);g.fill();};
  piece(-70,-30,30,20,'#7a3a1c');piece(54,-46,32,21,'#83401e');piece(110,-6,26,18,'#743618');piece(-10,-64,24,16,'#7a3a1c');
  piece(-118,-4,24,18,'#e3b04a');piece(16,-14,26,19,'#e8b850');
  g.fillStyle='#4a1626';for(const[dx,dy]of[[-30,-40],[80,-24],[-140,8]]){circle(g,x+dx,y+dy,7);g.fill();}
  for(let k=0;k<14;k++)lkLeaf(g,x-150+r()*300,lerp(top(0)+16,y+16,r()),14,6,r()*TAU,k%3?'#3e8a4a':'#5aa85a');
  g.strokeStyle='#3f8a2a';g.lineWidth=5;g.beginPath();g.moveTo(x+40,y-58);g.quadraticCurveTo(x+80,y-70,x+108,y-48);g.stroke();
  /* rim and a ladle */
  g.strokeStyle='#e9a46c';g.lineWidth=9;ell(g,x,y+4,198,48);g.stroke();g.strokeStyle='rgba(255,240,220,.6)';g.lineWidth=2;g.beginPath();g.ellipse(x,y+4,198,48,0,Math.PI*1.1,Math.PI*1.6);g.stroke();
  g.strokeStyle='#c9ccd2';g.lineWidth=10;g.lineCap='round';g.beginPath();g.moveTo(x+150,y-20);g.lineTo(x+250,y-150);g.stroke();g.strokeStyle='rgba(255,255,255,.7)';g.lineWidth=3;g.beginPath();g.moveTo(x+150,y-26);g.lineTo(x+246,y-152);g.stroke();
}
/* ajrak — the block-printed cloth of Sindh, under the street food */
function lkAjrak(g,y0){
  g.fillStyle=vgrad(g,y0,H,[[0,'#6a1820'],[1,'#3a0c12']]);g.fillRect(0,y0,W,H-y0);
  let y=y0+8,row=0;
  while(y<H+30){const s=lerp(0.42,1.3,(y-y0)/(H-y0)),sp=58*s;
    if(row%4===0){g.fillStyle='rgba(26,34,80,.9)';g.fillRect(0,y-sp*0.2,W,sp*0.4);g.fillStyle='rgba(240,230,215,.7)';for(let x=(row*11)%17;x<W;x+=sp*0.45){circle(g,x,y,2.1*s);g.fill();}g.fillStyle='rgba(10,8,12,.6)';g.fillRect(0,y-sp*0.2,W,1.5*s);g.fillRect(0,y+sp*0.2-1.5*s,W,1.5*s);}
    else for(let x=(row%2)*sp/2-sp;x<W+sp;x+=sp){g.fillStyle='rgba(26,34,80,.92)';for(let k=0;k<8;k++){const a=k/8*TAU;ell(g,x+Math.cos(a)*7*s,y+Math.sin(a)*4.5*s,4.5*s,2.4*s,a);g.fill();}g.fillStyle='rgba(245,236,220,.85)';circle(g,x,y,2.6*s);g.fill();g.fillStyle='rgba(12,8,12,.7)';for(let k=0;k<4;k++){const a=k/4*TAU+0.4;circle(g,x+Math.cos(a)*14*s,y+Math.sin(a)*8*s,1.4*s);g.fill();}}
    y+=sp*0.6;row++;}
  lkSoft(g,420,y0+120,520,170,'#ffcf8a',0.18);
}
function lkSpread(g,c){
  const r=rng(241);
  /* haleem */
  {const bx=190,by=438;lkBowl(g,bx,by,88,26,52,'#f1ece2','#7a4a22','#2f5d8a');g.save();ell(g,bx,by+1,80,22);g.clip();g.fillStyle=vgrad(g,by-22,by+22,[[0,'#6e4218'],[1,'#9a6430']]);g.fillRect(bx-90,by-30,180,60);g.strokeStyle='rgba(60,30,10,.4)';g.lineWidth=2;for(let k=0;k<4;k++){g.beginPath();g.ellipse(bx,by,70-k*15,18-k*4,0,0.3,5.6);g.stroke();}
    for(let k=0;k<40;k++){g.strokeStyle=k%2?'#4a2008':'#7a3a12';g.lineWidth=1.6;const xx=bx-60+r()*120,yy=by-14+r()*28;g.beginPath();g.moveTo(xx,yy);g.quadraticCurveTo(xx+4,yy-4,xx+8,yy);g.stroke();}
    g.strokeStyle='#f4dc8a';g.lineWidth=1.5;for(let k=0;k<12;k++){const xx=bx-40+r()*80,yy=by-10+r()*20;g.beginPath();g.moveTo(xx,yy);g.lineTo(xx+10,yy-3);g.stroke();}
    g.fillStyle='#4f9a3a';for(let k=0;k<6;k++){circle(g,bx-30+r()*60,by-8+r()*16,3);g.fill();}g.restore();lkLemon(g,bx+64,by-4,0.7,-0.4);}
  /* handi */
  {const hx=380,hy=420;lkShadow(g,hx+20,hy+64,110,22,0.45);
    const gr=g.createRadialGradient(hx-30,hy+10,10,hx,hy+30,100);gr.addColorStop(0,'#c06a3a');gr.addColorStop(0.6,'#8a3a1a');gr.addColorStop(1,'#4a1a0a');g.fillStyle=gr;ell(g,hx,hy+30,98,46);g.fill();
    g.fillStyle='#6a2a10';ell(g,hx,hy,74,20);g.fill();g.strokeStyle='#b8643a';g.lineWidth=7;ell(g,hx,hy,74,20);g.stroke();
    g.save();ell(g,hx,hy+1,66,16);g.clip();g.fillStyle=vgrad(g,hy-16,hy+16,[[0,'#8e1e10'],[1,'#c8441e']]);g.fillRect(hx-80,hy-20,160,40);g.fillStyle='rgba(255,170,60,.45)';for(let k=0;k<8;k++){ell(g,hx-50+r()*100,hy-10+r()*20,5,2);g.fill();}for(let k=0;k<8;k++)lkLeaf(g,hx-50+r()*100,hy-10+r()*20,9,4,r()*TAU,'#3f8a3a');g.restore();
    g.strokeStyle='#3f8a2a';g.lineWidth=4;g.beginPath();g.moveTo(hx-20,hy-2);g.quadraticCurveTo(hx+10,hy-12,hx+36,hy);g.stroke();}
  /* the striped bucket */
  {const kx=590,ky=470;lkShadow(g,kx+20,ky+6,90,20,0.45);
    g.save();g.beginPath();g.moveTo(kx-62,ky-120);g.lineTo(kx-48,ky);g.lineTo(kx+48,ky);g.lineTo(kx+62,ky-120);g.closePath();g.clip();
    for(let k=-6;k<7;k++){g.fillStyle=k%2?'#f4f0ea':'#c41e2a';g.beginPath();g.moveTo(kx+k*18-9,ky-130);g.lineTo(kx+k*15-7.5,ky+4);g.lineTo(kx+k*15+7.5,ky+4);g.lineTo(kx+k*18+9,ky-130);g.closePath();g.fill();}
    g.fillStyle=hgrad(g,kx-62,kx+62,[[0,'rgba(0,0,0,.25)'],[0.4,'rgba(255,255,255,.12)'],[1,'rgba(0,0,0,.3)']]);g.fillRect(kx-70,ky-130,140,140);g.restore();
    const lump=(lx,ly,s)=>{const gg=g.createRadialGradient(lx-8*s,ly-8*s,2,lx,ly,26*s);gg.addColorStop(0,'#f2c06a');gg.addColorStop(1,'#a8601e');g.fillStyle=gg;ell(g,lx,ly,26*s,20*s,r());g.fill();g.fillStyle='rgba(120,60,10,.5)';for(let k=0;k<10;k++){circle(g,lx+(r()-0.5)*36*s,ly+(r()-0.5)*26*s,1.8*s);g.fill();}};
    lump(kx-30,ky-128,1);lump(kx+24,ky-134,1.1);lump(kx-4,ky-150,0.95);g.fillStyle='#f4e8d0';rrect(g,kx+30,ky-176,10,34,5);g.fill();circle(g,kx+35,ky-178,7);g.fill();
    g.fillStyle='#f4f0ea';ell(g,kx,ky-120,62,10);g.fill();g.save();ell(g,kx,ky-120,62,10);g.clip();lump(kx-30,ky-122,1);lump(kx+24,ky-126,1.1);g.restore();}
  /* croissant */
  {const cx=505,cy=490;lkShadow(g,cx+10,cy+18,70,14,0.4);for(let k=-3;k<=3;k++){const s=1-Math.abs(k)*0.16,gr=g.createLinearGradient(0,cy-26*s,0,cy+16*s);gr.addColorStop(0,'#f6c878');gr.addColorStop(1,'#a8601c');g.fillStyle=gr;ell(g,cx+k*17,cy-Math.abs(k)*3+Math.abs(k)*Math.abs(k)*2,17*s,24*s,k*0.28);g.fill();g.strokeStyle='rgba(110,50,10,.45)';g.lineWidth=1.4;g.beginPath();g.ellipse(cx+k*17,cy-Math.abs(k)*3+Math.abs(k)*Math.abs(k)*2,17*s,24*s,k*0.28,-1.2,1.2);g.stroke();}g.fillStyle='rgba(255,240,200,.45)';ell(g,cx-6,cy-16,24,6,-0.1);g.fill();}
  /* seekh kebabs */
  {const sx=180,sy=560;lkShadow(g,sx+20,sy+22,150,26,0.45);g.fillStyle='#f6f2ea';ell(g,sx,sy,150,40);g.fill();g.strokeStyle='#2f5d8a';g.lineWidth=2.5;ell(g,sx,sy,138,34);g.stroke();
    for(let k=0;k<3;k++){g.save();g.translate(sx-10+k*8,sy-18+k*16);g.rotate(-0.12);const gr=g.createLinearGradient(0,-11,0,11);gr.addColorStop(0,'#b8642c');gr.addColorStop(0.5,'#7a3412');gr.addColorStop(1,'#4a1c08');g.fillStyle=gr;rrect(g,-100,-11,200,22,11);g.fill();g.strokeStyle='rgba(30,8,2,.6)';g.lineWidth=3;for(let j=0;j<8;j++){g.beginPath();g.moveTo(-84+j*24,-9);g.lineTo(-90+j*24,9);g.stroke();}g.fillStyle='rgba(255,210,160,.4)';rrect(g,-90,-8,180,4,2);g.fill();g.restore();}
    lkOnion(g,sx+110,sy+8,16);lkOnion(g,sx+96,sy+20,13);lkLemon(g,sx-118,sy+6,0.8,0.3);g.fillStyle='#4f9a3a';for(let k=0;k<5;k++)lkLeaf(g,sx+60+k*10,sy+26,12,5,-0.4+k*0.2,'#4f9a3a');}
  /* bun kabab */
  {const bx=380,by=578;lkShadow(g,bx+14,by+12,92,18,0.5);
    const layer=(y,w,h,col,col2)=>{g.fillStyle=vgrad(g,y-h,y+h,[[0,col],[1,col2]]);ell(g,bx,y,w,h);g.fill();};
    layer(by,74,18,'#e0a052','#a8601e');layer(by-14,78,12,'#c8341e','#7e1a10');
    g.fillStyle='#fbf3dc';g.beginPath();for(let k=0;k<=16;k++){const a=k/16*Math.PI;g.lineTo(bx+Math.cos(a)*84,by-26+Math.sin(a)*14+((k%2)*3));}g.lineTo(bx-84,by-30);g.closePath();g.fill();g.fillStyle='#f4c430';ell(g,bx+16,by-24,26,8);g.fill();
    layer(by-34,80,14,'#7a3a1a','#3e1808');lkOnion(g,bx-30,by-44,14);lkOnion(g,bx+30,by-46,12);
    g.fillStyle=vgrad(g,by-110,by-44,[[0,'#f2c27a'],[0.5,'#d98a3a'],[1,'#a8601c']]);g.beginPath();g.moveTo(bx-82,by-46);g.bezierCurveTo(bx-80,by-118,bx+80,by-118,bx+82,by-46);g.ellipse(bx,by-46,82,12,0,0,Math.PI,false);g.closePath();g.fill();
    g.fillStyle='rgba(255,240,210,.5)';ell(g,bx-26,by-90,30,10,-0.3);g.fill();g.fillStyle='#fbf2dc';for(let k=0;k<14;k++){ell(g,bx-56+r()*112,by-100+r()*40,2.4,1.2,r()*3);g.fill();}}
  /* halwa puri */
  {const hx=600,hy=585;lkShadow(g,hx+20,hy+12,130,22,0.45);
    const gr=g.createRadialGradient(hx-30,hy-14,8,hx,hy,100);gr.addColorStop(0,'#f6cf86');gr.addColorStop(0.7,'#d68e3a');gr.addColorStop(1,'#9a561c');g.fillStyle=gr;ell(g,hx,hy,104,36);g.fill();
    g.fillStyle='rgba(255,240,200,.5)';for(let k=0;k<9;k++){ell(g,hx-70+r()*140,hy-20+r()*36,8+r()*10,3+r()*3);g.fill();}g.fillStyle='rgba(120,50,10,.25)';for(let k=0;k<12;k++){circle(g,hx-80+r()*160,hy-24+r()*44,2+r()*2);g.fill();}
    lkBowl(g,hx-40,hy-52,40,12,28,'#f1ece2','#d97a1e','#2f5d8a');g.save();ell(g,hx-40,hy-52,36,10);g.clip();g.fillStyle='#ef8a22';g.fillRect(hx-80,hy-64,80,24);g.fillStyle='rgba(255,230,160,.7)';ell(g,hx-50,hy-55,10,3);g.fill();g.fillStyle='#f3e6c8';for(let k=0;k<4;k++){ell(g,hx-60+k*12,hy-51,4,2,0.4);g.fill();}g.restore();
    lkBowl(g,hx+46,hy-50,40,12,28,'#f1ece2','#b07a2a','#2f5d8a');g.save();ell(g,hx+46,hy-50,36,10);g.clip();g.fillStyle='#9a6a24';g.fillRect(hx,hy-62,90,24);g.fillStyle='#e0b45a';for(let k=0;k<14;k++){circle(g,hx+20+r()*52,hy-56+r()*12,3);g.fill();}g.restore();}
}
function lkCookieBox(g,c){
  const x=lkOX(c),r=rng(251);
  /* the lid, open behind */
  g.fillStyle=vgrad(g,250,430,[[0,'#f7b7c8'],[1,'#e690aa']]);g.beginPath();g.moveTo(x-150,430);g.lineTo(x-170,262);g.lineTo(x+190,262);g.lineTo(x+170,430);g.closePath();g.fill();
  g.strokeStyle='rgba(255,255,255,.6)';g.lineWidth=2;g.beginPath();g.moveTo(x-164,276);g.lineTo(x+184,276);g.stroke();
  g.fillStyle='rgba(255,255,255,.5)';for(let k=0;k<7;k++){heart(g,x-120+k*48,330+((k*17)%22),7+(k%3)*2);g.fill();}
  /* box */
  lkShadow(g,x+30,560,250,40,0.4);
  g.fillStyle='#fbe8ee';g.beginPath();g.moveTo(x-150,430);g.lineTo(x+170,430);g.lineTo(x+200,520);g.lineTo(x-180,520);g.closePath();g.fill();
  g.fillStyle='rgba(180,90,110,.18)';g.beginPath();g.moveTo(x-150,430);g.lineTo(x+170,430);g.lineTo(x+172,446);g.lineTo(x-152,446);g.closePath();g.fill();
  /* the cookie */
  const cx=x+10,cy=470;
  g.fillStyle='#9a5a26';ell(g,cx,cy+12,128,40);g.fill();
  const gr=g.createRadialGradient(cx-40,cy-16,10,cx,cy,130);gr.addColorStop(0,'#e8b46e');gr.addColorStop(0.7,'#c8843e');gr.addColorStop(1,'#9a5a22');g.fillStyle=gr;ell(g,cx,cy,126,38);g.fill();
  g.strokeStyle='rgba(120,60,20,.45)';g.lineWidth=1.6;for(let k=0;k<9;k++){const a=r()*TAU,rr=40+r()*70;g.beginPath();g.moveTo(cx+Math.cos(a)*rr,cy+Math.sin(a)*rr*0.3);g.quadraticCurveTo(cx+Math.cos(a+0.2)*(rr+16),cy+Math.sin(a+0.2)*(rr+16)*0.3,cx+Math.cos(a+0.1)*(rr+30),cy+Math.sin(a+0.1)*(rr+30)*0.3);g.stroke();}
  for(let k=0;k<16;k++){const a=r()*TAU,rr=Math.sqrt(r())*104,px=cx+Math.cos(a)*rr,py=cy+Math.sin(a)*rr*0.3;g.fillStyle='#3a1e10';g.beginPath();g.moveTo(px-7,py);g.lineTo(px-2,py-6);g.lineTo(px+7,py-2);g.lineTo(px+4,py+5);g.lineTo(px-5,py+4);g.closePath();g.fill();g.fillStyle='rgba(255,220,180,.35)';g.fillRect(px-3,py-4,4,1.5);}
  g.fillStyle='rgba(255,236,200,.35)';ell(g,cx-40,cy-14,50,10,-0.1);g.fill();
  g.fillStyle=vgrad(g,520,590,[[0,'#f7a9be'],[1,'#d97894']]);g.beginPath();g.moveTo(x-180,520);g.lineTo(x+200,520);g.lineTo(x+194,590);g.lineTo(x-174,590);g.closePath();g.fill();
  g.fillStyle='rgba(255,255,255,.35)';g.fillRect(x-180,519,380,3);
  /* donuts, on a little plate in front-left */
  const dx=x-300,dy=572;lkShadow(g,dx+20,dy+14,140,24,0.45);g.fillStyle='#f6f2ee';ell(g,dx,dy,150,36);g.fill();g.strokeStyle='#e7c2cc';g.lineWidth=3;ell(g,dx,dy,136,30);g.stroke();
  const donut=(ox,oy,glaze,drizzle)=>{g.fillStyle='#c8843e';ell(g,ox,oy+6,62,26);g.fill();const gr2=g.createRadialGradient(ox-20,oy-10,4,ox,oy,62);gr2.addColorStop(0,mixHex(glaze,'#ffffff',0.35));gr2.addColorStop(1,glaze);g.fillStyle=gr2;g.beginPath();for(let k=0;k<=40;k++){const a=k/40*TAU,w=1+0.05*Math.sin(k*2.3);g.lineTo(ox+Math.cos(a)*58*w,oy+Math.sin(a)*23*w);}g.closePath();g.fill();
    g.fillStyle='#7a4420';ell(g,ox,oy,16,6);g.fill();g.fillStyle='rgba(255,255,255,.55)';ell(g,ox-24,oy-10,16,4,-0.2);g.fill();
    if(drizzle){g.strokeStyle='rgba(255,250,240,.85)';g.lineWidth=2.2;g.beginPath();for(let k=0;k<9;k++){g.lineTo(ox-46+k*11,oy+((k%2)?10:-12));}g.stroke();}
    else{const C=['#ffffff','#7fd1ff','#ffd27a','#9be37a','#c58cff'];for(let k=0;k<30;k++){const a=r()*TAU,rr=26+r()*26;g.strokeStyle=C[k%5];g.lineWidth=2.4;const px=ox+Math.cos(a)*rr,py=oy+Math.sin(a)*rr*0.4;g.beginPath();g.moveTo(px,py);g.lineTo(px+Math.cos(a*3)*5,py+Math.sin(a*3)*2.5);g.stroke();}}};
  donut(dx-50,dy-8,'#f49ab8',false);donut(dx+58,dy-2,'#5a3220',true);
}
function lkDrinks(g,c){
  const x=lkOX(c),by=580,r=rng(261);
  lkGlass(g,x-150,by,96,140,{level:0.84,liq:['#fdfbf4','#e8e2d4'],surf:'#ffffff',cast:'#ffffff'});
  lkGlass(g,x-10,by,108,250,{level:0.86,liq:['#ffcf4a','#f39a1e'],surf:'#ffe7a8',cast:'#ffb43a',inside:(gg,lv)=>{gg.fillStyle='rgba(255,236,170,.9)';gg.fillRect(x-80,lv,160,22);gg.fillStyle='rgba(255,255,255,.25)';for(let k=0;k<20;k++){circle(gg,x-50+r()*80,lv+30+r()*150,1.5+r()*2);gg.fill();}}});
  g.save();g.translate(x+8,by-250);g.rotate(0.22);for(let k=0;k<12;k++){g.fillStyle=k%2?'#ffffff':'#f2b6c8';g.fillRect(-6,-120+k*14,12,14);}g.restore();
  g.save();g.translate(x-56,by-252);g.rotate(-0.4);const mg=g.createLinearGradient(0,-30,0,30);mg.addColorStop(0,'#ffcf4a');mg.addColorStop(1,'#f08a1a');g.fillStyle=mg;g.beginPath();g.ellipse(0,0,42,26,0,Math.PI*0.05,Math.PI*1.05);g.closePath();g.fill();g.strokeStyle='rgba(255,240,190,.8)';g.lineWidth=1.5;for(let k=-2;k<=2;k++){g.beginPath();g.moveTo(k*12-10,2);g.lineTo(k*12+6,20);g.stroke();g.beginPath();g.moveTo(k*12+10,2);g.lineTo(k*12-6,20);g.stroke();}g.fillStyle='#4f8a2a';g.fillRect(-42,-2,84,4);g.restore();
  const tx=x+130;
  lkGlass(g,tx,by,100,214,{level:0.9,liq:['#f7b064','#c8602a'],surf:'#f9c58a',cast:'#ff9a4a',inside:(gg,lv)=>{for(let k=0;k<4;k++){const ix=tx-28+(k%2)*30,iy=lv+14+k*26;gg.save();gg.translate(ix,iy);gg.rotate(0.3*k-0.4);gg.fillStyle='rgba(255,255,255,.28)';rrect(gg,-16,-14,32,28,5);gg.fill();gg.strokeStyle='rgba(255,255,255,.6)';gg.lineWidth=1.5;rrect(gg,-16,-14,32,28,5);gg.stroke();gg.restore();}}});
  g.save();g.translate(tx+40,by-214);g.rotate(0.35);g.fillStyle='#f6a46a';g.beginPath();g.arc(0,0,30,Math.PI*0.95,Math.PI*2.05);g.closePath();g.fill();g.fillStyle='#ffd7a8';g.beginPath();g.arc(0,2,24,Math.PI,Math.PI*2);g.closePath();g.fill();g.fillStyle='#e0603a';g.fillRect(-30,0,60,3);g.restore();
  for(let k=0;k<5;k++)lkLeaf(g,tx-30+k*6,by-222-k*5,18,7,-1.4+k*0.5,'#3f8a3a');
  g.fillStyle='rgba(255,255,255,.55)';for(let k=0;k<26;k++){const px=tx-44+r()*88,py=by-180+r()*170;ell(g,px,py,1.6,2.4);g.fill();}
}
function lkOlives(g,c){
  const x=lkOX(c),r=rng(271);
  /* a board */
  lkShadow(g,x+30,580,300,46,0.55);
  g.fillStyle=vgrad(g,470,600,[[0,'#d29a5e'],[1,'#9a6430']]);rrect(g,x-260,470,500,120,26);g.fill();g.fillStyle='#8a5428';rrect(g,x-260,582,500,14,8);g.fill();rrect(g,x+230,500,90,40,20);g.fill();
  g.strokeStyle='rgba(90,50,20,.25)';g.lineWidth=1.3;for(let k=0;k<12;k++){g.beginPath();g.moveTo(x-250,480+k*9);g.bezierCurveTo(x-100,476+k*9+((k*13)%7),x+60,486+k*9,x+236,480+k*9);g.stroke();}
  /* cucumber slices, fanned */
  for(let k=0;k<8;k++){const sx=x-200+k*30,sy=548-k*3;g.fillStyle='#2f5a22';ell(g,sx,sy+3,27,14);g.fill();g.fillStyle='#d9ebb4';ell(g,sx,sy,25,12);g.fill();g.fillStyle='#bcd88e';ell(g,sx,sy,15,7);g.fill();g.fillStyle='rgba(255,255,255,.75)';for(let j=0;j<6;j++){const a=j/6*TAU;ell(g,sx+Math.cos(a)*9,sy+Math.sin(a)*4.2,2.2,1.1,a);g.fill();}g.fillStyle='rgba(255,255,255,.4)';ell(g,sx-8,sy-5,8,2);g.fill();}
  /* a blue-pottery bowl of olives */
  const bx=x+80,by=478;lkBowl(g,bx,by,120,36,80,'#f4f1ea','#e9e3d6','#2a5a9a');
  g.save();g.fillStyle='#2a5a9a';for(let k=0;k<10;k++){const a=k/10*Math.PI;const px=bx+Math.cos(a)*112,py=by+Math.sin(a)*34+30;g.beginPath();for(let j=0;j<5;j++){const b=j/5*TAU;ell(g,px+Math.cos(b)*6,py+Math.sin(b)*4,4,2,b);g.fill();}}g.restore();
  g.save();ell(g,bx,by+2,112,32);g.clip();
  for(let i=0;i<34;i++){const a=r()*TAU,rr=Math.sqrt(r()),ox=bx+Math.cos(a)*100*rr,oy=by-14+Math.sin(a)*24*rr-(1-rr)*16,black=r()<0.35;const gr=g.createRadialGradient(ox-5,oy-5,1,ox,oy,16);gr.addColorStop(0,black?'#7a5a72':'#d4dc7a');gr.addColorStop(0.5,black?'#3a2232':'#8a9a2a');gr.addColorStop(1,black?'#160a12':'#4a5a14');g.fillStyle=gr;ell(g,ox,oy,15,11,r());g.fill();g.fillStyle='rgba(255,255,255,.7)';ell(g,ox-5,oy-4,3.5,1.6,-0.5);g.fill();}
  g.restore();
  for(const[ox,oy,b]of[[x-10,520,0],[x+16,532,1],[x+200,560,0]]){const gr=g.createRadialGradient(ox-5,oy-5,1,ox,oy,16);gr.addColorStop(0,b?'#7a5a72':'#d4dc7a');gr.addColorStop(1,b?'#160a12':'#4a5a14');g.fillStyle=gr;ell(g,ox,oy,15,11,0.3);g.fill();g.fillStyle='rgba(255,255,255,.7)';ell(g,ox-5,oy-4,3.5,1.6,-0.5);g.fill();}
  /* an olive sprig */
  g.strokeStyle='#6a5a3a';g.lineWidth=3;g.beginPath();g.moveTo(x-220,500);g.quadraticCurveTo(x-140,470,x-60,486);g.stroke();
  for(let k=0;k<9;k++){const t=k/8,px=lerp(x-210,x-70,t),py=497-Math.sin(t*Math.PI)*16;lkLeaf(g,px,py,34,7,(k%2?-0.7:0.6)-0.2,k%2?'#8fa88a':'#a8bca0');}
}
function lkBowlFront(g,x,y,rx,ry,dep,col,rim){
  g.fillStyle=hgrad(g,x-rx,x+rx,[[0,mixHex(col,'#000000',0.3)],[0.3,mixHex(col,'#ffffff',0.22)],[0.55,col],[1,mixHex(col,'#000000',0.5)]]);
  g.beginPath();g.moveTo(x-rx,y);g.bezierCurveTo(x-rx*0.96,y+dep*1.15,x+rx*0.96,y+dep*1.15,x+rx,y);g.ellipse(x,y,rx,ry,0,0,Math.PI,false);g.closePath();g.fill();
  g.strokeStyle=rim||mixHex(col,'#ffffff',0.35);g.lineWidth=Math.max(2,rx*0.03);g.beginPath();g.ellipse(x,y,rx,ry,0,0,Math.PI,false);g.stroke();
}
function lkDates(g,c){
  const x=lkOX(c),r=rng(281);
  const fruit=(fx,fy,R,cols,stem)=>{const gr=g.createRadialGradient(fx-R*0.35,fy-R*0.35,R*0.1,fx,fy,R);gr.addColorStop(0,cols[0]);gr.addColorStop(0.6,cols[1]);gr.addColorStop(1,cols[2]);g.fillStyle=gr;circle(g,fx,fy,R);g.fill();g.fillStyle='rgba(255,255,255,.45)';ell(g,fx-R*0.35,fy-R*0.4,R*0.28,R*0.14,-0.6);g.fill();if(stem){g.strokeStyle='#5a3a1a';g.lineWidth=3;g.beginPath();g.moveTo(fx,fy-R*0.85);g.quadraticCurveTo(fx+4,fy-R*1.2,fx+10,fy-R*1.3);g.stroke();lkLeaf(g,fx+6,fy-R*1.15,22,8,-0.3,'#4f9a3a');}};
  /* a wicker-coloured bowl; the fruit sits in it, the front wall goes over */
  const bx=x-60,by=470;
  lkBowl(g,bx,by,190,46,92,'#d9c2a0','#8a6a42','#efe0c4');
  for(let k=0;k<3;k++){g.save();g.translate(bx+40+k*10,by-26-k*8);g.rotate(-0.42+k*0.12);g.fillStyle=vgrad(g,-20,20,[[0,'#fbe27a'],[1,'#d8a822']]);g.beginPath();g.moveTo(-96,0);g.quadraticCurveTo(0,42,96,-10);g.quadraticCurveTo(0,18,-96,-14);g.closePath();g.fill();g.strokeStyle='#8a7a3a';g.lineWidth=4;g.lineCap='round';g.beginPath();g.moveTo(92,-12);g.lineTo(100,-15);g.stroke();g.restore();}
  fruit(bx-110,by-8,46,['#ffd27a','#f08a22','#b8501a'],false);
  fruit(bx+100,by-6,40,['#ffd27a','#f08a22','#b8501a'],false);
  fruit(bx-20,by-30,52,['#ff9a8a','#d4202a','#7a0a14'],true);
  for(let k=0;k<18;k++){const gx=bx+40+(k%5)*15+((k/5|0)%2)*7,gy=by-4+(k/5|0)*12;const gr=g.createRadialGradient(gx-3,gy-3,1,gx,gy,10);gr.addColorStop(0,'#b88ad0');gr.addColorStop(1,'#4a1e5a');g.fillStyle=gr;circle(g,gx,gy,10);g.fill();}
  lkBowlFront(g,bx,by,190,46,92,'#d9c2a0','#efe0c4');
  g.save();g.beginPath();g.ellipse(bx,by,190,46,0,0,Math.PI,false);g.bezierCurveTo(bx-182,by+106,bx+182,by+106,bx+190,by);g.closePath();g.clip();
  g.strokeStyle='rgba(120,90,60,.35)';g.lineWidth=2;for(let k=-9;k<=9;k++){g.beginPath();g.moveTo(bx+k*21,by+30);g.lineTo(bx+k*17,by+110);g.stroke();}for(let k=0;k<4;k++){g.beginPath();g.ellipse(bx,by+18+k*18,186-k*14,46,0,0.25,Math.PI-0.25);g.stroke();}g.restore();
  /* a brass dish of dates */
  const dx=x+190,dy=548;lkShadow(g,dx+20,dy+16,130,24,0.5);
  g.fillStyle=hgrad(g,dx-130,dx+130,[[0,'#8c5c1e'],[0.3,'#f2d080'],[0.6,'#c8963e'],[1,'#7a4e18']]);ell(g,dx,dy,130,36);g.fill();g.fillStyle=vgrad(g,dy-28,dy+28,[[0,'#b08032'],[1,'#e8c26e']]);ell(g,dx,dy+1,104,26);g.fill();
  for(let k=0;k<11;k++){const px=dx-70+(k%5)*34+((k/5|0)%2)*16,py=dy-4+(k/5|0)*-12+((k*7)%5);const gr=g.createLinearGradient(px,py-12,px,py+12);gr.addColorStop(0,'#a8501e');gr.addColorStop(0.5,'#5a1e0a');gr.addColorStop(1,'#2a0a04');g.fillStyle=gr;ell(g,px,py,22,11,0.15*(k%3-1));g.fill();g.strokeStyle='rgba(30,8,2,.5)';g.lineWidth=1;for(let j=0;j<3;j++){g.beginPath();g.moveTo(px-14+j*10,py-6);g.quadraticCurveTo(px-10+j*10,py,px-14+j*10,py+6);g.stroke();}g.fillStyle='rgba(255,220,180,.55)';ell(g,px-6,py-6,7,2,0.1);g.fill();}
}
function lkSink(g,c){
  const x=lkOX(c),r=rng(291);
  /* tiles and a dusk window above the sink */
  g.fillStyle=vgrad(g,0,470,[[0,'#cfdadc'],[1,'#a9b8bb']]);g.fillRect(0,0,W,470);
  g.strokeStyle='rgba(255,255,255,.55)';g.lineWidth=2;for(let yy=20;yy<470;yy+=46){g.beginPath();g.moveTo(0,yy);g.lineTo(W,yy);g.stroke();}for(let yy=20,row=0;yy<470;yy+=46,row++)for(let xx=(row%2)*31;xx<W;xx+=62){g.beginPath();g.moveTo(xx,yy);g.lineTo(xx,yy+46);g.stroke();}
  const wx=x-210,wy=40,ww=420,wh=230;
  g.fillStyle='#f4efe6';rrect(g,wx-16,wy-16,ww+32,wh+32,8);g.fill();
  g.fillStyle=vgrad(g,wy,wy+wh,[[0,'#5a4a8a'],[0.55,'#e9879a'],[1,'#ffc98a']]);g.fillRect(wx,wy,ww,wh);
  lkSoft(g,wx+ww*0.7,wy+wh*0.95,140,60,'#fff1c4',0.8);
  g.fillStyle='#2c2440';g.beginPath();g.moveTo(wx,wy+wh);for(let k=0;k<=20;k++){g.lineTo(wx+k*ww/20,wy+wh-30-((k*37)%40)-(k%3)*8);}g.lineTo(wx+ww,wy+wh);g.closePath();g.fill();
  g.fillStyle='#ffd98a';for(let k=0;k<14;k++){g.fillRect(wx+10+r()*(ww-20),wy+wh-26+r()*20,3,3);}
  g.fillStyle='#f4efe6';g.fillRect(wx+ww/2-5,wy,10,wh);g.fillRect(wx,wy+wh*0.5-5,ww,10);
  g.fillStyle='#e9e2d4';rrect(g,wx-40,wy+wh+16,ww+80,16,4);g.fill();
  /* a little pot of mint on the sill */
  g.fillStyle='#c0623a';g.beginPath();g.moveTo(wx+20,wy+wh+16);g.lineTo(wx+28,wy+wh-30);g.lineTo(wx+76,wy+wh-30);g.lineTo(wx+84,wy+wh+16);g.closePath();g.fill();for(let k=0;k<9;k++)lkLeaf(g,wx+52,wy+wh-30,30,10,-Math.PI/2+(k-4)*0.3,k%2?'#4f9a3a':'#3f8a2a');
  /* the counter and sink */
  g.fillStyle=vgrad(g,470,720,[[0,'#8a8f96'],[1,'#4a4e56']]);g.fillRect(0,470,W,250);
  g.fillStyle='rgba(255,255,255,.18)';g.fillRect(0,470,W,3);
  g.fillStyle='#c7ccd2';rrect(g,x-250,500,500,170,30);g.fill();g.fillStyle=vgrad(g,510,660,[[0,'#3a3f46'],[1,'#6a7078']]);rrect(g,x-232,512,464,150,24);g.fill();
  /* the tap */
  g.strokeStyle='#d9dde2';g.lineWidth=16;g.lineCap='round';g.beginPath();g.moveTo(x+150,500);g.lineTo(x+150,400);g.quadraticCurveTo(x+150,350,x+100,350);g.lineTo(x+70,360);g.stroke();g.strokeStyle='rgba(255,255,255,.8)';g.lineWidth=4;g.beginPath();g.moveTo(x+144,496);g.lineTo(x+144,402);g.quadraticCurveTo(x+144,358,x+100,356);g.stroke();
  /* the soap, with a red no on it */
  const sx=x+150,sy=wy+wh+16;g.save();g.translate(sx,sy);g.scale(0.72,0.72);g.translate(-sx,-sy);g.fillStyle=vgrad(g,sy-150,sy,[[0,'#7fd88a'],[1,'#2f9a4a']]);rrect(g,sx-34,sy-150,68,150,16);g.fill();g.fillStyle='#e9e9ee';rrect(g,sx-14,sy-182,28,34,6);g.fill();g.fillRect(sx-4,sy-196,30,8);
  g.fillStyle='rgba(255,255,255,.35)';rrect(g,sx-26,sy-140,8,120,4);g.fill();g.fillStyle='#fdfbf4';rrect(g,sx-26,sy-104,52,52,8);g.fill();
  g.strokeStyle='#d8283a';g.lineWidth=5;circle(g,sx,sy-78,18);g.stroke();g.beginPath();g.moveTo(sx-12,sy-90);g.lineTo(sx+12,sy-66);g.stroke();
  lkShadow(g,sx+20,sy+4,60,10,0.4);g.restore();
}
function lkSinkHands(ctx,lt,x){
  /* water from the tap, his hands with a plate under it, suds */
  const sway=Math.sin(lt*1.6)*6;
  ctx.save();ctx.globalCompositeOperation='screen';ctx.strokeStyle='rgba(200,230,255,.55)';ctx.lineWidth=7;ctx.beginPath();ctx.moveTo(x+70,364);ctx.lineTo(x+68+Math.sin(lt*9)*1.5,520);ctx.stroke();ctx.strokeStyle='rgba(255,255,255,.6)';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(x+68,364);ctx.lineTo(x+66+Math.sin(lt*11)*1.5,520);ctx.stroke();ctx.restore();
  ctx.save();ctx.translate(sway*0.5,Math.sin(lt*1.6+1)*3);
  lkArm(ctx,x-180,800,x-112,618,58,'#2e3a52');lkArm(ctx,x+260,800,x+194,606,58,'#2e3a52');
  for(const[hx,hy,s]of[[x-104,590,1],[x+186,578,-1]]){ctx.fillStyle=HIS.skin;ell(ctx,hx,hy,38,32,s*0.5);ctx.fill();ctx.fillStyle=HIS.skinSh;for(let k=0;k<3;k++){rrect(ctx,hx+s*(16+k*3)-12,hy-4+k*12,24,11,5.5);ctx.fill();}}
  ctx.save();ctx.translate(x+40,560);ctx.rotate(-0.12);
  ctx.fillStyle='#d9d6d0';ell(ctx,0,6,152,50);ctx.fill();ctx.fillStyle='#fbfaf7';ell(ctx,0,0,150,48);ctx.fill();ctx.strokeStyle='#cfd6de';ctx.lineWidth=3;ell(ctx,0,0,118,36);ctx.stroke();
  ctx.fillStyle='rgba(255,255,255,.92)';for(let k=0;k<24;k++){const a=k*2.4,rr=24+((k*37)%80);circle(ctx,Math.cos(a)*rr,Math.sin(a)*rr*0.3,4+((k*13)%8));ctx.fill();}
  ctx.fillStyle='rgba(200,225,255,.35)';ell(ctx,30,-4,40,10,0.1);ctx.fill();
  ctx.restore();
  for(const[hx,hy,s]of[[x-104,590,1],[x+186,578,-1]]){ctx.save();ctx.translate(hx+s*20,hy-30);ctx.rotate(s*1.05);ctx.fillStyle=HIS.skin;rrect(ctx,-9,-30,18,42,9);ctx.fill();ctx.fillStyle=HIS.nail;ell(ctx,0,-20,5.5,7);ctx.fill();ctx.restore();
    ctx.fillStyle='rgba(255,255,255,.9)';for(let k=0;k<7;k++){circle(ctx,hx+s*(-14+k*7),hy-22+((k*7)%26),3+(k%3)*2);ctx.fill();}}
  ctx.restore();
}

/* ================================================================== II · the things she loves ============ */
function lkSilk(g,pts,w,col){
  const[a,b,c2,d]=pts,path=()=>{g.beginPath();g.moveTo(a[0],a[1]);g.bezierCurveTo(b[0],b[1],c2[0],c2[1],d[0],d[1]);};
  g.save();g.lineCap='butt';g.lineJoin='round';
  g.shadowColor='rgba(10,0,10,.45)';g.shadowBlur=36;g.shadowOffsetY=16;g.strokeStyle=mixHex(col,'#000000',0.35);g.lineWidth=w;path();g.stroke();
  g.shadowColor='rgba(0,0,0,0)';g.shadowBlur=0;g.shadowOffsetY=0;
  g.strokeStyle=mixHex(col,'#000000',0.12);g.lineWidth=w*0.84;path();g.stroke();
  g.globalAlpha=0.55;g.strokeStyle=mixHex(col,'#ffffff',0.22);g.lineWidth=w*0.5;g.translate(-w*0.07,-w*0.09);path();g.stroke();
  g.globalAlpha=0.45;g.strokeStyle=mixHex(col,'#ffffff',0.55);g.lineWidth=w*0.13;g.translate(-w*0.06,-w*0.06);path();g.stroke();
  g.globalAlpha=0.25;g.strokeStyle=mixHex(col,'#000000',0.4);g.lineWidth=w*0.06;g.translate(w*0.3,w*0.34);path();g.stroke();
  g.restore();
}
function lkVanity(g,c){
  const x=lkOX(c),r=rng(301);
  lkSilk(g,[[-80,90],[240,40],[260,330],[700,250]],130,'#cf9a34');
  lkSilk(g,[[-80,250],[200,170],[300,440],[720,380]],140,'#5b2d84');
  lkSilk(g,[[-80,420],[180,340],[360,560],[760,500]],120,'#7a1f2e');
  lkSilk(g,[[-80,600],[220,520],[420,700],[800,640]],130,'#e3889f');
  lkSoft(g,x,440,360,180,'#ffe3b0',0.18);
  /* bangles, stacked */
  const bx=x-100,by=505;lkShadow(g,bx+16,by+26,110,24,0.55);
  const BC=['#cf9a34','#5b2d84','#e3889f','#cf9a34','#7a1f2e','#9a5cc8','#cf9a34','#e3889f','#7a1f2e','#cf9a34'];
  BC.forEach((col,k)=>{const yy=by-k*11;g.strokeStyle=mixHex(col,'#000000',0.35);g.lineWidth=9;ell(g,bx,yy+2,78,22);g.stroke();g.strokeStyle=col;g.lineWidth=7;ell(g,bx,yy,78,22);g.stroke();g.strokeStyle='rgba(255,255,255,.55)';g.lineWidth=2;g.beginPath();g.ellipse(bx,yy-2,78,22,0,Math.PI*1.05,Math.PI*1.6);g.stroke();if(col==='#cf9a34'){g.fillStyle='rgba(255,246,210,.9)';for(let j=0;j<10;j++){const a=r()*TAU;g.fillRect(bx+Math.cos(a)*78,yy+Math.sin(a)*22,2,2);}}});
  /* the ring dish */
  const rx=x+40,ry=572;lkShadow(g,rx+10,ry+12,80,16,0.5);g.fillStyle='#f3c6d2';ell(g,rx,ry,74,22);g.fill();g.fillStyle='#e9a9bb';ell(g,rx,ry+1,58,15);g.fill();
  for(const[ox,col]of[[-18,'#9a5cc8'],[22,'#d8283a']]){g.strokeStyle='#e8c46a';g.lineWidth=5;ell(g,rx+ox,ry-4,15,6);g.stroke();g.fillStyle=col;g.beginPath();g.moveTo(rx+ox,ry-20);g.lineTo(rx+ox+7,ry-12);g.lineTo(rx+ox,ry-6);g.lineTo(rx+ox-7,ry-12);g.closePath();g.fill();g.fillStyle='rgba(255,255,255,.8)';g.fillRect(rx+ox-2,ry-17,3,3);}
  /* a small, cute bag */
  const kx=x+150,ky=440;lkShadow(g,kx+14,ky+52,90,16,0.45);g.strokeStyle='#e8c46a';g.lineWidth=3;g.beginPath();g.moveTo(kx-50,ky-30);g.bezierCurveTo(kx-60,ky-140,kx+60,ky-140,kx+50,ky-30);g.stroke();
  g.fillStyle=vgrad(g,ky-40,ky+50,[[0,'#b07ad8'],[1,'#6a3a94']]);g.beginPath();g.moveTo(kx-72,ky-30);g.lineTo(kx+72,ky-30);g.quadraticCurveTo(kx+82,ky+50,kx+56,ky+50);g.lineTo(kx-56,ky+50);g.quadraticCurveTo(kx-82,ky+50,kx-72,ky-30);g.closePath();g.fill();
  g.fillStyle='#8a52b8';g.beginPath();g.moveTo(kx-74,ky-30);g.lineTo(kx+74,ky-30);g.lineTo(kx,ky+12);g.closePath();g.fill();g.fillStyle='#f0cf6a';circle(g,kx,ky+8,8);g.fill();g.fillStyle='rgba(255,255,255,.3)';ell(g,kx-36,ky+18,20,6,-0.3);g.fill();
  /* a little perfume */
  const px=x-250,py=560;lkShadow(g,px+16,py+6,60,12,0.5);
  g.fillStyle='rgba(255,190,210,.85)';g.beginPath();g.moveTo(px-40,py-20);g.quadraticCurveTo(px-44,py-96,px,py-100);g.quadraticCurveTo(px+44,py-96,px+40,py-20);g.quadraticCurveTo(px+38,py,px,py);g.quadraticCurveTo(px-38,py,px-40,py-20);g.closePath();g.fill();
  g.fillStyle='rgba(240,120,160,.55)';ell(g,px,py-30,34,26);g.fill();g.strokeStyle='rgba(255,255,255,.75)';g.lineWidth=2;g.beginPath();g.moveTo(px-40,py-20);g.quadraticCurveTo(px-44,py-96,px,py-100);g.quadraticCurveTo(px+44,py-96,px+40,py-20);g.stroke();
  g.fillStyle='#e8c46a';rrect(g,px-12,py-122,24,24,4);g.fill();g.fillStyle='#f6dc94';rrect(g,px-18,py-150,36,30,8);g.fill();g.fillStyle='rgba(255,255,255,.7)';rrect(g,px-30,py-84,7,56,4);g.fill();
}
function lkGym(g,c){
  const x=lkOX(c),r=rng(311);
  g.fillStyle=vgrad(g,0,500,[[0,'#2a2f3c'],[1,'#454b58']]);g.fillRect(0,0,W,500);
  const wx=620,wy=50,ww=560,wh=330;g.fillStyle=vgrad(g,wy,wy+wh,[[0,'#5a5a9a'],[0.5,'#e89a8a'],[1,'#ffd09a']]);g.fillRect(wx,wy,ww,wh);
  lkSoft(g,wx+ww*0.3,wy+wh-10,220,90,'#fff0c0',0.85);g.fillStyle='#2a2438';g.beginPath();g.moveTo(wx,wy+wh);for(let k=0;k<=14;k++)g.lineTo(wx+k*ww/14,wy+wh-40-((k*29)%50));g.lineTo(wx+ww,wy+wh);g.closePath();g.fill();
  g.fillStyle='#1e222c';for(let k=0;k<=4;k++)g.fillRect(wx+k*ww/4-5,wy,10,wh);g.fillRect(wx,wy-6,ww,12);g.fillRect(wx,wy+wh-6,ww,12);
  g.save();g.globalCompositeOperation='screen';for(let k=0;k<4;k++){g.fillStyle='rgba(255,210,160,.07)';g.beginPath();g.moveTo(wx+60+k*120,wy+wh);g.lineTo(wx+130+k*120,wy+wh);g.lineTo(wx-120+k*120,720);g.lineTo(wx-260+k*120,720);g.closePath();g.fill();}g.restore();
  /* a rack in the back */
  g.fillStyle='#14161c';g.fillRect(140,120,16,380);g.fillRect(420,120,16,380);g.fillRect(130,200,320,12);for(const[px,R]of[[150,70],[150,56],[430,70]]){g.fillStyle='#101216';circle(g,px,330,R);g.fill();g.strokeStyle='#2a2e38';g.lineWidth=4;circle(g,px,330,R*0.6);g.stroke();}
  /* clock: 6:30 */
  const cx=520,cy=110;g.fillStyle='#f4f1ea';circle(g,cx,cy,40);g.fill();g.strokeStyle='#1e222c';g.lineWidth=4;circle(g,cx,cy,40);g.stroke();for(let k=0;k<12;k++){const a=k/12*TAU;g.fillStyle='#1e222c';g.fillRect(cx+Math.cos(a)*32-1.5,cy+Math.sin(a)*32-1.5,3,3);}
  g.lineCap='round';g.lineWidth=4;g.beginPath();g.moveTo(cx,cy);g.lineTo(cx+Math.cos(Math.PI/2+0.26)*20,cy+Math.sin(Math.PI/2+0.26)*20);g.stroke();g.lineWidth=2.5;g.beginPath();g.moveTo(cx,cy);g.lineTo(cx,cy+30);g.stroke();
  /* the floor */
  g.fillStyle=vgrad(g,500,720,[[0,'#2a2b31'],[1,'#121317']]);g.fillRect(0,500,W,220);g.fillStyle='rgba(255,200,150,.07)';g.fillRect(0,500,W,2);
  g.strokeStyle='rgba(255,255,255,.04)';for(let k=0;k<10;k++){g.beginPath();g.moveTo(0,520+k*22);g.lineTo(W,520+k*22);g.stroke();}
}
function lkDumbbell(g,x,y,s,rot){
  g.save();g.translate(x,y);g.rotate(rot);g.scale(s,s);
  lkShadow(g,10,64,190,26,0.6);
  const hex=(cx,cy,R,face)=>{const pts=[];for(let k=0;k<6;k++){const a=k/6*TAU+Math.PI/6;pts.push([cx+Math.cos(a)*R*0.62,cy+Math.sin(a)*R]);}
    g.fillStyle='#0e0e12';g.beginPath();pts.forEach((p,i)=>i?g.lineTo(p[0]+(face?-34:34),p[1]):g.moveTo(p[0]+(face?-34:34),p[1]));g.closePath();g.fill();
    g.fillStyle='#16161c';for(let i=0;i<6;i++){const p=pts[i],q=pts[(i+1)%6],o=face?-34:34;g.beginPath();g.moveTo(...p);g.lineTo(...q);g.lineTo(q[0]+o,q[1]);g.lineTo(p[0]+o,p[1]);g.closePath();g.fillStyle=i===4?'#33343c':i===3||i===5?'#24252c':'#121216';g.fill();}
    g.fillStyle='#1c1c22';g.beginPath();pts.forEach((p,i)=>i?g.lineTo(...p):g.moveTo(...p));g.closePath();g.fill();g.strokeStyle='rgba(255,220,180,.28)';g.lineWidth=2;g.stroke();
    g.fillStyle='#c9ccd2';circle(g,cx,cy,R*0.22);g.fill();g.fillStyle='rgba(255,255,255,.25)';g.font='700 13px "Mulish",sans-serif';g.textAlign='center';g.fillText('10',cx,cy+R*0.62);};
  g.fillStyle=vgrad(g,-12,12,[[0,'#f2f4f8'],[0.5,'#9aa0aa'],[1,'#5a606a']]);g.fillRect(-110,-12,220,24);
  g.strokeStyle='rgba(40,40,50,.5)';g.lineWidth=1;for(let k=-90;k<90;k+=5){g.beginPath();g.moveTo(k,-11);g.lineTo(k+4,11);g.stroke();}
  hex(-150,0,64,true);hex(150,0,64,false);
  g.restore();
}
function lkGymProps(g,c){
  const x=lkOX(c);
  lkDumbbell(g,x+10,560,1,-0.05);
  /* her bottle and a towel */
  const bx=x-250,by=600;lkShadow(g,bx+16,by+4,46,10,0.5);g.fillStyle=vgrad(g,by-190,by,[[0,'#c58cff'],[1,'#7a3ab8']]);rrect(g,bx-30,by-170,60,170,18);g.fill();g.fillStyle='#2a2a32';rrect(g,bx-22,by-200,44,34,8);g.fill();g.fillStyle='rgba(255,255,255,.35)';rrect(g,bx-22,by-160,8,140,4);g.fill();g.fillStyle='rgba(255,255,255,.85)';g.font='700 13px "Mulish",sans-serif';g.textAlign='center';g.fillText('LEG DAY',bx,by-80);
  const tx=x+230,ty=620;lkShadow(g,tx,ty+12,100,14,0.4);g.fillStyle='#e9e2d6';rrect(g,tx-96,ty-26,192,40,10);g.fill();g.fillStyle='#d8cfc0';rrect(g,tx-96,ty-6,192,20,8);g.fill();g.fillStyle='#e3889f';g.fillRect(tx-96,ty-14,192,5);
}
function lkConcert(g,c){
  const r=rng(321);
  paintSky(g,[[0,'#07040f'],[0.6,'#1a0d2a'],[1,'#2a1230']]);
  lkSoft(g,640,520,900,260,'#ff4fa8',0.18);lkSoft(g,300,600,500,200,'#5a7aff',0.16);
  /* the crowd behind her, rows getting darker toward the back */
  for(let row=0;row<4;row++){const y=430+row*46,s=0.55+row*0.18,col=mixHex('#140a1e','#2a1838',row/4);
    for(let k=0;k<26;k++){const x=(k/25)*W+(r()-0.5)*40,h=y+(r()-0.5)*14;g.fillStyle=col;circle(g,x,h,20*s);g.fill();g.beginPath();g.ellipse(x,h+50*s,40*s,34*s,0,Math.PI,0);g.fill();g.fillRect(x-40*s,h+50*s,80*s,200);
      if(r()<0.3){g.strokeStyle=col;g.lineWidth=10*s;g.lineCap='round';g.beginPath();g.moveTo(x+24*s,h+30*s);g.lineTo(x+40*s,h-60*s);g.stroke();if(r()<0.6){g.fillStyle='#fff8e0';rrect(g,x+34*s,h-86*s,14*s,22*s,3);g.fill();lkSoft(g,x+41*s,h-75*s,30*s,30*s,'#fff2c8',0.6);}}}}
  lkSoft(g,640,380,700,120,'#c04aa8',0.12);
}
function lkConcertLive(ctx,lt,dt){
  /* beams sweeping, her in front, the barrier */
  ctx.save();ctx.globalCompositeOperation='screen';
  const B=[[200,'#ff5ab0',0],[520,'#7aa0ff',1.3],[900,'#ffd07a',2.1],[1140,'#a07aff',0.7]];
  for(const[bx,col,ph]of B){const a=Math.sin(lt*0.55+ph)*0.45,len=900;ctx.save();ctx.translate(bx,-40);ctx.rotate(a);const gr=ctx.createLinearGradient(0,0,0,len);gr.addColorStop(0,hexA(col,0.5));gr.addColorStop(1,hexA(col,0));ctx.fillStyle=gr;ctx.beginPath();ctx.moveTo(-8,0);ctx.lineTo(8,0);ctx.lineTo(120,len);ctx.lineTo(-120,len);ctx.closePath();ctx.fill();ctx.restore();}
  ctx.restore();
  const wave=dt>0.4;
  drawFabeha(ctx,370,322,1.02,{t:lt,outfit:'black',hair:'down',pose:'bust',arms:wave?'wave':'lap',smile:1,eyes:(lt%3.2)<1.4?'happy':undefined,look:0.15,blush:0.45,wind:0.15,tilt:Math.sin(lt*1.6)*0.04,len:220});
  ctx.save();ctx.globalCompositeOperation='screen';lkSoft(ctx,300,250,260,240,'#ff5ab0',0.22+0.08*Math.sin(lt*1.3));lkSoft(ctx,470,300,200,220,'#7aa0ff',0.18);ctx.restore();
  /* the barrier in front of her */
  ctx.fillStyle='#1a1a22';ctx.fillRect(0,556,W*0.62,18);ctx.fillRect(0,622,W*0.62,10);for(let k=0;k<9;k++){ctx.fillRect(20+k*90,556,8,140);}
  ctx.fillStyle='rgba(255,140,210,.55)';ctx.fillRect(0,556,W*0.62,2);ctx.fillStyle='rgba(140,170,255,.4)';ctx.fillRect(0,622,W*0.62,1.5);
  bokeh(ctx,lt,18,323,['#ff5ab0','#7aa0ff','#ffd07a'],6,22,0.35);
}
function lkBeach(g,c){
  const r=rng(331);
  paintSky(g,[[0,'#4a5a9a'],[0.3,'#b07aa0'],[0.48,'#f6a67e'],[0.54,'#ffd59a']]);
  for(let k=0;k<5;k++){const cy=80+k*44,cx=r()*W;g.fillStyle=`rgba(255,${190+k*10},${170+k*10},.28)`;ell(g,cx,cy,220+r()*200,10+r()*8);g.fill();}
  sunGlow(g,860,382,420,'rgba(255,214,150,0.75)');g.fillStyle='#fff3d4';circle(g,860,380,34);g.fill();
  g.fillStyle=vgrad(g,388,520,[[0,'#7c6a9a'],[1,'#3e5a80']]);g.fillRect(0,388,W,140);
  g.fillStyle=vgrad(g,510,720,[[0,'#d7b08a'],[0.25,'#e6c79c'],[1,'#c89a68']]);g.fillRect(0,510,W,210);
  g.fillStyle='rgba(120,100,140,.35)';g.fillRect(0,510,W,24);
  for(let i=0;i<30;i++){g.fillStyle='rgba(150,110,70,.18)';ell(g,r()*W,560+r()*150,20+r()*30,2+r()*3);g.fill();}
  /* her slippers and a towel */
  const fx=960,fy=585;for(const[dx,rot]of[[-34,-0.2],[30,0.15]]){g.save();g.translate(fx+dx,fy);g.rotate(rot);lkShadow(g,6,6,30,14,0.35);g.fillStyle='#e3889f';ell(g,0,0,22,40);g.fill();g.fillStyle='#f6c3d0';ell(g,0,-2,18,35);g.fill();g.strokeStyle='#5b2d84';g.lineWidth=5;g.beginPath();g.moveTo(-16,-10);g.quadraticCurveTo(0,-30,16,-10);g.stroke();g.restore();}
  g.save();g.translate(1130,560);g.rotate(-0.08);lkShadow(g,10,10,130,20,0.3);for(let k=0;k<6;k++){g.fillStyle=k%2?'#f4efe6':'#e3889f';g.fillRect(-120,-30+k*10,240,10);}g.restore();
  /* a shell */
  g.fillStyle='#f6e2d0';g.beginPath();g.moveTo(800,598);for(let k=0;k<=8;k++){const a=Math.PI+k/8*Math.PI;g.lineTo(820+Math.cos(a)*20,598+Math.sin(a)*16);}g.closePath();g.fill();g.strokeStyle='rgba(180,120,100,.6)';g.lineWidth=1;for(let k=1;k<8;k++){const a=Math.PI+k/8*Math.PI;g.beginPath();g.moveTo(820,598);g.lineTo(820+Math.cos(a)*19,598+Math.sin(a)*15);g.stroke();}
}
function lkBeachLive(ctx,lt){
  ctx.save();ctx.globalAlpha*=0.42;drawSea(ctx,lt,388,516,'#7c6a9a','#3e5a80','#fff2e0');ctx.restore();
  sunPath(ctx,lt,860,392,516,'#ffd9a0');
  const sw=Math.sin(lt*0.9)*12;ctx.fillStyle='rgba(255,250,240,.75)';ctx.beginPath();ctx.moveTo(0,516+sw);for(let x=0;x<=W;x+=40)ctx.lineTo(x,516+sw+Math.sin(x*0.02+lt*1.4)*4);ctx.lineTo(W,530+sw);for(let x=W;x>=0;x-=40)ctx.lineTo(x,526+sw+Math.sin(x*0.03+lt)*3);ctx.closePath();ctx.fill();
  ctx.fillStyle='rgba(140,120,160,.25)';ctx.fillRect(0,528+sw,W,18);
}
function lkIsb(g,c){
  const r=rng(341);
  paintSky(g,[[0,'#56677e'],[0.6,'#93a3b2'],[1,'#b8c4cc']]);
  for(let k=0;k<6;k++){g.fillStyle='rgba(230,236,240,.25)';ell(g,r()*W,60+r()*200,260+r()*200,30+r()*30);g.fill();}
  const ridge=(y0,amp,col,seed)=>{const f=ridge_(seed);g.fillStyle=col;g.beginPath();g.moveTo(0,H);for(let x=0;x<=W;x+=10)g.lineTo(x,y0-f(x)*amp);g.lineTo(W,H);g.closePath();g.fill();};
  const ridge_=seed=>{const rr=rng(seed),p=[rr()*TAU,rr()*TAU,rr()*TAU];return x=>0.6*Math.sin(x*0.004+p[0])+0.3*Math.sin(x*0.011+p[1])+0.15*Math.sin(x*0.03+p[2])+0.5;};
  ridge(250,90,'#8496a0',1);ridge(320,110,'#5d7a74',2);
  g.fillStyle='rgba(220,230,235,.4)';g.fillRect(0,300,W,60);
  ridge(390,90,'#3e6252',3);
  for(let i=0;i<220;i++){const x=r()*W,y=330+r()*120;g.fillStyle=i%2?'rgba(40,80,60,.6)':'rgba(70,110,80,.5)';circle(g,x,y,4+r()*7);g.fill();}
  /* Faisal Mosque, at the foot of the hills: the eight-sided tent of the hall and four pencil minarets */
  const mx=c.ox??380,my=470;
  g.fillStyle='rgba(230,236,240,.5)';g.fillRect(0,my-10,W,40);
  const minaret=(x0,h,s)=>{const w=7*s;g.fillStyle='#eef2f4';g.fillRect(x0-w/2,my-h,w,h);g.fillStyle='#b9c4ca';g.fillRect(x0+w*0.1,my-h,w*0.4,h);
    g.fillStyle='#e2e8ec';g.fillRect(x0-w*0.95,my-h*0.72,w*1.9,5*s);g.fillStyle='#b9c4ca';g.fillRect(x0-w*0.95,my-h*0.72+4*s,w*1.9,1.5*s);
    g.fillStyle='#eef2f4';g.beginPath();g.moveTo(x0-w/2,my-h);g.lineTo(x0,my-h-h*0.24);g.lineTo(x0+w/2,my-h);g.closePath();g.fill();g.fillStyle='#b9c4ca';g.beginPath();g.moveTo(x0,my-h-h*0.24);g.lineTo(x0+w/2,my-h);g.lineTo(x0+w*0.1,my-h);g.closePath();g.fill();};
  minaret(mx-150,150,0.85);minaret(mx+150,150,0.85);
  g.fillStyle='#dfe6ea';g.fillRect(mx-170,my-12,340,12);g.fillStyle='#c4ced4';g.fillRect(mx-170,my-3,340,3);
  g.fillStyle='#f2f5f7';g.beginPath();g.moveTo(mx-112,my-10);g.quadraticCurveTo(mx-40,my-44,mx-4,my-124);g.lineTo(mx+4,my-124);g.quadraticCurveTo(mx+12,my-60,mx+20,my-10);g.closePath();g.fill();
  g.fillStyle='#c9d3d9';g.beginPath();g.moveTo(mx+4,my-124);g.quadraticCurveTo(mx+40,my-44,mx+112,my-10);g.lineTo(mx+20,my-10);g.quadraticCurveTo(mx+12,my-60,mx+4,my-124);g.closePath();g.fill();
  g.strokeStyle='rgba(150,165,175,.7)';g.lineWidth=1;for(const t of[0.3,0.55,0.8]){g.beginPath();g.moveTo(mx-112*t,my-10-114*(1-t)*0.9);g.lineTo(mx-112*t+4,my-10);g.stroke();}
  g.fillStyle='rgba(120,140,155,.5)';g.fillRect(mx-60,my-30,120,4);
  minaret(mx-196,190,1);minaret(mx+196,190,1);
  /* the city below, wet road, puddles */
  g.fillStyle=vgrad(g,490,720,[[0,'#4a5a5e'],[1,'#26302e']]);g.fillRect(0,490,W,230);
  for(let i=0;i<60;i++){g.fillStyle=['#ffd98a','#ffe6b0','#fff6d0'][i%3];g.fillRect(r()*W,494+r()*20,2,2);}
  g.fillStyle='rgba(180,200,210,.25)';for(let k=0;k<6;k++){ell(g,100+r()*1080,580+r()*120,60+r()*90,6+r()*6);g.fill();}
  g.strokeStyle='rgba(230,220,200,.25)';g.lineWidth=3;g.setLineDash([24,20]);g.beginPath();g.moveTo(mx+260,720);g.quadraticCurveTo(mx+120,560,mx+300,500);g.stroke();g.setLineDash([]);
}
function lkRainLive(ctx,lt,n,seed,a){const r=rng(seed);ctx.strokeStyle=`rgba(220,232,245,${a})`;ctx.lineWidth=1.3;ctx.beginPath();for(let i=0;i<n;i++){const x=r()*W*1.1,sp=520+r()*300,y=((r()*H+lt*sp)%(H+60))-30;ctx.moveTo(x,y);ctx.lineTo(x-7,y+24);}ctx.stroke();
  for(let i=0;i<14;i++){const p=(lt*1.3+i*0.37)%1,x=(i*97)%W+40,y=560+((i*53)%140);ctx.strokeStyle=`rgba(220,232,245,${(0.4*(1-p)).toFixed(3)})`;ctx.beginPath();ctx.ellipse(x,y,4+p*16,1.5+p*5,0,0,TAU);ctx.stroke();}}
function lkAuroraBg(g,c){
  const r=rng(351);
  paintSky(g,[[0,'#040814'],[0.6,'#0c1830'],[1,'#1a2a44']]);
  g.fillStyle='#d8e4f0';g.beginPath();g.moveTo(0,H);for(let x=0;x<=W;x+=20)g.lineTo(x,520+Math.sin(x*0.005)*30+Math.sin(x*0.017)*12);g.lineTo(W,H);g.closePath();g.fill();
  g.fillStyle=vgrad(g,540,720,[[0,'#c9d8e8'],[1,'#8aa0bc']]);g.beginPath();g.moveTo(0,H);for(let x=0;x<=W;x+=20)g.lineTo(x,580+Math.sin(x*0.004+2)*24);g.lineTo(W,H);g.closePath();g.fill();
  for(let i=0;i<34;i++){const x=r()*W,y=540+r()*60;drawPine(g,x,y,40+r()*50,'#0c2420','#143a30','#dfe9f4',r);}
  /* a cabin with a warm window */
  const cx=c.ox??900,cy=600;g.fillStyle='#3a2418';g.fillRect(cx-70,cy-60,140,60);g.fillStyle='#e9eef6';g.beginPath();g.moveTo(cx-90,cy-56);g.lineTo(cx,cy-120);g.lineTo(cx+90,cy-56);g.closePath();g.fill();g.fillStyle='#2a1810';g.beginPath();g.moveTo(cx-84,cy-56);g.lineTo(cx,cy-112);g.lineTo(cx+84,cy-56);g.lineTo(cx+84,cy-50);g.lineTo(cx-84,cy-50);g.closePath();g.fill();g.fillStyle='#e9eef6';g.beginPath();g.moveTo(cx-90,cy-60);g.lineTo(cx,cy-124);g.lineTo(cx+90,cy-60);g.lineTo(cx+70,cy-60);g.lineTo(cx,cy-108);g.lineTo(cx-70,cy-60);g.closePath();g.fill();
  g.fillStyle='#ffcf7a';g.fillRect(cx-40,cy-44,30,24);g.fillRect(cx+12,cy-44,30,24);lkSoft(g,cx,cy-30,110,60,'#ffc870',0.5);g.fillStyle='#2a1810';g.fillRect(cx-26,cy-44,2,24);g.fillRect(cx+26,cy-44,2,24);
  g.fillStyle='#4a3020';g.fillRect(cx+40,cy-130,16,40);
  g.fillStyle='rgba(255,200,120,.25)';ell(g,cx,cy+12,120,16);g.fill();
  for(let i=0;i<12;i++){const x=r()*W,y=600+r()*100;drawPine(g,x,y,70+r()*60,'#0a1e1a','#123228','#e3ecf6',r);}
}
function lkGames(g,c){
  const x=lkOX(c),r=rng(361);
  /* newspaper with a sudoku */
  g.save();g.translate(x-80,520);g.rotate(-0.08);
  lkShadow(g,16,20,300,90,0.45);g.fillStyle='#efe9da';g.fillRect(-280,-120,520,250);g.fillStyle='rgba(120,110,90,.25)';for(let k=0;k<14;k++){g.fillRect(150,-104+k*15,80,5);g.fillRect(-268,-104+k*15,90,5);}
  g.fillStyle='rgba(60,50,40,.75)';g.font='700 16px "Cormorant Garamond",serif';g.textAlign='left';g.fillText('SUDOKU',-160,-98);
  const S=180,cell=S/9,ox=-160,oy=-86;g.fillStyle='#fbf8f0';g.fillRect(ox,oy,S,S);
  const grid='53..7....6..195....98....6.8...6...34..8.3..17...2...6.6....28....419..5....8..79',pen='.4.6.8912.7.....48.2.34.5.7.9.5.1..2.2.....9.3.....3.4.1.3.....6.2......8.4.5.3..';
  g.textAlign='center';for(let i=0;i<81;i++){const ch=grid[i],cx=ox+(i%9)*cell+cell/2,cy=oy+((i/9)|0)*cell+cell*0.72;if(ch!=='.'){g.fillStyle='#2a2420';g.font='600 14px "Mulish",sans-serif';g.fillText(ch,cx,cy);}else if(pen[i]!=='.'&&i<54){g.fillStyle='rgba(60,70,140,.8)';g.font='italic 500 15px "Cormorant Garamond",serif';g.fillText(pen[i],cx,cy);}}
  g.strokeStyle='#2a2420';for(let k=0;k<=9;k++){g.lineWidth=k%3?0.6:2;g.beginPath();g.moveTo(ox+k*cell,oy);g.lineTo(ox+k*cell,oy+S);g.stroke();g.beginPath();g.moveTo(ox,oy+k*cell);g.lineTo(ox+S,oy+k*cell);g.stroke();}
  g.restore();
  /* the pencil */
  g.save();g.translate(x-20,600);g.rotate(-0.35);lkShadow(g,6,10,110,8,0.4);g.fillStyle='#f4c430';g.fillRect(-100,-7,190,14);g.fillStyle='#d8a020';g.fillRect(-100,2,190,5);g.fillStyle='#e9a0a8';rrect(g,-122,-7,22,14,4);g.fill();g.fillStyle='#c9ccd2';g.fillRect(-104,-7,8,14);g.fillStyle='#f2dcb4';g.beginPath();g.moveTo(90,-7);g.lineTo(116,0);g.lineTo(90,7);g.closePath();g.fill();g.fillStyle='#2a2420';g.beginPath();g.moveTo(108,-2.5);g.lineTo(116,0);g.lineTo(108,2.5);g.closePath();g.fill();g.restore();
  /* scrabble rack */
  const rx=x+20,ry=430;g.save();g.translate(rx,ry);g.rotate(0.04);lkShadow(g,10,26,230,16,0.45);g.fillStyle='#7a4a24';g.beginPath();g.moveTo(-220,10);g.lineTo(220,10);g.lineTo(226,30);g.lineTo(-226,30);g.closePath();g.fill();
  const L=[['F',4],['A',1],['B',3],['E',1],['H',4],['A',1]];L.forEach(([ch,v],k)=>{const tx=-180+k*62;g.fillStyle='#d9c08e';rrect(g,tx-26,-48,52,56,5);g.fill();g.fillStyle='#f2e2b8';rrect(g,tx-26,-52,52,54,5);g.fill();g.fillStyle='#2a1e14';g.font='700 30px "Mulish",sans-serif';g.textAlign='center';g.fillText(ch,tx-2,-14);g.font='700 11px "Mulish",sans-serif';g.fillText(String(v),tx+16,-6);});
  g.fillStyle='#8a5a30';g.fillRect(-224,8,448,6);g.restore();
  /* a shuttlecock */
  const sx=x+250,sy=560;g.save();g.translate(sx,sy);g.rotate(-0.6);lkShadow(g,10,30,60,12,0.4);
  g.fillStyle='rgba(250,250,245,.95)';g.beginPath();g.moveTo(-20,0);g.lineTo(-56,-110);g.lineTo(56,-110);g.lineTo(20,0);g.closePath();g.fill();g.strokeStyle='rgba(160,160,170,.6)';g.lineWidth=1;for(let k=-3;k<=3;k++){g.beginPath();g.moveTo(k*5,0);g.lineTo(k*16,-110);g.stroke();}
  g.fillStyle='#e9e6dc';ell(g,0,-110,56,10);g.fill();g.fillStyle='#5b2d84';g.fillRect(-22,-16,44,6);
  g.fillStyle='#f6f3ea';g.beginPath();g.arc(0,0,21,0,Math.PI);g.closePath();g.fill();g.fillStyle='#d8d2c4';g.fillRect(-21,-4,42,6);g.restore();
}
function lkChess(g,c){
  const x=lkOX(c),r=rng(371);
  const BLx=x-190,BRx=x+190,FLx=x-290,FRx=x+290,by=410,fy=640,P=(u,v)=>[lerp(lerp(BLx,BRx,u),lerp(FLx,FRx,u),v),lerp(by,fy,v)];
  lkShadow(g,x+30,fy+20,360,40,0.6);
  g.fillStyle='#4a2a16';g.beginPath();g.moveTo(BLx-22,by-14);g.lineTo(BRx+22,by-14);g.lineTo(FRx+34,fy+16);g.lineTo(FLx-34,fy+16);g.closePath();g.fill();g.fillStyle='#3a1e0e';g.fillRect(FLx-34,fy+16,FRx-FLx+68,16);
  for(let i=0;i<8;i++)for(let j=0;j<8;j++){const a=P(i/8,j/8),b=P((i+1)/8,j/8),cc=P((i+1)/8,(j+1)/8),d=P(i/8,(j+1)/8);g.fillStyle=(i+j)%2?'#7a4a2a':'#ead6ac';g.beginPath();g.moveTo(...a);g.lineTo(...b);g.lineTo(...cc);g.lineTo(...d);g.closePath();g.fill();}
  lkSoft(g,x-80,by+60,260,80,'#fff0c8',0.25);
  const piece=(i,j,type,white)=>{const[px,py0]=P((i+0.5)/8,(j+0.62)/8),s=lerp(0.75,1.1,j/8),py=py0,base=white?'#f3e9d6':'#2a2224',sh=white?'#c8b898':'#120c0e',hi=white?'#ffffff':'#6a5a62';
    lkShadow(g,px+8*s,py+2,24*s,7*s,0.5);
    const gr=g.createLinearGradient(px-20*s,0,px+20*s,0);gr.addColorStop(0,hi);gr.addColorStop(0.35,base);gr.addColorStop(1,sh);g.fillStyle=gr;
    ell(g,px,py,22*s,8*s);g.fill();g.fillRect(px-20*s,py-8*s,40*s,8*s);ell(g,px,py-8*s,20*s,7*s);g.fill();
    const H0=type==='p'?40:type==='k'?84:type==='q'?76:type==='r'?52:62;
    g.beginPath();g.moveTo(px-14*s,py-10*s);g.quadraticCurveTo(px-6*s,py-H0*0.5*s,px-8*s,py-H0*0.8*s);g.lineTo(px+8*s,py-H0*0.8*s);g.quadraticCurveTo(px+6*s,py-H0*0.5*s,px+14*s,py-10*s);g.closePath();g.fill();
    ell(g,px,py-H0*0.8*s,12*s,4*s);g.fill();
    if(type==='p'){circle(g,px,py-H0*0.98*s,10*s);g.fill();}
    if(type==='r'){g.fillRect(px-13*s,py-H0*1.08*s,26*s,16*s);g.fillStyle=sh;for(let k=0;k<2;k++)g.fillRect(px-5*s+k*6*s,py-H0*1.1*s,3*s,7*s);}
    if(type==='q'){ell(g,px,py-H0*0.98*s,13*s,12*s);g.fill();g.fillStyle=white?'#e8c46a':'#b8943a';for(let k=-2;k<=2;k++){circle(g,px+k*6*s,py-H0*1.14*s,3*s);g.fill();}}
    if(type==='k'){ell(g,px,py-H0*0.96*s,13*s,12*s);g.fill();g.fillRect(px-2.5*s,py-H0*1.24*s,5*s,18*s);g.fillRect(px-7*s,py-H0*1.17*s,14*s,4*s);}
    if(type==='n'){g.beginPath();g.moveTo(px-12*s,py-H0*0.8*s);g.quadraticCurveTo(px-16*s,py-H0*1.3*s,px+4*s,py-H0*1.36*s);g.lineTo(px+20*s,py-H0*1.0*s);g.lineTo(px+10*s,py-H0*0.92*s);g.lineTo(px+12*s,py-H0*0.8*s);g.closePath();g.fill();g.fillStyle=sh;circle(g,px+2*s,py-H0*1.18*s,2*s);g.fill();}
    g.fillStyle='rgba(255,255,255,.35)';g.fillRect(px-11*s,py-H0*0.7*s,3*s,H0*0.5*s);};
  [[4,0,'k',0],[3,0,'q',0],[2,1,'p',0],[5,1,'p',0],[6,2,'n',0],[0,0,'r',0],[3,3,'p',0],[4,4,'p',1],[2,5,'n',1],[5,6,'p',1],[6,6,'p',1],[3,7,'q',1],[4,7,'k',1],[7,7,'r',1]].forEach(([i,j,t,w])=>piece(i,j,t,w));
  /* a glass of milk beside the board */
  lkGlass(g,x+300,500,62,100,{level:0.82,liq:['#fdfbf4','#e8e2d4'],surf:'#ffffff'});
}
function lkGarden(g,c){
  const r=rng(381);
  paintSky(g,[[0,'#bfe0f0'],[0.5,'#e9f2e6'],[1,'#f6efd8']]);sunGlow(g,1050,90,420,'rgba(255,248,220,0.8)');
  for(let k=0;k<5;k++)drawTreeClump(g,80+k*300+r()*80,380,170+r()*60,'#3f7a4a','#8ac070',r);
  g.fillStyle=vgrad(g,380,720,[[0,'#8ac070'],[1,'#4f8a3e']]);g.fillRect(0,380,W,340);
  for(let i=0;i<500;i++){const y=400+Math.pow(r(),0.7)*320,x=r()*W,s=(y-380)/340;g.strokeStyle=r()<0.5?'#5f9a48':'#7cb05a';g.lineWidth=1+s*1.6;g.beginPath();g.moveTo(x,y);g.quadraticCurveTo(x+2,y-8*s-4,x+(r()-0.5)*8,y-14*s-6);g.stroke();}
  for(let i=0;i<40;i++){const y=420+r()*300,x=r()*W,s=0.6+(y-420)/300;for(let k=0;k<3;k++){g.fillStyle='#4f9a3a';circle(g,x+Math.cos(k*2.1)*4*s,y+Math.sin(k*2.1)*4*s,4.4*s);g.fill();}}
  for(let i=0;i<34;i++){const y=420+r()*300,x=r()*W,s=0.5+(y-420)/300;g.fillStyle='#ffffff';for(let k=0;k<8;k++){ell(g,x+Math.cos(k/8*TAU)*5*s,y+Math.sin(k/8*TAU)*5*s,4*s,1.8*s,k/8*TAU);g.fill();}g.fillStyle='#f4c430';circle(g,x,y,2.6*s);g.fill();}
}
function lkRabbit(ctx,lt,x,y){
  const tw=Math.sin(lt*9)*0.6,ear=Math.sin(lt*1.3)*0.06,hop=Math.max(0,Math.sin(lt*2.2-1))*0;
  ctx.save();ctx.translate(x,y-hop);
  lkShadow(ctx,10,96,130,22,0.35);
  const fur=(cx,cy,rx,ry,rot)=>{const gr=ctx.createRadialGradient(cx-rx*0.35,cy-ry*0.4,rx*0.1,cx,cy,Math.max(rx,ry));gr.addColorStop(0,'#ffffff');gr.addColorStop(0.65,'#f2eee8');gr.addColorStop(1,'#cfc4d4');ctx.fillStyle=gr;ell(ctx,cx,cy,rx,ry,rot||0);ctx.fill();};
  fur(20,30,110,80,0);fur(100,62,30,26,0);fur(-50,74,40,22,0.2);
  ctx.save();ctx.translate(-56,-58);
  for(const[ex,rot]of[[-14,-0.32+ear],[16,0.08-ear]]){ctx.save();ctx.translate(ex,-10);ctx.rotate(rot);fur(0,-62,18,62,0);ctx.fillStyle='#f6c6cf';ell(ctx,0,-60,8,48);ctx.fill();ctx.restore();}
  fur(0,10,58,54,0);fur(-6,36,36,26,0);
  ctx.fillStyle='#2a1a22';circle(ctx,-26,2,9);ctx.fill();ctx.fillStyle='#ffffff';circle(ctx,-29,-1,3.2);ctx.fill();
  ctx.fillStyle='#f29aaa';ell(ctx,-54,28+tw*0.6,6,4.5);ctx.fill();
  ctx.strokeStyle='rgba(120,100,110,.55)';ctx.lineWidth=1;for(const a of[-0.25,0,0.25]){ctx.beginPath();ctx.moveTo(-50,32);ctx.lineTo(-96,32+a*40+tw);ctx.stroke();}
  ctx.fillStyle='rgba(240,150,160,.35)';ell(ctx,-30,24,10,6);ctx.fill();
  ctx.restore();
  ctx.fillStyle='#ffffff';circle(ctx,128,24,18);ctx.fill();
  ctx.restore();
}
function lkTvRoom(g,c){
  const x=lkOX(c),r=rng(391);
  g.fillStyle=vgrad(g,0,H,[[0,'#10131e'],[1,'#1c2030']]);g.fillRect(0,0,W,H);
  lkSoft(g,x,330,520,300,'#5a78b8',0.35);
  /* the TV */
  const tx=x-230,ty=170,tw=460,th=270;g.fillStyle='#08090c';rrect(g,tx-10,ty-10,tw+20,th+20,10);g.fill();
  g.fillStyle=vgrad(g,ty,ty+th,[[0,'#0a0e18'],[0.6,'#1a2a3a'],[1,'#24304a']]);g.fillRect(tx,ty,tw,th);
  /* on screen: a road through dark trees, one street lamp */
  g.save();g.beginPath();g.rect(tx,ty,tw,th);g.clip();
  for(let i=0;i<40;i++){const px=tx+r()*tw,ph=60+r()*120;g.fillStyle=i%2?'#060a10':'#0c1420';g.beginPath();g.moveTo(px-24,ty+th*0.75);g.lineTo(px,ty+th*0.75-ph);g.lineTo(px+24,ty+th*0.75);g.closePath();g.fill();}
  g.fillStyle='#2a2e36';g.beginPath();g.moveTo(tx+tw*0.42,ty+th*0.7);g.lineTo(tx+tw*0.58,ty+th*0.7);g.lineTo(tx+tw*0.9,ty+th);g.lineTo(tx+tw*0.1,ty+th);g.closePath();g.fill();
  g.fillStyle='#14161c';g.fillRect(tx+tw*0.66,ty+th*0.3,4,th*0.5);lkSoft(g,tx+tw*0.66,ty+th*0.32,90,90,'#ffd98a',0.7);g.fillStyle='#fff2c0';circle(g,tx+tw*0.66+2,ty+th*0.31,5);g.fill();
  g.fillStyle='rgba(255,240,200,.8)';g.font='italic 500 14px "Cormorant Garamond",serif';g.textAlign='right';g.fillText('S4 · E1',tx+tw-16,ty+24);
  g.restore();
  g.strokeStyle='rgba(255,255,255,.1)';g.lineWidth=2;rrect(g,tx-10,ty-10,tw+20,th+20,10);g.stroke();
  /* the cabinet, books, a magnifying glass */
  g.fillStyle=vgrad(g,470,720,[[0,'#3a2a22'],[1,'#1e140e']]);g.fillRect(0,470,W,250);g.fillStyle='#4a362a';g.fillRect(0,470,W,8);
  lkSoft(g,x,480,420,40,'#5a78b8',0.35);
  const bk=[['#7a1f2e',150],['#2f4a6a',130],['#cf9a34',160],['#5b2d84',140],['#2f5a3a',120]];let yy=470;
  bk.forEach(([col,w],k)=>{const bx=x+262-w/2+((k*17)%20)-10,bh=22;g.fillStyle=mixHex(col,'#000000',0.3);g.fillRect(bx,yy-bh,w,bh);g.fillStyle=col;g.fillRect(bx,yy-bh,w-6,bh-3);g.fillStyle='rgba(255,230,180,.6)';g.fillRect(bx+10,yy-bh+8,w*0.4,2);g.fillStyle='#efe6d4';g.fillRect(bx+w-6,yy-bh+2,6,bh-4);yy-=bh;});
  g.save();g.translate(x+262,yy-14);g.rotate(-0.3);g.strokeStyle='#cf9a34';g.lineWidth=6;circle(g,0,0,26);g.stroke();g.fillStyle='rgba(180,210,255,.25)';circle(g,0,0,23);g.fill();g.fillStyle='#3a2418';rrect(g,24,-6,60,12,6);g.fill();g.restore();
  /* popcorn */
  const px=x-300,py=560;g.save();g.translate(px,py);g.scale(0.75,0.75);g.translate(-px,-py);lkShadow(g,px+10,py+10,70,14,0.5);g.fillStyle='#f6f2ea';g.beginPath();g.moveTo(px-56,py-90);g.lineTo(px-44,py);g.lineTo(px+44,py);g.lineTo(px+56,py-90);g.closePath();g.fill();g.fillStyle='#d8283a';for(let k=-2;k<=2;k++){g.beginPath();g.moveTo(px+k*22-6,py-90);g.lineTo(px+k*18-5,py);g.lineTo(px+k*18+5,py);g.lineTo(px+k*22+6,py-90);g.closePath();g.fill();}
  for(let k=0;k<26;k++){g.fillStyle=k%3?'#fff6dc':'#f6dc8a';circle(g,px-48+r()*96,py-96-r()*26,6+r()*5);g.fill();}
  g.restore();
}
function lkChalk(g,c){
  const r=rng(401);
  g.fillStyle=vgrad(g,0,H,[[0,'#cdbb98'],[1,'#a8946e']]);g.fillRect(0,0,W,H);lkBlots(g,402,20,['#e9dcc0','#8a7650'],0,H,80,200,0.2);
  const bx=50,by=70,bw=720,bh=440;g.fillStyle='#6a4a2a';rrect(g,bx-16,by-16,bw+32,bh+32,6);g.fill();g.fillStyle=vgrad(g,by,by+bh,[[0,'#2c4638'],[1,'#22382c']]);g.fillRect(bx,by,bw,bh);
  lkBlots(g,403,30,['#ffffff'],by,by+bh,40,140,0.05);g.fillStyle='rgba(255,255,255,.04)';for(let k=0;k<8;k++){g.save();g.translate(bx+r()*bw,by+r()*bh);g.rotate(-0.1);g.fillRect(-120,-14,240,28);g.restore();}
  g.fillStyle='#6a4a2a';g.fillRect(bx-10,by+bh+10,bw+20,14);g.fillStyle='#f4f1e8';g.fillRect(bx+90,by+bh+4,40,8);g.fillStyle='#f2b6c8';g.fillRect(bx+150,by+bh+5,30,7);
  const chalk='rgba(245,244,236,.92)';g.fillStyle=chalk;g.strokeStyle=chalk;g.textAlign='left';
  g.font='italic 500 40px "Cormorant Garamond",serif';g.fillText('∂V/∂t + ½σ²S² ∂²V/∂S²',bx+40,by+80);g.fillText('+ rS ∂V/∂S − rV = 0',bx+150,by+132);
  g.font='italic 500 30px "Cormorant Garamond",serif';g.fillText('C = S·N(d₁) − K e^(−rT) N(d₂)',bx+40,by+196);
  g.lineWidth=2;g.beginPath();g.moveTo(bx+40,by+214);g.lineTo(bx+420,by+214);g.stroke();
  /* SIR curves */
  const sx=bx+60,sy=by+400,sw=280,sh=150;g.lineWidth=2;g.beginPath();g.moveTo(sx,sy-sh);g.lineTo(sx,sy);g.lineTo(sx+sw,sy);g.stroke();
  g.beginPath();for(let k=0;k<=40;k++){const t=k/40;g.lineTo(sx+t*sw,sy-sh*(1/(1+Math.exp((t-0.45)*12))));}g.stroke();
  g.strokeStyle='rgba(255,190,200,.9)';g.beginPath();for(let k=0;k<=40;k++){const t=k/40;g.lineTo(sx+t*sw,sy-sh*0.8*Math.exp(-Math.pow((t-0.42)/0.15,2)));}g.stroke();
  g.strokeStyle='rgba(190,230,200,.9)';g.beginPath();for(let k=0;k<=40;k++){const t=k/40;g.lineTo(sx+t*sw,sy-sh*(1-1/(1+Math.exp((t-0.6)*10))));}g.stroke();
  g.font='italic 500 22px "Cormorant Garamond",serif';g.fillStyle=chalk;g.fillText('S',sx+sw+8,sy-sh+30);g.fillStyle='rgba(255,190,200,.95)';g.fillText('I',sx+sw*0.42,sy-sh*0.86);g.fillStyle='rgba(190,230,200,.95)';g.fillText('R',sx+sw+8,sy-sh*0.8);
  /* crop futures: candles and a stalk of wheat */
  const cx=bx+430,cy=by+400;g.strokeStyle=chalk;g.lineWidth=2;g.beginPath();g.moveTo(cx,cy-150);g.lineTo(cx,cy);g.lineTo(cx+250,cy);g.stroke();
  let v=90;for(let k=0;k<10;k++){const o=v,cl=v+(Math.sin(k*1.7)*18+8);v=cl;const up=cl>o,x0=cx+18+k*23;g.strokeStyle=up?'rgba(190,230,200,.95)':'rgba(255,190,200,.95)';g.lineWidth=1.5;g.beginPath();g.moveTo(x0+5,cy-Math.max(o,cl)-10);g.lineTo(x0+5,cy-Math.min(o,cl)+8);g.stroke();g.lineWidth=8;g.beginPath();g.moveTo(x0+5,cy-o);g.lineTo(x0+5,cy-cl);g.stroke();}
  g.strokeStyle='rgba(245,220,150,.9)';g.lineWidth=2;g.beginPath();g.moveTo(cx+230,cy-20);g.quadraticCurveTo(cx+240,cy-120,cx+250,cy-190);g.stroke();for(let k=0;k<6;k++){const yy=cy-110-k*14;lkLeaf(g,cx+244+k,yy,18,5,-2.2,'rgba(245,220,150,.85)');lkLeaf(g,cx+246+k,yy,18,5,-0.9,'rgba(245,220,150,.85)');}
  g.font='italic 500 24px "Cormorant Garamond",serif';g.fillStyle=chalk;g.fillText('crop futures',cx+40,cy-160);
  g.fillStyle=vgrad(g,580,720,[[0,'#8a6a46'],[1,'#5a4228']]);g.fillRect(0,580,W,140);
}
function lkSchool(g,c){
  const x=lkOX(c),r=rng(411);
  /* a small school bag */
  const bx=x-160,by=600;lkShadow(g,bx+20,by+6,120,18,0.5);
  g.fillStyle='#2f8a8a';rrect(g,bx-90,by-220,180,220,40);g.fill();g.fillStyle='#257272';rrect(g,bx-70,by-110,140,96,20);g.fill();g.fillStyle='#f4c430';rrect(g,bx-56,by-118,112,12,6);g.fill();
  g.strokeStyle='#1f5a5a';g.lineWidth=12;g.beginPath();g.moveTo(bx-50,by-210);g.quadraticCurveTo(bx,by-280,bx+50,by-210);g.stroke();g.fillStyle='rgba(255,255,255,.18)';rrect(g,bx-80,by-208,20,170,10);g.fill();
  g.fillStyle='#ffffff';g.beginPath();g.moveTo(bx+30,by-170);for(let k=0;k<5;k++){const a=-Math.PI/2+k*TAU/5;g.lineTo(bx+30+Math.cos(a)*16,by-170+Math.sin(a)*16);g.lineTo(bx+30+Math.cos(a+TAU/10)*7,by-170+Math.sin(a+TAU/10)*7);}g.closePath();g.fill();
  /* notebooks */
  const nx=x+60,ny=610;lkShadow(g,nx+20,ny+4,150,20,0.5);[['#d8283a',0],['#2f5d8a',-14],['#f4c430',-28]].forEach(([col,dy],k)=>{g.save();g.translate(nx+k*6,ny+dy);g.rotate(-0.04+k*0.03);g.fillStyle='#f4efe4';rrect(g,-130,-12,260,14,3);g.fill();g.fillStyle=col;rrect(g,-132,-16,264,8,3);g.fill();g.restore();});
  g.save();g.translate(nx+10,ny-50);g.rotate(-0.02);g.fillStyle='#fbf8f0';rrect(g,-120,-8,240,10,2);g.fill();g.fillStyle='#e3889f';rrect(g,-122,-14,244,8,3);g.fill();g.restore();
  /* pencils in a cup */
  const px=x+230,py=560;g.fillStyle='#e9e2d4';g.fillRect(px-36,py-80,72,80);g.fillStyle='rgba(0,0,0,.12)';g.fillRect(px+16,py-80,20,80);
  ['#f4c430','#d8283a','#2f8a8a','#5b2d84','#4f9a3a'].forEach((col,k)=>{g.save();g.translate(px-24+k*12,py-80);g.rotate(-0.25+k*0.12);g.fillStyle=col;g.fillRect(-4,-90,8,92);g.fillStyle='#f2dcb4';g.beginPath();g.moveTo(-4,-90);g.lineTo(0,-104);g.lineTo(4,-90);g.closePath();g.fill();g.restore();});
  /* an envelope with a heart seal */
  g.save();g.translate(x+40,500);g.rotate(0.08);lkShadow(g,10,50,110,14,0.4);g.fillStyle='#f6efe2';g.fillRect(-100,-50,200,110);g.strokeStyle='rgba(150,120,90,.4)';g.lineWidth=1.5;g.beginPath();g.moveTo(-100,-50);g.lineTo(0,14);g.lineTo(100,-50);g.stroke();g.fillStyle='#c8283a';heart(g,0,10,14);g.fill();g.restore();
}

/* ================================================================== III · how she wants to be loved ============ */
function lkGifts(g,c){
  const x=lkOX(c),r=rng(421);
  /* the birthday page on a phone, standing */
  const px=x-200,py=150,pw=160,ph=320;lkShadow(g,px+pw/2+20,py+ph+8,100,14,0.5);
  g.fillStyle='#101014';rrect(g,px,py,pw,ph,24);g.fill();g.fillStyle=vgrad(g,py,py+ph,[[0,'#ffd6e2'],[1,'#f08aaa']]);rrect(g,px+7,py+7,pw-14,ph-14,18);g.fill();
  g.fillStyle='rgba(255,255,255,.9)';for(let k=0;k<8;k++){heart(g,px+20+r()*(pw-40),py+60+r()*(ph-90),4+r()*5);g.fill();}
  g.fillStyle='#ffffff';g.textAlign='center';g.font='400 30px "Great Vibes",cursive';g.fillText('Happy Birthday',px+pw/2,py+132,pw-30);g.font='400 40px "Great Vibes",cursive';g.fillText('Fabeha',px+pw/2,py+176,pw-30);
  g.drawImage(SPR.sunflower,px+pw/2-22,py+200,44,44);g.fillStyle='#0e0e12';rrect(g,px+pw/2-26,py+14,52,12,6);g.fill();
  g.fillStyle='#1a1a20';g.beginPath();g.moveTo(px+30,py+ph);g.lineTo(px+pw-30,py+ph);g.lineTo(px+pw-10,py+ph+16);g.lineTo(px+10,py+ph+16);g.closePath();g.fill();
  /* paper flowers in a little glass */
  const fx=x+30,fy=470;
  const tulip=(tx,ty,col,rot)=>{g.save();g.translate(tx,ty);g.rotate(rot);g.strokeStyle='#5a9a4a';g.lineWidth=4;g.beginPath();g.moveTo(0,0);g.lineTo(0,150);g.stroke();g.fillStyle='#6aaa58';g.beginPath();g.moveTo(0,110);g.lineTo(-30,70);g.lineTo(-4,96);g.closePath();g.fill();
    g.fillStyle=mixHex(col,'#000000',0.18);g.beginPath();g.moveTo(-26,-36);g.lineTo(0,-4);g.lineTo(26,-36);g.lineTo(18,8);g.lineTo(-18,8);g.closePath();g.fill();
    g.fillStyle=col;g.beginPath();g.moveTo(-18,8);g.lineTo(-26,-36);g.lineTo(-8,-20);g.lineTo(0,-44);g.lineTo(8,-20);g.lineTo(26,-36);g.lineTo(18,8);g.closePath();g.fill();g.strokeStyle='rgba(255,255,255,.55)';g.lineWidth=1.2;g.beginPath();g.moveTo(0,-44);g.lineTo(0,6);g.moveTo(-8,-20);g.lineTo(-12,6);g.moveTo(8,-20);g.lineTo(12,6);g.stroke();g.restore();};
  tulip(fx-30,fy-120,'#e3889f',-0.25);tulip(fx+30,fy-140,'#9a5cc8',0.15);tulip(fx,fy-170,'#f2a2b6',0);tulip(fx+60,fy-90,'#cf9a34',0.45);
  lkGlass(g,fx+10,fy+90,90,110,{level:0.5,liq:['#dff2f8','#b8dce8']});
  /* coins she collects */
  [[x-120,560,'#d4af37','€'],[x-40,600,'#c0c0c0','¢'],[x+60,580,'#b87333','₺'],[x+150,620,'#d4af37','﷼'],[x-200,620,'#c0c0c0','£']].forEach(([cx,cy,col,s])=>{lkShadow(g,cx+8,cy+10,36,8,0.4);lkCoin(g,cx,cy,30,col,s,0.45);});
  /* keychains, the purple one in front */
  const kx=x+200,ky=500;g.strokeStyle='#c9ccd2';g.lineWidth=4;circle(g,kx,ky,22);g.stroke();
  for(const[dx,dy,col,kind]of[[-40,70,'#cf9a34','star'],[40,64,'#e3889f','round'],[0,90,'#8a4ac8','heart']]){g.strokeStyle='#b8bcc4';g.lineWidth=2;g.setLineDash([5,3]);g.beginPath();g.moveTo(kx+dx*0.3,ky+18);g.lineTo(kx+dx,ky+dy-20);g.stroke();g.setLineDash([]);
    lkShadow(g,kx+dx+8,ky+dy+26,30,6,0.35);g.fillStyle=col;if(kind==='heart'){heart(g,kx+dx,ky+dy,26);g.fill();g.fillStyle='rgba(255,255,255,.5)';ell(g,kx+dx-10,ky+dy-10,7,4,-0.6);g.fill();}else if(kind==='star'){g.beginPath();for(let k=0;k<10;k++){const a=-Math.PI/2+k*Math.PI/5,rr=k%2?9:22;g.lineTo(kx+dx+Math.cos(a)*rr,ky+dy+Math.sin(a)*rr);}g.closePath();g.fill();}else{circle(g,kx+dx,ky+dy,18);g.fill();g.fillStyle='#ffffff';circle(g,kx+dx,ky+dy,8);g.fill();}}
}
function lkTray(g,c){
  const x=lkOX(c),r=rng(431);
  /* velvet tray */
  lkShadow(g,x+30,610,300,40,0.55);g.fillStyle='#4a0e18';rrect(g,x-280,450,520,160,26);g.fill();g.fillStyle=vgrad(g,456,604,[[0,'#7a1a2c'],[1,'#5a1020']]);rrect(g,x-266,460,492,140,20);g.fill();
  for(let k=0;k<40;k++){g.fillStyle='rgba(255,180,190,.05)';ell(g,x-260+r()*480,470+r()*120,30,10,r());g.fill();}
  /* necklace */
  const nx=x-100,ny=490;g.strokeStyle='#e8c46a';g.lineWidth=3;g.setLineDash([4,2]);g.beginPath();g.moveTo(nx-110,ny);g.bezierCurveTo(nx-100,ny+90,nx+100,ny+90,nx+110,ny);g.stroke();g.setLineDash([]);
  g.fillStyle='#f0cf6a';heart(g,nx,ny+86,14);g.fill();g.fillStyle='rgba(255,255,255,.7)';ell(g,nx-5,ny+80,4,2,-0.5);g.fill();
  /* bracelet */
  const bx=x+110,by=540;for(let k=0;k<26;k++){const a=k/26*TAU;g.fillStyle=k%2?'#f0cf6a':'#cf9a34';circle(g,bx+Math.cos(a)*60,by+Math.sin(a)*20,5);g.fill();}g.fillStyle='#fff6d0';for(let k=0;k<26;k+=3){const a=k/26*TAU;g.fillRect(bx+Math.cos(a)*60-1,by+Math.sin(a)*20-3,2,2);}
  /* tasbih: a loop of pearls and a tassel */
  const tx=x-40,ty=575;for(let k=0;k<36;k++){const a=k/36*TAU,px=tx+Math.cos(a)*120,py=ty+Math.sin(a)*22+Math.sin(a*3)*4;const gr=g.createRadialGradient(px-2,py-2,0.5,px,py,6);gr.addColorStop(0,'#ffffff');gr.addColorStop(1,'#cfd8e0');g.fillStyle=gr;circle(g,px,py,5.5);g.fill();}
  g.fillStyle='#2f8a8a';circle(g,tx+124,ty+6,8);g.fill();g.strokeStyle='#2f8a8a';g.lineWidth=1.5;for(let k=0;k<9;k++){g.beginPath();g.moveTo(tx+124,ty+10);g.lineTo(tx+130+k*3,ty+56);g.stroke();}
  /* zamzam */
  const zx=x+200,zy=470;lkShadow(g,zx+14,zy+6,50,10,0.5);
  g.fillStyle='rgba(220,240,250,.55)';rrect(g,zx-36,zy-190,72,190,14);g.fill();g.fillStyle='rgba(200,230,245,.45)';rrect(g,zx-32,zy-150,64,146,12);g.fill();
  g.fillStyle='#2a6ab8';rrect(g,zx-18,zy-214,36,26,6);g.fill();g.fillStyle='#ffffff';rrect(g,zx-34,zy-120,68,56,4);g.fill();
  g.fillStyle='#2a6ab8';g.font='400 22px "Noto Nastaliq Urdu",serif';g.textAlign='center';g.fillText('زمزم',zx,zy-82);
  g.fillStyle='rgba(255,255,255,.7)';g.fillRect(zx-28,zy-180,5,160);
}
function lkHaram(g,c){
  const r=rng(441);
  paintSky(g,[[0,'#070a1e'],[0.6,'#1e1c3a'],[1,'#3a2e48']]);stars0(g,r,160,300);
  /* arcades */
  g.fillStyle='#e9e1d2';g.fillRect(0,250,W,160);for(let k=0;k<12;k++){const ax=k*112-10;g.fillStyle='#4a3a3a';g.beginPath();g.moveTo(ax,410);g.lineTo(ax,320);g.arc(ax+36,320,36,Math.PI,0);g.lineTo(ax+72,410);g.closePath();g.fill();g.fillStyle='rgba(255,214,150,.55)';g.beginPath();g.moveTo(ax+7,410);g.lineTo(ax+7,322);g.arc(ax+36,322,29,Math.PI,0);g.lineTo(ax+65,410);g.closePath();g.fill();}
  for(const mx of[120,520,900,1180]){g.fillStyle='#f0e8da';g.fillRect(mx-12,80,24,180);g.fillStyle='#d8cfc0';g.fillRect(mx-16,140,32,8);g.fillRect(mx-16,200,32,8);g.fillStyle='#e9dcc4';g.beginPath();g.moveTo(mx-14,80);g.lineTo(mx,40);g.lineTo(mx+14,80);g.closePath();g.fill();lkSoft(g,mx,90,40,40,'#ffe29a',0.6);}
  /* marble floor */
  g.fillStyle=vgrad(g,410,720,[[0,'#efe8dc'],[1,'#cfc6b6']]);g.fillRect(0,410,W,310);lkSoft(g,640,520,700,180,'#fff2d6',0.4);
  /* the Kaaba */
  const kx=c.kx??470,ky=468;lkSoft(g,kx,ky+20,260,60,'#2a1e14',0.25);
  g.fillStyle='#0c0a0c';g.beginPath();g.moveTo(kx-120,ky);g.lineTo(kx+40,ky+18);g.lineTo(kx+40,ky-150);g.lineTo(kx-120,ky-168);g.closePath();g.fill();
  g.fillStyle='#1a161a';g.beginPath();g.moveTo(kx+40,ky+18);g.lineTo(kx+130,ky-2);g.lineTo(kx+130,ky-170);g.lineTo(kx+40,ky-150);g.closePath();g.fill();
  g.fillStyle='#c9a24a';g.beginPath();g.moveTo(kx-120,ky-128);g.lineTo(kx+40,ky-110);g.lineTo(kx+40,ky-98);g.lineTo(kx-120,ky-116);g.closePath();g.fill();g.beginPath();g.moveTo(kx+40,ky-110);g.lineTo(kx+130,ky-130);g.lineTo(kx+130,ky-118);g.lineTo(kx+40,ky-98);g.closePath();g.fill();
  g.fillStyle='rgba(120,90,30,.8)';for(let k=0;k<14;k++){g.fillRect(kx-114+k*11,ky-124+k*1.25,6,2);}
  g.fillStyle='#b8923a';g.fillRect(kx-10,ky-86,28,62);g.fillStyle='rgba(255,230,160,.35)';g.fillRect(kx-8,ky-84,4,58);
}
function stars0(g,r,n,ymax){for(let i=0;i<n;i++){g.fillStyle=`rgba(255,250,235,${0.3+r()*0.6})`;const s=r()*1.4+0.4;g.fillRect(r()*W,r()*ymax,s,s);}}
function lkHaramLive(ctx,lt,c){
  const kx=c.kx??470,ky=476;
  /* tawaf: small white figures circling, slowly */
  for(let i=0;i<150;i++){const ring=i%5,R=150+ring*34,a=-(lt*0.16+(i*0.618)%1*TAU)+ring*0.4,px=kx+Math.cos(a)*R*1.15,py=ky+Math.sin(a)*R*0.24;if(Math.sin(a)<-0.25&&Math.abs(Math.cos(a))<0.7)continue;ctx.fillStyle=i%7?'rgba(250,248,240,.92)':'rgba(30,26,30,.8)';ctx.fillRect(px-1.8,py-7,3.6,8);circle(ctx,px,py-8.5,1.9);ctx.fill();}
  /* his hands, raised in dua */
  const bob=Math.sin(lt*0.8)*3;
  ctx.save();ctx.translate(0,bob);
  ctx.translate(kx+30,700);ctx.scale(1.15,1.15);ctx.translate(-(kx+30),-700);
  for(const s of[-1,1]){const hx=kx+30+s*86,hy=604;
    ctx.fillStyle='#efece4';ctx.beginPath();ctx.moveTo(hx-s*10-56,H+20);ctx.lineTo(hx-s*20-40,hy+40);ctx.lineTo(hx+s*30+40,hy+50);ctx.lineTo(hx+s*40+50,H+20);ctx.closePath();ctx.fill();
    ctx.fillStyle='#e2b49a';ell(ctx,hx,hy,48,40,s*0.1);ctx.fill();
    for(let k=0;k<4;k++){const fx=hx+s*(-30+k*18),fy=hy-36-Math.abs(k-1.5)*-4,fh=58-Math.abs(k-1.2)*8;ctx.fillStyle='#e2b49a';rrect(ctx,fx-8,fy-fh+20,16,fh,8);ctx.fill();ctx.strokeStyle='rgba(150,90,60,.25)';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(fx-6,fy-6);ctx.lineTo(fx+6,fy-6);ctx.stroke();}
    ctx.fillStyle='#e2b49a';ctx.save();ctx.translate(hx+s*48,hy-4);ctx.rotate(s*0.7);rrect(ctx,-9,-44,18,50,9);ctx.fill();ctx.restore();
    ctx.strokeStyle='rgba(150,90,60,.3)';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(hx-30,hy+4);ctx.quadraticCurveTo(hx,hy-8,hx+30,hy+2);ctx.stroke();ctx.beginPath();ctx.moveTo(hx-26,hy+16);ctx.quadraticCurveTo(hx,hy+8,hx+26,hy+16);ctx.stroke();}
  ctx.restore();
  motes(ctx,lt,30,443,'#ffe2a8',1.4,0.4);
}
function lkSill(g,c){
  const x=lkOX(c),r=rng(451);
  g.fillStyle=vgrad(g,0,H,[[0,'#2a2028'],[1,'#3a2a2a']]);g.fillRect(0,0,W,H);
  const wx=x-330,wy=60,ww=660,wh=420;g.fillStyle=vgrad(g,wy,wy+wh,[[0,'#7a6aa8'],[0.45,'#e9a0a0'],[0.75,'#ffd09a'],[1,'#fff0c8']]);g.fillRect(wx,wy,ww,wh);
  sunGlow(g,x+120,wy+wh-20,300,'rgba(255,236,190,0.8)');
  g.fillStyle='rgba(255,255,255,.25)';for(let k=0;k<5;k++){ell(g,wx+r()*ww,wy+60+r()*200,90+r()*80,8+r()*6);g.fill();}
  g.fillStyle='#4a3a4a';g.beginPath();g.moveTo(wx,wy+wh);for(let k=0;k<=22;k++)g.lineTo(wx+k*ww/22,wy+wh-40-((k*41)%60)-((k%4)?0:30));g.lineTo(wx+ww,wy+wh);g.closePath();g.fill();
  g.fillStyle='#5a4a4c';for(let k=0;k<9;k++){g.fillRect(wx+20+k*70,wy+wh-30-((k*23)%40),40,40+((k*23)%40));}
  g.fillStyle='#3a2a28';g.fillRect(wx-20,wy-20,ww+40,20);g.fillRect(wx-20,wy-20,20,wh+40);g.fillRect(wx+ww,wy-20,20,wh+40);g.fillRect(x-6,wy,12,wh);
  g.fillStyle=vgrad(g,wy+wh,wy+wh+60,[[0,'#d9c8b4'],[1,'#a89480']]);g.fillRect(wx-60,wy+wh,ww+120,40);g.fillStyle='#8a7462';g.fillRect(wx-60,wy+wh+40,ww+120,14);
  g.fillStyle=vgrad(g,wy+wh+54,H,[[0,'#2a1e1c'],[1,'#140e0e']]);g.fillRect(0,wy+wh+54,W,H);
  /* her milk, his chai */
  lkGlass(g,x-70,wy+wh+18,78,130,{level:0.84,liq:['#fdfbf4','#e8e2d4'],surf:'#ffffff',cast:'#ffe6c0'});
  lkGlass(g,x+60,wy+wh+18,70,96,{level:0.8,liq:['#c8843e','#7a4218'],surf:'#d8a060',cast:'#ffc890'});
}
function lkBoxHands(ctx,lt,x){
  const bob=Math.sin(lt*0.9)*4;ctx.save();ctx.translate(0,bob);
  lkArm(ctx,x-210,840,x-140,624,62,'#e9e2d6');lkArm(ctx,x+210,840,x+140,624,62,'#e9e2d6');
  /* the box (closed), tied with gold string */
  ctx.save();ctx.translate(x,500);ctx.rotate(-0.03);
  ctx.fillStyle='rgba(30,10,14,.35)';ell(ctx,10,118,200,24);ctx.fill();
  ctx.fillStyle=vgrad(ctx,-60,110,[[0,'#a83456'],[1,'#7a2040']]);ctx.beginPath();ctx.moveTo(-190,-30);ctx.lineTo(190,-30);ctx.lineTo(190,96);ctx.lineTo(-190,96);ctx.closePath();ctx.fill();
  ctx.fillStyle=vgrad(ctx,-110,-30,[[0,'#e2688c'],[1,'#c84a6e']]);ctx.beginPath();ctx.moveTo(-170,-110);ctx.lineTo(170,-110);ctx.lineTo(196,-30);ctx.lineTo(-196,-30);ctx.closePath();ctx.fill();
  ctx.strokeStyle='#e8c46a';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(-6,-110);ctx.lineTo(-10,96);ctx.moveTo(-184,-70);ctx.lineTo(184,-70);ctx.stroke();
  ctx.lineWidth=3.5;ctx.beginPath();ctx.ellipse(-30,-74,22,12,-0.3,0,TAU);ctx.stroke();ctx.beginPath();ctx.ellipse(20,-74,22,12,0.3,0,TAU);ctx.stroke();ctx.beginPath();ctx.moveTo(-8,-70);ctx.lineTo(-30,-40);ctx.moveTo(-6,-70);ctx.lineTo(14,-38);ctx.stroke();
  ctx.font='400 46px "Noto Nastaliq Urdu",serif';ctx.textAlign='center';ctx.fillStyle='#f6dc94';ctx.fillText('مٹھائی',0,62);
  ctx.fillStyle='#e8c46a';ctx.fillRect(-190,-34,380,4);ctx.fillRect(-190,90,380,3);
  ctx.restore();
  /* his hands under the box: the heels of the palms below, four fingers curled up over the front */
  for(const s of[-1,1]){const hx=x+s*138,hy=604;
    ctx.fillStyle=HIS.skinSh;ell(ctx,hx,hy+10,52,22,0);ctx.fill();
    for(let k=0;k<4;k++){const fx=hx-s*27+s*k*17,fh=30-Math.abs(k-1.5)*5;ctx.fillStyle=HIS.skin;rrect(ctx,fx-8,hy-fh-4,16,fh+16,8);ctx.fill();ctx.strokeStyle='rgba(120,70,45,.32)';ctx.lineWidth=1.2;rrect(ctx,fx-8,hy-fh-4,16,fh+16,8);ctx.stroke();ctx.fillStyle=HIS.nail;ell(ctx,fx,hy-fh+3,5,6);ctx.fill();ctx.strokeStyle='rgba(120,70,45,.25)';ctx.beginPath();ctx.moveTo(fx-5,hy-fh+16);ctx.lineTo(fx+5,hy-fh+16);ctx.stroke();}
    ctx.save();ctx.translate(hx+s*44,hy-6);ctx.rotate(s*0.5);ctx.fillStyle=HIS.skin;rrect(ctx,-9,-34,18,44,9);ctx.fill();ctx.fillStyle=HIS.nail;ell(ctx,0,-25,5,6);ctx.fill();ctx.restore();}
  ctx.restore();
}
function lkMadina(g,c){
  const r=rng(461);
  paintSky(g,[[0,'#050a1e'],[0.6,'#14204a'],[1,'#2a3a6a']]);stars0(g,r,200,320);
  const dx=c.dx??900;
  lkSoft(g,dx,380,500,200,'#7ad0a0',0.16);
  /* minarets */
  for(const[mx,h]of[[dx-330,330],[dx+300,360],[dx-560,280],[dx+520,300]]){g.fillStyle='#ece6da';g.fillRect(mx-10,470-h,20,h);g.fillStyle='#d8d0c0';for(let k=1;k<4;k++){g.fillRect(mx-15,470-h+k*h/4,30,7);}g.fillStyle='#e9e2d4';g.beginPath();g.moveTo(mx-12,470-h);g.quadraticCurveTo(mx,470-h-50,mx+12,470-h);g.closePath();g.fill();g.fillStyle='#e8c46a';g.fillRect(mx-1.5,470-h-66,3,18);lkSoft(g,mx,470-h+30,50,50,'#fff0c0',0.6);}
  /* the mosque wall and the green dome */
  g.fillStyle='#e9e2d4';g.fillRect(0,400,W,90);for(let k=0;k<20;k++){g.fillStyle='rgba(255,214,150,.55)';g.beginPath();g.moveTo(20+k*66,490);g.lineTo(20+k*66,440);g.arc(42+k*66,440,22,Math.PI,0);g.lineTo(64+k*66,490);g.closePath();g.fill();}
  g.fillStyle='#e9e2d4';g.fillRect(dx-90,330,180,80);
  const gr=g.createRadialGradient(dx-30,260,10,dx,300,110);gr.addColorStop(0,'#5ad08a');gr.addColorStop(0.6,'#1f8a52');gr.addColorStop(1,'#0e5a32');g.fillStyle=gr;g.beginPath();g.moveTo(dx-80,336);g.bezierCurveTo(dx-90,250,dx-30,214,dx,206);g.bezierCurveTo(dx+30,214,dx+90,250,dx+80,336);g.closePath();g.fill();
  g.strokeStyle='rgba(255,255,255,.15)';g.lineWidth=1.5;for(let k=-3;k<=3;k++){g.beginPath();g.moveTo(dx+k*22,336);g.quadraticCurveTo(dx+k*12,250,dx,208);g.stroke();}
  g.fillStyle='#e8c46a';g.fillRect(dx-2,170,4,38);g.beginPath();g.arc(dx,166,9,Math.PI*0.3,Math.PI*1.7);g.arc(dx+4,166,7,Math.PI*1.6,Math.PI*0.4,true);g.closePath();g.fill();
  /* courtyard with umbrellas */
  g.fillStyle=vgrad(g,490,720,[[0,'#ece4d6'],[1,'#c8bea8']]);g.fillRect(0,490,W,230);lkSoft(g,dx,560,600,140,'#fff2d0',0.35);
  for(let k=0;k<6;k++){const ux=dx-500+k*200,uy=520+(k%2)*20,s=0.9+(k%2)*0.1;g.fillStyle='#d8d0c0';g.fillRect(ux-4,uy,8,160);g.fillStyle='#f6f2ea';g.beginPath();g.moveTo(ux-90*s,uy+10);for(let j=0;j<=8;j++){const t=j/8;g.lineTo(ux-90*s+t*180*s,uy+10-Math.sin(t*Math.PI)*16*s+((j%2)?6:0));}g.lineTo(ux,uy-10);g.closePath();g.fill();g.fillStyle='rgba(255,230,180,.5)';g.beginPath();g.moveTo(ux-90*s,uy+10);g.lineTo(ux,uy-10);g.lineTo(ux+90*s,uy+10);g.lineTo(ux,uy+4);g.closePath();g.fill();lkSoft(g,ux,uy+20,80,30,'#fff0c0',0.5);}
}
function lkNightRoom(g,c){
  const r=rng(471);
  g.fillStyle=vgrad(g,0,H,[[0,'#0e1220'],[1,'#1a1a28']]);g.fillRect(0,0,W,H);
  const wx=760,wy=80,ww=320,wh=260;g.fillStyle=vgrad(g,wy,wy+wh,[[0,'#0a1230'],[1,'#22305a']]);g.fillRect(wx,wy,ww,wh);for(let i=0;i<50;i++){g.fillStyle=`rgba(255,250,235,${0.3+r()*0.6})`;g.fillRect(wx+r()*ww,wy+r()*wh*0.7,1.4,1.4);}
  g.fillStyle='#f6efd8';circle(g,wx+ww*0.7,wy+70,22);g.fill();g.fillStyle=vgrad(g,wy,wy+wh,[[0,'#0a1230'],[1,'#22305a']]);circle(g,wx+ww*0.7+9,wy+64,20);g.fill();
  g.fillStyle='#2a2a3a';g.fillRect(wx-12,wy-12,ww+24,12);g.fillRect(wx-12,wy+wh,ww+24,14);g.fillRect(wx-12,wy,12,wh);g.fillRect(wx+ww,wy,12,wh);g.fillRect(wx+ww/2-5,wy,10,wh);
  lkSoft(g,200,300,300,260,'#ffc878',0.35);
  g.fillStyle='#16141c';g.fillRect(0,560,W,160);
}
function lkCallLive(ctx,lt,dt){
  const S=drawPhoneHand(ctx,lt,{x:250,y:70,w:250,h:520,screen:'#101820'});
  ctx.save();rrect(ctx,S.x,S.y,S.w,S.h,S.r);ctx.clip();
  ctx.fillStyle=vgrad(ctx,S.y,S.y+S.h,[[0,'#1c2a3a'],[1,'#0c1018']]);ctx.fillRect(S.x,S.y,S.w,S.h);
  lkSoft(ctx,S.x+S.w/2,S.y+150,160,120,'#e3889f',0.25);
  ctx.fillStyle=vgrad(ctx,S.y+94,S.y+186,[[0,'#f3a7bb'],[1,'#b8527a']]);circle(ctx,S.x+S.w/2,S.y+140,46);ctx.fill();ctx.fillStyle='#ffffff';ctx.font='600 40px "Mulish",sans-serif';ctx.textAlign='center';ctx.fillText('F',S.x+S.w/2,S.y+154);
  ctx.textAlign='center';ctx.fillStyle='#ffffff';ctx.font='600 24px "Mulish",sans-serif';ctx.fillText('Fabeha',S.x+S.w/2,S.y+226);
  const secs=4328+Math.floor(dt);ctx.fillStyle='rgba(255,255,255,.7)';ctx.font='500 15px "Mulish",sans-serif';ctx.fillText(`${Math.floor(secs/3600)}:${String(Math.floor(secs%3600/60)).padStart(2,'0')}:${String(secs%60).padStart(2,'0')}`,S.x+S.w/2,S.y+252);
  for(let k=0;k<3;k++){ctx.fillStyle='rgba(255,255,255,.14)';circle(ctx,S.x+48+k*(S.w-96)/2,S.y+S.h-150,24);ctx.fill();}
  ctx.fillStyle='#e0383e';circle(ctx,S.x+S.w/2,S.y+S.h-74,30);ctx.fill();ctx.strokeStyle='#ffffff';ctx.lineWidth=5;ctx.lineCap='round';ctx.beginPath();ctx.arc(S.x+S.w/2,S.y+S.h-64,14,Math.PI*1.15,Math.PI*1.85);ctx.stroke();
  ctx.restore();phoneTop(ctx,S,{time:'01:12'});
  for(let k=0;k<3;k++){const p=(lt*0.6+k/3)%1;ctx.strokeStyle=`rgba(227,136,159,${0.5*(1-p)})`;ctx.lineWidth=2;circle(ctx,S.x+S.w/2,S.y+140,50+p*40);ctx.stroke();}
}
function lkDesk(g,c){
  const x=lkOX(c),r=rng(481);
  lkRoom(g,{wall:['#2a1e24','#3e2a28'],top:['#5a3622','#2e1a10'],ty:450,lamp:[x+260,140,420],light:'#ffcf8a',seed:482});
  /* the letter */
  g.save();g.translate(x-40,516);g.rotate(-0.06);lkShadow(g,14,20,250,70,0.45);g.fillStyle='#f6eedc';g.fillRect(-220,-110,420,200);g.fillStyle='rgba(200,170,120,.15)';g.fillRect(-220,-110,420,200);
  g.strokeStyle='rgba(40,30,60,.75)';g.lineWidth=1.6;for(let k=0;k<8;k++){g.beginPath();let px=-196,py=-80+k*22;g.moveTo(px,py);while(px<(k===7?-20:170)){const w=8+r()*14;g.bezierCurveTo(px+w*0.3,py-6-r()*6,px+w*0.7,py+6,px+w,py-1+r()*2);px+=w;if(r()<0.12)px+=8;g.moveTo(px,py);}g.stroke();}
  g.fillStyle='#b8283a';heart(g,170,70,8);g.fill();g.restore();
  /* a pen */
  g.save();g.translate(x+190,556);g.rotate(-0.7);lkShadow(g,6,10,90,6,0.4);g.fillStyle='#1e1a24';rrect(g,-90,-7,170,14,7);g.fill();g.fillStyle='#e8c46a';g.fillRect(-40,-7,8,14);g.fillStyle='#c9ccd2';g.beginPath();g.moveTo(80,-6);g.lineTo(104,0);g.lineTo(80,6);g.closePath();g.fill();g.restore();
  /* a paper crown */
  g.save();g.translate(x-150,412);g.rotate(-0.1);lkShadow(g,4,40,80,10,0.4);g.fillStyle=vgrad(g,-50,40,[[0,'#f6d77a'],[1,'#c8963e']]);g.beginPath();g.moveTo(-70,36);g.lineTo(-70,-20);g.lineTo(-44,8);g.lineTo(-22,-40);g.lineTo(0,4);g.lineTo(22,-40);g.lineTo(44,8);g.lineTo(70,-20);g.lineTo(70,36);g.closePath();g.fill();g.fillStyle='#e3889f';for(const px of[-22,22]){circle(g,px,-38,6);g.fill();}g.fillStyle='#9a5cc8';circle(g,0,16,7);g.fill();g.restore();
  /* petals */
  for(let k=0;k<5;k++){g.fillStyle=k%2?'#c84a5e':'#a83246';ell(g,x+40+r()*160,462+r()*40,10,6,r()*3);g.fill();}
}
function lkCorkboard(g,c){
  const r=rng(491);
  g.fillStyle=vgrad(g,0,H,[[0,'#efe4d2'],[1,'#d8c6a8']]);g.fillRect(0,0,W,H);lkBlots(g,492,26,['#fff6e6','#c8b08a'],0,H,80,220,0.22);
  const pol=(cx,cy,rot,paint)=>{g.save();g.translate(cx,cy);g.rotate(rot);lkShadow(g,10,16,120,120,0.35);g.fillStyle='#fbf9f4';g.fillRect(-90,-100,180,206);g.save();g.beginPath();g.rect(-78,-88,156,150);g.clip();paint(-78,-88,156,150);g.restore();g.fillStyle='#d8283a';circle(g,0,-92,7);g.fill();g.fillStyle='rgba(255,255,255,.6)';circle(g,-2,-94,2.5);g.fill();g.restore();};
  const C=[null,[270,200,0.05],[150,450,0.04],[400,460,-0.05]];
  pol(C[1][0],C[1][1],C[1][2],(x,y,w,h)=>{g.fillStyle='#f6efe4';g.fillRect(x,y,w,h);g.fillStyle='#d8963a';rrect(g,x+18,y+20,w-36,h-40,10);g.fill();g.fillStyle='#b8742a';for(let i=0;i<4;i++)for(let j=0;j<4;j++){g.fillStyle='#e8aa52';rrect(g,x+26+i*27,y+28+j*25,20,18,4);g.fill();}g.fillStyle='rgba(140,60,10,.55)';ell(g,x+w/2,y+h/2,30,16);g.fill();});
  pol(C[2][0],C[2][1],C[2][2],(x,y,w,h)=>{g.fillStyle='#e9e4f0';g.fillRect(x,y,w,h);g.fillStyle='#2a2a32';rrect(g,x+38,y+10,80,140,14);g.fill();g.fillStyle='#3a3a44';rrect(g,x+46,y+18,40,44,10);g.fill();for(const[dx,dy]of[[56,30],[74,30],[65,48]]){g.fillStyle='#0e0e12';circle(g,x+dx,y+dy,7);g.fill();g.fillStyle='rgba(120,140,200,.6)';circle(g,x+dx-2,y+dy-2,2);g.fill();}});
  pol(C[3][0],C[3][1],C[3][2],(x,y,w,h)=>{g.fillStyle='#0c0a1e';g.fillRect(x,y,w,h);for(const[fx,fy,col]of[[x+44,y+40,'#ffd27a'],[x+110,y+30,'#ff7ab0'],[x+80,y+64,'#7ad0ff']]){g.strokeStyle=col;g.lineWidth=1.6;for(let k=0;k<14;k++){const a=k/14*TAU;g.beginPath();g.moveTo(fx+Math.cos(a)*5,fy+Math.sin(a)*5);g.lineTo(fx+Math.cos(a)*22,fy+Math.sin(a)*22);g.stroke();}}g.fillStyle='#f4e6c8';g.beginPath();g.moveTo(x+10,y+h);g.lineTo(x+20,y+104);g.lineTo(x+78,y+84);g.lineTo(x+136,y+104);g.lineTo(x+146,y+h);g.closePath();g.fill();g.fillStyle='#ffd27a';for(let k=0;k<12;k++){circle(g,x+20+k*10,y+104-Math.sin(k/11*Math.PI)*18,2);g.fill();}});
  /* a marker */
  g.save();g.translate(560,600);g.rotate(-0.5);lkShadow(g,6,10,80,8,0.35);g.fillStyle='#d8283a';rrect(g,-80,-10,130,20,8);g.fill();g.fillStyle='#f4f1ea';rrect(g,40,-9,40,18,6);g.fill();g.fillStyle='#d8283a';g.beginPath();g.moveTo(80,-5);g.lineTo(96,0);g.lineTo(80,5);g.closePath();g.fill();g.restore();
}
function lkCrossLive(ctx,lt,dt){
  const C=[[270,200,0.05],[150,450,0.04],[400,460,-0.05]];
  C.forEach(([cx,cy,rot],k)=>{const p=clamp((dt-0.7-k*0.35)/0.35);if(p<=0)return;ctx.save();ctx.translate(cx,cy-12);ctx.rotate(rot);ctx.strokeStyle='rgba(216,40,58,.85)';ctx.lineWidth=7;ctx.lineCap='round';
    const seg=(x0,y0,x1,y1,q)=>{if(q<=0)return;ctx.beginPath();ctx.moveTo(x0,y0);ctx.lineTo(lerp(x0,x1,q),lerp(y0,y1,q));ctx.stroke();};
    seg(-60,-58,60,58,clamp(p*2));seg(60,-58,-60,58,clamp(p*2-1));ctx.restore();});
}
function lkGolden(g,c){
  const r=rng(501);
  paintSky(g,[[0,'#f2c48a'],[0.5,'#f6d6a4'],[1,'#e9b07a']]);sunGlow(g,1040,220,520,'rgba(255,246,214,0.85)');
  g.fillStyle=vgrad(g,470,720,[[0,'#8aa04a'],[1,'#4a6a2a']]);g.fillRect(0,470,W,250);
  for(let i=0;i<90;i++){const u=i/90,x=r()*W,y=470+u*u*240,s=10+u*50;g.strokeStyle='#5a8a3a';g.lineWidth=1+u*3;g.beginPath();g.moveTo(x,y+s);g.lineTo(x,y);g.stroke();g.drawImage(SPR.sunflower,x-s/2,y-s/2,s,s);}
}

/* ================================================================== the three scenes ============ */
const LK_AMB_ROOM={room:0.22};
likesScene({id:'likes1',name:'What she loves · sweet things',when:'2026-08-21T19:01',
  note:'a portrait in painted cards, sweets first: paitay ki mithai on a brass thaal, a box of barfi, gulab jamun and cham cham, stew and mutton raan, street food on an ajrak cloth, crumble cookies and donuts, milk, mango milkshake and peach iced tea, olives with cucumber, fruit and dates, and the dish soap she is allergic to (his hands do the washing).',
  tag:'“i love paitay ki mithai”',
  cards:[
    {d:2,side:'L',eye:'her favourite sweet',line:'Paitay ki mithai.',small:'The best. Nothing comes close.',q:[{who:'her',text:'Gulsb jamun , cham cham , i love paitay ki mithai',tag:'27 April'}],qa:1.4,
      n:['Let me tell you what she loves. Sweets first.','Paitay ki mithai is her favourite. The best, she says.'],
      bg:g=>lkRoom(g,{wall:['#f2d9b8','#d9ae80'],top:['#9a5e3a','#4e2a16'],ty:470,win:{x:150,y:50,w:300,h:250},light:'#fff0cc',pool:[380,520,360],seed:11}),obj:lkPetha,oy:490,
      live:(ctx,lt)=>lkTwinkle(ctx,lt,[[300,435,0.1],[420,417,0.5],[470,465,0.8],[350,395,0.3],[520,505,0.65]],'#fff6d8',2.2)},
    {d:1.5,side:'R',eye:'then',line:'Barfi. Gulab jamun. Cham cham.',bs:54,q:[{who:'her',text:'Barfi bhi add kardenw',tag:'27 April'}],
      n:'Then barfi, gulab jamun, cham cham. Her order, for when I came home from Hajj.',
      bg:g=>lkRoom(g,{wall:['#efcfc6','#c99490'],top:['#7b3b2e','#3e1810'],ty:480,lamp:[1050,120,420],light:'#ffdcb0',pool:[900,520,380],seed:12}),obj:lkMithaiBox,oy:470,
      live:(ctx,lt)=>lkTwinkle(ctx,lt,[[850,470,0.2],[930,440,0.6],[990,500,0.9]],'#fff2d0',1.8)},
    {d:1.5,side:'L',eye:'food',line:'Stew, first.',small:'Mutton raan, a close second.',q:[{who:'her',text:'Even tho that\'s my 2nd fav food',tag:'30 August'}],
      n:'Her favourite food is stew. Mutton raan is second. She keeps a ranking.',
      bg:g=>lkRoom(g,{wall:['#e6c49a','#b4865a'],top:['#6f4129','#341a0c'],ty:460,lamp:[120,80,420],light:'#ffd9a0',pool:[380,500,380],seed:13}),obj:lkStewRaan,oy:480,
      live:(ctx,lt)=>lkSteam(ctx,lt,260,480,7,170,190,0.2)},
    {d:1,side:'L',ox:400,tx:790,tw:450,eye:'and also',line:'Seekh kebab, bun kabab, haleem, handi, halwa puri.',bs:42,small:'KFC. Croissants.',
      n:'Seekh kebab, bun kabab, haleem, handi, halwa puri. KFC. Croissants.',
      bg:g=>{lkRoom(g,{wall:['#5a3a2e','#7a4c34'],top:['#6a1820','#3a0c12'],ty:380,grain:false,lamp:[640,60,500],light:'#ffc878',seed:15});bokeh0(g);lkAjrak(g,380);},obj:lkSpread,oy:500,blur:2,amb:{room:0.2,crowd:0.15}},
    {d:3.75,side:'R',ox:960,eye:'sweet, still',line:'Thank you for the crumble.',bs:50,small:'Once in a while, when in Islamabad.',
      n:['When I missed my flight, I lost the crumble cookies I had bought. So she brought me the expensive ones herself.','Thank you for the crumble. Once in a while, when in Islamabad.','The perfume she gave me, its box, and the bag she gave it in, I have kept. With the crumble box.'],
      bg:g=>lkRoom(g,{wall:['#f6dfe2','#e2b6be'],top:['#efe9e6','#c4bab8'],ty:470,grainCol:'#9a8a90',win:{x:960,y:40,w:260,h:240},light:'#fff4ea',pool:[960,520,360],seed:16}),obj:lkCookieBox,oy:470},
    {d:1.5,side:'L',eye:'to drink',line:'Milk. Mango milkshake. Peach iced tea.',bs:50,small:'No chai. No coffee. Ever.',q:[{who:'her',text:'Milkshake tha mango ka',tag:'28 June'}],
      n:'Milk. Mango milkshake. Peach iced tea, which she makes herself. No chai, no coffee.',
      bg:g=>lkRoom(g,{wall:['#fbe9c8','#f0c98e'],top:['#c99a68','#7a4e2a'],ty:500,win:{x:120,y:40,w:420,h:300},light:'#fff4d6',pool:[380,560,380],seed:17}),obj:lkDrinks,oy:470,
      live:(ctx,lt)=>{ctx.save();ctx.globalCompositeOperation='screen';for(let i=0;i<10;i++){const p=(lt*0.35+i/10)%1,bx=510-30+((i*37)%60),by=560-p*150;ctx.fillStyle=`rgba(255,240,220,${0.5*Math.sin(p*Math.PI)})`;circle(ctx,bx,by,2+((i*7)%3));ctx.fill();}ctx.restore();}},
    {d:1.5,side:'R',eye:'at midnight',line:'Olives, with cucumber.',q:[{who:'her',text:'Also olives are super good. Warna Allah tala woukd have never talked about in quran, he swears on olives',tag:'19 May'}],
      n:'Olives with cucumber, at midnight. And she has a reason for it.',
      bg:g=>lkRoom(g,{wall:['#2f2a33','#4a3a36'],top:['#4a3020','#22140a'],ty:400,lamp:[1060,90,460],light:'#ffd290',pool:[900,520,380],seed:18}),obj:lkOlives,dy:-44,oy:470,amb:{room:0.12,hum:0.12}},
    {d:1,side:'L',eye:'instead of sugar',line:'Fruit, and dates.',small:'Sugar? Only the natural kind. (And mithai.)',
      n:'Not much sugar, she says. Fruit, or dates. And mithai, apparently.',
      bg:g=>lkRoom(g,{wall:['#f4e3c4','#dcb98a'],top:['#a4703f','#5a3618'],ty:470,win:{x:120,y:50,w:300,h:240},light:'#fff2d0',pool:[380,540,380],seed:19}),obj:lkDates,oy:500},
    {d:1.5,side:'R',ox:880,tw:520,eye:'and one more',line:'Allergic to dishwashing soap.',bs:50,small:'“Dishwasher se allergy”, in my notes',q:[{who:'her',text:'Also do you know im allergic to dishwashinh soaps like i cant use them at all',tag:'23 January'}],
      n:['And she is allergic to dishwashing soap. It went straight onto my list.','So the dishes are mine.'],
      bg:lkSink,blur:1.5,oy:520,live:(ctx,lt)=>{lkSinkHands(ctx,lt,880);ctx.save();ctx.globalCompositeOperation='screen';for(let i=0;i<12;i++){const p=(lt*0.18+i/12)%1,bx=760+((i*53)%260)+Math.sin(p*6+i)*14,by=520-p*300;ctx.strokeStyle=`rgba(255,255,255,${0.6*Math.sin(p*Math.PI)})`;ctx.lineWidth=1.4;circle(ctx,bx,by,5+((i*5)%9));ctx.stroke();ctx.fillStyle=`rgba(190,220,255,${0.25*Math.sin(p*Math.PI)})`;ctx.fill();}ctx.restore();},amb:{room:0.15,rain:0.18}},
  ],
  score({bars,melody,hit,THEME_B}){
    bars(0,15,['G','Em7','Cmaj7','Dsus'],{padVel:0.34,arp:true,arpVel:0.1,step:1});
    for(let b=2;b<10;b++)melody(b,b-2,'box',12,0.3,THEME_B);
    for(let b=10;b<15;b++)melody(b,b-6,'flute',0,0.26,THEME_B);
  },
});
function bokeh0(g){const r=rng(19);for(let i=0;i<40;i++){const x=r()*W,y=40+r()*260,R=6+r()*16;lkSoft(g,x,y,R,R,['#ffd27a','#ffb37a','#fff2d0'][i%3],0.6);}g.strokeStyle='rgba(40,20,10,.5)';g.lineWidth=1;g.beginPath();for(let x=0;x<=W;x+=40)g.lineTo(x,60+Math.sin(x*0.006)*30);g.stroke();}

likesScene({id:'likes2',name:'What she loves · the things she loves',when:'2026-08-21T19:02',
  note:'purple, gold, maroon and pink with bangles, rings, a small bag and a soft perfume; his photograph of the scents he collected for her; the gym at 6:30; a concert with her in the front row; the sea; rain over Islamabad and the Margallas; the aurora, her dream trip; sudoku, Scrabble, badminton; chess, only in person; one day a rabbit; From, Mirzapur, Bridgerton and books; Black–Scholes and crop futures on a chalkboard; her pocket money for orphan kids’ schooling.',
  tag:'“It\'s purple , gold , maroon”',
  cards:[
    {d:1.5,side:'L',eye:'her colours',line:'Purple, gold, maroon. And pink.',bs:54,small:'Bangles, rings, small cute bags.',q:[{who:'her',text:'It\'s purple , gold , maroon',tag:'25 January'}],
      n:['Her colours: purple, gold, maroon. And pink.','Bangles, rings, small cute bags. Perfume so soft it never fills the room.'],
      bg:g=>{g.fillStyle=vgrad(g,0,H,[[0,'#3a2038'],[1,'#5a2c40']]);g.fillRect(0,0,W,H);lkSoft(g,300,200,500,300,'#ffcf9a',0.25);},blur:0,obj:lkVanity,oy:480,
      live:(ctx,lt)=>lkTwinkle(ctx,lt,[[300,440,0.1],[360,470,0.5],[230,500,0.8],[470,600,0.3],[520,430,0.7]],'#fff2c8',2)},
    {d:2.5,side:'R',eye:'scents',line:'She recognises people by their scent.',bs:50,small:'So I built a whole collection, so we could smell and rate them together.',
      n:['She recognises people by their scent. So I made a whole collection of them, because of her.','So that we could both smell them, and rate them, together.'],
      bg:g=>{g.fillStyle=vgrad(g,0,H,[[0,'#1a1322'],[0.6,'#2c1c30'],[1,'#3a2434']]);g.fillRect(0,0,W,H);lkBlots(g,61,16,['#5a3050','#2a1a30','#7a4a60'],0,H,80,240,0.14);lkSoft(g,926,385,560,440,'#ffd3a0',0.22);},blur:0,scrim:0.42,oy:385,
      live:(ctx)=>lkPhoto(ctx,lkImg('scents.jpg'),612,150,628,471,14)},
    {d:1,side:'R',eye:'almost every day',line:'The gym.',small:'Leg day is not negotiable.',q:[{who:'her',text:'Gym jana hai so no sona 😜',tag:'30 January, 4:42 am'}],qa:0.7,
      n:'The gym, almost every day. She skips sleep, not leg day.',
      bg:lkGym,blur:3,obj:lkGymProps,dy:-46,oy:500,amb:{room:0.25}},
    {d:1.5,side:'L',eye:'concerts',line:'Always in front.',q:[{who:'her',text:'I go always agay in concerts toh peechw walon ko kabhi dekha nhi😂😂😂😂😂😂',tag:'27 January'}],
      n:'Concerts. Always the front row. She has never once seen the people at the back.',
      bg:lkConcert,blur:2,scrim:0.4,oy:330,live:(ctx,lt,dt)=>lkConcertLive(ctx,lt,dt),amb:{crowd:0.6,room:0}},
    {d:1,side:'R',eye:'the sea',line:'The beach.',small:'And swimming in it.',
      n:'The beach. The sea. Swimming in it.',
      bg:lkBeach,blur:0,scrim:0.4,oy:420,live:(ctx,lt)=>lkBeachLive(ctx,lt),amb:{waves:0.7,wind:0.25,room:0}},
    {d:1,side:'L',eye:'weather, places',line:'Rain. Islamabad. Hikes.',bs:52,small:'“Malam jabba was soo funn”',
      n:'Rain, Islamabad, hikes. And Malam Jabba: so fun, she says.',
      bg:lkIsb,blur:1.5,oy:430,live:(ctx,lt)=>lkRainLive(ctx,lt,220,343,0.4),amb:{rain:0.8,wind:0.2,room:0}},
    {d:1,side:'R',eye:'one day',line:'The aurora.',small:'Her dream trip.',
      n:'And one day, the aurora. Her dream trip.',
      bg:lkAuroraBg,blur:0,scrim:0.36,oy:400,live:(ctx,lt)=>{stars(ctx,lt,220,352,H*0.6,0.8);aurora(ctx,lt,1);},amb:{wind:0.35,room:0}},
    {d:1,side:'L',eye:'games',line:'Sudoku. Scrabble. Badminton.',bs:52,q:[{who:'her',text:'I like sudoko',tag:'30 January'}],qa:0.7,
      n:'Her favourite game is sudoku. Then Scrabble, and badminton.',
      bg:g=>lkRoom(g,{wall:['#e8d3b0','#c9a676'],top:['#8a5a36','#4a2c16'],ty:380,win:{x:860,y:30,w:280,h:220},light:'#fff2d0',seed:21}),obj:lkGames,dy:-34,oy:480},
    {d:1,side:'R',eye:'chess',line:'Only if I teach her.',small:'In person. Her rule.',q:[{who:'her',text:'AP IN PERSON SIKHA DENA',tag:'30 January'}],qa:0.7,
      n:'Chess, but only if I teach her. In person. Her rule.',
      bg:g=>lkRoom(g,{wall:['#2a1e1a','#3f2c22'],top:['#3a2416','#1a0e06'],ty:420,lamp:[640,40,520],light:'#ffd290',seed:22}),obj:lkChess,dy:-56,oy:470},
    {d:1,side:'L',eye:'one day',line:'A rabbit.',small:'When life settles, she says.',
      n:'And one day, a rabbit. When life settles, she says.',
      bg:lkGarden,blur:2.5,scrim:0.4,oy:480,live:(ctx,lt)=>lkRabbit(ctx,lt,360,500),amb:{wind:0.15,room:0}},
    {d:2,side:'R',tw:520,eye:'her film',line:'Spirited Away.',bs:56,small:'Her favourite. She respects the artist too much to ever have joined the Ghibli trend.',
      n:['Her favourite film is Spirited Away.','She respects the man who drew it so much that she never once made the Ghibli trend. Not one picture.'],
      bg:lkTvRoom,blur:0,oy:330,live:(ctx,lt)=>{const f=0.5+0.5*Math.sin(lt*3.1)*Math.sin(lt*1.7);ctx.save();ctx.globalCompositeOperation='screen';lkSoft(ctx,900,320,300,220,'#6a8ad0',0.12*f);ctx.restore();},amb:{room:0.2,hum:0.1}},
    {d:1.5,side:'L',eye:'maths, for fun',line:'Quant finance. Black–Scholes.',bs:52,small:'Epidemiology. A trading bot for crop futures.',q:[{who:'her',text:'Ours target is futures over crops',tag:'15 May'}],
      tx:826,tw:400,n:['And maths. Quant finance, Black–Scholes, epidemiology.','Her idea: a trading bot for crop futures.'],
      bg:lkChalk,blur:0,scrim:0.5,oy:300},
    {d:1.5,side:'R',eye:'quietly',line:'Her pocket money goes to orphan kids.',bs:50,q:[{who:'her',text:'Like i lit work for these orphan kids',tag:'23 January'},{who:'her',text:'By supporting them in education',tag:'23 January'}],
      n:['And her pocket money goes to orphan kids, for their schooling.','That went on my list too.'],
      bg:g=>lkRoom(g,{wall:['#f2e2c4','#d6b689'],top:['#9a6a3e','#523218'],ty:470,win:{x:900,y:40,w:300,h:260},light:'#fff2d0',pool:[900,560,380],seed:23}),obj:lkSchool,oy:520},
  ],
  score({bars,melody,hit,THEME_B}){
    bars(0,17,['Cmaj7','G','Em7','Dsus'],{padVel:0.34,arp:true,arpVel:0.11,step:0.5});
    for(let b=1;b<9;b++)melody(b,b-1,'box',12,0.3,THEME_B);
    for(let b=9;b<17;b++)melody(b,b-5,'pluck',12,0.24,THEME_B);
    hit(6.3*BAR,'swell',{dur:1.2,vel:0.25});
  },
});

likesScene({id:'likes3',name:'What she loves · how she wants to be loved',when:'2026-08-21T19:03',fout:['#000000',1.6],
  note:'small, thoughtful gifts (the birthday page, foreign coins, keychains, paper flowers; a tasbih, Zamzam, the bracelet and necklace) and the best one, a dua from the Haram; then how she wants to be loved: respect above everything, actions not words, “hajj wala fazul”, serious things on a call, hype and poetry, the few things she won’t have (crowds, waffles, iPhones, fireworks at weddings), and to be loved exactly as she is.',
  tag:'“just respect, that\'s it”',
  cards:[
    {d:1.5,side:'L',eye:'gifts that worked',line:'Small, and thoughtful.',small:'The birthday page. Coins for her collection. Keychains. Paper flowers.',q:[{who:'her',text:'Ayeeee i love those',tag:'12 August · paper flowers'}],
      n:['Small gifts worked best. The birthday page. Foreign coins, she collects them.','Keychains, the purple one most. Paper flowers.'],
      bg:g=>lkRoom(g,{wall:['#e9c6a8','#c49270'],top:['#7a4a3a','#3a2018'],ty:430,win:{x:860,y:40,w:300,h:240},light:'#ffe8c8',pool:[380,500,380],seed:31}),obj:lkGifts,dy:-40,oy:450},
    {d:1,side:'R',eye:'and',line:'A tasbih. Zamzam.',small:'The bracelet and the necklace.',
      n:'A tasbih. Zamzam water. A bracelet and a necklace, on our first date.',
      bg:g=>lkRoom(g,{wall:['#ecd2bc','#c8a080'],top:['#6a4030','#341c10'],ty:350,lamp:[1100,80,420],light:'#ffe2b8',pool:[900,440,400],seed:32}),obj:lkTray,dy:-84,oy:440,
      live:(ctx,lt)=>lkTwinkle(ctx,lt,[[800,492,0.2],[1010,436,0.6],[880,416,0.9]],'#fff2c8',1.8)},
    {d:1.5,side:'L',ox:470,kx:470,tx:760,tw:440,eye:'the best one',line:'A dua.',small:'Mine, during Hajj.',q:[{who:'her',text:'Tbh this is the best gift you\'ve given me 🥰🥰🥰🥰🥰🥰',tag:'26 April'}],
      n:'But the best gift, she said, wasn’t a thing. It was my duas, during Hajj.',
      bg:lkHaram,blur:0,scrim:0.4,oy:420,live:(ctx,lt,dt,c)=>lkHaramLive(ctx,lt,c),amb:{crowd:0.25,room:0.1}},
    {d:1.5,side:'R',eye:'how she wants to be loved',line:'Respect, above everything.',bs:54,q:[{who:'her',text:'The only thing i ever want from you is just respect, that\'s it.',tag:'3 August'}],
      n:'How does she want to be loved? Respect, above everything else.',
      bg:lkSill,blur:0,oy:470,live:(ctx,lt)=>{lkSteam(ctx,lt,960,410,5,40,120,0.18);motes(ctx,lt,24,452,'#ffe8c0',1.3,0.4);}},
    {d:1.5,side:'L',eye:'and',line:'Actions, not words.',q:[{who:'her',text:'Actions se lol',tag:'3 September'},{who:'her',text:'Batein har koi karleta hai🤣',tag:'3 September'}],
      n:'Actions, not words. Anyone can talk, she says.',
      bg:g=>{lkRoom(g,{wall:['#5a3a30','#8a5a40'],top:['#4a2c1c','#1e1008'],ty:640,grain:false,lamp:[380,200,520],light:'#ffc878',seed:33});bokeh0(g);},blur:4,oy:500,
      live:(ctx,lt)=>lkBoxHands(ctx,lt,380)},
    {d:1.5,side:'R',dx:900,eye:'she misses',line:'Hajj wala Fazul.',q:[{who:'her',text:'I in genuine miss hajj wala fazul',tag:'4 July'},{who:'her',text:'Ap bro makkah madina mein hi raha karo🤭🤭🤭🤭🤭🤭🤭🤨',tag:'4 July'}],
      n:['She misses the Fazul from Hajj.','She liked how I talked to her from Makkah and Madina.'],
      bg:lkMadina,blur:0,scrim:0.42,oy:380,live:(ctx,lt)=>motes(ctx,lt,30,462,'#ffeec8',1.3,0.35),amb:{room:0.12,wind:0.1}},
    {d:1,side:'L',tx:640,tw:540,eye:'the serious things',line:'On a call. Never over text.',bs:54,
      n:'Anything serious: on a call. Never over text.',
      bg:lkNightRoom,blur:0,scrim:0.3,oy:330,live:(ctx,lt,dt)=>lkCallLive(ctx,lt,dt),amb:{room:0.25}},
    {d:1.5,side:'R',eye:'and',line:'Hype her up. Write her poems.',bs:52,q:[{who:'her',text:'Okay my hype queen 😂',tag:'23 July'}],
      n:['Before her paper I hyped her up. She called me her hype queen.','And write her poetic messages. Long ones.'],
      bg:lkDesk,blur:0,oy:470,live:(ctx,lt)=>{ctx.save();ctx.beginPath();ctx.rect(640,0,640,H);ctx.clip();confetti(ctx,lt,40,483,['#e3889f','#cf9a34','#9a5cc8','#ffffff']);ctx.restore();}},
    {d:2,side:'L',tx:600,tw:560,eye:'apki zidd',line:'You don’t like waffles. Apki zidd jo hai!',bs:44,small:'Apki zidd: iPhone bhi nahi lena hai! Xanders bhi nahi. Aur shadi ke fireworks pe kharcha karna, you hate.',
      n:['You don’t like waffles. Apki zidd jo hai!','Apki zidd: iPhone bhi nahi lena hai! Xanders bhi nahi. Aur shadi ke fireworks pe kharcha karna, you hate.'],
      bg:lkCorkboard,blur:0,scrim:0,ink:'dark',oy:330,live:(ctx,lt,dt)=>lkCrossLive(ctx,lt,dt)},
    {d:2.5,side:'R',tw:560,bs:46,eye:'what she loves, above all',line:'Being noticed. Things taken care of. Respected, super.',
      n:['What she loves, above all: being noticed.','Things being taken care of.','And being respected. Super respected.'],
      bg:lkGolden,blur:4,scrim:0.4,oy:300,live:(ctx,lt,dt)=>{drawFabeha(ctx,900,392,1.48,{t:lt,outfit:'sage',hair:'down',pose:'bust',arms:'lap',smile:0.92,eyes:(dt>1.4&&dt<2.6)?'happy':undefined,look:-0.12,blush:0.4,wind:0.25,tilt:-0.04+Math.sin(lt*0.6)*0.02,len:230});motes(ctx,lt,40,502,'#fff1c4',1.5,0.5);},amb:{wind:0.18,room:0}},
  ],
  score({bars,melody,hit,THEME_B,THEME_B_CH}){
    bars(0,14,THEME_B_CH,{strings:true,padVel:0.36});
    for(let b=0;b<8;b++)melody(b,b,'box',12,0.3,THEME_B);
    for(let b=8;b<13;b++)melody(b,b-8,'flute',0,0.28,THEME_B);
    hit(12.5*BAR,'chime',{midi:79,vel:0.35});hit(13*BAR,'chime',{midi:83,vel:0.3});
  },
});
