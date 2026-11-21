import { HINTS, LEVELS, MISS_MS, ROUND_MS } from './config.js';

const BEST_KEY = 'second-look.archive.best';
function loadBest(){
  try { return Math.max(0, Number(localStorage.getItem(BEST_KEY)) || 0); }
  catch { return 0; }
}

export class ArchiveGame {
  constructor(){
    this.mode='start';
    this.best=loadBest();
    this.level=0;
    this.score=0;
    this.openLevel(0);
    this.mode='start';
  }
  openLevel(index){
    this.level=index;
    this.found=new Set();
    this.hints=HINTS;
    this.left=ROUND_MS;
    this.age=0;
    this.effect=null;
    this.clue=null;
    this.message='Find seven changes in either print.';
    this.mode='play';
  }
  action(){
    if(this.mode==='pause') this.togglePause();
    else if(this.mode==='between') this.openLevel(this.level+1);
    else if(this.mode==='failed') this.openLevel(this.level);
    else if(this.mode==='start'||this.mode==='end'){
      this.score=0;
      this.openLevel(0);
    }
  }
  tick(elapsed){
    if(this.mode!=='play') return;
    this.age+=elapsed;
    this.left=Math.max(0,this.left-elapsed);
    if(!this.left) this.mode='failed';
  }
  get differences(){return LEVELS[this.level].differences;}
  mark(x,y){
    if(this.mode!=='play') return;
    const index=this.differences.findIndex(([dx,dy,r])=>Math.hypot(dx-x,dy-y)<=r);
    if(this.found.has(index)) return;
    if(index<0){
      this.left=Math.max(0,this.left-MISS_MS);
      this.effect={x,y,age:this.age,type:'miss'};
      this.message='No change there · −4 seconds';
      if(!this.left) this.mode='failed';
      return 'miss';
    }
    this.found.add(index);
    if(this.clue?.index===index) this.clue=null;
    this.effect={x,y,index,age:this.age,type:'find'};
    this.message=`${this.found.size} of 7 changes found`;
    if(this.found.size===this.differences.length){
      this.score+=700+Math.ceil(this.left/1000)*3+this.hints*45;
      this.mode=this.level===LEVELS.length-1?'end':'between';
      if(this.mode==='end'&&this.score>this.best){
        this.best=this.score;
        try { localStorage.setItem(BEST_KEY,String(this.best)); } catch {}
      }
    }
    return 'find';
  }
  hint(){
    if(this.mode!=='play'||!this.hints||this.clue?.until>this.age) return;
    const index=this.differences.findIndex((_,i)=>!this.found.has(i));
    this.hints--;
    this.clue={index,until:this.age+3500};
    this.message='Look inside the dashed rings.';
    return 'hint';
  }
  togglePause(){
    if(this.mode==='play') this.mode='pause';
    else if(this.mode==='pause') this.mode='play';
  }
}
