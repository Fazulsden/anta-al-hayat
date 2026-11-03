/* sep2.js — the second half opens: what he set out to change (21 Aug), the dream (29 Aug), the reasons (1 Sep), and 6 September.
   His own account: tender towards her, honest about him. (see notes/AUTHORING.md; chat lines 45023–45038, 46262–46272, 46579–46594, 48943–48988) */
'use strict';

/* ---------- helpers (s2_ prefix; sep2.js only) ---------- */
/* a soft dark band across the frame with one big serif line on it, and her small words above it */
function s2_card(ctx,text,small,a){
  if(a<=0)return;
  ctx.save();ctx.globalAlpha=a;
  ctx.fillStyle=vgrad(ctx,196,524,[[0,'rgba(6,6,16,0)'],[0.16,'rgba(6,6,16,.8)'],[0.84,'rgba(6,6,16,.8)'],[1,'rgba(6,6,16,0)']]);ctx.fillRect(0,196,W,328);
  ctx.textAlign='center';
  if(small){ctx.fillStyle='#d9b27a';ctx.font='italic 500 24px "Cormorant Garamond",Georgia,serif';ctx.fillText(small,640,286);}
  ctx.font='600 56px "Cormorant Garamond",Georgia,serif';const lines=wrapText(ctx,text,1080),lh=66,y0=378-(lines.length-1)*lh/2;
  ctx.fillStyle='#fff6e8';ctx.shadowColor='rgba(255,200,140,.35)';ctx.shadowBlur=18;
  lines.forEach((l,k)=>ctx.fillText(l,640,y0+k*lh));
  ctx.restore();
}
/* the status bar in dark text, for a light screen */
function s2_topDark(ctx,S,time){
  ctx.save();rrect(ctx,S.x,S.y,S.w,S.h,S.r);ctx.clip();
  ctx.fillStyle='#0e0e12';rrect(ctx,S.x+S.w/2-44,S.y+8,88,24,12);ctx.fill();
  ctx.fillStyle='#1b1b22';ctx.font='600 13px "Mulish",sans-serif';ctx.textAlign='left';ctx.fillText(time,S.x+22,S.y+26);
  ctx.textAlign='right';ctx.font='500 12px "Mulish",sans-serif';ctx.fillText('●●●  ⌔  ▮',S.x+S.w-18,S.y+26);
  ctx.restore();
}
/* the Notes app: a list called “Be different”, the first `done` lines ticked (the newest tick pops at popAt, in the scene's clock u) */
const S2_LIST=['Don’t comment on dress sense.','Stop judging women on clothes, and who they are.','Work on SaaS.','Don’t be a misogynist.'];
function s2_notes(ctx,S,u,done,popAt,date){
  ctx.save();rrect(ctx,S.x,S.y,S.w,S.h,S.r);ctx.clip();
  ctx.fillStyle='#fbf8f1';ctx.fillRect(S.x,S.y,S.w,S.h);
  ctx.fillStyle='#f2eee4';ctx.fillRect(S.x,S.y,S.w,88);
  ctx.fillStyle='#d99b1e';ctx.font='500 15px "Mulish",sans-serif';ctx.textAlign='left';ctx.fillText('‹ Notes',S.x+16,S.y+68);
  ctx.textAlign='right';ctx.fillText('Done',S.x+S.w-16,S.y+68);
  ctx.textAlign='left';ctx.fillStyle='#1b1b1f';ctx.font='700 24px "Mulish",sans-serif';ctx.fillText('Be different',S.x+22,S.y+134);
  ctx.fillStyle='#8a8a90';ctx.font='500 12px "Mulish",sans-serif';ctx.fillText(date,S.x+22,S.y+156);
  ctx.font='500 15px "Mulish",sans-serif';
  let y=S.y+192;
  for(let k=0;k<4;k++){
    const on=k<done,lines=wrapText(ctx,S2_LIST[k],S.w-80);
    const pop=(on&&k===done-1&&popAt!=null)?backOut(clamp((u-popAt)/0.35)):1;
    ctx.save();ctx.translate(S.x+34,y+8);ctx.scale(pop,pop);
    ctx.strokeStyle='#c9c4b8';ctx.lineWidth=1.6;circle(ctx,0,0,10);ctx.stroke();
    if(on){ctx.fillStyle='#d99b1e';circle(ctx,0,0,10);ctx.fill();ctx.strokeStyle='#fff';ctx.lineWidth=2.2;ctx.beginPath();ctx.moveTo(-5,0);ctx.lineTo(-1.5,4);ctx.lineTo(5.5,-4);ctx.stroke();}
    ctx.restore();
    ctx.fillStyle=on?'#9a978f':'#1b1b1f';lines.forEach((l,i)=>ctx.fillText(l,S.x+54,y+13+i*19));
    y+=lines.length*19+22;
  }
  ctx.restore();
}
/* the dream: a pale plane under a grey-blue sky, a far ridge, two drifts of fog */
function s2_dreamLayer(){const c=mk(W,H),g=c.getContext('2d'),r=rng(2929);
  g.fillStyle=vgrad(g,0,H,[[0,'#121420'],[0.45,'#2b2e3f'],[0.72,'#575b6b'],[1,'#8a8d99']]);g.fillRect(0,0,W,H);
  g.fillStyle='rgba(36,38,52,.5)';g.beginPath();g.moveTo(0,470);for(let x=0;x<=W;x+=20)g.lineTo(x,404+Math.sin(x*0.004)*24+Math.sin(x*0.013+1)*9);g.lineTo(W,470);g.closePath();g.fill();
  g.fillStyle=vgrad(g,440,H,[[0,'#8a8d99'],[1,'#64687a']]);g.fillRect(0,440,W,H-440);
  for(let i=0;i<44;i++){g.globalAlpha=0.05+r()*0.08;g.fillStyle='#ffffff';ell(g,r()*W,450+r()*270,60+r()*170,4+r()*8);g.fill();}g.globalAlpha=1;
  const v=g.createRadialGradient(640,380,200,640,380,900);v.addColorStop(0,'rgba(10,10,20,0)');v.addColorStop(1,'rgba(10,10,20,.55)');g.fillStyle=v;g.fillRect(0,0,W,H);
  return{c,fog1:makeWisps(31,W,H),fog2:makeWisps(32,W,H)};}

/* ---------- 21 August · 21:30 — four things ---------- */
const S2_FOUR=[
  {at:1.4, who:'her',time:'21:30',text:'Dont comment on dress sense aik cheez dusri cheez stip judging women on clothes and who they are w teesri cheez work on saas teesri cheez misogynist ma bana'},
  {at:2.8, who:'her',time:'21:30',text:'Chothi cheez*'},
  {at:17.0,who:'me', time:'21:49',text:'😭bhaeee i swear i dont judge them'},
  {at:19.2,who:'me', time:'21:51',text:'Saas on it boss!'},
];
const S2_CARDS=[['aik cheez','Don’t comment on dress sense.'],['dusri cheez','Stop judging women on clothes, and who they are.'],['teesri cheez','Work on SaaS.'],['chothi cheez','Don’t be a misogynist.']];
const S2_DAYS=['22 August','23 August','24 August','25 August'],S2_DAYT=['07:12','07:40','06:58','07:21'];
scene({id:'fourthings',name:'21 August · four things',when:'2026-08-21T21:30',bars:12,fin:['#000000',1.2],fout:['#000000',1.4],
  note:'half past nine, the phone in his room; her four things, one after another, big across the frame; his two answers; then morning after morning — the ceiling, the fan, the date moving on — and a notes list called “Be different”, ticked one line at a time.',
  tag:'“Every day I wake up, I have a choice to be different.”',
  prep(){return{R:rooms(),ceil:f2_ceilingLayer()};},
  draw(ctx,lt,A){
    if(lt<21.2){
      ctx.drawImage(A.R.night,0,0);ctx.fillStyle='rgba(0,0,10,.3)';ctx.fillRect(0,0,W,H);
      const S=drawPhoneHand(ctx,lt,{x:475,y:60,w:300,h:640});
      chatPanel(ctx,S,S2_FOUR,lt,{name:'Fabeha',status:'online'});
      phoneTop(ctx,S,{time:lt<17?'21:30':lt<19.2?'21:49':'21:51'});
      ctx.save();ctx.globalCompositeOperation='screen';glow(ctx,S.x+S.w/2,S.y+S.h*0.7,360,'#7fa6d8',0.12);ctx.restore();
      if(lt>=4&&lt<16.4){const k=Math.min(3,Math.floor((lt-4)/3.1)),u=lt-4-k*3.1,a=smooth(0,0.5,u)*(1-smooth(2.6,3.1,u));
        ctx.fillStyle=`rgba(0,0,0,${(0.45*a).toFixed(3)})`;ctx.fillRect(0,0,W,H);s2_card(ctx,S2_CARDS[k][1],S2_CARDS[k][0],a);}
      const dk=smooth(20.4,21.2,lt);if(dk>0){ctx.fillStyle=`rgba(0,0,0,${dk.toFixed(3)})`;ctx.fillRect(0,0,W,H);}
      return;
    }
    /* the mornings: the ceiling from the bed, the fan, the date; the phone comes up with the list and one more line is ticked */
    const d=Math.min(3,Math.floor((lt-21.2)/4.6)),u=lt-21.2-d*4.6;
    ctx.drawImage(A.ceil,0,0);
    ctx.fillStyle='rgba(255,196,150,.14)';ctx.fillRect(0,0,W,H);
    f2_fan(ctx,lt*0.35,640,230);
    const da=smooth(0.3,0.9,u);
    ctx.save();ctx.globalAlpha=da;ctx.fillStyle='#5a4a3a';ctx.font='italic 500 36px "Cormorant Garamond",Georgia,serif';ctx.textAlign='left';ctx.fillText(S2_DAYS[d],72,96);ctx.fillStyle='rgba(90,74,58,.5)';ctx.fillRect(72,108,ctx.measureText(S2_DAYS[d]).width,1.5);ctx.restore();
    const up=easeOut(smooth(1.0,1.9,u));
    if(up>0){const S=drawPhoneHand(ctx,lt,{x:475,y:lerp(790,60,up),w:300,h:640});if(S.y<H){s2_notes(ctx,S,u,d+(u>=2.9?1:0),2.9,S2_DAYS[d]+' at '+S2_DAYT[d]);s2_topDark(ctx,S,S2_DAYT[d]);}}
    const fo=clamp((d<3?smooth(4.2,4.6,u):0)+(1-smooth(0,0.4,u)));
    if(fo>0){ctx.fillStyle=`rgba(0,0,0,${fo.toFixed(3)})`;ctx.fillRect(0,0,W,H);}
  },
  subs:[
    [0.6,3.8,'21 August, half past nine. I asked her: mere liye koi farmaish? She sent four things.'],
    [4.0,8.6,'Dont comment on dress sense aik cheez dusri cheez stip judging women on clothes and who they are w teesri cheez work on saas teesri cheez misogynist ma bana','her'],
    [17.2,19.0,'😭bhaeee i swear i dont judge them','him'],
    [19.4,20.6,'Saas on it boss!','him'],
    [21.8,26.2,'I made it fully conscious. Every day I wake up, I have a choice to be different.'],
    [27.0,30.6,'I started doing different. One thing at a time.'],
    [32.4,37.0,'So that I would not hurt her. Hurting her is the last thing I’d want.'],
  ],
  score({T,add,at,hit,bars}){
    bars(0,6,['Em','Cmaj7','G','Dsus'],{padVel:0.3,arp:true,arpVel:0.09,step:1});
    bars(6,6,['G','Em7','Cadd9','Dsus'],{padVel:0.34,arp:true,arpVel:0.1,step:0.5});
    for(const m of S2_FOUR)hit(m.at,'tick',{hi:m.who==='her'});
    [4,7.1,10.2,13.3].forEach((t,k)=>hit(t,'piano',{midi:52+[0,3,7,10][k],dur:2.6,vel:0.3}));
    for(let d=0;d<4;d++){const t0=21.2+d*4.6+2.9;[64,67,71,76,79,83].slice(0,4+Math.min(2,d)).forEach((m,k)=>add(at(t0+k*0.17),'piano',{midi:m,dur:1.8,vel:0.34}));}
  },
  amb(lt){return lt<21.2?{room:0.25}:{room:0.18,wind:0.08};},
});

/* ---------- 29 August · 12:20 — the dream, and that night ---------- */
const S2_DREAM=[
  {at:14.0,who:'me', time:'12:31',text:'i saw your dram'},
  {at:14.8,who:'me', time:'12:31',text:'that i have to tell it to you'},
  {at:15.7,who:'me', time:'12:31',text:'it was kaafi weird'},
  {at:16.5,who:'me', time:'12:31',text:'kaafi galat dream'},
  {at:18.2,who:'her',time:'12:32',text:'Ohh fudgeee'},
  {at:19.4,who:'me', time:'12:32',text:'and i am alr worried about it'},
  {at:20.2,who:'me', time:'12:32',text:'in the dream it felt'},
  {at:20.8,who:'me', time:'12:32',text:'normal to me'},
  {at:21.8,who:'me', time:'12:32',text:'and i feel so bad for it'},
  {at:23.4,who:'her',time:'12:32',text:'😭😭😭😭😭'},
];
const S2_NIGHT=[
  {at:27.4,who:'me', time:'01:23',text:'i would never make you feel like that'},
  {at:28.1,who:'me', time:'01:23',text:'never'},
  {at:29.6,who:'her',time:'01:23',text:'Ikkkk you would never'},
  {at:30.4,who:'her',time:'01:23',text:'Dreams arent in your control'},
  {at:31.8,who:'her',time:'01:24',text:'Sometimes khaab mein what you do you feel the opposite in real life'},
  {at:33.4,who:'her',time:'01:25',text:'So if we think nice for a dream we\'ll get nice stuff in real life'},
  {at:34.6,who:'her',time:'01:25',text:'Shubh subh socho'},
];
scene({id:'baddream',name:'29 August · the dream',when:'2026-08-29T12:20',bars:11,fin:['#000000',1.4],fout:['#000000',1.4],
  note:'the dream, wordless: the two chairs in fog, snow falling upward, her far figure turning away and dissolving; then noon, the ceiling, the phone above his face — “i saw your dram” — and that night, her answer: dreams aren’t in your control.',
  tag:'“Shubh subh socho”',
  prep(){return{R:rooms(),ceil:f2_ceilingLayer(),D:s2_dreamLayer()};},
  draw(ctx,lt,A){
    if(lt<11.6){
      const z=1+0.05*smooth(0,11,lt);
      ctx.save();ctx.translate(640,420);ctx.scale(z,z);ctx.translate(-640,-420);
      ctx.drawImage(A.D.c,0,0);
      const f1=(lt*9)%W;ctx.save();ctx.globalAlpha=0.5;ctx.drawImage(A.D.fog1,f1-W,-40);ctx.drawImage(A.D.fog1,f1,-40);ctx.restore();
      const turn=smooth(6.2,8.6,lt),gone=smooth(7.4,9.8,lt),fs=lerp(1.15,0.85,gone);
      if(gone<1){ctx.save();ctx.globalAlpha=(1-gone)*0.9;ctx.translate(900,428);ctx.scale(lerp(1,0.1,turn)*fs,fs);drawFabehaFar(ctx,0,0,1,lt,{wind:0.2});ctx.restore();}
      plasticChair(ctx,500,588,1.35,'#c9ccd4');plasticChair(ctx,735,578,1.3,'#c9ccd4');
      const f2=(lt*14)%W;ctx.save();ctx.globalAlpha=0.45;ctx.drawImage(A.D.fog2,-f2,60);ctx.drawImage(A.D.fog2,W-f2,60);ctx.restore();
      snowfall(ctx,-lt*0.7,160,77,-14,2.4,0.55);
      ctx.restore();
      const wake=smooth(10.4,11.6,lt);if(wake>0){ctx.fillStyle=`rgba(255,250,240,${wake.toFixed(3)})`;ctx.fillRect(0,0,W,H);}
      return;
    }
    if(lt<25.6){
      const wk=lt-11.6;
      ctx.drawImage(A.ceil,0,0);f2_fan(ctx,lt,640,230);
      const up=easeOut(smooth(1.2,2.2,wk));
      if(up>0){const S=drawPhoneHand(ctx,lt,{x:475,y:lerp(790,44,up),w:300,h:640});if(S.y<H){chatPanel(ctx,S,S2_DREAM,lt,{name:'Fabeha',status:'online',dark:false});s2_topDark(ctx,S,lt<18.2?'12:31':'12:32');}}
      const wa=1-smooth(0,1.4,wk);if(wa>0){ctx.fillStyle=`rgba(255,250,240,${wa.toFixed(3)})`;ctx.fillRect(0,0,W,H);}
      const dk=smooth(24.8,25.6,lt);if(dk>0){ctx.fillStyle=`rgba(0,0,0,${dk.toFixed(3)})`;ctx.fillRect(0,0,W,H);}
      return;
    }
    /* that night, 01:23 */
    ctx.fillStyle='#030409';ctx.fillRect(0,0,W,H);
    ctx.save();ctx.globalAlpha=0.5;ctx.drawImage(A.R.night,0,0);ctx.restore();
    const S=drawPhoneHand(ctx,lt,{x:475,y:44,w:300,h:640});
    chatPanel(ctx,S,S2_NIGHT,lt,{name:'Fabeha',status:'online'});
    phoneTop(ctx,S,{time:lt<31.8?'01:23':lt<33.4?'01:24':'01:25'});
    ctx.save();ctx.globalCompositeOperation='screen';glow(ctx,S.x+S.w/2,S.y+S.h*0.75,380,'#7fa6d8',0.14);ctx.restore();
    const fi=1-smooth(25.6,26.4,lt);if(fi>0){ctx.fillStyle=`rgba(0,0,0,${fi.toFixed(3)})`;ctx.fillRect(0,0,W,H);}
  },
  subs:[
    [1.0,5.4,'End of August. A dream about her.'],
    [6.0,10.2,'Something in me broke that morning, and I didn’t know how to say it.'],
    [14.2,17.8,'i saw your dram · that i have to tell it to you · it was kaafi weird · kaafi galat dream','him'],
    [18.4,19.6,'Ohh fudgeee','her'],
    [19.8,23.2,'and i am alr worried about it · in the dream it felt · normal to me · and i feel so bad for it','him'],
    [23.6,24.8,'😭😭😭😭😭','her'],
    [25.8,27.2,'That night.'],
    [27.6,29.4,'i would never make you feel like that · never','him'],
    [29.8,31.6,'Ikkkk you would never · Dreams arent in your control','her'],
    [32.0,33.2,'Sometimes khaab mein what you do you feel the opposite in real life','her'],
    [33.6,34.4,'So if we think nice for a dream we\'ll get nice stuff in real life','her'],
    [34.8,36.2,'Shubh subh socho','her'],
  ],
  score({T,add,hit,pad,melody,bars,THEME_B}){
    bars(0,4,['Em','Em7'],{strings:true,padVel:0.26});
    [[0,76],[0.5,74],[1.25,71],[2,72],[2.6,69],[3.25,67]].forEach(([b,m])=>add(T(b),'piano',{midi:m-12,dur:3,vel:0.28}));
    hit(10.4,'swell',{dur:1.2,vel:0.3});
    pad(T(4),'Cmaj7',2,0.2,'strings');pad(T(6),'Am7',1.6,0.2,'strings');
    for(const m of S2_DREAM)hit(m.at,'tick',{hi:m.who==='her'});
    bars(8,3,['Em','Cmaj7','Dsus'],{padVel:0.3});
    for(let b=8;b<11;b++)melody(b,b-8,'box',12,0.28,THEME_B);
    for(const m of S2_NIGHT)hit(m.at,'tick',{hi:m.who==='her'});
  },
  amb(lt){return lt<11.6?{wind:0.32,room:0.08}:lt<25.6?{room:0.22,hum:0.06}:{room:0.26};},
});

/* ---------- 1 September · 21:00 — the reasons (narration only) ---------- */
/* a sheet of paper on the desk: a transcript (table of grey lines) or a plain form */
function s2_sheet(g,x,y,w,h,rot,kind){
  g.save();g.translate(x,y);g.rotate(rot);
  g.fillStyle='rgba(0,0,0,.3)';rrect(g,-w/2+5,-h/2+7,w,h,3);g.fill();
  g.fillStyle=kind==='folder'?'#c9a86a':'#efe9dc';rrect(g,-w/2,-h/2,w,h,3);g.fill();
  if(kind==='folder'){g.fillStyle='#b8965a';rrect(g,-w/2,-h/2-10,w*0.4,14,4);g.fill();g.restore();return;}
  g.fillStyle='#4a4a52';g.font='700 9px "Mulish",sans-serif';g.textAlign='center';setLS(g,'2px');g.fillText(kind==='transcript'?'OFFICIAL TRANSCRIPT':'APPLICATION FORM',0,-h/2+22);setLS(g,'0px');
  g.strokeStyle='rgba(60,60,70,.35)';g.lineWidth=1;
  if(kind==='transcript'){for(let r=0;r<9;r++){const yy=-h/2+40+r*((h-60)/9);g.beginPath();g.moveTo(-w/2+12,yy);g.lineTo(w/2-12,yy);g.stroke();g.fillStyle='rgba(60,60,70,.5)';for(let c=0;c<4;c++)g.fillRect(-w/2+16+c*((w-32)/4),yy+5,(w-32)/4-14,3);}
    g.beginPath();g.moveTo(-w/2+12,-h/2+40);g.lineTo(-w/2+12,h/2-20);g.moveTo(w/2-12,-h/2+40);g.lineTo(w/2-12,h/2-20);g.stroke();}
  else{for(let r=0;r<7;r++){const yy=-h/2+44+r*((h-70)/7);g.fillStyle='rgba(60,60,70,.45)';g.fillRect(-w/2+14,yy,w*0.3,3);g.beginPath();g.moveTo(-w/2+14+w*0.34,yy+2);g.lineTo(w/2-14,yy+2);g.stroke();}}
  g.fillStyle='rgba(40,40,60,.25)';rrect(g,w/2-44,h/2-40,30,22,3);g.fill();
  g.restore();
}
/* his room at night with a door on the left, the desk, the papers and the phone face-down (the hands and the light are live) */
function s2_deskLayer(){const R=rooms(),c=mk(W,H),g=c.getContext('2d');
  g.fillStyle='#06060c';g.fillRect(0,0,W,H);g.globalAlpha=0.55;g.drawImage(R.night,0,0);g.globalAlpha=1;
  g.fillStyle='#17131c';g.fillRect(40,30,230,500);g.fillStyle='#211a26';g.fillRect(56,46,198,478);g.fillStyle='#2a2130';g.fillRect(72,70,166,180);g.fillRect(72,300,166,200);
  g.fillStyle='#8a7a5a';circle(g,236,296,5);g.fill();
  f2_desk(g,540,'#3b2c26','#54403a');
  s2_sheet(g,470,620,220,170,-0.08,'folder');
  s2_sheet(g,560,626,196,250,0.06,'transcript');
  s2_sheet(g,420,648,180,220,-0.14,'form');
  g.save();g.translate(1000,600);g.rotate(0.32);g.fillStyle='rgba(0,0,0,.35)';rrect(g,-62,-128,132,268,22);g.fill();g.fillStyle='#15151a';rrect(g,-66,-134,132,268,22);g.fill();g.fillStyle='#24242c';rrect(g,-54,-122,44,48,10);g.fill();g.fillStyle='#0b0b10';circle(g,-40,-108,8);g.fill();circle(g,-24,-108,8);g.fill();g.strokeStyle='rgba(255,255,255,.08)';g.lineWidth=1.5;rrect(g,-66,-134,132,268,22);g.stroke();g.restore();
  g.fillStyle='#2a2230';g.fillRect(1110,470,110,70);g.fillStyle='#352b3c';g.fillRect(1110,470,110,8);
  return c;}
/* his hands resting on the desk, bottom of frame */
function s2_handsOnDesk(ctx,lt){
  const b=Math.sin(lt*0.9)*2;ctx.save();ctx.lineCap='round';
  for(const[x,d]of[[400,-1],[880,1]]){const y=650+b;
    ctx.strokeStyle=HIS.skin;ctx.lineWidth=62;ctx.beginPath();ctx.moveTo(x+d*60,H+60);ctx.lineTo(x+d*10,y+10);ctx.stroke();
    ctx.fillStyle=HIS.skin;ell(ctx,x,y,50,34,d*0.1);ctx.fill();
    for(let k=0;k<4;k++){ell(ctx,x-30+k*20+d*4,y-30,10,26,(k-1.5)*0.06*d);ctx.fill();}
    ell(ctx,x+d*54,y+4,12,22,d*0.7);ctx.fill();
    ctx.fillStyle=HIS.nail;for(let k=0;k<4;k++){ell(ctx,x-30+k*20+d*4,y-52,5,6);ctx.fill();}
    ctx.fillStyle='rgba(0,0,0,.22)';ell(ctx,x+d*6,y+34,58,12);ctx.fill();}
  ctx.restore();
}
scene({id:'pressure',name:'September · the reasons',when:'2026-09-01T21:00',bars:8,fin:['#000000',1.4],fout:['#000000',1.4],
  note:'his room in Hyderabad at night: the transcript and the forms on the desk, warm light and voices under the door to the next room, the phone face-down, his hands on the desk; more paper lands on the pile, and a shadow crosses the wall.',
  tag:'“Nazar, I thought. Following me.”',
  prep(){return{desk:s2_deskLayer()};},
  draw(ctx,lt,A){
    ctx.drawImage(A.desk,0,0);
    /* the next room: light under the door, swelling and dipping with the voices */
    const v=0.3+0.08*Math.sin(lt*3.7)+0.05*Math.sin(lt*9.3)+0.04*Math.sin(lt*1.3);
    glow(ctx,155,530,260,'#ffb866',v);
    ctx.fillStyle=`rgba(255,196,120,${(0.55+0.3*v).toFixed(3)})`;ctx.fillRect(56,523,198,5);
    ctx.fillStyle='rgba(255,196,120,.22)';ctx.fillRect(253,46,2,478);ctx.fillRect(56,46,198,2);
    /* the reasons, one on top of another */
    for(let k=0;k<3;k++){const t0=10.8+k*1.6,e=easeOut(smooth(t0,t0+0.9,lt));if(e<=0)continue;
      s2_sheet(ctx,lerp(1180,600+k*14,e),lerp(300,604+k*4,e),190,236,lerp(0.6,0.03*(k-1),e),k===1?'transcript':'form');}
    s2_handsOnDesk(ctx,lt);
    /* nazar: the lamp dims, a shadow crosses the wall */
    const nz=smooth(17.2,19.2,lt)*(1-smooth(22.0,24.0,lt));
    if(nz>0){ctx.fillStyle=`rgba(4,3,10,${(0.32*nz).toFixed(3)})`;ctx.fillRect(0,0,W,H);
      const sx=lerp(-400,1500,smooth(17.4,23.0,lt));ctx.fillStyle=hgrad(ctx,sx-260,sx+260,[[0,'rgba(2,2,8,0)'],[0.5,`rgba(2,2,8,${(0.5*nz).toFixed(3)})`],[1,'rgba(2,2,8,0)']]);ctx.fillRect(sx-260,0,520,H);}
    ctx.fillStyle='rgba(6,6,14,.22)';ctx.fillRect(0,0,W,H);
  },
  subs:[
    [1.0,5.6,'Then the degree. My brother, Ammi, every day: when.'],
    [6.2,9.6,'I was fighting on every side.'],
    [11.0,15.6,'The reasons were building up, one on top of another.'],
    [17.6,22.0,'Nazar, I thought. Following me.'],
  ],
  score({T,add,pad,CH}){
    for(let b=0;b<8;b++)pad(T(b),b%2?'Em7':'Em',1.05,0.36,'pad');
    for(let b=0;b<8;b++)for(const q of[0,2])add(T(b,q),'bass',{midi:40,dur:1.2,vel:0.24});
    add(T(5),'strings',{notes:CH.Am7.p,dur:2*BAR,vel:0.18});
    for(let k=0;k<3;k++)add(T(0)+10.8+k*1.6+0.7,'pluck',{midi:40+k*0,vel:0.2});
  },
  amb(){return{room:0.3,hum:0.08};},
});

/* ---------- 6 September · 23:31 — Usman’s birthday, the other room, the video call; the chat after midnight ---------- */
/* the house: a hallway, the lit doorway with the cake and the people, fairy lights, shoes by the door, and the dark door he went through */
function s2_partyLayer(){const c=mk(W,H),g=c.getContext('2d'),r=rng(606);
  g.fillStyle=vgrad(g,0,H,[[0,'#2a1c22'],[0.6,'#3b2a2c'],[1,'#1e1619']]);g.fillRect(0,0,W,H);
  g.fillStyle=vgrad(g,520,H,[[0,'#4a3a33'],[1,'#2a2020']]);g.fillRect(0,520,W,200);
  g.fillStyle='#4e3a36';g.fillRect(790,70,360,470);
  g.fillStyle=vgrad(g,92,540,[[0,'#ffe2ad'],[1,'#ffb86a']]);g.fillRect(812,92,316,448);
  for(let i=0;i<5;i++){const x=840+i*60,y=120+(i%2)*26;g.fillStyle=['#e86f8a','#6fb7e8','#f4d35e','#9fd36f','#c88ae8'][i];ell(g,x,y,16,20);g.fill();g.strokeStyle='rgba(0,0,0,.25)';g.lineWidth=1;g.beginPath();g.moveTo(x,y+20);g.lineTo(x+4,y+60);g.stroke();}
  g.fillStyle='#5a3f36';g.fillRect(900,470,180,10);g.fillRect(912,480,10,60);g.fillRect(1058,480,10,60);
  g.fillStyle='#fff3e0';rrect(g,950,422,84,50,8);g.fill();g.fillStyle='#f4c6d0';rrect(g,950,422,84,10,5);g.fill();g.fillStyle='#e8a8b8';for(let k=0;k<6;k++){circle(g,956+k*14,428,4);g.fill();}
  for(const[x,s,col,hair,k]of[[866,1.3,'#3a2a30','#1c1416',0],[930,1.45,'#2e2630','#2a1a1a',1],[1040,1.35,'#3b2f33','#1c1416',2],[1098,1.15,'#352a2e','#2a1d22',3]])drawFigureFar(g,x,530,s,col,hair,0,k,false);
  const spill=g.createRadialGradient(970,580,0,970,580,440);spill.addColorStop(0,'rgba(255,200,120,.45)');spill.addColorStop(1,'rgba(255,200,120,0)');g.fillStyle=spill;g.fillRect(480,380,800,340);
  g.fillStyle='#1a1318';g.fillRect(150,120,200,400);g.fillStyle='#241a20';g.fillRect(162,132,176,388);g.fillStyle='#8a7a5a';circle(g,326,330,5);g.fill();
  const cols=['#1b1b22','#5a3b2a','#d9d4c8','#2d3a5a','#7a2a2a','#e4b74a','#3a3a3a','#8a6a4a'];
  for(let i=0;i<14;i++){const x=70+(i%7)*82+r()*16,y=606+Math.floor(i/7)*46+r()*10,col=cols[i%cols.length],rot=(r()-0.5)*0.5;for(const d of[-1,1]){g.save();g.translate(x+d*14,y);g.rotate(rot);g.fillStyle='rgba(0,0,0,.3)';rrect(g,-10,-22,24,52,10);g.fill();g.fillStyle=col;rrect(g,-12,-26,24,52,10);g.fill();g.fillStyle='rgba(255,255,255,.12)';rrect(g,-8,-22,16,20,6);g.fill();g.restore();}}
  g.strokeStyle='rgba(70,50,50,.9)';g.lineWidth=2;g.beginPath();g.moveTo(0,60);g.quadraticCurveTo(640,130,W,70);g.stroke();
  return c;}
/* the dark room: the door on the left (the party behind it), the bed in front */
function s2_callRoom(){const c=mk(W,H),g=c.getContext('2d');
  g.fillStyle=vgrad(g,0,H,[[0,'#07070d'],[1,'#120f14']]);g.fillRect(0,0,W,H);
  g.fillStyle='#1b151c';g.fillRect(60,40,230,500);g.fillStyle='#120d12';g.fillRect(74,54,202,486);g.fillStyle='#6a5a44';circle(g,258,300,5);g.fill();
  g.fillStyle='#1c1720';g.beginPath();g.moveTo(0,560);g.quadraticCurveTo(640,520,W,560);g.lineTo(W,720);g.lineTo(0,720);g.closePath();g.fill();
  g.fillStyle='#2a2230';ell(g,760,560,180,40);g.fill();g.fillStyle='#241d2a';ell(g,620,600,260,46);g.fill();
  return c;}
/* the video call: her video in the top pane (lit by her lamp), his little self-view dark, the timer, the buttons */
function s2_videoCall(ctx,S,lt,o){
  ctx.save();rrect(ctx,S.x,S.y,S.w,S.h,S.r);ctx.clip();
  ctx.fillStyle='#05070b';ctx.fillRect(S.x,S.y,S.w,S.h);
  const px=S.x,py=S.y,pw=S.w,ph=S.h*0.64,cx=S.x+S.w/2;
  ctx.save();ctx.beginPath();ctx.rect(px,py,pw,ph);ctx.clip();
  ctx.fillStyle=vgrad(ctx,py,py+ph,[[0,'#2a2130'],[1,'#4a3a44']]);ctx.fillRect(px,py,pw,ph);
  glow(ctx,px+pw*0.78,py+ph*0.28,190,'#ffc48a',0.4);
  ctx.fillStyle='rgba(255,255,255,.05)';ctx.fillRect(px+18,py+30,70,110);
  drawFabeha(ctx,cx,py+108,1.3,{t:lt,outfit:'home',hair:'down',pose:'bust',smile:o.smile,eyes:o.eyes,talk:o.talk,look:o.look,tilt:o.tilt,brow:o.brow,blush:0.3,len:220,wind:0.03});
  ctx.fillStyle='rgba(255,200,150,.06)';ctx.fillRect(px,py,pw,ph);
  ctx.restore();
  const qx=S.x+S.w-86,qy=S.y+ph-120,qw=72,qh=104;ctx.fillStyle='#0a0a10';rrect(ctx,qx,qy,qw,qh,8);ctx.fill();ctx.fillStyle='rgba(255,180,100,.35)';ctx.fillRect(qx+6,qy+qh-14,60,3);ctx.strokeStyle='rgba(255,255,255,.18)';ctx.lineWidth=1;rrect(ctx,qx,qy,qw,qh,8);ctx.stroke();
  ctx.fillStyle='#e9edef';ctx.textAlign='center';ctx.font='700 20px "Mulish",sans-serif';ctx.fillText('Fabeha',cx,S.y+ph+40);
  ctx.fillStyle='#8696a0';ctx.font='500 13px "Mulish",sans-serif';ctx.fillText('WhatsApp video call',cx,S.y+ph+62);
  ctx.fillStyle='#e9edef';ctx.font='300 30px "Mulish",sans-serif';ctx.fillText(o.timer,cx,S.y+ph+104);
  const by=S.y+S.h-56;[[-96,'#2a3942','🔈'],[-32,'#2a3942','📷'],[32,'#2a3942','🎤'],[96,'#e3463e','📞']].forEach(([dx,col,ic])=>{ctx.fillStyle=col;circle(ctx,cx+dx,by,22);ctx.fill();ctx.fillStyle='#fff';ctx.font='18px serif';ctx.textBaseline='middle';ctx.fillText(ic,cx+dx,by+1);ctx.textBaseline='alphabetic';});
  ctx.restore();
}
/* his hand coming up over his eyes, from the bottom right of the frame */
function s2_handOverEyes(ctx,u){
  if(u<=0)return;const y=lerp(H+280,H-300,easeOut(u)),x=1000;
  ctx.save();ctx.fillStyle=HIS.skin;
  ctx.beginPath();ctx.moveTo(x+60,H+60);ctx.lineTo(x+360,H+60);ctx.lineTo(x+270,y+130);ctx.lineTo(x+70,y+150);ctx.closePath();ctx.fill();
  ell(ctx,x+150,y+150,150,118,-0.3);ctx.fill();
  for(let k=0;k<4;k++){ctx.save();ctx.translate(x+30+k*60,y+76-k*22);ctx.rotate(-0.6+k*0.12);ctx.fillStyle=HIS.skin;rrect(ctx,-24,-130,48,180,24);ctx.fill();ctx.fillStyle=HIS.nail;ell(ctx,0,-108,12,16);ctx.fill();ctx.fillStyle='rgba(90,55,35,.18)';rrect(ctx,-24,-60,48,16,8);ctx.fill();ctx.restore();}
  ctx.fillStyle='rgba(90,55,35,.16)';ell(ctx,x+150,y+180,120,56,-0.3);ctx.fill();
  ctx.restore();
}
function s2_mmss(sec){sec=Math.max(0,Math.floor(sec));return String(Math.floor(sec/60)).padStart(2,'0')+':'+String(sec%60).padStart(2,'0');}
const S2_AFTER=[
  {at:25.8,who:'her',time:'00:32',text:'Heyyyy\nDidn\'t mean to emotionally attack you or harm you. You do mean a lot to me.'},
  {at:31.8,who:'her',time:'00:45',text:'Apologies if youre hurt'},
  {at:35.2,who:'me', time:'00:45',text:'I just cried'},
  {at:38.6,who:'her',time:'00:45',text:'Look hurting you i would never want that ever'},
  {at:42.2,who:'her',time:'00:47',text:'You crying bec of me is the last thing i want in my entire life'},
  {at:47.2,who:'her',time:'00:53',text:'I love you alot to lose you at all'},
];
/* the three beats: the house (0–7.4, a dip to black), the call in the dark room (7.4–24.4, fades up from the dip, dips again), the chat after midnight (24.4–end) */
const S2_SIX={house:7.4,chat:24.4};
scene({id:'sixsep',name:'6 September',when:'2026-09-06T23:31',bars:16,fin:['#000000',1.4],fout:['#000000',1.6],
  note:'Usman’s birthday: the house full, the cake glowing through a doorway, shoes by the door; the dark room he went into, the phone propped, her face small and lit on the video call — laughing, then not; his hand over his eyes; and the chat after midnight.',
  tag:'“You do mean a lot to me.”',
  prep(){return{R:rooms(),party:s2_partyLayer(),room:s2_callRoom()};},
  draw(ctx,lt,A){
    if(lt<S2_SIX.house){
      /* the house, full */
      const dx=lerp(0,-50,smooth(0,7.2,lt)),bob=Math.sin(lt*1.7)*3;
      ctx.save();ctx.translate(dx,bob);
      ctx.drawImage(A.party,-20,0);
      for(let i=0;i<15;i++){const t=i/14,x=t*W+10,y=(1-t)*(1-t)*60+2*(1-t)*t*130+t*t*70,tw=0.6+0.4*Math.sin(lt*3+i*1.7);glow(ctx,x,y,34,'#ffd27a',0.3*tw);ctx.fillStyle=i%3===0?'#ffd27a':'#ffe9b8';ell(ctx,x,y+2,3.5,5);ctx.fill();}
      for(let k=0;k<6;k++){const fx=956+k*14,fl=0.8+0.2*Math.sin(lt*13+k*2.1);ctx.fillStyle='#fff3c0';ell(ctx,fx,416-4*fl,2.4,6*fl);ctx.fill();glow(ctx,fx,414,26,'#ffb347',0.35*fl);}
      glow(ctx,970,330,420,'#ffc070',0.22+0.04*Math.sin(lt*2.3));
      ctx.restore();
      const dk=smooth(6.6,7.4,lt);if(dk>0){ctx.fillStyle=`rgba(0,0,0,${dk.toFixed(3)})`;ctx.fillRect(0,0,W,H);}
      return;
    }
    if(lt<S2_SIX.chat){
      /* the dark room, the phone propped, her face on the call; the same warm pool of light the next scenes keep */
      ctx.drawImage(A.room,0,0);
      const v=0.26+0.06*Math.sin(lt*2.9)+0.04*Math.sin(lt*7.1);
      glow(ctx,175,545,240,'#ffb866',v);ctx.fillStyle=`rgba(255,196,120,${(0.5+0.3*v).toFixed(3)})`;ctx.fillRect(74,538,202,5);ctx.fillStyle='rgba(255,196,120,.2)';ctx.fillRect(275,54,2,486);
      glow(ctx,640,300,560,'#ffb27a',0.1);
      const laugh=lt<14.8,sad=smooth(16.2,19.4,lt);
      const o={timer:s2_mmss(1812+(lt-S2_SIX.house)),talk:laugh?((lt*0.9)%2<1.2):(lt>19.6&&lt<22.4&&(lt*1.1)%2<0.8),
        smile:laugh?0.75+0.2*Math.sin(lt*1.3):lerp(0.75,0.15,sad),eyes:laugh&&((lt*0.7)%3<0.9)?'happy':undefined,
        look:laugh?0.12*Math.sin(lt*0.6):lerp(0.1,0,sad),tilt:laugh?0.06*Math.sin(lt*0.8):lerp(0.04,0.1,sad),brow:lerp(0,0.6,sad)};
      ctx.save();ctx.translate(640,400);ctx.rotate(-0.035);
      const S=drawPhone(ctx,-150,-300,300,600,{screen:'#000'});
      s2_videoCall(ctx,S,lt,o);phoneTop(ctx,S,{time:lt<16?'00:01':'00:02'});
      ctx.restore();
      ctx.save();ctx.globalCompositeOperation='screen';glow(ctx,640,620,340,'#ffc090',0.12);glow(ctx,640,400,420,'#8a96b0',0.05);ctx.restore();
      s2_handOverEyes(ctx,smooth(15.4,18.4,lt));
      const cl=0.5*smooth(16.6,19.2,lt)*(1-0.35*smooth(21.4,24.0,lt));
      if(cl>0){const hh=cl*H*0.55;ctx.fillStyle=vgrad(ctx,hh-60,hh,[[0,'rgba(2,2,6,1)'],[1,'rgba(2,2,6,0)']]);ctx.fillRect(0,0,W,hh);ctx.fillStyle='rgba(2,2,6,1)';ctx.fillRect(0,0,W,Math.max(0,hh-60));
        ctx.fillStyle=vgrad(ctx,H-hh,H-hh+60,[[0,'rgba(2,2,6,0)'],[1,'rgba(2,2,6,1)']]);ctx.fillRect(0,H-hh,W,hh);ctx.fillStyle='rgba(2,2,6,1)';ctx.fillRect(0,H-hh+60,W,Math.max(0,hh-60));}
      /* up from the dip, and down into the next one */
      const fi=1-smooth(S2_SIX.house,S2_SIX.house+1.1,lt),dk=smooth(23.6,24.4,lt),k=Math.max(fi,dk);
      if(k>0){ctx.fillStyle=`rgba(0,0,0,${k.toFixed(3)})`;ctx.fillRect(0,0,W,H);}
      return;
    }
    /* after midnight */
    ctx.fillStyle='#030409';ctx.fillRect(0,0,W,H);
    ctx.save();ctx.globalAlpha=0.45;ctx.drawImage(A.R.night,0,0);ctx.restore();
    const S=drawPhoneHand(ctx,lt,{x:475,y:44,w:300,h:640});
    chatPanel(ctx,S,S2_AFTER,lt,{name:'Fabeha',status:'online'});
    phoneTop(ctx,S,{time:lt<31.8?'00:32':lt<42.2?'00:45':lt<47.2?'00:47':'00:53'});
    ctx.save();ctx.globalCompositeOperation='screen';glow(ctx,S.x+S.w/2,S.y+S.h*0.75,380,'#7fa6d8',0.14);ctx.restore();
    const fi=1-smooth(S2_SIX.chat,S2_SIX.chat+1.0,lt);if(fi>0){ctx.fillStyle=`rgba(0,0,0,${fi.toFixed(3)})`;ctx.fillRect(0,0,W,H);}
  },
  subs:[
    [0.8,6.4,'6 September. Usman’s birthday. The house was full, and everyone knew which room I had gone to.'],
    [8.6,12.2,'We were laughing. She teased me a little.'],
    [14.0,18.6,'And months of it came up at once. I started crying.'],
    [26.0,31.6,'Heyyyy\nDidn\'t mean to emotionally attack you or harm you. You do mean a lot to me.','her'],
    [32.0,35.0,'Apologies if youre hurt','her'],
    [35.4,38.4,'I just cried','him'],
    [38.8,42.0,'Look hurting you i would never want that ever','her'],
    [42.4,47.0,'You crying bec of me is the last thing i want in my entire life','her'],
    [47.4,50.6,'I love you alot to lose you at all','her'],
  ],
  score({T,add,at,hit,pad,melody,THEME_B,THEME_B_CH}){
    /* the house: one warm chord; the laughing: a thin pad and three notes; the crying: almost nothing; after midnight: her theme begins on the piano alone, and carries into the next scene */
    pad(T(0),'G',2.2,0.2,'pad');
    pad(T(2,1),'Em7',1.3,0.14,'pad');pad(T(3,2),'Cmaj7',1.2,0.13,'pad');
    [[9.0,76],[10.6,74],[12.4,71]].forEach(([t,m])=>add(at(t),'piano',{midi:m,dur:2.4,vel:0.26}));
    pad(T(4,2),'Em',2.6,0.08,'pad');add(at(16.4),'piano',{midi:52,dur:4,vel:0.2});
    pad(T(7,2),'Em',0.55,0.12,'pad');
    for(let b=8;b<16;b++){pad(T(b),THEME_B_CH[b-8],1.05,0.13,'pad');melody(b,b-8,'piano',0,0.3,THEME_B);}
    for(const m of S2_AFTER)hit(m.at,'tick',{hi:m.who==='her'});
  },
  amb(lt){return lt<S2_SIX.house?{crowd:0.3*(1-smooth(4.8,7.2,lt)),room:0.12}:{room:0.22};},
});
