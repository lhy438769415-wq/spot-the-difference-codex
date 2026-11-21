export function stageShot(world,query){
  const shot=query.get('shot');
  if(!['start','play','play2','end'].includes(shot)) return false;
  if(shot==='start') return true;
  if(shot==='end'){
    world.openLevel(2);
    world.found=new Set(world.differences.map((_,index)=>index));
    world.score=3216;
    world.best=3216;
    world.left=39_000;
    world.message='All seven changes found';
    world.mode='end';
    return true;
  }
  world.openLevel(shot==='play2'?1:0);
  world.found=new Set(shot==='play2'?[0,3,5]:[0,3]);
  world.left=shot==='play2'?48_000:74_000;
  world.message=`${world.found.size} of 7 changes found`;
  return true;
}
