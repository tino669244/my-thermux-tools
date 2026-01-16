/* MATRIX RAIN */
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = "TINOANDRAINA011010010";
const size = 14;
const columns = canvas.width / size;
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


/* AUDIO AUTO-PLAY */
const mainAudio = document.getElementById("matrixAudio");
document.body.addEventListener(
  "click",
  () => {
    mainAudio.play();
    initBeatReactive(); // rehefa mandeha ny audio → miditra ny effect
  },
  { once: true }
);


/* -----------------------------
   BEAT REACTIVE WORLD MAP
------------------------------ */

const world = document.getElementById("worldmap");

let audioCtx, analyser, dataArray;

function initBeatReactive() {
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const source = audioCtx.createMediaElementSource(mainAudio);

  analyser = audioCtx.createAnalyser();
  analyser.fftSize = 256;

  source.connect(analyser);
  analyser.connect(audioCtx.destination);

  dataArray = new Uint8Array(analyser.frequencyBinCount);

  animateWorld(); // MANOMBOKA ANIMATION
}


function animateWorld() {
  requestAnimationFrame(animateWorld);

  analyser.getByteFrequencyData(dataArray);

  // Average amplitude
  let sum = 0;
  for (let i = 0; i < dataArray.length; i++) sum += dataArray[i];
  const level = sum / dataArray.length;

  // Rotation miadana (tsaiky be)
  const rotation = Date.now() / 90;

  // Midoboka (pulse) manaraka ny instru
  const scale = 1 + level / 260;

  // Glow miovaova
  const glow = Math.min(90, level / 1.3 + 20);

  world.style.transform = `rotate(${rotation}deg) scale(${scale})`;
  world.style.filter = `drop-shadow(0 0 ${glow}px #00ffdd) brightness(1.5)`;
}


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


/* POPUP PANELS */
function openPanel(type) {
  const p = document.getElementById("infoPanel");
  p.style.display = "block";

  if (type === "reseau") {
    document.getElementById("panelTitle").textContent = "RÉSEAU MONDIAL";
    document.getElementById("panelText").innerHTML = `
    • Fibre optique & satellite mondiaux<br>
    • Data flow maneran-tany<br>
    • Encryption, Firewall, Cyber Security<br>
    • Cloud & AI routing global<br>`;
  }

  if (type === "pays") {
    document.getElementById("panelTitle").textContent = "PAYS MONDIAL";
    document.getElementById("panelText").innerHTML = `
    Afrique, Europe, Amériques, Asie, Océanie<br>
    Madagascar, Brésil, France, UK<br>
    Népal, Monaco, Montenegro<br>
    Tambazotra manerantany<br>`;
  }
}

function closePanel() {
  document.getElementById("infoPanel").style.display = "none";
}
