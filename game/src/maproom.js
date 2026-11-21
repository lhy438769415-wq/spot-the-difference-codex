import { painter } from './paint.js';
import { seededRandom } from './random.js';

export function drawMapRoom(ctx, changed, seed){
  const {rect,oval,shape,line,gradient,label}=painter(ctx);
  const random=seededRandom(seed);
  rect(0,0,552,388,gradient(0,388,'#384155','#886473'));
  for(let x=5;x<552;x+=19) line('#eab7a114',1,[x,0],[x,260]);
  rect(35,29,482,168,'#211f32');
  rect(41,33,470,159,'#c38d73');
  rect(47,38,458,148,gradient(38,148,'#f4d399','#ceb184'));
  ctx.save();
  ctx.beginPath();
  ctx.rect(48,39,456,146);
  ctx.clip();
  for(let x=62;x<510;x+=19) line('#806c6a39',1,[x,39],[x,186]);
  for(let y=45;y<187;y+=16) line('#806c6a39',1,[48,y],[506,y]);
  const island=(x,y,rx,ry,color)=>{
    const edge=[];
    for(let i=0;i<34;i++){
      const angle=i*Math.PI/17,r=.73+random()*.35;
      edge.push([x+Math.cos(angle)*rx*r,y+Math.sin(angle)*ry*r]);
    }
    shape(color,...edge);
  };
  island(151,100,77,48,'#8c9e8a');
  island(231,146,42,42,'#a1a083');
  island(366,108,65,49,'#b08c7d');
  island(407,148,29,13,'#b9917c');
  for(let i=0;i<34;i++){
    const x=92+random()*113,y=65+random()*61;
    line('#697d75',1,[x-3,y+3],[x,y-3],[x+4,y+3]);
  }
  ctx.setLineDash([3,4]);
  line('#a35559',2,[86,115],[184,120],[279,110],[366,91],[450,125]);
  ctx.setLineDash([]);
  oval(86,115,changed(0)?3:6,changed(0)?3:6,'#984e56');
  shape(changed(1)?'#636883':'#aa5e60',[279,102],[286,110],[279,118],[272,110]);
  line('#805b70',1,[450,105],[450,145]);
  line('#805b70',1,[430,125],[470,125]);
  shape('#8c5169',[450,108],[456,125],[450,142],[444,125]);
  shape('#f4d89e',[450,110],[454,125],[450,125]);
  label(changed(2)?'W':'N',447,103,'#714d67',8);
  label('THE AUREL BASIN',63,165,'#635c63',11,'serif');
  label('SOUNDINGS • 1894',63,177,'#76666b',7);
  ctx.restore();
  rect(0,198,552,31,'#343345');
  rect(0,202,552,4,'#aa7d76');
  for(let x=18;x<552;x+=34) rect(x,215,26,19,'#715461');
  shape(gradient(220,168,'#be8574','#744958'),[29,222],[525,222],[552,303],[552,388],[0,388],[0,306]);
  for(let i=0;i<37;i++){
    const x=random()*552,y=229+random()*151;
    line('#efd0a02b',1,[x,y],[x+18+random()*110,y+random()*2]);
  }
  shape('#765665',[91,254],[315,245],[339,328],[77,339]);
  shape('#e4c091',[94,248],[315,240],[335,323],[78,333]);
  for(let i=0;i<12;i++) line('#a78e7b61',1,[87,258+i*5.6],[320,252+i*5.5]);
  for(let i=0;i<10;i++) line('#a78e7b61',1,[100+i*23,249],[88+i*25,332]);
  island(175,287,59,27,'#9d9e83');
  island(263,288,37,20,'#b18676');
  oval(153,279,5,5,changed(3)?'#7c6989':'#ae605a');
  line('#8a6066',1,[153,279],[210,302],[275,283]);
  shape('#58777a',[247,225],[274,221],[281,235],[249,242]);
  if(!changed(4)) line('#e2bd8f',2,[254,229],[272,226]);
  oval(363,294,17,10,'#663c53');
  oval(363,290,14,11,'#efc38a');
  oval(363,290,11,8,'#554f69');
  line(changed(5)?'#9dd0bd':'#f4a88d',2,[357,292],[369,287]);
  for(let i=0;i<4;i++){
    rect(430+i*3,246-i*6,86,12,['#ae796c','#d3a47d','#636e80','#926379'][i]);
    rect(490+i*3,247-i*6,16,9,'#e9c697');
  }
  oval(486,326,30,9,'#503b50');
  rect(471,309,31,14,'#66516c');
  oval(486,309,15,5,'#9d7785');
  if(!changed(6)) oval(486,307,5,2,'#e0ae89');
  line('#e8b788',4,[486,308],[512,276]);
  for(let i=0;i<12;i++) line('#ffd19f49',1,[17+i*4,381],[44+i*4,350]);
  for(let i=0;i<1400;i++) rect(random()*552,random()*388,1,1,i%2?'#ffe0a128':'#38233a26');
}
