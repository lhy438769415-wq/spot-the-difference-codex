export function createChimes(){
  let audio;
  return function chime(kind){
    if(!kind || !window.AudioContext) return;
    try {
      audio??=new AudioContext();
      void audio.resume().catch(()=>{});
      const notes=kind==='find'?[587,784]:kind==='hint'?[523]:[146];
      const now=audio.currentTime;
      notes.forEach((frequency,index)=>{
        const tone=audio.createOscillator();
        const volume=audio.createGain();
        const start=now+index*.075;
        tone.type=kind==='miss'?'triangle':'sine';
        tone.frequency.value=frequency;
        volume.gain.setValueAtTime(.001,start);
        volume.gain.exponentialRampToValueAtTime(.095,start+.022);
        volume.gain.exponentialRampToValueAtTime(.001,start+.2);
        tone.connect(volume).connect(audio.destination);
        tone.start(start);
        tone.stop(start+.21);
      });
    } catch {}
  };
}
