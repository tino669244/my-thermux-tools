/* ===== MATRIX RAIN + NAME ===== */
const c = document.getElementById("matrix");
const ctx = c.getContext("2d");
c.width = innerWidth;
c.height = innerHeight;

const chars = "0123456789TINOANDRAINA";
const size = 16;
const cols = Math.floor(c.width / size);
const drops = Array(cols).fill(0);

setInterval(() => {
  ctx.fillStyle = "rgba(0,0,0,0.08)";
  ctx.fillRect(0,0,c.width,c.height);

  ctx.fillStyle = "#00ff66";
  ctx.font = size + "px monospace";

  drops.forEach((y,i)=>{
    const t = chars[Math.random()*chars.length|0];
    ctx.fillText(t, i*size, y*size);

    if (y*size > c.height && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  });
}, 50);


/* ===== FIREWORKS 2026 ===== */
const fw = document.getElementById("fireworks");
const fctx = fw.getContext("2d");
fw.width = innerWidth;
fw.height = 180;

function firework() {
  const x = Math.random()*fw.width;
  const y = Math.random()*80 + 40;

  for(let i=0;i<40;i++){
    setTimeout(()=>{
      fctx.fillStyle="#00ff66";
      fctx.fillRect(x+Math.random()*40-20, y+Math.random()*40-20, 2, 2);
    }, i*15);
  }
}
setInterval(firework, 900);


/* ===== PANEL LOGIC ===== */
const panel = document.getElementById("panel");
const title = document.getElementById("panelTitle");
const text = document.getElementById("panelText");

function openPanel(t){
  panel.style.display = "block";

  if(t==="reseau"){
    title.innerText = "Réseau mondiale";
    text.innerText =
      "Le réseau mondial relie chaque continent, chaque pays et chaque plateforme. " +
      "Données en temps réel – Intelligence – Communication – Sécurité – Partage.";
  }
  if(t==="pays"){
    title.innerText = "Pays mondiale";
    text.innerText =
      "Chaque pays devient un nœud du réseau. Madagascar connecté au monde entier, " +
      "partage global et interactions numériques.";
  }

  document.getElementById("beep").play();
}

function closePanel(){
  panel.style.display = "none";
}


/* ===== QR CODE ===== */
function generateQR(){
  const t = qrInput.value;
  if(!t) return;
  qrBox.innerHTML =
    `<img src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(t)}">`;
}
function downloadQR(){
  const img = document.querySelector("#qrBox img");
  if(!img) return;
  const a = document.createElement("a");
  a.href = img.src;
  a.download = "qr.png";
  a.click();
}
function quick(url){
  qrInput.value = url;
  generateQR();
}
