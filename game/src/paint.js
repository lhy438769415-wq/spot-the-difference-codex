export function painter(ctx) {
  return {
    rect(x,y,w,h,color) {
      ctx.fillStyle = color;
      ctx.fillRect(x,y,w,h);
    },
    oval(x,y,rx,ry,color,angle=0) {
      ctx.beginPath();
      ctx.ellipse(x,y,rx,ry,angle,0,Math.PI*2);
      ctx.fillStyle = color;
      ctx.fill();
    },
    shape(color,...points) {
      ctx.beginPath();
      ctx.moveTo(...points[0]);
      for (const point of points.slice(1)) ctx.lineTo(...point);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
    },
    line(color,width,...points) {
      ctx.beginPath();
      ctx.moveTo(...points[0]);
      for (const point of points.slice(1)) ctx.lineTo(...point);
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.stroke();
    },
    gradient(y,h,top,bottom) {
      const gradient = ctx.createLinearGradient(0,y,0,y+h);
      gradient.addColorStop(0,top);
      gradient.addColorStop(1,bottom);
      return gradient;
    },
    label(text,x,y,color,size,font='monospace') {
      ctx.font = `bold ${size}px ${font}`;
      ctx.fillStyle = color;
      ctx.fillText(text,x,y);
    },
  };
}
