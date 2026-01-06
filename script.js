/* AUDIO */
const beep = document.getElementById("beep");

/* BACKGROUND MUSIC */
const bgMusic = document.createElement("audio");
bgMusic.src = "https://assets.mixkit.co/music/preview/mixkit-digital-technology-ambient-114.mp3";
bgMusic.loop = true;
bgMusic.volume = 0.3;
document.body.appendChild(bgMusic);
document.addEventListener("click", () => {
  if (bgMusic.paused) bgMusic.play();
});

/* ========================= PANEL ========================= */
function openPanel(type) {
  beep.play();
  const p = document.getElementById("panel");
  p.style.display = "block";

  const title = document.getElementById("panelTitle");
  const text = document.getElementById("panelText");

  if (type === "reseau") {
    title.innerText = "Réseau mondiale";

    text.innerHTML = `
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Globe_icon_green.svg/512px-Globe_icon_green.svg.png">
      <p>
      Ny tambajotra sosialy dia sehatra ahafahan’ny olona mifandray,
      mizara votoaty, mamorona fiarahamonina ary mifanakalo vaovao eran-tany.
      </p>
      <p>
      Izy io no manokatra varavarana ho an'i Madagasikara hifandray amin'ny tontolo nomerika iraisam-pirenena.
      </p>
    `;
  }

  if (type === "pays") {
    title.innerText = "Pays mondiale";
    text.innerHTML = `
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Flag-map_of_Madagascar.svg/512px-Flag-map_of_Madagascar.svg.png">
      <p>
      Madagascar dia ivon’ny fifandraisana nomerika vaovao amin’ny alalan’ny QR,
      rohy, tambajotra ary sehatra sosialy.
      </p>
    `;
  }
}

function closePanel() {
  beep.play();
  document.getElementById("panel").style.display = "none";
}

/* ========================= QR ========================= */
let qrImg;
let qrGenerated = false;

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

/* ========================= MATRIX ========================= */
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

const letters = "tinoandraina0248795126691100101";
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = Array.from({ length: columns }).fill(1);

function drawMatrix() {
  ctx.fillStyle = "rgba(0,0,0,0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#0f0";
  ctx.font = fontSize + "px monospace";

  drops.forEach((y, i) => {
    const text = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillText(text, i * fontSize, y * fontSize);
    if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  });
}
setInterval(drawMatrix, 50);

/* ========================= 2026 FIREWORK EXPLOSION ========================= */
const fw = document.getElementById("fireworks");
const fctx = fw.getContext("2d");
fw.width = innerWidth;
fw.height = 220;

function draw2026() {
  fctx.clearRect(0,0,fw.width,fw.height);
  fctx.font = "bold 120px monospace";
  fctx.fillStyle = "#00ff88";
  fctx.textAlign = "center";
  fctx.fillText("2026", fw.width/2, 160);

  const img = fctx.getImageData(0,0,fw.width,fw.height);
  fctx.clearRect(0,0,fw.width,fw.height);

  for(let i=0;i<img.data.length;i+=4){
    if(img.data[i]>0 && Math.random()>0.985){
      const x = (i/4)%fw.width;
      const y = Math.floor(i/4/fw.width);
      fctx.fillStyle = "rgba(0,255,140," + Math.random() + ")";
      fctx.beginPath();
      fctx.arc(
        x + Math.random()*6-3,
        y + Math.random()*6-3,
        2,0,Math.PI*2
      );
      fctx.fill();
    }
  }
}
setInterval(draw2026, 180);

/* ========================= GLOBE 3D ========================= */
const globe = document.getElementById("globe");
const g = globe.getContext("2d");
globe.width = globe.height = 220;

let rotX = 0, rotY = 0;
let vx = 0.002, vy = 0.001;
let zoom = 1;
let dragging = false, lx = 0, ly = 0;

const continents = [
  [0,20],[10,30],[20,25],[-10,20],
  [50,10],[55,20],[48,15],
  [30,80],[40,100],[20,120],
  [40,-80],[20,-90],[0,-70]
];

globe.onmousedown = e => { dragging = true; lx=e.clientX; ly=e.clientY; };
window.onmouseup   = () => dragging = false;

window.onmousemove = e => {
  if (!dragging) return;
  vx = (e.clientY - ly) * 0.0004;
  vy = (e.clientX - lx) * 0.0004;
  lx = e.clientX;
  ly = e.clientY;
};

globe.onclick = () => zoom = zoom===1 ? 1.5 : 1;

function project(lat,lon){
  const r=80;
  const x = r * Math.cos(lat) * Math.sin(lon + rotY);
  const y = r * Math.sin(lat + rotX);
  const z = Math.cos(lat) * Math.cos(lon + rotY);
  return {x,y,z};
}

function drawGlobe(){
  g.clearRect(0,0,220,220);
  g.save();
  g.translate(110,110);
  g.scale(zoom,zoom);

  rotX += vx;
  rotY += vy;

  g.globalAlpha = 0.4;
  g.strokeStyle = "#00ff88";
  for(let lat=-80;lat<=80;lat+=20){
    g.beginPath();
    for(let lon=-180;lon<=180;lon+=5){
      const p = project(lat*Math.PI/180, lon*Math.PI/180);
      g.lineTo(p.x,p.y);
    }
    g.stroke();
  }

  g.globalAlpha = 1;
  continents.forEach(c=>{
    const p = project(c[0]*Math.PI/180, c[1]*Math.PI/180);
    if (p.z>0){
      g.fillStyle="#00ff88";
      g.beginPath();
      g.arc(p.x,p.y,2,0,Math.PI*2);
      g.fill();
    }
  });

  g.restore();
  requestAnimationFrame(drawGlobe);
}
drawGlobe();

/* ========================= ULTRA HACKER ========================= */
function toggleHacker() {
  beep.play();
  document.body.classList.toggle("ultra");
}
