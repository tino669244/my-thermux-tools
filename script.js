/* -----------------------------------------------------
   MATRIX RAIN ANIMATION (HACKER EFFECT)
----------------------------------------------------- */
const matrixCanvas = document.getElementById("matrix");
const ctx = matrixCanvas.getContext("2d");

matrixCanvas.height = window.innerHeight;
matrixCanvas.width = window.innerWidth;

const letters = "01TINOANDRAINA";
const fontSize = 16;
const columns = matrixCanvas.width / fontSize;

const drops = [];
for (let i = 0; i < columns; i++) drops[i] = 1;

function drawMatrix() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

  ctx.fillStyle = "#00ff99";
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const text = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
  }
}

setInterval(drawMatrix, 40);

/* Responsive */
window.addEventListener("resize", () => {
  matrixCanvas.height = window.innerHeight;
  matrixCanvas.width = window.innerWidth;
});


/* -----------------------------------------------------
   QR CODE SYSTEM
----------------------------------------------------- */
function generateQR() {
  const text = document.getElementById("qrInput").value;

  if (!text) return alert("Ampidiro aloha ny lien :)");

  document.getElementById("qrBox").innerHTML =
    `<img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(text)}" />`;
}

function downloadQR() {
  const img = document.querySelector("#qrBox img");
  if (!img) return alert("Tsy misy QR mbola namboarina");

  const link = document.createElement("a");
  link.href = img.src;
  link.download = "qr_tino_andraina.png";
  link.click();
}

function quick(url) {
  document.getElementById("qrInput").value = url;
  generateQR();
}


/* -----------------------------------------------------
   POPUP SYSTEM
----------------------------------------------------- */
const infoPanel = document.getElementById("infoPanel");
const panelTitle = document.getElementById("panelTitle");
const panelText = document.getElementById("panelText");
const panelImage = document.getElementById("panelImage");

function openPanel(type) {
  infoPanel.style.display = "block";

  if (type === "reseau") {
    panelTitle.innerText = "RÉSEAU MONDIALE — DATA FLOW";
    panelText.innerText =
`Ny tambajotra manerantany dia rafitra mampifandray firenena,
orinasa, ary olona an-tapitrisany.

➡ Mitsingevana sy mifandray amin'ny fibre optique, satellite,
   onjam-peo ary Data Center maro.

➡ Ny reseau mondiale dia mitondra :
   - Fifandraisana haingana
   - Partage angon-drakitra
   - Cyber-security
   - Cloud & AI
   - Observatoire numérique

➡ Madagascar dia mifandray amin’izao tontolo izao
   amin’ny alalan’ny fibre optique EASSy sy LION.`;

    panelImage.src = "https://img.freepik.com/free-vector/big-data-flow-visualization-complex-luminescent-graphic_1217-3011.jpg";
  }

  if (type === "pays") {
    panelTitle.innerText = "PAYS MONDIALE — FANDRAISANA ANJARA";
    panelText.innerText =
`Ireto misy firenena mandray anjara mavitrika amin'ny fifandraisana
era-numerika eran-tany :

• USA — Silicon Valley / Cloud / Cyber Defense
• Chine — 5G, AI, High Speed Network
• Europe — Data Protection & Servers
• Inde — Datacenter sy outsourcing
• Afrique — Fitomboana haingana, fibre optique vaovao
• Madagascar — Rising Digital Hub`;

    panelImage.src = "https://img.freepik.com/free-vector/connection-world-map_1017-3799.jpg";
  }
}

function closePanel() {
  infoPanel.style.display = "none";
}


/* -----------------------------------------------------
   MAP — RAYS FROM MADAGASCAR (NEON LINES)
----------------------------------------------------- */
const raysGroup = document.getElementById("rays");

function createRay(x2, y2) {
  const ray = document.createElementNS("http://www.w3.org/2000/svg", "line");
  ray.setAttribute("x1", 1320);
  ray.setAttribute("y1", 820);
  ray.setAttribute("x2", x2);
  ray.setAttribute("y2", y2);
  ray.setAttribute("stroke", "#00ff66");
  ray.setAttribute("stroke-width", "2");
  ray.setAttribute("stroke-opacity", "0.8");
  ray.style.filter = "drop-shadow(0 0 6px #00ff66)";
  raysGroup.appendChild(ray);
}

const rayDestinations = [
  [200, 200], [400, 300], [1600, 250], [1700, 600],
  [900, 150], [300, 900], [1800, 900], [500, 500],
  [1500, 450], [250, 650], [1200, 300]
];

rayDestinations.forEach(pt => createRay(pt[0], pt[1]));


/* -----------------------------------------------------
   END
----------------------------------------------------- */ 
