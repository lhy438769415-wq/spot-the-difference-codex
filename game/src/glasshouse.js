import { painter } from './paint.js';
import { seededRandom } from './random.js';

export function drawGlasshouse(ctx, changed, seed){
  const {rect,oval,shape,line,gradient,label}=painter(ctx);
  const random=seededRandom(seed);
  rect(0,0,552,388,gradient(0,388,'#78b9b4','#f4d48a'));
  oval(366,76,57,57,'#f8e6ab');
  for(let layer=0;layer<3;layer++){
    const ridge=[[0,270],[0,125+31*layer]];
    for(let x=0;x<560;x+=16) ridge.push([x,130+layer*25+Math.sin(x*.016+layer)*26+random()*24]);
    ridge.push([552,270]);
    shape(['#8eafa2','#6c998a','#457f74'][layer],...ridge);
  }
  for(let i=0;i<90;i++){
    const x=random()*552,y=173+random()*83,h=10+random()*40;
    shape(i%2?'#417364':'#568474',[x-5,y],[x,y-h],[x+5,y]);
  }
  for(const x of [32,118,209,343,434,520]){
    const top=39-Math.sin(x/552*Math.PI)*38;
    line('#1e514e',8,[x,255],[x,top]);
    line('#b1d9b2',2,[x-2,255],[x-2,top]);
    line('#edf9d853',2,[x+8,151],[x+65,87]);
    line('#edf9d839',6,[x+13,116],[x+36,90]);
  }
  line('#285b57',9,[0,65],[115,8],[437,8],[552,65]);
  line('#c1ddae',2,[0,63],[115,6],[437,6],[552,63]);
  for(const y of [86,181,252]){
    line('#265a56',7,[0,y],[552,y]);
    line('#9dc8aa',2,[0,y-2],[552,y-2]);
  }
  rect(0,255,552,133,gradient(255,133,'#6f977e','#315c57'));
  shape('#baae83',[216,248],[334,248],[509,388],[47,388]);
  for(let i=0;i<10;i++){
    const y=252+i*i*1.75;
    line('#777e69',1,[212-(y-253)*1.26,y],[340+(y-253)*1.26,y]);
  }
  for(const x of [125,209,345,431]) line('#8a8c71',1,[276+(x-276)*.32,251],[x,388]);
  const plant=(x,y,s,flower,pot,tag)=>{
    ctx.save();
    ctx.translate(x,y); ctx.scale(s,s);
    oval(0,4,24,6,'#173f3c60');
    shape(pot,[-20,-18],[20,-18],[14,5],[-14,5]);
    rect(-22,-22,44,7,'#f4cb92');
    oval(0,-22,20,3,'#574c43');
    for(let i=0;i<8;i++){
      const dx=(random()-.5)*54, dy=25+random()*34;
      line('#345c49',1.5,[0,-21],[dx*.44,-29],[dx,-dy]);
      oval(dx*.74,-dy+4,10,3,i%2?'#8ac381':'#4f9876',dx*.04);
      if(i%2===0){
        const petals=5;
        for(let j=0;j<petals;j++){
          const a=j/petals*Math.PI*2;
          oval(dx+Math.cos(a)*4,-dy+Math.sin(a)*4,3.3,3.3,flower);
        }
        oval(dx,-dy,2.6,2.6,'#ffe2a2');
      }
    }
    if(tag) rect(4,-6,9,4,'#ffe2a2');
    ctx.restore();
  };
  shape('#254c48',[0,218],[206,223],[187,257],[0,288]);
  shape('#be8568',[0,213],[213,219],[191,245],[0,273]);
  shape('#25564d',[552,190],[365,219],[378,259],[552,293]);
  shape('#c69a75',[552,184],[358,216],[379,252],[552,276]);
  for(const x of [41,124,504,439]) rect(x,258,9,69,'#2f5750');
  plant(39,228,1.05,'#edb474','#b77662',true);
  plant(92,266,1.05,'#e2a5a0',changed(0)?'#719bc3':'#b77968',true);
  plant(139,230,.72,'#ffe6a0','#b27b64',true);
  plant(193,241,.58,'#f9af88','#9e6d65',true);
  if(!changed(1)) rect(160,234,14,10,'#eaddaf');
  plant(429,243,.83,'#ebb5aa','#9b796c',true);
  plant(462,219,.88,changed(4)?'#97a2df':'#ffdc83','#b87764',true);
  plant(513,235,1.18,'#ed98a4','#ba8a69',true);
  plant(340,252,.62,'#eed597','#a2795e',!changed(3));
  plant(259,278,.68,changed(2)?'#ef9389':'#f4d99a','#857565',true);
  oval(387,325,25,8,'#31574e60');
  shape('#426c71',[370,303],[398,303],[401,322],[373,322]);
  oval(389,303,11,4,'#d3dea2');
  line(changed(5)?'#e2c07a':'#91b8a2',4,[399,308],[411,297],[418,296]);
  plant(64,371,1.3,'#daa5c5','#b56f62',true);
  rect(94,334,33,20,'#50766c');
  label(changed(6)?'VI':'IV',102,348,'#f7dba2',12);
  plant(510,377,1.6,'#f5b186','#ad7568',true);
  for(let i=0;i<1200;i++) rect(random()*552,random()*388,1,1,i%2?'#ffe5b026':'#25483d20');
}
