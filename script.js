/* ========== MATRIX RAIN BACKGROUND ========== */
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = "TINOANDRAINA01101001011001";
const size = 14;
const columns = Math.floor(canvas.width / size);
const drops = Array.from({ length: columns }, () => 1);

function matrixRain() {
  ctx.fillStyle = "rgba(0,0,0,0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#0f0";
  ctx.font = size + "px monospace";

  drops.forEach((y, i) => {
    const text = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillText(text, i * size, y * size);

    if (y * size > canvas.height && Math.random() > 0.95) drops[i] = 0;
    drops[i]++;
  });
}
setInterval(matrixRain, 35);



/* ========== AUDIO PLAY ========== */
const audio = document.getElementById("matrixAudio");

document.body.addEventListener(
  "click",
  () => {
    audio.play();
  },
  { once: true }
);


/* ========== AUDIO SYNC WITH MAP PULSE ========== */
const worldMap = document.getElementById("worldmap");

function syncPulseWithAudio() {
  if (audio.paused) return;

  const boost = Math.random() * 0.15 + 1;
  worldMap.style.transform = `scale(${boost}) rotate(${Date.now() / 100 % 360}deg)`;

  setTimeout(syncPulseWithAudio, 120);
}

audio.onplay = () => syncPulseWithAudio();



/* ========== CYBER RAY LINES ========== */
const rayCanvas = document.getElementById("rayCanvas");
const rctx = rayCanvas.getContext("2d");

function resizeRayCanvas() {
  rayCanvas.width = document.getElementById("mapShell").offsetWidth;
  rayCanvas.height = document.getElementById("mapShell").offsetHeight;
}
resizeRayCanvas();
window.addEventListener("resize", resizeRayCanvas);

// Madagascar coordinates (approx)
let mgX = 540;
let mgY = 350;

function drawRay() {
  rctx.clearRect(0, 0, rayCanvas.width, rayCanvas.height);

  const targets = [
    { x: 150, y: 110 },
    { x: 250, y: 70 },
    { x: 480, y: 60 },
    { x: 120, y: 300 },
    { x: 430, y: 260 }
  ];

  targets.forEach(t => {
    rctx.strokeStyle = "#00ff88";
    rctx.lineWidth = 2;
    rctx.beginPath();
    rctx.moveTo(mgX, mgY);
    rctx.lineTo(t.x, t.y);
    rctx.stroke();
  });
}

setInterval(drawRay, 200);



/* ========== QR GENERATOR ========== */
function generateQR() {
  let link = document.getElementById("qrInput").value;
  document.getElementById("qrBox").innerHTML =
    `<img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${link}">`;
}

function downloadQR() {
  const img = document.querySelector("#qrBox img");
  const a = document.createElement("a");
  a.href = img.src;
  a.download = "qr.png";
  a.click();
}

function quick(url) {
  document.getElementById("qrInput").value = url;
  generateQR();
}



/* ========== POPUP PANEL ========== */
function openPanel(type) {
  const p = document.getElementById("infoPanel");
  p.style.display = "block";

  if (type === "reseau") {
    document.getElementById("panelTitle").textContent = "RÉSEAU MONDIAL";
    document.getElementById("panelText").innerHTML = `
      • Fibre optique & satellite mondiaux<br>
      • Data flow maneran-tany<br>
      • Encryption | Firewall | Cyber Security<br>
      • Cloud & AI routing global<br>`;
  }

  if (type === "pays") {
    document.getElementById("panelTitle").textContent = "PAYS MONDIAL";
    document.getElementById("panelText").innerHTML = `
      Afrique, Europe, Amériques, Asie, Océanie<br>
      Madagascar, Brésil, France, UK<br>
      Népal, Monaco, Montenegro<br>
      Fizarana tambazotra maneran-tany<br>`;
  }
}

function closePanel() {
  document.getElementById("infoPanel").style.display = "none";
}
