import { createChimes } from './audio.js';
import { LEVELS } from './config.js';
import { bindInput } from './input.js';
import { createInterfaceRenderer, createPanelRenderer, paintScene } from './render.js';
import { stageShot } from './shots.js';
import { ArchiveGame } from './world.js';

const ids=['game','intro','chapter','level','remaining','time','timeBar','status','marks','hint',
  'hintCount','pause','start','sound','overlay','overlayNote','overlayTitle','overlayText',
  'continue','scorecard','total','best'];
const ui=Object.fromEntries(ids.map(id=>[id,document.getElementById(id)]));
const panels=['left','right'].map(id=>document.getElementById(id));
for(const _ of LEVELS[0].differences) ui.marks.append(document.createElement('i'));

const query=new URLSearchParams(location.search);
const seed=Number(query.get('seed'))||1;
const world=new ArchiveGame();
const staged=stageShot(world,query);
const cursor=bindInput(ui,panels,world,createChimes());
const drawPanels=createPanelRenderer(panels,seed);
const drawInterface=createInterfaceRenderer(ui);
paintScene(document.getElementById('cover'),0,false,seed);

let previous=performance.now();
function frame(now){
  if(!staged) world.tick(now-previous);
  previous=now;
  drawInterface(world);
  if(world.mode!=='start') drawPanels(world,cursor);
  if(!staged) requestAnimationFrame(frame);
}
requestAnimationFrame(now=>{
  frame(now);
  if(staged) requestAnimationFrame(()=>{window.__shotReady=true;});
});
