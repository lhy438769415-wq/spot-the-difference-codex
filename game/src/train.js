import { painter } from './paint.js';
import { seededRandom } from './random.js';

export function drawTrain(ctx, changed, seed) {
  const {rect,oval,shape,line,gradient,label} = painter(ctx);
  const random = seededRandom(seed);
  rect(0,0,552,388,gradient(0,388,'#522c46','#a95750'));
  rect(0,36,552,190,'#30243d');
  rect(17,50,518,158,gradient(50,158,'#31436b','#ed8d71'));
  for(let i=0;i<44;i++) oval(23+random()*504,57+random()*98,.5+random(),.65,'#ffe2a1');
  oval(91,113,changed(0)?12:17,changed(0)?12:17,'#ffe5aa');
  for(let layer=0;layer<3;layer++){
    const peaks = [[17,208],[17,156+layer*16]];
    for(let x=24;x<530;x+=17) peaks.push([x,152+layer*19+random()*26]);
    peaks.push([535,167+layer*19],[535,208]);
    shape(['#69516e','#49445f','#31384f'][layer],...peaks);
  }
  for(let i=0;i<41;i++){
    const x=19+random()*513, y=183+random()*25, h=6+random()*18;
    shape(i%2?'#253344':'#35465b',[x-5,y],[x,y-h],[x+5,y]);
  }
  for(const x of [8,180,365,535]){
    rect(x,44,10,173,'#b67c65');
    rect(x+2,47,3,160,'#e8a67c');
  }
  for(const x of [30,198,381]){
    line('#ffffff20',3,[x,63],[x+65,63],[x+22,128]);
    line('#ffffff12',8,[x+77,72],[x+52,113]);
  }
  rect(0,22,552,15,'#251d33');
  rect(0,36,552,4,'#e3a174');
  rect(0,216,552,6,'#e1a27a');
  rect(0,223,552,64,gradient(223,64,'#6d334b','#472941'));
  for(let x=10;x<552;x+=34){
    rect(x,231,27,38,'#98505b');
    rect(x+2,233,23,34,'#74394d');
  }
  shape('#211d33',[0,273],[552,273],[552,388],[0,388]);
  shape('#50364e',[206,270],[349,270],[445,388],[103,388]);
  for(let i=0;i<9;i++){
    const y=276+i*i*1.7;
    line('#845366',1,[0,y],[552,y]);
  }
  line('#bb716c',2,[220,273],[131,388]);
  line('#bb716c',2,[334,273],[420,388]);
  for(const x of [143,410]){
    line('#e6ae73',2,[x,34],[x,91]);
    oval(x,108,26,21,gradient(87,42,'#fcb37a00','#fcb37a45'));
    shape(x===410&&changed(1)?'#a7dbbd':'#ffe0a0',[x-9,93],[x+9,93],[x+15,115],[x-15,115]);
    oval(x,115,15,3,'#fff0c3');
  }
  const seat=(x,y,flip)=>{
    ctx.save();
    ctx.translate(x,y);
    ctx.scale(flip,1);
    shape('#291d35',[0,0],[115,14],[129,101],[0,105]);
    shape(gradient(0,90,'#c45c66','#712c52'),[0,0],[89,11],[110,70],[0,81]);
    line('#f08b78',3,[0,4],[85,16],[101,65]);
    for(let i=0;i<9;i++) line('#5f2e4b',1,[i*10,10+i*1.4],[i*12,76-i]);
    shape('#a8445f',[0,82],[108,65],[135,83],[118,104],[0,107]);
    line('#e6827e',2,[0,86],[106,70],[130,83]);
    ctx.restore();
  };
  seat(0,241,1);
  seat(552,241,-1);
  rect(279,234,14,49,'#d4a571');
  oval(286,231,17,5,'#46243e');
  shape(changed(4)?'#96c8c3':'#ef9d81',[273,193],[299,193],[306,220],[266,220]);
  oval(286,220,20,4,'#ffdfa7');
  oval(278,341,133,37,'#19182770');
  rect(271,304,14,71,'#bb7e5f');
  oval(278,375,28,6,'#8e5659');
  oval(278,299,140,38,'#743b46');
  oval(278,290,140,37,gradient(253,74,'#e2a276','#ae615c'));
  for(let i=0;i<7;i++) oval(278,290,137-i*12,34-i*3,'#ffffff08');
  oval(170,284,22,8,'#71414e');
  oval(170,281,19,7,'#f7c896');
  oval(changed(2)?158:182,274,6,5,'#d3a697');
  oval(170,273,12,9,'#fff1ce');
  oval(170,269,9,3,'#6c3942');
  ctx.save();
  ctx.translate(399,278);
  ctx.rotate(-.22);
  rect(-24,-12,47,26,'#70374e');
  rect(-24,-15,47,24,changed(3)?'#b1b875':'#c66f62');
  rect(-19,-12,36,2,'#ffca99');
  label('ATLAS',-15,2,'#ffe0ab',9);
  ctx.restore();
  shape('#ffddac',[284,311],[328,306],[339,324],[293,329]);
  for(let i=0;i<3+(changed(5)?-1:1);i++) line('#9b5d63',1,[298,316+i*2.6],[322,313+i*2.6]);
  oval(485,362,48,11,'#1c152b');
  rect(449,333,74,27,'#6d3b53');
  rect(452,329,68,26,'#ac625d');
  rect(462,330,5,27,'#e1a675');
  rect(503,330,5,27,'#e1a675');
  if(!changed(6)) rect(482,342,11,7,'#ffcd7f');
  for(let i=0;i<1300;i++) rect(random()*552,random()*388,1,1,i%2?'#ffd39b12':'#1a122524');
}
