import { HEIGHT, WIDTH } from './config.js';

const directions={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]};

export function bindInput(ui,panels,world,chime){
  const cursor={x:WIDTH/2,y:HEIGHT/2,active:false};
  let sound=true;
  const play=result=>{ if(sound) chime(result); };
  const act=()=>{
    world.action();
    if(world.age===0) Object.assign(cursor,{x:WIDTH/2,y:HEIGHT/2,active:false});
  };
  for(const canvas of panels){
    canvas.addEventListener('click',event=>{
      const box=canvas.getBoundingClientRect();
      cursor.active=false;
      play(world.mark((event.clientX-box.left)*WIDTH/box.width,(event.clientY-box.top)*HEIGHT/box.height));
    });
  }
  ui.start.addEventListener('click',act);
  ui.continue.addEventListener('click',act);
  ui.hint.addEventListener('click',()=>play(world.hint()));
  ui.pause.addEventListener('click',()=>world.togglePause());
  ui.sound.addEventListener('click',()=>{
    sound=!sound;
    ui.sound.textContent=sound?'Sound on':'Sound off';
    ui.sound.setAttribute('aria-pressed',String(sound));
  });
  ui.overlay.addEventListener('cancel',event=>{
    event.preventDefault();
    if(world.mode==='pause') world.togglePause();
  });
  window.addEventListener('keydown',event=>{
    if(event.ctrlKey||event.metaKey||event.altKey) return;
    const key=event.key.toLowerCase();
    if(key==='p'||key==='h'){
      if(event.repeat) return;
      event.preventDefault();
      if(key==='p') world.togglePause();
      else play(world.hint());
      return;
    }
    const mark=key===' '||key==='enter';
    if(mark&&event.target instanceof HTMLButtonElement) return;
    if(world.mode!=='play'){
      if(mark&&!event.repeat){event.preventDefault();act();}
      return;
    }
    const direction=directions[event.key];
    if(direction){
      event.preventDefault();
      if(document.activeElement instanceof HTMLButtonElement) document.activeElement.blur();
      cursor.active=true;
      const step=event.shiftKey?4:12;
      cursor.x=Math.max(0,Math.min(WIDTH-1,cursor.x+direction[0]*step));
      cursor.y=Math.max(0,Math.min(HEIGHT-1,cursor.y+direction[1]*step));
    }else if(mark&&!event.repeat){
      event.preventDefault();
      cursor.active=true;
      play(world.mark(cursor.x,cursor.y));
    }
  });
  return cursor;
}
