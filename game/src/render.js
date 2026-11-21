import { HEIGHT, LEVELS, ROUND_MS, WIDTH } from './config.js';
import { drawGlasshouse } from './glasshouse.js';
import { drawMapRoom } from './maproom.js';
import { drawTrain } from './train.js';

const scenes=[drawTrain,drawGlasshouse,drawMapRoom];

export function paintScene(canvas, level, altered, seed){
  scenes[level](canvas.getContext('2d'),()=>altered,LEVELS[level].seed+seed);
}

function ring(ctx,x,y,r,color,dashed=false){
  ctx.save();
  ctx.setLineDash(dashed?[6,5]:[]);
  ctx.beginPath();
  ctx.arc(x,y,r,0,Math.PI*2);
  ctx.lineWidth=6;
  ctx.strokeStyle='#281b32';
  ctx.stroke();
  ctx.lineWidth=3;
  ctx.strokeStyle=color;
  ctx.stroke();
  ctx.restore();
}

export function createPanelRenderer(panels,seed){
  const prints=panels.map(()=>Object.assign(document.createElement('canvas'),{width:WIDTH,height:HEIGHT}));
  let previousLevel=-1;
  return (world,cursor)=>{
    if(world.level!==previousLevel){
      prints.forEach((canvas,index)=>paintScene(canvas,world.level,index===1,seed));
      previousLevel=world.level;
    }
    panels.forEach((canvas,panel)=>{
      const ctx=canvas.getContext('2d');
      ctx.drawImage(prints[panel],0,0);
      for(const index of world.found){
        const [x,y,r]=world.differences[index];
        ring(ctx,x,y,r,'#ffe28a');
        ctx.fillStyle='#352345';
        ctx.beginPath();
        ctx.arc(x+r*.72,y-r*.72,9,0,Math.PI*2);
        ctx.fill();
        ctx.fillStyle='#ffdf8c';
        ctx.font='bold 12px system-ui';
        ctx.textAlign='center';
        ctx.fillText('✓',x+r*.72,y-r*.72+4);
      }
      if(world.clue?.until>world.age){
        const [x,y,r]=world.differences[world.clue.index];
        ring(ctx,x,y,r+9+Math.sin(world.age*.012)*3,'#baf8ff',true);
      }
      const effect=world.effect;
      if(effect){
        const phase=(world.age-effect.age)/370;
        if(phase<1){
          ctx.save();
          ctx.globalAlpha=1-phase;
          if(effect.type==='miss'){
            ctx.fillStyle='#e8516038';
            ctx.fillRect(0,0,WIDTH,HEIGHT);
            ring(ctx,effect.x,effect.y,9+phase*17,'#ff8b9a');
          }else{
            const [x,y,r]=world.differences[effect.index];
            ring(ctx,x,y,r+10+phase*14,'#fff4bf');
          }
          ctx.restore();
        }
      }
      if(cursor.active&&world.mode==='play'){
        const {x,y}=cursor;
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x-11,y);ctx.lineTo(x+11,y);
        ctx.moveTo(x,y-11);ctx.lineTo(x,y+11);
        ctx.strokeStyle='#311f38';ctx.lineWidth=5;ctx.stroke();
        ctx.strokeStyle='#fffcf2';ctx.lineWidth=2;ctx.stroke();
        ctx.restore();
      }
    });
  };
}

const pad=value=>String(value).padStart(2,'0');

export function createInterfaceRenderer(ui){
  let mode;
  let level;
  let count;
  let message;
  let hints;
  let lastSecond;
  return world=>{
    if(level!==world.level){
      level=world.level;
      const chapter=LEVELS[level];
      document.documentElement.style.setProperty('--accent',chapter.color);
      ui.chapter.textContent=`CASE ${pad(level+1)} / 03   •   ${chapter.place}`;
      ui.level.textContent=chapter.name;
    }
    if(count!==world.found.size){
      count=world.found.size;
      ui.remaining.textContent=pad(world.differences.length-count);
      [...ui.marks.children].forEach((mark,index)=>mark.classList.toggle('found',index<count));
    }
    if(hints!==world.hints){
      hints=world.hints;
      ui.hintCount.textContent=`×${hints}`;
    }
    if(message!==world.message){
      message=world.message;
      ui.status.textContent=message;
    }
    const seconds=Math.ceil(world.left/1000);
    if(lastSecond!==seconds){
      lastSecond=seconds;
      ui.time.textContent=`${pad(Math.floor(seconds/60))}:${pad(seconds%60)}`;
      ui.time.parentElement.classList.toggle('urgent',seconds<=25);
    }
    ui.timeBar.style.width=`${world.left/ROUND_MS*100}%`;
    ui.hint.disabled=!hints||world.clue?.until>world.age;
    if(mode===world.mode) return;
    mode=world.mode;
    ui.intro.hidden=mode!=='start';
    ui.game.hidden=mode==='start';
    if(mode==='start'||mode==='play'){
      if(ui.overlay.open) ui.overlay.close();
      return;
    }
    const screens={
      pause:['ARCHIVE PAUSED','Take a breath.','The clock is stopped. Resume when you’re ready.','Resume'],
      failed:['TIME EXPIRED','Print unverified.','The clock ran out. Start this case again with two fresh minutes.','Retry this case'],
      between:['CASE VERIFIED','Print matched.','Seven changes recorded. The next pair of prints is ready.','Open next case'],
      end:['21 / 21 CHANGES FOUND','Archive complete.','All three pairs of prints verified.','Play again'],
    };
    const [note,title,body,action]=screens[mode];
    ui.overlayNote.textContent=note;
    ui.overlayTitle.textContent=title;
    ui.overlayText.textContent=body;
    ui.continue.textContent=action;
    ui.scorecard.hidden=mode!=='end';
    ui.total.textContent=world.score.toLocaleString('en-US');
    ui.best.textContent=world.best.toLocaleString('en-US');
    if(!ui.overlay.open) ui.overlay.showModal();
  };
}
