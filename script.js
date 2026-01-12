/* ===== MATRIX ===== */
const c=document.getElementById("matrix");
const ctx=c.getContext("2d");
c.width=innerWidth; c.height=innerHeight;

const chars="01234567TINOANDRAINA";
const size=15;
const cols=c.width/size;
const drops=Array(Math.floor(cols)).fill(0);

setInterval(()=>{
  ctx.fillStyle="rgba(0,0,0,0.07)";
  ctx.fillRect(0,0,c.width,c.height);
  ctx.fillStyle="#00ff66";
  ctx.font=size+"px monospace";

  drops.forEach((y,i)=>{
    const text = chars[Math.random()*chars.length|0];
    ctx.fillText(text,i*size,y*size);
    if(y*size>c.height && Math.random()>0.98) drops[i]=0;
    drops[i]++;
  });
},50);

/* ===== QR ===== */
function generateQR(){
  const t=qrInput.value;
  qrBox.innerHTML=`<img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(t)}">`;
}
function downloadQR(){
  const img=document.querySelector("#qrBox img");
  if(!img)return;
  const a=document.createElement("a");
  a.href=img.src;
  a.download="qr.png";
  a.click();
}
function quick(u){qrInput.value=u}

/* ===== POPUP ===== */
function openPanel(type){
  const p = document.getElementById("infoPanel");
  const t = document.getElementById("panelTitle");
  const c = document.getElementById("panelText");
  const i = document.getElementById("panelImage");

  p.style.display="block";

  if(type==="reseau"){
    t.innerText="Réseau mondiale";
    c.innerText="Connexion globale, surveillance intelligente, caméras 360°, analyse data, cyber-sécurité.";
    i.src="https://images.unsplash.com/photo-1526378722443-4a9d0a3b99d6";
  }

  if(type==="pays"){
    t.innerText="Pays mondiale";
    c.innerText="Chaque pays est un nœud dans le réseau global. Le monde connecté à Madagascar.";
    i.src="https://images.unsplash.com/photo-1502920514313-52581002a659";
  }
}

function closePanel(){
  document.getElementById("infoPanel").style.display="none";
}

/* ===== MAP RAYS ===== */
const rays = document.getElementById("rays");

for(let i=0;i<25;i++){
  const x = 1320, y = 820;
  const tx = Math.random()*2000;
  const ty = Math.random()*1100;

  rays.innerHTML += `
    <line x1="${x}" y1="${y}" x2="${tx}" y2="${ty}"
      stroke="#00ff66" stroke-width="2" 
      stroke-opacity="0.7"
      style="filter: drop-shadow(0 0 6px #00ff66);" />
  `;
}
