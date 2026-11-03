/* act2.js — the letter, IBA, her voice, the birthday, Hajj, the little things, majestic, and the end card (scenes 7–15 of cut 3). */
'use strict';
const LETTER='Good night Fabeha. I just wanted to say something that’s inside my Dill. Behind every word, there is One truth: You are Always my Priority! Out of 8.4 Billion people on earth, You are the only Sunlight my heart reaches for. The way you Smile, the way your eyes were at the day of Malam Jabba… I’d always want to be the star, looking into the gloomy eyes of yours holding a galaxy worth of emotions.';

/* his room at night / the same room in the morning (shared by the letter and the voice-note scenes) */
let ROOMS=null;
function rooms(){
  if(ROOMS)return ROOMS;
  const c=mk(W,H),g=c.getContext('2d');
  g.fillStyle=vgrad(g,0,H,[[0,'#0e1020'],[1,'#1a1626']]);g.fillRect(0,0,W,H);
  g.fillStyle='#2a2438';g.fillRect(820,60,400,330);g.fillStyle='#0a1430';g.fillRect(834,74,372,302);
  const r=rng(71);g.fillStyle='#fff8e6';for(let i=0;i<90;i++){const s=r()*1.6+0.4;g.fillRect(840+r()*360,80+r()*250,s,s);}
  g.fillStyle='#3a3350';g.fillRect(1010,74,8,302);g.fillRect(834,220,372,8);
  const lamp=g.createRadialGradient(160,420,0,160,420,360);lamp.addColorStop(0,'rgba(255,190,120,.35)');lamp.addColorStop(1,'rgba(255,190,120,0)');g.fillStyle=lamp;g.fillRect(0,0,W,H);
  g.fillStyle='#2b2436';g.beginPath();g.moveTo(0,560);g.quadraticCurveTo(640,500,W,560);g.lineTo(W,720);g.lineTo(0,720);g.closePath();g.fill();
  const m=mk(W,H),mg=m.getContext('2d');mg.fillStyle=vgrad(mg,0,H,[[0,'#e9edf2'],[0.5,'#cfd8e3'],[1,'#b7c2d0']]);mg.fillRect(0,0,W,H);
  mg.fillStyle='#f6f0e6';mg.fillRect(820,60,400,330);mg.fillStyle='#bfe0f7';mg.fillRect(834,74,372,302);mg.fillStyle='#e8eef3';mg.fillRect(1010,74,8,302);mg.fillRect(834,220,372,8);
  const sun=mg.createRadialGradient(1000,160,0,1000,160,420);sun.addColorStop(0,'rgba(255,246,210,.9)');sun.addColorStop(1,'rgba(255,246,210,0)');mg.fillStyle=sun;mg.fillRect(0,0,W,H);
  mg.fillStyle='#d9d2c7';mg.beginPath();mg.moveTo(0,560);mg.quadraticCurveTo(640,500,W,560);mg.lineTo(W,720);mg.lineTo(0,720);mg.closePath();mg.fill();
  ROOMS={night:c,morning:m};return ROOMS;
}

/* 7 · 27 January — the letter */
scene({id:'letter',  when:'2026-01-27T22:30',name:'27 January · the letter',bars:11,fin:['#000000',1.4],fout:['#000000',1.2],
  prep(){return rooms();},
  draw(ctx,lt,A){
    const morning=lt>=21.2;
    ctx.drawImage(morning?A.morning:A.night,0,0);
    const S=drawPhoneHand(ctx,lt,{x:475,y:120,w:330,h:700});
    if(!morning){
      const sent=lt>=15.2;
      const msgs=sent?[{at:15.2,who:'me',time:'22:30',text:LETTER}]:[];
      chatPanel(ctx,S,msgs,lt,{name:'Fabeha',status:'last seen today at 22:04',draft:sent?'Message':''});
      if(!sent){
        const n=Math.max(0,Math.floor((lt-2)*33)),txt=LETTER.slice(0,n)+(((lt*2)|0)%2?'|':'');
        ctx.save();rrect(ctx,S.x,S.y,S.w,S.h,S.r);ctx.clip();
        ctx.font='500 15px "Mulish",sans-serif';const lines=wrapText(ctx,txt,S.w-70),lh=19,bh=lines.length*lh+22,by=S.y+S.h-66-bh;
        ctx.fillStyle='#2a3942';rrect(ctx,S.x+12,by,S.w-24,bh,14);ctx.fill();
        ctx.fillStyle='#e9edef';ctx.textAlign='left';for(let k=0;k<lines.length;k++)ctx.fillText(lines[k],S.x+24,by+16+k*lh);
        ctx.restore();
      }
      phoneTop(ctx,S,{time:lt<15.2?'22:2'+Math.min(9,Math.floor(lt/1.7)):'22:30'});
      const g=smooth(16,19,lt)*(1-smooth(20.4,21.2,lt));
      if(g>0){
        ctx.save();ctx.globalAlpha=g;ctx.fillStyle='#05060d';ctx.fillRect(0,0,W,H);stars(ctx,lt,420,72,H,0.9);
        glow(ctx,640,330,520,'#3b2f6b',0.5);
        ctx.globalAlpha=g*0.95;drawFabeha(ctx,640,330,2.7,{t:lt,outfit:'home',hair:'down',pose:'bust',smile:0.3,look:0,blush:0.3,wind:0.15,len:300});
        ctx.globalAlpha=g;ctx.globalCompositeOperation='screen';stars(ctx,lt,160,73,H,0.7);
        for(const ex of[-16,16]){glow(ctx,640+ex*2.7,330+4,60,'#9fd3f2',0.6);glow(ctx,640+ex*2.7-6,330-5,16,'#ffffff',0.9);}
        ctx.restore();
      }
    }else{
      const msgs=[{at:0,who:'me',time:'22:30',text:LETTER},{at:21.9,who:'her',time:'09:52',text:'Damn bro itna intense 😳 😭'},{at:23.6,who:'me',time:'12:14',text:'Honestly No Amount of words could define what i feel! For You! Specially when you are around!'},{at:25.0,who:'her',time:'13:22',text:'🎤  voice note · 0:11',vn:true},{at:35.0,who:'me',time:'14:08',text:'😂😂😂 understandable bro'}];
      chatPanel(ctx,S,msgs,lt,{name:'Fabeha',status:'online',dark:false});phoneTop(ctx,S,{time:lt<23.6?'09:52':lt<25?'12:14':lt<35?'13:22':'14:08'});
    }
  }
});

/* 8 · Dates at IBA */
scene({id:'iba',     when:'2026-02-07T12:00',name:'Dates at IBA',           bars:9, fin:['#000000',1.2],fout:['#000000',1.4],
  prep(){const r=rng(81),c=mk(W,H),g=c.getContext('2d');
    g.fillStyle=vgrad(g,0,H,[[0,'#8ec4ee'],[0.5,'#cfe6f6'],[1,'#e9f2f6']]);g.fillRect(0,0,W,H);
    g.fillStyle='#9a4b3b';g.fillRect(380,120,900,320);g.fillStyle='#a85443';g.fillRect(380,120,900,18);
    g.strokeStyle='rgba(255,230,210,.25)';g.lineWidth=1;for(let y=140;y<440;y+=11){g.beginPath();g.moveTo(380,y);g.lineTo(1280,y);g.stroke();}
    for(let k=0;k<6;k++){const x=430+k*150;g.fillStyle='#5b3a33';g.beginPath();g.moveTo(x,440);g.lineTo(x,250);g.arc(x+45,250,45,Math.PI,0);g.lineTo(x+90,440);g.closePath();g.fill();g.fillStyle='#2b3a4a';g.beginPath();g.moveTo(x+8,440);g.lineTo(x+8,252);g.arc(x+45,252,37,Math.PI,0);g.lineTo(x+82,440);g.closePath();g.fill();g.fillStyle='rgba(255,255,255,.12)';g.fillRect(x+8,300,74,4);}
    g.fillStyle='#f3e9d8';g.fillRect(560,150,420,52);g.fillStyle='#4a2f2a';g.font='700 24px "Mulish",sans-serif';g.textAlign='center';g.fillText('IBA  ·  MAIN CAMPUS',770,185);
    g.fillStyle='#6fa75a';g.fillRect(0,440,W,280);g.fillStyle='#86b96a';for(let i=0;i<120;i++){g.globalAlpha=0.3+r()*0.5;ell(g,r()*W,450+r()*270,30+r()*60,4+r()*6);g.fill();}g.globalAlpha=1;
    g.fillStyle='#d8cdb8';g.beginPath();g.moveTo(300,720);g.lineTo(520,440);g.lineTo(620,440);g.lineTo(720,720);g.closePath();g.fill();
    for(const[x,s]of[[150,150],[1180,120]])drawTreeClump(g,x,460,s,'#2d6a3a','#6fb25a',r);
    for(const[x,h]of[[60,300],[1240,260]]){g.strokeStyle='#8a6a48';g.lineWidth=14;g.beginPath();g.moveTo(x,460);g.quadraticCurveTo(x+10,300,x+20,460-h);g.stroke();g.strokeStyle='#3f8a3f';g.lineWidth=8;g.lineCap='round';for(let k=0;k<9;k++){const a=-Math.PI/2+(k/8-0.5)*2.6;g.beginPath();g.moveTo(x+20,460-h);g.quadraticCurveTo(x+20+Math.cos(a)*60,460-h+Math.sin(a)*60+20,x+20+Math.cos(a)*110,460-h+Math.sin(a)*110+70);g.stroke();}}
    g.fillStyle='rgba(0,0,0,.18)';ell(g,640,700,320,30);g.fill();
    g.fillStyle='#f1ebe0';ell(g,640,610,330,60);g.fill();g.fillStyle='#d9d0c2';ell(g,640,616,330,60);g.fill();g.fillStyle='#f1ebe0';ell(g,640,608,326,56);g.fill();
    return{c};},
  draw(ctx,lt,A){
    ctx.drawImage(A.c,0,0);
    sunGlow(ctx,1100,80,420,'rgba(255,250,225,0.55)');
    motes(ctx,lt,40,82,'#fff6cc',1.4,0.5);
    const hide=0,down=smooth(13,14,lt)*(1-smooth(18.5,19.5,lt)),talk=(lt>13.5&&lt<18);
    ctx.fillStyle='#4a4a52';ctx.fillRect(560,430,160,14);for(let x=566;x<720;x+=30)ctx.fillRect(x,370,10,62);ctx.fillRect(556,362,170,10);
    drawFabeha(ctx,640,420,1.25,{t:lt,outfit:'sage',hair:'low',pose:'bust',arms:hide>0?'hide':(lt<8?'lap':'cup'),hide,smile:hide>0?1:0.55+0.4*smooth(2,5,lt)-0.25*down,talk,look:down?0:0.12*Math.sin(lt*0.5),tilt:down*0.1+Math.sin(lt*0.4)*0.02,eyes:hide>0?'happy':undefined,blush:0.35+0.45*down+0.4*hide,wind:0.1});
    ctx.fillStyle='#f3b8c6';rrect(ctx,420,572,110,44,8);ctx.fill();ctx.fillStyle='#c76b84';ctx.font='700 13px "Mulish",sans-serif';ctx.textAlign='center';ctx.fillText('crumbl',475,600);
    const slide=smooth(5,7.5,lt),jx=lerp(880,760,slide);ctx.fillStyle='#1f2f4a';rrect(ctx,jx,578,78,44,7);ctx.fill();ctx.fillStyle='#2b3f5e';rrect(ctx,jx,578,78,10,4);ctx.fill();
    ctx.strokeStyle=FB.gold;ctx.lineWidth=2.4;ell(ctx,jx+26,604,13,8,0.2);ctx.stroke();ctx.lineWidth=1.4;ctx.beginPath();ctx.moveTo(jx+44,590);ctx.quadraticCurveTo(jx+58,600,jx+64,614);ctx.stroke();ctx.fillStyle=FB.gold;circle(ctx,jx+64,616,3.4);ctx.fill();ctx.fillStyle='#fff';circle(ctx,jx+63,615,1.2);ctx.fill();
    ctx.fillStyle='#f4efe6';rrect(ctx,800,540,36,54,6);ctx.fill();ctx.fillStyle='#c98a4a';rrect(ctx,804,560,28,30,4);ctx.fill();
  }
});

/* 9 · 28 March — the night she sent ten voice notes */
const VN28=[
  {at:0.6, time:'22:50',who:'her',text:'Which part of the body did that green snake bit yoy'},
  {at:1.6, time:'22:54',dur:80},{at:2.6,time:'22:57',dur:79},{at:3.6,time:'22:59',dur:10,play:0},{at:4.6,time:'22:59',dur:9,play:1},
  {at:5.6, time:'23:04',dur:16},{at:6.6,time:'23:05',dur:11},{at:7.6,time:'23:06',dur:14},{at:8.6,time:'23:07',dur:32},
  {at:9.6, time:'23:55',dur:78},{at:10.4,time:'23:56',dur:9},
  {at:29.8,time:'23:56',who:'me',text:'thankyouuuuuuu sooo much 😭😭😭😭'},
  {at:30.8,time:'00:01',link:true},
  {at:32.0,time:'00:45',who:'her',text:'3 times durood shareef · 3 times ayatal kursi · 3 times surah ikhlas · 3 times falaq'},
];
function voiceBubble(ctx,x,y,w,dur,time,prog,dark){
  const h=54;ctx.fillStyle=dark?'#202c33':'#ffffff';rrect(ctx,x,y,w,h,14);ctx.fill();
  ctx.fillStyle='#d8b4a0';circle(ctx,x+26,y+27,17);ctx.fill();ctx.fillStyle='#2a1d22';ell(ctx,x+26,y+22,13,11);ctx.fill();ctx.fillStyle='#f3d8c4';ell(ctx,x+26,y+28,9,10);ctx.fill();ctx.fillStyle='#2a1d22';ctx.fillRect(x+14,y+20,6,20);ctx.fillRect(x+32,y+20,6,20);
  ctx.fillStyle='#00a884';circle(ctx,x+38,y+40,7);ctx.fill();ctx.fillStyle='#fff';rrect(ctx,x+36,y+35,4,7,2);ctx.fill();
  ctx.fillStyle=dark?'#aebac1':'#54656f';ctx.beginPath();ctx.moveTo(x+54,y+17);ctx.lineTo(x+68,y+27);ctx.lineTo(x+54,y+37);ctx.closePath();ctx.fill();
  const bx=x+78,bw=w-96,n=26;for(let k=0;k<n;k++){const hh=5+14*Math.abs(Math.sin(k*1.9+dur));ctx.fillStyle=(prog!=null&&k/n<prog)?'#00a884':(dark?'rgba(174,186,193,.5)':'rgba(84,101,111,.45)');rrect(ctx,bx+k*(bw/n),y+27-hh/2,bw/n-2,hh,1.5);ctx.fill();}
  ctx.fillStyle=dark?'rgba(233,237,239,.6)':'rgba(0,0,0,.45)';ctx.font='500 11px "Mulish",sans-serif';ctx.textAlign='left';ctx.fillText((prog!=null?Math.floor(prog*dur):dur)>=60?Math.floor(dur/60)+':'+String(dur%60).padStart(2,'0'):'0:'+String(prog!=null?Math.floor(prog*dur):dur).padStart(2,'0'),bx,y+49);
  ctx.textAlign='right';ctx.fillText(time,x+w-10,y+49);
}
act('III','Spring','Ramadan, the birthday, Hajj · 16 March – 2 June 2026','2026-06-02T23:59');
scene({id:'voices',  when:'2026-03-28T22:50',name:'28 March · her voice',   bars:10,fin:['#000000',1.4],fout:['#000000',1.2],
  prep(){return rooms();},
  draw(ctx,lt,A){
    ctx.drawImage(A.night,0,0);
    ctx.fillStyle='rgba(0,0,10,.25)';ctx.fillRect(0,0,W,H);
    const S=drawPhoneHand(ctx,lt,{x:475,y:120,w:330,h:700});
    ctx.save();rrect(ctx,S.x,S.y,S.w,S.h,S.r);ctx.clip();
    ctx.fillStyle='#0b141a';ctx.fillRect(S.x,S.y,S.w,S.h);
    const hy=S.y+36,hh=58;
    const vis=VN28.filter(v=>v.at<=lt);let y=Math.min(S.y+S.h-74,H-136);
    for(let i=vis.length-1;i>=0&&y>hy+hh+10;i--){
      const v=vis[i];
      if(v.text){ctx.font='500 15px "Mulish",sans-serif';const lines=wrapText(ctx,v.text,S.w*0.72-20),mine=v.who==='me';let bw=0;for(const l of lines)bw=Math.max(bw,ctx.measureText(l).width);bw=Math.min(S.w*0.74,bw+20+40);const bh=lines.length*19+30;y-=bh;const bx=mine?S.x+S.w-14-bw:S.x+14;ctx.fillStyle=mine?'#005c4b':'#202c33';rrect(ctx,bx,y,bw,bh,12);ctx.fill();ctx.fillStyle='#e9edef';ctx.textAlign='left';lines.forEach((l,k)=>ctx.fillText(l,bx+10,y+24+k*19));ctx.fillStyle='rgba(233,237,239,.55)';ctx.font='500 11px "Mulish",sans-serif';ctx.textAlign='right';ctx.fillText(v.time+(mine?'  ✓✓':''),bx+bw-8,y+bh-7);y-=8;continue;}
      if(v.link){const bh=74;y-=bh;ctx.fillStyle='#202c33';rrect(ctx,S.x+14,y,S.w*0.78,bh,14);ctx.fill();ctx.fillStyle='#c4302b';rrect(ctx,S.x+24,y+10,54,38,6);ctx.fill();ctx.fillStyle='#fff';ctx.beginPath();ctx.moveTo(S.x+45,y+20);ctx.lineTo(S.x+60,y+29);ctx.lineTo(S.x+45,y+38);ctx.closePath();ctx.fill();ctx.fillStyle='#e9edef';ctx.font='600 13px "Mulish",sans-serif';ctx.textAlign='left';ctx.fillText('Play it apnay room mein',S.x+88,y+26);ctx.fillStyle='#8696a0';ctx.font='500 12px "Mulish",sans-serif';ctx.fillText('youll feel peace · YouTube',S.x+88,y+44);ctx.fillText('00:01',S.x+88,y+62);y-=8;continue;}
      const bh=54;y-=bh;
      let prog=null;if(v.play===0&&lt>=11)prog=clamp((lt-11)/10.4);if(v.play===1&&lt>=22)prog=clamp((lt-22)/9.4);
      const pop=i===vis.length-1?backOut(clamp((lt-v.at)/0.28)):1;
      ctx.save();ctx.translate(S.x+14,y+bh);ctx.scale(pop,pop);ctx.translate(-(S.x+14),-(y+bh));
      voiceBubble(ctx,S.x+14,y,S.w*0.8,v.dur,v.time,prog,true);ctx.restore();
      y-=8;
    }
    ctx.fillStyle='#0b141a';ctx.fillRect(S.x,S.y,S.w,hy-S.y);ctx.fillStyle='#1f2c34';ctx.fillRect(S.x,hy,S.w,hh);
    ctx.fillStyle='#d8b4a0';circle(ctx,S.x+44,hy+hh/2,17);ctx.fill();ctx.fillStyle='#2a1d22';ell(ctx,S.x+44,hy+hh/2-4,13,11);ctx.fill();ctx.fillStyle='#f3d8c4';ell(ctx,S.x+44,hy+hh/2+1,9,10);ctx.fill();ctx.fillStyle='#2a1d22';ctx.fillRect(S.x+32,hy+hh/2-10,6,20);ctx.fillRect(S.x+50,hy+hh/2-10,6,20);
    ctx.fillStyle='#e9edef';ctx.font='700 16px "Mulish",sans-serif';ctx.textAlign='left';ctx.fillText('Fabeha',S.x+70,hy+hh/2+1);ctx.fillStyle='#8696a0';ctx.font='500 12px "Mulish",sans-serif';ctx.fillText(lt<11?'recording audio…':'online',S.x+70,hy+hh/2+18);
    const iy=S.y+S.h-56;ctx.fillStyle='#1f2c34';ctx.fillRect(S.x,iy,S.w,56);ctx.fillStyle='#2a3942';rrect(ctx,S.x+12,iy+10,S.w-70,36,18);ctx.fill();ctx.fillStyle='#8696a0';ctx.font='500 14px "Mulish",sans-serif';ctx.textAlign='left';ctx.fillText('Message',S.x+28,iy+33);ctx.fillStyle='#00a884';circle(ctx,S.x+S.w-30,iy+28,18);ctx.fill();ctx.fillStyle='#fff';rrect(ctx,S.x+S.w-33,iy+19,6,11,3);ctx.fill();
    ctx.restore();
    phoneTop(ctx,S,{time:lt<9.6?'22:5'+Math.min(9,Math.floor(lt)):lt<30.8?'23:5'+Math.min(9,5+Math.floor((lt-9.6)/5)):lt<32?'00:01':'00:45'});
  }
});

/* 10 · 10 April — at 12 exactly: the wish, the page he built (letter, game, finale), her answer */
const BDAY=[
  {at:4.2, who:'me', time:'00:00',text:'happy birthday my love'},
  {at:4.5, who:'me', time:'00:00',text:'❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️'},
  {at:5.2, who:'me', time:'00:00',text:'🔗 fabeha-happybirthday-love.tiiny.site'},
  {at:7.0, who:'her',time:'00:00',text:'Thank youuuu🥰🥰🥰🥰🥰🥰🥰🥰😂'},
  {at:8.4, who:'me', time:'00:01',text:'did you thought i forgot ?'},
  {at:9.6, who:'me', time:'00:01',text:'there is a game at the end as well'},
  {at:11.0,who:'me', time:'00:02',text:'Milooon ke hai faasle tum se naa jaane kyu 🎵'},
  {at:12.3,who:'me', time:'00:04',text:'▶ Meri Laila · youtube.com/watch?v=49x8GA2axfc'},
  {at:13.2,who:'me', time:'00:04',text:'ye gaana bhi daala tha'},
  {at:38.2,who:'her',time:'00:04',text:'Ahhh this is sooo goodfff. Thank you so muchhh. Im blessed to have youu💕💕💕💕'},
  {at:39.8,who:'her',time:'00:05',text:'The best birthday wish ive ever received in 22 years'},
  {at:41.2,who:'me', time:'00:05',text:'you liked it makes it worth every micro second of it'},
  {at:42.3,who:'me', time:'00:40',text:'FOR YOU a thousand time over'},
];
const POEM=[
  ['Zindagi ne mujhe bahut kuch sikhaya hai,','Uthaya bhi, giraya bhi, breakdowns bhi','krwaye restrooms mein,','Kaafi ups and downs dekhe hain maine,','Almost har dafa mein akela khara raha hoon.'],
  ['Lekin jab se aaye ap meri zindagi mein,','Kuch alag sa ehsaas hua hai,','Dil jo pehle thaka hua tha,','Woh ab gardan gardan karta hai. 💗'],
  ['Pata nahi yeh kya jaadu hai apka,','Lagta jaise koi hoor Jannat se ayi,','Lekin wo bhi kaise lagta kyu ke','Tu unse bhi zyaada pyaari. 💕'],
  ['Mushkil waqt bhi aasaan lagta hai,','Milooon ke hai faasle tum se naa jaane kyu 🎵','Phir bhi dil ke paas lagta hai.'],
  ['Dooriyan hain beech mein, yeh sach hai,','Par kal ki mulaqat ka intezaar hai,','Yeh raat bhi guzar jaayegi jaldi,','Kyunki teri khushi mera sab kuch hai. ❤️'],
  ['Aaj apke janamdin pe kehna chahta hoon,','Jo dil ne alaan kiya howa butt again,','Mohabbat hai mujhe Apse sacchi,','Ap woh roshni hai jo zindagi mein aaya tha. ✨'],
  ['Kal milenge, haath thaame,','Lekin apke rules ajate hai koi nahi','jaise ap bole,','Aur yeh ehsaas aur gehra hoga,','Kyu ke ap hoooro se poyaari hoo Fabehaaaa! 💖'],
  ['Happy Birthdayyyyyyyyyyyyyy Meri Pookie! 🎂💕🎉','','Tumhara Hamesha, Forever & Always ❤️'],
];
const HEARTS=['💖','💕','💗','💓','💝','💘','❤️','🩷','♥️','💞'];
function birthdayPage(ctx,S,lt){
  ctx.save();rrect(ctx,S.x,S.y,S.w,S.h,S.r);ctx.clip();
  const cx=S.x+S.w/2,u=lt-16;
  ctx.fillStyle='#0a0a0a';ctx.fillRect(S.x,S.y,S.w,S.h);
  const rg=ctx.createRadialGradient(cx,S.y+S.h/2,0,cx,S.y+S.h/2,S.h*0.7);rg.addColorStop(0,'#1a0a10');rg.addColorStop(1,'#0a0a0a');ctx.fillStyle=rg;ctx.fillRect(S.x,S.y,S.w,S.h);
  const r=rng(95);ctx.textAlign='center';ctx.textBaseline='middle';
  for(let i=0;i<22;i++){const x=S.x+r()*S.w,sp=28+r()*40,ph=r()*TAU,fs=12+r()*18,y=S.y+S.h-((lt*sp+r()*S.h)%(S.h+80))+40;if(y<S.y+52)continue;ctx.globalAlpha=0.35+0.45*Math.sin(lt*1.3+ph);ctx.font=fs+'px serif';ctx.fillText(HEARTS[i%HEARTS.length],x+Math.sin(lt+ph)*6,y);}
  ctx.globalAlpha=1;ctx.textBaseline='alphabetic';
  const pink='#ff6b9d',rose='#ff9ec7',paper='#ffd4e5';
  const glowText=(txt,x,y,font,col,blur)=>{ctx.save();ctx.font=font;ctx.fillStyle=col;ctx.shadowColor=col;ctx.shadowBlur=blur;ctx.fillText(txt,x,y);ctx.restore();};
  if(u<2.5){ /* landing */
    const beat=1+0.08*Math.abs(Math.sin(lt*5.2));ctx.save();ctx.translate(cx,S.y+230);ctx.scale(beat,beat);ctx.font='88px serif';ctx.textBaseline='middle';ctx.fillText('💖',0,0);ctx.restore();
    glowText('Happy Birthday Fabeha',cx,S.y+330,'400 34px "Great Vibes",cursive',pink,18+6*Math.sin(lt*3));
    ctx.font='700 17px "Dancing Script",cursive';ctx.fillStyle=rose;ctx.globalAlpha=smooth(0.6,1.4,u);ctx.fillText('My Pookie, I made something special for you...',cx,S.y+372);ctx.globalAlpha=0.5+0.4*Math.sin(lt*3);
    ctx.font='500 12px "Mulish",sans-serif';ctx.fillStyle='#ff6b9d';ctx.fillText('tap anywhere to open 💌',cx,S.y+430);ctx.globalAlpha=1;
  }else if(u<11){ /* the letter */
    const k=Math.min(POEM.length-1,Math.floor((u-2.5)/1.06)),stanza=POEM[k],fade=smooth(0,0.25,(u-2.5)%1.06)*(1-smooth(0.9,1.06,(u-2.5)%1.06));
    ctx.fillStyle='#1f0c18';rrect(ctx,S.x+16,S.y+70,S.w-32,S.h-170,18);ctx.fill();ctx.strokeStyle='rgba(255,107,157,.3)';ctx.lineWidth=2;rrect(ctx,S.x+16,S.y+70,S.w-32,S.h-170,18);ctx.stroke();
    glowText('Dear Fabeha, My Pookie 💌',cx,S.y+124,'400 21px "Great Vibes",cursive',pink,12);
    ctx.save();ctx.globalAlpha=k===POEM.length-1?1:fade;ctx.fillStyle=paper;ctx.font='700 17px "Dancing Script",cursive';
    const y0=S.y+196,rows=[];stanza.forEach(line=>rows.push(...wrapText(ctx,line,S.w-72)));rows.forEach((line,i)=>ctx.fillText(line,cx,y0+i*28));
    if(k===POEM.length-1){ctx.font='400 20px "Great Vibes",cursive';ctx.fillStyle=pink;ctx.textAlign='right';ctx.fillText('Tumhara Hamesha ❤️',S.x+S.w-36,S.y+S.h-130);ctx.textAlign='center';}
    ctx.restore();
    ctx.strokeStyle=pink;ctx.lineWidth=2;rrect(ctx,cx-100,S.y+S.h-86,200,40,20);ctx.stroke();ctx.fillStyle=pink;ctx.font='500 13px "Mulish",sans-serif';ctx.fillText('I have a game for you 🎮',cx,S.y+S.h-61);
  }else if(u<19.5){ /* Catch My Love! */
    glowText('Catch My Love!',cx,S.y+96,'400 30px "Great Vibes",cursive',pink,12);
    ctx.fillStyle=rose;ctx.font='500 11px "Mulish",sans-serif';ctx.fillText('Tap the hearts to catch them! Avoid the 💔',cx,S.y+120);
    const gx=S.x+22,gy=S.y+136,gw=S.w-44,gh=S.h-240;ctx.fillStyle=vgrad(ctx,gy,gy+gh,[[0,'#1a0a14'],[1,'#0d050a']]);rrect(ctx,gx,gy,gw,gh,16);ctx.fill();ctx.strokeStyle='rgba(255,107,157,.3)';rrect(ctx,gx,gy,gw,gh,16);ctx.stroke();
    const g=u-11,over=g>7.2;let score=0;
    ctx.save();rrect(ctx,gx,gy,gw,gh,16);ctx.clip();ctx.textBaseline='middle';
    for(let i=0;i<16;i++){const st=i*0.45,dur=2.4+((i*37)%10)/10,x=gx+34+((i*83)%(gw-68)),p=(g-st)/dur,broken=i%4===3;if(p<0||p>1)continue;const y=gy-20+p*(gh+40);const caught=!broken&&p>0.5&&p<0.62;if(!broken&&p>=0.62){score++;continue;}
      if(caught){ctx.font='18px serif';ctx.fillStyle=pink;ctx.globalAlpha=1-(p-0.5)/0.12;ctx.fillText('+1 💖',x,y-20);ctx.globalAlpha=1;ctx.strokeStyle='rgba(255,255,255,.5)';circle(ctx,x,y,10+(p-0.5)*150);ctx.stroke();}
      else{ctx.font=(broken?14:28)+'px serif';ctx.globalAlpha=broken?0.7:1;ctx.fillText(broken?'💔':HEARTS[i%HEARTS.length],x,y);ctx.globalAlpha=1;}}
    ctx.restore();ctx.textBaseline='alphabetic';
    ctx.fillStyle=rose;ctx.font='600 13px "Mulish",sans-serif';ctx.textAlign='left';ctx.fillText('💖 '+score,gx+14,gy+22);ctx.textAlign='center';ctx.fillText('⏱ '+Math.max(0,30-Math.floor(g))+'s',cx,gy+22);ctx.textAlign='right';ctx.fillText('❤️ 3',gx+gw-14,gy+22);ctx.textAlign='center';
    if(over){ctx.fillStyle='rgba(10,10,10,.85)';rrect(ctx,gx,gy,gw,gh,16);ctx.fill();glowText('So much love caught! 💕',cx,gy+gh/2-30,'400 24px "Great Vibes",cursive',pink,10);ctx.fillStyle=rose;ctx.font='500 13px "Mulish",sans-serif';ctx.fillText('You caught 14 hearts! 💖',cx,gy+gh/2+2);ctx.strokeStyle=pink;ctx.lineWidth=2;rrect(ctx,cx-62,gy+gh/2+24,124,32,16);ctx.stroke();ctx.fillStyle=pink;ctx.fillText('Continue 💌',cx,gy+gh/2+45);}
  }else{ /* finale */
    const beat=1+0.08*Math.abs(Math.sin(lt*5.2));ctx.save();ctx.translate(cx,S.y+150);ctx.scale(beat,beat);ctx.font='70px serif';ctx.textBaseline='middle';ctx.fillText('💖',0,0);ctx.restore();
    glowText('Fabeha, You Are',cx,S.y+250,'400 32px "Great Vibes",cursive',pink,16);glowText('My Everything',cx,S.y+292,'400 32px "Great Vibes",cursive',pink,16);
    ctx.fillStyle=paper;ctx.font='700 14px "Dancing Script",cursive';['Tu meri zindagi ki sabse','khoobsurat cheez hai.','Aaj, kal, aur hamesha —','mera dil sirf tere liye dharkta hai.','','Happy Birthday, Meri Pookie! 🎂💕🎉','Hoor se bhi zyaada pyaari hai tu! 👑'].forEach((l,i)=>ctx.fillText(l,cx,S.y+350+i*26));
  }
  ctx.fillStyle='rgba(26,10,20,.85)';circle(ctx,S.x+S.w-34,S.y+S.h-34,18);ctx.fill();ctx.strokeStyle=pink;ctx.lineWidth=1.5;circle(ctx,S.x+S.w-34,S.y+S.h-34,18+2*Math.sin(lt*4));ctx.stroke();ctx.fillStyle=pink;ctx.font='16px serif';ctx.textBaseline='middle';ctx.fillText('🎶',S.x+S.w-34,S.y+S.h-34);ctx.textBaseline='alphabetic';
  ctx.restore();
}
scene({id:'birthday',when:'2026-04-10T00:00',name:'10 April · at 12',       bars:13,fin:['#000000',1.4],fout:['#000000',1.2],
  prep(){const c=mk(W,H),g=c.getContext('2d');
    g.fillStyle=vgrad(g,0,H,[[0,'#0b0d18'],[1,'#17121f']]);g.fillRect(0,0,W,H);
    g.fillStyle='#2a2330';g.fillRect(0,520,W,200);g.fillStyle='#35293a';g.fillRect(0,520,W,10);
    g.fillStyle='#2f3140';g.beginPath();g.moveTo(60,560);g.lineTo(440,560);g.lineTo(460,600);g.lineTo(40,600);g.closePath();g.fill();
    g.fillStyle='#1c1d26';rrect(g,70,240,360,320,12);g.fill();g.fillStyle='#0a0a0a';rrect(g,82,252,336,296,6);g.fill();
    g.fillStyle='#ff6b9d';g.font='400 26px "Great Vibes",cursive';g.textAlign='center';g.shadowColor='#ff6b9d';g.shadowBlur=14;g.fillText('Happy Birthday Fabeha',250,330);g.shadowBlur=0;
    g.fillStyle='#ff9ec7';g.font='400 14px "Dancing Script",cursive';g.fillText('My Pookie, I made something special for you...',250,360);
    const lg=g.createRadialGradient(250,400,0,250,400,500);lg.addColorStop(0,'rgba(255,120,170,.3)');lg.addColorStop(1,'rgba(255,120,170,0)');g.fillStyle=lg;g.fillRect(0,0,W,H);
    return{c};},
  draw(ctx,lt,A){
    ctx.drawImage(A.c,0,0);
    const S=drawPhoneHand(ctx,lt,{x:600,y:110,w:330,h:700});
    const page=lt>=16&&lt<37.4;
    if(page){birthdayPage(ctx,S,lt);phoneTop(ctx,S,{time:'00:0'+Math.min(4,1+Math.floor((lt-16)/7))});}
    else{
      const pre=lt<4.2;
      chatPanel(ctx,S,BDAY,lt,{name:'Fabeha',status:pre?'last seen yesterday at 23:47':'online',draft:pre?('happy birthday my love'.slice(0,Math.max(0,Math.floor((lt-0.5)*9)))||'Message'):'Message'});
      const sec=pre?'00:00':(lt<37.4?'00:0'+Math.min(9,Math.floor(Math.max(0,lt-4.2)/2.6)):lt<42.3?'00:0'+Math.min(5,4+Math.floor((lt-37.4)/1.6)):'00:40');
      phoneTop(ctx,S,{time:sec});
      if(pre){const a=smooth(2.8,3.4,lt)*(1-smooth(4.0,4.3,lt));if(a>0){ctx.save();ctx.globalAlpha=a;ctx.fillStyle='rgba(0,0,0,.55)';ctx.fillRect(S.x,S.y,S.w,S.h);ctx.fillStyle='#fff';ctx.textAlign='center';ctx.font='700 64px "Mulish",sans-serif';ctx.fillText('00:00',S.x+S.w/2,S.y+S.h/2);ctx.font='500 14px "Mulish",sans-serif';ctx.fillText('10 April',S.x+S.w/2,S.y+S.h/2+34);ctx.restore();}}
    }
    if(lt>4.2&&lt<9)confetti(ctx,lt,80,93,['#ff6b8b','#ffb347','#7fd1ff','#b388ff','#fff']);
    if(lt>=16&&lt<18.5){const a=smooth(16,16.5,lt)*(1-smooth(17.8,18.5,lt));ctx.fillStyle=`rgba(255,107,157,${0.12*a})`;ctx.fillRect(0,0,W,H);}
  }
});

/* 11 · 10 April — that night: her messages about the day, his answer, and her calls at midnight */
const TENTH_B=[
  {at:0.8, who:'her',time:'20:58',text:'I was so excited to meet you'},
  {at:2.0, who:'her',time:'21:00',text:'I even brought uni ka bag har jaga lolll'},
  {at:3.1, who:'her',time:'21:01',text:'Mene raste mein hi ms kay sath schedule bhi karleti meeting'},
  {at:3.9, who:'her',time:'21:01',text:'Kay jhoot na lagay'},
  {at:5.6, who:'me', time:'21:02',text:'When you said time lagega and going natasha house i thought ap busy hai tou apko tang na kaaro'},
  {at:8.9, who:'her',time:'21:04',text:'Mein apko kabhi katao gi nhi'},
  {at:10.3,who:'her',time:'21:34',text:'And another thing i wanna add every plan ho beech mein aya tha was to makes our successful but koii nhi'},
];
const TENTH_C=[
  {at:12.4,kind:'call',time:'23:29',text:'Missed call'},
  {at:13.5,kind:'call',time:'23:30',text:'Missed call'},
  {at:14.6,kind:'call',time:'23:31',text:'Missed call'},
  {at:15.6,kind:'msg',time:'23:33',text:'Are you okayyy???'},
  {at:17.4,kind:'msg',time:'01:20',text:'Nizamani ap teekh toh hona?'},
  {at:19.2,kind:'msg',time:'05:16',text:'Pakka na? My panicked ass thought kay ye kahi toll par rush se phassa hai and hasnt reached home…'},
];
scene({id:'tenth',   when:'2026-04-10T20:57',name:'10 April · that night',  bars:7, fin:['#000000',1.2],fout:['#000000',1.4],
  draw(ctx,lt,A){
    if(lt<11.6){
      ctx.fillStyle=vgrad(ctx,0,H,[[0,'#1a1220'],[1,'#2b1a2a']]);ctx.fillRect(0,0,W,H);
      bokeh(ctx,lt,46,192,['#ffd27a','#ff9bb3','#7fd1ff','#fff'],10,40,0.5);
      const S=drawPhoneHand(ctx,lt,{x:475,y:120,w:330,h:700});
      chatPanel(ctx,S,TENTH_B,lt,{name:'Fabeha',status:'online'});
      phoneTop(ctx,S,{time:lt<2?'20:58':lt<3.1?'21:00':lt<5.6?'21:01':lt<8.9?'21:02':lt<10.3?'21:04':'21:34'});
      return;
    }
    ctx.fillStyle=vgrad(ctx,0,H,[[0,'#07070c'],[1,'#121018']]);ctx.fillRect(0,0,W,H);
    ctx.fillStyle='#1c1a22';ctx.beginPath();ctx.moveTo(0,360);ctx.lineTo(W,300);ctx.lineTo(W,720);ctx.lineTo(0,720);ctx.closePath();ctx.fill();
    const ev=TENTH_C.filter(e=>e.at<=lt),lastEv=ev[ev.length-1],age=lastEv?lt-lastEv.at:9,lit=lastEv?smooth(0,0.1,age)*(1-smooth(2.4,3.2,age)):0,buzz=lastEv&&lastEv.kind==='call'&&age<0.9?Math.sin(age*90)*3:0;
    ctx.save();ctx.translate(640+buzz,400);ctx.rotate(-0.12);
    const S=drawPhone(ctx,-150,-320,PHONE.w,PHONE.h,{screen:'#000'});
    if(lit>0){ctx.save();rrect(ctx,S.x,S.y,S.w,S.h,S.r);ctx.clip();ctx.globalAlpha=lit;
      ctx.fillStyle=vgrad(ctx,S.y,S.y+S.h,[[0,'#1b2440'],[1,'#0d1020']]);ctx.fillRect(S.x,S.y,S.w,S.h);
      ctx.fillStyle='#fff';ctx.textAlign='center';ctx.font='300 64px "Mulish",sans-serif';ctx.fillText(lastEv.time,S.x+S.w/2,S.y+150);ctx.font='500 14px "Mulish",sans-serif';ctx.fillText(lastEv.time<'06:00'?'Saturday 11 April':'Friday 10 April',S.x+S.w/2,S.y+176);
      let y=S.y+210;
      for(let i=ev.length-1;i>=0&&y<S.y+S.h-80;i--){const e=ev[i];ctx.font='500 14px "Mulish",sans-serif';const lines=e.kind==='call'?['Fabeha','Missed voice call · '+e.time]:['Fabeha · '+e.time].concat(wrapText(ctx,e.text,S.w-70)),h=lines.length*19+20;ctx.fillStyle='rgba(255,255,255,.14)';rrect(ctx,S.x+12,y,S.w-24,h,14);ctx.fill();ctx.fillStyle=e.kind==='call'?'#ff6b6b':'#25d366';circle(ctx,S.x+30,y+h/2,8);ctx.fill();ctx.fillStyle='#fff';ctx.textAlign='left';lines.forEach((s,k)=>{ctx.font=k===0?'700 14px "Mulish",sans-serif':'500 14px "Mulish",sans-serif';ctx.fillText(s,S.x+48,y+22+k*19);});y+=h+8;}
      ctx.restore();glow(ctx,S.x+S.w/2,S.y+S.h/2,520,'#4a6aa8',0.25*lit);}
    ctx.restore();
    ctx.fillStyle='rgba(0,0,0,.25)';ctx.fillRect(0,0,W,H);
  }
});

/* 12 · 19 April — her dua at the airport (the phone goes down and her prayer fills the frame, sentence by sentence),
   his thank-you on the phone, then his dua from Riyaz ul Jannah in Madina, lifted off the phone and shown big */
const DUA_HER='As i dont really know if you\'ll be having Internet connection issues at the airport or not, I\'m saying it rn that all my heartfelt prayers are with you. May Allah accept all your sincere prayers, forgive your shortcomings, and grant you all his blessings. I know it\'s  a tough journey, so May he ease every step of your journey, keep you and your mum safe, and bless you with peace and good health. May Allah almighty accept your hajj and wash all your sins so you return home like a newborn baby.\nMay this journey change you into a more beautiful, kind, and compassionate human being, and most importantly, a practising momin.\n\nHave a safe journey. I wish you all the best.\nWith lots of love and duas from my side.';   /* 21:06:30, verbatim */
const DUA_FLOWERS='💐💐💐💐💐🌸🌸🌸🌸🌸🌼🌼🌼🌼🌼🌼🌹🌹🌹🌹✨✨✨✨✨✨';   /* 21:06:59 */
const DUA_SENT=DUA_HER.replace(/\n+/g,' ').split(/(?<=[.])\s+/);   /* 8 sentences: four on the first card, four and the flowers on the second */
const DUA_AT=[6.2,11.8,16.8,22.4, 29.8,35.2,36.6,38.2,40.0];        /* when each one lands (the last is the flowers) */
const DUA_PAGE=[[27.4,28.4,26.0],[43.4,44.4,41.6]];                 /* each card: fade-out from, to; when every sentence brightens again before it */
const RIYAZ='Meri paak mohabbat ki maine ajj mehram hone ki dua ki hai, Riyaz ul Jannah, jannat ka tukra… Or sath mein ye bhi';
const DUA_FONT=fs=>`600 ${fs}px "Cormorant Garamond",Georgia,serif`;
/* wrap to the same number of lines as a greedy wrap, but as evenly as possible */
function duaBalance(ctx,text,maxW){const n=wrapText(ctx,text,maxW).length;if(n<2)return[text];let lo=maxW*0.35,hi=maxW;for(let k=0;k<12;k++){const m=(lo+hi)/2;if(wrapText(ctx,text,m).length<=n)hi=m;else lo=m;}return wrapText(ctx,text,hi);}
/* the two cards' layout: measured once per font state (it changes when Cormorant finishes loading); one font size for both */
let DUA_LAY=null;
function duaLayout(ctx){
  ctx.font=DUA_FONT(36);const key=ctx.measureText(DUA_SENT[1]).width;
  if(DUA_LAY&&DUA_LAY.key===key)return DUA_LAY;
  let L=null;
  for(let fs=40;fs>=30;fs-=2){
    ctx.font=DUA_FONT(fs);const lh=Math.round(fs*1.3),gap=Math.round(fs*0.42),maxW=1100;
    const p0=[0,1,2,3].map(i=>({lines:duaBalance(ctx,DUA_SENT[i],maxW),at:[DUA_AT[i]],next:DUA_AT[i+1]}));
    const p1=[{lines:duaBalance(ctx,DUA_SENT[4],maxW),at:[DUA_AT[4]],next:DUA_AT[5]},
      {lines:[DUA_SENT[5]+' '+DUA_SENT[6]],seg:[5,6],at:[DUA_AT[5],DUA_AT[6]],next:DUA_AT[7],close:true},
      {lines:[DUA_SENT[7]],at:[DUA_AT[7]],next:DUA_AT[8],close:true}];
    ctx.font=DUA_FONT(Math.round(fs*0.7));p1.push({lines:wrapText(ctx,DUA_FLOWERS,maxW),at:[DUA_AT[8]],next:99,flowers:true});ctx.font=DUA_FONT(fs);
    const pages=[p0,p1].map(blocks=>{let h=0;blocks.forEach((b,k)=>{b.dy=h;h+=b.lines.length*lh+(k<blocks.length-1?gap:0);});return{blocks,h};});
    L={key,fs,lh,pages};if(Math.max(pages[0].h,pages[1].h)<=540)break;
  }
  return DUA_LAY=L;
}
/* her prayer, full frame: warm light on a dark gradient, a few motes, each sentence fading up as it lands; two cards, the second after the first */
function duaCard(ctx,lt,A,a){
  ctx.save();ctx.globalAlpha=a;ctx.drawImage(A.card,0,0);
  glow(ctx,640,350,600+30*Math.sin(lt*0.5),'#ffc27a',0.09);
  const r=rng(1919);ctx.globalCompositeOperation='screen';
  for(let i=0;i<18;i++){const x0=r()*W,sp=7+r()*12,ph=r()*TAU,s=1.4+r()*2.4,y=H+30-((lt*sp+r()*(H+60))%(H+60)),x=x0+Math.sin(lt*0.35+ph)*26,tw=0.45+0.55*Math.sin(lt*1.5+ph);
    const g=ctx.createRadialGradient(x,y,0,x,y,s*4);g.addColorStop(0,hexA('#ffe2a8',0.8*tw));g.addColorStop(1,hexA('#ffe2a8',0));ctx.fillStyle=g;ctx.fillRect(x-s*4,y-s*4,s*8,s*8);}
  ctx.globalCompositeOperation='source-over';
  const L=duaLayout(ctx);
  /* a small gold star and her name, fixed above both cards */
  const hy=98;ctx.save();ctx.translate(640,hy-36);ctx.rotate(lt*0.04);ctx.fillStyle='rgba(226,190,130,.85)';ctx.shadowColor='rgba(255,200,130,.6)';ctx.shadowBlur=10;
  ctx.beginPath();for(let k=0;k<16;k++){const rr=k%2?4.6:11,an=k/16*TAU-Math.PI/2;ctx.lineTo(Math.cos(an)*rr,Math.sin(an)*rr);}ctx.closePath();ctx.fill();ctx.restore();
  ctx.font='italic 500 22px "Cormorant Garamond",Georgia,serif';ctx.textAlign='center';ctx.fillStyle='#d9b27a';ctx.fillText('Fabeha  ·  21:06',640,hy);
  const lw=ctx.measureText('Fabeha  ·  21:06').width/2+18;ctx.fillStyle='rgba(217,178,122,.45)';ctx.fillRect(640-lw-80,hy-7,80,1.2);ctx.fillRect(640+lw,hy-7,80,1.2);
  L.pages.forEach((P,pi)=>{
    const[f0,f1,allAt]=DUA_PAGE[pi],pa=1-smooth(f0,f1,lt);if(pa<=0)return;
    const all=smooth(allAt,allAt+1.0,lt),top=Math.round(150+(540-P.h)/2+L.fs*0.75);   /* each card centred under the header */
    for(const b of P.blocks){
      const t0=b.at[0];if(lt<t0)continue;
      const dim=1-0.3*smooth(b.next,b.next+1.0,lt)*(1-all),rise=(1-easeOut(clamp((lt-t0)/1.3)))*12,bloom=1-clamp((lt-t0)/2.2);
      ctx.font=DUA_FONT(b.flowers?Math.round(L.fs*0.7):L.fs);
      ctx.fillStyle=b.close?'#ffdca6':'#fff3de';ctx.shadowColor='rgba(255,190,110,.65)';ctx.shadowBlur=10+18*bloom;
      b.lines.forEach((l,k)=>{const y=top+b.dy+k*L.lh+rise;
        if(b.seg){ /* “Have a safe journey.” then “I wish you all the best.” on one line, each in its turn */
          const s0=DUA_SENT[b.seg[0]]+' ',s1=DUA_SENT[b.seg[1]],w0=ctx.measureText(s0).width,x0=640-ctx.measureText(s0+s1).width/2;ctx.textAlign='left';
          ctx.globalAlpha=a*pa*dim*smooth(b.at[0],b.at[0]+1.0,lt);ctx.fillText(s0,x0,y);
          const a1=smooth(b.at[1],b.at[1]+1.0,lt);if(a1>0){ctx.globalAlpha=a*pa*dim*a1;ctx.fillText(s1,x0+w0,y);}
        }else{ctx.textAlign='center';ctx.globalAlpha=a*pa*dim*smooth(t0,t0+1.0,lt);ctx.fillText(l,640,y);}
      });
    }
  });
  ctx.restore();
}
/* his Riyaz ul Jannah bubble, lifted off the phone and held big in the middle of the frame */
function duaBigBubble(ctx,lt,a,e){
  ctx.save();ctx.globalAlpha=a;
  ctx.fillStyle='rgba(5,7,16,.62)';ctx.fillRect(0,0,W,H);glow(ctx,640,300,560,'#ffd9a0',0.2);
  ctx.font='700 33px "Mulish",sans-serif';
  const lines=duaBalance(ctx,RIYAZ,760),lh=46;let tw=0;for(const l of lines)tw=Math.max(tw,ctx.measureText(l).width);
  const bw=tw+72,bh=lines.length*lh+78,sc=lerp(0.28,1,e);
  ctx.translate(lerp(664,640,e),lerp(520,292,e));ctx.scale(sc,sc);
  ctx.shadowColor='rgba(0,0,0,.5)';ctx.shadowBlur=44;ctx.shadowOffsetY=16;ctx.fillStyle='#005c4b';
  rrect(ctx,-bw/2,-bh/2,bw,bh,28);ctx.fill();ctx.beginPath();ctx.moveTo(bw/2-34,-bh/2);ctx.lineTo(bw/2+18,-bh/2);ctx.lineTo(bw/2-8,-bh/2+28);ctx.closePath();ctx.fill();
  ctx.shadowColor='rgba(0,0,0,0)';ctx.shadowBlur=0;ctx.shadowOffsetY=0;
  ctx.strokeStyle='rgba(255,226,170,.28)';ctx.lineWidth=2;rrect(ctx,-bw/2,-bh/2,bw,bh,28);ctx.stroke();
  ctx.fillStyle='#f2f6f3';ctx.textAlign='left';lines.forEach((l,k)=>ctx.fillText(l,-bw/2+36,-bh/2+56+k*lh));
  ctx.fillStyle='rgba(233,237,239,.62)';ctx.font='500 17px "Mulish",sans-serif';ctx.textAlign='right';ctx.fillText('23:09  ✓✓',bw/2-22,bh/2-16);
  ctx.restore();
}
const DUA_SCENE=scene({id:'dua',     when:'2026-04-19T21:06',name:'19 April · duas',        bars:20,fin:['#000000',1.2],fout:['#ffffff',1.6],
  prep(){const c=mk(W,H),g=c.getContext('2d');
    g.fillStyle=vgrad(g,0,H,[[0,'#070a14'],[0.6,'#0d1322'],[1,'#141a2a']]);g.fillRect(0,0,W,H);
    const r=rng(101);for(let i=0;i<9;i++){const u=i/8,y=380+u*u*300,n=18;for(let k=0;k<n;k++){const x=640+(k-n/2)*(30+u*140);g.fillStyle=k%3?'#ffd27a':'#7fd1ff';g.globalAlpha=0.5+u*0.5;circle(g,x,y,1.2+u*2.4);g.fill();}}g.globalAlpha=1;
    g.fillStyle='#223049';g.fillRect(0,330,W,8);g.fillStyle='#1b2740';for(let x=0;x<W;x+=160){g.fillRect(x,0,10,340);}g.fillRect(0,0,W,12);
    g.fillStyle='rgba(255,255,255,.05)';for(let x=40;x<W;x+=160){g.fillRect(x+20,40,120,8);}
    const m=mk(W,H),mg=m.getContext('2d');
    mg.fillStyle=vgrad(mg,0,H,[[0,'#0c1024'],[0.7,'#2a2a44'],[1,'#3a3246']]);mg.fillRect(0,0,W,H);
    const r2=rng(102);mg.fillStyle='#fff6e0';for(let i=0;i<140;i++){const s=r2()*1.4+0.3;mg.fillRect(r2()*W,r2()*330,s,s);}
    mg.fillStyle='#efe6d8';mg.fillRect(140,330,1000,390);mg.fillStyle='#d9ccb8';mg.fillRect(140,330,1000,12);
    for(let k=0;k<7;k++){const x=200+k*140;mg.fillStyle='#4a3b3a';mg.beginPath();mg.moveTo(x,720);mg.lineTo(x,430);mg.arc(x+40,430,40,Math.PI,0);mg.lineTo(x+80,720);mg.closePath();mg.fill();mg.fillStyle='#ffd9a0';mg.globalAlpha=0.5;mg.beginPath();mg.moveTo(x+8,720);mg.lineTo(x+8,434);mg.arc(x+40,434,32,Math.PI,0);mg.lineTo(x+72,720);mg.closePath();mg.fill();mg.globalAlpha=1;}
    for(const x of[120,1160]){mg.fillStyle='#f3ece0';mg.fillRect(x-22,60,44,280);mg.fillStyle='#2e7d4f';mg.beginPath();mg.moveTo(x-26,60);mg.lineTo(x,10);mg.lineTo(x+26,60);mg.closePath();mg.fill();mg.fillStyle='#ffe29a';circle(mg,x,76,6);mg.fill();}
    mg.fillStyle='#f3ece0';mg.fillRect(560,250,160,90);mg.fillStyle='#2e7d4f';mg.beginPath();mg.arc(640,252,86,Math.PI,0);mg.closePath();mg.fill();mg.fillStyle='#3f9a63';mg.beginPath();mg.arc(640,252,86,Math.PI*1.15,Math.PI*1.45);mg.lineTo(640,252);mg.closePath();mg.fill();mg.fillStyle='#ffe29a';circle(mg,640,160,5);mg.fill();mg.fillRect(638,160,4,14);
    for(const x of[360,900]){mg.fillStyle='#f6f1e7';mg.fillRect(x-6,380,12,340);mg.beginPath();mg.moveTo(x-120,380);mg.quadraticCurveTo(x,300,x+120,380);mg.closePath();mg.fill();mg.fillStyle='#ffd27a';circle(mg,x,372,8);mg.fill();}
    const wl=mg.createRadialGradient(640,520,0,640,520,700);wl.addColorStop(0,'rgba(255,214,150,.35)');wl.addColorStop(1,'rgba(255,214,150,0)');mg.fillStyle=wl;mg.fillRect(0,0,W,H);
    /* the card behind her prayer: deep plum to warm dark, a lamp-glow in the middle, a soft vignette */
    const k=mk(W,H),kg=k.getContext('2d');
    kg.fillStyle=vgrad(kg,0,H,[[0,'#0c0910'],[0.5,'#170f1d'],[1,'#24151a']]);kg.fillRect(0,0,W,H);
    const w1=kg.createRadialGradient(640,340,0,640,340,660);w1.addColorStop(0,'rgba(255,190,120,.22)');w1.addColorStop(0.55,'rgba(255,170,110,.07)');w1.addColorStop(1,'rgba(255,170,110,0)');kg.fillStyle=w1;kg.fillRect(0,0,W,H);
    const w2=kg.createRadialGradient(640,-140,0,640,-140,560);w2.addColorStop(0,'rgba(255,226,170,.16)');w2.addColorStop(1,'rgba(255,226,170,0)');kg.fillStyle=w2;kg.fillRect(0,0,W,H);
    const vg=kg.createRadialGradient(640,360,280,640,360,840);vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(0,0,0,.55)');kg.fillStyle=vg;kg.fillRect(0,0,W,H);
    return{c,m,card:k};},
  draw(ctx,lt,A){
    const madina=lt>=50.0,cardA=smooth(4.8,6.0,lt)*(1-smooth(43.4,44.4,lt));
    if(cardA>=1){duaCard(ctx,lt,A,1);return;}
    ctx.drawImage(madina?A.m:A.c,0,0);
    if(!madina){
      const down=smooth(4.4,5.6,lt)*(1-smooth(43.6,44.8,lt));   /* the phone goes down while her prayer is up */
      const px=((lt*55)%1800)-400;ctx.fillStyle='#1c2436';ell(ctx,px,300,120,14);ctx.fill();ctx.fillStyle='#2a3448';ctx.fillRect(px-30,262,16,40);ctx.fillStyle='#ff5a5a';circle(ctx,px-118,300,3*(0.5+0.5*Math.sin(lt*6)));ctx.fill();ctx.fillStyle='#7fd1ff';circle(ctx,px+118,300,3*(0.5+0.5*Math.cos(lt*6)));ctx.fill();
      drawFazul(ctx,900,250,1.7,0.28,{t:lt});
      ctx.fillStyle='rgba(120,160,220,.06)';ctx.fillRect(0,0,W,H);
      if(down<1){
        const S=drawPhoneHand(ctx,lt,{x:360,y:120+down*660,w:330,h:700});
        chatPanel(ctx,S,[{at:1.2,who:'her',time:'21:06',text:DUA_HER},{at:1.9,who:'her',time:'21:06',text:DUA_FLOWERS},{at:45.2,who:'me',time:'22:12',text:'thankyouuuuuuu sooooo muchhhh it meanssss bohott zyada 🥺😭😭😭😭'},{at:46.2,who:'me',time:'22:12',text:'ab wapis aake sabse phly apse miloga 🥺🥺😋'}],lt,{name:'Fabeha',status:'online'});
        phoneTop(ctx,S,{time:lt<45.2?'21:06':'22:12'});
      }
      if(cardA>0)duaCard(ctx,lt,A,cardA);
      const dip=smooth(49.4,50.0,lt);if(dip>0){ctx.fillStyle=hexA('#000000',dip);ctx.fillRect(0,0,W,H);}
    }else{
      motes(ctx,lt,60,103,'#ffe2a8',1.6,0.5);
      const S=drawPhoneHand(ctx,lt,{x:475,y:120,w:330,h:700});
      chatPanel(ctx,S,[{at:51.0,who:'me',time:'23:09',text:RIYAZ},{at:61.0,who:'me',time:'23:11',text:'Fabeha adnan ka bhetareen se bhetareen kismat hi. Iske dreams ki power or strong ho'},{at:62.4,who:'her',time:'23:25',text:'Tbh this is the best gift you’ve given me 🥰🥰🥰🥰🥰🥰'}],lt,{name:'Fabeha',status:'online'});
      phoneTop(ctx,S,{time:lt<61.0?'23:09':lt<62.4?'23:11':'23:25'});
      /* the Riyaz ul Jannah dua lifts off the phone, holds big, and settles back */
      const big=smooth(54.2,54.8,lt)*(1-smooth(59.8,60.6,lt));
      if(big>0)duaBigBubble(ctx,lt,big,easeOut(clamp((lt-54.2)/0.9))*(1-smooth(59.8,60.6,lt)));
      const dip=1-smooth(50.0,50.6,lt);if(dip>0){ctx.fillStyle=hexA('#000000',dip);ctx.fillRect(0,0,W,H);}
    }
  },
  score({add,T,hit,bars,melody,CH,THEME,THEME_B}){
    bars(0,2,['Em','Cmaj7'],{strings:true,padVel:0.4});add(T(0),'flute',{midi:CH.Em.p[3]+12,dur:BAR*1.6,vel:0.36});
    bars(2,12,['Em','Cmaj7','G','D','Em7','Am7','Cadd9','Dsus'],{strings:true,padVel:0.34});     /* her theme under her prayer, bars 2–14 */
    for(let b=2;b<14;b++)melody(b,(b-2)%8,'flute',0,b<13?0.32:0.22,THEME_B);
    DUA_AT.forEach((t,i)=>hit(t,'chime',{midi:[86,88,91,93,95,98,100,103,107][i],vel:0.24}));
    hit(1.2,'tick',{hi:true});hit(1.9,'tick',{hi:true});hit(45.2,'tick',{});hit(46.2,'tick',{});
    bars(14,1,['G'],{strings:true,padVel:0.3});
    bars(15,5,['G','Em','Cmaj7','Dsus','G'],{padVel:0.38,arp:true,arpVel:0.1});
    for(let b=16;b<19;b++)melody(b,b-16,'box',12,0.3,THEME);
    hit(51.0,'tick',{});hit(54.2,'swell',{dur:2.2,vel:0.35});hit(61.0,'tick',{});hit(62.4,'tick',{hi:true});
  },
  amb(lt){const card=smooth(4.8,6.0,lt)*(1-smooth(43.4,44.4,lt));return lt<50.0?{hum:0.34-0.24*card,wind:0.08}:{wind:0.25};},
});

/* 13 · The little things — montage over painted backdrops */
const BG={};
BG.sunflower=(ctx,lt,A)=>{paintSky(ctx,[[0,'#8fc3ea'],[0.6,'#d7e9f3'],[0.8,'#efe6cc']]);sunGlow(ctx,1050,110,380,'rgba(255,248,220,0.7)');ctx.fillStyle=vgrad(ctx,400,720,[[0,'#6c9a4a'],[1,'#3f6a2e']]);ctx.fillRect(0,400,W,320);
  const r=rng(111);for(let i=0;i<120;i++){const u=i/120,x=r()*W,y=405+u*u*300,s=14+u*60,sw=Math.sin(lt*1.5+i)*4*u;ctx.strokeStyle='#4f8a3a';ctx.lineWidth=2+u*4;ctx.beginPath();ctx.moveTo(x,y+s);ctx.quadraticCurveTo(x+sw,y+s*0.5,x+sw,y);ctx.stroke();ctx.drawImage(SPR.sunflower,x+sw-s/2,y-s/2,s,s);}
  drawFabehaFar(ctx,640,540,1.1,lt,{wind:0.2});};
BG.night=(ctx,lt)=>{paintSky(ctx,[[0,'#060814'],[1,'#1a1830']]);stars(ctx,lt,320,112,H*0.8,0.9);glow(ctx,980,150,120,'#fff2c8',0.6);ctx.fillStyle='#fff6dc';circle(ctx,980,150,28);ctx.fill();ctx.fillStyle='#060814';circle(ctx,992,142,24);ctx.fill();ctx.fillStyle='#0b0d1a';ctx.beginPath();ctx.moveTo(0,720);for(let x=0;x<=W;x+=40){ctx.lineTo(x,600+Math.sin(x*0.01)*30+((x*7)%50));}ctx.lineTo(W,720);ctx.closePath();ctx.fill();const r=rng(113);ctx.fillStyle='#ffd98a';for(let i=0;i<60;i++){ctx.globalAlpha=0.4+0.6*Math.sin(lt*2+i);ctx.fillRect(r()*W,620+r()*90,3,3);}ctx.globalAlpha=1;};
BG.coins=(ctx,lt)=>{ctx.fillStyle=vgrad(ctx,0,H,[[0,'#3a1d2e'],[1,'#1c0f18']]);ctx.fillRect(0,0,W,H);glow(ctx,640,360,500,'#8a4a5a',0.4);const C=[['₺','#c9a24a'],['¢','#b87333'],['€','#d4af37'],['د.إ','#c0c0c0'],['﷼','#d4af37']];for(let k=0;k<5;k++){const x=300+k*170,y=430+Math.sin(lt*1.2+k)*10,rr=46;ctx.save();ctx.translate(x,y);ctx.scale(Math.max(0.2,Math.abs(Math.cos(lt*0.8+k*0.9))),1);ctx.fillStyle=C[k][1];circle(ctx,0,0,rr);ctx.fill();ctx.fillStyle='rgba(255,255,255,.25)';circle(ctx,0,0,rr*0.8);ctx.fill();ctx.fillStyle=C[k][1];circle(ctx,0,0,rr*0.68);ctx.fill();ctx.fillStyle='rgba(0,0,0,.45)';ctx.font='700 30px "Mulish",sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(C[k][0],0,2);ctx.restore();glow(ctx,x,y,80,C[k][1],0.25);}ctx.textBaseline='alphabetic';};
BG.makkah=(ctx,lt)=>{paintSky(ctx,[[0,'#0a0d22'],[0.7,'#2a2446'],[1,'#4a3a52']]);stars(ctx,lt,200,114,H*0.6,0.8);ctx.fillStyle='#f0e8da';ctx.fillRect(0,420,W,300);for(let k=0;k<9;k++){const x=40+k*150;ctx.fillStyle='#5a4a46';ctx.beginPath();ctx.moveTo(x,720);ctx.lineTo(x,500);ctx.arc(x+40,500,40,Math.PI,0);ctx.lineTo(x+80,720);ctx.closePath();ctx.fill();ctx.fillStyle='rgba(255,215,150,.5)';ctx.beginPath();ctx.moveTo(x+8,720);ctx.lineTo(x+8,504);ctx.arc(x+40,504,32,Math.PI,0);ctx.lineTo(x+72,720);ctx.closePath();ctx.fill();}
  for(const x of[200,640,1080]){ctx.fillStyle='#f3ece0';ctx.fillRect(x-18,120,36,300);ctx.fillStyle='#3a6b4a';ctx.beginPath();ctx.moveTo(x-22,120);ctx.lineTo(x,70);ctx.lineTo(x+22,120);ctx.closePath();ctx.fill();glow(ctx,x,130,40,'#ffe29a',0.7);}
  glow(ctx,640,520,600,'#ffd9a0',0.3);};
BG.campus=(ctx,lt)=>{paintSky(ctx,[[0,'#8ec4ee'],[0.6,'#d7e9f3'],[1,'#e9f2f6']]);ctx.fillStyle='#9a4b3b';ctx.fillRect(300,200,980,300);ctx.strokeStyle='rgba(255,230,210,.22)';for(let y=210;y<500;y+=11){ctx.beginPath();ctx.moveTo(300,y);ctx.lineTo(W,y);ctx.stroke();}for(let k=0;k<6;k++){const x=350+k*160;ctx.fillStyle='#2b3a4a';ctx.beginPath();ctx.moveTo(x,500);ctx.lineTo(x,300);ctx.arc(x+40,300,40,Math.PI,0);ctx.lineTo(x+80,500);ctx.closePath();ctx.fill();}
  ctx.fillStyle='#6fa75a';ctx.fillRect(0,500,W,220);const r=rng(115);drawTreeClump(ctx,140,520,170,'#2d6a3a','#6fb25a',r);sunGlow(ctx,1100,80,400,'rgba(255,250,225,0.55)');motes(ctx,lt,30,116,'#fff6cc',1.2,0.5);};
BG.rain=(ctx,lt)=>{ctx.fillStyle=vgrad(ctx,0,H,[[0,'#0d1220'],[1,'#1a2234']]);ctx.fillRect(0,0,W,H);bokeh(ctx,lt,40,117,['#ffd27a','#7fd1ff','#ff9bb3','#fff'],14,46,0.45);const r=rng(118);ctx.strokeStyle='rgba(200,220,255,.35)';ctx.lineWidth=1.2;for(let i=0;i<160;i++){const x=r()*W,sp=300+r()*300,y=((r()*H+lt*sp)%(H+40))-20;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x-4,y+22);ctx.stroke();}
  for(let i=0;i<30;i++){const x=r()*W,y=r()*H,rr=4+r()*9;ctx.fillStyle='rgba(255,255,255,.08)';circle(ctx,x,y,rr);ctx.fill();ctx.fillStyle='rgba(255,255,255,.25)';circle(ctx,x-rr*0.3,y-rr*0.3,rr*0.3);ctx.fill();}};
BG.aurora=(ctx,lt)=>{paintSky(ctx,[[0,'#050b1c'],[0.7,'#0e1a30'],[1,'#1b2a44']]);stars(ctx,lt,360,119,H*0.75,0.9);aurora(ctx,lt,1);ctx.fillStyle='#dfe9f4';ctx.beginPath();ctx.moveTo(0,720);for(let x=0;x<=W;x+=30)ctx.lineTo(x,560+Math.sin(x*0.006)*30+Math.sin(x*0.02)*10);ctx.lineTo(W,720);ctx.closePath();ctx.fill();const r=rng(120);for(let i=0;i<40;i++)drawPine(ctx,r()*W,600+r()*100,40+r()*60,'#0f2a22','#163a2e','#dfe9f4',r);};
BG.evening=(ctx,lt)=>{ctx.fillStyle=vgrad(ctx,0,H,[[0,'#2a1830'],[0.6,'#5a2d3a'],[1,'#b0583a']]);ctx.fillRect(0,0,W,H);sunGlow(ctx,640,620,500,'rgba(255,170,100,0.6)');bokeh(ctx,lt,50,121,['#ffd27a','#ffb37a','#fff'],8,30,0.5);ctx.fillStyle='#1a0f18';ctx.beginPath();ctx.moveTo(0,720);for(let x=0;x<=W;x+=50){ctx.lineTo(x,640-((x*13)%90));ctx.lineTo(x+50,640-((x*13)%90));}ctx.lineTo(W,720);ctx.closePath();ctx.fill();};
BG.snow=(ctx,lt)=>{const S=snowset();paintSky(ctx,[[0,'#2f6fc2'],[0.45,'#9cc6ef'],[0.8,'#e8f1f8']]);sunGlow(ctx,980,120,360,'rgba(255,250,235,0.7)');ctx.drawImage(S.wisps,120+lt*4,30);ctx.drawImage(S.peaks.c,-120,-20);ctx.drawImage(S.mid.c,-160,70);ctx.fillStyle=vgrad(ctx,480,720,[[0,'#f4f7fa'],[1,'#d5e0ea']]);ctx.fillRect(0,480,W,240);snowfall(ctx,lt,120,141,10,2,0.8);};
BG.dawn=(ctx,lt)=>{paintSky(ctx,[[0,'#3a3f7a'],[0.4,'#b77a9a'],[0.7,'#f3b88a'],[0.9,'#ffe2b8']]);stars(ctx,lt,80,142,H*0.3,0.5);sunGlow(ctx,640,560,420,'rgba(255,200,140,0.6)');ctx.fillStyle='#2a2036';ctx.beginPath();ctx.moveTo(0,720);for(let x=0;x<=W;x+=60){const h=560-((x*31)%120);ctx.lineTo(x,h);ctx.lineTo(x+60,h);}ctx.lineTo(W,720);ctx.closePath();ctx.fill();ctx.fillRect(300,380,14,200);ctx.beginPath();ctx.arc(307,380,16,Math.PI,0);ctx.fill();ctx.fillRect(900,420,12,160);ctx.beginPath();ctx.arc(906,420,14,Math.PI,0);ctx.fill();const r=rng(143);ctx.fillStyle='#ffd98a';for(let i=0;i<40;i++){ctx.globalAlpha=0.3+0.5*Math.sin(lt*1.5+i);ctx.fillRect(r()*W,590+r()*110,3,3);}ctx.globalAlpha=1;};
function drawCard(ctx,card,u,lt){
  const a=smooth(0,0.1,u)*(1-smooth(0.92,1,u));if(a<=0)return;
  ctx.save();ctx.globalAlpha=a;ctx.translate(0,(1-smooth(0,0.2,u))*20);
  ctx.font='500 20px "Mulish",sans-serif';
  const maxW=620,lh=26,pad=16,items=[];let total=0;
  for(const l of card.lines){const lines=wrapText(ctx,l.text,maxW-pad*2);let bw=0;for(const s of lines)bw=Math.max(bw,ctx.measureText(s).width);items.push({l,lines,bw:bw+pad*2,bh:lines.length*lh+pad*2});total+=lines.length*lh+pad*2+12;}
  let y=H/2-total/2+30;
  ctx.textAlign='center';ctx.fillStyle='rgba(255,255,255,.85)';ctx.font='600 13px "Mulish",sans-serif';setLS(ctx,'3px');ctx.shadowColor='rgba(0,0,0,.6)';ctx.shadowBlur=10;ctx.fillText(card.date.toUpperCase(),640,y-24);setLS(ctx,'0px');ctx.shadowBlur=0;
  ctx.font='500 20px "Mulish",sans-serif';
  items.forEach((it,i)=>{
    const show=smooth(0.1+i*0.16,0.16+i*0.16,u);if(show<=0){y+=it.bh+12;return;}
    const mine=it.l.who==='me',bx=mine?640+330-it.bw:640-330;
    ctx.save();ctx.globalAlpha*=show;ctx.translate(0,(1-show)*10);
    ctx.shadowColor='rgba(0,0,0,.35)';ctx.shadowBlur=18;ctx.shadowOffsetY=6;
    ctx.fillStyle=mine?'#1f7a63':'#fbfaf6';rrect(ctx,bx,y,it.bw,it.bh,16);ctx.fill();ctx.shadowColor='transparent';
    ctx.fillStyle=mine?'#f3fff9':'#1c1a1f';ctx.textAlign='left';it.lines.forEach((s,k)=>ctx.fillText(s,bx+pad,y+pad+18+k*lh));
    ctx.fillStyle=mine?'rgba(243,255,249,.6)':'rgba(0,0,0,.4)';ctx.font='600 11px "Mulish",sans-serif';ctx.fillText(mine?'Fazul':'Fabeha',bx+pad,y+it.bh-6);ctx.font='500 20px "Mulish",sans-serif';
    ctx.restore();y+=it.bh+12;
  });
  ctx.restore();
}
act('IV','Summer','3 June – 31 August 2026','2026-08-31T23:59');
scene({id:'spring',  when:'2026-08-21T19:00',name:'The little things',      bars:20,fin:['#ffffff',1.6],fout:['#000000',1.4],
  prep(){return{};},
  draw(ctx,lt,A){
    const per=BAR,i=Math.min(MONTAGE.length-1,Math.floor(lt/per)),u=(lt-i*per)/per,card=MONTAGE[i];
    (BG[card.bg]||BG.night)(ctx,lt,A);
    ctx.fillStyle='rgba(10,8,20,.28)';ctx.fillRect(0,0,W,H);
    drawCard(ctx,card,u,lt);
    if(u>0.95&&i<MONTAGE.length-1){ctx.fillStyle=`rgba(0,0,0,${0.7*smooth(0.95,1,u)})`;ctx.fillRect(0,0,W,H);}
    if(u<0.05&&i>0){ctx.fillStyle=`rgba(0,0,0,${0.7*(1-smooth(0,0.05,u))})`;ctx.fillRect(0,0,W,H);}
  }
});

/* 14 · 29 August — majestic */
scene({id:'majestic',when:'2026-08-29T17:00',name:'29 August · majestic',   bars:7, fin:['#000000',1.4],fout:['#000000',1.6],
  prep(){const r=rng(121);const c=mk(W,H),g=c.getContext('2d');
    g.fillStyle=vgrad(g,0,H,[[0,'#120c14'],[0.5,'#2a1a22'],[1,'#3a2420']]);g.fillRect(0,0,W,H);
    g.strokeStyle='rgba(0,0,0,.5)';g.lineWidth=2;for(const y0 of[90,150]){g.beginPath();g.moveTo(0,y0);g.quadraticCurveTo(640,y0+60,W,y0);g.stroke();for(let k=0;k<16;k++){const u=k/15,x=u*W,y=y0+60*4*u*(1-u);g.fillStyle='#ffd48a';circle(g,x,y+8,5);g.fill();}}
    g.fillStyle='#4a3326';g.fillRect(0,520,W,200);g.fillStyle='#5a4030';g.fillRect(0,520,W,10);
    g.fillStyle='rgba(255,255,255,.08)';for(let i=0;i<30;i++){ell(g,r()*W,540+r()*160,40+r()*80,3);g.fill();}
    for(const[x,d]of[[150,-1],[1130,1]]){g.fillStyle='#1b1218';ell(g,x,470,86,120);g.fill();ell(g,x+d*10,330,42,50);g.fill();}
    for(const[x,y]of[[380,560],[1000,580],[520,600]]){g.fillStyle='rgba(255,230,190,.25)';rrect(g,x-14,y-50,28,52,6);g.fill();g.fillStyle='rgba(255,200,120,.5)';rrect(g,x-12,y-26,24,26,4);g.fill();}
    const car=mk(W,H),cg=car.getContext('2d');
    cg.fillStyle=vgrad(cg,0,H,[[0,'#06070d'],[1,'#121018']]);cg.fillRect(0,0,W,H);
    cg.fillStyle='#1a1b22';cg.beginPath();cg.moveTo(0,0);cg.lineTo(W,0);cg.lineTo(W,120);cg.quadraticCurveTo(640,60,0,120);cg.closePath();cg.fill();
    cg.fillStyle='#15161c';cg.fillRect(0,440,W,280);cg.fillStyle='#22232b';cg.beginPath();cg.moveTo(0,440);cg.quadraticCurveTo(640,400,W,440);cg.lineTo(W,470);cg.quadraticCurveTo(640,430,0,470);cg.closePath();cg.fill();
    cg.fillStyle='#2a2b34';cg.fillRect(600,100,80,16);cg.fillStyle='#0a0b10';rrect(cg,520,96,240,70,8);cg.fill();
    cg.fillStyle='#1d1e26';cg.beginPath();cg.moveTo(0,120);cg.lineTo(60,120);cg.lineTo(90,440);cg.lineTo(0,440);cg.closePath();cg.fill();cg.beginPath();cg.moveTo(W,120);cg.lineTo(1220,120);cg.lineTo(1190,440);cg.lineTo(W,440);cg.closePath();cg.fill();
    cg.fillStyle='#2b2228';rrect(cg,240,250,300,260,30);cg.fill();cg.fillStyle='#352a31';rrect(cg,260,160,260,140,40);cg.fill();
    return{c,car};},
  draw(ctx,lt,A){
    const car=lt>=13;
    if(!car){
      ctx.drawImage(A.c,0,0);bokeh(ctx,lt,36,122,['#ffd27a','#ffb37a','#fff2d0'],6,22,0.6);
      const laugh=lt>2&&lt<5.5,look=smooth(6,7.5,lt);
      drawFabeha(ctx,760,420,1.3,{t:lt,outfit:'black',hair:'halfup',pose:'bust',arms:lt<9?'lap':'cup',smile:laugh?1:0.75,eyes:laugh?'happy':undefined,look:lerp(-0.7,0.05,look)+0.08*Math.sin(lt*0.5),tilt:lerp(-0.1,0.02,look)+Math.sin(lt*0.4)*0.02,blush:0.4+0.4*smooth(8.5,10,lt),wind:0.1,len:260});
      /* the table top, in front of her */
      ctx.fillStyle='#4a3326';ctx.fillRect(0,590,W,130);ctx.fillStyle='#5a4030';ctx.fillRect(0,590,W,10);ctx.fillStyle='rgba(255,255,255,.07)';for(let i=0;i<14;i++){ell(ctx,(i*197)%W,610+(i*41)%90,50+(i*13)%70,3);ctx.fill();}
      for(const[x,y]of[[380,650],[1000,665],[560,690]]){ctx.fillStyle='rgba(255,230,190,.28)';rrect(ctx,x-14,y-50,28,52,6);ctx.fill();ctx.fillStyle='rgba(255,200,120,.55)';rrect(ctx,x-12,y-26,24,26,4);ctx.fill();glow(ctx,x,y-30,40,'#ffd27a',0.25);}
      ctx.fillStyle='#f4efe6';rrect(ctx,700,626,36,40,6);ctx.fill();ctx.fillStyle='#a56a3a';ell(ctx,718,630,15,5);ctx.fill();
      ctx.fillStyle='rgba(255,210,150,.08)';ctx.fillRect(0,0,W,H);
    }else{
      ctx.drawImage(A.car,0,0);
      ctx.save();ctx.beginPath();ctx.moveTo(60,120);ctx.lineTo(1220,120);ctx.lineTo(1190,440);ctx.lineTo(90,440);ctx.closePath();ctx.clip();
      ctx.fillStyle=vgrad(ctx,120,440,[[0,'#0a0d1c'],[1,'#1b1a2c']]);ctx.fillRect(0,120,W,320);
      const r=rng(123);for(let i=0;i<40;i++){const u=((r()+lt*0.09)%1),x=lerp(640,r()<0.5?-200:1480,u),y=lerp(300,440,u),rr=lerp(3,34,u),col=['#ffd27a','#ff9b6a','#fff','#7fd1ff'][i%4];glow(ctx,x,y,rr,col,0.55);}
      ctx.fillStyle='#2a2a33';ctx.beginPath();ctx.moveTo(400,440);ctx.lineTo(640,300);ctx.lineTo(880,440);ctx.closePath();ctx.fill();ctx.fillStyle='#ffd27a';for(let k=0;k<5;k++){const u=((k/5+lt*0.5)%1);ctx.fillRect(640-2,300+u*140,4,6+u*14);}
      ctx.restore();
      ctx.save();rrect(ctx,520,96,240,70,8);ctx.clip();ctx.fillStyle='#14151c';ctx.fillRect(520,96,240,70);drawFazul(ctx,640,170,1.1,0.9,{t:lt});ctx.restore();
      const look=smooth(16,17.5,lt);
      drawFabeha(ctx,390,310,1.1,{t:lt,outfit:'black',hair:'halfup',pose:'knees',legCol:'#1a171d',arms:'lap',smile:0.6+0.35*smooth(17,19,lt),look:lerp(-0.9,0.3,look),tilt:lerp(-0.12,0.03,look),blush:0.45,wind:0.05,len:250,eyes:lt>21&&lt<23?'happy':undefined});
      ctx.strokeStyle='#2c2d36';ctx.lineWidth=18;ctx.beginPath();ctx.moveTo(318,392);ctx.lineTo(470,560);ctx.stroke();
      ctx.fillStyle='rgba(255,200,120,.06)';ctx.fillRect(0,0,W,H);
    }
  }
});

/* 15 · To be continued — the two chairs at dusk */
act('V','September','and the two chairs','2099-12-31');
scene({id:'end',     when:'2099-01-01T00:00',name:'To be continued',        bars:7, fin:['#000000',1.8],fout:null,
  prep(){const S=snowset();return{S,hill:makeLayer({w:1600,seed:23,y0:360,amp:50,oct:3,f0:0.004,top:'#d9cfe0',bottom:'#8f84a8',patches:['#efe4ef','#7a6f96'],pines:{n:150,size:40,sink:4,dark:'#1a2430',light:'#263344',snow:'#e8dff0'},rim:'#ffd9b0',rimA:0.6,rimW:3})};},
  draw(ctx,lt,A){
    paintSky(ctx,[[0,'#2b2a5e'],[0.4,'#8d5a86'],[0.7,'#f0a06a'],[0.85,'#ffd9a0']]);
    stars(ctx,lt,120,131,H*0.35,0.6);
    ctx.save();ctx.globalAlpha=0.6;ctx.drawImage(A.S.far.c,-100,30);ctx.restore();ctx.drawImage(A.hill.c,-60,0);
    ctx.fillStyle=vgrad(ctx,380,520,[[0,'#e6d9e4'],[1,'#b7a7c2']]);ctx.beginPath();ctx.moveTo(0,420);ctx.lineTo(W,380);ctx.lineTo(W,520);ctx.lineTo(0,520);ctx.closePath();ctx.fill();
    liftLine(ctx,lt,[120,318],[1200,372],{n:7,spd:0.02,s0:0.3,s1:0.5,dir:1});
    ctx.fillStyle='#5a4432';ctx.fillRect(0,500,W,220);for(let k=0;k<12;k++){const y=500+k*19;ctx.fillStyle=k%2?'#4f3b2a':'#5e4834';ctx.fillRect(0,y,W,19);}
    ctx.fillStyle='rgba(255,235,220,.5)';for(let k=0;k<14;k++){ell(ctx,(k*173)%W,505+(k*37)%30,40+(k*13)%40,4);ctx.fill();}
    ctx.fillStyle='#3a2a1e';ctx.fillRect(0,468,W,10);for(let x=40;x<W;x+=140){ctx.fillRect(x,470,8,36);}
    plasticChair(ctx,430,700,1.5,'#d9dde3');plasticChair(ctx,905,690,1.45,'#d9dde3');
    ctx.save();ctx.translate(905,660);ctx.rotate(0.1);ctx.fillStyle='#fffdf5';rrect(ctx,-24,-16,48,32,4);ctx.fill();ctx.fillStyle='#b8402f';ctx.font='700 20px "Mulish",sans-serif';ctx.textAlign='center';ctx.fillText('48',0,7);ctx.restore();
    ctx.save();ctx.translate(430,668);ctx.rotate(-0.12);ctx.fillStyle='#fffdf5';rrect(ctx,-24,-16,48,32,4);ctx.fill();ctx.fillStyle='#b8402f';ctx.font='700 20px "Mulish",sans-serif';ctx.textAlign='center';ctx.fillText('5',0,7);ctx.restore();
    snowfall(ctx,lt,90,132,6,2,0.75);
    /* the card arrives slowly, after the line has been read, and holds to the end */
    const a=smooth(7.6,10.6,lt);
    if(a>0){ctx.save();ctx.globalAlpha=a;ctx.fillStyle='rgba(20,14,40,.42)';rrect(ctx,170,150,940,190,24);ctx.fill();ctx.textAlign='center';ctx.fillStyle='#fff6e8';ctx.shadowColor='rgba(20,10,40,.7)';ctx.shadowBlur=18;
      ctx.font='600 64px "Cormorant Garamond",serif';ctx.fillText('to be continued…',640,232);
      ctx.font='500 14px "Mulish",sans-serif';setLS(ctx,'5px');ctx.globalAlpha=a*smooth(11.0,13.2,lt);ctx.fillText('ANTA AL HAYAT · YOU ARE LIFE',640,274);setLS(ctx,'0px');
      ctx.globalAlpha=a*smooth(13.6,15.8,lt);ctx.fillStyle='#ffe9cf';ctx.font='500 15px "Mulish",sans-serif';ctx.fillText('part two is still being made',640,312);
      ctx.restore();}
  }
});

/* ---------- her real voice notes, placed in the film (file in film/voice/, seconds) ---------- */
/* ---------- her real voice notes inside the film: voiceAt(scene, secondsIntoScene, {file,dur,label}) ---------- */
voiceAt('letter',25.0,{file:'00004293-AUDIO-2026-01-28-13-22-15',dur:11.0,label:'28 Jan · 13:22'});
voiceAt('voices',11.0,{file:'00013550-AUDIO-2026-03-28-22-59-26',dur:10.4,label:'28 Mar · 22:59'});
voiceAt('voices',22.0,{file:'00013551-AUDIO-2026-03-28-22-59-49',dur:9.4, label:'28 Mar · 22:59'});

/* ---------- subtitles: sub(scene, from, to, text, kind)  kind = n (his narration) · him · her ---------- */
sub('queue',1.0,5.0,'January 2026. The IBA grad trip. The top of Malam Jabba, the zipline queue.');
sub('queue',5.4,9.6,'We sat on plastic chairs with the mountains in front of us, waiting for our numbers.');
sub('queue',10.0,13.4,'My number was 5. Hers was 48.');
sub('queue',13.8,18.6,'I told them my friend had lost his ticket. Then that he’d gone to find it. Then that I’d lost mine.');
sub('queue',19.0,22.6,'Crazy view. I couldn’t believe Allah could make something this beautiful.','him');
sub('queue',23.0,26.4,'I waited until she was next.');
sub('zip',0.6,4.6,'Then I went down to the PC Hotel, and from the bottom I filmed her coming back.');
sub('zip',11.0,14.0,'Malam Jabba was soo fun.','her');
sub('zip',14.5,18.0,'Malam Jabba wala din… was my best day.','him');
sub('zip',18.5,22.8,'I was dead, looking into your eyes. All you were doing was hiding yours.','him');
sub('van',1.0,5.5,'Malam Jabba to Kalam. Seven hours.');
sub('van',6.0,10.5,'The jump seat in the aisle of the Hiace. I sat on it backwards. Everyone thought it was for the leg room.');
sub('van',11.0,14.5,'Who sits ulta on a folding seat for seven hours?','him');
sub('van',15.0,18.5,'I honestly did that to be around you.','him');
sub('van',19.0,22.0,'Damnnn… ye baat toh pata nahi thi, brooo.','her');
sub('van',23.0,28.4,'What she noticed on that seat, she told me two months later. That part comes after the last day.');
sub('kalam',0.5,4.0,'Kalam. Minus fifteen.');
sub('kalam',5.0,8.5,'Kalam ka thanda paani, I won’t forget.','him');
sub('kalam',10.0,13.5,'Ap legend ho. Legend.','her');
sub('beach',0.5,5.0,'23 January. Engro beach. She was there with her family.');
sub('beach',5.5,9.0,'I was in Hyderabad, 160 km away, with a bet to settle.');
sub('beach',10.0,14.0,'If she won, she’d get my iPhone. If I won… I’d get her.');
sub('beach',27.8,32.8,'She never took the phone. “Meri zidd hai yeh,” she’d still say in June. I count it as a win.');
sub('letter',0.5,4.5,'27 January, 10:30 pm. I typed for an hour and sent it in one go.');
sub('letter',21.6,24.6,'Next morning she replied in four words. I replied in seventeen.');
sub('letter',25.2,28.6,'Then, at 13:22, her voice.');
sub('iba',0.5,5.5,'7 February. Four hours from Hyderabad for the first date. She brought a crumble cookie. I brought a bracelet and a necklace.');
sub('iba',8.0,12.0,'I was just looking at you thinking… is it for real? Am I this lucky?','him');
sub('iba',13.5,18.0,'Pata hai, as a woman you swell a lot during stages… I swell a lot in my luteal phase 😭','her');
sub('iba',18.5,22.0,'Kam karo ya na karo, for me you’re still the same.','him');
sub('iba',22.5,25.8,'You are as perfect as you can be. Stunningly beautiful.','him');
sub('voices',0.5,5.0,'28 March. I dreamt of a green snake that bit me twice, and told her I was concerned.');
sub('voices',5.4,10.6,'She got home at ten, asked where it had bitten me, and interpreted the whole dream in ten voice notes.');
sub('voices',29.6,33.2,'Then a track to play in my room, “you’ll feel peace”, and a list of duas, three times each.');
sub('birthday',0.5,4.0,'10 April, 00:00. Her first birthday with me. I wanted to be its first second.');
sub('birthday',16.4,19.6,'The page I built for her. A letter, Meri Laila playing, and a game at the end.');
sub('birthday',38.4,42.8,'“The best birthday wish I’ve ever received in 22 years.” Worth every microsecond.');
sub('tenth',1.0,2.9,'I was so excited to meet you','her');
sub('tenth',3.2,5.4,'She had carried her university bag everywhere all day, so she’d have a reason to come.');
sub('tenth',5.8,8.6,'When you said time lagega and going natasha house i thought ap busy hai tou apko tang na kaaro','him');
sub('tenth',9.0,10.2,'Mein apko kabhi katao gi nhi','her');
sub('tenth',12.3,15.3,'Then I fell asleep, dead tired. She didn’t know that.');
sub('tenth',15.7,21.4,'Three calls at half past eleven, to make sure I was alive. At five in the morning, still checking.');
sub('dua',0.4,4.4,'19 April. Hajj, with my mother. She wrote this while I was at the airport.');
sub('dua',45.4,49.0,'Thank you so much. It means bohot zyada. Wapis aake sabse pehle aapse miloonga.','him');
sub('dua',50.3,53.8,'From Riyaz ul Jannah, the piece of paradise, I sent her the dua I made that day.');
sub('dua',62.8,65.6,'Tbh this is the best gift you’ve given me.','her');
sub('majestic',0.5,4.3,'29 August. I had been in Karachi two days. At five I picked her up from the IBA library.');
sub('majestic',4.6,8.2,'I’d say the best hangout. Date. With you — not with you including everyone.','him');
sub('majestic',8.6,11.2,'You were majestic today.','him');
sub('majestic',11.6,13.0,'Awwww','her');
sub('majestic',13.6,16.6,'Mujhe tum aziz ho. Sabse zyada.','him');
sub('majestic',17.0,20.6,'Broooo, if we get married I’ll ask Ammi to make this the first time you visit 🤤','her');
sub('majestic',21.0,23.0,'Wifey. InshaAllah.','him');
sub('end',1.0,7.2,'We’re still up there, on two chairs, looking at the mountains, waiting for number 48.');

/* ---------- programme notes for the shot list (new scenes carry note/tag in their definition) ---------- */
noteFor('title','title over the ski slope and the lift.','Jan 2026');
noteFor('queue','plastic chairs at the top, the mountains in front, the zipline board counting up while he makes excuses; ticket 5 in his glove, ticket 48 in her hands.','“crazy view… Allah itni khubsoorat cheez bhi bana sakta”');
noteFor('zip','down to the PC Hotel in his harness, then his phone filming her coming back.','“Malam Jabba wala din was my best day” · “I was dead looking into your eyes”');
noteFor('van','the aisle jump seat of a Pakistani Hiace, sat on backwards for seven hours, Malam Jabba to Kalam; curtains, patterned seats, her row right behind.','25 Jan · “whoo tf sits ulta on a folding seat for 7 hours” · 19 Mar · “ghoor ghoor”');
noteFor('kalam','snow, the cold shower, “ap legend ho”.','21 Jan');
noteFor('beach','Engro beach, her family, the iPhone bet on his phone, the “Ap Meri ❤️” he sent and deleted, “someone like you can’t”.','16:40–17:16');
noteFor('letter','“the only Sunlight my heart reaches for”, the galaxy in her eyes, the morning after, and her voice note at 13:22.','22:30 · 09:52 · 12:14 · 13:22');
noteFor('iba','the first date (crumble, bracelet, necklace), the luteal talk, “as perfect as you can be”.','7 Feb · 16 Mar');
noteFor('voices','he dreamt of a green snake that bit him twice; she asked where, interpreted the whole dream in ten voice notes, then sent a track for his room and a list of duas. Two of the voice notes play, in her voice.','22:50–00:45');
noteFor('birthday','the wish at 00:00:23, then the real page: “Happy Birthday Fabeha, My Pookie”, the letter (“Zindagi ne mujhe bahut kuch sikhaya hai…”), Meri Laila playing, Catch My Love, and “Fabeha, You Are My Everything”.','“best birthday wish ive ever received in 22 years”');
noteFor('tenth','her messages that night about the day that fell apart, his answer, and three calls at 23:29 to make sure he was alive.','“I was so excited to meet you” · “Nizamani ap teekh toh hona?”');
noteFor('dua','her prayer at the airport, set full-frame on two cards, sentence by sentence, while the phone is down; his thank-you; his dua from Riyaz ul Jannah in Madina, lifted off the phone and held big: “Meri paak mohabbat ki maine ajj mehram hone ki dua ki hai”.','“the best gift you’ve given me”');
noteFor('spring','twenty cards, 21 January to 2 September: “thank you for listening”, “15-20 decades”, telling his mother, “travel eternity”, sunflowers, “meri eid tou ap hai”, the teddy, the coins, the corner plot, his birthday in Makkah, “to the core”, “meri trip”, “my vitamin”, “partners”, the aurora, “degree eik bahana tha”, the job + 3000, “Your mom”, “love yours zyada”, “Ilyt”.','Jan–Sep');
noteFor('majestic','two days in Karachi already; picked up from the IBA library at five; the table; the car; his eyes in the mirror.','“You were majestic today”');
noteFor('end','the two chairs at dusk.','cut 1');
