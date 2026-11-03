/* player.js — renderer, transport controls, subtitles, chapters by act, resume, and the programme notes generated from the scenes. */
'use strict';
finalizeFilm();composeScore();
const STILLS=/^#t=/.test(location.hash);
/* scene assets are built on demand and dropped again once the film has moved on (an hour of painted layers would not fit in memory) */
const ASSETS=[],PREP_MS=[];
function ensure(i){if(!ASSETS[i]){const t0=performance.now();ASSETS[i]=SC[i].prep()||{};PREP_MS[i]=Math.round(performance.now()-t0);}return ASSETS[i];}
function tidyAssets(i){for(let k=0;k<ASSETS.length;k++)if(ASSETS[k]&&(k<i-1||k>i+2))ASSETS[k]=null;}
const cv=document.getElementById('film'),CTX=cv.getContext('2d');
let SCALE=1,GRAIN=null,lastScene=-1;
const REDUCED=matchMedia('(prefers-reduced-motion: reduce)').matches;
function render(t){
  t=clamp(t,0,TOTAL);
  const ctx=CTX;ctx.setTransform(SCALE,0,0,SCALE,0,0);
  ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';ctx.textBaseline='alphabetic';
  const i=sceneIndex(t),sc=SCENES[i],lt=Math.min(t-sc.start,sc.dur);
  const Aset=ensure(i);
  if(i!==lastScene){lastScene=i;tidyAssets(i);if(i+1<SC.length)setTimeout(()=>{if(lastScene===i)ensure(i+1);},120);}
  ctx.save();ctx.beginPath();ctx.rect(0,0,W,H);ctx.clip();
  try{SC[i].draw(ctx,lt,Aset);}catch(e){if(!sc._err){sc._err=true;console.error('scene '+sc.id+' failed to draw',e);}}
  ctx.restore();
  ctx.setTransform(SCALE,0,0,SCALE,0,0);ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';
  ctx.drawImage(SPR.overlay,0,0);
  if(GRAIN){const ox=REDUCED?0:(Math.random()*256)|0,oy=REDUCED?0:(Math.random()*256)|0;ctx.save();ctx.globalAlpha=0.55;ctx.translate(-ox,-oy);ctx.fillStyle=GRAIN;ctx.fillRect(ox,oy,W,H);ctx.restore();}
  drawVoiceOverlay(ctx,t);
  if(sc.fin){const a=1-smooth(0,sc.fin[1],lt);if(a>0.001){ctx.fillStyle=hexA(sc.fin[0],a);ctx.fillRect(0,0,W,H);}}
  if(sc.fout){const a=smooth(sc.dur-sc.fout[1],sc.dur,lt);if(a>0.001){ctx.fillStyle=hexA(sc.fout[0],a);ctx.fillRect(0,0,W,H);}}
}
/* a WhatsApp-style voice-note pill while one of her real voice notes plays */
function drawVoiceOverlay(ctx,t){
  const v=VOICES.find(v=>t>=v.t&&t<v.t+v.dur+0.6);if(!v)return;
  const age=t-v.t,u=clamp(age/v.dur),a=smooth(0,0.3,age)*(1-smooth(v.dur+0.15,v.dur+0.6,age));if(a<=0)return;
  ctx.save();ctx.globalAlpha=a;const x=40,y=H-150,w=430,h=74;
  ctx.fillStyle='rgba(16,22,34,.84)';rrect(ctx,x,y,w,h,20);ctx.fill();ctx.strokeStyle='rgba(255,255,255,.14)';ctx.lineWidth=1;rrect(ctx,x,y,w,h,20);ctx.stroke();
  ctx.fillStyle='#d8b4a0';circle(ctx,x+38,y+37,22);ctx.fill();ctx.fillStyle='#2a1d22';ell(ctx,x+38,y+31,17,14);ctx.fill();ctx.fillStyle='#f3d8c4';ell(ctx,x+38,y+38,12,13);ctx.fill();ctx.fillStyle='#2a1d22';ctx.fillRect(x+22,y+28,8,26);ctx.fillRect(x+46,y+28,8,26);
  ctx.fillStyle='#00a884';circle(ctx,x+54,y+52,9);ctx.fill();ctx.fillStyle='#fff';rrect(ctx,x+51.5,y+46,5,8,2.5);ctx.fill();
  const bx=x+92,bw=250,n=34;
  for(let k=0;k<n;k++){const ph=((k*7919)%13)/13,base=8+18*Math.abs(Math.sin(k*1.7+ph*6)),live=k/n<u?(0.8+0.4*Math.sin(t*14+k)):1,hh=base*live;ctx.fillStyle=k/n<u?'#8fd8c6':'rgba(255,255,255,.35)';rrect(ctx,bx+k*(bw/n),y+40-hh/2,bw/n-2.5,hh,2);ctx.fill();}
  ctx.fillStyle='#e9edef';ctx.font='600 13px "Mulish",sans-serif';ctx.textAlign='left';ctx.fillText('Fabeha · voice note · '+v.label,bx,y+20);
  ctx.fillStyle='rgba(233,237,239,.6)';ctx.font='500 12px "Mulish",sans-serif';ctx.textAlign='right';const s=Math.floor(u*v.dur),d=Math.round(v.dur);ctx.fillText('0:'+String(s).padStart(2,'0')+' / 0:'+String(d).padStart(2,'0'),x+w-16,y+64);
  ctx.restore();
}
const $=id=>document.getElementById(id);
const fmt=t=>{t=Math.max(0,Math.floor(t+0.0001));return Math.floor(t/60)+':'+String(t%60).padStart(2,'0');};
const fmtLong=t=>{const m=Math.floor(t/60),s=Math.round(t%60);return m+' min '+(s?s+' s':'');};
/* the archive of all her voice notes, below the film */
function buildVoiceArchive(){
  const box=$('voices');if(!box||typeof VN_FILES==='undefined')return;
  const months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];let lastDay='';
  const used=new Set(VOICES.map(v=>v.file));
  for(const v of VN_FILES){
    const m=v.f.match(/(\d{4})-(\d{2})-(\d{2})-(\d{2})-(\d{2})-(\d{2})$/);if(!m)continue;
    const day=`${parseInt(m[3])} ${months[parseInt(m[2])-1]} ${m[1]}`,time=`${m[4]}:${m[5]}`,dur=Math.round(v.d);
    if(day!==lastDay){const h=document.createElement('h3');h.textContent=day;box.appendChild(h);lastDay=day;}
    const row=document.createElement('div');row.className='vn'+(used.has(v.f)?' infilm':'');
    const meta=document.createElement('span');meta.className='vn-meta';meta.innerHTML=`<b>${time}</b> · ${Math.floor(dur/60)}:${String(dur%60).padStart(2,'0')}`+(used.has(v.f)?' <em>in the film</em>':'');
    const au=document.createElement('audio');au.controls=true;au.preload='none';au.src='voice/'+v.f+'.mp3';
    row.appendChild(meta);row.appendChild(au);box.appendChild(row);
  }
}
/* programme notes: one line per scene, from each scene's note and tag */
function buildShotList(){
  const ol=$('shots');if(!ol)return;ol.innerHTML='';
  for(const s of SCENES){
    if(!s.note&&!s.tag)continue;
    const li=document.createElement('li'),sp=document.createElement('span'),b=document.createElement('b');
    b.textContent=s.name;sp.appendChild(b);if(s.note)sp.appendChild(document.createTextNode(' — '+s.note));
    if(s.tag){sp.appendChild(document.createTextNode(' '));const i=document.createElement('i');i.textContent=s.tag;sp.appendChild(i);}
    li.appendChild(sp);ol.appendChild(li);
  }
  const f=$('facts');if(f){f.textContent=`${SCENES.length} scenes in ${ACTS.length} acts · ${fmtLong(TOTAL)} · ${VOICES.length} of her voice notes play inside the film`;}
}
const player=$('player'),frame=$('frame'),subsEl=$('subs'),big=$('bigplay'),bigLabel=$('bigplayLabel'),playBtn=$('playBtn'),scrub=$('scrub'),cur=$('cur'),soundBtn=$('soundBtn'),subsBtn=$('subsBtn'),fsBtn=$('fsBtn'),chapList=$('chapters');
$('dur').textContent=fmt(TOTAL);scrub.max=TOTAL.toFixed(2);
if($('runtime'))$('runtime').textContent=fmtLong(TOTAL);
let playing=false,started=false,ended=false,filmT=0,last=0,raf=0,scrubbing=false,curSub=-1,curChap=-1;
/* resume where this viewer left off (an hour is long); stills mode never touches it */
const POSKEY='otherchair.pos';let resumeAt=0,lastSave=0;
if(!STILLS){try{const v=parseFloat(localStorage.getItem(POSKEY));if(v>20&&v<TOTAL-30)resumeAt=v;}catch(e){}}
function savePos(){if(STILLS)return;try{if(filmT>20&&filmT<TOTAL-30)localStorage.setItem(POSKEY,filmT.toFixed(1));else localStorage.removeItem(POSKEY);}catch(e){}}
/* chapters, grouped by act */
const chapBtns=[];
function chapButton(s,i){
  const li=document.createElement('li'),b=document.createElement('button');
  b.type='button';b.className='chap';b.id='chap-'+s.id;
  b.innerHTML=`<span class="n">${i+1} · ${fmt(s.start)}</span><span class="t">${s.name}</span>`;
  b.addEventListener('click',()=>{seek(s.start+0.01);if(!playing)play();});
  li.appendChild(b);chapList.appendChild(li);chapBtns[i]=b;
}
{
  let i=0;
  while(i<SCENES.length&&SCENES[i].act<0){chapButton(SCENES[i],i);i++;}
  for(const a of ACTS){
    const li=document.createElement('li');li.className='acthead';
    li.innerHTML=`<span class="act-n">Act ${a.num}</span><span class="act-t">${a.name}</span>${a.when?`<span class="act-w">${a.when}</span>`:''}`;
    chapList.appendChild(li);
    for(let k=a.from;k<a.to;k++)chapButton(SCENES[k],k);
  }
}
function subsUpdate(){
  const t=started?filmT:-1;let k=-1;
  for(let i=0;i<SUBS.length;i++)if(t>=SUBS[i][0]&&t<SUBS[i][1]){k=i;break;}
  if(k!==curSub){curSub=k;if(k>=0){subsEl.textContent=SUBS[k][2];subsEl.className='subs on k-'+(SUBS[k][3]||'n');}else subsEl.className='subs';}
}
function uiTime(){
  cur.textContent=fmt(filmT);if(!scrubbing)scrub.value=filmT.toFixed(2);
  const ci=started?sceneIndex(Math.min(filmT,TOTAL-0.001)):-1;
  if(ci!==curChap){curChap=ci;chapBtns.forEach((b,i)=>b.setAttribute('aria-current',i===ci?'true':'false'));if(ci>=0&&chapBtns[ci]&&chapList.scrollWidth>chapList.clientWidth+4)chapBtns[ci].scrollIntoView({block:'nearest',inline:'center',behavior:'smooth'});}
  subsUpdate();
}
function ui(){
  $('icoPlay').hidden=playing;$('icoPause').hidden=!playing;playBtn.setAttribute('aria-label',playing?'Pause':'Play');
  big.hidden=playing;bigLabel.textContent=!started?(resumeAt?'Resume from '+fmt(resumeAt):'Play the film'):ended?'Watch again':'Resume';
  uiTime();
}
function draw(){render(started?filmT:(resumeAt||POSTER_T));}
function play(){
  if(!started&&resumeAt){filmT=resumeAt;}
  if(filmT>=TOTAL-0.05)filmT=0;
  started=true;ended=false;playing=true;
  if(audioInit()){try{A.ac.resume();}catch(e){}audioStart(filmT);}
  ui();last=performance.now();cancelAnimationFrame(raf);raf=requestAnimationFrame(loop);
}
function pause(){playing=false;cancelAnimationFrame(raf);audioStop();savePos();ui();}
function toggle(){playing?pause():play();}
function loop(now){
  if(!playing)return;
  const dt=Math.min(0.1,(now-last)/1000);last=now;filmT+=dt;
  if(filmT>=TOTAL){filmT=TOTAL;render(filmT);playing=false;ended=true;audioStop();savePos();ui();if(EXPORT.on)exportFinish();return;}
  render(filmT);audioTick(filmT);uiTime();
  if(now-lastSave>2500){lastSave=now;savePos();}
  raf=requestAnimationFrame(loop);
}
function seek(t){
  filmT=clamp(t,0,TOTAL);started=true;ended=filmT>=TOTAL;A.filmT=filmT;
  if(playing&&A.ac)audioStart(filmT);
  render(filmT);savePos();ui();
}
big.addEventListener('click',e=>{e.stopPropagation();play();});
cv.addEventListener('click',toggle);
playBtn.addEventListener('click',toggle);
$('restartBtn').addEventListener('click',()=>{resumeAt=0;seek(0);if(!playing)play();});
scrub.addEventListener('pointerdown',()=>{scrubbing=true;});
scrub.addEventListener('pointerup',()=>{scrubbing=false;});
scrub.addEventListener('input',()=>seek(parseFloat(scrub.value)));
scrub.addEventListener('change',()=>{scrubbing=false;});
function setSubs(on){subsBtn.setAttribute('aria-pressed',String(on));player.classList.toggle('nosubs',!on);}
subsBtn.addEventListener('click',()=>setSubs(subsBtn.getAttribute('aria-pressed')!=='true'));
function setMuted(m){
  A.muted=m;soundBtn.setAttribute('aria-pressed',String(!m));soundBtn.setAttribute('aria-label',m?'Sound off':'Sound on');
  $('icoSound').hidden=m;$('icoMute').hidden=!m;
  if(A.ac)A.master.gain.setTargetAtTime(m?0:0.9,A.ac.currentTime,0.05);
}
soundBtn.addEventListener('click',()=>setMuted(!A.muted));
function toggleFs(){
  const fe=document.fullscreenElement||document.webkitFullscreenElement;
  try{
    if(fe){(document.exitFullscreen||document.webkitExitFullscreen).call(document);}
    else if(player.requestFullscreen){const p=player.requestFullscreen();if(p&&p.catch)p.catch(()=>{});}
    else if(player.webkitRequestFullscreen)player.webkitRequestFullscreen();
  }catch(e){}
}
fsBtn.addEventListener('click',toggleFs);
frame.addEventListener('keydown',e=>{
  if(e.key===' '||e.key==='k'){e.preventDefault();toggle();}
  else if(e.key==='ArrowRight'){e.preventDefault();seek(filmT+5);}
  else if(e.key==='ArrowLeft'){e.preventDefault();seek(filmT-5);}
  else if(e.key==='l'){seek(filmT+10);}else if(e.key==='j'){seek(filmT-10);}
  else if(e.key==='f'){toggleFs();}else if(e.key==='m'){setMuted(!A.muted);}else if(e.key==='c'){setSubs(subsBtn.getAttribute('aria-pressed')!=='true');}
  else if(e.key==='Home'){seek(0);}
  else if(e.key==='.'){const i=sceneIndex(filmT);if(i+1<SCENES.length)seek(SCENES[i+1].start+0.01);}
  else if(e.key===','){const i=sceneIndex(filmT);seek(filmT-SCENES[i].start>3?SCENES[i].start+0.01:(SCENES[i-1]?SCENES[i-1].start+0.01:0));}
});
document.addEventListener('visibilitychange',()=>{if(document.hidden&&playing&&!EXPORT.on)pause();});
window.addEventListener('pagehide',savePos);
function resize(){
  if(EXPORT.on)return;
  const r=frame.getBoundingClientRect(),dpr=Math.min(window.devicePixelRatio||1,2);
  let w=Math.round(r.width*dpr);w=Math.max(320,Math.min(1920,w));
  if(cv.width!==w){cv.width=w;cv.height=Math.round(w*9/16);}
  SCALE=cv.width/W;GRAIN=CTX.createPattern(SPR.grain,'repeat');
  draw();
}
buildSprites();
ensure(sceneIndex(resumeAt||POSTER_T));buildVoiceArchive();buildShotList();
if('ResizeObserver' in window)new ResizeObserver(resize).observe(frame);else window.addEventListener('resize',resize);
resize();ui();
if(document.fonts&&document.fonts.load){
  Promise.all([
    document.fonts.load('600 82px "Cormorant Garamond"','Anta Al Hayat to be continued'),
    document.fonts.load('400 34px "Noto Nastaliq Urdu"','أنتَ الحياة دوسری کرسی'),
    document.fonts.load('500 15px "Mulish"','Fabeha 0123456789'),
    document.fonts.load('700 16px "Mulish"','Fabeha'),
    document.fonts.load('400 30px "Great Vibes"','Happy Birthday Fabeha'),
    document.fonts.load('700 15px "Dancing Script"','Dear Fabeha'),
  ]).then(()=>{if(!playing)draw();}).catch(()=>{});
}
/* warm the first scenes only; the rest are built as the film reaches them */
{let pk=0;const prepNext=()=>{if(pk<Math.min(3,SC.length)){ensure(pk++);setTimeout(prepNext,90);}};setTimeout(prepNext,300);}
/* #t=SECONDS opens the film paused at that moment (used for still checks) */
{const m=/^#t=([\d.]+)$/.exec(location.hash);if(m){const T=parseFloat(m[1]),go=()=>{seek(T);big.hidden=true;};go();if(document.fonts&&document.fonts.ready)document.fonts.ready.then(()=>setTimeout(go,150));}}

/* ---------- Export: records the film in real time at 1920×1080 with sound to a .webm (Chrome / Edge) ---------- */
const EXPORT={on:false,rec:null,chunks:[],dest:null,t0:0};
const exBtn=$('exportBtn'),exMsg=$('exportMsg');
function exportStart(){
  if(EXPORT.on)return;
  if(!('MediaRecorder' in window)||!cv.captureStream){exMsg.textContent='Export needs Chrome or Edge on a computer.';return;}
  if(!audioInit()){exMsg.textContent='Sound could not start; click the film once, then export.';return;}
  try{A.ac.resume();}catch(e){}
  pause();resumeAt=0;filmT=0;started=true;ended=false;
  EXPORT.on=true;cv.width=1920;cv.height=1080;SCALE=1.5;GRAIN=CTX.createPattern(SPR.grain,'repeat');
  const stream=cv.captureStream(30);
  if(!EXPORT.dest){EXPORT.dest=A.ac.createMediaStreamDestination();A.master.connect(EXPORT.dest);}
  for(const tr of EXPORT.dest.stream.getAudioTracks())stream.addTrack(tr);
  const mime=['video/webm;codecs=vp9,opus','video/webm;codecs=vp8,opus','video/webm'].find(m=>MediaRecorder.isTypeSupported(m))||'';
  EXPORT.chunks=[];EXPORT.rec=new MediaRecorder(stream,{mimeType:mime,videoBitsPerSecond:14e6,audioBitsPerSecond:192e3});
  EXPORT.rec.ondataavailable=e=>{if(e.data&&e.data.size)EXPORT.chunks.push(e.data);};
  EXPORT.rec.onstop=()=>{const blob=new Blob(EXPORT.chunks,{type:'video/webm'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='anta-al-hayat-1080p.webm';document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(url);a.remove();},4000);
    exMsg.textContent='Saved anta-al-hayat-1080p.webm ('+(blob.size/1048576).toFixed(0)+' MB). Convert to MP4 with ffmpeg if needed.';};
  EXPORT.rec.start(1000);EXPORT.t0=performance.now();
  exBtn.textContent='Recording…';exBtn.disabled=true;exMsg.textContent='Recording the whole film in real time ('+fmt(TOTAL)+'). Keep this tab in front and the sound on; it saves itself at the end.';
  play();
  const tick=()=>{if(!EXPORT.on)return;exMsg.textContent='Recording… '+fmt(filmT)+' / '+fmt(TOTAL)+' · keep this tab in front';setTimeout(tick,1000);};setTimeout(tick,1000);
}
function exportFinish(){
  if(!EXPORT.on)return;EXPORT.on=false;
  setTimeout(()=>{try{EXPORT.rec.stop();}catch(e){}exBtn.textContent='Export video (1080p)';exBtn.disabled=false;resize();},600);
}
if(exBtn)exBtn.addEventListener('click',exportStart);
