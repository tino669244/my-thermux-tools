/* =========================
   AUDIO
========================= */
const beep = document.getElementById("beep");

const bgMusic = document.createElement("audio");
bgMusic.src =
  "https://assets.mixkit.co/music/preview/mixkit-digital-technology-ambient-114.mp3";
bgMusic.loop = true;
bgMusic.volume = 0.3;
document.body.appendChild(bgMusic);

document.addEventListener("click", () => {
  if (bgMusic.paused) bgMusic.play();
});

/* =========================
   PANEL
========================= */
function openPanel(type) {
  beep.play();
  const panel = document.getElementById("panel");
  const title = document.getElementById("panelTitle");
  const text = document.getElementById("panelText");
  panel.style.display = "block";

  if (type === "reseau") {
    title.innerText = "Réseaux sociaux";
    text.innerHTML = `
      ${svgReseau()}
      <p>
      Ny tambajotra sosialy dia sehatra an-tserasera ahafahan’ny olona mamorona kaonty manokana,
      mifandray amin’ny hafa, mizara votoaty toy ny lahatsoratra, sary ary horonan-tsary,
      ary manorina fiarahamonina mifototra amin’ny tombontsoa iombonana,
      na fifandraisana manokana sy ara-piasana.
      </p>
      <p>
      Ireo tambajotra ireo dia ampiasaina amin’ny fifandraisana andavanandro,
      fampahalalam-baovao, fialamboly ary varotra nomerika.
      Anisan’ireo malaza indrindra ny Facebook, Instagram, TikTok ary LinkedIn.
      </p>
      <p>
      Miasa amin’ny alalan’ny algorithm ny tambajotra sosialy,
      izay mandamina sy manolotra votoaty mifanaraka amin’ny zavatra mahaliana ny mpampiasa,
      ary ahitana fiasa maro toy ny hafatra manokana, stories, commentaires, partages ary groupes.
      </p>
      <p>
      Ho an’ny orinasa, fitaovana lehibe izy amin’ny marketing,
      fifandraisana amin’ny mpanjifa, dokambarotra kendrena ary recrutement.
      </p>
      <p>
      Misy ihany koa ny fanamby toy ny vaovao diso,
      fanerena ara-tsosialy ary fitantanana ny laza an-tserasera.
      </p>
    `;
  }

  if (type === "pays") {
    title.innerText = "Madagascar & Monde";
    text.innerHTML = `
      ${svgMadagascar()}
      <p>
      Madagascar dia lasa ivon’ny fifandraisana nomerika maneran-tany.
      Ny QR Code sy ny tambajotra sosialy dia mampifandray mivantana
      ny firenena sy ny sehatra iraisam-pirenena.
      </p>
    `;
  }
}

function closePanel() {
  beep.play();
  document.getElementById("panel").style.display = "none";
}

/* =========================
   SVG
========================= */
function svgReseau() {
  return `
  <svg viewBox="0 0 200 200" width="260">
    <circle cx="100" cy="100" r="35" stroke="#00ff88" fill="none" stroke-width="2"/>
    ${[20,40,180,50,160,170,40,160].map((v,i)=>`
      <line x1="100" y1="100"
            x2="${[20,180,160,40][Math.floor(i/2)]}"
            y2="${[40,50,170,160][Math.floor(i/2)]}"
            stroke="#00ff88"/>
    `).join("")}
  </svg>`;
}

function svgMadagascar() {
  return `
  <svg viewBox="0 0 100 200" width="120">
    <path d="M50 10 C35 40 30 80 35 120 C40 160 60 185 55 195"
      fill="none" stroke="#00ff88" stroke-width="3"/>
  </svg>`;
}

/* =========================
   QR
========================= */
let qrImg, qrGenerated = false;

function generateQR() {
  const value = document.getElementById("qrInput").value;
  if (!value) return alert("Ampidiro aloha ny URL");
  qrGenerated = true;
  beep.play();
  const box = document.getElementById("qrBox");
  box.innerHTML = "";
  qrImg = document.createElement("img");
  qrImg.src =
    "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=" +
    encodeURIComponent(value);
  box.appendChild(qrImg);
}

function downloadQR() {
  if (!qrGenerated) return alert("Génère d'abord le QR");
  const a = document.createElement("a");
  a.href = qrImg.src;
  a.download = "qr-code.png";
  a.click();
}

function quick(url) {
  beep.play();
  document.getElementById("qrInput").value = url;
}

/* =========================
   MATRIX RAIN (TSY VOAKASIKA)
========================= */
const matrix = document.getElementById("matrix");
const mctx = matrix.getContext("2d");
matrix.width = innerWidth;
matrix.height = innerHeight;

const letters = "TINOANDRAINA2026";
const fontSize = 14;
const cols = matrix.width / fontSize;
const drops = Array.from({ length: cols }).fill(1);

setInterval(() => {
  mctx.fillStyle = "rgba(0,0,0,0.05)";
  mctx.fillRect(0,0,matrix.width,matrix.height);
  mctx.fillStyle = "#00ff88";
  mctx.font = fontSize + "px monospace";
  drops.forEach((y,i)=>{
    const t = letters[Math.random()*letters.length|0];
    mctx.fillText(t, i*fontSize, y*fontSize);
    if (y*fontSize > matrix.height && Math.random()>0.975) drops[i]=0;
    drops[i]++;
  });
},50);

/* =========================
   FIREWORK 2026 PERMANENT
========================= */
const fw = document.getElementById("fireworks");
const fctx = fw.getContext("2d");
fw.width = innerWidth;
fw.height = 300;

function fireworkText() {
  fctx.clearRect(0,0,fw.width,fw.height);
  for(let i=0;i<120;i++){
    fctx.fillStyle = `rgba(0,255,150,${Math.random()})`;
    fctx.beginPath();
    fctx.arc(
      fw.width/2 + Math.cos(i)*Math.random()*120,
      140 + Math.sin(i)*Math.random()*60,
      2,0,Math.PI*2
    );
    fctx.fill();
  }
}
setInterval(fireworkText,300);

/* =========================
   GLOBE 360° HACKER
========================= */
const globe = document.getElementById("globe");
const g = globe.getContext("2d");
let rotX = 0, rotY = 0, vx = 0.002, vy = 0.001;
let zoom = 1, dragging = false, lx=0, ly=0;

globe.width = globe.height = 260;

globe.onmousedown = e => {
  dragging = true;
  lx = e.clientX; ly = e.clientY;
};

window.onmouseup = () => dragging = false;

window.onmousemove = e => {
  if (!dragging) return;
  vx = (e.clientY - ly) * 0.0005;
  vy = (e.clientX - lx) * 0.0005;
  lx = e.clientX; ly = e.clientY;
};

globe.onclick = () => zoom = zoom === 1 ? 1.4 : 1;

function drawGlobe() {
  g.clearRect(0,0,260,260);
  g.save();
  g.translate(130,130);
  g.scale(zoom,zoom);

  rotX += vx;
  rotY += vy;

  // sphere
  g.strokeStyle = "#00ff88";
  for(let lat=-80; lat<=80; lat+=20){
    g.beginPath();
    for(let lon=0; lon<=360; lon+=5){
      const x = Math.cos(lat*Math.PI/180)*Math.cos(lon*Math.PI/180+rotY);
      const y = Math.sin(lat*Math.PI/180+rotX);
      g.lineTo(x*90,y*90);
    }
    g.stroke();
  }

  // rays
  for(let i=0;i<12;i++){
    g.beginPath();
    g.moveTo(0,0);
    g.lineTo(Math.cos(i)*140,Math.sin(i)*140);
    g.stroke();
  }

  g.restore();
  requestAnimationFrame(drawGlobe);
}
drawGlobe();
