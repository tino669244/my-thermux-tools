/* MATRIX RAIN CANVAS */
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = "TINOANDRAINA1010010010110001";
const size = 14;
const columns = canvas.width / size;
const drops = [];

for (let i = 0; i < columns; i++) drops[i] = 1;

function matrixRain() {
  ctx.fillStyle = "rgba(0,0,0,0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#0f0";
  ctx.font = size + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const txt = letters[Math.floor(Math.random()*letters.length)];
    ctx.fillText(txt, i * size, drops[i] * size);

    if (drops[i] * size > canvas.height && Math.random() > 0.95)
      drops[i] = 0;

    drops[i]++;
  }
}
setInterval(matrixRain, 35);

/* AUDIO */
document.body.addEventListener("click", () => {
  document.getElementById("matrixAudio").play();
}, { once: true });

/* QR CODE */
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

/* PANELS */
function openPanel(type) {
  const popup = document.getElementById("infoPanel");
  popup.style.display = "block";

  if (type === "reseau") {
    document.getElementById("panelTitle").textContent = "RÉSEAU MONDIALE";
    document.getElementById("panelText").innerHTML = `
        FANDRAY AINGA MANERAN-TANY<br>
      • Fifandraisana fibre optique & satellite<br>
      • Data flow manerana ny kaontinanta<br>
      • Encryption – Firewall – Cyber sécurité<br>
      • AI-based routing – Cloud global intelligent<br>
    `;
  }

  if (type === "pays") {
    document.getElementById("panelTitle").textContent = "PAYS MONDIALE";
    document.getElementById("panelText").innerHTML = `
      <b>Afrique:</b> Madagascar, Kenya, Maroc, Afrique du Sud...<br>
      <b>Europe:</b> France, Allemagne, UK...<br>
      <b>Amériques:</b> USA, Canada, Brésil...<br>
      <b>Asie:</b> Chine, Inde, Japon...<br>
      <b>Océanie:</b> Australie, NZ...<br>
    `;
  }
}

function closePanel() {
  document.getElementById("infoPanel").style.display = "none";
}
