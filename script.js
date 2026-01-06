/* ================= MATRIX ================= */
const m = document.getElementById("matrix");
const mtx = m.getContext("2d");

function resizeMatrix(){
  m.width = innerWidth;
  m.height = innerHeight;
}
resizeMatrix();
addEventListener("resize", resizeMatrix);

const chars = "0123456789";
const size = 14;
let cols = Math.floor(m.width / size);
let drops = Array(cols).fill(0);

setInterval(()=>{
  mtx.fillStyle="rgba(0,0,0,0.08)";
  mtx.fillRect(0,0,m.width,m.height);
  mtx.fillStyle="#00ff66";
  mtx.font=size+"px monospace";

  drops.forEach((y,i)=>{
    const t = chars[Math.random()*chars.length|0];
    mtx.fillText(t,i*size,y*size);
    if(y*size>m.height && Math.random()>0.98) drops[i]=0;
    drops[i]++;
  });
},50);

/* ================= FIREWORKS 2026 ================= */
const f = document.getElementById("fireworks");
const ctx = f.getContext("2d");

function resizeFW(){
  f.width = f.offsetWidth;
  f.height = f.offsetHeight;
}
resizeFW();
addEventListener("resize", resizeFW);

let particles=[];

function createTextFire(text){
  const off=document.createElement("canvas");
  off.width=f.width;
  off.height=f.height;
  const octx=off.getContext("2d");

  octx.fillStyle="white";
  octx.font="bold 90px monospace";
  octx.textAlign="center";
  octx.textBaseline="middle";
  octx.fillText(text,f.width/2,f.height/2+20);

  const img=octx.getImageData(0,0,off.width,off.height);

  for(let y=0;y<img.height;y+=4){
    for(let x=0;x<img.width;x+=4){
      if(img.data[(y*img.width+x)*4]>200){
        particles.push({
          x:Math.random()*f.width,
          y:f.height,
          tx:x,
          ty:y,
          life:200
        });
      }
    }
  }
}

createTextFire("2026");

function animateFW(){
  ctx.fillStyle="rgba(0,0,0,0.25)";
  ctx.fillRect(0,0,f.width,f.height);

  particles.forEach(p=>{
    p.x+=(p.tx-p.x)*0.06;
    p.y+=(p.ty-p.y)*0.06;
    p.life--;
    ctx.fillStyle="#00ff66";
    ctx.fillRect(p.x,p.y,2,2);
  });

  particles=particles.filter(p=>p.life>0);
  requestAnimationFrame(animateFW);
}
animateFW();
