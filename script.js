/* SOUND */
const beep = document.getElementById("beep");

/* PANEL */
function openPanel(type) {
  beep.play();
  const panel = document.getElementById("panel");
  const title = document.getElementById("panelTitle");
  const text = document.getElementById("panelText");

  panel.style.display = "block";

  if (type === "reseau") {
    title.innerText = "Réseau mondiale";
    text.innerText = "Connexion numérique globale via QR et réseaux sociaux.";
  } else {
    title.innerText = "Pays mondiale";
    text.innerText = "Madagascar connecté avec tous les pays du monde.";
  }
}

function closePanel() {
  beep.play();
  document.getElementById("panel").style.display = "none";
}

/* QR CODE */
let qrImg = null;

function generateQR() {
  const value = document.getElementById("qrInput").value;
  if (!value) return alert("Entrez un lien !");
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
  if (!qrImg) return;
  const a = document.createElement("a");
  a.href = qrImg.src;
  a.download = "qr-code.png";
  a.click();
}

/* QUICK LINKS */
function quick(url) {
  beep.play();
  document.getElementById("qrInput").value = url;
}

/* MATRIX EFFECT */
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = Array.from({ length: columns }).fill(1);

function drawMatrix() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#0f0";
  ctx.font = fontSize + "px monospace";

  drops.forEach((y, i) => {
    const text = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillText(text, i * fontSize, y * fontSize);

    if (y * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  });
}

setInterval(drawMatrix, 50);

/* SIMPLE FIREWORKS */
const fw = document.getElementById("fireworks");
const fctx = fw.getContext("2d");

fw.width = window.innerWidth;
fw.height = 300;

setInterval(() => {
  fctx.clearRect(0, 0, fw.width, fw.height);
  for (let i = 0; i < 30; i++) {
    fctx.fillStyle = `hsl(${Math.random() * 360},100%,50%)`;
    fctx.beginPath();
    fctx.arc(
      Math.random() * fw.width,
      Math.random() * fw.height,
      Math.random() * 3,
      0,
      Math.PI * 2
    );
    fctx.fill();
  }
}, 400);
