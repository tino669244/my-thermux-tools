/* ===== MATRIX RAIN (NAME REPLACEMENT) ===== */
const canvas = document.getElementById("matrixName");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = 90;

const chars = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const fontSize = 14;
const columns = Math.floor(canvas.width / fontSize);
const drops = Array(columns).fill(1);

function drawMatrix() {
  ctx.fillStyle = "rgba(0,0,0,0.15)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#00ff66";
  ctx.font = fontSize + "px monospace";

  drops.forEach((y, i) => {
    const text = chars[Math.floor(Math.random() * chars.length)];
    ctx.fillText(text, i * fontSize, y * fontSize);

    if (y * fontSize > canvas.height && Math.random() > 0.95) {
      drops[i] = 0;
    }
    drops[i]++;
  });
}

setInterval(drawMatrix, 50);

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
});

/* ===== SIMPLE QR GENERATOR ===== */
const qrCanvas = document.getElementById("qrCanvas");
const qctx = qrCanvas.getContext("2d");

qrCanvas.width = 160;
qrCanvas.height = 160;
qctx.fillStyle = "#00ff66";
qctx.fillRect(0, 0, 160, 160);
qctx.fillStyle = "#000";
qctx.fillText("QR CODE", 40, 85);
