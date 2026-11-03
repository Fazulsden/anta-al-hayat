/* sep3.js — after 6 September: what happened on the call, and what he has to say to her (see notes/AUTHORING.md).
   Four scenes straight after `sixsep`, in his own words: the same dark room, her large in the frame and listening;
   his lines held big across the frame; his three real notes ("What happened", 7 September 2026, 02:44); the honesty
   cards; the questions and the gifts he never got to give; and "please, don't be". */
'use strict';

/* ---------- images: loaded once, drawn only when they have arrived ---------- */
const S3_IMG={};
function s3_img(name){if(!S3_IMG[name]){const im=new Image();im.src='photos/'+name;S3_IMG[name]=im;}return S3_IMG[name];}
function s3_ready(im){return !!(im&&im.complete&&im.naturalWidth);}
const S3_NOTE_TOP=0.115;                      /* the screenshots' status bar + the Notes toolbar, cropped off the top */
function s3_noteCrop(im){const ok=s3_ready(im),nw=ok?im.naturalWidth:592,nh=ok?im.naturalHeight:1280,top=Math.round(nh*S3_NOTE_TOP);return[0,top,nw,nh-top];}

/* a photograph fit to a height, centred at (cx,cy), a soft shadow, a push-in by z; crop = [sx,sy,sw,sh] in image pixels */
function s3_photo(ctx,im,a,z,o={}){
  if(a<=0)return;const ok=s3_ready(im);
  const[sx,sy,sw,sh]=o.crop||[0,0,ok?im.naturalWidth:720,ok?im.naturalHeight:1280];
  const h=(o.h??600)*(z||1),w=h*sw/sh,cx=o.cx??640,cy=o.cy??H/2,x=cx-w/2,y=cy-h/2,r=o.r??9;
  ctx.save();ctx.globalAlpha=a;
  ctx.shadowColor='rgba(0,0,0,.75)';ctx.shadowBlur=48;ctx.shadowOffsetY=14;ctx.fillStyle='#07070a';rrect(ctx,x,y,w,h,r);ctx.fill();
  ctx.shadowColor='rgba(0,0,0,0)';ctx.shadowBlur=0;ctx.shadowOffsetY=0;
  if(ok){ctx.save();rrect(ctx,x,y,w,h,r);ctx.clip();ctx.drawImage(im,sx,sy,sw,sh,x,y,w,h);ctx.restore();}
  else{ctx.fillStyle='#14131a';rrect(ctx,x,y,w,h,r);ctx.fill();}
  ctx.strokeStyle='rgba(255,255,255,.09)';ctx.lineWidth=1;rrect(ctx,x+0.5,y+0.5,w-1,h-1,r);ctx.stroke();
  ctx.restore();
}

/* ---------- a line of his, big across the frame; a = presence 0..1 ---------- */
function s3_big(ctx,text,a,o={}){
  if(a<=0)return;
  const cy=o.y??320,size=o.size??58,lh=Math.round(size*1.22),maxW=o.maxW??1000,cx=o.x??640,rise=(1-a)*12;
  ctx.save();ctx.globalAlpha=a;
  if(o.dark){ctx.fillStyle=`rgba(3,3,7,${o.dark.toFixed(3)})`;ctx.fillRect(0,0,W,H);}
  ctx.font=`${o.italic?'italic ':''}600 ${size}px "Cormorant Garamond",serif`;
  let mw=maxW,lines=wrapText(ctx,text,mw);
  if(lines.length>1)while(mw>360){const t=wrapText(ctx,text,mw-20);if(t.length>lines.length)break;mw-=20;lines=t;}
  const th=lines.length*lh;
  if(o.glow!==false){ctx.save();ctx.globalCompositeOperation='screen';glow(ctx,cx,cy,Math.max(360,mw*0.6),o.glowCol||'#ffb27a',0.11);ctx.restore();}
  ctx.textAlign='center';ctx.textBaseline='middle';
  ctx.shadowColor='rgba(255,186,140,.5)';ctx.shadowBlur=22;ctx.fillStyle=o.col||'#fff4e6';
  for(let k=0;k<lines.length;k++)ctx.fillText(lines[k],cx,cy-th/2+lh/2+k*lh+rise);
  ctx.shadowBlur=0;
  if(o.label){ctx.font='600 13px "Mulish",sans-serif';setLS(ctx,'4px');ctx.fillStyle='rgba(255,214,190,.8)';ctx.fillText(o.label.toUpperCase(),cx,cy-th/2-22+rise);setLS(ctx,'0px');}
  ctx.restore();
}

/* ---------- the dark room of 6 September, a little after the call ---------- */
function s3_room(){const c=mk(W,H),g=c.getContext('2d');
  g.fillStyle=vgrad(g,0,H,[[0,'#07070d'],[0.6,'#0f0c13'],[1,'#141016']]);g.fillRect(0,0,W,H);
  /* the curtained window on the left, a wardrobe on the right, the bed's edge */
  g.fillStyle='#1b151c';g.fillRect(60,40,230,500);g.fillStyle='#120d12';g.fillRect(74,54,202,486);g.fillStyle='#6a5a44';circle(g,258,300,5);g.fill();
  g.fillStyle='#17121a';g.fillRect(1030,30,230,560);g.fillStyle='#120e14';g.fillRect(1044,44,96,532);g.fillRect(1150,44,96,532);g.fillStyle='#4d4038';circle(g,1136,320,3);g.fill();circle(g,1154,320,3);g.fill();
  g.fillStyle='#1c1720';g.beginPath();g.moveTo(0,560);g.quadraticCurveTo(640,520,W,560);g.lineTo(W,720);g.lineTo(0,720);g.closePath();g.fill();
  g.fillStyle='#2a2230';ell(g,760,560,180,40);g.fill();g.fillStyle='#241d2a';ell(g,620,600,260,46);g.fill();
  return c;}
/* the edges of the frame fall away into the dark */
function s3_vignette(){const c=mk(W,H),g=c.getContext('2d');
  const v=g.createRadialGradient(640,340,220,640,340,820);v.addColorStop(0,'rgba(3,3,8,0)');v.addColorStop(0.6,'rgba(3,3,8,.35)');v.addColorStop(1,'rgba(3,3,8,.9)');g.fillStyle=v;g.fillRect(0,0,W,H);
  return c;}
/* a dark warm ground for the text cards, a little light in it; seed changes where the light sits */
function s3_ground(seed){const c=mk(W,H),g=c.getContext('2d'),r=rng(seed),cool=seed%2===0;
  g.fillStyle=vgrad(g,0,H,cool?[[0,'#090810'],[0.55,'#140f18'],[1,'#1e1418']]:[[0,'#0c0910'],[0.55,'#1a1016'],[1,'#2a1a16']]);g.fillRect(0,0,W,H);
  glow(g,cool?320:900,cool?200:160,640,cool?'#8a5a3a':'#c8783c',0.16);glow(g,cool?960:300,cool?620:600,560,cool?'#5a3a4a':'#7a3c3a',0.14);
  g.strokeStyle='rgba(255,220,190,.035)';g.lineWidth=1.2;
  for(let i=0;i<180;i++){const x=r()*W,y=r()*H,l=20+r()*90,a=(r()-0.5)*0.5;g.beginPath();g.moveTo(x,y);g.lineTo(x+Math.cos(a)*l,y+Math.sin(a)*l);g.stroke();}
  return c;}

/* her, large in the middle of the frame, lit softly and warmly, listening; the lower body falls into the dark */
function s3_her(ctx,lt,A,o){
  const L=o.light??1,y=(o.y??372)+2*Math.sin(lt*0.9);
  glow(ctx,640,300,560,'#ffb27a',0.2*L);glow(ctx,700,250,300,'#ffd0a0',0.14*L);
  drawFabeha(ctx,640,y,o.scale??1.55,{t:lt,outfit:'home',hair:'down',pose:'bust',look:o.look??0,smile:o.smile??0.2,brow:o.brow??0,tilt:o.tilt??0,blush:o.blush??0.3,len:230,wind:0.02,eyes:o.eyes});
  ctx.fillStyle=`rgba(255,200,150,${(0.05*L).toFixed(3)})`;ctx.fillRect(0,0,W,H);
  ctx.fillStyle=vgrad(ctx,490,720,[[0,'rgba(7,7,13,0)'],[0.72,'rgba(7,7,13,1)'],[1,'rgba(7,7,13,1)']]);ctx.fillRect(0,490,W,230);
  ctx.drawImage(A.vig,0,0);
  motes(ctx,lt,22,s3_seedOf(o),'#ffc89a',1.1,0.4);
}
function s3_seedOf(o){return o.seed||907;}

/* ================================================================================================
   6 September, a quarter to midnight — "What happened that day"
   ================================================================================================ */
/* the lines he holds big across a black frame (also narration); the third is one screen in three parts, the part she told him larger */
const S3_WH_BIG=[
  {at:21.0,until:27.6,text:'The very thing you hated me for was the very thing I hated in myself, us waqt.',size:60,y:318},
  {at:28.0,until:34.4,text:'And for this, the only witness that matters to me is my Hajj. And mera ALLAH, jisne mujhe bulaya tha.',size:56,y:318},
];
const S3_WH_NOTES=[
  {at:40.6,text:'I even have notes.',size:46,y:176},
  {at:42.4,text:'You told me: write it down thirty minutes before sleeping.',size:66,y:322},
  {at:46.0,text:'I am glad this is what I did.',size:46,y:472},
];
scene({id:'whathappened',name:'What happened that day',when:'2026-09-06T23:45',bars:20,fin:['#000000',1.4],fout:['#000000',1.6],
  note:'the same dark room, later. Fabeha large in the frame and lit softly, listening, a small frown that softens while he tells her what the tease did to him; three of his lines held big across a black frame — the one about the Hajj, and the notes she told him to write, her part of it larger; then the three screenshots of his own note, “What happened”, written at 02:44 on 7 September, lifted into the frame one after another.',
  tag:'“What happened” · 7 September 2026, 02:44',
  prep(){return{room:s3_room(),vig:s3_vignette(),notes:[s3_img('note1.jpg'),s3_img('note2.jpg'),s3_img('note3.jpg')]};},
  draw(ctx,lt,A){
    /* the black screens: the two big lines back to back (21–34.4), then the notes screen that stays black into the photos */
    const dark=Math.max(smooth(21.0,21.7,lt)*(1-smooth(34.0,34.7,lt)),smooth(40.0,40.7,lt));
    const toNotes=smooth(50.6,51.4,lt);
    /* the room and her */
    ctx.drawImage(A.room,0,0);
    const soft=smooth(6,34,lt);
    s3_her(ctx,lt,A,{light:1-0.85*dark,look:0.05*Math.sin(lt*0.5),smile:lerp(0.1,0.3,soft),brow:lerp(-0.4,0.12,soft),tilt:0.03*Math.sin(lt*0.37)+0.02,seed:907});
    if(dark>0){ctx.fillStyle=`rgba(3,3,7,${(0.96*dark).toFixed(3)})`;ctx.fillRect(0,0,W,H);}
    for(const b of S3_WH_BIG)s3_big(ctx,b.text,smooth(b.at+0.2,b.at+0.9,lt)*(1-smooth(b.until-0.7,b.until-0.1,lt)),{y:b.y,size:b.size,maxW:1000});
    /* the notes screen: three parts, each staying as the next arrives */
    const nOut=1-smooth(50.6,51.2,lt);
    for(const b of S3_WH_NOTES)s3_big(ctx,b.text,smooth(b.at,b.at+0.7,lt)*nOut,{y:b.y,size:b.size,maxW:1000});
    /* the notes */
    if(toNotes>0){
      ctx.fillStyle=`rgba(3,3,7,${(0.97*toNotes).toFixed(3)})`;ctx.fillRect(0,0,W,H);
      glow(ctx,640,360,620,'#c89a6a',0.12*toNotes);
      /* each note comes in over the one before it (no dip to black between them); the one underneath is dropped once it is covered */
      const T0=[51.2,56.1,61.0],T1=[56.1,61.0,67.0];
      for(let k=0;k<3;k++){const a=smooth(T0[k]-0.3,T0[k]+0.5,lt)*(1-smooth(T1[k]+0.5,T1[k]+0.8,lt));if(a<=0)continue;
        const z=1+0.06*smooth(T0[k],T1[k],lt);
        s3_photo(ctx,A.notes[k],a*toNotes,z,{h:H-26,cy:H/2-2,crop:s3_noteCrop(A.notes[k]),r:12});}
    }
  },
  subs:[
    [0.8,6.0,'What happened that day. You teased me, with your love language: you sound like mein flashy kapre phenogi.'],
    [6.4,11.4,'And that sentence. I hated that Fazul. No one has the right to say flashy kapre phenogi to you.'],
    [11.8,17.2,'And I started crying, because: mein aise kaise bologa, bro? The very Fazul you hate is the Fazul I hated.'],
    [17.6,20.8,'Please know: your four things, I had memorised them.'],
    [21.6,27.0,'The very thing you hated me for was the very thing I hated in myself, us waqt.'],
    [28.4,33.8,'And for this, the only witness that matters to me is my Hajj. And mera ALLAH, jisne mujhe bulaya tha.'],
    [35.0,39.8,'That day I never commented on your clothes. I cried because I cannot character-assassinate you.'],
    [40.8,42.6,'I even have notes.'],
    [42.8,47.0,'You told me: write it down thirty minutes before sleeping.'],
    [47.2,50.4,'I am glad this is what I did.'],
  ],
  score({add,T,pad}){
    const line=(bar,seq,vel)=>{let beat=0;for(const[m,d]of seq){if(m)add(T(bar,beat),'piano',{midi:m,dur:d*BEAT*1.6,vel});beat+=d;}};
    const ch=['Em','Cmaj7','G','Dsus','Em7','Am7','Cadd9','Dsus'];
    const quiet=b=>(b>=6&&b<10)||(b>=12&&b<15);                 /* the black screens: bars 6–10 and 12–15 */
    for(let b=0;b<20;b++)pad(T(b),quiet(b)?(b%2?'Em7':'Em'):ch[b%8],1.05,quiet(b)?0.12:b>=15?0.16:0.2,'pad');
    line(1,[[64,2],[67,1],[71,1]],0.3);line(2,[[69,3],[67,1]],0.28);line(3,[[64,2],[62,1],[64,1]],0.28);line(4,[[59,4]],0.26);
    line(6,[[52,4]],0.22);line(7,[[0,2],[55,2]],0.2);line(8,[[52,4]],0.2);line(9,[[0,2],[59,2]],0.18);
    line(10,[[64,2],[67,1],[71,1]],0.3);line(11,[[72,2],[71,1],[69,1]],0.28);
    line(12,[[67,4]],0.2);line(13,[[0,2],[64,2]],0.18);line(14,[[62,4]],0.18);
    line(15,[[71,2],[0,1],[69,1]],0.2);line(16,[[67,3],[0,1]],0.18);line(17,[[64,2],[0,1],[62,1]],0.18);line(18,[[59,4]],0.16);
  },
  amb(lt){return{room:lt<51?0.22:0.16};},
});

/* ================================================================================================
   Honesty — four cards
   ================================================================================================ */
const S3_HONESTY=[
  {at:0.8,until:8.0,text:'Fabeha, I am not invalidating your feelings, and I am not gaslighting you. I am only coming to you with honesty.'},
  {at:8.5,until:14.9,text:'I know I am wrong in places. Things you may not have noticed, but I have. And I am working on them.'},
  {at:15.4,until:22.2,text:'I should have been patient. But when you said you are fine, that was the minute I knew something had gone wrong.'},
  {at:22.7,until:32.1,text:'The only khayal I had was your nani, since you had told me I have to take care of you in situations like these. I thought apki nani ki tabiyat aur zyada kharab ho gayi hai.'},
  {at:32.6,until:44.4,text:'My second thought was that someone was harassing you. And that Rizwan ka beta would be dealt with, since at that time you were with me, and hence my izzat. I am trying to get hold of him; he has harassed other girls as well.'},
  {at:45.0,until:52.2,text:'All of this was running in my head. And I was being there for you every three or four days, to reassure you: I am here for you.'},
  {at:53.8,until:60.6,text:'I am not putting any pressure on you about us getting back together. I firmly believe it has to be your decision.'},
  {at:61.1,until:69.9,text:'But chhod ke nahi jaana tha. Hum dono ko saath mein mil ke sab solve karna tha. I became vulnerable because aap ne hi bola tha: that is what partners are for.'},
  {at:70.4,until:80.6,text:'My love for you was paak. I always wanted to marry you, and with the best conditions. I had discussed it with my parents, and I had planned to introduce you to them on 5 December.'},
];
scene({id:'honesty',name:'Honesty',when:'2026-09-06T23:46',bars:25,fin:['#000000',1.2],fout:['#000000',1.2],
  note:'text cards on a dark warm ground with a little light in it, one at a time, each held long enough to read: not invalidating, not gaslighting, only honesty; wrong in places and working on them; what went through his head the minute she said she was fine — her nani, someone harassing her — and being there every three or four days; then a fresh screen — no pressure, it has to be her decision; chhod ke nahi jaana tha; and the plan he had made for 5 December.',
  tag:'“I am only coming to you with honesty.”',
  prep(){return{g1:s3_ground(41),g2:s3_ground(42)};},
  draw(ctx,lt,A){
    const second=smooth(52.4,53.4,lt);
    ctx.drawImage(A.g1,0,0);
    if(second>0){ctx.save();ctx.globalAlpha=second;ctx.drawImage(A.g2,0,0);ctx.restore();}
    const lx=640+180*Math.sin(lt*0.11),ly=230+40*Math.cos(lt*0.09);
    ctx.save();ctx.globalCompositeOperation='screen';glow(ctx,lx,ly,520,'#ffb27a',0.07);ctx.restore();
    motes(ctx,lt,18,411,'#ffd0a0',1.0,0.35);
    /* the dip between the second and third cards: a new screen */
    const dip=smooth(52.3,52.8,lt)*(1-smooth(52.9,53.6,lt));
    if(dip>0){ctx.fillStyle=`rgba(3,3,7,${(0.92*dip).toFixed(3)})`;ctx.fillRect(0,0,W,H);}
    for(const c of S3_HONESTY){const a=smooth(c.at-0.2,c.at+0.6,lt)*(1-smooth(c.until-0.5,c.until+0.1,lt));s3_big(ctx,c.text,a,{y:300,size:c.text.length>150?46:50,maxW:980});}
  },
  subs:S3_HONESTY.map(c=>[c.at,c.until,c.text]),
  score({add,T,pad}){
    const line=(bar,seq,vel)=>{let beat=0;for(const[m,d]of seq){if(m)add(T(bar,beat),'piano',{midi:m,dur:d*BEAT*1.6,vel});beat+=d;}};
    const ch=['Cmaj7','G','Am7','Em','Cmaj7','G','Dsus','Em','Am7','Fmaj7','Cmaj7','G','Em','Cmaj7','Am7','Dsus','Em','Cmaj7','G','Dsus','Am7','Fmaj7','Cmaj7','G','G'];
    for(let b=0;b<25;b++)pad(T(b),ch[b],1.05,b>=9&&b<16?0.17:0.2,b>=20?'strings':'pad');
    line(0,[[67,2],[64,1],[62,1]],0.26);line(1,[[59,4]],0.24);line(2,[[64,2],[67,1],[69,1]],0.26);line(3,[[67,4]],0.24);
    line(4,[[72,2],[71,1],[69,1]],0.26);line(5,[[67,3],[0,1]],0.24);
    line(7,[[64,2],[67,1],[71,1]],0.24);line(8,[[69,3],[67,1]],0.22);line(9,[[65,2],[64,1],[62,1]],0.2);line(10,[[64,4]],0.2);
    line(12,[[0,2],[59,2]],0.18);line(13,[[64,3],[0,1]],0.18);line(14,[[62,2],[0,1],[59,1]],0.18);line(15,[[55,4]],0.16);
    line(16,[[64,2],[67,1],[71,1]],0.24);line(17,[[69,3],[67,1]],0.22);line(18,[[64,2],[62,1],[64,1]],0.22);line(19,[[59,4]],0.2);
    line(20,[[67,2],[64,1],[62,1]],0.22);line(21,[[64,4]],0.2);line(22,[[72,2],[71,1],[69,1]],0.22);line(23,[[67,4]],0.2);line(24,[[0,2],[59,2]],0.18);
  },
  amb(){return{room:0.2};},
});

/* ================================================================================================
   What should I let go? — the questions, stacking up; the gifts he never got to give
   ================================================================================================ */
const S3_Q=[
  {at:5.4,text:'The hugs we never did?'},
  {at:8.9,text:'The trips we never went on?'},
  {at:12.4,text:'The outings we never went on?'},
  {at:15.9,text:'The flowers I never got to give you, or the flowers you never received?'},
  {at:20.6,text:'The gifts I never got to give you?'},
  {at:42.8,text:'The business we never did?'},
  {at:46.3,text:'The engagement we never did?'},
  {at:49.8,text:'Or should we forget meeting your mom?'},
  {at:53.8,text:'What should we forget?'},
];
const S3_Q_BIG=52,S3_Q_LH=62,S3_Q_SMALL=0.6,S3_Q_SLH=42;
/* the settled layout when item k is the current one: the current big at y=340, the earlier ones stacked above it, smaller and softer */
function s3_qLayout(items,k){
  const out=[];let top=340-items[k].n*S3_Q_LH/2;out[k]={y:340,f:1,al:1};
  for(let j=k-1;j>=0;j--){const sh=items[j].n*S3_Q_SLH,gap=j===k-1?36:10,y=top-gap-sh/2;out[j]={y,f:S3_Q_SMALL,al:Math.max(0,0.62-(k-1-j)*0.085)};top=y-sh/2;}
  return out;
}
function s3_questions(ctx,items,lt,vis){
  if(vis<=0)return;
  ctx.save();ctx.font=`600 ${S3_Q_BIG}px "Cormorant Garamond",serif`;ctx.textAlign='center';ctx.textBaseline='middle';
  for(const it of items){it.lines=wrapText(ctx,it.text,1000);it.n=it.lines.length;}
  let k=-1;for(let i=0;i<items.length;i++)if(lt>=items[i].at)k=i;
  if(k<0){ctx.restore();return;}
  /* the earlier lines climb first (0.6 s), then the new one fades in below them */
  const at=items[k].at,p=easeIO(clamp((lt-at)/0.6)),pin=smooth(at+0.35,at+1.0,lt),L1=s3_qLayout(items,k),L0=k>0?s3_qLayout(items,k-1):null;
  for(let j=0;j<=k;j++){
    let y,f,al;
    if(j===k){y=340+16*(1-pin);f=1;al=pin;}
    else{y=lerp(L0[j].y,L1[j].y,p);f=lerp(L0[j].f,L1[j].f,p);al=lerp(L0[j].al,L1[j].al,p);}
    const it=items[j];
    al*=smooth(-6,76,y-(it.n-1)*S3_Q_SLH/2);  /* the oldest lines dissolve before they reach the top edge */
    if(al<=0.01)continue;
    const u=clamp((1-f)/(1-S3_Q_SMALL)),col=mixHex('#fff4e6','#cfa48c',u);
    ctx.save();ctx.globalAlpha=vis*al;ctx.translate(640,y);ctx.scale(f,f);
    ctx.shadowColor=`rgba(255,186,140,${(0.5*(1-u)).toFixed(3)})`;ctx.shadowBlur=22*(1-u);ctx.fillStyle=col;
    for(let i=0;i<it.n;i++)ctx.fillText(it.lines[i],0,(i-(it.n-1)/2)*S3_Q_LH);
    ctx.restore();
  }
  ctx.restore();
}
const S3_GIFTS=[['bangles.jpg',24.2,27.7],['flowers.jpg',27.7,31.2],['sweets.jpg',31.2,34.7]];
scene({id:'letgo',name:'What should I let go?',when:'2026-09-06T23:47',bars:18,fin:['#000000',1.2],fout:['#000000',1.6],
  note:'on a dark ground: “what should I let go?” — then the questions, one at a time, large in the middle of the frame, the earlier ones climbing up behind in a softer colour. At “the gifts I never got to give you” the gifts themselves: the bangles in their packets, the bouquet of sunflowers and roses, the box of sweets, then the piece of art with their two names hidden in its lines. Back to the questions; the last one held: “What should we forget?”',
  tag:'“What should we forget?”',
  prep(){return{g:s3_ground(44),vig:s3_vignette(),gifts:S3_GIFTS.map(g=>s3_img(g[0])),art:s3_img('art.jpg')};},
  draw(ctx,lt,A){
    ctx.drawImage(A.g,0,0);
    const lx=640-220*Math.sin(lt*0.08),ly=260+50*Math.cos(lt*0.07);
    ctx.save();ctx.globalCompositeOperation='screen';glow(ctx,lx,ly,560,'#ffb27a',0.06);ctx.restore();
    motes(ctx,lt,18,443,'#ffd0a0',1.0,0.35);
    /* the opening line */
    s3_big(ctx,'And when you said let it go, tell me: what should I let go?',smooth(0.6,1.3,lt)*(1-smooth(4.8,5.4,lt)),{y:340,size:56,maxW:1000});
    /* the questions */
    const photos=smooth(23.6,24.4,lt)*(1-smooth(42.3,43.0,lt));
    s3_questions(ctx,S3_Q,lt,1-photos);
    /* the gifts */
    if(photos>0){
      ctx.fillStyle=`rgba(3,3,7,${(0.55*photos).toFixed(3)})`;ctx.fillRect(0,0,W,H);
      S3_GIFTS.forEach((g,k)=>{const[,t0,t1]=g,a=smooth(t0-0.25,t0+0.45,lt)*(1-smooth(t1-0.45,t1+0.1,lt));if(a<=0)return;
        s3_photo(ctx,A.gifts[k],a*photos,1+0.05*smooth(t0,t1,lt),{h:640,cy:H/2});});
      /* the art, larger and longer, the paper itself; his line beside it */
      const aa=smooth(34.9,35.7,lt)*(1-smooth(41.8,42.5,lt));
      if(aa>0){
        s3_photo(ctx,A.art,aa*photos,1+0.05*smooth(35.2,42.2,lt),{h:540,cx:410,cy:300,crop:[80,220,560,880]});
        s3_big(ctx,'This one has our names hidden in it. In plain English.',aa*photos*smooth(36.0,36.8,lt),{x:930,y:300,size:46,maxW:440,glow:false});
      }
    }
  },
  subs:[
    [0.8,5.0,'And when you said let it go, tell me: what should I let go?'],
    [5.6,8.6,'The hugs we never did?'],
    [9.1,12.1,'The trips we never went on?'],
    [12.6,15.6,'The outings we never went on?'],
    [16.1,20.3,'The flowers I never got to give you, or the flowers you never received?'],
    [20.8,23.6,'The gifts I never got to give you?'],
    [36.4,41.2,'This one has our names hidden in it. In plain English.'],
    [43.0,46.0,'The business we never did?'],
    [46.5,49.5,'The engagement we never did?'],
    [50.0,53.4,'Or should we forget meeting your mom?'],
    [54.0,58.6,'What should we forget?'],
  ],
  score({add,T,pad}){
    const line=(bar,seq,vel)=>{let beat=0;for(const[m,d]of seq){if(m)add(T(bar,beat),'piano',{midi:m,dur:d*BEAT*1.6,vel});beat+=d;}};
    const ch=['Em','Cmaj7','G','Dsus','Em7','Am7','Cadd9','Dsus','Em','Cmaj7','Am7','G','Em','Cmaj7','G','Dsus','Em','Em'];
    for(let b=0;b<18;b++)pad(T(b),ch[b],1.05,b>=7&&b<13?0.17:0.21,b>=10&&b<13?'strings':'pad');
    line(0,[[64,2],[67,1],[71,1]],0.28);line(1,[[69,3],[67,1]],0.26);line(2,[[64,2],[62,1],[64,1]],0.26);line(3,[[59,4]],0.24);
    line(4,[[64,2],[67,1],[71,1]],0.26);line(5,[[72,2],[71,1],[69,1]],0.26);line(6,[[67,4]],0.24);
    line(7,[[0,2],[64,2]],0.2);line(8,[[67,3],[0,1]],0.2);line(9,[[71,2],[69,1],[67,1]],0.2);line(10,[[64,4]],0.2);line(11,[[0,2],[62,2]],0.18);line(12,[[64,4]],0.18);
    line(13,[[64,2],[67,1],[71,1]],0.26);line(14,[[69,3],[67,1]],0.24);line(15,[[64,2],[62,1],[64,1]],0.24);line(16,[[59,4]],0.22);line(17,[[52,4]],0.2);
  },
  amb(){return{room:0.2};},
});

/* ================================================================================================
   Please don't be — her again, the room a little brighter
   ================================================================================================ */
scene({id:'nothurt',name:'Please don’t be',when:'2026-09-06T23:48',bars:8,fin:['#000000',1.2],fout:['#000000',2.6],
  note:'the room again, a little brighter, the light on her softer; Fabeha in the middle of the frame, listening, and the smallest smile arriving while he says it; held on her until the fade, her theme on the piano.',
  tag:'“I can carry myself well.”',
  prep(){return{room:s3_room(),vig:s3_vignette()};},
  draw(ctx,lt,A){
    ctx.drawImage(A.room,0,0);
    ctx.fillStyle='rgba(255,214,170,.07)';ctx.fillRect(0,0,W,H);
    glow(ctx,640,380,760,'#ffc090',0.12);
    const warm=smooth(2,16,lt),smileUp=smooth(12,18,lt);
    s3_her(ctx,lt,A,{light:1.25,look:0.04*Math.sin(lt*0.45),smile:lerp(0.26,0.5,smileUp),brow:lerp(0.06,0,warm),tilt:0.04*Math.sin(lt*0.3)+0.03,blush:lerp(0.3,0.42,smileUp),seed:911});
  },
  subs:[
    [1.0,6.2,'I know you are hurt. But please, don’t be. I have got myself. I can carry myself well.'],
    [7.4,11.8,'The only concern I have is for you: that you don’t get hurt.'],
  ],
  score({add,T,pad,melody,THEME_B,THEME_B_CH}){
    const line=(bar,seq,vel)=>{let beat=0;for(const[m,d]of seq){if(m)add(T(bar,beat),'piano',{midi:m,dur:d*BEAT*1.6,vel});beat+=d;}};
    pad(T(0),'Em',1.05,0.2,'pad');pad(T(1),'Cmaj7',1.05,0.2,'pad');
    line(0,[[64,2],[67,1],[71,1]],0.26);line(1,[[69,3],[67,1]],0.24);
    const tb=[0,1,2,3,6,7];
    for(let i=0;i<6;i++){const b=2+i;pad(T(b),THEME_B_CH[tb[i]],1.05,0.2,i>=3?'strings':'pad');melody(b,tb[i],'piano',0,0.34,THEME_B);}
  },
  amb(){return{room:0.22};},
});
