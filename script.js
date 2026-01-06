/* AUDIO */
const beep = document.getElementById("beep");

const bgMusic = document.createElement("audio");
bgMusic.src = "https://assets.mixkit.co/music/preview/mixkit-digital-technology-ambient-114.mp3";
bgMusic.loop = true;
bgMusic.volume = 0.3;
document.body.appendChild(bgMusic);

document.addEventListener("click", () => {
  if (bgMusic.paused) bgMusic.play();
});

/* PANEL */
function openPanel(type) {
  beep.play();
  const panel = document.getElementById("panel");
  const title = document.getElementById("panelTitle");
  const text = document.getElementById("panelText");

  panel.style.display = "block";

  if (type === "reseau") {
    title.innerText = "🌐 Réseau mondiale";
    text.innerHTML = `
      ${svgReseau()}
      <p>
        Le QR Code permet une connexion numérique instantanée entre Madagascar
        et le reste du monde. Chaque scan ouvre un réseau sécurisé et global.
      </p>
      <p>
        Le réseau mondial facilite le partage d’identité digitale,
        de contenus et de services internationaux.
      </p>
    `;
  }

  if (type === "pays") {
    title.innerText = "🌍 Pays mondiale";
    text.innerHTML = `
      ${svgMadagascar()}
      <p>
        Madagascar devient un point central du réseau mondial numérique.
      </p>
      <p>
        Les connexions créées via QR permettent une interaction directe
        entre les pays et les plateformes internationales.
      </p>
    `;
  }
}

function closePanel() {
  beep.play();
  document.getElementById("panel").style.display = "none";
}

/* SVG */
function svgReseau() {
  return `
  <svg viewBox="0 0 200 200" width="260">
    <circle cx="100" cy="100" r="35" stroke="#0f0" fill="none" stroke-width="2"/>
    <line x1="100" y1="100" x2="20" y2="40" stroke="#0f0"/>
    <line x1="100" y1="100" x2="180" y2="50" stroke="#0f0"/>
    <line x1="100" y1="100" x2="160" y2="170" stroke="#0f0"/>
    <line x1="100" y1="100" x2="40" y2="160" stroke="#0f0"/>
    <circle cx="20" cy="40" r="5" fill="#0f0"/>
    <circle cx="180" cy="50" r="5" fill="#0f0"/>
    <circle cx="160" cy="170" r="5" fill="#0f0"/>
    <circle cx="40" cy="160" r="5" fill="#0f0"/>
  </svg>`;
}

function svgMadagascar() {
  return `
  <svg viewBox="0 0 100 200" width="120">
    <path d="M50 10 C35 40 30 80 35 120 C40 160 60 185 55 195"
      fill="none" stroke="#0f0" stroke-width="3"/>
  </svg>`;
}

/* QR */
let qrImg;
let qrGenerated = false;

function generateQR() {
  const value = document.getElementById("qrInput").value;
  if (!value) {
    alert("⚠️ Ampidiro aloha ny URL vao générer-na QR");
    return;
  }
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
  if (!qrGenerated) {
    alert("⚠️ Génère d'abord le QR Code");
    return;
  }
  const a = document.createElement("a");
  a.href = qrImg.src;
  a.download = "qr-code.png";
  a.click();
}

function quick(url) {
  beep.play();
  document.getElementById("qrInput").value = url;
}

/* MATRIX */
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ";
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

/* FIREWORKS */
const fw = document.getElementById("fireworks");
const fctx = fw.getContext("2d");
fw.width = window.innerWidth;
fw.height = 300;

setInterval(() => {
  fctx.clearRect(0, 0, fw.width, fw.height);
  for (let i = 0; i < 30; i++) {
    fctx.fillStyle = `hsl(${Math.random() * 360},100%,50%)`;
    fctx.beginPath();
    fctx.arc(Math.random() * fw.width, Math.random() * fw.height, 2, 0, Math.PI * 2);
    fctx.fill();
  }
}, 400);
